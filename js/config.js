export const CONFIG = Object.freeze({
  ownerName: "Jamie Reichenberger",
  manifestUrl: new URL("../knowledge/manifest.json", import.meta.url),
  maxContextItems: 5,
  maxEvidenceItems: 5,
  maxConversationTurns: 10,
  minimumDocumentScore: 0.18,
  minimumFaqScore: 0.84,
  answerDelayMs: 180,
  debug: false
});

export const ELEMENT_IDS = Object.freeze({
  panel: "aiPanel",
  launcher: "aiLauncher",
  closeButton: "aiClose",
  input: "aiInput",
  sendButton: "aiSend",
  messages: "aiMessages",
  status: "aiStatus",
  chips: "aiChips"
});

export const DEFAULT_FOLLOW_UPS = Object.freeze([
  "How does Jamie connect curriculum strategy to measurable outcomes?",
  "What is Jamie’s strongest AI-assisted curriculum example?",
  "How does Jamie combine software engineering and learning design?"
]);
