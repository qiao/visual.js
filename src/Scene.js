Visual.Scene = function(opts) {
  opts = opts || {};
  // setup scene parameters
  this.domElement  = opts.domElement || document.body;
  this._width      = opts.width      || 640;
  this._height     = opts.height     || 480;
  this._center     = opts.center     || new Visual.Vector(0, 0, 0);
  this._forward    = opts.forward    || new Visual.Vector(0, 0, -1);
  this._scale      = opts.scale      || new Visual.Vector(0.1, 0.1, 0.1);
  this._up         = opts.up         || new Visual.Vector(0, 1, 0);
  this._fov        = opts.fov        || 60;
  this._foreground = opts.foreground || 0xff0000;
  this._background = opts.background || 0x000000;

  this.autocenter  = opts.autocenter || true;
  this.autoscale   = opts.autoscale  || true;
  this.userzoom    = opts.userzoom   || true;
  this.userspin    = opts.userspin   || true;


  // create scene
  var scene = this.scene = new THREE.Scene();

  // create camera
  var camera = this.camera = new THREE.PerspectiveCamera(
    this.fov, this._width / this._height, 1, 100000
  );
  camera.position.set(10, 3, 10);
  camera.lookAt(this._center);
  scene.add(camera);

  // create renderer
  var renderer = this.renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setClearColor(this._background, 1);
  renderer.setSize(this._width, this._height);
  this.domElement.appendChild(renderer.domElement);

  // create lights
  var ambient = new THREE.AmbientLight(0x111111);
  scene.add(ambient);
  var light1 = new THREE.DirectionalLight(0xffffff, 0.8);
  light1.position.set(1, 2, 4).normalize();
  scene.add(light1);
  var light2 = new THREE.DirectionalLight(0xffffff, 0.3);
  light2.position.set(-4, -1, 2).normalize();
  scene.add(light2);

  // create camera controller
  var controls = this.controls = new THREE.TrackballControls(camera);
  controls.rotateSpeed = 1.0;
  controls.zoomSpeed = 1.0;
  controls.panSpeed = 0.8;
  controls.noZoom = false;
  controls.noPan = false;

  this.renderLoop();
};

Visual.Scene.registerObject = function(name, constructor) {
  Visual.Scene.prototype[name] = function(opts) {
    var obj = new constructor(this, opts);
    this.add(obj);
    return obj;
  }
};

Visual.Scene.prototype = {

  constructor: Visual.Scene,

  add: function(obj) {
    this.scene.add(obj.mesh);
  },

  remove: function(obj) {
    this.scene.remove(obj.mesh);
  },

  get center() {
    return this.controls.target;
  },
  set center(v) {
    this.camera.lookAt(v);
  },

  renderLoop: function() {
    var self = this;
    (function loop() {
      requestAnimationFrame(loop);
      
      // update camera
      self.controls.update();
      if (self.autocenter || self.autoscale) {
        self._calculateExtent();
      }
      if (self.autocenter) { 
        self._adjustCenter();
      }
      if (self.autoscale) {
        self._adjustScale();
      }

      // render
      self.renderer.clear();
      self.renderer.render(self.scene, self.camera);
    })();
  },

  _calculateExtent: function() {
  
  },

  _adjustCenter: function() {

  },

  _adjustScale: function() {
  
  },

  
};
