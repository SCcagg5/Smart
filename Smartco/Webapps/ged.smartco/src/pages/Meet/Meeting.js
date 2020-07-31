import React from "react";
import { Modal, ModalBody, ModalHeader} from "reactstrap";
import moment from "moment";
import PDFViewer from "../../customComponents/pdf-viewer-reactjs";
import '../../assets/css/multiEmail.css';
import swissImg from "../../assets/images/flags/swiss.svg"
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
import data from "../../data/Data";
import {isEmail, ReactMultiEmail} from "react-multi-email";
import emailService from "../../provider/emailService";
import MySnackbarContentWrapper from "../../tools/customSnackBar";
import Snackbar from "@material-ui/core/Snackbar";
import MuiBackdrop from "../../components/Loading/MuiBackdrop";
import LeftMenu from "../../components/Menu/LeftMenu";





class Meeting extends React.Component {



    constructor(props) {
        super(props);
        this.state = {
            openAlert: false,
            alertMessage: '',
            alertType: '',

            selectedSieMenuItem:"Meet",
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
            inviteEmails: [],
            selectedSignatureType: {id: "Swiss law (ZertES)", image: swissImg},

            showPdfSignToAddForm: true,

            showUploadStep: "",  //upload  // upload_succes // inviteSigners  // signForm  // successfulStep

            selectedSideMenuItem:"nm",

            openRightMenu:false,
            selectedDoc:"",
            openMeeting:false,
            showInviteModal:false,
            showCodeMeetModal:false,
            meetUrl:"",
            meetCode:"",

            openDriveMenuItem:false,
            openMeetMenuItem:false,
            openRoomMenuItem:true
        }
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
            let meeturl = "https://meet.smartdom.ch/meet_"+moment().format("DDMMYYYYHHmmss")
            setTimeout(() => {
                this.setState({loading:false,meeturl:meeturl})
            },500);
        }

    }



    render() {



        return (
            <div>
                <TopBar logo={logo} height={90} onClickMenuIcon={() => this.setState({openSideMenu:true})}/>
                <SideMenu logo={logo} items={data.sideBarItems} iconColor={"blue"} textColor={"#65728E"} history={this.props.history}
                          opened={this.state.openSideMenu} onClose={() => this.setState({openSideMenu:false})} />
                <MuiBackdrop open={this.state.loading}/>

                <div style={{marginRight:50}}>

                            <div>
                                <div style={{display:"flex"}}>
                                    {
                                        this.state.showUploadStep === "" &&
                                        <div style={{height:"100%"}}>

                                            <div>
                                                <LeftMenu  openNewFolderModalFromRacine={() => this.setState({newFolderModal:true,newFolderFromRacine:true})}
                                                           openNewFolderModal={() => this.setState({newFolderModal:true}) }
                                                           showNewFileScreen={() => this.setState({showNewDocScreen:true,showUploadStep:"upload"})}
                                                           showDriveMenuItems={this.state.openDriveMenuItem} setShowDriveMenuItems={() => this.setState({openDriveMenuItem:!this.state.openDriveMenuItem})}
                                                           showRoomsMenuItems={this.state.openRoomMenuItem} setShowRoomsMenuItems={() => this.setState({openRoomMenuItem:!this.state.openRoomMenuItem})}
                                                           showMeetMenuItems={this.state.openMeetMenuItem} setShowMeetMenuItems={() => this.setState({openMeetMenuItem:!this.state.openMeetMenuItem})}
                                                           driveFolders={this.state.folders || [] }
                                                           setFolderName={(name) => this.setState({selectedFoldername:name})}
                                                           setFolderId={(id) => this.setState({selectedFolderId:id})}
                                                           setSelectedFolderFiles={(files) => this.setState({selectedFolderFiles:files})}
                                                           selectedDriveItem={[this.state.selectedFolderId === "" ? this.state.folders.length > 0 ? this.state.folders[0].id : "" : this.state.selectedFolderId] }
                                                           selectedMeetItem={[]}
                                                />

                                            </div>

                                            {/*<div >
                                                <div style={{width:240,marginLeft:20,marginTop:40}}>
                                                    <div className="cf_item">
                                                        <div onClick={()=> {
                                                            this.setState({openMeeting:true,selectedSideMenuItem:"nm"})
                                                        }}
                                                             className={this.state.selectedSideMenuItem === "nm" ? "cf_item_button cf_item_button_active" :"cf_item_button"}>
                                                            <i className="fe-video font-weight-bold"/>&nbsp;&nbsp;Démarrer une réunion
                                                        </div>
                                                    </div>
                                                    <div className="cf_item">
                                                        <div onClick={()=> this.setState({selectedSideMenuItem:"rm"})}
                                                             className={this.state.selectedSideMenuItem === "rm" ? "cf_item_button cf_item_button_active" :"cf_item_button"}>
                                                            <i className="fe-link font-weight-bold"/>&nbsp;&nbsp;réjoindre une réunion
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>*/}

                                        </div>

                                    }

                                    <div style={{flexWrap:"wrap",flex:"1 1 auto"}}>
                                        <div className="card">
                                            <div className="card-body" style={{minHeight: 750}}>
                                                {
                                                    this.state.selectedSideMenuItem === "nm" ?
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


                            <Modal isOpen={this.state.showCodeMeetModal} size="md" centered={true}
                                   toggle={() => this.setState({showCodeMeetModal: !this.state.showCodeMeetModal})}>
                                <ModalHeader toggle={() => this.setState({showCodeMeetModal: !this.state.showCodeMeetModal})}>
                                    <h4>Vous avez un code de réunion ?</h4>
                                </ModalHeader>
                                <ModalBody>
                                    <p style={{fontFamily:"sans-serif"}}>
                                        Pour participer à une réunion, saisissez le code de réunion fourni par l'organisateur ou récu par mail
                                    </p>
                                    <div style={{marginTop:20}}>
                                        <input className="form-control" placeholder="Exemple de code: meet_21072020184528"/>
                                    </div>
                                    <div style={{marginTop:15,textAlign:"right"}}>
                                        <button className="btn btn-success  font-weight-normal" style={{fontFamily:"sans-serif"}}>
                                             Participer
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


export default Meeting;