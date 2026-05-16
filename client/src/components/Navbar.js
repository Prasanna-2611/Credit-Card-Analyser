import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

const s = {
  nav: {
    position: 'fixed', top: 0, left: 0, right: 0, zIndex: 1000,
    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
    padding: '0 2rem', height: 64,
    transition: 'all 0.3s',
  },
  logo: {
    fontFamily: "'Playfair Display', serif",
    fontSize: 22, fontWeight: 800,
    background: 'linear-gradient(135deg, #c9a84c, #e8c96e)',
    WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
    textDecoration: 'none', letterSpacing: 1,
  },
  links: { display: 'flex', gap: '2rem', alignItems: 'center' },
  cta: {
    padding: '8px 22px', borderRadius: 25,
    background: 'linear-gradient(135deg, #c9a84c, #e8c96e)',
    color: '#0a0a0f', fontWeight: 700, fontSize: 14,
    textDecoration: 'none', transition: 'transform 0.2s, box-shadow 0.2s',
    boxShadow: '0 4px 15px rgba(201,168,76,0.3)',
  },
};

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const loc = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const navStyle = {
    ...s.nav,
    background: scrolled ? 'rgba(10,10,15,0.95)' : 'transparent',
    backdropFilter: scrolled ? 'blur(20px)' : 'none',
    borderBottom: scrolled ? '1px solid rgba(201,168,76,0.15)' : 'none',
    boxShadow: scrolled ? '0 4px 30px rgba(0,0,0,0.5)' : 'none',
  };

  const linkStyle = (path) => ({
    textDecoration: 'none', fontSize: 14, fontWeight: 500,
    color: loc.pathname === path ? '#c9a84c' : '#ccc',
    transition: 'color 0.2s',
    borderBottom: loc.pathname === path ? '2px solid #c9a84c' : '2px solid transparent',
    paddingBottom: 2,
  });

  return (
    <nav style={navStyle}>
      <Link to="/" style={s.logo}>💳 CC Analyser</Link>
      <div style={s.links}>
        <Link to="/" style={linkStyle('/')}>Home</Link>
        <Link to="/cards" style={linkStyle('/cards')}>Explore Cards</Link>
        <Link to="/analyse" style={{ ...s.cta, textDecoration: 'none',
          display: 'inline-block',
          transform: loc.pathname === '/analyse' ? 'scale(0.97)' : 'scale(1)' }}>
          Find My Card ✦
        </Link>
      </div>
    </nav>
  );
}
