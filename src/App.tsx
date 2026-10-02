import { useCallback, useEffect, useRef, useState } from 'react'
import DotField from './DotField'
import { reducedMotion, spotlight, useInView } from './hooks'

const TX_URL =
  'https://solscan.io/tx/4rbViHbmCV35ttMngeC8KBULCMctD7X8mNg3RxfvGwPKyPi7hX8VKpjyJ81AnYuVzzXEsWuNuppcpDY47hnchZNv'
const FOUNDATION_URL = 'https://streamflow.foundation/'
const BLOG_URL = 'https://streamflow.finance/blog/streamflow-foundation-burns-70-of-total-stream-supply'
const MINT = 'STREAMribRwybYpMmSYoCsQUdr6MZNXEqHgm7p1gu9M'

type CardId = 'hold' | 'lock' | 'burn'

const CARDS: { id: CardId; kicker: string; title: string; sentence: string; pill: string }[] = [
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
  // On load the burn plays once, 0 -> 1. Reduced motion starts at the burned state.
  const [v, setV] = useState(reducedMotion() ? 1 : 0)
  const raf = useRef(0)

  const stop = () => cancelAnimationFrame(raf.current)

  const play = useCallback((from: number, to: number, ms: number) => {
    cancelAnimationFrame(raf.current)
    if (reducedMotion()) {
      setV(to)
      return
    }
    const t0 = performance.now()
    const tick = (t: number) => {
      const p = Math.min(1, (t - t0) / ms)
      const eased = 1 - Math.pow(1 - p, 3)
      setV(Math.round((from + (to - from) * eased) * 100) / 100)
      if (p < 1) raf.current = requestAnimationFrame(tick)
    }
    raf.current = requestAnimationFrame(tick)
  }, [])

  useEffect(() => {
    if (reducedMotion()) return
    const id = setTimeout(() => play(0, 1, 2400), 500)
    return () => {
      clearTimeout(id)
      stop()
    }
  }, [play])

  const left = Math.round(1000 - 700 * v)
  const burnedLabel = v === 1 ? '699.99M gone' : `${Math.round(700 * v)}M gone`
  const leftLabel = `${left}M left`
  const figure = v === 0 ? '1,000M supply' : `1,000M → ${left}M`

  return (
    <div className="card hud supply-card" onPointerMove={spotlight}>
      <span className="corner tl" /><span className="corner tr" /><span className="corner bl" /><span className="corner br" />
      <div className="card-head">
        <div className="label">What burned</div>
        <div className="label key">1 dot = 1M STREAM</div>
      </div>
      <div className="big-figure mono" aria-live="off">{figure}</div>
      <div className="field">
        <DotField burned={v} />
        {v > 0 && v < 1 && <span className="scan" style={{ left: `${v * 70}%` }} />}
      </div>
      <div className="bar" role="img" aria-label={`${burnedLabel}, ${leftLabel}`}>
        <div className="bar-burn" style={{ width: `${70 * v}%` }} />
        <div className="bar-remain" style={{ width: `${100 - 70 * v}%` }} />
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
          style={{ ['--p' as string]: `${v * 100}%` }}
          onChange={(e) => {
            stop()
            setV(parseFloat(e.target.value))
          }}
          aria-label="Supply burned"
          aria-valuetext={`${Math.round(v * 100)}% of the burn applied`}
        />
        <span className="slider-value mono">{v.toFixed(2)}</span>
      </div>
      <div className="presets">
        <button type="button" className="chip" onClick={() => play(v, 0, 500)}>Before</button>
        <button type="button" className="chip" onClick={() => play(v, 1, 500)}>After</button>
        <button type="button" className="chip" onClick={() => play(0, 1, 2400)}>Replay burn</button>
      </div>
      <p className="caption">One Solana burn instruction. Not a transfer to a dead wallet.</p>
    </div>
  )
}

/** Today / Later strips that show what each option leaves the market holding. */
function Outcome({ id }: { id: CardId }) {
  const note: Record<CardId, string> = {
    hold: 'Later: still sellable. The market has to price it.',
    lock: 'Later: the lock ends and the tokens unlock.',
    burn: 'Later: nothing. No vote can mint them back.',
  }
  return (
    <div className={`outcome o-${id}`} key={id} aria-live="polite">
      <div className="o-row">
        <span className="label">Today</span>
        <div className="cells">
          {Array.from({ length: 24 }, (_, i) => <i key={i} className="cell on" />)}
        </div>
      </div>
      <div className="o-row">
        <span className="label">Later</span>
        <div className="cells later">
          {Array.from({ length: 24 }, (_, i) => (
            <i key={i} className="cell" style={{ ['--i' as string]: i }} />
          ))}
        </div>
      </div>
      <p className="o-note">{note[id]}</p>
    </div>
  )
}

function Why() {
  const [sel, setSel] = useState<CardId>('burn')
  return (
    <section id="why" className="section">
      <div className="label">Why a burn, not a lock</div>
      <h2>Hold, lock, or burn</h2>
      <div className="cards">
        {CARDS.map((c) => (
          <button
            key={c.id}
            type="button"
            className={`opt hud${sel === c.id ? ' selected' : ''} k-${c.id}`}
            aria-pressed={sel === c.id}
            onClick={() => setSel(c.id)}
            onPointerMove={spotlight}
          >
            <span className="label">{c.kicker}</span>
            <span className="opt-title">{c.title}</span>
            <span className="opt-body">{c.sentence}</span>
            <span className={`pill${c.id === 'burn' ? ' pill-burn' : ''}`}>{c.pill}</span>
          </button>
        ))}
      </div>
      <Outcome id={sel} />
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
  const [ref, seen] = useInView<HTMLElement>(0.25)
  const [active, setActive] = useState<number | null>(null)
  const dim = (i: number) => (active !== null && active !== i ? ' dim' : '')
  return (
    <section id="left" className="section" ref={ref}>
      <div className="label">What is left</div>
      <h2>The overhang is gone. What remains is 300M, accounted for.</h2>

      <div className="strip-wrap">
        <div className="label">The 300M cap, by bucket</div>
        <div className="strip" role="img" aria-label="The 300M cap split into four buckets">
          {BUCKETS.map((b, i) => (
            <span
              key={b.name}
              className={`seg s${i}${dim(i)}${seen ? ' in' : ''}`}
              style={{ flexGrow: b.share, transitionDelay: `${i * 120}ms` }}
              onPointerEnter={() => setActive(i)}
              onPointerLeave={() => setActive(null)}
            />
          ))}
        </div>
      </div>

      <ul className="rows">
        {BUCKETS.map((b, i) => (
          <li
            key={b.name}
            className={`row${active === i ? ' active' : ''}${dim(i)}`}
            tabIndex={0}
            onPointerEnter={() => setActive(i)}
            onPointerLeave={() => setActive(null)}
            onFocus={() => setActive(i)}
            onBlur={() => setActive(null)}
          >
            <span className="row-name">{b.name}</span>
            <span className="track" aria-hidden="true">
              <span
                className="fill"
                style={{ width: seen ? `${b.share}%` : '0%', transitionDelay: `${i * 120}ms` }}
              />
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
  const [ref, seen] = useInView<HTMLElement>(0.3)
  const [copied, setCopied] = useState(false)
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(MINT)
      setCopied(true)
      setTimeout(() => setCopied(false), 1600)
    } catch {
      /* clipboard unavailable; the mint stays selectable in the receipt */
    }
  }
  const lines: [string, React.ReactNode][] = [
    ['network', 'solana'],
    ['instruction', 'burn'],
    ['amount', '699.99M STREAM'],
    ['mint', MINT],
    ['supply after', '300,000,000'],
    ['mint authority', 'none'],
    [
      'signature',
      <a key="sig" href={TX_URL} target="_blank" rel="noreferrer">4rbViHbm…hnchZNv</a>,
    ],
  ]
  return (
    <section id="verify" className="section" ref={ref}>
      <div className="label">Don't trust the graphic</div>
      <h2>The graphic is not the proof.</h2>
      <div className="verify-grid">
        <div className={`receipt hud mono${seen ? ' in' : ''}`} onPointerMove={spotlight}>
          <div className="receipt-bar">
            <span className="label">burn receipt</span>
            <button type="button" className="chip" onClick={copy}>{copied ? 'Copied mint' : 'Copy mint'}</button>
          </div>
          {lines.map(([k, val], i) => (
            <div className="rline" key={k} style={{ ['--d' as string]: `${i * 110}ms` }}>
              <span className="rk">{k}</span>
              <span className="rv">{val}</span>
            </div>
          ))}
        </div>
        <div>
          <ul className="checks">
            {[
              'Foundation holding burned, 100% of what it held.',
              'Founder returned about 90% of his allocation. Part burned, part back to the team bucket.',
              'Cap is permanent because there is no mint authority.',
            ].map((t, i) => (
              <li key={t} className={seen ? 'in' : ''} style={{ transitionDelay: `${500 + i * 220}ms` }}>
                <svg className="tick" viewBox="0 0 20 20" width="20" height="20" aria-hidden="true">
                  <circle cx="10" cy="10" r="9" />
                  <path d="M5.5 10.5l3 3 6-6.5" />
                </svg>
                {t}
              </li>
            ))}
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
      <div className="bg-grid" aria-hidden="true" />
      <header className="topbar">
        <div className="wrap topbar-in">
          <span className="brand">
            <img src="logo.jpg" alt="" width="28" height="28" />
            <span className="wordmark mono">STREAM burn</span>
          </span>
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
