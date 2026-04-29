import { useMemo, useState } from "react";
import {
  CalendarClock,
  CheckCircle2,
  Download,
  GanttChartSquare,
  LayoutGrid,
  List,
  Plus,
  Route as RouteIcon,
  TrendingUp,
  Upload,
  UserPlus,
} from "lucide-react";
import PageHeader from "@/components/PageHeader";
import StatCard from "@/components/StatCard";
import RouteFilters, {
  RouteFiltersState,
} from "@/components/routes/RouteFilters";
import RouteTable from "@/components/routes/RouteTable";
import RouteCard from "@/components/routes/RouteCard";
import RouteTimeline from "@/components/routes/RouteTimeline";
import RouteDetailDrawer from "@/components/routes/RouteDetailDrawer";
import NewRouteDialog from "@/components/routes/NewRouteDialog";
import { Button } from "@/components/ui/button";
import { routes as allRoutes, DeliveryRoute } from "@/data/routes";
import { cn } from "@/lib/utils";

type View = "table" | "grid" | "timeline";

const Rutas = () => {
  const [filters, setFilters] = useState<RouteFiltersState>({
    search: "",
    date: "",
    status: "all",
    zone: "all",
    driver: "all",
    vehicle: "all",
  });
  const [view, setView] = useState<View>("table");
  const [selected, setSelected] = useState<DeliveryRoute | null>(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [createOpen, setCreateOpen] = useState(false);

  const filtered = useMemo(() => {
    return allRoutes.filter((r) => {
      const s = filters.search.toLowerCase();
      const matchSearch =
        !s ||
        r.code.toLowerCase().includes(s) ||
        r.name.toLowerCase().includes(s) ||
        r.driver.toLowerCase().includes(s);
      const matchDate = !filters.date || r.date === filters.date;
      const matchStatus = filters.status === "all" || r.status === filters.status;
      const matchZone = filters.zone === "all" || r.zone === filters.zone;
      const matchDriver = filters.driver === "all" || r.driver === filters.driver;
      const matchVehicle =
        filters.vehicle === "all" || r.vehiclePlate === filters.vehicle;
      return (
        matchSearch &&
        matchDate &&
        matchStatus &&
        matchZone &&
        matchDriver &&
        matchVehicle
      );
    });
  }, [filters]);

  const stats = useMemo(() => {
    const total = allRoutes.length;
    const inProgress = allRoutes.filter((r) => r.status === "in_progress").length;
    const completed = allRoutes.filter((r) => r.status === "completed").length;
    const collected = allRoutes.reduce((s, r) => s + r.collectedAmount, 0);
    return { total, inProgress, completed, collected };
  }, []);

  const openDetail = (r: DeliveryRoute) => {
    setSelected(r);
    setDrawerOpen(true);
  };

  const reset = () =>
    setFilters({
      search: "",
      date: "",
      status: "all",
      zone: "all",
      driver: "all",
      vehicle: "all",
    });

  const formatCurrency = (n: number) =>
    new Intl.NumberFormat("es-PE", {
      style: "currency",
      currency: "PEN",
      maximumFractionDigits: 0,
    }).format(n);

  const viewBtn = (v: View, label: string, Icon: typeof List) => (
    <button
      onClick={() => setView(v)}
      className={cn(
        "flex items-center gap-1.5 rounded-md px-3 py-1.5 text-xs font-medium transition-colors",
        view === v
          ? "bg-primary text-primary-foreground"
          : "text-muted-foreground hover:text-foreground"
      )}
    >
      <Icon className="h-3.5 w-3.5" /> {label}
    </button>
  );

  return (
    <div className="animate-fade-in">
      <PageHeader
        title="Rutas"
        subtitle="Planifica, asigna y monitorea las rutas de despacho de tu flota."
        actions={
          <>
            <Button variant="outline" size="sm" className="h-9">
              <Upload className="mr-2 h-4 w-4" /> Importar
            </Button>
            <Button variant="outline" size="sm" className="h-9">
              <UserPlus className="mr-2 h-4 w-4" /> Asignar
            </Button>
            <Button variant="outline" size="sm" className="h-9">
              <Download className="mr-2 h-4 w-4" /> Exportar
            </Button>
            <Button
              size="sm"
              onClick={() => setCreateOpen(true)}
              className="h-9 bg-primary shadow-glow hover:bg-primary-hover"
            >
              <Plus className="mr-2 h-4 w-4" /> Nueva ruta
            </Button>
          </>
        }
      />

      <div className="space-y-5 p-4 sm:p-6 lg:p-8">
        {/* KPIs */}
        <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
          <StatCard
            label="Rutas totales"
            value={stats.total}
            delta="Hoy + ayer"
            icon={RouteIcon}
            tone="primary"
          />
          <StatCard
            label="En curso"
            value={stats.inProgress}
            icon={CalendarClock}
            tone="info"
          />
          <StatCard
            label="Completadas"
            value={stats.completed}
            delta={`${Math.round((stats.completed / stats.total) * 100)}% efectividad`}
            icon={CheckCircle2}
            tone="success"
          />
          <StatCard
            label="Recaudación"
            value={formatCurrency(stats.collected)}
            icon={TrendingUp}
            tone="warning"
          />
        </div>

        {/* Filtros */}
        <RouteFilters filters={filters} onChange={setFilters} onReset={reset} />

        {/* Toolbar */}
        <div className="flex flex-wrap items-center justify-between gap-3">
          <p className="text-sm text-muted-foreground">
            Mostrando{" "}
            <span className="font-semibold text-foreground">{filtered.length}</span>{" "}
            de{" "}
            <span className="font-semibold text-foreground">{allRoutes.length}</span>{" "}
            rutas
          </p>
          <div className="hidden items-center gap-1 rounded-lg border border-border bg-card p-1 sm:inline-flex">
            {viewBtn("table", "Tabla", List)}
            {viewBtn("grid", "Tarjetas", LayoutGrid)}
            {viewBtn("timeline", "Timeline", GanttChartSquare)}
          </div>
        </div>

        {/* Contenido */}
        {filtered.length === 0 ? (
          <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-border bg-card py-16 text-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary-soft text-primary">
              <RouteIcon className="h-8 w-8" />
            </div>
            <p className="mt-4 text-base font-semibold text-foreground">
              No hay información disponible para los filtros seleccionados
            </p>
            <p className="mt-1 text-sm text-muted-foreground">
              Ajusta los filtros o crea una nueva ruta.
            </p>
            <Button
              onClick={() => setCreateOpen(true)}
              className="mt-4 bg-primary hover:bg-primary-hover"
            >
              <Plus className="mr-2 h-4 w-4" /> Crear ruta
            </Button>
          </div>
        ) : (
          <>
            {/* Mobile: tarjetas */}
            <div className="grid grid-cols-1 gap-3 sm:hidden">
              {filtered.map((r) => (
                <RouteCard key={r.id} r={r} onClick={() => openDetail(r)} />
              ))}
            </div>

            {/* Desktop */}
            <div className="hidden sm:block">
              {view === "table" && (
                <RouteTable routes={filtered} onSelect={openDetail} />
              )}
              {view === "grid" && (
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
                  {filtered.map((r) => (
                    <RouteCard key={r.id} r={r} onClick={() => openDetail(r)} />
                  ))}
                </div>
              )}
              {view === "timeline" && (
                <RouteTimeline routes={filtered} onSelect={openDetail} />
              )}
            </div>
          </>
        )}
      </div>

      <RouteDetailDrawer
        route={selected}
        open={drawerOpen}
        onOpenChange={setDrawerOpen}
      />
      <NewRouteDialog open={createOpen} onOpenChange={setCreateOpen} />
    </div>
  );
};

export default Rutas;