var AppDispatcher = require('./../dispatcher/AppDispatcher');
var ItemConstants = require('./../constants/ItemConstants');

var ItemsActions = {

	create: function() {
		AppDispatcher.onViewAction({
			actionType: ItemConstants.ITEM_CREATE
		});
	},
	set: function(id, attributes) {
		AppDispatcher.onViewAction({
			actionType: ItemConstants.ITEM_SET,
			id: id,
			attributes: attributes
		});
	},
	save: function(id, model) {
		AppDispatcher.onViewAction({
			actionType: ItemConstants.ITEM_SAVE,
			id: id,
			model: model
		});
	},
	destroy: function(id, model) {
		AppDispatcher.onViewAction({
			actionType: ItemConstants.ITEM_DESTROY,
			id: id,
			model: model
		});
	}
};

module.exports = ItemsActions;
