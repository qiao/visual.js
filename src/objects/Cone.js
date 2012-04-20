Visual.Cone = function(scene, opts) {
  opts = opts || {};

  opts.topRadius = 0;

  Visual.Cylinder.call(this, scene, opts);
};

Visual.Util.inherits(Visual.Cone, Visual.Cylinder);

Visual.registerObject('cone', Visual.Cone);
