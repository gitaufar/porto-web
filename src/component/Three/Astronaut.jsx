import { useGLTF, useAnimations } from "@react-three/drei"
import { useEffect, useRef } from "react"
import { useFrame } from "@react-three/fiber"
import * as THREE from "three"

export default function Astronaut({ activeSection }) {
  const ref = useRef()
  const prevSection = useRef(activeSection)
  const spinning = useRef(false)
  const spinDir = useRef(1)
  const { scene, animations } = useGLTF("/models/astronaut.glb")
  const { actions } = useAnimations(animations, ref)

  // Target positions and rotations per section
  const positions = {
    home: { pos: [0, -3.5, 0.5], rot: [0, 0, 0], scale: 1.5 },
    about: { pos: [1.6, -2, -2], rot: [Math.PI, Math.PI, Math.PI], scale: 0.8 },
    experience: { pos: [-1.6, -2, -2], rot: [Math.PI, Math.PI, Math.PI], scale: 0.8 },
    project: { pos: [1.6, -2, -2], rot: [Math.PI, Math.PI, Math.PI], scale: 0.8 },
    contact: { pos: [-1.6, -2, -2], rot: [Math.PI, Math.PI, Math.PI], scale: 0.8 },
  }

  useEffect(() => {
    // Switch animation based on section with improved crossfade to avoid T-pose
    if (activeSection === 'home') {
        if (actions?.wave) {
          // ensure wave plays immediately
          actions.wave.reset().fadeIn(1).play()
        }
        if (actions?.floating) {
          actions.floating.fadeOut(1)
        }
      } else {
        // determine if we will spin when switching sides
        const prev = prevSection.current
        const prevX = positions[prev]?.pos[0] ?? 0
        const nextX = positions[activeSection]?.pos[0] ?? 0

        if (prev && prev !== activeSection && Math.sign(prevX) !== Math.sign(nextX) && prev !== 'home' && activeSection !== 'home') {
          // side-to-side transition: start floating immediately with fadeIn to avoid t-pose, keep spinning
          if (actions?.floating) {
            actions.floating.reset().play()
          }
          
        } else {
          // normal transition: just crossfade to floating
          if (actions?.floating) {
            actions.floating.reset().fadeIn(1).play()
          }
          if (actions?.wave) {
            actions.wave.fadeOut(1)
          }
        }
      }
  }, [actions, activeSection])

  useEffect(() => {
    scene.traverse((obj) => {
      if (obj.isMesh) {
        obj.material.needsUpdate = true
        obj.material.envMapIntensity = 1
        obj.material.roughness = Math.min(obj.material.roughness ?? 0.8, 0.8)
        obj.material.metalness = Math.min(obj.material.metalness ?? 0.5, 0.5)
      }
    })
  }, [scene])

  // Smooth transition + spin behavior when switching sides
  useFrame(() => {
    if (!ref.current) return

    const info = positions[activeSection] ?? positions.home
    const targetPos = info.pos
    const targetRot = info.rot
    const targetScale = info.scale

    // Lerp position (slower for smoother motion)
    ref.current.position.x = THREE.MathUtils.lerp(ref.current.position.x, targetPos[0], 0.03)
    ref.current.position.y = THREE.MathUtils.lerp(ref.current.position.y, targetPos[1], 0.03)
    ref.current.position.z = THREE.MathUtils.lerp(ref.current.position.z, targetPos[2], 0.03)

    // Lerp rotation toward target
    ref.current.rotation.x = THREE.MathUtils.lerp(ref.current.rotation.x, targetRot[0], 0.05)
    ref.current.rotation.y = THREE.MathUtils.lerp(ref.current.rotation.y, targetRot[1], 0.05)
    ref.current.rotation.z = THREE.MathUtils.lerp(ref.current.rotation.z, targetRot[2], 0.05)

    // If spinning flag is set, add extra yaw rotation
    if (spinning.current) {
      // gentler spin speed
      ref.current.rotation.y += spinDir.current * 0.06
    }

    // Lerp scale
    const currentScale = ref.current.scale.x
    const newScale = THREE.MathUtils.lerp(currentScale, targetScale, 0.05)
    ref.current.scale.set(newScale, newScale, newScale)

    // Stop spinning when close to target position
    const dx = Math.abs(ref.current.position.x - targetPos[0])
    const dz = Math.abs(ref.current.position.z - targetPos[2])
    if (spinning.current && dx < 0.1 && dz < 0.2) {
      spinning.current = false
    }
  })

  // detect section change to trigger spin when switching sides
  useEffect(() => {
    const prev = prevSection.current
    if (prev && prev !== activeSection) {
      const prevX = positions[prev]?.pos[0] ?? 0
      const nextX = positions[activeSection]?.pos[0] ?? 0
      // if both sides are left/right and different side, spin while moving
      if (Math.sign(prevX) !== Math.sign(nextX) && prev !== 'home' && activeSection !== 'home') {
        spinning.current = true
        spinDir.current = nextX > prevX ? 1 : -1
      }
    }
    prevSection.current = activeSection
  }, [activeSection])

  // initial values for primitive props (use current active section)
  const initial = positions[activeSection] ?? positions.home

  return (
    <primitive
      ref={ref}
      object={scene}
      scale={initial.scale}
      position={initial.pos}
      rotation={initial.rot}
    />
  )
}
