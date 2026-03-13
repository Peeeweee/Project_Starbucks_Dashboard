import { LucideIcon } from "lucide-react";

interface KpiCardProps {
  label: string;
  value: string;
  change?: string;
  positive?: boolean;
  icon: LucideIcon;
  delay?: number;
}

const KpiCard = ({
  label,
  value,
  change,
  positive = true,
  icon: Icon,
  delay = 0,
}: KpiCardProps) => (
  <div
    className="
      bg-[#fdfaf6]
      border border-[#efe8df]
      rounded-2xl
      p-6
      flex flex-col
      gap-4
      shadow-md
      hover:shadow-xl
      hover:-translate-y-1
      transition-all
      duration-300
      opacity-0
      animate-fade-in
    "
    style={{ animationDelay: `${delay}ms` }}
  >
    {/* Top Row */}
    <div className="flex items-center justify-between">
      <span className="text-sm font-semibold text-[#5b5b5b] tracking-wide">
        {label}
      </span>

      <div className="h-9 w-9 rounded-xl bg-[#006241]/10 flex items-center justify-center">
        <Icon className="h-4 w-4 text-[#006241]" />
      </div>
    </div>

    {/* Value Row */}
    <div className="flex items-end gap-3">
      <span className="text-2xl font-bold text-[#1E3932] leading-none">
        {value}
      </span>

      {change && (
        <span
          className={`
            text-xs
            font-semibold
            px-2
            py-1
            rounded-full
            ${
              positive
                ? "bg-green-100 text-green-700"
                : "bg-red-100 text-red-700"
            }
          `}
        >
          {change}
        </span>
      )}
    </div>
  </div>
);

export default KpiCard;