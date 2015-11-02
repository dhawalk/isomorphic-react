var React = require('react');
var Settings = require('./settings-shared.jsx');
var ReactDOMServer = require('react-dom/server');
var ReactDOM = require('react-dom');

module.exports = {
	//Server
	getMarkup: function (data) {
		SettingsSharedViewFactory = React.createFactory(Settings);
		return ReactDOMServer.renderToString(
			SettingsSharedViewFactory({data: data})
		);		
	},

	//Client
	run: function (store) {
		this.store = store;
		this.updateView();
	},
	updateView: function () {
		this.render(this.store.getData());
	},
	render: function (storeData) {
		ReactDOM.render(<Settings data={storeData} />, document.getElementById('container'));
	}
}