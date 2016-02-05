var express = require('express');
var app = express();
// var morgan = require('morgan');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var controllers = require('./controllers');

app.use(express.static(__dirname + '/public'));
// app.use(morgan('dev'));
app.use(bodyParser.urlencoded({'extended':'true'}));
app.use(bodyParser.json());
app.use(bodyParser.json({ type: 'application/vnd.api+json' }));
app.use(methodOverride('X-HTTP-Method-Override'));

controllers.init(app);

app.use(express.static('public'));

app.listen(8080);
console.log("App listening on port " + 8080);