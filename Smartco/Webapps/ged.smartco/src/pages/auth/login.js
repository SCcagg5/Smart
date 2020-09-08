import React, {Component} from "react";
import {Container, Row, Col, Card, CardBody, Label, FormGroup} from 'reactstrap';
import {AvForm, AvGroup, AvInput, AvFeedback} from 'availity-reactstrap-validation';
import Loader from '../../components/Loaders/Loader';
import logo from "../../assets/images/logos/logo-OA.png"
import "firebase/auth";
import "firebase/database"
import Snackbar from '@material-ui/core/Snackbar';
import SmartService from "../../provider/SmartService";
import Alert from '@material-ui/lab/Alert';

class login extends Component {

    state = {

        loading: false,
        error: '',
        email: '',
        password: '',
        coupon: "",
        showCouponInput: false,

        openAlert: false,
        alertMessage: '',
        alertType: '',

        messageSended:"",
        messageResponse:""
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

            SmartService.getToken().then( tokenRes => {
                if (tokenRes.succes === true && tokenRes.status === 200) {

                    SmartService.login({email:values.email.trim().toLowerCase(),password1:values.password},tokenRes.data.token).then( loginRes => {

                        if (loginRes.succes === true && loginRes.status === 200) {

                            SmartService.getUserInfo(tokenRes.data.token,loginRes.data.usrtoken).then(infoRes => {

                                console.log(infoRes)
                                if (infoRes.succes === true && infoRes.status === 200) {

                                    localStorage.setItem("token",tokenRes.data.token)
                                    localStorage.setItem("usrtoken",loginRes.data.usrtoken)
                                    localStorage.setItem("email",infoRes.data.email)
                                    this.setState({loading:false})
                                    this.props.history.push('/drive/0');

                                }else{console.log(tokenRes)
                                    this.openSnackbar('error', infoRes.error);
                                    this.setState({loading: false})
                                }

                            }).catch( err => {
                                this.openSnackbar('error', err);
                                this.setState({loading: false})
                            })

                        }else{
                            this.openSnackbar('error', loginRes.error);
                            this.setState({loading: false})
                        }
                    }).catch(err => {
                        this.openSnackbar('error', err);
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


                <div style={{justifyContent:"center",marginTop:180}}>
                    <Container>
                        <Row className="justify-content-center">
                            <Col md={8} lg={6} xl={5}>
                                <Card>
                                    <CardBody className="p-4 position-relative">
                                        { /* preloader */}
                                        {this.state.loading && <Loader/>}

                                        <div className="text-center mt-4 mb-2">
                                            <img style={{width:350,objectFit:"contain"}} src={logo} alt=""/>
                                        </div>

                                        <AvForm onValidSubmit={this.login}>

                                            <AvGroup className="mb-3 mt-5">
                                                <Label for="password">Email</Label>
                                                <AvInput type="email" name="email" id="email"
                                                         style={{height:40}}
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

                                            {
                                                this.state.showCouponInput &&
                                                <AvGroup className="mb-3">
                                                    <Label for="password">Coupon d'accès</Label>
                                                    <AvInput type="text" name="coupon" id="email"
                                                             placeholder="Entrez votre coupon d'accès"
                                                             value={this.state.coupon} required/>
                                                    <AvFeedback>Champs obligatoire!</AvFeedback>
                                                </AvGroup>

                                            }


                                            <FormGroup>
                                                <button className="btn-block btn" style={{backgroundColor:"#A00015",marginTop:65}}>Se connecter</button>
                                            </FormGroup>
                                        </AvForm>
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
                    {/*<MySnackbarContentWrapper
                            onClose={this.closeSnackbar}
                            variant={this.state.alertType}
                            message={this.state.alertMessage}
                        />*/}
                </Snackbar>





            </React.Fragment>
        )

    }

}

export default login;