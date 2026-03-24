import { NavLink } from "react-router";
import { MODULES, ROUTES } from "../routes";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function Sidebar({ isOpen, onClose }: SidebarProps) {
  return (
    <>
      {/* Overlay cuando está abierto */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed top-0 left-0 z-50 h-full w-72 bg-gray-900 text-white
          transform transition-transform duration-300 ease-in-out
          lg:translate-x-0 lg:static lg:z-auto
          ${isOpen ? "translate-x-0" : "-translate-x-full"}
        `}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-700">
          <h1 className="text-xl font-bold bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
            Three.js Course
          </h1>
          <button
            onClick={onClose}
            className="lg:hidden p-2 hover:bg-gray-800 rounded"
          >
            ✕
          </button>
        </div>

        {/* Progress */}
        <div className="p-4 border-b border-gray-700">
          <div className="flex justify-between text-sm text-gray-400 mb-2">
            <span>Progreso</span>
            <span>0 / {ROUTES.length}</span>
          </div>
          <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
            <div className="h-full bg-gradient-to-r from-cyan-400 to-purple-500 w-0" />
          </div>
        </div>

        {/* Navigation */}
        <nav className="h-[calc(100vh-140px)] overflow-y-auto p-2">
          {MODULES.map((module) => (
            <div key={module.number} className="mb-2">
              {/* Module Header */}
              <button
                className="w-full flex items-center justify-between p-3 rounded-lg hover:bg-gray-800 transition-colors text-left"
              >
                <div className="flex items-center gap-3">
                  <span className="flex items-center justify-center w-7 h-7 rounded bg-gray-700 text-sm font-medium">
                    {module.number}
                  </span>
                  <span className="font-medium">{module.title}</span>
                </div>
              </button>

              {/* Routes del módulo */}
              <div className="ml-4 mt-1 space-y-1">
                {module.routes.map((route) => (
                  <NavLink
                    key={route.id}
                    to={route.path}
                    onClick={onClose}
                    className={({ isActive }) =>
                      `block p-2 pl-10 rounded text-sm transition-colors ${
                        isActive
                          ? "bg-cyan-500/20 text-cyan-400 border-l-2 border-cyan-400"
                          : "text-gray-400 hover:text-white hover:bg-gray-800"
                      }`
                    }
                  >
                    {route.title}
                  </NavLink>
                ))}
              </div>
            </div>
          ))}
        </nav>
      </aside>
    </>
  );
}
