import { CONFIG, DEFAULT_FOLLOW_UPS } from "./config.js";
import { composeAnswer, personalFact } from "./composer.js";
import { generateFollowUps } from "./followups.js";
import { detectIntent } from "./intents.js";
import { loadKnowledge } from "./knowledge.js";
import { Retriever } from "./retrieval.js";
import { ChatUI } from "./ui.js";
import { delay, normalizeText, normalizeWhitespace, tokenize } from "./utils.js";

class PortfolioChatbot {
  constructor() {
    this.ui = new ChatUI();
    this.state = { ready: false, loading: false, conversation: [], lastContext: [], lastTopic: "" };
    this.retriever = null;
  }

  async initialize() {
    this.#bindEvents();
    this.ui.setOpen(false);
    this.ui.addMessage("bot", `Hi, I’m ${CONFIG.ownerName}’s portfolio assistant. Ask about her curriculum strategy, AI-enabled workflows, teaching, software engineering, program leadership, or documented project outcomes.`);
    this.ui.renderFollowUps(DEFAULT_FOLLOW_UPS, question => this.ask(question));
    this.ui.setLoading(true, false);
    this.ui.setStatus("Loading:", "Jamie’s portfolio knowledge...");

    try {
      const result = await loadKnowledge();
      this.retriever = new Retriever(result.documents);
      this.state.ready = true;
      this.ui.setStatus("Ready:", result.fallback ? "Using portfolio content visible on this page." : `${result.documents.length} portfolio source${result.documents.length === 1 ? "" : "s"} available.`);
      if (CONFIG.debug && result.failures.length) console.warn(result.failures);
    } catch (error) {
      console.error(error);
      this.ui.setStatus("Unavailable:", "Portfolio knowledge could not be loaded.");
    } finally {
      this.ui.setLoading(false, this.state.ready);
    }
  }

  #bindEvents() {
    const { launcher, closeButton, sendButton, input, panel } = this.ui.elements;
    launcher.addEventListener("click", event => { event.preventDefault(); this.ui.setOpen(!panel.classList.contains("open")); });
    closeButton.addEventListener("click", () => { this.ui.setOpen(false); launcher.focus(); });
    sendButton.addEventListener("click", () => this.ask(input.value));
    input.addEventListener("keydown", event => {
      if (event.key === "Enter" && !event.shiftKey) { event.preventDefault(); this.ask(input.value); }
    });
    input.addEventListener("input", () => {
      input.style.height = "44px";
      input.style.height = `${Math.min(input.scrollHeight, 110)}px`;
    });
    document.addEventListener("keydown", event => {
      if (event.key === "Escape" && panel.classList.contains("open")) { this.ui.setOpen(false); launcher.focus(); }
    });
  }

  #isFollowUp(query) {
    const normalized = normalizeText(query);
    if (tokenize(query).length <= 4 && this.state.lastContext.length) return true;
    return ["that", "this", "there", "tell me more", "go deeper", "what happened next", "how so", "what tools", "what was the outcome"].some(phrase => normalized.includes(phrase));
  }

  #buildSearchQuery(query) {
    if (!this.#isFollowUp(query) || !this.state.lastTopic) return query;
    const recent = this.state.conversation.filter(turn => turn.role === "user").slice(-2).map(turn => turn.content).join(" ");
    return `${query} ${this.state.lastTopic} ${recent}`;
  }

  #remember(role, content) {
    this.state.conversation.push({ role, content });
    const maximum = CONFIG.maxConversationTurns * 2;
    if (this.state.conversation.length > maximum) this.state.conversation.splice(0, this.state.conversation.length - maximum);
  }

  async ask(rawQuestion) {
    const query = normalizeWhitespace(rawQuestion);
    if (!query || this.state.loading || !this.state.ready) return;

    const { input } = this.ui.elements;
    this.ui.addMessage("user", query);
    this.#remember("user", query);
    input.value = "";
    input.style.height = "44px";
    this.state.loading = true;
    this.ui.setLoading(true, true);
    this.ui.setStatus("Searching:", "Reviewing Jamie’s portfolio...");
    const typing = this.ui.addTyping();

    try {
      await delay(CONFIG.answerDelayMs);
      const faq = this.retriever.findFaq(query);
      if (faq) {
        typing.remove();
        this.ui.addMessage("bot", faq.answer, [faq.source]);
        this.#remember("assistant", faq.answer);
        this.#updateContext(query, [faq.source]);
        this.ui.renderFollowUps(generateFollowUps([faq.source], "fact"), question => this.ask(question));
        return;
      }

      const searchQuery = this.#buildSearchQuery(query);
      const intent = detectIntent(query);
      const context = this.retriever.search(searchQuery, this.state.lastContext);
      let result;

      if (!context.length) {
        result = composeAnswer(query, intent, [], []);
      } else if (intent === "personal") {
        result = personalFact(searchQuery, context) || composeAnswer(query, intent, [], context);
      } else {
        result = composeAnswer(query, intent, this.retriever.evidence(searchQuery, context), context);
      }

      typing.remove();
      this.ui.addMessage("bot", result.text);
      this.#remember("assistant", result.text);
      this.#updateContext(query, context);
      this.ui.renderFollowUps(generateFollowUps(context, intent), question => this.ask(question));
    } catch (error) {
      typing.remove();
      console.error(error);
      const message = "I could not complete that portfolio search. Please try a more specific question.";
      this.ui.addMessage("bot", message);
      this.#remember("assistant", message);
    } finally {
      this.state.loading = false;
      this.ui.setLoading(false, true);
      this.ui.setStatus("Ready:", "Answer based on Jamie’s portfolio.");
      input.focus();
    }
  }

  #updateContext(query, context) {
    this.state.lastContext = context.slice(0, 3);
    this.state.lastTopic = context[0]?.title || query;
  }
}

new PortfolioChatbot().initialize();

function initializeChipNavigation() {
  const chipContainer = document.getElementById("aiChips");
  const previousButton = document.getElementById("aiChipsPrevious");
  const nextButton = document.getElementById("aiChipsNext");

  if (!chipContainer || !previousButton || !nextButton) {
    return;
  }

  const getScrollAmount = () => {
    const firstChip = chipContainer.querySelector(".ai-chip");

    if (!firstChip) {
      return Math.max(chipContainer.clientWidth * 0.8, 180);
    }

    const styles = window.getComputedStyle(chipContainer);
    const gap = Number.parseFloat(styles.columnGap || styles.gap) || 10;

    return firstChip.getBoundingClientRect().width + gap;
  };

  const updateArrowState = () => {
    const maximumScroll =
      chipContainer.scrollWidth - chipContainer.clientWidth;

    const tolerance = 3;

    previousButton.disabled =
      chipContainer.scrollLeft <= tolerance;

    nextButton.disabled =
      chipContainer.scrollLeft >= maximumScroll - tolerance ||
      maximumScroll <= tolerance;
  };

  previousButton.addEventListener("click", () => {
    chipContainer.scrollBy({
      left: -getScrollAmount(),
      behavior: "smooth"
    });
  });

  nextButton.addEventListener("click", () => {
    chipContainer.scrollBy({
      left: getScrollAmount(),
      behavior: "smooth"
    });
  });

  chipContainer.addEventListener("scroll", updateArrowState, {
    passive: true
  });

  chipContainer.addEventListener("keydown", (event) => {
    if (event.key === "ArrowLeft") {
      event.preventDefault();

      chipContainer.scrollBy({
        left: -getScrollAmount(),
        behavior: "smooth"
      });
    }

    if (event.key === "ArrowRight") {
      event.preventDefault();

      chipContainer.scrollBy({
        left: getScrollAmount(),
        behavior: "smooth"
      });
    }
  });

  const resizeObserver = new ResizeObserver(updateArrowState);
  resizeObserver.observe(chipContainer);

  const mutationObserver = new MutationObserver(() => {
    requestAnimationFrame(updateArrowState);
  });

  mutationObserver.observe(chipContainer, {
    childList: true
  });

  updateArrowState();
}

initializeChipNavigation();