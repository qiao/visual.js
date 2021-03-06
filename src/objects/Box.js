Visual.Box = function(scene, opts) {
  opts = opts || {};

  this._length = opts.length || 1;
  this._height = opts.height || 1;
  this._width  = opts.width  || 1;

  Visual.Primitive.call(this, scene, opts);
};

Visual.Box.prototype = Object.create(Visual.Primitive.prototype, {
  constructor: {
    value: Visual.Box
  },
  _buildMesh: {
    value: function() {
      var geometry = new THREE.CubeGeometry(this._width, this._height, this._length, 1, 1, 1);
      var material = new THREE.MeshLambertMaterial();
      var mesh = new THREE.Mesh(geometry, material);
      return mesh;
    }
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
  height: {
    get: function() {
      return this._height;
    },
    set: function(v) {
      this._height = v;
      this._updateMesh();
    }
  },
  width: {
    get: function() {
      return this._width;
    },
    set: function(v) {
      this._width = v;
      this._updateMesh();
    }
  }
});

Visual.registerObject('box', Visual.Box);
