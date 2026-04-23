import type { ReactNode } from "react";

import App from "@/App";
import GeometriasPage from "../pages/1-geometria";
import MaterialesPage from "@/pages/2-materiales";
import ScenePage from "@/pages/3-scene";
import LightPage from "@/pages/4-light";
import ShadowsPage from "@/pages/5-shadows";
import AnimateAndTransformPage from "@/pages/6-animation";
import GSAPPage from "@/pages/7-gsap";
import GruposPage from "@/pages/8-grupos";
import CameraPage from "@/pages/9-camera";
import ModelsPage3D from "@/pages/10-3dmodels";
import TexturesPage from "@/pages/11-textures";
import InteractionPage from "@/pages/12-interaction";
import DragDropPage from "@/pages/13-drag-drop";
import PhysicsPage from "@/pages/14-physics";
import PostProcessingPage from "@/pages/15-post-processing";
import InstancedMeshPage from "@/pages/17-intanced-mesh";
import MiniGamePage from "@/pages/18-mini-game";

export interface Route {
  id: string;
  path: string;
  title: string;
  element?: ReactNode;
}

// Agregá tus rutas aquí y el Sidebar las lee automáticamente
export const ROUTES: Route[] = [
  {
    id: "1",
    path: "/",
    title: "Inicio",
    element: <App />,
  },

  {
    id: "2",
    path: "/geometria",
    title: "Geometria",
    element: <GeometriasPage />,
  },

  {
    id: "3",
    path: "/materiales",
    title: "Materiales",
    element: <MaterialesPage />,
  },

  {
    id: "4",
    path: "/escena",
    title: "Escena",
    element: <ScenePage />,
  },

  {
    id: "5",
    path: "/luces",
    title: "Luces",
    element: <LightPage />,
  },

  {
    id: "6",
    path: "/sombras",
    title: "Sombras",
    element: <ShadowsPage />,
  },

  {
    id: "7",
    path: "/animacion",
    title: "Animaciones ",
    element: <AnimateAndTransformPage />,
  },
  {
    id: "8",
    path: "/animacion-gsap",
    title: "Animaciones con GSAP ",
    element: <GSAPPage />,
  },
  {
    id: "9",
    path: "/grupos",
    title: "Grupos y Jerarquías ",
    element: <GruposPage />,
  },

  {
    id: "10",
    path: "/camara",
    title: "Cámara ",
    element: <CameraPage />,
  },

  {
    id: "11",
    path: "/modelos3D",
    title: " Modelos 3D ",
    element: <ModelsPage3D />,
  },

  {
    id: "12",
    path: "/texturas",
    title: " Texturas",
    element: <TexturesPage />,
  },

  {
    id: "13",
    path: "/interaccion",
    title: " Interacción con el usuario",
    element: <InteractionPage />,
  },

  {
    id: "14",
    path: "/draganddrop",
    title: "Drag & Drop 3D",
    element: <DragDropPage />,
  },

  {
    id: "15",
    path: "/fisicas",
    title: "Física",
    element: <PhysicsPage />,
  },

  {
    id: "16",
    path: "/post-processing",
    title: "Post Processing",
    element: <PostProcessingPage />,
  },

  {
    id: "17",
    path: "/instanced-mesh",
    title: "Instanced Mesh",
    element: <InstancedMeshPage />,
  },

  {
    id: "18",
    path: "/mini-game",
    title: "Mini Juego (Proyecto Final)",
    element: <MiniGamePage />,
  },
];
