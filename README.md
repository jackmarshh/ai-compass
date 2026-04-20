# AI Compass

一个面向中文用户的 AI 技术词条站点，用更容易理解的方式解释常见概念，并把重要词条和入门教程串起来。

当前版本聚焦两件事：

- 把 `Prompt`、`Agent`、`RAG`、`MCP` 这类技术词条讲清楚
- 给部分词条补上可直接继续阅读的教程，避免“看懂名词但不知道下一步做什么”

## 项目定位

这个项目不是单纯的术语表，也不是单纯的教程站，而是一个更适合新手建立认知地图的内容型网站：

- 先从 `词条` 理解技术概念
- 再从 `教程` 学会怎么用
- 必要时用 `场景` 帮助用户从需求切入

## 技术栈

- `Next.js 15`
- `React 19`
- `TypeScript`
- `App Router`
- `Markdown / MDX frontmatter` 内容系统
- `react-markdown + remark-gfm` 渲染正文
- `Vitest + Testing Library` 基础测试

## 已实现内容

- 首页 `/`
- 词条列表页 `/terms`
- 词条详情页 `/terms/[slug]`
- 教程列表页 `/tutorials`
- 教程详情页 `/tutorials/[slug]`
- 场景列表页 `/scenarios`
- 场景详情页 `/scenarios/[slug]`
- 关于页 `/about`
- 兼容旧地址的重定向：
  - `/concepts -> /terms`
  - `/concepts/[slug] -> /terms/[slug]`

## 本地启动

```bash
npm install
npm run dev
```

默认开发地址：

```txt
http://localhost:3000
```

## 常用命令

```bash
npm run dev
npm run build
npm run start
npm test
```

## 目录结构

```txt
ai-compass/
  app/                Next.js 路由与页面
  components/         页面组件与内容模块
  content/            词条 / 场景 / 教程内容
  lib/                内容读取、SEO、工具函数
  tests/              内容系统与页面基础测试
  types/              类型定义
```

## 内容维护方式

内容放在 `content/` 下，以 Markdown/MDX 文件组织。

- `content/concepts/`：概念词条
- `content/tutorials/`：教程文章
- `content/scenarios/`：使用场景

每篇内容使用 frontmatter 存储结构化元数据，正文用于实际展示内容。这样做的好处是：

- 方便继续扩充内容
- 方便生成列表页和详情页
- 方便建立词条、教程、场景之间的互链

## 当前内容方向

这一版主要围绕中文 AI 技术词条库来做，后续会继续补齐这类主题：

- `Prompt`
- `Agent`
- `RAG`
- `MCP`
- `Skill`
- `Workflow`
- `Knowledge Base`
- `API`

## 设计方向

当前站点已经从偏“海外 SaaS 落地页”的视觉方向，调整为更偏中文内容站的表达方式：

- 更强调信息层级和阅读感
- 更适合术语解释与内容浏览
- 首页以“词条入口 + 教程串联”为主

后续还会继续优化首页结构和词条分类，让它更像一个真正可查可学的中文 AI 资料库。

## SEO

已包含基础 SEO 能力：

- 页面 metadata
- `robots.ts`
- `sitemap.ts`
- Open Graph 基础信息

## 测试与验证

提交前建议至少执行：

```bash
npm test
npm run build
```

## 后续计划

- 继续补全核心技术词条，优先 `RAG / MCP / Skill / Tool Calling`
- 把首页进一步收敛成“AI 技术词条入口”
- 增加更清晰的词条分类与关联阅读
- 完善教程与词条的双向跳转
- 持续优化中文视觉风格
