import React, {Component, Suspense} from "react";
import 'bootstrap/dist/css/bootstrap.min.css';

import firebase from "firebase/app";
import Card from 'react-bootstrap/Card'
import CardGroup from 'react-bootstrap/CardGroup'
import CardDeck from 'react-bootstrap/CardDeck'

import "firebase/database";
import 'firebase/storage';
import {AvFeedback, AvForm, AvGroup, AvInput} from "availity-reactstrap-validation";
import {Button, Container, FormGroup, Label, Modal, ModalHeader, ModalBody, ModalFooter} from "reactstrap";
import 'react-phone-input-2/lib/style.css'
import PhoneInput from "react-phone-input-2";
import countryList from "../../tools/countryList";
import MySnackbarContentWrapper from "../../tools/customSnackBar";
import Snackbar from "@material-ui/core/Snackbar";
import moment from "moment";
import "moment/locale/fr"
import Loader from "../../components/Loader";

import  check from "../../assets/images/forfait/check-success.svg"
import danger from "../../assets/images/forfait/x-danger.svg"
import  close from "../../assets/images/forfait/close.svg"
import menu from "../../assets/images/forfait/menu.svg"
import logo from "../../assets/images/logo.png"
import suisse from "../../assets/images/flags/suisse1.jpg"
import zap from "../../assets/images/smartDom/zap.svg"
import circle from "../../assets/images/smartDom/arrow-right-circle.svg"
import conf1400 from "../../assets/images/smartDom/Conference1400.jpg"
import conf7100low from "../../assets/images/smartDom/Conference700low.jpg"
import conf1400low from "../../assets/images/smartDom/Conference1400low.jpg"

import bar_chart from "../../assets/images/smartDom/icons/bar_chart.svg"
import grid from "../../assets/images/smartDom/icons/grid.svg"
import lock from "../../assets/images/smartDom/icons/lock.svg"
import mic from "../../assets/images/smartDom/icons/mic.svg"
import users from "../../assets/images/smartDom/icons/users.svg"
import video from "../../assets/images/smartDom/icons/video.svg"
import undraw_security from "../../assets/images/smartDom/undraw_security.svg"
import imag from "../../assets/images/smartDom/imag.jpg"
import rr from "../../assets/images/smartDom/rr.jpg"
import rf from "../../assets/images/smartDom/7.jpg"
import conferenceFull from "../../assets/images/smartDom/Conference_full.jpg"
import female from "../../assets/images/smartDom/female_4.jpg"
import male from "../../assets/images/smartDom/male_1.jpg"
import pm from "../../assets/images/smartDom/planned_meeting.jpg"






































import 'react-multi-carousel/lib/styles.css';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Carousel from "nuka-carousel";
import Image from "react-bootstrap/Image";









const Topbar = React.lazy(() => import("../../components/Topbar"));
const Navbar = React.lazy(() => import("../../components/Navbar"));
const loading = () => <Loader/>;
const google = window.google;

moment.locale('fr');



class forfait extends Component {



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





            <div  className="bg-dark"  style={{backgroundColor:"white",width:"100%"}}>



                <div style={{backgroundColor:"white"}}>
                    <div   className=" bg-white" style={{ backgroundColor:"white", height:"100%"}}>
                        <Suspense fallback={loading()}>
                            {this.state.loading && <Loader/>}
                            <div className="navbar-container">
                                <nav className="navbar navbar-expand-lg navbar-light navbar-toggled-show"
                                     data-sticky="top">
                                    <div className="container">
                                        <a className="navbar-brand navbar-brand-dynamic-color" href="/">
                                            <img alt="logo assemblee.io vidéo conférence visio audio"
                                                 src={logo} width="170"/>
                                        </a>

                                        <div className="d-flex align-items-center order-lg-3">

                                            <button aria-expanded="true" aria-label="Toggle navigation"
                                                    className="navbar-toggler" data-target=".navbar-collapse"
                                                    data-toggle="collapse" type="button">
                                                <img alt="Navbar Toggler Open Icon"
                                                     className="navbar-toggler-open icon icon-sm"
                                                     src={menu} style={{width:"10"}}/>
                                                    <img alt="Navbar Toggler Close Icon"
                                                         className="navbar-toggler-close icon icon-sm"
                                                         src={close} style={{width:"10px"}}/>
                                            </button>
                                        </div>
                                        <div className="d-flex align-items-center order-lg-3">
                                            <button aria-expanded="true" aria-label="Toggle navigation"
                                                    className="navbar-toggler" data-target=".navbar-collapse"
                                                    data-toggle="collapse" type="button">
                                                <img alt="Navbar Toggler Open Icon"
                                                     className="navbar-toggler-open icon icon-sm" data-inject-svg={menu}
                                                     src={menu} style={{width:"10"}}/>
                                                    <img alt="Navbar Toggler Close Icon"
                                                         className="navbar-toggler-close icon icon-sm"
                                                         data-inject-svg={close} src={close} style={{width:"10px"}}/>
                                            </button>
                                        </div>
                                        <div
                                            className="navbar-collapse order-3 order-lg-2 justify-content-lg-end collapse show"
                                            id="navigation-menu" >
                                            <ul className="navbar-nav my-3 my-lg-0">

                                                <li className="nav-item">
                                                    <a style={{fontWeight:"bold"}}  aria-expanded="false" aria-haspopup="true"
                                                       className=" nav-link nav-item "  role="button">Nos
                                                        tarifs</a>
                                                </li>
                                                <li className="nav-item">
                                                    <a style={{fontWeight:"bold"}} aria-expanded="false" aria-haspopup="true"
                                                       className=" nav-link nav-item "  role="button">
                                                        Securité</a>
                                                </li>
                                                <li className="nav-item">
                                                    <a style={{fontWeight:"bold"}} aria-expanded="false" aria-haspopup="true"
                                                       className=" nav-link nav-item "  role="button">
                                                        Rejoindre une conférence</a>
                                                </li>

                                                <li className="nav-item">
                                                    <a style={{fontWeight:"bold"}}  aria-expanded="false" aria-haspopup="true"
                                                       className=" nav-link nav-item "
                                                       role="button">Connexion</a>
                                                </li>

                                                <li className="nav-item">
                                                    <button type="button" className="btn btn-primary" style={{borderColor:"#0000ff",fontWeight:"bold",fontSize:"13px",borderRadius:"40px",backgroundColor:"white",color:"#0000ff",borderWidth:"3px"}}>Créer un compte</button>

                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                </nav>
                            </div>





                            <div className="bg-white" style={{marginTop:"8%"}}>
                            <div className="pb-0">
                                <div className="container pb-5">
                                    <div className="row text-center justify-content-center">
                                        <div className="col">
                                            <h1 className="display-4" style={{fontFamily:"serif"}}>Visioconférence <mark style={{backgroundImage:"linear-gradient(120deg,rgba(255,193,7,.7) 0,rgba(255,193,7,.4) 100%)", color:"inherit" , padding:0,position:"relative",backgroundPositionX:"0px",backgroundPositionY:"80%",backgroundSize:"100% .2em" ,backgroundRepeat:"no-repeat",backgroundAttachment:"initial",backgroundOrigin:"initial",backgroundClip:"initial",backgroundColor:"initial"}}>sécurisée</mark> Opérée
                                                en Suisse
                                            </h1>
                                        </div>
                                    </div>


                                    <div className="row text-center justify-content-center">
                                        <div className="col-md-9 col-lg-8 col-xl-7">
                                            <img src={suisse} height="80"/>
                                            <div className="row" style={{height:5}}>
                                                <div className="col-md-4 bg-danger">

                                                </div>
                                                <div className="col-md-4 bg-white">

                                                </div>
                                                <div className="col-md-4 bg-danger">

                                                </div>

                                            </div>
                                            <text>Opérée in suisse</text>


                                        </div>
                                        <div className="mt-3">
                                            <text style={{fontSize:20}}>
                                                Démarrez dès maintenant une visioconférence sans logiciel, jusqu'à 100 participants en un éclair
                                                <img src={zap}/>
                                            </text>
                                        </div>

                                        <div id="zone-generate-room" className="pointer cursor mt-3"
                                             style={{padding:"15px 0px"}}>
                                            <a href="/app/signup"
                                               className="btn  zoom btn lead btn-call " style={{borderRadius:100,borderWidth:2,borderColor:"#1835d4" ,color:"#1835d4"}}> Démarrer <img
                                                src={circle}
                                                width="15"/></a>
                                            <span className="subtext-generate ml-3">Essai gratuit - sans engagement</span>
                                        </div>

                                        <div className="col-md-12 order-lg-2 mt30 aos-init aos-animate mt-5"
                                             data-aos="fade-right">
                                            <img src={conf1400} srcSet={conf1400low} sizes="(max-width: 700px) 100%,
            (max-width: 1200px) 100%,
             (max-width: 5000px) 100%" alt="assemblee.io visioconférence 100 participants meeting réunion"
                                                 className="rounded img-fluid shadow-lg"/>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            </div>
                            <div className="container mt-5">
                                <div className="row text-center">
                                    <div className="col-md-6 col-lg-4 mb-4 mb-md-5 aos-init aos-animate"
                                         data-aos="fade-up" data-aos-delay="50">
                                        <div className="mx-xl-4">
                                            <img src={video}
                                                 alt="icon assemblee.io video conférence" className="mb-4"/>
                                                <h5>Visioconférence</h5>
                                                <p>
                                                    Effectuez des <b>visioconférences</b> facilement avec vos
                                                    collaborateurs en ligne sans logiciel.
                                                </p>
                                        </div>
                                    </div>
                                    <div className="col-md-6 col-lg-4 mb-4 mb-md-5 aos-init aos-animate"
                                         data-aos="fade-up" data-aos-delay="50">
                                        <div className="mx-xl-4">
                                            <img src={mic}
                                                 alt="icon assemblee.io audio téléphone conférence" className="mb-4"/>
                                                <h5>Audioconférence</h5>
                                                <p>
                                                    Échangez partout dans le monde dans votre navigateur gratuitement et
                                                    facilement.
                                                </p>
                                        </div>
                                    </div>
                                    <div className="col-md-6 col-lg-4 mb-4 mb-md-5 aos-init aos-animate"
                                         data-aos="fade-up" data-aos-delay="50">
                                        <div className="mx-xl-4">
                                            <img src={grid}
                                                 alt="icon assemblee.io audio téléphone conférence salons personnalisés privés"
                                                 className="mb-4"/>
                                                <h5>Salons privés</h5>
                                                <p>
                                                    Créez des salons de réunion sécurisés par un mot de passe, et
                                                    partagez l'accès en invitant vos collaborateurs facilement.
                                                </p>
                                        </div>
                                    </div>
                                    <div className="col-md-6 col-lg-4 mb-4 mb-md-5 aos-init aos-animate"
                                         data-aos="fade-up" data-aos-delay="50">
                                        <div className="mx-xl-4">
                                            <img src={users}
                                                 alt="icon assemblee.io webinaires video conférence" className="mb-4"/>
                                                <h5>Collaboration</h5>
                                                <p>
                                                    Participez à des réunions allant <b>jusqu'à 100 participants</b> en
                                                    simultané par conférence (jusqu'à 16 flux vidéo).
                                                </p>
                                        </div>
                                    </div>
                                    <div className="col-md-6 col-lg-4 mb-4 mb-md-5 aos-init aos-animate"
                                         data-aos="fade-up" data-aos-delay="50">
                                        <div className="mx-xl-4">
                                            <img src={lock}
                                                 alt="icon assemblee.io video conférence sécurité" className="mb-4"/>
                                                <h5>Sécurité maximale</h5>
                                                <p>
                                                    Conférences sécurisées vous garantissant des échanges en toute
                                                    confidentialité (🔒 chiffrement DTLS)
                                                </p>
                                        </div>
                                    </div>
                                    <div className="col-md-6 col-lg-4 mb-4 mb-md-5 aos-init aos-animate"
                                         data-aos="fade-up" data-aos-delay="50">
                                        <div className="mx-xl-4">
                                            <img src={bar_chart}
                                                 alt="icon assemblee.io video conférence réseau flux hd"
                                                 className="mb-4"/>
                                                <h5>Flux audio et vidéo HD</h5>
                                                <p>
                                                    Profitez d'un son clair et d'une vidéo fluide durant vos échanges :
                                                    notre solution s'adapte automatiquement à votre connexion.
                                                </p>
                                        </div>
                                    </div>
                                </div>




                            </div>

                            <section className="o-hidden pt0 mt0">
                                <div className="container">
                                    <div className="row justify-content-center">
                                        <div className="col-lg-12 mb-3 mb-md-4 aos-init aos-animate"
                                             data-aos="fade-up" data-aos-delay="100">
                                            <div
                                                className="card card-body bg-dark text-white align-items-start flex-sm-row h-100">
                                                <div className="row pl40">
                                                    <div className="col-md-3">
                                                        <img
                                                            src={undraw_security}
                                                            width="200"/>
                                                    </div>
                                                    <div className="col-md-8">
                                                        <div className="ml-sm-3 ml-md-4">
                                                            <h5>Sécurité des échanges</h5>
                                                            <p>
                                                                Développé par des ingénieurs en cybersécurité
                                                                français, la solution de visioconférence Assemblée
                                                                assure un niveau de sécurité optimal à tous les
                                                                participants. Toutes les connexions sont sécurisées,
                                                                les échanges sont cryptés entre les participants
                                                                d'une réunion, et aucune information n'est stockée
                                                                sur nos serveurs.
                                                            </p>
                                                            <a href="/security"
                                                               className="btn btn-sm  " style={{color:"white",borderRadius:100,borderColor:"white",borderWidth:2}}>En
                                                                savoir plus</a>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </section>
                            <section className="o-hidden pt0 mt-5">
                                <div className="container">
                                    <div
                                        className="row align-items-center justify-content-around text-center text-lg-left">
                                        <div
                                            className="col-md-9 col-lg-6 col-xl-5 mb-4 mb-md-5 mb-lg-0 pl-lg-5 pl-xl-0">
                                            <div>
                                                <div className="alert  d-inline-block mb-4" style={{borderRadius:1000,backgroundColor:"#a6a6a6"}}>
                                                    <div className="d-flex align-items-center">
                                                        <div className="badge badge-pill badge-sm badge-success">
                                                            <small>Nouveauté</small>
                                                        </div>
                                                        <div className="mx-3">
                                                            <small>Flux sécurisé (🔒 DTLS) en HD</small>
                                                        </div>
                                                    </div>
                                                </div>
                                                <h3 className="h1">Des réunions vidéos jusqu'à 100 participants
                                                </h3>
                                                <p className="lead">Organisez facilement toutes vos réunions
                                                    professionnelles en ligne avec Assemblée : pas de délai, une
                                                    connexion rapide et sécurisée, et surtout aucun logiciel à
                                                    installer pour communiquer.</p>
                                                <a href="" className="lead">En
                                                    savoir plus</a>
                                            </div>
                                        </div>
                                        <div className="col-md-9 col-lg-6 col-xl-5">
                                            <img src={imag} alt="Image"
                                                 className="img-fluid rounded shadow"/>
                                        </div>
                                    </div>
                                </div>
                            </section>
                            <section className="o-hidden mt-5">
                                <div className="container">
                                    <div className="row align-items-center justify-content-around">
                                        <div className="col-md-7 col-lg-5 col-xl-4 aos-init aos-animate"
                                             data-aos="fade-left">
                                            <div className="card h-100 shadow-lg hover-box-shadow">
                                                <a href="#" className="d-block bg-gradient rounded-top">
                                                    <img className="card-img-top hover-fade-out"
                                                         src={rr} alt="blog.5.image"/>
                                                </a>
                                                <div className="card-body">
                                                    <a href="#">
                                                        <h3 className="h3 fs12rem">#Meeting2020</h3>
                                                    </a>
                                                    <p>
                                                        Espace de conférence privé : <b>Réunion avec Louise et
                                                        Mathilde</b>.
                                                    </p>
                                                </div>
                                                <div
                                                    className="card-footer d-flex justify-content-between align-items-center">
                                                    <a href="#" className="badge badge-pill badge-info">Salon
                                                        privé</a>
                                                    <div className="text-small text-muted">10 février 2020</div>
                                                </div>
                                            </div>
                                        </div>
                                        <div
                                            className="col-md-9 col-lg-5 mb-4 mb-md-5 mb-lg-0 text-center text-lg-left aos-init aos-animate"
                                            data-aos="fade-right">
                                            <h3 className="h1 mt-xs-30">Salons de conférence personnalisés</h3>
                                            <p className="lead">Créez autant de salons privés que vous le souhaitez,
                                                et partagez les liens avec collaborateurs en toute sécurité.</p>
                                            <a href="" className="lead">En
                                                savoir plus</a>
                                        </div>
                                    </div>
                                </div>
                            </section>
                            <section className="o-hidden mt-5">
                                <div className="container">
                                    <div
                                        className="row align-items-center justify-content-around text-center text-lg-left">
                                        <div className="col-md-9 col-lg-6 col-xl-5 order-lg-2 ">
                                            <img src={rf} alt="Image"
                                                 className="img-fluid rounded shadow"/>
                                        </div>
                                        <div
                                            className="col-md-9 col-lg-6 col-xl-5 order-lg-1 mb-4 mb-md-5 mb-lg-0 pl-lg-5 pl-xl-0">
                                            <div>
                                                <h2 className="h1 mt-xs-30">Aucun logiciel. Nombre d'animateurs
                                                    illimité.</h2>
                                                <p className="lead">Pensé pour les professionnels : tous vos
                                                    collaborateurs vous rejoignent rapidement dans le monde entier à
                                                    bas coût.</p>
                                            </div>
                                            <div
                                                className="d-flex flex-wrap justify-content-center justify-content-lg-start">
                                                <div className="mb-3 mr-4 ml-lg-0 mr-lg-4 aos-init aos-animate"
                                                     data-aos="fade-left" data-aos-delay="100">
                                                    <div className="d-flex align-items-center">
                                                        <h6 className="mb-0">Accessible sur ordinateur et
                                                            mobile</h6>
                                                    </div>
                                                </div>
                                                <div className="mb-3 mr-4 ml-lg-0 mr-lg-4 aos-init aos-animate"
                                                     data-aos="fade-left" data-aos-delay="200">
                                                    <div className="d-flex align-items-center">
                                                        <h6 className="mb-0">100% sécurisé</h6>
                                                    </div>
                                                </div>
                                                <div className="mb-3 mr-4 ml-lg-0 mr-lg-4 aos-init aos-animate"
                                                     data-aos="fade-left" data-aos-delay="300">
                                                    <div className="d-flex align-items-center">
                                                        <h6 className="mb-0">Rapide</h6>
                                                    </div>
                                                </div>
                                                <div className="mb-3 mr-4 ml-lg-0 mr-lg-4 aos-init aos-animate"
                                                     data-aos="fade-left" data-aos-delay="400">
                                                    <div className="d-flex align-items-center">
                                                        <h6 className="mb-0">Simple à utiliser</h6>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </section>

                            <section className="bg-light o-hidden p-5 " style={{marginTop:"10%"}}>
                                <div className="container">
                                    <div className="row section-title justify-content-center text-center">
                                        <div className="col-md-10 col-lg-10 col-xl-10">
                                            <h2 className="display-4">Collaborez plus facilement</h2>
                                            <div className="lead">Des visioconférences plus simples, intuitives et
                                                surtout 100% sans logiciel à installer pour vos collaborateurs.
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row align-items-center mt-3">
                                        <div className="col-md-2"></div>
                                        <div className="col-md-8">
                                            <div className="card card-body bg-solid-white">
                                                <p>Démarrez gratuitement</p>
                                                <div className="row form-group ">
                                                    <div className="col-md-8">
                                                        <input className="form-control  mb-2" style={{width:"100%"}}
                                                               id="prospect-email" name="name"
                                                               placeholder="Votre email" type="email" required=""/>
                                                    </div>
                                                    <div className="col-md-4">
                                                        <a id="redirect-signup"
                                                           className="btn btn-primary btn-start text-white btn-loading">Démarrer</a>
                                                    </div>
                                                </div>

                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </section>
                            <section className="o-hidden">
                                <div className="container">
                                    <div className="row section-title justify-content-center text-center">
                                        <div className="col-md-9 col-lg-8 col-xl-7">
                                            <h3 className="display-4">Pensé pour vos usages professionnels</h3>
                                            <div className="lead">Partagez en toute simplicité votre lien pour réunir
                                                vos clients, collaborateurs, et associés autour de la table en quelques
                                                minutes, sans logiciel.
                                            </div>
                                        </div>
                                    </div>
                                    <div className="container">
                                        <div className="row">
                                            <div className="col">
                                                <ul className="nav nav-pills lead mb-4 mb-md-5 justify-content-center"
                                                    id="myTab" role="tablist">
                                                    <li className="nav-item">
                                                        <a className="nav-link active" id="home-tab" data-toggle="tab"
                                                           href="#home" role="tab" aria-controls="home"
                                                           aria-selected="true">Conférences</a>
                                                    </li>
                                                    <li className="nav-item">
                                                        <a className="nav-link" id="profile-tab" data-toggle="tab"
                                                           href="#profile" role="tab" aria-controls="profile"
                                                           aria-selected="false">Réunions d'équipe</a>
                                                    </li>
                                                    <li className="nav-item">
                                                        <a className="nav-link" id="contact-tab" data-toggle="tab"
                                                           href="#contact" role="tab" aria-controls="contact"
                                                           aria-selected="false">Planification</a>
                                                    </li>
                                                </ul>
                                                <div className="tab-content" id="myTabContent">
                                                    <div className="tab-pane fade active show" id="home" role="tabpanel"
                                                         aria-labelledby="home-tab">
                                                        <div
                                                            className="row align-items-center justify-content-between flex-lg-row-reverse">
                                                            <div className="col-lg-6 col-xl-7 aos-init aos-animate"
                                                                 data-aos="fade-left">
                                                                <img src={conferenceFull}
                                                                     alt="Call appel assemblee.io visio conference reunion en ligne france"
                                                                     className="img-fluid rounded shadow border"/>
                                                            </div>
                                                            <div
                                                                className="col-lg-6 col-xl-5 text-center text-lg-left mb-4 mb-md-5 mb-lg-0">
                                                                <div className="pl-lg-4 pr-xl-5 aos-init aos-animate"
                                                                     data-aos="fade-right">
                                                                    <h3 className="h3 mt-xs-30">Communiquez avec <mark
                                                                        data-aos="highlight-text" data-aos-delay="250"
                                                                        className="aos-init aos-animate">tout le
                                                                        monde</mark></h3>
                                                                    <p>
                                                                        Aucun problème de compatibilité ou
                                                                        d'installation de logiciel : tout le monde peut
                                                                        vous rejoindre via Internet et sur mobile en
                                                                        quelques secondes seulement ! Idéal pour vos
                                                                        démos ou vos présentations commerciales.
                                                                    </p>
                                                                    <div className="mt-4">
                                                                        <div
                                                                            className="media rounded align-items-center pl-3 pr-3 pr-md-4 py-2 d-inline-flex text-left shadow-sm bg-white">
                                                                            <img
                                                                                src={female}
                                                                                alt="viso conférence en équipe facilement en entreprise"
                                                                                className="avatar avatar-sm flex-shrink-0 mr-3"/>
                                                                                <div className="lh13 fs-xxs mb-0">“Nous
                                                                                    perdons moins de temps à trouver
                                                                                    comment entrer en contact avec nos
                                                                                    clients et nos partenaires.”
                                                                                </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="tab-pane fade" id="profile" role="tabpanel"
                                                         aria-labelledby="profile-tab">
                                                        <div className="row align-items-center justify-content-around">

                                                            <div
                                                                className="col-12 text-center text-lg-left mb-4 mb-md-5 mb-lg-0">
                                                                <div
                                                                    className="text-center pr-lg-4 pr-xl-5 aos-init aos-animate"
                                                                    data-aos="fade-right">
                                                                    <h3 className="h3 mt-xs-30">Faites le point <mark
                                                                        data-aos="highlight-text" data-aos-delay="250"
                                                                        className="aos-init aos-animate">avec vos
                                                                        équipes</mark></h3>
                                                                    <p>
                                                                        En physique, ou en télétravail, le monde du
                                                                        travail et les usages changent : adaptez-vous et
                                                                        ne laissez personne de côté pour les décisions
                                                                        importantes.
                                                                    </p>
                                                                    <div className="mt-4">
                                                                        <div
                                                                            className="media rounded align-items-center pl-3 pr-3 pr-md-4 py-2 d-inline-flex text-left shadow-sm bg-white">
                                                                            <img
                                                                                src={male}
                                                                                alt="viso conférence en équipe facilement en entreprise"
                                                                                className="avatar avatar-sm flex-shrink-0 mr-3"/>
                                                                                <div
                                                                                    className="text-dark lh13 fs-xxs mb-0">“Nos
                                                                                    développeurs en télétravail sont
                                                                                    toujours joignables sur <a
                                                                                        href="">assemblee.io</a>”
                                                                                </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>

                                                        </div>
                                                    </div>
                                                    <div className="tab-pane fade" id="contact" role="tabpanel"
                                                         aria-labelledby="contact-tab">
                                                        <div className="row align-items-center justify-content-around">

                                                            <div className="col-lg-5 aos-init aos-animate"
                                                                 data-aos="fade-left">
                                                                <img src={pm}
                                                                     alt="Call réunion planifiées ical calendrier appel assemblee.io visio conference reunion en ligne france"
                                                                     className="img-fluid rounded"/>
                                                            </div>
                                                            <div className="col-7 text-lg-left mb-4 mb-md-5 mb-lg-0">
                                                                <div className="pr-lg-4 pr-xl-5 aos-init aos-animate"
                                                                     data-aos="fade-right">
                                                                    <h3 className="h3 mt-xs-30">Planifiez vos
                                                                        réunions <mark data-aos="highlight-text"
                                                                                       data-aos-delay="250"
                                                                                       className="aos-init aos-animate">facilement</mark>
                                                                    </h3>
                                                                    <p>
                                                                        Envoyez automatiquement une invitation par email
                                                                        à tous les participants de votre réunion : date,
                                                                        heure, commentaire et lien d'accès sont transmis
                                                                        à tout le monde !
                                                                    </p>
                                                                </div>
                                                            </div>
                                                        </div>
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

                </div>


            </div >


        )
    }


}


export default forfait;
