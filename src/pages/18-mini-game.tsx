import { Canvas, useThree, useFrame } from "@react-three/fiber";
import { Bloom, EffectComposer, Noise } from "@react-three/postprocessing";
import { Physics, RapierRigidBody, RigidBody } from "@react-three/rapier";
import { Suspense, useEffect, useRef } from "react";

function Escenario() {
  return (
    <RigidBody type="fixed">
      <group>
        {/* Piso */}
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1, 0]}>
          <planeGeometry args={[32, 32]} />
          <meshStandardMaterial color={"gray"} />
        </mesh>

        {/* Pared Fondo */}
        <mesh rotation={[0, 0, 0]} position={[0, 2, -16]}>
          <planeGeometry args={[32, 6]} />
          <meshStandardMaterial color={"white"} />
        </mesh>

        {/* Pared Derecha */}
        <mesh rotation={[0, -Math.PI / 2, 0]} position={[16, 2, 0]}>
          <planeGeometry args={[32, 6]} />
          <meshStandardMaterial color={"white"} />
        </mesh>

        {/* Pared Izquierda */}
        <mesh rotation={[0, Math.PI / 2, 0]} position={[-16, 2, 0]}>
          <planeGeometry args={[32, 6]} />
          <meshStandardMaterial color={"white"} />
        </mesh>

        {/* Pared Frente */}
        <mesh rotation={[0, Math.PI, 0]} position={[0, 2, 16]}>
          <planeGeometry args={[32, 6]} />
          <meshStandardMaterial color={"white"} />
        </mesh>

        {/* Techo */}
        <mesh rotation={[Math.PI / 2, 0, 0]} position={[0, 5, 0]}>
          <planeGeometry args={[32, 32]} />
          <meshStandardMaterial color={"gray"} />
        </mesh>
      </group>
    </RigidBody>
  );
}

function FollowCamera({ target }: any) {
  const { camera } = useThree();

  useFrame(() => {
    if (!target.current) return;
    const pos = target.current.translation();
    camera.position.x += (pos.x - camera.position.x) * 0.05;
    camera.position.y += (pos.y + 5 - camera.position.y) * 0.05;
    camera.position.z += (pos.z + 10 - camera.position.z) * 0.05;
    camera.lookAt(pos.x, pos.y, pos.z);
  });

  return null;
}

function Player() {
  const ref = useRef<RapierRigidBody>(null);

  const keys = useRef({ w: false, a: false, s: false, d: false });
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "w" || e.key === "W") keys.current.w = true;
      if (e.key === "a" || e.key === "A") keys.current.a = true;
      if (e.key === "s" || e.key === "S") keys.current.s = true;
      if (e.key === "d" || e.key === "D") keys.current.d = true;
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      if (e.key === "w" || e.key === "W") keys.current.w = false;
      if (e.key === "a" || e.key === "A") keys.current.a = false;
      if (e.key === "s" || e.key === "S") keys.current.s = false;
      if (e.key === "d" || e.key === "D") keys.current.d = false;
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, []);

  useFrame(() => {
    // Moverse para adelante
    if (keys.current.w) {
      ref.current?.applyImpulse({ x: 0, y: 0, z: -2 }, true);
    }

    // Moverse para atrás
    if (keys.current.s) {
      ref.current?.applyImpulse({ x: 0, y: 0, z: 2 }, true);
    }

    // Moverse para izquierda
    if (keys.current.a) {
      ref.current?.applyImpulse({ x: -2, y: 0, z: 0 }, true);
    }

    // Moverse para derecha
    if (keys.current.d) {
      ref.current?.applyImpulse({ x: 2, y: 0, z: 0 }, true);
    }
  });

  return (
    <RigidBody type="dynamic" ref={ref} position={[0, 1, 0]}>
      <FollowCamera target={ref} />
      <mesh>
        <sphereGeometry />
        <meshStandardMaterial emissive={"white"} emissiveIntensity={2} />
      </mesh>
    </RigidBody>
  );
}

export default function MiniGame1Page() {
  return (
    <div className="h-screen bg-black">
      <Canvas>
        {/* <OrbitControls /> */}

        <hemisphereLight intensity={0.3} />
        <spotLight intensity={20} position={[10, 10, 20]} />

        <EffectComposer>
          <Bloom />
          <Noise opacity={0.05} />
        </EffectComposer>

        <Suspense>
          <Physics gravity={[0, -9.81, 0]}>
            <Escenario />
            <Player />
          </Physics>
        </Suspense>
      </Canvas>
    </div>
  );
}
