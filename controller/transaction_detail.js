'use strict';

var response = require('../core/res');
var connection = require('../connection/conn');
var md5 = require('md5');
exports.MemberAddress = function(req, res) {
    connection.query('SELECT * FROM tbl_transaction_detail', function (error, rows, fields){
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


exports.findMemberAddress = function(req, res) {
    
    var id = req.params.id;
    connection.query('SELECT * FROM tbl_transaction_detail where id_member = ?',
    [ id ], 
    function (error, rows, fields){
        if(error){
            console.log(error)
        } else{
            response.ok(rows, res)
        }
    });
};

exports.createMemberAddress = function(req, res) {
    
    var id_member = req.body.id_member;
    var city_id = req.body.city_id;
    var province_id = req.body.province_id;
    var district_id = req.body.district_id;
    var address =  req.body.address;
    var phone = req.body.phone;
    var pic = req.body.pic;
    var address_name = req.body.address_name;

    connection.query('INSERT INTO tbl_transaction_detail (id_member, city_id,province_id, district_id, address, phone, pic,address_name) values (?,?,?,?,?,?,?,?)',
    [ id_member, city_id, province_id,district_id ,address ,phone ,pic,address_name ], 
    function (error, rows, fields){
        if(error){
            console.log(error)
        } else{
            response.ok("Berhasil menambahkan Member Address!", res)
        }
    });
};

exports.updateMemberAddress = function(req, res) {
    
    var id = req.body.id;
    var id_member = req.body.id_member;
    var city_id = req.body.city_id;
    var province_id = req.body.province_id;
    var district_id = req.body.district_id;
    var address =  req.body.address;
    var phone = req.body.phone;
    var pic = req.body.pic;
    var address_name = req.body.address_name;

    connection.query('UPDATE tbl_transaction_detail SET id_member = ?, city_id = ?,province_id = ?, district_id = ?,address = ?, phone = ?,pic = ? ,address_name = ? WHERE id = ?',
    [ id_member, city_id, province_id,district_id,address,phone,pic,address_name,id], 
    function (error, rows, fields){
        if(error){
            console.log(error)
        } else{
            response.ok("Berhasil merubah MemberAddress!", res)
        }
    });
};




exports.deleteMemberAddress = function(req, res) {
    
    var id = req.body.id;

    connection.query('DELETE FROM tbl_transaction_detail WHERE id = ?',
    [ id ], 
    function (error, rows, fields){
        if(error){
            console.log(error)
        } else{
            response.ok("Berhasil menghapus Data!", res)
        }
    });
};