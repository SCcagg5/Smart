import React, {Component, Suspense} from "react";
import firebase from "firebase/app";
import "firebase/database";
import 'firebase/storage';
import Loader from "../../components/Loader";
import {Button, Container} from "reactstrap";
import pdfImage from "../../assets/images/pdfimage.jpg";
import augmCapitalService from "../../provider/augmCapitalService";
import entrepriseSARLService from "../../provider/entrepriseSARLService";
import moment from "moment";
import signatureService from "../../provider/signatureService";
import MySnackbarContentWrapper from "../../tools/customSnackBar";
import Snackbar from "@material-ui/core/Snackbar";
import CessionService from "../../provider/cessionActionService";
import customEmailService from "../../provider/customEmailService";
import emailService from "../../provider/emailService";
import signQlogo from "../../assets/canton-GE.png";
import {Modal, ModalHeader, ModalBody} from "reactstrap";
import PDFViewer from "../../customComponents/pdf-viewer-reactjs";

const Topbar = React.lazy(() => import("../../components/Topbar"));
const Navbar = React.lazy(() => import("../../components/Navbar"));
const loading = () => <Loader/>;

class coffreFort extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isMenuOpened: false,
            activeMenuItem: 'item-cf',
            loading: false,
            societies: [],
            selectedEntreprise: '',
            augmCapitalArray: [],
            cessionActionsArray: [],

            isAllSigneDocStatut: false,
            isAllSigneDocStatutSARL: false,
            isAllSigneDocActeConstitutifSARL: false,
            isAllSigneDocProcurationSARL: false,
            isAllSigneDocDeclarationSARL: false,
            isAllSigneDocOptingOutGerantSARL: false,
            isAllSigneDocRequisitionSARL: false,

            actioNotSignedDocSatut: [],
            actioNotSignedDocSatutSARL: [],
            actioNotSignedDocActeConstitutifSARL: [],
            actioNotSignedDocProcurationSARL: [],
            actioNotSignedDocDeclarationSARL: [],
            actioNotSignedDocOptingOutGerantSARL: [],
            actioNotSignedDocRequisitionSARL: [],

            openAlert: false,
            alertMessage: '',
            alertType: '',

            isAllGerantsSign: false,
            isAllAssociesSign: false,

            showPDFModal: false,
            pdfURL: ""
        }
    }

    toggleMenu = (e) => {
        e.preventDefault();
        this.setState({isMenuOpened: !this.state.isMenuOpened});
    };

    toggleRightSidebar = () => {
        document.body.classList.toggle("right-bar-enabled");
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

    changeActivePage = (page) => event => {
        if (page !== '') {
            this.setState({
                activePage: page
            })
        }
    };

    componentWillMount() {

        if (localStorage.getItem('uid') === undefined || localStorage.getItem('uid') === null) {
            this.props.history.push('/login')
        } else {
            this.setState({loading: true});
            let uid = localStorage.getItem('uid');
            let userUid = uid.replace('Suisse', '');

            firebase.database().ref('/users/' + userUid).on('value', (snapshot) => {
                let user = snapshot.val();
                console.log(user);
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
                    loading: false
                });
                if (userSocieties.length > 0) {
                    //console.log(userSocieties[0].cessionAction)
                    setTimeout(() => {
                        this.setSelectedEntreprise(userSocieties[0].sName);
                    }, 1000)
                } else {

                }


            });


        }


    }


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
                cessionActionsArray: entreprise.cessionAction || []
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
                cessionActionsArray: entreprise.cessionAction || []
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

    showCessionActionDoc = (idCession) => event => {

        this.setState({
            showPDFModal:true,
            pdfURL:"http://51.15.229.251:3002/api/generateContrat/"+localStorage.getItem("uid")+"Suisse/"+idCession
        });
    };


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


    showAugmCapitalDoc = (key) => event => {

        this.setState({loading: true});
        let uid = this.state.selectedEntreprise.uniqueId;
        augmCapitalService.getDocAugmCapitalTunisie(uid, key).then(res => {

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

    showBSADocument = (actiokey, titreKey, opKey, type) => event => {
        this.setState({loading: true});
        let uid = this.state.selectedEntreprise.uniqueId;
        let typeActio = "";
        if (type === "Personne physique") {
            typeActio = "Personnephysique"
        } else {
            typeActio = "Personnemoral"
        }
        augmCapitalService.getBSADoc(uid, actiokey, typeActio, titreKey, opKey).then(res => {

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

    showStockoptionDocument = (titrekey,opkey) => event => {

        this.setState({loading:true});
        augmCapitalService.getBSASuisseDoc(localStorage.getItem("uid")+"Suisse",titrekey,opkey).then( res => {

            const file = new Blob(
                [res],
                {type: 'application/pdf'});
            const fileURL = URL.createObjectURL(file);
            window.open(fileURL);
            this.setState({loading:false});

        },err => {
            console.log(err);
        })
    };

    showObligationBondslDoc = (key) => event => {

        this.setState({loading: true});
        let uid = this.state.selectedEntreprise.uniqueId;

        if (this.state.selectedEntreprise.EmissionTitre[key].docUrl && this.state.selectedEntreprise.EmissionTitre[key].docUrl !== "") {
            window.open(this.state.selectedEntreprise.EmissionTitre[key].docUrl);
            this.setState({loading: false});
        } else {

            if (this.state.selectedEntreprise.EmissionTitre[key].signature && this.state.selectedEntreprise.EmissionTitre[key].docUrl !== "") {
                entrepriseSARLService.generateProspectusPP(uid, key).then(res => {
                    const file = new Blob(
                        [res],
                        {type: 'application/pdf'});

                    firebase.storage().ref("/Suisse/docs").child("ObligationBonds-" + key + "-" + uid).put(file).then((snapshot) => {
                        snapshot.ref.getDownloadURL().then(url => {
                            firebase.database().ref("/society/" + uid + "/EmissionTitre/" + key.toString()).update({
                                'docUrl': url
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

                entrepriseSARLService.generateProspectusPP(uid, key).then(res => {
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


    sendMailStatutToActio(id, mail) {
        this.setState({loading: true});
        let uid = this.state.selectedEntreprise.uniqueId;
        let sName = this.state.selectedEntreprise.sName;
        let pays = this.state.selectedEntreprise.paysOrigine;
        signatureService.sendSignDocStatutMailToActio({
            actioId: id,
            actioMail: mail,
            uid: uid,
            sName: sName,
            pays: pays
        }).then(resMail => {
            //console.log(resMail);
            if (resMail.status === 200) {
                this.openSnackbar('success', "Un mail de demande de signature à été envoyé au actionnaire");
            } else {
                this.openSnackbar('error', "Une erreur est survenue ! (Email non envoyé) Vérifier votre connexion internet");
            }
            this.setState({loading: false});
        })
    };

    sendSMSStatutToActio = (actioId, actioPhone, fullname) => event => {

        this.setState({loading: true});
        let uid = this.state.selectedEntreprise.uniqueId;
        let sName = this.state.selectedEntreprise.sName;
        let pays = this.state.selectedEntreprise.paysOrigine;
        let msg = "Bonjour " + fullname + ",\n Vous etes invité à ajouter votre signature sur le statut de la société " + sName + " où vous etes actionnaire.\n Lien pour signature: \n";
        let url = "http://51.15.229.251:89/signPdf/" + uid + "/" + pays + "/" + actioId;

        setTimeout(() => {

            //generate SMS code and save it in firebase
            let actiosPhy = this.state.selectedEntreprise.sActionnairePhy || [];
            let actiosMorals = this.state.selectedEntreprise.sActionnaireMoral || [];

            let indexActioPhy = actiosPhy.indexOf(actiosPhy.find(x => x.id === actioId));
            let indexActioMoral = actiosMorals.indexOf(actiosMorals.find(x => x.id === actioId));


            signatureService.sendSMSToActio({
                msg: msg,
                url: url,
                to: actioPhone.replace(/\s+/g, '')
            }).then(resSMS => {
                //console.log(resSMS);
                if (resSMS.status === 200) {
                    this.openSnackbar('success', "Un SMS à été envoyé au actionnaire pour demande de signature");
                } else {
                    this.openSnackbar('error', "Une erreur est survenue ! (SMS non envoyé) Vérifier votre connexion internet");
                }
                this.setState({loading: false});
            });

        }, 1000);


    };

    sendSMSStatutSARLToActio = (actioId, actioPhone, fullname) => event => {

        this.setState({loading: true});
        let uid = this.state.selectedEntreprise.uniqueId;
        let sName = this.state.selectedEntreprise.sName;
        let pays = this.state.selectedEntreprise.paysOrigine;
        let msg = "Bonjour " + fullname + ",\n Vous etes invité à ajouter votre signature sur le statut de la société " + sName + ".\n Lien pour signature: \n";
        let url = "http://51.15.229.251:89/signSARLStatut/" + uid + "/" + pays + "/" + actioId;

        setTimeout(() => {

            signatureService.sendSMSToActio({
                msg: msg,
                url: url,
                to: actioPhone.replace(/\s+/g, '')
            }).then(resSMS => {
                //console.log(resSMS);
                if (resSMS.status === 200) {
                    this.openSnackbar('success', "Un SMS à été envoyé au gérant/associé pour demande de signature");
                } else {
                    this.openSnackbar('error', "Une erreur est survenue ! (SMS non envoyé) Vérifier votre connexion internet");
                }
                this.setState({loading: false});
            });

        }, 1000);


    };

    sendSMSProcurationSARLToActio = (actioId, actioPhone, fullname) => event => {

        this.setState({loading: true});
        let uid = this.state.selectedEntreprise.uniqueId;
        let sName = this.state.selectedEntreprise.sName;
        let pays = this.state.selectedEntreprise.paysOrigine;
        let msg = "Bonjour " + fullname + ",\n Vous etes invité à ajouter votre signature sur le document de procuration de la société " + sName + ".\n Lien pour signature: \n";
        let url = "http://51.15.229.251:89/signSARLProcuration/" + uid + "/" + pays + "/" + actioId;

        setTimeout(() => {

            signatureService.sendSMSToActio({
                msg: msg,
                url: url,
                to: actioPhone.replace(/\s+/g, '')
            }).then(resSMS => {
                //console.log(resSMS);
                if (resSMS.status === 200) {
                    this.openSnackbar('success', "Un SMS à été envoyé au associé pour demande de signature");
                } else {
                    this.openSnackbar('error', "Une erreur est survenue ! (SMS non envoyé) Vérifier votre connexion internet");
                }
                this.setState({loading: false});
            });

        }, 1000);


    };

    sendSMSDeclarationSARLToActio = (actioId, actioPhone, fullname) => event => {

        this.setState({loading: true});
        let uid = this.state.selectedEntreprise.uniqueId;
        let sName = this.state.selectedEntreprise.sName;
        let pays = this.state.selectedEntreprise.paysOrigine;
        let msg = "Bonjour " + fullname + ",\n Vous etes invité à ajouter votre signature sur le document de déclaration de la société " + sName + ".\n Lien pour signature: \n";
        let url = "http://51.15.229.251:89/signSARLDeclaration/" + uid + "/" + pays + "/" + actioId;

        setTimeout(() => {

            signatureService.sendSMSToActio({
                msg: msg,
                url: url,
                to: actioPhone.replace(/\s+/g, '')
            }).then(resSMS => {
                //console.log(resSMS);
                if (resSMS.status === 200) {
                    this.openSnackbar('success', "Un SMS à été envoyé au associé pour demande de signature");
                } else {
                    this.openSnackbar('error', "Une erreur est survenue ! (SMS non envoyé) Vérifier votre connexion internet");
                }
                this.setState({loading: false});
            });

        }, 1000);


    };

    sendSMSAGEToActio = (numAugm, actioId, actioPhone, fullname, date) => event => {

        this.setState({loading: true});
        let uid = this.state.selectedEntreprise.uniqueId;
        let sName = this.state.selectedEntreprise.sName;
        let msg = "Bonjour " + fullname + ",\n Vous etes invité à ajouter votre signature sur le document de l'augmentation de capital du " + moment(date).format("DD-MM-YYYY HH:mm") + " dans la société " + sName + " où vous etes actionnaire.\n Lien pour signature: \n";
        let url = "http://51.15.229.251:89/signAGE/" + uid + "/" + numAugm + "/" + actioId;

        setTimeout(() => {

            signatureService.sendSMSToActio({
                msg: msg,
                url: url,
                to: actioPhone.replace(/\s+/g, '')
            }).then(resSMS => {
                //console.log(resSMS);
                if (resSMS && resSMS.status === 200) {
                    this.openSnackbar('success', "Un SMS à été envoyé au actionnaire pour demande de signature");
                } else {
                    this.openSnackbar('error', "Une erreur est survenue ! (SMS non envoyé) Vérifier votre connexion internet");
                }
                this.setState({loading: false});
            });

        }, 1000);


    };

    sendBSASignDocToActio = (actioId, actioMail, titreKey, opKey) => event => {
        this.setState({loading: true});
        customEmailService.sendCustomMailWithUrl({
            emailReciver: actioMail,
            subject: "Demande de signature  sur SmartCo",
            from: '"SmartCo " <noreply@smartco.fr>',
            msg: "Bonjour, <br/><br/><br/> Vous etes invité à signer électroniquement un document sur la platforme de SmartCo. <br/><br/>",
            linkUrl: "Signer le document",
            url: "http://51.15.229.251:89/signBSA/" + this.state.selectedEntreprise.uniqueId + "/" + actioId + "/" + titreKey + "/" + opKey,
            footerMsg: "<br/><br/><br/><br/>Si vous avez des questions sur le service ou besoin de parler à un spécialiste, contacter-nous directement:<br/><br/>" +
                "Par email : en répondant à cet email !(on vous répond dans la journée)<br/>Par téléphone : au <b>01 76 39 00 60(lundi-vendredi, 8h-20h)</b>" +
                "<br/><br/>" + "A très bientôt,<br/><br/><br/>" + "<b>L'équipe SmartCo.com</b>",
        }).then(ok => {

            this.setState({loading: false});

        }).catch(err => console.log(err));
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

    sendSARLObligationBondsInvitationToSign = (email, index, type) => event => {

        let subject = "Demande de signature sur SmartCo.link";
        let msg = "Bonjour, " + "<br/><br/><br/>" +
            "Vous etes invité  <b>" + this.state.selectedEntreprise.sName + "</b> à signer un document éléctroniquement." + "<br/><br/>" +
            "Pour le signer, veuillez cliquer sur le lien ci-dessous:" + "<br/><br/>";

        let linkUrl = "Signer ->";
        let url = "http://localhost:3000/signature/ObligationBonds/" + this.state.selectedEntreprise.uniqueId + "/" + type + "/" + index + "/by/" + localStorage.getItem("email");

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

    render() {
        let allActios = (this.state.selectedEntreprise.sActionnairePhy || []).concat(this.state.selectedEntreprise.sActionnaireMoral || []);

        return (

            <div className="app center-menu">
                <header id="topnav">
                    <Suspense fallback={loading()}>
                        <Topbar rightSidebarToggle={this.toggleRightSidebar} menuToggle={this.toggleMenu}
                                changeActivePage={this.changeActivePage}
                                isMenuOpened={this.state.isMenuOpened}/>
                        <Navbar isMenuOpened={this.state.isMenuOpened}
                                activeItem={this.state.activeMenuItem} changeActivePage={this.changeActivePage}/>
                    </Suspense>
                </header>
                <div className="wrapper">
                    <Container fluid>
                        <Suspense fallback={loading()}>
                            {this.state.loading && <Loader/>}
                            <div className="card" style={{marginTop: 15}}>
                                <div className="card-body" style={{padding: '0.9rem'}}>
                                    <div className="row" style={{marginTop: 20}}>
                                        <div className="col-12">
                                            <div className="form-group mb-3">

                                                {
                                                    this.state.societies.length > 0 ?
                                                        <div>
                                                            <label htmlFor="example-select">Sélectionner une de vos
                                                                entreprises</label>
                                                            <select className="form-control custom-select"
                                                                    id="example-select"
                                                                    onChange={(event) => this.setSelectedEntreprise(event.target.value)}>
                                                                {
                                                                    this.state.societies.map((item, key) => (
                                                                        <option value={item.sName}
                                                                                selected={this.state.selectedEntreprise.sName === item.sName}>
                                                                            {item.sName}
                                                                        </option>
                                                                    ))
                                                                }
                                                            </select>
                                                        </div> :
                                                        <p className="font-weight-bold" style={{color: "red"}}>Vous
                                                            n'avez encore ajouté aucune entreprise</p>
                                                }

                                            </div>

                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="row" style={{marginTop: 20}}>
                                <div className="col-md-4">
                                    <div className="card">
                                        <div className="card-body">
                                            <h4 className="header-title mb-0">Mon coffre-fort</h4>

                                            <div className="nav flex-column nav-pills nav-pills-tab" id="v-pills-tab"
                                                 style={{marginTop: 15}}
                                                 role="tablist" aria-orientation="vertical">

                                                <a className={"nav-link mb-2 active show"}
                                                   id={"v-pills-statut"} style={{marginTop: 15, height: 50}}
                                                   data-toggle="pill" href={"#statut"} role="tab"
                                                   aria-controls={"v-statut"}
                                                   aria-selected="true">{"Statut"} </a>

                                                <a className={"nav-link mb-2"}
                                                   id={"v-pills-augmCapital"} style={{height: 50}}
                                                   data-toggle="pill" href={"#augmCapital"} role="tab"
                                                   aria-controls={"v-augmCapital"}
                                                   aria-selected="true">{"Augmentation de capital"} </a>

                                                {
                                                    this.state.selectedEntreprise.paysOrigine === "Suisse" ?
                                                        <a className={"nav-link mb-2"}
                                                           id={"v-pills-BSA"} style={{height: 50}}
                                                           data-toggle="pill" href={"#BSA"} role="tab"
                                                           aria-controls={"v-BSA"}
                                                           aria-selected="true">{"Stock Option"} </a> :

                                                        <a className={"nav-link mb-2"}
                                                           id={"v-pills-BSA"} style={{height: 50}}
                                                           data-toggle="pill" href={"#BSA"} role="tab"
                                                           aria-controls={"v-BSA"}
                                                           aria-selected="true">{"Emission des titres BSA"} </a>
                                                }


                                                {
                                                    this.state.selectedEntreprise.paysOrigine !== "tunisie" &&
                                                    <a className={"nav-link mb-2"}
                                                       id={"v-pills-CessionAction"} style={{height: 50}}
                                                       data-toggle="pill" href={"#CessionAction"} role="tab"
                                                       aria-controls={"v-BSA"}
                                                       aria-selected="true">{"Cession d'actions"} </a>
                                                }


                                                {
                                                    this.state.selectedEntreprise.paysOrigine === "Suisse" &&
                                                    <a className={"nav-link mb-2"}
                                                       id={"v-pills-ObligationBonds"} style={{height: 50}}
                                                       data-toggle="pill" href={"#ObligationBonds"} role="tab"
                                                       aria-controls={"v-ObligationBonds"}
                                                       aria-selected="true">{"Obligations Bonds"} </a>
                                                }
                                            </div>

                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-8">
                                    <div className="card" style={{minHeight: '282px'}}>
                                        <div className="card-body">
                                            <div className="tab-content pt-0">

                                                <div className={"tab-pane fade active show"}
                                                     id={"statut"}
                                                     role="tabpanel" aria-labelledby={"v-pills-statut"}>
                                                    {
                                                        this.state.selectedEntreprise !== "" &&
                                                        <div>
                                                            {
                                                                this.state.selectedEntreprise.type_societe === "SARL" ?
                                                                    <div>

                                                                        <h6>
                                                                            <i className="fa fa-paperclip mb-2"></i> Documents <span>({"6"})</span>
                                                                        </h6>

                                                                        <div className="row">
                                                                            <div className="col-sm-3 mt-2">
                                                                                <div align="center">
                                                                                    <a style={{cursor: 'pointer'}}>
                                                                                        <img src={pdfImage}
                                                                                             style={{maxHeight: 80}}
                                                                                             alt="attachment"
                                                                                             onClick={this.showStatutDocument(this.state.selectedEntreprise.uniqueId, this.state.selectedEntreprise.paysOrigine)}
                                                                                             className="img-thumbnail img-responsive"/>
                                                                                    </a>
                                                                                    <p style={{
                                                                                        fontSize: "x-small",
                                                                                        marginBottom: "0.2rem"
                                                                                    }}>Statut-société</p>
                                                                                    <span
                                                                                        className="badge bg-danger text-white"
                                                                                        style={{
                                                                                            marginTop: -10,
                                                                                            cursor: "pointer"
                                                                                        }}
                                                                                        onClick={() => this.props.history.push("/detailsDoc",
                                                                                            {
                                                                                                societe: this.state.selectedEntreprise,
                                                                                                typeDoc: "Statut",
                                                                                                isSignedByAllGerants: this.state.isAllGerantsSign,
                                                                                                isSignedByAllAssocies: this.state.isAllAssociesSign
                                                                                            })}>
                                                                                    détails&nbsp;<i
                                                                                        className="mdi mdi-arrow-right text-white"/></span>
                                                                                </div>
                                                                            </div>

                                                                            <div className="col-sm-3  mt-2">
                                                                                <div align="center">
                                                                                    <a style={{cursor: 'pointer'}}>
                                                                                        <img src={pdfImage}
                                                                                             style={{maxHeight: 80}}
                                                                                             alt="attachment"
                                                                                             onClick={this.showProcurationDocument(this.state.selectedEntreprise.uniqueId, this.state.selectedEntreprise.paysOrigine)}
                                                                                             className="img-thumbnail img-responsive"/>
                                                                                    </a>
                                                                                    <p style={{
                                                                                        fontSize: "x-small",
                                                                                        marginBottom: "0.2rem"
                                                                                    }}>Procuration</p>
                                                                                    <span
                                                                                        className="badge bg-danger text-white"
                                                                                        style={{
                                                                                            marginTop: -10,
                                                                                            cursor: "pointer"
                                                                                        }}
                                                                                        onClick={() => this.props.history.push("/detailsDoc",
                                                                                            {
                                                                                                societe: this.state.selectedEntreprise,
                                                                                                typeDoc: "Procuration",
                                                                                                isSignedByAllGerants: this.state.isAllGerantsSign,
                                                                                                isSignedByAllAssocies: this.state.isAllAssociesSign
                                                                                            })}>
                                                                                    détails&nbsp;<i
                                                                                        className="mdi mdi-arrow-right text-white"/></span>
                                                                                </div>
                                                                            </div>

                                                                            <div className="col-sm-3 mt-2">
                                                                                <div align="center">
                                                                                    <a style={{cursor: 'pointer'}}>
                                                                                        <img src={pdfImage}
                                                                                             style={{maxHeight: 80}}
                                                                                             alt="attachment"
                                                                                             onClick={this.showDeclarationDocument(this.state.selectedEntreprise.uniqueId, this.state.selectedEntreprise.paysOrigine)}
                                                                                             className="img-thumbnail img-responsive"/>
                                                                                    </a>
                                                                                    <p style={{
                                                                                        fontSize: "x-small",
                                                                                        marginBottom: "0.2rem"
                                                                                    }}>Déclaration.i.ii</p>
                                                                                    <span
                                                                                        className="badge bg-danger text-white"
                                                                                        style={{
                                                                                            marginTop: -10,
                                                                                            cursor: "pointer"
                                                                                        }}
                                                                                        onClick={() => this.props.history.push("/detailsDoc",
                                                                                            {
                                                                                                societe: this.state.selectedEntreprise,
                                                                                                typeDoc: "Déclaration.i.ii",
                                                                                                isSignedByAllGerants: this.state.isAllGerantsSign,
                                                                                                isSignedByAllAssocies: this.state.isAllAssociesSign
                                                                                            })}>
                                                                                    détails&nbsp;<i
                                                                                        className="mdi mdi-arrow-right text-white"/></span>
                                                                                </div>
                                                                            </div>

                                                                            <div className="col-sm-10 mt-2" style={{marginTop: 15}}>
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
                                                                                            <li className="align-items-center d-flex justify-content-between">
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

                                                                        <div style={{
                                                                            height: 1,
                                                                            backgroundColor: "#C0C0C0",
                                                                            marginLeft: 20,
                                                                            marginRight: 20,
                                                                            marginTop: 25,
                                                                            marginBottom: 10
                                                                        }}/>


                                                                        <div className="row" style={{marginTop: 35}}>

                                                                            <div className="col-sm-3 mt-2">
                                                                                <div align="center">
                                                                                    <a style={{cursor: 'pointer'}}>
                                                                                        <img src={pdfImage}
                                                                                             style={{maxHeight: 80}}
                                                                                             alt="attachment"
                                                                                             onClick={this.showStatutDocument(this.state.selectedEntreprise.uniqueId, this.state.selectedEntreprise.paysOrigine)}
                                                                                             className="img-thumbnail img-responsive"/>
                                                                                    </a>
                                                                                    <p style={{
                                                                                        fontSize: "x-small",
                                                                                        marginBottom: "0.2rem"
                                                                                    }}>Statut-société</p>
                                                                                    <span
                                                                                        className="badge bg-danger text-white"
                                                                                        style={{
                                                                                            marginTop: -10,
                                                                                            cursor: "pointer"
                                                                                        }}
                                                                                        onClick={() => this.props.history.push("/detailsDoc",
                                                                                            {
                                                                                                societe: this.state.selectedEntreprise,
                                                                                                typeDoc: "Statut",
                                                                                                isSignedByAllGerants: this.state.isAllGerantsSign,
                                                                                                isSignedByAllAssocies: this.state.isAllAssociesSign
                                                                                            })}>
                                                                                    détails&nbsp;<i
                                                                                        className="mdi mdi-arrow-right text-white"/></span>
                                                                                </div>
                                                                            </div>
                                                                            <div className="col-sm-3 mt-2">
                                                                                <div align="center">
                                                                                    <a style={{cursor: 'pointer'}}>
                                                                                        <img src={pdfImage}
                                                                                             style={{maxHeight: 80}}
                                                                                             alt="attachment"
                                                                                             onClick={this.showOptingOutGerantDocument(this.state.selectedEntreprise.uniqueId, this.state.selectedEntreprise.paysOrigine)}
                                                                                             className="img-thumbnail img-responsive"/>
                                                                                    </a>
                                                                                    <p style={{
                                                                                        fontSize: "x-small",
                                                                                        marginBottom: "0.2rem"
                                                                                    }}>OptingOutGérant</p>
                                                                                    <span
                                                                                        className="badge bg-danger text-white"
                                                                                        style={{
                                                                                            marginTop: -10,
                                                                                            cursor: "pointer"
                                                                                        }}
                                                                                        onClick={() => this.props.history.push("/detailsDoc",
                                                                                            {
                                                                                                societe: this.state.selectedEntreprise,
                                                                                                typeDoc: "OptingOutGerant",
                                                                                                isSignedByAllGerants: this.state.isAllGerantsSign,
                                                                                                isSignedByAllAssocies: this.state.isAllAssociesSign
                                                                                            })}>
                                                                                    détails&nbsp;<i
                                                                                        className="mdi mdi-arrow-right text-white"/></span>
                                                                                </div>
                                                                            </div>
                                                                            <div className="col-sm-3 mt-2">
                                                                                <div align="center">
                                                                                    <a style={{cursor: 'pointer'}}>
                                                                                        <img src={pdfImage}
                                                                                             style={{maxHeight: 80}}
                                                                                             alt="attachment"
                                                                                             onClick={this.showRequisitionDocument(this.state.selectedEntreprise.uniqueId, this.state.selectedEntreprise.paysOrigine)}
                                                                                             className="img-thumbnail img-responsive"/>
                                                                                    </a>
                                                                                    <p style={{
                                                                                        fontSize: "x-small",
                                                                                        marginBottom: "0.2rem"
                                                                                    }}>Requisition</p>
                                                                                    <span
                                                                                        className="badge bg-danger text-white"
                                                                                        style={{
                                                                                            marginTop: -10,
                                                                                            cursor: "pointer"
                                                                                        }}
                                                                                        onClick={() => this.props.history.push("/detailsDoc",
                                                                                            {
                                                                                                societe: this.state.selectedEntreprise,
                                                                                                typeDoc: "Requisition",
                                                                                                isSignedByAllGerants: this.state.isAllGerantsSign,
                                                                                                isSignedByAllAssocies: this.state.isAllAssociesSign
                                                                                            })}>
                                                                                    détails&nbsp;<i
                                                                                        className="mdi mdi-arrow-right text-white"/></span>
                                                                                </div>
                                                                            </div>

                                                                            <div className="col-sm-10" style={{marginTop: 15}}>
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
                                                                                            <li className="align-items-center d-flex justify-content-between">
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


                                                                        <div style={{
                                                                            height: 1,
                                                                            backgroundColor: "#C0C0C0",
                                                                            marginLeft: 20,
                                                                            marginRight: 20,
                                                                            marginTop: 25,
                                                                            marginBottom: 10
                                                                        }}/>

                                                                        <div className="row" style={{marginTop: 15}}>
                                                                            <div className="col-sm-3 mt-2">
                                                                                <div align="center">
                                                                                    <a style={{cursor: 'pointer'}}>
                                                                                        <img src={pdfImage}
                                                                                             style={{maxHeight: 80}}
                                                                                             alt="attachment"
                                                                                             onClick={this.showActeConstitutifDocument(this.state.selectedEntreprise.uniqueId, this.state.selectedEntreprise.paysOrigine)}
                                                                                             className="img-thumbnail img-responsive"/>
                                                                                    </a>
                                                                                    <p style={{fontSize: "x-small"}}>Acte-Constitutif</p>
                                                                                </div>
                                                                            </div>
                                                                        </div>

                                                                    </div> :
                                                                    <div>

                                                                        <h6>
                                                                            <i className="fa fa-paperclip mb-2"></i> Documents <span>({"1"})</span>
                                                                        </h6>

                                                                        <div className="row">
                                                                            <div className="col-sm-2">
                                                                                <a style={{cursor: 'pointer'}}>
                                                                                    <img src={pdfImage}
                                                                                         style={{maxHeight: 60}}
                                                                                         alt="attachment"
                                                                                         onClick={this.showStatutDocument(this.state.selectedEntreprise.uniqueId, this.state.selectedEntreprise.paysOrigine)}
                                                                                         className="img-thumbnail img-responsive"/>
                                                                                </a>
                                                                                <p style={{fontSize: "x-small"}}>statut-société</p>
                                                                            </div>
                                                                            <div className="col-sm-10">
                                                                                {
                                                                                    this.state.isAllSigneDocStatut ?
                                                                                        <span
                                                                                            className="badge bg-soft-success text-success p-1"
                                                                                            style={{
                                                                                                marginTop: 10,
                                                                                                fontSize: "0.7rem"
                                                                                            }}>
                                                                            Signé par tous les actionnaires
                                                                        </span> :
                                                                                        <h4 style={{fontWeight: 'bold'}}
                                                                                            className="header-title mt-0 mb-3">
                                                                                            En attente de signature de :
                                                                                        </h4>
                                                                                }
                                                                                <ul className="list-unsyled m-0 pl-0 transaction-history">
                                                                                    {
                                                                                        this.state.actioNotSignedDocSatut.map((actio, key) => (

                                                                                            actio.fullname = actio.firstname + " " + actio.lastname,
                                                                                                <li className="align-items-center d-flex justify-content-between">
                                                                                                    <div
                                                                                                        className="media">
                                                                                                        <div
                                                                                                            className="media-body align-self-center">
                                                                                                            <div
                                                                                                                className="transaction-data">
                                                                                                                <h3 className="m-0">{actio.firstname + " " + actio.lastname} </h3>
                                                                                                                <p className="text-muted mb-0">{actio.email} </p>
                                                                                                            </div>
                                                                                                        </div>
                                                                                                    </div>
                                                                                                    <div
                                                                                                        className="transaction-icon">
                                                                                                        <i className="mdi mdi-contact-mail"
                                                                                                           onClick={() => this.sendMailStatutToActio(actio.id, actio.email)}
                                                                                                           style={{
                                                                                                               cursor: 'pointer',
                                                                                                               color: "crimson"
                                                                                                           }}>
                                                                                                        </i>&nbsp;&nbsp;
                                                                                                        <i className="mdi mdi-message-reply-text"
                                                                                                           onClick={this.sendSMSStatutToActio(actio.id, actio.phone, actio.fullname)}
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
                                                            }

                                                        </div>
                                                    }

                                                </div>

                                                <div className={"tab-pane fade"}
                                                     id={"augmCapital"}
                                                     role="tabpanel" aria-labelledby={"v-pills-augmCapital"}>
                                                    <h6>
                                                        <i className="fa fa-paperclip mb-2"></i> Documents <span>({this.state.augmCapitalArray.length})</span>
                                                    </h6>


                                                    {
                                                        this.state.selectedEntreprise.paysOrigine !== "Suisse" ?
                                                            this.state.augmCapitalArray.map((item, key) => (
                                                                <div>
                                                                    <div className="row">
                                                                        <div className="col-sm-2">
                                                                            <a style={{cursor: 'pointer'}}>
                                                                                <img src={pdfImage}
                                                                                     style={{maxHeight: 60}}
                                                                                     alt="attachment"
                                                                                     onClick={this.showAugmCapitalDoc(key)}
                                                                                     className="img-thumbnail img-responsive"/>
                                                                            </a>
                                                                            <p style={{fontSize: "x-small"}}>
                                                                                AugmCapital-{moment(item.dateCreation).format("DD-MM-YYYY")}</p>
                                                                        </div>
                                                                        <div className="col-sm-10">
                                                                            {
                                                                                item.signaturesAGE && item.signaturesAGE.length === allActios.length ?
                                                                                    <span
                                                                                        className="badge bg-soft-success text-success p-1"
                                                                                        style={{
                                                                                            marginTop: 10,
                                                                                            fontSize: "0.7rem"
                                                                                        }}>
                                                                            Signé par tous les actionnaires
                                                                        </span> :
                                                                                    <h4 style={{fontWeight: 'bold'}}
                                                                                        className="header-title mt-0 mb-3">
                                                                                        En attente de signature de :
                                                                                    </h4>
                                                                            }
                                                                            <ul className="list-unsyled m-0 pl-0 transaction-history">

                                                                                {
                                                                                    allActios.map((actio, k1) => (
                                                                                        actio.fullname = actio.firstname + " " + actio.lastname,
                                                                                            item.signaturesAGE === undefined ?
                                                                                                <li className="align-items-center d-flex justify-content-between">
                                                                                                    <div
                                                                                                        className="media">
                                                                                                        <div
                                                                                                            className="media-body align-self-center">
                                                                                                            <div
                                                                                                                className="transaction-data">
                                                                                                                <h3 className="m-0">{actio.firstname + " " + actio.lastname} </h3>
                                                                                                                <p className="text-muted mb-0">{actio.email} </p>
                                                                                                            </div>
                                                                                                        </div>
                                                                                                    </div>
                                                                                                    <div
                                                                                                        className="transaction-icon">
                                                                                                        <i className="mdi mdi-contact-mail"
                                                                                                           style={{
                                                                                                               cursor: 'pointer',
                                                                                                               color: "crimson"
                                                                                                           }}>
                                                                                                        </i>&nbsp;&nbsp;
                                                                                                        <i className="mdi mdi-message-reply-text"
                                                                                                           onClick={this.sendSMSAGEToActio(key, actio.id, actio.phone, actio.fullname, item.dateCreation)}
                                                                                                           style={{
                                                                                                               cursor: 'pointer',
                                                                                                               color: "cornflowerblue"
                                                                                                           }}>
                                                                                                        </i>
                                                                                                    </div>
                                                                                                </li> :
                                                                                                item.signaturesAGE.find(x => x.actId === actio.id) === undefined &&

                                                                                                <li className="align-items-center d-flex justify-content-between">
                                                                                                    <div
                                                                                                        className="media">
                                                                                                        <div
                                                                                                            className="media-body align-self-center">
                                                                                                            <div
                                                                                                                className="transaction-data">
                                                                                                                <h3 className="m-0">{actio.firstname + " " + actio.lastname} </h3>
                                                                                                                <p className="text-muted mb-0">{actio.email} </p>
                                                                                                            </div>
                                                                                                        </div>
                                                                                                    </div>
                                                                                                    <div
                                                                                                        className="transaction-icon">
                                                                                                        <i className="mdi mdi-contact-mail"
                                                                                                           style={{
                                                                                                               cursor: 'pointer',
                                                                                                               color: "crimson"
                                                                                                           }}>
                                                                                                        </i>&nbsp;&nbsp;
                                                                                                        <i className="mdi mdi-message-reply-text"
                                                                                                           onClick={this.sendSMSAGEToActio(key, actio.id, actio.phone, actio.fullname, item.dateCreation)}
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
                                                                    <div style={{
                                                                        height: 1,
                                                                        backgroundColor: "#C0C0C0",
                                                                        marginLeft: 20,
                                                                        marginRight: 20,
                                                                        marginTop: 10,
                                                                        marginBottom: 10
                                                                    }}/>
                                                                </div>
                                                            )) :

                                                            (this.state.selectedEntreprise.augmCapital || []).map((item, key) => (
                                                                <div>
                                                                    <div className="row">
                                                                        <div className="col-md-12">
                                                                            <h5>Augmentation de capital du {moment(item.dateCreation).format("DD MMMM YYYY")}</h5>
                                                                            <span style={{color: "grey"}}>Agio d'émission: <span
                                                                                style={{color: "#000"}}>{item.agio}</span></span><br/>
                                                                        </div>
                                                                    </div>
                                                                    <div className="row">
                                                                        <div className="col-sm-3 mt-2">
                                                                            <div align="center">
                                                                                <a style={{cursor: 'pointer'}}>
                                                                                    <img src={pdfImage}
                                                                                         style={{maxHeight: 60}}
                                                                                         alt="attachment"
                                                                                         onClick={this.showSARLStatutAugmDocument(key)}
                                                                                         className="img-thumbnail img-responsive"/>
                                                                                </a>
                                                                                <p style={{
                                                                                    fontSize: "x-small",
                                                                                    marginBottom: "0.2rem"
                                                                                }}>Statut</p>
                                                                                <span
                                                                                    className="badge bg-danger text-white"
                                                                                    style={{
                                                                                        marginTop: -10,
                                                                                        cursor: "pointer"
                                                                                    }}
                                                                                    onClick={() => this.props.history.push("/detailsDoc",
                                                                                        {
                                                                                            societe: this.state.selectedEntreprise,
                                                                                            typeDoc: "StatutAugm",
                                                                                            isSignedByAllGerants: this.state.isAllGerantsSign,
                                                                                            isSignedByAllAssocies: this.state.isAllAssociesSign
                                                                                        })}>
                                                                                    détails&nbsp;<i
                                                                                    className="mdi mdi-arrow-right text-white"/></span>

                                                                            </div>
                                                                        </div>
                                                                        <div className="col-md-9 mt-3">
                                                                            <div className="float-right">
                                                                                <img src={signQlogo} alt="qrcode"
                                                                                     style={{
                                                                                         height: 60,
                                                                                         width: 60,
                                                                                         objectFit: "contain"
                                                                                     }}/>
                                                                                {
                                                                                    this.state.selectedEntreprise.ipfsHashStatutAugm ?
                                                                                        <span
                                                                                            className="badge bg-soft-success text-success p-1"
                                                                                            style={{
                                                                                                marginTop: 10,
                                                                                                fontSize: "0.7rem"
                                                                                            }}>
                                                                                            Document signé
                                                                                        </span> :

                                                                                        <Button color="primary"
                                                                                                onClick={this.signDocWithGeneve("statut")}
                                                                                                className="btn btn-success waves-effect waves-light">
                                                                                            Signer le document<br/>
                                                                                        </Button>

                                                                                }

                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                    <div style={{
                                                                        height: 2,
                                                                        backgroundColor: "#F0F0F0",
                                                                        marginLeft: 20,
                                                                        marginRight: 20,
                                                                        marginTop: 10,
                                                                        marginBottom: 10
                                                                    }}/>
                                                                    <div className="row">
                                                                        <div className="col-sm-3 mt-2">
                                                                            <div align="center">
                                                                                <a style={{cursor: 'pointer'}}>
                                                                                    <img src={pdfImage}
                                                                                         style={{maxHeight: 60}}
                                                                                         alt="attachment"
                                                                                         onClick={this.showSARLRapportAugmDocument(key)}
                                                                                         className="img-thumbnail img-responsive"/>
                                                                                </a>
                                                                                <p style={{
                                                                                    fontSize: "x-small",
                                                                                    marginBottom: "0.2rem"
                                                                                }}>Rapport d'augm.</p>
                                                                                <span
                                                                                    className="badge bg-danger text-white"
                                                                                    style={{
                                                                                        marginTop: -10,
                                                                                        cursor: "pointer"
                                                                                    }}
                                                                                    onClick={() => this.props.history.push("/detailsDoc",
                                                                                        {
                                                                                            societe: this.state.selectedEntreprise,
                                                                                            typeDoc: "RapportAugm",
                                                                                            isSignedByAllGerants: this.state.isAllGerantsSign,
                                                                                            isSignedByAllAssocies: this.state.isAllAssociesSign
                                                                                        })}>
                                                                                    détails&nbsp;<i
                                                                                    className="mdi mdi-arrow-right text-white"/></span>

                                                                            </div>
                                                                        </div>
                                                                        <div className="col-md-9 mt-3">
                                                                            <div className="float-right">
                                                                                <img src={signQlogo} alt="qrcode"
                                                                                     style={{
                                                                                         height: 60,
                                                                                         width: 60,
                                                                                         objectFit: "contain"
                                                                                     }}/>
                                                                                {
                                                                                    this.state.selectedEntreprise.ipfsHashRapportAugm ?
                                                                                        <span
                                                                                            className="badge bg-soft-success text-success p-1"
                                                                                            style={{
                                                                                                marginTop: 10,
                                                                                                fontSize: "0.7rem"
                                                                                            }}>
                                                                                            Document signé
                                                                                        </span> :

                                                                                        <Button color="primary"
                                                                                                onClick={this.signDocWithGeneve("statut")}
                                                                                                className="btn btn-success waves-effect waves-light">
                                                                                            Signer le document<br/>
                                                                                        </Button>

                                                                                }
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                    <div style={{
                                                                        height: 2,
                                                                        backgroundColor: "#F0F0F0",
                                                                        marginLeft: 20,
                                                                        marginRight: 20,
                                                                        marginTop: 10,
                                                                        marginBottom: 10
                                                                    }}/>
                                                                    <div className="row">
                                                                        <div className="col-sm-3 mt-2">
                                                                            <div align="center">
                                                                                <a style={{cursor: 'pointer'}}>
                                                                                    <img src={pdfImage}
                                                                                         style={{maxHeight: 60}}
                                                                                         alt="attachment"
                                                                                         onClick={this.showSARLDeclarationAugmDocument(key)}
                                                                                         className="img-thumbnail img-responsive"/>
                                                                                </a>
                                                                                <p style={{
                                                                                    fontSize: "x-small",
                                                                                    marginBottom: "0.2rem"
                                                                                }}>Déclaration I,II</p>
                                                                                <span
                                                                                    className="badge bg-danger text-white"
                                                                                    style={{
                                                                                        marginTop: -10,
                                                                                        cursor: "pointer"
                                                                                    }}
                                                                                    onClick={() => this.props.history.push("/detailsDoc",
                                                                                        {
                                                                                            societe: this.state.selectedEntreprise,
                                                                                            typeDoc: "DeclAugm",
                                                                                            isSignedByAllGerants: this.state.isAllGerantsSign,
                                                                                            isSignedByAllAssocies: this.state.isAllAssociesSign
                                                                                        })}>
                                                                                    détails&nbsp;<i
                                                                                    className="mdi mdi-arrow-right text-white"/></span>

                                                                            </div>
                                                                        </div>
                                                                        <div className="col-md-9 mt-3">
                                                                            <div className="float-right">
                                                                                <img src={signQlogo} alt="qrcode"
                                                                                     style={{
                                                                                         height: 60,
                                                                                         width: 60,
                                                                                         objectFit: "contain"
                                                                                     }}/>
                                                                                {
                                                                                    this.state.selectedEntreprise.ipfsHashDecAugm ?
                                                                                        <span
                                                                                            className="badge bg-soft-success text-success p-1"
                                                                                            style={{
                                                                                                marginTop: 10,
                                                                                                fontSize: "0.7rem"
                                                                                            }}>
                                                                                            Document signé
                                                                                        </span> :

                                                                                        <Button color="primary"
                                                                                                onClick={this.signDocWithGeneve("statut")}
                                                                                                className="btn btn-success waves-effect waves-light">
                                                                                            Signer le document<br/>
                                                                                        </Button>

                                                                                }
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                    <div style={{
                                                                        height: 2,
                                                                        backgroundColor: "#F0F0F0",
                                                                        marginLeft: 20,
                                                                        marginRight: 20,
                                                                        marginTop: 10,
                                                                        marginBottom: 10
                                                                    }}/>
                                                                    <div className="row">
                                                                        <div className="col-sm-3 mt-2">
                                                                            <div align="center">
                                                                                <a style={{cursor: 'pointer'}}>
                                                                                    <img src={pdfImage}
                                                                                         style={{maxHeight: 60}}
                                                                                         alt="attachment"
                                                                                         onClick={this.showSARLRequisistionAugmDocument(key)}
                                                                                         className="img-thumbnail img-responsive"/>
                                                                                </a>
                                                                                <p style={{
                                                                                    fontSize: "x-small",
                                                                                    marginBottom: "0.2rem"
                                                                                }}>Réqusition</p>
                                                                                <span
                                                                                    className="badge bg-danger text-white"
                                                                                    style={{
                                                                                        marginTop: -10,
                                                                                        cursor: "pointer"
                                                                                    }}
                                                                                    onClick={() => this.props.history.push("/detailsDoc",
                                                                                        {
                                                                                            societe: this.state.selectedEntreprise,
                                                                                            typeDoc: "RequisitionAugm",
                                                                                            isSignedByAllGerants: this.state.isAllGerantsSign,
                                                                                            isSignedByAllAssocies: this.state.isAllAssociesSign
                                                                                        })}>
                                                                                    détails&nbsp;<i
                                                                                    className="mdi mdi-arrow-right text-white"/></span>
                                                                            </div>
                                                                        </div>
                                                                        <div className="col-md-9 mt-3">
                                                                            <div className="float-right">
                                                                                <img src={signQlogo} alt="qrcode"
                                                                                     style={{
                                                                                         height: 60,
                                                                                         width: 60,
                                                                                         objectFit: "contain"
                                                                                     }}/>
                                                                                {
                                                                                    this.state.selectedEntreprise.ipfsHashReqAugm ?
                                                                                        <span
                                                                                            className="badge bg-soft-success text-success p-1"
                                                                                            style={{
                                                                                                marginTop: 10,
                                                                                                fontSize: "0.7rem"
                                                                                            }}>
                                                                                            Document signé
                                                                                        </span> :

                                                                                        <Button color="primary"
                                                                                                onClick={this.signDocWithGeneve("statut")}
                                                                                                className="btn btn-success waves-effect waves-light">
                                                                                            Signer le document<br/>
                                                                                        </Button>

                                                                                }
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                    <div className="row">
                                                                        <div className="col-sm-3 mt-2">
                                                                            <div align="center">
                                                                                <a style={{cursor: 'pointer'}}>
                                                                                    <img src={pdfImage}
                                                                                         style={{maxHeight: 60}}
                                                                                         alt="attachment"
                                                                                         onClick={this.showSARLPvAGEAugmDocument(key)}
                                                                                         className="img-thumbnail img-responsive"/>
                                                                                </a>
                                                                                <p style={{
                                                                                    fontSize: "x-small",
                                                                                    marginBottom: "0.2rem"
                                                                                }}>Pv_AGE</p>
                                                                                <span
                                                                                    className="badge bg-danger text-white"
                                                                                    style={{
                                                                                        marginTop: -10,
                                                                                        cursor: "pointer"
                                                                                    }}
                                                                                    onClick={() => this.props.history.push("/detailsDoc",
                                                                                        {
                                                                                            societe: this.state.selectedEntreprise,
                                                                                            typeDoc: "PvAgeAugm",
                                                                                            isSignedByAllGerants: this.state.isAllGerantsSign,
                                                                                            isSignedByAllAssocies: this.state.isAllAssociesSign
                                                                                        })}>
                                                                                    détails&nbsp;<i
                                                                                    className="mdi mdi-arrow-right text-white"/></span>
                                                                            </div>
                                                                        </div>
                                                                        <div className="col-md-9 mt-3">
                                                                            <div className="float-right">
                                                                                <img src={signQlogo} alt="qrcode"
                                                                                     style={{
                                                                                         height: 60,
                                                                                         width: 60,
                                                                                         objectFit: "contain"
                                                                                     }}/>
                                                                                {
                                                                                    this.state.selectedEntreprise.ipfsHashPvAgeAugm ?
                                                                                        <span
                                                                                            className="badge bg-soft-success text-success p-1"
                                                                                            style={{
                                                                                                marginTop: 10,
                                                                                                fontSize: "0.7rem"
                                                                                            }}>
                                                                                            Document signé
                                                                                        </span> :

                                                                                        <Button color="primary"
                                                                                                onClick={this.signDocWithGeneve("statut")}
                                                                                                className="btn btn-success waves-effect waves-light">
                                                                                            Signer le document<br/>
                                                                                        </Button>

                                                                                }
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                    <div style={{
                                                                        height: 2,
                                                                        backgroundColor: "#F0F0F0",
                                                                        marginLeft: 20,
                                                                        marginRight: 20,
                                                                        marginTop: 10,
                                                                        marginBottom: 10
                                                                    }}/>
                                                                </div>
                                                            ))

                                                    }
                                                </div>


                                                <div className={"tab-pane fade"}
                                                     id={"BSA"}
                                                     role="tabpanel" aria-labelledby={"v-pills-BSA"}>
                                                    <h6>
                                                        <i className="fa fa-paperclip mb-2"/> Documents
                                                    </h6>
                                                    {
                                                        this.state.selectedEntreprise.paysOrigine === "Suisse" ?
                                                            <div className="row">
                                                                {
                                                                        (this.state.selectedEntreprise.titresBSA || []).map((titreBSA, titreKey) => (

                                                                            (titreBSA.operations || []).map((op, opKey) => (

                                                                                titreBSA.bfname = titreBSA.beneficiaire.ej_name === "" ?
                                                                                    titreBSA.beneficiaire.firstname + " " + titreBSA.beneficiaire.lastname : titreBSA.beneficiaire.ej_name,

                                                                                <div className="col-sm-4 mb-3 text-center">
                                                                                    <a style={{cursor: 'pointer'}}>
                                                                                        <img src={pdfImage}
                                                                                             style={{maxHeight: 60}}
                                                                                             alt="attachment"
                                                                                             onClick={this.showStockoptionDocument( titreKey, opKey)}
                                                                                             className="img-thumbnail img-responsive"/>
                                                                                    </a>
                                                                                    {
                                                                                        this.state.selectedEntreprise.paysOrigine === "Suisse" &&
                                                                                            <div align="center">
                                                                                                <p style={{fontSize: "x-small",marginTop:10}}>
                                                                                                    Proposition de stocke option pour {titreBSA.beneficiaire.ej_name === "" ?
                                                                                                    titreBSA.beneficiaire.firstname + " " + titreBSA.beneficiaire.lastname : titreBSA.beneficiaire.ej_name} </p>
                                                                                                <span className="badge bg-danger text-white"
                                                                                                      onClick={() => this.props.history.push("/coffre-fort/stockOption/"+titreKey+"/"+opKey+"/"+titreBSA.bfname)}
                                                                                                    style={{cursor: "pointer"}}> Détails&nbsp;<i className="mdi mdi-arrow-right text-white"/>
                                                                                                </span>

                                                                                            </div>

                                                                                    }

                                                                                </div>

                                                                            ))
                                                                        ))
                                                                }

                                                                {
                                                                    (this.state.selectedEntreprise.sAdministrator || []).map((item, actiokey) => (

                                                                        (item.titresBSA || []).map((titreBSA, titreKey) => (

                                                                            (titreBSA.operations || []).map((op, opKey) => (


                                                                                <div className="col-sm-2">
                                                                                    <a style={{cursor: 'pointer'}}>
                                                                                        <img src={pdfImage}
                                                                                             style={{maxHeight: 60}}
                                                                                             alt="attachment"
                                                                                             onClick={this.showStockoptionDocument(actiokey, titreKey, opKey, "admin")}
                                                                                             className="img-thumbnail img-responsive"/>
                                                                                    </a>
                                                                                    {
                                                                                        this.state.selectedEntreprise.paysOrigine === "Suisse" ?
                                                                                            <p style={{fontSize: "x-small"}}>
                                                                                                Stock-Option{moment(op.dateLeveeOption).format("DD-MM-YYYY")}</p> :
                                                                                            <p style={{fontSize: "x-small"}}>
                                                                                                Emission-BSA-{moment(op.dateLeveeOption).format("DD-MM-YYYY")}</p>
                                                                                    }

                                                                                </div>

                                                                            ))
                                                                        ))
                                                                    ))
                                                                }

                                                            </div> :

                                                            <div>

                                                                {
                                                                    (this.state.selectedEntreprise.sActionnairePhy || []).map((item, actiokey) => (

                                                                        (item.titresBSA || []).map((titreBSA, titreKey) => (

                                                                            (titreBSA.operations || []).map((op, opKey) => (

                                                                                <div className="row mt-2">

                                                                                    <div className="col-sm-2">
                                                                                        <a style={{cursor: 'pointer'}}>
                                                                                            <img src={pdfImage}
                                                                                                 style={{maxHeight: 60}}
                                                                                                 alt="attachment"
                                                                                                 onClick={this.showBSADocument(actiokey, titreKey, opKey, item.type)}
                                                                                                 className="img-thumbnail img-responsive"/>
                                                                                        </a>
                                                                                        <p style={{fontSize: "x-small"}}>
                                                                                            Emission-BSA-{moment(op.dateLeveeOption).format("DD-MM-YYYY")}</p>

                                                                                    </div>
                                                                                    <div className="col-sm-10">

                                                                                        {
                                                                                            op.signatureUrl ? ""
                                                                                                :
                                                                                                <h4 style={{fontWeight: 'bold'}}
                                                                                                    className="header-title mt-0 mb-3">
                                                                                                    En attente de
                                                                                                    signature de :
                                                                                                </h4>

                                                                                        }
                                                                                        <ul className="list-unsyled m-0 pl-0 transaction-history">
                                                                                            <li className="align-items-center d-flex justify-content-between">
                                                                                                <div className="media">
                                                                                                    <div
                                                                                                        className="media-body align-self-center">
                                                                                                        <div
                                                                                                            className="transaction-data">
                                                                                                            <h3 className="m-0">{item.firstname + " " + item.lastname} </h3>
                                                                                                            <p className="text-muted mb-0">{item.email} </p>
                                                                                                        </div>
                                                                                                    </div>
                                                                                                </div>
                                                                                                {
                                                                                                    op.signatureUrl ?
                                                                                                        <div
                                                                                                            className="transaction-icon">
                                                                                                            <span
                                                                                                                className="badge bg-soft-success text-success p-1">Signé</span>
                                                                                                        </div> :

                                                                                                        <div
                                                                                                            className="transaction-icon">
                                                                                                            <i className="mdi mdi-contact-mail"
                                                                                                               onClick={this.sendBSASignDocToActio(item.id, item.email, titreKey, opKey)}
                                                                                                               style={{
                                                                                                                   cursor: 'pointer',
                                                                                                                   color: "crimson"
                                                                                                               }}>
                                                                                                            </i>&nbsp;&nbsp;
                                                                                                            <i className="mdi mdi-message-reply-text"
                                                                                                               onClick={() => {
                                                                                                               }}
                                                                                                               style={{
                                                                                                                   cursor: 'pointer',
                                                                                                                   color: "cornflowerblue"
                                                                                                               }}>
                                                                                                            </i>
                                                                                                        </div>

                                                                                                }

                                                                                            </li>
                                                                                        </ul>
                                                                                    </div>

                                                                                </div>

                                                                            ))
                                                                        ))
                                                                    ))
                                                                }
                                                            </div>


                                                    }

                                                </div>

                                                {
                                                    this.state.selectedEntreprise.paysOrigine === "Suisse" &&

                                                    <div className={"tab-pane fade"} id={"CessionAction"}
                                                         role="tabpanel" aria-labelledby={"v-pills-CessionAction"}>
                                                        <h6>
                                                            <i className="fa fa-paperclip mb-2"/> Documents <span>({this.state.cessionActionsArray.length})</span>
                                                        </h6>

                                                        {
                                                            this.state.cessionActionsArray.map((item, key) => (
                                                                <div className="row">
                                                                    <div className="col-sm-4">
                                                                        <a style={{cursor: 'pointer'}}>
                                                                            <img src={pdfImage}
                                                                                 onClick={this.showCessionActionDoc(key)}
                                                                                 style={{maxHeight: 60}}
                                                                                 alt="attachment"
                                                                                 className="img-thumbnail img-responsive"/>
                                                                        </a>
                                                                        <p style={{fontSize: "x-small"}}>
                                                                            CessionAction-{item.cedant.nomPrenom + "_" + item.cessionnaire.nomPrenom}</p>
                                                                    </div>
                                                                    <div className="col-md-8">
                                                                        <div className="text-center">
                                                                            <span
                                                                                className="badge bg-soft-success text-success p-1"
                                                                                style={{
                                                                                    marginTop: 10,
                                                                                    fontSize: "0.7rem"
                                                                                }}>
                                                                                Signé par l'administrateur de la société
                                                                            </span>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            ))
                                                        }

                                                    </div>

                                                }


                                                {
                                                    this.state.selectedEntreprise.paysOrigine === "Suisse" &&

                                                    <div className={"tab-pane fade"}
                                                         id={"ObligationBonds"}
                                                         role="tabpanel" aria-labelledby={"v-pills-ObligationBonds"}>
                                                        <h6>
                                                            <i className="fa fa-paperclip mb-2"/> Documents <span>({(this.state.selectedEntreprise.EmissionTitre || []).length})</span>
                                                        </h6>

                                                        {
                                                            (this.state.selectedEntreprise.EmissionTitre || []).map((item, key) => (
                                                                <div className="row">
                                                                    <div className="col-sm-2">
                                                                        <a style={{cursor: 'pointer'}}>
                                                                            <img src={pdfImage} style={{maxHeight: 60}}
                                                                                 alt="attachment"
                                                                                 onClick={this.showObligationBondslDoc(key)}
                                                                                 className="img-thumbnail img-responsive"/>
                                                                        </a>
                                                                        <p style={{fontSize: "x-small"}}>
                                                                            Obligation
                                                                            Bonds-{moment(item.date).format("DD-MM-YYYY")}</p>
                                                                    </div>

                                                                    <div className="col-sm-10" style={{marginTop: 5}}>
                                                                        {
                                                                            item.signature !== "" ?
                                                                                <div className="text-center">
                                                                                        <span
                                                                                            className="badge bg-soft-success text-success p-1"
                                                                                            style={{
                                                                                                marginTop: 10,
                                                                                                fontSize: "0.7rem"
                                                                                            }}>
                                                                                          Signé par le gérant de la société
                                                                                        </span>
                                                                                </div> :
                                                                                <h4 style={{fontWeight: 'bold'}}
                                                                                    className="header-title mt-0 mb-3">
                                                                                    En attente de signature du gérant de
                                                                                    la société
                                                                                    :
                                                                                </h4>
                                                                        }
                                                                        <ul className="list-unsyled m-0 pl-0 transaction-history ml-3">
                                                                            {
                                                                                item.signature === "" &&
                                                                                <li className="align-items-center d-flex justify-content-between">
                                                                                    <div className="media">
                                                                                        <div
                                                                                            className="media-body align-self-center">
                                                                                            <div
                                                                                                className="transaction-data">
                                                                                                <h3 className="m-0">
                                                                                                    {this.state.selectedEntreprise.sAdministrator[0].firstname + " " + this.state.selectedEntreprise.sAdministrator[0].lastname} </h3>
                                                                                                <p className="text-muted mb-0">{this.state.selectedEntreprise.sAdministrator[0].email} </p>
                                                                                            </div>
                                                                                        </div>
                                                                                    </div>
                                                                                    <div  //888
                                                                                        className="transaction-icon">
                                                                                        <i className="mdi mdi-contact-mail"
                                                                                           onClick={this.sendSARLObligationBondsInvitationToSign(this.state.selectedEntreprise.sAdministrator[0].email, key, "gerant")}
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
                                                                            }

                                                                        </ul>
                                                                    </div>

                                                                </div>


                                                            ))
                                                        }

                                                    </div>

                                                }


                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

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
                                                <h5 style={{ color: '#fa5b35' }}>Chargement...</h5>
                                            }
                                        />
                                </ModalBody>
                            </Modal>

                            <Snackbar
                                anchorOrigin={{
                                    vertical: 'bottom',
                                    horizontal: 'left',
                                }}
                                open={this.state.openAlert}
                                //autoHideDuration={5000}
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

export default coffreFort;