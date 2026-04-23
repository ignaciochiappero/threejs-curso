import { DragControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";

function Piso() {
  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1, 0]}>
      <planeGeometry args={[32, 32]} />
      <meshStandardMaterial color={"white"} />
    </mesh>
  );
}

function Box() {
  return (
    <DragControls>
      <mesh>
        <boxGeometry />

        <meshStandardMaterial color={"lavender"} />
      </mesh>
    </DragControls>
  );
}

export default function DragDropPage() {
  return (
    <div className="h-screen">
      <Canvas>
        <hemisphereLight intensity={1} />

        <spotLight intensity={100} position={[12, 15, 0]} />

        <Piso />

        <Box />
      </Canvas>
    </div>
  );
}
