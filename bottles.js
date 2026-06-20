/* ------------------------------------------------------------------ *
 *  bottles.js — generates a clean, stylised SVG bottle illustration.
 *  No real label artwork is reproduced; labels are typeset from data.
 * ------------------------------------------------------------------ */

const BOTTLE_SHAPES = {
  bordeaux: { d:"M52,44 L52,118 C52,126 46,128 40,134 L20,150 C16,154 14,158 14,166 L14,330 Q14,344 28,344 L92,344 Q106,344 106,330 L106,166 C106,158 104,154 100,150 L80,134 C74,128 68,126 68,118 L68,44 Z",
              neck:[44,120], label:[24,214,72,94] },
  burgundy: { d:"M53,44 L53,112 C53,120 40,126 32,140 C22,156 16,166 16,180 L16,330 Q16,344 30,344 L90,344 Q104,344 104,330 L104,180 C104,166 98,156 88,140 C80,126 67,120 67,112 L67,44 Z",
              neck:[44,112], label:[24,220,72,90] },
  sparkling:{ d:"M50,38 L50,108 C50,118 38,124 30,140 C20,156 14,168 14,184 L14,330 Q14,346 30,346 L90,346 Q106,346 106,330 L106,184 C106,168 100,156 90,140 C82,124 70,118 70,108 L70,38 Z",
              neck:[42,110], label:[24,224,72,92] },
  heavy:    { d:"M52,46 L52,110 C52,120 36,126 28,144 C18,160 12,172 12,188 L12,328 Q12,344 28,344 L92,344 Q108,344 108,328 L108,188 C108,172 102,160 92,144 C84,126 68,120 68,110 L68,46 Z",
              neck:[44,112], label:[20,214,80,96] },
  dessert:  { d:"M53,86 L53,150 C53,158 47,160 41,166 L24,180 C20,184 18,188 18,196 L18,326 Q18,340 32,340 L88,340 Q102,340 102,326 L102,196 C102,188 100,184 96,180 L79,166 C73,160 67,158 67,150 L67,86 Z",
              neck:[86,150], label:[24,228,72,78] },
};

function wrapText(str, max){
  const words = String(str).split(' ');
  const lines = []; let cur = '';
  for(const w of words){
    if((cur + ' ' + w).trim().length > max){ if(cur) lines.push(cur); cur = w; }
    else cur = (cur + ' ' + w).trim();
  }
  if(cur) lines.push(cur);
  return lines.slice(0,3);
}

function buildBottle(spec){
  const s = BOTTLE_SHAPES[spec.silhouette] || BOTTLE_SHAPES.burgundy;
  const id = 'b' + Math.random().toString(36).slice(2,8);
  const [neckTop, neckBottom] = s.neck;
  const [lx, ly, lw, lh] = s.label;
  const glass = spec.glass || '#3b1e22';
  const wine  = spec.wine  || glass;
  const label = spec.label || '#efe9dd';
  const accent = spec.accent || '#dd4a18';
  const labelDark = (label === '#1d1d1b' || label === '#1b1b1a');
  const ink = labelDark ? '#efe9dd' : '#1d1d1b';
  const sub = labelDark ? 'rgba(239,233,221,.6)' : 'rgba(29,29,27,.55)';

  const prodName = (spec.producerName || '').toUpperCase();
  const prodAvail = lw - 10;                        // inner label width
  // mono advance ~0.62*fs + tracking; solve for a font-size that fits
  let prodFs = 6.4, prodLs = 1.2;
  const prodW = n => prodName.length * 0.62 * n + Math.max(0, prodName.length-1) * (n/6.4*1.2);
  if (prodW(prodFs) > prodAvail){
    prodLs = 0.4;
    prodFs = Math.max(4.2, prodAvail / (prodName.length * 0.62 + Math.max(0, prodName.length-1) * 0.07));
  }

  // wine name: wrap, then size down if the longest line is too wide
  const nameLines = wrapText(spec.wineName || '', 16);
  const longest = nameLines.reduce((m,l)=>Math.max(m,l.length), 0);
  let nameFs = 9.4;                                  // serif italic advance ~0.54*fs
  if (longest * 0.54 * nameFs > prodAvail){
    nameFs = Math.max(6.8, prodAvail / (longest * 0.54));
  }
  const nameLeading = nameFs * 1.28;
  const nameStart = ly + 34 - (nameLines.length-1)*(nameLeading/2);
  const nameTspans = nameLines.map((ln,i)=>
    `<tspan x="${lx+lw/2}" y="${nameStart + i*nameLeading}">${escapeXml(ln)}</tspan>`).join('');

  return `
<svg viewBox="0 0 120 380" xmlns="http://www.w3.org/2000/svg" class="bottle-svg" role="img" aria-label="${escapeXml((spec.producerName||'')+' '+(spec.wineName||'')+' '+(spec.vintage||''))}">
  <defs>
    <clipPath id="${id}clip"><path d="${s.d}"/></clipPath>
    <linearGradient id="${id}glass" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0" stop-color="${glass}" stop-opacity="0.78"/>
      <stop offset="0.32" stop-color="${glass}"/>
      <stop offset="0.62" stop-color="${shade(glass,-14)}"/>
      <stop offset="1" stop-color="${shade(glass,-30)}"/>
    </linearGradient>
  </defs>
  <ellipse cx="60" cy="362" rx="40" ry="6" fill="rgba(0,0,0,.28)"/>
  <g clip-path="url(#${id}clip)">
    <rect x="0" y="0" width="120" height="380" fill="url(#${id}glass)"/>
    <rect x="0" y="${neckTop}" width="120" height="40" fill="${wine}" opacity="0.35"/>
    <rect x="20" y="0" width="9" height="380" fill="#ffffff" opacity="0.14"/>
    <rect x="33" y="0" width="3" height="380" fill="#ffffff" opacity="0.10"/>
  </g>
  <path d="${s.d}" fill="none" stroke="rgba(0,0,0,.35)" stroke-width="1"/>
  <!-- capsule / foil -->
  <rect x="${spec.silhouette==='dessert'?51:48}" y="${neckTop}" width="${spec.silhouette==='dessert'?18:24}" height="${Math.min(34, neckBottom-neckTop+6)}" fill="${shade(glass,-40)}"/>
  <rect x="${spec.silhouette==='dessert'?51:48}" y="${neckTop+Math.min(30,neckBottom-neckTop+2)}" width="${spec.silhouette==='dessert'?18:24}" height="2" fill="${accent}"/>
  <!-- label -->
  <rect x="${lx}" y="${ly}" width="${lw}" height="${lh}" rx="2" fill="${label}"/>
  <rect x="${lx}" y="${ly}" width="${lw}" height="${lh}" rx="2" fill="none" stroke="rgba(0,0,0,.10)"/>
  <line x1="${lx+10}" y1="${ly+20}" x2="${lx+lw-10}" y2="${ly+20}" stroke="${accent}" stroke-width="1.4"/>
  <text x="${lx+lw/2}" y="${ly+14}" text-anchor="middle" fill="${ink}"
        font-family="'Space Mono', monospace" font-size="${prodFs.toFixed(2)}" letter-spacing="${prodLs}">${escapeXml(prodName)}</text>
  <text text-anchor="middle" fill="${ink}" font-family="'Newsreader', Georgia, serif" font-size="${nameFs.toFixed(2)}" font-style="italic">${nameTspans}</text>
  <text x="${lx+lw/2}" y="${ly+lh-10}" text-anchor="middle" fill="${sub}"
        font-family="'Space Mono', monospace" font-size="9" letter-spacing="2">${escapeXml(spec.vintage||'')}</text>
</svg>`;
}

function shade(hex, amt){
  const c = hex.replace('#','');
  const n = parseInt(c.length===3 ? c.split('').map(x=>x+x).join('') : c, 16);
  let r=(n>>16)+amt, g=((n>>8)&255)+amt, b=(n&255)+amt;
  r=Math.max(0,Math.min(255,r)); g=Math.max(0,Math.min(255,g)); b=Math.max(0,Math.min(255,b));
  return '#'+((1<<24)+(r<<16)+(g<<8)+b).toString(16).slice(1);
}
function escapeXml(s){ return String(s).replace(/[<>&'"]/g, c=>({ '<':'&lt;','>':'&gt;','&':'&amp;',"'":'&#39;','"':'&quot;' }[c])); }

if (typeof window !== 'undefined') window.BOTTLES = { buildBottle };
if (typeof module !== 'undefined') module.exports = { buildBottle };
