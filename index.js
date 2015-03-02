
var Promise = require('native-or-bluebird');
var pHash = require('./build/Release/pHash');

module.exports = pHashImage;

function pHashImage(file, returnBigInt, cb) {
  if (typeof returnBigInt === 'function') {
    cb = returnBigInt;
    returnBigInt = false;
  }

  var promise = new Promise(function(resolve, reject) {
    pHash.imageHash(file, function(err, hash, bigint) {
      if (err) return reject(err);
      if (returnBigInt === true) return resolve(bigint);
      return resolve(new Buffer(hash.slice(2), 'hex'));
    });
  });

  if (typeof cb === 'function') {
    promise.then(function (hash) {
      cb(null, hash);
    }, cb);
  }

  return promise;
}
