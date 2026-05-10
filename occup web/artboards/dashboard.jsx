// Dashboard / Home artboard — 1440 wide.
// Sections: hero stats · 全站考频热力图 · 章节卡片网格 · 高频 Top 知识点 · 继续学习
const { Icon, FreqChip, HeatCell, Ring, FreqBars, Card, TopBar } = window;

function DashboardArtboard() {
  const data = window.OH_DATA;
  const meta = data.meta;
  const chapters = data.chapters;
  const topPoints = [
    ...data.ch4Points.slice(0, 3).map(p => ({...p, chapterTitle:'第四章 · 噪声与振动', chapterId:4})),
    { id:'p61', title:'矽肺的发病机制与病理改变', freq:7, chapterTitle:'第六章 · 粉尘与尘肺病', chapterId:6, section:'6.3.1' },
    { id:'p82', title:'铅中毒的临床表现与生化改变', freq:6, chapterTitle:'第八章 · 重金属中毒',     chapterId:8, section:'8.2.2' },
    { id:'p65', title:'游离二氧化硅含量与致纤维化能力', freq:5, chapterTitle:'第六章 · 粉尘与尘肺病', chapterId:6, section:'6.2.1' },
  ];

  return (
    <div className="ab" style={{display:'flex', flexDirection:'column', height:'100%', overflow:'hidden'}}>
      <TopBar active="home"/>
      <div style={{flex:1, padding:'32px 56px 48px', overflow:'hidden', background:'var(--bg-page)'}}>
        {/* Hero */}
        <header style={{display:'flex', alignItems:'flex-end', justifyContent:'space-between', gap:32, marginBottom:24}}>
          <div style={{maxWidth:680}}>
            <div className="eyebrow" style={{marginBottom:10}}>OCCUPATIONAL HEALTH · FINAL REVIEW</div>
            <h1 style={{
              fontSize:34, fontWeight:600, letterSpacing:'-0.02em', margin:0,
              lineHeight:1.15, color:'var(--ink-1)',
            }}>
              {meta.siteTitle.split(' · ')[0]}
              <span style={{color:'var(--ink-3)', fontWeight:500}}>　·　往年题考点</span>
            </h1>
            <p style={{margin:'14px 0 0', fontSize:14.5, color:'var(--ink-2)', lineHeight:1.7}}>
              {meta.subtitle}。按章节系统复习，按考频高低优先攻克，
              <span style={{color:'var(--ink-1)', fontWeight:500, borderBottom:'1px dashed var(--ink-4)'}}>支持自测、速览、收藏</span>
              三种复习模式。
            </p>
          </div>

          <div style={{display:'flex', alignItems:'center', gap:10}}>
            <button style={{
              height:40, padding:'0 18px', borderRadius:10,
              background:'var(--primary)', color:'#fff', border:'none',
              fontSize:13.5, fontWeight:600, cursor:'pointer',
              display:'inline-flex', alignItems:'center', gap:8,
              boxShadow:'0 6px 16px rgba(45,95,213,.25)'
            }}>
              <Icon.flame size={14}/>继续复习 · 第四章
            </button>
            <button style={{
              height:40, padding:'0 16px', borderRadius:10,
              background:'var(--bg-surface)', color:'var(--ink-1)',
              border:'1px solid var(--line)',
              fontSize:13.5, fontWeight:500, cursor:'pointer',
              display:'inline-flex', alignItems:'center', gap:8,
            }}>
              <Icon.spark size={13}/>开始今日自测
            </button>
          </div>
        </header>

        {/* Stat tiles */}
        <div style={{display:'grid', gridTemplateColumns:'repeat(4, 1fr)', gap:14, marginBottom:24}}>
          <StatTile k="章节" n={meta.totalChapters} sub="覆盖全部教材" />
          <StatTile k="知识点" n={meta.totalPoints} sub="按小节归位"/>
          <StatTile k="高频考点" n={meta.highFreqPoints} sub="考频 ≥ 3 次" tone="hi" />
          <StatTile k="往年题" n={meta.pastQuestions} sub="2019 - 2024" />
        </div>

        {/* 全站考频热力图 */}
        <section style={{marginBottom:28}}>
          <SectionHeader title="全站考频热力图"
            sub="每行一个章节；色块越深，该小节考频越高。点击进入对应小节复习。" />
          <Card padding={18}>
            <SiteHeatmap chapters={chapters}/>
          </Card>
        </section>

        {/* 两栏：章节卡片 + 高频 Top */}
        <div style={{display:'grid', gridTemplateColumns:'1fr 360px', gap:24}}>
          <section>
            <SectionHeader title="章节入口"
              right={<div style={{display:'flex', gap:6}}>
                <button style={{...miniSeg(), background:'var(--primary-100)', color:'var(--ink-1)', fontWeight:600}}>全部 · 16</button>
                <button style={miniSeg()}>已开始 · 9</button>
                <button style={miniSeg()}>未开始 · 7</button>
              </div>}/>
            <div style={{display:'grid', gridTemplateColumns:'repeat(2, 1fr)', gap:12}}>
              {chapters.slice(0, 8).map(ch => <ChapterTile key={ch.id} ch={ch}/>)}
            </div>
            <button style={{
              marginTop:14, height:36, width:'100%',
              border:'1px dashed var(--line-strong)',
              background:'transparent', borderRadius:10,
              color:'var(--ink-3)', fontSize:12.5, fontWeight:500, cursor:'pointer',
              display:'inline-flex', alignItems:'center', justifyContent:'center', gap:6,
            }}>
              <Icon.chev dir="down" size={11}/>展开剩余 8 章
            </button>
          </section>

          <aside>
            <SectionHeader title="全站高频 Top 知识点" sub="覆盖全部章节" />
            <div style={{display:'flex', flexDirection:'column', gap:8}}>
              {topPoints.map((p, i) => <TopPoint key={p.id} p={p} rank={i+1}/>)}
            </div>

            <div style={{marginTop:20}}>
              <SectionHeader title="最近复习" sub="本地保存，无需登录" />
              <Card padding={14}>
                <div style={{display:'flex', flexDirection:'column', gap:10}}>
                  <RecentRow when="今天" title="噪声对听觉系统的损伤" sub="第四章 · 4.2.1" pct={0.65}/>
                  <RecentRow when="昨天" title="等效连续 A 声级 LAeq,T" sub="第四章 · 4.1.3" pct={1.0}/>
                  <RecentRow when="3 天前" title="矽肺的发病机制" sub="第六章 · 6.3.1" pct={0.30}/>
                </div>
              </Card>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}

function StatTile({ k, n, sub, tone }) {
  const accent = tone === 'hi' ? 'var(--freq-hi-fg)' : 'var(--ink-1)';
  return (
    <Card padding={18}>
      <div style={{display:'flex', alignItems:'flex-start', justifyContent:'space-between'}}>
        <div>
          <div style={{fontSize:11.5, color:'var(--ink-3)', letterSpacing:'.04em', fontWeight:500}}>{k}</div>
          <div style={{display:'flex', alignItems:'baseline', gap:6, marginTop:8}}>
            <span style={{fontSize:30, fontWeight:600, color:accent, letterSpacing:'-0.02em', fontVariantNumeric:'tabular-nums'}}>{n}</span>
            {tone === 'hi' && <Icon.flame size={14}/>}
          </div>
        </div>
        <span style={{
          fontSize:10.5, color:'var(--ink-3)',
          padding:'2px 7px', borderRadius:99, background:'var(--bg-sunken)',
          fontWeight:500,
        }}>↑ 6 本周</span>
      </div>
      <div style={{marginTop:8, fontSize:11.5, color:'var(--ink-3)'}}>{sub}</div>
    </Card>
  );
}

function miniSeg() {
  return {
    height:26, padding:'0 10px',
    background:'transparent', border:'none', borderRadius:7,
    fontSize:11.5, color:'var(--ink-3)', fontWeight:500, cursor:'pointer',
  };
}

function SectionHeader({ title, sub, right }) {
  return (
    <div style={{display:'flex', alignItems:'flex-end', justifyContent:'space-between', marginBottom:12}}>
      <div>
        <h2 style={{margin:0, fontSize:16, fontWeight:600, color:'var(--ink-1)', letterSpacing:'-0.005em'}}>{title}</h2>
        {sub && <p style={{margin:'4px 0 0', fontSize:12, color:'var(--ink-3)'}}>{sub}</p>}
      </div>
      {right}
    </div>
  );
}

/* 全站考频热力图 — 8 sections × 16 chapters */
function SiteHeatmap({ chapters }) {
  // pseudo-stable hash to pick a heat level per chapter × section
  const heatFor = (chId, sec) => {
    const seed = (chId * 31 + sec * 7) % 11;
    return Math.max(0, Math.min(5, [0,1,1,2,2,3,3,4,4,5,5][seed]));
  };
  const sections = [1,2,3,4,5,6,7,8];
  return (
    <div>
      <div style={{display:'grid', gridTemplateColumns:`160px repeat(${sections.length}, 1fr) 60px`, gap:6, alignItems:'center'}}>
        <div></div>
        {sections.map(s => (
          <div key={s} style={{fontSize:10, color:'var(--ink-3)', textAlign:'center', fontFamily:'var(--font-mono)'}}>§{s}</div>
        ))}
        <div style={{fontSize:10, color:'var(--ink-3)', textAlign:'right'}}>合计</div>

        {chapters.map(ch => (
          <React.Fragment key={ch.id}>
            <div style={{display:'flex', alignItems:'center', gap:8, padding:'4px 0'}}>
              <span style={{fontSize:10, color:'var(--ink-4)', fontVariantNumeric:'tabular-nums', minWidth:18}}>{ch.id.toString().padStart(2,'0')}</span>
              <span style={{fontSize:12, color:'var(--ink-2)', whiteSpace:'nowrap', overflow:'hidden', textOverflow:'ellipsis'}}>{ch.title}</span>
            </div>
            {sections.map(s => {
              const lvl = heatFor(ch.id, s);
              return (
                <div key={s} style={{
                  height: 18, borderRadius: 4,
                  background: `var(--heat-${lvl})`,
                  display:'flex', alignItems:'center', justifyContent:'center',
                  fontSize:9, color: lvl >= 4 ? '#fff' : 'var(--ink-3)',
                  fontVariantNumeric:'tabular-nums', fontWeight: lvl>=4?600:400,
                }}>{lvl > 0 ? lvl : ''}</div>
              );
            })}
            <div style={{textAlign:'right', fontSize:11.5, fontWeight:600, color:'var(--ink-1)', fontVariantNumeric:'tabular-nums'}}>
              {ch.points}
            </div>
          </React.Fragment>
        ))}
      </div>

      <div style={{display:'flex', alignItems:'center', justifyContent:'space-between', marginTop:14, paddingTop:12, borderTop:'1px solid var(--line-soft)'}}>
        <div style={{fontSize:11, color:'var(--ink-3)'}}>共 287 知识点 · 412 道题 · <span style={{color:'var(--freq-hi-fg)', fontWeight:600}}>64 个高频考点</span></div>
        <div style={{display:'flex', alignItems:'center', gap:8, fontSize:10.5, color:'var(--ink-3)'}}>
          <span>低频</span>
          {[0,1,2,3,4,5].map(l => <HeatCell key={l} level={l} size={11}/>)}
          <span>高频</span>
        </div>
      </div>
    </div>
  );
}

function ChapterTile({ ch }) {
  return (
    <div style={{
      background:'var(--bg-surface)',
      border:'1px solid var(--line)',
      borderRadius:12,
      padding:'14px 16px 16px',
      cursor:'pointer',
      boxShadow: ch.current ? '0 4px 18px rgba(45,95,213,.10)' : 'var(--shadow-1)',
      transition:'all .2s',
      position:'relative',
    }}>
      {ch.current && (
        <span style={{
          position:'absolute', top:-1, left:14, right:14, height:2,
          background:'var(--primary)', borderRadius:2,
        }}/>
      )}
      <div style={{display:'flex', alignItems:'center', gap:10, marginBottom:10}}>
        <span style={{
          width:30, height:30, borderRadius:8,
          background: ch.progress > 0.5 ? 'var(--primary-100)' : 'var(--bg-sunken)',
          color: ch.progress > 0.5 ? 'var(--primary)' : 'var(--ink-3)',
          display:'inline-flex', alignItems:'center', justifyContent:'center',
          fontSize:12, fontWeight:600, fontFamily:'var(--font-serif)',
        }}>{ch.num}</span>
        <div style={{flex:1, minWidth:0}}>
          <div style={{display:'flex', alignItems:'center', gap:6}}>
            <span style={{fontSize:10.5, color:'var(--ink-4)', fontVariantNumeric:'tabular-nums', fontFamily:'var(--font-mono)'}}>CH {ch.id.toString().padStart(2,'0')}</span>
            {ch.current && <span style={{fontSize:10, color:'var(--primary)', fontWeight:600}}>· 当前</span>}
          </div>
          <h3 style={{margin:'2px 0 0', fontSize:14.5, fontWeight:600, color:'var(--ink-1)', whiteSpace:'nowrap', overflow:'hidden', textOverflow:'ellipsis'}}>{ch.title}</h3>
        </div>
        <Ring value={ch.progress} size={36} stroke={3.5} label={`${Math.round(ch.progress*100)}`} />
      </div>

      <div style={{display:'flex', alignItems:'center', gap:14, fontSize:11.5, color:'var(--ink-3)'}}>
        <span><strong style={{color:'var(--ink-1)', fontWeight:600, fontVariantNumeric:'tabular-nums'}}>{ch.points}</strong> 知识点</span>
        <span style={{display:'inline-flex', alignItems:'center', gap:4, color:'var(--freq-hi-fg)'}}>
          <Icon.flame size={10}/>
          <strong style={{fontWeight:600, fontVariantNumeric:'tabular-nums'}}>{ch.hi}</strong> 高频
        </span>
        <span style={{marginLeft:'auto', display:'inline-flex', gap:1.5}}>
          {[1,2,3,4,5,6,7].map(i => <HeatCell key={i} level={i <= ch.peak ? Math.min(5, ch.peak): 0} size={6}/>)}
        </span>
      </div>
    </div>
  );
}

function TopPoint({ p, rank }) {
  return (
    <a style={{
      display:'flex', alignItems:'flex-start', gap:10,
      padding:'10px 12px', borderRadius:10,
      background:'var(--bg-surface)',
      border:'1px solid var(--line)',
      cursor:'pointer', boxShadow:'var(--shadow-1)',
    }}>
      <span style={{
        width:22, height:22, borderRadius:6,
        background: rank<=3?'linear-gradient(135deg,#f3a07f,#c25b3b)':'var(--bg-sunken)',
        color: rank<=3?'#fff':'var(--ink-3)',
        display:'inline-flex', alignItems:'center', justifyContent:'center',
        fontSize:11, fontWeight:700, flex:'0 0 22px',
        fontVariantNumeric:'tabular-nums',
      }}>{rank}</span>
      <div style={{flex:1, minWidth:0}}>
        <h4 style={{
          margin:0, fontSize:13, fontWeight:600, color:'var(--ink-1)',
          lineHeight:1.45,
          display:'-webkit-box', WebkitLineClamp:2, WebkitBoxOrient:'vertical', overflow:'hidden',
        }}>{p.title}</h4>
        <div style={{display:'flex', alignItems:'center', gap:8, marginTop:6, fontSize:11, color:'var(--ink-3)'}}>
          <FreqChip n={p.freq} size="sm"/>
          <span style={{whiteSpace:'nowrap', overflow:'hidden', textOverflow:'ellipsis'}}>{p.chapterTitle}</span>
        </div>
      </div>
    </a>
  );
}

function RecentRow({ when, title, sub, pct }) {
  return (
    <div style={{display:'flex', alignItems:'center', gap:10}}>
      <span style={{
        fontSize:10, color:'var(--ink-4)',
        background:'var(--bg-sunken)', padding:'2px 6px', borderRadius:4,
        fontVariantNumeric:'tabular-nums', minWidth:38, textAlign:'center',
      }}>{when}</span>
      <div style={{flex:1, minWidth:0}}>
        <div style={{fontSize:12.5, color:'var(--ink-1)', fontWeight:500, whiteSpace:'nowrap', overflow:'hidden', textOverflow:'ellipsis'}}>{title}</div>
        <div style={{fontSize:10.5, color:'var(--ink-3)', marginTop:2}}>{sub}</div>
      </div>
      <div style={{width:48, height:4, background:'var(--bg-sunken)', borderRadius:99, overflow:'hidden'}}>
        <div style={{width:`${pct*100}%`, height:'100%', background: pct===1?'var(--success)':'var(--primary)'}}/>
      </div>
      <span style={{fontSize:10.5, color:'var(--ink-3)', fontVariantNumeric:'tabular-nums', minWidth:24, textAlign:'right'}}>{Math.round(pct*100)}%</span>
    </div>
  );
}

Object.assign(window, { DashboardArtboard });
