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
import verifForms from "../../../../../tools/verifForms"
import firebase from "firebase/app";
import "firebase/database"
import MySnackbarContentWrapper from "../../../../../tools/customSnackBar";
import Snackbar from "@material-ui/core/Snackbar";
import CircularProgress from '@material-ui/core/CircularProgress';
import moment from "moment";
import entrepriseSARLService from "../../../../../provider/entrepriseSARLService";
import MenuItem from "@material-ui/core/MenuItem";

const Topbar = React.lazy(() => import("../../../../../components/Topbar"));
const Navbar = React.lazy(() => import("../../../../../components/Navbar"));
const loading = () => <Loader/>;

class empruntObligationBonds extends Component {


    constructor(props) {
        super(props);
        //this.handleObjectChange = this.handleObjectChange.bind(this);
        this.addImageFond = this.addImageFond.bind(this);
        this.state = {
            loading: false,
            isMenuOpened: false,
            activeMenuItem: 'item-gestion',
            entreprise: "",
            EmissionTitre: {
                created: moment(new Date()).format("YYYY-MM-DD"),
                percent1: "",
                percent2: "",
                percent3: "",
                percent1Date: "",
                percent2Date: "",
                percent3Date: "",
                dateEmission: "",
                dateRemboursement: "",
                Denomination: "",
                dateAudit: "",
                dateFinExerciceComptable: "",
                datePremierPaie: "",
                tauxInteret: "",
                Montant: "",
                currency:"CHF",
                name:"",
                subName:"",
                assetClass:"Infrastructure Asset",
                subAssetClass:"Electric Vehicule Asset",
                countryOfIncorp:"",
                securityPrice:"",
                executiveSummary:"",
                investmentStructure:"",
                imageUrl:"",

                nbTokens: "",

                prixEmission: "",
                prixPlacement: "",

                AssurancesContractuelles: "oui",
                AutreEmpruntsEmis: "oui",
                Cotation: "L’Emprunt n’est pas coté en bourse",
                DateDecisionAdmin: "",
                EmetteurProcCivil: "non",
                InfoEmpruntEmis: "",
                RestrictionVentes: "oui",
                bonJouissance: "",
                bonJouissanceEmis: "oui",
                confirmationEmetteur: "oui",
                dividendeDistribue: "non",
                infodistributionDividende: "",
                situationDeterioree: "",
                utilisationProduitNet: "",
                butEmission: "",
                signature: ""
            },
            numIDE: "",
            OrganeRevision: "",
            formeJuridique: "",
            sBut: "",

            openAlert: false,
            alertMessage: '',
            alertType: '',
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
        firebase.database().ref('/issuanceProjects').on("value", (snapshot) => {
            let issuanceProjects = snapshot.val();
            this.setState({issuanceProjects:issuanceProjects || []})
        });
    }

    componentWillMount() {
        if (this.props.location.state === null || this.props.location.state === undefined) {
            this.props.history.goBack();
        } else {
            this.setState({
                entreprise: this.props.location.state.entreprise,
                numIDE: this.props.location.state.entreprise.numIDE || "",
                OrganeRevision: this.props.location.state.entreprise.OrganeRevision || ""
            });
        }
    }

    handleObjectChange = (object, name) => event => {
        let objCopy = this.state[object];
        objCopy[name] = name === "DateDecisionAdmin" || name === "dateAudit" || name === "dateEmission" || name === "dateFinExerciceComptable" || name === "datePremierPaie" ||
        name === "dateRemboursement" || name === "percent1Date" || name === "percent2Date" || name === "percent3Date" ?
            moment(event.target.value).format("YYYY-MM-DD") : event.target.value;
        this.setState({
            [object]: objCopy
        });
    };


    saveEmpruntBonds = () => {

        this.setState({
            loading: true,
        });

        let issuanceProjects = this.state.issuanceProjects;
        let issuanceProject = {
            created:moment().format("YYYY-MM-DD"),
            imageUrl:this.state.EmissionTitre.imageUrl,
            financialLegal:{
                assetClass_en:this.state.EmissionTitre.assetClass,
                subAssetClass_en:this.state.EmissionTitre.subAssetClass,
                countryOfIncorp_en:this.state.EmissionTitre.countryOfIncorp,
                executiveSummary_en:this.state.EmissionTitre.executiveSummary,
                investmentStructure_en:this.state.EmissionTitre.investmentStructure,
                issuer:this.state.entreprise.sName,
                securityPrice:this.state.EmissionTitre.securityPrice,
                tokenizedNominal_en:this.state.EmissionTitre.nbTokens +" " + this.state.EmissionTitre.currency
            },
            keyFacts:{
                currency:this.state.EmissionTitre.currency,
                currentinvestment:this.state.EmissionTitre.Montant+" "+this.state.EmissionTitre.currency,
                minimumInvestment:"000000",
                raisingPeriod_en:"12 months +",
                targetReturn:"000000"
            },
            name:this.state.EmissionTitre.name,
            subName_en:this.state.EmissionTitre.subName,
        };
        issuanceProjects.push(issuanceProject);

        let arrayOfEmprunts = this.state.entreprise.EmissionTitre || [];
        arrayOfEmprunts.push(this.state.EmissionTitre);


        firebase.database().ref('society/' + localStorage.getItem('uid') + 'Suisse').update(
            {
                'EmissionTitre': arrayOfEmprunts,
                'numIDE': this.state.numIDE,
                'OrganeRevision': this.state.OrganeRevision
            }
        ).then(data => {

            setTimeout(() => {

                firebase.database().ref('/').update(
                    {'issuanceProjects':issuanceProjects});

                let id = this.state.entreprise.EmissionTitre ? this.state.entreprise.EmissionTitre.length - 1 : 0;
                entrepriseSARLService.generateProspectusPP(this.state.entreprise.uniqueId, id).then(res => {
                    const file = new Blob(
                        [res],
                        {type: 'application/pdf'});
                    const fileURL = URL.createObjectURL(file);
                    this.openSnackbar('success', "L'opération a été effectué avec succès");
                    setTimeout(() => {
                        window.open(fileURL);
                        this.setState({loading: false});
                        this.props.history.push("/coffre-fort");
                    }, 500);


                }, err => {
                    console.log(err);
                });
            }, 1500);
        }).catch(function (error) {
            alert(error);
        });

    };

    verifObligationForm() {

        return ((this.state.EmissionTitre.bonJouissanceEmis === "non" && verifForms.verif_inpuText(this.state.EmissionTitre.bonJouissance)) ||
            (this.state.EmissionTitre.AutreEmpruntsEmis === "non" && verifForms.verif_inpuText(this.state.EmissionTitre.InfoEmpruntEmis)) ||
            verifForms.verif_inpuText(this.state.EmissionTitre.dateFinExerciceComptable) || verifForms.verif_inpuText(this.state.EmissionTitre.dateAudit) ||
            (this.state.EmissionTitre.dividendeDistribue === "non" && verifForms.verif_inpuText(this.state.EmissionTitre.infodistributionDividende)) ||
            (this.state.EmissionTitre.confirmationEmetteur === "non" && verifForms.verif_inpuText(this.state.EmissionTitre.situationDeterioree)) ||
            verifForms.verif_Number(this.state.EmissionTitre.Montant) || verifForms.verif_inpuText(this.state.EmissionTitre.dateEmission) ||
            verifForms.verif_Number(this.state.EmissionTitre.prixEmission) || verifForms.verif_Number(this.state.EmissionTitre.prixPlacement) ||
            verifForms.verif_Number(this.state.EmissionTitre.tauxInteret) || verifForms.verif_inpuText(this.state.EmissionTitre.datePremierPaie) ||
            verifForms.verif_inpuText(this.state.EmissionTitre.dateRemboursement) ||
            verifForms.verif_Number(this.state.EmissionTitre.Denomination) || verifForms.verif_inpuText(this.state.EmissionTitre.DateDecisionAdmin) ||
            verifForms.verif_inpuText(this.state.EmissionTitre.utilisationProduitNet))

    }

    async addImageFond(image) {
        let file = image.target.files[0];

        firebase.storage().ref("/users/files/").child(file.name).put(file)
            .then((snapshot) => {
                snapshot.ref.getDownloadURL().then(url => {

                    let emissCopy = this.state.EmissionTitre;
                    emissCopy.imageUrl = url;
                    this.setState({EmissionTitre:emissCopy});
                })

            }).catch((error) => {
            console.log('One failed:', file.name, error.message)
        });

    }


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
                                            <h4 className="header-title mt-0 mb-3">Emission d'une obligation Bonds</h4>


                                            <div style={{marginLeft: 20, marginRight: 20, marginTop: 50}}>


                                                {/*Société*/}
                                                <ExpansionPanel>
                                                    <ExpansionPanelSummary expandIcon={<ExpandMoreIcon/>}>
                                                        <h5 className="text-uppercase">Informations relatives à la
                                                            société</h5>
                                                    </ExpansionPanelSummary>
                                                    <ExpansionPanelDetails style={{display: "block"}}>
                                                        <div>
                                                            <div className="row mb-4 mt-1">
                                                                <div className="col-md-4 mb-2">
                                                                    <Typography>Forme juridique de la société</Typography>
                                                                </div>

                                                                <div className="col-md-8">
                                                                    <TextField
                                                                        disabled={true}
                                                                        id='fds'
                                                                        defaultValue={this.state.entreprise.sName}
                                                                        onChange={(event) => this.setState({formeJuridique: event.target.value})}
                                                                        margin="dense"
                                                                        variant="outlined"
                                                                        style={{width: '80%', marginTop: -10}}
                                                                    />
                                                                </div>
                                                            </div>

                                                            <div className="row mb-4">
                                                                <div className="col-md-4 mb-2">
                                                                    <Typography>Numéro IDE</Typography>
                                                                </div>

                                                                <div className="col-md-8">
                                                                    <TextField
                                                                        disabled={false}
                                                                        id='ss'
                                                                        defaultValue={this.state.entreprise.numIDE }
                                                                        onChange={(event) => this.setState({numIDE: event.target.value})}
                                                                        margin="dense"
                                                                        variant="outlined"
                                                                        placeholder="CHE-XXX.XXX.XXX"
                                                                        style={{width: '80%', marginTop: -10}}
                                                                        error={this.state.numIDE === ""}
                                                                        helperText={this.state.numIDE === "" && "Champs obligatoire"}
                                                                    />
                                                                </div>
                                                            </div>

                                                            <div className="row mb-4">
                                                                <div className="col-md-4 mb-2">
                                                                    <Typography>Date de constitution de la
                                                                        Société</Typography>
                                                                </div>
                                                                <div className="col-md-3">
                                                                    <TextField
                                                                        disabled={true}
                                                                        type="date"
                                                                        id='ss'
                                                                        defaultValue={moment(this.state.entreprise.dateCreation).format("YYYY-MM-DD")}
                                                                        //onChange={this.handleObjectChange('EmissionTitre', 'Montant')}
                                                                        margin="dense"
                                                                        variant="outlined"
                                                                        style={{width: '80%', marginTop: -10}}
                                                                        InputLabelProps={{
                                                                            shrink: true,
                                                                        }}
                                                                    />&nbsp;
                                                                </div>
                                                            </div>

                                                            <div className="row mb-4">
                                                                <div className="col-md-4 mb-2">
                                                                    <Typography>But social</Typography>
                                                                </div>

                                                                <div className="col-md-8">
                                                                    <TextField
                                                                        id='ss'
                                                                        multiline
                                                                        rows="4"
                                                                        defaultValue={this.state.entreprise.sBut}
                                                                        onChange={(event) => this.setState({sBut: event.target.value})}
                                                                        //onChange={this.handleObjectChange('EmissionTitre', 'dateEmission')}
                                                                        margin="dense"
                                                                        variant="outlined"
                                                                        style={{width: '80%', marginTop: -10}}
                                                                    />
                                                                </div>
                                                            </div>

                                                            <div className="row mb-4">
                                                                <div className="col-md-4 mb-2">
                                                                    <Typography>But de l’émission des
                                                                        Obligations </Typography>
                                                                </div>

                                                                <div className="col-md-8">
                                                                    <TextField
                                                                        id='ss'
                                                                        defaultValue={this.state.EmissionTitre.butEmission}
                                                                        onChange={this.handleObjectChange('EmissionTitre', 'butEmission')}
                                                                        margin="dense"
                                                                        variant="outlined"
                                                                        placeholder="% de la valeur nominale des Obligations"
                                                                        style={{width: '80%', marginTop: -10}}
                                                                    />
                                                                </div>
                                                            </div>

                                                            <div className="row mb-4">
                                                                <div className="col-md-4 mb-2">
                                                                    <Typography>Date des status</Typography>
                                                                </div>

                                                                <div className="col-md-4">
                                                                    <TextField
                                                                        id='ss'
                                                                        type="date"
                                                                        defaultValue={this.state.entreprise.dateStatus}
                                                                        onChange={this.handleObjectChange('entreprise', 'dateStatus')}
                                                                        margin="dense"
                                                                        variant="outlined"
                                                                        style={{width: '80%', marginTop: -10}}
                                                                        InputLabelProps={{
                                                                            shrink: true,
                                                                        }}
                                                                    />
                                                                </div>
                                                            </div>
                                                            <div className="row mb-4">
                                                                <div className="col-md-4 mb-2">
                                                                    <Typography>Capital</Typography>
                                                                </div>

                                                                <div className="col-md-3">
                                                                    <TextField
                                                                        disabled={true}
                                                                        id='fds'
                                                                        defaultValue={this.state.entreprise.sCapital.totalCapital}
                                                                        //onChange={this.handleObjectChange('EmissionTitre', 'tauxInteret')}
                                                                        margin="dense"
                                                                        variant="outlined"
                                                                        style={{width: "65%", marginTop: -10}}
                                                                    />&nbsp;CHF
                                                                </div>
                                                            </div>
                                                            <div className="row mb-4">
                                                                <div className="col-md-4 mb-2">
                                                                    <Typography>Au jour de la date d’émission, la
                                                                        Société n’a émis aucun bon de jouissance
                                                                        ?</Typography>
                                                                </div>

                                                                <div className="col-md-5">
                                                                    <FormGroup row
                                                                               style={{marginTop: -13}}>
                                                                        <FormControlLabel
                                                                            control={
                                                                                <Checkbox
                                                                                    checked={this.state.EmissionTitre.bonJouissanceEmis === 'oui'}
                                                                                    onChange={this.handleObjectChange('EmissionTitre', 'bonJouissanceEmis')}
                                                                                    value='oui'
                                                                                />
                                                                            }
                                                                            label="Oui"
                                                                        />
                                                                        <FormControlLabel
                                                                            control={
                                                                                <Checkbox
                                                                                    checked={this.state.EmissionTitre.bonJouissanceEmis === 'non'}
                                                                                    onChange={this.handleObjectChange('EmissionTitre', 'bonJouissanceEmis')}
                                                                                    value='non'
                                                                                />
                                                                            }
                                                                            label="Non"
                                                                        />
                                                                    </FormGroup>
                                                                    {
                                                                        this.state.EmissionTitre.bonJouissanceEmis === "non" &&
                                                                        <TextField
                                                                            id='ss'
                                                                            multiline
                                                                            rows="4"
                                                                            placeholder="Veuillez indiquer les informations relatives aux bons de jouissance émis."
                                                                            defaultValue={this.state.EmissionTitre.bonJouissance}
                                                                            onChange={this.handleObjectChange('EmissionTitre', 'bonJouissance')}
                                                                            margin="dense"
                                                                            variant="outlined"
                                                                            style={{width: '80%', marginTop: -10}}
                                                                            error={this.state.EmissionTitre.bonJouissance === ""}
                                                                            helperText={this.state.EmissionTitre.bonJouissance === "" && "Champs obligatoire"}
                                                                        />
                                                                    }
                                                                </div>
                                                            </div>
                                                            <div className="row mb-4">
                                                                <div className="col-md-4 mb-2">
                                                                    <Typography>Au jour de la date d’émission, la
                                                                        Société n’a pas contracté de prêt et n’a pas
                                                                        émis d’autres emprunts
                                                                        obligataires que les Obligations.</Typography>
                                                                </div>

                                                                <div className="col-md-5">
                                                                    <FormGroup row
                                                                               style={{marginTop: -13}}>
                                                                        <FormControlLabel
                                                                            control={
                                                                                <Checkbox
                                                                                    checked={this.state.EmissionTitre.AutreEmpruntsEmis === 'oui'}
                                                                                    onChange={this.handleObjectChange('EmissionTitre', 'AutreEmpruntsEmis')}
                                                                                    value='oui'
                                                                                />
                                                                            }
                                                                            label="Oui"
                                                                        />
                                                                        <FormControlLabel
                                                                            control={
                                                                                <Checkbox
                                                                                    checked={this.state.EmissionTitre.AutreEmpruntsEmis === 'non'}
                                                                                    onChange={this.handleObjectChange('EmissionTitre', 'AutreEmpruntsEmis')}
                                                                                    value='non'
                                                                                />
                                                                            }
                                                                            label="Non"
                                                                        />
                                                                    </FormGroup>
                                                                    {
                                                                        this.state.EmissionTitre.AutreEmpruntsEmis === "non" &&
                                                                        <TextField
                                                                            id='ss'
                                                                            multiline
                                                                            rows="4"
                                                                            placeholder="Veuillez indiquer les prêts contractés, ainsi que les informations relatives aux emprunts obligataires ��mis. "
                                                                            defaultValue={this.state.EmissionTitre.InfoEmpruntEmis}
                                                                            onChange={this.handleObjectChange('EmissionTitre', 'InfoEmpruntEmis')}
                                                                            margin="dense"
                                                                            variant="outlined"
                                                                            style={{width: '80%', marginTop: -10}}
                                                                            error={this.state.EmissionTitre.InfoEmpruntEmis === ""}
                                                                            helperText={this.state.EmissionTitre.InfoEmpruntEmis === "" && "Champs obligatoire"}
                                                                        />
                                                                    }
                                                                </div>
                                                            </div>
                                                            <div className="row mb-4">
                                                                <div className="col-md-4 mb-2">
                                                                    <Typography>L’Emetteur n’est pas impliqué dans des
                                                                        procédures civiles, arbitrales ou
                                                                        administratives susceptibles
                                                                        d’avoir une influence matérielle sur la
                                                                        situation de l’Emetteur ? A sa connaissance,
                                                                        l’Emetteur en fait l’objet
                                                                        d’aucune menace de telles
                                                                        procédures</Typography>
                                                                </div>

                                                                <div className="col-md-5">
                                                                    <FormGroup row
                                                                               style={{marginTop: -13}}>
                                                                        <FormControlLabel
                                                                            control={
                                                                                <Checkbox
                                                                                    checked={this.state.EmissionTitre.EmetteurProcCivil === 'oui'}
                                                                                    onChange={this.handleObjectChange('EmissionTitre', 'EmetteurProcCivil')}
                                                                                    value='oui'
                                                                                />
                                                                            }
                                                                            label="Oui"
                                                                        />
                                                                        <FormControlLabel
                                                                            control={
                                                                                <Checkbox
                                                                                    checked={this.state.EmissionTitre.EmetteurProcCivil === 'non'}
                                                                                    onChange={this.handleObjectChange('EmissionTitre', 'EmetteurProcCivil')}
                                                                                    value='non'
                                                                                />
                                                                            }
                                                                            label="Non"
                                                                        />
                                                                    </FormGroup>
                                                                </div>
                                                            </div>
                                                            <div className="row mb-4">
                                                                <div className="col-md-4 mb-2">
                                                                    <Typography>Date de la fin de l'exercice
                                                                        comptable</Typography>
                                                                </div>

                                                                <div className="col-md-4">
                                                                    <TextField
                                                                        id='fds'
                                                                        type="date"
                                                                        defaultValue={this.state.EmissionTitre.dateFinExerciceComptable}
                                                                        onChange={this.handleObjectChange('EmissionTitre', 'dateFinExerciceComptable')}
                                                                        margin="dense"
                                                                        variant="outlined"
                                                                        style={{width: "80%", marginTop: -10}}
                                                                        error={this.state.EmissionTitre.dateFinExerciceComptable === ""}
                                                                        helperText={this.state.EmissionTitre.dateFinExerciceComptable === "" && "Champs obligatoire"}
                                                                    />&nbsp;
                                                                </div>
                                                            </div>
                                                            <div className="row mb-4">
                                                                <div className="col-md-4 mb-2">
                                                                    <Typography>Organe de révision</Typography>
                                                                </div>

                                                                <div className="col-md-8">
                                                                    <TextField
                                                                        id='fds'
                                                                        defaultValue={this.state.OrganeRevision}
                                                                        placeholder="Raison sociale de l’organe de révision"
                                                                        onChange={(event) => this.setState({OrganeRevision: event.target.value})}
                                                                        margin="dense"
                                                                        variant="outlined"
                                                                        style={{width: "80%", marginTop: -10}}
                                                                        error={this.state.OrganeRevision === ""}
                                                                        helperText={this.state.OrganeRevision === "" && "Champs obligatoire"}
                                                                    />
                                                                </div>
                                                            </div>
                                                            {/*<div className="row mb-4">
                                                                <div className="col-md-4 mb-1 ">
                                                                    <Typography>Droit applicable</Typography>
                                                                </div>

                                                                <div className="col-md-8">
                                                                    <TextField
                                                                        id='fds'
                                                                        defaultValue={this.state.EmissionTitre.DroitApplicable}
                                                                        onChange={this.handleObjectChange('EmissionTitre', 'DroitApplicable')}
                                                                        margin="normal"
                                                                        style={{width: "80%", marginTop: -10}}
                                                                    />
                                                                </div>
                                                            </div>*/}
                                                            <div className="row mb-4">
                                                                <div className="col-md-4 mb-2">
                                                                    <Typography>Date du rapport d’audit</Typography>
                                                                </div>
                                                                <div className="col-md-4">
                                                                    <TextField
                                                                        id='ss'
                                                                        type='date'
                                                                        defaultValue={this.state.EmissionTitre.dateAudit}
                                                                        onChange={this.handleObjectChange('EmissionTitre', 'dateAudit')}
                                                                        margin="dense"
                                                                        variant="outlined"
                                                                        style={{width: '80%', marginTop: -10}}
                                                                        InputLabelProps={{
                                                                            shrink: true,
                                                                        }}
                                                                        error={this.state.EmissionTitre.dateAudit === ""}
                                                                        helperText={this.state.EmissionTitre.dateAudit === "" && "Champs obligatoire"}
                                                                    />
                                                                </div>
                                                            </div>
                                                            <div className="row mb-4">
                                                                <div className="col-md-4 mb-2">
                                                                    <Typography>Aucun dividende n’a été distribué Durant
                                                                        les 5 dernières années, ou depuis la
                                                                        constitution de la Société ?</Typography>
                                                                </div>

                                                                <div className="col-md-5">
                                                                    <FormGroup row
                                                                               style={{marginTop: -13}}>
                                                                        <FormControlLabel
                                                                            control={
                                                                                <Checkbox
                                                                                    checked={this.state.EmissionTitre.dividendeDistribue === 'oui'}
                                                                                    onChange={this.handleObjectChange('EmissionTitre', 'dividendeDistribue')}
                                                                                    value='oui'
                                                                                />
                                                                            }
                                                                            label="Oui"
                                                                        />
                                                                        <FormControlLabel
                                                                            control={
                                                                                <Checkbox
                                                                                    checked={this.state.EmissionTitre.dividendeDistribue === 'non'}
                                                                                    onChange={this.handleObjectChange('EmissionTitre', 'dividendeDistribue')}
                                                                                    value='non'
                                                                                />
                                                                            }
                                                                            label="Non"
                                                                        />
                                                                    </FormGroup>
                                                                    {
                                                                        this.state.EmissionTitre.dividendeDistribue === "non" &&
                                                                        <TextField
                                                                            id='ss'
                                                                            multiline
                                                                            rows="4"
                                                                            placeholder="Veuillez fournir les informations relatives à la (aux) distribution(s) de dividende effectuée(s) par la Société "
                                                                            defaultValue={this.state.EmissionTitre.infodistributionDividende}
                                                                            onChange={this.handleObjectChange('EmissionTitre', 'infodistributionDividende')}
                                                                            margin="dense"
                                                                            variant="outlined"
                                                                            style={{width: '80%', marginTop: -10}}
                                                                            error={this.state.EmissionTitre.infodistributionDividende === ""}
                                                                            helperText={this.state.EmissionTitre.infodistributionDividende === "" && "Champs obligatoire"}
                                                                        />
                                                                    }
                                                                </div>
                                                            </div>

                                                            <div className="row mb-4">
                                                                <div className="col-md-4 mb-2">
                                                                    <Typography>L’Emetteur confirme que depuis
                                                                        l’établissement du rapport d’audit
                                                                        intermédiaire,
                                                                        la situation financière et juridique de
                                                                        l’Emetteur ne s’est pas détériorée</Typography>
                                                                </div>

                                                                <div className="col-md-5">
                                                                    <FormGroup row
                                                                               style={{marginTop: -13}}>
                                                                        <FormControlLabel
                                                                            control={
                                                                                <Checkbox
                                                                                    checked={this.state.EmissionTitre.confirmationEmetteur === 'oui'}
                                                                                    onChange={this.handleObjectChange('EmissionTitre', 'confirmationEmetteur')}
                                                                                    value='oui'
                                                                                />
                                                                            }
                                                                            label="Oui"
                                                                        />
                                                                        <FormControlLabel
                                                                            control={
                                                                                <Checkbox
                                                                                    checked={this.state.EmissionTitre.confirmationEmetteur === 'non'}
                                                                                    onChange={this.handleObjectChange('EmissionTitre', 'confirmationEmetteur')}
                                                                                    value='non'
                                                                                />
                                                                            }
                                                                            label="Non"
                                                                        />
                                                                    </FormGroup>
                                                                    {
                                                                        this.state.EmissionTitre.confirmationEmetteur === "non" &&
                                                                        <TextField
                                                                            id='ss'
                                                                            multiline
                                                                            rows="4"
                                                                            placeholder="Veuillez indiquer de quelle manière la situation financière de la société s’est détériorée "
                                                                            defaultValue={this.state.EmissionTitre.situationDeterioree}
                                                                            onChange={this.handleObjectChange('EmissionTitre', 'situationDeterioree')}
                                                                            margin="dense"
                                                                            variant="outlined"
                                                                            style={{width: '80%', marginTop: -10}}
                                                                            error={this.state.EmissionTitre.situationDeterioree === ""}
                                                                            helperText={this.state.EmissionTitre.situationDeterioree === "" && "Champs obligatoire"}
                                                                        />
                                                                    }
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </ExpansionPanelDetails>
                                                </ExpansionPanel>

                                                {/*Obligations*/}
                                                <ExpansionPanel>
                                                    <ExpansionPanelSummary expandIcon={<ExpandMoreIcon onClick={() => {
                                                        this.setState({openFirstExpantionPanel: !this.state.openFirstExpantionPanel})
                                                    }}/>}>
                                                        <h5 className="text-uppercase">Informations relatives au
                                                            obligations</h5>
                                                    </ExpansionPanelSummary>
                                                    <ExpansionPanelDetails style={{display: "block"}}>
                                                        <div>
                                                            <div className="row mb-4 mt-1">
                                                                <div className="col-md-4 mb-2">
                                                                    <Typography>Ajouter une image de fond</Typography>
                                                                </div>

                                                                <div className="col-md-8">
                                                                    <TextField
                                                                        type="file"
                                                                        id='fds'
                                                                        //value={this.state.EmissionTitre.imageUrl}
                                                                        onChange={this.addImageFond}
                                                                        margin="dense"
                                                                        variant="outlined"
                                                                        style={{width: '80%', marginTop: -10}}
                                                                    />
                                                                </div>
                                                            </div>
                                                            <div className="row mb-4 mt-1">
                                                                <div className="col-md-4 mb-2">
                                                                    <Typography>Nom</Typography>
                                                                </div>

                                                                <div className="col-md-8">
                                                                    <TextField
                                                                        id='fds'
                                                                        defaultValue={this.state.EmissionTitre.name}
                                                                        onChange={this.handleObjectChange('EmissionTitre', 'name')}
                                                                        margin="dense"
                                                                        variant="outlined"
                                                                        style={{width: '80%', marginTop: -10}}
                                                                        error={this.state.EmissionTitre.name === ""}
                                                                        helperText={this.state.EmissionTitre.name === "" && "Champs obligatoire"}
                                                                    />
                                                                </div>
                                                            </div>
                                                            <div className="row mb-4 mt-1">
                                                                <div className="col-md-4 mb-2">
                                                                    <Typography>Description</Typography>
                                                                </div>

                                                                <div className="col-md-8">
                                                                    <TextField
                                                                        id='fds'
                                                                        defaultValue={this.state.EmissionTitre.subName}
                                                                        onChange={this.handleObjectChange('EmissionTitre', 'subName')}
                                                                        margin="dense"
                                                                        variant="outlined"
                                                                        style={{width: '80%', marginTop: -10}}
                                                                        error={this.state.EmissionTitre.subName === ""}
                                                                        helperText={this.state.EmissionTitre.subName === "" && "Champs obligatoire"}
                                                                    />
                                                                </div>
                                                            </div>
                                                            <div className="row mb-4 mt-1">
                                                                <div className="col-md-4 mb-2">
                                                                    <Typography>Classe d'actif</Typography>
                                                                </div>

                                                                <div className="col-md-8">
                                                                    <TextField
                                                                        id='fds'
                                                                        defaultValue={this.state.EmissionTitre.assetClass}
                                                                        onChange={this.handleObjectChange('EmissionTitre', 'assetClass')}
                                                                        margin="dense"
                                                                        variant="outlined"
                                                                        style={{width: '80%', marginTop: -10}}
                                                                    />
                                                                </div>
                                                            </div>
                                                            <div className="row mb-4 mt-1">
                                                                <div className="col-md-4 mb-2">
                                                                    <Typography>Sous-Classe d'actif</Typography>
                                                                </div>

                                                                <div className="col-md-8">
                                                                    <TextField
                                                                        id='fds'
                                                                        defaultValue={this.state.EmissionTitre.subAssetClass}
                                                                        onChange={this.handleObjectChange('EmissionTitre', 'subAssetClass')}
                                                                        margin="dense"
                                                                        variant="outlined"
                                                                        style={{width: '80%', marginTop: -10}}
                                                                    />
                                                                </div>
                                                            </div>
                                                            <div className="row mb-4 mt-1">
                                                                <div className="col-md-4 mb-2">
                                                                    <Typography>Nom de la société (conformément au
                                                                        Registre du commerce)</Typography>
                                                                </div>

                                                                <div className="col-md-8">
                                                                    <TextField
                                                                        disabled={true}
                                                                        id='fds'
                                                                        defaultValue={this.state.entreprise.sName}
                                                                        margin="dense"
                                                                        variant="outlined"
                                                                        style={{width: '80%', marginTop: -10}}
                                                                    />
                                                                </div>
                                                            </div>

                                                            <div className="row mb-4">
                                                                <div className="col-md-4 mb-2">
                                                                    <Typography>Adresse du siège (conformément au
                                                                        Registre du commerce) </Typography>
                                                                </div>

                                                                <div className="col-md-8">
                                                                    <TextField
                                                                        disabled={false}
                                                                        id='ss'
                                                                        defaultValue={this.state.entreprise.sSiege.adress + " " + this.state.entreprise.sSiege.postalCode + ", " +
                                                                        this.state.entreprise.sSiege.ville + ", " + this.state.entreprise.sSiege.pays}
                                                                        margin="dense"
                                                                        variant="outlined"
                                                                        style={{width: '80%', marginTop: -10}}
                                                                    />
                                                                </div>
                                                            </div>
                                                            <div className="row mb-4">
                                                                <div className="col-md-4 mb-2">
                                                                    <Typography>Pays d'incorporation</Typography>
                                                                </div>

                                                                <div className="col-md-8">
                                                                    <TextField
                                                                        id='ss'
                                                                        value={this.state.EmissionTitre.countryOfIncorp}
                                                                        onChange={this.handleObjectChange('EmissionTitre', 'countryOfIncorp')}
                                                                        margin="dense"
                                                                        variant="outlined"
                                                                        style={{width: '80%', marginTop: -10}}
                                                                    />
                                                                </div>
                                                            </div>

                                                            <div className="row mb-4">
                                                                <div className="col-md-4 mb-2">
                                                                    <Typography>Montant</Typography>
                                                                </div>
                                                                <div className="col-md-3">
                                                                    <TextField
                                                                        id='ss'
                                                                        defaultValue={this.state.EmissionTitre.Montant}
                                                                        onChange={this.handleObjectChange('EmissionTitre', 'Montant')}
                                                                        margin="dense"
                                                                        variant="outlined"
                                                                        style={{width: '80%', marginTop: -10}}
                                                                        error={this.state.EmissionTitre.Montant === "" || verifForms.verif_Number(this.state.EmissionTitre.Montant)}
                                                                        helperText={
                                                                            this.state.EmissionTitre.Montant === "" ? "Champs obligatoire" :
                                                                                verifForms.verif_Number(this.state.EmissionTitre.Montant) ? "Format invalide" : false
                                                                        }
                                                                    />
                                                                </div>
                                                                <div className="col-md-1">
                                                                    <TextField
                                                                        id='currrnecy'
                                                                        select
                                                                        value={this.state.EmissionTitre.currency}
                                                                        onChange={this.handleObjectChange('EmissionTitre', 'currency')}
                                                                        SelectProps={{
                                                                            MenuProps: {},
                                                                        }}
                                                                        style={{width: "100%", marginTop: -5,marginLeft:-10}}
                                                                        margin="normal"
                                                                    >
                                                                        <MenuItem key="CHF" value="CHF">CHF</MenuItem>
                                                                        <MenuItem key="EUR" value="EUR">EUR</MenuItem>
                                                                        <MenuItem key="USD" value="USD">USD</MenuItem>
                                                                        )}
                                                                    </TextField>
                                                                </div>
                                                            </div>
                                                            <div className="row mb-4">
                                                                <div className="col-md-4 mb-2">
                                                                    <Typography>Montant de sécurité</Typography>
                                                                </div>
                                                                <div className="col-md-3">
                                                                    <TextField
                                                                        id='ss'
                                                                        defaultValue={this.state.EmissionTitre.securityPrice}
                                                                        onChange={this.handleObjectChange('EmissionTitre', 'securityPrice')}
                                                                        margin="dense"
                                                                        variant="outlined"
                                                                        style={{width: '80%', marginTop: -10}}
                                                                        error={this.state.EmissionTitre.securityPrice === ""}
                                                                        helperText={
                                                                            this.state.EmissionTitre.securityPrice === "" && "Champs obligatoire"
                                                                        }
                                                                    />
                                                                </div>
                                                            </div>

                                                            <div className="row mb-4">
                                                                <div className="col-md-4 mb-2">
                                                                    <Typography>Nombre de Tokens</Typography>
                                                                </div>
                                                                <div className="col-md-3">
                                                                    <TextField
                                                                        id='ss'
                                                                        defaultValue={this.state.EmissionTitre.nbTokens}
                                                                        onChange={this.handleObjectChange('EmissionTitre', 'nbTokens')}
                                                                        margin="dense"
                                                                        variant="outlined"
                                                                        style={{width: '80%', marginTop: -10}}
                                                                        error={this.state.EmissionTitre.nbTokens === "" || verifForms.verif_Number(this.state.EmissionTitre.nbTokens)}
                                                                        helperText={
                                                                            this.state.EmissionTitre.Montant === "" ? "Champs obligatoire" :
                                                                                verifForms.verif_Number(this.state.EmissionTitre.nbTokens) ? "Format invalide" : false
                                                                        }
                                                                    />
                                                                </div>
                                                            </div>
                                                            <div className="row mb-4">
                                                                <div className="col-md-4 mb-2">
                                                                    <Typography>Résumé</Typography>
                                                                </div>
                                                                <div className="col-md-8">
                                                                    <TextField
                                                                        id='fds'
                                                                        defaultValue={this.state.EmissionTitre.executiveSummary}
                                                                        onChange={this.handleObjectChange('EmissionTitre', 'executiveSummary')}
                                                                        margin="dense"
                                                                        variant="outlined"
                                                                        style={{width: "80%", marginTop: -10}}
                                                                        multiline
                                                                        rows="4"
                                                                        error={this.state.EmissionTitre.executiveSummary === ""}
                                                                        helperText={this.state.EmissionTitre.executiveSummary === "" && "Champs obligatoire"}
                                                                    />
                                                                </div>

                                                            </div>
                                                            <div className="row mb-4">
                                                                <div className="col-md-4 mb-2">
                                                                    <Typography>Structure d'investissement</Typography>
                                                                </div>
                                                                <div className="col-md-8">
                                                                    <TextField
                                                                        id='fds'
                                                                        defaultValue={this.state.EmissionTitre.investmentStructure}
                                                                        onChange={this.handleObjectChange('EmissionTitre', 'investmentStructure')}
                                                                        margin="dense"
                                                                        variant="outlined"
                                                                        style={{width: "80%", marginTop: -10}}
                                                                        multiline
                                                                        rows="4"
                                                                        error={this.state.EmissionTitre.investmentStructure === ""}
                                                                        helperText={this.state.EmissionTitre.investmentStructure === "" && "Champs obligatoire"}
                                                                    />
                                                                </div>

                                                            </div>

                                                            <div className="row mb-4">
                                                                <div className="col-md-6 mb-2">
                                                                    <div className="row">
                                                                        <div className="col-md-5 mb-2">
                                                                            <Typography>Premier Pourcentage (%)</Typography>
                                                                        </div>
                                                                        <div className="col-md-7">
                                                                            <TextField
                                                                                id='ss'
                                                                                defaultValue={this.state.EmissionTitre.percent1}
                                                                                onChange={this.handleObjectChange('EmissionTitre', 'percent1')}
                                                                                margin="dense"
                                                                                variant="outlined"
                                                                                style={{width: '80%', marginTop: -10}}
                                                                                error={this.state.EmissionTitre.percent1 === "" || verifForms.verif_Number(this.state.EmissionTitre.percent1)}
                                                                                helperText={
                                                                                    this.state.EmissionTitre.percent1 === "" ? "Champs obligatoire" :
                                                                                        verifForms.verif_Number(this.state.EmissionTitre.percent1) ? "Format invalide" : false
                                                                                }
                                                                            />
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div className="col-md-6 mb-2">
                                                                    <div className="row">
                                                                        <div className="col-md-3 mb-2">
                                                                            <Typography>Date</Typography>
                                                                        </div>
                                                                        <div className="col-md-7">
                                                                            <TextField
                                                                                id='ss'
                                                                                type="date"
                                                                                defaultValue={this.state.EmissionTitre.percent1Date}
                                                                                onChange={this.handleObjectChange('EmissionTitre', 'percent1Date')}
                                                                                margin="dense"
                                                                                variant="outlined"
                                                                                style={{width: '80%', marginTop: -10}}
                                                                                error={this.state.EmissionTitre.percent1Date === ""}
                                                                                helperText={
                                                                                    this.state.EmissionTitre.percent1Date === "" && "Champs obligatoire"
                                                                                }
                                                                            />
                                                                        </div>
                                                                    </div>
                                                                </div>


                                                            </div>

                                                            <div className="row mb-4">
                                                                <div className="col-md-6 mb-2">
                                                                    <div className="row">
                                                                        <div className="col-md-5 mb-2">
                                                                            <Typography>Deuxieme  Pourcentage (%)</Typography>
                                                                        </div>
                                                                        <div className="col-md-7">
                                                                            <TextField
                                                                                id='ss'
                                                                                defaultValue={this.state.EmissionTitre.percent2}
                                                                                onChange={this.handleObjectChange('EmissionTitre', 'percent2')}
                                                                                margin="dense"
                                                                                variant="outlined"
                                                                                style={{width: '80%', marginTop: -10}}
                                                                                error={this.state.EmissionTitre.percent2 === "" || verifForms.verif_Number(this.state.EmissionTitre.percent2)}
                                                                                helperText={
                                                                                    this.state.EmissionTitre.percent2 === "" ? "Champs obligatoire" :
                                                                                        verifForms.verif_Number(this.state.EmissionTitre.percent2) ? "Format invalide" : false
                                                                                }
                                                                            />
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div className="col-md-6 mb-2">
                                                                    <div className="row">
                                                                        <div className="col-md-3 mb-2">
                                                                            <Typography>Date</Typography>
                                                                        </div>
                                                                        <div className="col-md-7">
                                                                            <TextField
                                                                                id='ss'
                                                                                type="date"
                                                                                defaultValue={this.state.EmissionTitre.percent2Date}
                                                                                onChange={this.handleObjectChange('EmissionTitre', 'percent2Date')}
                                                                                margin="dense"
                                                                                variant="outlined"
                                                                                style={{width: '80%', marginTop: -10}}
                                                                                error={this.state.EmissionTitre.percent2Date === ""}
                                                                                helperText={
                                                                                    this.state.EmissionTitre.percent2Date === "" && "Champs obligatoire"
                                                                                }
                                                                            />
                                                                        </div>
                                                                    </div>
                                                                </div>


                                                            </div>

                                                            <div className="row mb-4">
                                                                <div className="col-md-6 mb-2">
                                                                    <div className="row">
                                                                        <div className="col-md-5 mb-2">
                                                                            <Typography>Troisiéme  Pourcentage (%)</Typography>
                                                                        </div>
                                                                        <div className="col-md-7">
                                                                            <TextField
                                                                                id='ss'
                                                                                defaultValue={this.state.EmissionTitre.percent3}
                                                                                onChange={this.handleObjectChange('EmissionTitre', 'percent3')}
                                                                                margin="dense"
                                                                                variant="outlined"
                                                                                style={{width: '80%', marginTop: -10}}
                                                                                error={this.state.EmissionTitre.percent3 === "" || verifForms.verif_Number(this.state.EmissionTitre.percent3)}
                                                                                helperText={
                                                                                    this.state.EmissionTitre.percent3 === "" ? "Champs obligatoire" :
                                                                                        verifForms.verif_Number(this.state.EmissionTitre.percent3) ? "Format invalide" : false
                                                                                }
                                                                            />
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div className="col-md-6 mb-2">
                                                                    <div className="row">
                                                                        <div className="col-md-3 mb-2">
                                                                            <Typography>Date</Typography>
                                                                        </div>
                                                                        <div className="col-md-7">
                                                                            <TextField
                                                                                id='ss'
                                                                                type="date"
                                                                                defaultValue={this.state.EmissionTitre.percent3Date}
                                                                                onChange={this.handleObjectChange('EmissionTitre', 'percent3Date')}
                                                                                margin="dense"
                                                                                variant="outlined"
                                                                                style={{width: '80%', marginTop: -10}}
                                                                                error={this.state.EmissionTitre.percent3Date === ""}
                                                                                helperText={
                                                                                    this.state.EmissionTitre.percent3Date === "" && "Champs obligatoire"
                                                                                }
                                                                            />
                                                                        </div>
                                                                    </div>
                                                                </div>


                                                            </div>

                                                            <div className="row mb-4">
                                                                <div className="col-md-4 mb-2">
                                                                    <Typography>Date prévue d’émission (pas avant dans 6
                                                                        semaines) </Typography>
                                                                </div>

                                                                <div className="col-md-4">
                                                                    <TextField
                                                                        id='ss'
                                                                        type='date'
                                                                        defaultValue={this.state.EmissionTitre.dateEmission}
                                                                        onChange={this.handleObjectChange('EmissionTitre', 'dateEmission')}
                                                                        margin="dense"
                                                                        variant="outlined"
                                                                        style={{width: '80%', marginTop: -10}}
                                                                        InputLabelProps={{
                                                                            shrink: true,
                                                                        }}
                                                                        error={this.state.EmissionTitre.dateEmission === ""}
                                                                        helperText={this.state.EmissionTitre.dateEmission === "" && "Champs obligatoire"}
                                                                    />
                                                                </div>
                                                            </div>

                                                            <div className="row mb-4">
                                                                <div className="col-md-4 mb-2">
                                                                    <Typography>Prix d’émission </Typography>
                                                                </div>

                                                                <div className="col-md-6">
                                                                    <TextField
                                                                        id='ss'
                                                                        defaultValue={this.state.EmissionTitre.prixEmission}
                                                                        onChange={this.handleObjectChange('EmissionTitre', 'prixEmission')}
                                                                        margin="dense"
                                                                        variant="outlined"
                                                                        placeholder="% de la valeur nominale des Obligations"
                                                                        style={{width: '80%', marginTop: -10}}
                                                                        error={this.state.EmissionTitre.prixEmission === "" || verifForms.verif_Number(this.state.EmissionTitre.prixEmission)}
                                                                        helperText={
                                                                            this.state.EmissionTitre.prixEmission === "" ? "Champs obligatoire" :
                                                                                verifForms.verif_Number(this.state.EmissionTitre.prixEmission) ? "Format invalide" : false
                                                                        }
                                                                    />
                                                                </div>
                                                            </div>

                                                            <div className="row mb-4">
                                                                <div className="col-md-4 mb-2">
                                                                    <Typography>Prix de placement </Typography>
                                                                </div>

                                                                <div className="col-md-6">
                                                                    <TextField
                                                                        id='ss'
                                                                        defaultValue={this.state.EmissionTitre.prixPlacement}
                                                                        onChange={this.handleObjectChange('EmissionTitre', 'prixPlacement')}
                                                                        margin="dense"
                                                                        variant="outlined"
                                                                        placeholder="Se détermine selon la demande (pendant la période de souscription également)"
                                                                        style={{width: '80%', marginTop: -10}}
                                                                        error={this.state.EmissionTitre.prixPlacement === "" || verifForms.verif_Number(this.state.EmissionTitre.prixPlacement)}
                                                                        helperText={
                                                                            this.state.EmissionTitre.prixPlacement === "" ? "Champs obligatoire" :
                                                                                verifForms.verif_Number(this.state.EmissionTitre.prixPlacement) ? "Format invalide" : false
                                                                        }
                                                                    />
                                                                </div>
                                                            </div>
                                                            <div className="row mb-4">
                                                                <div className="col-md-4 mb-2">
                                                                    <Typography>Taux d’intérêt </Typography>
                                                                </div>

                                                                <div className="col-md-2">
                                                                    <TextField
                                                                        id='fds'
                                                                        defaultValue={this.state.EmissionTitre.tauxInteret}
                                                                        onChange={this.handleObjectChange('EmissionTitre', 'tauxInteret')}
                                                                        margin="dense"
                                                                        variant="outlined"
                                                                        style={{width: "65%", marginTop: -10}}
                                                                        error={this.state.EmissionTitre.tauxInteret === "" || verifForms.verif_Number(this.state.EmissionTitre.tauxInteret)}
                                                                        helperText={
                                                                            this.state.EmissionTitre.tauxInteret === "" ? "Champs obligatoire" :
                                                                                verifForms.verif_Number(this.state.EmissionTitre.tauxInteret) ? "Format invalide" : false
                                                                        }
                                                                    />&nbsp;%
                                                                </div>

                                                                <div className="col-md-3 mb-2">
                                                                    <Typography>Date du premier paiement</Typography>
                                                                </div>

                                                                <div className="col-md-3">
                                                                    <TextField
                                                                        id='ss'
                                                                        type='date'
                                                                        defaultValue={this.state.EmissionTitre.datePremierPaie}
                                                                        onChange={this.handleObjectChange('EmissionTitre', 'datePremierPaie')}
                                                                        margin="dense"
                                                                        variant="outlined"
                                                                        style={{width: '70%', marginTop: -10}}
                                                                        InputLabelProps={{
                                                                            shrink: true,
                                                                        }}
                                                                        error={this.state.EmissionTitre.datePremierPaie === ""}
                                                                        helperText={this.state.EmissionTitre.datePremierPaie === "" && "Champs obligatoire"}
                                                                    />
                                                                </div>

                                                            </div>
                                                            <div className="row mb-4">
                                                                <div className="col-md-4 mb-2">
                                                                    <Typography>Date de remboursement</Typography>
                                                                </div>

                                                                <div className="col-md-4">
                                                                    <TextField
                                                                        id='ss'
                                                                        type='date'
                                                                        defaultValue={this.state.EmissionTitre.dateRemboursement}
                                                                        onChange={this.handleObjectChange('EmissionTitre', 'dateRemboursement')}
                                                                        margin="dense"
                                                                        variant="outlined"
                                                                        style={{width: '80%', marginTop: -10}}
                                                                        InputLabelProps={{
                                                                            shrink: true,
                                                                        }}
                                                                        error={this.state.EmissionTitre.dateRemboursement === ""}
                                                                        helperText={this.state.EmissionTitre.dateRemboursement === "" && "Champs obligatoire"}
                                                                    />
                                                                </div>
                                                            </div>
                                                            {/*<div className="row mb-4">
                                                                <div className="col-md-4 mb-2">
                                                                    <Typography>Durée</Typography>
                                                                </div>

                                                                <div className="col-md-3">
                                                                    <TextField
                                                                        id='fds'
                                                                        defaultValue={this.state.EmissionTitre.duree}
                                                                        onChange={this.handleObjectChange('EmissionTitre', 'duree')}
                                                                        margin="dense"
                                                                        variant="outlined"
                                                                        style={{width: "80%", marginTop: -10}}
                                                                        error={this.state.EmissionTitre.duree === "" || verifForms.verif_Number(this.state.EmissionTitre.duree)}
                                                                        helperText={
                                                                            this.state.EmissionTitre.duree === "" ? "Champs obligatoire" :
                                                                                verifForms.verif_Number(this.state.EmissionTitre.duree) ? "Format invalide" : false
                                                                        }
                                                                    />&nbsp;années
                                                                </div>
                                                            </div>*/}
                                                            <div className="row mb-4">
                                                                <div className="col-md-4 mb-2">
                                                                    <Typography>Assurances contractuelles</Typography>
                                                                </div>

                                                                <div className="col-md-8">
                                                                    <FormGroup row
                                                                               style={{marginTop: -13}}>
                                                                        <FormControlLabel
                                                                            control={
                                                                                <Checkbox
                                                                                    checked={this.state.EmissionTitre.AssurancesContractuelles === 'oui'}
                                                                                    onChange={this.handleObjectChange('EmissionTitre', 'AssurancesContractuelles')}
                                                                                    value='oui'
                                                                                />
                                                                            }
                                                                            label="Oui"
                                                                        />
                                                                        <FormControlLabel
                                                                            control={
                                                                                <Checkbox
                                                                                    checked={this.state.EmissionTitre.AssurancesContractuelles === 'non'}
                                                                                    onChange={this.handleObjectChange('EmissionTitre', 'AssurancesContractuelles')}
                                                                                    value='non'
                                                                                />
                                                                            }
                                                                            label="Non"
                                                                        />
                                                                    </FormGroup>
                                                                </div>
                                                            </div>
                                                            <div className="row mb-4">
                                                                <div className="col-md-4 mb-2">
                                                                    <Typography>Dénomination (en CHF) </Typography>
                                                                </div>

                                                                <div className="col-md-3">
                                                                    <TextField
                                                                        id='fds'
                                                                        defaultValue={this.state.EmissionTitre.Denomination}
                                                                        onChange={this.handleObjectChange('EmissionTitre', 'Denomination')}
                                                                        margin="dense"
                                                                        variant="outlined"
                                                                        style={{width: "80%", marginTop: -10}}
                                                                        error={this.state.EmissionTitre.Denomination === "" || verifForms.verif_Number(this.state.EmissionTitre.Denomination)}
                                                                        helperText={
                                                                            this.state.EmissionTitre.Denomination === "" ? "Champs obligatoire" :
                                                                                verifForms.verif_Number(this.state.EmissionTitre.Denomination) ? "Format invalide" : false
                                                                        }
                                                                    />&nbsp;CHF
                                                                </div>
                                                            </div>
                                                            <div className="row mb-4">
                                                                <div className="col-md-4 mb-2">
                                                                    <Typography>Cotation</Typography>
                                                                </div>

                                                                <div className="col-md-8">
                                                                    <TextField
                                                                        id='fds'
                                                                        defaultValue={this.state.EmissionTitre.Cotation}
                                                                        onChange={this.handleObjectChange('EmissionTitre', 'Cotation')}
                                                                        disabled={true}
                                                                        margin="dense"
                                                                        variant="outlined"
                                                                        style={{width: "80%", marginTop: -10}}
                                                                    />
                                                                </div>
                                                            </div>
                                                            {/*<div className="row mb-4">
                                                                <div className="col-md-4 mb-1 ">
                                                                    <Typography>Droit applicable</Typography>
                                                                </div>

                                                                <div className="col-md-8">
                                                                    <TextField
                                                                        id='fds'
                                                                        defaultValue={this.state.EmissionTitre.DroitApplicable}
                                                                        onChange={this.handleObjectChange('EmissionTitre', 'DroitApplicable')}
                                                                        margin="normal"
                                                                        style={{width: "80%", marginTop: -10}}
                                                                    />
                                                                </div>
                                                            </div>*/}
                                                            <div className="row mb-4">
                                                                <div className="col-md-4 mb-2">
                                                                    <Typography>Restriction de ventes</Typography>
                                                                </div>

                                                                <div className="col-md-8">
                                                                    <FormGroup row
                                                                               style={{marginTop: -13}}>
                                                                        <FormControlLabel
                                                                            control={
                                                                                <Checkbox
                                                                                    checked={this.state.EmissionTitre.RestrictionVentes === 'oui'}
                                                                                    onChange={this.handleObjectChange('EmissionTitre', 'RestrictionVentes')}
                                                                                    value='oui'
                                                                                />
                                                                            }
                                                                            label="Oui"
                                                                        />
                                                                        <FormControlLabel
                                                                            control={
                                                                                <Checkbox
                                                                                    checked={this.state.EmissionTitre.RestrictionVentes === 'non'}
                                                                                    onChange={this.handleObjectChange('EmissionTitre', 'RestrictionVentes')}
                                                                                    value='non'
                                                                                />
                                                                            }
                                                                            label="Non"
                                                                        />
                                                                    </FormGroup>
                                                                </div>
                                                            </div>
                                                            <div className="row mb-4">
                                                                <div className="col-md-4 mb-2">
                                                                    <Typography>Date de la décision du Conseil
                                                                        d’administration</Typography>
                                                                </div>
                                                                <div className="col-md-4">
                                                                    <TextField
                                                                        id='ss'
                                                                        type='date'
                                                                        defaultValue={this.state.EmissionTitre.DateDecisionAdmin}
                                                                        onChange={this.handleObjectChange('EmissionTitre', 'DateDecisionAdmin')}
                                                                        margin="dense"
                                                                        variant="outlined"
                                                                        style={{width: '80%', marginTop: -10}}
                                                                        InputLabelProps={{
                                                                            shrink: true,
                                                                        }}
                                                                        error={this.state.EmissionTitre.DateDecisionAdmin === ""}
                                                                        helperText={this.state.EmissionTitre.DateDecisionAdmin === "" && "Champs obligatoire"}
                                                                    />
                                                                </div>

                                                            </div>
                                                            <div className="row mb-4">
                                                                <div className="col-md-4 mb-2">
                                                                    <Typography>Utilisation du produit net</Typography>
                                                                </div>
                                                                <div className="col-md-8">
                                                                    <TextField
                                                                        id='fds'
                                                                        defaultValue={this.state.EmissionTitre.utilisationProduitNet}
                                                                        onChange={this.handleObjectChange('EmissionTitre', 'utilisationProduitNet')}
                                                                        margin="dense"
                                                                        variant="outlined"
                                                                        style={{width: "80%", marginTop: -10}}
                                                                        multiline
                                                                        rows="4"
                                                                        error={this.state.EmissionTitre.utilisationProduitNet === ""}
                                                                        helperText={this.state.EmissionTitre.utilisationProduitNet === "" && "Champs obligatoire"}
                                                                    />
                                                                </div>

                                                            </div>
                                                        </div>
                                                    </ExpansionPanelDetails>
                                                </ExpansionPanel>


                                                <div style={{textAlign: 'center'}}>

                                                    <Button variant="contained" color="secondary" style={{
                                                        fontSize: 12,
                                                        fontWeight: "bold",
                                                        marginTop: 25,
                                                        color: 'white',
                                                        marginBottom: 25
                                                    }}

                                                            disabled={this.verifObligationForm()}
                                                            onClick={this.saveEmpruntBonds}
                                                    >
                                                        {
                                                            this.state.loading ?
                                                                <CircularProgress color="white"/> :
                                                                "Valider"
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

export default empruntObligationBonds;