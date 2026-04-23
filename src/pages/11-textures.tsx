import { OrbitControls, useTexture } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";

function Piso() {
  const [diffuse, normal, roughness] = useTexture([
    "/textures/Wood070_1K-JPG/Wood070_1K-JPG_Color.jpg",
    "/textures/Wood070_1K-JPG/Wood070_1K-JPG_NormalGL.jpg",
    "/textures/Wood070_1K-JPG/Wood070_1K-JPG_Roughness.jpg",
  ]);

  return (
    <mesh position={[0, -2, 0]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
      <planeGeometry args={[32, 32]} />
      <meshStandardMaterial
        map={diffuse}
        normalMap={normal}
        roughnessMap={roughness}
      />
    </mesh>
  );
}

function Pelota() {
  const [diffuse, normal, roughness] = useTexture([
    "/textures/Marble016_1K-JPG/Marble016_1K-JPG_Color.jpg",
    "/textures/Marble016_1K-JPG/Marble016_1K-JPG_NormalGL.jpg",
    "/textures/Marble016_1K-JPG/Marble016_1K-JPG_Roughness.jpg",
  ]);
  return (
    <mesh castShadow>
      <sphereGeometry args={[1, 32, 32]} />
      <meshStandardMaterial
        map={diffuse}
        normalMap={normal}
        roughnessMap={roughness}
      />
    </mesh>
  );
}

function Pelota2() {
  const [diffuse, normal, roughness] = useTexture([
    "/textures/ChristmasTreeOrnament019_1K-JPG/ChristmasTreeOrnament019_1K-JPG_Color.jpg",
    "/textures/ChristmasTreeOrnament019_1K-JPG/ChristmasTreeOrnament019_1K-JPG_NormalGL.jpg",
    "/textures/ChristmasTreeOrnament019_1K-JPG/ChristmasTreeOrnament019_1K-JPG_Roughness.jpg",
  ]);
  return (
    <mesh position={[3, 0, 0]} castShadow>
      <sphereGeometry args={[1, 32, 32]} />
      <meshStandardMaterial
        map={diffuse}
        normalMap={normal}
        roughnessMap={roughness}
      />
    </mesh>
  );
}

function Pelota3() {
  const [diffuse, normal, roughness] = useTexture([
    "/textures/Ground104_1K-JPG/Ground104_1K-JPG_Color.jpg",
    "/textures/Ground104_1K-JPG/Ground104_1K-JPG_NormalDX.jpg",
    "/textures/Ground104_1K-JPG/Ground104_1K-JPG_Roughness.jpg",
  ]);
  return (
    <mesh position={[-3, 0, 0]} castShadow>
      <sphereGeometry args={[1, 32, 32]} />
      <meshStandardMaterial
        map={diffuse}
        normalMap={normal}
        roughnessMap={roughness}
      />
    </mesh>
  );
}

function Pelota4() {
  const [diffuse, normal, roughness] = useTexture([
    "/textures/Fabric061_1K-JPG/Fabric061_1K-JPG_Color.jpg",
    "/textures/Fabric061_1K-JPG/Fabric061_1K-JPG_NormalDX.jpg",
    "/textures/Fabric061_1K-JPG/Fabric061_1K-JPG_Roughness.jpg",
  ]);
  return (
    <mesh position={[-6, 0, 0]} castShadow>
      <sphereGeometry args={[1, 32, 32]} />
      <meshStandardMaterial
        map={diffuse}
        normalMap={normal}
        roughnessMap={roughness}
      />
    </mesh>
  );
}

export default function TexturesPage() {
  return (
    <div className="h-screen bg-black">
      <Canvas shadows>
        <OrbitControls />

        <hemisphereLight intensity={1} />
        <spotLight
          intensity={500}
          color={"white"}
          position={[0, 10, 10]}
          castShadow
        />
        <Pelota />
        <Pelota2 />
        <Pelota3 />
        <Pelota4 />
        <Piso />
      </Canvas>
    </div>
  );
}
