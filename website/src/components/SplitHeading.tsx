import { useEffect, useRef, type CSSProperties } from 'react'
import { gsap, ScrollTrigger, prefersReducedMotion } from '../lib/gsapSetup'

/**
 * Zeilenweise Kinetik-Typo: Zeichen schieben sich per Stagger aus einer Maske.
 * Zeichen sind wortweise gruppiert (keine Umbrüche mitten im Wort).
 */
export default function SplitHeading({
  lines,
  as: Tag = 'h2',
  className = '',
  style,
  delay = 0,
  once = true,
}: {
  lines: string[]
  as?: 'h1' | 'h2' | 'div'
  className?: string
  style?: CSSProperties
  delay?: number
  once?: boolean
}) {
  const ref = useRef<HTMLHeadingElement | null>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (prefersReducedMotion()) {
      el.classList.add('split-done')
      return
    }
    const chars = el.querySelectorAll<HTMLElement>('.split-char')
    const st = ScrollTrigger.create({
      trigger: el,
      start: 'top 86%',
      once,
      onEnter: () => {
        gsap.to(chars, {
          y: 0,
          duration: 0.9,
          delay,
          ease: 'power4.out',
          stagger: { each: 0.024, from: 'start' },
        })
      },
    })
    return () => st.kill()
  }, [lines, delay, once])

  return (
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    <Tag ref={ref as any} className={className} style={style} aria-label={lines.join(' ')}>
      {lines.map((line, li) => (
        <span className="split-line" key={li} aria-hidden="true">
          {line.split(' ').map((word, wi) => (
            <span className="split-word" key={wi}>
              {Array.from(word).map((ch, ci) => (
                <span className="split-char" key={ci} style={{ transform: 'translateY(115%)' }}>
                  {ch}
                </span>
              ))}
              {wi < line.split(' ').length - 1 ? ' ' : ''}
            </span>
          ))}
        </span>
      ))}
    </Tag>
  )
}
