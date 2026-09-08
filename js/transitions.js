(() => {
  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (reduced) return;
  if (!document.startViewTransition) return;

  const sameOrigin = (anchor) => {
    try {
      const url = new URL(anchor.href, window.location.href);
      return url.origin === window.location.origin;
    } catch {
      return false;
    }
  };

  document.addEventListener("click", (event) => {
    const anchor = event.target.closest("a");
    if (!anchor || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    if (anchor.target === "_blank" || anchor.hasAttribute("download")) return;
    if (!sameOrigin(anchor)) return;

    const next = new URL(anchor.href, window.location.href);
    if (next.pathname === window.location.pathname && next.hash) return;
    if (next.href === window.location.href) return;

    event.preventDefault();
    document.startViewTransition(() => {
      window.location.href = next.href;
    });
  });
})();
