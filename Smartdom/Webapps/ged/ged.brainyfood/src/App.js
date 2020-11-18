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
import signup from "./pages/auth/signup";
import NewRecette from "./pages/Recettes/NewRecette";
import Questions from "./pages/questions/questions";

import logo from "./assets/logos/brainyfood_logo.jpeg"

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

    // eslint-disable-next-line no-useless-constructor
    constructor(props) {
        super(props);
        localStorage.setItem("logo",logo)
    }

    render() {

        return (
            <Router>
                <Switch>
                    <Route exact path="/" component={RedirectCp}/>
                    <Route  path="/home" component={Main}/>
                    <Route exact path="/signDoc/doc/:doc_id" component={SignDocV3}/>
                    <Route exact path="/newRecette" component={NewRecette}/>
                    <Route exact path="/login" component={Login}/>
                    <Route exact path="/signup" component={signup}/>
                    <Route exact path="/logout" component={Logout}/>
                    <Route exact path="/bodycheck" component={Questions}/>
                    <Route component={Error}/>
                </Switch>
            </Router>
        )
    }

}




