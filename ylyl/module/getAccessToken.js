var https = require('https');
var config = require('./config');

function AccessToken(){

    var access_token = {
        access_token: null,
        expires_in: 0
    };

    function setAT(cb){
        https.get('https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid='+config.appid+'&secret='+config.appsecret, function(res,data){
            res.on('data', function(data){
                data = JSON.parse(data.toString());
                access_token = {
                    access_token: data['access_token'],
                    expires_in: 7000*1000 + Date.parse(new Date())
                }
                console.log(access_token);
                cb();
            });
        });
    }

    this.getAT = function(){
        if( Date.parse(new Date()) < parseInt(access_token.expires_in) || access_token == 0){
            return access_token.access_token;
        }else{
            setAT(this.getAT());
        }
    }
    setAT(function(){});
}
module.exports = AccessToken;
