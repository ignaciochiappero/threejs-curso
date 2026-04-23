import { BUTTON_STYLE } from "@/components/styles";
import { Canvas, useThree } from "@react-three/fiber";
import gsap from "gsap";
import { useEffect, useState } from "react";

function Piso() {
  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1, 0]} receiveShadow>
      <planeGeometry args={[36, 36]} />
      <meshStandardMaterial color={"gray"} />
    </mesh>
  );
}

function Esfera1() {
  return (
    <mesh position={[0, 0, 0]} castShadow>
      <sphereGeometry />
      <meshStandardMaterial color={"white"} />
    </mesh>
  );
}

function Esfera2() {
  return (
    <mesh position={[10, 0, -5]} castShadow>
      <sphereGeometry />
      <meshStandardMaterial color={"red"} />
    </mesh>
  );
}

function Esfera3() {
  return (
    <mesh position={[10, 0, 10]} castShadow>
      <sphereGeometry />
      <meshStandardMaterial color={"blue"} />
    </mesh>
  );
}

function ControladorCamara({
  targetPos,
}: {
  targetPos: [number, number, number];
}) {
  const { camera } = useThree();

  useEffect(() => {
    gsap.to(camera.position, {
      x: targetPos[0],
      y: targetPos[1],
      z: targetPos[2],
      duration: 1,
      ease: "power2.inOut",
    });
  }, [targetPos]);

  return null;
}

export default function CameraPage() {
  const [camaraPos, setCamaraPos] = useState<[number, number, number]>([
    0, 2, 8,
  ]);

  return (
    <div className="h-screen bg-black">
      <div className="absolute top-1 left-1/2 flex gap-2">
        <button
          className={BUTTON_STYLE}
          onClick={() => setCamaraPos([0, 2, 8])}
        >
          Vista 1
        </button>
        <button
          className="bg-white px-10 py-5 rounded  hover:bg-neutral-50 transition-all hover:cursor-pointer z-50"
          onClick={() => setCamaraPos([10, 2, 5])}
        >
          Vista 2
        </button>
        <button
          className="bg-white px-10 py-5 rounded  hover:bg-neutral-50 transition-all hover:cursor-pointer z-50"
          onClick={() => setCamaraPos([10, 2, 20])}
        >
          Vista 3
        </button>
      </div>

      <Canvas className="z-10" shadows camera={{ position: [0, 2, 8] }}>
        <hemisphereLight intensity={1} />
        <spotLight intensity={300} position={[0, 20, 10]} castShadow />

        <ControladorCamara targetPos={camaraPos} />

        <Piso />

        <Esfera1 />
        <Esfera2 />
        <Esfera3 />
      </Canvas>
    </div>
  );
}
