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
    const script = document.querySelector('script[src*="interact.js"]');
    const base = script
      ? new URL("../assets/images/designs/", script.src).href
      : new URL("assets/images/designs/", document.baseURI).href;

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

    const palette = ["#f0ca3e", "#f15a43", "#3f73c5", "#f0ca3e", "#f15a43", "#3f73c5", "#3c7b5b"];
    const cache = new Map();

    const doodle = (svg, color) => {
      const parts = (svg.getAttribute("viewBox") || "0 0 100 120").trim().split(/[\s,]+/).map(Number);
      const vb = { x: parts[0] || 0, y: parts[1] || 0, width: parts[2] || 100, height: parts[3] || 120 };
      const ox = vb.width * 0.038;
      const oy = vb.height * 0.034;
      const strokeW = Math.max(2.4, Math.min(vb.width, vb.height) * 0.017);
      svg.setAttribute("overflow", "visible");
      svg.setAttribute("viewBox", `${vb.x} ${vb.y} ${vb.width + ox} ${vb.height + oy}`);

      const blobs = document.createElementNS("http://www.w3.org/2000/svg", "g");
      blobs.setAttribute("transform", `translate(${ox} ${oy})`);

      [...svg.querySelectorAll("path, circle, ellipse, polygon, rect")].forEach((node) => {
        const fill = node.getAttribute("fill") || "";
        if (!fill || fill.toLowerCase() === "none") {
          const stroke = node.getAttribute("stroke") || "";
          if (stroke && stroke.toLowerCase() !== "none") {
            node.setAttribute("stroke", "#11110f");
            node.removeAttribute("stroke-opacity");
          }
          return;
        }
        if (isHole(fill)) {
          node.setAttribute("fill", "#11110f");
          node.removeAttribute("stroke");
          return;
        }
        const blob = node.cloneNode(true);
        blob.setAttribute("fill", color);
        blob.removeAttribute("stroke");
        blobs.appendChild(blob);
        node.setAttribute("fill", "none");
        node.setAttribute("stroke", "#11110f");
        node.setAttribute("stroke-width", String(strokeW));
        node.setAttribute("stroke-linejoin", "round");
        node.setAttribute("stroke-linecap", "round");
        node.removeAttribute("stroke-opacity");
      });

      if (blobs.childNodes.length) svg.insertBefore(blobs, svg.firstChild);
    };

    const load = (file, color) => {
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
              doodle(svg, color);
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

      svgs.forEach((svg) => {
        stage.appendChild(svg.cloneNode(true));
      });

      const nodes = [...stage.children];
      const last = nodes.length - 1;
      const canTween = typeof gsap !== "undefined";
      const fade = 0.45;
      const hold = 60 * 1000;
      let current = last;

      nodes.forEach((node, index) => {
        node.classList.toggle("is-on", index === last);
        if (canTween) gsap.set(node, { opacity: index === last ? 1 : 0 });
      });
      reel.classList.add("is-ready");

      if (reduced || nodes.length < 2) return;

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

      window.setInterval(() => {
        if (document.hidden) return;
        show((current + 1) % nodes.length);
      }, hold);
    };

    Promise.all(frames.map((file, i) => load(file, palette[i % palette.length])))
      .then((svgs) => {
        reels.forEach((reel) => playReel(reel, svgs));
      })
      .catch(() => {});
  };

  markReels();
})();
