# Design spec

One page. Dark. Built to be screen-recorded at 1440x900. The viewer should understand the burn without reading a thread.

## Feeling

A verification instrument, not a marketing site and not a crypto casino. Quiet type, one electric blue, one burn orange. No flames, no coin rain, no stock photos of founders. Motion is the supply bar shrinking. Everything else is still.

Reference, not a clone: a Linear changelog crossed with a block explorer. Streamflow's public brand colors are bunker black `#040508`, blue `#1937F9`, white. This page uses those, with `#FF5A36` reserved for burned supply only.

## Frame

- Page background `#07080C`.
- Content column 1120px, padding 24px on small screens.
- Top bar, sticky, 56px: wordmark `STREAM burn` in mono, then text links `Supply` `Why` `Left` `Verify`. Right side: text button `View transaction` linking to the Solscan URL in CONTENT.md.
- No cookie banner, no newsletter, no wallet button.

## Type

- Display and UI: Geist or Inter.
- Figures: Geist Mono / ui-monospace. All token amounts are mono.
- Hero title: clamp(40px, 6vw, 72px), weight 560, tracking -0.03em, line-height 0.95.
- Section title: 28px, weight 560.
- Body: 16px / 1.5, `#9AA3B5` for secondary, `#F4F6FB` for primary.
- Labels: 12px, uppercase, tracking 0.08em, `#6E778A`.

## Section 1 — Hero and supply

Above the fold at 1440x900.

Left, 55%:

- Eyebrow, title, deck from CONTENT.md.
- Three facts in a row under the deck, mono:
  - `699.99M burned`
  - `300M cap`
  - `No mint authority`

Right, 45%, card `#10131A`, border `#232836`, radius 16:

- A horizontal stacked bar, 28px tall, radius 8.
- Left segment burned, `#FF5A36`. Right segment remaining, `#3DDC97`.
- Default state is after the burn: 70% orange, 30% green, labels `699.99M gone` and `300M left`.
- A slider under the bar labeled `Drag to the burn`. Range 0 to 1, step 0.01. At 0 the bar is 100% green and reads `1,000M supply`. At 1 it is the burned state.
- Sliding updates a big mono figure in the card: `1,000M → 300M`.
- Caption under the slider: `One Solana burn instruction. Not a transfer to a dead wallet.`

Reduced motion: slider still works, no tween.

## Section 2 — Hold, lock, burn

Id `why`. Three equal cards. One is selected. Default selection: Burn.

Card anatomy: kicker, title, one sentence, a status pill.

| Card | Title | Sentence | Pill |
| --- | --- | --- | --- |
| Hold | Keep the treasury | The market still has to price tokens that can be sold. | `Can be spent` |
| Lock | Vest it | A lock ends. A vest unlocks. The decision comes back later. | `Comes back` |
| Burn | Destroy it | The tokens are gone. No later vote can mint them back. | `Does not return` |

Selected card: 1px border `#2F6BFF`, background `#10131A`. Others: border `#232836`.

Under the cards, the CEO quote in 20px, with attribution in 13px muted. Do not put the quote in a fake tweet chrome.

Clicking a card is the interaction the recording uses. No autoplay carousel.

## Section 3 — What is left

Id `left`.

Intro line: `The overhang is gone. What remains is 300M, accounted for.`

Four rows, not a donut. A donut is hard to read on a recording.

Each row:

- Name
- A bar whose width is that bucket's share of the original 1B (so the longest bar is 11.47%, not 100% of the row)
- Mono figure: `114.7M`
- Muted: `11.47% of original supply`

Order: circulating, investor vesting, team reserve, staking rewards. Circulating first because that is what people ask about.

Footnote under the table: `Figures as published after the burn. Not a live holder scan.`

A single line under the footnote, `#F5C16C` only for the label `Not changed`: `Locks, vesting, staking, airdrops, and payouts were not changed. Same mint. No user action.`

## Section 4 — Verify

Id `verify`.

Title: `The graphic is not the proof.`

Left: a fake explorer receipt, mono, on `#0C0E14`.

```
network        solana
instruction    burn
amount         699.99M STREAM
mint           STREAMribRwybYpMmSYoCsQUdr6MZNXEqHgm7p1gu9M
supply after   300,000,000
mint authority none
signature      4rbViHbm…hnchZNv
```

The signature is a link to the full Solscan URL. Truncate visually, do not truncate the href.

Right: three checks, each a row with a checkmark:

- Foundation holding burned, 100% of what it held.
- Founder returned about 90% of his allocation. Part burned, part back to the team bucket.
- Cap is permanent because there is no mint authority.

Under that, the xSTREAM sentence from CONTENT.md, in muted 14px, prefixed `Context, not an offer.`

Primary button: `Open the transaction`. Secondary text link: `Foundation`.

## Footer

Unofficial explainer line from CONTENT.md. Links: transaction, foundation, blog. No social icons. No email capture.

## Responsive

Below 800px, stack the hero. Slider remains. Cards stack. Receipt stacks above the checks. Do not hide the transaction link.

## Recording layout

At 1440x900 the recordist should be able to:

1. Show the hero and drag the slider without scrolling.
2. Scroll once to the three cards and click Burn.
3. Scroll once to the four rows.
4. Scroll once to the receipt and hover the signature link.

Do not add a step indicator, confetti, or a final "share" modal. Those waste the last five seconds.

## Empty and error states

There is no fetch. There is no error state. If a link 404s, that is a content bug, not a UI state.

## Accessibility

- Slider has `aria-valuemin`, `aria-valuemax`, `aria-valuenow`, and a label `Supply burned`.
- Cards are `role="tab"` inside a tablist, or plain toggle buttons with `aria-pressed`. Prefer buttons.
- Focus ring: 2px `#2F6BFF`, offset 2px.
- Contrast: muted text on `#07080C` must stay at or above `#9AA3B5`.
