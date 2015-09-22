var AmpersandRouter = require('ampersand-router');
var RouterConstants = require('./constants/RouterConstants');

var Router = AmpersandRouter.extend({

	routes: {
		'items(/:id)': 'items',
		'tags': 'tags',
		'current': 'current',
		'*default': 'onDefault'
	},

	initialize: function(options) {
		
		this.dispatcher = options.dispatcher;
		this.dispatcher.register(this.onDispatcher.bind(this));

	},

	onDispatcher: function(payload) {

		var action = payload.action;

		if(action.actionType === RouterConstants.NAVIGATE_TO) {
				this.navigate(action.url, {trigger: true});
		}

		return true; 

	},

	onDefault: function() {

		this.navigate('itmes', {trigger: true});
		
	}

});

module.exports = Router;