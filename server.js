var express = require('express');
var app = express();
var port = process.env.PORT || 3030;
var bodyParser = require('body-parser');
var cors = require('cors');
const serveIndex = require('serve-index');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(cors());


var routes = require('./core/routes');
routes(app);

app.use('/file', express.static('public'), serveIndex('public', {'icons': true}));

app.listen(port);
console.log('server running: ' + port);