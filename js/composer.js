import { CONFIG } from "./config.js";
import { normalizeText, tokenize, uniqueBy } from "./utils.js";

function removeRedundancy(sentences) {
  const accepted = [];
  for (const sentence of sentences) {
    const current = new Set(tokenize(sentence));
    const duplicate = accepted.some(existing => {
      const prior = new Set(tokenize(existing));
      const overlap = [...current].filter(token => prior.has(token)).length;
      return overlap / Math.max(Math.min(current.size, prior.size), 1) >= 0.72;
    });
    if (!duplicate) accepted.push(sentence);
  }
  return accepted;
}

function opening(intent, evidence, context) {
  const topic = evidence[0]?.section || context[0]?.title || "";
  const name = CONFIG.ownerName;
  const openings = {
    overview: `${name} is a curriculum and technology leader who combines instructional design, software engineering, AI-enabled workflows, teaching, and program leadership.`,
    value: `${name}’s strongest differentiator is her ability to connect learning strategy, technical implementation, and measurable organizational outcomes.`,
    approach: `Based on her documented work, ${name} would begin by clarifying the performance need, learner context, desired outcomes, constraints, and evidence of success.`,
    teaching: `${name}’s teaching experience gives her direct insight into how curriculum performs with real learners.`,
    leadership: `${name} leads through clear systems, collaborative decision-making, defined standards, and practical execution.`,
    technology: `${name} uses technology when it improves learning quality, operational efficiency, decision-making, or maintainability—not simply because a tool is new.`,
    example: topic ? `${topic} is a strong documented example of ${name}’s work.` : `A strong documented example appears in ${name}’s portfolio.`
  };
  return openings[intent] || "";
}

export function composeAnswer(query, intent, evidence, context) {
  if (!evidence.length) {
    const subject = tokenize(query).slice(0, 5).join(" ");
    return {
      text: subject ? `I could not find enough verified portfolio information about ${subject} to answer confidently.` : "I could not find enough verified portfolio information to answer confidently.",
      sources: []
    };
  }

  if (intent === "fact") return { text: evidence[0].sentence, sources: [evidence[0].source] };

  const sentences = removeRedundancy(evidence.map(item => item.sentence)).slice(0, 3);
  const paragraphs = [opening(intent, evidence, context), sentences[0], sentences.slice(1).join(" ")].filter(Boolean);
  const sources = uniqueBy(evidence.map(item => item.source), source => source.id).slice(0, 3);
  return { text: paragraphs.slice(0, 3).join("\n\n"), sources };
}

export function personalFact(query, context) {
  const normalized = normalizeText(query);
  const factTypes = [
    ["favorite color", "favoritecolor", /favorite colou?r(?: is|:)\s*([^.!?\n]+)/i],
    ["favorite food", "favoritefood", /favorite food(?: is|:)\s*([^.!?\n]+)/i],
    ["favorite book", "favoritebook", /favorite book(?: is|:)\s*([^.!?\n]+)/i],
    ["favorite movie", "favoritemovie", /favorite movie(?: is|:)\s*([^.!?\n]+)/i],
    ["favorite hobby", "favoritehobby", /favorite hobby(?: is|:)\s*([^.!?\n]+)/i]
  ];
  const requested = factTypes.find(([label]) => normalized.includes(label));
  if (!requested) return null;
  const [label, metadataKey, regex] = requested;
  const matches = [];
  for (const source of context) {
    const metadataValue = source.metadata[metadataKey];
    if (metadataValue) matches.push({ value: metadataValue, source });
    const textMatch = source.text.match(regex);
    if (textMatch?.[1]) matches.push({ value: textMatch[1].trim().replace(/[.,;:]+$/, ""), source });
  }
  const values = uniqueBy(matches, item => normalizeText(item.value));
  if (!values.length) return { text: `I could not find ${CONFIG.ownerName}’s ${label} in the portfolio knowledge.`, sources: [] };
  if (values.length > 1) return { text: `The portfolio contains conflicting information about ${CONFIG.ownerName}’s ${label}. The source material should be corrected before giving a definitive answer.`, sources: values.map(item => item.source) };
  return { text: `${CONFIG.ownerName}’s ${label} is ${values[0].value}.`, sources: [values[0].source] };
}
