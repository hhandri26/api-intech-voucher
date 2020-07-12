'use strict';

var response = require('../core/res');
var connection = require('../connection/conn_voucher');

exports.voucher_catagories= function(req, res) {
    var id = req.params.id;
    connection.query('SELECT * FROM tbl_plans where owner_name = ?',[id], function (error, rows, fields){
        if(error){
            console.log(error)
        } else{
            response.ok(rows, res)
        }
    });
};


exports.voucher= function(req, res) {
    var plan_name = req.body.plan_name;
    var qty    =  req.body.qty;
    connection.query('SELECT id, price,secret,plan_name FROM tbl_vouchers where expired_on is NULL and user_buy is NULL and plan_name = ? order by id ASC LIMIT ?',
    [plan_name, qty], 
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

exports.voucherArea = function(req, res) {
    var price = req.body.price;
    var qty    =  req.body.qty;
    connection.query('SELECT owner_name FROM tbl_plans group by owner_name order by owner_name asc',
    [price, qty], 
    function (error, rows, fields){
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
    
 
};

