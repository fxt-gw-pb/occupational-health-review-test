// App root — assembles the design canvas with all artboards.
const { TweaksPanel, useTweaks, TweakSection, TweakSlider, TweakRadio, TweakSelect, TweakToggle } = window;

const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "theme": "light",
  "fontSize": 15,
  "readWidth": 720,
  "leading": 1.78,
  "showOverlay": true
}/*EDITMODE-END*/;

function applyTokens(t) {
  const cls = t.theme === 'dark' ? 'theme-dark' : t.theme === 'paper' ? 'theme-paper' : '';
  document.body.classList.remove('theme-dark','theme-paper');
  if (cls) document.body.classList.add(cls);
  document.documentElement.style.setProperty('--read-size',  t.fontSize + 'px');
  document.documentElement.style.setProperty('--read-width', t.readWidth + 'px');
  document.documentElement.style.setProperty('--read-leading', t.leading);
}

function App() {
  const [tweaks, setTweak] = useTweaks(TWEAK_DEFAULTS);
  React.useEffect(() => { applyTokens(tweaks); }, [tweaks]);

  const T = window;

  return (
    <>
      <TweaksPanel title="Tweaks">
        <TweakSection title="主题模式">
          <TweakRadio
            options={[
              {value:'light', label:'浅色'},
              {value:'paper', label:'护眼'},
              {value:'dark',  label:'深色'},
            ]}
            value={tweaks.theme} onChange={v => setTweak('theme', v)}
          />
        </TweakSection>

        <TweakSection title="阅读字号">
          <TweakSlider min={13} max={19} step={1}
            value={tweaks.fontSize} onChange={v => setTweak('fontSize', v)}
            displayValue={tweaks.fontSize + 'px'}/>
        </TweakSection>

        <TweakSection title="阅读宽度">
          <TweakSlider min={560} max={920} step={20}
            value={tweaks.readWidth} onChange={v => setTweak('readWidth', v)}
            displayValue={tweaks.readWidth + 'px'}/>
        </TweakSection>

        <TweakSection title="行距">
          <TweakSlider min={1.5} max={2.1} step={0.04}
            value={tweaks.leading} onChange={v => setTweak('leading', v)}
            displayValue={tweaks.leading.toFixed(2)}/>
        </TweakSection>

        <TweakSection title="说明叠层">
          <TweakToggle value={tweaks.showOverlay} onChange={v => setTweak('showOverlay', v)} label="显示画板说明"/>
        </TweakSection>
      </TweaksPanel>

      <T.DesignCanvas
        title="职业卫生学 · 复习网站"
        subtitle="静态视觉稿 · 1 个方向 / 5 个画板 · 1440 桌面端为主"
      >
        <T.DCSection id="overview" title="主流程"
          subtitle="完整复习闭环：仪表盘 → 章节浏览 → 知识点详情 → 题库 → 搜索">

          <T.DCArtboard id="chapter" label="① 章节浏览页 · HERO" width={1440} height={1320}>
            <Frame note={tweaks.showOverlay && {
              title:'章节浏览（HERO）',
              text:'三栏：章节导航 / 知识点列表 / 复习概览。考频热力 + 章节进度环 + 知识点关系图。',
            }}>
              <T.ChapterArtboard/>
            </Frame>
          </T.DCArtboard>

          <T.DCArtboard id="dashboard" label="② 首页 Dashboard" width={1440} height={1480}>
            <Frame note={tweaks.showOverlay && {
              title:'首页',
              text:'快速进入复习。统计 + 全站考频热力图 + 章节卡片 + 高频 Top + 最近复习。',
            }}>
              <T.DashboardArtboard/>
            </Frame>
          </T.DCArtboard>

          <T.DCArtboard id="detail" label="③ 知识点详情" width={1440} height={1300}>
            <Frame note={tweaks.showOverlay && {
              title:'知识点详情',
              text:'阅读优先版式。Tabs（知识点 / 往年题 / 速记 / 讨论），原文摘取使用衬线宋体。',
            }}>
              <T.DetailArtboard/>
            </Frame>
          </T.DCArtboard>

          <T.DCArtboard id="exercises" label="④ 题库 · 习题页" width={1440} height={1080}>
            <Frame note={tweaks.showOverlay && {
              title:'题库',
              text:'章节 / 题型 / 考频 / 年份多维筛选。"只看题目" ↔ "显示答案依据"切换支持自测。',
            }}>
              <T.ExercisesArtboard/>
            </Frame>
          </T.DCArtboard>

          <T.DCArtboard id="search" label="⑤ 搜索结果" width={1280} height={880}>
            <Frame note={tweaks.showOverlay && {
              title:'全站搜索',
              text:'⌘K 触发。结果分组：知识点 / 往年题 / 章节 / 英文术语，关键词高亮。',
            }}>
              <T.SearchArtboard/>
            </Frame>
          </T.DCArtboard>
        </T.DCSection>

        <T.DCSection id="foundations" title="设计基础" subtitle="字体 · 色彩 · 标签 · 状态">
          <T.DCArtboard id="tokens" label="设计 Tokens" width={1100} height={680}>
            <Frame>
              <T.FoundationsArtboard/>
            </Frame>
          </T.DCArtboard>
        </T.DCSection>
      </T.DesignCanvas>
    </>
  );
}

function Frame({ note, children }) {
  return (
    <div style={{position:'relative', width:'100%', height:'100%', background:'var(--bg-page)', borderRadius:8, overflow:'hidden'}}>
      {children}
      {note && (
        <div style={{
          position:'absolute', left:14, bottom:14,
          maxWidth:340, padding:'10px 12px',
          background:'rgba(15,27,51,.86)',
          color:'#fff', borderRadius:8,
          backdropFilter:'blur(6px)',
          fontSize:11.5, lineHeight:1.5,
          boxShadow:'0 6px 18px rgba(0,0,0,.18)',
          pointerEvents:'none',
        }}>
          <div style={{fontSize:10.5, fontWeight:700, letterSpacing:'.08em', opacity:.7, marginBottom:3}}>NOTE</div>
          <div style={{fontWeight:600, marginBottom:2}}>{note.title}</div>
          <div style={{opacity:.85}}>{note.text}</div>
        </div>
      )}
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App/>);
