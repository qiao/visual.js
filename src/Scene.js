Visual.Scene = function(opts) {
  opts = opts || {};

  // setup scene parameters
  this._container  = opts.container  || document.body;
  this._width      = opts.width      || 640;
  this._height     = opts.height     || 480;
  this._scale      = opts.scale      || 1;
  this._fov        = opts.fov        || 60;
  this._foreground = opts.foreground || 0xff0000;
  this._background = opts.background || 0x000000;

  this.center      = opts.center     || new THREE.Vector3(0, 0, 0);
  this.forward     = opts.forward    || new THREE.Vector3(0, 0, -1);
  this.up          = opts.up         || new THREE.Vector3(0, 1, 0);

  // All modifications applied to the above properties will be monitored.
  // For primitive data types, setters and getters will be used.
  // While for complex data types, say instances of THREE.Vector3 like `center`
  // users may try to do something like `scene.center.x += 1`. In this case, 
  // the getter of center will be called instead of setter, and this surely
  // is not what we desired. Therefore, we have to monitor them by recording
  // their old values.
  this._oldCenter  = this.center.clone();
  this._oldForward = this.forward.clone();
  this._oldUp      = this.up.clone();

  // parameters for controlling the view
  this.autoCenter  = opts.autoCenter !== undefined ? opts.autoCenter : true;
  this.autoScale   = opts.autoScale  !== undefined ? opts.autoScale  : true;
  this.userZoom    = opts.userZoom   !== undefined ? opts.userZoom   : true;
  this.userSpin    = opts.userSpin   !== undefined ? opts.userSpin   : true;

  this._boundRadius = 0;

  this.objects     = [];

  // create scene
  var scene = this.scene = new THREE.Scene();

  // create camera
  var camera = this.camera = new THREE.PerspectiveCamera(
    this.fov, this._width / this._height, 1, 100000
  );
  camera.position = this.center.clone().subSelf(
    this.forward.clone().normalize().multiplyScalar(this._scale))
  scene.add(camera);
  this._initCameraPosition();

  // create renderer
  var renderer = this.renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setClearColor(this._background, 1);
  renderer.setSize(this._width, this._height);
  var domElement = this.domElement = renderer.domElement;
  this._container.appendChild(domElement);

  // create lights
  var ambient = new THREE.AmbientLight(0x111111);
  scene.add(ambient);
  var light1 = new THREE.DirectionalLight(0xffffff, 0.8);
  light1.position.set(1, 2, 4).normalize();
  scene.add(light1);
  var light2 = new THREE.DirectionalLight(0xffffff, 0.3);
  light2.position.set(-4, -1, 2).normalize();
  scene.add(light2);

  // create user interaction controller
  this.interaction = new Visual.Interaction(domElement);

  // enter render loop
  this._renderLoop();
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

  _renderLoop: function() {
    var self = this;
    (function loop() {
      requestAnimationFrame(loop);
      self._detectPropertyChanges();
      self._updateCamera();
      self._render();
      self._clearFlags();
    })();
  },

  _render: function() {
    this.renderer.clear();
    this.renderer.render(this.scene, this.camera);
  },

  _updateCamera: function() {
    if (this.autoCenter || this.autoScale) {
      this._computeBoundRadius();
    }
    if (this.autoCenter) { 
      this._adjustToIdealCenter();
    }
    if (this.autoScale) {
      this._adjustToIdealScale();
    }

    this._computeBasicCameraPosition();
    this._applyUserCameraOffset();
  },

  _detectPropertyChanges: function() {
    this._detectForwardChange();
    this._detectCenterChange();
    this._detectUpChange();
  },

  _detectForwardChange: function() {
    if (this.forward.equals(this._oldForward)) {
      return;
    }
    this._oldForward.copy(this.forward);
    this._forwardDirty = true;
  },

  _detectCenterChange: function() {
    if (this.center.equals(this._oldCenter)) {
      return;
    }
    this._oldCenter.copy(this.center);
    this._centerDirty = true;
  },

  _detectUpChange: function() {
  
  },

  _adjustToIdealCenter: function() {
  
  },

  _adjustToIdealScale: function() {
    if (!(this._forwardDirty ||
          this._centerDirty ||
          this._maxBoundRadiusIncreased)) {
      return;
    }
    var range = this._boundRadius / Math.tan(this._fov / 2 * Math.PI / 180) + this._boundRadius;
    this._scale = 1.0 / range;
  },

  _initCameraPosition: function() {
    this._computeBoundRadius();
    this._adjustToIdealCenter();
    this._adjustToIdealScale();
    this._computeBasicCameraPosition();
    this.camera.position.copy(this._basicCameraPosition);
    this.camera.lookAt(this.center);
  },

  _computeBasicCameraPosition: function() {
    var offset = this.forward.clone().multiplyScalar(-1.0 / this._scale);
    this._basicCameraPosition = this.center.clone().addSelf(offset);
  },

  _applyUserCameraOffset: function() {
    var camera = this.camera;
    camera.position.copy(this._basicCameraPosition);
    camera.position.multiplyScalar(1.0 / this.interaction.scale);
    camera.lookAt(this.center);
  },

  _clearFlags: function() {
    this._forwardDirty = false;
    this._scaleDirty = false;
  },

  _computeBoundRadius: function() {
    var objects = this.objects;
    var center = this.center;
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
    this._boundRadius = maxRadius;
  },

  get fov() {
    return this._fov;
  },
  set fov(v) {
    this._fov = this.camera.fov = v;
    this.camera.updateProjectionMatrix();
  },

  get scale() {
    return this._scale;
  },
  set scale(v) {
    this.scale = v;
  },
};
