import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import {
  CheckCircle2,
  Circle,
  Truck,
  Package,
  MapPin,
  Phone,
  User,
  Calendar,
  Clock,
  FileCheck2,
  Camera,
  Download,
  Share2,
  ArrowLeft,
  ShieldCheck,
  Navigation,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

type EventStatus = "done" | "current" | "pending";

interface TimelineEvent {
  title: string;
  subtitle?: string;
  date: string;
  status: EventStatus;
}

const events: TimelineEvent[] = [
  {
    title: "Entrega exitosa",
    subtitle: "Recepcionado conforme",
    date: "12/12/2025 20:01",
    status: "done",
  },
  { title: "En ruta", date: "12/12/2025 15:12", status: "done" },
  { title: "Asignado a vehículo", date: "12/12/2025 15:07", status: "done" },
  {
    title: "Entrega exitosa",
    subtitle: "Recepcionado conforme",
    date: "20/11/2025 14:41",
    status: "done",
  },
  { title: "En ruta", date: "19/11/2025 06:31", status: "done" },
  { title: "Asignado a vehículo", date: "18/11/2025 19:14", status: "done" },
  { title: "Ingresado a sistema", date: "18/11/2025 19:14", status: "done" },
];

const SeguimientoOrden = () => {
  const { orderId = "627133" } = useParams();
  const [tab, setTab] = useState<"info" | "prueba">("info");

  return (
    <div className="min-h-screen bg-surface-muted">
      {/* Topbar cliente */}
      <header className="sticky top-0 z-30 border-b border-border bg-surface/80 backdrop-blur-md">
        <div className="mx-auto flex h-14 max-w-[1600px] items-center justify-between px-4 sm:px-6">
          <div className="flex items-center gap-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-primary shadow-glow">
              <Truck className="h-4 w-4 text-primary-foreground" />
            </div>
            <div className="leading-tight">
              <p className="text-sm font-bold text-foreground">FleetOps</p>
              <p className="text-[10px] uppercase tracking-wider text-muted-foreground">
                Seguimiento de pedido
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm" asChild className="hidden sm:inline-flex">
              <Link to="/">
                <ArrowLeft className="mr-1 h-4 w-4" /> Volver al panel
              </Link>
            </Button>
            <Button variant="outline" size="sm">
              <Share2 className="mr-1 h-4 w-4" /> Compartir
            </Button>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-[1600px] p-4 sm:p-6 lg:p-8">
        {/* Hero estado */}
        <div className="mb-6 overflow-hidden rounded-2xl border border-border bg-gradient-to-br from-success/10 via-surface to-surface shadow-sm">
          <div className="flex flex-col gap-4 p-5 sm:flex-row sm:items-center sm:justify-between sm:p-6">
            <div className="flex items-center gap-4">
              <div className="relative">
                <div className="absolute inset-0 animate-ping rounded-full bg-success/30" />
                <div className="relative flex h-12 w-12 items-center justify-center rounded-full bg-success text-success-foreground shadow-md">
                  <CheckCircle2 className="h-6 w-6" />
                </div>
              </div>
              <div>
                <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                  Orden #{orderId}
                </p>
                <h1 className="text-2xl font-bold text-foreground sm:text-3xl">
                  Entrega exitosa
                </h1>
                <p className="mt-1 text-sm text-muted-foreground">
                  Tu paquete fue entregado el 12 de Diciembre, 20:01
                </p>
              </div>
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-success-soft px-3 py-1.5 text-xs font-semibold text-success">
                <ShieldCheck className="h-3.5 w-3.5" /> Entregado
              </span>
              <Button size="sm" variant="outline">
                <Download className="mr-1 h-4 w-4" /> Comprobante
              </Button>
            </div>
          </div>

          {/* Stepper compacto */}
          <div className="border-t border-border bg-surface-muted/50 px-5 py-4 sm:px-6">
            <div className="grid grid-cols-4 gap-2">
              {[
                { label: "Ingresado", icon: FileCheck2 },
                { label: "Asignado", icon: User },
                { label: "En ruta", icon: Truck },
                { label: "Entregado", icon: CheckCircle2 },
              ].map((step, i, arr) => (
                <div key={step.label} className="flex items-center">
                  <div className="flex flex-col items-center gap-1.5">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-success text-success-foreground">
                      <step.icon className="h-4 w-4" />
                    </div>
                    <span className="text-[11px] font-medium text-foreground sm:text-xs">
                      {step.label}
                    </span>
                  </div>
                  {i < arr.length - 1 && (
                    <div className="mx-1 mb-5 h-[2px] flex-1 rounded-full bg-success" />
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)]">
          {/* Columna izquierda: timeline + info */}
          <section className="space-y-6">
            {/* Timeline */}
            <div className="rounded-2xl border border-border bg-surface p-5 shadow-sm sm:p-6">
              <h2 className="mb-5 text-base font-semibold text-foreground">
                Historial de la entrega
              </h2>
              <ol className="relative">
                {events.map((ev, i) => (
                  <li key={i} className="flex gap-4 pb-5 last:pb-0">
                    <div className="relative flex flex-col items-center">
                      <div
                        className={cn(
                          "z-10 flex h-7 w-7 shrink-0 items-center justify-center rounded-full ring-4 ring-surface",
                          ev.status === "done"
                            ? "bg-success text-success-foreground"
                            : ev.status === "current"
                            ? "bg-primary text-primary-foreground"
                            : "bg-muted text-muted-foreground"
                        )}
                      >
                        {ev.status === "pending" ? (
                          <Circle className="h-3.5 w-3.5" />
                        ) : (
                          <CheckCircle2 className="h-4 w-4" />
                        )}
                      </div>
                      {i < events.length - 1 && (
                        <span
                          className={cn(
                            "absolute top-7 h-full w-[2px]",
                            ev.status === "done" ? "bg-success/40" : "bg-border"
                          )}
                        />
                      )}
                    </div>
                    <div className="flex flex-1 items-start justify-between gap-3 pt-0.5">
                      <div>
                        <p className="text-sm font-semibold text-foreground">
                          {ev.title}
                        </p>
                        {ev.subtitle && (
                          <p className="text-xs text-muted-foreground">
                            {ev.subtitle}
                          </p>
                        )}
                      </div>
                      <span className="shrink-0 text-xs font-medium tabular-nums text-muted-foreground">
                        {ev.date}
                      </span>
                    </div>
                  </li>
                ))}
              </ol>
            </div>

            {/* Tabs */}
            <div className="rounded-2xl border border-border bg-surface shadow-sm">
              <div className="grid grid-cols-2 gap-1 border-b border-border bg-surface-muted p-1">
                {(
                  [
                    { id: "info", label: "Información" },
                    { id: "prueba", label: "Prueba de entrega" },
                  ] as const
                ).map((t) => (
                  <button
                    key={t.id}
                    onClick={() => setTab(t.id)}
                    className={cn(
                      "rounded-lg px-4 py-2.5 text-sm font-medium transition-all",
                      tab === t.id
                        ? "bg-surface text-foreground shadow-sm"
                        : "text-muted-foreground hover:text-foreground"
                    )}
                  >
                    {t.label}
                  </button>
                ))}
              </div>

              <div className="p-5 sm:p-6">
                {tab === "info" ? (
                  <div className="space-y-4">
                    <h3 className="text-base font-semibold text-foreground">
                      Información
                    </h3>
                    <dl className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                      <InfoRow icon={Package} label="Orden" value={`#${orderId}`} />
                      <InfoRow
                        icon={Calendar}
                        label="Pedido el"
                        value="18 de Noviembre de 2025"
                      />
                      <InfoRow
                        icon={User}
                        label="Destinatario"
                        value="María Fernández"
                      />
                      <InfoRow icon={Phone} label="Teléfono" value="+51 987 654 321" />
                      <InfoRow
                        icon={MapPin}
                        label="Dirección"
                        value="Av. La Marina 2450, San Miguel"
                      />
                      <InfoRow
                        icon={Truck}
                        label="Vehículo"
                        value="BFS-748 · Furgón"
                      />
                      <InfoRow
                        icon={User}
                        label="Conductor"
                        value="Carlos Mendoza"
                      />
                      <InfoRow
                        icon={Clock}
                        label="Tiempo total"
                        value="24 días · 10 paradas"
                      />
                    </dl>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <h3 className="text-base font-semibold text-foreground">
                      Prueba de entrega
                    </h3>
                    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                      {[1, 2, 3].map((n) => (
                        <div
                          key={n}
                          className="group relative aspect-square overflow-hidden rounded-xl border border-border bg-gradient-to-br from-muted to-surface-muted"
                        >
                          <div className="absolute inset-0 flex items-center justify-center text-muted-foreground">
                            <Camera className="h-8 w-8" />
                          </div>
                          <span className="absolute bottom-2 left-2 rounded-md bg-black/60 px-2 py-0.5 text-[10px] font-medium text-white">
                            Foto {n}
                          </span>
                        </div>
                      ))}
                    </div>
                    <div className="rounded-xl border border-border bg-surface-muted p-4">
                      <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                        Firma del receptor
                      </p>
                      <p className="mt-1 font-signature text-2xl italic text-foreground">
                        María F.
                      </p>
                      <p className="mt-2 text-xs text-muted-foreground">
                        DNI: 4*****12 · Recepcionado conforme
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </section>

          {/* Columna derecha: mapa */}
          <section className="lg:sticky lg:top-20 lg:h-[calc(100vh-7rem)]">
            <div className="relative h-[420px] overflow-hidden rounded-2xl border border-border bg-surface shadow-sm sm:h-[520px] lg:h-full">
              {/* Mapa stylized */}
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,hsl(var(--info)/0.08),transparent_50%),radial-gradient(circle_at_80%_70%,hsl(var(--success)/0.08),transparent_50%)]">
                <svg
                  viewBox="0 0 600 600"
                  className="absolute inset-0 h-full w-full"
                  preserveAspectRatio="xMidYMid slice"
                >
                  {/* Terreno */}
                  <defs>
                    <pattern
                      id="grid"
                      width="40"
                      height="40"
                      patternUnits="userSpaceOnUse"
                    >
                      <path
                        d="M 40 0 L 0 0 0 40"
                        fill="none"
                        stroke="hsl(var(--border))"
                        strokeWidth="0.5"
                      />
                    </pattern>
                  </defs>
                  <rect width="600" height="600" fill="url(#grid)" />
                  {/* Río */}
                  <path
                    d="M 0 180 Q 150 120, 300 200 T 600 160"
                    fill="none"
                    stroke="hsl(var(--info) / 0.5)"
                    strokeWidth="6"
                    strokeLinecap="round"
                  />
                  <path
                    d="M 0 180 Q 150 120, 300 200 T 600 160"
                    fill="none"
                    stroke="hsl(var(--info))"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeDasharray="4 6"
                  />
                  {/* Carreteras */}
                  <path
                    d="M 60 540 Q 200 400, 280 360 T 540 250"
                    fill="none"
                    stroke="hsl(var(--muted-foreground) / 0.3)"
                    strokeWidth="3"
                    strokeLinecap="round"
                  />
                  <path
                    d="M 100 100 L 250 250 L 350 320 L 470 380"
                    fill="none"
                    stroke="hsl(var(--muted-foreground) / 0.25)"
                    strokeWidth="2"
                  />
                  {/* Áreas verdes */}
                  <ellipse
                    cx="120"
                    cy="450"
                    rx="80"
                    ry="50"
                    fill="hsl(var(--success) / 0.12)"
                  />
                  <ellipse
                    cx="500"
                    cy="500"
                    rx="100"
                    ry="60"
                    fill="hsl(var(--success) / 0.1)"
                  />
                  {/* Ruta recorrida */}
                  <path
                    d="M 120 480 Q 220 380, 300 340 T 420 300"
                    fill="none"
                    stroke="hsl(var(--primary))"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeDasharray="2 6"
                  />
                </svg>

                {/* Pin destino */}
                <div className="absolute left-[68%] top-[48%] -translate-x-1/2 -translate-y-full">
                  <div className="relative">
                    <div className="absolute inset-0 animate-ping rounded-full bg-primary/30" />
                    <div className="relative flex h-10 w-10 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg ring-4 ring-surface">
                      <CheckCircle2 className="h-5 w-5" />
                    </div>
                    <div className="absolute left-1/2 top-full h-3 w-[2px] -translate-x-1/2 bg-primary" />
                  </div>
                </div>

                {/* Pin origen */}
                <div className="absolute left-[20%] top-[80%] -translate-x-1/2 -translate-y-full">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-surface text-foreground shadow-md ring-2 ring-border">
                    <Package className="h-4 w-4" />
                  </div>
                </div>
              </div>

              {/* Card flotante */}
              <div className="absolute left-4 right-4 top-4 rounded-xl border border-border bg-surface/95 p-3 shadow-md backdrop-blur sm:left-5 sm:right-auto sm:top-5 sm:max-w-xs">
                <div className="flex items-center gap-2.5">
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary-soft text-primary">
                    <Navigation className="h-4 w-4" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                      Punto de entrega
                    </p>
                    <p className="truncate text-sm font-semibold text-foreground">
                      Av. La Marina 2450
                    </p>
                    <p className="truncate text-xs text-muted-foreground">
                      San Miguel, Lima
                    </p>
                  </div>
                </div>
              </div>

              {/* Controles mock */}
              <div className="absolute right-4 top-4 flex flex-col gap-1 rounded-lg border border-border bg-surface shadow-sm">
                <button className="px-2.5 py-1.5 text-lg font-semibold text-foreground hover:bg-muted">
                  +
                </button>
                <div className="h-px bg-border" />
                <button className="px-2.5 py-1.5 text-lg font-semibold text-foreground hover:bg-muted">
                  −
                </button>
              </div>

              {/* Footer mapa */}
              <div className="absolute bottom-3 right-3 rounded-md bg-surface/90 px-2 py-1 text-[10px] text-muted-foreground backdrop-blur">
                FleetOps Maps · © 2026
              </div>
            </div>
          </section>
        </div>

        <p className="mt-6 text-center text-xs text-muted-foreground">
          ¿Necesitas ayuda con tu pedido?{" "}
          <a href="#" className="font-semibold text-primary hover:underline">
            Contactar soporte
          </a>
        </p>
      </main>
    </div>
  );
};

const InfoRow = ({
  icon: Icon,
  label,
  value,
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  value: string;
}) => (
  <div className="flex items-start gap-3 rounded-lg border border-border bg-surface-muted/50 p-3">
    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-surface text-muted-foreground">
      <Icon className="h-4 w-4" />
    </div>
    <div className="min-w-0">
      <p className="text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
        {label}
      </p>
      <p className="truncate text-sm font-semibold text-foreground">{value}</p>
    </div>
  </div>
);

export default SeguimientoOrden;