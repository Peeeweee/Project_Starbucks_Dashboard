import React, { useState, useEffect } from 'react';
import { loadStarbucksData, computeAggregates } from './data/loader';
import { THEMES } from './styles/themes';
import './styles/global.css';

// UI Components
import DashboardHeader from './components/ui/DashboardHeader';

// Tabs
import ExploreTab from './components/tabs/ExploreTab';
import BehavioralTab from './components/tabs/BehavioralTab';
import SegmentTab from './components/tabs/SegmentTab';

const App = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState(0);

  const currentTheme = THEMES[activeTab];

  useEffect(() => {
    loadStarbucksData()
      .then(raw => {
        const aggregates = computeAggregates(raw);
        setData(aggregates);
        setLoading(false);
      })
      .catch(err => {
        console.error("Error loading Starbucks data:", err);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    if (!loading && currentTheme) {
      document.body.style.transition = 'background 0.5s ease, color 0.5s ease';
      document.body.style.background = currentTheme.bg;
      document.body.style.color = currentTheme.text;
    }
  }, [currentTheme, loading]);

  if (loading) {
    return (
      <div style={{ 
        height: '100vh', 
        display: 'flex', 
        flexDirection: 'column', 
        alignItems: 'center', 
        justifyContent: 'center',
        background: '#0B1A16', // Deep Forest
        color: '#fff',
        fontFamily: 'Playfair Display, serif'
      }}>
        <div style={{ 
          fontSize: '2rem', 
          fontWeight: 900,
          marginBottom: '2rem',
          letterSpacing: '4px',
          textTransform: 'uppercase',
          opacity: 0.8
        }} className="animate-fade-up">STARBUCKS</div>
        <div style={{ textAlign: 'center' }}>
          <h2 style={{ fontSize: '1.2rem', fontWeight: 400, margin: 0, opacity: 0.6 }}>Brewing Insights...</h2>
          <div style={{ 
            marginTop: '1.5rem', 
            height: '2px', 
            width: '120px', 
            background: 'rgba(255,255,255,0.1)', 
            margin: '1.5rem auto' 
          }}>
            <div style={{ 
              height: '100%', 
              width: '40%', 
              background: '#00A862', 
              animation: 'shimmer 1.5s infinite linear' 
            }} />
          </div>
        </div>
      </div>
    );
  }

  const tabContent = [
    {
      title: "Market Overview",
      desc: "Big-picture snapshot of all 100,000 Starbucks transactions (2024–2025)",
      id: "OVERVIEW"
    },
    {
      title: "Behavioral Patterns",
      desc: "Temporal and behavioral patterns in how customers order",
      id: "BEHAVIORAL"
    },
    {
      title: "Segment Analytics",
      desc: "Head-to-head comparisons across demographics and loyalty segments",
      id: "SEGMENTS"
    }
  ];

  return (
    <div className="app-container" style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <DashboardHeader 
        activeTab={activeTab} 
        onTabChange={setActiveTab} 
        theme={currentTheme} 
      />
      
      <main style={{ 
        maxWidth: '1300px', 
        width: '100%',
        margin: '0 auto', 
        padding: '40px' 
      }}>
        {/* Modern Tab Header Banner */}
        <div className="animate-slide-in" style={{ 
          display: 'flex',
          alignItems: 'center',
          gap: '2.5rem',
          marginBottom: '3rem',
          padding: '2rem',
          background: currentTheme.card,
          borderRadius: '1.5rem',
          border: `1px solid ${currentTheme.cardBorder}`,
          backdropFilter: 'blur(10px)',
          boxShadow: '0 10px 30px rgba(0,0,0,0.05)'
        }}>
          <div style={{
            fontSize: '0.7rem',
            padding: '0.8rem 1.2rem',
            background: currentTheme.accent,
            color: '#fff',
            borderRadius: '0.5rem',
            fontWeight: 900,
            letterSpacing: '1px'
          }}>
            {tabContent[activeTab].id}
          </div>
          <div>
            <h2 style={{ 
              margin: 0, 
              fontSize: '2rem', 
              fontWeight: 900, 
              color: currentTheme.text // FIXED VISIBILITY
            }}>{tabContent[activeTab].title}</h2>
            <p style={{ 
              margin: '0.4rem 0 0 0', 
              color: currentTheme.sub, 
              fontSize: '1.1rem',
              fontWeight: 400
            }}>
              {tabContent[activeTab].desc}
            </p>
          </div>
        </div>

        {/* Tab Content with staggered entrance */}
        <div key={activeTab} className="animate-fade-up" style={{ transition: 'all 0.5s ease' }}>
          {activeTab === 0 && <ExploreTab theme={currentTheme} data={data} />}
          {activeTab === 1 && <BehavioralTab theme={currentTheme} data={data} />}
          {activeTab === 2 && <SegmentTab theme={currentTheme} data={data} />}
        </div>
      </main>

      <footer style={{ 
        marginTop: 'auto',
        padding: '4rem 0', 
        textAlign: 'center', 
        color: currentTheme.sub,
        fontSize: '0.85rem',
        borderTop: `1px solid ${currentTheme.cardBorder}`,
        opacity: 0.8
      }}>
        <div style={{ opacity: 0.5 }}>Designed for Starbucks Corporate Strategy Team</div>
        <div style={{ fontWeight: 900, marginTop: '0.5rem', color: currentTheme.accent }}>Antigravity Analytics v2.4 (Premium Edition)</div>
      </footer>
    </div>
  );
};

export default App;
