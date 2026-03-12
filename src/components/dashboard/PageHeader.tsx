interface PageHeaderProps {
  title: string;
  subtitle: string;
  className?: string;
}

const PageHeader = ({ title, subtitle, className = "" }: PageHeaderProps) => (
  <div className={`animate-fade-in ${className}`}>
    <h1 className="text-3xl md:text-4xl lg:text-5xl font-black text-foreground tracking-tighter mb-4 uppercase">
      {title}
    </h1>
    <div className="flex items-start gap-4">
      <div className="h-1.5 w-12 bg-primary rounded-full mt-2.5 shrink-0" />
      <p className="text-sm md:text-base font-medium text-muted-foreground/80 leading-relaxed max-w-3xl">
        {subtitle}
      </p>
    </div>
  </div>
);

export default PageHeader;
