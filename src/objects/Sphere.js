Visual.Sphere = function(scene, opts) {
  opts = opts || {};

  this._radius = opts.radius || 1;

  Visual.Primitive.call(this, scene, opts);
};

Visual.Sphere.prototype = Object.create(Visual.Primitive.prototype, {
  constructor: {
    value: Visual.Sphere
  },
  _buildMesh: {
    value: function() {
      var geometry = new THREE.SphereGeometry(this._radius, 24, 24);
      var material = new THREE.MeshLambertMaterial();
      var mesh = new THREE.Mesh(geometry, material);
      return mesh;
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

Visual.registerObject('sphere', Visual.Sphere);
