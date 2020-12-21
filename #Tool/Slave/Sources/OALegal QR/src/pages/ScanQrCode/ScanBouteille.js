import React, {Component} from 'react';
import logo from "../../assets/images/logos/OALegalLogoV2.jpeg"
import Button from '@material-ui/core/Button';
import SaveIcon from '@material-ui/icons/Save';
import QrReader from "react-camera-qr";
import "./scanner.css"
import SmartService from "../../provider/SmartService"
import { Player } from 'video-react';
import  video from "../../assets/videos/oalegal.mp4"
import moment from "moment"
import {  Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';


class ScanBouteille extends Component {
    constructor(props) {
        super(props);
        this.state={
            showButton:true,
            scan:false,
            BienScanner:false,
            showModal:false,
            titleModal:"",
            textModal:""
        }
        this.toggle= this.toggle.bind(this)

    }
    timestamptodate(date){
        console.log("date:"+ date)
        let fulldate = new Date(parseInt(date));
        let converted_date = moment(fulldate).format("DD.MM.yyyy");

        return converted_date

    }
    componentDidMount() {
        navigator.mediaDevices.getUserMedia({
            video: {
                width: {
                    min: 1280,
                    ideal: 1920,
                    max: 2560,
                },
                height: {
                    min: 720,
                    ideal: 1080,
                    max: 1440
                },
                facingMode: 'environment'
            }
        })

        SmartService.getToken().then((res)=>{
            let token = res.data.token
            SmartService.getBouteilleCadeaux(token,"1WER").then((ress)=>{
                console.log(ress.data)
                if(ress.status===200){
                    this.setState({dataBouteille:ress.data,BienScanner:true,showButton:false,scan:false})

                }
            })
        })


    }
    handleScan = data => {
        if (data) {
            SmartService.getToken().then((res)=>{
                let token = res.data.token
                SmartService.getBouteilleCadeaux(token,data).then((ress)=>{

                    console.log(ress.data)
                    if(ress.status===200){
                        this.setState({dataBouteille:ress.data,BienScanner:true,showButton:false,scan:false})

                    }
                })
            })
        }
    }
    handleError = err => {
        console.error(err)
    }

    toggle(){
        this.setState({showModal:!this.state.showModal})
    }
    openModal(title,text){
        this.setState({titleModal:title,textModal:text,showModal:true})
    }


    render() {
        return (
            <div className="pb-5">


                <Modal isOpen={this.state.showModal} toggle={this.toggle}>
                    <ModalHeader toggle={this.toggle}>{this.state.titleModal}</ModalHeader>
                    <ModalBody>
                        {this.state.textModal}
                    </ModalBody>
                    <ModalFooter>

                        <Button color="secondary" onClick={this.toggle}>exit</Button>
                    </ModalFooter>
                </Modal>
                <nav className="navbar navbar-light  justify-content-center" style={{backgroundColor:"#F6F6F6"}}>
                   <div className="col-md-1 col-4 text-center">
                    <img src={logo} style={{width:"90%"}}/>
                   </div>
                </nav>

                <div className="container text-center mt-2 p-2  " style={{height:"500px"}}>


                    <div className="mt-auto text-center  ml-auto mr-auto">
                        {this.state.scan === true &&
                            <div className="scanner ml-auto mr-auto">
                        <QrReader

                            className="ml-auto mr-auto"

                            facingMode={"environment"}

                            delay={300}
                            onError={this.handleError}
                            onScan={this.handleScan}
                            style={{width: "100%", height: "100%"}}
                            ref={(stream) => {
                                this.videoStream = stream
                            }}

                        />
                            </div>

                        }
                        {this.state.showButton ===true&&

                            <div className="mt-5" >
                            <Button

                                onClick={()=>{this.setState({scan:true,showButton:false})}}

                                style={{backgroundColor:"#7B2528",color: "white"}}
                                letiant="contained"
                                size="large"
                                startIcon={<SaveIcon />}
                            >
                                Scanner votre QrCode
                            </Button>
                            </div>


                        }
                        {
                            this.state.BienScanner===true &&


                                <div className="text-center">

                                    <div>
                                        <h3 style={{color:"#7B2528"}}>
                                           Cher , {this.state.dataBouteille.name + " "+this.state.dataBouteille.surname}

                                        </h3>
                                    </div>
                                    <div>
                                    <h3 style={{color:"#7B2528"}}>
                                        OA Legal vous adresse ses voeux les meilleurs pour 2021

                                    </h3>
                                    </div>

                               <div className="col-md-5   ml-auto mr-auto mt-4">

                                   <div className="row justify-content-between">


                                        <div className="col-md-6 col-6 textCenter text-left">
                                            <h4 style={{color:"#7B2528"}}> Offert par {this.state.dataBouteille.offerd_by.CN}
                                            </h4>

                                        </div>


                                        <div className="col-md-6 col-6  text-right ">
                                            <h4 style={{color:"#7B2528"}}> {this.timestamptodate(this.state.dataBouteille.date)}  </h4>
                                        </div>





                                   </div>





                                        <div className="col-md-12 col-12 text-center mt-5">
                                            <h3 style={{color:"#7B2528"}}>   {this.state.dataBouteille.asset.name} </h3>

                                        </div>


                                   <div className="col-md-12 col-12 text-center mt-5">
                                       <h3 style={{color:"#7B2528"}}>Votre cadeau sur la blockchain</h3>
                                   </div>



                                    <div className="row justify-content-between mt-3 ">

                                        <div className="col-md-6 col-4  ">
                                            <h4 onClick={()=>{this.openModal("Contract" ,this.state.dataBouteille.eth.contract )}}  onMouseEnter={()=>{this.openModal("Contract" ,this.state.dataBouteille.eth.contract )

                                            }} style={{color:"#7B2528"}}> Contract : <text style={{fontSize:10}}>{this.state.dataBouteille.eth.contract.substring(0,29)}</text>   </h4>
                                        </div>

                                      <div className="col-md-6 col-4">

                                          <h4 onClick={()=>{this.openModal("Token ID" ,this.state.dataBouteille.eth.token_id[0])}}  onMouseEnter={()=>{this.openModal("Token ID" ,this.state.dataBouteille.eth.token_id[0] )

                                          }}  style={{color:"#7B2528"}}> Token ID : <text style={{fontSize:8}}>{this.state.dataBouteille.eth.token_id[0].substring(0,29)}</text> </h4>


                                      </div>



                                    </div>

                                   <div className="text-center mt-4">
                                       <h4 style={{color:"#7B2528"}}>
                                           Votre bouteille est un actif numérique inscrit dans la blockchain. Regardez la vidéo pour en savoir plus !
                                       </h4>

                                   </div>



                               </div>

                                    <div className="col-md-8 col-12 mt-3 pb-4 ml-auto mr-auto">
                                        <Player
                                            playsInline
                                            poster={logo}
                                            src={video}
                                            autoPlay={true}
                                        />

                                    </div>



                                </div>
                        }


                    </div>



                </div>

            </div>
        );
    }
}

export default ScanBouteille;
