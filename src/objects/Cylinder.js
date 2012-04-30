Visual.Cylinder = function(scene, opts) {
  opts = opts || {};

  this._length       = opts.length || 1;
  this._radius       = opts.radius || 1;

  // for deriving into cones
  this._topRadius    = opts.topRadius !== undefined ? opts.topRadius : this._radius;
  this._segments     = opts.segments || 32;

  Visual.Primitive.call(this, scene, opts);
};

Visual.Util.inherits(Visual.Cylinder, Visual.Primitive);

Object.defineProperties(Visual.Cylinder.prototype, {
  _buildMesh: {
    value: function() {
      var geometry = new THREE.CylinderGeometry(
        this._topRadius, this._radius, this._length, this._segments, 4
      );
      // rotate all the vertices to align the axis of the cylinder with the z-axis.
      // and move the center of the bottom to be at <0, 0, 0>
      var rotationMatrix = new THREE.Matrix4();
      rotationMatrix.rotateX(Math.PI / 2);
      geometry.applyMatrix(rotationMatrix);
      var translationMatrix = new THREE.Matrix4();
      translationMatrix.translate(new THREE.Vector3(0, 0, this._length / 2));
      geometry.applyMatrix(translationMatrix);

      var material = new THREE.MeshLambertMaterial();
      var mesh = new THREE.Mesh(geometry, material);
      
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
});

Visual.registerObject('cylinder', Visual.Cylinder);
