'use strict';

var response = require('../core/res');
var connection = require('../connection/conn');
var md5 = require('md5');
exports.voucher = function(req, res) {
    var id = req.params.id;
    var status = "'DONE'";
    connection.query('SELECT * , DATE_FORMAT(created_at, "%d/%m/%Y") as date, FORMAT(price, 0) as harga FROM tbl_transaction_detail  where status <> '+status+' and id_user = ?',[id], function (error, rows, fields){
        if(error){
            console.log(error)
        } else{
            response.ok(rows, res)
        }
    });
};

exports.voucher_done = function(req, res) {
    var id = req.params.id;
    connection.query('SELECT *,DATE_FORMAT(created_at, "%d/%m/%Y") as date,FORMAT(price, 0) as harga ,REPLACE(status, "DONE", "TERJUAL") as status,REPLACE(status, "NULL", "Aktif") as status FROM tbl_transaction_detail where id_user = ?',[id], function (error, rows, fields){
        if(error){
            console.log(error)
        } else{
            response.ok(rows, res)
        }
    });
};
exports.voucher_plan_name = function(req, res) {
    var id = req.params.id;
    connection.query('SELECT plan_name FROM tbl_transaction_detail where id_user = ? group by plan_name',[id], function (error, rows, fields){
        if(error){
            console.log(error)
        } else{
            response.ok(rows, res)
        }
    });
};
exports.search_voucher = function(req, res) {
    // var id = req.params.id;
    var date1 = req.body.date1;
    var date2 = req.body.date2;
    var plan_name = req.body.plan_name;
    var nomor_transaction = req.body.nomor_transaction;
    let sql = 'SELECT *,DATE_FORMAT(created_at, "%d/%m/%Y") as date FROM tbl_transaction_detail where kode_voucher is not null ';
    if(date1 !== null && date2 !== null){
        sql += 'and (date(created_at) BETWEEN "'+date1+'" AND "'+date2+'")'

    }
    if(plan_name !== ''){
        sql += ' and plan_name = "' + plan_name +'"'
    }
    if(nomor_transaction !== ''){
        sql += ' and nomor_transaction = "' + nomor_transaction + '"'
    }
    connection.query(sql, function (error, rows, fields){
        if(error){
            console.log(error)
        } else{
            response.ok(rows, res)
        }
    });
};
exports.voucher_nomor_transaction = function(req, res) {
    var id = req.params.id;
    var status = "'APPROVED'";
    connection.query('SELECT * FROM tbl_transaction_header  where status = '+status+' and id_user = ?',[id], function (error, rows, fields){
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
    var time                = datetime.toISOString().match(/(\d{2}:){2}\d{2}/)[0];

    connection.query('INSERT INTO tbl_transaction_detail (nomor_transaction,price, id_user, id_voucher, plan_name, created_at, kode_voucher,time) values (?,?,?,?,?,?,?,?)',
    [ nomor_transaction, price, id_user,id_voucher  ,plan_name ,created_at,kode_voucher,time ], 
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


