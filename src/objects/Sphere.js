Visual.Sphere = function(scene, opts) {
  opts = opts || {};

  this._radius = opts.radius || 1;

  Visual.Primitive.call(this, scene, opts);
};

Visual.Util.inherits(Visual.Sphere, Visual.Primitive);

Object.defineProperties(Visual.Sphere.prototype, {
  _buildMesh: {
    value: function() {
      var geometry = new THREE.SphereGeometry(this.radius, 24, 24);
      var material = new THREE.MeshLambertMaterial({ color: this.color });
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

Visual.Scene.registerObject('sphere', Visual.Sphere);
