# eriic-builds.github.io

This repository currently serves a static GitHub Pages site, but it is now structured so it can scale to CSS/JS-heavy pages or a React app.

## Current Structure

```
.
├── assets/
│   ├── css/
│   │   └── main.css
│   └── js/
│       └── main.js
├── index.html
├── portfolio/
│   └── README.md
└── README.md
```

## Why This Is Future-Proof

- `index.html` now references external CSS and JS instead of inline-only markup.
- `assets/css` and `assets/js` provide stable locations for growing frontend code.
- The structure remains fully compatible with GitHub Pages static hosting.

## Suggested Next Evolution (When You Are Ready)

1. Keep static pages in the root while complexity is low.
2. When you need React, create a dedicated app folder (for example `app/`) using Vite.
3. Build React output to a publishable folder for GitHub Pages, or deploy via GitHub Actions.
4. Keep shared static assets in a predictable place (`assets/` now, or move into app-managed assets later).

This lets you move gradually without breaking your existing site.

## Keep URL As `eriic-builds.github.io`

To keep the site URL as `https://eriic-builds.github.io` (without an extra repo path):

1. Keep the repository name exactly `eriic-builds.github.io`.
2. Publish from this same repository's default branch (root or `docs/`).
3. If you add a React build step, output the built files to the publish folder used by Pages.
4. For Vite, keep `base: "/"` so asset links resolve from the domain root.

If those rules stay in place, the homepage remains at the root domain.

## Source vs Publish Model

- Root files (`index.html`, `assets/`) are the currently published site.
- `portfolio/` is your future app workspace (React/CSS/JS growth area).
- Build in `portfolio/`, then publish build output to the GitHub Pages publish location.

This separation lets you develop freely without accidentally changing your domain behavior.
