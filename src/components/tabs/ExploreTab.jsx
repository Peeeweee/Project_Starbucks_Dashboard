import React from 'react';
import { 
  BarChart, Bar, PieChart, Pie, Cell, 
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer 
} from 'recharts';
import KPICard from '../ui/KPICard';
import ChartCard from '../ui/ChartCard';
import CustomTooltip from '../ui/CustomTooltip';

const ExploreTab = ({ theme, data }) => {
  const { kpis, channelDist, drinkDist, regionDist } = data;

  return (
    <div className="animate-fade-up">
      {/* Row 1: 3-column KPI grid (6 cards) */}
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(3, 1fr)', 
        gap: '1.5rem', 
        marginBottom: '1.5rem' 
      }}>
        <KPICard 
          label="Total Orders" 
          value={kpis.total_orders?.toLocaleString()} 
          theme={theme} 
          delay={0.1} 
        />
        <KPICard 
          label="Total Revenue" 
          value={`$${(kpis.total_revenue / 1000000).toFixed(2)}M`} 
          theme={theme} 
          delay={0.15} 
        />
        <KPICard 
          label="Avg Spend" 
          value={`$${kpis.avg_spend?.toFixed(2)}`} 
          theme={theme} 
          delay={0.2} 
        />
        <KPICard 
          label="Avg Satisfaction" 
          value={`${kpis.avg_satisfaction?.toFixed(2)}/5`} 
          theme={theme} 
          delay={0.25} 
        />
        <KPICard 
          label="Avg Fulfillment" 
          value={`${kpis.avg_fulfillment?.toFixed(2)} min`} 
          theme={theme} 
          delay={0.3} 
        />
        <KPICard 
          label="Rewards Members" 
          value={`${kpis.rewards_pct?.toFixed(1)}%`} 
          theme={theme} 
          delay={0.35} 
        />
      </div>

      {/* Row 2: 2-column chart grid */}
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(2, 1fr)', 
        gap: '1.5rem', 
        marginBottom: '1.5rem' 
      }}>
        <ChartCard 
          title="Order Channel Distribution" 
          subtitle="Volume by channel" 
          theme={theme}
        >
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={channelDist}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={80}
                paddingAngle={5}
                dataKey="count"
                nameKey="channel"
              >
                {channelDist.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={theme.chartColors[index % theme.chartColors.length]} />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip theme={theme} />} />
              <Legend iconType="circle" />
            </PieChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard 
          title="Drink Category Popularity" 
          subtitle="Customer preference breakdown" 
          theme={theme}
        >
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={drinkDist}>
              <CartesianGrid strokeDasharray="3 3" stroke={theme.cardBorder} vertical={false} />
              <XAxis dataKey="drink" stroke={theme.sub} fontSize={10} axisLine={false} tickLine={false} />
              <YAxis stroke={theme.sub} fontSize={12} axisLine={false} tickLine={false} />
              <Tooltip content={<CustomTooltip theme={theme} />} cursor={{ fill: 'rgba(255,255,255,0.05)' }} />
              <Bar dataKey="count" radius={[4, 4, 0, 0]}>
                {drinkDist.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={theme.chartColors[index % theme.chartColors.length]} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>
      </div>

      {/* Row 3: Full-width horizontal BarChart */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr' }}>
        <ChartCard 
          title="Orders by Region" 
          subtitle="Regional distribution of transactions" 
          theme={theme}
          span={1}
        >
          <ResponsiveContainer width="100%" height="180%">
            <BarChart data={regionDist} layout="vertical" margin={{ left: 30, right: 30 }}>
              <CartesianGrid strokeDasharray="3 3" stroke={theme.cardBorder} horizontal={false} />
              <XAxis type="number" hide />
              <YAxis 
                dataKey="region" 
                type="category" 
                stroke={theme.sub} 
                fontSize={12} 
                axisLine={false} 
                tickLine={false}
                width={100}
              />
              <Tooltip content={<CustomTooltip theme={theme} />} cursor={{ fill: 'rgba(255,255,255,0.05)' }} />
              <Bar dataKey="count" radius={[0, 4, 4, 0]} barSize={15}>
                {regionDist.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={theme.chartColors[index % theme.chartColors.length]} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>
      </div>
    </div>
  );
};

export default ExploreTab;
