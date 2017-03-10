var https = require('https');
module.exports = function (openid, access_token, callback) {
	https.get('https://api.weixin.qq.com/cgi-bin/user/info?access_token='+access_token+'&openid='+openid+'&lang=zh_CN', function(res,data){
        res.on('data', function(data){
            callback(data)
        });
    });
}