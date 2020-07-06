import React, {Component, Suspense} from "react";
import firebase from "firebase/app";
import "firebase/database";
import MySnackbarContentWrapper from "../../../../../../tools/customSnackBar";
import Snackbar from "@material-ui/core/Snackbar";
import { StyledSelectDatepicker, DateContainer } from '../../../../../../customComponents/select-datepicker'
import moment from "moment";
import Loader from "../../../../../../components/Loader";
import augmCapitalService from "../../../../../../provider/augmCapitalService";
import verifForms from "../../../../../../tools/verifForms";
import PopupDate from "../../../../../../components/PopupDate";

const Topbar = React.lazy(() => import("../../../../../../components/Topbar"));
const Navbar = React.lazy(() => import("../../../../../../components/Navbar"));
const loading = () => <Loader/>;



class SarlToSa extends Component {

    state = {
        loading: false,
        isMenuOpened: false,
        activeMenuItem: 'item-gestion',
        openAlert: false,
        alertMessage: '',
        alertType: '',
        selectedPays: 'France',

        entreprise: this.props.location.state.entreprise,
        numAugm:this.props.location.state.entreprise.augmCapital.length -1,
        gerantFname:this.props.location.state.entreprise.sAdministrator[0].firstname+" "+
            this.props.location.state.entreprise.sAdministrator[0].lastname,
        montantActifs:"",
        montantPassifs:"",

        dateTransf: new Date(),
        dateDernierBilan: new Date()
    };

    componentWillMount() {
        if (this.props.location.state === null || this.props.location.state === undefined) {
            this.props.history.goBack();

        } else {
        }
    }

    onDateTransfChange = date => {
        this.setState({
            dateTransf: date
        });
    };

    onDateDernBilanChange = date => {
        this.setState({
            dateTransf: date
        });
    };

    transformSARL = () => {
        this.setState({loading:true});
        firebase.database().ref('society/' + localStorage.getItem('uid') + 'Suisse/augmCapital/'+this.state.numAugm).update({
            'actifValue':this.state.montantActifs,
            'passifValue': this.state.montantPassifs,
            'dateTransf':moment(this.state.dateTransf).format("YYYY-MM-DD"),
            'dateBilan':moment(this.state.dateDernierBilan).format("YYYY-MM-DD")
        });

        setTimeout(() => {
            let uid = this.props.location.state.entreprise.uniqueId;
            augmCapitalService.generateRapportFondation(uid,this.state.numAugm).then( res => {
                const file = new Blob(
                    [res],
                    {type: 'application/pdf'});
                const fileURL = URL.createObjectURL(file);
                window.open(fileURL);
                this.setState({loading:false});
            },err => {
                console.log(err);
            })
        },1000);
    };


    render() {
        let entreprise = this.state.entreprise;
        let augmontant = this.state.entreprise.augmCapital[this.state.entreprise.augmCapital.length - 1].newCapital - this.state.entreprise.augmCapital[this.state.entreprise.augmCapital.length - 1].oldCapital
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
                    {this.state.loading && <Loader/>}
                    <div className="card" style={{marginTop: 25, backgroundColor: "white"}}>
                        <div className="row" style={{marginTop: "1%", alignItems: "baseline"}}>
                            <label style={{fontFamily: 555, fontWeight: "bold", marginLeft: "10%", color: "black"}}>Transformation de SARL en SA</label>
                            <label style={{fontFamily: 555, fontWeight: "normal", marginLeft: "5%"}}>de la société</label>
                            <input type="text" className="form-control" value={this.state.entreprise.sName}
                                   readOnly={true}
                                   style={{width: "30%", marginLeft: "7%", borderRadius: 100}}/>
                        </div>

                        <div>

                            <div className="row mt-3 ml-1 mr-1">
                                <div className="col-md-3">
                                    <div className="card-box bg-pattern" style={{height:160}}>
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
                                    <div className="card-box bg-pattern" style={{height:160}}>
                                        <div className="row">
                                            <div className="col-4">
                                                <div className="avatar-md bg-soft-warning rounded-circle">
                                                    <i className="fe-pie-chart avatar-title font-22 text-white"/>
                                                </div>
                                            </div>
                                            <div className="col-8">
                                                <div className="text-right">
                                                    <h3 className="text-dark my-1 mb-3"><span
                                                        data-plugin="counterup">{parseInt(entreprise.sCapital.totalNbActions)} </span></h3>
                                                    <p className="text-muted mb-1 text-uppercase font-weight-bold">Actions distribuées</p>
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
                                                    <i className="fe-dollar-sign avatar-title font-22 text-white"/>
                                                </div>
                                            </div>
                                            <div className="col-8">
                                                <div className="text-right">
                                                    <h3 className="text-dark my-1 mb-3"><span
                                                        data-plugin="counterup">{entreprise.sCapital.totalCapital + " CHF"} </span></h3>
                                                    <p className="text-muted mb-1 text-uppercase font-weight-bold">Capital social</p>
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
                                                        data-plugin="counterup">{entreprise.sCapital.defaultNominalValue}&nbsp;CHF</span>
                                                    </h3>
                                                    <p className="text-muted mb-1 font-weight-bold text-uppercase">Prix de l'action</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                </div>

                            </div>

                        </div>
                        <div>
                            <div className="row" style={{marginTop: "2%", alignItems: "baseline"}}>

                                <label style={{fontWeight: "bold", marginLeft: "10%", color: "black",width:"20%"}}>Nom du Gérant de la SARL</label>

                                <input type="text" className="form-control"
                                       value={this.state.gerantFname}
                                       onChange={ event => this.setState({gerantFname:event.target.value})}
                                       style={{width: "35%", marginLeft: "7%", borderRadius: 100}}/>
                            </div>
                        </div>
                        <div>
                            <div className="row" style={{marginTop: "1%", alignItems: "baseline"}}>

                                <label style={{fontFamily: 555, fontWeight: "bold", marginLeft: "10%", color: "black",width:"20%"}}>Date de transformation</label>

                                <div style={{marginLeft:"7%"}}>
                                        <PopupDate
                                            showLabels={false}
                                            value={this.state.dateTransf}
                                            onDateChange={ date => {
                                                console.log(date);
                                                this.setState({dateTransf:date})
                                            }}
                                            format='day/month/year'
                                            invalidMessage="Date invalide"
                                        />
                                </div>


                            </div>
                        </div>
                        <div>
                            <div className="row" style={{marginTop: "1%", alignItems: "baseline",}}>


                                <label style={{fontFamily: 555, fontWeight: "bold", marginLeft: "10%", color: "black",width:"20%"}}>Date de dernier bilan</label>
                                <div style={{marginLeft:"7%"}}>
                                        <PopupDate
                                            showLabels={false}
                                            value={this.state.dateDernierBilan}
                                            onDateChange={ date => {
                                                this.setState({dateDernierBilan:date})
                                            }}
                                            format='day/month/year'
                                            invalidMessage="Date invalide"
                                        />
                                </div>


                            </div>
                        </div>

                        <div>
                            <div className="row" style={{marginTop: "1%", alignItems: "baseline",}}>

                                <div style={{marginLeft: "10%",width:"20%"}}>
                                    <div>
                                        <label style={{fontFamily: 555, fontWeight: "bold", color: "black"}}>Montants des actifs</label>
                                    </div>
                                    <div style={{marginTop: "-4%"}}>
                                        <label style={{fontSize: "70%", color: "#cccccc", marginLeft: "7%"}}> En date de dernier bilan</label>
                                    </div>

                                </div>

                                <input type="text" className="form-control"
                                       value={this.state.montantActifs}
                                       onChange={ event => this.setState({montantActifs:event.target.value})}
                                       style={{width: "35%", marginLeft: "7%", borderRadius: 100}}/>
                                <label style={{
                                    fontFamily: 555,
                                    fontWeight: "bold",
                                    color: "black",
                                    marginLeft: "1%"
                                }}>CHF</label>


                            </div>
                        </div>
                        <div>
                            <div className="row" style={{marginTop: "1%", alignItems: "baseline",}}>

                                <div style={{marginLeft: "10%",width:"20%"}}>
                                    <div>
                                        <label style={{fontFamily: 555, fontWeight: "bold", color: "black"}}>Montants
                                            des passifs</label>
                                    </div>
                                    <div style={{marginTop: "-4%"}}>
                                        <label style={{fontSize: "70%", color: "#cccccc", marginLeft: "7%"}}> En date de
                                            dernier bilan</label>
                                    </div>

                                </div>


                                <input type="text" className="form-control"
                                       value={this.state.montantPassifs}
                                       onChange={ event => this.setState({montantPassifs:event.target.value})}
                                       style={{width: "35%", marginLeft: "7%", borderRadius: 100}}/>
                                <label style={{
                                    fontFamily: 555,
                                    fontWeight: "bold",
                                    color: "black",
                                    marginLeft: "1%"
                                }}>CHF</label>


                            </div>
                        </div>
                        <div>
                            <div className="row" style={{marginTop: "1%", alignItems: "baseline",}}>


                                <label style={{fontFamily: 555, fontWeight: "bold", marginLeft: "10%", color: "black",width:"20%"}}>Rappel
                                    montant augumentation de capital</label>

                                <input type="text" className="form-control"
                                       readOnly={true}
                                       value={augmontant}
                                       style={{width: "35%", marginLeft: "7%", borderRadius: 100}}/>
                                <label style={{
                                    fontFamily: 555,
                                    fontWeight: "bold",
                                    color: "black",
                                    marginLeft: "1%"
                                }}>CHF</label>


                            </div>
                        </div>
                        <div style={{marginBottom: "3%"}}>
                            <div className="row" style={{marginTop: "1%", alignItems: "baseline"}}>


                                <label style={{fontFamily: 555, fontWeight: "bold", marginLeft: "10%", color: "black",width:"20%"}}>Passage
                                    du capital de </label>

                                <input type="text" className="form-control"
                                       readOnly={true}
                                       value={this.state.entreprise.augmCapital[this.state.entreprise.augmCapital.length - 1].oldCapital}
                                       style={{width: "15%", marginLeft: "7%", borderRadius: 100}}/>
                                <label style={{fontFamily: 555, fontWeight: "bold", color: "black", marginLeft: "1%"}}>CHF A</label>
                                <input type="text" className="form-control"
                                       readOnly={true}
                                       value={this.state.entreprise.augmCapital[this.state.entreprise.augmCapital.length - 1].newCapital}
                                       style={{width: "15%", marginLeft: "1%", borderRadius: 100}}/>
                                <label style={{
                                    fontFamily: 555,
                                    fontWeight: "bold",
                                    color: "black",
                                    marginLeft: "1%"
                                }}>CHF </label>


                            </div>
                        </div>

                        <div className="row mb-3">
                            <div className="col-md-12" align="center">
                                <button type="button"
                                        disabled={verifForms.verif_Number(this.state.montantActifs) || verifForms.verif_Number(this.state.montantPassifs)}
                                        className="btn btn-danger waves-effect waves-light btn-lg rounded"
                                        onClick={this.transformSARL}>
                                    <h5 style={{fontWeight:"bold",color:"#fff"}}>
                                        Générer le document de transformation</h5>
                                </button>
                            </div>
                        </div>


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


                </div>


            </div>
        )
    }

}

export default SarlToSa;