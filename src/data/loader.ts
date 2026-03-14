import Papa from 'papaparse';

export interface DataRow {
  total_spend: number | string;
  customer_satisfaction: number | string;
  fulfillment_time_min: number | string;
  is_rewards_member: boolean | string;
  order_channel: string;
  drink_category: string;
  region: string;
  day_of_week: string;
  order_time: string;
  cart_size: number | string;
  num_customizations: number | string;
  customer_age_group: string;
  customer_gender: string;
  order_ahead: boolean | string;
  store_location_type: string;
}

export const loadStarbucksData = (): Promise<DataRow[]> => {
  return new Promise((resolve, reject) => {
    Papa.parse(`${import.meta.env.BASE_URL}data/starbucks_cleaned.csv`, {
      download: true,
      header: true,
      dynamicTyping: true,
      skipEmptyLines: true,
      complete: (results) => {
        resolve(results.data as DataRow[]);
      },
      error: (error: Error) => {
        reject(error);
      },
    });
  });
};

export const computeAggregates = (data: DataRow[]) => {
  if (!data || data.length === 0) return null;

  const daysOrder = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  const ageOrder = ['18-24', '25-34', '35-44', '45-54', '55+'];

  // 1. KPIs
  const total_orders = data.length;
  const total_revenue = data.reduce((acc, row) => acc + (Number(row.total_spend) || 0), 0);
  const avg_spend = total_revenue / total_orders;
  const avg_satisfaction = data.reduce((acc, row) => acc + (Number(row.customer_satisfaction) || 0), 0) / total_orders;
  const avg_fulfillment = data.reduce((acc, row) => acc + (Number(row.fulfillment_time_min) || 0), 0) / total_orders;
  
  const isTrue = (val: any) => val === true || val === 'True' || val === 'true';
  const rewards_members = data.filter(row => isTrue(row.is_rewards_member)).length;
  const rewards_pct = (rewards_members / total_orders) * 100;

  // 2. Channel Distribution
  const channels = [...new Set(data.map(row => row.order_channel))].filter(Boolean);
  const channelDist = channels.map(channel => {
    const count = data.filter(row => row.order_channel === channel).length;
    return { channel, count, pct: (count / total_orders) * 100 };
  });

  // 3. Drink Distribution
  const drinks = [...new Set(data.map(row => row.drink_category))].filter(Boolean);
  const drinkDist = drinks.map(drink => ({
    drink,
    count: data.filter(row => row.drink_category === drink).length
  }));

  // 4. Region Distribution
  const regions = [...new Set(data.map(row => row.region))].filter(Boolean);
  const regionDist = regions.map(region => ({
    region,
    count: data.filter(row => row.region === region).length
  }));

  // 5. Orders By Day
  const ordersByDay = daysOrder.map(day => ({
    day,
    count: data.filter(row => row.day_of_week === day).length
  }));

  // 6. Time Slot Distribution
  const getTimeSlot = (timeStr: string) => {
    if (!timeStr) return 'Night';
    const hour = parseInt(timeStr.split(':')[0]);
    if (hour >= 5 && hour < 12) return 'Morning';
    if (hour >= 12 && hour < 17) return 'Afternoon';
    if (hour >= 17 && hour < 21) return 'Evening';
    if (hour >= 21 && hour <= 23) return 'Late Night';
    return 'Night';
  };
  const timeSlots = ['Morning', 'Afternoon', 'Evening', 'Late Night', 'Night'];
  const timeDist = timeSlots.map(slot => ({
    time_slot: slot,
    count: data.filter(row => getTimeSlot(row.order_time) === slot).length
  }));

  // 7. Spend By Day
  const spendByDay = daysOrder.map(day => {
    const dayData = data.filter(row => row.day_of_week === day);
    const avg = dayData.reduce((acc, row) => acc + (Number(row.total_spend) || 0), 0) / (dayData.length || 1);
    return { day, avg_spend: avg };
  });

  // 8. Custom Spend
  const customSpend = Array.from({ length: 7 }, (_, i) => {
    const subset = data.filter(row => Number(row.num_customizations) === i);
    const avg = subset.reduce((acc, row) => acc + (Number(row.total_spend) || 0), 0) / (subset.length || 1);
    return { customizations: i, avg_spend: avg };
  });

  // 9. Age Spend
  const ageSpend = ageOrder.map(age => {
    const subset = data.filter(row => row.customer_age_group === age);
    const avg = subset.reduce((acc, row) => acc + (Number(row.total_spend) || 0), 0) / (subset.length || 1);
    return { age_group: age, avg_spend: avg };
  });

  // 10. Gender Drink
  const genders = ['Female', 'Male'];
  const genderDrink = drinkDist.map(d => {
    const result: any = { drink: d.drink };
    genders.forEach(g => {
      result[g] = data.filter(row => row.drink_category === d.drink && row.customer_gender === g).length;
    });
    return result;
  });

  // 11. Rewards Compare
  const rewardsCompare = [
    { metric: 'Avg Spend', key: 'total_spend' },
    { metric: 'Avg Satisfaction', key: 'customer_satisfaction' },
    { metric: 'Avg Cart Size', key: 'cart_size' },
    { metric: 'Order Ahead Rate', key: 'order_ahead' },
  ].map(m => {
    const members = data.filter(row => isTrue(row.is_rewards_member));
    const nonMembers = data.filter(row => !isTrue(row.is_rewards_member));
    
    if (m.key === 'order_ahead') {
      const mRate = (members.filter(row => isTrue(row.order_ahead)).length / (members.length || 1)) * 100;
      const nmRate = (nonMembers.filter(row => isTrue(row.order_ahead)).length / (nonMembers.length || 1)) * 100;
      return { metric: m.metric, Members: mRate, NonMembers: nmRate };
    } else {
      const mAvg = members.reduce((acc, row) => acc + (Number(row[m.key as keyof DataRow]) || 0), 0) / (members.length || 1);
      const nmAvg = nonMembers.reduce((acc, row) => acc + (Number(row[m.key as keyof DataRow]) || 0), 0) / (nonMembers.length || 1);
      return { metric: m.metric, Members: mAvg, NonMembers: nmAvg };
    }
  });

  // 12. Location Compare
  const locations = ['Urban', 'Suburban', 'Rural'];
  const locCompare = locations.map(loc => {
    const subset = data.filter(row => row.store_location_type === loc);
    const spend = subset.reduce((acc, row) => acc + (Number(row.total_spend) || 0), 0) / (subset.length || 1);
    const sat = subset.reduce((acc, row) => acc + (Number(row.customer_satisfaction) || 0), 0) / (subset.length || 1);
    const time = subset.reduce((acc, row) => acc + (Number(row.fulfillment_time_min) || 0), 0) / (subset.length || 1);
    return { loc, spend, sat, time };
  });

  // 13. Order Ahead Channel
  const orderAheadChannel = channels.map(channel => {
    const subset = data.filter(row => row.order_channel === channel);
    const rate = (subset.filter(row => isTrue(row.order_ahead)).length / (subset.length || 1)) * 100;
    return { channel, rate };
  });

  return {
    kpis: { 
      total_orders, 
      total_revenue, 
      avg_spend, 
      avg_satisfaction, 
      avg_fulfillment, 
      rewards_pct, 
      most_popular_drink: drinkDist.sort((a, b) => b.count - a.count)[0]?.drink || 'N/A'
    },
    channelDist,
    drinkDist,
    regionDist,
    ordersByDay,
    timeDist,
    spendByDay,
    customSpend,
    ageSpend,
    genderDrink,
    rewardsCompare,
    locCompare,
    orderAheadChannel
  };
};
