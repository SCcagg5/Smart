import React from "react";
import {Card, CardBody, Col, Container, Row} from "reactstrap";
import Loader from "../../Components/Loaders/Loader";
import {GoogleLogin} from 'react-google-login';
import {navigateTo} from "../routes/history";

export default function GoogleLog(props) {

    const [loading, setLoading] = React.useState(false);


    const responseGoogle = (response) => {
        var res = response.profileObj;
        localStorage.setItem("email",res.email)
        localStorage.setItem("fname",res.name)
        navigateTo("/home")
        window.location.reload()
    }

    return (
        <div>

            <React.Fragment>


                <div>
                    <Container>
                        <Row className="justify-content-center">
                            <Col md={8} lg={6} xl={5}>
                                <Card style={{height: "100vh", width: "100%"}}>
                                    <CardBody className="p-4 position-relative">
                                        {loading && <Loader/>}

                                        <div align="center" className="mb-2">
                                            <img
                                                style={{width: "70%", maxWidth: 150, objectFit: "cover", marginTop: 20}}
                                                src={require("../../assets/logos/la-casa-verde-logo.jpg")} alt=""/>
                                        </div>

                                        <div align="center" style={{marginTop: 120}}>

                                            <div style={{marginTop: 50}}>
                                                <GoogleLogin
                                                    theme="dark"
                                                    clientId="988445684866-rttn31785duhuqvj9b2c70kohdsrk9pg.apps.googleusercontent.com"
                                                    buttonText="Connectez-vous avec Google"
                                                    onSuccess={responseGoogle}
                                                    onFailure={responseGoogle}
                                                    onAutoLoadFinished={successLogin => {

                                                    }}
                                                    cookiePolicy="single_host_origin"
                                                />
                                            </div>
                                            <div style={{marginTop:30,cursor:"pointer"}}>
                                                <h6 style={{textDecoration:"underline"}}>Plus tard</h6>
                                            </div>

                                        </div>

                                    </CardBody>
                                </Card>
                            </Col>
                        </Row>
                    </Container>
                </div>
            </React.Fragment>

        </div>
    )

}
