import React, { useState } from 'react';

function CCSvgFallback({ card, width = 320, height = 200 }) {
  const isMC = card.network && (card.network.includes('Mastercard') || card.network.includes('MC') || card.network.includes('World'));
  return (
    <svg viewBox="0 0 320 200" width={width} height={height}
      style={{ display: 'block', borderRadius: 14, filter: card.metal ? 'drop-shadow(0 6px 24px rgba(0,0,0,0.6))' : 'drop-shadow(0 4px 16px rgba(0,0,0,0.4))' }}>
      <defs>
        <linearGradient id={`g-${card.id}`} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%"   stopColor={card.g1 || '#1a237e'} />
          <stop offset="50%"  stopColor={card.g2 || '#283593'} />
          <stop offset="100%" stopColor={card.g3 || '#1565c0'} />
        </linearGradient>
        {card.metal && (
          <linearGradient id={`shine-${card.id}`} x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%"   stopColor="rgba(255,255,255,0)" />
            <stop offset="45%"  stopColor="rgba(255,255,255,0.1)" />
            <stop offset="55%"  stopColor="rgba(255,255,255,0.15)" />
            <stop offset="100%" stopColor="rgba(255,255,255,0)" />
          </linearGradient>
        )}
        <clipPath id={`clip-${card.id}`}><rect width="320" height="200" rx="18" /></clipPath>
      </defs>
      <g clipPath={`url(#clip-${card.id})`}>
        <rect width="320" height="200" fill={`url(#g-${card.id})`} />
        <circle cx="270" cy="45"  r="110" fill="rgba(255,255,255,0.05)" />
        <circle cx="290" cy="180" r="90"  fill="rgba(255,255,255,0.04)" />
        <circle cx="30"  cy="170" r="70"  fill="rgba(255,255,255,0.04)" />
        {card.metal && <rect width="320" height="200" fill={`url(#shine-${card.id})`} />}
        {/* Chip */}
        <rect x="24" y="74" width="46" height="34" rx="5" fill={card.chip || '#ffd700'} opacity="0.88" />
        <rect x="24" y="86" width="46" height="3" fill="rgba(0,0,0,0.2)" />
        <rect x="24" y="93" width="46" height="3" fill="rgba(0,0,0,0.2)" />
        <rect x="37" y="74" width="3" height="34" fill="rgba(0,0,0,0.15)" />
        <rect x="51" y="74" width="3" height="34" fill="rgba(0,0,0,0.15)" />
        {/* Contactless */}
        <g transform="translate(81,80)">
          <path d="M0 18 Q9 9 18 18"  stroke={card.accent || '#90caf9'} strokeWidth="2.8" fill="none" strokeLinecap="round" opacity="0.85" />
          <path d="M4 22 Q9 13 14 22" stroke={card.accent || '#90caf9'} strokeWidth="2.2" fill="none" strokeLinecap="round" opacity="0.65" />
          <circle cx="9" cy="25" r="1.8" fill={card.accent || '#90caf9'} opacity="0.85" />
        </g>
        {/* Logo */}
        <text x="24" y="46" fontFamily="Georgia,serif" fontSize="17" fontWeight="700" fill="rgba(255,255,255,0.95)" letterSpacing="2.5">{card.logo || card.bank?.substring(0,4).toUpperCase()}</text>
        {/* Number */}
        <text x="24" y="134" fontFamily="'Courier New',monospace" fontSize="15" fill="rgba(255,255,255,0.8)" letterSpacing="3.5">●●●● ●●●● ●●●● 4521</text>
        {/* Name */}
        <text x="24" y="164" fontFamily="Georgia,serif" fontSize="11" fill="rgba(255,255,255,0.7)" letterSpacing="1.8">
          {(card.fullName || card.name || '').toUpperCase().substring(0, 28)}
        </text>
        {/* Expiry */}
        <text x="24" y="181" fontFamily="'Courier New',monospace" fontSize="10" fill="rgba(255,255,255,0.5)">VALID THRU  12/28</text>
        {/* Fee pill */}
        <rect x="216" y="16" width="88" height="22" rx="11" fill="rgba(0,0,0,0.35)" />
        <text x="260" y="31" fontFamily="Arial,sans-serif" fontSize="10" fontWeight="700" fill="rgba(255,255,255,0.92)" textAnchor="middle">
          {card.annualFee === 0 ? 'LIFETIME FREE' : `₹${(card.annualFee || 0).toLocaleString()}/yr`}
        </text>
        {/* Network */}
        {isMC ? (
          <g transform="translate(272,170)">
            <circle cx="-10" cy="0" r="15" fill="#eb001b" opacity="0.9" />
            <circle cx="8"   cy="0" r="15" fill="#f79e1b" opacity="0.9" />
            <ellipse cx="-1" cy="0" rx="7" ry="15" fill="#ff5f00" opacity="0.85" />
          </g>
        ) : (
          <g transform="translate(260,163)">
            <rect x="0" y="0" width="50" height="22" rx="4" fill="rgba(255,255,255,0.15)" />
            <text x="25" y="16" fontFamily="Arial,sans-serif" fontSize="14" fontWeight="900" fill="rgba(255,255,255,0.92)" textAnchor="middle" letterSpacing="1">VISA</text>
          </g>
        )}
      </g>
    </svg>
  );
}

export default function CreditCardImage({ card, width = 320, height = 200, style = {} }) {
  const [imgErr, setImgErr] = useState(false);
  const wrapStyle = {
    width, height, borderRadius: 14, overflow: 'hidden',
    flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center',
    ...style,
  };

  if (!card.imageUrl || imgErr) {
    return (
      <div style={wrapStyle}>
        <CCSvgFallback card={card} width={width} height={height} />
      </div>
    );
  }

  return (
    <div style={wrapStyle}>
      <img
        src={card.imageUrl}
        alt={card.fullName}
        onError={() => setImgErr(true)}
        style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: 14,
          filter: card.metal ? 'drop-shadow(0 6px 24px rgba(0,0,0,0.6))' : 'drop-shadow(0 4px 16px rgba(0,0,0,0.4))' }}
      />
    </div>
  );
}
