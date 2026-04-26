import { Search, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";

interface Filters {
  search: string;
  type: string;
  status: string;
  group: string;
}

interface Props {
  filters: Filters;
  onChange: (next: Filters) => void;
  onReset: () => void;
}

const VehicleFilters = ({ filters, onChange, onReset }: Props) => {
  const hasActive =
    filters.search || filters.type !== "all" || filters.status !== "all" || filters.group !== "all";

  return (
    <div className="rounded-xl border border-border bg-card p-4 shadow-sm">
      <div className="grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-5">
        <div className="relative lg:col-span-2">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Buscar por placa, conductor..."
            value={filters.search}
            onChange={(e) => onChange({ ...filters, search: e.target.value })}
            className="h-10 pl-9"
          />
        </div>

        <Select
          value={filters.type}
          onValueChange={(v) => onChange({ ...filters, type: v })}
        >
          <SelectTrigger className="h-10">
            <SelectValue placeholder="Tipo de vehículo" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todos los tipos</SelectItem>
            <SelectItem value="Furgón">Furgón</SelectItem>
            <SelectItem value="Camión">Camión</SelectItem>
            <SelectItem value="Moto">Moto</SelectItem>
            <SelectItem value="Camioneta">Camioneta</SelectItem>
          </SelectContent>
        </Select>

        <Select
          value={filters.status}
          onValueChange={(v) => onChange({ ...filters, status: v })}
        >
          <SelectTrigger className="h-10">
            <SelectValue placeholder="Estado" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todos los estados</SelectItem>
            <SelectItem value="active">Activo</SelectItem>
            <SelectItem value="in_route">En ruta</SelectItem>
            <SelectItem value="maintenance">Mantenimiento</SelectItem>
            <SelectItem value="inactive">Inactivo</SelectItem>
          </SelectContent>
        </Select>

        <Select
          value={filters.group}
          onValueChange={(v) => onChange({ ...filters, group: v })}
        >
          <SelectTrigger className="h-10">
            <SelectValue placeholder="Grupo" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todos los grupos</SelectItem>
            <SelectItem value="Lima Norte">Lima Norte</SelectItem>
            <SelectItem value="Lima Sur">Lima Sur</SelectItem>
            <SelectItem value="Lima Centro">Lima Centro</SelectItem>
            <SelectItem value="Callao">Callao</SelectItem>
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

export default VehicleFilters;
export type { Filters };