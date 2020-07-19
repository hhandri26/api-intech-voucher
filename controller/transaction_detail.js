'use strict';

var response = require('../core/res');
var connection = require('../connection/conn');
var md5 = require('md5');
exports.voucher = function(req, res) {
    var id = req.params.id;
    connection.query('SELECT * FROM tbl_transaction_detail  where status is null and id_user = ?',[id], function (error, rows, fields){
        if(error){
            console.log(error)
        } else{
            response.ok(rows, res)
        }
    });
};

exports.voucher_done = function(req, res) {
    var id = req.params.id;
    connection.query('SELECT a.* FROM tbl_transaction_detail as a LEFT JOIN tbl_vouchers as b on a.kode_voucher = b.code  where b.trx_status = "FINISH" and a.id_user = ?',[id], function (error, rows, fields){
        if(error){
            console.log(error)
        } else{
            response.ok(rows, res)
        }
    });
};

exports.voucherAll = function(req, res) {
    var id = req.params.id;
    connection.query('SELECT a.*,DATE_FORMAT(a.created_at, "%d/%m/%Y") as date, b.username as reseller FROM tbl_transaction_detail as a LEFT JOIN users as b ON a.id_user = b.id ', function (error, rows, fields){
        if(error){
            console.log(error)
        } else{
            response.ok(rows, res)
        }
    });
};

exports.report = function(req, res) {
    var date1 = req.body.date1;
    var date2 = req.body.date2;
    var username = req.body.username;
    let sql = 'SELECT a.id_voucher,a.plan_name,a.price,a.kode_voucher,a.nomor_transaction,DATE_FORMAT(a.created_at, "%d/%m/%Y") as date,b.username as reseller FROM tbl_transaction_detail as a LEFT JOIN users as b ON a.id_user = b.id where a.kode_voucher is not null ';
    if(date1 !== '' && date2 !== ''){
        sql += 'and (date(a.created_at) BETWEEN "'+date1+'" AND "'+date2+'")'

    }
    if(username !== ''){
        sql += ' and a.id_user = ' + username
    }
    connection.query(sql, function (error, rows, fields){
        if(error){
            console.log(error)
        } else{
            response.ok(rows, res)
        }
    });
};
exports.createTransactionDetail = function(req, res) {
    var datetime            = new Date();
    var nomor_transaction   = req.body.nomor_transaction;
    var price               = req.body.price;
    var id_user             = req.body.id_user;
    var id_voucher          = req.body.id_voucher;
    var plan_name           = req.body.plan_name;
    var created_at          = datetime.toISOString().slice(0,10);
    var kode_voucher        = req.body.secret;

    connection.query('INSERT INTO tbl_transaction_detail (nomor_transaction,price, id_user, id_voucher, plan_name, created_at, kode_voucher) values (?,?,?,?,?,?,?)',
    [ nomor_transaction, price, id_user,id_voucher  ,plan_name ,created_at,kode_voucher ], 
    function (error, rows, fields){
        if(error){
            console.log(error)
        } else{
            response.ok("Berhasil menambahkan transaksi baru !", res)
        }
    });
};

exports.index = function(req, res) {
    response.ok("API Running!", res)
};

exports.voucherStatus = function(req, res) {
    var id              = req.body.id;
    var status   = req.body.status;
   

    connection.query('UPDATE tbl_transaction_detail SET status = ? WHERE id = ?',
    [ status,id], 
    function (error, rows, fields){
        if(error){
            console.log(error)
        } else{
            response.ok("Update voucher berhail !", res)
        }
    });
};


