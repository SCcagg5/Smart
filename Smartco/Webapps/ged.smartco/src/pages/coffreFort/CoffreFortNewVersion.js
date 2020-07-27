import React from "react";
import {Modal, ModalBody, ModalHeader} from "reactstrap";
import moment from "moment";
import PDFViewer from "../../customComponents/pdf-viewer-reactjs";
import SearchResults from "../../components/Search/SearchResults";
import {FileUploader} from "baseui/file-uploader";
import axios from 'axios';
import {Button, SHAPE, SIZE} from 'baseui/button';
import Delete from 'baseui/icon/delete';
import {RadioGroup, Radio, ALIGN} from "baseui/radio";
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
import FireplaceIcon from '@material-ui/icons/Fireplace';
import TopBar from "../../components/TopBar/TopBar";
import logo from "../../assets/images/logos/logo-OA-dark.png";
import SideMenu from "../../components/SideMenu/SideMenu";
import data from "../../data/data";
import SmartService from "../../provider/SmartService";
import CircularProgress from '@material-ui/core/CircularProgress';
import LeftMenu from "../../components/Menu/LeftMenu";
import MuiBackdrop from "../../components/Loading/MuiBackdrop";
import emailService from "../../provider/emailService";

const endpoint = "http://51.210.4.161:8080";

const rooms = [
    {
        nodeId:"1",
        title:"Project Clover",
        desc:"***",
        icon:FireplaceIcon,
        assignedTo:[],
        tasks:[],
        chat:[],
        files:[],
        created_at: new Date(),
    },
    {
        nodeId:"2",
        title:"Salona vidéo",
        desc:"***",
        icon:FireplaceIcon,
        assignedTo:[],
        tasks:[],
        chat:[],
        files:[],
        created_at: new Date(),
    },
    {
        nodeId:"3",
        title:"It white papers",
        desc:"***",
        icon:FireplaceIcon,
        assignedTo:[],
        tasks:[],
        chat:[],
        files:[],
        created_at: new Date(),
    },
]

const getLabel = ({option}) => {
    return (
        <React.Fragment>
            <img src={option.image} alt="" style={{width: 30, height: 30}}/>&nbsp;&nbsp;
            {option.id}
        </React.Fragment>
    );
};

function callback(item) {
    console.log('item clicked', item);
}



class CoffreFortNewVersion extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            anchorEl:null,
            anchorElMenu:null,
            openRightMenu:false,

            selectedSieMenuItem: "coffre",
            openSideMenu: false,
            showSecondSideBar: false,
            loading: true,

            showPDFModal: false,
            pdfURL: "",

            textSearch: "",
            resultData: "",

            showAddDocForm: true,
            isDocUploaded: true,

            uploadedThumb: require("../../assets/icons/icon-pdf.png"),
            uploadedName: "",

            signDoc: "true",
            showBtnInviteSign: false,

            showInviteSignersForm: false,
            signMySelf: true,
            signatiaresEmails: [],
            inviteEmails: [],
            selectedSignatureType: {id: "Swiss law (ZertES)", image: swissImg},

            showPdfSignToAddForm: true,

            showUploadStep: "",  //upload  // upload_succes // inviteSigners  // signForm  // successfulStep

            selectedSideMenuItem: "dc",

            selectedDoc: "",

            folders: [],

            selectedFoldername: "",
            selectedFolderId:"",
            selectedFolderFiles: [],
            position: {
                x: 100,
                y: 100
            },
            items:[
                {
                    title:"Ajouter dossier",
                    callback: callback,
                },
                {
                    title:"Ajouter fichier",
                    callback: callback,
                }
            ],
            showNewDocScreen:false,
            popUpRightMenu:false,
            newFolderModal:false,

            newFolderName:"",
            newFolderFromRacine:false,
            loadDocSpinner:false,

            openDriveMenuItem:true,
            openMeetMenuItem:false,
            openRoomMenuItem:false,


            showContainerSection:"Drive",
            selectedMeetMenuItem:"",

            openMeeting:false,
            showInviteModal:false,
            showCodeMeetModal:false,
            meetUrl:"",
            meetCode:"",


        }
    }


    showDocInPdfModal = (url)  => {

        this.setState({
            openRightMenu: false,
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
                SmartService.getGed(localStorage.getItem("token"), localStorage.getItem("usrtoken")).then(gedRes => {
                    if (gedRes.succes === true && gedRes.status === 200) {
                        this.setState({folders: gedRes.data.Content.folders || [],selectedFoldername: gedRes.data.Content.folders[0].name,
                            selectedFolderId:gedRes.data.Content.folders[0].id,
                            selectedFolderFiles: gedRes.data.Content.folders[0].Content.files || [],loading: false})
                    } else {
                        this.setState({loading:false})
                        localStorage.clear();
                        this.props.history.push("/login")
                    }
                }).catch(err => {
                    this.setState({loading:false})
                    console.log(err)
                })

            }, 200);
        }

    }

    reloadGed = () => {
        this.setState({loading: true});
        setTimeout(() => {
            SmartService.getGed(localStorage.getItem("token"), localStorage.getItem("usrtoken")).then(gedRes => {
                if (gedRes.succes === true && gedRes.status === 200) {
                    //console.log(gedRes)
                    this.setState({folders: gedRes.data.Content.folders || [],selectedFoldername: gedRes.data.Content.folders[0].name,
                        selectedFolderId:gedRes.data.Content.folders[0].id,
                        selectedFolderFiles: gedRes.data.Content.folders[0].Content.files || [],loading:false})
                } else {
                    this.setState({loading: true});
                    localStorage.clear();
                    this.props.history.push("/login")
                }
            }).catch(err => {
                console.log(err)
                this.setState({loading: false});
            })
        }, 200);
    }

    /*convetHtmlToBase64 = (divId) => event => {
        htmlToImage.toPng(document.getElementById(divId))
            .then(function (dataUrl) {
                console.log(dataUrl);
            })
    }*/

    render() {


        return (
            <div>
                <TopBar logo={logo} height={90} onClickMenuIcon={() => this.setState({openSideMenu: true})}/>
                <SideMenu logo={logo} items={data.sideBarItems} iconColor={"blue"} textColor={"#65728E"}
                          history={this.props.history}
                          opened={this.state.openSideMenu} onClose={() => this.setState({openSideMenu: false})}/>
                <MuiBackdrop open={this.state.loading}/>

                <div style={{ marginRight: 50}}>
                            <div>
                                <div style={{display: "flex"}}>

                                        <div style={{height: "100%"}}>
                                            <div>
                                                <LeftMenu  openNewFolderModalFromRacine={() => this.setState({newFolderModal:true,newFolderFromRacine:true})}
                                                           openNewFolderModal={() => this.setState({newFolderModal:true}) }
                                                           showNewFileScreen={() => this.setState({showNewDocScreen:true,showUploadStep:"upload"})}
                                                           showDriveMenuItems={this.state.openDriveMenuItem} setShowDriveMenuItems={() => this.setState({openDriveMenuItem:!this.state.openDriveMenuItem})}
                                                           showRoomsMenuItems={this.state.openRoomMenuItem} setShowRoomsMenuItems={() => this.setState({openRoomMenuItem:!this.state.openRoomMenuItem})}
                                                           rooms={rooms}
                                                           showMeetMenuItems={this.state.openMeetMenuItem} setShowMeetMenuItems={() => this.setState({openMeetMenuItem:!this.state.openMeetMenuItem})}
                                                           driveFolders={this.state.folders || [] }
                                                           setFolderName={(name) => this.setState({selectedFoldername:name})}
                                                           setFolderId={(id) => this.setState({selectedFolderId:id,showContainerSection:"Drive"})}
                                                           setSelectedFolderFiles={(files) => this.setState({selectedFolderFiles:files})}
                                                           selectedDriveItem={this.state.showContainerSection === "Drive" && [this.state.selectedFolderId === "" ? this.state.folders.length > 0 ? this.state.folders[0].id : "" : this.state.selectedFolderId] }
                                                           selectedMeetItem={this.state.showContainerSection === "Meet" ? this.state.selectedMeetMenuItem === "nm" ? ["01"] : ["02"] : [] }
                                                           selectedRoomsItem={this.state.showContainerSection === "Rooms" ? ["1"] :[]}
                                                           onMeetItemClick={(nodeId) => {
                                                               if(nodeId === "01"){
                                                                   this.setState({showContainerSection:"Meet",selectedMeetMenuItem:"nm"})
                                                               }else if(nodeId === "02"){
                                                                   this.setState({showContainerSection:"Meet",selectedMeetMenuItem:"rm"})
                                                               }else{}
                                                           }}
                                                />

                                            </div>

                                        </div>

                                    <div style={{flexWrap: "wrap", flex: "1 1 auto"}}>
                                        <div className="card">
                                            <div className="card-body" style={{minHeight: 750}}>

                                                {
                                                    this.state.showContainerSection === "Drive" &&
                                                         <div>
                                                             {
                                                                 this.state.showNewDocScreen === false ?
                                                                     <div>
                                                                         <div style={{display:"flex",justifyContent:"space-between"}}>
                                                                             <div >
                                                                                 <h4 className="mt-0 mb-1">{this.state.selectedFoldername === "" ? "Mon drive" : this.state.selectedFoldername }</h4>
                                                                                 <h6><i className="fa fa-paperclip mb-1"/> Documents <span>({this.state.selectedFolderFiles.length})</span></h6>
                                                                             </div>
                                                                         </div>

                                                                         <div style={{flexWrap: "wrap", display: "flex"}}>

                                                                             {
                                                                                 this.state.folders.length === 0 ?
                                                                                     <div style={{marginTop:25,display:"flex"}}>
                                                                                         <h5 style={{fontSize:16,color:"gray"}}>Aucun dossier encore ajouté ! </h5>&nbsp;&nbsp;
                                                                                         <h6 style={{cursor:"pointer",color:"#000",textDecoration:"underline"}} onClick={() => {
                                                                                             this.setState({newFolderModal:true,newFolderFromRacine:true})
                                                                                         }}>
                                                                                             Ajouter un dossier</h6>
                                                                                     </div> :
                                                                                     (this.state.selectedFolderFiles || []).map((item, key) =>
                                                                                             <div key={key} className="cf_itemDoc">
                                                                        <span
                                                                            className="cf-itemDoc_preview"
                                                                            onClick={() => {
                                                                                this.setState({
                                                                                    selectedDoc: item, openRightMenu: true
                                                                                })
                                                                            }}>
                                                                            <img alt="" src={item.thumbnail || require("../../assets/icons/icon-pdf.png")}
                                                                                 className={item.thumbnail ? "cf-itemDoc_preview_image" : "cf-itemDoc_preview_staticImg"}/>
                                                                            <div className="cf_itemDoc_preview_details">
                                                                                <div className="cf_itemDoc_preview_details_title">
                                                                                    {item.name + ".pdf"}
                                                                                </div>
                                                                                <span className="badge bg-soft-warning text-warning font-weight-bolder p-1">En attente</span>
                                                                            </div>

                                                                        </span>
                                                                                             </div>
                                                                                     )
                                                                             }
                                                                         </div>
                                                                     </div>
                                                                     :
                                                                     <div>
                                                                         {
                                                                             this.state.showUploadStep === "upload" &&
                                                                             <div>
                                                                                 <div className="">
                                                                                     <button className="btn btn-sm btn-light"
                                                                                             onClick={() => this.setState({showNewDocScreen: false})}>
                                                                                         <i className="mdi mdi-arrow-left font-16"
                                                                                            style={{
                                                                                                color: "#000",
                                                                                                fontWeight: "bold"
                                                                                            }}/>&nbsp;
                                                                                         Retour
                                                                                     </button>
                                                                                 </div>
                                                                                 <div align="center" className="mt-5">
                                                                                     <h1 className="skh1">Télécharger un
                                                                                         document</h1>
                                                                                     <p style={{fontSize: "1rem"}} className="mt-2">
                                                                                         Faites glisser et déposez un documents PDF
                                                                                         sur le
                                                                                         terrain ou sélectionnez un fichier
                                                                                         depuis votre ordinateur.</p>

                                                                                     <div className="sk_elupload_drag">
                                                                                         <FileUploader
                                                                                             onCancel={() => {
                                                                                             }}

                                                                                             onDrop={(acceptedFiles, rejectedFiles) => {
                                                                                                 console.log(acceptedFiles[0])
                                                                                                 console.log(this.state.selectedFolderId)
                                                                                                 console.log(this.state.selectedFoldername)
                                                                                                 let formData = new FormData();
                                                                                                 formData.append("file", acceptedFiles[0])
                                                                                                 this.state.selectedFolderId !== "" && formData.append("folder_id", this.state.selectedFolderId)
                                                                                                 axios.request({
                                                                                                     method: "POST",
                                                                                                     url: endpoint+"/ged/addfile",
                                                                                                     data: formData,
                                                                                                     headers: {'Content-Type': 'multipart/form-data','token':localStorage.getItem('token'),
                                                                                                         'usrtoken':localStorage.getItem('usrtoken')},
                                                                                                     onUploadProgress: (p) => {
                                                                                                         console.log(p);
                                                                                                         this.setState({
                                                                                                             progressUpload: (p.loaded / p.total) * 100
                                                                                                         })
                                                                                                     }

                                                                                                 }).then( res => {
                                                                                                     if (res.data.succes === true && res.data.status === 200) {

                                                                                                         SmartService.getFile(res.data.data.file_id,localStorage.getItem("token"),localStorage.getItem("usrtoken")).then( fileRes => {
                                                                                                             if (fileRes.succes === true && fileRes.status === 200) {

                                                                                                                 this.setState({
                                                                                                                     progressUpload: undefined,
                                                                                                                     showUploadStep: "upload_succes",
                                                                                                                     uploadedName: fileRes.data.name+".pdf",
                                                                                                                     uploadedPath: fileRes.data.Content.Data
                                                                                                                 })

                                                                                                             }else{
                                                                                                                 console.log(fileRes.error)
                                                                                                             }
                                                                                                         }).catch(err => {
                                                                                                             console.log(err);
                                                                                                         })

                                                                                                     }else{
                                                                                                         console.log(res.error)
                                                                                                     }


                                                                                                 }).catch( err => {
                                                                                                     console.log(err)
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
                                                                                             <img className="cf-itemDoc_preview_staticImgUploaded"
                                                                                                  alt=""
                                                                                                  src={this.state.uploadedThumb}/>
                                                                                         </div>
                                                                                         <div className="sk_upload_filename">
                                                                                             {this.state.uploadedName}
                                                                                         </div>
                                                                                         <Button shape={SHAPE.round} size={SIZE.mini}
                                                                                                 onClick={() => {}}>
                                                                                             <Delete/>
                                                                                         </Button>

                                                                                         <div className="mt-2"
                                                                                              style={{display: "contents"}}>
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
                                                                                     <h1 className="skh1"
                                                                                         style={{fontSize: "1.7rem"}}>
                                                                                         Invitez les gens à signer
                                                                                     </h1>
                                                                                     <p style={{fontSize: "1.0rem"}}
                                                                                        className="mt-2">
                                                                                         Saisissez l'adresse e-mail des personnes qui
                                                                                         doivent
                                                                                         signer ce document.
                                                                                     </p>
                                                                                     <div className="mt-4">
                                                                                         <strong style={{
                                                                                             color: "#293d66",
                                                                                             fontSize: "1.1rem"
                                                                                         }}>Vous
                                                                                             vous signez ?</strong>
                                                                                         <div
                                                                                             className={this.state.signMySelf === true ? "sk_signmyself sk_signmyself_active" : "sk_signmyself"}>
                                                                                             <div className="sk_signmyself_text">
                                                                                                 {localStorage.getItem("email")}
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
                                                                                                 style={{
                                                                                                     color: "#293d66",
                                                                                                     fontSize: "1.1rem"
                                                                                                 }}>Ajouter
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
                                                                                                         <div data-tag=""
                                                                                                              key={index}>
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
                                                                                                 Message à tous les
                                                                                                 signataires</strong>
                                                                                             <div style={{width: "70%"}}
                                                                                                  className="mt-1">
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
                                                                                                     base64: this.state.uploadedPath
                                                                                                 }}
                                                                                                 minScale={0.25}
                                                                                                 scale={1.05}
                                                                                                 navbarOnTop={true}

                                                                                                 scaleStep={0.25}
                                                                                                 loader={
                                                                                                     <h5 style={{color: '#fa5b35'}}>Chargement...</h5>
                                                                                                 }
                                                                                                 alert={
                                                                                                     <h5 style={{color: "red"}}>Une
                                                                                                         erreur s'est
                                                                                                         produite lors de chargement
                                                                                                         du
                                                                                                         doument !</h5>
                                                                                                 }
                                                                                             />
                                                                                         </div>
                                                                                         <div className="sk_signatures_viewr">
                                                                                             <div
                                                                                                 className="sk_signatures_viewr_content">
                                                                                                 <div className="btn-group mb-2">
                                                                                                     <button
                                                                                                         className="btn font-weight-bold   btn-light"
                                                                                                         onClick={() => this.setState({showUploadStep: "inviteSigners"})}>Retour
                                                                                                     </button>
                                                                                                     &nbsp;&nbsp;
                                                                                                     <button
                                                                                                         className="btn custom_p_btn  btn-blue"
                                                                                                         onClick={() => {
                                                                                                             this.setState({loading: true})
                                                                                                             let docs = this.state.documents || [];
                                                                                                             let signers = [];
                                                                                                             let signataires = this.state.signatiaresEmails;
                                                                                                             if (this.state.signMySelf === true) {
                                                                                                                 signers.push({
                                                                                                                     email: localStorage.getItem("email"),
                                                                                                                     signature: "",
                                                                                                                     signed_at: new Date(),
                                                                                                                     key: 1
                                                                                                                 })
                                                                                                             }
                                                                                                             signataires.map((item, key) => {
                                                                                                                 signers.push({
                                                                                                                     email: item,
                                                                                                                     signature: "",
                                                                                                                     signed_at: "",
                                                                                                                     key: this.state.signMySelf === true ? key + 2 : key + 1
                                                                                                                 })
                                                                                                                 return null;
                                                                                                             })

                                                                                                             docs.push({
                                                                                                                 title: this.state.uploadedName,
                                                                                                                 type: "ad",
                                                                                                                 desc: "",
                                                                                                                 thumbnail: this.state.uploadedThumb,
                                                                                                                 path: this.state.uploadedPath,
                                                                                                                 created_at: new Date(),
                                                                                                                 signers: signers,
                                                                                                             })
                                                                                                             this.setState({showUploadStep: "successfulStep",loading:false})
                                                                                                         }}>
                                                                                                         <h1 className="skh_btn">
                                                                                                             {
                                                                                                                 this.state.signMySelf === true ? "Signer maintenant" : "Envoyer les invitations"
                                                                                                             }
                                                                                                         </h1>
                                                                                                     </button>
                                                                                                 </div>
                                                                                                 <h1 className="skh1">Positionnez les
                                                                                                     champs de
                                                                                                     signature</h1>
                                                                                                 <p style={{fontSize: "1.1rem"}}>
                                                                                                     Faites glisser et déposez les
                                                                                                     champs de
                                                                                                     signature à l'endroit où les
                                                                                                     gens doivent
                                                                                                     signer.</p>
                                                                                                 <div style={{marginTop: "2.8rem"}}>
                                                                                                     {
                                                                                                         this.state.signMySelf === true &&
                                                                                                         <Draggable>
                                                                                                             <div
                                                                                                                 className="sk_signature_sticker">
                                                                                                                 <div
                                                                                                                     id={"sk_signature"}
                                                                                                                     className="sk_signature_card p-1">
                                                                                                                     <div
                                                                                                                         align="center">
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
                                                                                                                             Simple
                                                                                                                             electronic
                                                                                                                             signature</h1>
                                                                                                                     </div>
                                                                                                                 </div>
                                                                                                             </div>
                                                                                                         </Draggable>
                                                                                                     }
                                                                                                     {
                                                                                                         this.state.signatiaresEmails.map((item, key) =>
                                                                                                             <Draggable key={key}>
                                                                                                                 <div
                                                                                                                     className="sk_signature_sticker">
                                                                                                                     <div
                                                                                                                         id={"sk_signature" + key}
                                                                                                                         className="sk_signature_card p-1">
                                                                                                                         <div
                                                                                                                             align="center">
                                                                                                                             <h1 className="skh3">{item}</h1>
                                                                                                                         </div>
                                                                                                                         <div
                                                                                                                             style={{
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
                                                                                                             Une invitation sera
                                                                                                             envoyé au
                                                                                                             signataires dés que vous
                                                                                                             validez
                                                                                                             votre signature.
                                                                                                         </p>
                                                                                                     }

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
                                                                                         <button onClick={() =>{
                                                                                             this.setState({
                                                                                                 showUploadStep: "",
                                                                                                 showNewDocScreen: false
                                                                                             })
                                                                                             this.reloadGed()
                                                                                         } }
                                                                                                 className="btn-rounded btn-small btn-light">
                                                                                             <i className="mdi mdi-close font-18 font-weight-bold"/>
                                                                                         </button>
                                                                                     </div>
                                                                                     <div className="mt-4">
                                                                                         <h1 className="skh1"
                                                                                             style={{fontSize: "2.0rem"}}>Les
                                                                                             invitations à signer sont envoyée avec
                                                                                             succès</h1>
                                                                                         <p style={{fontSize: "1.2rem"}}>Vous serez
                                                                                             averti par e-mail
                                                                                             dès la signature du document.</p>
                                                                                         <div className="sk_detail_upload">
                                                                                             <div className="sk_detail_upload_pic">
                                                                                                 <img src={this.state.uploadedThumb}
                                                                                                      alt=""
                                                                                                      style={{
                                                                                                          maxWidth: "100%",
                                                                                                          maxHeight: "100%"
                                                                                                      }}/>
                                                                                             </div>
                                                                                             <div className="sk_detail_upload_text">
                                                                                                 <div
                                                                                                     className="sk_detail_upload_text_row">
                                                                                                     <strong
                                                                                                         style={{color: "#293d66"}}>Document</strong><br/>
                                                                                                     {this.state.uploadedName}
                                                                                                 </div>
                                                                                                 {
                                                                                                     this.state.signMySelf === true &&
                                                                                                     <div
                                                                                                         className="sk_detail_upload_text_row">
                                                                                                         <strong
                                                                                                             style={{color: "#293d66"}}>Signataire
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
                                                                                         <button
                                                                                             className="btn btn-lg btn-outline-blue"
                                                                                             onClick={() => this.showDocInPdfModal(this.state.uploadedPath)}>Visualiser
                                                                                         </button>
                                                                                         &nbsp;&nbsp;
                                                                                         <button
                                                                                             className="btn btn-lg btn-pink ">Télécharger
                                                                                         </button>
                                                                                     </div>
                                                                                 </div>
                                                                             </div>
                                                                         }

                                                                     </div>
                                                             }
                                                         </div>

                                                }
                                                {
                                                    this.state.showContainerSection === "Meet" &&
                                                         <div>
                                                             <h4 className="mt-0 mb-1">Meet</h4>
                                                             {
                                                                 this.state.selectedMeetMenuItem === "nm" ?
                                                                     <div align="center" style={{marginTop:200}}>
                                                                         <h3>Prêt pour la réunion ?</h3>
                                                                         <p style={{cursor:"pointer",textDecoration:"underline"}}>{this.state.meeturl}</p>
                                                                         <div style={{display:"block"}}>
                                                                             <button className="btn btn-rounded btn-outline-success" style={{fontWeight:"normal",marginRight:15}}
                                                                                     onClick={() => {
                                                                                         window.open(this.state.meeturl,"_blank")
                                                                                     }}
                                                                             >
                                                                                 Participer à la réunion
                                                                             </button>
                                                                             <button onClick={() => {this.setState({showInviteModal:true})}}
                                                                                     className="btn btn-rounded btn-outline-info" style={{fontWeight:"normal"}}>
                                                                                 Ajouter des participants
                                                                             </button>
                                                                         </div>

                                                                     </div>

                                                                     :

                                                                     <div align="center" style={{marginTop:200}}>
                                                                         <h3>Vous avez un code de réunion ?</h3>
                                                                         <p style={{fontFamily:"sans-serif"}}>
                                                                             Pour participer à une réunion, saisissez le code de réunion fourni par l'organisateur ou récu par mail
                                                                         </p>
                                                                         <div style={{marginTop:20}}>
                                                                             <input className="form-control" style={{height:40,width:400}}
                                                                                    onChange={event => this.setState({meetCode:event.target.value})}
                                                                                    placeholder="Exemple de code: meet_21072020184528"/>
                                                                         </div>
                                                                         <button className="btn btn-rounded btn-success mt-3" disabled={this.state.meetCode === ""} style={{fontWeight:"normal",marginRight:15}}
                                                                                 onClick={() => {
                                                                                     window.open("https://meet.smartdom.ch/meet_"+this.state.meetCode,"_blank")
                                                                                 }}
                                                                         >
                                                                             Participer
                                                                         </button>
                                                                     </div>
                                                             }
                                                         </div>
                                                }


                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>


                            <Drawer anchor="right" open={this.state.openRightMenu} onClose={() => {
                                this.setState({openRightMenu: false})
                            }}>
                                <div style={{width: 340}}>
                                    <div style={{padding: "1.6rem 2rem"}}>
                                        <div className="rs_header">
                                            <h2 className="rs_header_title">
                                                {this.state.selectedDoc.name}
                                            </h2>
                                            <span className="badge bg-soft-warning text-warning p-1">En attente</span>
                                            <button className="btn btn-rounded btn-light btn-small rs_btn_close"
                                                    onClick={() => this.setState({openRightMenu: false})}>
                                                <i className="mdi mdi-close font-18 font-weight-bold"/></button>
                                        </div>
                                        <div className="rs_doc_actions">
                                            <IconButton aria-label="Visualiser" title="Visualiser" color="primary"
                                                        onClick={() => {
                                                            this.setState({loadDocSpinner:true})
                                                            SmartService.getFile(this.state.selectedDoc.id,localStorage.getItem("token"),localStorage.getItem("usrtoken")).then( fileRes => {
                                                                console.log(fileRes)
                                                                if (fileRes.succes === true && fileRes.status === 200) {
                                                                    this.setState({loadDocSpinner:false})
                                                                    this.showDocInPdfModal(fileRes.data.Content.Data)
                                                                }else{
                                                                    console.log(fileRes.error)
                                                                }
                                                            }).catch(err => console.log(err))
                                                        }}>
                                                <FindInPageOutlinedIcon/>
                                            </IconButton>
                                            <IconButton aria-label="Télécharger" title="Télécharger" color="default"
                                                        //href={this.state.selectedDoc.path}
                                                        download={true} target="_blank">
                                                <CloudDownloadOutlinedIcon/>
                                            </IconButton>
                                            <IconButton aria-label="Inviter" title="Inviter" color="primary">
                                                <PersonAddOutlinedIcon/>
                                            </IconButton>
                                            <IconButton aria-label="Supprimer" title="Supprimer" color="secondary">
                                                <DeleteOutlineIcon/>
                                            </IconButton>
                                        </div>
                                        <div className="rs_row">
                                            <div className="rs_row_icon">
                                                <PersonAddOutlinedIcon/>
                                            </div>
                                            <div>
                                                <div className="rs_row_text">
                                                    <strong>Crée par</strong>
                                                </div>
                                                <div className="rs_row_text">
                                                    {localStorage.getItem("email")}
                                                </div>
                                            </div>
                                        </div>
                                        <div className="rs_row">
                                            <div className="rs_row_icon">
                                                <DateRangeOutlinedIcon/>
                                            </div>
                                            <div>
                                                <div className="rs_row_text">
                                                    <strong>Créé le</strong>
                                                </div>
                                                <div className="rs_row_text">
                                                    {moment(parseInt(this.state.selectedDoc.date)).format("DD MMMM YYYY, HH:mm")}
                                                </div>
                                            </div>
                                        </div>
                                        <h3 className="rs_signers_title">Signataires</h3>
                                        {
                                            (this.state.selectedDoc.signers || []).map((signer, key) =>
                                                <div key={key} className="rs_row">
                                                    <div className="rs_row_icon">
                                                        <CreateOutlinedIcon color="secondary"/>
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
                                                        <div className="badge bg-soft-warning text-warning p-1 ">En
                                                            attente
                                                        </div>
                                                    </div>
                                                </div>
                                            )
                                        }

                                        {
                                            this.state.loadDocSpinner === true &&
                                            <div align="center" style={{marginTop:120}}>
                                                <CircularProgress color="secondary" />
                                            </div>

                                        }


                                    </div>

                                </div>

                            </Drawer>


                            <Modal isOpen={this.state.showPDFModal} size="lg"
                                   toggle={() => this.setState({showPDFModal: !this.state.showPDFModal})}>
                                <ModalHeader toggle={() => this.setState({showPDFModal: !this.state.showPDFModal})}>
                                    Document
                                </ModalHeader>
                                <ModalBody>
                                    <PDFViewer
                                        document={{
                                            base64: this.state.pdfURL
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


                            <Modal isOpen={this.state.newFolderModal} size="md" centered={true}
                                   toggle={() => this.setState({newFolderModal: !this.state.newFolderModal,newFolderFromRacine:false})}>
                                <ModalHeader toggle={() => this.setState({newFolderModal: !this.state.newFolderModal,newFolderFromRacine:false})}>
                                    Nouveau doossier
                                </ModalHeader>
                                <ModalBody>

                                    <div style={{marginTop:35}}>
                                        <input className="form-control" placeholder="Nom du dossier" onChange={event => this.setState({newFolderName:event.target.value})}/>
                                    </div>
                                    <div style={{marginTop:15,textAlign:"right"}}>
                                        <button className="btn btn-success  font-weight-normal" style={{fontFamily:"sans-serif"}}
                                                onClick={() => {
                                                    SmartService.addFolder({
                                                        name:this.state.newFolderName,
                                                        folder_id:this.state.newFolderFromRacine === true ? null : this.state.selectedFolderId
                                                    },localStorage.getItem("token"),localStorage.getItem("usrtoken")).then( addfolderRes => {
                                                        console.log(addfolderRes)
                                                        if (addfolderRes.succes === true && addfolderRes.status === 200) {
                                                            this.reloadGed();
                                                            setTimeout(() => {
                                                                this.setState({newFolderModal:false,newFolderFromRacine:false})
                                                            },500)
                                                        }else{
                                                            console.log(addfolderRes.error)
                                                        }
                                                    }).catch(err => {
                                                        console.log(err);
                                                    })
                                                }}
                                        >
                                            Ajouter
                                        </button>
                                    </div>

                                </ModalBody>
                            </Modal>

                            <Modal isOpen={this.state.showInviteModal} size="md" centered={true}
                                   toggle={() => this.setState({showInviteModal: !this.state.showInviteModal})}>
                        <ModalHeader toggle={() => this.setState({showInviteModal: !this.state.showInviteModal})}>
                            Ajouter des participants
                        </ModalHeader>
                        <ModalBody>
                            <p style={{fontFamily:"sans-serif",marginTop:25}}>Partagez ces informations avec les personnes que vous souhaitez inviter à la réunion.</p>
                            <p style={{fontFamily:"sans-serif",color:"#000"}}>{this.state.meeturl}</p>
                            <div style={{backgroundColor:"#d3d3d3",height:1}}/>
                            <div align="center" style={{marginTop:30}}>
                                <h5>Ou</h5>
                                {/*<button className="btn btn-rounded btn-light">Ajouter</button>*/}
                            </div>
                            <h4 className="text-success"><i className="fe-user-plus text-success"/>&nbsp;Inviter</h4>
                            <p style={{fontFamily:"sans-serif"}}>Tapez sur 'Entrée' pour valider une adresse mail</p>
                            <ReactMultiEmail
                                style={{maxWidth:"100%",width:"100%",fontFamily:"sans-serif",fontWeight:"normal"}}
                                placeholder="Saisissez une adresse mail"
                                emails={this.state.inviteEmails}
                                onChange={(_emails) => {
                                    this.setState({inviteEmails: _emails});
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
                            <div style={{marginTop:15,textAlign:"right"}}>
                                <button className="btn btn-success  font-weight-normal" style={{fontFamily:"sans-serif"}}
                                        disabled={this.state.inviteEmails.length === 0}
                                        onClick={() => {
                                            emailService.sendMailsWithurl({
                                                recipients:this.state.inviteEmails,
                                                subject:"Invitation pour rejoindre une réunion sur OALegal",

                                                linkUrl:"Cliquer ici pour réjoindre la réunion",
                                                url:this.state.meeturl,

                                                msg:"Bonjour, <br> Vous etes invité à réjoindre une réunion sur oalegal.org . <br> Cliquer sur ce lien pour accéder directement.<br><br>",

                                                footerMsg:"<br><br> Cordialement"
                                            }).then( ok => {
                                                this.openSnackbar("success","Les invitations sont bien envoyées au participants !")
                                                this.setState({showInviteModal:false})
                                            }).catch(err => {
                                                console.log(err);
                                                this.openSnackbar("error",err)
                                            })
                                        }}
                                >
                                    Envoyer e-mail
                                </button>
                            </div>

                        </ModalBody>
                    </Modal>

                        </div>
            </div>
        )
    }

}


export default CoffreFortNewVersion;