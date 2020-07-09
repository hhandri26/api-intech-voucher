'use strict';

exports.ok = function(values, res,next) {
  var data = {
      'status': 200,
      'values': values
  };
  res.json(data);
  res.end();
};
