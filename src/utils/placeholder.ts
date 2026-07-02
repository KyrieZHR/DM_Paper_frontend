const COLORS = ['#059669', '#0D9488', '#1E3A5F', '#065F46', '#1A5276', '#0B1121', '#1E293B', '#334155']

let colorIndex = 0
function nextColor(): string {
  return COLORS[++colorIndex % COLORS.length]
}

const CACHE = new Map<string, string>()

export function img(w: number, h: number, text: string, bg?: string): string {
  const key = `${w}_${h}_${text}_${bg || ''}`
  const cached = CACHE.get(key)
  if (cached) return cached

  try {
    const c = bg || nextColor()
    const s = `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}">
      <defs><linearGradient id="g" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="${c}"/><stop offset="100%" stop-color="${c}80"/></linearGradient></defs>
      <rect width="${w}" height="${h}" fill="url(#g)"/>
      <line x1="0" y1="0" x2="${w}" y2="${h}" stroke="rgba(255,255,255,0.03)" stroke-width="2"/>
      <line x1="${w}" y1="0" x2="0" y2="${h}" stroke="rgba(255,255,255,0.03)" stroke-width="2"/>
      <rect x="${w*0.08}" y="${h*0.08}" width="${w*0.84}" height="${h*0.84}" rx="4" fill="none" stroke="rgba(255,255,255,0.15)" stroke-width="1.5"/>
      <text x="${w/2}" y="${h/2+4}" text-anchor="middle" fill="rgba(255,255,255,0.9)" font-size="${Math.min(w,h)*0.09}" font-weight="700" font-family="sans-serif">${xmlEscape(text)}</text>
    </svg>`
    const url = `data:image/svg+xml,${encodeURIComponent(s)}`
    CACHE.set(key, url)
    return url
  } catch {
    return 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7'
  }
}

function xmlEscape(s: string): string {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')
}
