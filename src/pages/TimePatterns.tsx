import {
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

import PageHeader from "@/components/dashboard/PageHeader";
import ChartCard from "@/components/dashboard/ChartCard";
import { useStarbucksData } from "@/hooks/useStarbucksData";
import { Loader2 } from "lucide-react";

const TimePatterns = () => {
  const { data: aggregates, isLoading } = useStarbucksData();

  if (isLoading || !aggregates) {
    return (
      <div className="flex h-[65vh] items-center justify-center">
        <Loader2 className="h-10 w-10 animate-spin text-[#006241]" />
      </div>
    );
  }

  const tooltipStyle = {
    backgroundColor: "#fdfaf6",
    border: "1px solid #e7e2da",
    borderRadius: 12,
    fontSize: 13,
    boxShadow: "0 10px 25px rgba(0,0,0,0.08)",
  };

  return (
    <div className="space-y-6">

      <PageHeader
        title="Time & Visit Patterns"
        subtitle="Analyzing temporal trends in transaction volume and purchasing behavior."
      />

      {/* Top Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

        {/* Orders by Day */}
        <ChartCard
          title="Orders by Day of Week"
          delay={0}
          className="bg-[#fdfaf6] border border-[#efe8df] rounded-2xl shadow-md hover:shadow-xl transition-all duration-300"
        >
          <div className="h-72 p-2">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={aggregates.ordersByDay}>
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
                />

                <Tooltip contentStyle={tooltipStyle} />

                <Bar
                  dataKey="count"
                  fill="#006241"
                  radius={[8, 8, 0, 0]}
                  barSize={36}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </ChartCard>

        {/* Time Slot Volume */}
        <ChartCard
          title="Order Volume by Time Slot"
          delay={100}
          className="bg-[#fdfaf6] border border-[#efe8df] rounded-2xl shadow-md hover:shadow-xl transition-all duration-300"
        >
          <div className="h-72 p-2">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={aggregates.timeDist}>
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="#e8e4de"
                  vertical={false}
                />

                <XAxis
                  dataKey="time_slot"
                  tick={{ fontSize: 12, fill: "#5b5b5b" }}
                  axisLine={false}
                  tickLine={false}
                />

                <YAxis
                  tick={{ fontSize: 12, fill: "#5b5b5b" }}
                  axisLine={false}
                  tickLine={false}
                />

                <Tooltip contentStyle={tooltipStyle} />

                <Bar
                  dataKey="count"
                  fill="#1E3932"
                  radius={[8, 8, 0, 0]}
                  barSize={36}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </ChartCard>

      </div>

      {/* Full Width Trend */}
      <ChartCard
        title="Average Cart Size Trend by Day"
        delay={200}
        className="bg-[#fdfaf6] border border-[#efe8df] rounded-2xl shadow-md hover:shadow-xl transition-all duration-300"
      >
        <div className="h-72 p-2">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={aggregates.cartByDay}>
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
                domain={["auto", "auto"]}
              />

              <Tooltip contentStyle={tooltipStyle} />

              <Line
                type="monotone"
                dataKey="avg"
                stroke="#C7A86D"
                strokeWidth={3}
                dot={{ r: 4 }}
                activeDot={{ r: 6 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </ChartCard>

    </div>
  );
};

export default TimePatterns;