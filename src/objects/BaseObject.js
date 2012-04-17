Visual.BaseObject = function(scene, opts) {
  opts = opts || {};
  this.scene = scene;
  this._pos = opts.pos || new Visual.Vector(0, 0, 0);
  this._color = opts.color || scene.foreground;
};

Visual.BaseObject.prototype = {
  constructor: Visual.BaseObject,

  update: function() {
  
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
