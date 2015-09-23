/**
 * @jsx React.DOM
 */
var React = require('react');
var ItemsDetail = require('./ItemsDetail');
var ItemsList = require('./ItemsList');
var _ = require('underscore');
var ItemsActions = require('../controllers/ItemsController');
var RouterActions = require('../controllers/RouterController');

var ItemsScreen = React.createClass({

  getInitialState: function() {
      return this.updateState(this.props);
  },

  componentWillReceiveProps: function(nextProps) {
    this.setState(this.updateState(nextProps));
  },

  updateState: function(props) {
    return {
      selectedId: props.selectedId,
      selectedTag: props.selectedTag,
      items: props.selectedTag? _.filter(props.items, function(item) {
        return _.contains(item.tags.split(','), props.selectedTag);
      }) : props.items
    };
  },

  render: function() {

    var selectedItem;

    var detailNode = 'Select a item from the menu';
    var filterNode = '';

    if(this.state.selectedTag) {
      filterNode = <button className="btn btn-success" onClick={this._onRemoveFilter}>
          <span className="glyphicon-class ng-binding">{this.state.selectedTag}</span>
          <span className="glyphicon glyphicon-remove-circle"></span>
      </button>;
    }

    if(this.state.selectedId) {
      selectedItem = _.findWhere(this.props.items, {id: this.state.selectedId});
      detailNode = <ItemsDetail {...selectedItem} />;
    }

    return (
      <div>
        <div className="page-header">
          <h1>Items</h1>
        </div>
        <div className="row">
          <div className="col-md-3">
            <div className="page-header">
              <button id="addItemBtn" type="button" className="btn btn-default" onClick={this._onAddItem}>
                <span className="glyphicon glyphicon-plus"></span>
              </button>
              {filterNode}
            </div>
            <div id="listContainer"><ItemsList items={this.state.items} onSelect={this._onSelectItem} selectedId={this.state.selectedId} /></div>
          </div>
          <div id="detailContainer" className="col-md-9">{detailNode}</div>
        </div>
      </div>
    );
  },

  _onSelectItem: function(e, id) {

    if(this.state.selectedTag) {
      RouterActions.navigate('items/'+ id + '?tag='+this.state.selectedTag);
    }else {
      RouterActions.navigate('items/'+id);
    }

  },

  _onAddItem: function() {
    ItemsActions.create();
  },

  _onRemoveFilter: function() {

    if(this.state.selectedTag && this.state.selectedId) {
      RouterActions.navigate('items/'+this.state.selectedId);
    }else {
      RouterActions.navigate('items');
    }
  }


});

module.exports = ItemsScreen;