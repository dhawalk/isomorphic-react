var express = require('express');
var path = require('path');
require('node-jsx').install({extension: '.jsx'});

var app = express();

app.set('views', 'app/pages/')
app.set('view engine', 'jade');


app.use(express.static('public', {maxAge: 1000 * 60 * 1}));

var router = require('./app/router/server/router');
app.use('/', router);

app.listen(8888);

