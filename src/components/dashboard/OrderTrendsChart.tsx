import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const data = [
  { month: "Jan", orders: 1200 },
  { month: "Feb", orders: 1350 },
  { month: "Mar", orders: 1500 },
  { month: "Apr", orders: 1420 },
  { month: "May", orders: 1680 },
  { month: "Jun", orders: 1750 },
  { month: "Jul", orders: 1900 },
  { month: "Aug", orders: 2100 },
  { month: "Sep", orders: 1980 },
  { month: "Oct", orders: 2200 },
  { month: "Nov", orders: 2350 },
  { month: "Dec", orders: 2500 },
];

interface OrderTrendsProps {
  data?: { day: string; count: number }[];
}

const OrderTrendsChart = ({ data }: OrderTrendsProps) => (
  <div className="bg-card border border-border rounded-lg p-5 opacity-0 animate-fade-in" style={{ animationDelay: "200ms" }}>
    <h3 className="text-sm font-medium text-foreground mb-4">Order Volume by Day of Week</h3>
    <div className="h-72">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
          <CartesianGrid strokeDasharray="4 4" stroke="hsl(var(--border))" vertical={false} />
          <XAxis dataKey="day" tick={{ fontSize: 12 }} axisLine={false} tickLine={false} />
          <YAxis tick={{ fontSize: 12 }} axisLine={false} tickLine={false} width={45} />
          <Tooltip
            contentStyle={{
              backgroundColor: "hsl(var(--card))",
              border: "1px solid hsl(var(--border))",
              borderRadius: 8,
              fontSize: 13,
              boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
            }}
          />
          <Line
            type="monotone"
            dataKey="count"
            stroke="hsl(var(--starbucks-green))"
            strokeWidth={2.5}
            dot={{ r: 3, fill: "hsl(var(--starbucks-green))", strokeWidth: 0 }}
            activeDot={{ r: 5, fill: "hsl(var(--starbucks-green))" }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  </div>
);

export default OrderTrendsChart;
