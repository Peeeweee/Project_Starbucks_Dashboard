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
        title="Ordering Behavior"
        subtitle="Analyzing patterns in customization, loyalty, and purchase habits."
      />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-6">
        <ChartCard title="Drink Category Distribution" delay={0}>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={aggregates.drinkDist}>
                <CartesianGrid strokeDasharray="4 4" stroke="hsl(var(--border))" vertical={false} />
                <XAxis dataKey="drink" tick={{ fontSize: 11 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 12 }} axisLine={false} tickLine={false} />
                <Tooltip contentStyle={{ backgroundColor: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: 8, fontSize: 13 }} />
                <Bar dataKey="count" fill="hsl(var(--starbucks-green))" radius={[4, 4, 0, 0]} barSize={40} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </ChartCard>

        <ChartCard title="Loyalty: Members vs Non-Members" delay={100}>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={aggregates.rewardsCompare} layout="vertical">
                <CartesianGrid strokeDasharray="4 4" stroke="hsl(var(--border))" horizontal={false} />
                <XAxis type="number" tick={{ fontSize: 12 }} axisLine={false} tickLine={false} />
                <YAxis dataKey="metric" type="category" tick={{ fontSize: 12 }} axisLine={false} tickLine={false} width={100} />
                <Tooltip contentStyle={{ backgroundColor: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: 8, fontSize: 13 }} />
                <Legend iconType="circle" iconSize={8} formatter={(v) => <span className="text-muted-foreground text-xs">{v}</span>} />
                <Bar dataKey="Members" fill="hsl(var(--starbucks-green))" barSize={16} radius={[0, 4, 4, 0]} />
                <Bar dataKey="NonMembers" fill="hsl(var(--muted))" barSize={16} radius={[0, 4, 4, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </ChartCard>
      </div>

      <div className="grid grid-cols-1">
        <ChartCard title="Customization Volume vs. Average Spend" delay={200}>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={aggregates.customSpend}>
                <CartesianGrid strokeDasharray="4 4" stroke="hsl(var(--border))" vertical={false} />
                <XAxis dataKey="customizations" tick={{ fontSize: 12 }} axisLine={false} tickLine={false} label={{ value: 'Number of Customizations', position: 'insideBottom', offset: -5 }} />
                <YAxis tick={{ fontSize: 12 }} axisLine={false} tickLine={false} domain={[5, 'auto']} />
                <Tooltip contentStyle={{ backgroundColor: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: 8, fontSize: 13 }} />
                <Bar dataKey="avg_spend" fill="hsl(var(--starbucks-gold))" radius={[4, 4, 0, 0]} barSize={40} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </ChartCard>
      </div>
    </>
  );
};

export default Behavior;
