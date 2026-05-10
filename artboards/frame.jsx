// Shared frame chrome — TopBar, LeftRail (chapter tree), and small bits
// reused across multiple artboards.

const { Icon, FreqChip, HeatCell, Ring, FreqBars, Card } = window;

function TopBar({ active = "chapter", showSearch = true, compact = false }) {
  const items = [
    { k: "home",    label: "首页",   icon: <Icon.book size={14}/> },
    { k: "chapter", label: "章节",   icon: <Icon.list size={14}/> },
    { k: "exercises", label: "题库", icon: <Icon.pen size={14}/> },
    { k: "fav",     label: "收藏",   icon: <Icon.bookmark size={14}/> },
  ];
  return (
    <div style={{
      height: 56, display:'flex', alignItems:'center',
      padding:'0 24px', gap: 24,
      borderBottom:'1px solid var(--line)',
      background:'var(--bg-surface)',
      position:'relative', zIndex: 2,
    }}>
      {/* Logo lockup */}
      <div style={{display:'flex', alignItems:'center', gap:10}}>
        <div style={{
          width:28, height:28, borderRadius:8,
          background:'linear-gradient(135deg, var(--primary) 0%, var(--primary-700) 100%)',
          display:'flex', alignItems:'center', justifyContent:'center',
          boxShadow:'0 1px 2px rgba(15,27,51,.18), inset 0 -1px 0 rgba(0,0,0,.18)'
        }}>
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M3.5 3h4a1.5 1.5 0 0 1 1.5 1.5V13a1.2 1.2 0 0 0-1.2-1.2H3.5z"/>
            <path d="M12.5 3H8.5A1.5 1.5 0 0 0 7 4.5"/>
            <path d="M11 6.5h2M11 8.5h1.5"/>
          </svg>
        </div>
        <div style={{lineHeight:1.1}}>
          <div style={{fontSize:13.5, fontWeight:600, letterSpacing:'-0.005em'}}>职业卫生学 · 复习</div>
          <div style={{fontSize:10.5, color:'var(--ink-3)', marginTop:2, letterSpacing:'.04em'}}>OCCUPATIONAL HEALTH · REVIEW</div>
        </div>
      </div>

      {/* Nav */}
      <nav style={{display:'flex', gap:2, marginLeft:8}}>
        {items.map(it => (
          <a key={it.k} style={{
            display:'flex', alignItems:'center', gap:6,
            height:32, padding:'0 12px',
            borderRadius:8,
            fontSize:13, fontWeight: it.k===active?600:500,
            color: it.k===active ? 'var(--ink-1)' : 'var(--ink-3)',
            background: it.k===active ? 'var(--primary-100)' : 'transparent',
          }}>{it.icon}<span>{it.label}</span></a>
        ))}
      </nav>

      <div style={{flex:1}}/>

      {/* Search */}
      {showSearch && (
        <div style={{
          display:'flex', alignItems:'center', gap:8,
          width: 320, height: 34,
          padding: '0 12px',
          borderRadius: 9,
          background: 'var(--bg-page)',
          border: '1px solid var(--line)',
          color:'var(--ink-3)',
        }}>
          <Icon.search size={14}/>
          <span style={{flex:1, fontSize:12.5}}>搜索知识点、英文术语、往年题</span>
          <span className="kbd">⌘K</span>
        </div>
      )}

      {/* Mode + utility */}
      <div style={{display:'flex', alignItems:'center', gap:6}}>
        <button title="高频考点模式" style={iconBtnStyle()}>
          <Icon.flame size={14}/>
        </button>
        <button title="自测模式" style={iconBtnStyle()}>
          <Icon.spark size={13}/>
        </button>
        <div style={{width:1, height:18, background:'var(--line)', margin:'0 4px'}}/>
        <button style={{
          ...iconBtnStyle(),
          width:'auto', padding:'0 10px', gap:6, fontSize:12.5, fontWeight:500
        }}>
          <span style={{
            width:18, height:18, borderRadius:99,
            background:'linear-gradient(135deg,#f0c987,#c98c4a)',
            display:'inline-flex', alignItems:'center', justifyContent:'center',
            fontSize:10, color:'#fff', fontWeight:700
          }}>L</span>
          <span style={{color:'var(--ink-2)'}}>本地存档</span>
        </button>
      </div>
    </div>
  );
}

function iconBtnStyle() {
  return {
    width:32, height:32, borderRadius:8,
    border:'none', background:'transparent', color:'var(--ink-3)',
    display:'inline-flex', alignItems:'center', justifyContent:'center',
    cursor:'pointer'
  };
}

/* ───── Left chapter rail ───── */
function ChapterRail({ activeId = 4, width = 244 }) {
  const data = window.OH_DATA;
  return (
    <aside style={{
      width, flex:`0 0 ${width}px`,
      borderRight:'1px solid var(--line)',
      background:'var(--bg-sidebar)',
      padding:'18px 12px 24px',
      overflow:'hidden',
    }}>
      <div style={{display:'flex', alignItems:'center', justifyContent:'space-between', padding:'0 8px 10px'}}>
        <div className="eyebrow">章节目录</div>
        <span style={{fontSize:11, color:'var(--ink-4)', fontVariantNumeric:'tabular-nums'}}>16 章 · 287 知识点</span>
      </div>

      {/* Pinned section: high-freq mode entry */}
      <div style={{
        display:'flex', alignItems:'center', gap:10,
        padding:'8px 10px', margin:'0 0 12px',
        borderRadius:8, background:'var(--primary-050)',
        border:'1px dashed var(--primary-300)',
      }}>
        <span style={{
          width:22, height:22, borderRadius:6,
          background:'linear-gradient(135deg,#f3a07f,#c25b3b)',
          color:'#fff', display:'inline-flex', alignItems:'center', justifyContent:'center',
        }}><Icon.flame size={12}/></span>
        <div style={{flex:1, lineHeight:1.2}}>
          <div style={{fontSize:12.5, fontWeight:600, color:'var(--ink-1)'}}>高频考点模式</div>
          <div style={{fontSize:10.5, color:'var(--ink-3)', marginTop:2}}>仅显示考频 ≥ 3 的知识点</div>
        </div>
      </div>

      <div style={{display:'flex', flexDirection:'column', gap:1}}>
        {data.chapters.map(ch => {
          const active = ch.id === activeId;
          return (
            <div key={ch.id} style={{
              display:'flex', alignItems:'center', gap:8,
              padding:'7px 10px',
              borderRadius:7,
              background: active ? 'var(--bg-surface)' : 'transparent',
              boxShadow: active ? 'var(--shadow-1), inset 0 0 0 1px var(--line)' : 'none',
              cursor:'pointer', position:'relative',
            }}>
              {active && <span style={{position:'absolute', left:-12, top:8, bottom:8, width:3, borderRadius:3, background:'var(--primary)'}}/>}
              <span style={{
                width:22, fontSize:11, fontWeight:600, color: active?'var(--primary)':'var(--ink-4)',
                textAlign:'center', fontVariantNumeric:'tabular-nums'
              }}>{ch.id.toString().padStart(2,'0')}</span>
              <span style={{flex:1, fontSize:12.5, fontWeight: active?600:500, color: active?'var(--ink-1)':'var(--ink-2)', whiteSpace:'nowrap', overflow:'hidden', textOverflow:'ellipsis'}}>
                {ch.title}
              </span>
              {/* heat dots — peak of this chapter */}
              <span style={{display:'flex', gap:1.5, alignItems:'center'}}>
                {[1,2,3,4,5].map(i => <HeatCell key={i} level={i<=ch.peak ? Math.min(5, Math.ceil(ch.peak)) : 0} size={5}/>)}
              </span>
              <span style={{
                fontSize:10.5, color:'var(--ink-4)', minWidth:18, textAlign:'right',
                fontVariantNumeric:'tabular-nums'
              }}>{ch.points}</span>
            </div>
          );
        })}
      </div>
    </aside>
  );
}

Object.assign(window, { TopBar, ChapterRail, iconBtnStyle });
