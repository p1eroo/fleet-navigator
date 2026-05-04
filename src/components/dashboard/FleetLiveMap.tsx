import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { MapPin, Navigation, Radio, ArrowUpRight, Maximize2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { vehicles, statusMeta, type VehicleStatus } from "@/data/vehicles";
import { cn } from "@/lib/utils";

/* Posiciones aproximadas (x%, y%) sobre el mapa estilizado de Lima.
   Asignadas por grupo geográfico para que tengan sentido visual. */
const groupCoords: Record<string, { x: number; y: number }> = {
  "Lima Norte": { x: 38, y: 24 },
  "Lima Centro": { x: 46, y: 48 },
  "Lima Sur": { x: 58, y: 76 },
  Callao: { x: 22, y: 52 },
};

const statusColor: Record<VehicleStatus, string> = {
  active: "hsl(var(--success))",
  in_route: "hsl(var(--info))",
  maintenance: "hsl(var(--warning))",
  inactive: "hsl(var(--tertiary))",
};

const jitter = (seed: number) => {
  const v = Math.sin(seed * 9301 + 49297) * 233280;
  return (v - Math.floor(v)) * 8 - 4; // -4..+4
};

const FleetLiveMap = () => {
  const [activeFilter, setActiveFilter] = useState<VehicleStatus | "all">("all");
  const [hovered, setHovered] = useState<string | null>(null);

  const points = useMemo(
    () =>
      vehicles.map((v, i) => {
        const base = groupCoords[v.group] ?? { x: 50, y: 50 };
        return {
          ...v,
          x: base.x + jitter(i + 1),
          y: base.y + jitter(i + 11),
        };
      }),
    []
  );

  const filtered =
    activeFilter === "all"
      ? points
      : points.filter((p) => p.status === activeFilter);

  const counts = useMemo(() => {
    return vehicles.reduce<Record<VehicleStatus, number>>(
      (acc, v) => ({ ...acc, [v.status]: (acc[v.status] || 0) + 1 }),
      { active: 0, in_route: 0, maintenance: 0, inactive: 0 }
    );
  }, []);

  const inRoute = counts.in_route;
  const total = vehicles.length;

  return (
    <div className="overflow-hidden rounded-xl border border-border bg-gradient-dark text-white shadow-md">
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_280px]">
        {/* MAP */}
        <div className="relative aspect-[16/9] min-h-[280px] overflow-hidden border-b border-white/10 lg:border-b-0 lg:border-r">
          {/* Background grid + gradient */}
          <div
            className="absolute inset-0 opacity-[0.18]"
            style={{
              backgroundImage:
                "linear-gradient(hsl(0 0% 100% / 0.5) 1px, transparent 1px), linear-gradient(90deg, hsl(0 0% 100% / 0.5) 1px, transparent 1px)",
              backgroundSize: "32px 32px",
            }}
          />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,hsl(0_0%_8%/0.7)_100%)]" />

          {/* Stylized "coast" + zone shapes (SVG) */}
          <svg
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
            className="absolute inset-0 h-full w-full"
          >
            <defs>
              <linearGradient id="land" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="hsl(0 0% 22%)" stopOpacity="0.6" />
                <stop offset="100%" stopColor="hsl(0 0% 14%)" stopOpacity="0.2" />
              </linearGradient>
            </defs>
            {/* Coast line */}
            <path
              d="M 0 35 C 8 38, 14 45, 18 55 S 22 78, 30 92 L 0 100 Z"
              fill="hsl(212 90% 50% / 0.10)"
              stroke="hsl(212 90% 60% / 0.35)"
              strokeWidth="0.3"
            />
            {/* Land mass */}
            <path
              d="M 18 12 L 95 8 L 98 60 L 88 92 L 32 95 C 24 80, 22 68, 22 55 C 22 42, 18 28, 18 12 Z"
              fill="url(#land)"
              stroke="hsl(0 0% 100% / 0.12)"
              strokeWidth="0.2"
            />
            {/* Zone separators (dashed) */}
            <path
              d="M 32 8 L 38 95"
              stroke="hsl(0 0% 100% / 0.08)"
              strokeWidth="0.25"
              strokeDasharray="1 1.5"
            />
            <path
              d="M 18 50 L 98 56"
              stroke="hsl(0 0% 100% / 0.08)"
              strokeWidth="0.25"
              strokeDasharray="1 1.5"
            />
            {/* Zone labels */}
            <text x="38" y="16" fill="hsl(0 0% 100% / 0.35)" fontSize="2.4" fontWeight="600">
              LIMA NORTE
            </text>
            <text x="46" y="44" fill="hsl(0 0% 100% / 0.35)" fontSize="2.4" fontWeight="600">
              LIMA CENTRO
            </text>
            <text x="56" y="72" fill="hsl(0 0% 100% / 0.35)" fontSize="2.4" fontWeight="600">
              LIMA SUR
            </text>
            <text x="14" y="50" fill="hsl(0 0% 100% / 0.35)" fontSize="2.4" fontWeight="600">
              CALLAO
            </text>
          </svg>

          {/* Live badge */}
          <div className="absolute left-4 top-4 z-10 flex items-center gap-2 rounded-full border border-white/10 bg-black/40 px-3 py-1.5 backdrop-blur-sm">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-success opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-success" />
            </span>
            <span className="text-[11px] font-semibold uppercase tracking-wider text-white/90">
              En vivo
            </span>
          </div>

          {/* Title */}
          <div className="absolute right-4 top-4 z-10 hidden items-center gap-2 sm:flex">
            <Button
              size="sm"
              variant="ghost"
              className="h-8 gap-1.5 border border-white/10 bg-black/40 text-xs text-white/80 backdrop-blur-sm hover:bg-black/60 hover:text-white"
              asChild
            >
              <Link to="/flota">
                <Maximize2 className="h-3.5 w-3.5" />
                Pantalla completa
              </Link>
            </Button>
          </div>

          {/* Vehicle pins */}
          {filtered.map((p) => {
            const isHovered = hovered === p.id;
            const color = statusColor[p.status];
            return (
              <button
                key={p.id}
                onMouseEnter={() => setHovered(p.id)}
                onMouseLeave={() => setHovered(null)}
                className="group absolute -translate-x-1/2 -translate-y-1/2 cursor-pointer focus:outline-none"
                style={{ left: `${p.x}%`, top: `${p.y}%` }}
              >
                {/* Pulse ring for in_route */}
                {p.status === "in_route" && (
                  <span
                    className="absolute left-1/2 top-1/2 h-8 w-8 -translate-x-1/2 -translate-y-1/2 animate-ping rounded-full opacity-40"
                    style={{ background: color }}
                  />
                )}
                {/* Pin */}
                <span
                  className={cn(
                    "relative flex h-3.5 w-3.5 items-center justify-center rounded-full border-2 border-white/90 shadow-lg transition-transform duration-200",
                    isHovered && "scale-150"
                  )}
                  style={{ background: color, boxShadow: `0 0 0 4px ${color}30` }}
                />
                {/* Tooltip */}
                {isHovered && (
                  <div className="absolute left-1/2 top-full z-20 mt-2 w-44 -translate-x-1/2 animate-fade-in rounded-lg border border-white/10 bg-black/85 p-2.5 text-left backdrop-blur-md">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-white">{p.plate}</span>
                      <span
                        className="rounded-full px-1.5 py-0.5 text-[9px] font-semibold uppercase"
                        style={{ background: `${color}25`, color }}
                      >
                        {statusMeta[p.status].label}
                      </span>
                    </div>
                    <p className="mt-1 truncate text-[11px] text-white/70">
                      {p.driver ?? "Sin conductor"}
                    </p>
                    <p className="text-[11px] text-white/50">
                      <MapPin className="mr-0.5 inline h-2.5 w-2.5" />
                      {p.group} · {p.loadPct}% carga
                    </p>
                  </div>
                )}
              </button>
            );
          })}
        </div>

        {/* SIDE PANEL */}
        <div className="flex flex-col p-5">
          <div className="flex items-start gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary shadow-glow">
              <Radio className="h-5 w-5 text-primary-foreground" />
            </div>
            <div className="min-w-0">
              <h2 className="text-base font-bold leading-tight">Flota en vivo</h2>
              <p className="text-xs text-white/60">
                {inRoute} de {total} vehículos en movimiento
              </p>
            </div>
          </div>

          {/* Filter legend */}
          <div className="mt-5 space-y-1.5">
            <button
              onClick={() => setActiveFilter("all")}
              className={cn(
                "flex w-full items-center justify-between rounded-md px-2 py-1.5 text-left text-xs transition-colors",
                activeFilter === "all"
                  ? "bg-white/10 text-white"
                  : "text-white/70 hover:bg-white/5"
              )}
            >
              <span className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-white/60" />
                Todos
              </span>
              <span className="font-semibold">{total}</span>
            </button>
            {(Object.keys(statusColor) as VehicleStatus[]).map((s) => (
              <button
                key={s}
                onClick={() => setActiveFilter(activeFilter === s ? "all" : s)}
                className={cn(
                  "flex w-full items-center justify-between rounded-md px-2 py-1.5 text-left text-xs transition-colors",
                  activeFilter === s
                    ? "bg-white/10 text-white"
                    : "text-white/70 hover:bg-white/5"
                )}
              >
                <span className="flex items-center gap-2">
                  <span
                    className="h-2 w-2 rounded-full"
                    style={{ background: statusColor[s] }}
                  />
                  {statusMeta[s].label}
                </span>
                <span className="font-semibold">{counts[s] ?? 0}</span>
              </button>
            ))}
          </div>

          <div className="mt-auto pt-5">
            <Badge className="border-0 bg-success-soft text-success">
              <Navigation className="mr-1 h-3 w-3" /> GPS sincronizado
            </Badge>
            <Link to="/flota" className="mt-3 block">
              <Button className="w-full justify-between bg-primary hover:bg-primary-hover">
                Ver flota completa
                <ArrowUpRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FleetLiveMap;