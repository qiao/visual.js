Visual.Arrow = function(scene, opts) {
  opts = opts || {};

  this._length     = opts.length     || 1;
  this._shaftWidth = opts.shaftWidth || this._length * 0.1;
  this._headWidth  = opts.headWidth  || this._shaftWidth * 2;
  this._headLength = opts.headLength || this._shaftWidth * 3;
  
  Visual.Primitive.call(this, scene, opts);
};

Visual.Arrow.prototype = Object.create(Visual.Primitive.prototype, {
  constructor: {
    value: Visual.Arrow
  },
  _buildMesh: {
    value: function() {
      var headWidth   = this._headWidth;
      var headLength  = this._headLength;
      var shaftWidth  = this._shaftWidth;
      var shaftLength = this._length - headLength;

      var matrix = new THREE.Matrix4();

      var shaft = new THREE.CubeGeometry(shaftWidth, shaftWidth, shaftLength);
      matrix.translate(new THREE.Vector3(0, 0, shaftLength / 2));
      shaft.applyMatrix(matrix);

      var head = new THREE.CylinderGeometry(0, headWidth, headLength, 4);
      matrix.identity();
      matrix.setRotationFromEuler(new THREE.Vector3(Math.PI / 2, Math.PI / 4, 0), 'XYZ')
      matrix.translate(new THREE.Vector3(0, headLength / 2 + shaftLength, 0));
      head.applyMatrix(matrix);

      // fix head's vertex normals
      var faces = head.faces;
      for (var i = 0, l = faces.length; i < l; ++i) {
        var face = faces[i];
        var n = face.normal;
        if (face instanceof THREE.Face4) {
          face.vertexNormals = [n, n, n, n];
        }
      }

      THREE.GeometryUtils.merge(shaft, head);

      var material = new THREE.MeshLambertMaterial();
      var mesh = new THREE.Mesh(shaft, material);

      return mesh;
    }
  },
});

Visual.registerObject('arrow', Visual.Arrow);
