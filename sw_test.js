var SW = require('./stopwatch');
var sw = new SW();
sw.start();
setTimeout(function() {
  sw.tag('foo');
  setTimeout(function() {
    sw.tag('bar');
    setTimeout(function() {
      sw.tag('bazbazbaz');
      setTimeout(function(){
        sw.stop();
        sw.log();
      }, 50);
    }, 320);
  }, 10);
}, 20);
