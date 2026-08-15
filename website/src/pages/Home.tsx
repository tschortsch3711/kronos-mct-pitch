import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import Hero from '../sections/Hero'
import Problem from '../sections/Problem'
import Technology from '../sections/Technology'
import Machine from '../sections/Machine'
import Market from '../sections/Market'
import Customers from '../sections/Customers'
import BusinessModel from '../sections/BusinessModel'
import Financials from '../sections/Financials'
import Validation from '../sections/Validation'
import InvestmentCase from '../sections/InvestmentCase'
import Marquee from '../components/Marquee'
import ProgressRail from '../components/ProgressRail'
import { useLang } from '../i18n'
import { ScrollTrigger } from '../lib/gsapSetup'

const RAIL_IDS = ['top', 'problem', 'technology-s', 'machine', 'market', 'customers', 'model', 'financials-s', 'validation', 'invest']

export default function Home() {
  const { hash } = useLocation()
  const { t } = useLang()

  // Hash-Ziel (z. B. /#invest) nach dem Mount anfahren
  useEffect(() => {
    if (!hash) return
    const id = hash.slice(1)
    const timer = setTimeout(() => {
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
    }, 350)
    return () => clearTimeout(timer)
  }, [hash])

  useEffect(() => {
    const timer = setTimeout(() => ScrollTrigger.refresh(), 300)
    return () => clearTimeout(timer)
  }, [])

  return (
    <>
      <ProgressRail ids={RAIL_IDS} />
      <Hero />
      <Problem />
      <Technology />
      <Machine />
      <Market />
      <Customers />
      <Marquee items={t.hero.marquee} reverse />
      <BusinessModel />
      <Financials />
      <Validation />
      <InvestmentCase />
    </>
  )
}
