import { Clock, MapPin, Route as RouteIcon, Truck, User } from "lucide-react";
import { DeliveryRoute, priorityMeta } from "@/data/routes";
import RouteStatusBadge from "./RouteStatusBadge";
import { cn } from "@/lib/utils";

interface Props {
  r: DeliveryRoute;
  onClick: () => void;
}

const formatCurrency = (n: number) =>
  new Intl.NumberFormat("es-PE", {
    style: "currency",
    currency: "PEN",
    maximumFractionDigits: 0,
  }).format(n);

const RouteCard = ({ r, onClick }: Props) => {
  const pct = Math.round((r.stopsDone / r.stopsTotal) * 100);
  const prio = priorityMeta[r.priority];
  return (
    <button
      onClick={onClick}
      className="group flex flex-col gap-4 rounded-xl border border-border bg-card p-5 text-left shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-md"
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-primary-soft text-primary">
            <RouteIcon className="h-5 w-5" />
          </div>
          <div>
            <p className="text-sm font-semibold text-foreground">{r.code}</p>
            <p className="text-xs text-muted-foreground">{r.name}</p>
          </div>
        </div>
        <RouteStatusBadge status={r.status} />
      </div>

      <div className="grid grid-cols-2 gap-3 text-sm">
        <div className="flex items-center gap-2 text-muted-foreground">
          <User className="h-4 w-4" />
          <span className="truncate text-foreground">{r.driver}</span>
        </div>
        <div className="flex items-center gap-2 text-muted-foreground">
          <Truck className="h-4 w-4" />
          <span className="text-foreground">{r.vehiclePlate}</span>
        </div>
        <div className="flex items-center gap-2 text-muted-foreground">
          <Clock className="h-4 w-4" />
          <span className="text-foreground">
            {r.startTime} – {r.endTime}
          </span>
        </div>
        <div className="flex items-center gap-2 text-muted-foreground">
          <MapPin className="h-4 w-4" />
          <span className="text-foreground">{r.zone}</span>
        </div>
      </div>

      <div>
        <div className="mb-1.5 flex items-center justify-between text-xs">
          <span className="font-medium text-foreground">
            {r.stopsDone}/{r.stopsTotal} entregas
          </span>
          <span className="text-muted-foreground">{pct}%</span>
        </div>
        <div className="h-1.5 overflow-hidden rounded-full bg-muted">
          <div
            className={cn(
              "h-full rounded-full transition-all",
              pct >= 80 ? "bg-success" : pct >= 40 ? "bg-info" : "bg-warning"
            )}
            style={{ width: `${pct}%` }}
          />
        </div>
      </div>

      <div className="flex items-end justify-between border-t border-border pt-3">
        <div>
          <p className="text-[11px] uppercase tracking-wider text-muted-foreground">
            Recaudación
          </p>
          <p className="text-base font-bold text-foreground">
            {formatCurrency(r.collectedAmount)}
            <span className="ml-1 text-xs font-normal text-muted-foreground">
              / {formatCurrency(r.totalAmount)}
            </span>
          </p>
        </div>
        <span
          className={cn(
            "rounded-md px-2 py-1 text-[11px] font-semibold",
            prio.className
          )}
        >
          Prioridad {prio.label}
        </span>
      </div>
    </button>
  );
};

export default RouteCard;