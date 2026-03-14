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
  const { 
    data: aggregates, 
    isLoading, 
    isRawLoading, 
    isRawError, 
    rawError, 
    isError, 
    error 
  } = useStarbucksData();

  if (isRawError || isError) {
    return (
      <div className="flex h-[60vh] flex-col items-center justify-center space-y-4">
        <p className="text-destructive font-bold text-xl">Error loading data</p>
        <p className="text-muted-foreground text-sm">
          {(rawError as any)?.message || (error as any)?.message || 'There was a problem loading the analytics data.'}
        </p>
        <button 
          onClick={() => window.location.reload()}
          className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors text-sm font-bold"
        >
          Retry
        </button>
      </div>
    );
  }

  if (isRawLoading || isLoading || !aggregates) {
    return (
      <div className="flex h-[60vh] flex-col items-center justify-center space-y-4">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
        <p className="text-muted-foreground animate-pulse font-medium">
          {isRawLoading ? 'Loading raw customer data...' : 'Processing analytics...'}
        </p>
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
          title="Who is Buying Starbucks?"
          subtitle="A simple guide to our customers: where they live and what they like."
        />
      </div>

      <section className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <ChartCard 
          title="Spending by Age" 
          subtitle="How much each age group spends" 
          icon={Users2}
          delay={0}
        >
          <div className="h-[450px] w-full mt-4">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={aggregates.ageSpend} margin={{ top: 20, right: 20, left: 20, bottom: 20 }}>
                <CartesianGrid strokeDasharray="8 8" stroke="hsl(var(--chart-grid))" vertical={false} />
                <XAxis dataKey="age_group" tick={{ fontSize: 13, fontWeight: 700 }} axisLine={false} tickLine={false} interval={0} dy={10} />
                <YAxis tick={{ fontSize: 13, fontWeight: 700 }} axisLine={false} tickLine={false} width={70} domain={[13.5, 'auto']} tickFormatter={(v) => `$${v.toFixed(1)}`} />
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
          title="Customer Gender" 
          subtitle="How many men and women visit us" 
          icon={UserCircle}
          delay={100}
        >
          <div className="h-[450px] w-full mt-4">
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
          <h2 className="text-2xl font-black text-foreground tracking-tighter uppercase mb-2">What Different People Like</h2>
          <p className="text-muted-foreground text-sm font-medium">See which drinks different groups of people prefer.</p>
        </div>
        <ChartCard 
          title="Favorite Drinks by Group" 
          subtitle="What men and women like to drink" 
          icon={Coffee}
          delay={200}
        >
          <div className="h-[500px] w-full mt-4">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={aggregates.genderDrink} margin={{ top: 20, right: 20, left: 20, bottom: 20 }}>
                <CartesianGrid strokeDasharray="8 8" stroke="hsl(var(--chart-grid))" vertical={false} />
                <XAxis dataKey="drink" tick={{ fontSize: 11, fontWeight: 700 }} axisLine={false} tickLine={false} interval={0} height={60} dy={10} />
                <YAxis tick={{ fontSize: 13, fontWeight: 700 }} axisLine={false} tickLine={false} width={70} tickFormatter={(v) => `${(v / 1000).toFixed(1)}k`} />
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
          <h2 className="text-2xl font-black text-foreground tracking-tighter uppercase mb-2">Starbucks Around the Map</h2>
          <p className="text-muted-foreground text-sm font-medium">Where Starbucks stores are located and how many people visit them.</p>
        </div>
        <ChartCard 
          title="Orders by Region" 
          subtitle="How many orders we get in each area" 
          icon={Map}
          delay={300}
        >
          <div className="h-[450px] w-full mt-4">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={aggregates.regionDist} margin={{ top: 20, right: 20, left: 20, bottom: 20 }}>
                <CartesianGrid strokeDasharray="8 8" stroke="hsl(var(--chart-grid))" vertical={false} />
                <XAxis dataKey="region" tick={{ fontSize: 13, fontWeight: 700 }} axisLine={false} tickLine={false} interval={0} dy={10} />
                <YAxis tick={{ fontSize: 13, fontWeight: 700 }} axisLine={false} tickLine={false} width={70} tickFormatter={(v) => `${(v / 1000).toFixed(1)}k`} />
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
