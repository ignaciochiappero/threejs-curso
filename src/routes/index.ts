export interface Route {
  id: string;
  path: string;
  title: string;
  description: string;
  module: number;
}

// Agregá tus rutas aquí y el Sidebar las lee automáticamente
export const ROUTES: Route[] = [
  // {
  //   id: "1-1",
  //   path: "/mi-ruta",
  //   title: "Mi Práctica",
  //   description: "Descripción",
  //   module: 1,
  // },
];

// Módulos - se generan automáticamente según las rutas agregadas
export const MODULES = [
  {
    number: 1,
    title: "Módulo 1",
    routes: ROUTES.filter((r) => r.module === 1),
  },
  {
    number: 2,
    title: "Módulo 2",
    routes: ROUTES.filter((r) => r.module === 2),
  },
];
