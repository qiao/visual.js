Visual.Primitive = function(scene, opts) {
  scene = scene || {};
  opts = opts || {};
  this.scene = scene;
  this._pos = opts.pos || new Visual.Vector(0, 0, 0);
  this._color = opts.color || scene.foreground;
};

Visual.Primitive.prototype = {
  constructor: Visual.Primitive,

  get pos() {
    return this._pos;
  },
  set pos(v) {
    this._pos = v;
    this.mesh.position = v;
  },

  get x() {
    return this.pos.x;
  },
  set x(v) {
    this.pos.x = v;
  },
  get y() {
    return this.pos.y;
  },
  set y(v) {
    this.pos.y = v;
  },
  get z() {
    return this.pos.z;
  },
  set z(v) {
    this.pos.z = v;
  },

  get color() {
    return this._color;
  },
  set color(v) {
    this._color = this.mesh.material.color = v;
  }
};
