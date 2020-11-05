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
import logoAppbank from "../../assets/images/logoAppBank.jpeg"
import 'react-phone-input-2/lib/style.css'
import PhoneInput from "react-phone-input-2";
import maillingService from "../../provider/maillingService";

class carbonneInvestRedirect extends Component {

    state = {

        loading: false,
        error: true,
        fullname:"",
        email: "",
        phone: "",
        adress:"",
        amount:"",
        senderName:"",

        urlValider:"false",
        coffreId:"",

        openAlert: false,
        alertMessage: '',
        alertType: '',
    };

    componentWillMount() {

        this.setState({loading:true});
        firebase.database().ref("payUrls/"+this.props.match.params.id).on("value", (snapshot) => {
            let data = snapshot.val();
            if(data !== undefined && data !== null){
                console.log(data.coffreId)
                this.setState({
                    email:data.recieverMail || "",
                    phone:data.recieverPhone || "",
                    fullname:data.recieverName,
                    amount:data.amount,
                    senderName:data.senderName,
                    senderAdress:data.senderAdress,
                    greenBond:data.greenBond,
                    loading:false,
                    error:false,
                    urlValider:data.valider || "false",
                    coffreId:data.coffreId
                })
            }else{
                this.openSnackbar("error","Ce lien n'est plus valable !")
            }

        });


    }

    openSnackbar = (type, msg) => {
        this.setState({
            openAlert: true,
            alertMessage: msg, //***
            alertType: type
        });
    };

    closeSnackbar = (event, reason) => {
        if (reason === 'clickaway') return;
        this.setState({openAlert: false});
    };

    validateTransfert = (event, values) => {

        this.setState({loading:true});

        maillingService.verifSmartCoUser({
            email: values.email,
            displayName: this.state.fullname,
            type: "reciever",
            senderAmount: this.state.amount,
            senderBond: this.state.greenBond,
            senderName:this.state.senderName,
            senderAdress: this.state.senderAdress,
            recieverAdress: values.adress,
            reciever: this.state.fullname,
            password: "123456",
        }).then( verif => {

            console.log(verif);

            if(verif.status === 200){
                firebase.database().ref("payUrls/"+this.props.match.params.id).update({
                    "valider":"true"
                }).then( ok => {
                    firebase.database().ref("coffreFort/"+this.state.coffreId).update({
                        "recieverAdress":values.adress,
                        "uidReciever":verif.data.uid
                    });
                    this.setState({urlValider:"true",loading:false})
                })
            }else{
                this.setState({loading:false});
                this.openSnackbar("error",verif.error.message || "Une erreur est survenue ! Veuillez vérifier votre connexion internet ")
            }





        }).catch( err => console.log(err));


        this.setState({urlValider:true})

    };


    render() {

        return (
            <React.Fragment>

                <body className="authentication-bg authentication-bg-patternC-E enlarged">
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
                                                <span><img style={{marginLeft: -15}} src={logoAppbank} alt=""
                                                           height="120"/></span>
                                            </a>
                                            <p className="mb-2 mt-3 font-weight-bold" style={{color: "#000"}}>Bienvenue {this.state.fullname}&nbsp;
                                                sur Carbone-Energie+</p>
                                        </div>

                                        {
                                            this.state.error === false && this.state.urlValider === "false" &&
                                            <div align="center">
                                                <p className="mb-1 mt-2" style={{color: "#000"}}>{this.state.senderName} vien de vous envoyer {this.state.amount} €
                                                    via notre app mobile</p>
                                                <p className="mb-2 mt-1" style={{color: "#000"}}>Pour bien les récuperer, merci de
                                                    compléter et valider les informations ci-dessous:</p>
                                            </div>
                                        }

                                        {
                                            this.state.urlValider === "true" &&

                                            <div align="center">
                                                <p className="mb-1 mt-3" style={{color: "#000"}}>Félécitation ! vous avez reçu {this.state.amount+" €"} de
                                                    {" "+this.state.senderName} </p>
                                                <p className="mb-2 mt-4" style={{color: "#000"}}>Pour consulter le document de contrat de cession, il suffit
                                                    d'accéder à votre boite mail et accéder à votre compte sur
                                                    <a href="http://51.15.229.251:89/login" target="_blank" style={{textDecoration:"underline"}}>&nbsp;SmartCo</a> </p>
                                            </div>
                                        }

                                        {
                                            this.state.urlValider === "false" &&
                                            <AvForm onValidSubmit={this.validateTransfert}>

                                                <AvGroup className="mb-3">
                                                    <Label for="password">Email</Label>
                                                    <AvInput type="email" name="email" id="email"
                                                             placeholder="Votre adresse mail"
                                                             value={this.state.email} required/>
                                                    <AvFeedback>Email invalide</AvFeedback>
                                                </AvGroup>

                                                <AvGroup className="mb-3">
                                                    <Label for="password">Numéro de téléphone</Label>
                                                    <PhoneInput
                                                        country={'fr'}
                                                        value={this.state.phone}
                                                        onChange={(value) => this.setState({phone:value})}
                                                        inputStyle={{
                                                            width: "inherit",
                                                            height: 37
                                                        }}/>
                                                </AvGroup>

                                                <AvGroup className="mb-3">
                                                    <Label for="password">Adresse</Label>
                                                    <AvInput type="text" name="adress" id="adress"
                                                             placeholder=""
                                                             value={this.state.adress} required/>
                                                    <AvFeedback>Veuillez renseigner votre adresse</AvFeedback>
                                                </AvGroup>


                                                <FormGroup>
                                                    <div align="right">
                                                    <Button style={{backgroundColor: "seagreen", color: "#fff"}}
                                                            className="btn">Continuer</Button></div>
                                                </FormGroup>
                                            </AvForm>
                                        }




                                    </CardBody>
                                </Card>
                            </Col>
                        </Row>

                    </Container>
                </div>
                <footer className="footer footer-alt">
                    2020 - 2021 &copy; C-E+
                </footer>
                </body>
                <Snackbar
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'left',
                    }}
                    open={this.state.openAlert}
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

export default carbonneInvestRedirect;