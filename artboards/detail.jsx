// Knowledge-point detail artboard — 1440 wide.
// Reading-first: left chapter rail collapsed, large reading column,
// right rail with Tabs nav, original text excerpt, related questions, mnemonic.

const { Icon, FreqChip, HeatCell, Ring, Card, TopBar } = window;

function DetailArtboard() {
  const data = window.OH_DATA;
  const p = data.ch4Points[0];

  return (
    <div className="ab" style={{display:'flex', flexDirection:'column', height:'100%', overflow:'hidden'}}>
      <TopBar active="chapter"/>
      <div style={{display:'flex', flex:1, minHeight:0, background:'var(--bg-page)'}}>
        {/* Slim collapsed chapter rail */}
        <CollapsedRail/>

        {/* Reading column */}
        <main style={{
          flex:1, padding:'40px 56px 60px',
          display:'flex', justifyContent:'center',
          minWidth:0,
        }}>
          <article style={{maxWidth:'var(--read-width)', width:'100%'}}>
            {/* Crumb */}
            <div style={{display:'flex', alignItems:'center', gap:6, fontSize:12, color:'var(--ink-3)', marginBottom:16}}>
              <span>第四章 · 噪声与振动</span>
              <Icon.chev size={10}/>
              <span style={{fontFamily:'var(--font-mono)'}}>§4.2.1</span>
            </div>

            <div style={{display:'flex', alignItems:'flex-start', gap:14, marginBottom:14}}>
              <h1 style={{
                margin:0, fontSize:28, fontWeight:600, lineHeight:1.25,
                letterSpacing:'-0.018em', flex:1, color:'var(--ink-1)',
              }}>
                噪声对听觉系统的损伤
                <br/>
                <span style={{color:'var(--ink-3)', fontSize:18, fontWeight:500, fontFamily:'var(--font-serif)'}}>
                  暂时性听阈位移与永久性听阈位移
                </span>
              </h1>
              <div style={{display:'flex', flexDirection:'column', alignItems:'flex-end', gap:8, paddingTop:6}}>
                <FreqChip n={p.freq}/>
                <div style={{display:'flex', gap:4}}>
                  <button style={ghostIcon()}><Icon.bookmark size={14}/></button>
                  <button style={ghostIcon()}><Icon.check size={14}/></button>
                  <button style={ghostIcon()}><Icon.pen size={14}/></button>
                </div>
              </div>
            </div>

            {/* Meta strip */}
            <div style={{
              display:'grid', gridTemplateColumns:'repeat(4, 1fr)',
              gap:16, padding:'14px 16px',
              background:'var(--bg-surface)', borderRadius:12,
              border:'1px solid var(--line)', marginBottom:24,
            }}>
              <Meta k="所属章节" v="第四章" sub="噪声与振动"/>
              <Meta k="对应小节" v="§4.2.1" sub="噪声卫生学影响"/>
              <Meta k="历年考频" v="6 次" sub="2019—2024" tone="hi"/>
              <Meta k="关联往年题" v="4 道" sub="简答 2 · 名解 1 · 论述 1"/>
            </div>

            {/* Tabs */}
            <div style={{display:'flex', gap:0, borderBottom:'1px solid var(--line)', marginBottom:20}}>
              {[
                ['knowledge','知识点',true],
                ['exercises','往年题 · 4',false],
                ['mnemonic','速记',false],
                ['discussion','讨论 · 3',false],
              ].map(([k,l,a]) => (
                <button key={k} style={{
                  padding:'10px 14px',
                  border:'none', background:'transparent', cursor:'pointer',
                  fontSize:13.5, fontWeight: a?600:500,
                  color: a?'var(--ink-1)':'var(--ink-3)',
                  borderBottom: a?'2px solid var(--ink-1)':'2px solid transparent',
                  marginBottom:-1,
                }}>{l}</button>
              ))}
              <div style={{flex:1}}/>
              <div style={{display:'flex', alignItems:'center', gap:10, paddingRight:4}}>
                <span style={{fontSize:11, color:'var(--ink-3)'}}>阅读宽度</span>
                <div style={{display:'flex', borderRadius:7, border:'1px solid var(--line)', overflow:'hidden'}}>
                  <button style={readBtn(false)}>窄</button>
                  <button style={readBtn(true)}>中</button>
                  <button style={readBtn(false)}>宽</button>
                </div>
              </div>
            </div>

            {/* "匹配依据" callout */}
            <div style={{
              display:'flex', gap:12,
              padding:'12px 14px',
              background:'var(--primary-050)',
              borderLeft:'3px solid var(--primary)',
              borderRadius:'4px 10px 10px 4px',
              marginBottom:24,
            }}>
              <span style={{
                width:22, height:22, borderRadius:99,
                background:'var(--primary)', color:'#fff', flex:'0 0 22px',
                display:'inline-flex', alignItems:'center', justifyContent:'center',
                fontSize:11, fontWeight:700,
              }}>i</span>
              <div>
                <div style={{fontSize:11, color:'var(--ink-3)', letterSpacing:'.06em', fontWeight:600, marginBottom:4}}>匹配依据</div>
                <div style={{fontSize:13.5, color:'var(--ink-1)', lineHeight:1.7}}>
                  近五年简答 / 论述<strong style={{fontWeight:600}}>高频出现</strong>，2021、2022、2023 三年均直接命题；
                  名解类常单独考察 <span style={{fontFamily:'var(--font-mono)', background:'var(--bg-surface)', padding:'1px 5px', borderRadius:4, fontSize:12}}>TTS</span>
                  与 <span style={{fontFamily:'var(--font-mono)', background:'var(--bg-surface)', padding:'1px 5px', borderRadius:4, fontSize:12}}>PTS</span>
                  的鉴别。
                </div>
              </div>
            </div>

            {/* Reading body */}
            <h2 style={readH2()}>原文摘取</h2>
            <p style={readP()}>
              人耳长时间或反复暴露于较强噪声后，其听阈水平可发生不同程度的改变，按其可逆性可分为
              <Term>暂时性听阈位移</Term>（temporary threshold shift, <Code>TTS</Code>）与
              <Term>永久性听阈位移</Term>（permanent threshold shift, <Code>PTS</Code>）两大类。
            </p>
            <Quote>
              暂时性听阈位移系指人耳暴露于强噪声后听阈出现的暂时性升高，脱离噪声环境后可在数小时至数日内逐步恢复；其又可细分为<Term>听觉适应</Term>与<Term>听觉疲劳</Term>。
            </Quote>
            <p style={readP()}>
              <Term>听觉适应</Term>（auditory adaptation）：短时（数分钟）暴露于较强噪声后，听阈轻度升高（一般
              ≤ <Code>10–15 dB</Code>），脱离噪声环境后数分钟内即可完全恢复，属生理性保护反应。
            </p>
            <p style={readP()}>
              <Term>听觉疲劳</Term>（auditory fatigue）：暴露时间延长后听阈位移幅度显著加大（通常
              ≥ <Code>16 dB</Code>），脱离噪声后恢复时间需数小时至数日；若反复发生而未充分恢复，
              可累积发展为永久性听阈位移。
            </p>
            <p style={readP()}>
              <Term>永久性听阈位移</Term>是不可逆的听力损失，是<strong style={{fontWeight:600, color:'var(--ink-1)'}}>噪声性耳聋</strong>的主要病理基础。
              其早期表现为高频段（<Code>3000—6000 Hz</Code>，尤以 <Code>4000 Hz</Code> 最显）听阈选择性升高，
              呈典型 V 形听力曲线，称为 <Term>4 kHz 听力陷</Term>。
            </p>

            <h2 style={readH2()}>关键鉴别点</h2>
            <KeyTable/>

            <h2 style={readH2()}>速记口诀</h2>
            <div style={{
              padding:'14px 18px',
              border:'1px dashed var(--line-strong)',
              borderRadius:12,
              background:'var(--bg-sunken)',
              fontFamily:'var(--font-serif)',
              fontSize:15, lineHeight:1.9,
              color:'var(--ink-1)',
            }}>
              「<strong style={{color:'var(--freq-hi-fg)'}}>适应</strong>看分钟，
              <strong style={{color:'var(--freq-hi-fg)'}}>疲劳</strong>看数时，
              <strong style={{color:'var(--freq-hi-fg)'}}>陷四千</strong>不归，便成 <Code>PTS</Code>。」
            </div>

            {/* Footer nav */}
            <div style={{display:'flex', justifyContent:'space-between', alignItems:'center', marginTop:36, paddingTop:20, borderTop:'1px solid var(--line)'}}>
              <a style={navStep('prev')}>
                <Icon.arrow size={12}/>
                <div style={{display:'flex', flexDirection:'column', alignItems:'flex-start', lineHeight:1.3}}>
                  <span style={{fontSize:10.5, color:'var(--ink-4)', letterSpacing:'.06em'}}>上一知识点</span>
                  <span style={{fontSize:13, color:'var(--ink-2)', fontWeight:500}}>声波物理特性回顾</span>
                </div>
              </a>
              <a style={navStep('next')}>
                <div style={{display:'flex', flexDirection:'column', alignItems:'flex-end', lineHeight:1.3}}>
                  <span style={{fontSize:10.5, color:'var(--ink-4)', letterSpacing:'.06em'}}>下一知识点</span>
                  <span style={{fontSize:13, color:'var(--ink-2)', fontWeight:500}}>等效连续 A 声级 LAeq,T</span>
                </div>
                <Icon.arrow size={12}/>
              </a>
            </div>
          </article>
        </main>

        {/* Right rail — exercises */}
        <DetailRightRail/>
      </div>
    </div>
  );
}

function CollapsedRail() {
  const data = window.OH_DATA;
  return (
    <aside style={{
      width:64, flex:'0 0 64px',
      borderRight:'1px solid var(--line)',
      background:'var(--bg-sidebar)',
      display:'flex', flexDirection:'column', alignItems:'center',
      padding:'14px 0',
    }}>
      <button style={{...ghostIcon(), marginBottom:10}}>
        <Icon.arrow size={14} style={{transform:'rotate(180deg)'}}/>
      </button>
      <div style={{height:1, background:'var(--line-soft)', alignSelf:'stretch', margin:'4px 12px 10px'}}/>
      <div style={{display:'flex', flexDirection:'column', gap:4, alignItems:'center'}}>
        {data.chapters.slice(0,12).map(ch => {
          const a = ch.id === 4;
          return (
            <span key={ch.id} title={ch.title} style={{
              width:32, height:32, borderRadius:7,
              display:'inline-flex', alignItems:'center', justifyContent:'center',
              background: a ? 'var(--primary)' : 'transparent',
              color: a ? '#fff' : 'var(--ink-3)',
              fontSize:11, fontWeight:600, fontVariantNumeric:'tabular-nums',
              cursor:'pointer',
              border: a ? 'none' : '1px solid transparent',
            }}>{ch.id.toString().padStart(2,'0')}</span>
          );
        })}
      </div>
    </aside>
  );
}

function Meta({ k, v, sub, tone }) {
  return (
    <div>
      <div style={{fontSize:10.5, color:'var(--ink-3)', letterSpacing:'.06em', fontWeight:600}}>{k}</div>
      <div style={{
        marginTop:4, fontSize:16, fontWeight:600,
        color: tone==='hi' ? 'var(--freq-hi-fg)':'var(--ink-1)',
        letterSpacing:'-0.005em',
      }}>{v}</div>
      <div style={{fontSize:11, color:'var(--ink-3)', marginTop:2}}>{sub}</div>
    </div>
  );
}

function readH2() {
  return {
    fontSize:18, fontWeight:600, letterSpacing:'-0.005em',
    margin:'32px 0 14px', color:'var(--ink-1)',
    paddingLeft:12, borderLeft:'3px solid var(--ink-1)', lineHeight:1.2,
  };
}
function readP() {
  return {
    margin:'0 0 14px', fontSize:'var(--read-size)',
    lineHeight:'var(--read-leading)',
    color:'var(--ink-1)', fontFamily:'var(--font-serif)',
    textWrap:'pretty',
  };
}
function Term({ children }) {
  return <strong style={{
    fontWeight:600, color:'var(--ink-1)',
    background:'linear-gradient(transparent 60%, var(--primary-100) 60%)',
    padding:'0 1px',
  }}>{children}</strong>;
}
function Code({ children }) {
  return <code style={{
    fontFamily:'var(--font-mono)', fontSize:'0.86em',
    background:'var(--bg-sunken)', padding:'1px 6px',
    borderRadius:4, color:'var(--primary-700)',
    border:'1px solid var(--line-soft)',
    margin:'0 1px',
  }}>{children}</code>;
}
function Quote({ children }) {
  return (
    <blockquote style={{
      margin:'18px 0', padding:'12px 18px',
      borderLeft:'3px solid var(--primary-300)',
      background:'var(--primary-050)',
      borderRadius:'4px 10px 10px 4px',
      fontFamily:'var(--font-serif)', fontSize:14, lineHeight:1.75,
      color:'var(--ink-1)',
    }}>{children}</blockquote>
  );
}
function ghostIcon() {
  return {
    width:30, height:30, borderRadius:7, border:'none',
    background:'transparent', color:'var(--ink-3)',
    display:'inline-flex', alignItems:'center', justifyContent:'center', cursor:'pointer'
  };
}
function readBtn(active) {
  return {
    height:24, padding:'0 10px', border:'none',
    background: active?'var(--primary-100)':'transparent',
    color: active?'var(--ink-1)':'var(--ink-3)',
    fontSize:11, fontWeight:500, cursor:'pointer',
  };
}
function navStep(dir) {
  return {
    display:'inline-flex', alignItems:'center', gap:10,
    padding:'10px 14px', borderRadius:10,
    border:'1px solid var(--line)', background:'var(--bg-surface)',
    cursor:'pointer', maxWidth:280,
  };
}

function KeyTable() {
  const rows = [
    ['听觉适应', '< 10 分钟',  '≤ 10–15 dB',  '数分钟',     '生理性保护'],
    ['听觉疲劳', '数小时以上', '≥ 16 dB',     '数小时—数日', '可逆但累积'],
    ['TTS',     '一次较长暴露', '与剂量相关',  '数日内恢复', '可恢复'],
    ['PTS',     '长期累积',     '4 kHz 陷',   '不可恢复',   '噪声性耳聋'],
  ];
  return (
    <div style={{
      border:'1px solid var(--line)', borderRadius:10, overflow:'hidden',
      marginBottom:24, fontSize:12.5,
    }}>
      <div style={{
        display:'grid', gridTemplateColumns:'88px 1.1fr 1.1fr 1.1fr 1.3fr',
        background:'var(--bg-sunken)', padding:'10px 14px',
        fontSize:11, fontWeight:600, color:'var(--ink-3)', letterSpacing:'.04em',
      }}>
        <div>名词</div><div>暴露时间</div><div>位移幅度</div><div>恢复时间</div><div>本质</div>
      </div>
      {rows.map((r,i)=>(
        <div key={i} style={{
          display:'grid', gridTemplateColumns:'88px 1.1fr 1.1fr 1.1fr 1.3fr',
          padding:'10px 14px', borderTop:'1px solid var(--line-soft)',
          fontFamily:'var(--font-serif)', color:'var(--ink-1)', alignItems:'center',
          background: i===3?'var(--freq-hi-bg)':'transparent',
        }}>
          <div style={{fontWeight:600, fontFamily:'var(--font-mono)', fontSize:12, color: i===3?'var(--freq-hi-fg)':'var(--primary-700)'}}>{r[0]}</div>
          <div>{r[1]}</div><div>{r[2]}</div><div>{r[3]}</div><div>{r[4]}</div>
        </div>
      ))}
    </div>
  );
}

function DetailRightRail() {
  const data = window.OH_DATA;
  const exercises = data.ch4Exercises.filter(e => e.pointId === 'p41');

  return (
    <aside style={{
      width:328, flex:'0 0 328px',
      borderLeft:'1px solid var(--line)',
      background:'var(--bg-rail)',
      padding:'24px 18px',
      display:'flex', flexDirection:'column', gap:18,
      overflow:'hidden',
    }}>
      <div>
        <div className="eyebrow" style={{marginBottom:10}}>章节内目录</div>
        <Card padding={12}>
          {data.ch4Points.slice(0,6).map((p,i) => (
            <div key={p.id} style={{
              display:'flex', alignItems:'center', gap:10,
              padding:'7px 8px', borderRadius:7,
              background: i===0?'var(--primary-100)':'transparent',
              cursor:'pointer',
            }}>
              <span style={{fontSize:10.5, color:i===0?'var(--primary)':'var(--ink-4)', fontFamily:'var(--font-mono)', minWidth:36}}>§{p.section}</span>
              <span style={{flex:1, fontSize:12, fontWeight: i===0?600:500, color: i===0?'var(--ink-1)':'var(--ink-2)', whiteSpace:'nowrap', overflow:'hidden', textOverflow:'ellipsis'}}>{p.title.split('（')[0]}</span>
              <FreqChip n={p.freq} size="sm"/>
            </div>
          ))}
        </Card>
      </div>

      <div>
        <div style={{display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:10}}>
          <span className="eyebrow">关联往年题 · 4</span>
          <span style={{fontSize:10.5, color:'var(--primary)', fontWeight:500, cursor:'pointer'}}>仅看题</span>
        </div>
        <div style={{display:'flex', flexDirection:'column', gap:8}}>
          {exercises.concat(data.ch4Exercises.slice(0,2)).slice(0,3).map((q, i) => (
            <Card key={q.id+i} padding={12}>
              <div style={{display:'flex', alignItems:'center', gap:8, marginBottom:6}}>
                <span style={{
                  fontSize:10, fontWeight:600, color:'var(--primary-700)',
                  background:'var(--primary-100)', padding:'2px 7px', borderRadius:4,
                }}>{q.type}</span>
                <span style={{fontSize:10.5, color:'var(--ink-3)', fontVariantNumeric:'tabular-nums'}}>{q.year} 期末</span>
                <span style={{flex:1}}/>
                <span style={{fontSize:10, color:'var(--ink-4)'}}>{q.source.split(' ').pop()}</span>
              </div>
              <div style={{fontSize:13, color:'var(--ink-1)', lineHeight:1.6, fontFamily:'var(--font-serif)'}}>
                {q.title}
              </div>
              <div style={{display:'flex', gap:6, marginTop:8}}>
                <button style={tinyBtn(true)}>显示答案依据</button>
                <button style={tinyBtn(false)}>跳到对应原文</button>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </aside>
  );
}

function tinyBtn(primary) {
  return {
    height:26, padding:'0 10px', borderRadius:6,
    background: primary?'var(--primary)':'transparent',
    color: primary?'#fff':'var(--ink-2)',
    border: primary?'none':'1px solid var(--line)',
    fontSize:11, fontWeight:500, cursor:'pointer',
  };
}

Object.assign(window, { DetailArtboard });
