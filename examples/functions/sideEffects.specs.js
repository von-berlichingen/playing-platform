'use strict';
QUnit.module('Side effects are bad.')
QUnit.test('Order WITH unintentional side effects', function(assert) {
  var cartProto = {
    items: [],
    addItem: function addItem(item) {
      this.items.push(item);
    }
  },

  createCart = function (items) {
    var cart = Object.create(cartProto);
    cart.items = Object.create(items);

    return cart;
  },

  // Load cart with stored items
  savedCart = createCart(['apple', 'orange']),

  session = {
    get: function get() {
      return this.cart;
    },
    // Grab the saved cart
    cart: createCart(savedCart.items)
  };

  // addItem gets triggered by an event handler somwhere:
  session.cart.addItem('grapefruit');

  assert.ok(session.cart.items.indexOf('grapefruit')
    !== -1, 'Session cart has grapefruit'); // Pass

  assert.ok(savedCart.items.indexOf('grapefruit')
    === -1 , 'Stored cart is unchanged');
});
