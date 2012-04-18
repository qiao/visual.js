Visual.Primitive = function(scene, opts) {
  opts = opts || {};
  this.scene  = scene;

  this._color = opts.color || scene.foreground;
  this._wireframe = opts.wireframe;

  this.mesh  = this._buildMesh();

  this.pos   = opts.pos   || new THREE.Vector3(0, 0, 0);
  this.axis  = opts.axis  || new THREE.Vector3(0, 0, 1);
  this.up    = opts.up    || new THREE.Vector3(0, 1, 0);
};

Visual.Primitive.prototype = {
  constructor: Visual.Primitive,

  update: function() {
    var target = this._pos.clone().addSelf(this._axis);
    this.mesh.lookAt(target);
  },

  _updateMesh: function() {
    // all subclasses must define the `_buildMesh` method
    var mesh = this._buildMesh();
    mesh.position = this.mesh.position;
    mesh.rotation = this.mesh.rotation;
    this.scene.remove(this);
    this.mesh = mesh;
    this.scene.add(this);
  },

  get pos() {
    return this._pos;
  },
  set pos(v) {
    this._pos = this.mesh.position = v;
  },

  get x() {
    return this._pos.x;
  },
  set x(v) {
    this._pos.x = v;
  },
  get y() {
    return this._pos.y;
  },
  set y(v) {
    this._pos.y = v;
  },
  get z() {
    return this._pos.z;
  },
  set z(v) {
    this._pos.z = v;
  },

  get axis() {
    return this._axis;
  },
  set axis(v) {
    this._axis = v;
  },

  get up() {
    return this._up;
  },
  set up(v) {
    this._up = this.mesh.up = v;
  },

  get color() {
    return this._color;
  },
  set color(v) {
    this._color = v;
    this.mesh.material.color.setHex(v);
  },
  
  get wireframe() {
    return this._wireframe;
  },
  set wireframe(v) {
    this._wireframe = this.mesh.material.wireframe = v;
  },
};
