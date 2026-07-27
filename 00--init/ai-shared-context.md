# Shared AI Context

## Purpose

This repo is a personal portfolio shown to employers, published at https://eriic-builds.github.io.

- `index.html` — the live root entry page.
- `01--Portfolio/` — portfolio workspace; frontend assets in `assets/css` and `assets/js`.
- `98--Misc/` — unrelated side projects and archives.
- `00--init/` — conventions, AI context, helper scripts.

## Hard Rules

1. Never break root-domain publishing. `index.html` stays at the repo root.
2. Every root-level folder name is a public URL segment (`/<folder>/`). Never rename or move one that serves a live path, such as redirect stubs.
3. When renaming folders, update every HTML and doc reference.
4. If React/Vite is added, keep `base: "/"`.
5. Portfolio-facing content is read by employers — keep it presentable.

## Folder Naming

Folders (never files) use `NN--Name`, numbered sequentially within each parent.
Each level owns its own sequence, restarting at `01` inside every parent:
`98--Misc/` (L1) contains `01--Sled-mywcbracket/` (L2), which holds the files.

Semantic exceptions such as `assets`, `css`, and `js` are listed in `00--init/folder-naming-allowlist.txt`.

Apply numbering only to the scope the user explicitly names. Never repo-wide by default; ask for the exact path if scope is unclear.

## Reference

- Convention details: `00--init/SKILL--folder-numbering.md`
- Build playbook: `01--Portfolio/HOW-TO-BUILD.md`
- New folder: `./00--init/scripts/new-numbered-folder.sh --name "X" --parent .`
- Audit: `./00--init/scripts/audit-numbered-folders.sh .`
