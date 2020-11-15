import React, {Component} from 'react';
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import Login from "./pages/auth/login";
import Logout from "./pages/auth/logout";
import firebase from "firebase/app";
import {pdfjs} from 'react-pdf';
import SignDocV3 from "./pages/Drive/SignDocV3";
import Error from "./pages/Error/Error";
import Main from "./pages/Main/Main";
import RedirectCp from "./pages/RedirectCp"
/*import {DefaultSession as RethinkSession, DefaultMixin as RethinkMixin} from 'react-rethinkdb';*/
/*const RethinkdbWebsocketClient = require('rethinkdb-websocket-client');
const r = RethinkdbWebsocketClient.rethinkdb;*/
/*import r from "rethinkdb"*/
import RR from 'react-rethinkdb';

function call(usr_token, cmd, db = "test", read_change=false){
    let socket = new WebSocket("wss://api.smartdom.ch/ws/" + usr_token);
    socket.onopen = function(e) {
        console.log("[open] Connection established");
        let payload;
        payload = {"cmd": cmd, "db": db, "read_change": read_change}
        socket.send(JSON.stringify(payload));
    };
    socket.onmessage = function(event) {
        console.log(JSON.parse(event.data));
    };
    socket.error = function(event) {
        console.log(`[error]`);
    };
    socket.onclose = function(event) {
        console.log(`[close]`);
    };
}

/*//usr_token temporaire

// r.table('authors').run()
call('test', 'table("authors")', "test", false)

// r.table('authors').run() && r.table('authors').changes.run()
call('test', 'table("authors")', "test", true)*/

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;





const firebaseConfig = {
    apiKey: "AIzaSyBUD2L-c4IrUhcXieQOfhQaMK8WUJ_FomY",
    authDomain: "ged01-290815.firebaseapp.com",
    databaseURL: "https://ged01-290815.firebaseio.com",
    projectId: "ged01-290815",
    storageBucket: "ged01-290815.appspot.com",
    messagingSenderId: "314795661092",
    appId: "1:314795661092:web:26f4425c5939fb6bd3c5b1"
};


firebase.initializeApp(firebaseConfig);

export default class App extends Component {

    constructor(props) {
        super(props);

    }


    componentDidMount() {
        //call('test', 'table("authors")', "test", true)
        /*RR.DefaultSession.connect({
            host: 'api.smartdom.ch',   // hostname of the websocket server
            //port: 28015,                  // port number of the websocket server
            path: '/ws/test',                   // HTTP path to websocket route test
            secure: true,                // set true to use secure TLS websockets
            db: 'test',                  // default database, passed to rethinkdb.connect
            //user:'admin',
            //password:'test',
            autoReconnectDelayMs: 2000,  // when disconnected, millis to wait before reconnect
        })*/
    }


    render() {

        return (
            <Router>
                <Switch>
                    <Route exact path="/" component={RedirectCp}/>
                    <Route  path="/home" component={Main}/>
                    <Route exact path="/signDoc/doc/:doc_id" component={SignDocV3}/>
                    <Route exact path="/login" component={Login}/>
                    <Route exact path="/logout" component={Logout}/>
                    <Route component={Error}/>
                </Switch>
            </Router>
        )
    }

}




