window.onload = init;
var context;
var bufferLoader;

function init() {
  context = new AudioContext();

  bufferLoader = new BufferLoader(
    context,
    [
      'sound/cello.mp3',
      'sound/drums.mp3',
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
  source2.buffer = bufferList[1];

  source1.connect(context.destination);
  source2.connect(context.destination);
  source1.start(0);
  source2.start(0);
}
