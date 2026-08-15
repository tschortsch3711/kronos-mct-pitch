import { useEffect, useState } from 'react'

/** Kapitel-Rail rechts: ein Punkt je Section, aktiver Punkt glüht. Nur auf der Story-Seite. */
export default function ProgressRail({ ids }: { ids: string[] }) {
  const [active, setActive] = useState(ids[0])

  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) setActive(e.target.id)
        }
      },
      { rootMargin: '-42% 0px -52% 0px' }
    )
    for (const id of ids) {
      const el = document.getElementById(id)
      if (el) io.observe(el)
    }
    return () => io.disconnect()
  }, [ids])

  return (
    <nav className="rail" aria-label="Chapters">
      {ids.map((id) => (
        <a
          key={id}
          href={`#${id}`}
          className={active === id ? 'active' : ''}
          aria-label={id}
          onClick={(e) => {
            e.preventDefault()
            document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
          }}
        />
      ))}
    </nav>
  )
}
