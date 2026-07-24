import { normalizeWhitespace, tokenize } from "./utils.js";

function cleanMarkdownLine(line) {
  return String(line ?? "")
    .replace(/^[-*+]\s+/, "")
    .replace(/^\d+\.\s+/, "")
    .replace(/^>\s?/, "")
    .replace(/!\[[^\]]*]\([^)]*\)/g, "")
    .replace(/\[([^\]]+)]\([^)]*\)/g, "$1")
    .replace(/[*_`~]/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

function parseFrontMatterBlock(markdown) {
  const normalized = String(markdown ?? "").replace(/\r\n?/g, "\n");
  const match = normalized.match(/^---\n([\s\S]*?)\n---\n?([\s\S]*)$/);
  if (!match) return { metadata: {}, body: normalized };

  const metadata = {};
  for (const line of match[1].split("\n")) {
    const separator = line.indexOf(":");
    if (separator < 0) continue;
    const key = line.slice(0, separator).trim().toLowerCase();
    const value = line.slice(separator + 1).trim().replace(/^["']|["']$/g, "");
    if (key) metadata[key] = value;
  }
  return { metadata, body: match[2] };
}

function createFallbackTitle(filename) {
  return String(filename || "Portfolio Source")
    .replace(/\.md$/i, "")
    .split(/[\/_-]+/)
    .filter(Boolean)
    .map(word => word[0].toUpperCase() + word.slice(1))
    .join(" ");
}

export function parseSections(markdown) {
  const sections = [];
  let current = { heading: "Overview", level: 1, lines: [] };

  const commit = () => {
    const text = current.lines.map(cleanMarkdownLine).filter(Boolean).join("\n").trim();
    if (text) sections.push({ heading: current.heading, level: current.level, text });
  };

  for (const line of String(markdown ?? "").split("\n")) {
    const heading = line.match(/^(#{1,6})\s+(.+?)\s*$/);
    if (heading) {
      commit();
      current = { heading: heading[2].trim(), level: heading[1].length, lines: [] };
    } else {
      current.lines.push(line);
    }
  }
  commit();
  return sections;
}

export function parseKnowledgeDocument(markdown, filename, resolvedUrl = "") {
  const { metadata, body } = parseFrontMatterBlock(markdown);
  const sections = parseSections(body);
  const title = metadata.title || createFallbackTitle(filename);
  const type = metadata.type || "portfolio";
  const url = metadata.url || resolvedUrl || "#about";
  const text = normalizeWhitespace(sections.map(section => section.text).join("\n"));

  return {
    id: `${filename}:${title}`.toLowerCase(),
    title,
    type,
    url,
    metadata,
    text,
    sections,
    sourceFile: filename,
    tokens: tokenize(`${title} ${type} ${text}`)
  };
}
