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

function call(usr_token, cmd, db = "test", read_change=false){
    let socket = new WebSocket("wss://api.smartdom.ch/ws/" + usr_token);
    socket.onopen = function(e) {
        console.log("[open] Connection established");
        let payload;
        payload = {"cmd": cmd, "db": db, "read_change": read_change}
        socket.send(JSON.stringify(payload));
    };
    let data=[];
    socket.onmessage = function(event) {
        let recieve = JSON.parse(event.data);
        //console.log(recieve)
        if(recieve.id){
            data.push(recieve);
        }
        //update
        if(recieve.new_val && recieve.old_val){
            let index_to_updated = data.findIndex(x => x.id === recieve.old_val.id)
            data[index_to_updated] = recieve.new_val;
        }
        //insert
        else if(recieve.new_val){
            data.push(recieve.new_val)
        }
        //remove
        else if(recieve.old_val){
            data.splice(data.findIndex(x => x.id === recieve.old_val.id),1);
        }
        console.log(data)
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




