import { useMemo } from "react";
import {
  Truck,
  Package,
  Route as RouteIcon,
  Users,
  TrendingUp,
  TrendingDown,
  CheckCircle2,
  Clock,
  AlertTriangle,
  DollarSign,
  MapPin,
  Activity,
  ArrowUpRight,
  Wrench,
  Plus,
  Download,
} from "lucide-react";
import {
  AreaChart,
  Area,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";
import { Link } from "react-router-dom";
import PageHeader from "@/components/PageHeader";
import StatCard from "@/components/StatCard";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { vehicles, statusMeta as vehicleStatusMeta } from "@/data/vehicles";
import { routes, routeStatusMeta } from "@/data/routes";
import { cn } from "@/lib/utils";

/* ------------------------------ helpers ------------------------------ */
const fmtMoney = (n: number) =>
  new Intl.NumberFormat("es-PE", {
    style: "currency",
    currency: "PEN",
    maximumFractionDigits: 0,
  }).format(n);

const initials = (name: string) =>
  name
    .split(" ")
    .map((n) => n[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

/* ----------------------------- mock series --------------------------- */
const weekSeries = [
  { day: "Lun", entregas: 84, pendientes: 22 },
  { day: "Mar", entregas: 102, pendientes: 18 },
  { day: "Mié", entregas: 96, pendientes: 25 },
  { day: "Jue", entregas: 118, pendientes: 14 },
  { day: "Vie", entregas: 134, pendientes: 19 },
  { day: "Sáb", entregas: 152, pendientes: 11 },
  { day: "Dom", entregas: 78, pendientes: 8 },
];

const zoneSeries = [
  { zona: "L. Norte", ordenes: 142 },
  { zona: "L. Sur", ordenes: 118 },
  { zona: "L. Centro", ordenes: 96 },
  { zona: "Callao", ordenes: 84 },
];

const recentActivity = [
  {
    id: "a1",
    icon: CheckCircle2,
    tone: "success" as const,
    title: "Ruta RT-2504-014 completada",
    desc: "María Sánchez · 22/22 entregas",
    time: "hace 12 min",
  },
  {
    id: "a2",
    icon: AlertTriangle,
    tone: "warning" as const,
    title: "Ruta RT-2604-002 con retraso",
    desc: "Luis Paredes · Callao Industrial",
    time: "hace 38 min",
  },
  {
    id: "a3",
    icon: Wrench,
    tone: "info" as const,
    title: "Vehículo BKT-760 ingresó a mantenimiento",
    desc: "Programado por Jorge Ilizarbe",
    time: "hace 1 h",
  },
  {
    id: "a4",
    icon: Package,
    tone: "primary" as const,
    title: "12 nuevas órdenes asignadas",
    desc: "Lima Norte · turno mañana",
    time: "hace 2 h",
  },
];

const toneStyles: Record<string, string> = {
  success: "bg-success-soft text-success",
  warning: "bg-warning-soft text-warning",
  info: "bg-info-soft text-info",
  primary: "bg-primary-soft text-primary",
};

/* ------------------------------ component ---------------------------- */
const Dashboard = () => {
  const stats = useMemo(() => {
    const activeVehicles = vehicles.filter(
      (v) => v.status === "active" || v.status === "in_route"
    ).length;
    const inMaintenance = vehicles.filter((v) => v.status === "maintenance").length;
    const activeRoutes = routes.filter(
      (r) => r.status === "in_progress" || r.status === "scheduled"
    ).length;
    const totalStops = routes.reduce((a, r) => a + r.stopsTotal, 0);
    const doneStops = routes.reduce((a, r) => a + r.stopsDone, 0);
    const collected = routes.reduce((a, r) => a + r.collectedAmount, 0);
    const total = routes.reduce((a, r) => a + r.totalAmount, 0);
    const fleetUsage = Math.round(
      (vehicles.reduce((a, v) => a + v.loadPct, 0) / vehicles.length) || 0
    );
    const onTimeRate = Math.round((doneStops / Math.max(totalStops, 1)) * 100);
    return {
      activeVehicles,
      inMaintenance,
      activeRoutes,
      totalStops,
      doneStops,
      collected,
      total,
      fleetUsage,
      onTimeRate,
      drivers: new Set(vehicles.map((v) => v.driver).filter(Boolean)).size,
    };
  }, []);

  const fleetBreakdown = useMemo(() => {
    const counts = vehicles.reduce<Record<string, number>>((acc, v) => {
      acc[v.status] = (acc[v.status] || 0) + 1;
      return acc;
    }, {});
    const colors: Record<string, string> = {
      active: "hsl(var(--success))",
      in_route: "hsl(var(--info))",
      maintenance: "hsl(var(--warning))",
      inactive: "hsl(var(--tertiary))",
    };
    return Object.entries(counts).map(([k, v]) => ({
      name: vehicleStatusMeta[k as keyof typeof vehicleStatusMeta].label,
      value: v,
      color: colors[k],
    }));
  }, []);

  const topDrivers = useMemo(
    () =>
      [...routes]
        .sort((a, b) => b.stopsDone - a.stopsDone)
        .slice(0, 5)
        .map((r) => ({
          name: r.driver,
          zone: r.zone,
          stops: `${r.stopsDone}/${r.stopsTotal}`,
          pct: Math.round((r.stopsDone / r.stopsTotal) * 100),
          collected: r.collectedAmount,
        })),
    []
  );

  const activeRoutesList = useMemo(
    () =>
      routes
        .filter((r) => r.status === "in_progress" || r.status === "delayed")
        .slice(0, 4),
    []
  );

  return (
    <div className="animate-fade-in">
      <PageHeader
        title="Dashboard"
        subtitle="Resumen operativo de tu flota y entregas en tiempo real."
        actions={
          <>
            <Button variant="outline" size="sm" className="gap-2">
              <Download className="h-4 w-4" />
              Exportar
            </Button>
            <Link to="/rutas">
              <Button size="sm" className="gap-2 bg-primary hover:bg-primary-hover">
                <Plus className="h-4 w-4" />
                Nueva ruta
              </Button>
            </Link>
          </>
        }
      />

      <div className="space-y-6 p-4 sm:p-6 lg:p-8">
        {/* KPIs */}
        <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
          <StatCard
            label="Vehículos activos"
            value={stats.activeVehicles}
            delta={`${stats.inMaintenance} en mantenimiento`}
            icon={Truck}
            tone="primary"
          />
          <StatCard
            label="Rutas activas"
            value={stats.activeRoutes}
            delta={`${stats.doneStops}/${stats.totalStops} paradas`}
            icon={RouteIcon}
            tone="info"
          />
          <StatCard
            label="Recaudación hoy"
            value={fmtMoney(stats.collected)}
            delta={`Meta ${fmtMoney(stats.total)}`}
            icon={DollarSign}
            tone="success"
          />
          <StatCard
            label="Uso de flota"
            value={`${stats.fleetUsage}%`}
            delta={`${stats.drivers} conductores`}
            icon={Activity}
            tone="warning"
          />
        </div>

        {/* Hero banner */}
        <div className="overflow-hidden rounded-xl border border-border bg-gradient-dark p-6 text-white shadow-md sm:p-8">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex items-start gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-primary shadow-glow">
                <TrendingUp className="h-6 w-6 text-primary-foreground" />
              </div>
              <div>
                <h2 className="text-xl font-bold sm:text-2xl">
                  Tu flota está funcionando al {stats.fleetUsage}%
                </h2>
                <p className="mt-1 max-w-xl text-sm text-white/70">
                  Optimiza la asignación de rutas y reduce tiempos de entrega
                  gestionando vehículos, conductores y órdenes desde un solo lugar.
                </p>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-4 sm:gap-6">
              <div>
                <p className="text-xs uppercase tracking-wider text-white/50">
                  Cumplimiento
                </p>
                <p className="mt-1 text-2xl font-bold">{stats.onTimeRate}%</p>
              </div>
              <div>
                <p className="text-xs uppercase tracking-wider text-white/50">
                  Entregas
                </p>
                <p className="mt-1 text-2xl font-bold">{stats.doneStops}</p>
              </div>
              <div>
                <p className="text-xs uppercase tracking-wider text-white/50">
                  Pendientes
                </p>
                <p className="mt-1 text-2xl font-bold">
                  {stats.totalStops - stats.doneStops}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Charts row */}
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
          {/* Area chart - entregas semana */}
          <div className="rounded-xl border border-border bg-card p-5 shadow-sm lg:col-span-2">
            <div className="mb-4 flex items-center justify-between">
              <div>
                <h3 className="text-base font-semibold text-foreground">
                  Entregas en la semana
                </h3>
                <p className="text-xs text-muted-foreground">
                  Comparativa de entregas vs pendientes
                </p>
              </div>
              <Badge className="bg-success-soft text-success hover:bg-success-soft">
                <TrendingUp className="mr-1 h-3 w-3" /> +18.2%
              </Badge>
            </div>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={weekSeries} margin={{ left: -20, right: 8, top: 8 }}>
                  <defs>
                    <linearGradient id="gEntregas" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity={0.35} />
                      <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity={0} />
                    </linearGradient>
                    <linearGradient id="gPendientes" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="hsl(var(--info))" stopOpacity={0.25} />
                      <stop offset="100%" stopColor="hsl(var(--info))" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" vertical={false} />
                  <XAxis dataKey="day" stroke="hsl(var(--muted-foreground))" fontSize={12} tickLine={false} axisLine={false} />
                  <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} tickLine={false} axisLine={false} />
                  <Tooltip
                    contentStyle={{
                      background: "hsl(var(--popover))",
                      border: "1px solid hsl(var(--border))",
                      borderRadius: 8,
                      fontSize: 12,
                    }}
                  />
                  <Area type="monotone" dataKey="entregas" stroke="hsl(var(--primary))" strokeWidth={2.5} fill="url(#gEntregas)" />
                  <Area type="monotone" dataKey="pendientes" stroke="hsl(var(--info))" strokeWidth={2} fill="url(#gPendientes)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Pie - estado flota */}
          <div className="rounded-xl border border-border bg-card p-5 shadow-sm">
            <div className="mb-4">
              <h3 className="text-base font-semibold text-foreground">Estado de flota</h3>
              <p className="text-xs text-muted-foreground">{vehicles.length} vehículos totales</p>
            </div>
            <div className="h-48">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={fleetBreakdown}
                    dataKey="value"
                    nameKey="name"
                    innerRadius={48}
                    outerRadius={72}
                    paddingAngle={2}
                    stroke="none"
                  >
                    {fleetBreakdown.map((entry, i) => (
                      <Cell key={i} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      background: "hsl(var(--popover))",
                      border: "1px solid hsl(var(--border))",
                      borderRadius: 8,
                      fontSize: 12,
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="mt-2 grid grid-cols-2 gap-2">
              {fleetBreakdown.map((s) => (
                <div key={s.name} className="flex items-center gap-2 text-xs">
                  <span className="h-2.5 w-2.5 rounded-full" style={{ background: s.color }} />
                  <span className="text-muted-foreground">{s.name}</span>
                  <span className="ml-auto font-semibold text-foreground">{s.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bar + activity */}
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
          <div className="rounded-xl border border-border bg-card p-5 shadow-sm lg:col-span-2">
            <div className="mb-4 flex items-center justify-between">
              <div>
                <h3 className="text-base font-semibold text-foreground">Órdenes por zona</h3>
                <p className="text-xs text-muted-foreground">Distribución del día actual</p>
              </div>
              <Link to="/ordenes" className="text-xs font-medium text-primary hover:underline">
                Ver todas <ArrowUpRight className="ml-0.5 inline h-3 w-3" />
              </Link>
            </div>
            <div className="h-56">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={zoneSeries} margin={{ left: -20, right: 8, top: 8 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" vertical={false} />
                  <XAxis dataKey="zona" stroke="hsl(var(--muted-foreground))" fontSize={12} tickLine={false} axisLine={false} />
                  <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} tickLine={false} axisLine={false} />
                  <Tooltip
                    cursor={{ fill: "hsl(var(--muted))" }}
                    contentStyle={{
                      background: "hsl(var(--popover))",
                      border: "1px solid hsl(var(--border))",
                      borderRadius: 8,
                      fontSize: 12,
                    }}
                  />
                  <Bar dataKey="ordenes" fill="hsl(var(--primary))" radius={[6, 6, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Activity feed */}
          <div className="rounded-xl border border-border bg-card p-5 shadow-sm">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-base font-semibold text-foreground">Actividad reciente</h3>
              <Badge variant="secondary" className="text-[10px]">EN VIVO</Badge>
            </div>
            <ul className="space-y-4">
              {recentActivity.map((a) => (
                <li key={a.id} className="flex gap-3">
                  <div className={cn("mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg", toneStyles[a.tone])}>
                    <a.icon className="h-4 w-4" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-medium text-foreground">{a.title}</p>
                    <p className="truncate text-xs text-muted-foreground">{a.desc}</p>
                    <p className="mt-0.5 text-[11px] text-tertiary">
                      <Clock className="mr-1 inline h-3 w-3" />
                      {a.time}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Active routes + Top drivers */}
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-5">
          <div className="rounded-xl border border-border bg-card p-5 shadow-sm lg:col-span-3">
            <div className="mb-4 flex items-center justify-between">
              <div>
                <h3 className="text-base font-semibold text-foreground">Rutas en curso</h3>
                <p className="text-xs text-muted-foreground">Seguimiento del progreso por ruta</p>
              </div>
              <Link to="/rutas" className="text-xs font-medium text-primary hover:underline">
                Gestionar <ArrowUpRight className="ml-0.5 inline h-3 w-3" />
              </Link>
            </div>
            <div className="space-y-4">
              {activeRoutesList.map((r) => {
                const meta = routeStatusMeta[r.status];
                const pct = Math.round((r.stopsDone / r.stopsTotal) * 100);
                return (
                  <div key={r.id} className="rounded-lg border border-border p-4 transition-colors hover:bg-surface-muted">
                    <div className="flex flex-wrap items-start justify-between gap-2">
                      <div className="min-w-0">
                        <div className="flex items-center gap-2">
                          <span className="font-semibold text-foreground">{r.code}</span>
                          <Badge className={cn("border-0", meta.className)}>{meta.label}</Badge>
                        </div>
                        <p className="mt-0.5 text-xs text-muted-foreground">
                          <MapPin className="mr-1 inline h-3 w-3" />
                          {r.zone} · {r.driver} · {r.vehiclePlate}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-semibold text-foreground">
                          {r.stopsDone}/{r.stopsTotal}
                        </p>
                        <p className="text-[11px] text-muted-foreground">paradas</p>
                      </div>
                    </div>
                    <div className="mt-3 flex items-center gap-3">
                      <Progress value={pct} className="h-1.5 flex-1" />
                      <span className="w-10 text-right text-xs font-medium text-foreground">{pct}%</span>
                    </div>
                  </div>
                );
              })}
              {activeRoutesList.length === 0 && (
                <p className="py-8 text-center text-sm text-muted-foreground">
                  No hay rutas en curso.
                </p>
              )}
            </div>
          </div>

          <div className="rounded-xl border border-border bg-card p-5 shadow-sm lg:col-span-2">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-base font-semibold text-foreground">Top conductores</h3>
              <Badge variant="secondary" className="text-[10px]">HOY</Badge>
            </div>
            <ul className="space-y-3">
              {topDrivers.map((d, i) => (
                <li
                  key={d.name}
                  className="flex items-center gap-3 rounded-lg p-2 transition-colors hover:bg-surface-muted"
                >
                  <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-md bg-muted text-[11px] font-bold text-muted-foreground">
                    {i + 1}
                  </div>
                  <Avatar className="h-9 w-9">
                    <AvatarFallback className="bg-primary-soft text-xs font-semibold text-primary">
                      {initials(d.name)}
                    </AvatarFallback>
                  </Avatar>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-medium text-foreground">{d.name}</p>
                    <p className="truncate text-xs text-muted-foreground">
                      {d.zone} · {d.stops}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-semibold text-foreground">{d.pct}%</p>
                    <p className="text-[11px] text-success">{fmtMoney(d.collected)}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;