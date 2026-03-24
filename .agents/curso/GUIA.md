# Curso Completo de Three.js - Guía del Instructor

## 📋 Información General

**Usuario:** Ignacio Chiappero  
**Nivel Actual:** Básico - sabe crear cubos y aplicar texturas  
**Meta:** Dominar Three.js con prácticas modernas (2024-2026)

---

## 🎯 Prerrequisitos Confirmados

- ✅ Crear escena, cámara y renderer
- ✅ Crear geometrías básicas (BoxGeometry)
- ✅ Aplicar texturas a meshes
- ✅ Render loop básico

---

## 🏗️ Estructura del Curso (12 Módulos)

### **MÓDULO 1: Fundamentos Avanzados** 
*Lo que ya sabes, pero bien hecho*

1. **Revisión de conceptos básicos**
   - Escena, cámara (PerspectiveCamera), renderer (WebGLRenderer)
   - Render loop con requestAnimationFrame
   - Window resize handling

2. **Geometrías Primitivas**
   - BoxGeometry, SphereGeometry, PlaneGeometry, CylinderGeometry
   - Geometry parameters (width, height, segments)
   - BufferGeometry conceptos básicos

3. **Materiales Modernos (PBR)**
   - MeshStandardMaterial (propiedades físicas)
   - MeshPhysicalMaterial (más realism)
   - Propiedades: metalness, roughness, envMapIntensity
   - Normal maps, displacement maps, AO maps

4. **Iluminación Realista**
   - AmbientLight, DirectionalLight, PointLight
   - Shadow mapping (castShadow, receiveShadow)
   - PCFSoftShadowMap, VSMShadowMap
   - Iluminación HDR y Environment maps

---

### **MÓDULO 2: Cameras y Controles**

1. **Tipos de Cámara**
   - PerspectiveCamera (ángulos, aspect ratio)
   - OrthographicCamera (para 2D/isométrico)
   - ArrayCamera (multiview)

2. **Controles de Cámara**
   - OrbitControls (rotación, zoom, pan)
   - FirstPersonControls
   - PointerLockControls (juegos FPS)
   - MapControls (para mapas)

3. **Cámara Cinemática**
   - Cinematography concepts
   - Camera transitions con GSAP

---

### **MÓDULO 3: Carga de Modelos 3D (GLTF/GLB)**

1. **GLTFLoader básico**
   - Cargar modelos .gltf/.glb
   - Manejar meshes, materials, animations
   - Draco compression

2. **DracoLoader**
   - Compresión de modelos
   - Configuración de decodificador

3. **Manejo de Assets**
   - LoadingManager para múltiples recursos
   - Progress tracking
   - Error handling

4. **Optimización**
   - Mesh optimization
   - Texture compression

---

### **MÓDULO 4: Materiales y Texturas Avanzadas**

1. **Texture Loading**
   - TextureLoader con múltiples formatos
   - JPG, PNG, WebP, HDR (RGBELoader)
   - Environment maps (HDRI)

2. **Material Properties**
   - PBR workflow
   - Transmission (vidrio)
   - Thickness (subsurface)
   - Clearcoat, iridescence

3. **Shader Materials**
   - Custom shaders con ShaderMaterial
   - Vertex y Fragment shaders
   - Uniforms, attributes, varyings

4. **TSL - Three Shading Language (NUEVO 2024+)**
   - WebGPU shaders
   - Nodos de shader
   - Funciones modernas

---

### **MÓDULO 5: Animaciones**

1. **AnimationMixer**
   - Animaciones de modelos GLTF
   - Play, pause, crossfade
   - Animation actions

2. **GSAP (GreenSock)**
   - Animaciones programmatic
   - Timeline sequencing
   - Easing functions
   - Cámara animations

3. **THEATRE.JS** *(biblioteca mencionada por el usuario)*
   - Motion design visual
   - Secuenciación de animaciones
   - Editor visual para Three.js
   - Sheet-based animation

4. **Procedural Animation**
   - Math-based animations
   - Sine, cosine, noise
   - Physics-based motion

---

### **MÓDULO 6: Física (Rapier)**

1. **Introducción a Rapier**
   - ¿Por qué Rapier? (WASM, performant)
   - React Three Rapier vs vanilla Rapier

2. **Cuerpos Rígidos**
   - RigidBody (dynamic, fixed, kinematic)
   - Colliders (cuboid, sphere, capsule, convex hull)
   - Collision groups

3. **Física en Three.js**
   - Simulación de gravedad
   - Detección de colisiones
   - Forces y impulses

4. **Aplicaciones Prácticas**
   - Caída de objetos
   - Rampa y fricción
   - Joints (ball, hinge, fixed)

---

### **MÓDULO 7: Post-Procesamiento**

1. **EffectComposer**
   - RenderPass
   - ShaderPass
   - Multi-pass rendering

2. **Efectos Visuales**
   - Bloom (brillo)
   - Depth of Field
   - Motion Blur
   - Chromatic Aberration
   - Film grain

3. **SMAA/TAA**
   - Anti-aliasing post-process

4. **Custom Effects**
   - Crear efectos personalizados
   - ShaderPass con custom shaders

---

### **MÓDULO 8: Interactividad y Raycasting**

1. **Raycaster**
   - Detección de clicks en objetos
   - Mouse/touch events
   - Hover states

2. **Controles Interactivos**
   - TransformControls (mover/rotar objetos)
   - DragControls
   - Selection system

3. **UI en 3D**
   - CSS3DRenderer (HTML en 3D)
   - SVGRenderer
   - Interfaz híbrida

---

### **MÓDULO 9: Rendimiento y Optimización**

1. **Performance profiling**
   - Stats.js
   - Chrome DevTools
   - GPU memory

2. **Optimización de Geometría**
   - BufferGeometry optimization
   - InstancedMesh (múltiples objetos)
   - LOD (Level of Detail)

3. **Optimización de Render**
   - Frustum culling
   - Occlusion culling
   - Batching

4. **Modern Rendering**
   - WebGPU renderer (experimental)
   - TSL (Three Shading Language)

---

### **MÓDULO 10: React Three Fiber (R3F)**

1. **Fundamentos R3F**
   - Canvas, Scene, Camera
   - Componentes declarativos
   - State management

2. **Ecosistema Drei**
   - @react-three/drei helpers
   - Environment, Stage
   - useGLTF, useTexture
   - OrbitControls, PerspectiveCamera

3. **R3F + Física**
   - @react-three/rapier
   - Componentes Physics, RigidBody

4. **R3F + Post-processing**
   - @react-three/postprocessing

---

### **MÓDULO 11: Proyectos Prácticos**

1. **Proyecto 1: Escenario 3D Interactivo**
   - Cargar modelo GLTF
   -添加 iluminación HDR
   - Controles orbit
   - Interactividad básica

2. **Proyecto 2: Juego de Física**
   - Escenario con Rapier
   - Objetos que caen
   - Colisiones
   - Score system

3. **Proyecto 3: Animación Cinematográfica**
   - Cámara animadas con GSAP/Theatre.js
   - Transiciones
   - Post-processing

4. **Proyecto 4: Portfolio 3D**
   - Modelos interactivos
   - UI con CSS3D
   - Carga optimizada

---

### **MÓDULO 12: WebGPU y El Futuro**

1. **WebGPU Renderer**
   - Diferencias con WebGL
   - Migration guide
   - Performance benefits

2. **TSL (Three Shading Language)**
   - Nodos de shader
   - Compute shaders
   - Instancing avanzado

3. **Trends 2026**
   - Ray tracing
   - ML integration
   - XR (WebXR)

---

## 🛠️ Bibliotecas a Utilizar (Versiones Modernas)

| Biblioteca | Propósito | Versión Sugerida |
|------------|-----------|------------------|
| three | Core 3D | latest (r160+) |
| @react-three/fiber | React renderer | ^8.x |
| @react-three/drei | Helpers R3F | ^9.x |
| @react-three/rapier | Física | ^1.x |
| @react-three/postprocessing | Post-proc | ^2.x |
| gsap | Animaciones | ^3.x |
| @theatre/core | Animación visual | ^0.x |
| @theatre/studio | Editor visual | ^0.x |
| vite | Build tool | ^5.x |

---

## 📝 Ejercicios por Módulo

### Módulo 1: Ejercicios
1. Crear escena con múltiples primitivas
2. Aplicar MeshPhysicalMaterial con reflections
3. Configurar shadows con múltiples lights

### Módulo 2: Ejercicios
1. Implementar transición entre cámaras
2. Configurar OrbitControls con límites
3. Crear cámara que sigue un objeto

### Módulo 3: Ejercicios
1. Cargar modelo GLTF con Draco
2. Extraer y reproducir animaciones
3. Loading screen con progreso

### Módulo 4: Ejercicios
1. Cargar HDRI environment
2. Crear material de vidrio con transmission
3. Escribir shader básico personalizado

### Módulo 5: Ejercicios
1. Crear animation timeline con GSAP
2. Configurar Theatre.js con Three.js
3. Animación procedural de partículas

### Módulo 6: Ejercicios
1. Crear escena con física básica
2. Simular objetos que caen y colisionan
3. Crear rampa con fricción

### Módulo 7: Ejercicios
1. Añadir bloom a escena
2. Crear efecto DOF
3. Custom shader pass

### Módulo 8: Ejercicios
1. Sistema de selección de objetos
2. TransformControls para editar
3. UI 3D con CSS3DRenderer

### Módulo 9: Ejercicios
1. Optimizar con InstancedMesh
2. Implementar LOD
3. Configurar WebGPU renderer

### Módulo 10: Ejercicios
1. Recrear proyecto vanilla en R3F
2. Añadir física con Rapier
3. Post-processing en R3F

---

## 📋 Formato de Clase

Cada clase debe seguir este formato:

1. **Introducción** (5 min)
   - Qué vamos a aprender
   - Por qué es importante

2. **Teoría** (15 min)
   - Conceptos clave
   - Ejemplos de código
   - Mejores prácticas

3. **Práctica** (30 min)
   - Código en vivo
   - Ejercicios paso a paso
   - Errores comunes a evitar

4. **Desafío** (10 min)
   - Ejercicio para casa
   - Recursos adicionales

---

## 🎓 Criterios de Progreso

| Nivel | Habilidad |
|-------|-----------|
| 🟢 Básico | Cubo con textura |
| 🟡 Intermedio | Escena completa con lights, shadows, cámara |
| 🟠 Avanzado | Modelos GLTF, animaciones, post-processing |
| 🔴 Profesional | Proyecto completo con R3F, física, optimización |

---

## 📚 Recursos

- Documentación oficial: https://threejs.org/docs/
- Ejemplos: https://threejs.org/examples/
- Theatre.js: https://www.theatrejs.com/
- R3F: https://docs.pmnd.rs/
- WebGPU Examples: https://github.com/mrdoob/three.js/tree/dev/examples/webgpu

---

*Última actualización: Marzo 2026*
