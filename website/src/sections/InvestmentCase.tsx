import Reveal from '../components/Reveal'

const SKEPTIC = [
  'Every predecessor failed or stayed small — maybe the gap is absent demand, not market failure.',
  'Zero verified KRONOS sales since the relaunch — execution by a ~6-person team is unproven.',
  'Academic beachheads are grant-cyclical and don’t reorder — the corporate/defense jump must actively succeed.',
]

export default function InvestmentCase() {
  return (
    <section id="invest" className="section" aria-labelledby="inv-h">
      <div className="wrap">
        <Reveal>
          <p className="kicker">09 · The Decision</p>
          <h2 id="inv-h" className="h-display">
            Substance over optimism
          </h2>
        </Reveal>

        <div className="grid-2" style={{ marginTop: 48, alignItems: 'stretch' }}>
          <Reveal>
            <div className="card" style={{ borderColor: 'var(--copper)', background: '#1e1a12', height: '100%' }}>
              <p className="tag copper" style={{ marginBottom: 18 }}>The bet</p>
              <p style={{ fontSize: 17.5, lineHeight: 1.55 }}>
                For <strong style={{ color: 'var(--copper)' }}>€2.5M</strong>, the investor buys
                the option on the only unclaimed Formlabs position in 3D-printed electronics —
                proven five-axis technology, a vacant price band, a cleared competitive field,
                and procurement rules that just tilted in its favor.
              </p>
              <ul style={{ listStyle: 'none', marginTop: 24, display: 'grid', gap: 16 }}>
                <li style={{ fontSize: 14.5, color: 'var(--mute)' }}>
                  <strong style={{ color: 'var(--green)' }}>GO — conditionally.</strong>{' '}
                  Commit Tranche 1 after three pre-closing checks: IP chain-of-title, retention
                  of the software core team, clean insolvency legacy.
                </li>
                <li style={{ fontSize: 14.5, color: 'var(--mute)' }}>
                  <strong style={{ color: 'var(--red)' }}>STOP at the gates if</strong>{' '}
                  fewer than 10 LOIs in 6 months · BOM above €32k · NOVA proxy below 30
                  units/yr · pilot service cost above 12%.
                </li>
                <li style={{ fontSize: 14.5, color: 'var(--mute)' }}>
                  <strong style={{ color: 'var(--copper)' }}>DO NOT invest at all if</strong>{' '}
                  you require a certain venture return: only the Upside path (~25–30%
                  probability) is venture-grade. This is an option, not a promise.
                </li>
              </ul>
            </div>
          </Reveal>

          <Reveal delay={120}>
            <div className="card" style={{ height: '100%' }}>
              <p className="tag" style={{ marginBottom: 18 }}>What the skeptic says</p>
              <ol style={{ listStyle: 'none', display: 'grid', gap: 18 }}>
                {SKEPTIC.map((t, i) => (
                  <li key={i} style={{ display: 'flex', gap: 16 }}>
                    <span className="mono" style={{ fontSize: 26, fontWeight: 800, color: 'var(--faint)', lineHeight: 1 }}>{i + 1}</span>
                    <p style={{ fontSize: 14.5, color: 'var(--mute)' }}>{t}</p>
                  </li>
                ))}
              </ol>
              <p style={{ marginTop: 22, paddingTop: 18, borderTop: '1px solid var(--line)', fontSize: 14.5, fontStyle: 'italic', color: 'var(--copper)' }}>
                These are not dismissed — they are the gates. If they hold, the loss is €2.5M and
                a clean stop. If they fall, the position is category-defining.
              </p>
            </div>
          </Reveal>
        </div>

        <Reveal delay={100}>
          <div style={{ marginTop: 64, textAlign: 'center', padding: '54px 20px', border: '1px solid var(--line)', borderRadius: 14, background: 'var(--panel)' }}>
            <p style={{ fontSize: 13, letterSpacing: '0.3em', textTransform: 'uppercase', color: 'var(--copper)', fontWeight: 700 }}>
              Recommendation
            </p>
            <p style={{ fontSize: 'clamp(22px, 3vw, 32px)', fontWeight: 750, maxWidth: '26ch', margin: '16px auto 0' }}>
              Conditional GO — tranche 1, gated, eyes open.
            </p>
            <p style={{ color: 'var(--mute)', maxWidth: '58ch', margin: '16px auto 0', fontSize: 15 }}>
              Full due-diligence package: research report with 301 sourced findings,
              formula-validated financial model, business plan and investor deck — in the
              repository alongside this site.
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
