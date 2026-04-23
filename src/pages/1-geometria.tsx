import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";

export default function GeometriasPage() {
  return (
    <div className="h-screen">
      <Canvas>
        <ambientLight intensity={1} />
        <directionalLight position={[5, 10, 0]} />

        <mesh position={[0, 0.5, 2]}>
          <sphereGeometry args={[1, 32, 32]} />
          <meshStandardMaterial color={"red"} />
        </mesh>

        <mesh position={[0, 0.5, 0]}>
          <cylinderGeometry args={[0.5, 0.5, 2]} />
          <meshStandardMaterial color={"blue"} />
        </mesh>

        <mesh position={[2, 0.5, 0]}>
          <boxGeometry args={[1, 2, 1]} />
          <meshStandardMaterial color={"green"} />
        </mesh>

        <mesh position={[2, 1, 2]}>
          <torusGeometry />
          <meshStandardMaterial color={"orange"} />
        </mesh>

        <OrbitControls />
      </Canvas>
    </div>
  );
}
