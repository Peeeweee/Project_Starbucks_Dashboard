import React from 'react';

const DashboardHeader = ({ activeTab, onTabChange, theme }) => {
  const tabs = [
    { label: 'Overview', id: 0 },
    { label: 'Behavioral', id: 1 },
    { label: 'Segments', id: 2 }
  ];

  return (
    <div style={{
      position: 'sticky',
      top: 0,
      zIndex: 1000,
      background: theme.headerBg,
      transition: 'all 0.5s ease',
      boxShadow: '0 10px 30px rgba(0,0,0,0.1)'
    }}>
      {/* 1. Brand & Info Bar */}
      <div style={{ 
        height: '70px',
        padding: '0 2rem',
        borderBottom: '1px solid rgba(255,255,255,0.08)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '100%',
        maxWidth: '1300px',
        margin: '0 auto'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <h1 style={{ 
            margin: 0, 
            fontFamily: 'Playfair Display, serif', 
            fontSize: '1.4rem', 
            fontWeight: 900, 
            color: '#FFFFFF' 
          }}>
            Starbucks Insights
          </h1>
        </div>

        <div style={{ textAlign: 'right' }}>
          <div style={{ fontSize: '0.9rem', fontWeight: 900, color: '#FFFFFF' }}>100k Transaction Set</div>
          <div style={{ fontSize: '0.6rem', color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase' }}>Consolidated Analytics</div>
        </div>
      </div>

      {/* 2. Navigation Bar */}
      <nav style={{
        maxWidth: '1300px',
        margin: '0 auto',
        padding: '0 2rem',
        display: 'flex',
        gap: '3rem'
      }}>
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              style={{
                padding: '1.2rem 0',
                background: 'none',
                border: 'none',
                borderBottom: isActive ? `4px solid ${theme.accent}` : '4px solid transparent',
                color: isActive ? '#FFFFFF' : 'rgba(255,255,255,0.4)',
                cursor: 'pointer',
                fontFamily: 'Lato, sans-serif',
                fontWeight: 700,
                fontSize: '0.85rem',
                transition: 'all 0.2s ease',
                textTransform: 'uppercase',
                letterSpacing: '1.5px',
                opacity: isActive ? 1 : 0.8
              }}
            >
              {tab.label}
            </button>
          );
        })}
      </nav>
    </div>
  );
};

export default DashboardHeader;
