interface ChartCardProps {
  title: string;
  children: React.ReactNode;
  className?: string;
  delay?: number;
}

const ChartCard = ({ title, children, className = "", delay = 0 }: ChartCardProps) => (
  <div
    className={`bg-card border border-border rounded-lg p-5 opacity-0 animate-fade-in ${className}`}
    style={{ animationDelay: `${delay}ms` }}
  >
    <h3 className="text-sm font-medium text-foreground mb-4">{title}</h3>
    {children}
  </div>
);

export default ChartCard;
