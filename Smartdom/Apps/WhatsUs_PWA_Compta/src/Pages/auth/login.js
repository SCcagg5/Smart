import React, {Component} from "react";
import {Container, Row, Col, Card, CardBody, Label, FormGroup} from 'reactstrap';
import {AvForm, AvGroup, AvInput, AvFeedback} from 'availity-reactstrap-validation';
import Loader from '../../Components/Loaders/Loader';
import Snackbar from '@material-ui/core/Snackbar';
import SmartService from "../../provider/SmartService";
import Alert from '@material-ui/lab/Alert';


const ent_name = "WhatsUs";
const login_btn_color = "#f1556c"



class login extends Component {


    state = {
        logo:localStorage.getItem("logo"),
        loading: false,
        error: '',
        email: localStorage.getItem("email") || "",
        password: '',
        openAlert: false,
        alertMessage: '',
        alertType: '',
    };

    componentDidMount() {
        this.setState({logo:localStorage.getItem("logo")})
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

            SmartService.getToken().then( tokenRes => {
                if (tokenRes.succes === true && tokenRes.status === 200) {

                    SmartService.login({email:values.email.trim().toLowerCase(),password1:values.password},tokenRes.data.token).then( loginRes => {

                        if (loginRes.succes === true && loginRes.status === 200) {

                            SmartService.getUserInfo(tokenRes.data.token,loginRes.data.usrtoken).then(infoRes => {

                                if (infoRes.succes === true && infoRes.status === 200) {

                                    SmartService.getInfoGed(tokenRes.data.token,loginRes.data.usrtoken).then( infoGedRes => {
                                        if (infoGedRes.succes === true && infoGedRes.status === 200) {

                                            localStorage.setItem("token",tokenRes.data.token)
                                            localStorage.setItem("usrtoken",loginRes.data.usrtoken)
                                            localStorage.setItem("email",infoRes.data.email)
                                            localStorage.setItem("role",infoGedRes.data.self.role.role)
                                            //localStorage.setItem("role","admin")
                                            this.setState({loading:false})
                                            this.props.history.push('/rooms');

                                        }else{
                                            this.openSnackbar('error', infoGedRes.error);
                                            this.setState({loading: false})
                                        }
                                    }).catch(err => {
                                        this.openSnackbar('error', err);
                                        this.setState({loading: false})
                                    })

                                }
                                else{
                                    this.openSnackbar('error', infoRes.error);
                                    this.setState({loading: false})
                                }

                            }).catch( err => {
                                console.log(err)
                                this.openSnackbar('error', "Une erreur est survenue !");
                                this.setState({loading: false})
                            })

                        }else{
                            this.openSnackbar('error', loginRes.error);
                            this.setState({loading: false})
                        }
                    }).catch(err => {
                        console.log(err)
                        this.openSnackbar('error', "Une erreur est survenue !");
                        this.setState({loading: false})
                    })

                }else{
                    this.openSnackbar('error', tokenRes.error);
                    this.setState({loading: false})
                }

            }).catch(err => {
                this.openSnackbar('error', err);
                this.setState({loading: false})
                setTimeout(() => {
                    this.props.history.push("/error")
                },2000)
            })

    };




    render() {

        return (
            <React.Fragment>


                <div style={{justifyContent:"center",marginTop:30}}>
                    <Container>
                        <Row className="justify-content-center">
                            <Col md={8} lg={6} xl={5}>
                                <Card>
                                    <CardBody className="p-4 position-relative">
                                        { /* preloader */}
                                        {this.state.loading && <Loader/>}

                                        <div align="center" className="mb-2">
                                            <img style={{width:"70%",maxWidth:250, objectFit:"cover"}} src={this.state.logo} alt=""/>
                                        </div>

                                        <AvForm onValidSubmit={this.login}>

                                            <AvGroup className="mb-3 mt-5">
                                                <Label for="password">Email</Label>
                                                <AvInput type="email" name="email" id="email"
                                                         style={{height:45}}
                                                         placeholder="Entrer votre mail"
                                                         value={this.state.email} required/>
                                                <AvFeedback>Email invalide</AvFeedback>
                                            </AvGroup>

                                            <AvGroup className="mb-3">
                                                <Label for="password">Mot de passe</Label>
                                                <AvInput type="password" name="password" id="password"
                                                         placeholder="Entrer votre mot de passe"
                                                         style={{height:45}}
                                                         value={this.state.password} required/>
                                                <AvFeedback>Mot de passe incorrect</AvFeedback>
                                            </AvGroup>

                                            <FormGroup>
                                                <button className="btn-block btn" style={{backgroundColor:login_btn_color || "#c0c0c0",marginTop:65}}>Se connecter</button>
                                            </FormGroup>
                                            <div align="center">
                                            <span>Vous n'avez pas encore un compte ?
                                                <span style={{fontWeight:"bold",cursor:"pointer",color:"#000",textDecoration:"underline"}} onClick={() => this.props.history.push("/signup")}>
                                                    &nbsp;&nbsp;S'inscrire</span>
                                            </span>
                                            </div>
                                        </AvForm>
                                    </CardBody>
                                </Card>
                            </Col>
                        </Row>



                    </Container>
                </div>
                <footer className="footer footer-alt" style={{textTransform:"capitalize"}}>
                    2020 - 2021 &copy; {ent_name}
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