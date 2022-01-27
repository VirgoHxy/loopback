// Copyright IBM Corp. 2016,2019. All Rights Reserved.
// Node module: loopback-workspace
// This file is licensed under the MIT License.
// License text available at https://opensource.org/licenses/MIT

'use strict';

const loopback = require('loopback');
const boot = require('loopback-boot');
const bodyParser = require('body-parser');
const path = require('path');

const app = module.exports = loopback();

app.middleware('auth', bodyParser.json());

app.start = function() {
  // start the web server
  return app.listen(function() {
    app.emit('started');
    const baseUrl = app.get('url').replace(/\/$/, '');
    console.log('Web server listening at: %s', baseUrl);
    if (app.get('loopback-component-explorer')) {
      const explorerPath = app.get('loopback-component-explorer').mountPath;
      console.log('Browse your REST API at %s%s', baseUrl, explorerPath);
    }
  });
};

// Bootstrap the application, configure models, datasources and middleware.
// Sub-apps like REST API are mounted via boot scripts.
boot(app, {
  appRootDir: __dirname,
  bootScripts: [
    path.join(__dirname, './boot/async.js'),
    path.join(__dirname, './boot/first.js'),
    path.join(__dirname, './boot/create-models.js'),
    path.join(__dirname, './boot/root.js'),
    path.join(__dirname, './boot/last.js'),
  ],
}, function(err) {
  if (err) throw err;

  // start the server if `$ node server.js`
  if (require.main === module)
    app.start();
});
