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
      noiseScale = 300,
      noiseStrength = 10,
      noise = noiser(4,.8);

  function force(alpha) {
    if(innerWidth < 500) return;
    for (var i = 0, n = nodes.length, node, k = alpha; i < n; ++i) {
      node = nodes[i];

      var dist = distance(mouse, [node.x,node.y]);
      var angle = noise(node.x / noiseScale, node.y / noiseScale) * noiseStrength;
      var driftX =  Math.cos(angle) * .00001 * Math.pow(dist,2);
      var driftY = -Math.sin(angle) * .00001 * Math.pow(dist,2);

      node.vx += driftX * strength + Math.random() * random;
      node.vy += driftY * strength + Math.random() * random;

    }
  }

  force.initialize = function(_) {
    nodes = _;
  }

  force.strength = function(_) {
    strength = _;
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
  var nodes;
  function force(alpha) {
    for (var i = 0, n = nodes.length, node, k = alpha; i < n; ++i) {
      node = nodes[i];
      if(node.x > innerWidth) node.x = 0;
      if(node.x < 0) node.x = innerWidth;
      if(node.y > innerHeight) node.y = 0;
      if(node.y < 0) node.y = innerHeight;
    }
  }
  force.initialize = function(_) {
    nodes = _;
  }
  return force;
}

function forceMortality() {
  var nodes;
  function force(alpha) {
    for (var i = 0, n = nodes.length, node, k = alpha; i < n; ++i) {
      node = nodes[i];
      // node.r *= .99;
      if(Math.random() > 0.99) {
        node.x = Math.random() * innerWidth;
        node.y = Math.random() * innerHeight;
      }
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
    if(innerWidth < 500) return;
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

function distance(a,b) {
  var dx = b[0] - a[0];
  var dy = b[1] - a[1];
  return Math.sqrt(Math.pow(dx, 2) + Math.pow(dy, 2));
}