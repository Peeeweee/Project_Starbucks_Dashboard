import { TrendingUp, Users, Coffee, Clock, DollarSign, Award, Loader2 } from "lucide-react";
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

interface InsightCardProps {
  icon: React.ElementType;
  title: string;
  value: string;
  description: string;
  delay: number;
}

const InsightCard = ({
  icon: Icon,
  title,
  value,
  description,
  delay,
}: InsightCardProps) => (
  <div
    className="bg-[#fdfaf6] border border-[#efe8df] rounded-2xl p-5 shadow-md hover:shadow-xl transition-all duration-300 opacity-0 animate-fade-in"
    style={{ animationDelay: `${delay}ms` }}
  >
    <div className="flex items-center gap-3 mb-3">
      <div className="h-10 w-10 rounded-xl bg-[#006241]/10 flex items-center justify-center">
        <Icon className="h-5 w-5 text-[#006241]" />
      </div>
      <span className="text-sm font-medium text-gray-600">{title}</span>
    </div>

    <p className="text-xl font-semibold text-gray-900 mb-1">{value}</p>

    <p className="text-xs text-gray-500 leading-relaxed">{description}</p>
  </div>
);

const COLORS = ["#006241", "#C7A86D", "#1E3932", "#6B7280", "#00A862"];

const Insights = () => {
  const { data: aggregates, isLoading } = useStarbucksData();

  if (isLoading || !aggregates) {
    return (
      <div className="flex h-[65vh] items-center justify-center">
        <Loader2 className="h-10 w-10 animate-spin text-[#006241]" />
      </div>
    );
  }

  const { kpis, ageSpend, drinkDist } = aggregates;

  const tooltipStyle = {
    backgroundColor: "#fdfaf6",
    border: "1px solid #e7e2da",
    borderRadius: 12,
    fontSize: 13,
    boxShadow: "0 10px 25px rgba(0,0,0,0.08)",
  };

  // Dynamic insights
  const maxAgeGroup = [...ageSpend].sort((a, b) => b.avg_spend - a.avg_spend)[0];
  const topDrink = [...drinkDist].sort((a, b) => b.count - a.count)[0];
  const peakTimeSlot = [...aggregates.timeDist].sort((a, b) => b.count - a.count)[0];

  const insights = [
    {
      icon: Users,
      title: "Highest Spenders",
      value: maxAgeGroup.age_group,
      description: `The ${maxAgeGroup.age_group} demographic spends the most per transaction with an average of $${maxAgeGroup.avg_spend.toFixed(2)}.`,
    },
    {
      icon: Coffee,
      title: "Top Category",
      value: topDrink.drink,
      description: `${topDrink.drink} dominates customer preferences across the dataset.`,
    },
    {
      icon: Clock,
      title: "Peak Period",
      value: peakTimeSlot.time_slot,
      description: `The highest number of transactions occur during ${peakTimeSlot.time_slot}.`,
    },
    {
      icon: DollarSign,
      title: "Revenue Milestone",
      value: `$${(kpis.total_revenue / 1000000).toFixed(2)}M`,
      description:
        "Total revenue generated from the sample highlights the scale of customer demand.",
    },
    {
      icon: Award,
      title: "Loyalty Engagement",
      value: `${kpis.rewards_pct.toFixed(1)}% Members`,
      description:
        "Rewards members consistently demonstrate higher engagement levels.",
    },
    {
      icon: TrendingUp,
      title: "Avg Satisfaction",
      value: `${kpis.avg_satisfaction.toFixed(2)}/5`,
      description:
        "Customers show strong satisfaction with ordering experience and customization.",
    },
  ];

  return (
    <div className="space-y-6">

      <PageHeader
        title="Key Insights"
        subtitle="Data-driven findings from the Starbucks Customer Ordering Patterns 2024–2025 dataset."
      />

      {/* Insight Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {insights.map((insight, i) => (
          <InsightCard key={insight.title} {...insight} delay={i * 60} />
        ))}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

        {/* Age Spend Chart */}
        <ChartCard
          title="Average Spend by Age Group"
          delay={400}
          className="bg-[#fdfaf6] border border-[#efe8df] shadow-md rounded-2xl hover:shadow-xl transition-all"
        >
          <div className="h-72 p-2">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={ageSpend}
                margin={{ top: 10, right: 20, left: 0, bottom: 0 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#e8e4de" vertical={false} />

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
                  barSize={40}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </ChartCard>

        {/* Channel Distribution */}
        <ChartCard
          title="Channel Distribution"
          delay={500}
          className="bg-[#fdfaf6] border border-[#efe8df] shadow-md rounded-2xl hover:shadow-xl transition-all"
        >
          <div className="h-72 flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>

                <Pie
                  data={aggregates.channelDist}
                  cx="50%"
                  cy="50%"
                  innerRadius={65}
                  outerRadius={100}
                  paddingAngle={4}
                  dataKey="count"
                  nameKey="channel"
                  stroke="none"
                >
                  {aggregates.channelDist.map((_, i) => (
                    <Cell key={i} fill={COLORS[i % COLORS.length]} />
                  ))}
                </Pie>

                <Tooltip
                  formatter={(v: number) => v.toLocaleString()}
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
    </div>
  );
};

export default Insights;