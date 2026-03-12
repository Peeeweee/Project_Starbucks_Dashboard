import React from 'react';

const CustomTooltip = ({ active, payload, label, theme }) => {
  if (active && payload && payload.length) {
    return (
      <div style={{
        backgroundColor: theme.card,
        backdropFilter: 'blur(12px)',
        border: `1px solid ${theme.cardBorder}`,
        padding: '1rem',
        borderRadius: '0.75rem',
        boxShadow: '0 10px 25px rgba(0,0,0,0.1)',
        color: theme.text,
        fontFamily: 'Lato, sans-serif'
      }}>
        <div style={{ 
          fontSize: '0.9rem', 
          fontWeight: 700, 
          color: theme.accent, 
          marginBottom: '0.5rem',
          fontFamily: 'Playfair Display, serif'
        }}>
          {label}
        </div>
        {payload.map((entry, index) => (
          <div key={index} style={{ 
            fontSize: '0.85rem', 
            display: 'flex', 
            justifyContent: 'space-between', 
            gap: '1rem',
            alignItems: 'center',
            marginBottom: index === payload.length - 1 ? 0 : '0.25rem'
          }}>
            <span style={{ color: theme.sub }}>{entry.name}:</span>
            <span style={{ fontWeight: 600 }}>
              {typeof entry.value === 'number' ? 
                (entry.value > 1000 ? entry.value.toLocaleString() : entry.value.toFixed(2)) 
                : entry.value}
            </span>
          </div>
        ))}
      </div>
    );
  }

  return null;
};

export default CustomTooltip;
