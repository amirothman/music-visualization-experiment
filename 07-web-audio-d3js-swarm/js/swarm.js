

var width = 1400,
    height = 800,
    angle = 2 * Math.PI;

var x = d3.scale.linear()
    .domain([-5,5])
    .range([0, width]);

var y = d3.scale.linear()
    .domain([-5,5])
    .range([0, height]);

var canvas = d3.select("body").append("canvas")
    .attr("width", width)
    .attr("height", height);

var context2d = canvas.node().getContext("2d");

context2d.strokeStyle = "#666";
context2d.strokeWidth = 0;
context2d.globalAlpha = 0.5;
// d3.timer(function() {
//
//
//   time1 = Date.now();
//   fps.text(Math.round(1000 / (time1 - time0)));
//   time0 = time1;
// });
var data = d3.range(400).map(function() {
  return {xloc: 0, yloc: 0, xvel: 0, yvel: 0};
});
