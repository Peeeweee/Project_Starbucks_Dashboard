import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { TrendingUp } from "lucide-react";
import ChartCard from "./ChartCard";

interface OrderTrendsProps {
  data?: { day: string; count: number }[];
}

const OrderTrendsChart = ({ data }: OrderTrendsProps) => (
  <ChartCard 
    title="Business Momentum" 
    subtitle="Order Volume Trends" 
    icon={TrendingUp}
    delay={200}
    className="h-full"
  >
    <div className="h-[340px] w-full mt-4">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
          <defs>
            <linearGradient id="colorCount" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.15}/>
              <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0}/>
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="8 8" stroke="hsl(var(--chart-grid))" vertical={false} />
          <XAxis 
            dataKey="day" 
            tick={{ fontSize: 13, fontWeight: 600, fill: "hsl(var(--muted-foreground))" }} 
            axisLine={false} 
            tickLine={false} 
            dy={15}
          />
          <YAxis 
            tick={{ fontSize: 13, fontWeight: 600, fill: "hsl(var(--muted-foreground))" }} 
            axisLine={false} 
            tickLine={false} 
          />
          <Tooltip
            contentStyle={{
              backgroundColor: "white",
              border: "1px solid hsl(var(--border))",
              borderRadius: "0.75rem",
              fontSize: "12px",
              padding: "12px",
              boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
            }}
            itemStyle={{ color: "hsl(var(--primary))" }}
            cursor={{ stroke: "hsl(var(--primary))", strokeWidth: 1, strokeDasharray: "4 4" }}
          />
          <Area
            type="monotone"
            dataKey="count"
            stroke="hsl(var(--primary))"
            strokeWidth={4}
            fillOpacity={1}
            fill="url(#colorCount)"
            dot={{ r: 4, fill: "hsl(var(--primary))", strokeWidth: 2, stroke: "#fff" }}
            activeDot={{ r: 7, fill: "hsl(var(--primary))", strokeWidth: 3, stroke: "#fff" }}
            animationDuration={1800}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  </ChartCard>
);

export default OrderTrendsChart;
