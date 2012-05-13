;(function() {

var toV3  = Visual.Util.toVector3;
var toColor = Visual.Util.toColor;

Visual.Primitive = function(scene, opts) {
  opts = opts || {};

  this.scene     = scene;

  this.mesh      = this._buildMesh();

  this.pos       = opts.pos  || new THREE.Vector3(0, 0, 0);
  this.axis      = opts.axis || new THREE.Vector3(1, 0, 0);
  this.up        = opts.up   || new THREE.Vector3(0, 1, 0);

  this.opacity   = opts.opacity !== undefined ? opts.opacity : 1;
  this.visible   = opts.visible !== undefined ? opts.visible : true;
  this.color     = opts.color   !== undefined ? opts.color   : scene.foreground;

  this.wireframe = !!opts.wireframe;
};

Visual.Primitive.prototype = {
  constructor: Visual.Primitive,

  update: function() {
    var target = this.mesh.position.clone().addSelf(this._axis);
    this.mesh.lookAt(target);
  },

  _updateMesh: function() {
    var mesh = this._buildMesh();
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
    this.mesh.position = toV3(v);
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

  get up() {
    return this.mesh.up;
  },
  set up(v) {
    this.mesh.up = toV3(v);
  },

  get axis() {
    return this._axis;
  },
  set axis(v) {
    this._axis = toV3(v);
  },

  get color() {
    return this.mesh.material.color.getHex();
  },
  set color(v) {
    this.mesh.material.color.setHex(toColor(v));
  },
  
  get wireframe() {
    return this.mesh.material.wireframe;
  },
  set wireframe(v) {
    this.mesh.material.wireframe = v;
  },

  get visible() {
    return this.mesh.visible;
  },
  set visible(v) {
    this.mesh.visible = v;
  },

  get opacity() {
    return this.mesh.material.opacity;
  },
  set opacity(v) {
    this.mesh.material.opacity = v;
    this.mesh.material.transparent = (v < 1);
  },

  rotate: function(opts) {
    opts = opts || {};

    var angle  = opts.angle  !== undefined ? opts.angle : Math.PI / 4;
    var axis   = opts.axis   ? toV3(opts.axis)   : this.axis;
    var origin = opts.origin ? toV3(opts.origin) : this.pos;

    var dummy = new THREE.Object3D();
    dummy.position.copy(origin);
    this.scene.scene.add(dummy);
    dummy.add(this.mesh);

    var rotationMatrix = new THREE.Matrix4();
    rotationMatrix.rotateByAxis(axis, angle);
    dummy.applyMatrix(rotationMatrix);
  }
};

})();
