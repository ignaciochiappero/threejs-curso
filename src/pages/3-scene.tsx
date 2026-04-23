import { Environment, OrbitControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";

export default function ScenePage() {
  return (
    <div className="h-screen ">
      <Canvas>
        <Environment preset="city" />

        <mesh position={[0, 0, 0]}>
          <boxGeometry />
          <meshStandardMaterial roughness={0} metalness={1} />
        </mesh>

        <OrbitControls />
      </Canvas>
    </div>
  );
}
