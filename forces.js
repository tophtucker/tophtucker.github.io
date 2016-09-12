function forceAttractToMouse() {

  var nodes;

  function force(alpha) {
    if(innerWidth < 500) return;
    for (var i = 0, n = nodes.length, node, k = alpha; i < n; ++i) {
      node = nodes[i];
      var dist = distance(mouse, [node.x,node.y]);
      node.vx += (mouse[0] - node.x) * 1 / dist;
      node.vy += (mouse[1] - node.y) * 1 / dist;
    }
  }

  force.initialize = function(_) {
    nodes = _;
  }

  return force;

}

function forceNoise() {

  var nodes,
      strength = 1,
      random = 0,
      scale = 300,
      chaos = 10,
      offset = 0,
      mouseEffect = true,
      noise = noiser(4,.8);

  function force(alpha) {
    if(innerWidth < 500) return;
    for (var i = 0, n = nodes.length, node, k = alpha; i < n; ++i) {
      node = nodes[i];

      var dist = distance(mouse, [node.x,node.y]);
      var angle = (noise(node.x / scale, node.y / scale) + offset) * chaos;

      var driftX =  Math.cos(angle);
      var driftY = -Math.sin(angle);

      if(mouseEffect) {
        driftX *= .00001 * Math.pow(dist,2);
        driftY *= .00001 * Math.pow(dist,2);
      }

      node.vx += driftX * strength + (Math.random() * random - random/2);
      node.vy += driftY * strength + (Math.random() * random - random/2);

    }
  }

  force.initialize = function(_) {
    nodes = _;
  }

  force.strength = function(_) {
    strength = _;
    return force;
  }

  force.chaos = function(_) {
    chaos = _;
    return force;
  }

  force.scale = function(_) {
    scale = _;
    return force;
  }

  force.offset = function(_) {
    offset = _;
    return force;
  }

  force.mouse = function(_) {
    mouseEffect = _;
    return force;
  }

  force.random = function(_) {
    random = _;
    return force;
  }

  return force;

}

function forceMotion() {

  var nodes,
      rotation,
      acceleration;

  window.addEventListener('devicemotion', handleMotion);
  window.addEventListener('deviceorientation', handleOrientation);

  var gammaScale = d3.scaleLinear()
    .domain([-Math.PI/2, Math.PI/2])
    .range([0,innerWidth])
    .clamp(true);

  var betaScale = d3.scaleLinear()
    .domain([-Math.PI/2, Math.PI/2])
    .range([0,innerHeight])
    .clamp(true);

  function force(alpha) {
    if(acceleration === undefined || rotation === undefined) return;

    for (var i = 0, n = nodes.length, node, k = alpha; i < n; ++i) {
      node = nodes[i];

      var dist = distance([node.x,node.y], [gammaScale(rotation.gamma), betaScale(rotation.beta)]);

      node.vx += acceleration.x * 1000 / dist;
      node.vy -= acceleration.y * 1000 / dist;
    }
  }

  force.initialize = function(_) {
    nodes = _;
  }

  function handleOrientation(e) {
    if(e.gamma === null || e.beta === null || e.alpha === null) return;
    rotation = {
      gamma: e.gamma || 0,
      beta: e.beta || 0,
      alpha: e.alpha || 0
    }
  }

  function handleMotion(e) {
    if(e.acceleration.x === null || e.acceleration.y === null || e.acceleration.z === null) return;
    acceleration = {
      x: e.acceleration.x,
      y: e.acceleration.y,
      z: e.acceleration.z
    };
  }

  return force;

}

function forceTorus() {
  var nodes,
      buffer = 50;
  function force(alpha) {
    if(isHovering) return;
    for (var i = 0, n = nodes.length, node, k = alpha; i < n; ++i) {
      node = nodes[i];
      if(node.x > innerWidth + buffer) node.x = -buffer;
      if(node.x < -buffer) node.x = innerWidth + buffer;
      if(node.y > innerHeight + buffer) node.y = -buffer;
      if(node.y < -buffer) node.y = innerHeight + buffer;
    }
  }
  force.initialize = function(_) {
    nodes = _;
  }
  force.buffer = function(_) {
    buffer = _;
    return force;
  }
  return force;
}

function forceMortality() {
  var nodes;
  function force(alpha) {
    for (var i = 0, n = nodes.length, node, k = alpha; i < n; ++i) {
      node = nodes[i];
      node.r *= node.dr;
      if(node.r < 0.01) {
        node.r = 100;
        node.x = Math.random() * innerWidth;
        node.y = Math.random() * innerHeight;
      }
    }
  }
  force.initialize = function(_) {
    nodes = _;
    nodes.forEach(function(d) {
      d.dr = 1-Math.random()*.01;
    });
  }
  return force;
}

function forceGrow() {
  var nodes;
  function force(alpha) {
    for (var i = 0, n = nodes.length, node, k = alpha; i < n; ++i) {
      node = nodes[i];
      node.r *= node.dr;
      if(node.r < node.r1) {
        node.r += (node.r1 - node.r)/500;
      }
    }
  }
  force.initialize = function(_) {
    nodes = _;
    nodes.forEach(function(d) {
      d.dr = 1-Math.random()*.01;
    });
  }
  return force;
}

function forceMTA() {
  var nodes;
  function force(alpha) {
    for (var i = 0, n = nodes.length, node, k = alpha; i < n; ++i) {
      node = nodes[i];
      var theta = Math.atan2(node.vy, node.vx);
      if(Math.random() > .99) {
        node.targetTheta += (Math.random() > .5 ? 1 : -1) * Math.floor(Math.random()*3)/2 * Math.PI;
      }
      theta = (theta + node.targetTheta) / 2;
      var target = [
        node.targetSpeed * Math.cos(theta),
        node.targetSpeed * Math.sin(theta),
      ];
      node.vx += (target[0] - node.vx) / 10;
      node.vy += (target[1] - node.vy) / 10;
    }
  }
  force.initialize = function(_) {
    nodes = _;
    nodes.forEach(function(node) {
      node.targetTheta = Math.floor(Math.random()*8)/4 * Math.PI;
      node.targetSpeed = 1;
    })
  }
  return force;
}

function forceWIC() {
  var nodes;
  function force(alpha) {
    for (var i = 0, n = nodes.length, node, k = alpha; i < n; ++i) {
      node = nodes[i];
      node.r += 1;
      if(node.r > innerWidth / 10 || Math.random() > .97) {
        node.x = Math.round(Math.random() * 5) * innerWidth / 5;
        node.y = Math.round(Math.random() * 5) * innerWidth / 5;
        node.r = 0;
      }
    }
  }
  force.initialize = function(_) {
    nodes = _;
  }
  return force;
}

function forceETF() {
  var nodes,
      extent,
      x,
      slope,
      premium = 1,
      dpremium = 0;
  function force(alpha) {

    // Random walk with tiny positive bias (fund growth) & slight drift toward 1:1
    // premium += premium * dpremium;
    // dpremium += d3.randomNormal(0, .015)() // random walk
    //   - (.2 * dpremium) // decelerate
    //   - (.0005 * (premium - 1)); // tend toward 1; should be nonlinear?

    for (var i = 0, n = nodes.length, node, k = alpha; i < n; ++i) {
      node = nodes[i];
      node.price += node.price * node.dp;
      node.dp += (-1 * d3.randomLogNormal()() + 1.7) / 2000 - (.1 * node.dp);
      node.vx -= (node.x - x(node.price)) / 1000;
      node.vy -= (node.y - (innerHeight/2)) / 1000;
    }
  }
  force.initialize = function(_) {
    nodes = _;
    var priceDistribution = d3.randomNormal(4,.8);
    nodes.forEach(function(node) {
      node.price = priceDistribution();
      node.dp = 0;
    });
    extent = d3.extent(nodes, function(d) { return d.price; });
    x = d3.scaleLinear().domain(extent).range([0,innerWidth]);
  }
  return force;
}

function forceStock() {
  var nodes;
  function force(alpha) {
    for (var i = 0, n = nodes.length, node, k = alpha; i < n; ++i) {
      node = nodes[i];

      var dp = (d3.randomLogNormal(.5,1)() * -1 + 3) / 200;
      node.vy = -dp * (innerHeight - node.y);
      node.vx += (2 - node.vx) / 100;
    }
  }
  force.initialize = function(_) {
    nodes = _;
  }
  return force;
}

function forceISIS() {
  var nodes;
  function force(alpha) {
    for (var i = 0, n = nodes.length, node, k = alpha; i < n; ++i) {
      node = nodes[i];
      node.vx += (1 * Math.cos(node.direction) - node.vx) / 10;
      node.vy += (1 * Math.sin(node.direction) - node.vy) / 10;
    }
  }
  force.initialize = function(_) {
    nodes = _;
    nodes.forEach(function(d) {
      d.direction = Math.floor(Math.random()*4)/2 * Math.PI;
    })
  }
  return force;
}

function forceSometimesExplode(_) {
  var nodes,
      strength = _ || 25;
  function force(alpha) {
    if(Math.random() < .998) return;
    for (var i = 0, n = nodes.length, node, k = alpha; i < n; ++i) {
      node = nodes[i];
      node.vx += Math.random() * strength - strength/2;
      node.vy += Math.random() * strength - strength/2;
    }
  }
  force.initialize = function(_) {
    nodes = _;
  }
  return force;
}

function forceRomeo() {
  var nodes,
      a = (Math.random()*2-1),
      b = (Math.random()*2-1),
      c = (Math.random()*2-1),
      d = (Math.random()*2-1);
  function force(alpha) {
    for (var i = 0, n = nodes.length, node, k = alpha; i < n; ++i) {
      node = nodes[i];

      if(Math.random() > .99) {
        node.x = Math.random() * innerWidth;
        node.y = Math.random() * innerHeight;
      }
      
      var x = (node.x - innerWidth/2) / innerWidth;
      var y = -(node.y - innerHeight/2) / innerHeight;

      var newX = a * x + b * y;
      var newY = c * x + d * y;

      node.vx = newX * 10;
      node.vy = -newY * 10;

    }
  }
  force.initialize = function(_) {
    nodes = _;
  }
  return force;
}

function forceWander() {

  var nodes;

  function force(alpha) {
    for (var i = 0, n = nodes.length, node, k = alpha; i < n; ++i) {
      node = nodes[i];
      node.vx += 0.2 * (Math.random() - .5) - 0.01 * node.vx;
      node.vy += 0.2 * (Math.random() - .5) - 0.01 * node.vy;
    }
  }

  force.initialize = function(_) {
    nodes = _;
  }

  return force;

}

function forceMouseVortex() {

  var nodes;

  function force(alpha) {
    if(innerWidth < 500) return;
    if(!isHovering) return;
    for (var i = 0, n = nodes.length, node, k = alpha; i < n; ++i) {
      node = nodes[i];
      var dist = distance(mouse, [node.x,node.y]);
      node.vx -= node.attraction * .1 * (node.x - mouse[0]) / Math.sqrt(dist);
      node.vy -= node.attraction * .1 * (node.y - mouse[1]) / Math.sqrt(dist);
    }
  }

  force.initialize = function(_) {
    nodes = _;
    nodes.forEach(function(node) {
      node.attraction = .5 + Math.random()*.5;
    })
  }

  return force;

}

function forceVortex(_, __) {

  var active = true,
      clockwise = 1,

      nodes,
      fork,
      forkAngle = 0,

      strength  = _   || .01,
      radius    = __  || 100;

  function force(alpha) {

    if(!active) return;

    forkAngle += clockwise * strength;

    for (var i = 0, n = nodes.length, node, k = alpha; i < n; ++i) {
      node = nodes[i];
      node.forking = distance([node.x, node.y], mouse) < radius;
      if(node.forking) {
        node.vx += clockwise * strength * -(node.y - mouse[1]);
        node.vy += clockwise * strength * (node.x - mouse[0]);
      }
    }
  }

  force.initialize = function(_) {
    nodes = _;
  }

  return force;

}

function forceRespawn() {
  var nodes;
  function force(alpha) {
    for (var i = 0, n = nodes.length, node, k = alpha; i < n; ++i) {
      node = nodes[i];
      if(Math.random() > .95) {
        node.x = Math.random() * innerWidth;
        node.y = Math.random() * innerHeight;
        node.r = Math.random() * 50;
      }
    }
  }
  force.initialize = function(_) {
    nodes = _;
  }
  return force;
}

function distance(a,b) {
  var dx = b[0] - a[0];
  var dy = b[1] - a[1];
  return Math.sqrt(Math.pow(dx, 2) + Math.pow(dy, 2));
}

function rotateVector(v, theta) {
  return [
    v[0] * Math.cos(theta) - v[1] * Math.sin(theta),
    v[0] * Math.sin(theta) + v[1] * Math.cos(theta)
  ];
}