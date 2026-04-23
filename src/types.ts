export type Tone = "Friendly" | "Romantic" | "Dark" | "Funny" | "Fantasy";

export type OutputFormat = "Markdown" | "Plain Text" | "SillyTavern-like JSON";

export type Locale = "en" | "zh";

export type Theme = "light" | "dark";

export type CharacterInput = {
  name: string;
  identity: string;
  personality: string;
  backstory: string;
  relationship: string;
  scenario: string;
  speakingStyle: string;
  tone: Tone;
  outputFormat: OutputFormat;
};

export type GeneratedCard = {
  markdown: string;
  plainText: string;
  json: string;
  profile: string;
  firstMessage: string;
  imagePrompt: string;
  tags: string[];
};

export type ExampleCharacter = {
  slug: string;
  name: string;
  archetype: string;
  description: string;
  tone: Tone;
  tags: string[];
  input: CharacterInput;
};
