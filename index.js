var express = require('express');
var app = express();
app.use(express.static('public'));
var zhbusHttp = require('./module/zhbusHttp');
var apiMap = require('./module/apiMap');
var _ = require('underscore');
var qs = require('querystring');

app.get('/', function(req, res){
    res.sendFile(__dirname + '/index.html');
});

_.each(apiMap, function(api){
    var a = app.get(api.link, function(request, response){
        zhbusHttp.get({
            api: api,
            data: request.query
        }, function(result){
            response.send(result);
        });
    });
});

var server = app.listen(8888, function () {
    var host = server.address().address;
    var port = server.address().port;
    console.log('8888');
});
