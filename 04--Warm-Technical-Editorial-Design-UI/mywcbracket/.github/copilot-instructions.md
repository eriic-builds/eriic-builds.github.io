# UI Build Instructions

Use `MYWCBRACKET-DESIGN.md` as the product-specific source of truth and the workspace-level `DESIGN-SYSTEM_1.md` for the underlying instrument-panel tokens. The runnable reference is `index.html`, with `mywcbracket-ui.css` and `mywcbracket-ui.js` supplying presentation and behavior.

- Preserve the dense, warm, instrument-panel visual language.
- Use existing CSS custom properties before adding values. Add reusable values to `:root`; do not scatter literals through component rules.
- Keep red and green semantic: red means negative or alert, green means positive or live.
- Use semantic HTML and keyboard-accessible native controls. Toggle state belongs in `aria-pressed`.
- Render data graphics as seeded SVG in JavaScript so reloads are visually stable.
- Keep the app dependency-free unless a requested capability clearly requires a library.
- This UI targets `eriic-builds/mywcbracket`: preserve its static GitHub Pages, zero-backend, browser-owned data, consent-based share-link, and no-build contracts.
- Keep the primary product hierarchy: score and bracket health, full 31-match path, match facts, then local pool controls.
- Actual and My Picks views are state variants of one bracket geometry. Do not maintain separate hand-written bracket structures.