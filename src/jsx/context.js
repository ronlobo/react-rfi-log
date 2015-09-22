var AppDispatcher = require('./dispatcher/AppDispatcher');
var Items = require('./collections/Items');
var Tags = require('./collections/Tags');
var Router = require('./Router');

var router = new Router({ dispatcher: AppDispatcher });

var itemsStore = new Items([], { dispatcher: AppDispatcher, router: router });
itemsStore.fetch()

.always(function(){
	if(!itemsStore.length) {
		itemsStore.set([
			{
				id: 'cd85ea5a-8736-1dad-3389-a3084b9d9850',
				title: 'Question 1',
				question: 'What is the question 1?',
				answer: '',
				tags: 'concrete,steel joists'
			},
			{
				id: '672dcd3d-fa98-75c6-0405-388ddbb1db9c',
				title: 'Questions 2',
				question: 'What is the question 2?',
        answer: '',
				tags: 'excavator,bucket'
			}
		]);
		itemsStore.each(function(m) { m.save(); });
	}
});


var tagsStore = new Tags([], { dispatcher: AppDispatcher });
tagsStore.fetch()

.always(function() {
	if(!tagsStore.length) {
		tagsStore.set([
			{ label:'concrete', itemIds:['cd85ea5a-8736-1dad-3389-a3084b9d9850'] },
			{ label:'steel joists', itemIds:['cd85ea5a-8736-1dad-3389-a3084b9d9850'] },
			{ label:'bucket', itemIds:['672dcd3d-fa98-75c6-0405-388ddbb1db9c'] },
			{ label:'excavator', itemIds:['672dcd3d-fa98-75c6-0405-388ddbb1db9c'] }
		]);
		tagsStore.each(function(m) { m.save(); });
	}
});


module.exports = {
	itemsStore: itemsStore,
	tagsStore: tagsStore,
	router: router
};