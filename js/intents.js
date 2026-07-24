import { normalizeText, tokenize } from "./utils.js";

const RULES = [
  ["personal", ["favorite color", "favourite color", "favorite food", "favorite book", "favorite movie", "favorite hobby"]],
  ["overview", ["who is jamie", "tell me about jamie", "what does jamie do", "describe jamie", "summarize jamie", "career overview", "professional background"]],
  ["value", ["why hire", "strong candidate", "good fit", "what value", "what makes jamie different"]],
  ["approach", ["how would jamie", "what would jamie do", "how does jamie approach", "what is jamies process", "how would she"]],
  ["example", ["case study", "give me an example", "strongest example", "which project", "what project"]],
  ["teaching", ["teaching", "instructor", "classroom", "students", "learners", "university"]],
  ["leadership", ["leadership", "lead a team", "manage a team", "manage stakeholders"]],
  ["technology", ["software engineering", "artificial intelligence", "generative ai", "rag", "openai", "anthropic", "technology stack"]]
];

export function detectIntent(query) {
  const normalized = normalizeText(query);
  for (const [intent, phrases] of RULES) {
    if (phrases.some(phrase => normalized.includes(normalizeText(phrase)))) return intent;
  }
  const tokens = new Set(tokenize(query));
  if (["teaching", "instructor", "student", "learner"].some(token => tokens.has(token))) return "teaching";
  if (["leadership", "manage", "stakeholder"].some(token => tokens.has(token))) return "leadership";
  if (["software", "technology", "ai", "rag"].some(token => tokens.has(token))) return "technology";
  if (/\bhow many\b|\bwhat year\b|\bwhich employer\b|\bwhat tool\b|\bwhat platform\b/.test(normalized)) return "fact";
  return "general";
}
