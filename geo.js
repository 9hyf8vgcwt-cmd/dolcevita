/* ------------------------------------------------------------------ *
 *  geo.js — all map geometry
 *  - ITALY_REGIONS: low-poly polygons for the national map (viewBox 760x940)
 *  - REGION_MAPS:   stylised local maps for each region (viewBox 600x460)
 *  Coordinates are schematic, not survey-accurate: the goal is a clean,
 *  legible orientation rather than a cartographic reproduction.
 * ------------------------------------------------------------------ */

const ITALY_VIEWBOX = "0 0 760 940";

const ITALY_REGIONS = [
  { id:'val-daosta',  name:"Valle d'Aosta",        active:false, points:"120,150 165,120 205,150 178,182 132,180" },
  { id:'piemonte',    name:"Piemonte",             active:true,  points:"132,180 178,182 205,150 252,168 290,250 292,322 250,358 198,348 165,300 150,240" },
  { id:'lombardia',   name:"Lombardia",            active:false, points:"252,168 332,118 412,130 432,205 405,258 330,266 290,250" },
  { id:'trentino',    name:"Trentino-Alto Adige",  active:false, points:"388,96 446,80 474,122 458,176 412,168 396,130" },
  { id:'veneto',      name:"Veneto",               active:false, points:"412,168 458,176 548,182 562,238 482,258 432,205" },
  { id:'friuli',      name:"Friuli-Venezia Giulia",active:true,  points:"548,182 602,166 636,202 614,252 562,238" },
  { id:'liguria',     name:"Liguria",              active:false, points:"165,300 198,348 250,358 305,352 332,362 300,388 230,374 180,346" },
  { id:'emilia',      name:"Emilia-Romagna",       active:false, points:"290,250 330,266 405,258 432,205 482,258 548,302 500,356 432,362 360,356 332,362 305,352 300,322" },
  { id:'toscana',     name:"Toscana",              active:true,  points:"305,352 360,356 432,362 442,422 402,472 350,472 320,442 300,392" },
  { id:'umbria',      name:"Umbria",               active:false, points:"442,362 500,356 492,392 502,422 472,472 442,472 432,422" },
  { id:'marche',      name:"Marche",               active:true,  points:"500,356 548,302 578,362 562,432 522,456 502,422 492,392" },
  { id:'lazio',       name:"Lazio",                active:false, points:"350,472 402,472 442,472 472,472 462,532 412,588 362,562 336,512" },
  { id:'abruzzo',     name:"Abruzzo",              active:true,  points:"502,422 522,456 562,432 582,472 562,522 512,522 492,482" },
  { id:'molise',      name:"Molise",               active:false, points:"512,522 562,522 592,542 576,582 526,566 506,546" },
  { id:'campania',    name:"Campania",             active:false, points:"412,588 462,532 512,546 526,566 520,612 470,652 430,632" },
  { id:'puglia',      name:"Puglia",               active:false, points:"576,502 606,500 662,546 702,622 660,668 606,642 576,582 592,542" },
  { id:'basilicata',  name:"Basilicata",           active:false, points:"520,566 576,582 606,642 576,676 530,666 515,612" },
  { id:'calabria',    name:"Calabria",             active:false, points:"530,668 574,678 600,694 582,742 548,800 520,812 536,748 540,710" },
  { id:'sicilia',     name:"Sicilia",              active:true,  points:"448,860 578,846 620,896 538,918 458,908" },
  { id:'sardegna',    name:"Sardegna",             active:false, points:"175,615 252,600 272,692 236,776 180,766 160,690" },
];

/* Small offshore marker drawn separately on the national map */
const ITALY_ISLANDS = [
  { id:'pantelleria', name:'Pantelleria', x:392, y:902, active:true } // SW of Sicily
];

/* ------------------------------------------------------------------ *
 *  Local region maps. viewBox 0 0 600 460.
 *  shape  : backdrop polygon for the region
 *  sea    : { label, side } optional water hint
 *  places : { name, x, y, kind }  kind = 'city' | 'town' | 'zone'
 *  producers : { id, name, x, y }  (orange, clickable)
 * ------------------------------------------------------------------ */
const REGION_MAPS = {
  piemonte: {
    title: "Piemonte",
    subtitle: "Langhe & Monferrato",
    shape: "70,120 200,80 360,90 470,150 500,260 420,360 250,400 120,360 60,250",
    sea: null,
    places: [
      { name:"Asti",                x:170, y:130, kind:'city' },
      { name:"Alba",                x:330, y:250, kind:'city' },
      { name:"Barbaresco",          x:362, y:208, kind:'zone' },
      { name:"Treiso",              x:360, y:258, kind:'town' },
      { name:"La Morra",            x:268, y:298, kind:'town' },
      { name:"Barolo",              x:296, y:322, kind:'zone' },
      { name:"Castiglione Falletto",x:332, y:312, kind:'town' },
      { name:"Serralunga d'Alba",   x:378, y:320, kind:'town' },
    ],
    producers: [
      { id:'contratto',  name:"Contratto",  x:205, y:188, sub:"Canelli" },
      { id:'ceretto',    name:"Ceretto",    x:406, y:214, sub:"Gallina · Neive" },
      { id:'fortemasso', name:"Fortemasso", x:330, y:362, sub:"Castelletto · Monforte d'Alba" },
    ],
  },
  toscana: {
    title: "Toscana",
    subtitle: "Bolgheri & Chianti Classico",
    shape: "90,120 220,80 360,70 470,120 500,250 430,360 280,400 130,370 60,260",
    sea: { label:"Mar Tirreno", side:'left' },
    places: [
      { name:"Firenze",      x:392, y:96,  kind:'city' },
      { name:"Castagneto C.",x:150, y:232, kind:'town' },
      { name:"Greve",        x:372, y:168, kind:'town' },
      { name:"Castellina",   x:332, y:206, kind:'zone' },
      { name:"Radda",        x:392, y:206, kind:'town' },
      { name:"Siena",        x:360, y:270, kind:'city' },
    ],
    producers: [
      { id:'argentiera', name:"Tenuta Argentiera", x:132, y:258, sub:"Bolgheri" },
      { id:'monsanto',   name:"Castello di Monsanto", x:332, y:150, sub:"Barberino · Chianti Classico" },
    ],
  },
  marche: {
    title: "Marche",
    subtitle: "Verdicchio dei Castelli di Jesi",
    shape: "80,120 240,90 380,110 470,170 470,300 380,380 220,400 110,340 70,230",
    sea: { label:"Mar Adriatico", side:'right' },
    places: [
      { name:"Ancona",       x:432, y:150, kind:'city' },
      { name:"Jesi",         x:352, y:208, kind:'city' },
      { name:"Montecarotto", x:300, y:212, kind:'town' },
      { name:"Cupramontana", x:310, y:250, kind:'zone' },
    ],
    producers: [
      { id:'bucci', name:"Bucci", x:352, y:160, sub:"Ostra Vetere · Castelli di Jesi" },
    ],
  },
  abruzzo: {
    title: "Abruzzo",
    subtitle: "Trebbiano d'Abruzzo",
    shape: "70,150 220,100 360,110 460,170 470,300 360,380 200,390 100,330 60,240",
    sea: { label:"Mar Adriatico", side:'right' },
    places: [
      { name:"Gran Sasso",      x:170, y:170, kind:'zone' },
      { name:"Pescara",         x:430, y:170, kind:'city' },
      { name:"Chieti",          x:392, y:248, kind:'city' },
      { name:"Loreto Aprutino", x:352, y:206, kind:'town' },
    ],
    producers: [
      { id:'valentini', name:"Valentini", x:352, y:196, sub:"Loreto Aprutino" },
    ],
  },
  friuli: {
    title: "Friuli-Venezia Giulia",
    subtitle: "Collio · Ribolla Gialla",
    shape: "70,130 230,90 380,100 470,160 470,300 360,360 210,380 110,320 60,220",
    sea: { label:"Mar Adriatico", side:'bottom' },
    places: [
      { name:"Udine",       x:240, y:170, kind:'city' },
      { name:"Gorizia",     x:392, y:262, kind:'city' },
      { name:"Collio / Brda", x:392, y:212, kind:'zone' },
      { name:"Slovenia →",  x:470, y:200, kind:'town' },
    ],
    producers: [
      { id:'gravner', name:"Gravner", x:402, y:232, sub:"Oslavia · Collio" },
    ],
  },
  sicilia: {
    title: "Sicilia",
    subtitle: "Passito di Pantelleria",
    shape: "190,130 470,120 520,230 430,320 240,330 150,240",
    sea: { label:"Canale di Sicilia", side:'bottom' },
    places: [
      { name:"Palermo", x:300, y:160, kind:'city' },
      { name:"Trapani", x:185, y:200, kind:'city' },
      { name:"Marsala", x:190, y:248, kind:'town' },
      { name:"Etna",    x:445, y:215, kind:'zone' },
    ],
    producers: [
      { id:'pantelleria', name:"Tua Rita", x:110, y:370, sub:"Sese · Pantelleria" },
    ],
  },
};

if (typeof window !== 'undefined') {
  window.GEO = { ITALY_VIEWBOX, ITALY_REGIONS, ITALY_ISLANDS, REGION_MAPS };
}
