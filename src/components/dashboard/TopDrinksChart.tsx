import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const data = [
  { name: "Caramel Macchiato", orders: 2450 },
  { name: "Iced Latte", orders: 2100 },
  { name: "Mocha Frappuccino", orders: 1800 },
  { name: "Cold Brew", orders: 1650 },
  { name: "Matcha Latte", orders: 1400 },
];

interface TopDrinksProps {
  data?: { drink: string; count: number }[];
}

const TopDrinksChart = ({ data }: TopDrinksProps) => {
  const topData = data 
    ? [...data].sort((a, b) => b.count - a.count).slice(0, 5)
    : [];

  return (
    <div className="bg-card border border-border rounded-lg p-5 opacity-0 animate-fade-in" style={{ animationDelay: "300ms" }}>
      <h3 className="text-sm font-medium text-foreground mb-4">Top 5 Most Ordered Drinks</h3>
      <div className="h-72">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={topData} layout="vertical" margin={{ top: 5, right: 20, left: 10, bottom: 5 }}>
            <CartesianGrid strokeDasharray="4 4" stroke="hsl(var(--border))" horizontal={false} />
            <XAxis type="number" tick={{ fontSize: 12 }} axisLine={false} tickLine={false} />
            <YAxis
              dataKey="drink"
              type="category"
              tick={{ fontSize: 11 }}
              axisLine={false}
              tickLine={false}
              width={140}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "hsl(var(--card))",
                border: "1px solid hsl(var(--border))",
                borderRadius: 8,
                fontSize: 13,
                boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
              }}
            />
            <Bar dataKey="count" fill="hsl(var(--starbucks-forest))" radius={[0, 4, 4, 0]} barSize={24} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default TopDrinksChart;
