import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, Legend,
} from "recharts";
import PageHeader from "@/components/dashboard/PageHeader";
import ChartCard from "@/components/dashboard/ChartCard";
import { useStarbucksData } from "@/hooks/useStarbucksData";
import { Loader2, Users2, UserCircle, Map, Coffee } from "lucide-react";

const GENDER_COLORS = ["#006241", "#2E1A12", "#D4A373"];

const Demographics = () => {
  const { data: aggregates, isLoading } = useStarbucksData();

  if (isLoading || !aggregates) {
    return (
      <div className="flex h-[60vh] items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  const genderData = [
    { name: "Female", value: aggregates.genderDrink.reduce((acc, d) => acc + (d.Female || 0), 0) },
    { name: "Male", value: aggregates.genderDrink.reduce((acc, d) => acc + (d.Male || 0), 0) },
  ];

  return (
    <div className="space-y-12 pb-20">
      <div className="border-b border-border/40 pb-10">
        <PageHeader
          title="Executive Demographics"
          subtitle="Comprehensive analysis of customer segments, gender distribution, and regional penetration across the Starbucks partner network."
        />
      </div>

      <section className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <ChartCard 
          title="Age Segment Valuation" 
          subtitle="Spending Power by Group" 
          icon={Users2}
          delay={0}
        >
          <div className="h-[340px] w-full mt-4">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={aggregates.ageSpend} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="8 8" stroke="hsl(var(--chart-grid))" vertical={false} />
                <XAxis dataKey="age_group" tick={{ fontSize: 13, fontWeight: 700 }} axisLine={false} tickLine={false} dy={10} />
                <YAxis tick={{ fontSize: 13, fontWeight: 700 }} axisLine={false} tickLine={false} domain={[12, 'auto']} />
                <Tooltip 
                  contentStyle={{ backgroundColor: "hsl(var(--background))", border: "none", borderRadius: "1rem", boxShadow: "0 20px 40px -10px rgba(0,0,0,0.15)", padding: "16px" }} 
                  itemStyle={{ fontWeight: "bold", color: "hsl(var(--primary))" }}
                />
                <Bar dataKey="avg_spend" fill="hsl(var(--primary))" radius={[10, 10, 0, 0]} barSize={40} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </ChartCard>

        <ChartCard 
          title="Gender Composition" 
          subtitle="Market Share by Identity" 
          icon={UserCircle}
          delay={100}
        >
          <div className="h-[340px] w-full mt-4">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={genderData} cx="50%" cy="45%" innerRadius={80} outerRadius={115} paddingAngle={8} cornerRadius={10} dataKey="value" nameKey="name" stroke="none">
                  {genderData.map((_, i) => <Cell key={i} fill={GENDER_COLORS[i % GENDER_COLORS.length]} />)}
                </Pie>
                <Tooltip 
                  contentStyle={{ backgroundColor: "hsl(var(--background))", border: "none", borderRadius: "1rem", boxShadow: "0 20px 40px -10px rgba(0,0,0,0.15)", padding: "16px" }}
                />
                <Legend verticalAlign="bottom" iconType="circle" iconSize={10} formatter={(v) => <span className="text-foreground font-bold text-sm ml-1">{v}</span>} wrapperStyle={{ paddingTop: "30px" }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </ChartCard>
      </section>

      <section className="space-y-8">
        <div>
          <h2 className="text-2xl font-black text-foreground tracking-tighter uppercase mb-2">Segment Preferences</h2>
          <p className="text-muted-foreground text-sm font-medium">Detailed breakdown of product affinity across gender and age demographics.</p>
        </div>
        <ChartCard 
          title="Drink Affinity Matrix" 
          subtitle="Gender Preference Trends" 
          icon={Coffee}
          delay={200}
        >
          <div className="h-[380px] w-full mt-4">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={aggregates.genderDrink} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="8 8" stroke="hsl(var(--chart-grid))" vertical={false} />
                <XAxis dataKey="drink" tick={{ fontSize: 12, fontWeight: 700 }} axisLine={false} tickLine={false} dy={10} />
                <YAxis tick={{ fontSize: 13, fontWeight: 700 }} axisLine={false} tickLine={false} />
                <Tooltip 
                  contentStyle={{ backgroundColor: "hsl(var(--background))", border: "none", borderRadius: "1rem", boxShadow: "0 20px 40px -10px rgba(0,0,0,0.15)", padding: "16px" }}
                />
                <Legend verticalAlign="top" align="right" iconType="circle" iconSize={10} wrapperStyle={{ paddingBottom: "30px" }} />
                <Bar dataKey="Female" fill="hsl(159, 100%, 19%)" radius={[6, 6, 0, 0]} />
                <Bar dataKey="Male" fill="hsl(38, 46%, 56%)" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </ChartCard>
      </section>

      <section className="space-y-8">
        <div>
          <h2 className="text-2xl font-black text-foreground tracking-tighter uppercase mb-2">Regional Presence</h2>
          <p className="text-muted-foreground text-sm font-medium">Physical footprint and customer density across Urban, Suburban, and Rural markets.</p>
        </div>
        <ChartCard 
          title="Geographic Penetration" 
          subtitle="Transaction Density by Region" 
          icon={Map}
          delay={300}
        >
          <div className="h-[340px] w-full mt-4">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={aggregates.regionDist} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="8 8" stroke="hsl(var(--chart-grid))" vertical={false} />
                <XAxis dataKey="region" tick={{ fontSize: 13, fontWeight: 700 }} axisLine={false} tickLine={false} dy={10} />
                <YAxis tick={{ fontSize: 13, fontWeight: 700 }} axisLine={false} tickLine={false} />
                <Tooltip 
                  contentStyle={{ backgroundColor: "hsl(var(--background))", border: "none", borderRadius: "1rem", boxShadow: "0 20px 40px -10px rgba(0,0,0,0.15)", padding: "16px" }}
                />
                <Bar dataKey="count" fill="hsl(159, 100%, 12%)" radius={[12, 12, 0, 0]} barSize={50} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </ChartCard>
      </section>
    </div>
  );
};

export default Demographics;
