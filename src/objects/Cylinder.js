Visual.Cylinder = function(scene, opts) {
  opts = opts || {};

  this._length       = opts.length || 1;
  this._radius       = opts.radius || 1;

  // for deriving into cones and pyramids
  this._topRadius    = opts.topRadius !== undefined ? opts.topRadius : this._radius;
  this._segments     = opts.segments || 24;

  Visual.Primitive.call(this, scene, opts);
};

Visual.Util.inherits(Visual.Cylinder, Visual.Primitive);

Object.defineProperties(Visual.Cylinder.prototype, {
  _buildMesh: {
    value: function() {
      var geometry = new THREE.CylinderGeometry(
        this._topRadius, this._radius, this._length, this._segments
      );
      var vertices = geometry.vertices;
      // rotate all the vertices to align the axis of the cylinder with the z-axis.
      // and move the center of the bottom to be at <0, 0, 0>
      var rotationMatrix = new THREE.Matrix4();
      var axis = new THREE.Vector3(1, 0, 0);
      var angle = Math.PI / 2;
      rotationMatrix.setRotationAxis(axis, angle);
      for (var i = 0, l = vertices.length; i < l; ++i) {
        var position = vertices[i].position;
        rotationMatrix.multiplyVector3(position);
        position.z += this._length / 2;
      }
      geometry.computeFaceNormals();
      geometry.computeVertexNormals();
      geometry.__dirtyVertices = true;
      geometry.__dirtyNormals = true;

      var material = new THREE.MeshLambertMaterial({ color: this._color });
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

Visual.Scene.registerObject('cylinder', Visual.Cylinder);
