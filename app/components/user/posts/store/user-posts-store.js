var http = require('http');

var UserPostsStore = {
	getData: function (callback) {
		var options = {
			host: 'jsonplaceholder.typicode.com',
			path: '/posts/2',
			method: 'GET'
		}
		http.request(options, function(res) {
			res.setEncoding('utf8');
			console.log('two going out...');
			res.on('data', function (chunk) {
					console.log('two got in...');
					callback(null, JSON.parse(chunk));
			});
		}).end();
	}
}

module.exports = {
	getData: UserPostsStore.getData
}