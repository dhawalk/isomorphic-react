var SettingsStore = require('../store/settings-store').server;
var SettingsView = require('../view/settings-view.jsx');
var async = require('async');
var SettingsController = {
	handle: function (req, res, next) {
		async.series([
			function (callback) {
				SettingsStore.getData('1', callback)
			}
		],
		function (error, results) {
			//Get Data
			var markup = SettingsView.getMarkup(SettingsStore.data);

			//Render Data
			res.render('settings/view/settings', {
				markup: markup,
				data: JSON.stringify(SettingsStore.data)
			});
		});
		
	}
}

module.exports = SettingsController