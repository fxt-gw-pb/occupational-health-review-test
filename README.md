# occupational-health-review

职业卫生学往年题考点复习网站。仓库根目录就是 GitHub Pages 发布目录。

## 直接部署

1. 把整个文件夹上传到 GitHub 仓库。
2. 打开仓库的 **Settings → Pages**。
3. Source 选择 **Deploy from a branch**。
4. Branch 选择 **main**，目录选择 **/root**。
5. 保存后等待 1-2 分钟访问 Pages 地址。

本项目是纯静态网站，不需要 `npm install`、不需要构建命令，也不需要选择 `/docs`。

## 入口文件

- `index.html`
- `site.css`
- `tokens.css`
- `site-data.js`
- `site.js`

`.nojekyll` 已放在根目录，用于避免 GitHub Pages 的 Jekyll 处理影响静态文件发布。
