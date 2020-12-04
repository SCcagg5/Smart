import React, {Component, Suspense} from "react";
import Topbar from "../../../components/Menu/Topbar";
import {Button, Container, FormGroup as formGroup, Label} from "reactstrap";
import Loader from "../../../components/Loader";
import coverImg from "../../../assets/images/cover.jpg";
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/database"
import {AvFeedback, AvForm, AvGroup, AvInput} from "availity-reactstrap-validation";
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormGroup from '@material-ui/core/FormGroup';
import MySnackbarContentWrapper from "../../../tools/customSnackBar";
import Snackbar from "@material-ui/core/Snackbar";
import moment from "moment";
import emailService from "../../../provider/emailService";
const loading = () => <Loader/>;


class investisorSignUp extends Component{


    constructor(props){
        super(props);
        this.state = {
            loading: false,
            isMenuOpened: false,
            activeMenuItem: 'item-gestion',

            openAlert:false,
            alertMessage:'',
            alertType:'',

            type:"particulier",
            civilite:"M."
        };
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
        window.scrollTo(0, 0)
    }

    signUp = (event,values) => {

        this.setState({loading:true});
        firebase.auth().createUserWithEmailAndPassword(values.email,values.password).then( res => {

            localStorage.setItem('uid',res.user.uid);
            localStorage.setItem('email',res.user.email);

            firebase.database().ref('users/'+res.user.uid).set({
                id:res.user.uid,
                email:values.email,
                role:"investisor",
                step1:"notok",
                step2:"notok",
                step3:"notok",
                created:moment().format("YYYY-MM-DD")
            }).then( ok => {

                emailService.sendEmailToInvAfterSignUp({emailReciver:values.email}).then( ok => {
                    console.log("EMAIL SENDED");
                }).catch(err => {console.log(err)});
                
                localStorage.setItem('role',"investisor");
                this.openSnackbar('success', "Félécitation ! Vous devez compléter votre profil maintenant");
                localStorage.setItem("isProfilCompleted","false");
                setTimeout(() => {
                    this.props.history.push("/signup/investisor/step1")
                },2000);

            })




        }).catch(err => {

            console.log(err);

            if(err.code === "auth/email-already-in-use"){
                this.openSnackbar('error', "Adresse mail déja utilisé!");
                this.setState({loading:false})
            }
            if(err.code === "auth/weak-password"){
                this.openSnackbar('error', "Le mot de passe doit contenir au minimum 6 caractères !");
                this.setState({loading:false})
            }

        })

    };



    render() {
        return(
            <div className="app center-menu" style={{backgroundColor:"#FFF"}}>
                <header id="topnav" >
                    <Suspense fallback={loading()}>
                        <Topbar props={this.props}  changeActivePage={this.changeActivePage}/>
                    </Suspense>
                </header>

                <div className="wrapper" style={{padding:"72px 0px 0px"}}>
                    <Container fluid>
                        <Suspense fallback={loading()}>
                            <div className="row ml-5">
                                <div className="col-md-8">
                                    <div style={{marginTop:120}}>
                                        <h1 style={{fontSize:"2.85rem",lineHeight:"2.8rem",marginBottom:60,fontWeight:700,textDecoration:"underline"}}>Créez votre compte investisseur</h1>
                                        <a  className="mb-4 pointer mt-3 text-dark" style={{fontSize:"1.3rem"}} href="/login">
                                            Vous avez déjà un compte ? <span style={{color:"rgb(5, 168, 230)",fontWeight:"bold"}}>Connectez-vous</span>
                                        </a>
                                        <AvForm onValidSubmit={this.signUp}>

                                            <AvGroup className="mb-3 mt-5" style={{width:"70%"}}>
                                                <Label className="text-dark font-17 font-weight-bold" for="password">Adresse Email</Label>
                                                <AvInput type="email" name="email" id="email" style={{height:60,fontSize:"1.1rem"}}
                                                         placeholder="Entrer votre mail"
                                                         value={this.state.email} required/>
                                                <AvFeedback><p style={{color:"#ff0046",fontSize:"0.99rem",fontWeight:700}}>Format invalide</p></AvFeedback>
                                            </AvGroup>

                                            <AvGroup className="mb-3 mt-4" style={{width:"70%"}}>
                                                <Label className="text-dark font-17 font-weight-bold" for="password">Veuillez choisir votre mot de passe</Label>
                                                <AvInput type="password" name="password" id="password" style={{height:60,fontSize:"1.1rem"}}
                                                         placeholder="Entrer votre mot de passe"
                                                         onChange={(event) => this.setState({password:event.target.value})}
                                                         value={this.state.password} required/>
                                                <AvFeedback><p style={{color:"#ff0046",fontSize:"0.99rem",fontWeight:700}}>Format invalide</p></AvFeedback>
                                            </AvGroup>

                                            <AvGroup className="mb-3 mt-4" style={{width:"70%"}}>
                                                <Label className="text-dark font-17 font-weight-bold" for="rpassword">Confirmer votre mot de passe</Label>
                                                <AvInput type="password" name="rpassword" id="rpassword" style={{height:60,fontSize:"1.1rem"}}
                                                         placeholder="Confirmer votre mot de passe"
                                                         onChange={(event) => this.setState({rpassword:event.target.value})}
                                                         validate={{ match: { value: 'password' } }}
                                                         value={this.state.rpassword} required />
                                                <AvFeedback>Les deux mot de passes ne sont pas identiques</AvFeedback>
                                            </AvGroup>

                                            <FormControlLabel style={{marginTop:25}}
                                                control={
                                                    <Checkbox
                                                        //checked={this.state.type === 'particulier'}
                                                        //onChange={(event) => this.setState({type:event.target.value})}
                                                        value=''
                                                    />
                                                }
                                                label="J'ai lu et j'accepte les conditions générales d'utilisation de LePerray et celles
                                                 de son prestataire de paiement Stripe, pour l'ouverture du compte de paiement."
                                            />

                                            <FormControlLabel style={{marginTop:25,marginBottom:30}}
                                                control={
                                                    <Checkbox
                                                        //checked={this.state.type === 'particulier'}
                                                        //onChange={(event) => this.setState({type:event.target.value})}
                                                        value=''
                                                    />
                                                }
                                                label="Je souhaite recevoir la newsletter de LePerray pour être informé de l'évolution des investissements
                                                 et des nouvelles entreprises à financer."
                                            />

                                            <formGroup>
                                                <div className="float-right">
                                                    <button className="btn btn-outline-info waves-effect waves-light font-weight-bolder mb-4 custombtn">

                                                        {
                                                            this.state.loading ?
                                                                <div
                                                                    className="spinner-border avatar-xs spinnerColor m-1"
                                                                    role="status"></div> : ' Créer mon compte'
                                                        }
                                                    </button>
                                                </div>

                                            </formGroup>

                                        </AvForm>
                                    </div>



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

export default investisorSignUp