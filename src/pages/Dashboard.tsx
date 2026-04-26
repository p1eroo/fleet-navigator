import { Truck, Package, Route, Users, TrendingUp } from "lucide-react";
import PageHeader from "@/components/PageHeader";
import StatCard from "@/components/StatCard";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const Dashboard = () => {
  return (
    <div className="animate-fade-in">
      <PageHeader
        title="Dashboard"
        subtitle="Resumen operativo de tu flota y entregas en tiempo real."
      />
      <div className="space-y-6 p-4 sm:p-6 lg:p-8">
        <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
          <StatCard label="Vehículos activos" value={6} delta="+12% vs ayer" icon={Truck} tone="primary" />
          <StatCard label="Órdenes hoy" value={142} delta="+8 últimas 1h" icon={Package} tone="info" />
          <StatCard label="Rutas activas" value={9} icon={Route} tone="success" />
          <StatCard label="Conductores" value={12} icon={Users} tone="warning" />
        </div>

        <div className="rounded-xl border border-border bg-gradient-dark p-6 text-white shadow-md sm:p-8">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-start gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary shadow-glow">
                <TrendingUp className="h-6 w-6 text-primary-foreground" />
              </div>
              <div>
                <h2 className="text-xl font-bold">Tu flota está funcionando al 87%</h2>
                <p className="mt-1 max-w-lg text-sm text-white/70">
                  Optimiza la asignación de rutas y reduce tiempos de entrega gestionando tus vehículos desde un solo lugar.
                </p>
              </div>
            </div>
            <Link to="/vehiculos">
              <Button className="bg-primary hover:bg-primary-hover">
                Ir a Vehículos
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;