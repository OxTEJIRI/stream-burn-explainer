# Content source of truth

Use these facts. If a figure is marked approximate or reported, label it that way in the UI. Do not round a labeled figure into a fake exact number.

## Identity

- Token: STREAM
- Mint: `STREAMribRwybYpMmSYoCsQUdr6MZNXEqHgm7p1gu9M`
- Chain: Solana
- Foundation: Streamflow Foundation, @StreamflowFDN
- Company account to mention in the X post: @streamflow_fi
- CEO quote author: Mališa Stanojević, CEO of Streamflow
- Streamflow: token operations platform on Solana. Locks, vesting, staking, airdrops, NFT locks. Audited on-chain contracts. Listing copy: trusted by 40K+ projects, $660M+ TVL. Blog-era figures also cite 50,000+ projects, 1.3M users, and over $650M TVL. Use the listing figures in the footer: 40K+ projects, $660M+ TVL.

## What happened

- The Foundation burned 100% of the STREAM it held.
- That equalled 70% of total supply.
- Amount burned: 699.99 million STREAM. One public post states 699,994,595. Display `699.99M` in the UI. Do not invent a more precise figure than the transaction shows.
- Supply went from 1 billion STREAM to 300 million STREAM.
- No mint authority. The cap at 300,000,000 STREAM cannot be reopened by minting.
- The burn used Solana's burn instruction. Tokens were not sent to a dead wallet. They cannot be recovered, unfrozen, or reissued.
- The founder returned about 90% of his personal allocation. He described that allocation as 5% of supply. Part was burned. Part was returned to the team bucket.
- Public posts from @StreamflowFDN, @streamflow_fi, and @imprfekt are dated 23 September 2026.
- The Streamflow blog says the Foundation applied this on 17 September 2026. Do not pick a single execution day in the hero. Copy: "Announced 23 September 2026." A footnote may say the blog dates the action to 17 September 2026. The transaction is the record.

## Why it matters

Three options the Foundation had:

1. Hold. The market still has to price a treasury that can be sold.
2. Lock or vest. A lock ends. A vest unlocks. Both still depend on a later decision.
3. Burn. The tokens are gone. No later decision can bring them back.

Quote, do not rewrite:

> A treasury that can be spent is a treasury the market has to price in. Burning it outright is the only version of this commitment that doesn't depend on anyone's continued good intentions, including our own. The tokens are gone, the transaction is public, and no future decision can bring them back.

Attribution: Mališa Stanojević, CEO of Streamflow.

## What remains

Reported split of the original 1 billion, which is the remaining 30%. Label every one of these "as published," not "live."

| Bucket | Share of original supply | Of the 300M cap |
| --- | --- | --- |
| Investor and early-contributor vesting | 11.47% | 114.7M |
| Team reserve, current and future | 4.03% | 40.3M |
| Active staking rewards | 3.42% | 34.2M |
| Freely circulating | 11.08% | 110.8M |

These four sum to 30.00% and 300.0M. If a later source disagrees, stop and ask. Do not "fix" the table.

What the burn did not change: locks, vesting, staking, airdrops, payouts, treasury tools. STREAM is the same SPL mint. No user action required.

## xSTREAM, one sentence only

The 300M cap is the setup for a planned 1:1 swap into xSTREAM. xSTREAM is described as a transfer-restricted security from a Cayman vehicle, with economic and legal claims on 30% of the equity of Streamflow Research S.A., the operating company behind Streamflow. The swap is for verified eligible investors, not a retail offer in the US, UK, or EU. STREAM sent into the swap is burned. Window described as six months, no extension. Do not build a swap. Do not say the swap is live unless a primary source on the day of recording says it is. As of the 23 September 2026 founder post, it was planned for October.

## Required links

- Burn transaction: https://solscan.io/tx/4rbViHbmCV35ttMngeC8KBULCMctD7X8mNg3RxfvGwPKyPi7hX8VKpjyJ81AnYuVzzXEsWuNuppcpDY47hnchZNv
- Foundation: https://streamflow.foundation/
- Mention in the X caption: @streamflow_fi
- Blog: https://streamflow.finance/blog/streamflow-foundation-burns-70-of-total-stream-supply
- Announcement post: https://x.com/StreamflowFDN/status/2102779780865372364
- Founder post: https://x.com/imprfekt/status/2102780814383583368
- Streamflow post: https://x.com/streamflow_fi/status/2102780394512764929

## Do not say

- That the burn increased the price, or will.
- That products stopped, migrated, or need a user claim.
- That xSTREAM is available to everyone.
- That a dead-wallet transfer is the same as this burn.
- That mint authority was revoked in this transaction if you have not read the tx. Say there is no mint authority, so the burned supply cannot be recreated. That is the claim in the listing and the founder post.
- "Guaranteed," "risk-free," or any return language.

## Hero copy

Eyebrow: `STREAM · Solana · September 2026`

Title: `They did not lock the treasury. They deleted 70% of supply.`

Deck: `Streamflow Foundation burned 100% of the STREAM it held. One transaction. Supply went from 1B to 300M. No mint authority, so the cap stays.`

## Section copy

Supply kicker: `What burned`

Hold/lock/burn kicker: `Why a burn, not a lock`

Buckets kicker: `What is left`

Verify kicker: `Don't trust the graphic`

Footer line: `Streamflow is the token operations platform for Solana. 40K+ projects. $660M+ TVL. This page is an unofficial explainer.`
