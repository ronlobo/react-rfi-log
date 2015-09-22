/**
 * @jsx React.DOM
 */
var React = require('react');
var _ = require('underscore');

var TagsScreen = React.createClass({

	render: function() {

		var node = _(this.props.tags).map(function(tag, i) {
			var href = '#items?tag='+tag.label;
			return <li key={tag.label}><a href={href}><span className="badge pull-right">{tag.itemIds.length}</span>{tag.label}</a></li>;
		}, this);

		return (
			<div>
				<div className="page-header">
					<h1>Tags</h1>
				</div>
				<div className="row">
					<ul className="nav nav-pills">{node}</ul>
				</div>
			</div>
		);
	}
});

module.exports = TagsScreen;
