import { Stars } from "@react-three/drei"
import { useFrame } from "@react-three/fiber"
import { useRef } from "react"

export default function StarBackground() {
  const starsRef = useRef()

  useFrame((_, delta) => {
    starsRef.current.rotation.y += delta * 0.02
  })

  return (
    <Stars
      ref={starsRef}
      radius={120}
      depth={60}
      count={7000}
      factor={4}
      saturation={0}
      fade
      speed={0.5}
    />
  )
}
