import React from 'react';
import SmartService from '../../provider/SmartService';
import { Document, Page } from 'react-pdf';
import MuiBackdrop from '../../components/Loading/MuiBackdrop';
import SignTopBar from '../../components/TopBar/SignTopBar';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import Slide from '@material-ui/core/Slide';
import { Tab, TabList, TabPanel, Tabs } from 'react-tabs';
import SignatureCanvas from 'react-signature-canvas';
import IconButton from '@material-ui/core/IconButton';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import { CirclePicker } from 'react-color';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import { Rnd } from 'react-rnd';
import { scroller } from 'react-scroll';
import domtoimage from 'dom-to-image';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { Checkbox as MuiCheckbox, Typography, Button as MuiButton } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import CheckBoxIcon from '@material-ui/icons/CheckBox';
import Alert from '@material-ui/lab/Alert';
import Snackbar from '@material-ui/core/Snackbar';
import SaveIcon from '@material-ui/icons/Save';
import AtlButton from '@atlaskit/button';
import GestureIcon from '@material-ui/icons/Gesture';


const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const pageWidth = 590;
const pageHeight = 850;

const icon = <CheckBoxOutlineBlankIcon fontSize="small"/>;
const checkedIcon = <CheckBoxIcon fontSize="small"/>;

export default class SignDocV3 extends React.Component {

    sigCanvas = {}
    sigParapheCanvas = {}
    signatureUpload = {}

    state = {
        firstLoading: true,
        loading: false,

        openAlert: false,
        alertMessage: '',
        alertType: '',

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
        userSignatures:[],
        selectedPage: 1,
        signatureText: "Exemple",
        selectedSignTextId:"signText1",
        mainTabIndex:0,
        parapheTabIndex: 0,
        signatureTabIndex: 0,
        paraphePositions: "tousSauf",
        parapheCustomPages:[],
        openDeleteSignModal:false,
        toDeletedSignId:"",

        width: 150,
        height: 70,
        x: 295,
        y: 425,


        uploadedSignature:""
    }


    componentDidMount() {
        if (localStorage.getItem('email') === undefined || localStorage.getItem('email') === null) {
            this.props.history.push('/login')
        } else {
            SmartService.getFile(this.props.match.params.doc_id, localStorage.getItem("token"), localStorage.getItem("usrtoken")).then(fileRes => {
                if (fileRes.succes === true && fileRes.status === 200) {

                    SmartService.getUserSignatures(localStorage.getItem("token"), localStorage.getItem("usrtoken")).then( signaturesRes => {

                        if (signaturesRes.succes === true && signaturesRes.status === 200) {
                            let signaturesIds = signaturesRes.data || [];
                            let calls = []
                            let signatures = [];
                            signaturesIds.map((item,key) => {
                                calls.push(
                                  SmartService.getSignatureById(item.id,localStorage.getItem("token"), localStorage.getItem("usrtoken")).then( r => {
                                      signatures.push({
                                          b64:r.data,
                                          id:item.id
                                      })
                                  })
                                );
                            })
                            Promise.all(calls).then( response => {
                                console.log(signatures)
                                this.setState({ savedSignatures : signatures,docBase64: fileRes.data.Content.Data,
                                    docName: fileRes.data.name + ".pdf", firstLoading: false });
                            }).catch(err => {
                                this.setState({ loading: false });
                                console.log(err);
                            });
                        }else{
                            this.openSnackbar("error",signaturesRes.error)
                        }
                    }).catch( err => {
                        console.log(err);
                        this.openSnackbar("error","Une erreur est survenue !")
                    })

                } else {

                }
            }).catch(err => {

            })
        }

    }

    updateSignatures(){

        SmartService.getUserSignatures(localStorage.getItem("token"), localStorage.getItem("usrtoken")).then( signaturesRes => {

            if (signaturesRes.succes === true && signaturesRes.status === 200) {
                let signaturesIds = signaturesRes.data || [];
                let calls = []
                let signatures = [];
                signaturesIds.map((item,key) => {
                    calls.push(
                      SmartService.getSignatureById(item.id,localStorage.getItem("token"), localStorage.getItem("usrtoken")).then( r => {
                          signatures.push({
                              b64:r.data,
                              id:item.id
                          })
                      })
                    );
                })
                Promise.all(calls).then( response => {
                    this.setState({ savedSignatures : signatures, firstLoading: false });
                }).catch(err => {
                    this.setState({ loading: false });
                    console.log(err);
                });
            }else{
                this.openSnackbar("error",signaturesRes.error)
            }
        }).catch( err => {
            console.log(err);
            this.openSnackbar("error","Une erreur est survenue !")
        })

    }

    openSnackbar = (type, msg) => {
        this.setState({
            openAlert: true,
            alertMessage: msg,
            alertType: type
        });
    };

    closeSnackbar = (event, reason) => {
        if (reason === 'clickaway') return;
        this.setState({ openAlert: false });
    };

    onDocumentLoadSuccess = ({numPages}) => {
        let pages = [];
        let pagesStrings = [];
        for (let i = 0; i < numPages; i++) {
            pages.push(i + 1)
            pagesStrings.push("Page "+(i+1))
        }
        this.setState({numPages: numPages, pages: pages,pagesStrings:pagesStrings})
    }

    addUserSignature(){

        this.setState({loading: true, openSignModal: false})
        if(this.state.mainTabIndex === 0){

            if (this.state.signatureTabIndex === 0) {
                if(this.sigCanvas.isEmpty()){
                    this.setState({loading:false})
                    this.openSnackbar("error","Vous devez dessiner votre signature avant de cliquer !")
                }
                else{
                    let signatures = this.state.signatures;
                    let b64Sign = this.sigCanvas.getTrimmedCanvas().toDataURL('image/png');
                    let formated_b64Sign = b64Sign.replace("data:image/png;base64,","");

                    SmartService.addSignature({base64:formated_b64Sign}
                      ,localStorage.getItem("token"), localStorage.getItem("usrtoken")).then( r => {

                        if (r.succes === true && r.status === 200) {

                            signatures.push({
                                id:r.data.id,
                                b64: formated_b64Sign,
                                page: parseInt(this.state.selectedPage),
                                width: 150, height: 70, right: 250, bottom: 400,
                                x:250,y:400
                            })
                            this.setState({
                                openSignModal: false,
                                closeBtn: true,
                                signatures: signatures,
                                loading: false
                            })
                            this.updateSignatures()
                        }else{
                            console.log(r.error)
                        }

                    }).catch(err => {console.log(err)})
                }


            }
            else if (this.state.signatureTabIndex === 1) {

                domtoimage.toPng(document.getElementById(this.state.selectedSignTextId),
                  {bgcolor: "transparent", quality: 1, width: 150, height: 70})
                  .then((dataUrl) => {

                      let signatures = this.state.signatures;
                      let formated_b64Sign = dataUrl.replace("data:image/png;base64,","");

                      SmartService.addSignature({base64:formated_b64Sign}
                        ,localStorage.getItem("token"), localStorage.getItem("usrtoken")).then( r => {
                          console.log(r)
                          if (r.succes === true && r.status === 200) {
                              signatures.push({
                                  id:r.data.id,
                                  b64: formated_b64Sign,
                                  page: parseInt(this.state.selectedPage),
                                  width: 150, height: 70, right: 250, bottom: 400,
                                  x:250,y:400
                              })
                              this.setState({
                                  openSignModal: false,
                                  closeBtn: true,
                                  signatures: signatures,
                                  loading: false
                              })
                              this.updateSignatures()
                          }else{
                              console.log(r.error)
                          }

                      }).catch(err => {console.log(err)})

                  })
            }
            else if(this.state.signatureTabIndex === 2) {
                if(this.state.uploadedSignature === ""){
                    this.setState({loading:false})
                    this.openSnackbar("error","Vous devez ajouter une signature !")
                }else{
                    let signUpload = this.state.uploadedSignature;
                    let signatures = this.state.signatures;
                    let formated_b64Sign = signUpload.startsWith("data:image/png") ?  signUpload.replace("data:image/png;base64,","") :
                      signUpload.startsWith("data:image/jpeg") ? signUpload.replace("data:image/jpeg;base64,","") :
                        signUpload.startsWith("data:image/jpg") ? signUpload.replace("data:image/jpg;base64,","") : signUpload

                    SmartService.addSignature({base64:formated_b64Sign}
                      ,localStorage.getItem("token"), localStorage.getItem("usrtoken")).then( r => {
                        console.log(r)
                        if (r.succes === true && r.status === 200) {
                            signatures.push({
                                id:r.data.id,
                                b64: formated_b64Sign,
                                page: parseInt(this.state.selectedPage),
                                width: 150, height: 70, right: 250, bottom: 400,
                                x:250,y:400
                            })
                            this.setState({
                                openSignModal: false,
                                closeBtn: true,
                                signatures: signatures,
                                loading: false
                            })
                            this.updateSignatures()
                        }else{
                            console.log(r.error)
                        }

                    }).catch(err => {console.log(err)})
                }

            }

        }

        else if(this.state.mainTabIndex === 1){

            if(this.state.parapheTabIndex === 0){
                if(this.sigParapheCanvas.isEmpty()){
                    this.setState({loading:false})
                    this.openSnackbar("error","Vous devez dessiner votre signature avant de cliquer !")
                }
                else{
                    let iterationCount = this.state.paraphePositions === "tousSauf" ? this.state.numPages - 1 :
                      this.state.paraphePositions === "tous" ? this.state.numPages : this.state.parapheCustomPages.length

                        let signatures = this.state.signatures;
                        let b64Sign = this.sigParapheCanvas.getTrimmedCanvas().toDataURL('image/png');
                        let formated_b64Sign = b64Sign.replace("data:image/png;base64,","");

                        SmartService.addSignature({base64:formated_b64Sign}
                          ,localStorage.getItem("token"), localStorage.getItem("usrtoken")).then( r => {

                            if (r.succes === true && r.status === 200) {

                                for (let i = 0 ; i < iterationCount ; i++){
                                    signatures.push({
                                        id:r.data.id,
                                        b64: formated_b64Sign,
                                        page: this.state.paraphePositions === "custom" ? parseInt(this.state.parapheCustomPages[i].replace('Page ','')) : i + 1,
                                        width: 150, height: 70, right: 10, bottom: 10,
                                        x:420,y:770
                                    })
                                }

                                this.setState({
                                    openSignModal: false,
                                    closeBtn: true,
                                    signatures: signatures,
                                    loading: false
                                })
                                this.updateSignatures()
                            }else{
                                console.log(r.error)
                            }

                        }).catch(err => {console.log(err)})

                }

            }

            else if(this.state.parapheTabIndex === 1){


                    let iterationCount = this.state.paraphePositions === "tousSauf" ? this.state.numPages - 1 :
                      this.state.paraphePositions === "tous" ? this.state.numPages : this.state.parapheCustomPages.length

                    domtoimage.toPng(document.getElementById(this.state.selectedSignTextId),
                      {bgcolor: "transparent", quality: 1, width: 150, height: 70})
                      .then((dataUrl) => {
                          let signatures = this.state.signatures;
                          let formated_b64Sign = dataUrl.replace("data:image/png;base64,","");

                          SmartService.addSignature({base64:formated_b64Sign}
                            ,localStorage.getItem("token"), localStorage.getItem("usrtoken")).then( r => {
                              console.log(r)
                              if (r.succes === true && r.status === 200) {
                                  for(let i = 0 ; i < iterationCount ; i++){
                                      signatures.push({
                                          id:r.data.id,
                                          b64: formated_b64Sign,
                                          page: this.state.paraphePositions === "custom" ? parseInt(this.state.parapheCustomPages[i].replace('Page ','')) : i + 1,
                                          width: 150, height: 70, right: 10, bottom: 10,
                                          x:420,y:770
                                      })
                                  }
                                  this.setState({
                                      openSignModal: false,
                                      closeBtn: true,
                                      signatures: signatures,
                                      loading: false
                                  })
                                  this.updateSignatures()
                              }else{
                                  console.log(r.error)
                              }
                          }).catch(err => {console.log(err)})

                      })

            }

            else if(this.state.parapheTabIndex === 2){

                if(this.state.uploadedSignature === ""){
                    this.setState({loading:false})
                    this.openSnackbar("error","Vous devez ajouter une signature !")
                }else{

                    let iterationCount = this.state.paraphePositions === "tousSauf" ? this.state.numPages - 1 :
                      this.state.paraphePositions === "tous" ? this.state.numPages : this.state.parapheCustomPages.length


                    let signatures = this.state.signatures;
                    let signUpload = this.state.uploadedSignature;

                    let formated_b64Sign = signUpload.startsWith("data:image/png") ?  signUpload.replace("data:image/png;base64,","") :
                      signUpload.startsWith("data:image/jpeg") ? signUpload.replace("data:image/jpeg;base64,","") :
                        signUpload.startsWith("data:image/jpg") ? signUpload.replace("data:image/jpg;base64,","") : signUpload

                    SmartService.addSignature({base64:formated_b64Sign}
                      ,localStorage.getItem("token"), localStorage.getItem("usrtoken")).then( r => {
                        console.log(r)
                        if (r.succes === true && r.status === 200) {
                            for(let i = 0 ; i < iterationCount ; i++){
                                signatures.push({
                                    id:r.data.id,
                                    b64: formated_b64Sign,
                                    page: this.state.paraphePositions === "custom" ? parseInt(this.state.parapheCustomPages[i].replace('Page ','')) : i + 1,
                                    width: 150, height: 70, right: 10, bottom: 10,
                                    x:420,y:770
                                })
                            }
                            this.setState({
                                openSignModal: false,
                                closeBtn: true,
                                signatures: signatures,
                                loading: false
                            })
                            this.updateSignatures()
                        }else{
                            console.log(r.error)
                        }
                    }).catch(err => {console.log(err)})

                }
            }
        }
    }

    deleteSignature(id){
        let signatures = this.state.signatures;
        let signaturesCp = this.state.signatures;
        signatures.filter( x => x.id === id).map((item,key) => {
            signaturesCp.splice(signatures.findIndex(x => x.id === id),1)
        })
        this.setState({signatures: signaturesCp})
        SmartService.deleteSignatureById(id, localStorage.getItem("token"), localStorage.getItem("usrtoken")).then(deleteRes => {
            console.log(deleteRes)
            if (deleteRes.succes === true && deleteRes.status === 200) {
                this.setState({toDeletedSignId:""})
                this.openSnackbar("success","Signature supprimée avec succès")
                this.updateSignatures()
            }else{
                this.openSnackbar("error",deleteRes.error)
                this.setState({firstLoading: false, loading: false,toDeletedSignId:""})
            }
        }).catch(err => {
            console.log(err)
            this.openSnackbar("error","Une erreur est survenue lors de suppression ")
            this.setState({firstLoading: false, loading: false,toDeletedSignId:""})
        })
    }

    saveDoc(){
        this.setState({loading:true})
        let signatures = this.state.signatures;
        console.log(signatures)
        let signToAdd = [];
        signatures.map((sign,key) => {
            signToAdd.push({
                x:sign.x + 25 ,
                y:sign.y - 70 ,
                h:sign.height + 50,
                w:sign.width + 50,
                page:sign.page - 1,
                id_sign:sign.id
            })
        })
        SmartService.signDoc({placement:signToAdd},this.props.match.params.doc_id,signToAdd[0].id_sign,localStorage.getItem("token"), localStorage.getItem("usrtoken")).then( saveRes => {
            console.log(saveRes)
            if (saveRes.succes === true && saveRes.status === 200) {

                let resultArray = saveRes.data || [];
                let isOk = true;
                let error ;
                resultArray.map((r,key) => {
                    if(r[0] === false || r[2] === 400){
                        isOk = false;
                        error = r;
                    }
                })
                if(isOk === true){
                    this.setState({loading:false})
                    this.openSnackbar("success","Enregistrement effectué avec succès")
                    setTimeout(() => {
                        this.props.history.goBack()
                    },1000);
                }else{
                    console.log(error)
                    this.setState({loading:false})
                    this.openSnackbar("error","Une erreur est survenue lors de l'enregistrement de l'un des signatures dans le document ! Merci de vérifier votre document")
                }

            }else{
                console.log(saveRes.error)
                this.setState({loading:false})
                this.openSnackbar("error",saveRes.error)

            }
        }).catch(err => {
            console.log(err)
            this.setState({loading:false})
            this.openSnackbar("error","Une erreur est survenue lors de la sauvgarde de document, Réessayez une autre fois")
        } )
    }

    uploadSignature = (event) => {
        let file = event.target.files[0];
        if(file.type === "image/png" || file.type === "image/jpeg" || file.type === "image/jpg" ){
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => {
                this.setState({uploadedSignature:reader.result})
            }
            reader.onerror = error => {
                console.log(error)
            }

        }else{
            this.openSnackbar("error","Le format de la signature est invalide ! ")
        }
    }

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
                            onClickSignature={ signature => {
                                let signatures = this.state.signatures;
                                let newSign = {} ;
                                newSign.id = signature.id;
                                newSign.b64 = signature.b64;
                                newSign.width = 150; newSign.height = 70;
                                newSign.right = 250; newSign.bottom = 400;
                                newSign.x = 250; newSign.y = 400;
                                newSign.page = parseInt(this.state.selectedPage);
                                signatures.push(newSign);
                                this.setState({signatures: signatures})
                                console.log(this.state.savedSignatures)
                            }}
                            onClickDelete={(id) => {
                                this.setState({toDeletedSignId:id,openDeleteSignModal:true})
                            }}
                />
                {
                    this.state.firstLoading === false &&
                      <div>
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
                          <div style={{position: "fixed", bottom: 20, right: 30, zIndex: 1600}}>
                              <MuiButton onClick={() => {
                                  this.saveDoc()
                              }}
                                         disabled={this.state.signatures.length === 0}
                                         size="large"
                                         startIcon={<SaveIcon />}
                                      style={{
                                          textTransform: "Capitalize",
                                          fontWeight: "bold",
                                          color: "#fff",
                                          backgroundColor: "#00BF4A"
                                      }}
                                         variant="contained"
                              >
                                  Enregistrer
                              </MuiButton>
                          </div>
                      </div>
                }

                <div align="center" style={{backgroundColor: "#f0f0f0", display: "grid", marginTop: 65,height:1000}}>
                    {
                        this.state.firstLoading === false &&
                        <Document
                            file={"data:application/pdf;base64," + this.state.docBase64}
                            onLoadSuccess={this.onDocumentLoadSuccess}
                        >
                            <Page key={parseInt(this.state.selectedPage)} pageNumber={parseInt(this.state.selectedPage)} className="custom_pdf_page"
                            >
                                {
                                    this.state.signatures.map((sign, id) =>
                                        sign.page === parseInt(this.state.selectedPage) &&
                                        <Rnd key={`rnd${id}`}
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
                                                 console.log(id)
                                                 let signatures = this.state.signatures;
                                                 signatures[id].x = d.x;
                                                 signatures[id].y = d.y;
                                                 signatures[id].right = pageWidth - (d.x + signatures[id].width)
                                                 signatures[id].bottom = pageHeight - (d.y + signatures[id].height)
                                                 console.log(signatures)
                                                 this.setState({signatures: signatures})
                                             }}
                                             onResizeStop={(e, direction, ref, delta, position) => {
                                                 let signatures = this.state.signatures;
                                                 signatures[id].width = parseInt(ref.style.width.slice(0, -2));
                                                 signatures[id].height = parseInt(ref.style.height.slice(0, -2));
                                                 this.setState({signatures: signatures})
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
                                                     src={"data:image/png;base64," + sign.b64}
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
                                                        }}
                                                        />
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
                                            <div align="center" style={{marginTop: 30}}>
                                                <AtlButton appearance="default" iconBefore={<GestureIcon/>} onClick={() => this.signatureUpload.click()} >
                                                    Choisissez votre signature
                                                </AtlButton>
                                                <input
                                                  accept={["image/png","image/jpeg","image/jpg"]}
                                                  style={{ visibility: 'hidden', width: 0, height: 0 }}
                                                  onChange={(event) => this.uploadSignature(event)}
                                                  type="file"
                                                  ref={(ref) => (this.signatureUpload = ref)}
                                                />
                                                {
                                                    this.state.uploadedSignature !== "" &&
                                                    <div style={{marginTop:35}}>
                                                        <img alt="" src={this.state.uploadedSignature} style={{width:150,height:70,objectFit:"contain"}}/>
                                                    </div>
                                                }
                                            </div>
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
                                                            this.sigParapheCanvas = ref
                                                        }} penColor={this.state.penColor} canvasProps={{
                                                            width: 400,
                                                            height: 200,
                                                            className: 'sigCanvas'
                                                        }}/>
                                                        <div style={{position: "absolute", top: 258, right: 95}}>
                                                            <IconButton color="default" onClick={() => {
                                                                this.sigParapheCanvas.clear()
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
                                            <div align="center" style={{marginTop: 30}}>
                                                <AtlButton appearance="default" iconBefore={<GestureIcon/>} onClick={() => this.signatureUpload.click()} >
                                                    Choisissez votre signature
                                                </AtlButton>
                                                <input
                                                  accept={["image/png","image/jpeg","image/jpg"]}
                                                  style={{ visibility: 'hidden', width: 0, height: 0 }}
                                                  onChange={(event) => this.uploadSignature(event)}
                                                  type="file"
                                                  ref={(ref) => (this.signatureUpload = ref)}
                                                />
                                                {
                                                    this.state.uploadedSignature !== "" &&
                                                    <div style={{marginTop:35}}>
                                                        <img alt="" src={this.state.uploadedSignature} style={{width:150,height:70,objectFit:"contain"}}/>
                                                    </div>
                                                }
                                            </div>
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
                            this.addUserSignature()
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

                <Dialog
                  open={this.state.openDeleteSignModal}
                  TransitionComponent={Transition}
                  keepMounted
                  onClose={() => this.setState({openDeleteSignModal:false})}
                  aria-labelledby="alert-dialog-slide-title"
                  aria-describedby="alert-dialog-slide-description"
                >
                    <DialogTitle id="alert-dialog-slide-title"
                                 style={{width: "90%"}}>{"Voulez-vous vraiment supprimer cette signature ?"}</DialogTitle>
                    <DialogContent>
                        <div align="center" style={{marginTop: 5, marginBottom: 5}}>
                            <div className="avatar-lg rounded-circle bg-soft-danger border-danger">
                                <i className="mdi mdi-close-circle-outline avatar-title text-danger"
                                   style={{fontSize: 42}}/>
                            </div>
                        </div>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={() => this.setState({openDeleteSignModal:false})} color="default"
                                style={{textTransform: "Capitalize", fontWeight: "bold"}}>
                            Annuler
                        </Button>
                        <Button onClick={() => {
                            this.setState({openDeleteSignModal:false})
                            this.deleteSignature(this.state.toDeletedSignId)
                        }}
                                color="secondary" style={{textTransform: "Capitalize", fontWeight: "bold"}}
                                variant="contained">
                            Confirmer
                        </Button>
                    </DialogActions>
                </Dialog>

                <Snackbar
                  open={this.state.openAlert}
                  autoHideDuration={5000}
                  onClose={this.closeSnackbar}
                >
                    <Alert
                      elevation={6}
                      variant="filled"
                      onClose={this.closeSnackbar}
                      severity={this.state.alertType}
                    >
                        {this.state.alertMessage}
                    </Alert>
                </Snackbar>

            </div>
        )
    }

}