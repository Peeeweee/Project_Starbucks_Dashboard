import {
  BarChart,
  Bar,
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

const Spending = () => {
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
        title="Spending Insights"
        subtitle="Analyzing customer spending behavior across demographics and categories."
      />

      {/* Top Two Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

        {/* Age Spending */}
        <ChartCard
          title="Average Spending by Age Group"
          delay={0}
          className="bg-[#fdfaf6] border border-[#efe8df] rounded-2xl shadow-md hover:shadow-xl transition-all duration-300"
        >
          <div className="h-72 p-2">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={aggregates.ageSpend}>
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="#e8e4de"
                  vertical={false}
                />

                <XAxis
                  dataKey="age_group"
                  tick={{ fontSize: 12, fill: "#5b5b5b" }}
                  axisLine={false}
                  tickLine={false}
                />

                <YAxis
                  tick={{ fontSize: 12, fill: "#5b5b5b" }}
                  axisLine={false}
                  tickLine={false}
                  domain={[12, "auto"]}
                />

                <Tooltip
                  formatter={(v: number) => `$${v.toFixed(2)}`}
                  contentStyle={tooltipStyle}
                />

                <Bar
                  dataKey="avg_spend"
                  fill="#006241"
                  radius={[8, 8, 0, 0]}
                  barSize={36}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </ChartCard>

        {/* Location Spending */}
        <ChartCard
          title="Spending by Location Type"
          delay={100}
          className="bg-[#fdfaf6] border border-[#efe8df] rounded-2xl shadow-md hover:shadow-xl transition-all duration-300"
        >
          <div className="h-72 p-2">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={aggregates.locCompare}>
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="#e8e4de"
                  vertical={false}
                />

                <XAxis
                  dataKey="loc"
                  tick={{ fontSize: 12, fill: "#5b5b5b" }}
                  axisLine={false}
                  tickLine={false}
                />

                <YAxis
                  tick={{ fontSize: 12, fill: "#5b5b5b" }}
                  axisLine={false}
                  tickLine={false}
                />

                <Tooltip
                  formatter={(v: number) => `$${v.toFixed(2)}`}
                  contentStyle={tooltipStyle}
                />

                <Bar
                  dataKey="spend"
                  fill="#1E3932"
                  radius={[8, 8, 0, 0]}
                  barSize={36}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </ChartCard>

      </div>

      {/* Full Width Chart */}
      <ChartCard
        title="Product Customization vs Spending Impact"
        delay={200}
        className="bg-[#fdfaf6] border border-[#efe8df] rounded-2xl shadow-md hover:shadow-xl transition-all duration-300"
      >
        <div className="h-72 p-2">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={aggregates.customSpend}>
              <CartesianGrid
                strokeDasharray="3 3"
                stroke="#e8e4de"
                vertical={false}
              />

              <XAxis
                dataKey="customizations"
                tick={{ fontSize: 12, fill: "#5b5b5b" }}
                axisLine={false}
                tickLine={false}
                label={{
                  value: "Number of Customizations",
                  position: "insideBottom",
                  offset: -5,
                }}
              />

              <YAxis
                tick={{ fontSize: 12, fill: "#5b5b5b" }}
                axisLine={false}
                tickLine={false}
                domain={[10, "auto"]}
              />

              <Tooltip
                formatter={(v: number) => `$${v.toFixed(2)}`}
                contentStyle={tooltipStyle}
              />

              <Bar
                dataKey="avg_spend"
                fill="#C7A86D"
                radius={[8, 8, 0, 0]}
                barSize={36}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </ChartCard>

    </div>
  );
};

export default Spending;