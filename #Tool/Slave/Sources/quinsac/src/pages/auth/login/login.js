import React, {Component, Suspense} from "react";
import Topbar from "../../../components/Menu/Topbar";
import {Container, FormGroup as formGroup, Label} from "reactstrap";
import Loader from "../../../components/Loader";
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/database"
import {AvFeedback, AvForm, AvGroup, AvInput} from "availity-reactstrap-validation";
import MySnackbarContentWrapper from "../../../tools/customSnackBar";
import Snackbar from "@material-ui/core/Snackbar";

const loading = () => <Loader/>;


class login extends Component{


    constructor(props){
        super(props);
        this.state = {
            loading: false,
            isMenuOpened: false,
            activeMenuItem: 'item-gestion',

            openAlert:false,
            alertMessage:'',
            alertType:''
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

    }

    login = (event,values) => {

        this.setState({loading:true});

        firebase.auth().signInWithEmailAndPassword(values.email,values.password).then( res => {



            firebase.database().ref('/users/'+res.user.uid).on('value', (snapshot) => {
                const user = snapshot.val();
                if(user.role === "emprunteur"){
                    this.openSnackbar('error', "Compte emprunteur erroné !");
                    this.setState({loading:false})
                }else{

                    localStorage.setItem('uid',res.user.uid);
                    localStorage.setItem('email',res.user.email);
                    localStorage.setItem('user',JSON.stringify(user));
                    localStorage.setItem('role',user.role);
                    if(user.step1 === "notok" || user.step2 === "notok" || user.step3 === "notok"){
                        localStorage.setItem("isProfilCompleted","false")
                    }else{
                        localStorage.setItem("isProfilCompleted","true")
                    }

                    this.props.history.push('/');
                    this.setState({loading:false});
                }

            });

        }).catch(err => {
            if(err.code === "auth/invalid-email"){
                this.openSnackbar('error', "Adresse mail incorrect !");
                this.setState({loading:false})
            }
            if(err.code === "auth/wrong-password"){
                this.openSnackbar('error', "Mot de passe incorrect !");
                this.setState({loading:false})
            }
            if(err.code === "auth/user-not-found"){
                this.openSnackbar('error', "Utilisateur non trouvé !");
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
                                <div className="col-md-5">
                                    <div style={{marginTop:120}}>
                                        <h1 style={{fontSize:"2.25rem",lineHeight:"2.5rem",marginBottom:40,fontWeight:400,textDecoration:"underline"}}>Connectez-vous</h1>

                                        <span className="">Créez votre compte en quelques minutes seulement et commencez à investir.
                                            <span className="text-info font-weight-bolder pointer" onClick={() => this.props.history.push("/signup/investisor")}> Inscrivez-vous</span>
                                        </span>

                                        <AvForm onValidSubmit={this.login}>


                                            <AvGroup className="mb-3 mt-4" style={{width:"100%"}}>
                                                <Label className="text-dark font-17" for="password">Email</Label>
                                                <AvInput type="email" name="email" id="email" style={{height:50}}
                                                         placeholder="Entrer votre adresse email"
                                                         value={this.state.email} required/>
                                                <AvFeedback>Email invalide</AvFeedback>
                                            </AvGroup>

                                            <AvGroup className="mb-3" style={{width:"100%"}}>
                                                <Label className="text-dark font-17" for="password">Mot de passe</Label>
                                                <AvInput type="password" name="password" id="password" style={{height:50}}
                                                         placeholder="Entrer votre mot de passe"
                                                         onChange={(event) => this.setState({password:event.target.value})}
                                                         value={this.state.password} required/>
                                                <AvFeedback>Champs obligatoire!</AvFeedback>
                                            </AvGroup>

                                            <formGroup>
                                                <div className="text-center">
                                                    <button className="btn btn-outline-info waves-effect waves-light font-weight-bolder mt-2" style={{marginBottom:150,fontSize:"1.12rem"}}>
                                                        {
                                                            this.state.loading ?
                                                                <div
                                                                    className="spinner-border avatar-xs spinnerColor m-1"
                                                                    role="status"></div> : 'Se connecter'
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

export default login
