import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";
import { Star } from "lucide-react";
import ChartCard from "./ChartCard";

interface RewardsCompareProps {
  data?: { metric: string; Members: number; NonMembers: number }[];
}

const RewardsCompareChart = ({ data }: RewardsCompareProps) => (
  <ChartCard 
    title="Loyalty Valuation" 
    subtitle="Rewards vs. Non-Rewards" 
    icon={Star}
    delay={500}
  >
    <div className="h-[340px] w-full mt-4">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} margin={{ top: 20, right: 20, left: 20, bottom: 20 }}>
          <CartesianGrid strokeDasharray="8 8" stroke="hsl(var(--chart-grid))" vertical={false} />
          <XAxis 
            dataKey="metric" 
            tick={{ fontSize: 12, fontWeight: 700, fill: "hsl(var(--muted-foreground))" }} 
            axisLine={false} 
            tickLine={false} 
            dy={10}
          />
          <YAxis 
            tick={{ fontSize: 13, fontWeight: 700, fill: "hsl(var(--muted-foreground))" }} 
            axisLine={false} 
            tickLine={false}
            width={70}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: "hsl(var(--background))",
              border: "none",
              borderRadius: "1rem",
              fontSize: "13px",
              fontWeight: "700",
              boxShadow: "0 20px 40px -10px rgba(0,0,0,0.15)",
              padding: "16px",
            }}
          />
          <Legend verticalAlign="top" align="right" iconType="circle" iconSize={10} wrapperStyle={{ paddingBottom: "20px" }} />
          <Bar
            dataKey="Members"
            name="Rewards Member"
            fill="hsl(159, 100%, 19%)"
            radius={[6, 6, 0, 0]}
            barSize={30}
          />
          <Bar
            dataKey="NonMembers"
            name="General Customer"
            fill="hsl(38, 46%, 56%)"
            radius={[6, 6, 0, 0]}
            barSize={30}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  </ChartCard>
);

export default RewardsCompareChart;
