import React, {Component} from 'react';
import {BrowserRouter as Router, Route} from "react-router-dom";
import "./assets/css/feather.css"
import "./assets/css/materialdesignicons.css"
import "./assets/css/dripiIcons.css"
import "./assets/css/fa.css"
import "./assets/css/fonts.css"
import './assets/scss/DefaultTheme.scss';
import './App.css'
import 'primereact/resources/themes/nova-light/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';



import Logout from "./pages/auth/logout";

import redirect from "./pages/dashboard/entreprises/redirect";

import firebase from "firebase/app";

import courrier from "./pages/smartDom/courrier";
import personnalisationService from "./pages/smartDom/personnalisationService";
import smartdom from "./pages/smartDom/smartdom";
import smartdomForfait from "./pages/smartDom/smartdomForfait";
import login from "./pages/auth/login";
import salles from "./pages/smartDom/salles";
import salleAbonnement from "./pages/smartDom/salleAbonnement";
import sallesMarketplace from "./pages/smartDom/sallesMarketplace";
import societes from "./pages/smartDom/societes";
import crm from "./pages/smartDom/crm";
import FiducaireInfos from "./pages/accessFiduciaires/infos";
import AvocatInfos from "./pages/accesAvocats/infos";



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

class App extends Component{


  componentWillMount() {
  }


    render() {

    return(
        <Router>
          <Route exact path="/" component={redirect}/>
            <Route exact path="/courrier" component={courrier}/>
            <Route exact path="/crm" component={crm}/>

            <Route exact path="/salles" component={salles}/>
            <Route exact path="/salles/abonnement" component={salleAbonnement}/>
            <Route exact path="/salles/abonnement/marketplace" component={sallesMarketplace}/>
            <Route exact path="/salles/abonnement/marketplace/societes" component={societes}/>
            <Route exact path="/PersonnalisationService" component={personnalisationService}/>



            <Route exact  path="/SmartDom" component={smartdom}/>

            <Route exact  path="/SmartDom/forfait" component={smartdomForfait}/>

            <Route exact  path="/login" component={login}/>

            <Route exact path="/avocat/infos" name="settings" component={AvocatInfos}/>

            <Route exact path="/fiduciaire/infos" name="settingsF" component={FiducaireInfos}/>





            <Route exact path="/logout" name="logout" component={Logout}/>

        </Router>
    )
  }

}

export default App;




