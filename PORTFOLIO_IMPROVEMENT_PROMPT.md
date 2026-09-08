# Portfolio Refinement Prompt — Purging AI Slop & Restoring Authentic Craft

Transform this portfolio from an AI-generated template full of faux-UI widgets, phantom case studies, and gimmicky scripts into an authentic, human-crafted, credible UX design portfolio for **Kiff Simon** (UX Designer & CS Student at Broward College).

---

## 1. Purge the Phantom Case Study (Altrovia / TrialFlow)

* **Delete `work/project-one.html`**:
  * The Altrovia project has no real image assets (`assets/images/case-studies/altrovia` is empty), was never linked in `index.html` or `work.html`, and relies on 100% fabricated CSS frames.
* **Clean References**:
  * In `about.html`, remove `"and Altrovia"` from the paragraph describing past project loops.
  * In `css/components.css` and `css/visual-v2.css`, remove the `.stage--altrovia` styles and color variables.
  * Delete the empty directory `assets/images/case-studies/altrovia/`.

---

## 2. Replace Faux-UI CSS Frames with Real Artifacts

Every case study currently replaces real design artifacts with generic simulated CSS browser/app mockups (`.stage`, `.frame`, `.frame__chrome`, `.frame__panel` with dead `.is-b` panels). Purge these fake frames and replace them with the actual design assets already present in `assets/images/case-studies/`:

* **Neo Sapiens (`work/project-four.html`)**:
  * Replace the hero `.stage--neosapiens` with `assets/images/case-studies/neo-sapiens/detail-2.jpg` (or `hero.png`).
  * Replace the secondary stage with authentic workflow screenshots (`detail-1.png`, `detail-3.jpg`).
* **Read2Text (`work/project-two.html`)**:
  * Replace hero `.stage--read2text` with `assets/images/case-studies/read2text/hero.jpg` or `detail-1.png`.
  * Replace the secondary stage with `detail-2.jpg` and `detail-3.jpg`.
* **Communify (`work/project-three.html`)**:
  * Replace hero `.stage--communify` with `assets/images/case-studies/communify/hero.png`.
  * Replace secondary stage with `detail-2.png` and `detail-3.png`.
* **Mnemonic Passwords (`work/project-five.html`)**:
  * Replace hero `.stage--mnemonic` with `assets/images/case-studies/mnemonic/hero.png` or `detail-5.png`.
  * Replace secondary stage with research diagrams and recall flows (`detail-2.png`, `detail-3.png`, `detail-4.png`).
* **Next Step (`work/project-six.html`)**:
  * Replace hero `.stage--nextstep` with `assets/images/case-studies/next-step/hero.png` or `detail-3.png`.
  * Replace secondary stage with mobile screens (`detail-4.png`, `detail-5.png`).
* **CSS Cleanup**:
  * Strip out all the fake `.stage--*`, `.frame`, `.frame__rail`, and `.frame__panel` CSS from `css/components.css` and `css/visual-v2.css`.

---

## 3. Strip Out Gimmicky Micro-Interactions & JS Bloat

Remove the over-engineered, template-style JavaScript behaviors:
* **Remove GSAP Count-Up**:
  * In `js/interact.js`, eliminate the `countUp` function and remove `data-count` / `data-suffix` attributes across all HTML files. Let stats like "1st place" and "2nd place" render statically and cleanly.
* **Remove 3D Tilt**:
  * In `js/interact.js`, eliminate the `tilt` function and remove all `data-tilt` attributes.
* **Remove Magnetic Button Pull**:
  * Remove `js/magnetic.js`, remove its `<script>` tag across all pages, and remove all `data-magnetic` attributes.
* **De-churn Grain Loop**:
  * In `js/grain.js`, remove the continuous 60fps velocity tracking `requestAnimationFrame` loop. Replace with static CSS noise or a lightweight, single-pass background texture without CPU churn. Remove redundant atmospheric DOM wrapper bloat (`atmosphere__grain-spot`, `grain-sheet`) where unnecessary.

---

## 4. Humanize the Copy & Eliminate AI Buzzword Bloat

* **Purge Sloganeering**:
  * Remove `"Paper, not polish."` from the footer across all pages. Replace with a clean, understated copyright line: `© 2026 Kiff Simon · Fort Lauderdale, FL`.
  * In `404.html`, change `"This page drifted off the paper."` to a direct, human message: `"This page couldn't be found."`
* **Broaden the Homepage Identity**:
  * Change the hero headline from `"I design the part of AI products people actually have to use."` to an inclusive UX statement:
    `"I design clear, grounded interfaces for complex tools, education, and community systems."`
* **Strip Fake Personas & Enterprise Roadmaps from Hackathons**:
  * In Neo Sapiens (`project-four.html`), replace fabricated 3-box persona cards (*Alex, Sarah*) with genuine reflections on designing the agent orchestration hierarchy under tight 5-day hackathon constraints. Remove the speculative *"Roadmap: Shared-memory protocol"* section.
  * In Communify (`project-three.html`), soften the corporate jargon (*"Consent before inference"*) into straightforward hackathon design rationale.

---

## 5. Unify Style & Resolve Conflicting Art Directions

Currently, `visual-v2.css` (rounded pill nav, soft shadows, large border-radii) and `art-direction.css` (flat Swiss typography, square corners, asterisk wordmark) conflict, and different pages load different subsets of these sheets.
* **Standardize Stylesheets**:
  * Ensure all pages (`index.html`, `work.html`, `about.html`, `contact.html`, `404.html`, and `work/*.html`) load the exact same coherent stylesheet hierarchy.
  * Unify the navigation bar, buttons, typography scale, and card styling so that navigating between Home, Work, About, and Case Studies does not jarringly shift between two design languages.
* **Preserve Responsive & Accessible Foundation**:
  * Maintain responsive behavior from 320px up to 1440px+ without horizontal overflow.
  * Maintain clean contrast, semantic HTML, keyboard focus rings, and proper `aria-current` / `alt` tags.

