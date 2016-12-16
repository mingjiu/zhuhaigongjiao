var express = require('express');
var app = express();
var zhbusHttp = require('./zhbusHttp');
var qs = require('querystring');
var apiMap = require('./apiMap');
var _ = require('underscore');

app.get('/', function(req, res){
    res.send('connectted')
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
    console.log('zhbus api 8888');
});
