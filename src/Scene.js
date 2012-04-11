Visual.Scene = function(opts) {
  opts = opts || {};
  // setup scene parameters
  this.container   = opts.container  || document.body;
  this._width      = opts.width      || 640;
  this._height     = opts.height     || 480;
  this._center     = opts.center     || new Visual.Vector(0, 0, 0);
  this._forward    = opts.forward    || new Visual.Vector(0, 0, -1);
  this._scale      = opts.scale      || new Visual.Vector(0.1, 0.1, 0.1);
  this._up         = opts.up         || new Visual.Vector(0, 1, 0);
  this._fov        = opts.fov        || 60;
  this._foreground = opts.foreground || 0xff0000;
  this._background = opts.background || 0x000000;

  this.autocenter  = opts.autocenter !== undefined ? opts.autocenter : true;
  this.autoscale   = opts.autoscale  !== undefined ? opts.autoscale  : true;
  this.userzoom    = opts.userzoom   !== undefined ? opts.userzoom   : true;
  this.userspin    = opts.userspin   !== undefined ? opts.userspin   : true;

  this.objects     = [];
  this.boundRadius = 0;

  // create scene
  var scene = this.scene = new THREE.Scene();

  // create camera
  var camera = this.camera = new THREE.PerspectiveCamera(
    this.fov, this._width / this._height, 1, 100000
  );
  scene.add(camera);
  camera.position.set(0, 6, 0)
  camera.lookAt(new THREE.Vector3(0, 0, 0))

  // create renderer
  var renderer = this.renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setClearColor(this._background, 1);
  renderer.setSize(this._width, this._height);
  this.domElement = renderer.domElement;
  this.container.appendChild(this.domElement);

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
  this.controller = new Visual.Controller(this);

  // enter render loop
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
    if (this.objects.indexOf(obj) === -1) {
      this.objects.push(obj);
      this.scene.add(obj.mesh);
    }
  },

  remove: function(obj) {
    var i = this.objects.indexOf(obj);
    if (i !== -1) {
      this.objects.splice(i, 1);
      this.scene.remove(obj.mesh);
    }
  },


  renderLoop: function() {
    var self = this;
    (function loop() {
      requestAnimationFrame(loop);
      
      // update camera
      self.controller.update();
      if (self.autocenter || self.autoscale) {
        self._computeBoundRadius();
      }
      if (self.autocenter) { 
        self._adjustCenter();
      }
      if (self.autoscale) {
        self._adjustScale();
      }

      // clear flags
      self._centerDirty = false;
      self._forwardDirty = false;

      // render
      self.renderer.clear();
      self.renderer.render(self.scene, self.camera);
    })();
  },

  _computeBoundRadius: function() {
    var objects = this.objects;
    var center = this._center;
    var maxRadius = 0;
    for (var i = 0, l = objects.length; i < l; ++i) {
      var object = objects[i];
      var radius = object.pos.clone().subSelf(center).length() +
                   object.mesh.boundRadius;
      if (radius > maxRadius) {
        maxRadius = radius;
      }
    }
    this._maxBoundRadiusIncreased = (this._maxBoundRadius || 0) < maxRadius;
    if (this._maxBoundRadiusIncreased) {
      this._maxBoundRadius = maxRadius;
    }
    this.boundRadius = maxRadius;
  },

  _adjustCenter: function() {
  },

  _adjustScale: function() {
    if (!this._centerDirty && !this._forwardDirty && !this._maxBoundRadiusIncreased) {
      return;
    }
    var range = this.boundRadius / Math.tan(this.fov / 2 * Math.PI / 180) + this.boundRadius;
    var offset = this.forward.clone().multiplyScalar(-range);
    var position = this._center.clone().addSelf(offset);
    this.camera.position.copy(position);
    this.camera.lookAt(this._center);
  },

  get center() {
    return this._center;
  },
  set center(v) {
    this.camera.lookAt(v);
  },

  get fov() {
    return this._fov;
  },
  set fov(v) {
    this._fov = this.camera.fov = v;
    this.camera.updateProjectionMatrix();
  },

  get forward() {
    return this._forward;
  },
  set forward(v) {
    this._forwardDirty = true;
    this._forward = v;
    //XXX: update camera
  },

  
};
