AFRAME.registerComponent('triangle', {
  schema: { type:'number' },
  init: function () {
    var dist = $V([0,this.data,0]);
    const triangle = new THREE.Geometry();
    const edges = new THREE.Geometry();
    triangle.vertices.push(new THREE.Vector3(...dist.elements));
    edges.vertices.push(new THREE.Vector3(...dist.x(1.05).elements));
    dist = dist.rotate(2/3 * Math.PI, Line.Z);
    triangle.vertices.push(new THREE.Vector3(...dist.elements));
    edges.vertices.push(new THREE.Vector3(...dist.x(1.05).elements));
    dist = dist.rotate(2/3 * Math.PI, Line.Z);
    triangle.vertices.push(new THREE.Vector3(...dist.elements));
    edges.vertices.push(new THREE.Vector3(...dist.x(1.05).elements));
    triangle.faces.push( new THREE.Face3( 0, 1, 2 ) );
    triangle.faces.push( new THREE.Face3( 2, 1, 0 ) );
    edges.faces.push( new THREE.Face3( 0, 1, 2 ) );
    const wireframe = new THREE.EdgesGeometry(edges);

    const lineMaterial = new THREE.LineBasicMaterial({
      color: "#F00",
      linewidth:1
    });
    const faceMaterial = new THREE.MeshBasicMaterial({
      color: "#000"
    });

    this.el.setObject3D("wireframe", new THREE.LineSegments(wireframe, lineMaterial));
    this.el.setObject3D("face", new THREE.Mesh(triangle, faceMaterial));
  }
});

AFRAME.registerComponent('bigtriangle', {
  schema: { type:'int' },
  init: function () {
    for (var i = 0; i < this.data; i++) {
      for (var j = 0; j < this.data - i; j++) {
        var pos = { x:0, y:(-this.data + i) * 0.15 + 0.106 * this.data, z:0 };
        if ((this.data - i) % 2 === 0) {
          pos.x = (((-this.data + i) / 2) + j + 0.5) * 0.17;
        } else {
          pos.x = (Math.ceil((-this.data + i) / 2) + j) * 0.17;
        }
        const triangle = document.createElement("a-entity");
        triangle.setAttribute("triangle", "0.1");
        triangle.setAttribute("position", pos);
        triangle.setAttribute("animation", {
          property: "rotation",
          from: "0 0 0",
          to: "0 0 -120",
          easing: "easeInOutQuart",
          dur: "1500",
          loop: "true"
        });
        this.el.appendChild(triangle);
      }
    }
  }
});

AFRAME.registerComponent('tourbilol', {
  schema: { type:'int' },
  init: function () {
    this.x = Math.floor(Math.random() * 360);
    this.y = Math.floor(Math.random() * 360);
    this.z = Math.floor(Math.random() * 360);
    this.angle = 0;
  },
  tick: function (time, delta) {
    (this.angle += delta / this.data) > 360 && (this.angle = 0);
    this.el.setAttribute("rotation", {
      x: this.x + this.angle,
      y: this.y + this.angle,
      z: this.z + this.angle
    });
  }
});
