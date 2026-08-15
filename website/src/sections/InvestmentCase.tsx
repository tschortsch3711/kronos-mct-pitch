import { Link } from 'react-router-dom'
import Reveal from '../components/Reveal'
import SplitHeading from '../components/SplitHeading'
import { useLang } from '../i18n'

const TONE_COLOR = { go: 'var(--green)', stop: 'var(--red)', warn: 'var(--copper)' } as const

export default function InvestmentCase() {
  const { t } = useLang()
  const c = t.decision
  return (
    <section id="invest" className="section" aria-labelledby="inv-h">
      <div className="ghost-num" aria-hidden="true">09</div>
      <div className="wrap" style={{ position: 'relative' }}>
        <Reveal><p className="kicker">{c.kicker}</p></Reveal>
        <SplitHeading lines={c.title.split(' ').length > 3 ? [c.title] : [c.title]} className="h-display" style={{ fontSize: 'clamp(36px, 6vw, 84px)' }} />

        <div className="grid-2" style={{ marginTop: 52, alignItems: 'stretch' }}>
          <Reveal>
            <div className="card" style={{ borderColor: 'var(--copper)', background: 'linear-gradient(160deg, #221a10, #171208)', height: '100%' }}>
              <p className="tag copper" style={{ marginBottom: 20 }}>{c.betTag}</p>
              <p style={{ fontSize: 18, lineHeight: 1.55, fontFamily: 'var(--font-display)', fontWeight: 500 }}>{c.bet}</p>
              <ul style={{ listStyle: 'none', marginTop: 26, display: 'grid', gap: 17 }}>
                {c.conditions.map((cond) => (
                  <li key={cond.label} style={{ fontSize: 14.5, color: 'var(--mute)' }}>
                    <strong style={{ color: TONE_COLOR[cond.tone] }}>{cond.label}</strong> {cond.text}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>

          <Reveal delay={120}>
            <div className="card" style={{ height: '100%' }}>
              <p className="tag" style={{ marginBottom: 20 }}>{c.skepticTag}</p>
              <ol style={{ listStyle: 'none', display: 'grid', gap: 20 }}>
                {c.skeptics.map((sk, i) => (
                  <li key={i} style={{ display: 'flex', gap: 18 }}>
                    <span className="mono" style={{ fontSize: 30, fontWeight: 700, color: 'var(--faint)', lineHeight: 1 }}>{i + 1}</span>
                    <p style={{ fontSize: 14.5, color: 'var(--mute)' }}>{sk}</p>
                  </li>
                ))}
              </ol>
              <p style={{ marginTop: 24, paddingTop: 20, borderTop: '1px solid var(--line)', fontSize: 14.5, fontStyle: 'italic', color: 'var(--copper)' }}>
                {c.skepticClose}
              </p>
            </div>
          </Reveal>
        </div>

        <Reveal delay={100}>
          <div style={{ marginTop: 70, textAlign: 'center', padding: '64px 24px', border: '1px solid var(--line)', borderRadius: 20, background: 'var(--panel)', position: 'relative', overflow: 'hidden' }}>
            <div className="glow-orb" style={{ width: 500, height: 500, left: '50%', top: '-50%', transform: 'translateX(-50%)' }} aria-hidden="true" />
            <p className="mono" style={{ fontSize: 12, letterSpacing: '0.34em', textTransform: 'uppercase', color: 'var(--copper)', fontWeight: 700, position: 'relative' }}>
              {c.recoTag}
            </p>
            <p style={{ fontSize: 'clamp(24px, 3.4vw, 38px)', fontWeight: 700, fontFamily: 'var(--font-display)', maxWidth: '24ch', margin: '18px auto 0', position: 'relative' }}>
              {c.reco}
            </p>
            <p style={{ color: 'var(--mute)', maxWidth: '58ch', margin: '18px auto 0', fontSize: 15, position: 'relative' }}>{c.recoSub}</p>
            <div style={{ marginTop: 30, display: 'flex', gap: 14, justifyContent: 'center', flexWrap: 'wrap', position: 'relative' }}>
              <Link to="/research" className="btn-primary">{t.nav.research} <span aria-hidden="true">→</span></Link>
              <a href="https://github.com/tschortsch3711/kronos-mct-pitch" className="btn-ghost">{t.footer.sources}</a>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
