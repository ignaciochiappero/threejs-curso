import { OrbitControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";

export default function LightPage() {
  return (
    <div className="h-screen bg-black ">
      <Canvas>
        <hemisphereLight intensity={0.3} />

        <pointLight color={"orange"} position={[-5, 10, -10]} intensity={100} />

        <spotLight
          color={"blue"}
          penumbra={0.5}
          intensity={100}
          position={[5, 5, 10]}
        />

        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -2, 0]}>
          <planeGeometry args={[20, 20]} />
          <meshStandardMaterial color={"gray"} roughness={0.8} />
        </mesh>

        <mesh position={[0, 1, 0]}>
          <sphereGeometry />
          <meshStandardMaterial color={"white"} />
        </mesh>

        <OrbitControls />
      </Canvas>
    </div>
  );
}
