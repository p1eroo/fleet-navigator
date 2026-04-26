import { Bell, HelpCircle, Menu, MessageSquare, Search, Settings } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

interface TopbarProps {
  onMenuClick: () => void;
}

const Topbar = ({ onMenuClick }: TopbarProps) => {
  return (
    <header className="sticky top-0 z-30 flex h-16 items-center gap-3 border-b border-border bg-topbar/95 px-4 backdrop-blur-md sm:px-6">
      <button
        onClick={onMenuClick}
        className="rounded-md p-2 text-foreground hover:bg-muted lg:hidden"
        aria-label="Abrir menú"
      >
        <Menu className="h-5 w-5" />
      </button>

      {/* Search */}
      <div className="relative hidden flex-1 max-w-md sm:block">
        <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          placeholder="Buscar vehículos, órdenes, conductores..."
          className="h-10 border-border bg-surface-muted pl-9 text-sm"
        />
      </div>

      <div className="ml-auto flex items-center gap-1 sm:gap-2">
        <button className="relative rounded-lg p-2 text-tertiary transition-colors hover:bg-muted hover:text-foreground">
          <Bell className="h-5 w-5" />
          <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-primary ring-2 ring-topbar" />
        </button>
        <button className="rounded-lg p-2 text-tertiary transition-colors hover:bg-muted hover:text-foreground">
          <MessageSquare className="h-5 w-5" />
        </button>
        <button className="hidden rounded-lg p-2 text-tertiary transition-colors hover:bg-muted hover:text-foreground sm:inline-flex">
          <HelpCircle className="h-5 w-5" />
        </button>
        <button className="hidden rounded-lg p-2 text-tertiary transition-colors hover:bg-muted hover:text-foreground sm:inline-flex">
          <Settings className="h-5 w-5" />
        </button>

        <div className="mx-2 hidden h-8 w-px bg-border sm:block" />

        <DropdownMenu>
          <DropdownMenuTrigger className="flex items-center gap-2 rounded-lg p-1 pr-2 transition-colors hover:bg-muted">
            <Avatar className="h-8 w-8 ring-2 ring-primary/30">
              <AvatarFallback className="bg-secondary text-xs font-semibold text-secondary-foreground">
                AR
              </AvatarFallback>
            </Avatar>
            <div className="hidden text-left leading-tight md:block">
              <p className="text-xs font-semibold text-foreground">Ana Ríos</p>
              <p className="text-[10px] text-muted-foreground">Operaciones</p>
            </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuLabel>Mi cuenta</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Perfil</DropdownMenuItem>
            <DropdownMenuItem>Preferencias</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="text-destructive">Cerrar sesión</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
};

export default Topbar;