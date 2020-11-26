'use strict';

var response = require('../core/res');
var connection = require('../connection/conn');
var request = require('request');

exports.sendWhatsapp = function(req,res){

    var phone = req.body.phone;
    var message =  req.body.message;
    var options = {
      method: 'POST',
      url: 'https://console.wablas.com/api/send-message',
      headers: {Authorization: '9k3tdEHMUGmxXkozr9FoRkFqARlQHJaZ1ZajDaitAFdgzfqH2zMlmQXD7J0OUEGU'},
      form: {
        phone: phone, 
        message:message
      }
    };
    
    request(options, function (error, uu, body) {
      if(error){
          console.log(error)
      } else{
          console.log('message send')
          response.ok(body, res)
      }
    });
  
  };