import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
} from "recharts";
import PageHeader from "@/components/dashboard/PageHeader";
import ChartCard from "@/components/dashboard/ChartCard";
import { useStarbucksData } from "@/hooks/useStarbucksData";
import { Loader2 } from "lucide-react";

const Spending = () => {
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
        title="Spending Facts"
        subtitle="Learning what makes customers spend more on their coffee."
      />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-6">
        <ChartCard title="Average Spend by Age" delay={0}>
          <div className="h-[450px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={aggregates.ageSpend} margin={{ top: 20, right: 20, left: 20, bottom: 20 }}>
                <CartesianGrid strokeDasharray="4 4" stroke="hsl(var(--border))" vertical={false} />
                <XAxis dataKey="age_group" tick={{ fontSize: 13, fontWeight: 700 }} axisLine={false} tickLine={false} interval={0} dy={10} />
                <YAxis tick={{ fontSize: 13, fontWeight: 700 }} axisLine={false} tickLine={false} width={70} domain={[13.5, 'auto']} tickFormatter={(v) => `$${v.toFixed(1)}`} />
                <Tooltip formatter={(v: number) => `$${v.toFixed(2)}`} contentStyle={{ backgroundColor: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: 8, fontSize: 13 }} />
                <Bar dataKey="avg_spend" fill="hsl(var(--starbucks-green))" radius={[8, 8, 0, 0]} barSize={50} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </ChartCard>

        <ChartCard title="Spending by Where People Live" delay={100}>
          <div className="h-[450px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={aggregates.locCompare} margin={{ top: 20, right: 20, left: 20, bottom: 20 }}>
                <CartesianGrid strokeDasharray="4 4" stroke="hsl(var(--border))" vertical={false} />
                <XAxis dataKey="loc" tick={{ fontSize: 13, fontWeight: 700 }} axisLine={false} tickLine={false} interval={0} dy={10} />
                <YAxis tick={{ fontSize: 13, fontWeight: 700 }} axisLine={false} tickLine={false} width={70} domain={[14, 'auto']} tickFormatter={(v) => `$${v.toFixed(1)}`} />
                <Tooltip formatter={(v: number) => `$${v.toFixed(2)}`} contentStyle={{ backgroundColor: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: 8, fontSize: 13 }} />
                <Bar dataKey="spend" fill="hsl(var(--starbucks-forest))" radius={[8, 8, 0, 0]} barSize={50} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </ChartCard>
      </div>

      <ChartCard title="How Extra Toppings Change the Price" delay={200}>
        <div className="h-[450px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={aggregates.customSpend} margin={{ top: 20, right: 20, left: 20, bottom: 60 }}>
              <CartesianGrid strokeDasharray="4 4" stroke="hsl(var(--border))" vertical={false} />
              <XAxis dataKey="customizations" tick={{ fontSize: 13, fontWeight: 700 }} axisLine={false} tickLine={false} interval={0} dy={10} label={{ value: 'Extra Customizations', position: 'insideBottom', offset: -35 }} />
              <YAxis tick={{ fontSize: 13, fontWeight: 700 }} axisLine={false} tickLine={false} width={70} domain={[13, 'auto']} tickFormatter={(v) => `$${v.toFixed(1)}`} />
              <Tooltip formatter={(v: number) => `$${v.toFixed(2)}`} contentStyle={{ backgroundColor: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: 8, fontSize: 13 }} />
              <Bar dataKey="avg_spend" fill="hsl(var(--starbucks-gold))" radius={[8, 8, 0, 0]} barSize={50} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </ChartCard>
    </>
  );
};

export default Spending;
