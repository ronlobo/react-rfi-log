var AppDispatcher = require('./../dispatcher/AppDispatcher');
var RouterConstants = require('./../constants/RouterConstants');

var RouterController = {

	navigate: function(url) {
		AppDispatcher.onRouterAction({
			actionType: RouterConstants.NAVIGATE_TO,
			url: url
		});
	}

};

module.exports = RouterController;