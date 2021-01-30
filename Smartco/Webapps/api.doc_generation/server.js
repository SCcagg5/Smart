function start() {
    var fs = require('fs');
    var http = require('http');
    var https = require('https');
    var express = require('express');
    var app = express();
    var bodyParser = require('body-parser');

    app.use(bodyParser.urlencoded({
        extended: true
    })); //mode de reception des données
    app.use(bodyParser.json());

    //allow cross domain 
    app.use(function(req, res, next) {
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
        next();
    });

    app.use(require("body-parser").json());

    let routes = require('./api/routes/apiRoutes'); // recuperation des routes
    routes(app);

    var httpServer = http.createServer(app);
    httpServer.listen(3000); //port

    console.log("API started on port: 3000");
}

console.log("API is starting...");
start();
