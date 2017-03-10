var express = require('express');
var app = express();
var sha1 = require('sha1');
var config = require('./module/config');
var AT = require('./module/getAccessToken');
var access_token = new AT();
var wechat = require('./module/node-wechat')('ylyl');
var createQRCode = require('./module/qrcode');
var mysql = require('mysql');
var getUnionid = require('./module/getUnionid');

var sqlConnection = mysql.createConnection({
    host: '114.112.65.150',
    user: 'root',
    password: '1234qwerQWER!@#$',
    database:'qipaicocos2dx1'
});

sqlConnection.connect(function(a,b,c){
});
// sqlConnection.query('select unionid from qrcode', function (err, rows, field){
//     console.log(err, rows, field)
// })
app.use(express.static('static'));
app.get('/', function (req, res){
    res.send('success')
})
app.get('/form_wx', function(req, res){
    wechat.checkSignature(req, res);
});
app.post('/form_wx', function(req, res){
    wechat.handler(req, res);
    wechat.text(function (data) {
      var msg = {
        FromUserName : data.ToUserName,
        ToUserName : data.FromUserName,
        MsgType : "text",
        Content: '您好'
      }
      wechat.send(msg);
    });
    wechat.event(function (data) {
        var msg = {
            FromUserName : data.ToUserName,
            ToUserName : data.FromUserName,
            //MsgType : "text",
            // Content : (data.Event == "subscribe") ? "下载链接 http:/test.test" : "欢迎再次订阅"
            Content: data.EventKey
        }
        if(data.Event == 'subscribe'){
            getUnionid(data.FromUserName, access_token.getAT(), function (res, userinfo){
                try {
                    var json = JSON.parse(JSON.parse(data.EventKey.replace('qrscene_', '')))
                    sqlConnection.query('select unionid from xiaxian_user where unionid="'+json.unionid+'"', function (err, rows){
                        if(rows.length == 0){
                            // console.log(json.message, typeof json, json['message'])
                            if (json.message === 'zuodaili'){
                                sqlConnection.query('INSERT INTO xiaxian_user (unionid, openid, daili_unionid) VALUES ("'+userinfo.unionid+'", "'+data.FromUserName+'", "'+json.unionid+'"', function (err, rows){
                                    wechat.send(msg)
                                })
                            }
                        }
                    })
                } catch (e) {
                    wechat.send({
                      FromUserName : data.ToUserName,
                      ToUserName : data.FromUserName,
                      MsgType : "text",
                      Content: '您好'
                    })
                }
            })
        }

        // wechat.send(msg);
    });

    // parseString(req.body, function(err, result){
    //     var text = '<xml>'+
    //         '<ToUserName><![CDATA['+result.FromUserName+']]></ToUserName>'+
    //         '<FromUserName><![CDATA['+result.toUser+']]></FromUserName>'+
    //         '<CreateTime>'+Date.parse(new Date())+'</CreateTime>'+
    //         '<MsgType><![CDATA[text]]></MsgType>'+
    //         '<Content><![CDATA['+JSON.stringify(result)+']]></Content>'+
    //         '</xml>';
    //         res.send(text);
    // });
});
app.get('/wx_api/get_access_token', function (req, res) {
    res.send(JSON.stringify({result: access_token.getAT()}))
})
app.get('/wx_api/create_qr_code', function (req, res){
    var unionid = req.query.unionid;
    if(!unionid || req.query.message != 'zuodaili'){
        res.send({
            code: -1,
            success: false,
            message: 'params err'
        })
    }else {
        // sqlConnection.query('select unionid from qrcode where unionid="'+req.query.unionid+'"', function(err, rows){
        sqlConnection.query('select user_name from user_info where user_name="'+req.query.unionid+'"', function(err, rows){
            if(err){
                res.send({
                    code: -1,
                    success: false,
                    message: 'sql err'
                })
            }else {
                // console.log(rows, rows.length)
                if(rows.length !== 0){
                    // req.query.message = 'zuodaili';
                    createQRCode(JSON.stringify(req.query), access_token.getAT(), function(status,data){
                        data = JSON.parse(data)
                        data.ticket = 'https://mp.weixin.qq.com/cgi-bin/showqrcode?ticket=' + data.ticket;
                        sqlConnection.query('UPDATE user_info set qrcode = "'+ data.ticket +'" WHERE user_name ="'+ unionid +'"', function (err, rows, field) {
                         // (unionid, qrcode_url, qrcode_ticket) VALUES ("'+unionid+'", "'+data.url+'", "'+data.ticket+'")', function (err, rows, field) {
                            if(err) {
                                res.send({
                                    code: -1,
                                    success: false,
                                    message: 'sql err'
                                })
                            } else {
                                res.send({
                                    code: 0,
                                    success: true,
                                    data: {
                                        qrcode_url: data.url,
                                        qrcode_ticket: data.ticket
                                    }
                                })
                            }
                        })
                    })
                } else {
                    res.send({
                        code: -1,
                        success: 'false',
                        message: 'daili yi cun zai'
                    })
                }
            }
        })
    }

})
app.get('/wx_api/get_daili_qrcode', function (req, res) {
    var unionid = req.query.unionid;
    if(!unionid){
        res.send({
            code: -1,
            success: false,
            message: 'unionid err'
        })
    }else{
        sqlConnection.query('select * from qrcode', function (err, rows) {
            if(err) {
                res.send({
                    code: -1,
                    success: false,
                    message: 'sql err'
                })
            } else {
                res.send({
                    code: 0,
                    success: true,
                    data: rows
                })
            }
        })
    }
})

app.get('/wx_api/set_menu', function (req, res) {
    require('./module/setMenu')(access_token.getAT(), res)
})
app.get('/charge', function (req, res) {
    res.sendFile(__dirname + '/static/charge.html')
})
app.get('/download', function (req, res) {
    res.sendFile(__dirname + '/static/download.html')
})
app.listen(process.env.PORT || 80, function () {
    console.log(80)
});

function sortDictStr(query) {
    var str = [config.TOKEN, query.timestamp, query.nonce].sort();
    var result = '';
    for(var i = 0; i< str.length; i++){
        result = result + str[i];
    }
    return sha1(result);
}
