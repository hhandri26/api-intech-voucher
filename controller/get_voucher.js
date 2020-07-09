'use strict';

var response = require('../core/res');
var connection = require('../connection/conn_voucher');

exports.voucher_catagories= function(req, res) {
    connection.query('SELECT * FROM tbl_plans', function (error, rows, fields){
        if(error){
            console.log(error)
        } else{
            response.ok(rows, res)
        }
    });
};


exports.voucher= function(req, res) {
    connection.query('SELECT * FROM tbl_vouchers', function (error, rows, fields){
        if(error){
            console.log(error)
        } else{
            response.ok(rows, res)
        }
    });
};

exports.index = function(req, res) {
    response.ok("API Running!", res)
};




exports.updateVoucher = function(req, res) {
    
    var id = req.body.id;
    var doctor_code        = req.body.doctor_code;
    var doctor_name        = req.body.doctor_name;
    var doctor_phone       = req.body.doctor_phone;
    var doctor_email       = req.body.doctor_email;
    var doctor_avatar      = req.body.doctor_avatar;
    
    connection.query('UPDATE tbl_vouchers SET doctor_code = ?, doctor_name = ? , doctor_phone = ? , doctor_email = ? , doctor_avatar = ? WHERE id = ?',
    [ doctor_code, doctor_name,doctor_phone,doctor_email,doctor_avatar, id], 
    function (error, rows, fields){
        if(error){
            console.log(error)
        } else{
            response.ok("Berhasil merubah Dokter!", res)
        }
    });
};

