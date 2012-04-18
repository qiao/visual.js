Visual.Sphere = function(scene, opts) {
  opts = opts || {};

  this._radius = opts.radius || 1;

  Visual.Primitive.call(this, scene, opts);
};

Visual.Util.inherits(Visual.Sphere, Visual.Primitive);

Object.defineProperties(Visual.Sphere.prototype, {
  _buildGeometry: {
    value: function() {
      var geometry = new THREE.SphereGeometry(this._radius, 24, 24);
      return geometry;
    }
  },
  radius: {
    get: function() { 
      return this._radius; 
    },
    set: function(v) { 
      this._radius = v;
      this._updateMesh();
    }
  }
});

Visual.Scene.registerObject('sphere', Visual.Sphere);
