import React from "react";
import {Modal, ModalBody, ModalHeader} from "reactstrap";
import moment from "moment";
import PDFViewer from "../../customComponents/pdf-viewer-reactjs";
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
import TopBar from "../../components/TopBar/TopBar";
import logo from "../../assets/images/logos/logo-OA-dark.png";
import SideMenu from "../../components/SideMenu/SideMenu";
import data from "../../data/Data";
import SmartService from "../../provider/SmartService";
import CircularProgress from '@material-ui/core/CircularProgress';
import LeftMenu from "../../components/Menu/LeftMenu";
import MuiBackdrop from "../../components/Loading/MuiBackdrop";
import emailService from "../../provider/emailService";
import MySnackbarContentWrapper from "../../tools/customSnackBar";
import Snackbar from "@material-ui/core/Snackbar";
import firebase from "firebase";
import defaultAvatar from "../../assets/images/users/default_avatar.jpg";
import {
    FormControl,
    MenuItem,
    Select as MuiSelect,
    InputLabel,
    Input, Chip
} from '@material-ui/core';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import Resume from "../../components/Pdf/Resume";
import { PDFViewer as PdfView } from '@react-pdf/renderer';
import Header from "../../components/Pdf/Header";


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

        selectedFoldername: "",
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
        affiliationTmp: '',

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


        if (localStorage.getItem('email') === undefined || localStorage.getItem('email') === null) {
            this.props.history.push('/login')
        } else {
            this.setState({loading: true});
            setTimeout(() => {
                SmartService.getGed(localStorage.getItem("token"), localStorage.getItem("usrtoken")).then(gedRes => {
                    console.log(gedRes)
                    if (gedRes.succes === true && gedRes.status === 200) {

                        let meeturl = "https://meet.smartdom.ch/meet_" + moment().format("DDMMYYYYHHmmss")

                        firebase.database().ref('/contacts').on('value', (snapshot) => {
                            const contacts = snapshot.val() || [];
                            //console.log(contacts)
                            this.setState({
                                folders: gedRes.data.Proprietary.Content.folders || [],
                                selectedFoldername: gedRes.data.Proprietary.Content.folders[0] ? gedRes.data.Proprietary.Content.folders[0].name :  "",
                                selectedFolderId: gedRes.data.Proprietary.Content.folders[0] ? gedRes.data.Proprietary.Content.folders[0].id : "",
                                meeturl: meeturl,
                                contacts: contacts,
                                selectedFolderFiles: gedRes.data.Proprietary.Content.folders[0] ? gedRes.data.Proprietary.Content.folders[0].Content.files : [],
                                loading: false
                            })
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
                    //console.log(gedRes)
                    this.setState({
                        folders: gedRes.data.Proprietary.Content.folders || [],
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
                fiducaire: selectedContact
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

    render() {

        return (
            <div>
                <TopBar logo={logo} height={80} onClickMenuIcon={() => this.setState({openSideMenu: true})}/>
                <SideMenu logo={logo} items={data.sideBarItems} iconColor={"blue"} textColor={"#65728E"}
                          history={this.props.history}
                          opened={this.state.openSideMenu} onClose={() => this.setState({openSideMenu: false})}/>
                <MuiBackdrop open={this.state.loading}/>

                <div style={{marginRight: 50, marginTop: 100, marginLeft: 5}}>
                    <div>
                        <div style={{display: "flex"}}>

                            <div style={{height: "100%"}}>
                                <div>
                                    <LeftMenu openNewFolderModalFromRacine={() => this.setState({
                                        newFolderModal: true,
                                        newFolderFromRacine: true
                                    })}
                                              openNewFolderModal={() => this.setState({newFolderModal: true})}
                                              showNewFileScreen={() => this.setState({
                                                  showNewDocScreen: true,
                                                  showUploadStep: "upload"
                                              })}
                                              showDriveMenuItems={this.state.openDriveMenuItem}
                                              setShowDriveMenuItems={() => this.setState({openDriveMenuItem: !this.state.openDriveMenuItem})}
                                              showRoomsMenuItems={this.state.openRoomMenuItem}
                                              setShowRoomsMenuItems={() => this.setState({openRoomMenuItem: !this.state.openRoomMenuItem})}
                                              rooms={data.rooms}
                                              showMeetMenuItems={this.state.openMeetMenuItem}
                                              setShowMeetMenuItems={() => this.setState({openMeetMenuItem: !this.state.openMeetMenuItem})}
                                              driveFolders={this.state.folders || []}
                                              setFolderName={(name) => this.setState({selectedFoldername: name})}
                                              setFolderId={(id) => this.setState({
                                                  selectedFolderId: id,
                                                  showContainerSection: "Drive"
                                              })}
                                              setSelectedFolderFiles={(files) => this.setState({selectedFolderFiles: files})}
                                              selectedDriveItem={this.state.showContainerSection === "Drive" && [this.state.selectedFolderId === "" ? this.state.folders.length > 0 ? this.state.folders[0].id : "" : this.state.selectedFolderId]}
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
                                              showContacts={this.state.openContactsMenu}
                                              setShowContacts={() => {
                                                  this.setState({showContainerSection: "Contacts"})
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
                                                            <div style={{
                                                                display: "flex",
                                                                justifyContent: "space-between"
                                                            }}>
                                                                <div>
                                                                    <h4 className="mt-0 mb-1">{this.state.selectedFoldername === "" ? "Mon drive" : this.state.selectedFoldername}</h4>
                                                                    <h6><i
                                                                        className="fa fa-paperclip mb-1"/> Documents <span>({this.state.selectedFolderFiles.length})</span>
                                                                    </h6>
                                                                </div>
                                                            </div>

                                                            <div style={{flexWrap: "wrap", display: "flex"}}>

                                                                {
                                                                    this.state.folders.length === 0 ?
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
                                                                        <button type="button" onClick={() => {}}
                                                                                className="btn btn-danger btn-xs waves-effect mb-2 waves-light m-1">
                                                                            <i className="fe-printer"/>&nbsp;&nbsp;
                                                                            Imprimer
                                                                        </button>
                                                                    </div>

                                                                    {/*<div className="text-left mt-3">
                                                                        <h4 className="font-13 text-uppercase">Aparté
                                                                            :</h4>
                                                                        <p className="text-muted font-13 mb-3">
                                                                            {this.state.selectedContact.aparte}
                                                                        </p>
                                                                        <p className="text-muted mb-2 font-13"><strong
                                                                            style={{color: "#000"}}>Langues :</strong>
                                                                            <span
                                                                                className="ml-2">{this.state.selectedContact.langues} </span>
                                                                        </p>

                                                                        <p className="text-muted mb-2 font-13"><strong
                                                                            style={{color: "#000"}}>Numéro de téléphone
                                                                            :</strong>
                                                                            <span
                                                                                className="ml-2">{this.state.selectedContact.phone}</span>
                                                                        </p>

                                                                        <p className="text-muted mb-2 font-13"><strong
                                                                            style={{color: "#000"}}>Email :</strong>
                                                                            <span
                                                                                className="ml-2 ">{this.state.selectedContact.email}</span>
                                                                        </p>

                                                                        <p className="text-muted mb-1 font-13"><strong
                                                                            style={{color: "#000"}}>Pays :</strong>
                                                                            <span className="ml-2 text-capitalize">{this.state.selectedContact.pays}</span></p>
                                                                    </div>*/}

                                                                    <div style={{marginTop:30}} className="text-left">
                                                                        <Tabs>
                                                                            <TabList>
                                                                                <Tab>Informations générales</Tab>
                                                                                <Tab >Famille</Tab>
                                                                                <Tab>Parcours professionnel</Tab>
                                                                                <Tab>Travail & Publication</Tab>
                                                                                <Tab>Associations et clubs</Tab>
                                                                                <Tab>Adhésions professionnelles</Tab>
                                                                                <Tab>Domaines d'intérêt, loisirs et sports</Tab>
                                                                                <Tab>Preview</Tab>
                                                                            </TabList>
                                                                            <TabPanel>
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
                                                                                    <div
                                                                                        className="col-sm-12">
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
                                                                                </div>
                                                                            </TabPanel>
                                                                            <TabPanel>
                                                                            </TabPanel>
                                                                            <TabPanel>
                                                                            </TabPanel>
                                                                            <TabPanel>
                                                                            </TabPanel>
                                                                            <TabPanel>
                                                                            </TabPanel>
                                                                            <TabPanel>
                                                                            </TabPanel>
                                                                            <TabPanel>
                                                                            </TabPanel>
                                                                            <TabPanel>
                                                                                <PdfView width={800} height={800} >
                                                                                    <Resume title={"Resume of "+ this.state.selectedContact.nom} name={this.state.selectedContact.nom}
                                                                                            speciality={this.state.selectedContact.specialite} email={this.state.selectedContact.email}
                                                                                            image={this.state.selectedContact.imageUrl}
                                                                                    />
                                                                                </PdfView>
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

                                                            {/*<div className="col-lg-12">
                                                                <div className="card" style={{marginTop: 15}}>
                                                                    <div className="card-body">
                                                                        <section style={{
                                                                            marginTop: '25px',
                                                                            marginLeft: '20px',
                                                                            marginRight: '20px'
                                                                        }}>

                                                                            <div className="row">
                                                                                <div className="col-sm-12">
                                                                                    <div>
                                                                                        <div className="row"
                                                                                             style={{marginTop: 20}}>
                                                                                            <div className="col-sm-4">
                                                                                                <div
                                                                                                    className="feature-box">
                                                                                                    <h3>Informations personnelles</h3>
                                                                                                    <div className="row" style={{marginTop: 20}}>
                                                                                                        <div
                                                                                                            className="col-sm-8">
                                                                                                            <p style={{marginBottom: 10}}>Nom</p>
                                                                                                            <input
                                                                                                                className="form-control"
                                                                                                                type="text"
                                                                                                                id="nom"
                                                                                                                name="nom"
                                                                                                                value={this.state.selectedContact.nom}
                                                                                                                onChange={this.handleChange('selectedContact', 'nom')}/>
                                                                                                        </div>
                                                                                                    </div>
                                                                                                    <div className="row" style={{marginTop: 20}}>
                                                                                                        <div
                                                                                                            className="col-sm-8">
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
                                                                                                        <div
                                                                                                            className="col-sm-8">
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
                                                                                                    </div>
                                                                                                    <div className="row" style={{marginTop: 20}}>
                                                                                                        <div
                                                                                                            className="col-sm-8">
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
                                                                                                        <div
                                                                                                            className="col-sm-8">
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
                                                                                                    </div>
                                                                                                    <div className="row" style={{marginTop: 20}}>

                                                                                                        <h3>Domaines</h3>

                                                                                                        {
                                                                                                            this.state.selectedContact.domaine !== undefined &&
                                                                                                            (this.state.selectedContact.domaine || []).map((item, key) => (
                                                                                                                <div
                                                                                                                    className="w-100 mt-2"
                                                                                                                    key={key}>
                                                                                                                    <FormControl>
                                                                                                                        <MuiSelect
                                                                                                                            inputProps={{ readOnly: true }}
                                                                                                                            style={{width: "100%"}}
                                                                                                                            labelId="demo-simple-select-placeholder-label-label"
                                                                                                                            id="demo-simple-select-placeholder-label"
                                                                                                                            value={item.domaine}
                                                                                                                            disableUnderline={true}
                                                                                                                        >
                                                                                                                            <MenuItem
                                                                                                                                value={"COMPTABILITE"}>COMPTABILITÉ</MenuItem>
                                                                                                                            <MenuItem
                                                                                                                                value={"SALAIRES"}>SALAIRES</MenuItem>
                                                                                                                            <MenuItem
                                                                                                                                value={"TVA"}>TVA</MenuItem>
                                                                                                                            <MenuItem
                                                                                                                                value={"IMPOTS"}>IMPOTS</MenuItem>

                                                                                                                        </MuiSelect>

                                                                                                                    </FormControl>

                                                                                                                    <FormControl>
                                                                                                                        <InputLabel
                                                                                                                            style={{fontSize: "100%"}}
                                                                                                                            id="demo-mutiple-chip-label">Les
                                                                                                                            spécialités recherchées  </InputLabel>
                                                                                                                        <MuiSelect
                                                                                                                            disableUnderline={true}
                                                                                                                            inputProps={{ readOnly: true }}
                                                                                                                            labelId="demo-mutiple-chip-label"
                                                                                                                            id="demo-mutiple-chip"
                                                                                                                            multiple
                                                                                                                            value={item.specialite}
                                                                                                                            onChange={(e) => {
                                                                                                                                this.handleChangeSpecialite(e)
                                                                                                                            }}
                                                                                                                            input={
                                                                                                                                <Input
                                                                                                                                    id="select-multiple-chip"/>}
                                                                                                                            renderValue={(selected) => (
                                                                                                                                <div
                                                                                                                                    style={{
                                                                                                                                        display: 'flex',
                                                                                                                                        flexWrap: 'wrap'
                                                                                                                                    }}>
                                                                                                                                    {item.specialite.map((value) => (
                                                                                                                                        <Chip
                                                                                                                                            style={{margin: "2%"}}
                                                                                                                                            key={value}
                                                                                                                                            label={value}/>
                                                                                                                                    ))}
                                                                                                                                </div>
                                                                                                                            )}
                                                                                                                        >
                                                                                                                        </MuiSelect>
                                                                                                                    </FormControl>

                                                                                                                    <div
                                                                                                                        className="row">
                                                                                                                        <div
                                                                                                                            className="col-sm-7">
                                                                                                                            <div
                                                                                                                                className="text--right">
                                                                                                                                <a className="color--primary-2"
                                                                                                                                   onClick={this.removeItem('domaine', key)}
                                                                                                                                   style={{
                                                                                                                                       cursor: 'pointer',
                                                                                                                                       color: "red"
                                                                                                                                   }}>
                                                                                                                                    <span
                                                                                                                                        className="btn__text"
                                                                                                                                        id={'btn-remove-child' + key}>
                                                                                                                                        <i className="fe-minus"/> Enlever cet Domaine
                                                                                                                                    </span>
                                                                                                                                </a>
                                                                                                                            </div>
                                                                                                                        </div>
                                                                                                                    </div>

                                                                                                                </div>
                                                                                                            ))}
                                                                                                    </div>

                                                                                                    <div className="row"
                                                                                                         style={{marginTop: 20}}>
                                                                                                        <div
                                                                                                            className="col-sm-12 ">
                                                                                                            <a style={{
                                                                                                                cursor: 'pointer',
                                                                                                                fontSize: "medium",
                                                                                                                fontWeight: "bold"
                                                                                                            }}
                                                                                                               onClick={this.openAddModal('domaine')}>
                                                                                                                    <span
                                                                                                                        className="btn__text"
                                                                                                                        id="btn-add-child">
                                                                                                                        <i className="fe-plus-square"/> Ajouter un domaine
                                                                                                                    </span>
                                                                                                            </a>
                                                                                                        </div>
                                                                                                    </div>

                                                                                                </div>
                                                                                            </div>
                                                                                            <div className="col-sm-4">
                                                                                                <div
                                                                                                    className="feature-box">
                                                                                                    <h3>Langues</h3>
                                                                                                    <div className="row"
                                                                                                         style={{marginTop: 20}}>
                                                                                                        <div
                                                                                                            className="col-sm-8">

                                                                                                            <input
                                                                                                                className="form-control"
                                                                                                                type="text"
                                                                                                                id="langues"
                                                                                                                name="langues"
                                                                                                                value={this.state.selectedContact.langues}
                                                                                                                onChange={this.handleChange('selectedContact', 'langues')}/>
                                                                                                        </div>
                                                                                                    </div>
                                                                                                </div>
                                                                                                <div
                                                                                                    style={{marginTop: 30}}
                                                                                                    className="feature-box">
                                                                                                    <h3>Formation</h3>
                                                                                                    {
                                                                                                        (this.state.selectedContact.formations || []).map((item, key) => (
                                                                                                            <div
                                                                                                                key={key}>
                                                                                                                <p style={{marginTop: 10}}>• {item}</p>

                                                                                                                <div
                                                                                                                    className="row">
                                                                                                                    <div
                                                                                                                        className="col-sm-7">
                                                                                                                        <div
                                                                                                                            className="text--right">
                                                                                                                            <a className="color--primary-2"
                                                                                                                               onClick={this.removeItem('formation', key)}
                                                                                                                               style={{
                                                                                                                                   cursor: 'pointer',
                                                                                                                                   color: "red"
                                                                                                                               }}>
                                                                                                                                    <span
                                                                                                                                        className="btn__text"
                                                                                                                                        id={'btn-remove-child' + key}>
                                                                                                                                        <i className="fe-minus"/> Enlever cet formation
                                                                                                                                    </span>
                                                                                                                            </a>
                                                                                                                        </div>
                                                                                                                    </div>
                                                                                                                </div>
                                                                                                            </div>


                                                                                                        ))
                                                                                                    }
                                                                                                    <div className="row"
                                                                                                         style={{marginTop: 10}}>
                                                                                                        <div
                                                                                                            className="col-sm-12">
                                                                                                            <a style={{
                                                                                                                cursor: 'pointer',
                                                                                                                fontSize: "medium",
                                                                                                                fontWeight: "bold"
                                                                                                            }}
                                                                                                               onClick={this.openAddModal('formation')}>
                                                                                                                        <span
                                                                                                                            className="btn__text"
                                                                                                                            id="btn-add-child">
                                                                                                                                <i className="fe-plus-square"/> Ajouter une formation
                                                                                                                         </span>
                                                                                                            </a>
                                                                                                        </div>
                                                                                                    </div>
                                                                                                </div>
                                                                                                <div
                                                                                                    style={{marginTop: 30}}
                                                                                                    className="feature-box">
                                                                                                    <h3>En aparté</h3>
                                                                                                    <div className="row"
                                                                                                         style={{marginTop: 20}}>
                                                                                                        <div
                                                                                                            className="col-sm-10">
                                                                                                                    <textarea
                                                                                                                        className="form-control"
                                                                                                                        id="aparte"
                                                                                                                        name="aparte"
                                                                                                                        rows={6}
                                                                                                                        value={this.state.selectedContact.aparte}
                                                                                                                        onChange={this.handleChange('selectedContact', 'aparte')}/>
                                                                                                        </div>
                                                                                                    </div>
                                                                                                </div>
                                                                                            </div>
                                                                                            <div className="col-sm-4">
                                                                                                <div
                                                                                                    className="feature-box">
                                                                                                    <h3>Fonctions</h3>
                                                                                                    {
                                                                                                        (this.state.selectedContact.fonctions || []).map((item, key) => (
                                                                                                            <div
                                                                                                                key={key}>
                                                                                                                <p style={{marginTop: 10}}>• {item}</p>

                                                                                                                <div
                                                                                                                    className="row">
                                                                                                                    <div
                                                                                                                        className="col-sm-7">
                                                                                                                        <div
                                                                                                                            className="text--right">
                                                                                                                            <a className="color--primary-2"
                                                                                                                               onClick={this.removeItem('fonction', key)}
                                                                                                                               style={{
                                                                                                                                   cursor: 'pointer',
                                                                                                                                   color: "red"
                                                                                                                               }}>
                                                                                                                            <span
                                                                                                                                className="btn__text"
                                                                                                                                id={'btn-remove-child' + key}>
                                                                                                                                 <i className="fe-minus"/> Enlever cette fonction
                                                                                                                            </span>
                                                                                                                            </a>
                                                                                                                        </div>
                                                                                                                    </div>
                                                                                                                </div>
                                                                                                            </div>
                                                                                                        ))
                                                                                                    }

                                                                                                    <div className="row"
                                                                                                         style={{marginTop: 10}}>
                                                                                                        <div
                                                                                                            className="col-sm-12">
                                                                                                            <a style={{
                                                                                                                cursor: 'pointer',
                                                                                                                fontSize: "medium",
                                                                                                                fontWeight: "bold"
                                                                                                            }}
                                                                                                               onClick={this.openAddModal('fonction')}>
                                                                                                                        <span
                                                                                                                            className="btn__text"
                                                                                                                            id="btn-add-child">
                                                                                                                            <i className="fe-plus-square"/> Ajouter une fonction
                                                                                                                        </span>
                                                                                                            </a>
                                                                                                        </div>
                                                                                                    </div>


                                                                                                </div>
                                                                                                <div
                                                                                                    style={{marginTop: 30}}
                                                                                                    className="feature-box">
                                                                                                    <h3>Affiliations</h3>
                                                                                                    {
                                                                                                        (this.state.selectedContact.affiliations || []).map((item, key) => (
                                                                                                            <div
                                                                                                                key={key}>
                                                                                                                <p style={{marginTop: 10}}>• {item}</p>

                                                                                                                <div
                                                                                                                    className="row">
                                                                                                                    <div
                                                                                                                        className="col-sm-7">
                                                                                                                        <div
                                                                                                                            className="text--right">
                                                                                                                            <a className="color--primary-2"
                                                                                                                               onClick={this.removeItem('affiliation', key)}
                                                                                                                               style={{
                                                                                                                                   cursor: 'pointer',
                                                                                                                                   color: "red"
                                                                                                                               }}>
                                                                                                                            <span
                                                                                                                                className="btn__text"
                                                                                                                                id={'btn-remove-child' + key}>
                                                                                                                                 <i className="fe-minus"/> Enlever cette affiliation
                                                                                                                            </span>
                                                                                                                            </a>
                                                                                                                        </div>
                                                                                                                    </div>
                                                                                                                </div>
                                                                                                            </div>
                                                                                                        ))
                                                                                                    }
                                                                                                    <div className="row"
                                                                                                         style={{marginTop: 10}}>
                                                                                                        <div
                                                                                                            className="col-sm-12">
                                                                                                            <a style={{
                                                                                                                cursor: 'pointer',
                                                                                                                fontSize: "medium",
                                                                                                                fontWeight: "bold"
                                                                                                            }}
                                                                                                               onClick={this.openAddModal('affiliation')}>
                                                                                                                    <span
                                                                                                                        className="btn__text"
                                                                                                                        id="btn-add-child">
                                                                                                                            <i className="fe-plus-square"/> Ajouter une affiliation
                                                                                                                    </span>
                                                                                                            </a>
                                                                                                        </div>
                                                                                                    </div>

                                                                                                </div>
                                                                                            </div>
                                                                                        </div>
                                                                                    </div>

                                                                                </div>
                                                                            </div>


                                                                        </section>
                                                                    </div>
                                                                </div>
                                                            </div>*/}

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
                           toggle={() => this.setState({
                               newFolderModal: !this.state.newFolderModal,
                               newFolderFromRacine: false
                           })}>
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
                                            this.state.add === "affiliation" ? "Ajouter une affiliation" : null
                            }
                        </ModalHeader>
                        <ModalBody>
                            <p style={{marginBottom: 10}}>
                                {
                                    this.state.add === "formation" ? "Formation" :
                                        this.state.add === "fonction" ? "Fonction" :
                                            this.state.add === "domaine" ? "Domaine" :

                                                this.state.add === "affiliation" ? "Affiliation" : null

                                }
                            </p>
                            {
                                (this.state.add === "formation" || this.state.add === "fonction" || this.state.add === "formation" || this.state.add === "affiliation") &&
                                <textarea className="form-control" id="inputText"
                                          name="inputText"
                                          style={{width: 400}}
                                          value={
                                              this.state.add === "formation" ? this.state.formationTmp :
                                                  this.state.add === "fonction" ? this.state.fonctionTmp :
                                                      this.state.add === "affiliation" ? this.state.affiliationTmp : null

                                          }
                                          onChange={(event) =>
                                              this.state.add === 'formation' ?
                                                  this.setState({formationTmp: event.target.value}) :
                                                  this.state.add === "fonction" ?
                                                      this.setState({fonctionTmp: event.target.value}) :
                                                      this.state.add === "affiliation" ?
                                                          this.setState({affiliationTmp: event.target.value}) : null
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
                                                this.state.add === "affiliation" ? this.addItem('affiliation') : null
                                }
                                        className="btn btn-success btn waves-effect mb-2 waves-light">
                                    Valider
                                </button>
                            </div>
                        </ModalBody>
                    </Modal>


                    <Snackbar
                        anchorOrigin={{
                            vertical: 'bottom',
                            horizontal: 'left',
                        }}
                        open={this.state.openAlert}
                        autoHideDuration={5000}
                        onClose={this.closeSnackbar}
                    >
                        <MySnackbarContentWrapper
                            onClose={this.closeSnackbar}
                            variant={this.state.alertType}
                            message={this.state.alertMessage}
                        />
                    </Snackbar>

                </div>
            </div>
        )
    }

}


export default CoffreFortNewVersion;