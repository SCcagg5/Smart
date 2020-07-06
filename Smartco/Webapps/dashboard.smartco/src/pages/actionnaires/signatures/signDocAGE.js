import React, {Component, Suspense} from "react";
import firebase from "firebase/app";
import "firebase/database";
import augmCapitalService from "../../../provider/augmCapitalService";
import {Container} from "reactstrap";
import Loader from "../../../components/Loader";
import PDFViewer from '../../../customComponents/pdf-viewer-reactjs';
import moment from "moment";
import SignDocModal from "./signDocModal";
import userAvatar from  "../../../assets/users/user-5.jpg"
import signatureService from "../../../provider/signatureService";

const BasicTopbar = React.lazy(() => import("../../../components/basicTopBar"));
const loading = () => <Loader/>;

class signDocAGE extends Component {

    state = {
        loadingBtn:false,
        uid: '',
        actId: '',
        pays: '',
        societyData: {},
        allActionnaire: [],
        numAugmentation:'',
        isAllActioSignDocStatut: false,
        sName: '',
        signatures: [],
        isCanSignDoc: true,
        pdfFile: '',
        signatureVerifList: [],
        openModal: false,
        actionnaire:{},
        codeSMSsended:""
    };

    signatEnd = {};


    componentWillMount() {

        const {SocietyUID} = this.props.match.params;
        const {actID} = this.props.match.params;
        const {pays} = this.props.match.params;
        const {numAugmentation} = this.props.match.params;

        this.setState({
            uid: SocietyUID,
            actId: actID,
            pays: pays,
        });

        firebase.database().ref('/society/' + SocietyUID).on('value', (snapshot) => {

            const data = snapshot.val();

            this.setState({
                societyData: data,
                allActionnaire: (data.sActionnairePhy || []).concat(data.sActionnaireMoral || []) //***Correction de bug lien signature***
            });

            // rechercher l'action avec son Id est l'affecter dans le state
            this.setActio(data, actID);

            if (data.augmentationcapital[numAugmentation].signaturesAGE !== null &&
                data.augmentationcapital[numAugmentation].signaturesAGE !== undefined) {

                //vérifier si tous les actionnaires ont signeé le doc AGE
                if ((data.augmentationcapital[numAugmentation].signaturesAGE.length === this.state.allActionnaire.length)) {
                    this.setState({
                        isAllActioSignDocStatut: true
                    });
                }
                this.setState({
                    sName: data.sName,
                    signatures: data.augmentationcapital[numAugmentation].signaturesAGE || []
                });

                if (this.verifIfActSign()) {
                    this.setState({
                        isCanSignDoc: false
                    })
                }
            }
            //Vérifier l'état des signatures de tous les actionnaires
            this.verifSignatures(actID);
        });

    }

    componentDidMount() {

        const {SocietyUID} = this.props.match.params;
        const {pays} = this.props.match.params;
        const {numAugmentation} = this.props.match.params;

        this.setState({loading: true});

        augmCapitalService.getSocietyPDFAGE(SocietyUID,numAugmentation).then( res => {

            this.setState({
                pdfFile: res,
                uid: SocietyUID,
                numAugmentation: numAugmentation,
                pays: pays,
                loading:false
            })
        }).then(res =>{console.log("pdfFile"+this.state.pdfFile)})
    }

    setActio = (data, actioId) => {

        //console.log("ENTRED SET ACTIO")
        let arrayOfActio = (data.sActionnairePhy || []).concat(data.sActionnaireMoral || []);
        for (let i = 0; i < arrayOfActio.length; i++) {
            if (arrayOfActio[i].id === actioId) {

                if (i > (data.sActionnairePhy || []).length - 1) {
                    this.setState({
                        actionnaire: arrayOfActio[i],
                        actioIndex: i - ((data.sActionnairePhy || []).length),
                        actioType: 'moral'
                    });
                } else {
                    this.setState({
                        actionnaire: arrayOfActio[i],
                        actioIndex: i,
                        actioType: 'phy'
                    });
                }
            }
        }
    };

    verifIfActSign = () => {
        const {actID} = this.props.match.params;
        let signatures = this.state.signatures;
        for (let i = 0; i < signatures.length; i++) {
            if (actID === signatures[i].actId)
                return true;
        }
        return false;
    };

    verifSignatures = (actid) => {

        let arrayVerif = [];

        for (let i = 0; i < this.state.allActionnaire.length; i++) {
            let idAct = this.state.allActionnaire[i].id;
            let test = false;
            for (let j = 0; j < this.state.signatures.length; j++) {

                    if (idAct === this.state.signatures[j].actId && idAct === actid) {

                        test = true;
                        arrayVerif.push({
                            isCurrentAct: true,
                            isSignDoc: true,
                            signURL: this.state.signatures[j].signuatureUrl,
                            name: this.state.signatures[j].name,
                            eseName: this.state.signatures[j].eseName,
                            date: this.state.signatures[j].date
                        })

                    } else if (idAct === this.state.signatures[j].actId && idAct !== actid) {

                        test = true;
                        arrayVerif.push({
                            isCurrentAct: false,
                            isSignDoc: true,
                            signURL: this.state.signatures[j].signuatureUrl,
                            name: this.state.signatures[j].name,
                            eseName: this.state.signatures[j].eseName,
                            date: this.state.signatures[j].date
                        })
                    }

            }

            if (test === false && idAct !== actid) {
                arrayVerif.push({
                    isCurrentAct: false,
                    isSignDoc: false,
                    name: this.state.allActionnaire[i].email,
                })
            }
            if (test === false && idAct === actid) {
                arrayVerif.push({
                    isCurrentAct: true,
                    isSignDoc: false,
                    name: this.state.actionnaire.firstname + ' ' + this.state.actionnaire.lastname,
                    eseName: this.state.societyData.sName,
                })
            }
        }

        this.setState({
            signatureVerifList: arrayVerif
        });

    };

    handleOpenModal = () => {
        this.setState({loadingBtn:true});
        let msg = "Votre code de vérification de signature est: \n";
        let codeSMS = (Math.floor(100000 + Math.random() * 900000)).toString();
        signatureService.sendSMSToActio({
            msg: msg,
            url: codeSMS,
            to: this.state.actionnaire.phone.replace(/\s+/g, '')
        }).then(resSMS => {
            if (resSMS && resSMS.status === 200) {
                //console.log("SMS CODE SENDED");
                this.setState({
                    codeSMSsended:codeSMS,
                    loadingBtn:false,
                    openModal: true
                });
            } else {
                this.setState({loadingBtn:false});
                //console.log(resSMS)
            }
        });
    };

    handleCloseModal = () => {
        this.setState({openModal: false});
    };

    handlePDFChange = (name, eseName, url) => {

        let arrayAcc = this.state.signatures;
        arrayAcc.push({
            actId: this.state.actId,
            signuatureUrl: url,
            name: this.state.actionnaire.firstname + ' ' + this.state.actionnaire.lastname,
            eseName: this.state.societyData.sName,
            date: Date.now()
        });
        this.setState({
            signatures: arrayAcc
        });

        //vérifier si tous les actionnaires ont signeé le doc statut
        if (this.state.signatures.length === this.state.allActionnaire.length) {
            this.setState({
                isAllActioSignDocStatut: true
            });
        }

        this.addSignature();
        this.verifSignatures(this.state.actId);

    };

    addSignature = () => {

        this.state.societyData.augmentationcapital[this.state.numAugmentation].signaturesAGE = this.state.signatures;


        augmCapitalService.getSocietyPDFAGE(this.state.uid,this.state.numAugmentation).then(res => {
            this.setState({
                pdfFile: res
            });
        }).then(res => {
            if (this.state.signatures.length === this.state.allActionnaire.length) {
                /*augmCapitalService.sendEmailEndSignatures(this.state.uid, this.state.pays).then(res => {
                    console.log(res);
                }).catch(error => {
                    console.log(error);
                });*/
            }
        });

        firebase.database().ref('society/' + this.state.uid).set(this.state.societyData).then(data => {
        }).catch(function (error) {
            alert(error);
        });
    };


    render() {
        return (
            <div className="app" ref={(el) => {
                this.signatEnd = el;
            }}>
                <header id="topnav">
                    <Suspense fallback={loading()}>
                        <BasicTopbar/>
                    </Suspense>
                </header>

                <div className="wrapper" style={{paddingTop: 100}} >
                    <Container fluid>
                        <Suspense fallback={loading()}>
                            <div className="row">
                                <div className="col-md-10">
                                    <div className="card" style={{marginTop: 5}}>
                                        <div className="card-body" style={{padding: '0.9rem'}}>
                                            <div className="float-right">
                                                <button type="button" className={this.state.isCanSignDoc ? "btn btn-info waves-effect waves-light" :
                                                    "btn btn-success waves-effect waves-light"}
                                                        onClick={() => {
                                                            this.signatEnd.scrollIntoView({
                                                                block: "end",
                                                                behavior: 'smooth'
                                                            });
                                                        }}>
                                                    {
                                                        this.state.isCanSignDoc ? "Signer le document" : "Vous avez signé le document"
                                                    }

                                                </button>
                                            </div>
                                            <h4 style={{fontWeight:'bold'}} className="header-title mt-0 mb-3">
                                                Document d'augmentation de capital pour la société&nbsp;{this.state.sName}</h4>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {this.state.loading && <Loader/>}
                            {
                                this.state.pdfFile !== '' ?
                                    <div className="row">
                                        <div className="col-md-10 text-center">
                                            <div className="card">
                                                <div className="card-body" style={{padding: '0.9rem'}}>
                                                    <div className="border rounded">
                                                        <PDFViewer
                                                            document={{
                                                                file: this.state.pdfFile
                                                            }}
                                                            navbarOnTop
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div> : null
                            }

                            <h4 className="header-title mt-0 mb-3" style={{fontWeight:"bold"}}>Signatures des actionnaires</h4>
                            <div style={{height:1,backgroundColor:"#C0C0C0"}}/>
                            <div className="row" style={{marginTop:20}}>
                                {
                                    this.state.signatureVerifList.map((item, key) => (

                                        item.isSignDoc === true ?

                                            <div className="col-md-4">

                                                <div className="card-box ribbon-box">
                                                    <div className="ribbon ribbon-success float-right">
                                                        Signé
                                                    </div>
                                                    <div className="row">
                                                        <div className="col-auto">
                                                            <div className="avatar-md">
                                                                <img
                                                                    src={userAvatar}
                                                                    className="img-fluid rounded-circle"
                                                                    alt="user-img"/>
                                                            </div>
                                                        </div>
                                                        <div className="col">
                                                            <h5 className="mb-1 mt-2">{item.name}</h5>
                                                            <p className="mb-2 text-muted">{item.eseName}</p>
                                                        </div>
                                                    </div>
                                                    <div className="text-center">
                                                        <img src={item.signURL} alt="" height="65" width="200"
                                                             style={{objectFit: "none",marginTop:5,border:"1px solid #C0C0C0"}}/><br/>
                                                        <span className="badge bg-soft-success text-success p-1" style={{marginTop:10,fontSize:"0.7rem"}}>
                                                              Signé le &nbsp;{moment(item.date).format('DD/MM/YYYY')}
                                                            </span>
                                                    </div>
                                                </div>
                                            </div> :

                                            item.isSignDoc === false && item.isCurrentAct === false ?

                                                <div className="col-md-4">
                                                    <div className="card-box ribbon-box">
                                                        <div className="ribbon ribbon-danger float-right">
                                                            Non signé
                                                        </div>
                                                        <div className="row">
                                                            <div className="col-auto">
                                                                <div className="avatar-md">
                                                                    <img
                                                                        src={userAvatar}
                                                                        className="img-fluid rounded-circle"
                                                                        alt="user-img"/>
                                                                </div>
                                                            </div>
                                                            <div className="col">
                                                                <h5 className="mb-1 mt-2">{item.name}</h5>
                                                                <p className="mb-2 text-muted">{item.eseName}</p>
                                                            </div>
                                                        </div>
                                                        <div className="text-center" style={{marginTop:10}}>
                                                            <button type="button"
                                                                    className="btn btn-success btn-sm waves-effect waves-light">
                                                                Demande de signature
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div> :
                                                item.isSignDoc === false && item.isCurrentAct === true ?

                                                    <div className="col-md-4">

                                                        <div className="card-box ribbon-box">
                                                            <div className="ribbon ribbon-danger float-right">
                                                                Non signé
                                                            </div>
                                                            <div className="row">
                                                                <div className="col-auto">
                                                                    <div className="avatar-md">
                                                                        <img
                                                                            src={userAvatar}
                                                                            className="img-fluid rounded-circle"
                                                                            alt="user-img"/>
                                                                    </div>
                                                                </div>
                                                                <div className="col">
                                                                    <h5 className="mb-1 mt-2">{item.name}</h5>
                                                                    <p className="mb-2 text-muted">{item.eseName}</p>
                                                                </div>
                                                            </div>
                                                            <div className="text-center">
                                                                <button type="button"
                                                                        disabled={!this.state.isCanSignDoc}
                                                                        onClick={this.handleOpenModal}
                                                                        className="btn btn-success btn-sm waves-effect waves-light">
                                                                    {
                                                                        this.state.loadingBtn ?
                                                                            <div className="spinner-border avatar-xs text-white m-1"
                                                                                 role="status"></div> : 'Signer ici'
                                                                    }
                                                                </button>
                                                            </div>
                                                        </div>
                                                    </div> : null
                                    ))
                                }

                                {/*Modal sign PDF doc*/}
                                <SignDocModal handlePDFChange={this.handlePDFChange}
                                              actioPhone={this.state.actionnaire.phone}
                                              codeSMSsended={this.state.codeSMSsended}
                                              openModal={this.handleOpenModal}
                                              closeModal={this.handleCloseModal}
                                              open={this.state.openModal}/>
                            </div>
                        </Suspense>
                    </Container>
                </div>
            </div>
        )
    }

}

export default signDocAGE;