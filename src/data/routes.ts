export type RouteStatus =
  | "scheduled"
  | "in_progress"
  | "completed"
  | "delayed"
  | "cancelled";

export type RoutePriority = "low" | "medium" | "high";

export interface RouteStop {
  id: string;
  order: number;
  address: string;
  district: string;
  eta: string;
  status: "pending" | "delivered" | "failed";
  customer: string;
}

export interface DeliveryRoute {
  id: string;
  code: string;
  name: string;
  driver: string;
  driverAvatar?: string;
  vehiclePlate: string;
  vehicleType: string;
  zone: string;
  date: string; // YYYY-MM-DD
  startTime: string; // HH:mm
  endTime: string; // HH:mm
  status: RouteStatus;
  priority: RoutePriority;
  stopsTotal: number;
  stopsDone: number;
  distanceKm: number;
  collectedAmount: number; // Recaudación actual
  totalAmount: number; // Recaudación total esperada
  createdAt: string;
  stops: RouteStop[];
}

export const routeStatusMeta: Record<
  RouteStatus,
  { label: string; className: string; dot: string }
> = {
  scheduled: {
    label: "Programada",
    className: "bg-info-soft text-info",
    dot: "bg-info",
  },
  in_progress: {
    label: "En curso",
    className: "bg-primary-soft text-primary",
    dot: "bg-primary",
  },
  completed: {
    label: "Completada",
    className: "bg-success-soft text-success",
    dot: "bg-success",
  },
  delayed: {
    label: "Retrasada",
    className: "bg-warning-soft text-warning",
    dot: "bg-warning",
  },
  cancelled: {
    label: "Cancelada",
    className: "bg-muted text-muted-foreground",
    dot: "bg-tertiary",
  },
};

export const priorityMeta: Record<
  RoutePriority,
  { label: string; className: string }
> = {
  low: { label: "Baja", className: "bg-muted text-muted-foreground" },
  medium: { label: "Media", className: "bg-info-soft text-info" },
  high: { label: "Alta", className: "bg-primary-soft text-primary" },
};

const mkStops = (n: number, done: number, base: string): RouteStop[] =>
  Array.from({ length: n }).map((_, i) => ({
    id: `${base}-s${i + 1}`,
    order: i + 1,
    address: `Av. ${["Los Olivos", "La Marina", "Javier Prado", "Brasil", "Arequipa", "Universitaria"][i % 6]} ${100 + i * 37}`,
    district: ["Miraflores", "San Isidro", "Surco", "La Molina", "San Borja"][i % 5],
    eta: `${String(8 + Math.floor(i / 2)).padStart(2, "0")}:${i % 2 === 0 ? "15" : "45"}`,
    status: i < done ? "delivered" : "pending",
    customer: ["Acme S.A.", "Distribuidora Nor", "Mercado Central", "Café Lima", "TechStore", "Botica Salud"][i % 6],
  }));

export const routes: DeliveryRoute[] = [
  {
    id: "1",
    code: "RT-2604-001",
    name: "Lima Norte · Mañana",
    driver: "Carlos Mendoza",
    vehiclePlate: "BFS-748",
    vehicleType: "Furgón",
    zone: "Lima Norte",
    date: "2026-04-29",
    startTime: "08:00",
    endTime: "14:30",
    status: "in_progress",
    priority: "high",
    stopsTotal: 18,
    stopsDone: 11,
    distanceKm: 62.4,
    collectedAmount: 4280,
    totalAmount: 7150,
    createdAt: "2026-04-28 18:42",
    stops: mkStops(18, 11, "1"),
  },
  {
    id: "2",
    code: "RT-2604-002",
    name: "Callao · Industrial",
    driver: "Luis Paredes",
    vehiclePlate: "EFG-512",
    vehicleType: "Furgón",
    zone: "Callao",
    date: "2026-04-29",
    startTime: "07:30",
    endTime: "13:00",
    status: "delayed",
    priority: "high",
    stopsTotal: 14,
    stopsDone: 6,
    distanceKm: 48.9,
    collectedAmount: 1820,
    totalAmount: 5400,
    createdAt: "2026-04-28 17:10",
    stops: mkStops(14, 6, "2"),
  },
  {
    id: "3",
    code: "RT-2604-003",
    name: "Lima Sur · Express",
    driver: "Emerson Tineo",
    vehiclePlate: "BHT-734",
    vehicleType: "Furgón",
    zone: "Lima Sur",
    date: "2026-04-29",
    startTime: "09:00",
    endTime: "15:30",
    status: "scheduled",
    priority: "medium",
    stopsTotal: 12,
    stopsDone: 0,
    distanceKm: 41.2,
    collectedAmount: 0,
    totalAmount: 3980,
    createdAt: "2026-04-29 06:15",
    stops: mkStops(12, 0, "3"),
  },
  {
    id: "4",
    code: "RT-2504-014",
    name: "Lima Centro · Reparto",
    driver: "María Sánchez",
    vehiclePlate: "CAG-900",
    vehicleType: "Moto",
    zone: "Lima Centro",
    date: "2026-04-28",
    startTime: "08:00",
    endTime: "13:45",
    status: "completed",
    priority: "medium",
    stopsTotal: 22,
    stopsDone: 22,
    distanceKm: 34.6,
    collectedAmount: 2940,
    totalAmount: 2940,
    createdAt: "2026-04-27 19:00",
    stops: mkStops(22, 22, "4"),
  },
  {
    id: "5",
    code: "RT-2604-005",
    name: "Lima Sur · Tarde",
    driver: "Pedro Quispe",
    vehiclePlate: "GHJ-104",
    vehicleType: "Camión",
    zone: "Lima Sur",
    date: "2026-04-29",
    startTime: "13:00",
    endTime: "19:30",
    status: "scheduled",
    priority: "low",
    stopsTotal: 9,
    stopsDone: 0,
    distanceKm: 28.1,
    collectedAmount: 0,
    totalAmount: 6120,
    createdAt: "2026-04-29 07:00",
    stops: mkStops(9, 0, "5"),
  },
  {
    id: "6",
    code: "RT-2604-006",
    name: "Callao · Puerto",
    driver: "Andrea Vargas",
    vehiclePlate: "HKL-887",
    vehicleType: "Moto",
    zone: "Callao",
    date: "2026-04-29",
    startTime: "10:00",
    endTime: "16:00",
    status: "in_progress",
    priority: "medium",
    stopsTotal: 15,
    stopsDone: 4,
    distanceKm: 39.8,
    collectedAmount: 980,
    totalAmount: 4250,
    createdAt: "2026-04-29 08:30",
    stops: mkStops(15, 4, "6"),
  },
  {
    id: "7",
    code: "RT-2504-009",
    name: "Lima Norte · Express",
    driver: "Jorge Ilizarbe",
    vehiclePlate: "BKT-760",
    vehicleType: "Camión",
    zone: "Lima Norte",
    date: "2026-04-28",
    startTime: "06:00",
    endTime: "12:00",
    status: "cancelled",
    priority: "low",
    stopsTotal: 7,
    stopsDone: 0,
    distanceKm: 22.5,
    collectedAmount: 0,
    totalAmount: 1850,
    createdAt: "2026-04-27 22:00",
    stops: mkStops(7, 0, "7"),
  },
];

export const zones = ["Lima Norte", "Lima Sur", "Lima Centro", "Callao"];
export const drivers = [
  "Carlos Mendoza",
  "Luis Paredes",
  "Emerson Tineo",
  "María Sánchez",
  "Pedro Quispe",
  "Andrea Vargas",
  "Jorge Ilizarbe",
];
export const vehiclePlates = [
  "BFS-748",
  "EFG-512",
  "BHT-734",
  "CAG-900",
  "GHJ-104",
  "HKL-887",
  "BKT-760",
];