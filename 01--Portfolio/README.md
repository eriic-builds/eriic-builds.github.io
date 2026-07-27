# Portfolio Source Folder

This folder is where you can build your future portfolio app (including React) without touching the live GitHub Pages root files.

Right now, the root `index.html` references files in `01--Portfolio/assets`, so this folder is already the main frontend workspace.

For the full repeatable process, see the build playbook in `HOW-TO-BUILD.md`.

## Goal

Keep the public site URL as:

- https://eriic-builds.github.io

## Safe Workflow

1. Build and iterate inside this `01--Portfolio/` folder.
2. Keep GitHub Pages publishing from the repository root (or a defined publish folder).
3. When ready to deploy React, publish the build output (for example `dist/`) to the configured Pages publish location.
4. If using Vite, keep `base: "/"`.

## Suggested React Bootstrap (When Ready)

From inside `01--Portfolio/`:

```bash
npm create vite@latest . -- --template react
npm install
npm run dev
```

Then for production build:

```bash
npm run build
```

After build, publish the built files to your Pages publish target.
