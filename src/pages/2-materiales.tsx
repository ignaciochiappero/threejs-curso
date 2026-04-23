import { OrbitControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";

export default function MaterialesPage() {
  return (
    <div className="h-screen bg-black">
      <Canvas>
        <ambientLight intensity={1} />
        <directionalLight position={[5, 10, 0]} />

        {/* Espejo  */}
        <mesh position={[-6, 0, 0]}>
          <sphereGeometry args={[1, 32, 32]} />
          <meshStandardMaterial metalness={1} roughness={0} color={"#C7C7C7"} />
        </mesh>

        {/* Metal oxidado */}
        <mesh position={[-3, 0, 0]}>
          <sphereGeometry args={[1, 32, 32]} />
          <meshStandardMaterial metalness={1} roughness={0.7} color={"brown"} />
        </mesh>

        {/* Plástico brillante */}
        <mesh position={[0, 0, 0]}>
          <sphereGeometry args={[1, 32, 32]} />
          <meshStandardMaterial metalness={0} roughness={0.1} color={"red"} />
        </mesh>

        <mesh position={[3, 0, 0]}>
          <sphereGeometry args={[1, 32, 32]} />
          <meshStandardMaterial
            metalness={0}
            roughness={0.9}
            color={"#8A5C29"}
          />
        </mesh>

        <mesh position={[6, 0, 0]}>
          <sphereGeometry args={[1, 32, 32]} />
          <meshStandardMaterial emissive={"yellow"} emissiveIntensity={2} />
        </mesh>

        <OrbitControls />
      </Canvas>
    </div>
  );
}
