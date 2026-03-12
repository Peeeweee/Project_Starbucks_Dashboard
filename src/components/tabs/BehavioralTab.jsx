import React from 'react';
import { 
  BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, 
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer 
} from 'recharts';
import ChartCard from '../ui/ChartCard';
import CustomTooltip from '../ui/CustomTooltip';

const BehavioralTab = ({ theme, data }) => {
  const { 
    ordersByDay, timeDist, customSpend, cartByDay, orderAheadChannel 
  } = data;

  return (
    <div className="animate-fade-up">
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(2, 1fr)', 
        gap: '1.5rem', 
        marginBottom: '1.5rem' 
      }}>
        {/* 1. Orders by Day of Week */}
        <ChartCard 
          title="Orders by Day of Week" 
          subtitle="Highlighting peak weekend volume" 
          theme={theme}
        >
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={ordersByDay}>
              <CartesianGrid strokeDasharray="3 3" stroke={theme.cardBorder} vertical={false} />
              <XAxis dataKey="day" stroke={theme.sub} fontSize={12} axisLine={false} tickLine={false} />
              <YAxis stroke={theme.sub} fontSize={12} axisLine={false} tickLine={false} />
              <Tooltip content={<CustomTooltip theme={theme} />} cursor={{ fill: 'rgba(0,0,0,0.05)' }} />
              <Bar dataKey="count" radius={[4, 4, 0, 0]}>
                {ordersByDay.map((entry, index) => (
                  <Cell 
                    key={`cell-${index}`} 
                    fill={entry.day === 'Sat' ? theme.accent : theme.accent2} 
                    fillOpacity={entry.day === 'Sat' ? 1 : 0.75}
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>

        {/* 2. Order Volume by Time of Day */}
        <ChartCard 
          title="Order Volume by Time of Day" 
          subtitle="Peak period analysis (Morning through Night)" 
          theme={theme}
        >
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={timeDist}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={80}
                paddingAngle={5}
                dataKey="count"
                nameKey="time_slot"
              >
                {timeDist.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={theme.chartColors[index % theme.chartColors.length]} />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip theme={theme} />} />
              <Legend iconType="circle" />
            </PieChart>
          </ResponsiveContainer>
        </ChartCard>

        {/* 3. Customizations vs. Average Spend (Full width) */}
        <ChartCard 
          title="Customizations vs. Average Spend" 
          subtitle="Correlation between modifications and final ticket price" 
          theme={theme}
          span={2}
        >
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={customSpend} margin={{ left: 20, right: 30, top: 10, bottom: 10 }}>
              <CartesianGrid strokeDasharray="3 3" stroke={theme.cardBorder} vertical={false} />
              <XAxis 
                dataKey="customizations" 
                label={{ value: 'Number of Mods', position: 'insideBottom', offset: -5, fill: theme.sub, fontSize: 12 }} 
                stroke={theme.sub} 
                fontSize={12} 
              />
              <YAxis 
                stroke={theme.sub} 
                fontSize={12} 
                tickFormatter={(val) => `$${val}`} 
              />
              <Tooltip content={<CustomTooltip theme={theme} />} />
              <Line 
                type="monotone" 
                dataKey="avg_spend" 
                name="Avg Spend" 
                stroke={theme.accent} 
                strokeWidth={4} 
                dot={{ r: 6, fill: theme.accent, strokeWidth: 2, stroke: '#fff' }} 
                activeDot={{ r: 8 }} 
              />
            </LineChart>
          </ResponsiveContainer>
        </ChartCard>

        {/* 4. Avg. Cart Size by Day */}
        <ChartCard 
          title="Avg. Cart Size by Day" 
          subtitle="Weekly item volume trends" 
          theme={theme}
        >
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={cartByDay}>
              <CartesianGrid strokeDasharray="3 3" stroke={theme.cardBorder} vertical={false} />
              <XAxis dataKey="day" stroke={theme.sub} fontSize={12} axisLine={false} tickLine={false} />
              <YAxis 
                stroke={theme.sub} 
                fontSize={12} 
                domain={[3.6, 3.9]} 
                axisLine={false} 
                tickLine={false} 
              />
              <Tooltip content={<CustomTooltip theme={theme} />} cursor={{ fill: 'rgba(0,0,0,0.05)' }} />
              <Bar dataKey="avg" fill={theme.accent} radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>

        {/* 5. Order-Ahead Rate by Channel */}
        <ChartCard 
          title="Order-Ahead Rate by Channel" 
          subtitle="Digital channel penetration comparison" 
          theme={theme}
        >
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={orderAheadChannel} layout="vertical" margin={{ left: 40 }}>
              <CartesianGrid strokeDasharray="3 3" stroke={theme.cardBorder} horizontal={false} />
              <XAxis type="number" hide />
              <YAxis 
                dataKey="channel" 
                type="category" 
                stroke={theme.sub} 
                fontSize={12} 
                axisLine={false} 
                tickLine={false}
                width={100}
              />
              <Tooltip content={<CustomTooltip theme={theme} />} cursor={{ fill: 'rgba(0,0,0,0.05)' }} />
              <Bar dataKey="rate" radius={[0, 4, 4, 0]} barSize={20}>
                {orderAheadChannel.map((entry, index) => (
                  <Cell 
                    key={`cell-${index}`} 
                    fill={entry.channel === 'Mobile App' ? theme.accent : '#999'} 
                    fillOpacity={entry.channel === 'Mobile App' ? 1 : 0.3}
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>
      </div>
    </div>
  );
};

export default BehavioralTab;
