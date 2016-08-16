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
    analyser.fftSize = 64;
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

var cirScale = d3.scale.linear().domain([0,63]).range([0,Math.PI*2])

function renderChart() {
//     // console.log()
     analyser.getByteFrequencyData(frequencyData);
    //  var sliced_frequencyData = frequencyData.slice(950,1000)
    //  console.log(frequencyData)
     // <a-sphere position="0 1.25 -1" radius="1.25" color="#EF2D5E"></a-sphere>
     if (firstFrame === true){

    bola = scene.selectAll("a-sphere.muzik").data(frequencyData)
                               .enter()
                               .append("a-sphere").classed("muzik",true)
                               .attr("position","0 2 -5")
                               .attr("radius","0.2")
                               .attr("color","#EF2D5E");
      firstFrame = false;
    }else{
       bola.attr("radius",function(el,idx){
         if(frequencyData[idx]>50){
           return frequencyData[idx]/400;
         } else {
           return 0;
         }
       })

       bola.attr("position",function(el,idx){
         if (frequencyData[idx] > 50){
           var r = 3;
          //  console.log(r,analyser.maxDecibels);
           var theta = cirScale(idx);
           var phi = frequencyData[idx]*(Math.PI*2/100)
           var x = r*Math.cos(theta)*Math.sin(phi)*(1+Math.random()*0.3);
           var y = r*Math.sin(theta)*Math.sin(phi)*(1+Math.random()*0.3);
           var z = r*Math.cos(phi);
          //  console.log(x,y,z)
           return x + ' '+(y+2) + ' '+ (z-5);
          // return "0 0 -100"
        }else{
          return "0 2 -5"
        }

       })
     }

     requestAnimationFrame(renderChart);
  }
