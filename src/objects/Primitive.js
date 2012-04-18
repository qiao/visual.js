Visual.Primitive = function(scene, opts) {
  opts = opts || {};

  this.scene = scene;

  var material = new THREE.MeshLambertMaterial({
    color     : opts.color || scene.foreground,
    wireframe : !!opts.wireframe
  });
  var geometry = this._buildGeometry();
  this.mesh = new THREE.Mesh(geometry, material);

  this.pos   = opts.pos   || new THREE.Vector3(0, 0, 0);
  this.axis  = opts.axis  || new THREE.Vector3(1, 0, 0);
  this.up    = opts.up    || new THREE.Vector3(0, 1, 0);
};

Visual.Primitive.prototype = {
  constructor: Visual.Primitive,

  update: function() {
    var target = this.mesh.position.clone().addSelf(this._axis);
    this.mesh.lookAt(target);
  },

  _updateMesh: function() {
    var geometry = this._buildGeometry();
    var mesh = new THREE.Mesh(geometry, this.mesh.material);
    mesh.position = this.mesh.position;
    mesh.rotation = this.mesh.rotation;
    this.scene.remove(this);
    this.mesh = mesh;
    this.scene.add(this);
  },

  get pos() {
    return this.mesh.position;
  },
  set pos(v) {
    this.mesh.position = v;
  },

  get x() {
    return this.mesh.position.x;
  },
  set x(v) {
    this.mesh.position.x = v;
  },
  get y() {
    return this.mesh.position.y;
  },
  set y(v) {
    this.mesh.position.y = v;
  },
  get z() {
    return this.mesh.position.z;
  },
  set z(v) {
    this.mesh.position.z = v;
  },

  get axis() {
    return this._axis;
  },
  set axis(v) {
    this._axis = v;
  },

  get up() {
    return this.mesh.up;
  },
  set up(v) {
    this.mesh.up = v;
  },

  get color() {
    return this.mesh.material.color.getHex;
  },
  set color(v) {
    this.mesh.material.color.setHex(v);
  },
  
  get wireframe() {
    return this.mesh.material.wireframe;
  },
  set wireframe(v) {
    this.mesh.material.wireframe = v;
  },
};
