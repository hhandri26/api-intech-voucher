'use strict';

module.exports = function(app) {
    var users = require('../controller/user');
    var upload_file = require('../controller/upload_file');
    var payment = require('../controller/transaction');
    var voucher = require('../controller/get_voucher');


    app.route('/')
        .get(users.index);

    app.route('/users')
        .get(users.users);

    app.route('/users/:id')
    .get(users.findUsers);

    app.route('/users')
        .post(users.createUsers);
        
    app.route('/users/login')
    .post(users.login);

    app.route('/users')
        .put(users.updateUsers);
    
    app.route('/users')
        .delete(users.deleteUsers);
    
   



    // upload file
    app.route('/upload_file')
    .post(upload_file.index);

    app.route('/access_file')
    .get(upload_file.access_file);

    // voucher
    app.route('/voucher/voucher_catagories')
    .get(voucher.voucher_catagories);


    // payment
    
    app.route('/payment')
    .post(payment.createTransaction);
    app.route('/payment/:id')
    .get(payment.findTransaction);
    app.route('/payment/upload')
    .post(payment.uploadTransaction);

};