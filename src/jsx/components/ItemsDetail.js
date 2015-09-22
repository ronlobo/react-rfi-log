/**
 * @jsx React.DOM
 */
var React = require('react/addons');
var _ = require('underscore');
var ItemsActions = require('./../actions/ItemsActions');
var RouterActions = require('./../actions/RouterActions');

var ItemsDetail = React.createClass({

	propTypes: {
		title: React.PropTypes.string.isRequired,
		question: React.PropTypes.string.isRequired,
		answer: React.PropTypes.string,
		tags: React.PropTypes.string
	},

	getInitialState: function() {
		return { 
			title: this.props.title,
			id: this.props.id,
			question: this.props.question,
      answer: this.props.answer,
			tags: this.props.tags
		};
	},

	componentWillReceiveProps: function(nextProps) {
		this.setState({
			title: nextProps.title,
			question: nextProps.question,
      answer: nextProps.answer,
			tags: nextProps.tags,
			id: nextProps.id,
			changed: nextProps.id === this.props.id
		});
	},

	onChangeTitle: function(event) {
		ItemsActions.set(this.state.id, {title: event.target.value});
	},

	onChangeQuestion: function(event) {
		ItemsActions.set(this.state.id, {question: event.target.value});
	},

  onChangeAnswer: function(event) {
    ItemsActions.set(this.state.id, {answer: event.target.value});
  },

	onChangeTags: function(event) {
		ItemsActions.set(this.state.id, {tags: event.target.value});
	},

	onClickDelete: function() {
		ItemsActions.destroy(this.state.id, this.props);
		RouterActions.navigate('items');
	},

	onClickSave: function() {
		ItemsActions.save(this.state.id, this.props);
		this.setState({ changed: false });
	},

	render: function() {

		var cx = React.addons.classSet;
		var saveBtnClasses = cx({
		    'btn': true,
		    'btn-default': true,
		    'disabled': !this.state.changed
		});

		return (
			<div className="row">
				<div className="col-sm-12 col-md-12">
					<div className="row">
						<div className="page-header col-sm-12 col-md-12">
							<button id="removeBtn" type="button" className="btn btn-default pull-right" onClick={this.onClickDelete}><span className="glyphicon glyphicon-minus"></span></button>
						</div>
					</div>
				</div>
				<div className="col-sm-12 col-md-12">
					<div className="row">
						<div className="col-sm-12 col-md-12">
							
							<form className="form-horizontal" role="form">
								<div className="form-group">
									<label htmlFor="inputTitle" className="col-sm-2 control-label">Title</label>
									<div className="col-sm-10">
										<input id="inputTitle" type="text" className="form-control" placeholder={this.state.title} value={this.state.title} onChange={this.onChangeTitle}></input>
									</div>
								</div>
								<div className="form-group">
									<label htmlFor="inputDetails" className="col-sm-2 control-label">Question</label>
									<div className="col-sm-10">
										<textarea id="inputDetails" placeholder={this.state.question} className="form-control" rows="3" value={this.state.question} onChange={this.onChangeQuestion}></textarea>
									</div>
								</div>
                <div className="form-group">
                  <label htmlFor="inputDetails" className="col-sm-2 control-label">Answer</label>
                  <div className="col-sm-10">
                    <textarea id="inputDetails" placeholder={this.state.answer} className="form-control" rows="3" value={this.state.answer} onChange={this.onChangeAnswer}></textarea>
                  </div>
                </div>
								<div className="form-group">
									<label htmlFor="inputTags" className="col-sm-2 control-label">Tags</label>
									<div className="col-sm-10">
										<input id="inputTags" type="text" className="form-control" placeholder="Add tags here (comma delimited)" value={this.state.tags} onChange={this.onChangeTags}></input>
									</div>
								</div>
								<div className="text-right">
									<button type="button" className={saveBtnClasses} onClick={this.onClickSave}>Save</button>
								</div>
							</form>

						</div>
					</div>
				</div>
			</div>
		);
	}
});

module.exports = ItemsDetail;