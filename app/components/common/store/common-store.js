var async = require('async');
var centralEmitter = require('central-event');

var CommonStore = {
	init: function (initialData, emitter) {
		this.data = initialData || {};
		this.emitter = emitter;
		
	},
	getData: function () {
		return this.data;
	},
	refreshData: function (newData) {
		if (newData) {
			this.data = newData;
			return;
		}
	},
	attachHandler: function () {
		centralEmitter.on('clicked', function (obj) {
        	console.log('in cmn obj ', obj);
    	});
	}
}

module.exports = {
	init: CommonStore.init,
	getData: CommonStore.getData,
	refreshData: CommonStore.refreshData,
	attachHandler: CommonStore.attachHandler
}