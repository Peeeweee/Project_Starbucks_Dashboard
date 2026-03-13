import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import PageHeader from "@/components/dashboard/PageHeader";
import ChartCard from "@/components/dashboard/ChartCard";
import { useStarbucksData } from "@/hooks/useStarbucksData";
import { Loader2 } from "lucide-react";

const Behavior = () => {
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
        title="Ordering Behavior"
        subtitle="Analyzing patterns in customization, loyalty, and purchase habits."
      />

      {/* Top Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

        {/* Drink Distribution */}
        <ChartCard
          title="Drink Category Distribution"
          delay={0}
          className="bg-[#fdfaf6] border border-[#efe8df] shadow-md hover:shadow-xl transition-all duration-300 rounded-2xl"
        >
          <div className="h-72 p-2">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={aggregates.drinkDist}
                margin={{ top: 10, right: 10, left: -10, bottom: 0 }}
              >
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="#e8e4de"
                  vertical={false}
                />

                <XAxis
                  dataKey="drink"
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
                  barSize={42}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </ChartCard>

        {/* Loyalty Comparison */}
        <ChartCard
          title="Loyalty: Members vs Non-Members"
          delay={100}
          className="bg-[#fdfaf6] border border-[#efe8df] shadow-md hover:shadow-xl transition-all duration-300 rounded-2xl"
        >
          <div className="h-72 p-2">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={aggregates.rewardsCompare}
                layout="vertical"
                margin={{ top: 10, right: 20, left: 20, bottom: 0 }}
              >
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="#e8e4de"
                  horizontal={false}
                />

                <XAxis
                  type="number"
                  tick={{ fontSize: 12, fill: "#5b5b5b" }}
                  axisLine={false}
                  tickLine={false}
                />

                <YAxis
                  dataKey="metric"
                  type="category"
                  width={120}
                  tick={{ fontSize: 12, fill: "#5b5b5b" }}
                  axisLine={false}
                  tickLine={false}
                />

                <Tooltip contentStyle={tooltipStyle} />

                <Legend
                  iconType="circle"
                  iconSize={10}
                  wrapperStyle={{
                    fontSize: "12px",
                    color: "#666",
                  }}
                />

                <Bar
                  dataKey="Members"
                  fill="#006241"
                  barSize={18}
                  radius={[0, 6, 6, 0]}
                />

                <Bar
                  dataKey="NonMembers"
                  fill="#c8b9a6"
                  barSize={18}
                  radius={[0, 6, 6, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </ChartCard>
      </div>

      {/* Bottom Chart */}
      <div className="grid grid-cols-1">
        <ChartCard
          title="Customization Volume vs Average Spend"
          delay={200}
          className="bg-[#fdfaf6] border border-[#efe8df] shadow-md hover:shadow-xl transition-all duration-300 rounded-2xl"
        >
          <div className="h-72 p-2">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={aggregates.customSpend}
                margin={{ top: 10, right: 20, left: 0, bottom: 20 }}
              >
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
                    offset: -10,
                    style: { fontSize: 12, fill: "#666" },
                  }}
                />

                <YAxis
                  tick={{ fontSize: 12, fill: "#5b5b5b" }}
                  axisLine={false}
                  tickLine={false}
                  domain={[5, "auto"]}
                />

                <Tooltip contentStyle={tooltipStyle} />

                <Bar
                  dataKey="avg_spend"
                  fill="#c7a86d"
                  radius={[8, 8, 0, 0]}
                  barSize={42}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </ChartCard>
      </div>
    </div>
  );
};

export default Behavior;