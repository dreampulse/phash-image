
var Promise = require('native-or-bluebird');
var pHash = require('./build/Release/pHash');

module.exports = pHashImage;

function pHashImage(file, cb) {
  var promise = new Promise(function(resolve, reject) {
    pHash.imageHash(file, function(err, hash) {
      if (err) return reject(err);
      resolve(new Buffer(hash.slice(2), 'hex'));
    });
  });

  if (typeof cb === 'function') {
    promise.then(function (hash) {
      cb(null, hash);
    }, cb);
  }

  return promise;
}
