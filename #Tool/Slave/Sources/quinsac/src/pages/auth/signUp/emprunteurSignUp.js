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
import logoLPE from "../../../assets/images/logo-leperray.png"
import emailService from "../../../provider/emailService";
import countryList from "../../../tools/countryList";

const loading = () => <Loader/>;


class emprunteurSignUp extends Component {


    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            isMenuOpened: false,
            activeMenuItem: 'item-gestion',

            openAlert: false,
            alertMessage: '',
            alertType: '',

            type: "particulier",
            civilite: "M.",

            isHaveSmartcoSociety: "Non",

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

    signUp = (event, values) => {

        this.setState({loading: true});
        firebase.auth().createUserWithEmailAndPassword(values.email, values.password).then(res => {

            firebase.database().ref('users/' + res.user.uid).set({
                id: res.user.uid,
                email: values.email,
                role: "emprunteur",
                step1: "ok",
                step2: "ok",
                step3: "ok",
                created: moment().format("YYYY-MM-DD")
            }).then(ok => {

                if (this.state.isHaveSmartcoSociety === "Non") {

                    let coupon = "LEPERRAY" + (Math.floor(100000 + Math.random() * 900000)).toString();
                    emailService.sendMailToEmp({
                        emailReciver: values.email,
                        subject: "Inscription sur LePerray Energie",
                        from: '"lePerray " <noreply@leperray.fr>',
                        msg: "Bienvenue sur Lepperay Energie, <br/><br/><br/> Votre inscription est bien validé sur notre platforme. <br/><br/> A fin de vous faciliter la création et la gestion de votre société, nous vous recommendons d'accéder " +
                            "à notre plateforme <b> SmartCo. </b> <br/> Vous aurez 12 mois d'accès gratuit et un prélevement de 9€/mois aprés.<br/><br/> Votre coupon d'accès est: " + coupon + " <br/><br/> " +
                            "Votre identifiant est : <br/><br/> <b>Email: </b>" + values.email + "<br/><b>Mot de passe: </b> ***** (Le meme indiqué sur LePerray.)<br/><br/>",
                        linkUrl: "J'accépte et j'accéde à SmartCo",
                        url: "http://51.15.229.251:89/login",
                        footerMsg: "<br/><br/><br/><br/>Si vous avez des questions sur le service ou besoin de parler à un spécialiste, contacter-nous directement:<br/><br/>" +
                            "Par email : en répondant à cet email !(on vous répond dans la journée)<br/>Par téléphone : au <b>01 76 39 00 60(lundi-vendredi, 8h-20h)</b>" +
                            "<br/><br/>" + "A très bientôt,<br/><br/><br/>" + "<b>L'équipe LePerray.com</b>",
                        emailEmp: values.email,
                        pwdEmp: values.password,
                        coupon: coupon,
                        sName: values.sname,
                        sNationality: values.snationality,
                        sAdress: values.sadress,
                        sPorteur: values.sporteur,
                        sGerantfirstname: values.sgerantfirstname,
                        sGerantlastname: values.sgerantlastname,
                        sGerantemail: values.sgerantemail,  //mail //gerant

                    }).then(ok => {

                        emailService.sendEmailToRespSmartCo({
                            emailReciver: "respSmartco@yopmail.com",
                            subject: "Attribution d'nouveau coupon d'accès LePerray sur SmartCo ",
                            from: '"lePerray " <noreply@leperray.fr>',
                            msg: "Bonjour Lauret Jean-Hugues, <br/><br/><br/> Un coupon <b>LePerray</b> est attribué pour un nouveau accès gratuit pendant 12 mois sur SmartCo .<br/><br/>Détail du coupon:<br/><br/>" +
                                "<b>Attribué à : </b> " + values.email + "<br/><b>Validité: </b>12 mois <br/><b>Code: </b>" + coupon,
                            footerMsg: "<br/><br/><br/><br/>" +
                                "<br/><br/>" + "A très bientôt,<br/><br/><br/>" + "<b>L'équipe LePerray.com</b>",

                        }).then(ok => {
                            this.setState({loading: false});
                            this.openSnackbar('success', "Votre compte est bien crée sur LePerray. Un email vous a été envoyé à fin d'accéder à notre platforme SmartCo");
                            setTimeout(() => {
                                this.props.history.push("/comment-emprunter")
                            }, 3000);

                        }).catch(err => {
                            this.openSnackbar("error", err);
                        });

                    }).catch(err => {
                        this.openSnackbar("error", err);
                    });

                } else {

                    emailService.sendMailToEmp({
                        emailReciver: values.email,
                        subject: "Inscription sur LePerray Energie",
                        from: '"lePerray " <noreply@leperray.fr>',
                        msg: "Bienvenue sur Lepperay Energie, <br/><br/><br/> Votre inscription est bien validé sur notre platforme. <br/><br/> Veuillez cliquer sur lien ci-dessous à fin d'accéder au formulaire d'emprunt sur " +
                            "<b>SmartCo</b><br/><br/>",
                        linkUrl: "J'accéde à SmartCo",
                        url: "http://51.15.229.251:89/gestion/entreprises",
                        footerMsg: "<br/><br/><br/><br/>Si vous avez des questions sur le service ou besoin de parler à un spécialiste, contacter-nous directement:<br/><br/>" +
                            "Par email : en répondant à cet email !(on vous répond dans la journée)<br/>Par téléphone : au <b>01 76 39 00 60(lundi-vendredi, 8h-20h)</b>" +
                            "<br/><br/>" + "A très bientôt,<br/><br/><br/>" + "<b>L'équipe LePerray.com</b>",
                        emailEmp: "",
                        pwdEmp: "",
                        coupon: ""

                    }).then(ok => {
                        this.setState({loading: false});
                        this.openSnackbar('success', "Votre compte est bien crée sur LePerray. Un email vous a été envoyé à fin d'accéder à notre platforme SmartCo");
                        setTimeout(() => {
                            this.props.history.push("/comment-emprunter")
                        }, 3000);

                    }).catch(err => {
                        this.openSnackbar("error", err);
                    });

                }

            })


        }).catch(err => {

            console.log(err);

            if (err.code === "auth/email-already-in-use") {
                this.openSnackbar('error', "Adresse mail déja utilisé!");
                this.setState({loading: false})
            }
            if (err.code === "auth/weak-password") {
                this.openSnackbar('error', "Le mot de passe doit contenir au minimum 6 caractères !");
                this.setState({loading: false})
            }

        })

    };


    render() {
        return (
            <div className="app center-menu" style={{backgroundColor: "#FFF"}}>
                <header id="topnav">
                    <Suspense fallback={loading()}>
                        <Topbar props={this.props} changeActivePage={this.changeActivePage}/>
                    </Suspense>
                </header>

                <div className="wrapper" style={{padding: "72px 0px 0px"}}>
                    <Container fluid>
                        <Suspense fallback={loading()}>
                            <div className="row ml-5">
                                <div align="center" className="col-md-6 text-center" style={{marginTop: 160,}}>
                                    <div style={{border: "2px solid #F0F0F0", width: "75%", height: 700}}>
                                        <div style={{padding: "50px"}}>
                                            <h1 style={{
                                                fontSize: "1.601rem",
                                                lineHeight: 1.2,
                                                color: "#222",
                                                fontWeight: 900,
                                                marginTop: 100
                                            }}>
                                                LPE Finance une emprunteur plateforme de financement participatif
                                                citoyen
                                                pour les énergies renouvelables
                                            </h1>
                                            <div style={{marginTop: "50%"}}>
                                                <img alt="" src={logoLPE}/>
                                                <p className="mt-1">Une filiale à 100% de la banque centrale</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div style={{marginTop: 120}}>
                                        <h1 style={{
                                            fontSize: "2.85rem",
                                            lineHeight: "2.8rem",
                                            marginBottom: 60,
                                            fontWeight: 700,
                                            textDecoration: "underline"
                                        }}>Créez votre compte emprunteur</h1>
                                        <a className="mb-4 pointer mt-3 text-dark" style={{fontSize: "1.3rem"}}
                                           href="/login">
                                            Vous avez déjà un compte ? <span style={{
                                            color: "rgb(5, 168, 230)",
                                            fontWeight: "bold"
                                        }}>Connectez-vous</span>
                                        </a>
                                        <AvForm onValidSubmit={this.signUp}>

                                            <AvGroup className="mb-3 mt-5" style={{width: "70%"}}>
                                                <Label className="text-dark font-17 font-weight-bold" for="password">Adresse
                                                    Email</Label>
                                                <AvInput type="email" name="email" id="email"
                                                         style={{height: 60, fontSize: "1.1rem"}}
                                                         placeholder="Entrer votre mail"
                                                         value={this.state.email} required/>
                                                <AvFeedback><p style={{
                                                    color: "#ff0046",
                                                    fontSize: "0.99rem",
                                                    fontWeight: 700
                                                }}>Format invalide</p></AvFeedback>
                                            </AvGroup>

                                            <AvGroup className="mb-3 mt-4" style={{width: "70%"}}>
                                                <Label className="text-dark font-17 font-weight-bold" for="password">Veuillez
                                                    choisir votre mot de passe</Label>
                                                <AvInput type="password" name="password" id="password"
                                                         style={{height: 60, fontSize: "1.1rem"}}
                                                         placeholder="Entrer votre mot de passe"
                                                         onChange={(event) => this.setState({password: event.target.value})}
                                                         value={this.state.password} required/>
                                                <AvFeedback><p style={{
                                                    color: "#ff0046",
                                                    fontSize: "0.99rem",
                                                    fontWeight: 700
                                                }}>Format invalide</p></AvFeedback>
                                            </AvGroup>

                                            <AvGroup className="mb-3 mt-4" style={{width: "70%"}}>
                                                <Label className="text-dark font-17 font-weight-bold" for="rpassword">Confirmer
                                                    votre mot de passe</Label>
                                                <AvInput type="password" name="rpassword" id="rpassword"
                                                         style={{height: 60, fontSize: "1.1rem"}}
                                                         placeholder="Confirmer votre mot de passe"
                                                         onChange={(event) => this.setState({rpassword: event.target.value})}
                                                         validate={{match: {value: 'password'}}}
                                                         value={this.state.rpassword} required/>
                                                <AvFeedback>Les deux mot de passes ne sont pas identiques</AvFeedback>
                                            </AvGroup>
                                            <Label className="text-dark font-17 font-weight-bold mt-3" for="password">Est-ce
                                                que vous avez déja crée une société sur &nbsp;<span>
                                                    <a href="http://51.15.229.251:89" target="_blank">SmartCo</a></span> ?</Label>
                                            <FormGroup row style={{display: "block"}}>
                                                <FormControlLabel
                                                    classes={{
                                                        label: "customUILabel",
                                                    }}
                                                    control={
                                                        <Checkbox
                                                            checked={this.state.isHaveSmartcoSociety === 'Oui'}
                                                            onChange={(event) => this.setState({isHaveSmartcoSociety: event.target.value})}
                                                            value='Oui'
                                                            classes={{
                                                                root: "customUICheckboxIcon"
                                                            }}
                                                        />
                                                    }
                                                    label="Oui"
                                                />
                                                <FormControlLabel
                                                    classes={{
                                                        label: "customUILabel",
                                                    }}
                                                    control={
                                                        <Checkbox
                                                            checked={this.state.isHaveSmartcoSociety === 'Non'}
                                                            onChange={(event) => this.setState({isHaveSmartcoSociety: event.target.value})}
                                                            value='Non'
                                                        />
                                                    }
                                                    label="Non"
                                                />
                                            </FormGroup>

                                            {
                                                this.state.isHaveSmartcoSociety === "Non" &&
                                                <div style={{padding: "20px", border: "2px solid #C0C0C0"}}>
                                                    <AvGroup className="mb-3" style={{width: "70%"}}>
                                                        <Label className="text-dark font-14 font-weight-bold"
                                                               for="password">Non de la société</Label>
                                                        <AvInput type="text" name="sname" id="sname"
                                                                 style={{height: 45, fontSize: "0.81rem"}}
                                                                 placeholder="Entrez le nom de la société"
                                                                 value={""} required/>
                                                        <AvFeedback><p style={{
                                                            color: "#ff0046",
                                                            fontSize: "0.81rem",
                                                            fontWeight: 700
                                                        }}>Veuillez renseigner le nom de la société</p></AvFeedback>
                                                    </AvGroup>
                                                    <AvGroup className="mb-3" style={{width: "70%"}}>
                                                        <Label className="text-dark font-14 font-weight-bold"
                                                               for="snationality">Nationnalité</Label>
                                                        <AvInput type="select" name="snationality" id="snationality"
                                                                 className="custom-select"
                                                                 style={{height: 45, fontSize: "0.81rem"}}
                                                                 value={"Switzerland"}>
                                                            {
                                                                countryList.map((item, key) => (
                                                                    <option value={item.Name}>{item.Name} </option>
                                                                ))
                                                            }

                                                        </AvInput>
                                                    </AvGroup>
                                                    <AvGroup className="mb-3" style={{width: "70%"}}>
                                                        <Label className="text-dark font-14 font-weight-bold"
                                                               for="sadress">Adresse de la société</Label>
                                                        <AvInput type="text" name="sadress" id="sadress"
                                                                 style={{height: 45, fontSize: "0.81rem"}}
                                                                 placeholder="Entrez l'adresse de la société"
                                                                 value={""} required/>
                                                        <AvFeedback><p style={{
                                                            color: "#ff0046",
                                                            fontSize: "0.81rem",
                                                            fontWeight: 700
                                                        }}>Veuillez renseigner le nom du gérant de la société</p>
                                                        </AvFeedback>
                                                    </AvGroup>
                                                    <AvGroup className="mb-3" style={{width: "70%"}}>
                                                        <Label className="text-dark font-14 font-weight-bold"
                                                               for="sporteur">Non du porteur</Label>
                                                        <AvInput type="text" name="sporteur" id="sporteur"
                                                                 style={{height: 45, fontSize: "0.81rem"}}
                                                                 placeholder="Entrez le nom du porteur"
                                                                 value={""} required/>
                                                        <AvFeedback><p style={{
                                                            color: "#ff0046",
                                                            fontSize: "0.81rem",
                                                            fontWeight: 700
                                                        }}>Veuillez renseigner le nom du porteur de la société</p>
                                                        </AvFeedback>
                                                    </AvGroup>
                                                    <div className="row">
                                                        <div className="col-md-6">
                                                            <AvGroup className="mb-3" style={{width: "70%"}}>
                                                                <Label className="text-dark font-14 font-weight-bold"
                                                                       for="sgerantfirstname">Nom du gérant</Label>
                                                                <AvInput type="text" name="sgerantfirstname"
                                                                         id="sgerantfirstname"
                                                                         style={{height: 45, fontSize: "0.81rem"}}
                                                                         placeholder="Entrez le nom  du gérant"
                                                                         value={""} required/>
                                                                <AvFeedback><p style={{
                                                                    color: "#ff0046",
                                                                    fontSize: "0.81rem",
                                                                    fontWeight: 700
                                                                }}>Veuillez renseigner le nom du gérant de la
                                                                    société</p></AvFeedback>
                                                            </AvGroup>
                                                        </div>
                                                        <div className="col-md-6">
                                                            <AvGroup className="mb-3" style={{width: "70%"}}>
                                                                <Label className="text-dark font-14 font-weight-bold"
                                                                       for="sgerantlastname">Prénom du gérant</Label>
                                                                <AvInput type="text" name="sgerantlastname"
                                                                         id="sgerantlastname"
                                                                         style={{height: 45, fontSize: "0.81rem"}}
                                                                         placeholder="Entrez le prénom du gérant"
                                                                         value={""} required/>
                                                                <AvFeedback><p style={{
                                                                    color: "#ff0046",
                                                                    fontSize: "0.81rem",
                                                                    fontWeight: 700
                                                                }}>Veuillez renseigner le prénom du gérant de la
                                                                    société</p></AvFeedback>
                                                            </AvGroup>
                                                        </div>
                                                    </div>
                                                    <AvGroup className="mb-3" style={{width: "70%"}}>
                                                        <Label className="text-dark font-14 font-weight-bold"
                                                               for="sgerantemail">Adresse mail du gérant</Label>
                                                        <AvInput type="text" name="sgerantemail" id="sgerantemail"
                                                                 style={{height: 45, fontSize: "0.81rem"}}
                                                                 placeholder="Entrez l'adresse mail  du gérant"
                                                                 value={""} required/>
                                                        <AvFeedback><p style={{
                                                            color: "#ff0046",
                                                            fontSize: "0.81rem",
                                                            fontWeight: 700
                                                        }}>Veuillez renseigner l'adresse mail du gérant de la
                                                            société</p></AvFeedback>
                                                    </AvGroup>


                                                </div>
                                            }

                                            <FormControlLabel style={{marginTop: 25}}
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

                                            <FormControlLabel style={{marginTop: 25, marginBottom: 30}}
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
                                                    <button
                                                        className="btn btn-outline-info waves-effect waves-light font-weight-bolder mb-4 custombtn">

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

export default emprunteurSignUp