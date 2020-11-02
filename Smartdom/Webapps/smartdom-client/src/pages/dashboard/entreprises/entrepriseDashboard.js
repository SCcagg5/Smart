import React, {Component, Suspense} from "react";
import Loader from "../../../components/Loader";
import PieCustomShape from "../../../components/PieCustomShape";
import moment from "moment";
import augmCapitalService from "../../../provider/augmCapitalService";
import france from "../../../assets/images/flags/france.png";
import suisse from "../../../assets/images/flags/suisse.png";
import tunisie from "../../../assets/images/flags/tunisie.png";
import {Container} from "reactstrap";
const Topbar = React.lazy(() => import("../../../components/Topbar"));
const Navbar = React.lazy(() => import("../../../components/Navbar"));
const loading = () => <Loader/>;

class entrepriseDashboard extends Component {

    constructor(props) {
        super(props);
        this.state = {
            loading:false,
            isMenuOpened: false,
            activeMenuItem: 'item-gestion',
            loadingBSADoc:false,
            entreprise:''
        };
    }

    changeActivePage = (page) => event => {
        if (page !== '') {
            this.setState({
                activePage: page
            })
        }
    };




    componentWillMount() {
        if (this.props.location.state === null || this.props.location.state === undefined) {
            this.props.history.goBack();
        } else {
            this.setState({entreprise: this.props.location.state.entreprise})
        }
    }

    showDocument = (key) => event => {
        this.setState({loading:true});
        let uid = this.props.location.state.entreprise.uniqueId;
        augmCapitalService.getDocAugmCapitalTunisie(uid,key).then( res => {

            const file = new Blob(
                [res],
                {type: 'application/pdf'});
            const fileURL = URL.createObjectURL(file);
            window.open(fileURL);
            this.setState({loading:false});

        },err => {
            console.log(err);
        })
    };

    showBSADocument = (actiokey,titreKey,opKey,type)  => event => {
        this.setState({loadingBSADoc:true});
        let uid = this.props.location.state.entreprise.uniqueId;
        let typeActio = "";
        if(type === "Personne physique"){
            typeActio = "Personnephysique"
        }else{
            typeActio = "Personnemoral"
        }
        augmCapitalService.getBSADoc(uid,actiokey,typeActio,titreKey,opKey).then( res => {

            const file = new Blob(
                [res],
                {type: 'application/pdf'});
            const fileURL = URL.createObjectURL(file);
            window.open(fileURL);
            this.setState({loadingBSADoc:false});

        },err => {
            console.log(err);
        })
    };

    render() {
        const {entreprise} = this.state;
        const filiales = entreprise.filiales || [];
        const transactions = entreprise.cessionAction || [];
        const actionnaires = (entreprise.sActionnairePhy || []).concat(entreprise.sActionnaireMoral || []);
        const actionnairesPhys = entreprise.sActionnairePhy || [];
        const actionnairesMorals = entreprise.sActionnaireMoral || [];

        const augmCapiatl = entreprise.augmentationcapital || [];
        let actionsDistr = 0;
        let repCapital = [];
        actionnaires.map((item, key) => {
            actionsDistr += parseInt(item.nbActions);
            repCapital.push({
                name: item.firstname + ' ' + item.lastname,
                value: parseInt(item.nbActions)
            })
        });
        let repActifs = [
            {
                name: 'Actions simples',
                value: 150
            },
            {
                name: 'Actions préférentielles',
                value: 350
            },
            {
                name: 'BSA',
                value: 200
            },
            {
                name: 'BSPCE',
                value: 300
            }
        ];

        return (
            <div className="app center-menu">
                <header id="topnav">
                    <Suspense fallback={loading()}>
                        <Topbar changeActivePage={this.changeActivePage}/>
                        <Navbar isMenuOpened={this.state.isMenuOpened}
                                activeItem={this.state.activeMenuItem} changeActivePage={this.changeActivePage}/>
                    </Suspense>
                </header>

                <div className="wrapper">
                    <Container fluid>
                        <Suspense fallback={loading()}>
                            {this.state.loading && <Loader/>}

                            <div className="row" style={{marginTop: 20}}>
                                <div className="col-sm-6 col-md-4 col-lg-3">
                                    <i className="mdi mdi-arrow-left-circle" onClick={()=> this.props.history.goBack()}
                                       style={{color: "cornflowerblue", fontSize: 28, cursor: "pointer"}}>
                                        <h5 style={{cursor: 'auto'}}>Entreprise: {entreprise.sName}</h5>
                                    </i>
                                </div>
                            </div>

                            <div className="row">
                                <div className="col-md-3">
                                    <div className="card-box bg-pattern">
                                        <div className="row">
                                            <div className="col-6">
                                                <div className="avatar-md bg-danger rounded-circle">
                                                    <i className="fe-users avatar-title font-22 text-white"></i>
                                                </div>
                                            </div>
                                            <div className="col-6">
                                                <div className="text-right">
                                                    <h3 className="text-dark my-1"><span
                                                        data-plugin="counterup">{parseInt(entreprise.nbActPhys) + parseInt(entreprise.nbActMorales)} </span>
                                                    </h3>
                                                    <p className="text-muted mb-0 text-truncate text-uppercase">Actionnaires</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="col-md-3">
                                    <div className="card-box bg-pattern">
                                        <div className="row">
                                            <div className="col-6">
                                                <div className="avatar-md bg-soft-warning rounded-circle">
                                                    <i className="fe-pie-chart avatar-title font-22 text-white"></i>
                                                </div>
                                            </div>
                                            <div className="col-6">
                                                <div className="text-right">
                                                    <h3 className="text-dark my-1"><span
                                                        data-plugin="counterup">{actionsDistr} </span></h3>
                                                    <p className="text-muted mb-0 text-truncate text-uppercase">Actions
                                                        distribuées</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="col-md-3">
                                    <div className="card-box bg-pattern">
                                        <div className="row">
                                            <div className="col-6">
                                                <div className="avatar-md bg-pink rounded-circle">
                                                    <i className="fe-bar-chart-line- avatar-title font-22 text-white"></i>
                                                </div>
                                            </div>
                                            <div className="col-6">
                                                <div className="text-right">
                                                    <h3 className="text-dark my-1"><span
                                                        data-plugin="counterup">{entreprise.sCapital.montant} </span></h3>
                                                    <p className="text-muted mb-0 text-truncate text-uppercase">Capital social</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                </div>

                                <div className="col-md-3">
                                    <div className="card-box bg-pattern">
                                        <div className="row">
                                            <div className="col-6">
                                                <div className="avatar-md bg-soft-blue rounded-circle">
                                                    <i className="fe-percent avatar-title font-22 text-white"></i>
                                                </div>
                                            </div>
                                            <div className="col-6">
                                                <div className="text-right">
                                                    <h3 className="text-dark my-1"><span
                                                        data-plugin="counterup">{parseInt(entreprise.sCapital.montant)/parseInt(entreprise.sCapital.minValActions)}&nbsp;€</span>
                                                    </h3>
                                                    <p className="text-muted mb-0 text-truncate text-uppercase">Prix de l'action</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                </div>

                            </div>

                            {
                                filiales.length > 0 &&
                                <div className="row" style={{marginTop:35}}>
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
                                                                {/*<th>Détail</th>
                                                <th>Action</th>*/}
                                                            </tr>
                                                            </thead>
                                                            <tbody>
                                                            {
                                                                filiales.map((item,key) => (
                                                                    <tr>
                                                                        <td>{item.sName}</td>
                                                                        <td>{item.sBut}</td>
                                                                        <td><span className="badge bg-soft-warning text-warning p-1">{item.representant}</span></td>
                                                                        <td>
                                                                            <img src={item.sSiege.pays === "France" ? france : item.sSiege.pays === "Suisse" ? suisse : tunisie}
                                                                                 alt="society-flags" height="24" />
                                                                        </td>
                                                                        <td>{item.sSiege.adress+', '+item.sSiege.postalCode+' ,'+item.sSiege.pays}</td>
                                                                        <td className="text-center"><span className="badge bg-soft-info text-info p-1">{item.nbActPhys}</span></td>
                                                                        <td className="text-center"><span className="badge bg-soft-info text-info p-1">{item.nbActMorales}</span></td>
                                                                        <td className="text-center">{item.expertSmartCo === "true" ? 'Oui' : 'Non'}</td>
                                                                        <td><span className="badge bg-soft-danger text-danger p-1">{item.sCapital.montant}</span></td>
                                                                        {/*<td className="text-center">
                                                            <div style={{cursor:'pointer'}} className="btn btn-xs btn-cancel"
                                                                 data-toggle="tooltip" title="Détails" onClick={showDetail(item)}>
                                                                <i style={{color:'red',fontSize:18}} className="fe-zoom-in"></i>
                                                            </div>
                                                        </td>
                                                        <td className="text-center">
                                                            <div style={{cursor:'pointer'}} className="btn btn-xs btn-cancel"
                                                                 data-toggle="tooltip" title="Sélectionner une opération" onClick={showOperations(item)}>
                                                                <i style={{color:'blue',fontSize:18}} className="fe-plus-square"></i>
                                                            </div>
                                                        </td>*/}
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
                                            <div className="card-widgets">
                                                {/*<div style={{cursor:'pointer'}}  onClick={this.refrech} data-toggle="reload"><i className="mdi mdi-refresh"></i></div>*/}
                                            </div>
                                            <h4 className="header-title mb-0">Table de capitalisation</h4>

                                            <div id="cardCollpase4" className="collapse pt-3 show">
                                                <div className="table-responsive">
                                                    <table className="table table-centered table-borderless mb-0">
                                                        <thead className="thead-light">
                                                        <tr>
                                                            <th>Actionnaire</th>
                                                            <th>Type</th>
                                                            <th>Nationnalité</th>
                                                            <th className="text-center">Actions détenues</th>
                                                            <th className="text-center">Actions détenues (%)</th>
                                                            <th>Détails</th>
                                                        </tr>
                                                        </thead>
                                                        <tbody>
                                                        {
                                                            actionnaires.map((item, key) => (
                                                                <tr>
                                                                    <td>{item.firstname + ' ' + item.lastname}</td>
                                                                    <td><span
                                                                        className="badge bg-soft-blue text-blue p-1">{item.type} </span>
                                                                    </td>
                                                                    <td>{item.nationality}</td>
                                                                    <td className="text-center"><span
                                                                        className="badge bg-soft-danger text-danger p-1">{item.nbActions} </span>
                                                                    </td>
                                                                    <td className="text-center">{((parseInt(item.nbActions) / parseInt(entreprise.sCapital.montant)) * 100).toFixed(2)}&nbsp;%</td>
                                                                    <td className="text-center">
                                                                        {/*<div style={{cursor:'pointer'}} className="btn btn-xs btn-cancel"
                                                                             data-toggle="tooltip" title="D��tails" onClick={showDetailActionnaire(item)}>
                                                                            <i style={{color:'red',fontSize:18}} className="fe-zoom-in"></i>
                                                                        </div>*/}
                                                                        <div style={{cursor:'pointer'}} className="btn btn-xs btn-cancel"
                                                                             data-toggle="tooltip" title="Détails">
                                                                            <i style={{color:'red',fontSize:18}} className="fe-zoom-in"></i>
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

                            <div className="row" style={{marginTop: 35}}>
                                <div className="col-12">
                                    <div className="card">
                                        <div className="card-body">
                                            <div className="card-widgets">
                                                {/*<div style={{cursor:'pointer'}}  onClick={this.refrech} data-toggle="reload"><i className="mdi mdi-refresh"></i></div>*/}
                                            </div>
                                            <h4 className="header-title mb-0">Augmentation de capital</h4>

                                            <div id="cardCollpase4" className="collapse pt-3 show">
                                                <div className="table-responsive">
                                                    <table className="table table-centered table-borderless mb-0">
                                                        <thead className="thead-light">
                                                        <tr>
                                                            <th>Date</th>
                                                            <th>Type</th>
                                                            <th>Actions émis</th>
                                                            <th className="text-uppercase">à</th>
                                                            <th className="text-center">Agio</th>
                                                            <th>Document</th>
                                                        </tr>
                                                        </thead>
                                                        <tbody>
                                                        {
                                                            augmCapiatl.map((item, key) => (

                                                                <tr>
                                                                    <td>{moment(item.dateCreation).format("DD-MM-YYYY HH:mm")}</td>
                                                                    <td><span
                                                                        className="badge bg-soft-blue text-blue p-1">{ item.To[0].typeAction} </span>
                                                                    </td>
                                                                    <td>{item.nbNewActEmis}</td>
                                                                    <td>
                                                                        {
                                                                            (item.To || []).map((actio,key2)=>(
                                                                                <div>
                                                                    <span className="badge bg-soft-dark text-dark p-1">
                                                                        { actio.actioMail} </span></div>
                                                                            ))
                                                                        }
                                                                    </td>
                                                                    <td className="text-center"><span
                                                                        className="badge bg-soft-danger text-danger p-1">{item.agio} </span>
                                                                    </td>

                                                                    <td className="text-center">
                                                                        <div style={{cursor:'pointer'}} className="btn btn-xs btn-cancel"
                                                                             data-toggle="tooltip" title="Détails" onClick={this.showDocument(key)}>
                                                                            <i style={{color:'red',fontSize:18}} className="mdi mdi-file-pdf"></i>
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
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="row" style={{marginTop: 35}}>
                                <div className="col-12">
                                    <div className="card">
                                        <div className="card-body">
                                            <div className="card-widgets">
                                                {/*<div style={{cursor:'pointer'}}  onClick={this.refrech} data-toggle="reload"><i className="mdi mdi-refresh"></i></div>*/}
                                            </div>
                                            {this.state.loadingBSADoc && <Loader/>}
                                            <h4 className="header-title mb-0">Emission des titres</h4>

                                            <div id="cardCollpase4" className="collapse pt-3 show">
                                                <div className="table-responsive">
                                                    <table className="table table-centered table-borderless mb-0">
                                                        <thead className="thead-light">
                                                        <tr>
                                                            <th>Date d'éxecution</th>
                                                            <th>Date de levée d'option</th>
                                                            <th>Vers</th>
                                                            <th className="text-center">Type</th>
                                                            <th className="text-center">Quantité</th>
                                                            <th className="text-center">Document</th>
                                                        </tr>
                                                        </thead>
                                                        <tbody>
                                                        {
                                                            actionnairesPhys.map((item,actiokey) => (

                                                                (item.titresBSA || []).map((titreBSA,titreKey) => (

                                                                    (titreBSA.operations || []).map((op,opKey) => (

                                                                        <tr>
                                                                            <td>{moment(op.dateMAJ).format("DD-MM-YYYY HH:mm")}</td>
                                                                            <td>
                                                            <span className="badge bg-soft-danger text-danger p-1">
                                                            {moment(op.dateLeveeOption).format("DD-MM-YYYY HH:mm")}
                                                            </span>
                                                                            </td>
                                                                            <td>{item.firstname+" "+item.lastname}</td>
                                                                            <td className="text-center"><span
                                                                                className="badge bg-soft-info text-info p-1">{"BSA"} </span>
                                                                            </td>
                                                                            <td className="text-center">
                                                            <span className="badge bg-soft-dark text-dark p-1">
                                                                 {op.nb}
                                                            </span>
                                                                            </td>

                                                                            <td className="text-center">
                                                                                <div style={{cursor:'pointer'}} className="btn btn-xs btn-cancel"
                                                                                     data-toggle="tooltip" title="Détails"
                                                                                     onClick={this.showBSADocument(actiokey,titreKey,opKey,item.type)}>
                                                                                    <i style={{color:'red',fontSize:18}} className="mdi mdi-file-pdf"></i>
                                                                                </div>
                                                                            </td>
                                                                        </tr>
                                                                    ))
                                                                ))

                                                            ))

                                                        }
                                                        {
                                                            actionnairesMorals.map((item, actiokey) => (

                                                                (item.titresBSA || []).map((titreBSA,titreKey) => (

                                                                    (titreBSA.operations || []).map((op,opKey) => (

                                                                        <tr>
                                                                            <td>{moment(op.dateMAJ).format("DD-MM-YYYY HH:mm")}</td>
                                                                            <td>
                                                            <span className="badge bg-soft-danger text-danger p-1">
                                                            {moment(op.dateLeveeOption).format("DD-MM-YYYY HH:mm")}
                                                            </span>
                                                                            </td>
                                                                            <td>{item.firstname+" "+item.lastname}</td>
                                                                            <td className="text-center"><span
                                                                                className="badge bg-soft-info text-info p-1">{"BSA"} </span>
                                                                            </td>
                                                                            <td className="text-center">
                                                            <span className="badge bg-soft-dark text-dark p-1">
                                                                 {op.nb}
                                                            </span>
                                                                            </td>

                                                                            <td className="text-center">
                                                                                <div style={{cursor:'pointer'}} className="btn btn-xs btn-cancel"
                                                                                     data-toggle="tooltip" title="Détails"
                                                                                     onClick={this.showBSADocument(actiokey,titreKey,opKey,item.type)}>
                                                                                    <i style={{color:'red',fontSize:18}} className="mdi mdi-file-pdf"></i>
                                                                                </div>
                                                                            </td>
                                                                        </tr>
                                                                    ))
                                                                ))

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

                            <div className="row" style={{marginTop:35}}>
                                <div className="col-12">
                                    <div className="card">
                                        <div className="card-body">
                                            <div className="card-widgets">
                                                {/*<div style={{cursor:'pointer'}}  onClick={this.refrech} data-toggle="reload"><i className="mdi mdi-refresh"></i></div>*/}
                                            </div>
                                            <h4 className="header-title mb-0">Registre et mouvement de titres</h4>

                                            <div id="cardCollpase4" className="collapse pt-3 show">
                                                <div className="table-responsive">
                                                    <table className="table table-centered table-borderless mb-0">
                                                        <thead className="thead-light">
                                                        <tr>
                                                            <th>Numéro</th>
                                                            <th>Status</th>
                                                            <th>Type de titre</th>
                                                            <th>Date</th>
                                                            <th>Quantité</th>
                                                            <th>De</th>
                                                            <th>A</th>
                                                            <th>Détail</th>
                                                        </tr>
                                                        </thead>
                                                        <tbody>
                                                        {
                                                            transactions.map((item,key) => (
                                                                item.numero = Math.floor(Math.random() * 100),
                                                                    item.dateCreation = '22 septembre 2019',
                                                                    <tr>
                                                                        <td>{item.numero}</td>
                                                                        <td><span className="badge bg-soft-danger text-danger p-1">{'Cession'}</span></td>
                                                                        <td ><span className="badge bg-soft-info text-info p-1">{'Action simple'}</span></td>
                                                                        <td>{item.dateCreation}</td>
                                                                        <td>{'+'+item.droitSociauxCedes.nbActionCedes}</td>
                                                                        <td>{item.cedant.nomPrenom}</td>
                                                                        <td>{item.cessionnaire.nomPrenom}</td>
                                                                        <td className="text-center">
                                                                            {/*<div style={{cursor:'pointer'}} className="btn btn-xs btn-cancel"
                                                                                 data-toggle="tooltip" title="Détails" onClick={showTransaction(item)}>
                                                                                <i style={{color:'red',fontSize:18}} className="fe-zoom-in"></i>
                                                                            </div>*/}
                                                                            <div style={{cursor:'pointer'}} className="btn btn-xs btn-cancel"
                                                                                 data-toggle="tooltip" title="Détails">
                                                                                <i style={{color:'red',fontSize:18}} className="fe-zoom-in"></i>
                                                                            </div>
                                                                        </td>
                                                                    </tr>
                                                            ))
                                                        }
                                                        </tbody>
                                                    </table>
                                                </div>
                                                {
                                                    transactions.length === 0 &&
                                                    <h6>Pas de résultats</h6>
                                                }
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="row">
                                <div className="col-lg-6">
                                    <div className="card">
                                        <div className="card-body">
                                            <div className="card-widgets">
                                            </div>
                                            <h4 className="header-title mb-0">Répartition du capital</h4>

                                            <div>
                                                <PieCustomShape capitalRepData={repCapital} fillcolor="secondary"/>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="col-lg-6">
                                    <div className="card">
                                        <div className="card-body">
                                            <div className="card-widgets">
                                            </div>
                                            <h4 className="header-title mb-0">Répartition des actifs</h4>

                                            <div>
                                                <PieCustomShape capitalRepData={repActifs} fillcolor="primary"/>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>


                        </Suspense>
                    </Container>
                </div>




            </div>
        )
    }

}

export default entrepriseDashboard;