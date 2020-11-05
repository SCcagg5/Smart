import React, {Component, Suspense} from "react";
import user3 from "../../../../../assets/users/user-5.jpg";
import {Button, Card, CardBody, Container} from "reactstrap";
import firebase from "firebase/app";
import "firebase/database"
import MySnackbarContentWrapper from "../../../../../tools/customSnackBar";
import Snackbar from "@material-ui/core/Snackbar";
import Loader from "../../../../../components/Loader";

const Topbar = React.lazy(() => import("../../../../../components/Topbar"));
const Navbar = React.lazy(() => import("../../../../../components/Navbar"));
const loading = () => <Loader/>;

class affectationTitre extends Component {

    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            isMenuOpened: false,
            activeMenuItem: 'item-gestion',

            openAlert: false,
            alertMessage: '',
            alertType: '',

            entreprise: '',
            selectedActios: [],
            augmentationCapital: '',
            affectedvalues: [],
            totalAffected: 0,
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
        //console.log(this.props.location.state)
        if (this.props.location.state === null || this.props.location.state === undefined) {
            this.props.history.goBack();
        }else{

            let selectedActios = this.props.location.state.selectedActios;
            let values = [];
            selectedActios.map((item, key) => {
                values.push({
                    nb: ''
                })
            });
            this.setState({
                entreprise: this.props.location.state.entreprise,
                selectedActios: this.props.location.state.selectedActios,
                augmentationCapital: this.props.location.state.augmentationCapital,
                affectedvalues: values,
            });
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

    handleNbTitres = (key) => event => {
        let affectedValuesCopie = this.state.affectedvalues;
        affectedValuesCopie[key].nb = event.target.value;
        this.setState({
            affectedvalues: affectedValuesCopie,
        });
        this.calculeTotalAffectedActions(this.state.affectedvalues);
    };

    calculeTotalAffectedActions = (array) => {
        let total = 0;
        for (let i = 0; i < array.length; i++) {
            total += parseInt(array[i].nb)
        }
        this.setState({
            totalAffected: total
        })
    };

    saveAugmCapital = () => {


        this.setState({
            loading: true,
        });

        let augmCapital = this.state.augmentationCapital;
        let selectedActios = this.state.selectedActios;

        let nbActPhy = 0;
        let nbActMorale = 0;
        let to = [];
        selectedActios.map((item, key) => {
            if(item.type === "Personne physique")  nbActPhy+=1;
            else nbActMorale+=1;
            to.push({
                actioMail: item.email,
                nbAction: this.state.affectedvalues[key].nb,
                typeAction: "Action simple"
            })
        });
        augmCapital.To = to;
        augmCapital.dateCreation = new Date();
        augmCapital.nbActPhy = nbActPhy;
        augmCapital.nbActMorales = nbActMorale;


        const entreprise = this.state.entreprise;

        let oldNbActPhy = parseInt(this.props.location.state.entreprise.nbActPhys);
        let oldNbActMoral = parseInt(this.props.location.state.entreprise.nbActMorales);

        let capital = entreprise.sCapital;
        capital.montant = parseInt(entreprise.sCapital.montant) + parseInt(augmCapital.nbNewActEmis);


        let actionnairesPhy = entreprise.sActionnairePhy || [];
        let actionnairesMoral = entreprise.sActionnaireMoral || [];

        let augmCapitalArray = entreprise.augmentationcapital || [];
        augmCapitalArray.push(augmCapital);


        selectedActios.map((item, key) => {

            let foundByEmailPhy = actionnairesPhy.find(x => x.email === item.email);
            let foundByEmailMoral = actionnairesMoral.find(x => x.email === item.email);

            if (foundByEmailPhy !== undefined) {

                let actio = actionnairesPhy.find(x => x.email === foundByEmailPhy.email);

                let val = parseInt(actio.nbActions) + parseInt(this.state.affectedvalues[key].nb);

                if (isNaN(val)) {
                    actio.nbActions = "";
                    actionnairesPhy.find(x => x.email === foundByEmailPhy.email).nbActions = this.state.affectedvalues[key].nb;
                } else {
                    actionnairesPhy.find(x => x.email === foundByEmailPhy.email).nbActions = val
                }
            }
            if (foundByEmailMoral !== undefined) {

                let actio = actionnairesMoral.find(x => x.email === foundByEmailMoral.email);
                let val = parseInt(actio.nbActions) + parseInt(this.state.affectedvalues[key].nb);

                if (isNaN(val)) {
                    actio.nbActions = "";
                    actionnairesMoral.find(x => x.email === foundByEmailMoral.email).nbActions = this.state.affectedvalues[key].nb;
                } else {
                    actionnairesMoral.find(x => x.email === foundByEmailMoral.email).nbActions = val
                }
            }
        });

        firebase.database().ref('society/' + this.state.entreprise.uniqueId).update({
            'sActionnairePhy': actionnairesPhy,
            'sActionnaireMoral': actionnairesMoral,
            'augmentationcapital': augmCapitalArray,
            'sCapital': capital
        }).then(res => {

            this.openSnackbar('success', "Opération effectué avec succès");


            fetch('http://51.15.229.251:3002/api/getAugmentationDeCapitalTunisie',
                {
                    crossDomain: true,
                    method: 'POST',
                    headers: {'Accept': 'application/json', 'Content-Type': 'application/json'},
                    body: JSON.stringify({
                        code: localStorage.getItem('uid'),
                        pays: 'tunisie',
                        nbActPhysOld: oldNbActPhy,
                        nbActMoralesOld: oldNbActMoral
                    })
                }).then(response => response).then(res => {
            }).catch(err => {
            });

            setTimeout(() => {
                this.setState({
                    loading: false
                });
                this.props.history.push("/gestion/entreprises/operations/emissionTitres/1/info/affectation/opAugDetails",{entreprise:this.state.entreprise})
            }, 4000);


        }).catch(err => {
            console.log(err);
        });
    };

    verifEmission() {
        if (parseInt(this.state.totalAffected) > parseInt(this.state.augmentationCapital.nbNewActEmis)) {
            return true;
        } else {
            let test = false;
            for (let i = 0; i < this.state.affectedvalues.length; i++) {
                if (this.state.affectedvalues[i].nb === "") {
                    test = true;
                }
            }
            return test;
        }
    }


    render() {
        const nbActionsNewEmis = parseInt(this.state.augmentationCapital.nbNewActEmis);
        const newTotalCapitalAction = parseInt(this.state.entreprise.sCapital.montant) + parseInt(this.state.augmentationCapital.nbNewActEmis);


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

                            <div className="card" style={{marginTop: 25}}>
                                <div className="card-body ">
                                    <a style={{color: 'hover: #21a5c2 !important', cursor: 'pointer'}}
                                       onClick={() => this.props.history.goBack()} className="float-right text-info">Retour</a>
                                    <h4 className="header-title mt-0 mb-3">Affectation de titre
                                        pour {this.state.selectedActios.length} actionnaire(s)</h4>
                                    {
                                        this.state.selectedActios.map((item, key) => (
                                            <div>
                                                <div className="row" style={{marginTop: 25}}>
                                                    <div className="col-md-6 ">
                                                        <h5>Pour :</h5>
                                                        <div className="widget-rounded-circle card-box background-gainboro">
                                                            <div className="row align-items-center">
                                                                <div className="col-auto">
                                                                    <div className="avatar-lg">
                                                                        <img src={user3}
                                                                             className="img-fluid rounded-circle"
                                                                             alt="user-img"/>
                                                                    </div>
                                                                </div>
                                                                <div className="col">
                                                                    <h5 className="mb-1 mt-2 font-16">{item.firstname + ' ' + item.lastname}</h5>
                                                                    <p className="mb-2 text-muted">{item.adress + ', ' + item.postalCode + ', ' + item.pays}</p>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="row">
                                                    <div className="col-md-12">
                                                        <h5>Type</h5>
                                                        <div className="">
                                                            <span className="badge bg-soft-success text-success p-1">EMISSION</span>
                                                            &nbsp;de&nbsp;&nbsp;
                                                            <span>
                                                 <input className="form-control"
                                                        value={this.state.affectedvalues[key].nb}
                                                        onChange={this.handleNbTitres(key)}
                                                        style={{width: "20%", display: "inherit", height: 35}}
                                                        type="text" id="nbaction"/>
                                                </span>
                                                            <span className="badge bg-soft-info text-info p-1"
                                                                  style={{marginLeft: 8}}>Action simple</span>&nbsp;&nbsp;
                                                            {
                                                                this.state.affectedvalues[key].nb !== '' &&
                                                                (
                                                                    parseInt(this.state.totalAffected) > nbActionsNewEmis ?
                                                                        <span className="text-danger p-1"> le nombre est supérieur au reste d'actions nouvelles émis</span> :
                                                                        <span className="badge bg-soft-danger text-danger p-1">
                                                            {
                                                                ((parseInt(this.state.affectedvalues[key].nb) / newTotalCapitalAction) * 100).toFixed(2) +
                                                                " % du capital"
                                                            }
                                                        </span>
                                                                )
                                                            }

                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="row" style={{marginTop: 25}}>
                                                    <div className="col-md-4">
                                                        <Card>
                                                            <CardBody style={{padding: '0.5rem', cursor: 'pointer'}}>
                                                                <h5>Prix nominal par action</h5>
                                                                <div className="text-center">
                                                        <span
                                                            className="badge bg-soft-danger text-danger p-1">0.1 €</span>
                                                                </div>
                                                            </CardBody>
                                                        </Card>
                                                    </div>
                                                    <div className="col-md-4">
                                                        <Card>
                                                            <CardBody style={{padding: '0.5rem', cursor: 'pointer'}}>
                                                                <h5>Prix d'émission par action</h5>
                                                                <div className="text-center">
                                                        <span
                                                            className="badge bg-soft-danger text-danger p-1">10 €</span>
                                                                </div>
                                                            </CardBody>
                                                        </Card>
                                                    </div>
                                                    <div className="col-md-4">
                                                        <Card>
                                                            <CardBody style={{padding: '0.5rem', cursor: 'pointer'}}>
                                                                <h5>Montant total</h5>
                                                                <div className="text-center">
                                                        <span
                                                            className="badge bg-soft-danger text-danger p-1">1010 €</span>
                                                                </div>
                                                            </CardBody>
                                                        </Card>
                                                    </div>
                                                </div>
                                                <div style={{
                                                    marginLeft: '20%',
                                                    marginRight: '20%',
                                                    height: 1,
                                                    backgroundColor: "#C0C0C0",
                                                    marginTop: 20
                                                }}/>
                                            </div>
                                        ))
                                    }

                                    <div className="row" style={{marginTop: 15}}>
                                        <div className="col-md-12">
                                            <div className="text-center">
                                                <Button color="primary" className="btn btn-danger waves-effect waves-light"
                                                        disabled={this.verifEmission()}
                                                        onClick={() => {
                                                            this.saveAugmCapital();
                                                        }}>
                                                    {this.state.loading ?
                                                        <div className="spinner-border avatar-xs text-white m-1"
                                                             role="status"></div> : "Confirmer l'émission"
                                                    }
                                                </Button>
                                            </div>
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
                                autoHideDuration={3000}
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

export default affectationTitre;