# Terminal Dashboard Design System

A dense, instrument-style interface system. Warm neutral base, hairline structure, two signal colors, mono-first typography. Built for data surfaces where reading density matters more than breathing room.

Reference build: `index.html` with `styles.css` and `app.js`

---

## 1. How to port this

1. Copy the `:root` block from section 3 into your global stylesheet. Nothing else needs to move first.
2. Load the three font families. Until they load, the fallback stacks hold the layout.
3. Copy component blocks from section 6 as you need them. Each one lists the tokens it consumes, so you never pull a component without its dependencies.
4. Keep the rule: component rules reference custom properties only. No literal hex, no literal px. If you need a new value, add a token.

The system has no build step, no framework, and no utility classes. It survives being dropped into React, Svelte, Astro, or plain HTML without change.

---

## 2. Design principles

Density is the point. Every panel pairs a rail of labeled figures with a visual. Whitespace buys separation, not comfort.

Hierarchy runs on case, weight, and size. Never on color. Uppercase micro labels against sentence-case titles carry most of the structure by themselves.

Color carries meaning only. Red and green appear where a value has direction. Nothing decorative uses a signal color.

Structure comes from hairlines. One pixel borders and thin rules define every plane. Shadows appear on exactly two elements, both of which float above the page.

Charts run frameless. Tick marks replace axes. Shape communicates before coordinates do.

The warm off-white base keeps the density from reading as a cold terminal. Paired with mono numerals it suggests instrumentation rather than a consumer app.

Restraint check before you ship: if a new element needs a shadow, a gradient, or a third accent color to read, the hierarchy is wrong upstream.

---

## 3. Tokens

### Color

| Token | Value | Role |
|---|---|---|
| `--bg-page` | `#efede8` | Outer canvas |
| `--surface` | `#fbfaf7` | Card fill |
| `--surface-raised` | `#ffffff` | Chart plot areas, tooltips, floating controls |
| `--surface-sunken` | `#f4f2ee` | Selected states, hover fills |
| `--surface-inverse` | `#2b2926` | FAB, hub nodes |
| `--border` | `#e2dfd9` | Card outlines, rail dividers |
| `--border-strong` | `#c9c5bd` | Chart frames, tooltip outlines, hover borders |
| `--text-primary` | `#1e1c19` | Values, headings |
| `--text-secondary` | `#6e6a64` | Row labels |
| `--text-muted` | `#9a958d` | Micro captions, axis ticks |
| `--accent` | `#c4382d` | Negative direction, alerts, brand mark |
| `--accent-soft` | `#f0d6d2` | Accent fills at low emphasis |
| `--success` | `#4e8c63` | Positive direction, live state |
| `--success-soft` | `#dce8df` | Area fills under positive series |
| `--neutral-data` | `#8c8880` | Unsigned data marks |

No warning hue exists. If your project needs one, add `--warning` rather than reusing accent.

No dark variant exists. Section 9 covers what a dark pass would need.

### Type

Three roles.

| Token | Stack | Used by |
|---|---|---|
| `--font-display` | Söhne, Inter, system-ui | Section titles, brand mark |
| `--font-mono` | Berkeley Mono, IBM Plex Mono, ui-monospace | Everything else |
| `--font-numeral` | Departure Mono, falls back to mono | Hero figures |

| Step | Size | Weight | Tracking | Line height | Maps to |
|---|---|---|---|---|---|
| `--fs-micro` | 0.5625rem | 500 | 0.14em | 1.4 | Card captions, ticks, status bar |
| `--fs-label` | 0.625rem | 500 | 0.10em | 1.4 | Rail labels, badges, legend |
| `--fs-data-sm` | 0.6875rem | 500 | 0.02em | 1.4 | Tooltip body, sub values |
| `--fs-data` | 0.8125rem | 700 | 0.02em | 1.2 | Rail values, KPI figures |
| `--fs-title` | 0.9375rem | 500 | -0.01em | 1.3 | Section titles |
| `--fs-hero-sm` | 2.5rem | 400 | 0.06em | 1.0 | Hero at mobile, secondary figures |
| `--fs-hero` | 3.75rem | 400 | 0.06em | 1.0 | Primary figure |

Micro and label steps always render uppercase. Title always renders sentence case. That single contrast is the main hierarchy signal, so do not break it.

Every numeric element carries `font-variant-numeric: tabular-nums`. Values shift on live update, and proportional figures cause column jitter.

### Spacing

Base unit 4px.

`--space-1` 2 · `--space-2` 4 · `--space-3` 8 · `--space-4` 12 · `--space-5` 16 · `--space-6` 20 · `--space-7` 24 · `--space-8` 32 · `--space-9` 40

Defaults: card padding 16, card gap 12, rail row gap 8, rail group separation 20.

### Radius, border, elevation, opacity

| Token | Value | Applies to |
|---|---|---|
| `--radius-sm` | 3px | Chips, chart frames, tooltips |
| `--radius-md` | 8px | Cards |
| `--radius-full` | 999px | Badges, dots, circular controls |
| `--border-width` | 1px | Everything with a border |
| `--shadow-none` | none | All cards |
| `--shadow-float` | `0 2px 8px rgba(30,28,25,0.1)` | Carousel arrows, FAB |
| `--opacity-full` | 1 | Active marks |
| `--opacity-72` | 0.72 | Secondary chart marks |
| `--opacity-48` | 0.48 | Disabled controls, tail fills |
| `--opacity-24` | 0.24 | Background chart marks, empty meter segments |

### Layout

| Token | Value |
|---|---|
| `--container-max` | 1280px |
| `--card-gap` | 12px |
| `--card-padding` | 16px |
| `--rail-width` | 200px |
| `--header-height` | 32px |
| `--statusbar-height` | 24px |
| `--split-hero` | `58fr 42fr` |

### Derived layout

All multiples of the 4px base. Add to this group rather than hardcoding.

`--logo-size` 32 · `--dot-size` 4 · `--ctrl-size` 44 · `--fab-size` 56 · `--ring-width` 2 · `--ring-offset` 2 · `--chart-h-sm` 96 · `--chart-h-md` 240 · `--chart-h-lg` 280 · `--meter-h` 8

### Motion

| Token | Value | Use |
|---|---|---|
| `--duration-fast` | 120ms | Hover, focus, border shifts |
| `--duration-base` | 240ms | Panel swap, carousel |
| `--duration-slow` | 600ms | Value flash, live pulse |
| `--ease-slide` | `cubic-bezier(0.32, 0.72, 0, 1)` | Slides and swaps |

Ticker updates run linear. Everything else uses the slide easing.

---

## 4. Layout system

Mobile first. Three breakpoints, no others.

| Width | Behavior |
|---|---|
| Base, under 480 | Single column stack. Rails sit above their chart. Rail stats in one column. Hero at `--fs-hero-sm`. KPI strip in two columns. |
| 480 and up | Rail stats in two columns. Hero steps to `--fs-hero`. KPI strip in four columns. |
| 768 and up | Rails move beside the chart at `--rail-width`. Rail stats return to one column. Page padding steps to 16. |
| 1024 and up | Hero row splits at `--split-hero`. Graph card gains its right rail. |

Card internal structure is always the same grid:

```
[ rail 200px ] [ chart 1fr ] [ rail 200px, optional ]
```

Vertical rhythm inside a card: 32px header row, 12px gap, content, 16px bottom padding.

---

## 5. Content patterns

Card header is a fixed three-part row: accent dot, sentence-case title, right-aligned micro caption with middot separators. The caption states the method, not the value. It answers how this panel works, not what it currently says.

Rail rows read label left, value right, baseline aligned. Labels stay uppercase and short enough to avoid wrapping at 200px.

Rail groups end with a micro note in prose. One or two sentences on what the panel means. This is where the interface explains its own reasoning.

Status bar splits left and right. Left carries operational facts. Right carries the stack identity.

Copy rules: sentence case for titles, uppercase for labels, no exclamation, no filler. A label labels. A caption explains method. A note explains meaning. Nothing does two jobs.

---

## 6. Component inventory

### app-header

Anatomy: logo tile, wordmark with accent segment, spacer, badge group, clock.

States: static. Clock updates every second.

Tokens: `--surface`, `--border`, `--radius-md`, `--fs-title`, `--logo-size`, `--accent`.

### badge

Anatomy: leading dot (optional), text.

Variants: `--live` (success border and text, pulsing dot), `--alert` (accent border and text), `--bare` (no dot, neutral border).

States: default, hover raises border to `--border-strong`, disabled drops to `--opacity-48`.

Tokens: `--radius-full`, `--fs-label`, `--border`, `--success`, `--accent`, `--dot-size`.

### card

Anatomy: head (title, caption), body, optional foot note.

States: default no shadow, hover border to `--border-strong`, loading shows a `--surface-sunken` skeleton.

Tokens: `--surface`, `--border`, `--radius-md`, `--card-padding`, `--fs-title`, `--fs-micro`.

### hero-figure

Anatomy: meta row of badges, figure, tag row, KPI strip, address row divided by a top rule.

Tokens: `--font-numeral`, `--fs-hero`, `--tracking-hero`, `--border`.

### kpi-segment

Anatomy: equal cells split by hairlines, one selected.

States: default transparent, hover `--surface-sunken`, selected `--surface-sunken` with an inset `--border-strong` ring, focus-visible 2px accent outline inset.

Interaction: single selection through `aria-pressed`. Never rely on a class alone for state.

Tokens: `--surface-sunken`, `--border-strong`, `--fs-data`, `--fs-micro`, `--success`.

### stat-rail

Anatomy: group heading in micro, repeated label plus value rows, hairline group separators, closing note.

States: static by default. Add hover `--surface-sunken` if rows become interactive.

Tokens: `--fs-label`, `--fs-data`, `--text-secondary`, `--border`, `--rail-width`.

### meter-block

Anatomy: label row with percentage, segmented track of 20 blocks.

States: filled segments at full opacity, empty at `--opacity-24`. Segment count derives from a `data-meter` percentage.

Tokens: `--text-primary`, `--meter-h`, `--opacity-24`.

### chart-frame

Anatomy: bar row of two micro captions, stage, optional corner brackets, tick row.

Variants: `--spark` at `--chart-h-sm`, default at `--chart-h-md`, `--tall` at `--chart-h-lg`.

Tokens: `--surface-raised`, `--border`, `--radius-sm`, `--fs-micro`.

### chart-tooltip

Anatomy: box, label text, bold value.

Variants: flat (white fill, `--border-strong` outline, `--radius-sm`) and alert (accent fill, white text, `--radius-full`).

Positioning: percentage inset within the stage, translated by half its own size. Never absolute pixels, so it survives resize.

Tokens: `--radius-sm`, `--fs-micro`, `--accent`, `--border-strong`.

### legend-list

Anatomy: repeated swatch dot plus label.

Tone attribute drives the swatch color: bear, bull, median, hub, or default neutral.

Tokens: `--fs-data-sm`, `--radius-full`, signal colors.

### carousel-control

Anatomy: circular button, chevron.

Position: absolute, vertically centered, offset outward by half its width so it overlaps the card edge.

States: default `--surface-raised` with border, hover adds `--border-strong` and `--shadow-float`, active scales 0.96, focus-visible accent ring at `--ring-offset`, disabled at `--opacity-48` with pointer events off.

Tokens: `--ctrl-size`, `--radius-full`, `--shadow-float`.

### fab

Anatomy: circular dark button, icon.

States: default `--surface-inverse`, active scales 0.96, focus-visible accent ring, unpressed drops to `--opacity-72` and hides the wave path.

Tokens: `--surface-inverse`, `--fab-size`, `--shadow-float`.

### status-bar

Anatomy: two lists, left and right. Items separated by a middot pseudo-element, suppressed on the first child.

Tokens: `--fs-micro`, `--text-muted`, `--statusbar-height`.

### Not yet specified

Input, select, modal, table row, toast, and pagination do not appear in the source. Adding them means deciding: 32px control height, `--radius-sm`, `--border` at rest going to `--border-strong` on hover, accent ring on focus-visible. That follows the existing grammar. Confirm before you build.

---

## 7. Chart conventions

Charts render as generated SVG, not images. Color comes through a token bridge so the plot inherits from the same custom properties as the CSS:

```js
const T = (n) => getComputedStyle(document.documentElement).getPropertyValue(n).trim();
const C = { accent: T('--accent'), success: T('--success'), border: T('--border-strong') };
```

Rules:

- Stroke width uses `vector-effect: non-scaling-stroke` so hairlines stay hairlines at any viewBox scale.
- `preserveAspectRatio: none` with a fixed viewBox. The stage element controls height through a token.
- Series color follows direction. Positive uses `--success`, negative uses `--accent`, unsigned uses `--neutral-data`.
- Area fills use the soft variants at full opacity rather than the strong color at low opacity.
- Background marks sit at `--opacity-24`, mid marks at `--opacity-72`, focal marks at full.
- Random generation runs through a seeded PRNG so a reload produces the same picture. Unseeded randomness makes visual regressions impossible to catch.

Chart types in the reference: sparkline area, quincunx with split histogram, layered ridge density, node scatter with dashed drift path, mini distribution histogram.

---

## 8. Accessibility floor

- Focus-visible on every interactive element: `--ring-width` solid `--accent` at `--ring-offset`. The KPI cell insets its ring because the cell has no outer gap.
- Toggle state lives in `aria-pressed`, not a class.
- Charts carry `aria-hidden` on the SVG. The rail beside them holds the same figures in text, so nothing is visual-only.
- Minimum touch target 44px, which `--ctrl-size` and `--fab-size` both satisfy.
- `prefers-reduced-motion: reduce` collapses every transition and animation to 1ms and stops the live ticker entirely. Live data that moves on its own is a motion problem, not only a preference.
- Contrast: `--text-muted` on `--surface` sits near the AA floor at micro sizes. If you push micro text below 9px, move it to `--text-secondary`.

---

## 9. Open items

Live data binding. The reference draws static seeded charts. Real data means a render function per chart that accepts a dataset and redraws, plus a diffing pass so only changed values flash. Deferred by decision.

Dark variant. Nothing exists to sample. A dark pass needs an inverted neutral ramp, a lifted accent (the current red loses too much on dark), and a decision on whether hairlines become lighter borders or darker separations.

Warning token. No amber appears anywhere in the source.

Bitmap numeral face. Hero tracking at 0.06em compensates for fallback metrics. Retune once the real face loads.

Input, modal, and table specs. See section 6.
