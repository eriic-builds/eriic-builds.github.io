# Portfolio Build Guide

Use this guide when you are ready to build and deploy your portfolio while keeping the public URL at:

- https://eriic-builds.github.io

## Build Model

- portfolio folder = source code
- repository publish target = live website files
- output must include an index.html at the publish root

## One-Time Setup

1. Open terminal in this folder.
2. Create the app when ready:

```bash
npm create vite@latest . -- --template react
npm install
```

3. Confirm vite config uses root base path:

```js
// vite.config.js
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  base: "/",
});
```

## Daily Development

1. Start local dev server:

```bash
npm run dev
```

2. Make your changes.
3. Verify locally.

## Production Build

Run:

```bash
npm run build
```

This creates a dist folder with production files.

## Deploy Options

Choose one deployment path and stay consistent.

### Option A: Manual Publish To Root

1. Build in portfolio:

```bash
npm run build
```

2. Copy build output into repository root publish files.
3. Commit and push.

Use this when you want full manual control.

### Option B: GitHub Actions Deploy Recommended

1. Build in portfolio from CI.
2. Publish dist output automatically to Pages.

Use this to reduce mistakes and keep deploy repeatable.

## Pre-Deploy Checklist

1. vite base is set to /.
2. Build completes with no errors.
3. Output contains index.html.
4. Pages publish source matches your chosen deploy path.
5. Final URL target remains https://eriic-builds.github.io.

## Quick Commands Reference

```bash
# install deps
npm install

# local dev
npm run dev

# production build
npm run build
```

## Common Mistakes To Avoid

1. Setting vite base to a subpath.
2. Publishing source files instead of build output.
3. Changing Pages source without updating your process.
4. Deleting root publish index.html before deploy is ready.
