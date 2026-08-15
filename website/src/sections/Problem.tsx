import Reveal from '../components/Reveal'
import CountUp from '../components/CountUp'
import SplitHeading from '../components/SplitHeading'
import { useLang } from '../i18n'
import { splitTitle } from '../lib/text'

const STAT_NUMS = [
  { value: 190, prefix: '~', suffix: '' },
  { value: 28, prefix: '€', suffix: 'M' },
  { value: 80, prefix: '', suffix: '%' },
]

export default function Problem() {
  const { t } = useLang()
  const p = t.problem
  return (
    <section id="problem" className="section" aria-labelledby="problem-h">
      <div className="ghost-num" aria-hidden="true">01</div>
      <div className="wrap" style={{ position: 'relative' }}>
        <Reveal>
          <p className="kicker">{p.kicker}</p>
        </Reveal>
        <SplitHeading lines={splitTitle(p.title)} className="h-display" />
        <Reveal delay={120}>
          <p className="lede">{p.lede}</p>
        </Reveal>

        <div className="grid-3" style={{ marginTop: 64 }}>
          {p.stats.map((s, i) => (
            <Reveal key={i} delay={i * 130}>
              <div>
                <div className="stat-value" style={{ color: i === 0 ? 'var(--copper)' : 'var(--ink)' }}>
                  <CountUp value={STAT_NUMS[i].value} prefix={STAT_NUMS[i].prefix} suffix={STAT_NUMS[i].suffix} />
                </div>
                <p className="stat-label">{s.label}</p>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={100}>
          <div className="card" style={{ marginTop: 70, borderColor: 'rgba(217,106,106,0.4)', background: '#1a1414' }}>
            <p className="tag red" style={{ marginBottom: 24 }}>{p.casualtiesTag}</p>
            <div className="grid-3">
              {p.casualties.map((c) => (
                <div key={c.name}>
                  <h3 style={{ fontSize: 18, marginBottom: 10 }}>{c.name}</h3>
                  <p style={{ fontSize: 14, color: 'var(--mute)' }}>{c.text}</p>
                </div>
              ))}
            </div>
            <p style={{ marginTop: 28, fontSize: 16, color: 'var(--ink)', borderTop: '1px solid rgba(217,106,106,0.25)', paddingTop: 22 }}>
              <strong>{p.diagnosisLabel}</strong>{' '}
              <span style={{ color: 'var(--mute)' }}>{p.diagnosis}</span>
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  )
}

