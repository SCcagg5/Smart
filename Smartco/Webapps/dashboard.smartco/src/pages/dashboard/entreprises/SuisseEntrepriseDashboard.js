import React, {Component, Suspense} from "react";
import Loader from "../../../components/Loader";
import PieCustomShape from "../../../components/PieCustomShape";
import moment from "moment";
import augmCapitalService from "../../../provider/augmCapitalService";
import france from "../../../assets/images/flags/france.png";
import suisse from "../../../assets/images/flags/suisse.png";
import tunisie from "../../../assets/images/flags/tunisie.png";
import {Button, Container} from "reactstrap";
import {Doughnut} from 'react-chartjs-2';
import {Bar} from 'react-chartjs-2';
import pdfImage from "../../../assets/images/pdfimage.jpg";
import signQlogo from "../../../assets/canton-GE.png";
import entrepriseSARLService from "../../../provider/entrepriseSARLService";
import firebase from "firebase";
import MySnackbarContentWrapper from "../../../tools/customSnackBar";
import Snackbar from "@material-ui/core/Snackbar";
import Chart from "react-apexcharts";
import {Line} from 'react-chartjs-2';
import TopBar from "../../../components/TopBar/TopBar";
import logo from "../../../assets/images/logos/logoSmartCo.jpeg";
import SideMenu from "../../../components/SideMenu/SideMenu";
import data from "../../../data/data";
import SideBar from "../../../components/SideBar/SideBar";
import ReactLoading from "react-loading";



class SuisseEntrepriseDashboard extends Component {

    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            selectedSieMenuItem: "soc",
            openSideMenu: false,
            showSecondSideBar: false,
            openAlert: false,
            alertMessage: "",
            alertType: "",
            loadingBSADoc: false,
            entreprise: this.props.location.state.entreprise,


        }
    }

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


    componentDidMount() {
        if (this.props.location.state === null || this.props.location.state === undefined) {
            this.props.history.goBack();
        } else {
            firebase.database().ref('/users/' + localStorage.getItem("uid")).on('value', (snapshot) => {
                let user = snapshot.val();
                this.setState({
                    userGId: user.idGeneve,
                    userGFirstname: user.firstnameG,
                    userGLastname: user.lastnameG
                })
            });
        }
    }

    showSARLStatutAugmDocument = (key) => event => {
        this.setState({loading: true});
        let uid = this.props.location.state.entreprise.uniqueId;
        augmCapitalService.getSARLStatut_Augm(uid, key).then(res => {
            const file = new Blob(
                [res],
                {type: 'application/pdf'});
            const fileURL = URL.createObjectURL(file);
            window.open(fileURL);
            this.setState({loading: false});
        }, err => {
            console.log(err);
        })
    };

    showSARLRapportAugmDocument = (key) => event => {
        this.setState({loading: true});
        let uid = this.props.location.state.entreprise.uniqueId;
        augmCapitalService.getSARLrapport_Augm(uid, key).then(res => {
            const file = new Blob(
                [res],
                {type: 'application/pdf'});
            const fileURL = URL.createObjectURL(file);
            window.open(fileURL);
            this.setState({loading: false});
        }, err => {
            console.log(err);
        })
    };

    showSARLDeclarationAugmDocument = (key) => event => {
        this.setState({loading: true});
        let uid = this.props.location.state.entreprise.uniqueId;
        augmCapitalService.getSARLDeclarationAugm(uid, key).then(res => {
            const file = new Blob(
                [res],
                {type: 'application/pdf'});
            const fileURL = URL.createObjectURL(file);
            window.open(fileURL);
            this.setState({loading: false});
        }, err => {
            console.log(err);
        })
    };

    showSARLRequisistionAugmDocument = (key) => event => {
        this.setState({loading: true});
        let uid = this.props.location.state.entreprise.uniqueId;
        augmCapitalService.getSARLrequisitionAugm(uid, key).then(res => {
            const file = new Blob(
                [res],
                {type: 'application/pdf'});
            const fileURL = URL.createObjectURL(file);
            window.open(fileURL);
            this.setState({loading: false});
        }, err => {
            console.log(err);
        })
    };

    showSARLPvAGEAugmDocument = (key) => event => {
        this.setState({loading: true});
        let uid = this.props.location.state.entreprise.uniqueId;
        augmCapitalService.getSARLPvAGEAugm(uid, key).then(res => {
            const file = new Blob(
                [res],
                {type: 'application/pdf'});
            const fileURL = URL.createObjectURL(file);
            window.open(fileURL);
            this.setState({loading: false});
        }, err => {
            console.log(err);
        })
    };

    showTransformationDoc = (key) => event => {
        this.setState({loading: true});
        let uid = this.props.location.state.entreprise.uniqueId;
        entrepriseSARLService.generateTransformationAugmDoc(uid, key).then(res => {
            const file = new Blob(
                [res],
                {type: 'application/pdf'});
            const fileURL = URL.createObjectURL(file);
            window.open(fileURL);
            this.setState({loading: false});
        }, err => {
            console.log(err);
        })
    };

    signDocWithGeneve = (name) => event => {
        this.setState({loading: true});
        entrepriseSARLService.getDocSARLDocDigest("statut", localStorage.getItem("uid") + "Suisse", "Suisse").then(res => {
            console.log(res);
            entrepriseSARLService.loginGeneve().then(auth => {
                console.log("OK22 " + auth.data.jwt);
                console.log(this.state.userGFirstname);
                console.log(this.state.userGId);
                console.log(this.state.userGLastname);
                entrepriseSARLService.signGeneveDoc(name + "-SARLAugm-" + moment().format("HH-ss"), res.digest, auth.data.jwt, this.state.userGId, this.state.userGFirstname, this.state.userGLastname).then(r => {
                    console.log("OK3" + r);
                    if (r.succes === true) {
                        if (r.data.SignatureResponse.ipfsHash !== null && r.data.SignatureResponse.ipfsHash !== undefined) {
                            if (name === "Transformation") {
                                firebase.database().ref('society/' + localStorage.getItem("uid" + "Suisse")).update({
                                    'ipfsHashTransformation': r.data.SignatureResponse.ipfsHash
                                }).then(data => {
                                    this.setState({loadingBtnStatut: false});
                                    this.openSnackbar('success', "La signature est bien acceptée");
                                }).catch(function (error) {
                                    alert(error);
                                });
                            }
                        } else {
                            this.setState({loading: false});
                            this.openSnackbar('error', "Signature non acceptée");
                        }
                    } else {
                        this.setState({loading: false});
                        this.openSnackbar('error', "Une erreur est survenue !");
                    }

                }).catch(err => {
                    this.setState({loading: false});
                    this.openSnackbar('error', "Une erreur est survenue !");
                    console.log(err);
                })

            }).catch(err => {
                this.setState({loading: false});
                this.openSnackbar('error', "Une erreur est survenue !");
                console.log(err);
            });

        }).catch(err => {
            this.setState({loading: false})
            this.openSnackbar('error', "Une erreur est survenue !");
            console.log(err);
        })

    };

    render() {
        const {entreprise} = this.state;
        let augmCapital = entreprise.augmCapital || [];

        let labels = [moment(entreprise.dateCreation).subtract(15, 'day').format("DD MMM YYYY"),
            moment(entreprise.dateCreation).format('DD MMM YYYY')];
        let capitals = [0, parseInt(entreprise.sCapital.capitalHistory[0].nbActions) * parseInt(entreprise.sCapital.capitalHistory[0].nominalValue)];
        augmCapital.map((item, key) => {
            labels.push(moment(item.dateCreation).format("DD MMM YYYY"));
            capitals.push(parseInt(item.newCapital));
        });
        let progressionCapital = {
            labels: labels,
            datasets: [
                {
                    label: 'Capital Social',
                    backgroundColor: 'rgba(255,99,132,0.2)',
                    borderColor: 'rgba(255,99,132,1)',
                    borderWidth: 1,
                    hoverBackgroundColor: 'rgba(255,99,132,0.4)',
                    hoverBorderColor: 'rgba(255,99,132,1)',
                    data: capitals
                }
            ]
        };

        let repCapital = {
            labels: [],
            datasets: [{
                data: [],
                backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#e91e63', '#9c27b0', '#00bcd4', '#607d8b', '#3f51b5'],
                hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#e91e63', '#9c27b0', '#00bcd4', '#607d8b', '#3f51b5']
            }]
        };
        let repActifs = {
            labels: ["Associés", "Investisseurs"],
            datasets: [{
                data: [],
                backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#e91e63', '#9c27b0', '#00bcd4', '#607d8b', '#3f51b5'],
                hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#e91e63', '#9c27b0', '#00bcd4', '#607d8b', '#3f51b5']
            }]
        };

        const filiales = entreprise.filiales || [];
        const actionnaires = (entreprise.sAssociate || []);
        let actionsDistr = 0;
        let associesPhy = 0;
        let associesInv = 0;
        actionnaires.map((item, key) => {
            item.ej_name === "" ? associesPhy += 1 : associesInv += 1;
            actionsDistr += parseInt(item.nbActions);
            repCapital.labels.push((item.firstname === "" && item.lastname === "") ? item.ej_name : item.firstname + ' ' + item.lastname);
            repCapital.datasets[0].data.push(parseInt(item.nbActions));
        });
        repActifs.datasets[0].data.push(associesPhy, associesInv);

        return (
            <div>
                <TopBar logo={logo} height={90} onClickMenuIcon={() => this.setState({openSideMenu: true})}/>
                <SideMenu logo={logo} items={data.sideBarItems} iconColor={"blue"} textColor={"#65728E"}
                          history={this.props.history}
                          opened={this.state.openSideMenu} onClose={() => this.setState({openSideMenu: false})}/>
                <SideBar items={data.sideBarItems} width={100} selectedItem={this.state.selectedSieMenuItem}
                         activeColor={"blue"} disabledColor={"#65728E"}
                         updateSelected={(item) => this.setState({selectedSieMenuItem: item})}
                         history={this.props.history}/>

                {
                    this.state.loading === true ?
                        <div className="centered-text">
                            <ReactLoading type={"bars"} color={"red"}/>
                        </div> :

                        <div style={{paddingLeft:"10%",marginRight:50,marginTop:50}}>

                            <div className="row" style={{marginTop: 20}}>
                                <div className="col-sm-6 col-md-4 col-lg-3">
                                    <i className="mdi mdi-arrow-left-circle" onClick={() => this.props.history.goBack()}
                                       style={{color: "cornflowerblue", fontSize: 28, cursor: "pointer"}}>
                                        <h5 style={{cursor: 'auto'}}>Entreprise: {entreprise.sName}</h5>
                                    </i>
                                </div>
                            </div>

                            <div className="row">
                                <div className="col-md-3">
                                    <div className="card-box bg-pattern" style={{height: 160}}>
                                        <div className="row">
                                            <div className="col-4">
                                                <div className="avatar-md bg-danger rounded-circle">
                                                    <i className="fe-users avatar-title font-22 text-white"/>
                                                </div>
                                            </div>
                                            <div className="col-8">
                                                <div className="text-right">
                                                    <h3 className="text-dark my-1 mb-3"><span
                                                        data-plugin="counterup">{parseInt(entreprise.sAssociate.length)} </span>
                                                    </h3>
                                                    <p className="text-muted mb-1 text-uppercase font-weight-bold">Associés</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="col-md-3">
                                    <div className="card-box bg-pattern" style={{height: 160}}>
                                        <div className="row">
                                            <div className="col-4">
                                                <div className="avatar-md bg-soft-warning rounded-circle">
                                                    <i className="fe-pie-chart avatar-title font-22 text-white"/>
                                                </div>
                                            </div>
                                            <div className="col-8">
                                                <div className="text-right">
                                                    <h3 className="text-dark my-1 mb-3"><span
                                                        data-plugin="counterup">{parseInt(entreprise.sCapital.totalNbActions)} </span>
                                                    </h3>
                                                    <p className="text-muted mb-1 text-uppercase font-weight-bold">Actions
                                                        distribuées</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="col-md-3">
                                    <div className="card-box bg-pattern" style={{height: 160}}>
                                        <div className="row">
                                            <div className="col-4">
                                                <div className="avatar-md bg-pink rounded-circle">
                                                    <i className="fe-dollar-sign avatar-title font-22 text-white"/>
                                                </div>
                                            </div>
                                            <div className="col-8">
                                                <div className="text-right">
                                                    <h3 className="text-dark my-1 mb-3"><span
                                                        data-plugin="counterup">{entreprise.sCapital.totalCapital + " CHF"} </span>
                                                    </h3>
                                                    <p className="text-muted mb-1 text-uppercase font-weight-bold">Capital
                                                        social</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                </div>

                                <div className="col-md-3">
                                    <div className="card-box bg-pattern" style={{height: 160}}>
                                        <div className="row">
                                            <div className="col-4">
                                                <div className="avatar-md bg-soft-blue rounded-circle">
                                                    <i className="fe-dollar-sign avatar-title font-22 text-white"/>
                                                </div>
                                            </div>
                                            <div className="col-8">
                                                <div className="text-right">
                                                    <h3 className="text-dark my-1 mb-3"><span
                                                        data-plugin="counterup">{entreprise.sCapital.defaultNominalValue}&nbsp;CHF</span>
                                                    </h3>
                                                    <p className="text-muted mb-1 font-weight-bold text-uppercase">Prix
                                                        de l'action</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                </div>

                            </div>

                            {
                                filiales.length > 0 &&
                                <div className="row" style={{marginTop: 35}}>
                                    <div className="col-12">
                                        <div className="card">
                                            <div className="card-body">
                                                <div className="card-widgets">
                                                </div>
                                                <h4 className="header-title mb-0">Entreprises filiales</h4>

                                                <div id="cardCollpase4" className="collapse pt-3 show">
                                                    <div className="table-responsive">
                                                        <table className="table table-centered table-borderless mb-0">
                                                            <thead className="thead-light">
                                                            <tr>
                                                                <th>Nom</th>
                                                                <th>But social</th>
                                                                <th>Représentant</th>
                                                                <th>Pays</th>
                                                                <th>Adresse</th>
                                                                <th>Actinnaires physiques</th>
                                                                <th>Actionnaires morales</th>
                                                                <th>Expert SmartCo</th>
                                                                <th>Capital</th>
                                                            </tr>
                                                            </thead>
                                                            <tbody>
                                                            {
                                                                filiales.map((item, key) => (
                                                                    <tr>
                                                                        <td>{item.sName}</td>
                                                                        <td>{item.sBut}</td>
                                                                        <td><span
                                                                            className="badge bg-soft-warning text-warning p-1">{item.representant}</span>
                                                                        </td>
                                                                        <td>
                                                                            <img
                                                                                src={item.sSiege.pays === "France" ? france : item.sSiege.pays === "Suisse" ? suisse : tunisie}
                                                                                alt="society-flags" height="24"/>
                                                                        </td>
                                                                        <td>{item.sSiege.adress + ', ' + item.sSiege.postalCode + ' ,' + item.sSiege.pays}</td>
                                                                        <td className="text-center"><span
                                                                            className="badge bg-soft-info text-info p-1">{item.nbActPhys}</span>
                                                                        </td>
                                                                        <td className="text-center"><span
                                                                            className="badge bg-soft-info text-info p-1">{item.nbActMorales}</span>
                                                                        </td>
                                                                        <td className="text-center">{item.expertSmartCo === "true" ? 'Oui' : 'Non'}</td>
                                                                        <td><span
                                                                            className="badge bg-soft-danger text-danger p-1">{item.sCapital.montant}</span>
                                                                        </td>
                                                                    </tr>
                                                                ))
                                                            }
                                                            </tbody>
                                                        </table>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            }

                            <div className="row" style={{marginTop: 35}}>
                                <div className="col-12">
                                    <div className="card">
                                        <div className="card-body">
                                            <div className="card-widgets"/>
                                            <h4 className="header-title mb-0">Table de capitalisation</h4>

                                            <div id="cardCollpase4" className="collapse pt-3 show">
                                                <div className="table-responsive">
                                                    <table className="table table-centered table-borderless mb-0">
                                                        <thead className="thead-light">
                                                        <tr>
                                                            <th>Associés</th>
                                                            <th>Type</th>
                                                            <th style={{textAlign: "center"}}>Nationnalité</th>
                                                            <th className="text-center">Actions détenues</th>
                                                            <th className="text-center">Actions détenues (%)</th>
                                                            <th>Détails</th>
                                                        </tr>
                                                        </thead>
                                                        <tbody>
                                                        {
                                                            actionnaires.map((item, key) => (
                                                                <tr>
                                                                    <td>{(item.firstname === "" && item.lastname) === "" ? item.ej_name : item.firstname + ' ' + item.lastname}</td>
                                                                    <td><span
                                                                        className="badge bg-soft-blue text-blue p-1">{item.type} </span>
                                                                    </td>
                                                                    <td align="center">
                                                                        <img
                                                                            src={(item.nationality === "France" || item.pays === "France") ?
                                                                                france : (item.nationality === "Switzerland" || item.pays === "Switzerland") ? suisse : tunisie}
                                                                            alt="society-flags" height="24"/>
                                                                    </td>
                                                                    <td className="text-center"><span
                                                                        className="badge bg-soft-danger text-danger p-1">{item.nbActions + " actions"} </span>
                                                                    </td>
                                                                    <td className="text-center font-weight-bold"
                                                                        style={{color: "#000"}}>
                                                                        {((parseInt(item.nbActions) / parseInt(entreprise.sCapital.totalNbActions)) * 100).toFixed(2)}&nbsp;%
                                                                    </td>
                                                                    <td className="text-center">
                                                                        <div style={{cursor: 'pointer'}}
                                                                             className="btn btn-xs btn-cancel"
                                                                             data-toggle="tooltip" title="Détails">
                                                                            <i style={{color: 'red', fontSize: 18}}
                                                                               className="fe-zoom-in"></i>
                                                                        </div>
                                                                    </td>
                                                                </tr>
                                                            ))
                                                        }
                                                        </tbody>
                                                    </table>
                                                </div>
                                                {
                                                    actionnaires.length === 0 &&
                                                    <h6>Pas d'actionnaires encore ajoutés</h6>
                                                }
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>


                            {
                                augmCapital.length > 0 &&

                                <div className="row" style={{marginTop: 35}}>
                                    <div className="col-12">
                                        <div className="card">
                                            <div className="card-body">
                                                <div className="card-widgets">
                                                </div>
                                                <span>
                                                <h4 className="header-title mb-0">Derniére Augmentation De Capital</h4>
                                                <i className="mdi mdi-arrow-right-bold-circle text-danger"
                                                   onClick={() => this.props.history.push("/gestion/entreprises/Suisse/Detail", {entreprise: entreprise})}
                                                   style={{fontSize: 35}}/>
                                            </span>
                                                {/* <div id="cardCollpase4" className="collapse pt-3 show">
                                                <div className="table-responsive">
                                                    <table className="table table-centered table-borderless mb-0">
                                                        <thead className="thead-light">
                                                        <tr>
                                                            <th>Date</th>
                                                            <th>Actions émis</th>
                                                            <th className="text-uppercase">Asscociés inclus</th>
                                                            <th className="text-center">Agio</th>
                                                            <th>Document</th>
                                                        </tr>
                                                        </thead>
                                                        <tbody>
                                                        {
                                                            augmCapiatl.map((item, key) => (

                                                                <tr>
                                                                    <td>{moment(item.dateCreation).format("DD MMMM YYYY")}</td>
                                                                    <td>{item.nbNewActEmis + " actions"}</td>
                                                                    <td>
                                                                        {
                                                                            (item.to || []).map((actio,key2)=>(
                                                                                <div>
                                                                                   <span className="badge bg-soft-dark text-dark p-1">
                                                                                         {actio.associe.email}
                                                                                   </span>
                                                                                </div>
                                                                            ))
                                                                        }
                                                                    </td>
                                                                    <td className="text-center"><span
                                                                        className="badge bg-soft-danger text-danger p-1">{item.agio} </span>
                                                                    </td>

                                                                    <td>
                                                                        <div style={{cursor:'pointer'}} className="btn btn-xs btn-cancel"
                                                                             data-toggle="tooltip" title="Détails" onClick={this.showSARLStatutAugmDocument(key)}>
                                                                            <i style={{color:'red',fontSize:30}} className="mdi mdi-file-pdf"/>
                                                                            <p style={{color:"#000"}}>Statut</p>
                                                                        </div>
                                                                        <div style={{cursor:'pointer'}} className="btn btn-xs btn-cancel"
                                                                             data-toggle="tooltip" title="Détails" onClick={this.showSARLRapportAugmDocument(key)}>
                                                                            <i style={{color:'red',fontSize:30}} className="mdi mdi-file-pdf"/>
                                                                            <p style={{color:"#000"}}>Rapport d'augm.</p>
                                                                        </div>
                                                                        <div style={{cursor:'pointer'}} className="btn btn-xs btn-cancel"
                                                                             data-toggle="tooltip" title="Détails" onClick={this.showSARLDeclarationAugmDocument(key)}>
                                                                            <i style={{color:'red',fontSize:30}} className="mdi mdi-file-pdf"/>
                                                                            <p style={{color:"#000"}}>Déclaration I,II</p>
                                                                        </div>
                                                                        <div style={{cursor:'pointer'}} className="btn btn-xs btn-cancel"
                                                                             data-toggle="tooltip" title="Détails" onClick={this.showSARLRequisistionAugmDocument(key)}>
                                                                            <i style={{color:'red',fontSize:30}} className="mdi mdi-file-pdf"/>
                                                                            <p style={{color:"#000"}}>Réqusition</p>
                                                                        </div>
                                                                        <div style={{cursor:'pointer'}} className="btn btn-xs btn-cancel"
                                                                             data-toggle="tooltip" title="Détails" onClick={this.showSARLPvAGEAugmDocument(key)}>
                                                                            <i style={{color:'red',fontSize:30}} className="mdi mdi-file-pdf"/>
                                                                            <p style={{color:"#000"}}>Pv_AGE</p>
                                                                        </div>
                                                                    </td>

                                                                </tr>

                                                            ))
                                                        }
                                                        </tbody>
                                                    </table>
                                                </div>
                                                {
                                                    augmCapiatl.length === 0 &&
                                                    <h6>Pas de résultats</h6>
                                                }
                                            </div>*/}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            }
                            {
                                augmCapital.length > 0 && augmCapital[augmCapital.length - 1] &&

                                <div className="card">
                                    <div className="card-body">
                                        <div className="card-widgets"/>
                                        <div className="row" style={{marginTop: 5}}>
                                            <div className="col-6">
                                                <span>
                                                      <h4 className="header-title mb-0">Rapport de Transformation</h4>
                                                </span>
                                                <div className="row mt-2 ml-2">
                                                    <div className="col-md-12">
                                                        <div>
                                                            <a style={{cursor: 'pointer'}}>
                                                                <img src={pdfImage}
                                                                     style={{maxHeight: 55}}
                                                                     alt="attachment"
                                                                     onClick={this.showTransformationDoc(augmCapital.length - 1)}
                                                                     className="img-thumbnail img-responsive"/>
                                                            </a>
                                                            <p style={{
                                                                fontSize: "x-small",
                                                                marginBottom: "0.2rem"
                                                            }}>Rapport de fondation</p>
                                                            <span className="badge bg-danger text-white"
                                                                  style={{marginTop: -10, cursor: "pointer"}}
                                                                  onClick={() => this.props.history.push("/detailsDoc",
                                                                      {
                                                                          societe: this.state.entreprise,
                                                                          typeDoc: "Transformation",
                                                                          isSignedByAllGerants: this.state.isAllGerantsSign,
                                                                          isSignedByAllAssocies: this.state.isAllAssociesSign
                                                                      })}>
                                                                détails&nbsp;<i
                                                                className="mdi mdi-arrow-right text-white"/></span>

                                                        </div>
                                                    </div>
                                                </div>

                                            </div>
                                            <div className="col-md-6 mt-2">
                                                <div className="col-md-9 mt-3">
                                                    <div className="float-right">
                                                        <img src={signQlogo} alt="qrcode"
                                                             style={{height: 60, width: 60, objectFit: "contain"}}/>
                                                        {
                                                            this.state.entreprise.ipfsHashTransformation ?
                                                                <span className="badge bg-soft-success text-success p-1"
                                                                      style={{
                                                                          marginTop: 10, fontSize: "0.7rem"
                                                                      }}>
                                                            Document signé
                                                        </span> :

                                                                <Button color="primary"
                                                                        onClick={this.signDocWithGeneve("Transformation")}
                                                                        className="btn btn-success waves-effect waves-light">
                                                                    Signer le document<br/>
                                                                </Button>
                                                        }

                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            }


                            <div className="row">
                                <div className="col-lg-6">
                                    <div className="card">
                                        <div className="card-body">
                                            <div className="card-widgets">
                                            </div>
                                            <h4 className="header-title mb-2">Répartition du capital</h4>
                                            <Doughnut data={repCapital} options={{legend: {position: 'right'}}}/>
                                        </div>
                                    </div>
                                </div>

                                <div className="col-lg-6">
                                    <div className="card">
                                        <div className="card-body">
                                            <div className="card-widgets">
                                            </div>
                                            <h4 className="header-title mb-2">Répartition des actifs</h4>
                                            <Doughnut data={repActifs} options={{legend: {position: 'right'}}}/>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="row">
                                <div className="col-lg-12">
                                    <div className="card">
                                        <div className="card-body">
                                            <div className="card-widgets"/>
                                            <h4 className="header-title mb-2">Progression du Capital</h4>
                                            <Bar data={progressionCapital}/>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <Snackbar
                                anchorOrigin={{
                                    vertical: 'bottom',
                                    horizontal: 'left',
                                }}
                                open={this.state.openAlert}
                                onClose={this.closeSnackbar}
                            >
                                <MySnackbarContentWrapper
                                    onClose={this.closeSnackbar}
                                    variant={this.state.alertType}
                                    message={this.state.alertMessage}
                                />
                            </Snackbar>


                        </div>
                }







            </div>
        )
    }

}

export default SuisseEntrepriseDashboard;