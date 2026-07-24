(() => {
  "use strict";

  const CONFIG = {
    ownerName: "Jamie Reichenberger",

    // Number of portfolio sources retrieved for each question.
    maxContextItems: 5,

    // Number of evidence sentences used to build an answer.
    maxEvidenceSentences: 5,

    // Number of recent conversation turns retained in memory.
    maxConversationTurns: 20,

    // Chance that a relevant witty line is added to an answer.
    // 0.45 means approximately 45% of eligible responses.
    witFrequency: 0.45
  };

  /*
   * This object documents the intended chatbot voice.
   *
   * The current browser-only chatbot uses templates rather than a
   * language model, so these rules are implemented throughout the
   * answer-composition functions in later sections.
   */
  const BOT_PERSONALITY = {
    tone: "warm, intelligent, conversational, confident, and lightly witty",

    rules: [
      "Answer directly before adding supporting detail.",
      "Use only information found in the portfolio knowledge.",
      "Never invent dates, metrics, employers, outcomes, or credentials.",
      "Keep most answers to two to four short paragraphs.",
      "Avoid repeating the visitor's question.",
      "Prefer specific examples over generic claims.",
      "Use wit sparingly and only when it fits the topic.",
      "Do not sound like a resume pasted into a chat window."
    ]
  };

  /*
   * Chatbot interface elements
   */
  const panel = document.getElementById("aiPanel");
  const launcher = document.getElementById("aiLauncher");
  const closeButton = document.getElementById("aiClose");
  const input = document.getElementById("aiInput");
  const send = document.getElementById("aiSend");
  const messages = document.getElementById("aiMessages");
  const status = document.getElementById("aiStatus");
  const chipsContainer = document.getElementById("aiChips");

  /*
   * Stop initialization if required HTML elements are missing.
   *
   * This prevents one missing element from breaking unrelated parts
   * of the portfolio page.
   */
 /*
 * Stop initialization if required HTML elements are missing.
 */
if (
  !panel ||
  !launcher ||
  !closeButton ||
  !input ||
  !send ||
  !messages ||
  !status ||
  !chipsContainer
) {
  console.error(
    "AI portfolio widget could not initialize because required elements are missing."
  );

  return;
}


  /*
   * Loaded Markdown or visible-page portfolio knowledge.
   */
  let portfolioKnowledge = [];

  /*
   * Recent conversation history.
   *
   * This can later be sent to a language model if one is added.
   */
  const conversation = [];

  /*
   * Lightweight conversational memory.
   *
   * This allows questions such as:
   *
   * "What did Jamie do at GCU?"
   * "What was unusual about that?"
   *
   * The second question can inherit the GCU topic from the first.
   */
  const chatMemory = {
    lastTopic: "",
    lastQuestion: "",
    lastSources: [],
    lastIntent: "general"
  };

  /*
   * Common words that should not influence document retrieval.
   */
  const stopWords = new Set([
    "a",
    "an",
    "and",
    "are",
    "as",
    "at",
    "be",
    "by",
    "for",
    "from",
    "has",
    "have",
    "how",
    "i",
    "in",
    "is",
    "it",
    "of",
    "on",
    "or",
    "that",
    "the",
    "this",
    "to",
    "was",
    "what",
    "when",
    "where",
    "which",
    "who",
    "why",
    "will",
    "with",
    "would",
    "you",
    "your",
    "jamie",
    "about",
    "tell",
    "me",
    "her",
    "she",
    "they",
    "them",
    "do",
"does",
"did",
"doing"
  ]);

  /*
   * Controlled, topic-aware wit.
   *
   * The chatbot selects from these only when the topic matches.
   * It does not add a witty sentence to every answer.
   */
  const wittyLines = {
    curriculum: [
      "She does not just design the map—she has taught the route.",
      "For Jamie, curriculum is a working system, not a very expensive stack of PDFs.",
      "The syllabus is only the beginning."
    ],

    technology: [
      "The technology should support the learning—not become the assignment.",
      "A shiny tool is not automatically a learning strategy.",
      "Jamie is comfortable translating between educators, developers, and the occasional mysterious error message."
    ],

    leadership: [
      "Her leadership style is structured, collaborative, and refreshingly low on unnecessary theater.",
      "She tends to bring order to complicated work without flattening the creativity out of it."
    ],

    teaching: [
      "That classroom perspective keeps the design honest.",
      "It is one thing to write the instructions. It is another to watch real learners try to use them."
    ],

    general: [
      "That is where Jamie tends to do her best work.",
      "The interesting part is how strategy and execution stay connected."
    ]
  };

  /*
   * Default suggested questions.
   *
   * These are replaced dynamically after each answer based on the
   * retrieved sources and detected question intent.
   */
const defaultFollowUps = [
  "How would Jamie evaluate and improve our learning programs?",
  "What is the strongest example of Jamie connecting strategy to execution?",
  "How does Jamie combine software engineering, AI, and learning design?"
];

  /*
   * Open or close the chatbot panel.
   */
 function setPanelOpen(open) {
  panel.classList.toggle("open", open);
  panel.hidden = !open;

  panel.setAttribute(
    "aria-hidden",
    String(!open)
  );

  launcher.setAttribute(
    "aria-expanded",
    String(open)
  );

  if (open) {
    window.setTimeout(() => {
      input.focus();
    }, 0);
  }
}
/*
 * If the question exactly matches a Markdown FAQ heading,
 * return the complete answer underneath that heading.
 */
function findExactFAQ(question) {

    const target = question
        .trim()
        .replace(/\?$/, "")
        .toLowerCase();

    for (const doc of portfolioKnowledge) {

        const lines = doc.text.split("\n");

        for (let i = 0; i < lines.length; i++) {

            const line = lines[i].trim();

            if (!line.startsWith("##")) continue;

            const heading = line
                .replace(/^#+/, "")
                .trim()
                .replace(/\?$/, "")
                .toLowerCase();

            if (heading !== target)
                continue;

            let answer = [];

            for (let j = i + 1; j < lines.length; j++) {

                const next = lines[j];

                if (next.startsWith("##"))
                    break;

                answer.push(next);
            }

            return {
                source: doc,
                answer: answer.join("\n").trim()
            };
        }
    }

    return null;
}
  /*
   * Add a user or chatbot message to the interface.
   */
function addMessage(role, text, sources = []) {
  const message = document.createElement("div");
  message.className = `ai-message ${role}`;

  const content = document.createElement("div");
  content.textContent = text;

  message.appendChild(content);
  messages.appendChild(message);

  requestAnimationFrame(() => {
    messages.scrollTop = messages.scrollHeight;
  });

  return content;
}
    /*
   * Parse optional Markdown front matter and convert the file into
   * a searchable portfolio knowledge object.
   *
   * Supported front matter:
   *
   * ---
   * title: "Grand Canyon University"
   * type: "case study"
   * url: "#gcu-programs"
   * ---
   */
 function parseFrontMatter(markdown, filename) {
  const normalized = String(markdown || "")
    .replace(/\r\n?/g, "\n");

  const match = normalized.match(
    /^---\n([\s\S]*?)\n---\n?([\s\S]*)$/
  );

  const metadata = {};
  let body = normalized;

  if (match) {
    match[1].split("\n").forEach(line => {
      const separator = line.indexOf(":");

      if (separator === -1) {
        return;
      }

      const key = line
        .slice(0, separator)
        .trim()
        .toLowerCase();

      const value = line
        .slice(separator + 1)
        .trim()
        .replace(/^['"]|['"]$/g, "");

      metadata[key] = value;
    });

    body = match[2];
  }

  /*
   * Create clean evidence text.
   *
   * Markdown headings are intentionally excluded so answers do not
   * contain "# Software Engineering Projects" or "## Overview."
   */
  const cleanText = body
    .split("\n")
    .map(line => line.trim())
    .filter(line => {
      return (
        line &&
        !/^#{1,6}\s+/.test(line) &&
        !/^---+$/.test(line)
      );
    })
    .map(line => {
      return line
        .replace(/^[-*+]\s+/, "")
        .replace(/^\d+\.\s+/, "")
        .replace(/^>\s?/, "")
        .replace(/!\[[^\]]*\]\([^)]*\)/g, "")
        .replace(/\[([^\]]+)\]\([^)]*\)/g, "$1")
        .replace(/[*_`~]/g, "")
        .replace(/\s+/g, " ")
        .trim();
    })
    .filter(Boolean)
    .join("\n");

  const fallbackTitle = filename
    .replace(/\.md$/i, "")
    .split("-")
    .map(word => {
      return (
        word.charAt(0).toUpperCase() +
        word.slice(1)
      );
    })
    .join(" ");

  return {
    title:
      metadata.title ||
      fallbackTitle,

    type:
      metadata.type ||
      "portfolio",

    url:
      metadata.url ||
      "#about",

    /*
     * Used by retrieval and evidence extraction.
     */
    text: cleanText,

    /*
     * Used only for FAQ heading and answer extraction.
     */
    markdown: body,

    sourceFile: filename
  };
}

  /*
   * Build temporary knowledge from visible page content.
   *
   * This allows the chatbot to keep working when:
   *
   * - index.html is opened directly from the computer
   * - the Markdown folder is unavailable
   * - the site host blocks a knowledge file
   */
  function buildPageFallbackKnowledge() {
    const selectors = [
      "#about",
      "#projects",
      "#case-studies",
      "#approach",
      "#skills"
    ];

    return selectors
      .map(selector => {
        return {
          selector,
          section:
            document.querySelector(selector)
        };
      })
      .filter(item => {
        return Boolean(item.section);
      })
      .map((item, index) => {
        const heading =
          item.section.querySelector(
            "h1, h2, h3, .section-title"
          );

        return {
          title:
            heading?.textContent.trim() ||
            `Portfolio Section ${index + 1}`,

          type:
            "portfolio page",

          url:
            item.selector,

          text:
            item.section.textContent
              .replace(/\s+/g, " ")
              .trim(),

          sourceFile:
            "index.html"
        };
      })
      .filter(entry => {
        return Boolean(entry.text);
      });
  }

  /*
   * Load Markdown files listed in knowledge/manifest.json.
   *
   * The chatbot continues working even if one or more Markdown files
   * fail to load.
   */
  async function loadPortfolioKnowledge() {
    status.innerHTML =
      "<strong>Loading:</strong> portfolio knowledge...";

    input.disabled = true;
    send.disabled = true;

    try {
      /*
       * Resolve paths relative to chatbot.js.
       *
       * Expected structure:
       *
       * index.html
       * js/chatbot.js
       * knowledge/manifest.json
       */
      const scriptUrl =
        document.currentScript?.src ||
        window.location.href;

      const manifestUrl = new URL(
        "../knowledge/manifest.json",
        scriptUrl
      );

      const manifestResponse = await fetch(
        manifestUrl,
        {
          cache: "no-store"
        }
      );

      if (!manifestResponse.ok) {
        throw new Error(
          `Could not load the knowledge manifest (${manifestResponse.status}).`
        );
      }

      const manifest =
        await manifestResponse.json();

      const filenames =
        Array.isArray(manifest)
          ? manifest
          : manifest.files;

      if (
        !Array.isArray(filenames) ||
        filenames.length === 0
      ) {
        throw new Error(
          "The knowledge manifest contains no Markdown files."
        );
      }

      /*
       * Promise.allSettled allows one broken Markdown file to be
       * skipped without breaking the entire chatbot.
       */
      const results =
        await Promise.allSettled(
          filenames.map(
            async filename => {
              if (
                typeof filename !== "string" ||
                !filename
                  .toLowerCase()
                  .endsWith(".md")
              ) {
                throw new Error(
                  `Invalid knowledge filename: ${String(filename)}`
                );
              }

              /*
               * Encode each folder or filename segment safely.
               */
              const encodedPath = filename
                .split("/")
                .map(segment => {
                  return encodeURIComponent(
                    segment
                  );
                })
                .join("/");

              const fileUrl = new URL(
                `../knowledge/${encodedPath}`,
                scriptUrl
              );

              const response = await fetch(
                fileUrl,
                {
                  cache: "no-store"
                }
              );

              if (!response.ok) {
                throw new Error(
                  `Could not load ${filename} (${response.status}).`
                );
              }

              const markdown =
                await response.text();

              return parseFrontMatter(
                markdown,
                filename
              );
            }
          )
        );

      const failedFiles = results
        .filter(result => {
          return (
            result.status ===
            "rejected"
          );
        })
        .map(result => {
          return (
            result.reason?.message ||
            "Unknown Markdown loading error"
          );
        });

      portfolioKnowledge = results
        .filter(result => {
          return (
            result.status ===
            "fulfilled"
          );
        })
        .map(result => {
          return result.value;
        })
        .filter(entry => {
          return Boolean(entry.text);
        });

      if (
        portfolioKnowledge.length === 0
      ) {
        throw new Error(
          "No usable Markdown knowledge files were loaded."
        );
      }

      status.innerHTML =
        failedFiles.length > 0
          ? `<strong>Ready:</strong> ${portfolioKnowledge.length} sources loaded; ${failedFiles.length} skipped.`
          : `<strong>Ready:</strong> ${portfolioKnowledge.length} portfolio sources loaded.`;

      if (failedFiles.length > 0) {
        console.warn(
          "Some knowledge files were skipped:",
          failedFiles
        );
      }
    } catch (error) {
      console.warn(
        "Markdown knowledge could not be loaded; using visible page content.",
        error
      );

      portfolioKnowledge =
        buildPageFallbackKnowledge();

      if (
        portfolioKnowledge.length === 0
      ) {
        status.innerHTML =
          "<strong>Unavailable:</strong> portfolio knowledge could not be loaded.";

        return;
      }

      status.innerHTML =
        location.protocol === "file:"
          ? "<strong>Preview mode:</strong> using visible page content. Use a local server or deploy the whole folder to load Markdown."
          : "<strong>Fallback mode:</strong> using visible portfolio page content.";
    } finally {
      const unavailable =
        portfolioKnowledge.length === 0;

      input.disabled = unavailable;
      send.disabled = unavailable;
    }
  }
    /*
   * Convert text into searchable tokens.
   */
  function tokenize(text) {
    return String(text || "")
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, " ")
      .split(/\s+/)
      .filter(word => {
        return (
          word.length > 1 &&
          !stopWords.has(word)
        );
      });
  }

  /*
   * Identify the kind of answer the visitor is requesting.
   *
   * The chatbot uses this to choose a more natural response structure.
   */
  function detectIntent(query) {
    const normalized =
      query.toLowerCase();
if (
  normalized.includes("favorite color") ||
  normalized.includes("favourite color") ||
  normalized.includes("favorite food") ||
  normalized.includes("favorite movie") ||
  normalized.includes("favorite book") ||
  normalized.includes("favorite hobby") ||
  normalized.includes("personal preference") ||
  normalized.includes("personally")
) {
  return "personal";

}
if (
  normalized.includes("who is jamie") ||
  normalized.includes("tell me about jamie") ||
  normalized.includes("what does jamie do") ||
  normalized.includes("what does she do") ||
  normalized.includes("what is jamie's work") ||
  normalized.includes("what is jamie’s work") ||
  normalized.includes("what does jamie specialize in") ||
  normalized.includes("describe jamie") ||
  normalized.includes("jamie's background") ||
  normalized.includes("jamie’s background") ||
  normalized.includes("background") ||
  normalized.includes("overview")
) {
  return "overview";
}
    if (
      normalized.includes(
        "who is jamie"
      ) ||
      normalized.includes(
        "tell me about jamie"
      ) ||
      normalized.includes(
        "background"
      ) ||
      normalized.includes(
        "overview"
      )
    ) {
      return "overview";
    }

    if (
      normalized.includes(
        "why hire"
      ) ||
      normalized.includes(
        "strong candidate"
      ) ||
      normalized.includes(
        "good fit"
      ) ||
      normalized.includes(
        "strength"
      ) ||
      normalized.includes(
        "value"
      )
    ) {
      return "value";
    }

    if (
      normalized.includes(
        "example"
      ) ||
      normalized.includes(
        "case study"
      ) ||
      normalized.includes(
        "project"
      )
    ) {
      return "example";
    }

    if (
      normalized.includes(
        "how would"
      ) ||
      normalized.includes(
        "what would jamie do"
      ) ||
      normalized.includes(
        "approach"
      ) ||
      normalized.includes(
        "process"
      )
    ) {
      return "approach";
    }

    if (
      normalized.includes(
        "teach"
      ) ||
      normalized.includes(
        "student"
      ) ||
      normalized.includes(
        "classroom"
      ) ||
      normalized.includes(
        "instructor"
      )
    ) {
      return "teaching";
    }

    if (
      normalized.includes(
        "leadership"
      ) ||
      normalized.includes(
        "manage"
      ) ||
      normalized.includes(
        "team"
      )
    ) {
      return "leadership";
    }

    if (
      normalized.includes(
        "ai"
      ) ||
      normalized.includes(
        "software"
      ) ||
      normalized.includes(
        "technology"
      ) ||
      normalized.includes(
        "web"
      )
    ) {
      return "technology";
    }

    if (
      normalized.includes(
        "how many"
      ) ||
      normalized.includes(
        "when"
      ) ||
      normalized.includes(
        "where"
      ) ||
      normalized.includes(
        "which"
      )
    ) {
      return "fact";
    }

    return "general";
  }

  /*
   * Add previous conversational context to vague follow-up questions.
   *
   * Example:
   *
   * Visitor:
   * "What did Jamie do at GCU?"
   *
   * Follow-up:
   * "What was unusual about that?"
   *
   * The second question is expanded with the previous GCU topic.
   */
  function expandFollowUpQuery(query) {
    const normalized =
      query.toLowerCase();

    const looksLikeFollowUp =
      normalized.startsWith(
        "what about"
      ) ||
      normalized.startsWith(
        "how about"
      ) ||
      normalized.includes(
        "that project"
      ) ||
      normalized.includes(
        "that work"
      ) ||
      normalized.includes(
        "this work"
      ) ||
      normalized.includes(
        "she do there"
      ) ||
      normalized.includes(
        "why was that"
      ) ||
      normalized.includes(
        "what was unusual"
      ) ||
      normalized === "why?" ||
      normalized === "how so?";

    if (
      looksLikeFollowUp &&
      chatMemory.lastTopic
    ) {
      return [
        query,
        `Previous topic: ${chatMemory.lastTopic}.`,
        `Previous question: ${chatMemory.lastQuestion}.`
      ].join(" ");
    }

    return query;
  }

  /*
   * Retrieve the most relevant portfolio sources using a lightweight
   * TF-IDF-style scoring system.
   */
function retrieve(
  query,
  limit = CONFIG.maxContextItems
) {
  if (portfolioKnowledge.length === 0) {
    return [];
  }

  const queryTokens = tokenize(query);

  if (
    queryTokens.length === 0 &&
    chatMemory.lastSources.length > 0
  ) {
    return chatMemory.lastSources;
  }

  const documents = portfolioKnowledge.map(item => {
    return {
      ...item,
      tokens: tokenize(
        `${item.title} ${item.type} ${item.text}`
      )
    };
  });

  const documentFrequency = {};

  for (const token of new Set(queryTokens)) {
    documentFrequency[token] = documents.filter(document => {
      return document.tokens.includes(token);
    }).length;
  }

  return documents
    .map(document => {
      const counts = {};

      document.tokens.forEach(token => {
        counts[token] =
          (counts[token] || 0) + 1;
      });

      let score = 0;

      queryTokens.forEach(token => {
        const termFrequency =
          (counts[token] || 0) /
          Math.max(document.tokens.length, 1);

        const inverseDocumentFrequency =
          Math.log(
            (documents.length + 1) /
            ((documentFrequency[token] || 0) + 1)
          ) + 1;

        score +=
          termFrequency *
          inverseDocumentFrequency;

        const title =
          document.title.toLowerCase();

        const type =
          document.type.toLowerCase();

        if (title.includes(token)) {
          score += 0.65;
        }

        if (type.includes(token)) {
          score += 0.25;
        }

        /*
         * Exact word matches in the title receive an extra boost.
         */
        if (
          tokenize(document.title).includes(token)
        ) {
          score += 0.5;
        }
      });

      /*
       * Only apply memory when the current question appears to be
       * an actual conversational follow-up.
       */
      const normalizedQuery =
        query.toLowerCase();

      const isFollowUp =
        normalizedQuery.includes("that") ||
        normalizedQuery.includes("this") ||
        normalizedQuery.includes("there") ||
        normalizedQuery === "why?" ||
        normalizedQuery === "how so?";

      if (
        isFollowUp &&
        chatMemory.lastTopic &&
        document.title === chatMemory.lastTopic
      ) {
        score += 0.15;
      }

      return {
        ...document,
        score
      };
    })

    /*
     * Critical fix:
     * discard unrelated documents before taking the top results.
     */
    .filter(document => {
      return document.score > 0;
    })

    .sort((a, b) => {
      return b.score - a.score;
    })

    /*
     * Five focused sources produce better answers than twenty
     * loosely related sources.
     */
    .slice(
      0,
      Math.min(limit, 5)
    );
}
function retrieveProfileOverview() {
  const profileTerms = [
    "professional profile",
    "professional-profile",
    "about jamie",
    "biography",
    "bio",
    "career overview",
    "resume",
    "curriculum",
    "learning experience",
    "software engineering",
    "artificial intelligence"
  ];

  const undesirableTerms = [
    "grading",
    "rubric",
    "student answer",
    "model answer",
    "discussion response",
    "assessment feedback"
  ];

  const profileDocuments = portfolioKnowledge
    .map(documentItem => {
      const identityText = [
        documentItem.title,
        documentItem.type,
        documentItem.sourceFile
      ]
        .filter(Boolean)
        .join(" ")
        .toLowerCase();

      const contentText =
        String(documentItem.text || "")
          .toLowerCase();

      let score = 0;

      profileTerms.forEach(term => {
        if (identityText.includes(term)) {
          score += 5;
        }

        if (contentText.includes(term)) {
          score += 0.5;
        }
      });

      undesirableTerms.forEach(term => {
        if (
          identityText.includes(term) ||
          contentText.includes(term)
        ) {
          score -= 10;
        }
      });

      return {
        ...documentItem,
        score
      };
    })
    .filter(documentItem => {
      return documentItem.score > 0;
    })
    .sort((a, b) => {
      return b.score - a.score;
    })
    .slice(0, 3);

  if (profileDocuments.length > 0) {
    return profileDocuments;
  }

  return retrieve(
    "Jamie professional background curriculum learning experience software engineering artificial intelligence leadership"
  );
}
  /*
   * Split a portfolio source into usable sentences.
   */
function splitIntoSentences(text) {
  return String(text || "")
    .split(/\n+/)
    .flatMap(paragraph => {
      return paragraph
        .split(/(?<=[.!?])\s+/)
        .map(sentence => {
          return sentence.trim();
        });
    })
    .filter(sentence => {
      return (
        sentence.length >= 20 &&
        sentence.length <= 500 &&
        !/^#{1,6}\s+/.test(sentence) &&
        !/^overview$/i.test(sentence) &&
        !/^frequently asked questions$/i.test(
          sentence
        )
      );
    });
}

  /*
   * Score individual sentences against the visitor's question.
   *
   * This prevents the chatbot from pasting entire portfolio sections.
   */
  function getRelevantSentences(
    text,
    queryTokens,
    limit = 3
  ) {
    return splitIntoSentences(text)
      .map(sentence => {
        const normalized =
          sentence.toLowerCase();

        let score =
          queryTokens.reduce(
            (total, token) => {
              return (
                total +
                (
                  normalized.includes(
                    token
                  )
                    ? 1
                    : 0
                )
              );
            },
            0
          );

        /*
         * Slightly prefer informative medium-length sentences.
         */
        if (
          sentence.length >= 70
        ) {
          score += 0.1;
        }

        if (
          sentence.length > 380
        ) {
          score -= 0.35;
        }

        return {
          sentence:
            sentence.trim(),

          score
        };
      })
      .sort((a, b) => {
        return b.score - a.score;
      })
      .filter(item => {
        return item.score > 0;
      })
      .slice(0, limit)
      .map(item => {
        return item.sentence;
      });
  }

  /*
   * Collect the strongest supporting sentences from the retrieved
   * portfolio sources.
   */
  function gatherEvidence(
    query,
    contextItems
  ) {
    const queryTokens =
      tokenize(query);

    const evidence = [];

    contextItems.forEach(item => {
      const sentences =
        getRelevantSentences(
          item.text,
          queryTokens,
          3
        );

      sentences.forEach(sentence => {
        const duplicate =
          evidence.some(
            existingItem => {
              return (
                existingItem.sentence
                  .toLowerCase() ===
                sentence.toLowerCase()
              );
            }
          );

        if (!duplicate) {
          evidence.push({
            sentence,
            source:
              item.title
          });
        }
      });
    });

    return evidence.slice(
      0,
      CONFIG.maxEvidenceSentences
    );
  }

  function extractPersonalFact(query, contextItems) {
  const normalizedQuery = query.toLowerCase();

  const factPatterns = [
    {
      matches: ["favorite color", "favourite color"],
      label: "favorite color",
      regex: /jamie(?:'s|’s)? favorite colou?r is ([a-z][a-z -]*)/gi
    },
    {
      matches: ["favorite food"],
      label: "favorite food",
      regex: /jamie(?:'s|’s)? favorite food is ([a-z][a-z ',&-]*)/gi
    },
    {
      matches: ["favorite book"],
      label: "favorite book",
      regex: /jamie(?:'s|’s)? favorite book is ([^.!?]+)/gi
    },
    {
      matches: ["favorite movie"],
      label: "favorite movie",
      regex: /jamie(?:'s|’s)? favorite movie is ([^.!?]+)/gi
    },
    {
      matches: ["favorite hobby"],
      label: "favorite hobby",
      regex: /jamie(?:'s|’s)? favorite hobby is ([^.!?]+)/gi
    }
  ];

  const requestedFact = factPatterns.find(fact => {
    return fact.matches.some(phrase =>
      normalizedQuery.includes(phrase)
    );
  });

  if (!requestedFact) {
    return null;
  }

  const foundValues = [];

  contextItems.forEach(item => {
    const matches = item.text.matchAll(requestedFact.regex);

    for (const match of matches) {
      const value = match[1]
        .trim()
        .replace(/\s+/g, " ")
        .replace(/[.,;:]+$/, "");

      if (
        value &&
        !foundValues.some(
          existing =>
            existing.value.toLowerCase() === value.toLowerCase()
        )
      ) {
        foundValues.push({
          value,
          source: item.title
        });
      }
    }
  });

  if (foundValues.length === 0) {
    return {
      answer: `I could not find Jamie’s ${requestedFact.label} in the portfolio knowledge.`,
      sources: []
    };
  }

  if (foundValues.length > 1) {
    const values = foundValues
      .map(item => item.value)
      .join(" and ");

    return {
      answer:
        `I found conflicting information about Jamie’s ${requestedFact.label}: ${values}. ` +
        "That knowledge should be updated before I give a definitive answer.",
      sources: foundValues.map(item => ({
        title: item.source
      }))
    };
  }

  const value = foundValues[0].value;

  return {
    answer:
      requestedFact.label === "favorite color"
        ? `Jamie’s favorite color is ${value}.`
        : `Jamie’s ${requestedFact.label} is ${value}.`,
    sources: [
      {
        title: foundValues[0].source
      }
    ]
  };
}
    /*
   * Determine which wit category best matches the current question.
   */
  function getTopicCategory(
    query,
    intent
  ) {
    const normalized =
      query.toLowerCase();

    if (
      intent === "teaching" ||
      normalized.includes("teach") ||
      normalized.includes("student")
    ) {
      return "teaching";
    }

    if (
      intent === "leadership" ||
      normalized.includes("leadership")
    ) {
      return "leadership";
    }

    if (
      intent === "technology" ||
      normalized.includes("ai") ||
      normalized.includes("software")
    ) {
      return "technology";
    }

    if (
      normalized.includes("curriculum") ||
      normalized.includes("course") ||
      normalized.includes("learning")
    ) {
      return "curriculum";
    }

    return "general";
  }

  /*
   * Return an occasional topic-appropriate witty sentence.
   *
   * Wit is controlled by CONFIG.witFrequency so the chatbot does not
   * sound like it is trying too hard.
   */
  function getWittyLine(
    query,
    intent
  ) {
    if (
      Math.random() >
      CONFIG.witFrequency
    ) {
      return "";
    }

    const category =
      getTopicCategory(
        query,
        intent
      );

    const options =
      wittyLines[category] ||
      wittyLines.general;

    return options[
      Math.floor(
        Math.random() *
        options.length
      )
    ];
  }

  /*
   * Response used when the portfolio does not contain enough relevant
   * information to answer confidently.
   */
  function createUnknownAnswer() {
    return [
      "I do not have enough portfolio information to answer that confidently.",
      "Try asking about Jamie’s curriculum development, teaching, AI and software work, UX approach, program architecture, or leadership experience."
    ].join("\n\n");
  }

  /*
   * Compose a natural answer based on the visitor's intent.
   *
   * This is still a browser-only system, so it does not generate
   * original language in the same way a large language model would.
   * Instead, it combines:
   *
   * - direct response templates
   * - relevant portfolio evidence
   * - light conversational phrasing
   * - occasional topic-aware wit
   */

  /*
 * If the question exactly matches a Markdown FAQ heading,
 * return the complete answer underneath that heading.
 */

 function composeConversationalAnswer(
  query,
  intent,
  evidence,
  contextItems
) {
    
  if (evidence.length === 0) {
    return createUnknownAnswer();
  }

  const sentences = evidence
    .map(item => item.sentence)
    .filter(Boolean);

  const primary = sentences[0] || "";

  const supportingSentences = sentences
    .slice(1, 3)
    .filter(sentence => {
      return (
        sentence.toLowerCase() !==
        primary.toLowerCase()
      );
    });

  const support =
    supportingSentences.join(" ");

  const topic =
    contextItems[0]?.title || "";

  const wittyLine =
    getWittyLine(query, intent);

  let introduction = "";

  switch (intent) {
   case "overview":
  introduction =
   "Jamie Reichenberger is a curriculum and technology leader whose work spans instructional design, software engineering, computer science education, academic program development, and AI-powered learning. She works at the intersection of education and technology, designing technical curriculum, developing software, leading instructional teams, and helping learners prepare for careers in technology. Jamie combines experience as a software engineer, curriculum strategist, instructional leader, and university instructor.";
  break;

    case "value":
      introduction =
        "Jamie’s value comes from connecting strategy, technical depth, and practical implementation.";
      break;

    case "approach":
      introduction =
        "Jamie begins with the real performance need, the learner context, and the constraints surrounding implementation.";
      break;

    case "example":
      introduction =
        topic
          ? `A strong example is Jamie’s work related to ${topic}.`
          : "A strong example from Jamie’s portfolio is:";
      break;

    case "teaching":
      introduction =
        "Jamie’s classroom experience gives her direct evidence of how curriculum performs with real learners.";
      break;

    case "leadership":
      introduction =
        "Jamie leads through clear systems, collaborative decision-making, and practical execution.";
      break;

    case "technology":
      introduction =
        "Jamie uses technology to solve defined learning and operational problems rather than adding tools for novelty.";
      break;

    case "fact":
      return primary;

    default:
      /*
       * For a normal question, answer with the retrieved evidence
       * rather than forcing a repeated generic introduction.
       */
      return [primary, support]
        .filter(Boolean)
        .join(" ");
  }

  const paragraphs = [
    introduction,
    [primary, support]
      .filter(Boolean)
      .join(" ")
  ];

  if (
    wittyLine &&
    intent !== "fact" &&
    Math.random() < 0.35
  ) {
    paragraphs.push(wittyLine);
  }

  return paragraphs
    .filter(Boolean)
    .slice(0, 3)
    .join("\n\n");
}

  /*
   * Store enough context to understand the next follow-up question.
   */
  function updateMemory(
    query,
    intent,
    contextItems
  ) {
    chatMemory.lastQuestion =
      query;

    chatMemory.lastIntent =
      intent;

    chatMemory.lastSources =
      contextItems.slice(0, 3);

    chatMemory.lastTopic =
      contextItems[0]?.title ||
      "";
  }

  /*
   * Build suggested follow-up questions based on the sources and
   * intent of the most recent answer.
   */
  /*
 * Curated interview graph.
 *
 * These follow-up questions are designed to feel like the next question
 * a thoughtful hiring manager, university leader, or consulting client
 * would naturally ask.
 */
const curatedInterviewGraph = {
  gcu: {
    overview: [
      "How did Jamie help architect GCU’s game development and HCI degree programs?",
      "What made Jamie’s role different from traditional course writing?",
      "How did teaching a course she helped design change her perspective?"
    ],

    curriculum: [
      "How did Jamie translate graduate capabilities into a complete degree map?",
      "How were prerequisites, course sequencing, and capstone readiness determined?",
      "How did she balance academic rigor with current industry expectations?"
    ],

    teaching: [
      "What did Jamie discover after teaching a course she helped create?",
      "Which curriculum decisions became clearer once real students used the course?",
      "How does classroom experience make Jamie a stronger curriculum architect?"
    ],

    technology: [
      "How did Jamie’s software engineering background shape the Game Development curriculum?",
      "How were technical tools and project expectations selected for the programs?",
      "How would Jamie modernize these programs for AI-assisted development today?"
    ],

    value: [
      "Why would a university hire Jamie to design a new technical degree?",
      "What unique perspective does Jamie bring as both an engineer and educator?",
      "How does Jamie reduce risk before a new academic program launches?"
    ],

    default: [
      "How did Jamie help architect GCU’s game development and HCI degree programs?",
      "What did she learn from teaching a course she helped design?",
      "How would she modernize those programs using AI today?"
    ]
  },

  bethel: {
    overview: [
      "How did Jamie move from instruction into curriculum and program leadership?",
      "What systems did Jamie build to improve consistency across programs?",
      "Which outcomes best demonstrate the impact of her work at Bethel?"
    ],

    leadership: [
      "How did Jamie lead instructors through large curriculum changes?",
      "How did she create standards without removing instructor creativity?",
      "What did Jamie do when program needs, learner needs, and business constraints conflicted?"
    ],

    curriculum: [
      "How did Jamie standardize curriculum development across technical programs?",
      "How did she connect course projects to career-ready competencies?",
      "What did she learn from developing programs that were not ultimately launched?"
    ],

    default: [
      "How did Jamie standardize curriculum across technical programs?",
      "What programs and degree pathways did she help develop?",
      "How did she connect curriculum decisions to retention and career outcomes?"
    ]
  },

  onboarding: {
    approach: [
      "How would Jamie redesign our first 30 days of onboarding?",
      "What would Jamie measure to determine whether onboarding is working?",
      "How does she reduce information overload without leaving critical gaps?"
    ],

    value: [
      "What business problems can Jamie’s onboarding framework solve?",
      "How would Jamie shorten time to productivity?",
      "Where can AI improve onboarding without replacing human support?"
    ],

    default: [
      "How would Jamie redesign our first 30 days of onboarding?",
      "How does she build early wins into onboarding?",
      "What metrics would prove the redesign worked?"
    ]
  },

  software: {
    technology: [
      "How does Jamie move from a business problem to a software architecture?",
      "What senior-level engineering decisions does Jamie prioritize first?",
      "How does Jamie balance speed, scalability, security, and maintainability?"
    ],

    example: [
      "Which software project best demonstrates Jamie’s systems thinking?",
      "What architecture would Jamie choose for a multi-tenant platform?",
      "How does Jamie turn prototypes into maintainable production systems?"
    ],

    value: [
      "What software problems is Jamie especially well equipped to solve?",
      "How does Jamie connect engineering decisions to business goals?",
      "What makes Jamie effective across both technical and nontechnical teams?"
    ],

    default: [
      "How does Jamie approach software architecture at a senior level?",
      "Which project best demonstrates her systems thinking?",
      "How does she balance technical quality with business constraints?"
    ]
  },

  ai: {
    technology: [
      "How does Jamie decide whether an AI feature should use RAG, rules, or a traditional workflow?",
      "What safeguards does Jamie include in human-centered AI systems?",
      "How does she evaluate whether an AI feature is actually useful?"
    ],

    approach: [
      "How would Jamie introduce AI into an organization responsibly?",
      "Which parts of the workflow should remain human-led?",
      "How does Jamie move from AI prototype to reliable product?"
    ],

    value: [
      "Where can Jamie help an organization apply AI most effectively?",
      "How does Jamie distinguish useful AI from unnecessary automation?",
      "What makes her AI approach practical rather than experimental?"
    ],

    default: [
      "How does Jamie decide where AI adds real value?",
      "What should never be fully automated?",
      "How does she evaluate AI quality and reliability?"
    ]
  },

  learningExperience: {
    approach: [
      "How does Jamie turn a performance gap into a complete learning experience?",
      "How does she determine whether a project is authentically job-relevant?",
      "What evidence does Jamie use to improve a course after launch?"
    ],

    value: [
      "What makes Jamie different from a traditional instructional designer?",
      "How does Jamie connect learner needs, technology, and organizational outcomes?",
      "How would Jamie evaluate an existing curriculum in her first 30 days?"
    ],

    teaching: [
      "How does teaching influence Jamie’s learning experience decisions?",
      "What does Jamie do when learners struggle with technically complex material?",
      "How does she use learner feedback to revise a course?"
    ],

    default: [
      "How does Jamie design backward from real-world performance?",
      "How does she make technical learning active and authentic?",
      "How does she measure whether the experience worked?"
    ]
  },

  profile: {
    overview: [
      "What is the strongest example of Jamie bridging engineering and education?",
      "How has Jamie’s career prepared her to lead AI-enabled learning work?",
      "What type of organization would benefit most from Jamie’s background?"
    ],

    value: [
      "Why is Jamie a strong fit for a senior curriculum or learning-technology role?",
      "What problems is Jamie especially well equipped to solve?",
      "What would Jamie prioritize in her first 90 days?"
    ],

    default: [
      "What is the strongest example of Jamie bridging engineering and education?",
      "What problems is she especially well equipped to solve?",
      "What would she prioritize in her first 90 days?"
    ]
  }
};

/*
 * Detect the strongest follow-up topic from the retrieved documents.
 */
function detectFollowUpTopic(contextItems) {
  const titles = contextItems
    .map(item => {
      return `${item.title} ${item.type} ${item.sourceFile || ""}`;
    })
    .join(" ")
    .toLowerCase();

  if (
    titles.includes("grand canyon") ||
    titles.includes("gcu")
  ) {
    return "gcu";
  }

  if (titles.includes("bethel")) {
    return "bethel";
  }

  if (titles.includes("onboarding")) {
    return "onboarding";
  }

  if (
    titles.includes("software engineering") ||
    titles.includes("software-engineering") ||
    titles.includes("software project")
  ) {
    return "software";
  }

  if (
    titles.includes("artificial intelligence") ||
    titles.includes("ai-first") ||
    titles.includes("ai curriculum") ||
    titles.includes("rag")
  ) {
    return "ai";
  }

  if (
    titles.includes("learning experience") ||
    titles.includes("learning-experience") ||
    titles.includes("instructional design")
  ) {
    return "learningExperience";
  }

  if (
    titles.includes("professional profile") ||
    titles.includes("professional-profile")
  ) {
    return "profile";
  }

  return "";
}
function generateFollowUps(
  contextItems,
  intent
) {
  const topic = detectFollowUpTopic(contextItems);

  /*
   * Use the curated question path when the retrieved documents match
   * a recognized portfolio topic.
   */
  if (topic) {
    const topicQuestions =
      curatedInterviewGraph[topic];

    return (
      topicQuestions[intent] ||
      topicQuestions.default ||
      defaultFollowUps
    );
  }

  /*
   * Strong employer-oriented fallback questions when no specific
   * portfolio topic was detected.
   */
  if (intent === "approach") {
    return [
      "What would Jamie do during the first 30 days of this work?",
      "How would she measure whether the solution is working?",
      "What risks would Jamie identify before implementation?"
    ];
  }

  if (intent === "technology") {
    return [
      "How does Jamie decide which technology belongs in the solution?",
      "How does she move from prototype to a maintainable system?",
      "How does she keep AI and software decisions grounded in user needs?"
    ];
  }

  if (intent === "leadership") {
    return [
      "How does Jamie create clarity when a project has many stakeholders?",
      "How does she lead technical and nontechnical contributors together?",
      "What would Jamie prioritize in the first 90 days?"
    ];
  }

  if (intent === "teaching") {
    return [
      "How has teaching changed the way Jamie designs curriculum?",
      "What does Jamie do when learners are struggling?",
      "How does classroom evidence influence her design decisions?"
    ];
  }

  if (intent === "value") {
    return [
      "What problem is Jamie especially well equipped to solve?",
      "What would Jamie contribute in the first 90 days?",
      "What evidence best demonstrates her impact?"
    ];
  }

  if (intent === "example") {
    return [
      "What made that project strategically important?",
      "What decisions did Jamie personally lead?",
      "What evidence shows that the solution worked?"
    ];
  }

  if (intent === "overview") {
    return [
      "What is the strongest example of Jamie’s interdisciplinary background?",
      "What problems is Jamie best positioned to solve?",
      "What would Jamie bring to a senior leadership role?"
    ];
  }

  return defaultFollowUps;
}
  /*
   * Replace the suggestion chips beneath the conversation.
   */

  
  function renderFollowUps(
    questions
  ) {
    chipsContainer.innerHTML = "";

    questions
      .slice(0, 3)
      .forEach(question => {
        const chip =
          document.createElement(
            "button"
          );

        chip.className =
          "ai-chip";

        chip.type =
          "button";

        chip.textContent =
          question;

        chip.addEventListener(
          "click",
          () => {
            ask(question);
          }
        );

        chipsContainer.appendChild(
          chip
        );
      });
  }
    /*
   * Process a visitor question.
   */
function normalizeFAQQuestion(value) {
  return String(value || "")
    .toLowerCase()
    .replace(/[’']/g, "")
    .replace(/[?？.!,:;()[\]{}]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}
function normalizeFAQToken(token) {
  let normalized = String(token || "")
    .toLowerCase()
    .replace(/[’']/g, "")
    .replace(/[^a-z0-9-]/g, "")
    .trim();

  /*
   * Normalize common plural forms:
   *
   * teams      -> team
   * educators  -> educator
   * companies  -> company
   * processes  -> process
   */
  if (
    normalized.endsWith("ies") &&
    normalized.length > 4
  ) {
    normalized =
      normalized.slice(0, -3) + "y";
  } else if (
    normalized.endsWith("ses") &&
    normalized.length > 4
  ) {
    normalized =
      normalized.slice(0, -2);
  } else if (
    normalized.endsWith("s") &&
    !normalized.endsWith("ss") &&
    normalized.length > 3
  ) {
    normalized =
      normalized.slice(0, -1);
  }

  return normalized;
}

function normalizeFAQQuestion(value) {
  return String(value || "")
    .toLowerCase()
    .replace(/[’']/g, "")
    .replace(/[?？.!,:;()[\]{}]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function getFAQTokens(value) {
  const ignoredWords = new Set([
    "a",
    "an",
    "and",
    "are",
    "does",
    "do",
    "how",
    "is",
    "jamie",
    "of",
    "the",
    "to",
    "what",
    "with"
  ]);

  return normalizeFAQQuestion(value)
    .split(" ")
    .map(normalizeFAQToken)
    .filter(token => {
      return (
        token.length > 1 &&
        !ignoredWords.has(token)
      );
    });
}

function findBestFAQ(question) {
  const normalizedQuestion =
    normalizeFAQQuestion(question);

  const questionTokens =
    new Set(getFAQTokens(question));

  let bestMatch = null;

  for (const documentItem of portfolioKnowledge) {
    const markdown =
      documentItem.markdown ||
      documentItem.text ||
      "";

    const lines = markdown.split("\n");

    for (
      let headingIndex = 0;
      headingIndex < lines.length;
      headingIndex++
    ) {
      const line =
        lines[headingIndex].trim();

      /*
       * Only headings written as questions are treated as FAQs.
       */
      if (
        !/^#{2,3}\s+/.test(line) ||
        !line.includes("?")
      ) {
        continue;
      }

      const heading = line
        .replace(/^#{2,3}\s+/, "")
        .trim();

      const normalizedHeading =
        normalizeFAQQuestion(heading);

      const headingTokens =
        getFAQTokens(heading);

      let matchScore = 0;

      /*
       * Verbatim match.
       */
      if (
        normalizedHeading ===
        normalizedQuestion
      ) {
        matchScore = 1;
      } else if (
        headingTokens.length > 0
      ) {
        const matchedTokens =
          headingTokens.filter(token => {
            return questionTokens.has(token);
          });

        const headingCoverage =
          matchedTokens.length /
          headingTokens.length;

        /*
         * All meaningful words from the FAQ heading must appear
         * in the visitor's question.
         *
         * FAQ:
         * "How does Jamie lead teams?"
         *
         * Matches:
         * "How does Jamie lead a team of educators?"
         * "How does Jamie lead software engineering teams?"
         */
        if (headingCoverage === 1) {
          const extraTokenCount =
            Math.max(
              questionTokens.size -
              headingTokens.length,
              0
            );

          matchScore =
            Math.max(
              0.9 -
              extraTokenCount * 0.03,
              0
            );
        }
      }

      if (matchScore === 0) {
        continue;
      }

      const answerLines = [];

      for (
        let answerIndex =
          headingIndex + 1;
        answerIndex < lines.length;
        answerIndex++
      ) {
        const nextLine =
          lines[answerIndex];

        /*
         * Stop at the next Markdown heading.
         */
        if (
          /^#{1,6}\s+/.test(
            nextLine.trim()
          )
        ) {
          break;
        }

        answerLines.push(nextLine);
      }

      const answer = answerLines
        .join("\n")
        .trim();

      if (!answer) {
        continue;
      }

      if (
        !bestMatch ||
        matchScore > bestMatch.score
      ) {
        bestMatch = {
          score: matchScore,
          source: documentItem,
          question: heading,
          answer
        };
      }
    }
  }

  return bestMatch &&
    bestMatch.score >= 0.75
      ? bestMatch
      : null;
}
async function ask(question) {
  const query = String(question || "").trim();

  if (!query || send.disabled) {
    return;
  }

  addMessage("user", query);

  input.value = "";
  input.style.height = "44px";
  send.disabled = true;

  try {
    const faqMatch =
      findBestFAQ(query);

    if (faqMatch) {
      const answer =
        faqMatch.answer;

      addMessage(
        "bot",
        answer
      );

      conversation.push({
        role: "user",
        content: query
      });

      conversation.push({
        role: "assistant",
        content: answer
      });

      updateMemory(
        query,
        "fact",
        [faqMatch.source]
      );

      renderFollowUps(
        generateFollowUps(
          [faqMatch.source],
          "fact"
        )
      );

      status.innerHTML =
        "<strong>FAQ mode:</strong> answer returned from Jamie’s portfolio knowledge.";

      return;
    }

    const expandedQuery =
      expandFollowUpQuery(query);

    const intent =
      detectIntent(expandedQuery);

    const contextItems =
  intent === "overview"
    ? retrieveProfileOverview()
    : retrieve(expandedQuery);

    let answer = "";

    if (contextItems.length === 0) {
      answer =
        createUnknownAnswer();
    } else if (intent === "personal") {
      const personalFact =
        extractPersonalFact(
          expandedQuery,
          contextItems
        );

      answer = personalFact
        ? personalFact.answer
        : "I could not find that personal preference in Jamie’s portfolio knowledge.";
    } else {
      const evidence =
        gatherEvidence(
          expandedQuery,
          contextItems
        );

      answer =
        composeConversationalAnswer(
          query,
          intent,
          evidence,
          contextItems
        );
    }

    addMessage(
      "bot",
      answer
    );

    conversation.push({
      role: "user",
      content: query
    });

    conversation.push({
      role: "assistant",
      content: answer
    });

    const maximumMessages =
      CONFIG.maxConversationTurns * 2;

    if (
      conversation.length >
      maximumMessages
    ) {
      conversation.splice(
        0,
        conversation.length -
        maximumMessages
      );
    }

    updateMemory(
      expandedQuery,
      intent,
      contextItems
    );

    renderFollowUps(
      generateFollowUps(
        contextItems,
        intent
      )
    );

    status.innerHTML =
      "<strong>Conversational mode:</strong> answers are grounded in Jamie’s portfolio content.";
  } catch (error) {
    console.error(
      "The portfolio question could not be answered:",
      error
    );

    addMessage(
      "bot",
      "I could not find a reliable answer to that question in Jamie’s portfolio knowledge."
    );
  } finally {
    send.disabled =
      portfolioKnowledge.length === 0;

    input.focus();
  }
}
  /*
   * Open or close the chatbot with the floating launcher.
   */
  launcher.addEventListener(
    "click",
    event => {
      event.preventDefault();
      event.stopPropagation();

      setPanelOpen(
        !panel.classList.contains(
          "open"
        )
      );
    }
  );

  /*
   * Close button inside the chatbot panel.
   */
 closeButton.addEventListener(
  "click",
  event => {
    event.preventDefault();
    event.stopPropagation();

    setPanelOpen(false);
    launcher.focus();
  }
);

  /*
   * Send-button behavior.
   */
  send.addEventListener(
    "click",
    () => {
      ask(input.value);
    }
  );

  /*
   * Press Enter to send.
   *
   * Shift + Enter still creates a new line.
   */
  input.addEventListener(
    "keydown",
    event => {
      if (
        event.key === "Enter" &&
        !event.shiftKey
      ) {
        event.preventDefault();

        ask(input.value);
      }
    }
  );

  /*
   * Resize the text box as the visitor types.
   */
  input.addEventListener(
    "input",
    () => {
      input.style.height =
        "44px";

      input.style.height =
        `${Math.min(
          input.scrollHeight,
          110
        )}px`;
    }
  );

  /*
   * Close the panel with the Escape key.
   */
  document.addEventListener(
    "keydown",
    event => {
      if (
        event.key === "Escape" &&
        panel.classList.contains(
          "open"
        )
      ) {
        setPanelOpen(false);
        launcher.focus();
      }
    }
  );

  /*
   * Initial greeting.
   */
  setPanelOpen(false);
  addMessage(
    "bot",
    "Hi! I’m Jamie’s portfolio guide. Ask me about her curriculum work, teaching, software projects, AI experience, UX approach, or leadership background."
  );

  /*
   * Initial suggested questions.
   */
  renderFollowUps(
    defaultFollowUps
  );

  /*
   * Load the Markdown knowledge files.
   */
  loadPortfolioKnowledge();
})();