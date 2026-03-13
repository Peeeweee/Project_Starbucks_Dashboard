import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

interface OrderTrendsProps {
  data?: { day: string; count: number }[];
}

const OrderTrendsChart = ({ data }: OrderTrendsProps) => {
  const tooltipStyle = {
    backgroundColor: "#fdfaf6",
    border: "1px solid #e7e2da",
    borderRadius: 12,
    fontSize: 13,
    boxShadow: "0 10px 25px rgba(0,0,0,0.08)",
  };

  return (
    <div
      className="
        bg-[#fdfaf6]
        border border-[#efe8df]
        rounded-2xl
        p-6
        shadow-md
        hover:shadow-xl
        transition-all
        duration-300
        opacity-0
        animate-fade-in
      "
      style={{ animationDelay: "200ms" }}
    >
      <h3 className="text-sm font-semibold text-[#1E3932] mb-5 tracking-wide">
        Order Volume by Day of Week
      </h3>

      <div className="h-72">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={data}
            margin={{ top: 10, right: 20, left: 0, bottom: 5 }}
          >
            <CartesianGrid
              strokeDasharray="3 3"
              stroke="#e8e4de"
              vertical={false}
            />

            <XAxis
              dataKey="day"
              tick={{ fontSize: 12, fill: "#5b5b5b" }}
              axisLine={false}
              tickLine={false}
            />

            <YAxis
              tick={{ fontSize: 12, fill: "#5b5b5b" }}
              axisLine={false}
              tickLine={false}
              width={45}
            />

            <Tooltip contentStyle={tooltipStyle} />

            <Line
              type="monotone"
              dataKey="count"
              stroke="#006241"
              strokeWidth={3}
              dot={{ r: 4, fill: "#006241", strokeWidth: 0 }}
              activeDot={{ r: 6 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default OrderTrendsChart;