import React from 'react';

const ChartCard = ({ title, subtitle, children, theme, span = 1 }) => {
  return (
    <div 
      className="premium-card animate-fade-up"
      style={{
        gridColumn: `span ${span}`,
        background: theme.card,
        backdropFilter: 'blur(12px)',
        border: `1px solid ${theme.cardBorder}`,
        borderRadius: '1.5rem',
        padding: '2rem',
        display: 'flex',
        flexDirection: 'column',
        minHeight: '450px',
        boxShadow: 'var(--shadow-premium)',
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      {/* Decorative Shine Overlay */}
      <div style={{
        position: 'absolute',
        top: '-50%',
        left: '-50%',
        width: '200%',
        height: '200%',
        background: 'radial-gradient(circle at center, rgba(255,255,255,0.03) 0%, transparent 70%)',
        pointerEvents: 'none'
      }} />

      <div style={{ marginBottom: '1.8rem', position: 'relative' }}>
        <h3 style={{ 
          margin: 0, 
          fontFamily: 'Playfair Display, serif', 
          fontSize: '1.5rem', 
          fontWeight: 900,
          color: theme.text,
          letterSpacing: '-0.3px'
        }}>
          {title}
        </h3>
        {subtitle && (
          <p style={{ 
            fontFamily: 'Lato, sans-serif', 
            fontSize: '0.9rem', 
            color: theme.sub,
            margin: 0
          }}>
            {subtitle}
          </p>
        )}
      </div>
      <div className="chart-container" style={{ height: '300px', width: '100%' }}>
        {children}
      </div>
    </div>
  );
};

export default ChartCard;
