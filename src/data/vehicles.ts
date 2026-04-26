export type VehicleStatus = "active" | "in_route" | "maintenance" | "inactive";
export type VehicleType = "Furgón" | "Camión" | "Moto" | "Camioneta";

export interface Vehicle {
  id: string;
  plate: string;
  type: VehicleType;
  group: string;
  driver: string | null;
  status: VehicleStatus;
  capacityKg: number;
  loadPct: number;
  lastService: string;
  createdAt: string;
  autoManaged: boolean;
}

export const statusMeta: Record<VehicleStatus, { label: string; className: string; dot: string }> = {
  active: {
    label: "Activo",
    className: "bg-success-soft text-success",
    dot: "bg-success",
  },
  in_route: {
    label: "En ruta",
    className: "bg-info-soft text-info",
    dot: "bg-info",
  },
  maintenance: {
    label: "Mantenimiento",
    className: "bg-warning-soft text-warning",
    dot: "bg-warning",
  },
  inactive: {
    label: "Inactivo",
    className: "bg-muted text-muted-foreground",
    dot: "bg-tertiary",
  },
};

export const vehicles: Vehicle[] = [
  {
    id: "1",
    plate: "BFS-748",
    type: "Furgón",
    group: "Lima Norte",
    driver: "Carlos Mendoza",
    status: "in_route",
    capacityKg: 1500,
    loadPct: 72,
    lastService: "12/03/2026",
    createdAt: "02/03/2026 12:31",
    autoManaged: true,
  },
  {
    id: "2",
    plate: "BHT-734",
    type: "Furgón",
    group: "Lima Sur",
    driver: "Emerson Tineo",
    status: "active",
    capacityKg: 1200,
    loadPct: 35,
    lastService: "20/02/2026",
    createdAt: "19/11/2025 12:45",
    autoManaged: false,
  },
  {
    id: "3",
    plate: "BKT-760",
    type: "Camión",
    group: "Callao",
    driver: "Jorge Ilizarbe",
    status: "maintenance",
    capacityKg: 3500,
    loadPct: 0,
    lastService: "01/04/2026",
    createdAt: "02/03/2026 12:30",
    autoManaged: true,
  },
  {
    id: "4",
    plate: "CAG-900",
    type: "Moto",
    group: "Lima Centro",
    driver: "María Sánchez",
    status: "active",
    capacityKg: 80,
    loadPct: 50,
    lastService: "15/03/2026",
    createdAt: "18/11/2025 18:32",
    autoManaged: false,
  },
  {
    id: "5",
    plate: "DVR-221",
    type: "Camioneta",
    group: "Lima Norte",
    driver: null,
    status: "inactive",
    capacityKg: 900,
    loadPct: 0,
    lastService: "08/01/2026",
    createdAt: "10/01/2026 09:10",
    autoManaged: false,
  },
  {
    id: "6",
    plate: "EFG-512",
    type: "Furgón",
    group: "Callao",
    driver: "Luis Paredes",
    status: "in_route",
    capacityKg: 1500,
    loadPct: 88,
    lastService: "22/03/2026",
    createdAt: "22/03/2026 08:00",
    autoManaged: true,
  },
  {
    id: "7",
    plate: "GHJ-104",
    type: "Camión",
    group: "Lima Sur",
    driver: "Pedro Quispe",
    status: "active",
    capacityKg: 4200,
    loadPct: 60,
    lastService: "30/03/2026",
    createdAt: "30/03/2026 14:20",
    autoManaged: true,
  },
  {
    id: "8",
    plate: "HKL-887",
    type: "Moto",
    group: "Lima Centro",
    driver: "Andrea Vargas",
    status: "active",
    capacityKg: 100,
    loadPct: 25,
    lastService: "11/03/2026",
    createdAt: "11/03/2026 10:00",
    autoManaged: false,
  },
];