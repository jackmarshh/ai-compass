# RoleCard AI

RoleCard AI 是一个纯前端的 AI Roleplay Character Card Generator MVP，用来生成角色扮演机器人可用的角色卡草稿。

第一版不接 AI API、不需要登录、不保存用户内容，也不依赖数据库。用户在浏览器里填写角色信息后，前端根据本地模板实时生成角色档案、开场白、对话示例、系统提示词、头像 Prompt 和可复制的导出内容。

## 功能

- `Home`：面向 SEO 和转化的产品首页。
- `Generator`：纯浏览器运行的角色卡生成器。
- `Examples`：20 个静态角色示例，可一键作为生成器起点。
- `FAQ`：覆盖 SillyTavern、Character AI、JanitorAI、roleplay prompt 等长尾问题。
- 支持 `Markdown`、`Plain Text`、`SillyTavern-like JSON` 三种输出格式。
- 支持日间 / 夜间主题切换。
- 支持英文 / 中文界面切换，中文模式下生成内容也会使用中文模板。
- 基础 SEO：页面 title、description、canonical、OpenGraph、FAQ schema。

## 技术栈

- Vite
- React
- TypeScript
- CSS Variables
- Hash-based single page routing

## 本地运行

```bash
npm install
npm run dev
```

默认会启动 Vite 开发服务。打开终端输出里的本地地址即可预览。

## 构建

```bash
npm run build
```

构建产物会输出到 `dist/`。

## 预览构建产物

```bash
npm run preview
```

## 项目结构

```txt
src/
  App.tsx              # 页面、路由、主题和多语言状态
  main.tsx             # React 入口
  styles.css           # 全站样式、日夜主题变量、响应式布局
  types.ts             # 内容和生成器类型
  data/
    examples.ts        # 20 个静态角色示例
    faq.ts             # 英文 FAQ 数据
  lib/
    generator.ts       # 角色卡模板生成逻辑
```

## 生成器字段

- Character Name
- Gender / Identity
- Personality
- Backstory
- Relationship with User
- Scenario
- Speaking Style
- Tone：Friendly / Romantic / Dark / Funny / Fantasy
- Output Format：Markdown / Plain Text / SillyTavern-like JSON

## 输出内容

- Character Profile
- Personality
- Backstory
- First Message
- Example Dialogues
- System Prompt
- Image Prompt
- Tags

## 部署

这是一个静态前端项目，可以部署到 Vercel、Netlify、Cloudflare Pages 或任意静态托管服务。

常见部署流程：

```bash
npm run build
```

然后将 `dist/` 作为静态站点目录发布。

## 当前限制

- 生成结果来自本地模板，不是真实 AI 模型生成。
- 不保存用户生成过的角色卡。
- 没有账户系统、支付系统、后端服务。
- `SillyTavern-like JSON` 是便于复制和改写的近似结构，不是官方导出格式。

## 后续方向

- 接入 AI API，支持更自由的角色生成。
- 支持保存、收藏和编辑历史角色卡。
- 增加更多导出格式和平台适配。
- 扩展示例库和 SEO 落地页。
- 接入基础统计，观察生成点击和复制行为。

