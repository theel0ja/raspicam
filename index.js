'use strict';

const express = require('express')
const path    = require('path')

const app = express()
app.disable('x-powered-by');



app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'web', 'index.html'))
})

app.get('/takephoto', function (req, res) {
  // imgPath
  var imgPath = path.join(__dirname, 'img', 'photo.jpg')

  // Execute command
  var exec = require('child_process').exec
  var cmd = 'raspistill -o ' + imgPath

  exec(cmd, function(error, stdout, stderr) {
    // command output is in stdout
    console.log(stdout)
  });

  // Show image
  res.sendFile(imgPath)
})

if (app.get('env') !== 'test') {
  const port = process.env.PORT || 5000;

  app.listen(port, '127.0.0.1', () => {
    console.log('Listening on port ' + port);
  });
}
