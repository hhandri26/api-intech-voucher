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

exports.reportArea= function(req, res) {
    connection.query('select a.plan_name, count(a.id) as jumlah_voucher,sum(a.price) as total_harga,b.username,b.nasipaddress,c.description as deskripsi_location,c.shortname as location,d.username as reseller,a.expired_on as tanggal,DATE_FORMAT(a.expired_on, "%d/%m/%Y") as date from tbl_vouchers as a LEFT JOIN radacct as b on a.code = b.username LEFT JOIN nas as c on b.nasipaddress = c.nasname LEFT JOIN users as d on a.user_buy = d.id where a.expired_on is not null and a.user_buy is not null group by a.plan_name and a.expired_on', function (error, rows, fields){
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

exports.Remainingvoucher= function(req, res) {
    connection.query('select count(id) as sisa, plan_name,price,owner_name from mixradius_radDB.tbl_vouchers where user_buy is null  group by plan_name;', 
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

