import React,{useRef,useEffect} from "react";
import { CodeInput } from 'react-rainbow-components';
import {Card, CardBody, Col, Container, Row} from "reactstrap";
import Loader from "../../Components/Loaders/Loader";
import {navigateTo} from "../routes/history";
import smsService from "../../provider/smsService";
import { useSnackbar } from 'notistack';


export default function VerifCode(props){

    const { enqueueSnackbar } = useSnackbar();
    const codeInputRef = useRef();

    const [loading, setLoading] = React.useState(false);
    const [phone, setPhone] = React.useState(props.match.params.phone);
    const [code, setCode] = React.useState();
    const [sendedCode, setSendedCode] = React.useState();

    useEffect(() => {
        setLoading(true)
        setTimeout(() => {
            codeInputRef.current.focus();
            setTimeout(() => {
                verifCode()
            },1000)
        },500)

    }, []);

    const verifCode = () => {
        let code = Math.floor(1000 + Math.random() * 9000);
        let phone = props.match.params.phone;

        smsService.send_verif_code({code:code,phone:phone}).then( sendRes => {
            if(sendRes && sendRes.data.ids[0]){
                setLoading(false)
                setSendedCode(code)
            }else{
                enqueueSnackbar('Une erreur est survenue !', { variant:"error" })
            }
        }).catch(err => {
            console.log(err)
            enqueueSnackbar('Une erreur est survenue !', { variant:"error" })
        })
    }

    return(
        <div>

            <Container>
                <Row className="justify-content-center">
                    <Col md={8} lg={6} xl={5}>
                        <Card style={{height:"100vh",position:"fixed",width:"100%"}}>
                            <CardBody className="p-4 position-relative">
                                {loading && <Loader/>}

                                <div align="center" className="mb-2">
                                    <img style={{width:"70%",maxWidth:150, objectFit:"cover",marginTop:20}} src={require("../../assets/logos/la-casa-verde-logo.jpg")} alt=""/>
                                    <h5 style={{fontWeight:700,marginTop:40}}>Confirmez votre numéro</h5>
                                    <label style={{color:"gray"}}>Entrez le code envoyé au {phone}</label>
                                </div>

                                <div style={{marginTop:50}}>
                                    <CodeInput
                                        id="codeinput-1"
                                        value={code}
                                        //label=""
                                        onChange={(code) => {
                                            setCode(code)
                                            if(code.length === 4){
                                                setLoading(true)
                                                setTimeout(() => {
                                                    if(code === sendedCode.toString()){
                                                        localStorage.setItem("phone",phone)
                                                        navigateTo("/home/categories")
                                                        window.location.reload()
                                                    }else{
                                                        setLoading(false)
                                                        enqueueSnackbar('Votre code est incorrect', { variant:"error" })
                                                    }

                                                },1500)
                                            }
                                        }}
                                        ref={codeInputRef}
                                    />
                                    <div align="center" style={{marginTop:40}}>
                                        <label>Code non reçu ? <a style={{cursor:"pointer",textDecoration:"underline",color:"blue"}}>Renvoyer</a></label>
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
