Visual.Pyramid = function(scene, opts) {
  opts = opts || {};

  this._height = opts.heigth || 1;
  this._width  = opts.width  || 1;
  this._length = opts.length || 1;

  Visual.Primitive.call(this, scene, opts);
};

Visual.Util.inherits(Visual.Pyramid, Visual.Primitive);

Object.defineProperties(Visual.Pyramid.prototype, {
  _buildGeometry: {
    value: function() {
      var geometry = new THREE.Geometry();
      return geometry;
    }
  },
});

Visual.Scene.registerObject('pyramid', Visual.Pyramid);
