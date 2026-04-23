import { OrbitControls } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import { useRef } from "react";
import type { Mesh } from "three";

function Cubo() {
  const SPEED = 0.3;

  const meshRef = useRef<Mesh>(null);

  useFrame((_state, delta) => {
    if (!meshRef.current) return;
    meshRef.current.rotation.y += delta * SPEED;
  });

  return (
    <mesh ref={meshRef}>
      <boxGeometry />
      <meshStandardMaterial color={"brown"} />
    </mesh>
  );
}

export default function AnimateAndTransformPage() {
  return (
    <div className="h-screen">
      <Canvas>
        <ambientLight intensity={1} />

        <directionalLight intensity={5} position={[1, 10, 2]} />
        <Cubo />
        <OrbitControls />
      </Canvas>
    </div>
  );
}
