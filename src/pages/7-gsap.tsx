import { OrbitControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import gsap from "gsap";
import { useEffect, useRef } from "react";
import { Mesh } from "three";

function Esfera() {
  const meshRef = useRef<Mesh>(null);

  useEffect(() => {
    if (!meshRef.current) return;

    gsap.to(meshRef.current.position, {
      y: 1,
      duration: 2,
      ease: "bounce.out",
      repeat: -1,
      yoyo: true,
    });
  }, []);

  return (
    <mesh ref={meshRef} position={[0, 0, 0]}>
      <sphereGeometry />
      <meshStandardMaterial color={"red"} />
    </mesh>
  );
}

function Caja() {
  const meshRef = useRef<Mesh>(null);

  useEffect(() => {
    if (!meshRef.current) return;

    gsap.to(meshRef.current.position, {
      x: 2,
      duration: 2,
      ease: "power2.inOut",
      repeat: -1,
      yoyo: true,
    });
  }, []);

  return (
    <mesh ref={meshRef} position={[3, 0, 0]}>
      <boxGeometry />
      <meshStandardMaterial color={"blue"} />
    </mesh>
  );
}

function Toroide() {
  const meshRef = useRef<Mesh>(null);

  useEffect(() => {
    if (!meshRef.current) return;

    gsap.to(meshRef.current.scale, {
      x: 2,
      y: 2,
      z: 2,
      duration: 2,
      ease: "elastic.out",
      repeat: -1,
      yoyo: true,
    });
  }, []);

  return (
    <mesh ref={meshRef} position={[-3, 0, 0]}>
      <torusGeometry />
      <meshStandardMaterial color={"green"} />
    </mesh>
  );
}

export default function GSAPPage() {
  return (
    <div className="h-screen">
      <Canvas>
        <hemisphereLight intensity={1} />
        <spotLight intensity={100} color={"white"} position={[0, 10, 5]} />

        <Esfera />
        <Caja />
        <Toroide />

        <OrbitControls />
      </Canvas>
    </div>
  );
}
