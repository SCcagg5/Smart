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

/*var ReactRethinkdb = require('react-rethinkdb');
var r = ReactRethinkdb.r;*/



pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;


/*ReactRethinkdb.DefaultSession.connect({
    host: 'http://smartdom.ch',   // hostname of the websocket server
    port: 28015,                  // port number of the websocket server
    path: '/',                     // HTTP path to websocket route test
    secure: false,                // set true to use secure TLS websockets
    db: 'test',                  // default database, passed to rethinkdb.connect
    user:'admin',
    password:'',
    autoReconnectDelayMs: 2000,  // when disconnected, millis to wait before reconnect
})*/

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




