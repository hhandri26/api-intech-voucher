'use strict';

var response = require('../core/res');
var connection = require('../connection/conn');
var connection_voucher = require('../connection/conn_voucher');
const request = require('request');
var md5 = require('md5');
var nodemailer = require('nodemailer');
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
    connection.query('SELECT a.*,DATE_FORMAT(a.created_at, "%d/%m/%Y") as date, b.username FROM tbl_transaction_header as a LEFT JOIN users as b ON a.id_user = b.id', function (error, rows, fields){
        if(error){
            console.log(error)
        } else{
            response.ok(rows, res)
        }
    });
};

exports.finance = function(req, res) {
    var status = "'APPROVED'";
    connection.query('SELECT a.*,DATE_FORMAT(a.created_at, "%d/%m/%Y") as date, b.username FROM tbl_transaction_header as a LEFT JOIN users as b ON a.id_user = b.id where a.status <> '+status, function (error, rows, fields){
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
    var zona = req.body.zona;
    let sql = 'SELECT a.*,DATE_FORMAT(a.created_at, "%d/%m/%Y") as date,b.username FROM tbl_transaction_header as a LEFT JOIN users as b ON a.id_user = b.id where a.nomor_transaction is not null ';
    if(date1 !== '' && date2 !== ''){
        sql += 'and (date(a.created_at) BETWEEN "'+date1+'" AND "'+date2+'")'

    }
    if(username !== ''){
        sql += ' and a.id_user = ' + username
    }

    if(zona !== ''){
        sql += ' and a.zona = ' + zona
    }
    connection.query(sql, function (error, rows, fields){
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
exports.findTransactionId = function(req, res) {
    
    var id = req.params.id;
    connection.query('SELECT * FROM tbl_transaction_request where nomor_transaction = ?',
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
    var qty                 = req.body.header.qty;
    var zona               = req.body.header.zona;
    var sub_total           = req.body.header.sub_total;
    var email           = req.body.header.email;
    var id_user             = req.body.header.id_user;
    var status              = 'WAITING';
    var created_at          = datetime.toISOString().slice(0,10);
    var time                = datetime.toISOString().match(/(\d{2}:){2}\d{2}/)[0];

    

    connection.query('INSERT INTO tbl_transaction_header (nomor_transaction, qty,zona, sub_total, id_user, status, created_at,email,time) values (?,?,?,?,?,?,?,?,?)',
    [ nomor_transaction, qty, zona,sub_total ,id_user ,status ,created_at,email,time ], 
    function (error, rows, fields){
        if(error){
            console.log(error)
        } else{
           
            Object.entries(req.body.detail).forEach(([key, val]) => {
                var d_plan_name = val.name_plan;
                var d_price = val.price;
                var d_qty = val.qty;
                var d_sub_total = val.subtotal;

                
                connection.query('INSERT INTO tbl_transaction_request (plan_name, price,qty,sub_total,created_at, status, id_user, nomor_transaction, zona) values (?,?,?,?,?,?,?,?,?)',
                [ d_plan_name, d_price,d_qty,d_sub_total ,created_at ,status ,id_user,nomor_transaction,zona ], 
                function (error, rows, fields){
                    if(error){
                        console.log(error)
                    } else{
                        var transporter = nodemailer.createTransport({
                            //service: 'gmail',
                            host: "mail.intechmandiri.com",
                            port: 465,
                            secure: true, // true for 465, false for other ports
                            auth: {
                              user: 'voucher@intechmandiri.com',
                              pass: 'Intech@2020'
                            }
                          });
                          
                          var mailOptions = {
                            from: 'voucher@intechmandiri.com',
                            to: email,
                            subject: 'Transaksi Pembelian Voucher',
                            text: 'Pembelian voucher sedang di prosess dengan nomor Transaksi '+nomor_transaction
                          };
                          
                          transporter.sendMail(mailOptions, function(error, info){
                            if (error) {
                                console.log('error')
                              console.log(error);
                            } else {
                              console.log('Email sent: ');
                            }
                          });
            
                        response.ok("Berhasil menambahkan transaksi baru !", res)
                      
                    }
                });
            });
            
        }
    });

 
   

   
};

exports.sendEmail = function(req, res) {
    var transporter = nodemailer.createTransport({
        //service: 'gmail',
        host: "mail.intechmandiri.com",
        port: 465,
        secure: true, // true for 465, false for other ports
        auth: {
          user: 'handri@intechmandiri.com',
          pass: 'Rickdale00'
        }
      });
      
      var mailOptions = {
        from: 'handri@intechmandiri.com',
        to: email,
        subject: 'Transaksi Pembelian Voucher '+created_at,
        text: 'Pembelian voucher'+ sub_total +' sedang di prosess !'
      };
      
      transporter.sendMail(mailOptions, function(error, info){
        if (error) {
            console.log('error')
          console.log(error);
        } else {
          console.log('Email sent: ');
        }
      });
   
};


exports.approveTransaction = function(req, res) {
    var datetime            = new Date();
    var id              = req.body.id;
    var user_approved   = req.body.user_approved;
    var status          = req.body.status;
    var updated_at      = datetime.toISOString().slice(0,10);
    var nomor_transaction = req.body.nomor_transaction;
    var email           = req.body.email;

    connection.query('UPDATE tbl_transaction_header SET user_approved = ?, status = ?,updated_at = ? WHERE id = ?',
    [ user_approved, status, updated_at,id], 
    function (error, rows, fields){
        if(error){
            console.log(error)
        } else{
            
            // send email
            var transporter = nodemailer.createTransport({
                //service: 'gmail',
                host: "mail.intechmandiri.com",
                port: 465,
                secure: true, // true for 465, false for other ports
                auth: {
                  user: 'voucher@intechmandiri.com',
                  pass: 'Intech@2020'
                }
              });
              
              var mailOptions = {
                from: 'voucher@intechmandiri.com',
                to: email,
                subject: 'Transaksi Pembelian Voucher',
                text: 'Pembelian voucher Berhasil dengan nomor Transaksi '+nomor_transaction,
              };
              
              transporter.sendMail(mailOptions, function(error, info){
                if (error) {
                    console.log('error')
                  console.log(error);
                } else {
                  console.log('Email sent: ');
                }
              });
            response.ok("Approval berhasil!", res)
        }
    });
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

