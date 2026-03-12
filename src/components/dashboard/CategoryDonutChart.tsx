import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from "recharts";

const data = [
  { name: "Espresso", value: 38 },
  { name: "Frappuccino", value: 25 },
  { name: "Tea", value: 20 },
  { name: "Cold Brew", value: 17 },
];

interface CategoryDonutProps {
  data?: { channel: string; count: number; pct: number }[];
}

const COLORS = ["#00704A", "#CBA258", "#1E3932", "#6B7280", "#00A862"];

const CategoryDonutChart = ({ data }: CategoryDonutProps) => (
  <div className="bg-card border border-border rounded-lg p-5 opacity-0 animate-fade-in" style={{ animationDelay: "400ms" }}>
    <h3 className="text-sm font-medium text-foreground mb-4">Order Channel Distribution</h3>
    <div className="h-72">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={95}
            paddingAngle={3}
            dataKey="count"
            nameKey="channel"
            stroke="none"
          >
            {data?.map((_, i) => (
              <Cell key={i} fill={COLORS[i % COLORS.length]} />
            ))}
          </Pie>
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
          <Legend
            verticalAlign="bottom"
            iconType="circle"
            iconSize={8}
            formatter={(value) => <span className="text-muted-foreground text-xs">{value}</span>}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  </div>
);

export default CategoryDonutChart;
