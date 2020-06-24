import React, {Component} from 'react';
import {BrowserRouter as Router, Route} from "react-router-dom";
import firebase from "firebase/app";
import domiciliation from "./pages/marketplace/domiciliation";
import personnalisationService from "./pages/marketplace/personnalisationService";
import smartdom from "./pages/SmartDom/smartdom";
import smartdomForfait from "./pages/SmartDom/smartdomForfait";
import MeetingRoom from "./pages/SmartDom/Meeting/MeetingRoom";
import fonctionnalite from "./pages/SmartDom/fonctionnalite";
import tokenizeSmartco from "./pages/SmartDom/tokenizeSmartco";


const firebaseConfig = {
    apiKey: "AIzaSyDiNKIZqVeEplSp7Rinc1mHj6K_d6MC9yw",
    authDomain: "smartdom-69faf.firebaseapp.com",
    databaseURL: "https://smartdom-69faf.firebaseio.com",
    projectId: "smartdom-69faf",
    storageBucket: "smartdom-69faf.appspot.com",
    messagingSenderId: "586401405017",
    appId: "1:586401405017:web:4f2e99c2a3d319d1efb948",
    measurementId: "G-YGGTJ16JP5"
};


firebase.initializeApp(firebaseConfig);

class App extends Component {


    render() {

        return (
            <Router>
                <Route exact path="/" component={domiciliation}/>
                <Route exact path="/PersonnalisationService" component={personnalisationService}/>

                <Route exact path="/SmartDom/Meeting/Room/:idMeeting" component={MeetingRoom}/>

                <Route exact path="/SmartDom" component={smartdom}/>

                <Route exact path="/SmartDom/forfait" component={smartdomForfait}/>
                <Route exact path="/fonctionnalite" component={fonctionnalite}/>
                <Route exact path="/tokenizeSmartco" component={tokenizeSmartco}/>



            </Router>
        )
    }

}

export default App;




