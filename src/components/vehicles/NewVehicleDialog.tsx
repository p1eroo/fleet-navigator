import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { toast } from "sonner";

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const NewVehicleDialog = ({ open, onOpenChange }: Props) => {
  const [plate, setPlate] = useState("");
  const [type, setType] = useState("");
  const [autoManaged, setAutoManaged] = useState(false);

  const handleSave = () => {
    if (!plate || !type) return;
    toast.success(`Vehículo ${plate} creado correctamente`);
    setPlate("");
    setType("");
    setAutoManaged(false);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Nuevo vehículo</DialogTitle>
          <DialogDescription>
            Registra un vehículo en tu flota. Los campos con * son obligatorios.
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-4 py-2">
          <div className="grid gap-2">
            <Label htmlFor="plate">
              Placa o identificador <span className="text-primary">*</span>
            </Label>
            <Input
              id="plate"
              value={plate}
              onChange={(e) => setPlate(e.target.value.toUpperCase())}
              placeholder="Ej: BFS-748"
            />
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="grid gap-2">
              <Label>Tipo de vehículo <span className="text-primary">*</span></Label>
              <Select value={type} onValueChange={setType}>
                <SelectTrigger>
                  <SelectValue placeholder="Selecciona" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Furgón">Furgón</SelectItem>
                  <SelectItem value="Camión">Camión</SelectItem>
                  <SelectItem value="Moto">Moto</SelectItem>
                  <SelectItem value="Camioneta">Camioneta</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="grid gap-2">
              <Label>Grupo</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Asignar grupo" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Lima Norte">Lima Norte</SelectItem>
                  <SelectItem value="Lima Sur">Lima Sur</SelectItem>
                  <SelectItem value="Lima Centro">Lima Centro</SelectItem>
                  <SelectItem value="Callao">Callao</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid gap-2">
            <Label>Conductor asociado</Label>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Seleccionar conductor (opcional)" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="cm">Carlos Mendoza</SelectItem>
                <SelectItem value="et">Emerson Tineo</SelectItem>
                <SelectItem value="ji">Jorge Ilizarbe</SelectItem>
                <SelectItem value="ms">María Sánchez</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-center justify-between rounded-lg border border-border bg-surface-muted p-3">
            <div>
              <p className="text-sm font-medium text-foreground">Auto gestión</p>
              <p className="text-xs text-muted-foreground">
                Asignación automática de órdenes
              </p>
            </div>
            <Switch checked={autoManaged} onCheckedChange={setAutoManaged} />
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancelar
          </Button>
          <Button
            onClick={handleSave}
            disabled={!plate || !type}
            className="bg-primary hover:bg-primary-hover"
          >
            Guardar vehículo
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default NewVehicleDialog;