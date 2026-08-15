import Nav from './components/Nav'
import Hero from './sections/Hero'
import Problem from './sections/Problem'
import Technology from './sections/Technology'
import Machine from './sections/Machine'
import Market from './sections/Market'
import Customers from './sections/Customers'
import BusinessModel from './sections/BusinessModel'
import Financials from './sections/Financials'
import Validation from './sections/Validation'
import InvestmentCase from './sections/InvestmentCase'

export default function App() {
  return (
    <>
      <a href="#main" className="skip-link">
        Skip to content
      </a>
      <Nav />
      <main id="main">
        <Hero />
        <Problem />
        <Technology />
        <Machine />
        <Market />
        <Customers />
        <BusinessModel />
        <Financials />
        <Validation />
        <InvestmentCase />
      </main>
      <footer className="site-footer">
        <div className="wrap" style={{ display: 'flex', justifyContent: 'space-between', gap: 20, flexWrap: 'wrap' }}>
          <p>
            KRONOS EOS — Investment Decision Package · August 2026.
            <br />
            An independent analysis; product concept &amp; figures are scenario work, evidence-graded in the repository.
          </p>
          <p>
            <a href="https://github.com/tschortsch3711/kronos-mct-pitch">Research &amp; sources ↗</a>
          </p>
        </div>
      </footer>
    </>
  )
}
