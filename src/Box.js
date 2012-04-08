Visual.Box = function(scene, opts) {
  opts = opts || {};
  Visual.Primitive.call(this, scene, opts);

  var length = opts.length || 1;
  var height = opts.height || 1;
  var width = opts.width || 1;

  var geometry = new THREE.CubeGeometry(length, height, width, 1, 1, 1);
  var material = new THREE.MeshLambertMaterial({ color: this.color });
  var mesh = new THREE.Mesh(geometry, material);
  mesh.position = this.pos;
  this.mesh = mesh;
};

Visual.Box.prototype = new Visual.Primitive();
Visual.Box.prototype.constructor = Visual.Box;

Visual.Scene.registerObject('box', Visual.Box);
