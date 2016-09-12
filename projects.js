var projects = [
  {
    title: 'The Trading Game',
    slug: 'the-trading-game',
    url: 'http://www.bloomberg.com/features/2015-stock-chart-trading-game/',
    date: 'October 2015',
    byline: 'managed by Joe Weisenthal and Thomas Houston',
    description: 'Abusing the chic aesthetic of the Terminal to (1) waste time and (2) confront the vanity of expecting market-beating returns by assuming the future will look like the past. My attempt at Bogostian procedural rhetoric. It was pretty popular, and interesting to see how people played; we published a <a href="http://www.bloomberg.com/features/2015-stock-chart-trading-game/analysis/">follow-up analysis</a> of how 13,000 people turned 108 real hours of their lives into 6.7 trillion imaginary dollars. See also <a href="http://www.bloomberg.com/graphics/2015-how-to-rig-libor-interactive/">How To Rig Libor</a> and <a href="http://www.businessweek.com/graphics/2014_bwg_bitcoin/index.html">How to Mine Bitcoin</a>.',
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
    description: 'What’s an exchange-traded fund, and how do people make money on it? For the big banks, the answer turns out to be: you get paid to balance a big see-saw of weights of various sizes, wobbling as prices move. That seems to make it easier to understand. People go, “That’s it??”, and that feels like a triumph. People intuitively understand complex systems all around them all the time! See also spiritual predecessor <a href="http://www.bloomberg.com/graphics/2015-how-to-rig-libor-interactive/">How To Rig Libor</a>.',
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
    date: 'June 2015',
    byline: 'with Paul Ford, Steph Davidson, Adam Pearce; managed and edited by Josh Tyrangiel, Joshua Topolsky, Jim Aley; so many others',
    description: 'We wanted <i>What Is Code</i> on the Web to deconstruct itself, revealing the explanation of code to be code itself, that can do everything code can do. The story recapitulates the process of its own creation, and the site had to be both alive and transparent enough to embody everything it described. We wanted the story to be part API, part IDE, part absurd and compelling fun. It did really well.',
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
    date: 'April 2016',
    url: 'http://www.bloomberg.com/features/2016-design/',
    description: 'Here there are few straight lines; text moves along dynamic paths around photos and text, warped by attraction to the passing mouse; articles are laid out bespoke, on no template, so a quick scroll down the homepage reveals the diversity within, no two things in the same place in the same way. Designers are represented by intersections of blobby venn diagrams of human vices they purport to allay. Navigation is obtusely logical. There are various treats within, elaborate text wraps, pullquotes flying into the screen to jam into re-ragging body text, a functioning zoetrope showing frames of our art department assembling a chair that spins up to effectively be a reimplemented gif player.',
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
      ['noise', forceNoise().strength(.001).random(0).chaos(10).scale(300).offset(-1).mouse(true)]
    ]
  },

  {
    title: 'The Banality of Islamic State',
    slug: 'banality-of-isis',
    byline: 'managed by Bryant Urstadt; story by Cam Simpson',
    dateline: 'November 2014',
    url: 'http://www.bloomberg.com/graphics/2014-the-business-of-isis-spreadsheets-annual-reports-and-terror/',
    description: 'Kinda distantly trying to be inspired by folks like <a href="http://www.holovaty.com/writing/fundamental-change/">Adrian Holovaty</a>, <a href="http://www.xanadu.net/">Ted Nelson</a>, and <a href="http://www.theatlantic.com/magazine/archive/1945/07/as-we-may-think/303881/">Vannevar Bush</a>. The article is an app that reads the article as the reader does; the article is laced with structured microdata (time, place, quote attribution, reference citations, etc.), which as you scroll down the page is read into the sidebar as a structured record of what you’ve read. The multidimensional concordance acts as memory aid, index, table of contents, and a jumping-off point for further reading and rereading.',
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
    description: 'I was walking with my friend and she looked at the subway map and said she had always wanted to twirl it like spaghetti. I thought of that again years later. I actually think a node-and-edge graph representation makes a ton of sense and there are lots more pragmatic applications but I should just try to do that before I say more. Hello visitor to my Web site, are these descriptions just totally superfluous? Yes.',
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
    slug: 'romeo-juliet',
    date: 'February 14, 2015',
    url: 'http://bl.ocks.org/tophtucker/214ee520bfdfe8baabe5',
    description: 'A visualization of Steven Strogatz’s modeling of Romeo and Juliet with ordinary differential equations. It’s more meant to be illuminating about differential equations than about love, but it’s an excuse to think about both. Each person has two personality parameters determining whether they respond positively or negatively to their own feelings for someone else, and whether they respond positively or negatively to another person’s feelings for them. Their initial conditions then doom them to follow some trajectory in that phase space.',
    trails: 1,
    colors: function() {
      return Math.random() > .5 ? 'pink' : 'lightblue';
    },
    radii: function() {
      return 10;
    },
    forces: [
      ['noise', null],
      ['mouse', null],
      ['romeo', forceRomeo()],
      ['torus', forceTorus()]
    ]
  },

  // {
  //   title: 'Flipcharts',
  //   byline: 'with Cindy Hoffman',
  //   slug: 'flipcharts',
  //   url: 'http://www.bloomberg.com/features/2016-flipcharts/superbowl/',
  //   description: 'Mobile-centric; needs a modern accelerometer-equipped smartphone (ideally iPhone!) to be properly experienced. Tilt the phone back and forth to explore the flipchart, a single axis of interaction; swipe to move between cards. Each graphic card represents a single kernel of a larger idea — a single contrast, a single trend, a single phenomenon. To fit not only the screen but also the lifestyle of a smartphone, it tries to re-conceive dataviz for mobile by abandoning all traditional techniques, both adding flourishes and peeling away complexity, driving toward the most essential point.'
  // },

  // {
  //   title: 'Experiments in typography',
  //   slug: 'experiments-in-typography',
  //   url: 'http://www.tophtucker.com/type/',
  //   date: 'April 2015',
  //   byline: '',
  //   description: '“Plain text” is sometimes treated (especially by programmers!) like a solved problem. You have these letters, proportionally sized and spaced and kerned, and one comes after the next, and they wrap onto lines in some grid. If you want to get fancy maybe you have ligatures. Watching the designers at Businessweek – who can, like, do valley girl intonation in type — disabused me of that worldview. Lots of people are trying great things and of course it’s hard to compete with convention on a meaningful scale here, but I’ll try — nothing fancy with the fonts here per se, just some more dynamic setting.'
  // },

  {
    title: 'The Bowdoin Orient',
    slug: 'the-bowdoin-orient',
    url: 'http://bowdoinorient.com',
    description: 'I wrote a “full-stack” PHP/Javascript/English CMS for college paper, where the stack here includes some reporting and essays and copy editing. E.g. <a href="http://bowdoinorient.com/article/4323">this report</a> on the 2008 economic collapse’s impact on the businesses of Brunswick Maine. I also later wrote about being <a href="http://bowdoinorient.com/article/9173">one year out</a> from college, and then <a href="http://bowdoinorient.com/article/10278">two years out</a>. I did not write about being three years out.',
    colors: function () {
      return "#" + Math.random().toString(16).slice(2, 8);
    },
    radii: function() {
      return 10;
    },
    forces: [
      ['noise', forceNoise().strength(.01).random(2).chaos(10).scale(300).offset(-1).mouse(true)],
      ['mouse', null],
      ['explode', forceSometimesExplode()],
      ['torus', forceTorus()],
      ['attraction', d3.forceManyBody().strength(2.5)]
    ]
  },

  {
    title: 'Other',
    slug: 'other',
    description: 'I put lots of little experiments and things on my <a href="http://bl.ocks.org/tophtucker">bl.ocks page</a>. Here I pulled out <a href="http://tophtucker.com/type">a few of them</a> about dynamic typesetting and painting experiments that largely came out of studying one little library, George Michael Brower’s FizzyText. I worked on some other features design at Businessweek, including on <a href="http://www.bloomberg.com/graphics/2015-ketamine-depression-treatment/">ketamine</a>. I worked on obtusely-unconventional mobile-first graphics which Cindy Hoffman conceived of and calls flipcharts, like <a href="http://www.bloomberg.com/features/2016-flipcharts/superbowl/">these</a> and <a href="http://www.bloomberg.com/features/2016-flipcharts/demo/">these</a>. I once made a site <a href="http://howlongwillittakemyicecreamtomelt.com">howlongwillittakemyicecreamtomelt.com</a>. I don’t know, I’ve done other things. Sometimes I try writing but most of it is so bad. Hmm. That’s it, the end.',
    trails: 1,
    colors: function() {
      // var c = ['#0ff', '#f0f', '#ff0', '#00f', '#0f0', '#f00', '#000']
      var c = ['#fff', '#000'];
      return c[Math.floor(Math.random() * c.length)];
    },
    radii: function() {
      return Math.random() * 50;
    },
    forces: [
      ['noise', forceNoise().strength(.01).random(2).chaos(10).scale(300).offset(-1).mouse(true)],
      ['mouse', forceMouseVortex()],
      ['mouse', null],
      ['torus', forceTorus()],
      ['other', forceRespawn()]
    ]
  }
];

// projects = projects.slice(0,3);

d3.shuffle(projects);
projects.sort(function(a,b) {
  if(a.title == 'Other') return 1;
  if(b.title == 'Other') return -1;
  return 1;
})
