import React from "react";
import {Progress} from 'semantic-ui-react'
import {AvFeedback, AvForm, AvGroup, AvInput} from "availity-reactstrap-validation";
import {RadioGroup, Radio, ALIGN} from "baseui/radio";
import {Button as BtnU, KIND} from "baseui/button";
import {FormGroup, Label, Button, ModalHeader, ModalBody, Modal} from "reactstrap";
import dom from "../../assets/images/domiciliation.PNG"
import Data from "../../data/Data";
import PhoneInput from "react-phone-input-2";
import 'react-phone-input-2/lib/style.css'
import DeleteIcon from '@material-ui/icons/Delete';
import {IconButton} from "@material-ui/core";
import {Dropdown, Input} from 'semantic-ui-react'
import utilFunctions from "../../tools/functions";
import Alert from "@material-ui/lab/Alert";
import Snackbar from "@material-ui/core/Snackbar";
import moment from "moment";
import DocGenerationService from "../../provider/DocGenerationService";
import PDFViewer from "../../customComponents/pdf-viewer-reactjs";
import rethink from "../../controller/rethink";
import NewSocietyTopBar from "../../components/TopBar/NewSocietyTopBar";
import MuiBackdrop from "../../components/Loading/MuiBackdrop";
import SmartService from "../../provider/SmartService";
import maillingService from "../../provider/EmailService";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import Dialog from "@material-ui/core/Dialog";
import DialogContentText from "@material-ui/core/DialogContentText";
import InputRange from 'react-input-range';
import "../../assets/css/customInputRange.css"
import PopupDate from "../../components/PopupDate";
import Loader from "../../components/Loader";
import tokenizationService from "../../provider/tokenizationService";

const ent_ndd = process.env.REACT_APP_ENT_NDD;
const db_name = process.env.REACT_APP_RETHINKDB_BEGIN_NAME;
const ged_id = process.env.REACT_APP_GED_ID;


export default class SARLCreation extends React.Component {

    componentDidMount() {
        console.log("SARLCreation")
        console.log(this.props.location.state.ged)
    }

    state = {
        loading: false,
        openAlert: false,
        alertMessage: "",
        alertType: "",

        showPDFModal: false,
        pdfURL: '',

        step_percent: 10,
        activeStep: "sarl_name",
        sarl_name: "",
        sarl_type: "",
        sarl_pays: "",
        sarl_but: "",
        sarl_mission: "...",
        sarl_siege: {
            adress: "",
            codePostal: "",
            ville: ""
        },
        sarl_verif_name_existence: "true",
        sarl_domiciliation_smartco: "false",
        sarl_domiciliation_enfin: "",
        sarl_is_pLocaux: "true",
        sarl_capital: {
            totalCapital: '1000',
            valeurAction: '1'
        },
        sarl_get_iban: "false",
        sarl_apports_nature: "false",
        gerants: [{
            id: utilFunctions.getUID(),
            email: '',
            pwd: Math.random().toString(36).substr(2, 5),
            phone: '',
            civility: 'M.',
            firstname: '',
            lastname: '',
            adress: '',
            postalCode: '',
            pays: 'France',
            ville: '',
            birthday: '',
            nationality: 'française',
            origine: "",
            identityCardNum: '',
            identityCardDate: '',
            passeportNum: '',
            passeportDate: '',
            is_assoc_tmp: ''
        }],
        associes: [{
            id: utilFunctions.getUID(),
            email: '',
            pwd: Math.random().toString(36).substr(2, 5),
            phone: '',
            type: 'Un particulier',
            civility: 'M.',
            firstname: '',
            lastname: '',
            adress: '',
            postalCode: '',
            pays: 'France',
            ville: '',
            birthday: '',
            nationality: 'française',
            origine: '',
            isAdministrator: 'false',
            nbActions: '',
            representant: {
                rep_firstname: '',
                rep_lastname: '',
            },
            ej_name: '',
            formeSocial: 'SARL',
            typeTmp: 'Un particulier',
            identityCardNum: '',
            identityCardDate: '',
            passeportNum: '',
            passeportDate: '',
            immatriculation: '',
            numSiret: '',
            capitalSocial: '',
            capitalSocialCurrency: 'TND'
        }],
        expertSmartCo: {
            etat: 'false',
            offreDeBase: 'false',
            abERP: 'false',
            configurationERP: 'false',
            formationERP: 'false',
            helpdesk: 'false',
            siteEcommerce: 'false',
            configSite: 'false',
            formationSite: 'false',
            helpdeskSite: 'false'

        },
        ged: this.props.location.state.ged,


        openWizardTokenModal: false,
        tokenModalStep: "details",
        tokenName: "Tezos",
        tokenSymbol: "XTZ",
        tokenType: "SecurityToken",
        complianceCore: "Tezos(XTZ)",
        decimal: "18",
        supply: "",
        tokenPrice: "2.68",
        owner: "0x17551c150c0a846c078bb617da4eaba051d33622",
        vault: "",
        ratesProvider: "",

        ownerWallet: "tz1Sb8Q9k4X2y419G76ymQryxHTjPCxR5UfR",
        reservedToken: "",
        privateSaleToken: "",
        publicSaleToken: "",
        notAllocatedToken: "",

        reservedTokenPercent: 0,
        privateSaleTokenPercent: 100,
        publicSaleTokenPercent: 0,
        notAllocatedTokenPercent: 0,

        privateSaleBonusPercent: 0,
        publicSaleBonusPercent: 0,

        openingPrivateSaleFDate: new Date(),
        openingPrivateSaleLDate: new Date(),

        openingPublicSaleFDate: new Date(),
        openingPublicSaleLDate: new Date(),

        vestingPeriod: "6m",
        imageFondUrl: "",
        issuanceProjects: [],
        tokenizationResult: "",
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

    showDocInPdfModal = (url) => {
        this.setState({
            showPDFModal: true,
            pdfURL: url
        });
    };


    save_Step = (event, values) => {
        console.log(values.step)
        let step = this.state.step_percent;
        if (values.step === "sarl_assoc") window.scrollTo(0, 0)
        this.setState({
            activeStep: values.step === "sarl_name" ? "sarl_but" :
                values.step === "sarl_but" ? "sarl_siege" :
                    values.step === "sarl_siege" ? "sarl_capital" :
                        values.step === "sarl_capital" ? "sarl_tokenization" :
                            values.step === "sarl_tokenization" ? "sarl_assoc" :
                                values.step === "sarl_assoc" ? "sarl_gerants" :
                                    values.step === "sarl_gerants" ? "sarl_expert" :
                                        values.step === "sarl_expert" ? "sarl_expert1/3" :
                                            values.step === "sarl_expert1/3" ? "sarl_expert2/3" :
                                                values.step === "sarl_expert2/3" ? "sarl_expert3/3" : "",
            step_percent: step + 15
        })
    };

    handleObjectChange = (object, name) => event => {
        let objCopy = this.state[object];
        objCopy[name] = event.target.value;
        this.setState({
            [object]: objCopy
        });
    };

    handleTypeTmpChange = (key, value) => {
        let actiosCopy = this.state.associes;
        actiosCopy[key].typeTmp = value;
        this.setState({associes: actiosCopy})
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

    handleOnChangePhone = (value, key, type) => {
        if (type === "gerant") {
            let objCopy = this.state.gerants;
            objCopy[key].phone = value;
            this.setState({gerants: objCopy});
        } else {
            let objCopy = this.state.associes;
            objCopy[key].phone = value;
            this.setState({associes: objCopy});
        }
    };

    handleArrayObjectChange = (array, key, name) => event => {
        let objCopy = this.state[array];
        objCopy[key][name] = event.target.value;
        this.setState({[array]: objCopy})
    }

    addNewAssocie = () => {
        let objCopy = this.state.associes;
        objCopy.push(
            {
                id: utilFunctions.getUID(),
                email: '',
                pwd: Math.random().toString(36).substr(2, 5),
                phone: '',
                type: 'Un particulier',
                civility: 'M.',
                firstname: '',
                lastname: '',
                adress: '',
                postalCode: '',
                pays: 'France',
                ville: '',
                birthday: '',
                nationality: 'française',
                origine: "",
                isAdministrator: 'false',
                nbActions: '',
                representant: {
                    rep_firstname: '',
                    rep_lastname: '',
                },
                ej_name: '',
                formeSocial: 'SARL',
                typeTmp: 'Un particulier',
                walletAdr: "",
                identityCardNum: '',
                identityCardDate: '',
                passeportNum: '',
                passeportDate: '',
                immatriculation: '',
                numSiret: '',
                capitalSocial: '',
                capitalSocialCurrency: 'TND'
            }
        );
        this.setState({associes: objCopy})
    };

    addNewGerant = () => {
        let objCopy = this.state.gerants;
        objCopy.push(
            {
                id: utilFunctions.getUID(),
                email: '',
                pwd: Math.random().toString(36).substr(2, 5),
                phone: '',
                civility: 'M.',
                firstname: '',
                lastname: '',
                adress: '',
                postalCode: '',
                pays: 'France',
                ville: '',
                birthday: '',
                nationality: 'française',
                origine: "",
                identityCardNum: '',
                identityCardDate: '',
                passeportNum: '',
                passeportDate: '',
                is_assoc_tmp: ''
            }
        );
        this.setState({gerants: objCopy})
    }

    beforeCreateSociety() {

        let associesPhy = this.state.associes.filter(x => x.typeTmp === "Un particulier")
        let associesMorales = this.state.associes.filter(x => x.typeTmp !== "Un particulier")
        let totalActions = (parseFloat(this.state.sarl_capital.totalCapital) / parseFloat(this.state.sarl_capital.valeurAction));
        let valeurAction = this.state.sarl_capital.valeurAction;
        let apports = [];
        let actions = [];
        let assocPhy = [];
        let assocMora = [];
        let signers = [];

        associesPhy.map((assoc, i) => {
            let assocFname = assoc.firstname + " " + assoc.lastname
            let assocDesc = assoc.civility + " " + assocFname
            let identite = assoc.nationality === "tunisienne" ? "Carte d'identité N°" + assoc.identityCardNum + " délivré le " + moment(assoc.identityCardDate).format("DD/MM/YYYY") :
                "Passeport n°" + assoc.passeportNum + " délivré le " + moment(assoc.passeportDate).format("DD/MM/YYYY")
            apports.push({
                number: i + 1,
                assocDesc: assocDesc,
                somme: parseInt(assoc.nbActions) * valeurAction
            })
            actions.push({
                number: i + 1,
                nbActions: assoc.nbActions,
                assocDesc: assocDesc,
                somme: parseInt(assoc.nbActions) * valeurAction,
                valeurAction: valeurAction,
                pourcentCapital: (parseInt(assoc.nbActions) / totalActions) * 100
            })
            assocPhy.push({
                number: i + 1,
                civilite: assoc.civility,
                fname: assocFname,
                nationalite: assoc.nationality,
                datenaiss: moment(assoc.birthday).format("DD/MM/YYYY"),
                identite: identite,
                pays: assoc.pays,
                resident: assoc.adress + ", " + assoc.ville + " " + assoc.postalCode + " " + assoc.pays
            })
            let signer_desc = assocDesc + ", Associé"
            let isPresident = (this.state.gerants || []).find(x => x.email === assoc.email)
            if (isPresident && isPresident.id) {
                signer_desc = signer_desc + ", Président"
            }
            signers.push({
                fname: assocFname,
                identity: assoc.nationality === "tunisienne" ? "Carte d'identité N°" + assoc.identityCardNum : "Passeport N°" + assoc.passeportNum,
                signer_desc: signer_desc,
            })
        })

        associesMorales.map((assoc, j) => {
            apports.push({
                number: associesPhy.length + j + 1,
                assocDesc: "La société " + assoc.ej_name,
                somme: parseInt(assoc.nbActions) * valeurAction
            })
            actions.push({
                number: associesPhy.length + j + 1,
                nbActions: assoc.nbActions,
                assocDesc: "La société " + assoc.ej_name,
                somme: parseInt(assoc.nbActions) * valeurAction,
                valeurAction: valeurAction,
                pourcentCapital: (parseInt(assoc.nbActions) / totalActions) * 100
            })
            let signer_desc = "La société " + assoc.ej_name + ", Associé"
            assocMora.push({
                number: associesPhy.length + j + 1,
                sname: assoc.ej_name + (assoc.numSiret !== "" ? ", N°SIRET " + assoc.numSiret : "") +
                    (assoc.immatriculation !== "" ? ", Immatriculation " + assoc.immatriculation : ""),
                stype: assoc.formeSocial,
                scapital: assoc.capitalSocial,
                scurrency: assoc.capitalSocialCurrency,
                ssiege: assoc.adress + ", " + assoc.ville + ", " + assoc.postalCode + " " + assoc.pays,
                snationalite: assoc.pays === "Tunisia" ? "tunisienne" : assoc.pays === "France" ? "française" : assoc.pays === "Switzerland" ? "suisse" : assoc.pays,
                srepname: assoc.representant.rep_firstname + " " + assoc.representant.rep_lastname,
                signer_desc: signer_desc,
            })
            signers.push({
                fname: "La société " + assoc.ej_name,
                identity: "Présenté par son gérant " + assoc.representant.rep_firstname + " " + assoc.representant.rep_lastname
            })
        })

        let newSocietyData = {
            "data": {
                name: this.state.sarl_name,
                capital: this.state.sarl_capital.totalCapital,
                nbActions: totalActions,
                valeurAction: valeurAction,
                siege: this.state.sarl_siege.adress + ", " + this.state.sarl_siege.ville + ", " + this.state.sarl_siege.codePostal + " " + this.state.sarl_pays,
                object_social: this.state.sarl_but,
                created_at: moment().format("DD/MM/YYYY"),
                gerant_fname: this.state.gerants[0].firstname + " " + this.state.gerants[0].lastname,
                gerant_nationalite: this.state.gerants[0].nationality,
                gerant_datnaiss: moment(this.state.gerants[0].birthday).format("DD/MM/YYYY"),
                gerant_CIN: this.state.gerants[0].identityCardNum,
                gerant_CIN_date: this.state.gerants[0].identityCardDate,
                apports: apports,
                actions: actions,
                associesPhy: assocPhy,
                associesMorales: assocMora,
                signers: signers
            }
        }

        return new Promise(async (resolve, reject) => {

            let genRes = this.state.sarl_pays === "France" ? await DocGenerationService.generate_FR_SAS_Statut(newSocietyData) :
                await DocGenerationService.generate_TN_SARL_Statut(newSocietyData)
            if (genRes && genRes.data) {
                let find_society_folder = this.state.ged.find(x => x.name === "SOCIETES")
                if (find_society_folder) {

                    SmartService.addFolder({
                        name: this.state.sarl_name, folder_id: find_society_folder.id,
                    }, localStorage.getItem('token'), localStorage.getItem('usrtoken')).then(addFolderSnameRes => {

                        if (addFolderSnameRes.succes === true && addFolderSnameRes.status === 200) {

                            SmartService.addFileFromBas64({b64file: genRes.data, folder_id: addFolderSnameRes.data.id},
                                localStorage.getItem("token"), localStorage.getItem("usrtoken")).then(addB64Res => {
                                console.log(addB64Res)
                                if (addB64Res.succes === true && addB64Res.status === 200) {

                                    SmartService.updateFileName({name: "Statut_" + moment().format('DD-MM-YYYY')},
                                        addB64Res.data.file_id, localStorage.getItem("token"), localStorage.getItem("usrtoken")).then(updateRes => {
                                        console.log(updateRes)
                                        if (updateRes.succes === true && updateRes.status === 200) {
                                            resolve({
                                                folder_id: addFolderSnameRes.data.id,
                                                statut_id: addB64Res.data.file_id,
                                                b64:genRes.data
                                            })
                                        } else {
                                            reject({err: updateRes.error})
                                        }
                                    }).catch(err => {
                                        console.log(err)
                                        reject({err: "Une erreur est survenue !"})
                                    })
                                } else {
                                    reject({err: addB64Res.error})
                                }
                            }).catch(err => {
                                console.log(err)
                                reject({err: "Une erreur est survenue !"})
                            })

                        } else {
                            console.log(addFolderSnameRes.error)
                            reject({err: addFolderSnameRes.error})
                        }

                    }).catch(err => {
                        console.log(err)
                        reject({err: "Une erreur est survenue !"})
                    })

                }
                else {
                    SmartService.addFolder({
                        name: "SOCIETES", folder_id: null,
                    }, localStorage.getItem('token'), localStorage.getItem('usrtoken')).then(addFolderSocietyRes => {

                        if (addFolderSocietyRes.succes === true && addFolderSocietyRes.status === 200) {

                            SmartService.addFolder({
                                name: this.state.sarl_name, folder_id: addFolderSocietyRes.data.id,
                            }, localStorage.getItem('token'), localStorage.getItem('usrtoken')).then(addFolderSnameRes => {

                                if (addFolderSnameRes.succes === true && addFolderSnameRes.status === 200) {

                                    SmartService.addFileFromBas64({
                                            b64file: genRes.data,
                                            folder_id: addFolderSnameRes.data.id
                                        },
                                        localStorage.getItem("token"), localStorage.getItem("usrtoken")).then(addB64Res => {
                                        console.log(addB64Res)
                                        if (addB64Res.succes === true && addB64Res.status === 200) {

                                            SmartService.updateFileName({name: "Statut_" + moment().format('DD-MM-YYYY')},
                                                addB64Res.data.file_id, localStorage.getItem("token"), localStorage.getItem("usrtoken")).then(updateRes => {

                                                if (updateRes.succes === true && updateRes.status === 200) {
                                                    resolve({
                                                        folder_id: addFolderSnameRes.data.id,
                                                        statut_id: addB64Res.data.file_id
                                                    })
                                                } else {
                                                    reject({err: updateRes.error})
                                                }
                                            }).catch(err => {
                                                console.log(err)
                                                reject({err: "Une erreur est survenue !"})
                                            })
                                        } else {
                                            reject({err: addB64Res.error})
                                        }
                                    }).catch(err => {
                                        console.log(err)
                                        reject({err: "Une erreur est survenue !"})
                                    })

                                } else {
                                    console.log(addFolderSnameRes.error)
                                    reject({err: addFolderSnameRes.error})
                                }

                            }).catch(err => {
                                console.log(err)
                                reject({err: "Une erreur est survenue !"})
                            })

                        } else {
                            console.log(addFolderSocietyRes.error)
                            reject({err: addFolderSocietyRes.error})
                        }

                    }).catch(err => {
                        console.log(err)
                        reject({err: "Une erreur est survenue !"})
                    })
                }

            }
        })
    }

    saveDocs = (b64,name) => {

        return new Promise(async (resolve, reject) => {

            rethink.createTable(db_name, "documents", "test").then( verif => {
                let newItem = {
                    created_at:moment().format("YYYY-MM-DD HH:mm:ss"),
                    created_by:localStorage.getItem("email"),
                    b64:b64,
                    name:name,
                    uid:utilFunctions.getUID()
                }
                rethink.insert("test",'table("documents").insert('+ JSON.stringify(newItem) + ')',db_name,false).then( resAdd => {
                    if (resAdd && resAdd === true) {
                        resolve({uid:newItem.uid})
                    }else{
                        resolve(false)
                    }
                }).catch(err => {
                    console.log(err)
                    resolve(false)
                })
            }).catch(err => {
                console.log(err)
                resolve(false)
            })
        })
    }

    async createSociety() {
        this.setState({loading: true})

        let r = await this.beforeCreateSociety();
        console.log(r)

        if (r.err && r.err !== "") {
            this.setState({loading: false})
            this.openSnackbar("error", r.err)
        } else {
            let saveDocRes = await this.saveDocs(r.b64,"Statut"+moment().format("DD-MM-YYYY HH:mm"))
            rethink.createTable(db_name, "societies", "test").then( verif => {

                let newItem = {
                    uid: utilFunctions.getUID(),
                    created_at: moment().format("YYYY-MM-DD HH:mm:ss"),
                    created_by: localStorage.getItem("email"),
                    name: this.state.sarl_name,
                    type: this.state.sarl_type,
                    pays: this.state.sarl_pays,
                    but: this.state.sarl_but,
                    mission: this.state.sarl_mission,
                    siege: this.state.sarl_siege,
                    verif_name_existence: this.state.sarl_verif_name_existence,
                    domiciliation_smartco: this.state.sarl_domiciliation_smartco,
                    domiciliation_enfin: this.state.sarl_domiciliation_enfin,
                    is_pLocaux: this.state.sarl_is_pLocaux,
                    capital: this.state.sarl_capital,
                    get_iban: this.state.sarl_get_iban,
                    apports_nature: this.state.sarl_apports_nature,
                    gerants: this.state.gerants,
                    associes: this.state.associes,
                    expertise: this.state.expertSmartCo,
                    folder_id: r.folder_id,
                    statut_id: r.statut_id,
                    statut_rethink_uid:saveDocRes.uid
                }

                rethink.insert("test", 'table("societies").insert(' + JSON.stringify(newItem) + ')', db_name, false).then(resAdd => {
                    if (resAdd && resAdd === true) {

                        SmartService.share(newItem.statut_id, {
                            to: "sign@test.fr",
                            access: {administrate: true, share: true, edit: true, read: true}
                        }, localStorage.getItem('token'), localStorage.getItem('usrtoken')).then((shareRes) => {
                            if (shareRes.succes === true && shareRes.status === 200) {
                                console.log("Share to sign@test.fr OK")
                            } else {
                                console.log(shareRes.error)
                            }
                        }).catch(err => {
                            console.log(err)
                        })

                        let associes = this.state.associes || [];
                        associes.map(assoc => {
                            let rep_name = assoc.typeTmp === "Un particulier" ? (assoc.firstname + " " + assoc.lastname) : "monsieur le président de la société " + assoc.ej_name
                            maillingService.sendMailWithUrl({
                                "emailReciver": assoc.email,
                                "subject": "Signature du document <Statut> de la société " + this.state.sarl_name,
                                "linkUrl": "Signer le document",
                                "url": ent_ndd + "/signDoc/s/" + newItem.uid +
                                    "/actio/" + assoc.id + "/ged/" + ged_id + "/doc/" + newItem.statut_id,
                                "msg": "Bonjour Monsieur " + rep_name + ", <br/><br/> La création de la société " + this.state.sarl_name + " est effectuée le " + moment().format("DD-MM-YYYY") +
                                    ". <br/> Veuillez cliquer sur le lien ci-dessous pour ajouter votre signature.<br/> Votre mot de passe d'accès est: <b>" + assoc.pwd + "</b> <br/><br/> ",
                                "footerMsg": "<br/><br/> Cordialement"
                            }).then(ok => {
                                console.log("Email sended")
                            }).catch(err => {
                                console.log(err)
                            })
                            if (this.state.sarl_pays === "France") {

                                let totalActions = (parseFloat(this.state.sarl_capital.totalCapital) / parseFloat(this.state.sarl_capital.valeurAction));
                                DocGenerationService.generate_Tezos_assoc_allocation({
                                    "data": {
                                        assoc_name: rep_name,
                                        name: this.state.sarl_name,
                                        created_at: moment().format("DD-MM-YYYY"),
                                        siege: this.state.sarl_siege.adress + ", " + this.state.sarl_siege.ville + ", " + this.state.sarl_siege.codePostal + " " + this.state.sarl_pays,
                                        capital: this.state.sarl_capital.totalCapital,
                                        nbActions: totalActions,
                                        valeurAction: this.state.sarl_capital.valeurAction,
                                        assoc_actions: assoc.nbActions,
                                        wallet: "tz1Sb8Q9k4X2y419G76ymQryxHTjPCxR5UfR",
                                        contract: "5b711d1de9feae7ad77b38b18ad15e351ff37dfee00cbc2d50e2fa75a260178d"
                                    }
                                }).then(result => {
                                    console.log(result)
                                    maillingService.sendMailWithAttach({
                                        "emailReciver": assoc.email,
                                        "subject": "Allocation des tokens(Tezos) suite à la création de la société " + this.state.sarl_name,
                                        "msg": "Madame/Monsieur,<br/><br/>Suite à La création de la société <b>" + this.state.sarl_name + "</b> le " + moment().format("DD-MM-YYYY") + ", vous trouverez ci-joint le document d'allocation de vos actions en toekns(Tezos).",
                                        "footerMsg": "<br/><br/>Cordialement,<br/><br/><br/>Cordialement",
                                        "attach": [
                                            {
                                                filename: "Tezos_allocation_" + moment().format("DD-MM-YYYY") + ".pdf",
                                                path: "data:application/pdf;base64," + result.data
                                            }
                                        ]
                                    }).then(sendRes => {
                                        console.log(sendRes)
                                    })
                                }).catch(err => {
                                    console.log(err)
                                })
                            }
                        })
                        this.openSnackbar('success', "Félicitation ! La création de la nouvelle socété est effectuée avec succès");
                        setTimeout(() => {
                            this.setState({loading: false})
                            this.props.history.goBack()
                        }, 3000)
                    } else {
                        this.setState({loading: false})
                        this.openSnackbar("error", "Une erreur est survenue !")
                    }
                }).catch(err => {
                    this.setState({loading: false})
                    this.openSnackbar("error", "Une erreur est survenue !")
                    console.log(err)
                })

            }).catch(err => {
                console.log(err)
                this.setState({loading: false})
            })
        }
    }


    render() {

        let totalActions = (parseFloat(this.state.sarl_capital.totalCapital) / parseFloat(this.state.sarl_capital.valeurAction));
        let nbActionsAccordees = 0;
        let actionnaires = this.state.associes || [];
        actionnaires.map(act => {
            if (typeof parseInt(act.nbActions) === "number" && parseInt(act.nbActions) > 0) {
                let actio_actions = parseInt(act.nbActions) || 0
                nbActionsAccordees = nbActionsAccordees + actio_actions
            }
        })
        let nbActionsNonAccordees = totalActions - nbActionsAccordees;

        return (
            <div>
                <MuiBackdrop open={this.state.loading}/>
                <NewSocietyTopBar height={70} title={"Nouvelle SARL"}
                                  onBackBtnClick={() => this.props.history.goBack()}
                />
                <div className="container container-lg" style={{marginTop: 120}}>

                    <div className="creation_form">
                        <Progress percent={this.state.step_percent} indicating size="medium"
                                  className="custom-progress-height"/>
                        <div style={{padding: "40px 60px 90px 40px"}}>

                            {
                                this.state.activeStep === "sarl_name" &&
                                <AvForm onValidSubmit={this.save_Step}>
                                    <AvInput type="text" name="step" id="step" value="sarl_name"
                                             style={{visibility: "hidden", display: "none"}}/>
                                    <div className="row">
                                        <div className="col-lg-12">
                                            <AvGroup className="mb-3">
                                                <h4 className="mb-3">Quel est le nom de votre société ?</h4>
                                                <AvInput type="text" name="sName" id="sName"
                                                         placeholder="Le nom de votre Sàrl"
                                                         onChange={(e) => {
                                                             this.setState({sarl_name: e.target.value})
                                                         }}
                                                         value={this.state.sarl_name} required/>
                                                <AvFeedback>Ce champs est obligatoire</AvFeedback>
                                            </AvGroup>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-lg-6">
                                            <AvGroup className="mb-3">
                                                <Label for="pays">Type</Label>
                                                <AvInput type="select" name="soc_type" id="soc_type"
                                                         className="custom-select"
                                                         value={this.state.sarl_type}
                                                >
                                                    <option value={"SARL"}>SARL</option>
                                                    <option value={"SAS"}>SAS</option>
                                                </AvInput>
                                            </AvGroup>
                                        </div>
                                        <div className="col-lg-6">
                                            <AvGroup className="mb-3">
                                                <Label for="pays">Pays</Label>
                                                <AvInput type="select" name="soc_pays" id="soc_pays"
                                                         className="custom-select"
                                                         onChange={e => {this.setState({sarl_pays:e.target.value})}}
                                                         value={this.state.sarl_pays}
                                                >
                                                    <option value={"France"}>France</option>
                                                    <option value={"Switzerland"}>Suisse</option>
                                                    <option value={"Tunisia"}>Tunisie</option>
                                                </AvInput>
                                            </AvGroup>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-md-12">
                                            <h5>Avez vous au préalable vérifier l’existence du société au
                                                même nom dans le type d’activité que vous souhaitez cibler ?</h5>
                                            <div style={{marginLeft: 10, marginBottom: 20}}>
                                                <RadioGroup
                                                    value={this.state.sarl_verif_name_existence}
                                                    onChange={e => this.setState({sarl_verif_name_existence: e.target.value})}
                                                    name="number"
                                                    align={ALIGN.vertical}
                                                >
                                                    <Radio overrides={{
                                                        RadioMarkOuter: {
                                                            style: ({$theme}) => ({
                                                                backgroundColor: $theme.colors.negative300,
                                                            }),
                                                        },
                                                    }} value="true">Oui</Radio>
                                                    <Radio overrides={{
                                                        RadioMarkOuter: {
                                                            style: ({$theme}) => ({
                                                                backgroundColor: $theme.colors.negative300,
                                                            }),
                                                        },
                                                    }} value="false">Non</Radio>
                                                </RadioGroup>
                                            </div>

                                        </div>

                                    </div>

                                    <FormGroup style={{marginTop: 20}}>
                                        <div className="float-right">
                                            <BtnU overrides={{
                                                BaseButton: {
                                                    style: ({$theme}) => ({
                                                        backgroundColor: $theme.colors.negative,
                                                    }),
                                                },
                                            }}>Continuer</BtnU>
                                        </div>
                                    </FormGroup>

                                </AvForm>
                            }

                            {
                                this.state.activeStep === "sarl_but" &&
                                <AvForm onValidSubmit={this.save_Step}>
                                    <AvInput type="text" name="step" id="step" value="sarl_but"
                                             style={{visibility: "hidden", display: "none"}}/>
                                    <div className="row">
                                        <div className="col-lg-12">
                                            <AvGroup className="mb-3">
                                                <h4 className="mb-3">Décrivez le but social de votre société :</h4>
                                                <AvInput type="textarea" name="sBut" id="sBut" style={{height: 150}}
                                                         placeholder="Vous pouvez décrire votre activité principale. Il n’est pas forcément utile d’ajouter l’intégralité de vos activités.
                                                                        Vos statuts seront rédigés de sorte à vous permettre d’exercer des activités connexes.
                                                                        Vous pouvez faire appel à un avocat de SmartCo en cas de doute."
                                                         value={this.state.sarl_but}
                                                         onChange={(e) => {
                                                             this.setState({sarl_but: e.target.value})
                                                         }}
                                                         required/>
                                                <AvFeedback>Ce champs est obligatoire</AvFeedback>
                                            </AvGroup>
                                        </div>
                                    </div>

                                    <div className="row">
                                        <div className="col-lg-12">
                                            <AvGroup className="mb-3">
                                                <h4 className="mb-3">Mission de votre société( Maximum 6 mots )</h4>
                                                <AvInput type="text" name="sMission" id="sMission"
                                                         placeholder="( Maximum 6 mots )"
                                                         onChange={(e) => {
                                                             this.setState({sarl_mission: e.target.value})
                                                         }}
                                                         value={this.state.sarl_mission} required/>
                                                <AvFeedback>Ce champs est obligatoire</AvFeedback>
                                            </AvGroup>
                                        </div>
                                    </div>

                                    <FormGroup style={{marginTop: 20}}>
                                        <div className="float-left">
                                            <BtnU kind={KIND.secondary}
                                                  onClick={() => {
                                                      let current_step = this.state.step_percent
                                                      this.setState({
                                                          activeStep: "sarl_name",
                                                          step_percent: current_step - 15
                                                      })
                                                  }}>Précédent</BtnU>
                                        </div>
                                        <div className="float-right">
                                            <BtnU overrides={{
                                                BaseButton: {
                                                    style: ({$theme}) => ({
                                                        backgroundColor: $theme.colors.negative,
                                                    }),
                                                },
                                            }}>Continuer</BtnU>
                                        </div>
                                    </FormGroup>


                                </AvForm>
                            }

                            {
                                this.state.activeStep === "sarl_siege" &&
                                <AvForm onValidSubmit={this.save_Step}>
                                    <AvInput type="text" name="step" id="step" value="sarl_siege"
                                             style={{visibility: "hidden", display: "none"}}/>
                                    <div className="row" style={{marginTop: 25}}>
                                        <div className="col-lg-12">
                                            <h4 className="mb-3">Souhaitez-vous avoir une domiciliation via SmartCo ? </h4>
                                            <RadioGroup
                                                value={this.state.sarl_domiciliation_smartco}
                                                onChange={e => this.setState({sarl_domiciliation_smartco: e.target.value})}
                                                name="domsm"
                                                align={ALIGN.vertical}
                                            >
                                                <Radio overrides={{
                                                    RadioMarkOuter: {
                                                        style: ({$theme}) => ({
                                                            backgroundColor: $theme.colors.negative300,
                                                        }),
                                                    },
                                                }} value="true">Oui</Radio>
                                                <Radio overrides={{
                                                    RadioMarkOuter: {
                                                        style: ({$theme}) => ({
                                                            backgroundColor: $theme.colors.negative300,
                                                        }),
                                                    },
                                                }} value="false">Non</Radio>
                                            </RadioGroup>
                                        </div>
                                    </div>

                                    {
                                        this.state.sarl_domiciliation_smartco === "true" &&
                                        <div>
                                            <div style={{marginTop: 15}}>
                                                <text>
                                                    La domiciliation est alors la solution idéale pour
                                                    établir son siège social ou une ﬁliale en Suisse,
                                                    face à un marché immobilier très restreint. Faire
                                                    appel à une société de domiciliation d’entreprise en
                                                    Suisse est aussi le meilleur moyen d’établir sa
                                                    société dans une ville suisse ce qui contribuera à
                                                    améliorer l’image de marque de son entreprise.
                                                    Nous vous proposons une domiciliation soit dans le
                                                    canton de Genève, soit dans le canton de Vaud.
                                                </text>
                                            </div>
                                            <div style={{marginTop: 10}}>
                                                <text>
                                                    En Suisse, il est courant de faire appel à une
                                                    fiduciaire ( expert comptable ) pour constituer son
                                                    siège social ou sa société de patrimoine. C’est ce
                                                    que vous proposons via l’offre de notre partenaire
                                                    fiduciaire qui si vous la choisissez pourra non
                                                    seulement vous proposer une domiciliation à un tarif
                                                    avantageux

                                                </text>
                                            </div>
                                            <div style={{marginTop: "3%"}}>
                                                <h4>Est ce que l’adresse de domiciliation ci-dessous peux vous convenir
                                                    ? </h4>
                                            </div>

                                            <div className="row" style={{marginTop: 10}}>
                                                <img alt="" src={dom}
                                                     style={{width: 400, height: 100, objectFit: "contain"}}/>
                                                <div className="col" style={{marginTop: 20}}>
                                                    <div>Ch. de Montéclard 2A</div>
                                                    <div>1066 Epalinges</div>
                                                    <div>+41 21 623 00 23</div>
                                                    <div>+41 79 470 18 32</div>
                                                </div>
                                            </div>
                                            <RadioGroup
                                                value={this.state.sarl_domiciliation_enfin}
                                                onChange={e => this.setState({sarl_domiciliation_enfin: e.target.value})}
                                                name="domsm"
                                                align={ALIGN.vertical}
                                            >
                                                <Radio overrides={{
                                                    RadioMarkOuter: {
                                                        style: ({$theme}) => ({
                                                            backgroundColor: $theme.colors.negative300,
                                                        }),
                                                    },
                                                }} value="true">Oui</Radio>
                                                <Radio overrides={{
                                                    RadioMarkOuter: {
                                                        style: ({$theme}) => ({
                                                            backgroundColor: $theme.colors.negative300,
                                                        }),
                                                    },
                                                }} value="false">Non</Radio>
                                            </RadioGroup>
                                        </div>
                                    }

                                    {
                                        this.state.sarl_domiciliation_smartco === "false" &&
                                        <div>
                                            <h4 className="mb-3">Où est le siège de votre société ?</h4>
                                            <div className="row">
                                                <div className="col-lg-6">
                                                    <AvGroup className="mb-3">
                                                        <Label for="adress">Adresse</Label>
                                                        <AvInput type="text" name="sarl_adress" id="sarl_adress"
                                                                 onChange={this.handleObjectChange('sarl_siege', 'adress')}
                                                                 value={this.state.sarl_siege.adress} required/>
                                                        <AvFeedback>Ce champs est obligatoire</AvFeedback>
                                                    </AvGroup>
                                                </div>
                                                <div className="col-lg-6">
                                                    <AvGroup className="mb-3">
                                                        <Label for="postalcode">Code postal</Label>
                                                        <AvInput type="number" name="sarl_pcode"
                                                                 id="sarl_pcode"
                                                                 value={this.state.sarl_siege.codePostal}
                                                                 onChange={this.handleObjectChange('sarl_siege', 'codePostal')}
                                                                 required/>
                                                        <AvFeedback>Format invalide</AvFeedback>
                                                    </AvGroup>
                                                </div>
                                            </div>
                                            <div className="row">
                                                <div className="col-lg-6">
                                                    <AvGroup className="mb-3">
                                                        <Label for="ville">Ville</Label>
                                                        <AvInput type="text" name="sarl_ville" id="sarl_ville"
                                                                 value={this.state.sarl_siege.ville}
                                                                 onChange={this.handleObjectChange('sarl_siege', 'ville')}
                                                                 required/>
                                                        <AvFeedback>Ce champs est obligatoire</AvFeedback>
                                                    </AvGroup>
                                                </div>
                                                <div className="col-lg-6">
                                                    <AvGroup className="mb-3">
                                                        <Label for="pays">Pays</Label>
                                                        <AvInput type="select" name="sarl_pays" id="sarl_pays"
                                                                 className="custom-select"
                                                                 value={this.state.sarl_pays}
                                                                 disabled={true}
                                                        >
                                                            {
                                                                Data.contreyList.map((item, key) => (
                                                                    <option
                                                                        value={item.Name}>{item.Name}</option>
                                                                ))
                                                            }
                                                        </AvInput>
                                                    </AvGroup>
                                                </div>
                                            </div>
                                            <div className="row" style={{marginTop: 15}}>
                                                <div className="col-lg-12">
                                                    <h4 className="mb-3">Est-ce que ce sont vos propres locaux ? </h4>
                                                    <RadioGroup
                                                        value={this.state.sarl_is_pLocaux}
                                                        onChange={e => this.setState({sarl_is_pLocaux: e.target.value})}
                                                        name="domsm"
                                                        align={ALIGN.vertical}
                                                    >
                                                        <Radio overrides={{
                                                            RadioMarkOuter: {
                                                                style: ({$theme}) => ({
                                                                    backgroundColor: $theme.colors.negative300,
                                                                }),
                                                            },
                                                        }} value="true">Oui</Radio>
                                                        <Radio overrides={{
                                                            RadioMarkOuter: {
                                                                style: ({$theme}) => ({
                                                                    backgroundColor: $theme.colors.negative300,
                                                                }),
                                                            },
                                                        }} value="false">Non : Télécharger l’attestation de
                                                            domiciliation</Radio>
                                                    </RadioGroup>
                                                </div>
                                            </div>
                                        </div>
                                    }

                                    <FormGroup style={{marginTop: 20}}>
                                        <div className="float-left">
                                            <BtnU kind={KIND.secondary} onClick={() => {
                                                let current_step = this.state.step_percent
                                                this.setState({
                                                    activeStep: "sarl_but",
                                                    step_percent: current_step - 15
                                                })
                                            }}
                                            >Précédent</BtnU>
                                        </div>
                                        <div className="float-right">
                                            <BtnU overrides={{
                                                BaseButton: {
                                                    style: ({$theme}) => ({
                                                        backgroundColor: $theme.colors.negative,
                                                    }),
                                                },
                                            }}>Continuer</BtnU>
                                        </div>
                                    </FormGroup>
                                </AvForm>
                            }

                            {
                                this.state.activeStep === "sarl_capital" &&
                                <AvForm onValidSubmit={this.save_Step}>
                                    <AvInput type="text" name="step" id="step" value="sarl_capital"
                                             style={{visibility: "hidden", display: "none"}}/>
                                    <h4 className="mb-3">Quel est le capital social de votre société ?</h4>
                                    <div className="row">
                                        <div className="col-lg-6">
                                            <Label for="canton">Montant du capital libéré
                                                ({this.state.sarl_pays === "France" ? "€" : this.state.sarl_pays === "Switzerland" ? "CHF" : "TND"})</Label>
                                            <div className="radio radio-pink mb-2">
                                                <input type="radio" name="radiocapital"
                                                       id="radiocapital1"
                                                       checked={this.state.sarl_capital.totalCapital === '1000'}
                                                       style={{marginLeft: 10}} value={'1000'}
                                                       onClick={() => {
                                                           let capital = this.state.sarl_capital;
                                                           capital.totalCapital = "10000"
                                                           this.setState({sarl_capital: capital})
                                                       }}
                                                />
                                                <label htmlFor="radiocapital1">
                                                    {this.state.sarl_pays === "France" ? "€" : this.state.sarl_pays === "Switzerland" ? "CHF" : "TND"} 1'000.-
                                                </label>
                                            </div>

                                            <div className="radio radio-pink mb-2">
                                                <input type="radio" name="radiocapital"
                                                       id="radiocapita3"
                                                       checked={this.state.sarl_capital.totalCapital !== "1000"}
                                                       style={{marginLeft: 10}}
                                                       onClick={() => {
                                                           let capital = this.state.sarl_capital;
                                                           capital.totalCapital = "0"
                                                           this.setState({sarl_capital: capital})
                                                       }}
                                                />
                                                <label htmlFor="radiocapita3">
                                                    Plus (au choix, maximum 400'000.-)
                                                </label>
                                            </div>
                                            {
                                                this.state.sarl_capital.totalCapital !== "1000" &&
                                                <div className="form-group mb-2">
                                                    <input type="number" className="form-control"
                                                           id="nb"
                                                           style={{width: '60%', marginLeft: 30}}
                                                           value={this.state.sarl_capital.totalCapital}
                                                           onChange={this.handleObjectChange('sarl_capital', 'totalCapital')}
                                                    />
                                                    <h5 style={{color: "red", marginLeft: 35}}>
                                                        {
                                                            parseInt(this.state.sarl_capital.totalCapital) < 1000 ? ("Le capital doit etre supérieur ou égal à 5000") :
                                                                parseInt(this.state.sarl_capital.totalCapital) > 400000 ? ("Le capital doit etre inférieur à 400 000") :
                                                                    parseInt(this.state.sarl_capital.totalCapital) % 10 !== 0 ? "Le capital doit etre un multiple de 10" : ""
                                                        }
                                                    </h5>
                                                </div>
                                            }
                                        </div>

                                        <div className="col-lg-6">
                                            <Label for="canton">Valeur nominale des actions ?</Label>
                                            <input type="number" className="form-control"
                                                   id="valeurAction"
                                                   value={this.state.sarl_capital.valeurAction}
                                                   onChange={this.handleObjectChange('sarl_capital', 'valeurAction')}
                                            />
                                            {
                                                (parseInt(this.state.sarl_capital.totalCapital) >= 1000 && parseInt(this.state.sarl_capital.totalCapital) < 400000 &&
                                                    parseInt(this.state.sarl_capital.totalCapital) % 10 === 0) && parseFloat(this.state.sarl_capital.valeurAction) > 0 ?
                                                    <label htmlFor="valeurAction"
                                                           style={{fontWeight: "normal", color: "#000", marginTop: 10}}>
                                                        {parseFloat(this.state.sarl_capital.totalCapital) / parseFloat(this.state.sarl_capital.valeurAction)}&nbsp;
                                                        parts sociales d'une valeur nominale
                                                        de {this.state.sarl_capital.valeurAction} {this.state.sarl_pays === "France" ? "€" : this.state.sarl_pays === "Switzerland" ? "CHF" : "TND"}.-
                                                    </label> : null
                                            }

                                        </div>
                                    </div>

                                    <div className="row" style={{marginTop: 25}}>
                                        <div className="col-lg-12">
                                            <Label for="canton">Souhaitez-vous obtenir un numéro IBAN pour le compte de
                                                consignation via Smartco ?</Label>
                                            <RadioGroup
                                                value={this.state.sarl_get_iban}
                                                onChange={e => this.setState({sarl_get_iban: e.target.value})}
                                                name="number"
                                                align={ALIGN.vertical}
                                            >
                                                <Radio overrides={{
                                                    RadioMarkOuter: {
                                                        style: ({$theme}) => ({
                                                            backgroundColor: $theme.colors.negative300,
                                                        }),
                                                    },
                                                }} value="true">Oui</Radio>
                                                <Radio overrides={{
                                                    RadioMarkOuter: {
                                                        style: ({$theme}) => ({
                                                            backgroundColor: $theme.colors.negative300,
                                                        }),
                                                    },
                                                }} value="false">Non (Téléchargez l’attestation de consignation de votre
                                                    banque avec signature électronique qualifiée)</Radio>
                                            </RadioGroup>
                                        </div>
                                    </div>

                                    <div className="row" style={{marginTop: 25}}>
                                        <div className="col-lg-12">
                                            <Label for="canton">Souhaitez-vous faire des apports en nature ?</Label>
                                            <RadioGroup
                                                value={this.state.sarl_apports_nature}
                                                onChange={e => this.setState({sarl_apports_nature: e.target.value})}
                                                name="number"
                                                align={ALIGN.vertical}
                                            >
                                                <Radio overrides={{
                                                    RadioMarkOuter: {
                                                        style: ({$theme}) => ({
                                                            backgroundColor: $theme.colors.negative300,
                                                        }),
                                                    },
                                                }} value="true">Oui</Radio>
                                                <Radio overrides={{
                                                    RadioMarkOuter: {
                                                        style: ({$theme}) => ({
                                                            backgroundColor: $theme.colors.negative300,
                                                        }),
                                                    },
                                                }} value="false">Non (le plus fréquent)</Radio>
                                            </RadioGroup>
                                        </div>
                                    </div>

                                    <FormGroup style={{marginTop: 20}}>
                                        <div className="float-left">
                                            <BtnU kind={KIND.secondary} onClick={() => {
                                                let current_step = this.state.step_percent
                                                this.setState({
                                                    activeStep: "sarl_siege",
                                                    step_percent: current_step - 15
                                                })
                                            }}
                                            >Précédent</BtnU>
                                        </div>
                                        <div className="float-right">
                                            <BtnU overrides={{
                                                BaseButton: {
                                                    style: ({$theme}) => ({
                                                        backgroundColor: $theme.colors.negative,
                                                    }),
                                                },
                                            }}>Continuer</BtnU>
                                        </div>
                                    </FormGroup>
                                </AvForm>
                            }

                            {
                                this.state.activeStep === "sarl_tokenization" &&
                                <AvForm onValidSubmit={this.save_Step}>
                                    <AvInput type="text" name="step" id="step" value="sarl_tokenization"
                                             style={{visibility: "hidden", display: "none"}}/>
                                    <div className="row" style={{marginTop: 25}}>
                                        <div className="col-lg-12">
                                            <h4>Souhaitez-vous digitaliser vos actions ?</h4>
                                            <RadioGroup
                                                value={this.state.sarl_apports_nature}
                                                onChange={e => {
                                                    this.setState({sarl_apports_nature: e.target.value})
                                                    if (e.target.value === "true") {
                                                        this.setState({openWizardTokenModal: true})
                                                    }
                                                }}
                                                name="number"
                                                align={ALIGN.vertical}
                                            >
                                                <Radio overrides={{
                                                    RadioMarkOuter: {
                                                        style: ({$theme}) => ({
                                                            backgroundColor: $theme.colors.negative300,
                                                        }),
                                                    },
                                                }} value="true">Oui</Radio>
                                                <Radio overrides={{
                                                    RadioMarkOuter: {
                                                        style: ({$theme}) => ({
                                                            backgroundColor: $theme.colors.negative300,
                                                        }),
                                                    },
                                                }} value="false">Non</Radio>
                                            </RadioGroup>
                                        </div>
                                    </div>
                                    <FormGroup style={{marginTop: 20}}>
                                        <div className="float-left">
                                            <BtnU kind={KIND.secondary} onClick={() => {
                                                let current_step = this.state.step_percent
                                                this.setState({
                                                    activeStep: "sarl_capital",
                                                    step_percent: current_step - 15
                                                })
                                            }}
                                            >Précédent</BtnU>
                                        </div>
                                        <div className="float-right">
                                            <BtnU overrides={{
                                                BaseButton: {
                                                    style: ({$theme}) => ({
                                                        backgroundColor: $theme.colors.negative,
                                                    }),
                                                },
                                            }}>Continuer</BtnU>
                                        </div>
                                    </FormGroup>
                                </AvForm>
                            }
                            {
                                this.state.activeStep === "sarl_assoc" &&
                                <div className="col-sm-12">

                                    <h4 className="mb-3">Quel est (sont) l(les) associès de votre société ?</h4>
                                    <p>S’il y a plusieurs associès vous pouvez cliquer sur "Ajouter un autre associé" en
                                        bas de page. </p>

                                    <div className="row">
                                        <div className="col-lg-12">
                                            <AvForm onValidSubmit={(event, values) => {
                                                if (nbActionsAccordees > totalActions) {
                                                    this.openSnackbar("error", "Le nombre d'actions accordées est supérieur au nombre total d'actions !")
                                                } else if (nbActionsNonAccordees > 0) {
                                                    this.openSnackbar("warning", "Il reste " + nbActionsNonAccordees + " actions non encore accordées !")
                                                    this.save_Step(event, values)
                                                } else {
                                                    this.save_Step(event, values)
                                                }
                                            }}
                                            >
                                                <AvInput type="text" name="step" id="step" value="sarl_assoc"
                                                         style={{visibility: "hidden", display: "none"}}/>
                                                {
                                                    this.state.associes.map((item, key) => (
                                                        <div key={key} style={{
                                                            padding: 25,
                                                            backgroundColor: "#f0f0f0",
                                                            borderRadius: 7.5,
                                                            marginBottom: 20
                                                        }}
                                                        >
                                                            {
                                                                key > 0 &&
                                                                <div align="right"
                                                                     style={{marginTop: -20, marginRight: -15}}>
                                                                    <IconButton onClick={() => {
                                                                        let associes = this.state.associes || [];
                                                                        associes.splice(key, 1)
                                                                        this.setState({associes: associes})
                                                                    }}>
                                                                        <DeleteIcon color="error"/>
                                                                    </IconButton>
                                                                </div>
                                                            }

                                                            <div className="row">
                                                                <div className="col-lg-6">
                                                                    <AvGroup className="mb-3">
                                                                        <Label for="forme">L'associé est</Label>
                                                                        <AvInput type="select"
                                                                                 className="custom-select"
                                                                                 name={"formeMo" + key}
                                                                                 id={"formeMo" + key}
                                                                                 onChange={(event) => this.handleTypeTmpChange(key, event.target.value)}
                                                                                 value={this.state.associes[key].type}
                                                                        >
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
                                                                                         className="custom-select"
                                                                                         name={"civiliteMo" + key}
                                                                                         id={"civiliteMo" + key}
                                                                                         value={this.state.associes[key].gender}
                                                                                         onChange={this.handleArrayObjectChange("associes", key, "gender")}
                                                                                >
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
                                                                                         className="custom-select"
                                                                                         name={"formeSo" + key}
                                                                                         id={"formeSo" + key}
                                                                                         value={this.state.associes[key].formeSocial}
                                                                                         onChange={this.handleArrayObjectChange("associes", key, "formeSocial")}
                                                                                >
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
                                                                <div className="row">
                                                                    <div className="col-lg-6">
                                                                        <AvGroup className="mb-3">
                                                                            <Label for="prenom">Immatriculation</Label>
                                                                            <AvInput type="text"
                                                                                     name={"immatriculation" + key}
                                                                                     id={"immatriculation" + key}
                                                                                     value={this.state.associes[key].immatriculation}
                                                                                     onChange={this.handleArrayObjectChange("associes", key, "immatriculation")}
                                                                                     required/>
                                                                            <AvFeedback>Ce champs est
                                                                                obligatoire</AvFeedback>
                                                                        </AvGroup>
                                                                    </div>
                                                                    <div className="col-lg-6">
                                                                        <AvGroup className="mb-3">
                                                                            <Label for="prenom">Numéro
                                                                                Siret(France)</Label>
                                                                            <AvInput type="text"
                                                                                     name={"numSiret" + key}
                                                                                     id={"numSiret" + key}
                                                                                     value={this.state.associes[key].numSiret}
                                                                                     onChange={this.handleArrayObjectChange("associes", key, "numSiret")}
                                                                            />
                                                                            <AvFeedback>Ce champs est
                                                                                obligatoire</AvFeedback>
                                                                        </AvGroup>
                                                                    </div>
                                                                    <div className="col-lg-6 mb-3">
                                                                        <Label for="prenom">Capital social</Label>
                                                                        <Input
                                                                            className="custom-sui-input-size"
                                                                            size="small"
                                                                            label={
                                                                                <Dropdown defaultValue='TND' options={[
                                                                                    {
                                                                                        key: 'TND',
                                                                                        text: 'TND',
                                                                                        value: 'TND'
                                                                                    },
                                                                                    {
                                                                                        key: 'EURO',
                                                                                        text: 'EURO',
                                                                                        value: 'EURO'
                                                                                    },
                                                                                    {
                                                                                        key: 'CHF',
                                                                                        text: 'CHF',
                                                                                        value: 'CHF'
                                                                                    },
                                                                                ]}
                                                                                          value={this.state.associes[key].capitalSocialCurrency}
                                                                                          onChange={(event, data) => {
                                                                                              console.log(data.value)
                                                                                              let objCp = this.state.associes;
                                                                                              objCp[key].capitalSocialCurrency = data.value;
                                                                                              this.setState({associes: objCp})
                                                                                          }}
                                                                                />}
                                                                            labelPosition='right'
                                                                            value={this.state.associes[key].capitalSocial}
                                                                            onChange={(event, data) => {
                                                                                console.log(event.target.value)
                                                                                let objCp = this.state.associes;
                                                                                objCp[key].capitalSocial = event.target.value;
                                                                                this.setState({associes: objCp})
                                                                            }}
                                                                        />
                                                                    </div>
                                                                </div>
                                                            }
                                                            {
                                                                item.typeTmp !== "Un particulier" &&
                                                                <div className="row">
                                                                    <div className="col-lg-6">
                                                                        <AvGroup className="mb-3">
                                                                            <Label for="email">Nom du
                                                                                représentant</Label>
                                                                            <AvInput type="text"
                                                                                     name={"repnom" + key}
                                                                                     id={"repnom" + key}
                                                                                     value={this.state.associes[key].representant.rep_firstname}
                                                                                     onChange={event => {
                                                                                         let objCp = this.state.associes;
                                                                                         objCp[key].representant.rep_firstname = event.target.value;
                                                                                         this.setState({associes: objCp})
                                                                                     }}
                                                                                     required/>
                                                                            <AvFeedback>Ce champs est
                                                                                obligatoire</AvFeedback>
                                                                        </AvGroup>
                                                                    </div>
                                                                    <div className="col-lg-6">
                                                                        <AvGroup className="mb-3">
                                                                            <Label for="email">Prénom du
                                                                                représentant</Label>
                                                                            <AvInput type="text"
                                                                                     name={"repprenom" + key}
                                                                                     id={"repprenom" + key}
                                                                                     value={this.state.associes[key].representant.rep_lastname}
                                                                                     onChange={event => {
                                                                                         let objCp = this.state.associes;
                                                                                         objCp[key].representant.rep_lastname = event.target.value;
                                                                                         this.setState({associes: objCp})
                                                                                     }}
                                                                                     required/>
                                                                            <AvFeedback>Ce champs est
                                                                                obligatoire</AvFeedback>
                                                                        </AvGroup>
                                                                    </div>
                                                                </div>
                                                            }
                                                            <div className="row">
                                                                {
                                                                    item.typeTmp === "Un particulier" ?
                                                                        [
                                                                            <div className="col-lg-6">
                                                                                <AvGroup
                                                                                    className="mb-3">
                                                                                    <Label for="nom">Nom</Label>
                                                                                    <AvInput type="text"
                                                                                             name={"firstnameMo" + key}
                                                                                             id={"firstnameMo" + key}
                                                                                             value={this.state.associes[key].firstname}
                                                                                             onChange={this.handleArrayObjectChange("associes", key, "firstname")}
                                                                                             required/>
                                                                                    <AvFeedback>Ce champs est
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
                                                                                             value={this.state.associes[key].lastname}
                                                                                             onChange={this.handleArrayObjectChange("associes", key, "lastname")}
                                                                                             required/>
                                                                                    <AvFeedback>Ce champs est
                                                                                        obligatoire</AvFeedback>
                                                                                </AvGroup>
                                                                            </div>

                                                                        ] :

                                                                        <div className="col-lg-12">
                                                                            <AvGroup className="mb-3">
                                                                                <Label for="prenom">Nom de l'entité
                                                                                    juridique</Label>
                                                                                <AvInput type="text"
                                                                                         name={"ejname" + key}
                                                                                         id={"ejname" + key}
                                                                                         value={this.state.associes[key].ej_name}
                                                                                         onChange={this.handleArrayObjectChange("associes", key, "ej_name")}
                                                                                         required/>
                                                                                <AvFeedback>Ce champs est
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
                                                                                 value={this.state.associes[key].email}
                                                                                 onChange={this.handleArrayObjectChange("associes", key, "email")}
                                                                                 required/>
                                                                        <AvFeedback>Email invalide</AvFeedback>
                                                                    </AvGroup>
                                                                </div>
                                                                <div className="col-lg-6">
                                                                    <AvGroup className="mb-3">
                                                                        <Label for="password">Numéro de
                                                                            téléphone</Label>
                                                                        <PhoneInput
                                                                            country={'fr'}
                                                                            value={this.state.associes[key].phone}
                                                                            onChange={(value) => this.handleOnChangePhone(value, key, "associe")}
                                                                            inputStyle={{
                                                                                width: "inherit",
                                                                                height: 37
                                                                            }}/>
                                                                    </AvGroup>
                                                                </div>
                                                            </div>

                                                            {
                                                                item.typeTmp === "Un particulier" &&
                                                                [
                                                                    <div className="row">
                                                                        <div className="col-lg-6">
                                                                            <AvGroup className="mb-3">
                                                                                <Label for="datnaiss">Date de
                                                                                    naissance</Label>
                                                                                <AvInput type="date"
                                                                                         name={"birthdayMo" + key}
                                                                                         id={"birthdayMo" + key}
                                                                                         value={this.state.associes[key].birthday}
                                                                                         onChange={this.handleArrayObjectChange("associes", key, "birthday")}
                                                                                         required/>
                                                                                <AvFeedback>Date invalide</AvFeedback>
                                                                            </AvGroup>
                                                                        </div>
                                                                        <div className="col-lg-6">
                                                                            <AvGroup className="mb-3">
                                                                                <Label
                                                                                    for="nationality">Nationnalité</Label>
                                                                                <AvInput type="select"
                                                                                         style={{textTransform: "capitalize"}}
                                                                                         className="custom-select"
                                                                                         name={"nationalityMo" + key}
                                                                                         id={"nationalityMo" + key}
                                                                                         value={this.state.associes[key].nationality}
                                                                                         onChange={this.handleArrayObjectChange("associes", key, "nationality")}
                                                                                >
                                                                                    {
                                                                                        Data.nationalityList.map((item, key) => (
                                                                                            <option
                                                                                                style={{textTransform: "capitalize"}}
                                                                                                value={item.nationalite}>{item.nationalite}</option>
                                                                                        ))
                                                                                    }
                                                                                </AvInput>
                                                                                <AvFeedback>Ce champs est
                                                                                    obligatoire</AvFeedback>
                                                                            </AvGroup>
                                                                        </div>
                                                                    </div>,
                                                                    this.state.associes[key].nationality === "tunisienne" ?
                                                                        <div className="row">
                                                                            <div className="col-lg-6">
                                                                                <AvGroup className="mb-3">
                                                                                    <Label for="email">Titulaire de la
                                                                                        carte d'identité numéro:</Label>
                                                                                    <AvInput type="text"
                                                                                             name={"numCarteIdentiteMo" + key}
                                                                                             id={"numCarteIdentiteMo" + key}
                                                                                             value={this.state.associes[key].identityCardNum}
                                                                                             onChange={this.handleArrayObjectChange("associes", key, "identityCardNum")}
                                                                                             required/>
                                                                                    <AvFeedback>Ce champs est
                                                                                        obligatoire</AvFeedback>

                                                                                </AvGroup>
                                                                            </div>
                                                                            <div className="col-lg-6">
                                                                                <AvGroup>
                                                                                    <Label for="datnaiss">Délivé
                                                                                        le </Label>
                                                                                    <AvInput type="date"
                                                                                             name={"dateCarteIdentiteMo" + key}
                                                                                             id={"dateCarteIdentiteMo" + key}
                                                                                             value={this.state.associes[key].identityCardDate}
                                                                                             onChange={this.handleArrayObjectChange("associes", key, "identityCardDate")}
                                                                                             required/>
                                                                                    <AvFeedback>Date
                                                                                        invalide</AvFeedback>
                                                                                </AvGroup>
                                                                            </div>
                                                                        </div> :
                                                                        <div className="row">
                                                                            <div className="col-lg-6">
                                                                                <AvGroup className="mb-3">
                                                                                    <Label for="email">Titulaire du
                                                                                        passeport numéro:</Label>
                                                                                    <AvInput type="text"
                                                                                             name={"numPasseportMo" + key}
                                                                                             id={"numPasseportMo" + key}
                                                                                             value={this.state.associes[key].passeportNum}
                                                                                             onChange={this.handleArrayObjectChange("associes", key, "passeportNum")}
                                                                                             required/>
                                                                                    <AvFeedback>Ce champs est
                                                                                        obligatoire</AvFeedback>

                                                                                </AvGroup>
                                                                            </div>
                                                                            <div className="col-lg-6">
                                                                                <AvGroup>
                                                                                    <Label for="datnaiss">Délivé
                                                                                        le </Label>
                                                                                    <AvInput type="date"
                                                                                             name={"datePasseportMo" + key}
                                                                                             id={"datePasseportMo" + key}
                                                                                             value={this.state.associes[key].passeportDate}
                                                                                             onChange={this.handleArrayObjectChange("associes", key, "passeportDate")}
                                                                                             required/>
                                                                                    <AvFeedback>Date
                                                                                        invalide</AvFeedback>
                                                                                </AvGroup>
                                                                            </div>
                                                                        </div>

                                                                ]
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
                                                                                 value={this.state.associes[key].adress}
                                                                                 onChange={this.handleArrayObjectChange("associes", key, "adress")}
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
                                                                                 value={this.state.associes[key].ville}
                                                                                 onChange={this.handleArrayObjectChange("associes", key, "ville")}
                                                                                 required/>
                                                                        <AvFeedback>Ce champs est
                                                                            obligatoire</AvFeedback>
                                                                    </AvGroup>
                                                                </div>
                                                            </div>

                                                            <div className="row">
                                                                <div className="col-lg-6">
                                                                    <AvGroup className="mb-3">
                                                                        <Label for="postalcode">Code postal</Label>
                                                                        <AvInput type="number"
                                                                                 name={"postalCodeMo" + key}
                                                                                 id={"postalCodeMo" + key}
                                                                                 value={this.state.associes[key].postalCode}
                                                                                 onChange={this.handleArrayObjectChange("associes", key, "postalCode")}
                                                                                 required/>
                                                                        <AvFeedback>Code postal
                                                                            invalide</AvFeedback>
                                                                    </AvGroup>
                                                                </div>
                                                                <div className="col-lg-6">
                                                                    <AvGroup className="mb-3">
                                                                        <Label for="pays">Pays</Label>
                                                                        <AvInput type="select"
                                                                                 className="custom-select"
                                                                                 name={"paysMo" + key}
                                                                                 id={"paysMo" + key}
                                                                                 value={this.state.associes[key].pays}
                                                                                 onChange={this.handleArrayObjectChange("associes", key, "pays")}
                                                                                 required>
                                                                            {
                                                                                Data.contreyList.map((item, key) => (
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
                                                                <div className="col-lg-12">
                                                                    <h4 className="mb-1">
                                                                        Actions détenues
                                                                    </h4>
                                                                    <div style={{marginLeft: 15}}>
                                                                        <span style={{
                                                                            color: "#000",
                                                                            fontWeight: "bold",
                                                                            fontSize: 12
                                                                        }}>
                                                                            Nombre total d'actions:&nbsp;
                                                                            <span style={{fontWeight: "normal"}}>
                                                                                {totalActions + " actions"}
                                                                            </span>
                                                                        </span><br/>
                                                                        <span style={{
                                                                            color: "#000",
                                                                            fontWeight: "bold",
                                                                            fontSize: 12
                                                                        }}>
                                                                            Actions non encore accordées:&nbsp;
                                                                            <span style={{fontWeight: "normal"}}>
                                                                                {
                                                                                    nbActionsNonAccordees + " actions"}
                                                                            </span>
                                                                        </span>
                                                                    </div>
                                                                    <AvGroup className="mb-3 mt-1">
                                                                        <div style={{display: "flex"}}>
                                                                            <div>
                                                                                <Label for="adress">Nombre
                                                                                    d'actions</Label>
                                                                                <AvInput type="number"
                                                                                         name={"nbactionsEj" + key}
                                                                                         id={"nbactionsEj" + key}
                                                                                         value={this.state.associes[key].nbActions}
                                                                                         onChange={this.handleArrayObjectChange("associes", key, "nbActions")}
                                                                                         required/>
                                                                                <AvFeedback>Ce champs est
                                                                                    obligatoire</AvFeedback>
                                                                            </div>
                                                                            {
                                                                                typeof parseInt(this.state.associes[key].nbActions) === "number" && parseInt(this.state.associes[key].nbActions) > 0 &&
                                                                                <div style={{
                                                                                    marginTop: 33,
                                                                                    marginLeft: 30
                                                                                }}>
                                                                                    <h6 style={{color: "red"}}>
                                                                                        {((parseInt(this.state.associes[key].nbActions) / totalActions) * 100) + " % du capital"}
                                                                                    </h6>
                                                                                </div>
                                                                            }

                                                                        </div>
                                                                    </AvGroup>
                                                                </div>
                                                            </div>


                                                            {
                                                                item.typeTmp === "Un particulier" &&
                                                                <div className="row"
                                                                     style={{marginTop: 5}}>
                                                                    <div className="col-lg-12">
                                                                        <h4 className="mb-3">
                                                                            L’associé est-il également gérant et
                                                                            Président de la société ?
                                                                        </h4>
                                                                        <div
                                                                            className="radio radio-pink mb-2">
                                                                            <input type="radio"
                                                                                   name={"radioisPres" + key}
                                                                                   id={"radioisPres1" + key}
                                                                                   style={{marginLeft: 10}}
                                                                                   onClick={this.handleRadioChange("associes", "isAdministrator", key, "true")}
                                                                                   checked={this.state.associes[key].isAdministrator === "true"}
                                                                                   value={this.state.associes[key].isAdministrator}/>
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
                                                                                   onClick={this.handleRadioChange("associes", "isAdministrator", key, "false")}
                                                                                   checked={this.state.associes[key].isAdministrator === "false"}
                                                                                   value={this.state.associes[key].isAdministrator}/>
                                                                            <label htmlFor={"radioisPres2" + key}>
                                                                                Non
                                                                            </label>
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
                                                        <div className="float-right">
                                                            <Button color="primary"
                                                                    onClick={this.addNewAssocie}
                                                                    className="btn btn-success waves-effect waves-light font-weight-bold">
                                                                <i className="fa fa-plus"/>&nbsp;&nbsp;
                                                                Ajouter un autre associé
                                                            </Button>
                                                        </div>
                                                    </div>
                                                </div>

                                                <FormGroup style={{marginTop: 20}}>
                                                    <div className="float-left">
                                                        <BtnU kind={KIND.secondary} onClick={() => {
                                                            let current_step = this.state.step_percent
                                                            this.setState({
                                                                activeStep: "sarl_tokenization",
                                                                step_percent: current_step - 15
                                                            })
                                                        }}
                                                        >Précédent</BtnU>
                                                    </div>
                                                    <div className="float-right">
                                                        <BtnU overrides={{
                                                            BaseButton: {
                                                                style: ({$theme}) => ({
                                                                    backgroundColor: $theme.colors.negative,
                                                                }),
                                                            },
                                                        }}>Continuer</BtnU>
                                                    </div>

                                                </FormGroup>

                                            </AvForm>


                                        </div>
                                    </div>
                                </div>
                            }

                            {
                                this.state.activeStep === "sarl_gerants" &&
                                <div className="col-sm-12">

                                    <h4 className="mb-3">Qui est(sont) le(les) gérant(s) de votre société ?</h4>
                                    <p>Merci d'indiquer à nouveau les coordonnées du Gérant de la SARL.</p>

                                    <div className="row">
                                        <div className="col-lg-12">
                                            <AvForm onValidSubmit={(event, values) => this.save_Step(event, values)}>
                                                <AvInput type="text" name="step" id="step" value="sarl_gerants"
                                                         style={{visibility: "hidden", display: "none"}}/>
                                                {
                                                    this.state.gerants.map((item, key) => (
                                                        <div key={key} style={{
                                                            padding: 25,
                                                            backgroundColor: "#f0f0f0",
                                                            borderRadius: 7.5,
                                                            marginBottom: 20
                                                        }}>
                                                            {
                                                                key > 0 &&
                                                                <div align="right"
                                                                     style={{marginTop: -20, marginRight: -15}}>
                                                                    <IconButton onClick={() => {
                                                                        let gerants = this.state.gerants || [];
                                                                        gerants.splice(key, 1)
                                                                        this.setState({gerants: gerants})
                                                                    }}>
                                                                        <DeleteIcon color="error"/>
                                                                    </IconButton>
                                                                </div>
                                                            }

                                                            <div className="row">
                                                                <div className="col-lg-6">
                                                                    <AvGroup className="mb-3">
                                                                        <Label
                                                                            for="role">Le gérant est l'un des asscoiés
                                                                            physiques ? </Label>
                                                                        <AvInput type="select"
                                                                                 className="custom-select"
                                                                                 name={"civiliteMo" + key}
                                                                                 id={"civiliteMo" + key}
                                                                                 value={this.state.gerants[key].is_assoc_tmp}
                                                                                 onChange={(e) => {
                                                                                     let objCp = this.state.gerants;
                                                                                     let find = this.state.associes.find(x => x.id === e.target.value)
                                                                                     if (find) {
                                                                                         objCp[key].firstname = find.firstname
                                                                                         objCp[key].lastname = find.lastname
                                                                                         objCp[key].civility = find.civility
                                                                                         objCp[key].email = find.email
                                                                                         objCp[key].phone = find.phone
                                                                                         objCp[key].birthday = find.birthday
                                                                                         objCp[key].nationality = find.nationality
                                                                                         objCp[key].passeportNum = find.passeportNum
                                                                                         objCp[key].passeportDate = find.passeportDate
                                                                                         objCp[key].identityCardNum = find.identityCardNum
                                                                                         objCp[key].identityCardDate = find.identityCardDate
                                                                                         objCp[key].adress = find.adress
                                                                                         objCp[key].ville = find.ville
                                                                                         objCp[key].postalCode = find.postalCode
                                                                                         objCp[key].pays = find.pays
                                                                                         this.setState({gerants: objCp})
                                                                                     }
                                                                                 }}
                                                                        >
                                                                            <option value=""/>
                                                                            {
                                                                                this.state.associes.filter(x => x.typeTmp === "Un particulier").map(assoc => (
                                                                                    <option
                                                                                        value={assoc.id}>{assoc.firstname + " " + assoc.lastname}</option>
                                                                                ))
                                                                            }
                                                                        </AvInput>
                                                                    </AvGroup>
                                                                </div>
                                                            </div>

                                                            <div className="row">
                                                                <div className="col-lg-6">
                                                                    <AvGroup className="mb-3">
                                                                        <Label
                                                                            for="role">Civilité</Label>
                                                                        <AvInput type="select"
                                                                                 className="custom-select"
                                                                                 name={"civiliteMo" + key}
                                                                                 id={"civiliteMo" + key}
                                                                                 value={this.state.gerants[key].gender}
                                                                                 onChange={this.handleArrayObjectChange("gerants", key, "gender")}
                                                                        >
                                                                            <option
                                                                                value="M.">M.
                                                                            </option>
                                                                            <option
                                                                                value="Mme">Mme
                                                                            </option>
                                                                        </AvInput>
                                                                    </AvGroup>
                                                                </div>
                                                            </div>

                                                            <div className="row">
                                                                <div className="col-lg-6">
                                                                    <AvGroup
                                                                        className="mb-3">
                                                                        <Label
                                                                            for="nom">Nom</Label>
                                                                        <AvInput type="text"
                                                                                 name={"firstnameMo" + key}
                                                                                 id={"firstnameMo" + key}
                                                                                 value={this.state.gerants[key].firstname}
                                                                                 onChange={this.handleArrayObjectChange("gerants", key, "firstname")}
                                                                                 required/>
                                                                        <AvFeedback>Ce champs est
                                                                            obligatoire</AvFeedback>
                                                                    </AvGroup>
                                                                </div>
                                                                <div className="col-lg-6">
                                                                    <AvGroup
                                                                        className="mb-3">
                                                                        <Label
                                                                            for="prenom">Prénom</Label>
                                                                        <AvInput type="text"
                                                                                 name={"lastnameMo" + key}
                                                                                 id={"lastnameMo" + key}
                                                                                 value={this.state.gerants[key].lastname}
                                                                                 onChange={this.handleArrayObjectChange("gerants", key, "lastname")}
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
                                                                                 name={"emailMo" + key}
                                                                                 id={"emailMo" + key}
                                                                                 value={this.state.gerants[key].email}
                                                                                 onChange={this.handleArrayObjectChange("gerants", key, "email")}
                                                                                 required/>
                                                                        <AvFeedback>Email invalide</AvFeedback>
                                                                    </AvGroup>
                                                                </div>
                                                                <div className="col-lg-6">
                                                                    <AvGroup className="mb-3">
                                                                        <Label for="password">Numéro de
                                                                            téléphone</Label>
                                                                        <PhoneInput
                                                                            country={'fr'}
                                                                            value={this.state.gerants[key].phone}
                                                                            onChange={(value) => this.handleOnChangePhone(value, key, "gerant")}
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
                                                                        <Label for="datnaiss">Date de naissance</Label>
                                                                        <AvInput type="date"
                                                                                 name={"birthdayMo" + key}
                                                                                 id={"birthdayMo" + key}
                                                                                 value={this.state.gerants[key].birthday}
                                                                                 onChange={this.handleArrayObjectChange("gerants", key, "birthday")}
                                                                                 required/>
                                                                        <AvFeedback>Date invalide</AvFeedback>
                                                                    </AvGroup>
                                                                </div>
                                                                <div className="col-lg-6">
                                                                    <AvGroup className="mb-3">
                                                                        <Label for="nationality">Nationnalité</Label>
                                                                        <AvInput type="select"
                                                                                 className="custom-select"
                                                                                 style={{textTransform: "capitalize"}}
                                                                                 name={"nationalityMo" + key}
                                                                                 id={"nationalityMo" + key}
                                                                                 value={this.state.gerants[key].nationality}
                                                                                 onChange={(e) => {
                                                                                     let objCp = this.state.gerants;
                                                                                     objCp[key].nationality = e.target.value;
                                                                                     this.setState({gerants: objCp})
                                                                                 }}>
                                                                            {
                                                                                Data.nationalityList.map((item, key) => (
                                                                                    <option
                                                                                        style={{textTransform: "capitalize"}}
                                                                                        value={item.nationalite}>{item.nationalite}</option>
                                                                                ))
                                                                            }
                                                                        </AvInput>
                                                                        <AvFeedback>Ce champs est
                                                                            obligatoire</AvFeedback>
                                                                    </AvGroup>
                                                                </div>
                                                            </div>

                                                            {
                                                                this.state.gerants[key].nationality === "tunisienne" ?
                                                                    <div className="row">
                                                                        <div className="col-lg-6">
                                                                            <AvGroup className="mb-3">
                                                                                <Label for="email">Titulaire de la carte
                                                                                    d'identité numéro:</Label>
                                                                                <AvInput type="text"
                                                                                         name={"numCarteIdentiteMo" + key}
                                                                                         id={"numCarteIdentiteMo" + key}
                                                                                         value={this.state.gerants[key].identityCardNum}
                                                                                         onChange={this.handleArrayObjectChange("gerants", key, "identityCardNum")}
                                                                                         required/>
                                                                                <AvFeedback>Ce champs est
                                                                                    obligatoire</AvFeedback>

                                                                            </AvGroup>
                                                                        </div>
                                                                        <div className="col-lg-6">
                                                                            <AvGroup>
                                                                                <Label for="datnaiss">Délivé le </Label>
                                                                                <AvInput type="date"
                                                                                         name={"dateCarteIdentiteMo" + key}
                                                                                         id={"dateCarteIdentiteMo" + key}
                                                                                         value={this.state.gerants[key].identityCardDate}
                                                                                         onChange={this.handleArrayObjectChange("gerants", key, "identityCardDate")}
                                                                                         required/>
                                                                                <AvFeedback>Date invalide</AvFeedback>
                                                                            </AvGroup>
                                                                        </div>
                                                                    </div> :
                                                                    <div className="row">
                                                                        <div className="col-lg-6">
                                                                            <AvGroup className="mb-3">
                                                                                <Label for="email">Titulaire du
                                                                                    passeport numéro:</Label>
                                                                                <AvInput type="text"
                                                                                         name={"numPasseportMo" + key}
                                                                                         id={"numPasseportMo" + key}
                                                                                         value={this.state.gerants[key].passeportNum}
                                                                                         onChange={this.handleArrayObjectChange("gerants", key, "passeportNum")}
                                                                                         required/>
                                                                                <AvFeedback>Ce champs est
                                                                                    obligatoire</AvFeedback>

                                                                            </AvGroup>
                                                                        </div>
                                                                        <div className="col-lg-6">
                                                                            <AvGroup>
                                                                                <Label for="datnaiss">Délivé le </Label>
                                                                                <AvInput type="date"
                                                                                         name={"datePasseportMo" + key}
                                                                                         id={"datePasseportMo" + key}
                                                                                         value={this.state.gerants[key].passeportDate}
                                                                                         onChange={this.handleArrayObjectChange("gerants", key, "passeportDate")}
                                                                                         required/>
                                                                                <AvFeedback>Date invalide</AvFeedback>
                                                                            </AvGroup>
                                                                        </div>
                                                                    </div>
                                                            }

                                                            <h4 className="mb-3">Adresse du gérant</h4>

                                                            <div className="row">
                                                                <div className="col-lg-6">
                                                                    <AvGroup className="mb-3">
                                                                        <Label
                                                                            for="adress">Adresse</Label>
                                                                        <AvInput type="text"
                                                                                 name={"adressMo" + key}
                                                                                 id={"adressMo" + key}
                                                                                 value={this.state.gerants[key].adress}
                                                                                 onChange={this.handleArrayObjectChange("gerants", key, "adress")}
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
                                                                                 value={this.state.gerants[key].ville}
                                                                                 onChange={this.handleArrayObjectChange("gerants", key, "ville")}
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
                                                                                 value={this.state.gerants[key].postalCode}
                                                                                 onChange={this.handleArrayObjectChange("gerants", key, "postalCode")}
                                                                                 required/>
                                                                        <AvFeedback>Code postal invalide</AvFeedback>
                                                                    </AvGroup>
                                                                </div>
                                                                <div className="col-lg-6">
                                                                    <AvGroup className="mb-3">
                                                                        <Label for="pays">Pays</Label>
                                                                        <AvInput type="select"
                                                                                 className="custom-select"
                                                                                 name={"paysMo" + key}
                                                                                 id={"paysMo" + key}
                                                                                 value={this.state.gerants[key].pays}
                                                                                 onChange={this.handleArrayObjectChange("gerants", key, "pays")}
                                                                                 required>
                                                                            {
                                                                                Data.contreyList.map((item, key) => (
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
                                                        <div className="float-right">
                                                            <Button color="primary"
                                                                    onClick={this.addNewGerant}
                                                                    className="btn btn-success waves-effect waves-light font-weight-bold">
                                                                <i className="fa fa-plus"/>&nbsp;&nbsp;
                                                                Ajouter un autre gérant
                                                            </Button>
                                                        </div>
                                                    </div>
                                                </div>

                                                <FormGroup style={{marginTop: 20}}>
                                                    <div className="float-left">
                                                        <BtnU kind={KIND.secondary} onClick={() => {
                                                            let current_step = this.state.step_percent
                                                            this.setState({
                                                                activeStep: "sarl_assoc",
                                                                step_percent: current_step - 15
                                                            })
                                                        }}
                                                        >Précédent</BtnU>
                                                    </div>
                                                    <div className="float-right">
                                                        <BtnU overrides={{
                                                            BaseButton: {
                                                                style: ({$theme}) => ({
                                                                    backgroundColor: $theme.colors.negative,
                                                                }),
                                                            },
                                                        }}>Continuer</BtnU>
                                                    </div>

                                                </FormGroup>

                                            </AvForm>


                                        </div>
                                    </div>
                                </div>
                            }

                            {
                                this.state.activeStep === "sarl_expert" &&
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
                                                   onClick={this.handleRadioObjectChange("expertSmartCo", "etat", "true")}
                                                   checked={this.state.expertSmartCo.etat === "true"}
                                                   value={this.state.expertSmartCo.etat}
                                            />
                                            <label htmlFor="radioexp1">
                                                Oui, je souhaite gérer mon entreprise avec un
                                                expert-comptable partenaire de Smartco
                                            </label>
                                        </div>
                                        <div className="radio radio-pink mb-2">
                                            <input type="radio" name="radioexp" id="radioexp2"
                                                   style={{marginLeft: 10}}
                                                   onClick={this.handleRadioObjectChange("expertSmartCo", "etat", "false")}

                                                   checked={this.state.expertSmartCo.etat === "false"}
                                                   value={this.state.expertSmartCo.etat}
                                            />
                                            <label htmlFor="radioexp2">
                                                Non merci, j'ai déjà un expert-comptable
                                            </label>
                                        </div>

                                        <FormGroup style={{marginTop: 20}}>
                                            <div className="float-left">
                                                <BtnU kind={KIND.secondary} onClick={() => {
                                                    let current_step = this.state.step_percent
                                                    this.setState({
                                                        activeStep: "sarl_gerants",
                                                        step_percent: current_step - 15
                                                    })
                                                }}
                                                >Précédent</BtnU>
                                            </div>
                                            <div className="float-right">
                                                <BtnU onClick={() => {
                                                    if (this.state.expertSmartCo.etat === 'true') {
                                                        this.setState({
                                                            activeStep: "sarl_expert1/3"
                                                        })
                                                    } else {
                                                        this.createSociety()
                                                    }
                                                }} overrides={{
                                                    BaseButton: {
                                                        style: ({$theme}) => ({
                                                            backgroundColor: $theme.colors.negative,
                                                        }),
                                                    },
                                                }}>
                                                    {
                                                        this.state.expertSmartCo.etat === "true" ? "Suivant" : "Confirmer la création"
                                                    }
                                                </BtnU>
                                            </div>
                                        </FormGroup>

                                    </div>
                                </div>
                            }

                            {
                                this.state.activeStep === "sarl_expert1/3" &&
                                <div className="row">
                                    <div className="col-lg-12">
                                        <h3 style={{fontWeight: "bold"}}><u>Oﬀre d’expertise comptable (1/3)</u></h3>
                                        <h4 style={{fontWeight: "bold"}}>Oﬀre de base </h4>
                                        <p style={{fontWeight: "bold"}}>Un support ‘ﬁduciaire’ de base : Estimation de
                                            1'500 CHF/an
                                            (estimation +- 12 h* ) </p>
                                        <li style={{fontWeight: "bold"}}> Contrôle et correction des saisies (si saisie
                                            des pièces
                                            comptables faite par vous)
                                        </li>
                                        <li style={{fontWeight: "bold"}}>Ecritures de bouclement</li>
                                        <li style={{fontWeight: "bold"}}> Etablissement du bilan, pertes et proﬁts,
                                            annexe
                                        </li>
                                        <li style={{fontWeight: "bold"}}> Déclaration ﬁscale de la société́ Décomptes
                                            TVA et
                                            assurances sociales Revues trimestrielles du résultat
                                        </li>

                                        <p className="mt-2" style={{marginLeft: "5%"}}>* estimation de 12 heures de
                                            saisies comptables</p>

                                        <div className="row"
                                             style={{marginLeft: "5%", marginTop: "2%"}}>
                                            <div className="radio radio-pink mb-1">
                                                <input type="radio" name="radioexp" id="radioexp1"
                                                       style={{marginLeft: 10}}
                                                       onClick={this.handleRadioObjectChange("expertSmartCo", "offreDeBase", "true")}

                                                       checked={this.state.expertSmartCo.offreDeBase === "true"}
                                                       value={this.state.expertSmartCo.offreDeBase}
                                                />
                                                <label htmlFor="radioexp1">
                                                    Oui
                                                </label>
                                            </div>
                                            <div className="radio radio-pink mb-2"
                                                 style={{marginLeft: "2%"}}>
                                                <input type="radio" name="radioexp" id="radioexp2"
                                                       style={{marginLeft: 10}}
                                                       onClick={this.handleRadioObjectChange("expertSmartCo", "offreDeBase", "false")}
                                                       checked={this.state.expertSmartCo.offreDeBase === "false"}
                                                       value={this.state.expertSmartCo.offreDeBase}
                                                />
                                                <label htmlFor="radioexp2">
                                                    Non
                                                </label>
                                            </div>
                                        </div>

                                        <p className="mt-2" style={{marginLeft: "5%", color: "#000"}}>
                                            PS: Si oui, vous pouvez choisir une mensualisation et d'autres
                                            services&nbsp;&nbsp;&nbsp;
                                            <Button onClick={() => {
                                                window.open("http://51.91.254.61:80", "_blanc")
                                            }} className="btn waves-effect waves-light"
                                                    style={{backgroundColor: "#00A2FF", borderColor: "#00A2FF"}}>
                                                Options & mensualisation
                                            </Button>
                                        </p>

                                        <div className="col-lg-12">
                                            <h4>Si vous souhaitez nous conﬁez les écritures
                                                comptables </h4>
                                            <li style={{fontWeight: "bold"}}>Support ﬁduciaire externalisation – 5 CHF
                                                par mouvement
                                                comptable
                                            </li>
                                            <li style={{fontWeight: "bold"}}>Support ﬁduciaire externalisation salaires
                                                – 10 CHF par
                                                ﬁche de salaire
                                            </li>

                                        </div>

                                        <FormGroup style={{marginTop: 20}}>
                                            <div className="float-left">
                                                <BtnU kind={KIND.secondary} onClick={() => this.setState({
                                                    activeStep: "sarl_expert",
                                                })}
                                                >Précédent</BtnU>
                                            </div>
                                            <div className="float-right">
                                                <BtnU onClick={() => {
                                                    this.setState({
                                                        activeStep: "sarl_expert2/3"
                                                    })

                                                }} overrides={{
                                                    BaseButton: {
                                                        style: ({$theme}) => ({
                                                            backgroundColor: $theme.colors.negative,
                                                        }),
                                                    },
                                                }}>Continuer</BtnU>
                                            </div>
                                        </FormGroup>

                                    </div>
                                </div>
                            }

                            {
                                this.state.activeStep === "sarl_expert2/3" &&
                                <div className="row">
                                    <div className="col-lg-12">
                                        <h3><u>Oﬀre d’expertise comptable (2/3)</u></h3>
                                        <h4>Saisie déporté en mode Cloud SaaS </h4>
                                        <li style={{fontWeight: "bold"}}> L’ERP est proposé sous forme
                                            d’abonnement (Saas) : à partir de 50 CHF/ mois/utilisateur
                                        </li>

                                        <div className="row"
                                             style={{marginLeft: "5%", marginTop: "2%"}}>
                                            <div className="radio radio-pink mb-1">
                                                <input type="radio" name="radioexp" id="radioexp1"
                                                       style={{marginLeft: 10}}
                                                       onClick={this.handleRadioObjectChange("expertSmartCo", "abERP", "true")}

                                                       checked={this.state.expertSmartCo.abERP === "true"}
                                                       value={this.state.expertSmartCo.abERP}
                                                />
                                                <label htmlFor="radioexp1">
                                                    Oui
                                                </label>
                                            </div>
                                            <div className="radio radio-pink mb-2"
                                                 style={{marginLeft: "2%"}}>
                                                <input type="radio" name="radioexp" id="radioexp2"
                                                       style={{marginLeft: 10}}
                                                       onClick={this.handleRadioObjectChange("expertSmartCo", "abERP", "false")}
                                                       checked={this.state.expertSmartCo.abERP === "false"}
                                                       value={this.state.expertSmartCo.abERP}
                                                />
                                                <label htmlFor="radioexp2">
                                                    Non
                                                </label>
                                            </div>
                                        </div>
                                        <p> Cette plateforme est accessible depuis n’importe quel
                                            appareil, connecté sur un réseau internet. L’ERP est
                                            ‘connecté’, ce qui veut dire qu’un nombre de saisies, comme
                                            les factures, les ﬁches de salaires, etc sont
                                            automatiquement intégré dans la comptabilité. </p>

                                        <li style={{fontWeight: "bold"}}> La conﬁguration pour vos
                                            besoins sera faite selon un cahier de charge détaillé
                                            L’installation ‘standard’ du logo pour facturation,
                                            intégration liste de clients/ fournisseurs/produits (mise à
                                            disposition par vous), coordonnées bancaires : estimé à 350
                                            CHF (1 heure)
                                        </li>

                                        <div className="row"
                                             style={{marginLeft: "5%", marginTop: "2%"}}>
                                            <div className="radio radio-pink mb-1">
                                                <input type="radio" name="radioexp1" id="radioexp3"
                                                       style={{marginLeft: 10}}
                                                       onClick={this.handleRadioObjectChange("expertSmartCo", "configurationERP", "true")}

                                                       checked={this.state.expertSmartCo.configurationERP === "true"}
                                                       value={this.state.expertSmartCo.configurationERP}
                                                />
                                                <label htmlFor="radioexp3">
                                                    Oui
                                                </label>
                                            </div>
                                            <div className="radio radio-pink mb-2"
                                                 style={{marginLeft: "2%"}}>
                                                <input type="radio" name="radioexp1" id="radioexp4"
                                                       style={{marginLeft: 10}}
                                                       onClick={this.handleRadioObjectChange("expertSmartCo", "configurationERP", "false")}
                                                       checked={this.state.expertSmartCo.configurationERP === "false"}
                                                       value={this.state.expertSmartCo.configurationERP}
                                                />
                                                <label htmlFor="radioexp4">
                                                    Non
                                                </label>
                                            </div>
                                        </div>

                                        <li style={{fontWeight: "bold"}}> Si besoin, nous pouvons
                                            assurer la formation sur l’utilisation de l’ERP : 250 CHF
                                        </li>

                                        <div className="row"
                                             style={{marginLeft: "5%", marginTop: "2%"}}>
                                            <div className="radio radio-pink mb-1">
                                                <input type="radio" name="radioexp2" id="radioexp5"
                                                       style={{marginLeft: 10}}
                                                       onClick={this.handleRadioObjectChange("expertSmartCo", "formationERP", "true")}
                                                       checked={this.state.expertSmartCo.formationERP === "true"}
                                                       value={this.state.expertSmartCo.formationERP}
                                                />
                                                <label htmlFor="radioexp5">
                                                    Oui
                                                </label>
                                            </div>
                                            <div className="radio radio-pink mb-2"
                                                 style={{marginLeft: "2%"}}>
                                                <input type="radio" name="radioexp2" id="radioexp6"
                                                       style={{marginLeft: 10}}
                                                       onClick={this.handleRadioObjectChange("expertSmartCo", "formationERP", "false")}
                                                       checked={this.state.expertSmartCo.formationERP === "false"}
                                                       value={this.state.expertSmartCo.formationERP}
                                                />
                                                <label htmlFor="radioexp6">
                                                    Non
                                                </label>
                                            </div>
                                        </div>

                                        <li style={{fontWeight: "bold"}}> Un ‘helpdesk’ est disponible
                                            et est facturé par tranche de 15 min. à 150 CHF/heure
                                        </li>

                                        <div className="row"
                                             style={{marginLeft: "5%", marginTop: "2%"}}>
                                            <div className="radio radio-pink mb-1">
                                                <input type="radio" name="radioexp3" id="radioexp7"
                                                       style={{marginLeft: 10}}
                                                       onClick={this.handleRadioObjectChange("expertSmartCo", "helpdesk", "true")}
                                                       checked={this.state.expertSmartCo.helpdesk === "true"}
                                                       value={this.state.expertSmartCo.helpdesk}
                                                />
                                                <label htmlFor="radioexp7">
                                                    Oui
                                                </label>
                                            </div>
                                            <div className="radio radio-pink mb-2"
                                                 style={{marginLeft: "2%"}}>
                                                <input type="radio" name="radioexp3" id="radioexp8"
                                                       style={{marginLeft: 10}}
                                                       onClick={this.handleRadioObjectChange("expertSmartCo", "helpdesk", "false")}
                                                       checked={this.state.expertSmartCo.helpdesk === "false"}
                                                       value={this.state.expertSmartCo.helpdesk}
                                                />
                                                <label htmlFor="radioexp8">
                                                    Non
                                                </label>
                                            </div>
                                        </div>

                                        <FormGroup style={{marginTop: 20}}>
                                            <div className="float-left">
                                                <BtnU kind={KIND.secondary} onClick={() => this.setState({
                                                    activeStep: "sarl_expert1/3",
                                                })}
                                                >Précédent</BtnU>
                                            </div>
                                            <div className="float-right">
                                                <BtnU onClick={() => {
                                                    this.setState({
                                                        activeStep: "sarl_expert3/3"
                                                    })

                                                }} overrides={{
                                                    BaseButton: {
                                                        style: ({$theme}) => ({
                                                            backgroundColor: $theme.colors.negative,
                                                        }),
                                                    },
                                                }}>Continuer</BtnU>
                                            </div>
                                        </FormGroup>

                                    </div>
                                </div>
                            }

                            {
                                this.state.activeStep === "sarl_expert3/3" &&
                                <div className="row">
                                    <div className="col-lg-12">
                                        <h3><u>Oﬀre eCommerce lié à la compta (3/3)</u></h3>
                                        <h4>Oﬀre d’un site eCommerce lié à votre compta </h4>
                                        <li> Le Site de eCommerce est proposé sous forme d’abonnement
                                            (Saas) : à partir de 50 CHF/mois
                                        </li>

                                        <div className="row"
                                             style={{marginLeft: "5%", marginTop: "2%"}}>
                                            <div className="radio radio-pink mb-1">
                                                <input type="radio" name="radioexp" id="radioexp1"
                                                       style={{marginLeft: 10}}
                                                       onClick={this.handleRadioObjectChange("expertSmartCo", "siteEcommerce", "true")}
                                                       checked={this.state.expertSmartCo.siteEcommerce === "true"}
                                                       value={this.state.expertSmartCo.siteEcommerce}
                                                />
                                                <label htmlFor="radioexp1">
                                                    Oui
                                                </label>
                                            </div>
                                            <div className="radio radio-pink mb-2"
                                                 style={{marginLeft: "2%"}}>
                                                <input type="radio" name="radioexp" id="radioexp2"
                                                       style={{marginLeft: 10}}
                                                       onClick={this.handleRadioObjectChange("expertSmartCo", "siteEcommerce", "false")}
                                                       checked={this.state.expertSmartCo.siteEcommerce === "false"}
                                                       value={this.state.expertSmartCo.siteEcommerce}
                                                />
                                                <label htmlFor="radioexp2">
                                                    Non
                                                </label>
                                            </div>
                                        </div>
                                        <p>* Cette plateforme est accessible depuis n’importe quel
                                            appareil, connecté sur un réseau internet. Il est basé sur
                                            un leader open source Woo Commerce qui premier mondial en
                                            part de marché. Le eShop lié au back oﬃce comptable qui veut
                                            dire que la génération des factures, les ﬁches d’oﬀres de
                                            vos produits, …, etc sont automatiquement intégré dans la
                                            comptabilité.</p>

                                        <li>
                                            La conﬁguration pour vos besoins sera faite selon un cahier
                                            de charge détaillé L’installation ‘standard’ du logo pour
                                            facturation, intégration liste de clients/
                                            fournisseurs/produits (mise à disposition par vous),
                                            coordonnées bancaires : estimé à 750 CHF (3 heure)
                                        </li>

                                        <div className="row"
                                             style={{marginLeft: "5%", marginTop: "2%"}}>
                                            <div className="radio radio-pink mb-1">
                                                <input type="radio" name="radioexp1" id="radioexp3"
                                                       style={{marginLeft: 10}}
                                                       onClick={this.handleRadioObjectChange("expertSmartCo", "configSite", "true")}
                                                       checked={this.state.expertSmartCo.configSite === "true"}
                                                       value={this.state.expertSmartCo.configSite}
                                                />
                                                <label htmlFor="radioexp3">
                                                    Oui
                                                </label>
                                            </div>
                                            <div className="radio radio-pink mb-2"
                                                 style={{marginLeft: "2%"}}>
                                                <input type="radio" name="radioexp1" id="radioexp4"
                                                       style={{marginLeft: 10}}
                                                       onClick={this.handleRadioObjectChange("expertSmartCo", "configSite", "false")}
                                                       checked={this.state.expertSmartCo.configSite === "false"}
                                                       value={this.state.expertSmartCo.configSite}
                                                />
                                                <label htmlFor="radioexp4">
                                                    Non
                                                </label>
                                            </div>
                                        </div>

                                        <li> Si besoin, nous pouvons assurer la formation sur
                                            l’utilisation du site d’eCommerce : 250 CHF,
                                        </li>

                                        <div className="row"
                                             style={{marginLeft: "5%", marginTop: "2%"}}>
                                            <div className="radio radio-pink mb-1">
                                                <input type="radio" name="radioexp2" id="radioexp5"
                                                       style={{marginLeft: 10}}
                                                       onClick={this.handleRadioObjectChange("expertSmartCo", "formationSite", "true")}
                                                       checked={this.state.expertSmartCo.formationSite === "true"}
                                                       value={this.state.expertSmartCo.formationSite}
                                                />
                                                <label htmlFor="radioexp5">
                                                    Oui
                                                </label>
                                            </div>
                                            <div className="radio radio-pink mb-2"
                                                 style={{marginLeft: "2%"}}>
                                                <input type="radio" name="radioexp2" id="radioexp6"
                                                       style={{marginLeft: 10}}
                                                       onClick={this.handleRadioObjectChange("expertSmartCo", "formationSite", "false")}
                                                       checked={this.state.expertSmartCo.formationSite === "false"}
                                                       value={this.state.expertSmartCo.formationSite}
                                                />
                                                <label htmlFor="radioexp6">
                                                    Non
                                                </label>
                                            </div>
                                        </div>

                                        <li> Un ‘helpdesk’ est disponible et est facturé par tranche de
                                            15 min. à 150 CHF/heure.
                                        </li>

                                        <div className="row"
                                             style={{marginLeft: "5%", marginTop: "2%"}}>
                                            <div className="radio radio-pink mb-1">
                                                <input type="radio" name="radioexp3" id="radioexp7"
                                                       style={{marginLeft: 10}}
                                                       onClick={this.handleRadioObjectChange("expertSmartCo", "helpdeskSite", "true")}
                                                       checked={this.state.expertSmartCo.helpdeskSite === "true"}
                                                       value={this.state.expertSmartCo.helpdeskSite}
                                                />
                                                <label htmlFor="radioexp7">
                                                    Oui
                                                </label>
                                            </div>
                                            <div className="radio radio-pink mb-2"
                                                 style={{marginLeft: "2%"}}>
                                                <input type="radio" name="radioexp3" id="radioexp8"
                                                       style={{marginLeft: 10}}
                                                       onClick={this.handleRadioObjectChange("expertSmartCo", "helpdesksite", "false")}
                                                       checked={this.state.expertSmartCo.helpdesksite === "false"}
                                                       value={this.state.expertSmartCo.helpdeskSite}
                                                />
                                                <label htmlFor="radioexp8">
                                                    Non
                                                </label>
                                            </div>
                                        </div>

                                        <FormGroup>
                                            <div className="float-left">
                                                <BtnU kind={KIND.secondary} onClick={() => this.setState({
                                                    activeStep: "sarl_expert2/3",
                                                })}
                                                >Précédent</BtnU>
                                            </div>
                                            <div className="float-right">
                                                <BtnU isLoading={true} onClick={() => {
                                                    //this.saveSociety()
                                                }} overrides={{
                                                    BaseButton: {
                                                        style: ({$theme}) => ({
                                                            backgroundColor: $theme.colors.negative,
                                                        }),
                                                    },
                                                }}>Confirmer la création</BtnU>
                                            </div>
                                        </FormGroup>


                                    </div>
                                </div>
                            }

                        </div>
                    </div>


                    <Snackbar
                        open={this.state.openAlert}
                        autoHideDuration={10000}
                        onClose={this.closeSnackbar}
                    >
                        <Alert
                            elevation={6}
                            variant="filled"
                            onClose={this.closeSnackbar}
                            severity={this.state.alertType}
                        >
                            {this.state.alertMessage}
                        </Alert>
                    </Snackbar>


                    <Modal
                        isOpen={this.state.showPDFModal}
                        size="lg"
                        zIndex={1500}
                        toggle={() => this.setState({showPDFModal: !this.state.showPDFModal})}
                    >
                        <ModalHeader
                            toggle={() => this.setState({showPDFModal: !this.state.showPDFModal})}
                        >
                            Document
                        </ModalHeader>
                        <ModalBody>
                            <PDFViewer
                                document={{
                                    base64: this.state.pdfURL
                                }}
                                minScale={0.25}
                                scaleStep={0.25}
                                navbarOnTop
                                loader={<h5 style={{color: '#fa5b35'}}>Chargement...</h5>}
                                alert={
                                    <h5 style={{color: 'red'}}>
                                        Une erreur s'est produite lors de chargement du doument !
                                    </h5>
                                }
                            />
                        </ModalBody>
                    </Modal>

                </div>


                <Dialog open={this.state.openWizardTokenModal}
                        onClose={() => this.setState({openWizardTokenModal: false})}
                        fullWidth={true}
                        maxWidth={"80%"}
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
                                                        this.state.tokenModalStep === "otherData" ?
                                                            <h4 className="header-title mb-0"
                                                                style={{textTransform: "uppercase"}}>Autres</h4> :
                                                            this.state.tokenModalStep === "summary" ?
                                                                <h4 className="header-title mb-0"
                                                                    style={{textTransform: "uppercase"}}>Sommaire</h4> :
                                                                this.state.tokenModalStep === "deploy" ?
                                                                    <h4 className="header-title mb-0"
                                                                        style={{textTransform: "uppercase"}}>Déploiement</h4> : ""
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
                                                            <input className="form-control"
                                                                   placeholder="Votre adresse Wallet (0x.....)"
                                                                   type="text"
                                                                   value={this.state.ownerWallet}
                                                                   onChange={event => this.setState({ownerWallet: event.target.value})}
                                                                   style={{borderRadius: 0, height: 45}}/>
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
                                                                <option value="SecurityToken">Jeton de sécurité</option>
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
                                                                <option value="Tezos(XTZ)">Tezos(XTZ)</option>
                                                                <option value="Demo">Demo</option>
                                                                <option value="New core">New core</option>
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
                                                                           readOnly
                                                                           style={{
                                                                               borderRadius: 0,
                                                                               height: 45,
                                                                               textAlign: "right",
                                                                               color: "#000",
                                                                               fontSize: 16
                                                                           }}
                                                                           onChange={event => this.setState({supply: event.target.value})}
                                                                           value={totalActions}/>
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
                                                                                disabled
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
                                                                               value={(totalActions * this.state.reservedTokenPercent) / 100}/>
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
                                                                                disabled
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
                                                                               value={(totalActions * this.state.privateSaleTokenPercent) / 100}/>
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
                                                                                disabled
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
                                                                               value={(totalActions * this.state.publicSaleTokenPercent) / 100}/>
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
                                                                                disabled
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
                                                                               value={(totalActions * this.state.notAllocatedTokenPercent) / 100}/>
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
                                                                        }}>Le jeton non attribué peut être vendu à tout
                                                                            moment.</span>
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
                                                                                id="basic-addon1">{this.state.sarl_pays === "France" ? "€" : this.state.sarl_pays === "Switzerland" ? "CHF" : "TND"}</span>
                                                                        </div>
                                                                    </div>
                                                                    <span style={{color: "red", fontWeight: 900}}
                                                                          className="mb-1">Important:&nbsp;
                                                                        <span style={{
                                                                            color: "grey",
                                                                            fontWeight: "normal"
                                                                        }}>Définissez le prix dans FIAT pour la quantité
                                                                            donnée de jetons.
                                                                            Lorsque le jeton est un titre, le prix doit
                                                                            être indiqué dans la devise utilisée par
                                                                            l'oracle de conformité.</span>
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
                                                                    <label>Tezos Vault</label>
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
                                                                               readOnly={true}
                                                                               value={this.state.ownerWallet}/>
                                                                    </div>
                                                                    <span style={{color: "red", fontWeight: 900}}
                                                                          className="mb-1">Important:&nbsp;
                                                                        <span style={{
                                                                            color: "grey",
                                                                            fontWeight: "normal"
                                                                        }}>
                                                                            Cette adresse est la destination de tous
                                                                            les {this.state.tokenSymbol || "---"} collectés
                                                                            lors des soldes.
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
                                                                            <PopupDate
                                                                                showLabels={false}
                                                                                value={this.state.openingPrivateSaleFDate || new Date()}
                                                                                onDateChange={date => {
                                                                                    this.setState({openingPrivateSaleFDate: date})
                                                                                }}
                                                                                format='day/month/year'
                                                                                invalidMessage="Date invalide"
                                                                            />
                                                                            <div className="input-group-prepend">
                                                                                <span style={{height: 40, border: 0}}
                                                                                      className="input-group-text font-weight-bold"
                                                                                      id="basic-addon1">
                                                                                    <i className="mdi mdi-calendar font-19"/>
                                                                                </span>
                                                                            </div>
                                                                            <PopupDate
                                                                                showLabels={false}
                                                                                value={this.state.openingPrivateSaleLDate || new Date()}
                                                                                onDateChange={date => {
                                                                                    this.setState({openingPrivateSaleLDate: date})
                                                                                }}
                                                                                format='day/month/year'
                                                                                invalidMessage="Date invalide"
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
                                                                               type="date" disabled
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
                                                                               type="date" disabled
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
                                                                    With +{this.state.privateSaleBonus}% bonus
                                                                </div>
                                                                <div className="col-md-6">
                                                                    <InputRange
                                                                        formatLabel={value => ``}
                                                                        maxValue={100}
                                                                        minValue={0}
                                                                        step={1}
                                                                        value={this.state.privateSaleBonus}
                                                                        onChange={value => this.setState({privateSaleBonus: value})}/>
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
                                                                            <PopupDate
                                                                                showLabels={false}
                                                                                value={this.state.openingPublicSaleFDate || new Date()}
                                                                                onDateChange={date => {
                                                                                    this.setState({openingPublicSaleFDate: date})
                                                                                }}
                                                                                format='day/month/year'
                                                                                invalidMessage="Date invalide"
                                                                            />
                                                                            <div className="input-group-prepend">
                                                                                <span style={{height: 40, border: 0}}
                                                                                      className="input-group-text font-weight-bold"
                                                                                      id="basic-addon1">
                                                                                    <i className="mdi mdi-calendar font-19"/>
                                                                                </span>
                                                                            </div>
                                                                            <PopupDate
                                                                                showLabels={false}
                                                                                value={this.state.openingPublicSaleLDate || new Date()}
                                                                                onDateChange={date => {
                                                                                    this.setState({openingPublicSaleLDate: date})
                                                                                }}
                                                                                format='day/month/year'
                                                                                invalidMessage="Date invalide"
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
                                                                               type="date" disabled
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
                                                                               type="date" disabled
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
                                                                    With +{this.state.publicSaleBonus}% bonus
                                                                </div>
                                                                <div className="col-md-6">
                                                                    <InputRange
                                                                        formatLabel={value => ``}
                                                                        maxValue={100}
                                                                        minValue={0}
                                                                        step={1}
                                                                        value={this.state.publicSaleBonus}
                                                                        onChange={value => this.setState({publicSaleBonus: value})}/>
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
                                                                        onClick={() => this.setState({tokenModalStep: "otherData"})}
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


                                                    this.state.tokenModalStep === "otherData" ?
                                                        <div className="card-body">
                                                            <div className="card-widgets"/>
                                                            <div className="row">

                                                                <div className="col-md-12">
                                                                    <h5>
                                                                        Nous allons générer un site web privée de
                                                                        demande de souscription des actions pour le
                                                                        capital social.
                                                                        Il convient de choisir une image et de données
                                                                        un synthèse marketing de l’offre de votre
                                                                        société et de charger
                                                                        quelques fichiers ( présentation, données, BP,
                                                                        ect …) que vous souhaitez transmettre à vos
                                                                        actionnaires au sein d’une dataroom

                                                                    </h5>
                                                                </div>

                                                            </div>
                                                            <div className="row mb-2 mt-1">
                                                                <div className="col-lg-12">
                                                                    <h4 className="mb-3">Ajouter une image de fond</h4>
                                                                    <input style={{height: 43}} className="form-control"
                                                                           type="file" onChange={this.addImageFond}/>
                                                                </div>
                                                            </div>

                                                            <div className="row mb-2">
                                                                <div className="col-lg-12">
                                                                    <h4 className="mb-3">Synthèse de la description
                                                                        marketing de votre société</h4>
                                                                    <input className="form-control" aria-multiline
                                                                           type="textarea" style={{height: 100}}
                                                                           onChange={(event) => this.setState({marketingDesc: event.target.value})}/>
                                                                </div>
                                                            </div>

                                                            <div className="row mb-2">
                                                                <div className="col-lg-12">
                                                                    <h4 className="mb-3">Data Room</h4>

                                                                    <div className="row">
                                                                        <div className="col-md-4">
                                                                            <h5>* Executive Summary</h5>
                                                                        </div>
                                                                        <div className="col-md-8">
                                                                            <input style={{height: 43}}
                                                                                   className="form-control" multiple
                                                                                   type="file"
                                                                                   onChange={(files) => this.addMultipleImages(files, 'issuance/dataRoom/files/', 'dataRoomFiles')}
                                                                            />
                                                                        </div>
                                                                    </div>

                                                                    <div className="row">
                                                                        <div className="col-md-4">
                                                                            <h5>* Description Business-Model</h5>
                                                                        </div>
                                                                        <div className="col-md-8">
                                                                            <input style={{height: 43}}
                                                                                   className="form-control" multiple
                                                                                   type="file"
                                                                                   onChange={(files) => this.addMultipleImages(files, 'issuance/dataRoom/files/', 'dataRoomFiles')}
                                                                            />
                                                                        </div>
                                                                    </div>

                                                                    <div className="row">
                                                                        <div className="col-md-4">
                                                                            <h5>* Business plan</h5>
                                                                        </div>
                                                                        <div className="col-md-8">
                                                                            <input style={{height: 43}}
                                                                                   className="form-control" multiple
                                                                                   type="file"
                                                                                   onChange={(files) => this.addMultipleImages(files, 'issuance/dataRoom/files/', 'dataRoomFiles')}
                                                                            />
                                                                        </div>
                                                                    </div>
                                                                    <div className="row">
                                                                        <div className="col-md-4">
                                                                            <h5>* Autres documents</h5>
                                                                        </div>
                                                                        <div className="col-md-8">
                                                                            <input style={{height: 43}}
                                                                                   className="form-control" multiple
                                                                                   type="file"
                                                                                   onChange={(files) => this.addMultipleImages(files, 'issuance/dataRoom/files/', 'dataRoomFiles')}
                                                                            />
                                                                        </div>
                                                                    </div>

                                                                </div>
                                                            </div>

                                                            <div className="row mt-4 mb-3">
                                                                <div className="col-md-12 text-center">
                                                                    &nbsp;&nbsp;
                                                                    <button className="btn btn-sm customBtnNext mb-3"
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
                                                                        <td style={{fontWeight: 600}}>{this.state.tokenPrice + " €"}</td>
                                                                    </tr>
                                                                    <tr>
                                                                        <th>Owner</th>
                                                                        <td style={{
                                                                            fontWeight: 600,
                                                                            color: "red"
                                                                        }}>{this.state.ownerWallet.substr(0, 6) + "..." +
                                                                        this.state.ownerWallet.substr(this.state.ownerWallet.length - 4, 4)}
                                                                        </td>
                                                                    </tr>
                                                                    <tr>
                                                                        <th>{this.state.tokenSymbol} Vault</th>
                                                                        <td style={{
                                                                            fontWeight: 600,
                                                                            color: "red"
                                                                        }}>{this.state.ownerWallet.substr(0, 6) + "..." +
                                                                        this.state.ownerWallet.substr(this.state.ownerWallet.length - 4, 4)}
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
                                                                            disabled={this.state.loadingTokenization === true}
                                                                            className="btn btn-sm customBtnNext mb-3"
                                                                            onClick={() => this.setState({tokenModalStep: "otherData"})}
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
                                                                            disabled={this.state.loadingTokenization === true}
                                                                            onClick={() => {
                                                                                this.setState({loadingTokenization: true});
                                                                                setTimeout(() => {

                                                                                    tokenizationService.transferToken({
                                                                                        from: this.state.ownerWallet,
                                                                                        to: "0x372c500044386c608B0660aFf4059eC0bF469858",
                                                                                        amount: this.state.supply
                                                                                    }).then(res => {
                                                                                        if (res && res.data) {
                                                                                            let tokenOperations = [];
                                                                                            tokenOperations.push(res);
                                                                                        } else {
                                                                                            setTimeout(() => {
                                                                                                this.setState({
                                                                                                    loadingTokenization: false,
                                                                                                    tokenModalStep: "deploy"
                                                                                                });
                                                                                            }, 3000)
                                                                                        }

                                                                                    }).catch(err => console.log(err))
                                                                                    setTimeout(() => {
                                                                                        this.setState({
                                                                                            loadingTokenization: false,
                                                                                            tokenModalStep: "deploy"
                                                                                        });
                                                                                    }, 3000)
                                                                                }, 5000);

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

                                                                <div className="row mt-4 mb-3">
                                                                    <div className="col-md-12 text-center">
                                                                        {this.state.loadingTokenization === true &&
                                                                        <Loader/>}
                                                                    </div>
                                                                </div>
                                                            </div> :


                                                            this.state.tokenModalStep === "deploy" ?
                                                                <div className="card-body">
                                                                    <div className="card-widgets"/>
                                                                    <div className="row">
                                                                        <div className="col-md-12">
                                                                            <h5 style={{color: "red"}}>L'opération est
                                                                                bien effectué avec succès</h5><br/>
                                                                            {/*<h4>Détails : </h4>*/}

                                                                            {
                                                                                this.state.tokenizationResult.operationId &&
                                                                                <table className="table table-sm table-borderless"
                                                                                >
                                                                                    <tbody>
                                                                                    <tr>
                                                                                        <th>Id Opération:</th>
                                                                                        <td style={{
                                                                                            fontWeight: 600,
                                                                                            color: "#000"
                                                                                        }}>{this.state.tokenizationResult.operationId}</td>
                                                                                    </tr>
                                                                                    <tr>
                                                                                        <th>De</th>
                                                                                        <td style={{
                                                                                            fontWeight: 600,
                                                                                            color: "#000"
                                                                                        }}>{this.state.tokenizationResult.inputs.from}</td>
                                                                                    </tr>
                                                                                    <tr>
                                                                                        <th style={{textTransform: "uppercase"}}>à</th>
                                                                                        <td style={{
                                                                                            fontWeight: 600,
                                                                                            color: "#000"
                                                                                        }}>{this.state.tokenizationResult.inputs.to}
                                                                                        </td>
                                                                                    </tr>
                                                                                    <tr>
                                                                                        <th style={{textTransform: "uppercase"}}>Transaction
                                                                                            Data
                                                                                        </th>
                                                                                        <td style={{
                                                                                            fontWeight: 600,
                                                                                            marginRight: 30,
                                                                                            color: "#000"
                                                                                        }}>

                                                                                            {
                                                                                                this.state.tokenizationResult.steps[0].transaction.data.substr(0, 8) + "......" +
                                                                                                this.state.tokenizationResult.steps[0].transaction.data.substr(this.state.tokenizationResult.steps[0].transaction.data.length - 10, 10)
                                                                                            }

                                                                                        </td>
                                                                                    </tr>
                                                                                    <tr>
                                                                                        <th style={{textTransform: "uppercase"}}>Date
                                                                                            de création
                                                                                        </th>
                                                                                        <td style={{
                                                                                            fontWeight: 600,
                                                                                            color: "#000"
                                                                                        }}>{moment(this.state.tokenizationResult.createdAt).format("DD MMM YYYY HH:mm:ss")}
                                                                                        </td>
                                                                                    </tr>
                                                                                    </tbody>
                                                                                </table>
                                                                            }
                                                                        </div>
                                                                    </div>
                                                                    <div className="row mt-2 mb-3">
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
                                                                </div> : ""

                                    }

                                </div>
                            </div>
                        </div>
                    </DialogContent>
                </Dialog>

            </div>

        )
    }


}
