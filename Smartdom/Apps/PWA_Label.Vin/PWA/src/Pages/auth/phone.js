import React from "react";
import PhoneInput from 'react-phone-input-2'
import '../../assets/css/phone-input2-material.css'
import {Card, CardBody, Col, Container, Row} from "reactstrap";
import Loader from "../../Components/Loaders/Loader";
import {Button} from "@material-ui/core";
import {navigateTo} from "../routes/history";


export default function Phone(props){

    const [loading, setLoading] = React.useState(false);
    const [phone, setPhone] = React.useState("");

    return(
        <div>

            <Container>
                <Row className="justify-content-center">
                    <Col md={8} lg={6} xl={5}>
                        <Card style={{height:"100vh",width:"100%"}}>
                            <CardBody className="p-4 position-relative">
                                {loading && <Loader/>}

                                <div align="center" className="mb-2">
                                    <img style={{width:"70%",maxWidth:150, objectFit:"cover",marginTop:20}} src={require("../../assets/logos/label.vin_logo.jpeg")} alt=""/>
                                    <h5 style={{fontWeight:700,marginTop:40}}>Gagnez du temps !</h5>
                                    <label style={{color:"gray"}}>Entrez votre numéro de téléphone</label>
                                </div>

                                <div align="center" style={{marginTop:50}}>
                                    <PhoneInput
                                        country={'fr'}
                                        value={phone}
                                        onChange={phone => {
                                            console.log(phone)
                                            setPhone(phone)
                                        }}
                                        specialLabel="Télephone"
                                        masks={{fr: '... ... ...',tn:'.. ... ...'}}
                                        countryCodeEditable={false}
                                    />
                                    <div align="center" style={{marginTop:40}}>
                                        <Button color="secondary" variant="contained" disabled={phone === ""}
                                                onClick={() => {
                                                    setLoading(true)
                                                    setTimeout(() => {
                                                        navigateTo("/verifCode/+" + phone)
                                                        window.location.reload()
                                                    },1500)
                                                }}
                                                style={{textTransform:"none",fontWeight:700,borderRadius:20,width:"70%",height:40}} >Commencer</Button>
                                    </div>
                                </div>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
            </Container>



        </div>
    )

}