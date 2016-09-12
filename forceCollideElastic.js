var constant = function(x) {
  return function() {
    return x;
  };
}

var jiggle = function() {
  return (Math.random() - 0.5) * 1e-6;
}

function x(d) {
  return d.x + d.vx;
}

function y(d) {
  return d.y + d.vy;
}

function forceCollideElastic(radius) {
  var nodes,
      radii,
      masses,
      strength = 1,
      iterations = 1;

  if (typeof radius !== "function") radius = constant(radius == null ? 1 : +radius);

  function force() {
    var i, n = nodes.length,
        tree,
        node,
        xi,
        yi,
        ri,
        ri2;

    for (var k = 0; k < iterations; ++k) {
      tree = d3.quadtree(nodes, x, y).visitAfter(prepare);
      for (i = 0; i < n; ++i) {
        node = nodes[i];
        ri = radii[i], ri2 = ri * ri;
        xi = node.x + node.vx;
        yi = node.y + node.vy;
        tree.visit(apply);
      }
    }

    function apply(quad, x0, y0, x1, y1) {
      var data = quad.data, rj = quad.r, r = ri + rj;
      if (data) {
        if (data.index > i) {
          var x = xi - data.x - data.vx,
              y = yi - data.y - data.vy,
              l = x * x + y * y;
          if (l < r * r) {
            if (x === 0) x = jiggle(), l += x * x;
            if (y === 0) y = jiggle(), l += y * y;
            
            console.log('Collide!');

            var π = Math.PI,
                x1 = node.x,
                y1 = node.y,
                x2 = data.x,
                y2 = data.y,
                m1 = masses[i],
                m2 = masses[data.index],
                v1x = node.vx,
                v1y = node.vy,
                v2x = data.vx,
                v2y = data.vy,
                v1 = Math.sqrt(Math.pow(v1x,2) + Math.pow(v1y,2)),
                v2 = Math.sqrt(Math.pow(v2x,2) + Math.pow(v2y,2));

            // get contact angle
            var φ = Math.atan2(y2-y1, x2-x1);
            // get movement angles
            var θ1 = Math.atan2(v1y, v1x);
            var θ2 = Math.atan2(v2y, v2x);
            
            var v1x_new = 
              ( v1 * Math.cos(θ1 - φ) * (m1 - m2) + 
                2 * m2 * v2 * Math.cos(θ2 - φ) ) / 
              ( m1 + m2 ) * 
              Math.cos(φ) +
              v1 * Math.sin(θ1 - φ) * Math.cos(φ + π/2);

            var v1y_new = 
              ( v1 * Math.cos(θ1 - φ) * (m1 - m2) + 
                2 * m2 * v2 * Math.cos(θ2 - φ) ) / 
              ( m1 + m2 ) * 
              Math.sin(φ) +
              v1 * Math.sin(θ1 - φ) * Math.cos(φ + π/2);
            
            var v2x_new = 
              ( v2 * Math.cos(θ2 - φ) * (m2 - m1) + 
                2 * m1 * v1 * Math.cos(θ1 - φ) ) / 
              ( m2 + m1 ) * 
              Math.cos(φ) +
              v2 * Math.sin(θ2 - φ) * Math.cos(φ + π/2);

            var v2y_new = 
              ( v2 * Math.cos(θ2 - φ) * (m2 - m1) + 
                2 * m1 * v1 * Math.cos(θ1 - φ) ) / 
              ( m2 + m1 ) * 
              Math.sin(φ) +
              v2 * Math.sin(θ2 - φ) * Math.cos(φ + π/2);

            node.vx = v1x_new;
            node.vy = v1y_new;
            data.vx = v2x_new;
            data.vy = v2y_new;

            // l = (r - (l = Math.sqrt(l))) / l * strength;
            // node.vx += (x *= l) * (r = (rj *= rj) / (ri2 + rj));
            // node.vy += (y *= l) * r;
            // data.vx -= x * (r = 1 - r);
            // data.vy -= y * r;
          }
        }
        return;
      }
      return x0 > xi + r || x1 < xi - r || y0 > yi + r || y1 < yi - r;
    }
  }

  function prepare(quad) {
    if (quad.data) return quad.r = radii[quad.data.index];
    for (var i = quad.r = 0; i < 4; ++i) {
      if (quad[i] && quad[i].r > quad.r) {
        quad.r = quad[i].r;
      }
    }
  }

  force.initialize = function(_) {
    var i, n = (nodes = _).length; radii = new Array(n); masses = new Array(n);
    for (i = 0; i < n; ++i) {
      radii[i] = +radius(nodes[i], i, nodes);
      masses[i] = Math.PI * Math.pow(radii[i],2);
    }
  };

  force.iterations = function(_) {
    return arguments.length ? (iterations = +_, force) : iterations;
  };

  force.strength = function(_) {
    return arguments.length ? (strength = +_, force) : strength;
  };

  force.radius = function(_) {
    return arguments.length ? (radius = typeof _ === "function" ? _ : constant(+_), force) : radius;
  };

  return force;
}