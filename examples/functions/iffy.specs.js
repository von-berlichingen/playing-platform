'use strict';

QUnit.module ('Immediately invoked function expression');

QUnit.test('Prototypes without IIFE.', function(assert) {
  var Lightbulb = function() {
    this.isOn = false;
  },
    lightbulb = new Lightbulb();

  Lightbulb.prototype.toggle = function() {
    this.isOn = !this.isOn;

    return this.isOn;
  }

  Lightbulb.prototype.getState = function getState() {
    // Implementation...
  };

  Lightbulb.prototype.off = function off () {
    // Implementation...
  };

  Lightbulb.prototype.on = function on () {
    // Implementation...
  };

  Lightbulb.prototype.blink = function blink() {
    // Implementation...
  };

  assert.equal(lightbulb.toggle(), true, 'lightbulb'
  + ' turns on.');

  assert.equal(lightbulb.toggle(), false, 'lightbulb'
  + ' turns off.');
});

QUnit.test('Prototypes with IIFE', function(assert) {
  (function(){
    var isOn = false,
      toggle = function toggle() {
        isOn = !isOn;

        return isOn;
      },
      getState = function getState() {
        // Implementation...
      },
      off = function off() {
        // Implementation...
      },
      on = function on() {
        // Implementation...
      },
      blink = function blink() {
        // Implementation...
      },

      lightbulb = {
        toggle: toggle,
        getState: getState,
        off: off,
        on: on,
        blink: blink
      };

    assert.equal(lightbulb.toggle(), true, 'lightbulb'
    + ' turns on.');

    assert.equal(lightbulb.toggle(), false, 'lightbulb'
    + ' turns of.');
  }());
});
