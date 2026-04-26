import { LucideIcon } from "lucide-react";
import PageHeader from "@/components/PageHeader";

interface Props {
  title: string;
  subtitle: string;
  icon: LucideIcon;
  message?: string;
}

const Placeholder = ({ title, subtitle, icon: Icon, message }: Props) => {
  return (
    <div className="animate-fade-in">
      <PageHeader title={title} subtitle={subtitle} />
      <div className="p-4 sm:p-6 lg:p-8">
        <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-border bg-card py-20 text-center">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary-soft text-primary">
            <Icon className="h-8 w-8" />
          </div>
          <p className="mt-4 text-lg font-semibold text-foreground">
            Módulo {title}
          </p>
          <p className="mt-1 max-w-md text-sm text-muted-foreground">
            {message ?? "Esta sección estará disponible próximamente. Por ahora estamos enfocados en el módulo de Vehículos."}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Placeholder;