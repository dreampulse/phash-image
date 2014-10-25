
var Promise = require('native-or-bluebird');
var pHash = require('./build/Release/pHash');

module.exports = function pHashImage(file, cb) {
  if (cb) return pHash.imageHash(file, cb);

  return new Promise(function (resolve, reject) {
    pHash.imageHash(file, function (err, hash) {
      if (err) return reject(err);
      resolve(hash);
    });
  })
};
