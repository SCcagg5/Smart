import React, {Component, Suspense} from "react";
import Loader from "../../../../../components/Loader";
import {Container} from "reactstrap";
import Typography from '@material-ui/core/Typography';
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import TextField from "@material-ui/core/TextField";
import FormGroup from '@material-ui/core/FormGroup';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Button from '@material-ui/core/Button';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MenuItem from "@material-ui/core/MenuItem";
import verifForms from "../../../../../tools/verifForms"
import firebase from "firebase/app";
import "firebase/database"
import "firebase/storage"
import SignatureCanvas from 'react-signature-canvas'
import MySnackbarContentWrapper from "../../../../../tools/customSnackBar";
import Snackbar from "@material-ui/core/Snackbar";
import CircularProgress from '@material-ui/core/CircularProgress';
import signatureService from "../../../../../provider/signatureService";
import CessionService from "../../../../../provider/cessionActionService";

const Topbar = React.lazy(() => import("../../../../../components/Topbar"));
const Navbar = React.lazy(() => import("../../../../../components/Navbar"));
const loading = () => <Loader/>;

class cessionActions extends Component {


    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            isMenuOpened: false,
            activeMenuItem: 'item-gestion',
            entreprise: "",
            cessionAction: {
                droitSociauxCedes: {
                    forme: '',
                    siege: '',
                    NumSIREN: '',
                    isPrepondImmobileire: '',
                    natureBiens: '',
                    nbTotalActions: '',
                    nbActionCedes: '',
                    dateRealisDef: '',
                },
                cedant: {
                    id: '',
                    type: '',
                    nomPrenom: '',
                    date_naiss: '',
                    paysNaiss: '',
                    nomConjoint: '',
                    adress: '',
                    email: '',
                    regimeMatrimonial: '',
                    NumSIREN: '',
                    codeActivite: '',
                    formeEtDenomin: '',
                    adress_siege: '',
                    signature: '',
                    phone:""
                },
                cessionnaire: {
                    id: '',
                    isFromSociety: '',
                    nomPrenom: '',
                    date_naiss: '',
                    paysNaiss: '',
                    nomConjoint: '',
                    adress: '',
                    email: '',
                    regimeMatrimonial: '',
                    NumSIREN: '',
                    codeActivite: '',
                    formeEtDenomin: '',
                    adress_siege: ''
                },
                originePropriete: {
                    date: '',
                    nature: '',
                    prix: ''
                },
                basetaxable: {
                    certifieA: '',
                    date: '',
                },
                modePaiement: ''
            },
            histoCessionAction: [],

            openAlert: false,
            alertMessage: '',
            alertType: '',

            codeSMSTaped: '',
            codeSMSsended: '',
        };
    }
    sigCanvas = {};

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

            //Cession d'actions
            let cession = {
                droitSociauxCedes: {},
                cedant: {},
                cessionnaire: {},
                originePropriete: {},
                basetaxable: {},
                modePaiement: ''
            };

            let data = this.props.location.state.entreprise;
            cession.droitSociauxCedes.forme = data.sBut;
            cession.droitSociauxCedes.NumSIREN = data.siren;
            cession.droitSociauxCedes.siege = data.sSiege.adress + ', ' + data.sSiege.pays + ' ' + data.sSiege.postalCode;
            cession.droitSociauxCedes.nbTotalActions = data.sCapital.minValActions;
            cession.droitSociauxCedes.isPrepondImmobileire = 'true';
            cession.droitSociauxCedes.dateRealisDef = '';
            cession.droitSociauxCedes.natureBiens = '';

            cession.cedant.type = '';
            cession.cedant.nomPrenom = '';
            cession.cedant.date_naiss = '';
            cession.cedant.id = '';
            cession.cedant.adress = '';
            cession.cedant.paysNaiss = '';
            cession.cedant.nomConjoint = '';
            cession.cedant.regimeMatrimonial = '';
            cession.cedant.NumSIREN = '';
            cession.cedant.codeActivite = '';
            cession.cedant.formeEtDenomin = '';
            cession.cedant.adress_siege = '';
            cession.cedant.signature = '';
            cession.cedant.phone = '';

            cession.cessionnaire.isFromSociety = 'false';
            cession.cessionnaire.nomPrenom = '';
            cession.cessionnaire.date_naiss = '';
            cession.cessionnaire.id = '';
            cession.cessionnaire.paysNaiss = '';
            cession.cessionnaire.email = '';
            cession.cessionnaire.nomConjoint = '';
            cession.cessionnaire.regimeMatrimonial = '';
            cession.cessionnaire.NumSIREN = '';
            cession.cessionnaire.codeActivite = '';
            cession.cessionnaire.formeEtDenomin = '';
            cession.cessionnaire.adress_siege = '';

            cession.originePropriete.date = '';
            cession.originePropriete.nature = '';
            cession.originePropriete.prix = '';

            cession.basetaxable.certifieA = '';
            cession.basetaxable.date = '';
            cession.basetaxable.signature = '';

            cession.modePaiement = '';


            this.setState({
                entreprise: this.props.location.state.entreprise,
                sActionnairePhy: this.props.location.state.entreprise.sActionnairePhy || [],
                sActionnaireMoral: this.props.location.state.entreprise.sActionnaireMoral || [],
                cessionAction: cession,
                histoCessionAction:this.props.location.state.entreprise.cessionAction || []
            });
        }
    }

    handleObjectChange = (object, name) => event => {
        let objCopy = this.state[object];
        objCopy[name] = event.target.value;
        this.setState({
            [object]: objCopy
        });
    };

    handleObjectObjectChange = (object1, object2, name) => event => {
        if (name === 'id') {
            (this.state.sActionnairePhy || []).concat(this.state.sActionnaireMoral || []).find(item => {
                if (item.id === event.target.value) {

                    let objCopy = this.state[object1];
                    objCopy[object2]['id'] = event.target.value;
                    objCopy[object2]['nomPrenom'] = item.firstname + ' ' + item.lastname;
                    objCopy[object2]['date_naiss'] = item.birthday;
                    objCopy[object2]['paysNaiss'] = item.nationality;
                    objCopy[object2]['adress'] = item.adress;
                    objCopy[object2]['email'] = item.email;

                    if (object2 === 'cedant') {
                        (this.state.signatures || []).find(itemSig => {
                            if (itemSig.actId === event.target.value) {
                                objCopy[object2]['signature'] = itemSig.signuatureUrl;
                            }
                        });
                    }

                    this.setState({
                        [object1]: objCopy
                    });
                }
            });
        } else if (name === 'type') {

            let objCopy = this.state[object1];
            objCopy[object2]['type'] = event.target.value;
            objCopy[object2]['id'] = '';
            objCopy[object2]['nomPrenom'] = '';
            objCopy[object2]['date_naiss'] = '';
            objCopy[object2]['paysNaiss'] = '';
            objCopy[object2]['adress'] = '';
            objCopy[object2]['NumSIREN'] = '';
            objCopy[object2]['codeActivite'] = '';
            objCopy[object2]['formeEtDenomin'] = '';
            objCopy[object2]['adress_siege'] = '';

            this.setState({
                [object1]: objCopy
            });

        } else if (name === 'nbActionCedes') {

            let objCopy = this.state[object1];
            objCopy[object2]['nbActionCedes'] = event.target.value;
            objCopy['cedant']['type'] = '';
            objCopy['cedant']['id'] = '';
            objCopy['cedant']['nomPrenom'] = '';
            objCopy['cedant']['date_naiss'] = '';
            objCopy['cedant']['paysNaiss'] = '';
            objCopy['cedant']['adress'] = '';
            objCopy['cedant']['NumSIREN'] = '';
            objCopy['cedant']['codeActivite'] = '';
            objCopy['cedant']['formeEtDenomin'] = '';
            objCopy['cedant']['adress_siege'] = '';

            this.setState({
                [object1]: objCopy
            });
        } else {

            let objCopy = this.state[object1];
            objCopy[object2][name] = event.target.value;
            this.setState({
                [object1]: objCopy
            });
        }

    };

    saveTransaction = () => {

        // MAJ du nb d'actions du cédant
        this.setState({
            loading:true,
        })

        if (this.state.sActionnaireMoral.find(x => x.id === this.state.cessionAction.cedant.id) !== undefined) {
            let val = parseInt(this.state.sActionnaireMoral.find(x => x.id === this.state.cessionAction.cedant.id).nbActions);
            console.log(val);
            this.state.sActionnaireMoral
                .find(x => x.id === this.state.cessionAction.cedant.id).nbActions = val - parseInt(this.state.cessionAction.droitSociauxCedes.nbActionCedes);
        }
        if (this.state.sActionnairePhy.find(x => x.id === this.state.cessionAction.cedant.id) !== undefined) {
            let val = this.state.sActionnairePhy.find(x => x.id === this.state.cessionAction.cedant.id).nbActions;
            this.state.sActionnairePhy
                .find(x => x.id === this.state.cessionAction.cedant.id).nbActions = val - parseInt(this.state.cessionAction.droitSociauxCedes.nbActionCedes);
        }

        // MAJ du nb d'action du cessionnaire s'il appartient à la société
        if (this.state.cessionAction.cessionnaire.isFromSociety === 'true') {

            if (this.state.sActionnaireMoral.find(x => x.id === this.state.cessionAction.cessionnaire.id) !== undefined) {
                let val = parseInt(this.state.sActionnaireMoral.find(x => x.id === this.state.cessionAction.cessionnaire.id).nbActions);
                this.state.sActionnaireMoral
                    .find(x => x.id === this.state.cessionAction.cessionnaire.id).nbActions = val + parseInt(this.state.cessionAction.droitSociauxCedes.nbActionCedes);
            }

            if (this.state.sActionnairePhy.find(x => x.id === this.state.cessionAction.cessionnaire.id) !== undefined) {
                let val = parseInt(this.state.sActionnairePhy.find(x => x.id === this.state.cessionAction.cessionnaire.id).nbActions);
                this.state.sActionnairePhy
                    .find(x => x.id === this.state.cessionAction.cessionnaire.id).nbActions = val + parseInt(this.state.cessionAction.droitSociauxCedes.nbActionCedes);
            }
        }

        let arrayOftrans = this.state.histoCessionAction;
        arrayOftrans.push(this.state.cessionAction);
        arrayOftrans[arrayOftrans.length -1 ].basetaxable.signature = this.sigCanvas.getTrimmedCanvas().toDataURL('image/png');

        firebase.database().ref('society/' + localStorage.getItem('uid') + 'France').update({
            'cessionAction': arrayOftrans
        }).then(data => {

            this.openSnackbar('success', "La transaction a été effectué avec succès");

            setTimeout(()=>{
                CessionService.generateCefaDoc(this.props.location.state.entreprise.uniqueId, this.props.location.state.entreprise.paysOrigine, arrayOftrans.length -1).then(r => {
                    const file = new Blob(
                        [r],
                        {type: 'application/pdf'});
                    firebase.storage().ref("/France/docs").child("Cerfa-"+(arrayOftrans.length -1).toString()+"-"+this.props.location.state.entreprise.uniqueId)
                        .put(file).then((snapshot) => {
                        snapshot.ref.getDownloadURL().then( url => {
                            firebase.database().ref("/society/"+this.props.location.state.entreprise.uniqueId+"/cessionAction/"+(arrayOftrans.length -1).toString()).update({
                                'cerfaDocUrl':url
                            }).then( ok => {
                                window.open(url);
                                this.setState({loading: false});
                                this.props.history.push("/coffre-fort")
                            }).catch(err => console.log(err))
                        })
                    });

                }).catch(err => {
                    console.log(err)
                });
            },500);
        }).catch(function (error) {
            alert(error);
        });

    };

    verifCessionAction() {

        if (this.state.cessionAction.droitSociauxCedes.NumSIREN === '' || isNaN(this.state.cessionAction.droitSociauxCedes.NumSIREN) ||
            this.state.cessionAction.droitSociauxCedes.NumSIREN.length !== 9 || this.state.cessionAction.droitSociauxCedes.dateRealisDef === '' ||
            this.state.cessionAction.droitSociauxCedes.natureBiens === '' || this.state.cessionAction.droitSociauxCedes.nbActionCedes === '' ||
            isNaN(this.state.cessionAction.droitSociauxCedes.nbActionCedes) || this.state.cessionAction.droitSociauxCedes.nbActionCedes < 0 ||
            this.state.cessionAction.droitSociauxCedes.nbActionCedes > this.state.cessionAction.droitSociauxCedes.nbTotalActions ||

            this.state.cessionAction.cedant.date_naiss === '' || this.state.cessionAction.cedant.adress === '' ||
            this.state.cessionAction.cedant.nomConjoint === '' || this.state.cessionAction.cedant.regimeMatrimonial === '' ||
            /*this.state.cessionAction.cedant.signature === '' ||*/
            ((this.state.cessionAction.cedant.type === 'Actionnaire morale') && (
                    this.state.cessionAction.cedant.NumSIREN === '' || this.state.cessionAction.cedant.NumSIREN.length !== 9 ||
                    isNaN(this.state.cessionAction.cedant.NumSIREN) ||
                    this.state.cessionAction.cedant.codeActivite === '' || isNaN(this.state.cessionAction.cedant.codeActivite) ||
                    this.state.cessionAction.cedant.codeActivite.length !== 5 || this.state.cessionAction.cedant.formeEtDenomin === '' ||
                    this.state.cessionAction.cedant.adress_siege === ''
                )
            ) ||

            this.state.cessionAction.cessionnaire.date_naiss === '' ||
            this.state.cessionAction.cessionnaire.nomPrenom === '' || this.state.cessionAction.cessionnaire.nomConjoint === '' ||
            this.state.cessionAction.cessionnaire.email === '' || verifForms.verif_Email(this.state.cessionAction.cessionnaire.email) ||
            this.state.cessionAction.cessionnaire.adress_siege === '' || this.state.cessionAction.cessionnaire.formeEtDenomin === '' ||
            this.state.cessionAction.cessionnaire.NumSIREN === '' || isNaN(this.state.cessionAction.cessionnaire.NumSIREN) ||
            this.state.cessionAction.cessionnaire.NumSIREN.length !== 9 || this.state.cessionAction.cessionnaire.codeActivite === '' ||
            isNaN(this.state.cessionAction.cessionnaire.codeActivite) || this.state.cessionAction.cessionnaire.codeActivite.length !== 5 ||
            this.state.cessionAction.cessionnaire.adress === '' ||

            this.state.cessionAction.originePropriete.date === '' ||
            this.state.cessionAction.originePropriete.nature === '' || this.state.cessionAction.originePropriete.prix === '' ||
            isNaN(this.state.cessionAction.originePropriete.prix) || this.state.cessionAction.originePropriete.prix < 0 ||

            this.state.cessionAction.basetaxable.certifieA === '' || this.state.cessionAction.basetaxable.date === '' ||

            this.state.cessionAction.modePaiement === '' || this.state.codeSMSTaped === "" || this.state.codeSMSTaped !== this.state.codeSMSsended )
            return true;
        else return false;
    }

    sendSMSCode = () => {

        this.setState({loadingSMS:true});
        let msg = "Votre code de vérification de signature est: \n";
        let codeSMS = (Math.floor(100000 + Math.random() * 900000)).toString();

            signatureService.sendSMSToActio({
                msg: msg,
                url: codeSMS,
                to: "+21629034789"
            }).then(resSMS => {
                if (resSMS && resSMS.status === 200) {
                    console.log("SMS CODE SENDED");
                    this.setState({
                        codeSMSsended: codeSMS,
                        loadingSMS:false
                    });
                } else {
                    this.openSnackbar('error', "L'envoi du SMS est échoué ! Veuillez contacter l'administrateur");
                    this.setState({loadingSMS:false})
                }
            });

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
                            <div className="row" style={{marginTop: 35}}>
                                <div className="col-lg-12">
                                    <div className="card">
                                        <div className="card-body ">
                                            <a style={{color: 'hover: #21a5c2 !important', cursor: 'pointer'}}
                                               onClick={() => this.props.history.goBack()}
                                               className="float-right text-info">Retour</a>
                                            <h4 className="header-title mt-0 mb-3">Cession d'actions</h4>


                                            <div style={{marginLeft: 20, marginRight: 20, marginTop: 50}}>
                                                {/*Droits sociaux*/}
                                                <ExpansionPanel expanded={this.state.openFirstExpantionPanel}>
                                                    <ExpansionPanelSummary expandIcon={<ExpandMoreIcon onClick={() => {
                                                        this.setState({openFirstExpantionPanel: !this.state.openFirstExpantionPanel})
                                                    }}/>}>
                                                        <h5>DROIT SOCIAUX CEDES</h5>
                                                    </ExpansionPanelSummary>
                                                    <ExpansionPanelDetails style={{display: "block"}}>
                                                        <div>
                                                            <div className="row mb-2 mt-1">
                                                                <div className="col-md-4 mb-1">
                                                                    <Typography>Forme et designation de la
                                                                        société</Typography>
                                                                </div>

                                                                <div className="col-md-8">
                                                                    <TextField
                                                                        disabled={true}
                                                                        id='fds'
                                                                        defaultValue={this.state.cessionAction.droitSociauxCedes.forme}
                                                                        onChange={this.handleObjectObjectChange('cessionAction', 'droitSociauxCedes', 'forme')}
                                                                        margin="normal"
                                                                        style={{width: '80%', marginTop: -10}}
                                                                    />
                                                                </div>
                                                            </div>

                                                            <div className="row mb-2">
                                                                <div className="col-md-4 mb-1">
                                                                    <Typography>Siége de la société</Typography>
                                                                </div>

                                                                <div className="col-md-8">
                                                                    <TextField
                                                                        disabled={true}
                                                                        id='ss'
                                                                        defaultValue={this.state.cessionAction.droitSociauxCedes.siege}
                                                                        onChange={this.handleObjectObjectChange('cessionAction', 'droitSociauxCedes', 'siege')}
                                                                        margin="normal"
                                                                        style={{width: '80%', marginTop: -10}}
                                                                    />
                                                                </div>
                                                            </div>

                                                            <div className="row mb-2">
                                                                <div className="col-md-4 mb-1">
                                                                    <Typography>N° SIREN du principal
                                                                        établissement</Typography>
                                                                </div>

                                                                <div className="col-md-8">
                                                                    <TextField
                                                                        error={this.state.cessionAction.droitSociauxCedes.NumSIREN === '' ||
                                                                        isNaN(this.state.cessionAction.droitSociauxCedes.NumSIREN) ||
                                                                        this.state.cessionAction.droitSociauxCedes.NumSIREN.length !== 9
                                                                        }
                                                                        helperText={this.state.cessionAction.droitSociauxCedes.NumSIREN === '' ||
                                                                        isNaN(this.state.cessionAction.droitSociauxCedes.NumSIREN) ||
                                                                        this.state.cessionAction.droitSociauxCedes.NumSIREN.length !== 9 ? "Le N° SIREN doit contenir 9 chiffres" : ""}
                                                                        id='ss'
                                                                        defaultValue={this.state.cessionAction.droitSociauxCedes.NumSIREN}
                                                                        onChange={this.handleObjectObjectChange('cessionAction', 'droitSociauxCedes', 'NumSIREN')}
                                                                        margin="normal"
                                                                        style={{width: '80%', marginTop: -10}}
                                                                        disabled={true}
                                                                    />
                                                                </div>
                                                            </div>

                                                            <div className="row mb-2">
                                                                <div className="col-md-4 mb-1">
                                                                    <Typography>Société à prépondérance
                                                                        immobilière</Typography>
                                                                </div>

                                                                <div className="col-md-8">
                                                                    <FormGroup row
                                                                               style={{marginTop: -13}}>
                                                                        <FormControlLabel
                                                                            control={
                                                                                <Checkbox
                                                                                    checked={this.state.cessionAction.droitSociauxCedes.isPrepondImmobileire === 'true'}
                                                                                    onChange={this.handleObjectObjectChange('cessionAction', 'droitSociauxCedes', 'isPrepondImmobileire')}
                                                                                    value='true'
                                                                                />
                                                                            }
                                                                            label="Oui"
                                                                        />
                                                                        <FormControlLabel
                                                                            control={
                                                                                <Checkbox
                                                                                    checked={this.state.cessionAction.droitSociauxCedes.isPrepondImmobileire === 'false'}
                                                                                    onChange={this.handleObjectObjectChange('cessionAction', 'droitSociauxCedes', 'isPrepondImmobileire')}
                                                                                    value='false'
                                                                                />
                                                                            }
                                                                            label="Non"
                                                                        />
                                                                    </FormGroup>
                                                                </div>
                                                            </div>

                                                            <div className="row mb-2">
                                                                <div className="col-md-4 mb-1">
                                                                    <Typography>Nombre total des droits
                                                                        sociaux</Typography>
                                                                </div>

                                                                <div className="col-md-8">
                                                                    <TextField
                                                                        disabled={true}
                                                                        id='ss'
                                                                        defaultValue={this.state.cessionAction.droitSociauxCedes.nbTotalActions}
                                                                        onChange={this.handleObjectObjectChange('cessionAction', 'droitSociauxCedes', 'nbTotalActions')}
                                                                        margin="normal"
                                                                        style={{width: '80%', marginTop: -10}}
                                                                    />
                                                                </div>
                                                            </div>

                                                            <div className="row mb-2">
                                                                <div className="col-md-4 mb-1">
                                                                    <Typography>Date de réalisation définitive de
                                                                        l'apport de ces biens</Typography>
                                                                </div>

                                                                <div className="col-md-4">
                                                                    <TextField
                                                                        error={this.state.cessionAction.droitSociauxCedes.dateRealisDef === ''}
                                                                        id='ss'
                                                                        type='date'
                                                                        defaultValue={this.state.cessionAction.droitSociauxCedes.dateRealisDef}
                                                                        onChange={this.handleObjectObjectChange('cessionAction', 'droitSociauxCedes', 'dateRealisDef')}
                                                                        margin="normal"
                                                                        style={{width: '80%', marginTop: -10}}
                                                                        InputLabelProps={{
                                                                            shrink: true,
                                                                        }}
                                                                    />
                                                                </div>
                                                            </div>
                                                            <div className="row mb-2">
                                                                <div className="col-md-4 mb-1 ">
                                                                    <Typography>Nature des biens répresentés par les
                                                                        droits sociaux cédés</Typography>
                                                                </div>

                                                                <div className="col-md-8">
                                                                    <TextField
                                                                        error={this.state.cessionAction.droitSociauxCedes.natureBiens === ''}
                                                                        id='fds'
                                                                        defaultValue={this.state.cessionAction.droitSociauxCedes.natureBiens}
                                                                        onChange={this.handleObjectObjectChange('cessionAction', 'droitSociauxCedes', 'natureBiens')}
                                                                        margin="normal"
                                                                        style={{width: "80%", marginTop: -10}}
                                                                    />
                                                                </div>
                                                            </div>
                                                            <div className="row mb-2">
                                                                <div className="col-md-4 mb-1">
                                                                    <Typography>Nombre des droits sociaux
                                                                        cédés</Typography>
                                                                </div>

                                                                <div className="col-md-8">
                                                                    <TextField
                                                                        error={this.state.cessionAction.droitSociauxCedes.nbActionCedes === '' ||
                                                                        isNaN(this.state.cessionAction.droitSociauxCedes.nbActionCedes) ||
                                                                        this.state.cessionAction.droitSociauxCedes.nbActionCedes > this.state.cessionAction.droitSociauxCedes.nbTotalActions}
                                                                        id='ss'
                                                                        defaultValue={this.state.cessionAction.droitSociauxCedes.nbActionCedes}
                                                                        onChange={this.handleObjectObjectChange('cessionAction', 'droitSociauxCedes', 'nbActionCedes')}
                                                                        margin="normal"
                                                                        style={{width: "80%", marginTop: -10}}
                                                                    />
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </ExpansionPanelDetails>
                                                </ExpansionPanel>

                                                {/*Cédant*/}
                                                <ExpansionPanel>
                                                    <ExpansionPanelSummary expandIcon={<ExpandMoreIcon/>}>
                                                        <h5>CEDANT</h5>
                                                    </ExpansionPanelSummary>
                                                    <ExpansionPanelDetails style={{display: "block"}}>
                                                        <form noValidate autoComplete="off">


                                                            <div className="row mb-2">
                                                                <div className="col-md-4 mb-1">
                                                                    <Typography>Type</Typography>
                                                                </div>

                                                                <div className="col-md-8">
                                                                    <FormGroup row
                                                                               style={{
                                                                                   marginTop: -13,
                                                                                   marginLeft: 10,
                                                                                   width: "80%"
                                                                               }}>
                                                                        <FormControlLabel
                                                                            control={
                                                                                <Checkbox
                                                                                    checked={this.state.cessionAction.cedant.type === 'Actionnaire physique'}
                                                                                    onChange={this.handleObjectObjectChange('cessionAction', 'cedant', 'type')}
                                                                                    value='Actionnaire physique'
                                                                                />
                                                                            }
                                                                            label="Actionnaire physique"
                                                                        />
                                                                        <FormControlLabel
                                                                            control={
                                                                                <Checkbox
                                                                                    checked={this.state.cessionAction.cedant.type === 'Actionnaire morale'}
                                                                                    onChange={this.handleObjectObjectChange('cessionAction', 'cedant', 'type')}
                                                                                    value='Actionnaire morale'
                                                                                />
                                                                            }
                                                                            label="Actionnaire morale"
                                                                        />
                                                                    </FormGroup>
                                                                </div>
                                                            </div>
                                                            <div className="row mb-2">

                                                                <div className="col-md-4 mb-1">
                                                                    <Typography>Liste des actionnaires</Typography>
                                                                </div>

                                                                <div className="col-md-8">
                                                                    <TextField
                                                                        id='lsact'
                                                                        select
                                                                        value={this.state.cessionAction.cedant.nomPrenom}
                                                                        onChange={this.handleObjectObjectChange('cessionAction', 'cedant', 'id')}
                                                                        SelectProps={{
                                                                            MenuProps: {},
                                                                        }}
                                                                        style={{width: "80%", marginTop: -10}}
                                                                        margin="normal"
                                                                    >
                                                                        {this.state.cessionAction.cedant.type === 'Actionnaire physique' &&
                                                                        this.state.sActionnairePhy.map(actph => (

                                                                            //Vérifier si le cédant à le nombre d'action saisie dans la section Droit Sociaux Cedes
                                                                            parseInt(actph.nbActions) >= parseInt(this.state.cessionAction.droitSociauxCedes.nbActionCedes) ?
                                                                                <MenuItem key={actph.id}
                                                                                          value={actph.id}>
                                                                                    {actph.firstname + ' ' + actph.lastname}
                                                                                </MenuItem> : null
                                                                        ))}

                                                                        {this.state.cessionAction.cedant.type === 'Actionnaire morale' &&
                                                                        this.state.sActionnaireMoral.map(act => (

                                                                            //Vérifier si le cédant à le nombre d'action saisie dans la section Droit Sociaux Cedes
                                                                            parseInt(act.nbActions) >= parseInt(this.state.cessionAction.droitSociauxCedes.nbActionCedes) ?
                                                                                <MenuItem key={act.id}
                                                                                          value={act.id}>
                                                                                    {act.firstname + ' ' + act.lastname}
                                                                                </MenuItem> : null
                                                                        ))}
                                                                    </TextField>
                                                                </div>

                                                            </div>

                                                            {
                                                                this.state.cessionAction.cedant.nomPrenom !== '' ?

                                                                    [
                                                                        <div className="row mb-2">

                                                                            <div className="col-md-4 mb-1">
                                                                                <Typography>Nom de naissance et
                                                                                    prénom(s)</Typography>
                                                                            </div>
                                                                            <div className="col-md-8">
                                                                                <TextField
                                                                                    disabled={true}
                                                                                    id='nomp'
                                                                                    value={this.state.cessionAction.cedant.nomPrenom}
                                                                                    onChange={this.handleObjectObjectChange('cessionAction', 'cedant', 'nomPrenom')}
                                                                                    margin="normal"
                                                                                    style={{
                                                                                        width: "80%",
                                                                                        marginTop: -10
                                                                                    }}
                                                                                />
                                                                            </div>
                                                                        </div>,

                                                                        <div className="row mb-2">
                                                                            <div className="col-md-4 mb-1">
                                                                                <Typography>Date de
                                                                                    naissance</Typography>
                                                                            </div>
                                                                            <div className="col-md-8">
                                                                                <TextField
                                                                                    error={this.state.cessionAction.cedant.date_naiss === ''}
                                                                                    type='date'
                                                                                    id='ds'
                                                                                    value={this.state.cessionAction.cedant.date_naiss}
                                                                                    onChange={this.handleObjectObjectChange('cessionAction', 'cedant', 'date_naiss')}
                                                                                    margin="normal"
                                                                                    style={{
                                                                                        width: "80%",
                                                                                        marginTop: -10
                                                                                    }}
                                                                                />
                                                                            </div>
                                                                        </div>,

                                                                        <div className="row mb-2">
                                                                            <div className="col-md-4 mb-1">
                                                                                <Typography>Département et commune, ou
                                                                                    Pays de naissance</Typography>
                                                                            </div>
                                                                            <div className="col-md-8">
                                                                                <TextField
                                                                                    error={this.state.cessionAction.cedant.adress === ''}
                                                                                    id='pays'
                                                                                    value={this.state.cessionAction.cedant.adress}
                                                                                    onChange={this.handleObjectObjectChange('cessionAction', 'cedant', 'adress')}
                                                                                    margin="normal"
                                                                                    style={{
                                                                                        width: "80%",
                                                                                        marginTop: -10
                                                                                    }}
                                                                                />
                                                                            </div>
                                                                        </div>,

                                                                        <div className="row mb-2">
                                                                            <div className="col-md-4 mb-1">
                                                                                <Typography>Nom du conjoint</Typography>
                                                                            </div>
                                                                            <div className="col-md-8">
                                                                                <TextField
                                                                                    error={this.state.cessionAction.cedant.nomConjoint === ''}
                                                                                    id='nconj'
                                                                                    value={this.state.cessionAction.cedant.nomConjoint}
                                                                                    onChange={this.handleObjectObjectChange('cessionAction', 'cedant', 'nomConjoint')}
                                                                                    margin="normal"
                                                                                    style={{
                                                                                        width: "80%",
                                                                                        marginTop: -10
                                                                                    }}
                                                                                />
                                                                            </div>
                                                                        </div>,

                                                                        <div className="row mb-2">
                                                                            <div className="col-md-4 mb-1">
                                                                                <Typography>Adresse couriel</Typography>
                                                                            </div>
                                                                            <div className="col-md-8">
                                                                                <TextField
                                                                                    disabled={true}
                                                                                    id='adrC'
                                                                                    value={this.state.cessionAction.cedant.email}
                                                                                    onChange={this.handleObjectObjectChange('cessionAction', 'cedant', 'email')}
                                                                                    margin="normal"
                                                                                    style={{
                                                                                        width: "80%",
                                                                                        marginTop: -10
                                                                                    }}
                                                                                />
                                                                            </div>
                                                                        </div>,

                                                                        <div className="row mb-2">
                                                                            <div className="col-md-4 mb-1">
                                                                                <Typography>régime
                                                                                    matrimonial</Typography>
                                                                            </div>
                                                                            <div className="col-md-8">
                                                                                <TextField
                                                                                    error={this.state.cessionAction.cedant.regimeMatrimonial === ''}
                                                                                    id='reg'
                                                                                    value={this.state.cessionAction.cedant.regimeMatrimonial}
                                                                                    onChange={this.handleObjectObjectChange('cessionAction', 'cedant', 'regimeMatrimonial')}
                                                                                    margin="normal"
                                                                                    style={{
                                                                                        width: "80%",
                                                                                        marginTop: -10
                                                                                    }}
                                                                                />
                                                                            </div>
                                                                        </div>,

                                                                        this.state.cessionAction.cedant.type === 'Actionnaire morale' ?
                                                                            [
                                                                                <div className="row mb-2">
                                                                                    <div className="col-md-2 mb-1">
                                                                                        <Typography style={{
                                                                                            backgroundColor: 'lightgrey',
                                                                                            padding: "0.3rem",
                                                                                            borderRadius: 5
                                                                                        }}>Société</Typography>
                                                                                    </div>
                                                                                </div>,
                                                                                <div className="row mb-2">
                                                                                    <div className="col-md-2 mb-1">
                                                                                        <Typography>N°
                                                                                            SIREN</Typography>
                                                                                    </div>
                                                                                    <div className="col-md-4">
                                                                                        <TextField
                                                                                            error={this.state.cessionAction.cedant.NumSIREN === '' ||
                                                                                            isNaN(this.state.cessionAction.cedant.NumSIREN) ||
                                                                                            this.state.cessionAction.cedant.NumSIREN.length !== 9}
                                                                                            helperText={this.state.cessionAction.cedant.NumSIREN === '' ||
                                                                                            isNaN(this.state.cessionAction.cedant.NumSIREN) ||
                                                                                            this.state.cessionAction.cedant.NumSIREN.length !== 9 ? "Le N° SIREN doit contenir 9 chiffres" : ""}
                                                                                            id='reg'
                                                                                            value={this.state.cessionAction.cedant.NumSIREN}
                                                                                            onChange={this.handleObjectObjectChange('cessionAction', 'cedant', 'NumSIREN')}
                                                                                            margin="normal"
                                                                                            style={{
                                                                                                width: "80%",
                                                                                                marginTop: -10
                                                                                            }}
                                                                                        />
                                                                                    </div>
                                                                                    <div className="col-md-2">
                                                                                        <Typography>Code
                                                                                            activité</Typography>
                                                                                    </div>
                                                                                    <div className="col-md-4">
                                                                                        <TextField
                                                                                            error={this.state.cessionAction.cedant.codeActivite === '' ||
                                                                                            isNaN(this.state.cessionAction.cedant.codeActivite) ||
                                                                                            this.state.cessionAction.cedant.codeActivite.length !== 5}
                                                                                            helperText={this.state.cessionAction.cedant.codeActivite === '' ||
                                                                                            isNaN(this.state.cessionAction.cedant.codeActivite) ||
                                                                                            this.state.cessionAction.cedant.codeActivite.length !== 5 ? "Le code activité doit contenir 5 chiffres" : ""}
                                                                                            id='reg'
                                                                                            value={this.state.cessionAction.cedant.codeActivite}
                                                                                            onChange={this.handleObjectObjectChange('cessionAction', 'cedant', 'codeActivite')}
                                                                                            margin="normal"
                                                                                            style={{
                                                                                                width: "80%",
                                                                                                marginTop: -10
                                                                                            }}
                                                                                        />
                                                                                    </div>
                                                                                </div>,
                                                                                <div className="row mb-2">
                                                                                    <div className="col-md-4 mb-1">
                                                                                        <Typography>Forme et
                                                                                            dénomination</Typography>
                                                                                    </div>
                                                                                    <div className="col-md-8">
                                                                                        <TextField
                                                                                            error={this.state.cessionAction.cedant.formeEtDenomin === ''}
                                                                                            id='reg'
                                                                                            value={this.state.cessionAction.cedant.formeEtDenomin}
                                                                                            onChange={this.handleObjectObjectChange('cessionAction', 'cedant', 'formeEtDenomin')}
                                                                                            margin="normal"
                                                                                            style={{
                                                                                                width: "80%",
                                                                                                marginTop: -10
                                                                                            }}
                                                                                        />
                                                                                    </div>
                                                                                </div>,
                                                                                <div className="row mb-2">
                                                                                    <div className="col-md-4 mb-1">
                                                                                        <Typography>Adresse postale
                                                                                            compléte ou
                                                                                            siège</Typography>
                                                                                    </div>
                                                                                    <div className="col-md-8">
                                                                                        <TextField
                                                                                            error={this.state.cessionAction.cedant.adress_siege === ''}
                                                                                            id='reg'
                                                                                            value={this.state.cessionAction.cedant.adress_siege}
                                                                                            onChange={this.handleObjectObjectChange('cessionAction', 'cedant', 'adress_siege')}
                                                                                            margin="normal"
                                                                                            style={{
                                                                                                width: "80%",
                                                                                                marginTop: -10
                                                                                            }}
                                                                                        />
                                                                                    </div>
                                                                                </div>,
                                                                            ] : null
                                                                    ] : null
                                                            }
                                                        </form>
                                                    </ExpansionPanelDetails>
                                                </ExpansionPanel>

                                                {/*Cessionnaire*/}
                                                <ExpansionPanel>
                                                    <ExpansionPanelSummary expandIcon={<ExpandMoreIcon/>}>
                                                        <h5 color="secondary">ACQUEREUR</h5>
                                                    </ExpansionPanelSummary>
                                                    <ExpansionPanelDetails style={{display: "block"}}>

                                                        <form noValidate autoComplete="off">

                                                            <div className="row mb-2">
                                                                <div className="col-md-4 mb-1">
                                                                    <Typography>Est ce que l’acheteur est un actionnaire
                                                                        existant de la société ?</Typography>
                                                                </div>

                                                                <div className="col-md-8">
                                                                    <FormGroup row
                                                                               style={{marginTop: -13, marginLeft: 10}}>
                                                                        <FormControlLabel
                                                                            control={
                                                                                <Checkbox
                                                                                    checked={this.state.cessionAction.cessionnaire.isFromSociety === 'true'}
                                                                                    onChange={this.handleObjectObjectChange('cessionAction', 'cessionnaire', 'isFromSociety')}
                                                                                    value='true'
                                                                                />
                                                                            }
                                                                            label="Oui"
                                                                        />
                                                                        <FormControlLabel
                                                                            control={
                                                                                <Checkbox
                                                                                    checked={this.state.cessionAction.cessionnaire.isFromSociety === 'false'}
                                                                                    onChange={this.handleObjectObjectChange('cessionAction', 'cessionnaire', 'isFromSociety')}
                                                                                    value='false'
                                                                                />
                                                                            }
                                                                            label="Non"
                                                                        />
                                                                    </FormGroup>
                                                                </div>
                                                            </div>

                                                            {
                                                                this.state.cessionAction.cessionnaire.isFromSociety === 'true' ?
                                                                    [
                                                                        <div className="row mb-2">
                                                                            <div className="col-md-4 mb-1">
                                                                                <Typography>Liste des
                                                                                    actionnaires</Typography>
                                                                            </div>
                                                                            ,
                                                                            <div className="col-md-8">
                                                                                <TextField
                                                                                    id='lsact'
                                                                                    select
                                                                                    value={this.state.cessionAction.cessionnaire.nomPrenom}
                                                                                    onChange={this.handleObjectObjectChange('cessionAction', 'cessionnaire', 'id')}
                                                                                    SelectProps={{
                                                                                        MenuProps: {},
                                                                                    }}
                                                                                    style={{
                                                                                        width: "80%",
                                                                                        marginTop: -10
                                                                                    }}
                                                                                    margin="normal"
                                                                                >
                                                                                    {this.state.cessionAction.cessionnaire.isFromSociety === 'true' &&
                                                                                    (this.state.sActionnairePhy || []).concat(this.state.sActionnaireMoral || []).map(act => (
                                                                                        <MenuItem key={act.id}
                                                                                                  value={act.id}>
                                                                                            {act.firstname + ' ' + act.lastname}
                                                                                        </MenuItem>
                                                                                    ))}

                                                                                </TextField>
                                                                            </div>
                                                                        </div>
                                                                    ] : null
                                                            }

                                                            <div className="row mb-2">
                                                                <div className="col-md-4">
                                                                    <Typography>Nom de naissance et
                                                                        prénom(s)</Typography>
                                                                </div>

                                                                <div className="col-md-8">
                                                                    <TextField
                                                                        error={this.state.cessionAction.cessionnaire.nomPrenom === ''}
                                                                        id='nomp'
                                                                        value={this.state.cessionAction.cessionnaire.nomPrenom}
                                                                        onChange={this.handleObjectObjectChange('cessionAction', 'cessionnaire', 'nomPrenom')}
                                                                        margin="normal"
                                                                        style={{width: "80%", marginTop: -10}}
                                                                    />
                                                                </div>
                                                            </div>
                                                            <div className="row mb-2">
                                                                <div className="col-md-4">
                                                                    <Typography>Date de naissance</Typography>
                                                                </div>

                                                                <div className="col-md-8">
                                                                    <TextField
                                                                        error={this.state.cessionAction.cessionnaire.date_naiss === ''}
                                                                        type='date'
                                                                        id='ds'
                                                                        value={this.state.cessionAction.cessionnaire.date_naiss}
                                                                        onChange={this.handleObjectObjectChange('cessionAction', 'cessionnaire', 'date_naiss')}
                                                                        margin="normal"
                                                                        style={{width: "80%", marginTop: -10}}
                                                                    />
                                                                </div>
                                                            </div>
                                                            <div className="row mb-2">
                                                                <div className="col-md-4">
                                                                    <Typography>Département et commune, ou Pays de
                                                                        naissance</Typography>
                                                                </div>

                                                                <div className="col-md-8">
                                                                    <TextField
                                                                        error={this.state.cessionAction.cessionnaire.paysNaiss === ''}
                                                                        id='pays'
                                                                        value={this.state.cessionAction.cessionnaire.paysNaiss}
                                                                        onChange={this.handleObjectObjectChange('cessionAction', 'cessionnaire', 'paysNaiss')}
                                                                        margin="normal"
                                                                        style={{width: "80%", marginTop: -10}}
                                                                    />
                                                                </div>
                                                            </div>
                                                            <div className="row mb-2">
                                                                <div className="col-md-4">
                                                                    <Typography>Nom du conjoint</Typography>
                                                                </div>

                                                                <div className="col-md-8">
                                                                    <TextField
                                                                        error={this.state.cessionAction.cessionnaire.nomConjoint === ''}
                                                                        id='nconj'
                                                                        value={this.state.cessionAction.cessionnaire.nomConjoint}
                                                                        onChange={this.handleObjectObjectChange('cessionAction', 'cessionnaire', 'nomConjoint')}
                                                                        margin="normal"
                                                                        style={{width: "80%", marginTop: -10}}
                                                                    />
                                                                </div>
                                                            </div>
                                                            <div className="row mb-2">
                                                                <div className="col-md-4">
                                                                    <Typography>Adresse couriel</Typography>
                                                                </div>

                                                                <div className="col-md-8">
                                                                    <TextField
                                                                        error={this.state.cessionAction.cessionnaire.email === '' ||
                                                                        verifForms.verif_Email(this.state.cessionAction.cessionnaire.email)}
                                                                        id='adrC'
                                                                        value={this.state.cessionAction.cessionnaire.email}
                                                                        onChange={this.handleObjectObjectChange('cessionAction', 'cessionnaire', 'email')}
                                                                        margin="normal"
                                                                        style={{width: "80%", marginTop: -10}}
                                                                    />
                                                                </div>
                                                            </div>
                                                            <div className="row mb-2">
                                                                <div className="col-md-4">
                                                                    <Typography>régime matrimonial</Typography>
                                                                </div>

                                                                <div className="col-md-8">
                                                                    <TextField
                                                                        error={this.state.cessionAction.cessionnaire.regimeMatrimonial === ''}
                                                                        id='reg'
                                                                        value={this.state.cessionAction.cessionnaire.regimeMatrimonial}
                                                                        onChange={this.handleObjectObjectChange('cessionAction', 'cessionnaire', 'regimeMatrimonial')}
                                                                        margin="normal"
                                                                        style={{width: "80%", marginTop: -10}}
                                                                    />
                                                                </div>
                                                            </div>
                                                            <div className="row mb-2">
                                                                <div className="col-md-2 mb-1">
                                                                    <Typography style={{
                                                                        backgroundColor: 'lightgrey',
                                                                        padding: "0.3rem",
                                                                        borderRadius: 5
                                                                    }}>Société</Typography>
                                                                </div>
                                                            </div>
                                                            <div className="row mb-2">

                                                                <div className="col-md-2">
                                                                    <Typography>N° SIREN</Typography>
                                                                </div>
                                                                <div className="col-md-4">
                                                                    <TextField
                                                                        error={this.state.cessionAction.cessionnaire.NumSIREN === '' ||
                                                                        isNaN(this.state.cessionAction.cessionnaire.NumSIREN) ||
                                                                        this.state.cessionAction.cessionnaire.NumSIREN.length !== 9}
                                                                        helperText={this.state.cessionAction.cessionnaire.NumSIREN === '' ||
                                                                        isNaN(this.state.cessionAction.cessionnaire.NumSIREN) ||
                                                                        this.state.cessionAction.cessionnaire.NumSIREN.length !== 9 ? "Le N° SIREN doit contenir 9 chiffres" : ""}
                                                                        id='reg'
                                                                        value={this.state.cessionAction.cessionnaire.NumSIREN}
                                                                        onChange={this.handleObjectObjectChange('cessionAction', 'cessionnaire', 'NumSIREN')}
                                                                        margin="normal"
                                                                        style={{width: "80%", marginTop: -10}}
                                                                    />
                                                                </div>
                                                                <div className="col-md-2">
                                                                    <Typography>Code activité</Typography>
                                                                </div>
                                                                <div className="col-md-4">
                                                                    <TextField
                                                                        error={this.state.cessionAction.cessionnaire.codeActivite === '' ||
                                                                        isNaN(this.state.cessionAction.cessionnaire.codeActivite) ||
                                                                        this.state.cessionAction.cessionnaire.codeActivite.length !== 5}
                                                                        helperText={this.state.cessionAction.cessionnaire.codeActivite === '' ||
                                                                        isNaN(this.state.cessionAction.cessionnaire.codeActivite) ||
                                                                        this.state.cessionAction.cessionnaire.codeActivite.length !== 5 ? "Le code activité doit contenir 5 chiffres" : ""}
                                                                        id='reg'
                                                                        value={this.state.cessionAction.cessionnaire.codeActivite}
                                                                        onChange={this.handleObjectObjectChange('cessionAction', 'cessionnaire', 'codeActivite')}
                                                                        margin="normal"
                                                                        style={{width: "80%", marginTop: -10}}
                                                                    />
                                                                </div>
                                                            </div>
                                                            <div className="row mb-2">
                                                                <div className="col-md-4">
                                                                    <Typography>Forme et dénomination</Typography>
                                                                </div>
                                                                <div className="col-md-8">
                                                                    <TextField
                                                                        error={this.state.cessionAction.cessionnaire.formeEtDenomin === ''}
                                                                        id='reg'
                                                                        value={this.state.cessionAction.cessionnaire.formeEtDenomin}
                                                                        onChange={this.handleObjectObjectChange('cessionAction', 'cessionnaire', 'formeEtDenomin')}
                                                                        margin="normal"
                                                                        style={{width: "80%", marginTop: -10}}
                                                                    />
                                                                </div>
                                                            </div>
                                                            <div className="row mb-2">
                                                                <div className="col-md-4">
                                                                    <Typography>Adresse postale compléte ou
                                                                        siège</Typography>
                                                                </div>
                                                                <div className="col-md-8">
                                                                    <TextField
                                                                        error={this.state.cessionAction.cessionnaire.adress_siege === ''}
                                                                        id='reg'
                                                                        value={this.state.cessionAction.cessionnaire.adress_siege}
                                                                        onChange={this.handleObjectObjectChange('cessionAction', 'cessionnaire', 'adress_siege')}
                                                                        margin="normal"
                                                                        style={{width: "80%", marginTop: -10}}
                                                                    />
                                                                </div>
                                                            </div>
                                                        </form>
                                                    </ExpansionPanelDetails>
                                                </ExpansionPanel>

                                                {/*Origine de proprieté*/}
                                                <ExpansionPanel>
                                                    <ExpansionPanelSummary expandIcon={<ExpandMoreIcon/>}>
                                                        <h5 color="secondary">ORIGINE DE PROPRIETE</h5>
                                                    </ExpansionPanelSummary>
                                                    <ExpansionPanelDetails style={{display: "block"}}>

                                                        <form noValidate autoComplete="off">
                                                            <div>
                                                                <div className="row mb-2">
                                                                    <div className="col-md-3">
                                                                        <Typography style={{
                                                                            backgroundColor: 'lightgrey',
                                                                            padding: "0.3rem",
                                                                            borderRadius: 5
                                                                        }}>précédent propriétaire</Typography>
                                                                    </div>
                                                                </div>
                                                                <div className="row mb-2">
                                                                    <div className="col-md-2">
                                                                        <Typography>Nom</Typography>
                                                                    </div>
                                                                    <div className="col-md-4">
                                                                        <TextField
                                                                            error={this.state.cessionAction.cedant.nomPrenom === ''}
                                                                            id='reg'
                                                                            value={this.state.cessionAction.cedant.nomPrenom}
                                                                            onChange={this.handleObjectObjectChange('cessionAction', 'cedant', 'nomPrenom')}
                                                                            margin="normal"
                                                                            style={{width: "80%", marginTop: -10}}
                                                                        />
                                                                    </div>
                                                                    <div className="col-md-2">
                                                                        <Typography>Adresse</Typography>
                                                                    </div>
                                                                    <div className="col-md-4">
                                                                        <TextField
                                                                            error={this.state.cessionAction.cedant.adress === ''}
                                                                            id='reg'
                                                                            value={this.state.cessionAction.cedant.adress}
                                                                            onChange={this.handleObjectObjectChange('cessionAction', 'cedant', 'adress')}
                                                                            margin="normal"
                                                                            style={{width: "80%", marginTop: -10}}
                                                                        />
                                                                    </div>
                                                                </div>
                                                                <div className="row mb-2">
                                                                    <div className="col-md-2">
                                                                        <Typography style={{
                                                                            backgroundColor: 'lightgrey',
                                                                            padding: "0.3rem",
                                                                            borderRadius: 5
                                                                        }}>Mutation</Typography>
                                                                    </div>
                                                                </div>
                                                                <div className="row mb-2">
                                                                    <div className="col-md-2">
                                                                        <Typography>Date</Typography>
                                                                    </div>
                                                                    <div className="col-md-4">
                                                                        <TextField
                                                                            error={this.state.cessionAction.originePropriete.date === ''}
                                                                            id='reg'
                                                                            type='date'
                                                                            value={this.state.cessionAction.originePropriete.date}
                                                                            onChange={this.handleObjectObjectChange('cessionAction', 'originePropriete', 'date')}
                                                                            margin="normal"
                                                                            style={{width: "80%", marginTop: -10}}
                                                                        />
                                                                    </div>
                                                                    <div className="col-md-2">
                                                                        <Typography>Nature</Typography>
                                                                    </div>
                                                                    <div className="col-md-4">
                                                                        <TextField
                                                                            error={this.state.cessionAction.originePropriete.nature === ''}
                                                                            id='reg'
                                                                            value={this.state.cessionAction.originePropriete.nature}
                                                                            onChange={this.handleObjectObjectChange('cessionAction', 'originePropriete', 'nature')}
                                                                            margin="normal"
                                                                            style={{width: "80%", marginTop: -10}}
                                                                        />
                                                                    </div>

                                                                </div>
                                                                <div className="row mb-2">
                                                                    <div className="col-md-2">
                                                                        <Typography>Prix d'aquisition(€)</Typography>
                                                                    </div>
                                                                    <div className="col-md-4">
                                                                        <TextField
                                                                            error={this.state.cessionAction.originePropriete.prix === '' ||
                                                                            isNaN(this.state.cessionAction.originePropriete.prix) ||
                                                                            this.state.cessionAction.originePropriete.prix < 0}
                                                                            id='reg'
                                                                            value={this.state.cessionAction.originePropriete.prix}
                                                                            onChange={this.handleObjectObjectChange('cessionAction', 'originePropriete', 'prix')}
                                                                            margin="normal"
                                                                            style={{width: "80%", marginTop: -10}}
                                                                        />
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </form>

                                                    </ExpansionPanelDetails>
                                                </ExpansionPanel>

                                                {/*Base taxable*/}
                                                <ExpansionPanel>
                                                    <ExpansionPanelSummary expandIcon={<ExpandMoreIcon/>}>
                                                        <h5 color="secondary">BASE TAXABLE</h5>
                                                    </ExpansionPanelSummary>
                                                    <ExpansionPanelDetails style={{display: "block"}}>
                                                        <form noValidate autoComplete="off">

                                                            <div>
                                                                <div className="row mb-2 mt-1">
                                                                    <div className="col-md-2 mb-1">
                                                                        <Typography>Certifié exact, à</Typography>
                                                                    </div>
                                                                    <div className="col-md-4">
                                                                        <TextField
                                                                            error={this.state.cessionAction.basetaxable.certifieA === ''}
                                                                            id='reg'
                                                                            value={this.state.cessionAction.basetaxable.certifieA}
                                                                            onChange={this.handleObjectObjectChange('cessionAction', 'basetaxable', 'certifieA')}
                                                                            margin="normal"
                                                                            style={{width: "90%", marginTop: -10}}
                                                                        />
                                                                    </div>
                                                                    <div className="col-md-1">
                                                                        <Typography>, le</Typography>
                                                                    </div>
                                                                    <div className="col-md-4">
                                                                        <TextField
                                                                            error={this.state.cessionAction.basetaxable.date === ''}
                                                                            type='date'
                                                                            id='reg'
                                                                            value={this.state.cessionAction.basetaxable.date}
                                                                            onChange={this.handleObjectObjectChange('cessionAction', 'basetaxable', 'date')}
                                                                            margin="normal"
                                                                            style={{width: "90%", marginTop: -10}}
                                                                        />
                                                                    </div>
                                                                </div>
                                                                <div className="row mb-2">
                                                                    <div className="col-md-12 mb-2 mt-2">
                                                                        <Typography>Signature du cédant</Typography>
                                                                    </div>
                                                                </div>
                                                                <div className="row mb-2">
                                                                    <div className="col-md-3">
                                                                        <TextField
                                                                            type='text'
                                                                            id='smsRecu'
                                                                            disabled={true}
                                                                            value={"+21629034789"}
                                                                            margin="normal"
                                                                            style={{width: "90%", marginTop: -10}}
                                                                        />
                                                                    </div>
                                                                    <div className="col-md-3 mb-2 mt-2">
                                                                        <Button variant="contained" style={{
                                                                            backgroundColor:"#4db6ac",
                                                                            fontSize: 12,
                                                                            marginTop: -17,
                                                                            color: 'white',
                                                                            marginBottom: 25,
                                                                            textTransform:"none"
                                                                        }}
                                                                                onClick={this.sendSMSCode}
                                                                        >
                                                                            {
                                                                                this.state.loadingSMS ?
                                                                                    <CircularProgress color="white"/> :
                                                                                    "Envoyer code de vérification"
                                                                            }

                                                                        </Button>
                                                                    </div>
                                                                </div>
                                                                {
                                                                    this.state.codeSMSsended !== "" &&
                                                                    <div className="row mb-1">
                                                                        <div className="col-md-2">
                                                                            <TextField
                                                                                error={this.state.codeSMSsended !== this.state.codeSMSTaped}
                                                                                type='text'
                                                                                id='smsRecu'
                                                                                placeholder="Code reçu par SMS"
                                                                                value={this.state.codeSMSTaped}
                                                                                onChange={(event) => this.setState({codeSMSTaped:event.target.value})}
                                                                                margin="normal"
                                                                                style={{width: "85%", marginTop: -10}}
                                                                            />

                                                                        </div>
                                                                    </div>
                                                                }

                                                                <div className="row mb-1">
                                                                    <div className="col-md-12" style={{marginTop: 6,marginLeft:20}}>

                                                                        <div style={{width:"80%",height:90,border: '2px solid grey',maxWidth:250}}>
                                                                            <SignatureCanvas ref={(ref) => {
                                                                                this.sigCanvas = ref
                                                                            }} penColor='#000' canvasProps={{width: "200%", height: 88, className: 'sigCanvas',maxWidth:248}}/>
                                                                        </div>
                                                                    </div>
                                                                    <div style={{marginLeft: '20%'}}>
                                                                        <Button style={{fontSize: 10}} onClick={() => {
                                                                            this.sigCanvas.clear()
                                                                        }}>Effacer</Button>
                                                                    </div>
                                                                </div>
                                                            </div>

                                                        </form>
                                                    </ExpansionPanelDetails>
                                                </ExpansionPanel>

                                                {/*Mode de paiement*/}
                                                <ExpansionPanel>
                                                    <ExpansionPanelSummary expandIcon={<ExpandMoreIcon/>}>
                                                        <h5 color="secondary">MODE DE PAIEMENT</h5>
                                                    </ExpansionPanelSummary>
                                                    <ExpansionPanelDetails>

                                                        <form noValidate autoComplete="off">

                                                            <FormGroup style={{marginTop: -13, marginLeft: 10}}>
                                                                <FormControlLabel
                                                                    control={
                                                                        <Checkbox
                                                                            checked={this.state.cessionAction.modePaiement === 'cheque'}
                                                                            onChange={this.handleObjectChange('cessionAction', 'modePaiement')}
                                                                            value='cheque'
                                                                        />
                                                                    }
                                                                    label="Chèque à l'ordre du trésorpublic"
                                                                />
                                                                <FormControlLabel
                                                                    control={
                                                                        <Checkbox
                                                                            checked={this.state.cessionAction.modePaiement === 'virement'}
                                                                            onChange={this.handleObjectChange('cessionAction', 'modePaiement')}
                                                                            value='virement'
                                                                        />
                                                                    }
                                                                    label="Virement"
                                                                />
                                                                <FormControlLabel
                                                                    control={
                                                                        <Checkbox
                                                                            checked={this.state.cessionAction.modePaiement === 'cartebancaire'}
                                                                            onChange={this.handleObjectChange('cessionAction', 'modePaiement')}
                                                                            value='cartebancaire'
                                                                        />
                                                                    }
                                                                    label="Carte bancaire"
                                                                />
                                                                <FormControlLabel
                                                                    control={
                                                                        <Checkbox
                                                                            checked={this.state.cessionAction.modePaiement === 'numeraire'}
                                                                            onChange={this.handleObjectChange('cessionAction', 'modePaiement')}
                                                                            value='numeraire'
                                                                        />
                                                                    }
                                                                    label="Numéraire(si n'exède pas 300 €)"
                                                                />
                                                            </FormGroup>
                                                        </form>

                                                    </ExpansionPanelDetails>
                                                </ExpansionPanel>

                                                <div style={{textAlign: 'center'}}>

                                                    <Button variant="contained" color="secondary" style={{
                                                        fontSize: 12,
                                                        marginTop: 25,
                                                        color: 'white',
                                                        marginBottom: 25
                                                    }}

                                                            disabled={this.verifCessionAction()}
                                                            onClick={this.saveTransaction}
                                                    >
                                                        {
                                                            this.state.loading ?
                                                                <CircularProgress color="white"/> :
                                                                "Valider la transaction"
                                                        }

                                                    </Button>

                                                </div>

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

export default cessionActions;