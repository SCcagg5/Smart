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

import 'bootstrap/dist/css/bootstrap.min.css';







import firebase from "firebase/app";

import forfait from "./pages/marketplace/forfait";



const firebaseConfig = {
    apiKey: "AIzaSyB36i6XUg4UFhMRNw12cf5VqlrIvAyvxdI",
    authDomain: "smartcofrance.firebaseapp.com",
    databaseURL: "https://smartcofrance.firebaseio.com",
    projectId: "smartcofrance",
    storageBucket: "smartcofrance.appspot.com",
    messagingSenderId: "482572690350",
    appId: "1:482572690350:web:227e8392adc52f86"
};




firebase.initializeApp(firebaseConfig);

class App extends Component{


  componentWillMount() {

  }


    render() {

    return(
        <Router>
          <Route exact path="/" component={forfait}/>








          {/*<Route exact path="/login" name="login" component={Login}/>
          <Route exact path="/logout" name="logout" component={Logout}/>*/}

        </Router>
    )
  }

}

export default App;




