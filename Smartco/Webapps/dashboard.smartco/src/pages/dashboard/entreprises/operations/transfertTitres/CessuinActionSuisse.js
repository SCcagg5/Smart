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
import TopBar from "../../../../../components/TopBar/TopBar";
import logo from "../../../../../assets/images/logos/logoSmartCo.jpeg";
import SideMenu from "../../../../../components/SideMenu/SideMenu";
import data from "../../../../../data/data";
import SideBar from "../../../../../components/SideBar/SideBar";


class CessuinActionSuisse extends Component {


    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            selectedSieMenuItem: "soc",
            openSideMenu: false,
            showSecondSideBar: false,
            entreprise: "",
            cessionAction: {

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
                    societe:'',
                    capitaleActions: '',
                    nbActions: '',
                    prixNominal: '',
                    adresse:'',
                    NbNewActions :''



                },
                basetaxable: {
                    certifieA: '',
                    date: '',
                },
                paiement:{
                    BankName : '',
                    titulaire : '',
                    IBAN :''
                }
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

    componentDidMount() {
        if (this.props.location.state === null || this.props.location.state === undefined) {
            this.props.history.goBack();
        } else {

            //Cession d'actions
            let cession = {
                cedant: {},
                cessionnaire: {},
                originePropriete: {},

                basetaxable: {},
                paiement: {},
            };

            let data = this.props.location.state.entreprise;

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




            cession.originePropriete.societe = this.props.location.state.entreprise.sName
            cession.originePropriete.capitaleActions = this.props.location.state.entreprise.sCapital.totalCapital
            cession.originePropriete.nbActions =this.props.location.state.entreprise.sCapital.totalNbActions
            cession.originePropriete.prixNominal=this.props.location.state.entreprise.sCapital.totalCapital  / this.props.location.state.entreprise.sCapital.totalNbActions
            cession.originePropriete.adresse=this.props.location.state.entreprise.sSiege.adress
            cession.originePropriete.NbNewActions =''

            cession.paiement.BankName=''
            cession.paiement.titulaire=''
            cession.paiement.IBAN=''









            cession.basetaxable.certifieA = '';
            cession.basetaxable.date = '';


            let associes = this.props.location.state.entreprise.sAssociate || [];
            let associesPhy = [];
            let associesMorales = [];
            associes.map((item,key) => {
                item.ej_name === "" ? associesPhy.push(item) : associesMorales.push(item)
            });

            this.setState({
                entreprise: this.props.location.state.entreprise,
                sActionnairePhy: associesPhy,
                sActionnaireMoral: associesMorales,
                cessionAction: cession,
                histoCessionAction:this.props.location.state.entreprise.cessionAction || []
            });
        }
    }
    handleChange(event) {
        this.setState({value: event.target.value});
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
        this.setState({loading:true,});

        let arrayOftrans = this.state.histoCessionAction;
        arrayOftrans.push(this.state.cessionAction);

        firebase.database().ref('society/' + localStorage.getItem('uid') + 'Suisse').update({
            'cessionAction': arrayOftrans
        }).then(data => {

            this.openSnackbar('success', "La transaction a été effectué avec succès");

            CessionService.generateCessionActionSuisse(localStorage.getItem('uid')+'Suisse',(arrayOftrans.length -1)).then( res => {

                const file = new Blob(
                    [res],
                    {type: 'application/pdf'});
                const fileURL = URL.createObjectURL(file);
                window.open(fileURL);
                setTimeout(() => {
                    this.props.history.push('/coffre-fort');
                    this.setState({loading: false});
                });


            }).catch(err => console.log(err));

        }).catch(function (error) {
            alert(error);
        });

    };

    verifCessionAction() {

        if (
            (this.state.cessionAction.cedant.type==='Un particulier'&&

                (this.state.cessionAction.cedant.date_naiss === '' || this.state.cessionAction.cedant.adress === '' )
            )||
            ((this.state.cessionAction.cedant.type === 'Actionnaire morale') && (
                    this.state.cessionAction.cedant.NumSIREN === '' || this.state.cessionAction.cedant.NumSIREN.length !== 9 ||
                    isNaN(this.state.cessionAction.cedant.NumSIREN) ||
                    this.state.cessionAction.cedant.codeActivite === '' || isNaN(this.state.cessionAction.cedant.codeActivite) ||
                    this.state.cessionAction.cedant.codeActivite.length !== 5 || this.state.cessionAction.cedant.formeEtDenomin === '' ||
                    this.state.cessionAction.cedant.adress_siege === ''
                )
            ) ||

            this.state.cessionAction.cessionnaire.date_naiss === '' ||
            this.state.cessionAction.cessionnaire.nomPrenom === ''  ||
            this.state.cessionAction.cessionnaire.email === '' || verifForms.verif_Email(this.state.cessionAction.cessionnaire.email) ||
            this.state.cessionAction.cessionnaire.adress_siege === '' || this.state.cessionAction.cessionnaire.formeEtDenomin === '' ||
            this.state.cessionAction.cessionnaire.NumSIREN === '' || isNaN(this.state.cessionAction.cessionnaire.NumSIREN) ||
            this.state.cessionAction.cessionnaire.NumSIREN.length !== 9 || this.state.cessionAction.cessionnaire.codeActivite === '' ||
            isNaN(this.state.cessionAction.cessionnaire.codeActivite) || this.state.cessionAction.cessionnaire.codeActivite.length !== 5 ||
            this.state.cessionAction.cessionnaire.adress === '' ||


            this.state.cessionAction.basetaxable.certifieA === '' || this.state.cessionAction.basetaxable.date === '' || this.state.cessionAction.paiement.BankName ==='' ||
            this.state.cessionAction.paiement.titulaire ==='' || this.state.cessionAction.paiement.IBAN === '')
            return true;
        else
            return false;
    }



    render() {
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
                                                                            checked={this.state.cessionAction.cedant.type === 'Un particulier'}
                                                                            onChange={this.handleObjectObjectChange('cessionAction', 'cedant', 'type')}
                                                                            value='Un particulier'
                                                                        />
                                                                    }
                                                                    label="Actionnaire physique"
                                                                />
                                                                <FormControlLabel
                                                                    control={
                                                                        <Checkbox
                                                                            checked={this.state.cessionAction.cedant.type === 'Une entité juridique'}
                                                                            onChange={this.handleObjectObjectChange('cessionAction', 'cedant', 'type')}
                                                                            value='Une entité juridique'
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
                                                                {this.state.cessionAction.cedant.type === 'Un particulier' &&
                                                                this.state.sActionnairePhy .map( actph => (

                                                                    <MenuItem key={actph.id}
                                                                              value={actph.id}>
                                                                        {actph.firstname + ' ' + actph.lastname}
                                                                    </MenuItem>
                                                                ))}

                                                                {this.state.cessionAction.cedant.type === 'Une entité juridique' &&
                                                                this.state.sActionnaireMoral.map(act => (


                                                                    <MenuItem key={act.id}
                                                                              value={act.id}>
                                                                        {act.ej_name }
                                                                    </MenuItem>
                                                                ))}
                                                            </TextField>
                                                        </div>

                                                    </div>

                                                    {
                                                        this.state.cessionAction.cedant.nomPrenom !== '' ?

                                                            [
                                                                <div className="row mb-2">

                                                                    <div className="col-md-4 mb-1">
                                                                        <Typography>Nom de naissance et prénom(s)</Typography>
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



                                                                this.state.cessionAction.cedant.type === 'Une entité juridique' ?
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
                                                                                <Typography>Adresse postale compléte ou siège</Typography>
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
                                                                                    { act.ej_name === "" ? act.firstname + ' ' + act.lastname : act.ej_name}
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
                                                <h5 color="secondary">OBJET DE LA CESSION</h5>
                                            </ExpansionPanelSummary>
                                            <ExpansionPanelDetails style={{display: "block"}}>

                                                <form noValidate autoComplete="off">
                                                    <div>

                                                        <div className="row mb-2">
                                                            <div className="col-md-2">
                                                                <Typography>la societe</Typography>
                                                            </div>
                                                            <div className="col-md-4">
                                                                <TextField
                                                                    error={this.state.cessionAction.originePropriete.societe === ''}
                                                                    id='reg'
                                                                    value={this.props.location.state.entreprise.sName}
                                                                    margin="normal"
                                                                    style={{width: "80%", marginTop: -10}}
                                                                />
                                                            </div>
                                                            <div className="col-md-2">
                                                                <Typography>Adresse</Typography>
                                                            </div>
                                                            <div className="col-md-4">
                                                                <TextField
                                                                    error={this.state.cessionAction.originePropriete.adresse === ''}
                                                                    id='reg'
                                                                    value={this.props.location.state.entreprise.sSiege.adress}
                                                                    onChange={this.handleObjectObjectChange('cessionAction', 'cedant', 'adress')}
                                                                    margin="normal"
                                                                    style={{width: "80%", marginTop: -10}}
                                                                />
                                                            </div>
                                                        </div>

                                                        <div className="row mb-2">
                                                            <div className="col-md-2">
                                                                <Typography>Le Capital-actions</Typography>
                                                            </div>
                                                            <div className="col-md-4">
                                                                <TextField
                                                                    error={this.state.cessionAction.originePropriete.capitalActions === ''}
                                                                    id='reg'
                                                                    value={this.props.location.state.entreprise.sCapital.totalCapital}
                                                                    margin="normal"
                                                                    style={{width: "80%", marginTop: -10}}
                                                                />
                                                            </div>
                                                            <div className="col-md-2">
                                                                <Typography>Nombre d'actions </Typography>
                                                            </div>
                                                            <div className="col-md-4">
                                                                <TextField

                                                                    id='reg'
                                                                    value={this.state.cessionAction.originePropriete.nbActions}
                                                                    margin="normal"
                                                                    style={{width: "80%", marginTop: -10}}
                                                                />
                                                            </div>


                                                        </div>
                                                        <div className="row mb-2">
                                                            <div className="col-md-2">
                                                                <Typography>Nombre d'action a vendre</Typography>
                                                            </div>
                                                            <div className="col-md-4">
                                                                <TextField
                                                                    error={this.state.cessionAction.originePropriete.NbNewActions === '' ||
                                                                    isNaN(this.state.cessionAction.originePropriete.NbNewActions) ||
                                                                    this.state.cessionAction.originePropriete.NbNewActions < 0}
                                                                    id='reg'
                                                                    type="number"

                                                                    value={this.state.cessionAction.originePropriete.NbNewActions}
                                                                    onChange={this.handleObjectObjectChange('cessionAction', 'originePropriete', 'NbNewActions')}
                                                                    margin="normal"
                                                                    style={{width: "80%", marginTop: -10}}
                                                                />
                                                            </div>
                                                            <div className="col-md-2">
                                                                <Typography>Prix nominal </Typography>
                                                            </div>
                                                            <div className="col-md-4">
                                                                <TextField

                                                                    id='reg'
                                                                    value={this.props.location.state.entreprise.sCapital.defaultNominalValue}
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





                                                    </div>

                                                </form>
                                            </ExpansionPanelDetails>
                                        </ExpansionPanel>

                                        {/*Mode de paiement*/}
                                        <ExpansionPanel>
                                            <ExpansionPanelSummary expandIcon={<ExpandMoreIcon/>}>
                                                <h5 color="secondary">PAIEMENT</h5>

                                            </ExpansionPanelSummary>
                                            <ExpansionPanelDetails style={{display: "block"}}>

                                                <form noValidate autoComplete="off">
                                                    <div>

                                                        <div className="row mb-2">
                                                            <div className="col-md-2">
                                                                <Typography>Nom de la Banque </Typography>
                                                            </div>
                                                            <div className="col-md-4">
                                                                <TextField
                                                                    error={this.state.cessionAction.paiement.BankName ===''}
                                                                    id='reg'
                                                                    margin="normal"
                                                                    style={{width: "80%", marginTop: -10}}
                                                                    value={this.state.cessionAction.paiement.BankName}
                                                                    onChange={this.handleObjectObjectChange('cessionAction','paiement','BankName')}
                                                                />
                                                            </div>


                                                        </div>

                                                        <div className="row mb-2">
                                                            <div className="col-md-2">
                                                                <Typography>Titulaire</Typography>
                                                            </div>
                                                            <div className="col-md-4">
                                                                <TextField
                                                                    error={this.state.cessionAction.paiement.titulaire===''}
                                                                    id='reg'
                                                                    margin="normal"
                                                                    style={{width: "80%", marginTop: -10}}
                                                                    value={this.state.cessionAction.paiement.titulaire}
                                                                    onChange={this.handleObjectObjectChange('cessionAction','paiement','titulaire')}
                                                                />
                                                            </div>




                                                        </div>
                                                        <div className="row mb-2">
                                                            <div className="col-md-2">
                                                                <Typography>IBAN</Typography>
                                                            </div>
                                                            <div className="col-md-4">
                                                                <TextField
                                                                    error={this.state.cessionAction.paiement.IBAN===''}

                                                                    id='reg'
                                                                    value={this.state.cessionAction.paiement.IBAN}
                                                                    onChange={this.handleObjectObjectChange('cessionAction','paiement','IBAN')}



                                                                    margin="normal"
                                                                    style={{width: "80%", marginTop: -10}}
                                                                />
                                                            </div>


                                                        </div>
                                                    </div>
                                                </form>

                                            </ExpansionPanelDetails>
                                        </ExpansionPanel>

                                        <div style={{textAlign: 'center'}}>

                                            <Button variant="contained" size="large" color="secondary" style={{
                                                fontSize: 15,
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
                </div>




            </div>
        )
    }

}

export default CessuinActionSuisse;