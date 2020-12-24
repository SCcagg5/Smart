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
import TestPage from "./pages/test"
import ScanBouteille from "./pages/ScanQrCode/ScanBouteille";
import 'video-react/dist/video-react.css'; // import css




pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

const firebaseConfig = {
    apiKey: "AIzaSyD0j29IhymwdAVupPNd0u9NiCfMpQHz2yM",
    authDomain: "oaged-4977b.firebaseapp.com",
    databaseURL: "https://oaged-4977b.firebaseio.com",
    projectId: "oaged-4977b",
    storageBucket: "oaged-4977b.appspot.com",
    messagingSenderId: "630942407293",
    appId: "1:630942407293:web:f57beb45a588e2e67caf14"
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
                    <Route exact path="/ScanBouteille" component={ScanBouteille}/>

                    <Route exact path="/test" component={TestPage}/>
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




