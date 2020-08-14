import React, {Component} from 'react';
import {BrowserRouter as Router, Route, Redirect} from "react-router-dom";
import Login from "./pages/auth/login";
import Logout from "./pages/auth/logout";
import RedirectCp from "./pages/RedirectCp";
import ListAvocats from "./pages/avocats/listAvocats";
import DetailAvocat from "./pages/avocats/detailAvocat";
import firebase from "firebase/app";
import Dash from "./Dashboard";
import Meeting from "./pages/Meet/Meeting";
import Rooms from "./pages/Rooms/Rooms";
import Chat from "./pages/Chat/chat";
import DriveV2 from "./pages/Drive/DriveV2";
import MuiBackdrop from "./components/Loading/MuiBackdrop";


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

export default class App extends Component{

    render() {
    return(
        <Router>
          <Route  path="/" component={RedirectCp}/>
          <Route exact path="/dashboard" component={Dash}/>
          <Route exact path="/:section/:section_id" component={DriveV2}/>
          <Route exact path="/rooms" component={Rooms}/>
          <Route exact path="/Chat" component={Chat}/>
          <Route exact path="/meet" component={Meeting}/>
          <Route exact path="/login" name="login" component={Login}/>
          <Route exact path="/logout" name="logout" component={Logout}/>
          <Route exact path="/avocats" name="avocats" component={ListAvocats}/>
          <Route exact path="/detailAvocats" name="detailAvocats" component={DetailAvocat}/>
        </Router>
    )
  }

}




