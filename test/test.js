var assert = require("assert");
var pHash = require('..');

var examples = [{
  path: "./examples/a.jpg",
  hash: "0x27166fd624cb9439"
}, {
  path: "./examples/c.png",
  hash: "0xd63078d8de3236c6"
}, {
  path: "./examples/d.jpg",
  hash: "0xa71a2de6269b9469"
}];

describe("pHash", function() {
  // https://github.com/aaronm67/node-phash/issues/8
  describe("invalid file test", function() {
    it("should fail", function(done) {
      pHash("fake/path/here", function(err, hash) {
        assert(err);
        done();
      });
    });
  })

  describe("async test", function() {
    var test = examples[0];
    examples.forEach(function(i) {
      it('cb:' + i.path, function(done) {
        pHash(i.path, function(err, hash) {
          if (err) {
            done(err);
          }

          assert.equal(i.hash, hash);
          done();
        });
      });

      it('promise:' + i.path, function() {
        return pHash(i.path).then(function (hash) {
          assert.equal(i.hash, hash);
        });
      });
    });

    it("cb: should fail", function(done) {
      pHash("../examples/f.png", function(err, hash) {
        assert(err);
        done();
      });
    });

    it("promise: should fail", function() {
      return pHash("../examples/f.png").then(function () {
        throw new Error('boom');
      }).catch(function (err) {
        assert(err.message !== 'boom');
      })
    });
  });

  // describe('hammingDistance()', function() {
  //   it('should be done', function() {
  //     var hammingAB = pHash.hammingDistance(examples[0].hash, examples[1].hash);
  //     var hammingAC = pHash.hammingDistance(examples[0].hash, examples[2].hash);
  //     var hammingBC = pHash.hammingDistance(examples[1].hash, examples[2].hash);
  //     var hammingAD = pHash.hammingDistance(examples[0].hash, examples[3].hash);
  //     assert.equal(hammingAB, 0);
  //     assert.equal(hammingAC, 38);
  //     assert.equal(hammingBC, 38);
  //     assert.equal(hammingAD, 12);
  //   });
  // });
});
