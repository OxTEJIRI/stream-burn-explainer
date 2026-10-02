# STREAM burn explainer

Design pack for a one-page interactive explainer. The contest entry is an X video of this page, not the page itself.

## What this folder is

Hand these files to Claude Code as the spec. Do not let it invent token amounts, dates, or a swap flow.

| File | Use |
| --- | --- |
| `CLAUDE.md` | Paste at the start of the Claude Code session. Build rules. |
| `DESIGN.md` | Layout, visual system, components, interactions, states. |
| `CONTENT.md` | Facts, sources, copy, things that must not be said. |
| `VOICEOVER.md` | 60-second recording script and the X caption. |
| `design-tokens.json` | Colors, type, spacing. |

## Repo

Suggested name: `stream-burn-explainer`

```bash
git init
git add .
git commit -m "Add STREAM burn explainer design pack"
```

Then point Claude Code at the repo and say: "Read CLAUDE.md, DESIGN.md, and CONTENT.md. Build the page they describe. Do not add features they mark out of scope."

## Contest constraints the page must support

The submission is one live English X post, thread, or video.

The caption, not only the page, must include:

- `@streamflow_fi`
- https://streamflow.foundation/
- https://solscan.io/tx/4rbViHbmCV35ttMngeC8KBULCMctD7X8mNg3RxfvGwPKyPi7hX8VKpjyJ81AnYuVzzXEsWuNuppcpDY47hnchZNv

Deadline on the listing was 9 October 2026. Prize is 100 USDC for each of five places. Build the page in a day. Do not add accounts, wallets, or a swap.

## Stack Claude should use

Static Vite + React + TypeScript. No backend. No wallet adapter. Deploy-ready for Vercel or GitHub Pages. One route: `/`.
