Visual.Interaction = function(domElement) {
  this.domElement   = domElement;

  this.enabled      = true;

  this._screen      = { width: window.innerWidth, height: window.innerHeight, 
                        offsetLeft: 0, offsetTop: 0 };
  this._radius      = (this._screen.width + this._screen.height) / 4;

  this._STATE       = { NONE: -1, ROTATE: 0, ZOOM: 1, PAN: 2 };
  this._state       = this._STATE.NONE;
  this.scale        = 1;

  this.rotateSpeed  = 1.0;
  this.zoomSpeed    = 1.2;
  this.panSpeed     = 0.3;

  this.noRotate     = false;
  this.noZoom       = false;
  this.noPan        = false;

  this.staticMoving = false;
  this.dynamicDampingFactor = 0.2;

  var self = this;
  domElement.addEventListener('contextmenu', function(event) { event.preventDefault(); }, false);
  domElement.addEventListener('mousedown', function(event) { self._mousedown(event); }, false);
  domElement.addEventListener('mousemove', function(event) { self._mousemove(event); }, false);
  domElement.addEventListener('mouseup', function(event) { self._mouseup(event); }, false);
  
  window.addEventListener('keydown', function(event) { self._keydown(event); }, false);
};

Visual.Interaction.prototype = {
  contructor: Visual.Interaction,

  _mousedown: function(event) {
    event.preventDefault();
    event.stopPropagation();

    var STATE = this._STATE;
    var state = this._state;

    if (state === STATE.NONE) {
      this.state = event.button;    

      if (state === STATE.ROTATE && !this.noRotate) {
        this._rotateStart = this._rotateEnd = 
          this._getMouseProjectionOnBall(event.clientX, event.clientY);
      } else if (state === STATE.ZOOM && !this.noZoom) {
        this._zoomStart = this._zoomEnd = 
          this._getMouseOnScreen(event.clientX, event.clientY);
      } else if (state === STATE.PAN && !this.noPan) {
        this._panStart = this._panEnd = 
          this._getMouseOnScreen(event.clientX, event.clientY);
      }
    }
  },

  _mousemove: function(event) {
  
  },

  _mouseup: function(event) {
    event.preventDefault();
    event.stopPropagation();
  
    this._state = this._STATE.NONE;
  },

  _keydown: function(event) {
    switch (event.keyCode || event.which) {
    case 38: // up
      this.scale *= 0.95;
      break;
    case 40: // down
      this.scale /= 0.95;
      break;
    }
  },

  _keyup: function(event) {
    this._state = this._STATE.NONE;
  },
};
