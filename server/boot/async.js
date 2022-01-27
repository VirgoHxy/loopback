'use strict';

module.exports = function(app, callback) {
  setTimeout(function() {
    console.log('不阻塞');
    callback();
  }, 3000);
};
