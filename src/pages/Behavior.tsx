import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend,
} from "recharts";
import PageHeader from "@/components/dashboard/PageHeader";
import ChartCard from "@/components/dashboard/ChartCard";
import { useStarbucksData } from "@/hooks/useStarbucksData";
import { Loader2 } from "lucide-react";

const Behavior = () => {
  const { data: aggregates, isLoading } = useStarbucksData();

  if (isLoading || !aggregates) {
    return (
      <div className="flex h-[60vh] items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <>
      <PageHeader
        title="How People Order"
        subtitle="Looking at how people change their drinks and use their rewards."
      />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-6">
        <ChartCard title="Types of Drinks People Buy" delay={0}>
          <div className="h-[450px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={aggregates.drinkDist} margin={{ top: 20, right: 20, left: 20, bottom: 20 }}>
                <CartesianGrid strokeDasharray="4 4" stroke="hsl(var(--border))" vertical={false} />
                <XAxis dataKey="drink" tick={{ fontSize: 11, fontWeight: 700 }} axisLine={false} tickLine={false} interval={0} height={60} dy={10} />
                <YAxis tick={{ fontSize: 13, fontWeight: 700 }} axisLine={false} tickLine={false} width={70} domain={[15000, 'auto']} tickFormatter={(v) => `${(v / 1000).toFixed(1)}k`} />
                <Tooltip contentStyle={{ backgroundColor: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: 8, fontSize: 13 }} />
                <Bar dataKey="count" fill="hsl(var(--starbucks-green))" radius={[8, 8, 0, 0]} barSize={50} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </ChartCard>

        <ChartCard title="Rewards Members vs. Regular Customers" delay={100}>
          <div className="h-[450px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={aggregates.rewardsCompare} layout="vertical" margin={{ top: 20, right: 30, left: 30, bottom: 20 }}>
                <CartesianGrid strokeDasharray="4 4" stroke="hsl(var(--border))" horizontal={false} />
                <XAxis type="number" tick={{ fontSize: 13, fontWeight: 700 }} axisLine={false} tickLine={false} />
                <YAxis dataKey="metric" type="category" tick={{ fontSize: 13, fontWeight: 700 }} axisLine={false} tickLine={false} width={120} />
                <Tooltip contentStyle={{ backgroundColor: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: 8, fontSize: 13 }} />
                <Legend iconType="circle" iconSize={10} formatter={(v) => <span className="text-foreground font-bold text-sm ml-1">{v}</span>} />
                <Bar dataKey="Members" fill="hsl(var(--starbucks-green))" barSize={24} radius={[0, 8, 8, 0]} />
                <Bar dataKey="NonMembers" fill="hsl(38, 46%, 56%)" barSize={24} radius={[0, 8, 8, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </ChartCard>
      </div>

      <div className="grid grid-cols-1">
        <ChartCard title="Extra Toppings vs. Price" delay={200}>
          <div className="h-[500px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={aggregates.customSpend} margin={{ top: 20, right: 20, left: 20, bottom: 60 }}>
                <CartesianGrid strokeDasharray="4 4" stroke="hsl(var(--border))" vertical={false} />
                <XAxis dataKey="customizations" tick={{ fontSize: 13, fontWeight: 700 }} axisLine={false} tickLine={false} interval={0} dy={10} label={{ value: 'Extra Customizations', position: 'insideBottom', offset: -35 }} />
                <YAxis tick={{ fontSize: 13, fontWeight: 700 }} axisLine={false} tickLine={false} width={70} domain={[13, 'auto']} tickFormatter={(v) => `$${v.toFixed(1)}`} />
                <Tooltip contentStyle={{ backgroundColor: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: 8, fontSize: 13 }} />
                <Bar dataKey="avg_spend" fill="hsl(var(--starbucks-gold))" radius={[8, 8, 0, 0]} barSize={60} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </ChartCard>
      </div>
    </>
  );
};

export default Behavior;
