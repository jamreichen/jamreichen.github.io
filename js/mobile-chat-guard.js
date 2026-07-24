(() => {
  "use strict";

  const mobileQuery = window.matchMedia("(max-width: 1180px)");
  const panel = document.getElementById("aiPanel");
  const launcher = document.getElementById("aiLauncher");
  const closeButton = document.getElementById("aiClose");

  if (!panel || !launcher) return;

  let userRequestedOpen = false;

  const closePanel = () => {
    panel.classList.remove("open");
    panel.setAttribute("aria-hidden", "true");
    panel.removeAttribute("data-user-open");
    launcher.setAttribute("aria-expanded", "false");
  };

  launcher.addEventListener(
    "click",
    () => {
      if (mobileQuery.matches) {
        userRequestedOpen = true;
        panel.setAttribute("data-user-open", "true");
      }
    },
    true
  );

  if (closeButton) {
    closeButton.addEventListener(
      "click",
      () => {
        userRequestedOpen = false;
        closePanel();
      },
      true
    );
  }

  const observer = new MutationObserver(() => {
    if (!mobileQuery.matches) return;

    if (panel.classList.contains("open") && !userRequestedOpen) {
      closePanel();
      return;
    }

    if (!panel.classList.contains("open")) {
      userRequestedOpen = false;
      panel.removeAttribute("data-user-open");
    }
  });

  observer.observe(panel, {
    attributes: true,
    attributeFilter: ["class", "aria-hidden"]
  });

  const applyViewportRule = () => {
    userRequestedOpen = false;

    if (mobileQuery.matches) {
      closePanel();
    }
  };

  if (typeof mobileQuery.addEventListener === "function") {
    mobileQuery.addEventListener("change", applyViewportRule);
  } else {
    mobileQuery.addListener(applyViewportRule);
  }

  window.addEventListener("pageshow", applyViewportRule);

  applyViewportRule();
})();