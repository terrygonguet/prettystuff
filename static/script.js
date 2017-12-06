AFRAME.registerComponent('rotator', {
  schema: {},
  init: function () {
    this.angle = 0;
  },
  update: function () {},
  tick: function (time, delta) {
    this.angle += 10 * delta / 1000;
    this.angle >= 360 && (this.angle = 0);
    this.el.setAttribute("rotation", "35 " + this.angle + " 45");
  },
  remove: function () {},
  pause: function () {},
  play: function () {}
});
