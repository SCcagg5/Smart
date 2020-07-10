import React, {Component, Suspense} from "react";
import 'bootstrap/dist/css/bootstrap.min.css';


import "firebase/database";
import 'firebase/storage';

import 'react-phone-input-2/lib/style.css'

import MySnackbarContentWrapper from "../../tools/customSnackBar";
import Snackbar from "@material-ui/core/Snackbar";
import moment from "moment";
import "moment/locale/fr"
import Loader from "../../components/Loader";

import  check from "../../assets/images/forfait/check-success.svg"
import danger from "../../assets/images/forfait/x-danger.svg"

import {Button as ButtonS} from 'primereact/button';































const Topbar = React.lazy(() => import("../../components/Topbar"));
const loading = () => <Loader/>;

moment.locale('fr');



class forfaitComptaEnfin extends Component {



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





            <div  className="bg-white" style={{width:"100%"}}>


                <header id="topnav">
                    <Suspense fallback={loading()}>
                        <Topbar changeActivePage={this.changeActivePage}/>
                    </Suspense>
                </header>
                <div className="wrapper bg-white " style={{backgroundColor:"white"}}>
                    <div className="container-fluid bg-white" >
                        <Suspense fallback={loading()}>
                            {this.state.loading && <Loader/>}



                            <div>

                                <section className="pt-5 ">
                                    <div className="container">
                                        <div className="row justify-content-end align-items-end sticky-top   bg-white " style={{top:"9%"}}  >
                                            <div className="col-lg-2 col-3 col-sm-3 py-3 py-md-4 border-bottom">
                                                <div className="d-flex flex-column align-items-center text-center">
                                                    <div >
                                                        <h6 className="font-weight-bold" style={{fontSize:"1.5vw"}} >Logiciel only</h6>
                                                    </div>
                                                    <div className="d-flex align-items-center justify-content-center mb-1">
                                                        <span style={{fontSize:"0.8vw"}}  className="h5 mb-0 mr-1 mr-sm-2">CHF</span>
                                                        <span style={{fontSize:"3vw"}}className="display-4 mb-0 text-dark font-weight-bold">29</span>
                                                    </div>
                                                    <div style={{fontSize:"1"}}  className="text-small mb-3 mb-md-4">par mois</div>

                                                    <ButtonS style={{fontSize:"1vw" , color:"#0035d4", borderColor:"#0035d4"}} label="inscrivez-vous" className="p-button-rounded btn-block bg-white"/>

                                                </div>
                                            </div>
                                            <div className="col-lg-2 col-3 col-sm-3 py-3 py-md-4 border-bottom">
                                                <div className="d-flex flex-column align-items-center text-center">
                                                    <div >
                                                        <h6 className="font-weight-bold" style={{fontSize:"1.5vw"}} >Expertise comptable</h6>
                                                    </div>
                                                    <div className="d-flex align-items-center justify-content-center mb-1">
                                                        <span style={{fontSize:"0.8vw"}}  className="h5 mb-0 mr-1 mr-sm-2">CHF</span>
                                                        <span style={{fontSize:"3vw"}}className="display-4 mb-0 text-dark font-weight-bold">199</span>
                                                    </div>
                                                    <div style={{fontSize:"1"}}  className="text-small mb-3 mb-md-4">par mois</div>

                                                        <ButtonS style={{fontSize:"1vw" , backgroundColor:"#0035d4"}} label="inscrivez-vous" className="p-button-rounded btn-block"/>

                                                </div>
                                            </div>
                                            <div className="col-lg-2 col-3 col-sm-3 py-3 py-md-4 border-bottom">
                                                <div className="d-flex flex-column align-items-center text-center">
                                                    <div >
                                                        <h6 className="font-weight-bold" style={{fontSize:"1.5vw"}} >EC & Fiscaliste</h6>
                                                    </div>
                                                    <div className="d-flex align-items-center justify-content-center mb-1">
                                                        <span style={{fontSize:"0.8vw"}}  className="h5 mb-0 mr-1 mr-sm-2">CHF</span>
                                                        <span style={{fontSize:"3vw"}}className="display-4 mb-0 text-dark font-weight-bold">299</span>
                                                    </div>
                                                    <div style={{fontSize:"1"}}  className="text-small mb-3 mb-md-4">par mois</div>

                                                    <ButtonS style={{fontSize:"1vw" , backgroundColor:"#0035d4"}} label="inscrivez-vous" className="p-button-rounded btn-block"/>

                                                </div>
                                            </div>
                                            <div className="col-lg-2 col-3 col-sm-3 py-3 py-md-4 border-bottom">
                                                <div className="d-flex flex-column align-items-center text-center">
                                                    <div >
                                                        <h6 className="font-weight-bold" style={{fontSize:"1.27vw"}} >EC & Fiscaliste & Administrateur </h6>
                                                    </div>
                                                    <div className="d-flex align-items-center justify-content-center mb-1">
                                                        <span style={{fontSize:"0.8vw"}}  className="h5 mb-0 mr-1 mr-sm-2">CHF</span>
                                                        <span style={{fontSize:"3vw"}}className="display-4 mb-0 text-dark font-weight-bold">450</span>
                                                    </div>
                                                    <div style={{fontSize:"1"}}  className="text-small mb-3 mb-md-4">par mois</div>

                                                    <ButtonS style={{fontSize:"1vw",backgroundColor:"#0035d4"}} label="inscrivez-vous" className="p-button-rounded btn-block"/>

                                                </div>
                                            </div>


                                        </div>
                                        <div className="mt-5">
                                            <table className="mt-5 table table-striped table table-borderless text-center text-lg-left">
                                                <div className="row no-gutters">
                                                    <div className="col">
                                                        <h5 className="mb-4">Soft</h5>
                                                    </div>
                                                </div>
                                                <tbody  className="border rounded">

                                                <tr className="row no-gutters align-items-center border">
                                                    <th className="col-12 col-lg-4  py-3 py-md-4">
                                                        <div
                                                            className="d-flex align-items-center justify-content-center justify-content-lg-start">
                                                            <h6 className="mb-0 ml-lg-4">Nombre d’utilisateurs </h6>
                                                            <img className="ml-2" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAABmJLR0QA/wD/AP+gvaeTAAABI0lEQVQ4jZ3TvUoDQRTF8V/s/ErAUrQQIbWvIib6AtqIYGMQk15738BaGyvBwtrCJFr5AKmMtlFsEotdZV33Y+KBCzPMmT93DnMryrWAlXg9wCjgzh/V0EEfk1T10UY1FLaDtwxQul7RLIMdYxwA+64xWkWdTQNLQhtpWC1+QtaFMyxjCbv4yPAMpTLt5MCuY+MN7rGO0xxvOwl8zDHd4SKxP8B2jrf3DVsMzGqENZwXZDkP9UDgPjbwWeCphwJvMYvnEl899MmH2Czx/DyZ7BFL1hMeSjxdmImBl4r1IPo2RbpKbqryP/YEe6JJyjt/EUX3S03/H72tvLZbU0LHOCqJQkM0m2WwYVFnaVVFs9nLAHVxIiMzqATA57Aarwd4LzJ/AfE47X+DOjxOAAAAAElFTkSuQmCC"/>
                                                        </div>
                                                        <div className="d-flex align-items-center justify-content-center justify-content-lg-start">
                                                            <small className="mb-0 ml-lg-4" style={{color:"#b3b3b3"}}>Sur la partie Soft </small>
                                                        </div>
                                                    </th>
                                                    <td
                                                        className="col-3 col-lg-2 d-flex justify-content-center py-3 py-md-4">
                                                        <span>1</span>
                                                    </td>

                                                    <td
                                                        className="col-3 col-lg-2 d-flex justify-content-center py-3 py-md-4">
                                                        <span>3</span>
                                                    </td>
                                                    <td
                                                        className="col-3 col-lg-2 d-flex justify-content-center py-3 py-md-4">
                                                        <span>10</span>
                                                    </td>
                                                    <td
                                                        className="col-3 col-lg-2 d-flex justify-content-center py-3 py-md-4">
                                                        <span>25</span>
                                                    </td>
                                                </tr>



                                                </tbody>
                                            </table>
                                            <table className="mt-5 table table-striped table table-borderless text-center text-lg-left">
                                                <div className="row no-gutters">
                                                    <div className="col">
                                                        <h5 className="mb-4">Opérations comptables par la fiduciaire partenaire </h5>
                                                    </div>
                                                </div>
                                                <tbody  className="border rounded">
                                                <tr className="row no-gutters align-items-center border  ">
                                                    <th className="col-12 col-lg-4  py-3 py-md-4">
                                                        <div
                                                            className="d-flex align-items-center justify-content-center justify-content-lg-start">
                                                            <h6 className="mb-0 ml-lg-4">Tenu comptable  </h6>
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
                                                        <div className="container ">
                                                            <div className="text-center">
                                                                <span>sous les 250 ecritures par an </span>
                                                            </div>
                                                            <div className="text-center mt-1">
                                                                <small style={{color:"#999999"}}>+ CHF 5 /écriture au dessus</small>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td
                                                        className="col-3 col-lg-2 d-flex justify-content-center py-3 py-md-4">
                                                        <div className="container ">
                                                            <div className="text-center">
                                                                <span>sous les 500 ecritures par an </span>
                                                            </div>
                                                            <div className="text-center mt-1">
                                                                <small style={{color:"#999999"}}>+ CHF 5 /écriture au dessus</small>
                                                            </div>
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
                                                            <h6 className="mb-0 ml-lg-4">Module TVA</h6>
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
                                                            <h6 className="mb-0 ml-lg-4">Outil de facturation </h6>
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
                                                            <h6 className="mb-0 ml-lg-4">Bilan Comptable et liasse fiscale </h6>
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
                                                            <h6 className="mb-0 ml-lg-4">Expert comptable dédié  </h6>
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
                                                            <h6 className="mb-0 ml-lg-4">Grands livres  </h6>
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
                                                <tr className="row no-gutters align-items-center border">
                                                    <th className="col-12 col-lg-4  py-3 py-md-4">
                                                        <div
                                                            className="d-flex align-items-center justify-content-center justify-content-lg-start">
                                                            <h6 className="mb-0 ml-lg-4">Compte bancaire  </h6>
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
                                                        <h5 className="mb-4">Fiscaliste</h5>
                                                    </div>
                                                </div>
                                                <tbody  className="border rounded">
                                                <tr className="row no-gutters align-items-center border  ">
                                                    <th className="col-12 col-lg-4  py-3 py-md-4">
                                                        <div
                                                            className="d-flex align-items-center justify-content-center justify-content-lg-start">
                                                            <h6 className="mb-0 ml-lg-4">Fiscaliste Suisse
                                                            </h6>
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
                                                            <h6 className="mb-0 ml-lg-4"> Fiscalistes France et Suisse </h6>
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
                                                </tr>



                                                </tbody>
                                            </table>
                                            <table className="mt-5 table table-striped table table-borderless text-center text-lg-left">
                                                <div className="row no-gutters">
                                                    <div className="col">
                                                        <h5 className="mb-4">Administrateur</h5>
                                                    </div>
                                                </div>
                                                <tbody  className="border rounded">
                                                <tr className="row no-gutters align-items-center border  ">
                                                    <th className="col-12 col-lg-4  py-3 py-md-4">
                                                        <div
                                                            className="d-flex align-items-center justify-content-center justify-content-lg-start">
                                                            <h6 className="mb-0 ml-lg-4">Administrateur</h6>

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


export default forfaitComptaEnfin;
