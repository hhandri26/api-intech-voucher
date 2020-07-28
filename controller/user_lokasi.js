'use strict';

var response = require('../core/res');
var connection = require('../connection/conn');
exports.index = function(req, res) {
    var id = req.params.id;
    connection.query('SELECT * FROM user_lokasi  where user_id = ?',[id], function (error, rows, fields){
        if(error){
            console.log(error)
        } else{
            response.ok(rows, res)
        }
    });
};

exports.save = function(req, res) {
    var user_id            = req.body.header.id;
    // delete first
    connection.query('DELETE FROM user_lokasi WHERE user_id = ?',[user_id]);
           
    Object.entries(req.body.detail).forEach(([key, val]) => {
        var lokasi = val.lokasi;

        
        connection.query('INSERT INTO user_lokasi (user_id, lokasi) values (?,?)',
        [ user_id, lokasi], 
        function (error, rows, fields){
            if(error){
                console.log(error)
            } else{
                
                
            }
        });
    });                    

    response.ok("Berhasil menambahkan transaksi baru !", res)
            
        


 
   

   
};
