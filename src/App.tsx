import { useState } from 'react'

const TX_URL =
  'https://solscan.io/tx/4rbViHbmCV35ttMngeC8KBULCMctD7X8mNg3RxfvGwPKyPi7hX8VKpjyJ81AnYuVzzXEsWuNuppcpDY47hnchZNv'
const FOUNDATION_URL = 'https://streamflow.foundation/'
const BLOG_URL = 'https://streamflow.finance/blog/streamflow-foundation-burns-70-of-total-stream-supply'
const MINT = 'STREAMribRwybYpMmSYoCsQUdr6MZNXEqHgm7p1gu9M'

const CARDS = [
  {
    id: 'hold',
    kicker: 'Hold',
    title: 'Keep the treasury',
    sentence: 'The market still has to price tokens that can be sold.',
    pill: 'Can be spent',
  },
  {
    id: 'lock',
    kicker: 'Lock',
    title: 'Vest it',
    sentence: 'A lock ends. A vest unlocks. The decision comes back later.',
    pill: 'Comes back',
  },
  {
    id: 'burn',
    kicker: 'Burn',
    title: 'Destroy it',
    sentence: 'The tokens are gone. No later vote can mint them back.',
    pill: 'Does not return',
  },
]

const BUCKETS = [
  { name: 'Freely circulating', share: 11.08, amount: '110.8M' },
  { name: 'Investor and early-contributor vesting', share: 11.47, amount: '114.7M' },
  { name: 'Team reserve, current and future', share: 4.03, amount: '40.3M' },
  { name: 'Active staking rewards', share: 3.42, amount: '34.2M' },
]

function Supply() {
  const [v, setV] = useState(1)
  const burnedPct = 70 * v
  const left = Math.round(1000 - 700 * v)
  const done = v === 1
  const burnedLabel = done ? '699.99M gone' : `${Math.round(700 * v)}M gone`
  const leftLabel = `${left}M left`
  const figure = v === 0 ? '1,000M supply' : `1,000M → ${left}M`

  return (
    <div className="card supply-card">
      <div className="label">What burned</div>
      <div className="big-figure mono" aria-live="polite">{figure}</div>
      <div className="bar" role="img" aria-label={`${burnedLabel}, ${leftLabel}`}>
        <div className="bar-burn" style={{ width: `${burnedPct}%` }} />
        <div className="bar-remain" style={{ width: `${100 - burnedPct}%` }} />
      </div>
      <div className="bar-labels mono">
        <span className="burn-text">{burnedLabel}</span>
        <span className="remain-text">{leftLabel}</span>
      </div>
      <div className="slider-row">
        <label htmlFor="burn-slider" className="label">Drag to the burn</label>
        <input
          id="burn-slider"
          type="range"
          min={0}
          max={1}
          step={0.01}
          value={v}
          onChange={(e) => setV(parseFloat(e.target.value))}
          aria-label="Supply burned"
          aria-valuetext={`${Math.round(v * 100)}% of the burn applied`}
        />
        <span className="slider-value mono">{v.toFixed(2)}</span>
      </div>
      <p className="caption">One Solana burn instruction. Not a transfer to a dead wallet.</p>
    </div>
  )
}

function Why() {
  const [sel, setSel] = useState('burn')
  return (
    <section id="why" className="section">
      <div className="label">Why a burn, not a lock</div>
      <h2>Hold, lock, or burn</h2>
      <div className="cards">
        {CARDS.map((c) => (
          <button
            key={c.id}
            type="button"
            className={`opt${sel === c.id ? ' selected' : ''}`}
            aria-pressed={sel === c.id}
            onClick={() => setSel(c.id)}
          >
            <span className="label">{c.kicker}</span>
            <span className="opt-title">{c.title}</span>
            <span className="opt-body">{c.sentence}</span>
            <span className={`pill${c.id === 'burn' ? ' pill-burn' : ''}`}>{c.pill}</span>
          </button>
        ))}
      </div>
      <figure className="quote">
        <blockquote>
          A treasury that can be spent is a treasury the market has to price in. Burning it outright is the only
          version of this commitment that doesn't depend on anyone's continued good intentions, including our own.
          The tokens are gone, the transaction is public, and no future decision can bring them back.
        </blockquote>
        <figcaption>Mališa Stanojević, CEO of Streamflow</figcaption>
      </figure>
    </section>
  )
}

function Left() {
  return (
    <section id="left" className="section">
      <div className="label">What is left</div>
      <h2>The overhang is gone. What remains is 300M, accounted for.</h2>
      <ul className="rows">
        {BUCKETS.map((b) => (
          <li key={b.name} className="row">
            <span className="row-name">{b.name}</span>
            <span className="track" aria-hidden="true">
              <span className="fill" style={{ width: `${b.share}%` }} />
            </span>
            <span className="row-fig mono">{b.amount}</span>
            <span className="row-note">{b.share.toFixed(2)}% of original supply</span>
          </li>
        ))}
      </ul>
      <p className="foot">Figures as published after the burn. Not a live holder scan.</p>
      <p className="foot">
        <span className="warn">Not changed</span> Locks, vesting, staking, airdrops, and payouts were not changed.
        Same mint. No user action.
      </p>
    </section>
  )
}

function Verify() {
  return (
    <section id="verify" className="section">
      <div className="label">Don't trust the graphic</div>
      <h2>The graphic is not the proof.</h2>
      <div className="verify-grid">
        <pre className="receipt mono">
          {`network        solana
instruction    burn
amount         699.99M STREAM
mint           ${MINT}
supply after   300,000,000
mint authority none
signature      `}
          <a href={TX_URL} target="_blank" rel="noreferrer">4rbViHbm…hnchZNv</a>
        </pre>
        <div>
          <ul className="checks">
            <li><span className="tick" aria-hidden="true">✓</span>Foundation holding burned, 100% of what it held.</li>
            <li><span className="tick" aria-hidden="true">✓</span>Founder returned about 90% of his allocation. Part burned, part back to the team bucket.</li>
            <li><span className="tick" aria-hidden="true">✓</span>Cap is permanent because there is no mint authority.</li>
          </ul>
          <p className="context">
            Context, not an offer. The 300M cap is the setup for a planned 1:1 swap into xSTREAM, described as a
            transfer-restricted security from a Cayman vehicle with claims on 30% of the equity of Streamflow
            Research S.A., for verified eligible investors and not a retail offer in the US, UK, or EU; as of the
            23 September 2026 founder post it was planned for October.
          </p>
          <div className="actions">
            <a className="btn" href={TX_URL} target="_blank" rel="noreferrer">Open the transaction</a>
            <a className="text-link" href={FOUNDATION_URL} target="_blank" rel="noreferrer">Foundation</a>
          </div>
        </div>
      </div>
      <p className="foot">
        The Streamflow blog dates the action to 17 September 2026. The transaction is the record.
      </p>
    </section>
  )
}

export default function App() {
  return (
    <>
      <header className="topbar">
        <div className="wrap topbar-in">
          <span className="wordmark mono">STREAM burn</span>
          <nav aria-label="Sections">
            <a href="#supply">Supply</a>
            <a href="#why">Why</a>
            <a href="#left">Left</a>
            <a href="#verify">Verify</a>
          </nav>
          <a className="tx-link" href={TX_URL} target="_blank" rel="noreferrer">View transaction</a>
        </div>
      </header>
      <main className="wrap">
        <section id="supply" className="hero">
          <div className="hero-left">
            <div className="label">STREAM · Solana · September 2026</div>
            <h1>They did not lock the treasury. They deleted 70% of supply.</h1>
            <p className="deck">
              Streamflow Foundation burned 100% of the STREAM it held. One transaction. Supply went from 1B to
              300M. No mint authority, so the cap stays.
            </p>
            <ul className="facts mono">
              <li>699.99M burned</li>
              <li>300M cap</li>
              <li>No mint authority</li>
            </ul>
            <p className="announced">Announced 23 September 2026.</p>
          </div>
          <Supply />
        </section>
        <Why />
        <Left />
        <Verify />
      </main>
      <footer className="footer">
        <div className="wrap">
          <p>Streamflow is the token operations platform for Solana. 40K+ projects. $660M+ TVL. This page is an unofficial explainer.</p>
          <nav aria-label="Footer">
            <a href={TX_URL} target="_blank" rel="noreferrer">Transaction</a>
            <a href={FOUNDATION_URL} target="_blank" rel="noreferrer">Foundation</a>
            <a href={BLOG_URL} target="_blank" rel="noreferrer">Blog</a>
          </nav>
        </div>
      </footer>
    </>
  )
}
