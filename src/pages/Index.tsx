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
      <div className="flex h-[65vh] items-center justify-center">
        <Loader2 className="h-10 w-10 animate-spin text-[#006241]" />
      </div>
    );
  }

  const { kpis } = aggregates;

  const kpiData = [
    {
      label: "Total Samples",
      value: kpis.total_orders.toLocaleString(),
      icon: Users,
    },
    {
      label: "Total Revenue",
      value: `$${(kpis.total_revenue / 1000000).toFixed(2)}M`,
      icon: ShoppingCart,
    },
    {
      label: "Average Spend",
      value: `$${kpis.avg_spend.toFixed(2)}`,
      icon: DollarSign,
    },
    {
      label: "Most Popular Drink",
      value: kpis.most_popular_drink,
      icon: Coffee,
    },
  ];

  return (
    <div className="space-y-6">

      <PageHeader
        title="Overview"
        subtitle="Big-picture snapshot of transaction patterns across regions."
      />

      {/* KPI SECTION */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {kpiData.map((kpi, i) => (
          <div
            key={kpi.label}
            className="bg-[#fdfaf6] border border-[#efe8df] rounded-2xl shadow-md hover:shadow-xl transition-all duration-300"
          >
            <KpiCard {...kpi} delay={i * 60} />
          </div>
        ))}
      </div>

      {/* ORDER TRENDS */}
      <div className="bg-[#fdfaf6] border border-[#efe8df] rounded-2xl shadow-md p-4 hover:shadow-xl transition-all duration-300">
        <OrderTrendsChart data={aggregates.ordersByDay} />
      </div>

      {/* BOTTOM CHARTS */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

        <div className="bg-[#fdfaf6] border border-[#efe8df] rounded-2xl shadow-md p-4 hover:shadow-xl transition-all duration-300">
          <TopDrinksChart data={aggregates.drinkDist} />
        </div>

        <div className="bg-[#fdfaf6] border border-[#efe8df] rounded-2xl shadow-md p-4 hover:shadow-xl transition-all duration-300">
          <CategoryDonutChart data={aggregates.channelDist} />
        </div>

      </div>

    </div>
  );
};

export default Index;