import React from 'react';
import { 
  BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer 
} from 'recharts';
import ChartCard from '../ui/ChartCard';
import CustomTooltip from '../ui/CustomTooltip';

const SegmentTab = ({ theme, data }) => {
  const { ageSpend, genderDrink, rewardsCompare, locCompare } = data;

  const formatVal = (val, metric) => {
    if (typeof val !== 'number') return val;
    if (metric.includes('Spend')) return `$${val.toFixed(2)}`;
    if (metric.includes('%')) return `${val.toFixed(1)}%`;
    return val.toLocaleString(undefined, { maximumFractionDigits: 2 });
  };

  const comparisonTileStyle = {
    padding: '1.2rem',
    borderRadius: '1.2rem',
    backgroundColor: 'rgba(255,255,255,0.03)',
    border: `1px solid ${theme.cardBorder}`,
    textAlign: 'center',
    transition: 'transform 0.3s ease, background 0.3s ease'
  };

  return (
    <div className="animate-fade-up">
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(2, 1fr)', 
        gap: '2rem', 
        marginBottom: '2rem' 
      }}>
        {/* 1. Avg. Spend by Age Group */}
        <ChartCard 
          title="Avg. Spend by Age Group" 
          subtitle="Customer value across demographic segments" 
          theme={theme}
        >
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={ageSpend}>
              <CartesianGrid strokeDasharray="3 3" stroke={theme.cardBorder} vertical={false} opacity={0.3} />
              <XAxis dataKey="age_group" stroke={theme.sub} fontSize={12} axisLine={false} tickLine={false} />
              <YAxis 
                stroke={theme.sub} 
                fontSize={12} 
                domain={[12, 16.5]} 
                axisLine={false} 
                tickLine={false} 
                tickFormatter={(val) => `$${val}`}
              />
              <Tooltip content={<CustomTooltip theme={theme} />} />
              <Bar dataKey="avg_spend" radius={[6, 6, 0, 0]} barSize={45}>
                {ageSpend.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={theme.chartColors[index % theme.chartColors.length]} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>

        {/* 2. Drink Preferences by Gender */}
        <ChartCard 
          title="Drink Preferences by Gender" 
          subtitle="Volume comparison by beverage category" 
          theme={theme}
        >
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={genderDrink} margin={{ top: 20 }}>
              <CartesianGrid strokeDasharray="3 3" stroke={theme.cardBorder} vertical={false} opacity={0.3} />
              <XAxis dataKey="drink" stroke={theme.sub} fontSize={10} axisLine={false} tickLine={false} />
              <YAxis stroke={theme.sub} fontSize={12} axisLine={false} tickLine={false} />
              <Tooltip content={<CustomTooltip theme={theme} />} />
              <Legend iconType="circle" />
              <Bar dataKey="Female" fill={theme.chartColors[0]} radius={[4, 4, 0, 0]} barSize={18} />
              <Bar dataKey="Male" fill={theme.chartColors[1]} radius={[4, 4, 0, 0]} barSize={18} />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>

        {/* 3. Rewards Members vs. Non-Members (Full width) */}
        <ChartCard 
          title="Rewards Members vs. Non-Members" 
          subtitle="Value and loyalty penetration analysis" 
          theme={theme}
          span={2}
        >
          <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
            {/* TOP SECTION: Comparison Tiles */}
            <div style={{ 
              display: 'grid', 
              gridTemplateColumns: 'repeat(4, 1fr)', 
              gap: '1.2rem', 
              marginBottom: '2.5rem' 
            }}>
              {rewardsCompare.map((item, idx) => (
                <div key={idx} style={comparisonTileStyle} className="premium-card animate-scale-in">
                  <div style={{ 
                    fontSize: '0.65rem', 
                    fontWeight: 900, 
                    color: theme.sub, 
                    textTransform: 'uppercase', 
                    letterSpacing: '1.5px',
                    marginBottom: '0.8rem' 
                  }}>
                    {item.metric}
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'center', gap: '0.8rem', alignItems: 'center' }}>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: '1.2rem', fontWeight: 900, color: theme.accent, fontFamily: 'Playfair Display, serif' }}>
                        {formatVal(item.Members, item.metric)}
                      </div>
                      <div style={{ fontSize: '0.55rem', fontWeight: 700, color: theme.sub, textTransform: 'uppercase', opacity: 0.6 }}>Member</div>
                    </div>
                    <div style={{ width: '1px', height: '2rem', backgroundColor: theme.cardBorder, opacity: 0.5 }}></div>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: '1.2rem', fontWeight: 900, color: theme.accent2, fontFamily: 'Playfair Display, serif' }}>
                        {formatVal(item.NonMembers, item.metric)}
                      </div>
                      <div style={{ fontSize: '0.55rem', fontWeight: 700, color: theme.sub, textTransform: 'uppercase', opacity: 0.6 }}>Guest</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* BOTTOM SECTION: Chart */}
            <div style={{ flex: 1, minHeight: '220px' }}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={rewardsCompare} margin={{ bottom: 20 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke={theme.cardBorder} vertical={false} opacity={0.3} />
                  <XAxis dataKey="metric" stroke={theme.sub} fontSize={12} axisLine={false} tickLine={false} />
                  <YAxis stroke={theme.sub} fontSize={12} axisLine={false} tickLine={false} />
                  <Tooltip content={<CustomTooltip theme={theme} />} />
                  <Legend iconType="circle" />
                  <Bar dataKey="Members" fill={theme.accent} radius={[6, 6, 0, 0]} barSize={35} />
                  <Bar dataKey="NonMembers" fill={theme.accent2} radius={[6, 6, 0, 0]} barSize={35} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </ChartCard>

        {/* 4. Performance by Store Location (Full width) */}
        <ChartCard 
          title="Performance by Store Location" 
          subtitle="Efficiency and satisfaction benchmark across location types" 
          theme={theme}
          span={2}
        >
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={locCompare} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke={theme.cardBorder} vertical={false} />
              <XAxis dataKey="loc" stroke={theme.sub} fontSize={12} axisLine={false} tickLine={false} />
              <YAxis yAxisId="left" orientation="left" stroke={theme.accent} fontSize={12} axisLine={false} tickLine={false} tickFormatter={(v) => `$${v}`} />
              <YAxis yAxisId="right" orientation="right" stroke={theme.sub} fontSize={12} axisLine={false} tickLine={false} />
              <Tooltip content={<CustomTooltip theme={theme} />} />
              <Legend iconType="circle" />
              <Bar yAxisId="left" dataKey="spend" name="Avg Spend ($)" fill={theme.accent} radius={[4, 4, 0, 0]} barSize={20} />
              <Bar yAxisId="right" dataKey="sat" name="Satisfaction (1-5)" fill={theme.accent2} radius={[4, 4, 0, 0]} barSize={20} />
              <Bar yAxisId="right" dataKey="time" name="Fulfillment (Min)" fill={theme.sub} opacity={0.3} radius={[4, 4, 0, 0]} barSize={20} />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>
      </div>
    </div>
  );
};

export default SegmentTab;
