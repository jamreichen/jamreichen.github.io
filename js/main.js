(() => {
  const header = document.querySelector('.site-header');
  const progress = document.querySelector('.scroll-progress');
  const menuButton = document.querySelector('.menu-toggle');
  const nav = document.querySelector('.nav');

  const updateScroll = () => {
    const max = document.documentElement.scrollHeight - window.innerHeight;
    const ratio = max > 0 ? window.scrollY / max : 0;

    if (progress) {
      progress.style.transform = `scaleX(${ratio})`;
    }

    if (header) {
      header.classList.toggle('is-scrolled', window.scrollY > 24);
    }
  };

  updateScroll();
  window.addEventListener('scroll', updateScroll, { passive: true });
  window.addEventListener('resize', updateScroll, { passive: true });

  const revealElements = document.querySelectorAll('[data-reveal]');

  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (!entry.isIntersecting) return;

          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        });
      },
      {
        threshold: 0.14,
        rootMargin: '0px 0px -7% 0px'
      }
    );

    revealElements.forEach((element, index) => {
      element.style.setProperty(
        '--delay',
        `${Math.min(index * 80, 280)}ms`
      );

      observer.observe(element);
    });
  } else {
    revealElements.forEach(element => {
      element.classList.add('is-visible');
    });
  }

  if (menuButton && nav) {
    menuButton.setAttribute('aria-expanded', 'false');

    menuButton.addEventListener('click', () => {
      const isOpen =
        menuButton.getAttribute('aria-expanded') === 'true';

      menuButton.setAttribute(
        'aria-expanded',
        String(!isOpen)
      );

      menuButton.setAttribute(
        'aria-label',
        isOpen ? 'Open menu' : 'Close menu'
      );

      nav.classList.toggle('is-open', !isOpen);
    });

    nav.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        menuButton.setAttribute('aria-expanded', 'false');
        menuButton.setAttribute('aria-label', 'Open menu');
        nav.classList.remove('is-open');
      });
    });
  }

  const canvas = document.getElementById('pageCanvas');
  const ctx = canvas ? canvas.getContext('2d') : null;

  const drawingToggle =
    document.getElementById('drawingToggle');

  const drawingToolbar =
    document.getElementById('drawingToolbar');

  const drawColor =
    document.getElementById('drawColor');

  const drawSize =
    document.getElementById('drawSize');

  if (
    !canvas ||
    !ctx ||
    !drawingToggle ||
    !drawingToolbar ||
    !drawColor ||
    !drawSize
  ) {
    return;
  }

  const strokes = [];

  let currentStroke = null;
  let drawing = false;
  let erasing = false;

  const sizeCanvas = () => {
    canvas.width =
      document.documentElement.scrollWidth;

    canvas.height =
      document.documentElement.scrollHeight;

    canvas.style.width = `${canvas.width}px`;
    canvas.style.height = `${canvas.height}px`;

    redrawStrokes();
  };

  const distance = (pointA, pointB) => {
    return Math.hypot(
      pointB.x - pointA.x,
      pointB.y - pointA.y
    );
  };

  const distanceFromLine = (
    point,
    lineStart,
    lineEnd
  ) => {
    const lineLength =
      distance(lineStart, lineEnd);

    if (!lineLength) {
      return distance(point, lineStart);
    }

    return Math.abs(
      (lineEnd.y - lineStart.y) * point.x -
      (lineEnd.x - lineStart.x) * point.y +
      lineEnd.x * lineStart.y -
      lineEnd.y * lineStart.x
    ) / lineLength;
  };

  const finalizeStroke = stroke => {
    if (
      !stroke ||
      stroke.erasing ||
      stroke.points.length < 3
    ) {
      return;
    }

    const points = stroke.points;
    const first = points[0];
    const last = points[points.length - 1];

    const xValues =
      points.map(point => point.x);

    const yValues =
      points.map(point => point.y);

    const minX = Math.min(...xValues);
    const maxX = Math.max(...xValues);
    const minY = Math.min(...yValues);
    const maxY = Math.max(...yValues);

    const width = maxX - minX;
    const height = maxY - minY;

    const diagonal =
      Math.hypot(width, height);

    if (diagonal < 12) {
      return;
    }

    /*
     * STRAIGHT-LINE DETECTION
     *
     * The code checks how far each point strays
     * from a line connecting the start and end.
     */
    const endToEnd =
      distance(first, last);

    const maxLineDeviation = Math.max(
      ...points.map(point =>
        distanceFromLine(point, first, last)
      )
    );

    /*
     * Increase 0.075 to make line snapping
     * more forgiving.
     */
    const lineTolerance = Math.max(
      6,
      endToEnd * 0.075
    );

    if (
      endToEnd > 20 &&
      maxLineDeviation <= lineTolerance
    ) {
      stroke.shape = 'line';
      stroke.start = first;
      stroke.end = last;
      return;
    }

    /*
     * CIRCLE / OVAL DETECTION
     *
     * If the beginning and ending points are
     * close together, the gesture is treated
     * as a closed shape.
     */
    const closureDistance =
      distance(first, last);

    /*
     * Increase 0.24 to make circle snapping
     * more forgiving.
     */
    const isClosed =
      closureDistance <=
      Math.max(18, diagonal * 0.24);

    const isLargeEnough =
      width >= 18 && height >= 18;

    if (isClosed && isLargeEnough) {
      stroke.shape = 'ellipse';

      stroke.bounds = {
        x: minX,
        y: minY,
        width,
        height
      };
    }
  };

  const redrawStrokes = () => {
    ctx.clearRect(
      0,
      0,
      canvas.width,
      canvas.height
    );

    strokes.forEach(stroke => {
      if (stroke.points.length < 2) {
        return;
      }

      ctx.save();

      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';
      ctx.lineWidth = stroke.size;
      ctx.strokeStyle = stroke.color;

      ctx.globalCompositeOperation =
        stroke.erasing
          ? 'destination-out'
          : 'source-over';

      ctx.beginPath();

      if (stroke.shape === 'line') {
        ctx.moveTo(
          stroke.start.x,
          stroke.start.y
        );

        ctx.lineTo(
          stroke.end.x,
          stroke.end.y
        );
      } else if (stroke.shape === 'ellipse') {
        const {
          x,
          y,
          width,
          height
        } = stroke.bounds;

        ctx.ellipse(
          x + width / 2,
          y + height / 2,
          width / 2,
          height / 2,
          0,
          0,
          Math.PI * 2
        );
      } else {
        ctx.moveTo(
          stroke.points[0].x,
          stroke.points[0].y
        );

        stroke.points
          .slice(1)
          .forEach(point => {
            ctx.lineTo(point.x, point.y);
          });
      }

      ctx.stroke();
      ctx.restore();
    });
  };

  const pagePoint = event => {
    return {
      x: event.clientX + window.scrollX,
      y: event.clientY + window.scrollY
    };
  };

  const startDrawing = event => {
    if (
      !document.body.classList.contains(
        'drawing-mode'
      )
    ) {
      return;
    }

    drawing = true;

    currentStroke = {
      points: [pagePoint(event)],
      color: drawColor.value,
      size: Number(drawSize.value),
      erasing
    };

    strokes.push(currentStroke);

    if (canvas.setPointerCapture) {
      canvas.setPointerCapture(
        event.pointerId
      );
    }

    event.preventDefault();
  };

  const continueDrawing = event => {
    if (!drawing || !currentStroke) {
      return;
    }

    currentStroke.points.push(
      pagePoint(event)
    );

    redrawStrokes();
    event.preventDefault();
  };

  const stopDrawing = event => {
    if (!drawing || !currentStroke) {
      return;
    }

    finalizeStroke(currentStroke);

    drawing = false;
    currentStroke = null;

    if (
      event &&
      canvas.releasePointerCapture &&
      canvas.hasPointerCapture(event.pointerId)
    ) {
      canvas.releasePointerCapture(
        event.pointerId
      );
    }

    redrawStrokes();
  };

  drawingToggle.addEventListener(
    'click',
    () => {
      const enabled =
        document.body.classList.toggle(
          'drawing-mode'
        );

      drawingToolbar.classList.toggle(
        'open',
        enabled
      );

      drawingToggle.setAttribute(
        'aria-pressed',
        String(enabled)
      );

      if (enabled) {
        sizeCanvas();
      }
    }
  );

  const penTool =
    document.getElementById('penTool');

  const eraserTool =
    document.getElementById('eraserTool');

  const undoDraw =
    document.getElementById('undoDraw');

  const clearDraw =
    document.getElementById('clearDraw');

  const saveDraw =
    document.getElementById('saveDraw');

  if (penTool) {
    penTool.addEventListener('click', () => {
      erasing = false;
    });
  }

  if (eraserTool) {
    eraserTool.addEventListener('click', () => {
      erasing = true;
    });
  }

  if (undoDraw) {
    undoDraw.addEventListener('click', () => {
      strokes.pop();
      redrawStrokes();
    });
  }

  if (clearDraw) {
    clearDraw.addEventListener('click', () => {
      strokes.length = 0;
      redrawStrokes();
    });
  }

  if (saveDraw) {
    saveDraw.addEventListener(
      'click',
      async () => {
        if (
          !navigator.mediaDevices ||
          !navigator.mediaDevices.getDisplayMedia
        ) {
          alert(
            'Screen capture is not supported in this browser. Please use a current version of Chrome, Edge, or Firefox.'
          );

          return;
        }

        let stream;

        try {
          stream =
            await navigator.mediaDevices
              .getDisplayMedia({
                video: {
                  displaySurface: 'browser'
                },
                audio: false,
                preferCurrentTab: true,
                selfBrowserSurface: 'include',
                surfaceSwitching: 'exclude'
              });

          const captureVideo =
            document.createElement('video');

          captureVideo.srcObject = stream;
          captureVideo.muted = true;
          captureVideo.playsInline = true;

          await captureVideo.play();

          const previousToolbarVisibility =
            drawingToolbar.style.visibility;

          const progressBar =
            document.querySelector(
              '.scroll-progress'
            );

          const previousProgressVisibility =
            progressBar
              ? progressBar.style.visibility
              : '';

          drawingToolbar.style.visibility =
            'hidden';

          if (progressBar) {
            progressBar.style.visibility =
              'hidden';
          }

          await new Promise(resolve => {
            setTimeout(resolve, 250);
          });

          const track =
            stream.getVideoTracks()[0];

          const settings =
            track.getSettings();

          const screenshotCanvas =
            document.createElement('canvas');

          screenshotCanvas.width =
            settings.width ||
            captureVideo.videoWidth ||
            window.innerWidth;

          screenshotCanvas.height =
            settings.height ||
            captureVideo.videoHeight ||
            window.innerHeight;

          const screenshotContext =
            screenshotCanvas.getContext('2d');

          screenshotContext.drawImage(
            captureVideo,
            0,
            0,
            screenshotCanvas.width,
            screenshotCanvas.height
          );

          drawingToolbar.style.visibility =
            previousToolbarVisibility;

          if (progressBar) {
            progressBar.style.visibility =
              previousProgressVisibility;
          }

          const link =
            document.createElement('a');

          link.download =
            `portfolio-screenshot-${
              new Date()
                .toISOString()
                .replace(/[:.]/g, '-')
            }.png`;

          link.href =
            screenshotCanvas.toDataURL(
              'image/png'
            );

          link.click();
        } catch (error) {
          if (
            error &&
            error.name !== 'NotAllowedError'
          ) {
            console.error(
              'Screenshot failed:',
              error
            );

            alert(
              'The screenshot could not be created. Please try again and select this browser tab when prompted.'
            );
          }
        } finally {
          if (stream) {
            stream
              .getTracks()
              .forEach(track => track.stop());
          }

          drawingToolbar.style.visibility = '';

          const progressBar =
            document.querySelector(
              '.scroll-progress'
            );

          if (progressBar) {
            progressBar.style.visibility = '';
          }
        }
      }
    );
  }

  canvas.addEventListener(
    'pointerdown',
    startDrawing
  );

  canvas.addEventListener(
    'pointermove',
    continueDrawing
  );

  canvas.addEventListener(
    'pointerup',
    stopDrawing
  );

  canvas.addEventListener(
    'pointercancel',
    stopDrawing
  );

  window.addEventListener('resize', () => {
    if (
      document.body.classList.contains(
        'drawing-mode'
      )
    ) {
      sizeCanvas();
    }
  });

  // Magnetic button effect
  const magneticElements =
    document.querySelectorAll('.magnetic');

  const canHover =
    window.matchMedia(
      '(hover: hover) and (pointer: fine)'
    ).matches;

  const reducedMotion =
    window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;

  if (canHover && !reducedMotion) {
    magneticElements.forEach(element => {
      const strength = 0.28;

      element.addEventListener(
        'pointermove',
        event => {
          const rect =
            element.getBoundingClientRect();

          const offsetX =
            event.clientX -
            (rect.left + rect.width / 2);

          const offsetY =
            event.clientY -
            (rect.top + rect.height / 2);

          element.style.transform =
            `translate3d(` +
            `${offsetX * strength}px, ` +
            `${offsetY * strength}px, ` +
            `0)`;
        }
      );

      element.addEventListener(
        'pointerleave',
        () => {
          element.style.transform =
            'translate3d(0, 0, 0)';
        }
      );
    });
  }
})();


  document.addEventListener("DOMContentLoaded", () => {
    const closeButton = document.getElementById("floatingCaseClose");
    const caseStudies = document.querySelectorAll(".case-study-detail");

    let activeCaseStudy = null;

    function updateCloseButton() {
      activeCaseStudy = [...caseStudies].find((caseStudy) => caseStudy.open);

      closeButton.classList.toggle(
        "is-visible",
        Boolean(activeCaseStudy)
      );
    }

    caseStudies.forEach((caseStudy) => {
      caseStudy.addEventListener("toggle", () => {
        if (caseStudy.open) {
          caseStudies.forEach((otherCaseStudy) => {
            if (otherCaseStudy !== caseStudy) {
              otherCaseStudy.open = false;
            }
          });
        }

        updateCloseButton();
      });
    });

    closeButton.addEventListener("click", () => {
      if (!activeCaseStudy) return;

      const caseStudyToClose = activeCaseStudy;

      caseStudyToClose.open = false;

      caseStudyToClose.scrollIntoView({
        behavior: "smooth",
        block: "start"
      });

      updateCloseButton();
    });

    updateCloseButton();
  });

  
document.addEventListener("DOMContentLoaded", () => {
  const caseStudies = document.querySelectorAll("details.case-study-detail");

  caseStudies.forEach((caseStudy) => {
    const expanded = caseStudy.querySelector(":scope > .case-expanded");
    if (!expanded || expanded.querySelector(":scope > .case-close-rail")) return;

    const closeRail = document.createElement("div");
    closeRail.className = "case-close-rail";

    const closeButton = document.createElement("button");
    closeButton.type = "button";
    closeButton.className = "case-close-btn";
    closeButton.setAttribute("aria-label", "Close this case study");
    closeButton.innerHTML = '<span aria-hidden="true">×</span><span>Close</span>';

    closeButton.addEventListener("click", (event) => {
      event.preventDefault();
      event.stopPropagation();

      caseStudy.open = false;
      caseStudy.scrollIntoView({
        behavior: "smooth",
        block: "start"
      });
    });

    closeRail.appendChild(closeButton);
    expanded.appendChild(closeRail);
  });
});


    document.addEventListener("DOMContentLoaded", function() {
      const bgm = document.getElementById("bg-music");
      const clickSfx = document.getElementById("click-sfx");

      let isMuted = localStorage.getItem('isMuted') === 'true'; // Get the stored mute state

      // Ensure the volume is low
   // Initial volume settings
   bgm.volume = 0.1;
  bgm.muted = isMuted;

      // Ensure play starts on first user click
      window.addEventListener("click", () => {
        if (bgm.paused) {  // Make sure the background music is playing if it’s paused
          bgm.play();
        }
      });

    // Attach mute function to mute button
    document.querySelector('.mute-btn').addEventListener('click', toggleMute);
      function toggleMute() {
        isMuted = !isMuted;
        bgm.muted = isMuted;  // Properly mute/unmute
        clickSfx.muted = isMuted;
        
        // Update button text
        document.querySelector('.mute-btn').textContent = isMuted ? '🔇' : '🔊';
        
        // Store the new mute state in localStorage
        localStorage.setItem('isMuted', isMuted);
      }
        });

  const contactMenuToggle =
    document.getElementById("contactMenuToggle");

  const contactNav =
    document.getElementById("contactNav");

  if (contactMenuToggle && contactNav) {
    contactMenuToggle.addEventListener("click", () => {
      const isOpen =
        contactMenuToggle.getAttribute("aria-expanded") === "true";

      contactMenuToggle.setAttribute(
        "aria-expanded",
        String(!isOpen)
      );

      contactMenuToggle.setAttribute(
        "aria-label",
        isOpen ? "Open navigation" : "Close navigation"
      );

      contactNav.classList.toggle("open", !isOpen);
    });

    contactNav.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        contactNav.classList.remove("open");
        contactMenuToggle.setAttribute("aria-expanded", "false");
        contactMenuToggle.setAttribute(
          "aria-label",
          "Open navigation"
        );
      });
    });

    window.addEventListener("resize", () => {
      if (window.innerWidth > 980) {
        contactNav.classList.remove("open");
        contactMenuToggle.setAttribute("aria-expanded", "false");
      }
    });
  }
