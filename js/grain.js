(() => {
  const root = document.documentElement;
  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const coarse = window.matchMedia("(pointer: coarse)").matches;

  if (reduced) root.classList.add("reduce-motion");
  if (coarse) root.classList.add("is-touch");

  root.style.setProperty("--px", "0.5");
  root.style.setProperty("--py", "0.3");
  root.style.setProperty("--pv", "0");
})();
