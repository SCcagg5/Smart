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

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export default class SignDoc extends React.Component {


    state = {
        loading: true,
        docBase64: "",
        docName:"",
        numPages: null,
        pages: [],
        closeBtn: false,
        xPosition: 0,
        yPosition: 0,
        openSignModal:false
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

    handleDrag = (e, ui) => {

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
                                    <Page key={key} pageNumber={item} className="custom_pdf_page" onMouseMove={e => {
                                        this.setState({
                                            xPosition: e.nativeEvent.offsetX,
                                            yPosition: e.nativeEvent.offsetY
                                        })
                                    }}>
                                        {
                                            item === 1 &&
                                            <Draggable bounds="parent" onDrag={this.handleDrag}
                                                       onStop={e => console.log(this.state.xPostion + " / " + this.state.yPostion)}>
                                                <div className="box"
                                                     onMouseEnter={event => this.setState({closeBtn: true})}
                                                     onMouseLeave={event => this.setState({closeBtn: false})}>
                                                    {
                                                        this.state.closeBtn === true &&
                                                        <CancelIcon fontSize="small" style={{
                                                            zIndex: 1500,
                                                            backgroundColor: "#fff",
                                                            color: "#000"
                                                        }}/>
                                                    }
                                                    <img draggable="false" alt=""
                                                         src={require('../../assets/images/signatureExp4.png')}
                                                         className="dragable_image"
                                                    />
                                                </div>
                                            </Draggable>
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
                    <DialogTitle id="alert-dialog-slide-title" style={{width:"90%"}}>{"Signer"}</DialogTitle>
                    <DialogContent>

                    </DialogContent>
                    <DialogActions>
                        <Button onClick={() => this.setState({openSignModal:false})} color="default" style={{textTransform:"Capitalize",fontWeight:"bold"}}>
                            Annuler
                        </Button>
                        <Button onClick={() => {
                        }}
                                color="secondary" style={{textTransform:"Capitalize",fontWeight:"bold"}} variant="contained">
                            Créer la signature
                        </Button>
                    </DialogActions>
                </Dialog>

            </div>
        )
    }

}