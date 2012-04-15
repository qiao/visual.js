Visual.Controller = function(camera, domElement) {
  this.camera       = camera;
  this.domElement   = domElement;

  this._STATE       = { NONE: -1, ROTATE: 0, ZOOM: 1, PAN: 2 };
  this._state       = this._STATE.NONE;

  this.rotateSpeed  = 1.0;
  this.zoomSpeed    = 1.0;
  this.panSpeed     = 1.0;

  this.noRotate     = false;
  this.noZoom       = false;
  this.noPan        = false;

  this._rotateStart = new THREE.Vector2();
  this._rotateEnd   = new THREE.Vector2();
  this._zoomStart   = new THREE.Vector2();
  this._zoomEnd     = new THREE.Vector2();
  this._panStart    = new THREE.Vector2();
  this._panEnd      = new THREE.Vector2();

  this._overallRotationOffset = new THREE.Vector2();
  this._overallScaleOffset    = new THREE.Vector2();

  this._scale = 1.0

  var self = this;
  domElement.addEventListener('contextmenu', function(event) { event.preventDefault(); }, false);
  domElement.addEventListener('mousedown', function(event) { self._mousedown(event); }, false);
  domElement.addEventListener('mousemove', function(event) { self._mousemove(event); }, false);
  domElement.addEventListener('mouseup', function(event) { self._mouseup(event); }, false);
  window.addEventListener('keydown', function(event) { self._keydown(event); }, false);
  window.addEventListener('keyup', function(event) { self._keyup(event); }, false);
};

Visual.Controller.prototype = {
  contructor: Visual.Controller,

  update: function() {
    this._updateRotation();
    this._updateScale();
  },

  _updateRotation: function() {
    var x = this._overallRotationOffset.x;
    var y = this._overallRotationOffset.y;

    // The rotation is calculated in the spherical coordinate system
    // theta: the angle formed by the vector and z-axis in the xz-plane
    // phi:   the angle formed by the vector and y-axis in the xy-plane

    var theta = 2 * Math.PI * x / 1800;
    var phi   = 2 * Math.PI * y / 1800;

    var pos       = this.camera.position;
    var newPos    = pos.clone();
    var radius    = pos.length();

    var origTheta = Math.atan2(pos.x, pos.z);
    var newTheta  = origTheta - theta;
    newPos.z = radius * Math.cos(newTheta);
    newPos.x = radius * Math.sin(newTheta);
    
    var origPhi = Math.atan2(Math.sqrt(pos.x * pos.x + pos.z * pos.z), pos.y);
    var newPhi = origPhi - phi;

    // restrict phi to be in [eps, Math.PI - eps]
    var eps = 0.01
    if (newPhi < eps) {
      newPhi = eps;
      this._overallRotationOffset.y = 1800 * origPhi / Math.PI / 2;
    } else if (newPhi > Math.PI - eps) {
      newPhi = Math.PI - eps;
      this._overallRotationOffset.y = -1800 * (Math.PI - origPhi) / Math.PI / 2;
    }

    newPos.x = radius * Math.sin(newPhi) * Math.sin(newTheta);
    newPos.y = radius * Math.cos(newPhi);
    newPos.z = radius * Math.sin(newPhi) * Math.cos(newTheta);
    this.camera.position.copy(newPos);
  },

  _updateScale: function() {
    var scale = this._scale;
    this.camera.position.multiplyScalar(1.0 / scale);
  },

  _mousedown: function(event) {
  
  },

  _mousemove: function(event) {
  
  },

  _mouseup: function(event) {
  
  },

  _keydown: function(event) {
    var keyCode = event.keyCode || event.which;
    switch (keyCode) {
    case 87: // w
      this._overallRotationOffset.y += 20;
      break;
    case 83: // s
      this._overallRotationOffset.y -= 20;
      break;
    case 65: // a
      this._overallRotationOffset.x += 20;
      break;
    case 68: // d
      this._overallRotationOffset.x -= 20;
      break;
    case 88: // x
      this._scale /= 0.95;
      break;
    case 90: // z
      this._scale *= 0.95;
      break;
    }
  },

  _keyup: function(event) {
  
  },
};
