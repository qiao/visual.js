Visual.Util = {
  inherits: function(ctor, superCtor) {
    ctor.super_ = superCtor;
    ctor.prototype = Object.create(superCtor.prototype, {
      constructor: {
        value: ctor,
        enumerable: false,
        writable: true,
        configurable: true
      }
    });
  },
  toVector3: function(vec3) {
    if (vec3 instanceof THREE.Vector3) {
      return vec3;
    }
    // assuming vec3 is an array-like object
    return new THREE.Vector3(vec3[0], vec3[1], vec3[2]);
  },
};
