import React from 'react';

const KPICard = ({ label, value, sub, icon, theme, delay = 0 }) => {
  return (
    <div 
      className="premium-card animate-scale-in" 
      style={{ 
        background: theme.card,
        backdropFilter: 'blur(12px)',
        border: `1px solid ${theme.cardBorder}`,
        borderRadius: '1.5rem',
        padding: '1.5rem',
        position: 'relative',
        overflow: 'hidden',
        animationDelay: `${delay}s`,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        minHeight: '140px'
      }}
    >
      {/* Glossy Overlay */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        height: '50%',
        background: 'linear-gradient(rgba(255,255,255,0.05), transparent)',
        pointerEvents: 'none'
      }} />

      <div>
        <div style={{ 
          fontSize: '0.7rem', 
          fontWeight: 900, 
          color: theme.sub, 
          textTransform: 'uppercase', 
          letterSpacing: '1.5px',
          marginBottom: '0.5rem'
        }}>
          {label}
        </div>
        <div style={{ 
          fontSize: '2.2rem', 
          fontWeight: 900, 
          color: theme.accent, 
          fontFamily: 'Playfair Display, serif',
          lineHeight: 1
        }}>
          {value}
        </div>
      </div>

      {sub && (
        <div style={{ fontSize: '0.85rem', color: theme.sub, marginTop: '0.5rem' }}>
          {sub}
        </div>
      )}
    </div>
  );
};

export default KPICard;
