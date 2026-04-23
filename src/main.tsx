import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router";
import "./index.css";
import Sidebar from "./components/Sidebar";
import { ROUTES, type Route as RouteType } from "./routes/index.tsx";

createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <div className="flex">
      <Sidebar />
      <main className="flex-1 min-h-screen">
        <Routes>
          {ROUTES.map((route: RouteType) => (
            <Route key={route.id} path={route.path} element={route.element} />
          ))}
        </Routes>
      </main>
    </div>
  </BrowserRouter>,
);
