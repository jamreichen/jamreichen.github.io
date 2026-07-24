import { ELEMENT_IDS } from "./config.js";

export class ChatUI {
  constructor() {
    this.elements = Object.fromEntries(Object.entries(ELEMENT_IDS).map(([key, id]) => [key, document.getElementById(id)]));
    const missing = Object.entries(this.elements).filter(([, element]) => !element).map(([key]) => key);
    if (missing.length) throw new Error(`Missing chatbot elements: ${missing.join(", ")}`);
    this.#configureAccessibility();
  }

  #configureAccessibility() {
    const { panel, launcher, messages, status } = this.elements;
    messages.setAttribute("role", "log");
    messages.setAttribute("aria-live", "polite");
    messages.setAttribute("aria-relevant", "additions");
    status.setAttribute("role", "status");
    status.setAttribute("aria-live", "polite");
    panel.setAttribute("role", "dialog");
    panel.setAttribute("aria-modal", "false");
    panel.setAttribute("aria-label", "Jamie Reichenberger portfolio assistant");
    launcher.setAttribute("aria-controls", panel.id);
  }

  setOpen(open) {
    const { panel, launcher, input } = this.elements;
    panel.classList.toggle("open", open);
    panel.hidden = !open;
    panel.setAttribute("aria-hidden", String(!open));
    launcher.setAttribute("aria-expanded", String(open));
    if (open) window.setTimeout(() => input.focus(), 0);
  }

  setStatus(label, detail = "") {
    const { status } = this.elements;
    status.replaceChildren();
    const strong = document.createElement("strong");
    strong.textContent = label;
    status.append(strong, document.createTextNode(detail ? ` ${detail}` : ""));
  }

  setLoading(loading, ready = true) {
    const { sendButton, input, panel } = this.elements;
    sendButton.disabled = loading || !ready;
    input.disabled = loading || !ready;
    panel.setAttribute("aria-busy", String(loading));
  }

  addMessage(role, text, sources = []) {
    const message = document.createElement("div");
    message.className = `ai-message ${role}`;
    const content = document.createElement("div");
    content.className = "ai-message-content";
    content.textContent = text;
    message.appendChild(content);

    if (role === "bot" && sources.length) {
      const sourceBlock = document.createElement("div");
      sourceBlock.className = "ai-message-sources";
      const label = document.createElement("span");
      label.className = "ai-message-sources-label";
      label.textContent = "Portfolio sources:";
      const list = document.createElement("ul");
      const unique = [...new Map(sources.map(source => [source.id, source])).values()];
      unique.slice(0, 3).forEach(source => {
        const item = document.createElement("li");
        const link = document.createElement("a");
        link.href = source.url || "#about";
        link.textContent = source.title || "Portfolio source";
        if (!link.href.startsWith(`${location.origin}${location.pathname}#`) && !String(source.url).startsWith("#")) {
          link.target = "_blank";
          link.rel = "noopener noreferrer";
        }
        item.appendChild(link);
        list.appendChild(item);
      });
      sourceBlock.append(label, list);
      message.appendChild(sourceBlock);
    }

    this.elements.messages.appendChild(message);
    requestAnimationFrame(() => { this.elements.messages.scrollTop = this.elements.messages.scrollHeight; });
    return message;
  }

  addTyping() {
    const message = document.createElement("div");
    message.className = "ai-message bot ai-typing";
    message.setAttribute("aria-label", "Reviewing Jamie’s portfolio");
    const dots = document.createElement("span");
    dots.className = "ai-typing-dots";
    dots.innerHTML = "<i></i><i></i><i></i>";
    message.appendChild(dots);
    this.elements.messages.appendChild(message);
    this.elements.messages.scrollTop = this.elements.messages.scrollHeight;
    return message;
  }

  renderFollowUps(questions, onSelect) {
    const { chips } = this.elements;
    chips.replaceChildren();
    questions.slice(0, 3).forEach(question => {
      const button = document.createElement("button");
      button.type = "button";
      button.className = "ai-chip";
      button.textContent = question;
      button.addEventListener("click", () => onSelect(question));
      chips.appendChild(button);
    });
  }
}
