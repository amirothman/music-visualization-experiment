window.onload = init;
var context;
var bufferLoader;
var analyser;
var frequencyData;
var firstFrame = true;
var bola;


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

var scene = d3.select("a-scene");
var xScale = d3.scale.linear().domain([0,50]).range([-3,3]);
function renderChart() {
//     // console.log()
     analyser.getByteFrequencyData(frequencyData);
     var sliced_frequencyData = frequencyData.slice(950,1000)
    //  console.log(frequencyData)
     // <a-sphere position="0 1.25 -1" radius="1.25" color="#EF2D5E"></a-sphere>
     if (firstFrame === true){

    bola = scene.selectAll("a-sphere.muzik").data(sliced_frequencyData)
                               .enter()
                               .append("a-sphere").classed("muzik",true)
                               .attr("position",function(el,idx){
                                 // console.log(idx);
                                //  console.log(el);
                                 return xScale(idx)+" "+Math.random()+" -1";
                               })
                               .attr("radius","0.25")
                               .attr("color","#EF2D5E");
      firstFrame = false;
     }else{
       bola.attr("radius",function(el,idx){
        //  console.log(idx);
        var sp = d3.select(this);
        var r = sp.attr("radius");
        // console.log(frequencyData[idx]);
         return frequencyData[idx]/1000;
       })

       bola.attr("position",function(el,idx){
         var x = xScale(idx);
         var y = frequencyData[idx]/100;
         var z = frequencyData[idx]/100;
         return x + ' '+y + ' '+ z;
       })
     }

     requestAnimationFrame(renderChart);
  }
