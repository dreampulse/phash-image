var assert = require('assert');
var Promise = require('native-or-bluebird');
var pHash = require('./build/Release/pHash');

module.exports = pHashImage;

pHashImage.compare =
  pHashImage.hammingDistance = hammingDistance;

function pHashImage(file, cb) {
  if (cb) return pHash.imageHash(file, cb);

  return new Promise(function(resolve, reject) {
    pHash.imageHash(file, function(err, hash) {
      if (err) return reject(err);
      resolve(hash);
    });
  });
};

var lookup = {
  '0': '0000',
  '1': '0001',
  '2': '0010',
  '3': '0011',
  '4': '0100',
  '5': '0101',
  '6': '0110',
  '7': '0111',
  '8': '1000',
  '9': '1001',
  'a': '1010',
  'b': '1011',
  'c': '1100',
  'd': '1101',
  'e': '1110',
  'f': '1111',
  'A': '1010',
  'B': '1011',
  'C': '1100',
  'D': '1101',
  'E': '1110',
  'F': '1111'
}

function hexToBinary(s) {
  s = s.replace(/^0x/, '');
  assert(/^[0-9a-fA-F]+$/.test(s));
  var ret = '';
  for (var i = 0; i < s.length; i++) ret += lookup[s[i]];
  return ret;
}

function hammingDistance(a, b) {
  a = hexToBinary(a);
  b = hexToBinary(b);
  var count = 0;
  for (var i = 0; i < a.length; i++)
    if (a[i] !== b[i]) count++;
  return count;
}