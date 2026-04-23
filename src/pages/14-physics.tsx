import { OrbitControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { Physics, RigidBody, RapierRigidBody } from "@react-three/rapier";
import { Suspense, useRef, useState } from "react";

function Piso() {
  return (
    <RigidBody type="fixed">
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1, 0]}>
        <planeGeometry args={[32, 32]} />
        <meshStandardMaterial color={"white"} />
      </mesh>
    </RigidBody>
  );
}

function Arco({ setMensaje }: { setMensaje: (msg: string) => void }) {
  return (
    <RigidBody
      onCollisionEnter={({ other }) => {
        other.rigidBodyObject?.name === "BOX-AZUL" && setMensaje("TOCADOOOO");
      }}
    >
      <group position={[-5, 0, -5]}>
        <mesh position={[2, 0, 0]}>
          <boxGeometry args={[5, 10, 0.2]} />
          <meshStandardMaterial color={"gray"} />
        </mesh>
      </group>
    </RigidBody>
  );
}

function MoveBox() {
  const ref = useRef<RapierRigidBody>(null);

  return (
    <RigidBody ref={ref}>
      <mesh
        position={[2, 0, 0]}
        onClick={() => ref.current?.applyImpulse({ x: 0, y: 5, z: 0 }, true)}
      >
        <boxGeometry />

        <meshStandardMaterial color={"red"} />
      </mesh>
    </RigidBody>
  );
}

function MoveBox2() {
  const ref = useRef<RapierRigidBody>(null);

  return (
    <RigidBody ref={ref} name="BOX-AZUL">
      <mesh
        position={[-2, 0, 0]}
        onClick={() => ref.current?.applyImpulse({ x: -2, y: 10, z: -5 }, true)}
      >
        <boxGeometry />

        <meshStandardMaterial color={"blue"} />
      </mesh>
    </RigidBody>
  );
}

function StaticBox() {
  const ref = useRef<RapierRigidBody>(null);

  return (
    <RigidBody ref={ref}>
      <mesh
        onClick={() => {
          ref.current?.applyTorqueImpulse({ x: 1, y: 0, z: 0 }, true);

          ref.current?.applyImpulse({ x: 0, y: 4, z: 0 }, true);
        }}
      >
        <boxGeometry />

        <meshStandardMaterial color={"lavender"} />
      </mesh>
    </RigidBody>
  );
}

export default function PhysicsPage() {
  const [message, setMessage] = useState("");

  return (
    <div className="h-screen">
      <div className="flex justify-center py-2">
        <div className="w-64 h-16 border-2 border-black flex items-center justify-center">
          {message}
        </div>
      </div>
      <Canvas>
        <hemisphereLight intensity={1} />

        <spotLight intensity={100} position={[12, 15, 0]} />

        <OrbitControls />

        <Suspense>
          <Physics debug gravity={[0, -9.81, 0]}>
            {/* todo lo que tiene física acá */}

            <Piso />

            <Arco setMensaje={setMessage} />

            <StaticBox />

            <MoveBox />

            <MoveBox2 />

            {/* todo lo que tiene física acá */}
          </Physics>
        </Suspense>
      </Canvas>
    </div>
  );
}
