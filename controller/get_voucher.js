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
    var price = req.body.price;
    var qty    =  req.body.qty;
    connection.query('SELECT id, price,secret,plan_name FROM tbl_vouchers where expired_on is NULL and user_buy is NULL and price = ? order by id ASC LIMIT ?',
    [price, qty], 
    function (error, rows, fields){
        if(error){
            console.log(error)
        } else{
            response.ok(rows, res)
        }
    });
};

exports.voucherTag = function(req, res) {
    var id              = req.body.id;
    var user_buy   = req.body.id_user;
   

    connection.query('UPDATE tbl_vouchers SET user_buy = ? WHERE id = ?',
    [ user_buy,id], 
    function (error, rows, fields){
        if(error){
            console.log(error)
        } else{
            response.ok("Update voucher berhail !", res)
        }
    });
};

exports.index = function(req, res) {
    response.ok("API Running!", res)
};




exports.updateVoucher = function(req, res) {
    
 
};

