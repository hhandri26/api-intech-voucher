var mysql = require('mysql');

var con = mysql.createConnection({
  host: "103.136.76.250",
  user: "hhandri26",
  password: "Cilangkap126",
  database: "my-voucher"
});


// var con = mysql.createConnection({
//   host: "153.92.4.44",
//   user: "hhandri",
//   password: "Cilangkap126",
//   database: "kusuma-store"
// });


con.connect(function (err){
    if(err) throw err;
});

module.exports = con;