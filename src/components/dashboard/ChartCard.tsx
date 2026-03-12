import { LucideIcon, MoreHorizontal } from "lucide-react";

interface ChartCardProps {
  title: string;
  subtitle?: string;
  icon?: LucideIcon;
  children: React.ReactNode;
  className?: string;
  delay?: number;
}

const ChartCard = ({ title, subtitle, icon: Icon, children, className = "", delay = 0 }: ChartCardProps) => (
  <div
    className={`bg-white border border-border/10 rounded-3xl p-6 shadow-sm hover:shadow-md transition-all duration-300 opacity-0 animate-fade-in ${className}`}
    style={{ animationDelay: `${delay}ms` }}
  >
    <div className="flex items-start justify-between mb-6">
      <div className="space-y-1">
        <h3 className="text-xl font-bold text-foreground tracking-tight">{title}</h3>
        {subtitle && <p className="text-xs font-semibold text-muted-foreground/60 uppercase tracking-widest">{subtitle}</p>}
      </div>
      <div className="flex items-center gap-2">
        {Icon && (
          <div className="h-10 w-10 rounded-xl bg-primary/5 flex items-center justify-center text-primary">
            <Icon size={20} />
          </div>
        )}
        <button className="h-9 w-9 rounded-lg hover:bg-muted flex items-center justify-center text-muted-foreground transition-colors outline-none border border-border/20">
          <MoreHorizontal size={18} />
        </button>
      </div>
    </div>
    <div className="w-full">
      {children}
    </div>
  </div>
);

export default ChartCard;
