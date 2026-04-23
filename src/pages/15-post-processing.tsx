import { OrbitControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import {
  EffectComposer,
  Bloom,
  DepthOfField,
  Noise,
  Vignette,
  ChromaticAberration,
} from "@react-three/postprocessing";

function Piso() {
  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1, 0]}>
      <planeGeometry args={[32, 32]} />
      <meshStandardMaterial color={"white"} />
    </mesh>
  );
}

function Esfera() {
  return (
    <mesh>
      <sphereGeometry />
      <meshStandardMaterial emissive={"lightblue"} emissiveIntensity={3} />
    </mesh>
  );
}

function Esfera2() {
  return (
    <mesh position={[2, 4, 10]}>
      <sphereGeometry />
      <meshStandardMaterial emissive={"orange"} emissiveIntensity={4} />
    </mesh>
  );
}

function CajaRoja() {
  return (
    <mesh position={[2, 0, -10]}>
      <boxGeometry />
      <meshStandardMaterial emissive={"red"} emissiveIntensity={5} />
    </mesh>
  );
}

function CajaGris1() {
  return (
    <mesh position={[-4, 0, 0]}>
      <boxGeometry />
      <meshStandardMaterial color={"gray"} />
    </mesh>
  );
}

function CajaGris2() {
  return (
    <mesh position={[4, 0, 0]}>
      <boxGeometry />
      <meshStandardMaterial color={"gray"} />
    </mesh>
  );
}

export default function PostProcessingPage() {
  return (
    <div className="h-screen bg-black">
      <Canvas>
        <OrbitControls />

        <hemisphereLight intensity={0.3} />
        <spotLight intensity={100} position={[10, 10, 10]} />

        <Piso />
        <Esfera />
        <Esfera2 />
        <CajaRoja />
        <CajaGris1 />
        <CajaGris2 />

        <EffectComposer>
          <Bloom />
          <Vignette />
          <Noise opacity={0.06} />
          <DepthOfField focusDistance={6} bokehScale={5} target={[0, 0, 0]} />
          <ChromaticAberration offset={[0.002, 0.002]} angle={0} />
        </EffectComposer>
      </Canvas>
    </div>
  );
}
