(function () {
  const gooseEmoji = "🪿";
  const playgrounds = [];
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const peekPhrases = ["honk", "WAT?!", "quack", "гагага"];

  function randomBetween(min, max) {
    return min + Math.random() * (max - min);
  }

  function createGoose(playground, x, y, options = {}) {
    const el = document.createElement("button");
    el.type = "button";
    el.className = "goose-sprite";
    el.textContent = gooseEmoji;
    el.setAttribute("aria-label", "Увеличить гуся");

    const size = options.size || randomBetween(34, 58);
    const speed = options.speed || randomBetween(70, 150);
    const angle = options.angle || randomBetween(0, Math.PI * 2);
    const goose = {
      el,
      x,
      y,
      size,
      vx: Math.cos(angle) * speed,
      vy: Math.sin(angle) * speed,
      spin: randomBetween(-150, 150),
      rotation: randomBetween(-18, 18),
      scale: 1,
      popping: false
    };

    el.addEventListener("click", (event) => {
      event.stopPropagation();
      if (goose.popping) return;
      goose.scale += 0.22;
      if (goose.scale > 1.9) {
        goose.popping = true;
        const direction = goose.vx < 0 ? -1 : 1;
        el.style.opacity = "0";
        el.style.transition = "opacity 240ms ease, transform 240ms ease";
        el.style.transform = `translate3d(${goose.x}px, ${goose.y}px, 0) scale(${direction * 2.4}, 2.4) rotate(${goose.rotation + 24}deg)`;
        setTimeout(() => {
          playground.geese = playground.geese.filter((item) => item !== goose);
          el.remove();
        }, 240);
      }
    });

    playground.node.append(el);
    playground.geese.push(goose);
    renderGoose(goose);
  }

  function renderGoose(goose) {
    const direction = goose.vx < 0 ? -1 : 1;
    goose.el.style.width = `${goose.size}px`;
    goose.el.style.height = `${goose.size}px`;
    goose.el.style.fontSize = `${goose.size}px`;
    goose.el.style.transform = `translate3d(${goose.x}px, ${goose.y}px, 0) scale(${direction * goose.scale}, ${goose.scale}) rotate(${goose.rotation}deg)`;
  }

  function seedPlayground(playground) {
    const count = Number(playground.node.dataset.initialGeese || 4);
    const rect = playground.node.getBoundingClientRect();
    const width = Math.max(rect.width, 320);
    const height = Math.max(rect.height, 180);
    for (let i = 0; i < count; i += 1) {
      createGoose(playground, randomBetween(20, width - 80), randomBetween(24, height - 80));
    }
  }

  function tick(now) {
    playgrounds.forEach((playground) => {
      const rect = playground.node.getBoundingClientRect();
      const dt = Math.min((now - playground.lastTime) / 1000, 0.04);
      playground.lastTime = now;

      playground.geese.forEach((goose) => {
        if (goose.popping || reduceMotion) return;
        goose.x += goose.vx * dt;
        goose.y += goose.vy * dt;
        goose.rotation += goose.spin * dt;

        const maxX = Math.max(0, rect.width - goose.size * goose.scale);
        const maxY = Math.max(0, rect.height - goose.size * goose.scale);
        if (goose.x <= 0 || goose.x >= maxX) {
          goose.vx *= -1;
          goose.x = Math.max(0, Math.min(goose.x, maxX));
        }
        if (goose.y <= 0 || goose.y >= maxY) {
          goose.vy *= -1;
          goose.y = Math.max(0, Math.min(goose.y, maxY));
        }
        renderGoose(goose);
      });
    });
    requestAnimationFrame(tick);
  }

  function initGeese() {
    document.querySelectorAll("[data-goose-playground]").forEach((node) => {
      const playground = { node, geese: [], lastTime: performance.now() };
      playgrounds.push(playground);

      node.addEventListener("click", (event) => {
        if (event.target !== node) return;
        const rect = node.getBoundingClientRect();
        createGoose(playground, event.clientX - rect.left - 24, event.clientY - rect.top - 24, {
          size: 48
        });
      });

      seedPlayground(playground);
    });

    if (playgrounds.length > 0) {
      requestAnimationFrame(tick);
    }
  }

  function pickVisibleAnchor(previousLeft) {
    const nodes = Array.from(document.querySelectorAll("section, article, h1, h2, h3, footer, pre"));
    const candidates = [];
    const minTop = 130;
    const maxBottom = window.innerHeight - 64;
    const minLeft = 70;
    const maxLeft = window.innerWidth - 120;

    nodes.forEach((node) => {
      const rect = node.getBoundingClientRect();
      if (rect.width <= 120 || rect.height <= 24) return;
      [
        { edge: "top", top: rect.top },
        { edge: "bottom", top: rect.bottom }
      ].forEach((candidate) => {
        if (candidate.top <= minTop || candidate.top >= maxBottom) return;
        const left = Math.max(minLeft, Math.min(rect.left + randomBetween(40, Math.max(41, rect.width - 40)), maxLeft));
        if (previousLeft !== undefined && Math.abs(left - previousLeft) < 120) return;
        candidates.push({ left, top: candidate.top, edge: candidate.edge });
      });
    });

    if (candidates.length === 0) {
      return null;
    }
    const center = window.innerWidth / 2;
    candidates.sort((a, b) => Math.abs(a.left - center) - Math.abs(b.left - center));
    return candidates[Math.floor(Math.random() * Math.min(candidates.length, 5))];
  }

  function createPeekGoose() {
    const root = document.createElement("div");
    root.className = "peek-goose";
    root.setAttribute("aria-hidden", "true");
    root.innerHTML = `
      <div class="peek-goose-bubble"></div>
      <div class="peek-goose-window">
        <div class="peek-goose-body">
          <svg width="50" height="55" viewBox="0 0 50 55" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M20 55 C20 55, 19 40, 21 30 C23 20, 25 16, 25 14" stroke="#e5e7eb" stroke-width="10" stroke-linecap="round" fill="none"/>
            <path d="M20 55 C20 55, 19 40, 21 30 C23 20, 25 16, 25 14" stroke="#d1d5db" stroke-width="6" stroke-linecap="round" fill="none"/>
            <g class="peek-goose-head">
              <ellipse cx="25" cy="11" rx="11" ry="10" fill="#e5e7eb"/>
              <ellipse cx="25" cy="11" rx="8" ry="7" fill="#d1d5db"/>
              <circle cx="29" cy="8" r="2" fill="#1f2937"/>
              <circle cx="29.7" cy="7.5" r="0.6" fill="#ffffff"/>
              <path d="M35 11 L45 9 L44 13 Z" fill="#f97316"/>
              <path d="M35 11.5 L44 11 L44 13 Z" fill="#ea580c"/>
            </g>
          </svg>
        </div>
      </div>
    `;
    document.body.append(root);
    return root;
  }

  function initPeekGoose() {
    if (reduceMotion) return;
    const goose = createPeekGoose();
    const bubble = goose.querySelector(".peek-goose-bubble");
    let busy = false;
    let lastLeft;
    let timer;

    function hideGoose() {
      goose.classList.remove("is-visible", "is-speaking", "is-looking-left", "is-looking-right");
      busy = false;
    }

    function showGoose() {
      if (busy) return;
      busy = true;
      const position = pickVisibleAnchor(lastLeft);
      if (!position) {
        busy = false;
        return;
      }
      lastLeft = position.left;
      goose.style.left = `${position.left - 25}px`;
      goose.style.top = position.edge === "top" ? `${position.top - 54}px` : `${position.top - 55}px`;
      goose.classList.toggle("from-top", position.edge === "top");
      goose.classList.toggle("from-bottom", position.edge === "bottom");
      bubble.textContent = peekPhrases[Math.floor(Math.random() * peekPhrases.length)];

      goose.classList.add("is-visible");
      setTimeout(() => goose.classList.add("is-looking-left"), 850);
      setTimeout(() => {
        goose.classList.remove("is-looking-left");
        goose.classList.add("is-looking-right");
      }, 1450);
      setTimeout(() => {
        goose.classList.remove("is-looking-right");
        goose.classList.add("is-speaking");
      }, 2050);
      setTimeout(hideGoose, 3900);
    }

    function scheduleNext(min = 10000, max = 20000) {
      clearTimeout(timer);
      timer = setTimeout(() => {
        showGoose();
        scheduleNext(min, max);
      }, randomBetween(min, max));
    }

    goose.addEventListener("click", () => {
      if (!busy) showGoose();
    });

    if (new URLSearchParams(location.search).has("goose")) {
      timer = setTimeout(() => {
        showGoose();
        scheduleNext(3000, 5000);
      }, 700);
    } else {
      timer = setTimeout(() => {
        showGoose();
        scheduleNext(10000, 20000);
      }, randomBetween(3000, 5000));
    }

    window.addEventListener("pagehide", () => clearTimeout(timer));
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", () => {
      initGeese();
      initPeekGoose();
    });
  } else {
    initGeese();
    initPeekGoose();
  }
}());
