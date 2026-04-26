import { useMemo, useState } from "react";
import { Download, LayoutGrid, List, Plus, Truck, Upload, Wrench, CheckCircle2, MapPin } from "lucide-react";
import PageHeader from "@/components/PageHeader";
import StatCard from "@/components/StatCard";
import VehicleFilters, { Filters } from "@/components/vehicles/VehicleFilters";
import VehicleTable from "@/components/vehicles/VehicleTable";
import VehicleCard from "@/components/vehicles/VehicleCard";
import VehicleDetailDrawer from "@/components/vehicles/VehicleDetailDrawer";
import NewVehicleDialog from "@/components/vehicles/NewVehicleDialog";
import { vehicles as allVehicles, Vehicle } from "@/data/vehicles";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const Vehiculos = () => {
  const [filters, setFilters] = useState<Filters>({
    search: "",
    type: "all",
    status: "all",
    group: "all",
  });
  const [view, setView] = useState<"table" | "grid">("table");
  const [selected, setSelected] = useState<Vehicle | null>(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [createOpen, setCreateOpen] = useState(false);

  const filtered = useMemo(() => {
    return allVehicles.filter((v) => {
      const s = filters.search.toLowerCase();
      const matchSearch =
        !s ||
        v.plate.toLowerCase().includes(s) ||
        (v.driver ?? "").toLowerCase().includes(s);
      const matchType = filters.type === "all" || v.type === filters.type;
      const matchStatus = filters.status === "all" || v.status === filters.status;
      const matchGroup = filters.group === "all" || v.group === filters.group;
      return matchSearch && matchType && matchStatus && matchGroup;
    });
  }, [filters]);

  const stats = useMemo(() => {
    const total = allVehicles.length;
    const active = allVehicles.filter((v) => v.status === "active").length;
    const inRoute = allVehicles.filter((v) => v.status === "in_route").length;
    const maintenance = allVehicles.filter((v) => v.status === "maintenance").length;
    return { total, active, inRoute, maintenance };
  }, []);

  const openDetail = (v: Vehicle) => {
    setSelected(v);
    setDrawerOpen(true);
  };

  return (
    <div className="animate-fade-in">
      <PageHeader
        title="Vehículos"
        subtitle="Gestiona tu flota, asigna conductores y monitorea el estado en tiempo real."
        actions={
          <>
            <Button variant="outline" size="sm" className="h-9">
              <Download className="mr-2 h-4 w-4" /> Exportar
            </Button>
            <Button variant="outline" size="sm" className="h-9">
              <Upload className="mr-2 h-4 w-4" /> Importar
            </Button>
            <Button
              size="sm"
              onClick={() => setCreateOpen(true)}
              className="h-9 bg-primary shadow-glow hover:bg-primary-hover"
            >
              <Plus className="mr-2 h-4 w-4" /> Nuevo vehículo
            </Button>
          </>
        }
      />

      <div className="space-y-5 p-4 sm:p-6 lg:p-8">
        {/* KPIs */}
        <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
          <StatCard
            label="Total flota"
            value={stats.total}
            delta="+2 este mes"
            icon={Truck}
            tone="primary"
          />
          <StatCard
            label="Activos"
            value={stats.active}
            delta={`${Math.round((stats.active / stats.total) * 100)}% disponible`}
            icon={CheckCircle2}
            tone="success"
          />
          <StatCard
            label="En ruta"
            value={stats.inRoute}
            icon={MapPin}
            tone="info"
          />
          <StatCard
            label="Mantenimiento"
            value={stats.maintenance}
            icon={Wrench}
            tone="warning"
          />
        </div>

        {/* Filtros */}
        <VehicleFilters
          filters={filters}
          onChange={setFilters}
          onReset={() =>
            setFilters({ search: "", type: "all", status: "all", group: "all" })
          }
        />

        {/* Toolbar de vista */}
        <div className="flex flex-wrap items-center justify-between gap-3">
          <p className="text-sm text-muted-foreground">
            Mostrando{" "}
            <span className="font-semibold text-foreground">{filtered.length}</span>{" "}
            de{" "}
            <span className="font-semibold text-foreground">{allVehicles.length}</span>{" "}
            vehículos
          </p>
          <div className="hidden items-center gap-1 rounded-lg border border-border bg-card p-1 sm:inline-flex">
            <button
              onClick={() => setView("table")}
              className={cn(
                "flex items-center gap-1.5 rounded-md px-3 py-1.5 text-xs font-medium transition-colors",
                view === "table"
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              <List className="h-3.5 w-3.5" /> Tabla
            </button>
            <button
              onClick={() => setView("grid")}
              className={cn(
                "flex items-center gap-1.5 rounded-md px-3 py-1.5 text-xs font-medium transition-colors",
                view === "grid"
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              <LayoutGrid className="h-3.5 w-3.5" /> Tarjetas
            </button>
          </div>
        </div>

        {/* Contenido */}
        {filtered.length === 0 ? (
          <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-border bg-card py-16 text-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-muted">
              <Truck className="h-8 w-8 text-muted-foreground" />
            </div>
            <p className="mt-4 text-base font-semibold text-foreground">
              No se encontraron vehículos
            </p>
            <p className="mt-1 text-sm text-muted-foreground">
              Ajusta los filtros o crea un nuevo vehículo.
            </p>
            <Button
              onClick={() => setCreateOpen(true)}
              className="mt-4 bg-primary hover:bg-primary-hover"
            >
              <Plus className="mr-2 h-4 w-4" /> Nuevo vehículo
            </Button>
          </div>
        ) : (
          <>
            {/* Mobile: siempre tarjetas */}
            <div className="grid grid-cols-1 gap-3 sm:hidden">
              {filtered.map((v) => (
                <VehicleCard key={v.id} v={v} onClick={() => openDetail(v)} />
              ))}
            </div>

            {/* Desktop: según vista */}
            <div className="hidden sm:block">
              {view === "table" ? (
                <VehicleTable vehicles={filtered} onSelect={openDetail} />
              ) : (
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
                  {filtered.map((v) => (
                    <VehicleCard key={v.id} v={v} onClick={() => openDetail(v)} />
                  ))}
                </div>
              )}
            </div>
          </>
        )}
      </div>

      <VehicleDetailDrawer
        vehicle={selected}
        open={drawerOpen}
        onOpenChange={setDrawerOpen}
      />
      <NewVehicleDialog open={createOpen} onOpenChange={setCreateOpen} />
    </div>
  );
};

export default Vehiculos;