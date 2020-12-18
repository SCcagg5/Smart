import React, {Component} from "react";
import {Container, Row, Col, Card, CardBody, Label, FormGroup} from 'reactstrap';
import {AvForm, AvGroup, AvInput, AvFeedback} from 'availity-reactstrap-validation';
import Loader from '../../components/Loaders/Loader';
import logo from "../../assets/images/logos/OALegalLogoV2.jpeg"
import Snackbar from '@material-ui/core/Snackbar';
import SmartService from "../../provider/SmartService";
import Alert from '@material-ui/lab/Alert';

/*import rethink from "../../controller/rethink";
import * as json_clients_cases_data
    from "../../assets/files/ged01-290815-OaLegal-clients_tempo-896ca0ed-8b4a-40fd-aeff-7ce26ee1bcf9-export (9).json"
import * as json_timeSheets_data
    from "../../assets/files/ged01-290815-OaLegal-lignes_f-896ca0ed-8b4a-40fd-aeff-7ce26ee1bcf9-export (6).json"
import * as json_annuaire_clients_mandat from "../../assets/files/ged01-290815-annuaire_client_mondat-export (10).json"
import * as json_contacts from "../../assets/files/ged01-290815-contacts-export (7).json"*/

class login extends Component {

    state = {

        loading: false,
        error: '',
        email: localStorage.getItem("email") || "",
        password: '',
        openAlert: false,
        alertMessage: '',
        alertType: '',
    };

    componentDidMount() {


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

    login = (event, values) => {

        this.setState({
            loading: true,
        });

        SmartService.getToken().then(tokenRes => {
            if (tokenRes.succes === true && tokenRes.status === 200) {

                SmartService.login({
                    email: values.email.trim().toLowerCase(),
                    password1: values.password
                }, tokenRes.data.token).then(loginRes => {

                    if (loginRes.succes === true && loginRes.status === 200) {

                        SmartService.getUserInfo(tokenRes.data.token, loginRes.data.usrtoken).then(infoRes => {

                            if (infoRes.succes === true && infoRes.status === 200) {

                                SmartService.getInfoGed(tokenRes.data.token, loginRes.data.usrtoken).then(infoGedRes => {
                                    if (infoGedRes.succes === true && infoGedRes.status === 200) {

                                        localStorage.setItem("token", tokenRes.data.token)
                                        localStorage.setItem("usrtoken", loginRes.data.usrtoken)
                                        localStorage.setItem("email", infoRes.data.email)
                                        localStorage.setItem("role", infoGedRes.data.self.role.role)
                                        this.setState({loading: false})
                                        this.props.history.push('/home/drive');

                                    } else {
                                        this.openSnackbar('error', infoGedRes.error);
                                        this.setState({loading: false})
                                    }
                                }).catch(err => {
                                    this.openSnackbar('error', err);
                                    this.setState({loading: false})
                                })

                            } else {
                                this.openSnackbar('error', infoRes.error);
                                this.setState({loading: false})
                            }

                        }).catch(err => {
                            this.openSnackbar('error', err);
                            this.setState({loading: false})
                        })

                    } else {
                        this.openSnackbar('error', loginRes.error);
                        this.setState({loading: false})
                    }
                }).catch(err => {
                    this.openSnackbar('error', err);
                    this.setState({loading: false})
                })

            } else {
                this.openSnackbar('error', tokenRes.error);
                this.setState({loading: false})
            }

        }).catch(err => {
            this.openSnackbar('error', err);
            this.setState({loading: false})
            setTimeout(() => {
                this.props.history.push("/error")
            }, 2000)
        })

    };


    render() {

        return (
            <React.Fragment>


                <div style={{justifyContent: "center", marginTop: 110}}>
                    <Container>
                        <Row className="justify-content-center">
                            <Col md={8} lg={6} xl={5}>
                                <Card>
                                    <CardBody className="p-4 position-relative">
                                        { /* preloader */}
                                        {this.state.loading && <Loader/>}

                                        <div align="center" className="mb-2">
                                            <img style={{width: 250, objectFit: "cover"}} src={logo} alt=""/>
                                        </div>

                                        <AvForm onValidSubmit={this.login}>

                                            <AvGroup className="mb-3 mt-5">
                                                <Label for="password">Email</Label>
                                                <AvInput type="email" name="email" id="email"
                                                         style={{height: 45}}
                                                         placeholder="Entrer votre mail"
                                                         value={this.state.email} required/>
                                                <AvFeedback>Email invalide</AvFeedback>
                                            </AvGroup>

                                            <AvGroup className="mb-3">
                                                <Label for="password">Mot de passe</Label>
                                                <AvInput type="password" name="password" id="password"
                                                         placeholder="Entrer votre mot de passe"
                                                         style={{height: 45}}
                                                         value={this.state.password} required/>
                                                <AvFeedback>Mot de passe incorrect</AvFeedback>
                                            </AvGroup>

                                            <FormGroup>
                                                <button className="btn-block btn"
                                                        style={{backgroundColor: "#A00015", marginTop: 65}}>Se connecter
                                                </button>
                                            </FormGroup>
                                        </AvForm>
                                        {/*<h4 className="mt-2"
                                            style={{backgroundColor: "#A00015", marginTop: 65, cursor: "pointer"}}

                                            onClick={() => {
                                                // clients_cases
                                                json_clients_cases_data.default.map((item, key) => {
                                                    if (item.folders && item.folders.length > 0) {
                                                        item.folders.map((f, i) => {
                                                            if (f.facturation) {
                                                                f.facturation.byEmail = f.facturation.byEmail.toString()
                                                                f.facturation.sentByAvocat = f.facturation.sentByAvocat.toString()
                                                                f.facturation.sentBySecr = f.facturation.sentBySecr.toString()
                                                            }
                                                        })
                                                    }
                                                })
                                                rethink.insert("test", 'table("clients_cases").insert(' + JSON.stringify(json_clients_cases_data.default) + ')', "OA_LEGAL", false).then(resAdd => {
                                                    if (resAdd && resAdd === true) {
                                                        console.log(" CLIENTS CASES ADDED")
                                                    } else {
                                                        console.log("NOT INSERTED: ")
                                                    }
                                                }).catch(err => {
                                                    console.log(err)
                                                })
                                                // time_sheets ==> 50 par 50
                                                json_timeSheets_data.default.map((item, key) => {
                                                    let newItem = item;
                                                    if (typeof item.checked === "boolean") {
                                                        newItem.checked = item.checked.toString();
                                                    }

                                                    if (typeof item.newTime.dossier_client.facturation.byEmail === "boolean") {
                                                        newItem.newTime.dossier_client.facturation.byEmail = item.newTime.dossier_client.facturation.byEmail.toString()
                                                    }
                                                    if (typeof item.newTime.dossier_client.facturation.sentByAvocat === "boolean") {
                                                        newItem.newTime.dossier_client.facturation.sentByAvocat = item.newTime.dossier_client.facturation.sentByAvocat.toString()
                                                    }
                                                    if (typeof item.newTime.dossier_client.facturation.sentBySecr === "boolean") {
                                                        newItem.newTime.dossier_client.facturation.sentBySecr = item.newTime.dossier_client.facturation.sentBySecr.toString()
                                                    }
                                                })
                                                rethink.insert("test", 'table("time_sheets").insert(' + JSON.stringify(json_timeSheets_data.default) + ')', "OA_LEGAL", false).then(resAdd => {
                                                    if (resAdd && resAdd === true) {
                                                        console.log("TIMESHEETS ADDED")
                                                    } else {
                                                        console.log("NOT INSERTED: ")
                                                    }
                                                }).catch(err => {
                                                    console.log(err)
                                                })
                                                //annuaire_clients_mandats
                                                json_annuaire_clients_mandat.default.map((item, key) => {
                                                    if (typeof item.isActif === "boolean") {
                                                        item.isActif = item.isActif.toString();
                                                    }
                                                })
                                                rethink.insert("test", 'table("annuaire_clients_mandat").insert(' + JSON.stringify(json_annuaire_clients_mandat.default) + ')', "OA_LEGAL", false).then(resAdd => {
                                                    if (resAdd && resAdd === true) {
                                                        console.log("ANNUAIRE CLIENT MANDAT ADDED")
                                                    } else {
                                                        console.log("NOT INSERTED: ")
                                                    }
                                                }).catch(err => {
                                                    console.log(err)
                                                })
                                                //contacts
                                                json_contacts.default.map((item, key) => {
                                                    item.sort = key;
                                                })
                                                rethink.insert("test", 'table("contacts").insert(' + JSON.stringify(json_contacts.default) + ')', "OA_LEGAL", false).then(resAdd => {
                                                    if (resAdd && resAdd === true) {
                                                        console.log("CONTACTS ADDED")
                                                    } else {
                                                        console.log("NOT INSERTED: ")
                                                    }
                                                }).catch(err => {
                                                    console.log(err)
                                                })
                                            }}
                                        >
                                            Insert into
                                        </h4>*/}
                                    </CardBody>
                                </Card>
                            </Col>
                        </Row>


                    </Container>
                </div>
                <footer className="footer footer-alt">
                    2020 - 2021 &copy; OALegal
                </footer>

                <Snackbar
                    open={this.state.openAlert}
                    autoHideDuration={7000}
                    onClose={this.closeSnackbar}
                >
                    <Alert elevation={6} variant="filled" onClose={this.closeSnackbar} severity={this.state.alertType}>
                        {this.state.alertMessage}
                    </Alert>
                </Snackbar>


            </React.Fragment>
        )

    }

}

export default login;