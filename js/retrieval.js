import { CONFIG } from "./config.js";
import { expandTokens, normalizeText, splitIntoSentences, tokenize, uniqueBy } from "./utils.js";

export class Retriever {
  constructor(documents) {
    this.documents = documents;
    this.documentFrequency = this.#buildDocumentFrequency(documents);
  }

  #buildDocumentFrequency(documents) {
    const frequency = new Map();
    for (const documentItem of documents) {
      for (const token of new Set(documentItem.tokens)) {
        frequency.set(token, (frequency.get(token) || 0) + 1);
      }
    }
    return frequency;
  }

  #idf(token) {
    return Math.log((this.documents.length + 1) / ((this.documentFrequency.get(token) || 0) + 1)) + 1;
  }

  scoreDocument(documentItem, query, previousContextIds = new Set()) {
    const rawTokens = tokenize(query);
    const expanded = expandTokens(rawTokens);
    const counts = new Map();
    documentItem.tokens.forEach(token => counts.set(token, (counts.get(token) || 0) + 1));

    const titleTokens = new Set(tokenize(documentItem.title));
    const typeTokens = new Set(tokenize(documentItem.type));
    const normalizedQuery = normalizeText(query);
    const normalizedText = normalizeText(documentItem.text);
    let score = 0;

    for (const token of expanded) {
      const count = counts.get(token) || 0;
      if (count) score += (1 + Math.log(count)) * this.#idf(token) * 0.1;
      if (titleTokens.has(token)) score += 0.85;
      if (typeTokens.has(token)) score += 0.3;
    }

    const exactMatches = rawTokens.filter(token => documentItem.tokens.includes(token)).length;
    if (rawTokens.length) score += exactMatches / rawTokens.length;
    if (normalizedQuery.length > 5 && normalizedText.includes(normalizedQuery)) score += 1.5;
    if (previousContextIds.has(documentItem.id)) score += 0.35;
    return score;
  }

  search(query, previousContext = [], limit = CONFIG.maxContextItems) {
    const previousIds = new Set(previousContext.map(item => item.id));
    return this.documents
      .map(documentItem => ({ ...documentItem, score: this.scoreDocument(documentItem, query, previousIds) }))
      .filter(documentItem => documentItem.score >= CONFIG.minimumDocumentScore)
      .sort((a, b) => b.score - a.score)
      .slice(0, limit);
  }

  findFaq(question) {
    const questionTokens = new Set(tokenize(question));
    const normalizedQuestion = normalizeText(question);
    let best = null;

    for (const source of this.documents) {
      for (const section of source.sections) {
        if (!section.heading.includes("?")) continue;
        const headingTokens = tokenize(section.heading);
        if (!headingTokens.length) continue;
        const overlap = headingTokens.filter(token => questionTokens.has(token)).length;
        const headingCoverage = overlap / headingTokens.length;
        const questionCoverage = overlap / Math.max(questionTokens.size, 1);
        const score = normalizeText(section.heading) === normalizedQuestion
          ? 1
          : headingCoverage * 0.68 + questionCoverage * 0.32;
        if (!best || score > best.score) best = { score, source, heading: section.heading, answer: section.text };
      }
    }
    return best?.score >= CONFIG.minimumFaqScore ? best : null;
  }

  evidence(query, contextItems) {
    const candidates = [];
    for (const source of contextItems) {
      for (const section of source.sections) {
        for (const sentence of splitIntoSentences(section.text)) {
          candidates.push({ sentence, section: section.heading, source, score: this.#scoreSentence(sentence, query, source.score) });
        }
      }
    }
    return uniqueBy(
      candidates.sort((a, b) => b.score - a.score),
      item => normalizeText(item.sentence)
    ).filter(item => item.score > 0).slice(0, CONFIG.maxEvidenceItems);
  }

  #scoreSentence(sentence, query, documentScore = 0) {
    const sentenceTokens = new Set(tokenize(sentence));
    const raw = tokenize(query);
    const expanded = expandTokens(raw);
    let score = documentScore * 0.22;
    expanded.forEach(token => { if (sentenceTokens.has(token)) score += 1; });
    if (normalizeText(sentence).includes(normalizeText(query)) && query.length > 5) score += 2;
    if (sentence.length >= 70 && sentence.length <= 250) score += 0.25;
    if (/\b\d+(?:\.\d+)?%?\b/.test(sentence)) score += 0.2;
    return score;
  }
}
