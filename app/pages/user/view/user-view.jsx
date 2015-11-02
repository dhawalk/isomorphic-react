var React = require('react');
var User = require('./user-shared.jsx');
var ReactDOMServer = require('react-dom/server');
var ReactDOM = require('react-dom');

module.exports = {
	//Setver
	getMarkup: function (data) {
		var UserSharedViewFactory = React.createFactory(User);
		return ReactDOMServer.renderToString(
			UserSharedViewFactory({data: data})
		);
	},

	// Client
	run: function (store) {
		this.store = store;
		this.updateView();
	},
	updateView: function () {
		this.render(this.store.getData());
	},
	render: function (storeData) {
		ReactDOM.render(<User data={storeData}  />, document.getElementById('container'));
	}
}