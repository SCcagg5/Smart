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


                <header id="topnav">
                    <Suspense fallback={loading()}>
                        <Topbar changeActivePage={this.changeActivePage}/>
                    </Suspense>
                </header>
                <div style={{backgroundColor:"white"}}>
                    <div   className="container-fluid bg-white" style={{ backgroundColor:"white", height:"100%"}}>
                        <Suspense fallback={loading()}>
                            {this.state.loading && <Loader/>}
                            <div className="navbar-container">
                                <nav className="navbar navbar-expand-lg navbar-light navbar-toggled-show"
                                     data-sticky="top">
                                    <div className="container">

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
                                                    <a aria-expanded="false" aria-haspopup="true"
                                                       className=" nav-link nav-item "  role="button">Nos
                                                        tarifs</a>
                                                </li>

                                                <li className="nav-item">
                                                    <a aria-expanded="false" aria-haspopup="true"
                                                       className=" nav-link nav-item "
                                                       role="button">Connexion</a>
                                                </li>

                                                <li className="nav-item">
                                                    <button type="button" className="btn btn-primary" style={{borderColor:"#0000ff",fontWeight:"bold",fontSize:"13px",borderRadius:"40px",backgroundColor:"white",color:"#0000ff",borderWidth:"3px"}}>Rejoindre une conférence</button>

                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                </nav>
                            </div>





                            <div className="bg-white" style={{marginTop:"8%"}}>
                            <section className="pb-0">
                                <div className="container pb-5">
                                    <div className="row text-center justify-content-center">
                                        <div className="col">
                                            <h1 className="display-3">Une tarification <mark style={{backgroundImage:"linear-gradient(120deg,rgba(255,193,7,.7) 0,rgba(255,193,7,.4) 100%)", color:"inherit" , padding:0,position:"relative",backgroundPositionX:"0px",backgroundPositionY:"80%",backgroundSize:"100% .3em" ,backgroundRepeat:"no-repeat",backgroundAttachment:"initial",backgroundOrigin:"initial",backgroundClip:"initial",backgroundColor:"initial"}}>adaptée</mark> à vos
                                                besoins
                                            </h1>
                                        </div>
                                    </div>
                                    <div className="row text-center justify-content-center">
                                        <div className="col-md-9 col-lg-8 col-xl-7">
                                            <p className="lead">Découvrez quelle offre est adaptée à votre structure à
                                                l'aide de notre tableau explicatif.</p>
                                        </div>
                                    </div>
                                </div>
                            </section>
                            </div>
                            <div>

                            <section className="pt-5 ">
                                <div className="container">
                                    <div className="row justify-content-end sticky-top   bg-white " style={{top:"8%"}}  >
                                        <div className="col-lg-2 col-3 col-sm-2 py-3 py-md-4 border-bottom">
                                            <div className="d-flex flex-column align-items-center text-center">
                                                <h4>Gratuit</h4>
                                                <div className="d-flex align-items-center justify-content-center mb-1">
                                                    <span className="h5 mb-0 mr-1 mr-sm-2">€</span>
                                                    <span className="display-4 mb-0 text-dark">0</span>
                                                </div>
                                                <div className="text-small mb-3 mb-md-4">par mois</div>
                                                <a  className="btn btn-outline-primary btn-block">
                                                    <span className="d-none d-md-inline-block">Démarrer</span>
                                                </a>
                                            </div>
                                        </div>
                                        <div className="col-lg-2 col-3 col-sm-3 py-3 py-md-4 border-bottom">
                                            <div className="d-flex flex-column align-items-center text-center">
                                                <div>
                                                <h4 >Startup <text style={{color:"red"}}>Audio</text></h4>
                                                </div>
                                                <div className="d-flex align-items-center justify-content-center mb-1">
                                                    <span className="h5 mb-0 mr-1 mr-sm-2">€</span>
                                                    <span className="display-4 mb-0 text-dark">29</span>
                                                </div>
                                                <div className="text-small mb-3 mb-md-4">par mois</div>
                                                <a  className="btn btn-primary btn-block">
                                                    <span className="d-none d-md-inline-block text-white">Inscrivez-vous</span>
                                                </a>
                                            </div>
                                        </div>

                                        <div className="col-lg-2 col-3 col-sm-3 py-3 py-md-4 border-bottom">
                                            <div className="d-flex flex-column align-items-center text-center">
                                                <h4>Startup <text style={{color:"red"}}>Vision</text></h4>
                                                <div className="d-flex align-items-center justify-content-center mb-1">
                                                    <span className="h5 mb-0 mr-1 mr-sm-2">€</span>
                                                    <span className="display-4 mb-0 text-dark">49</span>
                                                </div>
                                                <div className="text-small mb-3 mb-md-4">par mois</div>
                                                <a  className="btn btn-primary btn-block">
                                                    <span className="d-none d-md-inline-block text-white">Inscrivez-vous</span>
                                                </a>
                                            </div>
                                        </div>
                                        <div className="col-lg-2 col-3 col-sm-3 py-3 py-md-4 border-bottom">
                                            <div className="d-flex flex-column align-items-center text-center">
                                                <h4>Entreprise</h4>
                                                <div className="d-flex align-items-center justify-content-center mb-1">
                                                    <span className="h5 mb-0 mr-1 mr-sm-2">€</span>
                                                    <span className="display-4 mb-0 text-dark">89</span>
                                                </div>
                                                <div className="text-small mb-3 mb-md-4">par mois</div>
                                                <a  className="btn btn-primary btn-block">
                                                    <span className="d-none d-md-inline-block text-white">Inscrivez-vous</span>
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="mt-5">
                                        <table className="mt-5 table table-striped table table-borderless text-center text-lg-left bg">
                                            <div className="row no-gutters">
                                                <div className="col">
                                                    <h5 className="mb-4">Conférence vidéo</h5>
                                                </div>
                                            </div>
                                            <tbody  className="border rounded">
                                                <tr className="row no-gutters align-items-center border  ">
                                                    <th className="col-12 col-lg-4  py-3 py-md-4">
                                                        <div
                                                            className="d-flex align-items-center justify-content-center justify-content-lg-start">
                                                            <h6 className="mb-0 ml-lg-4">Nombre de participants max.</h6>
                                                        </div>
                                                    </th>
                                                    <td className="col-3 col-lg-2 d-flex justify-content-center py-3 py-md-4">
                                                        <span>4</span>
                                                    </td>
                                                    <td className="col-3 col-lg-2 d-flex justify-content-center py-3 py-md-4">
                                                        <span>8</span>
                                                    </td>
                                                    <td
                                                        className="col-3 col-lg-2 d-flex justify-content-center py-3 py-md-4">
                                                        <span>16</span>
                                                    </td>
                                                    <td
                                                        className="col-3 col-lg-2 d-flex justify-content-center py-3 py-md-4">
                                                        <span>16</span>
                                                    </td>
                                                </tr>
                                                <tr className="row no-gutters align-items-center border">
                                                    <th className="col-12 col-lg-4  py-3 py-md-4">
                                                        <div
                                                            className="d-flex align-items-center justify-content-center justify-content-lg-start">
                                                            <h6 className="mb-0 ml-lg-4">Nombre d'animateurs</h6>
                                                            <img className="ml-2" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAABmJLR0QA/wD/AP+gvaeTAAABI0lEQVQ4jZ3TvUoDQRTF8V/s/ErAUrQQIbWvIib6AtqIYGMQk15738BaGyvBwtrCJFr5AKmMtlFsEotdZV33Y+KBCzPMmT93DnMryrWAlXg9wCjgzh/V0EEfk1T10UY1FLaDtwxQul7RLIMdYxwA+64xWkWdTQNLQhtpWC1+QtaFMyxjCbv4yPAMpTLt5MCuY+MN7rGO0xxvOwl8zDHd4SKxP8B2jrf3DVsMzGqENZwXZDkP9UDgPjbwWeCphwJvMYvnEl899MmH2Czx/DyZ7BFL1hMeSjxdmImBl4r1IPo2RbpKbqryP/YEe6JJyjt/EUX3S03/H72tvLZbU0LHOCqJQkM0m2WwYVFnaVVFs9nLAHVxIiMzqATA57Aarwd4LzJ/AfE47X+DOjxOAAAAAElFTkSuQmCC"/>
                                                        </div>
                                                    </th>
                                                    <td
                                                        className="col-3 col-lg-2 d-flex justify-content-center py-3 py-md-4">
                                                        <span>1</span>
                                                    </td>

                                                    <td
                                                        className="col-3 col-lg-2 d-flex justify-content-center py-3 py-md-4">
                                                        <span>1</span>
                                                    </td>
                                                    <td
                                                        className="col-3 col-lg-2 d-flex justify-content-center py-3 py-md-4">
                                                        <span>10</span>
                                                    </td>
                                                    <td
                                                        className="col-3 col-lg-2 d-flex justify-content-center py-3 py-md-4">
                                                        <span>Illimité</span>
                                                    </td>
                                                </tr>
                                                <tr className="row no-gutters align-items-center border">
                                                    <th className="col-12 col-lg-4  py-3 py-md-4">
                                                        <div
                                                            className="d-flex align-items-center justify-content-center justify-content-lg-start">
                                                            <h6 className="mb-0 ml-lg-4">Flux vidéo et audio HD</h6>

                                                        </div>
                                                    </th>
                                                    <td
                                                        className="col-3 col-lg-2 d-flex justify-content-center py-3 py-md-4">
                                                        <div className="rounded-circle-alt">
                                                            <img
                                                                src={check}
                                                                alt=" icon=" className="m-2 icon icon-sm"/>
                                                        </div>
                                                    </td>

                                                    <td
                                                        className="col-3 col-lg-2 d-flex justify-content-center py-3 py-md-4">
                                                        <div className="rounded-circle-alt">
                                                            <img
                                                                src={check}
                                                                alt=" icon=" className="m-2 icon icon-sm"/>
                                                        </div>
                                                    </td>
                                                    <td
                                                        className="col-3 col-lg-2 d-flex justify-content-center py-3 py-md-4">
                                                        <div className="rounded-circle-alt">
                                                            <img
                                                                src={check}
                                                                alt=" icon=" className="m-2 icon icon-sm"/>
                                                        </div>
                                                    </td>
                                                    <td
                                                        className="col-3 col-lg-2 d-flex justify-content-center py-3 py-md-4">
                                                        <div className="rounded-circle-alt">
                                                            <img
                                                                src={check}
                                                                alt=" icon=" className="m-2 icon icon-sm"/>
                                                        </div>
                                                    </td>
                                                </tr>
                                                <tr className="row no-gutters align-items-center border">
                                                    <th className="col-12 col-lg-4  py-3 py-md-4">
                                                        <div
                                                            className="d-flex align-items-center justify-content-center justify-content-lg-start">
                                                            <h6 className="mb-0 ml-lg-4">Aucun logiciel à télecharger</h6>

                                                        </div>
                                                    </th>
                                                    <td
                                                        className="col-3 col-lg-2 d-flex justify-content-center py-3 py-md-4">
                                                        <div className="rounded-circle-alt">
                                                            <img
                                                                src={check}
                                                                alt=" icon=" className="m-2 icon icon-sm"/>
                                                        </div>
                                                    </td>

                                                    <td
                                                        className="col-3 col-lg-2 d-flex justify-content-center py-3 py-md-4">
                                                        <div className="rounded-circle-alt">
                                                            <img
                                                                src={check}
                                                                alt=" icon=" className="m-2 icon icon-sm"/>
                                                        </div>
                                                    </td>
                                                    <td
                                                        className="col-3 col-lg-2 d-flex justify-content-center py-3 py-md-4">
                                                        <div className="rounded-circle-alt">
                                                            <img
                                                                src={check}
                                                                alt=" icon=" className="m-2 icon icon-sm"/>
                                                        </div>
                                                    </td>
                                                    <td
                                                        className="col-3 col-lg-2 d-flex justify-content-center py-3 py-md-4">
                                                        <div className="rounded-circle-alt">
                                                            <img
                                                                src={check}
                                                                alt=" icon=" className="m-2 icon icon-sm"/>
                                                        </div>
                                                    </td>
                                                </tr>
                                                <tr className="row no-gutters align-items-center border">
                                                    <th className="col-12 col-lg-4  py-3 py-md-4">
                                                        <div
                                                            className="d-flex align-items-center justify-content-center justify-content-lg-start">
                                                            <h6 className="mb-0 ml-lg-4">Messagerie instantannée</h6>

                                                        </div>
                                                    </th>
                                                    <td
                                                        className="col-3 col-lg-2 d-flex justify-content-center py-3 py-md-4">
                                                        <div className="rounded-circle-alt">
                                                            <img
                                                                src={check}
                                                                alt=" icon=" className="m-2 icon icon-sm"/>
                                                        </div>
                                                    </td>

                                                    <td
                                                        className="col-3 col-lg-2 d-flex justify-content-center py-3 py-md-4">
                                                        <div className="rounded-circle-alt">
                                                            <img
                                                                src={check}
                                                                alt=" icon=" className="m-2 icon icon-sm"/>
                                                        </div>
                                                    </td>
                                                    <td
                                                        className="col-3 col-lg-2 d-flex justify-content-center py-3 py-md-4">
                                                        <div className="rounded-circle-alt">
                                                            <img
                                                                src={check}
                                                                alt=" icon=" className="m-2 icon icon-sm"/>
                                                        </div>
                                                    </td>
                                                    <td
                                                        className="col-3 col-lg-2 d-flex justify-content-center py-3 py-md-4">
                                                        <div className="rounded-circle-alt">
                                                            <img
                                                                src={check}
                                                                alt=" icon=" className="m-2 icon icon-sm"/>
                                                        </div>
                                                    </td>
                                                </tr>
                                                <tr className="row no-gutters align-items-center border">
                                                    <th className="col-12 col-lg-4  py-3 py-md-4">
                                                        <div
                                                            className="d-flex align-items-center justify-content-center justify-content-lg-start">
                                                            <h6 className="mb-0 ml-lg-4">Partage d'écran</h6>

                                                        </div>
                                                    </th>
                                                    <td
                                                        className="col-3 col-lg-2 d-flex justify-content-center py-3 py-md-4">
                                                        <div className="rounded-circle-alt">
                                                            <img
                                                                src={check}
                                                                alt=" icon=" className="m-2 icon icon-sm"/>
                                                        </div>
                                                    </td>

                                                    <td
                                                        className="col-3 col-lg-2 d-flex justify-content-center py-3 py-md-4">
                                                        <div className="rounded-circle-alt">
                                                            <img
                                                                src={check}
                                                                alt=" icon=" className="m-2 icon icon-sm"/>
                                                        </div>
                                                    </td>
                                                    <td
                                                        className="col-3 col-lg-2 d-flex justify-content-center py-3 py-md-4">
                                                        <div className="rounded-circle-alt">
                                                            <img
                                                                src={check}
                                                                alt=" icon=" className="m-2 icon icon-sm"/>
                                                        </div>
                                                    </td>
                                                    <td
                                                        className="col-3 col-lg-2 d-flex justify-content-center py-3 py-md-4">
                                                        <div className="rounded-circle-alt">
                                                            <img
                                                                src={check}
                                                                alt=" icon=" className="m-2 icon icon-sm"/>
                                                        </div>
                                                    </td>
                                                </tr>


                                            </tbody>
                                        </table>
                                        <table className="mt-5 table table-striped table table-borderless text-center text-lg-left">
                                            <div className="row no-gutters">
                                                <div className="col">
                                                    <h5 className="mb-4">Conférence téléphonique audio</h5>
                                                </div>
                                            </div>
                                            <tbody  className="border rounded">
                                            <tr className="row no-gutters align-items-center border  ">
                                                <th className="col-12 col-lg-4  py-3 py-md-4">
                                                    <div
                                                        className="d-flex align-items-center justify-content-center justify-content-lg-start">
                                                        <h6 className="mb-0 ml-lg-4">Disponibilité</h6>
                                                    </div>
                                                </th>
                                                <td className="col-3 col-lg-2 d-flex justify-content-center py-3 py-md-4 ">
                                                    <div className="rounded-circle-alt">
                                                        <img
                                                            src={danger}
                                                            alt=" icon=" className="m-2 icon icon-sm"/>
                                                    </div>
                                                </td>
                                                <td className="col-3 col-lg-2 d-flex justify-content-center py-3 py-md-4">
                                                    <div className="rounded-circle-alt">
                                                        <img
                                                            src={check}
                                                            alt=" icon=" className="m-2 icon icon-sm"/>
                                                    </div>
                                                </td>
                                                <td
                                                    className="col-3 col-lg-2 d-flex justify-content-center py-3 py-md-4">
                                                    <div className="rounded-circle-alt">
                                                        <img
                                                            src={danger}
                                                            alt=" icon=" className="m-2 icon icon-sm"/>
                                                    </div>
                                                </td>
                                                <td
                                                    className="col-3 col-lg-2 d-flex justify-content-center py-3 py-md-4">
                                                    <span>24/24, 7j/7</span>
                                                </td>
                                            </tr>
                                            <tr className="row no-gutters align-items-center border  ">
                                                <th className="col-12 col-lg-4  py-3 py-md-4">
                                                    <div
                                                        className="d-flex align-items-center justify-content-center justify-content-lg-start">
                                                        <h6 className="mb-0 ml-lg-4">Nombre de participant max.</h6>
                                                    </div>
                                                </th>
                                                <td className="col-3 col-lg-2 d-flex justify-content-center py-3 py-md-4 ">
                                                    <div className="rounded-circle-alt">
                                                        <img
                                                            src={danger}
                                                            alt=" icon=" className="m-2 icon icon-sm"/>
                                                    </div>
                                                </td>
                                                <td className="col-3 col-lg-2 d-flex justify-content-center py-3 py-md-4">
                                                    <div className="rounded-circle-alt">
                                                        <img
                                                            src={check}
                                                            alt=" icon=" className="m-2 icon icon-sm"/>
                                                    </div>
                                                </td>
                                                <td
                                                    className="col-3 col-lg-2 d-flex justify-content-center py-3 py-md-4">
                                                    <div className="rounded-circle-alt">
                                                        <img
                                                            src={danger}
                                                            alt=" icon=" className="m-2 icon icon-sm"/>
                                                    </div>
                                                </td>
                                                <td
                                                    className="col-3 col-lg-2 d-flex justify-content-center py-3 py-md-4">
                                                    <span>20</span>
                                                </td>
                                            </tr>
                                            <tr className="row no-gutters align-items-center border">
                                                <th className="col-12 col-lg-4  py-3 py-md-4">
                                                    <div
                                                        className="d-flex align-items-center justify-content-center justify-content-lg-start">
                                                        <h6 className="mb-0 ml-lg-4">Numéro locaux</h6>
                                                        <img className="ml-2" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAABmJLR0QA/wD/AP+gvaeTAAABI0lEQVQ4jZ3TvUoDQRTF8V/s/ErAUrQQIbWvIib6AtqIYGMQk15738BaGyvBwtrCJFr5AKmMtlFsEotdZV33Y+KBCzPMmT93DnMryrWAlXg9wCjgzh/V0EEfk1T10UY1FLaDtwxQul7RLIMdYxwA+64xWkWdTQNLQhtpWC1+QtaFMyxjCbv4yPAMpTLt5MCuY+MN7rGO0xxvOwl8zDHd4SKxP8B2jrf3DVsMzGqENZwXZDkP9UDgPjbwWeCphwJvMYvnEl899MmH2Czx/DyZ7BFL1hMeSjxdmImBl4r1IPo2RbpKbqryP/YEe6JJyjt/EUX3S03/H72tvLZbU0LHOCqJQkM0m2WwYVFnaVVFs9nLAHVxIiMzqATA57Aarwd4LzJ/AfE47X+DOjxOAAAAAElFTkSuQmCC"/>
                                                    </div>
                                                </th>
                                                <td
                                                    className="col-3 col-lg-2 d-flex justify-content-center py-3 py-md-4">
                                                    <div className="rounded-circle-alt">
                                                        <img
                                                            src={danger}
                                                            alt=" icon=" className="m-2 icon icon-sm"/>
                                                    </div>
                                                </td>

                                                <td
                                                    className="col-3 col-lg-2 d-flex justify-content-center py-3 py-md-4">
                                                    <div className="rounded-circle-alt">
                                                        <span>6 pays (France , Suisse, Belgique ,Luxembourg, Angleterre,Singapore</span>
                                                    </div>
                                                </td>
                                                <td
                                                    className="col-3 col-lg-2 d-flex justify-content-center py-3 py-md-4">
                                                    <div className="rounded-circle-alt">
                                                        <img
                                                            src={danger}
                                                            alt=" icon=" className="m-2 icon icon-sm"/>
                                                    </div>
                                                </td>
                                                <td
                                                    className="col-3 col-lg-2 d-flex justify-content-center py-3 py-md-4">
                                                    <div className="rounded-circle-alt">
                                                        <span>6 pays (France , Royaume-Uni , État-Unis, Canada, Allemagne, Belgique) </span>

                                                    </div>
                                                </td>
                                            </tr>
                                            <tr className="row no-gutters align-items-center border">
                                                <th className="col-12 col-lg-4  py-3 py-md-4">
                                                    <div
                                                        className="d-flex align-items-center justify-content-center justify-content-lg-start">
                                                        <h6 className="mb-0 ml-lg-4">Temps de parole</h6>
                                                        <img className="ml-2" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAABmJLR0QA/wD/AP+gvaeTAAABI0lEQVQ4jZ3TvUoDQRTF8V/s/ErAUrQQIbWvIib6AtqIYGMQk15738BaGyvBwtrCJFr5AKmMtlFsEotdZV33Y+KBCzPMmT93DnMryrWAlXg9wCjgzh/V0EEfk1T10UY1FLaDtwxQul7RLIMdYxwA+64xWkWdTQNLQhtpWC1+QtaFMyxjCbv4yPAMpTLt5MCuY+MN7rGO0xxvOwl8zDHd4SKxP8B2jrf3DVsMzGqENZwXZDkP9UDgPjbwWeCphwJvMYvnEl899MmH2Czx/DyZ7BFL1hMeSjxdmImBl4r1IPo2RbpKbqryP/YEe6JJyjt/EUX3S03/H72tvLZbU0LHOCqJQkM0m2WwYVFnaVVFs9nLAHVxIiMzqATA57Aarwd4LzJ/AfE47X+DOjxOAAAAAElFTkSuQmCC"/>
                                                    </div>
                                                </th>
                                                <td
                                                    className="col-3 col-lg-2 d-flex justify-content-center py-3 py-md-4">
                                                    <div className="rounded-circle-alt">
                                                        <img
                                                            src={danger}
                                                            alt=" icon=" className="m-2 icon icon-sm"/>
                                                    </div>
                                                </td>

                                                <td
                                                    className="col-3 col-lg-2 d-flex justify-content-center py-3 py-md-4">
                                                    <div className="rounded-circle-alt">
                                                        <span>2 heures par jour par participant</span>
                                                    </div>
                                                </td>
                                                <td
                                                    className="col-3 col-lg-2 d-flex justify-content-center py-3 py-md-4">
                                                    <div className="rounded-circle-alt">
                                                        <img
                                                            src={danger}
                                                            alt=" icon=" className="m-2 icon icon-sm"/>
                                                    </div>
                                                </td>
                                                <td
                                                    className="col-3 col-lg-2 d-flex justify-content-center py-3 py-md-4">
                                                    <span>Illimité, sans surcoût.</span>
                                                </td>
                                            </tr>


                                            </tbody>
                                        </table>
                                        <table className="mt-5 table table-striped table table-borderless text-center text-lg-left">
                                            <div className="row no-gutters">
                                                <div className="col">
                                                    <h5 className="mb-4">Pour les entreprise</h5>
                                                </div>
                                            </div>
                                            <tbody  className="border rounded">
                                            <tr className="row no-gutters align-items-center border  ">
                                                <th className="col-12 col-lg-4  py-3 py-md-4">
                                                    <div
                                                        className="d-flex align-items-center justify-content-center justify-content-lg-start">
                                                        <h6 className="mb-0 ml-lg-4">Personnalisation</h6>
                                                        <img className="ml-2" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAABmJLR0QA/wD/AP+gvaeTAAABI0lEQVQ4jZ3TvUoDQRTF8V/s/ErAUrQQIbWvIib6AtqIYGMQk15738BaGyvBwtrCJFr5AKmMtlFsEotdZV33Y+KBCzPMmT93DnMryrWAlXg9wCjgzh/V0EEfk1T10UY1FLaDtwxQul7RLIMdYxwA+64xWkWdTQNLQhtpWC1+QtaFMyxjCbv4yPAMpTLt5MCuY+MN7rGO0xxvOwl8zDHd4SKxP8B2jrf3DVsMzGqENZwXZDkP9UDgPjbwWeCphwJvMYvnEl899MmH2Czx/DyZ7BFL1hMeSjxdmImBl4r1IPo2RbpKbqryP/YEe6JJyjt/EUX3S03/H72tvLZbU0LHOCqJQkM0m2WwYVFnaVVFs9nLAHVxIiMzqATA57Aarwd4LzJ/AfE47X+DOjxOAAAAAElFTkSuQmCC"/>
                                                    </div>
                                                </th>
                                                <td className="col-3 col-lg-2 d-flex justify-content-center py-3 py-md-4 ">
                                                    <div className="rounded-circle-alt">
                                                        <img
                                                            src={danger}
                                                            alt=" icon=" className="m-2 icon icon-sm"/>
                                                    </div>
                                                </td>
                                                <td className="col-3 col-lg-2 d-flex justify-content-center py-3 py-md-4">
                                                    <div className="text-center">
                                                        <div>
                                                            <span className="text-center">Envoi de emails pour rappels des audioconf + Numéro de réunion audio attribué  </span>


                                                        </div>
                                                        <div>
                                                            <span>(illimitées)</span>

                                                        </div>
                                                    </div>



                                                </td>
                                                <td
                                                    className="col-3 col-lg-2 d-flex justify-content-center py-3 py-md-4">

                                                        <span>Liens des réunions</span>
                                                </td>
                                                <td
                                                    className="col-3 col-lg-2 d-flex justify-content-center py-3 py-md-4">
                                                    <span>Liens des réunions, logo, couleurs</span>
                                                </td>
                                            </tr>
                                            <tr className="row no-gutters align-items-center border  ">
                                                <th className="col-12 col-lg-4  py-3 py-md-4">
                                                    <div
                                                        className="d-flex align-items-center justify-content-center justify-content-lg-start">
                                                        <h6 className="mb-0 ml-lg-4">Partage des salons</h6>
                                                    </div>
                                                </th>
                                                <td className="col-3 col-lg-2 d-flex justify-content-center py-3 py-md-4 ">
                                                    <div className="rounded-circle-alt">
                                                        <img
                                                            src={danger}
                                                            alt=" icon=" className="m-2 icon icon-sm"/>
                                                    </div>


                                                </td>
                                                <td className="col-3 col-lg-2 d-flex justify-content-center py-3 py-md-4">
                                                    <div className="text-center" >
                                                        <div>
                                                            <span>Les audioconférences peuvent être enregistrés</span>
                                                        </div>
                                                        <div>
                                                            <span>(illimitées)</span>
                                                        </div>
                                                    </div>

                                                </td>
                                                <td
                                                    className="col-3 col-lg-2 d-flex justify-content-center py-3 py-md-4">

                                                    <span className="text-center">Salons d’équipe, salons individuels limités </span>
                                                </td>
                                                <td
                                                    className="col-3 col-lg-2 d-flex justify-content-center py-3 py-md-4">
                                                    <span className="text-center">Salons d'équipe, salons individuels illimités</span>
                                                </td>
                                            </tr>



                                            </tbody>
                                        </table>
                                        <table className="mt-5 table table-striped table table-borderless text-center text-lg-left">
                                            <div className="row no-gutters">
                                                <div className="col">
                                                    <h5 className="mb-4">Webinaires</h5>
                                                </div>
                                            </div>
                                            <tbody  className="border rounded">
                                            <tr className="row no-gutters align-items-center border  ">
                                                <th className="col-12 col-lg-4  py-3 py-md-4">
                                                    <div
                                                        className="d-flex align-items-center justify-content-center justify-content-lg-start">
                                                        <h6 className="mb-0 ml-lg-4">Personnalisation</h6>

                                                    </div>
                                                </th>
                                                <td className="col-3 col-lg-2 d-flex justify-content-center py-3 py-md-4 ">
                                                    <div className="rounded-circle-alt">
                                                        <img
                                                            src={danger}
                                                            alt=" icon=" className="m-2 icon icon-sm"/>
                                                    </div>
                                                </td>
                                                <td className="col-3 col-lg-2 d-flex justify-content-center py-3 py-md-4">
                                                    <div className="rounded-circle-alt">
                                                        <img
                                                            src={danger}
                                                            alt=" icon=" className="m-2 icon icon-sm"/>
                                                    </div>



                                                </td>
                                                <td
                                                    className="col-3 col-lg-2 d-flex justify-content-center py-3 py-md-4">

                                                    <span className="text-center">200</span>
                                                </td>
                                                <td
                                                    className="col-3 col-lg-2 d-flex justify-content-center py-3 py-md-4">
                                                    <span className="text-center">200</span>
                                                </td>
                                            </tr>
                                            <tr className="row no-gutters align-items-center border  ">
                                                <th className="col-12 col-lg-4  py-3 py-md-4">
                                                    <div
                                                        className="d-flex align-items-center justify-content-center justify-content-lg-start">
                                                        <h6 className="mb-0 ml-lg-4">Planifications</h6>
                                                        <img className="ml-2" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAABmJLR0QA/wD/AP+gvaeTAAABI0lEQVQ4jZ3TvUoDQRTF8V/s/ErAUrQQIbWvIib6AtqIYGMQk15738BaGyvBwtrCJFr5AKmMtlFsEotdZV33Y+KBCzPMmT93DnMryrWAlXg9wCjgzh/V0EEfk1T10UY1FLaDtwxQul7RLIMdYxwA+64xWkWdTQNLQhtpWC1+QtaFMyxjCbv4yPAMpTLt5MCuY+MN7rGO0xxvOwl8zDHd4SKxP8B2jrf3DVsMzGqENZwXZDkP9UDgPjbwWeCphwJvMYvnEl899MmH2Czx/DyZ7BFL1hMeSjxdmImBl4r1IPo2RbpKbqryP/YEe6JJyjt/EUX3S03/H72tvLZbU0LHOCqJQkM0m2WwYVFnaVVFs9nLAHVxIiMzqATA57Aarwd4LzJ/AfE47X+DOjxOAAAAAElFTkSuQmCC"/>
                                                    </div>
                                                </th>
                                                <td className="col-3 col-lg-2 d-flex justify-content-center py-3 py-md-4 ">
                                                    <div className="rounded-circle-alt">
                                                        <img
                                                            src={danger}
                                                            alt=" icon=" className="m-2 icon icon-sm"/>
                                                    </div>
                                                </td>
                                                <td className="col-3 col-lg-2 d-flex justify-content-center py-3 py-md-4">
                                                    <div className="rounded-circle-alt">
                                                        <img
                                                            src={danger}
                                                            alt=" icon=" className="m-2 icon icon-sm"/>
                                                    </div>



                                                </td>
                                                <td
                                                    className="col-3 col-lg-2 d-flex justify-content-center py-3 py-md-4">

                                                    <span className="text-center">Â l'avance</span>
                                                </td>
                                                <td
                                                    className="col-3 col-lg-2 d-flex justify-content-center py-3 py-md-4">
                                                    <span className="text-center">Â l'avance</span>
                                                </td>
                                            </tr>
                                            <tr className="row no-gutters align-items-center border  ">
                                                <th className="col-12 col-lg-4  py-3 py-md-4">
                                                    <div
                                                        className="d-flex align-items-center justify-content-center justify-content-lg-start">
                                                        <h6 className="mb-0 ml-lg-4">Messagerie instantannée</h6>
                                                    </div>
                                                </th>
                                                <td className="col-3 col-lg-2 d-flex justify-content-center py-3 py-md-4 ">
                                                    <div className="rounded-circle-alt">
                                                        <img
                                                            src={danger}
                                                            alt=" icon=" className="m-2 icon icon-sm"/>
                                                    </div>
                                                </td>
                                                <td className="col-3 col-lg-2 d-flex justify-content-center py-3 py-md-4">
                                                    <div className="rounded-circle-alt">
                                                        <img
                                                            src={danger}
                                                            alt=" icon=" className="m-2 icon icon-sm"/>
                                                    </div>



                                                </td>
                                                <td
                                                    className="col-3 col-lg-2 d-flex justify-content-center py-3 py-md-4">

                                                    <div className="rounded-circle-alt">
                                                        <img
                                                            src={check}
                                                            alt=" icon=" className="m-2 icon icon-sm"/>
                                                    </div>
                                                </td>
                                                <td
                                                    className="col-3 col-lg-2 d-flex justify-content-center py-3 py-md-4">
                                                    <div className="rounded-circle-alt">
                                                        <img
                                                            src={check}
                                                            alt=" icon=" className="m-2 icon icon-sm"/>
                                                    </div>
                                                </td>
                                            </tr>
                                            <tr className="row no-gutters align-items-center border  ">
                                                <th className="col-12 col-lg-4  py-3 py-md-4">
                                                    <div
                                                        className="d-flex align-items-center justify-content-center justify-content-lg-start">
                                                        <h6 className="mb-0 ml-lg-4">Partage d'ecran</h6>
                                                    </div>
                                                </th>
                                                <td className="col-3 col-lg-2 d-flex justify-content-center py-3 py-md-4 ">
                                                    <div className="rounded-circle-alt">
                                                        <img
                                                            src={danger}
                                                            alt=" icon=" className="m-2 icon icon-sm"/>
                                                    </div>
                                                </td>
                                                <td className="col-3 col-lg-2 d-flex justify-content-center py-3 py-md-4">
                                                    <div className="rounded-circle-alt">
                                                        <img
                                                            src={danger}
                                                            alt=" icon=" className="m-2 icon icon-sm"/>
                                                    </div>



                                                </td>
                                                <td
                                                    className="col-3 col-lg-2 d-flex justify-content-center py-3 py-md-4">

                                                    <div className="rounded-circle-alt">
                                                        <img
                                                            src={check}
                                                            alt=" icon=" className="m-2 icon icon-sm"/>
                                                    </div>

                                                </td>
                                                <td
                                                    className="col-3 col-lg-2 d-flex justify-content-center py-3 py-md-4">
                                                    <div className="rounded-circle-alt">
                                                        <img
                                                            src={check}
                                                            alt=" icon=" className="m-2 icon icon-sm"/>
                                                    </div>

                                                </td>
                                            </tr>




                                            </tbody>
                                        </table>
                                        <table className="mt-5 table table-striped table table-borderless text-center text-lg-left">
                                            <div className="row no-gutters">
                                                <div className="col">
                                                    <h5 className="mb-4">Autres</h5>
                                                </div>
                                            </div>
                                            <tbody  className="border rounded">
                                            <tr className="row no-gutters align-items-center border  ">
                                                <th className="col-12 col-lg-4  py-3 py-md-4">
                                                    <div
                                                        className="d-flex align-items-center justify-content-center justify-content-lg-start">
                                                        <h6 className="mb-0 ml-lg-4">Account manager</h6>
                                                        <img className="ml-2" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAABmJLR0QA/wD/AP+gvaeTAAABI0lEQVQ4jZ3TvUoDQRTF8V/s/ErAUrQQIbWvIib6AtqIYGMQk15738BaGyvBwtrCJFr5AKmMtlFsEotdZV33Y+KBCzPMmT93DnMryrWAlXg9wCjgzh/V0EEfk1T10UY1FLaDtwxQul7RLIMdYxwA+64xWkWdTQNLQhtpWC1+QtaFMyxjCbv4yPAMpTLt5MCuY+MN7rGO0xxvOwl8zDHd4SKxP8B2jrf3DVsMzGqENZwXZDkP9UDgPjbwWeCphwJvMYvnEl899MmH2Czx/DyZ7BFL1hMeSjxdmImBl4r1IPo2RbpKbqryP/YEe6JJyjt/EUX3S03/H72tvLZbU0LHOCqJQkM0m2WwYVFnaVVFs9nLAHVxIiMzqATA57Aarwd4LzJ/AfE47X+DOjxOAAAAAElFTkSuQmCC"/>
                                                    </div>
                                                </th>
                                                <td className="col-3 col-lg-2 d-flex justify-content-center py-3 py-md-4 ">
                                                    <div className="rounded-circle-alt">
                                                        <img
                                                            src={danger}
                                                            alt=" icon=" className="m-2 icon icon-sm"/>
                                                    </div>
                                                </td>
                                                <td className="col-3 col-lg-2 d-flex justify-content-center py-3 py-md-4">
                                                    <div className="rounded-circle-alt">
                                                        <img
                                                            src={danger}
                                                            alt=" icon=" className="m-2 icon icon-sm"/>
                                                    </div>



                                                </td>
                                                <td
                                                    className="col-3 col-lg-2 d-flex justify-content-center py-3 py-md-4">


                                                        <span>🧔 Dédié</span>

                                                </td>
                                                <td
                                                    className="col-3 col-lg-2 d-flex justify-content-center py-3 py-md-4">

                                                        <span>🧔Dédié</span>

                                                </td>
                                            </tr>
                                            <tr className="row no-gutters align-items-center border  ">
                                                <th className="col-12 col-lg-4  py-3 py-md-4">
                                                    <div
                                                        className="d-flex align-items-center justify-content-center justify-content-lg-start">
                                                        <h6 className="mb-0 ml-lg-4">Support dédié</h6>
                                                        <img className="ml-2" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAABmJLR0QA/wD/AP+gvaeTAAABI0lEQVQ4jZ3TvUoDQRTF8V/s/ErAUrQQIbWvIib6AtqIYGMQk15738BaGyvBwtrCJFr5AKmMtlFsEotdZV33Y+KBCzPMmT93DnMryrWAlXg9wCjgzh/V0EEfk1T10UY1FLaDtwxQul7RLIMdYxwA+64xWkWdTQNLQhtpWC1+QtaFMyxjCbv4yPAMpTLt5MCuY+MN7rGO0xxvOwl8zDHd4SKxP8B2jrf3DVsMzGqENZwXZDkP9UDgPjbwWeCphwJvMYvnEl899MmH2Czx/DyZ7BFL1hMeSjxdmImBl4r1IPo2RbpKbqryP/YEe6JJyjt/EUX3S03/H72tvLZbU0LHOCqJQkM0m2WwYVFnaVVFs9nLAHVxIiMzqATA57Aarwd4LzJ/AfE47X+DOjxOAAAAAElFTkSuQmCC"/>
                                                    </div>
                                                </th>
                                                <td className="col-3 col-lg-2 d-flex justify-content-center py-3 py-md-4 ">
                                                    <div className="rounded-circle-alt">
                                                        <img
                                                            src={danger}
                                                            alt=" icon=" className="m-2 icon icon-sm"/>
                                                    </div>
                                                </td>
                                                <td className="col-3 col-lg-2 d-flex justify-content-center py-3 py-md-4">
                                                    <span>🚀 Prioritaire</span>



                                                </td>
                                                <td
                                                    className="col-3 col-lg-2 d-flex justify-content-center py-3 py-md-4">

                                                    <span>🚀 Prioritaire</span>
                                                </td>
                                                <td
                                                    className="col-3 col-lg-2 d-flex justify-content-center py-3 py-md-4">
                                                    <span>🚀 Prioritaire</span>
                                                </td>
                                            </tr>
                                            <tr className="row no-gutters align-items-center border  ">
                                                <th className="col-12 col-lg-4  py-3 py-md-4">
                                                    <div
                                                        className="d-flex align-items-center justify-content-center justify-content-lg-start">
                                                        <h6 className="mb-0 ml-lg-4">Sécurité</h6>
                                                        <img className="ml-2" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAABmJLR0QA/wD/AP+gvaeTAAABI0lEQVQ4jZ3TvUoDQRTF8V/s/ErAUrQQIbWvIib6AtqIYGMQk15738BaGyvBwtrCJFr5AKmMtlFsEotdZV33Y+KBCzPMmT93DnMryrWAlXg9wCjgzh/V0EEfk1T10UY1FLaDtwxQul7RLIMdYxwA+64xWkWdTQNLQhtpWC1+QtaFMyxjCbv4yPAMpTLt5MCuY+MN7rGO0xxvOwl8zDHd4SKxP8B2jrf3DVsMzGqENZwXZDkP9UDgPjbwWeCphwJvMYvnEl899MmH2Czx/DyZ7BFL1hMeSjxdmImBl4r1IPo2RbpKbqryP/YEe6JJyjt/EUX3S03/H72tvLZbU0LHOCqJQkM0m2WwYVFnaVVFs9nLAHVxIiMzqATA57Aarwd4LzJ/AfE47X+DOjxOAAAAAElFTkSuQmCC"/>
                                                    </div>
                                                </th>
                                                <td className="col-3 col-lg-2 d-flex justify-content-center py-3 py-md-4 ">
                                                    <span>Standart</span>
                                                </td>
                                                <td className="col-3 col-lg-2 d-flex justify-content-center py-3 py-md-4">
                                                    <span>🔒 SSL 256 bits</span>



                                                </td>
                                                <td
                                                    className="col-3 col-lg-2 d-flex justify-content-center py-3 py-md-4">

                                                    <span>🔒 SSL 256 bits</span>
                                                </td>
                                                <td
                                                    className="col-3 col-lg-2 d-flex justify-content-center py-3 py-md-4">
                                                    <span>🔒 SSL 256 bits</span>
                                                </td>
                                            </tr>
                                            <tr className="row no-gutters align-items-center border  ">
                                                <th className="col-12 col-lg-4  py-3 py-md-4">
                                                    <div
                                                        className="d-flex align-items-center justify-content-center justify-content-lg-start">
                                                        <h6 className="mb-0 ml-lg-4">SLA garanti</h6>
                                                        <img className="ml-2" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAABmJLR0QA/wD/AP+gvaeTAAABI0lEQVQ4jZ3TvUoDQRTF8V/s/ErAUrQQIbWvIib6AtqIYGMQk15738BaGyvBwtrCJFr5AKmMtlFsEotdZV33Y+KBCzPMmT93DnMryrWAlXg9wCjgzh/V0EEfk1T10UY1FLaDtwxQul7RLIMdYxwA+64xWkWdTQNLQhtpWC1+QtaFMyxjCbv4yPAMpTLt5MCuY+MN7rGO0xxvOwl8zDHd4SKxP8B2jrf3DVsMzGqENZwXZDkP9UDgPjbwWeCphwJvMYvnEl899MmH2Czx/DyZ7BFL1hMeSjxdmImBl4r1IPo2RbpKbqryP/YEe6JJyjt/EUX3S03/H72tvLZbU0LHOCqJQkM0m2WwYVFnaVVFs9nLAHVxIiMzqATA57Aarwd4LzJ/AfE47X+DOjxOAAAAAElFTkSuQmCC"/>
                                                    </div>
                                                </th>
                                                <td className="col-3 col-lg-2 d-flex justify-content-center py-3 py-md-4 ">
                                                    <span className="text-center">99.0%</span>
                                                </td>
                                                <td className="col-3 col-lg-2 d-flex justify-content-center py-3 py-md-4">
                                                    <span className="text-center">99.0%</span>



                                                </td>
                                                <td
                                                    className="col-3 col-lg-2 d-flex justify-content-center py-3 py-md-4">

                                                    <span>📝 99.5 %</span>

                                                </td>
                                                <td
                                                    className="col-3 col-lg-2 d-flex justify-content-center py-3 py-md-4">
                                                    <span>📝 99.98 %</span>

                                                </td>
                                            </tr>




                                            </tbody>
                                        </table>





                                    </div>
                                </div>
                            </section>
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
                    </div>
                </div>


            </div >


        )
    }


}


export default forfait;