var React = require('react');
var createFragment = require('react-addons-create-fragment');

var UserView = React.createClass({
	componentWillMount: function () {
		console.log('user will mount');
	},
	componentDidMount: function () {
		console.log('iser did mount');
	},
	clicked: function () {
		alert('clicked');
	},
	render: function () {
		console.log('~~~', this.props);
		var propsFrag = createFragment({
			props: this.props.data.photos.content.body
		})
		return (
			<div onClick={this.clicked}>
				{propsFrag}
				User
			</div>
		);
	}
});

module.exports = UserView;