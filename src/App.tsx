import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Route as RouteIcon, Package, MapPin, Users } from "lucide-react";
import AppLayout from "@/components/layout/AppLayout";
import Index from "./pages/Index.tsx";
import Vehiculos from "./pages/Vehiculos.tsx";
import Placeholder from "./pages/Placeholder.tsx";
import NotFound from "./pages/NotFound.tsx";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route element={<AppLayout />}>
            <Route path="/" element={<Index />} />
            <Route path="/vehiculos" element={<Vehiculos />} />
            <Route
              path="/rutas"
              element={
                <Placeholder
                  title="Rutas"
                  subtitle="Planifica y monitorea las rutas de entrega."
                  icon={RouteIcon}
                />
              }
            />
            <Route
              path="/ordenes"
              element={
                <Placeholder
                  title="Órdenes"
                  subtitle="Gestiona órdenes de entrega y su estado."
                  icon={Package}
                />
              }
            />
            <Route
              path="/flota"
              element={
                <Placeholder
                  title="Flota en vivo"
                  subtitle="Visualiza la ubicación de tus vehículos en tiempo real."
                  icon={MapPin}
                />
              }
            />
            <Route
              path="/usuarios"
              element={
                <Placeholder
                  title="Usuarios móviles"
                  subtitle="Administra a tus conductores y personal en campo."
                  icon={Users}
                />
              }
            />
          </Route>
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
