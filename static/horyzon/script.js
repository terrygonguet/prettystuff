AFRAME.registerComponent('tetra', {
  schema: {type: 'number', default: 5},
  init: function () {
    this.angle = $V([0,this.data,0]);
    const tetra = new THREE.Geometry();
    tetra.vertices.push(new THREE.Vector3(...this.angle.elements));
    this.angle = this.angle.rotate(0.666 * Math.PI, Line.Z);
    tetra.vertices.push(new THREE.Vector3(...this.angle.elements));
    this.angle = this.angle.rotate(0.666 * Math.PI, Line.Z);
    tetra.vertices.push(new THREE.Vector3(...this.angle.elements));
    tetra.faces.push( new THREE.Face3( 0, 1, 2 ) );
    const wireframe = new THREE.EdgesGeometry(tetra);
    const lineMaterial = new THREE.LineBasicMaterial({
      color: "red",
      linewidth:1
    });
    const mesh = new THREE.LineSegments(wireframe, lineMaterial);
    this.el.setObject3D("mesh", mesh);
  }
});

AFRAME.registerComponent('tripoint', {
  schema: {type: 'number', default: 5},
  init: function () {
    this.angle = $V([0,this.data,0]);
    const tetra = new THREE.Geometry();
    tetra.vertices.push(new THREE.Vector3(...this.angle.elements));
    this.angle = this.angle.rotate(0.666 * Math.PI, Line.Z);
    tetra.vertices.push(new THREE.Vector3(...this.angle.elements));
    this.angle = this.angle.rotate(0.666 * Math.PI, Line.Z);
    tetra.vertices.push(new THREE.Vector3(...this.angle.elements));
    const dotMaterial = new THREE.PointsMaterial( { size: 2, sizeAttenuation: false, color: "#EEE" } );
    const mesh = new THREE.Points(tetra, dotMaterial);
    this.el.setObject3D("mesh", mesh);

    setTimeout(() => {
      this.el.parentNode.removeChild(this.el);
    }, 10000);
  }
});

AFRAME.registerComponent('chemtrail', {
  schema: {},
  init: function () {
    this.time = 0;
  },
  tick: function (time, delta) {
    if ((this.time += delta) >= 100) {
      this.time = 0;
      const el = document.createElement("a-entity");
      el.setAttribute("position", this.el.getAttribute("position"));
      el.setAttribute("rotation", this.el.getAttribute("rotation"));
      el.setAttribute("tripoint", 1.7);
      document.querySelector("a-scene").appendChild(el);
    }
  }
});

AFRAME.registerComponent('rotator', {
  schema: { type:'number' },
  init: function () {
    this.angle = 0;
  },
  tick: function (time, delta) {
    (this.angle += delta / 1000 * this.data) > 360 && (this.angle = 0);
    const rot = this.el.getAttribute("rotation");
    rot.z = this.angle;
    this.el.setAttribute("rotation", rot);
  },
});

AFRAME.registerComponent('rocketship', {
  schema: { type:'number' },
  init: function () {

  },
  tick: function (time, delta) {
    const pos = this.el.getAttribute("position");
    pos.z += delta / 1000 * this.data;
    this.el.setAttribute("position", pos);
  },
});
