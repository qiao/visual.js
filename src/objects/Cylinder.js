Visual.Cylinder = function(scene, opts) {
  opts = opts || {};

  this._length = opts.length || 1;
  this._radius = opts.radius || 1;

  Visual.Primitive.call(this, scene, opts);
};

Visual.Util.inherits(Visual.Cylinder, Visual.Primitive);

Object.defineProperties(Visual.Cylinder.prototype, {
  _buildMesh: {
    value: function() {
      var geometry = new THREE.CylinderGeometry(this._radius, this._radius, this._length, 24);
      var material = new THREE.MeshLambertMaterial({ color: this._color });
      var mesh = new THREE.Mesh(geometry, material);
      mesh.rotation.z = -Math.PI / 2;
      return mesh;
    },
  },

  length: {
    get: function() {
      return this._length;
    },
    set: function(v) {
      this._length = v;
      this._updateMesh();
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
  },

  axis: {
    get: function() {
      return this._axis
    },
  },
});

Visual.Scene.registerObject('cylinder', Visual.Cylinder);
