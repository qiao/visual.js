function Visual(opts) {
  return new Visual.Scene(opts);
}

Visual.export = function(moduleNames) {
  var allNames = Object.keys(Visual);

  // if no argument is given, then export all modules
  if (typeof moduleNames === 'undefined') {
    moduleNames = allNames;
  }

  // export modules
  moduleNames.forEach(function(name) {
    if (allNames.indexOf(name) !== -1) {
      window[name] = Visual[name];
    }
  });
};
