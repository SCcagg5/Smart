import React from "react";
import SmartService from "../../provider/SmartService";
import {Document, Page} from "react-pdf";
import Draggable from "react-draggable";
import CancelIcon from "@material-ui/icons/Cancel";
import MuiBackdrop from "../../components/Loading/MuiBackdrop";
import SignTopBar from "../../components/TopBar/SignTopBar";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import Slide from "@material-ui/core/Slide";
import {Tab, TabList, TabPanel, Tabs} from "react-tabs";
import SignatureCanvas from 'react-signature-canvas'
import IconButton from "@material-ui/core/IconButton";
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import { CirclePicker } from 'react-color';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export default class SignDoc extends React.Component {

    sigCanvas={}

    state = {
        loading: true,
        docBase64: "",
        docName:"",
        numPages: null,
        pages: [],
        closeBtn: false,
        xPosition: 0,
        yPosition: 0,
        openSignModal:false,
        penColor:"#000",
        signatureCanvas:"",
        signatures:[]
    }


    componentDidMount() {
        SmartService.getFile(this.props.match.params.doc_id, localStorage.getItem("token"), localStorage.getItem("usrtoken")).then(fileRes => {
            if (fileRes.succes === true && fileRes.status === 200) {
                console.log(fileRes)
                this.setState({docBase64: fileRes.data.Content.Data,docName:fileRes.data.name+".pdf", loading: false})
            } else {

            }
        }).catch(err => {

        })
    }

    onDocumentLoadSuccess = ({numPages}) => {
        let pages = [];
        for (let i = 0; i < numPages; i++) {
            pages.push(i + 1)
        }
        this.setState({numPages: numPages, pages: pages})
    }




    render() {
        return (
            <div>
                <MuiBackdrop open={this.state.loading}/>
                <SignTopBar height={70} title={this.state.docName}
                            onBackBtnClick={() => this.props.history.goBack()}
                            showSignModal={() => {
                                this.setState({openSignModal:true})
                            }}
                            signatures={this.state.signatures}
                />
                <div align="center" style={{backgroundColor: "#f0f0f0", display: "grid", marginTop: 50}}>
                    {
                        this.state.loading === false &&
                        <Document
                            file={"data:application/pdf;base64,"+this.state.docBase64}
                            onLoadSuccess={this.onDocumentLoadSuccess}
                        >
                            {
                                this.state.pages.map((item, key) =>
                                    <Page key={key} pageNumber={item} className="custom_pdf_page" >
                                        {
                                            item === 1 &&
                                                this.state.signatures.map((item,key) =>
                                                    <Draggable bounds="parent" key={key}
                                                    >
                                                        <div className="box"
                                                             onMouseEnter={event => this.setState({closeBtn: true})}
                                                             onMouseLeave={event => this.setState({closeBtn: false})}>
                                                            {
                                                                this.state.closeBtn === true &&
                                                                <IconButton style={{position:"absolute",top:-20,left:-10}}>
                                                                    <DeleteOutlineIcon fontSize="default" style={{
                                                                        zIndex: 1500,
                                                                        backgroundColor: "#f0f0f0",
                                                                        color: "red"
                                                                    }}/>
                                                                </IconButton>

                                                            }
                                                            <img draggable="false" alt=""
                                                                 src={item}
                                                                 className={this.state.closeBtn === true ? "dragable_image selectedImage" : "dragable_image"}
                                                            />
                                                        </div>
                                                    </Draggable>
                                                )

                                        }
                                    </Page>
                                )
                            }


                        </Document>
                    }

                </div>

                <Dialog
                    open={this.state.openSignModal}
                    TransitionComponent={Transition}
                    keepMounted
                    onClose={() => this.setState({openSignModal:false})}
                    aria-labelledby="alert-dialog-slide-title"
                    aria-describedby="alert-dialog-slide-description"
                >
                    <DialogTitle id="alert-dialog-slide-title" style={{width:"90%"}}>{"Créer une signature"}</DialogTitle>
                    <DialogContent>
                        <div style={{marginTop:15}}>
                            <Tabs>
                                <TabList>
                                    <Tab>Dessiner</Tab>
                                    <Tab>Télécharger une image</Tab>
                                    <Tab>Taper</Tab>
                                </TabList>

                                <TabPanel>
                                    <div align="center" style={{marginTop:15}}>
                                        <CirclePicker onChange={(color,event) => {
                                            this.setState({penColor:color.hex})
                                        }}  colors={["#000000","#525252","#969696","#0d47a1","#1976d2","#01579b"]}
                                        />
                                        <h5 style={{color:"#c0c0c0"}}>Signez votre nom en utilisant la souris ou le pavé tactile.</h5>
                                        <div style={{marginTop:15}}>
                                            <div style={{width:500,height:300,border: '1px solid #c0c0c0'}}>
                                                <SignatureCanvas ref={(ref) => {
                                                    this.sigCanvas = ref
                                                }} penColor={this.state.penColor} canvasProps={{width: 500, height: 300, className: 'sigCanvas'}}/>
                                                <div style={{position:"absolute",top:208,right:30}}>
                                                    <IconButton color="default" onClick={() => {this.sigCanvas.clear()}}>
                                                        <HighlightOffIcon/>
                                                    </IconButton>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </TabPanel>
                                <TabPanel>
                                </TabPanel>
                                <TabPanel>
                                </TabPanel>
                            </Tabs>
                        </div>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={() => this.setState({openSignModal:false})} color="default" style={{textTransform:"Capitalize",fontWeight:"bold"}}>
                            Annuler
                        </Button>
                        <Button onClick={() => {
                            let signatures = this.state.signatures;
                            signatures.push(this.sigCanvas.getTrimmedCanvas().toDataURL('image/png'))
                            this.setState({openSignModal:false,closeBtn:true,signatures:signatures,
                                signatureCanvas:this.sigCanvas.getTrimmedCanvas().toDataURL('image/png')})
                        }}
                                style={{textTransform:"Capitalize",fontWeight:"bold",color:"#fff",backgroundColor:"#1ABC9C"}} variant="contained">
                            Créer la signature
                        </Button>
                    </DialogActions>
                </Dialog>

            </div>
        )
    }

}