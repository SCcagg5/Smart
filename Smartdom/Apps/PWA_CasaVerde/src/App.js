import React from 'react';
import './App.css';
import MuiBackdrop from "./Components/Loading/MuiBackdrop";
import {BrowserRouter as Router, Route, Switch, Redirect} from "react-router-dom";
import {pdfjs} from 'react-pdf';
import 'moment/locale/fr';
import Accueil from "./Pages/accueil/Accueil";
import Login from "./Pages/auth/login"
import moment from "moment";
import Phone from "./Pages/auth/phone";
import VerifCode from "./Pages/auth/verifCode";
import history from "./Pages/routes/history";
import SmartService from "./provider/SmartService";
import utilFunctions from "./tools/functions";
import rethink from "./controller/rethink";
import 'swiper/swiper.scss';
import GoogleLog from "./Pages/auth/googleLogin";


pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;


export default class App extends React.Component {

    state = {
        loading: false
    }

    componentDidMount() {
        this.createLabelVinDB()
    }

    createLabelVinDB = () => {
        rethink.createDB("b116081d-3145-4dc3-b3df-5ac2bde13e9d", "test").then (r1 => {
            if (r1 === true) console.log("NEW DB CREATED");
            if (r1 === false) console.log("DB ALREADY EXIST");
        })
    }


    render() {

        if (this.state.loading === true) {
            return (
                <MuiBackdrop open={true}/>
            )
        } else {
            return (
                !localStorage.getItem("email") || localStorage.getItem("email") === "" ?
                <Router history={history}>
                    <Switch>
                        <Redirect exact from={"/"} to={"/login_with_google"}/>
                        <Redirect from={"/home"} to={"/login_with_google"}/>
                        <Route path="/login_with_google" component={GoogleLog}/>
                    </Switch>
                </Router> :

                    <Router history={history}>
                        <Switch>
                            <Redirect exact from={"/"} to={"/home/categories"}/>
                            <Route path="/home" component={Accueil}/>
                            <Route exact path="/phone" component={Phone}/>
                            <Route exact path="/verifCode/:phone" component={VerifCode}/>
                        </Switch>
                    </Router>
            )
        }
    }

}

