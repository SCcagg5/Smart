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


class newEntreprise extends Component {


    state = {
        loading: false,
        isMenuOpened: false,
        activeMenuItem: 'item-gestion',
        openAlert: false,
        alertMessage: '',
        alertType: '',
        selectedPays:'France',

        showStep1: true,
        showStep2: false,
        showStep3: false,
        showStep4: false,
        showStep5: false,
        showStep6: false,

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
            montant: '50000',
            montantNouveau: '50000',
            minValActions: '500',
            minValActionsAncien:'500',
            valeurNominal:'',
            getIBAN: 'false'
        },
        montantChoix:'',
        LINK_Contract_Sociétés: {
            id: '',
            id_contrat_mutuelle: '',
            id_contrat_prevoyance: '',
        },
        sSiege: {
            adress: '',
            postalCode: '',
            pays: '',
            ville: '',
            canton: '',
            isPropreLocaux: 'true',
        },
        sActionnairePhy:[],
        sActionnaireMoral:[],
        nbActPhys: '',
        nbActMorales: '',
        expertSmartCo:false,
        sAssociate: {
            type: '',
            ej_name: '',
            formeSocial: '',
            rep_firstname: '',
            rep_lastname: '',
            adress: '',
            postalCode: '',
            pays: '',
            isHaveSuisseId: '',
        },
        sAdministrator: {
            email: '',
            phone: '',
            type: '',
            gender: '',
            firstname: '',
            lastname: '',
            adress: '',
            postalCode: '',
            pays: '',
            birthday: '',
            nationality: '',
            isHaveSuisseId: '',
        },
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
            [name]:event.target.value
        })
    };

    handleObjectChange = (object, name) => event => {
        if(name === "montant"){
            let objCopy = this.state[object];
            objCopy[name] = event.target.value;
            objCopy['minValActions'] = (parseInt(event.target.value)/100).toString();
            this.setState({
                [object]: objCopy
            });
        }else{
            let objCopy = this.state[object];
            objCopy[name] = event.target.value;
            this.setState({
                [object]: objCopy
            });
        }
    };

    handleChoixMontantChange = (x) => event => {
        if(event.target.value === "50000" || event.target.value === "100000"){
            let objCopy = this.state.sCapital;
            objCopy.montant = (event.target.value).toString();
            objCopy.minValActions = (parseInt(event.target.value)/100).toString();
            this.setState({
                montantChoix:"",
                sCapital:objCopy
            })
        }else{
            let objCopy = this.state.sCapital;
            objCopy.montant = (event.target.value).toString();
            objCopy.minValActions = (parseInt(event.target.value)/100).toString();
            this.setState({
                montantChoix:(event.target.value).toString(),
                sCapital:objCopy
            })
        }
    };



    saveStep1 = (event, values) => {
        let arrayOfActPhy = [];
        let arrayOfActMora = [];
        let nb1 = values.snbactphy;
        let nb2 = values.snbactmora;

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
                    pays: 'France',
                    ville:'',
                    birthday: '',
                    nationality: '',
                    nbActions: '',
                    isAdministrator: 'false',
                    isHaveSuisseId: 'false',
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
                    type: 'Une entité morale',
                    gender: 'SA',
                    firstname: '',
                    lastname: '',
                    adress: '',
                    postalCode: '',
                    pays: 'France',
                    ville:'',
                    birthday: '',
                    nationality: '',
                    nbActions: '',
                    isAdministrator: 'false',
                    isHaveSuisseId: 'false',
                }
            );
        }
        this.setState({
            sName: values.sname,
            sBut: values.sbut,
            representant: values.srep,
            nbActPhys: values.snbactphy,
            nbActMorales: values.snbactmora,
            sActionnairePhy: arrayOfActPhy,
            sActionnaireMoral: arrayOfActMora,
            showStep1: false,
            showStep2: true,
        });
    };

    saveStep2 = (event, values) => {
        this.setState({
            sSiege: {
                adress: values.adress,
                postalCode: values.postalcode,
                pays: values.pays,
                ville: values.ville,
                canton: values.canton,
                isPropreLocaux: 'true',
            },
            showStep2: false,
            showStep3: true,
        });
    };

    saveStep3 = (event, values) => {
        this.setState({
            siret:values.siret,
            siren:values.siren,
            nombre_employes:values.nbemploye,
            convention_collective_code:values.codecollective,
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
        objCopy.getIBAN = "true";
        objCopy.montantNouveau = this.state.sCapital.montant;
        this.setState({
            sCapital: objCopy,
            showStep4: false,
            showStep5: true,
        });
    };

    saveStep5 = (event, values) => {
        this.setState({
        });
    };

    handleOnChangePhone = (value,key,type) => {
        if(type === "phy"){
            let objCopy = this.state.sActionnairePhy;
            objCopy[key].phone = value;
            this.setState({ sActionnairePhy: objCopy });
        }else{
            let objCopy = this.state.sActionnaireMoral;
            objCopy[key].phone = value;
            this.setState({ sActionnaireMoral: objCopy });
        }

    };

    validerActioPhy = (event,values,key)  => {

        let actioCopy = this.state.sActionnairePhy;
        actioCopy[key].type = values['forme'+key];
        actioCopy[key].gender = values['civilite'+key];
        actioCopy[key].firstname = values['firstname'+key];
        actioCopy[key].lastname = values['lastname'+key];
        actioCopy[key].email = values['email'+key];
        actioCopy[key].birthday = values['birthday'+key];
        actioCopy[key].nationality = values['nationality'+key];
        actioCopy[key].adress = values['adress'+key];
        actioCopy[key].ville = values['ville'+key];
        actioCopy[key].postalCode = values['postalCode'+key];
        actioCopy[key].pays = values['pays'+key];
        actioCopy[key].nbActions = values['nbactions'+key];
        this.setState({sActionnairePhy:actioCopy});


        if(key === this.state.sActionnairePhy.length -1){
            if(this.state.sActionnaireMoral.length === 0 ){
                this.setState({
                    showStep5: false,
                    showStep6: true,
                })
            }else{
                document.getElementById("v-pills-actioPhy"+key).className = "nav-link mb-2";
                document.getElementById("v-pills-actioMora0").className = "nav-link mb-2 active show";

                document.getElementById("actioPhy"+key).className = "tab-pane fade";
                document.getElementById("actioMora0").className = "tab-pane fade active show";
            }

        }else{
            document.getElementById("v-pills-actioPhy"+key).className = "nav-link mb-2";
            document.getElementById("v-pills-actioPhy"+(key+1)).className = "nav-link mb-2 active show";

            document.getElementById("actioPhy"+key).className = "tab-pane fade";
            document.getElementById("actioPhy"+(key+1)).className = "tab-pane fade active show";
        }

    };

    validerActioMora = (event, values,key)  => {

        let actioCopy = this.state.sActionnaireMoral;
        actioCopy[key].type = values['formeMo'+key];
        actioCopy[key].gender = values['civiliteMo'+key];
        actioCopy[key].firstname = values['firstnameMo'+key];
        actioCopy[key].lastname = values['lastnameMo'+key];
        actioCopy[key].email = values['emailMo'+key];
        actioCopy[key].birthday = values['birthdayMo'+key];
        actioCopy[key].nationality = values['nationalityMo'+key];
        actioCopy[key].adress = values['adressMo'+key];
        actioCopy[key].ville = values['villeMo'+key];
        actioCopy[key].postalCode = values['postalCodeMo'+key];
        actioCopy[key].pays = values['paysMo'+key];
        actioCopy[key].nbActions = values['nbactionsMo'+key];
        this.setState({sActionnaireMoral:actioCopy});


        if(key === this.state.sActionnaireMoral.length -1){
            this.setState({
                showStep5: false,
                showStep6: true,
            });

        }else{
            document.getElementById("v-pills-actioMora"+key).className = "nav-link mb-2";
            document.getElementById("v-pills-actioMora"+(key+1)).className = "nav-link mb-2 active show";

            document.getElementById("actioMora"+key).className = "tab-pane fade";
            document.getElementById("actioMora"+(key+1)).className = "tab-pane fade active show";
        }
    };

    saveSociety = () => {
        this.setState({loading:true});

        if(this.props.typeEntreprise === "filiale"){

            let filiales = this.props.entreprise.filiales || [];
            filiales.push({
                dateCreation: moment(new Date()).format("DD/MM/YYYY"),
                sName: this.state.sName,
                sBut: this.state.sBut,
                representant: this.state.representant,
                sCapital: {
                    montant: this.state.sCapital.montant,
                    montantNouveau: this.state.sCapital.montant,
                    minValActions: this.state.sCapital.minValActions,
                    minValActionsAncien: this.state.sCapital.minValActions,
                    valeurNominal: (Number(this.state.sCapital.montant) / Number(this.state.sCapital.minValActions)),
                    getIBAN: this.state.sCapital.getIBAN
                },
                agenceBanque: "BIAT",
                banque: "BIAT",
                LINK_Contract_Sociétés: this.state.LINK_Contract_Sociétés,
                nombre_employes: this.state.nombre_employes,
                type_société: this.state.type_société,
                Montant_capital_libéré_SARL_chiffre: this.state.Montant_capital_libéré_SARL_chiffre,
                Montant_capital_libéré_SARL_lettre: this.state.Montant_capital_libéré_SARL_lettre,
                Montant_capital_libéré_SA_chiffre: this.state.Montant_capital_libéré_SA_chiffre,
                Montant_capital_libéré_SA_lettre: this.state.Montant_capital_libéré_SA_lettre,
                siret: this.state.siret,
                siren: this.state.siren,
                convention_collective_code: this.state.convention_collective_code,
                sSiege: this.state.sSiege,
                nbActPhys: this.state.nbActPhys,
                nbActMorales: this.state.nbActMorales,
                sActionnairePhy: this.state.sActionnairePhy,
                sActionnaireMoral: this.state.sActionnaireMoral,
                sAssociate: this.state.sAssociate,
                sAdministrator: this.state.sAdministrator,
                expertSmartCo: this.state.expertSmartCo,
                signatures: []
            });

            let paysName = this.props.entreprise.sSiege.pays === "Tunisie" ? "tunisie" : this.props.entreprise.sSiege.pays;
            firebase.database().ref('society/' + localStorage.getItem('uid') + paysName).update({
                'filiales':filiales
            }).then( res => {
                setTimeout(()=> {
                    this.setState({loading:false});
                    this.openSnackbar('success', "La création de la nouvelle filiale est effectuée avec succès");
                    setTimeout(() => {
                        this.props.history.push("/gestion/entreprises")
                    }, 1000);
                },1500)

            }).catch(err => {
                console.log(err);
            })




        }else{

            let paysName = this.state.sSiege.pays === "Tunisie" ? "tunisie" : this.state.sSiege.pays;
            firebase.database().ref('society/' + localStorage.getItem('uid') + paysName).set({
                dateCreation: moment(new Date()).format("DD/MM/YYYY"),
                sName: this.state.sName,
                sBut: this.state.sBut,
                representant: this.state.representant,
                sCapital: {
                    montant: this.state.sCapital.montant,
                    montantNouveau: this.state.sCapital.montant,
                    minValActions: this.state.sCapital.minValActions,
                    minValActionsAncien: this.state.sCapital.minValActions,
                    valeurNominal: (Number(this.state.sCapital.montant) / Number(this.state.sCapital.minValActions)),
                    getIBAN: this.state.sCapital.getIBAN
                },
                agenceBanque: "BIAT",
                banque: "BIAT",

                LINK_Contract_Sociétés: this.state.LINK_Contract_Sociétés,
                nombre_employes: this.state.nombre_employes,
                type_société: this.state.type_société,
                Montant_capital_libéré_SARL_chiffre: this.state.Montant_capital_libéré_SARL_chiffre,
                Montant_capital_libéré_SARL_lettre: this.state.Montant_capital_libéré_SARL_lettre,
                Montant_capital_libéré_SA_chiffre: this.state.Montant_capital_libéré_SA_chiffre,
                Montant_capital_libéré_SA_lettre: this.state.Montant_capital_libéré_SA_lettre,
                siret: this.state.siret,
                siren: this.state.siren,
                convention_collective_code: this.state.convention_collective_code,
                sSiege: this.state.sSiege,
                nbActPhys: this.state.nbActPhys,
                nbActMorales: this.state.nbActMorales,
                sActionnairePhy: this.state.sActionnairePhy,
                sActionnaireMoral: this.state.sActionnaireMoral,
                sAssociate: this.state.sAssociate,
                sAdministrator: this.state.sAdministrator,
                expertSmartCo: this.state.expertSmartCo,
                signatures: []
            }).then( res => {
                setTimeout(()=> {
                    this.setState({loading:false});
                    this.openSnackbar('success', "La création de votre nouvelle entreprise est effectuée avec succès");
                    setTimeout(() => {
                        this.props.history.push("/gestion/entreprises")
                    }, 1000);
                },1500)

            }).catch(err => {
                console.log(err);
            })


        }


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
                                       onClick={
                                           this.state.showStep1 ? () => this.props.history.goBack() :
                                               this.state.showStep2 ? () => this.setState({showStep1:true,showStep2:false}) :
                                                   this.state.showStep3 ? () => this.setState({showStep2:true,showStep3:false}) :
                                                       this.state.showStep4 ? () => this.setState({showStep3:true,showStep4:false}) :
                                                           this.state.showStep5 ? () => this.setState({showStep4:true,showStep5:false}) :
                                                               this.state.showStep6 ? () => this.setState({showStep5:true,showStep6:false}) : null
                                       }
                                       className="float-right text-info">Retour</a>
                                    <h4 className="header-title mt-0 mb-3">
                                        {
                                            this.props.typeEntreprise === "filiale" ? "Création d'une nouvelle filiale de l'entreprise "+this.props.entreprise.sName :
                                                "Création d'une nouvelle entreprise"
                                        }
                                    </h4>
                                    <div className="row" style={{marginTop: 15}}>
                                        <div className="col-lg-12">

                                            {
                                                this.state.showStep1 &&
                                                <AvForm onValidSubmit={this.saveStep1}>

                                                    <div className="row">
                                                        <div className="col-lg-6">
                                                            <AvGroup className="mb-3">
                                                                <Label for="sname">Nom de la société</Label>
                                                                <AvInput type="text" name="sname" id="sname"
                                                                         value={this.state.sName} required/>
                                                                <AvFeedback>Ce champs est obligatoire</AvFeedback>
                                                            </AvGroup>
                                                        </div>
                                                        <div className="col-lg-6">
                                                            <AvGroup className="mb-3">
                                                                <Label for="srep">Représentant</Label>
                                                                <AvInput type="text" name="srep" id="srep"
                                                                         value={this.state.representant} required/>
                                                                <AvFeedback>Ce champs est obligatoire</AvFeedback>
                                                            </AvGroup>
                                                        </div>
                                                    </div>
                                                    <div className="row">
                                                        <div className="col-lg-12">
                                                            <AvGroup className="mb-3">
                                                                <Label for="sbut">But social</Label>
                                                                <AvInput type="textarea" name="sbut" id="sbut"
                                                                         value={this.state.sBut}
                                                                         required/>
                                                                <AvFeedback>Ce champs est obligatoire</AvFeedback>
                                                            </AvGroup>
                                                        </div>
                                                        <div className="col-lg-6">
                                                            <AvGroup className="mb-3">
                                                                <Label for="snbactphy">Nombre d'actionnaires physiques</Label>
                                                                <AvInput type="number" name="snbactphy" id="snbactphy"
                                                                         value={this.state.nbActPhys}
                                                                         required/>
                                                                <AvFeedback>Format invalide</AvFeedback>
                                                            </AvGroup>
                                                        </div>
                                                        <div className="col-lg-6">
                                                            <AvGroup className="mb-3">
                                                                <Label for="snbactmora">Nombre d'actionnaires morales</Label>
                                                                <AvInput type="number" name="snbactmora" id="snbactmora"
                                                                         value={this.state.nbActMorales}
                                                                         required/>
                                                                <AvFeedback>Format invalide</AvFeedback>
                                                            </AvGroup>
                                                        </div>
                                                    </div>
                                                    <FormGroup>
                                                        <div className="text-center">
                                                            <Button color="primary"
                                                                    className="btn btn-danger waves-effect waves-light">
                                                                {this.state.loading ?
                                                                    <div className="spinner-border avatar-xs text-white m-1"
                                                                         role="status"></div> : 'Suivant'
                                                                }
                                                            </Button>
                                                        </div>
                                                    </FormGroup>
                                                </AvForm>
                                            }

                                            {
                                                this.state.showStep2 &&
                                                <AvForm onValidSubmit={this.saveStep2}>

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
                                                                <Label for="pays">Pays</Label>
                                                                <AvInput type="select" name="pays" id="pays"
                                                                         value={this.state.sSiege.pays}
                                                                >
                                                                    <option onClick={()=>this.setState({selectedPays:"France"})} value="France">France</option>
                                                                    <option onClick={()=>this.setState({selectedPays:"Suisse"})} value="Suisse">Suisse</option>
                                                                    <option onClick={()=>this.setState({selectedPays:"Tunisie"})} value="Tunisie">Tunisie</option>
                                                                    <option onClick={()=>this.setState({selectedPays:"Singapore"})} value="Singapore">Singapore</option>
                                                                </AvInput>
                                                                <AvFeedback>Ce champs est obligatoire</AvFeedback>
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
                                                                <Label for="postalcode">Code postal</Label>
                                                                <AvInput type="number" name="postalcode" id="postalcode"
                                                                         value={this.state.sSiege.postalCode}
                                                                         required/>
                                                                <AvFeedback>Format invalide</AvFeedback>
                                                            </AvGroup>
                                                        </div>
                                                        <div className="col-lg-6">
                                                            <AvGroup className="mb-3">
                                                                <Label for="pays">Canton</Label>
                                                                {
                                                                    this.state.selectedPays === "Suisse" ?

                                                                        <AvInput type="select" name="canton" id="canton"
                                                                                 value={this.state.sSiege.canton}>
                                                                            {
                                                                                cantonList.map((item,key)=> (
                                                                                    <option value={item.CantonSuisse}>{item.CantonSuisse}</option>
                                                                                ))
                                                                            }
                                                                        </AvInput> :

                                                                        <AvInput type="text" name="canton" id="canton" required
                                                                                 value={this.state.sSiege.canton}/>
                                                                }

                                                            </AvGroup>
                                                        </div>
                                                        <div className="col-lg-6">
                                                            <Label for="canton">Est-ce que ce sont vos propres locaux ?</Label>
                                                            <div className="radio radio-pink mb-1">
                                                                <input type="radio" name="radio" id="radio1"
                                                                       style={{marginLeft: 10}} value={true}/>
                                                                <label htmlFor="radio1">
                                                                    Oui
                                                                </label>
                                                            </div>
                                                            <div className="radio radio-pink mb-2">
                                                                <input type="radio" name="radio" id="radio2"
                                                                       style={{marginLeft: 10}} value={false}/>
                                                                <label htmlFor="radio2">
                                                                    Non
                                                                </label>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <FormGroup>
                                                        <div className="text-center">
                                                            <Button color="primary"
                                                                    className="btn btn-danger waves-effect waves-light">
                                                                {this.state.loading ?
                                                                    <div className="spinner-border avatar-xs text-white m-1"
                                                                         role="status"></div> : 'Suivant'
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
                                                                         validate={{maxLength: {value: 9},minLength: {value: 9}}}

                                                                         value={this.state.siren} required/>
                                                                <AvFeedback>Format invalide</AvFeedback>
                                                            </AvGroup>
                                                        </div>
                                                    </div>
                                                    <div className="row">
                                                        <div className="col-lg-6">
                                                            <AvGroup className="mb-3">
                                                                <Label for="codemutuelle">Id contrat mutuelle</Label>
                                                                <AvInput type="number" name="codemutuelle" id="codemutuelle"
                                                                         value={this.state.LINK_Contract_Sociétés.id_contrat_mutuelle} required/>
                                                                <AvFeedback>Format invalide</AvFeedback>
                                                            </AvGroup>
                                                        </div>
                                                        <div className="col-lg-6">
                                                            <AvGroup className="mb-3">
                                                                <Label for="codeprevoyance">Id contrat prevoyance</Label>
                                                                <AvInput type="number" name="codeprevoyance" id="codeprevoyance"
                                                                         value={this.state.LINK_Contract_Sociétés.id_contrat_prevoyance} required/>
                                                                <AvFeedback>Format invalide</AvFeedback>
                                                            </AvGroup>
                                                        </div>
                                                        <div className="col-lg-6">
                                                            <AvGroup className="mb-3">
                                                                <Label for="codecollective">Code de convention collective</Label>
                                                                <AvInput type="number" name="codecollective" id="codecollective"
                                                                         value={this.state.convention_collective_code} required/>
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
                                                                    <div className="spinner-border avatar-xs text-white m-1"
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

                                                    <div className="row">
                                                        <div className="col-lg-6">
                                                            <Label for="canton">Montant du capital libéré (CHF)</Label>
                                                            <div className="radio radio-pink mb-2">
                                                                <input type="radio" name="radiocapital" id="radiocapital1"
                                                                       checked={this.state.sCapital.montant === "50000"}
                                                                       style={{marginLeft: 10}} value={'50000'}
                                                                       onClick={this.handleObjectChange('sCapital','montant')}
                                                                />
                                                                <label htmlFor="radiocapital1">
                                                                    CHF 50'000.-
                                                                </label>
                                                            </div>
                                                            <div className="radio radio-pink mb-2">
                                                                <input type="radio" name="radiocapital" id="radiocapital2"
                                                                       checked={this.state.sCapital.montant === "100000"}
                                                                       style={{marginLeft: 10}} value={'100000'}
                                                                       onClick={this.handleObjectChange('sCapital','montant')}
                                                                />
                                                                <label htmlFor="radiocapital2">
                                                                    CHF 100'000.-
                                                                </label>
                                                            </div>
                                                            <div className="radio radio-pink mb-2">
                                                                <input type="radio" name="radiocapital" id="radiocapita3"
                                                                       checked={this.state.sCapital.montant === this.state.montantChoix}
                                                                       style={{marginLeft: 10}} value={this.state.montantChoix}
                                                                       onClick={this.handleObjectChange('sCapital','montant')}
                                                                />
                                                                <label htmlFor="radiocapita3">
                                                                    Plus (au choix, maximum 400'000.-)
                                                                </label>
                                                            </div>
                                                            {
                                                                this.state.sCapital.montant !== "50000" && this.state.sCapital.montant !== "100000" &&
                                                                <div className="form-group mb-2">
                                                                    <input type="number" className="form-control" id="nb" style={{width:'60%',marginLeft:30}}
                                                                           value={this.state.montantChoix}
                                                                           onChange={this.handleChoixMontantChange('')}
                                                                    />
                                                                    <h5 style={{color:"red",marginLeft:35}}>
                                                                        {
                                                                            parseInt(this.state.montantChoix) < 100 ? "Le capital doit etre supérieur à 100 CHF" :
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
                                                                <input type="radio" name="radiovalnominal" id="radiovalnominal1"
                                                                       checked={parseInt(this.state.sCapital.minValActions) === parseInt(this.state.sCapital.montant)/100}
                                                                       onClick={this.handleObjectChange('sCapital','minValActions')}
                                                                       style={{marginLeft: 10}}
                                                                       value={(parseInt(this.state.sCapital.montant)/100).toString()}/>
                                                                <label htmlFor="radiovalnominal1">
                                                                    {parseInt(this.state.sCapital.montant)/100}&nbsp;
                                                                    parts sociales d'une valeur nominale de 100 CHF -. (standard)
                                                                </label>
                                                            </div>
                                                            <div className="radio radio-pink mb-2">
                                                                <input type="radio" name="radiovalnominal" id="radiovalnominal2"
                                                                       checked={parseInt(this.state.sCapital.minValActions) === parseInt(this.state.sCapital.montant)/10}
                                                                       onClick={this.handleObjectChange('sCapital','minValActions')}
                                                                       style={{marginLeft: 10}}
                                                                       value={(parseInt(this.state.sCapital.montant)/10).toString()}
                                                                />
                                                                <label htmlFor="radiovalnominal2">
                                                                    {parseInt(this.state.sCapital.montant)/10}&nbsp;
                                                                    parts sociales d'une valeur nominale de 10 CHF.-
                                                                </label>
                                                            </div>
                                                            <div className="radio radio-pink mb-2">
                                                                <input type="radio" name="radiovalnominal" id="radiovalnominal3"
                                                                       checked={parseInt(this.state.sCapital.minValActions) === parseInt(this.state.sCapital.montant)}
                                                                       onClick={this.handleObjectChange('sCapital','minValActions')}
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

                                                    <div className="row" style={{marginTop:25}}>
                                                        <div className="col-lg-12">
                                                            <Label for="canton">Souhaitez-vous obtenir un numéro IBAN pour le compte de
                                                                consignation avec la ...., banque partenaire de Smartco ?</Label>
                                                            <div className="radio radio-pink mb-2">
                                                                <input type="radio" name="radioiban" id="radioiban1" checked
                                                                       style={{marginLeft: 10}} value={true}/>
                                                                <label htmlFor="radioiban1">
                                                                    Oui
                                                                </label>
                                                            </div>
                                                            <div className="radio radio-pink mb-2">
                                                                <input type="radio" name="radioiban" id="radioiban2"
                                                                       style={{marginLeft: 10}} value={false}/>
                                                                <label htmlFor="radioiban2">
                                                                    Non (Téléchargez l’attestation de consignation de votre banque
                                                                    avec signature électronique qualifiée)
                                                                </label>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <FormGroup>
                                                        <div className="text-center">
                                                            <Button color="primary"
                                                                    className="btn btn-danger waves-effect waves-light">
                                                                {this.state.loading ?
                                                                    <div className="spinner-border avatar-xs text-white m-1"
                                                                         role="status"></div> : 'Suivant'
                                                                }
                                                            </Button>
                                                        </div>
                                                    </FormGroup>
                                                </AvForm>
                                            }

                                            {
                                                this.state.showStep5 &&
                                                <div className="row">
                                                    <div className="col-sm-3">
                                                        <div className="nav flex-column nav-pills nav-pills-tab" id="v-pills-tab"
                                                             role="tablist" aria-orientation="vertical">
                                                            {
                                                                this.state.sActionnairePhy.map((item,key) => (

                                                                    <a className={key === 0 ? "nav-link mb-2 active show" :"nav-link mb-2"}
                                                                       id={"v-pills-actioPhy"+key}
                                                                       data-toggle="pill" href={"#actioPhy"+key} role="tab"
                                                                       aria-controls={"v-actioPhy"+key}
                                                                       aria-selected="true">{"Actionnaire physique "+(key+1)} </a>
                                                                ))
                                                            }
                                                            {
                                                                this.state.sActionnaireMoral.map((item,key) => (

                                                                    <a className={key === 0 && this.state.sActionnairePhy.length === 0 ? "nav-link mb-2 active show" :"nav-link mb-2"}
                                                                       id={"v-pills-actioMora"+key}
                                                                       data-toggle="pill" href={"#actioMora"+key} role="tab"
                                                                       aria-controls={"v-actioMora"+key}
                                                                       aria-selected="false">{"Actionnaire morale "+(key+1)}</a>

                                                                ))
                                                            }

                                                        </div>
                                                    </div>
                                                    <div className="col-sm-9">
                                                        <div className="tab-content pt-0">

                                                            {
                                                                this.state.sActionnairePhy.map((item,key) => (
                                                                    <div className={key === 0 ? "tab-pane fade active show" : "tab-pane fade"}
                                                                         id={"actioPhy"+key}
                                                                         role="tabpanel" aria-labelledby={"v-pills-actioPhy"+key}>
                                                                        <div className="row">
                                                                            <div className="col-lg-12">

                                                                                <AvForm onValidSubmit={(event,values) => this.validerActioPhy(event,values,key)}>

                                                                                    <div className="row">
                                                                                        <div className="col-lg-6">
                                                                                            <AvGroup className="mb-3">
                                                                                                <Label for="forme">L'actionnaire est</Label>
                                                                                                <AvInput type="select" name={"forme"+key} id={"forme"+key}
                                                                                                         value={this.state.sActionnairePhy[key].type}>
                                                                                                    <option value="Personne physique">Personne
                                                                                                        physique
                                                                                                    </option>
                                                                                                    <option value="Une entité juridique">Une entité
                                                                                                        juridique
                                                                                                    </option>
                                                                                                </AvInput>
                                                                                            </AvGroup>
                                                                                        </div>
                                                                                        <div className="col-lg-6">
                                                                                            <AvGroup className="mb-3">
                                                                                                <Label for="role">Civilité</Label>
                                                                                                <AvInput type="select" name={"civilite"+key} id={"civilite"+key}
                                                                                                         value={this.state.sActionnairePhy[key].gender}>
                                                                                                    <option value="M.">M.</option>
                                                                                                    <option value="Mme">Mme</option>
                                                                                                </AvInput>
                                                                                            </AvGroup>
                                                                                        </div>
                                                                                    </div>
                                                                                    <div className="row">
                                                                                        <div className="col-lg-6">
                                                                                            <AvGroup className="mb-3">
                                                                                                <Label for="nom">Nom</Label>
                                                                                                <AvInput type="text" name={"firstname"+key} id={"firstname"+key}
                                                                                                         value={this.state.sActionnairePhy[key].firstname}
                                                                                                         required/>
                                                                                                <AvFeedback>Ce champs est obligatoire</AvFeedback>
                                                                                            </AvGroup>
                                                                                        </div>
                                                                                        <div className="col-lg-6">
                                                                                            <AvGroup className="mb-3">
                                                                                                <Label for="prenom">Prénom</Label>
                                                                                                <AvInput type="text" name={"lastname"+key} id={"lastname"+key}
                                                                                                         value={this.state.sActionnairePhy[key].lastname}
                                                                                                         required/>
                                                                                                <AvFeedback>Ce champs est obligatoire</AvFeedback>
                                                                                            </AvGroup>
                                                                                        </div>
                                                                                    </div>
                                                                                    <div className="row">
                                                                                        <div className="col-lg-6">
                                                                                            <AvGroup className="mb-3">
                                                                                                <Label for="email">Email</Label>
                                                                                                <AvInput type="email" name={"email"+key} id={"email"+key}
                                                                                                         value={this.state.sActionnairePhy[key].email}
                                                                                                         required/>
                                                                                                <AvFeedback>Email invalide</AvFeedback>
                                                                                            </AvGroup>
                                                                                        </div>
                                                                                        <div className="col-lg-6">
                                                                                            <AvGroup className="mb-3">
                                                                                                <Label for="password">Numéro de téléphone</Label>
                                                                                                <PhoneInput defaultCountry={'fr'} value={this.state.sActionnairePhy[key].phone}
                                                                                                            onChange={(value) => this.handleOnChangePhone(value,key,"phy")} inputStyle={{
                                                                                                    width:"inherit",height:37
                                                                                                }}/>
                                                                                            </AvGroup>
                                                                                        </div>
                                                                                    </div>

                                                                                    <div className="row">
                                                                                        <div className="col-lg-6">
                                                                                            <AvGroup className="mb-3">
                                                                                                <Label for="datnaiss">Date de naissance</Label>
                                                                                                <AvInput type="date" name={"birthday"+key} id={"birthday"+key}
                                                                                                         value={this.state.sActionnairePhy[key].birthday}
                                                                                                         required/>
                                                                                                <AvFeedback>Ce champs est obligatoire</AvFeedback>
                                                                                            </AvGroup>
                                                                                        </div>
                                                                                        <div className="col-lg-6">
                                                                                            <AvGroup className="mb-3">
                                                                                                <Label for="nationality">Nationnalité</Label>
                                                                                                <AvInput type="text" name={"nationality"+key} id={"nationality"+key}
                                                                                                         value={this.state.sActionnairePhy[key].nationality}
                                                                                                         required/>
                                                                                                <AvFeedback>Ce champs est obligatoire</AvFeedback>
                                                                                            </AvGroup>
                                                                                        </div>
                                                                                    </div>

                                                                                    <div className="row">
                                                                                        <div className="col-lg-6">
                                                                                            <AvGroup className="mb-3">
                                                                                                <Label for="adress">Adresse</Label>
                                                                                                <AvInput type="text" name={"adress"+key} id={"adress"+key}
                                                                                                         value={this.state.sActionnairePhy[key].adress}
                                                                                                         required/>
                                                                                                <AvFeedback>Ce champs est obligatoire</AvFeedback>
                                                                                            </AvGroup>
                                                                                        </div>
                                                                                        <div className="col-lg-6">
                                                                                            <AvGroup className="mb-3">
                                                                                                <Label for="adress">Ville</Label>
                                                                                                <AvInput type="text" name={"ville"+key} id={"ville"+key}
                                                                                                         value={this.state.sActionnairePhy[key].ville}
                                                                                                         required/>
                                                                                                <AvFeedback>Ce champs est obligatoire</AvFeedback>
                                                                                            </AvGroup>
                                                                                        </div>
                                                                                    </div>

                                                                                    <div className="row">
                                                                                        <div className="col-lg-6">
                                                                                            <AvGroup className="mb-3">
                                                                                                <Label for="postalcode">Code postal</Label>
                                                                                                <AvInput type="number" name={"postalCode"+key} id={"postalCode"+key}
                                                                                                         value={this.state.sActionnairePhy[key].postalCode}
                                                                                                         required/>
                                                                                                <AvFeedback>Code postal invalide</AvFeedback>
                                                                                            </AvGroup>
                                                                                        </div>
                                                                                        <div className="col-lg-6">
                                                                                            <AvGroup className="mb-3">
                                                                                                <Label for="pays">Pays</Label>
                                                                                                <AvInput type="select" name={"pays"+key} id={"pays"+key}
                                                                                                         value={this.state.sActionnairePhy[key].pays}>
                                                                                                    {
                                                                                                        countryList.map((item,key)=>(
                                                                                                            <option value={item.Name}>{item.Name}</option>
                                                                                                        ))
                                                                                                    }
                                                                                                </AvInput>
                                                                                                <AvFeedback>Ce champs est obligatoire</AvFeedback>
                                                                                            </AvGroup>
                                                                                        </div>
                                                                                    </div>
                                                                                    <div className="row">
                                                                                        <div className="col-lg-6">
                                                                                            <AvGroup className="mb-3">
                                                                                                <Label for="nbactions">Nombre d'actions</Label>
                                                                                                <AvInput type="number" name={"nbactions"+key} id={"nbactions"+key}
                                                                                                         value={this.state.sActionnairePhy[key].nbActions}
                                                                                                         required/>
                                                                                                <AvFeedback>Format invalide</AvFeedback>
                                                                                            </AvGroup>
                                                                                        </div>
                                                                                    </div>

                                                                                    <FormGroup>
                                                                                        <div className="text-center">
                                                                                            <Button color="primary" className="btn btn-danger waves-effect waves-light">
                                                                                                {
                                                                                                    key === this.state.sActionnairePhy.length -1 && this.state.sActionnaireMoral.length === 0  ?
                                                                                                        "Suivant" : "Actionnaire suivant"
                                                                                                }
                                                                                            </Button>
                                                                                        </div>
                                                                                    </FormGroup>
                                                                                </AvForm>

                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                ))
                                                            }
                                                            {
                                                                this.state.sActionnaireMoral.map((item,key) => (

                                                                    <div className={key === 0 && this.state.sActionnairePhy.length === 0 ? "tab-pane fade active show" : "tab-pane fade"}
                                                                         id={"actioMora"+key}
                                                                         role="tabpanel" aria-labelledby={"v-pills-actioMora"+key}>
                                                                        <div className="row">
                                                                            <div className="col-lg-12">

                                                                                <AvForm onValidSubmit={(event,values) => this.validerActioMora(event,values,key)}>

                                                                                    <div className="row">
                                                                                        <div className="col-lg-6">
                                                                                            <AvGroup className="mb-3">
                                                                                                <Label for="forme">L'actionnaire est</Label>
                                                                                                <AvInput type="select" name={"formeMo"+key} id={"formeMo"+key}
                                                                                                         value={this.state.sActionnaireMoral[key].type}>
                                                                                                    <option value="Une entité morale">Une entité morale</option>
                                                                                                    <option value="Une entité juridique">Une entité juridique</option>
                                                                                                </AvInput>
                                                                                            </AvGroup>
                                                                                        </div>
                                                                                        <div className="col-lg-6">
                                                                                            <AvGroup className="mb-3">
                                                                                                <Label for="role">Civilité</Label>
                                                                                                <AvInput type="select" name={"civiliteMo"+key} id={"civiliteMo"+key}
                                                                                                         value={this.state.sActionnaireMoral[key].gender}>
                                                                                                    <option value="SA">SA</option>
                                                                                                    <option value="SARL">SARL</option>
                                                                                                </AvInput>
                                                                                            </AvGroup>
                                                                                        </div>
                                                                                    </div>
                                                                                    <div className="row">
                                                                                        <div className="col-lg-6">
                                                                                            <AvGroup className="mb-3">
                                                                                                <Label for="nom">Nom</Label>
                                                                                                <AvInput type="text" name={"firstnameMo"+key} id={"firstnameMo"+key}
                                                                                                         value={this.state.sActionnaireMoral[key].firstname}
                                                                                                         required/>
                                                                                                <AvFeedback>Ce champs est obligatoire</AvFeedback>
                                                                                            </AvGroup>
                                                                                        </div>
                                                                                        <div className="col-lg-6">
                                                                                            <AvGroup className="mb-3">
                                                                                                <Label for="prenom">Prénom</Label>
                                                                                                <AvInput type="text" name={"lastnameMo"+key} id={"lastnameMo"+key}
                                                                                                         value={this.state.sActionnaireMoral[key].lastname}
                                                                                                         required/>
                                                                                                <AvFeedback>Ce champs est obligatoire</AvFeedback>
                                                                                            </AvGroup>
                                                                                        </div>
                                                                                    </div>
                                                                                    <div className="row">
                                                                                        <div className="col-lg-6">
                                                                                            <AvGroup className="mb-3">
                                                                                                <Label for="email">Email</Label>
                                                                                                <AvInput type="email" name={"emailMo"+key} id={"emailMo"+key}
                                                                                                         value={this.state.sActionnaireMoral[key].email}
                                                                                                         required/>
                                                                                                <AvFeedback>Email invalide</AvFeedback>
                                                                                            </AvGroup>
                                                                                        </div>
                                                                                        <div className="col-lg-6">
                                                                                            <AvGroup className="mb-3">
                                                                                                <Label for="password">Numéro de téléphone</Label>
                                                                                                <PhoneInput defaultCountry={'fr'} value={this.state.sActionnaireMoral[key].phone}
                                                                                                            onChange={(value) => this.handleOnChangePhone(value,key,"Mora")} inputStyle={{
                                                                                                    width:"inherit",height:37
                                                                                                }}/>
                                                                                            </AvGroup>
                                                                                        </div>
                                                                                    </div>

                                                                                    <div className="row">
                                                                                        <div className="col-lg-6">
                                                                                            <AvGroup className="mb-3">
                                                                                                <Label for="datnaiss">Date de naissance</Label>
                                                                                                <AvInput type="date" name={"birthdayMo"+key} id={"birthdayMo"+key}
                                                                                                         value={this.state.sActionnaireMoral[key].birthday}
                                                                                                         required/>
                                                                                                <AvFeedback>Date invalide</AvFeedback>
                                                                                            </AvGroup>
                                                                                        </div>
                                                                                        <div className="col-lg-6">
                                                                                            <AvGroup className="mb-3">
                                                                                                <Label for="nationality">Nationnalité</Label>
                                                                                                <AvInput type="text" name={"nationalityMo"+key} id={"nationalityMo"+key}
                                                                                                         value={this.state.sActionnaireMoral[key].nationality}
                                                                                                         required/>
                                                                                                <AvFeedback>Ce champs est obligatoire</AvFeedback>
                                                                                            </AvGroup>
                                                                                        </div>
                                                                                    </div>

                                                                                    <div className="row">
                                                                                        <div className="col-lg-6">
                                                                                            <AvGroup className="mb-3">
                                                                                                <Label for="adress">Adresse</Label>
                                                                                                <AvInput type="text" name={"adressMo"+key} id={"adressMo"+key}
                                                                                                         value={this.state.sActionnaireMoral[key].adress}
                                                                                                         required/>
                                                                                                <AvFeedback>Ce champs est obligatoire</AvFeedback>
                                                                                            </AvGroup>
                                                                                        </div>
                                                                                        <div className="col-lg-6">
                                                                                            <AvGroup className="mb-3">
                                                                                                <Label for="adress">Ville</Label>
                                                                                                <AvInput type="text" name={"villeMo"+key} id={"villeMo"+key}
                                                                                                         value={this.state.sActionnaireMoral[key].ville}
                                                                                                         required/>
                                                                                                <AvFeedback>Ce champs est obligatoire</AvFeedback>
                                                                                            </AvGroup>
                                                                                        </div>
                                                                                    </div>

                                                                                    <div className="row">
                                                                                        <div className="col-lg-6">
                                                                                            <AvGroup className="mb-3">
                                                                                                <Label for="postalcode">Code postal</Label>
                                                                                                <AvInput type="number" name={"postalCodeMo"+key} id={"postalCodeMo"+key}
                                                                                                         value={this.state.sActionnaireMoral[key].postalCode}
                                                                                                         required/>
                                                                                                <AvFeedback>Code postal invalide</AvFeedback>
                                                                                            </AvGroup>
                                                                                        </div>
                                                                                        <div className="col-lg-6">
                                                                                            <AvGroup className="mb-3">
                                                                                                <Label for="pays">Pays</Label>
                                                                                                <AvInput type="select" name={"paysMo"+key} id={"paysMo"+key}
                                                                                                         value={this.state.sActionnaireMoral[key].pays}
                                                                                                         required>
                                                                                                    {
                                                                                                        countryList.map((item,key)=>(
                                                                                                            <option value={item.Name}>{item.Name}</option>
                                                                                                        ))
                                                                                                    }
                                                                                                </AvInput>
                                                                                                <AvFeedback>Ce champs est obligatoire</AvFeedback>
                                                                                            </AvGroup>
                                                                                        </div>
                                                                                    </div>

                                                                                    <div className="row">
                                                                                        <div className="col-lg-6">
                                                                                            <AvGroup className="mb-3">
                                                                                                <Label for="nbactions">Nombre d'actions</Label>
                                                                                                <AvInput type="number" name={"nbactionsMo"+key} id={"nbactionsMo"+key}
                                                                                                         value={this.state.sActionnaireMoral[key].nbActions}
                                                                                                         required/>
                                                                                                <AvFeedback>Format invalide</AvFeedback>
                                                                                            </AvGroup>
                                                                                        </div>
                                                                                    </div>

                                                                                    <FormGroup>
                                                                                        <div className="text-center">
                                                                                            <Button color="primary" className="btn btn-danger waves-effect waves-light">
                                                                                                {
                                                                                                    key === this.state.sActionnaireMoral.length -1 ?
                                                                                                        "Suivant" : "Actionnaire suivant"
                                                                                                }
                                                                                            </Button>
                                                                                        </div>
                                                                                    </FormGroup>
                                                                                </AvForm>

                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                ))
                                                            }

                                                        </div>
                                                    </div>
                                                </div>
                                            }
                                            {
                                                this.state.showStep6 &&
                                                <div className="row">
                                                    <div className="col-lg-12">
                                                        <h3>Expert-comptable</h3>
                                                        <p>La gestion de votre entreprise implique de suivre votre trésorerie, déclarer votre TVA,
                                                            passer vos notes de frais, etc. Un expert-comptable sera nécessaire pour établir votre
                                                            bilan annuel.</p>
                                                        <h3 style={{marginTop:20}}>Offre de gestion SmartCo</h3>
                                                        <p>Votre chiffre d’affaires et vos dépenses sont directement synchronisés depuis votre compte
                                                            en banque vers notre plateforme de gestion. Nos experts sont disponibles pour vous accompagner
                                                            au quotidien. Inclus dans l’offre:</p>
                                                        <ul>
                                                            <li>Suivi de vos dépenses et de votre chiffre d’affaires en temps réel.</li>
                                                            <li>Synchronisation automatique avec votre banque.</li>
                                                            <li>Déclarations de TVA</li>
                                                            <li>Assistance par des experts (téléphone, email)</li>
                                                            <li>Création illimitée de devis et factures</li>
                                                            <li>Gestion des notes de frais et indemnités kilométriques</li>
                                                            <li>En option : bilan annuel avec un expert-comptable partenaire</li>
                                                        </ul>
                                                        <div className="radio radio-pink mb-1" style={{marginTop:20}}>
                                                            <input type="radio" name="radioexp" id="radioexp1"
                                                                   style={{marginLeft: 10}} value={true}/>
                                                            <label htmlFor="radioexp1">
                                                                Oui, je souhaite gérer mon entreprise avec un expert-comptable partenaire de Smartco
                                                            </label>
                                                        </div>
                                                        <div className="radio radio-pink mb-2">
                                                            <input type="radio" name="radioexp" id="radioexp2"
                                                                   style={{marginLeft: 10}} value={false}/>
                                                            <label htmlFor="radioexp2">
                                                                Non merci, j'ai déjà un expert-comptable
                                                            </label>
                                                        </div>
                                                        <div className="text-center">
                                                            <Button color="primary" onClick={this.saveSociety}
                                                                    className="btn btn-danger waves-effect waves-light">
                                                                {
                                                                    this.state.loading ?
                                                                        <div className="spinner-border avatar-xs text-white m-1"
                                                                             role="status"></div> : 'Confirmer la création'
                                                                }
                                                            </Button>
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

export default newEntreprise;