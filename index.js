
var Promise = require('native-or-bluebird');
var pHash = require('./build/Release/pHash');

exports.imageHash = function(file, cb) {
  if (cb) return pHash.imageHash(file, cb);

  return new Promise(function (resolve, reject) {
    pHash.imageHash(file, function (err, hash) {
      if (err) return reject(err);
      resolve(hash);
    });
  })
};

exports.hammingDistance = function(hasha, hashb) {
  return pHash.hammingDistance(hasha, hashb);
};
