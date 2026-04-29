import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { drivers, vehiclePlates } from "@/data/routes";
import { toast } from "sonner";

interface Props {
  open: boolean;
  onOpenChange: (v: boolean) => void;
}

const NewRouteDialog = ({ open, onOpenChange }: Props) => {
  const [name, setName] = useState("");

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Ruta creada", {
      description: name || "Nueva ruta agregada al despacho.",
    });
    onOpenChange(false);
    setName("");
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[92vh] overflow-y-auto sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">Nueva ruta</DialogTitle>
          <DialogDescription>
            Asigna un conductor, vehículo y ventana de despacho.
            <span className="ml-1 text-primary">*</span>
            <span className="text-xs"> Indica que el campo es obligatorio.</span>
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={submit} className="space-y-6">
          {/* Información de usuario */}
          <div>
            <h3 className="mb-3 text-sm font-semibold text-foreground">
              Información de usuario
            </h3>
            <div className="space-y-3">
              <div>
                <Label htmlFor="name" className="text-xs">
                  Nombre de la ruta / ID de ruta
                  <span className="ml-0.5 text-primary">*</span>
                </Label>
                <Input
                  id="name"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Ej: Lima Norte · Mañana"
                  className="mt-1"
                />
              </div>
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                <div>
                  <Label className="text-xs">
                    Usuario móvil <span className="text-primary">*</span>
                  </Label>
                  <Select required>
                    <SelectTrigger className="mt-1">
                      <SelectValue placeholder="Seleccionar conductor" />
                    </SelectTrigger>
                    <SelectContent>
                      {drivers.map((d) => (
                        <SelectItem key={d} value={d}>
                          {d}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label className="text-xs">
                    Vehículo <span className="text-primary">*</span>
                  </Label>
                  <Select required>
                    <SelectTrigger className="mt-1">
                      <SelectValue placeholder="Seleccionar vehículo" />
                    </SelectTrigger>
                    <SelectContent>
                      {vehiclePlates.map((p) => (
                        <SelectItem key={p} value={p}>
                          {p}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
          </div>

          {/* Información de despacho */}
          <div>
            <h3 className="mb-3 text-sm font-semibold text-foreground">
              Información de despacho
            </h3>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              <div>
                <Label htmlFor="date" className="text-xs">
                  Fecha despacho <span className="text-primary">*</span>
                </Label>
                <Input id="date" type="date" required className="mt-1" />
              </div>
              <div>
                <Label htmlFor="start" className="text-xs">
                  Hora inicio <span className="text-primary">*</span>
                </Label>
                <Input
                  id="start"
                  type="time"
                  defaultValue="09:00"
                  required
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="endDate" className="text-xs">
                  Fecha máxima de entrega
                </Label>
                <Input
                  id="endDate"
                  type="time"
                  defaultValue="21:00"
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="minTime" className="text-xs">
                  Tiempo mínimo entre entregas (min)
                </Label>
                <Input
                  id="minTime"
                  type="number"
                  defaultValue={20}
                  min={1}
                  className="mt-1"
                />
              </div>
            </div>
          </div>

          <DialogFooter className="gap-2 sm:gap-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
            >
              Cancelar
            </Button>
            <Button
              type="submit"
              className="bg-primary shadow-glow hover:bg-primary-hover"
            >
              Guardar ruta
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default NewRouteDialog;