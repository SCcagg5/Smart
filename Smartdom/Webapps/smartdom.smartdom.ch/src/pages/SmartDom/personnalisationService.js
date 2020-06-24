import React, {Component, Suspense} from "react";

import firebase from "firebase/app";
import Card from 'react-bootstrap/Card'
import CardGroup from 'react-bootstrap/CardGroup'
import CardDeck from 'react-bootstrap/CardDeck'

import {Transition} from 'react-spring/renderprops'

import'./personnalisationService.css'



import "firebase/database";
import 'firebase/storage';
import {AvFeedback, AvForm, AvGroup, AvInput} from "availity-reactstrap-validation";
import {Button, Container, FormGroup, Label, Modal, ModalHeader, ModalBody, ModalFooter} from "reactstrap";
import PhoneInput from "react-phone-input-2";
import countryList from "../../tools/countryList";
import MySnackbarContentWrapper from "../../tools/customSnackBar";
import Snackbar from "@material-ui/core/Snackbar";
import cantonList from "../../tools/cantonSuisse";
import moment from "moment";
import "moment/locale/fr"
import Loader from "../../components/Loader";
import posed from 'react-pose';




import dashboard from "../../assets/images/domiciliation/dashboard.jpeg"
import mailBox from "../../assets/images/domiciliation/mailbox.svg"
import productTeardown from "../../assets/images/domiciliation/personnalisationService/productTeardown.svg"
import businessPlan from "../../assets/images/domiciliation/personnalisationService/businessPlan.svg"
import buildingBlocks from "../../assets/images/domiciliation/personnalisationService/buildingBlocks.svg"
import commingHome from "../../assets/images/domiciliation/personnalisationService/comingHome.svg"
import judgeKaterin from "../../assets/images/domiciliation/personnalisationService/judgeKaterina.svg"
import result from "../../assets/images/domiciliation/personnalisationService/result.svg"
import runnerStart from "../../assets/images/domiciliation/personnalisationService/runnerStart.svg"
import photocopy from "../../assets/images/domiciliation/personnalisationService/photocopy.svg"
import mail from "../../assets/images/domiciliation/personnalisationService/mail.svg"
import mobileApplication from "../../assets/images/domiciliation/personnalisationService/Mobile_application.svg"
import telephone from "../../assets/images/domiciliation/personnalisationService/telephone.svg"
import interview from "../../assets/images/domiciliation/personnalisationService/interview.svg"
import salleReunion from "../../assets/images/domiciliation/personnalisationService/salleReunion.svg"



























const Topbar = React.lazy(() => import("../../components/Topbar"));
const Navbar = React.lazy(() => import("../../components/Navbar"));
const loading = () => <Loader/>;
const google = window.google;

moment.locale('fr');

const Box = posed.div({
    hoverable: true,
    pressable: true,
    init: {
        scale: 1,
        boxShadow: '0px 0px 0px rgba(0,0,0,0)'
    },
    hover: {
        scale: 1.13,
        boxShadow: '0px 5px 10px rgba(0,0,0,0.2)'
    },
    press: {
        scale: 1.1,
        boxShadow: '0px 2px 5px rgba(0,0,0,0.1)'
    }
});



class  personnalisationService extends Component {



    constructor(props) {
        super(props);



        this.state = {
            modalAssistance: false,
            modalWebCoferance: false,
            loading: false,
            isMenuOpened: false,
            activeMenuItem: 'item-gestion',
            openAlert: false,
            alertMessage: '',
            alertType: '',
            selectedPays: 'Suisse',

            showModal2: false,

            showModal: false,
            stoOperation: false,


        }

    }




    render() {



        return (





            <div>


                <header id="topnav" >
                    <Suspense fallback={loading()}>
                        <Topbar changeActivePage={this.changeActivePage}/>
                    </Suspense>
                </header>
                <div  className="wrapper " style={{backgroundColor:"#ffffff" }} >

                    <Suspense fallback={loading()}>
                        {this.state.loading && <Loader/>}


                     <section className=" text-center"  style={{paddingRight:"10%",paddingLeft:"10%"}}>
                        <div className="container bg-dark text-center"style={{ paddingLeft:"10%",paddingRight:"10%" }}>

                            <div className="container-fluid text-center">
                                <div>

                                    <h1 style={{color:"white",fontFamily:"Publico-Medium"}}> Plus de services, <text style={{fontWeight:"bold",color:"white"}}> moins de contraintes.</text> </h1>
                                </div>

                                <div className="mt-5">
                                    <p style={{fontFamily:"OpenSans-Regular" ,color:"#a6a6a6" ,fontSize:"22px"}}>La domiciliation ne s’arrête pas au choix de l’adresse, nous vous accompagnons tout au long de la vie de votre entreprise : de la création à sa gestion quotidienne.</p>
                                </div>
                            </div>

                            <div className="container mt-5   " style={{height:"28vw",position:"relative",boxSizing:"border-box",display:"block",padding:0,margin:0}}>
                                <img  className="shadow" src={dashboard} style={{width:"100%"   ,padding:0 ,boxSizing:"border-box",position:"absolute",left:0,top:0,boxShadow:""}}/>
                            </div>




                        </div>
                         <div className="d-flex justify-content-around " style={{marginTop:"7%"}}>
                             <div className="col-md-4 flex-column d-flex align-items-center">
                                 <div>
                                     <img src={mailBox} style={{width:"20%"}}/>
                                 </div>

                                 <div className="d-flex flex-column align-items-start">

                                     <h6 style={{fontWeight:"bold",fontFamily:"serif"}}>Gestion du courrier sur mesure</h6>


                                     <small  style={{color:"#87e3d3" , fontWeight:"bold" , cursor:"pointer"}}><a href="#gestion-courier"> > EN SAVOIR PLUS</a></small>
                                 </div>




                             </div>
                             <div className="col-md-4 flex-column d-flex align-items-center">
                                 <div>
                                     <img src={productTeardown} style={{width:"23%"}}/>
                                 </div>

                                 <div className="d-flex flex-column align-items-start">

                                     <h6 style={{fontWeight:"bold",fontFamily:"serif"}}>Solutions téléphoniques</h6>

                                     <a href="#solution-telephonique"> <small  style={{color:"#ffd296" , fontWeight:"bold"}}>> EN SAVOIR PLUS</small></a>
                                 </div>




                             </div>
                             <div className="col-md-4 flex-column d-flex align-items-center ">
                                 <div>
                                     <img src={businessPlan} style={{width:"23%"}}/>
                                 </div>

                                 <div className="d-flex flex-column align-items-start" >

                                     <h6 style={{fontWeight:"bold",fontFamily:"serif"}}>Salles de réunion et bureaux</h6>

                                     <small style={{color:"#fe89a7" , fontWeight:"bold"}}><a href="#salle_reunion"> EN SAVOIR PLUS</a></small>
                                 </div>




                             </div>


                         </div>
                     </section>

                        <section style={{marginTop:"7%"  }}  >


                            <div className="container bg-white  d-flex flex-column align-items-center justify-content-center text-center " >

                                <div className="container-fluid p-5">

                                <h1 style={{fontFamily:"serif",fontWeight:"bold"}}>Sélection de services sur mesure</h1>
                                <text style={{color:"#a6a6a6"}}>Nous avaons etabli des partenariats avec des spécialistes afin que vous puissez menez à
                                bien votre projet en quelques clics, depuis votre canapé !</text>

                                </div>

                                <div className="row  justify-content-around " style={{marginTop:"5%"}}>
                                    <div className="col-md-2 d-flex flex-column align-items-center text-center ">
                                        <div >
                                            <img src={runnerStart} style={{width:"75%"}}/>
                                        </div>

                                        <div className="mt-3">
                                            <h5 style={{fontSize:"1.1vw", fontFamily:"serif ", fontWeight:"bold"}}>Création de votre dossier en 5 minutes</h5>
                                        </div>


                                    </div>

                                    <div className="col-md-2 d-flex flex-column align-items-center text-center ">
                                        <div >
                                            <img src={buildingBlocks} style={{width:"95%"}}/>
                                        </div>

                                        <div className="mt-3">
                                            <h5 style={{fontSize:"1.1vw", fontFamily:"serif ", fontWeight:"bold"}}>Presentation de vos services</h5>
                                        </div>


                                    </div>
                                    <div className="col-md-2 d-flex flex-column align-items-center text-center ">
                                        <div >
                                            <img src={judgeKaterin} style={{width:"75%"}}/>
                                        </div>

                                        <div className="mt-3">
                                            <h5 style={{fontSize:"1.1vw", fontFamily:"serif ", fontWeight:"bold"}}>Suivi et validation par un avocat</h5>
                                        </div>


                                    </div>

                                    <div className="col-md-2 d-flex flex-column align-items-center text-center ">
                                        <div  >
                                            <img src={commingHome} style={{width:"100%"}}/>
                                        </div>

                                        <div className="mt-3">
                                            <h5 style={{fontSize:"1.1vw", fontFamily:"serif ", fontWeight:"bold"}}>Envoi du dossier au greffe</h5>
                                        </div>


                                    </div>
                                    <div className="col-md-2 d-flex flex-column align-items-center text-center ">
                                        <div >
                                            <img src={result} style={{width:"80%"}}/>
                                        </div>

                                        <div className="mt-3">
                                            <h5 style={{fontSize:"1.1vw", fontFamily:"serif ", fontWeight:"bold"}}>Obtention de votre domiciliation en 72h</h5>
                                        </div>


                                    </div>

                                </div>

                                <button
                                    style={{ width: "25%", borderColor: "#0c68ca", backgroundColor: "#0c68ca" , verticalAlign:"middle" }}
                                    className="btn btn-primary btn-lg text-center mt-5 " onClick={()=>{this.props.history.push("/marketplace/Domiciliation")}}>
                                    <small style={{fontSize: "0.8vw", fontWeight: "bold"}}>ÉTRE ACCOMPAGNÉ</small>
                                </button>




                            </div>



                        </section>

                        <section id="gestion-courier" className="container     " style={{marginTop:"7%" ,height:"600px"}}  >



                                <div className="row justify-content-between " style={{height:"100%"}}>




                                    <div className="col-md-4 align-self-start text-left">
                                        <img src={photocopy} style={{width:"80%"}}/>

                                        <h2 className="mt-3" style={{fontFamily:"publico-Medium" , fontWeight:"bold"}}>Gestion du courrier sur mesure</h2>

                                        <button onClick={()=>this.props.history.push("/smartDom")}
                                            style={{ width:"60%" , borderColor: "#0c68ca", backgroundColor: "#0c68ca" , verticalAlign:"middle" }}
                                            className="btn btn-primary btn-lg text-center mt-3 " >
                                            <small style={{ fontWeight: "NORMAL", fontFamily:"OpenSans-Bold"}}>JE COMMENCE</small>
                                        </button>
                                    </div>




                                    <div className="col-md-7 align-self-end   ">

                                        <div className="row">


                                            <div className="col-4 ">

                                            <img className="shadow2" src={mail} style={{height:"85%"}}/>
                                        </div>
                                            <div className="col-md-8 align-self-center " >
                                                <div>
                                                    <h3 style={{fontFamily:"Publico-Medium" , fontWeight:"bold"}}>Réexpédition illimitée</h3>
                                                </div>
                                                <div>
                                                    <p style={{color:"#a6a6a6"}}> Recevez votre courrier dans les plus brefs délais dans la boîte aux lettres de votre choix. Et sans limite de réexpédition par mois ! Une notification par mail vous est envoyée pour chaque courrier reçu.</p>
                                                </div>
                                                <div>
                                                    <h5 style={{fontFamily:"Publico-Medium" , fontWeight:"bold"}}>Avantage</h5>
                                                </div>
                                                <div className="row ml-2 ">
                                                    <div className=" pl-3 pr-3   " style={{backgroundColor:"#ff3365",borderRadius:"6%" , paddingTop:"4px",paddingBottom:"4px"}}>
                                                        <small style={{color:"white"  ,fontWeight:"bold"}}>RAPIDE</small>
                                                    </div>
                                                    <div className="  ml-2 pl-3 pr-3 " style={{backgroundColor:"#2ccfb3",borderRadius:"6%",paddingTop:"4px",paddingBottom:"4px"}}>
                                                        <small style={{color:"white"  ,fontWeight:"bold"}}>ILLIMITÉ</small>
                                                    </div>
                                                    <div className="  ml-2 pl-3 pr-3 mt-2 " style={{backgroundColor:"black",borderRadius:"6%",paddingTop:"4px",paddingBottom:"4px"}}>
                                                        <small style={{color:"white"  ,fontWeight:"bold"}}>SANS FRAIS D'AFFRANCHISSEMENT</small>
                                                    </div>
                                                    <div className=" ml-2  pl-3 pr-3 mt-2 " style={{backgroundColor:"#4dac2b",borderRadius:"6%",paddingTop:"4px",paddingBottom:"4px"}}>
                                                        <small style={{color:"white"  ,fontWeight:"bold"}}>NUMÉRISATION</small>
                                                    </div>
                                                    <div className="   pl-3 pr-3 mt-2 " style={{backgroundColor:"#1476e1",borderRadius:"6%",paddingTop:"4px",paddingBottom:"4px"}}>
                                                        <small style={{color:"white"  ,fontWeight:"bold"}}>GESTION ÉLECTRONIQUE DE DOCUMENTS</small>
                                                    </div>
                                                    <div className="   pl-3 pr-3 mt-2 " style={{backgroundColor:"#ff3365",borderRadius:"6%",paddingTop:"4px",paddingBottom:"4px"}}>
                                                        <small style={{color:"white"  ,fontWeight:"bold"}}>TRAITEMENT COMPTABLE</small>
                                                    </div>

                                                </div>


                                            </div>

                                        </div>






                                    </div>

                                </div>







                        </section>
                        <section id="solution-telephonique" className="container " style={{marginTop:"7%" ,height:"600px"}}  >



                            <div className="row justify-content-between " style={{height:"100%"}}>




                                <div className="col-md-4 align-self-start text-left">
                                    <img src={mobileApplication} style={{width:"80%"}}/>

                                    <h2 className="mt-3" style={{fontFamily:"publico-Medium" , fontWeight:"bold"}}>Solutions téléphoniques</h2>

                                    <button onClick={()=>this.props.history.push("/smartDom")}
                                        style={{ width:"60%" , borderColor: "#0c68ca", backgroundColor: "#0c68ca" , verticalAlign:"middle" }}
                                        className="btn btn-primary btn-lg text-center mt-3 " >
                                        <small style={{ fontWeight: "NORMAL", fontFamily:"OpenSans-Bold"}}>JE COMMENCE</small>
                                    </button>
                                </div>




                                <div className="col-md-7 align-self-end   ">

                                    <div className="row">

                                        <div className="col-md-8 text-right   " >

                                            <div className="col-md-9 ml-auto  ">
                                                <h3   style={{fontFamily:"Publico-Medium" , fontWeight:"bold"}}>Redirection téléphonique</h3>
                                            </div>


                                            <div className="col-md-9 ml-auto">
                                                <p style={{color:"#a6a6a6"}}>Bénéficiez de la redirection d’appels vers un numéro personnalisé spécialement édité pour votre société. La redirection est valable en france ou à l’étranger, sur poste fixe ou téléphone mobile.</p>
                                            </div>
                                            <div className="col-md-9 ml-auto">
                                                <h5 style={{fontFamily:"Publico-Medium" , fontWeight:"bold"}}>Avantage</h5>
                                            </div>
                                            <div className="col-md-12 ml-auto">
                                            <div className="row ml-2 justify-content-end  w-100  ">
                                                <div className="ml-2 pl-3 pr-3     " style={{backgroundColor:"#1a76e2",borderRadius:"6%" , paddingTop:"4px",paddingBottom:"4px"}}>
                                                    <small style={{color:"white"  ,fontWeight:"bold"}}>ENREGISTREMENT</small>
                                                </div>
                                                <div className="   mr-2 pl-3 pr-3 " style={{backgroundColor:"#ffc36e",borderRadius:"6%",paddingTop:"4px",paddingBottom:"4px"}}>
                                                    <small style={{color:"white"  ,fontWeight:"bold"}}>NUMÉRO LOCAL</small>
                                                </div>
                                                <div className="   pl-3 pr-3 mt-2 mr-2 " style={{backgroundColor:"#ff3365",borderRadius:"6%",paddingTop:"4px",paddingBottom:"4px"}}>
                                                    <small style={{color:"white"  ,fontWeight:"bold"}}>MENU VOCAL</small>
                                                </div>
                                                <div className="   pl-3 pr-3 mt-2 mr-2 " style={{backgroundColor:"black",borderRadius:"6%",paddingTop:"4px",paddingBottom:"4px"}}>
                                                    <small style={{color:"white"  ,fontWeight:"bold"}}>TRANSFERTS SUR FIXES ET MOBILES </small>
                                                </div>
                                                <div className="    pl-3 pr-3 mt-2 mr-2 " style={{backgroundColor:"#4dac2b",borderRadius:"6%",paddingTop:"4px",paddingBottom:"4px"}}>
                                                    <small style={{color:"white"  ,fontWeight:"bold"}}>CHATBOT VOCAL</small>
                                                </div>


                                            </div>
                                            </div>


                                        </div>
                                        <div className="col-md-4 ">

                                            <img className="shadow2" src={telephone} style={{height:"85%"}}/>
                                        </div>


                                    </div>






                                </div>

                            </div>







                        </section>
                        <section id="salle_reunion" className="container     " style={{marginTop:"7%" ,height:"600px"}}  >



                            <div className="row justify-content-between " style={{height:"100%"}}>




                                <div className="col-md-4 align-self-start text-left">
                                    <img src={interview} style={{width:"80%"}}/>

                                    <h2 className="mt-3" style={{fontFamily:"publico-Medium" , fontWeight:"bold"}}>Salle de réunion et bureaux physique ou dans le cloud</h2>

                                    <button onClick={()=>this.props.history.push("/smartDom")}
                                        style={{ width:"60%" , borderColor: "#0c68ca", backgroundColor: "#0c68ca" , verticalAlign:"middle" }}
                                        className="btn btn-primary btn-lg text-center mt-3 " >
                                        <small style={{ fontWeight: "NORMAL", fontFamily:"OpenSans-Bold"}}>JE COMMENCE</small>
                                    </button>
                                </div>




                                <div className="col-md-7 align-self-end   ">

                                    <div className="row">


                                        <div className="col-4 ">

                                            <img className="shadow2" src={salleReunion} style={{height:"85%"}}/>
                                        </div>
                                        <div className="col-md-8 align-self-center " >
                                            <div className="col-md-9">
                                                <h3 style={{fontFamily:"Publico-Medium" , fontWeight:"bold"}}>Une offre sur mesure</h3>
                                            </div>
                                            <div className="col-md-12">
                                                <p style={{color:"#a6a6a6"}}>Derrière chaque adresse de domiciliation se trouve un réseau de centres d’affaires modernes et entièrement équipés afin de vous permettre de recevoir clients et partenaires dans une ambiance professionnelle et chaleureuse. Depuis votre espace client, réservez rapidement une salle selon vos besoin (à l’heure, à la demi-journée ou à la journée).</p>
                                            </div>
                                            <div className="col-md-9 mr-auto">
                                                <h5 style={{fontFamily:"Publico-Medium" , fontWeight:"bold"}}>Avantage</h5>
                                            </div>
                                            <div className="row ml-2 w-100 justify-content-start ">
                                                <div className=" pl-3 pr-3 mr-2   " style={{backgroundColor:"#1a76e2",borderRadius:"6%" , paddingTop:"4px",paddingBottom:"4px"}}>
                                                    <small style={{color:"white"  ,fontWeight:"bold"}}>RÉSERVATION FLEXIBLE</small>
                                                </div>
                                                <div className="  mr-2 pl-3 pr-3 " style={{backgroundColor:"#ff3365",borderRadius:"6%",paddingTop:"4px",paddingBottom:"4px"}}>
                                                    <small style={{color:"white"  ,fontWeight:"bold"}}>PRÉSENCE GÉOGRAPHIQUE</small>
                                                </div>
                                                <div className="  mr-2 pl-3 pr-3 mt-2 " style={{backgroundColor:"#4dac2b",borderRadius:"6%",paddingTop:"4px",paddingBottom:"4px"}}>
                                                    <small style={{color:"white"  ,fontWeight:"bold"}}>VISIOCONFÉRENCE</small>
                                                </div>
                                                <div className=" mr-2  pl-3 pr-3 mt-2 " style={{backgroundColor:"black",borderRadius:"6%",paddingTop:"4px",paddingBottom:"4px"}}>
                                                    <small style={{color:"white"  ,fontWeight:"bold"}}>AUDIOCONFÉRENCE</small>
                                                </div>


                                            </div>


                                        </div>

                                    </div>






                                </div>

                            </div>







                        </section>







                        <Snackbar
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'left',
                            }}
                            open={this.state.openAlert}
                            autoHideDuration={5000}
                            onClose={this.closeSnackbar}
                        >
                            <MySnackbarContentWrapper
                                onClose={this.closeSnackbar}
                                variant={this.state.alertType}
                                message={this.state.alertMessage}
                            />
                        </Snackbar>

                    </Suspense>

                </div>




            </div >



        )
    }


}


export default personnalisationService;