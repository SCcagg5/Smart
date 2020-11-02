import React, {Component, Suspense} from "react";
import firebase from "firebase/app";
import "firebase/database";
import {Container} from "reactstrap";
import Loader from "../../components/Loader";
import PDFViewer from '../../customComponents/pdf-viewer-reactjs';
import moment from "moment";
import SignDocModal from "./signDocModal";
import userAvatar from "../../assets/users/user-5.jpg"
import userService from "../../provider/userService"
import signatureService from "../../provider/signatureService"

const BasicTopbar = React.lazy(() => import("../../components/basicTopBar"));
const loading = () => <Loader/>;

class cessionActionSign extends Component {

    state = {
        coffre: "",
        loadingBtn: false,
        uid: '',
        actId: '',
        pays: '',
        societyData: {},
        allActionnaire: [],
        isAllActioSignDocStatut: false,
        sName: '',
        signatures: [],
        isCanSignDoc: true,
        pdfFile: '',
        actionnaire: {},
        signatureVerifList: [],
        openModal: false,
        typeUser: this.props.match.params.typeUser
    };

    signatEnd = {};


    componentWillMount() {


        this.setState({loading: true});
        firebase.database().ref("coffreFort/" + this.props.match.params.id).on("value", (snapshot) => {
            let coffre = snapshot.val();
            console.log(coffre);

            let toSend = {
                cedant: {fullname: coffre.senderName, adress: coffre.senderAdress},
                cessionnaire: {fullname: coffre.recieverName, adress: coffre.recieverAdress},
                banque: {name: "Carbone-Invest+", iban: "1248*****42***871"},
                place: "Suisse",
                datecreation: moment(coffre.created).format("DD/MM/YYYY"),
                senderSignature: coffre.senderSignature || "",
                recieverSignature: coffre.recieverSignature || ""
            };
            userService.generateCesionActionSuisse(toSend).then(res => {
                console.log("ok");
                this.setState({
                    pdfFile: res,
                    loading: false,
                    coffre: coffre
                });

            }, err => {
                console.log(err);
            })
        });

        /* const {SocietyUID} = this.props.match.params;
        const {actID} = this.props.match.params;
        const {pays} = this.props.match.params;

        console.log(SocietyUID)

        this.setState({
            uid: SocietyUID,
            actId: actID,
            pays: pays,
        });

        firebase.database().ref('/society/' + SocietyUID).on('value', (snapshot) => {

            const data = snapshot.val();

            this.setState({
                societyData: data,
                sName:data.sName,
                associates: data.sAssociate || [],
                gerants:data.sAdministrator || [],
                allActionnaire: (data.sAssociate || []).concat(data.sAdministrator || []),
                actionnaire:(data.sAssociate || []).concat(data.sAdministrator || []).find(x =>x.id === actID)
            });

        }); */

    }

    componentDidMount() {
    }


    handleOpenModal = () => {
        //this.setState({loadingBtn: true});
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
                    loadingBtn: false,
                    openModal: true
                });
            } else {
                this.setState({loadingBtn: false});
                console.log(resSMS)
            }
        });
    };

    handleCloseModal = () => {
        this.setState({openModal: false});
    };

    handlePDFChange = (url) => {
        this.setState({loading: true})
        if (this.state.typeUser === "sender") {
            firebase.database().ref("coffreFort/" + this.props.match.params.id).update({
                'senderSignature': url
            }).then(res => {
                let toSend = {
                    cedant: {fullname: this.state.coffre.senderName, adress: this.state.coffre.senderAdress},
                    cessionnaire: {fullname: this.state.coffre.recieverName, adress: this.state.coffre.recieverAdress},
                    banque: {name: "Carbone-Invest+", iban: "1248*****42***871"},
                    place: "Suisse",
                    datecreation: moment(this.state.coffre.created).format("DD/MM/YYYY"),
                    senderSignature: url || "",
                    recieverSignature: this.state.coffre.recieverSignature || ""
                };
                userService.generateCesionActionSuisse(toSend).then(res => {
                    console.log("ok");
                    this.setState({
                        pdfFile: res,
                        loading: false,
                    });

                }, err => {
                    console.log(err);
                })
            }).catch(err => {
                console.log(err);
            })
        } else {

            firebase.database().ref("coffreFort/" + this.props.match.params.id).update({
                'recieverSignature': url
            }).then(res => {
                let toSend = {
                    cedant: {fullname: this.state.coffre.senderName, adress: this.state.coffre.senderAdress},
                    cessionnaire: {fullname: this.state.coffre.recieverName, adress: this.state.coffre.recieverAdress},
                    banque: {name: "Carbone-Invest+", iban: "1248*****42***871"},
                    place: "Suisse",
                    datecreation: moment(this.state.coffre.created).format("DD/MM/YYYY"),
                    senderSignature: this.state.coffre.senderSignature || "",
                    recieverSignature: url || ""
                };
                userService.generateCesionActionSuisse(toSend).then(res => {
                    console.log("ok");
                    this.setState({
                        pdfFile: res,
                        loading: false,
                    });

                }, err => {
                    console.log(err);
                })
            }).catch(err => {
                console.log(err);
            })

        }


    };

    addSignature = () => {

        // this.state.societyData.signatures = this.state.signatures;
        //
        //
        // augmCapitalService.getEntrepriseStatut(this.state.uid, this.state.pays).then(res => {
        //     this.setState({
        //         pdfFile: res
        //     });
        // }).then(res => {
        //     if (this.state.signatures.length === this.state.allActionnaire.length) {
        //
        //     }
        // });
        //
        // firebase.database().ref('society/' + this.state.uid).set(this.state.societyData).then(data => {
        // }).catch(function (error) {
        //     alert(error);
        // });
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

                <div className="wrapper" style={{paddingTop: 100}}>
                    <Container fluid>
                        <Suspense fallback={loading()}>
                            <div className="row">
                                <div className="col-md-10">
                                    <div className="card" style={{marginTop: 5}}>
                                        <div className="card-body" style={{padding: '0.9rem'}}>
                                            <div className="float-right">
                                                {
                                                    ((this.state.typeUser === "sender" && this.state.coffre.senderSignature &&
                                                        this.state.coffre.senderSignature !== "") ||
                                                        (this.state.typeUser === "reciever" && this.state.coffre.recieverSignature &&
                                                            this.state.coffre.recieverSignature !== "")) ?

                                                        <button type="button"
                                                                className={"btn btn-success waves-effect waves-light"}
                                                                onClick={() => {
                                                                    this.signatEnd.scrollIntoView({
                                                                        block: "end",
                                                                        behavior: 'smooth'
                                                                    });
                                                                }}>
                                                            Signature validé
                                                        </button>


                                                        :

                                                        <button type="button"
                                                                className={"btn btn-info waves-effect waves-light"}
                                                                onClick={() => {
                                                                    this.signatEnd.scrollIntoView({
                                                                        block: "end",
                                                                        behavior: 'smooth'
                                                                    });
                                                                }}>
                                                            Signer le document
                                                        </button>


                                                }

                                            </div>
                                            <h5 style={{fontWeight: 'bold'}} className="header-title mt-0 mb-3">Document
                                                de cession d'action entre vous
                                                et {this.state.typeUser === "sender" ? this.state.coffre.recieverName : this.state.coffre.senderName}</h5>
                                            <span style={{
                                                color: "#000",
                                                fontWeight: "bold"
                                            }}>Date de création:&nbsp;&nbsp;
                                                <span
                                                    className="font-weight-normal">{moment(this.state.coffre.created).format("DD-MM-YYYY")} </span>
                                            </span>
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

                            <h4 className="header-title mt-0 mb-3" style={{fontWeight: "bold"}}>Signatures</h4>
                            <div style={{height: 1, backgroundColor: "#C0C0C0"}}/>
                            <div className="row" style={{marginTop: 20, marginLeft: "5%", marginRight: "5%"}}>

                                <div className="col-md-6 text-center">

                                    {
                                        this.state.coffre.senderSignature && this.state.coffre.senderSignature !== "" ?
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
                                                    <div className="col text-left">
                                                        <h5 className="mb-1 mt-2">{this.state.coffre.senderName} </h5>
                                                        {/*<p className="mb-2 text-muted">{this.state.sName}</p>*/}
                                                    </div>
                                                </div>
                                                <div className="text-center">
                                                    <img
                                                        src={this.state.coffre.senderSignature}
                                                        alt="" height="65" width="200"
                                                        style={{
                                                            objectFit: "none",
                                                            marginBottom: 15,
                                                            marginTop: 15,
                                                            border: "3px solid #F0F0F0",
                                                            height: 130,
                                                            width: "65%",
                                                            minWidth: 200
                                                        }}/>
                                                    <br/>
                                                    <span className="badge bg-soft-success text-success p-1"
                                                          style={{marginTop: 10, fontSize: "0.7rem"}}>
                                                              Signé le &nbsp; 24/10/2020
                                            </span>
                                                </div>
                                            </div> :

                                            <div className="card-box ribbon-box">

                                                <div className="ribbon ribbon-danger float-right">
                                                    Non Signé
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
                                                        <h5 className="mb-1 mt-2">{this.state.coffre.senderName} </h5>
                                                        {/*<p className="mb-2 text-muted">{this.state.sName}</p>*/}
                                                    </div>
                                                </div>
                                                <div className="text-center">
                                                    {
                                                        this.state.typeUser === "sender" ?
                                                            <button type="button"
                                                                    onClick={this.handleOpenModal}
                                                                    className="btn btn-success btn-sm waves-effect waves-light">
                                                                Signer ici
                                                            </button> :

                                                            <button type="button"
                                                                    className="btn btn-success btn-sm waves-effect waves-light">
                                                                Demande de signature
                                                            </button>
                                                    }

                                                </div>
                                            </div>
                                    }


                                </div>

                                <div className="col-md-6 text-center">

                                    {
                                        this.state.coffre.recieverSignature && this.state.coffre.recieverSignature !== "" ?
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
                                                        <h5 className="mb-1 mt-2">{this.state.coffre.recieverName} </h5>
                                                        {/*<p className="mb-2 text-muted">{this.state.sName}</p>*/}
                                                    </div>
                                                </div>
                                                <div className="text-center">
                                                    <img
                                                        src={this.state.coffre.recieverSignature}
                                                        alt=""
                                                        style={{
                                                            objectFit: "none",
                                                            marginBottom: 15,
                                                            marginTop: 15,
                                                            border: "3px solid #F0F0F0",
                                                            height: 130,
                                                            width: "65%",
                                                            minWidth: 200
                                                        }}/>
                                                    <br/>
                                                    <span className="badge bg-soft-success text-success p-1"
                                                          style={{marginTop: 10, fontSize: "0.7rem"}}>
                                                              Signé le &nbsp; 24/10/2020
                                            </span>
                                                </div>
                                            </div> :

                                            <div className="card-box ribbon-box">

                                                <div className="ribbon ribbon-danger float-right">
                                                    Non Signé
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
                                                        <h5 className="mb-1 mt-2">{this.state.coffre.recieverName} </h5>
                                                        {/*<p className="mb-2 text-muted">{this.state.sName}</p>*/}
                                                    </div>
                                                </div>
                                                <div className="text-center">
                                                    {
                                                        this.state.typeUser === "reciever" ?
                                                            <button type="button"
                                                                    onClick={this.handleOpenModal}
                                                                    className="btn btn-success btn-sm waves-effect waves-light">
                                                                Signer ici
                                                            </button> :

                                                            <button type="button"
                                                                    className="btn btn-success btn-sm waves-effect waves-light">
                                                                Demande de signature
                                                            </button>
                                                    }

                                                </div>
                                            </div>
                                    }


                                </div>


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

export default cessionActionSign