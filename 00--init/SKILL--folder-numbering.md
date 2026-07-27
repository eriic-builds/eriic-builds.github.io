# Skill: Folder Numbering Convention

Use this skill when you want to enforce or migrate folder names to the repository convention:

- `NN--FolderName`

This applies to folders only, not files.

Default rule is numbered folders, but semantic technical leaf folders are allowed when readability is better (for example `css`, `js`) and must be tracked in the allowlist.

## Objective

Ensure folder names are:

1. Numbered with 2 digits (`01`, `02`, `03`, ...)
2. Separated by a double hyphen (`--`)
3. Sequential among siblings at the same level

## Current Repo Baseline

At time of creation, key top-level folders are:

- `00--init`
- `01--Portfolio`
- `98--Misc`

This means:

- Canonical workspace is present and compliant.
- `98--Misc` is intentionally reserved for late-order miscellaneous/archive content.

## When To Use

Use this skill when:

1. Creating a new folder at any level
2. Renaming folders to match convention
3. Reviewing repo readability/consistency
4. Performing future structure refactors

## Scope-First Rule

Numbering changes are opt-in per request scope.

1. Only apply numbering where the user explicitly points.
2. Required scope includes:
- parent folder path
- target subfolder path or group
3. If scope is ambiguous, request the exact path before making changes.
4. Never run repo-wide renaming unless the user explicitly asks for global migration.

## Quick Start

Create the next numbered sibling automatically:

```bash
./00--init/scripts/new-numbered-folder.sh --name "Projects" --parent .
./00--init/scripts/new-numbered-folder.sh --name "Assets" --parent "01--Portfolio"
```

Audit naming compliance:

```bash
./00--init/scripts/audit-numbered-folders.sh .
```

If the command exits `1`, review printed `NON_COMPLIANT` paths and either:

1. Rename those folders to `NN--Name`, or
2. Add intentional exceptions to `00--init/folder-naming-allowlist.txt`.

An allowlist path works as a subtree whitelist. Example:

- `01--Portfolio` exempts that folder plus nested folders such as `assets`, `css`, and `js`.

## Audit Procedure

1. List directories:

```bash
find . -maxdepth 4 -type d | sort
```

2. Ignore internal/tooling directories during review:

- `.git`
- `.github`

3. For each parent directory:

- Collect child folders matching `NN--...`
- Confirm `NN` is 2 digits
- Confirm no duplicate `NN` among siblings
- Confirm sequence is intentional for that level

## Migration Procedure

1. Choose target parent and desired ordered names.
2. Rename folders to `NN--Name`.
3. Update all path references in:

- `index.html`
- `README.md`
- `00--init/ai-shared-context.md`
- Any folder-local docs

4. Validate links and build/runtime references.

## Safety Rules

1. Never rename `.git` or `.github`.
2. Preserve root URL objective: `https://eriic-builds.github.io`.
3. After any rename, verify root page asset paths still resolve.
4. Keep numbering local to sibling groups (each folder level manages its own sequence).

## Verification Checklist

- [ ] Folder names match `NN--FolderName`
- [ ] Numbering is clear and intentional for each level
- [ ] HTML asset paths still valid
- [ ] Docs updated to current names
- [ ] Root URL behavior unchanged

## Notes

- `98--Misc` can remain intentionally high as a catch-all category.
- If strict contiguous numbering is desired later, perform a planned renumber migration and update references in one batch.
