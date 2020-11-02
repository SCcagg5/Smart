import React, {Component, Suspense} from "react";
import user3 from "../../../../../assets/users/user-5.jpg";
import enIcon from "../../../../../assets/images/entreprise-icon.png";
import {Button as ButtonR, Container, FormGroup, Label} from "reactstrap";
import firebase from "firebase/app";
import "firebase/database"
import MySnackbarContentWrapper from "../../../../../tools/customSnackBar";
import Snackbar from "@material-ui/core/Snackbar";
import fabienImg from "../../../../../assets/images/avocats/fabian.png"
import alexImg from "../../../../../assets/images/avocats/alex.jpg"
import keplerImg from "../../../../../assets/images/avocats/aKapeller.jpg"
import Loader from "../../../../../components/Loader";
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import {AvFeedback, AvForm, AvGroup, AvInput,AvRadioGroup,AvRadio} from "availity-reactstrap-validation";
import moment from "moment";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import {Radio} from "@material-ui/core";

const Topbar = React.lazy(() => import("../../../../../components/Topbar"));
const Navbar = React.lazy(() => import("../../../../../components/Navbar"));
const loading = () => <Loader/>;


class stockOptionSuisse extends Component {

    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);

    }

    actionnaire = {
        id: '',
        pwd: '',
        email: '',
        phone: '',
        type: 'Personne physique',
        gender: '',
        firstname: '',
        lastname: '',
        adress: '',
        postalCode: '',
        pays: '',
        birthday: '',
        nationality: '',
        nbActions: '',
        isAdministrator: 'false',
        isHaveSuisseId: 'true',
        signatures: [],
        role: '',
        titresBSA: [{
            operations: []
        }],
    };

    state = {
        SendContrat:"",
        SendContratJuridique:"",
        openAlert: false,
        alertMessage: '',
        alertType: '',

        loading: false,
        entreprise: "",
        beneficaire: '',
        nbBSA: '',
        dateLeveeOption: '',
        emissionBSA: [],
        models: [],

        openModalGroupe: false,
        selectedGroupe: ""
    };

     handleChange = ( name) => event => {
         let objCopy = this.state[name];
         objCopy= event.target.value;
         this.setState({
             [name]: objCopy
         });
     };
    componentWillMount() {
        if (this.props.location.state === null || this.props.location.state === undefined) {
            this.props.history.goBack();
        } else {
            firebase.database().ref("/society/"+this.props.location.state.entreprise.uniqueId).on("value",(snapshot) => {
                const societie = snapshot.val();
                this.setState({
                    entreprise: societie,
                    models: societie.modelesSO || []
                })
            });
        }
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

    showActio = (actioEmail) => {
        let allActios = (this.state.entreprise.sAssociate || []).concat(this.state.entreprise.sAdministrator || []);
        let actio = allActios.find(x => x.email === actioEmail);
        this.setState({
            beneficaire: actio
        })
    };

    saveBSA = () => {

        this.setState({loading: true});

        const entreprise = this.state.entreprise;
        let sAdiminstrator = entreprise.sAdministrator || [];
        let sAssociate = entreprise.sAssociate || [];

        if (this.state.beneficaire.ej_name) {

            let actio = sAssociate.find(x => x.email === this.state.beneficaire.email);
            let index = sAssociate.indexOf(actio);

            let titresBSA = actio.titresBSA || [];
            titresBSA.push({'operations': this.state.emissionBSA});

            firebase.database().ref('society/' + localStorage.getItem("uid")+"Suisse/sAssociate/"+index).update({
                'titresBSA': titresBSA
            }).then(res => {
                this.openSnackbar('success', "Opération effectué avec succès");
                this.setState({
                    beneficaire: "",
                    loading: false
                });
                setTimeout(() => {
                    this.props.history.push("/gestion/entreprises/operations/emissionTitres/stockOption/Details", {
                        entreprise: this.state.entreprise,
                        indexActio: index,
                        typeActio: "associate"
                    })
                }, 500);

            }).catch(err => {
                console.log(err);
            })

        } else {

            console.log(2)

            let actioAssoc = sAssociate.find(x => x.email === this.state.beneficaire.email);
            if(actioAssoc !== undefined && actioAssoc !== null){

                console.log(3)
                let index = sAssociate.indexOf(actioAssoc);

                let titresBSA = actioAssoc.titresBSA || [];
                titresBSA.push({'operations': this.state.emissionBSA});


                firebase.database().ref('society/' + localStorage.getItem("uid")+"Suisse/sAssociate/"+index).update({
                    'titresBSA': titresBSA
                }).then(res => {
                    this.openSnackbar('success', "Opération effectué avec succès");
                    this.setState({
                        beneficaire: "",
                        loading: false
                    });
                    setTimeout(() => {
                        this.props.history.push("/gestion/entreprises/operations/emissionTitres/stockOption/Details", {
                            entreprise: this.state.entreprise,
                            indexActio: index,
                            typeActio: "associate"
                        })
                    }, 500);

                }).catch(err => {
                    console.log(err);
                })

            }else{
                console.log(4)
                let actioAdmin = sAdiminstrator.find(x => x.email === this.state.beneficaire.email);
                let index = sAdiminstrator.indexOf(actioAdmin);

                let titresBSA = actioAdmin.titresBSA || [];
                titresBSA.push({'operations': this.state.emissionBSA});


                firebase.database().ref('society/' + localStorage.getItem("uid")+"Suisse/sAdministrator/"+index).update({
                    'titresBSA': titresBSA
                }).then(res => {
                    this.openSnackbar('success', "Opération effectué avec succès");
                    this.setState({
                        beneficaire: "",
                        loading: false
                    });
                    setTimeout(() => {
                        this.props.history.push("/gestion/entreprises/operations/emissionTitres/stockOption/Details", {
                            entreprise: this.state.entreprise,
                            indexActio: index,
                            typeActio: "admin"
                        })
                    }, 500);

                }).catch(err => {
                    console.log(err);
                })
            }

        }
    };

    handleArrayObjectChange = (object, name, key) => event => {
        let objCopy = this.state[object];
        objCopy[key][name] = event.target.value;
        this.setState({
            [object]: objCopy
        })
    };

    addBSA = () => {
        let copyOfBSA = this.state.emissionBSA;
        copyOfBSA.push({
            dateMAJ: new Date(),
            nb: '',
            dateLeveeOption: '',

            ordinaryShares: "0.1", //manuel
            preferredShares: "0.1", //manuel
            startExerciseMonth: moment(this.state.selectedGroupe.dateDV).format("MMMM"),

            nbMonthsAfterDeath: "6",  //manuel

            nbMonthsAfterEndOfExercise: this.state.selectedGroupe.nbMonthsAfterEndContrat,
            nbDaysAfterEndContrat: "10",  //manuel
            canton: this.state.entreprise.sSiege.canton,
            Currency: this.state.selectedGroupe.currency,
            strikePrice:(parseInt(this.state.selectedGroupe.prixUnitaire)+ parseInt(this.state.selectedGroupe.prixEmission)).toString()
        });
        this.setState({
            emissionBSA: copyOfBSA
        })
    };

    verifEmissionBSA() {
        let test = false;
        if (this.state.beneficaire === "") return true;
        for (let i = 0; i < this.state.emissionBSA.length; i++) {
            let item = this.state.emissionBSA[i];
            if (item.nb === "" || item.dateLeveeOption === "") test = true;
        }
        return test;
    }


    saveGroupe = () => {

        this.setState({openModalGroupe: false});
    };

    addModele = (event, values) => {
        let models = this.state.models;
        models.push({
            nom: values.nonM,
            typeAction: values.typeM,
            prixnominal: values.prixNominal,
            prixEmission: values.primeE,
            dateDV: values.dateDV,
            nbVestingMonths: values.nbVestingMonths,
            firstDebloc: values.firstDebloc,
            ratioFirstDebloc: values.ratioFirstDebloc,
            ratioDeblocImm: values.ratioDebloc,
            deblocTimes: values.deblocTimes,
            nbMonthsAfterEndContrat:values.nbMonthsAfterEndContrat,
            currency:values.currency,
            prixUnitaire:values.prixUnitaire
        });
        firebase.database().ref("/society/" + this.props.location.state.entreprise.uniqueId).update({
            'modelesSO': models
        }).then(ok => {
            this.setState({openModalGroupe: false});
            this.openSnackbar('success', "modéle ajouté avec succès");
            if (this.state.SendContratJuridique==="true")
            {
                var a =this.state.beneficaire.firstname
                var b =this.state.beneficaire.lastname
                localStorage.setItem('FNbeneficaire',a)
                localStorage.setItem('LNbeneficaire',b)
                this.props.history.push("/Calendlyavocats")

            }
        })
    };



    render() {
        const entreprise = this.state.entreprise;
        const actios = (entreprise.sAssociate || []).concat(entreprise.sAdministrator || []);
        const models = this.state.models;

        return (
            <div>

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

                                <div className="card" style={{marginTop: 25}}>
                                    <div className="card-body ">
                                        <a style={{color: 'hover: #21a5c2 !important', cursor: 'pointer'}}
                                           onClick={() => this.props.history.goBack()}
                                           className="float-right text-info">Retour</a>
                                        <h4 className="header-title mt-0 mb-3">Stock option</h4>
                                        <div>
                                            <div className="row">
                                                <div className="col-md-6">
                                                    <div className="form-group mb-3">
                                                        <label htmlFor="example-select">Choisir un actionnaire de la
                                                            société</label>
                                                        <select className="form-control custom-select"
                                                                id="example-select"
                                                                onChange={(event) => this.showActio(event.target.value)}>
                                                            <option
                                                                selected={this.state.beneficaire === ""}>Sélectionner un
                                                                actionnaire
                                                            </option>
                                                            {
                                                                actios.map((item, key) => (
                                                                    <option
                                                                        value={item.email}>{item.firstname + ' ' + item.lastname}</option>

                                                                ))
                                                            }
                                                        </select>
                                                    </div>
                                                </div>
                                                <div className="col-md-2">
                                                </div>
                                                {
                                                    this.state.beneficaire !== "" &&
                                                    <div className="col-md-3">
                                                        <li className="task-info" id="task7" onClick={() => {
                                                            window.open("http://www.smartcoagenda.com/SmartCo/avocats", "_blank");
                                                        }}
                                                            style={{
                                                                border: "1px solid #dee2e6",
                                                                padding: 20,
                                                                marginBottom: 15,
                                                                borderRadius: 3,
                                                                cursor: "pointer"
                                                            }}>
                                                            <span
                                                                className="badge bg-soft-danger text-danger float-right"> -> </span>
                                                            <h5 className="mt-0">
                                                                <a href="" className="text-dark">Vous avez des questions
                                                                    ?</a>
                                                            </h5>
                                                            <p>Vous pouvez prendre rendez-vous avec l'un de nos
                                                                avocats </p>
                                                            <div className="clearfix"></div>
                                                            <div className="row">
                                                                <div className="col">
                                                                    <p className="font-13 mt-2 mb-0">
                                                    <span
                                                        className="badge bg-soft-success text-success">Disponnible</span>
                                                                    </p>
                                                                </div>
                                                                <div className="col-auto">
                                                                    <div className="text-right">
                                                                        <a href="" className="text-muted">
                                                                            <img src={fabienImg}
                                                                                 alt="task-user"
                                                                                 className="avatar-sm img-thumbnail rounded-circle"/>
                                                                        </a>
                                                                        <a href="" className="text-muted">
                                                                            <img src={alexImg}
                                                                                 alt="task-user"
                                                                                 className="avatar-sm img-thumbnail rounded-circle"/>
                                                                        </a>
                                                                        <a href="" className="text-muted">
                                                                            <img src={keplerImg}
                                                                                 alt="task-user"
                                                                                 className="avatar-sm img-thumbnail rounded-circle"/>
                                                                        </a>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </li>
                                                    </div>
                                                }
                                            </div>

                                            {
                                                this.state.beneficaire !== "" &&

                                                <div>
                                                    <div className="row">
                                                        <div className="col-md-6">
                                                            <div className="form-group mb-3">
                                                                <label htmlFor="example-select">Choisir un modéle de
                                                                    groupe</label>
                                                                <select className="form-control custom-select"
                                                                        id="example-select"
                                                                        onChange={(event) => {
                                                                            let groupe = this.state.models.find(x => x.nom === event.target.value);
                                                                            let copyOfBSA = this.state.emissionBSA;
                                                                            copyOfBSA.push({
                                                                                dateMAJ: new Date(),
                                                                                nb: '',
                                                                                dateLeveeOption: '',

                                                                                ordinaryShares: "0.1", //manuel
                                                                                preferredShares: "0.1", //manuel
                                                                                startExerciseMonth: moment(groupe.dateDV).format("MMMM"),

                                                                                nbMonthsAfterDeath: "6",  //manuel

                                                                                nbMonthsAfterEndOfExercise: groupe.nbMonthsAfterEndContrat,
                                                                                nbDaysAfterEndContrat: "10",  //manuel
                                                                                canton: this.state.entreprise.sSiege.canton,
                                                                                Currency: groupe.currency,
                                                                                strikePrice:(parseInt(groupe.prixUnitaire)+ parseInt(groupe.prixEmission)).toString()
                                                                            });
                                                                            this.setState({selectedGroupe:groupe,emissionBSA: copyOfBSA})
                                                                        } }>
                                                                    <option
                                                                        selected={this.state.selectedGroupe === ""}>Sélectionner
                                                                        un modéle
                                                                    </option>
                                                                    {
                                                                        models.map((item, key) => (
                                                                            <option value={item.nom}>{item.nom}</option>
                                                                        ))
                                                                    }
                                                                </select>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <ButtonR color="primary"
                                                             className="btn btn-info waves-effect waves-light"
                                                             onClick={() => this.setState({openModalGroupe: true})}>
                                                        Ajouter un modéle
                                                    </ButtonR>
                                                </div>
                                            }


                                            {
                                                this.state.selectedGroupe !== "" &&
                                                <div>

                                                    <div className="row" style={{marginTop: 25}}>
                                                        <div className="col-md-6 ">
                                                            <h5>Entre :</h5>
                                                            <div
                                                                className="widget-rounded-circle card-box background-gainboro">
                                                                <div className="row align-items-center">
                                                                    <div className="col-auto">
                                                                        <div className="avatar-lg">
                                                                            <img src={enIcon}
                                                                                 className="img-fluid rounded-circle"
                                                                                 alt="user-img"/>
                                                                        </div>
                                                                    </div>
                                                                    <div className="col">
                                                                        <h5 className="mb-1 mt-2 font-16">{this.state.entreprise.sName}</h5>
                                                                        <p className="mb-2 text-muted">
                                                                            {this.state.entreprise.sSiege.adress + ', ' + this.state.entreprise.sSiege.postalCode + ', ' + this.state.entreprise.sSiege.pays}</p>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        {
                                                            this.state.beneficaire !== "" &&
                                                            <div className="col-md-6 ">
                                                                <h5>Et :(Bénéficaire)</h5>
                                                                <div
                                                                    className="widget-rounded-circle card-box background-gainboro">
                                                                    <div className="row align-items-center">
                                                                        <div className="col-auto">
                                                                            <div className="avatar-lg">
                                                                                <img src={user3}
                                                                                     className="img-fluid rounded-circle"
                                                                                     alt="user-img"/>
                                                                            </div>
                                                                        </div>
                                                                        <div className="col">
                                                                            <h5 className="mb-1 mt-2 font-16">
                                                                                {this.state.beneficaire.firstname + " " + this.state.beneficaire.lastname}</h5>
                                                                            <p className="mb-2 text-muted">
                                                                                {this.state.beneficaire.adress + ', ' + this.state.beneficaire.postalCode + ', ' + this.state.beneficaire.pays}</p>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        }

                                                    </div>
                                                    {
                                                        this.state.emissionBSA.map((item, key) => (
                                                            <div className="row">
                                                                <div className="col-md-6">
                                                                    <h5>Type</h5>
                                                                    <div className="">
                                                                        <span
                                                                            className="badge bg-soft-success text-success p-1">EMISSION</span>
                                                                        &nbsp;de&nbsp;&nbsp;
                                                                        <span>
                                                                       <input className="form-control"
                                                                            value={this.state.emissionBSA[key].nb}
                                                                            onChange={this.handleArrayObjectChange("emissionBSA", "nb", key)}
                                                                            style={{width: "30%", display: "inherit", height: 35}}
                                                                            type="text" id="nbaction"/>
                                                                       </span>
                                                                        <span
                                                                            className="badge bg-soft-info text-info p-1"
                                                                            style={{marginLeft: 8}}>{this.state.selectedGroupe.typeAction} </span>
                                                                    </div>
                                                                </div>
                                                                <div className="col-md-5">
                                                                    <h5>Date de levée d'option :</h5>
                                                                    <div className="">
                                                <span>
                                                 <input className="form-control"
                                                        onChange={this.handleArrayObjectChange("emissionBSA", "dateLeveeOption", key)}
                                                        style={{width: "60%", display: "inherit", height: 35}}
                                                        type="date" id="nbaction"/>
                                                </span>
                                                                    </div>
                                                                </div>
                                                                <div className="col-md-1">
                                                                    <i className="fa fa-minus-circle font-20 text-danger" style={{marginTop:"45px",cursor:"pointer"}} onClick={() =>{
                                                                        let tab = this.state.emissionBSA;
                                                                        if(key !== 0){
                                                                            tab.splice(key,1);
                                                                            this.setState({emissionBSA:tab})
                                                                        }

                                                                    }}/>
                                                                </div>
                                                            </div>
                                                        ))
                                                    }
                                                    <div className="row" style={{marginTop: 15}}>
                                                        <div className="col-md-12">
                                                            <div className="text-center">
                                                                <ButtonR
                                                                    className="btn waves-effect btn-primary waves-light"
                                                                    onClick={this.addBSA}>
                                                                    BSA suivant pour le meme actionnaire
                                                                </ButtonR>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <h5 className="mt-3 mb-3">Groupe</h5>
                                                    <div style={{padding:"2%",border:"2px solid #C0C0C0",marginLeft:"2%",marginRight:"7%"}}>
                                                        <AvForm>

                                                            <div className="row">
                                                                <div className="col-md-6">
                                                                    <AvGroup className="mb-3">
                                                                        <Label for="nonM" className="text-dark font-17 font-weight-bold">Non du groupe</Label>
                                                                        <AvInput type="text" name="nonM" id="NonM" disabled
                                                                                 style={{height: 45, fontSize: "1.1rem"}}
                                                                                 placeholder="Ex: Serie AA-21, Ex: BSA-2019"
                                                                                 value={this.state.selectedGroupe.nom}/>
                                                                    </AvGroup>
                                                                </div>
                                                                <div className="col-md-6">
                                                                    <AvGroup className="mb-3">
                                                                        <Label for="type" className="text-dark font-17 font-weight-bold">Titre
                                                                            sous-jacent</Label>
                                                                        <AvInput type="text" name="typeM" id="typeM" disabled
                                                                                 style={{height: 45, fontSize: "1.1rem"}}
                                                                                 value={this.state.selectedGroupe.typeAction}/>
                                                                    </AvGroup>
                                                                </div>
                                                            </div>

                                                            <div className="row">
                                                                <div className="col-md-6">
                                                                    <Label for="prixNominal" className="text-dark font-17 font-weight-bold">Dans quelle devise les options seront-elles exercées ?</Label>
                                                                    <AvInput type="text" name="currency" id="currency"
                                                                             style={{height: 45, fontSize: "1.1rem"}}
                                                                             disabled
                                                                             value={this.state.selectedGroupe.currency}/>
                                                                </div>
                                                                <div className="col-md-6">
                                                                    <AvGroup className="mb-3">
                                                                        <Label for="prixUnitaire" className="text-dark font-17 font-weight-bold">Quel est le prix unitaire d'exercice des options accordé ?</Label>
                                                                        <AvInput type="numtextber" name="prixUnitaire" id="prixUnitaire"
                                                                                 style={{height: 45, fontSize: "1.1rem"}}
                                                                                 value={this.state.selectedGroupe.prixUnitaire} disabled/>
                                                                    </AvGroup>
                                                                </div>
                                                            </div>

                                                            <div className="row">
                                                                <div className="col-md-6">
                                                                    <AvGroup className="mb-3">
                                                                        <Label for="prixNominal" className="text-dark font-17 font-weight-bold">Prix
                                                                            nominal par tittre</Label>
                                                                        <AvInput type="text" name="prixNominal" id="prixNominal"
                                                                                 style={{height: 45, fontSize: "1.1rem"}} disabled
                                                                                 value={this.state.selectedGroupe.prixnominal}/>
                                                                    </AvGroup>
                                                                </div>
                                                                <div className="col-md-6">
                                                                    <AvGroup className="mb-3">
                                                                        <Label for="type" className="text-dark font-17 font-weight-bold">Prime
                                                                            d'émission par titre</Label>
                                                                        <AvInput type="text" name="primeE" id="primeE" disabled
                                                                                 style={{height: 45, fontSize: "1.1rem"}}
                                                                                 value={this.state.selectedGroupe.prixEmission}/>
                                                                    </AvGroup>
                                                                </div>
                                                            </div>

                                                            <div className="row">
                                                                <div className="col-md-6">
                                                                    <AvGroup className="mb-3">
                                                                        <Label for="dateDV" className="text-dark font-17 font-weight-bold datepicker-dropdown">Date de début
                                                                            du vesting</Label>
                                                                        <AvInput type="date" name="dateDV" id="dateDV" disabled
                                                                                 style={{height: 45, fontSize: "1.1rem"}}
                                                                                 value={this.state.selectedGroupe.dateDV}/>
                                                                    </AvGroup>
                                                                </div>
                                                                <div className="col-md-6">
                                                                    <AvGroup className="mb-3">
                                                                        <Label for="nbVestingMonths" className="text-dark font-17 font-weight-bold">Durée
                                                                            total en mois du vesting</Label>
                                                                        <AvInput type="text" name="nbVestingMonths" id="nbVestingMonths"
                                                                                 style={{height: 45, fontSize: "1.1rem"}} disabled
                                                                                 value={this.state.selectedGroupe.nbVestingMonths}/>
                                                                    </AvGroup>
                                                                </div>
                                                            </div>

                                                            <div className="row">
                                                                <div className="col-md-6">
                                                                    <AvGroup className="mb-3">
                                                                        <Label for="firstDebloc" className="text-dark font-17 font-weight-bold">Premier
                                                                            débloquage au bout de </Label>
                                                                        <AvInput type="text" name="firstDebloc" id="firstDebloc"
                                                                                 style={{height: 45, fontSize: "1.1rem"}} disabled
                                                                                 value={this.state.selectedGroupe.firstDebloc}/>
                                                                    </AvGroup>
                                                                </div>
                                                                <div className="col-md-6">
                                                                    <AvGroup className="mb-3">
                                                                        <Label for="ratioFirstDebloc" className="text-dark font-17 font-weight-bold">Ratio
                                                                            à débloquer la première fois (%) </Label>
                                                                        <AvInput type="text" name="ratioFirstDebloc" id="ratioFirstDebloc"
                                                                                 style={{height: 45, fontSize: "1.1rem"}}
                                                                                 value={this.state.selectedGroupe.ratioFirstDebloc} disabled/>
                                                                    </AvGroup>
                                                                </div>
                                                            </div>

                                                            <div className="row">
                                                                <div className="col-md-6">
                                                                    <AvGroup className="mb-3">
                                                                        <Label for="ratioDebloc" className="text-dark font-17 font-weight-bold">Ratio à
                                                                            débloquer immédiatement (%) </Label>
                                                                        <AvInput type="text" name="ratioDebloc" id="ratioDebloc"
                                                                                 style={{height: 45, fontSize: "1.1rem"}}
                                                                                 value={this.state.selectedGroupe.ratioDeblocImm} disabled/>
                                                                    </AvGroup>
                                                                </div>
                                                                <div className="col-md-6">
                                                                    <AvGroup className="mb-3">
                                                                        <Label for="deblocTimes" className="text-dark font-17 font-weight-bold">Débloquage
                                                                            tous les</Label>
                                                                        <AvInput type="text" name="deblocTimes" id="deblocTimes" disabled
                                                                                 style={{height: 45, fontSize: "1.1rem"}}
                                                                                 value={this.state.selectedGroupe.deblocTimes}/>
                                                                    </AvGroup>
                                                                </div>
                                                            </div>
                                                            <div className="row">
                                                                <div className="col-md-6">
                                                                    <AvGroup className="mb-3">
                                                                        <Label for="nbDaysAfterEndContrat" className="text-dark font-17 font-weight-bold">Pendant combien de mois après la fin de la relation contractuelle, les options peuvent-elles etre exercées ?</Label>
                                                                        <AvInput type="text" name="nbMonthsAfterEndContrat" id="nbMonthsAfterEndContrat"
                                                                                 style={{height: 45, fontSize: "1.1rem"}}
                                                                                 value={this.state.selectedGroupe.nbMonthsAfterEndContrat} disabled/>
                                                                    </AvGroup>
                                                                </div>
                                                            </div>
                                                        </AvForm>
                                                    </div>





                                                </div>
                                            }


                                            <div style={{
                                                marginLeft: '20%',
                                                marginRight: '20%',
                                                height: 1,
                                                backgroundColor: "#C0C0C0",
                                                marginTop: 45
                                            }}/>
                                        </div>

                                        <div className="row" style={{marginTop: 15}}>
                                            <div className="col-md-12">
                                                <div className="text-center">
                                                    <ButtonR color="primary"
                                                             className="btn btn-danger waves-effect waves-light"
                                                             disabled={this.verifEmissionBSA()}
                                                             onClick={() => {
                                                                 this.saveBSA();
                                                             }}>
                                                        {this.state.loading ?
                                                            <div className="spinner-border avatar-xs text-white m-1"
                                                                 role="status"></div> : "Confirmer l'émission"
                                                        }
                                                    </ButtonR>
                                                </div>
                                            </div>
                                        </div>

                                    </div>
                                </div>

                            </Suspense>
                        </Container>
                    </div>
                </div>


                <Dialog open={this.state.openModalGroupe} onClose={() => this.setState({openModalGroupe: false})}
                        fullWidth={false}
                        maxWidth={"60%"}
                        aria-labelledby="form-dialog-title">
                    <DialogTitle id="form-dialog-title">Créer un modéle</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            Un modéle est un groupe de titres avec des caractéristiques communes, que vous pourez
                            attribuer à plusieurs acteurs
                        </DialogContentText>

                        <AvForm onValidSubmit={this.addModele}>

                            <div className="row">
                                <div className="col-md-6">
                                    <AvGroup className="mb-3">
                                        <Label for="nonM" className="text-dark font-17 font-weight-bold">Non donné à ce
                                            groupe de titres</Label>
                                        <AvInput type="text" name="nonM" id="NonM"
                                                 style={{height: 45, fontSize: "1.1rem"}}
                                                 placeholder="Ex: Serie AA-21, Ex: BSA-2019"
                                                 value={""} required/>
                                        <AvFeedback><p
                                            style={{color: "#ff0046", fontSize: "0.99rem", fontWeight: 700}}>Veuillez
                                            renseigner le nom de modéle</p></AvFeedback>
                                    </AvGroup>
                                </div>
                                <div className="col-md-6">
                                    <AvGroup className="mb-3">
                                        <Label for="type" className="text-dark font-17 font-weight-bold">Titre
                                            sous-jacent</Label>
                                        <AvInput type="select" name="typeM" id="typeM"
                                                 style={{height: 45, fontSize: "1.1rem"}} className="custom-select"
                                                 value={""}>
                                            <option value="Action simple">Action simple</option>
                                            <option value="BSPCE">BSPCE</option>
                                            <option value="BSA">BSA</option>
                                        </AvInput>
                                    </AvGroup>
                                </div>
                            </div>

                            <div className="row">
                                <div className="col-md-6">
                                    <Label for="prixNominal" className="text-dark font-17 font-weight-bold">Dans quelle devise les options seront-elles exercées ?</Label>
                                    <AvInput type="select" name="currency" id="currency"  className="custom-select"
                                             style={{height: 45, fontSize: "1.1rem"}}
                                             placeholder=""
                                             value={""}>
                                        <option value="CHF">CHF</option>
                                        <option value="EURO">€</option>
                                    </AvInput>
                                </div>
                                <div className="col-md-6">
                                    <AvGroup className="mb-3">
                                        <Label for="prixUnitaire" className="text-dark font-17 font-weight-bold">Quel est le prix unitaire d'exercice des options accordé ?</Label>
                                        <AvInput type="number" name="prixUnitaire" id="prixUnitaire"
                                                 style={{height: 45, fontSize: "1.1rem"}}
                                                 placeholder=""
                                                 value={""} required/>
                                        <AvFeedback><p
                                            style={{color: "#ff0046", fontSize: "0.99rem", fontWeight: 700}}>Format
                                            invalide</p></AvFeedback>
                                    </AvGroup>
                                </div>
                            </div>

                            <div className="row">
                                <div className="col-md-6">
                                    <AvGroup className="mb-3">
                                        <Label for="prixNominal" className="text-dark font-17 font-weight-bold">Prix
                                            nominal par tittre</Label>
                                        <AvInput type="number" name="prixNominal" id="prixNominal"
                                                 style={{height: 45, fontSize: "1.1rem"}}
                                                 placeholder=""
                                                 value={""} required/>
                                        <AvFeedback><p
                                            style={{color: "#ff0046", fontSize: "0.99rem", fontWeight: 700}}>Format
                                            invalide</p></AvFeedback>
                                    </AvGroup>
                                </div>
                                <div className="col-md-6">
                                    <AvGroup className="mb-3">
                                        <Label for="type" className="text-dark font-17 font-weight-bold">Prime
                                            d'émission par titre</Label>
                                        <AvInput type="number" name="primeE" id="primeE"
                                                 style={{height: 45, fontSize: "1.1rem"}}
                                                 value={""}/>
                                        <AvFeedback><p
                                            style={{color: "#ff0046", fontSize: "0.99rem", fontWeight: 700}}>Format
                                            invalide</p></AvFeedback>
                                    </AvGroup>
                                </div>
                            </div>

                            <div className="row">
                                <div className="col-md-6">
                                    <AvGroup className="mb-3">
                                        <Label for="dateDV" className="text-dark font-17 font-weight-bold">Date de début
                                            du vesting</Label>
                                        <AvInput type="date" name="dateDV" id="dateDV"
                                                 style={{height: 45, fontSize: "1.1rem"}}
                                                 placeholder=""
                                                 value={""} required/>
                                        <AvFeedback><p
                                            style={{color: "#ff0046", fontSize: "0.99rem", fontWeight: 700}}>Veuillez
                                            renseigner la date de début du vesting</p></AvFeedback>
                                    </AvGroup>
                                </div>
                                <div className="col-md-6">
                                    <AvGroup className="mb-3">
                                        <Label for="nbVestingMonths" className="text-dark font-17 font-weight-bold">Durée
                                            total en mois du vesting</Label>
                                        <AvInput type="number" name="nbVestingMonths" id="nbVestingMonths"
                                                 style={{height: 45, fontSize: "1.1rem"}}
                                                 value={""} required/>
                                        <AvFeedback><p
                                            style={{color: "#ff0046", fontSize: "0.99rem", fontWeight: 700}}>Format
                                            invalide</p></AvFeedback>
                                    </AvGroup>
                                </div>
                            </div>

                            <div className="row">
                                <div className="col-md-6">
                                    <AvGroup className="mb-3">
                                        <Label for="firstDebloc" className="text-dark font-17 font-weight-bold">Premier
                                            débloquage au bout de </Label>
                                        <AvInput type="select" name="firstDebloc" id="firstDebloc"
                                                 style={{height: 45, fontSize: "1.1rem"}} className="custom-select"
                                                 value={""}>
                                            <option value="immediatement">immédiatement</option>
                                        </AvInput>
                                    </AvGroup>
                                </div>
                                <div className="col-md-6">
                                    <AvGroup className="mb-3">
                                        <Label for="ratioFirstDebloc" className="text-dark font-17 font-weight-bold">Ratio
                                            à débloquer la première fois (%) </Label>
                                        <AvInput type="number" name="ratioFirstDebloc" id="ratioFirstDebloc"
                                                 style={{height: 45, fontSize: "1.1rem"}}
                                                 value={""} required/>
                                        <AvFeedback><p
                                            style={{color: "#ff0046", fontSize: "0.99rem", fontWeight: 700}}>Format
                                            invalide</p></AvFeedback>
                                    </AvGroup>
                                </div>
                            </div>

                            <div className="row">
                                <div className="col-md-6">
                                    <AvGroup className="mb-3">
                                        <Label for="ratioDebloc" className="text-dark font-17 font-weight-bold">Ratio à
                                            débloquer immédiatement (%) </Label>
                                        <AvInput type="number" name="ratioDebloc" id="ratioDebloc"
                                                 style={{height: 45, fontSize: "1.1rem"}}
                                                 value={""} required/>
                                        <AvFeedback><p
                                            style={{color: "#ff0046", fontSize: "0.99rem", fontWeight: 700}}>Format
                                            invalide</p></AvFeedback>
                                    </AvGroup>
                                </div>
                                <div className="col-md-6">
                                    <AvGroup className="mb-3">
                                        <Label for="deblocTimes" className="text-dark font-17 font-weight-bold">Débloquage
                                            tous les</Label>
                                        <AvInput type="select" name="deblocTimes" id="deblocTimes"
                                                 style={{height: 45, fontSize: "1.1rem"}} className="custom-select"
                                                 value={""}>
                                            <option value="jours">Tous les jours</option>
                                            <option value="mois">Tous les mois</option>
                                            <option value="annee">Tous les années</option>
                                        </AvInput>
                                    </AvGroup>
                                </div>
                            </div>

                            <div className="row">
                                <div className="col-md-6">
                                    <AvGroup className="mb-3">
                                        <Label for="nbDaysAfterEndContrat" className="text-dark font-17 font-weight-bold">Pendant combien de mois après la fin de la relation contractuelle, les options peuvent-elles etre exercées ?</Label>
                                        <AvInput type="number" name="nbMonthsAfterEndContrat" id="nbMonthsAfterEndContrat"
                                                 style={{height: 45, fontSize: "1.1rem"}}
                                                 value={""} required/>
                                        <AvFeedback><p
                                            style={{color: "#ff0046", fontSize: "0.99rem", fontWeight: 700}}>Format
                                            invalide</p></AvFeedback>
                                    </AvGroup>
                                </div>
                            </div>

                            <div className="col-md-9 text-center">

                                <h5 > Est ce que la proposition de contrat est envoyé directement au bénéficiaire  et au gérant ?
                                </h5>.
                                <FormGroup className="justify-content-center"
                                           style={{marginTop: "-5%"}}>
                                    <FormControlLabel
                                        control={
                                            <Radio
                                                checked={this.state.SendContrat==="true"}
                                                onChange={this.handleChange('SendContrat')}
                                                value="true"
                                            />
                                        }
                                        label="Oui"
                                    />
                                    <FormControlLabel
                                        control={
                                            <Radio
                                                checked={this.state.SendContrat==="false"}
                                                onChange={this.handleChange('SendContrat')}
                                                value="false"
                                            />
                                        }
                                        label="Non"
                                    />
                                </FormGroup>
                            </div>

                            <div className="col-md-9 text-center">

                                <h5 > Souhaitez vous au préalable envoyer ce projet de stock option au service conseil juridique de SmartCo ?
                                </h5>.
                                <FormGroup className="justify-content-center"
                                           style={{marginTop: "-5%"}}>
                                    <FormControlLabel
                                        control={
                                            <Radio
                                                checked={this.state.SendContratJuridique==="true"}
                                                onChange={this.handleChange('SendContratJuridique')}
                                                value="true"
                                            />
                                        }
                                        label="Oui"
                                    />
                                    <FormControlLabel
                                        control={
                                            <Radio
                                                checked={this.state.SendContratJuridique==="false"}
                                                onChange={this.handleChange('SendContratJuridique')}
                                                value="false"
                                            />
                                        }
                                        label="Non"
                                    />
                                </FormGroup>
                            </div>




                            <div className="text-center">
                                <FormGroup>
                                    <ButtonR color="primary" className="btn">Créer</ButtonR>
                                </FormGroup>
                            </div>

                        </AvForm>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={() => this.setState({openModalGroupe: false})} color="primary">
                            Cancel
                        </Button>
                    </DialogActions>
                </Dialog>


                <Snackbar
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'left',
                    }}
                    open={this.state.openAlert}
                    autoHideDuration={6000}
                    onClose={this.closeSnackbar}
                >
                    <MySnackbarContentWrapper
                        onClose={this.closeSnackbar}
                        variant={this.state.alertType}
                        message={this.state.alertMessage}
                    />
                </Snackbar>

            </div>
        )
    }

}

export default stockOptionSuisse;