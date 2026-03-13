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
  colorClass: string;
}

const InsightCard = ({ icon: Icon, title, value, description, delay, colorClass }: InsightCardProps) => (
  <div
    className={`group relative overflow-hidden bg-card border border-border rounded-2xl p-6 transition-all duration-300 hover:shadow-xl hover:shadow-primary/5 hover:-translate-y-1 opacity-0 animate-fade-in`}
    style={{ animationDelay: `${delay}ms` }}
  >
    <div className={`absolute top-0 right-0 w-32 h-32 -mr-8 -mt-8 rounded-full opacity-[0.03] transition-transform duration-500 group-hover:scale-110 ${colorClass.split(' ')[0]}`} />
    
    <div className="flex flex-col gap-4 relative z-10">
      <div className={`h-12 w-12 rounded-xl flex items-center justify-center shadow-sm ${colorClass}`}>
        <Icon className="h-6 w-6 text-white" />
      </div>
      
      <div>
        <p className="text-sm font-bold text-muted-foreground uppercase tracking-wider mb-1">{title}</p>
        <p className="text-3xl font-black text-foreground mb-2">{value}</p>
        <p className="text-sm text-muted-foreground leading-relaxed font-medium">{description}</p>
      </div>
    </div>
  </div>
);

const COLORS = ["#00704A", "#CBA258", "#1E3932", "#00A862", "#006241", "#D4E9E2"];

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
    { 
      icon: Users, 
      title: "Who Spends the Most?", 
      value: maxAgeGroup.age_group, 
      colorClass: "bg-[#00704A]",
      description: `People in the ${maxAgeGroup.age_group} age group spend the most, with an average of $${maxAgeGroup.avg_spend.toFixed(2)}.` 
    },
    { 
      icon: Coffee, 
      title: "Favorite Drink", 
      value: topDrink.drink, 
      colorClass: "bg-[#CBA258]",
      description: `${topDrink.drink} is the favorite drink type for most people in our study.` 
    },
    { 
      icon: Clock, 
      title: "Busiest Time", 
      value: peakTimeSlot.time_slot, 
      colorClass: "bg-[#1E3932]",
      description: `Most people visit Starbucks during ${peakTimeSlot.time_slot}, which is the busiest time of the day.` 
    },
    { 
      icon: DollarSign, 
      title: "Total Sales", 
      value: `$${(kpis.total_revenue / 1000000).toFixed(2)}M`, 
      colorClass: "bg-[#00A862]",
      description: "This is the total amount of money made from all the orders we looked at." 
    },
    { 
      icon: Award, 
      title: "Rewards Members", 
      value: `${kpis.rewards_pct.toFixed(1)}% Members`, 
      colorClass: "bg-[#27251F]",
      description: "People with rewards cards are happier and visit more often than others." 
    },
    { 
      icon: TrendingUp, 
      title: "Happy Score", 
      value: `${kpis.avg_satisfaction.toFixed(2)}/5`, 
      colorClass: "bg-[#DA291C]",
      description: "Most customers are very happy with their drinks and how easy it is to order ahead." 
    },
  ];

  return (
    <>
      <PageHeader
        title="Quick Facts"
        subtitle="Important things we learned from looking at 100,000 Starbucks orders."
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
        {insights.map((insight, i) => (
          <InsightCard key={insight.title} {...insight} delay={i * 60} />
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <ChartCard title="Average Spend by Age" delay={400}>
          <div className="h-[450px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={ageSpend} margin={{ top: 20, right: 20, left: 20, bottom: 20 }}>
                <CartesianGrid strokeDasharray="4 4" stroke="hsl(var(--border))" vertical={false} />
                <XAxis dataKey="age_group" tick={{ fontSize: 13, fontWeight: 700 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 13, fontWeight: 700 }} axisLine={false} tickLine={false} width={70} domain={[13.5, 'auto']} tickFormatter={(v) => `$${v.toFixed(1)}`} />
                <Tooltip formatter={(v: number) => `$${v.toFixed(2)}`} contentStyle={{ backgroundColor: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: 8, fontSize: 13 }} />
                <Bar dataKey="avg_spend" fill="hsl(var(--starbucks-green))" radius={[8, 8, 0, 0]} barSize={50} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </ChartCard>

        <ChartCard title="How People Order" delay={500}>
          <div className="h-[450px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={aggregates.channelDist} cx="50%" cy="50%" innerRadius={80} outerRadius={125} paddingAngle={5} dataKey="count" nameKey="channel" stroke="none">
                  {aggregates.channelDist.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
                </Pie>
                <Tooltip formatter={(v: number) => v.toLocaleString()} contentStyle={{ backgroundColor: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: 8, fontSize: 13 }} />
                <Legend verticalAlign="bottom" iconType="circle" iconSize={10} formatter={(v) => <span className="text-foreground font-bold text-sm ml-1">{v}</span>} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </ChartCard>
      </div>
    </>
  );
};

export default Insights;
