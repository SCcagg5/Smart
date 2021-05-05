import React, {Component} from 'react';
import {BrowserRouter as Router, Route,Switch} from "react-router-dom";
import "./assets/css/feather.css"
import "./assets/css/materialdesignicons.css"
import "./assets/css/dripiIcons.css"
import "./assets/css/fa.css"
import "./assets/css/fonts.css"
import './assets/scss/DefaultTheme.scss';
import './App.css'
import 'semantic-ui-css/semantic.min.css'










import firebase from "firebase/app";

import Gestion from "./pages/gestion/gestion";
import CQM from "./pages/cqm/cqm";
import Login from "./pages/auth/login";
import Signup from "./pages/auth/signup";
import Redirect from "./pages/Redirect";
import Signup2 from "./pages/auth/signup2";
import Accueil from "./pages/accueil/accueil";
import Managers from "./pages/managers/managers";









const firebaseConfig =  {
    apiKey: "AIzaSyADBksHxor-OBDNMwhLs8Z2-dikj8YTvTM",
    authDomain: "beautysane-61cf2.firebaseapp.com",
    databaseURL: "https://beautysane-61cf2.firebaseio.com",
    projectId: "beautysane-61cf2",
    storageBucket: "beautysane-61cf2.appspot.com",
    messagingSenderId: "716549886066",
    appId: "1:716549886066:web:cd3089ae9c371d3245f2eb",
    measurementId: "G-MM0W4MPEX2"
};



firebase.initializeApp(firebaseConfig);

class App extends Component{


  componentWillMount() {

  }


    render() {

    return(
        <Router>


          <Switch>
              <Route exact path="/" component={Redirect}/>
              <Route exact path="/accueil" component={Accueil}/>

            <Route exact path="/gestion" component={Gestion}/>
              <Route exact path="/cqm" component={CQM}/>

              <Route exact path="/manager/map" component={Managers}/>

              <Route exact path="/login" component={Login}/>
              <Route exact path="/Signup" component={Signup}/>
              <Route exact path="/Signup2" component={Signup2}/>












          </Switch>













            {/*<Route exact path="/login" name="login" component={Login}/>
          <Route exact path="/logout" name="logout" component={Logout}/>*/}

        </Router>
    )
  }

}

export default App;




