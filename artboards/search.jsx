// Search results + Foundations artboards (small)

const { Icon, FreqChip, HeatCell, Card, TopBar } = window;

/* ───── Search Results artboard (1280×880) ───── */
function SearchArtboard() {
  return (
    <div className="ab" style={{display:'flex', flexDirection:'column', height:'100%', overflow:'hidden'}}>
      <div style={{
        height:56, padding:'0 24px', display:'flex', alignItems:'center', gap:14,
        borderBottom:'1px solid var(--line)', background:'var(--bg-surface)',
      }}>
        <button style={{...iconBoxStyle(), border:'1px solid var(--line)'}}>
          <Icon.arrow size={14} style={{transform:'rotate(180deg)'}}/>
        </button>
        <div style={{
          flex:1, display:'flex', alignItems:'center', gap:10,
          height:38, padding:'0 14px', borderRadius:10,
          background:'var(--bg-page)', border:'1px solid var(--primary-300)',
          boxShadow:'0 0 0 4px var(--primary-050)',
        }}>
          <Icon.search size={16}/>
          <span style={{fontSize:14, color:'var(--ink-1)', fontWeight:500, fontFamily:'var(--font-serif)'}}>
            听阈位移
            <span style={{display:'inline-block', width:1, height:14, background:'var(--ink-1)', marginLeft:2, verticalAlign:'-2px', animation:'none'}}/>
          </span>
          <span style={{flex:1}}/>
          <span className="kbd">esc</span>
        </div>
      </div>

      <div style={{display:'flex', flex:1, minHeight:0, background:'var(--bg-page)'}}>
        {/* Filters */}
        <aside style={{
          width:220, flex:'0 0 220px', borderRight:'1px solid var(--line)',
          background:'var(--bg-sidebar)', padding:'18px 14px',
        }}>
          <FilterBlock title="结果分组">
            {[
              ['知识点', 12, true],
              ['往年题', 8, true],
              ['章节',  2, true],
              ['英文术语', 4, true],
            ].map(([k,n,on])=>(
              <FilterRow key={k} on={on} count={n}>{k}</FilterRow>
            ))}
          </FilterBlock>

          <FilterBlock title="章节">
            {[['第四章 · 噪声与振动',9,true],['第六章 · 粉尘与尘肺病',3,false],['其他',2,false]].map(([k,n,on])=>(
              <FilterRow key={k} on={on} count={n}>{k}</FilterRow>
            ))}
          </FilterBlock>

          <FilterBlock title="考频">
            <FilterRow on count={6}>高频</FilterRow>
            <FilterRow on count={4}>中频</FilterRow>
            <FilterRow count={2}>低频</FilterRow>
          </FilterBlock>

          <FilterBlock title="题型">
            <FilterRow on count={3}>名词解释</FilterRow>
            <FilterRow on count={3}>简答</FilterRow>
            <FilterRow count={1}>论述</FilterRow>
            <FilterRow count={1}>单选</FilterRow>
          </FilterBlock>

          <FilterBlock title="疑似匹配">
            <FilterRow>仅看高置信度</FilterRow>
          </FilterBlock>
        </aside>

        {/* Results */}
        <main style={{flex:1, padding:'24px 36px', overflow:'hidden'}}>
          <div style={{display:'flex', alignItems:'baseline', justifyContent:'space-between', marginBottom:18}}>
            <div>
              <h1 style={{margin:0, fontSize:22, fontWeight:600, letterSpacing:'-0.015em'}}>
                "听阈位移" 的搜索结果
                <span style={{color:'var(--ink-3)', fontWeight:500, fontSize:14, marginLeft:10, fontVariantNumeric:'tabular-nums'}}>26 条</span>
              </h1>
              <p style={{margin:'6px 0 0', fontSize:12, color:'var(--ink-3)'}}>
                跨越 3 章 · 12 个知识点 · 8 道往年题 · 0.18 秒
              </p>
            </div>
            <div style={{display:'flex', gap:6}}>
              <span style={{...sortPillStyle(true)}}>相关度</span>
              <span style={{...sortPillStyle(false)}}>考频</span>
              <span style={{...sortPillStyle(false)}}>章节顺序</span>
            </div>
          </div>

          {/* Group: knowledge points */}
          <ResultGroup title="知识点" count="12 条" icon={<Icon.book size={13}/>}>
            <ResultPoint
              title={<>噪声对听觉系统的损伤（暂时性<HL>听阈位移</HL>与永久性<HL>听阈位移</HL>）</>}
              ch="第四章 · §4.2.1" freq={6}
              snippet={<>暴露于强噪声后<HL>听阈</HL>出现的暂时性升高，脱离噪声环境后可在数小时至数日内逐步恢复……</>}
            />
            <ResultPoint
              title={<>听觉适应、听觉疲劳与噪声性耳聋的鉴别</>}
              ch="第四章 · §4.2.2" freq={4}
              snippet={<>听觉适应：短时暴露下<HL>听阈</HL>轻度升高；听觉疲劳：暴露时间较长后<HL>听阈</HL>明显升高……</>}
            />
            <ResultPoint
              title={<>等效连续 A 声级 LAeq,T 的物理含义与计算原则</>}
              ch="第四章 · §4.1.3" freq={5}
              snippet={<>……用同一时段内能量等效的稳态噪声所对应的 A 声级表征非稳态噪声对<HL>听</HL>觉系统的累积作用。</>}
            />
          </ResultGroup>

          {/* Group: questions */}
          <ResultGroup title="往年题" count="8 条" icon={<Icon.pen size={13}/>}>
            <ResultQ y="2024" type="简答" title={<>试述噪声对人体的特异性损害与非特异性损害，并举例说明。</>} hl={false}/>
            <ResultQ y="2022" type="名解" title={<>暂时性<HL>听阈位移</HL>（TTS）</>}/>
            <ResultQ y="2021" type="简答" title={<>试述<HL>听阈位移</HL>的分类及其卫生学意义。</>}/>
          </ResultGroup>

          {/* Group: term */}
          <ResultGroup title="英文术语" count="4 条" icon={<Icon.beaker size={13}/>}>
            <ResultTerm en="Temporary Threshold Shift" abbr="TTS" zh="暂时性听阈位移" link="第四章 · §4.2.1"/>
            <ResultTerm en="Permanent Threshold Shift" abbr="PTS" zh="永久性听阈位移" link="第四章 · §4.2.1"/>
          </ResultGroup>
        </main>
      </div>
    </div>
  );
}

function FilterBlock({ title, children }) {
  return (
    <div style={{marginBottom:16}}>
      <div style={{padding:'0 4px 6px', fontSize:11, fontWeight:600, color:'var(--ink-3)', letterSpacing:'.06em'}}>{title}</div>
      {children}
    </div>
  );
}
function FilterRow({ on, count, children }) {
  return (
    <div style={{
      display:'flex', alignItems:'center', gap:8, padding:'6px 8px',
      borderRadius:6, background: on?'var(--primary-100)':'transparent', cursor:'pointer'
    }}>
      <span style={{
        width:13, height:13, borderRadius:3,
        border: on?'none':'1.5px solid var(--line-strong)',
        background: on?'var(--primary)':'transparent',
        display:'inline-flex', alignItems:'center', justifyContent:'center',
      }}>{on && <Icon.check size={9}/>}</span>
      <span style={{flex:1, fontSize:12, color:on?'var(--ink-1)':'var(--ink-2)', fontWeight:on?500:400}}>{children}</span>
      {typeof count==='number' && <span style={{fontSize:10.5, color:'var(--ink-4)', fontVariantNumeric:'tabular-nums'}}>{count}</span>}
    </div>
  );
}

function HL({ children }) {
  return <mark style={{
    background:'#fff3a8', color:'inherit', padding:'0 2px', borderRadius:2,
    boxShadow:'inset 0 -2px 0 rgba(192,140,0,.2)', fontWeight:500,
  }}>{children}</mark>;
}

function ResultGroup({ title, count, icon, children }) {
  return (
    <section style={{marginBottom:22}}>
      <div style={{
        display:'flex', alignItems:'center', gap:8,
        padding:'8px 0 12px', borderBottom:'1px solid var(--line)',
        marginBottom:10,
      }}>
        <span style={{
          width:22, height:22, borderRadius:5, background:'var(--primary-100)',
          color:'var(--primary)', display:'inline-flex', alignItems:'center', justifyContent:'center',
        }}>{icon}</span>
        <h2 style={{margin:0, fontSize:13, fontWeight:600, color:'var(--ink-1)'}}>{title}</h2>
        <span style={{fontSize:11, color:'var(--ink-3)'}}>{count}</span>
      </div>
      <div style={{display:'flex', flexDirection:'column', gap:8}}>{children}</div>
    </section>
  );
}

function ResultPoint({ title, ch, freq, snippet }) {
  return (
    <a style={{
      display:'block', padding:'12px 14px', borderRadius:10,
      background:'var(--bg-surface)', border:'1px solid var(--line)',
      cursor:'pointer',
    }}>
      <div style={{display:'flex', alignItems:'baseline', gap:10}}>
        <h3 style={{margin:0, flex:1, fontSize:14, fontWeight:600, color:'var(--ink-1)', lineHeight:1.4}}>{title}</h3>
        <FreqChip n={freq} size="sm"/>
      </div>
      <div style={{margin:'6px 0', fontSize:12.5, color:'var(--ink-2)', lineHeight:1.7, fontFamily:'var(--font-serif)'}}>{snippet}</div>
      <div style={{fontSize:11, color:'var(--ink-3)', display:'flex', alignItems:'center', gap:6}}>
        <Icon.book size={12}/>
        <span>{ch}</span>
      </div>
    </a>
  );
}

function ResultQ({ y, type, title }) {
  return (
    <a style={{
      display:'flex', alignItems:'flex-start', gap:10,
      padding:'10px 14px', borderRadius:10,
      background:'var(--bg-surface)', border:'1px solid var(--line)',
    }}>
      <span style={{
        fontSize:10.5, fontWeight:700, color:'var(--primary-700)',
        background:'var(--primary-100)', padding:'2px 7px', borderRadius:4,
      }}>{type}</span>
      <span style={{fontSize:11, color:'var(--ink-3)', fontVariantNumeric:'tabular-nums', minWidth:34}}>{y}</span>
      <span style={{flex:1, fontSize:13, color:'var(--ink-1)', fontFamily:'var(--font-serif)', lineHeight:1.5}}>{title}</span>
      <Icon.arrow size={12}/>
    </a>
  );
}

function ResultTerm({ en, abbr, zh, link }) {
  return (
    <div style={{
      display:'flex', alignItems:'center', gap:14,
      padding:'10px 14px', borderRadius:10,
      background:'var(--bg-surface)', border:'1px solid var(--line)',
    }}>
      <div style={{flex:1}}>
        <div style={{display:'flex', alignItems:'baseline', gap:8}}>
          <span style={{fontSize:13.5, fontWeight:600, color:'var(--ink-1)'}}>{en}</span>
          <span style={{fontSize:10.5, color:'var(--primary)', background:'var(--primary-100)', padding:'1px 6px', borderRadius:4, fontFamily:'var(--font-mono)', fontWeight:600}}>{abbr}</span>
        </div>
        <div style={{fontSize:12, color:'var(--ink-3)', marginTop:3}}>{zh}</div>
      </div>
      <div style={{fontSize:11, color:'var(--ink-3)', display:'inline-flex', alignItems:'center', gap:4}}>
        <Icon.book size={12}/>{link}
      </div>
    </div>
  );
}

function iconBoxStyle() {
  return { width:32, height:32, borderRadius:8, background:'transparent', display:'inline-flex', alignItems:'center', justifyContent:'center', cursor:'pointer' };
}
function sortPillStyle(active) {
  return {
    height:28, padding:'0 12px', borderRadius:7,
    display:'inline-flex', alignItems:'center',
    background: active?'var(--bg-surface)':'transparent',
    border:'1px solid ' + (active?'var(--line)':'transparent'),
    color: active?'var(--ink-1)':'var(--ink-3)',
    fontSize:12, fontWeight: active?600:500, cursor:'pointer',
  };
}

/* ───── Foundations artboard — design tokens (1100×680) ───── */
function FoundationsArtboard() {
  return (
    <div className="ab" style={{padding:'28px 32px', overflow:'hidden'}}>
      <div style={{display:'flex', alignItems:'baseline', gap:14, marginBottom:22}}>
        <h1 style={{margin:0, fontSize:22, fontWeight:600, letterSpacing:'-0.015em'}}>设计系统 · Foundations</h1>
        <span style={{fontSize:12, color:'var(--ink-3)'}}>OH Review · 学术蓝主色 · 中等密度</span>
      </div>

      <div style={{display:'grid', gridTemplateColumns:'1.1fr 1fr 1fr', gap:18}}>
        {/* Type */}
        <Card padding={18}>
          <div className="eyebrow" style={{marginBottom:12}}>字体系统</div>
          <div style={{display:'flex', flexDirection:'column', gap:14}}>
            <TypeRow size={28} weight={600} label="H1 · 28/600"  letterSpacing="-0.018em">职业卫生学复习</TypeRow>
            <TypeRow size={20} weight={600} label="H2 · 20/600">章节内标题</TypeRow>
            <TypeRow size={15} weight={600} label="Title · 15/600">知识点卡片标题</TypeRow>
            <TypeRow size={15} weight={400} family="var(--font-serif)" label="Body · 15/400 Serif">正文阅读区使用宋体衬线，中文行距 1.78。</TypeRow>
            <TypeRow size={13} weight={500} label="Meta · 13/500">考频 · 小节 · 关联</TypeRow>
            <TypeRow size={11} weight={600} family="var(--font-mono)" label="Mono · 11/600" letterSpacing=".04em">§4.2.1 · LAeq,T</TypeRow>
          </div>
        </Card>

        {/* Color */}
        <Card padding={18}>
          <div className="eyebrow" style={{marginBottom:12}}>主色 & 中性色</div>
          <div style={{display:'grid', gridTemplateColumns:'repeat(3, 1fr)', gap:8, marginBottom:18}}>
            <Swatch hex="#2d5fd5" name="Primary" sub="--primary"/>
            <Swatch hex="#1f4ec0" name="Primary 700" sub="--primary-700"/>
            <Swatch hex="#e8f0ff" name="Primary 100" sub="--primary-100"/>
            <Swatch hex="#0e1b33" name="Ink 1" sub="--ink-1"/>
            <Swatch hex="#3a4a64" name="Ink 2" sub="--ink-2"/>
            <Swatch hex="#6c7c93" name="Ink 3" sub="--ink-3"/>
            <Swatch hex="#f4f6fa" name="Page" sub="--bg-page"/>
            <Swatch hex="#ffffff" name="Surface" sub="--bg-surface" line/>
            <Swatch hex="#e6eaf1" name="Line" sub="--line"/>
          </div>

          <div className="eyebrow" style={{marginBottom:10}}>考频热力刻度</div>
          <div style={{display:'flex', alignItems:'center', gap:6}}>
            {[0,1,2,3,4,5].map(l => (
              <div key={l} style={{flex:1, textAlign:'center'}}>
                <div style={{height:22, borderRadius:4, background:`var(--heat-${l})`}}/>
                <div style={{fontSize:10, color:'var(--ink-3)', marginTop:4, fontVariantNumeric:'tabular-nums'}}>{l}</div>
              </div>
            ))}
          </div>
        </Card>

        {/* Tags & components */}
        <Card padding={18}>
          <div className="eyebrow" style={{marginBottom:12}}>考频标签</div>
          <div style={{display:'flex', flexDirection:'column', gap:8, marginBottom:18}}>
            <TagRow><FreqChip n={6}/><span className="muted" style={{fontSize:11}}>高频 · 考频 ≥ 5 · 暖红</span></TagRow>
            <TagRow><FreqChip n={4}/><span className="muted" style={{fontSize:11}}>中频 · 3 ≤ 考频 &lt; 5 · 学术蓝</span></TagRow>
            <TagRow><FreqChip n={2}/><span className="muted" style={{fontSize:11}}>低频 · 考频 &lt; 3 · 灰绿</span></TagRow>
          </div>

          <div className="eyebrow" style={{marginBottom:10}}>题型标识</div>
          <div style={{display:'flex', gap:6, flexWrap:'wrap', marginBottom:14}}>
            {['名解','简答','论述','单选','应用'].map(t => (
              <span key={t} style={{
                fontSize:10.5, fontWeight:700, color:'var(--primary-700)',
                background:'var(--primary-100)', padding:'3px 8px', borderRadius:4, letterSpacing:'.04em',
              }}>{t}</span>
            ))}
          </div>

          <div className="eyebrow" style={{marginBottom:10}}>状态点</div>
          <div style={{display:'flex', gap:8, flexWrap:'wrap'}}>
            {[
              ['已掌握','var(--success)'],
              ['复习中','var(--primary)'],
              ['待复习','#a86b14'],
              ['未开始','var(--ink-4)'],
            ].map(([k,c])=>(
              <span key={k} style={{
                display:'inline-flex', alignItems:'center', gap:5,
                fontSize:11, color:'var(--ink-2)',
                padding:'2px 8px', borderRadius:99, background:'var(--bg-sunken)',
              }}>
                <span style={{width:6, height:6, borderRadius:99, background:c}}/>{k}
              </span>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}

function TypeRow({ size, weight, family, letterSpacing, label, children }) {
  return (
    <div>
      <div style={{fontSize:10, color:'var(--ink-4)', letterSpacing:'.05em', fontFamily:'var(--font-mono)', marginBottom:4}}>{label}</div>
      <div style={{
        fontSize:size, fontWeight:weight,
        fontFamily: family || 'var(--font-sans)',
        letterSpacing: letterSpacing || '-0.005em',
        color:'var(--ink-1)', lineHeight:1.3,
      }}>{children}</div>
    </div>
  );
}
function Swatch({ hex, name, sub, line }) {
  return (
    <div>
      <div style={{
        height:36, borderRadius:6, background:hex,
        boxShadow: line?'inset 0 0 0 1px var(--line)':'none',
      }}/>
      <div style={{fontSize:11, fontWeight:600, color:'var(--ink-1)', marginTop:5}}>{name}</div>
      <div style={{fontSize:10, color:'var(--ink-3)', fontFamily:'var(--font-mono)'}}>{sub}</div>
    </div>
  );
}
function TagRow({ children }) {
  return <div style={{display:'flex', alignItems:'center', gap:10}}>{children}</div>;
}

Object.assign(window, { SearchArtboard, FoundationsArtboard });
