var projects = [
  {
    title: 'The Trading Game',
    slug: 'the-trading-game',
    url: 'http://www.bloomberg.com/features/2015-stock-chart-trading-game/',
    date: 'October 2015',
    byline: 'managed by Joe Weisenthal and Thomas Houston',
    description: 'This little mobile-first chart game abuses the very chic aesthetic of the very serious Bloomberg Terminal to (1) waste time and (2) confront the vanity of expecting market-beating returns by assuming the future will look like the past. So the game has an unstated thesis, which it argues just by showing you your results, like what Ian Bogost calls “procedural rhetoric”: the ability of a game, or any system of interaction, to make a point.',
    trails: 1,
    colors: function () {
      return "#" + Math.random().toString(16).slice(2, 8);
    },
    radii: function() {
      return 3;
    },
    forces: [
      ['noise', null],
      ['mouse', null],
      ['torus', forceTorus()],
      ['stock', forceStock()]
    ]
  },

  {
    title: 'How ETFs Work',
    slug: 'how-etfs-work',
    url: 'http://www.bloomberg.com/features/2016-etf-files/toy/',
    date: 'March 2016',
    byline: 'research help from Eric Balchunas; managed by Thomas Houston and Joel Weber',
    description: 'What’s an exchange-traded fund (ETF), and how do people make money on it? For the big banks, the answer turns out to be, in a mathematically precise way: you get paid to balance a big see-saw of weights of various sizes, rolling up and down as prices move. That seems to make it easier to understand. A small child could do it. People go, “That’s it??”, and that feels like a triumph. People intuitively understand complex systems all around them all the time! You just need to code up a rigorous graphical-geometrical-mechanical metaphor.',
    colors: function() {
      var c = ['#fb8e24','#24FBBA','#FE45A7','#3954AE','#FADA84','#849FFA','#FBB19E','#be10fe','#C3FBD9','#B10C64'];
      return c[Math.floor(Math.random() * c.length)];
    },
    radii: function() { return Math.sqrt(d3.randomLogNormal(7,1.3)()); },
    forces: [
      ['noise', null],
      ['mouse', null],
      ['torus', forceTorus()],
      ['etf', forceETF()]
    ]
  },

  {
    title: 'What Is Code',
    slug: 'what-is-code',
    url: 'http://bloomberg.com/whatiscode',
    date: '',
    byline: 'with Paul Ford, Steph Davidson, Adam Pearce; managed and edited by Josh Tyrangiel, Joshua Topolsky, Jim Aley; so many others',
    description: '',
    trails: 1,
    colors: function() {
      var c = ['#2800d7','#6381ff','#c63eff','#fc99ff','#00c770','#91f29b','#f94600'];
      return c[Math.floor(Math.random() * c.length)];
    },
    forces: [
      ['noise', null],
      ['mouse', null],
      ['torus', forceTorus()],
      ['wic', forceWIC()]
    ]
  },

  {
    title: 'The Design Issue',
    slug: 'the-design-issue',
    byline: 'with Tracy Ma; managed by Thomas Houston',
    description: '...',
    colors: function() {
      var c = ['#00C0F2', '#EF69A6', '#007E49', '#A88F9D', '#706CB1', '#5FE1FF', '#DC8955', '#0071BB', '#AAC1CE', '#C04843', '#FFF100', '#F16322', '#F8CADE', '#BBD531', '#817E82', '#528F8B', '#7895A5', '#EC1C24'];
      return c[Math.floor(Math.random() * c.length)];
    },
    radii: function() {
      return 50 + Math.random() * 200;
    },
    forces: [
      ['torus', forceTorus()],
      ['mouse', null],
      ['noise', forceNoise().strength(.01).random(2).chaos(10).scale(300).offset(-1).mouse(true)]
    ]
  },

  {
    title: 'The Banality of Islamic State',
    slug: 'isis',
    byline: 'managed by Bryant Urstadt; story by Cam Simpson',
    trails: 1,
    colors: function() { return 'black'; },
    radii: function() { return 2; },
    forces: [
      ['torus', forceTorus()],
      ['isis', forceISIS()],
      ['noise', null],
      ['mouse', null]
    ]
  },

  {
    title: 'MTA spaghetti',
    slug: 'mta-spaghetti',
    url: 'http://bl.ocks.org/tophtucker/raw/81c467db46a37dfaf75cacb70552b818',
    date: 'June 2016',
    description: 'stuff',
    trails: 1,
    colors: function() {
      var c = ['#0039A6','#009B3A','#939598','#955214','#B634BB','#E00034','#FECB00','#FF6319'];
      return c[Math.floor(Math.random() * c.length)];
    },
    radii: function() {
      return 10;
    },
    forces: [
      ['noise', null],
      ['mouse', null],
      ['torus', forceTorus()],
      ['mta', forceMTA()]
    ]
  },

  {
    title: 'Romeo & Juliet',
    description: 'stuff'
  },

  {
    title: 'Flipcharts',
    byline: 'with Cindy Hoffman'
  },

  {
    title: 'Experiments in typography',
    slug: 'experiments-in-typography',
    url: 'http://www.tophtucker.com/type/',
    date: 'April 2015',
    byline: '',
    description: '“Plain text” is sometimes treated (especially by programmers!) like a solved problem. You have these letters, proportionally sized and spaced and kerned, and one comes after the next, and they wrap onto lines in some grid. If you want to get fancy maybe you have ligatures. Watching the designers at Businessweek – who can, like, do valley girl intonation in type — disabused me of that worldview. Lots of people are trying great things and of course it’s hard to compete with convention on a meaningful scale here, but I’ll try — nothing fancy with the fonts here per se, just some more dynamic setting.'
  },

  {
    title: 'The Bowdoin Orient',
    slug: 'the-bowdoin-orient',
    url: 'http://bowdoinorient.com',
    description: 'Wrote “full-stack” PHP/Javascript CMS for college paper. Full-stack including writing and some copy editing. '
  },

  {
    title: 'Other'
  }
];