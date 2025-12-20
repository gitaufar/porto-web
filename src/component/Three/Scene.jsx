import { Canvas } from "@react-three/fiber"
import { Environment } from "@react-three/drei"
import StarBackground from "./StarBackground"
import Astronaut from "./Astronaut"
import CameraSetup from "./CameraSetup"
import ShootingStar from "./ShootingStar"
import * as THREE from "three"

export default function Scene({ showShootingStar, onStarFinished, activeSection, scrollState }) {
    return (
        <Canvas
            camera={{ fov: 50 }}
            gl={{
                outputColorSpace: THREE.SRGBColorSpace,
                toneMapping: THREE.ACESFilmicToneMapping,
                toneMappingExposure: 1,
            }}
            style={{
                position: "fixed",
                inset: 0,
                zIndex: 0,
            }}
        >
            <CameraSetup activeSection={activeSection} scrollState={scrollState} />

            {/* LIGHT */}
            <ambientLight intensity={0.4} />
            <directionalLight position={[5, 5, 5]} intensity={1} />
            <directionalLight position={[-5, -5, 5]} intensity={0.5} />
            <Environment preset="city" />

            {/* OBJECT */}
            <StarBackground />
            <Astronaut activeSection={activeSection} scrollState={scrollState} />
            <ShootingStar showShootingStar={showShootingStar} onStarFinished={onStarFinished} />
        </Canvas>
    )
}
