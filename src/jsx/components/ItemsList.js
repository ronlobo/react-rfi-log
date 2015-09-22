/**
 * @jsx React.DOM
 */
var React = require('react');
var Item = require('./Item');
var _ = require('underscore');

var ItemsList = React.createClass({

	propTypes: {
		selectedId: React.PropTypes.string
	},

	render: function() {

		var node = _(this.props.items).map(function(item, i) {
			return <Item {...item} key={item.id} active={this.props.selectedId===item.id} onSelectItem={this._onSelectItem} />;
		}, this);

		return (
			<div className="list-group">{node}</div>
		);
	},

	_onSelectItem: function(e, id) {

		var modelId = id.substr(id.lastIndexOf('$')+1, id.length);
		this.props.onSelect(e, modelId);

	}
});

module.exports = ItemsList;