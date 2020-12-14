import React, {Component} from "react";
import {Container, Row, Col, Card, CardBody, Label, FormGroup} from 'reactstrap';
import {AvForm, AvGroup, AvInput, AvFeedback} from 'availity-reactstrap-validation';
import Loader from '../../components/Loaders/Loader';
import Snackbar from '@material-ui/core/Snackbar';
import SmartService from "../../provider/SmartService";
import Alert from '@material-ui/lab/Alert';

const ent_name = process.env.REACT_APP_ENT_NAME;
const login_btn_color = process.env.REACT_APP_LOGIN_BTN_COLOR;

export default class signup extends Component {

    state = {

        logo:localStorage.getItem("logo"),

        loading: false,
        error: '',
        email: '',
        password: '',
        rpassword:'',
        fname:'',
        lname:'',
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

    signup = (event, values) => {

        console.log(values)
        this.setState({
            loading: true,
        });

        SmartService.getToken().then( tokenRes => {
            console.log(tokenRes)
            if (tokenRes.succes === true && tokenRes.status === 200) {

                SmartService.register({email:values.email.trim(),password1:values.password,password2:values.rpassword},tokenRes.data.token).then( registerRes => {

                    if (registerRes.succes === true && registerRes.status === 200) {

                        if(values.fname !== "" || values.lname !== ""){
                            SmartService.updateUserInfo({email:values.email.trim(),firstname:values.fname.trim(),lastname:values.lname.trim()}).then(updateInfoRes => {

                                if (updateInfoRes.succes === true && updateInfoRes.status === 200) {
                                    this.openSnackbar("success","Votre inscription est effectuée avec succès")
                                    setTimeout(() => {
                                        this.props.history.push('/login');
                                    },1000);
                                }else{
                                    this.openSnackbar("error",updateInfoRes.error)
                                    this.setState({loading: false})
                                }

                            }).catch( err => {console.log(err)})
                        }else{
                            this.openSnackbar("success","Votre inscription est effectuée avec succès");
                            setTimeout(() => {
                                this.props.history.push('/login');
                            },1000);
                        }

                    }else{
                        this.openSnackbar("error",registerRes.error)
                        this.setState({loading: false})
                    }

                }).catch(err => {console.log(err)})

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


                <div style={{justifyContent:"center",marginTop:110}}>
                    <Container>
                        <Row className="justify-content-center">
                            <Col md={8} lg={6} xl={5}>
                                <Card>
                                    <CardBody className="p-4 position-relative">
                                        { /* preloader */}
                                        {this.state.loading && <Loader/>}

                                        <div align="center" className="mb-2">
                                            <img style={{width:250,objectFit:"cover"}} src={this.state.logo} alt=""/>
                                        </div>

                                        <AvForm onValidSubmit={this.signup}>

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

                                            <AvGroup className="mb-3">
                                                <Label for="password">Répéter votre mot de passe</Label>
                                                <AvInput type="password" name="rpassword" id="rpassword"
                                                         placeholder="Répéter votre mot de passe"
                                                         style={{height:45}}
                                                         validate={{ match: { value: 'password' } }}
                                                         value={this.state.rpassword} required />
                                                <AvFeedback>Les deux mot de passes ne sont pas identiques</AvFeedback>
                                            </AvGroup>

                                            <FormGroup>
                                                <button className="btn-block btn" style={{backgroundColor:login_btn_color || "#c0c0c0",marginTop:65}}>S'inscrire</button>
                                            </FormGroup>
                                            <div align="center">
                                                 <span>Vous êtes déjà inscrit ?
                                                <span style={{fontWeight:"bold",cursor:"pointer",color:"#000",textDecoration:"underline"}} onClick={() => this.props.history.push("/login")}>
                                                    &nbsp;&nbsp;Se connecter</span>
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
                    autoHideDuration={10000}
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