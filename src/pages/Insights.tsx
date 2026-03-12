import { TrendingUp, Users, Coffee, Clock, DollarSign, Award, Loader2 } from "lucide-react";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, Legend,
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

const InsightCard = ({ icon: Icon, title, value, description, delay }: InsightCardProps) => (
  <div
    className="bg-card border border-border rounded-lg p-5 opacity-0 animate-fade-in"
    style={{ animationDelay: `${delay}ms` }}
  >
    <div className="flex items-center gap-3 mb-3">
      <div className="h-9 w-9 rounded-lg bg-sidebar-accent flex items-center justify-center">
        <Icon className="h-4 w-4 text-primary" />
      </div>
      <span className="text-sm font-medium text-muted-foreground">{title}</span>
    </div>
    <p className="text-xl font-semibold text-foreground mb-1">{value}</p>
    <p className="text-xs text-muted-foreground leading-relaxed">{description}</p>
  </div>
);

const COLORS = ["#00704A", "#CBA258", "#1E3932", "#6B7280", "#00A862"];

const Insights = () => {
  const { data: aggregates, isLoading } = useStarbucksData();

  if (isLoading || !aggregates) {
    return (
      <div className="flex h-[60vh] items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  const { kpis, ageSpend, drinkDist, rewardsCompare } = aggregates;

  // Derive dynamic insights
  const maxAgeGroup = [...ageSpend].sort((a, b) => b.avg_spend - a.avg_spend)[0];
  const topDrink = [...drinkDist].sort((a, b) => b.count - a.count)[0];
  const peakTimeSlot = [...aggregates.timeDist].sort((a, b) => b.count - a.count)[0];

  const insights = [
    { icon: Users, title: "Highest Spenders", value: maxAgeGroup.age_group, description: `The ${maxAgeGroup.age_group} demographic has the highest average spend per transaction at $${maxAgeGroup.avg_spend.toFixed(2)}.` },
    { icon: Coffee, title: "Top Category", value: topDrink.drink, description: `${topDrink.drink} is the most requested category, making up a significant portion of the 100k sample.` },
    { icon: Clock, title: "Peak Period", value: peakTimeSlot.time_slot, description: `The highest transaction volume occurs during ${peakTimeSlot.time_slot} hours, indicating strong daily routines.` },
    { icon: DollarSign, title: "Revenue Milestone", value: `$${(kpis.total_revenue / 1000000).toFixed(2)}M`, description: "Total revenue across the sample set highlights the scale of the customer base and market reach." },
    { icon: Award, title: "Loyalty Uplift", value: `${kpis.rewards_pct.toFixed(1)}% Members`, description: "Rewards members show significantly higher engagement and satisfaction levels compared to guests." },
    { icon: TrendingUp, title: "Avg Satisfaction", value: `${kpis.avg_satisfaction.toFixed(2)}/5`, description: "Customers report high levels of satisfaction, particularly with order-ahead and customization options." },
  ];

  return (
    <>
      <PageHeader
        title="Key Insights"
        subtitle="Data-driven findings from the Starbucks Customer Ordering Patterns 2024-2025 dataset."
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
        {insights.map((insight, i) => (
          <InsightCard key={insight.title} {...insight} delay={i * 60} />
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <ChartCard title="Average Spend by Age Group" delay={400}>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={ageSpend}>
                <CartesianGrid strokeDasharray="4 4" stroke="hsl(var(--border))" vertical={false} />
                <XAxis dataKey="age_group" tick={{ fontSize: 12 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 12 }} axisLine={false} tickLine={false} domain={[12, 'auto']} />
                <Tooltip formatter={(v: number) => `$${v.toFixed(2)}`} contentStyle={{ backgroundColor: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: 8, fontSize: 13 }} />
                <Bar dataKey="avg_spend" fill="hsl(var(--starbucks-green))" radius={[4, 4, 0, 0]} barSize={36} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </ChartCard>

        <ChartCard title="Channel Distribution" delay={500}>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={aggregates.channelDist} cx="50%" cy="50%" innerRadius={60} outerRadius={95} paddingAngle={3} dataKey="count" nameKey="channel" stroke="none">
                  {aggregates.channelDist.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
                </Pie>
                <Tooltip formatter={(v: number) => v.toLocaleString()} contentStyle={{ backgroundColor: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: 8, fontSize: 13 }} />
                <Legend verticalAlign="bottom" iconType="circle" iconSize={8} formatter={(v) => <span className="text-muted-foreground text-xs">{v}</span>} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </ChartCard>
      </div>
    </>
  );
};

export default Insights;
