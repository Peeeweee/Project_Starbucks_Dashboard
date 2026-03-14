import { useQuery } from '@tanstack/react-query';
import { loadStarbucksData, computeAggregates } from '@/data/loader';

export interface DashboardFilters {
  region: string;
  storeType: string;
}

export const useRawData = () => {
  return useQuery({
    queryKey: ['starbucksRawData'],
    queryFn: loadStarbucksData,
    staleTime: Infinity,
  });
};

export const useStarbucksData = (filters: DashboardFilters = { region: 'All Regions', storeType: 'All Types' }) => {
  const { 
    data: rawData, 
    isLoading: isRawLoading, 
    isError: isRawError, 
    error: rawError 
  } = useRawData();

  const query = useQuery({
    queryKey: ['starbucksData', filters, !!rawData],
    queryFn: () => {
      if (!rawData) return null;
      
      let filteredData = rawData;
      
      if (filters.region && filters.region !== 'All Regions') {
        filteredData = filteredData.filter(row => String(row.region) === filters.region);
      }
      
      if (filters.storeType && filters.storeType !== 'All Types') {
        filteredData = filteredData.filter(row => String(row.store_location_type) === filters.storeType);
      }
      
      const results = computeAggregates(filteredData);
      return results || { 
        kpis: { total_orders: 0, total_revenue: 0, avg_spend: 0, avg_satisfaction: 0, avg_fulfillment: 0, rewards_pct: 0, most_popular_drink: 'N/A' },
        channelDist: [], drinkDist: [], regionDist: [], ordersByDay: [], timeDist: [], cartByDay: [], customSpend: [], ageSpend: [], genderDrink: [], rewardsCompare: [], locCompare: [], orderAheadChannel: []
      };
    },
    enabled: !!rawData,
    staleTime: 1000 * 60 * 5,
  });

  return {
    ...query,
    isRawLoading,
    isRawError,
    rawError
  };
};
