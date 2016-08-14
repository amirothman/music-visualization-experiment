

var width = window.innerWidth*0.99,
    height = window.innerHeight*0.99,
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

var c10 = d3.scale.linear().domain([0,1024]).range(["#1f77b4","#d62728"]);
var context2d = canvas.node().getContext("2d");

// context2d.strokeStyle = "#666";
context2d.strokeWidth = 0;

context2d.globalAlpha = 0.8;
context2d.globalCompositeOperation = "screen";

var data = d3.range(1024).map(function() {
  return {xloc: 0, yloc: 0, xvel: 0, yvel: 0};
});
