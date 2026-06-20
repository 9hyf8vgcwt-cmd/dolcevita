# Italian Wine Portfolio

A password-gated, map-driven catalogue of a small portfolio of Italian wines, built for the trade. The experience is built around diving in and out of a stylised map of Italy: the landing page shows the country segmented into regions, clicking a highlighted region opens a regional map, and clicking an orange producer marker opens a producer page that toggles between estate background and the wines.

It is a static single-page site — plain HTML, CSS and vanilla JavaScript, with no build step and no dependencies. Open `index.html` and it runs.

## Running it

There are two builds in this folder:

- **`italian-wine-portfolio-standalone.html`** — the whole site (HTML, CSS and all JavaScript) in one self-contained file. Nothing is loaded from separate folders, so it works anywhere: double-click it, drag it into a browser, or drop it on any static host. **If you had a blank/white page when deploying, use this file** — that problem comes from a host not serving the `css/` and `js/` sub-files, which this single file avoids entirely.
- **The modular version** (`index.html` + `css/` + `js/`) — the same site split into editable files. Use this when you want to change content or styling. If you deploy it, make sure the host serves the whole folder (the `css/` and `js/` directories must be reachable next to `index.html`).

For the modular version, serving the folder is more reliable than opening `index.html` directly:

```
cd italian-wine-portfolio
python3 -m http.server 8000
# then visit http://localhost:8000
```

The demo password is **`barolo`**. In the modular build, change it at the top of `js/app.js`; in the standalone file, change it in the `app.js` section near the bottom (`const PASSWORD = "barolo";`).

## Important: the password is not real security

The login gate is implemented in client-side JavaScript. It controls what the page *shows*, but every file is still downloaded to the browser, so anyone who opens developer tools or reads the source can see the password and the content. Treat it as a "members only" presentation gate, not as protection for confidential material.

For genuine access control, put the site behind one of these instead (and you can then remove or keep the in-page gate as you prefer):

- **Host-level password** — Netlify and Vercel both offer password-protected sites / preview protection; Cloudflare Access can gate a site by email or SSO.
- **HTTP Basic Auth** at the web server (an `.htpasswd` file on Apache/Nginx).
- **A small backend** that authenticates the user and only then serves the catalogue data.

If the wine data itself is sensitive, it must be served from behind real auth — a static client gate cannot hide it.

## A note on the Pantelleria wine

The ninth wine is **Tua Rita "Sese" Passito di Pantelleria 2022**. Tua Rita is a cult red-wine estate in Suvereto, Tuscany (Redigaffi, Giusto di Notri, Per Sempre), which acquired vineyards on the island of Pantelleria in 2016 and makes this single sweet Zibibbo there. Because the wine is a Pantelleria DOC, it sits under Sicilia on the map rather than Tuscany, and the producer page notes the Tuscan home estate. (An earlier draft of the brief spelled the wine "Sete," which made it hard to trace; "Sese" is correct.)

## Project structure

```
italian-wine-portfolio/
├── index.html          # shell: login gate, app container, fonts, script includes
├── css/
│   └── styles.css      # full styling — palette, type, responsive layout, transitions
└── js/
    ├── geo.js          # map geometry: national low-poly map + 6 regional maps
    ├── data.js         # all producer and wine content, with source links
    ├── bottles.js      # generates a stylised SVG bottle per wine (no real labels)
    ├── maps.js         # turns geo.js into clickable national / regional SVG maps
    └── app.js          # password gate, hash router, view rendering, tab toggle
```

The two places you will most likely edit are `js/data.js` (content) and `js/geo.js` (where producers sit on each regional map).

## How the pieces fit

- **`app.js`** runs everything. It checks a session unlock flag, otherwise shows the gate. Once unlocked it reads `location.hash` and renders one of three views: the national map (`#/`), a region (`#/region/piemonte`), or a producer (`#/producer/ceretto?tab=wines`). Navigation is just hash changes, so the back button works and pages are linkable.
- **`maps.js`** builds the SVG maps as strings from `geo.js`; `app.js` injects them and attaches click / keyboard handlers to the elements carrying `data-region` and `data-producer`.
- **`bottles.js`** draws each bottle from a small set of silhouette shapes (sparkling, burgundy, bordeaux, heavy, dessert) plus colours and the typeset producer / wine / vintage. Long names are auto-sized to fit the label.
- **`data.js`** is the single source of truth for content and is wired to the producers and wines by id.

## On the images

The maps and the bottles are **generated as SVG from data** — they are not photographs and reproduce no winery label artwork or copyrighted imagery. The maps are deliberately stylised (low-poly) rather than geographically exact. If you would prefer real cartography or label shots, those can be swapped in, but you would need the rights to use them.

## Adding or editing a wine

1. Add (or edit) the producer in `PRODUCERS` and the wine in `WINES` in `js/data.js`, keeping the id references consistent (`producer.wines` lists wine ids; each `wine.producer` points back).
2. If the producer sits in a new region, add the producer marker (id, name, x, y, sub) to that region in `js/geo.js`, and make sure the region is marked `active: true` in `ITALY_REGIONS`.
3. Pick a bottle silhouette and colours in the wine's `bottle` object.

## Sources

Producer and wine notes were written from publicly available producer information and trade/critical coverage (Decanter, Wine Spectator, Berry Bros. & Rudd, importer profiles, Gambero Rosso and similar). Each producer page lists its own "Sources & further reading" links. The prose is original and intended to be factual and measured rather than promotional; please still check it against your own references before client use, and add or correct links as needed.
