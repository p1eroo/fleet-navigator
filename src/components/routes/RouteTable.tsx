import {
  MoreHorizontal,
  Eye,
  Pencil,
  Trash2,
  MapPin,
  Clock,
  Truck,
} from "lucide-react";
import { DeliveryRoute } from "@/data/routes";
import RouteStatusBadge from "./RouteStatusBadge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";

interface Props {
  routes: DeliveryRoute[];
  onSelect: (r: DeliveryRoute) => void;
}

const formatCurrency = (n: number) =>
  new Intl.NumberFormat("es-PE", {
    style: "currency",
    currency: "PEN",
    maximumFractionDigits: 0,
  }).format(n);

const RouteTable = ({ routes, onSelect }: Props) => {
  return (
    <div className="overflow-hidden rounded-xl border border-border bg-card shadow-sm">
      <div className="overflow-x-auto scrollbar-thin">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border bg-surface-muted text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              <th className="px-5 py-3.5">Ruta</th>
              <th className="px-5 py-3.5">Conductor</th>
              <th className="px-5 py-3.5">Vehículo</th>
              <th className="px-5 py-3.5">Despachos</th>
              <th className="px-5 py-3.5">Horario</th>
              <th className="px-5 py-3.5">Estado</th>
              <th className="px-5 py-3.5">Recaudación</th>
              <th className="px-5 py-3.5 text-right">Acciones</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {routes.map((r) => {
              const pct = Math.round((r.stopsDone / r.stopsTotal) * 100);
              const collectedPct =
                r.totalAmount > 0
                  ? Math.round((r.collectedAmount / r.totalAmount) * 100)
                  : 0;
              return (
                <tr
                  key={r.id}
                  onClick={() => onSelect(r)}
                  className="group cursor-pointer transition-colors hover:bg-surface-muted"
                >
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary-soft text-primary transition-transform group-hover:scale-110">
                        <MapPin className="h-5 w-5" />
                      </div>
                      <div>
                        <p className="font-semibold text-foreground">{r.code}</p>
                        <p className="text-xs text-muted-foreground">{r.name}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-2">
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-muted text-xs font-semibold text-foreground">
                        {r.driver
                          .split(" ")
                          .map((p) => p[0])
                          .slice(0, 2)
                          .join("")}
                      </div>
                      <div>
                        <p className="text-sm font-medium text-foreground">{r.driver}</p>
                        <p className="text-xs text-muted-foreground">{r.zone}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-2 text-sm">
                      <Truck className="h-4 w-4 text-muted-foreground" />
                      <div>
                        <p className="font-medium text-foreground">{r.vehiclePlate}</p>
                        <p className="text-xs text-muted-foreground">{r.vehicleType}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-5 py-4">
                    <div className="flex w-36 flex-col gap-1">
                      <div className="flex items-center justify-between text-xs">
                        <span className="font-medium text-foreground">
                          {r.stopsDone}/{r.stopsTotal}
                        </span>
                        <span className="text-muted-foreground">{pct}%</span>
                      </div>
                      <div className="h-1.5 overflow-hidden rounded-full bg-muted">
                        <div
                          className={cn(
                            "h-full rounded-full transition-all",
                            pct >= 80
                              ? "bg-success"
                              : pct >= 40
                              ? "bg-info"
                              : "bg-warning"
                          )}
                          style={{ width: `${pct}%` }}
                        />
                      </div>
                    </div>
                  </td>
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-1.5 text-sm text-foreground">
                      <Clock className="h-3.5 w-3.5 text-muted-foreground" />
                      {r.startTime} – {r.endTime}
                    </div>
                    <p className="mt-0.5 text-xs text-muted-foreground">{r.date}</p>
                  </td>
                  <td className="px-5 py-4">
                    <RouteStatusBadge status={r.status} />
                  </td>
                  <td className="px-5 py-4">
                    <p className="text-sm font-semibold text-foreground">
                      {formatCurrency(r.collectedAmount)}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      de {formatCurrency(r.totalAmount)} · {collectedPct}%
                    </p>
                  </td>
                  <td
                    className="px-5 py-4 text-right"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <DropdownMenu>
                      <DropdownMenuTrigger className="rounded-md p-1.5 text-muted-foreground hover:bg-muted hover:text-foreground">
                        <MoreHorizontal className="h-4 w-4" />
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="w-44">
                        <DropdownMenuItem onClick={() => onSelect(r)}>
                          <Eye className="mr-2 h-4 w-4" /> Ver detalle
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Pencil className="mr-2 h-4 w-4" /> Editar ruta
                        </DropdownMenuItem>
                        <DropdownMenuItem className="text-destructive focus:text-destructive">
                          <Trash2 className="mr-2 h-4 w-4" /> Cancelar
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RouteTable;