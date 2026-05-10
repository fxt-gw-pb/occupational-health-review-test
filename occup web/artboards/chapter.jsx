// Chapter Browse — HERO artboard (3 columns: chapter rail, knowledge-point
// list, review overview rail). Designed at 1440×1320.

const { Icon, FreqChip, HeatCell, Ring, FreqBars, Card, TopBar, ChapterRail } = window;

function ChapterArtboard() {
  const data = window.OH_DATA;
  const ch = data.chapters.find(c => c.current) || data.chapters[3];
  const points = data.ch4Points;
  const exercises = data.ch4Exercises;

  return (
    <div className="ab" style={{display:'flex', flexDirection:'column', height:'100%'}}>
      <TopBar active="chapter" />
      <div style={{display:'flex', flex:1, minHeight:0}}>
        <ChapterRail activeId={ch.id} />
        <Center ch={ch} points={points}/>
        <ChapterRightRail ch={ch} points={points} exercises={exercises}/>
      </div>
    </div>
  );
}

function Center({ ch, points }) {
  return (
    <main style={{flex:1, padding:'28px 36px 40px', overflow:'hidden', minWidth:0, background:'var(--bg-page)'}}>
      {/* Breadcrumb + title row */}
      <div style={{display:'flex', alignItems:'center', gap:6, fontSize:12, color:'var(--ink-3)', marginBottom:14}}>
        <span>章节</span>
        <Icon.chev size={10}/>
        <span>第四章</span>
      </div>

      <div style={{display:'flex', alignItems:'flex-start', gap:24}}>
        <div style={{flex:1, minWidth:0}}>
          <div style={{display:'flex', alignItems:'baseline', gap:14, flexWrap:'wrap'}}>
            <span style={{
              fontSize:13, fontWeight:600, color:'var(--primary)',
              letterSpacing:'.04em',
            }}>第 {ch.id.toString().padStart(2,'0')} 章</span>
            <h1 style={{
              fontSize:30, fontWeight:600, letterSpacing:'-0.018em',
              margin:0, color:'var(--ink-1)', lineHeight:1.15,
            }}>{ch.title}</h1>
          </div>
          <p style={{
            margin:'12px 0 0', maxWidth:680,
            color:'var(--ink-2)', fontSize:14, lineHeight:1.7,
          }}>
            本章围绕生产性噪声、振动的物理特性、卫生学影响及防护原则展开。近五年高频出现于
            <strong style={{color:'var(--ink-1)', fontWeight:600}}>简答与应用题</strong>，
            等效声级计算与白指病机制为必考核心。
          </p>
        </div>

        {/* Hero stats — progress ring + counts */}
        <div style={{display:'flex', alignItems:'center', gap:20}}>
          <Ring value={ch.progress} size={84} stroke={8}
                label={`${Math.round(ch.progress*100)}%`} sublabel="掌握度"/>
          <div style={{display:'flex', flexDirection:'column', gap:8}}>
            <Stat n={ch.points}  k="知识点"/>
            <Stat n={ch.hi}      k="高频考点" tone="hi"/>
            <Stat n={18}         k="往年题"/>
          </div>
        </div>
      </div>

      {/* Heat strip — knowledge points laid by section */}
      <HeatStrip points={points}/>

      {/* Sub-toolbar */}
      <div style={{
        display:'flex', alignItems:'center', gap:8,
        padding:'14px 0 12px', borderBottom:'1px solid var(--line)',
        marginTop:18,
      }}>
        <Tab active label="按考频排序" count={9}/>
        <Tab label="按小节排序"/>
        <Tab label="待复习" count={3}/>
        <Tab label="已掌握" count={1}/>
        <div style={{flex:1}}/>
        <button style={pillStyle()}>
          <Icon.filter size={12}/>
          <span>筛选</span>
          <span style={{color:'var(--ink-4)'}}>·</span>
          <span style={{color:'var(--ink-3)'}}>所有题型</span>
        </button>
        <button style={pillStyle()}>
          <Icon.flame size={12}/>
          <span>仅高频</span>
        </button>
        <div style={{
          display:'flex', borderRadius:8, border:'1px solid var(--line)',
          background:'var(--bg-surface)', overflow:'hidden'
        }}>
          <button style={segBtn(true)}>列表</button>
          <button style={segBtn(false)}>速览</button>
        </div>
      </div>

      {/* Knowledge-point list */}
      <div style={{display:'flex', flexDirection:'column', gap:12, marginTop:18}}>
        {points.map((p, i) => <KPCard key={p.id} p={p} expanded={i===0} index={i+1}/>)}
      </div>
    </main>
  );
}

function Stat({ n, k, tone }) {
  const color = tone==='hi' ? 'var(--freq-hi-fg)' : 'var(--ink-1)';
  return (
    <div style={{display:'flex', alignItems:'baseline', gap:6}}>
      <span style={{fontSize:18, fontWeight:600, fontVariantNumeric:'tabular-nums', color, letterSpacing:'-0.01em'}}>{n}</span>
      <span style={{fontSize:11.5, color:'var(--ink-3)'}}>{k}</span>
    </div>
  );
}

function Tab({ active, label, count }) {
  return (
    <button style={{
      display:'inline-flex', alignItems:'center', gap:6,
      height:30, padding:'0 12px',
      border:'none', background:'transparent', cursor:'pointer',
      fontSize:13, fontWeight: active?600:500,
      color: active?'var(--ink-1)':'var(--ink-3)',
      borderRadius:8,
      position:'relative',
    }}>
      <span>{label}</span>
      {typeof count === 'number' && (
        <span style={{
          fontSize:10.5, fontVariantNumeric:'tabular-nums',
          padding:'1px 6px', borderRadius:99,
          background: active?'var(--primary)':'var(--bg-sunken)',
          color: active?'#fff':'var(--ink-3)',
        }}>{count}</span>
      )}
      {active && <span style={{position:'absolute', left:8, right:8, bottom:-13, height:2, background:'var(--ink-1)', borderRadius:2}}/>}
    </button>
  );
}

function pillStyle() {
  return {
    display:'inline-flex', alignItems:'center', gap:6,
    height:30, padding:'0 11px',
    border:'1px solid var(--line)',
    background:'var(--bg-surface)',
    borderRadius:8, fontSize:12, fontWeight:500,
    color:'var(--ink-2)', cursor:'pointer',
  };
}
function segBtn(active) {
  return {
    height:30, padding:'0 12px',
    border:'none', background: active?'var(--primary-100)':'transparent',
    color: active?'var(--ink-1)':'var(--ink-3)',
    fontSize:12, fontWeight: active?600:500, cursor:'pointer',
  };
}

/* ───── Heat strip — visualizes 考频 across this chapter's points ───── */
function HeatStrip({ points }) {
  const max = Math.max(...points.map(p => p.freq));
  return (
    <div style={{
      marginTop: 22,
      padding:'14px 16px',
      borderRadius:12,
      background:'var(--bg-surface)',
      border:'1px solid var(--line)',
      boxShadow:'var(--shadow-1)',
    }}>
      <div style={{display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:10}}>
        <div style={{display:'flex', alignItems:'center', gap:8}}>
          <span className="eyebrow">本章考频热力</span>
          <span style={{fontSize:11, color:'var(--ink-4)'}}>· 知识点按考频强度排列</span>
        </div>
        <div style={{display:'flex', alignItems:'center', gap:6, fontSize:10.5, color:'var(--ink-3)'}}>
          <span>低</span>
          {[0,1,2,3,4,5].map(l => <HeatCell key={l} level={l} size={9}/>)}
          <span>高</span>
        </div>
      </div>
      <div style={{display:'flex', alignItems:'flex-end', gap:4, height:54}}>
        {points.map((p,i) => {
          const lvl = Math.min(5, Math.round((p.freq/max)*5));
          return (
            <div key={p.id} style={{flex:1, display:'flex', flexDirection:'column', alignItems:'center', gap:5}}>
              <div style={{
                width:'100%', height: 8 + (p.freq/max)*40,
                background:`var(--heat-${lvl})`,
                borderRadius:'4px 4px 2px 2px',
                position:'relative',
              }}>
                {i === 0 && (
                  <span style={{
                    position:'absolute', left:'50%', transform:'translateX(-50%)', bottom: 'calc(100% + 4px)',
                    fontSize:10, color:'var(--freq-hi-fg)', fontWeight:600, whiteSpace:'nowrap',
                  }}>峰值 · {p.freq}次</span>
                )}
              </div>
              <span style={{fontSize:9, color:'var(--ink-4)', fontVariantNumeric:'tabular-nums'}}>{p.section}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

/* ───── Knowledge-point card ───── */
function KPCard({ p, expanded, index }) {
  const masteredMap = {
    'mastered':    { lbl:'已掌握', color:'var(--success)', bg:'var(--success-bg)' },
    'in-progress': { lbl:'复习中', color:'var(--primary)', bg:'var(--primary-100)' },
    'review':      { lbl:'待复习', color:'#a86b14', bg:'#fbf1d9' },
    'todo':        { lbl:'未开始', color:'var(--ink-4)', bg:'var(--bg-sunken)' },
  };
  const m = masteredMap[p.mastered];

  return (
    <div style={{
      background:'var(--bg-surface)',
      border:'1px solid ' + (expanded ? 'var(--primary-300)':'var(--line)'),
      borderRadius:12,
      boxShadow: expanded ? '0 4px 18px rgba(45,95,213,.10)' : 'var(--shadow-1)',
      transition:'box-shadow .2s, border-color .2s',
      overflow:'hidden',
    }}>
      <div style={{padding:'16px 18px', display:'flex', alignItems:'flex-start', gap:14}}>
        <div style={{
          width:28, height:28, borderRadius:8, flex:'0 0 28px',
          background: p.freq >= 5 ? 'var(--freq-hi-bg)' : p.freq >= 3 ? 'var(--primary-100)' : 'var(--bg-sunken)',
          color: p.freq >= 5 ? 'var(--freq-hi-fg)' : p.freq >= 3 ? 'var(--primary)' : 'var(--ink-3)',
          display:'flex', alignItems:'center', justifyContent:'center',
          fontSize:12, fontWeight:600, fontVariantNumeric:'tabular-nums',
        }}>{index.toString().padStart(2,'0')}</div>

        <div style={{flex:1, minWidth:0}}>
          <div style={{display:'flex', alignItems:'baseline', gap:10, flexWrap:'wrap'}}>
            <h3 style={{
              margin:0, fontSize:15.5, fontWeight:600, color:'var(--ink-1)', lineHeight:1.4,
              letterSpacing:'-0.005em',
            }}>{p.title}</h3>
          </div>
          <div style={{
            display:'flex', alignItems:'center', gap:10, marginTop:8,
            fontSize:11.5, color:'var(--ink-3)',
          }}>
            <FreqChip n={p.freq} size="sm"/>
            <span style={{display:'inline-flex', alignItems:'center', gap:4}}>
              <span style={{color:'var(--ink-4)'}}>小节</span>
              <span style={{fontFamily:'var(--font-mono)', color:'var(--ink-2)', fontSize:11}}>§{p.section}</span>
            </span>
            <span style={{color:'var(--ink-4)'}}>·</span>
            <span><span style={{color:'var(--ink-4)'}}>关联题</span> <strong style={{fontWeight:600, color:'var(--ink-2)'}}>{p.related}</strong></span>
            <span style={{
              display:'inline-flex', alignItems:'center', gap:5, padding:'1px 8px', borderRadius:99,
              background:m.bg, color:m.color, fontSize:10.5, fontWeight:500,
            }}>
              <span style={{width:5,height:5,borderRadius:99,background:m.color}}/>
              {m.lbl}
            </span>
          </div>
        </div>

        <div style={{display:'flex', alignItems:'center', gap:4}}>
          <button style={iconBtnSm()} title="收藏"><Icon.bookmark size={14}/></button>
          <button style={iconBtnSm()} title="标记掌握"><Icon.check size={14}/></button>
          <button style={{
            ...iconBtnSm(), background:'var(--bg-page)', color:'var(--ink-2)',
            width:'auto', padding:'0 10px', gap:5, fontSize:12, fontWeight:500,
          }}>
            阅读 <Icon.arrow size={12}/>
          </button>
        </div>
      </div>

      {expanded && (
        <div style={{padding:'2px 18px 18px 60px'}}>
          <div style={{
            background:'var(--bg-sunken)',
            borderRadius:10,
            padding:'12px 14px',
            display:'flex', flexDirection:'column', gap:10,
          }}>
            <div>
              <span style={{fontSize:10.5, color:'var(--ink-3)', letterSpacing:'.06em', fontWeight:600}}>匹配依据</span>
              <p style={{margin:'4px 0 0', fontSize:12.5, color:'var(--ink-2)', lineHeight:1.6}}>{p.basis}</p>
            </div>
            <div>
              <span style={{fontSize:10.5, color:'var(--ink-3)', letterSpacing:'.06em', fontWeight:600}}>原文摘取</span>
              <p style={{margin:'4px 0 0', fontSize:13, color:'var(--ink-1)', lineHeight:1.75, fontFamily:'var(--font-serif)'}}>
                {p.excerpt}
              </p>
            </div>
            <div style={{display:'flex', gap:8, paddingTop:4}}>
              <button style={primaryPill()}>查看完整知识点</button>
              <button style={ghostPill()}>查看 {p.related} 道往年题</button>
              <div style={{flex:1}}/>
              <span style={{fontSize:11, color:'var(--ink-4)', alignSelf:'center'}}>
                提示 ⌘+Enter 进入自测模式
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function iconBtnSm() {
  return {
    width:30, height:30, borderRadius:7, border:'none',
    background:'transparent', color:'var(--ink-3)',
    display:'inline-flex', alignItems:'center', justifyContent:'center', cursor:'pointer'
  };
}
function primaryPill() {
  return { ...pillStyle(), background:'var(--primary)', borderColor:'transparent', color:'#fff', fontWeight:600 };
}
function ghostPill() {
  return { ...pillStyle(), background:'transparent' };
}

/* ───── Right rail — review overview ───── */
function ChapterRightRail({ ch, points, exercises }) {
  return (
    <aside style={{
      width: 296, flex:'0 0 296px',
      borderLeft:'1px solid var(--line)',
      background:'var(--bg-rail)',
      padding:'24px 18px 24px',
      display:'flex', flexDirection:'column', gap:18,
      overflow:'hidden',
    }}>
      <div>
        <div className="eyebrow" style={{marginBottom:10}}>本章复习概览</div>
        <Card padding={14}>
          <div style={{display:'flex', alignItems:'center', gap:14}}>
            <Ring value={ch.progress} size={56} stroke={5}
              label={`${Math.round(ch.progress*100)}%`} />
            <div style={{flex:1, lineHeight:1.3}}>
              <div style={{fontSize:12, color:'var(--ink-3)'}}>已掌握</div>
              <div style={{fontSize:18, fontWeight:600, color:'var(--ink-1)'}}>
                <span style={{fontVariantNumeric:'tabular-nums'}}>18</span>
                <span style={{color:'var(--ink-3)', fontWeight:400, fontSize:13}}> / {ch.points}</span>
              </div>
            </div>
          </div>
          <div style={{height:1, background:'var(--line-soft)', margin:'12px -14px'}}/>
          <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:8, fontSize:11.5}}>
            {[
              ['已掌握', 18, 'var(--success)'],
              ['复习中',  3, 'var(--primary)'],
              ['待复习',  3, '#a86b14'],
              ['未开始',  4, 'var(--ink-4)'],
            ].map(([k,v,c]) => (
              <div key={k} style={{display:'flex', alignItems:'center', justifyContent:'space-between', padding:'4px 8px', borderRadius:6, background:'var(--bg-sunken)'}}>
                <span style={{display:'inline-flex', alignItems:'center', gap:6, color:'var(--ink-2)'}}>
                  <span style={{width:6, height:6, borderRadius:99, background:c}}/>{k}
                </span>
                <span style={{fontVariantNumeric:'tabular-nums', fontWeight:600, color:'var(--ink-1)'}}>{v}</span>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* 复习建议 */}
      <div>
        <div className="eyebrow" style={{marginBottom:10}}>本章复习建议</div>
        <Card padding={14} accent="var(--primary)">
          <ol style={{margin:0, padding:'0 0 0 18px', fontSize:12.5, lineHeight:1.7, color:'var(--ink-2)'}}>
            <li>优先掌握等效声级 LAeq,T 的<strong style={{color:'var(--ink-1)'}}>计算式与单位换算</strong>。</li>
            <li>白指病机制 + 三级预防作为<strong style={{color:'var(--ink-1)'}}>论述题骨架</strong>。</li>
            <li>GBZ 2.2 接触限值数值要<strong style={{color:'var(--ink-1)'}}>记牢</strong>，应用题常考。</li>
            <li>区分 TTS / PTS / 听觉适应 / 听觉疲劳四个名词。</li>
          </ol>
        </Card>
      </div>

      {/* Knowledge point relation graph (simple SVG) */}
      <div>
        <div className="eyebrow" style={{marginBottom:10}}>知识点关系图</div>
        <Card padding={12}>
          <RelationGraph/>
          <div style={{marginTop:8, display:'flex', alignItems:'center', justifyContent:'space-between', fontSize:10.5, color:'var(--ink-3)'}}>
            <span>9 个节点 · 12 条关联</span>
            <span style={{display:'inline-flex', alignItems:'center', gap:4, color:'var(--primary)'}}>
              展开 <Icon.arrow size={10}/>
            </span>
          </div>
        </Card>
      </div>

      {/* Past-year exercises shortcut */}
      <div style={{marginTop:'auto'}}>
        <div className="eyebrow" style={{marginBottom:10}}>本章往年题 · 18</div>
        <div style={{display:'flex', flexDirection:'column', gap:6}}>
          {exercises.slice(0,3).map(q => (
            <a key={q.id} style={{
              display:'flex', gap:10, padding:'10px 12px',
              borderRadius:9, background:'var(--bg-surface)',
              border:'1px solid var(--line)',
              cursor:'pointer',
            }}>
              <span style={{
                fontSize:10.5, fontWeight:600, fontVariantNumeric:'tabular-nums',
                color:'var(--ink-3)', minWidth:34,
              }}>{q.year}</span>
              <span style={{flex:1, minWidth:0, fontSize:12, color:'var(--ink-2)', lineHeight:1.5,
                overflow:'hidden', textOverflow:'ellipsis', display:'-webkit-box',
                WebkitLineClamp:2, WebkitBoxOrient:'vertical'
              }}>
                <span style={{
                  display:'inline-block', padding:'1px 5px', borderRadius:3,
                  background:'var(--bg-sunken)', color:'var(--ink-3)', fontSize:10, marginRight:6,
                }}>{q.type}</span>
                {q.title}
              </span>
            </a>
          ))}
        </div>
        <button style={{...pillStyle(), width:'100%', justifyContent:'center', marginTop:10}}>
          查看全部 18 道题 <Icon.arrow size={11}/>
        </button>
      </div>
    </aside>
  );
}

function RelationGraph() {
  // Force-laid by hand for this small static graph.
  const nodes = [
    { x: 70,  y: 30, r: 14, lbl: 'TTS/PTS', tone: 'hi' },
    { x: 160, y: 22, r: 18, lbl: 'LAeq', tone: 'hi' },
    { x: 215, y: 70, r: 12, lbl: 'GBZ 2.2', tone: 'mid' },
    { x: 30,  y: 95, r: 13, lbl: '听觉适应', tone: 'mid' },
    { x: 110, y: 110, r: 16, lbl: '白指病', tone: 'hi' },
    { x: 200, y: 130, r: 11, lbl: '局部振动', tone: 'mid' },
    { x: 60,  y: 150, r: 10, lbl: '脉冲噪声', tone: 'low' },
    { x: 150, y: 160, r: 10, lbl: '耳塞耳罩', tone: 'low' },
  ];
  const edges = [
    [0,1],[0,3],[1,2],[1,7],[2,7],[3,1],[4,5],[4,1],[5,2],[6,1],[7,2]
  ];
  const tone = (t) => t==='hi'?'var(--freq-hi-fg)':t==='mid'?'var(--primary)':'var(--ink-3)';
  const toneBg = (t) => t==='hi'?'var(--freq-hi-bg)':t==='mid'?'var(--primary-100)':'var(--bg-sunken)';
  return (
    <svg viewBox="0 0 250 190" width="100%" height="170" style={{display:'block'}}>
      {edges.map(([a,b], i) => (
        <line key={i} x1={nodes[a].x} y1={nodes[a].y} x2={nodes[b].x} y2={nodes[b].y}
          stroke="var(--line-strong)" strokeWidth="1" strokeDasharray={i%3===2?'2 2':'0'}/>
      ))}
      {nodes.map((n,i) => (
        <g key={i}>
          <circle cx={n.x} cy={n.y} r={n.r} fill={toneBg(n.tone)} stroke={tone(n.tone)} strokeWidth={n.lbl==='LAeq'?1.5:1}/>
          <text x={n.x} y={n.y+1} fontSize="8" fill={tone(n.tone)} textAnchor="middle" dominantBaseline="middle"
            fontWeight={n.tone==='hi'?700:500}>{n.lbl}</text>
        </g>
      ))}
    </svg>
  );
}

Object.assign(window, { ChapterArtboard });
