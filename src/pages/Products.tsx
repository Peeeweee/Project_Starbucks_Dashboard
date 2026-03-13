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
        title="Favorite Products"
        subtitle="Finding the most popular drinks from 100,000 orders."
      />

      <ChartCard title="Top 10 Best Sellers" delay={0} className="mb-6">
        <div className="h-[600px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={sortedDrinks} layout="vertical" margin={{ top: 20, right: 30, left: 30, bottom: 20 }}>
              <CartesianGrid strokeDasharray="4 4" stroke="hsl(var(--border))" horizontal={false} />
              <XAxis type="number" tick={{ fontSize: 12 }} axisLine={false} tickLine={false} domain={[15000, 'auto']} tickFormatter={(v) => `${(v / 1000).toFixed(1)}k`} />
              <YAxis dataKey="drink" type="category" tick={{ fontSize: 13, fontWeight: 700 }} axisLine={false} tickLine={false} width={130} />
              <Tooltip formatter={(v: number) => v.toLocaleString()} contentStyle={{ backgroundColor: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: 8, fontSize: 13 }} />
              <Bar dataKey="count" fill="hsl(var(--starbucks-green))" radius={[0, 8, 8, 0]} barSize={36} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </ChartCard>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <ChartCard title="Popular Drink Types" delay={100}>
          <div className="h-[450px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={aggregates.drinkDist} margin={{ top: 20, right: 20, left: 20, bottom: 20 }}>
                <CartesianGrid strokeDasharray="4 4" stroke="hsl(var(--border))" vertical={false} />
                <XAxis dataKey="drink" tick={{ fontSize: 11, fontWeight: 700 }} axisLine={false} tickLine={false} interval={0} height={60} dy={10} />
                <YAxis tick={{ fontSize: 13, fontWeight: 700 }} axisLine={false} tickLine={false} width={70} domain={[15000, 'auto']} tickFormatter={(v) => `${(v / 1000).toFixed(1)}k`} />
                <Tooltip contentStyle={{ backgroundColor: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: 8, fontSize: 13 }} />
                <Bar dataKey="count" fill="hsl(var(--starbucks-forest))" radius={[8, 8, 0, 0]} barSize={44} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </ChartCard>

        <ChartCard title="How People Order Ahead" delay={200}>
          <div className="h-[450px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={aggregates.orderAheadChannel} margin={{ top: 20, right: 20, left: 20, bottom: 20 }}>
                <CartesianGrid strokeDasharray="4 4" stroke="hsl(var(--border))" vertical={false} />
                <XAxis dataKey="channel" tick={{ fontSize: 13, fontWeight: 700 }} axisLine={false} tickLine={false} interval={0} dy={10} />
                <YAxis tick={{ fontSize: 13, fontWeight: 700 }} axisLine={false} tickLine={false} width={70} tickFormatter={(v) => `${v}%`} domain={[0, 100]} />
                <Tooltip formatter={(v: number) => `${v.toFixed(1)}%`} contentStyle={{ backgroundColor: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: 8, fontSize: 13 }} />
                <Bar dataKey="rate" fill="hsl(var(--starbucks-gold))" radius={[8, 8, 0, 0]} barSize={44} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </ChartCard>
      </div>
    </>
  );
};

export default Products;
