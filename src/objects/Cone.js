Visual.Cone = function(scene, opts) {
  opts = opts || {};

  opts.topRadius = 0;

  Visual.Cylinder.call(this, scene, opts);
};

Visual.Cone.prototype = Object.create(Visual.Cylinder.prototype, {
  constructor: {
    value: Visual.Cone
  }
})

Visual.registerObject('cone', Visual.Cone);
