import React, {Component} from "react";
import {Container, Row, Col, Card, CardBody, Label, FormGroup, Button, Alert} from 'reactstrap';
import {AvForm, AvField, AvGroup, AvInput, AvFeedback} from 'availity-reactstrap-validation';
import Loader from '../../components/Loader';
import logo from "../../assets/images/logos/logoSmartDom.jpeg"
import {Redirect, Link} from 'react-router-dom'
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/database"
import Snackbar from '@material-ui/core/Snackbar';
import MySnackbarContentWrapper from "../../tools/customSnackBar"
import GoogleButton from 'react-google-button'
import moment from "moment";


class login extends Component {
    constructor(props) {
        super(props);


        this.loginWithgoogle=this.loginWithgoogle.bind(this)
    }



state = {

        loading: false,
        error: '',
        email: '',
        password: '',
        openAlert:false,
        alertMessage:'',
        alertType:''
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
   async sendMail(body){

     console.log(JSON.stringify(body))

    fetch("http://149.202.172.15:3001/api/sendCustomMailWithUrl",{
         method:"POST",
        headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json'
        },
         body: JSON.stringify(body)
     }).then(res =>()=>{
         console.log("resultat"+" "+res)
     })
 }
    loginWithgoogle(){
        var provider = new firebase.auth.GoogleAuthProvider();
        provider.addScope('https://www.googleapis.com/auth/contacts.readonly');
        firebase.auth().signInWithPopup(provider).then((result)=> {
            // This gives you a Google Access Token. You can use it to access the Google API.
            var token = result.credential.accessToken;
            // The signed-in user info.
            var user = result.user;


            console.log(user.uid )


              firebase.database().ref("/users/"+user.uid).on("value",(snapshot)=> {
             if (snapshot.val()=== null ){

                    console.log("inser temchi")
                    firebase.database().ref("/users/"+user.uid).set({
                        "affiliations" : [ ],
                        "aparte" : "",
                        "date_naiss" : "",
                        "disponibilite" : true,
                        "domaineActivites" : [  ],
                        "email" : user.email,
                        "fax" : "",
                        "fonctions" : [ ],
                        "formations" : [ ],
                        "imageUrl" : user.photoURL,
                        "langues" : "",
                        "nom" : user.displayName,
                        "phone" : "",
                        "pinCode" : "1234",
                        "prenom" : "",
                        "role" : "avocat",
                        "specialite" : " ",
                        "tarif" : "25",
                        "statut":"nouveau",
                        "uid" : user.uid
                    })

                 var u = {
                     "affiliations" : [ ],
                     "aparte" : "",
                     "date_naiss" : "",
                     "disponibilite" : true,
                     "domaineActivites" : [  ],
                     "email" : user.email,
                     "fax" : "",
                     "fonctions" : [ ],
                     "formations" : [ ],
                     "imageUrl" : user.photoURL,
                     "langues" : "",
                     "nom" : user.displayName,
                     "phone" : "",
                     "pinCode" : "1234",
                     "prenom" : "",
                     "role" : "avocat",
                     "specialite" : " ",
                     "tarif" : "25",
                     "statut":"nouveau",
                     "uid" : user.uid
                 }

                 let body ={
                        "emailReciver":user.email,
                     "subject":"Smartdom : etat de votre profile",
                     "linkUrl":"Cliquer ici pour completer votre profile",
                     "url":"http://localhost:3000/avocat/infos",
                     "msg":"bonjour ,<br> Votre processus d'enregistrement est en cours <br> ",
                     "footerMsg":"<br>cordialement<br>"
                 }

                 let body2={
                     "emailReciver":"jawher.zairi@sesame.com.tn",
                     "subject":"Smartdom Profile",
                     "linkUrl":"<br>Cliquer ici pour voir les nouveau prestataires<br>",
                     "url":"http://localhost:3000/",
                     "msg":"bonjour ,<br> un nouveau prestataire Onboarding request  <br> ",
                     "footerMsg":"<br>cordialement<br>"
                 }

                 this.sendMail(body)
                 this.sendMail(body2)

                 localStorage.setItem('user',JSON.stringify(u))
                 localStorage.setItem("uid",user.uid)



                 localStorage.setItem("role","avocat");
                 this.props.history.push("/")





                }else {

                 console.log(JSON.stringify(snapshot.val().role))
                 localStorage.setItem("user",JSON.stringify(snapshot.val()))
                 localStorage.setItem("uid",user.uid)

                 console.log(localStorage.getItem("uid"))


                 localStorage.setItem("role",snapshot.val().role);
                    this.props.history.push("/")

                }

            })
            // ...
        }).catch(function(error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            // The email of the user's account used.
            var email = error.email;
            // The firebase.auth.AuthCredential type that was used.
            var credential = error.credential;
            // ...
        });
    }

    login = (event,values) => {
        this.setState({
            email: values.email,
            password:values.password,
            loading:true
        });

        firebase.auth().signInWithEmailAndPassword(this.state.email, this.state.password).then( res => {
            //console.log(res.user.uid,res.user.email);
            localStorage.setItem('uid',res.user.uid);
            localStorage.setItem('email',res.user.email);


            firebase.database().ref('/users/'+res.user.uid).on('value', (snapshot) => {
                const user = snapshot.val();
                localStorage.setItem('user',JSON.stringify(user));
                localStorage.setItem('role',user.role);

                this.props.history.push('/');
                console.log(user)
                this.setState({
                    loading:false
                });
            });
        }).catch(err => {
            console.log(err);
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
        });

    };


    render() {

        return (
            <React.Fragment>

                <body className="authentication-bg  enlarged">
                <div className="account-pages mt-5 mb-5">
                    <Container>
                        <Row className="justify-content-center">
                            <Col md={8} lg={6} xl={5}>
                                <Card className="bg-pattern">
                                    <CardBody className="p-4 position-relative">
                                        { /* preloader */}
                                        {this.state.loading && <Loader/>}

                                        <div className="text-center w-75 m-auto">
                                            <a href="#">
                                                <span><img style={{marginLeft:-15}} src={logo} alt="" height="120"/></span>
                                            </a>
                                            <p className="text-muted mb-4 mt-3">Entrez votre nom d'utilisateur et votre
                                                mot de passe pour accéder au panneau d'administration.</p>
                                        </div>


                                        {this.state.error &&
                                        <Alert color="danger" isOpen={this.state.error ? true : false}>
                                            <div>{this.state.error}</div>
                                        </Alert>}

                                        <AvForm onValidSubmit={this.login}>

                                            <AvGroup className="mb-3">
                                                <Label for="password">Email</Label>
                                                <AvInput type="email" name="email" id="email"
                                                         placeholder="Entrer votre mail"
                                                         value={this.state.email} required/>
                                                <AvFeedback>Email invalide</AvFeedback>
                                            </AvGroup>

                                            <AvGroup className="mb-3">
                                                <Label for="password">Mot de passe</Label>
                                                <AvInput type="password" name="password" id="password"
                                                         placeholder="Entrer votre mot de passe"
                                                         value={this.state.password} required/>
                                                <AvFeedback>Mot de passe incorrect</AvFeedback>
                                            </AvGroup>

                                            <FormGroup>
                                                <Button color="primary" className="btn-block">Se connecter</Button>
                                            </FormGroup>
                                        </AvForm>


                                        <div className="text-center">
                                            <h5 style={{fontFamily:"sans-serif" ,color:"#999999"}}>
                                                Sinon, nouvelle inscription
                                            </h5>
                                        </div>
                                        <div className="text-center">
                                            <h5 style={{fontFamily:"sans-serif" ,color:"red"}}>
                                                <u>  Créer un compte</u>
                                            </h5>
                                        </div>


                                        <div className="text-center">
                                            <h5 style={{fontFamily:"sans-serif" ,color:"#999999"}}>
                                                Ou
                                            </h5>
                                        </div>


                                        <div className="row">

                                            <div className="col-md-6 ">
                                                <GoogleButton
                                                    style={{width:"100% ",height:50,fontSize:14}}

                                                    onClick={() =>{this.loginWithgoogle() }}
                                                />

                                            </div>
                                            <div className="col-md-5">

                                            </div>

                                        </div>
                                    </CardBody>
                                </Card>
                            </Col>
                        </Row>



                        <Row className="mt-3">
                            <Col className="col-12 text-center">
                                <p><Link to="/forget-password" className="text-white-50 ml-1">Mot de passe oublié
                                    ?</Link></p>
                                <p className="text-black-50">Don't have an account? <Link to="/register" className="text-black ml-1"><b>S'inscrire</b></Link></p>
                            </Col>
                        </Row>

                    </Container>
                </div>
                <footer className="footer footer-alt">
                    2019 - 2020 &copy; SmartDom
                </footer>
                </body>
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
            </React.Fragment>
        )

    }

}

export default login;