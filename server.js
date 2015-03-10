#!/bin/env node



var express = require('express');

var fs      = require('fs');

var mongodb = require('mongodb');



var App = function(){



  // Scope

  var self = this;



  // Setup

  self.dbServer = new mongodb.Server(process.env.OPENSHIFT_MONGODB_DB_HOST,parseInt(process.env.OPENSHIFT_MONGODB_DB_PORT));

  self.db = new mongodb.Db(process.env.OPENSHIFT_APP_NAME, self.dbServer, {auto_reconnect: true});

  self.dbUser = process.env.OPENSHIFT_MONGODB_DB_USERNAME;

  self.dbPass = process.env.OPENSHIFT_MONGODB_DB_PASSWORD;



  self.ipaddr  = process.env.OPENSHIFT_NODEJS_IP;

  self.port    = parseInt(process.env.OPENSHIFT_NODEJS_PORT) || 8080;

  if (typeof self.ipaddr === "undefined") {

    console.warn('No OPENSHIFT_NODEJS_IP environment variable');

  };






  // Web app urls

  self.app  = express();



  //This uses the Connect frameworks body parser to parse the body of the post request

  var bodyParser = require('body-parser');

  var methodOverride = require('method-override');

  // parse application/x-www-form-urlencoded

  self.app.use(bodyParser.urlencoded());

  // parse application/json

  self.app.use(bodyParser.json());

  // override with POST having ?_method=DELETE

  self.app.use(methodOverride('_method'))



  //define all the url mappings

  self.app.get('/health', self.routes['health']);

  self.app.get('/', self.routes['root']);

  self.app.get('/ws/parks', self.routes['returnAllParks']);

  self.app.get('/ws/parks/park/:id', self.routes['returnAPark']);

  self.app.get('/ws/parks/near', self.routes['returnParkNear']);

  self.app.get('/ws/parks/name/near/:name', self.routes['returnParkNameNear']);

  self.app.post('/ws/parks/park', self.routes['postAPark']);



  // Logic to open a database connection. We are going to call this outside of app so it is available to all our functions inside.

  self.connectDb = function(callback){

    self.db.open(function(err, db){

      if(err){ throw err };

      self.db.authenticate(self.dbUser, self.dbPass, {authdb: "admin"}, function(err, res){

        if(err){ throw err };

        callback();

      });

    });

  };

  

  

  //starting the nodejs server with express

  self.startServer = function(){

    self.app.listen(self.port, self.ipaddr, function(){

      console.log('%s: Node server started on %s:%d ...', Date(Date.now()), self.ipaddr, self.port);

    });

  }



  // Destructors

  self.terminator = function(sig) {

    if (typeof sig === "string") {

      console.log('%s: Received %s - terminating Node server ...', Date(Date.now()), sig);

      process.exit(1);

    };

    console.log('%s: Node server stopped.', Date(Date.now()) );

  };



  process.on('exit', function() { self.terminator(); });



  self.terminatorSetup = function(element, index, array) {

    process.on(element, function() { self.terminator(element); });

  };



  ['SIGHUP', 'SIGINT', 'SIGQUIT', 'SIGILL', 'SIGTRAP', 'SIGABRT', 'SIGBUS', 'SIGFPE', 'SIGUSR1', 'SIGSEGV', 'SIGUSR2', 'SIGPIPE', 'SIGTERM'].forEach(self.terminatorSetup);



};



//make a new express app

var app = new App();
