import { OrbitControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { useState } from "react";

function Piso() {
  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.4, 0]} receiveShadow>
      <planeGeometry args={[32, 32]} />
      <meshStandardMaterial color={"white"} />
    </mesh>
  );
}

function CajaX({
  position,
  onClick,
}: {
  position: number;
  onClick: () => void;
}) {
  const [color, setColor] = useState("lavender");

  return (
    <mesh
      onClick={() => {
        color === "lavender" ? setColor("black") : setColor("lavender");

        onClick();
      }}
      castShadow
      position={[position, 0, 0]}
    >
      <boxGeometry />
      <meshStandardMaterial color={color} />
    </mesh>
  );
}

const InteractionPage = () => {
  const [mensaje, setMensaje] = useState("Sin clickear");

  return (
    <div className="h-screen flex flex-col items-center">
      <p className="border flex justify-center items-center mt-2 w-40 h-20">
        {mensaje}
      </p>

      <Canvas shadows>
        <OrbitControls />

        <hemisphereLight intensity={1} />

        <spotLight intensity={100} position={[0, 15, 10]} castShadow />

        <Piso />

        {[...Array(5)].map((_, i) => {
          return (
            <CajaX
              key={i}
              onClick={() => setMensaje(`Clickeaste la caja ${i + 1}`)}
              position={-3 + i * 2}
            />
          );
        })}
      </Canvas>
    </div>
  );
};

export default InteractionPage;
