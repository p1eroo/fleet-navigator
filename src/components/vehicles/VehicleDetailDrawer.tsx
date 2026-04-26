import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Vehicle } from "@/data/vehicles";
import StatusBadge from "./StatusBadge";
import { Button } from "@/components/ui/button";
import { Calendar, Gauge, MapPin, Pencil, Truck, User } from "lucide-react";

interface Props {
  vehicle: Vehicle | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const VehicleDetailDrawer = ({ vehicle, open, onOpenChange }: Props) => {
  if (!vehicle) return null;

  const stats = [
    { label: "Capacidad", value: `${vehicle.capacityKg.toLocaleString()} kg`, icon: Gauge },
    { label: "Grupo", value: vehicle.group, icon: MapPin },
    { label: "Último servicio", value: vehicle.lastService, icon: Calendar },
    { label: "Conductor", value: vehicle.driver ?? "Sin asignar", icon: User },
  ];

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="w-full overflow-y-auto bg-surface p-0 sm:max-w-md">
        <div className="bg-gradient-dark p-6 text-white">
          <SheetHeader>
            <SheetTitle className="text-white">
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary shadow-glow">
                  <Truck className="h-6 w-6 text-primary-foreground" />
                </div>
                <div className="text-left">
                  <p className="text-xl font-bold">{vehicle.plate}</p>
                  <p className="text-xs font-normal text-white/60">{vehicle.type}</p>
                </div>
              </div>
            </SheetTitle>
          </SheetHeader>
          <div className="mt-4">
            <StatusBadge status={vehicle.status} />
          </div>
        </div>

        <div className="space-y-6 p-6">
          {/* Stats grid */}
          <div className="grid grid-cols-2 gap-3">
            {stats.map((s) => (
              <div
                key={s.label}
                className="rounded-lg border border-border bg-surface-muted p-3"
              >
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <s.icon className="h-3.5 w-3.5" />
                  {s.label}
                </div>
                <p className="mt-1 text-sm font-semibold text-foreground">{s.value}</p>
              </div>
            ))}
          </div>

          {/* Carga */}
          <div>
            <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Carga actual
            </p>
            <div className="rounded-lg border border-border bg-surface-muted p-4">
              <div className="mb-2 flex items-end justify-between">
                <span className="text-3xl font-bold text-foreground">{vehicle.loadPct}%</span>
                <span className="text-xs text-muted-foreground">
                  {Math.round((vehicle.capacityKg * vehicle.loadPct) / 100).toLocaleString()} / {vehicle.capacityKg.toLocaleString()} kg
                </span>
              </div>
              <div className="h-2 w-full overflow-hidden rounded-full bg-muted">
                <div
                  className="h-full rounded-full bg-gradient-primary transition-all"
                  style={{ width: `${vehicle.loadPct}%` }}
                />
              </div>
            </div>
          </div>

          {/* Configuración */}
          <div>
            <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Configuración
            </p>
            <div className="space-y-2 rounded-lg border border-border bg-surface-muted p-4 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Auto gestión</span>
                <span className="font-medium text-foreground">
                  {vehicle.autoManaged ? "Activada" : "Desactivada"}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Creado</span>
                <span className="font-medium text-foreground">{vehicle.createdAt}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">ID interno</span>
                <span className="font-mono text-xs text-foreground">#{vehicle.id.padStart(5, "0")}</span>
              </div>
            </div>
          </div>

          {/* Acciones */}
          <div className="flex gap-2">
            <Button variant="outline" className="flex-1">
              <Pencil className="mr-2 h-4 w-4" /> Editar
            </Button>
            <Button className="flex-1 bg-primary hover:bg-primary-hover">
              Asignar a ruta
            </Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default VehicleDetailDrawer;