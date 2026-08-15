import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Lenis from 'lenis'

gsap.registerPlugin(ScrollTrigger)

export const prefersReducedMotion = () =>
  window.matchMedia('(prefers-reduced-motion: reduce)').matches

let lenis: Lenis | null = null

/** Initialisiert Lenis-Smooth-Scroll und koppelt es an ScrollTrigger. Einmalig aufrufen. */
export function initSmoothScroll() {
  if (lenis || prefersReducedMotion()) return
  lenis = new Lenis({ lerp: 0.11, wheelMultiplier: 1.0 })
  lenis.on('scroll', ScrollTrigger.update)
  gsap.ticker.add((time) => {
    lenis?.raf(time * 1000)
  })
  gsap.ticker.lagSmoothing(0)
}

export function scrollToTop(immediate = true) {
  if (lenis) lenis.scrollTo(0, { immediate })
  else window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior })
}

export function getLenis() {
  return lenis
}

export { gsap, ScrollTrigger }
