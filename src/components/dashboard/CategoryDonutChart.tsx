import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from "recharts";
import { Smartphone } from "lucide-react";
import ChartCard from "./ChartCard";

interface CategoryDonutProps {
  data?: { channel: string; count: number; pct: number }[];
}

const COLORS = ["#006241", "#1E3932", "#D4A373", "#2E1A12", "#6B7280"];

const CategoryDonutChart = ({ data }: CategoryDonutProps) => (
  <ChartCard 
    title="Omni-channel Mix" 
    subtitle="Fulfillment Distribution" 
    icon={Smartphone}
    delay={400}
  >
    <div className="h-[340px] w-full mt-4">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="45%"
            innerRadius={80}
            outerRadius={115}
            paddingAngle={8}
            cornerRadius={10}
            dataKey="count"
            nameKey="channel"
            stroke="none"
            animationBegin={500}
            animationDuration={1500}
          >
            {data?.map((_, i) => (
              <Cell key={i} fill={COLORS[i % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip
            formatter={(value: number) => value.toLocaleString()}
            contentStyle={{
              backgroundColor: "hsl(var(--background))",
              border: "none",
              borderRadius: "1.25rem",
              fontSize: "14px",
              fontWeight: "700",
              boxShadow: "0 20px 40px -10px rgba(0,0,0,0.15)",
              padding: "16px",
            }}
          />
          <Legend
            verticalAlign="bottom"
            iconType="circle"
            iconSize={10}
            formatter={(value) => <span className="text-foreground font-bold text-sm ml-1">{value}</span>}
            wrapperStyle={{ paddingTop: "30px" }}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  </ChartCard>
);

export default CategoryDonutChart;
