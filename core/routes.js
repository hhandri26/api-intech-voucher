'use strict';

module.exports = function(app) {
    var users = require('../controller/user');
    var upload_file = require('../controller/upload_file');
    var payment = require('../controller/transaction');
    var paymentdetail = require('../controller/transaction_detail');
    var voucher = require('../controller/get_voucher');
    var user_lokasi = require('../controller/user_lokasi');


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
    app.route('/voucher/voucher_catagories/:id')
    .get(voucher.voucher_catagories);


    // payment
    
    app.route('/payment')
    .post(payment.createTransaction);

    app.route('/payment/:id')
    .get(payment.findTransaction);

    app.route('/payment/upload')
    .post(payment.uploadTransaction);

    app.route('/payment/approved')
    .post(payment.approveTransaction);

    app.route('/payment_all')
    .get(payment.transaction);

    app.route('/payment_finance')
    .get(payment.finance);

    app.route('/transaction_report')
    .post(payment.report);

    app.route('/voucher/list')
    .post(voucher.voucher);

    app.route('/voucher/tag')
    .post(voucher.voucherTag);

    app.route('/voucher/area')
    .get(voucher.voucherArea);

    app.route('/voucher/remaining')
    .get(voucher.Remainingvoucher);

    app.route('/voucher/report_area')
    .get(voucher.reportArea);

   

    // detail
    app.route('/payment/detail')
    .post(paymentdetail.createTransactionDetail);

    app.route('/voucher_done/:id')
    .get(paymentdetail.voucher);

    app.route('/voucher_no_transaction/:id')
    .get(paymentdetail.voucher_nomor_transaction);
    app.route('/voucher_plan_name/:id')
    .get(paymentdetail.voucher_plan_name);

    app.route('/voucher_done_status/:id')
    .get(paymentdetail.voucher_done);

    app.route('/voucher_all')
    .get(paymentdetail.voucherAll);

    app.route('/payment/detail/:id')
    .get(payment.findTransactionId);
    app.route('/payment/detail_done/:id')
    .get(payment.findTransactionIdDone);

    app.route('/payment/status_vucher')
    .put(paymentdetail.voucherStatus);

    app.route('/voucher_report')
    .post(paymentdetail.report);

    app.route('/search_voucher/')
    .post(paymentdetail.search_voucher);

    // send email
    app.route('/send_email')
    .post(payment.sendEmail);

    // count total
    app.route('/count_voucher_terjual/:id')
    .get(payment.CountVoucherTerjual);

    app.route('/count_voucher_sisa/:id')
    .get(payment.CountVoucherSisa);

    app.route('/count_voucher/:id')
    .get(payment.CountVoucher);

    //user lokasi
    app.route('/user/lokasi/:id')
    .get(user_lokasi.index);
    app.route('/user/lokasi')
    .post(user_lokasi.save);




};