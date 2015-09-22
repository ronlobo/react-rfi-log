/**
 * @jsx React.DOM
 */
var React = require('react');
var Header = require('./Header');
var ItemsScreen = require('./ItemsScreen');
var TagsScreen = require('./TagsScreen');
var context = require('./../context');
var _ = require('underscore');

var Application = React.createClass({

  getInitialState: function () {
    return {
      items: context.itemsStore.toJSON(),
      tags: context.tagsStore.toJSON()
    };
  },

  componentDidMount: function () {

    context.itemsStore.on('change remove', this.onStoreChange, this);
    context.tagsStore.on('change remove', this.onStoreChange, this);
    context.router.on('route', this.onRoute, this);
    context.router.history.start();

  },

  componentWillUnmount: function () {

    context.itemsStore.off('change remove', this.onStoreChange, this);
    context.tagsStore.off('change remove', this.onStoreChange, this);
    context.router.off('route', this.onRoute, this);

  },

  onStoreChange: function () {

    this.setState({
      items: context.itemsStore.toJSON(),
      tags: context.tagsStore.toJSON()
    });

  },

  onRoute: function (route, args) {

    if (route === 'items') {

      var hasParams = args.length > 0 && args[args.length - 1] && args[args.length - 1].indexOf('=') > -1;
      var params;

      if (hasParams) {
        params = _.object(_.map(args[args.length - 1].split(','), function (keyVal) {
          return keyVal.split('=');
        }));
      }

      //check if arg is a fragment or a param
      this.setState({
        selectedId: args[0],
        selectedTag: hasParams ? params.tag : void 0,
        route: route
      });

    } else if (route === 'tags') {
      this.setState({
        route: route
      });
    }

  },

  render: function () {

    var section = this.state.route === 'tags' ? <TagsScreen tags={this.state.tags}/> :
      <ItemsScreen items={this.state.items} selectedId={this.state.selectedId}
                      selectedTag={this.state.selectedTag}/>;

    return (
      <div className="row">
        <div className="col-xs-12 col-md-8 col-md-offset-2">
          <nav className="navbar navbar-default" role="navigation">
            <div id="menuArea" className="container-fluid"><Header route={this.state.route}/></div>
          </nav>
          <div id="contentArea">{section}</div>
        </div>
      </div>
    );
  }
});

module.exports = Application;