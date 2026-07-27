# 00--init

This folder stores shared project setup and AI-agent context so different coding tools follow the same rules.

## Scope

- GitHub Copilot
- Claude Code
- Other code agents that support AGENTS.md style context

## How To Use

1. Keep shared guidance in `00--init/ai-shared-context.md`.
2. Keep discovery entry files minimal and aligned:
   - `.github/copilot-instructions.md`
   - `CLAUDE.md`
   - `AGENTS.md`
3. If project structure changes, update shared context first, then update the discovery files.

## Naming Convention

Repository organizational folders use:

- `xx--Name`

Examples in this repo:

- `00--init`
- `01--Portfolio`
- `98--Misc`

## Create Next Numbered Folder

Use the helper script to automatically choose the next `NN` value among sibling folders.

```bash
./00--init/scripts/new-numbered-folder.sh --name "Projects" --parent .
./00--init/scripts/new-numbered-folder.sh --name "Assets" --parent "01--Portfolio"
```

## Skill Reference

For repeatable audits and migrations, use:

- `00--init/SKILL--folder-numbering.md`

## Audit Naming Compliance

Run a one-command audit:

```bash
./00--init/scripts/audit-numbered-folders.sh .
```

This exits with a non-zero status when non-compliant folders are found.

### How To Use The Audit

1. Run from repo root:

```bash
./00--init/scripts/audit-numbered-folders.sh .
```

2. Interpret exit codes:

- `0` means all scanned folders are compliant (after allowlist exclusions).
- `1` means non-compliant folders were found.
- `2` means invalid input (for example, bad path).

3. If a folder is intentionally exempt, add it to:

- `00--init/folder-naming-allowlist.txt`

Each allowlist path exempts that folder and its nested subfolders.

4. Re-run the audit command until it returns `0`.
