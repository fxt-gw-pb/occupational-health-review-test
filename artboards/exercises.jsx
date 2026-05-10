// Exercises (题库) artboard — 1440 wide.
// Filter rail + main grid of question cards with answer-basis toggle.

const { Icon, FreqChip, Card, TopBar } = window;

function ExercisesArtboard() {
  const data = window.OH_DATA;

  const allQs = [
    { y:'2024', src:'2024 期末', type:'简答', title:'试述噪声对人体的特异性损害与非特异性损害，并举例说明。', ch:'第四章', sec:'4.2.1', freq:6, point:'噪声对听觉系统的损伤', expanded:true,
      basis:'本题对应知识点 §4.2.1。回答需涵盖：① 特异性损害（TTS / PTS / 噪声性耳聋）；② 非特异性损害（神经、心血管、内分泌系统）。' },
    { y:'2024', src:'2024 期末', type:'应用', title:'某车间噪声 92 dB(A)，工人每日实际接触 6 h，试判断是否符合 GBZ 2.2 限值并说明理由。', ch:'第四章', sec:'4.5.1', freq:5, point:'GBZ 2.2 接触限值的判定' },
    { y:'2023', src:'2023 期末', type:'简答', title:'比较手传振动和全身振动的卫生学差别。', ch:'第四章', sec:'4.4.1', freq:4, point:'局部振动与全身振动的卫生学差别' },
    { y:'2023', src:'2023 期末', type:'名解', title:'等效连续 A 声级（LAeq,T）', ch:'第四章', sec:'4.1.3', freq:5, point:'等效连续 A 声级' },
    { y:'2022', src:'2022 期末', type:'论述', title:'结合白指病的发生机制，论述局部振动作业的卫生学防护原则。', ch:'第四章', sec:'4.4.2', freq:5, point:'手传振动综合作用与白指病' },
    { y:'2022', src:'2022 期末', type:'名解', title:'矽肺（silicosis）', ch:'第六章', sec:'6.3.1', freq:7, point:'矽肺的发病机制与病理改变' },
    { y:'2021', src:'2021 期末', type:'简答', title:'试述铅中毒的临床表现及实验室诊断指标。', ch:'第八章', sec:'8.2.2', freq:6, point:'铅中毒的临床表现' },
    { y:'2021', src:'2021 期末', type:'应用', title:'结合所学，设计某煤矿尘肺病一级预防方案。', ch:'第六章', sec:'6.5.2', freq:4, point:'尘肺病三级预防' },
    { y:'2020', src:'2020 期末', type:'单选', title:'下列关于 4 kHz 听力陷的描述中，正确的是（）', ch:'第四章', sec:'4.2.1', freq:3, point:'噪声性耳聋早期表现' },
  ];

  return (
    <div className="ab" style={{display:'flex', flexDirection:'column', height:'100%', overflow:'hidden'}}>
      <TopBar active="exercises"/>
      <div style={{display:'flex', flex:1, minHeight:0}}>
        {/* Filter rail */}
        <FilterRail/>
        <main style={{flex:1, padding:'24px 32px 36px', background:'var(--bg-page)', overflow:'hidden'}}>
          {/* Header */}
          <div style={{display:'flex', alignItems:'flex-end', justifyContent:'space-between', marginBottom:14}}>
            <div>
              <div className="eyebrow" style={{marginBottom:6}}>题库</div>
              <h1 style={{margin:0, fontSize:24, fontWeight:600, letterSpacing:'-0.015em', color:'var(--ink-1)'}}>
                往年题浏览
                <span style={{color:'var(--ink-3)', fontWeight:400, fontSize:14, marginLeft:10}}>共 412 道 · 已筛选 <strong style={{color:'var(--primary)'}}>56 道</strong></span>
              </h1>
            </div>
            <div style={{display:'flex', gap:8}}>
              <ToggleButton on label="只看题目" />
              <ToggleButton label="显示答案依据" />
              <ToggleButton label="自测模式" tone="primary"/>
            </div>
          </div>

          {/* Active filter chips */}
          <div style={{display:'flex', flexWrap:'wrap', gap:6, alignItems:'center', marginBottom:16}}>
            <span style={{fontSize:11.5, color:'var(--ink-3)', marginRight:4}}>当前筛选：</span>
            <ActiveChip>第四章 · 噪声与振动</ActiveChip>
            <ActiveChip>简答 · 应用 · 名解</ActiveChip>
            <ActiveChip tone="hi">考频 ≥ 4</ActiveChip>
            <span style={{flex:1}}/>
            <button style={{...miniLink(), color:'var(--ink-3)'}}>清空筛选</button>
          </div>

          {/* Sort row */}
          <div style={{display:'flex', alignItems:'center', gap:6, paddingBottom:10, borderBottom:'1px solid var(--line)', marginBottom:14}}>
            <button style={sortPill(true)}>按年份新→旧</button>
            <button style={sortPill(false)}>按考频高→低</button>
            <button style={sortPill(false)}>按章节顺序</button>
            <div style={{flex:1}}/>
            <span style={{fontSize:11.5, color:'var(--ink-3)'}}>显示 1—9 / 56</span>
          </div>

          {/* Question grid */}
          <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:12}}>
            {allQs.map((q,i) => <QuestionCard key={i} q={q}/>)}
          </div>
        </main>
      </div>
    </div>
  );
}

function FilterRail() {
  return (
    <aside style={{
      width:240, flex:'0 0 240px',
      borderRight:'1px solid var(--line)',
      background:'var(--bg-sidebar)',
      padding:'20px 14px',
      overflow:'hidden',
    }}>
      <FilterGroup title="章节" right="9 / 16">
        {[
          ['第四章 · 噪声与振动', 18, true],
          ['第六章 · 粉尘与尘肺病', 26, true],
          ['第八章 · 重金属中毒', 22, false],
          ['第二章 · 职业生理与工效', 14, false],
          ['第十章 · 农药中毒', 19, false],
        ].map(([t, n, on]) => (
          <CheckRow key={t} on={on} count={n}>{t}</CheckRow>
        ))}
        <button style={miniLink()}>+ 11 个章节</button>
      </FilterGroup>

      <FilterGroup title="题型" right="3 / 5">
        {[
          ['名词解释', 92, true],
          ['简答',    143, true],
          ['论述',     54, false],
          ['单选',     86, false],
          ['应用题',   37, true],
        ].map(([t,n,on]) => (
          <CheckRow key={t} on={on} count={n}>{t}</CheckRow>
        ))}
      </FilterGroup>

      <FilterGroup title="考频" right="高+中">
        <FreqRange/>
      </FilterGroup>

      <FilterGroup title="年份">
        <YearChecks/>
      </FilterGroup>

      <FilterGroup title="状态">
        <CheckRow>已收藏</CheckRow>
        <CheckRow>已答对</CheckRow>
        <CheckRow>未尝试</CheckRow>
      </FilterGroup>
    </aside>
  );
}

function FilterGroup({ title, right, children }) {
  return (
    <div style={{marginBottom:18}}>
      <div style={{display:'flex', alignItems:'center', justifyContent:'space-between', padding:'0 4px 8px'}}>
        <span style={{fontSize:11, fontWeight:600, color:'var(--ink-3)', letterSpacing:'.06em'}}>{title}</span>
        {right && <span style={{fontSize:10.5, color:'var(--ink-4)'}}>{right}</span>}
      </div>
      {children}
    </div>
  );
}

function CheckRow({ on, count, children }) {
  return (
    <div style={{
      display:'flex', alignItems:'center', gap:8,
      padding:'6px 8px', borderRadius:6,
      background: on?'var(--primary-100)':'transparent', cursor:'pointer',
    }}>
      <span style={{
        width:14, height:14, borderRadius:4,
        border: on?'none':'1.5px solid var(--line-strong)',
        background: on?'var(--primary)':'transparent',
        display:'inline-flex', alignItems:'center', justifyContent:'center',
      }}>
        {on && <Icon.check size={10}/>}
      </span>
      <span style={{flex:1, fontSize:12, color: on?'var(--ink-1)':'var(--ink-2)', fontWeight: on?500:400, whiteSpace:'nowrap', overflow:'hidden', textOverflow:'ellipsis'}}>{children}</span>
      {typeof count === 'number' && (
        <span style={{fontSize:10.5, color:'var(--ink-4)', fontVariantNumeric:'tabular-nums'}}>{count}</span>
      )}
    </div>
  );
}

function FreqRange() {
  return (
    <div style={{padding:'4px 8px'}}>
      <div style={{display:'flex', alignItems:'flex-end', gap:3, height:36, marginBottom:6}}>
        {[3,7,14,22,30,18,11,7,4,2].map((v,i) => (
          <div key={i} style={{
            flex:1, height: `${(v/30)*100}%`,
            background: i>=3 && i<=6 ? 'var(--primary)' : 'var(--bg-sunken)',
            borderRadius:'2px 2px 1px 1px',
          }}/>
        ))}
      </div>
      <div style={{position:'relative', height:18, marginTop:2}}>
        <div style={{position:'absolute', inset:'7px 0', height:3, borderRadius:99, background:'var(--bg-sunken)'}}/>
        <div style={{position:'absolute', top:7, left:'30%', right:'30%', height:3, borderRadius:99, background:'var(--primary)'}}/>
        <span style={{position:'absolute', top:0, left:'30%', width:14, height:14, borderRadius:99, background:'#fff', border:'2px solid var(--primary)', transform:'translateX(-50%)'}}/>
        <span style={{position:'absolute', top:0, left:'70%', width:14, height:14, borderRadius:99, background:'#fff', border:'2px solid var(--primary)', transform:'translateX(-50%)'}}/>
      </div>
      <div style={{display:'flex', justifyContent:'space-between', marginTop:4, fontSize:10.5, color:'var(--ink-3)'}}>
        <span>1 次</span><span>≥ 8 次</span>
      </div>
    </div>
  );
}

function YearChecks() {
  return (
    <div style={{display:'flex', flexWrap:'wrap', gap:6, padding:'0 4px'}}>
      {['2019','2020','2021','2022','2023','2024'].map((y,i) => (
        <span key={y} style={{
          padding:'4px 10px', borderRadius:6,
          fontSize:11, fontWeight:500,
          background: i>=3 ? 'var(--primary)' : 'var(--bg-sunken)',
          color: i>=3 ? '#fff' : 'var(--ink-3)',
          fontVariantNumeric:'tabular-nums', cursor:'pointer',
        }}>{y}</span>
      ))}
    </div>
  );
}

function ToggleButton({ on, label, tone }) {
  if (tone === 'primary') {
    return (
      <button style={{
        height:32, padding:'0 14px', borderRadius:8,
        background:'var(--primary)', color:'#fff', border:'none',
        fontSize:12.5, fontWeight:600, cursor:'pointer',
        display:'inline-flex', alignItems:'center', gap:6,
      }}>
        <Icon.spark size={12}/>{label}
      </button>
    );
  }
  return (
    <button style={{
      height:32, padding:'0 12px', borderRadius:8,
      background: on?'var(--bg-surface)':'transparent',
      border:'1px solid ' + (on?'var(--ink-1)':'var(--line)'),
      color: on?'var(--ink-1)':'var(--ink-3)',
      fontSize:12.5, fontWeight: on?600:500, cursor:'pointer',
    }}>{label}</button>
  );
}

function ActiveChip({ tone, children }) {
  const hi = tone === 'hi';
  return (
    <span style={{
      display:'inline-flex', alignItems:'center', gap:6,
      padding:'5px 10px', borderRadius:99,
      background: hi?'var(--freq-hi-bg)':'var(--primary-100)',
      color: hi?'var(--freq-hi-fg)':'var(--primary-700)',
      fontSize:11.5, fontWeight:500,
    }}>
      {children}
      <span style={{cursor:'pointer', opacity:.6, fontSize:13, lineHeight:1, marginRight:-2}}>×</span>
    </span>
  );
}

function sortPill(active) {
  return {
    height:28, padding:'0 12px', borderRadius:7,
    background: active?'var(--bg-surface)':'transparent',
    border:'1px solid ' + (active?'var(--line)':'transparent'),
    color: active?'var(--ink-1)':'var(--ink-3)',
    fontSize:12, fontWeight: active?600:500, cursor:'pointer',
  };
}

function miniLink() {
  return {
    background:'transparent', border:'none', cursor:'pointer',
    padding:'4px 8px', fontSize:11.5, color:'var(--primary)', fontWeight:500,
  };
}

function QuestionCard({ q }) {
  return (
    <div style={{
      background:'var(--bg-surface)', border:'1px solid var(--line)',
      borderRadius:12, padding:'14px 16px',
      boxShadow: q.expanded?'0 4px 18px rgba(45,95,213,.10)':'var(--shadow-1)',
      borderColor: q.expanded?'var(--primary-300)':'var(--line)',
      transition:'all .2s',
      display:'flex', flexDirection:'column', gap:10,
    }}>
      <div style={{display:'flex', alignItems:'center', gap:8, flexWrap:'wrap'}}>
        <span style={{
          fontSize:10.5, fontWeight:700, color:'var(--primary-700)',
          background:'var(--primary-100)', padding:'2px 8px', borderRadius:4,
          letterSpacing:'.04em',
        }}>{q.type}</span>
        <span style={{fontSize:11, color:'var(--ink-3)', fontVariantNumeric:'tabular-nums'}}>{q.y} · {q.src}</span>
        <span style={{flex:1}}/>
        <FreqChip n={q.freq} size="sm"/>
        <button style={ghostMini()}><Icon.bookmark size={13}/></button>
      </div>

      <div style={{
        fontSize:14, color:'var(--ink-1)', lineHeight:1.6,
        fontFamily:'var(--font-serif)',
      }}>{q.title}</div>

      {q.expanded && (
        <div style={{
          padding:'10px 12px', borderRadius:8, background:'var(--bg-sunken)',
          fontSize:12.5, color:'var(--ink-2)', lineHeight:1.65,
        }}>
          <div style={{fontSize:10.5, color:'var(--ink-3)', letterSpacing:'.06em', fontWeight:600, marginBottom:4}}>对应原文（节选）</div>
          {q.basis}
        </div>
      )}

      <div style={{
        display:'flex', alignItems:'center', gap:8,
        paddingTop:8, borderTop:'1px dashed var(--line-soft)',
        fontSize:11.5, color:'var(--ink-3)',
      }}>
        <span style={{fontFamily:'var(--font-mono)', color:'var(--ink-2)'}}>§{q.sec}</span>
        <span style={{flex:1, color:'var(--ink-2)', whiteSpace:'nowrap', overflow:'hidden', textOverflow:'ellipsis'}}>
          关联：<span style={{color:'var(--primary)', fontWeight:500}}>{q.point}</span>
        </span>
        <button style={{...ghostMini(), display:'inline-flex', alignItems:'center', gap:4, fontSize:11, fontWeight:500, padding:'4px 8px', color:'var(--primary)'}}>
          跳到原文 <Icon.arrow size={11}/>
        </button>
      </div>
    </div>
  );
}

function ghostMini() {
  return {
    background:'transparent', border:'none', cursor:'pointer',
    color:'var(--ink-3)', padding:4, borderRadius:5,
    display:'inline-flex', alignItems:'center', justifyContent:'center',
  };
}

Object.assign(window, { ExercisesArtboard });
