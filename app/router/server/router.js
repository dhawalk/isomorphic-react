var express = require('express');
var requireDir = require('require-dir');
var router = express.Router();


var routesDir = requireDir('./routes');

router.get('/user', routesDir.user.handle);
router.get('/settings', routesDir.settings.handle);

router.get('/*', routesDir.default.handle);

module.exports = router;