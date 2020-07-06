import React, {Component} from 'react';
import {BrowserRouter as Router, Route} from "react-router-dom";
import Dashboard from "./pages/dashboard/index"
import CoffreFort from "./pages/coffreFort/coffreFort";
import Login from "./pages/auth/login";
import Logout from "./pages/auth/logout";
import Redirect from "./pages/redirect";
import SignDocStatut from "./pages/actionnaires/signatures/signDocStatut";
import SignDocAGE from "./pages/actionnaires/signatures/signDocAGE";
import ListAvocats from "./pages/avocats/listAvocats";
import DetailAvocat from "./pages/avocats/detailAvocat";
import AvocatInfos from "./pages/accesAvocats/infos";
import AvocatDisponibilite from "./pages/accesAvocats/disponibilite";
import Entreprises from "./pages/dashboard/entreprises/entreprises";
import ChoixCreationSociete from "./pages/dashboard/entreprises/choixCreationSociete";
import NewSuisseSARLEntreprise from "./pages/dashboard/entreprises/newSuisseSARLEntreprise";
import NewEntreprise from "./pages/dashboard/entreprises/newEntreprise";
import EntrepriseDashboard from "./pages/dashboard/entreprises/entrepriseDashboard";
import SuisseEntrepriseDashboard from "./pages/dashboard/entreprises/SuisseEntrepriseDashboard";
import Operations from "./pages/dashboard/entreprises/operations/operations";
import EmissionTitre from "./pages/dashboard/entreprises/operations/emissionTitre/emissionTitre";
import ChoixActionnaires from "./pages/dashboard/entreprises/operations/emissionTitre/choixActionnaires";
import InfoAfterChoise from "./pages/dashboard/entreprises/operations/emissionTitre/infoAfterChoise";
import AffectationTitre from "./pages/dashboard/entreprises/operations/emissionTitre/affectationTitre";
import OperationDetails from "./pages/dashboard/entreprises/operations/emissionTitre/operationDetails";
import AugmCapitalSuisse from "./pages/dashboard/entreprises/operations/Suisse/augmCapitalSuisse";
import SignSARLDocStatut from "./pages/actionnaires/signatures/signSARLDocStatut";
import SignSARLDocProc from "./pages/actionnaires/signatures/signSARLDocProc";
import SignSARLDocDec from "./pages/actionnaires/signatures/signSARLDocDec";
import firebase from "firebase/app";
import TransfertList from "./pages/dashboard/entreprises/operations/transfertTitres/transfertList";
import CessionActions from "./pages/dashboard/entreprises/operations/transfertTitres/cessionActions";
import EmpruntObligationBonds from "./pages/dashboard/entreprises/operations/emissionTitre/empruntObligationBonds";
import AffectationBSA from "./pages/dashboard/entreprises/operations/emissionTitre/affectationBSA";
import OperationBSADetails from "./pages/dashboard/entreprises/operations/emissionTitre/operationBSADetails";
import StockOptionSuisse from "./pages/dashboard/entreprises/operations/emissionTitre/stockOptionSuisse";
import StockOptionSuissedetails from "./pages/dashboard/entreprises/operations/emissionTitre/stockOptionSuissedetails";
import SignObligationBonds from "./pages/actionnaires/signatures/signObligationBonds";
import DetailDoc from "./pages/coffreFort/detailDoc";
import DetailAugmCapital from "./pages/dashboard/entreprises/operations/Suisse/DetailAugmCapital";
import ChoixTransformation from "./pages/dashboard/entreprises/operations/Suisse/transformation/ChoixTransformation";
import SarlToSa from "./pages/dashboard/entreprises/operations/Suisse/transformation/SarlToSa";
import CessuinActionSuisse from "./pages/dashboard/entreprises/operations/transfertTitres/CessuinActionSuisse";

import LoginLePerray from "./pages/auth/loginLePerray";
import UserCoffreFort from "./pages/dashboard/UserCoffreFort"
import CarbonneInvestRedirect from "./pages/CarboneInvest/carboneInvestRedirect"
import CessionActionSign from "./pages/signatures/cessionActionSign"
import createGreenBonds from "./pages/dashboard/entreprises/operations/emissionTitre/greenbonds/createGreenBonds"
import greenBondsClimate from "./pages/dashboard/entreprises/operations/emissionTitre/greenbonds/greenBondsClimate"
import energyTypeofBondissuance from "./pages/dashboard/entreprises/operations/emissionTitre/greenbonds/energyTypeofBondissuance"
import transportTypeofBond from "./pages/dashboard/entreprises/operations/emissionTitre/greenbonds/transportTypeofBond";
import buildingTypeofBond from "./pages/dashboard/entreprises/operations/emissionTitre/greenbonds/buildingTypeofBond";

import EmpUtilityToken from "./pages/dashboard/entreprises/operations/Suisse/UtilityToken/EmpUtilityToken";

import StockOptionDetails from "./pages/coffreFort/stockOptionDetails";

import CoffreFortV2 from "./pages/coffreFort/coffreFortV2";

import UpdateSo from "./pages/dashboard/entreprises/update/updateSo";
import Test from "./Test";
import Dash from "./Dashboard";
import CoffreFortNewVersion from "./pages/coffreFort/CoffreFortNewVersion";




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
          <Route exact path="/" component={Redirect}/>
          <Route exact path="/dashboard" component={Dash}/>

          <Route exact path="/gestion/entreprises" component={Entreprises}/>
          <Route exact path="/gestion/entreprises/details" component={EntrepriseDashboard}/>
          <Route exact path="/gestion/entreprises/Suisse/details" component={SuisseEntrepriseDashboard}/>
          <Route exact path="/gestion/entreprises/Suisse/update/:uid" component={UpdateSo}/>
          <Route exact path="/gestion/entreprises/Suisse/AugmCapital" component={AugmCapitalSuisse}/>
          <Route exact path="/gestion/entreprises/Suisse/Detail" component={DetailAugmCapital}/>

          <Route exact path="/gestion/entreprises/operations" component={Operations}/>
          <Route exact path="/gestion/entreprises/operations/transformation" component={ChoixTransformation}/>
          <Route exact path="/gestion/entreprises/operations/transformation/SarlToSa" component={SarlToSa}/>

          <Route exact path="/gestion/entreprises/operations/transfertTitres" component={TransfertList}/>
          <Route exact path="/gestion/entreprises/operations/transfertTitres/cessionActions" component={CessionActions}/>
          <Route exact path="/gestion/entreprises/operations/transfertTitres/cessionActionSuisse" component={CessuinActionSuisse}/>

          <Route exact path="/gestion/entreprises/operations/emissionTitres" component={EmissionTitre}/>
          <Route exact path="/gestion/entreprises/operations/emissionTitres/1" component={ChoixActionnaires}/>
          <Route exact path="/gestion/entreprises/operations/emissionTitres/1/info" component={InfoAfterChoise}/>
          <Route exact path="/gestion/entreprises/operations/emissionTitres/1/info/affectation" component={AffectationTitre}/>
          <Route exact path="/gestion/entreprises/operations/emissionTitres/1/info/affectation/opAugDetails" component={OperationDetails}/>

            <Route exact path="/gestion/entreprises/operations/emissionTitres/5" component={EmpruntObligationBonds}/>
            <Route exact path="/gestion/entreprises/operations/UtilityToken" component={EmpUtilityToken}/>

            <Route exact path="/gestion/entreprises/operations/emissionTitres/3" component={AffectationBSA}/>
            <Route exact path="/gestion/entreprises/operations/emissionTitres/3/Details" component={OperationBSADetails}/>

            <Route exact path="/gestion/entreprises/operations/emissionTitres/stockOption" component={StockOptionSuisse}/>
            <Route exact path="/gestion/entreprises/operations/emissionTitres/stockOption/Details" component={StockOptionSuissedetails}/>

            <Route exact path="/gestion/entreprises/operations/emissionTitres/CreationGreenBonds" component={createGreenBonds}/>
            <Route exact path="/gestion/entreprises/operations/emissionTitres/CreationGreenBonds/GreenBondsCLimate" component={greenBondsClimate}/>
            <Route exact path="/gestion/entreprises/operations/emissionTitres/CreationGreenBonds/GreenBondsCLimate/Energy" component={energyTypeofBondissuance}/>
            <Route exact path="/gestion/entreprises/operations/emissionTitres/CreationGreenBonds/GreenBondsCLimate/Transport" component={transportTypeofBond}/>
            <Route exact path="/gestion/entreprises/operations/emissionTitres/CreationGreenBonds/GreenBondsCLimate/Building" component={buildingTypeofBond}/>


          <Route exact path="/gestion/creation" component={ChoixCreationSociete}/>
          <Route exact path="/gestion/creation/1" component={NewSuisseSARLEntreprise}/>
          <Route exact path="/gestion/creation/2" component={NewEntreprise}/>



          <Route exact path="/coffre-fort/test" component={CoffreFort}/>
          <Route exact path="/coffre-fort" component={CoffreFortNewVersion}/>

          <Route exact path="/detailsDoc" component={DetailDoc}/>
          <Route exact path="/coffre-fort/stockOption/:id1/:id2/:beneficiaire" component={StockOptionDetails}/>
          <Route exact path="/login" name="login" component={Login}/>
          <Route exact path="/leperray/login" name="loginLPE" component={LoginLePerray}/>

          <Route exact path="/logout" name="logout" component={Logout}/>
          <Route exact path="/signPdf/:SocietyUID/:pays/:actID" component={SignDocStatut}/>
          <Route exact path="/signAGE/:SocietyUID/:numAugmentation/:actID" component={SignDocAGE}/>
          <Route exact path="/signSARLStatut/:SocietyUID/:pays/:actID" component={SignSARLDocStatut}/>

          <Route exact path="/signSARLProcuration/:SocietyUID/:pays/:actID" component={SignSARLDocProc}/>
          <Route exact path="/signSARLDeclaration/:SocietyUID/:pays/:actID" component={SignSARLDocDec}/>

            <Route exact path="/signature/ObligationBonds/:uid/:type/:index/by/:email" component={SignObligationBonds}/>


          <Route exact path="/avocats" name="avocats" component={ListAvocats}/>
          <Route exact path="/detailAvocats" name="detailAvocats" component={DetailAvocat}/>
          <Route exact path="/avocat/infos" name="settings" component={AvocatInfos}/>
          <Route exact path="/avocat/agenda" name="settings" component={AvocatDisponibilite}/>


          <Route exact path="/user/coffre-fort" name="coffre-fort" component={UserCoffreFort}/>

          <Route exact path="/pay/:id" name="C+E-Redirect" component={CarbonneInvestRedirect}/>
          <Route exact path="/sign/:id/:typeUser" name="CessionActSign" component={CessionActionSign}/>


          <Route exact path="/test" name="test" component={Test}/>
          <Route exact path="/test2" name="test" component={Dash}/>
        </Router>
    )
  }

}

export default App;




