import { OrbitControls } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import { useRef } from "react";
import type { Group } from "three";

function Personaje() {
  const grupoPersonaje = useRef<Group>(null);

  useFrame((_state, delta) => {
    if (!grupoPersonaje.current) return;
    grupoPersonaje.current.rotation.y += delta;
  });

  return (
    <group ref={grupoPersonaje} position={[0, 1, 0]}>
      <mesh castShadow>
        <boxGeometry />
        <meshStandardMaterial color={"orange"} />
      </mesh>

      <mesh scale={0.2} position={[-0.3, 0.1, 0.5]}>
        <sphereGeometry />
        <meshStandardMaterial color={"white"} />
      </mesh>

      <mesh scale={0.2} position={[0.3, 0.1, 0.5]}>
        <sphereGeometry />
        <meshStandardMaterial color={"white"} />
      </mesh>
    </group>
  );
}

function Piso() {
  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -2, 0]} receiveShadow>
      <planeGeometry args={[36, 36]} />
      <meshStandardMaterial color={"gray"} />
    </mesh>
  );
}

export default function GruposPage() {
  return (
    <div className="h-screen bg-black">
      <Canvas shadows>
        <hemisphereLight intensity={1} />

        <spotLight
          position={[10, 10, 10]}
          intensity={60}
          color={"white"}
          castShadow
        />

        <Personaje />
        <OrbitControls />
        <Piso />
      </Canvas>
    </div>
  );
}
