import React, {Component, Suspense} from "react";
import {Button, Container} from "reactstrap";
import Loader from "../../components/Loader";
import pdfImage from "../../assets/images/pdfimage.jpg";
import qrcode from "qrcode";
import signQlogo from "../../assets/canton-GE.png"
import firebase from "firebase/app";
import "firebase/database"
import augmCapitalService from "../../provider/augmCapitalService";
import entrepriseSARLService from "../../provider/entrepriseSARLService";


const Topbar = React.lazy(() => import("../../components/Topbar"));
const Navbar = React.lazy(() => import("../../components/Navbar"));
const loading = () => <Loader/>;

class detailDoc extends Component {


    constructor(props) {
        super(props);
        this.state = {
            activeMenuItem: 'item-cf',
            societe: this.props.location.state.societe,
            typeDoc: this.props.location.state.typeDoc,
            isSignedByAllGerants: this.props.location.state.isSignedByAllGerants,
            isSignedByAllAssocies: this.props.location.state.isSignedByAllAssocies,
            qrCodeimg: "",
            signatureQuser: "",
        }
    }

    componentWillMount() {

        if ((this.props.location.state.societe.ipfsHashStatut && this.props.location.state.societe.ipfsHashStatut !== "" && this.state.typeDoc === "Statut") ||
            (this.props.location.state.societe.ipfsHashProc && this.props.location.state.societe.ipfsHashProc !== "" && this.state.typeDoc === "Procuration") ||
            (this.props.location.state.societe.ipfsHashDec && this.props.location.state.societe.ipfsHashDec !== "" && this.state.typeDoc === "Déclaration.i.ii") ||
            (this.props.location.state.societe.ipfsHashOpt && this.props.location.state.societe.ipfsHashOpt !== "" && this.state.typeDoc === "OptingOutGerant") ||
            (this.props.location.state.societe.ipfsHashReq && this.props.location.state.societe.ipfsHashReq !== "" && this.state.typeDoc === "Requisition") ||
            (this.props.location.state.societe.ipfsHashStatutAugm && this.props.location.state.societe.ipfsHashStatutAugm !== "" && this.state.typeDoc === "StatutAugm") ||
            (this.props.location.state.societe.ipfsHashRapportAugm && this.props.location.state.societe.ipfsHashRapportAugm !== "" && this.state.typeDoc === "RapportAugm") ||
            (this.props.location.state.societe.ipfsHashDecAugm && this.props.location.state.societe.ipfsHashDecAugm !== "" && this.state.typeDoc === "DeclAugm") ||
            (this.props.location.state.societe.ipfsHashReqAugm && this.props.location.state.societe.ipfsHashReqAugm !== "" && this.state.typeDoc === "RequisitionAugm") ||
            (this.props.location.state.societe.ipfsHashPvAgeAugm && this.props.location.state.societe.ipfsHashPvAgeAugm !== "" && this.state.typeDoc === "PvAgeAugm") ||
            (this.props.location.state.societe.ipfsHashTransformation && this.props.location.state.societe.ipfsHashTransformation !== "" && this.state.typeDoc === "Transformation")
        ) {

            firebase.database().ref("/users/" + this.props.location.state.societe.uniqueId.replace(this.props.location.state.societe.paysOrigine, ""))
                .on("value", (snapshot) => {
                    let user = snapshot.val();
                    this.setState({signatureQuser: user})
                });
        }

        if (this.props.location.state.typeDoc === "Statut" && this.props.location.state.societe.statutDocUrl && this.props.location.state.societe.statutDocUrl !== "") {
            qrcode.toDataURL(this.props.location.state.societe.statutDocUrl).then(img => {
                this.setState({qrCodeimg: img})
            }).catch(err => console.log(err))
        }
        if (this.props.location.state.typeDoc === "Procuration" && this.props.location.state.societe.procurationDocUrl && this.props.location.state.societe.procurationDocUrlDocUrl !== "") {
            qrcode.toDataURL(this.props.location.state.societe.procurationDocUrl).then(img => {
                this.setState({qrCodeimg: img})
            }).catch(err => console.log(err))
        }
        if (this.props.location.state.typeDoc === "Déclaration.i.ii" && this.props.location.state.societe.declarationDocUrl && this.props.location.state.societe.declarationDocUrl !== "") {
            qrcode.toDataURL(this.props.location.state.societe.declarationDocUrl).then(img => {
                this.setState({qrCodeimg: img})
            }).catch(err => console.log(err))
        }
        if (this.props.location.state.typeDoc === "OptingOutGerant" && this.props.location.state.societe.optingOutGerantDocUrl && this.props.location.state.societe.optingOutGerantDocUrl !== "") {
            qrcode.toDataURL(this.props.location.state.societe.optingOutGerantDocUrl).then(img => {
                this.setState({qrCodeimg: img})
            }).catch(err => console.log(err))
        }
        if (this.props.location.state.typeDoc === "Procuration" && this.props.location.state.societe.procurationDocUrl && this.props.location.state.societe.procurationDocUrl !== "") {
            qrcode.toDataURL(this.props.location.state.societe.procurationDocUrl).then(img => {
                this.setState({qrCodeimg: img})
            }).catch(err => console.log(err))
        }
        if (this.props.location.state.typeDoc === "Requisition" && this.props.location.state.societe.requisitionDocUrl && this.props.location.state.societe.requisitionDocUrl !== "") {
            qrcode.toDataURL(this.props.location.state.societe.requisitionDocUrl).then(img => {
                this.setState({qrCodeimg: img})
            }).catch(err => console.log(err))
        }


    }

    showStatutDocument = () => {

        this.setState({loading: true});
        let uid = this.state.societe.uniqueId;
        let pays = this.state.societe.paysOrigine;

        if (this.state.societe.statutDocUrl && this.state.societe.statutDocUrl !== "") {
            window.open(this.state.societe.statutDocUrl);
            this.setState({loading: false});
        } else {


            if (this.state.isSignedByAllGerants === true && this.state.isSignedByAllGerants === true) {
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
                                this.props.history.goBack();
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

    showProcurationDocument = () => {

        this.setState({loading: true});
        let uid = this.state.societe.uniqueId;
        let pays = this.state.societe.paysOrigine;

        if (this.state.societe.procurationDocUrl && this.state.societe.procurationDocUrl !== "") {
            window.open(this.state.societe.procurationDocUrl);
            this.setState({loading: false});
        } else {

            if (this.state.isSignedByAllAssocies === true) {
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
                                this.props.history.goBack();
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

    showDeclarationDocument = () => {

        this.setState({loading: true});
        let uid = this.state.societe.uniqueId;
        let pays = this.state.societe.paysOrigine;

        if (this.state.societe.declarationDocUrl && this.state.societe.declarationDocUrl !== "") {
            window.open(this.state.societe.declarationDocUrl);
            this.setState({loading: false});
        } else {


            if (this.state.isSignedByAllAssocies === true) {
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
                                this.props.history.goBack();
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

    showOptingOutGerantDocument = () => {

        this.setState({loading: true});
        let uid = this.state.societe.uniqueId;
        let pays = this.state.societe.paysOrigine;

        if (this.state.societe.optingOutGerantDocUrl && this.state.societe.optingOutGerantDocUrl !== "") {
            window.open(this.state.societe.optingOutGerantDocUrl);
            this.setState({loading: false});
        } else {

            if (this.state.isSignedByAllGerants === true) {
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
                                this.props.history.goBack();
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

    showRequisitionDocument = () => {

        this.setState({loading: true});
        let uid = this.state.societe.uniqueId;
        let pays = this.state.societe.paysOrigine;


        if (this.state.societe.requisitionDocUrl && this.state.societe.requisitionDocUrl !== "") {
            window.open(this.state.societe.requisitionDocUrl);
            this.setState({loading: false});
        } else {


            if (this.state.isSignedByAllGerants === true) {
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
                                this.props.history.goBack();
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

    showTransformationDoc = ()  => {
        console.log("babba")
        this.setState({loading:true});
        let uid = this.state.societe.uniqueId;
        let numAugm = this.state.societe.augmCapital.length -1;
        entrepriseSARLService.generateTransformationAugmDoc(uid,numAugm).then( res => {
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

    showSARLStatutAugmDocument = (key)  => {
        this.setState({loading:true});
        let uid = this.state.societe.uniqueId;
        let numAugm = this.state.societe.augmCapital.length -1;
        augmCapitalService.getSARLStatut_Augm(uid,numAugm).then( res => {
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

    showSARLRapportAugmDocument = (key)  => {
        this.setState({loading:true});
        let uid = this.state.societe.uniqueId;
        let numAugm = this.state.societe.augmCapital.length -1;
        augmCapitalService.getSARLrapport_Augm(uid,numAugm).then( res => {
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

    showSARLDeclarationAugmDocument = (key)  => {
        this.setState({loading:true});
        let uid = this.state.societe.uniqueId;
        let numAugm = this.state.societe.augmCapital.length -1;
        augmCapitalService.getSARLDeclarationAugm(uid,numAugm).then( res => {
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

    showSARLRequisistionAugmDocument = (key)  => {
        this.setState({loading:true});
        let uid = this.state.societe.uniqueId;
        let numAugm = this.state.societe.augmCapital.length -1;
        augmCapitalService.getSARLrequisitionAugm(uid,numAugm).then( res => {
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

    showSARLPvAGEAugmDocument = (key)  => {
        this.setState({loading:true});
        let uid = this.state.societe.uniqueId;
        let numAugm = this.state.societe.augmCapital.length -1;
        augmCapitalService.getSARLPvAGEAugm(uid,numAugm).then( res => {
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


    toggleMenu = (e) => {
        e.preventDefault();
        this.setState({isMenuOpened: !this.state.isMenuOpened});
    };

    toggleRightSidebar = () => {
        document.body.classList.toggle("right-bar-enabled");
    };

    changeActivePage = (page) => event => {
        if (page !== '') {
            this.setState({
                activePage: page
            })
        }
    };

    render() {

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
                                    <div className="card-widgets">
                                        <Button onClick={() => this.props.history.goBack()}
                                                className="btn btn-xs btn-light waves-effect waves-light">
                                            Retour
                                        </Button>
                                    </div>
                                    <div className="row" style={{marginTop: 20}}>
                                        <div className="col-md-12">
                                            <div className="form-group mb-3">
                                                <h5>Détails du document</h5>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row" style={{padding: "1%"}}>
                                        <div className="col-sm-12">
                                            <a style={{cursor: 'pointer'}}>
                                                <img src={pdfImage}
                                                     style={{maxHeight: 60}}
                                                     alt="attachment"
                                                     onClick={
                                                         this.state.typeDoc === "Statut" ? this.showStatutDocument :
                                                             this.state.typeDoc === "Procuration" ? this.showProcurationDocument :
                                                                 this.state.typeDoc === "Déclaration.i.ii" ? this.showDeclarationDocument :
                                                                     this.state.typeDoc === "OptingOutGerant" ? this.showOptingOutGerantDocument :
                                                                         this.state.typeDoc === "StatutAugm" ? this.showSARLStatutAugmDocument :
                                                                             this.state.typeDoc === "RapportAugm" ? this.showSARLRapportAugmDocument :
                                                                                 this.state.typeDoc === "DeclAugm" ? this.showSARLDeclarationAugmDocument :
                                                                                     this.state.typeDoc === "RequisitionAugm" ? this.showSARLRequisistionAugmDocument :
                                                                                         this.state.typeDoc === "PvAgeAugm" ? this.showSARLPvAGEAugmDocument :
                                                                                                 this.state.typeDoc === "Transformation" ? this.showTransformationDoc :
                                                                                                     () => {}
                                                     }
                                                     className="img-thumbnail img-responsive"/>
                                            </a>
                                            <p style={{fontSize: "x-small"}}>{this.state.typeDoc}-société</p>
                                        </div>
                                    </div>
                                    <div className="row" style={{padding: "3%", paddingTop: "0.1%"}}>
                                        <div className="col-md-6">
                                            <span
                                                className="font-15 text-dark font-weight-bold">Document:&nbsp;&nbsp;&nbsp;&nbsp;
                                                <span
                                                    className="text-secondary font-weight-normal">{this.state.typeDoc} de la société <b>{this.state.societe.sName}</b></span>
                                            </span><br/><br/>
                                            {
                                                (this.state.typeDoc === "Statut" || this.state.typeDoc === "OptingOutGerant" || this.state.typeDoc === "Requisition") &&
                                                <span className="font-15 text-dark font-weight-bold">Signé par tous les gérants:&nbsp;&nbsp;&nbsp;&nbsp;
                                                    {
                                                        this.state.isSignedByAllGerants === true ?
                                                            <span
                                                                className="badge bg-success text-white font-weight-normal">Oui</span> :
                                                            <span
                                                                className="badge bg-danger text-white font-weight-normal">Non</span>
                                                    }
                                            </span>
                                            }
                                            <br/><br/>
                                            {
                                                (this.state.typeDoc === "Statut" || this.state.typeDoc === "Procuration" || this.state.typeDoc === "Déclaration.i.ii") &&
                                                <span className="font-15 text-dark font-weight-bold">Signé par tous les associés:&nbsp;&nbsp;&nbsp;&nbsp;
                                                    {
                                                        this.state.isSignedByAllAssocies === true ?
                                                            <span
                                                                className="badge bg-success text-white font-weight-normal">Oui</span> :
                                                            <span
                                                                className="badge bg-danger text-white font-weight-normal">Non</span>
                                                    }
                                            </span>
                                            }
                                            <br/><br/><br/>
                                            <div style={{height: 2, backgroundColor: "#F0F0F0"}}/>
                                            <br/>
                                            <span
                                                className="font-15 text-dark font-weight-bold">Signature qualifié:&nbsp;&nbsp;&nbsp;&nbsp;
                                                {
                                                    (this.state.societe.ipfsHashStatut && this.state.societe.ipfsHashStatut !== "" && this.state.typeDoc === "Statut") ||
                                                    (this.state.societe.ipfsHashProc && this.state.societe.ipfsHashProc !== "" && this.state.typeDoc === "Procuration") ||
                                                    (this.state.societe.ipfsHashDec && this.state.societe.ipfsHashDec !== "" && this.state.typeDoc === "Déclaration.i.ii") ||
                                                    (this.state.societe.ipfsHashOpt && this.state.societe.ipfsHashOpt !== "" && this.state.typeDoc === "OptingOutGerant") ||
                                                    (this.state.societe.ipfsHashReq && this.state.societe.ipfsHashReq !== "" && this.state.typeDoc === "Requisition")
                                                        ?
                                                        <span
                                                            className="badge bg-success text-white font-weight-normal">Oui</span> :
                                                        <span
                                                            className="badge bg-danger text-white font-weight-normal">Non</span>
                                                }

                                            </span><br/><br/>
                                            <span
                                                className="font-15 text-dark font-weight-bold">Hash:&nbsp;&nbsp;&nbsp;&nbsp;
                                                {
                                                    this.state.societe.ipfsHashStatut && this.state.societe.ipfsHashStatut !== "" && this.state.typeDoc === "Statut" ?
                                                        <span
                                                            className="text-secondary font-weight-normal"> <b>{this.state.societe.ipfsHashStatut}</b></span> :
                                                        this.state.societe.ipfsHashProc && this.state.societe.ipfsHashProc !== "" && this.state.typeDoc === "Procuration" ?
                                                            <span
                                                                className="text-secondary font-weight-normal"> <b>{this.state.societe.ipfsHashProc}</b></span> :
                                                            this.state.societe.ipfsHashDec && this.state.societe.ipfsHashDec !== "" && this.state.typeDoc === "Déclaration.i.ii" ?
                                                                <span
                                                                    className="text-secondary font-weight-normal"> <b>{this.state.societe.ipfsHashDec}</b></span> :
                                                                this.state.societe.ipfsHashOpt && this.state.societe.ipfsHashOpt !== "" && this.state.typeDoc === "OptingOutGerant" ?
                                                                    <span className="text-secondary font-weight-normal"> <b>{this.state.societe.ipfsHashOpt}</b></span> :
                                                                    this.state.societe.ipfsHashReq && this.state.societe.ipfsHashReq !== "" && this.state.typeDoc === "Requisition" ?
                                                                        <span
                                                                            className="text-secondary font-weight-normal"> <b>{this.state.societe.ipfsHashReq}</b></span> :
                                                                        this.state.societe.ipfsHashStatutAugm && this.state.societe.ipfsHashStatutAugm !== "" && this.state.typeDoc === "StatutAugm" ?
                                                                            <span
                                                                                className="text-secondary font-weight-normal"> <b>{this.state.societe.ipfsHashStatutAugm}</b></span>:
                                                                            this.state.societe.ipfsHashRapportAugm && this.state.societe.ipfsHashRapportAugm !== "" && this.state.typeDoc === "RapportAugm" ?
                                                                                <span
                                                                                    className="text-secondary font-weight-normal"> <b>{this.state.societe.ipfsHashRapportAugm}</b></span>:
                                                                                this.state.societe.ipfsHashDecAugm && this.state.societe.ipfsHashDecAugm !== "" && this.state.typeDoc === "DeclAugm" ?
                                                                                    <span
                                                                                        className="text-secondary font-weight-normal"> <b>{this.state.societe.ipfsHashDecAugm}</b></span>:
                                                                                    this.state.societe.ipfsHashReqAugm && this.state.societe.ipfsHashReqAugm !== "" && this.state.typeDoc === "RequisitionAugm" ?
                                                                                        <span
                                                                                            className="text-secondary font-weight-normal"> <b>{this.state.societe.ipfsHashReqAugm}</b></span>:
                                                                                        this.state.societe.ipfsHashPvAgeAugm && this.state.societe.ipfsHashPvAgeAugm !== "" && this.state.typeDoc === "PvAgeAugm" ?
                                                                                            <span
                                                                                                className="text-secondary font-weight-normal"> <b>{this.state.societe.ipfsHashPvAgeAugm}</b></span>:
                                                                                            this.state.societe.ipfsHashTransformation && this.state.societe.ipfsHashTransformation !== "" && this.state.typeDoc === "Transformation" ?
                                                                                                <span
                                                                                                    className="text-secondary font-weight-normal"> <b>{this.state.societe.ipfsHashTransformation}</b></span>:
                                                                        <span
                                                                            className="text-secondary font-weight-normal"> <b>-----------------------------------------------</b></span>
                                                }
                                            </span><br/><br/>
                                            <span
                                                className="font-15 text-dark font-weight-bold">Accepté par:&nbsp;&nbsp;&nbsp;&nbsp;
                                                {
                                                    this.state.signatureQuser !== "" ?
                                                        <span
                                                            className="text-secondary font-weight-normal"> <b>{this.state.signatureQuser.firstnameG + " " + this.state.signatureQuser.lastnameG} </b></span> :
                                                        <span className="text-secondary font-weight-normal"> <b>--- ---- ----</b></span>
                                                }

                                            </span><br/>

                                        </div>
                                        <div className="col-md-3 mt-2">
                                            <span className="font-15 text-dark font-weight-bold">QrCode:
                                            </span><br/><br/>
                                            {
                                                this.state.qrCodeimg !== "" ?
                                                    <img src={this.state.qrCodeimg} alt="qrcode"
                                                         style={{height: 150}}/> :
                                                    <p className="text-danger" style={{paddingRight: "0.3rem"}}>Non
                                                        disponible, vous devez d'abord ouvrir le document et vérifier
                                                        les signatures</p>
                                            }

                                        </div>
                                        {
                                            this.state.signatureQuser === "" ?
                                                <div className="col-md-3">
                                                    <span className="font-15 text-dark font-weight-bold">Signature qualifié:</span><br/><br/>
                                                    <p style={{lineHeight: 0.1}}>Date: ****</p>
                                                    <p>Par: ---- ---- ----</p>
                                                    <img src={signQlogo} alt="qrcode"
                                                         style={{height: 150, objectFit: "contain"}}/>
                                                </div> :

                                                <div className="col-md-3">
                                                    <span className="font-15 text-dark font-weight-bold">Signature qualifié:</span><br/><br/>
                                                    <p style={{lineHeight: 0.1}}>Date: ****</p>
                                                    <p>Par: {this.state.signatureQuser.firstnameG + " " + this.state.signatureQuser.lastnameG} </p>
                                                    <img src={signQlogo} alt="qrcode"
                                                         style={{height: 150, objectFit: "contain"}}/>
                                                </div>
                                        }
                                    </div>
                                </div>
                            </div>
                        </Suspense>
                    </Container>
                </div>
            </div>
        )
    }

}

export default detailDoc