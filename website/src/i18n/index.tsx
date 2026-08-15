import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from 'react'
import { en } from './en'
import { de } from './de'
import type { Content, Lang } from './types'

const DICTS: Record<Lang, Content> = { en, de }

interface LangCtx {
  lang: Lang
  t: Content
  setLang: (l: Lang) => void
}

const Ctx = createContext<LangCtx>({ lang: 'en', t: en, setLang: () => {} })

function detectInitial(): Lang {
  const stored = localStorage.getItem('kronos-lang')
  if (stored === 'en' || stored === 'de') return stored
  return navigator.language.toLowerCase().startsWith('de') ? 'de' : 'en'
}

export function LangProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>(() => detectInitial())

  const setLang = (l: Lang) => {
    setLangState(l)
    localStorage.setItem('kronos-lang', l)
  }

  useEffect(() => {
    document.documentElement.lang = lang
    document.title = DICTS[lang].meta.title
    const meta = document.querySelector('meta[name="description"]')
    if (meta) meta.setAttribute('content', DICTS[lang].meta.description)
  }, [lang])

  const value = useMemo(() => ({ lang, t: DICTS[lang], setLang }), [lang])
  return <Ctx.Provider value={value}>{children}</Ctx.Provider>
}

// eslint-disable-next-line react-refresh/only-export-components
export function useLang() {
  return useContext(Ctx)
}
