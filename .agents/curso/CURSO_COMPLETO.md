# 🎓 CURSO COMPLETO DE THREE.JS
## De Cero a Héroe - Prácticas Modernas 2026

---

# MÓDULO 1: FUNDAMENTOS AVANZADOS ✅
*(Ya visto arriba)*

---

# MÓDULO 2: CÁMARAS Y CONTROLES

## 2.1 Tipos de Cámara

```javascript
import * as THREE from 'three';

// PERSPECTIVE - La más común, simula el ojo humano
const perspectiveCam = new THREE.PerspectiveCamera(
  75,  // FOV - ángulo de visión (más = más amplio)
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);

// ORTHOGRAPHIC - Sin distorsión de perspectiva (2D/isométrico)
const aspect = window.innerWidth / window.innerHeight;
const frustumSize = 10;
const orthoCam = new THREE.OrthographicCamera(
  (frustumSize * aspect) / -2,
  (frustumSize * aspect) / 2,
  frustumSize / 2,
  frustumSize / -2,
  0.1,
  1000
);

// ARRAY CAMERA - Múltiples vistas (ej: mirrors)
const arrayCam = new THREE.ArrayCamera([
  camera1, camera2, camera3, camera4
]);
```

## 2.2 OrbitControls (el más usado)

```javascript
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

const controls = new OrbitControls(camera, renderer.domElement);

// Configuración importante
controls.enableDamping = true;           // Suavizado (MUY IMPORTANTE)
controls.dampingFactor = 0.05;
controls.enableZoom = true;
controls.enablePan = true;
controls.minDistance = 2;                 // Zoom mínimo
controls.maxDistance = 50;                // Zoom máximo
controls.maxPolarAngle = Math.PI / 2;    // No ir bajo el suelo
controls.autoRotate = true;               // Rotación automática
controls.autoRotateSpeed = 2.0;

// En el loop
function animate() {
  requestAnimationFrame(animate);
  controls.update(); // NECESARIO si enableDamping = true
  renderer.render(scene, camera);
}
```

## 2.3 Otros Controles

```javascript
// FIRST PERSON - Como un FPS
import { FirstPersonControls } from 'three/addons/controls/FirstPersonControls.js';
const fpControls = new FirstPersonControls(camera, renderer.domElement);
fpControls.movementSpeed = 10;
fpControls.lookSpeed = 0.1;

// POINTER LOCK - Captura el mouse (juegos)
import { PointerLockControls } from 'three/addons/controls/PointerLockControls.js';
const plControls = new PointerLockControls(camera, document.body);

// Click para activar
document.addEventListener('click', () => {
  plControls.lock();
});

// MAP CONTROLS - Para mapas (pan con click derecho)
import { MapControls } from 'three/addons/controls/MapControls.js';
const mapControls = new MapControls(camera, renderer.domElement);
mapControls.enableDamping = true;
mapControls.dampingFactor = 0.05;
mapControls.screenSpacePanning = false;
```

## 2.4 Transiciones de Cámara con GSAP

```javascript
import gsap from 'gsap';

// Mover cámara suavemente
gsap.to(camera.position, {
  x: 5,
  y: 3,
  z: 10,
  duration: 2,
  ease: "power2.inOut",
  onUpdate: () => camera.lookAt(0, 0, 0)
});

// O usando timeline para secuencias
const tl = gsap.timeline();

tl.to(camera.position, { x: 5, y: 5, z: 5, duration: 1 })
  .to(camera.position, { x: -5, y: 3, z: 0, duration: 1 })
  .to(camera.position, { x: 0, y: 10, z: 0, duration: 1 });
```

---

# MÓDULO 3: CARGA DE MODELOS GLTF/GLB

## 3.1 GLTFLoader básico

```javascript
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

const loader = new GLTFLoader();

loader.load(
  'modelo.glb',  // o .gltf
  (gltf) => {
    const model = gltf.scene;
    
    // Ajustar escala si es necesario
    model.scale.set(1, 1, 1);
    
    // Posicionar
    model.position.set(0, 0, 0);
    
    // Habilitar sombras en todos los meshes
    model.traverse((child) => {
      if (child.isMesh) {
        child.castShadow = true;
        child.receiveShadow = true;
      }
    });
    
    scene.add(model);
    
    // Las animaciones están en gltf.animations
    console.log('Animaciones disponibles:', gltf.animations);
  },
  (progress) => {
    const percent = (progress.loaded / progress.total * 100).toFixed(0);
    console.log(`Cargando: ${percent}%`);
  },
  (error) => {
    console.error('Error:', error);
  }
);
```

## 3.2 Draco Compression (modelos optimizados)

```javascript
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { DRACOLoader } from 'three/addons/loaders/DRACOLoader.js';

// Configurar decodificador Draco
const dracoLoader = new DRACOLoader();
dracoLoader.setDecoderPath('https://www.gstatic.com/draco/versioned/decoders/1.5.6/');

const loader = new GLTFLoader();
loader.setDRACOLoader(dracoLoader);

loader.load('modelo-comprimido.glb', (gltf) => {
  scene.add(gltf.scene);
});
```

## 3.3 Loading Manager (múltiples recursos)

```javascript
const manager = new THREE.LoadingManager();

manager.onStart = (url, loaded, total) => {
  console.log(`Iniciando: ${loaded}/${total}`);
};

manager.onProgress = (url, loaded, total) => {
  const progress = (loaded / total * 100).toFixed(0);
  // Actualizar UI de carga
  document.getElementById('progress').textContent = `${progress}%`;
};

manager.onLoad = () => {
  console.log('¡Todo cargado!');
  // Ocultar pantalla de carga
  document.getElementById('loading').style.display = 'none';
};

manager.onError = (url) => {
  console.error(`Error cargando: ${url}`);
};

// Usar con cualquier loader
const gltfLoader = new GLTFLoader(manager);
const textureLoader = new THREE.TextureLoader(manager);
```

---

# MÓDULO 4: MATERIALES Y TEXTURAS AVANZADAS

## 4.1 Texturas Múltiples

```javascript
import { TextureLoader } from 'three';
import { useLoader } from '@react-three/fiber'; // Si usás R3F

const textureLoader = new THREE.TextureLoader();

// Cargar todas las texturas
const [colorMap, normalMap, roughnessMap, aoMap] = await Promise.all([
  textureLoader.loadAsync('textura-color.jpg'),
  textureLoader.loadAsync('textura-normal.jpg'),
  textureLoader.loadAsync('textura-roughness.jpg'),
  textureLoader.loadAsync('textura-ao.jpg')
]);

// Configurar texturas
colorMap.colorSpace = THREE.SRGBColorSpace;
normalMap.wrapS = normalMap.wrapT = THREE.RepeatWrapping;
aoMap.repeat.set(2, 2);

// Aplicar al material
const material = new THREE.MeshStandardMaterial({
  map: colorMap,
  normalMap: normalMap,
  normalScale: new THREE.Vector2(1, 1),
  roughnessMap: roughnessMap,
  aoMap: aoMap,
  aoMapIntensity: 1
});
```

## 4.2 HDRI Environment

```javascript
import { RGBELoader } from 'three/addons/loaders/RGBELoader.js';

// Cargar HDRI
new RGBELoader()
  .load('royal_esplanade_1k.hdr', (texture) => {
    texture.mapping = THREE.EquirectangularReflectionMapping;
    
    // Environment = iluminación reflejada
    scene.environment = texture;
    
    // Background = lo que ves de fondo
    scene.background = texture; // O scene.backgroundBlurriness = 0.5 para borroso
  });

// Fuentes de HDRI gratuitos:
// - polyhaven.com
// - hdrihub.com
// - ambientcg.com
```

## 4.3 Materiales Especiales

```javascript
// VIDRIO/CRISTAL
const glassMaterial = new THREE.MeshPhysicalMaterial({
  color: 0xffffff,
  metalness: 0,
  roughness: 0,
  transmission: 0.95,    // Qué tan transparente
  thickness: 0.5,        // Grosor para refracción
  ior: 1.5,             // Índice de refracción (1.5 = vidrio)
  transparent: true,
  opacity: 1,
  clearcoat: 1,
  clearcoatRoughness: 0
});

// METAL PULIDO
const polishedMetal = new THREE.MeshStandardMaterial({
  color: 0xaaaaaa,
  metalness: 1.0,
  roughness: 0.1,
  envMapIntensity: 1.0
});

// CROMO (espejo perfecto)
const chrome = new THREE.MeshStandardMaterial({
  color: 0xffffff,
  metalness: 1.0,
  roughness: 0.0
});

// SUBSURFACE SCATTERING (cera, hojas, piel)
const sssMaterial = new THREE.MeshPhysicalMaterial({
  color: 0xff8888,
  thickness: 1.0,
  transmission: 0.5,
  roughness: 0.5,
  ior: 1.5,
  clearcoat: 0.5
});

// IRIDESCENCE (efecto aceite/bola de cristal)
const iridescent = new THREE.MeshPhysicalMaterial({
  color: 0xffffff,
  metalness: 0,
  roughness: 0.1,
  iridescence: 1,
  iridescenceIOR: 1.3,
  iridescenceThicknessRange: [100, 400]
});
```

## 4.4 Custom Shaders (ShaderMaterial)

```javascript
const vertexShader = `
  varying vec2 vUv;
  varying vec3 vNormal;
  
  void main() {
    vUv = uv;
    vNormal = normalize(normalMatrix * normal);
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const fragmentShader = `
  uniform vec3 uColor;
  uniform float uTime;
  varying vec2 vUv;
  varying vec3 vNormal;
  
  void main() {
    // Gradiente basado en normals
    float intensity = dot(vNormal, vec3(0.0, 1.0, 0.0));
    
    // Efecto de time
    float pulse = sin(uTime * 2.0) * 0.1 + 0.9;
    
    vec3 color = uColor * intensity * pulse;
    gl_FragColor = vec4(color, 1.0);
  }
`;

const shaderMaterial = new THREE.ShaderMaterial({
  vertexShader,
  fragmentShader,
  uniforms: {
    uColor: { value: new THREE.Color(0x00ff00) },
    uTime: { value: 0 }
  }
});

// En el loop, actualizar uniforms
function animate() {
  shaderMaterial.uniforms.uTime.value = clock.getElapsedTime();
}
```

---

# MÓDULO 5: ANIMACIONES

## 5.1 AnimationMixer (para modelos GLTF)

```javascript
let mixer;
let actions = {};
let activeAction;

function setupAnimations(model) {
  // Crear mixer
  mixer = new THREE.AnimationMixer(model);
  
  // Obtener animaciones del modelo
  const clips = model.animations || model.gltf.animations;
  
  // Crear acciones para cada animación
  clips.forEach((clip) => {
    actions[clip.name] = mixer.clipAction(clip);
  });
  
  // Play animación por defecto
  playAnimation('Idle');
}

function playAnimation(name, fadeDuration = 0.5) {
  const newAction = actions[name];
  if (!newAction || activeAction === newAction) return;
  
  if (activeAction) {
    // Transición suave
    activeAction.fadeOut(fadeDuration);
  }
  
  newAction.reset().fadeIn(fadeDuration).play();
  activeAction = newAction;
}

// En el loop
const clock = new THREE.Clock();

function animate() {
  const delta = clock.getDelta();
  
  if (mixer) {
    mixer.update(delta);
  }
  
  renderer.render(scene, camera);
}
```

## 5.2 GSAP (GreenSock Animation Platform)

```javascript
import gsap from 'gsap';

// Animación básica
gsap.to(mesh.position, {
  x: 5,
  duration: 1,
  ease: "power2.out"
});

// Múltiples propiedades
gsap.to(mesh.rotation, {
  y: Math.PI * 2,
  duration: 2,
  ease: "elastic.out(1, 0.3)"
});

// Secuencia con Timeline
const tl = gsap.timeline({ repeat: -1, yoyo: true });

tl.to(mesh.position, { x: 3, duration: 1 })
  .to(mesh.rotation, { y: Math.PI, duration: 0.5 }, "-=0.25")
  .to(mesh.scale, { x: 1.5, y: 1.5, z: 1.5, duration: 0.5 });

// Animación de cámara
gsap.to(camera.position, {
  x: 10,
  y: 5,
  z: 10,
  duration: 2,
  ease: "power2.inOut",
  onUpdate: () => camera.lookAt(scene.position)
});

// Easing disponibles:
// - linear, power1.out, power2.out, power3.out
// - elastic.out, bounce.out
// - back.out, circ.out, expo.out
```

## 5.3 THEATRE.JS (El que mencionaste)

```javascript
import { onHotReplay, val } from '@theatre/core';
import studio from '@theatre/studio';

// INICIALIZAR
studio.initialize();

// CONFIGURAR PROYECTO
const project = studio.getProject('My 3D Scene');

// Crear sheet (como una hoja de animación)
const sheet = project.sheet('Main');

// Obtener objeto del objeto 3D
const cubeObj = sheet.object('Cube', {
  position: { x: 0, y: 0, z: 0 },
  rotation: { x: 0, y: 0, z: 0 },
  scale: { x: 1, y: 1, z: 1 }
});

// ACTUALIZAR THREE.JS
function updateFromTheatre() {
  cube.position.set(
    val(cubeObj.props.position.x),
    val(cubeObj.props.position.y),
    val(cubeObj.props.position.z)
  );
  cube.rotation.set(
    val(cubeObj.props.rotation.x),
    val(cubeObj.props.rotation.y),
    val(cubeObj.props.rotation.z)
  );
  cube.scale.set(
    val(cubeObj.props.scale.x),
    val(cubeObj.props.scale.y),
    val(cubeObj.props.scale.z)
  );
}

// Suscribir a cambios
cubeObj.onValuesChange(updateFromTheatre);

// PLAY
project.ready.then(() => {
  sheet.play({ loop: true });
});

// HOT RELOAD (desarrollo)
onHotReplay(() => {
  updateFromTheatre();
});
```

**¿Por qué Theatre.js?**
- Interfaz visual para animaciones
- No necesitas código para crear animaciones complejas
- Ideal para cinematics y transiciones
- Se integra directamente con Three.js

## 5.4 Animación Procedural

```javascript
// Usando math para animaciones
const clock = new THREE.Clock();

function animate() {
  const time = clock.getElapsedTime();
  const delta = clock.getDelta();
  
  // Oscilación (seno)
  mesh.position.y = Math.sin(time) * 2;
  
  // Rotación continua
  mesh.rotation.y += delta * 0.5;
  
  // Escala pulsante
  const scale = 1 + Math.sin(time * 3) * 0.2;
  mesh.scale.setScalar(scale);
  
  // Follow mouse/path
  mesh.position.x = Math.cos(time * 0.5) * 5;
  mesh.position.z = Math.sin(time * 0.5) * 5;
}

// PARTICLES ANIMATION
const particlesGeometry = new THREE.BufferGeometry();
const particleCount = 1000;

const positions = new Float32Array(particleCount * 3);
for(let i = 0; i < particleCount * 3; i++) {
  positions[i] = (Math.random() - 0.5) * 10;
}
particlesGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

const particlesMaterial = new THREE.PointsMaterial({
  size: 0.05,
  color: 0x00ffff
});

const particles = new THREE.Points(particlesGeometry, particlesMaterial);
scene.add(particles);

function animateParticles() {
  const positions = particles.geometry.attributes.position.array;
  
  for(let i = 0; i < particleCount; i++) {
    // Mover partículas
    positions[i * 3 + 1] += 0.01; // Y
    
    // Reset si sale del rango
    if(positions[i * 3 + 1] > 5) {
      positions[i * 3 + 1] = -5;
    }
  }
  
  particles.geometry.attributes.position.needsUpdate = true;
}
```

---

# MÓDULO 6: FÍSICA CON RAPIER

## 6.1 Setup de Rapier (Vanilla)

```javascript
import RAPIER from '@dimforge/rapier3d-compat';

async function initPhysics() {
  await RAPIER.init();
  
  const gravity = { x: 0.0, y: -9.81, z: 0.0 };
  const world = new RAPIER.World(gravity);
  
  return world;
}

// Crear collider
function createCollider(shape, position) {
  let colliderDesc;
  
  if (shape === 'cuboid') {
    colliderDesc = RAPIER.ColliderDesc.cuboid(halfExtents.x, halfExtents.y, halfExtents.z);
  } else if (shape === 'ball') {
    colliderDesc = RAPIER.ColliderDesc.ball(radius);
  } else if (shape === 'cylinder') {
    colliderDesc = RAPIER.ColliderDesc.cylinder(halfHeight, radius);
  }
  
  const collider = world.createCollider(colliderDesc);
  collider.setTranslation(position);
  
  return collider;
}

// En el loop de animación
function updatePhysics() {
  world.step();
  
  // Sincronizar mesh con collider
  mesh.position.copy(collider.translation());
  mesh.quaternion.copy(collider.rotation());
}
```

## 6.2 React Three Rapier (más fácil)

```javascript
import { Physics, RigidBody, CuboidCollider, BallCollider } from '@react-three/rapier';

function Scene() {
  return (
    <Physics gravity={[0, -9.81, 0]}>
      {/* SUELO */}
      <RigidBody type="fixed" colliders={false}>
        <CuboidCollider args={[10, 0.5, 10]} />
        <mesh receiveShadow>
          <planeGeometry args={[20, 20]} />
          <meshStandardMaterial color="gray" />
        </mesh>
      </RigidBody>
      
      {/* OBJETO QUE CAE */}
      <RigidBody 
        position={[0, 5, 0]} 
        colliders="ball"
        restitution={0.7}  // rebote
        friction={0.5}
      >
        <mesh castShadow>
          <sphereGeometry args={[0.5]} />
          <meshStandardMaterial color="red" />
        </mesh>
      </RigidBody>
      
      {/* CAJA */}
      <RigidBody 
        position={[2, 3, 0]}
        colliders="cuboid"
        restitution={0.3}
      >
        <mesh castShadow>
          <boxGeometry args={[1, 1, 1]} />
          <meshStandardMaterial color="blue" />
        </mesh>
      </RigidBody>
    </Physics>
  );
}
```

## 6.3 Tipos de RigidBody

```javascript
// FIXED - No se mueve (suelo, paredes)
<RigidBody type="fixed">
  <CuboidCollider args={[10, 0.5, 10]} />
  <mesh><planeGeometry /></mesh>
</RigidBody>

// DYNAMIC - Se mueve con física
<RigidBody 
  position={[0, 5, 0]} 
  dynamic 
  linearDamping={0.5}    // Resistencia al movimiento
  angularDamping={0.5}   // Resistencia a rotación
>
  <mesh><sphereGeometry /></mesh>
</RigidBody>

// KINEMATIC - Movido por código, afecta a otros
<RigidBody type="kinematicPosition" colliders={false}>
  <CuboidCollider args={[1, 0.5, 1]} />
  <mesh><boxGeometry /></mesh>
</RigidBody>
```

## 6.4 Joints (conexiones)

```javascript
// BALL JOINT - rótula
<RigidBody position={[-2, 3, 0]} colliders="cuboid">
  <BallJoint 
    anchorA={[1, 0, 0]} 
    anchorB={[-1, 0, 0]} 
  />
</RigidBody>

// FIXED JOINT - fijo juntos
<RigidBody position={[0, 2, 0]} colliders="cuboid">
  <FixedJoint anchorA={[0, 0.5, 0]} anchorB={[0, -0.5, 0]} />
</RigidBody>

// PRISMATIC - slider (solo un eje)
<RigidBody position={[2, 3, 0]} colliders="cuboid">
  <PrismaticJoint 
    anchorA={[0, 0, 0]} 
    anchorB={[0, 0, 0]} 
    axis={[1, 0, 0]}  // solo se mueve en X
  />
</RigidBody>
```

---

# MÓDULO 7: POST-PROCESAMIENTO

## 7.1 Setup EffectComposer

```javascript
import { EffectComposer } from 'three/addons/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/addons/postprocessing/RenderPass.js';
import { UnrealBloomPass } from 'three/addons/postprocessing/UnrealBloomPass.js';
import { ShaderPass } from 'three/addons/postprocessing/ShaderPass.js';

// Compositor
const composer = new EffectComposer(renderer);

// Render pass (escena base)
const renderPass = new RenderPass(scene, camera);
composer.addPass(renderPass);

// BLOOM (brillo)
const bloomPass = new UnrealBloomPass(
  new THREE.Vector2(window.innerWidth, window.innerHeight),
  1.5,   // strength
  0.4,   // radius
  0.85   // threshold
);
composer.addPass(bloomPass);

// En el loop, usar composer en vez de renderer
function animate() {
  requestAnimationFrame(animate);
  composer.render();  // NO renderer.render()
}
```

## 7.2 Efectos Disponibles

```javascript
import { UnrealBloomPass } from 'three/addons/postprocessing/UnrealBloomPass.js';
import { BokehPass } from 'three/addons/postprocessing/BokehPass.js';
import { SMAAPass } from 'three/addons/postprocessing/SMAAPass.js';
import { SSAOPass } from 'three/addons/postprocessing/SSAOPass.js';
import { OutputPass } from 'three/addons/postprocessing/OutputPass.js';

// BLOOM - brillo/luminancia
const bloom = new UnrealBloomPass(
  new THREE.Vector2(width, height),
  1.5,  // strength
  0.4,  // radius
  0.85  // threshold
);

// DEPTH OF FIELD (bokeh)
const dof = new BokehPass(scene, camera, {
  focus: 1.0,
  aperture: 0.025,
  maxblur: 0.01
});

// ANTI-ALIASING (SMAA)
const smaa = new SMAAPass(width, height);
composer.addPass(smaa);

// AMBIENT OCCLUSION
const ssao = new SSAOPass(scene, camera, width, height);
composer.addPass(ssao);

// OUTPUT (tonemapping final)
const output = new OutputPass();
composer.addPass(output);
```

## 7.3 Custom Shader Pass

```javascript
// Efecto vintage/sepia
const CustomShader = {
  uniforms: {
    tDiffuse: { value: null },
    uIntensity: { value: 1.0 }
  },
  vertexShader: `
    varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,
  fragmentShader: `
    uniform sampler2D tDiffuse;
    uniform float uIntensity;
    varying vec2 vUv;
    
    void main() {
      vec4 color = texture2D(tDiffuse, vUv);
      
      // Sepia
      float gray = dot(color.rgb, vec3(0.299, 0.587, 0.114));
      vec3 sepia = vec3(gray) * vec3(1.2, 1.0, 0.8);
      
      // Mezclar
      color.rgb = mix(color.rgb, sepia, uIntensity);
      
      gl_FragColor = color;
    }
  `
};

const customPass = new ShaderPass(CustomShader);
composer.addPass(customPass);

// Ajustar en runtime
customPass.uniforms.uIntensity.value = 0.5;
```

---

# MÓDULO 8: INTERACTIVIDAD Y RAYCASTING

## 8.1 Raycaster (detectar clicks)

```javascript
const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();

function onMouseClick(event) {
  // Normalizar coordenadas del mouse (-1 a +1)
  mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
  mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
  
  // Lanzar rayo desde la cámara
  raycaster.setFromCamera(mouse, camera);
  
  // Detectar intersecciones
  const intersects = raycaster.intersectObjects(scene.children, true);
  
  if (intersects.length > 0) {
    const object = intersects[0].object;
    console.log('Clickeaste:', object.name || object.uuid);
    
    // Ejecutar acción
    onObjectClick(object);
  }
}

window.addEventListener('click', onMouseClick);

// Hover
function onMouseMove(event) {
  mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
  mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
  
  raycaster.setFromCamera(mouse, camera);
  const intersects = raycaster.intersectObjects(scene.children);
  
  // Reset color anterior
  if (hoveredObject) {
    hoveredObject.material.emissive.setHex(0x000000);
  }
  
  if (intersects.length > 0) {
    hoveredObject = intersects[0].object;
    hoveredObject.material.emissive.setHex(0x333333);
    document.body.style.cursor = 'pointer';
  } else {
    hoveredObject = null;
    document.body.style.cursor = 'default';
  }
}

window.addEventListener('mousemove', onMouseMove);
```

## 8.2 TransformControls (mover objetos)

```javascript
import { TransformControls } from 'three/addons/controls/TransformControls.js';

const controls = new TransformControls(camera, renderer.domElement);
controls.addEventListener('dragging-changed', (event) => {
  // Deshabilitar orbit mientras arrastramos
  orbitControls.enabled = !event.value;
});

scene.add(controls);

// Adjuntar a un objeto
controls.attach(mesh);

// Modos: 'translate', 'rotate', 'scale'
controls.setMode('translate');

// Alternar con teclado
window.addEventListener('keydown', (event) => {
  switch (event.key) {
    case 't':
      controls.setMode('translate');
      break;
    case 'r':
      controls.setMode('rotate');
      break;
    case 's':
      controls.setMode('scale');
      break;
  }
});
```

## 8.3 CSS3DRenderer (UI en 3D)

```javascript
import { CSS3DRenderer, CSS3DObject } from 'three/addons/renderers/CSS3DRenderer.js';

const cssRenderer = new CSS3DRenderer();
cssRenderer.setSize(window.innerWidth, window.innerHeight);
cssRenderer.domElement.style.position = 'absolute';
cssRenderer.domElement.style.top = '0';
cssRenderer.domElement.style.pointerEvents = 'none'; // Click a través
document.body.appendChild(cssRenderer.domElement);

// Crear elemento HTML como objeto 3D
const div = document.createElement('div');
div.innerHTML = '<h1>¡Hola!</h1><button>Click me</button>';
div.style.background = 'white';
div.style.padding = '10px';
div.style.borderRadius = '8px';

const cssObject = new CSS3DObject(div);
cssObject.position.set(0, 2, 0);
cssObject.scale.set(0.01, 0.01, 0.01); // Escalar porque HTML es grande
scene.add(cssObject);

// Renderizar ambos
function animate() {
  renderer.render(scene, camera);
  cssRenderer.render(scene, camera);
}
```

---

# MÓDULO 9: RENDIMIENTO Y OPTIMIZACIÓN

## 9.1 InstancedMesh (muchos objetos iguales)

```javascript
const count = 1000;
const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshStandardMaterial({ color: 0x00ff00 });

// Un mesh, muchas instancias
const instancedMesh = new THREE.InstancedMesh(geometry, material, count);

const dummy = new THREE.Object3D();

for (let i = 0; i < count; i++) {
  dummy.position.set(
    (Math.random() - 0.5) * 50,
    Math.random() * 20,
    (Math.random() - 0.5) * 50
  );
  dummy.rotation.set(
    Math.random() * Math.PI,
    Math.random() * Math.PI,
    Math.random() * Math.PI
  );
  dummy.scale.setScalar(Math.random() * 0.5 + 0.5);
  
  dummy.updateMatrix();
  instancedMesh.setMatrixAt(i, dummy.matrix);
}

instancedMesh.castShadow = true;
instancedMesh.receiveShadow = true;
scene.add(instancedMesh);

// Cambiar color de una instancia
const color = new THREE.Color(0xff0000);
instancedMesh.setColorAt(0, color);
instancedMesh.instanceColor.needsUpdate = true;
```

## 9.2 LOD (Level of Detail)

```javascript
import { LOD, Mesh } from 'three';

const lod = new LOD();

// Alta calidad (cerca)
const highDetail = new THREE.Mesh(
  new THREE.SphereGeometry(1, 64, 64),
  material
);

// Media calidad
const medDetail = new THREE.Mesh(
  new THREE.SphereGeometry(1, 32, 32),
  material
);

// Baja calidad (lejos)
const lowDetail = new THREE.Mesh(
  new THREE.SphereGeometry(1, 8, 8),
  material
);

lod.addLevel(highDetail, 0);
lod.addLevel(medDetail, 20);
lod.addLevel(lowDetail, 50);

scene.add(lod);

// En el loop, Three.js cambia automáticamente
```

## 9.3 Stats.js (medir FPS)

```javascript
import Stats from 'three/addons/libs/stats.module.js';

const stats = new Stats();
stats.showPanel(0); // 0: fps, 1: ms, 2: mb
document.body.appendChild(stats.dom);

function animate() {
  stats.begin();
  
  // Tu código aquí
  
  renderer.render(scene, camera);
  
  stats.end();
}
```

## 9.4 WebGPU Renderer (El Futuro)

```javascript
import * as THREE from 'three/webgpu';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import WebGPU from 'three/addons/capabilities/WebGPU.js';

// Verificar soporte
if (WebGPU.isAvailable()) {
  const renderer = new THREE.WebGPURenderer({ antialias: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);
  
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
  camera.position.set(0, 2, 5);
  
  // Scene muy similar a WebGL
  const mesh = new THREE.Mesh(
    new THREE.BoxGeometry(),
    new THREE.MeshStandardMaterial({ color: 'cyan' })
  );
  scene.add(mesh);
  
  // TSL - Three Shading Language (nuevo)
  // Esto se verá en el Módulo 12
}

function animate() {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
}
```

---

# MÓDULO 10: REACT THREE FIBER (R3F)

## 10.1 Setup Básico

```javascript
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment } from '@react-three/drei';

function Scene() {
  return (
    <>
      <OrbitControls />
      <Environment preset="sunset" />
      
      <mesh position={[0, 0, 0]}>
        <boxGeometry />
        <meshStandardMaterial color="orange" />
      </mesh>
      
      <mesh position={[2, 1, 0]}>
        <sphereGeometry args={[1, 32, 32]} />
        <meshStandardMaterial color="cyan" metalness={0.9} roughness={0.1} />
      </mesh>
      
      {/* Iluminación */}
      <ambientLight intensity={0.5} />
      <directionalLight position={[5, 5, 5]} intensity={1} castShadow />
    </>
  );
}

function App() {
  return (
    <Canvas shadows camera={{ position: [0, 2, 8], fov: 75 }}>
      <Scene />
    </Canvas>
  );
}
```

## 10.2 Drei - Helpers Esenciales

```javascript
import {
  // CONTROLES
  OrbitControls,
  MapControls,
  FirstPersonControls,
  
  // CARGA DE MODELOS
  useGLTF,
  useTexture,
  
  // ENTORNO
  Environment,
  Stage,
  Sky,
  
  // HELPERS
  Grid,
  AxesHelper,
  PerspectiveCamera,
  
  // UTILIDADES
  Text,
  Html,
  Float,
  Sparkles,
  Stars,
  
  // CARGADO
  useProgress,
  Loader
} from '@react-three/drei';

// Ejemplo: cargar modelo
function Model() {
  const { scene } = useGLTF('/model.glb');
  return <primitive object={scene} />;
}

// Ejemplo: cargar texturas
function TexturedPlane() {
  const props = useTexture({
    map: '/textures/color.jpg',
    normalMap: '/textures/normal.jpg',
    roughnessMap: '/textures/roughness.jpg',
    aoMap: '/textures/ao.jpg'
  });
  
  return (
    <mesh>
      <planeGeometry args={[5, 5]} />
      <meshStandardMaterial {...props} />
    </mesh>
  );
}

// Ejemplo: entorno HDR
function SceneWithEnv() {
  return (
    <>
      <Environment preset="sunset" background blur={0.5} />
      <mesh>
        <sphereGeometry args={[1, 32, 32]} />
        <meshStandardMaterial metalness={1} roughness={0.1} />
      </mesh>
    </>
  );
}

// Ejemplo: stage (preset de iluminación)
function SceneWithStage() {
  return (
    <Stage environment="city" intensity={0.5} shadows="contact">
      <mesh castShadow>
        <boxGeometry />
        <meshStandardMaterial color="red" />
      </mesh>
    </Stage>
  );
}
```

## 10.3 Estado y Eventos

```javascript
import { useRef, useState } from 'react';

function InteractiveMesh() {
  const meshRef = useRef();
  const [hovered, setHover] = useState(false);
  const [clicked, setClick] = useState(false);
  
  return (
    <mesh
      ref={meshRef}
      position={clicked ? [0, 2, 0] : [0, 0, 0]}
      onClick={() => setClick(!clicked)}
      onPointerOver={() => setHover(true)}
      onPointerOut={() => setHover(false)}
      onPointerMove={(e) => console.log(e.point)}
    >
      <boxGeometry args={[2, 2, 2]} />
      <meshStandardMaterial
        color={hovered ? 'hotpink' : 'orange'}
        metalness={0.5}
        roughness={0.5}
      />
    </mesh>
  );
}
```

## 10.4 R3F + Rapier (Física)

```javascript
import { Canvas } from '@react-three/fiber';
import { Physics, RigidBody, CuboidCollider } from '@react-three/rapier';

function Floor() {
  return (
    <RigidBody type="fixed" colliders={false}>
      <CuboidCollider args={[10, 0.5, 10]} />
      <mesh receiveShadow>
        <boxGeometry args={[20, 1, 20]} />
        <meshStandardMaterial color="gray" />
      </mesh>
    </RigidBody>
  );
}

function FallingBox() {
  const [pos, setPos] = useState([0, 5, 0]);
  
  return (
    <RigidBody 
      position={pos}
      colliders="cuboid"
      restitution={0.7}
    >
      <mesh castShadow onClick={() => setPos([Math.random() * 4 - 2, 5, 0])}>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial color="orange" />
      </mesh>
    </RigidBody>
  );
}

function Scene() {
  return (
    <Canvas shadows camera={{ position: [0, 5, 10] }}>
      <Physics>
        <Floor />
        <FallingBox />
        <FallingBox />
        <FallingBox />
      </Physics>
      <ambientLight intensity={0.5} />
      <directionalLight position={[5, 10, 5]} castShadow />
    </Canvas>
  );
}
```

---

# MÓDULO 11: PROYECTOS PRÁCTICOS

## 11.1 Proyecto: Escenario 3D Interactivo

```javascript
// Estructura completa de proyecto
import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { RGBELoader } from 'three/addons/loaders/RGBELoader.js';
import { EffectComposer } from 'three/addons/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/addons/postprocessing/RenderPass.js';
import { UnrealBloomPass } from 'three/addons/postprocessing/UnrealBloomPass.js';

class SceneManager {
  constructor() {
    this.init();
    this.loadAssets();
    this.setupLights();
    this.setupPostProcessing();
    this.setupEventListeners();
    this.animate();
  }
  
  init() {
    // Scene
    this.scene = new THREE.Scene();
    
    // Camera
    this.camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    this.camera.position.set(0, 2, 8);
    
    // Renderer
    this.renderer = new THREE.WebGLRenderer({
      antialias: true,
      powerPreference: 'high-performance'
    });
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
    this.renderer.shadowMap.enabled = true;
    this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    document.body.appendChild(this.renderer.domElement);
    
    // Controls
    this.controls = new OrbitControls(this.camera, this.renderer.domElement);
    this.controls.enableDamping = true;
    this.controls.dampingFactor = 0.05;
    this.controls.maxPolarAngle = Math.PI / 2 - 0.05;
  }
  
  async loadAssets() {
    // HDRI
    const hdri = await new Promise(resolve => {
      new RGBELoader().load(
        'https://dl.polyhaven.org/file/ph-assets/HDRIs/hdr/1k/royal_esplanade_1k.hdr',
        resolve
      );
    });
    hdri.mapping = THREE.EquirectangularReflectionMapping;
    this.scene.environment = hdri;
    this.scene.background = hdri;
    
    // Modelo GLTF
    const gltf = await new Promise((resolve, reject) => {
      new GLTFLoader().load('modelo.glb', resolve, undefined, reject);
    });
    this.model = gltf.scene;
    this.model.traverse(child => {
      if (child.isMesh) {
        child.castShadow = true;
        child.receiveShadow = true;
      }
    });
    this.scene.add(this.model);
    
    // Animaciones
    this.mixer = new THREE.AnimationMixer(this.model);
    gltf.animations.forEach(clip => {
      const action = this.mixer.clipAction(clip);
      action.play();
    });
  }
  
  setupLights() {
    const ambient = new THREE.AmbientLight(0xffffff, 0.3);
    this.scene.add(ambient);
    
    const sun = new THREE.DirectionalLight(0xffffff, 2);
    sun.position.set(10, 20, 10);
    sun.castShadow = true;
    sun.shadow.mapSize.width = 2048;
    sun.shadow.mapSize.height = 2048;
    sun.shadow.camera.near = 0.5;
    sun.shadow.camera.far = 50;
    sun.shadow.camera.left = -20;
    sun.shadow.camera.right = 20;
    sun.shadow.camera.top = 20;
    sun.shadow.camera.bottom = -20;
    this.scene.add(sun);
  }
  
  setupPostProcessing() {
    this.composer = new EffectComposer(this.renderer);
    
    const renderPass = new RenderPass(this.scene, this.camera);
    this.composer.addPass(renderPass);
    
    const bloomPass = new UnrealBloomPass(
      new THREE.Vector2(window.innerWidth, window.innerHeight),
      0.5, 0.4, 0.85
    );
    this.composer.addPass(bloomPass);
  }
  
  setupEventListeners() {
    window.addEventListener('resize', () => this.onResize());
    
    // Raycaster para interacción
    this.raycaster = new THREE.Raycaster();
    this.mouse = new THREE.Vector2();
    window.addEventListener('click', (e) => this.onClick(e));
  }
  
  onClick(event) {
    this.mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    this.mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
    
    this.raycaster.setFromCamera(this.mouse, this.camera);
    const intersects = this.raycaster.intersectObjects(this.scene.children, true);
    
    if (intersects.length > 0) {
      console.log('Clickeaste:', intersects[0].object.name);
    }
  }
  
  onResize() {
    this.camera.aspect = window.innerWidth / window.innerHeight;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.composer.setSize(window.innerWidth, window.innerHeight);
  }
  
  animate() {
    requestAnimationFrame(() => this.animate());
    
    const delta = this.clock?.getDelta() || 0;
    this.controls.update();
    
    if (this.mixer) {
      this.mixer.update(delta);
    }
    
    this.composer.render();
  }
  
  clock = new THREE.Clock();
}

new SceneManager();
```

## 11.2 Proyecto R3F Completo

```javascript
// App.jsx
import { Canvas } from '@react-three/fiber';
import { Suspense } from 'react';
import { Physics } from '@react-three/rapier';
import { Environment, Loader } from '@react-three/drei';

import Scene from './Scene';
import LoadingScreen from './LoadingScreen';

export default function App() {
  return (
    <>
      <Canvas shadows camera={{ position: [0, 5, 10], fov: 50 }}>
        <Suspense fallback={null}>
          <Physics>
            <Scene />
          </Physics>
          <Environment preset="sunset" />
        </Suspense>
      </Canvas>
      <Loader />
    </>
  );
}

// Scene.jsx
import { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { RigidBody, CuboidCollider } from '@react-three/rapier';
import { Float, Text } from '@react-three/drei';
import * as THREE from 'three';

function Player() {
  const ref = useRef();
  
  useFrame((state) => {
    // Mover jugador
  });
  
  return (
    <RigidBody ref={ref} position={[0, 2, 0]} colliders="ball">
      <mesh castShadow>
        <sphereGeometry args={[0.5]} />
        <meshStandardMaterial color="hotpink" metalness={0.5} />
      </mesh>
    </RigidBody>
  );
}

function Collectibles() {
  const items = Array.from({ length: 10 }, (_, i) => ({
    id: i,
    position: [(Math.random() - 0.5) * 10, 1, (Math.random() - 0.5) * 10]
  }));
  
  return items.map(item => (
    <Float key={item.id} speed={2} rotationIntensity={1}>
      <mesh position={item.position}>
        <octahedronGeometry args={[0.3]} />
        <meshStandardMaterial color="cyan" emissive="cyan" emissiveIntensity={0.5} />
      </mesh>
    </Float>
  ));
}

function Floor() {
  return (
    <RigidBody type="fixed" colliders={false}>
      <CuboidCollider args={[20, 0.5, 20]} />
      <mesh receiveShadow rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.5, 0]}>
        <planeGeometry args={[40, 40]} />
        <meshStandardMaterial color="#1a1a2e" metalness={0.8} roughness={0.2} />
      </mesh>
      <gridHelper args={[40, 40, 0xff0000, 0x222222]} position={[0, 0.01, 0]} />
    </RigidBody>
  );
}

function Lights() {
  return (
    <>
      <ambientLight intensity={0.5} />
      <directionalLight
        position={[10, 10, 5]}
        intensity={1}
        castShadow
        shadow-mapSize={[2048, 2048]}
      />
    </>
  );
}

export default function Scene() {
  return (
    <>
      <Lights />
      <Floor />
      <Player />
      <Collectibles />
      <Text position={[0, 3, -5]} fontSize={1} color="white">
        ¡Recoge los items!
      </Text>
    </>
  );
}
```

---

# MÓDULO 12: WEBGPU Y EL FUTURO

## 12.1 TSL - Three Shading Language

```javascript
// WEBGPU + TSL (Three Shading Language)
import * as THREE from 'three/webgpu';
import { 
  Fn, 
  uniform, 
  texture, 
  uv, 
  color, 
  normalMap,
  bloom 
} from 'three/tsl';

// Crear material con TSL
const mesh = new THREE.Mesh(
  new THREE.SphereGeometry(1, 64, 64),
  new THREE.MeshStandardNodeMaterial({
    colorNode: color(0x00ff00),
    metalnessNode: uniform(0.5),
    roughnessNode: uniform(0.2)
  })
);

// Nodos más complejos
const customMaterial = new THREE.MeshStandardNodeMaterial();

// Textura
const myTexture = new THREE.TextureLoader().load('texture.jpg');
const texNode = texture(myTexture, uv());

// Mezclar colores
customMaterial.colorNode = texNode.mul(color(0.5));

// Normal map
customMaterial.normalNode = normalMap(texNode);

// Output con bloom
customMaterial.outputNode = bloom(texNode, 0.5, 0.4, 0.85);
```

## 12.2 Compute Shaders

```javascript
// GPU Compute con TSL
import { 
  storage, 
  Fn, 
  instanceIndex, 
  float, 
  Loop,
  vec3
} from 'three/tsl';

// Buffer de posiciones
const positionBuffer = new THREE.StorageInstancedBufferAttribute(
  new Float32Array(count * 3), 
  3
);

// Compute shader para actualizar posiciones
const computePosition = Fn(({ positionBuffer }) => {
  const pos = storage(positionBuffer, 'vec3', count);
  
  Loop(count, ({ i }) => {
    const p = pos.element(i);
    p.addAssign(vec3(0, -0.01, 0)); // Gravedad
    
    // Reset si sale
    If(p.y.lessThan(-10), () => {
      p.y.assign(10);
    });
  });
})({ positionBuffer });

// Ejecutar compute
renderer.compute(computePosition);
```

## 12.3 Migration Guide WebGPU

```javascript
// WebGL (actual)
import * as THREE from 'three';

const renderer = new THREE.WebGLRenderer({ antialias: true });

// WebGPU (futuro)
import * as THREE from 'three/webgpu';

if (WebGPU.isAvailable()) {
  const renderer = new THREE.WebGPURenderer({ antialias: true });
  
  // Mismo API para la mayoría de las cosas
  const scene = new THREE.Scene();
  const mesh = new THREE.Mesh(geometry, material);
  
  // Diferencia principal: materiales usan TSL
  mesh.material = new THREE.MeshStandardNodeMaterial({
    colorNode: color(0xff0000)
  });
}
```

---

# 📋 RESUMEN DE BIBLIOTECAS

| Biblioteca | Propósito | Instalación (pnpm) |
|-----------|-----------|-----|
| three | Core 3D | pnpm add three |
| @react-three/fiber | React renderer | pnpm add @react-three/fiber |
| @react-three/drei | Helpers R3F | pnpm add @react-three/drei |
| @react-three/rapier | Física R3F | pnpm add @react-three/rapier |
| @react-three/postprocessing | Post-proc R3F | pnpm add @react-three/postprocessing |
| gsap | Animaciones | pnpm add gsap |
| @theatre/core | Animación visual | pnpm add @theatre/core |
| @theatre/studio | Editor Theatre.js | pnpm add @theatre/studio |
| @dimforge/rapier3d-compat | Física vanilla | pnpm add @dimforge/rapier3d-compat |

# 🚀 SETUP DEL PROYECTO

```bash
# Crear proyecto con Vite + pnpm
pnpm create vite mi-proyecto-3d --template vanilla
cd mi-proyecto-3d

# Instalar dependencias
pnpm add three gsap @theatre/core @theatre/studio

# Para desarrollo con React (recomendado)
pnpm create vite mi-proyecto-r3f --template react
cd mi-proyecto-r3f
pnpm add three @react-three/fiber @react-three/drei @react-three/rapier @react-three/postprocessing gsap @theatre/core

# Ejecutar
pnpm dev
```

---

# 🎯 PRÓXIMOS PASOS

1. **Practica el Módulo 1-2** - Crea escenas con geometrías, materiales PBR e iluminación
2. **Intenta cargar un modelo GLTF** - Busca uno gratis en Sketchfab
3. **Añade animaciones con GSAP** - Haz que la cámara rote alrededor
4. **Prueba Theatre.js** - Descarga el editor y experimenta
5. **Migra a React Three Fiber** - Verás que es más rápido desarrollar

---

*Curso actualizado: Marzo 2026*
*¡祝学习愉快! (¡Que disfrutes el aprendizaje!)*
