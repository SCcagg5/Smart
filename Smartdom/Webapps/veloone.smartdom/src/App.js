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
import velair from "./pages/veloOne/velair";
import login from "./pages/veloOne/login";
import stripe from "./pages/veloOne/stripe";
import reservation from "./pages/veloOne/reservation";
import categorie from "./pages/veloOne/categorie";
import invoice from "./pages/veloOne/invoice";




const firebaseConfig = {
    apiKey: "AIzaSyCekyB99aE06MlvuqZSX0FaNK9RjbuOML0",
    authDomain: "veloone-e4bfd.firebaseapp.com",
    databaseURL: "https://veloone-e4bfd.firebaseio.com",
    projectId: "veloone-e4bfd",
    storageBucket: "veloone-e4bfd.appspot.com",
    messagingSenderId: "795962480650",
    appId: "1:795962480650:web:3964c2cae2683a540ee7f3",
    measurementId: "G-084MJQ6MKN"
};

/*const firebaseConfig = {
    apiKey: "AIzaSyBOAc63TdOGnA0S3Gs8q7oqtcvOj0Y8woM",
    authDomain: "smartco-9b472.firebaseapp.com",
    databaseURL: "https://smartco-9b472.firebaseio.com",
    projectId: "smartco-9b472",
    storageBucket: "smartco-9b472.appspot.com",
    messagingSenderId: "842580011421",
    appId: "1:842580011421:web:15375b5c79d85cf3a0a774"
};*/


firebase.initializeApp(firebaseConfig);

class App extends Component{


  componentWillMount() {

  }


    render() {

    return(
        <Router>

            <Route exact path="/" component={index}/>
            <Route  path="/categorie/:type" component={categorie}/>


            <Route exact path="/velair" component={velair}/>
            <Route exact path="/login" component={login}/>
            <Route exact path="/payment" component={stripe}/>
            <Route exact path="/reservation" component={reservation}/>
            <Route exact path="/invoice" component={invoice}/>
























            {/*<Route exact path="/login" name="login" component={Login}/>
          <Route exact path="/logout" name="logout" component={Logout}/>*/}

        </Router>
    )
  }

}

export default App;




