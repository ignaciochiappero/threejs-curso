import { BUTTON_STYLE } from "@/components/styles";
import { OrbitControls, useAnimations, useGLTF } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { useEffect, useState } from "react";

interface RobotProps {
  accion: string;
}

const ANIMACIONES = [
  {
    id: "morirse",
    name: "Death",
  },
  {
    id: "bailar",
    name: "Dance",
  },
  {
    id: "saludar",
    name: "Hello",
  },
  {
    id: "disparo",
    name: "HitRecieve_2",
  },
  {
    id: "afk",
    name: "Idle",
  },
  {
    id: "saltar",
    name: "Jump",
  },
];

function Robot({ accion }: RobotProps) {
  const { scene, animations } = useGLTF("/Leela.gltf");

  const { actions } = useAnimations(animations, scene);

  useEffect(() => {
    ANIMACIONES.forEach((item) => {
      if (item.id != accion) {
        actions?.[item.name]?.stop();
      } else {
        actions?.[item.name]?.play();
      }
    });
  }, [accion, actions]);

  return <primitive object={scene} />;
}

function Piso() {
  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1, 0]}>
      <planeGeometry args={[36, 36]} />
      <meshStandardMaterial color={"grey"} />
    </mesh>
  );
}

export default function ModelsPage3D() {
  const [accion, setAccion] = useState("");

  return (
    <div className="h-screen bg-neutral-800">
      <div className="grid grid-cols-4 gap-2 mx-2">
        {ANIMACIONES.map((item) => (
          <button className={BUTTON_STYLE} onClick={() => setAccion(item.id)}>
            Animación {item.id} {`(${item.name})`}
          </button>
        ))}
      </div>
      <Canvas>
        <OrbitControls />

        <hemisphereLight intensity={1} />
        <spotLight intensity={300} color={"orange"} position={[0, 10, 10]} />

        <group scale={0.5} position={[0, -0.7, 0]}>
          <Robot accion={accion} />
        </group>

        <Piso />
      </Canvas>
    </div>
  );
}
