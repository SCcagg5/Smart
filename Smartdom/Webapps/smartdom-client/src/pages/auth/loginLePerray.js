import React, {Component} from "react";
import {Container, Row, Col, Card, CardBody, Label, FormGroup, Button, Alert} from 'reactstrap';
import {AvForm, AvField, AvGroup, AvInput, AvFeedback} from 'availity-reactstrap-validation';
import Loader from '../../components/Loader';
import logo from "../../assets/images/logos/logoSmartCo.jpeg"
import {Redirect, Link} from 'react-router-dom'
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/database"
import Snackbar from '@material-ui/core/Snackbar';
import MySnackbarContentWrapper from "../../tools/customSnackBar"

class loginLePerray extends Component {

    state = {

        loading: false,
        error: '',
        email: '',
        password: '',
        coupon:"",
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

    login = (event,values) => {
        this.setState({
            email: values.email,
            password:values.password,
            coupon:values.coupon,
            loading:true
        });

        if(values.coupon === "LEPERRAY2019"){

            firebase.auth().signInWithEmailAndPassword(this.state.email, this.state.password).then( res => {
                //console.log(res.user.uid,res.user.email);
                localStorage.setItem('uid',res.user.uid);
                localStorage.setItem('email',res.user.email);

                firebase.database().ref('/users/'+res.user.uid).on('value', (snapshot) => {
                    const user = snapshot.val();
                    localStorage.setItem('user',JSON.stringify(user));
                    localStorage.setItem('role',user.role);

                    this.props.history.push('/');
                    this.setState({
                        loading:false
                    });
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
            });
        }else{

            this.openSnackbar('error', "Votre coupon d'accès est invalide !");
            this.setState({loading:false})
        }



    };


    render() {

        return (
            <React.Fragment>

                <body className="authentication-bg authentication-bg-pattern enlarged">
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

                                            <AvGroup className="mb-3">
                                                <Label for="password">Coupon d'accès</Label>
                                                <AvInput type="text" name="coupon" id="email"
                                                         placeholder="Entrez votre coupon d'accès"
                                                         value={this.state.coupon} required/>
                                                <AvFeedback>Champs obligatoire!</AvFeedback>
                                            </AvGroup>

                                            <FormGroup>
                                                <Button color="primary" className="btn-block">Se connecter</Button>
                                            </FormGroup>
                                        </AvForm>
                                    </CardBody>
                                </Card>
                            </Col>
                        </Row>

                        <Row className="mt-3">
                            <Col className="col-12 text-center">
                                <p><Link to="/forget-password" className="text-white-50 ml-1">Mot de passe oublié
                                    ?</Link></p>
                                {/*<p className="text-white-50">Don't have an account? <Link to="/register" className="text-white ml-1"><b>S'inscrire</b></Link></p>*/}
                            </Col>
                        </Row>

                    </Container>
                </div>
                <footer className="footer footer-alt">
                    2019 - 2020 &copy; SmartCo
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

export default loginLePerray;