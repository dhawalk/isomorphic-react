var http = require('http');

var UserPhotosStore = {
	getData: function (callback) {
		var options = {
			host: 'jsonplaceholder.typicode.com',
			path: '/posts/1',
			method: 'GET'
		}
		console.log('one going out...');
		http.request(options, function(res) {
			res.setEncoding('utf8');
			res.on('data', function (chunk) {
					console.log('one got in...');
					callback(null, JSON.parse(chunk));
			});
		}).end();
	}
}

module.exports = {
	getData: UserPhotosStore.getData
}