/* ------------------------------------------------------------------ *
 *  maps.js — builds the interactive SVG maps from window.GEO.
 *    buildItalyMap()        → national map, active regions clickable
 *    buildRegionMap(id)     → regional detail map with producer markers
 *  Pure string builders; app.js injects the result and wires clicks.
 * ------------------------------------------------------------------ */
(function(){
  const GEO = window.GEO;

  function esc(s){
    return String(s).replace(/[&<>"]/g, c => (
      {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]
    ));
  }

  /* ---- national map ---------------------------------------------- */
  function buildItalyMap(){
    const regions = GEO.ITALY_REGIONS.map(r=>{
      const cls = r.active ? 'region active' : 'region inactive';
      const interactive = r.active
        ? ` tabindex="0" role="button" data-region="${r.id}" aria-label="${esc(r.name)} — view region"`
        : ' aria-hidden="true"';
      return `<polygon class="${cls}" points="${r.points}"${interactive}></polygon>`;
    }).join('\n');

    // labels only for active regions, placed at a rough centroid of points
    const labels = GEO.ITALY_REGIONS.filter(r=>r.active).map(r=>{
      const c = centroid(r.points);
      // long names (e.g. "Friuli-Venezia Giulia") get a short form on the map
      const short = r.name.length > 10 ? r.name.split(/[-\s]/)[0] : r.name;
      return `<text class="region-label on-dark" x="${c.x}" y="${c.y}" text-anchor="middle">${esc(short)}</text>`;
    }).join('\n');

    const islands = (GEO.ITALY_ISLANDS||[]).map(i=>{
      const interactive = i.active
        ? ` tabindex="0" role="button" data-region="${i.id}" aria-label="${esc(i.name)} — view region"`
        : '';
      return `<g class="island">
        <circle class="region-dot" cx="${i.x}" cy="${i.y}" r="7"${interactive}></circle>
        <text class="region-label" x="${i.x}" y="${i.y+24}" text-anchor="middle">${esc(i.name)}</text>
      </g>`;
    }).join('\n');

    return `<svg class="italy-map" viewBox="${GEO.ITALY_VIEWBOX}" xmlns="http://www.w3.org/2000/svg" role="group" aria-label="Map of Italy by wine region">
      <g>${regions}</g>
      <g>${labels}</g>
      ${islands}
    </svg>`;
  }

  /* ---- regional detail map --------------------------------------- */
  function buildRegionMap(regionId){
    const R = GEO.REGION_MAPS[regionId];
    if(!R) return '';
    const VB = '0 0 600 460';

    const shape = `<polygon class="r-shape" points="${R.shape}"></polygon>`;

    const sea = R.sea ? seaLabel(R.sea) : '';

    const places = (R.places||[]).map(p=>{
      const big = p.kind === 'city';
      const zone = p.kind === 'zone';
      const r = big ? 4 : 2.4;
      const dy = (p.y > 410) ? -10 : 16;
      return `<g>
        <circle class="r-place-dot${zone?' r-zone':''}" cx="${p.x}" cy="${p.y}" r="${r}"></circle>
        <text class="r-place" x="${p.x}" y="${p.y+dy}" text-anchor="middle">${esc(p.name)}</text>
      </g>`;
    }).join('\n');

    const producers = (R.producers||[]).map(p=>{
      const labelLeft = p.x > 360;
      const tx = labelLeft ? p.x-16 : p.x+16;
      const anchor = labelLeft ? 'end' : 'start';
      const sub = p.sub ? `<tspan x="${tx}" dy="15" font-size="9" fill="#6c6a63">${esc(p.sub)}</tspan>` : '';
      return `<g class="prod-marker" tabindex="0" role="button" data-producer="${p.id}" aria-label="${esc(p.name)} — view producer">
        <circle class="ring" cx="${p.x}" cy="${p.y}" r="14"></circle>
        <circle cx="${p.x}" cy="${p.y}" r="7"></circle>
        <text x="${tx}" y="${p.y+4}" text-anchor="${anchor}">${esc(p.name)}${sub}</text>
      </g>`;
    }).join('\n');

    return `<svg viewBox="${VB}" xmlns="http://www.w3.org/2000/svg" role="group" aria-label="${esc(R.title)} detail map">
      ${shape}
      ${sea}
      <g>${places}</g>
      <g>${producers}</g>
    </svg>`;
  }

  function seaLabel(sea){
    const pos = {
      left:   {x:40,  y:230, rot:-90},
      right:  {x:566, y:230, rot:90},
      bottom: {x:300, y:444, rot:0},
      top:    {x:300, y:24,  rot:0},
    }[sea.side] || {x:300, y:444, rot:0};
    return `<text class="r-sea" x="${pos.x}" y="${pos.y}" text-anchor="middle" transform="rotate(${pos.rot} ${pos.x} ${pos.y})">${esc(sea.label)}</text>`;
  }

  /* rough centroid from a "x,y x,y ..." points string */
  function centroid(points){
    const nums = points.trim().split(/\s+/).map(pair=>pair.split(',').map(Number));
    let sx=0, sy=0;
    nums.forEach(([x,y])=>{ sx+=x; sy+=y; });
    return { x: Math.round(sx/nums.length), y: Math.round(sy/nums.length) };
  }

  window.MAPS = { buildItalyMap, buildRegionMap };
})();
