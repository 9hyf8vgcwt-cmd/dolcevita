/* ------------------------------------------------------------------ *
 *  app.js — gate, router and view rendering.
 * ------------------------------------------------------------------ */
(function(){
  "use strict";

  /* ---------- configuration -------------------------------------- */
  const PASSWORD = "barolo";          // demo only — see README for real auth
  const UNLOCK_KEY = "iwp_unlocked";

  const GEO  = window.GEO;
  const DATA = window.DATA;
  const MAPS = window.MAPS;
  const BOTTLES = window.BOTTLES;

  const $  = (s, r=document) => r.querySelector(s);
  const $$ = (s, r=document) => Array.from(r.querySelectorAll(s));

  function esc(s){
    return String(s).replace(/[&<>"]/g, c => (
      {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]
    ));
  }

  /* ---------- gate ------------------------------------------------- */
  function isUnlocked(){
    try { return sessionStorage.getItem(UNLOCK_KEY) === "1"; }
    catch(e){ return window.__unlocked === true; }
  }
  function setUnlocked(){
    try { sessionStorage.setItem(UNLOCK_KEY, "1"); }
    catch(e){ window.__unlocked = true; }
  }

  function showGate(){
    $("#gate").hidden = false;
    $("#app").hidden = true;
    const input = $("#gate-input");
    const err = $("#gate-err");
    const submit = () => {
      if(input.value === PASSWORD){
        setUnlocked();
        $("#gate").hidden = true;
        boot();
      } else {
        err.textContent = "Incorrect password.";
        input.select();
      }
    };
    $("#gate-btn").addEventListener("click", submit);
    input.addEventListener("keydown", e => { if(e.key === "Enter") submit(); });
    input.focus();
  }

  /* ---------- router ---------------------------------------------- */
  function parseHash(){
    const h = location.hash.replace(/^#/, "") || "/";
    const [path, query] = h.split("?");
    const parts = path.split("/").filter(Boolean);   // e.g. ["region","piemonte"]
    const params = new URLSearchParams(query || "");
    return { parts, params };
  }

  function navigate(hash){ location.hash = hash; }

  function route(){
    if(!isUnlocked()){ showGate(); return; }
    const { parts, params } = parseHash();

    if(parts[0] === "region" && parts[1]){
      renderRegion(parts[1]);
    } else if(parts[0] === "producer" && parts[1]){
      renderProducer(parts[1], params.get("tab") || "producer");
    } else {
      renderLanding();
    }
    window.scrollTo({ top:0, behavior: prefersReduced() ? "auto" : "smooth" });
  }

  function prefersReduced(){
    return window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  }

  /* ---------- breadcrumb ------------------------------------------ */
  function crumbs(trail){
    const el = $("#crumbs");
    const parts = [`<button data-go="#/">Italy</button>`];
    trail.forEach((t,i) => {
      parts.push(`<span class="sep">/</span>`);
      if(i === trail.length-1){
        parts.push(`<span class="here">${esc(t.label)}</span>`);
      } else {
        parts.push(`<button data-go="${t.hash}">${esc(t.label)}</button>`);
      }
    });
    el.innerHTML = parts.join("");
    $$("button[data-go]", el).forEach(b =>
      b.addEventListener("click", () => navigate(b.dataset.go))
    );
  }

  /* ---------- landing (Italy map) --------------------------------- */
  function renderLanding(){
    crumbs([]);
    const view = $("#view");
    view.className = "wrap view";
    view.innerHTML = `
      <section class="landing">
        <div class="landing-head">
          <h1>A portfolio of Italian wines,<br>region by region.</h1>
          <p>Select a highlighted region to explore its producers. Greyed regions are not part of the current selection.</p>
        </div>
        <div class="map-stage">${MAPS.buildItalyMap()}</div>
        <div class="legend">
          <span><i class="sw-active"></i>Region in portfolio</span>
          <span><i class="sw-acc"></i>Producer location</span>
          <span><i class="sw-off"></i>Not in selection</span>
        </div>
      </section>`;

    $$("[data-region]", view).forEach(node => {
      const go = () => navigate(`#/region/${node.dataset.region}`);
      node.addEventListener("click", go);
      node.addEventListener("keydown", e => {
        if(e.key === "Enter" || e.key === " "){ e.preventDefault(); go(); }
      });
    });
  }

  /* ---------- region view ----------------------------------------- */
  function renderRegion(regionId){
    const R = GEO.REGION_MAPS[regionId];
    if(!R){ navigate("#/"); return; }
    crumbs([{ label:R.title, hash:`#/region/${regionId}` }]);

    const list = (R.producers||[]).map(p => `
      <button class="prod-card" data-producer="${p.id}">
        <span class="n">${esc(p.name)}</span>
        <span class="s">${esc(p.sub||"")}</span>
      </button>`).join("");

    const view = $("#view");
    view.className = "wrap view";
    view.innerHTML = `
      <section class="region-view">
        <div class="r-head">
          <h1>${esc(R.title)}</h1>
          <div class="r-sub">${esc(R.subtitle||"")}</div>
        </div>
        <div class="region-grid">
          <div class="region-canvas">${MAPS.buildRegionMap(regionId)}</div>
          <div class="region-list">
            <h2>Producers in this region</h2>
            ${list}
          </div>
        </div>
      </section>`;

    $$("[data-producer]", view).forEach(node => {
      const go = () => navigate(`#/producer/${node.dataset.producer}`);
      node.addEventListener("click", go);
      node.addEventListener("keydown", e => {
        if(e.key === "Enter" || e.key === " "){ e.preventDefault(); go(); }
      });
    });
  }

  /* ---------- producer page --------------------------------------- */
  function renderProducer(producerId, tab){
    const P = DATA.PRODUCERS[producerId];
    if(!P){ navigate("#/"); return; }
    const region = GEO.REGION_MAPS[P.region];
    tab = (tab === "wines") ? "wines" : "producer";

    crumbs([
      { label: region ? region.title : P.region, hash:`#/region/${P.region}` },
      { label: P.name, hash:`#/producer/${producerId}` }
    ]);

    const view = $("#view");
    view.className = "wrap view";
    view.innerHTML = `
      <article class="producer">
        <header class="p-top">
          <div class="p-place">${esc(P.place||"")}</div>
          <h1>${esc(P.name)}</h1>
          <p class="p-lede">${esc(P.lede||"")}</p>
          ${P.founded ? `<div class="p-founded">Established ${esc(String(P.founded))}</div>` : ""}
        </header>

        <div class="tabs" role="tablist">
          <button class="tab" role="tab" data-tab="producer" aria-selected="${tab==="producer"}">The Estate</button>
          <button class="tab" role="tab" data-tab="wines" aria-selected="${tab==="wines"}">The Wines</button>
        </div>

        <div id="tabpane" class="tabpane"></div>
      </article>`;

    const pane = $("#tabpane", view);
    const draw = (which) => {
      pane.innerHTML = which === "wines" ? winesPane(P) : estatePane(P);
      if(which === "wines") mountBottles(pane, P);
    };
    draw(tab);

    $$(".tab", view).forEach(btn => {
      btn.addEventListener("click", () => {
        const which = btn.dataset.tab;
        $$(".tab", view).forEach(b => b.setAttribute("aria-selected", String(b===btn)));
        // keep the hash in sync without a full re-render
        history.replaceState(null, "", `#/producer/${producerId}?tab=${which}`);
        draw(which);
      });
    });
  }

  function estatePane(P){
    const history = (P.history||[]).map(par => `<p>${esc(par)}</p>`).join("");
    const refs = (P.references||[]).length ? `
      <div class="refs">
        <h3>Sources &amp; further reading</h3>
        <ul>${P.references.map(r => `
          <li><a href="${esc(r.url)}" target="_blank" rel="noopener noreferrer">
            <span class="lbl">${esc(r.label)}</span>
            <span class="src">${esc(r.source)}</span>
          </a></li>`).join("")}</ul>
      </div>` : "";
    return `<div class="prose">${history}</div>${refs}`;
  }

  function winesPane(P){
    const wines = (P.wines||[]).map(id => DATA.WINES[id]).filter(Boolean);
    const blocks = wines.map(w => {
      const note = (w.producer === "pantelleria" && P.attributionNote)
        ? `<div class="note-flag">${esc(P.attributionNote)}</div>` : "";
      return `
      <div class="wine">
        <div class="wine-visual" data-bottle="${esc(w.id)}"></div>
        <div class="wine-meta">
          <div class="wine-vint">${esc(w.vintage||"")}${w.format ? " · "+esc(w.format) : ""}</div>
          <h2>${esc(w.name)}</h2>
          <div class="wine-app">${esc(w.appellation||"")}</div>
          ${note}
          <dl class="spec">
            ${row("Grapes", w.grapes)}
            ${row("Tasting", w.tasting)}
            ${row("Production", w.production)}
            ${row("Vintage", w.vintageNote)}
          </dl>
        </div>
      </div>`;
    }).join("");
    return blocks || `<p class="prose">No wines listed.</p>`;
  }

  function row(label, value){
    if(!value) return "";
    return `<div class="spec-row"><dt>${esc(label)}</dt><dd>${esc(value)}</dd></div>`;
  }

  function mountBottles(scope, P){
    $$("[data-bottle]", scope).forEach(holder => {
      const w = DATA.WINES[holder.dataset.bottle];
      if(!w) return;
      const b = w.bottle || {};
      holder.innerHTML = BOTTLES.buildBottle({
        silhouette: b.silhouette,
        glass: b.glass, wine: b.wine, label: b.label, accent: b.accent,
        producerName: P.name,
        wineName: w.name,
        vintage: w.vintage
      });
    });
  }

  /* ---------- boot ------------------------------------------------- */
  function boot(){
    $("#app").hidden = false;
    window.addEventListener("hashchange", route);
    route();
  }

  function start(){
    if(isUnlocked()) boot();
    else showGate();
  }

  if(document.readyState === "loading"){
    document.addEventListener("DOMContentLoaded", start);
  } else {
    start();
  }
})();
