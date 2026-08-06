/*
  Spoof Detective: A Phishing Simulation
  Framework-free game engine for high-school cybersecurity learning.
  No build step or runtime JavaScript libraries are required. The landing page typography is loaded by CSS from Google Fonts.
*/
(function () {
  "use strict";

  const DATA = window.SPOOF_DETECTIVE_DATA;
  const ROOT_ID = "spoof-detective-embed";
  const STORAGE_KEY = "spoof_detective_state";
  const ACTIVE_SESSION_KEY = "spoof_detective_simple_evidence_bonus_active_session";
  const MAX_HISTORY = 500;
  const PASS_SCORE = 70;
  const SIMPLE_DECISION_POINTS = 100;
  const SIMPLE_EVIDENCE_BONUS = 25;

  if (!DATA || !Array.isArray(DATA.scenarios)) {
    const missingRoot = document.getElementById(ROOT_ID);
    if (missingRoot) {
      missingRoot.innerHTML = '<div style="padding:24px;color:#fff;background:#07111f">Spoof Detective data could not be loaded.</div>';
    }
    return;
  }

  const ICONS = {
    shield: '<path d="M20 13c0 5-3.5 7.5-8 9-4.5-1.5-8-4-8-9V5l8-3 8 3v8Z"></path><path d="m9 12 2 2 4-4"></path>',
    alert: '<path d="M20 13c0 5-3.5 7.5-8 9-4.5-1.5-8-4-8-9V5l8-3 8 3v8Z"></path><path d="M12 8v4"></path><path d="M12 16h.01"></path>',
    home: '<path d="m3 11 9-8 9 8"></path><path d="M5 10v10h14V10"></path><path d="M9 20v-6h6v6"></path>',
    missions: '<circle cx="12" cy="12" r="9"></circle><circle cx="12" cy="12" r="4"></circle><path d="M12 3v3"></path><path d="M21 12h-3"></path><path d="M12 21v-3"></path><path d="M3 12h3"></path>',
    chart: '<path d="M3 3v18h18"></path><path d="M8 17v-4"></path><path d="M13 17V8"></path><path d="M18 17V5"></path>',
    list: '<path d="M8 6h13"></path><path d="M8 12h13"></path><path d="M8 18h13"></path><path d="M3 6h.01"></path><path d="M3 12h.01"></path><path d="M3 18h.01"></path>',
    zap: '<path d="m13 2-10 12h9l-1 8 10-12h-9z"></path>',
    terminal: '<path d="m7 11 2-2-2-2"></path><path d="M11 13h4"></path><rect width="18" height="18" x="3" y="3" rx="2" ry="2"></rect>',
    crosshair: '<circle cx="12" cy="12" r="10"></circle><path d="M22 12h-4"></path><path d="M6 12H2"></path><path d="M12 6V2"></path><path d="M12 22v-4"></path>',
    teacher: '<path d="M3 4h18v13H3z"></path><path d="M8 21h8"></path><path d="M12 17v4"></path><path d="m7 9 3 2 4-4"></path>',
    settings: '<circle cx="12" cy="12" r="3"></circle><path d="M19.4 15a1.7 1.7 0 0 0 .34 1.88l.06.06-2.12 2.12-.06-.06a1.7 1.7 0 0 0-1.88-.34 1.7 1.7 0 0 0-1 1.55V20.3h-3v-.09a1.7 1.7 0 0 0-1-1.55 1.7 1.7 0 0 0-1.88.34l-.06.06-2.12-2.12.06-.06A1.7 1.7 0 0 0 7.06 15a1.7 1.7 0 0 0-1.55-1H5.4v-3h.11a1.7 1.7 0 0 0 1.55-1 1.7 1.7 0 0 0-.34-1.88l-.06-.06 2.12-2.12.06.06a1.7 1.7 0 0 0 1.88.34 1.7 1.7 0 0 0 1-1.55V4.7h3v.09a1.7 1.7 0 0 0 1 1.55 1.7 1.7 0 0 0 1.88-.34l.06-.06 2.12 2.12-.06.06a1.7 1.7 0 0 0-.34 1.88 1.7 1.7 0 0 0 1.55 1h.11v3h-.11a1.7 1.7 0 0 0-1.55 1Z"></path>',
    play: '<path d="m8 5 11 7-11 7z"></path>',
    pause: '<path d="M8 5v14"></path><path d="M16 5v14"></path>',
    arrow: '<path d="M5 12h14"></path><path d="m13 6 6 6-6 6"></path>',
    back: '<path d="M19 12H5"></path><path d="m11 18-6-6 6-6"></path>',
    check: '<path d="m5 12 4 4L19 6"></path>',
    close: '<path d="m6 6 12 12"></path><path d="m18 6-12 12"></path>',
    lock: '<rect x="4" y="10" width="16" height="11" rx="2"></rect><path d="M8 10V7a4 4 0 0 1 8 0v3"></path>',
    unlock: '<rect x="4" y="10" width="16" height="11" rx="2"></rect><path d="M8 10V7a4 4 0 0 1 7.5-2"></path>',
    search: '<circle cx="11" cy="11" r="7"></circle><path d="m20 20-4-4"></path>',
    link: '<path d="M10 13a5 5 0 0 0 7.1.1l2-2a5 5 0 0 0-7.1-7.1l-1.1 1.1"></path><path d="M14 11a5 5 0 0 0-7.1-.1l-2 2A5 5 0 0 0 12 20l1.1-1.1"></path>',
    identity: '<circle cx="12" cy="8" r="4"></circle><path d="M4 21a8 8 0 0 1 16 0"></path>',
    message: '<path d="M21 15a4 4 0 0 1-4 4H8l-5 3V7a4 4 0 0 1 4-4h10a4 4 0 0 1 4 4z"></path>',
    history: '<circle cx="12" cy="12" r="9"></circle><path d="M12 7v5l3 2"></path><path d="M3 12H1"></path>',
    policy: '<path d="M6 3h9l3 3v15H6z"></path><path d="M14 3v4h4"></path><path d="M9 12h6"></path><path d="M9 16h6"></path>',
    phone: '<path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1.9.3 1.8.6 2.6a2 2 0 0 1-.4 2.1L8 9.7a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.7.5 2.6.6a2 2 0 0 1 2 2.3Z"></path>',
    qr: '<rect x="3" y="3" width="6" height="6"></rect><rect x="15" y="3" width="6" height="6"></rect><rect x="3" y="15" width="6" height="6"></rect><path d="M15 15h2v2h-2z"></path><path d="M19 15h2v6h-2"></path><path d="M15 19h2v2h-2"></path>',
    key: '<circle cx="7.5" cy="15.5" r="4.5"></circle><path d="m10.7 12.3 8.3-8.3"></path><path d="m15 8 2 2"></path><path d="m17 6 2 2"></path>',
    scale: '<path d="m16 16 3-8 3 8a5 5 0 0 1-6 0Z"></path><path d="m2 16 3-8 3 8a5 5 0 0 1-6 0Z"></path><path d="M7 21h10"></path><path d="M12 3v18"></path><path d="M3 7h18"></path>',
    file: '<path d="M6 2h8l4 4v16H6z"></path><path d="M14 2v5h5"></path>',
    activity: '<path d="M3 12h4l2-7 4 14 2-7h6"></path>',
    device: '<rect x="5" y="2" width="14" height="20" rx="2"></rect><path d="M9 18h6"></path>',
    map: '<path d="m3 6 6-3 6 3 6-3v15l-6 3-6-3-6 3z"></path><path d="M9 3v15"></path><path d="M15 6v15"></path>',
    mail: '<rect x="2" y="4" width="20" height="16" rx="2"></rect><path d="m22 7-9 6a2 2 0 0 1-2 0L2 7"></path>',
    send: '<path d="m22 2-7 20-4-9-9-4z"></path><path d="M22 2 11 13"></path>',
    trash: '<path d="M3 6h18"></path><path d="M8 6V4h8v2"></path><path d="m19 6-1 15H6L5 6"></path>',
    network: '<rect x="9" y="2" width="6" height="6" rx="1"></rect><rect x="2" y="16" width="6" height="6" rx="1"></rect><rect x="16" y="16" width="6" height="6" rx="1"></rect><path d="M12 8v4"></path><path d="M5 16v-4h14v4"></path>',
    document: '<path d="M6 2h8l4 4v16H6z"></path><path d="M14 2v5h5"></path><path d="M9 13h6"></path><path d="M9 17h6"></path>',
    wifi: '<path d="M5 12.5a10 10 0 0 1 14 0"></path><path d="M8.5 16a5 5 0 0 1 7 0"></path><path d="M12 20h.01"></path>',
    card: '<rect x="2" y="5" width="20" height="14" rx="2"></rect><path d="M2 10h20"></path>',
    wave: '<path d="M3 12h2l2-7 4 14 4-14 2 7h4"></path>',
    info: '<circle cx="12" cy="12" r="10"></circle><path d="M12 11v5"></path><path d="M12 8h.01"></path>',
    help: '<circle cx="12" cy="12" r="10"></circle><path d="M9.1 9a3 3 0 1 1 5.8 1c0 2-3 2-3 4"></path><path d="M12 18h.01"></path>',
    volume: '<path d="M11 5 6 9H2v6h4l5 4z"></path><path d="M15.5 8.5a5 5 0 0 1 0 7"></path><path d="M18.5 5.5a9 9 0 0 1 0 13"></path>',
    download: '<path d="M12 3v12"></path><path d="m7 10 5 5 5-5"></path><path d="M5 21h14"></path>',
    upload: '<path d="M12 21V9"></path><path d="m7 14 5-5 5 5"></path><path d="M5 3h14"></path>',
    rotate: '<path d="M21 12a9 9 0 0 1-15 6.7L3 16"></path><path d="M3 21v-5h5"></path><path d="M3 12A9 9 0 0 1 18 5.3L21 8"></path><path d="M21 3v5h-5"></path>',
    trophy: '<path d="M8 21h8"></path><path d="M12 17v4"></path><path d="M7 4h10v5a5 5 0 0 1-10 0z"></path><path d="M7 6H4a2 2 0 0 0 2 4h1"></path><path d="M17 6h3a2 2 0 0 1-2 4h-1"></path>',
    export: '<path d="M12 3v12"></path><path d="m7 10 5 5 5-5"></path><path d="M5 21h14"></path>',
    plus: '<path d="M12 5v14"></path><path d="M5 12h14"></path>',
    eye: '<path d="M2 12s4-7 10-7 10 7 10 7-4 7-10 7S2 12 2 12Z"></path><circle cx="12" cy="12" r="3"></circle>',
    book: '<path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20V4H6.5A2.5 2.5 0 0 0 4 6.5z"></path><path d="M4 6.5v13"></path>',
    archive: '<rect x="3" y="4" width="18" height="5" rx="1"></rect><path d="M5 9v11h14V9"></path><path d="M10 13h4"></path>',
    star: '<path d="m12 2 3.1 6.3L22 9.3l-5 4.9 1.2 6.8L12 17.8 5.8 21 7 14.2 2 9.3l6.9-1z"></path>',
    reply: '<path d="m9 17-5-5 5-5"></path><path d="M4 12h10a6 6 0 0 1 6 6v1"></path>',
    more: '<circle cx="5" cy="12" r="1"></circle><circle cx="12" cy="12" r="1"></circle><circle cx="19" cy="12" r="1"></circle>',
    inbox: '<path d="M4 4h16l2 9v7H2v-7z"></path><path d="M2 13h5l2 3h6l2-3h5"></path>',
    folder: '<path d="M3 5h6l2 2h10v12H3z"></path>',
    target: '<circle cx="12" cy="12" r="8"></circle><circle cx="12" cy="12" r="3"></circle><path d="M12 2v3"></path><path d="M22 12h-3"></path><path d="M12 22v-3"></path><path d="M2 12h3"></path>',
    chevronDown: '<path d="m6 9 6 6 6-6"></path>',
    refresh: '<path d="M20 11a8 8 0 1 0 2 5"></path><path d="M20 4v7h-7"></path>'
  };

  function icon(name, className) {
    const path = ICONS[name] || ICONS.info;
    return '<svg aria-hidden="true" class="' + escapeAttr(className || "") + '" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">' + path + '</svg>';
  }

  function clone(value) {
    return JSON.parse(JSON.stringify(value));
  }

  function escapeHtml(value) {
    return String(value == null ? "" : value)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  }

  function escapeAttr(value) {
    return escapeHtml(value).replace(/`/g, "&#096;");
  }

  function clamp(value, min, max) {
    return Math.max(min, Math.min(max, value));
  }

  function unique(items) {
    return Array.from(new Set(items));
  }

  function average(values) {
    const valid = values.filter(function (value) { return Number.isFinite(value); });
    return valid.length ? valid.reduce(function (sum, value) { return sum + value; }, 0) / valid.length : 0;
  }

  function formatDate(value) {
    const date = value ? new Date(value) : new Date();
    if (Number.isNaN(date.getTime())) return "Unknown";
    return new Intl.DateTimeFormat(undefined, {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "numeric",
      minute: "2-digit"
    }).format(date);
  }

  function hashString(value) {
    let hash = 2166136261;
    const text = String(value || "spoof-detective");
    for (let i = 0; i < text.length; i += 1) {
      hash ^= text.charCodeAt(i);
      hash = Math.imul(hash, 16777619);
    }
    return hash >>> 0;
  }

  function seededRandom(seed) {
    let state = hashString(seed);
    return function () {
      state += 0x6D2B79F5;
      let t = state;
      t = Math.imul(t ^ (t >>> 15), t | 1);
      t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
  }

  function seededShuffle(items, seed) {
    const copy = items.slice();
    const random = seededRandom(seed);
    for (let i = copy.length - 1; i > 0; i -= 1) {
      const j = Math.floor(random() * (i + 1));
      const temp = copy[i];
      copy[i] = copy[j];
      copy[j] = temp;
    }
    return copy;
  }

  function csvCell(value) {
    const text = String(value == null ? "" : value).replace(/"/g, '""');
    return '"' + text + '"';
  }

  function slugify(value) {
    return String(value || "scenario")
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "")
      .slice(0, 60) || "scenario";
  }

  function safeJsonParse(value, fallback) {
    try {
      return JSON.parse(value);
    } catch (error) {
      return fallback;
    }
  }

  function cssSelectorEscape(value) {
    if (window.CSS && typeof window.CSS.escape === "function") return window.CSS.escape(String(value));
    return String(value).replace(/[^a-zA-Z0-9_-]/g, function (character) {
      return "\\" + character;
    });
  }

  function dispatch(name, detail) {
    try {
      window.dispatchEvent(new CustomEvent(name, { detail: clone(detail) }));
    } catch (error) {
      /* Older embedded environments may not support CustomEvent construction. */
    }
  }

  function blankCompetencyStats() {
    const output = {};
    Object.keys(DATA.competencies).forEach(function (id) {
      output[id] = { attempts: 0, totalScore: 0, lastScore: 0 };
    });
    return output;
  }

  const DEFAULT_SETTINGS = {
    textScale: "medium",
    highContrast: false,
    reducedMotion: false,
    plainLanguage: false,
    narration: false
  };

  const DEFAULT_STATE = {
    version: DATA.version,
    missionMastery: {},
    completedMissions: [],
    badges: [],
    competencyStats: blankCompetencyStats(),
    history: [],
    diagnostic: null,
    posttest: null,
    settings: clone(DEFAULT_SETTINGS),
    customScenarios: [],
    counters: {
      strongEvidenceCases: 0,
      correctVerifications: 0,
      correctRationales: 0,
      strongResponses: 0,
      defenseCases: 0
    }
  };

  function normalizeCompetencyStats(candidate) {
    const base = blankCompetencyStats();
    const source = candidate && typeof candidate === "object" ? candidate : {};
    Object.keys(base).forEach(function (id) {
      const item = source[id] && typeof source[id] === "object" ? source[id] : {};
      base[id] = {
        attempts: Number.isFinite(item.attempts) ? Math.max(0, item.attempts) : 0,
        totalScore: Number.isFinite(item.totalScore) ? Math.max(0, item.totalScore) : 0,
        lastScore: Number.isFinite(item.lastScore) ? clamp(item.lastScore, 0, 100) : 0
      };
    });
    return base;
  }

  function normalizeSettings(candidate) {
    const value = candidate && typeof candidate === "object" ? candidate : {};
    return {
      textScale: ["small", "medium", "large"].includes(value.textScale) ? value.textScale : "medium",
      highContrast: Boolean(value.highContrast),
      reducedMotion: Boolean(value.reducedMotion),
      plainLanguage: Boolean(value.plainLanguage),
      narration: Boolean(value.narration)
    };
  }

  function normalizeState(candidate) {
    const value = candidate && typeof candidate === "object" ? candidate : {};
    const missionMastery = {};
    DATA.missions.forEach(function (mission) {
      const score = value.missionMastery && Number(value.missionMastery[mission.id]);
      if (Number.isFinite(score)) missionMastery[mission.id] = clamp(Math.round(score), 0, 100);
    });

    const counters = value.counters && typeof value.counters === "object" ? value.counters : {};

    return {
      version: DATA.version,
      missionMastery: missionMastery,
      completedMissions: Array.isArray(value.completedMissions)
        ? unique(value.completedMissions.filter(function (id) { return DATA.missions.some(function (mission) { return mission.id === id; }); }))
        : [],
      badges: Array.isArray(value.badges)
        ? unique(value.badges.filter(function (id) { return DATA.badges.some(function (badge) { return badge.id === id; }); }))
        : [],
      competencyStats: normalizeCompetencyStats(value.competencyStats),
      history: Array.isArray(value.history) ? value.history.slice(-MAX_HISTORY) : [],
      diagnostic: value.diagnostic && typeof value.diagnostic === "object" ? value.diagnostic : null,
      posttest: value.posttest && typeof value.posttest === "object" ? value.posttest : null,
      settings: normalizeSettings(value.settings),
      customScenarios: Array.isArray(value.customScenarios) ? value.customScenarios.filter(function (item) { return item && typeof item === "object" && item.id; }).slice(0, 100) : [],
      counters: {
        strongEvidenceCases: Number.isFinite(counters.strongEvidenceCases) ? Math.max(0, counters.strongEvidenceCases) : 0,
        correctVerifications: Number.isFinite(counters.correctVerifications) ? Math.max(0, counters.correctVerifications) : 0,
        correctRationales: Number.isFinite(counters.correctRationales) ? Math.max(0, counters.correctRationales) : 0,
        strongResponses: Number.isFinite(counters.strongResponses) ? Math.max(0, counters.strongResponses) : 0,
        defenseCases: Number.isFinite(counters.defenseCases) ? Math.max(0, counters.defenseCases) : 0
      }
    };
  }

  let fallbackState = clone(DEFAULT_STATE);

  function loadState() {
    try {
      const stored = window.localStorage.getItem(STORAGE_KEY);
      if (!stored) return normalizeState(DEFAULT_STATE);
      return normalizeState(JSON.parse(stored));
    } catch (error) {
      return normalizeState(fallbackState);
    }
  }

  function saveState(state) {
    const normalized = normalizeState(state);
    fallbackState = clone(normalized);
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(normalized));
    } catch (error) {
      /* Keep in-memory fallback when storage is blocked. */
    }
    return normalized;
  }

  function loadActiveSession() {
    try {
      const value = window.localStorage.getItem(ACTIVE_SESSION_KEY);
      const parsed = value ? JSON.parse(value) : null;
      return parsed && parsed.id && Array.isArray(parsed.queue) ? parsed : null;
    } catch (error) {
      return null;
    }
  }

  function saveActiveSession(session) {
    try {
      if (session) window.localStorage.setItem(ACTIVE_SESSION_KEY, JSON.stringify(session));
      else window.localStorage.removeItem(ACTIVE_SESSION_KEY);
    } catch (error) {
      /* Session persistence is optional when storage is blocked. */
    }
  }

  function allScenarios(state) {
    return DATA.scenarios.concat((state && state.customScenarios) || []);
  }

  function getScenario(id, state) {
    return allScenarios(state || app.state).find(function (scenario) { return scenario.id === id; }) || null;
  }

  function getMission(id) {
    return DATA.missions.find(function (mission) { return mission.id === id; }) || null;
  }

  function getBadge(id) {
    return DATA.badges.find(function (badge) { return badge.id === id; }) || null;
  }

  function competencyScore(item) {
    return item && item.attempts ? Math.round(item.totalScore / item.attempts) : 0;
  }

  function masteryLabel(score, attempts) {
    if (!attempts) return "Not yet assessed";
    if (score >= 85) return "Mastered";
    if (score >= 70) return "Proficient";
    return "Developing";
  }

  function isMissionUnlocked(missionId, state) {
    const index = DATA.missions.findIndex(function (mission) { return mission.id === missionId; });
    if (index <= 0) return true;
    const previous = DATA.missions[index - 1];
    return Number(state.missionMastery[previous.id] || 0) >= previous.passScore;
  }

  const root = document.getElementById(ROOT_ID);
  if (!root) return;

  const app = {
    root: root,
    state: loadState(),
    view: "home",
    session: null,
    lastSummary: null,
    toastTimer: null,
    homeTypingTimer: null,
    teacherDefaults: {
      mode: "learning",
      mission: "all",
      competency: "all",
      caseCount: 8,
      seed: "classroom-01",
      collectNotes: false,
      showStandards: true,
      includeCustom: true
    }
  };

  const savedActiveSession = loadActiveSession();

  function applySettings() {
    const settings = app.state.settings;
    root.classList.toggle("sd-text-small", settings.textScale === "small");
    root.classList.toggle("sd-text-large", settings.textScale === "large");
    root.classList.toggle("sd-high-contrast", settings.highContrast);
    root.classList.toggle("sd-reduced-motion", settings.reducedMotion);
    root.classList.toggle("sd-plain-language", settings.plainLanguage);
  }

  function notify(message, tone) {
    const region = root.querySelector(".sd-toast-region");
    if (!region) return;
    clearTimeout(app.toastTimer);
    const pillClass = tone === "success" ? " sd-pill-green" : tone === "warning" ? " sd-pill-yellow" : tone === "danger" ? " sd-pill-red" : " sd-pill-cyan";
    region.innerHTML = '<div class="sd-toast' + pillClass + '" role="status">' + escapeHtml(message) + '</div>';
    app.toastTimer = window.setTimeout(function () {
      if (region) region.innerHTML = "";
    }, 3600);
  }

  function navButton(view, label, iconName) {
    const current = app.view === view ? ' aria-current="page"' : "";
    return '<button type="button" class="sd-nav-button" data-action="navigate" data-view="' + escapeAttr(view) + '"' + current + '>' + icon(iconName) + '<span>' + escapeHtml(label) + '</span></button>';
  }

  function renderNav() {
    return '<nav class="sd-nav" aria-label="Spoof Detective navigation">' +
      '<button type="button" class="sd-brand" data-action="navigate" data-view="home" aria-label="Spoof Detective home">' +
        '<span class="sd-brand-mark">' + icon("shield") + '</span>' +
        '<span><span class="sd-brand-name">Spoof Detective</span><span class="sd-brand-edition">A Phishing Simulation</span></span>' +
      '</button>' +
      '<div class="sd-nav-actions">' +
        navButton("home", "Home", "home") +
        navButton("missions", "Missions", "missions") +
        navButton("stats", "Progress", "chart") +
        navButton("settings", "Access", "settings") +
      '</div>' +
    '</nav>';
  }


  function renderClassicNav() {
    return '<nav class="sd-classic-nav" aria-label="Spoof Detective navigation">' +
      '<button type="button" class="sd-classic-brand" data-action="navigate" data-view="home" aria-label="Spoof Detective: A Phishing Simulation home">' +
        icon("alert") +
        '<span class="sd-classic-brand-lockup">' +
          '<span class="sd-classic-brand-name">SPOOF <span>DETECTIVE</span></span>' +
          '<span class="sd-classic-brand-edition">A PHISHING SIMULATION</span>' +
        '</span>' +
      '</button>' +
      '<div class="sd-classic-nav-links">' +
        '<button type="button" class="sd-classic-nav-link" data-action="navigate" data-view="missions">' + icon("list") + '<span>MISSIONS</span></button>' +
        '<button type="button" class="sd-classic-nav-link" data-action="navigate" data-view="stats">' + icon("chart") + '<span>PROGRESS</span></button>' +
      '</div>' +
    '</nav>';
  }

  const CLASSIC_HOME_GREETINGS = [
    "Detective Byte here. Every message leaves clues.",
    "Welcome, detective. Start with the sender, destination, and context.",
    "Let's inspect the evidence before we make the call."
  ];

  function renderClassicAgent(greeting) {
    return '<div class="sd-classic-agent" aria-label="Detective Byte, your investigation guide">' +
      '<div class="sd-classic-agent-avatar">' +
        '<img src="assets/detective-byte.png" alt="Detective Byte holding a magnifying glass and case notebook">' +
        '<span class="sd-classic-agent-scan" aria-hidden="true"></span>' +
      '</div>' +
      '<div class="sd-classic-agent-bubble" aria-label="' + escapeAttr(greeting) + '">' +
        '<div class="sd-classic-agent-label">DETECTIVE BYTE</div>' +
        '<div class="sd-classic-agent-text"><span data-sd-home-greeting aria-hidden="true"></span><span class="sd-classic-agent-cursor" aria-hidden="true"></span></div>' +
      '</div>' +
    '</div>';
  }

  function renderClassicHowTo() {
    return '<div class="sd-classic-how" aria-label="How to play">' +
      '<article class="sd-classic-how-card">' +
        '<span class="sd-classic-how-bar" aria-hidden="true"></span>' +
        icon("mail") +
        '<h3>1. Read the Message</h3>' +
        '<p>Check the sender, destination, request, and context. Highlighted details are optional clues.</p>' +
      '</article>' +
      '<article class="sd-classic-how-card">' +
        '<span class="sd-classic-how-bar" aria-hidden="true"></span>' +
        icon("crosshair") +
        '<h3>2. Choose a Response</h3>' +
        '<p>Select the safest way to handle the message, then submit your decision.</p>' +
      '</article>' +
      '<article class="sd-classic-how-card">' +
        '<span class="sd-classic-how-bar" aria-hidden="true"></span>' +
        icon("book") +
        '<h3>3. Explain Why</h3>' +
        '<p>A correct decision unlocks one evidence question worth +25 points before the explanation.</p>' +
      '</article>' +
    '</div>';
  }

  function startClassicGreetingTyping(text) {
    const target = root.querySelector("[data-sd-home-greeting]");
    if (!target) return;
    if (app.state.settings.reducedMotion) {
      target.textContent = text;
      return;
    }
    target.textContent = "";
    let index = 0;
    app.homeTypingTimer = window.setInterval(function () {
      if (!target.isConnected) {
        window.clearInterval(app.homeTypingTimer);
        app.homeTypingTimer = null;
        return;
      }
      target.textContent = text.slice(0, index);
      index += 1;
      if (index > text.length) {
        window.clearInterval(app.homeTypingTimer);
        app.homeTypingTimer = null;
      }
    }, 20);
  }

  function renderAgent(message, compact) {
    if (compact) {
      return '<div class="sd-agent-brief">' +
        '<div class="sd-agent-mini" aria-hidden="true"><span></span></div>' +
        '<div><strong>Detective Byte</strong><p>' + escapeHtml(message) + '</p></div>' +
      '</div>';
    }
    return '<div class="sd-agent-card" aria-label="Detective Byte, your investigation mentor">' +
      '<div class="sd-agent-portrait" aria-hidden="true">' +
        '<span class="sd-agent-hat"></span><span class="sd-agent-head"><span class="sd-agent-eye sd-agent-eye-left"></span><span class="sd-agent-eye sd-agent-eye-right"></span><span class="sd-agent-mouth"></span></span><span class="sd-agent-coat"></span>' +
      '</div>' +
      '<div class="sd-agent-name">DETECTIVE BYTE · CASE MENTOR</div>' +
      '<div class="sd-agent-message">' + escapeHtml(message) + '</div>' +
    '</div>';
  }

  function renderShell(content, options) {
    const opts = options || {};
    root.innerHTML = '<div class="sd-app">' +
      '<div class="sd-grid-overlay" aria-hidden="true"></div>' +
      '<div class="sd-shell">' + (opts.hideNav ? "" : renderNav()) +
      '<main class="sd-main" id="spoof-detective-main">' + content + '</main></div>' +
      '<div class="sd-toast-region" aria-live="polite" aria-atomic="true"></div>' +
      '<div class="sd-visually-hidden" id="sd-live" aria-live="polite" aria-atomic="true"></div>' +
    '</div>';
    applySettings();
    const main = root.querySelector("#spoof-detective-main");
    if (main && !opts.preserveFocus) {
      main.setAttribute("tabindex", "-1");
      try { main.focus({ preventScroll: true }); } catch (error) { main.focus(); }
    }
  }


  function renderClassicHomeShell(content) {
    root.innerHTML = '<div class="sd-app sd-classic-app">' +
      '<div class="sd-classic-shell">' +
        renderClassicNav() +
        '<main class="sd-classic-main" id="spoof-detective-main">' + content + '</main>' +
      '</div>' +
      '<div class="sd-toast-region" aria-live="polite" aria-atomic="true"></div>' +
      '<div class="sd-visually-hidden" id="sd-live" aria-live="polite" aria-atomic="true"></div>' +
    '</div>';
    applySettings();
    const main = root.querySelector("#spoof-detective-main");
    if (main) {
      main.setAttribute("tabindex", "-1");
      try { main.focus({ preventScroll: true }); } catch (error) { main.focus(); }
    }
  }

  function announce(message) {
    const live = root.querySelector("#sd-live");
    if (!live) return;
    live.textContent = "";
    window.setTimeout(function () { live.textContent = message; }, 20);
  }

  function missionScenarios(missionId, state, includeCustom) {
    return allScenarios(state || app.state).filter(function (scenario) {
      if (scenario.mission !== missionId || scenario.assessmentSet) return false;
      if (scenario.custom && includeCustom === false) return false;
      return true;
    });
  }

  function sessionId(prefix) {
    return String(prefix || "session") + "-" + Date.now() + "-" + Math.random().toString(36).slice(2, 8);
  }

  function createQueue(items) {
    return items.map(function (scenario) {
      return {
        scenarioId: typeof scenario === "string" ? scenario : scenario.id,
        isPractice: false,
        relatedTo: null
      };
    });
  }

  function selectAcrossMissions(missionIds, count, seed, includeCustom, competencyId) {
    const ids = missionIds.length ? missionIds : DATA.missions.map(function (mission) { return mission.id; });
    const focus = competencyId && competencyId !== "all" ? competencyId : null;
    const groups = ids.map(function (missionId) {
      const candidates = missionScenarios(missionId, app.state, includeCustom).filter(function (scenario) {
        return !focus || (scenario.competencies || []).includes(focus);
      });
      return seededShuffle(candidates, seed + "-" + missionId + "-" + (focus || "all"));
    });
    const output = [];
    let cursor = 0;
    while (output.length < count && groups.some(function (group) { return group.length; })) {
      const group = groups[cursor % groups.length];
      if (group.length) output.push(group.shift());
      cursor += 1;
    }
    return output;
  }

  function buildSession(config) {
    const cfg = config || {};
    const queue = createQueue(cfg.scenarios || []);
    const now = new Date().toISOString();
    return {
      id: sessionId(cfg.source || "session"),
      version: DATA.version,
      title: cfg.title || "Spoof Detective Session",
      subtitle: cfg.subtitle || "Evidence-based investigation",
      source: cfg.source || "practice",
      mode: cfg.mode || "learning",
      missionIds: (cfg.missionIds || []).slice(),
      seed: cfg.seed || "spoof-detective",
      collectNotes: Boolean(cfg.collectNotes),
      showStandards: cfg.showStandards !== false,
      recordProgress: cfg.recordProgress !== false,
      queue: queue,
      index: 0,
      currentCase: null,
      results: [],
      integrity: 100,
      startedAt: now,
      completedAt: null
    };
  }

  function startCase(session) {
    if (!session || session.index >= session.queue.length) return false;
    const queueItem = session.queue[session.index];
    const scenario = getScenario(queueItem.scenarioId, app.state);
    if (!scenario) return false;
    session.currentCase = {
      scenarioId: scenario.id,
      phase: "investigate",
      inspected: [],
      selectedEvidence: [],
      hintLevel: 0,
      latestInspection: null,
      inspectionLog: [],
      choices: {
        assessment: null,
        action: null,
        rationale: null,
        note: ""
      },
      responseOrder: [],
      pendingScores: null,
      pendingResponseScore: null,
      branchState: null,
      finalResult: null,
      simpleChoice: null,
      simpleEvidenceChoice: null,
      simpleEvidenceCorrect: null,
      debriefTip: false,
      startedAt: new Date().toISOString()
    };
    saveActiveSession(session);
    return true;
  }

  function activateSession(session) {
    if (!session || !session.queue.length) {
      notify("No cases matched the selected session settings.", "warning");
      return;
    }
    app.session = session;
    app.view = "play";
    startCase(session);
    dispatch("spoof-detective:sessionstart", {
      sessionId: session.id,
      source: session.source,
      mode: session.mode,
      caseCount: session.queue.length,
      missionIds: session.missionIds
    });
    render();
  }

  function startMission(missionId, options) {
    const mission = getMission(missionId);
    if (!mission || !isMissionUnlocked(missionId, app.state)) return false;
    const opts = options || {};
    const count = clamp(Number(opts.caseCount) || mission.defaultCases, 1, missionScenarios(missionId, app.state, true).length);
    const seed = opts.seed || missionId + "-" + new Date().toISOString().slice(0, 10);
    const scenarios = seededShuffle(missionScenarios(missionId, app.state, true), seed).slice(0, count);
    activateSession(buildSession({
      title: "Mission " + mission.number + ": " + mission.title,
      subtitle: mission.objective,
      source: "mission",
      mode: opts.mode || "learning",
      missionIds: [missionId],
      seed: seed,
      scenarios: scenarios,
      collectNotes: false,
      showStandards: false,
      recordProgress: true
    }));
    dispatch("spoof-detective:missionstart", { missionId: missionId, mode: opts.mode || "learning", caseCount: scenarios.length });
    return true;
  }

  function startAssessment(setName) {
    const scenarios = DATA.scenarios.filter(function (scenario) { return scenario.assessmentSet === setName; });
    const label = setName === "pre" ? "Starting Diagnostic" : "Final Transfer Check";
    activateSession(buildSession({
      title: label,
      subtitle: "Complete unseen cases. Explanations are shown after the full assessment.",
      source: setName === "pre" ? "pretest" : "posttest",
      mode: "assessment",
      missionIds: DATA.missions.map(function (mission) { return mission.id; }),
      seed: setName + "-assessment",
      scenarios: seededShuffle(scenarios, setName + "-fixed"),
      collectNotes: false,
      showStandards: false,
      recordProgress: true
    }));
  }

  function startTeacherSession(config) {
    const cfg = Object.assign({}, app.teacherDefaults, config || {});
    const missionIds = cfg.mission === "all"
      ? DATA.missions.map(function (mission) { return mission.id; })
      : [cfg.mission];
    const count = clamp(Number(cfg.caseCount) || 8, 1, 30);
    const competencyId = cfg.competency || "all";
    const scenarios = selectAcrossMissions(missionIds, count, cfg.seed || "classroom-01", cfg.includeCustom !== false, competencyId);
    const competencyLabel = competencyId !== "all" && DATA.competencies[competencyId] ? " · " + DATA.competencies[competencyId].name : "";
    activateSession(buildSession({
      title: "Teacher-Assigned Investigation",
      subtitle: "Seed " + (cfg.seed || "classroom-01") + " · " + scenarios.length + " comparable cases" + competencyLabel,
      source: "teacher",
      mode: cfg.mode || "learning",
      missionIds: missionIds,
      seed: cfg.seed || "classroom-01",
      scenarios: scenarios,
      collectNotes: Boolean(cfg.collectNotes),
      showStandards: cfg.showStandards !== false,
      recordProgress: true
    }));
  }

  function resumeSession() {
    const restored = app.session || loadActiveSession();
    if (!restored || !restored.queue || !restored.queue.length) return false;
    app.session = restored;
    if (!app.session.currentCase) startCase(app.session);
    app.view = "play";
    render();
    return true;
  }

  function totalOfficialAttempts() {
    return app.state.history.filter(function (item) { return !item.isPractice; }).length;
  }

  function allMissionsProficient() {
    return DATA.missions.every(function (mission) {
      return Number(app.state.missionMastery[mission.id] || 0) >= mission.passScore;
    });
  }

  function renderResumeCard() {
    const session = app.session || loadActiveSession();
    if (!session || !Array.isArray(session.queue) || session.index >= session.queue.length) return "";
    const current = getScenario(session.currentCase && session.currentCase.scenarioId || session.queue[session.index].scenarioId, app.state);
    return '<div class="sd-card-flat" style="padding:15px;margin-top:18px">' +
      '<div class="sd-section-heading"><h3>Investigation paused</h3><span>' + escapeHtml(String(session.index + 1)) + ' of ' + escapeHtml(String(session.queue.length)) + '</span></div>' +
      '<p style="color:var(--sd-muted);margin-bottom:12px">' + escapeHtml(session.title) + (current ? " · " + escapeHtml(current.title) : "") + '</p>' +
      '<button type="button" class="sd-button sd-button-primary sd-button-small" data-action="resume-session">' + icon("play") + 'Resume case</button>' +
    '</div>';
  }

  function renderHome() {
    const resumable = app.session || loadActiveSession();
    const hasResume = Boolean(resumable && Array.isArray(resumable.queue) && resumable.index < resumable.queue.length);
    const primaryAction = hasResume ? ' data-action="resume-session"' : ' data-action="navigate" data-view="missions"';
    const greeting = CLASSIC_HOME_GREETINGS[Math.floor(Math.random() * CLASSIC_HOME_GREETINGS.length)];
    const content =
      '<div class="sd-classic-glow sd-classic-glow-primary" aria-hidden="true"></div>' +
      '<div class="sd-classic-glow sd-classic-glow-secondary" aria-hidden="true"></div>' +
      renderClassicAgent(greeting) +
      '<section class="sd-classic-hero" aria-labelledby="sd-classic-title">' +
        '<div class="sd-classic-shield" aria-hidden="true">' + icon("alert") + '<span class="sd-classic-shield-glow"></span></div>' +
        '<h1 class="sd-classic-title" id="sd-classic-title" data-text="SPOOF DETECTIVE">SPOOF <span class="sd-classic-title-accent">DETECTIVE</span></h1>' +
        '<p class="sd-classic-project-subtitle">A PHISHING SIMULATION</p><p class="sd-classic-copy">Investigate realistic messages, uncover the evidence, and make the call before the attacker succeeds.<br><span class="sd-classic-stakes">&gt; ANALYZE. VERIFY. DEFEND.</span></p>' +
        '<button type="button" class="sd-classic-start"' + primaryAction + '>' + icon("zap") + '<span>' + (hasResume ? 'RESUME INVESTIGATION' : 'START INVESTIGATION') + '</span></button>' +
        renderClassicHowTo() +
      '</section>';
    renderClassicHomeShell(content);
    startClassicGreetingTyping(greeting);
  }

  function missionStatusText(mission, score, unlocked) {
    if (!unlocked) return "Locked";
    if (!score) return "Not started";
    return score >= mission.passScore ? "Proficient" : "Developing";
  }

  function renderMissions() {
    const cards = DATA.missions.map(function (mission) {
      const unlocked = isMissionUnlocked(mission.id, app.state);
      const score = Math.round(Number(app.state.missionMastery[mission.id] || 0));
      const status = missionStatusText(mission, score, unlocked);
      return '<article class="sd-mission-card' + (unlocked ? "" : " sd-locked") + '" style="--mission-color:' + escapeAttr(mission.color) + '">' +
        '<div class="sd-mission-number" aria-hidden="true">0' + mission.number + '</div>' +
        '<div class="sd-mission-copy">' +
          '<div class="sd-eyebrow">' + escapeHtml(mission.subtitle) + '</div>' +
          '<h2>' + escapeHtml(mission.title) + '</h2>' +
          '<p>' + escapeHtml(mission.summary) + '</p>' +
          '<div class="sd-tag-list">' + mission.tags.map(function (tag) { return '<span class="sd-tag">' + escapeHtml(tag) + '</span>'; }).join("") + '</div>' +
        '</div>' +
        '<div class="sd-mission-status">' +
          '<div class="sd-mastery-ring' + (score ? '' : ' sd-mastery-ring-empty') + '" style="--value:' + score + ';--ring:' + escapeAttr(mission.color) + '" aria-label="' + (score ? score + ' percent mastery' : (unlocked ? 'Not started, zero percent mastery' : 'Mission locked')) + '"><span>' + score + '%</span></div>' +
          '<span class="sd-pill ' + (unlocked ? (score >= mission.passScore ? "sd-pill-green" : "sd-pill-cyan") : "") + '">' + (unlocked ? icon(score >= mission.passScore ? "check" : "unlock") : icon("lock")) + escapeHtml(status) + '</span>' +
          '<button type="button" class="sd-button sd-button-small' + (unlocked ? " sd-button-primary" : "") + '" data-action="start-mission" data-mission="' + escapeAttr(mission.id) + '"' + (unlocked ? "" : " disabled") + '>' + icon(unlocked ? "play" : "lock") + (score ? "Practice again" : "Begin mission") + '</button>' +
        '</div>' +
      '</article>';
    }).join("");

    const content = '<header class="sd-page-heading"><div class="sd-eyebrow">Choose a mission</div><h1>Read. Decide. Explain. Learn.</h1><p>Every case uses the same clear flow: read one realistic message, choose and submit the safest response, then answer one optional evidence question for bonus points. Reach 70% decision accuracy to unlock the next mission.</p></header>' +
      '<div class="sd-inline-note">' + icon("info") + '<div><strong>No lives, timers, or evidence quotas.</strong> Select one response, submit it, and a correct decision unlocks a +25-point evidence question.</div></div>' +
      '<section class="sd-mission-path" aria-label="Mission pathway">' + cards + '</section>';
    renderShell(content);
  }

  function inspectionFor(scenario, candidates) {
    const list = Array.isArray(candidates) ? candidates : [candidates];
    for (let i = 0; i < list.length; i += 1) {
      if (scenario.inspections.some(function (item) { return item.id === list[i]; })) return list[i];
    }
    return null;
  }

  function inspectTarget(scenario, candidates, html, classes, label) {
    const id = inspectionFor(scenario, candidates);
    if (!id) return html;
    const currentCase = app.session && app.session.currentCase;
    const inspected = Boolean(currentCase && currentCase.inspected.includes(id));
    const interactive = Boolean(currentCase && currentCase.phase === "investigate");
    const number = Math.max(1, scenario.inspections.findIndex(function (item) { return item.id === id; }) + 1);
    const marker = inspected ? icon("check") : String(number);
    return '<button type="button" class="sd-inspect-target ' + escapeAttr(classes || "") + (inspected ? " sd-inspected" : "") + (!interactive ? " sd-inspect-static" : "") + '" data-action="inspect" data-inspection="' + escapeAttr(id) + '" aria-label="Inspect ' + escapeAttr(label || id) + '"' + (interactive ? "" : ' tabindex="-1" aria-disabled="true"') + '>' + html + '<span class="sd-inspect-marker" aria-hidden="true">' + marker + '</span></button>';
  }

  function artifactChrome(appName) {
    return '<div class="sd-artifact-chrome"><div class="sd-window-dots" aria-hidden="true"><span class="sd-window-dot"></span><span class="sd-window-dot"></span><span class="sd-window-dot"></span></div><span class="sd-artifact-app">' + escapeHtml(appName || "Artifact viewer") + '</span><span aria-hidden="true">•••</span></div>';
  }

  function initials(name) {
    return String(name || "?").split(/\s+/).filter(Boolean).slice(0, 2).map(function (part) { return part.charAt(0).toUpperCase(); }).join("") || "?";
  }

  function renderEmailArtifact(scenario) {
    const a = scenario.artifact;
    const senderHtml = '<div class="sd-email-sender"><strong>' + escapeHtml(a.fromName) + '</strong><small>&lt;' + escapeHtml(a.fromAddress) + '&gt;</small></div>';
    const body = (a.body || []).map(function (paragraph, index) {
      const isGreeting = index === 0 && paragraph.length < 60;
      const isSignature = index === (a.body || []).length - 1 && paragraph.length < 80;
      return '<p class="' + (isGreeting ? 'sd-email-greeting' : isSignature ? 'sd-email-signature' : '') + '">' + escapeHtml(paragraph) + '</p>';
    }).join("");
    const link = a.link ? '<div class="sd-email-cta-card">' + inspectTarget(scenario, ["link", "destination", "file"], icon("link") + '<span><strong>' + escapeHtml(a.link.text) + '</strong><small>' + escapeHtml(a.link.url || "Simulated destination") + '</small></span>' + icon("arrow"), "sd-link-target", "link destination") + '</div>' : "";
    const attachment = a.attachment ? '<div class="sd-attachment">' + inspectTarget(scenario, ["attachment", "file"], icon("file") + '<span><strong>' + escapeHtml(a.attachment.name) + '</strong><small>' + escapeHtml(a.attachment.type || "File") + ' · ' + escapeHtml(a.attachment.size || "") + '</small></span>', "", "attachment") + '</div>' : "";
    return '<div class="sd-artifact-frame sd-real-email-frame">' +
      '<div class="sd-email-app sd-email-app-realistic">' +
        '<aside class="sd-email-sidebar" aria-label="Simulated mailbox folders">' +
          '<div class="sd-email-compose">' + icon("plus") + '<span>Compose</span></div>' +
          '<div class="sd-email-folder sd-active"><span>' + icon("inbox") + 'Inbox</span><b>14</b></div>' +
          '<div class="sd-email-folder"><span>' + icon("star") + 'Starred</span></div>' +
          '<div class="sd-email-folder"><span>' + icon("history") + 'Snoozed</span></div>' +
          '<div class="sd-email-folder"><span>' + icon("send") + 'Sent</span></div>' +
          '<div class="sd-email-folder"><span>' + icon("document") + 'Drafts</span><b>3</b></div>' +
          '<div class="sd-email-folder"><span>' + icon("alert") + 'Spam</span><b>2</b></div>' +
          '<div class="sd-email-folder"><span>' + icon("trash") + 'Trash</span></div>' +
          '<div class="sd-email-sidebar-divider"></div>' +
          '<div class="sd-email-folder-heading"><span>Folders</span><b>+</b></div>' +
          '<div class="sd-email-folder sd-folder-active"><span>' + icon("folder") + 'Onboarding</span></div>' +
          '<div class="sd-email-folder"><span>' + icon("folder") + 'School Updates</span></div>' +
          '<div class="sd-email-folder"><span>' + icon("folder") + 'Projects</span></div>' +
          '<div class="sd-email-folder"><span>' + icon("more") + 'More</span></div>' +
        '</aside>' +
        '<section class="sd-email-main">' +
          '<div class="sd-email-subject-row"><div><h2>' + escapeHtml(a.subject) + '</h2><span class="sd-email-label">Inbox&nbsp; ×</span></div><div class="sd-email-message-actions" aria-hidden="true">' + icon("reply") + icon("back") + icon("more") + '</div></div>' +
          '<div class="sd-email-meta">' +
            '<div class="sd-email-avatar">' + escapeHtml(initials(a.fromName)) + '</div>' +
            '<div class="sd-email-address-block">' + inspectTarget(scenario, ["sender", "identity", "headers"], senderHtml, "", "sender details") +
              (a.replyTo ? '<div class="sd-email-address-line"><span>Reply-To:</span> ' + escapeHtml(a.replyTo) + '</div>' : "") +
              (a.to ? '<div class="sd-email-address-line"><span>To:</span> ' + escapeHtml(a.to) + '</div>' : "") +
            '</div>' +
            '<div class="sd-email-date"><span>' + escapeHtml(a.date || "") + '</span>' + icon("star") + '</div>' +
          '</div>' +
          '<div class="sd-email-body">' + body + attachment + link + '</div>' +
        '</section>' +
      '</div></div>';
  }

  function renderTextArtifact(scenario) {
    const a = scenario.artifact;
    return '<div class="sd-artifact-frame">' + artifactChrome(a.app) + '<div class="sd-phone-wrap"><div class="sd-phone"><div class="sd-phone-notch" aria-hidden="true"></div>' +
      '<div class="sd-phone-header">' + inspectTarget(scenario, ["sender", "number"], '<span><strong>' + escapeHtml(a.contactLabel || a.sender) + '</strong><small>' + escapeHtml(a.sender) + '</small></span>', "", "sender number") + '</div>' +
      '<div class="sd-phone-thread"><div class="sd-text-time">' + escapeHtml(a.time || "Today") + '</div><div class="sd-text-bubble">' + escapeHtml(a.message) + (a.link ? '<div style="margin-top:10px">' + inspectTarget(scenario, ["link", "destination"], '<span class="sd-link-target">' + escapeHtml(a.link.text) + '</span>', "", "message link") + '</div>' : "") + '</div></div>' +
    '</div></div></div>';
  }

  function renderDmArtifact(scenario) {
    const a = scenario.artifact;
    return '<div class="sd-artifact-frame">' + artifactChrome(a.app) + '<div class="sd-dm-app">' +
      '<div class="sd-dm-header"><div class="sd-dm-avatar">' + escapeHtml(initials(a.profileName)) + '</div>' + inspectTarget(scenario, ["profile", "sender", "identity"], '<span><strong>' + escapeHtml(a.profileName) + '</strong><small>' + escapeHtml(a.handle || "") + ' · ' + escapeHtml(a.status || "") + '</small></span>', "", "profile") + '</div>' +
      '<div class="sd-dm-thread"><div class="sd-text-time">' + escapeHtml(a.time || "") + '</div><div class="sd-dm-message">' + escapeHtml(a.message) + (a.link ? '<div style="margin-top:14px">' + inspectTarget(scenario, ["link", "destination"], '<span class="sd-link-target">' + escapeHtml(a.link.text) + '</span>', "", "shared link") + '</div>' : "") + '</div></div>' +
    '</div></div>';
  }

  function renderQrGrid() {
    let cells = "";
    for (let i = 0; i < 121; i += 1) cells += "<span></span>";
    return '<div class="sd-qr" aria-label="Simulated QR code">' + cells + '</div>';
  }

  function renderQrArtifact(scenario) {
    const a = scenario.artifact;
    return '<div class="sd-artifact-frame">' + artifactChrome(a.app) + '<div class="sd-poster"><div class="sd-poster-inner">' +
      '<div><span class="sd-pill" style="color:#21384b;border-color:#9fb7c8;background:#e9f1f6">Student opportunity</span><h2>' + escapeHtml(a.posterTitle) + '</h2><p>' + escapeHtml(a.copy) + '</p><strong>' + escapeHtml(a.organizer || "") + '</strong><p style="font-size:.78rem;margin-top:20px">' + escapeHtml(a.footer || "") + '</p></div>' +
      '<div>' + inspectTarget(scenario, ["qr", "destination", "physical"], renderQrGrid() + '<div style="margin-top:10px;font-family:ui-monospace,monospace;font-size:.68rem;overflow-wrap:anywhere">' + escapeHtml(a.encodedUrl) + '</div>', "", "QR code destination") + '</div>' +
    '</div></div></div>';
  }

  function renderOauthArtifact(scenario) {
    const a = scenario.artifact;
    const permissions = (a.permissions || []).map(function (permission) { return '<li class="sd-oauth-permission">' + icon("check") + '<span>' + escapeHtml(permission) + '</span></li>'; }).join("");
    return '<div class="sd-artifact-frame">' + artifactChrome(a.app) + '<div class="sd-web-page"><div class="sd-web-card" style="max-width:620px;margin:0 auto">' +
      '<div class="sd-web-logo">' + escapeHtml(initials(a.appName)) + '</div><h2>' + escapeHtml(a.appName) + ' wants access</h2><p>Signed in as <strong>' + escapeHtml(a.account) + '</strong></p>' +
      inspectTarget(scenario, ["publisher", "identity", "app"], '<div class="sd-inline-note" style="color:#24313b;background:#eef4f7;border-color:#b8cbd8">' + icon("identity") + '<div><strong>' + escapeHtml(a.publisher || "Publisher") + '</strong><br>Redirect: ' + escapeHtml(a.redirectHost || "") + '</div></div>', "", "application publisher") +
      '<h3 style="margin-top:20px">Requested permissions</h3>' + inspectTarget(scenario, ["permissions", "scope", "request"], '<ul class="sd-oauth-permissions">' + permissions + '</ul>', "", "requested permissions") +
      '<div class="sd-button-row" style="margin-top:22px"><span class="sd-fake-submit">Allow</span><span class="sd-button" style="color:#21384b;background:#fff">Cancel</span></div><p style="font-size:.72rem;margin-top:16px">Simulation only. These controls do not authorize an application.</p>' +
    '</div></div></div>';
  }

  function renderCalendarArtifact(scenario) {
    const a = scenario.artifact;
    return '<div class="sd-artifact-frame">' + artifactChrome(a.app) + '<div class="sd-calendar"><div class="sd-calendar-card">' +
      '<div class="sd-calendar-date"><span>' + escapeHtml((a.date || "").split(",")[0]) + '</span><strong>' + escapeHtml((a.date || "").match(/\d+/) ? (a.date || "").match(/\d+/)[0] : "") + '</strong></div>' +
      '<div class="sd-calendar-content"><h2>' + escapeHtml(a.event) + '</h2>' +
        '<div class="sd-calendar-row"><strong>Organizer</strong>' + inspectTarget(scenario, ["organizer", "identity"], '<span>' + escapeHtml(a.organizer) + '</span>', "", "event organizer") + '</div>' +
        '<div class="sd-calendar-row"><strong>When</strong><span>' + escapeHtml(a.date) + ' · ' + escapeHtml(a.time) + '</span></div>' +
        '<div class="sd-calendar-row"><strong>Where</strong><span>' + escapeHtml(a.location) + '</span></div>' +
        '<div class="sd-calendar-row"><strong>Notes</strong>' + inspectTarget(scenario, ["notes", "request", "context"], '<span>' + escapeHtml(a.notes) + '</span>', "", "event notes") + '</div>' +
        (a.link ? '<div style="margin-top:18px">' + inspectTarget(scenario, ["link", "meeting"], '<span class="sd-fake-submit">' + escapeHtml(a.link.text) + '</span>', "", "meeting destination") + '</div>' : "") +
      '</div></div></div></div>';
  }

  function renderWebArtifact(scenario) {
    const a = scenario.artifact;
    const fields = (a.fields || []).map(function (field) { return '<div class="sd-fake-field">' + escapeHtml(typeof field === "string" ? field : field.label || field.name || "Field") + '</div>'; }).join("");
    return '<div class="sd-artifact-frame">' + artifactChrome(a.app) +
      '<div class="sd-browser-bar"><div class="sd-browser-controls" aria-hidden="true">← → ↻</div>' + inspectTarget(scenario, ["address", "domain", "link"], '<div class="sd-browser-address">' + escapeHtml(a.address) + '</div>', "", "browser address") + '</div>' +
      '<div class="sd-web-page"><div class="sd-web-card"><div class="sd-web-logo">' + escapeHtml(a.brand || initials(a.pageTitle)) + '</div><h2>' + escapeHtml(a.heading || a.pageTitle) + '</h2><p>' + escapeHtml(a.body || "") + '</p>' +
        (fields ? inspectTarget(scenario, ["request", "fields", "form"], '<div>' + fields + '</div>', "", "form fields") : "") +
        inspectTarget(scenario, ["download", "button", "request"], '<span class="sd-fake-submit">' + escapeHtml(a.button || "Continue") + '</span>', "", "page action") + '<p style="font-size:.7rem;margin-top:14px">Simulation only. The button cannot download or submit anything.</p>' +
      '</div></div></div>';
  }

  function renderChatArtifact(scenario) {
    const a = scenario.artifact;
    const transcript = (a.transcript || []).map(function (line, index) {
      const candidates = index === 0 ? ["source", "agent", "identity"] : index === (a.transcript.length - 1) ? ["request", "scope", "language"] : ["request", "scope"];
      return inspectTarget(scenario, candidates, '<div class="sd-chat-bubble' + (line.who === "user" ? " sd-user" : "") + '">' + escapeHtml(line.text) + '</div>', "", "chat message");
    }).join("");
    return '<div class="sd-artifact-frame">' + artifactChrome(a.app) + '<div class="sd-chat"><div class="sd-chat-header"><strong>' + escapeHtml(a.header || "Support chat") + '</strong><small>' + escapeHtml(a.agentName || "") + '</small></div><div class="sd-chat-thread">' + transcript + '</div></div></div>';
  }

  function renderVoicemailArtifact(scenario) {
    const a = scenario.artifact;
    let waves = "";
    for (let i = 0; i < 34; i += 1) waves += "<span></span>";
    return '<div class="sd-artifact-frame">' + artifactChrome(a.app) + '<div class="sd-voicemail"><div class="sd-voicemail-card">' +
      '<div class="sd-phone-header">' + inspectTarget(scenario, ["caller", "identity"], '<span><strong>' + escapeHtml(a.caller) + '</strong><small>' + escapeHtml(a.time) + ' · ' + escapeHtml(a.duration) + '</small></span>', "", "caller identity") + '</div>' +
      '<div class="sd-waveform" aria-hidden="true">' + waves + '</div>' +
      '<div class="sd-transcript"><strong>Transcript</strong><p>' + inspectTarget(scenario, ["voice", "request", "context"], '<span>' + escapeHtml(a.transcript) + '</span>', "", "voice message") + '</p></div>' +
      '<p style="font-size:.72rem;color:#617585">Audio is represented by a transcript for accessibility and safe offline embedding.</p>' +
    '</div></div></div>';
  }

  function renderLoginArtifact(scenario) {
    const a = scenario.artifact;
    const ids = scenario.inspections.map(function (item) { return item.id; });
    const rows = (a.events || []).map(function (event, index) {
      const id = ids[index] || ids[ids.length - 1];
      return '<div class="sd-log-row">' + inspectTarget(scenario, id, '<span>' + escapeHtml(event.time) + '</span>', "", "event at " + event.time) + '<strong>' + escapeHtml(event.source) + '</strong><span>' + escapeHtml(event.detail) + ' · ' + escapeHtml(event.status) + '</span></div>';
    }).join("");
    return '<div class="sd-artifact-frame">' + artifactChrome(a.app) + '<div class="sd-log-view"><div class="sd-log-title">' + escapeHtml(a.service || "Account") + ' · ' + escapeHtml(a.heading || "Activity") + '</div><p>' + escapeHtml(a.summary || "") + '</p>' + rows + '</div></div>';
  }

  function renderArtifact(scenario) {
    const kind = scenario.artifact && scenario.artifact.kind;
    if (kind === "email") return renderEmailArtifact(scenario);
    if (kind === "text") return renderTextArtifact(scenario);
    if (kind === "dm") return renderDmArtifact(scenario);
    if (kind === "qr") return renderQrArtifact(scenario);
    if (kind === "oauth") return renderOauthArtifact(scenario);
    if (kind === "calendar") return renderCalendarArtifact(scenario);
    if (kind === "web") return renderWebArtifact(scenario);
    if (kind === "chat") return renderChatArtifact(scenario);
    if (kind === "voicemail") return renderVoicemailArtifact(scenario);
    if (kind === "login") return renderLoginArtifact(scenario);
    return '<div class="sd-artifact-frame">' + artifactChrome("Artifact viewer") + '<div class="sd-empty-state">' + icon("file") + '<p>This artifact type is not available.</p></div></div>';
  }

  function evidenceRevealed(scenario, currentCase) {
    const ids = [];
    scenario.inspections.forEach(function (inspection) {
      if (currentCase.inspected.includes(inspection.id)) {
        (inspection.evidence || []).forEach(function (id) { ids.push(id); });
      }
    });
    return scenario.evidence.filter(function (item) { return unique(ids).includes(item.id); });
  }

  function renderInvestigationPanel(scenario, currentCase) {
    const mission = getMission(scenario.mission);
    const latest = scenario.inspections.find(function (item) { return item.id === currentCase.latestInspection; });
    const revealed = evidenceRevealed(scenario, currentCase);
    const selectedCount = currentCase.selectedEvidence.length;
    const progressLabel = mission && mission.showEvidenceTotal
      ? currentCase.inspected.length + " of " + scenario.inspections.length + " tools used"
      : currentCase.inspected.length + " tools used";
    const tools = scenario.inspections.map(function (inspection) {
      const inspected = currentCase.inspected.includes(inspection.id);
      return '<button type="button" class="sd-tool-button' + (inspected ? " sd-inspected" : "") + '" data-action="inspect" data-inspection="' + escapeAttr(inspection.id) + '">' + icon(inspection.icon || "search") + '<span>' + escapeHtml(inspection.label) + '</span></button>';
    }).join("");
    const evidence = revealed.length ? revealed.map(function (item) {
      const selected = currentCase.selectedEvidence.includes(item.id);
      return '<button type="button" class="sd-evidence-card' + (selected ? " sd-selected" : "") + '" data-action="toggle-evidence" data-evidence="' + escapeAttr(item.id) + '" aria-pressed="' + selected + '"><span class="sd-evidence-check">' + icon("check") + '</span><span><strong>' + escapeHtml(item.label) + '</strong><small>' + escapeHtml(item.detail) + '</small></span></button>';
    }).join("") : '<div class="sd-empty-evidence">Use an inspection tool or select a highlighted part of the artifact. Evidence you uncover will appear here.</div>';
    const hint = currentCase.hintLevel > 0 && scenario.hints[currentCase.hintLevel - 1]
      ? '<div class="sd-hint-box"><strong>Hint ' + currentCase.hintLevel + ':</strong> ' + escapeHtml(scenario.hints[currentCase.hintLevel - 1]) + '</div>'
      : "";
    const hintButton = app.session.mode !== "assessment" && scenario.hints.length
      ? '<button type="button" class="sd-button sd-button-small sd-button-quiet" data-action="use-hint"' + (currentCase.hintLevel >= scenario.hints.length ? " disabled" : "") + '>' + icon("help") + (currentCase.hintLevel ? "Next hint" : "Use a hint") + '</button>'
      : "";
    const canContinue = selectedCount >= scenario.minEvidence;

    return renderAgent("Inspect before deciding. Your score rewards the quality of evidence you select—not the number of buttons you click.", true) +
      '<div class="sd-panel-body">' +
        '<section class="sd-panel-section"><div class="sd-section-heading"><h3>Investigation tools</h3><span>' + escapeHtml(progressLabel) + '</span></div><div class="sd-tool-grid">' + tools + '</div>' +
          (latest ? '<div class="sd-inspection-result"><strong>' + escapeHtml(latest.label) + '</strong><p>' + escapeHtml(latest.result) + (latest.technical && !app.state.settings.plainLanguage ? '<br><span class="sd-technical-only"><strong>Technical detail:</strong> ' + escapeHtml(latest.technical) + '</span>' : "") + '</p></div>' : "") +
        '</section>' +
        '<section class="sd-panel-section"><div class="sd-section-heading"><h3>Select strongest evidence</h3><span>' + selectedCount + ' / ' + scenario.maxEvidence + ' selected</span></div><div class="sd-evidence-list">' + evidence + '</div></section>' +
        (hint || hintButton ? '<section class="sd-panel-section">' + hint + '<div class="sd-button-row" style="margin-top:10px">' + hintButton + '</div></section>' : "") +
        '<section class="sd-panel-section"><button type="button" class="sd-button sd-button-primary" style="width:100%" data-action="go-analysis"' + (canContinue ? "" : " disabled") + '>Analyze the case' + icon("arrow") + '</button><span class="sd-form-help">Select at least ' + scenario.minEvidence + ' evidence items. You may choose up to ' + scenario.maxEvidence + '.</span></section>' +
      '</div>';
  }

  function choiceButton(action, value, selected, title, description, iconName) {
    return '<button type="button" class="sd-choice-button' + (selected ? " sd-selected" : "") + '" data-action="' + escapeAttr(action) + '" data-value="' + escapeAttr(value) + '" aria-pressed="' + selected + '"><span class="sd-choice-icon">' + icon(iconName || "check") + '</span><span class="sd-choice-copy"><strong>' + escapeHtml(title) + '</strong><small>' + escapeHtml(description || "") + '</small></span></button>';
  }

  function renderAnalysisPanel(scenario, currentCase) {
    const choices = currentCase.choices;
    const assessmentIcons = { malicious: "alert", uncertain: "scale", legitimate: "check" };
    const assessments = Object.keys(DATA.assessments).map(function (id) {
      const item = DATA.assessments[id];
      return choiceButton("select-assessment", id, choices.assessment === id, item.label, item.description, assessmentIcons[id]);
    }).join("");
    const actionIcons = { report: "alert", verify: "phone", proceed: "check", escalate: "teacher" };
    const actions = Object.keys(DATA.actions).map(function (id) {
      const item = DATA.actions[id];
      return choiceButton("select-case-action", id, choices.action === id, item.label, item.description, actionIcons[id]);
    }).join("");
    const rationales = seededShuffle(scenario.rationales, app.session.seed + "-" + scenario.id + "-rationale").map(function (item) {
      const selected = choices.rationale === item.id;
      return '<button type="button" class="sd-rationale-option' + (selected ? " sd-selected" : "") + '" data-action="select-rationale" data-value="' + escapeAttr(item.id) + '" aria-pressed="' + selected + '"><span class="sd-radio-dot"></span><span>' + escapeHtml(item.text) + '</span></button>';
    }).join("");
    const note = app.session.collectNotes ? '<div><label class="sd-form-label" for="sd-case-note">Optional analyst note</label><textarea id="sd-case-note" class="sd-textarea" data-field="case-note" maxlength="600" placeholder="Summarize your reasoning in your own words. Stored only in this browser unless exported.">' + escapeHtml(choices.note || "") + '</textarea><span class="sd-form-help">The note is not included in browser events and does not affect score.</span></div>' : "";
    const ready = choices.assessment && choices.action && choices.rationale;

    return renderAgent("Make a triage decision, choose the safest next action, and explain why using the evidence you selected.", true) +
      '<div class="sd-panel-body"><div class="sd-analysis-form">' +
        '<fieldset class="sd-question-group"><legend>1. What does the evidence support?</legend><div class="sd-choice-grid">' + assessments + '</div></fieldset>' +
        '<fieldset class="sd-question-group"><legend>2. What should happen next?</legend><div class="sd-choice-grid">' + actions + '</div></fieldset>' +
        '<fieldset class="sd-question-group"><legend>3. Which explanation best supports your decision?</legend><div class="sd-choice-grid">' + rationales + '</div></fieldset>' + note +
        '<div class="sd-button-row"><button type="button" class="sd-button" data-action="back-investigate">' + icon("back") + 'Review evidence</button><button type="button" class="sd-button sd-button-primary" data-action="submit-analysis"' + (ready ? "" : " disabled") + '>Submit analysis' + icon("arrow") + '</button></div>' +
      '</div></div>';
  }

  function renderResponsePanel(scenario, currentCase) {
    const response = scenario.response;
    if (!response) return "";
    const order = currentCase.responseOrder || [];
    const shuffled = seededShuffle(response.steps, app.session.seed + "-" + scenario.id + "-response");
    const steps = shuffled.map(function (step) {
      const position = order.indexOf(step.id);
      const selected = position >= 0;
      return '<button type="button" class="sd-response-step' + (selected ? " sd-selected" : "") + '" data-action="toggle-response-step" data-step="' + escapeAttr(step.id) + '" aria-pressed="' + selected + '"><span class="sd-response-order">' + (selected ? position + 1 : "+") + '</span><span><strong>' + escapeHtml(step.label) + '</strong><small style="display:block;color:var(--sd-subtle);margin-top:3px">' + escapeHtml(step.why) + '</small></span></button>';
    }).join("");
    const ready = order.length === response.maxSteps;
    return renderAgent("Now move from analysis to response. Choose the first actions in the order they should occur. Preserve evidence and avoid blaming the person who reported the problem.", true) +
      '<div class="sd-panel-body"><div class="sd-response-layout">' +
        '<div><div class="sd-eyebrow">Response sequence</div><h3>' + escapeHtml(response.prompt) + '</h3><p style="color:var(--sd-muted);font-size:.78rem">Select ' + response.maxSteps + ' steps. The number shows the order you chose.</p></div>' +
        '<div class="sd-choice-grid">' + steps + '</div>' +
        '<div class="sd-button-row"><button type="button" class="sd-button sd-button-quiet" data-action="reset-response">' + icon("rotate") + 'Reset order</button><button type="button" class="sd-button sd-button-primary" data-action="submit-response"' + (ready ? "" : " disabled") + '>Complete response' + icon("arrow") + '</button></div>' +
      '</div></div>';
  }


  function beginBranch(scenario, currentCase, responseScore) {
    if (!scenario.branch) return false;
    currentCase.pendingResponseScore = responseScore == null ? null : responseScore;
    currentCase.branchState = {
      nodeId: scenario.branch.startNode,
      selectedOption: null,
      feedback: "",
      path: [],
      scores: []
    };
    currentCase.phase = "branch";
    saveActiveSession(app.session);
    render();
    return true;
  }

  function renderBranchPanel(scenario, currentCase) {
    const branch = scenario.branch;
    const state = currentCase.branchState;
    if (!branch || !state || !branch.nodes[state.nodeId]) return "";
    const node = branch.nodes[state.nodeId];
    const selected = node.options.find(function (option) { return option.id === state.selectedOption; });
    const options = node.options.map(function (option) {
      const active = state.selectedOption === option.id;
      return '<button type="button" class="sd-choice-button' + (active ? " sd-selected" : "") + '" data-action="select-branch-option" data-value="' + escapeAttr(option.id) + '" aria-pressed="' + active + '"' + (state.selectedOption ? " disabled" : "") + '><span class="sd-choice-icon">' + icon(active ? "check" : "arrow") + '</span><span class="sd-choice-copy"><strong>' + escapeHtml(option.label) + '</strong><small>' + (active ? "Decision recorded" : "Choose this response") + '</small></span></button>';
    }).join("");
    const feedback = selected ? '<div class="sd-inspection-result"><strong>Consequence</strong><p>' + escapeHtml(selected.feedback) + '</p></div>' : "";
    const stepNumber = (state.path || []).length + 1;
    const nextLabel = selected && selected.next ? "Continue scenario" : "Complete branch";
    return renderAgent("The initial decision changes what happens next. Follow the consequence, then choose the safest next move using the evidence already collected.", true) +
      '<div class="sd-panel-body"><div class="sd-response-layout">' +
        '<div><div class="sd-eyebrow">Branching consequence · step ' + stepNumber + '</div><h3>' + escapeHtml(branch.title) + '</h3><p style="color:var(--sd-muted);font-size:.78rem">' + escapeHtml(state.path.length ? node.prompt : branch.intro + " " + node.prompt) + '</p></div>' +
        '<div class="sd-choice-grid">' + options + '</div>' + feedback +
        '<button type="button" class="sd-button sd-button-primary" data-action="advance-branch"' + (selected ? "" : " disabled") + '>' + escapeHtml(nextLabel) + icon("arrow") + '</button>' +
      '</div></div>';
  }

  function scoreTone(score) {
    if (score >= 85) return { color: "var(--sd-green)", label: "Mastered case" };
    if (score >= 70) return { color: "var(--sd-cyan)", label: "Proficient case" };
    return { color: "var(--sd-yellow)", label: "Developing case" };
  }

  function renderDebriefPanel(scenario, currentCase) {
    return renderV3Debrief(scenario, currentCase);
  }

  function panelForPhase(scenario, currentCase) {
    if (currentCase.phase === "investigate") return renderInvestigationPanel(scenario, currentCase);
    if (currentCase.phase === "analyze") return renderAnalysisPanel(scenario, currentCase);
    if (currentCase.phase === "respond") return renderResponsePanel(scenario, currentCase);
    if (currentCase.phase === "branch") return renderBranchPanel(scenario, currentCase);
    if (currentCase.phase === "debrief") return renderDebriefPanel(scenario, currentCase);
    if (currentCase.phase === "recorded") return renderRecordedPanel(scenario, currentCase);
    return "";
  }

  function renderGameShell(content) {
    root.innerHTML = '<div class="sd-app sd-game-app">' +
      '<div class="sd-grid-overlay" aria-hidden="true"></div>' +
      '<main class="sd-game-main" id="spoof-detective-main">' + content + '</main>' +
      '<div class="sd-toast-region" aria-live="polite" aria-atomic="true"></div>' +
      '<div class="sd-visually-hidden" id="sd-live" aria-live="polite" aria-atomic="true"></div>' +
    '</div>';
    applySettings();
  }

  function gamePhaseNumber(phase) {
    if (phase === "investigate") return 1;
    if (["evidence", "analyze", "respond", "branch"].includes(phase)) return 2;
    return 3;
  }

  function renderGameHeader(session) {
    const progress = Math.round(((session.index + 1) / session.queue.length) * 100);
    const modeLabel = session.mode === "assessment" ? "Assessment" : session.mode === "arcade" ? "Arcade" : "Learning";
    return '<header class="sd-play-header">' +
      '<button type="button" class="sd-play-brand" data-action="pause-session" aria-label="Pause session and return home">' + icon("alert") + '<span>SPOOF <span>DETECTIVE</span></span></button>' +
      '<div class="sd-play-title"><h1>' + escapeHtml(session.title) + '</h1><span class="sd-pill sd-pill-cyan">' + escapeHtml(modeLabel) + '</span></div>' +
      '<div class="sd-play-progress"><span>Case ' + (session.index + 1) + ' of ' + session.queue.length + '</span><div class="sd-progress-track"><div class="sd-progress-fill" style="width:' + progress + '%"></div></div><strong>' + progress + '%</strong></div>' +
      (session.mode === "arcade" ? '<div class="sd-play-integrity">Integrity ' + session.integrity + '%</div>' : "") +
      '<div class="sd-play-utilities"><button type="button" class="sd-play-utility" data-action="read-case">' + icon("volume") + '<span>Read</span></button><button type="button" class="sd-play-utility" data-action="pause-session">' + icon("pause") + '<span>Pause</span></button></div>' +
    '</header>';
  }

  function renderPhaseRail(currentCase) {
    const active = gamePhaseNumber(currentCase.phase);
    const steps = ["Inspect", "Decide", "Learn"];
    return '<nav class="sd-phase-rail" aria-label="Case workflow">' + steps.map(function (label, index) {
      const number = index + 1;
      return '<div class="sd-phase-step' + (number === active ? " sd-active" : "") + (number < active ? " sd-complete" : "") + '"><span class="sd-phase-number">' + (number < active ? icon("check") : number) + '</span><span>' + label + '</span></div>' + (number < steps.length ? '<span class="sd-phase-line' + (number < active ? " sd-complete" : "") + '"></span>' : "");
    }).join("") + '</nav>';
  }

  function verdictMeta(assessment) {
    if (assessment === "malicious") return { title: "Phishing attempt", tone: "danger", icon: "alert" };
    if (assessment === "uncertain") return { title: "Verification required", tone: "warning", icon: "scale" };
    return { title: "Legitimate message", tone: "safe", icon: "check" };
  }

  function renderCaseBanner(scenario, currentCase) {
    const phase = currentCase.phase;
    if (phase === "debrief" && currentCase.finalResult) {
      const result = currentCase.finalResult;
      const verdict = verdictMeta(scenario.correctAssessment);
      const tone = scoreTone(result.score);
      const summary = app.state.settings.plainLanguage && scenario.debrief.plain ? scenario.debrief.plain : scenario.debrief.what;
      return '<section class="sd-case-banner sd-case-banner-' + verdict.tone + '">' +
        '<div class="sd-verdict-copy"><span class="sd-verdict-icon">' + icon(verdict.icon) + '</span><div><h2>' + escapeHtml(verdict.title) + '</h2><p>' + escapeHtml(summary) + '</p></div></div>' +
        '<div class="sd-banner-score"><div class="sd-banner-ring" style="--score-color:' + tone.color + '"><strong>' + result.score + '%</strong></div><div><h3>Case score ' + result.score + '%</h3><strong style="color:' + tone.color + '">' + escapeHtml(tone.label.replace(" case", "")) + '</strong><p>Evidence ' + result.evidenceScore + ' · Decision ' + result.decisionScore + ' · Reasoning ' + result.rationaleScore + (scenario.response ? ' · Response ' + result.responseScore : "") + '</p></div></div>' +
      '</section>';
    }
    if (phase === "recorded") {
      return '<section class="sd-case-banner sd-case-banner-neutral"><div class="sd-verdict-copy"><span class="sd-verdict-icon">' + icon("check") + '</span><div><h2>Case recorded</h2><p>Your response is saved. Explanations will appear after the assessment.</p></div></div><div class="sd-banner-case-id">CASE ' + escapeHtml(scenario.id.toUpperCase()) + '</div></section>';
    }
    const phaseCopy = phase === "investigate"
      ? { title: scenario.title, text: scenario.context, icon: "search", label: scenario.technique }
      : phase === "analyze"
        ? { title: "Make the call", text: "Classify the case, choose the safest next action, and support the decision with evidence.", icon: "target", label: scenario.title }
        : phase === "respond"
          ? { title: "Contain and recover", text: "Put the first response actions in the order they should happen.", icon: "shield", label: scenario.title }
          : { title: "Follow the consequence", text: "Your decision changed what happens next. Choose the safest response using the evidence already collected.", icon: "activity", label: scenario.title };
    const metric = phase === "investigate"
      ? currentCase.selectedEvidence.length + ' / ' + scenario.maxEvidence + ' evidence selected'
      : phase === "respond" && scenario.response
        ? currentCase.responseOrder.length + ' / ' + scenario.response.maxSteps + ' response steps'
        : 'CASE ' + scenario.id.toUpperCase();
    return '<section class="sd-case-banner sd-case-banner-active"><div class="sd-verdict-copy"><span class="sd-verdict-icon">' + icon(phaseCopy.icon) + '</span><div><div class="sd-banner-eyebrow">' + escapeHtml(phaseCopy.label) + '</div><h2>' + escapeHtml(phaseCopy.title) + '</h2><p>' + escapeHtml(phaseCopy.text) + '</p></div></div><div class="sd-banner-case-id">' + escapeHtml(metric) + '</div></section>';
  }

  function artifactKindLabel(scenario) {
    const labels = { email: "Email artifact", text: "Text message", dm: "Direct message", qr: "QR poster", oauth: "Permission request", calendar: "Calendar invitation", web: "Web page", chat: "Support chat", voicemail: "Voicemail", login: "Account activity" };
    return labels[scenario.artifact && scenario.artifact.kind] || "Digital artifact";
  }

  function evidenceItemsForStrip(scenario, currentCase) {
    let ids = [];
    if (["debrief", "recorded"].includes(currentCase.phase)) ids = (scenario.bestEvidence || []).slice();
    else if (currentCase.selectedEvidence.length) ids = currentCase.selectedEvidence.slice();
    else ids = evidenceRevealed(scenario, currentCase).map(function (item) { return item.id; });
    return unique(ids).map(function (id) { return scenario.evidence.find(function (item) { return item.id === id; }); }).filter(Boolean).slice(0, 4);
  }

  function renderArtifactEvidenceStrip(scenario, currentCase) {
    const items = evidenceItemsForStrip(scenario, currentCase);
    if (!items.length) return '<div class="sd-artifact-evidence-empty">Inspect the highlighted message details, then select the evidence that carries the most weight.</div>';
    return '<div class="sd-artifact-evidence-strip">' + items.map(function (item, index) {
      return '<div class="sd-artifact-evidence-item"><span>' + (currentCase.phase === "debrief" ? icon("check") : (index + 1)) + '</span><div><strong>' + escapeHtml(item.label) + '</strong><small>' + escapeHtml(item.detail) + '</small></div></div>';
    }).join("") + '</div>';
  }

  function renderArtifactPanel(scenario, currentCase) {
    const emailActions = scenario.artifact && scenario.artifact.kind === "email"
      ? '<div class="sd-artifact-toolbar-actions" aria-hidden="true"><span>' + icon("archive") + 'Archive</span><span>' + icon("send") + 'Report</span><span>' + icon("trash") + 'Delete</span><span>' + icon("more") + '</span></div>'
      : '<div class="sd-artifact-toolbar-actions" aria-hidden="true"><span>' + icon("search") + 'Inspect</span><span>' + icon("document") + 'Preserve</span><span>' + icon("more") + '</span></div>';
    return '<section class="sd-play-card sd-artifact-panel" id="sd-current-artifact">' +
      '<header class="sd-play-card-header"><div>' + icon("mail") + '<strong>' + escapeHtml(artifactKindLabel(scenario)) + '</strong></div>' + emailActions + '</header>' +
      '<div class="sd-artifact-stage">' + renderArtifact(scenario) + '</div>' +
      renderArtifactEvidenceStrip(scenario, currentCase) +
    '</section>';
  }

  function mentorCopy(scenario, currentCase) {
    if (currentCase.phase === "investigate") {
      const latest = scenario.inspections.find(function (item) { return item.id === currentCase.latestInspection; });
      return latest ? latest.result : "Start with context, then inspect identity, destination, and the requested action. Strong analysts verify before they trust.";
    }
    if (currentCase.phase === "analyze") return "Use your strongest evidence—not appearance alone—to make the classification and choose the safest next action.";
    if (currentCase.phase === "respond") return "Contain risk first, preserve useful evidence, and avoid blaming the person who reported the problem.";
    if (currentCase.phase === "branch") return "Follow the consequence carefully. The safest next move may change as new evidence appears.";
    if (currentCase.phase === "recorded") return "Case recorded. Keep the later assessment cases independent; the full debrief comes at the end.";
    const result = currentCase.finalResult;
    if (result && result.analysisCorrect && result.score >= 70) return "Great call! You checked the right signals and trusted the evidence. Keep that up—great analysts build strong habits.";
    return "Good investigation. Compare your selected evidence with the strongest evidence, then use the lesson on a different-looking case.";
  }

  function renderDetectiveMentor(scenario, currentCase) {
    const canHint = currentCase.phase === "investigate" && app.session.mode !== "assessment" && scenario.hints.length;
    const canDebriefTip = currentCase.phase === "debrief" && scenario.hints.length;
    const hintText = currentCase.hintLevel > 0 ? scenario.hints[currentCase.hintLevel - 1] : "";
    const debriefTip = currentCase.debriefTip ? scenario.hints[Math.min(1, scenario.hints.length - 1)] : "";
    const button = canHint
      ? '<button type="button" class="sd-mentor-tip-button" data-action="use-hint"' + (currentCase.hintLevel >= scenario.hints.length ? " disabled" : "") + '>' + (currentCase.hintLevel ? "Show another tip" : "Show me a tip") + '</button>'
      : canDebriefTip
        ? '<button type="button" class="sd-mentor-tip-button" data-action="show-debrief-tip">' + (currentCase.debriefTip ? "Hide tip" : "Show me a tip") + '</button>'
        : "";
    const activeTip = currentCase.debriefTip ? debriefTip : hintText;
    return '<aside class="sd-play-card sd-mentor-panel"><header>DETECTIVE BYTE</header><img src="assets/detective-byte.png" alt="Detective Byte, an illustrated detective holding a magnifying glass and case notebook"><div class="sd-mentor-body"><p>' + escapeHtml(mentorCopy(scenario, currentCase)) + '</p>' + (activeTip ? '<div class="sd-mentor-tip"><strong>Detective tip</strong><span>' + escapeHtml(activeTip) + '</span></div>' : "") + (button ? '<div class="sd-mentor-question">Need a hint' + (currentCase.phase === "debrief" ? " for the next case" : "") + '?</div>' + button : "") + '</div></aside>';
  }

  function renderV3Investigation(scenario, currentCase) {
    const mission = getMission(scenario.mission);
    const latest = scenario.inspections.find(function (item) { return item.id === currentCase.latestInspection; });
    const revealed = evidenceRevealed(scenario, currentCase);
    const progressLabel = mission && mission.showEvidenceTotal ? currentCase.inspected.length + " of " + scenario.inspections.length + " tools used" : currentCase.inspected.length + " tools used";
    const tools = scenario.inspections.map(function (inspection) {
      const inspected = currentCase.inspected.includes(inspection.id);
      return '<button type="button" class="sd-tool-button' + (inspected ? " sd-inspected" : "") + '" data-action="inspect" data-inspection="' + escapeAttr(inspection.id) + '">' + icon(inspection.icon || "search") + '<span>' + escapeHtml(inspection.label) + '</span></button>';
    }).join("");
    const evidence = revealed.length ? revealed.map(function (item) {
      const selected = currentCase.selectedEvidence.includes(item.id);
      return '<button type="button" class="sd-evidence-card' + (selected ? " sd-selected" : "") + '" data-action="toggle-evidence" data-evidence="' + escapeAttr(item.id) + '" aria-pressed="' + selected + '"><span class="sd-evidence-check">' + icon("check") + '</span><span><strong>' + escapeHtml(item.label) + '</strong><small>' + escapeHtml(item.detail) + '</small></span></button>';
    }).join("") : '<div class="sd-empty-evidence">Use an investigation tool or select a numbered marker in the artifact. Evidence will appear here.</div>';
    return '<div class="sd-focus-panel"><div class="sd-focus-heading"><span>' + icon("search") + '</span><div><h2>Inspect the evidence</h2><p>Use the tools, then select only the strongest evidence for your case.</p></div><b>' + escapeHtml(progressLabel) + '</b></div>' +
      '<section class="sd-focus-section"><div class="sd-focus-section-title"><h3>Investigation tools</h3><span>Click any tool to inspect</span></div><div class="sd-tool-grid sd-tool-grid-v3">' + tools + '</div>' +
      (latest ? '<div class="sd-inspection-result"><strong>' + escapeHtml(latest.label) + '</strong><p>' + escapeHtml(latest.result) + (latest.technical && !app.state.settings.plainLanguage ? '<br><span class="sd-technical-only"><strong>Technical detail:</strong> ' + escapeHtml(latest.technical) + '</span>' : "") + '</p></div>' : "") + '</section>' +
      '<section class="sd-focus-section"><div class="sd-focus-section-title"><h3>Build your case</h3><span>' + currentCase.selectedEvidence.length + ' / ' + scenario.maxEvidence + ' selected</span></div><div class="sd-evidence-list">' + evidence + '</div></section></div>';
  }

  function renderV3Analysis(scenario, currentCase) {
    const choices = currentCase.choices;
    const assessmentIcons = { malicious: "alert", uncertain: "scale", legitimate: "check" };
    const assessments = Object.keys(DATA.assessments).map(function (id) {
      const item = DATA.assessments[id];
      return choiceButton("select-assessment", id, choices.assessment === id, item.label, item.description, assessmentIcons[id]);
    }).join("");
    const actionIcons = { report: "alert", verify: "phone", proceed: "check", escalate: "teacher" };
    const actions = Object.keys(DATA.actions).map(function (id) {
      const item = DATA.actions[id];
      return choiceButton("select-case-action", id, choices.action === id, item.label, item.description, actionIcons[id]);
    }).join("");
    const rationales = seededShuffle(scenario.rationales, app.session.seed + "-" + scenario.id + "-rationale").map(function (item) {
      const selected = choices.rationale === item.id;
      return '<button type="button" class="sd-rationale-option' + (selected ? " sd-selected" : "") + '" data-action="select-rationale" data-value="' + escapeAttr(item.id) + '" aria-pressed="' + selected + '"><span class="sd-radio-dot"></span><span>' + escapeHtml(item.text) + '</span></button>';
    }).join("");
    const note = app.session.collectNotes ? '<div class="sd-analyst-note"><label class="sd-form-label" for="sd-case-note">Optional analyst note</label><textarea id="sd-case-note" class="sd-textarea" data-field="case-note" maxlength="600" placeholder="Summarize the evidence in your own words.">' + escapeHtml(choices.note || "") + '</textarea><span class="sd-form-help">Stored only in this browser unless deliberately exported.</span></div>' : "";
    return '<div class="sd-focus-panel"><div class="sd-focus-heading"><span>' + icon("target") + '</span><div><h2>Make the call</h2><p>Classify the case, choose the safest next action, and explain why.</p></div></div><div class="sd-analysis-form sd-analysis-form-v3">' +
      '<fieldset class="sd-question-group"><legend>1. What does the evidence support?</legend><div class="sd-choice-grid sd-choice-grid-3">' + assessments + '</div></fieldset>' +
      '<fieldset class="sd-question-group"><legend>2. What should happen next?</legend><div class="sd-choice-grid sd-choice-grid-2">' + actions + '</div></fieldset>' +
      '<fieldset class="sd-question-group"><legend>3. Which explanation best supports your decision?</legend><div class="sd-choice-grid">' + rationales + '</div></fieldset>' + note + '</div></div>';
  }

  function renderV3Response(scenario, currentCase) {
    const response = scenario.response;
    if (!response) return "";
    const order = currentCase.responseOrder || [];
    const shuffled = seededShuffle(response.steps, app.session.seed + "-" + scenario.id + "-response");
    const steps = shuffled.map(function (step) {
      const position = order.indexOf(step.id);
      const selected = position >= 0;
      return '<button type="button" class="sd-response-step' + (selected ? " sd-selected" : "") + '" data-action="toggle-response-step" data-step="' + escapeAttr(step.id) + '" aria-pressed="' + selected + '"><span class="sd-response-order">' + (selected ? position + 1 : "+") + '</span><span><strong>' + escapeHtml(step.label) + '</strong><small>' + escapeHtml(step.why) + '</small></span></button>';
    }).join("");
    return '<div class="sd-focus-panel"><div class="sd-focus-heading"><span>' + icon("shield") + '</span><div><h2>Response sequence</h2><p>' + escapeHtml(response.prompt) + '</p></div><b>Select ' + response.maxSteps + '</b></div><div class="sd-response-layout"><div class="sd-choice-grid">' + steps + '</div></div></div>';
  }

  function renderV3Branch(scenario, currentCase) {
    const branch = scenario.branch;
    const state = currentCase.branchState;
    if (!branch || !state || !branch.nodes[state.nodeId]) return "";
    const node = branch.nodes[state.nodeId];
    const selected = node.options.find(function (option) { return option.id === state.selectedOption; });
    const options = node.options.map(function (option) {
      const active = state.selectedOption === option.id;
      return '<button type="button" class="sd-choice-button' + (active ? " sd-selected" : "") + '" data-action="select-branch-option" data-value="' + escapeAttr(option.id) + '" aria-pressed="' + active + '"' + (state.selectedOption ? " disabled" : "") + '><span class="sd-choice-icon">' + icon(active ? "check" : "arrow") + '</span><span class="sd-choice-copy"><strong>' + escapeHtml(option.label) + '</strong><small>' + (active ? "Decision recorded" : "Choose this response") + '</small></span></button>';
    }).join("");
    return '<div class="sd-focus-panel"><div class="sd-focus-heading"><span>' + icon("activity") + '</span><div><h2>' + escapeHtml(branch.title) + '</h2><p>' + escapeHtml(state.path.length ? node.prompt : branch.intro + " " + node.prompt) + '</p></div><b>Step ' + ((state.path || []).length + 1) + '</b></div><div class="sd-choice-grid">' + options + '</div>' + (selected ? '<div class="sd-inspection-result"><strong>Consequence</strong><p>' + escapeHtml(selected.feedback) + '</p></div>' : "") + '</div>';
  }

  function renderDecisionReview(scenario, currentCase) {
    if (!currentCase.reviewOpen || !currentCase.finalResult) return "";
    const result = currentCase.finalResult;
    const selectedAssessment = DATA.assessments[result.assessment];
    const correctAssessment = DATA.assessments[scenario.correctAssessment];
    const selectedAction = DATA.actions[result.action];
    const correctAction = DATA.actions[scenario.correctAction];
    const rationale = scenario.rationales.find(function (item) { return item.id === result.rationale; });
    return '<div class="sd-decision-review"><div><span>Your classification</span><strong>' + escapeHtml(selectedAssessment ? selectedAssessment.label : result.assessment) + '</strong><small>Evidence-supported answer: ' + escapeHtml(correctAssessment ? correctAssessment.label : scenario.correctAssessment) + '</small></div><div><span>Your action</span><strong>' + escapeHtml(selectedAction ? selectedAction.label : result.action) + '</strong><small>Recommended action: ' + escapeHtml(correctAction ? correctAction.label : scenario.correctAction) + '</small></div><div><span>Your explanation</span><strong>' + escapeHtml(rationale ? rationale.text : "No explanation selected") + '</strong></div></div>';
  }

  function renderV3Debrief(scenario, currentCase) {
    const result = currentCase.finalResult;
    if (!result) return "";
    const selectedEvidence = scenario.evidence.filter(function (item) { return result.evidenceSelected.includes(item.id); });
    const evidenceReview = selectedEvidence.length ? selectedEvidence.map(function (item) {
      return '<li><strong>' + escapeHtml(item.label) + '</strong><span>' + escapeHtml(item.detail) + '</span></li>';
    }).join("") : '<li><strong>No evidence selected</strong><span>Review the strongest evidence above before the next case.</span></li>';
    const reminders = unique([].concat(scenario.persuasion || [], scenario.misconceptionTags || [])).slice(0, 6);
    const reminderMarkup = reminders.length ? '<ul>' + reminders.map(function (item) { return '<li>' + escapeHtml(item) + '</li>'; }).join("") + '</ul>' : '<p>Do not rely on appearance, grammar, or urgency alone. Verify identity, destination, context, and requested action.</p>';
    const consequence = result.analysisCorrect && result.actionCorrect ? scenario.consequence.ideal : scenario.consequence.unsafe;
    const practiceAllowed = app.session.mode !== "assessment" && result.score < PASS_SCORE && scenario.nearTransferId && !app.session.queue[app.session.index].isPractice;
    const standards = app.session.showStandards ? '<div class="sd-debrief-standards"><strong>Standards and competencies</strong><div class="sd-tag-list">' + scenario.standards.map(function (item) { return '<span class="sd-tag">' + escapeHtml(item) + '</span>'; }).join("") + '</div></div>' : "";
    const responseOutcome = scenario.response ? '<div class="sd-debrief-outcome"><strong>Response outcome</strong><p>' + escapeHtml(result.responseScore >= 70 ? scenario.response.success : scenario.response.failure) + '</p></div>' : "";
    const branchOutcome = result.branchScore != null && scenario.branch ? '<div class="sd-debrief-outcome"><strong>Branching outcome · ' + result.branchScore + '%</strong><p>' + escapeHtml(result.branchPath.map(function (step) { const node = scenario.branch.nodes[step.nodeId]; const option = node && node.options.find(function (item) { return item.id === step.optionId; }); return option ? option.label : step.optionId; }).join(" → ")) + '</p></div>' : "";
    return '<div class="sd-learning-panel-content">' +
      '<section class="sd-learning-primary"><div class="sd-learning-icon">' + icon("shield") + '</div><div><h2>Why this is correct</h2><p>' + escapeHtml(app.state.settings.plainLanguage && scenario.debrief.plain ? scenario.debrief.plain : scenario.debrief.what) + '</p></div></section>' +
      '<section class="sd-learning-primary"><div class="sd-learning-icon">' + icon("target") + '</div><div><h2>Strongest evidence</h2><p>' + escapeHtml(scenario.debrief.strongest) + '</p></div></section>' +
      '<section class="sd-learning-primary"><div class="sd-learning-icon">' + icon("send") + '</div><div><h2>What to do next</h2><p>' + escapeHtml(scenario.debrief.next) + '</p></div></section>' +
      '<details class="sd-learning-accordion"><summary>' + icon("scale") + '<span>Weak or inconclusive evidence</span>' + icon("chevronDown") + '</summary><div><p>' + escapeHtml(scenario.debrief.inconclusive) + '</p></div></details>' +
      '<details class="sd-learning-accordion"><summary>' + icon("activity") + '<span>Common red flags to remember</span>' + icon("chevronDown") + '</summary><div>' + reminderMarkup + '<p><strong>Consequence:</strong> ' + escapeHtml(consequence) + '</p></div></details>' +
      '<details class="sd-learning-accordion"><summary>' + icon("document") + '<span>Evidence recap</span>' + icon("chevronDown") + '</summary><div><div class="sd-debrief-metrics"><span><b>' + result.evidenceScore + '%</b>Evidence</span><span><b>' + result.decisionScore + '%</b>Decision</span><span><b>' + result.rationaleScore + '%</b>Reasoning</span>' + (scenario.response ? '<span><b>' + result.responseScore + '%</b>Response</span>' : "") + '</div><ul class="sd-debrief-evidence-list">' + evidenceReview + '</ul>' + responseOutcome + branchOutcome + standards + '</div></details>' +
      renderDecisionReview(scenario, currentCase) +
      (practiceAllowed ? '<button type="button" class="sd-inline-practice" data-action="practice-transfer">' + icon("refresh") + 'Practice a related case</button>' : "") +
    '</div>';
  }

  function renderV3Recorded() {
    return '<div class="sd-focus-panel sd-recorded-panel"><span>' + icon("check") + '</span><h2>Case recorded</h2><p>Your evidence, decision, and reasoning have been saved. The complete explanations will appear after the final assessment case.</p></div>';
  }

  function renderV3CenterPanel(scenario, currentCase) {
    let body = "";
    if (currentCase.phase === "investigate") body = renderV3Investigation(scenario, currentCase);
    else if (currentCase.phase === "analyze") body = renderV3Analysis(scenario, currentCase);
    else if (currentCase.phase === "respond") body = renderV3Response(scenario, currentCase);
    else if (currentCase.phase === "branch") body = renderV3Branch(scenario, currentCase);
    else if (currentCase.phase === "debrief") body = renderV3Debrief(scenario, currentCase);
    else body = renderV3Recorded();
    return '<section class="sd-play-card sd-learning-panel">' + body + '</section>';
  }

  function renderV3Footer(scenario, currentCase) {
    let secondary = "";
    let primary = "";
    if (currentCase.phase === "investigate") {
      const ready = currentCase.selectedEvidence.length >= scenario.minEvidence;
      secondary = '<button type="button" class="sd-footer-button sd-footer-secondary" data-action="clear-evidence"' + (currentCase.selectedEvidence.length ? "" : " disabled") + '>' + icon("refresh") + 'Reset evidence</button>';
      primary = '<button type="button" class="sd-footer-button sd-footer-primary" data-action="go-analysis"' + (ready ? "" : " disabled") + '>Analyze case' + icon("arrow") + '</button>';
    } else if (currentCase.phase === "analyze") {
      const ready = currentCase.choices.assessment && currentCase.choices.action && currentCase.choices.rationale;
      secondary = '<button type="button" class="sd-footer-button sd-footer-secondary" data-action="back-investigate">' + icon("back") + 'Review evidence</button>';
      primary = '<button type="button" class="sd-footer-button sd-footer-primary" data-action="submit-analysis"' + (ready ? "" : " disabled") + '>Submit analysis' + icon("arrow") + '</button>';
    } else if (currentCase.phase === "respond") {
      const ready = scenario.response && currentCase.responseOrder.length === scenario.response.maxSteps;
      secondary = '<button type="button" class="sd-footer-button sd-footer-secondary" data-action="reset-response">' + icon("refresh") + 'Reset order</button>';
      primary = '<button type="button" class="sd-footer-button sd-footer-primary" data-action="submit-response"' + (ready ? "" : " disabled") + '>Complete response' + icon("arrow") + '</button>';
    } else if (currentCase.phase === "branch") {
      const branch = scenario.branch;
      const state = currentCase.branchState;
      const selected = Boolean(state && state.selectedOption);
      const node = branch && state ? branch.nodes[state.nodeId] : null;
      const option = node && selected ? node.options.find(function (item) { return item.id === state.selectedOption; }) : null;
      secondary = '<button type="button" class="sd-footer-button sd-footer-secondary" data-action="scroll-artifact">' + icon("search") + 'Review artifact</button>';
      primary = '<button type="button" class="sd-footer-button sd-footer-primary" data-action="advance-branch"' + (selected ? "" : " disabled") + '>' + escapeHtml(option && option.next ? "Continue scenario" : "Complete branch") + icon("arrow") + '</button>';
    } else if (currentCase.phase === "debrief") {
      const isLast = app.session.index >= app.session.queue.length - 1;
      secondary = '<button type="button" class="sd-footer-button sd-footer-secondary" data-action="review-decision">' + icon("refresh") + (currentCase.reviewOpen ? "Hide decision" : "Review decision") + '</button>';
      primary = '<button type="button" class="sd-footer-button sd-footer-primary" data-action="next-case">' + (isLast ? "Finish session" : "Next case") + icon("arrow") + '</button>';
    } else {
      const isLast = app.session.index >= app.session.queue.length - 1;
      secondary = '<button type="button" class="sd-footer-button sd-footer-secondary" data-action="scroll-artifact">' + icon("search") + 'Review artifact</button>';
      primary = '<button type="button" class="sd-footer-button sd-footer-primary" data-action="next-case">' + (isLast ? "Finish assessment" : "Continue") + icon("arrow") + '</button>';
    }
    return '<footer class="sd-play-footer"><div>' + secondary + primary + '</div></footer>';
  }

  function simpleAssessmentMeta(id) {
    if (id === "malicious") {
      return {
        id: id,
        label: "Phishing",
        actionLabel: "Report as phishing",
        description: "The message is deceptive or is trying to steal information.",
        icon: "alert",
        tone: "danger"
      };
    }
    if (id === "uncertain") {
      return {
        id: id,
        label: "Verify first",
        actionLabel: "Verify before acting",
        description: "The evidence is mixed, so confirm the request through a trusted source.",
        icon: "search",
        tone: "warning"
      };
    }
    return {
      id: "legitimate",
      label: "Legitimate",
      actionLabel: "Proceed normally",
      description: "The sender, destination, request, and context all match an expected message.",
      icon: "check",
      tone: "safe"
    };
  }

  function simpleMentorCopy(scenario, currentCase) {
    if (currentCase.phase === "evidence") {
      return "Correct decision. Now choose the strongest clue from the message to earn the 25-point evidence bonus.";
    }
    if (currentCase.hintLevel > 0 && scenario.hints[currentCase.hintLevel - 1]) {
      return scenario.hints[currentCase.hintLevel - 1];
    }
    const latest = scenario.inspections.find(function (item) { return item.id === currentCase.latestInspection; });
    if (latest) return latest.result;
    return "Start with four checks: who sent it, where it leads, what it asks for, and whether the situation was expected.";
  }

  function simpleEvidenceOptions(scenario) {
    const candidates = [];
    const seen = new Set();
    function add(id, text, correct) {
      const clean = String(text || "").trim();
      if (!clean || seen.has(clean)) return;
      seen.add(clean);
      candidates.push({ id: id, text: clean, correct: Boolean(correct) });
    }

    add("strongest", scenario.debrief && scenario.debrief.strongest, true);
    add("inconclusive", scenario.debrief && scenario.debrief.inconclusive, false);
    (scenario.distractors || []).forEach(function (item, index) {
      add("distractor-" + index, item, false);
    });
    (scenario.evidence || []).forEach(function (item) {
      if ((scenario.bestEvidence || []).includes(item.id)) return;
      add("evidence-" + item.id, item.label + ". " + item.detail, false);
    });

    const correct = candidates.find(function (item) { return item.correct; });
    const wrong = seededShuffle(candidates.filter(function (item) { return !item.correct; }), scenario.id + "-simple-evidence-wrong").slice(0, 2);
    const fallback = [
      { id: "fallback-appearance", text: "The message looks polished and uses familiar branding.", correct: false },
      { id: "fallback-urgency", text: "The message sounds urgent, so urgency alone proves the answer.", correct: false }
    ];
    fallback.forEach(function (item) {
      if (wrong.length < 2 && !wrong.some(function (choice) { return choice.text === item.text; })) wrong.push(item);
    });
    return seededShuffle([correct || { id: "strongest", text: scenario.rationale || "The strongest evidence supports the selected response.", correct: true }].concat(wrong.slice(0, 2)), scenario.id + "-simple-evidence-order");
  }

  function renderSimpleCaseBanner(scenario, currentCase) {
    if (currentCase.phase === "debrief" && currentCase.finalResult) {
      const result = currentCase.finalResult;
      const actual = simpleAssessmentMeta(scenario.correctAssessment);
      const selected = simpleAssessmentMeta(result.assessment);
      const correct = result.assessmentCorrect;
      const bonus = Number(result.evidenceBonus || 0);
      const points = Number(result.points || 0);
      return '<section class="sd-simple-result-banner sd-simple-result-' + (correct ? 'correct' : 'review') + '">' +
        '<span class="sd-simple-result-icon">' + icon(correct ? "check" : "alert") + '</span>' +
        '<div class="sd-simple-result-copy"><div class="sd-simple-result-kicker">' + (correct ? 'Correct response' : 'Take another look') + '</div><h2>' + escapeHtml(actual.label) + '</h2><p>You chose <strong>' + escapeHtml(selected.actionLabel) + '</strong>. ' + escapeHtml(app.state.settings.plainLanguage && scenario.debrief.plain ? scenario.debrief.plain : scenario.debrief.what) + '</p></div>' +
        '<div class="sd-simple-result-status"><strong>' + (points ? '+' + points + ' PTS' : '0 PTS') + '</strong><span>Case ' + (app.session.index + 1) + ' of ' + app.session.queue.length + (correct ? ' · ' + (bonus ? 'Bonus +' + bonus : 'Bonus not earned') : '') + '</span></div>' +
      '</section>';
    }
    if (currentCase.phase === "recorded") {
      return '<section class="sd-simple-result-banner sd-simple-result-correct"><span class="sd-simple-result-icon">' + icon("check") + '</span><div class="sd-simple-result-copy"><div class="sd-simple-result-kicker">Answer saved</div><h2>Case recorded</h2><p>The explanation will appear when the assessment is complete.</p></div><div class="sd-simple-result-status"><strong>SAVED</strong><span>Case ' + (app.session.index + 1) + ' of ' + app.session.queue.length + '</span></div></section>';
    }
    return '<section class="sd-simple-case-banner"><div><div class="sd-banner-eyebrow">' + escapeHtml(scenario.technique || artifactKindLabel(scenario)) + '</div><h2>' + escapeHtml(scenario.title) + '</h2><p>' + escapeHtml(scenario.context) + '</p></div><span>CASE ' + escapeHtml(scenario.id.toUpperCase()) + '</span></section>';
  }

  function simpleEvidenceItems(scenario, currentCase) {
    if (["debrief", "recorded"].includes(currentCase.phase)) {
      return (scenario.bestEvidence || []).map(function (id) {
        return scenario.evidence.find(function (item) { return item.id === id; });
      }).filter(Boolean).slice(0, 3);
    }
    return evidenceRevealed(scenario, currentCase).slice(0, 3);
  }

  function renderSimpleClueStrip(scenario, currentCase) {
    const items = simpleEvidenceItems(scenario, currentCase);
    if (!items.length) {
      return '<div class="sd-simple-clue-empty">' + icon("search") + '<span>Optional: click a highlighted detail in the message for a closer look.</span></div>';
    }
    return '<div class="sd-simple-clue-strip">' + items.map(function (item) {
      return '<div><span>' + icon(currentCase.phase === "debrief" ? "check" : "search") + '</span><p><strong>' + escapeHtml(item.label) + '</strong><small>' + escapeHtml(item.detail) + '</small></p></div>';
    }).join("") + '</div>';
  }

  function renderSimpleArtifactPanel(scenario, currentCase) {
    const emailActions = scenario.artifact && scenario.artifact.kind === "email"
      ? '<div class="sd-artifact-toolbar-actions" aria-hidden="true"><span>' + icon("archive") + 'Archive</span><span>' + icon("send") + 'Report</span><span>' + icon("trash") + 'Delete</span><span>' + icon("more") + '</span></div>'
      : '<div class="sd-artifact-toolbar-actions" aria-hidden="true"><span>' + icon("search") + 'Inspect</span><span>' + icon("document") + 'Preserve</span><span>' + icon("more") + '</span></div>';
    return '<section class="sd-play-card sd-simple-artifact" id="sd-current-artifact">' +
      '<header class="sd-play-card-header"><div>' + icon("mail") + '<strong>' + escapeHtml(artifactKindLabel(scenario)) + '</strong></div>' + emailActions + '</header>' +
      '<div class="sd-simple-artifact-stage">' + renderArtifact(scenario) + '</div>' +
      renderSimpleClueStrip(scenario, currentCase) +
    '</section>';
  }

  function renderSimpleDetective(scenario, currentCase, debrief) {
    let message;
    if (debrief) {
      if (!currentCase.finalResult || !currentCase.finalResult.assessmentCorrect) {
        message = "Good try. Compare your response with the strongest clue, then carry that pattern into the next case.";
      } else if (currentCase.finalResult.evidenceBonus) {
        message = "Excellent work. You made the right call and identified the strongest supporting evidence.";
      } else {
        message = "Good call. Review the strongest clue below so you can earn the evidence bonus on the next case.";
      }
    } else {
      message = simpleMentorCopy(scenario, currentCase);
    }
    const hintButton = !debrief && currentCase.phase === "investigate" && app.session.mode !== "assessment" && scenario.hints.length
      ? '<button type="button" class="sd-simple-tip-button" data-action="use-hint"' + (currentCase.hintLevel >= scenario.hints.length ? ' disabled' : '') + '>' + icon("help") + (currentCase.hintLevel ? 'Another clue' : 'Give me a clue') + '</button>'
      : '';
    return '<div class="sd-simple-detective"><img src="assets/detective-byte.png" alt="Detective Byte holding a magnifying glass and notebook"><div><span>DETECTIVE BYTE</span><p>' + escapeHtml(message) + '</p>' + hintButton + '</div></div>';
  }

  function renderSimpleDecisionPanel(scenario, currentCase) {
    const selected = currentCase.simpleChoice;
    const choices = ["malicious", "uncertain", "legitimate"].map(function (id) {
      const meta = simpleAssessmentMeta(id);
      const isSelected = selected === id;
      return '<button type="button" class="sd-simple-answer sd-simple-answer-' + meta.tone + (isSelected ? ' sd-selected' : '') + '" data-action="select-simple-answer" data-value="' + id + '" aria-pressed="' + (isSelected ? 'true' : 'false') + '"><span>' + icon(meta.icon) + '</span><span><strong>' + escapeHtml(meta.actionLabel) + '</strong><small>' + escapeHtml(meta.description) + '</small></span>' + (isSelected ? icon("check") : icon("arrow")) + '</button>';
    }).join("");
    return '<aside class="sd-play-card sd-simple-side-panel">' +
      renderSimpleDetective(scenario, currentCase, false) +
      '<div class="sd-simple-question"><div class="sd-eyebrow">Step 1 · Choose a response</div><h2>How should you handle this message?</h2><p>Select the safest response based on the sender, destination, request, and context. Then submit your decision.</p><div class="sd-simple-answer-list">' + choices + '</div><button type="button" class="sd-simple-submit" data-action="submit-simple-answer"' + (selected ? '' : ' disabled') + '>' + icon("check") + 'Submit decision</button><small class="sd-simple-submit-note">A correct decision unlocks one evidence question worth <strong>+25 bonus points</strong>.</small></div>' +
    '</aside>';
  }

  function renderSimpleEvidencePanel(scenario, currentCase) {
    const selectedDecision = simpleAssessmentMeta(currentCase.simpleChoice || scenario.correctAssessment);
    const selectedEvidence = currentCase.simpleEvidenceChoice;
    const options = simpleEvidenceOptions(scenario).map(function (item, index) {
      const selected = item.id === selectedEvidence;
      return '<button type="button" class="sd-simple-evidence-option' + (selected ? ' sd-selected' : '') + '" data-action="select-simple-evidence" data-value="' + escapeAttr(item.id) + '" aria-pressed="' + (selected ? 'true' : 'false') + '"><span class="sd-simple-option-letter">' + String.fromCharCode(65 + index) + '</span><span>' + escapeHtml(item.text) + '</span><span class="sd-simple-option-mark">' + (selected ? icon("check") : '') + '</span></button>';
    }).join("");
    return '<aside class="sd-play-card sd-simple-side-panel sd-simple-evidence-phase">' +
      renderSimpleDetective(scenario, currentCase, false) +
      '<div class="sd-simple-two-step">' +
        '<section class="sd-simple-decision-recap"><span>' + icon("check") + '</span><div><small>Correct decision · +' + SIMPLE_DECISION_POINTS + ' points</small><strong>' + escapeHtml(selectedDecision.actionLabel) + '</strong></div></section>' +
        '<section class="sd-simple-question sd-simple-evidence-question"><div class="sd-simple-bonus-heading"><div><div class="sd-eyebrow">Step 2 · Explain why</div><h2>Which clue best supports your decision?</h2></div><span>+' + SIMPLE_EVIDENCE_BONUS + ' PTS</span></div><p>Choose the strongest evidence from this case—not just a detail that looks suspicious or reassuring.</p><div class="sd-simple-evidence-options">' + options + '</div><button type="button" class="sd-simple-submit" data-action="submit-simple-evidence"' + (selectedEvidence ? '' : ' disabled') + '>' + icon("target") + 'Submit evidence answer</button><button type="button" class="sd-simple-skip" data-action="skip-simple-evidence">Skip bonus question</button></section>' +
      '</div>' +
    '</aside>';
  }

  function renderSimpleDebriefPanel(scenario, currentCase) {
    const result = currentCase.finalResult;
    const selected = simpleAssessmentMeta(result.assessment);
    const actual = simpleAssessmentMeta(scenario.correctAssessment);
    const isLast = app.session.index >= app.session.queue.length - 1;
    const bonus = Number(result.evidenceBonus || 0);
    const points = Number(result.points || 0);
    const decisionPoints = result.assessmentCorrect ? SIMPLE_DECISION_POINTS : 0;
    return '<aside class="sd-play-card sd-simple-side-panel sd-simple-debrief">' +
      renderSimpleDetective(scenario, currentCase, true) +
      '<div class="sd-simple-debrief-body">' +
        '<div class="sd-simple-point-summary"><div><span>Decision</span><strong>+' + decisionPoints + '</strong></div><div class="' + (bonus ? 'sd-earned' : '') + '"><span>Evidence bonus</span><strong>+' + bonus + '</strong></div><div><span>Case total</span><strong>' + points + ' pts</strong></div></div>' +
        '<div class="sd-simple-answer-summary"><span>Your response</span><strong>' + escapeHtml(selected.actionLabel) + '</strong><span>Best response</span><strong>' + escapeHtml(actual.actionLabel) + '</strong></div>' +
        '<section><span>' + icon("shield") + '</span><div><h3>Why this response is best</h3><p>' + escapeHtml(app.state.settings.plainLanguage && scenario.debrief.plain ? scenario.debrief.plain : scenario.debrief.what) + '</p></div></section>' +
        '<section><span>' + icon("target") + '</span><div><h3>Strongest evidence</h3><p>' + escapeHtml(scenario.debrief.strongest) + '</p></div></section>' +
        '<section><span>' + icon("arrow") + '</span><div><h3>Safest next step</h3><p>' + escapeHtml(scenario.debrief.next) + '</p></div></section>' +
        '<button type="button" class="sd-simple-next" data-action="next-case">' + (isLast ? 'Finish mission' : 'Next case') + icon("arrow") + '</button>' +
      '</div>' +
    '</aside>';
  }

  function renderSimpleRecordedPanel() {
    const isLast = app.session.index >= app.session.queue.length - 1;
    return '<aside class="sd-play-card sd-simple-side-panel sd-simple-recorded"><div>' + icon("check") + '<h2>Answer recorded</h2><p>Continue when you are ready. The case explanations will appear after the assessment.</p><button type="button" class="sd-simple-next" data-action="next-case">' + (isLast ? 'Finish assessment' : 'Next case') + icon("arrow") + '</button></div></aside>';
  }

  function renderPlay() {
    const session = app.session;
    if (!session) {
      app.view = "home";
      renderHome();
      return;
    }
    if (!session.currentCase && !startCase(session)) {
      completeSession();
      return;
    }
    const currentCase = session.currentCase;
    const scenario = getScenario(currentCase.scenarioId, app.state);
    if (!scenario) {
      completeSession();
      return;
    }
    const side = currentCase.phase === "debrief"
      ? renderSimpleDebriefPanel(scenario, currentCase)
      : currentCase.phase === "recorded"
        ? renderSimpleRecordedPanel()
        : currentCase.phase === "evidence"
          ? renderSimpleEvidencePanel(scenario, currentCase)
          : renderSimpleDecisionPanel(scenario, currentCase);
    const content = renderGameHeader(session) + renderSimpleCaseBanner(scenario, currentCase) +
      '<div class="sd-simple-workspace sd-simple-phase-' + escapeAttr(currentCase.phase) + '">' + renderSimpleArtifactPanel(scenario, currentCase) + side + '</div>';
    renderGameShell(content);
  }

  function evidenceScoreFor(scenario, selectedIds) {
    const best = scenario.bestEvidence || [];
    if (!best.length) return 100;
    const hits = selectedIds.filter(function (id) { return best.includes(id); }).length;
    const extras = selectedIds.filter(function (id) { return !best.includes(id); }).length;
    return clamp(Math.round((hits / best.length) * 100 - extras * 12), 0, 100);
  }

  function responseScoreFor(response, order) {
    if (!response) return null;
    const correct = response.correctOrder.slice(0, response.maxSteps);
    const perStep = 100 / correct.length;
    let score = 0;
    order.forEach(function (id, index) {
      if (id === correct[index]) score += perStep;
      else if (correct.includes(id)) score += perStep * 0.5;
    });
    return clamp(Math.round(score), 0, 100);
  }



  function evaluateAnalysis(scenario, currentCase) {
    const assessmentCorrect = currentCase.choices.assessment === scenario.correctAssessment;
    const actionCorrect = currentCase.choices.action === scenario.correctAction;
    const rationale = scenario.rationales.find(function (item) { return item.id === currentCase.choices.rationale; });
    const rationaleCorrect = Boolean(rationale && rationale.correct);
    const evidenceScore = evidenceScoreFor(scenario, currentCase.selectedEvidence);
    const analysisCorrect = assessmentCorrect && actionCorrect;
    const independence = clamp(100 - currentCase.hintLevel * 20, 0, 100);
    return {
      assessmentCorrect: assessmentCorrect,
      actionCorrect: actionCorrect,
      rationaleCorrect: rationaleCorrect,
      analysisCorrect: analysisCorrect,
      evidenceScore: evidenceScore,
      decisionScore: Math.round(((assessmentCorrect ? 100 : 0) + (actionCorrect ? 100 : 0)) / 2),
      rationaleScore: rationaleCorrect ? 100 : 0,
      independence: independence
    };
  }

  function buildMisconceptions(scenario, currentCase, scores) {
    if (scores.simpleMode) {
      if (!scores.assessmentCorrect) return ["Classification mismatch"];
      if (currentCase.simpleEvidenceChoice && !scores.rationaleCorrect) return ["Evidence selection mismatch"];
      return [];
    }
    const output = [];
    if (!scores.assessmentCorrect) output.push("Classification mismatch");
    if (!scores.actionCorrect) output.push("Response action mismatch");
    if (scores.evidenceScore < 60) output.push("Weak or incomplete evidence selection");
    if (!scores.rationaleCorrect) output.push(scenario.misconceptionTags[0] || "Reasoning misconception");
    return unique(output);
  }

  function finalizeCaseResult(scenario, currentCase, responseScore) {
    const scores = currentCase.pendingScores || evaluateAnalysis(scenario, currentCase);
    const simpleMode = Boolean(scores.simpleMode);
    const hasResponse = Boolean(scenario.response) && !simpleMode;
    const baseScore = simpleMode
      ? (scores.assessmentCorrect ? 100 : 0)
      : hasResponse
        ? Math.round(scores.evidenceScore * 0.30 + (scores.assessmentCorrect ? 100 : 0) * 0.15 + (scores.actionCorrect ? 100 : 0) * 0.15 + scores.rationaleScore * 0.20 + (responseScore || 0) * 0.20)
        : Math.round(scores.evidenceScore * 0.35 + (scores.assessmentCorrect ? 100 : 0) * 0.25 + (scores.actionCorrect ? 100 : 0) * 0.20 + scores.rationaleScore * 0.20);
    const branchScore = simpleMode
      ? null
      : currentCase.branchState && currentCase.branchState.scores && currentCase.branchState.scores.length
        ? Math.round(average(currentCase.branchState.scores))
        : null;
    const score = branchScore == null ? baseScore : Math.round(baseScore * 0.85 + branchScore * 0.15);
    const queueItem = app.session.queue[app.session.index];
    const duration = Math.max(1, Math.round((Date.now() - new Date(currentCase.startedAt).getTime()) / 1000));
    const result = {
      sessionId: app.session.id,
      scenarioId: scenario.id,
      scenarioVersion: scenario.version || DATA.version,
      title: scenario.title,
      mission: scenario.mission,
      source: app.session.source,
      mode: app.session.mode,
      simpleMode: simpleMode,
      isPractice: Boolean(queueItem && queueItem.isPractice),
      relatedTo: queueItem && queueItem.relatedTo || null,
      assessmentPair: scenario.assessmentPair || null,
      assessmentSet: scenario.assessmentSet || null,
      score: clamp(score, 0, 100),
      points: simpleMode ? (scores.assessmentCorrect ? SIMPLE_DECISION_POINTS + Number(scores.evidenceBonus || 0) : 0) : clamp(score, 0, 100),
      decisionPoints: simpleMode && scores.assessmentCorrect ? SIMPLE_DECISION_POINTS : 0,
      evidenceBonus: simpleMode ? Number(scores.evidenceBonus || 0) : 0,
      evidenceChoice: simpleMode ? (currentCase.simpleEvidenceChoice || null) : null,
      evidenceScore: scores.evidenceScore,
      decisionScore: scores.decisionScore,
      rationaleScore: scores.rationaleScore,
      responseScore: hasResponse ? responseScore : null,
      branchScore: branchScore,
      branchPath: currentCase.branchState ? clone(currentCase.branchState.path || []) : [],
      independence: scores.independence,
      assessmentCorrect: scores.assessmentCorrect,
      actionCorrect: scores.actionCorrect,
      rationaleCorrect: scores.rationaleCorrect,
      analysisCorrect: scores.analysisCorrect,
      assessment: currentCase.choices.assessment,
      action: currentCase.choices.action,
      rationale: currentCase.choices.rationale,
      evidenceInspected: currentCase.inspected.slice(),
      evidenceSelected: currentCase.selectedEvidence.slice(),
      responseOrder: currentCase.responseOrder.slice(),
      hintLevel: currentCase.hintLevel,
      attemptNumber: app.state.history.filter(function (item) { return item.scenarioId === scenario.id; }).length + 1,
      misconceptions: buildMisconceptions(scenario, currentCase, scores),
      competencies: scenario.competencies.slice(),
      standards: scenario.standards.slice(),
      note: app.session.collectNotes ? currentCase.choices.note.slice(0, 600) : "",
      timeSpentSeconds: duration,
      completedAt: new Date().toISOString()
    };
    currentCase.finalResult = result;
    app.session.results.push(clone(result));
    if (app.session.mode === "arcade") {
      const damage = result.score < 70 ? 20 : result.score < 85 ? 5 : 0;
      app.session.integrity = clamp(app.session.integrity - damage, 0, 100);
    }
    dispatch("spoof-detective:answer", {
      sessionId: result.sessionId,
      scenarioId: result.scenarioId,
      scenarioVersion: result.scenarioVersion,
      mission: result.mission,
      learningObjective: getMission(result.mission) ? getMission(result.mission).objective : "",
      standards: result.standards,
      evidenceInspected: result.evidenceInspected,
      evidenceSelected: result.evidenceSelected,
      classification: result.assessment,
      responseAction: result.action,
      timeSpent: result.timeSpentSeconds,
      misconceptionTags: result.misconceptions,
      hintLevel: result.hintLevel,
      attemptNumber: result.attemptNumber,
      score: result.score,
      points: result.points,
      evidenceBonus: result.evidenceBonus,
      evidenceChoice: result.evidenceChoice,
      branchScore: result.branchScore,
      branchPath: result.branchPath
    });
    dispatch("spoof-detective:casecomplete", {
      sessionId: result.sessionId,
      scenarioId: result.scenarioId,
      score: result.score,
      mission: result.mission,
      isPractice: result.isPractice
    });
    if (app.session.mode === "assessment") currentCase.phase = "recorded";
    else currentCase.phase = "debrief";
    currentCase.pendingScores = null;
    saveActiveSession(app.session);
    render();
  }

  function renderRecordedPanel(scenario, currentCase) {
    const isLast = app.session.index >= app.session.queue.length - 1;
    return renderAgent("Your response has been recorded. Explanations are withheld until the assessment is complete so later cases remain unseen.", true) +
      '<div class="sd-panel-body"><div class="sd-empty-state">' + icon("check") + '<h3>Case recorded</h3><p>You can review the complete evidence explanations after the final case.</p><button type="button" class="sd-button sd-button-primary" data-action="next-case">' + (isLast ? "Finish assessment" : "Continue") + icon("arrow") + '</button></div></div>';
  }

  function advanceCase() {
    if (!app.session) return;
    app.session.index += 1;
    if (app.session.index >= app.session.queue.length || (app.session.mode === "arcade" && app.session.integrity <= 0)) {
      completeSession();
      return;
    }
    startCase(app.session);
    render();
  }

  function insertNearTransferPractice() {
    const session = app.session;
    const currentCase = session && session.currentCase;
    if (!session || !currentCase) return;
    const scenario = getScenario(currentCase.scenarioId, app.state);
    if (!scenario || !scenario.nearTransferId) return;
    const target = getScenario(scenario.nearTransferId, app.state);
    if (!target || target.assessmentSet) return;
    session.queue.splice(session.index + 1, 0, {
      scenarioId: target.id,
      isPractice: true,
      relatedTo: scenario.id
    });
    saveActiveSession(session);
    notify("A related transfer case was added next.", "success");
    advanceCase();
  }

  function competencyResultScore(result, competencyId) {
    if (competencyId === "evidence_analysis" || competencyId === "domain_analysis") return result.evidenceScore;
    if (competencyId === "risk_communication") {
      return Math.round(average([result.rationaleScore, result.responseScore == null ? (result.actionCorrect ? 100 : 0) : result.responseScore, result.branchScore == null ? result.rationaleScore : result.branchScore]));
    }
    if (competencyId === "incident_response") {
      return Math.round(average([result.responseScore == null ? (result.actionCorrect ? 100 : 0) : result.responseScore, result.branchScore == null ? (result.actionCorrect ? 100 : 0) : result.branchScore]));
    }
    if (competencyId === "identity_verification") return Math.round(average([result.evidenceScore, result.decisionScore]));
    if (competencyId === "defensive_controls" || competencyId === "authentication") {
      return Math.round(average([result.score, result.actionCorrect ? 100 : 0, result.responseScore == null ? result.score : result.responseScore]));
    }
    if (competencyId === "risk_communication") return result.rationaleScore;
    return result.score;
  }

  function evaluateBadges(state) {
    const earned = new Set(state.badges);
    const domain = state.competencyStats.domain_analysis;
    if (state.counters.strongEvidenceCases >= 5) earned.add("evidence_analyst");
    if (state.counters.correctVerifications >= 3) earned.add("verification_specialist");
    if (domain.attempts >= 5 && competencyScore(domain) >= 75) earned.add("domain_detective");
    if (state.counters.strongResponses >= 3) earned.add("incident_responder");
    if (state.counters.correctRationales >= 5) earned.add("clear_communicator");
    if (state.counters.defenseCases >= 5) earned.add("defense_in_depth");
    if (DATA.missions.every(function (mission) { return Number(state.missionMastery[mission.id] || 0) >= mission.passScore; })) earned.add("spoof_detective_master");
    return Array.from(earned);
  }

  function sessionSummary(session) {
    const official = session.results.filter(function (result) { return !result.isPractice; });
    const scores = official.map(function (result) { return result.score; });
    const evidence = official.map(function (result) { return result.evidenceScore; });
    const response = official.filter(function (result) { return result.responseScore != null; }).map(function (result) { return result.responseScore; });
    const simpleSession = official.length > 0 && official.every(function (result) { return result.simpleMode; });
    const totalPoints = official.reduce(function (sum, result) { return sum + Number(result.points || 0); }, 0);
    const bonusPoints = official.reduce(function (sum, result) { return sum + Number(result.evidenceBonus || 0); }, 0);
    const summary = {
      sessionId: session.id,
      title: session.title,
      source: session.source,
      mode: session.mode,
      caseCount: official.length,
      practiceCount: session.results.length - official.length,
      averageScore: Math.round(average(scores)),
      evidenceScore: Math.round(average(evidence)),
      decisionScore: Math.round(average(official.map(function (result) { return result.decisionScore; }))),
      totalPoints: totalPoints,
      bonusPoints: bonusPoints,
      responseScore: response.length ? Math.round(average(response)) : null,
      integrity: session.integrity,
      passed: official.length > 0 && (simpleSession ? average(official.map(function (result) { return result.decisionScore; })) >= PASS_SCORE : average(scores) >= PASS_SCORE && average(evidence) >= 60) && !(session.mode === "arcade" && session.integrity <= 0),
      results: official.map(function (result) { return clone(result); }),
      allResults: session.results.map(function (result) { return clone(result); }),
      newBadges: [],
      completedAt: new Date().toISOString()
    };
    return summary;
  }

  function applySessionProgress(summary) {
    const beforeBadges = new Set(app.state.badges);
    const state = normalizeState(app.state);
    const allResults = summary.allResults;
    allResults.forEach(function (result) {
      state.history.push(clone(result));
      if (result.isPractice) return;
      if (result.simpleMode) {
        if (result.evidenceBonus > 0) state.counters.strongEvidenceCases += 1;
        if (result.action === "verify" && result.actionCorrect) state.counters.correctVerifications += 1;
        if (result.evidenceBonus > 0) state.counters.correctRationales += 1;
        if (result.competencies.includes("defensive_controls") && result.assessmentCorrect) state.counters.defenseCases += 1;
      } else {
        if (result.evidenceScore >= 80) state.counters.strongEvidenceCases += 1;
        if (result.action === "verify" && result.actionCorrect) state.counters.correctVerifications += 1;
        if (result.rationaleCorrect) state.counters.correctRationales += 1;
        if (result.responseScore != null && result.responseScore >= 80) state.counters.strongResponses += 1;
        if (result.competencies.includes("defensive_controls") && result.score >= 70) state.counters.defenseCases += 1;
      }
      result.competencies.forEach(function (competencyId) {
        if (!state.competencyStats[competencyId]) return;
        const score = competencyResultScore(result, competencyId);
        state.competencyStats[competencyId].attempts += 1;
        state.competencyStats[competencyId].totalScore += score;
        state.competencyStats[competencyId].lastScore = score;
      });
    });
    state.history = state.history.slice(-MAX_HISTORY);

    if (["mission", "teacher"].includes(summary.source)) {
      DATA.missions.forEach(function (mission) {
        const missionResults = summary.results.filter(function (result) { return result.mission === mission.id; });
        if (!missionResults.length) return;
        const score = Math.round(average(missionResults.map(function (result) { return result.score; })));
        const evidence = Math.round(average(missionResults.map(function (result) { return result.evidenceScore; })));
        const simpleMission = missionResults.every(function (result) { return result.simpleMode; });
        let mastery = simpleMission ? Math.round(average(missionResults.map(function (result) { return result.decisionScore; }))) : Math.round(score * 0.75 + evidence * 0.25);
        if (!simpleMission && evidence < 60) mastery = Math.min(mastery, 69);
        state.missionMastery[mission.id] = Math.max(Number(state.missionMastery[mission.id] || 0), mastery);
        if (mastery >= mission.passScore && !state.completedMissions.includes(mission.id)) state.completedMissions.push(mission.id);
      });
    }

    const assessmentRecord = {
      score: summary.averageScore,
      evidenceScore: summary.evidenceScore,
      decisionScore: summary.decisionScore,
      totalPoints: summary.totalPoints,
      bonusPoints: summary.bonusPoints,
      caseCount: summary.caseCount,
      completedAt: summary.completedAt,
      results: summary.results.map(function (result) {
        const copy = clone(result);
        copy.note = "";
        return copy;
      })
    };
    if (summary.source === "pretest") state.diagnostic = assessmentRecord;
    if (summary.source === "posttest") state.posttest = assessmentRecord;

    state.badges = evaluateBadges(state);
    summary.newBadges = state.badges.filter(function (id) { return !beforeBadges.has(id); });
    app.state = saveState(state);
  }

  function completeSession() {
    if (!app.session) return;
    app.session.completedAt = new Date().toISOString();
    const summary = sessionSummary(app.session);
    if (app.session.recordProgress) applySessionProgress(summary);
    app.lastSummary = summary;
    const sourceSession = app.session;
    app.session = null;
    saveActiveSession(null);
    app.view = "complete";
    dispatch("spoof-detective:sessioncomplete", {
      sessionId: summary.sessionId,
      source: summary.source,
      mode: summary.mode,
      averageScore: summary.averageScore,
      evidenceScore: summary.evidenceScore,
      decisionScore: summary.decisionScore,
      totalPoints: summary.totalPoints,
      bonusPoints: summary.bonusPoints,
      passed: summary.passed,
      caseCount: summary.caseCount
    });
    if (summary.source === "mission" && sourceSession.missionIds.length === 1) {
      dispatch("spoof-detective:missioncomplete", {
        missionId: sourceSession.missionIds[0],
        score: summary.averageScore,
        evidenceScore: summary.evidenceScore,
        passed: summary.passed
      });
    }
    dispatch("spoof-detective:progress", {
      missionMastery: clone(app.state.missionMastery),
      badges: app.state.badges.slice(),
      competencyStats: clone(app.state.competencyStats)
    });
    render();
  }

  function assessmentComparison() {
    if (!app.state.diagnostic || !app.state.posttest) return null;
    return {
      score: app.state.posttest.score - app.state.diagnostic.score,
      evidence: app.state.posttest.evidenceScore - app.state.diagnostic.evidenceScore,
      decision: (app.state.posttest.decisionScore || 0) - (app.state.diagnostic.decisionScore || 0)
    };
  }

  function renderAssessmentReview(summary) {
    return '<div class="sd-assessment-review">' + summary.results.map(function (result) {
      const scenario = getScenario(result.scenarioId, app.state);
      if (!scenario) return "";
      const assessment = DATA.assessments[scenario.correctAssessment];
      const action = DATA.actions[scenario.correctAction];
      return '<article class="sd-review-row"><div class="sd-review-row-header"><strong>' + escapeHtml(scenario.title) + '</strong><span class="sd-pill ' + (result.score >= 70 ? "sd-pill-green" : "sd-pill-yellow") + '">' + result.score + '%</span></div><p><strong>Evidence-supported conclusion:</strong> ' + escapeHtml(assessment.label) + ' · <strong>Action:</strong> ' + escapeHtml(action.label) + '</p><p style="margin-top:7px"><strong>Why:</strong> ' + escapeHtml(scenario.debrief.strongest) + '</p><p style="margin-top:7px"><strong>Next:</strong> ' + escapeHtml(app.state.settings.plainLanguage ? scenario.debrief.plain : scenario.debrief.next) + '</p></article>';
    }).join("") + '</div>';
  }

  function renderComplete() {
    const summary = app.lastSummary;
    if (!summary) {
      app.view = "home";
      renderHome();
      return;
    }
    const correct = summary.results.filter(function (result) { return result.assessmentCorrect; }).length;
    const accuracy = summary.caseCount ? Math.round((correct / summary.caseCount) * 100) : 0;
    const bonusPoints = Number(summary.bonusPoints || 0);
    const totalPoints = Number(summary.totalPoints || 0);
    const passed = accuracy >= PASS_SCORE;
    const heading = summary.mode === "assessment"
      ? "Assessment complete"
      : passed ? "Mission complete" : "Mission reviewed";
    const message = passed
      ? "Strong work. You correctly classified most of the cases."
      : "You finished the mission. Review the patterns you missed, then try again when ready.";
    const content = '<div class="sd-simple-complete">' +
      '<section class="sd-simple-complete-card">' +
        '<div class="sd-simple-complete-icon">' + icon(passed ? "trophy" : "book") + '</div>' +
        '<div class="sd-eyebrow">Session complete</div><h1>' + escapeHtml(heading) + '</h1><p>' + escapeHtml(message) + '</p>' +
        '<div class="sd-simple-complete-score"><strong>' + accuracy + '%</strong><span>Accuracy</span></div>' +
        '<div class="sd-simple-complete-stats"><div><strong>' + correct + ' / ' + summary.caseCount + '</strong><span>Correct decisions</span></div><div><strong>+' + bonusPoints + '</strong><span>Evidence bonus</span></div><div><strong>' + totalPoints + '</strong><span>Total points</span></div></div>' +
        '<div class="sd-button-row"><button type="button" class="sd-button sd-button-primary" data-action="navigate" data-view="missions">' + icon("missions") + 'Choose a mission</button><button type="button" class="sd-button" data-action="navigate" data-view="home">' + icon("home") + 'Home</button><button type="button" class="sd-button" data-action="navigate" data-view="stats">' + icon("chart") + 'Progress</button></div>' +
      '</section>' +
    '</div>';
    renderShell(content);
  }

  function lowestCompetency() {
    const assessed = Object.keys(app.state.competencyStats).map(function (id) {
      const item = app.state.competencyStats[id];
      return { id: id, attempts: item.attempts, score: competencyScore(item) };
    });
    assessed.sort(function (a, b) {
      if (!a.attempts && b.attempts) return -1;
      if (a.attempts && !b.attempts) return 1;
      return a.score - b.score;
    });
    return assessed[0] || null;
  }

  function renderStats() {
    const attempts = app.state.history.filter(function (result) { return !result.isPractice; });
    const correct = attempts.filter(function (result) { return result.assessmentCorrect; }).length;
    const accuracy = attempts.length ? Math.round((correct / attempts.length) * 100) : 0;
    const completed = DATA.missions.filter(function (mission) {
      return Number(app.state.missionMastery[mission.id] || 0) >= mission.passScore;
    }).length;
    const bonusPoints = attempts.reduce(function (sum, result) { return sum + Number(result.evidenceBonus || 0); }, 0);
    const missionCards = DATA.missions.map(function (mission) {
      const score = Number(app.state.missionMastery[mission.id] || 0);
      const status = score >= mission.passScore ? "Complete" : score ? "In progress" : "Not started";
      return '<article class="sd-simple-progress-mission"><div><span>Mission ' + mission.number + '</span><h3>' + escapeHtml(mission.title) + '</h3></div><strong>' + (score ? score + '%' : '—') + '</strong><small>' + escapeHtml(status) + '</small></article>';
    }).join("");
    const recent = attempts.slice(-10).reverse();
    const history = recent.length ? recent.map(function (result) {
      const scenario = getScenario(result.scenarioId, app.state);
      const chosen = simpleAssessmentMeta(result.assessment).label;
      const actual = scenario ? simpleAssessmentMeta(scenario.correctAssessment).label : "Unknown";
      return '<div class="sd-simple-history-row"><span class="sd-simple-history-result ' + (result.assessmentCorrect ? 'sd-correct' : 'sd-review') + '">' + icon(result.assessmentCorrect ? "check" : "alert") + '</span><div><strong>' + escapeHtml(scenario ? scenario.title : result.title || result.scenarioId) + '</strong><small>Your call: ' + escapeHtml(chosen) + ' · Best answer: ' + escapeHtml(actual) + ' · Evidence bonus: +' + Number(result.evidenceBonus || 0) + '</small></div><time>' + escapeHtml(formatDate(result.completedAt)) + '</time></div>';
    }).join("") : '<div class="sd-empty-state">' + icon("search") + '<p>Complete a mission to see your recent cases here.</p></div>';
    const content = '<header class="sd-page-heading"><div class="sd-eyebrow">Your progress</div><h1>Simple results at a glance.</h1><p>Accuracy, completed missions, and recent calls are stored locally in this browser.</p></header>' +
      '<div class="sd-metric-grid sd-simple-progress-metrics"><div class="sd-metric"><strong>' + attempts.length + '</strong><span>Cases completed</span></div><div class="sd-metric"><strong>' + (attempts.length ? accuracy + '%' : '—') + '</strong><span>Decision accuracy</span></div><div class="sd-metric"><strong>+' + bonusPoints + '</strong><span>Evidence bonus points</span></div><div class="sd-metric"><strong>' + completed + ' / ' + DATA.missions.length + '</strong><span>Missions complete</span></div></div>' +
      '<div class="sd-simple-progress-layout"><section class="sd-section-card"><div class="sd-section-heading"><h2>Mission progress</h2><button type="button" class="sd-button sd-button-small sd-button-primary" data-action="navigate" data-view="missions">' + icon("play") + 'Choose a mission</button></div><div class="sd-simple-progress-missions">' + missionCards + '</div></section>' +
      '<section class="sd-section-card"><div class="sd-section-heading"><h2>Recent calls</h2><span>Last ' + recent.length + '</span></div><div class="sd-simple-history">' + history + '</div><div class="sd-button-row" style="margin-top:14px"><button type="button" class="sd-button sd-button-small" data-action="export-csv">' + icon("export") + 'Export CSV</button><button type="button" class="sd-button sd-button-small" data-action="export-json">' + icon("download") + 'Export JSON</button></div></section></div>';
    renderShell(content);
  }

  function scenarioTemplate() {
    return {
      id: "custom-example-case",
      mission: "recognize",
      title: "Example Custom Case",
      type: "email",
      technique: "Custom classroom scenario",
      context: "Describe what the learner knows before examining the artifact.",
      artifact: {
        kind: "email",
        app: "School Mail",
        fromName: "Example Sender",
        fromAddress: "sender@training.example",
        replyTo: "sender@training.example",
        to: "student@school.example",
        date: "10:00 AM",
        subject: "Example subject",
        body: ["Example message body."],
        link: { text: "Open example", url: "https://training.example/example" }
      },
      inspections: [
        { id: "identity", label: "Sender identity", icon: "identity", result: "Explain what the sender details reveal.", evidence: ["identity_evidence"] },
        { id: "destination", label: "Destination preview", icon: "link", result: "Explain what the destination reveals.", evidence: ["destination_evidence"] },
        { id: "request", label: "Requested action", icon: "shield", result: "Explain whether the requested action fits the context.", evidence: ["request_evidence"] }
      ],
      evidence: [
        { id: "identity_evidence", label: "Identity evidence", detail: "Describe why this evidence matters.", strength: "strong", polarity: "risk", source: "identity" },
        { id: "destination_evidence", label: "Destination evidence", detail: "Describe why this evidence matters.", strength: "strong", polarity: "risk", source: "destination" },
        { id: "request_evidence", label: "Request evidence", detail: "Describe why this evidence matters.", strength: "moderate", polarity: "risk", source: "request" }
      ],
      bestEvidence: ["identity_evidence", "destination_evidence"],
      correctAssessment: "malicious",
      correctAction: "report",
      rationale: "Write the strongest evidence-centered explanation.",
      distractors: ["Write a weak explanation.", "Write an incorrect explanation."],
      hints: ["Add a scaffolded hint."],
      misconceptionTags: ["Name the likely misconception"],
      competencies: ["social_engineering", "identity_verification"],
      consequence: { ideal: "Describe the safe outcome.", unsafe: "Describe the unsafe outcome." },
      debrief: {
        what: "Identify the case type.",
        strongest: "Explain the decisive evidence.",
        inconclusive: "Explain what was weak or inconclusive.",
        next: "Explain the safest next action.",
        plain: "Provide a plain-language explanation."
      }
    };
  }

  function normalizeImportedScenario(candidate) {
    if (!candidate || typeof candidate !== "object") throw new Error("Scenario must be a JSON object.");
    const required = ["mission", "title", "artifact", "inspections", "evidence", "bestEvidence", "correctAssessment", "correctAction", "debrief"];
    required.forEach(function (field) {
      if (candidate[field] == null) throw new Error("Missing required field: " + field);
    });
    if (!getMission(candidate.mission)) throw new Error("Unknown mission: " + candidate.mission);
    if (!DATA.assessments[candidate.correctAssessment]) throw new Error("Unknown assessment: " + candidate.correctAssessment);
    if (!DATA.actions[candidate.correctAction]) throw new Error("Unknown action: " + candidate.correctAction);
    if (!Array.isArray(candidate.inspections) || candidate.inspections.length < 2) throw new Error("At least two inspections are required.");
    if (!Array.isArray(candidate.evidence) || candidate.evidence.length < 2) throw new Error("At least two evidence items are required.");
    const id = "custom-" + slugify(candidate.id || candidate.title) + "-" + Math.random().toString(36).slice(2, 6);
    const mission = getMission(candidate.mission);
    const rationale = candidate.rationale || "The evidence supports the selected conclusion and response.";
    const distractors = Array.isArray(candidate.distractors) && candidate.distractors.length >= 2
      ? candidate.distractors.slice(0, 2)
      : ["The message looks professional, so no additional evidence is needed.", "One surface-level clue proves the conclusion by itself."];
    const scenario = Object.assign({}, clone(candidate), {
      id: id,
      custom: true,
      version: DATA.version,
      assessmentSet: null,
      nearTransferId: null,
      type: candidate.type || candidate.artifact.kind || "email",
      technique: candidate.technique || "Teacher-created scenario",
      context: candidate.context || "Review the artifact and support your decision with evidence.",
      hints: Array.isArray(candidate.hints) ? candidate.hints.slice(0, 4) : [],
      misconceptionTags: Array.isArray(candidate.misconceptionTags) ? candidate.misconceptionTags.slice(0, 8) : ["Surface appearance over evidence"],
      competencies: Array.isArray(candidate.competencies) && candidate.competencies.length ? candidate.competencies.filter(function (id) { return DATA.competencies[id]; }) : mission.competencies.slice(),
      standards: Array.isArray(candidate.standards) && candidate.standards.length ? candidate.standards.slice(0, 12) : (DATA.missionStandards[candidate.mission] || []).slice(),
      minEvidence: clamp(Number(candidate.minEvidence) || 2, 1, 3),
      maxEvidence: clamp(Number(candidate.maxEvidence) || 3, 2, 4),
      rationale: rationale,
      distractors: distractors,
      rationales: [
        { id: "best", text: rationale, correct: true },
        { id: "weak", text: distractors[0], correct: false },
        { id: "incorrect", text: distractors[1], correct: false }
      ],
      consequence: candidate.consequence || { ideal: "The learner chooses an evidence-based safe action.", unsafe: "An unsupported decision creates avoidable risk or a false positive." }
    });
    return scenario;
  }

  function buildScenarioFromForm(form) {
    const data = new FormData(form);
    const title = String(data.get("title") || "Custom Case").trim();
    const missionId = String(data.get("mission") || "recognize");
    const kind = String(data.get("kind") || "email");
    const sender = String(data.get("sender") || "Training Sender").trim();
    const subject = String(data.get("subject") || "Review this request").trim();
    const body = String(data.get("body") || "Please review this request.").trim();
    const correctAssessment = String(data.get("assessment") || "uncertain");
    const correctAction = String(data.get("action") || "verify");
    const strongest = String(data.get("strongest") || "The identity and requested action should be verified independently.").trim();
    const secondary = String(data.get("secondary") || "The request does not fully match the expected context.").trim();
    const debriefText = String(data.get("debrief") || "Use independent evidence and a trusted channel before acting.").trim();
    const risk = correctAssessment === "legitimate" ? "safe" : "risk";
    let artifact;
    if (kind === "text") {
      artifact = { kind: "text", app: "Messages", sender: sender, contactLabel: "Classroom Scenario", time: "Today", message: body, link: { text: "training.example/review", url: "https://training.example/review" } };
    } else if (kind === "dm") {
      artifact = { kind: "dm", app: "Community Chat", platform: "Direct message", profileName: sender, handle: "@training_account", status: "Classroom scenario", time: "Today", message: body, link: { text: "Review request", url: "https://training.example/review" } };
    } else {
      artifact = { kind: "email", app: "School Mail", fromName: sender, fromAddress: "sender@training.example", replyTo: "sender@training.example", to: "student@school.example", date: "Today", subject: subject, body: [body], link: { text: "Review request", url: "https://training.example/review" } };
    }
    return normalizeImportedScenario({
      id: slugify(title),
      mission: missionId,
      title: title,
      type: kind,
      technique: "Teacher-created classroom scenario",
      context: "This case was created locally by the teacher. Analyze it using the same evidence-based process as the authored missions.",
      artifact: artifact,
      inspections: [
        { id: "sender", label: "Identity details", icon: "identity", result: strongest, evidence: ["custom_identity"] },
        { id: "link", label: "Destination preview", icon: "link", result: secondary, evidence: ["custom_destination"] },
        { id: "request", label: "Requested action", icon: "shield", result: body, evidence: ["custom_request"] }
      ],
      evidence: [
        { id: "custom_identity", label: "Identity evidence", detail: strongest, strength: "strong", polarity: risk, source: "sender" },
        { id: "custom_destination", label: "Destination or context evidence", detail: secondary, strength: "strong", polarity: risk, source: "link" },
        { id: "custom_request", label: "Requested action", detail: body, strength: "moderate", polarity: risk, source: "request" }
      ],
      bestEvidence: ["custom_identity", "custom_destination"],
      correctAssessment: correctAssessment,
      correctAction: correctAction,
      rationale: debriefText,
      distractors: ["The visual appearance is enough to decide without verification.", "A single emotional cue proves the conclusion."],
      hints: ["Compare the identity, destination, and request with an independent source."],
      misconceptionTags: ["Appearance over evidence"],
      debrief: {
        what: "A teacher-created classroom case.",
        strongest: strongest,
        inconclusive: "Surface appearance and emotional tone should not be treated as decisive evidence by themselves.",
        next: debriefText,
        plain: debriefText
      },
      consequence: {
        ideal: "The learner uses evidence and the appropriate response channel.",
        unsafe: "The learner acts on an unsupported assumption or creates an avoidable false positive."
      }
    });
  }

  function teacherLearningPatterns() {
    const official = app.state.history.filter(function (result) { return !result.isPractice; }).slice(-100);
    const missedEvidence = {};
    const misconceptions = {};
    official.forEach(function (result) {
      const scenario = getScenario(result.scenarioId, app.state);
      if (scenario) {
        (scenario.bestEvidence || []).forEach(function (evidenceId) {
          if ((result.evidenceSelected || []).includes(evidenceId)) return;
          const evidence = (scenario.evidence || []).find(function (item) { return item.id === evidenceId; });
          const label = evidence ? evidence.label : evidenceId;
          missedEvidence[label] = (missedEvidence[label] || 0) + 1;
        });
      }
      (result.misconceptions || []).forEach(function (tag) {
        misconceptions[tag] = (misconceptions[tag] || 0) + 1;
      });
    });
    function topEntries(source) {
      return Object.keys(source).map(function (label) { return { label: label, count: source[label] }; }).sort(function (a, b) {
        return b.count - a.count || a.label.localeCompare(b.label);
      }).slice(0, 5);
    }
    return {
      attempts: official.length,
      averageScore: official.length ? Math.round(average(official.map(function (result) { return result.score; }))) : null,
      averageEvidence: official.length ? Math.round(average(official.map(function (result) { return result.evidenceScore; }))) : null,
      missedEvidence: topEntries(missedEvidence),
      misconceptions: topEntries(misconceptions)
    };
  }

  function patternRows(items, emptyMessage) {
    if (!items.length) return '<div class="sd-empty-evidence">' + escapeHtml(emptyMessage) + '</div>';
    return items.map(function (item) {
      return '<div class="sd-inline-note">' + icon("search") + '<div><strong>' + escapeHtml(item.label) + '</strong><br><span>' + item.count + ' recorded miss' + (item.count === 1 ? '' : 'es') + '</span></div></div>';
    }).join('');
  }

  function renderTeacher() {
    const d = app.teacherDefaults;
    const patterns = teacherLearningPatterns();
    const customList = app.state.customScenarios.length ? app.state.customScenarios.map(function (scenario) {
      return '<div class="sd-custom-scenario"><span><strong>' + escapeHtml(scenario.title) + '</strong><small>' + escapeHtml((getMission(scenario.mission) || {}).title || scenario.mission) + ' · ' + escapeHtml(scenario.artifact.kind) + '</small></span><button type="button" class="sd-button sd-button-small sd-button-danger" data-action="delete-custom" data-scenario="' + escapeAttr(scenario.id) + '">' + icon("trash") + 'Delete</button></div>';
    }).join("") : '<div class="sd-empty-evidence">No custom scenarios are stored in this browser.</div>';
    const missionOptions = '<option value="all">All five missions</option>' + DATA.missions.map(function (mission) { return '<option value="' + mission.id + '"' + (d.mission === mission.id ? " selected" : "") + '>Mission ' + mission.number + ': ' + escapeHtml(mission.title) + '</option>'; }).join("");
    const competencyOptions = '<option value="all">All competencies</option>' + Object.keys(DATA.competencies).map(function (id) {
      const competency = DATA.competencies[id];
      return '<option value="' + escapeAttr(id) + '"' + (d.competency === id ? " selected" : "") + '>' + escapeHtml(competency.name) + '</option>';
    }).join("");
    const content = '<header class="sd-page-heading"><div class="sd-eyebrow">Classroom tools</div><h1>Assign comparable cases and export learning evidence.</h1><p>All settings and student results remain in this browser unless a user deliberately exports them. A shared seed gives learners a comparable scenario mix without exposing answer order.</p></header>' +
      '<div class="sd-teacher-layout"><div>' +
        '<section class="sd-section-card"><h2>Launch a classroom session</h2><p>Learning mode provides debriefs after each case. Assessment mode withholds explanations until the end. Arcade mode adds an optional system-integrity meter but never rewards speed.</p>' +
          '<form id="sd-teacher-session-form" class="sd-form-grid">' +
            '<div><label class="sd-form-label" for="sd-teacher-mode">Mode</label><select class="sd-select" id="sd-teacher-mode" name="mode"><option value="learning"' + (d.mode === "learning" ? " selected" : "") + '>Learning</option><option value="assessment"' + (d.mode === "assessment" ? " selected" : "") + '>Assessment</option><option value="arcade"' + (d.mode === "arcade" ? " selected" : "") + '>Arcade integrity</option></select></div>' +
            '<div><label class="sd-form-label" for="sd-teacher-mission">Mission focus</label><select class="sd-select" id="sd-teacher-mission" name="mission">' + missionOptions + '</select></div>' +
            '<div><label class="sd-form-label" for="sd-teacher-competency">Competency focus</label><select class="sd-select" id="sd-teacher-competency" name="competency">' + competencyOptions + '</select></div>' +
            '<div><label class="sd-form-label" for="sd-teacher-count">Number of cases</label><input class="sd-field" id="sd-teacher-count" name="caseCount" type="number" min="1" max="30" value="' + escapeAttr(d.caseCount) + '"></div>' +
            '<div><label class="sd-form-label" for="sd-teacher-seed">Assignment seed</label><input class="sd-field" id="sd-teacher-seed" name="seed" maxlength="60" value="' + escapeAttr(d.seed) + '"><span class="sd-form-help">Use the same seed for comparable case selection.</span></div>' +
            '<label class="sd-checkbox-row sd-span-2"><input type="checkbox" name="collectNotes"' + (d.collectNotes ? " checked" : "") + '><span>Allow an optional student analyst note. Notes stay local and are included only in manual exports.</span></label>' +
            '<label class="sd-checkbox-row"><input type="checkbox" name="showStandards"' + (d.showStandards ? " checked" : "") + '><span>Show standards in debriefs</span></label>' +
            '<label class="sd-checkbox-row"><input type="checkbox" name="includeCustom"' + (d.includeCustom ? " checked" : "") + '><span>Include custom cases</span></label>' +
            '<div class="sd-span-2"><button type="submit" class="sd-button sd-button-primary">' + icon("play") + 'Launch assigned session</button></div>' +
          '</form>' +
        '</section>' +
        '<section class="sd-section-card"><h2>Export classroom evidence</h2><p>Exports include scenario IDs, versions, competencies, selected evidence, decisions, reasoning, hints, response sequence, scores, and timestamps.</p><div class="sd-button-row"><button type="button" class="sd-button" data-action="export-csv">' + icon("export") + 'Results CSV</button><button type="button" class="sd-button" data-action="export-json">' + icon("download") + 'Full JSON</button><button type="button" class="sd-button" data-action="export-template">' + icon("document") + 'Scenario template</button></div></section>' +
        '<section class="sd-section-card"><div class="sd-section-heading"><h2>Local learning patterns</h2><span>Last ' + patterns.attempts + ' official cases</span></div>' +
          '<div class="sd-metric-grid" style="grid-template-columns:repeat(2,minmax(0,1fr));margin-bottom:14px"><div class="sd-metric"><strong>' + (patterns.averageScore == null ? '—' : patterns.averageScore + '%') + '</strong><span>Average score</span></div><div class="sd-metric"><strong>' + (patterns.averageEvidence == null ? '—' : patterns.averageEvidence + '%') + '</strong><span>Evidence quality</span></div></div>' +
          '<h3>Most frequently missed decisive evidence</h3><div style="display:grid;gap:8px">' + patternRows(patterns.missedEvidence, 'Complete cases to identify missed evidence patterns.') + '</div>' +
          '<h3 style="margin-top:18px">Recurring misconceptions</h3><div style="display:grid;gap:8px">' + patternRows(patterns.misconceptions, 'No misconception patterns have been recorded.') + '</div>' +
        '</section>' +
      '</div><div>' +
        '<section class="sd-section-card"><h2>Create a quick custom case</h2><p>The quick editor creates a safe, non-navigable training artifact. Use the JSON template for advanced artifacts or response sequences.</p>' +
          '<form id="sd-custom-scenario-form" class="sd-form-grid">' +
            '<div class="sd-span-2"><label class="sd-form-label" for="sd-custom-title">Case title</label><input class="sd-field" id="sd-custom-title" name="title" required maxlength="90" placeholder="Unexpected club payment request"></div>' +
            '<div><label class="sd-form-label" for="sd-custom-mission">Mission</label><select class="sd-select" id="sd-custom-mission" name="mission">' + DATA.missions.map(function (mission) { return '<option value="' + mission.id + '">' + escapeHtml(mission.title) + '</option>'; }).join("") + '</select></div>' +
            '<div><label class="sd-form-label" for="sd-custom-kind">Artifact</label><select class="sd-select" id="sd-custom-kind" name="kind"><option value="email">Email</option><option value="text">Text message</option><option value="dm">Direct message</option></select></div>' +
            '<div><label class="sd-form-label" for="sd-custom-sender">Sender or profile</label><input class="sd-field" id="sd-custom-sender" name="sender" required maxlength="100" placeholder="Robotics Club Treasurer"></div>' +
            '<div><label class="sd-form-label" for="sd-custom-subject">Subject</label><input class="sd-field" id="sd-custom-subject" name="subject" maxlength="120" placeholder="Payment needed today"></div>' +
            '<div class="sd-span-2"><label class="sd-form-label" for="sd-custom-body">Message body</label><textarea class="sd-textarea" id="sd-custom-body" name="body" required maxlength="900"></textarea></div>' +
            '<div><label class="sd-form-label" for="sd-custom-assessment">Evidence-supported conclusion</label><select class="sd-select" id="sd-custom-assessment" name="assessment">' + Object.keys(DATA.assessments).map(function (id) { return '<option value="' + id + '">' + escapeHtml(DATA.assessments[id].label) + '</option>'; }).join("") + '</select></div>' +
            '<div><label class="sd-form-label" for="sd-custom-action">Best next action</label><select class="sd-select" id="sd-custom-action" name="action">' + Object.keys(DATA.actions).map(function (id) { return '<option value="' + id + '">' + escapeHtml(DATA.actions[id].label) + '</option>'; }).join("") + '</select></div>' +
            '<div class="sd-span-2"><label class="sd-form-label" for="sd-custom-strong">Strongest evidence</label><textarea class="sd-textarea" id="sd-custom-strong" name="strongest" required maxlength="500"></textarea></div>' +
            '<div class="sd-span-2"><label class="sd-form-label" for="sd-custom-secondary">Second evidence or context check</label><textarea class="sd-textarea" id="sd-custom-secondary" name="secondary" required maxlength="500"></textarea></div>' +
            '<div class="sd-span-2"><label class="sd-form-label" for="sd-custom-debrief">Recommended action and explanation</label><textarea class="sd-textarea" id="sd-custom-debrief" name="debrief" required maxlength="700"></textarea></div>' +
            '<div class="sd-span-2"><button type="submit" class="sd-button sd-button-primary">' + icon("plus") + 'Save custom case</button></div>' +
          '</form>' +
        '</section>' +
        '<details class="sd-accordion" style="margin-top:18px"><summary>Import advanced scenario JSON <span>+</span></summary><div class="sd-accordion-body"><label class="sd-form-label" for="sd-import-json" style="margin-top:14px">Paste one scenario or an array of scenarios</label><textarea class="sd-textarea" id="sd-import-json" data-field="import-json" style="min-height:210px" placeholder="Paste JSON generated from the scenario template"></textarea><div class="sd-button-row" style="margin-top:10px"><button type="button" class="sd-button" data-action="import-scenarios">' + icon("upload") + 'Validate and import</button><button type="button" class="sd-button sd-button-quiet" data-action="fill-template">Load example</button></div></div></details>' +
        '<section class="sd-section-card" style="margin-top:18px"><div class="sd-section-heading"><h2>Custom scenario library</h2><span>' + app.state.customScenarios.length + ' saved</span></div><div class="sd-custom-scenario-list">' + customList + '</div></section>' +
      '</div></div>';
    renderShell(content);
  }

  function settingToggleCard(title, description, key, enabled) {
    return '<article class="sd-setting-card"><h3>' + escapeHtml(title) + '</h3><p>' + escapeHtml(description) + '</p><div class="sd-segmented"><button type="button" class="' + (!enabled ? "sd-selected" : "") + '" data-action="set-toggle" data-setting="' + escapeAttr(key) + '" data-value="false">Off</button><button type="button" class="' + (enabled ? "sd-selected" : "") + '" data-action="set-toggle" data-setting="' + escapeAttr(key) + '" data-value="true">On</button></div></article>';
  }

  function renderSettings() {
    const s = app.state.settings;
    const content = '<header class="sd-page-heading"><div class="sd-eyebrow">Accessibility and privacy</div><h1>Adjust the experience without reducing the learning goal.</h1><p>Settings are saved locally in this browser. Every investigation can be completed with a keyboard, and visual evidence is repeated in text.</p></header>' +
      '<section class="sd-settings-grid">' +
        '<article class="sd-setting-card"><h3>Text size</h3><p>Adjust text throughout the game interface and simulated artifacts.</p><div class="sd-segmented"><button type="button" class="' + (s.textScale === "small" ? "sd-selected" : "") + '" data-action="set-text-scale" data-value="small">Small</button><button type="button" class="' + (s.textScale === "medium" ? "sd-selected" : "") + '" data-action="set-text-scale" data-value="medium">Medium</button><button type="button" class="' + (s.textScale === "large" ? "sd-selected" : "") + '" data-action="set-text-scale" data-value="large">Large</button></div></article>' +
        settingToggleCard("High contrast", "Increase borders and reduce subtle color differences. Status is always communicated with text, not color alone.", "highContrast", s.highContrast) +
        settingToggleCard("Reduced motion", "Disable decorative orbit, transitions, and nonessential animation.", "reducedMotion", s.reducedMotion) +
        settingToggleCard("Plain-language debriefs", "Use shorter explanations in the main debrief while keeping technical details available in evidence reviews.", "plainLanguage", s.plainLanguage) +
        settingToggleCard("Read-aloud preference", "Enable the read-aloud preference. The Read button uses the browser's built-in speech feature when available.", "narration", s.narration) +
        '<article class="sd-setting-card"><h3>Keyboard workflow</h3><p>Use Tab and Shift+Tab to move through tools and decisions, Enter or Space to activate controls, and the visible focus ring to track position.</p><div class="sd-inline-note">' + icon("info") + '<div>Inspectable artifact elements are real buttons with accessible names. Simulated links never navigate.</div></div></article>' +
        '<article class="sd-setting-card"><h3>Local data</h3><p>Progress, custom scenarios, and optional notes are stored only in this browser through localStorage. Export is always deliberate.</p><div class="sd-button-row"><button type="button" class="sd-button sd-button-danger" data-action="reset-progress">' + icon("trash") + 'Reset all local data</button></div></article>' +
      '</section>';
    renderShell(content);
  }

  function downloadText(filename, mime, text) {
    const blob = new Blob([text], { type: mime });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = filename;
    anchor.style.display = "none";
    document.body.appendChild(anchor);
    anchor.click();
    window.setTimeout(function () {
      URL.revokeObjectURL(url);
      anchor.remove();
    }, 0);
  }

  function exportResultsJson() {
    const payload = {
      product: "Spoof Detective: A Phishing Simulation",
      version: DATA.version,
      exportedAt: new Date().toISOString(),
      missionMastery: app.state.missionMastery,
      competencyStats: app.state.competencyStats,
      badges: app.state.badges,
      diagnostic: app.state.diagnostic,
      posttest: app.state.posttest,
      history: app.state.history
    };
    downloadText("spoof-detective-results-" + new Date().toISOString().slice(0, 10) + ".json", "application/json;charset=utf-8", JSON.stringify(payload, null, 2));
    dispatch("spoof-detective:export", { type: "json", rows: app.state.history.length });
  }

  function exportResultsCsv() {
    const columns = [
      "completed_at", "session_id", "source", "mode", "scenario_id", "scenario_version", "mission", "is_practice", "score", "points", "evidence_bonus", "evidence_choice", "evidence_score", "decision_score", "rationale_score", "response_score", "branch_score", "branch_path", "independence", "classification", "response_action", "assessment_correct", "action_correct", "rationale_correct", "evidence_inspected", "evidence_selected", "response_order", "hint_level", "time_spent_seconds", "attempt_number", "competencies", "standards", "misconceptions", "analyst_note"
    ];
    const rows = [columns.map(csvCell).join(",")];
    app.state.history.forEach(function (result) {
      const values = [
        result.completedAt, result.sessionId, result.source, result.mode, result.scenarioId, result.scenarioVersion, result.mission, result.isPractice, result.score, result.points == null ? result.score : result.points, result.evidenceBonus || 0, result.evidenceChoice || "", result.evidenceScore, result.decisionScore, result.rationaleScore, result.responseScore == null ? "" : result.responseScore, result.branchScore == null ? "" : result.branchScore, (result.branchPath || []).map(function (step) { return step.nodeId + ":" + step.optionId; }).join("|"), result.independence, result.assessment, result.action, result.assessmentCorrect, result.actionCorrect, result.rationaleCorrect, (result.evidenceInspected || []).join("|"), (result.evidenceSelected || []).join("|"), (result.responseOrder || []).join("|"), result.hintLevel, result.timeSpentSeconds, result.attemptNumber, (result.competencies || []).join("|"), (result.standards || []).join("|"), (result.misconceptions || []).join("|"), result.note || ""
      ];
      rows.push(values.map(csvCell).join(","));
    });
    downloadText("spoof-detective-results-" + new Date().toISOString().slice(0, 10) + ".csv", "text/csv;charset=utf-8", rows.join("\n"));
    dispatch("spoof-detective:export", { type: "csv", rows: app.state.history.length });
  }

  function exportScenarioTemplate() {
    downloadText("spoof-detective-scenario-template.json", "application/json;charset=utf-8", JSON.stringify(scenarioTemplate(), null, 2));
  }

  function scenarioNarration(scenario) {
    const a = scenario.artifact || {};
    const parts = ["Case: " + scenario.title + ".", scenario.context];
    if (a.kind === "email") parts.push("Email from " + a.fromName + ", address " + a.fromAddress + ". Subject: " + a.subject + ". " + (a.body || []).join(" "));
    if (a.kind === "text") parts.push("Text from " + (a.contactLabel || a.sender) + ". " + a.message);
    if (a.kind === "dm") parts.push("Direct message from " + a.profileName + ", " + a.handle + ". " + a.message);
    if (a.kind === "qr") parts.push("Poster titled " + a.posterTitle + ". " + a.copy + ". Encoded destination: " + a.encodedUrl);
    if (a.kind === "oauth") parts.push(a.appName + " requests access to " + (a.permissions || []).join(", ") + ". Publisher: " + a.publisher + ".");
    if (a.kind === "calendar") parts.push("Calendar event: " + a.event + ". Organizer: " + a.organizer + ". " + a.notes);
    if (a.kind === "web") parts.push("Browser address: " + a.address + ". " + a.heading + ". " + a.body);
    if (a.kind === "chat") parts.push((a.transcript || []).map(function (line) { return line.who + " says: " + line.text; }).join(" "));
    if (a.kind === "voicemail") parts.push("Voicemail from " + a.caller + ". " + a.transcript);
    if (a.kind === "login") parts.push(a.heading + ". " + a.summary + ". " + (a.events || []).map(function (event) { return event.time + ", " + event.source + ", " + event.detail + ", " + event.status; }).join(". "));
    return parts.filter(Boolean).join(" ");
  }

  function readCurrentCase() {
    if (!app.session || !app.session.currentCase) return;
    const scenario = getScenario(app.session.currentCase.scenarioId, app.state);
    if (!scenario) return;
    if (!("speechSynthesis" in window) || typeof SpeechSynthesisUtterance === "undefined") {
      notify("Read aloud is not supported by this browser.", "warning");
      return;
    }
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(scenarioNarration(scenario));
    utterance.rate = 0.96;
    window.speechSynthesis.speak(utterance);
    notify("Reading the current case aloud.", "success");
  }

  function render() {
    if (app.homeTypingTimer) {
      window.clearInterval(app.homeTypingTimer);
      app.homeTypingTimer = null;
    }
    if (app.view === "home") return renderHome();
    if (app.view === "missions") return renderMissions();
    if (app.view === "play") return renderPlay();
    if (app.view === "stats") return renderStats();
    if (app.view === "teacher") return renderTeacher();
    if (app.view === "settings") return renderSettings();
    if (app.view === "complete") return renderComplete();
    app.view = "home";
    return renderHome();
  }

  function currentScenarioAndCase() {
    if (!app.session || !app.session.currentCase) return null;
    const scenario = getScenario(app.session.currentCase.scenarioId, app.state);
    return scenario ? { scenario: scenario, currentCase: app.session.currentCase } : null;
  }

  function persistAndRender(refocusSelector) {
    if (app.session) saveActiveSession(app.session);
    render();
    if (refocusSelector) {
      window.requestAnimationFrame(function () {
        const target = root.querySelector(refocusSelector);
        if (target) target.focus();
      });
    }
  }

  function setSetting(key, value) {
    if (!(key in app.state.settings)) return;
    app.state.settings[key] = value;
    app.state = saveState(app.state);
    render();
  }

  function practiceCompetency(competencyId) {
    const possible = allScenarios(app.state).filter(function (scenario) {
      return !scenario.assessmentSet && scenario.competencies.includes(competencyId) && isMissionUnlocked(scenario.mission, app.state);
    });
    if (!possible.length) {
      notify("No unlocked cases currently target that competency.", "warning");
      return;
    }
    const selected = seededShuffle(possible, competencyId + "-practice-" + Date.now()).slice(0, Math.min(4, possible.length));
    activateSession(buildSession({
      title: "Targeted Practice: " + (DATA.competencies[competencyId] ? DATA.competencies[competencyId].name : competencyId),
      subtitle: "A short practice set selected from unlocked missions.",
      source: "practice",
      mode: "learning",
      missionIds: unique(selected.map(function (scenario) { return scenario.mission; })),
      seed: competencyId + "-practice",
      scenarios: selected,
      showStandards: true,
      recordProgress: true
    }));
  }

  root.addEventListener("click", function (event) {
    const button = event.target.closest("[data-action]");
    if (!button || !root.contains(button) || button.disabled) return;
    const action = button.getAttribute("data-action");

    if (action === "navigate") {
      app.view = button.getAttribute("data-view") || "home";
      render();
      return;
    }
    if (action === "resume-session") {
      resumeSession();
      return;
    }
    if (action === "start-mission") {
      startMission(button.getAttribute("data-mission"));
      return;
    }
    if (action === "start-assessment") {
      const setName = button.getAttribute("data-set");
      if (setName === "post" && !allMissionsProficient()) {
        notify("Reach proficiency in all five missions before the final transfer check.", "warning");
        return;
      }
      startAssessment(setName === "post" ? "post" : "pre");
      return;
    }
    if (action === "pause-session") {
      if (app.session) saveActiveSession(app.session);
      app.view = "home";
      render();
      notify("Session paused. Your current case was saved locally.", "success");
      return;
    }
    if (action === "read-case") {
      readCurrentCase();
      return;
    }

    const bundle = currentScenarioAndCase();
    if (action === "select-simple-answer" && bundle && bundle.currentCase.phase === "investigate") {
      const choice = button.getAttribute("data-value");
      if (!["malicious", "uncertain", "legitimate"].includes(choice)) return;
      bundle.currentCase.simpleChoice = choice;
      bundle.currentCase.choices.assessment = choice;
      bundle.currentCase.choices.action = choice === "malicious" ? "report" : choice === "uncertain" ? "verify" : "proceed";
      persistAndRender('[data-action="select-simple-answer"][data-value="' + cssSelectorEscape(choice) + '"]');
      return;
    }
    if (action === "submit-simple-answer" && bundle && bundle.currentCase.phase === "investigate") {
      const choice = bundle.currentCase.simpleChoice;
      if (!["malicious", "uncertain", "legitimate"].includes(choice)) return;
      const correct = choice === bundle.scenario.correctAssessment;
      if (correct) {
        bundle.currentCase.phase = "evidence";
        bundle.currentCase.simpleEvidenceChoice = null;
        bundle.currentCase.simpleEvidenceCorrect = null;
        announce("Correct decision. Bonus evidence question unlocked.");
        persistAndRender('[data-action="select-simple-evidence"]');
        return;
      }
      bundle.currentCase.choices.rationale = "decision-mismatch";
      bundle.currentCase.pendingScores = {
        simpleMode: true,
        assessmentCorrect: false,
        actionCorrect: false,
        rationaleCorrect: false,
        analysisCorrect: false,
        evidenceBonus: 0,
        evidenceScore: 0,
        decisionScore: 0,
        rationaleScore: 0,
        independence: clamp(100 - bundle.currentCase.hintLevel * 10, 0, 100)
      };
      announce("Not quite. Review the explanation and strongest evidence.");
      finalizeCaseResult(bundle.scenario, bundle.currentCase, null);
      return;
    }
    if (action === "select-simple-evidence" && bundle && bundle.currentCase.phase === "evidence") {
      const choice = button.getAttribute("data-value");
      const options = simpleEvidenceOptions(bundle.scenario);
      if (!options.some(function (item) { return item.id === choice; })) return;
      bundle.currentCase.simpleEvidenceChoice = choice;
      persistAndRender('[data-action="select-simple-evidence"][data-value="' + cssSelectorEscape(choice) + '"]');
      return;
    }
    if (action === "submit-simple-evidence" && bundle && bundle.currentCase.phase === "evidence") {
      const choice = bundle.currentCase.simpleEvidenceChoice;
      const option = simpleEvidenceOptions(bundle.scenario).find(function (item) { return item.id === choice; });
      if (!option) return;
      const evidenceCorrect = Boolean(option.correct);
      bundle.currentCase.simpleEvidenceCorrect = evidenceCorrect;
      bundle.currentCase.choices.rationale = "simple-evidence:" + choice;
      bundle.currentCase.selectedEvidence = evidenceCorrect ? (bundle.scenario.bestEvidence || []).slice() : [];
      bundle.currentCase.pendingScores = {
        simpleMode: true,
        assessmentCorrect: true,
        actionCorrect: true,
        rationaleCorrect: evidenceCorrect,
        analysisCorrect: true,
        evidenceBonus: evidenceCorrect ? SIMPLE_EVIDENCE_BONUS : 0,
        evidenceScore: evidenceCorrect ? 100 : 0,
        decisionScore: 100,
        rationaleScore: evidenceCorrect ? 100 : 0,
        independence: clamp(100 - bundle.currentCase.hintLevel * 10, 0, 100)
      };
      announce(evidenceCorrect ? "Correct evidence. Twenty-five bonus points earned." : "That was not the strongest evidence. Review the explanation.");
      finalizeCaseResult(bundle.scenario, bundle.currentCase, null);
      return;
    }
    if (action === "skip-simple-evidence" && bundle && bundle.currentCase.phase === "evidence") {
      bundle.currentCase.simpleEvidenceChoice = null;
      bundle.currentCase.simpleEvidenceCorrect = false;
      bundle.currentCase.choices.rationale = "simple-evidence-skipped";
      bundle.currentCase.pendingScores = {
        simpleMode: true,
        assessmentCorrect: true,
        actionCorrect: true,
        rationaleCorrect: false,
        analysisCorrect: true,
        evidenceBonus: 0,
        evidenceScore: 0,
        decisionScore: 100,
        rationaleScore: 0,
        independence: clamp(100 - bundle.currentCase.hintLevel * 10, 0, 100)
      };
      announce("Bonus question skipped. Your correct decision is still recorded.");
      finalizeCaseResult(bundle.scenario, bundle.currentCase, null);
      return;
    }
    if (action === "inspect" && bundle && bundle.currentCase.phase === "investigate") {
      const id = button.getAttribute("data-inspection");
      const inspection = bundle.scenario.inspections.find(function (item) { return item.id === id; });
      if (!inspection) return;
      if (!bundle.currentCase.inspected.includes(id)) bundle.currentCase.inspected.push(id);
      bundle.currentCase.latestInspection = id;
      bundle.currentCase.inspectionLog.push({ id: id, at: new Date().toISOString() });
      announce(inspection.label + ". " + inspection.result);
      persistAndRender('[data-action="inspect"][data-inspection="' + cssSelectorEscape(id) + '"]');
      return;
    }
    if (action === "toggle-evidence" && bundle && bundle.currentCase.phase === "investigate") {
      const id = button.getAttribute("data-evidence");
      const revealed = evidenceRevealed(bundle.scenario, bundle.currentCase).some(function (item) { return item.id === id; });
      if (!revealed) return;
      const selected = bundle.currentCase.selectedEvidence;
      const index = selected.indexOf(id);
      if (index >= 0) selected.splice(index, 1);
      else if (selected.length < bundle.scenario.maxEvidence) selected.push(id);
      else {
        notify("Choose no more than " + bundle.scenario.maxEvidence + " evidence items. Remove one before adding another.", "warning");
        return;
      }
      persistAndRender('[data-action="toggle-evidence"][data-evidence="' + cssSelectorEscape(id) + '"]');
      return;
    }
    if (action === "use-hint" && bundle && bundle.currentCase.phase === "investigate") {
      if (app.session.mode === "assessment") return;
      bundle.currentCase.hintLevel = Math.min(bundle.scenario.hints.length, bundle.currentCase.hintLevel + 1);
      persistAndRender('[data-action="use-hint"]');
      return;
    }
    if (action === "go-analysis" && bundle && bundle.currentCase.phase === "investigate") {
      if (bundle.currentCase.selectedEvidence.length < bundle.scenario.minEvidence) return;
      bundle.currentCase.phase = "analyze";
      persistAndRender();
      return;
    }
    if (action === "back-investigate" && bundle && bundle.currentCase.phase === "analyze") {
      bundle.currentCase.phase = "investigate";
      persistAndRender();
      return;
    }
    if (action === "select-assessment" && bundle && bundle.currentCase.phase === "analyze") {
      bundle.currentCase.choices.assessment = button.getAttribute("data-value");
      persistAndRender('[data-action="select-assessment"][data-value="' + cssSelectorEscape(bundle.currentCase.choices.assessment) + '"]');
      return;
    }
    if (action === "select-case-action" && bundle && bundle.currentCase.phase === "analyze") {
      bundle.currentCase.choices.action = button.getAttribute("data-value");
      persistAndRender('[data-action="select-case-action"][data-value="' + cssSelectorEscape(bundle.currentCase.choices.action) + '"]');
      return;
    }
    if (action === "select-rationale" && bundle && bundle.currentCase.phase === "analyze") {
      bundle.currentCase.choices.rationale = button.getAttribute("data-value");
      persistAndRender('[data-action="select-rationale"][data-value="' + cssSelectorEscape(bundle.currentCase.choices.rationale) + '"]');
      return;
    }
    if (action === "submit-analysis" && bundle && bundle.currentCase.phase === "analyze") {
      const choices = bundle.currentCase.choices;
      if (!(choices.assessment && choices.action && choices.rationale)) return;
      bundle.currentCase.pendingScores = evaluateAnalysis(bundle.scenario, bundle.currentCase);
      if (bundle.scenario.response) {
        bundle.currentCase.phase = "respond";
        persistAndRender();
      } else if (bundle.scenario.branch) {
        beginBranch(bundle.scenario, bundle.currentCase, null);
      } else {
        finalizeCaseResult(bundle.scenario, bundle.currentCase, null);
      }
      return;
    }
    if (action === "toggle-response-step" && bundle && bundle.currentCase.phase === "respond") {
      const id = button.getAttribute("data-step");
      const order = bundle.currentCase.responseOrder;
      const index = order.indexOf(id);
      if (index >= 0) order.splice(index, 1);
      else if (order.length < bundle.scenario.response.maxSteps) order.push(id);
      else {
        notify("The response sequence already has " + bundle.scenario.response.maxSteps + " steps. Remove one first.", "warning");
        return;
      }
      persistAndRender('[data-action="toggle-response-step"][data-step="' + cssSelectorEscape(id) + '"]');
      return;
    }
    if (action === "reset-response" && bundle && bundle.currentCase.phase === "respond") {
      bundle.currentCase.responseOrder = [];
      persistAndRender('[data-action="reset-response"]');
      return;
    }
    if (action === "submit-response" && bundle && bundle.currentCase.phase === "respond") {
      if (bundle.currentCase.responseOrder.length !== bundle.scenario.response.maxSteps) return;
      const responseScore = responseScoreFor(bundle.scenario.response, bundle.currentCase.responseOrder);
      if (bundle.scenario.branch) beginBranch(bundle.scenario, bundle.currentCase, responseScore);
      else finalizeCaseResult(bundle.scenario, bundle.currentCase, responseScore);
      return;
    }
    if (action === "select-branch-option" && bundle && bundle.currentCase.phase === "branch") {
      const branch = bundle.scenario.branch;
      const state = bundle.currentCase.branchState;
      const node = branch && state ? branch.nodes[state.nodeId] : null;
      const option = node ? node.options.find(function (item) { return item.id === button.getAttribute("data-value"); }) : null;
      if (!option || state.selectedOption) return;
      state.selectedOption = option.id;
      state.feedback = option.feedback;
      state.path.push({ nodeId: state.nodeId, optionId: option.id, score: option.score });
      state.scores.push(option.score);
      dispatch("spoof-detective:branchdecision", {
        sessionId: app.session.id,
        scenarioId: bundle.scenario.id,
        nodeId: state.nodeId,
        optionId: option.id,
        score: option.score
      });
      persistAndRender('[data-action="advance-branch"]');
      return;
    }
    if (action === "advance-branch" && bundle && bundle.currentCase.phase === "branch") {
      const branch = bundle.scenario.branch;
      const state = bundle.currentCase.branchState;
      const node = branch && state ? branch.nodes[state.nodeId] : null;
      const option = node ? node.options.find(function (item) { return item.id === state.selectedOption; }) : null;
      if (!option) return;
      if (option.next && branch.nodes[option.next]) {
        state.nodeId = option.next;
        state.selectedOption = null;
        state.feedback = "";
        persistAndRender();
      } else {
        finalizeCaseResult(bundle.scenario, bundle.currentCase, bundle.currentCase.pendingResponseScore);
      }
      return;
    }
    if (action === "next-case" && bundle && ["debrief", "recorded"].includes(bundle.currentCase.phase)) {
      advanceCase();
      return;
    }
    if (action === "practice-transfer" && bundle && bundle.currentCase.phase === "debrief") {
      insertNearTransferPractice();
      return;
    }

    if (action === "clear-evidence" && bundle && bundle.currentCase.phase === "investigate") {
      bundle.currentCase.selectedEvidence = [];
      persistAndRender('[data-action="go-analysis"]');
      return;
    }
    if (action === "review-decision" && bundle && bundle.currentCase.phase === "debrief") {
      bundle.currentCase.reviewOpen = !bundle.currentCase.reviewOpen;
      persistAndRender('[data-action="review-decision"]');
      return;
    }
    if (action === "show-debrief-tip" && bundle && bundle.currentCase.phase === "debrief") {
      bundle.currentCase.debriefTip = !bundle.currentCase.debriefTip;
      persistAndRender('[data-action="show-debrief-tip"]');
      return;
    }
    if (action === "scroll-artifact" && bundle) {
      const artifact = root.querySelector("#sd-current-artifact");
      if (artifact) artifact.scrollIntoView({ behavior: app.state.settings.reducedMotion ? "auto" : "smooth", block: "start" });
      return;
    }

    if (action === "practice-lowest") {
      practiceCompetency(button.getAttribute("data-competency"));
      return;
    }
    if (action === "export-csv") {
      exportResultsCsv();
      return;
    }
    if (action === "export-json") {
      exportResultsJson();
      return;
    }
    if (action === "export-template") {
      exportScenarioTemplate();
      return;
    }
    if (action === "fill-template") {
      const field = root.querySelector("#sd-import-json");
      if (field) {
        field.value = JSON.stringify(scenarioTemplate(), null, 2);
        field.focus();
      }
      return;
    }
    if (action === "import-scenarios") {
      const field = root.querySelector("#sd-import-json");
      if (!field || !field.value.trim()) {
        notify("Paste scenario JSON before importing.", "warning");
        return;
      }
      try {
        const parsed = JSON.parse(field.value);
        const items = Array.isArray(parsed) ? parsed : [parsed];
        if (items.length > 25) throw new Error("Import no more than 25 scenarios at once.");
        const normalized = items.map(normalizeImportedScenario);
        app.state.customScenarios = app.state.customScenarios.concat(normalized).slice(-100);
        app.state = saveState(app.state);
        renderTeacher();
        notify(normalized.length + " custom scenario" + (normalized.length === 1 ? "" : "s") + " imported.", "success");
      } catch (error) {
        notify("Import failed: " + error.message, "danger");
      }
      return;
    }
    if (action === "delete-custom") {
      const id = button.getAttribute("data-scenario");
      app.state.customScenarios = app.state.customScenarios.filter(function (scenario) { return scenario.id !== id; });
      app.state = saveState(app.state);
      renderTeacher();
      notify("Custom scenario deleted.", "success");
      return;
    }
    if (action === "set-text-scale") {
      setSetting("textScale", button.getAttribute("data-value"));
      return;
    }
    if (action === "set-toggle") {
      setSetting(button.getAttribute("data-setting"), button.getAttribute("data-value") === "true");
      return;
    }
    if (action === "reset-progress") {
      if (!window.confirm("Reset all Spoof Detective progress, assessment results, settings, and custom scenarios stored in this browser?")) return;
      try {
        window.localStorage.removeItem(STORAGE_KEY);
        window.localStorage.removeItem(ACTIVE_SESSION_KEY);
      } catch (error) { /* ignore */ }
      app.state = normalizeState(DEFAULT_STATE);
      app.session = null;
      app.lastSummary = null;
      app.view = "home";
      render();
      notify("All local Spoof Detective data was reset.", "success");
    }
  });

  root.addEventListener("input", function (event) {
    if (event.target && event.target.matches('[data-field="case-note"]') && app.session && app.session.currentCase) {
      app.session.currentCase.choices.note = event.target.value.slice(0, 600);
      saveActiveSession(app.session);
    }
  });

  root.addEventListener("submit", function (event) {
    if (event.target.id === "sd-teacher-session-form") {
      event.preventDefault();
      const data = new FormData(event.target);
      app.teacherDefaults = {
        mode: String(data.get("mode") || "learning"),
        mission: String(data.get("mission") || "all"),
        competency: String(data.get("competency") || "all"),
        caseCount: clamp(Number(data.get("caseCount")) || 8, 1, 30),
        seed: String(data.get("seed") || "classroom-01").trim().slice(0, 60) || "classroom-01",
        collectNotes: data.has("collectNotes"),
        showStandards: data.has("showStandards"),
        includeCustom: data.has("includeCustom")
      };
      startTeacherSession(app.teacherDefaults);
      return;
    }
    if (event.target.id === "sd-custom-scenario-form") {
      event.preventDefault();
      try {
        const scenario = buildScenarioFromForm(event.target);
        app.state.customScenarios.push(scenario);
        app.state.customScenarios = app.state.customScenarios.slice(-100);
        app.state = saveState(app.state);
        renderTeacher();
        notify("Custom scenario saved locally.", "success");
      } catch (error) {
        notify("Could not save scenario: " + error.message, "danger");
      }
    }
  });

  window.SpoofDetectiveEmbed = {
    version: DATA.version,
    getState: function () { return clone(app.state); },
    getActiveSession: function () { return clone(app.session || loadActiveSession()); },
    startMission: function (missionId, options) { return startMission(missionId, options || {}); },
    startDiagnostic: function () { startAssessment("pre"); return true; },
    startPostAssessment: function () {
      if (!allMissionsProficient()) return false;
      startAssessment("post");
      return true;
    },
    startTeacherSession: function (config) { startTeacherSession(config || {}); return true; },
    openHome: function () { app.view = "home"; render(); },
    openMissions: function () { app.view = "missions"; render(); },
    openStats: function () { app.view = "stats"; render(); },
    openTeacher: function () { app.view = "teacher"; render(); },
    openSettings: function () { app.view = "settings"; render(); },
    resume: function () { return resumeSession(); },
    exportResults: function (type) { if (type === "csv") exportResultsCsv(); else exportResultsJson(); },
    exportScenarioTemplate: exportScenarioTemplate,
    addCustomScenario: function (scenario) {
      const normalized = normalizeImportedScenario(scenario);
      app.state.customScenarios.push(normalized);
      app.state = saveState(app.state);
      render();
      return normalized.id;
    },
    reset: function () {
      try {
        window.localStorage.removeItem(STORAGE_KEY);
        window.localStorage.removeItem(ACTIVE_SESSION_KEY);
      } catch (error) { /* ignore */ }
      app.state = normalizeState(DEFAULT_STATE);
      app.session = null;
      app.lastSummary = null;
      app.view = "home";
      render();
    }
  };

  applySettings();
  render();
  dispatch("spoof-detective:ready", {
    version: DATA.version,
    scenarioCount: DATA.scenarios.length,
    missionCount: DATA.missions.length,
    hasSavedSession: Boolean(savedActiveSession)
  });
})();
