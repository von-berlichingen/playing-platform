'use strict';

// Lambda is a function that is used as data.
// It can bed used the same way any other expression
// can: as a parameter for another function, the return
// value of a function, or anywhere you mightuse a literal value.

QUnit.module('Lambdas');
QUnit.test('Lambdas', function(assert) {
  var sum = function sum() {
    var result = 0;

    [5, 5, 5].forEach(function addTo(number) {
      result += number;
    });

    return result;
  };

  assert.equal(sum(), 15, 'result should be 15.');

});
