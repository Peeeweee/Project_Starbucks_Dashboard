import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

interface TopDrinksProps {
  data?: { drink: string; count: number }[];
}

const TopDrinksChart = ({ data }: TopDrinksProps) => {
  const topData = (data ?? [])
    .sort((a, b) => b.count - a.count)
    .slice(0, 5);

  return (
    <div
      className="bg-card border border-border rounded-lg p-5 opacity-0 animate-fade-in"
      style={{ animationDelay: "300ms" }}
    >
      <h3 className="text-sm font-medium text-foreground mb-4">
        Top 5 Most Ordered Drinks
      </h3>

      <div className="h-72">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={topData}
            layout="vertical"
            margin={{ top: 5, right: 20, left: 20, bottom: 5 }}
          >
            <CartesianGrid
              strokeDasharray="4 4"
              stroke="hsl(var(--border))"
              horizontal={false}
            />

            <XAxis
              type="number"
              tick={{ fontSize: 12 }}
              axisLine={false}
              tickLine={false}
            />

            <YAxis
              dataKey="drink"
              type="category"
              tick={{ fontSize: 11 }}
              axisLine={false}
              tickLine={false}
              width={150}
            />

            <Tooltip
              formatter={(value: number) => value.toLocaleString()}
              contentStyle={{
                backgroundColor: "hsl(var(--card))",
                border: "1px solid hsl(var(--border))",
                borderRadius: 8,
                fontSize: 13,
                boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
              }}
            />

            <Bar
              dataKey="count"
              fill="hsl(var(--starbucks-green))"
              radius={[0, 6, 6, 0]}
              barSize={22}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Empty State */}
      {topData.length === 0 && (
        <p className="text-xs text-muted-foreground mt-4">
          No drink data available.
        </p>
      )}
    </div>
  );
};

export default TopDrinksChart;