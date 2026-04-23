import { OrbitControls } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import {
  Bloom,
  ChromaticAberration,
  DepthOfField,
  EffectComposer,
  Noise,
  Vignette,
} from "@react-three/postprocessing";
import { useEffect, useRef } from "react";
import { Color, Object3D, type InstancedMesh } from "three";

const Piso = () => {
  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1, 0]}>
      <planeGeometry args={[50, 50]} />
      <meshStandardMaterial color={"white"} />
    </mesh>
  );
};

const CubosInstanciados = () => {
  const meshRef = useRef<InstancedMesh>(null);

  useEffect(() => {
    if (!meshRef.current) return;

    //Seteamos acá las posiciones de cada cubo
    const tempObject = new Object3D();

    for (let i = 0; i < 100; i++) {
      tempObject.position.set(
        Math.random() * 20 - 10, // x entre -10 y 10
        Math.random() * 5, // y entre 0 y 5
        Math.random() * 20 - 10, // z entre -10 y 10
      );

      tempObject.updateMatrix();
      meshRef.current.setMatrixAt(i, tempObject.matrix);

      const color = new Color(Math.random(), Math.random(), Math.random());
      meshRef.current.setColorAt(i, color);
    }
    meshRef.current.instanceMatrix.needsUpdate = true;

    if (meshRef.current.instanceColor) {
      meshRef.current.instanceColor.needsUpdate = true;
    }
  }, []);

  useFrame((state, delta) => {
    if (!meshRef.current) return;

    const tempObject = new Object3D();
    const time = state.clock.elapsedTime;

    for (let i = 0; i < 100; i++) {
      meshRef.current.getMatrixAt(i, tempObject.matrix);

      tempObject.matrix.decompose(
        tempObject.position,
        tempObject.quaternion,
        tempObject.scale,
      );

      tempObject.rotation.x += delta * 0.5;
      tempObject.rotation.y += delta * 0.5;

      // ESTO ES NUEVO — la posición Y oscila
      tempObject.position.y += Math.sin(time + i * 0.1) * 0.01;

      tempObject.updateMatrix();
      meshRef.current.setMatrixAt(i, tempObject.matrix);
    }
    meshRef.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={meshRef} args={[undefined, undefined, 100]}>
      <boxGeometry />
      <meshStandardMaterial emissive={"red"} emissiveIntensity={2} />
    </instancedMesh>
  );
};

export default function InstancedMeshPage() {
  return (
    <div className="h-screen bg-black">
      <Canvas>
        <OrbitControls />
        <hemisphereLight intensity={0.3} />
        <spotLight intensity={10} position={[10, 10, 10]} />

        <CubosInstanciados />
        <Piso />

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
