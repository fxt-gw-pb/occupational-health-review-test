# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this repo is

A pure-static Chinese-language review site for the 职业卫生学 (Occupational Health) course past-exam knowledge points. The repo root **is** the GitHub Pages publish directory (with `.nojekyll`). There is no bundler, no `package.json`, no `npm install` — files are served as-is.

## Two parallel surfaces

The repo contains two distinct front-ends that share data but otherwise do not depend on each other:

1. **Production site** — entry `index.html`. Vanilla JS in `site.js`, styling in `site.css` + `tokens.css`, data in `site-data.js`. This is what GitHub Pages serves. Hash-based routing (no build step, no framework).
2. **Design canvas** — entry `职业卫生学复习网站设计稿.html`. React 18 + Babel Standalone loaded from unpkg, used for prototyping layouts. `app.jsx` mounts artboards from `artboards/*.jsx` plus `design-canvas.jsx`, `tweaks-panel.jsx`, `ui.jsx`. Uses `data.js` (an older JS data file) rather than `site-data.js`.

When making site changes, the production site is `site.js` — do not assume edits in the `.jsx` artboards propagate to it. The two are kept manually aligned.

## Data pipeline

The source of truth for content is `知识仓库/职业卫生学往年题考点整理.md` (inside the repo, but the `知识仓库/` directory itself is not referenced by the site and so is not served as part of the page). `build-data.js` parses its `## 第X章` chapter headings, `### N. 知识点` knowledge-point headings, and the structured fields beneath each (`**考频：N 次**`, `**对应小节：**`, `**匹配依据：**`, `**知识点原文摘取：**`, `**对应往年题：**` followed by `【往年题N｜source｜type】` blocks).

It emits two artifacts in the repo root:

- `data.json` — structured chapters/points/questions.
- `site-data.js` — same payload assigned to `window.SITE_DATA` so `site.js` can run from `file://` without a fetch.

Regenerate after editing the source markdown:

```bash
node build-data.js
```

Both `data.json` and `site-data.js` are committed (the site must work without a Node toolchain on the deploy target). The script also re-sorts each chapter's points by frequency descending and computes per-chapter rollups (`totalFreq`, `totalQuestions`, `peak`, `hi`).

## Run / preview locally

Open `index.html` directly in a browser — it works over `file://` because data is inlined into `site-data.js` (no fetch). Optionally serve the directory with any static server (e.g. `python3 -m http.server`) if you want clean URLs or to test hash routing edge cases.

There are no tests, no linter, and no build for the production site.

## Site-level state

`site.js` persists two things to `localStorage`:
- `oh-review-mastered-v1` — set of knowledge-point IDs the user marked as mastered.
- `oh-review-theme-v1` — one of `light` / `paper` / `dark`; applied via body class `theme-paper` / `theme-dark`.

Knowledge-point IDs follow the pattern `ch{chapterId}-{index}` (e.g. `ch3-2`), assigned in `build-data.js`. Changing the parser's ID scheme will invalidate users' saved mastery state.

## Deploy

Push to `main`. GitHub Pages serves from the branch root (`main` / `/root`, not `/docs`). `.nojekyll` is present to prevent Jekyll from filtering files. No CI is configured.

## Git workflow (user preference)

GitHub user: **fxt-gw-pb**. Remote for this project: `https://github.com/fxt-gw-pb/occupational-health-review-test` (SSH form: `git@github.com:fxt-gw-pb/occupational-health-review-test.git`).

SSH key is already configured on this machine — prefer SSH remotes (`git@github.com:fxt-gw-pb/<repo>.git`), never HTTPS+token unless SSH fails. Note: the current `origin` is HTTPS; switching it to SSH requires `git remote set-url origin git@github.com:fxt-gw-pb/occupational-health-review-test.git` — confirm with the user before changing.

Before modifying the repo, run: `pwd`, `git status`, `git remote -v`, `git branch`.

When changing code: (1) state which files you'll edit, (2) run any needed checks after, (3) show `git diff`, (4) verify no stray files before `git add` (avoid `add -A`/`add .`), (5) write a concise commit message, (6) re-run `git status` before push, (7) push.

If `git remote -v` does not point to a repo owned by `fxt-gw-pb`, **do not push** — warn the user and ask whether to fork or change the remote first.
