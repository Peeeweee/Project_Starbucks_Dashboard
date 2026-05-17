import PageHeader from "@/components/dashboard/PageHeader";
import { Coffee, Code, Book, Users2, Database, ExternalLink } from "lucide-react";

const developers = [
  {
    name: "Kent Paulo Delgado",
    role: "Developer",
    // Use relative paths that Vite will process correctly or use the base URL
    image: "developers/Delgado_K.jpg",
  },
  {
    name: "Earl Josh Delgado",
    role: "Developer",
    image: "developers/Delgado_E.jpg",
  },
  {
    name: "John Renan Labay",
    role: "Developer",
    image: "developers/Labay.jpg",
  },
  {
    name: "CYmon Earl Galzote",
    role: "Developer",
    image: "developers/Galzote.jpg",
  },
];

const techStack = [
  { name: "React 18", category: "Framework" },
  { name: "Vite", category: "Build Tool" },
  { name: "TypeScript", category: "Language" },
  { name: "Python", category: "EDA / Analysis" },
  { name: "TailwindCSS", category: "Styling" },
  { name: "Recharts", category: "Visualization" },
  { name: "Lucide React", category: "Iconography" },
  { name: "TanStack Query", category: "Data Sync" },
  { name: "PapaParse", category: "CSV Parser" },
];

const About = () => {
  const baseUrl = import.meta.env.BASE_URL.replace(/\/$/, "");

  return (
    <div className="space-y-16 pb-32">
      <div className="border-b border-border/20 pb-12">
        <PageHeader 
          title="About the Project" 
          subtitle="Learn more about the creators and the technology behind the Starbucks Customer Analytics Dashboard." 
        />
      </div>

      {/* Developer Section */}
      <section className="space-y-10">
        <div className="flex items-center gap-4">
          <div className="h-10 w-1.5 bg-primary rounded-full" />
          <h2 className="text-2xl font-bold text-foreground tracking-tight flex items-center gap-2">
            <Users2 className="text-primary h-6 w-6" /> The Development Team
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {developers.map((dev, i) => (
            <div 
              key={dev.name} 
              className="group relative bg-white border border-border/40 rounded-3xl p-6 overflow-hidden transition-all duration-300 hover:shadow-2xl hover:shadow-primary/5 hover:-translate-y-2 opacity-0 animate-fade-in"
              style={{ animationDelay: `${i * 150}ms`, animationFillMode: 'forwards' }}
            >
              <div className="relative aspect-square mb-6 overflow-hidden rounded-2xl bg-[#F4F1EA]">
                <img 
                  src={`${baseUrl}/${dev.image}`} 
                  alt={dev.name} 
                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 scale-105 group-hover:scale-100"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    console.error("Image load error for:", target.src);
                    target.src = "https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=2070&auto=format&fit=crop";
                  }}
                />
              </div>
              <div className="space-y-1 text-center">
                <p className="text-xl font-black text-[#002B1B] leading-tight">{dev.name}</p>
                <p className="text-sm font-bold text-emerald-600/60 uppercase tracking-widest">{dev.role}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Academic Info */}
      <section className="bg-[#002B1B] rounded-[32px] p-12 text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/10 blur-[80px] rounded-full -mr-20 -mt-20" />
        <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 rounded-full border border-white/10">
              <Book className="h-4 w-4 text-emerald-400" />
              <span className="text-xs font-black tracking-[0.2em] uppercase">Academic Context</span>
            </div>
            <h3 className="text-4xl font-black tracking-tighter">BSCS 3A Students</h3>
            <p className="text-emerald-100/60 text-lg font-medium leading-relaxed max-w-md">
              This dashboard was developed as a final requirement for the subject CSDS 327 - Data Visualization, focusing on creating professional, data-driven executive interfaces.
            </p>
          </div>
          <div className="bg-white/5 border border-white/10 rounded-2xl p-8 backdrop-blur-xl">
            <div className="space-y-4">
              <div className="flex items-center justify-between text-sm">
                <span className="text-emerald-100/40">Subject</span>
                <span className="font-bold">CSDS 327</span>
              </div>
              <div className="h-px bg-white/10" />
              <div className="flex items-center justify-between text-sm">
                <span className="text-emerald-100/40">Course</span>
                <span className="font-bold">BS Computer Science</span>
              </div>
              <div className="h-px bg-white/10" />
              <div className="flex items-center justify-between text-sm">
                <span className="text-emerald-100/40">Year & Section</span>
                <span className="font-bold">3A</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Dataset Info Section */}
      <section className="space-y-10">
        <div className="flex items-center gap-4">
          <div className="h-10 w-1.5 bg-primary rounded-full" />
          <h2 className="text-2xl font-bold text-foreground tracking-tight flex items-center gap-2">
            <Database className="text-primary h-6 w-6" /> Dataset Information
          </h2>
        </div>

        <div className="bg-white border border-border/40 rounded-[32px] p-8 md:p-12 shadow-sm relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity">
            <Database className="w-32 h-32 text-primary rotate-12" />
          </div>
          
          <div className="relative z-10 space-y-8">
            <div className="space-y-4">
              <h3 className="text-3xl font-black text-[#002B1B] leading-tight">Starbucks Customer Ordering Patterns</h3>
              <p className="text-muted-foreground text-lg font-medium leading-relaxed max-w-3xl">
                This study utilizes a comprehensive simulation of Starbucks customer ordering patterns across 100,000 transactions, bridging the gap between digital and physical retail channels over a two-year period (2024-2025). It captures the "Digital Venti Effect"—where mobile app users demonstrate higher average order values and more frequent customizations.
              </p>
            </div>

            <div className="flex flex-wrap gap-4 pt-4">
              <a 
                href="https://www.kaggle.com/datasets/likithagedipudi/starbucks-customer-ordering-patterns" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 bg-[#006241] text-white rounded-2xl font-bold hover:bg-[#004d33] transition-all active:scale-95 shadow-lg shadow-[#006241]/20 border-none"
              >
                View on Kaggle
                <ExternalLink className="h-4 w-4" />
              </a>
              <div className="px-6 py-3 bg-muted/30 rounded-2xl font-bold text-muted-foreground">
                License: CC0: Public Domain
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Tech Stack Section */}
      <section className="space-y-10">
        <div className="flex items-center gap-4">
          <div className="h-10 w-1.5 bg-primary rounded-full" />
          <h2 className="text-2xl font-bold text-foreground tracking-tight flex items-center gap-2">
            <Code className="text-primary h-6 w-6" /> Tech Stack
          </h2>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {techStack.map((tech) => (
            <div 
              key={tech.name}
              className="bg-white border border-border/40 rounded-2xl p-5 hover:border-primary/40 hover:bg-primary/[0.02] transition-colors"
            >
              <p className="text-[10px] font-black text-primary uppercase tracking-widest mb-1">{tech.category}</p>
              <p className="text-lg font-bold text-foreground">{tech.name}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Credits */}
      <footer className="text-center pt-8 border-t border-border/20">
        <div className="flex items-center justify-center gap-2 text-muted-foreground font-medium">
          <span>Made with</span>
          <Coffee className="h-4 w-4 text-[#006241]" />
          <span>for Data Visualization</span>
        </div>
      </footer>
    </div>
  );
};

export default About;
