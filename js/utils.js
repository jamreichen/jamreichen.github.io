const STOP_WORDS = new Set([
  "a", "an", "and", "are", "as", "at", "be", "been", "being", "by", "can",
  "could", "did", "do", "does", "for", "from", "had", "has", "have", "her",
  "hers", "how", "i", "in", "is", "it", "its", "jamie", "may", "me", "might",
  "of", "on", "or", "our", "she", "should", "tell", "than", "that", "the",
  "their", "them", "they", "this", "to", "us", "was", "we", "were", "what",
  "when", "where", "which", "who", "why", "will", "with", "would", "you", "your"
]);

const SINGULARS = Object.freeze({
  companies: "company", courses: "course", curricula: "curriculum", educators: "educator",
  learners: "learner", lessons: "lesson", organizations: "organization", processes: "process",
  programs: "program", projects: "project", students: "student", teams: "team",
  technologies: "technology", workflows: "workflow", outcomes: "outcome"
});

export const TOKEN_ALIASES = Object.freeze({
  ai: ["artificial intelligence", "generative ai", "machine learning"],
  automation: ["workflow", "orchestration", "low code"],
  build: ["create", "develop", "design", "architect"],
  classroom: ["teaching", "instruction", "learner"],
  company: ["organization", "employer", "business"],
  course: ["curriculum", "program", "lesson", "learning experience"],
  curriculum: ["course", "program", "instructional design", "learning experience"],
  improve: ["modernize", "optimize", "refine", "enhance"],
  industry: ["workforce", "employer", "career", "professional"],
  leadership: ["manage", "team", "director", "strategy"],
  measure: ["metric", "analytics", "outcome", "performance", "result"],
  quality: ["quality assurance", "qa", "review", "validation", "audit"],
  software: ["engineering", "development", "application", "technical"],
  student: ["learner", "participant"],
  technology: ["software", "ai", "platform", "tool"],
  work: ["experience", "project", "case study"]
});

export function normalizeWhitespace(value) {
  return String(value ?? "")
    .replace(/\r\n?/g, "\n")
    .replace(/[ \t]+/g, " ")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}

export function normalizeText(value) {
  return String(value ?? "")
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[’']/g, "")
    .replace(/[^a-z0-9\s-]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

export function tokenize(value) {
  return normalizeText(value)
    .split(" ")
    .map(token => SINGULARS[token] || token)
    .filter(token => token.length > 1 && !STOP_WORDS.has(token));
}

export function expandTokens(tokens) {
  const result = new Set(tokens);
  for (const token of tokens) {
    for (const phrase of TOKEN_ALIASES[token] || []) {
      tokenize(phrase).forEach(alias => result.add(alias));
    }
  }
  return [...result];
}

export function splitIntoSentences(text) {
  return String(text ?? "")
    .split(/\n+/)
    .flatMap(paragraph => paragraph.split(/(?<=[.!?])\s+(?=[A-Z0-9“"'])/))
    .map(normalizeWhitespace)
    .filter(sentence => sentence.length >= 25 && sentence.length <= 420);
}

export function uniqueBy(items, keyFn) {
  return [...new Map(items.map(item => [keyFn(item), item])).values()];
}

export function delay(milliseconds) {
  return new Promise(resolve => window.setTimeout(resolve, milliseconds));
}
