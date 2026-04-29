import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { DeliveryRoute, priorityMeta } from "@/data/routes";
import RouteStatusBadge from "./RouteStatusBadge";
import { Button } from "@/components/ui/button";
import {
  CheckCircle2,
  Circle,
  Clock,
  MapPin,
  Navigation,
  Pencil,
  Truck,
  User,
  XCircle,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface Props {
  route: DeliveryRoute | null;
  open: boolean;
  onOpenChange: (v: boolean) => void;
}

const formatCurrency = (n: number) =>
  new Intl.NumberFormat("es-PE", {
    style: "currency",
    currency: "PEN",
    maximumFractionDigits: 0,
  }).format(n);

const RouteDetailDrawer = ({ route, open, onOpenChange }: Props) => {
  if (!route) return null;
  const pct = Math.round((route.stopsDone / route.stopsTotal) * 100);
  const prio = priorityMeta[route.priority];

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent
        side="right"
        className="w-full overflow-y-auto p-0 sm:max-w-xl"
      >
        <div className="border-b border-border bg-surface-muted p-6">
          <SheetHeader className="space-y-2 text-left">
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-glow">
                  <MapPin className="h-6 w-6" />
                </div>
                <div>
                  <SheetTitle className="text-xl font-bold">
                    {route.code}
                  </SheetTitle>
                  <p className="text-sm text-muted-foreground">{route.name}</p>
                </div>
              </div>
              <RouteStatusBadge status={route.status} />
            </div>
          </SheetHeader>

          <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-4">
            <div className="rounded-lg bg-card p-3">
              <p className="text-[11px] uppercase tracking-wider text-muted-foreground">
                Paradas
              </p>
              <p className="mt-1 text-lg font-bold text-foreground">
                {route.stopsDone}/{route.stopsTotal}
              </p>
            </div>
            <div className="rounded-lg bg-card p-3">
              <p className="text-[11px] uppercase tracking-wider text-muted-foreground">
                Distancia
              </p>
              <p className="mt-1 text-lg font-bold text-foreground">
                {route.distanceKm} km
              </p>
            </div>
            <div className="rounded-lg bg-card p-3">
              <p className="text-[11px] uppercase tracking-wider text-muted-foreground">
                Recaudado
              </p>
              <p className="mt-1 text-lg font-bold text-foreground">
                {formatCurrency(route.collectedAmount)}
              </p>
            </div>
            <div className="rounded-lg bg-card p-3">
              <p className="text-[11px] uppercase tracking-wider text-muted-foreground">
                Esperado
              </p>
              <p className="mt-1 text-lg font-bold text-foreground">
                {formatCurrency(route.totalAmount)}
              </p>
            </div>
          </div>

          <div className="mt-4">
            <div className="mb-1.5 flex items-center justify-between text-xs">
              <span className="font-medium text-foreground">
                Avance de ruta
              </span>
              <span className="text-muted-foreground">{pct}%</span>
            </div>
            <div className="h-2 overflow-hidden rounded-full bg-muted">
              <div
                className={cn(
                  "h-full rounded-full transition-all",
                  pct >= 80 ? "bg-success" : pct >= 40 ? "bg-info" : "bg-warning"
                )}
                style={{ width: `${pct}%` }}
              />
            </div>
          </div>

          <div className="mt-5 flex flex-wrap gap-2">
            <Button size="sm" className="bg-primary hover:bg-primary-hover">
              <Navigation className="mr-2 h-4 w-4" /> Ver en mapa
            </Button>
            <Button size="sm" variant="outline">
              <Pencil className="mr-2 h-4 w-4" /> Editar
            </Button>
          </div>
        </div>

        <div className="space-y-6 p-6">
          <section>
            <h3 className="mb-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Información general
            </h3>
            <dl className="grid grid-cols-1 gap-3 text-sm sm:grid-cols-2">
              <div className="flex items-center gap-2">
                <User className="h-4 w-4 text-muted-foreground" />
                <div>
                  <dt className="text-xs text-muted-foreground">Conductor</dt>
                  <dd className="font-medium text-foreground">{route.driver}</dd>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Truck className="h-4 w-4 text-muted-foreground" />
                <div>
                  <dt className="text-xs text-muted-foreground">Vehículo</dt>
                  <dd className="font-medium text-foreground">
                    {route.vehiclePlate} · {route.vehicleType}
                  </dd>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-muted-foreground" />
                <div>
                  <dt className="text-xs text-muted-foreground">Horario</dt>
                  <dd className="font-medium text-foreground">
                    {route.startTime} – {route.endTime}
                  </dd>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-muted-foreground" />
                <div>
                  <dt className="text-xs text-muted-foreground">Zona</dt>
                  <dd className="font-medium text-foreground">{route.zone}</dd>
                </div>
              </div>
            </dl>
            <div className="mt-3 flex items-center gap-2">
              <span className="text-xs text-muted-foreground">Prioridad:</span>
              <span
                className={cn(
                  "rounded-md px-2 py-0.5 text-xs font-semibold",
                  prio.className
                )}
              >
                {prio.label}
              </span>
              <span className="text-xs text-muted-foreground">
                · Creada {route.createdAt}
              </span>
            </div>
          </section>

          <section>
            <div className="mb-3 flex items-center justify-between">
              <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Paradas ({route.stops.length})
              </h3>
            </div>
            <ol className="relative space-y-3 border-l-2 border-dashed border-border pl-5">
              {route.stops.map((s) => {
                const Icon =
                  s.status === "delivered"
                    ? CheckCircle2
                    : s.status === "failed"
                    ? XCircle
                    : Circle;
                const color =
                  s.status === "delivered"
                    ? "text-success bg-success-soft"
                    : s.status === "failed"
                    ? "text-destructive bg-destructive/10"
                    : "text-muted-foreground bg-muted";
                return (
                  <li key={s.id} className="relative">
                    <span
                      className={cn(
                        "absolute -left-[30px] top-1 flex h-5 w-5 items-center justify-center rounded-full",
                        color
                      )}
                    >
                      <Icon className="h-3.5 w-3.5" />
                    </span>
                    <div className="rounded-lg border border-border bg-card p-3 transition-colors hover:bg-surface-muted">
                      <div className="flex items-start justify-between gap-2">
                        <div className="min-w-0">
                          <p className="truncate text-sm font-semibold text-foreground">
                            #{s.order} · {s.customer}
                          </p>
                          <p className="truncate text-xs text-muted-foreground">
                            {s.address}, {s.district}
                          </p>
                        </div>
                        <span className="shrink-0 rounded-md bg-muted px-2 py-0.5 text-[11px] font-medium text-foreground">
                          {s.eta}
                        </span>
                      </div>
                    </div>
                  </li>
                );
              })}
            </ol>
          </section>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default RouteDetailDrawer;