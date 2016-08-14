window.onload = init;
var context;
var bufferLoader;
var analyser;
var frequencyData;


var colorChart;

function init() {
  context = new AudioContext();

  bufferLoader = new BufferLoader(
    context,
    [
      // '../sound/cello.mp3',
      // '../sound/drums.mp3',
      '../sound/korek_lubang_bontot_perut_senak.mp3'
    ],
    finishedLoading
    );

  bufferLoader.load();
}

function finishedLoading(bufferList) {
  // Create two sources and play them both together.

  bufferList.forEach(function(el,idx,arr){

    var source = context.createBufferSource();
    source.buffer = el;
    // console.log(idx);
    source.connect(context.destination);
    // console.log(source.buffer)
    analyser = context.createAnalyser();
    // console.log(analyser.frequencyBinCount);
    frequencyData = new Uint8Array(analyser.frequencyBinCount);
    source.connect(analyser);
    source.start(0);
    colorChart = "steelblue";
    renderChart();
    // analyser.getFloatTimeDomainData(timeDomain);


  });
}

function getFrequencyValue(frequency) {
  var nyquist = context.sampleRate/2;
  var index = Math.round(frequency/nyquist * freqDomain.length);
  return freqDomain[index];
}


window.requestAnimationFrame = (function(){
return window.requestAnimationFrame  ||
  window.webkitRequestAnimationFrame ||
  window.mozRequestAnimationFrame    ||
  window.oRequestAnimationFrame      ||
  window.msRequestAnimationFrame     ||
  function(callback){
  window.setTimeout(callback, 1000 / 60);
};
})();
var yL = d3.scale.linear()
    .domain([0,300])
    .range([0, -height/2]);
var xL = d3.scale.linear()
    .domain([0,300])
    .range([0, 10]);


function renderChart() {
//     // console.log()
     analyser.getByteFrequencyData(frequencyData);
     context2d.clearRect(0, 0, width, height);


     data.forEach(function(d,idx) {
       context2d.fillStyle = c10(idx);
       context2d.opacity
       d.xloc += d.xvel;
       d.yloc += d.yvel;
       d.xvel += 0.04 * (Math.random() - .5) - 0.05 * d.xvel - 0.0005 * d.xloc;
       d.yvel += 0.04 * (Math.random() - .5) - 0.05 * d.yvel - 0.0005 * d.yloc;
       context2d.beginPath();
       context2d.arc(x(d.xloc)+xL(frequencyData[idx])*(Math.random() - .5), y(d.yloc)+yL(frequencyData[idx]), 1 + frequencyData[idx]*200 * Math.abs(d.xvel * d.yvel), 0, angle);
       context2d.fill();
      //  context2d.stroke();
     });

     requestAnimationFrame(renderChart);
  }
