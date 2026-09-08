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

  const form = document.querySelector("#contact-form");
  if (!form) return;

  const status = form.querySelector(".form-status");

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const data = new FormData(form);
    const name = String(data.get("name") || "").trim();
    const email = String(data.get("email") || "").trim();
    const message = String(data.get("message") || "").trim();

    if (!name || !email || !message) {
      if (status) status.textContent = "Please fill in all fields.";
      return;
    }

    const subject = encodeURIComponent(`Portfolio note from ${name}`);
    const body = encodeURIComponent(`${message}\n\n— ${name}\n${email}`);
    window.location.href = `mailto:wilkersimon15@gmail.com?subject=${subject}&body=${body}`;
    if (status) {
      status.textContent =
        "Your email app should open with this note. If it does not, write wilkersimon15@gmail.com — the form was not cleared.";
    }
  });
})();
