AFRAME.registerComponent('sea', {
  schema: {
    width: { type:'int', default:10 },
    height: { type:'int', default:10 },
    side: { type:'number', default:1 },
    attenuation: { type:'number', default:0.5 },
    elasticity: { type:'number', default:10 }
  },
  init: function () {
    this.points = [];
    for (var i = 0; i < this.data.width; i++) {
      this.points.push([]);
      for (var j = 0; j < this.data.height; j++) {
        this.points[i].push({
          // height: Math.random() * 3 - 1.5,
          height: 0,
          time: 0,
          start: Math.random() * 2 - 1
        });
      }
    }
    this.offset = $V([
      -(this.data.width - 1) / 2 * this.data.side, 0, -(this.data.height - 1) / 2 * this.data.side
    ]);
    this.refresh();
  },
  refresh: function () {
    const lineMaterial = new THREE.LineBasicMaterial({ color:"#0F0" });

    for (var i = 0; i < this.data.width; i++) {
      const horiz = new THREE.Geometry();
      for (var j = 0; j < this.data.height; j++) {
        horiz.vertices.push(new THREE.Vector3(...$V([i * this.data.side, this.points[i][j].height * this.data.side, j * this.data.side]).add(this.offset).elements));
      }
      var obj = this.el.getObject3D(`linehoriz${i}`);
      obj && obj.geometry.dispose();
      this.el.setObject3D(`linehoriz${i}`, new THREE.Line(horiz, lineMaterial));
    }

    for (var i = 0; i < this.data.height; i++) {
      const vert = new THREE.Geometry();
      for (var j = 0; j < this.data.width; j++) {
        vert.vertices.push(new THREE.Vector3(...$V([j * this.data.side, this.points[j][i].height * this.data.side, i * this.data.side]).add(this.offset).elements));
      }
      var obj = this.el.getObject3D(`linevert${i}`);
      obj && obj.geometry.dispose();
      this.el.setObject3D(`linevert${i}`, new THREE.Line(vert, lineMaterial));
    }
  },
  tick: function (time, delta) {
    var changed = false;
    for (var i = 0; i < this.data.width; i++) {
      for (var j = 0; j < this.data.height; j++) {
        var pt = this.points[i][j];
        pt.time += delta;
        pt.start += (Math.random() - 0.5) / 1000;
        // if (Math.random() * delta < 0.001) pt.time = 0;
        // pt.height = (this.data.attenuation ** (pt.time/1000)) * Math.sin((pt.time/1000 + pt.start)*this.data.elasticity);
        pt.height = Math.sin((pt.time/1000 + pt.start)*this.data.elasticity) * this.data.attenuation;
        if (Math.abs(pt.height) > 0.001) changed = true;
      }
    }
    changed && this.refresh();
  }
});
