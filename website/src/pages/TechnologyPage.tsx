import { Link } from 'react-router-dom'
import PageHero from '../components/PageHero'
import Reveal from '../components/Reveal'
import Marquee from '../components/Marquee'
import { useLang } from '../i18n'

export default function TechnologyPage() {
  const { t } = useLang()
  const p = t.pages.technology
  return (
    <>
      <PageHero kicker={t.nav.technology} title={p.title} lede={p.lede} />
      <Marquee items={t.hero.marquee} />

      <div className="wrap" style={{ padding: 'clamp(70px, 10vh, 120px) 0' }}>
        <div style={{ display: 'grid', gap: 'clamp(50px, 8vh, 90px)' }}>
          {p.sections.map((s, i) => (
            <Reveal key={s.heading}>
              <div className="grid-2" style={{ gap: 40, alignItems: 'start' }}>
                <div style={{ display: 'flex', gap: 22, alignItems: 'baseline' }}>
                  <span className="mono" style={{ fontSize: 15, color: 'var(--copper)', fontWeight: 700 }}>0{i + 1}</span>
                  <h2 style={{ fontSize: 'clamp(24px, 2.8vw, 36px)', maxWidth: '16ch' }}>{s.heading}</h2>
                </div>
                <div style={{ display: 'grid', gap: 18 }}>
                  {s.body.map((para, j) => (
                    <p key={j} style={{ fontSize: 15.5, color: 'var(--mute)' }}>{para}</p>
                  ))}
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={80}>
          <div style={{ marginTop: 'clamp(70px, 10vh, 110px)' }}>
            <h2 style={{ fontSize: 'clamp(22px, 2.6vw, 32px)', marginBottom: 28 }}>{p.costTableTitle}</h2>
            <div className="table-scroll card" style={{ padding: 10 }}>
              <table className="data-table">
                <tbody>
                  {p.costTable.map((row) => (
                    <tr key={row.driver}>
                      <td style={{ width: '34%' }}>{row.driver}</td>
                      <td>{row.lever}</td>
                      <td className="num" style={{ color: 'var(--copper)', whiteSpace: 'nowrap' }}>{row.effect}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </Reveal>

        <Reveal delay={60}>
          <div style={{ marginTop: 60, display: 'flex', gap: 14, flexWrap: 'wrap' }}>
            <Link to="/" className="btn-ghost">← {t.nav.story}</Link>
            <Link to="/financials" className="btn-primary">{t.nav.financials} →</Link>
          </div>
        </Reveal>
      </div>
    </>
  )
}
