interface PageHeaderProps {
  title: string;
  subtitle: string;
}

const PageHeader = ({ title, subtitle }: PageHeaderProps) => (
  <div className="mb-8">

    {/* Accent Line */}
    <div className="h-1 w-12 bg-[#006241] rounded-full mb-4" />

    {/* Title */}
    <h1 className="text-2xl font-bold text-[#1E3932] tracking-tight">
      {title}
    </h1>

    {/* Subtitle */}
    <p className="text-sm text-[#5b5b5b] mt-2 max-w-2xl leading-relaxed">
      {subtitle}
    </p>

  </div>
);

export default PageHeader;