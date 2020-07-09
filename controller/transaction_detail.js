'use strict';

var response = require('../core/res');
var connection = require('../connection/conn');
var md5 = require('md5');
exports.voucher = function(req, res) {
    var id = req.params.id;
    connection.query('SELECT * FROM tbl_transaction_detail where id_user = ?',[id], function (error, rows, fields){
        if(error){
            console.log(error)
        } else{
            response.ok(rows, res)
        }
    });
};

exports.voucherAll = function(req, res) {
    var id = req.params.id;
    connection.query('SELECT * FROM tbl_transaction_detail ', function (error, rows, fields){
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


