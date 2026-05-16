import React, { useRef } from 'react';
import { useNavigate } from 'react-router-dom';

const CAT_META = {
  cashback: { label: 'Cashback Cards', emoji: '💰', color: '#1565c0', light: 'rgba(21,101,192,0.15)', desc: 'Get money back directly on every purchase. No points — just guaranteed savings on everyday spending.', perks: ['Direct cashback on transactions', 'No redemption complexity', 'Great for online & grocery', 'Fuel & utility bill savings'] },
  rewards:  { label: 'Rewards / Points', emoji: '🏆', color: '#2e7d32', light: 'rgba(46,125,50,0.15)', desc: 'Earn reward points and redeem for vouchers, flights, hotels or cashback. Best for maximising value.', perks: ['Points on every purchase', 'Redeem for flights & hotels', 'Partner brand accelerators', 'Milestone bonuses & memberships'] },
  travel:   { label: 'Travelling Cards', emoji: '✈️', color: '#0097a7', light: 'rgba(0,151,167,0.15)', desc: 'Built for frequent travellers. Earn miles, get lounge access, zero forex markup, and travel insurance.', perks: ['Airport lounge access', 'Zero/low forex markup', 'Air miles & hotel points', 'Travel insurance cover'] },
  premium:  { label: 'Premium Cards', emoji: '👑', color: '#c9a84c', light: 'rgba(201,168,76,0.15)', desc: 'Exclusive metal cards with ultra-high rewards, unlimited lounge access, concierge and luxury perks for HNWIs.', perks: ['Highest reward rates in India', 'Unlimited global lounge access', 'Luxury hotel memberships', 'Golf & concierge privileges'] },
  student:  { label: 'Student Cards', emoji: '🎓', color: '#7b1fa2', light: 'rgba(123,31,162,0.15)', desc: 'Entry-level cards for students and first-timers. No income proof needed. Start your credit journey right.', perks: ['No income proof required', 'Lifetime free options', 'Build credit history', 'Zero forex for travel'] },
};

const privileges = [
  { icon: '🏦', title: 'Instant Purchasing Power', desc: 'Buy now, pay later — manage cash flow without touching your savings. Great for emergencies and big purchases.' },
  { icon: '🎁', title: 'Rewards on Every Swipe', desc: 'Earn cashback, points or miles on literally everything you spend — groceries, fuel, travel, dining and more.' },
  { icon: '✈️', title: 'Airport Lounge Access', desc: 'Relax in premium airport lounges worldwide before your flights — free of charge with select cards.' },
  { icon: '🛡️', title: 'Purchase Protection', desc: 'Shop with confidence. Credit cards protect against fraud, provide purchase insurance, and dispute resolution.' },
  { icon: '🌍', title: 'Global Acceptance', desc: 'Use your card in 200+ countries without carrying foreign cash. Some cards offer zero forex markup.' },
  { icon: '📊', title: 'Build Credit Score', desc: 'Responsible credit card use builds a strong CIBIL score — unlocking better loans and financial opportunities.' },
  { icon: '⚡', title: 'Exclusive Offers & Discounts', desc: 'Get instant discounts on movie tickets, dining, travel booking, OTT subscriptions and lifestyle brands.' },
  { icon: '🏥', title: 'Insurance & Safety Net', desc: 'Premium cards come with air accident cover, trip cancellation, and medical emergency assistance.' },
];

const stats = [
  { val: '14', label: 'Premium Cards Analysed' },
  { val: '5', label: 'Card Categories' },
  { val: '₹0', label: 'Cost to Analyse' },
  { val: '30s', label: 'To Find Your Best Card' },
];

export default function HomePage() {
  const navigate = useNavigate();
  const whatRef = useRef(null);
  const privRef = useRef(null);
  const typesRef = useRef(null);

  const scrollTo = (ref) => ref.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });

  return (
    <div style={{ paddingTop: 64 }}>

      {/* ── HERO ── */}
      <section style={{
        minHeight: '100vh', display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center', textAlign: 'center',
        padding: '0 1.5rem', position: 'relative', overflow: 'hidden',
      }}>
        {/* BG orbs */}
        <div style={{ position: 'absolute', inset: 0, zIndex: 0, overflow: 'hidden' }}>
          <div style={{ position:'absolute', top:'15%', left:'10%', width:400, height:400, borderRadius:'50%', background:'radial-gradient(circle, rgba(79,142,247,0.12) 0%, transparent 70%)', filter:'blur(40px)' }} />
          <div style={{ position:'absolute', bottom:'10%', right:'8%', width:500, height:500, borderRadius:'50%', background:'radial-gradient(circle, rgba(201,168,76,0.1) 0%, transparent 70%)', filter:'blur(50px)' }} />
          <div style={{ position:'absolute', top:'50%', left:'50%', transform:'translate(-50%,-50%)', width:600, height:600, borderRadius:'50%', background:'radial-gradient(circle, rgba(167,139,250,0.07) 0%, transparent 70%)', filter:'blur(60px)' }} />
        </div>

        {/* Floating cards decoration */}
        <div style={{ position:'absolute', top:'18%', right:'4%', opacity:0.25, transform:'rotate(12deg)', animation:'float 6s ease-in-out infinite' }}>
          <div style={{ width:140, height:90, borderRadius:10, background:'linear-gradient(135deg,#1a237e,#1565c0)', border:'1px solid rgba(255,255,255,0.1)' }} />
        </div>
        <div style={{ position:'absolute', top:'28%', right:'8%', opacity:0.15, transform:'rotate(8deg)', animation:'float 7s 1s ease-in-out infinite' }}>
          <div style={{ width:110, height:70, borderRadius:8, background:'linear-gradient(135deg,#880e4f,#c2185b)' }} />
        </div>
        <div style={{ position:'absolute', bottom:'20%', left:'4%', opacity:0.2, transform:'rotate(-8deg)', animation:'float 5s 0.5s ease-in-out infinite' }}>
          <div style={{ width:130, height:82, borderRadius:10, background:'linear-gradient(135deg,#212121,#455a64)', border:'1px solid rgba(201,168,76,0.3)' }} />
        </div>

        {/* Content */}
        <div style={{ position:'relative', zIndex:1, maxWidth:800 }}>
          <div className="fade-up" style={{ display:'inline-block', padding:'6px 18px', borderRadius:20, background:'rgba(201,168,76,0.15)', border:'1px solid rgba(201,168,76,0.3)', fontSize:12, color:'#c9a84c', fontWeight:600, letterSpacing:2, textTransform:'uppercase', marginBottom:'1.5rem' }}>
            ✦ India's Smartest Credit Card Analyser ✦
          </div>

          <h1 className="fade-up-d1" style={{ fontFamily:"'Playfair Display',serif", fontSize:'clamp(2.4rem,6vw,4.2rem)', fontWeight:800, lineHeight:1.15, marginBottom:'1.5rem', color:'#f0f0f0' }}>
            Stop Swiping Blind.{' '}
            <span style={{ background:'linear-gradient(135deg,#c9a84c,#e8c96e,#c9a84c)', backgroundSize:'200%', WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent', animation:'shimmer 3s linear infinite' }}>
              Start Earning Smart.
            </span>
          </h1>

          <p className="fade-up-d2" style={{ fontSize:'clamp(1rem,2vw,1.2rem)', color:'#999', lineHeight:1.8, maxWidth:620, margin:'0 auto 2.5rem' }}>
            Over <strong style={{color:'#c9a84c'}}>₹50,000 crore</strong> in credit card rewards go unclaimed every year in India. Your perfect card — the one that turns your lifestyle into savings — is just one analysis away.
          </p>

          <div className="fade-up-d3" style={{ display:'flex', gap:14, justifyContent:'center', flexWrap:'wrap', marginBottom:'3rem' }}>
            <button onClick={() => navigate('/analyse')} style={{ padding:'14px 34px', borderRadius:30, background:'linear-gradient(135deg,#c9a84c,#e8c96e)', color:'#0a0a0f', fontWeight:700, fontSize:16, border:'none', cursor:'pointer', boxShadow:'0 6px 30px rgba(201,168,76,0.4)', transition:'all 0.25s', letterSpacing:0.5 }}
              onMouseOver={e=>e.currentTarget.style.transform='scale(1.05)'}
              onMouseOut={e=>e.currentTarget.style.transform='scale(1)'}>
              Find My Perfect Card ✦
            </button>
            <button onClick={() => scrollTo(whatRef)} style={{ padding:'14px 30px', borderRadius:30, background:'transparent', color:'#ddd', fontWeight:600, fontSize:15, border:'1px solid rgba(255,255,255,0.2)', cursor:'pointer', transition:'all 0.25s' }}
              onMouseOver={e=>{ e.currentTarget.style.background='rgba(255,255,255,0.08)'; e.currentTarget.style.borderColor='rgba(255,255,255,0.4)'; }}
              onMouseOut={e=>{ e.currentTarget.style.background='transparent'; e.currentTarget.style.borderColor='rgba(255,255,255,0.2)'; }}>
              Learn More ↓
            </button>
          </div>

          {/* Stats */}
          <div className="fade-up-d4" style={{ display:'flex', gap:24, justifyContent:'center', flexWrap:'wrap' }}>
            {stats.map((st,i) => (
              <div key={i} style={{ textAlign:'center' }}>
                <div style={{ fontSize:28, fontWeight:800, color:'#c9a84c', fontFamily:"'Playfair Display',serif" }}>{st.val}</div>
                <div style={{ fontSize:11, color:'#666', letterSpacing:1 }}>{st.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Scroll hint */}
        <div onClick={() => scrollTo(whatRef)} style={{ position:'absolute', bottom:'2.5rem', left:'50%', transform:'translateX(-50%)', cursor:'pointer', animation:'float 2.5s ease-in-out infinite', opacity:0.5 }}>
          <div style={{ width:1, height:40, background:'linear-gradient(to bottom,transparent,#c9a84c)', margin:'0 auto 4px' }} />
          <div style={{ fontSize:10, color:'#c9a84c', letterSpacing:2, textAlign:'center' }}>SCROLL</div>
        </div>
      </section>

      {/* ── WHAT IS A CREDIT CARD ── */}
      <section ref={whatRef} style={{ padding:'5rem 1.5rem', background:'#0d0d16' }}>
        <div style={{ maxWidth:960, margin:'0 auto' }}>
          <div style={{ textAlign:'center', marginBottom:'3.5rem' }}>
            <div style={{ fontSize:11, letterSpacing:3, color:'#c9a84c', textTransform:'uppercase', marginBottom:12 }}>Understanding the Basics</div>
            <h2 style={{ fontFamily:"'Playfair Display',serif", fontSize:'clamp(1.8rem,4vw,2.8rem)', fontWeight:700, color:'#f0f0f0', marginBottom:14 }}>
              What is a Credit Card?
            </h2>
            <p style={{ color:'#888', fontSize:16, maxWidth:620, margin:'0 auto', lineHeight:1.8 }}>
              A credit card is a financial instrument that lets you borrow money from a bank to make purchases — and pay it back later. But a <em style={{color:'#c9a84c'}}>great</em> credit card does much more than just let you spend.
            </p>
          </div>

          <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(260px,1fr))', gap:24 }}>
            {[
              { icon:'🏦', title:'How It Works', body:'A bank issues you a card with a credit limit. You spend within that limit, and pay the bank back each month. Pay fully on time — and it costs you nothing while giving you rewards.' },
              { icon:'📈', title:'Credit Limit', body:'Your spending ceiling, set by the bank based on your income, credit score, and financial history. A higher limit means more flexibility and a better credit utilisation ratio.' },
              { icon:'💡', title:'Billing Cycle', body:"Your charges are grouped into monthly billing cycles. Pay the 'total due' by the due date and you'll never pay a rupee of interest. Simple discipline = free money in rewards." },
              { icon:'⭐', title:'Credit Score Impact', body:'Using a credit card responsibly — paying on time, keeping utilisation below 30% — steadily improves your CIBIL score, making you eligible for better cards and lower loan rates.' },
              { icon:'🔒', title:'Fraud Protection', body:'Unlike debit cards, credit cards protect you from fraudulent transactions. If your card is misused, the bank investigates and reverses the charges while you continue using your money.' },
              { icon:'🎯', title:'Who Should Get One?', body:"Anyone with a regular income source — salaried or self-employed. Even students can start with FD-backed cards. The key is discipline: spend what you can afford to repay." },
            ].map((item, i) => (
              <div key={i} style={{ background:'#16161f', borderRadius:16, padding:'1.6rem', border:'1px solid rgba(255,255,255,0.06)', transition:'border-color 0.3s, transform 0.3s' }}
                onMouseOver={e=>{ e.currentTarget.style.borderColor='rgba(201,168,76,0.3)'; e.currentTarget.style.transform='translateY(-4px)'; }}
                onMouseOut={e=>{ e.currentTarget.style.borderColor='rgba(255,255,255,0.06)'; e.currentTarget.style.transform='translateY(0)'; }}>
                <div style={{ fontSize:32, marginBottom:12 }}>{item.icon}</div>
                <h3 style={{ fontSize:16, fontWeight:600, color:'#f0f0f0', marginBottom:8 }}>{item.title}</h3>
                <p style={{ fontSize:13, color:'#777', lineHeight:1.7 }}>{item.body}</p>
              </div>
            ))}
          </div>

          <div style={{ textAlign:'center', marginTop:'3rem' }}>
            <button onClick={() => scrollTo(privRef)} style={{ padding:'12px 28px', borderRadius:25, background:'transparent', color:'#c9a84c', border:'1px solid rgba(201,168,76,0.4)', cursor:'pointer', fontSize:14, transition:'all 0.2s' }}
              onMouseOver={e=>{ e.currentTarget.style.background='rgba(201,168,76,0.1)'; }}
              onMouseOut={e=>{ e.currentTarget.style.background='transparent'; }}>
              See Privileges of Credit Cards ↓
            </button>
          </div>
        </div>
      </section>

      {/* ── PRIVILEGES ── */}
      <section ref={privRef} style={{ padding:'5rem 1.5rem', background:'linear-gradient(180deg,#0d0d16 0%,#0a0a0f 100%)' }}>
        <div style={{ maxWidth:960, margin:'0 auto' }}>
          <div style={{ textAlign:'center', marginBottom:'3.5rem' }}>
            <div style={{ fontSize:11, letterSpacing:3, color:'#c9a84c', textTransform:'uppercase', marginBottom:12 }}>Why Get One</div>
            <h2 style={{ fontFamily:"'Playfair Display',serif", fontSize:'clamp(1.8rem,4vw,2.8rem)', fontWeight:700, color:'#f0f0f0', marginBottom:14 }}>
              Privileges of Credit Cards
            </h2>
            <p style={{ color:'#888', fontSize:15, maxWidth:560, margin:'0 auto', lineHeight:1.8 }}>
              A credit card isn't just a payment tool — it's a financial superpower when used wisely.
            </p>
          </div>

          <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(220px,1fr))', gap:20, marginBottom:'3rem' }}>
            {privileges.map((p, i) => (
              <div key={i} style={{ background:'linear-gradient(135deg,#16161f,#1a1a28)', borderRadius:14, padding:'1.4rem', border:'1px solid rgba(255,255,255,0.05)', position:'relative', overflow:'hidden', transition:'all 0.3s' }}
                onMouseOver={e=>{ e.currentTarget.style.borderColor='rgba(201,168,76,0.25)'; e.currentTarget.style.transform='translateY(-3px)'; }}
                onMouseOut={e=>{ e.currentTarget.style.borderColor='rgba(255,255,255,0.05)'; e.currentTarget.style.transform='translateY(0)'; }}>
                <div style={{ position:'absolute', top:-20, right:-20, fontSize:60, opacity:0.07 }}>{p.icon}</div>
                <div style={{ fontSize:28, marginBottom:10 }}>{p.icon}</div>
                <h3 style={{ fontSize:14, fontWeight:700, color:'#f0f0f0', marginBottom:6 }}>{p.title}</h3>
                <p style={{ fontSize:12, color:'#666', lineHeight:1.65 }}>{p.desc}</p>
              </div>
            ))}
          </div>

          <div style={{ textAlign:'center' }}>
            <button onClick={() => scrollTo(typesRef)} style={{ padding:'13px 32px', borderRadius:25, background:'linear-gradient(135deg,#c9a84c,#e8c96e)', color:'#0a0a0f', fontWeight:700, fontSize:15, border:'none', cursor:'pointer', boxShadow:'0 4px 20px rgba(201,168,76,0.35)', transition:'all 0.2s' }}
              onMouseOver={e=>e.currentTarget.style.transform='scale(1.04)'}
              onMouseOut={e=>e.currentTarget.style.transform='scale(1)'}>
              Explore Card Types ↓
            </button>
          </div>
        </div>
      </section>

      {/* ── CARD TYPE FLIP BANNERS ── */}
      <section ref={typesRef} style={{ padding:'5rem 1.5rem', background:'#0a0a0f' }}>
        <div style={{ maxWidth:1060, margin:'0 auto' }}>
          <div style={{ textAlign:'center', marginBottom:'3.5rem' }}>
            <div style={{ fontSize:11, letterSpacing:3, color:'#c9a84c', textTransform:'uppercase', marginBottom:12 }}>Browse by Category</div>
            <h2 style={{ fontFamily:"'Playfair Display',serif", fontSize:'clamp(1.8rem,4vw,2.8rem)', fontWeight:700, color:'#f0f0f0', marginBottom:14 }}>
              5 Types of Credit Cards
            </h2>
            <p style={{ color:'#888', fontSize:15, lineHeight:1.8 }}>
              Hover over a card type to flip it and learn its benefits. Click to explore all cards in that category.
            </p>
          </div>

          <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(180px,1fr))', gap:20 }}>
            {Object.entries(CAT_META).map(([key, meta]) => (
              <FlipBanner key={key} catKey={key} meta={meta} navigate={navigate} />
            ))}
          </div>

          <div style={{ textAlign:'center', marginTop:'3.5rem' }}>
            <p style={{ color:'#666', fontSize:14, marginBottom:'1.2rem' }}>Ready to find your perfect match?</p>
            <button onClick={() => navigate('/analyse')} style={{ padding:'15px 38px', borderRadius:30, background:'linear-gradient(135deg,#c9a84c,#e8c96e)', color:'#0a0a0f', fontWeight:700, fontSize:16, border:'none', cursor:'pointer', boxShadow:'0 6px 30px rgba(201,168,76,0.4)', transition:'all 0.25s' }}
              onMouseOver={e=>e.currentTarget.style.transform='scale(1.05)'}
              onMouseOut={e=>e.currentTarget.style.transform='scale(1)'}>
              ✦ Analyse My Lifestyle & Find My Card
            </button>
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer style={{ padding:'2rem 1.5rem', borderTop:'1px solid rgba(255,255,255,0.06)', textAlign:'center' }}>
        <div style={{ fontSize:13, color:'#444', lineHeight:1.8 }}>
          <strong style={{color:'#666'}}>CC Analyser</strong> — Built with ♥ for smart Indian cardholders.
          <br />Data as of April 2026. Verify eligibility on bank websites before applying.
          <br />Credit card approval is at the sole discretion of the issuing bank.
        </div>
      </footer>
    </div>
  );
}

function FlipBanner({ catKey, meta, navigate }) {
  const [flipped, setFlipped] = React.useState(false);
  return (
    <div style={{ perspective: 1000, height: 240, cursor: 'pointer' }}
      onMouseEnter={() => setFlipped(true)}
      onMouseLeave={() => setFlipped(false)}
      onClick={() => navigate(`/cards?category=${catKey}`)}>
      <div style={{ position:'relative', width:'100%', height:'100%', transformStyle:'preserve-3d', transition:'transform 0.65s cubic-bezier(0.4,0.2,0.2,1)', transform: flipped ? 'rotateY(180deg)' : 'rotateY(0)' }}>
        {/* Front */}
        <div style={{ position:'absolute', inset:0, backfaceVisibility:'hidden', borderRadius:16, background: meta.light, border:`1.5px solid ${meta.color}44`, display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', gap:10, padding:'1.2rem' }}>
          <div style={{ fontSize:44 }}>{meta.emoji}</div>
          <div style={{ fontWeight:700, fontSize:14, color: meta.color, textAlign:'center' }}>{meta.label}</div>
          <div style={{ fontSize:10, color:`${meta.color}99`, textAlign:'center', padding:'3px 10px', background:`${meta.color}18`, borderRadius:12, fontWeight:600 }}>
            Hover to explore →
          </div>
        </div>
        {/* Back */}
        <div style={{ position:'absolute', inset:0, backfaceVisibility:'hidden', transform:'rotateY(180deg)', borderRadius:16, background: meta.color, padding:'1.2rem', display:'flex', flexDirection:'column', justifyContent:'space-between' }}>
          <div>
            <div style={{ fontWeight:700, fontSize:14, color:'#fff', marginBottom:6 }}>{meta.label}</div>
            <div style={{ fontSize:11, color:'rgba(255,255,255,0.82)', lineHeight:1.55, marginBottom:10 }}>{meta.desc}</div>
          </div>
          <div>
            {meta.perks.map((p, i) => (
              <div key={i} style={{ fontSize:10, color:'rgba(255,255,255,0.9)', display:'flex', gap:6, marginBottom:4 }}>
                <span>✓</span><span>{p}</span>
              </div>
            ))}
            <div style={{ marginTop:10, fontSize:11, fontWeight:700, color:'#fff', textAlign:'center', padding:'5px', background:'rgba(255,255,255,0.2)', borderRadius:8 }}>
              Click to explore cards →
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
