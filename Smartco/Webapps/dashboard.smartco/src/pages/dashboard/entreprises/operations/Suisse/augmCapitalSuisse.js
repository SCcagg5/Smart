import React, {Component} from "react";
import "firebase/database"
import {AvFeedback, AvForm, AvGroup, AvInput} from "availity-reactstrap-validation";
import {Button, FormGroup, Label} from "reactstrap";
import MySnackbarContentWrapper from "../../../../../tools/customSnackBar";
import Snackbar from "@material-ui/core/Snackbar";
import firebase from "firebase/app";
import "firebase/database"
import verifForms from "../../../../../tools/verifForms";
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'
import countryList from "../../../../../tools/countryList";
import france from "../../../../../assets/images/flags/france.png";
import suisse from "../../../../../assets/images/flags/suisse.png";
import tunisie from "../../../../../assets/images/flags/tunisie.png";
import Checkbox from '@material-ui/core/Checkbox';
import { withStyles } from '@material-ui/core/styles';
import { green } from '@material-ui/core/colors';
import moment from "moment";
import maillingService from "../../../../../provider/maillingService";
import PopupDate from "../../../../../components/PopupDate";
import TopBar from "../../../../../components/TopBar/TopBar";
import logo from "../../../../../assets/images/logos/logoSmartCo.jpeg";
import SideMenu from "../../../../../components/SideMenu/SideMenu";
import data from "../../../../../data/data";
import SideBar from "../../../../../components/SideBar/SideBar";


const GreenCheckbox = withStyles({
    root: {
        color: green[400],
        '&$checked': {
            color: green[600],
        },
    },
    checked: {},
})(props => <Checkbox color="default" {...props} />);

class AugmCapitalSuisse extends Component {


    constructor(props) {
        super(props);
        this.newAssocForm={};
        this.state = {
            loading: false,
            selectedSieMenuItem: "soc",
            openSideMenu: false,
            showSecondSideBar: false,

            entreprise: '',
            actioPhy: [],
            actioMoral: [],
            showNewActioForm: false,

            openAlert: false,
            alertMessage: '',
            alertType: '',

            newActionnaire: {
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
                origine: "",
                isAdministrator: 'false',
                isHaveSuisseId: 'false',
                signatureProcuration: '',
                signatureStatut: '',
                signatureDeclaration: '',
                nbActions: '',
                representant: [],
                ej_name: '',
                formeSocial: 'SARL',
                typeTmp: 'Un particulier'
            },

            selectedActio: [],

            augmentationcapital:{
                date_ass_genrale: '',
                nbNewActEmis: '',
                agio: '',
                dateCreation:'',
                to:[],
                prixNominal:'',
                prixEmission:'',
                oldCapital:'',
                newCapital:'',
                type:'primeEmission'
            },
            sAssociates:[],
            totalNewActions:0,

            typeAugCapital:"1"
        };
    }


    componentDidMount() {
        if (this.props.location.state === null || this.props.location.state === undefined) {
            this.props.history.goBack();
        } else {
            this.setState({
                entreprise: this.props.location.state.entreprise,
                sAssociates: this.props.location.state.entreprise.sAssociate || [],
                actioPhy: this.props.location.state.entreprise.sAdministrator || [],
                actioMoral: this.props.location.state.entreprise.sAssociate || [],
            })
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

    handleObjectArrayChange = (object,key,name,type) => event => {
        let objCopy = this.state[object];
        objCopy[key][name] = event.target.value || "";

        let totalNewActions = 0;
        if(type === "old"){
            objCopy.map((item,x) => {
                if(item.nbNewActions && ! verifForms.verif_Number(item.nbNewActions) && item.nbActions !== "0"){
                    totalNewActions = totalNewActions +  parseInt(item.nbNewActions);
                }
            });
            this.setState({
                [object]: objCopy,totalNewActions:totalNewActions
            });
        }else{
            let objCopy = this.state[object];
            objCopy[key][name] = event.target.value || "";
            this.setState({
                [object]: objCopy
            });
        }
    };

    handleOnChangePhone = (value) => {
        let objCopy = this.state.newActionnaire;
        objCopy.phone = value;
        this.setState({ newActionnaire: objCopy });
    };

    addRepresentant = (x)  => {
        let objCopy = this.state.newActionnaire;
        objCopy.representant.push({
            rep_firstname: '',
            rep_lastname: '',
        });
        this.setState({
            newActionnaire: objCopy
        })

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
                origine: "",
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


    ajouterAssocie = (event, values) => {

        let arrayOfAssoc = this.state.entreprise.sAssociate;
        let assocCopy = this.state.entreprise.sAssociate;
        let nbAssocs = this.state.entreprise.nbAssociate;

        let repCopy = this.state.newActionnaire.representant || [];
        repCopy.map((rep, repkey) => {
            assocCopy.representant[repkey].rep_firstname = values['repnom' + "_" + repkey] || "";
            assocCopy.representant[repkey].rep_lastname = values['repprenom' + "_" + repkey] || "";
        });

        assocCopy.push({
            id: '_' + Math.random().toString(36).substr(2, 9),
            email: values['emailMo'] || '',
            pwd: Math.random().toString(36).substr(2, 5),
            phone: this.state.newActionnaire.phone,
            type: this.state.newActionnaire.type,
            civility: values['civiliteMo'] || "",
            firstname: values['firstnameMo'] || "",
            lastname: values['lastnameMo'] || "",
            adress: values['adressMo'],
            postalCode: values['postalCodeMo'],
            pays: values['paysMo'],
            ville: values['villeMo' ],
            birthday: values['birthdayMo'] || "",
            nationality: values['nationalityMo'] || "",
            origine: values['origineMo'] || "",
            isAdministrator: 'false',
            isHaveSuisseId: 'false',
            signatureProcuration: '',
            signatureStatut: '',
            signatureDeclaration: '',
            nbActions: '0',
            representant: repCopy,
            ej_name: values['ejname'] || "",
            formeSocial: values['formeMo'] || "",
        });

        firebase.database().ref('society/' + localStorage.getItem('uid') + 'Suisse').update({
            'sAssociate':assocCopy,
            'nbAssociate' :nbAssocs + 1
        });

        this.newAssocForm.reset();
        this.openSnackbar('success','Le nouveau associé est ajouté avec succès');
        this.setState({showNewActioForm:false})

    };


    handleRadioChange = (object, name, value) => event => {
        let objCopy = this.state[object];
        objCopy.name = value;
        this.setState({
            [object]: objCopy
        })
    };

    handleTypeTmpChange = (value) => {
        //console.log(value)
        let actiosCopy = this.state.newActionnaire;
        actiosCopy.typeTmp = value;
        this.setState({newActionnaire: actiosCopy})
    };

    saveAugmCapital = () => {

        let sCapital = this.state.entreprise.sCapital;
        let capitalHistory = sCapital.capitalHistory || [];
        let associes = this.state.sAssociates;
        let totalNbActions = parseInt(this.state.entreprise.sCapital.totalNbActions) + this.state.totalNewActions;

        let augmCapitalArray = this.state.entreprise.augmCapital || [];
        let augmentationcapital = this.state.augmentationcapital;

        let to =[];
        let recipients=[];

        associes.map((item,key) => {
            if(item.nbNewActions && ! verifForms.verif_Number(item.nbNewActions) && item.nbActions !== "0"){
                to.push({associe: item,newActionsEmis:item.nbNewActions,isNewAssocie:false});
                item.nbActions = (parseInt(item.nbActions) + parseInt(item.nbNewActions)).toString();
                recipients.push(item.email)
            }
            if(item.nbNewActions && ! verifForms.verif_Number(item.nbNewActions) && item.nbActions === "0"){
                to.push({associe: item,newActionsEmis:item.nbNewActions,isNewAssocie:true});
                item.nbActions = parseInt(item.nbNewActions).toString();
                recipients.push(item.email)
            }
            item.nbNewActions ="";
            item.addToAugmCapital ="";
        });

        augmentationcapital.to = to;
        augmentationcapital.dateCreation = moment().format("YYYY-MM-DD");
        augmentationcapital.oldCapital = sCapital.totalCapital;
        augmentationcapital.nbNewActEmis = this.state.totalNewActions.toString();


        if( this.state.typeAugCapital === "1"){
            sCapital.totalCapital = (parseInt(sCapital.totalCapital) + parseInt(this.state.augmentationcapital.prixEmission)).toString();
            sCapital.totalNbActions = totalNbActions.toString();
            capitalHistory.push({
                nbActions:this.state.totalNewActions.toString(),
                nominalValue:sCapital.lastNominalValue
            });
            sCapital.capitalHistory = capitalHistory;
            augmentationcapital.prixNominal = sCapital.lastNominalValue;
            augmentationcapital.newCapital = sCapital.totalCapital;

        }else if( this.state.typeAugCapital === "2" ){
            sCapital.totalCapital = (parseInt(sCapital.totalCapital) + (this.state.totalNewActions * parseInt(this.state.augmentationcapital.prixNominal))).toString()
            sCapital.totalNbActions = totalNbActions.toString();
            sCapital.lastNominalValue = this.state.augmentationcapital.prixNominal;
            capitalHistory.push({
                nbActions:this.state.totalNewActions.toString(),
                nominalValue:this.state.augmentationcapital.prixNominal
            });
            sCapital.capitalHistory = capitalHistory;
            augmentationcapital.prixNominal = this.state.augmentationcapital.prixNominal;
            augmentationcapital.newCapital = sCapital.totalCapital;
            augmentationcapital.type = "PrixNominal"
        }

        augmCapitalArray.push(augmentationcapital);

        firebase.database().ref('society/' + localStorage.getItem('uid') + 'Suisse').update({
            'augmCapital':augmCapitalArray,
            'sAssociate': associes,
            'sCapital':sCapital
        });

        setTimeout(() => {

            maillingService.sendDocsToAssociesAfterAugmCapital({
                uid:localStorage.getItem("uid")+"Suisse",
                numAugmCapital:augmCapitalArray.length - 1 ,
                recipients:recipients
            }).then( ok => {
                console.log("all docs sended");
            }).catch( err => console.log(err));

        },1000);


        this.openSnackbar('success',"L'opération d'augmentation de capital est effectuée avec succès" );
        setTimeout(() => {
            this.props.history.push("/gestion/entreprises");
        },1000);

    };

    render() {
        let actionnaires = this.state.sAssociates;
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

                <div style={{paddingLeft:"10%",marginRight:50,marginTop:50}}>

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
                                        <div className="col-md-3">
                                            <div className="form-group mb-3">
                                                <label htmlFor="agio">Agio d'émission</label>
                                                <input type="text" className="form-control" id="agio"
                                                       value={this.state.augmentationcapital.agio}
                                                       onChange={this.handleObjectChange('augmentationcapital','agio')}/>
                                            </div>
                                        </div>
                                        <div className="col-md-3">
                                            <div className="form-group mb-3">
                                                <label htmlFor="dateass">Date de l'assemblée générale</label>
                                                {/*<input type="date" className="form-control" id="dateass"
                                                               value={this.state.augmentationcapital.date_ass_genrale}
                                                               onChange={this.handleObjectChange('augmentationcapital','date_ass_genrale')}/>*/}
                                                <PopupDate
                                                    showLabels={false}
                                                    value={this.state.augmentationcapital.date_ass_genrale}
                                                    onDateChange={ date => {
                                                        let objCp = this.state.augmentationcapital;
                                                        objCp.date_ass_genrale = date;
                                                        this.setState({augmentationcapital:objCp})
                                                    }}
                                                    format='day/month/year'
                                                    invalidMessage="Date invalide"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-md-12">
                                            <h5 className="mb-3">
                                                Augmenter le capital avec ?
                                            </h5>
                                            <div className="row">
                                                <div className="col-md-6">
                                                    <div className="radio radio-pink mb-2">
                                                        <input type="radio"
                                                               name={"radioTypeAg"}
                                                               id={"radioTypeAg1"}
                                                               style={{marginLeft: 10}}
                                                               onClick={() => this.setState({typeAugCapital:"1"})}
                                                               checked={this.state.typeAugCapital === "1"}
                                                               value={this.state.typeAugCapital}/>
                                                        <label htmlFor={"radioTypeAg1"}>
                                                            Une prime d'émission
                                                        </label>
                                                    </div>
                                                    {
                                                        this.state.typeAugCapital === "1" &&
                                                        <div className="row ml-3">
                                                            <div className="col-md-8">
                                                                <div className="form-group mb-3">
                                                                    <div className="input-group">
                                                                        <input type="text" className="form-control" id="prime"
                                                                               placeholder="Prime d'émission"
                                                                               value={this.state.augmentationcapital.prixEmission}
                                                                               onChange={this.handleObjectChange('augmentationcapital','prixEmission')}/>
                                                                        <div className="input-group-prepend">
                                                                            <span className="input-group-text font-weight-bold" id="basic-addon1">CHF</span>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    }

                                                </div>
                                                <div className="col-md-6">
                                                    <div className="radio radio-pink mb-2">
                                                        <input type="radio"
                                                               name={"radioTypeAg"}
                                                               id={"radioTypeAg2"}
                                                               style={{marginLeft: 10}}
                                                               onClick={() => this.setState({typeAugCapital:"2"})}
                                                               checked={this.state.typeAugCapital === "2"}
                                                               value={this.state.typeAugCapital}/>
                                                        <label htmlFor={"radioTypeAg2"}>
                                                            Changement de la valuer nominal d'un part social
                                                        </label>
                                                    </div>
                                                    {
                                                        this.state.typeAugCapital === "2" &&
                                                        <div className="row ml-3">
                                                            <div className="col-md-8">
                                                                <div className="form-group mb-2">
                                                                    <div className="input-group">
                                                                        <input type="text" className="form-control" id="nominal"
                                                                               placeholder="Prix nominal par action"
                                                                               value={this.state.augmentationcapital.prixNominal}
                                                                               onChange={this.handleObjectChange('augmentationcapital','prixNominal')}
                                                                        />
                                                                        <div className="input-group-prepend">
                                                                            <span className="input-group-text font-weight-bold" id="basic-addon1">CHF</span>
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

                                    <div className="row">
                                        <div className="col-12">
                                            <div className="card">
                                                <div className="card-body">
                                                    <div className="card-widgets"/>
                                                    <h4 className="header-title mb-0">Liste des associés existants</h4>

                                                    <div id="cardCollpase4" className="collapse pt-3 show">
                                                        <div className="table-responsive">
                                                            <table className="table table-centered table-borderless mb-0">
                                                                <thead className="thead-light">
                                                                <tr>
                                                                    <th>Associés</th>
                                                                    <th>Email</th>
                                                                    <th style={{textAlign:"center"}}>Nationnalité</th>
                                                                    <th className="text-center">Téléphone</th>
                                                                    <th className="text-center">Nb actions avant augmentat.</th>
                                                                    <th className="text-center">Nombre d'actions nouvelles</th>
                                                                </tr>
                                                                </thead>
                                                                <tbody>
                                                                {
                                                                    actionnaires.map((item, key) => (
                                                                        item.nbActions !== "0" &&
                                                                        <tr>
                                                                            <td>{ (item.firstname === "" && item.lastname) === "" ? item.ej_name :  item.firstname + ' ' + item.lastname}</td>
                                                                            <td>
                                                                                <span className="badge bg-soft-blue text-blue p-1">{item.email} </span>
                                                                            </td>
                                                                            <td align="center">
                                                                                <img src={(item.nationality === "France" || item.pays === "France") ?
                                                                                    france : (item.nationality === "Switzerland" || item.pays === "Switzerland") ? suisse : tunisie}
                                                                                     alt="society-flags" height="24" />
                                                                            </td>
                                                                            <td className="text-center font-weight-bold" style={{color:"#000"}}>
                                                                                {item.phone}
                                                                            </td>
                                                                            <td className="text-center"><span
                                                                                className="badge bg-soft-danger text-danger p-1">{item.nbActions +  " actions"} </span>
                                                                            </td>

                                                                            <td align="center">
                                                                                <input type="text" className="form-control" id="nbNewActions"
                                                                                       placeholder="Exp: 50"
                                                                                       style={{width:120}}
                                                                                       value={this.state.entreprise.sAssociate[key].nbNewActions || ""}
                                                                                       onChange={this.handleObjectArrayChange('sAssociates',key,'nbNewActions',"old")}
                                                                                />
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
                                            <div className="col-md-5">
                                                <button type="button" className="btn btn-info waves-effect waves-light"
                                                        onClick={() => {
                                                            this.setState({showNewActioForm: true})
                                                        }}>
                                                    <i className="mdi mdi-plus mr-1"></i> Ajouter un nouveau associé
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
                                                        <AvForm ref={ f => (this.newAssocForm = f)}
                                                                onValidSubmit={(event, values) => this.ajouterAssocie(event, values)}>

                                                            <div>

                                                                <div className="row">
                                                                    <div className="col-lg-6">
                                                                        <AvGroup className="mb-3">
                                                                            <Label for="forme">L'associé est</Label>
                                                                            <AvInput type="select"
                                                                                     name={"formeMo"}
                                                                                     id={"formeMo"}
                                                                                     onChange={(event) => this.handleTypeTmpChange(event.target.value)}
                                                                                     value={this.state.newActionnaire.type}>
                                                                                <option
                                                                                    value="Un particulier">Un particulier
                                                                                </option>
                                                                                <option
                                                                                    value="Une entité juridique">Une entité juridique
                                                                                </option>
                                                                            </AvInput>
                                                                        </AvGroup>
                                                                    </div>
                                                                    <div className="col-lg-6">
                                                                        {
                                                                            this.state.newActionnaire.typeTmp === "Un particulier" ?
                                                                                <AvGroup className="mb-3">
                                                                                    <Label
                                                                                        for="role">Civilité</Label>
                                                                                    <AvInput type="select"
                                                                                             name={"civiliteMo"}
                                                                                             id={"civiliteMo"}
                                                                                             value={this.state.newActionnaire.gender}>
                                                                                        <option
                                                                                            value="M.">M.
                                                                                        </option>
                                                                                        <option
                                                                                            value="Mme">Mme
                                                                                        </option>
                                                                                    </AvInput>
                                                                                </AvGroup> :
                                                                                <AvGroup className="mb-3">
                                                                                    <Label for="role">Forme social</Label>
                                                                                    <AvInput type="select"
                                                                                             name={"formeSo"}
                                                                                             id={"formeSo"}
                                                                                             value={this.state.newActionnaire.formeSocial}>
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
                                                                    this.state.newActionnaire.typeTmp !== "Un particulier" &&
                                                                    [
                                                                        this.state.newActionnaire.representant.map((rep, keyrep) => (
                                                                            <div className="row">
                                                                                <div className="col-lg-6">
                                                                                    <AvGroup className="mb-3">
                                                                                        <Label for="email">Nom du représentant</Label>
                                                                                        <AvInput type="text"
                                                                                                 name={"repnom" + "_" + keyrep}
                                                                                                 id={"repnom" + "_" + keyrep}
                                                                                                 value={this.state.newActionnaire.representant[keyrep].rep_firstname}
                                                                                                 required/>
                                                                                        <AvFeedback>Ce champs est obligatoire</AvFeedback>
                                                                                    </AvGroup>
                                                                                </div>
                                                                                <div className="col-lg-6">
                                                                                    <AvGroup className="mb-3">
                                                                                        <Label for="email">Prénom du représentant</Label>
                                                                                        <AvInput type="text"
                                                                                                 name={"repprenom" + "_" + keyrep}
                                                                                                 id={"repprenom" + "_" + keyrep}
                                                                                                 value={this.state.newActionnaire.representant[keyrep].rep_lastname}
                                                                                                 required/>
                                                                                        <AvFeedback>Ce champs est obligatoire</AvFeedback>
                                                                                    </AvGroup>
                                                                                </div>
                                                                            </div>
                                                                        )),

                                                                        <div className="row">
                                                                            <div className="col-lg-12">
                                                                                <div
                                                                                    className="float-right">
                                                                                    <Button color="primary"
                                                                                            onClick={this.addRepresentant}
                                                                                            className="btn btn-danger waves-effect waves-light">
                                                                                        Ajouter un autre représentant
                                                                                    </Button>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    ]
                                                                }
                                                                <div className="row">
                                                                    {
                                                                        this.state.newActionnaire.typeTmp === "Un particulier" ?
                                                                            [
                                                                                <div className="col-lg-6">
                                                                                    <AvGroup
                                                                                        className="mb-3">
                                                                                        <Label for="nom">Nom</Label>
                                                                                        <AvInput type="text"
                                                                                                 name={"firstnameMo"}
                                                                                                 id={"firstnameMo"}
                                                                                                 value={this.state.newActionnaire.firstname}
                                                                                                 required/>
                                                                                        <AvFeedback>Ce champs est obligatoire</AvFeedback>
                                                                                    </AvGroup>
                                                                                </div>,
                                                                                <div className="col-lg-6">
                                                                                    <AvGroup
                                                                                        className="mb-3">
                                                                                        <Label
                                                                                            for="prenom">Prénom</Label>
                                                                                        <AvInput type="text"
                                                                                                 name={"lastnameMo"}
                                                                                                 id={"lastnameMo"}
                                                                                                 value={this.state.newActionnaire.lastname}
                                                                                                 required/>
                                                                                        <AvFeedback>Ce champs est obligatoire</AvFeedback>
                                                                                    </AvGroup>
                                                                                </div>

                                                                            ] :

                                                                            <div className="col-lg-12">
                                                                                <AvGroup className="mb-3">
                                                                                    <Label for="prenom">Nom de l'entité juridique</Label>
                                                                                    <AvInput type="text"
                                                                                             name={"ejname"}
                                                                                             id={"ejname"}
                                                                                             value={this.state.newActionnaire.ej_name}
                                                                                             required/>
                                                                                    <AvFeedback>Ce champs est obligatoire</AvFeedback>
                                                                                </AvGroup>
                                                                            </div>

                                                                    }

                                                                </div>
                                                                <div className="row">
                                                                    <div className="col-lg-6">
                                                                        <AvGroup className="mb-3">
                                                                            <Label for="email">Email</Label>
                                                                            <AvInput type="email"
                                                                                     name={"emailMo"}
                                                                                     id={"emailMo"}
                                                                                     value={this.state.newActionnaire.email}
                                                                                     required/>
                                                                            <AvFeedback>Email invalide</AvFeedback>
                                                                        </AvGroup>
                                                                    </div>
                                                                    <div className="col-lg-6">
                                                                        <AvGroup className="mb-3">
                                                                            <Label for="password">Numéro de téléphone</Label>
                                                                            <PhoneInput
                                                                                country={'fr'}
                                                                                value={this.state.newActionnaire.phone}
                                                                                onChange={(value) => this.handleOnChangePhone(value)}
                                                                                inputStyle={{
                                                                                    width: "inherit",
                                                                                    height: 37
                                                                                }}/>
                                                                        </AvGroup>
                                                                    </div>
                                                                </div>

                                                                {
                                                                    this.state.newActionnaire.typeTmp === "Un particulier" &&
                                                                    [
                                                                        <div className="row">
                                                                            <div className="col-lg-6">
                                                                                <AvGroup className="mb-3">
                                                                                    <Label for="datnaiss">Date de naissance</Label>
                                                                                    <AvInput type="date"
                                                                                             name={"birthdayMo" }
                                                                                             id={"birthdayMo"}
                                                                                             value={this.state.newActionnaire.birthday}
                                                                                             required/>
                                                                                    <AvFeedback>Date invalide</AvFeedback>
                                                                                </AvGroup>
                                                                            </div>
                                                                            <div className="col-lg-6">
                                                                                <AvGroup className="mb-3">
                                                                                    <Label
                                                                                        for="nationality">Nationnalité</Label>
                                                                                    <AvInput type="select"
                                                                                             name={"nationalityMo"}
                                                                                             id={"nationalityMo"}
                                                                                             value={this.state.newActionnaire.nationality}
                                                                                             onChange={(event) =>
                                                                                                 event.target.value === "Switzerland" ? this.setState({showOrigine: true}) : this.setState({showOrigine: false})
                                                                                             }>
                                                                                        {
                                                                                            countryList.map((item, key) => (
                                                                                                <option value={item.Name}>{item.Name}</option>
                                                                                            ))
                                                                                        }
                                                                                    </AvInput>
                                                                                    <AvFeedback>Ce champs est obligatoire</AvFeedback>
                                                                                </AvGroup>
                                                                            </div>
                                                                        </div>,
                                                                        this.state.showOrigine &&
                                                                        <div className="row">
                                                                            <div className="col-lg-6">
                                                                            </div>
                                                                            <div className="col-lg-3">
                                                                                <AvGroup className="mb-3">
                                                                                    <Label for="email">Merci
                                                                                        d'ajouter votre origine</Label>
                                                                                    <AvInput type="text"
                                                                                             name={"origineMo"}
                                                                                             id={"origineMo"}
                                                                                             value={this.state.newActionnaire.origine}
                                                                                             required/>
                                                                                    <AvFeedback>Ce Champs est obligatoire</AvFeedback>
                                                                                </AvGroup>
                                                                            </div>
                                                                        </div>

                                                                    ]
                                                                }

                                                                <h4 className="mb-3">
                                                                    {
                                                                        this.state.newActionnaire.typeTmp === "Un particulier" ? "Adresse de l'associé" : "Adresse du siège social"
                                                                    }
                                                                </h4>

                                                                <div className="row">
                                                                    <div className="col-lg-6">
                                                                        <AvGroup className="mb-3">
                                                                            <Label for="adress">Adresse</Label>
                                                                            <AvInput type="text"
                                                                                     name={"adressMo"}
                                                                                     id={"adressMo"}
                                                                                     value={this.state.newActionnaire.adress}
                                                                                     required/>
                                                                            <AvFeedback>Ce champs est obligatoire</AvFeedback>
                                                                        </AvGroup>
                                                                    </div>
                                                                    <div className="col-lg-6">
                                                                        <AvGroup className="mb-3">
                                                                            <Label
                                                                                for="adress">Ville</Label>
                                                                            <AvInput type="text"
                                                                                     name={"villeMo"}
                                                                                     id={"villeMo"}
                                                                                     value={this.state.newActionnaire.ville}
                                                                                     required/>
                                                                            <AvFeedback>Ce champs est obligatoire</AvFeedback>
                                                                        </AvGroup>
                                                                    </div>
                                                                </div>

                                                                <div className="row">
                                                                    <div className="col-lg-6">
                                                                        <AvGroup className="mb-3">
                                                                            <Label for="postalcode">Code postal</Label>
                                                                            <AvInput type="number"
                                                                                     name={"postalCodeMo"}
                                                                                     id={"postalCodeMo"}
                                                                                     value={this.state.newActionnaire.postalCode}
                                                                                     required/>
                                                                            <AvFeedback>Code postal invalide</AvFeedback>
                                                                        </AvGroup>
                                                                    </div>
                                                                    <div className="col-lg-6">
                                                                        <AvGroup className="mb-3">
                                                                            <Label for="pays">Pays</Label>
                                                                            <AvInput type="select"
                                                                                     name={"paysMo"}
                                                                                     id={"paysMo"}
                                                                                     value={this.state.newActionnaire.pays}
                                                                                     required>
                                                                                {
                                                                                    countryList.map((item, key) => (
                                                                                        <option value={item.Name}>{item.Name}</option>
                                                                                    ))
                                                                                }
                                                                            </AvInput>
                                                                            <AvFeedback>Ce champs est obligatoire</AvFeedback>
                                                                        </AvGroup>
                                                                    </div>
                                                                </div>
                                                                {
                                                                    this.state.newActionnaire.typeTmp === "Un particulier" &&
                                                                    <div className="row" style={{marginTop: 25}}>
                                                                        <div className="col-lg-12">
                                                                            <h4 className="mb-3">
                                                                                L’associé est-il également gérant et Président de la société ?
                                                                            </h4>
                                                                            <div
                                                                                className="radio radio-pink mb-2">
                                                                                <input type="radio"
                                                                                       name={"radioisPres"}
                                                                                       id={"radioisPres1"}
                                                                                       style={{marginLeft: 10}}
                                                                                       onClick={this.handleRadioChange("newActionnaire", "isAdministrator", "true")}
                                                                                       checked={this.state.newActionnaire.isAdministrator === "true"}
                                                                                       value={this.state.newActionnaire.isAdministrator}/>
                                                                                <label htmlFor={"radioisPres1"}>
                                                                                    Oui
                                                                                </label>
                                                                            </div>
                                                                            <div className="radio radio-pink mb-2">
                                                                                <input type="radio"
                                                                                       name={"radioisPres"}
                                                                                       id={"radioisPres2"}
                                                                                       style={{marginLeft: 10}}
                                                                                       onClick={this.handleRadioChange("newActionnaire", "isAdministrator", "false")}
                                                                                       checked={this.state.newActionnaire.isAdministrator === "false"}
                                                                                       value={this.state.newActionnaire.isAdministrator}/>
                                                                                <label htmlFor={"radioisPres2"}>
                                                                                    Non
                                                                                </label>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                }


                                                                {
                                                                    this.state.newActionnaire.typeTmp === "Un particulier" ?
                                                                        <div className="row"
                                                                             style={{marginTop: 15}}>
                                                                            <div className="col-lg-12">
                                                                                <Label for="canton">L'associé a-t-il une SuisseID ?</Label>
                                                                                <div
                                                                                    className="radio radio-pink mb-2">
                                                                                    <input type="radio"
                                                                                           name={"radioiSuis"}
                                                                                           id={"radioiSuis1"}
                                                                                           style={{marginLeft: 10}}
                                                                                           onClick={this.handleRadioChange("newActionnaire", "isHaveSuisseId", "true")}
                                                                                           checked={this.state.newActionnaire.isHaveSuisseId === "true"}
                                                                                           value={this.state.newActionnaire.isHaveSuisseId}/>
                                                                                    <label htmlFor={"radioiSuis1"}>
                                                                                        Oui
                                                                                    </label>
                                                                                </div>
                                                                                <div
                                                                                    className="radio radio-pink mb-2">
                                                                                    <input type="radio"
                                                                                           name={"radioiSuis"}
                                                                                           id={"radioiSuis2"}
                                                                                           style={{marginLeft: 10}}
                                                                                           onClick={this.handleRadioChange("newActionnaire", "isHaveSuisseId", "false")}
                                                                                           checked={this.state.newActionnaire.isHaveSuisseId === "false"}
                                                                                           value={this.state.newActionnaire.isHaveSuisseId}/>
                                                                                    <label
                                                                                        htmlFor={"radioiSuis2"}>
                                                                                        Non : Identification par vidéo
                                                                                        au moyen de votre passeport
                                                                                    </label>
                                                                                </div>
                                                                            </div>
                                                                        </div> :

                                                                        <div className="row"
                                                                             style={{marginTop: 15}}>
                                                                            <div className="col-lg-12">
                                                                                <Label for="canton">Est-ce
                                                                                    que le(s) représentant(s) a(ont) une SuisseID ? </Label>
                                                                                <div
                                                                                    className="radio radio-pink mb-2">
                                                                                    <input type="radio"
                                                                                           name={"radioiSuis"}
                                                                                           id={"radioiSuis1"}
                                                                                           style={{marginLeft: 10}}
                                                                                           onClick={this.handleRadioChange("newActionnaire", "isResresentantsHaveSuisseID", "true")}
                                                                                           checked={this.state.newActionnaire.isResresentantsHaveSuisseID === "true"}
                                                                                           value={this.state.newActionnaire.isResresentantsHaveSuisseID}/>
                                                                                    <label htmlFor={"radioiSuis1"}>
                                                                                        Oui
                                                                                    </label>
                                                                                </div>
                                                                                <div
                                                                                    className="radio radio-pink mb-2">
                                                                                    <input type="radio"
                                                                                           name={"radioiSuis"}
                                                                                           id={"radioiSuis2"}
                                                                                           style={{marginLeft: 10}}
                                                                                           onClick={this.handleRadioChange("newActionnaire", "isResresentantsHaveSuisseID", "false")}
                                                                                           checked={this.state.newActionnaire.isResresentantsHaveSuisseID === "false"}
                                                                                           value={this.state.newActionnaire.isResresentantsHaveSuisseID}/>
                                                                                    <label
                                                                                        htmlFor={"radioiSuis2"}>
                                                                                        Non : Identification par vidéo au moyen de votre passeport
                                                                                    </label>
                                                                                </div>
                                                                            </div>
                                                                            <div className="col-lg-12">
                                                                                <p style={{marginTop: 15}}>Si
                                                                                    l’actionnaire est une société étrangère vous
                                                                                    devez télécharger l’extrait du registre du
                                                                                    commerce démontrant que
                                                                                    1) la société existe et
                                                                                    2) qui sont les
                                                                                    représentants autorisés
                                                                                    de la société
                                                                                    dûment légalisé et
                                                                                    apostillé.</p>
                                                                                <div className="float-left">
                                                                                    <Button color="primary" className="btn btn-light waves-effect waves-light">
                                                                                        Télécharger le document
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

                                                            <FormGroup style={{marginTop: 20}}>
                                                                <div align="center">
                                                                    <Button color="primary" className="btn btn-danger waves-effect waves-light">
                                                                        Créer
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

                    <div className="row">
                        <div className="col-12">
                            <div className="card">
                                <div className="card-body">
                                    <div className="card-widgets"/>
                                    <h4 className="header-title mb-0">Liste de nouveaux actionnaires</h4>

                                    <div id="cardCollpase4" className="collapse pt-3 show">
                                        <div className="table-responsive">
                                            <table className="table table-centered table-borderless mb-0">
                                                <thead className="thead-light">
                                                <tr>
                                                    <th>Associés</th>
                                                    <th>Email</th>
                                                    <th style={{textAlign:"center"}}>Nationnalité</th>
                                                    <th className="text-center">Téléphone</th>
                                                    <th className="text-center">Inclus dans l'augm. de capital ?</th>
                                                    <th className="text-center">Nombre d'actions nouvelles</th>
                                                </tr>
                                                </thead>
                                                <tbody>
                                                {
                                                    actionnaires.map((item, key) => (
                                                        item.nbActions === "0" &&
                                                        <tr>
                                                            <td>{ (item.firstname === "" && item.lastname) === "" ? item.ej_name :  item.firstname + ' ' + item.lastname}</td>
                                                            <td>
                                                                <span className="badge bg-soft-blue text-blue p-1">{item.email} </span>
                                                            </td>
                                                            <td align="center">
                                                                <img src={(item.nationality === "France" || item.pays === "France") ?
                                                                    france : (item.nationality === "Suisse" || item.pays === "Suisse") ? suisse : tunisie}
                                                                     alt="society-flags" height="24" />
                                                            </td>
                                                            <td className="text-center font-weight-bold" style={{color:"#000"}}>
                                                                {item.phone}
                                                            </td>
                                                            <td align="center">
                                                                <GreenCheckbox
                                                                    checked={this.state.entreprise.sAssociate[key].addToAugmCapital === true}
                                                                    onChange={(e) => {
                                                                        let objCopy = this.state.sAssociates;
                                                                        objCopy[key]["addToAugmCapital"] = ! this.state.entreprise.sAssociate[key].addToAugmCapital;
                                                                        let totalNewActions =this.state.totalNewActions;
                                                                        if( objCopy[key]["addToAugmCapital"] === true){
                                                                            objCopy.map((item,x) => {
                                                                                if(item.nbNewActions && ! verifForms.verif_Number(item.nbNewActions) && item.addToAugmCapital === true){
                                                                                    totalNewActions = totalNewActions +  parseInt(item.nbNewActions);
                                                                                }
                                                                            });
                                                                            this.setState({sAssociates:objCopy,totalNewActions:totalNewActions})
                                                                        }else{

                                                                            this.setState({sAssociates:objCopy,
                                                                                totalNewActions:totalNewActions - this.state.entreprise.sAssociate[key].nbNewActions })
                                                                        }

                                                                    }}
                                                                    value={this.state.entreprise.sAssociate[key].addToAugmCapital}
                                                                />
                                                            </td>

                                                            <td align="center">
                                                                <input type="text" className="form-control" id="nbNewActions"
                                                                       placeholder="Exp: 50"
                                                                       style={{width:120}}
                                                                       value={this.state.entreprise.sAssociate[key].nbNewActions || ""}
                                                                       onChange={this.handleObjectArrayChange('sAssociates',key,'nbNewActions','new')}
                                                                />
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

                    <div className="row">
                        <div className="col-12">
                            <div className="card">
                                <div className="card-body">
                                    <div className="card-widgets"/>
                                    <div className="row">
                                        <div className="col-md-9">
                                            <h4 className="header-title mb-0">Total des actions nouvelles émises:</h4>
                                        </div>
                                        <div className="col-md-3" style={{float:"right"}}>
                                            <h3 style={{color:"red",fontWeight:"bold"}}>{this.state.totalNewActions} actions</h3>
                                        </div>
                                    </div>


                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-md-12" align="center">
                            <button type="button"
                                //disabled={this.state.totalNewActions === 0 || this.state.augmentationcapital.agio === "" || this.state.augmentationcapital.prixEmission === "" || this.state.augmentationcapital.date_ass_genrale === ""}
                                    className="btn btn-danger waves-effect waves-light btn-lg"
                                    onClick={this.saveAugmCapital}>
                                <h5 style={{fontWeight:"bold",color:"#fff"}}>
                                    Confirmer l'augmentation du capital</h5>
                            </button>
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






            </div>
        )
    }

}

export default AugmCapitalSuisse;