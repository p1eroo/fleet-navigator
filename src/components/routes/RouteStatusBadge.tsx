import { cn } from "@/lib/utils";
import { routeStatusMeta, RouteStatus } from "@/data/routes";

const RouteStatusBadge = ({ status }: { status: RouteStatus }) => {
  const meta = routeStatusMeta[status];
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium",
        meta.className
      )}
    >
      <span className={cn("h-1.5 w-1.5 rounded-full", meta.dot)} />
      {meta.label}
    </span>
  );
};

export default RouteStatusBadge;