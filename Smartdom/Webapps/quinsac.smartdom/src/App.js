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

import index from "./pages/veloOne/index";
import login from "./pages/veloOne/login";
import categorie from "./pages/veloOne/categorie";




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


            <Route exact path="/login" component={login}/>























            {/*<Route exact path="/login" name="login" component={Login}/>
          <Route exact path="/logout" name="logout" component={Logout}/>*/}

        </Router>
    )
  }

}

export default App;




