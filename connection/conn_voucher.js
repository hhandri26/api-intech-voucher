var mysql = require('mysql');

var con = mysql.createConnection({
  host: "103.136.76.251",
  user: "imall",
  password: "Imall@2020",
  database: "mixradius_radDB"
});


con.connect(function (err){
    if(err) throw err;
});

module.exports = con;