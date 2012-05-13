THREE.PyramidGeometry = function(width, length, height) {
  THREE.Geometry.call(this);

  var x = width / 2;
  var z = length / 2;
  var y = height;

  var vertices = this.vertices;
  vertices.push(new THREE.Vector3(x, 0, z));
  vertices.push(new THREE.Vector3(-x, 0, z));
  vertices.push(new THREE.Vector3(-x, 0, -z));
  vertices.push(new THREE.Vector3(x, 0, -z));
  vertices.push(new THREE.Vector3(0, y, 0));

  var faces = this.faces;
  faces.push(new THREE.Face4(0, 1, 2, 3));
  faces.push(new THREE.Face3(0, 4, 1)) ;
  faces.push(new THREE.Face3(1, 4, 2));
  faces.push(new THREE.Face3(2, 4, 3));
  faces.push(new THREE.Face3(3, 4, 0));

  function vertexUv(vertex) {
    var mag = vertex.length();
    return new THREE.UV(vertex.x / mag, vertex.y / mag);
  }

  for (var i = 0; i < faces.length; ++i) {
    var face = faces[i];
    if (face instanceof THREE.Face4) {
      this.faceVertexUvs[0].push([
        vertexUv(vertices[face.a]),
        vertexUv(vertices[face.b]),
        vertexUv(vertices[face.c]),
        vertexUv(vertices[face.d])
      ]);
    } else { // THREE.Face3
      this.faceVertexUvs[0].push([
        vertexUv(vertices[face.a]),
        vertexUv(vertices[face.b]),
        vertexUv(vertices[face.c])
      ]);
    }
  }

  this.computeCentroids();
  this.computeFaceNormals();
  this.computeVertexNormals();
};

THREE.PyramidGeometry.prototype = new THREE.Geometry();
THREE.PyramidGeometry.prototype.constructor = THREE.PyramidGeometry;
