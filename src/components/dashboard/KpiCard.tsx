import { LucideIcon } from "lucide-react";

interface KpiCardProps {
  label: string;
  value: string;
  change?: string;
  positive?: boolean;
  icon: LucideIcon;
  delay?: number;
}

const KpiCard = ({ label, value, change, positive = true, icon: Icon, delay = 0 }: KpiCardProps) => (
  <div
    className="bg-card border border-border rounded-lg p-5 flex flex-col gap-3 opacity-0 animate-fade-in"
    style={{ animationDelay: `${delay}ms` }}
  >
    <div className="flex items-center justify-between">
      <span className="text-sm font-medium text-muted-foreground">{label}</span>
      <Icon className="h-4 w-4 text-muted-foreground" />
    </div>
    <div className="flex items-end gap-2">
      <span className="text-2xl font-semibold text-foreground leading-none">{value}</span>
      {change && (
        <span className={`text-xs font-medium ${positive ? "text-kpi-positive" : "text-kpi-negative"}`}>
          {change}
        </span>
      )}
    </div>
  </div>
);

export default KpiCard;
