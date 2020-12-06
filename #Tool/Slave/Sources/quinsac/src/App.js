import React, {Component} from 'react';
import {BrowserRouter as Router, Route} from "react-router-dom";
import "./assets/css/feather.css"
import "./assets/css/materialdesignicons.css"
import "./assets/css/dripiIcons.css"
import "./assets/css/fa.css"
import "./assets/css/fonts.css"
import './assets/scss/DefaultTheme.scss';
import './App.css'










import firebase from "firebase/app";
import Etape1 from "./pages/auth/signUp/etape1";
import Etape2 from "./pages/auth/signUp/etape2";
import index from "./pages/veloOne/index";
import Login from "./pages/auth/login/login";
import Logout from "./pages/auth/logout";
import Documents from "./pages/auth/completerProfil/documents";
import SituationEtExp from "./pages/auth/completerProfil/situationEtExp";
import Signature from "./pages/auth/completerProfil/signature";

import InvestisorSignUp from "./pages/auth/signUp/investisorSignUp";

import EnergieRenouvelables from "./pages/projects/energieRenouvelables";
import CommentInvestir from "./pages/commentInvestir";

import login from "./pages/veloOne/login";
import categorie from "./pages/veloOne/categorie";
import invoice from "./pages/invoice";




const firebaseConfig = {
    apiKey: "AIzaSyBZzmIgVrXxE3xohn48vXX65maBX9WCjoE",
    authDomain: "quinsac-55271.firebaseapp.com",
    databaseURL: "https://quinsac-55271.firebaseio.com",
    projectId: "quinsac-55271",
    storageBucket: "quinsac-55271.appspot.com",
    messagingSenderId: "856473453678",
    appId: "1:856473453678:web:e3be0c6aa35cd9b84cd27f",
    measurementId: "G-P8VCKR3M92"
};




firebase.initializeApp(firebaseConfig);

class App extends Component{


  componentWillMount() {

  }


    render() {

    return(
        <Router>

            <Route exact path="/" component={index}/>
            <Route  path="/categorie/:type" component={categorie}/>

            <Route exact path="/signup/investisor" component={InvestisorSignUp}/>
            <Route exact path="/signup/investisor/step1" component={Etape1}/>
            <Route exact path="/signup/investisor/step2" component={Etape2}/>
            <Route exact path="/investisor/completer-profil/documents" component={Documents}/>
            <Route exact path="/investisor/completer-profil/situationEtExperiences" component={SituationEtExp}/>
                <Route exact path="/investisor/completer-profil/signature" component={Signature}/>

            <Route exact path="/acceuil/energies-renouvelables" component={EnergieRenouvelables}/>
            <Route exact path="/comment-investir" component={CommentInvestir}/>

            <Route exact path="/invoice" component={invoice}/>



            <Route exact path="/login" component={Login}/>
            <Route exact path="/logout" name="logout" component={Logout}/>
























            {/*<Route exact path="/login" name="login" component={Login}/>
          <Route exact path="/logout" name="logout" component={Logout}/>*/}

        </Router>
    )
  }

}

export default App;




