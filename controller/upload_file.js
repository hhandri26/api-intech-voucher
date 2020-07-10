'use strict';
var response = require('../core/res');
var connection = require('../connection/conn');
var multer = require('multer');
var path          = require('path');
const serveIndex = require('serve-index');
exports.index = function(req, res) {
   
    const storage = multer.diskStorage({
        destination: (req, file, callback) => {
            callback(null, (path.join(__dirname + './../public/images/')));
        },
        filename: (req, file, callback) => {
            callback(null, Date.now() + '-' + file.originalname);
        }
    });

    const upload = multer({storage: storage}).any('file');

    upload(req, res, (err) => {
        if (err) {
            return res.status(400).send({
               // message: helper.getErrorMessage(err)
            });
        }
        let results = req.files.map((file) => {
            return {
                mediaName: file.filename,
                origMediaName: file.originalname,
                mediaSource: 'http://103.136.76.251:9999/file/images/' + file.filename
                // mediaSource: path.join(__dirname + './../public/images/') + file.filename
            }
        });
        res.status(200).json(results);
    });
   
};

exports.access_file = function(req, res) {
    


}


