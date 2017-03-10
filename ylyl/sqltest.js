var mysql = require('mysql');
var connection = mysql.createConnection({
    host: '114.112.65.150',
    user: 'root',
    password: '1234qwerQWER!@#$',
    database:'test'
});

connection.connect();
//查询
connection.query('SELECT unionid from qrcode', function(err, rows, fields) {
    if (err) throw err;
    console.log('The solution is: ', rows[0]);
});
//关闭连接
connection.end();