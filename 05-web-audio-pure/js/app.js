window.onload = init;
var context;
var bufferLoader;
var analyser;
var frequencyData;

function init() {
  context = new AudioContext();

  bufferLoader = new BufferLoader(
    context,
    [
      '../sound/cello.mp3',
      '../sound/drums.mp3',
      // '../sound/korek_lubang_bontot_perut_senak.mp3'
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
    source.connect(context.destination);
    // console.log(source.buffer)
    analyser = context.createAnalyser();
    frequencyData = new Uint8Array(analyser.frequencyBinCount);
    source.connect(analyser);
    source.start(0);
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

function renderChart() {
     analyser.getByteFrequencyData(frequencyData);
     console.log(frequencyData);
     requestAnimationFrame(renderChart);
  }
