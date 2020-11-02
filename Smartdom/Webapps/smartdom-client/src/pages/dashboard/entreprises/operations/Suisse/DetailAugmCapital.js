import React, {Component, Suspense} from "react";
import Loader from "../../../../../components/Loader";
import augmCapitalService from "../../../../../provider/augmCapitalService";
import {Container} from "reactstrap";
import moment from "moment";

const Topbar = React.lazy(() => import("../../../../../components/Topbar"));
const Navbar = React.lazy(() => import("../../../../../components/Navbar"));
const loading = () => <Loader/>;


class DetailAugmCapital extends Component {

    constructor(props) {
        super(props);
        this.state = {
            loading:false,
            isMenuOpened: false,
            activeMenuItem: 'item-gestion',
            entreprise:this.props.location.state.entreprise,
            augmCapital:this.props.location.state.entreprise.augmCapital[this.props.location.state.entreprise.augmCapital.length -1],
            numAugm:this.props.location.state.entreprise.augmCapital.length -1
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
        }
    }

    showSARLStatutAugmDocument = (key) => event => {
        this.setState({loading:true});
        let uid = this.props.location.state.entreprise.uniqueId;
        augmCapitalService.getSARLStatut_Augm(uid,key).then( res => {
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

    showSARLRapportAugmDocument = (key) => event => {
        this.setState({loading:true});
        let uid = this.props.location.state.entreprise.uniqueId;
        augmCapitalService.getSARLrapport_Augm(uid,key).then( res => {
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

    showSARLDeclarationAugmDocument = (key) => event => {
        this.setState({loading:true});
        let uid = this.props.location.state.entreprise.uniqueId;
        augmCapitalService.getSARLDeclarationAugm(uid,key).then( res => {
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

    showSARLRequisistionAugmDocument = (key) => event => {
        this.setState({loading:true});
        let uid = this.props.location.state.entreprise.uniqueId;
        augmCapitalService.getSARLrequisitionAugm(uid,key).then( res => {
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

    showSARLPvAGEAugmDocument = (key) => event => {
        this.setState({loading:true});
        let uid = this.props.location.state.entreprise.uniqueId;
        augmCapitalService.getSARLPvAGEAugm(uid,key).then( res => {
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

    showSARLBulletinSouscripDocument = (key) => event => {
        this.setState({loading:true});
        let uid = this.props.location.state.entreprise.uniqueId;
        augmCapitalService.getSARLBulletinSouscripAugm(uid,this.state.numAugm,key).then( res => {
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

    render() {

        const {entreprise} = this.state;
        const actionnaires = (entreprise.sAssociate || []);
        let actionsDistr = 0;
        let associesPhy = 0;
        let associesInv = 0;
        actionnaires.map((item, key) => {
            item.ej_name === "" ? associesPhy += 1 : associesInv += 1;
            actionsDistr += parseInt(item.nbActions);
        });

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
                                        <h5 style={{cursor: 'auto'}}>Augmentation du capital du :
                                            {moment(this.state.augmCapital.dateCreation).format("DD MMMM YYYY")}</h5>
                                    </i>
                                </div>
                            </div>

                            <div className="row mt-2">
                                <div className="col-md-3">
                                    <div className="card-box bg-pattern" style={{height:160}}>
                                        <div className="row">
                                            <div className="col-4">
                                                <div className="avatar-md bg-danger rounded-circle">
                                                    <i className="fe-book avatar-title font-20 text-white"/>
                                                </div>
                                            </div>
                                            <div className="col-8">
                                                <div className="text-right">
                                                    <h3 className="text-dark my-1 mb-3"><span
                                                        data-plugin="counterup">{this.state.augmCapital.agio} </span>
                                                    </h3>
                                                    <p className="text-muted mb-1 text-uppercase font-weight-bold">Agio d'émission</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="col-md-3">
                                    <div className="card-box bg-pattern" style={{height:160}}>
                                        <div className="row">
                                            <div className="col-4">
                                                <div className="avatar-md bg-soft-warning rounded-circle">
                                                    <i className="fe-bar-chart-line avatar-title font-20 text-white"/>
                                                </div>
                                            </div>
                                            <div className="col-8">
                                                <div className="text-right">
                                                    <h3 className="text-dark my-1 mb-3">
                                                        {this.state.augmCapital.nbNewActEmis + " actions"}
                                                    </h3>
                                                    <p className="text-muted mb-1 text-uppercase font-weight-bold">Actions nouvelles émis</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="col-md-3">
                                    <div className="card-box bg-pattern" style={{height:160}}>
                                        <div className="row">
                                            <div className="col-4">
                                                <div className="avatar-md bg-soft-blue rounded-circle">
                                                    <i className="fe-dollar-sign avatar-title font-22 text-white"/>
                                                </div>
                                            </div>
                                            <div className="col-8">
                                                <div className="text-right">
                                                    <h3 className="text-dark my-1 mb-3"><span
                                                        data-plugin="counterup">{this.state.augmCapital.oldCapital + " CHF"} </span></h3>
                                                    <p className="text-muted mb-1 font-weight-bold text-uppercase">Ancien Capital</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                </div>

                                <div className="col-md-3">
                                    <div className="card-box bg-pattern" style={{height:160}}>
                                        <div className="row">
                                            <div className="col-4">
                                                <div className="avatar-md bg-pink rounded-circle">
                                                    <i className="fe-dollar-sign avatar-title font-20 text-white"/>
                                                </div>
                                            </div>
                                            <div className="col-8">
                                                <div className="text-right">
                                                    <h3 className="text-dark my-1 mb-3"><span
                                                        data-plugin="counterup">{this.state.augmCapital.newCapital + " CHF"} </span>
                                                    </h3>
                                                    <p className="text-muted mb-1 font-weight-bold text-uppercase">Nouveau Capital</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                </div>

                            </div>

                            <div className="row mt-2">
                                <div className="col-12">
                                    <div className="card">
                                        <div className="card-body">
                                            <div className="card-widgets"/>
                                            <h5 className="font-weight-bold">Associés inclus dans l'augmentation du capital</h5>

                                             <div id="cardCollpase4" className="collapse pt-3 show">
                                                <div className="table-responsive">
                                                    <table className="table table-centered table-borderless mb-0">
                                                        <thead className="thead-light">
                                                        <tr>
                                                            <th className="text-center">Associé</th>
                                                            <th className="text-center">Nouvelles Actions détenues</th>
                                                            <th className="text-center">Prix nominal</th>
                                                            <th className="text-center">Documents</th>
                                                        </tr>
                                                        </thead>
                                                        <tbody>
                                                        {
                                                            (this.state.augmCapital.to || []).map((item, key) => (

                                                                <tr>
                                                                    <td>
                                                                        <h5 style={{color:"#000"}}>
                                                                            {item.associe.ej_name === "" ? item.associe.firstname+" "+item.associe.lastname :
                                                                                item.associe.ej_name}
                                                                        </h5>

                                                                    </td>
                                                                    <td align="center">
                                                                        <span className="badge bg-soft-blue text-blue p-1 font-16">
                                                                            {item.newActionsEmis + " actions"}
                                                                        </span>
                                                                    </td>
                                                                    <td align="center">
                                                                        <span className="badge bg-soft-danger text-danger p-1 font-14">
                                                                            {this.state.augmCapital.prixNominal+" CHF"}
                                                                        </span>
                                                                    </td>
                                                                    <td align="center">
                                                                        <div style={{cursor:'pointer'}} data-toggle="tooltip"
                                                                             title="Détails" onClick={this.showSARLBulletinSouscripDocument(key)}>
                                                                            <i style={{color:'red',fontSize:24}} className="mdi mdi-file-pdf"/>
                                                                            <p style={{color:"#000"}}>Bulletin de souscription</p>
                                                                        </div>
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

                            <div className="row mt-2">
                                <div className="col-12">
                                    <div className="card">
                                        <div className="card-body">
                                            <div className="card-widgets"/>
                                            <h5 className="font-weight-bold">Documents</h5>

                                            <div className="row">
                                               <div className="col-md-3">
                                                   <div align="center" style={{cursor:'pointer'}} data-toggle="tooltip"
                                                        title="Détails" onClick={this.showSARLStatutAugmDocument(this.state.numAugm)}>
                                                       <i style={{color:'red',fontSize:32}} className="mdi mdi-file-pdf"/>
                                                       <p style={{color:"#000"}}>Statut</p>
                                                   </div>
                                               </div>
                                                <div className="col-md-3">
                                                    <div align="center" style={{cursor:'pointer'}} data-toggle="tooltip"
                                                         title="Détails" onClick={this.showSARLRapportAugmDocument(this.state.numAugm)}>
                                                        <i style={{color:'red',fontSize:32}} className="mdi mdi-file-pdf"/>
                                                        <p style={{color:"#000"}}>Rapport d'augmentation</p>
                                                    </div>
                                                </div>
                                                <div className="col-md-3">
                                                    <div align="center" style={{cursor:'pointer'}} data-toggle="tooltip"
                                                         title="Détails" onClick={this.showSARLPvAGEAugmDocument(this.state.numAugm)}>
                                                        <i style={{color:'red',fontSize:32}} className="mdi mdi-file-pdf"/>
                                                        <p style={{color:"#000"}}>Pv AGE</p>
                                                    </div>
                                                </div>
                                                <div className="col-md-3">
                                                    <div align="center" style={{cursor:'pointer'}} data-toggle="tooltip"
                                                         title="Détails" onClick={this.showSARLDeclarationAugmDocument(this.state.numAugm)}>
                                                        <i style={{color:'red',fontSize:32}} className="mdi mdi-file-pdf"/>
                                                        <p style={{color:"#000"}}>DéclarationI,II</p>
                                                    </div>
                                                </div>
                                                <div className="col-md-3">
                                                    <div align="center" style={{cursor:'pointer'}} data-toggle="tooltip"
                                                         title="Détails" onClick={this.showSARLRequisistionAugmDocument(this.state.numAugm)}>
                                                        <i style={{color:'red',fontSize:32}} className="mdi mdi-file-pdf"/>
                                                        <p style={{color:"#000"}}>Réquisition</p>
                                                    </div>
                                                </div>

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

export default DetailAugmCapital;