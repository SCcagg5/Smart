import React, {Component} from 'react';
import {BrowserRouter as Router, Route} from "react-router-dom";
import Login from "./pages/auth/login";
import Logout from "./pages/auth/logout";
import RedirectCp from "./pages/RedirectCp";
import firebase from "firebase/app";
import DriveV2 from "./pages/Drive/DriveV2";
import Test from "./pages/Test";
import Test2 from "./pages/Test2";
import { pdfjs } from 'react-pdf';
import SignDoc from "./pages/Drive/SignDoc";
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

export default class App extends Component{

    render() {
    return(
        <Router>
          <Route exact path="/" component={RedirectCp}/>
          <Route exact path="/test" component={Test}/>
          <Route exact path="/:section/:section_id" component={DriveV2}/>
          <Route exact path="/signDoc/doc/:doc_id" component={SignDoc}/>
          <Route exact path="/login" name="login" component={Login}/>
          <Route exact path="/logout" name="logout" component={Logout}/>
        </Router>
    )
  }

}




