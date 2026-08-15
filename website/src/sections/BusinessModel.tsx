import Reveal from '../components/Reveal'

const STREAMS = [
  { name: 'Machine sales', share: 74, color: 'var(--copper)', note: 'direct-first, 25% channel from 2028' },
  { name: 'Consumables', share: 11, color: 'var(--teal)', note: 'curated ink kits · €5k per machine/yr' },
  { name: 'Application projects', share: 7, color: 'var(--violet)', note: 'PoC studies & NRE — today’s KRONOS business' },
  { name: 'Service contracts', share: 5, color: 'var(--green)', note: '11% of list price · remote-first' },
  { name: 'Aion-5X software', share: 3, color: '#c9a227', note: 'subscription tiers · 85% margin' },
]

export default function BusinessModel() {
  return (
    <section className="section" style={{ background: 'var(--bg-raise)' }} aria-labelledby="bm-h">
      <div className="wrap">
        <Reveal>
          <p className="kicker">06 · The Business Model</p>
          <h2 id="bm-h" className="h-display">
            Machines open the account. The installed base pays the margin.
          </h2>
          <p className="lede">
            Revenue mix in 2031 (Base case) — recurring revenue reaches 19% and keeps climbing
            with every installed unit: ≈€10k per machine per year across inks, service and software.
          </p>
        </Reveal>

        <Reveal delay={100}>
          <div style={{ marginTop: 52 }}>
            <div style={{ display: 'flex', height: 56, borderRadius: 10, overflow: 'hidden', border: '1px solid var(--line)' }} role="img" aria-label="Revenue mix 2031: machines 74 percent, consumables 11, application projects 7, service 5, software 3">
              {STREAMS.map((s) => (
                <div key={s.name} style={{ width: `${s.share}%`, background: s.color, opacity: 0.92 }} />
              ))}
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(190px, 1fr))', gap: 18, marginTop: 22 }}>
              {STREAMS.map((s) => (
                <div key={s.name}>
                  <p style={{ fontSize: 14, fontWeight: 700 }}>
                    <span aria-hidden="true" style={{ display: 'inline-block', width: 10, height: 10, borderRadius: 3, background: s.color, marginRight: 8 }} />
                    {s.name} <span className="mono" style={{ color: 'var(--mute)' }}>{s.share}%</span>
                  </p>
                  <p style={{ fontSize: 12.5, color: 'var(--faint)', marginTop: 3 }}>{s.note}</p>
                </div>
              ))}
            </div>
          </div>
        </Reveal>

        <div className="grid-3" style={{ marginTop: 50 }}>
          {[
            ['Leasing-ready', 'Eos Five ≈ €1.3–1.5k/month via partner leasing — an OPEX decision. 26.1% of German equipment investment is already leased (BDL 2024).'],
            ['Down-payments', '30% at order, Maschinenbau standard — working capital stays at 12% of revenue growth.'],
            ['Ecosystem lock-in', 'Qualified material kits + open SDK + application library replace the liquidated J.A.M.E.S community — and raise switching costs the honest way.'],
          ].map(([t, d], i) => (
            <Reveal key={t} delay={i * 110}>
              <div className="card" style={{ height: '100%' }}>
                <h3 style={{ fontSize: 16, marginBottom: 8, color: 'var(--copper)' }}>{t}</h3>
                <p style={{ fontSize: 14, color: 'var(--mute)' }}>{d}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
