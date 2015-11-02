var React = require('react');
var emitter = require('central-event');
var createFragment = require('react-addons-create-fragment');

var SettingsView = React.createClass({
	componentWillMount: function () {
		console.log('settings will mount');
	},
	componentDidMount: function () {
		console.log('settings did mount');
	},
	clicked: function () {
		alert('clicked');
		emitter.emit('clicked' , {source: 'Settings'});
	},
	render: function () {
		console.log('---', this.props.data);
		var propsFlag = createFragment({
			props: this.props.data.accountSettings.content.body
		});
		return (
			<div onClick={this.clicked}>
				{propsFlag}
				Settings
			</div>
		);
	}
});

module.exports = SettingsView;