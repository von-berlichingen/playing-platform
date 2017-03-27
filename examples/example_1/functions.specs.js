'use strict';
var score = 6;

if (score > 5) {
  function grade() {
    return 'pass';
  }
} else {
  function grade() {
    return 'fail';
  }
}

console.log(grade());

QUnit.module('Pass or Fail');

QUnit.test('Conditional function declaration', function(assert) {
  assert.equal(grade(), 'pass', 'Grade should pass.');
});
