import { Link } from 'react-router-dom'
import PageHero from '../components/PageHero'
import Reveal from '../components/Reveal'
import { useLang } from '../i18n'

export default function ResearchPage() {
  const { t } = useLang()
  const p = t.pages.research
  return (
    <>
      <PageHero kicker={t.nav.research} title={p.title} lede={p.lede} />

      <div className="wrap" style={{ padding: 'clamp(40px, 7vh, 90px) 0 clamp(70px, 10vh, 120px)' }}>
        <div className="grid-4">
          {p.statCards.map((s, i) => (
            <Reveal key={s.label} delay={i * 90}>
              <div className="card" style={{ height: '100%', textAlign: 'center', padding: '34px 20px' }}>
                <div className="stat-value" style={{ color: 'var(--copper)', fontSize: 'clamp(36px, 4vw, 54px)' }}>{s.value}</div>
                <p className="stat-label" style={{ margin: '10px auto 0' }}>{s.label}</p>
              </div>
            </Reveal>
          ))}
        </div>

        <div className="grid-2" style={{ marginTop: 'clamp(60px, 9vh, 100px)', gap: 44, alignItems: 'start' }}>
          <Reveal>
            <div>
              <h2 style={{ fontSize: 'clamp(22px, 2.6vw, 32px)', marginBottom: 20 }}>{p.methodTitle}</h2>
              <div style={{ display: 'grid', gap: 16 }}>
                {p.method.map((m, i) => (
                  <p key={i} style={{ fontSize: 15, color: 'var(--mute)' }}>{m}</p>
                ))}
              </div>
            </div>
          </Reveal>
          <Reveal delay={110}>
            <div>
              <h2 style={{ fontSize: 'clamp(22px, 2.6vw, 32px)', marginBottom: 20 }}>{p.gradeTitle}</h2>
              <div style={{ display: 'grid', gap: 14 }}>
                {p.grades.map((g) => (
                  <div key={g.grade} style={{ display: 'flex', gap: 18, alignItems: 'flex-start' }}>
                    <span
                      className="mono"
                      style={{
                        flex: 'none', width: 40, height: 40, borderRadius: 10, display: 'grid', placeItems: 'center',
                        fontWeight: 700, fontSize: 17, background: 'var(--panel)', border: '1px solid var(--line)', color: 'var(--copper)',
                      }}
                    >
                      {g.grade}
                    </span>
                    <p style={{ fontSize: 14, color: 'var(--mute)' }}>{g.text}</p>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </div>

        <Reveal>
          <div className="card" style={{ marginTop: 'clamp(60px, 9vh, 100px)', borderColor: 'rgba(217,106,106,0.4)', background: '#1a1414' }}>
            <h2 style={{ fontSize: 'clamp(20px, 2.3vw, 28px)', marginBottom: 20, color: 'var(--red)' }}>{p.gapsTitle}</h2>
            <ul style={{ listStyle: 'none', display: 'grid', gap: 14 }}>
              {p.gaps.map((g, i) => (
                <li key={i} style={{ fontSize: 14.5, color: 'var(--mute)', paddingLeft: 24, position: 'relative' }}>
                  <span aria-hidden="true" style={{ position: 'absolute', left: 0, top: 8, width: 9, height: 9, background: 'var(--red)', borderRadius: 2 }} />
                  {g}
                </li>
              ))}
            </ul>
          </div>
        </Reveal>

        <Reveal delay={80}>
          <div style={{ marginTop: 60, display: 'flex', gap: 24, flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between' }}>
            <p style={{ fontSize: 14.5, color: 'var(--mute)', maxWidth: '62ch' }}>{p.repoNote}</p>
            <a href="https://github.com/tschortsch3711/kronos-mct-pitch" className="btn-primary">
              {p.repoCta} <span aria-hidden="true">↗</span>
            </a>
          </div>
        </Reveal>

        <Reveal delay={60}>
          <div style={{ marginTop: 40 }}>
            <Link to="/#invest" className="btn-ghost">← {t.nav.decision}</Link>
          </div>
        </Reveal>
      </div>
    </>
  )
}
