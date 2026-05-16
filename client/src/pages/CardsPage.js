import React, { useState, useEffect, useRef } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import CreditCardImage from '../components/CreditCardImage';

const CAT_META = {
  cashback: { label:'Cashback Cards',    emoji:'💰', color:'#4f8ef7', desc:'Get money back on every purchase. No complexity — just guaranteed savings.', banner:'Turn Every Rupee Into Savings.' },
  rewards:  { label:'Rewards / Points',  emoji:'🏆', color:'#4caf50', desc:'Accumulate points and redeem for flights, hotels, vouchers, or cashback.',  banner:'Every Swipe Earns You More.' },
  travel:   { label:'Travelling Cards',  emoji:'✈️', color:'#00bcd4', desc:'Miles, lounge access, zero forex markup, and travel insurance for globetrotters.', banner:'The World Is Your Reward.' },
  premium:  { label:'Premium Cards',     emoji:'👑', color:'#c9a84c', desc:'Ultra-high rewards, unlimited lounge access, and luxury lifestyle perks.',    banner:'Exclusivity. Reimagined.' },
  student:  { label:'Student Cards',     emoji:'🎓', color:'#ab47bc', desc:'Start your credit journey — no income proof needed. Build your future today.', banner:'Your First Step to Financial Freedom.' },
};

export default function CardsPage() {
  const [params, setParams] = useSearchParams();
  const navigate = useNavigate();
  const [activeCategory, setActiveCategory] = useState(params.get('category') || null);
  const [cards, setCards] = useState([]);
  const [loading, setLoading] = useState(false);
  const [expanded, setExpanded] = useState(null);
  const cardsRef = useRef(null);

  useEffect(() => {
    if (activeCategory) {
      fetchCards(activeCategory);
    }
  }, [activeCategory]);

  useEffect(() => {
    const cat = params.get('category');
    if (cat && cat !== activeCategory) {
      setActiveCategory(cat);
    }
  }, [params]);

  const fetchCards = async (cat) => {
    setLoading(true);
    setCards([]);
    try {
      const res = await axios.get(`/api/cards?category=${cat}`);
      setCards(res.data.data || []);
    } catch (err) {
      console.error('Failed to fetch cards:', err);
    } finally {
      setLoading(false);
      setTimeout(() => cardsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 100);
    }
  };

  const handleCatClick = (key) => {
    setActiveCategory(key);
    setExpanded(null);
    setParams({ category: key });
  };

  return (
    <div style={{ paddingTop: 64, minHeight: '100vh' }}>
      {/* Hero */}
      <div style={{ padding:'4rem 1.5rem 2rem', textAlign:'center', background:'linear-gradient(180deg,#0d0d16 0%,#0a0a0f 100%)', position:'relative', overflow:'hidden' }}>
        <div style={{ position:'absolute', top:'20%', left:'15%', width:300, height:300, borderRadius:'50%', background:'radial-gradient(circle,rgba(201,168,76,0.08) 0%,transparent 70%)', filter:'blur(40px)' }} />
        <div style={{ fontSize:11, letterSpacing:3, color:'#c9a84c', textTransform:'uppercase', marginBottom:12 }}>Browse by Category</div>
        <h1 style={{ fontFamily:"'Playfair Display',serif", fontSize:'clamp(2rem,4vw,3rem)', fontWeight:800, color:'#f0f0f0', marginBottom:12 }}>
          {activeCategory ? CAT_META[activeCategory]?.banner : 'Explore All Credit Cards'}
        </h1>
        <p style={{ color:'#888', fontSize:15, maxWidth:560, margin:'0 auto' }}>
          {activeCategory ? CAT_META[activeCategory]?.desc : 'Select a card category below to see the best options available.'}
        </p>
      </div>

      {/* Category Selector — horizontal scroll tabs */}
      <div style={{ background:'#0d0d16', position:'sticky', top:64, zIndex:100, borderBottom:'1px solid rgba(255,255,255,0.07)', padding:'0 1rem' }}>
        <div style={{ maxWidth:1060, margin:'0 auto', display:'flex', gap:4, overflowX:'auto', paddingBottom:2 }}>
          {Object.entries(CAT_META).map(([key, meta]) => {
            const active = activeCategory === key;
            return (
              <button key={key} onClick={() => handleCatClick(key)} style={{
                flexShrink:0, display:'flex', alignItems:'center', gap:8, padding:'14px 22px',
                background:'transparent', border:'none', cursor:'pointer',
                borderBottom: active ? `3px solid ${meta.color}` : '3px solid transparent',
                color: active ? meta.color : '#777',
                fontWeight: active ? 700 : 400, fontSize:14, transition:'all 0.2s',
                whiteSpace:'nowrap',
              }}>
                <span style={{ fontSize:18 }}>{meta.emoji}</span>
                {meta.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Cards Section */}
      <div ref={cardsRef} style={{ maxWidth:1060, margin:'0 auto', padding:'2.5rem 1.5rem' }}>
        {!activeCategory && (
          <div style={{ textAlign:'center', padding:'5rem 1rem' }}>
            <div style={{ fontSize:64, marginBottom:16 }}>☝️</div>
            <p style={{ color:'#666', fontSize:16 }}>Select a card category above to explore cards</p>
            <p style={{ color:'#444', fontSize:13, marginTop:8 }}>Choose from Cashback, Rewards, Travel, Premium, or Student cards</p>
          </div>
        )}

        {loading && (
          <div style={{ textAlign:'center', padding:'5rem 1rem' }}>
            <div style={{ width:48, height:48, border:'3px solid rgba(201,168,76,0.2)', borderTopColor:'#c9a84c', borderRadius:'50%', animation:'spin 0.8s linear infinite', margin:'0 auto 16px' }} />
            <p style={{ color:'#666' }}>Loading cards...</p>
          </div>
        )}

        {!loading && activeCategory && cards.length > 0 && (
          <>
            <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:'1.5rem', flexWrap:'wrap', gap:8 }}>
              <div>
                <h2 style={{ fontSize:20, fontWeight:700, color:'#f0f0f0', marginBottom:4 }}>
                  {CAT_META[activeCategory]?.emoji} {CAT_META[activeCategory]?.label}
                </h2>
                <p style={{ fontSize:13, color:'#666' }}>{cards.length} cards available in this category</p>
              </div>
              <button onClick={() => navigate('/analyse')} style={{ padding:'10px 22px', borderRadius:25, background:'linear-gradient(135deg,#c9a84c,#e8c96e)', color:'#0a0a0f', fontWeight:700, fontSize:13, border:'none', cursor:'pointer' }}>
                Find My Best Match ✦
              </button>
            </div>

            <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(290px,1fr))', gap:22 }}>
              {cards.map((card, i) => (
                <CardTile key={card.id} card={card} meta={CAT_META[activeCategory]} expanded={expanded === card.id} onExpand={() => setExpanded(expanded === card.id ? null : card.id)} delay={i * 0.08} />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}

function CardTile({ card, meta, expanded, onExpand, delay }) {
  return (
    <div style={{ background:'#16161f', borderRadius:20, overflow:'hidden', border:`1px solid ${expanded ? meta.color + '55' : 'rgba(255,255,255,0.07)'}`, transition:'all 0.35s', transform: expanded ? 'scale(1.01)' : 'scale(1)', animation:`fadeUp 0.5s ${delay}s ease both`, boxShadow: expanded ? `0 8px 40px ${meta.color}22` : 'none' }}>
      {/* Card image */}
      <div style={{ padding:'1.4rem', background:`linear-gradient(135deg,${meta.color}15,${meta.color}08)`, display:'flex', justifyContent:'center' }}>
        <CreditCardImage card={card} width={280} height={175} />
      </div>

      {/* Info */}
      <div style={{ padding:'1.2rem' }}>
        <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start', marginBottom:8 }}>
          <div>
            <div style={{ fontSize:11, color: meta.color, fontWeight:600, marginBottom:3 }}>{card.bank}</div>
            <h3 style={{ fontSize:15, fontWeight:700, color:'#f0f0f0', lineHeight:1.3 }}>{card.fullName}</h3>
          </div>
          {card.metal && <span style={{ fontSize:10, padding:'3px 8px', borderRadius:8, background:'rgba(201,168,76,0.2)', color:'#c9a84c', fontWeight:700, flexShrink:0 }}>Metal</span>}
        </div>

        <div style={{ display:'flex', justifyContent:'space-between', marginBottom:12, padding:'10px', background:'rgba(255,255,255,0.03)', borderRadius:10 }}>
          <div>
            <div style={{ fontSize:10, color:'#555', marginBottom:2 }}>Annual Fee</div>
            <div style={{ fontSize:16, fontWeight:800, color: card.annualFee === 0 ? '#4caf50' : '#f0f0f0' }}>
              {card.annualFee === 0 ? 'FREE' : `₹${card.annualFee.toLocaleString()}`}
            </div>
          </div>
          <div style={{ textAlign:'right' }}>
            <div style={{ fontSize:10, color:'#555', marginBottom:2 }}>Min Income</div>
            <div style={{ fontSize:13, fontWeight:600, color:'#ccc' }}>{card.minIncomeLabel}</div>
          </div>
        </div>

        <div style={{ fontSize:10, padding:'3px 10px', borderRadius:10, background:`${meta.color}20`, color:meta.color, fontWeight:700, display:'inline-block', marginBottom:12 }}>
          {card.tag}
        </div>

        <button onClick={onExpand} style={{ width:'100%', padding:'8px', borderRadius:10, background:'rgba(255,255,255,0.05)', border:`1px solid ${expanded ? meta.color+'44' : 'rgba(255,255,255,0.1)'}`, color:'#bbb', fontSize:13, cursor:'pointer', marginBottom:10, transition:'all 0.2s' }}>
          {expanded ? '▲ Hide Details' : '▼ View Details'}
        </button>

        {expanded && (
          <div style={{ borderTop:'1px solid rgba(255,255,255,0.07)', paddingTop:12, marginBottom:12 }}>
            <div style={{ fontSize:12, fontWeight:700, color:'#f0f0f0', marginBottom:8 }}>Key Benefits</div>
            {card.keyBenefits?.map((b, i) => (
              <div key={i} style={{ fontSize:12, color:'#888', display:'flex', gap:8, marginBottom:6, lineHeight:1.4 }}>
                <span style={{ color: meta.color, flexShrink:0 }}>✓</span>{b}
              </div>
            ))}
            <div style={{ marginTop:10, fontSize:12, color:'#666' }}>
              <span style={{ color:'#555' }}>Fee waiver: </span>{card.feeWaiver}
            </div>
            <div style={{ fontSize:12, color:'#666', marginTop:4 }}>
              <span style={{ color:'#555' }}>Min credit score: </span>
              {card.minCreditScore === 0 ? 'Not required' : card.minCreditScore + '+'}
            </div>
            <div style={{ fontSize:12, color:'#666', marginTop:4 }}>
              <span style={{ color:'#555' }}>Best for: </span>{card.bestFor?.join(', ')}
            </div>
          </div>
        )}

        <a href={card.applyLink} target="_blank" rel="noopener noreferrer" style={{ display:'block', textAlign:'center', padding:'11px', borderRadius:12, background:`linear-gradient(135deg,${meta.color},${meta.color}cc)`, color:'#fff', textDecoration:'none', fontWeight:700, fontSize:14, transition:'all 0.2s' }}
          onMouseOver={e=>e.currentTarget.style.opacity='0.85'}
          onMouseOut={e=>e.currentTarget.style.opacity='1'}>
          Apply Now ↗
        </a>
      </div>
    </div>
  );
}
