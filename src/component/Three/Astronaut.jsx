import { useGLTF, useAnimations } from "@react-three/drei"
import { useEffect, useRef } from "react"
import { useFrame } from "@react-three/fiber"
import * as THREE from "three"

export default function Astronaut({ activeSection, scrollState }) {
  const ref = useRef()
  const prevSection = useRef(activeSection)
  const spinning = useRef(false)
  const spinDir = useRef(1)

  const { scene, animations } = useGLTF("/models/astronaut.glb")
  const { actions } = useAnimations(animations, ref)

  /* =========================
   * TRANSFORM PRESETS
   * ========================= */
  const positions = {
    home: { pos: [0, -3.5, 0.5], rot: [0, 0, 0], scale: 1.5 },
    about: { pos: [2, -2, -2], rot: [0, 0, 0], scale: 0.85 },
    experience: { pos: [-2, -2, -2], rot: [0, 0, 0], scale: 0.85 },
    project: { pos: [2, -2, -2], rot: [0, 0, 0], scale: 0.85 },
    contact: { pos: [-2, -2, -2], rot: [0, 0, 0], scale: 0.85 },
  }

  /* =========================
   * ANIMATION SWITCHER
   * ========================= */
  useEffect(() => {
    if (!actions) return

    // HOME → wave
    if (activeSection === "home") {
      actions.wave?.reset().fadeIn(0.6).play()
      actions.floating?.fadeOut(0.6)
      return
    }

    // EXPERIENCE → moon walk
    if (activeSection === "experience") {
      actions.floating?.fadeOut(0.6)
      actions.moon_walk?.reset().fadeIn(0.6).play()
      return
    }

    // OTHER SECTIONS
    const prev = prevSection.current
    const prevX = positions[prev]?.pos[0] ?? 0
    const nextX = positions[activeSection]?.pos[0] ?? 0

    const isCrossSideTransition =
      prev &&
      prev !== activeSection &&
      Math.sign(prevX) !== Math.sign(nextX) &&
      prev !== "home" &&
      activeSection !== "home" &&
      prev !== "experience" &&
      activeSection !== "experience"

    // ❗ spin transition handled elsewhere
    if (isCrossSideTransition) return

    // NORMAL → floating
    actions.floating?.reset().fadeIn(0.6).play()
    actions.wave?.fadeOut(0.6)
    actions.moon_walk?.fadeOut(0.6)
  }, [actions, activeSection])

  /* =========================
   * MATERIAL FIX
   * ========================= */
  useEffect(() => {
    scene.traverse((obj) => {
      if (!obj.isMesh) return
      obj.material.needsUpdate = true
      obj.material.envMapIntensity = 1
      obj.material.roughness = Math.min(obj.material.roughness ?? 0.8, 0.8)
      obj.material.metalness = Math.min(obj.material.metalness ?? 0.5, 0.5)
    })
  }, [scene])

  /* =========================
   * FRAME UPDATE
   * ========================= */
  useFrame(() => {
    if (!ref.current) return

    const fromKey = scrollState?.from ?? activeSection
    const toKey = scrollState?.to ?? activeSection
    const t = scrollState?.t ?? 0

    const from = positions[fromKey] ?? positions.home
    const to = positions[toKey] ?? positions.home

    // interpolate
    const lerp = THREE.MathUtils.lerp

    const targetPos = from.pos.map((v, i) => lerp(v, to.pos[i], t))
    const targetRot = from.rot.map((v, i) => lerp(v, to.rot[i], t))
    const targetScale = lerp(from.scale, to.scale, t)

    // smooth apply
    ref.current.position.x = lerp(ref.current.position.x, targetPos[0], 0.12)
    ref.current.position.y = lerp(ref.current.position.y, targetPos[1], 0.12)
    ref.current.position.z = lerp(ref.current.position.z, targetPos[2], 0.12)

    ref.current.rotation.x = lerp(ref.current.rotation.x, targetRot[0], 0.12)
    ref.current.rotation.y = lerp(ref.current.rotation.y, targetRot[1], 0.12)
    ref.current.rotation.z = lerp(ref.current.rotation.z, targetRot[2], 0.12)

    // spin logic (unchanged)
    const fromX = from.pos[0]
    const toX = to.pos[0]

    if (t > 0 && t < 1 && Math.sign(fromX) !== Math.sign(toX) && fromKey !== "home" && toKey !== "home") {
      spinning.current = true
      spinDir.current = toX > fromX ? 1 : -1
    } else if (t === 0 || t === 1) {
      spinning.current = false
    }

    if (spinning.current) {
      ref.current.rotation.y += spinDir.current * 0.06
    }

    const s = lerp(ref.current.scale.x, targetScale, 0.12)
    ref.current.scale.set(s, s, s)
  })

  /* =========================
   * SECTION CHANGE SPIN TRIGGER
   * ========================= */
  useEffect(() => {
    const prev = prevSection.current
    if (prev && prev !== activeSection) {
      const prevX = positions[prev]?.pos[0] ?? 0
      const nextX = positions[activeSection]?.pos[0] ?? 0

      if (Math.sign(prevX) !== Math.sign(nextX) && prev !== "home" && activeSection !== "home") {
        spinning.current = true
        spinDir.current = nextX > prevX ? 1 : -1
      }
    }

    prevSection.current = activeSection
  }, [activeSection])

  /* =========================
   * INITIAL TRANSFORM
   * ========================= */
  useEffect(() => {
    if (!ref.current) return
    const info = positions[activeSection] ?? positions.home
    ref.current.position.set(...info.pos)
    ref.current.rotation.set(...info.rot)
    ref.current.scale.set(info.scale, info.scale, info.scale)
  }, [scene])

  return <primitive ref={ref} object={scene} />
}
