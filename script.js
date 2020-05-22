var docWidth = innerWidth,
    docHeight = innerHeight;

var particles,
    trailAlpha = 0,
    isHovering = false,
    hoverSel,
    project;

var isMobile = innerWidth <= 500;

var mouse = [-100,-100];
d3.select('html').on('mousemove', function() {
  // mouse = [d3.mouse(this)[0], d3.mouse(this)[1] - document.body.scrollTop];
  mouse = d3.mouse(this);
})

var letterSim = d3.forceSimulation()
  .alphaDecay(0)
  // .velocityDecay(0)
  .force("x", d3.forceX(function(d) { return d.x1; }).strength(.05))
  .force("y", d3.forceY(function(d) { return d.y1; }).strength(.05))
  .force("noise", forceNoise());


if(!isMobile) {
  var particleSim = d3.forceSimulation()
    .alphaDecay(0)
    .velocityDecay(0.02);
  renderParticles();
} else {
  // if mobile, attach devicemotion
  // N.B. you can't check if it's already granted;
  // eagerly awaiting https://developer.mozilla.org/en-US/docs/Web/API/Permissions/query on iOS Safari!
  d3.select("body").append("button")
    .attr("class", "permission")
    .text("Shake on")
    .on("click", async function () {
      if (await DeviceMotionEvent.requestPermission() === "granted") {
        letterSim.force("motion", forceMotion())
        this.remove()
      }
    })
}

handleNav();
window.addEventListener("hashchange", handleNav, false);

function split(container) {
  if(!container.childNodes.length) {
    var letters = container.textContent.split('');
    return letters.map(function(d) { return '<span class="ltr">' + d + '</span>'; }).join('');
  } else {
    var html = '';
    for(var i = 0; i < container.childNodes.length; i++) {
      html += split(container.childNodes[i]);
    }
    container.innerHTML = html;
    return container.outerHTML;
  }
}

function computePositions(container) {

  // compute positions and styles of letters as rendered
  d3.select(container).selectAll('span.ltr')
    .datum(function(d,i) {
      var styles = window.getComputedStyle(this);
      return {
        letter: this.textContent,
        index: i,
        char: this.textContent.charCodeAt(0),
        x1: this.offsetLeft,
        y1: this.offsetTop,
        fontSize: styles['font-size'],
        fontWeight: styles['font-weight'],
        fontStyle: styles['font-style'],
        color: styles['color']
      }
    });

  // attach links to children spans 
  // (since they'll be disassociated from the dom tree)
  d3.select(container).selectAll('a').each(function() {
    var href = this.attributes.href.value;
    d3.select(this).selectAll('span.ltr')
      .each(function(d) {
        d.href = href;
      })
  });

  var data = d3.select(container).selectAll('span.ltr').data();

  // for every letter, find it's the nth letter of its kind
  var nester = d3.nest().key(function(d) { return d.char; });
  var data = d3.merge(nester.entries(data).map(function(d) { 
    return d.values.map(function(dd, ii) { 
      dd.charI = ii;
      dd.key = d.key + '-' + ii;
      return dd;
    }); 
  })).sort(function(a,b) {
    return a.index - b.index;
  });

  return data;
}

function render(data) {

  var letters = d3.select('.overlay')
    .selectAll('span')
    .data(data, function(d) { return d.key; })
    .each(function(d) {
      if(!d.x) d.x = parseFloat(d3.select(this).style('left'));
      if(!d.y) d.y = parseFloat(d3.select(this).style('top'));
    });

  letters.exit()
    .each(function(d) {
      var r = Math.sqrt(Math.pow(innerWidth,2) + Math.pow(innerHeight,2)) / 2;
      var theta = Math.random() * 2 * Math.PI;
      d.x1 = (innerWidth/2 + r * Math.cos(theta));
      d.y1 = (innerHeight/2 + r * Math.sin(theta));
    })
    .transition()
    .duration(1000)
    .style('left', function(d) { return d.x1 + 'px'; })
    .style('top', function(d) { return d.y1 + 'px'; })
    .remove();

  letters = letters.enter().append('span')
    .text(function(d) { return d.letter; })
    .text(function(d) { return d.letter; })
    .each(function(d) {
      var r = Math.sqrt(Math.pow(innerWidth,2) + Math.pow(innerHeight,2)) / 2;
      var theta = Math.random() * 2 * Math.PI;
      d.x = (innerWidth/2 + r * Math.cos(theta));
      d.y = (innerHeight/2 + r * Math.sin(theta));
    })
    .style('left', function(d) { return d.x0 + 'px'; })
    .style('top', function(d) { return d.y0 + 'px'; })
  .merge(letters);

  letters.filter(function(d) { return !d.href; })
    .attr('data-href', null)
    .style('cursor', null)
    .style('animation', null)
    .on('mouseenter', null)
    .on('mouseleave', null)
    .on('click', null);

  letters.filter(function(d) { return d.href; })
    .attr('data-href', function(d) { return d.href; })
    .style('cursor', 'pointer')
    .on('mouseenter', function(d) { 
      hoverSel = d3.selectAll('[data-href="'+d.href+'"')
      isHovering = true 
    })
    .on('mouseleave', function(d) { 
      hoverSel.style("text-shadow", null)
      hoverSel = undefined
      isHovering = false;
    })
    .on('click', function(d) {
      hoverSel.style("text-shadow", null)
      hoverSel = undefined
      isHovering = false;
      window.location = d.href;
      scatterParticles();
    });

  letters.transition()
    .duration(1000)
    .style('font-size', function(d) { return d.fontSize; })
    .style('font-weight', function(d) { return d.fontWeight; })
    .style('font-style', function(d) { return d.fontStyle; })
    .style('color', function(d) { return d.color; })

  letterSim
    .nodes(letters.data())
    .on('tick', function() {
      letters
        .style('left', function(d) { return d.x + 'px'; })
        .style('top', function(d) { return d.y + 'px'; });
    });

}

function renderHome(container) {

  if(!isMobile) {

    // unload any project-specific forces
    if(project !== undefined && project.forces !== undefined) {
      project.forces.forEach(function(force) {
        particleSim.force(force[0], null);
      });
    }

    d3.select('svg').selectAll('circle')
      .transition()
      .duration(2000)
      .tween("attr.colors", function(d,i) {
        var node = this, 
            i = d3.interpolateRgb(d.color, randomColor());
        return function(t) {
          d.color = i(t);
        };
      })
      .tween("attr.radii", function(d,i) {
        var node = this, 
            i = d3.interpolateNumber(d.r, Math.random() * 10);
        return function(t) {
          d.r = i(t);
        };
      })
      .tween("attr.trails", function() {
        var i = d3.interpolateNumber(trailAlpha, 0);
        return function(t) {
          trailAlpha = i(t);
        };
      });

    particleSim
      .force("noise", forceNoise().strength(.01).random(2).chaos(10).scale(300).offset(-1).mouse(true))
      .force("torus", forceTorus())
      .force("mouse", forceMouseVortex());

  }

  container.html(document.querySelector('#home').innerHTML);
  container.selectAll('h2.project')
    .data(projects)
    .enter()
    .append('h2')
    .classed('project', true)
    .append('a')
    .attr('href', function(d) { return '#' + d.slug; })
    .text(function(d) { return d.title; });
}

function renderProject(container, slug) {
  project = projects.filter(function(d) { return d.slug === slug; })[0];

  if(!isMobile) {

    if(project.forces !== undefined) {
      project.forces.forEach(function(force) {
        particleSim.force(force[0], force[1]);
      });
    }

    var transition = d3.select('svg').selectAll('circle')
      .transition()
      .duration(2000);
    if(project.colors) {
      transition
        .tween("attr.colors", function(d,i) {
          var node = this, 
              i = d3.interpolateRgb(d.color, project.colors(d,i));
          return function(t) {
            d.color = i(t);
          };
        });
    }
    if(project.radii) {
      transition
        .tween("attr.radii", function(d,i) {
          var node = this, 
              i = d3.interpolateNumber(d.r, project.radii(d,i));
          return function(t) {
            d.r = i(t);
          };
        });
    }
    if(project.trails) {
      transition
        .tween("attr.trails", function() {
          var i = d3.interpolateNumber(trailAlpha, project.trails);
          return function(t) {
            trailAlpha = i(t);
          };
        });
    }

  }

  container.html('');
  container.append('h1')
    .append('a')
    .attr('href', '#')
    .text('Toph Tucker');

  container.append('h2').text(project.title);
  container.append('p').html(project.date);
  container.append('p').html(project.byline);
  container.append('a').attr('href', project.url).text(project.url);
  container.append('p').html(project.description);
}

function handleNav() {
  if(window.location.hash === '' || window.location.hash === '#') {
    renderHome(d3.select('.underlying'));
  } else {
    renderProject(d3.select('.underlying'), window.location.hash.split('#')[1]);
  }

  d3.select('.underlying')
    .each(function() {
      split(this);
      render(computePositions(this));
    });
}

////////////////////////////////
///// BACKGROUND PARTICLES /////
////////////////////////////////

function renderParticles() {

  var ctx = d3.select('canvas')
    .attr('width', docWidth)
    .attr('height', docHeight)
    .node().getContext("2d");

  particles = d3.range(20).map(function(d) {
    return {
      x: Math.random() * innerWidth,
      y: Math.random() * innerHeight,
      vx: Math.random() * 10 - 5,
      vy: Math.random() * 10 - 5,
      r: Math.random() * 10,
      // r1: ,
      color: randomColor()
    }
  });

  var particle = d3.select('svg').selectAll('circle')
    .data(particles)
    .enter()
    .append('circle')
    .style('fill', function(d) { return d.color; })
    .attr('r', function(d) { return d.r; });

  particleSim
    .nodes(particles)
    .on('tick', function() {

      ctx.fillStyle = '#fff';
      ctx.globalAlpha = 1 - trailAlpha;
      ctx.fillRect(0,0,innerWidth,innerHeight);
      ctx.globalAlpha = 1;

      particle
        .attr('cx', function(d) { return d.x; })
        .attr('cy', function(d) { return d.y; })
        .style('fill', function(d) { return d.color; })
        .attr('r', function(d) { return d.r; })
        .style('opacity', .2)
        .each(function(d) {
          ctx.fillStyle = d.color;
          ctx.beginPath();
          ctx.arc(d.x, d.y, d.r, 0, 2*Math.PI);
          ctx.fill();
        });

      if(hoverSel) {
        hoverSel.style("text-shadow", function(d, i) {
          const p = particles[i % particles.length]
          const angle = Math.atan2(p.y - d.y, p.x - d.x) + Math.PI
          const dist = Math.sqrt((p.y - d.y) ** 2 + (p.x - d.x) ** 2)
          const offsetX = dist * Math.cos(angle) / 10
          const offsetY = dist * Math.sin(angle) / 10
          return `${offsetX}px ${offsetY}px ${dist / 10}px ${p.color}`
        })
      }

      
    });
}

function scatterParticles() {
  if(!particles) return false;
  particles.forEach(function(node) {
    var dist = distance(mouse, [node.x,node.y]);
    node.vx += 20 * (node.x - mouse[0]) / dist;
    node.vy += 20 * (node.y - mouse[1]) / dist;
  })
}

function randomColor() {
  return `hsl(${Math.random() * 360}, 50%, 50%)`
}

console.log("All this flowy-text stuff is heavily inspired by Tracy Ma and Alex Shoukas’s work on the 2016 Businessweek Design Issue and George Michael Brower’s FizzyText.")
