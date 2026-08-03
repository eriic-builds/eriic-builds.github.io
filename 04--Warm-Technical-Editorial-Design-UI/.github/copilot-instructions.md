# UI Build Instructions

Use `DESIGN-SYSTEM_1.md` as the source of truth for visual and interaction decisions. The runnable neutral reference is `index.html`, with `styles.css` and `app.js` supplying presentation and behavior.

- Preserve the dense, warm, instrument-panel visual language.
- Use existing CSS custom properties before adding values. Add reusable values to `:root`; do not scatter literals through component rules.
- Keep red and green semantic: red means negative or alert, green means positive or live.
- Use semantic HTML and keyboard-accessible native controls. Toggle state belongs in `aria-pressed`.
- Render data graphics as seeded SVG in JavaScript so reloads are visually stable.
- Keep reference implementations dependency-free unless a requested capability clearly requires a library.
- Put project-specific references and instructions inside that project's folder rather than adding its assumptions here.