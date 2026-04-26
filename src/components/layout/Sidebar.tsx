import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  Route,
  Package,
  Truck,
  Users,
  MapPin,
  Settings,
  LifeBuoy,
  X,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface SidebarProps {
  open: boolean;
  onClose: () => void;
}

const navItems = [
  { to: "/", label: "Dashboard", icon: LayoutDashboard },
  { to: "/rutas", label: "Rutas", icon: Route },
  { to: "/ordenes", label: "Órdenes", icon: Package },
  { to: "/flota", label: "Flota en vivo", icon: MapPin },
  { to: "/vehiculos", label: "Vehículos", icon: Truck },
  { to: "/usuarios", label: "Usuarios móviles", icon: Users },
];

const Sidebar = ({ open, onClose }: SidebarProps) => {
  return (
    <>
      {/* Overlay móvil */}
      <div
        onClick={onClose}
        className={cn(
          "fixed inset-0 z-40 bg-black/50 backdrop-blur-sm lg:hidden",
          open ? "block animate-fade-in" : "hidden"
        )}
      />

      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-50 flex w-64 flex-col bg-gradient-dark text-sidebar-foreground transition-transform duration-300 ease-smooth lg:static lg:translate-x-0",
          open ? "translate-x-0" : "-translate-x-full"
        )}
      >
        {/* Logo */}
        <div className="flex h-16 items-center justify-between border-b border-sidebar-border px-5">
          <div className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-primary shadow-glow">
              <Truck className="h-5 w-5 text-primary-foreground" />
            </div>
            <div className="leading-tight">
              <p className="text-sm font-bold text-white">FleetOps</p>
              <p className="text-[10px] uppercase tracking-wider text-sidebar-foreground/60">
                Last Mile
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="rounded-md p-1 text-sidebar-foreground hover:bg-sidebar-accent lg:hidden"
            aria-label="Cerrar menú"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Nav */}
        <nav className="flex-1 overflow-y-auto scrollbar-thin px-3 py-4">
          <p className="px-3 pb-2 text-[10px] font-semibold uppercase tracking-wider text-sidebar-foreground/50">
            Operaciones
          </p>
          <ul className="space-y-1">
            {navItems.map((item) => (
              <li key={item.to}>
                <NavLink
                  to={item.to}
                  end={item.to === "/"}
                  onClick={onClose}
                  className={({ isActive }) =>
                    cn(
                      "group flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all duration-200",
                      isActive
                        ? "bg-primary text-primary-foreground shadow-glow"
                        : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-white"
                    )
                  }
                >
                  <item.icon className="h-[18px] w-[18px] shrink-0" />
                  <span>{item.label}</span>
                </NavLink>
              </li>
            ))}
          </ul>

          <p className="mt-6 px-3 pb-2 text-[10px] font-semibold uppercase tracking-wider text-sidebar-foreground/50">
            Sistema
          </p>
          <ul className="space-y-1">
            <li>
              <a
                href="#"
                className="group flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-sidebar-foreground transition-all duration-200 hover:bg-sidebar-accent hover:text-white"
              >
                <Settings className="h-[18px] w-[18px]" />
                <span>Configuración</span>
              </a>
            </li>
            <li>
              <a
                href="#"
                className="group flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-sidebar-foreground transition-all duration-200 hover:bg-sidebar-accent hover:text-white"
              >
                <LifeBuoy className="h-[18px] w-[18px]" />
                <span>Soporte</span>
              </a>
            </li>
          </ul>
        </nav>

        {/* Card pro */}
        <div className="m-3 rounded-xl bg-sidebar-accent p-4">
          <p className="text-xs font-semibold text-white">Plan Empresa</p>
          <p className="mt-1 text-[11px] text-sidebar-foreground/70">
            12 vehículos · 8 conductores activos
          </p>
          <div className="mt-3 h-1.5 w-full overflow-hidden rounded-full bg-black/30">
            <div className="h-full w-3/4 rounded-full bg-gradient-primary" />
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;