import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

interface CategoryDonutProps {
  data?: { channel: string; count: number; pct: number }[];
}

const COLORS = ["#00704A", "#1E3932", "#C7A86D", "#6B7280", "#00A862"];

const CategoryDonutChart = ({ data }: CategoryDonutProps) => {
  const tooltipStyle = {
    backgroundColor: "#fdfaf6",
    border: "1px solid #e7e2da",
    borderRadius: 12,
    fontSize: 13,
    boxShadow: "0 10px 25px rgba(0,0,0,0.08)",
  };

  return (
    <div className="
      bg-[#fdfaf6]
      border border-[#efe8df]
      rounded-2xl
      p-5
      shadow-md
      hover:shadow-xl
      transition-all
      duration-300
      opacity-0
      animate-fade-in
    "
    style={{ animationDelay: "400ms" }}
    >

      <h3 className="text-sm font-semibold text-[#1E3932] mb-4">
        Order Channel Distribution
      </h3>

      <div className="h-72">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>

            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={65}
              outerRadius={100}
              paddingAngle={4}
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
              contentStyle={tooltipStyle}
            />

            <Legend
              verticalAlign="bottom"
              iconType="circle"
              iconSize={8}
              formatter={(value) => (
                <span className="text-[#5b5b5b] text-xs">
                  {value}
                </span>
              )}
            />

          </PieChart>
        </ResponsiveContainer>
      </div>

    </div>
  );
};

export default CategoryDonutChart;