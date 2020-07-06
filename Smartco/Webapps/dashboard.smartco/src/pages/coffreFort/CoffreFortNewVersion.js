import React from "react";
import { Modal, ModalBody, ModalHeader} from "reactstrap";
import firebase from "firebase";
import moment from "moment";
import augmCapitalService from "../../provider/augmCapitalService";
import PDFViewer from "../../customComponents/pdf-viewer-reactjs";
import SearchResults from "../../components/SearchResults";
import DocSearchService from "../../provider/DocSearchService";
import entrepriseSARLService from "../../provider/entrepriseSARLService";
import emailService from "../../provider/emailService";
import {FileUploader} from "baseui/file-uploader";
import axios from 'axios';
import {Button, SHAPE, SIZE} from 'baseui/button';
import Delete from 'baseui/icon/delete';
import {RadioGroup, Radio, ALIGN} from "baseui/radio";
import {
    Checkbox,
    STYLE_TYPE,
    LABEL_PLACEMENT
} from "baseui/checkbox";
import {ReactMultiEmail, isEmail} from 'react-multi-email';
import '../../assets/css/multiEmail.css';
import {Select} from 'baseui/select';
import swissImg from "../../assets/images/flags/swiss.svg"
import euImg from "../../assets/images/flags/eu.svg"
import frImg from "../../assets/images/flags/france.png"
import {Textarea} from "baseui/textarea";
import Draggable from "react-draggable";
import htmlToImage from 'html-to-image';
import ReactLoading from "react-loading";
import Drawer from "@material-ui/core/Drawer";
import IconButton from '@material-ui/core/IconButton';
import CloudDownloadOutlinedIcon from '@material-ui/icons/CloudDownloadOutlined';
import PersonAddOutlinedIcon from '@material-ui/icons/PersonAddOutlined';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import DateRangeOutlinedIcon from '@material-ui/icons/DateRangeOutlined';
import CreateOutlinedIcon from '@material-ui/icons/CreateOutlined';
import FindInPageOutlinedIcon from '@material-ui/icons/FindInPageOutlined';
import TopBar from "../../components/TopBar/TopBar";
import logo from "../../assets/images/logos/logoSmartCo.jpeg";
import SideMenu from "../../components/SideMenu/SideMenu";
import data from "../../data/data";
import SideBar from "../../components/SideBar/SideBar";


const endpoint = "http://51.158.97.220:3001/api";

const getLabel = ({option}) => {
    return (
        <React.Fragment>
            <img src={option.image} alt="" style={{width: 30, height: 30}}/>&nbsp;&nbsp;
            {option.id}
        </React.Fragment>
    );
};


class CoffreFortNewVersion extends React.Component {


    inputRef = {};

    constructor(props) {
        super(props);
        this.state = {
            selectedSieMenuItem:"coffre",
            openSideMenu:false,
            showSecondSideBar:false,
            loading: true,

            societies: [],
            selectedEntreprise: '',

            showPDFModal: false,
            pdfURL: "",

            textSearch: "",
            resultData: "",

            showAddDocForm: true,
            isDocUploaded: true,

            uploadedThumb: "",
            uploadedName: "",

            signDoc: "true",
            showBtnInviteSign: false,

            showInviteSignersForm: false,
            signMySelf: true,
            signatiaresEmails: [],
            selectedSignatureType: {id: "Swiss law (ZertES)", image: swissImg},

            showPdfSignToAddForm: true,

            showUploadStep: "",  //upload  // upload_succes // inviteSigners  // signForm  // successfulStep

            selectedSideMenuItem:"dc",

            openRightMenu:false,
            selectedDoc:""
        }
    }

    toggleMenu = (e) => {
        e.preventDefault();
        this.setState({isMenuOpened: !this.state.isMenuOpened});
    };

    searchOCR = (text) => event => {

        if (text !== '') {
            this.setState({textSearch: text});
            DocSearchService.login().then(ok => {

                DocSearchService.search({word: text}, ok.data.token).then(res => {

                    //console.log(res);
                    this.setState({resultData: res})

                }).catch(err => console.log(err))

            }).catch(err => console.log(err))

        }
    };

    changeActivePage = (page) => event => {
        if (page !== '') {
            this.setState({
                activePage: page
            })
        }
    };

    setSelectedEntreprise = (sName) => {

        let entreprise = this.state.societies.find(x => x.sName === sName);

        if (entreprise !== undefined && entreprise.type_societe === "SARL") {

            this.setState({
                actioNotSignedDocSatutSARL: [],
                actioNotSignedDocActeConstitutifSARL: [],
                actioNotSignedDocProcurationSARL: [],
                actioNotSignedDocDeclarationSARL: [],
                actioNotSignedDocOptingOutGerantSARL: [],
                actioNotSignedDocRequisitionSARL: [],
                isAllSigneDocStatutSARL: false,
                isAllSigneDocActeConstitutifSARL: false,
                isAllSigneDocProcurationSARL: false,
                isAllSigneDocDeclarationSARL: false,
                isAllSigneDocOptingOutGerantSARL: false,
                isAllSigneDocRequisitionSARL: false,
                selectedEntreprise: entreprise,
                augmCapitalArray: entreprise.augmentationcapital || [],
                cessionActionsArray: entreprise.cessionAction || [],
                loading: false
            });
            setTimeout(() => {
                this.verifDocStatutSignatures();
            }, 1000);

        } else {

            //console.log(entreprise.cessionAction)

            this.setState({
                actioNotSignedDocSatut: [],
                isAllSigneDocStatut: false,
                selectedEntreprise: entreprise,
                augmCapitalArray: entreprise.augmentationcapital || [],
                cessionActionsArray: entreprise.cessionAction || [],
                loading: false
            });
            setTimeout(() => {
                this.verifDocStatutSignatures();
            }, 1000);

        }

    };

    verifDocStatutSignatures() {

        if (this.state.selectedEntreprise.type_societe === "SARL") {

            let allgerants = (this.state.selectedEntreprise.sAdministrator || []);
            let allAssoices = (this.state.selectedEntreprise.sAssociate || []);

            let test1 = false;
            let test2 = false;

            for (let i = 0; i < allgerants.length; i++) {
                if (allgerants[i].signatureStatut === "") test1 = true;
            }
            for (let i = 0; i < allAssoices.length; i++) {
                if (allAssoices[i].signatureStatut === "") test2 = true;
            }

            if (test1 === false) this.setState({isAllGerantsSign: true})
            if (test2 === false) this.setState({isAllAssociesSign: true})


        } else {

            let allActios = (this.state.selectedEntreprise.sActionnairePhy || []).concat(this.state.selectedEntreprise.sActionnaireMoral || []);
            let notSignedActioArray = [];
            let signatures = this.state.selectedEntreprise.signatures || [];
            for (let i = 0; i < allActios.length; i++) {
                let actio = allActios[i];
                let isSignDoc = signatures.find(x => x.actId === actio.id);
                if (isSignDoc === undefined || isSignDoc === null) {
                    notSignedActioArray.push(actio);
                }
            }
            if (notSignedActioArray.length === 0) {

                this.setState({
                    isAllSigneDocStatut: true
                })
            } else {

                this.setState({
                    isAllSigneDocStatut: false,
                    actioNotSignedDocSatut: notSignedActioArray
                })
            }


        }


    }

    showStatutDocument = (uid, pays) => event => {

        this.setState({loading: true});

        if (this.state.selectedEntreprise.statutDocUrl && this.state.selectedEntreprise.statutDocUrl !== "") {
            window.open(this.state.selectedEntreprise.statutDocUrl);
            this.setState({loading: false});
        } else {


            let isAllgerantSignDoc = true;
            let isAllassocieSignDoc = true;

            var gerants = this.state.selectedEntreprise.sAdministrator || [];
            var associes = this.state.selectedEntreprise.sAssociate || [];

            for (let i = 0; i < gerants.length; i++) {
                if (gerants[i].signatureStatut === "") isAllgerantSignDoc = false;
            }
            for (let i = 0; i < associes.length; i++) {
                if (associes[i].signatureStatut === "") isAllassocieSignDoc = false;
            }


            if (isAllgerantSignDoc === true && isAllassocieSignDoc === true) {
                augmCapitalService.getEntrepriseStatut(uid, pays).then(res => {
                    const file = new Blob(
                        [res],
                        {type: 'application/pdf'});

                    firebase.storage().ref("/Suisse/docs").child("Statut" + uid).put(file).then((snapshot) => {
                        snapshot.ref.getDownloadURL().then(url => {
                            firebase.database().ref("/society/" + uid).update({
                                'statutDocUrl': url
                            }).then(ok => {
                                window.open(url);
                                this.setState({loading: false});
                            }).catch(err => console.log(err))
                        })
                    });


                }, err => {
                    console.log(err);
                })

            } else {
                augmCapitalService.getEntrepriseStatut(uid, pays).then(res => {
                    const file = new Blob(
                        [res],
                        {type: 'application/pdf'});
                    const fileURL = URL.createObjectURL(file);
                    window.open(fileURL);
                    this.setState({loading: false});

                }, err => {
                    console.log(err);
                })

            }

        }
    };

    showProcurationDocument = (uid, pays) => event => {

        this.setState({loading: true});

        if (this.state.selectedEntreprise.procurationDocUrl && this.state.selectedEntreprise.procurationDocUrl !== "") {
            window.open(this.state.selectedEntreprise.procurationDocUrl);
            this.setState({loading: false});
        } else {

            let isAllassocieSignDoc = true;
            var associes = this.state.selectedEntreprise.sAssociate || [];

            for (let i = 0; i < associes.length; i++) {
                if (associes[i].signatureStatut === "") isAllassocieSignDoc = false;
            }


            if (isAllassocieSignDoc === true) {
                entrepriseSARLService.GenerateProcuration(uid, pays).then(res => {
                    const file = new Blob(
                        [res],
                        {type: 'application/pdf'});

                    firebase.storage().ref("/Suisse/docs").child("Procuration" + uid).put(file).then((snapshot) => {
                        snapshot.ref.getDownloadURL().then(url => {
                            firebase.database().ref("/society/" + uid).update({
                                'procurationDocUrl': url
                            }).then(ok => {
                                window.open(url);
                                this.setState({loading: false});
                            }).catch(err => console.log(err))
                        })
                    });


                }, err => {
                    console.log(err);
                })

            } else {
                entrepriseSARLService.GenerateProcuration(uid, pays).then(res => {

                    const file = new Blob(
                        [res],
                        {type: 'application/pdf'});
                    const fileURL = URL.createObjectURL(file);
                    window.open(fileURL);
                    this.setState({loading: false});

                }, err => {
                    console.log(err);
                })

            }

        }

    };

    showDeclarationDocument = (uid, pays) => event => {

        this.setState({loading: true});

        if (this.state.selectedEntreprise.declarationDocUrl && this.state.selectedEntreprise.declarationDocUrl !== "") {
            window.open(this.state.selectedEntreprise.declarationDocUrl);
            this.setState({loading: false});
        } else {

            let isAllassocieSignDoc = true;
            var associes = this.state.selectedEntreprise.sAssociate || [];


            for (let i = 0; i < associes.length; i++) {
                if (associes[i].signatureStatut === "") isAllassocieSignDoc = false;
            }


            if (isAllassocieSignDoc === true) {
                entrepriseSARLService.GenerateDeclaration(uid, pays).then(res => {
                    const file = new Blob(
                        [res],
                        {type: 'application/pdf'});

                    firebase.storage().ref("/Suisse/docs").child("Declaration" + uid).put(file).then((snapshot) => {
                        snapshot.ref.getDownloadURL().then(url => {
                            firebase.database().ref("/society/" + uid).update({
                                'declarationDocUrl': url
                            }).then(ok => {
                                window.open(url);
                                this.setState({loading: false});
                            }).catch(err => console.log(err))
                        })
                    });
                }, err => {
                    console.log(err);
                })

            } else {
                entrepriseSARLService.GenerateDeclaration(uid, pays).then(res => {
                    const file = new Blob(
                        [res],
                        {type: 'application/pdf'});
                    const fileURL = URL.createObjectURL(file);
                    window.open(fileURL);
                    this.setState({loading: false});

                }, err => {
                    console.log(err);
                })

            }

        }
    };

    showOptingOutGerantDocument = (uid, pays) => event => {

        this.setState({loading: true});

        if (this.state.selectedEntreprise.optingOutGerantDocUrl && this.state.selectedEntreprise.optingOutGerantDocUrl !== "") {
            window.open(this.state.selectedEntreprise.optingOutGerantDocUrl);
            this.setState({loading: false});
        } else {

            let isAllgerantSignDoc = true;
            var gerants = this.state.selectedEntreprise.sAdministrator || [];

            for (let i = 0; i < gerants.length; i++) {
                if (gerants[i].signatureStatut === "") isAllgerantSignDoc = false;
            }

            if (isAllgerantSignDoc === true) {
                entrepriseSARLService.GenerateOptingOutGerant(uid, pays).then(res => {
                    const file = new Blob(
                        [res],
                        {type: 'application/pdf'});

                    firebase.storage().ref("/Suisse/docs").child("OptingOutGerant" + uid).put(file).then((snapshot) => {
                        snapshot.ref.getDownloadURL().then(url => {
                            firebase.database().ref("/society/" + uid).update({
                                'optingOutGerantDocUrl': url
                            }).then(ok => {
                                window.open(url);
                                this.setState({loading: false});
                            }).catch(err => console.log(err))
                        })
                    });

                }, err => {
                    console.log(err);
                })

            } else {

                entrepriseSARLService.GenerateOptingOutGerant(uid, pays).then(res => {
                    const file = new Blob(
                        [res],
                        {type: 'application/pdf'});
                    const fileURL = URL.createObjectURL(file);
                    window.open(fileURL);
                    this.setState({loading: false});

                }, err => {
                    console.log(err);
                })

            }

        }

    };

    showRequisitionDocument = (uid, pays) => event => {

        this.setState({loading: true});


        if (this.state.selectedEntreprise.requisitionDocUrl && this.state.selectedEntreprise.requisitionDocUrl !== "") {
            window.open(this.state.selectedEntreprise.requisitionDocUrl);
            this.setState({loading: false});
        } else {

            let isAllgerantSignDoc = true;
            var gerants = this.state.selectedEntreprise.sAdministrator || [];

            for (let i = 0; i < gerants.length; i++) {
                if (gerants[i].signatureStatut === "") isAllgerantSignDoc = false;
            }

            if (isAllgerantSignDoc === true) {
                entrepriseSARLService.GenerateRequisition(uid, pays).then(res => {
                    const file = new Blob(
                        [res],
                        {type: 'application/pdf'});

                    firebase.storage().ref("/Suisse/docs").child("Requisition" + uid).put(file).then((snapshot) => {
                        snapshot.ref.getDownloadURL().then(url => {
                            firebase.database().ref("/society/" + uid).update({
                                'requisitionDocUrl': url
                            }).then(ok => {
                                window.open(url);
                                this.setState({loading: false});
                            }).catch(err => console.log(err))
                        })
                    });

                }, err => {
                    console.log(err);
                })

            } else {

                entrepriseSARLService.GenerateRequisition(uid, pays).then(res => {
                    const file = new Blob(
                        [res],
                        {type: 'application/pdf'});
                    const fileURL = URL.createObjectURL(file);
                    window.open(fileURL);
                    this.setState({loading: false});

                }, err => {
                    console.log(err);
                })

            }

        }

    };

    showActeConstitutifDocument = (uid, pays) => event => {

        this.setState({loading: true});

        entrepriseSARLService.GenerateActeConstitutif(uid, pays).then(res => {

            const file = new Blob(
                [res],
                {type: 'application/pdf'});
            const fileURL = URL.createObjectURL(file);
            window.open(fileURL);
            this.setState({loading: false});

        }, err => {
            console.log(err);
        })
    };

    showStockoptionDocument = (titrekey, opkey) => event => {

        this.setState({loading: true});
        augmCapitalService.getBSASuisseDoc(localStorage.getItem("uid") + "Suisse", titrekey, opkey).then(res => {

            const file = new Blob(
                [res],
                {type: 'application/pdf'});
            const fileURL = URL.createObjectURL(file);
            window.open(fileURL);
            this.setState({loading: false});

        }, err => {
            console.log(err);
        })
    };

    showCessionActionDoc = (idCession) => event => {

        this.setState({
            showPDFModal: true,
            pdfURL: "http://51.158.97.220:3002/api/generateContrat/" + localStorage.getItem("uid") + "Suisse/" + idCession
        });
    };

    showDocInPdfModal = (url) => event => {

        this.setState({
            openRightMenu:false,
            showPDFModal: true,
            pdfURL: url
        });
    };

    showSARLStatutAugmDocument = (key) => event => {
        this.setState({loading: true});
        let uid = this.state.selectedEntreprise.uniqueId;
        augmCapitalService.getSARLStatut_Augm(uid, key).then(res => {
            const file = new Blob(
                [res],
                {type: 'application/pdf'});
            const fileURL = URL.createObjectURL(file);
            window.open(fileURL);
            this.setState({loading: false});
        }, err => {
            console.log(err);
        })
    };

    showSARLRapportAugmDocument = (key) => event => {
        this.setState({loading: true});
        let uid = this.state.selectedEntreprise.uniqueId;
        augmCapitalService.getSARLrapport_Augm(uid, key).then(res => {
            const file = new Blob(
                [res],
                {type: 'application/pdf'});
            const fileURL = URL.createObjectURL(file);
            window.open(fileURL);
            this.setState({loading: false});
        }, err => {
            console.log(err);
        })
    };

    showSARLDeclarationAugmDocument = (key) => event => {
        this.setState({loading: true});
        let uid = this.state.selectedEntreprise.uniqueId;
        augmCapitalService.getSARLDeclarationAugm(uid, key).then(res => {
            const file = new Blob(
                [res],
                {type: 'application/pdf'});
            const fileURL = URL.createObjectURL(file);
            window.open(fileURL);
            this.setState({loading: false});
        }, err => {
            console.log(err);
        })
    };

    showSARLRequisistionAugmDocument = (key) => event => {
        this.setState({loading: true});
        let uid = this.state.selectedEntreprise.uniqueId;
        augmCapitalService.getSARLrequisitionAugm(uid, key).then(res => {
            const file = new Blob(
                [res],
                {type: 'application/pdf'});
            const fileURL = URL.createObjectURL(file);
            window.open(fileURL);
            this.setState({loading: false});
        }, err => {
            console.log(err);
        })
    };

    showSARLPvAGEAugmDocument = (key) => event => {
        this.setState({loading: true});
        let uid = this.state.selectedEntreprise.uniqueId;
        augmCapitalService.getSARLPvAGEAugm(uid, key).then(res => {
            const file = new Blob(
                [res],
                {type: 'application/pdf'});
            const fileURL = URL.createObjectURL(file);
            window.open(fileURL);
            this.setState({loading: false});
        }, err => {
            console.log(err);
        })
    };

    signDocWithGeneve = (name) => event => {
        //this.openSnackbar('warning', "En attente d'acceptation...");
        this.setState({loading: true});
        entrepriseSARLService.getDocSARLDocDigest(name, localStorage.getItem("uid") + "Suisse", "Suisse").then(res => {
            console.log(res);
            entrepriseSARLService.loginGeneve().then(auth => {
                console.log("OK22 " + auth.data.jwt);
                console.log(this.state.userGFirstname);
                console.log(this.state.userGId);
                console.log(this.state.userGLastname);
                entrepriseSARLService.signGeneveDoc(name + "-SARLAugm-" + moment().format("HH-ss"), res.digest, auth.data.jwt, this.state.userGId, this.state.userGFirstname, this.state.userGLastname).then(r => {
                    //console.log("OK3" +r);
                    if (r.succes === true) {

                        if (r.data.SignatureResponse.ipfsHash !== null && r.data.SignatureResponse.ipfsHash !== undefined) {

                            if (name === "Statut") {
                                firebase.database().ref('society/' + localStorage.getItem("uid" + "Suisse")).update({
                                    'ipfsHashStatutAugm': r.data.SignatureResponse.ipfsHash
                                }).then(data => {
                                    this.setState({loadingBtnStatut: false});
                                    this.openSnackbar('success', "La signature est bien acceptée");
                                }).catch(function (error) {
                                    alert(error);
                                });
                            }
                            if (name === "RapportAugm") {
                                firebase.database().ref('society/' + localStorage.getItem("uid") + "Suisse").update({
                                    'ipfsHashRapportAugm': r.data.SignatureResponse.ipfsHash
                                }).then(data => {
                                    this.setState({loadingBtnStatut: false});
                                    this.openSnackbar('success', "La signature est bien acceptée");
                                }).catch(function (error) {
                                    alert(error);
                                });
                            }
                            if (name === "Declaration") {
                                firebase.database().ref('society/' + localStorage.getItem("uid") + "Suisse").update({
                                    'ipfsHashDecAugm': r.data.SignatureResponse.ipfsHash
                                }).then(data => {
                                    this.setState({loadingBtnDec: false});
                                    this.openSnackbar('success', "La signature est bien acceptée");
                                }).catch(function (error) {
                                    alert(error);
                                });
                            }
                            if (name === "Requisition") {
                                firebase.database().ref('society/' + localStorage.getItem("uid") + "Suisse").update({
                                    'ipfsHashReqAugm': r.data.SignatureResponse.ipfsHash
                                }).then(data => {
                                    this.setState({loadingBtnReq: false});
                                    this.openSnackbar('success', "La signature est bien acceptée");
                                }).catch(function (error) {
                                    alert(error);
                                });
                            }
                            if (name === "PvAGE") {
                                firebase.database().ref('society/' + localStorage.getItem("uid") + "Suisse").update({
                                    'ipfsHashPvAgeAugm': r.data.SignatureResponse.ipfsHash
                                }).then(data => {
                                    this.setState({loadingBtnActe: false});
                                    this.openSnackbar('success', "La signature est bien acceptée");
                                }).catch(function (error) {
                                    alert(error);
                                });
                            }

                        } else {
                            this.setState({loading: false});
                            this.openSnackbar('error', "Signature non acceptée");
                        }
                    } else {
                        this.setState({loading: false});
                        this.openSnackbar('error', "Une erreur est survenue !");
                    }

                }).catch(err => {
                    this.setState({loading: false});
                    this.openSnackbar('error', "Une erreur est survenue !");
                    console.log(err);
                })

            }).catch(err => {
                this.setState({loading: false});
                this.openSnackbar('error', "Une erreur est survenue !");
                console.log(err);
            });

        }).catch(err => {
            this.setState({
                loadingBtnStatut: false,
                loadingBtnProc: false,
                loadingBtnDec: false,
                loadingBtnOpt: false,
                loadingBtnReq: false,
                loadingBtnActe: false
            })
            this.openSnackbar('error', "Une erreur est survenue !");
            console.log(err);
        })

    };

    sendSARLSuisseInvitationToSign = (email, index, type) => event => {

        let subject = "Demande de signature sur SmartCo.link";
        let msg = "Bonjour, " + "<br/><br/><br/>" +
            "Vous etes invité par l'administrateur de la société <b>" + this.state.selectedEntreprise.sName + "</b> ou vous etes actionnaire pour signer des documents éléctroniquement." + "<br/><br/>" +
            "Pour signer vos documents, veuillez cliquer sur le lien ci-dessous:" + "<br/><br/>";

        let linkUrl = "Signer ->";
        let url = "http://51.15.229.251:88/signature/SARL/" + this.state.selectedEntreprise.uniqueId + "/" + type + "/" + index + "/by/" + localStorage.getItem("email");

        let footerMsg = "<br/><br/>" + "A très bientôt,<br/><br/><br/>" + "<b>L'équipe SmartCo.link</b>";

        emailService.sendInvitation({
            emailReciver: email,
            subject: subject,
            linkUrl: linkUrl,
            url: url,
            msg: msg,
            footerMsg: footerMsg
        }).then(result => {
            console.log("EMAIL SENDED");
            this.openSnackbar('success', "Un mail de demande de signature est bien envoyé à " + email);
        }, err => {
            console.log(err);
            this.openSnackbar('error', "Une erreur est parvenue lors de l'envoi du demande de signature ! Veuillez réessayer une autre fois ");
        })

    };


    componentDidMount() {

        if (localStorage.getItem('uid') === undefined || localStorage.getItem('uid') === null) {
            this.props.history.push('/login')
        } else {
            this.setState({loading: true});
            let uid = localStorage.getItem('uid');
            let userUid = uid.replace('Suisse', '');

            firebase.database().ref('/users/' + userUid).on('value', (snapshot) => {
                let user = snapshot.val();
                //console.log(user);
                this.setState({
                    userUid: userUid,
                    userGId: user.idGeneve,
                    userGFirstname: user.firstnameG,
                    userGLastname: user.lastnameG
                })
            });

            firebase.database().ref('/society').on('value', (snapshot) => {
                const societies = snapshot.val() || [];
                const societiesArray = Object.entries(societies).map((e) => ({[e[0]]: e[1]}));
                let userSocieties = [];
                for (let i = 0; i < societiesArray.length; i++) {
                    if (Object.keys(societiesArray[i])[0] === uid + "Suisse") {

                        societiesArray[i][uid + "Suisse"].uniqueId = uid + 'Suisse';
                        societiesArray[i][uid + "Suisse"].paysOrigine = 'Suisse';
                        userSocieties.push(societiesArray[i][uid + "Suisse"])
                    }
                    if (Object.keys(societiesArray[i])[0] === uid + "France") {

                        societiesArray[i][uid + "France"].uniqueId = uid + 'France';
                        societiesArray[i][uid + "France"].paysOrigine = 'France';
                        userSocieties.push(societiesArray[i][uid + "France"])
                    }
                    if (Object.keys(societiesArray[i])[0] === uid + "tunisie") {

                        societiesArray[i][uid + "tunisie"].uniqueId = uid + 'tunisie';
                        societiesArray[i][uid + "tunisie"].paysOrigine = 'tunisie';
                        userSocieties.push(societiesArray[i][uid + "tunisie"])
                    }
                }
                this.setState({
                    societies: userSocieties,
                });
                if (userSocieties.length > 0) {
                    let documents = (userSocieties[0].documents) || [];
                    setTimeout(() => {
                        console.log(documents)
                        this.setState({documents:documents})
                        this.setSelectedEntreprise(userSocieties[0].sName);
                    }, 1000)
                } else {

                }


            });


        }

    }

    convetHtmlToBase64 = (divId) => event =>  {
        htmlToImage.toPng(document.getElementById(divId))
            .then(function (dataUrl) {
                console.log(dataUrl);
            })
    }

    render() {

        let uid = localStorage.getItem("uid") + "Suisse";
        let nbSO_docs = 0;
        (this.state.selectedEntreprise.titresBSA || []).map((titreBSA, titreKey) => {
            (titreBSA.operations || []).map((op, opKey) => {
                nbSO_docs = nbSO_docs + 1;
            })
        });


        return (
            <div>
                <TopBar logo={logo} height={90} onClickMenuIcon={() => this.setState({openSideMenu:true})}/>
                <SideMenu logo={logo} items={data.sideBarItems} iconColor={"blue"} textColor={"#65728E"} history={this.props.history}
                          opened={this.state.openSideMenu} onClose={() => this.setState({openSideMenu:false})} />
                <SideBar items={data.sideBarItems} width={100} selectedItem={this.state.selectedSieMenuItem} activeColor={"blue"} disabledColor={"#65728E"}
                         updateSelected={(item) => this.setState({selectedSieMenuItem:item})} history={this.props.history} />
                {
                    this.state.loading === true ?
                        <div className="centered-text">
                            <ReactLoading type={"bars"} color={"red"}/>
                        </div> :

                        <div style={{paddingLeft:100,marginRight:50}}>

                            {
                                this.state.resultData !== "" &&
                                <SearchResults data={this.state.resultData} textSearch={this.state.textSearch}/>
                            }


                            <div>
                                <div style={{display:"flex"}}>
                                    {
                                        this.state.showUploadStep === "" &&
                                        <div style={{height:"100%"}}>
                                            <div >
                                                <div style={{width:240,marginLeft:20,marginTop:40}}>
                                                    <div className="cf_item">
                                                        <div onClick={()=> this.setState({selectedSideMenuItem:"mv"})}
                                                             className={this.state.selectedSideMenuItem === "mv" ? "cf_item_button cf_item_button_active" :"cf_item_button"}>
                                                            Mouvement de titres
                                                        </div>
                                                    </div>
                                                    <div className="cf_item">
                                                        <div onClick={()=> this.setState({selectedSideMenuItem:"cj"})}
                                                             className={this.state.selectedSideMenuItem === "cj" ? "cf_item_button cf_item_button_active" :"cf_item_button"}>
                                                            Contrats & Justificatifs
                                                        </div>
                                                    </div>
                                                    <div className="cf_item">
                                                        <div onClick={()=> this.setState({selectedSideMenuItem:"dc"})}
                                                             className={this.state.selectedSideMenuItem === "dc" ? "cf_item_button cf_item_button_active" :"cf_item_button"}>
                                                            Document constitutifs
                                                        </div>
                                                    </div>
                                                    <div className="cf_item">
                                                        <div onClick={()=> this.setState({selectedSideMenuItem:"ag"})}
                                                             className={this.state.selectedSideMenuItem === "ag" ? "cf_item_button cf_item_button_active" :"cf_item_button"}>
                                                            AG
                                                        </div>
                                                    </div>
                                                    <div className="cf_item">
                                                        <div onClick={()=> this.setState({selectedSideMenuItem:"pv"})}
                                                             className={this.state.selectedSideMenuItem === "pv" ? "cf_item_button cf_item_button_active" :"cf_item_button"}>
                                                            PV
                                                        </div>
                                                    </div>
                                                    <div className="cf_item">
                                                        <div onClick={()=> this.setState({selectedSideMenuItem:"ad"})}
                                                             className={this.state.selectedSideMenuItem === "ad" ? "cf_item_button cf_item_button_active" :"cf_item_button"}>
                                                            Autres documents
                                                        </div>
                                                    </div>
                                                </div>
                                                <div align="center" style={{position:"fixed",bottom:80,marginLeft:95}}>
                                                    <button className="btn btn-sm btn-info" style={{borderRadius:50}} onClick={()=>this.setState({showUploadStep:"upload"})}>
                                                        <i className="mdi mdi-plus text-white" style={{fontSize:32,fontWeight:900}}/>
                                                    </button>
                                                </div>

                                            </div>

                                        </div>

                                    }

                                    <div style={{flexWrap:"wrap",flex:"1 1 auto"}}>

                                                 {
                                                     this.state.selectedEntreprise.paysOrigine === "Suisse" &&
                                                     <div className="card">
                                                         <div className="card-body" style={{minHeight: 750}}>

                                                             {
                                                                 this.state.showUploadStep === "" &&
                                                                 <div>
                                                                     {
                                                                         this.state.selectedSideMenuItem === "mv" &&
                                                                         <div>
                                                                             <h4 className="mt-0 mb-1">Stock Option</h4>
                                                                             <h6><i className="fa fa-paperclip mb-1"/> Documents <span>({nbSO_docs})</span>
                                                                             </h6>
                                                                             <div className="file-box-content">

                                                                                 {
                                                                                     (this.state.selectedEntreprise.titresBSA || []).map((titreBSA, titreKey) => (

                                                                                         (titreBSA.operations || []).map((op, opKey) => (

                                                                                             titreBSA.bfname = titreBSA.beneficiaire.ej_name === "" ?
                                                                                                 titreBSA.beneficiaire.firstname + " " + titreBSA.beneficiaire.lastname : titreBSA.beneficiaire.ej_name,


                                                                                                 <div className="file-box"
                                                                                                      key={opKey}>
                                                                                                     <a className="download-icon-link">
                                                                                                         <i className="dripicons-download file-download-icon"
                                                                                                            onClick={this.showStockoptionDocument(titreKey, opKey)}
                                                                                                            style={{cursor: "pointer"}}/>
                                                                                                     </a>
                                                                                                     <div className="text-center">
                                                                                                         <i className="far fa-file-pdf text-danger"
                                                                                                            style={{cursor: "pointer"}}
                                                                                                            onClick={() => this.props.history.push("/coffre-fort/stockOption/" + titreKey + "/" + opKey + "/" + titreBSA.bfname)}/>
                                                                                                         <h6 className="text-truncate">SO_{titreBSA.bfname}.pdf</h6>
                                                                                                         <small
                                                                                                             className="text-muted">{moment(op.dateMAJ).format("DD MMM YYYY")} /
                                                                                                             4MB</small>
                                                                                                     </div>
                                                                                                 </div>

                                                                                         ))
                                                                                     ))
                                                                                 }


                                                                             </div>

                                                                             <div className="row">
                                                                                 <div className="col-12">
                                                                                     <h4 className="mb-1 mt-3">Cession d'action</h4>
                                                                                     <h6><i
                                                                                         className="fa fa-paperclip mb-1"/> Documents <span>({this.state.cessionActionsArray.length})</span>
                                                                                     </h6>
                                                                                 </div>
                                                                             </div>

                                                                             <div className="file-box-content">
                                                                                 {
                                                                                     this.state.cessionActionsArray.map((item, key) => (
                                                                                         <div className="file-box" key={key}>
                                                                                             <a className="download-icon-link"
                                                                                                download={"CessionAction_" + item.cedant.nomPrenom + "_" + item.cessionnaire.nomPrenom + ".pdf"}
                                                                                                href={"http://51.158.97.220:3002/api/generateContrat/" + localStorage.getItem("uid") + "Suisse/" + key}>
                                                                                                 <i className="dripicons-download file-download-icon"
                                                                                                    style={{cursor: "pointer"}}/>
                                                                                             </a>
                                                                                             <div className="text-center">
                                                                                                 <i className="far fa-file-pdf text-danger"
                                                                                                    style={{cursor: "pointer"}}
                                                                                                    onClick={this.showCessionActionDoc(key)}/>
                                                                                                 <h6 className="text-truncate">
                                                                                                     CessionAction_{item.cedant.nomPrenom + "_" + item.cessionnaire.nomPrenom}
                                                                                                 </h6>
                                                                                                 <small
                                                                                                     className="text-muted">{moment(item.basetaxable.date).format("DD MMM YYYY")} /
                                                                                                     2.5MB</small>
                                                                                             </div>
                                                                                         </div>

                                                                                     ))
                                                                                 }
                                                                             </div>

                                                                         </div>
                                                                     }
                                                                     {
                                                                         this.state.selectedSideMenuItem === "ag" &&
                                                                         <div>
                                                                             <h4 className="mt-0 header-title mb-3">Augmentation
                                                                                 Capital</h4>


                                                                             <div className="file-box-content">
                                                                                 {
                                                                                     (this.state.selectedEntreprise.augmCapital || []).map((item, key) => (

                                                                                         <div key={key}>
                                                                                             <div className="row mb-1">
                                                                                                 <div className="col-md-12">
                                                                                                     <h6>Augmentation de capital
                                                                                                         du {moment(item.dateCreation).format("DD MMMM YYYY")}</h6>
                                                                                                     <span style={{color: "grey"}}>Agio d'émission: <span
                                                                                                         style={{color: "#000"}}>{item.agio}</span></span><br/>
                                                                                                 </div>
                                                                                             </div>

                                                                                             <div className="file-box">
                                                                                                 <a className="download-icon-link"
                                                                                                    onClick={() => this.props.history.push("/detailsDoc",
                                                                                                        {
                                                                                                            societe: this.state.selectedEntreprise,
                                                                                                            typeDoc: "StatutAugm",
                                                                                                            isSignedByAllGerants: this.state.isAllGerantsSign,
                                                                                                            isSignedByAllAssocies: this.state.isAllAssociesSign
                                                                                                        })}>
                                                                                                     <i className="dripicons-export file-download-icon1"
                                                                                                        style={{cursor: "pointer"}}/>
                                                                                                 </a>
                                                                                                 <a className="download-icon-link"
                                                                                                    onClick={this.showSARLStatutAugmDocument(key)}>
                                                                                                     <i className="dripicons-download file-download-icon2"
                                                                                                        style={{cursor: "pointer"}}/>
                                                                                                 </a>
                                                                                                 <div className="text-center">
                                                                                                     <i className="far fa-file-pdf text-danger"
                                                                                                        onClick={this.showDocInPdfModal(endpoint + "/generateSARLStatusAfterAugmCapital/" + uid + "/" + key)}
                                                                                                        style={{cursor: "pointer"}}
                                                                                                     />
                                                                                                     <h6 className="text-truncate">
                                                                                                         Statut_Augm
                                                                                                     </h6>
                                                                                                     <small
                                                                                                         className="text-muted">{moment(item.date_ass_genrale).format("DD MMM YYYY")} /
                                                                                                         2.1MB</small>
                                                                                                 </div>
                                                                                             </div>
                                                                                             <div className="file-box">
                                                                                                 <a className="download-icon-link"
                                                                                                    onClick={() => this.props.history.push("/detailsDoc",
                                                                                                        {
                                                                                                            societe: this.state.selectedEntreprise,
                                                                                                            typeDoc: "RapportAugm",
                                                                                                            isSignedByAllGerants: this.state.isAllGerantsSign,
                                                                                                            isSignedByAllAssocies: this.state.isAllAssociesSign
                                                                                                        })}>
                                                                                                     <i className="dripicons-export file-download-icon1"
                                                                                                        style={{cursor: "pointer"}}/>
                                                                                                 </a>
                                                                                                 <a className="download-icon-link"
                                                                                                    onClick={this.showSARLRapportAugmDocument(key)}>
                                                                                                     <i className="dripicons-download file-download-icon2"
                                                                                                        style={{cursor: "pointer"}}/>
                                                                                                 </a>
                                                                                                 <div className="text-center">
                                                                                                     <i className="far fa-file-pdf text-danger"
                                                                                                        style={{cursor: "pointer"}}
                                                                                                        onClick={this.showDocInPdfModal(endpoint + "/generateRapportAugmCapital/" + uid + "/" + key)}
                                                                                                     />
                                                                                                     <h6 className="text-truncate">
                                                                                                         Rapport_Augm
                                                                                                     </h6>
                                                                                                     <small
                                                                                                         className="text-muted">{moment(item.date_ass_genrale).format("DD MMM YYYY")} /
                                                                                                         2.2MB</small>
                                                                                                 </div>
                                                                                             </div>
                                                                                             <div className="file-box">
                                                                                                 <a className="download-icon-link"
                                                                                                    onClick={() => this.props.history.push("/detailsDoc",
                                                                                                        {
                                                                                                            societe: this.state.selectedEntreprise,
                                                                                                            typeDoc: "DeclAugm",
                                                                                                            isSignedByAllGerants: this.state.isAllGerantsSign,
                                                                                                            isSignedByAllAssocies: this.state.isAllAssociesSign
                                                                                                        })}>
                                                                                                     <i className="dripicons-export file-download-icon1"
                                                                                                        style={{cursor: "pointer"}}/>
                                                                                                 </a>
                                                                                                 <a className="download-icon-link"
                                                                                                    onClick={this.showSARLDeclarationAugmDocument(key)}>
                                                                                                     <i className="dripicons-download file-download-icon2"
                                                                                                        style={{cursor: "pointer"}}/>
                                                                                                 </a>
                                                                                                 <div className="text-center">
                                                                                                     <i className="far fa-file-pdf text-danger"
                                                                                                        style={{cursor: "pointer"}}
                                                                                                        onClick={this.showDocInPdfModal(endpoint + "/generateDeclarationAfterAugmCapital/" + uid + "/" + key)}
                                                                                                     />
                                                                                                     <h6 className="text-truncate">
                                                                                                         Déclaration I,II
                                                                                                     </h6>
                                                                                                     <small
                                                                                                         className="text-muted">{moment(item.date_ass_genrale).format("DD MMM YYYY")} /
                                                                                                         1.9MB</small>
                                                                                                 </div>
                                                                                             </div>
                                                                                             <div className="file-box">
                                                                                                 <a className="download-icon-link"
                                                                                                    onClick={() => this.props.history.push("/detailsDoc",
                                                                                                        {
                                                                                                            societe: this.state.selectedEntreprise,
                                                                                                            typeDoc: "RequisitionAugm",
                                                                                                            isSignedByAllGerants: this.state.isAllGerantsSign,
                                                                                                            isSignedByAllAssocies: this.state.isAllAssociesSign
                                                                                                        })}>
                                                                                                     <i className="dripicons-export file-download-icon1"
                                                                                                        style={{cursor: "pointer"}}/>
                                                                                                 </a>
                                                                                                 <a className="download-icon-link">
                                                                                                     <i className="dripicons-download file-download-icon2"
                                                                                                        onClick={this.showSARLRequisistionAugmDocument(key)}
                                                                                                        style={{cursor: "pointer"}}/>
                                                                                                 </a>
                                                                                                 <div className="text-center">
                                                                                                     <i className="far fa-file-pdf text-danger"
                                                                                                        style={{cursor: "pointer"}}
                                                                                                        onClick={this.showDocInPdfModal(endpoint + "/generateAgeSARLRequis/" + uid + "/" + key)}
                                                                                                     />
                                                                                                     <h6 className="text-truncate">
                                                                                                         Réquisition
                                                                                                     </h6>
                                                                                                     <small
                                                                                                         className="text-muted">{moment(item.date_ass_genrale).format("DD MMM YYYY")} /
                                                                                                         1.7MB</small>
                                                                                                 </div>
                                                                                             </div>
                                                                                             <div className="file-box">
                                                                                                 <a className="download-icon-link"
                                                                                                    onClick={() => this.props.history.push("/detailsDoc",
                                                                                                        {
                                                                                                            societe: this.state.selectedEntreprise,
                                                                                                            typeDoc: "PvAgeAugm",
                                                                                                            isSignedByAllGerants: this.state.isAllGerantsSign,
                                                                                                            isSignedByAllAssocies: this.state.isAllAssociesSign
                                                                                                        })}>
                                                                                                     <i className="dripicons-export file-download-icon1"
                                                                                                        style={{cursor: "pointer"}}/>
                                                                                                 </a>
                                                                                                 <a className="download-icon-link"
                                                                                                    onClick={this.showSARLPvAGEAugmDocument(key)}>
                                                                                                     <i className="dripicons-download file-download-icon2"
                                                                                                        style={{cursor: "pointer"}}/>
                                                                                                 </a>
                                                                                                 <div className="text-center">
                                                                                                     <i className="far fa-file-pdf text-danger"
                                                                                                        style={{cursor: "pointer"}}
                                                                                                        onClick={this.showDocInPdfModal(endpoint + "/generatePvAGEAugmCapital/" + uid + "/" + key)}
                                                                                                     />
                                                                                                     <h6 className="text-truncate">
                                                                                                         PV_AGE
                                                                                                     </h6>
                                                                                                     <small
                                                                                                         className="text-muted">{moment(item.date_ass_genrale).format("DD MMM YYYY")} /
                                                                                                         1.4MB</small>
                                                                                                 </div>
                                                                                             </div>
                                                                                         </div>

                                                                                     ))
                                                                                 }
                                                                             </div>

                                                                         </div>

                                                                     }
                                                                     {
                                                                         this.state.selectedSideMenuItem === "dc" &&
                                                                         <div>
                                                                             <h4 className="mt-0 mb-1">Statut...</h4>
                                                                             <h6><i
                                                                                 className="fa fa-paperclip mb-1"/> Documents <span>(7)</span>
                                                                             </h6>

                                                                             <div className="file-box-content">

                                                                                 <div className="file-box">
                                                                                     <a className="download-icon-link"
                                                                                        onClick={() => this.props.history.push("/detailsDoc",
                                                                                            {
                                                                                                societe: this.state.selectedEntreprise,
                                                                                                typeDoc: "Statut",
                                                                                                isSignedByAllGerants: this.state.isAllGerantsSign,
                                                                                                isSignedByAllAssocies: this.state.isAllAssociesSign
                                                                                            })}>
                                                                                         <i className="dripicons-export file-download-icon1"
                                                                                            style={{cursor: "pointer"}}/>
                                                                                     </a>
                                                                                     <a className="download-icon-link"
                                                                                        onClick={this.showStatutDocument(this.state.selectedEntreprise.uniqueId, this.state.selectedEntreprise.paysOrigine)}>
                                                                                         <i className="dripicons-download file-download-icon2"
                                                                                            style={{cursor: "pointer"}}/>
                                                                                     </a>
                                                                                     <div className="text-center">
                                                                                         <i className="far fa-file-pdf text-danger"
                                                                                            onClick={this.showDocInPdfModal("http://51.158.97.220:3001/api/getword/" + uid + "/" + "Suisse")}
                                                                                            style={{cursor: "pointer"}}
                                                                                         />
                                                                                         <h6 className="text-truncate">
                                                                                             Statut_Société
                                                                                         </h6>
                                                                                         <small
                                                                                             className="text-muted">{moment(this.state.selectedEntreprise.dateCreation).format("DD MMM YYYY")} /
                                                                                             3.5MB</small>
                                                                                     </div>
                                                                                 </div>

                                                                                 <div className="file-box">
                                                                                     <a className="download-icon-link"
                                                                                        onClick={() => this.props.history.push("/detailsDoc",
                                                                                            {
                                                                                                societe: this.state.selectedEntreprise,
                                                                                                typeDoc: "Procuration",
                                                                                                isSignedByAllGerants: this.state.isAllGerantsSign,
                                                                                                isSignedByAllAssocies: this.state.isAllAssociesSign
                                                                                            })}>
                                                                                         <i className="dripicons-export file-download-icon1"
                                                                                            style={{cursor: "pointer"}}/>
                                                                                     </a>
                                                                                     <a className="download-icon-link"
                                                                                        onClick={this.showProcurationDocument(this.state.selectedEntreprise.uniqueId, this.state.selectedEntreprise.paysOrigine)}>
                                                                                         <i className="dripicons-download file-download-icon2"
                                                                                            style={{cursor: "pointer"}}/>
                                                                                     </a>
                                                                                     <div className="text-center">
                                                                                         <i className="far fa-file-pdf text-danger"
                                                                                            onClick={this.showDocInPdfModal("http://51.158.97.220:3001/api/GenerateProcuration/" + uid + "/" + "Suisse")}
                                                                                            style={{cursor: "pointer"}}
                                                                                         />
                                                                                         <h6 className="text-truncate">
                                                                                             Procuration
                                                                                         </h6>
                                                                                         <small
                                                                                             className="text-muted">{moment(this.state.selectedEntreprise.dateCreation).format("DD MMM YYYY")} /
                                                                                             3.5MB</small>
                                                                                     </div>
                                                                                 </div>

                                                                                 <div className="file-box">
                                                                                     <a className="download-icon-link"
                                                                                        onClick={() => this.props.history.push("/detailsDoc",
                                                                                            {
                                                                                                societe: this.state.selectedEntreprise,
                                                                                                typeDoc: "Déclaration.i.ii",
                                                                                                isSignedByAllGerants: this.state.isAllGerantsSign,
                                                                                                isSignedByAllAssocies: this.state.isAllAssociesSign
                                                                                            })}>
                                                                                         <i className="dripicons-export file-download-icon1"
                                                                                            style={{cursor: "pointer"}}/>
                                                                                     </a>
                                                                                     <a className="download-icon-link"
                                                                                        onClick={this.showDeclarationDocument(this.state.selectedEntreprise.uniqueId, this.state.selectedEntreprise.paysOrigine)}>
                                                                                         <i className="dripicons-download file-download-icon2"
                                                                                            style={{cursor: "pointer"}}/>
                                                                                     </a>
                                                                                     <div className="text-center">
                                                                                         <i className="far fa-file-pdf text-danger"
                                                                                            onClick={this.showDocInPdfModal("http://51.158.97.220:3001/api/GenerateDeclaration/" + uid + "/" + "Suisse")}
                                                                                            style={{cursor: "pointer"}}
                                                                                         />
                                                                                         <h6 className="text-truncate">
                                                                                             Déclaration I,II
                                                                                         </h6>
                                                                                         <small
                                                                                             className="text-muted">{moment(this.state.selectedEntreprise.dateCreation).format("DD MMM YYYY")} /
                                                                                             3.5MB</small>
                                                                                     </div>
                                                                                 </div>

                                                                             </div>

                                                                             <div className="row ml-4 mt-2">

                                                                                 <div className="col-sm-9 mt-2"
                                                                                      style={{marginTop: 15}}>

                                                                                     <div className="card">
                                                                                         <div className="card-body">
                                                                                             {
                                                                                                 this.state.isAllAssociesSign === true ?
                                                                                                     <div className="text-center">
                                                                                        <span
                                                                                            className="badge bg-soft-success text-success p-1"
                                                                                            style={{
                                                                                                marginTop: 15,
                                                                                                fontSize: "0.7rem"
                                                                                            }}>
                                                                                          les documents sont bien signés par tous les associés
                                                                                        </span>
                                                                                                     </div> :
                                                                                                     <h4 style={{fontWeight: 'bold'}}
                                                                                                         className="header-title mt-0 mb-3">
                                                                                                         En attente de signature des
                                                                                                         associés :
                                                                                                     </h4>
                                                                                             }
                                                                                             <ul className="list-unsyled m-0 pl-0 transaction-history ml-3">
                                                                                                 {
                                                                                                     (this.state.selectedEntreprise.sAssociate || []).map((actio, key) => (

                                                                                                         actio.fullname = actio.firstname + " " + actio.lastname,
                                                                                                         actio.signatureStatut === "" &&
                                                                                                         <li key={key}
                                                                                                             className="align-items-center d-flex justify-content-between">
                                                                                                             <div className="media">
                                                                                                                 <div
                                                                                                                     className="media-body align-self-center">
                                                                                                                     <div
                                                                                                                         className="transaction-data">
                                                                                                                         <h3 className="m-0">{actio.ej_name && actio.ej_name !== "" ? actio.ej_name : actio.fullname} </h3>
                                                                                                                         <p className="text-muted mb-0">{actio.email} </p>
                                                                                                                     </div>
                                                                                                                 </div>
                                                                                                             </div>
                                                                                                             <div  //888
                                                                                                                 className="transaction-icon">
                                                                                                                 <i className="mdi mdi-contact-mail"
                                                                                                                    onClick={this.sendSARLSuisseInvitationToSign(actio.email, key, "associe")}
                                                                                                                    style={{
                                                                                                                        cursor: 'pointer',
                                                                                                                        color: "crimson"
                                                                                                                    }}>
                                                                                                                 </i>&nbsp;&nbsp;
                                                                                                                 <i className="mdi mdi-message-reply-text"
                                                                                                                    style={{
                                                                                                                        cursor: 'pointer',
                                                                                                                        color: "cornflowerblue"
                                                                                                                    }}>
                                                                                                                 </i>
                                                                                                             </div>
                                                                                                         </li>
                                                                                                     ))
                                                                                                 }
                                                                                             </ul>
                                                                                         </div>
                                                                                     </div>

                                                                                 </div>


                                                                             </div>


                                                                             <div className="file-box-content">

                                                                                 <div className="file-box">
                                                                                     <a className="download-icon-link"
                                                                                        onClick={() => this.props.history.push("/detailsDoc",
                                                                                            {
                                                                                                societe: this.state.selectedEntreprise,
                                                                                                typeDoc: "Statut",
                                                                                                isSignedByAllGerants: this.state.isAllGerantsSign,
                                                                                                isSignedByAllAssocies: this.state.isAllAssociesSign
                                                                                            })}>
                                                                                         <i className="dripicons-export file-download-icon1"
                                                                                            style={{cursor: "pointer"}}/>
                                                                                     </a>
                                                                                     <a className="download-icon-link"
                                                                                        onClick={this.showStatutDocument(this.state.selectedEntreprise.uniqueId, this.state.selectedEntreprise.paysOrigine)}>
                                                                                         <i className="dripicons-download file-download-icon2"
                                                                                            style={{cursor: "pointer"}}/>
                                                                                     </a>
                                                                                     <div className="text-center">
                                                                                         <i className="far fa-file-pdf text-danger"
                                                                                            onClick={this.showDocInPdfModal("http://51.158.97.220:3001/api/getword/" + uid + "/" + "Suisse")}
                                                                                            style={{cursor: "pointer"}}
                                                                                         />
                                                                                         <h6 className="text-truncate">
                                                                                             Statut_Société
                                                                                         </h6>
                                                                                         <small
                                                                                             className="text-muted">{moment(this.state.selectedEntreprise.dateCreation).format("DD MMM YYYY")} /
                                                                                             3.5MB</small>
                                                                                     </div>
                                                                                 </div>

                                                                                 <div className="file-box">
                                                                                     <a className="download-icon-link"
                                                                                        onClick={() => this.props.history.push("/detailsDoc",
                                                                                            {
                                                                                                societe: this.state.selectedEntreprise,
                                                                                                typeDoc: "OptingOutGerant",
                                                                                                isSignedByAllGerants: this.state.isAllGerantsSign,
                                                                                                isSignedByAllAssocies: this.state.isAllAssociesSign
                                                                                            })}>
                                                                                         <i className="dripicons-export file-download-icon1"
                                                                                            style={{cursor: "pointer"}}/>
                                                                                     </a>
                                                                                     <a className="download-icon-link"
                                                                                        onClick={this.showOptingOutGerantDocument(this.state.selectedEntreprise.uniqueId, this.state.selectedEntreprise.paysOrigine)}>
                                                                                         <i className="dripicons-download file-download-icon2"
                                                                                            style={{cursor: "pointer"}}/>
                                                                                     </a>
                                                                                     <div className="text-center">
                                                                                         <i className="far fa-file-pdf text-danger"
                                                                                            onClick={this.showDocInPdfModal("http://51.158.97.220:3001/api/GenerateOptingOutGerant/" + uid + "/" + "Suisse")}
                                                                                            style={{cursor: "pointer"}}
                                                                                         />
                                                                                         <h6 className="text-truncate">
                                                                                             OptingOutGérant
                                                                                         </h6>
                                                                                         <small
                                                                                             className="text-muted">{moment(this.state.selectedEntreprise.dateCreation).format("DD MMM YYYY")} /
                                                                                             2.7MB</small>
                                                                                     </div>
                                                                                 </div>

                                                                                 <div className="file-box">
                                                                                     <a className="download-icon-link"
                                                                                        onClick={() => this.props.history.push("/detailsDoc",
                                                                                            {
                                                                                                societe: this.state.selectedEntreprise,
                                                                                                typeDoc: "Requisition",
                                                                                                isSignedByAllGerants: this.state.isAllGerantsSign,
                                                                                                isSignedByAllAssocies: this.state.isAllAssociesSign
                                                                                            })}>
                                                                                         <i className="dripicons-export file-download-icon1"
                                                                                            style={{cursor: "pointer"}}/>
                                                                                     </a>
                                                                                     <a className="download-icon-link"
                                                                                        onClick={this.showRequisitionDocument(this.state.selectedEntreprise.uniqueId, this.state.selectedEntreprise.paysOrigine)}>
                                                                                         <i className="dripicons-download file-download-icon2"
                                                                                            style={{cursor: "pointer"}}/>
                                                                                     </a>
                                                                                     <div className="text-center">
                                                                                         <i className="far fa-file-pdf text-danger"
                                                                                            onClick={this.showDocInPdfModal("http://51.158.97.220:3001/api/GenerateRequisition/" + uid + "/" + "Suisse")}
                                                                                            style={{cursor: "pointer"}}
                                                                                         />
                                                                                         <h6 className="text-truncate">
                                                                                             Requisition
                                                                                         </h6>
                                                                                         <small
                                                                                             className="text-muted">{moment(this.state.selectedEntreprise.dateCreation).format("DD MMM YYYY")} /
                                                                                             2.2MB</small>
                                                                                     </div>
                                                                                 </div>

                                                                             </div>

                                                                             <div className="row ml-4 mt-2">

                                                                                 <div className="col-sm-9 mt-2"
                                                                                      style={{marginTop: 15}}>

                                                                                     <div className="card">
                                                                                         <div className="card-body">
                                                                                             {
                                                                                                 this.state.isAllGerantsSign === true ?
                                                                                                     <div className="text-center">
                                                                                        <span
                                                                                            className="badge bg-soft-success text-success p-1"
                                                                                            style={{
                                                                                                marginTop: 10,
                                                                                                fontSize: "0.7rem"
                                                                                            }}>
                                                                                          Les documents sont signés par tous les gérants
                                                                                        </span>
                                                                                                     </div> :
                                                                                                     <h4 style={{fontWeight: 'bold'}}
                                                                                                         className="header-title mt-0 mb-3">
                                                                                                         En attente de signature des
                                                                                                         gérants :
                                                                                                     </h4>
                                                                                             }
                                                                                             <ul className="list-unsyled m-0 pl-0 transaction-history ml-3">
                                                                                                 {
                                                                                                     (this.state.selectedEntreprise.sAdministrator || []).map((actio, key) => (

                                                                                                         actio.fullname = actio.firstname + " " + actio.lastname,
                                                                                                         actio.signatureStatut === "" &&
                                                                                                         <li key={key}
                                                                                                             className="align-items-center d-flex justify-content-between">
                                                                                                             <div className="media">
                                                                                                                 <div
                                                                                                                     className="media-body align-self-center">
                                                                                                                     <div
                                                                                                                         className="transaction-data">
                                                                                                                         <h3 className="m-0">{actio.ej_name && actio.ej_name !== "" ? actio.ej_name : actio.fullname} </h3>
                                                                                                                         <p className="text-muted mb-0">{actio.email} </p>
                                                                                                                     </div>
                                                                                                                 </div>
                                                                                                             </div>
                                                                                                             <div  //888
                                                                                                                 className="transaction-icon">
                                                                                                                 <i className="mdi mdi-contact-mail"
                                                                                                                    onClick={this.sendSARLSuisseInvitationToSign(actio.email, key, "gerant")}
                                                                                                                    style={{
                                                                                                                        cursor: 'pointer',
                                                                                                                        color: "crimson"
                                                                                                                    }}>
                                                                                                                 </i>&nbsp;&nbsp;
                                                                                                                 <i className="mdi mdi-message-reply-text"
                                                                                                                    style={{
                                                                                                                        cursor: 'pointer',
                                                                                                                        color: "cornflowerblue"
                                                                                                                    }}>
                                                                                                                 </i>
                                                                                                             </div>
                                                                                                         </li>
                                                                                                     ))
                                                                                                 }
                                                                                             </ul>
                                                                                         </div>
                                                                                     </div>

                                                                                 </div>


                                                                             </div>


                                                                             <div className="file-box-content">
                                                                                 <div className="file-box">
                                                                                     <a className="download-icon-link"
                                                                                        onClick={() => {
                                                                                        }}>
                                                                                         <i className="dripicons-export file-download-icon1"
                                                                                            style={{cursor: "pointer"}}/>
                                                                                     </a>
                                                                                     <a className="download-icon-link"
                                                                                        onClick={this.showActeConstitutifDocument(this.state.selectedEntreprise.uniqueId, this.state.selectedEntreprise.paysOrigine)}>
                                                                                         <i className="dripicons-download file-download-icon2"
                                                                                            style={{cursor: "pointer"}}/>
                                                                                     </a>
                                                                                     <div className="text-center">
                                                                                         <i className="far fa-file-pdf text-danger"
                                                                                            onClick={this.showDocInPdfModal("http://51.158.97.220:3001/api/GenerateActeConstitutif/" + uid + "/" + "Suisse")}
                                                                                            style={{cursor: "pointer"}}
                                                                                         />
                                                                                         <h6 className="text-truncate">
                                                                                             Acte_Constitutif
                                                                                         </h6>
                                                                                         <small
                                                                                             className="text-muted">{moment(this.state.selectedEntreprise.dateCreation).format("DD MMM YYYY")} /
                                                                                             1.9MB</small>
                                                                                     </div>
                                                                                 </div>
                                                                             </div>


                                                                         </div>
                                                                     }
                                                                     {
                                                                         this.state.selectedSideMenuItem === "ad" &&
                                                                         <div style={{flexWrap:"wrap",display:"flex"}}>
                                                                             {
                                                                                 (this.state.documents || []).map((item,key) =>
                                                                                         <div key={key} className="cf_itemDoc">
                                                                                             <span className="cf-itemDoc_preview" onClick={() => {
                                                                                                 this.setState({selectedDoc:item,openRightMenu:true})
                                                                                             }}>
                                                                                                  <img alt="" src={item.thumbnail} className="cf-itemDoc_preview_image"/>
                                                                                                  <div className="cf_itemDoc_preview_details">
                                                                                                      <div className="cf_itemDoc_preview_details_title">
                                                                                                          {item.title}
                                                                                                      </div>
                                                                                                      <span className="badge bg-soft-warning text-warning font-weight-bolder p-1">En attente</span>
                                                                                                  </div>

                                                                                             </span>
                                                                                         </div>
                                                                                 )
                                                                             }
                                                                         </div>
                                                                     }
                                                                 </div>
                                                             }

                                                             {
                                                                 this.state.showUploadStep === "upload" &&
                                                                 <div>
                                                                     <div className="">
                                                                         <button className="btn btn-sm btn-light"
                                                                                 onClick={() => this.setState({showUploadStep: ""})}>
                                                                             <i className="mdi mdi-arrow-left font-16"
                                                                                style={{color: "#000", fontWeight: "bold"}}/>&nbsp;
                                                                             Retour
                                                                         </button>
                                                                     </div>
                                                                     <div align="center" className="mt-5">
                                                                         <h1 className="skh1">Télécharger un document</h1>
                                                                         <p style={{fontSize: "1rem"}} className="mt-2">
                                                                             Faites glisser et déposez un documents PDF sur le
                                                                             terrain ou sélectionnez un fichier
                                                                             depuis votre ordinateur.</p>

                                                                         <div className="sk_elupload_drag">
                                                                             <FileUploader
                                                                                 onCancel={() => {
                                                                                 }}

                                                                                 onDrop={(acceptedFiles, rejectedFiles) => {
                                                                                     console.log(acceptedFiles)
                                                                                     let formData = new FormData();
                                                                                     formData.append("document", acceptedFiles[0], acceptedFiles[0].name)
                                                                                     axios.request({
                                                                                         method: "POST",
                                                                                         url: "http://51.158.97.220:3003/api/uploadFile",
                                                                                         data: formData,
                                                                                         onUploadProgress: (p) => {
                                                                                             console.log(p);
                                                                                             this.setState({
                                                                                                 progressUpload: (p.loaded / p.total) * 100
                                                                                             })
                                                                                         }


                                                                                     }).then(res => {
                                                                                         console.log(res)
                                                                                         this.setState({
                                                                                             progressUpload: undefined,
                                                                                             showUploadStep: "upload_succes",
                                                                                             uploadedThumb: res.data.data.thumbnail,
                                                                                             uploadedName: res.data.data.docName,
                                                                                             uploadedPath: res.data.data.path
                                                                                         })
                                                                                     })

                                                                                 }}
                                                                                 // progressAmount is a number from 0 - 100 which indicates the percent of file transfer completed
                                                                                 progressAmount={this.state.progressUpload}

                                                                                 progressMessage={this.state.progressUpload ? "Téléchargement de " + this.state.progressUpload.toFixed(2) + "% de 100%" : ""}
                                                                             />
                                                                         </div>


                                                                     </div>
                                                                 </div>
                                                             }
                                                             {
                                                                 this.state.showUploadStep === "upload_succes" &&
                                                                 <div>
                                                                     <div align="center" className="mt-5">
                                                                         <h1 className="skh1">
                                                                             Téléchargement réussi
                                                                         </h1>
                                                                         <p style={{fontSize: "1rem"}} className="mt-2">
                                                                             Continuez à utiliser le document suivant:
                                                                         </p>
                                                                         <div className="sk_upload_preview">
                                                                             <div className="sk_upload_doc">
                                                                                 <img style={{maxWidth: "100%", maxHeight: "100%"}}
                                                                                      alt="" src={this.state.uploadedThumb}/>
                                                                             </div>
                                                                             <div className="sk_upload_filename">
                                                                                 {this.state.uploadedName}
                                                                             </div>
                                                                             <Button shape={SHAPE.round} size={SIZE.mini}
                                                                                     onClick={() => this.setState({showUploadStep: "upload"})}>
                                                                                 <Delete/>
                                                                             </Button>

                                                                             <div className="mt-2" style={{display: "contents"}}>
                                                                                 <h1 className="skh2">
                                                                                     Souhaitez-vous signer ce documents ?
                                                                                 </h1>
                                                                                 <RadioGroup
                                                                                     value={this.state.signDoc}
                                                                                     onChange={e => this.setState({signDoc: e.target.value})}
                                                                                     name="signDoc"
                                                                                     align={ALIGN.horizontal}
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
                                                                             {
                                                                                 this.state.showBtnInviteSign === true &&
                                                                                 <div align="center">
                                                                                     <button
                                                                                         className=" mt-3 btn btn-lg text-white btn-danger font-18"
                                                                                         style={{
                                                                                             backgroundColor: "blue",
                                                                                             borderColor: "blue"
                                                                                         }}
                                                                                         onClick={() => this.setState({showUploadStep: "inviteSigners"})}>
                                                                                         inviter les signataires
                                                                                     </button>
                                                                                 </div>
                                                                             }

                                                                         </div>
                                                                     </div>
                                                                     {
                                                                         this.state.showBtnInviteSign === false &&
                                                                         <div className="float-right mt-1">
                                                                             <button
                                                                                 className="btn btn-lg text-white btn-danger mr-2 font-18"
                                                                                 style={{
                                                                                     backgroundColor: "blue",
                                                                                     borderColor: "blue"
                                                                                 }}
                                                                                 onClick={() => this.setState({showBtnInviteSign: true})}>
                                                                                 Continuer
                                                                             </button>
                                                                         </div>
                                                                     }

                                                                 </div>

                                                             }
                                                             {
                                                                 this.state.showUploadStep === "inviteSigners" &&
                                                                 <div align="center">

                                                                     <div className="ml-2 mt-2">
                                                                         <h1 className="skh1" style={{fontSize: "1.7rem"}}>
                                                                             Invitez les gens à signer
                                                                         </h1>
                                                                         <p style={{fontSize: "1.0rem"}} className="mt-2">
                                                                             Saisissez l'adresse e-mail des personnes qui doivent
                                                                             signer ce document.
                                                                         </p>
                                                                         <div className="mt-4">
                                                                             <strong style={{color: "#293d66", fontSize: "1.1rem"}}>Vous
                                                                                 vous signez ?</strong>
                                                                             <div
                                                                                 className={this.state.signMySelf === true ? "sk_signmyself sk_signmyself_active" : "sk_signmyself"}>
                                                                                 <div className="sk_signmyself_text">Babba Amine
                                                                                 </div>
                                                                                 <div className="sk_signmyself_switch">
                                                                                     <Checkbox
                                                                                         checked={this.state.signMySelf}
                                                                                         checkmarkType={STYLE_TYPE.toggle_round}
                                                                                         onChange={e => this.setState({signMySelf: e.target.checked})}
                                                                                         labelPlacement={LABEL_PLACEMENT.left}
                                                                                         overrides={{
                                                                                             Label: {
                                                                                                 style: ({$theme}) => ({
                                                                                                     color: this.state.signMySelf === true ? $theme.colors.positive300 : $theme.colors.primary200,
                                                                                                 }),
                                                                                             },
                                                                                             Toggle: {
                                                                                                 style: ({$checked, $theme}) => ({
                                                                                                     backgroundColor: $checked
                                                                                                         ? $theme.colors.positive300
                                                                                                         : $theme.colors.primary200,
                                                                                                 }),
                                                                                             }
                                                                                         }}
                                                                                     >
                                                                                         Je signe
                                                                                     </Checkbox>
                                                                                 </div>
                                                                             </div>
                                                                             <div className="mt-3">
                                                                                 <strong
                                                                                     style={{color: "#293d66", fontSize: "1.1rem"}}>Ajouter
                                                                                     d'autres signataires</strong>
                                                                                 <ReactMultiEmail
                                                                                     placeholder="Cliquer sur 'Entrée' pour ajouter une adresse mail "
                                                                                     emails={this.state.signatiaresEmails}
                                                                                     onChange={(_emails) => {
                                                                                         this.setState({signatiaresEmails: _emails});
                                                                                     }}
                                                                                     validateEmail={email => {
                                                                                         return isEmail(email); // return boolean
                                                                                     }}
                                                                                     getLabel={(
                                                                                         email,
                                                                                         index,
                                                                                         removeEmail = (index) => {
                                                                                         },
                                                                                     ) => {
                                                                                         return (
                                                                                             <div data-tag key={index}>
                                                                                                 {email}
                                                                                                 <span data-tag-handle
                                                                                                       onClick={() => removeEmail(index)}>
                                                                                                                ×
                                                                                                            </span>
                                                                                             </div>
                                                                                         );
                                                                                     }}
                                                                                 />
                                                                             </div>
                                                                             <div className="mt-2">
                                                                                 <strong className="mb-1" style={{
                                                                                     color: "#293d66",
                                                                                     fontSize: "1.1rem"
                                                                                 }}>Exigences légales</strong>
                                                                                 <div className="mt-2">
                                                                                     <div style={{width: "70%"}}>
                                                                                         <Select
                                                                                             options={[
                                                                                                 {
                                                                                                     id: 'Swiss law (ZertES)',
                                                                                                     image: swissImg
                                                                                                 },
                                                                                                 {
                                                                                                     id: 'EU law (eIDAS)',
                                                                                                     image: euImg
                                                                                                 },
                                                                                                 {
                                                                                                     id: 'France (eIDAS)',
                                                                                                     image: frImg
                                                                                                 },
                                                                                             ]}
                                                                                             labelKey="id"
                                                                                             valueKey="id"
                                                                                             onChange={options => this.setState({selectedSignatureType: options.value})}
                                                                                             value={this.state.selectedSignatureType}
                                                                                             getOptionLabel={getLabel}
                                                                                             getValueLabel={getLabel}
                                                                                             placeholder=""
                                                                                         />
                                                                                     </div>
                                                                                 </div>
                                                                             </div>
                                                                             <div className="mt-2">
                                                                                 <strong className="mb-1" style={{
                                                                                     color: "#293d66",
                                                                                     fontSize: "1.1rem"
                                                                                 }}>
                                                                                     Message à tous les signataires</strong>
                                                                                 <div style={{width: "70%"}} className="mt-1">
                                                                                     <Textarea
                                                                                         value={this.state.messageToSignatories}
                                                                                         onChange={e => this.setState({messageToSignatories: e.target.value})}
                                                                                         placeholder=""
                                                                                     />
                                                                                 </div>
                                                                                 <div align="center" className="mt-2">
                                                                                     <button
                                                                                         className="btn btn-lg text-white btn-danger mr-2 font-18"
                                                                                         style={{
                                                                                             backgroundColor: "blue",
                                                                                             borderColor: "blue"
                                                                                         }}
                                                                                         onClick={() => {
                                                                                             this.setState({showUploadStep: "signForm"})
                                                                                         }}>
                                                                                         Continuer
                                                                                     </button>
                                                                                 </div>
                                                                             </div>


                                                                         </div>
                                                                     </div>

                                                                 </div>
                                                             }
                                                             {
                                                                 this.state.showUploadStep === "signForm" &&
                                                                 <div>
                                                                     <div className="sk_appwrap">
                                                                         <div className="sk_viewr">
                                                                             <div className="sk_pdfviewr">
                                                                                 <PDFViewer
                                                                                     document={{
                                                                                         url: "http://51.158.97.220:3003" + this.state.uploadedPath
                                                                                     }}
                                                                                     minScale={0.25}
                                                                                     scale={1.05}
                                                                                     navbarOnTop={true}

                                                                                     scaleStep={0.25}
                                                                                     loader={
                                                                                         <h5 style={{color: '#fa5b35'}}>Chargement...</h5>
                                                                                     }
                                                                                     alert={
                                                                                         <h5 style={{color: "red"}}>Une erreur s'est
                                                                                             produite lors de chargement du
                                                                                             doument !</h5>
                                                                                     }
                                                                                 />
                                                                             </div>
                                                                             <div className="sk_signatures_viewr">
                                                                                 <div className="sk_signatures_viewr_content">
                                                                                     <div className="btn-group mb-2">
                                                                                         <button
                                                                                             className="btn font-weight-bold   btn-light"
                                                                                             onClick={() => this.setState({showUploadStep: "inviteSigners"})}>Retour
                                                                                         </button>
                                                                                         &nbsp;&nbsp;
                                                                                         <button
                                                                                             className="btn custom_p_btn  btn-blue"
                                                                                             onClick={() => {
                                                                                                 this.setState({loading:true})
                                                                                                 let docs = this.state.documents;
                                                                                                 let signers = [];
                                                                                                 let signataires = this.state.signatiaresEmails;
                                                                                                 if(this.state.signMySelf === true){
                                                                                                     signers.push({email:localStorage.getItem("email"),
                                                                                                         signature:"",
                                                                                                         signed_at:new Date(),key:1})
                                                                                                 }
                                                                                                 signataires.map((item,key) => {
                                                                                                     signers.push({email:item,signature:"",signed_at:"",key:this.state.signMySelf === true ? key+2:key+1})
                                                                                                 })

                                                                                                 docs.push({
                                                                                                     title:this.state.uploadedName,
                                                                                                     type:"ad",
                                                                                                     desc:"",
                                                                                                     thumbnail:this.state.uploadedThumb,
                                                                                                     path:this.state.uploadedPath,
                                                                                                     created_at:new Date(),
                                                                                                     signers:signers,
                                                                                                 })
                                                                                                 firebase.database().ref("society/"+localStorage.getItem("uid")+"Suisse").update({
                                                                                                     documents:docs
                                                                                                 }).then(ok => {
                                                                                                     this.setState({loading:false})
                                                                                                 }).catch(err => console.log(err))
                                                                                                 this.setState({showUploadStep: "successfulStep"})
                                                                                             }}>
                                                                                             <h1 className="skh_btn">
                                                                                                 {
                                                                                                     this.state.signMySelf === true ? "Signer maintenant" : "Envoyer les invitations"
                                                                                                 }
                                                                                             </h1>
                                                                                         </button>
                                                                                     </div>
                                                                                     <h1 className="skh1">Positionnez les champs de
                                                                                         signature</h1>
                                                                                     <p style={{fontSize: "1.1rem"}}>
                                                                                         Faites glisser et déposez les champs de
                                                                                         signature à l'endroit où les gens doivent
                                                                                         signer.</p>
                                                                                     <div style={{marginTop: "2.8rem"}}>
                                                                                         {
                                                                                             this.state.signMySelf === true &&
                                                                                             <Draggable>
                                                                                                 <div
                                                                                                     className="sk_signature_sticker">
                                                                                                     <div id={"sk_signature"}
                                                                                                          className="sk_signature_card p-1">
                                                                                                         <div align="center">
                                                                                                             <h1 className="skh3">{localStorage.getItem("email")}</h1>
                                                                                                         </div>

                                                                                                         <div style={{
                                                                                                             display: "flex",
                                                                                                             marginBottom: 8
                                                                                                         }}>
                                                                                                             <button
                                                                                                                 className=" mt-4 btn btn-sm btn-danger p-1 ml-3"
                                                                                                                 style={{
                                                                                                                     backgroundColor: "deepskyblue",
                                                                                                                     borderColor: "deepskyblue"
                                                                                                                 }}>SES
                                                                                                             </button>
                                                                                                             <h1 className="skh4"
                                                                                                                 style={{
                                                                                                                     marginLeft: 15,
                                                                                                                     marginTop: 42
                                                                                                                 }}>
                                                                                                                 Simple electronic
                                                                                                                 signature</h1>
                                                                                                         </div>
                                                                                                     </div>
                                                                                                 </div>
                                                                                             </Draggable>
                                                                                         }
                                                                                         {
                                                                                             this.state.signatiaresEmails.map((item, key) =>
                                                                                                 <Draggable>
                                                                                                     <div
                                                                                                         className="sk_signature_sticker">
                                                                                                         <div id={"sk_signature"+key}
                                                                                                              className="sk_signature_card p-1">
                                                                                                             <div align="center">
                                                                                                                 <h1 className="skh3">{item}</h1>
                                                                                                             </div>
                                                                                                             <div style={{
                                                                                                                 display: "flex",
                                                                                                                 marginBottom: 8
                                                                                                             }}>
                                                                                                                 <button
                                                                                                                     className=" mt-4 btn btn-sm btn-danger p-1 ml-3"
                                                                                                                     style={{
                                                                                                                         backgroundColor: "deepskyblue",
                                                                                                                         borderColor: "deepskyblue"
                                                                                                                     }}>SES
                                                                                                                 </button>
                                                                                                                 <h1 className="skh4"
                                                                                                                     style={{
                                                                                                                         marginLeft: 15,
                                                                                                                         marginTop: 42
                                                                                                                     }}>
                                                                                                                     Simple
                                                                                                                     electronic
                                                                                                                     signature</h1>
                                                                                                             </div>
                                                                                                         </div>
                                                                                                     </div>
                                                                                                 </Draggable>
                                                                                             )
                                                                                         }
                                                                                         {
                                                                                             this.state.signatiaresEmails.length > 0 &&
                                                                                             <p style={{
                                                                                                 fontSize: "1.1rem",
                                                                                                 marginTop: 25
                                                                                             }}>
                                                                                                 Une invitation sera envoyé au
                                                                                                 signataires dés que vous validez
                                                                                                 votre signature.
                                                                                             </p>
                                                                                         }


                                                                                         {/*<button className="btn btn-danger btn-sm" onClick={this.convetHtmlToBase64}>convert</button>*/}

                                                                                     </div>
                                                                                 </div>
                                                                             </div>
                                                                         </div>
                                                                     </div>
                                                                 </div>
                                                             }
                                                             {
                                                                 this.state.showUploadStep === "successfulStep" &&
                                                                 <div>
                                                                     <div className="sk_detail_container">
                                                                         <div className="float-right">
                                                                             <button onClick={()=> this.setState({showUploadStep:"",selectedSideMenuItem:"ad"})}
                                                                                     className="btn-rounded btn-small btn-light"><i className="mdi mdi-close font-18 font-weight-bold"/></button>
                                                                         </div>
                                                                         <div className="mt-4">
                                                                             <h1 className="skh1" style={{fontSize: "2.0rem"}}>Les invitations à signer sont envoyée avec succès</h1>
                                                                             <p style={{fontSize: "1.2rem"}}>Vous serez averti par e-mail
                                                                                 dès la signature du document.</p>
                                                                             <div className="sk_detail_upload">
                                                                                 <div className="sk_detail_upload_pic">
                                                                                     <img src={this.state.uploadedThumb} alt=""
                                                                                          style={{maxWidth: "100%", maxHeight: "100%"}}/>
                                                                                 </div>
                                                                                 <div className="sk_detail_upload_text">
                                                                                     <div className="sk_detail_upload_text_row">
                                                                                         <strong
                                                                                             style={{color: "#293d66"}}>Document</strong><br/>
                                                                                         {this.state.uploadedName}
                                                                                     </div>
                                                                                     {
                                                                                         this.state.signMySelf === true &&
                                                                                         <div className="sk_detail_upload_text_row">
                                                                                             <strong style={{color: "#293d66"}}>Signataire
                                                                                                 1</strong><br/>
                                                                                             {localStorage.getItem("email")}
                                                                                         </div>
                                                                                     }
                                                                                     {
                                                                                         this.state.signatiaresEmails.map((item, key) =>
                                                                                             <div key={key}
                                                                                                  className="sk_detail_upload_text_row">
                                                                                                 <strong
                                                                                                     style={{color: "#293d66"}}>Signataire {this.state.signMySelf === true ? key + 2 : key + 1}</strong><br/>
                                                                                                 {localStorage.getItem("email")}
                                                                                             </div>
                                                                                         )
                                                                                     }
                                                                                 </div>
                                                                             </div>
                                                                         </div>
                                                                     </div>
                                                                     <div align="center" className="">
                                                                         <div className="btn-group">
                                                                             <button className="btn btn-lg btn-outline-blue"
                                                                                     onClick={this.showDocInPdfModal("http://51.158.97.220:3003" + this.state.uploadedPath)}>Visualiser
                                                                             </button>
                                                                             &nbsp;&nbsp;
                                                                             <button className="btn btn-lg btn-pink ">Télécharger
                                                                             </button>
                                                                         </div>
                                                                     </div>
                                                                 </div>


                                                             }
                                                         </div>
                                                     </div>
                                                 }

                                             </div>
                                </div>
                            </div>


                            <Drawer anchor="right" open={this.state.openRightMenu} onClose={()=>{this.setState({openRightMenu:false})}}>
                                <div  style={{width:340}}>
                                    <div style={{padding:"1.6rem 2rem"}}>
                                        <div className="rs_header">
                                            <h2 className="rs_header_title">
                                                {this.state.selectedDoc.title}
                                            </h2>
                                            <span className="badge bg-soft-warning text-warning p-1">En attente</span>
                                            <button className="btn btn-rounded btn-light btn-small rs_btn_close" onClick={()=>this.setState({openRightMenu:false})}>
                                                <i className="mdi mdi-close font-18 font-weight-bold"/></button>
                                        </div>
                                        <div className="rs_doc_actions">
                                            <IconButton aria-label="Visualiser" title="Visualiser" color="primary"
                                                        onClick={this.showDocInPdfModal("http://51.158.97.220:3003"+this.state.selectedDoc.path)}>
                                                <FindInPageOutlinedIcon />
                                            </IconButton>
                                            <IconButton aria-label="Télécharger" title="Télécharger" color="default" href={"http://51.158.97.220:3003"+this.state.selectedDoc.path} download={true} target="_blank">
                                                <CloudDownloadOutlinedIcon />
                                            </IconButton>
                                            <IconButton aria-label="Inviter" title="Inviter" color="primary" >
                                                <PersonAddOutlinedIcon />
                                            </IconButton>
                                            <IconButton aria-label="Supprimer" title="Supprimer" color="secondary" >
                                                <DeleteOutlineIcon />
                                            </IconButton>
                                        </div>
                                        <div className="rs_row">
                                            <div className="rs_row_icon">
                                                <PersonAddOutlinedIcon />
                                            </div>
                                            <div>
                                                <div className="rs_row_text">
                                                    <strong>Crée par</strong>
                                                </div>
                                                <div className="rs_row_text">
                                                    babba@yopmail.com
                                                </div>
                                            </div>
                                        </div>
                                        <div className="rs_row">
                                            <div className="rs_row_icon">
                                                <DateRangeOutlinedIcon />
                                            </div>
                                            <div>
                                                <div className="rs_row_text">
                                                    <strong>Créé le</strong>
                                                </div>
                                                <div className="rs_row_text">
                                                    {moment(this.state.selectedDoc.created_at).format("DD MMMM YYYY, HH:mm")}
                                                </div>
                                            </div>
                                        </div>
                                        <h3 className="rs_signers_title">Signataires</h3>
                                        {
                                            (this.state.selectedDoc.signers || []).map((signer,key) =>
                                                <div key={key} className="rs_row">
                                                    <div className="rs_row_icon">
                                                        <CreateOutlinedIcon color="secondary" />
                                                    </div>
                                                    <div>
                                                        <div className="rs_row_text">
                                                            <strong>Email</strong>
                                                        </div>
                                                        <div className="rs_row_text">
                                                            {signer.email}
                                                        </div>
                                                    </div>
                                                    <div className="rs_row_span rs_row_span">
                                                        <div className="badge bg-soft-warning text-warning p-1 ">En attente</div>
                                                    </div>
                                                </div>
                                            )
                                        }



                                    </div>

                                </div>

                            </Drawer>


                            <Modal isOpen={this.state.showPDFModal} size="lg"
                                   toggle={() => this.setState({showPDFModal: !this.state.showPDFModal})}>
                                <ModalHeader toggle={() => this.setState({showPDFModal: !this.state.showPDFModal})}>
                                    <h4>Document</h4>
                                </ModalHeader>
                                <ModalBody>
                                    <PDFViewer
                                        document={{
                                            url: this.state.pdfURL
                                        }}
                                        minScale={0.25}
                                        scaleStep={0.25}
                                        navbarOnTop
                                        loader={
                                            <h5 style={{color: '#fa5b35'}}>Chargement...</h5>
                                        }
                                        alert={
                                            <h5 style={{color: "red"}}>Une erreur s'est produite lors de chargement du
                                                doument !</h5>
                                        }
                                    />
                                </ModalBody>
                            </Modal>

                        </div>
                }
            </div>
        )
    }

}


export default CoffreFortNewVersion;