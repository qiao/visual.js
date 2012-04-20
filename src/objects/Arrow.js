Visual.Arrow = function(scene, opts) {
  opts = opts || {};

  this._length     = opts.length     || 1;
  this._shaftWidth = opts.shaftWidth || this._length * 0.1;
  this._headWidth  = opts.headWidth  || this._shaftWidth * 2;
  this._headLength = opts.headLength || this._shaftWidth * 3;
  
  Visual.Primitive.call(this, scene, opts);
};

Visual.Util.inherits(Visual.Arrow, Visual.Primitive);

Object.defineProperties(Visual.Arrow.prototype, {
  _buildGeometry: {
    value: function() {
      var headWidth   = this._headWidth;
      var headLength  = this._headLength;
      var shaftWidth  = this._shaftWidth;
      var shaftLength = this._length - headLength;

      var rotationMatrix = new THREE.Matrix4();
      var translationMatrix = new THREE.Matrix4();

      var shaft = new THREE.CubeGeometry(shaftWidth, shaftWidth, shaftLength);
      translationMatrix.setTranslation(0, 0, shaftLength / 2);
      shaft.applyMatrix(translationMatrix);

      var head = new THREE.CylinderGeometry(0, headWidth, headLength, 4);
      rotationMatrix.setRotationY(Math.PI / 4);
      head.applyMatrix(rotationMatrix);
      rotationMatrix.setRotationX(Math.PI / 2);
      head.applyMatrix(rotationMatrix);
      translationMatrix.setTranslation(0, 0, headLength / 2 + shaftLength);
      head.applyMatrix(translationMatrix);

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

      return shaft;
    }
  },
});

Visual.registerObject('arrow', Visual.Arrow);
