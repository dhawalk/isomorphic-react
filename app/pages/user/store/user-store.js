var async = require('async');
var centralEmitter = require('central-event');

var UserPhotos = require('../../../components/user/photos/store/user-photos-store');
var UserPosts = require('../../../components/user/posts/store/user-posts-store');

var dataStructure = {
	photos: {
		loading: -1,
		success: 0,
		content: {

		}
	},
	posts: {
		loading: -1,
		success: 0,
		content: {
			
		}
	}
}
var ServerStore = {
	data: dataStructure,
	getData: function (callback) {
		var that = this; /*Context bound in controller */
		async.parallel({
			photos: UserPhotos.getData,
			posts: UserPosts.getData
		},
		function (error, results) {
			that.data.photos.content = results.photos;
			that.data.photos.loading = 1;
			that.data.photos.success = 1;

			that.data.posts.content = results.posts;
			that.data.posts.loading = 1;
			that.data.posts.success = 1;

			callback(null, true);
		});
	}
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
		UserPhotos.getData(function (nll, res) {
			that.data.photos.content = res;
			that.data.photos.loading = 1;
			that.data.photos.success = 1;
			that.emitter.emit('update', true);
		});


		UserPosts.getData(function (nll, res) {
			that.data.posts.content = res;
			that.data.posts.loading = 1;
			that.data.posts.success = 1;
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