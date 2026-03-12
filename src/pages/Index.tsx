import { Users, ShoppingCart, DollarSign, Coffee, Loader2 } from "lucide-react";
import KpiCard from "@/components/dashboard/KpiCard";
import OrderTrendsChart from "@/components/dashboard/OrderTrendsChart";
import TopDrinksChart from "@/components/dashboard/TopDrinksChart";
import CategoryDonutChart from "@/components/dashboard/CategoryDonutChart";
import PageHeader from "@/components/dashboard/PageHeader";
import { useStarbucksData } from "@/hooks/useStarbucksData";

const Index = () => {
  const { data: aggregates, isLoading } = useStarbucksData();

  if (isLoading || !aggregates) {
    return (
      <div className="flex h-[60vh] items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  const { kpis } = aggregates;

  const kpiData = [
    { label: "Total Samples", value: kpis.total_orders.toLocaleString(), icon: Users },
    { label: "Total Revenue", value: `$${(kpis.total_revenue / 1000000).toFixed(2)}M`, icon: ShoppingCart },
    { label: "Average Spend", value: `$${kpis.avg_spend.toFixed(2)}`, icon: DollarSign },
    { label: "Most Popular Drink", value: kpis.most_popular_drink, icon: Coffee },
  ];

  return (
    <>
      <PageHeader title="Overview" subtitle="Big-picture snapshot of transaction patterns across regions." />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {kpiData.map((kpi, i) => (
          <KpiCard key={kpi.label} {...kpi} delay={i * 50} />
        ))}
      </div>
      <div className="mb-6">
        <OrderTrendsChart data={aggregates.ordersByDay} />
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <TopDrinksChart data={aggregates.drinkDist} />
        <CategoryDonutChart data={aggregates.channelDist} />
      </div>
    </>
  );
};

export default Index;
