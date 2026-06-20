/* ------------------------------------------------------------------ *
 *  data.js — portfolio content
 *  Prose is original and written to be factual and measured. Producer
 *  histories and wine notes are informed by the references listed on
 *  each page (Decanter, Wine Spectator, Berry Bros. & Rudd, Kerin
 *  O'Keefe, Gambero Rosso, consortium and estate sources).
 * ------------------------------------------------------------------ */

const PRODUCERS = {
  contratto: {
    id:'contratto', name:'Contratto', region:'piemonte', place:'Canelli, Asti',
    founded:'1867',
    lede:'One of the oldest Metodo Classico houses in Italy, restored under the Rivetti family.',
    history:[
      "Contratto was founded in Canelli, in the Asti hills, in 1867 by Giuseppe Contratto. It was among the first Italian houses to commit to bottle-fermented sparkling wine, and its 1919 bottling is generally cited as the first vintage-dated Italian Metodo Classico.",
      "Beneath the town lie the estate's cellars, cut deep into the tuff and limestone hillside and part of the UNESCO-listed \"underground cathedrals\" of Canelli. After a long decline, the house was bought by the Bocchino distilling family in 1993, who restored the cellars before selling in 2011 to Giorgio Rivetti of La Spinetta.",
      "A long-standing Champagne enthusiast, Rivetti had in fact been making the sparkling wines since 2007. He refocused the range on dry, vintage-dated bottlings given long ageing on the lees, and later developed estate vineyards in the high Alta Langa. The house is run today by Giorgio and his son Andrea.",
    ],
    references:[
      { label:'Producer profile', source:'Skurnik', url:'https://www.skurnik.com/producer/contratto/' },
      { label:'History', source:'Contratto', url:'https://www.contratto.it/en/history/' },
    ],
    wines:['contratto-pasdose'],
  },

  ceretto: {
    id:'ceretto', name:'Ceretto', region:'piemonte', place:'Alba',
    founded:'1937',
    lede:'An Alba house that helped pioneer single-vineyard Barolo and Barbaresco, now farmed organically and biodynamically.',
    history:[
      "Ceretto was established by Riccardo Ceretto in the 1930s. In the 1960s his sons Bruno and Marcello, influenced by Burgundy, began identifying and bottling individual crus of Barolo and Barbaresco — an unusual idea in Piedmont at the time — and built a group of small estates around them, including Bricco Asili in Barbaresco (1973) and Bricco Rocche in Barolo.",
      "The third generation — Lisa, Roberta, Alessandro and Federico — joined from 1999. Head winemaker Alessandro Ceretto began converting the vineyards to biodynamic farming in 2009 with consultant Adriano Zago; the estate's vines have been certified organic since the 2015 vintage.",
      "The family farms roughly 25 hectares across the Barolo and Barbaresco DOCGs, alongside other ventures in the Langhe including the three-Michelin-star Piazza Duomo in Alba.",
    ],
    references:[
      { label:'Producer profile, 19 wines tasted', source:'Decanter', url:'https://www.decanter.com/premium/ceretto-producer-profile-19-wines-tasted-496193/' },
      { label:'Barolo dinner & estate visit', source:'World of Fine Wine', url:'https://worldoffinewine.com/wine-food/ceretto-barolo-dinner-terroir-art-truffle-hunting' },
    ],
    wines:['ceretto-gallina'],
  },

  fortemasso: {
    id:'fortemasso', name:'Fortemasso', region:'piemonte', place:"Monforte d'Alba",
    founded:'2013',
    lede:'A young Monforte estate working a single corner of the Castelletto cru in a contemporary, restrained style.',
    history:[
      "Fortemasso was founded in 2013, when the Gussalli Beretta family acquired a small property at Castelletto, in the commune of Monforte d'Alba. The name comes from the large boulder (\"masso\") on the highest point of the hill. The Nebbiolo holdings for Barolo are modest — around five hectares — with further plots for Langhe Nebbiolo, Barbera and Dolcetto.",
      "The vineyards sit on Diano sandstone — sandy, silty soils — at roughly 360 to 450 metres, in a cool, well-ventilated pocket of the appellation. The approach is deliberately low-intervention, with the stated aim of a contemporary Barolo that keeps the variety's structure while emphasising freshness and perfume.",
      "Decanter has described the estate as expressing \"the contemporary soul of Barolo,\" a reference point for how a new generation is reading the Castelletto subzone.",
    ],
    references:[
      { label:'The contemporary soul of Barolo', source:'Decanter', url:'https://www.decanter.com/sponsored/fortemasso-the-contemporary-soul-of-barolo-568582/' },
      { label:'Estate', source:'Fortemasso', url:'https://www.fortemasso.it/en/' },
    ],
    wines:['fortemasso-castelletto'],
  },

  argentiera: {
    id:'argentiera', name:'Tenuta Argentiera', region:'toscana', place:'Bolgheri',
    founded:'1999',
    lede:'The highest and most coastal estate in Bolgheri, making Bordeaux-variety reds with a cooler, fresher accent.',
    history:[
      "Tenuta Argentiera was founded in 1999, with the first vines planted in 2000, in the southern part of the Bolgheri DOC. It sits on a plateau about 200 metres above the sea and roughly a mile from the Tyrrhenian coast — both the highest and one of the most maritime sites in the appellation. The name recalls the silver mines (argento) once worked in the hills.",
      "Nicolò Carrara has been winemaker and managing director since 2009. The estate works Bordeaux varieties — Cabernet Sauvignon, Merlot, Cabernet Franc and Petit Verdot — with a light hand in cellar and vineyard: gentle, gravity-fed handling and extended macerations, aiming for ripeness without heaviness.",
      "Of roughly 500 hectares of estate land, about 80 are under vine, framed by coastal forest that helps temper the climate.",
    ],
    references:[
      { label:'How Argentiera earned its billing in Bolgheri', source:'The Buyer', url:'https://www.the-buyer.net/people/producer/argentiera-bolgheri-doc' },
      { label:'Estate', source:'Tenuta Argentiera', url:'https://www.argentiera.it/en/' },
    ],
    wines:['argentiera-superiore'],
  },

  monsanto: {
    id:'monsanto', name:'Castello di Monsanto', region:'toscana', place:"Barberino Tavarnelle",
    founded:'1962',
    lede:'The estate that bottled the first single-vineyard Chianti Classico, still family-run.',
    history:[
      "Castello di Monsanto was established in 1962 by Fabrizio Bianchi in the hills of Barberino Val d'Elsa (now Barberino Tavarnelle), in the north-western part of Chianti Classico. That same year he bottled Il Poggio as a single-vineyard wine, generally recognised as the first single-vineyard (\"cru\") Chianti Classico.",
      "Bianchi was an early reformer: in 1968 he removed white grapes from his Chianti Classico blend, well before the rules allowed it, and the Il Poggio vineyard became the massal-selection source for the estate's Sangiovese, Canaiolo and Colorino. A long underground cellar holds one of Tuscany's deepest libraries of older vintages.",
      "The estate remains family-owned, run today by Fabrizio Bianchi and his daughter Laura.",
    ],
    references:[
      { label:'Estate profile', source:'Chianti Classico (Consorzio)', url:'https://www.chianticlassico.com/en/estates/castello-di-monsanto/' },
      { label:'Il Poggio', source:'Castello di Monsanto', url:'https://www.castellodimonsanto.it/en/wines/il-poggio' },
    ],
    wines:['monsanto-ilpoggio'],
  },

  bucci: {
    id:'bucci', name:'Bucci', region:'marche', place:'Ostra Vetere',
    founded:'1983',
    lede:'A reference estate for age-worthy Verdicchio, built by Ampelio Bucci with enologist Giorgio Grai.',
    history:[
      "The Bucci family has farmed the Castelli di Jesi hills since the 1700s, with origins at Montecarotto. From the early 1980s Ampelio Bucci — a Milan marketing professor known as \"il professore\" — set out to make a serious, age-worthy Verdicchio at a time when the grape was associated with cheap, high-volume wine.",
      "From 1983 he worked with the late enologist Giorgio Grai, of Alto Adige, refining a style that treats a white wine with the patience usually reserved for reds. The estate has been certified organic since 2002. Much of its land is given to olives and grain; the vines are spread across several parcels in the rolling Marche hills, not far from the Adriatic.",
      "The wines are made in an underground cellar cool enough to need no refrigeration, and each vineyard is vinified separately before blending.",
    ],
    references:[
      { label:'Villa Bucci Riserva: extraordinary wine from an ordinary grape', source:'Kerin O\u2019Keefe', url:'https://www.kerinokeefe.com/villa-bucci-riserva/' },
      { label:'Estate', source:'Villa Bucci', url:'https://www.villabucci.com/en/' },
    ],
    wines:['bucci-riserva'],
  },

  valentini: {
    id:'valentini', name:'Valentini', region:'abruzzo', place:'Loreto Aprutino',
    founded:'1650',
    lede:'A private, uncompromising Abruzzo estate whose Trebbiano is one of Italy\u2019s benchmark whites.',
    history:[
      "Valentini is one of Italy's most singular and private estates, at Loreto Aprutino in the province of Pescara, on the slopes between the Gran Sasso massif and the Adriatic. The family, of Spanish origin, has held land here since the seventeenth century.",
      "Edoardo Valentini, who made the wines from the 1950s until his death in 2006, turned Trebbiano d'Abruzzo — a name usually attached to ordinary wine — into a reference white, through severe selection and minimal intervention in the cellar. He sold only a small fraction of the crop as estate wine, and only in vintages he judged worthy.",
      "His son Francesco Paolo continues the same approach, working with his wife Elena and son Gabriele. The family says little about method, putting the emphasis squarely on the vineyard.",
    ],
    references:[
      { label:'Producer range & profile', source:'Berry Bros. & Rudd', url:'https://www.bbr.com/producer-3004-valentini-abruzzo' },
      { label:'An enigma in Abruzzo', source:'Wine Spectator', url:'https://www.winespectator.com/articles/azienda-agricola-valentini-an-enigma-in-abruzzo-42961' },
    ],
    wines:['valentini-trebbiano'],
  },

  gravner: {
    id:'gravner', name:'Gravner', region:'friuli', place:'Oslavia, Collio',
    founded:'1901',
    lede:'The estate that revived amphora-aged amber wine in modern Italy, working only Ribolla Gialla and Pignolo.',
    history:[
      "The Gravner farm at Oslavia, in the Collio hills on the Slovenian border, dates to 1901. A 1987 trip to California convinced Joško Gravner that technology was flattening wine; a 1996 hailstorm that destroyed most of his crop pushed him further toward older, simpler methods.",
      "From 1997 he returned to long skin-contact fermentation, and after travelling to Georgia in 2000 he began fermenting in qvevri — clay amphorae buried in the cellar — converting fully in the years that followed. He is widely regarded as the figure who revived amber, or \"orange,\" wine in modern Italy, though he prefers the term amber.",
      "The estate, farmed biodynamically, now plants only Ribolla Gialla and the red Pignolo. His daughter Mateja is closely involved in the work today.",
    ],
    references:[
      { label:'The Wizard of Oslavia', source:'Wine Spectator', url:'https://www.winespectator.com/articles/the-wizard-of-oslavia-winemaker-josko-gravner' },
      { label:'Interview with Joško Gravner', source:'Sprudge', url:'https://sprudge.com/josko-gravner-the-sprudge-wine-interview-173928.html' },
    ],
    wines:['gravner-ribolla'],
  },

  pantelleria: {
    id:'pantelleria', name:'Tua Rita', region:'sicilia', place:'Pantelleria · Suvereto (Toscana)',
    founded:1984,
    lede:'A Tuscan estate of cult reputation that, since 2016, also makes a Zibibbo passito on the volcanic island of Pantelleria.',
    history:[
      "Tua Rita was founded in 1984 by Rita Tua and her husband Virgilio Bisti at Località Notri, just south of Suvereto, in the Val di Cornia on the coastal side of Tuscany's Colline Metallifere. What began as a smallholding for a life close to the land became one of Italy's most collected estates.",
      "Its reputation rests on powerful, polished reds: the 100% Merlot Redigaffi — whose 2000 vintage was the first Italian wine to be awarded a perfect 100 points by Robert Parker — alongside the Bordeaux-blend Giusto di Notri and the Syrah Per Sempre. After Virgilio Bisti's death in 2010 the estate passed to his daughter Simena and her husband Stefano Frascolla, with the third generation, Giovanni Frascolla, now also involved.",
      "In 2016 the family acquired vineyards on Pantelleria, the volcanic island in the Strait of Sicily roughly midway between Sicily and Tunisia, to make a single sweet wine, Sese. It is a project away from their Tuscan base rather than the estate's core, and it is this island wine — not the Suvereto reds — that appears in this portfolio.",
      "Pantelleria itself has been a DOC since 1971, with the grapes grown in low \"alberello pantesco\" bush vines set in hollows against the relentless wind — a cultivation method inscribed by UNESCO in 2014. The name Sese refers to the dry-stone constructions found across the island's vineyards.",
    ],
    references:[
      { label:'Sese — producer page', source:'Tua Rita', url:'https://www.tuarita.it/vini/sese/?lang=en' },
      { label:'Tua Rita producer profile', source:'Decanter', url:'https://www.decanter.com/premium/tua-rita-producer-profile-395943/' },
    ],
    wines:['pantelleria-passito'],
  },
};

/* ------------------------------------------------------------------ */

const WINES = {
  'contratto-pasdose':{
    id:'contratto-pasdose', producer:'contratto',
    name:'Metodo Classico Special Cuvée Pas Dosé', vintage:'2009', format:'Magnum (1.5 L)',
    appellation:'Spumante Metodo Classico, Piemonte',
    grapes:'Pinot Nero with a small proportion of Chardonnay',
    bottle:{ silhouette:'sparkling', glass:'#243a23', wine:'#e7c878', label:'#f1ece0', accent:'#dd4a18' },
    tasting:"Fine, persistent mousse. Citrus and orchard fruit lead, with brioche, toasted almond and a touch of honey from extended lees ageing. Zero dosage leaves a dry, chalky, savoury finish; the magnum format favours slow, even development.",
    production:"Bottle-fermented in the traditional method and given long ageing on the lees, with hand riddling and no dosage (pas dosé). This 2009 predates the estate's high Alta Langa vineyards, developed from 2014, so the base wine was sourced; the house style of dry, long-aged, vintage sparkling is already in place.",
    vintageNote:"2009 was a warm Piedmont vintage, giving a riper, broader sparkling wine. The absence of dosage keeps it taut and dry despite the ripeness, and the magnum is well suited to keeping.",
  },
  'ceretto-gallina':{
    id:'ceretto-gallina', producer:'ceretto',
    name:'Barbaresco Gallina', vintage:'2018', format:'750 ml',
    appellation:'Barbaresco DOCG',
    grapes:'Nebbiolo',
    bottle:{ silhouette:'burgundy', glass:'#3b1e22', wine:'#7a2230', label:'#efe9dd', accent:'#dd4a18' },
    tasting:"Red cherry and wild strawberry with rose petal and sweet spice. Medium-bodied, with fine-grained tannin and a savoury, slightly earthy finish — perfumed rather than powerful.",
    production:"From Gallina, a cru in the commune of Neive on the eastern side of Barbaresco; Ceretto acquired a small plot here in 2015, making this an early release from the site. Organically and biodynamically farmed Nebbiolo, fermented and aged in large oak casks.",
    vintageNote:"2018 was a cooler, wetter and more variable Barbaresco vintage than the structured 2016. The wines tend to be fresher and more aromatic, accessible earlier; this favours Gallina's perfume.",
  },
  'fortemasso-castelletto':{
    id:'fortemasso-castelletto', producer:'fortemasso',
    name:'Barolo Castelletto', vintage:'2016', format:'750 ml',
    appellation:'Barolo DOCG',
    grapes:'Nebbiolo',
    bottle:{ silhouette:'burgundy', glass:'#3b1e22', wine:'#7e2533', label:'#efe9dd', accent:'#dd4a18' },
    tasting:"Rose, red cherry and raspberry over tar and liquorice. Firm but refined tannin, fresh acidity and a long, savoury finish — built for the cellar.",
    production:"Single-vineyard Nebbiolo from the Castelletto MGA in Monforte d'Alba, on sandy Diano sandstone soils. Maceration of around 25–30 days, then roughly 30 months in large Slavonian oak casks. The style is deliberately contemporary and restrained.",
    vintageNote:"2016 is widely regarded as a benchmark Barolo vintage: a long, even season gave wines with depth, fine tannin and freshness, and considerable ageing potential.",
  },
  'argentiera-superiore':{
    id:'argentiera-superiore', producer:'argentiera',
    name:'Argentiera Bolgheri Superiore', vintage:'2020', format:'750 ml',
    appellation:'Bolgheri DOC Superiore',
    grapes:'Cabernet Sauvignon, Merlot and Cabernet Franc',
    bottle:{ silhouette:'bordeaux', glass:'#2b1418', wine:'#5e1b25', label:'#1d1d1b', accent:'#dd4a18' },
    tasting:"Blackcurrant and dark plum with Mediterranean herb, graphite and a little sweet spice. Ripe but fine-grained tannin, with a coastal freshness on the finish.",
    production:"The estate's flagship, first made in 2003: a Bordeaux blend from the high, sea-facing vineyards of southern Bolgheri, handled gently and aged around 14–16 months in French oak (225 L) plus bottle ageing before release.",
    vintageNote:"2020 in Bolgheri was dry but without excessive heat — a balanced season. The wines are fragrant and relatively approachable, with the fresh acidity that the site's altitude and sea breezes tend to give.",
  },
  'monsanto-ilpoggio':{
    id:'monsanto-ilpoggio', producer:'monsanto',
    name:'Chianti Classico Gran Selezione Il Poggio', vintage:'2018', format:'750 ml',
    appellation:'Chianti Classico DOCG Gran Selezione',
    grapes:'Sangiovese with Canaiolo and Colorino',
    bottle:{ silhouette:'bordeaux', glass:'#2b1418', wine:'#641d27', label:'#efe9dd', accent:'#dd4a18' },
    tasting:"Sour cherry and redcurrant with dried herb, orange peel and tobacco. Bright acidity and savoury, slightly grippy tannin; classic in proportion and built to age.",
    production:"From the historic Il Poggio vineyard — the first single-vineyard Chianti Classico, first bottled in 1962. Predominantly Sangiovese with Canaiolo and Colorino, fermented in steel and aged in large Slavonian oak casks.",
    vintageNote:"2018 was a cooler, wetter and more classic Chianti Classico vintage. The wines are fresher and more perfumed, medium-weight rather than dense — a register that suits Il Poggio's traditional style.",
  },
  'bucci-riserva':{
    id:'bucci-riserva', producer:'bucci',
    name:'Villa Bucci Riserva', vintage:'2008', format:'750 ml',
    appellation:'Castelli di Jesi Verdicchio Classico Riserva DOCG',
    grapes:'Verdicchio',
    bottle:{ silhouette:'burgundy', glass:'#5f6a32', wine:'#d8c873', label:'#efe9dd', accent:'#dd4a18' },
    tasting:"Now mature: citrus and orchard fruit have given way to honey, almond, dried herb and a saline, stony finish. Full but taut, with the length and grip of a serious wine.",
    production:"100% Verdicchio from the oldest estate parcels, each vinified separately and aged for around two years in large, old (effectively neutral) Slavonian oak casks. The Riserva is made only in stronger vintages.",
    vintageNote:"At more than fifteen years old, the 2008 shows what this wine is built for: Verdicchio that ages like a structured white, trading primary fruit for savoury, developed complexity.",
  },
  'valentini-trebbiano':{
    id:'valentini-trebbiano', producer:'valentini',
    name:"Trebbiano d'Abruzzo", vintage:'2021', format:'750 ml',
    appellation:"Trebbiano d'Abruzzo DOC",
    grapes:'Trebbiano (Abruzzese)',
    bottle:{ silhouette:'burgundy', glass:'#6a6f3a', wine:'#e3d27d', label:'#f1ece0', accent:'#dd4a18' },
    tasting:"Young and tightly wound: lemon, white peach and almond over herbs and a marked saline minerality. Waxy texture, firm acidity and notable length. A wine that rewards keeping.",
    production:"From old vines, with only a small share of the harvest selected for bottling. Traditional vinification and long ageing in large old oak casks; the family bottles to no fixed schedule and says little about method, putting the emphasis on the vineyard.",
    vintageNote:"2021 was a fairly classic Abruzzo season. The wine is released young and is built to develop over many years, as Valentini's Trebbiano characteristically does.",
  },
  'gravner-ribolla':{
    id:'gravner-ribolla', producer:'gravner',
    name:'Ribolla Gialla', vintage:'2018', format:'750 ml',
    appellation:'Venezia Giulia IGT',
    grapes:'Ribolla Gialla',
    bottle:{ silhouette:'heavy', glass:'#caa15a', wine:'#b06a23', label:'#efe9dd', accent:'#dd4a18' },
    tasting:"An amber wine with the frame of a red: dried apricot, orange peel, black tea, nuts and beeswax. Gentle tannic grip, savoury and distinctly textural, long on the finish.",
    production:"100% Ribolla Gialla fermented on its skins with wild yeasts in buried Georgian amphorae for several months, then aged for years in large Slavonian oak and bottled unfiltered — roughly a seven-year cycle before release.",
    vintageNote:"Released only after long ageing, in the consistent house style. The method, more than the season, defines the wine; vintage differences read as nuance within an established frame.",
  },
  'pantelleria-passito':{
    id:'pantelleria-passito', producer:'pantelleria',
    name:'Sese', vintage:'2022', format:'500 ml',
    appellation:'Passito di Pantelleria DOC',
    grapes:'Zibibbo (Muscat of Alexandria)',
    bottle:{ silhouette:'dessert', glass:'#c98a2c', wine:'#8a4a12', label:'#f1ece0', accent:'#dd4a18' },
    tasting:"Deep golden to amber, with dried apricot, fig, raisin and candied orange, set against honey, almond and Mediterranean herb. Full-bodied and sweet but drawn long by vivid acidity, finishing gently bitter and saline rather than cloying.",
    production:"100% Zibibbo grown on Pantelleria. The bunches are dried in the island sun for roughly five to seven days to concentrate sugars, then vinified, with the wine finished in stainless steel for around eighteen months — a fresher, fruit-driven reading of the style.",
    vintageNote:"From vineyards Tua Rita acquired on Pantelleria in 2016. The hot, dry, wind-exposed island climate and volcanic soils give the concentration; 2022 is a young release, well suited to keeping.",
  },
};

if (typeof window !== 'undefined') {
  window.DATA = { PRODUCERS, WINES };
}
