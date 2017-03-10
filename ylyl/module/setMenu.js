var https = require('https')
var qs = require('querystring')

var postData = {
    'button': [
        {
            'type': 'view',
            'name': '充值',
            'url': 'http://ylyl.mingmingjiu.cn/charge'
        }
    ]
}

// postData = qs.stringify(postData)
// https://api.weixin.qq.com/cgi-bin/menu/create?access_token=ACCESS_TOKEN
var opt = {
    method: 'POST',
    host: 'https://api.weixin.qq.com',
    port: 80
    // path: '/cgi-bin/menu/create?'
}

module.exports = function (at, res) {
    // res.send(postData)
    opt.path = '/cgi-bin/menu/create?access_token=' + at
    var req = https.request(opt, function (serverFeedback) {
        console.log(serverFeedback)
        if (serverFeedback.statusCode == 200) {
            var body = "";
            serverFeedback.on('data', function (data) {
                body += data
            }).on('end', function () {
                res.send(200, body)
          })
        }
        else {
            res.send(500, "error")
        }
    })
    req.write(postData + "\n");
    req.end();
}
