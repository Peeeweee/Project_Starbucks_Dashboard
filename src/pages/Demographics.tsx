import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, Legend,
} from "recharts";
import PageHeader from "@/components/dashboard/PageHeader";
import ChartCard from "@/components/dashboard/ChartCard";
import { useStarbucksData } from "@/hooks/useStarbucksData";
import { Loader2 } from "lucide-react";

const GENDER_COLORS = ["#00704A", "#CBA258", "#1E3932"];

const Demographics = () => {
  const { data: aggregates, isLoading } = useStarbucksData();

  if (isLoading || !aggregates) {
    return (
      <div className="flex h-[60vh] items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  // Derive gender distribution from genderDrink
  const genderData = [
    { name: "Female", value: aggregates.genderDrink.reduce((acc, d) => acc + (d.Female || 0), 0) },
    { name: "Male", value: aggregates.genderDrink.reduce((acc, d) => acc + (d.Male || 0), 0) },
  ];

  return (
    <>
      <PageHeader
        title="Customer Demographics"
        subtitle="Regional and demographic distribution of the 100k transaction set."
      />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-6">
        <ChartCard title="Average Spend by Age Group" delay={0}>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={aggregates.ageSpend}>
                <CartesianGrid strokeDasharray="4 4" stroke="hsl(var(--border))" vertical={false} />
                <XAxis dataKey="age_group" tick={{ fontSize: 12 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 12 }} axisLine={false} tickLine={false} domain={[12, 'auto']} />
                <Tooltip contentStyle={{ backgroundColor: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: 8, fontSize: 13 }} />
                <Bar dataKey="avg_spend" fill="hsl(var(--starbucks-green))" radius={[4, 4, 0, 0]} barSize={36} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </ChartCard>

        <ChartCard title="Gender Distribution" delay={100}>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={genderData} cx="50%" cy="50%" innerRadius={60} outerRadius={95} paddingAngle={3} dataKey="value" nameKey="name" stroke="none">
                  {genderData.map((_, i) => <Cell key={i} fill={GENDER_COLORS[i % GENDER_COLORS.length]} />)}
                </Pie>
                <Tooltip formatter={(v: number) => v.toLocaleString()} contentStyle={{ backgroundColor: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: 8, fontSize: 13 }} />
                <Legend verticalAlign="bottom" iconType="circle" iconSize={8} formatter={(v) => <span className="text-muted-foreground text-xs">{v}</span>} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </ChartCard>
      </div>

      <div className="mb-6">
        <ChartCard title="Drink Preferences by Gender" delay={200}>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={aggregates.genderDrink}>
                <CartesianGrid strokeDasharray="4 4" stroke="hsl(var(--border))" vertical={false} />
                <XAxis dataKey="drink" tick={{ fontSize: 11 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 12 }} axisLine={false} tickLine={false} />
                <Tooltip contentStyle={{ backgroundColor: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: 8, fontSize: 13 }} />
                <Legend iconType="circle" iconSize={8} formatter={(v) => <span className="text-muted-foreground text-xs">{v}</span>} />
                <Bar dataKey="Female" fill="hsl(var(--starbucks-green))" radius={[4, 4, 0, 0]} />
                <Bar dataKey="Male" fill="hsl(var(--starbucks-gold))" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </ChartCard>
      </div>

      <ChartCard title="Regional Distribution" delay={300}>
        <div className="h-72">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={aggregates.regionDist}>
              <CartesianGrid strokeDasharray="4 4" stroke="hsl(var(--border))" vertical={false} />
              <XAxis dataKey="region" tick={{ fontSize: 12 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 12 }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={{ backgroundColor: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: 8, fontSize: 13 }} />
              <Bar dataKey="count" fill="hsl(var(--starbucks-forest))" radius={[4, 4, 0, 0]} barSize={36} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </ChartCard>
    </>
  );
};

export default Demographics;
