'use strict';

QUnit.module('Function declaration and function expression');

QUnit.skip('Conditional function declaration', function(assert) {
  var score = 6;

  if (score > 5) {
    function grade() {
      return 'pass';
    }
  } else {
    function grade() {
      return 'fail'
    }
  }

  assert.equal(grade(), 'pass', 'Grade should pass');
});

QUnit.test('Name function expression', function(assert) {
  var a = function x() {
    assert.ok(x, 'x() is usable inside the function');
  };

  a();

  try {
    x(); //error
  } catch(e) {
    assert.ok(true, 'x() is undefined outside the function.');
  }
});

QUnit.test('Function scope', function(assert) {
  var testDeclaration = false,
    foo;

  // This function gets erroneously overriden in IE8.
  function bar(arg1, bleed) {
    console.log({arg1: arg1, bleed: bleed});
    if (bleed) {
      assert.ok(false, 'Declaration bar() should NOT be callable'
      + ' inside the expression.');
    } else {
      assert.ok(true, 'Declaration bar should be called outside'
      + ' the expression.');
    }

    testDeclaration = true;
  }

  foo = function bar(declaration, recurse) {
    console.log({declaration: declaration, recurse: recurse});
    if (recurse) {
      assert.ok(true, 'Expression bar() should'
      + ' support scope safe recursion');
    } else if (declaration === true) {
      assert.ok(true, 'Expression bar() should be'
      + ' callable via foo');
      bar(false, true);
    } else {
      // Fails in IE8 and older
      assert.ok(false, 'Expression bar() should'
      + ' NOT be callable outside the expression.');
    }
  };

  bar();
  foo(true);

  // Fails in IE8 and older
  assert.ok(testDeclaration, 'The bar() declaration should NOT get'
  + ' get overriden by the expression bar().');
});
