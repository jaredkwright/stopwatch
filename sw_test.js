var SW = require('./stopwatch');
var sw = new SW();
sw.start();
setTimeout(function() {
  sw.tag('foo');
  setTimeout(function() {
    sw.tag('bar');
    setTimeout(function() {
      sw.tag('baz');
      sw.stop();
      sw.log();
    }, 300);
  }, 100);
}, 200);
