var UserStore = require('../store/user-store').server;
var UserView = require('../view/user-view.jsx');
var async = require('async');
var UserController = {
	handle: function (req, res, next) {
		async.series([
			UserStore.getData.bind(UserStore)
		],
		function (error, results) {
			var markup = UserView.getMarkup(UserStore.data);
			res.render('user/view/user', {
				markup: markup,
				data: JSON.stringify(UserStore.data)
			});
		});
		
	}
}

module.exports = UserController