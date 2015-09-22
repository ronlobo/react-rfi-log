var Backbone = require('backbone');

module.exports = Backbone.Model.extend({

	defaults: {
		title: 'Enter a title',
		question: 'Enter a question',
		answer: 'Enter an answer',
		tags: ''
	}

});