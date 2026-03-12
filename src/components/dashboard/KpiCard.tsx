import { LucideIcon } from "lucide-react";

interface KpiCardProps {
  label: string;
  value: string;
  icon: LucideIcon;
  delay?: number;
}

const KpiCard = ({ label, value, icon: Icon, delay = 0 }: KpiCardProps) => (
  <div
    className="group bg-white border border-border/10 rounded-3xl p-6 flex flex-col gap-4 shadow-sm hover:shadow-md transition-all duration-300 opacity-0 animate-fade-in cursor-default"
    style={{ animationDelay: `${delay}ms` }}
  >
    <div className="flex items-start justify-between">
      <div className="p-3 rounded-xl bg-primary/5 text-primary group-hover:bg-primary group-hover:text-white transition-colors duration-300">
        <Icon className="h-5 w-5" />
      </div>
    </div>

    <div className="flex flex-col">
      <span className="text-[11px] font-bold text-muted-foreground uppercase tracking-wider mb-1">{label}</span>
      <span className="text-3xl font-bold text-foreground tracking-tight tabular-nums">
        {value}
      </span>
    </div>
  </div>
);

export default KpiCard;
