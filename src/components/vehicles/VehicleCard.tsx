import { Truck, Bike, Package, Car, ChevronRight } from "lucide-react";
import { Vehicle, VehicleType } from "@/data/vehicles";
import StatusBadge from "./StatusBadge";
import { cn } from "@/lib/utils";

const typeIcon: Record<VehicleType, typeof Truck> = {
  Furgón: Truck,
  Camión: Package,
  Moto: Bike,
  Camioneta: Car,
};

const VehicleCard = ({ v, onClick }: { v: Vehicle; onClick: () => void }) => {
  const Icon = typeIcon[v.type];
  return (
    <button
      onClick={onClick}
      className="group w-full rounded-xl border border-border bg-card p-4 text-left shadow-sm transition-all hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-md"
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-primary-soft text-primary">
            <Icon className="h-5 w-5" />
          </div>
          <div>
            <p className="font-semibold text-foreground">{v.plate}</p>
            <p className="text-xs text-muted-foreground">{v.type} · {v.group}</p>
          </div>
        </div>
        <ChevronRight className="h-4 w-4 text-muted-foreground transition-transform group-hover:translate-x-0.5" />
      </div>

      <div className="mt-3 flex items-center justify-between">
        <StatusBadge status={v.status} />
        <span className="text-xs text-muted-foreground">
          {v.driver ?? "Sin asignar"}
        </span>
      </div>

      <div className="mt-3">
        <div className="mb-1 flex items-center justify-between text-[11px] text-muted-foreground">
          <span>Carga actual</span>
          <span className="font-medium">{v.loadPct}%</span>
        </div>
        <div className="h-1.5 w-full overflow-hidden rounded-full bg-muted">
          <div
            className={cn(
              "h-full rounded-full transition-all",
              v.loadPct >= 80 ? "bg-primary" : v.loadPct >= 50 ? "bg-warning" : "bg-success"
            )}
            style={{ width: `${v.loadPct}%` }}
          />
        </div>
      </div>
    </button>
  );
};

export default VehicleCard;