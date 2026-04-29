import { Search, X, Calendar } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { drivers, vehiclePlates, zones } from "@/data/routes";

export interface RouteFiltersState {
  search: string;
  date: string;
  status: string;
  zone: string;
  driver: string;
  vehicle: string;
}

interface Props {
  filters: RouteFiltersState;
  onChange: (next: RouteFiltersState) => void;
  onReset: () => void;
}

const RouteFilters = ({ filters, onChange, onReset }: Props) => {
  const hasActive =
    filters.search ||
    filters.date ||
    filters.status !== "all" ||
    filters.zone !== "all" ||
    filters.driver !== "all" ||
    filters.vehicle !== "all";

  return (
    <div className="rounded-xl border border-border bg-card p-4 shadow-sm">
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-6">
        <div className="relative lg:col-span-2">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Buscar por código, nombre o conductor..."
            value={filters.search}
            onChange={(e) => onChange({ ...filters, search: e.target.value })}
            className="h-10 pl-9"
          />
        </div>

        <div className="relative">
          <Calendar className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            type="date"
            value={filters.date}
            onChange={(e) => onChange({ ...filters, date: e.target.value })}
            className="h-10 pl-9"
          />
        </div>

        <Select
          value={filters.status}
          onValueChange={(v) => onChange({ ...filters, status: v })}
        >
          <SelectTrigger className="h-10">
            <SelectValue placeholder="Estado" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todos los estados</SelectItem>
            <SelectItem value="scheduled">Programada</SelectItem>
            <SelectItem value="in_progress">En curso</SelectItem>
            <SelectItem value="completed">Completada</SelectItem>
            <SelectItem value="delayed">Retrasada</SelectItem>
            <SelectItem value="cancelled">Cancelada</SelectItem>
          </SelectContent>
        </Select>

        <Select
          value={filters.zone}
          onValueChange={(v) => onChange({ ...filters, zone: v })}
        >
          <SelectTrigger className="h-10">
            <SelectValue placeholder="Zona" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todas las zonas</SelectItem>
            {zones.map((z) => (
              <SelectItem key={z} value={z}>
                {z}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select
          value={filters.driver}
          onValueChange={(v) => onChange({ ...filters, driver: v })}
        >
          <SelectTrigger className="h-10">
            <SelectValue placeholder="Conductor" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todos los conductores</SelectItem>
            {drivers.map((d) => (
              <SelectItem key={d} value={d}>
                {d}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select
          value={filters.vehicle}
          onValueChange={(v) => onChange({ ...filters, vehicle: v })}
        >
          <SelectTrigger className="h-10 lg:col-start-6">
            <SelectValue placeholder="Vehículo" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todos los vehículos</SelectItem>
            {vehiclePlates.map((p) => (
              <SelectItem key={p} value={p}>
                {p}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {hasActive && (
        <div className="mt-3 flex justify-end">
          <Button
            variant="ghost"
            size="sm"
            onClick={onReset}
            className="h-8 text-xs text-muted-foreground hover:text-foreground"
          >
            <X className="mr-1 h-3.5 w-3.5" /> Limpiar filtros
          </Button>
        </div>
      )}
    </div>
  );
};

export default RouteFilters;