# Claude Code instructions

Read `DESIGN.md`, `CONTENT.md`, and `design-tokens.json` before writing code. Treat `CONTENT.md` as the only source of facts. If a number is not in that file, do not invent it.

## Build

- Vite + React + TypeScript, single page, no router.
- No backend, no wallet, no Solana adapter, no price feed, no staking, no quiz, no account.
- Copy comes from `CONTENT.md`. Do not paraphrase numbers.
- The page must be recordable in under 70 seconds. Every interaction in the voiceover must be reachable without scrolling past the next section. On a 1440x900 desktop, the hero supply control must be visible on load.
- Keyboard usable. Buttons are real buttons. The supply control is a slider with a visible value.
- Mobile works, but the recording target is desktop at 1440px wide.

## Out of scope

- Login, wallet connect, swap, xSTREAM purchase, live trading chart.
- Claiming the burn changed Streamflow's products. It did not.
- Scraping Solscan. Link to the transaction. Do not depend on a live RPC for the hero number.
- A blog, a docs site, or a second page.

## Done when

- The four sections in `DESIGN.md` work: supply, hold/lock/burn, remaining buckets, verify.
- Footer has the three required links.
- `prefers-reduced-motion` disables the burn animation.
- Lighthouse-style: no console errors, semantic headings, contrast at least AA on body text.
