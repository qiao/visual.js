Visual.Pyramid = function(scene, opts) {
  opts = opts || {};

  this._height = opts.height || 1;
  this._width  = opts.width  || 1;
  this._length = opts.length || 1;

  Visual.Primitive.call(this, scene, opts);
};

Visual.Pyramid.prototype = Object.create(Visual.Primitive.prototype, {
  constructor: {
    value: Visual.Pyramid
  },
  _buildMesh: {
    value: function() {
      var geometry = new THREE.PyramidGeometry(this._width, this._length, this._height);
      var rotationMatrix = new THREE.Matrix4();
      rotationMatrix.rotateX(Math.PI / 2);
      geometry.applyMatrix(rotationMatrix);
      var material = new THREE.MeshLambertMaterial({ shading: THREE.FlatShading });
      var mesh = new THREE.Mesh(geometry, material);
      return mesh;
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
  length: {
    get: function() {
      return this._length;
    },
    set: function(v) {
      this._length = v;
      this._updateMesh();
    }
  },
});

Visual.registerObject('pyramid', Visual.Pyramid);
