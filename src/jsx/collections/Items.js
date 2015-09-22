var ItemConstants = require('./../constants/ItemConstants');
var Backbone = require('backbone');
var Item = require('./../models/Item');
require('backbone.localstorage');
Backbone.$ = require('jquery');

module.exports = Backbone.Collection.extend({

  model: Item,

  localStorage: new Backbone.LocalStorage("Items"),

  initialize: function (opt, options) {

    this.router = options.router;
    this.dispatcher = options.dispatcher;
    this.dispatcher.register(this.onDispatcher.bind(this));

  },

  // Register to handle all updates
  onDispatcher: function (payload) {

    var action = payload.action;

    switch (action.actionType) {
      case ItemConstants.ITEM_CREATE:
        var model = this.create({
          title: 'Question (' + (this.length + 1) + ')'
        }, {at: 0});
        this.router.navigate('items/' + model.id, {trigger: true});
        break;
      case ItemConstants.ITEM_SAVE:
        this.get(action.id).save();
        break;
      case ItemConstants.ITEM_SET:
        this.get(action.id).set(action.attributes);
        break;
      case ItemConstants.ITEM_DESTROY:
        this.get(action.id).destroy();
        break;
      case ItemConstants.ITEM_FETCH:
        this.fetch();
        break;

      default:
        return true;
    }

    return true; // No errors.  Needed by promise in Dispatcher.

  }

});