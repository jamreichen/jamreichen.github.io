(() => {
  "use strict";

  const header = document.getElementById("siteHeader");
  const navigation = document.getElementById("primaryNav");
  const menuToggle = document.getElementById("menuToggle");

  if (!header || !navigation || !menuToggle) return;

  const mobileQuery = window.matchMedia("(max-width: 1180px)");
  const homeHashMap = {
    "#about": "about",
    "#projects": "case-studies",
    "#case-studies": "experience",
    "#approach": "approach",
    "#skills": "capabilities"
  };

  const isOpen = () =>
    navigation.classList.contains("is-open") ||
    navigation.classList.contains("open");

  const syncNavigationAccessibility = () => {
    const hidden = mobileQuery.matches && !isOpen();
    navigation.setAttribute("aria-hidden", String(hidden));

    if ("inert" in navigation) {
      navigation.inert = hidden;
    }
  };

  const setMenuOpen = (open) => {
    navigation.classList.toggle("is-open", open);
    navigation.classList.remove("open");
    menuToggle.setAttribute("aria-expanded", String(open));
    menuToggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
    document.body.classList.toggle("site-menu-open", open);
    document.body.classList.toggle("menu-open", open);
    syncNavigationAccessibility();
  };

  const closeMenu = (returnFocus = false) => {
    const wasOpen = isOpen();
    setMenuOpen(false);
    if (returnFocus && wasOpen) menuToggle.focus();
  };

  const updateActiveLink = () => {
    const page = document.body.dataset.navPage || "";
    const key = page === "home"
      ? (homeHashMap[window.location.hash] || "about")
      : page;

    navigation.querySelectorAll("a[data-nav]").forEach((link) => {
      const active = link.dataset.nav === key;
      link.classList.toggle("active", active);
      if (active) {
        link.setAttribute("aria-current", page === "home" ? "location" : "page");
      } else {
        link.removeAttribute("aria-current");
      }
    });
  };

  /*
    Capture the toggle click before page-specific legacy menu handlers.
    This prevents two handlers from immediately undoing one another.
  */
  document.addEventListener("click", (event) => {
    const toggleTarget = event.target.closest("#menuToggle");

    if (toggleTarget) {
      event.preventDefault();
      event.stopImmediatePropagation();
      setMenuOpen(!isOpen());
      return;
    }

    const navLink = event.target.closest("#primaryNav a");
    if (navLink) {
      closeMenu();
      return;
    }

    if (isOpen() && !header.contains(event.target)) {
      closeMenu();
    }
  }, true);

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && isOpen()) {
      closeMenu(true);
    }
  });

  const handleViewportChange = () => {
    closeMenu();
    syncNavigationAccessibility();
  };

  if (typeof mobileQuery.addEventListener === "function") {
    mobileQuery.addEventListener("change", handleViewportChange);
  } else {
    mobileQuery.addListener(handleViewportChange);
  }

  const updateHeaderState = () => {
    header.classList.toggle("is-scrolled", window.scrollY > 12);
  };

  window.addEventListener("scroll", updateHeaderState, { passive: true });
  window.addEventListener("hashchange", updateActiveLink);
  window.addEventListener("pageshow", () => closeMenu());

  menuToggle.setAttribute("aria-controls", "primaryNav");
  closeMenu();
  updateHeaderState();
  updateActiveLink();
})();
