const l=["#059669","#0D9488","#1E3A5F","#065F46","#1A5276","#0B1121","#1E293B","#334155"];let g=0;function $(){return l[++g%l.length]}const a=new Map;function d(t,e,o,r){const n=`${t}_${e}_${o}_${r||""}`,i=a.get(n);if(i)return i;try{const s=r||$(),c=`<svg xmlns="http://www.w3.org/2000/svg" width="${t}" height="${e}" viewBox="0 0 ${t} ${e}">
      <defs><linearGradient id="g" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="${s}"/><stop offset="100%" stop-color="${s}80"/></linearGradient></defs>
      <rect width="${t}" height="${e}" fill="url(#g)"/>
      <line x1="0" y1="0" x2="${t}" y2="${e}" stroke="rgba(255,255,255,0.03)" stroke-width="2"/>
      <line x1="${t}" y1="0" x2="0" y2="${e}" stroke="rgba(255,255,255,0.03)" stroke-width="2"/>
      <rect x="${t*.08}" y="${e*.08}" width="${t*.84}" height="${e*.84}" rx="4" fill="none" stroke="rgba(255,255,255,0.15)" stroke-width="1.5"/>
      <text x="${t/2}" y="${e/2+4}" text-anchor="middle" fill="rgba(255,255,255,0.9)" font-size="${Math.min(t,e)*.09}" font-weight="700" font-family="sans-serif">${f(o)}</text>
    </svg>`,A=`data:image/svg+xml,${encodeURIComponent(c)}`;return a.set(n,A),A}catch{return"data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7"}}function f(t){return t.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;")}export{d as i};
