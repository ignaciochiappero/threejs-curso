import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router";
import { useState } from "react";
import "./index.css";
import App from "./App.tsx";
import Sidebar from "./components/Sidebar.tsx";
import { ROUTES } from "./routes";

createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <Layout>
      <Routes>
        <Route path="/" element={<App />} />
        {/* Agregá tus rutas aquí */}
      </Routes>
    </Layout>
  </BrowserRouter>
);

function Layout({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-950">
      {/* Mobile Header */}
      <header className="lg:hidden flex items-center justify-between p-4 bg-gray-900 border-b border-gray-700">
        <button
          onClick={() => setSidebarOpen(true)}
          className="p-2 hover:bg-gray-800 rounded"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
        <span className="font-bold text-white">Three.js Course</span>
        <div className="w-10" />
      </header>

      <div className="flex">
        <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
        <main className="flex-1 min-h-screen lg:ml-0">{children}</main>
      </div>
    </div>
  );
}
