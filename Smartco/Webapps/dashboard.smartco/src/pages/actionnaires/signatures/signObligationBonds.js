import React, {Component, Suspense} from "react";
import Loader from "../../../components/Loader";
import {Button, Container} from "reactstrap";
import firebase from "firebase/app";
import "firebase/database"
import augmCapitalService from "../../../provider/augmCapitalService";
import entrepriseSARLService from "../../../provider/entrepriseSARLService";
import pdfImage from "../../../assets/images/pdfimage.jpg";
import SignatureCanvas from "react-signature-canvas";
import MySnackbarContentWrapper from "../../../tools/customSnackBar";
import Snackbar from "@material-ui/core/Snackbar";
import signatureService from "../../../provider/signatureService";


const Topbar = React.lazy(() => import("../../../components/Topbar"));
const Navbar = React.lazy(() => import("../../../components/Navbar"));
const loading = () => <Loader/>;

class signObligationBonds extends Component {

    constructor(props) {
        super(props);
        this.state = {
            openAlert: false,
            alertMessage: '',
            alertType: '',
            loading: false,

            showGerantDocs: false,
            showAssocDocs: false,

            codeSMSTaped: '',
            codeSMSsended: '',

            gernats: [],
            member: '',
            obligationBonds:""

        };
    }

    sigCanvas = {};

    componentWillMount() {

        this.setState({loading: true});

        const {uid, type, index} = this.props.match.params;
        if (type === "gerant") this.setState({showGerantDocs: true});

        firebase.database().ref('/society/' + uid).on('value', (snapshot) => {
            let society = snapshot.val() || [];
            let obligationBonds = society.EmissionTitre[index];
            let gerants = society.sAdministrator || [];
            let member = {};
            if (type === "gerant") {
                member = gerants[0];
                this.setState({member: gerants[0],obligationBonds:obligationBonds})
            }


                let msg = "Votre code de vérification de signature est: \n";
                let codeSMS = (Math.floor(100000 + Math.random() * 900000)).toString();

                if(obligationBonds.signature === ""){
                    signatureService.sendSMSToActio({
                        msg: msg,
                        url: codeSMS,
                        to: member.phone.replace(/\s+/g, '')
                    }).then(resSMS => {
                        if (resSMS && resSMS.status === 200) {
                            console.log("SMS CODE SENDED");
                            this.setState({
                                codeSMSsended: codeSMS,
                                loading:false
                            });
                        } else {
                            this.openSnackbar('error', "L'envoi du SMS est échoué ! Veuillez contacter l'administrateur");
                            this.setState({loading:false})
                        }
                    });
                }else{
                    this.setState({loading: false});
                }

        });
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


    validerSignatureGerant = () => {

        let {uid, index} = this.props.match.params;


        let signature = this.sigCanvas.getTrimmedCanvas().toDataURL('image/png');

        firebase.database().ref('society/' + uid + '/EmissionTitre/' + index).update({
            'signature': signature
        }).then(data => {
            this.openSnackbar('success', "La signature est ajouté avec succès");
            this.setState({codeSMSsended: "", codeSMSTaped: ""})
        }).catch(function (error) {
            alert(error);
        });

    };


    showObligationBondslDoc = () => event => {
        this.setState({loading: true});
        let {uid, index} = this.props.match.params;
        entrepriseSARLService.generateProspectusPP(uid, index).then(res => {
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

    render() {
        const {type, uid, email} = this.props.match.params;

        return (
            <div className="app">
                <header id="topnav">
                    <Suspense fallback={loading()}>
                        {/*<Topbar changeActivePage={this.changeActivePage}/>*/}
                    </Suspense>
                </header>

                <div className="wrapper" style={{paddingTop: 90}}>
                    <Container fluid>
                        <Suspense fallback={loading()}>
                            {this.state.loading && <Loader/>}

                            <div className="row" style={{marginTop: 5}}>
                                <div className="col-lg-12">
                                    <div className="card">
                                        <div className="card-body">
                                            <div className="card-title">
                                            </div>
                                            <div style={{backgroundColor: "#C0C0C0", height: 1}}/>


                                            <div style={{marginTop: 50}}>

                                                <div className="row">
                                                    <div className="col-lg-2"/>
                                                    <div className="col-lg-8">
                                                        <div className="card"
                                                             style={{boxShadow: "0 0.75rem 6rem rgba(56, 65, 74, 0.15)"}}>
                                                            <div className="card-body">

                                                                <div className="text-center mb-4">

                                                                    <span className="font-18">{email} vous invite à signer
                                                                        éléctroniquement le document ci dessous:</span>
                                                                </div>
                                                                <div style={{backgroundColor: "#C0C0C0", height: 1}}/>

                                                                {
                                                                    type === "gerant" ?

                                                                        <div>

                                                                            <div style={{marginTop: 25}}>
                                                                                <div className="card-widgets">
                                                                                  <span className="badge bg-soft-light text-dark p-1" style={{cursor:"pointer"}}
                                                                                      onClick={this.showObligationBondslDoc()}>
                                                                                       <i style={{color: 'green', fontSize: 13}} className="fe-zoom-in"/>&nbsp;
                                                                                       Prévisualiser&nbsp;&nbsp;
                                                                                       <img src={pdfImage} style={{maxHeight: 25, objectFit: "contain"}} alt="attachment"
                                                                                             className="img-thumbnail img-responsive"/>
                                                                                 </span>
                                                                                </div>
                                                                                <h5 style={{color: "grey"}}>Obligation bonds</h5>
                                                                                <div style={{
                                                                                    backgroundColor: "#F0F0F0",
                                                                                    height: 1,
                                                                                    marginTop: 30
                                                                                }}/>
                                                                            </div>

                                                                        </div> : ""


                                                                }


                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="col-lg-2"/>

                                                </div>


                                                {

                                                    this.state.obligationBonds.signature === "" ?
                                                        <div className="text-center mt-4 signatureCard">
                                                            <p className="font-17 text-dark">Dessinez votre
                                                                signature avec votre souris ci-dessous</p>
                                                            <div
                                                                className="alert alert-warning fade show text-center pb-0"
                                                                role="alert">
                                                                        <span>Reproduisez votre signature <span
                                                                            className="font-weight-bold">telle qu'elle figure sur votre pièce d'dentité.</span></span>
                                                                <p>(ATTENTION: pas vos initiales, pas votre nom
                                                                    complet)</p>
                                                            </div>
                                                            <input type="text" placeholder="Code reçu par SMS"
                                                                   className="form-control mb-2"
                                                                   value={this.state.codeSMSTaped}
                                                                   onChange={(event) => this.setState({codeSMSTaped: event.target.value})}/>
                                                            <div style={{display: "inline-block"}}>
                                                                <div style={{
                                                                    width: "100%",
                                                                    height: 130,
                                                                    maxWidth: 248,
                                                                    border: '1px solid #C0C0C0'
                                                                }}>
                                                                    <SignatureCanvas ref={(ref) => {
                                                                        this.sigCanvas = ref
                                                                    }} penColor='#000' canvasProps={{
                                                                        width: "250%",
                                                                        height: 128,
                                                                        className: 'sigCanvas',
                                                                        maxWidth: 248
                                                                    }}/>
                                                                </div>
                                                                <button type="button"
                                                                        className="btn btn-light waves-effect mt-2"
                                                                        onClick={() => {
                                                                            this.sigCanvas.clear()
                                                                        }}>Effacer
                                                                </button>
                                                                &nbsp;&nbsp;
                                                                <button type="button"
                                                                        disabled={this.state.codeSMSsended === "" || (this.state.codeSMSTaped !== this.state.codeSMSsended)}
                                                                        className="btn btn-success waves-effect mt-2"
                                                                        onClick={this.validerSignatureGerant}>
                                                                    Valider
                                                                </button>
                                                            </div>
                                                        </div> :

                                                        <div className="alert alert-success fade show text-center pb-1"
                                                             role="alert">
                                                            <span className="font-weight-bold">Félicitation ! <span>Votre signature est bien ajouté</span></span>
                                                        </div>


                                                }


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

export default signObligationBonds;