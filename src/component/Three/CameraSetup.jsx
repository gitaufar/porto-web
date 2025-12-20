import { useThree, useFrame } from "@react-three/fiber"
import { useEffect } from "react"
import * as THREE from "three"

export default function CameraSetup({ activeSection, scrollState }) {
  const { camera } = useThree()

  const cameraPositions = {
    // Keep camera closer on home, slightly zoomed-out and less extreme X on side sections
    home: [0, 0.5, 3],
    about: [2.5, 0.2, 4],
    experience: [-2.5, 0.2, 4],
    project: [2.5, 0.2, 4],
    journey: [-2.5, 0.2, 4],
    contact: [-2.5, 0.2, 4],
  }

  const defaultPos = cameraPositions.home

  useEffect(() => {
    camera.position.set(...defaultPos)
    camera.lookAt(0, 0, 0)
  }, [])

  useFrame(() => {
    if (!scrollState) return

    const fromPos = cameraPositions[scrollState.from] ?? defaultPos
    const toPos = cameraPositions[scrollState.to] ?? defaultPos
    const t = scrollState.t

    const targetPos = [
      THREE.MathUtils.lerp(fromPos[0], toPos[0], t),
      THREE.MathUtils.lerp(fromPos[1], toPos[1], t),
      THREE.MathUtils.lerp(fromPos[2], toPos[2], t),
    ]

    // Slightly faster camera lerp for responsive feel
    camera.position.x = THREE.MathUtils.lerp(camera.position.x, targetPos[0], 0.08)
    camera.position.y = THREE.MathUtils.lerp(camera.position.y, targetPos[1], 0.08)
    camera.position.z = THREE.MathUtils.lerp(camera.position.z, targetPos[2], 0.08)

    camera.lookAt(0, 0, 0)
  })

  return null
}
