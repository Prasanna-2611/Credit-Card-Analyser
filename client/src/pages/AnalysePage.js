import React, { useState } from 'react';
import axios from 'axios';
import RangeSlider from '../components/RangeSlider';
import CreditCardImage from '../components/CreditCardImage';

const CAT_META = {
  cashback:{ color:'#4f8ef7', light:'rgba(79,142,247,0.15)', emoji:'💰', label:'Cashback' },
  rewards: { color:'#4caf50', light:'rgba(76,175,80,0.15)',  emoji:'🏆', label:'Rewards' },
  travel:  { color:'#00bcd4', light:'rgba(0,188,212,0.15)',  emoji:'✈️', label:'Travel' },
  premium: { color:'#c9a84c', light:'rgba(201,168,76,0.15)', emoji:'👑', label:'Premium' },
  student: { color:'#ab47bc', light:'rgba(171,71,188,0.15)', emoji:'🎓', label:'Student' },
};

const EXPENSES = [
  { id:'online_shopping', label:'Online Shopping', emoji:'🛍️', color:'#4f8ef7' },
  { id:'groceries',       label:'Groceries',        emoji:'🛒', color:'#4caf50' },
  { id:'dining',          label:'Dining & Food Delivery', emoji:'🍽️', color:'#ef5350' },
  { id:'movies',          label:'Movies & OTT',     emoji:'🎬', color:'#ab47bc' },
  { id:'travel',          label:'Travel & Flights', emoji:'✈️', color:'#00bcd4' },
  { id:'fuel',            label:'Fuel',             emoji:'⛽', color:'#ef5350' },
  { id:'utilities',       label:'Utility Bills',    emoji:'💡', color:'#ffd54f' },
  { id:'lifestyle',       label:'Fashion & Lifestyle',emoji:'👗', color:'#f06292' },
];

export default function AnalysePage() {
  const [step, setStep] = useState(1);
  const [income, setIncome] = useState(600000);
  const [hasCard, setHasCard] = useState('');
  const [cardType, setCardType] = useState('');
  const [creditLimit, setCreditLimit] = useState(100000);
  const [exp, setExp] = useState(Object.fromEntries(EXPENSES.map(e => [e.id, 5000])));
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [expandedId, setExpandedId] = useState(null);

  const fi = v => `₹${(v / 100000).toFixed(1)}L`;
  const fe = v => v === 0 ? '₹0' : `₹${(v / 1000).toFixed(0)}K`;
  const fl = v => v >= 100000 ? `₹${(v / 100000).toFixed(1)}L` : `₹${(v / 1000).toFixed(0)}K`;

  const totalMonthly = Object.values(exp).reduce((a, b) => a + b, 0);

  const incomeHint = income < 300000 ? { msg: '💡 Student & free cards best suited', color: '#ffa726' }
    : income < 600000 ? { msg: '📈 Mid-range — great cashback cards available', color: '#66bb6a' }
    : income < 1800000 ? { msg: '🚀 Upper-mid — premium travel cards within reach', color: '#4f8ef7' }
    : { msg: '👑 High income — super-premium & metal cards eligible', color: '#c9a84c' };

  const analyse = async () => {
    setLoading(true);
    try {
      const res = await axios.post('/api/analyse', { income, hasCard, cardType, expenses: exp });
      setResults(res.data.data || []);
      setStep(3);
    } catch (err) {
      console.error('Analysis error:', err);
    } finally {
      setLoading(false);
    }
  };

  const reset = () => { setStep(1); setResults([]); setExpandedId(null); setHasCard(''); setCardType(''); };

  return (
    <div style={{ paddingTop: 64, minHeight: '100vh' }}>
      {/* Hero */}
      <div style={{ padding:'3.5rem 1.5rem 2rem', textAlign:'center', background:'linear-gradient(180deg,#0d0d16 0%,#0a0a0f 100%)', position:'relative', overflow:'hidden' }}>
        <div style={{ position:'absolute', top:'20%', right:'10%', width:400, height:400, borderRadius:'50%', background:'radial-gradient(circle,rgba(201,168,76,0.07) 0%,transparent 70%)', filter:'blur(60px)' }} />
        <div style={{ fontSize:11, letterSpacing:3, color:'#c9a84c', textTransform:'uppercase', marginBottom:12 }}>Personalised Analysis</div>
        <h1 style={{ fontFamily:"'Playfair Display',serif", fontSize:'clamp(1.8rem,4vw,2.8rem)', fontWeight:800, color:'#f0f0f0', marginBottom:10 }}>
          Find Your Perfect Credit Card 
        </h1>
         <h1 style={{ fontFamily:"'Playfair Display',serif", fontSize:'clamp(1.5rem,3.5vw,2.5rem)', fontWeight:700, color:'#b4c317', marginBottom:10 }}>
          That Matches your daily expenses
        </h1>
        
        <p style={{ color:'#777', fontSize:14 }}>3 easy steps · Which takes less than 60 seconds</p>
      </div>

      {/* Progress */}
      <div style={{ background:'#0d0d16', borderBottom:'1px solid rgba(255,255,255,0.06)', padding:'0 1.5rem' }}>
        <div style={{ maxWidth:720, margin:'0 auto', display:'flex', gap:0 }}>
          {['1. Your Profile','2. Monthly Spending','3. Results'].map((s, i) => {
            const active = step === i + 1, done = step > i + 1;
            return (
              <div key={i} style={{ flex:1, textAlign:'center', padding:'14px 8px', fontSize:13, fontWeight: active ? 700 : 400,
                color: active ? '#c9a84c' : done ? '#666' : '#444',
                borderBottom: active ? '3px solid #c9a84c' : done ? '3px solid #333' : '3px solid transparent',
                transition:'all 0.3s' }}>
                {done ? '✓ ' : ''}{s}
              </div>
            );
          })}
        </div>
      </div>

      <div style={{ maxWidth:720, margin:'0 auto', padding:'2.5rem 1.5rem' }}>

        {/* ── STEP 1 ── */}
        {step === 1 && (
          <div>
            <h2 style={{ fontSize:20, fontWeight:700, color:'#f0f0f0', marginBottom:6 }}>Your Financial Profile</h2>
            <p style={{ color:'#666', fontSize:13, marginBottom:'2rem' }}>Use the slider to set your annual income and credit history.</p>

            <div style={{ background:'#16161f', borderRadius:18, padding:'2rem', marginBottom:'1.5rem', border:'1px solid rgba(255,255,255,0.07)' }}>
              <RangeSlider label="Annual Income" emoji="💼" value={income} onChange={setIncome}
                min={100000} max={4000000} step={50000} format={fi} color="#c9a84c" />
              <div style={{ padding:'10px 14px', borderRadius:10, background:`${incomeHint.color}18`, borderLeft:`3px solid ${incomeHint.color}`, marginBottom:'1.5rem', fontSize:13, color: incomeHint.color }}>
                {incomeHint.msg}
              </div>

              <div style={{ fontSize:13, color:'#888', marginBottom:10 }}> Are you Currently using any Credit Card?</div>
              <div style={{ display:'flex', gap:10, marginBottom:'1.5rem' }}>
                {[['yes','✅ Yes, I have one'],['no','🆕 No, I\'m new to credit']].map(([v,l]) => (
                  <button key={v} onClick={() => setHasCard(v)} style={{
                    flex:1, padding:'12px', borderRadius:12, cursor:'pointer', fontSize:14, fontWeight:700, transition:'all 0.2s',
                    background: hasCard === v ? '#c9a84c' : '#1e1e2a',
                    color: hasCard === v ? '#0a0a0f' : '#888',
                    border: hasCard === v ? '2px solid #c9a84c' : '1px solid rgba(255,255,255,0.1)',
                  }}>{l}</button>
                ))}
              </div>

              {hasCard === 'yes' && (
                <>
                  <div style={{ fontSize:13, color:'#888', marginBottom:10 }}>What type of card do you have?</div>
                  <div style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:8, marginBottom:'1.5rem' }}>
                    {[['cashback','💰 Cashback'],['rewards','🏆 Rewards'],['travel','✈️ Travel'],['premium','👑 Premium'],['basic','📋 Basic'],['other','❓ Other']].map(([v,l]) => (
                      <button key={v} onClick={() => setCardType(v)} style={{ padding:'10px 6px', borderRadius:10, cursor:'pointer', fontSize:12, fontWeight:700, transition:'all 0.2s',
                        background: cardType === v ? '#c9a84c' : '#1e1e2a',
                        color: cardType === v ? '#0a0a0f' : '#777',
                        border: cardType === v ? '2px solid #c9a84c' : '1px solid rgba(255,255,255,0.08)',
                      }}>{l}</button>
                    ))}
                  </div>
                  <RangeSlider label="Current Credit Limit" emoji="🏦" value={creditLimit} onChange={setCreditLimit}
                    min={10000} max={1000000} step={10000} format={fl} color="#4caf50" />
                </>
              )}
            </div>

            <button onClick={() => hasCard && setStep(2)} disabled={!hasCard} style={{
              width:'100%', padding:'15px', borderRadius:14, cursor: hasCard ? 'pointer' : 'not-allowed',
              background: hasCard ? 'linear-gradient(135deg,#c9a84c,#e8c96e)' : '#1e1e2a',
              color: hasCard ? '#0a0a0f' : '#444', fontSize:16, fontWeight:700, border:'none',
              transition:'all 0.2s', boxShadow: hasCard ? '0 6px 24px rgba(201,168,76,0.3)' : 'none',
            }}>
              Continue → Set Monthly Spending
            </button>
          </div>
        )}

        {/* ── STEP 2 ── */}
        {step === 2 && (
          <div>
            <h2 style={{ fontSize:20, fontWeight:700, color:'#f0f0f0', marginBottom:6 }}>Monthly Spending Profile</h2>
            <p style={{ color:'#666', fontSize:13, marginBottom:'1.5rem' }}>Drag each slider to your approximate monthly spend. Set to ₹0 to skip a category.</p>

            <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(300px,1fr))', gap:14, marginBottom:'1.4rem' }}>
              {EXPENSES.map(e => (
                <div key={e.id} style={{ background:'#16161f', borderRadius:14, padding:'1.2rem 1.4rem', border:'1px solid rgba(255,255,255,0.06)' }}>
                  <RangeSlider label={e.label} emoji={e.emoji} value={exp[e.id]}
                    onChange={v => setExp(p => ({ ...p, [e.id]: v }))}
                    min={0} max={100000} step={1000}
                    format={v => v === 0 ? '₹0 (skip)' : fe(v)} color={e.color} />
                </div>
              ))}
            </div>

            {/* Spend Summary */}
            <div style={{ background:'#16161f', borderRadius:14, padding:'1.2rem 1.4rem', marginBottom:'1.4rem', border:'1px solid rgba(201,168,76,0.2)' }}>
              <div style={{ fontSize:11, letterSpacing:2, color:'#c9a84c', textTransform:'uppercase', marginBottom:12 }}>Spending Summary</div>
              <div style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:12 }}>
                {[
                  ['Monthly Total', `₹${totalMonthly.toLocaleString()}`, '#4f8ef7'],
                  ['Annual Total', `₹${(totalMonthly*12).toLocaleString()}`, '#4caf50'],
                  ['Top Spend', [...EXPENSES].sort((a,b) => exp[b.id]-exp[a.id])[0]?.emoji + ' ' + [...EXPENSES].sort((a,b) => exp[b.id]-exp[a.id])[0]?.label, '#c9a84c'],
                ].map(([k,v,c]) => (
                  <div key={k} style={{ textAlign:'center', padding:'10px', background:'rgba(255,255,255,0.03)', borderRadius:10 }}>
                    <div style={{ fontSize:10, color:'#555', marginBottom:4 }}>{k}</div>
                    <div style={{ fontSize:14, fontWeight:700, color:c }}>{v}</div>
                  </div>
                ))}
              </div>
            </div>

            <div style={{ display:'flex', gap:10 }}>
              <button onClick={() => setStep(1)} style={{ flex:1, padding:'12px', borderRadius:12, cursor:'pointer', background:'#1e1e2a', border:'1px solid rgba(255,255,255,0.1)', color:'#888', fontSize:14 }}>← Back</button>
              <button onClick={analyse} disabled={loading} style={{ flex:2.5, padding:'15px', borderRadius:14, cursor:'pointer', background:'linear-gradient(135deg,#c9a84c,#e8c96e)', color:'#0a0a0f', fontSize:15, fontWeight:700, border:'none', boxShadow:'0 6px 24px rgba(201,168,76,0.3)' }}>
                {loading ? '🔍 Analysing...' : '🔍 Find My Perfect Card'}
              </button>
            </div>
          </div>
        )}

        {/* ── STEP 3 ── */}
        {step === 3 && (
          <div>
            <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start', marginBottom:'1.5rem', flexWrap:'wrap', gap:8 }}>
              <div>
                <h2 style={{ fontSize:20, fontWeight:700, color:'#f0f0f0' }}>Your Top Matches</h2>
                <p style={{ fontSize:13, color:'#666' }}>Profile: {fi(income)}/yr · {results.length} eligible cards found & ranked</p>
              </div>
              <button onClick={reset} style={{ padding:'8px 16px', borderRadius:10, background:'#1e1e2a', border:'1px solid rgba(255,255,255,0.1)', color:'#888', fontSize:13, cursor:'pointer' }}>← Start Over</button>
            </div>

            {results.slice(0, 7).map((card, i) => {
              const meta = CAT_META[card.category] || CAT_META.cashback;
              const isBest = i === 0;
              return (
                <div key={card.id} style={{ background:'#16161f', borderRadius:18, marginBottom:16, overflow:'hidden',
                  border: isBest ? `2px solid #c9a84c` : '1px solid rgba(255,255,255,0.07)',
                  boxShadow: isBest ? '0 8px 40px rgba(201,168,76,0.2)' : 'none',
                  animation:`fadeUp 0.4s ${i*0.07}s ease both` }}>
                  {isBest && (
                    <div style={{ background:'linear-gradient(90deg,#c9a84c,#e8c96e)', color:'#0a0a0f', textAlign:'center', fontSize:12, fontWeight:800, padding:'6px', letterSpacing:1 }}>
                      ⭐ BEST MATCH FOR YOUR PROFILE
                    </div>
                  )}
                  <div style={{ padding:'1.2rem' }}>
                    <div style={{ display:'flex', gap:14, flexWrap:'wrap', alignItems:'flex-start' }}>
                      <CreditCardImage card={card} width={210} height={130} />
                      <div style={{ flex:1, minWidth:160 }}>
                        <div style={{ display:'flex', gap:8, flexWrap:'wrap', marginBottom:6, alignItems:'center' }}>
                          <span style={{ fontSize:11, color:'#555' }}>#{i+1}</span>
                          <span style={{ fontSize:11, padding:'2px 8px', borderRadius:8, background:meta.light, color:meta.color, fontWeight:700 }}>{meta.emoji} {meta.label}</span>
                          <span style={{ fontSize:11, padding:'2px 8px', borderRadius:8, background:'rgba(255,255,255,0.05)', color:'#666' }}>Match: {card.score}%</span>
                        </div>
                        <div style={{ fontWeight:700, fontSize:15, color:'#f0f0f0', marginBottom:3 }}>{card.fullName}</div>
                        <div style={{ fontSize:12, color:'#666', marginBottom:10 }}>{card.bank}</div>
                        <div style={{ display:'flex', flexWrap:'wrap', gap:'5px 16px' }}>
                          {[
                            ['💳 Fee', card.annualFee === 0 ? 'FREE' : `₹${card.annualFee.toLocaleString()}`],
                            ['💼 Income', card.minIncomeLabel],
                            ['📊 Score', card.minCreditScore === 0 ? 'Not required' : card.minCreditScore + '+'],
                          ].map(([k,v]) => (
                            <span key={k} style={{ fontSize:11, color:'#666' }}>{k}: <strong style={{color:'#ccc'}}>{v}</strong></span>
                          ))}
                        </div>
                      </div>
                      <div style={{ display:'flex', flexDirection:'column', gap:8, minWidth:110 }}>
                        <a href={card.applyLink} target="_blank" rel="noopener noreferrer" style={{ fontSize:13, padding:'9px 14px', borderRadius:10, background:'linear-gradient(135deg,#c9a84c,#e8c96e)', color:'#0a0a0f', textDecoration:'none', fontWeight:700, textAlign:'center', display:'block' }}>
                          Apply Now ↗
                        </a>
                        <button onClick={() => setExpandedId(expandedId === card.id ? null : card.id)} style={{ fontSize:12, padding:'7px 10px', borderRadius:10, cursor:'pointer', background:'rgba(255,255,255,0.05)', border:'1px solid rgba(255,255,255,0.1)', color:'#888' }}>
                          {expandedId === card.id ? 'Hide' : 'Details'}
                        </button>
                      </div>
                    </div>

                    {expandedId === card.id && (
                      <div style={{ marginTop:14, paddingTop:14, borderTop:'1px solid rgba(255,255,255,0.07)', display:'grid', gridTemplateColumns:'1fr 1fr', gap:'1rem' }}>
                        <div>
                          <div style={{ fontSize:12, fontWeight:700, color:'#f0f0f0', marginBottom:8 }}>Key Benefits</div>
                          {card.keyBenefits?.map((b,i) => (
                            <div key={i} style={{ fontSize:11, color:'#777', display:'flex', gap:6, marginBottom:5 }}>
                              <span style={{color:meta.color,flexShrink:0}}>✓</span>{b}
                            </div>
                          ))}
                        </div>
                        <div>
                          <div style={{ fontSize:12, fontWeight:700, color:'#f0f0f0', marginBottom:8 }}>Card Details</div>
                          {[
                            ['Annual Fee', card.annualFee === 0 ? 'LIFETIME FREE' : `₹${card.annualFee.toLocaleString()}`],
                            ['Fee Waiver', card.feeWaiver],
                            ['Network', card.network],
                            ['Best For', card.bestFor?.join(', ')],
                          ].map(([k,v]) => (
                            <div key={k} style={{ fontSize:11, color:'#666', marginBottom:5 }}>
                              <strong style={{color:'#999'}}>{k}:</strong> {v}
                            </div>
                          ))}
                          <div style={{ marginTop:8, fontSize:11, padding:'3px 10px', borderRadius:8, background:meta.light, color:meta.color, display:'inline-block', fontWeight:700 }}>{card.tag}</div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}

            <div style={{ fontSize:11, color:'#444', lineHeight:1.8, marginTop:'1.5rem', padding:'1rem', background:'#16161f', borderRadius:12 }}>
              <strong style={{color:'#666'}}>Disclaimer:</strong> Recommendations are based on publicly available eligibility data as of April 2026. Card features, fees and eligibility may change — verify on each bank's official website before applying. Approval is at the sole discretion of the issuing bank.
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
