import { useEffect, useRef } from 'react'

const COLS = 40
const ROWS = 25 // 1,000 dots, one dot = 1M STREAM of the original 1B
const W = 800
const H = 500
const BURN = '#ff5a36'
const REMAIN = '#3ddc97'

/** Canvas dot-matrix of the original supply. Burned dots run left to right. */
export default function DotField({ burned }: { burned: number }) {
  const ref = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const c = ref.current
    if (!c) return
    const g = c.getContext('2d')
    if (!g) return
    const total = COLS * ROWS
    const edge = burned * 0.7 * total // fraction of the grid that has burned
    const cw = W / COLS
    const ch = H / ROWS
    g.clearRect(0, 0, W, H)
    for (let i = 0; i < total; i++) {
      // fill column by column so the burn reads as a vertical front moving right
      const col = Math.floor(i / ROWS)
      const row = i % ROWS
      const order = col * ROWS + row
      const x = col * cw + cw / 2
      const y = row * ch + ch / 2
      const gone = order < edge
      const dist = Math.abs(order - edge)
      const front = gone && dist < ROWS * 2 ? 1 - dist / (ROWS * 2) : 0
      g.beginPath()
      if (gone) {
        g.fillStyle = BURN
        g.globalAlpha = 0.28 + front * 0.72
        g.shadowColor = BURN
        g.shadowBlur = front * 14
        g.arc(x, y, 3.2 + front * 1.4, 0, Math.PI * 2)
      } else {
        g.fillStyle = REMAIN
        g.globalAlpha = 0.9
        g.shadowColor = REMAIN
        g.shadowBlur = 0
        g.arc(x, y, 3.2, 0, Math.PI * 2)
      }
      g.fill()
    }
    g.globalAlpha = 1
    g.shadowBlur = 0
  }, [burned])

  return (
    <canvas
      ref={ref}
      className="dotfield"
      width={W}
      height={H}
      role="img"
      aria-label="Grid of 1,000 dots. Each dot is 1M STREAM. Burned dots are orange, remaining dots are green."
    />
  )
}
