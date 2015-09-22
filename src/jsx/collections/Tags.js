var Backbone = require('backbone');
var _ = require('underscore');
var Tag = require('./../models/Tag');
var ItemConstants = require('./../constants/ItemConstants');
require('backbone.localstorage');
Backbone.$ = require('jquery');

module.exports = Backbone.Collection.extend({

  model: Tag,

  localStorage: new Backbone.LocalStorage('Tags'),

  initialize: function (opt, options) {

    this.dispatcher = options.dispatcher;
    this.dispatcher.register(this.onDispatcher.bind(this));

  },

  // Register to handle all updates
  onDispatcher: function (payload) {

    var action = payload.action;

    switch (action.actionType) {
      case ItemConstants.ITEM_SAVE:

        this.saveTags(action.model);
        this.cleanUpOldRefsToItem(action.model);
        this.removeTagsWithNoItems(action.model);
        break;
      case ItemConstants.ITEM_DESTROY:

        this.removeRefToItem(action.model);
        this.removeTagsWithNoItems(action.model);
        break;
      default:
        return true;
    }

    return true; //Needed by promise in Dispatcher

  },

  removeRefToItem: function (item) {

    this.each(function (tag) {

      var isItemInTag = _.contains(tag.get('itemIds'), item.id);

      if (isItemInTag) {
        tag.set('itemIds', _.difference(tag.get('itemIds'), [item.id]));
      }

    }, this);

  },

  cleanUpOldRefsToItem: function (item) {

    this.each(function (tag) {
      var isItemInTag = _.contains(tag.get('itemIds'), item.id);
      var isTagInItem = _.contains(item.tags.slice().split(','), tag.get('label'));

      if (isItemInTag && !isTagInItem) {
        tag.set('itemIds', _.difference(tag.get('itemIds'), [item.id]));
      }

    }, this);

  },

  removeTagsWithNoItems: function (item) {

    var oldTags = this.filter(function (tag) {
      return tag.get('itemIds').length === 0;
    }, this);

    _.each(oldTags, function (tag) {
      tag.destroy();
    });

    this.remove(oldTags);

  },

  addItem: function (item) {

    var tag = this.findWhere({label: item.label});
    if (tag) {
      if (!item.itemIds) {
        return tag;
      }

      //update existing tag
      tag.set('itemIds', _.union(tag.get('itemIds'), item.itemIds));
      tag.save();

    } else {
      //create new
      this.create(item);
    }
  },

  //add or update tags
  saveTags: function (item) {

    if (item.tags.length === 0) {
      return;
    }

    var itemTags = item.tags.slice().split(',');

    _.each(itemTags, function (label) {
      var tag = this.addItem({label: label, itemIds: [item.id]});
    }, this);

  }

});