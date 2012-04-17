Visual.BaseObject = function(scene, opts) {
  opts = opts || {};
  this.scene  = scene;

  this._color = opts.color || scene.foreground;

  this.mesh  = this._buildMesh();

  this.pos   = opts.pos   || new THREE.Vector3(0, 0, 0);
  this.axis  = opts.axis  || new THREE.Vector3(1, 0, 0);
  this.up    = opts.up    || new THREE.Vector3(0, 1, 0);
};

Visual.BaseObject.prototype = {
  constructor: Visual.BaseObject,

  update: function() {
    this.mesh.lookAt(this._axis);
  },

  _updateMesh: function() {
    // all subclasses must define the `_buildMesh` method
    var mesh = this._buildMesh();
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
    this._color = this.mesh.material.color = v;
  }
};
