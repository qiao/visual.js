;(function() {

var toV3 = Visual.Util.toVector3;

Visual.Curve = function(scene, opts) {
  opts = opts || {};

  this._points = opts.points || [];

  Visual.Primitive.call(this, scene, opts);

  this.linewidth = opts.linewidth || 1;
};

Visual.Util.inherits(Visual.Curve, Visual.Primitive);

Object.defineProperties(Visual.Curve.prototype, {
  update: {
    value: function() {
      // the curve does not need to update its orientation.
    }
  },
  _buildMesh: {
    value: function() {
      var points = this._points;
      for (var i = 0; i < points.length; i++) {
        points[i] = toV3(points[i]);
      }
      var geometry = new THREE.Geometry();
      geometry.vertices = points;
      var material = new THREE.LineBasicMaterial();
      var mesh = new THREE.Line(geometry, material);
      return mesh;
    }
  },
  append: {
    value: function(point) {
      point = toV3(point);
      this.mesh.geometry.vertices.push(point)
    }
  },
  linewidth: {
    get: function() {
      return this.mesh.material.linewidth;
    },
    set: function(v) {
      this.mesh.material.linewidth = v;
    }
  },
});

Visual.registerObject('curve', Visual.Curve);

})();
