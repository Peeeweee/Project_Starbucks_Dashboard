import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from "recharts";
import { Coffee } from "lucide-react";
import ChartCard from "./ChartCard";

interface TopDrinksProps {
  data?: { drink: string; count: number }[];
}

const COLORS = [
  "hsl(159, 100%, 19%)", // Starbucks Green
  "hsl(159, 100%, 25%)", 
  "hsl(159, 100%, 35%)", 
  "hsl(159, 100%, 45%)",
  "hsl(159, 100%, 55%)"
];

const TopDrinksChart = ({ data }: TopDrinksProps) => {
  const topData = data 
    ? [...data].sort((a, b) => b.count - a.count).slice(0, 5)
    : [];

  return (
    <ChartCard 
      title="Product Leaderboard" 
      subtitle="Top 5 Performance" 
      icon={Coffee}
      delay={300}
    >
      <div className="h-[450px] w-full mt-4">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={topData} layout="vertical" margin={{ top: 20, right: 30, left: 30, bottom: 20 }}>
            <CartesianGrid strokeDasharray="8 8" stroke="hsl(var(--chart-grid))" horizontal={false} />
            <XAxis 
              type="number" 
              domain={[10000, 'dataMax + 1000']} 
              hide 
            />
            <YAxis
              dataKey="drink"
              type="category"
              tick={{ fontSize: 13, fontWeight: 700, fill: "hsl(var(--foreground))" }}
              axisLine={false}
              tickLine={false}
              width={120}
            />
            <Tooltip
              cursor={{ fill: "hsl(var(--primary)/0.03)" }}
              contentStyle={{
                backgroundColor: "white",
                border: "1px solid hsl(var(--border))",
                borderRadius: "0.75rem",
                fontSize: "12px",
                padding: "12px",
                boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
              }}
            />
            <Bar 
              dataKey="count" 
              radius={[0, 12, 12, 0]} 
              barSize={32}
              animationDuration={1500}
            >
              {topData.map((_, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </ChartCard>
  );
};

export default TopDrinksChart;
