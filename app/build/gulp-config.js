var dest = '../../public';

module.exports = {
	less: {
		dest: dest + '/less',
		watch: [
			'*.less'
		]
	},
	browserify: {
		debug: true,
		bundleConfig: {
			jsDir: dest + '/js',
			entries: [
				'../router/client/router.js',
				'../pages/user/view/client/user-view.jsx',
				'../pages/settings/view/client/settings-view.jsx'
			],
			/* Must match the order of entries */
			outputs: [
				dest + '/js/router.js',
				dest + '/js/user.js',
				dest + '/js/settings.js'
			]
		}
	}
}