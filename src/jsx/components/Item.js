/**
 * @jsx React.DOM
 */
var React = require('react/addons');

var Item = React.createClass({

	propTypes: {
		title: React.PropTypes.string.isRequired,
		question: React.PropTypes.string.isRequired,
		onSelectItem: React.PropTypes.func.isRequired,
		active: React.PropTypes.bool
	},

	render: function() {

		var cx = React.addons.classSet;
		var classes = cx({
			'items-list-item': true,
			'list-group-item': true,
			'active': this.props.active
		});

		return (
			<a className={classes} onClick={this._onClick}>
				<h4 id="title" className="list-group-item-heading">{this.props.title}</h4>
				<p id="question" className="list-group-item-text">{this.props.question}</p>
			</a>
		);
	},

	_onClick: function(e, id) {
		this.props.onSelectItem(e, id);
	}
});

module.exports = Item;