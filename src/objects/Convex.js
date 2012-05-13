;(function() {

var toVector3 = Visual.Util.toVector3;

Visual.Convex = function(scene, opts) {
  opts = opts || {};

  this._points = opts.points || [];

  Visual.Primitive.call(this, scene, opts);
};

Visual.Convex.prototype = Object.create(Visual.Primitive.prototype, {
  constructor: {
    value: Visual.Convex
  },
  _buildMesh: {
    value: function() {
      var points = this._points;
      for (var i = 0; i < points.length; ++i) {
        points[i] = toVector3(points[i]);
      }
      var geometry = new THREE.ConvexGeometry(points);
      var material = new THREE.MeshLambertMaterial({ shading: THREE.FlatShading });
      var mesh = new THREE.Mesh(geometry, material);
      return mesh;
    }
  }
});

Visual.registerObject('convex', Visual.Convex);

})();
