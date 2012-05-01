/**
 * The controller handles mouse and keyboard interaction, and updates
 * the position of the camera.
 * @constructor
 * @param {Visual.Scene} scene An instance of Visual.Scene
 */
Visual.Controller = function(scene) {
  this.scene = scene;

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
  var domElement = scene.domElement;
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
    var camera = this.scene.camera;
    var center = this.scene.center;

    var pos       = camera.position.clone().subSelf(center);
    var newPos    = pos.clone();

    if (!this.noRotate) {

      // apply rotation
      var x = this._overallRotationOffset.x;
      var y = this._overallRotationOffset.y;

      // The rotation is calculated in the spherical coordinate system
      // theta: the angle formed by the vector and z-axis in the xz-plane
      // phi:   the angle formed by the vector and y-axis in the xy-plane

      var theta = 2 * Math.PI * x / 1800;
      var phi   = 2 * Math.PI * y / 1800;

      var pos       = camera.position.clone().subSelf(center);
      var newPos    = pos.clone();
      var radius    = pos.length();

      var origTheta = Math.atan2(pos.x, pos.z);
      var newTheta  = origTheta - theta;
      newPos.z = radius * Math.cos(newTheta);
      newPos.x = radius * Math.sin(newTheta);
      
      var origPhi = Math.atan2(Math.sqrt(pos.x * pos.x + pos.z * pos.z), pos.y);
      var newPhi = origPhi - phi;

      // restrict phi to be in [eps, Math.PI - eps]
      var eps = 0.01;
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

    } // end update rotation


    if (!this.noZoom) {
      newPos.multiplyScalar(1.0 / this._scale);
    }

    // update camera position
    camera.position.copy(center.clone().addSelf(newPos));
  },


  _mousedown: function(event) {
    this._state = this._STATE.ROTATE;
    this._rotateStart.set(event.clientX, event.clientY);
    this._rotateEnd.copy(this._rotateStart);
  },

  _mousemove: function(event) {
    if (this._state !== this._STATE.ROTATE) {
      return;
    }
    this._rotateEnd.set(event.clientX, event.clientY);
    var delta = this._rotateEnd.clone().subSelf(this._rotateStart);
    this._rotateStart.copy(this._rotateEnd);
    this._overallRotationOffset.x += delta.x;
    this._overallRotationOffset.y += delta.y;
  },

  _mouseup: function(event) {
    this._state = this._STATE.NONE;
  },

  _keydown: function(event) {
    var keyCode = event.keyCode || event.which;
    var rotateDelta = this.rotateSpeed * 20;
    var zoomDelta = this.zoomSpeed * 0.95;
    switch (keyCode) {
    case 87: // w
      this._overallRotationOffset.y += rotateDelta;
      break;
    case 83: // s
      this._overallRotationOffset.y -= rotateDelta;
      break;
    case 65: // a
      this._overallRotationOffset.x += rotateDelta;
      break;
    case 68: // d
      this._overallRotationOffset.x -= rotateDelta;
      break;
    case 88: // x
      this._scale /= zoomDelta;
      break;
    case 90: // z
      this._scale *= zoomDelta;
      break;
    }
  },

  _keyup: function(event) {
  
  },
};
