import { CONFIG } from "./config.js";
import { parseKnowledgeDocument } from "./markdown.js";
import { normalizeWhitespace, tokenize } from "./utils.js";

function pageFallbackKnowledge() {
  return ["#about", "#projects", "#case-studies", "#approach", "#skills"]
    .map(selector => {
      const section = document.querySelector(selector);
      if (!section) return null;
      const heading = section.querySelector("h1, h2, h3, .section-title");
      const title = heading?.textContent?.trim() || selector.slice(1);
      const text = normalizeWhitespace(section.textContent);
      if (!text) return null;
      return {
        id: `page:${selector}`,
        title,
        type: "portfolio page",
        url: selector,
        metadata: {},
        text,
        sections: [{ heading: title, level: 2, text }],
        sourceFile: "index.html",
        tokens: tokenize(`${title} ${text}`)
      };
    })
    .filter(Boolean);
}

export async function loadKnowledge() {
  try {
    const response = await fetch(CONFIG.manifestUrl, { cache: "no-store" });
    if (!response.ok) throw new Error(`Manifest failed: ${response.status}`);

    const payload = await response.json();
    const files = Array.isArray(payload) ? payload : payload.files;
    if (!Array.isArray(files) || !files.length) throw new Error("Manifest contains no files.");

    const results = await Promise.allSettled(files.map(async filename => {
      if (typeof filename !== "string" || !filename.toLowerCase().endsWith(".md")) {
        throw new Error(`Invalid knowledge filename: ${String(filename)}`);
      }
      const fileUrl = new URL(filename.split("/").map(encodeURIComponent).join("/"), CONFIG.manifestUrl);
      const fileResponse = await fetch(fileUrl, { cache: "no-store" });
      if (!fileResponse.ok) throw new Error(`${filename} failed: ${fileResponse.status}`);
      return parseKnowledgeDocument(await fileResponse.text(), filename, fileUrl.href);
    }));

    const documents = results.filter(result => result.status === "fulfilled").map(result => result.value);
    const failures = results.filter(result => result.status === "rejected").map(result => result.reason?.message);
    if (!documents.length) throw new Error("No usable knowledge files loaded.");
    return { documents, failures, fallback: false };
  } catch (error) {
    const documents = pageFallbackKnowledge();
    if (!documents.length) throw error;
    return { documents, failures: [error.message], fallback: true };
  }
}
