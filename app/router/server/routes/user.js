var UserController = require('./../../../pages/user/controller/user-controller.js');

var User = {
	handle: function (req, res, next) {
		UserController.handle(req, res, next);
	}
}
module.exports = User;