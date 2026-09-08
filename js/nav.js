(() => {
  const toggle = document.querySelector(".nav-toggle");
  const nav = document.querySelector(".site-nav");
  const mobileNav = window.matchMedia("(max-width: 991.98px)");

  if (toggle && nav) {
    const sync = (open) => {
      document.body.classList.toggle("nav-open", open);
      toggle.setAttribute("aria-expanded", String(open));
      toggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");

      if (mobileNav.matches) {
        nav.setAttribute("aria-hidden", String(!open));
        if (open) nav.removeAttribute("inert");
        else nav.setAttribute("inert", "");
      } else {
        nav.removeAttribute("aria-hidden");
        nav.removeAttribute("inert");
        document.body.classList.remove("nav-open");
        toggle.setAttribute("aria-expanded", "false");
        toggle.setAttribute("aria-label", "Open menu");
      }
    };

    const close = () => sync(false);

    sync(false);

    toggle.addEventListener("click", () => {
      sync(!document.body.classList.contains("nav-open"));
    });

    nav.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", close);
    });

    window.addEventListener("keydown", (event) => {
      if (event.key === "Escape") close();
    });

    const onBreakpoint = () => sync(false);
    if (typeof mobileNav.addEventListener === "function") {
      mobileNav.addEventListener("change", onBreakpoint);
    } else if (typeof mobileNav.addListener === "function") {
      mobileNav.addListener(onBreakpoint);
    }
  }

  const copyBtn = document.querySelector(".btn-copy-email");
  if (copyBtn) {
    copyBtn.addEventListener("click", async () => {
      const email = copyBtn.getAttribute("data-email") || "wilkersimon15@gmail.com";
      try {
        await navigator.clipboard.writeText(email);
        const originalText = copyBtn.textContent;
        copyBtn.textContent = "Copied!";
        copyBtn.classList.add("is-copied");
        setTimeout(() => {
          copyBtn.textContent = originalText;
          copyBtn.classList.remove("is-copied");
        }, 2000);
      } catch {
        window.location.href = `mailto:${email}`;
      }
    });
  }
})();
