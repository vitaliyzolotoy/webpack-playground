var static = require('node-static');
var file = new static.Server('.');

require('http').createServer(function(req, res) {
  req.addListener('end', function () {
    file.serve(req, res);
  }).resume();
}).listen(3000);
