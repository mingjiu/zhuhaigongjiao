var net = require('net');
// var buffer = require('buffer')
var HOST = '114.112.65.150';
var PORT = 14467;
var buf = Buffer.alloc(16, '11openiduserid')
console.log(buf)
console.log(buf.toString())

var client = new net.Socket();
client.connect(PORT, HOST, function() {
    client.write(buf);
});

// 为客户端添加“data”事件处理函数
// data是服务器发回的数据
client.on('data', function(data) {
    console.log('DATA: ' + data);
    // 完全关闭连接
    client.destroy();
});

// 为客户端添加“close”事件处理函数
client.on('close', function() {
    console.log('Connection closed');
});
