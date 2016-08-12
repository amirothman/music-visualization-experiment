var soundFile, drums, cello;
var amplitude;
var mapMax = 1.0;


function preload() {
  soundFile = loadSound("../sound/korek_lubang_bontot_perut_senak.mp3")
  // createCanvas(200, 200, WEBGL);
  // drums = loadSound("../sound/cello.mp3")
  // cello = loadSound("../sound/drums.mp3")
}

function setup() {
  // c = createCanvas(windowWidth, windowHeight);
  // background(0);
  // fill(255);
  // noStroke();

  soundFile.play();
  // drums.play();
  // cello.play();
  amplitude = new p5.Amplitude();
  amplitude.setInput(soundFile);
  // amplitude_drums = new p5.Amplitude();
  // amplitude_drums.setInput(drums);
  //
  // amplitude_cello = new p5.Amplitude();
  // amplitude_cello.setInput(cello);
}

function draw() {
  // background(0);
  //
  var level = amplitude.getLevel();
  // var level_2 = amplitude_drums.getLevel();
  // soundFile.setVolume(0)
  // console.log(level);
  // text('Amplitude: ' + level, 20, 20);
  // text('mapMax: ' + mapMax, 20, 40);
  //
  // // // map ellipse height
  // box(1000*level);
  // box(4000*level_2);
  // // rotate(radians(level));
  // var ellipseHeight = map(level, 0, mapMax, height, 0);
  // ellipse(width/2, ellipseHeight, 100, 100);
}

$( window ).keypress(function() {
  if (soundFile.isPlaying()){
    soundFile.pause();
  } else if (soundFile.isPaused())
  {
    soundFile.play();
  }
});
