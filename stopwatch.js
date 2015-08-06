var printf = require('printf');

var TimeLineEvent = function(tag, time) {
  this.tag = tag;
  this.time = time || new Date().getTime();

  return this;
}

var StopWatch = function() {
  this.startTime = undefined;
  this.endTime = undefined;
  this.timeLine = [];
  var me = this;

  this.start = function() {
    var time = new Date().getTime();
    me.startTime = time;
    me.timeLine.push(new TimeLineEvent('Start Timer', time));
    return;
  };

  this.stop = function() {
    if (!me.startTime) {
      throw new Error('You must start the StopWatch before you can stop it!');
    } else {
      var time = new Date().getTime();
      me.endTime = time;
      me.timeLine.push(new TimeLineEvent('End Timer', time));
    }
  };

  this.tag = function(tag) {
    me.timeLine.push(new TimeLineEvent(tag));
  };

  this.log = function() {
    if (!me.startTime) {
      throw new Error('You must start the StopWatch before you can logTimeLine!');
    }
    if (!me.endTime) {
      throw new Error('You must stop the StopWatch before you can logTimeLine!');
    }
    var printString = printf('%-25s%-25s%-25s', 'Elapsed', 'Delta', 'Tag');
    printString = [printString, printf('------------------------------------------------------------------------------------')].join('\n');
    me.timeLine.map(function(tlPoint, index, timeline) {
      var elapsed, difference, tag;
      elapsed = (tlPoint.time - me.startTime) + ' ms';
      difference = (index !== 0) ? (tlPoint.time - timeline[index - 1].time) + ' ms' : ' - ';
      tag = tlPoint.tag;
      printString = [printString, printf('%-25s%-25s%-25s', elapsed, difference, tag)].join('\n');
    });
    printString = [printString, '\nTotal Elapsed Time: ' + (me.endTime - me.startTime) + ' ms'].join('\n');
    console.log(printString);
  };

  this.elapsed = function() {
    if (!me.startTime) {
      throw new Error('You must start the StopWatch before you can getTimeElapsed!');
    }
    var now = (me.endTime) ? me.endTime : new Date().getTime();
    var difference = now - me.startTime;
    return difference;
  }

  this.reset = function() {
    me.startTime = undefined;
    me.endTime = undefined;
    me.timeLine = [];
  }

  return this;
};

module.exports = StopWatch;
