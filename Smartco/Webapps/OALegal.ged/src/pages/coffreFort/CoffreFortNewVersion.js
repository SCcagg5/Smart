import React from "react";
import { Modal, ModalBody, ModalHeader} from "reactstrap";
import moment from "moment";
import PDFViewer from "../../customComponents/pdf-viewer-reactjs";
import SearchResults from "../../components/Search/SearchResults";
import DocSearchService from "../../provider/DocSearchService";
import {FileUploader} from "baseui/file-uploader";
import axios from 'axios';
import {Button, SHAPE, SIZE} from 'baseui/button';
import Delete from 'baseui/icon/delete';
import {RadioGroup, Radio, ALIGN} from "baseui/radio";
import firebase from "firebase/app";
import "firebase/database"
import {
    Checkbox,
    STYLE_TYPE,
    LABEL_PLACEMENT
} from "baseui/checkbox";
import {ReactMultiEmail, isEmail} from 'react-multi-email';
import '../../assets/css/multiEmail.css';
import {Select} from 'baseui/select';
import swissImg from "../../assets/images/flags/swiss.svg"
import euImg from "../../assets/images/flags/eu.svg"
import frImg from "../../assets/images/flags/france.png"
import {Textarea} from "baseui/textarea";
import Draggable from "react-draggable";
import htmlToImage from 'html-to-image';
import ReactLoading from "react-loading";
import Drawer from "@material-ui/core/Drawer";
import IconButton from '@material-ui/core/IconButton';
import CloudDownloadOutlinedIcon from '@material-ui/icons/CloudDownloadOutlined';
import PersonAddOutlinedIcon from '@material-ui/icons/PersonAddOutlined';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import DateRangeOutlinedIcon from '@material-ui/icons/DateRangeOutlined';
import CreateOutlinedIcon from '@material-ui/icons/CreateOutlined';
import FindInPageOutlinedIcon from '@material-ui/icons/FindInPageOutlined';
import TopBar from "../../components/TopBar/TopBar";
import logo from "../../assets/images/logos/logo-OA-dark.png";
import SideMenu from "../../components/SideMenu/SideMenu";
import data from "../../data/data";
import SideBar from "../../components/SideBar/SideBar";
import GmailCloneTree from "../../components/Tree/GmailCloneTree";
import AddIcon from '@material-ui/icons/Add';
import SmartService from "../../provider/SmartService";

/*const endpoint = "http://51.158.97.220:3001/api";*/

const getLabel = ({option}) => {
    return (
        <React.Fragment>
            <img src={option.image} alt="" style={{width: 30, height: 30}}/>&nbsp;&nbsp;
            {option.id}
        </React.Fragment>
    );
};


class CoffreFortNewVersion extends React.Component {



    constructor(props) {
        super(props);
        this.state = {
            selectedSieMenuItem:"coffre",
            openSideMenu:false,
            showSecondSideBar:false,
            loading: true,

            showPDFModal: false,
            pdfURL: "",

            textSearch: "",
            resultData: "",

            showAddDocForm: true,
            isDocUploaded: true,

            uploadedThumb: "",
            uploadedName: "",

            signDoc: "true",
            showBtnInviteSign: false,

            showInviteSignersForm: false,
            signMySelf: true,
            signatiaresEmails: [],
            selectedSignatureType: {id: "Swiss law (ZertES)", image: swissImg},

            showPdfSignToAddForm: true,

            showUploadStep: "",  //upload  // upload_succes // inviteSigners  // signForm  // successfulStep

            selectedSideMenuItem:"dc",

            openRightMenu:false,
            selectedDoc:"",

            folders:[],

            selectedFoldername:"",
            selectedFolderFiles:[],
        }
    }

    searchOCR = (text) => event => {

        if (text !== '') {
            this.setState({textSearch: text});
            DocSearchService.login().then(ok => {

                DocSearchService.search({word: text}, ok.data.token).then(res => {

                    //console.log(res);
                    this.setState({resultData: res})

                }).catch(err => console.log(err))

            }).catch(err => console.log(err))

        }
    };



    showDocInPdfModal = (url) => event => {

        this.setState({
            openRightMenu:false,
            showPDFModal: true,
            pdfURL: url
        });
    };


    componentDidMount() {


        if (localStorage.getItem('email') === undefined || localStorage.getItem('email') === null) {
            this.props.history.push('/login')
        } else {
            this.setState({loading: true});
            setTimeout(() => {
                SmartService.getGed(localStorage.getItem("token"),localStorage.getItem("usrtoken")).then( gedRes => {
                    if (gedRes.succes === true && gedRes.status === 200) {
                        //console.log(gedRes)
                        this.setState({folders:gedRes.data.Content.folders || []})
                    }else{
                        localStorage.clear();
                        this.props.history.push("/login")
                    }
                }).catch(err => {
                    console.log(err)
                })
                this.setState({loading:false})
            },200);
        }

    }

    convetHtmlToBase64 = (divId) => event =>  {
        htmlToImage.toPng(document.getElementById(divId))
            .then(function (dataUrl) {
                console.log(dataUrl);
            })
    }

    render() {

        return (
            <div>
                <TopBar logo={logo} height={90} onClickMenuIcon={() => this.setState({openSideMenu:true})}/>
                <SideMenu logo={logo} items={data.sideBarItems} iconColor={"blue"} textColor={"#65728E"} history={this.props.history}
                          opened={this.state.openSideMenu} onClose={() => this.setState({openSideMenu:false})} />
                <SideBar items={data.sideBarItems} width={100} selectedItem={this.state.selectedSieMenuItem} activeColor={"blue"} disabledColor={"#65728E"}
                         updateSelected={(item) => this.setState({selectedSieMenuItem:item})} history={this.props.history} />
                {
                    this.state.loading === true ?
                        <div className="centered-text">
                            <ReactLoading type={"bars"} color={"red"}/>
                        </div> :

                        <div style={{paddingLeft:100,marginRight:50}}>

                            {
                                this.state.resultData !== "" &&
                                <SearchResults data={this.state.resultData} textSearch={this.state.textSearch}/>
                            }


                            <div>
                                <div style={{display:"flex"}}>
                                    {
                                        this.state.showUploadStep === "" &&
                                        <div style={{height:"100%"}}>
                                            <div >
                                                <div style={{width:240,marginLeft:20,marginTop:40}}>
                                                    <GmailCloneTree data={this.state.folders || []} />
                                                </div>
                                                <div align="center" style={{position:"fixed",bottom:80,marginLeft:95}}>
                                                   {/* <button className="btn btn-sm btn-info"
                                                            style={{borderRadius:50,justifyContent:"center",alignItems:"center"}} onClick={()=>this.setState({showUploadStep:"upload"})}>
                                                        <i className="mdi mdi-plus text-white" style={{fontSize:32,fontWeight:900}}/>
                                                    </button>*/}
                                                    <IconButton aria-label="Ajouter un document" style={{backgroundColor:"#A00015"}} onClick={()=>this.setState({showUploadStep:"upload"})}
                                                    >
                                                        <AddIcon style={{color:"#fff",fontWeight:"bold"}}/>
                                                    </IconButton>
                                                </div>

                                            </div>

                                        </div>

                                    }

                                    <div style={{flexWrap:"wrap",flex:"1 1 auto"}}>
                                        <div className="card">
                                                         <div className="card-body" style={{minHeight: 750}}>

                                                             {
                                                                 this.state.showUploadStep === "upload" &&
                                                                 <div>
                                                                     <div className="">
                                                                         <button className="btn btn-sm btn-light"
                                                                                 onClick={() => this.setState({showUploadStep: ""})}>
                                                                             <i className="mdi mdi-arrow-left font-16"
                                                                                style={{color: "#000", fontWeight: "bold"}}/>&nbsp;
                                                                             Retour
                                                                         </button>
                                                                     </div>
                                                                     <div align="center" className="mt-5">
                                                                         <h1 className="skh1">Télécharger un document</h1>
                                                                         <p style={{fontSize: "1rem"}} className="mt-2">
                                                                             Faites glisser et déposez un documents PDF sur le
                                                                             terrain ou sélectionnez un fichier
                                                                             depuis votre ordinateur.</p>

                                                                         <div className="sk_elupload_drag">
                                                                             <FileUploader
                                                                                 onCancel={() => {
                                                                                 }}

                                                                                 onDrop={(acceptedFiles, rejectedFiles) => {
                                                                                     console.log(acceptedFiles)
                                                                                     let formData = new FormData();
                                                                                     formData.append("document", acceptedFiles[0], acceptedFiles[0].name)
                                                                                     axios.request({
                                                                                         method: "POST",
                                                                                         url: "http://51.158.97.220:3003/api/uploadFile",
                                                                                         data: formData,
                                                                                         onUploadProgress: (p) => {
                                                                                             console.log(p);
                                                                                             this.setState({
                                                                                                 progressUpload: (p.loaded / p.total) * 100
                                                                                             })
                                                                                         }


                                                                                     }).then(res => {
                                                                                         console.log(res)
                                                                                         this.setState({
                                                                                             progressUpload: undefined,
                                                                                             showUploadStep: "upload_succes",
                                                                                             uploadedThumb: res.data.data.thumbnail,
                                                                                             uploadedName: res.data.data.docName,
                                                                                             uploadedPath: res.data.data.path
                                                                                         })
                                                                                     })

                                                                                 }}
                                                                                 // progressAmount is a number from 0 - 100 which indicates the percent of file transfer completed
                                                                                 progressAmount={this.state.progressUpload}

                                                                                 progressMessage={this.state.progressUpload ? "Téléchargement de " + this.state.progressUpload.toFixed(2) + "% de 100%" : ""}
                                                                             />
                                                                         </div>


                                                                     </div>
                                                                 </div>
                                                             }
                                                             {
                                                                 this.state.showUploadStep === "upload_succes" &&
                                                                 <div>
                                                                     <div align="center" className="mt-5">
                                                                         <h1 className="skh1">
                                                                             Téléchargement réussi
                                                                         </h1>
                                                                         <p style={{fontSize: "1rem"}} className="mt-2">
                                                                             Continuez à utiliser le document suivant:
                                                                         </p>
                                                                         <div className="sk_upload_preview">
                                                                             <div className="sk_upload_doc">
                                                                                 <img style={{maxWidth: "100%", maxHeight: "100%"}}
                                                                                      alt="" src={this.state.uploadedThumb}/>
                                                                             </div>
                                                                             <div className="sk_upload_filename">
                                                                                 {this.state.uploadedName}
                                                                             </div>
                                                                             <Button shape={SHAPE.round} size={SIZE.mini}
                                                                                     onClick={() => this.setState({showUploadStep: "upload"})}>
                                                                                 <Delete/>
                                                                             </Button>

                                                                             <div className="mt-2" style={{display: "contents"}}>
                                                                                 <h1 className="skh2">
                                                                                     Souhaitez-vous signer ce documents ?
                                                                                 </h1>
                                                                                 <RadioGroup
                                                                                     value={this.state.signDoc}
                                                                                     onChange={e => this.setState({signDoc: e.target.value})}
                                                                                     name="signDoc"
                                                                                     align={ALIGN.horizontal}
                                                                                 >
                                                                                     <Radio overrides={{
                                                                                         RadioMarkOuter: {
                                                                                             style: ({$theme}) => ({
                                                                                                 backgroundColor: $theme.colors.negative300,
                                                                                             }),
                                                                                         },
                                                                                     }} value="true">Oui</Radio>
                                                                                     <Radio overrides={{
                                                                                         RadioMarkOuter: {
                                                                                             style: ({$theme}) => ({
                                                                                                 backgroundColor: $theme.colors.negative300,
                                                                                             }),
                                                                                         },
                                                                                     }} value="false">Non</Radio>
                                                                                 </RadioGroup>
                                                                             </div>
                                                                             {
                                                                                 this.state.showBtnInviteSign === true &&
                                                                                 <div align="center">
                                                                                     <button
                                                                                         className=" mt-3 btn btn-lg text-white btn-danger font-18"
                                                                                         style={{
                                                                                             backgroundColor: "blue",
                                                                                             borderColor: "blue"
                                                                                         }}
                                                                                         onClick={() => this.setState({showUploadStep: "inviteSigners"})}>
                                                                                         inviter les signataires
                                                                                     </button>
                                                                                 </div>
                                                                             }

                                                                         </div>
                                                                     </div>
                                                                     {
                                                                         this.state.showBtnInviteSign === false &&
                                                                         <div className="float-right mt-1">
                                                                             <button
                                                                                 className="btn btn-lg text-white btn-danger mr-2 font-18"
                                                                                 style={{
                                                                                     backgroundColor: "blue",
                                                                                     borderColor: "blue"
                                                                                 }}
                                                                                 onClick={() => this.setState({showBtnInviteSign: true})}>
                                                                                 Continuer
                                                                             </button>
                                                                         </div>
                                                                     }

                                                                 </div>

                                                             }
                                                             {
                                                                 this.state.showUploadStep === "inviteSigners" &&
                                                                 <div align="center">

                                                                     <div className="ml-2 mt-2">
                                                                         <h1 className="skh1" style={{fontSize: "1.7rem"}}>
                                                                             Invitez les gens à signer
                                                                         </h1>
                                                                         <p style={{fontSize: "1.0rem"}} className="mt-2">
                                                                             Saisissez l'adresse e-mail des personnes qui doivent
                                                                             signer ce document.
                                                                         </p>
                                                                         <div className="mt-4">
                                                                             <strong style={{color: "#293d66", fontSize: "1.1rem"}}>Vous
                                                                                 vous signez ?</strong>
                                                                             <div
                                                                                 className={this.state.signMySelf === true ? "sk_signmyself sk_signmyself_active" : "sk_signmyself"}>
                                                                                 <div className="sk_signmyself_text">Babba Amine
                                                                                 </div>
                                                                                 <div className="sk_signmyself_switch">
                                                                                     <Checkbox
                                                                                         checked={this.state.signMySelf}
                                                                                         checkmarkType={STYLE_TYPE.toggle_round}
                                                                                         onChange={e => this.setState({signMySelf: e.target.checked})}
                                                                                         labelPlacement={LABEL_PLACEMENT.left}
                                                                                         overrides={{
                                                                                             Label: {
                                                                                                 style: ({$theme}) => ({
                                                                                                     color: this.state.signMySelf === true ? $theme.colors.positive300 : $theme.colors.primary200,
                                                                                                 }),
                                                                                             },
                                                                                             Toggle: {
                                                                                                 style: ({$checked, $theme}) => ({
                                                                                                     backgroundColor: $checked
                                                                                                         ? $theme.colors.positive300
                                                                                                         : $theme.colors.primary200,
                                                                                                 }),
                                                                                             }
                                                                                         }}
                                                                                     >
                                                                                         Je signe
                                                                                     </Checkbox>
                                                                                 </div>
                                                                             </div>
                                                                             <div className="mt-3">
                                                                                 <strong
                                                                                     style={{color: "#293d66", fontSize: "1.1rem"}}>Ajouter
                                                                                     d'autres signataires</strong>
                                                                                 <ReactMultiEmail
                                                                                     placeholder="Cliquer sur 'Entrée' pour ajouter une adresse mail "
                                                                                     emails={this.state.signatiaresEmails}
                                                                                     onChange={(_emails) => {
                                                                                         this.setState({signatiaresEmails: _emails});
                                                                                     }}
                                                                                     validateEmail={email => {
                                                                                         return isEmail(email); // return boolean
                                                                                     }}
                                                                                     getLabel={(
                                                                                         email,
                                                                                         index,
                                                                                         removeEmail = (index) => {
                                                                                         },
                                                                                     ) => {
                                                                                         return (
                                                                                             <div data-tag="" key={index}>
                                                                                                 {email}
                                                                                                 <span data-tag-handle=""
                                                                                                     onClick={() => removeEmail(index)}>
                                                                                                                ×
                                                                                                            </span>
                                                                                             </div>
                                                                                         );
                                                                                     }}
                                                                                 />
                                                                             </div>
                                                                             <div className="mt-2">
                                                                                 <strong className="mb-1" style={{
                                                                                     color: "#293d66",
                                                                                     fontSize: "1.1rem"
                                                                                 }}>Exigences légales</strong>
                                                                                 <div className="mt-2">
                                                                                     <div style={{width: "70%"}}>
                                                                                         <Select
                                                                                             options={[
                                                                                                 {
                                                                                                     id: 'Swiss law (ZertES)',
                                                                                                     image: swissImg
                                                                                                 },
                                                                                                 {
                                                                                                     id: 'EU law (eIDAS)',
                                                                                                     image: euImg
                                                                                                 },
                                                                                                 {
                                                                                                     id: 'France (eIDAS)',
                                                                                                     image: frImg
                                                                                                 },
                                                                                             ]}
                                                                                             labelKey="id"
                                                                                             valueKey="id"
                                                                                             onChange={options => this.setState({selectedSignatureType: options.value})}
                                                                                             value={this.state.selectedSignatureType}
                                                                                             getOptionLabel={getLabel}
                                                                                             getValueLabel={getLabel}
                                                                                             placeholder=""
                                                                                         />
                                                                                     </div>
                                                                                 </div>
                                                                             </div>
                                                                             <div className="mt-2">
                                                                                 <strong className="mb-1" style={{
                                                                                     color: "#293d66",
                                                                                     fontSize: "1.1rem"
                                                                                 }}>
                                                                                     Message à tous les signataires</strong>
                                                                                 <div style={{width: "70%"}} className="mt-1">
                                                                                     <Textarea
                                                                                         value={this.state.messageToSignatories}
                                                                                         onChange={e => this.setState({messageToSignatories: e.target.value})}
                                                                                         placeholder=""
                                                                                     />
                                                                                 </div>
                                                                                 <div align="center" className="mt-2">
                                                                                     <button
                                                                                         className="btn btn-lg text-white btn-danger mr-2 font-18"
                                                                                         style={{
                                                                                             backgroundColor: "blue",
                                                                                             borderColor: "blue"
                                                                                         }}
                                                                                         onClick={() => {
                                                                                             this.setState({showUploadStep: "signForm"})
                                                                                         }}>
                                                                                         Continuer
                                                                                     </button>
                                                                                 </div>
                                                                             </div>


                                                                         </div>
                                                                     </div>

                                                                 </div>
                                                             }
                                                             {
                                                                 this.state.showUploadStep === "signForm" &&
                                                                 <div>
                                                                     <div className="sk_appwrap">
                                                                         <div className="sk_viewr">
                                                                             <div className="sk_pdfviewr">
                                                                                 <PDFViewer
                                                                                     document={{
                                                                                         url: "http://51.158.97.220:3003" + this.state.uploadedPath
                                                                                     }}
                                                                                     minScale={0.25}
                                                                                     scale={1.05}
                                                                                     navbarOnTop={true}

                                                                                     scaleStep={0.25}
                                                                                     loader={
                                                                                         <h5 style={{color: '#fa5b35'}}>Chargement...</h5>
                                                                                     }
                                                                                     alert={
                                                                                         <h5 style={{color: "red"}}>Une erreur s'est
                                                                                             produite lors de chargement du
                                                                                             doument !</h5>
                                                                                     }
                                                                                 />
                                                                             </div>
                                                                             <div className="sk_signatures_viewr">
                                                                                 <div className="sk_signatures_viewr_content">
                                                                                     <div className="btn-group mb-2">
                                                                                         <button
                                                                                             className="btn font-weight-bold   btn-light"
                                                                                             onClick={() => this.setState({showUploadStep: "inviteSigners"})}>Retour
                                                                                         </button>
                                                                                         &nbsp;&nbsp;
                                                                                         <button
                                                                                             className="btn custom_p_btn  btn-blue"
                                                                                             onClick={() => {
                                                                                                 this.setState({loading:true})
                                                                                                 let docs = this.state.documents;
                                                                                                 let signers = [];
                                                                                                 let signataires = this.state.signatiaresEmails;
                                                                                                 if(this.state.signMySelf === true){
                                                                                                     signers.push({email:localStorage.getItem("email"),
                                                                                                         signature:"",
                                                                                                         signed_at:new Date(),key:1})
                                                                                                 }
                                                                                                 signataires.map((item,key) => {
                                                                                                     signers.push({email:item,signature:"",signed_at:"",key:this.state.signMySelf === true ? key+2:key+1})
                                                                                                 })

                                                                                                 docs.push({
                                                                                                     title:this.state.uploadedName,
                                                                                                     type:"ad",
                                                                                                     desc:"",
                                                                                                     thumbnail:this.state.uploadedThumb,
                                                                                                     path:this.state.uploadedPath,
                                                                                                     created_at:new Date(),
                                                                                                     signers:signers,
                                                                                                 })
                                                                                                 firebase.database().ref("society/"+localStorage.getItem("uid")+"Suisse").update({
                                                                                                     documents:docs
                                                                                                 }).then(ok => {
                                                                                                     this.setState({loading:false})
                                                                                                 }).catch(err => console.log(err))
                                                                                                 this.setState({showUploadStep: "successfulStep"})
                                                                                             }}>
                                                                                             <h1 className="skh_btn">
                                                                                                 {
                                                                                                     this.state.signMySelf === true ? "Signer maintenant" : "Envoyer les invitations"
                                                                                                 }
                                                                                             </h1>
                                                                                         </button>
                                                                                     </div>
                                                                                     <h1 className="skh1">Positionnez les champs de
                                                                                         signature</h1>
                                                                                     <p style={{fontSize: "1.1rem"}}>
                                                                                         Faites glisser et déposez les champs de
                                                                                         signature à l'endroit où les gens doivent
                                                                                         signer.</p>
                                                                                     <div style={{marginTop: "2.8rem"}}>
                                                                                         {
                                                                                             this.state.signMySelf === true &&
                                                                                             <Draggable>
                                                                                                 <div
                                                                                                     className="sk_signature_sticker">
                                                                                                     <div id={"sk_signature"}
                                                                                                          className="sk_signature_card p-1">
                                                                                                         <div align="center">
                                                                                                             <h1 className="skh3">{localStorage.getItem("email")}</h1>
                                                                                                         </div>

                                                                                                         <div style={{
                                                                                                             display: "flex",
                                                                                                             marginBottom: 8
                                                                                                         }}>
                                                                                                             <button
                                                                                                                 className=" mt-4 btn btn-sm btn-danger p-1 ml-3"
                                                                                                                 style={{
                                                                                                                     backgroundColor: "deepskyblue",
                                                                                                                     borderColor: "deepskyblue"
                                                                                                                 }}>SES
                                                                                                             </button>
                                                                                                             <h1 className="skh4"
                                                                                                                 style={{
                                                                                                                     marginLeft: 15,
                                                                                                                     marginTop: 42
                                                                                                                 }}>
                                                                                                                 Simple electronic
                                                                                                                 signature</h1>
                                                                                                         </div>
                                                                                                     </div>
                                                                                                 </div>
                                                                                             </Draggable>
                                                                                         }
                                                                                         {
                                                                                             this.state.signatiaresEmails.map((item, key) =>
                                                                                                 <Draggable>
                                                                                                     <div
                                                                                                         className="sk_signature_sticker">
                                                                                                         <div id={"sk_signature"+key}
                                                                                                              className="sk_signature_card p-1">
                                                                                                             <div align="center">
                                                                                                                 <h1 className="skh3">{item}</h1>
                                                                                                             </div>
                                                                                                             <div style={{
                                                                                                                 display: "flex",
                                                                                                                 marginBottom: 8
                                                                                                             }}>
                                                                                                                 <button
                                                                                                                     className=" mt-4 btn btn-sm btn-danger p-1 ml-3"
                                                                                                                     style={{
                                                                                                                         backgroundColor: "deepskyblue",
                                                                                                                         borderColor: "deepskyblue"
                                                                                                                     }}>SES
                                                                                                                 </button>
                                                                                                                 <h1 className="skh4"
                                                                                                                     style={{
                                                                                                                         marginLeft: 15,
                                                                                                                         marginTop: 42
                                                                                                                     }}>
                                                                                                                     Simple
                                                                                                                     electronic
                                                                                                                     signature</h1>
                                                                                                             </div>
                                                                                                         </div>
                                                                                                     </div>
                                                                                                 </Draggable>
                                                                                             )
                                                                                         }
                                                                                         {
                                                                                             this.state.signatiaresEmails.length > 0 &&
                                                                                             <p style={{
                                                                                                 fontSize: "1.1rem",
                                                                                                 marginTop: 25
                                                                                             }}>
                                                                                                 Une invitation sera envoyé au
                                                                                                 signataires dés que vous validez
                                                                                                 votre signature.
                                                                                             </p>
                                                                                         }


                                                                                         {/*<button className="btn btn-danger btn-sm" onClick={this.convetHtmlToBase64}>convert</button>*/}

                                                                                     </div>
                                                                                 </div>
                                                                             </div>
                                                                         </div>
                                                                     </div>
                                                                 </div>
                                                             }
                                                             {
                                                                 this.state.showUploadStep === "successfulStep" &&
                                                                 <div>
                                                                     <div className="sk_detail_container">
                                                                         <div className="float-right">
                                                                             <button onClick={()=> this.setState({showUploadStep:"",selectedSideMenuItem:"ad"})}
                                                                                     className="btn-rounded btn-small btn-light"><i className="mdi mdi-close font-18 font-weight-bold"/></button>
                                                                         </div>
                                                                         <div className="mt-4">
                                                                             <h1 className="skh1" style={{fontSize: "2.0rem"}}>Les invitations à signer sont envoyée avec succès</h1>
                                                                             <p style={{fontSize: "1.2rem"}}>Vous serez averti par e-mail
                                                                                 dès la signature du document.</p>
                                                                             <div className="sk_detail_upload">
                                                                                 <div className="sk_detail_upload_pic">
                                                                                     <img src={this.state.uploadedThumb} alt=""
                                                                                          style={{maxWidth: "100%", maxHeight: "100%"}}/>
                                                                                 </div>
                                                                                 <div className="sk_detail_upload_text">
                                                                                     <div className="sk_detail_upload_text_row">
                                                                                         <strong
                                                                                             style={{color: "#293d66"}}>Document</strong><br/>
                                                                                         {this.state.uploadedName}
                                                                                     </div>
                                                                                     {
                                                                                         this.state.signMySelf === true &&
                                                                                         <div className="sk_detail_upload_text_row">
                                                                                             <strong style={{color: "#293d66"}}>Signataire
                                                                                                 1</strong><br/>
                                                                                             {localStorage.getItem("email")}
                                                                                         </div>
                                                                                     }
                                                                                     {
                                                                                         this.state.signatiaresEmails.map((item, key) =>
                                                                                             <div key={key}
                                                                                                  className="sk_detail_upload_text_row">
                                                                                                 <strong
                                                                                                     style={{color: "#293d66"}}>Signataire {this.state.signMySelf === true ? key + 2 : key + 1}</strong><br/>
                                                                                                 {localStorage.getItem("email")}
                                                                                             </div>
                                                                                         )
                                                                                     }
                                                                                 </div>
                                                                             </div>
                                                                         </div>
                                                                     </div>
                                                                     <div align="center" className="">
                                                                         <div className="btn-group">
                                                                             <button className="btn btn-lg btn-outline-blue"
                                                                                     onClick={this.showDocInPdfModal("http://51.158.97.220:3003" + this.state.uploadedPath)}>Visualiser
                                                                             </button>
                                                                             &nbsp;&nbsp;
                                                                             <button className="btn btn-lg btn-pink ">Télécharger
                                                                             </button>
                                                                         </div>
                                                                     </div>
                                                                 </div>

                                                             }
                                                         </div>
                                                     </div>
                                    </div>
                                </div>
                            </div>


                            <Drawer anchor="right" open={this.state.openRightMenu} onClose={()=>{this.setState({openRightMenu:false})}}>
                                <div  style={{width:340}}>
                                    <div style={{padding:"1.6rem 2rem"}}>
                                        <div className="rs_header">
                                            <h2 className="rs_header_title">
                                                {this.state.selectedDoc.title}
                                            </h2>
                                            <span className="badge bg-soft-warning text-warning p-1">En attente</span>
                                            <button className="btn btn-rounded btn-light btn-small rs_btn_close" onClick={()=>this.setState({openRightMenu:false})}>
                                                <i className="mdi mdi-close font-18 font-weight-bold"/></button>
                                        </div>
                                        <div className="rs_doc_actions">
                                            <IconButton aria-label="Visualiser" title="Visualiser" color="primary"
                                                        onClick={this.showDocInPdfModal("http://51.158.97.220:3003"+this.state.selectedDoc.path)}>
                                                <FindInPageOutlinedIcon />
                                            </IconButton>
                                            <IconButton aria-label="Télécharger" title="Télécharger" color="default" href={"http://51.158.97.220:3003"+this.state.selectedDoc.path} download={true} target="_blank">
                                                <CloudDownloadOutlinedIcon />
                                            </IconButton>
                                            <IconButton aria-label="Inviter" title="Inviter" color="primary" >
                                                <PersonAddOutlinedIcon />
                                            </IconButton>
                                            <IconButton aria-label="Supprimer" title="Supprimer" color="secondary" >
                                                <DeleteOutlineIcon />
                                            </IconButton>
                                        </div>
                                        <div className="rs_row">
                                            <div className="rs_row_icon">
                                                <PersonAddOutlinedIcon />
                                            </div>
                                            <div>
                                                <div className="rs_row_text">
                                                    <strong>Crée par</strong>
                                                </div>
                                                <div className="rs_row_text">
                                                    babba@yopmail.com
                                                </div>
                                            </div>
                                        </div>
                                        <div className="rs_row">
                                            <div className="rs_row_icon">
                                                <DateRangeOutlinedIcon />
                                            </div>
                                            <div>
                                                <div className="rs_row_text">
                                                    <strong>Créé le</strong>
                                                </div>
                                                <div className="rs_row_text">
                                                    {moment(this.state.selectedDoc.created_at).format("DD MMMM YYYY, HH:mm")}
                                                </div>
                                            </div>
                                        </div>
                                        <h3 className="rs_signers_title">Signataires</h3>
                                        {
                                            (this.state.selectedDoc.signers || []).map((signer,key) =>
                                                <div key={key} className="rs_row">
                                                    <div className="rs_row_icon">
                                                        <CreateOutlinedIcon color="secondary" />
                                                    </div>
                                                    <div>
                                                        <div className="rs_row_text">
                                                            <strong>Email</strong>
                                                        </div>
                                                        <div className="rs_row_text">
                                                            {signer.email}
                                                        </div>
                                                    </div>
                                                    <div className="rs_row_span rs_row_span">
                                                        <div className="badge bg-soft-warning text-warning p-1 ">En attente</div>
                                                    </div>
                                                </div>
                                            )
                                        }



                                    </div>

                                </div>

                            </Drawer>


                            <Modal isOpen={this.state.showPDFModal} size="lg"
                                   toggle={() => this.setState({showPDFModal: !this.state.showPDFModal})}>
                                <ModalHeader toggle={() => this.setState({showPDFModal: !this.state.showPDFModal})}>
                                    <h4>Document</h4>
                                </ModalHeader>
                                <ModalBody>
                                    <PDFViewer
                                        document={{
                                            url: this.state.pdfURL
                                        }}
                                        minScale={0.25}
                                        scaleStep={0.25}
                                        navbarOnTop
                                        loader={
                                            <h5 style={{color: '#fa5b35'}}>Chargement...</h5>
                                        }
                                        alert={
                                            <h5 style={{color: "red"}}>Une erreur s'est produite lors de chargement du
                                                doument !</h5>
                                        }
                                    />
                                </ModalBody>
                            </Modal>

                        </div>
                }
            </div>
        )
    }

}


export default CoffreFortNewVersion;