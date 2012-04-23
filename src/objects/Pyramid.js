Visual.Pyramid = function(scene, opts) {
  opts = opts || {};

  this._height = opts.height || 1;
  this._width  = opts.width  || 1;
  this._length = opts.length || 1;

  Visual.Primitive.call(this, scene, opts);
};

Visual.Util.inherits(Visual.Pyramid, Visual.Primitive);

Object.defineProperties(Visual.Pyramid.prototype, {
  _buildGeometry: {
    value: function() {
      var x = this._width / 2;
      var y = this._height / 2;
      var z = this._length;

      // build pyramid geometry
      // TODO: faceVertexUvs

      var geometry = new THREE.Geometry();

      var vertices = geometry.vertices;
      vertices.push(new THREE.Vector3(x, y, 0));
      vertices.push(new THREE.Vector3(x, -y, 0));
      vertices.push(new THREE.Vector3(-x, -y, 0));
      vertices.push(new THREE.Vector3(-x, y, 0));
      vertices.push(new THREE.Vector3(0, 0, z));

      var faces = geometry.faces;
      faces.push(new THREE.Face4(0, 1, 2, 3));
      faces.push(new THREE.Face3(0, 4, 1)) ;
      faces.push(new THREE.Face3(1, 4, 2));
      faces.push(new THREE.Face3(2, 4, 3));
      faces.push(new THREE.Face3(3, 4, 0));

      geometry.computeCentroids();
      geometry.computeFaceNormals();

      // bottom's vertex normals
      var n = new THREE.Vector3(0, 0, -1);
      faces[0].vertexNormals = [n, n, n, n];

      // sides' vertex normals
      for (var i = 0; i < 4; ++i) {
        var face = faces[i];
        n = face.normal;
        face.vertexNormals = [n, n, n];
      }

      return geometry;
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
