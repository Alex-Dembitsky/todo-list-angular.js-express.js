var nodemon = require('nodemon');
var path = require('path');

var isProduction = process.env.NODE_ENV === 'production';

if (!isProduction) {

  var bundle = require('./bundler.js');
  bundle();

}

nodemon({
  execMap: {
    js: 'node'
  },
  script: path.join(__dirname, 'backend/server'),
  ignore: [],
  watch: !isProduction ? ['backend/*'] : false,
  ext: 'js'
}).on('restart', function() {
  console.log('Backend restarted!');
});
