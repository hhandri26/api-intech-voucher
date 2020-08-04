'use strict';

var response = require('../core/res');
var connection = require('../connection/conn');
var md5 = require('md5');
exports.users = function(req, res) {
    connection.query('SELECT * FROM users', function (error, rows, fields){
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

exports.login = function(req, res) {
    
    var username = req.body.username;
    var password = md5(req.body.password);
    connection.query('SELECT * FROM users where email = ? and password = ?',
    [ username, password ], 
    function (error, rows, fields){
        if(error){
            console.log(error)
        } else{
            response.ok(rows, res)
        }
    });
};

exports.findUsers = function(req, res) {
    
    var id = req.params.id;
    connection.query('SELECT * FROM users where id = ?',
    [ id ], 
    function (error, rows, fields){
        if(error){
            console.log(error)
        } else{
            response.ok(rows, res)
        }
    });
};

exports.createUsers = function(req, res) {
    
    var username = req.body.username;
    var email = req.body.email;
    var real_password = req.body.real_password;
    var password = md5(req.body.real_password);
    var role = req.body.role;
    var phone_number = req.body.phone_number;
    var status = req.body.status;
    var zona = req.body.zona;
    var cetak_harga = req.body.cetak_harga;

    connection.query('INSERT INTO users (username, email,real_password, password, role, phone_number, status,zona,cetak_harga) values (?,?,?,?,?,?,?,?,?)',
    [ username, email, real_password,password ,role ,phone_number ,status,zona,cetak_harga ], 
    function (error, rows, fields){
        if(error){
            console.log(error)
        } else{
            response.ok("Berhasil menambahkan user!", res)
        }
    });
};

exports.updateUsers = function(req, res) {
    
    var id = req.body.id;
    var username = req.body.username;
    var email = req.body.email;
    var real_password = req.body.real_password;
    var password = md5(req.body.real_password);
    var role = req.body.role;
    var phone_number = req.body.phone_number;
    var status = req.body.status;
    var zona = req.body.zona;
    var cetak_harga = req.body.cetak_harga;

    connection.query('UPDATE users SET username = ?, email = ?,real_password = ?, password = ?,role = ?, phone_number = ?,status = ?, zona = ?,cetak_harga = ? WHERE id = ?',
    [ username, email, real_password,password,role,phone_number,status,zona,cetak_harga,id], 
    function (error, rows, fields){
        if(error){
            console.log(error)
        } else{
            response.ok("Berhasil merubah user!", res)
        }
    });
};

exports.deleteUsers = function(req, res) {
    
    var id = req.body.id;

    connection.query('DELETE FROM users WHERE id = ?',
    [ id ], 
    function (error, rows, fields){
        if(error){
            console.log(error)
        } else{
            response.ok("Berhasil menghapus user!", res)
        }
    });
};