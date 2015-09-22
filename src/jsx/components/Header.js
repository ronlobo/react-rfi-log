/**
 * @jsx React.DOM
 */
var React = require('react/addons');

var Header = React.createClass({

	render: function() {

		var cx = React.addons.classSet;
		var itemsClasses = cx({
			'active': this.props.route === 'items'
		});
		var tagsClasses = cx({
			'active': this.props.route === 'tags'
		});

		return (
			<div>
				<div className="header">
					<ul className="nav nav-pills pull-right">
						<li className={itemsClasses}><a href="#items">Items</a></li>
						<li className={tagsClasses}><a href="#tags">Tags</a></li>
					</ul>
					<h3 className="text-muted">React Items</h3>
				</div>
			</div>
		);
	}
});

module.exports = Header;

