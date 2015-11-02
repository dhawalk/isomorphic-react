var async = require('async');
var centralEmitter = require('central-event');

var AccountSettings = require('../../../components/account-settings/store/account-settings-store');

var dataStructure = {
	accountSettings: {
		loading: -1,
		success: 0,
		content: {

		}
	}
};

var ServerStore = {
	data: dataStructure,
	getData: function (id, callback) {
		var that = this; /*Context bound in controller */
		async.parallel({
			accountSettings: function (callback) {
				AccountSettings.getData(id, callback);
			}
		},
		function (error, results) {
			that.data.accountSettings.content = results.accountSettings;
			that.data.accountSettings.success = 1;
			that.data.accountSettings.loading = 1;
			callback(null, true);
		});
	},
}

var ClientStore = {
	data: dataStructure,
	init: function (emitter) {
		this.emitter = emitter;
		this.attachHandler();
	},
	getData: function () {
		return this.data;
	},
	refreshData: function (newData) {
		if (newData) {
			this.data = newData;
			return;
		}
		var that = this;
		AccountSettings.getData('8', function (a, res) {
			that.data.accountSettings.content = res;
			that.data.accountSettings.success = 1;
			that.data.accountSettings.loading = 1;
			that.emitter.emit('update', true);
		});
	},
	update: function (obj) {
		this.refreshData();
	},
	attachHandler: function () {
		centralEmitter.on('clicked', this.update.bind(this));
	}
}

module.exports = {
	server: ServerStore,
	client: ClientStore
}