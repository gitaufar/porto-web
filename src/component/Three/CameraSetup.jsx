import { useThree, useFrame } from "@react-three/fiber"
import { useEffect } from "react"
import * as THREE from "three"

export default function CameraSetup({ activeSection }) {
  const { camera } = useThree()

  const cameraPositions = {
    home: [0, 0.5, 3],
    about: [5, 0.2, 3],
    experience: [-5, 0.2, 3],
    project: [5, 0.2, 3],
    journey: [-5, 0.2, 3],
    contact: [-5, 0.2, 3],
  }

  const defaultPos = cameraPositions.home

  useEffect(() => {
    camera.position.set(...defaultPos)
    camera.lookAt(0, 0, 0)
  }, [])

  useFrame(() => {
    const targetPos = cameraPositions[activeSection] ?? defaultPos

    // Smooth camera transition (slower for smoother motion)
    camera.position.x = THREE.MathUtils.lerp(camera.position.x, targetPos[0], 0.03)
    camera.position.y = THREE.MathUtils.lerp(camera.position.y, targetPos[1], 0.03)
    camera.position.z = THREE.MathUtils.lerp(camera.position.z, targetPos[2], 0.03)

    camera.lookAt(0, 0, 0)
  })

  return null
}
