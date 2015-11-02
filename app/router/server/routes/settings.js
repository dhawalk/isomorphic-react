var SettingsController = require('./../../../pages/settings/controller/settings-controller.js');

var Settings = {
	handle: function (req, res, next) {
		SettingsController.handle(req, res, next);
	}
}
module.exports = Settings;