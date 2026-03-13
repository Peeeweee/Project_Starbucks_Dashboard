import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";

import PageHeader from "@/components/dashboard/PageHeader";
import ChartCard from "@/components/dashboard/ChartCard";
import { useStarbucksData } from "@/hooks/useStarbucksData";
import { Loader2 } from "lucide-react";

const GENDER_COLORS = ["#006241", "#C7A86D", "#1E3932"];

const Demographics = () => {
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

  // Derive gender distribution
  const genderData = [
    {
      name: "Female",
      value: aggregates.genderDrink.reduce(
        (acc, d) => acc + (d.Female || 0),
        0
      ),
    },
    {
      name: "Male",
      value: aggregates.genderDrink.reduce(
        (acc, d) => acc + (d.Male || 0),
        0
      ),
    },
  ];

  return (
    <div className="space-y-6">

      <PageHeader
        title="Customer Demographics"
        subtitle="Regional and demographic distribution of the 100k transaction dataset."
      />

      {/* Top Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

        {/* Age Group Spend */}
        <ChartCard
          title="Average Spend by Age Group"
          delay={0}
          className="bg-[#fdfaf6] border border-[#efe8df] shadow-md hover:shadow-xl transition-all duration-300 rounded-2xl"
        >
          <div className="h-72 p-2">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={aggregates.ageSpend}
                margin={{ top: 10, right: 10, left: -10, bottom: 0 }}
              >
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

                <Tooltip contentStyle={tooltipStyle} />

                <Bar
                  dataKey="avg_spend"
                  fill="#006241"
                  radius={[8, 8, 0, 0]}
                  barSize={40}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </ChartCard>

        {/* Gender Distribution */}
        <ChartCard
          title="Gender Distribution"
          delay={100}
          className="bg-[#fdfaf6] border border-[#efe8df] shadow-md hover:shadow-xl transition-all duration-300 rounded-2xl"
        >
          <div className="h-72 flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>

                <Pie
                  data={genderData}
                  cx="50%"
                  cy="50%"
                  innerRadius={65}
                  outerRadius={100}
                  paddingAngle={4}
                  dataKey="value"
                  nameKey="name"
                  stroke="none"
                >
                  {genderData.map((_, i) => (
                    <Cell
                      key={i}
                      fill={GENDER_COLORS[i % GENDER_COLORS.length]}
                    />
                  ))}
                </Pie>

                <Tooltip
                  formatter={(v) => v.toLocaleString()}
                  contentStyle={tooltipStyle}
                />

                <Legend
                  verticalAlign="bottom"
                  iconType="circle"
                  iconSize={10}
                  wrapperStyle={{
                    fontSize: "12px",
                    color: "#666",
                  }}
                />

              </PieChart>
            </ResponsiveContainer>
          </div>
        </ChartCard>

      </div>

      {/* Drink Preference */}
      <ChartCard
        title="Drink Preferences by Gender"
        delay={200}
        className="bg-[#fdfaf6] border border-[#efe8df] shadow-md hover:shadow-xl transition-all duration-300 rounded-2xl"
      >
        <div className="h-80 p-2">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={aggregates.genderDrink}
              margin={{ top: 10, right: 20, left: 0, bottom: 0 }}
            >

              <CartesianGrid
                strokeDasharray="3 3"
                stroke="#e8e4de"
                vertical={false}
              />

              <XAxis
                dataKey="drink"
                tick={{ fontSize: 11, fill: "#5b5b5b" }}
                axisLine={false}
                tickLine={false}
              />

              <YAxis
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
                dataKey="Female"
                fill="#006241"
                radius={[8, 8, 0, 0]}
                barSize={32}
              />

              <Bar
                dataKey="Male"
                fill="#C7A86D"
                radius={[8, 8, 0, 0]}
                barSize={32}
              />

            </BarChart>
          </ResponsiveContainer>
        </div>
      </ChartCard>

      {/* Region Distribution */}
      <ChartCard
        title="Regional Distribution"
        delay={300}
        className="bg-[#fdfaf6] border border-[#efe8df] shadow-md hover:shadow-xl transition-all duration-300 rounded-2xl"
      >
        <div className="h-72 p-2">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={aggregates.regionDist}
              margin={{ top: 10, right: 20, left: 0, bottom: 0 }}
            >

              <CartesianGrid
                strokeDasharray="3 3"
                stroke="#e8e4de"
                vertical={false}
              />

              <XAxis
                dataKey="region"
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
                barSize={40}
              />

            </BarChart>
          </ResponsiveContainer>
        </div>
      </ChartCard>

    </div>
  );
};

export default Demographics;