import { OrbitControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";

export default function ShadowsPage() {
  return (
    <div className="h-screen bg-black">
      <Canvas shadows>
        <hemisphereLight intensity={0.3} />

        <spotLight
          color={"blue"}
          intensity={200}
          position={[-10, 10, 0]}
          castShadow
        />

        <directionalLight
          color={"orange"}
          intensity={2}
          position={[10, 5, 0]}
          castShadow
        />

        <mesh
          rotation={[-Math.PI / 2, 0, 0]}
          position={[0, -2, 0]}
          receiveShadow
        >
          <planeGeometry args={[25, 25]} />
          <meshStandardMaterial roughness={0.8} color={"gray"} />
        </mesh>

        <mesh position={[0, 1, 0]} castShadow>
          <sphereGeometry args={[1, 32, 32]} />
          <meshStandardMaterial color={"white"} />
        </mesh>

        <OrbitControls />
      </Canvas>
    </div>
  );
}
