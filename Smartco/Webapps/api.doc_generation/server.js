function start() {
    var fs = require('fs');
    var http = require('http');
    var https = require('https');
    var express = require('express');
    var app = express();
    var bodyParser = require('body-parser');
    var schedule = require('node-schedule');
    var rethink = require('./api/controllers/rethink')
    var apiController = require('./api/controllers/apiController')
    var db_name = "ENFIN"


    /*const MinuteJob = schedule.scheduleJob('30 * * * * *', function(){

        rethink.getTableData(db_name,"rooms").then(res => {
            let rooms = res || [];
            let rooms_tasks = [];
            rooms.map(room => {
                (room.tasks || []).filter(x => x.send_mail_period === "day").map(task => {
                    rooms_tasks.push(task)
                })
            })
            apiController.send_ENFIN_new_room_task_files_mail().then(r => {
                console.log(r)
            }).catch(err => {
                console.log(err)
            })
        }).catch(err => {console.log(err)})

    });*/

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
    httpServer.listen(3005); //port

    console.log("API started on port: 3005");
}

console.log("API is starting...");
start();
