import { NavLink } from "react-router";
import { ROUTES } from "@/routes";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu, PanelLeftClose, PanelLeftOpen } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

function ModuleNav({ isCollapsed = false }: { isCollapsed?: boolean }) {
  const routes = ROUTES;

  return (
    <div className={cn("mb-4 mt-10", isCollapsed ? "mx-2" : "mx-5")}>
      <div className="space-y-1">
        {routes.length === 0 ? (
          <p
            className={cn(
              "text-xs text-muted-foreground py-1",
              isCollapsed ? "px-1 text-center" : "px-2",
            )}
          >
            Sin prácticas
          </p>
        ) : (
          routes.map((route) => (
            <NavLink
              key={route.id}
              to={route.path}
              title={isCollapsed ? route.title : undefined}
              className={({ isActive }) =>
                cn(
                  "block text-sm rounded-md transition-colors",
                  isCollapsed
                    ? "px-2 py-2 text-center font-medium"
                    : "px-3 py-1.5",
                  isActive
                    ? "bg-accent text-accent-foreground"
                    : "text-muted-foreground hover:text-foreground hover:bg-accent",
                )
              }
            >
              {isCollapsed ? route.title.charAt(0) : route.title}
            </NavLink>
          ))
        )}
      </div>
    </div>
  );
}

export default function Sidebar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [desktopCollapsed, setDesktopCollapsed] = useState(false);

  const sidebarContent = (isCollapsed = false) => (
    <div className="flex flex-col h-full">
      <div className="flex-1 overflow-y-auto py-4">
        <ModuleNav isCollapsed={isCollapsed} />
      </div>
    </div>
  );

  return (
    <>
      {/* Mobile */}
      <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
        <SheetTrigger className="lg:hidden shrink-0 p-2">
          <Menu className="h-5 w-5" />
        </SheetTrigger>
        <SheetContent side="left" className="w-72 p-0">
          {sidebarContent(false)}
        </SheetContent>
      </Sheet>

      {/* Desktop */}
      <aside
        className={cn(
          "hidden lg:block border-r h-screen sticky top-0 overflow-y-auto transition-all duration-200",
          desktopCollapsed ? "w-20" : "w-72",
        )}
      >
        <button
          type="button"
          className="absolute right-3 top-3 z-10 inline-flex h-8 w-8 items-center justify-center rounded-md border bg-background text-muted-foreground hover:text-foreground"
          onClick={() => setDesktopCollapsed((prev) => !prev)}
          aria-label={
            desktopCollapsed ? "Expandir sidebar" : "Compactar sidebar"
          }
        >
          {desktopCollapsed ? (
            <PanelLeftOpen className="h-4 w-4" />
          ) : (
            <PanelLeftClose className="h-4 w-4" />
          )}
        </button>
        {sidebarContent(desktopCollapsed)}
      </aside>
    </>
  );
}
