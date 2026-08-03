# My World Cup Bracket UI Reference

Runnable reference: `index.html`, `mywcbracket-ui.css`, and `mywcbracket-ui.js`.

Repository target: `eriic-builds/mywcbracket`.

## Product contract

This is a static, zero-backend World Cup 2026 bracket dashboard. Picks, rivals, themes, and what-if values remain in browser storage. A bracket leaves the device only through a share link the owner deliberately creates. Public match results are read-only generated data.

Do not introduce an account system, central pool database, analytics, runtime framework, package dependency, or network write without a new product brief.

## Screen hierarchy

1. Bracket health: confirmed points, maximum attainable score, champion status, and current-round accuracy.
2. Full knockout path: all 31 match cards, with Actual and My Picks as state variants of one geometry.
3. Match context: score, status, venue, attendance, pick result, and points.
4. Local comparison: device-owned leaderboard and private share/backup actions.
5. Input flows: build in browser, import Excel, and restore backup. These are entry states, not the returning-user dashboard.

## Visual language

- Warm off-white page and surfaces, thin neutral rules, small radii, no decorative card shadows.
- `Manrope` for product and section headings; `DM Mono` for scores, labels, match cards, and controls.
- Red means a missed pick, elimination, or warning. Green means a landed pick, live state, or confirmed value. Gold is reserved for champion or first-place emphasis.
- Use flags as compact team identifiers, never as decoration.
- Prefer dense, aligned instrument panels over marketing sections or oversized cards.

## Bracket rules

- One tournament model generates Round of 32, Round of 16, quarterfinals, semifinals, and final.
- Desktop fits five round columns inside the panel without page-level scrolling.
- A match card always exposes two teams or an explicit feeder placeholder. Never render a blank slot.
- Actual and My Picks change card content and status, not bracket geometry.
- Filtering hides nonmatching cards without mutating tournament state.

## Interaction rules

- Use native buttons and `aria-pressed` for segmented controls.
- Match cards open an accessible dialog with the same identity shown on the card.
- Share and backup language must reinforce that data is private and device-owned.
- Every control has a visible focus state. Motion collapses under `prefers-reduced-motion`.
- Do not communicate correct/missed state with color alone; pair color with text, symbols, or status labels.