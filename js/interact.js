(() => {
  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const reveal = () => {
    const nodes = document.querySelectorAll(".reveal");
    if (!nodes.length) return;

    if (reduced || typeof gsap === "undefined") {
      nodes.forEach((el) => el.classList.add("is-in"));
      return;
    }

    gsap.set(nodes, { clipPath: "inset(16% 0 0 0)", opacity: 0.2 });

    const play = (el, delay) => {
      gsap.to(el, {
        clipPath: "inset(0% 0 0 0)",
        opacity: 1,
        duration: 0.85,
        delay,
        ease: "power3.out",
        onComplete: () => {
          el.classList.add("is-in");
          gsap.set(el, { clearProps: "clipPath,opacity" });
        },
      });
    };

    if (window.ScrollTrigger) {
      gsap.registerPlugin(ScrollTrigger);
      nodes.forEach((el, index) => {
        ScrollTrigger.create({
          trigger: el,
          start: "top 88%",
          once: true,
          onEnter: () => play(el, Math.min(index * 0.03, 0.18)),
        });
      });
      return;
    }

    gsap.to(nodes, {
      clipPath: "inset(0% 0 0 0)",
      opacity: 1,
      duration: 0.8,
      ease: "power3.out",
      stagger: 0.06,
    });
  };

  reveal();

  const markReels = () => {
    const icon = document.querySelector('link[rel="icon"]');
    const base = icon
      ? icon.href.replace(/favicon\.svg.*$/, "designs/")
      : "assets/images/designs/";

    document.querySelectorAll(".footer-bottom").forEach((row) => {
      if (row.querySelector(".mark-reel")) return;
      const mark = document.createElement("div");
      mark.className = "mark-reel mark-reel--footer";
      mark.setAttribute("aria-hidden", "true");
      row.prepend(mark);
    });

    const reels = document.querySelectorAll(".mark-reel");
    if (!reels.length) return;

    const frames = [
      "group-72.svg",
      "group-15.svg",
      "group-16.svg",
      "group-42.svg",
      "group-61.svg",
      "group-62.svg",
      "i.svg",
    ];

    const isHole = (value) => {
      const fill = (value || "").toLowerCase().trim();
      if (!fill || fill === "none") return false;
      if (fill === "black" || fill === "#000" || fill === "#000000") return true;
      const hex = fill.match(/^#([0-9a-f]{6})$/);
      if (!hex) return false;
      const n = parseInt(hex[1], 16);
      const r = (n >> 16) & 255;
      const g = (n >> 8) & 255;
      const b = n & 255;
      return r + g + b < 90;
    };

    const cache = new Map();

    const load = (file) => {
      const url = `${base}${file}`;
      if (!cache.has(url)) {
        cache.set(
          url,
          fetch(url)
            .then((res) => res.text())
            .then((text) => {
              const svg = new DOMParser().parseFromString(text, "image/svg+xml").documentElement;
              svg.removeAttribute("width");
              svg.removeAttribute("height");
              svg.setAttribute("preserveAspectRatio", "xMidYMid meet");
              svg.setAttribute("focusable", "false");
              svg.querySelectorAll("[fill]").forEach((node) => {
                const fill = node.getAttribute("fill") || "";
                if (!fill || fill.toLowerCase() === "none") return;
                node.setAttribute("fill", isHole(fill) ? "var(--paper)" : "currentColor");
              });
              svg.querySelectorAll("[stroke]").forEach((node) => {
                const stroke = node.getAttribute("stroke") || "";
                if (!stroke || stroke.toLowerCase() === "none") return;
                node.setAttribute("stroke", isHole(stroke) ? "var(--paper)" : "currentColor");
                node.setAttribute("stroke-opacity", "0.18");
              });
              return svg;
            })
        );
      }
      return cache.get(url);
    };

    const playReel = (reel, svgs) => {
      let stage = reel.querySelector(".mark-reel__stage");
      if (!stage) {
        stage = document.createElement("div");
        stage.className = "mark-reel__stage";
        reel.replaceChildren(stage);
      } else {
        stage.replaceChildren();
      }

      svgs.forEach((svg, index) => {
        const frame = svg.cloneNode(true);
        if (index === 0) frame.classList.add("is-on");
        stage.appendChild(frame);
      });

      const nodes = [...stage.children];
      const last = nodes.length - 1;
      nodes.forEach((node, index) => node.classList.toggle("is-on", index === last));
      if (reduced) return;

      const fade = 0.28;
      const step = 380;
      const wait = 2 * 60 * 1000;
      const canTween = typeof gsap !== "undefined";
      let current = last;
      let running = false;
      let nextShow = 0;

      if (canTween) {
        gsap.set(nodes, { opacity: 0 });
        gsap.set(nodes[last], { opacity: 1 });
      }

      const show = (next) => {
        if (next === current) return;
        if (canTween) {
          gsap.to(nodes[current], { opacity: 0, duration: fade, ease: "power2.inOut", overwrite: "auto" });
          gsap.to(nodes[next], { opacity: 1, duration: fade, ease: "power2.inOut", overwrite: "auto" });
        } else {
          nodes[current].classList.remove("is-on");
          nodes[next].classList.add("is-on");
        }
        current = next;
      };

      const playPath = (path) => {
        if (running) return Promise.resolve();
        running = true;
        return new Promise((resolve) => {
          let i = 0;
          show(path[0]);
          const tick = () => {
            i += 1;
            if (i >= path.length) {
              running = false;
              resolve();
              return;
            }
            show(path[i]);
            window.setTimeout(tick, step);
          };
          window.setTimeout(tick, step);
        });
      };

      const build = [0, 1, 2, 3, 4, 5, last];
      const rewind = [last, 5, 4, 3, 2, 1, 0, 1, 2, 3, 4, 5, last];

      const playNext = () => {
        const path = nextShow % 2 === 0 ? build : rewind;
        nextShow += 1;
        playPath(path);
      };

      window.setInterval(playNext, wait);
    };

    Promise.all(frames.map(load))
      .then((svgs) => {
        reels.forEach((reel) => playReel(reel, svgs));
      })
      .catch(() => {});
  };

  markReels();
})();
