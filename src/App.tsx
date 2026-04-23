import { useEffect, useMemo, useState } from "react";
import { examples } from "./data/examples";
import { faqs } from "./data/faq";
import { defaultInput, generateCharacterCard, outputForFormat } from "./lib/generator";
import type { CharacterInput, Locale, OutputFormat, Theme, Tone } from "./types";

type Page = "home" | "generator" | "examples" | "faq";

type Copy = {
  nav: Record<Page, string>;
  meta: Record<Page, { title: string; description: string }>;
  headerSubtitle: string;
  themeLabel: string;
  dayLabel: string;
  langLabel: string;
  home: {
    eyebrow: string;
    title: string;
    intro: string;
    open: string;
    examples: string;
    sections: string;
    bullets: string[];
    featureEyebrow: string;
    featureTitle: string;
    featureIntro: string;
    features: Array<[string, string]>;
    shelfEyebrow: string;
    shelfTitle: string;
  };
  generator: {
    eyebrow: string;
    title: string;
    intro: string;
    labels: Record<keyof Omit<CharacterInput, "tone" | "outputFormat">, string>;
    placeholders: Record<keyof Omit<CharacterInput, "tone" | "outputFormat">, string>;
    tone: string;
    outputFormat: string;
    toneLabels: Record<Tone, string>;
    livePreview: string;
    firstMessage: string;
    imagePrompt: string;
    unnamed: string;
    copy: string;
    copied: string;
  };
  examples: {
    eyebrow: string;
    title: string;
    intro: string;
    use: string;
  };
  faq: {
    eyebrow: string;
    title: string;
    intro: string;
    items: Array<{ question: string; answer: string }>;
  };
  footer: string;
};

const pageOrder: Page[] = ["home", "generator", "examples", "faq"];

const copy: Record<Locale, Copy> = {
  en: {
    nav: { home: "Home", generator: "Generator", examples: "Examples", faq: "FAQ" },
    meta: {
      home: {
        title: "AI Character Card Generator for Roleplay Bots | RoleCard AI",
        description:
          "Create AI character cards for roleplay bots with profiles, first messages, example dialogues, system prompts, image prompts, and JSON output."
      },
      generator: {
        title: "Free AI Character Card Generator | RoleCard AI",
        description:
          "Generate roleplay character profiles, first messages, example dialogues, system prompts, image prompts, and SillyTavern-like JSON in your browser."
      },
      examples: {
        title: "Roleplay Character Card Examples | RoleCard AI",
        description:
          "Browse anime girl, fantasy elf, villain, AI girlfriend, detective, CEO boss, and other roleplay character card examples."
      },
      faq: {
        title: "AI Character Card Generator FAQ | SillyTavern, JanitorAI, Roleplay Prompts",
        description:
          "Answers about AI character cards, SillyTavern-like JSON, Character AI, JanitorAI, roleplay prompts, first messages, and image prompts."
      }
    },
    headerSubtitle: "Roleplay card drafting desk",
    themeLabel: "Night",
    dayLabel: "Day",
    langLabel: "中文",
    home: {
      eyebrow: "Roleplay card drafting desk",
      title: "AI Character Card Generator for Roleplay Bots",
      intro:
        "Draft reusable roleplay character cards with personality, backstory, first message, example dialogues, system prompt, image prompt, tags, and export-ready formats.",
      open: "Open Generator",
      examples: "Browse Examples",
      sections: "Card sections",
      bullets: ["Character Profile", "First Message", "Example Dialogues", "System Prompt", "Image Prompt", "Markdown, Plain Text, JSON"],
      featureEyebrow: "Workspace notes",
      featureTitle: "A quiet drafting table for character cards",
      featureIntro:
        "The first version stays intentionally simple: no accounts, no saved data, no server. It helps writers and bot creators shape a usable card before moving into their platform.",
      features: [
        ["Private by default", "Everything runs locally in the browser. Generated text is not stored."],
        ["Roleplay-first structure", "Outputs are shaped for character bots, first messages, dialogue examples, and system prompts."],
        ["Example library", "Use common archetypes as starting points instead of facing a blank page."],
        ["Copy-friendly workflow", "Generate Markdown, Plain Text, or SillyTavern-like JSON and copy with one click."]
      ],
      shelfEyebrow: "Card shelf",
      shelfTitle: "Common roleplay archetypes"
    },
    generator: {
      eyebrow: "Generator",
      title: "Build a roleplay character card in your browser",
      intro:
        "Fill the basics on the left. The template updates instantly on the right. Empty fields still generate safe placeholder content, so you can test the flow quickly.",
      labels: {
        name: "Character Name",
        identity: "Gender / Identity",
        personality: "Personality",
        backstory: "Backstory",
        relationship: "Relationship with User",
        scenario: "Scenario",
        speakingStyle: "Speaking Style"
      },
      placeholders: {
        name: "Luna Vale",
        identity: "Virtual girlfriend and emotional companion",
        personality: "Affectionate, attentive, patient, gently playful",
        backstory: "She was designed to learn the user's routines...",
        relationship: "The user is her favorite person and daily confidant.",
        scenario: "Late night chat after the user comes home exhausted.",
        speakingStyle: "Soft, intimate, reassuring, with light teasing"
      },
      tone: "Tone",
      outputFormat: "Output Format",
      toneLabels: { Friendly: "Friendly", Romantic: "Romantic", Dark: "Dark", Funny: "Funny", Fantasy: "Fantasy" },
      livePreview: "Live Preview",
      firstMessage: "First Message",
      imagePrompt: "Image Prompt",
      unnamed: "Unnamed Character",
      copy: "Copy Output",
      copied: "Copied"
    },
    examples: {
      eyebrow: "Examples",
      title: "20 static roleplay character card examples",
      intro:
        "Browse common SEO-friendly roleplay archetypes, from anime girl and fantasy elf to villain, AI girlfriend, detective, CEO boss, cyberpunk hacker, and more.",
      use: "Use as starting point"
    },
    faq: {
      eyebrow: "FAQ",
      title: "AI character card generator FAQ",
      intro:
        "Answers for SillyTavern-style cards, Character AI-style bots, JanitorAI roleplay prompts, first messages, image prompts, and browser-only generation.",
      items: faqs
    },
    footer: "Static MVP for AI roleplay character card generation."
  },
  zh: {
    nav: { home: "首页", generator: "生成器", examples: "示例", faq: "问答" },
    meta: {
      home: {
        title: "AI 角色卡生成器 | RoleCard AI",
        description: "在浏览器里生成角色扮演机器人角色卡，包含档案、开场白、对话示例、系统提示词、头像 Prompt 和 JSON。"
      },
      generator: {
        title: "免费 AI 角色卡生成器 | RoleCard AI",
        description: "纯前端生成角色档案、开场白、对话示例、系统提示词、头像 Prompt 和类 SillyTavern JSON。"
      },
      examples: {
        title: "角色扮演 Character Card 示例 | RoleCard AI",
        description: "查看 anime girl、fantasy elf、villain、AI girlfriend、detective、CEO boss 等角色卡示例。"
      },
      faq: {
        title: "AI 角色卡生成器 FAQ | SillyTavern、JanitorAI、Roleplay Prompt",
        description: "了解角色卡、SillyTavern-like JSON、Character AI、JanitorAI、开场白和头像 Prompt。"
      }
    },
    headerSubtitle: "角色卡草稿工作台",
    themeLabel: "夜间",
    dayLabel: "日间",
    langLabel: "EN",
    home: {
      eyebrow: "角色卡草稿工作台",
      title: "AI 角色卡生成器",
      intro: "填写基础设定后，快速生成可复制的角色档案、背景、开场白、对话示例、系统提示词、头像 Prompt、标签和导出格式。",
      open: "打开生成器",
      examples: "查看示例",
      sections: "角色卡结构",
      bullets: ["角色档案", "开场白", "对话示例", "系统提示词", "头像 Prompt", "Markdown、纯文本、JSON"],
      featureEyebrow: "工作台说明",
      featureTitle: "一个安静、直接的角色卡编辑台",
      featureIntro: "第一版保持简单：不登录、不保存、不接服务端。先帮创作者把角色卡整理成能复制、能迁移、能继续修改的草稿。",
      features: [
        ["默认私密", "所有生成都在浏览器本地完成，生成内容不会上传或保存。"],
        ["面向角色扮演", "输出围绕角色机器人常用结构：开场白、对话示例、系统提示词和人物设定。"],
        ["示例库起步", "用常见角色类型作为起点，不必从空白页开始。"],
        ["复制优先", "支持 Markdown、纯文本和类 SillyTavern JSON，一键复制。"]
      ],
      shelfEyebrow: "角色类型",
      shelfTitle: "常见角色扮演原型"
    },
    generator: {
      eyebrow: "生成器",
      title: "在浏览器里制作一张角色卡",
      intro: "左侧填写基础信息，右侧实时生成草稿。即使字段为空，也会生成安全的占位内容，方便快速测试。",
      labels: {
        name: "角色名称",
        identity: "性别 / 身份",
        personality: "性格",
        backstory: "背景故事",
        relationship: "与用户的关系",
        scenario: "开场场景",
        speakingStyle: "说话方式"
      },
      placeholders: {
        name: "Luna Vale",
        identity: "虚拟女友与情绪陪伴者",
        personality: "温柔、专注、有耐心，偶尔轻轻开玩笑",
        backstory: "她被设计成能够理解用户的日常节奏...",
        relationship: "用户是她最在意、最信任的人。",
        scenario: "深夜，用户疲惫回家后与她聊天。",
        speakingStyle: "柔和、亲密、安抚感强，带一点轻松调侃"
      },
      tone: "语气",
      outputFormat: "输出格式",
      toneLabels: { Friendly: "友好", Romantic: "恋爱", Dark: "暗黑", Funny: "幽默", Fantasy: "奇幻" },
      livePreview: "实时预览",
      firstMessage: "开场白",
      imagePrompt: "头像 Prompt",
      unnamed: "未命名角色",
      copy: "复制结果",
      copied: "已复制"
    },
    examples: {
      eyebrow: "示例",
      title: "20 个静态角色卡示例",
      intro: "覆盖 anime girl、fantasy elf、villain、AI girlfriend、detective、CEO boss、cyberpunk hacker 等常见角色类型。",
      use: "用作起点"
    },
    faq: {
      eyebrow: "FAQ",
      title: "AI 角色卡生成器常见问题",
      intro: "关于 SillyTavern 风格角色卡、Character AI、JanitorAI、roleplay prompt、开场白、头像 Prompt 和纯前端生成的说明。",
      items: [
        {
          question: "什么是 AI 角色卡生成器？",
          answer: "它用来创建可复用的角色扮演机器人设定，包括性格、背景故事、开场白、对话示例、系统提示词、标签和头像 Prompt。"
        },
        {
          question: "能用于 SillyTavern 吗？",
          answer: "当前 MVP 提供类 SillyTavern JSON 输出，方便复制和改写。它不是官方导出文件，但结构上尽量保持易转换。"
        },
        {
          question: "RoleCard AI 会调用 AI API 吗？",
          answer: "不会。第一版完全在浏览器里运行，用高质量模板生成，不需要登录、后端、数据库，也没有模型成本。"
        },
        {
          question: "可以用于 Character AI 或 JanitorAI 吗？",
          answer: "可以。你可以复制生成的角色档案、开场白、对话示例和系统提示词，再粘贴到对应平台继续调整。"
        },
        {
          question: "Scenario 字段应该写什么？",
          answer: "写角色和用户开始互动的情境，例如“用户在暴雨夜走进安静酒馆”或“演出前，角色在后台遇见用户”。"
        },
        {
          question: "好的角色开场白应该包含什么？",
          answer: "它应该交代场景、氛围、角色声音，并给用户留下回应空间，避免替用户做决定或说话。"
        },
        {
          question: "什么是 roleplay prompt？",
          answer: "它是一段指令，用来定义角色如何行动、说话、记住场景，以及如何与用户互动。"
        },
        {
          question: "可以生成恋爱向或暗黑向角色吗？",
          answer: "可以。生成器提供 Friendly、Romantic、Dark、Funny、Fantasy 等语气，每种语气会影响生成结果的表达风格。"
        }
      ]
    },
    footer: "AI 角色卡生成静态 MVP。"
  }
};

function pageFromHash(): Page {
  const hash = window.location.hash.replace("#", "");
  if (hash === "generator" || hash === "examples" || hash === "faq") {
    return hash;
  }

  return "home";
}

function storedValue<T extends string>(key: string, fallback: T, allowed: readonly T[]): T {
  const stored = localStorage.getItem(key);
  return allowed.includes(stored as T) ? (stored as T) : fallback;
}

function updateMeta(page: Page, locale: Locale) {
  const meta = copy[locale].meta[page];
  document.title = meta.title;
  document.querySelector('meta[name="description"]')?.setAttribute("content", meta.description);
  document.querySelector('meta[property="og:title"]')?.setAttribute("content", meta.title);
  document.querySelector('meta[property="og:description"]')?.setAttribute("content", meta.description);
  document.querySelector("link[rel='canonical']")?.setAttribute("href", `https://rolecard.ai/${page === "home" ? "" : `#${page}`}`);
}

function App() {
  const [page, setPage] = useState<Page>(() => pageFromHash());
  const [theme, setTheme] = useState<Theme>(() => storedValue("rolecard-theme", "light", ["light", "dark"]));
  const [locale, setLocale] = useState<Locale>(() => storedValue("rolecard-locale", "en", ["en", "zh"]));
  const t = copy[locale];

  useEffect(() => {
    const onHashChange = () => setPage(pageFromHash());
    window.addEventListener("hashchange", onHashChange);
    return () => window.removeEventListener("hashchange", onHashChange);
  }, []);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    localStorage.setItem("rolecard-theme", theme);
  }, [theme]);

  useEffect(() => {
    document.documentElement.lang = locale === "zh" ? "zh-CN" : "en";
    localStorage.setItem("rolecard-locale", locale);
    updateMeta(page, locale);
  }, [locale, page]);

  useEffect(() => {
    const schema = document.createElement("script");
    schema.type = "application/ld+json";
    schema.id = "faq-schema";
    schema.text = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: t.faq.items.map((faq) => ({
        "@type": "Question",
        name: faq.question,
        acceptedAnswer: {
          "@type": "Answer",
          text: faq.answer
        }
      }))
    });
    document.getElementById("faq-schema")?.remove();
    document.head.appendChild(schema);
  }, [t.faq.items]);

  return (
    <div className="site-shell">
      <Header currentPage={page} theme={theme} locale={locale} onThemeChange={setTheme} onLocaleChange={setLocale} />
      <main>
        {page === "home" ? <HomePage t={t} /> : null}
        {page === "generator" ? <GeneratorPage t={t} locale={locale} /> : null}
        {page === "examples" ? <ExamplesPage t={t} /> : null}
        {page === "faq" ? <FAQPage t={t} /> : null}
      </main>
      <Footer t={t} />
    </div>
  );
}

function Header({
  currentPage,
  theme,
  locale,
  onThemeChange,
  onLocaleChange
}: {
  currentPage: Page;
  theme: Theme;
  locale: Locale;
  onThemeChange: (theme: Theme) => void;
  onLocaleChange: (locale: Locale) => void;
}) {
  const t = copy[locale];

  return (
    <header className="site-header">
      <a href="#" className="brand" aria-label="RoleCard AI home">
        <span className="brand-mark">RC</span>
        <span>
          <strong>RoleCard AI</strong>
          <small>{t.headerSubtitle}</small>
        </span>
      </a>
      <nav className="site-nav" aria-label="Primary navigation">
        {pageOrder.map((id) => (
          <a key={id} href={id === "home" ? "#" : `#${id}`} className={currentPage === id ? "active" : ""}>
            {t.nav[id]}
          </a>
        ))}
      </nav>
      <div className="header-actions" aria-label="Display settings">
        <button className="toolbar-button" type="button" onClick={() => onThemeChange(theme === "light" ? "dark" : "light")}>
          {theme === "light" ? t.themeLabel : t.dayLabel}
        </button>
        <button className="toolbar-button" type="button" onClick={() => onLocaleChange(locale === "en" ? "zh" : "en")}>
          {t.langLabel}
        </button>
      </div>
    </header>
  );
}

function HomePage({ t }: { t: Copy }) {
  return (
    <>
      <section className="hero">
        <div className="hero-copy">
          <p className="eyebrow">{t.home.eyebrow}</p>
          <h1>{t.home.title}</h1>
          <p>{t.home.intro}</p>
          <div className="hero-actions">
            <a href="#generator" className="button primary">{t.home.open}</a>
            <a href="#examples" className="button secondary">{t.home.examples}</a>
          </div>
        </div>
        <div className="hero-panel">
          <span className="panel-label">{t.home.sections}</span>
          <ul>
            {t.home.bullets.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section">
        <div className="section-heading">
          <p className="eyebrow">{t.home.featureEyebrow}</p>
          <h2>{t.home.featureTitle}</h2>
          <p>{t.home.featureIntro}</p>
        </div>
        <div className="feature-grid">
          {t.home.features.map(([title, body]) => (
            <article key={title} className="card">
              <h3>{title}</h3>
              <p>{body}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section split-section">
        <div>
          <p className="eyebrow">{t.home.shelfEyebrow}</p>
          <h2>{t.home.shelfTitle}</h2>
        </div>
        <div className="tag-cloud">
          {["anime girl", "fantasy elf", "villain", "AI girlfriend", "detective", "CEO boss", "cyberpunk hacker", "vampire", "magic academy", "JanitorAI bot"].map((tag) => (
            <a key={tag} href="#examples">{tag}</a>
          ))}
        </div>
      </section>
    </>
  );
}

function GeneratorPage({ t, locale }: { t: Copy; locale: Locale }) {
  const [input, setInput] = useState<CharacterInput>(defaultInput);
  const [copied, setCopied] = useState<string>("");
  const card = useMemo(() => generateCharacterCard(input, locale), [input, locale]);
  const output = outputForFormat(card, input.outputFormat);

  useEffect(() => {
    const stored = localStorage.getItem("rolecard-example");
    if (!stored) {
      return;
    }

    try {
      setInput(JSON.parse(stored) as CharacterInput);
    } finally {
      localStorage.removeItem("rolecard-example");
    }
  }, []);

  function update<K extends keyof CharacterInput>(key: K, value: CharacterInput[K]) {
    setInput((current) => ({ ...current, [key]: value }));
  }

  async function copyOutput(text: string) {
    await navigator.clipboard.writeText(text);
    setCopied(input.outputFormat);
    window.setTimeout(() => setCopied(""), 1400);
  }

  return (
    <section className="generator-page">
      <div className="generator-intro">
        <p className="eyebrow">{t.generator.eyebrow}</p>
        <h1>{t.generator.title}</h1>
        <p>{t.generator.intro}</p>
      </div>

      <div className="generator-layout">
        <form className="form-panel" onSubmit={(event) => event.preventDefault()}>
          <TextField label={t.generator.labels.name} value={input.name} onChange={(value) => update("name", value)} placeholder={t.generator.placeholders.name} />
          <TextField label={t.generator.labels.identity} value={input.identity} onChange={(value) => update("identity", value)} placeholder={t.generator.placeholders.identity} />
          <TextArea label={t.generator.labels.personality} value={input.personality} onChange={(value) => update("personality", value)} placeholder={t.generator.placeholders.personality} />
          <TextArea label={t.generator.labels.backstory} value={input.backstory} onChange={(value) => update("backstory", value)} placeholder={t.generator.placeholders.backstory} />
          <TextArea label={t.generator.labels.relationship} value={input.relationship} onChange={(value) => update("relationship", value)} placeholder={t.generator.placeholders.relationship} />
          <TextArea label={t.generator.labels.scenario} value={input.scenario} onChange={(value) => update("scenario", value)} placeholder={t.generator.placeholders.scenario} />
          <TextField label={t.generator.labels.speakingStyle} value={input.speakingStyle} onChange={(value) => update("speakingStyle", value)} placeholder={t.generator.placeholders.speakingStyle} />
          <div className="field-grid">
            <label className="field">
              <span>{t.generator.tone}</span>
              <select value={input.tone} onChange={(event) => update("tone", event.target.value as Tone)}>
                {(["Friendly", "Romantic", "Dark", "Funny", "Fantasy"] as Tone[]).map((tone) => (
                  <option key={tone} value={tone}>{t.generator.toneLabels[tone]}</option>
                ))}
              </select>
            </label>
            <label className="field">
              <span>{t.generator.outputFormat}</span>
              <select value={input.outputFormat} onChange={(event) => update("outputFormat", event.target.value as OutputFormat)}>
                {["Markdown", "Plain Text", "SillyTavern-like JSON"].map((format) => (
                  <option key={format}>{format}</option>
                ))}
              </select>
            </label>
          </div>
        </form>

        <aside className="preview-panel">
          <div className="preview-header">
            <div>
              <p className="eyebrow">{t.generator.livePreview}</p>
              <h2>{input.name.trim() || t.generator.unnamed}</h2>
            </div>
            <button className="copy-button" onClick={() => copyOutput(output)}>
              {copied ? `${t.generator.copied} ${copied}` : t.generator.copy}
            </button>
          </div>
          <div className="mini-output">
            <h3>{t.generator.firstMessage}</h3>
            <p>{card.firstMessage}</p>
            <h3>{t.generator.imagePrompt}</h3>
            <p>{card.imagePrompt}</p>
            <div className="tags">
              {card.tags.map((tag) => (
                <span key={tag}>{tag}</span>
              ))}
            </div>
          </div>
          <pre className="output-box">{output}</pre>
        </aside>
      </div>
    </section>
  );
}

function TextField({ label, value, onChange, placeholder }: { label: string; value: string; onChange: (value: string) => void; placeholder: string }) {
  return (
    <label className="field">
      <span>{label}</span>
      <input value={value} onChange={(event) => onChange(event.target.value)} placeholder={placeholder} />
    </label>
  );
}

function TextArea({ label, value, onChange, placeholder }: { label: string; value: string; onChange: (value: string) => void; placeholder: string }) {
  return (
    <label className="field">
      <span>{label}</span>
      <textarea value={value} onChange={(event) => onChange(event.target.value)} placeholder={placeholder} rows={4} />
    </label>
  );
}

function ExamplesPage({ t }: { t: Copy }) {
  return (
    <section className="section">
      <div className="section-heading">
        <p className="eyebrow">{t.examples.eyebrow}</p>
        <h1>{t.examples.title}</h1>
        <p>{t.examples.intro}</p>
      </div>
      <div className="examples-grid">
        {examples.map((example) => (
          <article key={example.slug} className="example-card">
            <div className="example-card__top">
              <span>{t.generator.toneLabels[example.tone]}</span>
              <strong>{example.archetype}</strong>
            </div>
            <h2>{example.name}</h2>
            <p>{example.description}</p>
            <div className="tags">
              {example.tags.map((tag) => (
                <span key={tag}>{tag}</span>
              ))}
            </div>
            <a href="#generator" onClick={() => localStorage.setItem("rolecard-example", JSON.stringify(example.input))}>
              {t.examples.use}
            </a>
          </article>
        ))}
      </div>
    </section>
  );
}

function FAQPage({ t }: { t: Copy }) {
  return (
    <section className="section faq-page">
      <div className="section-heading">
        <p className="eyebrow">{t.faq.eyebrow}</p>
        <h1>{t.faq.title}</h1>
        <p>{t.faq.intro}</p>
      </div>
      <div className="faq-list">
        {t.faq.items.map((faq) => (
          <details key={faq.question} open>
            <summary>{faq.question}</summary>
            <p>{faq.answer}</p>
          </details>
        ))}
      </div>
    </section>
  );
}

function Footer({ t }: { t: Copy }) {
  return (
    <footer className="footer">
      <span>RoleCard AI</span>
      <span>{t.footer}</span>
    </footer>
  );
}

export default App;
