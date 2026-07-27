# eriic-builds.github.io

My personal site and portfolio, live at **https://eriic-builds.github.io**.

Static HTML/CSS/JS today, structured so it can grow into a React app without changing the public URL.

## Structure

| Path | What it is |
| --- | --- |
| `index.html` | The published homepage |
| `01--Portfolio/` | Portfolio workspace — source assets and future app code |
| `98--Misc/` | Side experiments and archived one-offs |
| `00--init/` | Repo conventions, AI context, and helper scripts |

## Run Locally

```bash
python3 -m http.server 8000
```

Then open http://localhost:8000.

## Conventions

Top-level folders use `NN--Name` ordering so the tree stays readable and intentional.
The convention, helper scripts, and shared AI context live in `00--init/`.
The React/Vite migration path is documented in `01--Portfolio/HOW-TO-BUILD.md`.
