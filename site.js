// Review site app — vanilla JS, hash routing.

(function () {
  const D = window.SITE_DATA;
  if (!D) {
    document.body.innerHTML = '<div style="padding:40px">数据未加载，请先运行 <code>node build-data.js</code> 生成 site-data.js。</div>';
    return;
  }

  // ── Lookup helpers ───────────────────────────────────────────
  const chById = new Map(D.chapters.map(c => [c.id, c]));
  const pointById = new Map();
  for (const ch of D.chapters) {
    for (const p of ch.points) pointById.set(p.id, p);
  }

  // Persistent state (mastered marks)
  const STORE_KEY = 'oh-review-mastered-v1';
  let mastered = new Set();
  try {
    const raw = localStorage.getItem(STORE_KEY);
    if (raw) mastered = new Set(JSON.parse(raw));
  } catch (_) {}
  function toggleMastered(pid) {
    if (mastered.has(pid)) mastered.delete(pid); else mastered.add(pid);
    localStorage.setItem(STORE_KEY, JSON.stringify([...mastered]));
  }

  // Theme
  const THEME_KEY = 'oh-review-theme-v1';
  const THEMES = ['light', 'paper', 'dark'];
  function getTheme() { return localStorage.getItem(THEME_KEY) || 'light'; }
  function setTheme(t) {
    localStorage.setItem(THEME_KEY, t);
    document.body.classList.remove('theme-paper', 'theme-dark');
    if (t === 'paper') document.body.classList.add('theme-paper');
    if (t === 'dark') document.body.classList.add('theme-dark');
  }
  setTheme(getTheme());

  // ── Routing ──────────────────────────────────────────────────
  function parseRoute() {
    const raw = location.hash.replace(/^#/, '') || '/';
    const [pathPart, queryPart] = raw.split('?');
    const segs = pathPart.split('/').filter(Boolean);
    const query = {};
    if (queryPart) {
      for (const kv of queryPart.split('&')) {
        const [k, v] = kv.split('=');
        query[decodeURIComponent(k)] = decodeURIComponent(v || '');
      }
    }
    return { segs, query };
  }
  function go(hash) {
    if (location.hash === hash) render(); else location.hash = hash;
  }

  // ── Util ────────────────────────────────────────────────────
  function escapeHTML(s) {
    return String(s == null ? '' : s)
      .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;').replace(/'/g, '&#39;');
  }
  function highlight(text, q) {
    if (!q) return escapeHTML(text);
    const safe = escapeHTML(text);
    const tokens = q.split(/\s+/).filter(t => t.length > 0);
    if (!tokens.length) return safe;
    const re = new RegExp('(' + tokens.map(t => t.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')).join('|') + ')', 'gi');
    return safe.replace(re, '<mark>$1</mark>');
  }
  function freqClass(n) {
    if (n >= 4) return 'hi';
    if (n >= 2) return 'mid';
    return 'low';
  }
  function freqLabel(n) {
    if (n >= 4) return '高频';
    if (n >= 2) return '中频';
    return '低频';
  }
  function pad2(n) { return String(n).padStart(2, '0'); }

  // ── Render shell ────────────────────────────────────────────
  function renderShell() {
    document.body.innerHTML = `
      <div class="app">
        <header class="topbar">
          <button class="icon-btn menu-btn" id="menu-btn" aria-label="菜单" title="章节目录">
            <span class="menu-icon"></span>
          </button>
          <div class="brand" id="brand">
            <span class="brand-dot">职</span>
            <span class="brand-text">职业卫生学复习</span>
            <span class="brand-sub">· 往年题考点</span>
          </div>
          <div class="search-box" id="search-box">
            <span aria-hidden="true">⌕</span>
            <input id="search-input" placeholder="搜索知识点 / 往年题 / 关键词…" autocomplete="off"/>
            <span class="kbd">⌘K</span>
          </div>
          <nav id="topnav">
            <a data-route="/" id="nav-home">首页</a>
            <a data-route="/exercises" id="nav-ex">题库</a>
          </nav>
          <button class="icon-btn" id="theme-btn" title="切换主题">◐</button>
        </header>
        <div class="main">
          <aside class="sidebar" id="sidebar"></aside>
          <main class="content"><div class="content-inner" id="content"></div></main>
        </div>
        <div class="sidebar-backdrop" id="sidebar-backdrop" aria-hidden="true"></div>
      </div>
      <div id="palette-mount"></div>
    `;

    // Wire events
    document.getElementById('brand').onclick = () => go('#/');
    document.getElementById('theme-btn').onclick = () => {
      const t = getTheme();
      const next = THEMES[(THEMES.indexOf(t) + 1) % THEMES.length];
      setTheme(next);
    };
    document.getElementById('topnav').addEventListener('click', (e) => {
      const a = e.target.closest('a[data-route]');
      if (a) { e.preventDefault(); go('#' + a.dataset.route); }
    });

    document.getElementById('menu-btn').onclick = (e) => {
      e.stopPropagation();
      document.body.classList.toggle('sidebar-open');
    };
    document.getElementById('sidebar-backdrop').onclick = () => {
      document.body.classList.remove('sidebar-open');
    };

    const sb = document.getElementById('search-box');
    sb.onclick = () => openPalette();

    document.addEventListener('keydown', (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault(); openPalette();
      } else if (e.key === '/' && document.activeElement === document.body) {
        e.preventDefault(); openPalette();
      } else if (e.key === 'Escape') {
        closePalette();
      }
    });
  }

  function renderSidebar(activeChId) {
    const sb = document.getElementById('sidebar');
    const items = D.chapters.map(c => {
      const lvl = Math.min(5, Math.max(1, Math.round(c.peak)));
      const isActive = c.id === activeChId;
      return `
        <li>
          <a class="ch ${isActive ? 'active' : ''}" data-ch="${c.id}">
            <span class="ch-num">${pad2(c.id)}</span>
            <span class="ch-title">${escapeHTML(c.title)}</span>
            <span class="ch-meta">
              <span class="ch-dot lvl-${lvl}"></span>
              ${c.points.length}
            </span>
          </a>
        </li>`;
    }).join('');
    sb.innerHTML = `<h4>章节 · ${D.chapters.length}</h4><ol>${items}</ol>`;
    if (!sb.dataset.bound) {
      sb.dataset.bound = '1';
      sb.addEventListener('click', (e) => {
        const a = e.target.closest('a.ch');
        if (a) go(`#/ch/${a.dataset.ch}`);
      });
    }
  }

  // ── Views ───────────────────────────────────────────────────
  function viewHome() {
    const total = D.meta;
    const topPoints = D.chapters
      .flatMap(c => c.points.map(p => ({ ...p, chapterTitle: c.title })))
      .sort((a, b) => b.freq - a.freq || a.chapterId - b.chapterId)
      .slice(0, 8);

    return `
      <div class="page-eyebrow">REVIEW · 2026 春</div>
      <h1 class="page-title">职业卫生学 · 往年题考点复习</h1>
      <p class="page-sub">基于《职业卫生学知识点总结》PDF 与 04 / 09 / 10 / 11 / 14 / 21 / 24 级往年题整理。同章节内按考频从高到低排序，仅纳入往年题中确实出现过的知识点。</p>

      <div class="stat-row">
        <div class="stat"><div class="v">${total.chapters}</div><div class="k">章节</div></div>
        <div class="stat"><div class="v">${total.points}</div><div class="k">命中知识点</div></div>
        <div class="stat hi"><div class="v">${total.hiFreqPoints}</div><div class="k">高频考点（≥3 次）</div></div>
        <div class="stat"><div class="v">${total.questions}</div><div class="k">往年题条目</div></div>
      </div>

      <div style="display:flex;align-items:flex-end;justify-content:space-between;margin:16px 0 8px">
        <h2 style="margin:0;font-size:17px;font-weight:600;">章节速览</h2>
        <span class="muted" style="font-size:12px">点击进入章节复习</span>
      </div>
      <div class="ch-grid">
        ${D.chapters.map(c => {
          const tested = c.points.length;
          const masteredHere = c.points.filter(p => mastered.has(p.id)).length;
          const pct = tested ? masteredHere / tested : 0;
          return `
            <a class="ch-card" data-ch="${c.id}">
              <div>
                <div class="ch-no">第 ${pad2(c.id)} 章</div>
                <div class="ch-name">${escapeHTML(c.title)}</div>
              </div>
              <div class="ch-bar"><span style="width:${Math.round(pct * 100)}%"></span></div>
              <div class="ch-stats">
                <span><b>${c.points.length}</b>知识点</span>
                <span><b>${c.totalQuestions}</b>题</span>
                <span><b>${c.hi}</b>高频</span>
              </div>
            </a>`;
        }).join('')}
      </div>

      <h2 style="margin:24px 0 10px;font-size:17px;font-weight:600;">全站高频 Top 8</h2>
      <div>
        ${topPoints.map((p, i) => kpCardHTML(p, i + 1, false)).join('')}
      </div>
    `;
  }

  function attachHomeHandlers() {
    document.querySelectorAll('.ch-card[data-ch]').forEach(el => {
      el.addEventListener('click', () => go(`#/ch/${el.dataset.ch}`));
    });
    attachKPHandlers();
  }

  function viewChapter(chId) {
    const ch = chById.get(chId);
    if (!ch) return `<div class="empty">未找到第 ${chId} 章。</div>`;

    const peak = ch.peak || 1;
    const heat = ch.points.map((p, i) => {
      const ratio = p.freq / peak;
      const lvl = Math.min(5, Math.max(0, Math.round(ratio * 5)));
      const h = 6 + ratio * 44;
      return `
        <a class="heat-col" href="#/p/${p.id}" title="${escapeHTML(p.title)} · ${p.freq} 次">
          <div class="heat-bar" style="height:${h}px;background:var(--heat-${lvl})"></div>
          <span class="lbl">${pad2(i + 1)}</span>
        </a>`;
    }).join('');

    const masteredHere = ch.points.filter(p => mastered.has(p.id)).length;

    return `
      <div class="crumb">
        <a data-route="/">首页</a>
        <span class="sep">›</span>
        <span>第 ${pad2(ch.id)} 章</span>
      </div>
      <div style="display:flex;align-items:flex-start;justify-content:space-between;gap:24px;flex-wrap:wrap">
        <div style="flex:1;min-width:280px">
          <div class="page-eyebrow">第 ${pad2(ch.id)} 章 · CHAPTER ${ch.id}</div>
          <h1 class="page-title">${escapeHTML(ch.title)}</h1>
          <p class="page-sub">本章共纳入 <strong>${ch.points.length}</strong> 个被往年题命中的知识点，对应 <strong>${ch.totalQuestions}</strong> 道往年题；其中峰值考频为 <strong>${ch.peak}</strong> 次。</p>
        </div>
        <div class="stat-row" style="flex:0 0 auto;grid-template-columns:repeat(3, minmax(80px, 1fr));margin-top:6px;min-width:280px">
          <div class="stat"><div class="v">${ch.points.length}</div><div class="k">知识点</div></div>
          <div class="stat hi"><div class="v">${ch.hi}</div><div class="k">高频</div></div>
          <div class="stat"><div class="v">${masteredHere}/${ch.points.length}</div><div class="k">已掌握</div></div>
        </div>
      </div>

      <div class="heat-strip">
        <div class="heat-strip-head">
          <div class="eyebrow">本章考频热力</div>
          <div class="heat-legend">
            <span>低</span>
            ${[0,1,2,3,4,5].map(l => `<span class="heat-cell" style="background:var(--heat-${l})"></span>`).join('')}
            <span>高</span>
          </div>
        </div>
        <div class="heat-bars">${heat}</div>
      </div>

      <div class="tabs" id="ch-tabs">
        <button class="active" data-tab="all">全部 · ${ch.points.length}</button>
        <button data-tab="hi">高频（≥3 次） · ${ch.points.filter(p => p.freq >= 3).length}</button>
        <button data-tab="todo">未掌握 · ${ch.points.filter(p => !mastered.has(p.id)).length}</button>
        <button data-tab="done">已掌握 · ${masteredHere}</button>
      </div>

      <div id="kp-list">
        ${ch.points.map((p, i) => kpCardHTML(p, i + 1, false)).join('')}
      </div>
    `;
  }

  function attachChapterHandlers(chId) {
    document.querySelectorAll('.crumb a[data-route]').forEach(el => {
      el.addEventListener('click', (e) => { e.preventDefault(); go('#' + el.dataset.route); });
    });
    const ch = chById.get(chId);
    if (!ch) return;
    const tabs = document.getElementById('ch-tabs');
    const list = document.getElementById('kp-list');
    if (tabs) {
      tabs.addEventListener('click', (e) => {
        const b = e.target.closest('button[data-tab]');
        if (!b) return;
        tabs.querySelectorAll('button').forEach(x => x.classList.toggle('active', x === b));
        const tab = b.dataset.tab;
        let pts = ch.points;
        if (tab === 'hi') pts = pts.filter(p => p.freq >= 3);
        else if (tab === 'todo') pts = pts.filter(p => !mastered.has(p.id));
        else if (tab === 'done') pts = pts.filter(p => mastered.has(p.id));
        list.innerHTML = pts.length ? pts.map((p, i) => kpCardHTML(p, i + 1, false)).join('') : '<div class="empty">暂无内容。</div>';
        attachKPHandlers();
      });
    }
    attachKPHandlers();
  }

  function viewPoint(pid) {
    const p = pointById.get(pid);
    if (!p) return `<div class="empty">未找到该知识点。</div>`;
    const ch = chById.get(p.chapterId);
    const isMastered = mastered.has(p.id);

    return `
      <div class="crumb">
        <a data-route="/">首页</a>
        <span class="sep">›</span>
        <a data-route="/ch/${ch.id}">第 ${pad2(ch.id)} 章 ${escapeHTML(ch.title)}</a>
        <span class="sep">›</span>
        <span>${escapeHTML(p.title)}</span>
      </div>

      <div class="page-eyebrow">§ ${escapeHTML(p.section.split('/')[0] || '')} · 第 ${pad2(ch.id)} 章</div>
      <h1 class="page-title">${escapeHTML(p.title)}</h1>
      <div style="margin-top:12px;display:flex;align-items:center;gap:10px;flex-wrap:wrap">
        <span class="fchip ${freqClass(p.freq)}">${freqLabel(p.freq)} · 考频 ${p.freq} 次</span>
        <span class="muted" style="font-size:12.5px">关联往年题 ${p.questions.length} 条</span>
        <span style="flex:1"></span>
        <button class="icon-btn" id="mark-btn" style="width:auto;padding:0 12px;color:${isMastered ? 'var(--success)' : 'var(--ink-2)'}">
          ${isMastered ? '✓ 已掌握' : '标记已掌握'}
        </button>
      </div>

      <div class="card card-pad" style="margin-top:18px">
        <h5 style="margin:0 0 6px;font-size:11px;letter-spacing:.12em;color:var(--ink-3);text-transform:uppercase">对应小节</h5>
        <p class="kp-section section-path" style="background:transparent;padding:0">${escapeHTML(p.section)}</p>
      </div>

      <div class="card card-pad" style="margin-top:12px">
        <h5 style="margin:0 0 6px;font-size:11px;letter-spacing:.12em;color:var(--ink-3);text-transform:uppercase">匹配依据</h5>
        <p style="margin:0;font-size:13px;color:var(--ink-2);line-height:1.7">${escapeHTML(p.basis)}</p>
      </div>

      <div class="card card-pad" style="margin-top:12px">
        <h5 style="margin:0 0 8px;font-size:11px;letter-spacing:.12em;color:var(--ink-3);text-transform:uppercase">知识点原文摘取</h5>
        <p style="margin:0;font-family:var(--font-serif);font-size:var(--read-size, 15px);line-height:var(--read-leading, 1.78);white-space:pre-wrap">${escapeHTML(p.excerpt)}</p>
      </div>

      <h2 style="margin:28px 0 10px;font-size:17px;font-weight:600">对应往年题 · ${p.questions.length}</h2>
      <div class="q-list">
        ${p.questions.map(q => `
          <div class="q">
            <span class="q-tag">${escapeHTML(q.type)}</span>
            <div>
              <div class="q-text">${escapeHTML(q.text)}</div>
              <span class="q-src">来源：${escapeHTML(q.source)}${q.year ? ` · ${escapeHTML(q.year)}级/年` : ''}</span>
            </div>
          </div>`).join('')}
      </div>
    `;
  }

  function attachPointHandlers(pid) {
    document.querySelectorAll('.crumb a[data-route]').forEach(el => {
      el.addEventListener('click', (e) => { e.preventDefault(); go('#' + el.dataset.route); });
    });
    const btn = document.getElementById('mark-btn');
    if (btn) btn.onclick = () => { toggleMastered(pid); render(); };
  }

  function viewExercises(query) {
    const all = D.allQuestions;
    const yearF = query.year || '';
    const typeF = query.type || '';
    const chF = query.ch ? Number(query.ch) : 0;

    const years = [...new Set(all.map(q => q.year).filter(Boolean))].sort();
    const types = [...new Set(all.map(q => q.type.replace(/^[一二三四五六七八九十]+、/, '').replace(/\d+$/, '').replace(/[，,].*/, '').trim()).filter(Boolean))];
    // Group similar types into base buckets (名解/简答/单选/论述/应用 etc.)
    function baseType(t) {
      if (/名解|名词解释/.test(t)) return '名解';
      if (/单选/.test(t)) return '单选';
      if (/多选/.test(t)) return '多选';
      if (/简答/.test(t)) return '简答';
      if (/论述/.test(t)) return '论述';
      if (/应用|案例/.test(t)) return '应用/案例';
      if (/填空/.test(t)) return '填空';
      if (/复习题|附录/.test(t)) return '其他';
      return '其他';
    }
    const baseTypes = ['名解', '单选', '多选', '简答', '论述', '应用/案例', '填空', '其他'];

    let list = all.slice();
    if (yearF) list = list.filter(q => q.year === yearF);
    if (typeF) list = list.filter(q => baseType(q.type) === typeF);
    if (chF) list = list.filter(q => q.chapterId === chF);

    return `
      <div class="page-eyebrow">EXERCISES · 往年题库</div>
      <h1 class="page-title">题库 · ${all.length} 条</h1>
      <p class="page-sub">所有从往年题中匹配到的题目，按知识点对齐。点击题目右侧链接跳转到对应知识点详情。</p>

      <div class="filters">
        <span class="label">年份</span>
        <button class="${!yearF ? 'active' : ''}" data-f="year" data-v="">全部</button>
        ${years.map(y => `<button class="${yearF === y ? 'active' : ''}" data-f="year" data-v="${y}">${y}</button>`).join('')}
      </div>
      <div class="filters">
        <span class="label">题型</span>
        <button class="${!typeF ? 'active' : ''}" data-f="type" data-v="">全部</button>
        ${baseTypes.map(t => `<button class="${typeF === t ? 'active' : ''}" data-f="type" data-v="${t}">${t}</button>`).join('')}
      </div>
      <div class="filters">
        <span class="label">章节</span>
        <button class="${!chF ? 'active' : ''}" data-f="ch" data-v="">全部</button>
        ${D.chapters.map(c => `<button class="${chF === c.id ? 'active' : ''}" data-f="ch" data-v="${c.id}">${pad2(c.id)} ${escapeHTML(c.title)}</button>`).join('')}
      </div>

      <div class="muted" style="margin:0 0 10px;font-size:12px">命中 ${list.length} 条</div>

      <div class="q-list">
        ${list.length ? list.map(q => `
          <div class="q" style="grid-template-columns: 60px auto 1fr">
            <span class="q-tag" style="background:var(--bg-sunken);color:var(--ink-2);font-weight:600">${escapeHTML(q.year || '–')}</span>
            <span class="q-tag">${escapeHTML(q.type)}</span>
            <div>
              <div class="q-text">${escapeHTML(q.text)}</div>
              <span class="q-src">
                <a data-pid="${q.pointId}" style="cursor:pointer;color:var(--primary)">→ ${escapeHTML(q.pointTitle)}</a>
                · 第 ${pad2(q.chapterId)} 章 · 来源 ${escapeHTML(q.source)}
              </span>
            </div>
          </div>`).join('') : '<div class="empty">暂无匹配题目。</div>'}
      </div>
    `;
  }

  function attachExercisesHandlers() {
    document.querySelectorAll('.filters button[data-f]').forEach(b => {
      b.addEventListener('click', () => {
        const r = parseRoute();
        const next = { ...r.query };
        if (b.dataset.v) next[b.dataset.f] = b.dataset.v;
        else delete next[b.dataset.f];
        const qs = Object.entries(next).map(([k, v]) => `${encodeURIComponent(k)}=${encodeURIComponent(v)}`).join('&');
        go('#/exercises' + (qs ? '?' + qs : ''));
      });
    });
    document.querySelectorAll('.q a[data-pid]').forEach(a => {
      a.addEventListener('click', (e) => { e.preventDefault(); go('#/p/' + a.dataset.pid); });
    });
  }

  function viewSearch(q) {
    const term = (q || '').trim();
    if (!term) return `<div class="page-eyebrow">SEARCH</div><h1 class="page-title">搜索</h1><p class="muted">请在上方输入关键词。</p>`;

    const lower = term.toLowerCase();
    const ptHits = [];
    for (const p of pointById.values()) {
      const hay = (p.title + ' ' + p.section + ' ' + p.basis + ' ' + p.excerpt).toLowerCase();
      if (hay.includes(lower)) ptHits.push(p);
    }
    const qHits = D.allQuestions.filter(x => (x.text + ' ' + x.source + ' ' + x.type).toLowerCase().includes(lower));
    const chHits = D.chapters.filter(c => c.title.toLowerCase().includes(lower));

    return `
      <div class="page-eyebrow">SEARCH</div>
      <h1 class="page-title">搜索 “${escapeHTML(term)}”</h1>
      <p class="muted" style="margin-top:6px;font-size:12.5px">命中：知识点 ${ptHits.length} · 往年题 ${qHits.length} · 章节 ${chHits.length}</p>

      ${chHits.length ? `
        <div class="search-result-grp">
          <h3>章节</h3>
          <div class="ch-grid">
            ${chHits.map(c => `
              <a class="ch-card" data-ch="${c.id}">
                <div>
                  <div class="ch-no">第 ${pad2(c.id)} 章</div>
                  <div class="ch-name">${highlight(c.title, term)}</div>
                </div>
                <div class="ch-stats"><span><b>${c.points.length}</b>知识点</span><span><b>${c.totalQuestions}</b>题</span></div>
              </a>`).join('')}
          </div>
        </div>` : ''}

      ${ptHits.length ? `
        <div class="search-result-grp">
          <h3>知识点 · ${ptHits.length}</h3>
          ${ptHits.slice(0, 30).map((p, i) => kpCardHTML(p, i + 1, false, term)).join('')}
        </div>` : ''}

      ${qHits.length ? `
        <div class="search-result-grp">
          <h3>往年题 · ${qHits.length}</h3>
          <div class="q-list">
            ${qHits.slice(0, 40).map(q => `
              <div class="q" style="grid-template-columns: 60px auto 1fr">
                <span class="q-tag" style="background:var(--bg-sunken);color:var(--ink-2);font-weight:600">${escapeHTML(q.year || '–')}</span>
                <span class="q-tag">${escapeHTML(q.type)}</span>
                <div>
                  <div class="q-text">${highlight(q.text, term)}</div>
                  <span class="q-src">
                    <a data-pid="${q.pointId}" style="cursor:pointer;color:var(--primary)">→ ${escapeHTML(q.pointTitle)}</a>
                    · 第 ${pad2(q.chapterId)} 章 · ${escapeHTML(q.source)}
                  </span>
                </div>
              </div>`).join('')}
          </div>
        </div>` : ''}

      ${(!chHits.length && !ptHits.length && !qHits.length) ? '<div class="empty">没有找到匹配项。</div>' : ''}
    `;
  }
  function attachSearchHandlers() {
    document.querySelectorAll('.ch-card[data-ch]').forEach(el => {
      el.addEventListener('click', () => go(`#/ch/${el.dataset.ch}`));
    });
    document.querySelectorAll('.q a[data-pid]').forEach(a => {
      a.addEventListener('click', (e) => { e.preventDefault(); go('#/p/' + a.dataset.pid); });
    });
    attachKPHandlers();
  }

  // ── Knowledge-point card (used in chapter / home / search views) ──
  function kpCardHTML(p, idx, expanded, hl) {
    const klass = freqClass(p.freq);
    const isMastered = mastered.has(p.id);
    return `
      <div class="kp ${klass} ${expanded ? 'expanded' : ''}" data-pid="${p.id}">
        <div class="kp-head">
          <div class="kp-num">${pad2(idx)}</div>
          <div>
            <div class="kp-title">${highlight(p.title, hl)}</div>
            <div class="kp-meta">
              <span class="fchip ${klass}">${p.freq} 次</span>
              <span class="dim">小节</span>
              <span class="sec">${escapeHTML(p.section.split('/').slice(-1)[0].slice(0, 30))}</span>
              <span class="dim">·</span>
              <span><span class="dim">第 ${pad2(p.chapterId)} 章</span> ${escapeHTML(chById.get(p.chapterId).title)}</span>
              <span class="dim">·</span>
              <span><span class="dim">关联题</span> <strong>${p.questions.length}</strong></span>
              ${isMastered ? '<span class="fchip" style="background:var(--success-bg);color:var(--success);box-shadow:inset 0 0 0 1px var(--success)">已掌握</span>' : ''}
            </div>
          </div>
          <div class="kp-actions">
            <button data-act="toggle" title="${isMastered ? '取消掌握' : '标记掌握'}" class="${isMastered ? 'on' : ''}">${isMastered ? '✓' : '○'}</button>
            <button data-act="open">阅读 →</button>
          </div>
        </div>
        <div class="kp-body" style="display:${expanded ? 'block' : 'none'}">
          <div class="kp-section">
            <div>
              <h5>匹配依据</h5>
              <p class="basis">${highlight(p.basis, hl)}</p>
            </div>
            <div>
              <h5>知识点原文摘取</h5>
              <p class="excerpt">${highlight(p.excerpt, hl)}</p>
            </div>
            <div>
              <h5>对应往年题 · ${p.questions.length}</h5>
              <div class="q-list">
                ${p.questions.map(q => `
                  <div class="q">
                    <span class="q-tag">${escapeHTML(q.type)}</span>
                    <div>
                      <div class="q-text">${highlight(q.text, hl)}</div>
                      <span class="q-src">${escapeHTML(q.source)}</span>
                    </div>
                  </div>`).join('')}
              </div>
            </div>
          </div>
        </div>
      </div>`;
  }

  function attachKPHandlers() {
    document.querySelectorAll('.kp').forEach(el => {
      const pid = el.dataset.pid;
      // Click on head (excluding actions) toggles expand
      const head = el.querySelector('.kp-head');
      head.addEventListener('click', (e) => {
        const actBtn = e.target.closest('button[data-act]');
        if (actBtn) {
          e.stopPropagation();
          if (actBtn.dataset.act === 'toggle') { toggleMastered(pid); render(); }
          else if (actBtn.dataset.act === 'open') { go('#/p/' + pid); }
          return;
        }
        // toggle expand
        const body = el.querySelector('.kp-body');
        const open = body.style.display !== 'block';
        body.style.display = open ? 'block' : 'none';
        el.classList.toggle('expanded', open);
      });
    });
  }

  // ── Command palette ─────────────────────────────────────────
  function openPalette() {
    const mount = document.getElementById('palette-mount');
    mount.innerHTML = `
      <div class="palette-veil" id="veil">
        <div class="palette" onclick="event.stopPropagation()">
          <div class="palette-head">
            <span style="color:var(--ink-3)">⌕</span>
            <input id="palette-input" placeholder="搜索知识点 / 往年题 / 章节…" autocomplete="off"/>
            <span class="kbd">Esc</span>
          </div>
          <div class="palette-list" id="palette-list">
            <div class="palette-empty">输入关键词开始搜索</div>
          </div>
        </div>
      </div>
    `;
    const input = document.getElementById('palette-input');
    input.focus();
    document.getElementById('veil').addEventListener('click', closePalette);
    input.addEventListener('input', () => updatePaletteResults(input.value));
    input.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' && input.value.trim()) {
        closePalette();
        go('#/search?q=' + encodeURIComponent(input.value.trim()));
      }
    });
  }
  function closePalette() {
    const m = document.getElementById('palette-mount');
    if (m) m.innerHTML = '';
  }
  function updatePaletteResults(term) {
    const list = document.getElementById('palette-list');
    if (!list) return;
    term = term.trim();
    if (!term) { list.innerHTML = '<div class="palette-empty">输入关键词开始搜索</div>'; return; }
    const lower = term.toLowerCase();
    const hits = [];
    for (const p of pointById.values()) {
      const hay = (p.title + ' ' + p.section + ' ' + p.excerpt).toLowerCase();
      if (hay.includes(lower)) hits.push({ kind: 'p', item: p });
      if (hits.length >= 12) break;
    }
    if (hits.length < 12) {
      for (const c of D.chapters) {
        if (c.title.toLowerCase().includes(lower)) hits.push({ kind: 'c', item: c });
        if (hits.length >= 12) break;
      }
    }
    if (!hits.length) {
      list.innerHTML = `<div class="palette-empty">没有匹配，按 Enter 进入完整搜索</div>`;
      return;
    }
    list.innerHTML = hits.map((h, i) => {
      if (h.kind === 'p') {
        const ch = chById.get(h.item.chapterId);
        return `
          <a class="palette-item" data-go="#/p/${h.item.id}" style="display:flex;gap:10px;padding:10px 16px;cursor:pointer;border-bottom:1px solid var(--line-soft)">
            <span class="fchip ${freqClass(h.item.freq)}" style="margin-top:1px">${h.item.freq}</span>
            <span style="flex:1;min-width:0">
              <span style="display:block;font-size:13.5px;color:var(--ink-1);line-height:1.45">${highlight(h.item.title, term)}</span>
              <span style="display:block;font-size:11px;color:var(--ink-3);margin-top:2px">第 ${pad2(ch.id)} 章 ${escapeHTML(ch.title)}</span>
            </span>
          </a>`;
      } else {
        return `
          <a class="palette-item" data-go="#/ch/${h.item.id}" style="display:flex;gap:10px;padding:10px 16px;cursor:pointer;border-bottom:1px solid var(--line-soft)">
            <span class="q-tag" style="margin-top:1px">章节</span>
            <span style="font-size:13.5px;color:var(--ink-1)">第 ${pad2(h.item.id)} 章 · ${highlight(h.item.title, term)}</span>
          </a>`;
      }
    }).join('');
    list.querySelectorAll('a[data-go]').forEach(a => {
      a.addEventListener('click', () => { closePalette(); go(a.dataset.go); });
    });
  }

  // ── Render ──────────────────────────────────────────────────
  function render() {
    const r = parseRoute();
    const segs = r.segs;
    if (!document.getElementById('content')) renderShell();

    let activeChId = null;
    let html = '';

    // home
    if (segs.length === 0) {
      html = viewHome();
    } else if (segs[0] === 'ch' && segs[1]) {
      activeChId = Number(segs[1]);
      html = viewChapter(activeChId);
    } else if (segs[0] === 'p' && segs[1]) {
      const p = pointById.get(segs[1]);
      activeChId = p ? p.chapterId : null;
      html = viewPoint(segs[1]);
    } else if (segs[0] === 'exercises') {
      html = viewExercises(r.query);
    } else if (segs[0] === 'search') {
      html = viewSearch(r.query.q || '');
    } else {
      html = viewHome();
    }

    document.getElementById('content').innerHTML = html;
    renderSidebar(activeChId);
    document.getElementById('content').scrollTop = 0;
    // Close mobile drawer on every navigation
    document.body.classList.remove('sidebar-open');

    // nav active state
    document.getElementById('nav-home').classList.toggle('active', segs.length === 0);
    document.getElementById('nav-ex').classList.toggle('active', segs[0] === 'exercises');

    // attach view-specific handlers
    if (segs.length === 0) attachHomeHandlers();
    else if (segs[0] === 'ch') attachChapterHandlers(activeChId);
    else if (segs[0] === 'p') attachPointHandlers(segs[1]);
    else if (segs[0] === 'exercises') attachExercisesHandlers();
    else if (segs[0] === 'search') attachSearchHandlers();
  }

  // Boot
  renderShell();
  render();
  window.addEventListener('hashchange', render);
})();
