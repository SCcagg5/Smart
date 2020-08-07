import React from "react";
import {Modal, ModalBody, ModalHeader} from "reactstrap";
import moment from "moment";
import PDFViewer from "../../customComponents/pdf-viewer-reactjs";
import {FileUploader} from "baseui/file-uploader";
import axios from 'axios';
import {Button, SHAPE, SIZE} from 'baseui/button';
import Delete from 'baseui/icon/delete';
import {ALIGN, Radio, RadioGroup} from "baseui/radio";
import "firebase/database"
import {Checkbox, LABEL_PLACEMENT, STYLE_TYPE} from "baseui/checkbox";
import {isEmail, ReactMultiEmail} from 'react-multi-email';
import '../../assets/css/multiEmail.css';
import {Select} from 'baseui/select';
import swissImg from "../../assets/images/flags/swiss.svg"
import euImg from "../../assets/images/flags/eu.svg"
import frImg from "../../assets/images/flags/france.png"
import {Textarea} from "baseui/textarea";
import Draggable from "react-draggable";
/*import htmlToImage from 'html-to-image';*/
import Drawer from "@material-ui/core/Drawer";
import IconButton from '@material-ui/core/IconButton';
import CloudDownloadOutlinedIcon from '@material-ui/icons/CloudDownloadOutlined';
import PersonAddOutlinedIcon from '@material-ui/icons/PersonAddOutlined';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import DateRangeOutlinedIcon from '@material-ui/icons/DateRangeOutlined';
import CreateOutlinedIcon from '@material-ui/icons/CreateOutlined';
import FindInPageOutlinedIcon from '@material-ui/icons/FindInPageOutlined';
import AutorenewIcon from '@material-ui/icons/Autorenew';
import ListIcon from '@material-ui/icons/List';
import ViewComfyIcon from '@material-ui/icons/ViewComfy';
import LanguageIcon from '@material-ui/icons/Language';
import CheckCircle from '@material-ui/icons/CheckCircle';
import Staricon from '@material-ui/icons/Star';
import FolderIcon from '@material-ui/icons/Folder';
import MoodIcon from '@material-ui/icons/Mood';
import TopBar from "../../components/TopBar/TopBar";
import logo from "../../assets/images/logos/logo-OA-dark.png";
import SideMenu from "../../components/SideMenu/SideMenu";
import data from "../../data/Data";
import SmartService from "../../provider/SmartService";
import CircularProgress from '@material-ui/core/CircularProgress';
import LeftMenu from "../../components/Menu/LeftMenu";
import MuiBackdrop from "../../components/Loading/MuiBackdrop";
import emailService from "../../provider/emailService";
import Snackbar from "@material-ui/core/Snackbar";
import firebase from "firebase";
import defaultAvatar from "../../assets/images/users/default_avatar.jpg";
import {
    Button as MuiButton,
    Checkbox as MuiCheckbox,
    Chip,
    FormControl,
    Input,
    InputLabel,
    MenuItem,
    Select as MuiSelect,
} from '@material-ui/core';
import {Tab, TabList, TabPanel, Tabs} from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import Resume from "../../components/Pdf/Resume";
import {PDFViewer as PdfView} from '@react-pdf/renderer';
import countryList from "../../tools/countryList";
import FlipPage from "react-flip-page"
import FHeader from "../../components/FlipPages/FHeader";
import FTitle from "../../components/FlipPages/FTitle";
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Chips from '../../components/EmailsInputChips/Chips';
import PersonAddIcon from "@material-ui/icons/PersonAdd"
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import Alert from '@material-ui/lab/Alert';
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import CheckBoxIcon from '@material-ui/icons/CheckBox';
import FormControlLabel from '@material-ui/core/FormControlLabel';

const pattern = new RegExp(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/);

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

const getLabel = ({option}) => {
    return (
        <React.Fragment>
            <img src={option.image} alt="" style={{width: 30, height: 30}}/>&nbsp;&nbsp;
            {option.id}
        </React.Fragment>
    );
};

let expanded = [];
let index = {}

function callback(item) {
    console.log('item clicked', item);
}


class Drive extends React.Component {


    state = {

        openAlert: false,
        alertMessage: '',
        alertType: '',

        anchorEl: null,
        anchorElMenu: null,
        openRightMenu: false,

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
        sharedDrive:[],
        rootFiles:[],

        selectedFoldername: "",
        breadcrumbs:"",
        selectedFolderId: "",
        selectedFolderFiles: [],
        position: {
            x: 100,
            y: 100
        },
        items: [
            {
                title: "Ajouter dossier",
                callback: callback,
            },
            {
                title: "Ajouter fichier",
                callback: callback,
            }
        ],
        showNewDocScreen: false,
        popUpRightMenu: false,
        newFolderModal: false,

        newFolderName: "",
        newFolderFromRacine: false,
        loadDocSpinner: false,

        openDriveMenuItem: true,
        openMeetMenuItem: false,
        openRoomMenuItem: false,
        openContactsMenu: false,

        showContainerSection: "Drive",
        selectedMeetMenuItem: "",

        openMeeting: false,
        showInviteModal: false,
        showCodeMeetModal: false,
        meetUrl: "",
        meetCode: "",


        contacts: [],
        openRightContactModalDetail: false,
        selectedContact: "",
        selectedContactKey: "",
        editContactForm: false,
        showModalAdd: false,
        add: "",
        domaine:{
            domaine:"",
            specialite:[],
        },
        formationTmp: '',
        fonctionTmp: '',
        parcourTmp:'',
        langueTmp:'',
        hobbiesTmp:'',
        affiliationTmp: '',

        showPdfPreviewModal:false,
        isDocPreviewReady:false,

        showPdfFlipModal:false,

        openShareDocModal:false,
        checkedNotif:true,
        msgNotif:"",
        emailsDriveShare:[],


        focusedItem:"Drive",  // => Drive || Rooms || Meet || Contacts
        expanded:[]

    }

    imageUpload = {};

    showDocInPdfModal = (url) => {

        this.setState({
            openRightMenu: false,
            showPDFModal: true,
            pdfURL: url
        });
    };

    /*async uploadImage(image) {

        this.setState({loading:true});
        var storageRef = firebase.storage().ref().child('/OALegal/images/' + image.target.files[0].name);
        var file = image.target.files[0];
        var uploadTask = storageRef.put(file);


        uploadTask.on('state_changed', snapshot => {

            //this.uploadPercent = progress.toFixed(2) + ' %';
            switch (snapshot.state) {
                case firebase.storage.TaskState.PAUSED: // or 'paused'
                    console.log('Upload is paused');
                    break;
                case firebase.storage.TaskState.RUNNING: // or 'running'
                    console.log('Upload is running');
                    break;
            }
        }, error => {
            console.log(error);
        }, () => {

            uploadTask.snapshot.ref.getDownloadURL().then(downloadURL => {
                console.log('File available at', downloadURL);
                let fiduciaire = this.state.fiduciaire;
                fiduciaire.imageUrl = downloadURL;
                this.setState({
                    fiduciaire: fiduciaire
                });
                this.setState({loading:false});
                firebase.database().ref('contacts').update({
                    [localStorage.getItem('uid')] : this.state.fiduciaire
                }).then(res => {
                    localStorage.setItem('user', JSON.stringify(this.state.fiduciaire));
                    this.openSnackbar('success', "Votre photo de profil est changé avec succès");
                });
            });
        });

    };*/


    componentDidMount() {

        let sharedDrive = [];

        if (localStorage.getItem('email') === undefined || localStorage.getItem('email') === null) {
            this.props.history.push('/login')
        } else {
            this.setState({loading: true});
            setTimeout(() => {
                SmartService.getGed(localStorage.getItem("token"), localStorage.getItem("usrtoken")).then(gedRes => {

                    if (gedRes.succes === true && gedRes.status === 200) {

                        let meeturl = "https://meet.smartdom.ch/meet_" + moment().format("DDMMYYYYHHmmss")

                        firebase.database().ref('/contacts').on('value', (snapshot) => {
                            const contacts = snapshot.val() || [];
                            let sharedFolders = gedRes.data.Shared.Content.folders || [];
                            let calls = [];
                            for(let i = 0 ; i < sharedFolders.length ; i++){
                                calls.push(SmartService.getFile(sharedFolders[i].id,localStorage.getItem("token"),localStorage.getItem("usrtoken")))
                            }
                            Promise.all(calls).then( response => {
                                console.log(response)
                                response.map((item,key) => {
                                    sharedDrive.push(item.data)
                                })
                                if(this.props.match.params.folder_id === "0" ){
                                    this.setState({
                                        rootFiles: gedRes.data.Proprietary.Content.files || [],
                                        folders: gedRes.data.Proprietary.Content.folders || [],
                                        sharedDrive: sharedDrive,
                                        meeturl: meeturl,
                                        contacts: contacts,
                                        loading: false

                                    })
                                }else{
                                    let folders = gedRes.data.Proprietary.Content.folders || [];
                                    let folder_name = this.getFolderNameById(this.props.match.params.folder_id,folders.concat(sharedDrive));
                                    this.setState({
                                        folders: folders,
                                        rootFiles: gedRes.data.Proprietary.Content.files || [],
                                        expanded:this.expandAll(this.props.match.params.folder_id,folders.concat(sharedDrive)).concat(["shared"]),
                                        sharedDrive: sharedDrive,
                                        selectedFoldername: folder_name ,
                                        breadcrumbs:this.getBreadcumpsPath(this.props.match.params.folder_id,folders.concat(sharedDrive)),
                                        selectedFolderId:this.props.match.params.folder_id ,
                                        meeturl: meeturl,
                                        contacts: contacts,
                                        selectedFolderFiles: this.getFolderFilesById(this.props.match.params.folder_id,folders.concat(sharedDrive)),
                                        loading: false
                                    })
                                }

                            }).catch( err => {
                                console.log(err);
                            })
                            /*for (let i = 0 ; i < sharedFolders.length ; i++ ){
                                SmartService.getFile(sharedFolders[i].id,localStorage.getItem("token"),localStorage.getItem("usrtoken")).then( det => {
                                    //console.log(det)
                                    if (det.succes === true && det.status === 200) {
                                        let details = det.data;
                                        sharedDrive.push(details);
                                    }else{
                                        console.log(det.error)
                                    }
                                }).catch( err => {
                                    console.log(err)
                                })
                            }*/



                        });

                    } else {
                        this.setState({loading: false})
                        localStorage.clear();
                        this.props.history.push("/login")
                    }
                }).catch(err => {
                    this.setState({loading: false})
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
                    let folder_name = this.getFolderNameById(this.props.match.params.folder_id,gedRes.data.Proprietary.Content.folders || []);
                    this.setState({
                        folders: gedRes.data.Proprietary.Content.folders || [],
                        rootFiles: gedRes.data.Proprietary.Content.files || [],
                        expanded:this.expandAll(this.props.match.params.folder_id,gedRes.data.Proprietary.Content.folders),
                        selectedFoldername: gedRes.data.Proprietary.Content.folders[0] ? gedRes.data.Proprietary.Content.folders[0].name :  "",
                        selectedFolderId: gedRes.data.Proprietary.Content.folders[0] ? gedRes.data.Proprietary.Content.folders[0].id : "",
                        selectedFolderFiles: gedRes.data.Proprietary.Content.folders[0] ? gedRes.data.Proprietary.Content.folders[0].Content.files : [],
                        loading: false
                    })
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

    openSnackbar = (type, msg) => {
        this.setState({
            openAlert: true,
            alertMessage: msg, //***
            alertType: type
        });
    };

    closeSnackbar = (event, reason) => {
        if (reason === 'clickaway') return;
        this.setState({openAlert: false});
    };

    addItem = (type) => event => {
        if (type === 'domaine') {

            let selectedContact = this.state.selectedContact
            var domaines = []
            if (selectedContact.domaine === "null") {
                domaines.push(this.state.domaine)
                selectedContact.domaine = domaines
                this.setState({
                    selectedContact: selectedContact,
                    domaine: {
                        domaine: "",
                        specialite: [],
                    },
                    showModalAdd: false,
                })
            } else {
                selectedContact.domaine.push(this.state.domaine)
                this.setState({
                    selectedContact: selectedContact,
                    domaine: {
                        domaine: "",
                        specialite: [],
                    },
                    showModalAdd: false,
                })

                console.log("test")
            }
        }

        if (type === 'formation') {
            let selectedContact = this.state.selectedContact;
            if (selectedContact.formations === undefined) {
                let formations = []
                formations.push(this.state.formationTmp)
                selectedContact.formations = formations
                this.setState({
                    selectedContact: selectedContact,
                    formationTmp: '',
                    showModalAdd: false,
                })
            } else {
                selectedContact.formations.push(this.state.formationTmp);

                this.setState({
                    selectedContact: selectedContact,
                    formationTmp: '',
                    showModalAdd: false,
                })
            }

            console.log(this.s)
        }
        if (type === 'fonction') {
            let selectedContact = this.state.selectedContact;
            if (selectedContact.fonctions === undefined) {
                let fonctions = []
                fonctions.push(this.state.fonctionTmp)
                selectedContact.fonctions = fonctions
                this.setState({
                    selectedContact: selectedContact,
                    fonctionTmp: '',
                    showModalAdd: false,
                })
            } else {
                selectedContact.fonctions.push(this.state.fonctionTmp);

                this.setState({
                    selectedContact: selectedContact,
                    fonctionTmp: '',
                    showModalAdd: false,
                })
            }
        }
        if (type === 'affiliation') {
            let selectedContact = this.state.selectedContact;

            if (selectedContact.affiliations === undefined) {
                let affiliation = []
                affiliation.push(this.state.affiliationTmp)
                selectedContact.affiliations = affiliation
                this.setState({
                    selectedContact: selectedContact,
                    affiliationTmp: '',
                    showModalAdd: false,
                })
            } else {

                selectedContact.affiliations.push(this.state.affiliationTmp);

                this.setState({
                    selectedContact: selectedContact,
                    affiliationTmp: '',
                    showModalAdd: false,
                })
            }
        }
        if (type === 'parcour') {
            let selectedContact = this.state.selectedContact;

            if (selectedContact.parcoursP === undefined) {
                let parcoursP = []
                parcoursP.push(this.state.parcourTmp)
                selectedContact.parcoursP = parcoursP;
                this.setState({
                    selectedContact: selectedContact,
                    parcourTmp: '',
                    showModalAdd: false,
                })
            } else {

                selectedContact.parcoursP.push(this.state.parcourTmp);
                this.setState({
                    selectedContact: selectedContact,
                    parcourTmp: '',
                    showModalAdd: false,
                })
            }
        }
        if (type === 'langue') {
            let selectedContact = this.state.selectedContact;

            if (selectedContact.langues === undefined) {
                let langues = []
                langues.push(this.state.langueTmp)
                selectedContact.langues = langues;
                this.setState({
                    selectedContact: selectedContact,
                    langueTmp: '',
                    showModalAdd: false,
                })
            } else {

                selectedContact.langues.push(this.state.langueTmp);
                this.setState({
                    selectedContact: selectedContact,
                    langueTmp: '',
                    showModalAdd: false,
                })
            }
        }
        if (type === 'hobbies') {
            let selectedContact = this.state.selectedContact;

            if (selectedContact.hobbies === undefined) {
                let hobbies = []
                hobbies.push(this.state.hobbiesTmp)
                selectedContact.hobbies = hobbies;
                this.setState({
                    selectedContact: selectedContact,
                    hobbiesTmp: '',
                    showModalAdd: false,
                })
            } else {

                selectedContact.hobbies.push(this.state.hobbiesTmp);
                this.setState({
                    selectedContact: selectedContact,
                    hobbiesTmp: '',
                    showModalAdd: false,
                })
            }
        }
    };

    removeItem = (type, index) => event => {

        if (type === 'domaine') {
            let selectedContact = this.state.selectedContact;
            selectedContact.domaine.splice(index, 1);
            this.setState({
                selectedContact: selectedContact
            })
        }

        if (type === 'formation') {
            let selectedContact = this.state.selectedContact;
            selectedContact.formations.splice(index, 1);
            this.setState({
                selectedContact: selectedContact
            })
        }
        if (type === 'fonction') {
            let selectedContact = this.state.selectedContact;
            selectedContact.fonctions.splice(index, 1);
            this.setState({
                selectedContact: selectedContact
            })
        }
        if (type === 'affiliation') {
            let selectedContact = this.state.selectedContact;
            selectedContact.affiliations.splice(index, 1);
            this.setState({
                selectedContact: selectedContact
            })
        }
        if (type === 'parcour') {
            let selectedContact = this.state.selectedContact;
            selectedContact.parcoursP.splice(index, 1);
            this.setState({
                selectedContact: selectedContact
            })
        }
        if (type === 'langue') {
            let selectedContact = this.state.selectedContact;
            selectedContact.langues.splice(index, 1);
            this.setState({
                selectedContact: selectedContact
            })
        }
        if (type === 'hobbies') {
            let selectedContact = this.state.selectedContact;
            selectedContact.hobbies.splice(index, 1);
            this.setState({
                selectedContact: selectedContact
            })
        }
    };

    handleChange = (object, name) => event => {
        let obj = this.state[object];
        obj[name] = event.target.value;
        this.setState({
            [object]: obj
        });
    };

    saveChanges = () => {

        console.log(this.state.selectedContactKey)
        firebase.database().ref('contacts/' + this.state.selectedContactKey).set(
            this.state.selectedContact
        ).then(res => {
            this.openSnackbar('success', "Modification effectuée avec succès");
        });
    };

    openAddModal = (type) => () => {
        this.setState({
            add: type,
            showModalAdd: true,
        })
    };

    handleChangeDomaine=(event)=>{
        this.setState({domaine:{domaine:event.target.value,
                specialite:[]},
        })
    }

    handleChangeSpecialite=(event)=>{
        let domaine = this.state.domaine
        domaine.specialite=event.target.value
        this.setState({domaine:domaine})
    }

    /*convetHtmlToBase64 = (divId) => event => {
        htmlToImage.toPng(document.getElementById(divId))
            .then(function (dataUrl) {
                console.log(dataUrl);
            })
    }*/

    expandAll = (id,drive) => {
        for (let i = 0; i < drive.length; i++) {
            expanded.push(drive[i].id)
            if (drive[i].id === id) {
                return expanded;
            }
            var found = this.expandAll(id,drive[i].Content.folders);
            if (found) return expanded;
        }

    }

    getFolderNameById = (id,drive) => {
        for(let i = 0; i < drive.length; i++) {
            if (drive[i].id !== id) {
                let found = this.getFolderNameById(id,drive[i].Content.folders)
                if(found) return found
            }
            else return drive[i].name

        }
    }

    getFolderFilesById = (id,drive) => {
        for (let i = 0; i < drive.length; i++) {
            if (drive[i].id !== id) {
                let found = this.getFolderFilesById(id, drive[i].Content.folders);
                if (found) return found;
            } else return drive[i].Content.files
        }
    }


    buildIndex = (root, children) => {
        for(let i in children) {
            index[children[i].id] = root;
            this.buildIndex(children[i].id,children[i].Content ? children[i].Content.folders : []);
        }
    }

    getPath = (id,drive) => {
        if(drive) this.buildIndex("Mon drive", drive);
        return index[id] ? this.getPath(index[id]).concat([id]) : [id];
    }


    getBreadcumpsPath = (idFolder,drive) => {
        let breadCrumbArray = this.getPath(idFolder,drive)
        let breadcrumbs = [];
        breadCrumbArray.map((id,key) => {
            if(id !== "Mon drive"){
                let name = this.getFolderNameById(id,drive)
                breadcrumbs.push(name)
            }else breadcrumbs.push(id)
        });
        return breadcrumbs.join(" / ");
    }




    render() {

        return (
            <div>
                <TopBar logo={logo} height={70} onClickMenuIcon={() => this.setState({openSideMenu: true})} onLogoutClick={() => {
                    localStorage.clear();
                    this.props.history.push("/login")
                }}/>
                <SideMenu logo={logo} items={data.sideBarItems} iconColor={"blue"} textColor={"#65728E"}
                          history={this.props.history}
                          opened={this.state.openSideMenu} onClose={() => this.setState({openSideMenu: false})}/>
                <MuiBackdrop open={this.state.loading}/>

                <div style={{marginRight: 50, marginTop: 75, marginLeft: 5}}>
                    <div>
                        <div style={{display: "flex"}}>

                            <div style={{height: "100%"}}>
                                <div>
                                    <LeftMenu openNewFolderModalFromRacine={() => this.setState({
                                        newFolderModal: true,
                                        newFolderFromRacine: true
                                    })}
                                              focusedItem={this.state.focusedItem}
                                              setFocusedItem={(item)=> {
                                                  this.props.history.replace({pathname:'/drive/0'});
                                                  this.setState({focusedItem:item,showContainerSection:item})
                                              }}

                                              showDriveMenuItems={this.state.openDriveMenuItem}
                                              setShowDriveMenuItems={() => this.setState({openDriveMenuItem: !this.state.openDriveMenuItem})}

                                              showRoomsMenuItems={this.state.openRoomMenuItem}
                                              setShowRoomsMenuItems={() => this.setState({openRoomMenuItem: !this.state.openRoomMenuItem})}

                                              showMeetMenuItems={this.state.openMeetMenuItem}
                                              setShowMeetMenuItems={() => this.setState({openMeetMenuItem: !this.state.openMeetMenuItem})}

                                              showContacts={this.state.openContactsMenu}
                                              setShowContacts={() => {
                                                  this.setState({showContainerSection: "Contacts"})
                                              }}

                                              openNewFolderModal={() => this.setState({newFolderModal: true})}
                                              showNewFileScreen={() => this.setState({
                                                  showNewDocScreen: true,
                                                  showUploadStep: "upload"
                                              })}
                                              openShareModal={() => {this.setState({openShareDocModal:true})}}


                                              rooms={data.rooms}

                                              driveFolders={this.state.folders || []}

                                              setFolderName={(name) => this.setState({selectedFoldername: name})}
                                              setFolderId={(id) => {
                                                  this.props.history.replace({pathname:'/drive/'+id});
                                                  this.setState({
                                                      breadcrumbs:this.getBreadcumpsPath(id,this.state.folders.concat(this.state.sharedDrive)),
                                                      selectedFolderId: id,
                                                      showContainerSection: "Drive"
                                                  })
                                              }}
                                              setSelectedFolderFiles={(files) => this.setState({selectedFolderFiles: files})}
                                              //selectedDriveItem={this.state.showContainerSection === "Drive" && [this.state.selectedFolderId === "" ? this.state.folders.length > 0 ? this.state.folders[0].id : "" : this.state.selectedFolderId]}
                                              selectedDriveItem={this.state.showContainerSection === "Drive" && (this.props.match.params.folder_id ? [this.props.match.params.folder_id] :[] )}
                                              expandedDriveItems={this.state.showContainerSection === "Drive" && this.state.expanded}
                                              selectedMeetItem={this.state.showContainerSection === "Meet" ? this.state.selectedMeetMenuItem === "nm" ? ["01"] : ["02"] : []}
                                              selectedRoomsItem={this.state.showContainerSection === "Rooms" ? ["1"] : []}
                                              onMeetItemClick={(nodeId) => {
                                                  if (nodeId === "01") {
                                                      this.setState({
                                                          showContainerSection: "Meet",
                                                          selectedMeetMenuItem: "nm"
                                                      })
                                                  } else if (nodeId === "02") {
                                                      this.setState({
                                                          showContainerSection: "Meet",
                                                          selectedMeetMenuItem: "rm"
                                                      })
                                                  } else {
                                                  }
                                              }}

                                              sharedDrive={this.state.sharedDrive || []}

                                              handleToggle={(event, nodeIds)=> {
                                                  this.setState({expanded:nodeIds})
                                              }}
                                    />

                                </div>

                            </div>

                            <div style={{flexWrap: "wrap", flex: "1 1 auto"}}>
                                <div className="card">
                                    <div className="card-body" style={{minHeight: 750}}>

                                        {
                                            this.state.showContainerSection === "Drive" && this.state.loading === false &&
                                            <div>
                                                {
                                                    this.state.showNewDocScreen === false ?
                                                        <div>
                                                            <div style={{
                                                                display: "flex",
                                                                justifyContent: "space-between"
                                                            }}>
                                                                <div style={{width:"100%"}}>
                                                                    <h5 className="mt-0 mb-1">
                                                                        {this.props.match.params.folder_id && this.props.match.params.folder_id === '0' ? "Mon drive" : this.state.breadcrumbs}
                                                                    </h5>
                                                                    <div style={{position:"absolute",right:25,marginTop:-44}}>
                                                                        <IconButton aria-label="Vue liste" title="Vue liste" color="default">
                                                                            <ListIcon />
                                                                        </IconButton>
                                                                    </div>
                                                                    <div style={{height:1,backgroundColor:"#dadce0",marginBottom:15,marginTop:15}}/>
                                                                    <h6><i className="fa fa-paperclip mb-1"/> Documents
                                                                        <span>(
                                                                            { this.props.match.params.folder_id && this.props.match.params.folder_id === '0' ? this.state.rootFiles.length : this.state.selectedFolderFiles.length})
                                                                        </span>
                                                                    </h6>
                                                                </div>
                                                            </div>

                                                            <div style={{flexWrap: "wrap", display: "flex"}}>

                                                                {
                                                                    this.state.folders.length === 0 && this.state.rootFiles.length === 0  ?
                                                                        <div style={{marginTop: 25, display: "flex"}}>
                                                                            <h5 style={{
                                                                                fontSize: 16,
                                                                                color: "gray"
                                                                            }}>Aucun dossier encore ajouté ! </h5>&nbsp;&nbsp;
                                                                            <h6 style={{
                                                                                cursor: "pointer",
                                                                                color: "#000",
                                                                                textDecoration: "underline"
                                                                            }} onClick={() => {
                                                                                this.setState({
                                                                                    newFolderModal: true,
                                                                                    newFolderFromRacine: true
                                                                                })
                                                                            }}>
                                                                                Ajouter un dossier</h6>
                                                                        </div> :

                                                                        this.props.match.params.folder_id && this.props.match.params.folder_id === '0' ?
                                                                            <div>
                                                                                {
                                                                                    (this.state.rootFiles || []).map((item, key) =>
                                                                                            <div key={key} className="cf_itemDoc">
                                                                            <span className="cf-itemDoc_preview"
                                                                                  onClick={() => {
                                                                                      this.setState({
                                                                                          selectedDoc: item,
                                                                                          openRightMenu: true
                                                                                      })
                                                                                  }}>
                                                                            <img alt=""
                                                                                 src={item.thumbnail || require("../../assets/icons/icon-pdf.png")}
                                                                                 className={item.thumbnail ? "cf-itemDoc_preview_image" : "cf-itemDoc_preview_staticImg"}/>
                                                                            <div className="cf_itemDoc_preview_details">
                                                                                <div
                                                                                    className="cf_itemDoc_preview_details_title">
                                                                                    {item.name + ".pdf"}
                                                                                </div>
                                                                                <span
                                                                                    className="badge bg-soft-warning text-warning font-weight-bolder p-1">En attente</span>
                                                                            </div>

                                                                        </span>
                                                                                            </div>
                                                                                    )
                                                                                }


                                                                            </div> :
                                                                            <div>
                                                                                {
                                                                                    (this.state.selectedFolderFiles || []).map((item, key) =>
                                                                                            <div key={key} className="cf_itemDoc">
                                                                        <span
                                                                            className="cf-itemDoc_preview"
                                                                            onClick={() => {
                                                                                this.setState({
                                                                                    selectedDoc: item,
                                                                                    openRightMenu: true
                                                                                })
                                                                            }}>
                                                                            <img alt=""
                                                                                 src={item.thumbnail || require("../../assets/icons/icon-pdf.png")}
                                                                                 className={item.thumbnail ? "cf-itemDoc_preview_image" : "cf-itemDoc_preview_staticImg"}/>
                                                                            <div className="cf_itemDoc_preview_details">
                                                                                <div
                                                                                    className="cf_itemDoc_preview_details_title">
                                                                                    {item.name + ".pdf"}
                                                                                </div>
                                                                                <span
                                                                                    className="badge bg-soft-warning text-warning font-weight-bolder p-1">En attente</span>
                                                                            </div>

                                                                        </span>
                                                                                            </div>  
                                                                                    )
                                                                                }

                                                                            </div>


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
                                                                        <h1 className="skh1">Télécharger un document</h1>
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
                                                                                        url: data.endpoint + "/ged/addfile",
                                                                                        data: formData,
                                                                                        headers: {
                                                                                            'Content-Type': 'multipart/form-data',
                                                                                            'token': localStorage.getItem('token'),
                                                                                            'usrtoken': localStorage.getItem('usrtoken')
                                                                                        },
                                                                                        onUploadProgress: (p) => {
                                                                                            console.log(p);
                                                                                            this.setState({
                                                                                                progressUpload: (p.loaded / p.total) * 100
                                                                                            })
                                                                                        }

                                                                                    }).then(res => {
                                                                                        if (res.data.succes === true && res.data.status === 200) {

                                                                                            SmartService.getFile(res.data.data.file_id, localStorage.getItem("token"), localStorage.getItem("usrtoken")).then(fileRes => {
                                                                                                if (fileRes.succes === true && fileRes.status === 200) {

                                                                                                    this.setState({
                                                                                                        progressUpload: undefined,
                                                                                                        showUploadStep: "upload_succes",
                                                                                                        uploadedName: fileRes.data.name + ".pdf",
                                                                                                        uploadedPath: fileRes.data.Content.Data
                                                                                                    })

                                                                                                } else {
                                                                                                    console.log(fileRes.error)
                                                                                                }
                                                                                            }).catch(err => {
                                                                                                console.log(err);
                                                                                            })

                                                                                        } else {
                                                                                            console.log(res.error)
                                                                                        }


                                                                                    }).catch(err => {
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
                                                                                <img
                                                                                    className="cf-itemDoc_preview_staticImgUploaded"
                                                                                    alt=""
                                                                                    src={this.state.uploadedThumb}/>
                                                                            </div>
                                                                            <div className="sk_upload_filename">
                                                                                {this.state.uploadedName}
                                                                            </div>
                                                                            <Button shape={SHAPE.round} size={SIZE.mini}
                                                                                    onClick={() => {
                                                                                    }}>
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
                                                                                                this.setState({
                                                                                                    showUploadStep: "successfulStep",
                                                                                                    loading: false
                                                                                                })
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
                                                                            <button onClick={() => {
                                                                                this.setState({
                                                                                    showUploadStep: "",
                                                                                    showNewDocScreen: false
                                                                                })
                                                                                this.reloadGed()
                                                                            }}
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
                                                        <div align="center" style={{marginTop: 200}}>
                                                            <h3>Prêt pour la réunion ?</h3>
                                                            <div style={{display: "inline-flex"}}>
                                                                <p style={{
                                                                    cursor: "pointer",
                                                                    textDecoration: "underline"
                                                                }}>{this.state.meeturl}</p>
                                                                <IconButton aria-label="Visualiser"
                                                                            title="Recharger le lien" color="primary"
                                                                            style={{marginTop: -17}}
                                                                            onClick={() => {
                                                                                let meeturl = "https://meet.smartdom.ch/meet_" + moment().format("DDMMYYYYHHmmss")
                                                                                console.log(Math.random(10))
                                                                                this.setState({meeturl: meeturl})
                                                                            }}>
                                                                    <AutorenewIcon/>
                                                                </IconButton>

                                                            </div>

                                                            <div style={{display: "block"}}>
                                                                <button className="btn btn-rounded btn-outline-success"
                                                                        style={{fontWeight: "normal", marginRight: 15}}
                                                                        onClick={() => {
                                                                            window.open(this.state.meeturl, "_blank")
                                                                        }}
                                                                >
                                                                    Participer à la réunion
                                                                </button>
                                                                <button onClick={() => {
                                                                    this.setState({showInviteModal: true})
                                                                }}
                                                                        className="btn btn-rounded btn-outline-info"
                                                                        style={{fontWeight: "normal"}}>
                                                                    Ajouter des participants
                                                                </button>
                                                            </div>

                                                        </div>

                                                        :

                                                        <div align="center" style={{marginTop: 200}}>
                                                            <h3>Vous avez un code de réunion ?</h3>
                                                            <p style={{fontFamily: "sans-serif"}}>
                                                                Pour participer à une réunion, saisissez le code de
                                                                réunion fourni par l'organisateur ou récu par mail
                                                            </p>
                                                            <div style={{marginTop: 20}}>
                                                                <input className="form-control"
                                                                       style={{height: 40, width: 400}}
                                                                       onChange={event => this.setState({meetCode: event.target.value})}
                                                                       placeholder="Exemple de code: meet_21072020184528"/>
                                                            </div>
                                                            <button className="btn btn-rounded btn-success mt-3"
                                                                    disabled={this.state.meetCode === ""}
                                                                    style={{fontWeight: "normal", marginRight: 15}}
                                                                    onClick={() => {
                                                                        window.open("https://meet.smartdom.ch/meet_" + this.state.meetCode, "_blank")
                                                                    }}
                                                            >
                                                                Participer
                                                            </button>
                                                        </div>
                                                }
                                            </div>
                                        }
                                        {
                                            this.state.showContainerSection === "Contacts" ?
                                                this.state.editContactForm === false ?
                                                    <div>
                                                        <h4 className="mt-0 mb-1">Contacts de fournisseurs de
                                                            prestations de services</h4>
                                                        <div className="row">
                                                            <div className="col-xl-12">
                                                                <div className="card">
                                                                    <div className="card-body">
                                                                        <div className="row mb-2">
                                                                            <div className="col-sm-4">
                                                                                <form className="form-inline">
                                                                                    <div className="form-group mb-2">
                                                                                        <label htmlFor="inputPassword2"
                                                                                               className="sr-only">Chercher</label>
                                                                                        <input type="search"
                                                                                               className="form-control"
                                                                                               id="inputPassword2"
                                                                                               placeholder="Chercher..."/>
                                                                                    </div>
                                                                                </form>
                                                                            </div>
                                                                            <div className="col-sm-8">
                                                                                <div className="text-sm-right">
                                                                                    <button type="button"
                                                                                            className="btn btn-success waves-effect waves-light mb-2 mr-1">
                                                                                        <i className="mdi mdi-settings"/>
                                                                                    </button>
                                                                                    <button
                                                                                        className="btn btn-danger waves-effect waves-light mb-2"
                                                                                        data-animation="fadein"
                                                                                        data-plugin="custommodal">
                                                                                        <i className="mdi mdi-plus-circle mr-1"/>
                                                                                        Ajouter
                                                                                    </button>
                                                                                </div>
                                                                            </div>

                                                                        </div>

                                                                        <div className="table-responsive">
                                                                            <table
                                                                                className="table table-centered table-hover mb-0 ">
                                                                                <thead>
                                                                                <tr>
                                                                                    <th style={{width: "25%"}}>Nom &
                                                                                        Prénom
                                                                                    </th>
                                                                                    <th style={{width: "25%"}}>téléphone</th>
                                                                                    <th style={{width: "30%"}}>Email</th>
                                                                                    <th style={{width: "20%"}}>Action</th>
                                                                                </tr>
                                                                                </thead>
                                                                                <tbody/>
                                                                            </table>
                                                                        </div>
                                                                    </div>
                                                                </div>

                                                                <div className="row">
                                                                    <div className="col">
                                                                        <div className="page-title-box">
                                                                            <div className="row ">
                                                                                <div
                                                                                    className="col-md-2 bg-danger text-center "
                                                                                    style={{width: "10%"}}>
                                                                                    <h4 style={{color: "white"}}>Avocats</h4>
                                                                                </div>
                                                                                <hr style={{
                                                                                    backgroundColor: "#a6a6a6",
                                                                                    height: "2px",
                                                                                    borderStyle: "solid",
                                                                                    color: "red",
                                                                                    width: "80%"
                                                                                }}/>
                                                                            </div>

                                                                        </div>
                                                                    </div>
                                                                </div>

                                                                <div className="card  mt-1">
                                                                    <div className="card-body">
                                                                        <div className="table-responsive ">
                                                                            <table
                                                                                className=" table table-centered  mb-0  ">
                                                                                <tbody>
                                                                                {this.state.contacts.map((contact, key) =>
                                                                                    contact.role === "avocat" &&
                                                                                    <tr key={key}>
                                                                                        <td style={{width: "25%"}}>
                                                                                            <div
                                                                                                className="media align-items-center   ">
                                                                                                <img
                                                                                                    className=" rounded-circle text-center"
                                                                                                    style={{
                                                                                                        width: 60,
                                                                                                        height: 60,
                                                                                                        objectFit: "cover"
                                                                                                    }}
                                                                                                    src={contact.imageUrl || defaultAvatar}
                                                                                                    alt=""/>

                                                                                                <div className="ml-1"
                                                                                                     style={{
                                                                                                         color: "#000",
                                                                                                         fontFamily: "sans-serif",
                                                                                                         fontWeight: 600,
                                                                                                         fontSize: 12
                                                                                                     }}>{contact.nom} {contact.prenom} </div>
                                                                                            </div>
                                                                                        </td>
                                                                                        <td style={{
                                                                                            width: "25%",
                                                                                            color: "#000",
                                                                                            fontFamily: "sans-serif",
                                                                                            fontWeight: 600,
                                                                                            fontSize: 12
                                                                                        }}>
                                                                                            {contact.phone}
                                                                                        </td>
                                                                                        <td style={{
                                                                                            width: "30%",
                                                                                            color: "#000",
                                                                                            fontFamily: "sans-serif",
                                                                                            fontWeight: 600,
                                                                                            fontSize: 12
                                                                                        }}>
                                                                                            {contact.email}
                                                                                        </td>
                                                                                        <td style={{width: "20%"}}>
                                                                                            <i style={{cursor: "pointer"}}
                                                                                               onClick={() => this.setState({
                                                                                                   selectedContact: contact,
                                                                                                   selectedContactKey: key,
                                                                                                   openRightContactModalDetail: true
                                                                                               })}
                                                                                               className="m-2 mdi mdi-square-edit-outline text-blue font-weight-bold font-17"/>
                                                                                            <i className="m-2  mdi mdi-delete text-danger font-weight-bold font-17"/>
                                                                                        </td>
                                                                                    </tr>
                                                                                )}
                                                                                </tbody>
                                                                            </table>
                                                                        </div>
                                                                    </div>
                                                                </div>

                                                                <div className="row">
                                                                    <div className="col">
                                                                        <div className="page-title-box">
                                                                            <div className="row ">
                                                                                <div className="col-md-2 text-center "
                                                                                     style={{
                                                                                         width: "10%",
                                                                                         backgroundColor: "aquamarine"
                                                                                     }}>
                                                                                    <h4 style={{color: "white"}}>Sportifs</h4>
                                                                                </div>
                                                                                <hr style={{
                                                                                    backgroundColor: "#a6a6a6",
                                                                                    height: "2px",
                                                                                    borderStyle: "solid",
                                                                                    color: "red",
                                                                                    width: "80%"
                                                                                }}/>
                                                                            </div>

                                                                        </div>
                                                                    </div>
                                                                </div>

                                                                <div className="card  mt-1">
                                                                    <div className="card-body">
                                                                        <div className="table-responsive ">
                                                                            <table
                                                                                className=" table table-centered  mb-0  ">
                                                                                <tbody>
                                                                                {this.state.contacts.map((contact, key) =>
                                                                                    contact.role === "sportif" &&
                                                                                    <tr key={key}>
                                                                                        <td style={{width: "25%"}}>
                                                                                            <div
                                                                                                className="media align-items-center   ">
                                                                                                <img
                                                                                                    className=" rounded-circle text-center"
                                                                                                    style={{
                                                                                                        width: 60,
                                                                                                        height: 60,
                                                                                                        objectFit: "cover"
                                                                                                    }}
                                                                                                    src={contact.imageUrl || defaultAvatar}
                                                                                                    alt=""/>

                                                                                                <div className="ml-1"
                                                                                                     style={{
                                                                                                         color: "#000",
                                                                                                         fontFamily: "sans-serif",
                                                                                                         fontWeight: 600,
                                                                                                         fontSize: 12
                                                                                                     }}>{contact.nom} {contact.prenom} </div>
                                                                                            </div>
                                                                                        </td>
                                                                                        <td style={{
                                                                                            width: "25%",
                                                                                            color: "#000",
                                                                                            fontFamily: "sans-serif",
                                                                                            fontWeight: 600,
                                                                                            fontSize: 12
                                                                                        }}>
                                                                                            {contact.phone}
                                                                                        </td>
                                                                                        <td style={{
                                                                                            width: "30%",
                                                                                            color: "#000",
                                                                                            fontFamily: "sans-serif",
                                                                                            fontWeight: 600,
                                                                                            fontSize: 12
                                                                                        }}>
                                                                                            {contact.email}
                                                                                        </td>
                                                                                        <td style={{width: "20%"}}>
                                                                                            <i style={{cursor: "pointer"}}
                                                                                               onClick={() => this.setState({
                                                                                                   selectedContact: contact,
                                                                                                   selectedContactKey: key,
                                                                                                   openRightContactModalDetail: true
                                                                                               })}
                                                                                               className="m-2 mdi mdi-square-edit-outline text-blue font-weight-bold font-17"/>
                                                                                            <i className="m-2  mdi mdi-delete text-danger font-weight-bold font-17"/>
                                                                                        </td>
                                                                                    </tr>
                                                                                )}
                                                                                </tbody>
                                                                            </table>
                                                                        </div>
                                                                    </div>
                                                                </div>

                                                                <div className="row">
                                                                    <div className="col">
                                                                        <div className="page-title-box">
                                                                            <div className="row ">
                                                                                <div className="col-md-2 text-center "
                                                                                     style={{
                                                                                         width: "10%",
                                                                                         backgroundColor: "#f79605"
                                                                                     }}>
                                                                                    <h4 style={{color: "white"}}>Notaires</h4>
                                                                                </div>
                                                                                <hr style={{
                                                                                    backgroundColor: "#a6a6a6",
                                                                                    height: "2px",
                                                                                    borderStyle: "solid",
                                                                                    color: "red",
                                                                                    width: "80%"
                                                                                }}/>
                                                                            </div>

                                                                        </div>
                                                                    </div>
                                                                </div>

                                                                <div className="card  mt-1">
                                                                    <div className="card-body">
                                                                        <div className="table-responsive ">
                                                                            <table
                                                                                className=" table table-centered  mb-0  ">
                                                                                <tbody>
                                                                                {this.state.contacts.map((contact, key) =>
                                                                                    contact.role === "notaire" &&
                                                                                    <tr key={key}>
                                                                                        <td style={{width: "25%"}}>
                                                                                            <div
                                                                                                className="media align-items-center   ">
                                                                                                <img
                                                                                                    className=" rounded-circle text-center"
                                                                                                    style={{
                                                                                                        width: 60,
                                                                                                        height: 60,
                                                                                                        objectFit: "cover"
                                                                                                    }}
                                                                                                    src={contact.imageUrl || defaultAvatar}
                                                                                                    alt=""/>

                                                                                                <div className="ml-1"
                                                                                                     style={{
                                                                                                         color: "#000",
                                                                                                         fontFamily: "sans-serif",
                                                                                                         fontWeight: 600,
                                                                                                         fontSize: 12
                                                                                                     }}>{contact.nom} {contact.prenom} </div>
                                                                                            </div>
                                                                                        </td>
                                                                                        <td style={{
                                                                                            width: "25%",
                                                                                            color: "#000",
                                                                                            fontFamily: "sans-serif",
                                                                                            fontWeight: 600,
                                                                                            fontSize: 12
                                                                                        }}>
                                                                                            {contact.phone}
                                                                                        </td>
                                                                                        <td style={{
                                                                                            width: "30%",
                                                                                            color: "#000",
                                                                                            fontFamily: "sans-serif",
                                                                                            fontWeight: 600,
                                                                                            fontSize: 12
                                                                                        }}>
                                                                                            {contact.email}
                                                                                        </td>
                                                                                        <td style={{width: "20%"}}>
                                                                                            <i style={{cursor: "pointer"}}
                                                                                               onClick={() => this.setState({
                                                                                                   selectedContact: contact,
                                                                                                   selectedContactKey: key,
                                                                                                   openRightContactModalDetail: true
                                                                                               })}
                                                                                               className="m-2 mdi mdi-square-edit-outline text-blue font-weight-bold font-17"/>
                                                                                            <i className="m-2  mdi mdi-delete text-danger font-weight-bold font-17"/>
                                                                                        </td>
                                                                                    </tr>
                                                                                )}
                                                                                </tbody>
                                                                            </table>
                                                                        </div>
                                                                    </div>
                                                                </div>

                                                                <div className="row">
                                                                    <div className="col">
                                                                        <div className="page-title-box">
                                                                            <div className="row ">
                                                                                <div className="col-md-2 text-center "
                                                                                     style={{
                                                                                         width: "10%",
                                                                                         backgroundColor: "#f705d7"
                                                                                     }}>
                                                                                    <h4 style={{color: "white"}}>Fiduciaires</h4>
                                                                                </div>
                                                                                <hr style={{
                                                                                    backgroundColor: "#a6a6a6",
                                                                                    height: "2px",
                                                                                    borderStyle: "solid",
                                                                                    color: "red",
                                                                                    width: "80%"
                                                                                }}/>
                                                                            </div>

                                                                        </div>
                                                                    </div>
                                                                </div>

                                                                <div className="card  mt-1">
                                                                    <div className="card-body">
                                                                        <div className="table-responsive ">
                                                                            <table
                                                                                className=" table table-centered  mb-0  ">
                                                                                <tbody>
                                                                                {this.state.contacts.map((contact, key) =>
                                                                                    contact.role === "fiducaire" &&
                                                                                    <tr key={key}>
                                                                                        <td style={{width: "25%"}}>
                                                                                            <div
                                                                                                className="media align-items-center   ">
                                                                                                <img
                                                                                                    className=" rounded-circle text-center"
                                                                                                    style={{
                                                                                                        width: 60,
                                                                                                        height: 60,
                                                                                                        objectFit: "cover"
                                                                                                    }}
                                                                                                    src={contact.imageUrl || defaultAvatar}
                                                                                                    alt=""/>

                                                                                                <div className="ml-1"
                                                                                                     style={{
                                                                                                         color: "#000",
                                                                                                         fontFamily: "sans-serif",
                                                                                                         fontWeight: 600,
                                                                                                         fontSize: 12
                                                                                                     }}>{contact.nom} {contact.prenom} </div>
                                                                                            </div>
                                                                                        </td>
                                                                                        <td style={{
                                                                                            width: "25%",
                                                                                            color: "#000",
                                                                                            fontFamily: "sans-serif",
                                                                                            fontWeight: 600,
                                                                                            fontSize: 12
                                                                                        }}>
                                                                                            {contact.phone}
                                                                                        </td>
                                                                                        <td style={{
                                                                                            width: "30%",
                                                                                            color: "#000",
                                                                                            fontFamily: "sans-serif",
                                                                                            fontWeight: 600,
                                                                                            fontSize: 12
                                                                                        }}>
                                                                                            {contact.email}
                                                                                        </td>
                                                                                        <td style={{width: "20%"}}>
                                                                                            <i style={{cursor: "pointer"}}
                                                                                               onClick={() => this.setState({
                                                                                                   selectedContact: contact,
                                                                                                   selectedContactKey: key,
                                                                                                   openRightContactModalDetail: true
                                                                                               })}
                                                                                               className="m-2 mdi mdi-square-edit-outline text-blue font-weight-bold font-17"/>
                                                                                            <i className="m-2  mdi mdi-delete text-danger font-weight-bold font-17"/>
                                                                                        </td>
                                                                                    </tr>
                                                                                )}
                                                                                </tbody>
                                                                            </table>
                                                                        </div>
                                                                    </div>
                                                                </div>

                                                                <div className="row">
                                                                    <div className="col">
                                                                        <div className="page-title-box">
                                                                            <div className="row ">
                                                                                <div className="col-md-2 text-center "
                                                                                     style={{
                                                                                         width: "10%",
                                                                                         backgroundColor: "aquamarine"
                                                                                     }}>
                                                                                    <h4 style={{color: "white"}}>Audit</h4>
                                                                                </div>
                                                                                <hr style={{
                                                                                    backgroundColor: "#a6a6a6",
                                                                                    height: "2px",
                                                                                    borderStyle: "solid",
                                                                                    color: "red",
                                                                                    width: "80%"
                                                                                }}/>
                                                                            </div>

                                                                        </div>
                                                                    </div>
                                                                </div>

                                                                <div className="card  mt-1">
                                                                    <div className="card-body">
                                                                        <div className="table-responsive ">
                                                                            <table
                                                                                className=" table table-centered  mb-0  ">
                                                                                <tbody>
                                                                                {this.state.contacts.map((contact, key) =>
                                                                                    contact.role === "audit" &&
                                                                                    <tr key={key}>
                                                                                        <td style={{width: "25%"}}>
                                                                                            <div
                                                                                                className="media align-items-center   ">
                                                                                                <img
                                                                                                    className=" rounded-circle text-center"
                                                                                                    style={{
                                                                                                        width: 60,
                                                                                                        height: 60,
                                                                                                        objectFit: "cover"
                                                                                                    }}
                                                                                                    src={contact.imageUrl || defaultAvatar}
                                                                                                    alt=""/>

                                                                                                <div className="ml-1"
                                                                                                     style={{
                                                                                                         color: "#000",
                                                                                                         fontFamily: "sans-serif",
                                                                                                         fontWeight: 600,
                                                                                                         fontSize: 12
                                                                                                     }}>{contact.nom} {contact.prenom} </div>
                                                                                            </div>
                                                                                        </td>
                                                                                        <td style={{
                                                                                            width: "25%",
                                                                                            color: "#000",
                                                                                            fontFamily: "sans-serif",
                                                                                            fontWeight: 600,
                                                                                            fontSize: 12
                                                                                        }}>
                                                                                            {contact.phone}
                                                                                        </td>
                                                                                        <td style={{
                                                                                            width: "30%",
                                                                                            color: "#000",
                                                                                            fontFamily: "sans-serif",
                                                                                            fontWeight: 600,
                                                                                            fontSize: 12
                                                                                        }}>
                                                                                            {contact.email}
                                                                                        </td>
                                                                                        <td style={{width: "20%"}}>
                                                                                            <i style={{cursor: "pointer"}}
                                                                                               onClick={() => this.setState({
                                                                                                   selectedContact: contact,
                                                                                                   selectedContactKey: key,
                                                                                                   openRightContactModalDetail: true
                                                                                               })}
                                                                                               className="m-2 mdi mdi-square-edit-outline text-blue font-weight-bold font-17"/>
                                                                                            <i className="m-2  mdi mdi-delete text-danger font-weight-bold font-17"/>
                                                                                        </td>
                                                                                    </tr>
                                                                                )}
                                                                                </tbody>
                                                                            </table>
                                                                        </div>
                                                                    </div>
                                                                </div>

                                                            </div>
                                                        </div>
                                                    </div> :

                                                    <div>
                                                        <div className="row">
                                                            <div className="col-lg-12">
                                                                <div style={{textAlign: "right"}}>
                                                                    <button onClick={() => this.setState({editContactForm:false,showContainerSection:"Contacts"})}
                                                                            className="btn btn-sm btn-outline-info">Retour
                                                                    </button>
                                                                </div>
                                                                <div className="card-box text-center" style={{marginTop: 1}}>
                                                                    <img //onClick={() => this.imageUpload.click()}
                                                                        src={this.state.selectedContact.imageUrl || defaultAvatar}
                                                                        className="rounded-circle avatar-lg img-thumbnail"
                                                                        alt="" style={{
                                                                        cursor: "pointer",
                                                                        width: 120,
                                                                        height: 120,
                                                                        objectFit: "cover"
                                                                    }}/>
                                                                    <input style={{
                                                                        visibility: 'hidden',
                                                                        width: 0,
                                                                        height: 0
                                                                    }}
                                                                           type='file' accept='.png,.jpeg,.jpg'
                                                                        //onChange={this.uploadImage}
                                                                           ref={(ref) => this.imageUpload = ref}
                                                                    />

                                                                    <h4 className="mb-0">{this.state.selectedContact.prenom + ' ' + this.state.selectedContact.nom}</h4>
                                                                    <p className="text-muted">{this.state.selectedContact.specialite} </p>

                                                                    <div style={{display:"contents"}}>
                                                                        <button type="button" onClick={this.saveChanges}
                                                                                className="btn btn-success btn-xs waves-effect mb-2 waves-light m-1">
                                                                            <i className="fe-edit"/>&nbsp;&nbsp;
                                                                            Enregistrer
                                                                        </button>
                                                                        <button type="button" onClick={() => {
                                                                            this.setState({showPdfPreviewModal:true})
                                                                            setTimeout(() => {
                                                                                this.setState({isDocPreviewReady:true})
                                                                            },1000)
                                                                        }}
                                                                                className="btn btn-danger btn-xs waves-effect mb-2 waves-light m-1">
                                                                            <i className="fe-printer"/>&nbsp;&nbsp;
                                                                            Aperçu
                                                                        </button>
                                                                        <button type="button" onClick={() => {
                                                                            this.setState({showPdfFlipModal:true})
                                                                        }}
                                                                                className="btn btn-danger btn-xs waves-effect mb-2 waves-light m-1">
                                                                            <i className="fe-printer"/>&nbsp;&nbsp;
                                                                            Book
                                                                        </button>
                                                                    </div>

                                                                    <div style={{marginTop:30}} className="text-left">
                                                                        <Tabs>
                                                                            <TabList>
                                                                                <Tab>Informations générales</Tab>
                                                                                <Tab >Famille & Vie privée</Tab>
                                                                                <Tab>Parcours professionnel</Tab>
                                                                                <Tab>Formations</Tab>
                                                                                <Tab>Langues</Tab>
                                                                                <Tab>Domaines d'intérêt, loisirs et sports</Tab>
                                                                            </TabList>

                                                                            <TabPanel>
                                                                                <h5 style={{marginTop:20}}>Informations générales</h5>
                                                                                <div className="row" style={{marginTop: 35}}>
                                                                                    <div className="col-md-12">
                                                                                        <p style={{marginBottom: 10}}>À propos</p>
                                                                                        <textarea
                                                                                            rows={7}
                                                                                            className="form-control"
                                                                                            id="about"
                                                                                            name="about"
                                                                                            value={this.state.selectedContact.about}
                                                                                            onChange={this.handleChange('selectedContact', 'about')}/>
                                                                                    </div>
                                                                                </div>
                                                                                <div className="row" style={{marginTop: 35}}>
                                                                                    <div className="col-md-6">
                                                                                        <p style={{marginBottom: 10}}>Nom</p>
                                                                                        <input
                                                                                            className="form-control"
                                                                                            type="text"
                                                                                            id="nom"
                                                                                            name="nom"
                                                                                            value={this.state.selectedContact.nom}
                                                                                            onChange={this.handleChange('selectedContact', 'nom')}/>
                                                                                    </div>
                                                                                    <div
                                                                                        className="col-md-6">
                                                                                        <p style={{marginBottom: 10}}>Prénom</p>
                                                                                        <input
                                                                                            className="form-control"
                                                                                            type="text"
                                                                                            id="prenom"
                                                                                            name="prenom"
                                                                                            value={this.state.selectedContact.prenom}
                                                                                            onChange={this.handleChange('selectedContact', 'prenom')}/>
                                                                                    </div>
                                                                                </div>
                                                                                <div className="row" style={{marginTop: 20}}>
                                                                                    <div className="col-md-6">
                                                                                        <p style={{marginBottom: 10}}>Email</p>
                                                                                        <input
                                                                                            className="form-control"
                                                                                            type="text"
                                                                                            id="email"
                                                                                            name="email"
                                                                                            readOnly={true}
                                                                                            value={this.state.selectedContact.email}
                                                                                            onChange={this.handleChange('selectedContact', 'email')}/>
                                                                                    </div>
                                                                                    <div
                                                                                        className="col-md-6">
                                                                                        <p style={{marginBottom: 10}}>Téléphone</p>
                                                                                        <input
                                                                                            className="form-control"
                                                                                            type="text"
                                                                                            id="phone"
                                                                                            name="phone"
                                                                                            value={this.state.selectedContact.phone}
                                                                                            onChange={this.handleChange('selectedContact', 'phone')}/>
                                                                                    </div>
                                                                                </div>
                                                                                <div className="row" style={{marginTop: 20}}>
                                                                                    <div className="col-sm-6">
                                                                                        <p style={{marginBottom: 10}}>Fax</p>
                                                                                        <input
                                                                                            className="form-control"
                                                                                            type="text"
                                                                                            id="fax"
                                                                                            name="fax"
                                                                                            placeholder="Fax"
                                                                                            value={this.state.selectedContact.fax}
                                                                                            onChange={this.handleChange('selectedContact', 'fax')}/>
                                                                                    </div>
                                                                                    <div className="col-sm-6">
                                                                                        <p style={{marginBottom: 10}}>Pays</p>
                                                                                        <select
                                                                                            className="form-control custom-select"
                                                                                            id="pays"
                                                                                            name="pays"
                                                                                            placeholder="Pays"
                                                                                            value={this.state.selectedContact.pays }
                                                                                            onChange={this.handleChange('selectedContact', 'pays')}>
                                                                                            {
                                                                                                countryList.map((country,key) =>
                                                                                                    <option key={key}  value={country.Name} label={country.Name} />
                                                                                                )
                                                                                            }

                                                                                        </select>
                                                                                    </div>
                                                                                </div>
                                                                            </TabPanel>

                                                                            <TabPanel>
                                                                                <h5 style={{marginTop:20}}>Famille & Vie privée</h5>
                                                                                <div className="row" style={{marginTop: 35}}>
                                                                                    <div className="col-md-12">
                                                                                        <p style={{marginBottom: 10}}>Décrire en quelques lignes </p>
                                                                                        <textarea
                                                                                            rows={10}
                                                                                            className="form-control"
                                                                                            id="about"
                                                                                            name="about"
                                                                                            value={this.state.selectedContact.personalLife}
                                                                                            onChange={this.handleChange('selectedContact', 'personalLife')}/>
                                                                                    </div>
                                                                                </div>
                                                                            </TabPanel>

                                                                            <TabPanel>
                                                                                <h5 style={{marginTop:20}}>Parcours professionnel</h5>
                                                                                <div style={{display: 'flex', flexWrap: 'wrap',marginTop:10}}>
                                                                                    {
                                                                                        (this.state.selectedContact.parcoursP || []).map((item, key) => (
                                                                                            <div key={key} style={{margin:3}}>
                                                                                                <Chip
                                                                                                    icon={<Staricon/>}
                                                                                                    label={item}
                                                                                                    color="secondary"
                                                                                                    onDelete={this.removeItem('parcour', key)}
                                                                                                    style={{fontWeight:"bold",backgroundColor:"cornflowerblue"}}
                                                                                                />
                                                                                            </div>
                                                                                        ))
                                                                                    }
                                                                                </div>
                                                                                <div className="row" style={{marginTop: 10}}>
                                                                                    <div
                                                                                        className="col-sm-12">
                                                                                        <a style={{
                                                                                            cursor: 'pointer',
                                                                                            fontSize: "medium",
                                                                                            fontWeight: "bold"
                                                                                        }}
                                                                                           onClick={this.openAddModal('parcour')}>
                                                                                            <span className="btn__text"
                                                                                                  id="btn-add-child">
                                                                                                <i className="fe-plus-square"/> Ajouter un parcour
                                                                                            </span>
                                                                                        </a>
                                                                                    </div>
                                                                                </div>
                                                                            </TabPanel>

                                                                            <TabPanel>
                                                                                <h5 style={{marginTop:20}}>Formation</h5>
                                                                                <div style={{flexWrap: 'wrap',marginTop:10}}>
                                                                                    {
                                                                                        (this.state.selectedContact.formations || []).map((item, key) => (
                                                                                            <div key={key} style={{margin:3,marginBottom:6}}>
                                                                                                <Chip
                                                                                                    icon={<CheckCircle/>}
                                                                                                    label={item}
                                                                                                    color="primary"
                                                                                                    onDelete={this.removeItem('formation', key)}
                                                                                                    style={{fontWeight:"bold",backgroundColor:"lightseagreen"}}
                                                                                                />
                                                                                            </div>
                                                                                        ))
                                                                                    }
                                                                                </div>
                                                                                <div className="row" style={{marginTop: 10}}>
                                                                                    <div
                                                                                        className="col-sm-12">
                                                                                        <a style={{
                                                                                            cursor: 'pointer',
                                                                                            fontSize: "medium",
                                                                                            fontWeight: "bold"
                                                                                        }}
                                                                                           onClick={this.openAddModal('formation')}>
                                                                                            <span className="btn__text"
                                                                                                  id="btn-add-child">
                                                                                                <i className="fe-plus-square"/> Ajouter une formation
                                                                                            </span>
                                                                                        </a>
                                                                                    </div>
                                                                                </div>
                                                                            </TabPanel>

                                                                            <TabPanel>
                                                                                <h5 style={{marginTop:20}}>Langues</h5>
                                                                                <div style={{display: 'flex', flexWrap: 'wrap',marginTop:10}}>
                                                                                    {
                                                                                        (this.state.selectedContact.langues || []).map((item, key) => (
                                                                                            <div key={key} style={{margin:3}}>
                                                                                                <Chip
                                                                                                    icon={<LanguageIcon/>}
                                                                                                    label={item}
                                                                                                    color="secondary"
                                                                                                    onDelete={this.removeItem('langue', key)}
                                                                                                    style={{fontWeight:"bold",backgroundColor:"steelblue"}}
                                                                                                />
                                                                                            </div>
                                                                                        ))
                                                                                    }
                                                                                </div>
                                                                                <div className="row" style={{marginTop: 20}}>
                                                                                    <div
                                                                                        className="col-sm-12">
                                                                                        <a style={{
                                                                                            cursor: 'pointer',
                                                                                            fontSize: "medium",
                                                                                            fontWeight: "bold"
                                                                                        }}
                                                                                           onClick={this.openAddModal('langue')}>
                                                                                            <span className="btn__text"
                                                                                                  id="btn-add-child">
                                                                                                <i className="fe-plus-square"/> Ajouter une langue
                                                                                            </span>
                                                                                        </a>
                                                                                    </div>
                                                                                </div>

                                                                            </TabPanel>

                                                                            <TabPanel>

                                                                                <h5 style={{marginTop:20}}>Domaines d'intérêt, loisirs et sports</h5>
                                                                                <div className="row">
                                                                                    <div className="col-md-8">
                                                                                        <div style={{display: 'flex', flexWrap: 'wrap',marginTop:10}}>
                                                                                            {
                                                                                                (this.state.selectedContact.hobbies || []).map((item, key) => (
                                                                                                    <div key={key} style={{margin:3}}>
                                                                                                        <Chip
                                                                                                            icon={<MoodIcon/>}
                                                                                                            label={item}
                                                                                                            color="secondary"
                                                                                                            onDelete={this.removeItem('hobbies', key)}
                                                                                                            style={{fontWeight:"bold",backgroundColor:"lightpink"}}
                                                                                                        />
                                                                                                    </div>
                                                                                                ))
                                                                                            }
                                                                                        </div>
                                                                                    </div>

                                                                                </div>

                                                                                <div className="row" style={{marginTop: 20}}>
                                                                                    <div
                                                                                        className="col-sm-12">
                                                                                        <a style={{
                                                                                            cursor: 'pointer',
                                                                                            fontSize: "medium",
                                                                                            fontWeight: "bold"
                                                                                        }}
                                                                                           onClick={this.openAddModal('hobbies')}>
                                                                                            <span className="btn__text"
                                                                                                  id="btn-add-child">
                                                                                                <i className="fe-plus-square"/> Ajouter un centre d'intérêt, loisir ou sport
                                                                                            </span>
                                                                                        </a>
                                                                                    </div>
                                                                                </div>

                                                                            </TabPanel>
                                                                        </Tabs>
                                                                    </div>

                                                                    {/*<ul className="social-list list-inline mt-3 mb-0">
                                                                        <li className="list-inline-item">
                                                                            <a className="social-list-item border-primary text-primary"><i
                                                                                className="mdi mdi-facebook"/></a>
                                                                        </li>
                                                                        <li className="list-inline-item">
                                                                            <a className="social-list-item border-danger text-danger"><i
                                                                                className="mdi mdi-google"/></a>
                                                                        </li>
                                                                        <li className="list-inline-item">
                                                                            <a className="social-list-item border-info text-info"><i
                                                                                className="mdi mdi-twitter"/></a>
                                                                        </li>
                                                                        <li className="list-inline-item">
                                                                            <a className="social-list-item border-secondary text-secondary"><i
                                                                                className="mdi mdi-github-circle"/></a>
                                                                        </li>
                                                                    </ul>*/}
                                                                </div>
                                                            </div>

                                                        </div>

                                                    </div> : null
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
                                                    this.setState({loadDocSpinner: true})
                                                    SmartService.getFile(this.state.selectedDoc.id, localStorage.getItem("token"), localStorage.getItem("usrtoken")).then(fileRes => {
                                                        console.log(fileRes)
                                                        if (fileRes.succes === true && fileRes.status === 200) {
                                                            this.setState({loadDocSpinner: false})
                                                            this.showDocInPdfModal(fileRes.data.Content.Data)
                                                        } else {
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
                                    <div align="center" style={{marginTop: 120}}>
                                        <CircularProgress color="secondary"/>
                                    </div>

                                }


                            </div>

                        </div>
                    </Drawer>

                    <Drawer anchor="right" open={this.state.openRightContactModalDetail} onClose={() => {
                        this.setState({openRightContactModalDetail: false})
                    }}>
                        <div style={{width: 420}}>
                            <div style={{padding: "1.1rem 1.1rem"}}>
                                <div className="card-box">
                                    <div className="media mb-3">


                                        <div className="media-body text-center ">

                                            <div className="row">
                                                <div className="col-12">
                                                    <div className="media justify-content-center">
                                                        <img className=" rounded-circle "
                                                             src={this.state.selectedContact.imageUrl || defaultAvatar}
                                                             alt=""
                                                             style={{height: 80, width: 80, objectFit: "cover"}}/>

                                                    </div>
                                                    <div className="mt-1">
                                                        <div
                                                            className="ml-1 font-weight-bold">{this.state.selectedContact.nom} {this.state.selectedContact.prenom} </div>
                                                    </div>

                                                    <div className="">
                                                        <small>{this.state.selectedContact.specialite}</small>
                                                    </div>

                                                    <button className="btn btn-xs btn-info"
                                                            style={{margin: "0.2rem"}}>Envoyer email
                                                    </button>
                                                    <button className="btn btn-xs btn-danger"
                                                            style={{margin: "0.2rem"}}>Appeler
                                                    </button>
                                                    <button className="btn btn-xs btn-light" style={{margin: "0.2rem"}}
                                                            onClick={() => {
                                                                this.setState({openRightContactModalDetail: false})
                                                                setTimeout(() => {
                                                                    this.setState({editContactForm: true})
                                                                }, 400)
                                                            }}
                                                    >
                                                        Éditer
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <h5 className="mb-3 mt-4 text-uppercase bg-light p-2">
                                        <i className="mdi mdi-account-circle mr-1"/>Renseignements personnels</h5>
                                    <div className="">
                                        <h4 className="font-13 text-muted text-uppercase">APARTÉ :</h4>
                                        <p className="mb-3">
                                            {this.state.selectedContact.aparte}
                                        </p>

                                        <h4 className="font-13 text-muted text-uppercase mb-1">Langues</h4>
                                        <p className="mb-3"> {this.state.selectedContact.langues}</p>

                                        <h4 className="font-13 text-muted text-uppercase mb-1">Numéro de téléphone</h4>
                                        <p className="mb-3">{this.state.selectedContact.phone}</p>

                                        <h4 className="font-13 text-muted text-uppercase mb-1">Email</h4>
                                        <p className="mb-3"> {this.state.selectedContact.email}</p>

                                        <h4 className="font-13 text-muted text-uppercase mb-1">Pays</h4>
                                        <p className="mb-0"> {this.state.selectedContact.pays}</p>

                                    </div>

                                </div>
                            </div>
                        </div>
                    </Drawer>


                    <Modal isOpen={this.state.showPDFModal} size="lg" zIndex={1500}
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

                    <Modal isOpen={this.state.showPdfPreviewModal} size="lg" zIndex={1500}
                           toggle={() => this.setState({showPdfPreviewModal: !this.state.showPdfPreviewModal,isDocPreviewReady:false})}>
                        <ModalHeader toggle={() => this.setState({showPdfPreviewModal: !this.state.showPdfPreviewModal,isDocPreviewReady:false})}>
                            Document
                        </ModalHeader>
                        <ModalBody>
                            {
                                this.state.isDocPreviewReady === true && (
                                    <PdfView width={"100%"} height={800} >
                                        <Resume title={"Resume of "+ this.state.selectedContact.nom} name={this.state.selectedContact.nom}
                                                speciality={this.state.selectedContact.specialite+"("+this.state.selectedContact.pays+")"} email={this.state.selectedContact.email}
                                                image={this.state.selectedContact.imageUrl} about={this.state.selectedContact.about}
                                                personalLife={this.state.selectedContact.personalLife}
                                                parcoursP={this.state.selectedContact.parcoursP || []}
                                                langues={this.state.selectedContact.langues || []} hobbies={this.state.selectedContact.hobbies || []}
                                                formations={this.state.selectedContact.formations || []}
                                                firstPageImage={require("../../assets/images/SwissWhoWho.jpeg")}
                                        />
                                    </PdfView>
                                )

                            }
                        </ModalBody>
                    </Modal>

                    <Modal isOpen={this.state.showPdfFlipModal} size="lg" zIndex={1500}
                           toggle={() => this.setState({showPdfFlipModal: !this.state.showPdfFlipModal})}>
                        <ModalHeader toggle={() => this.setState({showPdfFlipModal: !this.state.showPdfFlipModal})}>
                            Document
                        </ModalHeader>
                        <ModalBody>
                            <FlipPage orientation="horizontal" uncutPages={true} width={"100%"} height={800}
                                      showSwipeHint={true} showHint={true} showTouchHint={true}
                            >
                                <article>
                                    <img alt="" src={require("../../assets/images/SwissWhoWho.jpeg")} style={{width:"100%",height:750,objectFit:"contain"}}/>
                                </article>
                                <article style={{padding:30}}>

                                    <FHeader name={this.state.selectedContact.nom} speciality={this.state.selectedContact.speciality}
                                             email={this.state.selectedContact.email} />
                                    <div>
                                        <img alt=""
                                            src={this.state.selectedContact.imageUrl} style={{ marginTop:20, marginBottom: 10,
                                            width:200,height:200,objectFit:"cover"}}
                                        />
                                    </div>
                                    <div style={{marginTop:40}}>
                                        <FTitle>À propos</FTitle>
                                        <div style={{fontSize: 13,color:"#000"}}>{this.state.selectedContact.about || ""}</div>
                                    </div>
                                    <div style={{marginTop:40}}>
                                        <FTitle>Famille & Vie privée</FTitle>
                                        <div style={{fontSize: 13,color:"#000"}}>{this.state.selectedContact.personalLife || ""}</div>
                                    </div>

                                </article>
                                <article style={{padding:30}}>
                                    <div className="row">
                                        <div className="col-md-4">
                                            <div style={{marginTop:40}}>
                                                <FTitle>Langues</FTitle>
                                                <ul>
                                                    {(this.state.selectedContact.langues || []).map((item, i) => (
                                                        <li key={i} style={{color:"#000"}}>{item}</li>
                                                    ))}
                                                </ul>
                                            </div>
                                            <div style={{marginTop:55}}>
                                                <FTitle>Domaines d'intérêt, loisirs et sports</FTitle>
                                                <ul>
                                                    {(this.state.selectedContact.hobbies || []).map((item, i) => (
                                                        <li key={i} style={{color:"#000"}}>{item}</li>
                                                    ))}
                                                </ul>
                                            </div>
                                        </div>
                                        <div className="col-md-8">
                                            <div style={{marginTop:40}}>
                                                <FTitle>Parcour professionnel</FTitle>
                                                <ul>
                                                    {(this.state.selectedContact.parcoursP || []).map((item, i) => (
                                                        <li key={i} style={{color:"#000"}}>{item}</li>
                                                    ))}
                                                </ul>
                                            </div>
                                            <div style={{marginTop:55}}>
                                                <FTitle>Formations</FTitle>
                                                <ul>
                                                    {(this.state.selectedContact.formations || []).map((item, i) => (
                                                        <li key={i} style={{color:"#000"}}>{item}</li>
                                                    ))}
                                                </ul>
                                            </div>
                                        </div>

                                    </div>
                                </article>
                            </FlipPage>
                        </ModalBody>
                    </Modal>


                    <Modal isOpen={this.state.newFolderModal} size="md" centered={true}
                           toggle={() => this.setState({
                               newFolderModal: !this.state.newFolderModal,
                               newFolderFromRacine: false
                           })}
                    >
                        <ModalHeader toggle={() => this.setState({
                            newFolderModal: !this.state.newFolderModal,
                            newFolderFromRacine: false
                        })}>
                            Nouveau doossier
                        </ModalHeader>
                        <ModalBody>

                            <div style={{marginTop: 35}}>
                                <input className="form-control" placeholder="Nom du dossier"
                                       onChange={event => this.setState({newFolderName: event.target.value})}/>
                            </div>
                            <div style={{marginTop: 15, textAlign: "right"}}>
                                <button className="btn btn-success  font-weight-normal"
                                        style={{fontFamily: "sans-serif"}}
                                        onClick={() => {
                                            SmartService.addFolder({
                                                name: this.state.newFolderName,
                                                folder_id: this.state.newFolderFromRacine === true ? null : this.state.selectedFolderId
                                            }, localStorage.getItem("token"), localStorage.getItem("usrtoken")).then(addfolderRes => {
                                                console.log(addfolderRes)
                                                if (addfolderRes.succes === true && addfolderRes.status === 200) {
                                                    this.reloadGed();
                                                    setTimeout(() => {
                                                        this.setState({
                                                            newFolderModal: false,
                                                            newFolderFromRacine: false
                                                        })
                                                    }, 500)
                                                } else {
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
                            <p style={{fontFamily: "sans-serif", marginTop: 25}}>Partagez ces informations avec les
                                personnes que vous souhaitez inviter à la réunion.</p>
                            <p style={{fontFamily: "sans-serif", color: "#000"}}>{this.state.meeturl}</p>
                            <div style={{backgroundColor: "#d3d3d3", height: 1}}/>
                            <div align="center" style={{marginTop: 30}}>
                                <h5>Ou</h5>
                                {/*<button className="btn btn-rounded btn-light">Ajouter</button>*/}
                            </div>
                            <h4 className="text-success"><i className="fe-user-plus text-success"/>&nbsp;Inviter</h4>
                            <p style={{fontFamily: "sans-serif"}}>Tapez sur 'Entrée' pour valider une adresse mail</p>
                            <ReactMultiEmail
                                style={{
                                    maxWidth: "100%",
                                    width: "100%",
                                    fontFamily: "sans-serif",
                                    fontWeight: "normal"
                                }}
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
                            <div style={{marginTop: 15, textAlign: "right"}}>
                                <button className="btn btn-success  font-weight-normal"
                                        style={{fontFamily: "sans-serif"}}
                                        disabled={this.state.inviteEmails.length === 0}
                                        onClick={() => {
                                            emailService.sendMailsWithurl({
                                                recipients: this.state.inviteEmails,
                                                subject: "Invitation pour rejoindre une réunion sur OALegal",

                                                linkUrl: "Cliquer ici pour réjoindre la réunion",
                                                url: this.state.meeturl,

                                                msg: "Bonjour, <br> Vous etes invité à réjoindre une réunion sur oalegal.org . <br> Cliquer sur ce lien pour accéder directement.<br><br>",

                                                footerMsg: "<br><br> Cordialement"
                                            }).then(ok => {
                                                this.openSnackbar("success", "Les invitations sont bien envoyées au participants !")
                                                this.setState({showInviteModal: false})
                                            }).catch(err => {
                                                console.log(err);
                                                this.openSnackbar("error", err)
                                            })
                                        }}
                                >
                                    Envoyer e-mail
                                </button>
                            </div>

                        </ModalBody>
                    </Modal>


                    <Modal isOpen={this.state.showModalAdd} size="md" centered={true}
                           toggle={() => this.setState({showModalAdd: !this.state.showModalAdd})}>
                        <ModalHeader toggle={() => this.setState({
                            showModalAdd: !this.state.showModalAdd})}>
                            {
                                this.state.add === "formation" ? "Ajouter une formation" :
                                    this.state.add === "fonction" ? "Ajouter une fonction" :
                                        this.state.add === "domaine" ? "Ajouter un domaine" :
                                            this.state.add === "affiliation" ? "Ajouter une affiliation" :
                                                this.state.add === "parcour" ? "Ajouter un parcour" :
                                                    this.state.add === "langue" ? "Ajouter une langue" :
                                                        this.state.add === "hobbies" ? "Ajouter un centre d'intérêt, loisir ou sport" : null
                            }
                        </ModalHeader>
                        <ModalBody>
                            <p style={{marginBottom: 10}}>
                                {
                                    this.state.add === "formation" ? "Formation" :
                                        this.state.add === "fonction" ? "Fonction" :
                                            this.state.add === "domaine" ? "Domaine" :
                                                this.state.add === "affiliation" ? "Affiliation" :
                                                    this.state.add === "parcour" ? "Parcour" :
                                                        this.state.add === "langue" ? "Langue" :
                                                            this.state.add === "hobbies" ? "Centre d'intérêt" : null


                                }
                            </p>
                            {
                                (this.state.add === "formation" || this.state.add === "fonction" || this.state.add === "formation"
                                    || this.state.add === "affiliation" || this.state.add === "parcour"|| this.state.add === "langue" || this.state.add === "hobbies") &&
                                <textarea className="form-control" id="inputText"
                                          name="inputText"
                                          style={{width: 400}}
                                          value={
                                              this.state.add === "formation" ? this.state.formationTmp :
                                                  this.state.add === "fonction" ? this.state.fonctionTmp :
                                                      this.state.add === "affiliation" ? this.state.affiliationTmp :
                                                          this.state.add === "parcour" ? this.state.parcourTmp :
                                                              this.state.add === "langue" ? this.state.langueTmp :
                                                                  this.state.add === "hobbies" ? this.state.hobbiesTmp : null

                                          }
                                          onChange={(event) =>
                                              this.state.add === 'formation' ?
                                                  this.setState({formationTmp: event.target.value}) :
                                                  this.state.add === "fonction" ?
                                                      this.setState({fonctionTmp: event.target.value}) :
                                                      this.state.add === "affiliation" ?
                                                          this.setState({affiliationTmp: event.target.value}) :
                                                          this.state.add === "parcour" ?
                                                              this.setState({parcourTmp: event.target.value}) :
                                                              this.state.add === "langue" ?
                                                                  this.setState({langueTmp: event.target.value}) :
                                                                  this.state.add === "hobbies" ?
                                                                      this.setState({hobbiesTmp: event.target.value}) : null

                                          }
                                />
                            }
                            {
                                this.state.add === "domaine" &&
                                <div style={{width: 400}}>
                                    <FormControl style={{width: "80%"}}>
                                        <InputLabel shrink id="demo-simple-select-placeholder-label-label">
                                            Domaine n°1
                                        </InputLabel>
                                        <MuiSelect
                                            style={{width: "100%"}}
                                            labelId="demo-simple-select-placeholder-label-label"
                                            id="demo-simple-select-placeholder-label"
                                            value={this.state.domaine.domaine}
                                            onChange={(e) => {
                                                this.handleChangeDomaine(e)
                                            }}
                                        >
                                            <MenuItem value={"COMPTABILITE"}>COMPTABILITÉ</MenuItem>
                                            <MenuItem value={"SALAIRES"}>SALAIRES</MenuItem>
                                            <MenuItem value={"TVA"}>TVA</MenuItem>
                                            <MenuItem value={"IMPOTS"}>IMPOTS</MenuItem>


                                        </MuiSelect>
                                    </FormControl>
                                    <FormControl style={{width: "80%"}}>
                                        <InputLabel style={{fontSize: "100%"}} id="demo-mutiple-chip-label">Les spécialités recherchées </InputLabel>
                                        <MuiSelect
                                            labelId="demo-mutiple-chip-label"
                                            id="demo-mutiple-chip"
                                            multiple
                                            value={this.state.domaine.specialite}
                                            onChange={(e) => {
                                                this.handleChangeSpecialite(e)
                                            }}
                                            input={<Input id="select-multiple-chip"/>}
                                            renderValue={(selected) => (
                                                <div style={{display: 'flex', flexWrap: 'wrap'}}>
                                                    {selected.map((value) => (
                                                        <Chip style={{margin: "2%"}} key={value} label={value}/>
                                                    ))}
                                                </div>
                                            )}

                                        >
                                            {this.state.domaine.domaine === "COMPTABILITE" &&

                                            data.comptabilite.map((name) => (
                                                <MenuItem key={name} value={name}>
                                                    {name}
                                                </MenuItem>
                                            ))
                                            }
                                            {this.state.domaine.domaine === "SALAIRES" &&

                                            data.salaire.map((name) => (
                                                <MenuItem key={name} value={name}>
                                                    {name}
                                                </MenuItem>
                                            ))
                                            }
                                            {this.state.domaine.domaine === "IMPOTS" &&

                                            data.map((name) => (
                                                <MenuItem key={name} value={name}>
                                                    {name}
                                                </MenuItem>
                                            ))
                                            }
                                        </MuiSelect>
                                    </FormControl>
                                </div>

                            }
                            <div className="text-center" style={{marginTop: 10}}>
                                <button type="button" onClick={
                                    this.state.add === "formation" ? this.addItem('formation') :
                                        this.state.add === "fonction" ? this.addItem('fonction') :
                                            this.state.add === "domaine" ? this.addItem('domaine') :
                                                this.state.add === "affiliation" ? this.addItem('affiliation') :
                                                    this.state.add === "parcour" ? this.addItem('parcour') :
                                                        this.state.add === "langue" ? this.addItem('langue') :
                                                            this.state.add === "hobbies" ? this.addItem('hobbies') : null
                                }
                                        className="btn btn-success btn waves-effect mb-2 waves-light">
                                    Valider
                                </button>
                            </div>
                        </ModalBody>
                    </Modal>


                    <Dialog open={this.state.openShareDocModal} onClose={() => {this.setState({openShareDocModal:!this.state.openShareDocModal})}}
                            aria-labelledby="form-dialog-title">
                        <DialogTitle id="form-dialog-title" style={{marginLeft:-22,marginBottom:-10}}>
                            <IconButton aria-label="Partager" color="primary">
                                <PersonAddIcon />
                            </IconButton>
                            Partager avec des personnes et des groupes
                        </DialogTitle>
                        <DialogContent>
                            <div className="row">
                                <div className="col-md-12">
                                    <div style={{marginLeft:11}}>
                                        <Chips
                                            chips={[]}
                                            placeholder='Ajouter des personnes'
                                            save={data => {
                                                console.log(data)
                                                this.setState({emailsDriveShare:data})
                                            }}
                                            pattern={pattern}
                                            requiredMessage={"Email incorrect"}
                                            required={true}
                                            limit={20}
                                            limitMessage="Vous avez atteint le nombre maximal d'e-mails"
                                        />
                                    </div>
                                </div>
                                <div className="col-md-12">
                                        <h5>Droits d'accès</h5>
                                        <Autocomplete
                                            title={"Droits d'accès"}
                                            multiple
                                            id="checkboxes-tags-demo"
                                            options={data.Acces}
                                            disableCloseOnSelect
                                            getOptionLabel={(option) => option}
                                            renderOption={(option, { selected }) => (
                                                <React.Fragment>
                                                    <MuiCheckbox
                                                        icon={icon}
                                                        checkedIcon={checkedIcon}
                                                        style={{ marginRight: 8 }}
                                                        checked={selected}
                                                    />
                                                    {option}
                                                </React.Fragment>
                                            )}
                                            style={{ width: 500,marginLeft:10,borderColor:"#f0f0f0" }}
                                            renderInput={(params) => (
                                                <TextField {...params} variant="outlined" placeholder="" />
                                            )}
                                        />

                                </div>

                                <div className="col-md-12" style={{marginTop:20}}>
                                    <FormControlLabel
                                        control={<MuiCheckbox checked={this.state.checkedNotif} onChange={() => this.setState({checkedNotif:!this.state.checkedNotif})}
                                                              name="checkedNotif"
                                        />}
                                        label="Envoyer une notification"
                                    />
                                </div>
                                {
                                    this.state.checkedNotif === true &&
                                    <div className="col-md-12">
                                        <TextField id="msg-notif" label="Message" variant="filled" value={this.state.msgNotif}
                                                   onChange={(event)=> this.setState({msgNotif:event.target.value})}
                                                   multiline rows={5} style={{width:500,marginLeft:8}}
                                        />
                                    </div>
                                }
                                <div className="col-md-12" style={{marginTop:15}}>
                                    <Chip icon={<FolderIcon />}
                                        label={this.state.selectedFoldername}
                                          style={{fontWeight:"bold",backgroundColor:"white",border:"1px solid #c0c0c0"}}
                                    />
                                </div>
                            </div>

                        </DialogContent>
                        <DialogActions style={{padding:20}}>
                            <MuiButton onClick={() => {this.setState({openShareDocModal:false})}} color="primary" style={{textTransform:"capitalize"}}>
                                Annuler
                            </MuiButton>
                            <MuiButton disabled={(this.state.checkedNotif === true && this.state.msgNotif === "") || this.state.emailsDriveShare.length === 0 }
                                       onClick={() => {
                                           this.setState({loading:true,openShareDocModal:false})
                                           SmartService.share(this.state.selectedFolderId,
                                               {
                                                   to:this.state.emailsDriveShare[0].email,
                                                   access: {administrate: true, share: true, edit: false, read: true}
                                                   },
                                               localStorage.getItem("token"),localStorage.getItem("usrtoken")).then( share => {
                                               if(share.succes === true && share.status === 200){
                                                   this.setState({loading:false,openShareDocModal:false})
                                                   this.openSnackbar("success","Le partage du dossier est effectué avec succès, Un mail d'invitation à été envoyé au personnes ajoutées")
                                               }else{
                                                   console.log(share.error)
                                                   this.setState({loading:false})
                                                   this.openSnackbar("error",share.error)
                                               }

                                           }).catch(err => {
                                               this.setState({loading:false})
                                               console.log(err)
                                           })

                            }}
                                       color="primary" variant="contained" style={{textTransform:"capitalize"}}>
                                Envoyer
                            </MuiButton>
                        </DialogActions>
                    </Dialog>


                    <Snackbar
                        open={this.state.openAlert}
                        autoHideDuration={7000}
                        onClose={this.closeSnackbar}
                    >
                        <Alert elevation={6} variant="filled" onClose={this.closeSnackbar} severity={this.state.alertType}>
                            {this.state.alertMessage}
                        </Alert>
                    </Snackbar>

                </div>
            </div>
        )
    }

}


export default Drive;