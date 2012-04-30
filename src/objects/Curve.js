Visual.Curve = function(scene, opts) {
  opts = opts || {};

  this.points = opts.points || [];

  Visual.Primitive.call(this, scene, opts);
};

Visual.Util.inherits(Visual.Curve, Visual.Primitive);

Object.defineProperties(Visual.Curve.prototype, {
  _buildMesh: {
    value: function() {
      var geometry = new THREE.Geometry();
    }
  },
});

Visual.registerObject('curve', Visual.Curve);
