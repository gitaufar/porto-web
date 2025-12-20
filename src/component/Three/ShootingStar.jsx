import { useFrame } from "@react-three/fiber"
import { useRef, useMemo, useState, useEffect } from "react"
import { Trail } from "@react-three/drei"
import * as THREE from "three"

export default function ShootingStar({ showShootingStar, onStarFinished }) {
  const [stars, setStars] = useState([])

  useEffect(() => {
    if (showShootingStar) {
      setStars([{
        id: Math.random(),
        position: [
          Math.random() * 100 - 50, // random x from -50 to 50
          Math.random() * 50 + 10,  // random y from 10 to 60
          -100 // start from far away
        ],
        direction: [
          (Math.random() - 0.5) * 0.2 + (Math.random() > 0.5 ? 0.05 : -0.05), // random x speed, can be left or right
          -(Math.random() * 0.05 + 0.02), // slower y speed negative (down)
          0.1 // move towards camera (zoom effect)
        ]
      }])
    } else {
      setStars([])
    }
  }, [showShootingStar])

  return (
    <>
      {stars.map((star) => (
        <ShootingStarSingle key={star.id} initialPosition={star.position} direction={star.direction} onFinished={onStarFinished} />
      ))}
    </>
  )
}

function ShootingStarSingle({ initialPosition, direction, onFinished }) {
  const mesh = useRef()
  const dirRef = useRef([...direction])

  useFrame(() => {
    dirRef.current[1] -= 0.001 // gravity effect, accelerate downward
    mesh.current.position.x += dirRef.current[0]
    mesh.current.position.y += dirRef.current[1]
    mesh.current.position.z += dirRef.current[2]

    // Reset when out of bounds (ensure falls full screen height and zooms in)
    if (mesh.current.position.y < -60 || mesh.current.position.z > -5) {
      onFinished()
    }
  })

  return (
    <Trail
      width={0.5}
      length={8}
      color={new THREE.Color(1, 0.5, 0)} // orange trail for fire effect
      attenuation={(t) => t * t}
    >
      <mesh ref={mesh} position={initialPosition}>
        <sphereGeometry args={[0.12, 8, 8]} />
        <meshBasicMaterial color="white" />
      </mesh>
    </Trail>
  )
}
