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
import DataClient from "./Pages/QRtest/dataclient";
import SolarScore from "./Pages/QRtest/SolarScore";
import TreeScore from "./Pages/QRtest/TreeScore";
import Etiquette from "./Pages/etiquette/etiquette";

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
                <Router history={history}>
                    <Switch>
                        <Redirect exact from={"/"} to={"/home/categories"}/>
                        <Route path="/home" component={Accueil}/>
                        {/*<Route path="/login" component={Login}/>*/}
                        <Route exact path="/phone" component={Phone}/>
                        <Route exact path="/etiquette" component={Etiquette}/>

                        <Route exact path="/verifCode/:phone" component={VerifCode}/>
                        <Route exact path="/client/:id" component={DataClient}/>
                        <Route exact path="/client/:id/solarscore" component={SolarScore}/>
                        <Route exact path="/client/:id/treescore" component={TreeScore}/>
                    </Switch>
                </Router>
            )
        }
    }

}

