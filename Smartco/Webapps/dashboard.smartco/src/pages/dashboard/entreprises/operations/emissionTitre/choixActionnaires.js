import React, {Component, Suspense} from "react";
import "firebase/database"
import {AvFeedback, AvForm, AvGroup, AvInput} from "availity-reactstrap-validation";
import {Button, Container, FormGroup, Label} from "reactstrap";
import MySnackbarContentWrapper from "../../../../../tools/customSnackBar";
import Snackbar from "@material-ui/core/Snackbar";
import firebase from "firebase/app";
import "firebase/database"
import verifForms from "../../../../../tools/verifForms";
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'
import countryList from "../../../../../tools/countryList";
import Loader from "../../../../../components/Loader";

const Topbar = React.lazy(() => import("../../../../../components/Topbar"));
const Navbar = React.lazy(() => import("../../../../../components/Navbar"));
const loading = () => <Loader/>;

class choixActionnaires extends Component {


    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            isMenuOpened: false,
            activeMenuItem: 'item-gestion',


            entreprise: '',
            actioPhy: [],
            actioMoral: [],
            showNewActioForm: false,

            openAlert: false,
            alertMessage: '',
            alertType: '',

            newActionnaire: {
                id: '',
                pwd:'',
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
                role: 'Associé',
            },
            selectedActio: [],
            augmentationcapital:{
                date_ass_genrale: '',
                nbNewActEmis: '',
                agio: '',
                nbActPhy: '',
                nbActMorales: '',
                dateCreation:'',
                to:[],
                prixNominal:'',
                prixEmission:''
            }
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
            this.setState({
                entreprise: this.props.location.state.entreprise,
                actioPhy: this.props.location.state.entreprise.sActionnairePhy || [],
                actioMoral: this.props.location.state.entreprise.sActionnaireMoral || [],
            })
        }
    }

    componentWillUnmount() {
        //console.log("WILL UNMOUNT")
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

    addActioPhy = (event, values) => {
        this.setState({loading: true});
        let nbActPhy = parseInt(this.props.location.state.entreprise.nbActPhys);
        let nbActMoral = parseInt(this.props.location.state.entreprise.nbActMorales);

        setTimeout(() => {

            let foundEmail = (this.state.actioPhy || []).concat(this.state.actioMoral || []).find(x => x.email === values.email);
            if(foundEmail === undefined){
                let phone = this.state.newActionnaire.phone;
                this.setState({
                    newActionnaire: {
                        id: '_' + Math.random().toString(36).substr(2, 9),
                        pwd: Math.random().toString(36).substr(2, 5),
                        email: values.email,
                        phone:phone,
                        type: values.forme,
                        gender: 'M.',
                        firstname: values.nom,
                        lastname: values.prenom,
                        adress: values.adress,
                        postalCode: values.postalcode,
                        pays: values.pays,
                        birthday: values.datnaiss,
                        nationality: values.nationality,
                        nbActions: '',
                        isAdministrator: 'false',
                        isHaveSuisseId: 'true',
                        signatures: [],
                        role: values.role
                    }
                });

                if (this.state.newActionnaire.type === "Personne physique") {
                    let actiosPhy = this.state.actioPhy;
                    actiosPhy.push(this.state.newActionnaire);

                    firebase.database().ref('society/' + this.state.entreprise.uniqueId).update({
                        'sActionnairePhy':actiosPhy,
                        'nbActPhys':(nbActPhy + 1).toString()
                    }).then(res => {
                        //console.log("UPDATE OK");
                        this.setState({
                            actiosPhy: actiosPhy,
                            showNewActioForm: false,
                            newActionnaire: {
                                id: '',
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
                                role: ''
                            }
                        });
                        this.openSnackbar('success', "Actionnaire ajouté avec succès");
                        this.setState({loading: false});
                    }).catch(err => {
                        console.log(err);
                    });


                } else {
                    let actiosMoral = this.state.actioMoral;
                    actiosMoral.push(this.state.newActionnaire);
                    firebase.database().ref('society/' + this.state.entreprise.uniqueId).update({
                        'sActionnaireMoral':actiosMoral,
                        'nbActMorales':(nbActMoral + 1).toString()
                    }).then(res => {
                        //console.log("UPDATE OK");
                        this.setState({
                            actioMoral: actiosMoral,
                            showNewActioForm: false,
                            newActionnaire: {
                                id: '',
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
                                role: ''
                            }
                        });
                        this.openSnackbar('success', "Actionnaire ajouté avec succès");
                        this.setState({loading: false});
                    }).catch(err => {
                        console.log(err);
                    });
                }


            }else{
                this.openSnackbar('error', "L'adresse mail de cet actionnaire est déja existante!");
                let newAct = this.state.newActionnaire;
                newAct.email = '';
                this.setState({
                    newActionnaire:newAct,
                    loading:false
                })
            }



        }, 2000);


    };

    addActioToList = (actio) => event => {
        let actios = this.state.selectedActio || [];
        let found = actios.find(x => x.email === actio.email);
        if (found === undefined) {
            actios.push(actio);
            this.setState({
                selectedActio: actios
            })
        }
    };

    removeActioFromList = (key) => event => {
        let actios = this.state.selectedActio;
        actios.splice(key, 1);
        this.setState({
            selectedActio: actios
        })
    };

    handleObjectChange = (object,name) => event => {
        let objCopy = this.state[object];
        objCopy[name] = event.target.value;
        this.setState({
            [object]: objCopy
        });
    };

    handleOnChangePhone = (value) => {
        let objCopy = this.state.newActionnaire;
        objCopy.phone = value;
        this.setState({ newActionnaire: objCopy });
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

                            <div className="row" style={{marginTop: 25}}>

                                <div className="col-md-12">
                                    <div className="card">
                                        <div className="card-body ">

                                            <div className="row">
                                                <div className="col-md-12">
                                                    <a style={{color:'hover: #21a5c2 !important',cursor:'pointer'}}
                                                       onClick={()=> this.props.history.goBack()} className="float-right text-info">Retour</a>
                                                </div>
                                            </div>
                                            <div className="row">
                                                <div className="col-md-5">
                                                    <div className="form-group mb-3">
                                                        <label htmlFor="example-select">Sélectionner un actionnaire physique existant</label>
                                                        <select className="form-control" id="example-select">
                                                            <option>Sélectionner un actionnaire</option>
                                                            {
                                                                this.state.actioPhy.map((item, key) => (
                                                                    <option
                                                                        onClick={this.addActioToList(item)}>{item.firstname + ' ' + item.lastname}</option>
                                                                ))
                                                            }
                                                        </select>
                                                    </div>

                                                    <div className="form-group mb-3">
                                                        <label htmlFor="example-select">Sélectionner un actionnaire morale existant</label>
                                                        <select className="form-control" id="example-select">
                                                            <option>Sélectionner un actionnaire</option>
                                                            {
                                                                this.state.actioMoral.map((item, key) => (
                                                                    <option
                                                                        onClick={this.addActioToList(item)}>{item.firstname + ' ' + item.lastname}</option>
                                                                ))
                                                            }
                                                        </select>
                                                    </div>
                                                    <button type="button" className="btn btn-info waves-effect waves-light"
                                                            onClick={() => {
                                                                this.setState({showNewActioForm: true})
                                                            }}>
                                                        <i className="mdi mdi-plus mr-1"></i> Ajouter un nouvel actionnaire
                                                    </button>
                                                </div>
                                                <div className="col-md-3">
                                                    <div className="form-group mb-3">
                                                        <label htmlFor="agio">Agio d'émission</label>
                                                        <input type="text" className="form-control" id="agio"
                                                               value={this.state.augmentationcapital.agio}
                                                               onChange={this.handleObjectChange('augmentationcapital','agio')}/>
                                                    </div>
                                                    <div className="form-group mb-3">
                                                        <label htmlFor="dateass">Date de l'assemblée générale</label>
                                                        <input type="date" className="form-control" id="dateass"
                                                               value={this.state.augmentationcapital.date_ass_genrale}
                                                               onChange={this.handleObjectChange('augmentationcapital','date_ass_genrale')}/>
                                                    </div>
                                                    <div className="form-group mb-3">
                                                        <label htmlFor="nbnewactions">Nombre d'actions nouvelles émises</label>
                                                        <input type="text" className="form-control" id="nbnewactions"
                                                               value={this.state.augmentationcapital.nbNewActEmis}
                                                               onChange={this.handleObjectChange('augmentationcapital','nbNewActEmis')}/>
                                                    </div>
                                                </div>
                                                <div className="col-md-3">
                                                    <div className="form-group mb-3">
                                                        <label htmlFor="prime">Prime d'émission</label>
                                                        <input type="text" className="form-control" id="prime"
                                                               value={this.state.augmentationcapital.prixEmission}
                                                               onChange={this.handleObjectChange('augmentationcapital','prixEmission')}/>
                                                    </div>
                                                    <div className="form-group mb-3">
                                                        <label htmlFor="nominal">Prix nominal par action</label>
                                                        <input type="text" className="form-control" id="nominal"
                                                               value={this.state.augmentationcapital.prixNominal}
                                                               onChange={this.handleObjectChange('augmentationcapital','prixNominal')}/>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="row">
                                                <div className="col-md-12">
                                                    <div className="float-right">
                                                        {/*<button type="button"
                                                                disabled={this.state.selectedActio.length === 0 || verifForms.verif_Number(this.state.augmentationcapital.nbNewActEmis) ||
                                                                verifForms.verif_inpuText(this.state.augmentationcapital.date_ass_genrale) ||
                                                                verifForms.verif_Number(this.state.augmentationcapital.agio) || verifForms.verif_Number(this.state.augmentationcapital.prixEmission ||
                                                                    verifForms.verif_Number(this.state.augmentationcapital.prixNominal))}
                                                                className="btn btn-danger waves-effect waves-light"
                                                                onClick={goToInfoAfterChoise(this.state.selectedActio,this.state.augmentationcapital)}>
                                                            Suivant&nbsp;&nbsp;
                                                            <i className="mdi mdi-arrow-right mr-1"></i>
                                                        </button>*/}
                                                        <button type="button"
                                                                disabled={this.state.selectedActio.length === 0 || verifForms.verif_Number(this.state.augmentationcapital.nbNewActEmis) ||
                                                                verifForms.verif_inpuText(this.state.augmentationcapital.date_ass_genrale) ||
                                                                verifForms.verif_Number(this.state.augmentationcapital.agio) || verifForms.verif_Number(this.state.augmentationcapital.prixEmission ||
                                                                    verifForms.verif_Number(this.state.augmentationcapital.prixNominal))}
                                                                className="btn btn-danger waves-effect waves-light"
                                                                onClick={()=>this.props.history.push("/gestion/entreprises/operations/emissionTitres/1/info",
                                                                    {selectedActios:this.state.selectedActio,augmentationCapital:this.state.augmentationcapital,entreprise:this.state.entreprise})}
                                                                >
                                                            Suivant&nbsp;&nbsp;
                                                            <i className="mdi mdi-arrow-right mr-1"></i>
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                            {
                                                this.state.showNewActioForm &&
                                                <div className="card" style={{border: '2px solid #C0C0C0', marginTop: 20}}>
                                                    <div className="card-header" style={{backgroundColor: "transparent"}}>
                                                        <a style={{color: 'hover: #21a5c2 !important', cursor: 'pointer'}}
                                                           onClick={() => {
                                                               this.setState({showNewActioForm: false})
                                                           }}
                                                           className="float-right text-info">Annuler</a>
                                                        <h4 className="header-title mt-0 mb-3">Nouveau actionnaire</h4>
                                                    </div>
                                                    <div className="card-body ">
                                                        <div className="row">
                                                            <div className="col-lg-12">

                                                                <AvForm onValidSubmit={this.addActioPhy}>

                                                                    <div className="row">
                                                                        <div className="col-lg-6">
                                                                            <AvGroup className="mb-3">
                                                                                <Label for="forme">Forme</Label>
                                                                                <AvInput type="select" name="forme" id="forme"
                                                                                         value={this.state.newActionnaire.type}>
                                                                                    <option value="Personne physique">Personne
                                                                                        physique
                                                                                    </option>
                                                                                    <option value="Une entité morale">Une entité
                                                                                        morale
                                                                                    </option>
                                                                                    <option value="Une entité juridique">Une entité
                                                                                        juridique
                                                                                    </option>
                                                                                </AvInput>
                                                                            </AvGroup>
                                                                        </div>
                                                                        <div className="col-lg-6">
                                                                            <AvGroup className="mb-3">
                                                                                <Label for="role">Role</Label>
                                                                                <AvInput type="select" name="role" id="role"
                                                                                         value={this.state.newActionnaire.role}>
                                                                                    <option value="Associé">Associé</option>
                                                                                    <option value="Mandataire d'associé">Mandataire
                                                                                        d'associé
                                                                                    </option>
                                                                                </AvInput>
                                                                            </AvGroup>
                                                                        </div>
                                                                    </div>
                                                                    <div className="row">
                                                                        <div className="col-lg-6">
                                                                            <AvGroup className="mb-3">
                                                                                <Label for="nom">Nom</Label>
                                                                                <AvInput type="text" name="nom" id="nom"
                                                                                         placeholder=""
                                                                                         value={this.state.newActionnaire.firstname}
                                                                                         required/>
                                                                                <AvFeedback>Ce champs est obligatoire</AvFeedback>
                                                                            </AvGroup>
                                                                        </div>
                                                                        <div className="col-lg-6">
                                                                            <AvGroup className="mb-3">
                                                                                <Label for="prenom">Prénom</Label>
                                                                                <AvInput type="text" name="prenom" id="prenom"
                                                                                         placeholder=""
                                                                                         value={this.state.newActionnaire.lastname}
                                                                                         required/>
                                                                                <AvFeedback>Ce champs est obligatoire</AvFeedback>
                                                                            </AvGroup>
                                                                        </div>
                                                                    </div>
                                                                    <div className="row">
                                                                        <div className="col-lg-6">
                                                                            <AvGroup className="mb-3">
                                                                                <Label for="email">Email</Label>
                                                                                <AvInput type="email" name="email" id="email"
                                                                                         placeholder="Ex: user@exemple.com"
                                                                                         value={this.state.newActionnaire.email}
                                                                                         required/>
                                                                                <AvFeedback>Email invalide</AvFeedback>
                                                                            </AvGroup>
                                                                        </div>
                                                                        <div className="col-lg-6">
                                                                            <AvGroup className="mb-3">
                                                                                <Label for="password">Numéro de téléphone</Label>
                                                                                <PhoneInput defaultCountry={'fr'} value={this.state.newActionnaire.phone}
                                                                                            onChange={this.handleOnChangePhone} inputStyle={{
                                                                                    width:"inherit",height:37
                                                                                }}/>
                                                                            </AvGroup>
                                                                        </div>
                                                                    </div>

                                                                    <div className="row">
                                                                        <div className="col-lg-6">
                                                                            <AvGroup className="mb-3">
                                                                                <Label for="datnaiss">Date de naissance</Label>
                                                                                <AvInput type="date" name="datnaiss" id="datnaiss"
                                                                                         placeholder=""
                                                                                         value={this.state.newActionnaire.birthday}
                                                                                         required/>
                                                                                <AvFeedback>Date invalide</AvFeedback>
                                                                            </AvGroup>
                                                                        </div>
                                                                        <div className="col-lg-6">
                                                                            <AvGroup className="mb-3">
                                                                                <Label for="nationality">Nationnalité</Label>
                                                                                <AvInput type="text" name="nationality"
                                                                                         id="nationality"
                                                                                         placeholder=""
                                                                                         value={this.state.newActionnaire.nationality}
                                                                                         required/>
                                                                                <AvFeedback>Ce champs est obligatoire</AvFeedback>
                                                                            </AvGroup>
                                                                        </div>
                                                                    </div>

                                                                    <div className="row">
                                                                        <div className="col-lg-12">
                                                                            <AvGroup className="mb-3">
                                                                                <Label for="adress">Adresse</Label>
                                                                                <AvInput type="text" name="adress" id="adress"
                                                                                         placeholder=""
                                                                                         value={this.state.newActionnaire.adress}
                                                                                         required/>
                                                                                <AvFeedback>Ce champs est obligatoire</AvFeedback>
                                                                            </AvGroup>
                                                                        </div>
                                                                    </div>

                                                                    <div className="row">
                                                                        <div className="col-lg-6">
                                                                            <AvGroup className="mb-3">
                                                                                <Label for="postalcode">Code postal</Label>
                                                                                <AvInput type="number" name="postalcode"
                                                                                         id="postalcode"
                                                                                         placeholder=""
                                                                                         value={this.state.newActionnaire.postalCode}
                                                                                         required/>
                                                                                <AvFeedback>Code postal invalide</AvFeedback>
                                                                            </AvGroup>
                                                                        </div>
                                                                        <div className="col-lg-6">
                                                                            <AvGroup className="mb-3">
                                                                                <Label for="pays">Pays</Label>
                                                                                <AvInput type="select" name="pays" id="pays"
                                                                                         value={this.state.newActionnaire.pays}
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
                                                                        <div className="col-lg-12">
                                                                            <AvGroup className="mb-3">
                                                                                <AvInput type="checkbox" name="sendmail"
                                                                                         id="sendmail"/>
                                                                                <Label for="sendmail">Voulez-vous envoyer un accès
                                                                                    par email à cet utilisateur</Label>
                                                                            </AvGroup>
                                                                        </div>

                                                                    </div>

                                                                    <FormGroup>
                                                                        <div className="text-center">
                                                                            <Button color="primary" className="btn btn-danger waves-effect waves-light">
                                                                                {this.state.loading ?
                                                                                    <div className="spinner-border avatar-xs text-white m-1"
                                                                                         role="status"></div> : 'Créer'
                                                                                }
                                                                            </Button>
                                                                        </div>
                                                                    </FormGroup>
                                                                </AvForm>

                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            }

                                        </div>
                                    </div>
                                </div>

                            </div>

                            <div className="row" style={{marginTop: 35}}>
                                <div className="col-lg-12">
                                    <div className="card">
                                        <div className="card-body ">
                                            <h4 className="header-title mt-0 mb-3">Liste des actionnaires selectionnées</h4>
                                            <ul className="list-unsyled m-0 pl-0 transaction-history">
                                                {
                                                    this.state.selectedActio.map((item, key) => (
                                                        <li className="align-items-center d-flex justify-content-between">
                                                            <div className="media">
                                                                <div className="media-body align-self-center">
                                                                    <div className="transaction-data">
                                                                        <h3 className="m-0">{item.firstname + ' ' + item.lastname} </h3>
                                                                        <p className="text-muted mb-0">{item.type} </p>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className="transaction-icon">
                                                                <i className="mdi mdi-delete-circle"
                                                                   onClick={this.removeActioFromList(key)}
                                                                   style={{cursor: 'pointer'}}></i>
                                                            </div>
                                                        </li>
                                                    ))
                                                }
                                            </ul>
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

export default choixActionnaires;