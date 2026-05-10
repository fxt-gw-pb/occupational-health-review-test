// Shared UI primitives & inline SVG icons for the OH review-site mockups.
// Hangs everything off window so other Babel files can pick them up.

const Icon = {
  search: (p) => (
    <svg width={p.size||16} height={p.size||16} viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="7" cy="7" r="4.5"/><path d="M10.5 10.5 13.5 13.5"/>
    </svg>
  ),
  book: (p) => (
    <svg width={p.size||16} height={p.size||16} viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 3h4.5a1.5 1.5 0 0 1 1.5 1.5V13a1.2 1.2 0 0 0-1.2-1.2H3z"/>
      <path d="M13 3H8.5A1.5 1.5 0 0 0 7 4.5V13a1.2 1.2 0 0 1 1.2-1.2H13z"/>
    </svg>
  ),
  list: (p) => (
    <svg width={p.size||16} height={p.size||16} viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round">
      <path d="M5 4h8M5 8h8M5 12h8"/><circle cx="2.5" cy="4" r=".7" fill="currentColor"/><circle cx="2.5" cy="8" r=".7" fill="currentColor"/><circle cx="2.5" cy="12" r=".7" fill="currentColor"/>
    </svg>
  ),
  pen: (p) => (
    <svg width={p.size||16} height={p.size||16} viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="m11.4 3.4 1.2 1.2-7 7L3 13l1.4-2.6 7-7Z"/>
    </svg>
  ),
  star: (p) => (
    <svg width={p.size||16} height={p.size||16} viewBox="0 0 16 16" fill={p.filled?"currentColor":"none"} stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round">
      <path d="m8 2 1.8 3.8 4.2.5-3 2.9.7 4.1L8 11.4 4.3 13.3 5 9.2 2 6.3l4.2-.5L8 2Z"/>
    </svg>
  ),
  check: (p) => (
    <svg width={p.size||16} height={p.size||16} viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="m3.5 8.5 3 3 6-7"/>
    </svg>
  ),
  bookmark: (p) => (
    <svg width={p.size||16} height={p.size||16} viewBox="0 0 16 16" fill={p.filled?"currentColor":"none"} stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round">
      <path d="M4 2.5h8v11.2L8 11l-4 2.7Z"/>
    </svg>
  ),
  flame: (p) => (
    <svg width={p.size||16} height={p.size||16} viewBox="0 0 16 16" fill="currentColor">
      <path d="M8 1.5c.6 1.6.4 2.6-.4 3.4-1 1-1.6 2-1.6 3.4 0 2.4 1.8 4.2 4 4.2s4-1.7 4-4c0-1.6-.7-2.7-2.4-4.5C10.6 3 9.7 4 9.5 5.6 9.4 4 8.9 2.7 8 1.5Z"/>
    </svg>
  ),
  arrow: (p) => (
    <svg width={p.size||14} height={p.size||14} viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 7h8M8 4l3 3-3 3"/>
    </svg>
  ),
  chev: (p) => (
    <svg width={p.size||12} height={p.size||12} viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" style={{transform: p.dir==='down'?'rotate(90deg)': p.dir==='up'?'rotate(-90deg)':'none'}}>
      <path d="m4.5 2.5 3 3.5-3 3.5"/>
    </svg>
  ),
  filter: (p) => (
    <svg width={p.size||14} height={p.size||14} viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
      <path d="M2 3.5h10M3.5 7h7M5 10.5h4"/>
    </svg>
  ),
  dot: (p) => <span style={{display:'inline-block', width:6, height:6, borderRadius:99, background: p.color||'currentColor', verticalAlign:'middle'}}/>,
  beaker: (p) => (
    <svg width={p.size||16} height={p.size||16} viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" strokeLinecap="round">
      <path d="M6 2v4.2L3 12.5A1.2 1.2 0 0 0 4.1 14h7.8a1.2 1.2 0 0 0 1.1-1.5L10 6.2V2"/>
      <path d="M5 2h6"/><path d="M4.6 10h6.8" />
    </svg>
  ),
  plus: (p) => (
    <svg width={p.size||14} height={p.size||14} viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"><path d="M7 3v8M3 7h8"/></svg>
  ),
  spark: (p) => (
    <svg width={p.size||14} height={p.size||14} viewBox="0 0 14 14" fill="currentColor">
      <path d="M7 1.5 8 5l3.5 1L8 7l-1 3.5L6 7 2.5 6 6 5 7 1.5Z" opacity=".9"/>
    </svg>
  ),
};

/* ───── Frequency tag ───── */
function FreqChip({ n, size = "md", showLabel = true }) {
  const tier = n >= 5 ? "hi" : n >= 3 ? "mid" : "low";
  const tierLabel = tier === "hi" ? "高频" : tier === "mid" ? "中频" : "低频";
  const cls = "chip chip-" + tier;
  if (size === "sm") {
    return (
      <span className={cls} style={{height:18, padding:"0 7px", fontSize:10.5}}>
        <span style={{opacity:.78, fontWeight:500}}>{tierLabel}</span>
        <span style={{opacity:.45, margin:"0 1px"}}>·</span>
        <span style={{fontVariantNumeric:"tabular-nums"}}>{n}</span>
      </span>
    );
  }
  return (
    <span className={cls}>
      {tier === "hi" && <Icon.flame size={11} />}
      {showLabel && <span style={{fontWeight:500}}>{tierLabel}</span>}
      <span style={{opacity:.5}}>·</span>
      <span style={{fontVariantNumeric:"tabular-nums"}}>{n} 次</span>
    </span>
  );
}

/* ───── Heat cell (考频热力) ───── */
function HeatCell({ level, size = 12, title }) {
  const v = Math.max(0, Math.min(5, level|0));
  return (
    <span title={title} style={{
      display:'inline-block', width:size, height:size, borderRadius:3,
      background:`var(--heat-${v})`,
      boxShadow: 'inset 0 0 0 1px rgba(15,27,51,.04)',
    }}/>
  );
}

/* ───── Progress ring ───── */
function Ring({ value = 0.5, size = 60, stroke = 6, label, sublabel, color = 'var(--primary)' }) {
  const r = (size - stroke) / 2;
  const c = 2 * Math.PI * r;
  return (
    <div style={{position:'relative', width:size, height:size}}>
      <svg width={size} height={size}>
        <circle cx={size/2} cy={size/2} r={r} fill="none" stroke="var(--line)" strokeWidth={stroke}/>
        <circle cx={size/2} cy={size/2} r={r} fill="none" stroke={color} strokeWidth={stroke}
          strokeLinecap="round"
          strokeDasharray={`${c*value} ${c}`}
          transform={`rotate(-90 ${size/2} ${size/2})`} />
      </svg>
      <div style={{position:'absolute', inset:0, display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', lineHeight:1}}>
        <div style={{fontSize: size>72?18:14, fontWeight:600, color:'var(--ink-1)', fontVariantNumeric:'tabular-nums'}}>{label}</div>
        {sublabel && <div style={{fontSize:10, color:'var(--ink-3)', marginTop:2}}>{sublabel}</div>}
      </div>
    </div>
  );
}

/* ───── Mini bar (考频分布) ───── */
function FreqBars({ values, height = 28, gap = 2, color = 'var(--primary)' }) {
  const max = Math.max(...values, 1);
  return (
    <div style={{display:'flex', alignItems:'flex-end', gap, height}}>
      {values.map((v,i)=>(
        <span key={i} style={{
          flex:1,
          height: `${Math.max(8, (v/max)*height)}px`,
          background: i === values.length-1 ? color : `color-mix(in oklab, ${color} ${30 + (v/max)*60}%, transparent)`,
          borderRadius: 2,
        }}/>
      ))}
    </div>
  );
}

/* ───── Section heading (artboard internal) ───── */
function H({ children, size = 16, weight = 600, color = 'var(--ink-1)', mb = 0, style }) {
  return <div style={{fontSize:size, fontWeight:weight, color, marginBottom:mb, ...style}}>{children}</div>;
}

/* ───── Card ───── */
function Card({ children, padding = 16, style, hover, accent }) {
  return (
    <div style={{
      background:'var(--bg-surface)',
      border: '1px solid var(--line)',
      borderRadius: 12,
      padding,
      boxShadow: hover ? 'var(--shadow-2)' : 'var(--shadow-1)',
      position:'relative',
      ...style,
    }}>
      {accent && <div style={{position:'absolute', left:0, top:14, bottom:14, width:3, background:accent, borderRadius:'0 3px 3px 0'}}/>}
      {children}
    </div>
  );
}

Object.assign(window, { Icon, FreqChip, HeatCell, Ring, FreqBars, H, Card });
