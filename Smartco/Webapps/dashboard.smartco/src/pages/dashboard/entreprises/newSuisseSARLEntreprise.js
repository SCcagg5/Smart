import React, {Component, Suspense} from "react";
import firebase from "firebase/app";
import "firebase/database";
import {AvFeedback, AvForm, AvGroup, AvInput} from "availity-reactstrap-validation";
import {Button, Container, FormGroup, Label} from "reactstrap";
import PhoneInput from "react-phone-input-2";
import countryList from "../../../tools/countryList";
import MySnackbarContentWrapper from "../../../tools/customSnackBar";
import Snackbar from "@material-ui/core/Snackbar";
import cantonList from "../../../tools/cantonSuisse";
import moment from "moment";
import Loader from "../../../components/Loader";

const Topbar = React.lazy(() => import("../../../components/Topbar"));
const Navbar = React.lazy(() => import("../../../components/Navbar"));
const loading = () => <Loader/>;


class newSuisseSARLEntreprise extends Component {


    state = {
        loading: false,
        isMenuOpened: false,
        activeMenuItem: 'item-gestion',
        openAlert: false,
        alertMessage: '',
        alertType: '',
        selectedPays: 'Suisse',

        showStep1: true,
        showStep2: false,
        showStep3: false,
        showStep4: false,
        showStep5: false,
        showStep6: false,
        showStep7: false,

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
            montant: '20000',
            montantNouveau: '20000',
            minValActions: '200',
            minValActionsAncien: '200',
            getIBAN: 'true',
            apportsNAture: 'true'
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

        expertSmartCo: "false",
    };

    componentWillMount() {
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

    handleChange = (name) => event => {
        this.setState({
            [name]: event.target.value
        })
    };

    handleObjectChange = (object, name) => event => {
        if (name === "montant") {
            let objCopy = this.state[object];
            objCopy[name] = event.target.value;
            objCopy['minValActions'] = (parseInt(event.target.value) / 100).toString();
            this.setState({
                [object]: objCopy
            });
        } else {
            let objCopy = this.state[object];
            objCopy[name] = event.target.value;
            this.setState({
                [object]: objCopy
            });
        }
    };

    handleTypeTmpChange = (key, value)  => {
        //console.log(value)
        let actiosCopy = this.state.sActionnaireMoral;
        actiosCopy[key].typeTmp = value;
        this.setState({sActionnaireMoral: actiosCopy})
    };

    handleChoixMontantChange = (x) => event => {
        if (event.target.value === "20000" || event.target.value === "100000") {
            let objCopy = this.state.sCapital;
            objCopy.montant = (event.target.value).toString();
            objCopy.minValActions = (parseInt(event.target.value) / 100).toString();
            this.setState({
                montantChoix: "",
                sCapital: objCopy
            })
        } else {
            let objCopy = this.state.sCapital;
            objCopy.montant = (event.target.value).toString();
            objCopy.minValActions = (parseInt(event.target.value) / 100).toString();
            this.setState({
                montantChoix: (event.target.value).toString(),
                sCapital: objCopy
            })
        }
    };


    saveStep1 = (event, values) => {
        let arrayOfActPhy = [];
        let arrayOfActMora = [];
        let nb1 = 1;
        let nb2 = 1;

        for (let i = 0; i < nb1; i++) {
            arrayOfActPhy.push(
                {
                    id: '_' + Math.random().toString(36).substr(2, 9),
                    email: '',
                    pwd: Math.random().toString(36).substr(2, 5),
                    phone: '',
                    type: 'Personne physique',
                    gender: 'M.',
                    firstname: '',
                    lastname: '',
                    adress: '',
                    postalCode: '',
                    pays: 'Suisse',
                    ville: '',
                    birthday: '',
                    nationality: '',
                    isHaveSuisseId: 'true',
                    signatureStatut: '',
                }
            );
        }
        for (let i = 0; i < nb2; i++) {
            arrayOfActMora.push(
                {
                    id: '_' + Math.random().toString(36).substr(2, 9),
                    email: '',
                    pwd: Math.random().toString(36).substr(2, 5),
                    phone: '',
                    type: 'Un particulier',
                    civility: 'M.',
                    firstname: '',
                    lastname: '',
                    adress: '',
                    postalCode: '',
                    pays: 'Suisse',
                    ville: '',
                    birthday: '',
                    nationality: '',
                    isAdministrator: 'false',
                    isHaveSuisseId: 'true',
                    isResresentantsHaveSuisseID: 'true',
                    signatureProcuration: '',
                    signatureStatut: '',
                    signatureDeclaration: '',
                    nbActions: '',
                    representant: [{
                        rep_firstname: '',
                        rep_lastname: '',
                    }],
                    ej_name: '',
                    formeSocial: 'SARL',
                    typeTmp: 'Un particulier'
                }
            );
        }
        this.setState({
            sName: values.sname,
            sBut: values.sbut,
            nbActPhys: 1,
            nbActMorales: 1,
            sActionnairePhy: arrayOfActPhy,
            sActionnaireMoral: arrayOfActMora,
            showStep1: false,
            showStep2: true,
        });
    };

    saveStep2 = (event, values) => {

        let objCopy = this.state.sSiege;
        objCopy.adress = values.adress;
        objCopy.canton = values.canton;
        objCopy.ville = values.ville;
        objCopy.postalCode = values.postalcode;

        this.setState({
            sSiege: objCopy,
            showStep2: false,
            showStep4: true,
        });
    };

    saveStep3 = (event, values) => {
        this.setState({
            siret: values.siret,
            siren: values.siren,
            nombre_employes: values.nbemploye,
            convention_collective_code: values.codecollective,
            LINK_Contract_Sociétés: {
                id: '',
                id_contrat_mutuelle: values.codemutuelle,
                id_contrat_prevoyance: values.codeprevoyance,
            },
            showStep3: false,
            showStep4: true,
        });
    };

    saveStep4 = (event, values) => {
        let objCopy = this.state.sCapital;
        objCopy.montantNouveau = this.state.sCapital.montant;
        this.setState({
            sCapital: objCopy,
            showStep4: false,
            showStep5: true,
        });
    };

    saveStep5 = (event, values) => {
        this.setState({});
    };

    handleOnChangePhone = (value, key, type) => {
        if (type === "phy") {
            let objCopy = this.state.sActionnairePhy;
            objCopy[key].phone = value;
            this.setState({sActionnairePhy: objCopy});
        } else {
            let objCopy = this.state.sActionnaireMoral;
            objCopy[key].phone = value;
            this.setState({sActionnaireMoral: objCopy});
        }

    };

    handleRadioChange = (object, name, key, value) => event => {
        let objCopy = this.state[object];
        objCopy[key][name] = value;
        this.setState({
            [object]: objCopy
        })
    };

    handleRadioObjectChange = (object, name, value) => event => {
        let objCopy = this.state[object];
        objCopy[name] = value;
        this.setState({
            [object]: objCopy
        })
    };

    validerGerants = (event, values) => {

        let arrayOfGerants = this.state.sActionnairePhy;
        let gerantsCopy = this.state.sActionnairePhy;

        arrayOfGerants.map((item, key) => {

            gerantsCopy[key].type = "";
            gerantsCopy[key].gender = values['civilite' + key];
            gerantsCopy[key].firstname = values['firstname' + key];
            gerantsCopy[key].lastname = values['lastname' + key];
            gerantsCopy[key].email = values['email' + key];
            gerantsCopy[key].birthday = values['birthday' + key];
            gerantsCopy[key].nationality = values['nationality' + key];
            gerantsCopy[key].adress = values['adress' + key];
            gerantsCopy[key].ville = values['ville' + key];
            gerantsCopy[key].postalCode = values['postalCode' + key];
            gerantsCopy[key].pays = "Suisse";


        });

        this.setState({sActionnairePhy: gerantsCopy, showStep6: false, showStep7: true});

        //console.log(gerantsCopy)


    };

    validerAssocies = (event, values) => {

        let arrayOfAssoc = this.state.sActionnaireMoral;
        let assocCopy = this.state.sActionnaireMoral;
        arrayOfAssoc.map((item, key) => {

            assocCopy[key].type = values['formeMo' + key] || "";
            assocCopy[key].gender = values['civiliteMo' + key] || "";
            assocCopy[key].firstname = values['firstnameMo' + key] || "";
            assocCopy[key].lastname = values['lastnameMo' + key] || "";
            assocCopy[key].email = values['emailMo' + key];
            assocCopy[key].birthday = values['birthdayMo' + key] || "";
            assocCopy[key].nationality = values['nationalityMo' + key] || "";
            assocCopy[key].adress = values['adressMo' + key];
            assocCopy[key].ville = values['villeMo' + key];
            assocCopy[key].postalCode = values['postalCodeMo' + key];
            assocCopy[key].pays = values['paysMo' + key];
            assocCopy[key].formeSocial = values['formeSo' + key] || "";
            assocCopy[key].ej_name = values['ejname' + key] || "";

            let repCopy = this.state.sActionnaireMoral[key].representant || [];
            repCopy.map((rep, repkey) => {
                assocCopy[key].representant[repkey].rep_firstname = values['repnom' + key + "_" + repkey] || "";
                assocCopy[key].representant[repkey].rep_lastname = values['repprenom' + key + "_" + repkey] || "";
            })


            assocCopy[key].nbActions = values['nbactionsEj' + key];

        });


        this.setState({sActionnaireMoral: assocCopy, showStep5: false, showStep6: true});
        //console.log(assocCopy)

    };

    addRepresentant = (key) => event => {
        let objCopy = this.state.sActionnaireMoral;
        objCopy[key].representant.push({
            rep_firstname: '',
            rep_lastname: '',
        });
        this.setState({
            sActionnaireMoral: objCopy
        })

    };

    addNewGerant = () => {
        let objCop = this.state.sActionnairePhy;
        objCop.push({

            id: '_' + Math.random().toString(36).substr(2, 9),
            email: '',
            pwd: Math.random().toString(36).substr(2, 5),
            phone: '',
            type: 'Personne physique',
            gender: 'M.',
            firstname: '',
            lastname: '',
            adress: '',
            postalCode: '',
            pays: 'Suisse',
            ville: '',
            birthday: '',
            nationality: '',
            isHaveSuisseId: "true",
            signatureStatut: '',
        });
        this.setState({sActionnairePhy: objCop})


    };

    addNewAssocie = () => {
        let objCopy = this.state.sActionnaireMoral;
        objCopy.push(
            {
                id: '_' + Math.random().toString(36).substr(2, 9),
                email: '',
                pwd: Math.random().toString(36).substr(2, 5),
                phone: '',
                type: 'Un particulier',
                civility: 'M.',
                firstname: '',
                lastname: '',
                adress: '',
                postalCode: '',
                pays: 'Suisse',
                ville: '',
                birthday: '',
                nationality: '',
                isAdministrator: 'false',
                isHaveSuisseId: 'false',
                signatureProcuration: '',
                signatureStatut: '',
                signatureDeclaration: '',
                nbActions: '',
                representant: [{
                    rep_firstname: '',
                    rep_lastname: '',
                }],
                ej_name: '',
                formeSocial: 'SARL',
                typeTmp: 'Un particulier'
            }
        );
        this.setState({sActionnaireMoral: objCopy})

    };

    saveSociety = () => {
        this.setState({loading: true});

        firebase.database().ref('society/' + localStorage.getItem('uid') + 'Suisse').set({
            dateCreation: moment(new Date()).format("DD/MM/YYYY"),
            sName: this.state.sName,
            sBut: this.state.sBut,
            representant: this.state.representant,
            sCapital: {
                montant: this.state.sCapital.montant,
                montantNouveau: this.state.sCapital.montant,
                minValActions: this.state.sCapital.minValActions,
                getIBAN: this.state.sCapital.getIBAN,
                apportsNAture: this.state.sCapital.apportsNAture
            },
            LINK_Contract_Sociétés: this.state.LINK_Contract_Sociétés,
            nombre_employes: this.state.nombre_employes,
            type_société: "SARL",
            Montant_capital_libéré_SARL_chiffre: this.state.Montant_capital_libéré_SARL_chiffre,
            Montant_capital_libéré_SARL_lettre: this.state.Montant_capital_libéré_SARL_lettre,
            Montant_capital_libéré_SA_chiffre: this.state.Montant_capital_libéré_SA_chiffre,
            Montant_capital_libéré_SA_lettre: this.state.Montant_capital_libéré_SA_lettre,
            siret: this.state.siret,
            siren: this.state.siren,
            convention_collective_code: this.state.convention_collective_code,
            sSiege: this.state.sSiege,

            nbGerant: parseInt(this.state.sActionnairePhy.length),
            nbAssociate: parseInt(this.state.sActionnaireMoral.length),

            nbActPhys: "",
            nbActMorales: "",

            sAdministrator: this.state.sActionnairePhy,
            sAssociate: this.state.sActionnaireMoral,
            gerant: {
                gerantDomiciliEnSuisse: false
            },

            expertSmartCo: this.state.expertSmartCo,
            signatures: []
        }).then(res => {
            setTimeout(() => {
                this.setState({loading: false});
                this.openSnackbar('success', "La création de votre nouvelle entreprise est effectuée avec succès");
                setTimeout(() => {
                    this.props.history.push("/coffre-fort")
                }, 1000);
            }, 1500)

        }).catch(err => {
            console.log(err);
        })


    };

    render() {

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
                                       className="float-right text-info">
                                        {
                                            this.state.showStep1 ? "Etape 1/6" :
                                                this.state.showStep2 ? "Etape 2/6" :
                                                    this.state.showStep4 ? "Etape 3/6" :
                                                        this.state.showStep5 ? "Etape 4/6" :
                                                            this.state.showStep6 ? "Etape 5/6" :
                                                                this.state.showStep7 ? "Etape 6/6" : ""

                                        }
                                    </a>
                                    <div className="row" style={{marginTop: 15}}>
                                        <div className="col-lg-12">

                                            {
                                                this.state.showStep1 &&
                                                <AvForm onValidSubmit={this.saveStep1}>

                                                    <div className="row">
                                                        <div className="col-lg-12">
                                                            <AvGroup className="mb-3">
                                                                <h4 className="mb-3" for="sname">Quelle est la raison
                                                                    sociale de votre société ?</h4>
                                                                <AvInput type="text" name="sname" id="sname"
                                                                         placeholder="La raison sociale est tout simplement le nom de la société"
                                                                         value={this.state.sName} required/>
                                                                <AvFeedback>Ce champs est obligatoire</AvFeedback>
                                                            </AvGroup>
                                                        </div>
                                                    </div>
                                                    <div className="row">
                                                        <div className="col-lg-12">
                                                            <AvGroup className="mb-3">
                                                                <h4 className="mb-3" for="sbut">Décrivez le but social
                                                                    de votre société :</h4>
                                                                <AvInput type="textarea" name="sbut" id="sbut"
                                                                         placeholder="Vous pouvez décrire votre activité principale. Il n’est pas forcément utile d’ajouter l’intégralité de vos activités.
                                                                        Vos statuts seront rédigés de sorte à vous permettre d’exercer des activités connexes.
                                                                        Vous pouvez faire appel à un avocat de SmartCo en cas de doute."
                                                                         value={this.state.sBut}
                                                                         required/>
                                                                <AvFeedback>Ce champs est obligatoire</AvFeedback>
                                                            </AvGroup>
                                                        </div>
                                                        {/*<div className="col-lg-6">
                                                            <AvGroup className="mb-3">
                                                                <Label for="snbactphy">Nombre de gérants</Label>
                                                                <AvInput type="number" name="snbactphy" id="snbactphy"
                                                                         value={this.state.nbActPhys}
                                                                         required/>
                                                                <AvFeedback>Format invalide</AvFeedback>
                                                            </AvGroup>
                                                        </div>
                                                        <div className="col-lg-6">
                                                            <AvGroup className="mb-3">
                                                                <Label for="snbactmora">Nombre d'associés</Label>
                                                                <AvInput type="number" name="snbactmora" id="snbactmora"
                                                                         value={this.state.nbActMorales}
                                                                         required/>
                                                                <AvFeedback>Format invalide</AvFeedback>
                                                            </AvGroup>
                                                        </div>*/}
                                                    </div>
                                                    <FormGroup>
                                                        <div className="float-left">
                                                            <Button color="primary"
                                                                    onClick={() => this.props.history.goBack()}
                                                                    className="btn btn-small btn-light waves-effect waves-light">
                                                                Précédent
                                                            </Button>
                                                        </div>
                                                        <div className="float-right">
                                                            <Button color="primary"
                                                                    className="btn btn-small btn-danger waves-effect waves-light">
                                                                {this.state.loading ?
                                                                    <div
                                                                        className="spinner-border avatar-xs text-white m-1"
                                                                        role="status"></div> : 'Continuer'
                                                                }
                                                            </Button>
                                                        </div>
                                                    </FormGroup>
                                                </AvForm>
                                            }

                                            {
                                                this.state.showStep2 &&
                                                <AvForm onValidSubmit={this.saveStep2}>
                                                    <h4 className="mb-3">Où est le siège de votre société ?</h4>
                                                    <div className="row">
                                                        <div className="col-lg-6">
                                                            <AvGroup className="mb-3">
                                                                <Label for="adress">Adresse</Label>
                                                                <AvInput type="text" name="adress" id="adress"
                                                                         value={this.state.sSiege.adress} required/>
                                                                <AvFeedback>Ce champs est obligatoire</AvFeedback>
                                                            </AvGroup>
                                                        </div>
                                                        <div className="col-lg-6">
                                                            <AvGroup className="mb-3">
                                                                <Label for="postalcode">Code postal</Label>
                                                                <AvInput type="number" name="postalcode" id="postalcode"
                                                                         value={this.state.sSiege.postalCode}
                                                                         required/>
                                                                <AvFeedback>Format invalide</AvFeedback>
                                                            </AvGroup>
                                                        </div>
                                                    </div>
                                                    <div className="row">
                                                        <div className="col-lg-6">
                                                            <AvGroup className="mb-3">
                                                                <Label for="ville">Ville</Label>
                                                                <AvInput type="text" name="ville" id="ville"
                                                                         value={this.state.sSiege.ville}
                                                                         required/>
                                                                <AvFeedback>Ce champs est obligatoire</AvFeedback>
                                                            </AvGroup>
                                                        </div>
                                                        <div className="col-lg-6">
                                                            <AvGroup className="mb-3">
                                                                <Label for="pays">Canton</Label>
                                                                <AvInput type="select" name="canton" id="canton"
                                                                         value={this.state.sSiege.canton}>
                                                                    {
                                                                        cantonList.map((item, key) => (
                                                                            <option
                                                                                value={item.CantonSuisse}>{item.CantonSuisse}</option>
                                                                        ))
                                                                    }
                                                                </AvInput>
                                                            </AvGroup>
                                                        </div>
                                                    </div>
                                                    <div className="row" style={{marginTop: 25}}>
                                                        <div className="col-lg-12">
                                                            <h4 className="mb-3" for="canton">Est-ce que ce sont vos
                                                                propres locaux ? </h4>
                                                            <div className="radio radio-pink mb-2">
                                                                <input type="radio" name="radioloc" id="radioLoc1"
                                                                       style={{marginLeft: 10}}
                                                                       onClick={this.handleRadioObjectChange('sSiege', 'isPropreLocaux', "true")}
                                                                       checked={this.state.sSiege.isPropreLocaux === "true"}
                                                                       value={this.state.sSiege.isPropreLocaux}
                                                                />
                                                                <label htmlFor="radioLoc1">
                                                                    Oui
                                                                </label>
                                                            </div>
                                                            <div className="radio radio-pink mb-2">
                                                                <input type="radio" name="radioloc" id="radioLoc2"
                                                                       style={{marginLeft: 10}}
                                                                       onClick={this.handleRadioObjectChange('sSiege', 'isPropreLocaux', "false")}
                                                                       checked={this.state.sSiege.isPropreLocaux === "false"}
                                                                       value={this.state.sSiege.isPropreLocaux}
                                                                />
                                                                <label htmlFor="radioLoc2">
                                                                    Non : Télécharger l’attestation de domiciliation
                                                                </label>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="row" style={{marginTop: 25}}>
                                                        <div className="col-lg-12">
                                                            <h4 className="mb-3" htmlFor="canton">Souhaitez-vous avoir
                                                                une domiciliation via SmartCo ? </h4>
                                                            <div className="radio radio-pink mb-2">
                                                                <input type="radio" name="radiodom" id="radiodom1"
                                                                       style={{marginLeft: 10}}
                                                                       onClick={this.handleRadioObjectChange('sSiege', 'domiciliation', "true")}
                                                                       checked={this.state.sSiege.domiciliation === "true"}
                                                                       value={this.state.sSiege.domiciliation}
                                                                />
                                                                <label htmlFor="radiodom1">
                                                                    Oui
                                                                </label>
                                                            </div>
                                                            <div className="radio radio-pink mb-2">
                                                                <input type="radio" name="radiodom" id="radiodom2"
                                                                       style={{marginLeft: 10}}
                                                                       onClick={this.handleRadioObjectChange('sSiege', 'domiciliation', "false")}
                                                                       checked={this.state.sSiege.domiciliation === "false"}
                                                                       value={this.state.sSiege.domiciliation}
                                                                />
                                                                <label htmlFor="radiodom2">
                                                                    Non
                                                                </label>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <FormGroup style={{marginTop: 20}}>
                                                        <div className="float-left">
                                                            <Button color="primary"
                                                                    onClick={() => this.setState({
                                                                        showStep1: true,
                                                                        showStep2: false
                                                                    })}
                                                                    className="btn btn-small btn-light waves-effect waves-light">
                                                                Précédent
                                                            </Button>
                                                        </div>
                                                        <div className="float-right">
                                                            <Button color="primary"
                                                                    className="btn btn-danger waves-effect waves-light">
                                                                {this.state.loading ?
                                                                    <div
                                                                        className="spinner-border avatar-xs text-white m-1"
                                                                        role="status"></div> : 'Continuer'
                                                                }
                                                            </Button>
                                                        </div>
                                                    </FormGroup>
                                                </AvForm>
                                            }

                                            {
                                                this.state.showStep3 &&
                                                <AvForm onValidSubmit={this.saveStep3}>

                                                    <div className="row">
                                                        <div className="col-lg-6">
                                                            <AvGroup className="mb-3">
                                                                <Label for="siret">Siret</Label>
                                                                <AvInput type="number" name="siret" id="siret"
                                                                         value={this.state.siret} required/>
                                                                <AvFeedback>Format invalide</AvFeedback>
                                                            </AvGroup>
                                                        </div>
                                                        <div className="col-lg-6">
                                                            <AvGroup className="mb-3">
                                                                <Label for="siren">Siren</Label>
                                                                <AvInput type="number" name="siren" id="siren"
                                                                         value={this.state.siren} required/>
                                                                <AvFeedback>Format invalide</AvFeedback>
                                                            </AvGroup>
                                                        </div>
                                                    </div>
                                                    <div className="row">
                                                        <div className="col-lg-6">
                                                            <AvGroup className="mb-3">
                                                                <Label for="codemutuelle">Id contrat mutuelle</Label>
                                                                <AvInput type="number" name="codemutuelle"
                                                                         id="codemutuelle"
                                                                         value={this.state.LINK_Contract_Sociétés.id_contrat_mutuelle}
                                                                         required/>
                                                                <AvFeedback>Format invalide</AvFeedback>
                                                            </AvGroup>
                                                        </div>
                                                        <div className="col-lg-6">
                                                            <AvGroup className="mb-3">
                                                                <Label for="codeprevoyance">Id contrat
                                                                    prevoyance</Label>
                                                                <AvInput type="number" name="codeprevoyance"
                                                                         id="codeprevoyance"
                                                                         value={this.state.LINK_Contract_Sociétés.id_contrat_prevoyance}
                                                                         required/>
                                                                <AvFeedback>Format invalide</AvFeedback>
                                                            </AvGroup>
                                                        </div>
                                                        <div className="col-lg-6">
                                                            <AvGroup className="mb-3">
                                                                <Label for="codecollective">Code de convention
                                                                    collective</Label>
                                                                <AvInput type="number" name="codecollective"
                                                                         id="codecollective"
                                                                         value={this.state.convention_collective_code}
                                                                         required/>
                                                                <AvFeedback>Format invalide</AvFeedback>
                                                            </AvGroup>
                                                        </div>
                                                        <div className="col-lg-6">
                                                            <AvGroup className="mb-3">
                                                                <Label for="nbemploye">Nombre d'employes</Label>
                                                                <AvInput type="number" name="nbemploye" id="nbemploye"
                                                                         value={this.state.nombre_employes} required/>
                                                                <AvFeedback>Format invalide</AvFeedback>
                                                            </AvGroup>
                                                        </div>
                                                    </div>
                                                    <FormGroup>
                                                        <div className="text-center">
                                                            <Button color="primary"
                                                                    className="btn btn-danger waves-effect waves-light">
                                                                {this.state.loading ?
                                                                    <div
                                                                        className="spinner-border avatar-xs text-white m-1"
                                                                        role="status"></div> : 'Suivant'
                                                                }
                                                            </Button>
                                                        </div>
                                                    </FormGroup>
                                                </AvForm>
                                            }

                                            {
                                                this.state.showStep4 &&
                                                <AvForm onValidSubmit={this.saveStep4}>

                                                    <h4 className="mb-3">Quel est le capital social de votre société
                                                        ?</h4>
                                                    <div className="row">
                                                        <div className="col-lg-6">
                                                            <Label for="canton">Montant du capital libéré (CHF)</Label>
                                                            <div className="radio radio-pink mb-2">
                                                                <input type="radio" name="radiocapital"
                                                                       id="radiocapital1"
                                                                       checked={this.state.sCapital.montant === "20000"}
                                                                       style={{marginLeft: 10}} value={'20000'}
                                                                       onClick={this.handleObjectChange('sCapital', 'montant')}
                                                                />
                                                                <label htmlFor="radiocapital1">
                                                                    CHF 20'000.-
                                                                </label>
                                                            </div>
                                                            {/*<div className="radio radio-pink mb-2">
                                                                <input type="radio" name="radiocapital" id="radiocapital2"
                                                                       checked={this.state.sCapital.montant === "100000"}
                                                                       style={{marginLeft: 10}} value={'100000'}
                                                                       onClick={this.handleObjectChange('sCapital','montant')}
                                                                />
                                                                <label htmlFor="radiocapital2">
                                                                    CHF 100'000.-
                                                                </label>
                                                            </div>*/}
                                                            <div className="radio radio-pink mb-2">
                                                                <input type="radio" name="radiocapital"
                                                                       id="radiocapita3"
                                                                       checked={this.state.sCapital.montant === this.state.montantChoix}
                                                                       style={{marginLeft: 10}}
                                                                       value={this.state.montantChoix}
                                                                       onClick={this.handleObjectChange('sCapital', 'montant')}
                                                                />
                                                                <label htmlFor="radiocapita3">
                                                                    Plus (au choix, maximum 400'000.-)
                                                                </label>
                                                            </div>
                                                            {
                                                                this.state.sCapital.montant !== "20000" && this.state.sCapital.montant !== "100000" &&
                                                                <div className="form-group mb-2">
                                                                    <input type="number" className="form-control"
                                                                           id="nb"
                                                                           style={{width: '60%', marginLeft: 30}}
                                                                           value={this.state.montantChoix}
                                                                           onChange={this.handleChoixMontantChange('')}
                                                                    />
                                                                    <h5 style={{color: "red", marginLeft: 35}}>
                                                                        {
                                                                            parseInt(this.state.montantChoix) < 20000 ? "Le capital doit etre supérieur à 20000 CHF" :
                                                                                parseInt(this.state.montantChoix) > 400000 ? "Le capital doit etre inférieur à 400 000 CHF" :
                                                                                    parseInt(this.state.montantChoix) % 10 !== 0 ? "Le capital doit etre un multiple de 10" : ""
                                                                        }
                                                                    </h5>
                                                                </div>
                                                            }
                                                        </div>

                                                        <div className="col-lg-6">
                                                            <Label for="canton">Valeur nominale des actions ?</Label>
                                                            <div className="radio radio-pink mb-2">
                                                                <input type="radio" name="radiovalnominal"
                                                                       id="radiovalnominal1"
                                                                       checked={parseInt(this.state.sCapital.minValActions) === parseInt(this.state.sCapital.montant) / 100}
                                                                       onClick={this.handleObjectChange('sCapital', 'minValActions')}
                                                                       style={{marginLeft: 10}}
                                                                       value={(parseInt(this.state.sCapital.montant) / 100).toString()}/>
                                                                <label htmlFor="radiovalnominal1">
                                                                    {parseInt(this.state.sCapital.montant) / 100}&nbsp;
                                                                    parts sociales d'une valeur nominale de 100 CHF -.
                                                                    (standard)
                                                                </label>
                                                            </div>
                                                            <div className="radio radio-pink mb-2">
                                                                <input type="radio" name="radiovalnominal"
                                                                       id="radiovalnominal2"
                                                                       checked={parseInt(this.state.sCapital.minValActions) === parseInt(this.state.sCapital.montant) / 10}
                                                                       onClick={this.handleObjectChange('sCapital', 'minValActions')}
                                                                       style={{marginLeft: 10}}
                                                                       value={(parseInt(this.state.sCapital.montant) / 10).toString()}
                                                                />
                                                                <label htmlFor="radiovalnominal2">
                                                                    {parseInt(this.state.sCapital.montant) / 10}&nbsp;
                                                                    parts sociales d'une valeur nominale de 10 CHF.-
                                                                </label>
                                                            </div>
                                                            <div className="radio radio-pink mb-2">
                                                                <input type="radio" name="radiovalnominal"
                                                                       id="radiovalnominal3"
                                                                       checked={parseInt(this.state.sCapital.minValActions) === parseInt(this.state.sCapital.montant)}
                                                                       onClick={this.handleObjectChange('sCapital', 'minValActions')}
                                                                       style={{marginLeft: 10}}
                                                                       value={(parseInt(this.state.sCapital.montant)).toString()}
                                                                />
                                                                <label htmlFor="radiovalnominal3">
                                                                    {parseInt(this.state.sCapital.montant)}&nbsp;
                                                                    parts sociales d'une valeur nominale de 1 CHF.-
                                                                </label>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div className="row" style={{marginTop: 25}}>
                                                        <div className="col-lg-12">
                                                            <Label for="canton">Souhaitez-vous obtenir un numéro IBAN
                                                                pour le compte de
                                                                consignation via Smartco ?</Label>
                                                            <div className="radio radio-pink mb-2">
                                                                <input type="radio" name="radioiban" id="radioiban1"
                                                                       style={{marginLeft: 10}}
                                                                       onClick={this.handleRadioObjectChange("sCapital", "getIBAN", "true")}
                                                                       checked={this.state.sCapital.getIBAN === "true"}
                                                                       value={this.state.sCapital.getIBAN}
                                                                />
                                                                <label htmlFor="radioiban1">
                                                                    Oui
                                                                </label>
                                                            </div>
                                                            <div className="radio radio-pink mb-2">
                                                                <input type="radio" name="radioiban" id="radioiban2"
                                                                       style={{marginLeft: 10}}
                                                                       onClick={this.handleRadioObjectChange("sCapital", "getIBAN", "false")}
                                                                       checked={this.state.sCapital.getIBAN === "false"}
                                                                       value={this.state.sCapital.getIBAN}
                                                                />
                                                                <label htmlFor="radioiban2">
                                                                    Non (Téléchargez l’attestation de consignation de
                                                                    votre banque
                                                                    avec signature électronique qualifiée)
                                                                </label>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div className="row" style={{marginTop: 25}}>
                                                        <div className="col-lg-12">
                                                            <Label for="canton">Souhaitez-vous faire des apports en
                                                                nature ?</Label>
                                                            <div className="radio radio-pink mb-2">
                                                                <input type="radio" name="radioNa" id="radioNa1"
                                                                       style={{marginLeft: 10}}
                                                                       onClick={this.handleRadioObjectChange("sCapital", "apportsNAture", "true")}
                                                                       checked={this.state.sCapital.apportsNAture === "true"}
                                                                       value={this.state.sCapital.apportsNAture}
                                                                />
                                                                <label htmlFor="radioNa1">
                                                                    Oui
                                                                </label>
                                                            </div>
                                                            <div className="radio radio-pink mb-2">
                                                                <input type="radio" name="radioNa" id="radioiNa2"
                                                                       style={{marginLeft: 10}}
                                                                       onClick={this.handleRadioObjectChange("sCapital", "apportsNAture", "false")}
                                                                       checked={this.state.sCapital.apportsNAture === "false"}
                                                                       value={this.state.sCapital.apportsNAture}
                                                                />
                                                                <label htmlFor="radioiNa2">
                                                                    Non (le plus fréquent)
                                                                </label>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <FormGroup style={{marginTop: 20}}>
                                                        <div className="float-left">
                                                            <Button color="primary"
                                                                    onClick={() => this.setState({
                                                                        showStep2: true,
                                                                        showStep4: false
                                                                    })}
                                                                    className="btn btn-small btn-light waves-effect waves-light">
                                                                Précédent
                                                            </Button>
                                                        </div>
                                                        <div className="float-right">
                                                            <Button color="primary"
                                                                    className="btn btn-danger waves-effect waves-light">
                                                                {this.state.loading ?
                                                                    <div
                                                                        className="spinner-border avatar-xs text-white m-1"
                                                                        role="status"></div> : 'Continuer'
                                                                }
                                                            </Button>
                                                        </div>
                                                    </FormGroup>
                                                </AvForm>
                                            }

                                            {
                                                this.state.showStep5 &&

                                                <div className="col-sm-12">


                                                    <h4 className="mb-3">Qui est(sont) l(les)’associé(s) de votre
                                                        société ?</h4>
                                                    <p>S’il y a plusieurs associés vous pouvez cliquer sur "Ajouter un
                                                        autre associé" en bas de page. </p>


                                                    <div className="row">
                                                        <div className="col-lg-12">


                                                            <AvForm
                                                                onValidSubmit={(event, values) => this.validerAssocies(event, values)}>
                                                                {
                                                                    this.state.sActionnaireMoral.map((item, key) => (
                                                                        <div>

                                                                            <div className="row">
                                                                                <div className="col-lg-6">
                                                                                    <AvGroup className="mb-3">
                                                                                        <Label for="forme">L'associé
                                                                                            est</Label>
                                                                                        <AvInput type="select"
                                                                                                 name={"formeMo" + key}
                                                                                                 id={"formeMo" + key}
                                                                                                 onChange={(event) => this.handleTypeTmpChange(key, event.target.value)}
                                                                                                 value={this.state.sActionnaireMoral[key].type}>
                                                                                            <option
                                                                                                value="Un particulier">Un
                                                                                                particulier
                                                                                            </option>
                                                                                            <option
                                                                                                value="Une entité juridique">Une
                                                                                                entité juridique
                                                                                            </option>
                                                                                        </AvInput>
                                                                                    </AvGroup>
                                                                                </div>
                                                                                <div className="col-lg-6">
                                                                                    {
                                                                                        item.typeTmp === "Un particulier" ?
                                                                                            <AvGroup className="mb-3">
                                                                                                <Label
                                                                                                    for="role">Civilité</Label>
                                                                                                <AvInput type="select"
                                                                                                         name={"civiliteMo" + key}
                                                                                                         id={"civiliteMo" + key}
                                                                                                         value={this.state.sActionnaireMoral[key].gender}>
                                                                                                    <option
                                                                                                        value="M.">M.
                                                                                                    </option>
                                                                                                    <option
                                                                                                        value="Mme">Mme
                                                                                                    </option>
                                                                                                </AvInput>
                                                                                            </AvGroup> :
                                                                                            <AvGroup className="mb-3">
                                                                                                <Label for="role">Forme
                                                                                                    social</Label>
                                                                                                <AvInput type="select"
                                                                                                         name={"formeSo" + key}
                                                                                                         id={"formeSo" + key}
                                                                                                         value={this.state.sActionnaireMoral[key].formeSocial}>
                                                                                                    <option
                                                                                                        value="SARL">SARL
                                                                                                    </option>
                                                                                                    <option
                                                                                                        value="SA">SA
                                                                                                    </option>
                                                                                                </AvInput>
                                                                                            </AvGroup>
                                                                                    }

                                                                                </div>
                                                                            </div>
                                                                            {
                                                                                item.typeTmp !== "Un particulier" &&
                                                                                [this.state.sActionnaireMoral[key].representant.map((rep, keyrep) => (
                                                                                    <div className="row">
                                                                                        <div className="col-lg-6">
                                                                                            <AvGroup className="mb-3">
                                                                                                <Label for="email">Nom
                                                                                                    du
                                                                                                    représentant</Label>
                                                                                                <AvInput type="text"
                                                                                                         name={"repnom" + key + "_" + keyrep}
                                                                                                         id={"repnom" + key + "_" + keyrep}
                                                                                                         value={this.state.sActionnaireMoral[key].representant[keyrep].rep_firstname}
                                                                                                         required/>
                                                                                                <AvFeedback>Ce champs
                                                                                                    est
                                                                                                    obligatoire</AvFeedback>
                                                                                            </AvGroup>
                                                                                        </div>
                                                                                        <div className="col-lg-6">
                                                                                            <AvGroup className="mb-3">
                                                                                                <Label for="email">Prénom
                                                                                                    du
                                                                                                    représentant</Label>
                                                                                                <AvInput type="text"
                                                                                                         name={"repprenom" + key + "_" + keyrep}
                                                                                                         id={"repprenom" + key + "_" + keyrep}
                                                                                                         value={this.state.sActionnaireMoral[key].representant[keyrep].rep_lastname}
                                                                                                         required/>
                                                                                                <AvFeedback>Ce champs
                                                                                                    est
                                                                                                    obligatoire</AvFeedback>
                                                                                            </AvGroup>
                                                                                        </div>
                                                                                    </div>
                                                                                )),

                                                                                    <div className="row">
                                                                                        <div className="col-lg-12">
                                                                                            <div
                                                                                                className="float-right">
                                                                                                <Button color="primary"
                                                                                                        onClick={this.addRepresentant(key)}
                                                                                                        className="btn btn-danger waves-effect waves-light">
                                                                                                    Ajouter un autre
                                                                                                    représentant
                                                                                                </Button>
                                                                                            </div>
                                                                                        </div>
                                                                                    </div>
                                                                                ]
                                                                            }
                                                                            <div className="row">
                                                                                {
                                                                                    item.typeTmp === "Un particulier" ?
                                                                                        [
                                                                                            <div className="col-lg-6">
                                                                                                <AvGroup
                                                                                                    className="mb-3">
                                                                                                    <Label
                                                                                                        for="nom">Nom</Label>
                                                                                                    <AvInput type="text"
                                                                                                             name={"firstnameMo" + key}
                                                                                                             id={"firstnameMo" + key}
                                                                                                             value={this.state.sActionnaireMoral[key].firstname}
                                                                                                             required/>
                                                                                                    <AvFeedback>Ce
                                                                                                        champs
                                                                                                        est
                                                                                                        obligatoire</AvFeedback>
                                                                                                </AvGroup>
                                                                                            </div>,
                                                                                            <div className="col-lg-6">
                                                                                                <AvGroup
                                                                                                    className="mb-3">
                                                                                                    <Label
                                                                                                        for="prenom">Prénom</Label>
                                                                                                    <AvInput type="text"
                                                                                                             name={"lastnameMo" + key}
                                                                                                             id={"lastnameMo" + key}
                                                                                                             value={this.state.sActionnaireMoral[key].lastname}
                                                                                                             required/>
                                                                                                    <AvFeedback>Ce
                                                                                                        champs
                                                                                                        est
                                                                                                        obligatoire</AvFeedback>
                                                                                                </AvGroup>
                                                                                            </div>

                                                                                        ] :

                                                                                        <div className="col-lg-12">
                                                                                            <AvGroup className="mb-3">
                                                                                                <Label for="prenom">Nom
                                                                                                    de
                                                                                                    l'entité
                                                                                                    juridique</Label>
                                                                                                <AvInput type="text"
                                                                                                         name={"ejname" + key}
                                                                                                         id={"ejname" + key}
                                                                                                         value={this.state.sActionnaireMoral[key].ej_name}
                                                                                                         required/>
                                                                                                <AvFeedback>Ce champs
                                                                                                    est
                                                                                                    obligatoire</AvFeedback>
                                                                                            </AvGroup>
                                                                                        </div>

                                                                                }


                                                                            </div>
                                                                            <div className="row">
                                                                                <div className="col-lg-6">
                                                                                    <AvGroup className="mb-3">
                                                                                        <Label for="email">Email</Label>
                                                                                        <AvInput type="email"
                                                                                                 name={"emailMo" + key}
                                                                                                 id={"emailMo" + key}
                                                                                                 value={this.state.sActionnaireMoral[key].email}
                                                                                                 required/>
                                                                                        <AvFeedback>Email
                                                                                            invalide</AvFeedback>
                                                                                    </AvGroup>
                                                                                </div>
                                                                                <div className="col-lg-6">
                                                                                    <AvGroup className="mb-3">
                                                                                        <Label for="password">Numéro de téléphone</Label>
                                                                                        <PhoneInput
                                                                                            defaultCountry={'fr'}
                                                                                            value={this.state.sActionnaireMoral[key].phone}
                                                                                            onChange={(value) => this.handleOnChangePhone(value, key, "Mora")}
                                                                                            inputStyle={{
                                                                                                width: "inherit",
                                                                                                height: 37
                                                                                            }}/>
                                                                                    </AvGroup>
                                                                                </div>
                                                                            </div>

                                                                            {
                                                                                item.typeTmp === "Un particulier" &&
                                                                                <div className="row">
                                                                                    <div className="col-lg-6">
                                                                                        <AvGroup className="mb-3">
                                                                                            <Label for="datnaiss">Date
                                                                                                de
                                                                                                naissance</Label>
                                                                                            <AvInput type="date"
                                                                                                     name={"birthdayMo" + key}
                                                                                                     id={"birthdayMo" + key}
                                                                                                     value={this.state.sActionnaireMoral[key].birthday}
                                                                                                     required/>
                                                                                            <AvFeedback>Date
                                                                                                invalide</AvFeedback>
                                                                                        </AvGroup>
                                                                                    </div>
                                                                                    <div className="col-lg-6">
                                                                                        <AvGroup className="mb-3">
                                                                                            <Label
                                                                                                for="nationality">Nationnalité</Label>
                                                                                            <AvInput type="text"
                                                                                                     placeholder="origine (Si Suisse)"
                                                                                                     name={"nationalityMo" + key}
                                                                                                     id={"nationalityMo" + key}
                                                                                                     value={this.state.sActionnaireMoral[key].nationality}
                                                                                                     required/>
                                                                                            <AvFeedback>Ce champs est
                                                                                                obligatoire</AvFeedback>
                                                                                        </AvGroup>
                                                                                    </div>
                                                                                </div>
                                                                            }

                                                                            <h4 className="mb-3">
                                                                                {
                                                                                    item.typeTmp === "Un particulier" ? "Adresse de l'associé" : "Adresse du siège social"
                                                                                }
                                                                            </h4>

                                                                            <div className="row">
                                                                                <div className="col-lg-6">
                                                                                    <AvGroup className="mb-3">
                                                                                        <Label
                                                                                            for="adress">Adresse</Label>
                                                                                        <AvInput type="text"
                                                                                                 name={"adressMo" + key}
                                                                                                 id={"adressMo" + key}
                                                                                                 value={this.state.sActionnaireMoral[key].adress}
                                                                                                 required/>
                                                                                        <AvFeedback>Ce champs est
                                                                                            obligatoire</AvFeedback>
                                                                                    </AvGroup>
                                                                                </div>
                                                                                <div className="col-lg-6">
                                                                                    <AvGroup className="mb-3">
                                                                                        <Label
                                                                                            for="adress">Ville</Label>
                                                                                        <AvInput type="text"
                                                                                                 name={"villeMo" + key}
                                                                                                 id={"villeMo" + key}
                                                                                                 value={this.state.sActionnaireMoral[key].ville}
                                                                                                 required/>
                                                                                        <AvFeedback>Ce champs est
                                                                                            obligatoire</AvFeedback>
                                                                                    </AvGroup>
                                                                                </div>
                                                                            </div>

                                                                            <div className="row">
                                                                                <div className="col-lg-6">
                                                                                    <AvGroup className="mb-3">
                                                                                        <Label for="postalcode">Code
                                                                                            postal</Label>
                                                                                        <AvInput type="number"
                                                                                                 name={"postalCodeMo" + key}
                                                                                                 id={"postalCodeMo" + key}
                                                                                                 value={this.state.sActionnaireMoral[key].postalCode}
                                                                                                 required/>
                                                                                        <AvFeedback>Code postal
                                                                                            invalide</AvFeedback>
                                                                                    </AvGroup>
                                                                                </div>
                                                                                <div className="col-lg-6">
                                                                                    <AvGroup className="mb-3">
                                                                                        <Label for="pays">Pays</Label>
                                                                                        <AvInput type="select"
                                                                                                 name={"paysMo" + key}
                                                                                                 id={"paysMo" + key}
                                                                                                 value={this.state.sActionnaireMoral[key].pays}
                                                                                                 required>
                                                                                            {
                                                                                                countryList.map((item, key) => (
                                                                                                    <option
                                                                                                        value={item.Name}>{item.Name}</option>
                                                                                                ))
                                                                                            }
                                                                                        </AvInput>
                                                                                        <AvFeedback>Ce champs est
                                                                                            obligatoire</AvFeedback>
                                                                                    </AvGroup>
                                                                                </div>
                                                                            </div>
                                                                            <div className="row">
                                                                                <div className="col-lg-6">
                                                                                    <AvGroup className="mb-3">
                                                                                        <Label for="adress">Nombre
                                                                                            d'actions</Label>
                                                                                        <AvInput type="number"
                                                                                                 name={"nbactionsEj" + key}
                                                                                                 id={"nbactionsEj" + key}
                                                                                                 value={this.state.sActionnaireMoral[key].nbActions}
                                                                                                 required/>
                                                                                        <AvFeedback>Ce champs est
                                                                                            obligatoire</AvFeedback>
                                                                                    </AvGroup>
                                                                                </div>
                                                                            </div>

                                                                            {
                                                                                item.typeTmp === "Un particulier" &&
                                                                                <div className="row"
                                                                                     style={{marginTop: 25}}>
                                                                                    <div className="col-lg-12">
                                                                                        <h4 className="mb-3">
                                                                                            L’associé est-il également
                                                                                            gérant et Président de la
                                                                                            société ?
                                                                                        </h4>
                                                                                        <div
                                                                                            className="radio radio-pink mb-2">
                                                                                            <input type="radio"
                                                                                                   name={"radioisPres" + key}
                                                                                                   id={"radioisPres1" + key}
                                                                                                   style={{marginLeft: 10}}
                                                                                                   onClick={this.handleRadioChange("sActionnaireMoral", "isAdministrator", key, "true")}
                                                                                                   checked={this.state.sActionnaireMoral[key].isAdministrator === "true"}
                                                                                                   value={this.state.sActionnaireMoral[key].isAdministrator}/>
                                                                                            <label
                                                                                                htmlFor={"radioisPres1" + key}>
                                                                                                Oui
                                                                                            </label>
                                                                                        </div>
                                                                                        <div
                                                                                            className="radio radio-pink mb-2">
                                                                                            <input type="radio"
                                                                                                   name={"radioisPres" + key}
                                                                                                   id={"radioisPres2" + key}
                                                                                                   style={{marginLeft: 10}}
                                                                                                   onClick={this.handleRadioChange("sActionnaireMoral", "isAdministrator", key, "false")}
                                                                                                   checked={this.state.sActionnaireMoral[key].isAdministrator === "false"}
                                                                                                   value={this.state.sActionnaireMoral[key].isAdministrator}/>
                                                                                            <label
                                                                                                htmlFor={"radioisPres2" + key}>
                                                                                                Non
                                                                                                {/*&nbsp;&nbsp;&nbsp;&nbsp;
                                                                                                <Button color="primary"
                                                                                                        className="btn btn-xs btn-light waves-effect waves-light">
                                                                                                    je souhaite nommer
                                                                                                    un gérant domicilié
                                                                                                    en Suisse
                                                                                                </Button>*/}
                                                                                            </label>
                                                                                        </div>
                                                                                    </div>
                                                                                </div>
                                                                            }


                                                                            {
                                                                                item.typeTmp === "Un particulier" ?
                                                                                    <div className="row"
                                                                                         style={{marginTop: 15}}>
                                                                                        <div className="col-lg-12">
                                                                                            <Label for="canton">L'associé
                                                                                                a-t-il une
                                                                                                SuisseID ?</Label>
                                                                                            <div
                                                                                                className="radio radio-pink mb-2">
                                                                                                <input type="radio"
                                                                                                       name={"radioiSuis" + key}
                                                                                                       id={"radioiSuis1" + key}
                                                                                                       style={{marginLeft: 10}}
                                                                                                       onClick={this.handleRadioChange("sActionnaireMoral", "isHaveSuisseId", key, "true")}
                                                                                                       checked={this.state.sActionnaireMoral[key].isHaveSuisseId === "true"}
                                                                                                       value={this.state.sActionnaireMoral[key].isHaveSuisseId}/>
                                                                                                <label
                                                                                                    htmlFor={"radioiSuis1" + key}>
                                                                                                    Oui
                                                                                                </label>
                                                                                            </div>
                                                                                            <div
                                                                                                className="radio radio-pink mb-2">
                                                                                                <input type="radio"
                                                                                                       name={"radioiSuis" + key}
                                                                                                       id={"radioiSuis2" + key}
                                                                                                       style={{marginLeft: 10}}
                                                                                                       onClick={this.handleRadioChange("sActionnaireMoral", "isHaveSuisseId", key, "false")}
                                                                                                       checked={this.state.sActionnaireMoral[key].isHaveSuisseId === "false"}
                                                                                                       value={this.state.sActionnaireMoral[key].isHaveSuisseId}/>
                                                                                                <label
                                                                                                    htmlFor={"radioiSuis2" + key}>
                                                                                                    Non : Identification
                                                                                                    par vidéo
                                                                                                    au moyen de votre
                                                                                                    passeport
                                                                                                </label>
                                                                                            </div>
                                                                                        </div>
                                                                                    </div> :

                                                                                    <div className="row"
                                                                                         style={{marginTop: 15}}>
                                                                                        <div className="col-lg-12">
                                                                                            <Label for="canton">Est-ce
                                                                                                que le(s)
                                                                                                représentant(s) a(ont)
                                                                                                une SuisseID ? </Label>
                                                                                            <div
                                                                                                className="radio radio-pink mb-2">
                                                                                                <input type="radio"
                                                                                                       name={"radioiSuis" + key}
                                                                                                       id={"radioiSuis1" + key}
                                                                                                       style={{marginLeft: 10}}
                                                                                                       onClick={this.handleRadioChange("sActionnaireMoral", "isResresentantsHaveSuisseID", key, "true")}
                                                                                                       checked={this.state.sActionnaireMoral[key].isResresentantsHaveSuisseID === "true"}
                                                                                                       value={this.state.sActionnaireMoral[key].isResresentantsHaveSuisseID}/>
                                                                                                <label
                                                                                                    htmlFor={"radioiSuis1" + key}>
                                                                                                    Oui
                                                                                                </label>
                                                                                            </div>
                                                                                            <div
                                                                                                className="radio radio-pink mb-2">
                                                                                                <input type="radio"
                                                                                                       name={"radioiSuis" + key}
                                                                                                       id={"radioiSuis2" + key}
                                                                                                       style={{marginLeft: 10}}
                                                                                                       onClick={this.handleRadioChange("sActionnaireMoral", "isResresentantsHaveSuisseID", key, "false")}
                                                                                                       checked={this.state.sActionnaireMoral[key].isResresentantsHaveSuisseID === "false"}
                                                                                                       value={this.state.sActionnaireMoral[key].isResresentantsHaveSuisseID}/>
                                                                                                <label
                                                                                                    htmlFor={"radioiSuis2" + key}>
                                                                                                    Non : Identification
                                                                                                    par vidéo
                                                                                                    au moyen de votre
                                                                                                    passeport
                                                                                                </label>
                                                                                            </div>
                                                                                        </div>
                                                                                        <div className="col-lg-12">
                                                                                            <p style={{marginTop: 15}}>Si
                                                                                                l’actionnaire est une
                                                                                                société étrangère vous
                                                                                                devez télécharger
                                                                                                l’extrait du registre du
                                                                                                commerce démontrant que
                                                                                                1) la société existe et
                                                                                                2) qui sont les
                                                                                                représentants autorisés
                                                                                                de la société
                                                                                                dûment légalisé et
                                                                                                apostillé.</p>
                                                                                            <div className="float-left">
                                                                                                <Button color="primary"
                                                                                                        className="btn btn-light waves-effect waves-light">
                                                                                                    Télécharger le
                                                                                                    document
                                                                                                </Button>
                                                                                            </div>

                                                                                        </div>
                                                                                    </div>
                                                                            }
                                                                            <div style={{
                                                                                marginTop: 20,
                                                                                marginBottom: 20,
                                                                                height: 2,
                                                                                backgroundColor: "#C0C0C0",
                                                                                marginLeft: 40,
                                                                                marginRight: 40
                                                                            }}/>
                                                                        </div>
                                                                    ))
                                                                }

                                                                <div className="row" style={{marginTop: 15}}>
                                                                    <div className="col-lg-12">
                                                                        <div className="float-left">
                                                                            <Button color="primary"
                                                                                    onClick={this.addNewAssocie}
                                                                                    className="btn btn-info waves-effect waves-light">
                                                                                Ajouter un autre associé
                                                                            </Button>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <FormGroup style={{marginTop: 20}}>
                                                                    <div className="float-left">
                                                                        <Button color="primary"
                                                                                onClick={() => this.setState({
                                                                                    showStep5: false,
                                                                                    showStep4: true
                                                                                })}
                                                                                className="btn btn-light waves-effect waves-light">
                                                                            Précedent
                                                                        </Button>
                                                                    </div>
                                                                    <div className="float-right">
                                                                        <Button color="primary"
                                                                                className="btn btn-danger waves-effect waves-light">
                                                                            Continuer
                                                                        </Button>
                                                                    </div>
                                                                </FormGroup>

                                                            </AvForm>

                                                        </div>
                                                    </div>
                                                </div>
                                            }
                                            {
                                                this.state.showStep6 &&
                                                <div className="col-sm-12">


                                                    <h4 className="mb-3">Qui est(sont) le(les) gérant(s) de votre
                                                        société ?</h4>
                                                    <p>Si l'un des associés est déjà gérant et domicilié en Suisse, il
                                                        n'est pas nécessaire d'en rajouter un.
                                                        Si vous souhaitez ajoutez un gérant et Président ou souhaitez
                                                        avoir un gérant domicilié en Suisse,
                                                        vous pouvez répondre aux questions ci-dessous. </p>

                                                    <div className="row">
                                                        <div className="col-lg-12">

                                                            <AvForm
                                                                onValidSubmit={(event, values) => this.validerGerants(event, values)}>
                                                                {
                                                                    this.state.sActionnairePhy.map((item, key) => (
                                                                        <div>

                                                                            <div className="row">
                                                                                <div className="col-lg-12">
                                                                                    <AvGroup className="mb-3">
                                                                                        <Label
                                                                                            for="role">Civilité</Label>
                                                                                        <AvInput type="select"
                                                                                                 name={"civilite" + key}
                                                                                                 id={"civilite" + key}
                                                                                                 value={this.state.sActionnairePhy[key].gender}>
                                                                                            <option value="M.">M.
                                                                                            </option>
                                                                                            <option value="Mme">Mme
                                                                                            </option>
                                                                                        </AvInput>
                                                                                    </AvGroup>
                                                                                </div>
                                                                            </div>
                                                                            <div className="row">
                                                                                <div className="col-lg-6">
                                                                                    <AvGroup className="mb-3">
                                                                                        <Label for="nom">Nom</Label>
                                                                                        <AvInput type="text"
                                                                                                 name={"firstname" + key}
                                                                                                 id={"firstname" + key}
                                                                                                 value={this.state.sActionnairePhy[key].firstname}
                                                                                                 required/>
                                                                                        <AvFeedback>Ce champs est
                                                                                            obligatoire</AvFeedback>
                                                                                    </AvGroup>
                                                                                </div>
                                                                                <div className="col-lg-6">
                                                                                    <AvGroup className="mb-3">
                                                                                        <Label
                                                                                            for="prenom">Prénom</Label>
                                                                                        <AvInput type="text"
                                                                                                 name={"lastname" + key}
                                                                                                 id={"lastname" + key}
                                                                                                 value={this.state.sActionnairePhy[key].lastname}
                                                                                                 required/>
                                                                                        <AvFeedback>Ce champs est
                                                                                            obligatoire</AvFeedback>
                                                                                    </AvGroup>
                                                                                </div>
                                                                            </div>
                                                                            <div className="row">
                                                                                <div className="col-lg-6">
                                                                                    <AvGroup className="mb-3">
                                                                                        <Label for="email">Email</Label>
                                                                                        <AvInput type="email"
                                                                                                 name={"email" + key}
                                                                                                 id={"email" + key}
                                                                                                 value={this.state.sActionnairePhy[key].email}
                                                                                                 required/>
                                                                                        <AvFeedback>Email
                                                                                            invalide</AvFeedback>
                                                                                    </AvGroup>
                                                                                </div>
                                                                                <div className="col-lg-6">
                                                                                    <AvGroup className="mb-3">
                                                                                        <Label for="password">Numéro de
                                                                                            téléphone</Label>
                                                                                        <PhoneInput
                                                                                            defaultCountry={'fr'}
                                                                                            value={this.state.sActionnairePhy[key].phone}
                                                                                            onChange={(value) => this.handleOnChangePhone(value, key, "phy")}
                                                                                            inputStyle={{
                                                                                                width: "inherit",
                                                                                                height: 37
                                                                                            }}/>
                                                                                    </AvGroup>
                                                                                </div>
                                                                            </div>

                                                                            <div className="row">
                                                                                <div className="col-lg-6">
                                                                                    <AvGroup className="mb-3">
                                                                                        <Label for="datnaiss">Date de
                                                                                            naissance</Label>
                                                                                        <AvInput type="date"
                                                                                                 name={"birthday" + key}
                                                                                                 id={"birthday" + key}
                                                                                                 value={this.state.sActionnairePhy[key].birthday}
                                                                                                 required/>
                                                                                        <AvFeedback>Ce champs est
                                                                                            obligatoire</AvFeedback>
                                                                                    </AvGroup>
                                                                                </div>
                                                                                <div className="col-lg-6">
                                                                                    <AvGroup className="mb-3">
                                                                                        <Label
                                                                                            for="nationality">Nationnalité</Label>
                                                                                        <AvInput type="text"
                                                                                                 placeholder="Origine si Suisse"
                                                                                                 name={"nationality" + key}
                                                                                                 id={"nationality" + key}
                                                                                                 value={this.state.sActionnairePhy[key].nationality}
                                                                                                 required/>
                                                                                        <AvFeedback>Ce champs est
                                                                                            obligatoire</AvFeedback>
                                                                                    </AvGroup>
                                                                                </div>
                                                                            </div>

                                                                            <h4>Adresse du gérant:</h4>

                                                                            <div className="row">
                                                                                <div className="col-lg-6">
                                                                                    <AvGroup className="mb-3">
                                                                                        <Label
                                                                                            for="adress">Adresse</Label>
                                                                                        <AvInput type="text"
                                                                                                 name={"adress" + key}
                                                                                                 id={"adress" + key}
                                                                                                 value={this.state.sActionnairePhy[key].adress}
                                                                                                 required/>
                                                                                        <AvFeedback>Ce champs est
                                                                                            obligatoire</AvFeedback>
                                                                                    </AvGroup>
                                                                                </div>
                                                                                <div className="col-lg-6">
                                                                                    <AvGroup className="mb-3">
                                                                                        <Label
                                                                                            for="adress">Ville</Label>
                                                                                        <AvInput type="text"
                                                                                                 name={"ville" + key}
                                                                                                 id={"ville" + key}
                                                                                                 value={this.state.sActionnairePhy[key].ville}
                                                                                                 required/>
                                                                                        <AvFeedback>Ce champs est
                                                                                            obligatoire</AvFeedback>
                                                                                    </AvGroup>
                                                                                </div>
                                                                            </div>

                                                                            <div className="row">
                                                                                <div className="col-lg-6">
                                                                                    <AvGroup className="mb-3">
                                                                                        <Label for="postalcode">Code
                                                                                            postal</Label>
                                                                                        <AvInput type="number"
                                                                                                 name={"postalCode" + key}
                                                                                                 id={"postalCode" + key}
                                                                                                 value={this.state.sActionnairePhy[key].postalCode}
                                                                                                 required/>
                                                                                        <AvFeedback>Code postal
                                                                                            invalide</AvFeedback>
                                                                                    </AvGroup>
                                                                                </div>
                                                                            </div>
                                                                            <div className="row"
                                                                                 style={{marginTop: 15}}>
                                                                                <div className="col-lg-12">
                                                                                    <Label for="canton">Le gérant a-t-il
                                                                                        une SuisseID ?</Label>
                                                                                    <div
                                                                                        className="radio radio-pink mb-2">
                                                                                        <input type="radio"
                                                                                               name={"radioiSuiAd" + key}
                                                                                               id={"radioiSuiAd1" + key}
                                                                                               style={{marginLeft: 10}}
                                                                                               onClick={this.handleRadioChange("sActionnairePhy", "isHaveSuisseId", key, "true")}
                                                                                               checked={this.state.sActionnairePhy[key].isHaveSuisseId === "true"}
                                                                                               value={this.state.sActionnairePhy[key].isHaveSuisseId}/>
                                                                                        <label
                                                                                            htmlFor={"radioiSuiAd1" + key}>
                                                                                            Oui
                                                                                        </label>
                                                                                    </div>
                                                                                    <div
                                                                                        className="radio radio-pink mb-2">
                                                                                        <input type="radio"
                                                                                               name={"radioiSuiAd" + key}
                                                                                               id={"radioiSuiAd2" + key}
                                                                                               style={{marginLeft: 10}}
                                                                                               onClick={this.handleRadioChange("sActionnairePhy", "isHaveSuisseId", key, "false")}
                                                                                               checked={this.state.sActionnairePhy[key].isHaveSuisseId === "false"}
                                                                                               value={this.state.sActionnairePhy[key].isHaveSuisseId}/>
                                                                                        <label
                                                                                            htmlFor={"radioiSuiAd2" + key}>
                                                                                            Non : Identification par
                                                                                            vidéo au moyen de votre
                                                                                            passeport
                                                                                        </label>
                                                                                    </div>
                                                                                </div>
                                                                            </div>

                                                                            <div style={{
                                                                                marginTop: 20,
                                                                                marginBottom: 20,
                                                                                height: 2,
                                                                                backgroundColor: "#C0C0C0",
                                                                                marginLeft: 40,
                                                                                marginRight: 40
                                                                            }}/>

                                                                        </div>
                                                                    ))
                                                                }

                                                                <div className="row" style={{marginTop: 15}}>
                                                                    <div className="col-lg-12">
                                                                        <div className="float-left">
                                                                            <Button color="primary"
                                                                                    onClick={this.addNewGerant}
                                                                                    className="btn btn-info waves-effect waves-light">
                                                                                Ajouter un autre gérant
                                                                            </Button>
                                                                        </div>
                                                                    </div>
                                                                </div>


                                                                <FormGroup style={{marginTop: 20}}>
                                                                    <div className="float-left">
                                                                        <Button color="primary"
                                                                                onClick={() => this.setState({
                                                                                    showStep6: false,
                                                                                    showStep5: true
                                                                                })}
                                                                                className="btn btn-light waves-effect waves-light">
                                                                            Précedent
                                                                        </Button>
                                                                    </div>
                                                                    <div className="float-right">
                                                                        <Button color="primary"
                                                                                className="btn btn-danger waves-effect waves-light">
                                                                            Continuer
                                                                        </Button>
                                                                    </div>
                                                                </FormGroup>


                                                            </AvForm>

                                                        </div>
                                                    </div>
                                                </div>


                                            }
                                            {
                                                this.state.showStep7 &&
                                                <div className="row">
                                                    <div className="col-lg-12">
                                                        <h3>Expert-comptable</h3>
                                                        <p>La gestion de votre entreprise implique de suivre votre
                                                            trésorerie, déclarer votre TVA,
                                                            passer vos notes de frais, etc. Un expert-comptable sera
                                                            nécessaire pour établir votre
                                                            bilan annuel.</p>
                                                        <h3 style={{marginTop: 20}}>Offre de gestion SmartCo</h3>
                                                        <p>Votre chiffre d’affaires et vos dépenses sont directement
                                                            synchronisés depuis votre compte
                                                            en banque vers notre plateforme de gestion. Nos experts sont
                                                            disponibles pour vous accompagner
                                                            au quotidien. Inclus dans l’offre:</p>
                                                        <ul>
                                                            <li>Suivi de vos dépenses et de votre chiffre d’affaires en
                                                                temps réel.
                                                            </li>
                                                            <li>Synchronisation automatique avec votre banque.</li>
                                                            <li>Déclarations de TVA</li>
                                                            <li>Assistance par des experts (téléphone, email)</li>
                                                            <li>Création illimitée de devis et factures</li>
                                                            <li>Gestion des notes de frais et indemnités kilométriques
                                                            </li>
                                                            <li>En option : bilan annuel avec un expert-comptable
                                                                partenaire
                                                            </li>
                                                        </ul>
                                                        <div className="radio radio-pink mb-1" style={{marginTop: 20}}>
                                                            <input type="radio" name="radioexp" id="radioexp1"
                                                                   style={{marginLeft: 10}}
                                                                   onClick={()=>{this.setState({expertSmartCo:"true"})}}
                                                                   checked={this.state.expertSmartCo === "true"}
                                                                   value={this.state.expertSmartCo}
                                                            />
                                                            <label htmlFor="radioexp1">
                                                                Oui, je souhaite gérer mon entreprise avec un
                                                                expert-comptable partenaire de Smartco
                                                            </label>
                                                        </div>
                                                        <div className="radio radio-pink mb-2">
                                                            <input type="radio" name="radioexp" id="radioexp2"
                                                                   style={{marginLeft: 10}}
                                                                   onClick={()=>{this.setState({expertSmartCo:"false"})}}
                                                                   checked={this.state.expertSmartCo === "false"}
                                                                   value={this.state.expertSmartCo}
                                                            />
                                                            <label htmlFor="radioexp2">
                                                                Non merci, j'ai déjà un expert-comptable
                                                            </label>
                                                        </div>
                                                        <div className="row">
                                                            <div className="col-md-12">
                                                                <div className="float-left">
                                                                    <Button color="primary" onClick={() => {
                                                                        this.setState({
                                                                            showStep7: false,
                                                                            showStep6: true
                                                                        })
                                                                    }}
                                                                            className="btn btn-light waves-effect waves-light">
                                                                        Précédent
                                                                    </Button>
                                                                </div>
                                                                <div className="float-right">
                                                                    <Button color="primary" onClick={this.saveSociety}
                                                                            className="btn btn-danger waves-effect waves-light">
                                                                        {
                                                                            this.state.loading ?
                                                                                <div
                                                                                    className="spinner-border avatar-xs text-white m-1"
                                                                                    role="status"></div> : 'Confirmer la création'
                                                                        }
                                                                    </Button>
                                                                </div>
                                                            </div>
                                                        </div>

                                                    </div>
                                                </div>
                                            }


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

export default newSuisseSARLEntreprise;