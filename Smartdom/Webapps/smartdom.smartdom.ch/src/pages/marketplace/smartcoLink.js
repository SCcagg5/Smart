import React, {Component, Suspense} from "react";
import firebase from "firebase/app";
import Card from 'react-bootstrap/Card'
import CardGroup from 'react-bootstrap/CardGroup'
import CardDeck from 'react-bootstrap/CardDeck'

import {Carousel} from 'primereact/carousel';


import "firebase/database";
import 'firebase/storage';
import {AvFeedback, AvForm, AvGroup, AvInput} from "availity-reactstrap-validation";
import {Button, Container, FormGroup, Label, Modal, ModalHeader, ModalBody, ModalFooter} from "reactstrap";
import 'react-phone-input-2/lib/style.css'
import PhoneInput from "react-phone-input-2";
import countryList from "../../tools/countryList";
import MySnackbarContentWrapper from "../../tools/customSnackBar";
import Snackbar from "@material-ui/core/Snackbar";
import cantonList from "../../tools/cantonSuisse";
import moment from "moment";
import "moment/locale/fr"
import Loader from "../../components/Loader";
import signatureService from "../../provider/signatureService";
import logo from "../../assets/images/logos/logoSmartCo.jpeg";
import cinImage from "../../assets/images/cin.png"
import SignatureCanvas from "react-signature-canvas";
import dom from "../../assets/images/domiciliation.PNG"
import verifForms from "../../tools/verifForms"
import pdfImage from "../../assets/images/pdfimage.jpg";
import abon from "../../assets/images/abon.png"
import comptaSass from "../../assets/images/comptaSass.PNG"
import service from "../../assets/images/service.PNG"
import gift from "../../assets/images/gift.PNG"
import assistance from "../../assets/images/headset.svg"
import assistance2 from "../../assets/images/assistance2.PNG"
import assistance3 from "../../assets/images/assistance3.PNG"

import offreFlash from "../../assets/images/flash.svg"
import comptecourant from "../../assets/images/comptecourant.PNG"
import domic from "../../assets/images/domic.PNG"
import assurance from "../../assets/images/assurance.PNG"
import token from "../../assets/images/token.PNG"
import contrat from "../../assets/images/groupCard2/contract.svg"
import deal from "../../assets/images/groupCard2/deal.svg"
import business from "../../assets/images/groupCard2/business.svg"
import user from "../../assets/images/groupCard3/user.svg"
import setting from "../../assets/images/groupCard3/setting.svg"
import lock from "../../assets/images/groupCard3/lock.svg"
import video from "../../assets/images/modal2/video.SVG"
import mice from "../../assets/images/modal2/microphone.svg"
import room from "../../assets/images/modal2/room.svg"
import table from "../../assets/images/modal2/table.svg"
import  grid from "../../assets/images/modal2/grid.svg"
import  logoAssem from "../../assets/images/modal2/logo@2x.png"
import  assemble1 from "../../assets/images/modal2/assemble1.PNG"
import  users from "../../assets/images/modal2/users.svg"
import  next from "../../assets/images/modal2/next.svg"
import  barChart from "../../assets/images/modal2/bar-chart.svg"
import  lock2 from "../../assets/images/modal2/lock2.svg"
import  assembleImg from "../../assets/images/modal2/assembleIMG3.svg"
import  correct from "../../assets/images/modal3/correct.svg"
import {Button as ButtonS} from 'primereact/button';
import 'primereact/resources/themes/nova-light/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import  correctOrange from "../../assets/images/modal3/correctOrange.svg"
import  correctC from "../../assets/images/modal3/correctC.svg"

























import check from "../../assets/images/forfait/check-success.svg";









const Topbar = React.lazy(() => import("../../components/Topbar"));
const Navbar = React.lazy(() => import("../../components/Navbar"));
const loading = () => <Loader/>;
const google = window.google;

moment.locale('fr');



class smartcoLink extends Component {


    CIN1Upload = {};
    CIN2Upload = {};
    signUpload = {};
    sigCanvas = {};

    constructor(props) {
        super(props);



        this.state = {

            userName:"",
            userEmail:"",
            recomandations :[
                {
                    imgOffre:gift,
                    moinsOffre:"1 MOIS OFFERT",
                    imgRec:assistance,
                    pourcentage:"",
                    titre:"Assistance Smartco",
                    desc:"L'accompagnement juridique essentiel",
                    EnSavoirPlus:true,
                    SansEngagement:true

                },
                {
                    imgOffre:gift,
                    moinsOffre:"1 MOIS OFFERT",
                    imgRec:comptaSass,
                    pourcentage:"",
                    titre:"Compta Enfin !",
                    desc:"Gérez vos comptabilités facilement",
                    EnSavoirPlus:true,
                    SansEngagement:true

                },
                {
                    imgOffre:gift,
                    moinsOffre:"1 MOIS OFFERT",
                    imgRec:assistance,
                    pourcentage:"-10%",
                    titre:"Assistance Smartco",
                    desc:"L'accompagnement juridique essentiel",
                    EnSavoirPlus:true,
                    SansEngagement:true

                }
            ],
            modalAssistance:false,
            modalWebCoferance:false,
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

            showStep1: true,
            showStep2: false,
            showStep3: false,
            showStep4: false,
            showStep5: false,
            showStep6: false,
            showStep7: false,
            showStep8: false,
            showStep9: false,
            showStep10:false,
            showStep11:false,
            showStep12:false,
            showStep13:false,

            questAdmin:'true',
            mondatAdmin:'true',
            domiciAdress:'true',

            sName: '',
            sBut: '',
            nombre_employes: '',
            type_société: '',
            Montant_capital_libéré_SARL_chiffre: '',
            Montant_capital_libéré_SARL_lettre: '',
            Montant_capital_libéré_SA_chiffre: '',
            Montant_capital_libéré_SA_lettre: '',
            siret: '',
            siren: '',
            convention_collective_code: '',
            representant: '',
            sCapital: {
                totalCapital: '20000',
                totalNbActions: '200',
                totalNbActionsAncien: '200',
            },
            montantChoix: '',
            LINK_Contract_Sociétés: {
                id: '',
                id_contrat_mutuelle: '',
                id_contrat_prevoyance: '',
            },
            sSiege: {
                adress: '',
                postalCode: '',
                pays: 'Suisse',
                ville: '',
                canton: '',
                isPropreLocaux: 'true',
                domiciliation: 'true'
            },
            sActionnairePhy: [],
            sActionnaireMoral: [],
            nbActPhys: 1,
            nbActMorales: 1,
            gerant: {
                gerantDomiciliEnSuisse: false
            },

            expertSmartCo: {
                etat : '' ,
                offreDeBase:'',
                abERP :'',
                configurationERP:'',
                formationERP:'',
                helpdesk:'',
                siteEcommerce:'',
                configSite : '',
                formationSite:'',
                helpdeskSite:''

            },

            respToken:{},

            modalStep: "",
            modalStep2:"",
            isAccreditedInvestisor: false,
            confirmByEmail: false,
            codeSMSTaped: "",

            demoSTO: "1",

            cin1: {
                url: "",
                name: "",
                size: ""
            },
            cin2: {
                url: "",
                name: "",
                size: ""
            },
            signature: {
                url: "",
                name: "",
                size: ""
            },

            fiatAmount:"",
            contrats: []

        };
        this.cardTemplate = this.cardTemplate.bind(this);

    }


    cardTemplate(card){

        return (
        // eslint-disable-next-line no-unused-expressions

        <div className="card  ml-3 mr-3 " style={{height:"300px"}}>

                <div className="d-flex flex-row justify-content-between " >
                    <div className="col-auto  "
                         style={{textAlign: "left"}}>
                        <div className="row ">
                            <img style={{width: "12%", color: "red"}}
                                 src={card.imgOffre}/>
                            <text style={{
                                fontWeight: "bold",
                                color: "#f95437",
                                fontSize: "small"
                            }}>{card.moinsOffre}
                            </text>
                        </div>
                    </div>
                    {card.pourcentage != "" &&
                    <div className="col-auto" style={{
                        backgroundColor: "#f83c1a",
                        textAlign: "left",
                        borderRadius: "10%"
                    }}>
                        <text style={{
                            color: "white",
                            fontWeight: "bold",
                            fontSize: "small"
                        }}>- 10%
                        </text>
                    </div>
                    }
                </div>




            <div className="card-body  ">
                <div style={{width: "100%", textAlign: "center"}}>
                    <img src={card.imgRec} style={{
                        width: "20%",
                        marginLeft: "auto",
                        marginRight: "auto"
                    }}/>
                </div>
                <div className="container " style={{
                    backgroundColor: "#eff7ff",
                    width: "90%",
                    textAlign: "center"
                }}>
                    <text style={{
                        color: "#79beff",
                        marginLeft: "auto",
                        marginRight: "auto",
                        fontWeight: "bold",
                        fontSize: "small"
                    }}>{card.titre}
                    </text>
                </div>
                <div style={{
                    width: "100%",
                    textAlign: "center",
                    marginTop: "2%"
                }}>
                    <text style={{
                        fontSize: "small",
                        fontWeight: "bold"
                    }}>{card.desc}
                    </text>
                </div>
                {card.EnSavoirPlus === true &&
                <div style={{
                    width: "100%",
                    textAlign: "center",
                    marginTop: "2%"
                }}>
                    <text style={{fontSize: "small"}}><a>En savoir
                        plus</a></text>
                </div>
                }


            </div>
            <div className="card-footer " style={{
                backgroundColor: "#1ca973",
                cursor: "pointer",
                textAlign: "center"
            }}>
                <text style={{
                    color: "white",
                    fontWeight: "bold",
                    fontSize: "small"
                }}>J'essaie gratuitement
                </text>
            </div>
        </div>


        )

    }

    componentDidMount() {






        let array = this.state.contrats
        firebase.database().ref('/marketplace/'+localStorage.getItem('uid')+'/contrat').on('value',(snapshot) => {

            snapshot.forEach(function(child) {

               let obj ={
                   date:child.val().dateMjour,
                   etat:child.val().etat,
                   num:child.val().numero
               }

                array.push(obj)


            });

            this.setState({contrats:array})


            this.state.contrats.map(x =>{
                console.log(x.num)
            })

            console.log(window.innerWidth)


        })
























    }


    changeActivePage = (page) => event => {
        if (page !== '') {
            this.setState({
                activePage: page
            })
        }
    };

    openSnackbar = (type, msg) => {
        this.setState({
            openAlert: true,
            alertMessage: msg,
            alertType: type
        });
    };

    closeSnackbar = (event, reason) => {
        if (reason === 'clickaway') return;
        this.setState({openAlert: false});
    };



    render() { let data="https://calendly.com/jawher-zairi/sitprofessionnelle?name="+localStorage.getItem('username')+"&email="+localStorage.getItem('email')+"&a1=RDV téléphonique pour la finalisation d’un plan de stock option pour Monsieur Joseph Bedminster. Ci-dessous le lien du document à discuter"

        const responsiveOptions = [
            {
                breakpoint: '1033px',
                numVisible: 3,
                numScroll: 3
            },
            {
                breakpoint: '1033px',
                numVisible: 2,
                numScroll: 2
            },
            {
                breakpoint: '864px',
                numVisible: 1,
                numScroll: 1
            }
        ];

        var settings = {
            dots: true,
            infinite: false,
            arrows:false,
            speed: 500,
            slidesToShow: 3,
            slidesToScroll: 1,
            adaptiveHeight:true,
            responsive: [
                {
                    breakpoint: 1200,
                    settings: {
                        slidesToShow: 3,
                        slidesToScroll: 3,
                        infinite: true,
                        dots: true
                    }
                },
                {
                    breakpoint: 900,
                    settings: {
                        slidesToShow: 2,
                        slidesToScroll: 2,
                        initialSlide: 2
                    }
                },
                {
                    breakpoint: 480,
                    settings: {
                        slidesToShow: 1,
                        slidesToScroll: 1
                    }
                }
            ]
        };
        return (





            <div className="app center-menu">


                <header id="topnav">
                    <Suspense fallback={loading()}>
                        <Topbar changeActivePage={this.changeActivePage}/>
                    </Suspense>
                </header>
                <div className="wrapper">
                    <Container fluid>
                        <Suspense fallback={loading()}>
                            {this.state.loading && <Loader/>}


                            <div className="row" >
                                <div className="col-md-3">
                                    <div className="card " style={{borderStyle:"solid"}}>
                                        <div className="card-body" style={{textAlign:"left"}}>


                                            <div  className="nav flex-column nav-pills nav-pills-tab" id="v-pills-tab"
                                                  style={{itemColor:"red"}}

                                                 role="tablist" aria-orientation="vertical"  >

                                                <a   className={"nav-link mb-2 active show"}
                                                   id={"v-pills-demarche"} style={{marginTop: 15, height: 50 }}
                                                   data-toggle="pill" href={"#demarche"} role="tab"
                                                   aria-controls={"v-demarche"}
                                                   aria-selected="true"  >{"Demarche"} </a>

                                                <a className={"nav-link mb-2"}
                                                   id={"v-pills-abonnements"} style={{height: 50}}
                                                   data-toggle="pill" href={"#abonnements"} role="tab"
                                                   aria-controls={"v-abonnements"}
                                                   aria-selected="true">{"Abonnements"} </a>

                                                <a className={"nav-link mb-2"}
                                                   id={"v-pills-recommandation"} style={{height: 50}}
                                                   data-toggle="pill" href={"#recommandation"} role="tab"
                                                   aria-controls={"v-recommandation"}
                                                   aria-selected="true">{"Recommandations"} </a>
                                                <a className={"nav-link mb-2"}
                                                   id={"v-pills-factures"} style={{height: 50}}
                                                   data-toggle="pill" href={"#factures"} role="tab"
                                                   aria-controls={"v-factures"}
                                                   aria-selected="true">{"Nos offres partenaires"} </a>
                                                <a className={"nav-link mb-2"}
                                                   id={"v-pills-infopers"} style={{height: 50}}
                                                   data-toggle="pill" href={"#infopers"} role="tab"
                                                   aria-controls={"v-infopers"}
                                                   aria-selected="true">{"Informations personelles"} </a>
                                                <a className={"nav-link mb-2"}
                                                   id={"v-pills-besoinAide"} style={{height: 50}}
                                                   data-toggle="pill" href={"#besoinAide"} role="tab"
                                                   aria-controls={"v-besoinAide"}
                                                   aria-selected="true">{"Besoin d'aide ?"} </a>
                                                <a className={"nav-link mb-2"}
                                                   id={"v-pills-deconnexion"} style={{height: 50}}
                                                   data-toggle="pill" href={"#deconnexion"} role="tab"
                                                   aria-controls={"v-deconnexion"}
                                                   aria-selected="true"><u>{"Deconnexion"}</u> </a>

                                            </div>

                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-9">
                                    <div className="card" style={{minHeight: '96%'}}>
                                        <div className="card-body">
                                            <div className="tab-content pt-0">

                                                <div className={"tab-pane fade active show"}
                                                     id={"demarche"}
                                                     role="tabpanel" aria-labelledby={"v-pills-demarche"}>

                                                    <div style={{widh:"100%",alignText:"right"}} align="right">
                                                        <Button style={{backgroundColor:"white",color:"black" }} ><h6>commencer une demarche</h6></Button>

                                                    </div>
                                                    <div  className="row" style={{width:"100%" }} >
                                                        <div className="col-sm-4" width="10%" >
                                                            <h6>Suivi des démarches(3)</h6>
                                                        </div>

                                                        <div    className="col-sm-8"  >
                                                            <hr
                                                                style={{
                                                                    color: "#f2f2f2",
                                                                    backgroundColor: "#f2f2f2",
                                                                    height: 0.25,

                                                                }}
                                                            />

                                                        </div>




                                                    </div>
                                                    <div style={{width:"100%"}}>

                                                            <a className="btn btn-primary"  style={{backgroundColor:"#f2f2f2",color:"black", width:"100%", textAlign:"left",borderColor:"#e6e6e6"}}>
                                                                <div className="row">
                                                                    <div style={{marginLeft:"1%"}}>
                                                                        <img src={abon} width="3%"/>
                                                                        <text style={{marginLeft:"2%"}}>Abonnement</text>


                                                                    </div>



                                                                </div>
                                                            </a>



                                                        {this.state.contrats.map((x) => (
                                                            <div className="card card-body">
                                                                <div className="row">
                                                                    <div className="col" style={{textAlign:"left"}} >
                                                                        <div className="row" style={{textAlign:"left"}}>
                                                                            <text style={{fontWeight:"bold",size:"5%"}}> Création SAS</text>
                                                                            <text style={{marginLeft:"2%" ,fontFamily:"serif"}}>n° {x.num} | Mise à jour le : {x.date}</text>

                                                                        </div>
                                                                        <div className="row" style={{marginTop:"2%"}}>
                                                                            <text style={{fontSize:"small",color:"#999999"}}>Completez votre questionnaire</text>
                                                                        </div>
                                                                    </div>

                                                                    {x.etat === "Poursuivre" ?
                                                                    <div className="col" style={{textAlign:"right"}}>


                                                                        <button type="button"
                                                                                className="btn btn-success" style={{width:"60%"}}>{x.etat}
                                                                        </button>
                                                                        <svg
                                                                            className="MuiSvgIcon-root MuiSvgIcon-fontSizeSmall"
                                                                            focusable="false" viewBox="0 0 24 24"
                                                                            aria-hidden="true" role="presentation" style={{width:"7%"}}>
                                                                            <path
                                                                                d="M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"></path>
                                                                        </svg>

                                                                    </div> :
                                                                        <div className="col"
                                                                             style={{textAlign: "right"}}>

                                                                            <button type="button"
                                                                                    className="btn btn-primary"
                                                                                    style={{width: "60%"}}>Payer
                                                                            </button>
                                                                            <svg
                                                                                className="MuiSvgIcon-root MuiSvgIcon-fontSizeSmall"
                                                                                focusable="false" viewBox="0 0 24 24"
                                                                                aria-hidden="true" role="presentation"
                                                                                style={{width: "7%"}}>
                                                                                <path
                                                                                    d="M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"></path>
                                                                            </svg>

                                                                        </div>

                                                                        }
                                                                </div>
                                                            </div>
                                                        ) )}
















                                                    </div>

                                                </div>

                                                <div className={"tab-pane fade"}
                                                     id={"abonnements"}
                                                     role="tabpanel" aria-labelledby={"v-pills-abonnements"}>

                                                    <div className="row" style={{width: "100%"}}>
                                                        <div className="col-sm-3" width="10%">
                                                            <h6>Vos Abonnement (2)</h6>
                                                        </div>

                                                        <div className="col-sm-9">
                                                            <hr
                                                                style={{
                                                                    color: "#f2f2f2",
                                                                    backgroundColor: "#f2f2f2",
                                                                    height: 0.25,

                                                                }}
                                                            />

                                                        </div>


                                                    </div>
                                                    <div style={{width: "100%"}}>

                                                        <a className="btn btn-primary"

                                                           style={{
                                                               backgroundColor: "white",
                                                               color: "black",
                                                               width: "100%",
                                                               textAlign: "left",
                                                               borderColor: "#e6e6e6"
                                                           }}>
                                                            <div className="row">
                                                                <div className="row"  style={{marginLeft: "1%"}}>
                                                                    <div className="col-md-2 col-sm-2 col-2">
                                                                    <img src={comptaSass} style={{width:"100%"}}/>
                                                                    </div>
                                                                    <div className="col-md-auto col-sm-auto col-auto" style={{marginLeft:"2%"}}>
                                                                        <div >
                                                                            <div className="container" style={{backgroundColor:"#eafbf4" }}>
                                                                          <text style={{color:"#10a770", fontWeight:"bold"}}>Compta SaaS</text>
                                                                            </div>
                                                                        </div>
                                                                        <div>
                                                                            <text style={{fontSize:"small"}}> Gérez vos comptablités facilement</text>

                                                                        </div>
                                                                    </div>

                                                                </div>



                                                            </div>
                                                        </a>



                                                            <div className="card card-body">
                                                                <div className="row">
                                                                    <div className="col-8" align="left">
                                                                        <ul>
                                                                            Inclus dans ComptaStart :
                                                                            <div style={{marginLeft:"3%",alignItems:"left" ,fontSize:"small"}} >
                                                                            <li> Suivi de vos depenses et de votre chiffre d'affaire en real</li>
                                                                            <li>Sychronisation automatique avec votre banque </li>
                                                                            <li>Preparation des declaration de TVA </li>
                                                                            <li>Création ellimité de devis , factures , note de frais ,indemnité kilometrique, etc </li>
                                                                            <li>En option : bilan annuel avec un expert-comptable partenaire</li>
                                                                            </div>
                                                                        </ul>
                                                                    </div>
                                                                    <div className="col-md-3" style={{textAlign:"center" , marginTop:"auto", marginBottom:"auto"}}>



                                                                        <button  style={{width:"100%" , fontWeight:"bold", fontFamily:"Georgia", backgroundColor:"#1768a1"}} type="button"
                                                                                className="btn btn-primary">Accéder
                                                                        </button>
                                                                        <div style={{ marginTop:"5%"}}>

                                                                        <text style={{fontSize:"small" , marginTop:"5%"}}><u> Gérer mon abonnement</u></text>
                                                                        </div>






                                                                    </div>

                                                                </div>

                                                        </div>

                                                    </div>
                                                    <div style={{width: "100%",marginTop:"3%"}} >

                                                        <a className="btn btn-primary"
                                                           style={{
                                                               backgroundColor: "white",
                                                               color: "black",
                                                               width: "100%",
                                                               textAlign: "left",
                                                               borderColor: "#e6e6e6"
                                                           }}>
                                                            <div className="row">
                                                                <div className="row"  style={{marginLeft: "1%"}}>
                                                                    <div className="col-md-2 col-sm-2 col-2">
                                                                        <img src={service} style={{width:"100%"}}/>
                                                                    </div>

                                                                    <div className="col-md-auto col-sm-auto col-auto" style={{marginLeft:"2%"}}>
                                                                        <div >
                                                                            <div className="container" style={{backgroundColor:"#eafbf4" }}>
                                                                                <text style={{color:"#10a770", fontWeight:"bold"}}>Service Obligations Juridiques</text>
                                                                            </div>
                                                                        </div>
                                                                        <div>
                                                                            <text style={{fontSize:"small"}}> Gérez vos obligations juridiques en toute sérenité</text>

                                                                        </div>
                                                                    </div>

                                                                </div>



                                                            </div>
                                                        </a>



                                                            <div className="card card-body">
                                                                <div className="row">
                                                                    <div className="col-8" align="left">
                                                                        <ul>
                                                                            Gràce au Service Obligations Juridiques :
                                                                            <div style={{marginLeft:"3%",alignItems:"left" ,fontSize:"small"}} >
                                                                                <li> Mise à jour de votre sociéte : votre prochaine modification statuaire offerte</li>
                                                                                <li>Approbation des comptes annuelle + formalités au greffe (obligatoire) </li>
                                                                                <li><text style={{color:"green", fontWeight:"bold"}}>3 entretiens</text> avec un Expert Conformité </li>
                                                                                <li>Envoi des registre Obligatoires </li>
                                                                                <li>Accès a notre <text style={{color:"green", fontWeight:"bold"}}>bibliothèque de contrats</text></li>
                                                                            </div>
                                                                        </ul>
                                                                    </div>
                                                                    <div className="col-md-3" style={{textAlign:"center" , marginTop:"auto", marginBottom:"auto"}}>

                                                                        <button style={{width:"100%" , fontWeight:"bold", fontFamily:"Georgia" , backgroundColor:"#1768a1"}} type="button"
                                                                                className="btn btn-primary">Accéder
                                                                        </button>
                                                                        <div style={{ marginTop:"5%"}}>

                                                                            <text style={{fontSize:"small" , marginTop:"5%"}}><u> Gérer mon abonnement</u></text>
                                                                        </div>






                                                                    </div>

                                                                </div>
                                                            </div>


                                                    </div>


                                                </div>

                                                <div className={"tab-pane fade"}
                                                     id={"recommandation"}
                                                     role="tabpanel" aria-labelledby={"v-pills-recommandation"}>
                                                    <div className="row" style={{width: "100%"}}>
                                                        <div className="col-sm-3" width="10%">
                                                            <h6>Vos Abonnement (0)</h6>
                                                        </div>


                                                        <div className="col-sm-9">
                                                            <hr
                                                                style={{
                                                                    color: "#f2f2f2",
                                                                    backgroundColor: "#f2f2f2",
                                                                    height: 0.25,

                                                                }}
                                                            />

                                                        </div>


                                                    </div>
                                                    <div>
                                                        <text>Vous n'avez souscrit à aucun abonnement</text>
                                                    </div>


                                                <div className="border border-success" style={{padding:"2%",marginTop:"5%"}}>


                                                        <div id="carouselExampleControls" className="carousel slide  d-flex carousel-multi-item justify-content-between align-items-center"
                                                             data-ride="carousel" data-interval="false">

                                                            <a style={{position:"inherit" , }} className="carousel-control-prev"
                                                               href="#carouselExampleControls" role="button" data-slide="prev">
                                                                <span style={{transform:"scaleX(-1)",backgroundImage:"url(\"data:image/svg+xml;charset=utf8,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='%23ff0000' viewBox='0 0 8 8'%3E%3Cpath d='M1.5 0l-1.5 1.5 2.5 2.5-2.5 2.5 1.5 1.5 4-4-4-4z'/%3E%3C/svg%3E\")" }} className="carousel-control-prev-icon "
                                                                      aria-hidden="true"></span>
                                                                <span className="sr-only" >Previous</span>
                                                            </a>



                                                            <div className="carousel-inner" >
                                                                <div className="carousel-item active  ">
                                                                    <div className="card-deck">

                                                                    <div className="card" >
                                                                        <div className="row" style={{marginLeft: "2%"}}>
                                                                            <img style={{width: "8%", color: "red"}}
                                                                                 src={gift}/>
                                                                            <text style={{
                                                                                fontWeight: "bold",
                                                                                color: "#f95437",
                                                                                fontSize: "small"
                                                                            }}>1 MOIS OFFERT
                                                                            </text>
                                                                        </div>


                                                                        <div className="card-body">
                                                                            <div className="col-auto" style={{width: "100%", textAlign: "center"}} >
                                                                                <img src={assistance} style={{
                                                                                    marginLeft: "auto",
                                                                                    marginRight: "auto",
                                                                                    width:"30%"
                                                                                }}/>
                                                                            </div>
                                                                            <div className="container" style={{
                                                                                backgroundColor: "#eafbf4",
                                                                                width: "80%",
                                                                                textAlign: "center"
                                                                            }}>
                                                                                <text style={{
                                                                                    color: "#10a770",
                                                                                    marginLeft: "auto",
                                                                                    marginRight: "auto",
                                                                                    fontWeight: "bold",
                                                                                    fontSize: "small"
                                                                                }}>Assistance Smartco
                                                                                </text>
                                                                            </div>
                                                                            <div style={{
                                                                                width: "100%",
                                                                                textAlign: "center",
                                                                                marginTop: "2%"
                                                                            }}>
                                                                                <text style={{
                                                                                    fontSize: "small",
                                                                                    fontWeight: "bold"
                                                                                }}>L'accompagnement juridique essentiel
                                                                                </text>
                                                                            </div>
                                                                            <div style={{
                                                                                width: "100%",
                                                                                textAlign: "center",
                                                                                marginTop: "2%"
                                                                            }}>
                                                                                <text style={{fontSize: "small"}}><a>En savoir
                                                                                    plus</a></text>
                                                                            </div>
                                                                            <div style={{
                                                                                width: "100%",
                                                                                textAlign: "center",
                                                                                marginTop: "2%"
                                                                            }}>
                                                                                <text style={{
                                                                                    fontSize: "small",
                                                                                    fontWeight: "bold",
                                                                                    color: "#f95437"
                                                                                }}>Sans engagement
                                                                                </text>
                                                                            </div>

                                                                        </div>
                                                                        <Card.Footer  onClick={()=>{this.setState({modalStep:"Assistance smartCo",modalAssistance:true,
                                                                            showModal:true})}} style={{
                                                                            backgroundColor: "#1ca973",
                                                                            cursor: "pointer",
                                                                            textAlign: "center"
                                                                        }}>
                                                                            <text style={{
                                                                                color: "white",
                                                                                fontWeight: "bold",
                                                                                fontSize: "small"
                                                                            }}>J'essaie gratuitement
                                                                            </text>
                                                                        </Card.Footer>
                                                                    </div>





                                                                    <Card >
                                                                        <div className="row" style={{marginLeft: "2%"}}>
                                                                            <img style={{width: "8%", color: "red"}}
                                                                                 src={gift}/>
                                                                            <text style={{
                                                                                fontWeight: "bold",
                                                                                color: "#f95437",
                                                                                fontSize: "small"
                                                                            }}>1 MOIS OFFERT
                                                                            </text>
                                                                        </div>


                                                                        <Card.Body>
                                                                            <div style={{width: "100%", textAlign: "center"}}>
                                                                                <img src={comptaSass} style={{
                                                                                    marginLeft: "auto",
                                                                                    marginRight: "auto",
                                                                                    width: "30%"
                                                                                }}/>
                                                                            </div>
                                                                            <div className="container" style={{
                                                                                backgroundColor: "#eafbf4",
                                                                                width: "80%",
                                                                                textAlign: "center",
                                                                                marginTop:"2%"
                                                                            }}>
                                                                                <text style={{
                                                                                    color: "#10a770",
                                                                                    marginLeft: "auto",
                                                                                    marginRight: "auto",
                                                                                    fontWeight: "bold",
                                                                                    fontSize: "small"
                                                                                }}>Compta Enfin !
                                                                                </text>
                                                                            </div>
                                                                            <div style={{
                                                                                width: "100%",
                                                                                textAlign: "center",

                                                                            }}>
                                                                                <text style={{
                                                                                    fontSize: "small",
                                                                                    fontWeight: "bold"
                                                                                }}>Gérez vos comptabilités <br></br>facilement
                                                                                </text>
                                                                            </div>
                                                                            <div style={{
                                                                                width: "100%",
                                                                                textAlign: "center",
                                                                                marginTop: "2%"
                                                                            }}>
                                                                                <text style={{fontSize: "small"}}><a>En savoir
                                                                                    plus</a></text>
                                                                            </div>
                                                                            <div style={{
                                                                                width: "100%",
                                                                                textAlign: "center",
                                                                                marginTop: "2%"
                                                                            }}>
                                                                                <text style={{
                                                                                    fontSize: "small",
                                                                                    fontWeight: "bold",
                                                                                    color: "#f95437"
                                                                                }}>Sans engagement
                                                                                </text>
                                                                            </div>

                                                                        </Card.Body>
                                                                        <Card.Footer onClick={()=>{this.setState({modalStep:"Compta Enfin",
                                                                            showModal:true})}} style={{
                                                                            backgroundColor: "#1ca973",
                                                                            cursor: "pointer",
                                                                            textAlign: "center"
                                                                        }}>
                                                                            <text style={{
                                                                                color: "white",
                                                                                fontWeight: "bold",
                                                                                fontSize: "small"
                                                                            }}>J'essaie gratuitement
                                                                            </text>
                                                                        </Card.Footer>
                                                                    </Card>



                                                                    <div className="card">
                                                                        <div className="container">
                                                                            <div className="d-flex flex-row justify-content-between" >
                                                                                <div className="col-auto "
                                                                                     style={{textAlign: "left"}}>
                                                                                    <div className="row">
                                                                                        <img style={{width: "12%", color: "red"}}
                                                                                             src={offreFlash}/>
                                                                                        <text style={{
                                                                                            fontWeight: "bold",
                                                                                            color: "#f95437",
                                                                                            fontSize: "small"
                                                                                        }}>OFFRE FLASH
                                                                                        </text>
                                                                                    </div>
                                                                                </div>
                                                                                <div className="col-auto" style={{
                                                                                    backgroundColor: "#f83c1a",
                                                                                    textAlign: "left",
                                                                                    borderRadius: "10%"
                                                                                }}>
                                                                                    <text style={{
                                                                                        color: "white",
                                                                                        fontWeight: "bold",
                                                                                        fontSize: "small"
                                                                                    }}>- 10%
                                                                                    </text>
                                                                                </div>
                                                                            </div>
                                                                        </div>



                                                                        <div className="card-body">
                                                                            <div style={{width: "100%", textAlign: "center"}}>
                                                                                <img src={comptecourant} style={{
                                                                                    width: "35%",
                                                                                    marginLeft: "auto",
                                                                                    marginRight: "auto"
                                                                                }}/>
                                                                            </div>
                                                                            <div className="container" style={{
                                                                                backgroundColor: "#eff7ff",
                                                                                width: "90%",
                                                                                textAlign: "center"
                                                                            }}>
                                                                                <text style={{
                                                                                    color: "#79beff",
                                                                                    marginLeft: "auto",
                                                                                    marginRight: "auto",
                                                                                    fontWeight: "bold",
                                                                                    fontSize: "small"
                                                                                }}>Compte courant d'associé
                                                                                </text>
                                                                            </div>
                                                                            <div style={{
                                                                                width: "100%",
                                                                                textAlign: "center",
                                                                                marginTop: "2%"
                                                                            }}>
                                                                                <text style={{
                                                                                    fontSize: "small",
                                                                                    fontWeight: "bold"
                                                                                }}>Financer simplement l'activité de votre
                                                                                    societé
                                                                                </text>
                                                                            </div>
                                                                            <div style={{
                                                                                width: "100%",
                                                                                textAlign: "center",
                                                                                marginTop: "2%"
                                                                            }}>
                                                                                <text style={{fontSize: "small"}}><a>En savoir
                                                                                    plus</a></text>
                                                                            </div>


                                                                        </div>
                                                                        <div className="card-footer" style={{
                                                                            backgroundColor: "#1ca973",
                                                                            cursor: "pointer",
                                                                            textAlign: "center"
                                                                        }}>
                                                                            <text style={{
                                                                                color: "white",
                                                                                fontWeight: "bold",
                                                                                fontSize: "small"
                                                                            }}>J'essaie gratuitement
                                                                            </text>
                                                                        </div>
                                                                    </div>


                                                                </div>

                                                                </div>
                                                                <div className="carousel-item">
                                                                    <div className="card-deck">

                                                                        <Card>



                                                                            <div className="card-body d-flex flex-column">
                                                                                <div style={{width: "100%", textAlign: "center"}}>
                                                                                    <img src={contrat} style={{
                                                                                        marginLeft: "auto",
                                                                                        marginRight: "auto",
                                                                                        width:"30%"
                                                                                    }}/>
                                                                                </div>
                                                                                <div className="container" style={{
                                                                                    backgroundColor: "#eff7ff",
                                                                                    width: "100%",
                                                                                    textAlign: "center",
                                                                                    marginTop:"1%"

                                                                                }}>
                                                                                    <text style={{
                                                                                        color: "#79beff",
                                                                                        marginLeft: "auto",
                                                                                        marginRight: "auto",
                                                                                        fontWeight: "bold",
                                                                                        fontSize: "small"
                                                                                    }}>Assemblée generale En Web Conférence
                                                                                    </text>
                                                                                </div>
                                                                                <div style={{
                                                                                    width: "100%",
                                                                                    textAlign: "center",
                                                                                    marginTop: "2%"
                                                                                }}>
                                                                                    <text style={{
                                                                                        fontSize: "small",
                                                                                        fontWeight: "bold"
                                                                                    }}>Réalisez vos assemblées générales en Vidéo ou audioconférence avec génération des PV
                                                                                    </text>
                                                                                </div>
                                                                                <div className="mt-auto"style={{
                                                                                    width: "100%",
                                                                                    textAlign: "center",

                                                                                }} >
                                                                                    <text style={{fontSize: "small"}}><a>En savoir
                                                                                        plus</a></text>
                                                                                </div>



                                                                            </div>
                                                                            <Card.Footer onClick={()=>{this.setState({modalStep:"Assistance Assemblée generale Online",modalAssistance:false,modalWebCoferance:true,
                                                                                showModal:true})}} style={{
                                                                                backgroundColor: "#1ca973",
                                                                                cursor: "pointer",
                                                                                textAlign: "center"
                                                                            }}>
                                                                                <text style={{
                                                                                    color: "white",
                                                                                    fontWeight: "bold",
                                                                                    fontSize: "small"
                                                                                }}>J'en profite
                                                                                </text>
                                                                            </Card.Footer>
                                                                        </Card>

                                                                        <Card>



                                                                            <div className="card-body d-flex flex-column">
                                                                                <div style={{width: "100%", textAlign: "center"}}>
                                                                                    <img src={deal} style={{
                                                                                        marginLeft: "auto",
                                                                                        marginRight: "auto",
                                                                                        width:"30%"
                                                                                    }}/>
                                                                                </div>
                                                                                <div className="container" style={{
                                                                                    backgroundColor: "#eff7ff",
                                                                                    width: "100%",
                                                                                    textAlign: "center",
                                                                                    marginTop:"1%"

                                                                                }}>
                                                                                    <text style={{
                                                                                        color: "#79beff",
                                                                                        marginLeft: "auto",
                                                                                        marginRight: "auto",
                                                                                        fontWeight: "bold",
                                                                                        fontSize: "small"
                                                                                    }}>SARL SA pate d'actionnaires
                                                                                    </text>
                                                                                </div>
                                                                                <div style={{
                                                                                    width: "100%",
                                                                                    textAlign: "center",
                                                                                    marginTop: "2%"
                                                                                }}>
                                                                                    <text style={{
                                                                                        fontSize: "small",
                                                                                        fontWeight: "bold"
                                                                                    }}>Anticipez les situations delicates qui peuvent survenir entre actionnaires
                                                                                    </text>
                                                                                </div>
                                                                                <div className="mt-auto"style={{
                                                                                    width: "100%",
                                                                                    textAlign: "center",

                                                                                }} >
                                                                                    <text style={{fontSize: "small"}}><a>En savoir
                                                                                        plus</a></text>
                                                                                </div>


                                                                            </div>
                                                                            <Card.Footer style={{
                                                                                backgroundColor: "#1ca973",
                                                                                cursor: "pointer",
                                                                                textAlign: "center"
                                                                            }}>
                                                                                <text style={{
                                                                                    color: "white",
                                                                                    fontWeight: "bold",
                                                                                    fontSize: "small"
                                                                                }}>J'en profite
                                                                                </text>
                                                                            </Card.Footer>
                                                                        </Card>

                                                                        <div className="card" style={{width:"100%"}}>

                                                                            <div className="row" style={{marginLeft: "1%"}}>
                                                                                <div className="col-sm-8"
                                                                                     style={{textAlign: "left"}}>
                                                                                    <div className="row">
                                                                                        <img style={{width: "12%", color: "red"}}
                                                                                             src={offreFlash}/>
                                                                                        <text style={{
                                                                                            fontWeight: "bold",
                                                                                            color: "#f95437",
                                                                                            fontSize: "small"
                                                                                        }}>OFFRE FLASH
                                                                                        </text>
                                                                                    </div>
                                                                                </div>
                                                                                <div className="col-sm-4" style={{
                                                                                    backgroundColor: "#f83c1a",
                                                                                    textAlign: "left",
                                                                                    borderRadius: "10%"
                                                                                }}>
                                                                                    <text style={{
                                                                                        color: "white",
                                                                                        fontWeight: "bold",
                                                                                        fontSize: "small"
                                                                                    }}>- 10%
                                                                                    </text>
                                                                                </div>
                                                                            </div>



                                                                            <div className="card-body  d-flex flex-column" style={{height:"100%"}}>
                                                                                <div style={{width: "100%", textAlign: "center"}}>
                                                                                    <img src={business} style={{
                                                                                        marginLeft: "auto",
                                                                                        marginRight: "auto",
                                                                                        width:"30%"
                                                                                    }}/>
                                                                                </div>
                                                                                <div className="container" style={{
                                                                                    backgroundColor: "#eff7ff",
                                                                                    width: "100%",
                                                                                    textAlign: "center",
                                                                                    marginTop:"1%"

                                                                                }}>
                                                                                    <text style={{
                                                                                        color: "#79beff",
                                                                                        marginLeft: "auto",
                                                                                        marginRight: "auto",
                                                                                        fontWeight: "bold",
                                                                                        fontSize: "small"
                                                                                    }}>Augumentation de capitale
                                                                                    </text>
                                                                                </div>
                                                                                <div style={{
                                                                                    width: "100%",
                                                                                    textAlign: "center",
                                                                                    marginTop: "2%"
                                                                                }}>
                                                                                    <text style={{
                                                                                        fontSize: "small",
                                                                                        fontWeight: "bold"
                                                                                    }}>Développez votre activité avec SmartCo et son partenaire Notaire.
                                                                                    </text>
                                                                                </div>
                                                                                <div className="mt-auto"style={{
                                                                                    width: "100%",
                                                                                    textAlign: "center",

                                                                                }} >
                                                                                    <text style={{fontSize: "small"}}><a>En savoir
                                                                                        plus</a></text>
                                                                                </div>


                                                                            </div>
                                                                            <Card.Footer style={{
                                                                                backgroundColor: "#1ca973",
                                                                                cursor: "pointer",
                                                                                textAlign: "center"
                                                                            }}>

                                                                                <text style={{
                                                                                    color: "white",
                                                                                    fontWeight: "bold",
                                                                                    fontSize: "small"
                                                                                }}>J'en profite
                                                                                </text>
                                                                            </Card.Footer>
                                                                        </div>












                                                                    </div>
                                                                </div>
                                                                <div className="carousel-item">
                                                                    <div className="card-deck">

                                                                        <div className="card ">




                                                                            <div className="card-body ">
                                                                                <div style={{width: "100%", textAlign: "center"}}>
                                                                                    <img src={user} style={{
                                                                                        marginLeft: "auto",
                                                                                        marginRight: "auto",
                                                                                        width:"30%"
                                                                                    }}/>
                                                                                </div>
                                                                                <div className="container" style={{
                                                                                    backgroundColor: "#eff7ff",
                                                                                    width: "100%",
                                                                                    textAlign: "center",
                                                                                    marginTop:"1%"

                                                                                }}>
                                                                                    <text style={{
                                                                                        color: "#79beff",
                                                                                        marginLeft: "auto",
                                                                                        marginRight: "auto",
                                                                                        fontWeight: "bold",
                                                                                        fontSize: "small"
                                                                                    }}>Embauche d'un salarié
                                                                                    </text>
                                                                                </div>
                                                                                <div style={{
                                                                                    width: "100%",
                                                                                    textAlign: "center",
                                                                                    marginTop: "2%"
                                                                                }}>
                                                                                    <text style={{
                                                                                        fontSize: "small",
                                                                                        fontWeight: "bold"
                                                                                    }}>Generez automatiquement un contrat CDI/CDD sur mesure
                                                                                    </text>
                                                                                </div>
                                                                                <div className="mt-auto"style={{
                                                                                    width: "100%",
                                                                                    textAlign: "center",

                                                                                }} >
                                                                                    <text style={{fontSize: "small"}}><a>En savoir
                                                                                        plus</a></text>
                                                                                </div>



                                                                            </div>
                                                                            <Card.Footer style={{
                                                                                backgroundColor: "#1ca973",
                                                                                cursor: "pointer",
                                                                                textAlign: "center"
                                                                            }}>
                                                                                <text style={{
                                                                                    color: "white",
                                                                                    fontWeight: "bold",
                                                                                    fontSize: "small"
                                                                                }}>J'en profite
                                                                                </text>
                                                                            </Card.Footer>
                                                                        </div>

                                                                        <div className="card  " >
                                                                            <div className="container m-auto">
                                                                                <div className="row" >
                                                                                    <div className="col-sm-8"
                                                                                         style={{textAlign: "left"}}>
                                                                                        <div className="row">
                                                                                            <img style={{width: "12%", color: "red"}}
                                                                                                 src={offreFlash}/>
                                                                                            <text style={{
                                                                                                fontWeight: "bold",
                                                                                                color: "#f95437",
                                                                                                fontSize: "small"
                                                                                            }}>OFFRE FLASH
                                                                                            </text>
                                                                                        </div>
                                                                                    </div>
                                                                                    <div className="col-sm-4" style={{
                                                                                        backgroundColor: "#f83c1a",
                                                                                        textAlign: "left",
                                                                                        borderRadius: "10%"
                                                                                    }}>
                                                                                        <text style={{
                                                                                            color: "white",
                                                                                            fontWeight: "bold",
                                                                                            fontSize: "small"
                                                                                        }}>- 10%
                                                                                        </text>
                                                                                    </div>
                                                                                </div>
                                                                            </div>








                                                                            <div className="card-body">


                                                                                <div style={{width: "100%", textAlign: "center"}}>
                                                                                    <img src={setting} style={{
                                                                                        marginLeft: "auto",
                                                                                        marginRight: "auto",
                                                                                        width:"30%"
                                                                                    }}/>
                                                                                </div>
                                                                                <div className="container" style={{
                                                                                    backgroundColor: "#eff7ff",
                                                                                    width: "100%",
                                                                                    textAlign: "center",
                                                                                    marginTop:"1%"

                                                                                }}>
                                                                                    <text style={{
                                                                                        color: "#79beff",
                                                                                        marginLeft: "auto",
                                                                                        marginRight: "auto",
                                                                                        fontWeight: "bold",
                                                                                        fontSize: "small"
                                                                                    }}>Recouvrement de factures
                                                                                    </text>
                                                                                </div>
                                                                                <div className="mt-2" style={{
                                                                                    width: "100%",
                                                                                    textAlign: "center",
                                                                                    marginTop: "2%"
                                                                                }}>
                                                                                    <text style={{
                                                                                        fontSize: "small",
                                                                                        fontWeight: "bold"
                                                                                    }}>Recouvrement vos factures avec SmartCo
                                                                                    </text>
                                                                                </div>
                                                                                <div className="mt-auto"style={{
                                                                                    width: "100%",
                                                                                    textAlign: "center",

                                                                                }} >
                                                                                    <text style={{fontSize: "small"}}><a>En savoir
                                                                                        plus</a></text>
                                                                                </div>


                                                                            </div>
                                                                            <div className="card-body">
                                                                            </div>
                                                                            <div className="card-footer" style={{
                                                                                backgroundColor: "#1ca973",
                                                                                cursor: "pointer",
                                                                                textAlign: "center",
                                                                                bottom:"0"
                                                                            }}>
                                                                                <text style={{
                                                                                    color: "white",
                                                                                    fontWeight: "bold",
                                                                                    fontSize: "small"
                                                                                }}>J'en profite
                                                                                </text>
                                                                            </div>
                                                                        </div>

                                                                        <div className="card ">



                                                                            <div  className="card-body" >
                                                                                <div style={{width: "100%", textAlign: "center"}}>
                                                                                    <img src={lock} style={{
                                                                                        marginLeft: "auto",
                                                                                        marginRight: "auto",
                                                                                        width:"30%"
                                                                                    }}/>
                                                                                </div>
                                                                                <div className="container" style={{
                                                                                    backgroundColor: "#eff7ff",
                                                                                    width: "100%",
                                                                                    textAlign: "center",
                                                                                    marginTop:"1%"

                                                                                }}>
                                                                                    <text style={{
                                                                                        color: "#79beff",
                                                                                        marginLeft: "auto",
                                                                                        marginRight: "auto",
                                                                                        fontWeight: "bold",
                                                                                        fontSize: "small"
                                                                                    }}>Conditions générale de ventes (CGV)
                                                                                    </text>
                                                                                </div>
                                                                                <div style={{
                                                                                    width: "100%",
                                                                                    textAlign: "center",
                                                                                    marginTop: "2%"
                                                                                }}>
                                                                                    <text style={{
                                                                                        fontSize: "small",
                                                                                        fontWeight: "bold"
                                                                                    }}>Protégez vos transactions en ligne et hors ligne gràce a nos modèles
                                                                                    </text>
                                                                                </div>
                                                                                <div style={{
                                                                                    width: "100%",
                                                                                    textAlign: "center",

                                                                                }} >
                                                                                    <text style={{fontSize: "small"}}><a>En savoir
                                                                                        plus</a></text>
                                                                                </div>


                                                                            </div>
                                                                            <div className="card-body">
                                                                            </div>
                                                                            <Card.Footer style={{
                                                                                backgroundColor: "#1ca973",
                                                                                cursor: "pointer",
                                                                                textAlign: "center"
                                                                            }}>

                                                                                <text style={{
                                                                                    color: "white",
                                                                                    fontWeight: "bold",
                                                                                    fontSize: "small"
                                                                                }}>J'en profite
                                                                                </text>
                                                                            </Card.Footer>
                                                                        </div>












                                                                    </div>
                                                                </div>



                                                            </div>

                                                            <a  style={{position:"inherit"}}className="carousel-control-next align-self-stretch"
                                                               href="#carouselExampleControls" role="button" data-slide="next">
                                                                <span style={{backgroundImage:"url(\"data:image/svg+xml;charset=utf8,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='%23ff0000' viewBox='0 0 8 8'%3E%3Cpath d='M1.5 0l-1.5 1.5 2.5 2.5-2.5 2.5 1.5 1.5 4-4-4-4z'/%3E%3C/svg%3E\")" }} className="carousel-control-next-icon"
                                                                      aria-hidden="true"></span>
                                                                <span className="sr-only">Next</span>
                                                            </a>
                                                            <ol  style={{bottom:"-15%"}}className="carousel-indicators">
                                                                <li  style={{backgroundColor:"red",width:"12px",height:"12px",borderRadius:"100%"}} data-target="#carouselExampleControls"
                                                                    data-slide-to="0" className="active"></li>
                                                                <li style={{backgroundColor:"red",width:"12px",height:"12px",borderRadius:"100%"}} data-target="#carouselExampleControls"
                                                                    data-slide-to="1"></li>
                                                                <li style={{backgroundColor:"red",width:"12px",height:"12px",borderRadius:"100%"}} data-target="#carouselExampleControls"
                                                                    data-slide-to="2"></li>
                                                            </ol>

                                                        </div>





                                                    </div>
                                                </div>




                                                <div className={"tab-pane fade"} id={"factures"}
                                                     role="tabpanel" aria-labelledby={"v-pills-factures"}>
                                                    <div className="row" style={{width: "100%"}}>
                                                        <div className="col-sm-4" width="10%">
                                                            <h6>Nos offres partenaires(6)</h6>
                                                        </div>




                                                        <div className="col-sm-8">
                                                            <hr
                                                                style={{
                                                                    color: "#f2f2f2",
                                                                    backgroundColor: "#f2f2f2",
                                                                    height: 0.25,

                                                                }}
                                                            />

                                                        </div>


                                                    </div>



                                                    <div className="container"
                                                         style={{width: "100%", height: 500, borderColor: "red"}}>
                                                        <div  style={{
                                                            marginTop: "5%",
                                                            borderColor: "red",
                                                            borderRadius: 10,
                                                            borderWidth: "solid",
                                                            textAlign: "center"
                                                        }}>

                                                            <div id="carouselExampleControls" className="carousel slide"
                                                                 data-ride="carousel">
                                                                <div className="carousel-inner">
                                                                    <div className="carousel-item active">
                                                                        <div className="card-deck">

                                                                            <Card>



                                                                                <Card.Body>
                                                                                    <div style={{
                                                                                        width: "100%",
                                                                                        textAlign: "center"
                                                                                    }}>
                                                                                        <img src={domic} style={{
                                                                                            marginLeft: "auto",
                                                                                            marginRight: "auto"
                                                                                        }}/>
                                                                                    </div>
                                                                                    <div className="container" style={{
                                                                                        backgroundColor: "#007bff",
                                                                                        width: "80%",
                                                                                        textAlign: "center"
                                                                                    }}>
                                                                                        <text style={{
                                                                                            color: "white",
                                                                                            marginLeft: "auto",
                                                                                            marginRight: "auto",
                                                                                            fontWeight: "bold",
                                                                                            fontSize: "small"
                                                                                        }}>Domicialitation
                                                                                        </text>
                                                                                    </div>
                                                                                    <div style={{
                                                                                        width: "100%",
                                                                                        textAlign: "center",
                                                                                        marginTop: "2%"
                                                                                    }}>
                                                                                        <text style={{
                                                                                            fontSize: "small",
                                                                                            fontWeight: "bold"
                                                                                        }}>Une adresse prestigieuse pour ma domiciliation
                                                                                        </text>
                                                                                    </div>
                                                                                    <div style={{
                                                                                        width: "100%",
                                                                                        textAlign: "center",
                                                                                        marginTop: "2%"
                                                                                    }}>
                                                                                        <text style={{fontSize: "small"}}><a>En
                                                                                            savoir
                                                                                            plus</a></text>
                                                                                    </div>


                                                                                </Card.Body>
                                                                                <Card.Footer style={{
                                                                                    backgroundColor: "#1ca973",
                                                                                    cursor: "pointer",
                                                                                    textAlign: "center"
                                                                                }}>
                                                                                    <text style={{
                                                                                        color: "white",
                                                                                        fontWeight: "bold",
                                                                                        fontSize: "small"
                                                                                    }}>J'en profite
                                                                                    </text>
                                                                                </Card.Footer>
                                                                            </Card>

                                                                            <Card>



                                                                                <Card.Body>
                                                                                    <div style={{
                                                                                        width: "100%",
                                                                                        textAlign: "center"
                                                                                    }}>
                                                                                        <img src={token} style={{
                                                                                            marginLeft: "auto",
                                                                                            marginRight: "auto"
                                                                                        }}/>
                                                                                    </div>
                                                                                    <div className="container" style={{
                                                                                        backgroundColor: "#007bff",
                                                                                        width: "80%",
                                                                                        textAlign: "center"
                                                                                    }}>
                                                                                        <text style={{
                                                                                            color: "white",
                                                                                            marginLeft: "auto",
                                                                                            marginRight: "auto",
                                                                                            fontWeight: "bold",
                                                                                            fontSize: "small"
                                                                                        }}>Token Shares
                                                                                        </text>
                                                                                    </div>
                                                                                    <div style={{
                                                                                        width: "100%",
                                                                                        textAlign: "center",
                                                                                        marginTop: "2%"
                                                                                    }}>
                                                                                        <text style={{
                                                                                            fontSize: "small",
                                                                                            fontWeight: "bold"
                                                                                        }}>Simple, rapide, en ligne Tokeniser vos actions
                                                                                        </text>
                                                                                    </div>
                                                                                    <div style={{
                                                                                        width: "100%",
                                                                                        textAlign: "center",
                                                                                        marginTop: "2%"
                                                                                    }}>
                                                                                        <text style={{fontSize: "small"}}><a>En
                                                                                            savoir
                                                                                            plus</a></text>
                                                                                    </div>


                                                                                </Card.Body>
                                                                                <Card.Footer style={{
                                                                                    backgroundColor: "#1ca973",
                                                                                    cursor: "pointer",
                                                                                    textAlign: "center"
                                                                                }}>
                                                                                    <text style={{
                                                                                        color: "white",
                                                                                        fontWeight: "bold",
                                                                                        fontSize: "small"
                                                                                    }}>J'en profite
                                                                                    </text>
                                                                                </Card.Footer>
                                                                            </Card>

                                                                            <Card>



                                                                                <Card.Body>
                                                                                    <div style={{
                                                                                        width: "100%",
                                                                                        textAlign: "center"
                                                                                    }}>
                                                                                        <img src={assurance} style={{
                                                                                            marginLeft: "auto",
                                                                                            marginRight: "auto"
                                                                                        }}/>
                                                                                    </div>
                                                                                    <div className="container" style={{
                                                                                        backgroundColor: "#007bff",
                                                                                        width: "65%",
                                                                                        textAlign: "center"
                                                                                    }}>
                                                                                        <text style={{
                                                                                            color: "white",
                                                                                            marginLeft: "auto",
                                                                                            marginRight: "auto",
                                                                                            fontWeight: "bold",
                                                                                            fontSize: "small"
                                                                                        }}>Assurance
                                                                                        </text>
                                                                                    </div>
                                                                                    <div style={{
                                                                                        width: "100%",
                                                                                        textAlign: "center",
                                                                                        marginTop: "2%"
                                                                                    }}>
                                                                                        <text style={{
                                                                                            fontSize: "small",
                                                                                            fontWeight: "bold"
                                                                                        }}>Protéger votre société contre les imprévus
                                                                                        </text>
                                                                                    </div>
                                                                                    <div style={{
                                                                                        width: "100%",
                                                                                        textAlign: "center",
                                                                                        marginTop: "2%"
                                                                                    }}>
                                                                                        <text style={{fontSize: "small"}}><a>En
                                                                                            savoir
                                                                                            plus</a></text>
                                                                                    </div>


                                                                                </Card.Body>
                                                                                <Card.Footer style={{
                                                                                    backgroundColor: "#1ca973",
                                                                                    cursor: "pointer",
                                                                                    textAlign: "center"
                                                                                }}>
                                                                                    <text style={{
                                                                                        color: "white",
                                                                                        fontWeight: "bold",
                                                                                        fontSize: "small"
                                                                                    }}>J'en profite
                                                                                    </text>
                                                                                </Card.Footer>
                                                                            </Card>


                                                                        </div>
                                                                    </div>

                                                                </div>

                                                            </div>
                                                            <a className="carousel-control-prev"
                                                               href="#carouselExampleControls" role="button"
                                                               data-slide="prev">
                                                                <span className="carousel-control-prev-icon"
                                                                      aria-hidden="true"></span>
                                                                <span className="sr-only" color="red">Previous</span>
                                                            </a>
                                                            <a className="carousel-control-next"
                                                               href="#carouselExampleControls" role="button"
                                                               data-slide="next">
                                                                <span className="carousel-control-next-icon"
                                                                      aria-hidden="true"></span>
                                                                <span className="sr-only">Next</span>
                                                            </a>




                                                        </div>

                                                    </div>
                                                </div>
                                                <div  className={"tab-pane fade"} id={"infopers"}
                                                     role="tabpanel" aria-labelledby={"v-pills-infopers"}>
                                                    <h6>
                                                        information personnelle
                                                    </h6>

                                                    <Carousel contentClassName=" align-self-stretch" containerClassName=" mt-5 p-5"     value={this.state.recomandations}  itemTemplate={this.cardTemplate} numVisible={3} numScroll={1}  responsiveOptions={responsiveOptions}>></Carousel>






                                                </div>
                                                <div className={"tab-pane fade"} id={"besoinAide"}
                                                     role="tabpanel" aria-labelledby={"v-pills-besoinAide"}>
                                                    <h6>
                                                        besoin d'aide ?
                                                    </h6>




                                                    <div class="calendly-inline-widget" data-url={data}  style={{Width:"50px",height:"150px",position:"absolute"}}></div>






                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <Modal  isOpen={this.state.showModal} size="lg"
                                       toggle={() => this.setState({showModal: !this.state.showModal,stoOperation:false})}>
                                    <ModalHeader toggle={() => this.setState({showModal: !this.state.showModal,stoOperation:false})}>
                                        <div className="container">
                                            <div className="row  " style={{marginTop:"auto", marginBottom:"auto"   }}>

                                                {(this.state.modalStep === "Assistance smartCo" || this.state.modalStep === "Assistance Assemblée generale Online" )&&
                                                <img src={assistance} style={{width:"7%"}} />

                                                }
                                                {
                                                    this.state.modalStep === "Compta Enfin"&&
                                                    <img src={comptaSass} style={{width:"7%"}} />

                                                }




                                                <div className="col-sm-auto">
                                                    <h5 className="bs-tooltip-bottom" style={{fontWeight:"bold"}}>Abonnement:</h5>
                                                </div>



                                                <div className="col-sm-auto">

                                                    <h5 className="bs-tooltip-bottom" style={{color:"#1ca973", fontWeight:"bold"}}>
                                                        {
                                                            this.state.modalStep === "Assistance smartCo" ? "Assistance SmartCo" :
                                                                this.state.modalStep === "Assistance Assemblée generale Online" ? "Assistance Assemblée Générale Online" :
                                                                    this.state.modalStep === "Compta Enfin" ? "Fiduciaire 100% ne ligne" :
                                                                        (this.state.tokenizationStep === "stoOnBoarding2" || this.state.tokenizationStep === "stoOnBoarding3" || this.state.tokenizationStep === "stoOnBoarding4")
                                                                            ? "Intégration STO Etape 2 - Informations générales" :
                                                                            this.state.tokenizationStep === "stoOnBoarding5" ? "Intégration STO du capital social" : ""

                                                        }
                                                    </h5>
                                                </div>
                                            </div>
                                        </div>



                                    </ModalHeader>
                                    <ModalBody>

                                        {
                                            this.state.modalStep === "Assistance smartCo" &&
                                          <div className="container-fluid">
                                              <div style={{marginTop:"2%"}}>
                                                  <h4 style={{textAlign:"center",fontWeight:"bold"}}>Obtenez les réponses et les modèles de documents juridique dont vous avez besoin</h4>
                                              </div>
                                              <div className="row" style={{marginTop:"6%"}}>
                                                  <div className="col" style={{textAlign:"center"}}>
                                                      <div style={{height:"50%"}}>
                                                          <img src={assistance} style={{width:"30%"}}/>
                                                      </div>
                                                      <div>
                                                          <h6 style={{textAlign:"center"}}>Posez toutes vos questions à nos experts</h6>
                                                      </div>


                                                  </div>
                                                  <div className="col" style={{textAlign:"center"}}>
                                                      <div style={{height:"50%"}}>
                                                          <img src={assistance2}/>
                                                      </div>
                                                      <div style={{textAlign:"center"}}>
                                                          <h6 style={{textAlign:"center"}}>Profitez gratuitement de nos modèles de documents juridiques </h6>
                                                      </div>
                                                  </div>
                                                  <div className="col" style={{textAlign:"center"}}>
                                                      <div style={{height:"50%"}}>
                                                          <img src={assistance3}/>
                                                      </div>
                                                      <div>
                                                          <h6 style={{textAlign:"center"}}>Profitez de 20% de réduction sur toutes vos autres démarches</h6>
                                                      </div>
                                                  </div>

                                              </div>
                                              <div style={{textAlign:"center" , marginTop:"10%"}}>
                                                  <div>
                                                      <h6 style={{color:"blue" , fontWeight:"bold"}}>Profitez de 30 jours gratuits.</h6>
                                                      <small> puis <text style={{fontWeight:"bold"}}>29,9 €HT</text> sans engagement</small>

                                                  </div>

                                              </div>
                                              <div style={{marginTop:"6%"}}>
                                                  <button type="button"
                                                          className="btn  btn-lg btn-block"  style={{backgroundColor:"#1ca973" ,}}><text style={{color:"white"}}>J'essaie gratuitement</text>
                                                  </button>

                                              </div>
                                              <div style={{marginTop:"6%" , textAlign:"center"}}>
                                                  <small> le 20/04/2020, votre carte *** -3412, expirant fin 9/2022 sera debitée de 29,9€ HT</small>

                                              </div>

                                          </div>
                                        }
                                        {
                                            this.state.modalStep === "Assistance Assemblée generale Online" &&
                                            <div className="container-fluid">

                                                <div className="row" style={{marginTop:"6%"}}>

                                                   <div className="col  text-center">
                                                       <div>
                                                           <img src={mice}/>
                                                       </div>
                                                       <div>
                                                          <h6>Conférence telephonique </h6>
                                                       </div>
                                                       <div>
                                                           <small>Commandez un numero de conference telephonique pour echanger partout dans le monde au prix d'un appel local.</small>
                                                       </div>


                                                   </div>
                                                    <div className="col text-center">
                                                        <div>
                                                            <img src={mice}/>
                                                        </div>
                                                        <div>
                                                            <h6>Trascription de la voix en texte</h6>
                                                        </div>
                                                        <div>
                                                            <small>Les conversations de votre assemblées générales sont transcrit en texte (et un éditeur vous permet d'editer le PV de l'AG)</small>
                                                        </div>


                                                    </div>
                                                </div>
                                                <div className="row justify-content-center" style={{marginTop:"6%"}}>

                                                    <div className="col  text-center">
                                                        <div>
                                                            <img src={grid} style={{width:"18%"}}/>
                                                        </div>
                                                        <div className="row">
                                                            <div className="col-md-2"> <text style={{fontWeight:"bold", color:"red",fontFamily:"serif"}}>Option*</text></div>
                                                            <div className="col-md-8"><h6>Salon privés </h6></div>
                                                        </div>
                                                        <div>
                                                            <small>Partager le lien de la reunion d'assemblée avec vos associés en un instant.</small>
                                                        </div>


                                                    </div>
                                                    <div className="col text-center">
                                                        <div>
                                                            <img src={video}/>
                                                        </div>
                                                        <div className="row">
                                                            <div className="col-md-2"> <text style={{fontWeight:"bold", color:"red",fontFamily:"serif"}}>Option*</text></div>
                                                            <div className="col-md-8"><h6>Visioconférence </h6></div>
                                                        </div>
                                                        <div>
                                                            <small>Effectuez des visioconferences facilement avec vos collaborateurs en ligne et sans installer de logiciel</small>
                                                        </div>


                                                    </div>
                                                </div>
                                                <div style={{textAlign:"center" , marginTop:"5%"}}>
                                                    <div>

                                                        <img src={logoAssem} style={{width:"20%"}}/><br/>


                                                        <small style={{color:"orange"}}> * options via notre partenaire Assemblee.io </small>

                                                    </div>

                                                </div>
                                                <div style={{marginTop:"3%"}}>
                                                    <button onClick={()=>{this.setState({showModal2:true ,
                                                    modalStep2:"assemble general"})}}  type="button"
                                                            className="btn  btn-lg btn-block"  style={{backgroundColor:"#1ca973" ,}}><text style={{color:"white"}}>J'essaie gratuitement</text>
                                                    </button>

                                                </div>
                                                <div style={{marginTop:"6%" , textAlign:"center"}}>
                                                    <small> le 20/04/2020, votre carte *** -3412, expirant fin 9/2022 sera debitée de 29,9€ HT</small>

                                                </div>



                                            </div>


                                        }
                                        {
                                            this.state.modalStep === "Compta Enfin" &&
                                            <div className="container-fluid text-center" >
                                                <div className="container-fluid">
                                                <div className="col-md-8 text-left">
                                                    <h1>Limiter vos déplacements, privilégiez une Fiduciaire en ligne</h1>

                                                </div>





                                                        <div className=" mt-3 row justify-content-center">
                                                            <div className="col-md-3 col-sm-5 col-lg-3 " style={{backgroundColor:"#d8fff1"}}>
                                                                <div className="row justify-content-center align-items-center">


                                                                        <img     src={correct}style={{width:"10%"}}/>



                                                                         <h5 className="mt-1 font-weight-bold" style={{color:"#2bd598"}}>Bilan inclus</h5>




                                                                </div>

                                                            </div>

                                                        </div>

                                                <div className="mt-4">
                                                    <h4 style={{color:"#c0c0c0"}} className="text-left">Réduisez vos couts de gestion et automatisez la comptabilité de votre activité avec Enfin !
                                                    Smartco</h4>
                                                </div>
                                                <div className="mt-5 row justify-content-start">
                                                    <div className="col">
                                                        <div className="row">

                                                            <ButtonS label="Commencer gratuitement" style={{backgroundColor:"#ff7e3c", color:"white",borderColor:"#ff7e3c"}} className="p-button-rounded" />
                                                            <ButtonS label="Obtenir un devis" style={{backgroundColor:"white", color:"#ff7e3c",borderColor:"#ff7e3c"}} className="p-button-rounded ml-3" />




                                                        </div>

                                                        </div>

                                                </div>

                                                <div className="mt-2 row justify-content-start">
                                                    <div className="col ">
                                                        <div className="row">
                                                        <img src={correctOrange} style={{width:"2%"}} />
                                                        <small>Aucune saisie manuelle</small>

                                                        <img className="ml-5" src={correctOrange} style={{ width:"2%"}} />
                                                        <small>Aucun coût chaché</small>
                                                        </div>

                                                    </div>

                                                </div>

                                                </div>

                                                <div style={{marginTop:"3%"}}>
                                                    <button onClick={()=>{this.setState({showModal2:true ,
                                                        modalStep2:"Compta Enfin1"})}}  type="button"
                                                             className="btn  btn-lg btn-block"  style={{backgroundColor:"#1ca973" ,}}><text style={{color:"white"}}>J'essaie gratuitement</text>
                                                    </button>

                                                </div>
                                                <div style={{marginTop:"6%" , textAlign:"center"}}>
                                                    <small> le 20/04/2020, votre carte *** -3412, expirant fin 9/2022 sera debitée de 29,9€ HT</small>

                                                </div>









                                            </div>


                                        }



                                    </ModalBody>
                                </Modal>
                                <Modal  isOpen={this.state.showModal2} size="lg"
                                        toggle={() => this.setState({showModal2: !this.state.showModal2,stoOperation:false})}>
                                    {  (this.state.modalStep2 === "assemble general" || this.state.modalStep2 === "assemble general2" ||
                                    this.state.modalStep2 === "assemble general3" )&&
                                        <div className="container-fluid " style={{width:"100%",marginTop:"2%"}}>
                                            <div className="row" style={{width:"100%"}} >
                                                <div className="col-md  text-left">
                                                    <img src={logoAssem} style={{width:"60%"}}/>

                                                </div>
                                                <div className="col-md-auto text-right">
                                                    <div className="row" >
                                                        <div className="col-sm-auto">
                                                            <small style={{fontWeight:"bold", color:"#c0c0c0"}}>Nos tarif</small>
                                                        </div>
                                                        <div className="col-sm-auto justify-content-center" >
                                                            <small style={{fontWeight:"bold",color:"#c0c0c0"}}>Connexion</small>
                                                        </div>
                                                        <div className="col-sm-auto justify-content-md-center " >
                                                            <button type="button" className="btn btn-primary" style={{borderColor:"#0000ff",fontWeight:"bold",fontSize:"13px",borderRadius:"40px",backgroundColor:"white",color:"#0000ff",borderWidth:"3px"}}>Rejoindre une conférence</button>

                                                        </div>
                                                    </div>

                                                </div>
                                            </div>



                                        </div>
                                    }
                                    {
                                        this.state.modalStep2 === "Compta Enfin1" &&
                                        <ModalHeader toggle={() => this.setState({showModal2: !this.state.showModal2,stoOperation:false})}>
                                            <div className="container">
                                                <div className="row  " style={{marginTop:"auto", marginBottom:"auto"   }}>

                                                    <img src={comptaSass} style={{width:"7%"}} />


                                                    <div className="col-sm-auto">
                                                        <h5 className="bs-tooltip-bottom" style={{fontWeight:"bold"}}>Abonnement:</h5>
                                                    </div>



                                                    <div className="col-sm-auto">

                                                        <h5 className="bs-tooltip-bottom" style={{color:"#1ca973", fontWeight:"bold"}}>
                                                            {
                                                                this.state.modalStep2 === "Compta Enfin1" ? "Fiduciaire 100% ne ligne" : ""

                                                            }
                                                        </h5>
                                                    </div>
                                                </div>
                                            </div>



                                        </ModalHeader>

                                    }


                                    <ModalBody toggle={() => this.setState({showModal2: !this.state.showModal2,stoOperation:false})}>

                                        {
                                            this.state.modalStep2 === "assemble general" &&
                                            <div className="container-fluid" style={{marginTop:"3%"}}>
                                                <div className="row">
                                                    <div className="col justify-content-m-center">
                                                        <img src={assemble1} style={{width:"100%"}}/>

                                                    </div>
                                                    <div className="col">
                                                        <div style={{textAlign:"center"}}>
                                                            <h4>Assemblée générale en Audioconférence ou en Visioconférence sans logiciel , en un éclair </h4>

                                                        </div>
                                                        <div style={{textAlign:"center"}}>
                                                            <p>Démarrez dès maintenant une audioconférence ou une visioconférence de test avec vos collaborateurs , partenaires et organiser des assemblées générales dans installer de logiciels </p>
                                                        </div>

                                                        <div style={{textAlign:"center"}}>

                                                            <small style={{color:"blue", fontWeight:"bold"}}>Demarrer une nouvelle conférence</small>
                                                            <img src={next} style={{width:"3%", marginLeft:"1%",cursor:"pointer"}}/>





                                                        </div>


                                                    </div>

                                                </div>
                                                <div className="row justify-content-md-center" style={{marginTop:"3%"}}>
                                                    <div className="col text-center">
                                                        <div>
                                                        <img src={mice} style={{width:"13%"}}/>
                                                        </div>


                                                    <div>
                                                        <h6>Conférence téléphonique</h6>
                                                    </div>
                                                    <div >
                                                        <small>Commandez un numéro de conférence téléphonique pour échanger partout dans le monde au prix d'un appel local.</small>
                                                    </div>
                                                    </div>
                                                    <div className="col text-center">
                                                        <div>
                                                            <img src={users} />
                                                        </div>


                                                        <div>
                                                            <h6>Collaboration</h6>
                                                        </div>
                                                        <div >
                                                            <small>Participez à des reunion videos allant jusqu'a 16 participants en simultané par conférence</small>
                                                        </div>
                                                    </div>
                                                    <div className="col text-center">
                                                        <div>
                                                            <img src={mice} style={{width:"13%"}}/>
                                                        </div>


                                                        <div>
                                                            <h6>Trascription de la voix en texte</h6>
                                                        </div>
                                                        <div >
                                                            <small>Les conversations de votre assemblée générale sont transcrit en texte ( et un éditeur vous permet d’éditer le PV en ligne ) </small>
                                                        </div>
                                                    </div>

                                                </div>
                                                <div className="container text-right" style={{marginTop:"2%"}}>
                                                    <button onClick={()=>{this.setState({modalStep2:"assemble general2"})}} type="button" className="btn btn-danger btn-lg">Suite</button>


                                                </div>

                                            </div>
                                        }
                                        {
                                            this.state.modalStep2 === "assemble general2" &&
                                            <div className="container-fluid text-center" style={{marginTop:"3%"}}>
                                                <div >
                                                    <h5>Smartco propose via un accord d’un partenaire, assemblee.io,  une offre de visioconférence et salons privées
                                                    </h5>

                                                </div>
                                                <div className="row justify-content-md-center" style={{marginTop:"3%"}}>
                                                    <div className="col text-center">
                                                        <div>
                                                            <img src={video} style={{width:"13%"}}/>
                                                        </div>


                                                        <div>
                                                            <h6>Visioconférence</h6>
                                                        </div>
                                                        <div >
                                                            <small>Effectuez des visoconférences facilement avec vos collaborateurs en ligne et sans installer de logiciel.</small>
                                                        </div>
                                                    </div>
                                                    <div className="col text-center">
                                                        <div>
                                                            <img src={grid} style={{width:"13%"}} />
                                                        </div>


                                                        <div>
                                                            <h6>Salons privés</h6>
                                                        </div>
                                                        <div >
                                                            <small>Partager le lien de la réunion avec vos collègues, clients, associés en un instant.</small>
                                                        </div>
                                                    </div>




                                                </div>
                                                <div  style={{marginTop:"10%"}}>
                                                    <hr
                                                        style={{
                                                            color: "#f2f2f2",
                                                            backgroundColor: "#f2f2f2",
                                                            height: 1,
                                                            width:"50%"

                                                        }}
                                                    />
                                                </div>

                                                <div style={{marginTop:"5%"}}>
                                                    <h5>SmartCo a adapté  au monde des services juridiques et comptables des sociétés ces services en proposant notre gestion électronique de documents légaux et comptable au sein des salons privées </h5>
                                                </div>
                                                <div className="container text-right" style={{marginTop:"8%" ,marginBottom:"5%"}}>
                                                    <button onClick={()=>{this.setState({modalStep2:"assemble general3"})}} type="button" className="btn btn-danger btn-lg">Confirmer</button>


                                                </div>

                                            </div>
                                        }
                                        {
                                            this.state.modalStep2 === "assemble general3" &&
                                            <div className="container-fluid text-center" style={{marginTop:"8%"}}>
                                               <div className="row text-center">
                                                   <div className="col">
                                                       <div>
                                                           <img src={barChart} style={{width:"10%"}}/>
                                                       </div>
                                                       <div>
                                                           <h5>Flux audio et vidéo HD</h5>
                                                       </div>
                                                       <div>
                                                           <small>Profitez d'un son clair et d'une vidéo fluide durant vos échanges : notre solution s'adapte automatiquement à votre connexion.</small>
                                                       </div>


                                                   </div>
                                                   <div className="col">
                                                       <div>
                                                           <img src={lock2} style={{width:"10%"}}/>
                                                       </div>
                                                       <div>
                                                           <h5>Sécurité maximale</h5>
                                                       </div>
                                                       <div>
                                                           <small>Conférences sécurisées vous garantissant des échanges en toute confidentialité (🔒 SSL 256 bits)</small>
                                                       </div>


                                                   </div>

                                               </div>

                                                <div className="container" style={{backgroundColor:"blue",  width:"100%" ,padding:"5%" , marginTop:"8%"}}>
                                                    <div className="row"style={{width:"100%"}}>
                                                        <div className="col-md text-left">
                                                            <img src={assembleImg} style={{width:"100%"}}/>

                                                        </div>
                                                        <div className="col-md text-left">
                                                            <div style={{textAlign:"left"}}>
                                                                <h4 style={{color:"white"}}>Débutez gratuitement votre première réunion</h4>
                                                            </div>
                                                            <div>
                                                                <text style={{color:"white"}}>Invitez vos collaborateurs et participez à une visioconférence rapide, fluide, et sécurisée partout dans le monde.</text>

                                                            </div>
                                                            <div style={{marginTop:"5%"}}>
                                                                <button type="button" className="btn btn-primary" style={{borderColor:"white",fontWeight:"bold",fontSize:"13px",borderRadius:"40px",backgroundColor:"#0000ff",color:"#white",borderWidth:"3px"}}>Essayer dès maintenant</button>


                                                            </div>


                                                        </div>
                                                    </div>

                                                </div>
                                                <div className="container text-right" style={{marginTop:"5%" ,marginBottom:"5%"}}>
                                                    <button onClick={()=>{this.props.history.push("/marketplace/AG/forfait")}}  type="button" className="btn btn-danger btn-lg">Nos tarifs</button>


                                                </div>


                                            </div>
                                        }
                                        {
                                            this.state.modalStep2 === "Compta Enfin1" &&
                                            <div className="container-fluid text-center" style={{marginTop:"8%"}}>
                                                <div>
                                                    <img src={correctC} style={{width:"20%"}}/>
                                                </div>
                                                <div className="mt2">
                                                    <small>Étape 1 sur 3</small>

                                                </div>
                                                <div style={{marginTop:"3%"}}>
                                                    <h4 className="font-weight-bold">Choisissez votre forfait</h4>
                                                </div>
                                                <div style={{marginTop:"5%"}} className=" row justify-content-center">
                                                    <div className="col-md-1 col-sm-2 col-2">
                                                        <img src={correctOrange} style={{width:"50%"}}/>

                                                    </div>
                                                    <div style={{color:"#c0c0c0"}}className="text-left col-md-8 col-sm-8 col-8">
                                                        <text className="text-left">Aucune saisie , aucune logiciel a telcharger pour démarrer votre essai gratuit</text>

                                                    </div>


                                                </div>
                                                <div className=" mt-3 row justify-content-center">
                                                    <div className="col-md-1 col-sm-2 col-2">
                                                        <img src={correctOrange} style={{width:"50%"}}/>

                                                    </div>
                                                    <div className="text-left col-md-8 col-sm-8 col-8
                                                    ">
                                                        <text style={{color:"#c0c0c0"}}>Toute votre comptabilité sur Enfin ! Smartco pour un abonnement tres attractif</text>

                                                    </div>


                                                </div>
                                                <div className=" mt-3 row justify-content-center">
                                                    <div className="col-md-1 col-sm-2 col-2">
                                                        <img src={correctOrange} style={{width:"50%"}}/>

                                                    </div>
                                                    <div className="text-left col-md-8 col-sm-8 col-8
                                                    ">
                                                        <text style={{color:"#c0c0c0"}}>Service support disponible en illimité de 9h a 19h du lundi au vendredi</text>

                                                    </div>


                                                </div>
                                                <div style={{marginTop:"5%"}}>
                                                    <ButtonS onClick={()=>{this.props.history.push("/marketplace/CE/forfait")}} label="Voir nos forfaits" style={{width:"50%", backgroundColor:"#ff7e3c", color:"white",borderColor:"#ff7e3c"}} className="p-button-rounded" />

                                                </div>
                                            </div>


                                        }



                                    </ModalBody>
                                </Modal>

                            </div>



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
                    </Container>
                </div>




            </div>


        )
    }


}


export default smartcoLink;