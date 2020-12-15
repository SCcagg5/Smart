import React, {Component} from 'react';
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import Login from "./pages/auth/login";
import Logout from "./pages/auth/logout";
import firebase from "firebase/app";
import {pdfjs} from 'react-pdf';
import SignDocV3 from "./pages/Drive/SignDocV3";
import Error from "./pages/Error/Error";
import Main from "./pages/Main/Main";
import RedirectCp from "./pages/RedirectCp"
import signup from "./pages/auth/signup";
import NewRecette from "./pages/Marketplace/Recettes/NewRecette";
import Questions from "./pages/questions/questions";
import TestPage from "./pages/test"
//import SmartService from "./provider/SmartService";
import SmartService from "./provider/masterNodeService";
import d_logo from "../src/assets/logos/default.png"
import MuiBackdrop from "./components/Loading/MuiBackdrop";
import CreateENT from "./pages/CreateENT/CreateENT";
import logo from "./assets/logos/dark-kitchen_logo.jpeg"



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

export default class App extends Component {

    // eslint-disable-next-line no-useless-constructor
    constructor(props) {
        super(props);
    }

    state={
        loading:true
    }

    componentDidMount() {

        SmartService.getLogo().then( res => {
            if (res && res.succes === true && res.status === 200 && res.data.logo && res.data.logo !== "") {
                localStorage.setItem("logo",res.data.image === null ? d_logo : res.data.image)
                localStorage.setItem("ent_name",res.data.name)
                this.setState({loading:false})
            }else{
                localStorage.setItem("logo",d_logo)
                this.setState({loading:false})
            }
        }).catch(err => {
            localStorage.setItem("logo",d_logo)
            this.setState({loading:false})
        })

    }

    render() {

        if(this.state.loading === true){
            return(
                <MuiBackdrop open={true} />
            )
        }else{
            return (
                <Router>
                    <Switch>
                        <Route exact path="/" component={RedirectCp}/>
                        <Route exact path="/test" component={TestPage}/>
                        {/*<Route exact path="/createENT" component={CreateENT}/>*/}
                        <Route  path="/home" component={Main}/>
                        <Route exact path="/signDoc/doc/:doc_id" component={SignDocV3}/>
                        <Route exact path="/newRecette" component={NewRecette}/>
                        <Route exact path="/login" component={Login}/>
                        <Route exact path="/signup" component={signup}/>
                        <Route exact path="/logout" component={Logout}/>
                        <Route exact path="/bodycheck" component={Questions}/>
                        <Route component={Error}/>
                    </Switch>
                </Router>
            )
        }
    }

}




