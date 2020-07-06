import React, {Component, Suspense} from "react";
import Loader from "../../../../../../components/Loader";
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
import verifForms from "../../../../../../tools/verifForms"
import firebase from "firebase/app";
import "firebase/database"
import MySnackbarContentWrapper from "../../../../../../tools/customSnackBar";
import Snackbar from "@material-ui/core/Snackbar";
import CircularProgress from '@material-ui/core/CircularProgress';
import moment from "moment";
import entrepriseSARLService from "../../../../../../provider/entrepriseSARLService";
import MenuItem from "@material-ui/core/MenuItem";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import Dialog from "@material-ui/core/Dialog";
import DialogContentText from "@material-ui/core/DialogContentText";
import InputRange from 'react-input-range';
import "../../../../../../assets/css/customInputRange.css"
import PopupDate from "../../../../../../components/PopupDate";
import TopBar from "../../../../../../components/TopBar/TopBar";
import logo from "../../../../../../assets/images/logos/logoSmartCo.jpeg";
import SideMenu from "../../../../../../components/SideMenu/SideMenu";
import data from "../../../../../../data/data";
import SideBar from "../../../../../../components/SideBar/SideBar";
import ELayerService from "../../../../../../provider/ELayerService";

class EmpUtilityToken extends Component {


    constructor(props) {
        super(props);
        //this.handleObjectChange = this.handleObjectChange.bind(this);
        this.addImageFond = this.addImageFond.bind(this);
        this.state = {
            loading: false,
            selectedSieMenuItem: "soc",
            openSideMenu: false,
            showSecondSideBar: false,
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
                currency: "CHF",
                sigleToken: "",
                name: "",
                subName: "",
                assetClass: "ICO d'infrastructure hardware",
                subAssetClass: "Solar Asset",
                countryOfIncorp: "Switzerland",
                securityPrice: "",
                executiveSummary: "",
                investmentStructure: "",
                imageUrl: "",

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

            openWizardTokenModal: false,
            tokenModalStep: "details",

            tokenName: "",
            tokenSymbol: "",
            tokenType: "Utility Token",
            complianceCore: "ELayer",
            decimal: "18",
            supply: "",
            tokenPrice: "1.00",
            owner: "0x70dc7BE0c79159FffcE171CcA2C11Af5cb8552d4",
            vault: "",
            ratesProvider: "",

            reservedToken: "",
            privateSaleToken: "",
            publicSaleToken: "",
            notAllocatedToken: "",

            reservedTokenPercent: 20,
            privateSaleTokenPercent: 40,
            publicSaleTokenPercent: 20,
            notAllocatedTokenPercent: 20,

            privateSaleBonusPercent: 0,
            publicSaleBonusPercent: 0,

            openingPrivateSaleFDate: moment().format("YYYY-MM-DD"),
            openingPrivateSaleLDate: moment().format("YYYY-MM-DD"),

            openingPublicSaleFDate: moment().format("YYYY-MM-DD"),
            openingPublicSaleLDate: moment().format("YYYY-MM-DD"),

            vestingPeriod: "",

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
            this.setState({issuanceProjects: issuanceProjects || []})
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
        name === "Montant" && this.setState({supply: event.target.value});
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
            created: moment().format("YYYY-MM-DD"),
            imageUrl: this.state.EmissionTitre.imageUrl,
            financialLegal: {
                assetClass_en: this.state.EmissionTitre.assetClass,
                subAssetClass_en: this.state.EmissionTitre.subAssetClass,
                countryOfIncorp_en: this.state.EmissionTitre.countryOfIncorp,
                executiveSummary_en: this.state.EmissionTitre.executiveSummary,
                investmentStructure_en: this.state.EmissionTitre.investmentStructure,
                issuer: this.state.entreprise.sName,
                securityPrice: this.state.EmissionTitre.securityPrice,
                tokenizedNominal_en: this.state.EmissionTitre.Montant + " " + this.state.EmissionTitre.currency
            },
            keyFacts: {
                currency: this.state.EmissionTitre.currency,
                currentinvestment: "000000" + " " + this.state.EmissionTitre.currency,
                minimumInvestment: "000000",
                raisingPeriod_en: "12 months +",
                targetReturn: "000000"
            },
            name: this.state.EmissionTitre.name,
            subName_en: this.state.EmissionTitre.subName,
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

                firebase.database().ref('/').update({'issuanceProjects': issuanceProjects});

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
            (this.state.EmissionTitre.dividendeDistribue === "non" && verifForms.verif_inpuText(this.state.EmissionTitre.infodistributionDividende)) ||
            (this.state.EmissionTitre.confirmationEmetteur === "non" && verifForms.verif_inpuText(this.state.EmissionTitre.situationDeterioree)) ||
            verifForms.verif_Number(this.state.EmissionTitre.Montant) ||
            verifForms.verif_Number(this.state.EmissionTitre.prixEmission) || verifForms.verif_Number(this.state.EmissionTitre.prixPlacement) ||
            verifForms.verif_Number(this.state.EmissionTitre.tauxInteret) ||
            verifForms.verif_Number(this.state.EmissionTitre.Denomination) || verifForms.verif_inpuText(this.state.EmissionTitre.utilisationProduitNet))

    }

    async addImageFond(image) {
        let file = image.target.files[0];

        firebase.storage().ref("/users/files/").child(file.name).put(file)
            .then((snapshot) => {
                snapshot.ref.getDownloadURL().then(url => {

                    let emissCopy = this.state.EmissionTitre;
                    emissCopy.imageUrl = url;
                    this.setState({EmissionTitre: emissCopy});
                })

            }).catch((error) => {
            console.log('One failed:', file.name, error.message)
        });

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

                <div style={{paddingLeft: "10%", marginRight: 50, marginTop: 50}}>
                    <div className="row" style={{marginTop: 35}}>
                        <div className="col-lg-11">
                            <div className="card">
                                <div className="card-body" style={{padding: "2.1rem"}}>
                                    <a style={{color: 'hover: #21a5c2 !important', cursor: 'pointer'}}
                                       onClick={() => this.props.history.goBack()}
                                       className="float-right text-info">Retour</a>
                                    <h4 className=" mt-0 mb-3">Emission d'Utility Token (ICO)</h4>


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
                                                            <Typography
                                                                style={{fontWeight: "bold"}}>{this.state.entreprise.sName}</Typography>
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
                                                                defaultValue={this.state.entreprise.numIDE}
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
                                                            <Typography style={{
                                                                color: "#000",
                                                                fontWeight: "bold"
                                                            }}>Le {moment(this.state.entreprise.dateCreation).format("DD MMMM YYYY")}</Typography>

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

                                                        <div className="col-md-8" style={{display: "flex"}}>
                                                            <PopupDate
                                                                showLabels={false}
                                                                value={this.state.entreprise.dateStatus}
                                                                onDateChange={date => {
                                                                    let objCp = this.state.entreprise;
                                                                    objCp.dateStatus = date;
                                                                    this.setState({entreprise: objCp})
                                                                }}
                                                                format='day/month/year'
                                                                invalidMessage="Date invalide"
                                                                style={{marginTop: -8}}
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

                                                        <div className="col-md-8" style={{display: "flex"}}>
                                                            <PopupDate
                                                                showLabels={false}
                                                                value={this.state.EmissionTitre.dateFinExerciceComptable || null}
                                                                onDateChange={date => {
                                                                    console.log(date)
                                                                    let objCp = this.state.EmissionTitre;
                                                                    objCp.dateFinExerciceComptable = date;
                                                                    this.setState({EmissionTitre: objCp})
                                                                }}
                                                                format='day/month/year'
                                                                invalidMessage="Date invalide"
                                                                style={{marginTop: -8}}
                                                            />
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
                                                    <div className="row mb-4">
                                                        <div className="col-md-4 mb-2">
                                                            <Typography>Date du rapport d’audit</Typography>
                                                        </div>
                                                        <div className="col-md-8" style={{display: "flex"}}>
                                                            <PopupDate
                                                                showLabels={false}
                                                                value={this.state.EmissionTitre.dateAudit || null}
                                                                onDateChange={date => {
                                                                    let objCp = this.state.EmissionTitre;
                                                                    objCp.dateAudit = date;
                                                                    this.setState({EmissionTitre: objCp})
                                                                }}
                                                                format='day/month/year'
                                                                invalidMessage="Date invalide"
                                                                style={{marginTop: -8}}
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
                                                <h5 className="text-uppercase">Informations relatives A l’emission de
                                                    jetons de service ( UTILITY TOKEN )</h5>
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
                                                            <Typography>Classe d'utility token</Typography>
                                                        </div>

                                                        <div className="col-md-8">
                                                            <TextField
                                                                id='fds'
                                                                select
                                                                defaultValue={this.state.EmissionTitre.assetClass}
                                                                onChange={this.handleObjectChange('EmissionTitre', 'assetClass')}
                                                                margin="dense"
                                                                variant="outlined"
                                                                style={{width: '80%', marginTop: -10}}
                                                            >
                                                                <MenuItem key="IIH"
                                                                          value="ICO d'infrastructure hardware">ICO
                                                                    d'infrastructure hardware</MenuItem>
                                                                <MenuItem key="IUL" value="ICO d'utilisation logiciel">ICO
                                                                    d'utilisation logiciel</MenuItem>

                                                            </TextField>
                                                        </div>
                                                    </div>
                                                    <div className="row mb-4 mt-1">
                                                        <div className="col-md-4 mb-2">
                                                            <Typography>Sous-Classe d'utility token</Typography>
                                                        </div>

                                                        <div className="col-md-8">
                                                            <TextField
                                                                id='fds'
                                                                select
                                                                defaultValue={this.state.EmissionTitre.subAssetClass}
                                                                onChange={this.handleObjectChange('EmissionTitre', 'subAssetClass')}
                                                                margin="dense"
                                                                variant="outlined"
                                                                style={{width: '80%', marginTop: -10}}
                                                            >
                                                                <MenuItem key="SA" value="Solar Asset">Solar
                                                                    Asset</MenuItem>
                                                                <MenuItem key="EVA" value="Electric Vehicule Asset">Electric
                                                                    Vehicule Asset</MenuItem>
                                                                <MenuItem key="REA" value="Real Estate Asset">Real
                                                                    Estate Asset</MenuItem>
                                                            </TextField>
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
                                                                style={{width: "100%", marginTop: -5, marginLeft: -10}}
                                                                margin="normal"
                                                            >
                                                                <MenuItem key="CHF" value="CHF">CHF</MenuItem>
                                                                <MenuItem key="EUR" value="EUR">EUR</MenuItem>
                                                                <MenuItem key="USD" value="USD">USD</MenuItem>
                                                                )}
                                                            </TextField>
                                                        </div>
                                                    </div>
                                                    {/*<div className="row mb-4">
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
                                                            <Typography>Sigle de token (6 lettres au maximum)</Typography>
                                                        </div>
                                                        <div className="col-md-3">
                                                            <TextField
                                                                id='ss'
                                                                defaultValue={this.state.EmissionTitre.sigleToken}
                                                                onChange={this.handleObjectChange('EmissionTitre', 'sigleToken')}
                                                                margin="dense"
                                                                variant="outlined"
                                                                style={{width: '80%', marginTop: -10}}
                                                                error={this.state.EmissionTitre.sigleToken === "" || this.state.EmissionTitre.sigleToken.length > 6}
                                                                helperText={
                                                                    this.state.EmissionTitre.sigleToken === "" ? "Champs obligatoire" :
                                                                        this.state.EmissionTitre.sigleToken.length > 6 ? "6 lettres au maximum !" : null
                                                                }
                                                            />
                                                        </div>
                                                    </div>*/}

                                                    <div className="row mb-4">
                                                        <div align="center" className="col-md-12 mb-2">
                                                            <Button variant="contained" size="large" color="secondary"
                                                                    style={{
                                                                        fontWeight: "bold",
                                                                        marginTop: 25,
                                                                        color: 'white',
                                                                        marginBottom: 25
                                                                    }}
                                                                    onClick={() => this.setState({openWizardTokenModal: true})}>
                                                                Configurer votre jeton conforme
                                                            </Button>
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

                                                    {/*<div className="row mb-4">
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


                                                            </div>*/}

                                                    <div className="row mb-4">
                                                        <div className="col-md-4 mb-2">
                                                            <Typography>Date prévue d’émission (pas avant dans 6
                                                                semaines) </Typography>
                                                        </div>

                                                        <div className="col-md-8" style={{display: "flex"}}>
                                                            <PopupDate
                                                                showLabels={false}
                                                                value={this.state.EmissionTitre.dateEmission || null}
                                                                onDateChange={date => {
                                                                    let objCp = this.state.EmissionTitre;
                                                                    objCp.dateEmission = date;
                                                                    this.setState({EmissionTitre: objCp})
                                                                }}
                                                                format='day/month/year'
                                                                invalidMessage="Date invalide"
                                                                style={{marginTop: -8}}
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

                                                        <div className="col-md-3">
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
                                                            />&nbsp;&nbsp; %
                                                        </div>
                                                    </div>
                                                    <div className="row mb-4">
                                                        <div className="col-md-4 mb-2">
                                                            <Typography>Date du premier paiement</Typography>
                                                        </div>

                                                        <div className="col-md-6" style={{display: "flex"}}>
                                                            <PopupDate
                                                                showLabels={false}
                                                                value={this.state.EmissionTitre.datePremierPaie || null}
                                                                onDateChange={date => {
                                                                    let objCp = this.state.EmissionTitre;
                                                                    objCp.datePremierPaie = date;
                                                                    this.setState({EmissionTitre: objCp})
                                                                }}
                                                                format='day/month/year'
                                                                invalidMessage="Date invalide"
                                                                style={{marginTop: -8}}
                                                            />
                                                        </div>
                                                    </div>
                                                    <div className="row mb-4">
                                                        <div className="col-md-4 mb-2">
                                                            <Typography>Date de remboursement</Typography>
                                                        </div>

                                                        <div className="col-md-8" style={{display: "flex"}}>
                                                            <PopupDate
                                                                showLabels={false}
                                                                value={this.state.EmissionTitre.dateRemboursement || null}
                                                                onDateChange={date => {
                                                                    let objCp = this.state.EmissionTitre;
                                                                    objCp.dateRemboursement = date;
                                                                    this.setState({EmissionTitre: objCp})
                                                                }}
                                                                format='day/month/year'
                                                                invalidMessage="Date invalide"
                                                                style={{marginTop: -8}}
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

                                                        <div className="col-md-8" style={{display: "flex"}}>
                                                            <PopupDate
                                                                showLabels={false}
                                                                value={this.state.EmissionTitre.DateDecisionAdmin || null}
                                                                onDateChange={date => {
                                                                    let objCp = this.state.EmissionTitre;
                                                                    objCp.DateDecisionAdmin = date;
                                                                    this.setState({EmissionTitre: objCp})
                                                                }}
                                                                format='day/month/year'
                                                                invalidMessage="Date invalide"
                                                                style={{marginTop: -8}}
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

                                            <Button variant="contained" size="large" color="secondary" style={{
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


                    <Dialog open={this.state.openWizardTokenModal}
                            onClose={() => this.setState({openWizardTokenModal: false})}
                            fullWidth={true}
                            maxWidth={"70%"}
                            aria-labelledby="form-dialog-title">
                        <DialogTitle id="form-dialog-title">Assistant de jeton</DialogTitle>
                        <DialogContent>
                            <DialogContentText>Configuration de votre Jeton conforme</DialogContentText>

                            <div className="row" style={{marginTop: 20}}>
                                <div className="col-12">
                                    <div className="card">
                                        <div className="card-header">
                                            {
                                                this.state.tokenModalStep === "details" ?
                                                    <h4 className="header-title mb-0"
                                                        style={{textTransform: "uppercase"}}>Détails</h4> :
                                                    this.state.tokenModalStep === "minting" ?
                                                        <h4 className="header-title mb-0"
                                                            style={{textTransform: "uppercase"}}>Minting</h4> :
                                                        this.state.tokenModalStep === "sale" ?
                                                            <h4 className="header-title mb-0"
                                                                style={{textTransform: "uppercase"}}>vente</h4> :
                                                            this.state.tokenModalStep === "summary" ?
                                                                <h4 className="header-title mb-0"
                                                                    style={{textTransform: "uppercase"}}>Sommaire</h4> :
                                                                this.state.tokenModalStep === "summary" ?
                                                                    <h4 className="header-title mb-0"
                                                                        style={{textTransform: "uppercase"}}>Création
                                                                        des Tokens</h4> : ""
                                            }

                                        </div>
                                        {
                                            this.state.tokenModalStep === "details" ?
                                                <div className="card-body">
                                                    <div className="card-widgets"/>
                                                    <div className="row">
                                                        <div className="col-md-8">
                                                            <div className="form-group">
                                                                <label>Nom</label>
                                                                <input className="form-control" placeholder="Nom"
                                                                       type="text"
                                                                       value={this.state.tokenName}
                                                                       style={{borderRadius: 0, height: 45}}
                                                                       onChange={event => this.setState({tokenName: event.target.value})}/>
                                                            </div>
                                                        </div>
                                                        <div className="col-md-4">
                                                            <div className="form-group">
                                                                <label>Symbole</label>
                                                                <input className="form-control" placeholder="SYM"
                                                                       type="text"
                                                                       value={this.state.tokenSymbol}
                                                                       onChange={event => this.setState({tokenSymbol: event.target.value})}
                                                                       style={{borderRadius: 0, height: 45}}/>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="row">
                                                        <div className="col-md-12">
                                                            <div className="form-group">
                                                                <label>Propriétaire</label><br/>
                                                                <label style={{color: "red"}}>{this.state.owner}</label>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="row">
                                                        <div className="col-md-12">
                                                            <div className="form-group">
                                                                <label>Type</label>
                                                                <select className="form-control custom-select"
                                                                        value={this.state.tokenType}
                                                                        onChange={event => this.setState({tokenType: event.target.value})}
                                                                        style={{borderRadius: 0, height: 45}}>
                                                                    <option value="UtilityToken">Jeton utilitaire
                                                                    </option>

                                                                </select>
                                                                <ul className="mt-1">
                                                                    <li style={{
                                                                        fontSize: "small",
                                                                        fontWeight: 700
                                                                    }}>Nécessite que les acheteurs de jetons initiaux
                                                                        passent KYC et AML.
                                                                    </li>
                                                                    <li style={{fontSize: "small", fontWeight: 700}}>Les
                                                                        transferts seront verrouillés lors des ventes de
                                                                        jetons.
                                                                    </li>
                                                                </ul>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="row">
                                                        <div className="col-md-12">
                                                            <div className="form-group">
                                                                <label>Noyau de conformité</label>
                                                                <select className="form-control custom-select"
                                                                        value={this.state.complianceCore}
                                                                        onChange={event => this.setState({complianceCore: event.target.value})}
                                                                        style={{borderRadius: 0, height: 45}}>
                                                                    <option value="ELayer">ELayer</option>
                                                                    <option value="CLayer">CLayer</option>
                                                                </select>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div className="row mt-4 mb-3">
                                                        <div className="col-md-12 text-center">
                                                            &nbsp;&nbsp;
                                                            <button className="btn btn-sm customBtnNext mb-3"
                                                                    style={{backgroundColor: "#C0C0C0"}}>
                                                                  <span style={{
                                                                      color: "#fff",
                                                                      fontFamily: "MyriadPro",
                                                                      fontSize: "12pt"
                                                                  }}>
                                                                      Précédent
                                                                  </span>
                                                            </button>
                                                            &nbsp;&nbsp;
                                                            <button className="btn btn-sm customBtnNext mb-3"
                                                                    onClick={() => this.setState({tokenModalStep: "minting"})}
                                                                    style={{backgroundColor: "red"}}>
                                                                   <span style={{
                                                                       color: "#fff",
                                                                       fontFamily: "MyriadPro",
                                                                       fontSize: "12pt"
                                                                   }}>
                                                                      Suivant
                                                                   </span>
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div> :


                                                this.state.tokenModalStep === "minting" ?
                                                    <div className="card-body">
                                                        <div className="card-widgets"/>
                                                        <div className="row">
                                                            <div className="col-md-12">
                                                                <div className="form-group">
                                                                    <label>Fourniture de jetons</label>
                                                                    <div className="input-group">
                                                                        <input className="form-control" type="text"
                                                                               style={{
                                                                                   borderRadius: 0,
                                                                                   height: 45,
                                                                                   textAlign: "right",
                                                                                   color: "#000",
                                                                                   fontSize: 16
                                                                               }}
                                                                               onChange={event => this.setState({supply: event.target.value})}
                                                                               value={this.state.supply === "" ? this.state.EmissionTitre.Montant : this.state.supply}/>
                                                                        <div className="input-group-prepend">
                                                                            <span
                                                                                className="input-group-text font-weight-bold"
                                                                                id="basic-addon1">{this.state.tokenSymbol || "---"}</span>
                                                                        </div>
                                                                    </div>

                                                                </div>
                                                            </div>
                                                        </div>
                                                        <label>Allocation de jetons</label>
                                                        <div style={{border: "1px solid grey", padding: 25}}>
                                                            <div className="row">
                                                                <div className="col-md-12">
                                                                    <div className="form-group">
                                                                        <div className="row">
                                                                            <div className="col-md-5">
                                                                                <label>Reserved</label>
                                                                            </div>
                                                                            <div className="col-md-1">
                                                                                {this.state.reservedTokenPercent}%
                                                                            </div>
                                                                            <div className="col-md-6">
                                                                                <InputRange
                                                                                    formatLabel={value => ``}
                                                                                    maxValue={100}
                                                                                    minValue={0}
                                                                                    step={5}
                                                                                    value={this.state.reservedTokenPercent}
                                                                                    onChange={value => {
                                                                                        this.setState({reservedTokenPercent: value})
                                                                                    }}/>
                                                                            </div>
                                                                        </div>
                                                                        <div className="input-group">
                                                                            <input className="form-control" type="text"
                                                                                   style={{
                                                                                       borderRadius: 0,
                                                                                       height: 45,
                                                                                       textAlign: "right",
                                                                                       color: "#000",
                                                                                       fontSize: 16
                                                                                   }}
                                                                                   value={(parseInt(this.state.supply) * this.state.reservedTokenPercent) / 100}/>
                                                                            <div className="input-group-prepend">
                                                                                <span
                                                                                    className="input-group-text font-weight-bold"
                                                                                    id="basic-addon1">{this.state.tokenSymbol || "---"}</span>
                                                                            </div>
                                                                        </div>

                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className="row">
                                                                <div className="col-md-12">
                                                                    <div className="form-group">
                                                                        <div className="row">
                                                                            <div className="col-md-5">
                                                                                <label>Vente privée</label>
                                                                            </div>
                                                                            <div className="col-md-1">
                                                                                {this.state.privateSaleTokenPercent}%
                                                                            </div>
                                                                            <div className="col-md-6">
                                                                                <InputRange
                                                                                    formatLabel={value => ``}
                                                                                    maxValue={100}
                                                                                    minValue={0}
                                                                                    step={1}
                                                                                    value={this.state.privateSaleTokenPercent}
                                                                                    onChange={value => this.setState({privateSaleTokenPercent: value})}/>
                                                                            </div>
                                                                        </div>


                                                                        <div className="input-group">
                                                                            <input className="form-control" type="text"
                                                                                   style={{
                                                                                       borderRadius: 0,
                                                                                       height: 45,
                                                                                       textAlign: "right",
                                                                                       color: "#000",
                                                                                       fontSize: 16
                                                                                   }}
                                                                                   value={(parseInt(this.state.supply) * this.state.privateSaleTokenPercent) / 100}/>
                                                                            <div className="input-group-prepend">
                                                                                <span
                                                                                    className="input-group-text font-weight-bold"
                                                                                    id="basic-addon1">{this.state.tokenSymbol || "---"}</span>
                                                                            </div>
                                                                        </div>

                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className="row">
                                                                <div className="col-md-12">
                                                                    <div className="form-group">
                                                                        <div className="row">
                                                                            <div className="col-md-5">
                                                                                <label>Vente publique</label>
                                                                            </div>
                                                                            <div className="col-md-1">
                                                                                {this.state.publicSaleTokenPercent}%
                                                                            </div>
                                                                            <div className="col-md-6">
                                                                                <InputRange
                                                                                    formatLabel={value => ``}
                                                                                    maxValue={100}
                                                                                    minValue={0}
                                                                                    step={1}
                                                                                    value={this.state.publicSaleTokenPercent}
                                                                                    onChange={value => this.setState({publicSaleTokenPercent: value})}/>
                                                                            </div>
                                                                        </div>

                                                                        <div className="input-group">
                                                                            <input className="form-control" type="text"
                                                                                   style={{
                                                                                       borderRadius: 0,
                                                                                       height: 45,
                                                                                       textAlign: "right",
                                                                                       color: "#000",
                                                                                       fontSize: 16
                                                                                   }}
                                                                                   value={(parseInt(this.state.supply) * this.state.publicSaleTokenPercent) / 100}/>
                                                                            <div className="input-group-prepend">
                                                                                <span
                                                                                    className="input-group-text font-weight-bold"
                                                                                    id="basic-addon1">{this.state.tokenSymbol || "---"}</span>
                                                                            </div>
                                                                        </div>

                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className="row">
                                                                <div className="col-md-12">
                                                                    <div className="form-group">
                                                                        <div className="row">
                                                                            <div className="col-md-5">
                                                                                <label>Pas alloué</label>
                                                                            </div>
                                                                            <div className="col-md-1">
                                                                                {this.state.notAllocatedTokenPercent}%
                                                                            </div>
                                                                            <div className="col-md-6">
                                                                                <InputRange
                                                                                    formatLabel={value => ``}
                                                                                    maxValue={100}
                                                                                    minValue={0}
                                                                                    step={1}
                                                                                    value={this.state.notAllocatedTokenPercent}
                                                                                    onChange={value => this.setState({notAllocatedTokenPercent: value})}/>
                                                                            </div>
                                                                        </div>
                                                                        <div className="input-group mb-1">
                                                                            <input className="form-control" type="text"
                                                                                   style={{
                                                                                       borderRadius: 0,
                                                                                       height: 45,
                                                                                       textAlign: "right",
                                                                                       color: "#000",
                                                                                       fontSize: 16
                                                                                   }}
                                                                                   value={(parseInt(this.state.supply) * this.state.notAllocatedTokenPercent) / 100}/>
                                                                            <div className="input-group-prepend">
                                                                                <span
                                                                                    className="input-group-text font-weight-bold"
                                                                                    id="basic-addon1">{this.state.tokenSymbol || "---"}</span>
                                                                            </div>
                                                                        </div>
                                                                        <span style={{color: "red", fontWeight: 900}}
                                                                              className="mb-1">Important:&nbsp;
                                                                            <span style={{
                                                                                color: "grey",
                                                                                fontWeight: "normal"
                                                                            }}>Le jeton non attribué peut être vendu à tout moment.</span>
                                                                                </span>

                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>

                                                        <div className="row mt-4 mb-3">
                                                            <div className="col-md-12 text-center">
                                                                &nbsp;&nbsp;
                                                                <button className="btn btn-sm customBtnNext mb-3"
                                                                        onClick={() => this.setState({tokenModalStep: "details"})}
                                                                        style={{backgroundColor: "#C0C0C0"}}>
                                                                  <span style={{
                                                                      color: "#fff",
                                                                      fontFamily: "MyriadPro",
                                                                      fontSize: "12pt"
                                                                  }}>
                                                                      Précédent
                                                                  </span>
                                                                </button>
                                                                &nbsp;&nbsp;
                                                                <button className="btn btn-sm customBtnNext mb-3"
                                                                        onClick={() => this.setState({tokenModalStep: "sale"})}
                                                                        style={{backgroundColor: "red"}}>
                                                                   <span style={{
                                                                       color: "#fff",
                                                                       fontFamily: "MyriadPro",
                                                                       fontSize: "12pt"
                                                                   }}>
                                                                      Suivant
                                                                   </span>
                                                                </button>
                                                            </div>
                                                        </div>
                                                    </div> :


                                                    this.state.tokenModalStep === "sale" ?
                                                        <div className="card-body">
                                                            <div className="card-widgets"/>
                                                            <div className="row">
                                                                <div className="col-md-6">
                                                                    <div className="form-group">
                                                                        <label>Prix du jeton</label>
                                                                        <div className="input-group mb-1">
                                                                            <input className="form-control" type="text"
                                                                                   style={{
                                                                                       borderRadius: 0,
                                                                                       height: 45,
                                                                                       textAlign: "right",
                                                                                       color: "#000",
                                                                                       fontSize: 16
                                                                                   }}
                                                                                   value={this.state.tokenPrice}
                                                                                   onChange={event => this.setState({tokenPrice: event.target.value})}/>
                                                                            <div className="input-group-prepend">
                                                                                <span
                                                                                    className="input-group-text font-weight-bold"
                                                                                    id="basic-addon1">CHF</span>
                                                                            </div>
                                                                        </div>
                                                                        <span style={{color: "red", fontWeight: 900}}
                                                                              className="mb-1">Important:&nbsp;
                                                                            <span style={{
                                                                                color: "grey",
                                                                                fontWeight: "normal"
                                                                            }}>Définissez le prix dans FIAT pour la quantité donnée de jetons.
                                                                                        Lorsque le jeton est un titre, le prix doit être indiqué dans la devise utilisée par l'oracle de conformité.</span>
                                                                                </span>

                                                                    </div>
                                                                </div>
                                                                <div className="col-md-6">
                                                                    <div className="form-group">
                                                                        <label>&nbsp;&nbsp;</label>
                                                                        <div className="input-group mb-1">
                                                                            <input className="form-control" type="text"
                                                                                   style={{
                                                                                       borderRadius: 0,
                                                                                       height: 45,
                                                                                       textAlign: "right",
                                                                                       color: "#000",
                                                                                       fontSize: 16
                                                                                   }}
                                                                                   value="1"/>
                                                                            <div className="input-group-prepend">
                                                                                <span
                                                                                    className="input-group-text font-weight-bold"
                                                                                    id="basic-addon1">{this.state.tokenSymbol || "---"}</span>
                                                                            </div>
                                                                        </div>

                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className="row">
                                                                <div className="col-md-12">
                                                                    <div className="form-group">
                                                                        <label>ETH Vault</label>
                                                                        <div className="input-group mb-1">
                                                                            <div className="input-group-prepend">
                                                                                <span
                                                                                    className="input-group-text font-weight-bold"
                                                                                    id="basic-addon1">0x</span>
                                                                            </div>
                                                                            <input className="form-control" type="text"
                                                                                   style={{
                                                                                       borderRadius: 0,
                                                                                       height: 45,
                                                                                       textAlign: "left",
                                                                                       color: "#000",
                                                                                       fontSize: 16
                                                                                   }}
                                                                                   value="0x70dc7BE0c79159FffcE171CcA2C11Af5cb8552d4"/>
                                                                        </div>
                                                                        <span style={{color: "red", fontWeight: 900}}
                                                                              className="mb-1">Important:&nbsp;
                                                                            <span style={{
                                                                                color: "grey",
                                                                                fontWeight: "normal"
                                                                            }}>
                                                                                        Cette adresse est la destination de tous les {this.state.tokenSymbol || "---"} collectés lors des soldes.
                                                                                    </span>
                                                                                </span>

                                                                    </div>
                                                                </div>
                                                            </div>

                                                            <div className="row">
                                                                <div className="col-md-12">
                                                                    <div className="form-group">
                                                                        <label>Tarifs oracle</label>
                                                                        <select className="form-control custom-select"
                                                                                style={{borderRadius: 0, height: 45}}>
                                                                            <option value="NewOracle">New oracle
                                                                            </option>
                                                                            <option value="Altcoinomy">Altcoinomy
                                                                            </option>

                                                                        </select>

                                                                    </div>
                                                                </div>
                                                            </div>


                                                            <div style={{border: "1px solid grey", padding: 20}}>
                                                                <label>Ouvertures de vente privée</label>
                                                                <div className="form-row justify-content-center mt-1">
                                                                    <div className="col-12 col-md-8">
                                                                        <div className="text-center">
                                                                            <div className="input-group">
                                                                                <input className="form-control"
                                                                                       type="date"
                                                                                       value={this.state.openingPrivateSaleFDate}
                                                                                       onChange={event => this.setState({openingPrivateSaleFDate: event.target.value})}
                                                                                       style={{
                                                                                           borderRadius: 0,
                                                                                           height: 45,
                                                                                           textAlign: "right",
                                                                                           color: "#000",
                                                                                           fontSize: 16
                                                                                       }}
                                                                                />
                                                                                <div className="input-group-prepend">
                                                                                            <span
                                                                                                className="input-group-text font-weight-bold"
                                                                                                id="basic-addon1">
                                                                                                <i className="mdi mdi-calendar font-19"/>
                                                                                            </span>
                                                                                </div>
                                                                                <input className="form-control"
                                                                                       type="date"
                                                                                       value={this.state.openingPrivateSaleLDate}
                                                                                       onChange={event => this.setState({openingPrivateSaleLDate: event.target.value})}
                                                                                       style={{
                                                                                           borderRadius: 0,
                                                                                           height: 45,
                                                                                           textAlign: "right",
                                                                                           color: "#000",
                                                                                           fontSize: 16
                                                                                       }}
                                                                                />
                                                                            </div>

                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <label className="mt-1">Bonus de vente privée</label>
                                                                <div className="form-row">
                                                                    <div className="col-12 col-md-2">
                                                                        <div className="input-group mb-2">
                                                                            <div className="input-group-prepend"
                                                                                 style={{width: "100%"}}>
                                                                                <div className="input-group-text"
                                                                                     style={{width: 100}}>
                                                                                    <input style={{height: 29}}
                                                                                           type="radio"
                                                                                           name="privateSaleBonusMode"
                                                                                           checked
                                                                                           id="privateSaleModeNone"/>
                                                                                    <span
                                                                                        style={{marginLeft: 8}}>None</span>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                    <div className="col-12 col-md-5">
                                                                        <div className="input-group mb-2">
                                                                            <div className="input-group-prepend">
                                                                                <div className="input-group-text"
                                                                                     style={{width: 100}}>
                                                                                    <input type="radio"
                                                                                           name="privateSaleBonusMode"
                                                                                           id="privateSaleModeUntil"/>
                                                                                    <span
                                                                                        style={{marginLeft: 8}}>Until</span>
                                                                                </div>
                                                                            </div>
                                                                            <input style={{borderRadius: 0, height: 45}}
                                                                                   type="date"
                                                                                   className="form-control text-center"/>
                                                                            <div className="input-group-append">
                                                                                <div className="input-group-text">
                                                                                    <i className="mdi mdi-calendar font-19"/>
                                                                                </div>
                                                                            </div>

                                                                        </div>
                                                                    </div>
                                                                    <div className="col-12 col-md-5">
                                                                        <div className="input-group mb-2">
                                                                            <div className="input-group-prepend">
                                                                                <div className="input-group-text"
                                                                                     style={{width: 100}}>
                                                                                    <input type="radio"
                                                                                           name="privateSaleBonusMode"
                                                                                           id="privateSaleModeupTo"/>
                                                                                    <span
                                                                                        style={{marginLeft: 8}}>Up to</span>
                                                                                </div>
                                                                            </div>
                                                                            <input style={{borderRadius: 0, height: 45}}
                                                                                   type="date"
                                                                                   className="form-control text-center"/>
                                                                            <div className="input-group-append">
                                                                                <span
                                                                                    className="input-group-text font-weight-bold"
                                                                                    id="basic-addon1">{this.state.tokenSymbol || "---"}</span>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div className="row mt-1">
                                                                    <div className="col-md-4"/>
                                                                    <div className="col-md-2">
                                                                        With +{this.state.privateSaleBonusPercent}%
                                                                        bonus
                                                                    </div>
                                                                    <div className="col-md-6">
                                                                        <InputRange
                                                                            formatLabel={value => ``}
                                                                            maxValue={100}
                                                                            minValue={0}
                                                                            step={1}
                                                                            value={this.state.privateSaleBonusPercent}
                                                                            onChange={value => this.setState({privateSaleBonusPercent: value})}/>
                                                                    </div>

                                                                </div>
                                                            </div>

                                                            <div style={{
                                                                border: "1px solid grey",
                                                                padding: 20,
                                                                marginTop: 25
                                                            }}>
                                                                <label>Ouvertures de vente publique</label>
                                                                <div className="form-row justify-content-center mt-1">
                                                                    <div className="col-12 col-md-8">
                                                                        <div className="text-center">
                                                                            <div className="input-group">
                                                                                <input className="form-control"
                                                                                       type="date"
                                                                                       value={this.state.openingPublicSaleFDate}
                                                                                       onChange={event => this.setState({openingPublicSaleFDate: event.target.value})}
                                                                                       style={{
                                                                                           borderRadius: 0,
                                                                                           height: 45,
                                                                                           textAlign: "right",
                                                                                           color: "#000",
                                                                                           fontSize: 16
                                                                                       }}
                                                                                />
                                                                                <div className="input-group-prepend">
                                                                                            <span
                                                                                                className="input-group-text font-weight-bold"
                                                                                                id="basic-addon1">
                                                                                                <i className="mdi mdi-calendar font-19"/>
                                                                                            </span>
                                                                                </div>
                                                                                <input className="form-control"
                                                                                       type="date"
                                                                                       value={this.state.openingPublicSaleLDate}
                                                                                       onChange={event => this.setState({openingPublicSaleLDate: event.target.value})}
                                                                                       style={{
                                                                                           borderRadius: 0,
                                                                                           height: 45,
                                                                                           textAlign: "right",
                                                                                           color: "#000",
                                                                                           fontSize: 16
                                                                                       }}
                                                                                />
                                                                            </div>

                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <label className="mt-1">Bonus de vente publique</label>
                                                                <div className="form-row">
                                                                    <div className="col-12 col-md-2">
                                                                        <div className="input-group mb-2">
                                                                            <div className="input-group-prepend"
                                                                                 style={{width: "100%"}}>
                                                                                <div className="input-group-text"
                                                                                     style={{width: 100}}>
                                                                                    <input style={{height: 29}}
                                                                                           type="radio"
                                                                                           name="publicSaleBonusMode"
                                                                                           checked
                                                                                           id="publicSaleModeNone"/>
                                                                                    <span
                                                                                        style={{marginLeft: 8}}>None</span>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                    <div className="col-12 col-md-5">
                                                                        <div className="input-group mb-2">
                                                                            <div className="input-group-prepend">
                                                                                <div className="input-group-text"
                                                                                     style={{width: 100}}>
                                                                                    <input type="radio"
                                                                                           name="publicSaleBonusMode"
                                                                                           id="publicSaleModeUntil"/>
                                                                                    <span
                                                                                        style={{marginLeft: 8}}>Until</span>
                                                                                </div>
                                                                            </div>
                                                                            <input style={{borderRadius: 0, height: 45}}
                                                                                   type="date"
                                                                                   className="form-control text-center"/>
                                                                            <div className="input-group-append">
                                                                                <div className="input-group-text">
                                                                                    <i className="mdi mdi-calendar font-19"/>
                                                                                </div>
                                                                            </div>

                                                                        </div>
                                                                    </div>
                                                                    <div className="col-12 col-md-5">
                                                                        <div className="input-group mb-2">
                                                                            <div className="input-group-prepend">
                                                                                <div className="input-group-text"
                                                                                     style={{width: 100}}>
                                                                                    <input type="radio"
                                                                                           name="publicSaleBonusMode"
                                                                                           id="publicSaleModeupTo"/>
                                                                                    <span
                                                                                        style={{marginLeft: 8}}>Up to</span>
                                                                                </div>
                                                                            </div>
                                                                            <input style={{borderRadius: 0, height: 45}}
                                                                                   type="date"
                                                                                   className="form-control text-center"/>
                                                                            <div className="input-group-append">
                                                                                <span
                                                                                    className="input-group-text font-weight-bold"
                                                                                    id="basic-addon1">{this.state.tokenSymbol || "---"}</span>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div className="row mt-1">
                                                                    <div className="col-md-4"/>
                                                                    <div className="col-md-2">
                                                                        With +{this.state.publicSaleBonusPercent}% bonus
                                                                    </div>
                                                                    <div className="col-md-6">
                                                                        <InputRange
                                                                            formatLabel={value => ``}
                                                                            maxValue={100}
                                                                            minValue={0}
                                                                            step={5}
                                                                            value={this.state.publicSaleBonusPercent}
                                                                            onChange={value => this.setState({publicSaleBonusPercent: value})}/>
                                                                    </div>

                                                                </div>
                                                            </div>

                                                            <div className="row mt-3">
                                                                <div className="col-md-12">
                                                                    <div className="form-group">
                                                                        <label>Période d'acquisition</label>
                                                                        <select className="form-control custom-select"
                                                                                style={{borderRadius: 0, height: 45}}
                                                                                value={this.state.vestingPeriod}
                                                                                onChange={event => this.setState({vestingPeriod: event.target.value})}>
                                                                            <option value="1m">1 mois</option>
                                                                            <option value="3m">3 mois</option>
                                                                            <option value="6m">6 mois</option>
                                                                            <option value="12m">12 mois</option>

                                                                        </select>

                                                                    </div>
                                                                </div>
                                                            </div>

                                                            <div className="row mt-4 mb-3">
                                                                <div className="col-md-12 text-center">
                                                                    &nbsp;&nbsp;
                                                                    <button className="btn btn-sm customBtnNext mb-3"
                                                                            onClick={() => this.setState({tokenModalStep: "minting"})}
                                                                            style={{backgroundColor: "#C0C0C0"}}>
                                                                                  <span style={{
                                                                                      color: "#fff",
                                                                                      fontFamily: "MyriadPro",
                                                                                      fontSize: "12pt"
                                                                                  }}>
                                                                                      Précédent
                                                                                  </span>
                                                                    </button>
                                                                    &nbsp;&nbsp;
                                                                    <button className="btn btn-sm customBtnNext mb-3"
                                                                            onClick={() => this.setState({tokenModalStep: "summary"})}
                                                                            style={{backgroundColor: "red"}}>
                                                                                  <span style={{
                                                                                      color: "#fff",
                                                                                      fontFamily: "MyriadPro",
                                                                                      fontSize: "12pt"
                                                                                  }}>
                                                                                       Suivant
                                                                                  </span>
                                                                    </button>
                                                                </div>
                                                            </div>
                                                        </div> :


                                                        this.state.tokenModalStep === "summary" ?
                                                            <div className="card-body">
                                                                <div className="card-widgets"/>

                                                                <table className="table table-sm table-borderless">
                                                                    <tbody>
                                                                    <tr>
                                                                        <th>Name</th>
                                                                        <td style={{fontWeight: 600}}>{this.state.tokenName} ({this.state.tokenSymbol})</td>
                                                                    </tr>
                                                                    <tr>
                                                                        <th>Type de Token</th>
                                                                        <td style={{fontWeight: 600}}>{this.state.tokenType}</td>
                                                                    </tr>
                                                                    <tr>
                                                                        <th>Noyau de conformité</th>
                                                                        <td style={{fontWeight: 600}}>{this.state.complianceCore} (<span
                                                                            style={{color: "red"}}>0xE9e1...D7D6</span>)
                                                                        </td>
                                                                    </tr>
                                                                    <tr>
                                                                        <th>Décimale</th>
                                                                        <td style={{fontWeight: 600}}>18</td>
                                                                    </tr>
                                                                    <tr>
                                                                        <th>La fourniture</th>
                                                                        <td style={{fontWeight: 600}}>{this.state.supply + " " + this.state.tokenSymbol}</td>
                                                                    </tr>
                                                                    <tr>
                                                                        <th>Prix de Token</th>
                                                                        <td style={{fontWeight: 600}}>{this.state.tokenPrice + " CHF"}</td>
                                                                    </tr>
                                                                    <tr>
                                                                        <th>Owner</th>
                                                                        <td style={{
                                                                            fontWeight: 600,
                                                                            color: "red"
                                                                        }}>0x1755...3622
                                                                        </td>
                                                                    </tr>
                                                                    <tr>
                                                                        <th>{this.state.tokenSymbol} Vault</th>
                                                                        <td style={{
                                                                            fontWeight: 600,
                                                                            color: "red"
                                                                        }}>0x1755...3622
                                                                        </td>
                                                                    </tr>
                                                                    <tr>
                                                                        <th>Fournisseur de tarifs</th>
                                                                        <td style={{fontWeight: 600}}>{this.state.complianceCore + " ("}
                                                                            <span
                                                                                style={{color: "red"}}>0x0C95...3fa0</span> )
                                                                        </td>
                                                                    </tr>
                                                                    <tr>
                                                                        <th>Réservée</th>
                                                                        <td style={{fontWeight: 600}}>{(parseInt(this.state.supply) * this.state.reservedTokenPercent) / 100 + " " + this.state.tokenSymbol}</td>
                                                                    </tr>
                                                                    <tr>
                                                                        <th>Offre de vente privée</th>
                                                                        <td style={{fontWeight: 600}}>{(parseInt(this.state.supply) * this.state.privateSaleTokenPercent) / 100 + " " + this.state.tokenSymbol}</td>
                                                                    </tr>
                                                                    <tr>
                                                                        <th>Ouvertures de vente privée</th>
                                                                        <td style={{fontWeight: 600}}>
                                                                            {moment(this.state.openingPrivateSaleFDate).format("DD/MM/YYYY") + " à " +
                                                                            moment(this.state.openingPrivateSaleLDate).format("DD/MM/YYYY")}
                                                                        </td>
                                                                    </tr>
                                                                    <tr>
                                                                        <th>Bonus de vente privée</th>
                                                                        <td style={{fontWeight: 600}}>N/A</td>
                                                                    </tr>

                                                                    <tr>
                                                                        <th>Offre de vente publique</th>
                                                                        <td style={{fontWeight: 600}}>{(parseInt(this.state.supply) * this.state.publicSaleTokenPercent) / 100 + " " + this.state.tokenSymbol}</td>
                                                                    </tr>
                                                                    <tr>
                                                                        <th>Ouvertures de vente publique</th>
                                                                        <td style={{fontWeight: 600}}>
                                                                            {moment(this.state.openingPublicSaleFDate).format("DD/MM/YYYY") + " à " +
                                                                            moment(this.state.openingPublicSaleLDate).format("DD/MM/YYYY")}
                                                                        </td>
                                                                    </tr>
                                                                    <tr>
                                                                        <th>Bonus de vente publique</th>
                                                                        <td style={{fontWeight: 600}}>N/A</td>
                                                                    </tr>
                                                                    <tr>
                                                                        <th>Non alloué</th>
                                                                        <td style={{fontWeight: 600}}>{(parseInt(this.state.supply) * this.state.notAllocatedTokenPercent) / 100 + " " + this.state.tokenSymbol}</td>
                                                                    </tr>
                                                                    <tr>
                                                                        <th>Période d'acquisition</th>
                                                                        <td style={{fontWeight: 600}}>
                                                                            Verrouillé jusqu'à {
                                                                            this.state.vestingPeriod === "1m" ? moment().add(1, "month").format("DD/MM/YYYY") :
                                                                                this.state.vestingPeriod === "3m" ? moment().add(3, "month").format("DD/MM/YYYY") :
                                                                                    this.state.vestingPeriod === "6m" ? moment().add(6, "month").format("DD/MM/YYYY") :
                                                                                        this.state.vestingPeriod === "12m" ? moment().add(1, "year").format("DD/MM/YYYY") : ""
                                                                        } </td>
                                                                    </tr>

                                                                    </tbody>

                                                                </table>

                                                                <div className="row mt-4 mb-3">
                                                                    <div className="col-md-12 text-center">
                                                                        &nbsp;&nbsp;
                                                                        <button
                                                                            className="btn btn-sm customBtnNext mb-3"
                                                                            onClick={() => this.setState({tokenModalStep: "sale"})}
                                                                            style={{backgroundColor: "#C0C0C0"}}>
                                                                                  <span style={{
                                                                                      color: "#fff",
                                                                                      fontFamily: "MyriadPro",
                                                                                      fontSize: "12pt"
                                                                                  }}>
                                                                                      Précédent
                                                                                  </span>
                                                                        </button>
                                                                        &nbsp;&nbsp;
                                                                        <button
                                                                            className="btn btn-sm customBtnNext mb-3"
                                                                            onClick={() => {
                                                                                this.setState({
                                                                                    loadingTokenCreation: true,
                                                                                    tokenModalStep: "succes"
                                                                                })
                                                                                let actios = this.state.entreprise.sAssociate || [];
                                                                                actios.map((item,key) => {
                                                                                    ELayerService.createWallet().then( res => {
                                                                                        //console.log(res);
                                                                                        ELayerService.addFund({amount:parseInt(item.nbActions)},res.data.address).then( res2 => {
                                                                                            //console.log(res2);
                                                                                            if(res.status === 200){
                                                                                                firebase.database().ref("/society/"+localStorage.getItem("uid")+"Suisse/sAssociate/"+key).update({
                                                                                                    'wallets':[{adress:res.data.address,created_at:new Date(),
                                                                                                        name:this.state.EmissionTitre.name,symbol:this.state.tokenSymbol,
                                                                                                        transactions:[{transact:res2.data.transact,created_at:new Date(),nbTokens:parseInt(item.nbActions)}]}]
                                                                                                })
                                                                                            }
                                                                                        }).catch( err => console.log(err))

                                                                                    }).catch( err => console.log(err))
                                                                                    setTimeout(() => {
                                                                                        this.setState({
                                                                                            loadingTokenCreation: false
                                                                                        })
                                                                                    },20000)
                                                                                })
                                                                            }}
                                                                            style={{backgroundColor: "red"}}>
                                                                                  <span style={{
                                                                                      color: "#fff",
                                                                                      fontFamily: "MyriadPro",
                                                                                      fontSize: "12pt"
                                                                                  }}>
                                                                                       Déployer
                                                                                  </span>
                                                                        </button>
                                                                    </div>
                                                                </div>
                                                            </div> :

                                                            this.state.tokenModalStep === "succes" ?
                                                                <div>
                                                                    <div className="card-body">
                                                                        <div className="card-widgets"/>
                                                                        <div className="row">
                                                                            {this.state.loadingTokenCreation &&
                                                                            <Loader/>}
                                                                            <div className="col-md-12">
                                                                                <h5 style={{
                                                                                    color: "red",
                                                                                    fontWeight: "bold"
                                                                                }}>Wallets</h5>
                                                                                {
                                                                                    (this.state.entreprise.sAssociate || []).map((item, key) =>
                                                                                            <div>
                                                                                                <h5>Création du wallet
                                                                                                    pour {item.ej_name === "" ? item.firstname + " " + item.lastname : item.ej_name} : </h5><br/>
                                                                                                <table
                                                                                                    className="table table-sm table-borderless">
                                                                                                    <tbody>
                                                                                                    <tr>
                                                                                                        <th style={{color:"#000"}}>Wallet Adress</th>
                                                                                                        <th style={{color:"#000"}}>Name</th>
                                                                                                        <th style={{color:"#000"}}>Symbol</th>
                                                                                                    </tr>
                                                                                                    {
                                                                                                        (item.wallets || []).map((wallet, index) =>

                                                                                                            <tr>
                                                                                                                <td style={{fontWeight: 600}}>{wallet.adress ? wallet.adress : "traitement..."}</td>
                                                                                                                <td style={{fontWeight: 600}}>{wallet.name ? wallet.name : "traitement..."}</td>
                                                                                                                <td style={{fontWeight: 600}}>{wallet.symbol ? wallet.symbol : "traitement"}</td>
                                                                                                            </tr>
                                                                                                        )}
                                                                                                    </tbody>
                                                                                                </table>
                                                                                            </div>
                                                                                    )
                                                                                }
                                                                                <h4 style={{
                                                                                    color: "red",
                                                                                    fontWeight: "bold"}}>Attribution des tokens</h4>
                                                                                <div>
                                                                                    <table
                                                                                        className="table table-sm table-borderless">
                                                                                        <tbody>
                                                                                        <tr>
                                                                                            <th style={{color:"#000"}}>wallet</th>
                                                                                            <th style={{color:"#000"}}>Transaction Hash</th>
                                                                                            <th style={{color:"#000"}}>Nb tokens</th>
                                                                                        </tr>
                                                                                        {
                                                                                            (this.state.entreprise.sAssociate || []).map((item, key) =>
                                                                                                (item.wallets || []).map((wallet,key) => (
                                                                                                    (wallet.transactions || []).map((tran,key) => (
                                                                                                        <tr>
                                                                                                            <td style={{fontWeight: 600}}>{wallet.adress ? wallet.adress : "traitement..."}</td>
                                                                                                            <td style={{fontWeight: 600}}>{tran.transact ? tran.transact : "traitement..."}</td>
                                                                                                            <td style={{fontWeight: 600}}>{tran.nbTokens ? tran.nbTokens : "traitement"} +{" tokens"}</td>
                                                                                                        </tr>
                                                                                                    ))
                                                                                                ))
                                                                                            )}
                                                                                        </tbody>
                                                                                    </table>
                                                                                </div>

                                                                            </div>
                                                                        </div>
                                                                    </div>

                                                                    <div className="row mt-4">
                                                                        <div className="col-md-12 text-center">
                                                                            <button
                                                                                className="btn btn-sm customBtnNext mb-3"
                                                                                onClick={() => this.setState({openWizardTokenModal: false})}
                                                                                style={{backgroundColor: "red"}}>
                                                                                  <span style={{
                                                                                      color: "#fff",
                                                                                      fontFamily: "MyriadPro",
                                                                                      fontSize: "12pt"
                                                                                  }}>
                                                                                       Terminer
                                                                                  </span>
                                                                            </button>
                                                                        </div>
                                                                    </div>

                                                                </div>
                                                                : ""
                                        }

                                    </div>
                                </div>
                            </div>
                        </DialogContent>
                    </Dialog>


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

export default EmpUtilityToken;