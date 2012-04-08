Visual.Scene = function(domElement, width, height) {
  // setup scene parameters
  this.center = new Visual.Vector(0, 0, 0);
  this.forward = new Visual.Vector(0, 0, -1);
  this.scale = new Visual.Vector(0.1, 0.1, 0.1);
  this.up = new Visual.Vector(0, 1, 0);
  this.fov = 60;
  // TODO: range

  this.autocenter = true;
  this.autoscale = true;
  this.userzoom = true;
  this.userspin = true;

  this.foreground = 0xff0000;
  this.background = 0x000000;

  var scene = this._scene = new THREE.Scene();
  var camera = this._camera = new THREE.PerspectiveCamera(this.fov, width / height, 1, 100000);
  var renderer = this._renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setClearColor(this.background, 1);
  renderer.setSize(width, height);
  domElement.appendChild(renderer.domElement);
  camera.position.set(10, 3, 10);
  camera.lookAt(new THREE.Vector3(0, 0, 0));
  scene.add(camera);

  // create lights
  var ambient = this._ambient = new THREE.AmbientLight(0x111111);
  scene.add(ambient);
  var light1 = new THREE.DirectionalLight(0xffffff, 0.8);
  light1.position.set(1, 2, 4).normalize();
  scene.add(light1);
  var light2 = new THREE.DirectionalLight(0xffffff, 0.3);
  light2.position.set(-4, -1, 2).normalize();
  scene.add(light2);

  // create camera controller
  var controls = this._controls = new THREE.TrackballControls(camera);
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
    this._scene.add(obj.mesh);
  },

  remove: function(obj) {
    this._scene.remove(obj.mesh);
  },

  renderLoop: function() {
    var scene = this._scene;
    var camera = this._camera;
    var renderer = this._renderer;
    var controls = this._controls;
    (function loop() {
      requestAnimationFrame(loop);
      controls.update();
      renderer.clear();
      renderer.render(scene, camera);
    })();
  },
};
