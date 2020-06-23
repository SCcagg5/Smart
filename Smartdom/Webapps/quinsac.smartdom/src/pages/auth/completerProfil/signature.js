import React, {Component, Suspense} from "react";
import Topbar from "../../../components/Menu/Topbar";
import {Container, FormGroup as formGroup} from "reactstrap";
import Loader from "../../../components/Loader";
import firebase from "firebase/app";
import "firebase/database"
import { AvForm, AvGroup, AvInput} from "availity-reactstrap-validation";
import countryWithCodes from "../../../tools/contrylistWithPhoneCodes";
import PDFViewer from '../../../customComponents/pdf-viewer-reactjs'
import lettreMiss from "../../../assets/lettre-de-mission.pdf"
import SignatureCanvas from 'react-signature-canvas'
import Button from '@material-ui/core/Button';
import signatureService from "../../../provider/signatureService";
import MySnackbarContentWrapper from "../../../tools/customSnackBar";
import Snackbar from "@material-ui/core/Snackbar";
const loading = () => <Loader/>;


class signature extends Component {

    CINUpload = {};
    JustDomicileUpload = {};
    sigCanvas = {};


    constructor(props) {
        super(props);

        this.state = {
            openAlert:false,
            alertMessage:'',
            alertType:'',

            loadingBtnSign:false,
            showStep1: true,
            showStep2: false,
            showStep3: false,

            showInfo:true,
            showDocuments:false,

            loading: false,
            phone: {
                code: "+33",
                number: ""
            },
            codeSMSTaped:"",
            codeSMSsended:""
        }
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

    componentWillMount() {
        window.scrollTo(0, 0);
        if(localStorage.getItem("uid") !== undefined && localStorage.getItem("uid") !== null){
            firebase.database().ref('/users/'+localStorage.getItem("uid")).on('value', (snapshot) => {
                let user = snapshot.val();
                this.setState({
                    phone:{
                        code:user.phone ? user.phone.code : this.state.phone.code,
                        number:user.phone ? user.phone.numero : this.state.phone.number
                    }
                });
            })
        }else{
            this.props.history.push("/comment-investir")
        }
    }

    saveSignature  = () => {

        firebase.database().ref('users/'+ localStorage.getItem("uid")).update({
            "signature": this.sigCanvas.getTrimmedCanvas().toDataURL('image/png')
        }).then( ok => {
            this.openSnackbar('success', "Félécitation! Votre signature est bien enregistré");
            setTimeout(() => {
                this.props.history.push("/investisor/dashboard")
            },1000);

        })
    };


    render() {
        return (
            <div className="app center-menu">
                <header id="topnav">
                    <Suspense fallback={loading()}>
                        <Topbar props={this.props} changeActivePage={this.changeActivePage}/>
                    </Suspense>
                </header>
                <div className="wrapper" style={{padding: "72px 0px 0px", backgroundColor: "#fff"}}>
                    <Container fluid>
                        <Suspense fallback={loading()}>
                            <div className="row" style={{marginTop: 100}}>

                                <div className="col-md-8"
                                     style={{backgroundColor: "#fff", paddingRight: "15%", paddingLeft: "5%"}}>

                                    {
                                        this.state.showStep1 &&
                                        <div>
                                            <p style={{
                                                color: "#000",
                                                fontSize: "2.6rem",
                                                lineHeight: "2.75rem",
                                                textTransform: "uppercase",
                                                fontWeight: "bold"
                                            }}>Signature électronique</p>
                                            <p className="font-18 text-dark" style={{lineHeight: 1.4, marginTop: 40}}>
                                                Vous pourrez consulter votre lettre de mission à l'étape suivante. Un code
                                                vous permettant de la signer
                                                électroniquement vous sera envoyé par SMS.
                                            </p>


                                            <p style={{
                                                color: "#0d1e28",
                                                fontSize: "1.0rem",
                                                lineHeight: "1.5rem",
                                                fontWeight: "bold", marginTop: 25,
                                            }}>Vérification de votre numéro de téléphone portable</p>

                                            <AvForm onValidSubmit={this.save}>

                                                <AvGroup className="mb-3" style={{display: "block ruby"}}>
                                                    <AvInput type="select" name="codePays" id="codePays"
                                                             style={{height: 50, fontSize: "1.1rem", width: "140px",}}
                                                             className="custom-select"
                                                             value={this.state.phone.code}>
                                                        {
                                                            countryWithCodes.map((item, key) => (
                                                                <option selected={item.dial_code === this.state.phone.code}
                                                                        value={item.dial_code}>{item.dial_code + "(" + item.code + ")"} </option>
                                                            ))
                                                        }
                                                    </AvInput>&nbsp;&nbsp;&nbsp;

                                                    <AvInput type="text" name="numero" id="numero" style={{
                                                        height: 50,
                                                        fontSize: "1.1rem",
                                                        width: "80%",
                                                        border: "2px solid #F0F0F0",
                                                        verticalAlign: "middle"
                                                    }}
                                                             placeholder="Ex: 06123456789"
                                                             value={this.state.phone.number}/>
                                                </AvGroup>

                                            </AvForm>

                                        </div>
                                    }

                                    {
                                        this.state.showStep2 &&
                                        <div>
                                            <p style={{
                                                color: "#000",
                                                fontSize: "2.6rem",
                                                lineHeight: "2.75rem",
                                                textTransform: "uppercase",
                                                fontWeight: "bold"
                                            }}>Signature électronique</p>
                                            <p className="font-18 text-dark" style={{lineHeight: 1.4, marginTop: 40}}>
                                                Nous vous recommandons de télécharger le document (sélectionnez l'onglet 'INFOS' ci-dessous)
                                                et de vérifier que vos informations sont exactes. Pour les modifier, retournez sur les étapes
                                                précédentes en cliquant sur le bouton Précédent en bas de cette page.
                                                Pour signer votre lettre de mission, sélectionnez l'onglet 'DOCUMENTS'.
                                            </p>


                                            <div className="row">
                                                <div className="col-md-12">
                                                    <div style={{display:"flex"}}>
                                                    <button
                                                        className={this.state.showInfo ? "btn btn-info waves-effect waves-light font-weight-bolder custombtn"
                                                            : "btn btn-info waves-effect waves-light font-weight-bolder custombtn unselected-button"}
                                                        onClick={ () => this.setState({showInfo:true,showDocuments:false})}
                                                        style={{
                                                            width: "60%",
                                                            height: 50,
                                                            marginTop: 30,
                                                            marginBottom: 30
                                                        }}>
                                                        INFO
                                                    </button>
                                                    <button
                                                        onClick={ () => this.setState({showInfo:false,showDocuments:true})}
                                                        className={this.state.showDocuments ? "btn btn-info waves-effect waves-light font-weight-bolder custombtn"
                                                            : "btn btn-info waves-effect waves-light font-weight-bolder custombtn unselected-button"}
                                                        style={{width: "60%", height: 50, marginTop: 30, marginBottom: 30}}>
                                                        DOCUMENTS
                                                    </button>
                                                    </div>
                                                </div>
                                            </div>

                                            {
                                                this.state.showInfo &&
                                                    <div style={{marginLeft:20}}>
                                                        <h3 style={{color:"#19B4FA",fontSize:"17px",fontWeight:900,marginBottom:"4px"}}>
                                                            Lettre de mission
                                                        </h3>
                                                        <div align="center">
                                                            <div className="font-weight-bold"
                                                                 style={{fontSize:"20px",color:"#525253",textTransform:"uppercase",letterSpacing:"0.1em",marginTop:50}}>Documents (1)</div>
                                                            <div style={{height:9,width:40,backgroundColor:"#19B4FA",marginTop:5,marginBottom:50}}/>
                                                        </div>
                                                        <div style={{display:"ruby"}}>
                                                        <span style={{width:"calc(100% - 29px)",display:"block"}}>
                                                            <p className="font-weight-bold pointer" onClick={ () => this.setState({showInfo:false,showDocuments:true})}
                                                               style={{fontSize:"14px",fontWeight:700,lineHeight:"24px"}}>
                                                                <i className="fa fa-file font-18"/>&nbsp;&nbsp;Lettre-de-mission.pdf</p>
                                                        </span>
                                                            <i className="fa fa-download text-info font-18" style={{cursor:"pointer"}} onClick={() => window.open(lettreMiss)}/>
                                                        </div>
                                                        <div style={{height:1,backgroundColor:"#ddd",width:"100%",marginBottom:20}}>

                                                        </div>
                                                    </div>
                                            }

                                            {
                                                this.state.showDocuments &&
                                                <div>
                                                    <div style={{height:55,backgroundColor:"#F7F7F7",width:"100%"}}>
                                                    </div>

                                                    <PDFViewer
                                                        scaleStep={5}
                                                        pages={1}
                                                        loader={
                                                            <Loader/>
                                                        }
                                                        document={{
                                                            file:lettreMiss
                                                        }}
                                                        navbarOnTop={true}
                                                    />

                                                    <div style={{height:67,backgroundColor:"#F7F7F7",width:"100%"}}>
                                                        <div className="float-left">
                                                            <button style={{marginRight:10,marginTop:15,textTransform:"uppercase",backgroundColor:"transparent",color:"red",textDecoration:"underline"}}
                                                                    className="btn waves-effect waves-light">
                                                                Réfuser
                                                            </button>
                                                        </div>
                                                        <div className="float-right">
                                                            <button style={{marginRight:10,marginTop:15,textTransform:"uppercase"}}
                                                                    onClick={() => {
                                                                        this.setState({loadingBtnSign:true});
                                                                        let msg = "Votre code de vérification de signature est: \n";
                                                                        let codeSMS = (Math.floor(100000 + Math.random() * 900000)).toString();
                                                                        signatureService.sendSMSToActio({
                                                                            msg: msg,
                                                                            url: codeSMS,
                                                                            to: (this.state.phone.code+this.state.phone.number).replace(/\s+/g, '')
                                                                        }).then(resSMS => {
                                                                            if (resSMS && resSMS.status === 200) {
                                                                                console.log("SMS CODE SENDED");
                                                                                this.setState({
                                                                                    loadingBtnSign:false,
                                                                                    codeSMSsended: codeSMS,
                                                                                    showStep2:false,showStep3:true
                                                                                });
                                                                            } else {
                                                                                console.log(resSMS)
                                                                            }
                                                                        });

                                                                    }}
                                                                className="btn btn-success btn-rounded  waves-effect waves-light">
                                                                {
                                                                    this.state.loadingBtnSign ?
                                                                        <div
                                                                            className="spinner-border avatar-xs spinnerColor m-1"
                                                                            role="status"></div> : 'Signer'
                                                                }
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                            }


                                        </div>

                                    }

                                    {
                                        this.state.showStep3 &&
                                            <div>

                                                <p style={{
                                                    color: "#000",
                                                    fontSize: "2.6rem",
                                                    lineHeight: "2.75rem",
                                                    textTransform: "uppercase",
                                                    fontWeight: "bold"
                                                }}>Signature électronique</p>
                                                <p className="font-18 text-dark" style={{lineHeight: 1.4, marginTop: 40}}>
                                                    Nous vous recommandons de télécharger le document (sélectionnez l'onglet 'INFOS' ci-dessous)
                                                    et de vérifier que vos informations sont exactes. Pour les modifier, retournez sur les étapes
                                                    précédentes en cliquant sur le bouton Précédent en bas de cette page.
                                                    Pour signer votre lettre de mission, sélectionnez l'onglet 'DOCUMENTS'.
                                                </p>

                                                <div style={{height:1,backgroundColor:"#ddd",width:"100%"}}/>
                                                <div style={{backgroundColor:"#F0F0F0",marginTop:30}}>
                                                    <div className="text-center">
                                                        <p style={{paddingTop:"5px"}}>Un SMS à été envoyé au {this.state.phone.code + this.state.phone.number} </p>
                                                        <p>Entrez le code reçu pour valider légalement votre signature</p>
                                                        <div style={{display:"ruby"}}>
                                                            <input type="text" style={{width:150}} placeholder="EX: 758936" value={this.state.codeSMSTaped}
                                                                    onChange={(event) => this.setState({codeSMSTaped:event.target.value})}/>&nbsp;&nbsp;
                                                            <button style={{textTransform:"uppercase"}}
                                                                    disabled={this.state.codeSMSTaped !== this.state.codeSMSsended}
                                                                    onClick={this.saveSignature}
                                                                    className="btn btn-success btn-rounded btn-sm waves-effect waves-light">
                                                                Signer
                                                            </button>
                                                        </div><br/><br/>
                                                        <p>Vous n'avez pas reçu le code ? <a style={{cursor:"pointer",textDecoration:"underline"}}>Cliquez ici</a></p><br/>
                                                        <h4>Dessiner votre signature</h4>
                                                    </div>
                                                </div>

                                                <div className="row mb-1">
                                                    <div className="col-md-12" style={{marginTop: 6,marginLeft:20}}>

                                                        <div align="center">
                                                            <div style={{width:"80%",height:100,border: '2px solid grey',maxWidth:250}}>
                                                                <SignatureCanvas ref={(ref) => {
                                                                    this.sigCanvas = ref
                                                                }} penColor='#000' canvasProps={{width: "200%", height: 98, className: 'sigCanvas',maxWidth:248}}/>
                                                            </div>
                                                                <Button style={{fontSize: 10}} onClick={() => {
                                                                    this.sigCanvas.clear()
                                                                }}>Effacer</Button>
                                                        </div>

                                                    </div>
                                                </div>

                                            </div>
                                    }



                                    <formGroup>
                                        <div className="row">
                                            <div className="col-md-6">
                                                <button
                                                    className="btn btn-info waves-effect waves-light font-weight-bolder custombtn"
                                                    onClick={ () =>
                                                        this.state.showStep1 ? this.props.history.push("/investisor/completer-profil/situationEtExperiences") :
                                                            this.state.showStep2 ? this.setState({showStep1:true,showStep2:false}) :
                                                                this.state.showStep3 ? this.setState({showStep2:true,showStep3:false}) : {}
                                                    }
                                                    style={{
                                                        backgroundColor: "#fff",
                                                        color: "#000",
                                                        border: "3px solid #F0F0F0",
                                                        width: "60%",
                                                        height: 60,
                                                        marginTop: 30,
                                                        marginBottom: 30
                                                    }}>
                                                    Précédent
                                                </button>
                                            </div>
                                            <div className="col-md-6">
                                                {
                                                    this.state.showStep1 &&
                                                    <button
                                                        onClick={ () =>
                                                            this.state.showStep1 ? this.setState({showStep1:false,showStep2:true}) :
                                                                this.state.showStep2 ? this.setState({showStep2:false,showStep3:true}) :
                                                                    this.state.showStep3 ? this.props.history.push("/acceuil") : {}
                                                        }
                                                        className="btn btn-info waves-effect waves-light font-weight-bolder custombtn"
                                                        style={{width: "60%", height: 60, marginTop: 30, marginBottom: 30}}>
                                                        {
                                                            this.state.loading ?
                                                                <div
                                                                    className="spinner-border avatar-xs spinnerColor m-1"
                                                                    role="status"></div> : 'Suivant'
                                                        }
                                                    </button>
                                                }

                                            </div>

                                        </div>

                                    </formGroup>

                                </div>


                            </div>

                            <Snackbar
                                anchorOrigin={{
                                    vertical: 'bottom',
                                    horizontal: 'left',
                                }}
                                open={this.state.openAlert}
                                autoHideDuration={3000}
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

export default signature