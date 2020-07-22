import React, {Component} from 'react';
import {BrowserRouter as Router, Route} from "react-router-dom";
import Login from "./pages/auth/login";
import Logout from "./pages/auth/logout";
import Redirect from "./pages/redirect";
import ListAvocats from "./pages/avocats/listAvocats";
import DetailAvocat from "./pages/avocats/detailAvocat";
import firebase from "firebase/app";
import Dash from "./Dashboard";
import CoffreFortNewVersion from "./pages/coffreFort/CoffreFortNewVersion";
import Meeting from "./pages/Meet/Meeting";




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


  componentDidMount() {

  }


    render() {

    return(

        <Router>
          <Route exact path="/" component={Redirect}/>
          <Route exact path="/dashboard" component={Dash}/>
          <Route exact path="/coffre-fort" component={CoffreFortNewVersion}/>
          <Route exact path="/meet" component={Meeting}/>
          <Route exact path="/login" name="login" component={Login}/>
          <Route exact path="/logout" name="logout" component={Logout}/>
          <Route exact path="/avocats" name="avocats" component={ListAvocats}/>
          <Route exact path="/detailAvocats" name="detailAvocats" component={DetailAvocat}/>
        </Router>
    )
  }

}

export default App;




