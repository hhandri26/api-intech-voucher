'use strict';

var response = require('../core/res');
var connection = require('../connection/conn');
var connection_voucher = require('../connection/conn_voucher');
const request = require('request');
var md5 = require('md5');
// duitku
// exports.index= function(req, res) {
//     var price = req.body.price;
//     var item = req.body.item;
//     var merchant_code = "D6093";
//     var orderId = Math.floor(Date.now() / 1000);
//     var merchantKey= 'c35ece04bb71a9b6e98953171faed44d';
//     request.post('https://sandbox.duitku.com/webapi/api/merchant/v2/inquiry', {
//         json:{ 
//             "merchantCode":merchant_code,
//             "paymentAmount":price,
//             "paymentMethod":"BT",
//             "merchantOrderId":orderId,
//             "productDetails":item,
//             "additionalParam":"",
//             "merchantUserInfo":"",
//             "customerVaName":"Handri",
//             "email":"test@test.com",
//             "phoneNumber":"08123456789",
            
//             "callbackUrl":"http:\/\/example.com\/callback",
//             "returnUrl":"http:\/\/example.com\/return",
//             "signature":md5(merchant_code + orderId + price + merchantKey),
//             "expiryPeriod":10
//          }
//         }, 
//         function (error, rows, fields){
//                 if(error){
//                     console.log(error)
//                 } else{
//                     response.ok(rows, res)
//                 }
//             }
//         )
// };

// manual
exports.transaction = function(req, res) {
    connection.query('SELECT * FROM tbl_transaction_header', function (error, rows, fields){
        if(error){
            console.log(error)
        } else{
            response.ok(rows, res)
        }
    });
};
exports.findTransaction = function(req, res) {
    
    var id = req.params.id;
    connection.query('SELECT * FROM tbl_transaction_header where id_user = ?',
    [ id ], 
    function (error, rows, fields){
        if(error){
            console.log(error)
        } else{
            response.ok(rows, res)
        }
    });
};

exports.createTransaction = function(req, res) {
    var datetime            = new Date();
    var nomor_transaction   = 'TX-'+ Math.floor(new Date() / 1000);
    var qty                 = req.body.qty;
    var price               = req.body.price;
    var sub_total           = qty * price;
    var id_user             = req.body.id_user;
    var status              = 'WAITING';
    var created_at          = datetime.toISOString().slice(0,10);

    connection.query('INSERT INTO tbl_transaction_header (nomor_transaction, qty,price, sub_total, id_user, status, created_at) values (?,?,?,?,?,?,?)',
    [ nomor_transaction, qty, price,sub_total ,id_user ,status ,created_at ], 
    function (error, rows, fields){
        if(error){
            console.log(error)
        } else{
            response.ok("Berhasil menambahkan transaksi baru !", res)
        }
    });
};

exports.approveTransaction = function(req, res) {
    
    var id              = req.body.id;
    var user_approved   = req.body.user_approved;
    var status          = 'DONE';
    var updated_at      = datetime.toISOString().slice(0,10);

    var data = connection.query('UPDATE tbl_transaction_header SET user_approved = ?, status = ?,updated_at = ? WHERE id = ?',
    [ user_approved, status, updated_at,id]);
    
    // function (error, rows, fields){
    //     if(error){
    //         console.log(error)
    //     } else{
    //         response.ok("Approval berhasil!", res)
    //     }
    // });
};

exports.uploadTransaction = function(req, res) {
    
    var id              = req.body.id;
    var bukti_transfer   = req.body.bukti_transfer;
    var status = 'UPLOAD';

    connection.query('UPDATE tbl_transaction_header SET bukti_transfer = ?, status = ? WHERE id = ?',
    [ bukti_transfer, status, id], 
    function (error, rows, fields){
        if(error){
            console.log(error)
        } else{
            response.ok("Upload berhasil!", res)
        }
    });
};

exports.deleteTransaction = function(req, res) {
    
    var id = req.body.id;

    connection.query('DELETE FROM tbl_transaction_header WHERE id = ?',
    [ id ], 
    function (error, rows, fields){
        if(error){
            console.log(error)
        } else{
            response.ok("Berhasil menghapus user!", res)
        }
    });
};

