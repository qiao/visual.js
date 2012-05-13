Visual.Ring = function(scene, opts) {
  opts = opts || {};
  
  this._radius    = opts.radius    || 0.5;
  this._thickness = opts.thickness || 0.1;

  Visual.Primitive.call(this, scene, opts);
};

Visual.Ring.prototype = Object.create(Visual.Primitive.prototype, {
  constructor: {
    value: Visual.Ring
  },
  _buildMesh: {
    value: function() {
      var geometry = new THREE.TorusGeometry(this._radius, this._thickness, 8, 32);
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
    },
  },
  thickness: {
    get: function() {
      return this._thickness;
    },
    set: function(v) {
      this._thickness = v;
      this._updateMesh();
    }
  },
});

Visual.registerObject('ring', Visual.Ring);
