import { DeliveryRoute } from "@/data/routes";
import RouteStatusBadge from "./RouteStatusBadge";
import { cn } from "@/lib/utils";

interface Props {
  routes: DeliveryRoute[];
  onSelect: (r: DeliveryRoute) => void;
}

const HOUR_START = 6;
const HOUR_END = 22;
const TOTAL_HOURS = HOUR_END - HOUR_START;

const toMinutes = (hhmm: string) => {
  const [h, m] = hhmm.split(":").map(Number);
  return h * 60 + m;
};

const RouteTimeline = ({ routes, onSelect }: Props) => {
  const hours = Array.from({ length: TOTAL_HOURS + 1 }, (_, i) => HOUR_START + i);

  const calc = (start: string, end: string) => {
    const s = toMinutes(start) - HOUR_START * 60;
    const e = toMinutes(end) - HOUR_START * 60;
    const total = TOTAL_HOURS * 60;
    const left = Math.max(0, (s / total) * 100);
    const width = Math.max(2, Math.min(100 - left, ((e - s) / total) * 100));
    return { left, width };
  };

  return (
    <div className="overflow-hidden rounded-xl border border-border bg-card shadow-sm">
      <div className="overflow-x-auto scrollbar-thin">
        <div className="min-w-[820px]">
          {/* Header de horas */}
          <div className="flex border-b border-border bg-surface-muted">
            <div className="w-48 shrink-0 px-4 py-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Conductor / Ruta
            </div>
            <div className="relative flex-1">
              <div className="flex h-full">
                {hours.map((h) => (
                  <div
                    key={h}
                    className="flex-1 border-l border-border py-3 text-center text-[11px] font-medium text-muted-foreground"
                  >
                    {String(h).padStart(2, "0")}:00
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Filas */}
          <div className="divide-y divide-border">
            {routes.map((r) => {
              const { left, width } = calc(r.startTime, r.endTime);
              const pct = Math.round((r.stopsDone / r.stopsTotal) * 100);
              return (
                <div key={r.id} className="flex items-stretch hover:bg-surface-muted">
                  <div className="w-48 shrink-0 px-4 py-3">
                    <p className="truncate text-sm font-semibold text-foreground">
                      {r.driver}
                    </p>
                    <p className="truncate text-xs text-muted-foreground">
                      {r.code} · {r.zone}
                    </p>
                  </div>
                  <div className="relative flex-1 py-3">
                    {/* Grid lines */}
                    <div className="pointer-events-none absolute inset-0 flex">
                      {hours.map((h) => (
                        <div
                          key={h}
                          className="flex-1 border-l border-border/60"
                        />
                      ))}
                    </div>
                    <button
                      onClick={() => onSelect(r)}
                      style={{ left: `${left}%`, width: `${width}%` }}
                      className={cn(
                        "group absolute top-1/2 -translate-y-1/2 overflow-hidden rounded-md border px-2 py-2 text-left text-xs shadow-sm transition-all hover:shadow-md hover:ring-2 hover:ring-primary/40",
                        r.status === "in_progress" &&
                          "border-primary/40 bg-primary-soft text-primary",
                        r.status === "scheduled" &&
                          "border-info/40 bg-info-soft text-info",
                        r.status === "completed" &&
                          "border-success/40 bg-success-soft text-success",
                        r.status === "delayed" &&
                          "border-warning/40 bg-warning-soft text-warning",
                        r.status === "cancelled" &&
                          "border-border bg-muted text-muted-foreground line-through"
                      )}
                    >
                      <div className="flex items-center justify-between gap-2">
                        <span className="truncate font-semibold">
                          {r.startTime} – {r.endTime}
                        </span>
                        <RouteStatusBadge status={r.status} />
                      </div>
                      <p className="truncate text-[11px] opacity-80">
                        {r.stopsDone}/{r.stopsTotal} entregas · {pct}%
                      </p>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RouteTimeline;