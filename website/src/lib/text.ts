/** Bricht lange Titel in 2–3 Zeilen für den Split-Effekt. */
export function splitTitle(title: string): string[] {
  const words = title.split(' ')
  if (words.length <= 4) return [title]
  const per = Math.ceil(words.length / (words.length > 8 ? 3 : 2))
  const lines: string[] = []
  for (let i = 0; i < words.length; i += per) lines.push(words.slice(i, i + per).join(' '))
  return lines
}
