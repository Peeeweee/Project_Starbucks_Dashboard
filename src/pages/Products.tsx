import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
} from "recharts";
import PageHeader from "@/components/dashboard/PageHeader";
import ChartCard from "@/components/dashboard/ChartCard";
import { useStarbucksData } from "@/hooks/useStarbucksData";
import { Loader2 } from "lucide-react";

const Products = () => {
  const { data: aggregates, isLoading } = useStarbucksData();

  if (isLoading || !aggregates) {
    return (
      <div className="flex h-[60vh] items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  const sortedDrinks = [...aggregates.drinkDist].sort((a, b) => b.count - a.count).slice(0, 10);

  return (
    <>
      <PageHeader
        title="Product Preferences"
        subtitle="Analyzing the most popular items across the 100k sample set."
      />

      <ChartCard title="Top 10 Most Ordered Drinks" delay={0} className="mb-6">
        <div className="h-96">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={sortedDrinks} layout="vertical" margin={{ left: 10 }}>
              <CartesianGrid strokeDasharray="4 4" stroke="hsl(var(--border))" horizontal={false} />
              <XAxis type="number" tick={{ fontSize: 12 }} axisLine={false} tickLine={false} />
              <YAxis dataKey="drink" type="category" tick={{ fontSize: 11 }} axisLine={false} tickLine={false} width={150} />
              <Tooltip formatter={(v: number) => v.toLocaleString()} contentStyle={{ backgroundColor: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: 8, fontSize: 13 }} />
              <Bar dataKey="count" fill="hsl(var(--starbucks-green))" radius={[0, 4, 4, 0]} barSize={22} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </ChartCard>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <ChartCard title="Drink Category Distribution" delay={100}>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={aggregates.drinkDist}>
                <CartesianGrid strokeDasharray="4 4" stroke="hsl(var(--border))" vertical={false} />
                <XAxis dataKey="drink" tick={{ fontSize: 10 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 12 }} axisLine={false} tickLine={false} />
                <Tooltip contentStyle={{ backgroundColor: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: 8, fontSize: 13 }} />
                <Bar dataKey="count" fill="hsl(var(--starbucks-forest))" radius={[4, 4, 0, 0]} barSize={36} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </ChartCard>

        <ChartCard title="Order-Ahead Rate by Channel" delay={200}>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={aggregates.orderAheadChannel}>
                <CartesianGrid strokeDasharray="4 4" stroke="hsl(var(--border))" vertical={false} />
                <XAxis dataKey="channel" tick={{ fontSize: 12 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 12 }} axisLine={false} tickLine={false} tickFormatter={(v) => `${v}%`} />
                <Tooltip formatter={(v: number) => `${v.toFixed(1)}%`} contentStyle={{ backgroundColor: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: 8, fontSize: 13 }} />
                <Bar dataKey="rate" fill="hsl(var(--starbucks-gold))" radius={[4, 4, 0, 0]} barSize={36} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </ChartCard>
      </div>
    </>
  );
};

export default Products;
