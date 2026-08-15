import SplitHeading from './SplitHeading'
import Reveal from './Reveal'
import { splitTitle } from '../lib/text'

export default function PageHero({ kicker, title, lede }: { kicker: string; title: string; lede: string }) {
  return (
    <div className="page-hero">
      <div className="glow-orb" style={{ width: '44vw', height: '44vw', right: '-12vw', top: '-16vw' }} aria-hidden="true" />
      <div className="wrap" style={{ position: 'relative' }}>
        <Reveal><p className="kicker">{kicker}</p></Reveal>
        <SplitHeading as="h1" lines={splitTitle(title)} />
        <Reveal delay={140}><p className="lede" style={{ marginTop: 24 }}>{lede}</p></Reveal>
      </div>
    </div>
  )
}
