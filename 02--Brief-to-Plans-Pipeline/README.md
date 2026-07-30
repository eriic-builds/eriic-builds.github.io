# 02 - Brief-to-Plans Pipeline

Moved to its own repository:

**https://github.com/eriic-builds/brief-to-plans**

## Why it moved

This repository is a GitHub Pages site with a `.nojekyll` file, so the branch
root is served verbatim. Keeping the pipeline here would have published its
docs — including the fictional example run and the known-gaps list — as part of
the portfolio site, and forced anyone installing it to clone the whole site to
reach three markdown files.

## Install

```powershell
irm https://raw.githubusercontent.com/eriic-builds/brief-to-plans/main/install.ps1 -OutFile install.ps1
pwsh -File install.ps1
```

Reload the VS Code window, then `/create-brief`, `/create-plans`, `/dev-report`.

## Why this folder still exists

Numbers record creation order and are never reused, so the `02--` slot stays
spent. See [SKILL--folder-numbering.md](../00--init/SKILL--folder-numbering.md).
