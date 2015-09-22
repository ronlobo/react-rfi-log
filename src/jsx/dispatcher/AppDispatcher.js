var Dispatcher = require('flux').Dispatcher;
var _ = require('underscore');

var AppDispatcher = _.extend(new Dispatcher(), {

  onViewAction: function (action) {
    console.log('AppDispatcher:onViewAction', action);
    this.dispatch({
      source: 'VIEW_ACTION',
      action: action
    });
  },

  onRouterAction: function (action) {
    console.log('AppDispatcher:onRouterAction', action);
    this.dispatch({
      source: 'ROUTER_ACTION',
      action: action
    });
  }

});

module.exports = AppDispatcher;