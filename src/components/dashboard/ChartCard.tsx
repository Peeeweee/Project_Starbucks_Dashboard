interface ChartCardProps {
  title: string;
  children: React.ReactNode;
  className?: string;
  delay?: number;
}

const ChartCard = ({
  title,
  children,
  className = "",
  delay = 0,
}: ChartCardProps) => (
  <div
    className={`
      bg-[#fdfaf6]
      border border-[#efe8df]
      rounded-2xl
      p-6
      shadow-md
      hover:shadow-xl
      hover:-translate-y-1
      transition-all
      duration-300
      opacity-0
      animate-fade-in
      ${className}
    `}
    style={{ animationDelay: `${delay}ms` }}
  >
    <h3 className="text-sm font-semibold text-[#1E3932] mb-5 tracking-wide">
      {title}
    </h3>

    {children}
  </div>
);

export default ChartCard;