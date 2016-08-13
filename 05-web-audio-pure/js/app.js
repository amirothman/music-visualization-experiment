window.onload = init;
var context;
var bufferLoader;

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
  var source1 = context.createBufferSource();
  var source2 = context.createBufferSource();
  source1.buffer = bufferList[0];
  // source2.buffer = bufferList[1];

  source1.connect(context.destination);
  // source2.connect(context.destination);

  var analyser = context.createAnalyser();

  source1.start(0);
  // source2.start(0);
  var freqDomain = new Float32Array(analyser.frequencyBinCount);
  analyser.getFloatFrequencyData(freqDomain);
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
