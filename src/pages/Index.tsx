import { useState } from "react";
import { Users, ShoppingCart, DollarSign, Coffee, Loader2, Filter, Calendar, MapPin, ChevronDown, Activity, Package, Clock } from "lucide-react";
import KpiCard from "@/components/dashboard/KpiCard";
import OrderTrendsChart from "@/components/dashboard/OrderTrendsChart";
import TopDrinksChart from "@/components/dashboard/TopDrinksChart";
import CategoryDonutChart from "@/components/dashboard/CategoryDonutChart";
import RewardsCompareChart from "@/components/dashboard/RewardsCompareChart";
import PageHeader from "@/components/dashboard/PageHeader";
import { useStarbucksData } from "@/hooks/useStarbucksData";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const Index = () => {
  const [filters, setFilters] = useState({ region: "All Regions", storeType: "All Types" });
  const { data: aggregates, isLoading } = useStarbucksData(filters);

  if (isLoading || !aggregates) {
    return (
      <div className="flex h-[60vh] items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  const { kpis } = aggregates;

  const kpiData = [
    { label: "Total Orders", value: kpis.total_orders.toLocaleString(), icon: Users },
    { label: "Money Made", value: `$${(kpis.total_revenue / 1000000).toFixed(2)}M`, icon: ShoppingCart },
    { label: "Average Spend", value: `$${kpis.avg_spend.toFixed(2)}`, icon: DollarSign },
    { label: "Happy Score", value: `${kpis.avg_satisfaction.toFixed(1)}/5`, icon: Activity },
  ];

  const regions = ["All Regions", "Midwest", "Northeast", "Southeast", "Southwest", "West"];
  const storeTypes = ["All Types", "Urban", "Suburban", "Rural"];

  return (
    <div className="space-y-16 pb-32">
      {/* Executive Header & Strategic Filters */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 border-b border-border/20 pb-12">
        <PageHeader 
          title="Starbucks Customer Analytics" 
          subtitle="See how people buy Starbucks drinks and what they like across different places." 
        />
        
        <div className="flex flex-wrap items-center gap-3">
          {/* Region Filter */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="flex items-center gap-2 px-5 py-3 bg-white border border-border shadow-sm rounded-2xl text-sm font-bold text-foreground hover:bg-muted/50 transition-all active:scale-95 outline-none">
                <MapPin className="h-4 w-4 text-primary" />
                {filters.region}
                <ChevronDown className="h-4 w-4 text-muted-foreground ml-1" />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="bg-white rounded-xl shadow-xl border border-border min-w-[160px]">
              {regions.map((region) => (
                <DropdownMenuItem 
                  key={region}
                  onClick={() => setFilters({ ...filters, region })}
                  className="px-4 py-2 text-sm font-medium hover:bg-primary/5 hover:text-primary cursor-pointer transition-colors"
                >
                  {region}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Store Type Filter */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="flex items-center gap-2 px-5 py-3 bg-white border border-border shadow-sm rounded-2xl text-sm font-bold text-foreground hover:bg-muted/50 transition-all active:scale-95 outline-none">
                <Coffee className="h-4 w-4 text-primary" />
                {filters.storeType}
                <ChevronDown className="h-4 w-4 text-muted-foreground ml-1" />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="bg-white rounded-xl shadow-xl border border-border min-w-[160px]">
              {storeTypes.map((type) => (
                <DropdownMenuItem 
                  key={type}
                  onClick={() => setFilters({ ...filters, storeType: type })}
                  className="px-4 py-2 text-sm font-medium hover:bg-primary/5 hover:text-primary cursor-pointer transition-colors"
                >
                  {type}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          <button className="flex items-center gap-2 px-6 py-3 bg-primary text-white shadow-xl shadow-primary/20 rounded-2xl text-sm font-bold hover:opacity-90 transition-all active:scale-95">
            <Filter className="h-4 w-4 mr-1" />
            Basic Filters
          </button>
        </div>
      </div>

      {/* KPI Section */}
      <section>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {kpiData.map((kpi, i) => (
            <KpiCard key={kpi.label} {...kpi} delay={i * 75} />
          ))}
        </div>
      </section>

      {/* Section 1: Business Momentum & Product Performance */}
      <section className="space-y-10">
        <div className="flex items-center gap-4">
          <div className="h-10 w-1.5 bg-primary rounded-full" />
          <div>
            <h2 className="text-2xl font-bold text-foreground tracking-tight flex items-center gap-2">
              <Activity className="text-primary h-6 w-6" /> Popular Drinks & Sales
            </h2>
            <p className="text-muted-foreground text-sm font-medium">See which drinks are favorites and how many people are buying them.</p>
          </div>
        </div>
        
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-10">
           <div className="xl:col-span-2">
             <OrderTrendsChart data={aggregates.ordersByDay} />
           </div>
           <div className="xl:col-span-1">
             <TopDrinksChart data={aggregates.drinkDist} />
           </div>
        </div>
      </section>

      <div className="section-divider" />

      {/* Section 2: Customer Behavior & Loyalty */}
      <section className="space-y-10">
        <div className="flex items-center gap-4">
          <div className="h-10 w-1.5 bg-primary rounded-full" />
          <div>
            <h2 className="text-2xl font-bold text-foreground tracking-tight flex items-center gap-2">
              <Package className="text-primary h-6 w-6" /> How People Shop
            </h2>
            <p className="text-muted-foreground text-sm font-medium">See how people use their rewards and pick their drinks.</p>
          </div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-5 gap-10">
           <div className="xl:col-span-3">
             <RewardsCompareChart data={aggregates.rewardsCompare} />
           </div>
           <div className="xl:col-span-2">
             <CategoryDonutChart data={aggregates.channelDist} />
           </div>
        </div>
      </section>

    </div>
  );
};

export default Index;
