import { useQuery } from '@tanstack/react-query';
import { loadStarbucksData, computeAggregates } from '@/data/loader';

export const useStarbucksData = () => {
  return useQuery({
    queryKey: ['starbucksData'],
    queryFn: async () => {
      const rawData = await loadStarbucksData();
      return computeAggregates(rawData);
    },
    staleTime: Infinity, // Keep data forever in cache
  });
};
