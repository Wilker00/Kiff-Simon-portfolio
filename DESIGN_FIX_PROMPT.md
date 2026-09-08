# Responsive scale fix prompt

Audit this portfolio at 1440px, 1024px, 768px, 390px, and 320px widths. Preserve its quiet editorial style, restrained blue palette, typography, grain treatment, and existing content.

Fix the responsive scale so the hero headline is prominent without dominating the desktop layout, the two-column hero stacks before either column becomes cramped, and spacing contracts smoothly on phones. Keep text readable and avoid clipped words, horizontal scrolling, or content hidden by `overflow-x`.

Make the product mockups fluid: every nested CSS grid must allow its content column to shrink, long labels must wrap, and the frame must remain inside its stage at all supported widths. Keep touch targets at least 40px high, preserve keyboard focus and reduced-motion behavior, and do not replace semantic HTML with decorative markup.

Verify every page and local link after the changes. Report the viewport sizes tested, any remaining overflow, and the exact files changed.
