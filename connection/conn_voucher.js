var mysql = require('mysql');

var con = mysql.createConnection({
  host: "103.136.76.252",
  user: "veloce",
  password: "20200608",
  database: "mixradius_radDB"
});


con.connect(function (err){
    if(err) throw err;
});

module.exports = con;