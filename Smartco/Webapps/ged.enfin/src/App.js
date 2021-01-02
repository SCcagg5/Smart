import React, {Component} from 'react';
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import Login from "./pages/auth/login";
import Logout from "./pages/auth/logout";
import {pdfjs} from 'react-pdf';
import SignDocV3 from "./pages/Drive/SignDocV3";
import Error from "./pages/Error/Error";
import Main from "./pages/Main/Main";
import RedirectCp from "./pages/RedirectCp"
import signup from "./pages/auth/signup";
import TestPage from "./pages/test"
import SmartService from "./provider/SmartService";
import d_logo from "./assets/logos/logo_enfin.jpg"
//import SmartService from "./provider/masterNodeService";
import MuiBackdrop from "./components/Loading/MuiBackdrop";
import firebase from "firebase/app";
import NewRecette from "./pages/Marketplace/Recettes/NewRecette";
import Questions from "./pages/questions/questions";


pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

//const d_logo = "data:image/png;base64,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"


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
            console.log(res)
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
                        {/*<Route exact path="/test" component={TestPage}/>*/}
                        <Route  path="/home" component={Main}/>
                        <Route exact path="/signDoc/doc/:doc_id" component={SignDocV3}/>
                        <Route exact path="/newRecette" component={NewRecette}/>
                        <Route exact path="/login" component={Login}/>
                        <Route exact path="/signup" component={signup}/>
                        <Route exact path="/logout" component={Logout}/>*
                        <Route exact path="/bodycheck" component={Questions}/>
                        <Route component={Error}/>
                    </Switch>
                </Router>
            )
        }
    }

}




