import React from 'react';
import './App.css';
import MuiBackdrop from "./Components/Loading/MuiBackdrop";
import {BrowserRouter as Router, Route, Switch,Redirect} from "react-router-dom";
import {pdfjs} from 'react-pdf';
import 'moment/locale/fr';
import Accueil from "./Pages/accueil/Accueil";
import Login from "./Pages/auth/login"
import moment from "moment";
import Phone from "./Pages/auth/phone";
import VerifCode from "./Pages/auth/verifCode";
import history from "./Pages/routes/history";

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;



export default class App extends React.Component{

  state={
    loading:false
  }

  componentDidMount() {

  }



  render() {

    if(this.state.loading === true){
      return(
          <MuiBackdrop open={true} />
      )
    }else{
      return (
          <Router history={history}>
            <Switch>
              <Redirect exact from={"/"} to={"/home/categories"} />
              <Route  path="/home" component={Accueil}/>
              <Route  path="/login" component={Login}/>
              <Route exact  path="/phone" component={Phone}/>
              <Route exact  path="/verifCode/:phone" component={VerifCode}/>
            </Switch>
          </Router>
      )
    }
  }

}

