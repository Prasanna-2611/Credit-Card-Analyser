import React from 'react';

export default function RangeSlider({ label, emoji, value, onChange, min, max, step, format, color = '#c9a84c' }) {
  const pct = ((value - min) / (max - min)) * 100;
  const trackStyle = {
    background: `linear-gradient(90deg, ${color} ${pct}%, rgba(255,255,255,0.1) ${pct}%)`,
  };

  return (
    <div style={{ marginBottom: '1.6rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
        <label style={{ fontSize: 14, color: '#aaa', display: 'flex', alignItems: 'center', gap: 8 }}>
          {emoji && <span style={{ fontSize: 18 }}>{emoji}</span>}
          {label}
        </label>
        <span style={{
          fontSize: 13, fontWeight: 700, color: '#0a0a0f',
          background: `linear-gradient(135deg, ${color}, #e8c96e)`,
          padding: '4px 14px', borderRadius: 20, minWidth: 110, textAlign: 'center',
          boxShadow: `0 2px 10px ${color}44`,
        }}>
          {format(value)}
        </span>
      </div>

      <div style={{ position: 'relative', height: 6, borderRadius: 3, ...trackStyle }}>
        <input
          type="range" min={min} max={max} step={step} value={value}
          onChange={e => onChange(Number(e.target.value))}
          style={{ position: 'absolute', inset: '-8px 0', width: '100%', height: 22, opacity: 0, cursor: 'pointer', zIndex: 2 }}
        />
        <div style={{
          position: 'absolute', top: '50%', left: `${pct}%`,
          transform: 'translate(-50%, -50%)',
          width: 22, height: 22, borderRadius: '50%',
          background: color, border: '3px solid #fff',
          boxShadow: `0 0 12px ${color}88`,
          pointerEvents: 'none', transition: 'left 0.05s',
        }} />
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 6 }}>
        <span style={{ fontSize: 11, color: '#555' }}>{format(min)}</span>
        <span style={{ fontSize: 11, color: '#555' }}>{format(max)}</span>
      </div>
    </div>
  );
}
