import React,{useState} from "react";
import PhoneInput from 'react-phone-input-2'
import '../../assets/css/phone-input2-material.css'
import {Card, CardBody, Col, Container, Row} from "reactstrap";
import Loader from "../../Components/Loaders/Loader";
import {Button} from "@material-ui/core";
import {navigateTo} from "../routes/history";
import { StripeCardInput } from 'react-rainbow-components';

export default function Checkout(props){

    const [loading, setLoading] = useState(false);
    const [stripeCard, setStripeCard] = useState();

    return(
        <div>

            <Container>
                <Row className="justify-content-center">
                    <Col md={8} lg={6} xl={5}>
                        <Card style={{height:"100vh",width:"100%"}}>
                            <CardBody className="p-4 position-relative">
                                {loading && <Loader/>}

                                <div align="center" className="mb-2">
                                    <img style={{width:"40%",maxWidth:120, objectFit:"cover",marginTop:50}} src={require("../../assets/images/logos/cajoo.png")} alt=""/>
                                    <h5 style={{fontWeight:700,marginTop:40}}>Paiement sécurisé</h5>
                                    {/*<label style={{color:"gray"}}>Entrez votre numéro de téléphone</label>*/}
                                </div>

                                <div align="center" style={{marginTop:50}}>
                                    <StripeCardInput
                                        apiKey={"pk_test_DzPutapEGMVUdss4QraUUYyA"}
                                        label="Stripe Credit/Debit Card Information"
                                        onChange={setStripeCard}
                                        error={(stripeCard && stripeCard.error && stripeCard.error.message)}
                                    />
                                    <div align="center" style={{marginTop:40}}>
                                        <Button color="secondary" variant="contained"
                                                onClick={() => {

                                                }}
                                                style={{textTransform:"none",fontWeight:700,borderRadius:20,width:"70%",height:40}} >Payer 1500$</Button>
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