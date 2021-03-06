import React from "react";
import SmartService from "../../provider/SmartService";
import {Document, Page} from "react-pdf";
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
import {CirclePicker} from 'react-color';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import {Rnd} from 'react-rnd';
import {scroller} from "react-scroll";
import domtoimage from 'dom-to-image';
import FormControlLabel from "@material-ui/core/FormControlLabel";
import {Checkbox as MuiCheckbox, Typography} from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import CheckBoxOutlineBlankIcon from "@material-ui/icons/CheckBoxOutlineBlank";
import CheckBoxIcon from "@material-ui/icons/CheckBox";

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const pageWidth = 590;
const pageHeight = 850;

const icon = <CheckBoxOutlineBlankIcon fontSize="small"/>;
const checkedIcon = <CheckBoxIcon fontSize="small"/>;

export default class SignDocV3 extends React.Component {

    sigCanvas = {}

    state = {
        firstLoading: true,
        loading: false,
        docBase64: "",
        docName: "",
        numPages: null,
        pages: [],
        closeBtn: false,
        xPosition: 0,
        yPosition: 0,
        openSignModal: false,
        penColor: "#000",
        signatureCanvas: "",
        signatures: [],
        savedSignatures: [],
        selectedPage: 1,
        signatureText: "Exemple",
        selectedSignTextId:"signText1",
        mainTabIndex:0,
        parapheTabIndex: 0,
        signatureTabIndex: 0,
        paraphePositions: "tousSauf",
        parapheCustomPages:[],

        width: 150,
        height: 70,
        x: 295,
        y: 425
    }


    componentDidMount() {
        if (localStorage.getItem('email') === undefined || localStorage.getItem('email') === null) {
            this.props.history.push('/login')
        } else {
            SmartService.getFile(this.props.match.params.doc_id, localStorage.getItem("token"), localStorage.getItem("usrtoken")).then(fileRes => {
                if (fileRes.succes === true && fileRes.status === 200) {
                    this.setState({
                        docBase64: fileRes.data.Content.Data,
                        docName: fileRes.data.name + ".pdf",
                        firstLoading: false
                    })
                } else {

                }
            }).catch(err => {

            })
        }

    }

    onDocumentLoadSuccess = ({numPages}) => {
        let pages = [];
        let pagesStrings = [];
        for (let i = 0; i < numPages; i++) {
            pages.push(i + 1)
            pagesStrings.push("Page "+(i+1))
        }
        this.setState({numPages: numPages, pages: pages,pagesStrings:pagesStrings})
    }

    /*convetHtmlToBase64 = (divId) => {
        htmlToImage.toPng(document.getElementById(divId))
            .then((dataUrl) => {
                return (dataUrl)
            })
    }*/


    render() {
        return (
            <div>
                <MuiBackdrop open={this.state.loading}/>
                <MuiBackdrop open={this.state.firstLoading}/>
                <SignTopBar height={70} title={this.state.docName}
                            onBackBtnClick={() => this.props.history.goBack()}
                            showSignModal={() => {
                                this.setState({openSignModal: true})
                            }}
                            savedSignatures={this.state.savedSignatures}
                            onClickSignature={(signature) => {
                                signature.page = parseInt(this.state.selectedPage);
                                let signatures = this.state.signatures;
                                signatures.push(signature)
                                this.setState({signatures: signatures})
                            }}
                            onClickDelete={(id) => {
                                let savedSignatures = this.state.savedSignatures;
                                savedSignatures.splice(id,1);
                                this.setState({savedSignatures:savedSignatures})
                            }}
                />
                <div style={{position: "fixed", bottom: 20, left: 30, zIndex: 1600}}>
                    <select className="form-control custom-select" value={this.state.selectedPage}
                            onChange={(e) => {
                                this.setState({selectedPage: e.target.value})
                                scroller.scrollTo('page_' + e.target.value, {
                                    duration: 1000,
                                    delay: 0,
                                    smooth: 'easeInOutQuart',
                                    offset: -80
                                })
                            }}
                    >
                        {
                            this.state.pages.map((item, key) =>
                                <option key={key} label={"Page " + item} value={item}/>
                            )
                        }
                    </select>
                </div>
                <div align="center" style={{backgroundColor: "#f0f0f0", display: "grid", marginTop: 65,height:1000}}>
                    {
                        this.state.firstLoading === false &&
                        <Document
                            file={"data:application/pdf;base64," + this.state.docBase64}
                            onLoadSuccess={this.onDocumentLoadSuccess}
                        >
                            <Page key={parseInt(this.state.selectedPage)} pageNumber={parseInt(this.state.selectedPage)} className="custom_pdf_page">
                                {
                                    this.state.signatures.map((sign, id) =>
                                        sign.page === parseInt(this.state.selectedPage) &&
                                        <Rnd key={id}
                                             position={{x:sign.x,y:sign.y}}
                                             /*default={{
                                                 x: sign.right,
                                                 y: sign.bottom
                                             }}*/
                                             minWidth={50}
                                             minHeight={25}
                                             bounds="parent"
                                             style={{zIndex: 1050}}
                                             size={{width: sign.width, height: sign.height}}
                                            /*position={{ x: this.state.x, y: this.state.y }}*/
                                             onDragStop={(e, d) => {

                                                 let signatures = this.state.signatures;
                                                 signatures[id].x = d.x;
                                                 signatures[id].y = d.y;
                                                 signatures[id].right = pageWidth - (d.x + signatures[id].width)
                                                 signatures[id].bottom = pageHeight - (d.y + signatures[id].height)
                                                 this.setState({signatures: signatures})
                                             }}
                                             onResizeStop={(e, direction, ref, delta, position) => {
                                                 let signatures = this.state.signatures;
                                                 signatures[id].width = parseInt(ref.style.width.slice(0, -2));
                                                 signatures[id].height = parseInt(ref.style.height.slice(0, -2));
                                             }}

                                        >
                                            <div style={{width: sign.width, height: sign.height}}
                                                 onMouseEnter={event => this.setState({closeBtn: true})}
                                                 onMouseLeave={event => this.setState({closeBtn: false})}>
                                                {
                                                    this.state.closeBtn === true &&
                                                    <IconButton style={{position: "absolute", top: -20, left: -10}}
                                                                onClick={() => {
                                                                    let signatures = this.state.signatures;
                                                                    signatures.splice(id, 1);
                                                                    this.setState({signatures: signatures})

                                                                }}>
                                                        <DeleteOutlineIcon fontSize="default" style={{
                                                            zIndex: 1500,
                                                            backgroundColor: "#f0f0f0",
                                                            color: "red"
                                                        }}/>
                                                    </IconButton>

                                                }
                                                <img draggable="false" alt=""
                                                     src={sign.data}
                                                     style={{
                                                         width: sign.width,
                                                         height: sign.height,
                                                         border: this.state.closeBtn === true ? "2px dashed #089de3" : "none",
                                                         objectFit: "contain"
                                                     }}
                                                />
                                            </div>
                                        </Rnd>
                                    )
                                }
                            </Page>

                            <div className="pdf_pges_controls">
                                <button onClick={() => {
                                    if(parseInt(this.state.selectedPage) > 1){
                                        let pageNumber = parseInt(this.state.selectedPage);
                                        pageNumber = pageNumber - 1 ;
                                        this.setState({selectedPage:pageNumber.toString()})
                                    }
                                }} >‹</button>
                                <span>{this.state.selectedPage} de {this.state.numPages}</span>
                                <button onClick={() => {
                                    if(parseInt(this.state.selectedPage) < this.state.pages.length){
                                        let pageNumber = parseInt(this.state.selectedPage);
                                        pageNumber = pageNumber + 1 ;
                                        this.setState({selectedPage:pageNumber.toString()})
                                    }
                                }}>›</button>

                            </div>

                        </Document>
                    }

                </div>

                <Dialog
                    open={this.state.openSignModal}
                    TransitionComponent={Transition}
                    keepMounted
                    onClose={() => this.setState({openSignModal: false})}
                    aria-labelledby="alert-dialog-slide-title"
                    aria-describedby="alert-dialog-slide-description"
                    maxWidth="sm"
                >
                    <DialogTitle id="alert-dialog-slide-title" style={{width: "90%"}}>{"Ajouter Votre Signature / Paraphe"}</DialogTitle>
                    <DialogContent style={{minWidth:550,minHeight:520}}>
                        <div style={{marginTop: 15}}>
                            <Tabs selectedIndex={this.state.mainTabIndex} onSelect={tabIndex => {
                                this.setState({mainTabIndex:tabIndex})
                            }}>
                                <TabList>
                                    <Tab>Créer une signature</Tab>
                                    <Tab>Créer un paraphe</Tab>
                                </TabList>
                                {/*Signature*/}
                                <TabPanel>
                                    <Tabs selectedIndex={this.state.signatureTabIndex} onSelect={tabIndex => {
                                        this.setState({signatureTabIndex:tabIndex})
                                    }}>
                                        <TabList className="paraphe_tab_list">
                                            <Tab>Dessiner</Tab>
                                            <Tab>Taper</Tab>
                                            <Tab>Télécharger une image</Tab>
                                        </TabList>

                                        <TabPanel>
                                            <div align="center" style={{marginTop: 15}}>
                                                <CirclePicker onChange={(color, event) => {
                                                    this.setState({penColor: color.hex})
                                                }} colors={["#000000", "#525252", "#969696", "#0d47a1", "#1976d2", "#01579b"]}
                                                />
                                                <h5 style={{color: "#c0c0c0"}}>Signez votre nom en utilisant la souris ou le
                                                    pavé tactile.</h5>
                                                <div style={{marginTop: 15}}>
                                                    <div style={{width: 500, height: 300, border: '1px solid #c0c0c0'}}>
                                                        <SignatureCanvas ref={(ref) => {
                                                            this.sigCanvas = ref
                                                        }} penColor={this.state.penColor} canvasProps={{
                                                            width: 500,
                                                            height: 300,
                                                            className: 'sigCanvas'
                                                        }}/>
                                                        <div style={{position: "absolute", top: 257, right: 30}}>
                                                            <IconButton color="default" onClick={() => {
                                                                this.sigCanvas.clear()
                                                            }}>
                                                                <HighlightOffIcon/>
                                                            </IconButton>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </TabPanel>

                                        <TabPanel>
                                            <div style={{marginTop: 25}}>
                                                <div align="center">
                                                    <input type="text" className="form-control" style={{height: 40}}
                                                           onChange={event => this.setState({signatureText: event.target.value})}
                                                           value={this.state.signatureText}
                                                    />
                                                    <div style={{marginTop: 20}}>
                                                        <CirclePicker onChange={(color, event) => {
                                                            this.setState({penColor: color.hex})
                                                        }}
                                                                      colors={["#000000", "#525252", "#969696", "#0d47a1", "#1976d2", "#01579b"]}
                                                        />
                                                    </div>
                                                    <div style={{marginTop: 25}}>
                                                        {
                                                            ['1', '2', '3', '4', '5', '6', '7'].map((item, key) =>
                                                                <div key={key} id={"signText" + item}
                                                                     style={{
                                                                         color: this.state.penColor, fontSize: 30,
                                                                         backgroundColor: this.state.selectedSignTextId === "signText" + item ? "#eff8fc" : ""
                                                                     }}
                                                                     onClick={() => this.setState({selectedSignTextId: "signText" + item})}
                                                                     className={"signText signTextFont" + item}
                                                                >
                                                                    {this.state.signatureText}
                                                                </div>
                                                            )
                                                        }
                                                    </div>
                                                </div>
                                            </div>
                                        </TabPanel>
                                        <TabPanel>
                                        </TabPanel>
                                    </Tabs>
                                </TabPanel>
                                {/*Paraphe*/}
                                <TabPanel>

                                    <Tabs selectedIndex={this.state.parapheTabIndex} onSelect={tabIndex => {
                                        this.setState({parapheTabIndex:tabIndex})
                                    }}>
                                        <TabList className="paraphe_tab_list">
                                            <Tab>Dessiner</Tab>
                                            <Tab>Taper</Tab>
                                            <Tab>Télécharger une image</Tab>
                                        </TabList>

                                        <TabPanel>
                                            <div align="center" style={{marginTop: 15}}>
                                                <CirclePicker onChange={(color, event) => {
                                                    this.setState({penColor: color.hex})
                                                }} colors={["#000000", "#525252", "#969696", "#0d47a1", "#1976d2", "#01579b"]}
                                                />
                                                <h5 style={{color: "#c0c0c0"}}>Signez votre nom en utilisant la souris ou le
                                                    pavé tactile.</h5>
                                                <div style={{marginTop: 15}}>
                                                    <div style={{width: 400, height: 200, border: '1px solid #c0c0c0'}}>
                                                        <SignatureCanvas ref={(ref) => {
                                                            this.sigCanvas = ref
                                                        }} penColor={this.state.penColor} canvasProps={{
                                                            width: 400,
                                                            height: 200,
                                                            className: 'sigCanvas'
                                                        }}/>
                                                        <div style={{position: "absolute", top: 258, right: 95}}>
                                                            <IconButton color="default" onClick={() => {
                                                                this.sigCanvas.clear()
                                                            }}>
                                                                <HighlightOffIcon/>
                                                            </IconButton>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </TabPanel>

                                        <TabPanel>
                                            <div style={{marginTop: 25}}>
                                                <div align="center">
                                                    <input type="text" className="form-control" style={{height: 40}}
                                                           onChange={event => this.setState({signatureText: event.target.value})}
                                                           value={this.state.signatureText}
                                                    />
                                                    <div style={{marginTop: 20}}>
                                                        <CirclePicker onChange={(color, event) => {
                                                            this.setState({penColor: color.hex})
                                                        }}
                                                                      colors={["#000000", "#525252", "#969696", "#0d47a1", "#1976d2", "#01579b"]}
                                                        />
                                                    </div>
                                                    <div style={{marginTop: 25}}>
                                                        {
                                                            ['1', '2', '3', '4', '5', '6', '7'].map((item, key) =>
                                                                <div key={key} id={"signText" + item}
                                                                     style={{
                                                                         color: this.state.penColor, fontSize: 30,
                                                                         backgroundColor: this.state.selectedSignTextId === "signText" + item ? "#eff8fc" : ""
                                                                     }}
                                                                     onClick={() => this.setState({selectedSignTextId: "signText" + item})}
                                                                     className={"signText signTextFont" + item}
                                                                >
                                                                    {this.state.signatureText}
                                                                </div>
                                                            )
                                                        }
                                                    </div>
                                                </div>
                                            </div>
                                        </TabPanel>
                                        <TabPanel>
                                        </TabPanel>
                                    </Tabs>
                                    <div style={{marginTop: 20,marginLeft:20}}>
                                        <FormControlLabel
                                            control={<MuiCheckbox checked={this.state.paraphePositions === "tousSauf"} size="small"
                                                                  onChange={() => this.setState({paraphePositions: "tousSauf"})}
                                                                  name="place1"
                                            />}
                                            label={<Typography variant="h6" style={{fontSize:"0.875rem"}}>Placer le paraphe dans tous les pages sauf la dernière</Typography>}
                                        />
                                        <FormControlLabel
                                            control={<MuiCheckbox checked={this.state.paraphePositions === "tous"} size="small"
                                                                  onChange={() => this.setState({paraphePositions: "tous"})}
                                                                  name="place2"
                                            />}
                                            label={<Typography variant="h6" style={{fontSize:"0.875rem"}}>Placer le paraphe dans tous les pages</Typography>}
                                        />
                                        <FormControlLabel
                                            control={<MuiCheckbox checked={this.state.paraphePositions === "custom"} size="small"
                                                                  onChange={() => this.setState({paraphePositions: "custom"})}
                                                                  name="place3"
                                            />}
                                            label={<Typography variant="h6" style={{fontSize:"0.875rem"}}>Sélectionner les pages où vous souhaitez placer le paraphe</Typography>}
                                        />
                                        {
                                            this.state.paraphePositions === "custom" &&
                                            <Autocomplete
                                                onChange={(event, value) => {
                                                    this.setState({parapheCustomPages:value})
                                                }}
                                                title={"paraphePages"}
                                                multiple
                                                id="checkboxes-tags-paraphe-pages"
                                                options={this.state.pagesStrings || []}
                                                disableCloseOnSelect
                                                getOptionLabel={(option) => option}
                                                renderOption={(option, {selected}) => (
                                                    <React.Fragment>
                                                        <MuiCheckbox
                                                            icon={icon}
                                                            checkedIcon={checkedIcon}
                                                            style={{marginRight: 8}}
                                                            checked={selected}
                                                        />
                                                        {option}
                                                    </React.Fragment>
                                                )}
                                                style={{width: 500, marginLeft: 10, borderColor: "#f0f0f0"}}
                                                renderInput={(params) => (
                                                    <TextField {...params} variant="outlined" placeholder=""/>
                                                )}
                                            />
                                        }
                                    </div>

                                </TabPanel>

                            </Tabs>



                        </div>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={() => this.setState({openSignModal: false})} color="default"
                                style={{textTransform: "Capitalize", fontWeight: "bold"}}>
                            Annuler
                        </Button>
                        <Button onClick={() => {
                            this.setState({loading: true, openSignModal: false})
                            if(this.state.mainTabIndex === 0){

                                if (this.state.signatureTabIndex === 0) {
                                    let signatures = this.state.signatures;
                                    let savedSignatures = this.state.savedSignatures;
                                    signatures.push({
                                        data: this.sigCanvas.getTrimmedCanvas().toDataURL('image/png'),
                                        page: parseInt(this.state.selectedPage),
                                        width: 150, height: 70, right: 250, bottom: 400,
                                        x:250,y:400
                                    })
                                    savedSignatures.push({
                                        data: this.sigCanvas.getTrimmedCanvas().toDataURL('image/png'),
                                        width: 150, height: 70, right: 250, bottom: 400,
                                        x:250,y:400
                                    })
                                    this.setState({
                                        openSignModal: false,
                                        closeBtn: true,
                                        signatures: signatures,
                                        savedSignatures: savedSignatures,
                                        loading: false
                                    })
                                }
                                else if (this.state.signatureTabIndex === 1) {
                                    domtoimage.toPng(document.getElementById(this.state.selectedSignTextId),
                                        {bgcolor: "transparent", quality: 1, width: 150, height: 70})
                                        .then((dataUrl) => {
                                            let signatures = this.state.signatures;
                                            let savedSignatures = this.state.savedSignatures;
                                            signatures.push({
                                                data: dataUrl,
                                                page: parseInt(this.state.selectedPage),
                                                width: 150, height: 70, right: 250, bottom: 400,
                                                x:250,y:400
                                            })
                                            savedSignatures.push({
                                                data: dataUrl,
                                                width: 150, height: 70, right: 250, bottom: 400,
                                                x:250,y:400
                                            })
                                            this.setState({
                                                openSignModal: false,
                                                closeBtn: true,
                                                signatures: signatures,
                                                savedSignatures: savedSignatures,
                                                loading: false
                                            })
                                        })
                                }
                                else {}

                            }
                            else if(this.state.mainTabIndex === 1){

                                if(this.state.parapheTabIndex === 0){
                                    if(this.state.paraphePositions === "tousSauf"){

                                        let signatures = this.state.signatures;
                                        let savedSignatures = this.state.savedSignatures;
                                        for (let i = 0 ; i < this.state.numPages - 1 ; i++){
                                            signatures.push({
                                                data: this.sigCanvas.getTrimmedCanvas().toDataURL('image/png'),
                                                page: (i +1),
                                                width: 150, height: 70, right: 10, bottom: 10,
                                                x:420,y:770
                                            })
                                        }
                                        savedSignatures.push({
                                            data: this.sigCanvas.getTrimmedCanvas().toDataURL('image/png'),
                                            width: 150, height: 70, right: 250, bottom: 400,
                                            x:250,y:400
                                        })
                                        this.setState({
                                            openSignModal: false,
                                            closeBtn: true,
                                            signatures: signatures,
                                            savedSignatures: savedSignatures,
                                            loading: false
                                        })

                                    }
                                    else if(this.state.paraphePositions === "tous"){
                                        let signatures = this.state.signatures;
                                        let savedSignatures = this.state.savedSignatures;
                                        for (let i = 0 ; i < this.state.numPages ; i++){
                                            signatures.push({
                                                data: this.sigCanvas.getTrimmedCanvas().toDataURL('image/png'),
                                                page: (i +1),
                                                width: 150, height: 70, right: 10, bottom: 10,
                                                x:420,y:770
                                            })
                                        }

                                        savedSignatures.push({
                                            data: this.sigCanvas.getTrimmedCanvas().toDataURL('image/png'),
                                            width: 150, height: 70, right: 250, bottom: 400,
                                            x:250,y:400
                                        })
                                        this.setState({
                                            openSignModal: false,
                                            closeBtn: true,
                                            signatures: signatures,
                                            savedSignatures: savedSignatures,
                                            loading: false
                                        })
                                    }
                                    else if(this.state.paraphePositions === "custom"){
                                        let signatures = this.state.signatures;
                                        let savedSignatures = this.state.savedSignatures;
                                        for (let i = 0 ; i < this.state.parapheCustomPages.length ; i++){
                                            let item = this.state.parapheCustomPages[i];
                                            signatures.push({
                                                data: this.sigCanvas.getTrimmedCanvas().toDataURL('image/png'),
                                                page: parseInt(item.replace('Page ','')),
                                                width: 150, height: 70, right: 10, bottom: 10,
                                                x:420,y:770
                                            })
                                        }
                                        savedSignatures.push({
                                            data: this.sigCanvas.getTrimmedCanvas().toDataURL('image/png'),
                                            width: 150, height: 70, right: 250, bottom: 400,
                                            x:250,y:400
                                        })
                                        this.setState({
                                            openSignModal: false,
                                            closeBtn: true,
                                            signatures: signatures,
                                            savedSignatures: savedSignatures,
                                            loading: false
                                        })

                                    }
                                }

                                else if(this.state.parapheTabIndex === 1){

                                    if(this.state.paraphePositions === "tousSauf"){
                                        domtoimage.toPng(document.getElementById(this.state.selectedSignTextId),
                                            {bgcolor: "transparent", quality: 1, width: 150, height: 70})
                                            .then((dataUrl) => {
                                                let signatures = this.state.signatures;
                                                let savedSignatures = this.state.savedSignatures;
                                                for(let i = 0 ; i < this.state.numPages -1 ; i++){
                                                    signatures.push({
                                                        data: dataUrl,
                                                        page: (i +1),
                                                        width: 150, height: 70, right: 10, bottom: 10,
                                                        x:420,y:770
                                                    })
                                                }
                                                savedSignatures.push({
                                                    data: dataUrl,
                                                    width: 150, height: 70, right: 250, bottom: 400,
                                                    x:250,y:400
                                                })
                                                this.setState({
                                                    openSignModal: false,
                                                    closeBtn: true,
                                                    signatures: signatures,
                                                    savedSignatures: savedSignatures,
                                                    loading: false
                                                })
                                            }).catch(err => console.log(err))
                                    }
                                    else if(this.state.paraphePositions === "tous"){
                                        domtoimage.toPng(document.getElementById(this.state.selectedSignTextId),
                                            {bgcolor: "transparent", quality: 1, width: 150, height: 70})
                                            .then((dataUrl) => {
                                                let signatures = this.state.signatures;
                                                let savedSignatures = this.state.savedSignatures;
                                                for (let i = 0 ; i < this.state.numPages ; i++){
                                                    signatures.push({
                                                        data: dataUrl,
                                                        page: (i +1),
                                                        width: 150, height: 70, right: 10, bottom: 10,
                                                        x:420,y:770
                                                    })
                                                }
                                                savedSignatures.push({
                                                    data: dataUrl,
                                                    width: 150, height: 70, right: 250, bottom: 400,
                                                    x:250,y:400
                                                })
                                                this.setState({
                                                    openSignModal: false,
                                                    closeBtn: true,
                                                    signatures: signatures,
                                                    savedSignatures: savedSignatures,
                                                    loading: false
                                                })
                                            }).catch(err => console.log(err))
                                    }
                                    else if(this.state.paraphePositions === "custom"){
                                        domtoimage.toPng(document.getElementById(this.state.selectedSignTextId),
                                            {bgcolor: "transparent", quality: 1, width: 150, height: 70})
                                            .then((dataUrl) => {
                                                let signatures = this.state.signatures;
                                                let savedSignatures = this.state.savedSignatures;
                                                for (let i = 0 ; i < this.state.parapheCustomPages.length ; i++){
                                                    let item = this.state.parapheCustomPages[i];
                                                    signatures.push({
                                                        data: dataUrl,
                                                        page: parseInt(item.replace('Page ','')),
                                                        width: 150, height: 70, right: 10, bottom: 10,
                                                        x:420,y:770
                                                    })
                                                }
                                                savedSignatures.push({
                                                    data: dataUrl,
                                                    width: 150, height: 70, right: 250, bottom: 400,
                                                    x:250,y:400
                                                })
                                                this.setState({
                                                    openSignModal: false,
                                                    closeBtn: true,
                                                    signatures: signatures,
                                                    savedSignatures: savedSignatures,
                                                    loading: false
                                                })
                                            }).catch(err => console.log(err))
                                    }else{}


                                }else{}

                            }else{}


                        }}
                                style={{
                                    textTransform: "Capitalize",
                                    fontWeight: "bold",
                                    color: "#fff",
                                    backgroundColor: "#1ABC9C"
                                }} variant="contained"
                        >
                            Créer la signature
                        </Button>
                    </DialogActions>
                </Dialog>

            </div>
        )
    }

}