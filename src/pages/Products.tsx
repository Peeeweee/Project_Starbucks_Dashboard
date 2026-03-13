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

const Products = () => {
  const { data: aggregates, isLoading } = useStarbucksData();

  if (isLoading || !aggregates) {
    return (
      <div className="flex h-[65vh] items-center justify-center">
        <Loader2 className="h-10 w-10 animate-spin text-[#006241]" />
      </div>
    );
  }

  const sortedDrinks = [...aggregates.drinkDist]
    .sort((a, b) => b.count - a.count)
    .slice(0, 10);

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
        title="Product Preferences"
        subtitle="Analyzing the most popular items across the 100k transaction dataset."
      />

      {/* Top Drinks */}
      <ChartCard
        title="Top 10 Most Ordered Drinks"
        delay={0}
        className="bg-[#fdfaf6] border border-[#efe8df] rounded-2xl shadow-md hover:shadow-xl transition-all duration-300"
      >
        <div className="h-96 p-2">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={sortedDrinks}
              layout="vertical"
              margin={{ top: 10, right: 20, left: 10, bottom: 0 }}
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
                dataKey="drink"
                type="category"
                tick={{ fontSize: 11, fill: "#5b5b5b" }}
                axisLine={false}
                tickLine={false}
                width={150}
              />

              <Tooltip
                formatter={(v: number) => v.toLocaleString()}
                contentStyle={tooltipStyle}
              />

              <Bar
                dataKey="count"
                fill="#006241"
                radius={[0, 8, 8, 0]}
                barSize={24}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </ChartCard>

      {/* Bottom Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

        {/* Drink Distribution */}
        <ChartCard
          title="Drink Category Distribution"
          delay={100}
          className="bg-[#fdfaf6] border border-[#efe8df] rounded-2xl shadow-md hover:shadow-xl transition-all duration-300"
        >
          <div className="h-72 p-2">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={aggregates.drinkDist}
                margin={{ top: 10, right: 20, left: 0, bottom: 0 }}
              >
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="#e8e4de"
                  vertical={false}
                />

                <XAxis
                  dataKey="drink"
                  tick={{ fontSize: 10, fill: "#5b5b5b" }}
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

        {/* Order Ahead */}
        <ChartCard
          title="Order-Ahead Rate by Channel"
          delay={200}
          className="bg-[#fdfaf6] border border-[#efe8df] rounded-2xl shadow-md hover:shadow-xl transition-all duration-300"
        >
          <div className="h-72 p-2">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={aggregates.orderAheadChannel}
                margin={{ top: 10, right: 20, left: 0, bottom: 0 }}
              >
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="#e8e4de"
                  vertical={false}
                />

                <XAxis
                  dataKey="channel"
                  tick={{ fontSize: 12, fill: "#5b5b5b" }}
                  axisLine={false}
                  tickLine={false}
                />

                <YAxis
                  tick={{ fontSize: 12, fill: "#5b5b5b" }}
                  axisLine={false}
                  tickLine={false}
                  tickFormatter={(v) => `${v}%`}
                />

                <Tooltip
                  formatter={(v: number) => `${v.toFixed(1)}%`}
                  contentStyle={tooltipStyle}
                />

                <Bar
                  dataKey="rate"
                  fill="#C7A86D"
                  radius={[8, 8, 0, 0]}
                  barSize={36}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </ChartCard>

      </div>
    </div>
  );
};

export default Products;