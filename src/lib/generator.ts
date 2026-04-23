import type { CharacterInput, GeneratedCard, Locale, Tone } from "../types";

export const defaultInput: CharacterInput = {
  name: "",
  identity: "",
  personality: "",
  backstory: "",
  relationship: "",
  scenario: "",
  speakingStyle: "",
  tone: "Friendly",
  outputFormat: "Markdown"
};

const toneGuides: Record<Locale, Record<Tone, { voice: string; tags: string[] }>> = {
  en: {
    Friendly: {
      voice: "warm, approachable, emotionally clear, and easy to talk to",
      tags: ["friendly", "comfort", "slice-of-life"]
    },
    Romantic: {
      voice: "intimate, attentive, emotionally warm, and subtly flirtatious",
      tags: ["romantic", "slow-burn", "relationship"]
    },
    Dark: {
      voice: "tense, atmospheric, morally complex, and controlled",
      tags: ["dark", "drama", "intense"]
    },
    Funny: {
      voice: "witty, fast, playful, and expressive",
      tags: ["comedy", "banter", "playful"]
    },
    Fantasy: {
      voice: "immersive, mythic, descriptive, and lore-rich",
      tags: ["fantasy", "adventure", "worldbuilding"]
    }
  },
  zh: {
    Friendly: {
      voice: "温和、好接近、情绪表达清楚，也容易展开对话",
      tags: ["友好", "陪伴", "日常"]
    },
    Romantic: {
      voice: "亲密、专注、情绪温热，并带一点克制的暧昧感",
      tags: ["恋爱", "慢热", "关系"]
    },
    Dark: {
      voice: "紧绷、有压迫感、道德边界暧昧，但表达始终克制",
      tags: ["暗黑", "剧情", "强冲突"]
    },
    Funny: {
      voice: "机灵、节奏快、爱吐槽，能自然制造轻松的来回拉扯",
      tags: ["喜剧", "拌嘴", "轻松"]
    },
    Fantasy: {
      voice: "有沉浸感、带神话色彩、重视场景描写和世界观细节",
      tags: ["奇幻", "冒险", "世界观"]
    }
  }
};

function value(input: string, fallback: string) {
  return input.trim() || fallback;
}

export function generateCharacterCard(input: CharacterInput, locale: Locale = "en"): GeneratedCard {
  const zh = locale === "zh";
  const name = value(input.name, zh ? "未命名角色" : "Unnamed Character");
  const identity = value(input.identity, zh ? "原创角色扮演人物" : "Original roleplay character");
  const personality = value(input.personality, zh ? "好奇、表达鲜明、情绪反应自然，并且容易被记住" : "curious, expressive, emotionally responsive, and memorable");
  const backstory = value(
    input.backstory,
    zh
      ? `${name} 有一段尚未完全说出口的过去，那些选择、动机和经历会影响其面对用户时的反应。`
      : `${name} has a past full of unresolved choices, hidden motivations, and experiences that shape how they respond to the user.`
  );
  const relationship = value(input.relationship, zh ? "用户是在恰当时刻进入角色生活的重要人物。" : "The user is someone important who enters the character's life at the right moment.");
  const scenario = value(input.scenario, zh ? "用户在一个适合展开剧情的开场场景中遇见这个角色。" : "The user meets the character at the beginning of a meaningful roleplay scene.");
  const speakingStyle = value(input.speakingStyle, zh ? "自然、生动、情绪稳定，并保持角色一致性" : "natural, vivid, emotionally grounded, and consistent");
  const tone = toneGuides[locale][input.tone];
  const tags = Array.from(new Set([input.tone.toLowerCase(), ...tone.tags, ...identity.toLowerCase().split(/[,\s/]+/).filter(Boolean).slice(0, 4)]));

  const profile = zh
    ? `${name} 是${identity}。角色性格为：${personality}。说话质感应当保持${tone.voice}。`
    : `${name} is ${identity}. They are ${personality}. Their voice should feel ${tone.voice}.`;
  const line = zh
    ? input.tone === "Funny"
      ? "好吧，事情突然变得有意思起来了。"
      : input.tone === "Dark"
        ? "如果你还没准备好面对真相，就不该来到这里。"
        : input.tone === "Romantic"
          ? "我一直在想，你会不会回来。"
          : input.tone === "Fantasy"
            ? "古老的征兆没有错，你终于来了。"
            : "你来了就好。慢慢说，发生了什么？"
    : input.tone === "Funny"
      ? "Well, this just got interesting."
      : input.tone === "Dark"
        ? "You should not have come here unless you were ready for the truth."
        : input.tone === "Romantic"
          ? "I was hoping you would come back."
          : input.tone === "Fantasy"
            ? "The old signs were right. You have arrived at last."
            : "I am glad you are here. Tell me what happened.";
  const firstMessage = zh
    ? `${scenario}\n\n${name} 抬眼看向你，神情里藏着许多尚未说出口的话。“${line}”`
    : `${scenario}\n\n${name} looks toward you, their expression shaped by everything they have not yet said. "${line}"`;
  const imagePrompt = zh
    ? `${name}, ${identity}, ${input.tone.toLowerCase()} 角色扮演人物, 表情鲜明, 服装细节丰富, 电影感光线, character card portrait, high detail, clean composition`
    : `${name}, ${identity}, ${input.tone.toLowerCase()} roleplay character, expressive face, detailed outfit, cinematic lighting, character card portrait, high detail, clean composition`;

  const exampleDialogues = zh
    ? [
        `用户：“你到底是谁？”\n${name}：“这取决于你能承受多少真相。”`,
        `用户：“你想从我这里得到什么？”\n${name}：“现在？诚实。其他的，我们可以慢慢谈。”`,
        `用户：“我能相信你吗？”\n${name}：“信任不是一句话，是我们一行一行写出来的剧情。”`
      ]
    : [
        `User: "Who are you, really?"\n${name}: "That depends on how much truth you can handle."`,
        `User: "What do you want from me?"\n${name}: "For now? Honesty. We can negotiate the rest later."`,
        `User: "Can I trust you?"\n${name}: "Trust is a scene we write one line at a time."`
      ];

  const systemPrompt = zh
    ? `始终以 ${name} 的身份进行角色扮演。保持设定中的场景、性格、背景、关系和说话方式。不要替用户行动或发言。回复应保持沉浸感、情绪一致，并符合 ${input.tone.toLowerCase()} 的整体语气。`
    : `Stay in character as ${name}. Maintain the roleplay scenario, personality, backstory, relationship, and speaking style. Do not speak for the user. Keep responses immersive, emotionally consistent, and appropriate to the ${input.tone.toLowerCase()} tone.`;

  const markdown = zh
    ? `# ${name}\n\n## 角色档案\n${profile}\n\n## 性格\n${personality}\n\n## 背景故事\n${backstory}\n\n## 与用户的关系\n${relationship}\n\n## 场景\n${scenario}\n\n## 说话方式\n${speakingStyle}\n\n## 开场白\n${firstMessage}\n\n## 对话示例\n${exampleDialogues.map((dialogue) => `### 示例\n${dialogue}`).join("\n\n")}\n\n## 系统提示词\n${systemPrompt}\n\n## 头像 Prompt\n${imagePrompt}\n\n## 标签\n${tags.map((tag) => `- ${tag}`).join("\n")}`
    : `# ${name}\n\n## Character Profile\n${profile}\n\n## Personality\n${personality}\n\n## Backstory\n${backstory}\n\n## Relationship with User\n${relationship}\n\n## Scenario\n${scenario}\n\n## Speaking Style\n${speakingStyle}\n\n## First Message\n${firstMessage}\n\n## Example Dialogues\n${exampleDialogues.map((dialogue) => `### Example\n${dialogue}`).join("\n\n")}\n\n## System Prompt\n${systemPrompt}\n\n## Image Prompt\n${imagePrompt}\n\n## Tags\n${tags.map((tag) => `- ${tag}`).join("\n")}`;

  const plainText = zh
    ? `${name}\n\n角色档案：\n${profile}\n\n性格：\n${personality}\n\n背景故事：\n${backstory}\n\n与用户的关系：\n${relationship}\n\n场景：\n${scenario}\n\n说话方式：\n${speakingStyle}\n\n开场白：\n${firstMessage}\n\n对话示例：\n${exampleDialogues.join("\n\n")}\n\n系统提示词：\n${systemPrompt}\n\n头像 Prompt：\n${imagePrompt}\n\n标签：${tags.join(", ")}`
    : `${name}\n\nCharacter Profile:\n${profile}\n\nPersonality:\n${personality}\n\nBackstory:\n${backstory}\n\nRelationship with User:\n${relationship}\n\nScenario:\n${scenario}\n\nSpeaking Style:\n${speakingStyle}\n\nFirst Message:\n${firstMessage}\n\nExample Dialogues:\n${exampleDialogues.join("\n\n")}\n\nSystem Prompt:\n${systemPrompt}\n\nImage Prompt:\n${imagePrompt}\n\nTags: ${tags.join(", ")}`;

  const json = JSON.stringify(
    {
      name,
      description: profile,
      personality,
      scenario,
      first_mes: firstMessage,
      mes_example: exampleDialogues.join("\n\n"),
      system_prompt: systemPrompt,
      creator_notes: {
        backstory,
        relationship,
        speakingStyle,
        imagePrompt,
        tone: input.tone,
        tags
      }
    },
    null,
    2
  );

  return {
    markdown,
    plainText,
    json,
    profile,
    firstMessage,
    imagePrompt,
    tags
  };
}

export function outputForFormat(card: GeneratedCard, format: CharacterInput["outputFormat"]) {
  if (format === "Plain Text") {
    return card.plainText;
  }

  if (format === "SillyTavern-like JSON") {
    return card.json;
  }

  return card.markdown;
}
