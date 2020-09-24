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
import Drawer from "@material-ui/core/Drawer";
import IconButton from '@material-ui/core/IconButton';
import CloudDownloadOutlinedIcon from '@material-ui/icons/CloudDownloadOutlined';
import PersonAddOutlinedIcon from '@material-ui/icons/PersonAddOutlined';
import PictureAsPdfIcon from '@material-ui/icons/PictureAsPdf';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import DateRangeOutlinedIcon from '@material-ui/icons/DateRangeOutlined';
import CreateOutlinedIcon from '@material-ui/icons/CreateOutlined';
import FindInPageOutlinedIcon from '@material-ui/icons/FindInPageOutlined';
import AutorenewIcon from '@material-ui/icons/Autorenew';
import ListIcon from '@material-ui/icons/List';
import ViewComfyIcon from '@material-ui/icons/ViewComfy';
import CheckCircle from '@material-ui/icons/CheckCircle';
import Staricon from '@material-ui/icons/Star';
import FolderIcon from '@material-ui/icons/Folder';
import MoodIcon from '@material-ui/icons/Mood';
import TopBar from "../../components/TopBar/TopBar";
import logo from "../../assets/images/logos/OALegalLogoV2.jpeg";
import SideMenu from "../../components/SideMenu/SideMenu";
import data from "../../data/Data";
import Data from "../../data/Data";
import SmartService from "../../provider/SmartService";
import CircularProgress from '@material-ui/core/CircularProgress';
import MuiBackdrop from "../../components/Loading/MuiBackdrop";
import maillingService from "../../provider/customEmailService";
import Snackbar from "@material-ui/core/Snackbar";
import firebase from "firebase";
import defaultAvatar from "../../assets/images/users/default_avatar.jpg";
import {
    Avatar,
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
import CloseIcon from "@material-ui/icons/Close"
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import Alert from '@material-ui/lab/Alert';
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import CheckBoxIcon from '@material-ui/icons/CheckBox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import TableContact from "../../components/Tables/TableContact";
import Typography from "@material-ui/core/Typography";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import Menu from "@material-ui/core/Menu";
import SearchResults from "../../components/Search/SearchResults";
import ListDocs from "../../components/List/ListDocs";
import Rooms from "../Rooms/Rooms";
import CB from "@material-ui/core/Checkbox";
import BT from "@material-ui/core/Button";
import TableSociete from "../../components/Tables/TableSociete";
import {Bubble} from 'react-chartjs-2';
import LeftMenuV3 from "../../components/Menu/LeftMenuV3";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import InputAdornment from "@material-ui/core/InputAdornment";
import time from "../../assets/icons/time.svg"
import money from "../../assets/icons/money.svg"
import play from "../../assets/icons/play.svg"
import pluss from "../../assets/icons/pluss.svg"
import back from "../../assets/icons/back.svg"
import edit from "../../assets/icons/edit.svg"
import calendar from "../../assets/icons/calendar.svg"
import down from "../../assets/icons/down.svg";
import DatePicker from 'react-date-picker';
import TableTimeSheet from "../../components/Tables/TableTimeSheet";
import DescriptionIcon from '@material-ui/icons/Description';
import entIcon from "../../assets/images/entreprise-icon.png";
import userAvatar from "../../assets/images/users/user4.jpg";
import ListFolders from "../../components/List/ListFolders";
import TableTimeSheetDashboard from "../../components/Tables/TableDashboardTimeSheet";
import HSBar from "react-horizontal-stacked-bar-chart";
import AtlButton, {ButtonGroup as AltButtonGroup} from '@atlaskit/button';
import Timer from "react-compound-timer";
import SelectSearch from 'react-select-search';
import SearchIcon from '@material-ui/icons/Search';
import "../../assets/css/react-select-search.css"
import SearchClientsContainer from "../../components/Search/SearchClientsContainer";
import Switch from '@material-ui/core/Switch';
import Autosuggest from 'react-autosuggest';
import "../../assets/css/inputSuggestion.css"
import RSelect from 'react-select';

const getTimeSuggestions = value => {
    const inputValue = value.trim().toLowerCase();
    const inputLength = inputValue.length;

    return inputLength === 0 ? [] : Data.timeSuggestions.filter(x =>
        x.toLowerCase().slice(0, inputLength) === inputValue
    );
};


function renderSearchOption(props, option, snapshot, className) {
    const imgStyle = {
        borderRadius: '50%',
        verticalAlign: 'middle',
        marginRight: 10,
        width: 32, height: 32, objectFit: "cover"
    };

    return (
        <button {...props} className={className} type="button">
            <span>
                <img alt="" style={imgStyle}
                     src={option.ContactType === "Person" ? option.imageUrl ? option.imageUrl : userAvatar : entIcon}/>
                <span style={{fontSize: 13}}>{option.ContactName}</span>
            </span>
        </button>
    );
}

const icon = <CheckBoxOutlineBlankIcon fontSize="small"/>;
const checkedIcon = <CheckBoxIcon fontSize="small"/>;
const getLabel = ({option}) => {
    return (
        <React.Fragment>
            <img src={option.image} alt="" style={{width: 30, height: 30}}/>
            &nbsp;&nbsp;
            {option.id}
        </React.Fragment>
    );
}
const getOAContactLabel = ({option}) => {
    return (
        <React.Fragment>
            <img src={option.imageUrl || userAvatar} alt="" style={{width: 30, height: 30}}/>
            &nbsp;&nbsp;
            {option.nom+" "+option.prenom}
        </React.Fragment>
    );
}
let expanded = [];
let index = {}


export default class DriveV3 extends React.Component {

    imageUpload = {};
    folderupload = {};

    state = {
        loading: true,
        firstLoading: true,

        openAlert: false,
        alertMessage: '',
        alertType: '',
        openUploadToast: false,
        uploadToastMessage: "",

        anchorEl: null,
        anchorElMenu: null,
        anchorElContactsMenu: null,
        openRightMenu: false,

        selectedSieMenuItem: "coffre",
        openSideMenu: false,
        showSecondSideBar: false,

        showPDFModal: false,
        pdfURL: "",

        uploadedThumb: require("../../assets/icons/icon-pdf.png"),
        uploadedName: "",

        signDoc: "true",
        showBtnInviteSign: false,

        signMySelf: true,
        signatiaresEmails: [],
        inviteEmails: [],
        selectedSignatureType: {id: "Swiss law (ZertES)", image: swissImg},

        showUploadStep: "",  //upload  // upload_succes // inviteSigners  // signForm  // successfulStep
        selectedDoc: "",

        folders: [],
        reelFolders: [],
        sharedDrive: [],
        rootFiles: [],
        rootFolders: [],
        sharedRootFiles: [],

        selectedFoldername: "",
        breadcrumbs: "",
        selectedFolder: "",
        selectedFolderId: "",
        selectedFile: "",
        selectedFolderFiles: [],
        selectedFolderFolders: [],

        showNewDocScreen: false,

        newFolderModal: false,

        newFolderName: "",
        newFolderFromRacine: false,
        newFileFromRacine: false,
        loadDocSpinner: false,

        openDriveMenuItem: true,
        openMeetMenuItem: false,
        openRoomMenuItem: false,
        openContactsMenu: false,
        openSocietyMenuItem: false,
        openTimeSheetsMenu: false,

        showContainerSection: "Drive",
        selectedDriveItem: [],
        expandedDriveItems: [],
        autoExpandParent: true,
        selectedMeetMenuItem: ["new"],
        selectedSocietyMenuItem: ["clients_mondat"],
        selectedContactsMenuItem: ["aia"],
        selectedTimeSheetMenuItem: ["activities"],

        selectedSociete: "",
        selectedSocieteKey: "",

        showInviteModal: false,
        meetCode: "",
        mondat: {
            typeDossier: "",
            DescriptionProjet: "",
            DossierLBA: "",
            PersonneChargePrincipale: {
                prenom: "",
                nom: "",
                email: "",
                telephone: "",
                adresse: ""
            },
            PersonneChargeReglement: {
                prenom: "",
                nom: "",
                email: "",
                telephone: "",
                adresse: ""
            },
            autrePartie: "",
            contrePartie: "",
            Apporteur: "",
            collablead: "",
            collabteam: [],
            tauxHoraireCollab: "",
            facturationClient: {
                parEmail: true,
                parCourrier: "",
                frequence: "",
                EnvoyeParSecretariat: "",
                EnvoyeAvocat: "",
                LangueFacturation: "",
                Mode: ""
            }

        },
        contacts: [],
        societes: [],
        annuaire_clients_mondat: [],
        rooms: [],
        openRightContactModalDetail: false,
        openRightSocieteModalDetail: false,
        selectedContact: "",
        selectedContactKey: "",
        editContactForm: false,
        editSocieteForm: false,
        showModalAdd: false,
        add: "",
        domaine: {
            domaine: "",
            specialite: [],
        },
        formationTmp: '',
        fonctionTmp: '',
        parcourTmp: '',
        langueTmp: '',
        hobbiesTmp: '',
        affiliationTmp: '',

        showPdfPreviewModal: false,
        isDocPreviewReady: false,

        showPdfFlipModal: false,

        openShareDocModal: false,
        checkedNotif: true,
        msgNotif: "",
        emailsDriveShare: [],


        focusedItem: "Drive",  // => Drive || Rooms || Meet || Contacts
        expanded: [],
        expandedRoomItems: ["0"],

        viewMode: "list",

        selectedRoomItems: ["0"],
        openNewRoomModal: false,
        newRoomTitle: "",
        newRoomCheck1: false,
        newRoomCheck2: true,
        NewRoomEmails: [],
        selectedRoom: "",
        selectedRoomKey: 0,

        textSearch: "",
        searchSociete: "",
        TimeSheet: {
            newTime: {
                duree: "",
                client: "",
                categoriesActivite: "Temps facturé",
                description: "",
                date: new Date(),
                utilisateurOA: "",
                rateFacturation: "",
            }
        },
        lignesFactures: [],
        TimeSheetData: [],
        DashboardPerson: {
            person: ""
        },

        openAdvancedSearchModal: false,
        selectedClientTimeEntree: "",

        showLignesFactureClient: false,
        dateFacture:new Date(),

        timeSuggestions:[],
        timeSuggValue:""


    }

    componentDidMount() {

        if (localStorage.getItem('email') === undefined || localStorage.getItem('email') === null) {
            this.props.history.push('/login')
        } else {
            let sharedDrive = [];
            this.setState({firstLoading: true});

            firebase.database().ref('TimeSheet/').on('value', (snapshot) => {
                let data = snapshot.val()
                let d = []
                if (data != null) {
                    data.map((item, key) => {
                        d.push(item)
                    })
                    this.setState({TimeSheetData: d})
                }
            })
            firebase.database().ref('lignes_factures/').on('value', (snapshot) => {
                let lignes_f = snapshot.val()
                this.setState({lignesFactures:lignes_f || []})
            })

            setTimeout(() => {
                SmartService.getGed(localStorage.getItem("token"), localStorage.getItem("usrtoken")).then(gedRes => {

                    if (gedRes.succes === true && gedRes.status === 200) {

                        let meeturl = "https://meet.smartdom.ch/meet_" + moment().format("DDMMYYYYHHmmss")

                        firebase.database().ref('/').on('value', (snapshot) => {

                            const data = snapshot.val() || [];
                            let contacts = data.contacts || [];
                            let rooms = data.rooms || [];
                            let societes = data.societes || [];
                            let annuaire_clients_mondat = data.annuaire_client_mondat || [];
                            let sharedFolders = gedRes.data.Shared.Content.folders || [];
                            let sharedFiles = gedRes.data.Shared.Content.files || [];
                            /*let calls = [];
                            for (let i = 0; i < sharedFolders.length; i++) {
                                calls.push(SmartService.getFile(sharedFolders[i].id, localStorage.getItem("token"), localStorage.getItem("usrtoken")))
                            }*/
                            /*Promise.all(calls).then(response => {
                                //console.log(response)
                                response.map((item, key) => {
                                    sharedDrive.push(item.data)
                                })
                                if (this.props.match.params.section === "drive") {

                                    if (this.props.match.params.section_id === "0") {
                                        this.setState({
                                            rootFiles: gedRes.data.Proprietary.Content.files || [],
                                            rootFolders: gedRes.data.Proprietary.Content.folders || [],
                                            folders: this.changeStructure(gedRes.data.Proprietary.Content.folders || []),
                                            reelFolders: gedRes.data.Proprietary.Content.folders || [],
                                            selectedDriveItem: [],
                                            expandedDriveItems: [],
                                            sharedDrive: sharedDrive,
                                            sharedRootFiles: sharedFiles,
                                            meeturl: meeturl,
                                            contacts: contacts,
                                            societes: societes,
                                            annuaire_clients_mondat: annuaire_clients_mondat,
                                            rooms: rooms,
                                            selectedRoom: rooms.length > 0 ? rooms[0] : "",
                                            firstLoading: false,
                                            loading: false
                                        })
                                    } else if (this.props.match.params.section_id === "shared") {
                                        this.setState({
                                            rootFiles: gedRes.data.Proprietary.Content.files || [],
                                            rootFolders: gedRes.data.Proprietary.Content.folders || [],
                                            folders: this.changeStructure(gedRes.data.Proprietary.Content.folders || []),
                                            reelFolders: gedRes.data.Proprietary.Content.folders || [],
                                            sharedDrive: sharedDrive,
                                            sharedRootFiles: sharedFiles,
                                            expanded: ["shared"],
                                            breadcrumbs: "Mon drive / paratgés avec moi",
                                            meeturl: meeturl,
                                            contacts: contacts,
                                            societes: societes,
                                            annuaire_clients_mondat: annuaire_clients_mondat,
                                            rooms: rooms,
                                            selectedRoom: rooms.length > 0 ? rooms[0] : "",
                                            firstLoading: false,
                                            loading: false
                                        })
                                    } else {
                                        let folders = gedRes.data.Proprietary.Content.folders || [];
                                        let folder_name = this.getFolderNameById(this.props.match.params.section_id, folders);
                                        if (folder_name !== undefined && folder_name !== null) {
                                            this.setState({
                                                folders: this.changeStructure(gedRes.data.Proprietary.Content.folders || []),
                                                reelFolders: gedRes.data.Proprietary.Content.folders || [],
                                                rootFiles: gedRes.data.Proprietary.Content.files || [],
                                                rootFolders: gedRes.data.Proprietary.Content.folders || [],
                                                sharedRootFiles: sharedFiles,
                                                sharedDrive: sharedDrive,
                                                selectedDriveItem: [this.props.match.params.section_id],
                                                expandedDriveItems: [this.props.match.params.section_id],
                                                selectedFoldername: folder_name,
                                                breadcrumbs: this.getBreadcumpsPath(this.props.match.params.section_id, folders),
                                                selectedFolderId: this.props.match.params.section_id,
                                                meeturl: meeturl,
                                                contacts: contacts,
                                                societes: societes,
                                                annuaire_clients_mondat: annuaire_clients_mondat,
                                                rooms: rooms,
                                                selectedRoom: rooms.length > 0 ? rooms[0] : "",
                                                selectedFolderFiles: this.getFolderFilesById(this.props.match.params.section_id, folders),
                                                selectedFolderFolders: this.getFolderFoldersById(this.props.match.params.section_id, folders),
                                                firstLoading: false,
                                                loading: false
                                            })
                                        } else {
                                            this.props.history.replace({pathname: '/drive/0'})
                                            this.componentDidMount()
                                        }

                                    }

                                } else if (this.props.match.params.section === "rooms") {

                                    if (this.props.match.params.section_id === "all") {
                                        if (rooms.length > 0) this.props.history.replace({pathname: '/rooms/0'});
                                        this.setState({
                                            showContainerSection: "Rooms",
                                            focusedItem: "Rooms",
                                            selectedRoomItems: rooms.length > 0 ? ["0"] : [],
                                            expandedRoomItems: rooms.length > 0 ? ["0"] : [],
                                            openRoomMenuItem: true,
                                            rootFiles: gedRes.data.Proprietary.Content.files || [],
                                            rootFolders: gedRes.data.Proprietary.Content.folders || [],
                                            folders: this.changeStructure(gedRes.data.Proprietary.Content.folders || []),
                                            reelFolders: gedRes.data.Proprietary.Content.folders || [],
                                            sharedDrive: sharedDrive,
                                            sharedRootFiles: sharedFiles,
                                            meeturl: meeturl,
                                            contacts: contacts,
                                            societes: societes,
                                            annuaire_clients_mondat: annuaire_clients_mondat,
                                            rooms: rooms,
                                            selectedRoom: rooms.length > 0 ? rooms[0] : "",
                                            firstLoading: false,
                                            loading: false
                                        })
                                    } else if ((typeof parseInt(this.props.match.params.section_id)) === "number") {
                                        if (rooms[parseInt(this.props.match.params.section_id)]) {
                                            this.setState({
                                                showContainerSection: "Rooms",
                                                focusedItem: "Rooms",
                                                selectedRoomItems: [this.props.match.params.section_id],
                                                expandedRoomItems: rooms.length > 0 ? ["0"] : [],
                                                openRoomMenuItem: true,
                                                rootFiles: gedRes.data.Proprietary.Content.files || [],
                                                rootFolders: gedRes.data.Proprietary.Content.folders || [],
                                                folders: this.changeStructure(gedRes.data.Proprietary.Content.folders || []),
                                                reelFolders: gedRes.data.Proprietary.Content.folders || [],
                                                sharedDrive: sharedDrive,
                                                sharedRootFiles: sharedFiles,
                                                meeturl: meeturl,
                                                contacts: contacts,
                                                societes: societes,
                                                annuaire_clients_mondat: annuaire_clients_mondat,
                                                rooms: rooms,
                                                selectedRoom: rooms[parseInt(this.props.match.params.section_id)],
                                                selectedRoomKey: parseInt(this.props.match.params.section_id),
                                                firstLoading: false,
                                                loading: false
                                            })
                                        } else {
                                            this.props.history.replace({pathname: '/rooms/all'})
                                            this.componentDidMount()
                                            console.log("URL ERROR")
                                        }
                                    } else {
                                        console.log("URL ERROR")
                                    }

                                } else if (this.props.match.params.section === "meet") {

                                    if (this.props.match.params.section_id === "new") {
                                        this.setState({
                                            showContainerSection: "Meet",
                                            focusedItem: "Meet",
                                            selectedMeetMenuItem: ["new"],
                                            openMeetMenuItem: true,
                                            rootFiles: gedRes.data.Proprietary.Content.files || [],
                                            rootFolders: gedRes.data.Proprietary.Content.folders || [],
                                            folders: this.changeStructure(gedRes.data.Proprietary.Content.folders || []),
                                            reelFolders: gedRes.data.Proprietary.Content.folders || [],
                                            sharedDrive: sharedDrive,
                                            sharedRootFiles: sharedFiles,
                                            meeturl: meeturl,
                                            contacts: contacts,
                                            societes: societes,
                                            annuaire_clients_mondat: annuaire_clients_mondat,
                                            rooms: rooms,
                                            selectedRoom: rooms.length > 0 ? rooms[0] : "",
                                            firstLoading: false,
                                            loading: false
                                        })
                                    } else if (this.props.match.params.section_id === "rejoin") {
                                        this.setState({
                                            showContainerSection: "Meet",
                                            focusedItem: "Meet",
                                            selectedMeetMenuItem: ["rejoin"],
                                            openMeetMenuItem: true,
                                            rootFiles: gedRes.data.Proprietary.Content.files || [],
                                            rootFolders: gedRes.data.Proprietary.Content.folders || [],
                                            folders: this.changeStructure(gedRes.data.Proprietary.Content.folders || []),
                                            reelFolders: gedRes.data.Proprietary.Content.folders || [],
                                            sharedDrive: sharedDrive,
                                            sharedRootFiles: sharedFiles,
                                            meeturl: meeturl,
                                            contacts: contacts,
                                            societes: societes,
                                            annuaire_clients_mondat: annuaire_clients_mondat,
                                            rooms: rooms,
                                            selectedRoom: rooms.length > 0 ? rooms[0] : "",
                                            firstLoading: false,
                                            loading: false
                                        })
                                    } else {
                                        console.log("URL ERROR")
                                    }
                                } else if (this.props.match.params.section === "contacts") {
                                    if (this.props.match.params.section_id === "all" || this.props.match.params.section_id === "aia" || this.props.match.params.section_id === "ae") {
                                        this.setState({
                                            showContainerSection: "Contacts",
                                            focusedItem: "Contacts",
                                            openContactsMenu:true,
                                            rootFiles: gedRes.data.Proprietary.Content.files || [],
                                            rootFolders: gedRes.data.Proprietary.Content.folders || [],
                                            folders: this.changeStructure(gedRes.data.Proprietary.Content.folders || []),
                                            reelFolders: gedRes.data.Proprietary.Content.folders || [],
                                            sharedDrive: sharedDrive,
                                            sharedRootFiles: sharedFiles,
                                            meeturl: meeturl,
                                            contacts: contacts,
                                            societes: societes,
                                            annuaire_clients_mondat: annuaire_clients_mondat,
                                            rooms: rooms,
                                            selectedRoom: rooms.length > 0 ? rooms[0] : "",
                                            firstLoading: false,
                                            loading: false
                                        })
                                    } else {
                                        console.log("URL ERROR")
                                    }

                                } else if (this.props.match.params.section === "society") {
                                    if (this.props.match.params.section_id === "clients_mondat") {
                                        this.setState({
                                            showContainerSection: "Societe",
                                            focusedItem: "Societe",
                                            selectedSocietyMenuItem: ["clients_mondat"],
                                            openSocietyMenuItem: true,
                                            rootFiles: gedRes.data.Proprietary.Content.files || [],
                                            rootFolders: gedRes.data.Proprietary.Content.folders || [],
                                            folders: this.changeStructure(gedRes.data.Proprietary.Content.folders || []),
                                            reelFolders: gedRes.data.Proprietary.Content.folders || [],
                                            sharedDrive: sharedDrive,
                                            sharedRootFiles: sharedFiles,
                                            meeturl: meeturl,
                                            contacts: contacts,
                                            societes: societes,
                                            annuaire_clients_mondat: annuaire_clients_mondat,
                                            rooms: rooms,
                                            selectedRoom: rooms.length > 0 ? rooms[0] : "",
                                            firstLoading: false,
                                            loading: false
                                        })
                                    } else {
                                        this.props.history.replace({pathname: '/society/clients_mondat'});
                                        this.componentDidMount()
                                    }
                                } else if (this.props.match.params.section === "TimeSheet") {
                                    if (this.props.match.params.section_id === "activities") {
                                        this.setState({
                                            showContainerSection: "TimeSheet",
                                            focusedItem: "TimeSheet",
                                            selectedTimeSheetMenuItem: ["activities"],
                                            openTimeSheetsMenu: true,
                                            rootFiles: gedRes.data.Proprietary.Content.files || [],
                                            rootFolders: gedRes.data.Proprietary.Content.folders || [],
                                            folders: this.changeStructure(gedRes.data.Proprietary.Content.folders || []),
                                            reelFolders: gedRes.data.Proprietary.Content.folders || [],
                                            sharedDrive: sharedDrive,
                                            sharedRootFiles: sharedFiles,
                                            meeturl: meeturl,
                                            contacts: contacts,
                                            societes: societes,
                                            annuaire_clients_mondat: annuaire_clients_mondat,
                                            rooms: rooms,
                                            selectedRoom: rooms.length > 0 ? rooms[0] : "",
                                            firstLoading: false,
                                            loading: false
                                        })
                                    } else if (this.props.match.params.section_id === "dashboard") {
                                        this.setState({
                                            showContainerSection: "TimeSheet",
                                            focusedItem: "TimeSheet",
                                            selectedTimeSheetMenuItem: ["dashboard"],
                                            openTimeSheetsMenu: true,
                                            rootFiles: gedRes.data.Proprietary.Content.files || [],
                                            rootFolders: gedRes.data.Proprietary.Content.folders || [],
                                            folders: this.changeStructure(gedRes.data.Proprietary.Content.folders || []),
                                            reelFolders: gedRes.data.Proprietary.Content.folders || [],
                                            sharedDrive: sharedDrive,
                                            sharedRootFiles: sharedFiles,
                                            meeturl: meeturl,
                                            contacts: contacts,
                                            societes: societes,
                                            annuaire_clients_mondat: annuaire_clients_mondat,
                                            rooms: rooms,
                                            selectedRoom: rooms.length > 0 ? rooms[0] : "",
                                            firstLoading: false,
                                            loading: false
                                        })
                                    } else if (this.props.match.params.section_id === "dashboardPerson") {
                                        this.setState({
                                            showContainerSection: "TimeSheet",
                                            focusedItem: "TimeSheet",
                                            selectedTimeSheetMenuItem: ["dashboardPerson"],
                                            openTimeSheetsMenu: true,
                                            rootFiles: gedRes.data.Proprietary.Content.files || [],
                                            rootFolders: gedRes.data.Proprietary.Content.folders || [],
                                            folders: this.changeStructure(gedRes.data.Proprietary.Content.folders || []),
                                            reelFolders: gedRes.data.Proprietary.Content.folders || [],
                                            sharedDrive: sharedDrive,
                                            sharedRootFiles: sharedFiles,
                                            meeturl: meeturl,
                                            contacts: contacts,
                                            societes: societes,
                                            annuaire_clients_mondat: annuaire_clients_mondat,
                                            rooms: rooms,
                                            selectedRoom: rooms.length > 0 ? rooms[0] : "",
                                            firstLoading: false,
                                            loading: false
                                        })
                                    } else if (this.props.match.params.section_id === "dashboardProject") {
                                        this.setState({
                                            showContainerSection: "TimeSheet",
                                            focusedItem: "TimeSheet",
                                            selectedTimeSheetMenuItem: ["dashboardProject"],
                                            openTimeSheetsMenu: true,
                                            rootFiles: gedRes.data.Proprietary.Content.files || [],
                                            rootFolders: gedRes.data.Proprietary.Content.folders || [],
                                            folders: this.changeStructure(gedRes.data.Proprietary.Content.folders || []),
                                            reelFolders: gedRes.data.Proprietary.Content.folders || [],
                                            sharedDrive: sharedDrive,
                                            sharedRootFiles: sharedFiles,
                                            meeturl: meeturl,
                                            contacts: contacts,
                                            societes: societes,
                                            annuaire_clients_mondat: annuaire_clients_mondat,
                                            rooms: rooms,
                                            selectedRoom: rooms.length > 0 ? rooms[0] : "",
                                            firstLoading: false,
                                            loading: false
                                        })
                                    } else {
                                        console.log("URL ERROR")
                                    }

                                } else if (this.props.match.params.section === "search") {
                                    if (this.props.match.params.section_id) {
                                        let textToSearch = this.props.match.params.section_id;
                                        SmartService.search(textToSearch, localStorage.getItem("token"), localStorage.getItem("usrtoken")).then(searchRes => {
                                            if (searchRes.succes === true && searchRes.status === 200) {
                                                this.setState({
                                                    searchResult: searchRes.data,
                                                    textSearch: textToSearch,
                                                    rootFiles: gedRes.data.Proprietary.Content.files || [],
                                                    rootFolders: gedRes.data.Proprietary.Content.folders || [],
                                                    folders: this.changeStructure(gedRes.data.Proprietary.Content.folders || []),
                                                    reelFolders: gedRes.data.Proprietary.Content.folders || [],
                                                    sharedDrive: sharedDrive,
                                                    sharedRootFiles: sharedFiles,
                                                    meeturl: meeturl,
                                                    contacts: contacts,
                                                    societes: societes,
                                                    annuaire_clients_mondat: annuaire_clients_mondat,
                                                    rooms: rooms,
                                                    selectedRoom: rooms.length > 0 ? rooms[0] : "",
                                                    firstLoading: false,
                                                    loading: false
                                                })
                                            } else {
                                                console.log(searchRes.error)
                                            }
                                        }).catch(err => {
                                            console.log(err)
                                        })

                                    }
                                } else {
                                    console.log("URL ERROR")
                                    this.props.history.replace({pathname: '/drive/0'});
                                    this.componentDidMount()
                                }


                            }).catch(err => {
                                console.log(err);
                            })*/

                                if (this.props.match.params.section === "drive") {

                                    if (this.props.match.params.section_id === "0") {
                                        this.setState({
                                            rootFiles: gedRes.data.Proprietary.Content.files || [],
                                            rootFolders: gedRes.data.Proprietary.Content.folders || [],
                                            folders: this.changeStructure(gedRes.data.Proprietary.Content.folders || []),
                                            reelFolders: gedRes.data.Proprietary.Content.folders || [],
                                            selectedDriveItem: [],
                                            expandedDriveItems: [],
                                            sharedDrive: sharedDrive,
                                            sharedRootFiles: sharedFiles,
                                            meeturl: meeturl,
                                            contacts: contacts,
                                            societes: societes,
                                            annuaire_clients_mondat: annuaire_clients_mondat,
                                            rooms: rooms,
                                            selectedRoom: rooms.length > 0 ? rooms[0] : "",
                                            firstLoading: false,
                                            loading: false
                                        })
                                    } else if (this.props.match.params.section_id === "shared") {
                                        this.setState({
                                            rootFiles: gedRes.data.Proprietary.Content.files || [],
                                            rootFolders: gedRes.data.Proprietary.Content.folders || [],
                                            folders: this.changeStructure(gedRes.data.Proprietary.Content.folders || []),
                                            reelFolders: gedRes.data.Proprietary.Content.folders || [],
                                            sharedDrive: sharedDrive,
                                            sharedRootFiles: sharedFiles,
                                            expanded: ["shared"],
                                            breadcrumbs: "Mon drive / paratgés avec moi",
                                            meeturl: meeturl,
                                            contacts: contacts,
                                            societes: societes,
                                            annuaire_clients_mondat: annuaire_clients_mondat,
                                            rooms: rooms,
                                            selectedRoom: rooms.length > 0 ? rooms[0] : "",
                                            firstLoading: false,
                                            loading: false
                                        })
                                    } else {
                                        let folders = gedRes.data.Proprietary.Content.folders || [];
                                        let folder_name = this.getFolderNameById(this.props.match.params.section_id, folders);
                                        if (folder_name !== undefined && folder_name !== null) {
                                            this.setState({
                                                folders: this.changeStructure(gedRes.data.Proprietary.Content.folders || []),
                                                reelFolders: gedRes.data.Proprietary.Content.folders || [],
                                                rootFiles: gedRes.data.Proprietary.Content.files || [],
                                                rootFolders: gedRes.data.Proprietary.Content.folders || [],
                                                sharedRootFiles: sharedFiles,
                                                sharedDrive: sharedDrive,
                                                selectedDriveItem: [this.props.match.params.section_id],
                                                expandedDriveItems: [this.props.match.params.section_id],
                                                selectedFoldername: folder_name,
                                                breadcrumbs: this.getBreadcumpsPath(this.props.match.params.section_id, folders),
                                                selectedFolderId: this.props.match.params.section_id,
                                                meeturl: meeturl,
                                                contacts: contacts,
                                                societes: societes,
                                                annuaire_clients_mondat: annuaire_clients_mondat,
                                                rooms: rooms,
                                                selectedRoom: rooms.length > 0 ? rooms[0] : "",
                                                selectedFolderFiles: this.getFolderFilesById(this.props.match.params.section_id, folders),
                                                selectedFolderFolders: this.getFolderFoldersById(this.props.match.params.section_id, folders),
                                                firstLoading: false,
                                                loading: false
                                            })
                                        } else {
                                            this.props.history.replace({pathname: '/drive/0'})
                                            this.componentDidMount()
                                        }

                                    }

                                } else if (this.props.match.params.section === "rooms") {

                                    if (this.props.match.params.section_id === "all") {
                                        if (rooms.length > 0) this.props.history.replace({pathname: '/rooms/0'});
                                        this.setState({
                                            showContainerSection: "Rooms",
                                            focusedItem: "Rooms",
                                            selectedRoomItems: rooms.length > 0 ? ["0"] : [],
                                            expandedRoomItems: rooms.length > 0 ? ["0"] : [],
                                            openRoomMenuItem: true,
                                            rootFiles: gedRes.data.Proprietary.Content.files || [],
                                            rootFolders: gedRes.data.Proprietary.Content.folders || [],
                                            folders: this.changeStructure(gedRes.data.Proprietary.Content.folders || []),
                                            reelFolders: gedRes.data.Proprietary.Content.folders || [],
                                            sharedDrive: sharedDrive,
                                            sharedRootFiles: sharedFiles,
                                            meeturl: meeturl,
                                            contacts: contacts,
                                            societes: societes,
                                            annuaire_clients_mondat: annuaire_clients_mondat,
                                            rooms: rooms,
                                            selectedRoom: rooms.length > 0 ? rooms[0] : "",
                                            firstLoading: false,
                                            loading: false
                                        })
                                    } else if ((typeof parseInt(this.props.match.params.section_id)) === "number") {
                                        if (rooms[parseInt(this.props.match.params.section_id)]) {
                                            this.setState({
                                                showContainerSection: "Rooms",
                                                focusedItem: "Rooms",
                                                selectedRoomItems: [this.props.match.params.section_id],
                                                expandedRoomItems: rooms.length > 0 ? ["0"] : [],
                                                openRoomMenuItem: true,
                                                rootFiles: gedRes.data.Proprietary.Content.files || [],
                                                rootFolders: gedRes.data.Proprietary.Content.folders || [],
                                                folders: this.changeStructure(gedRes.data.Proprietary.Content.folders || []),
                                                reelFolders: gedRes.data.Proprietary.Content.folders || [],
                                                sharedDrive: sharedDrive,
                                                sharedRootFiles: sharedFiles,
                                                meeturl: meeturl,
                                                contacts: contacts,
                                                societes: societes,
                                                annuaire_clients_mondat: annuaire_clients_mondat,
                                                rooms: rooms,
                                                selectedRoom: rooms[parseInt(this.props.match.params.section_id)],
                                                selectedRoomKey: parseInt(this.props.match.params.section_id),
                                                firstLoading: false,
                                                loading: false
                                            })
                                        } else {
                                            this.props.history.replace({pathname: '/rooms/all'})
                                            this.componentDidMount()
                                            console.log("URL ERROR")
                                        }
                                    } else {
                                        console.log("URL ERROR")
                                    }

                                } else if (this.props.match.params.section === "meet") {

                                    if (this.props.match.params.section_id === "new") {
                                        this.setState({
                                            showContainerSection: "Meet",
                                            focusedItem: "Meet",
                                            selectedMeetMenuItem: ["new"],
                                            openMeetMenuItem: true,
                                            rootFiles: gedRes.data.Proprietary.Content.files || [],
                                            rootFolders: gedRes.data.Proprietary.Content.folders || [],
                                            folders: this.changeStructure(gedRes.data.Proprietary.Content.folders || []),
                                            reelFolders: gedRes.data.Proprietary.Content.folders || [],
                                            sharedDrive: sharedDrive,
                                            sharedRootFiles: sharedFiles,
                                            meeturl: meeturl,
                                            contacts: contacts,
                                            societes: societes,
                                            annuaire_clients_mondat: annuaire_clients_mondat,
                                            rooms: rooms,
                                            selectedRoom: rooms.length > 0 ? rooms[0] : "",
                                            firstLoading: false,
                                            loading: false
                                        })
                                    } else if (this.props.match.params.section_id === "rejoin") {
                                        this.setState({
                                            showContainerSection: "Meet",
                                            focusedItem: "Meet",
                                            selectedMeetMenuItem: ["rejoin"],
                                            openMeetMenuItem: true,
                                            rootFiles: gedRes.data.Proprietary.Content.files || [],
                                            rootFolders: gedRes.data.Proprietary.Content.folders || [],
                                            folders: this.changeStructure(gedRes.data.Proprietary.Content.folders || []),
                                            reelFolders: gedRes.data.Proprietary.Content.folders || [],
                                            sharedDrive: sharedDrive,
                                            sharedRootFiles: sharedFiles,
                                            meeturl: meeturl,
                                            contacts: contacts,
                                            societes: societes,
                                            annuaire_clients_mondat: annuaire_clients_mondat,
                                            rooms: rooms,
                                            selectedRoom: rooms.length > 0 ? rooms[0] : "",
                                            firstLoading: false,
                                            loading: false
                                        })
                                    } else {
                                        console.log("URL ERROR")
                                    }
                                } else if (this.props.match.params.section === "contacts") {
                                    if (this.props.match.params.section_id === "all" || this.props.match.params.section_id === "aia" || this.props.match.params.section_id === "ae") {
                                        this.setState({
                                            showContainerSection: "Contacts",
                                            focusedItem: "Contacts",
                                            openContactsMenu:true,
                                            rootFiles: gedRes.data.Proprietary.Content.files || [],
                                            rootFolders: gedRes.data.Proprietary.Content.folders || [],
                                            folders: this.changeStructure(gedRes.data.Proprietary.Content.folders || []),
                                            reelFolders: gedRes.data.Proprietary.Content.folders || [],
                                            sharedDrive: sharedDrive,
                                            sharedRootFiles: sharedFiles,
                                            meeturl: meeturl,
                                            contacts: contacts,
                                            societes: societes,
                                            annuaire_clients_mondat: annuaire_clients_mondat,
                                            rooms: rooms,
                                            selectedRoom: rooms.length > 0 ? rooms[0] : "",
                                            firstLoading: false,
                                            loading: false
                                        })
                                    } else {
                                        console.log("URL ERROR")
                                    }

                                } else if (this.props.match.params.section === "society") {
                                    if (this.props.match.params.section_id === "clients_mondat") {
                                        this.setState({
                                            showContainerSection: "Societe",
                                            focusedItem: "Societe",
                                            selectedSocietyMenuItem: ["clients_mondat"],
                                            openSocietyMenuItem: true,
                                            rootFiles: gedRes.data.Proprietary.Content.files || [],
                                            rootFolders: gedRes.data.Proprietary.Content.folders || [],
                                            folders: this.changeStructure(gedRes.data.Proprietary.Content.folders || []),
                                            reelFolders: gedRes.data.Proprietary.Content.folders || [],
                                            sharedDrive: sharedDrive,
                                            sharedRootFiles: sharedFiles,
                                            meeturl: meeturl,
                                            contacts: contacts,
                                            societes: societes,
                                            annuaire_clients_mondat: annuaire_clients_mondat,
                                            rooms: rooms,
                                            selectedRoom: rooms.length > 0 ? rooms[0] : "",
                                            firstLoading: false,
                                            loading: false
                                        })
                                    } else {
                                        this.props.history.replace({pathname: '/society/clients_mondat'});
                                        this.componentDidMount()
                                    }
                                } else if (this.props.match.params.section === "TimeSheet") {
                                    if (this.props.match.params.section_id === "activities") {
                                        this.setState({
                                            showContainerSection: "TimeSheet",
                                            focusedItem: "TimeSheet",
                                            selectedTimeSheetMenuItem: ["activities"],
                                            openTimeSheetsMenu: true,
                                            rootFiles: gedRes.data.Proprietary.Content.files || [],
                                            rootFolders: gedRes.data.Proprietary.Content.folders || [],
                                            folders: this.changeStructure(gedRes.data.Proprietary.Content.folders || []),
                                            reelFolders: gedRes.data.Proprietary.Content.folders || [],
                                            sharedDrive: sharedDrive,
                                            sharedRootFiles: sharedFiles,
                                            meeturl: meeturl,
                                            contacts: contacts,
                                            societes: societes,
                                            annuaire_clients_mondat: annuaire_clients_mondat,
                                            rooms: rooms,
                                            selectedRoom: rooms.length > 0 ? rooms[0] : "",
                                            firstLoading: false,
                                            loading: false
                                        })
                                    } else if (this.props.match.params.section_id === "dashboard") {
                                        this.setState({
                                            showContainerSection: "TimeSheet",
                                            focusedItem: "TimeSheet",
                                            selectedTimeSheetMenuItem: ["dashboard"],
                                            openTimeSheetsMenu: true,
                                            rootFiles: gedRes.data.Proprietary.Content.files || [],
                                            rootFolders: gedRes.data.Proprietary.Content.folders || [],
                                            folders: this.changeStructure(gedRes.data.Proprietary.Content.folders || []),
                                            reelFolders: gedRes.data.Proprietary.Content.folders || [],
                                            sharedDrive: sharedDrive,
                                            sharedRootFiles: sharedFiles,
                                            meeturl: meeturl,
                                            contacts: contacts,
                                            societes: societes,
                                            annuaire_clients_mondat: annuaire_clients_mondat,
                                            rooms: rooms,
                                            selectedRoom: rooms.length > 0 ? rooms[0] : "",
                                            firstLoading: false,
                                            loading: false
                                        })
                                    } else if (this.props.match.params.section_id === "dashboardPerson") {
                                        this.setState({
                                            showContainerSection: "TimeSheet",
                                            focusedItem: "TimeSheet",
                                            selectedTimeSheetMenuItem: ["dashboardPerson"],
                                            openTimeSheetsMenu: true,
                                            rootFiles: gedRes.data.Proprietary.Content.files || [],
                                            rootFolders: gedRes.data.Proprietary.Content.folders || [],
                                            folders: this.changeStructure(gedRes.data.Proprietary.Content.folders || []),
                                            reelFolders: gedRes.data.Proprietary.Content.folders || [],
                                            sharedDrive: sharedDrive,
                                            sharedRootFiles: sharedFiles,
                                            meeturl: meeturl,
                                            contacts: contacts,
                                            societes: societes,
                                            annuaire_clients_mondat: annuaire_clients_mondat,
                                            rooms: rooms,
                                            selectedRoom: rooms.length > 0 ? rooms[0] : "",
                                            firstLoading: false,
                                            loading: false
                                        })
                                    } else if (this.props.match.params.section_id === "dashboardProject") {
                                        this.setState({
                                            showContainerSection: "TimeSheet",
                                            focusedItem: "TimeSheet",
                                            selectedTimeSheetMenuItem: ["dashboardProject"],
                                            openTimeSheetsMenu: true,
                                            rootFiles: gedRes.data.Proprietary.Content.files || [],
                                            rootFolders: gedRes.data.Proprietary.Content.folders || [],
                                            folders: this.changeStructure(gedRes.data.Proprietary.Content.folders || []),
                                            reelFolders: gedRes.data.Proprietary.Content.folders || [],
                                            sharedDrive: sharedDrive,
                                            sharedRootFiles: sharedFiles,
                                            meeturl: meeturl,
                                            contacts: contacts,
                                            societes: societes,
                                            annuaire_clients_mondat: annuaire_clients_mondat,
                                            rooms: rooms,
                                            selectedRoom: rooms.length > 0 ? rooms[0] : "",
                                            firstLoading: false,
                                            loading: false
                                        })
                                    } else {
                                        console.log("URL ERROR")
                                    }

                                } else if (this.props.match.params.section === "search") {
                                    if (this.props.match.params.section_id) {
                                        let textToSearch = this.props.match.params.section_id;
                                        SmartService.search(textToSearch, localStorage.getItem("token"), localStorage.getItem("usrtoken")).then(searchRes => {
                                            if (searchRes.succes === true && searchRes.status === 200) {
                                                this.setState({
                                                    searchResult: searchRes.data,
                                                    textSearch: textToSearch,
                                                    rootFiles: gedRes.data.Proprietary.Content.files || [],
                                                    rootFolders: gedRes.data.Proprietary.Content.folders || [],
                                                    folders: this.changeStructure(gedRes.data.Proprietary.Content.folders || []),
                                                    reelFolders: gedRes.data.Proprietary.Content.folders || [],
                                                    sharedDrive: sharedDrive,
                                                    sharedRootFiles: sharedFiles,
                                                    meeturl: meeturl,
                                                    contacts: contacts,
                                                    societes: societes,
                                                    annuaire_clients_mondat: annuaire_clients_mondat,
                                                    rooms: rooms,
                                                    selectedRoom: rooms.length > 0 ? rooms[0] : "",
                                                    firstLoading: false,
                                                    loading: false
                                                })
                                            } else {
                                                console.log(searchRes.error)
                                            }
                                        }).catch(err => {
                                            console.log(err)
                                        })

                                    }
                                } else {
                                    console.log("URL ERROR")
                                    this.props.history.replace({pathname: '/drive/0'});
                                    this.componentDidMount()
                                }



                        });

                    } else {
                        this.setState({loading: false})
                        localStorage.clear();
                        this.props.history.push("/login")
                    }
                }).catch(err => {
                    this.props.history.push("/error")
                    console.log(err)
                })

            }, 200);
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

    openUploadToastSnackbar = (msg) => {
        this.setState({
            openUploadToast: true,
            uploadToastMessage: msg
        });
    }

    closeUploadToastSnackbar = (event, reason) => {
        if (reason === 'clickaway') return;
        this.setState({openUploadToast: false});
    };

    showDocInPdfModal = (url) => {

        this.setState({
            openRightMenu: false,
            showPDFModal: true,
            pdfURL: url
        });
    };

    uploadImage = (image) => {
        this.setState({loading: true})
        let imgToUpload = image.target.files[0];
        var reader = new FileReader();
        reader.onloadend = () => {
            let selectedContact = this.state.selectedContact;
            selectedContact.imageUrl = reader.result;
            let key = this.findContactByUid(this.state.selectedContact.uid, this.state.contacts);
            firebase.database().ref('contacts/' + key).set(
                this.state.selectedContact
            ).then(res => {
                this.setState({loading: false})
                this.openSnackbar('success', "Modification effectuée avec succès");
            });
        }
        reader.readAsDataURL(imgToUpload);

    };

    uploadFolder = (event) => {
        this.setState({loading: true})
        let files = event.target.files;
        let structure = files[0].webkitRelativePath.split('/');
        let folder_name = structure[0];
        let calls = [];
        SmartService.addFolder({
            name: folder_name,
            folder_id: null
        }, localStorage.getItem("token"), localStorage.getItem("usrtoken")).then(addFolderRes => {
            if (addFolderRes.succes === true && addFolderRes.status === 200) {
                this.setState({openUploadToast: true})
                for (let i = 0; i < files.length; i++) {
                    let formData = new FormData();
                    formData.append("file", files[i]);
                    formData.append("folder_id", addFolderRes.data.id)
                    calls.push(axios.request({
                            method: "POST", url: data.endpoint + "/ged/896ca0ed-8b4a-40fd-aeff-7ce26ee1bcf9/doc/addfile",
                            data: formData,
                            headers: {
                                'Content-Type': 'multipart/form-data',
                                'token': localStorage.getItem('token'),
                                'usrtoken': localStorage.getItem('usrtoken')
                            },
                            onUploadProgress: (p) => {
                                this.setState({uploadToastMessage: files[i].name + " : " + ((p.loaded / p.total) * 100).toFixed(2).concat(" %").toString()})
                            }
                        })
                    )
                }
                Promise.all(calls).then(response => {
                    this.setState({openUploadToast: false, uploadToastMessage: ""})
                    this.reloadGed()
                    //console.log(response)
                }).catch(err => {
                    this.setState({loading: false})
                    console.log(err)
                })

            } else {
                this.setState({loading: false})
                this.openSnackbar("error", addFolderRes.error)
            }
        }).catch(err => {
            this.openSnackbar("error", err)
            this.setState({loading: false})
            console.log(err)
        })


    }

    reloadGed = () => {
        this.setState({loading: true});
        setTimeout(() => {
            SmartService.getGed(localStorage.getItem("token"), localStorage.getItem("usrtoken")).then(gedRes => {
                if (gedRes.succes === true && gedRes.status === 200) {
                    if (this.props.match.params.section === "drive" && this.props.match.params.section_id === "0") {
                        this.setState({
                            rootFiles: gedRes.data.Proprietary.Content.files || [],
                            rootFolders: gedRes.data.Proprietary.Content.folders || [],
                            folders: this.changeStructure(gedRes.data.Proprietary.Content.folders || []),
                            reelFolders: gedRes.data.Proprietary.Content.folders || [],
                            loading: false
                        })
                    } else {
                        let folders = gedRes.data.Proprietary.Content.folders || [];
                        let folder_name = this.getFolderNameById(this.props.match.params.section_id, folders);
                        this.setState({
                            folders: this.changeStructure(gedRes.data.Proprietary.Content.folders || []),
                            reelFolders: gedRes.data.Proprietary.Content.folders || [],
                            rootFiles: gedRes.data.Proprietary.Content.files || [],
                            rootFolders: gedRes.data.Proprietary.Content.folders || [],
                            expanded: this.expandAll(this.props.match.params.section_id, folders),
                            selectedFoldername: folder_name,
                            breadcrumbs: this.getBreadcumpsPath(this.props.match.params.section_id, folders),
                            selectedFolderId: this.props.match.params.section_id,
                            selectedFolderFiles: this.getFolderFilesById(this.props.match.params.section_id, folders),
                            selectedFolderFolders: this.getFolderFoldersById(this.props.match.params.section_id, folders),
                            loading: false
                        })
                    }

                } else {
                    this.setState({loading: false});
                    localStorage.clear();
                    this.props.history.push("/login")
                }
            }).catch(err => {
                console.log(err)
                this.setState({loading: false});
            })
        }, 200);
    }

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

    handleObjectChange = (object1, object2, name) => event => {
        let obj = this.state[object1];
        let container = obj[object2] || {};
        container[name] = event.target.value;
        obj[object2] = container
        this.setState({
            [object1]: obj
        });
    };

    saveContactChanges = () => {
        this.setState({loading: true})
        let key = this.findContactByUid(this.state.selectedContact.uid, this.state.contacts);
        firebase.database().ref('contacts/' + key).set(
            this.state.selectedContact
        ).then( res =>  {
            this.setState({loading: false})
            this.openSnackbar('success', "Modification effectuée avec succès");
        }).catch( err => {
            console.log(err)
        })
    };

    saveSocietyChanges = () => {
        this.setState({loading: true})
        let key = this.findClientMondatById(this.state.selectedSociete.ID, this.state.annuaire_clients_mondat);
        firebase.database().ref('annuaire_client_mondat/' + key).set(
            this.state.selectedSociete
        ).then(res => {
            this.setState({loading: false})
            this.openSnackbar('success', "Modification effectuée avec succès");
        });
    };


    openAddModal = (type) => () => {
        this.setState({
            add: type,
            showModalAdd: true,
        })
    };

    handleChangeDomaine = (event) => {
        this.setState({
            domaine: {
                domaine: event.target.value,
                specialite: []
            },
        })
    }

    handleChangeSpecialite = (event) => {
        let domaine = this.state.domaine
        domaine.specialite = event.target.value
        this.setState({domaine: domaine})
    }

    expandAll = (id, drive) => {
        for (let i = 0; i < drive.length; i++) {
            expanded.push(drive[i].id)
            if (drive[i].id === id) {
                return expanded;
            }
            var found = this.expandAll(id, drive[i].Content.folders);
            if (found) return expanded;
        }

    }

    getFolderById = (id, drive) => {
        for (let i = 0; i < drive.length; i++) {
            if (drive[i].id) {
                if (drive[i].id !== id) {
                    let found = this.getFolderById(id, drive[i].Content.folders)
                    if (found) return found
                } else return drive[i]
            } else {
                if (drive[i].key !== id) {
                    let found = this.getFolderById(id, drive[i].folders)
                    if (found) return found
                } else return drive[i]
            }
        }
    }

    getFolderNameById = (id, drive) => {
        for (let i = 0; i < drive.length; i++) {
            if (drive[i].id !== id) {
                let found = this.getFolderNameById(id, drive[i].Content.folders)
                if (found) return found
            } else return drive[i].name
        }
    }

    getFolderTypeById = (id, drive) => {
        for (let i = 0; i < drive.length; i++) {
            if (drive[i].id !== id) {
                let found = this.getFolderNameById(id, drive[i].Content.folders)
                if (found) return found
            } else return drive[i].proprietary ? "shared" : "proprietary"
        }
    }

    getFolderFilesById = (id, drive) => {
        for (let i = 0; i < drive.length; i++) {
            if (drive[i].id !== id) {
                let found = this.getFolderFilesById(id, drive[i].Content.folders);
                if (found) return found;
            } else return drive[i].Content.files
        }
    }

    getFolderFoldersById = (id, drive) => {
        for (let i = 0; i < drive.length; i++) {
            if (drive[i].id !== id) {
                let found = this.getFolderFoldersById(id, drive[i].Content.folders);
                if (found) return found;
            } else return drive[i].Content.folders
        }
    }

    buildIndex = (root, children) => {
        for (let i in children) {
            index[children[i].id] = root;
            this.buildIndex(children[i].id, children[i].Content ? children[i].Content.folders : []);
        }
    }

    getPath = (id, drive) => {
        if (drive) this.buildIndex("Mon drive", drive);
        return index[id] ? this.getPath(index[id]).concat([id]) : [id];
    }

    getBreadcumpsPath = (idFolder, drive) => {
        let breadCrumbArray = this.getPath(idFolder, drive)
        let breadcrumbs = [];
        breadCrumbArray.map((id, key) => {
            if (id !== "Mon drive") {
                let name = this.getFolderNameById(id, drive)
                if (this.getFolderTypeById(id, drive) === "shared") breadcrumbs.push("Partagés avec moi")
                breadcrumbs.push(name)
            } else {
                breadcrumbs.push(id)
            }
        });
        return breadcrumbs.join(" / ");
    }

    findContactByEmail = (email, contacts) => {
        let index;
        contacts.map((contact, key) => {
            if (contact.email && contact.email === email) index = key
        })
        return index
    }

    findContactByUid = (uid, contacts) => {
        let index;
        contacts.map((contact, key) => {
            if (contact.uid && contact.uid === uid) index = key
        })
        return index
    }

    findClientMondatById = (id, clients) => {
        let index;
        clients.map((client, key) => {
            if (client.ID && client.ID === id) index = key
        })
        return index
    }

    addNewRoom = (room) => {
        this.setState({loading: true, openNewRoomModal: false})
        SmartService.addRoom({name: room.title, start: moment().add("hour", 1).unix() * 1000, duration: 30},
            localStorage.getItem("token"), localStorage.getItem("usrtoken")).then(addRoomRes => {
            if (addRoomRes.status === 200 && addRoomRes.succes === true) {
                room.id = addRoomRes.data.id;
                let rooms = this.state.rooms;
                rooms.push(room);
                firebase.database().ref('/rooms').set(
                    rooms
                ).then(res => {
                    this.props.history.replace({pathname: '/rooms/' + (rooms.length - 1)});
                    this.setState({
                        loading: false,
                        newRoomTitle: "",
                        NewRoomEmails: [],
                        selectedRoom: room,
                        selectedRoomKey: (rooms.length - 1),
                        selectedRoomItems: [(rooms.length - 1).toString()]
                    })
                    this.openSnackbar('success', "Room ajouté avec succès");
                });

            } else {
                this.setState({loading: false})
                this.openSnackbar("error", addRoomRes.error)
            }
        }).catch(err => {
            this.setState({loading: false})
            this.openSnackbar("error", err)
        })

    }


    base64ToSize = (base64) => {
        if (base64.endsWith("==")) {
            return (base64.length * (3 / 4)) - 2
        } else if (base64.endsWith("=")) {
            return (base64.length * (3 / 4)) - 1
        } else {
            return (base64.length * (3 / 4))
        }
    }

    openPdfModal = (doc_id,) => {
        this.setState({loading: true})
        SmartService.getFile(doc_id, localStorage.getItem("token"), localStorage.getItem("usrtoken")).then(fileRes => {
            if (fileRes.succes === true && fileRes.status === 200) {
                this.setState({loading: false})
                this.showDocInPdfModal(fileRes.data.Content.Data)
            } else {
                console.log(fileRes.error)
            }
        }).catch(err => console.log(err))
    }

    deleteFile_Folder = (file) => {
        //console.log(file)
        this.setState({loading: true})
        SmartService.deleteFile(file.key || file.id, localStorage.getItem("token"), localStorage.getItem("usrtoken")).then(deleteRes => {
            if (deleteRes.succes === true && deleteRes.status === 200) {
                if (file.type) this.reloadGed()
                else {
                    this.props.history.replace({pathname: '/drive/0'});
                    this.reloadGed()
                }
                this.openSnackbar("success", file.type ? file.name + ".pdf est supprimé avec succès" : file.title + " est supprimé avec succès")
            } else {
                this.openSnackbar("error", deleteRes.error)
            }
        }).catch(err => {
            this.setState({loading: false})
            this.openSnackbar("error", err)
        })
    }

    renameFile_Folder = (file, newName) => {
        this.setState({loading: true})
        //console.log(file)
        SmartService.updateFileName({name: newName}, file.key || file.id, localStorage.getItem("token"), localStorage.getItem("usrtoken")).then(updateNameRes => {
            if (updateNameRes.succes === true && updateNameRes.status === 200) {
                this.reloadGed()
                this.openSnackbar("success", file.type ? file.name + ".pdf a bien été renommé. Nouveau nom: " + newName + ".pdf" : file.name + " a bien été renommé. Nouveau nom: " + newName)
            } else {
                this.openSnackbar("error", updateNameRes.error)
            }
        }).catch(err => {
            this.setState({loading: false})
            this.openSnackbar("error", err)
        })
    }

    changeStructure = (drive) => {
        const list = [];
        for (let i = 0; i < drive.length; i++) {
            const key = drive[i].id.toString()
            const treeNode = {
                title: drive[i].type ? drive[i].name + ".pdf" : drive[i].name,
                key,
                icon: drive[i].type ?
                    <DescriptionIcon style={{color: "red", backgroundColor: "#fff"}}/> : ({selected}) => (selected ?
                        <FolderIcon style={{color: "#1a73e8"}}/> : <FolderIcon style={{color: "grey"}}/>),
                files: drive[i].Content ? drive[i].Content.files || [] : [],
                folders: drive[i].Content ? drive[i].Content.folders || [] : [],
                typeF: drive[i].type ? "file" : "folder"
            };

            if (drive[i].Content && drive[i].Content.folders.length > 0) {
                treeNode.children = this.changeStructure(drive[i].Content.folders);
            }
            if (drive[i].Content && drive[i].Content.files.length > 0) {
                treeNode.children = this.changeStructure(drive[i].Content.files);
            }

            list.push(treeNode);
        }
        return list;
    }

    saveTimeSheet() {
        let email = localStorage.getItem('email')
        let timeSheet = this.state.TimeSheet
        this.state.TimeSheetData.push(timeSheet)
        firebase.database().ref('/TimeSheet').set(this.state.TimeSheetData)
    }


    createFacture(){
        let lignes_factures = this.state.lignesFactures.filter((lf) => lf.newTime.client === this.state.TimeSheet.newTime.client);
        let odoo_data = [{
            "access_token":"eafd285777ggobfvxyvnx",
            "state": "draft",
            "type": "out_invoice",
            "invoice_sent": false,
            "l10n_ch_isr_sent": false,
            "name": "",
            "invoice_date": moment(this.state.dateFacture).format("YYYY-MM-DD"),
            "date": moment(this.state.dateFacture).format("YYYY-MM-DD"),
            "journal_id": 1,
            "currency_id": 5,
            "invoice_user_id": 3,
            "invoice_incoterm_id": false,
            "auto_post": false,
            "to_check": false,
            "authorized_transaction_ids": [
                [
                    6,
                    false,
                    []
                ]
            ],
            "tax_lock_date_message": false,
            "id": false,
            "invoice_payment_state": "not_paid",
            "invoice_filter_type_domain": "sale",
            "company_currency_id": 5,
            "commercial_partner_id": "",
            "bank_partner_id": 1,
            "invoice_has_outstanding": false,
            "l10n_ch_currency_name": "CHF",
            "invoice_sequence_number_next_prefix": false,
            "invoice_sequence_number_next": false,
            "invoice_has_matching_suspense_amount": false,
            "has_reconciled_entries": false,
            "restrict_mode_hash_table": false,
            "partner_id": lignes_factures[0].newTime.company_id,
            "ref": 121006,
            "invoice_vendor_bill_id": false,
            "invoice_payment_term_id": 1,
            "invoice_date_due": "2020-09-06",
            "company_id": 1,
            "amount_untaxed": 0,
            "amount_by_group": [],
            "amount_total": 0,
            "invoice_payments_widget": "False",
            "amount_residual": 0,
            "invoice_outstanding_credits_debits_widget": false,
            "narration": false,
            "invoice_origin": false,
            "fiscal_position_id": 1,
            "invoice_cash_rounding_id": false,
            "invoice_source_email": false,
            "invoice_payment_ref": false,
            "invoice_partner_bank_id": false,
            "reversed_entry_id": false,
            "message_follower_ids": [],
            "activity_ids": [],
            "message_ids": [],
            "message_attachment_count": 0,
            "invoice_line_ids": [
                [
                    0,
                    "virtual_"+(Math.floor(100 + Math.random() * 900)).toString(),
                    {
                        "sequence": 10,
                        "account_id": 104,
                        "quantity": 0.15,
                        "discount": 10,
                        "partner_id": false,
                        "currency_id": false,
                        "debit": 0,
                        "credit": 60,
                        "display_type": false,
                        "product_id": 1,
                        "name": "/*/*/",
                        "analytic_account_id": false,
                        "analytic_tag_ids": [
                            [
                                6,
                                false,
                                []
                            ]
                        ],

                        "price_unit": 400,
                        "tax_ids": [
                            [
                                6,false,[]
                            ]
                        ],
                        "amount_currency": 0,
                        "date_maturity": false,
                        "tag_ids": [
                            [
                                6,
                                false,
                                []
                            ]
                        ],
                        "recompute_tax_line": false,
                        "is_rounding_line": false,
                        "exclude_from_invoice_tab": false
                    }
                ]
            ],
            "line_ids": []
        }]
        let total = 0;
        lignes_factures.map((ligne,key) => {
            total = total + (ligne.newTime.duree * parseFloat(ligne.newTime.rateFacturation))

            //console.log(ligne.newTime.duree * parseFloat(ligne.newTime.rateFacturation));
            odoo_data[0].line_ids.push(
                [
                        0,
                        "virtual_"+(Math.floor(100 + Math.random() * 900)).toString(),
                        {
                            "account_id": 104,
                            "sequence": 10,
                            "name": ligne.newTime.description,
                            "quantity": ligne.newTime.duree,
                            "price_unit": parseFloat(ligne.newTime.rateFacturation),
                            "discount": 0,
                            "debit": 0,
                            "credit": ligne.newTime.duree * parseFloat(ligne.newTime.rateFacturation) ,
                            "amount_currency": 0,
                            "date_maturity": false,
                            "currency_id": false,
                            "partner_id": false,
                            "product_uom_id": false,
                            "product_id": 1,
                            "payment_id": false,
                            "tax_ids": [
                                [
                                    6,
                                    false,
                                    [

                                    ]
                                ]
                            ],
                            "tax_base_amount": 0,
                            "tax_exigible": true,
                            "tax_repartition_line_id": false,
                            "tag_ids": [
                                [
                                    6,
                                    false,
                                    [

                                    ]
                                ]
                            ],
                            "analytic_account_id": false,
                            "analytic_tag_ids": [
                                [
                                    6,
                                    false,
                                    []
                                ]
                            ],
                            "recompute_tax_line": false,
                            "display_type": false,
                            "is_rounding_line": false,
                            "exclude_from_invoice_tab": false
                        }
                    ],
            )

        })
        //console.log(total)
        odoo_data[0].line_ids.push(
            [
                0,
                "virtual_"+(Math.floor(100 + Math.random() * 900)).toString(),
                {
                    "account_id": 6,
                    "sequence": 10,
                    "name": false,
                    "quantity": 1,
                    "price_unit": -total,
                    "discount": 0,
                    "debit": total,
                    "credit": 0,
                    "amount_currency": 0,
                    "date_maturity": "2020-09-08",
                    "currency_id": false,
                    "partner_id": false,
                    "product_uom_id": false,
                    "product_id": false,
                    "payment_id": false,
                    "tax_ids": [
                        [
                            6,
                            false,
                            []
                        ]
                    ],
                    "tax_base_amount": 0,
                    "tax_exigible": true,
                    "tax_repartition_line_id": false,
                    "tag_ids": [
                        [
                            6,
                            false,
                            []
                        ]
                    ],
                    "analytic_account_id": false,
                    "analytic_tag_ids": [
                        [
                            6,
                            false,
                            []
                        ]
                    ],
                    "recompute_tax_line": false,
                    "display_type": false,
                    "is_rounding_line": false,
                    "exclude_from_invoice_tab": true
                }
            ]
        )

        SmartService.create_facture_odoo(localStorage.getItem("token"),localStorage.getItem("usrtoken"),{data:odoo_data}).then( createFactRes => {
            //console.log(createFactRes)
            window.open("http://91.121.162.202:10013/my/invoices/"+createFactRes.data.id+"?access_token=eafd285777ggobfvxyvnx&report_type=pdf&download=true","_blank")
        }).catch(err => {
            console.log(err);
        })
    }

    createFacture_ForSelected(){
        let lignes_factures = this.state.lignesFactures.filter((lf) => lf.checked === true);
        let odoo_data = [{
            "access_token":"eafd285777ggobfvxyvnx",
            "state": "draft",
            "type": "out_invoice",
            "invoice_sent": false,
            "l10n_ch_isr_sent": false,
            "name": "",
            "invoice_date": moment(this.state.dateFacture).format("YYYY-MM-DD"),
            "date": moment(this.state.dateFacture).format("YYYY-MM-DD"),
            "journal_id": 1,
            "currency_id": 5,
            "invoice_user_id": 3,
            "invoice_incoterm_id": false,
            "auto_post": false,
            "to_check": false,
            "authorized_transaction_ids": [
                [
                    6,
                    false,
                    []
                ]
            ],
            "tax_lock_date_message": false,
            "id": false,
            "invoice_payment_state": "not_paid",
            "invoice_filter_type_domain": "sale",
            "company_currency_id": 5,
            "commercial_partner_id": "",
            "bank_partner_id": 1,
            "invoice_has_outstanding": false,
            "l10n_ch_currency_name": "CHF",
            "invoice_sequence_number_next_prefix": false,
            "invoice_sequence_number_next": false,
            "invoice_has_matching_suspense_amount": false,
            "has_reconciled_entries": false,
            "restrict_mode_hash_table": false,
            "partner_id": lignes_factures[0].newTime.company_id,
            "ref": 121006,
            "invoice_vendor_bill_id": false,
            "invoice_payment_term_id": 1,
            "invoice_date_due": "2020-09-06",
            "company_id": 1,
            "amount_untaxed": 0,
            "amount_by_group": [],
            "amount_total": 0,
            "invoice_payments_widget": "False",
            "amount_residual": 0,
            "invoice_outstanding_credits_debits_widget": false,
            "narration": false,
            "invoice_origin": false,
            "fiscal_position_id": 1,
            "invoice_cash_rounding_id": false,
            "invoice_source_email": false,
            "invoice_payment_ref": false,
            "invoice_partner_bank_id": false,
            "reversed_entry_id": false,
            "message_follower_ids": [],
            "activity_ids": [],
            "message_ids": [],
            "message_attachment_count": 0,
            "invoice_line_ids": [
                [
                    0,
                    "virtual_"+(Math.floor(100 + Math.random() * 900)).toString(),
                    {
                        "sequence": 10,
                        "account_id": 104,
                        "quantity": 0.15,
                        "discount": 10,
                        "partner_id": false,
                        "currency_id": false,
                        "debit": 0,
                        "credit": 60,
                        "display_type": false,
                        "product_id": 1,
                        "name": "/*/*/",
                        "analytic_account_id": false,
                        "analytic_tag_ids": [
                            [
                                6,
                                false,
                                []
                            ]
                        ],

                        "price_unit": 400,
                        "tax_ids": [
                            [
                                6,false,[]
                            ]
                        ],
                        "amount_currency": 0,
                        "date_maturity": false,
                        "tag_ids": [
                            [
                                6,
                                false,
                                []
                            ]
                        ],
                        "recompute_tax_line": false,
                        "is_rounding_line": false,
                        "exclude_from_invoice_tab": false
                    }
                ]
            ],
            "line_ids": []
        }]
        let total = 0;
        lignes_factures.map((ligne,key) => {
            total = total + (ligne.newTime.duree * parseFloat(ligne.newTime.rateFacturation))

            //console.log(ligne.newTime.duree * parseFloat(ligne.newTime.rateFacturation));
            odoo_data[0].line_ids.push(
                [
                    0,
                    "virtual_"+(Math.floor(100 + Math.random() * 900)).toString(),
                    {
                        "account_id": 104,
                        "sequence": 10,
                        "name": ligne.newTime.description,
                        "quantity": ligne.newTime.duree,
                        "price_unit": parseFloat(ligne.newTime.rateFacturation),
                        "discount": 0,
                        "debit": 0,
                        "credit": ligne.newTime.duree * parseFloat(ligne.newTime.rateFacturation) ,
                        "amount_currency": 0,
                        "date_maturity": false,
                        "currency_id": false,
                        "partner_id": false,
                        "product_uom_id": false,
                        "product_id": 1,
                        "payment_id": false,
                        "tax_ids": [
                            [
                                6,
                                false,
                                [

                                ]
                            ]
                        ],
                        "tax_base_amount": 0,
                        "tax_exigible": true,
                        "tax_repartition_line_id": false,
                        "tag_ids": [
                            [
                                6,
                                false,
                                [

                                ]
                            ]
                        ],
                        "analytic_account_id": false,
                        "analytic_tag_ids": [
                            [
                                6,
                                false,
                                []
                            ]
                        ],
                        "recompute_tax_line": false,
                        "display_type": false,
                        "is_rounding_line": false,
                        "exclude_from_invoice_tab": false
                    }
                ],
            )

        })
        //console.log(total)
        odoo_data[0].line_ids.push(
            [
                0,
                "virtual_"+(Math.floor(100 + Math.random() * 900)).toString(),
                {
                    "account_id": 6,
                    "sequence": 10,
                    "name": false,
                    "quantity": 1,
                    "price_unit": -total,
                    "discount": 0,
                    "debit": total,
                    "credit": 0,
                    "amount_currency": 0,
                    "date_maturity": "2020-09-08",
                    "currency_id": false,
                    "partner_id": false,
                    "product_uom_id": false,
                    "product_id": false,
                    "payment_id": false,
                    "tax_ids": [
                        [
                            6,
                            false,
                            []
                        ]
                    ],
                    "tax_base_amount": 0,
                    "tax_exigible": true,
                    "tax_repartition_line_id": false,
                    "tag_ids": [
                        [
                            6,
                            false,
                            []
                        ]
                    ],
                    "analytic_account_id": false,
                    "analytic_tag_ids": [
                        [
                            6,
                            false,
                            []
                        ]
                    ],
                    "recompute_tax_line": false,
                    "display_type": false,
                    "is_rounding_line": false,
                    "exclude_from_invoice_tab": true
                }
            ]
        )

        SmartService.create_facture_odoo(localStorage.getItem("token"),localStorage.getItem("usrtoken"),{data:odoo_data}).then( createFactRes => {
            //console.log(createFactRes)
            window.open("http://91.121.162.202:10013/my/invoices/"+createFactRes.data.id+"?access_token=eafd285777ggobfvxyvnx&report_type=pdf&download=true","_blank")
        }).catch(err => {
            console.log(err);
        })
    }


    deleteLigneFact(lf){
        const r = window.confirm("Voulez-vous vraiment supprimer cette ligne facture ?");
        if(r === true){
            let lignes_facture = this.state.lignesFactures;
            let findIndex = lignes_facture.findIndex(x => x.uid === lf.uid);
            lignes_facture.splice(findIndex,1);
            this.setState({lignesFactures:lignes_facture})
        }

    }

    updateLignes_facture(lignes_factures){
        setTimeout(() => {
            firebase.database().ref("/lignes_factures").set(lignes_factures);
            //console.log(this.state.TimeSheet)
        },300)

    }


    genrateGed(){
        SmartService.addFolder({name:"SECRETARIAT",folder_id:null},localStorage.getItem("token"),localStorage.getItem("usrtoken")).then( addFolderRes => {

            console.log("OK")

            SmartService.addFolder({name:"ETUDE",folder_id:addFolderRes.data.id},localStorage.getItem("token"),localStorage.getItem("usrtoken")).then( addFolderRes1 => {

                console.log("OK")
                SmartService.addFolder({name:"BCORP",folder_id:addFolderRes1.data.id},localStorage.getItem("token"),localStorage.getItem("usrtoken")).then( addFolderRes11 => {
                    console.log("OK")
                }).catch(err => {
                    console.log(err)
                })
                SmartService.addFolder({name:"LOGOS",folder_id:addFolderRes1.data.id},localStorage.getItem("token"),localStorage.getItem("usrtoken")).then( addFolderRes11 => {
                    console.log("OK")
                }).catch(err => {
                    console.log(err)
                })
                SmartService.addFolder({name:"PHOTOS",folder_id:addFolderRes1.data.id},localStorage.getItem("token"),localStorage.getItem("usrtoken")).then( addFolderRes11 => {
                    console.log("OK")
                }).catch(err => {
                    console.log(err)
                })
                SmartService.addFolder({name:"CONFERENCE - PUBLICATIONS",folder_id:addFolderRes1.data.id},localStorage.getItem("token"),localStorage.getItem("usrtoken")).then( addFolderRes11 => {
                    console.log("OK")
                }).catch(err => {
                    console.log(err)
                })
                SmartService.addFolder({name:"KNOW HOW",folder_id:addFolderRes1.data.id},localStorage.getItem("token"),localStorage.getItem("usrtoken")).then( addFolderRes11 => {
                    console.log("OK")
                }).catch(err => {
                    console.log(err)
                })
                SmartService.addFolder({name:"NEWSLETTER",folder_id:addFolderRes1.data.id},localStorage.getItem("token"),localStorage.getItem("usrtoken")).then( addFolderRes11 => {
                    console.log("OK")
                }).catch(err => {
                    console.log(err)
                })
                SmartService.addFolder({name:"PRESENTATION ETUDE",folder_id:addFolderRes1.data.id},localStorage.getItem("token"),localStorage.getItem("usrtoken")).then( addFolderRes11 => {
                    console.log("OK")
                }).catch(err => {
                    console.log(err)
                })
                SmartService.addFolder({name:"CALENDRIER",folder_id:addFolderRes1.data.id},localStorage.getItem("token"),localStorage.getItem("usrtoken")).then( addFolderRes11 => {
                    console.log("OK")
                }).catch(err => {
                    console.log(err)
                })
                SmartService.addFolder({name:"EVENT",folder_id:addFolderRes1.data.id},localStorage.getItem("token"),localStorage.getItem("usrtoken")).then( addFolderRes11 => {
                    console.log("OK")
                }).catch(err => {
                    console.log(err)
                })
                SmartService.addFolder({name:"MODELES",folder_id:addFolderRes1.data.id},localStorage.getItem("token"),localStorage.getItem("usrtoken")).then( addFolderRes11 => {
                    console.log("OK")
                }).catch(err => {
                    console.log(err)
                })
                SmartService.addFolder({name:"ARCHIVAGE",folder_id:addFolderRes1.data.id},localStorage.getItem("token"),localStorage.getItem("usrtoken")).then( addFolderRes11 => {
                    console.log("OK")
                }).catch(err => {
                    console.log(err)
                })
                SmartService.addFolder({name:"OUVERTURE DOSSIER",folder_id:addFolderRes1.data.id},localStorage.getItem("token"),localStorage.getItem("usrtoken")).then( addFolderRes11 => {
                    console.log("OK")
                }).catch(err => {
                    console.log(err)
                })
                SmartService.addFolder({name:"LISTE TELEPHONE INTERNE",folder_id:addFolderRes1.data.id},localStorage.getItem("token"),localStorage.getItem("usrtoken")).then( addFolderRes11 => {
                    console.log("OK")
                }).catch(err => {
                    console.log(err)
                })
                SmartService.addFolder({name:"ASSOCIES ***",folder_id:addFolderRes1.data.id},localStorage.getItem("token"),localStorage.getItem("usrtoken")).then( addFolderRes1_assoc => {
                    console.log("OK")

                    SmartService.addFolder({name:"CONVENTION D'ACTIONNAIRES",folder_id:addFolderRes1_assoc.data.id},localStorage.getItem("token"),localStorage.getItem("usrtoken")).then( addFolderRes11 => {
                        console.log("OK")

                    }).catch(err => {
                        console.log(err)
                    })
                    SmartService.addFolder({name:"CONTRAT DE TRAVAIL",folder_id:addFolderRes1_assoc.data.id},localStorage.getItem("token"),localStorage.getItem("usrtoken")).then( addFolderRes11 => {
                        console.log("OK")

                    }).catch(err => {
                        console.log(err)
                    })
                    SmartService.addFolder({name:"DECISIONS CONSEIL D'ADMINISTRATION",folder_id:addFolderRes1_assoc.data.id},localStorage.getItem("token"),localStorage.getItem("usrtoken")).then( addFolderRes11 => {
                        console.log("OK")

                    }).catch(err => {
                        console.log(err)
                    })
                    SmartService.addFolder({name:"ASSEMBLEE GENERALE EXTRAORDINAIRE",folder_id:addFolderRes1_assoc.data.id},localStorage.getItem("token"),localStorage.getItem("usrtoken")).then( addFolderRes11 => {
                        console.log("OK")

                    }).catch(err => {
                        console.log(err)
                    })
                    SmartService.addFolder({name:"ASSEMBLEE GENERALE ORDINAIRE",folder_id:addFolderRes1_assoc.data.id},localStorage.getItem("token"),localStorage.getItem("usrtoken")).then( addFolderRes11 => {
                        console.log("OK")

                    }).catch(err => {
                        console.log(err)
                    })
                    SmartService.addFolder({name:"PV REUNION",folder_id:addFolderRes1_assoc.data.id},localStorage.getItem("token"),localStorage.getItem("usrtoken")).then( addFolderRes11 => {
                        console.log("OK")

                    }).catch(err => {
                        console.log(err)
                    })

                }).catch(err => {
                    console.log(err)
                })

            }).catch(err => {
                console.log(err)
            })

            SmartService.addFolder({name:"LOCAUX",folder_id:addFolderRes.data.id},localStorage.getItem("token"),localStorage.getItem("usrtoken")).then( addFolderRes2 => {

                SmartService.addFolder({name:"ASSURANCES",folder_id:addFolderRes2.data.id},localStorage.getItem("token"),localStorage.getItem("usrtoken")).then( addFolderRes11 => {
                    console.log("OK")
                }).catch(err => {
                    console.log(err)
                })
                SmartService.addFolder({name:"BAIL A LOYER",folder_id:addFolderRes2.data.id},localStorage.getItem("token"),localStorage.getItem("usrtoken")).then( addFolderRes11 => {
                    console.log("OK")
                }).catch(err => {
                    console.log(err)
                })
                SmartService.addFolder({name:"CAVES",folder_id:addFolderRes2.data.id},localStorage.getItem("token"),localStorage.getItem("usrtoken")).then( addFolderRes11 => {
                    console.log("OK")
                }).catch(err => {
                    console.log(err)
                })
                SmartService.addFolder({name:"BAVITECH",folder_id:addFolderRes2.data.id},localStorage.getItem("token"),localStorage.getItem("usrtoken")).then( addFolderRes11 => {
                    console.log("OK")
                }).catch(err => {
                    console.log(err)
                })
                SmartService.addFolder({name:"NETTOYAGE",folder_id:addFolderRes2.data.id},localStorage.getItem("token"),localStorage.getItem("usrtoken")).then( addFolderRes11 => {
                    console.log("OK")
                }).catch(err => {
                    console.log(err)
                })
                SmartService.addFolder({name:"BADEL",folder_id:addFolderRes2.data.id},localStorage.getItem("token"),localStorage.getItem("usrtoken")).then( addFolderRes11 => {
                    console.log("OK")
                }).catch(err => {
                    console.log(err)
                })

            }).catch(err => {
                console.log(err)
            })

            SmartService.addFolder({name:"COMPTABILITE *",folder_id:addFolderRes.data.id},localStorage.getItem("token"),localStorage.getItem("usrtoken")).then( addFolderRes3 => {

                SmartService.addFolder({name:"BUDGET",folder_id:addFolderRes3.data.id},localStorage.getItem("token"),localStorage.getItem("usrtoken")).then( addFolderRes11 => {
                    console.log("OK")
                }).catch(err => {
                    console.log(err)
                })
                SmartService.addFolder({name:"FACTURATION CLIENTS",folder_id:addFolderRes3.data.id},localStorage.getItem("token"),localStorage.getItem("usrtoken")).then( addFolderRes11 => {
                    console.log("OK")
                }).catch(err => {
                    console.log(err)
                })
                SmartService.addFolder({name:"FACTURES FOURNISSEURS",folder_id:addFolderRes3.data.id},localStorage.getItem("token"),localStorage.getItem("usrtoken")).then( addFolderRes11 => {
                    console.log("OK")
                }).catch(err => {
                    console.log(err)
                })
                SmartService.addFolder({name:"TVA",folder_id:addFolderRes3.data.id},localStorage.getItem("token"),localStorage.getItem("usrtoken")).then( addFolderRes11 => {
                    console.log("OK")
                }).catch(err => {
                    console.log(err)
                })
                SmartService.addFolder({name:"LISTES IBAN",folder_id:addFolderRes3.data.id},localStorage.getItem("token"),localStorage.getItem("usrtoken")).then( addFolderRes11 => {
                    console.log("OK")
                }).catch(err => {
                    console.log(err)
                })
                SmartService.addFolder({name:"CAISSE ETUDE",folder_id:addFolderRes3.data.id},localStorage.getItem("token"),localStorage.getItem("usrtoken")).then( addFolderRes11 => {
                    console.log("OK")
                }).catch(err => {
                    console.log(err)
                })

            }).catch(err => {
                console.log(err)
            })

            SmartService.addFolder({name:"RH *",folder_id:addFolderRes.data.id},localStorage.getItem("token"),localStorage.getItem("usrtoken")).then( addFolderRes4 => {

                SmartService.addFolder({name:"EMPLOYES",folder_id:addFolderRes4.data.id},localStorage.getItem("token"),localStorage.getItem("usrtoken")).then( addFolderRes11 => {
                    console.log("OK")
                }).catch(err => {
                    console.log(err)
                })
                SmartService.addFolder({name:"WELCOME PACK",folder_id:addFolderRes4.data.id},localStorage.getItem("token"),localStorage.getItem("usrtoken")).then( addFolderRes11 => {
                    console.log("OK")
                }).catch(err => {
                    console.log(err)
                })
                SmartService.addFolder({name:"LPP ETUDE",folder_id:addFolderRes4.data.id},localStorage.getItem("token"),localStorage.getItem("usrtoken")).then( addFolderRes11 => {
                    console.log("OK")
                }).catch(err => {
                    console.log(err)
                })
                SmartService.addFolder({name:"FER CIAM",folder_id:addFolderRes4.data.id},localStorage.getItem("token"),localStorage.getItem("usrtoken")).then( addFolderRes11 => {
                    console.log("OK")
                }).catch(err => {
                    console.log(err)
                })
                SmartService.addFolder({name:"TELETRAVAIL",folder_id:addFolderRes4.data.id},localStorage.getItem("token"),localStorage.getItem("usrtoken")).then( addFolderRes11 => {
                    console.log("OK")
                }).catch(err => {
                    console.log(err)
                })
                SmartService.addFolder({name:"CANDIDATURES",folder_id:addFolderRes4.data.id},localStorage.getItem("token"),localStorage.getItem("usrtoken")).then( addFolderRes11 => {
                    console.log("OK")
                }).catch(err => {
                    console.log(err)
                })
                SmartService.addFolder({name:"OCAS",folder_id:addFolderRes4.data.id},localStorage.getItem("token"),localStorage.getItem("usrtoken")).then( addFolderRes11 => {
                    console.log("OK")
                }).catch(err => {
                    console.log(err)
                })

            }).catch(err => {
                console.log(err)
            })

            SmartService.addFolder({name:"LISTES",folder_id:addFolderRes.data.id},localStorage.getItem("token"),localStorage.getItem("usrtoken")).then( addFolderRes5 => {


                SmartService.addFolder({name:"CLIENTS",folder_id:addFolderRes5.data.id},localStorage.getItem("token"),localStorage.getItem("usrtoken")).then( addFolderRes11 => {
                    console.log("OK")
                }).catch(err => {
                    console.log(err)
                })
                SmartService.addFolder({name:"AVOCATS",folder_id:addFolderRes5.data.id},localStorage.getItem("token"),localStorage.getItem("usrtoken")).then( addFolderRes11 => {
                    console.log("OK")
                }).catch(err => {
                    console.log(err)
                })

            }).catch(err => {
                console.log(err)
            })

        }).catch(err => {
            console.log(err)
        })

        SmartService.addFolder({name:"CLIENTS",folder_id:null},localStorage.getItem("token"),localStorage.getItem("usrtoken")).then( addFolderClientRes => {

            SmartService.addFolder({name:"HYPERSONIC LTD",folder_id:addFolderClientRes.data.id},localStorage.getItem("token"),localStorage.getItem("usrtoken")).then( addFolderClientRes1 => {
                console.log("OK")

                SmartService.addFolder({name:"ADMIN (Lettre d'engagement)",folder_id:addFolderClientRes1.data.id},localStorage.getItem("token"),localStorage.getItem("usrtoken")).then( addFolderClientRes11 => {
                    console.log("OK")
                }).catch(err => {
                    console.log(err)
                })
                SmartService.addFolder({name:"MÉMOIRE",folder_id:addFolderClientRes1.data.id},localStorage.getItem("token"),localStorage.getItem("usrtoken")).then( addFolderClientRes11 => {
                    console.log("OK")
                }).catch(err => {
                    console.log(err)
                })
                SmartService.addFolder({name:"CHARGE DE PIECES",folder_id:addFolderClientRes1.data.id},localStorage.getItem("token"),localStorage.getItem("usrtoken")).then( addFolderClientRes11 => {
                    console.log("OK")
                }).catch(err => {
                    console.log(err)
                })
                SmartService.addFolder({name:"CONVOCATIONS",folder_id:addFolderClientRes1.data.id},localStorage.getItem("token"),localStorage.getItem("usrtoken")).then( addFolderClientRes11 => {
                    console.log("OK")
                }).catch(err => {
                    console.log(err)
                })
                SmartService.addFolder({name:"ADMIN (Lettre d'engagement)",folder_id:addFolderClientRes1.data.id},localStorage.getItem("token"),localStorage.getItem("usrtoken")).then( addFolderClientRes11 => {
                    console.log("OK")
                }).catch(err => {
                    console.log(err)
                })
                SmartService.addFolder({name:"COMPTABILITE",folder_id:addFolderClientRes1.data.id},localStorage.getItem("token"),localStorage.getItem("usrtoken")).then( addFolderClientRes11 => {
                    console.log("OK")
                }).catch(err => {
                    console.log(err)
                })
                SmartService.addFolder({name:"CORRESPONDANCE",folder_id:addFolderClientRes1.data.id},localStorage.getItem("token"),localStorage.getItem("usrtoken")).then( addFolderClientRes11 => {
                    console.log("OK")
                }).catch(err => {
                    console.log(err)
                })
                SmartService.addFolder({name:"INTERNE ****",folder_id:addFolderClientRes1.data.id},localStorage.getItem("token"),localStorage.getItem("usrtoken")).then( addFolderClientRes11 => {
                    console.log("OK")
                }).catch(err => {
                    console.log(err)
                })
                SmartService.addFolder({name:"NOTES",folder_id:addFolderClientRes1.data.id},localStorage.getItem("token"),localStorage.getItem("usrtoken")).then( addFolderClientRes11 => {
                    console.log("OK")
                }).catch(err => {
                    console.log(err)
                })
                SmartService.addFolder({name:"PV RENDEZ-VOUS",folder_id:addFolderClientRes1.data.id},localStorage.getItem("token"),localStorage.getItem("usrtoken")).then( addFolderClientRes11 => {
                    console.log("OK")
                }).catch(err => {
                    console.log(err)
                })
                SmartService.addFolder({name:"PROCEDURES",folder_id:addFolderClientRes1.data.id},localStorage.getItem("token"),localStorage.getItem("usrtoken")).then( addFolderClientRes11 => {
                    console.log("OK")
                }).catch(err => {
                    console.log(err)
                })
                SmartService.addFolder({name:"RECHERCHES JURIDIQUES",folder_id:addFolderClientRes1.data.id},localStorage.getItem("token"),localStorage.getItem("usrtoken")).then( addFolderClientRes11 => {
                    console.log("OK")
                }).catch(err => {
                    console.log(err)
                })

            }).catch(err => {
                console.log(err)
            })

            SmartService.addFolder({name:"Serge LICHTENSTEIN",folder_id:addFolderClientRes.data.id},localStorage.getItem("token"),localStorage.getItem("usrtoken")).then( addFolderClientRes2 => {
                console.log("OK")

                SmartService.addFolder({name:"ADMIN (Lettre d'engagement)",folder_id:addFolderClientRes2.data.id},localStorage.getItem("token"),localStorage.getItem("usrtoken")).then( addFolderClientRes11 => {
                    console.log("OK")
                }).catch(err => {
                    console.log(err)
                })
                SmartService.addFolder({name:"MÉMOIRE",folder_id:addFolderClientRes2.data.id},localStorage.getItem("token"),localStorage.getItem("usrtoken")).then( addFolderClientRes11 => {
                    console.log("OK")
                }).catch(err => {
                    console.log(err)
                })
                SmartService.addFolder({name:"CHARGE DE PIECES",folder_id:addFolderClientRes2.data.id},localStorage.getItem("token"),localStorage.getItem("usrtoken")).then( addFolderClientRes11 => {
                    console.log("OK")
                }).catch(err => {
                    console.log(err)
                })
                SmartService.addFolder({name:"CONVOCATIONS",folder_id:addFolderClientRes2.data.id},localStorage.getItem("token"),localStorage.getItem("usrtoken")).then( addFolderClientRes11 => {
                    console.log("OK")
                }).catch(err => {
                    console.log(err)
                })
                SmartService.addFolder({name:"ADMIN (Lettre d'engagement)",folder_id:addFolderClientRes2.data.id},localStorage.getItem("token"),localStorage.getItem("usrtoken")).then( addFolderClientRes11 => {
                    console.log("OK")
                }).catch(err => {
                    console.log(err)
                })
                SmartService.addFolder({name:"COMPTABILITE",folder_id:addFolderClientRes2.data.id},localStorage.getItem("token"),localStorage.getItem("usrtoken")).then( addFolderClientRes11 => {
                    console.log("OK")
                }).catch(err => {
                    console.log(err)
                })
                SmartService.addFolder({name:"CORRESPONDANCE",folder_id:addFolderClientRes2.data.id},localStorage.getItem("token"),localStorage.getItem("usrtoken")).then( addFolderClientRes11 => {
                    console.log("OK")
                }).catch(err => {
                    console.log(err)
                })
                SmartService.addFolder({name:"INTERNE ****",folder_id:addFolderClientRes2.data.id},localStorage.getItem("token"),localStorage.getItem("usrtoken")).then( addFolderClientRes11 => {
                    console.log("OK")
                }).catch(err => {
                    console.log(err)
                })
                SmartService.addFolder({name:"NOTES",folder_id:addFolderClientRes2.data.id},localStorage.getItem("token"),localStorage.getItem("usrtoken")).then( addFolderClientRes11 => {
                    console.log("OK")
                }).catch(err => {
                    console.log(err)
                })
                SmartService.addFolder({name:"PV RENDEZ-VOUS",folder_id:addFolderClientRes2.data.id},localStorage.getItem("token"),localStorage.getItem("usrtoken")).then( addFolderClientRes11 => {
                    console.log("OK")
                }).catch(err => {
                    console.log(err)
                })
                SmartService.addFolder({name:"PROCEDURES",folder_id:addFolderClientRes2.data.id},localStorage.getItem("token"),localStorage.getItem("usrtoken")).then( addFolderClientRes11 => {
                    console.log("OK")
                }).catch(err => {
                    console.log(err)
                })
                SmartService.addFolder({name:"RECHERCHES JURIDIQUES",folder_id:addFolderClientRes2.data.id},localStorage.getItem("token"),localStorage.getItem("usrtoken")).then( addFolderClientRes11 => {
                    console.log("OK")
                }).catch(err => {
                    console.log(err)
                })

            }).catch(err => {
                console.log(err)
            })

        }).catch(err => {
            console.log(err);
        })
    }

    onInputTimeSuggChange = (event, { newValue }) => {
        console.log(newValue)
        let d = this.state.TimeSheet
        d.newTime.duree = newValue
        this.setState({TimeSheet: d})
    };

    onTimeSuggestionsFetchRequested = ({ value }) => {
        this.setState({
            timeSuggestions: getTimeSuggestions(value)
        });
    };

    onTimeSuggestionsClearRequested = () => {
        this.setState({
            timeSuggestions: []
        });
    };


    render() {
        var searchFilter = this.state.annuaire_clients_mondat.filter((soc) => soc.ContactName.toLowerCase().startsWith(this.state.searchSociete.toLowerCase()))
        var searchFilterLignesfacture = this.state.lignesFactures.filter((lf) => lf.newTime.client === this.state.TimeSheet.newTime.client);

        const inputSuggProps = {
            placeholder: '0:1, 0:15, 0:30...',
            value:this.state.TimeSheet.newTime.duree,
            onChange: this.onInputTimeSuggChange
        };

        const contactSelectOptions=[];
        contactSelectOptions.push({label:"Aucun",value:""})
        this.state.contacts.map((contact,key) => {
            contactSelectOptions.push({value:contact.email,
                label:<div><img alt="" src={contact.imageUrl || null} style={{width:30,height:30,objectFit:"cover"}}/>{" "}{contact.nom+" "+contact.prenom}</div>
            })
        })
        return (
            <div>
                {
                    this.state.firstLoading === false &&
                    <div>
                        <TopBar logo={logo} height={70} onClickMenuIcon={() => this.setState({openSideMenu: true})}
                                onLogoutClick={() => {
                                    localStorage.clear();
                                    this.props.history.push("/login")
                                }}
                                textSearch={this.state.textSearch} onChangeSearch={(value) => {
                            this.setState({textSearch: value})
                        }}
                                onRequestSearch={() => {
                                    this.setState({loading: true, showContainerSection: "Drive", focusedItem: "Drive"})
                                    this.props.history.replace({pathname: '/search/' + this.state.textSearch});
                                    SmartService.search(this.state.textSearch, localStorage.getItem("token"), localStorage.getItem("usrtoken")).then(searchRes => {
                                        if (searchRes.succes === true && searchRes.status === 200) {
                                            this.setState({loading: false, searchResult: searchRes.data})
                                        } else {
                                            console.log(searchRes.error)
                                        }
                                    }).catch(err => {
                                        console.log(err)
                                    })
                                }}
                        />
                        <SideMenu logo={logo} items={data.sideBarItems} iconColor={"blue"} textColor={"#65728E"}
                                  history={this.props.history}
                                  opened={this.state.openSideMenu} onClose={() => this.setState({openSideMenu: false})}
                        />
                    </div>
                }

                <MuiBackdrop open={this.state.firstLoading}/>
                <MuiBackdrop open={this.state.loading}/>
                <div style={{marginRight: 50, marginTop: 75, marginLeft: 5}}>
                    <div>
                        <div style={{display: "flex"}}>

                            <div style={{height: 900, overflow: "overlay", minHeight: 900, width: 300, minWidth: 300}}>
                                {
                                    this.state.firstLoading === false &&
                                    <div>
                                        <LeftMenuV3
                                            openNewFolderModalFromRacine={() => this.setState({
                                                newFolderModal: true,
                                                newFolderFromRacine: true
                                            })}
                                            focusedItem={this.state.focusedItem}
                                            setFocusedItem={(item) => {
                                                item === "Drive" ? this.props.history.replace({pathname: '/drive/0'}) :
                                                    item === "Rooms" ? this.state.rooms.length > 0 ? this.props.history.replace({pathname: '/rooms/0'}) : this.props.history.replace({pathname: '/rooms/all'}) :
                                                        item === "Meet" ? this.props.history.replace({pathname: '/meet/new'}) :
                                                            item === "Contacts" ? this.props.history.replace({pathname: '/contacts/aia'}) :
                                                                item === "Societe" ? this.props.history.replace({pathname: '/society/clients_mondat'}) :
                                                                    item === "TimeSheet" ? this.props.history.replace({pathname: '/TimeSheet/activities'}) : this.props.history.replace({pathname: '/drive/0'})
                                                this.setState({focusedItem: item, showContainerSection: item})
                                            }}

                                            showDriveMenuItems={this.state.openDriveMenuItem}
                                            setShowDriveMenuItems={() => this.setState({openDriveMenuItem: !this.state.openDriveMenuItem})}

                                            showRoomsMenuItems={this.state.openRoomMenuItem}
                                            setShowRoomsMenuItems={() => this.setState({openRoomMenuItem: !this.state.openRoomMenuItem})}

                                            showMeetMenuItems={this.state.openMeetMenuItem}
                                            setShowMeetMenuItems={() => this.setState({openMeetMenuItem: !this.state.openMeetMenuItem})}

                                            showSocietyMenuItems={this.state.openSocietyMenuItem}
                                            setShowSocietyMenuItems={() => this.setState({openSocietyMenuItem: !this.state.openSocietyMenuItem})}

                                            showTimeSheet={this.state.openTimeSheetsMenu}
                                            setShowTimeSheet={() => {
                                                this.props.history.replace({pathname: '/TimeSheet/activities'});
                                                this.setState({showContainerSection: "TimeSheet"})
                                            }}

                                            showContacts={this.state.openContactsMenu}
                                            setShowContacts={() => {
                                                this.setState({
                                                    showContainerSection: "Contacts",
                                                    openContactsMenu: !this.state.openContactsMenu
                                                })
                                            }}
                                            selectedContactsItem={this.state.showContainerSection === "Contacts" ? this.state.selectedContactsMenuItem : []}
                                            onContactsItemClick={(nodeId) => {
                                                this.props.history.replace({pathname: '/contacts/' + nodeId});
                                                this.setState({
                                                    showContainerSection: "Contacts"
                                                })
                                            }}
                                            handleSelectContactsMenu={(event, nodeIds) => {
                                                this.setState({selectedContactsMenuItem: nodeIds})
                                            }}

                                            showSociete={this.state.openSocietyMenu}
                                            setShowSociete={() => {
                                                this.setState({showContainerSection: "Societe"})
                                            }}
                                            selectedSocietyItem={this.state.showContainerSection === "Societe" ? this.state.selectedSocietyMenuItem : []}
                                            onSocietyItemClick={(nodeId) => {
                                                this.props.history.replace({pathname: '/society/' + nodeId});
                                                this.setState({showContainerSection: "Societe"})
                                            }}
                                            handleSelectSocietyMenu={(event, nodeIds) => {
                                                this.setState({selectedSocietyMenuItem: nodeIds})
                                            }}

                                            showTimeSheetMenuItems={this.state.openTimeSheetsMenu}
                                            setShowTimeSheetMenuItems={() => {
                                                this.props.history.replace({pathname: '/TimeSheet/activities'});
                                                this.setState({
                                                    openTimeSheetsMenu: !this.state.openTimeSheetsMenu,
                                                    showContainerSection: "TimeSheet",
                                                    selectedTimeSheetItem: ["activities"]
                                                })
                                            }}
                                            selectedTimeSheetItem={this.state.showContainerSection === "TimeSheet" ? this.state.selectedTimeSheetMenuItem : []}

                                            handleSelectTimeSheetMenu={(event, nodeIds) => {
                                                this.setState({selectedTimeSheetMenuItem: nodeIds})
                                            }}
                                            onTimeSheetItemClick={(nodeId) => {
                                                this.props.history.replace({pathname: '/TimeSheet/' + nodeId});
                                                if (nodeId === "activities") {
                                                    this.setState({
                                                        focusedItem: "TimeSheet",
                                                        showContainerSection: "TimeSheet",
                                                        selectedTimeSheetMenuItem: ["activities"]
                                                    })
                                                } else if (nodeId === "dashboard") {
                                                    this.setState({
                                                        focusedItem: "TimeSheet",
                                                        showContainerSection: "TimeSheet",
                                                        selectedTimeSheetMenuItem: ["dashboard"]
                                                    })
                                                } else if (nodeId === "dashboardPerson") {
                                                    this.setState({
                                                        focusedItem: "TimeSheet",
                                                        showContainerSection: "TimeSheet",
                                                        selectedTimeSheetMenuItem: ["dashboardPerson"]
                                                    })
                                                } else if (nodeId === "dashboardProject") {
                                                    this.setState({
                                                        focusedItem: "TimeSheet",
                                                        showContainerSection: "TimeSheet",
                                                        selectedTimeSheetMenuItem: ["dashboardProject"]
                                                    })
                                                }
                                            }}

                                            autoExpandParent={this.state.autoExpandParent}
                                            setAutoExpandParent={(b) => this.setState({autoExpandParent: b})}

                                            openNewFolderModal={() => this.setState({newFolderModal: true})}
                                            showNewFileScreen={() => this.setState({
                                                showNewDocScreen: true,
                                                showUploadStep: "upload"
                                            })}
                                            openShareModal={() => {
                                                this.setState({openShareDocModal: true})
                                            }}

                                            driveFolders={this.state.folders || []}
                                            setDriveFolders={(drive) => this.setState({folders: drive})}

                                            selectedFolder={this.state.selectedFolder}
                                            setSelectedFolder={(folder) => this.setState({selectedFolder: folder})}
                                            setFolderName={(name) => this.setState({selectedFoldername: name})}
                                            setFolderId={(id) => {
                                                this.props.history.replace({pathname: '/drive/' + id});
                                                this.setState({
                                                    focusedItem: "Drive",
                                                    breadcrumbs: this.getBreadcumpsPath(id, this.state.reelFolders),
                                                    selectedFolderId: id,
                                                    showContainerSection: "Drive"
                                                })
                                            }}


                                            setSelectedFolderFiles={(files) => this.setState({selectedFolderFiles: files})}
                                            setSelectedFolderFolders={(folders) => this.setState({selectedFolderFolders: folders})}

                                            selectedDriveItem={this.state.selectedDriveItem}
                                            setSelectedDriveItem={(keys) => this.setState({selectedDriveItem: keys})}

                                            expandedDriveItems={this.state.expandedDriveItems}
                                            setExpandedDriveItems={(keys) => this.setState({expandedDriveItems: keys})}

                                            selectedMeetItem={this.state.showContainerSection === "Meet" ? this.state.selectedMeetMenuItem : []}
                                            handleSelectMeetMenu={(nodeIds) => {
                                                this.setState({selectedMeetMenuItem: nodeIds})
                                            }}
                                            onMeetItemClick={(nodeId) => {
                                                this.props.history.replace({pathname: '/meet/' + nodeId});
                                                if (nodeId === "new") {
                                                    this.setState({
                                                        focusedItem: "Meet",
                                                        showContainerSection: "Meet",
                                                        selectedMeetMenuItem: ["new"]
                                                    })
                                                } else if (nodeId === "rejoin") {
                                                    this.setState({
                                                        focusedItem: "Meet",
                                                        showContainerSection: "Meet",
                                                        selectedMeetMenuItem: ["rejoin"]
                                                    })
                                                } else {
                                                }
                                            }}

                                            sharedDrive={this.state.sharedDrive || []}
                                            sharedRootFiles={this.state.sharedRootFiles}
                                            onClickSharedRootItem={() => {
                                                this.props.history.replace({pathname: '/drive/shared'});
                                                this.setState({
                                                    breadcrumbs: "Mon drive / Partagés avec moi",
                                                    focusedItem: "Drive",
                                                    showContainerSection: "Drive"
                                                })
                                            }}

                                            handleToggle={(event, nodeIds) => {
                                                this.setState({expanded: nodeIds})
                                            }}
                                            onClickNewFileFromRacine={() => {
                                                this.setState({
                                                    newFileFromRacine: true,
                                                    showNewDocScreen: true,
                                                    showUploadStep: "upload"
                                                })
                                            }}

                                            rooms={this.state.rooms}
                                            setSelectedRoom={(room, roomId) => {
                                                this.props.history.replace({pathname: '/rooms/' + roomId});
                                                this.setState({
                                                    selectedRoom: room,
                                                    selectedRoomKey: roomId,
                                                    showContainerSection: "Rooms",
                                                    focusedItem: "Rooms"
                                                })
                                            }}
                                            selectedRoomItems={this.state.showContainerSection === "Rooms" ? this.state.selectedRoomItems : []}
                                            expandedRoomItems={this.state.expandedRoomItems}
                                            onClickAddRoomBtn={() => {
                                                this.setState({openNewRoomModal: true})
                                            }}
                                            handleToggleRoomsMenu={(event, nodeIds) => {
                                                this.setState({expandedRoomItems: nodeIds})
                                            }}
                                            handleSelectRoomsMenu={(event, nodeIds) => {
                                                this.setState({selectedRoomItems: nodeIds})
                                            }}
                                            onClickImportFolder={() => {
                                                this.folderupload.click();
                                            }}
                                            onDeleteFolder={() => {
                                                this.deleteFile_Folder(this.state.selectedFolder)
                                            }}
                                            onRenameFolder={(newName) => {
                                                this.renameFile_Folder(this.state.selectedFolder, newName)
                                            }}
                                        />
                                        <input style={{visibility: 'hidden', width: 0, height: 0}}
                                               onChange={(event) => this.uploadFolder(event)}
                                               type="file" webkitdirectory="" mozdirectory="" directory=""
                                               multiple={true}
                                               ref={(ref) => this.folderupload = ref}
                                        />

                                    </div>
                                }
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
                                                                <div style={{width: "100%"}}>
                                                                    <h5 className="mt-0 mb-1">
                                                                        {
                                                                            this.props.match.params.section === "search" ? "Résultats de recherche" :
                                                                                (this.props.match.params.section_id && this.props.match.params.section_id === '0') ? "Mon drive" : this.state.breadcrumbs
                                                                        }
                                                                    </h5>
                                                                    <div style={{
                                                                        position: "absolute",
                                                                        right: 25,
                                                                        marginTop: -44
                                                                    }}>
                                                                        <IconButton
                                                                            aria-label={this.state.viewMode === "list" ? "Vue liste" : "Vue grille"}
                                                                            onClick={() => {
                                                                                this.state.viewMode === "list" ? this.setState({viewMode: "grid"}) : this.setState({viewMode: "list"})
                                                                            }}
                                                                            title={this.state.viewMode === "list" ? "Vue liste" : "Vue grille"}
                                                                            color="default">
                                                                            {this.state.viewMode === "list" ?
                                                                                <ViewComfyIcon/> : <ListIcon/>}
                                                                        </IconButton>
                                                                    </div>
                                                                    <div style={{
                                                                        height: 1,
                                                                        backgroundColor: "#dadce0",
                                                                        marginBottom: 15,
                                                                        marginTop: 15
                                                                    }}/>

                                                                </div>
                                                            </div>

                                                            <div style={{flexWrap: "wrap", display: "block"}}>

                                                                {
                                                                    this.props.match.params.section === "search" ?
                                                                        <div>
                                                                            <SearchResults
                                                                                textSearch={this.state.textSearch}
                                                                                data={this.state.searchResult}
                                                                                viewMode={this.state.viewMode}
                                                                                onClickDoc={(item) => this.setState({
                                                                                    selectedDoc: item,
                                                                                    openRightMenu: true
                                                                                })}
                                                                                onPdfIconClick={(item) => {
                                                                                    this.setState({loading: true})
                                                                                    //console.log(item)
                                                                                    SmartService.getFile(item.file_id, localStorage.getItem("token"), localStorage.getItem("usrtoken")).then(fileRes => {
                                                                                        if (fileRes.succes === true && fileRes.status === 200) {
                                                                                            this.setState({loading: false})
                                                                                            this.showDocInPdfModal(fileRes.data.Content.Data)
                                                                                        } else {
                                                                                            console.log(fileRes.error)
                                                                                        }
                                                                                    }).catch(err => console.log(err))
                                                                                }}
                                                                                setLoading={(b) => this.setState({loading: b})}
                                                                            />
                                                                        </div> :

                                                                        this.props.match.params.section === "drive" ?
                                                                            this.state.folders.length === 0 && this.state.rootFiles.length === 0 ?
                                                                                <div style={{
                                                                                    marginTop: 25,
                                                                                    display: "flex"
                                                                                }}
                                                                                >
                                                                                    <h5 style={{
                                                                                        fontSize: 16,
                                                                                        color: "gray"
                                                                                    }}>Aucun dossier encore ajouté
                                                                                        ! </h5>&nbsp;&nbsp;
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

                                                                                this.props.match.params.section_id && this.props.match.params.section_id === '0' ?
                                                                                    <div>
                                                                                        <ListFolders
                                                                                            items={this.state.rootFolders}
                                                                                            onDoubleClickFolder={(folder) => {
                                                                                                this.props.history.replace({pathname: '/drive/' + folder.id});
                                                                                                this.setState({
                                                                                                    selectedDriveItem: [folder.id],
                                                                                                    expandedDriveItems: [folder.id],
                                                                                                    autoExpandParent: true,
                                                                                                    selectedFolder: this.getFolderById(folder.id, this.state.folders),
                                                                                                    selectedFoldername: folder.name,
                                                                                                    selectedFolderFiles: folder.Content.files || [],
                                                                                                    selectedFolderFolders: folder.Content.folders || [],
                                                                                                    focusedItem: "Drive",
                                                                                                    breadcrumbs: this.getBreadcumpsPath(folder.id, this.state.reelFolders.concat(this.state.sharedDrive)),
                                                                                                    selectedFolderId: folder.id,
                                                                                                    showContainerSection: "Drive"
                                                                                                })

                                                                                            }}
                                                                                        />
                                                                                        <ListDocs
                                                                                            docs={this.state.rootFiles || []}
                                                                                            viewMode={this.state.viewMode}
                                                                                            onDocClick={(item) => this.setState({
                                                                                                selectedDoc: item,
                                                                                                openRightMenu: true
                                                                                            })}
                                                                                            showDoc={(doc) => this.openPdfModal(doc.id)}
                                                                                            setLoading={(b) => this.setState({loading: b})}
                                                                                            setSelectedFile={(file) => this.setState({selectedFile: file})}
                                                                                            openShareFileModal={() => this.setState({openShareDocModal: true})}
                                                                                            onDeleteFile={(file) => {
                                                                                                this.deleteFile_Folder(file);
                                                                                            }}
                                                                                            onRenameFile={(file, newName) => {
                                                                                                this.renameFile_Folder(file, newName)
                                                                                            }}
                                                                                            onSignBtnClick={(id) => {
                                                                                                this.props.history.push("/signDoc/doc/" + id)
                                                                                            }}
                                                                                        />

                                                                                    </div> :
                                                                                    this.props.match.params.section_id && this.props.match.params.section_id === 'shared' ?
                                                                                        <div style={{marginTop: 15}}>
                                                                                            <ListDocs
                                                                                                docs={this.state.sharedRootFiles || []}
                                                                                                viewMode={this.state.viewMode}
                                                                                                onDocClick={(item) => this.setState({
                                                                                                    selectedDoc: item,
                                                                                                    openRightMenu: true
                                                                                                })}
                                                                                                showDoc={(doc) => this.openPdfModal(doc.id)}
                                                                                                setLoading={(b) => this.setState({loading: b})}
                                                                                                setSelectedFile={(file) => this.setState({selectedFile: file})}
                                                                                                openShareFileModal={() => this.setState({openShareDocModal: true})}
                                                                                                onDeleteFile={(file) => {
                                                                                                    this.deleteFile_Folder(file);
                                                                                                }}
                                                                                                onRenameFile={(file, newName) => {
                                                                                                    this.renameFile_Folder(file, newName)
                                                                                                }}
                                                                                                onSignBtnClick={(id) => {
                                                                                                    this.props.history.push("/signDoc/doc/" + id)
                                                                                                }}
                                                                                            />

                                                                                        </div> :

                                                                                        <div style={{marginTop: 15}}>
                                                                                            <ListFolders
                                                                                                items={this.state.selectedFolderFolders}
                                                                                                onDoubleClickFolder={(folder) => {
                                                                                                    this.props.history.replace({pathname: '/drive/' + folder.id});
                                                                                                    this.setState({
                                                                                                        selectedDriveItem: [folder.id],
                                                                                                        expandedDriveItems: [folder.id],
                                                                                                        selectedFolder: this.getFolderById(folder.id, this.state.folders),
                                                                                                        autoExpandParent: true,
                                                                                                        selectedFoldername: folder.name,
                                                                                                        selectedFolderFiles: folder.Content.files || [],
                                                                                                        selectedFolderFolders: folder.Content.folders || [],
                                                                                                        focusedItem: "Drive",
                                                                                                        breadcrumbs: this.getBreadcumpsPath(folder.id, this.state.reelFolders.concat(this.state.sharedDrive)),
                                                                                                        selectedFolderId: folder.id,
                                                                                                        showContainerSection: "Drive"
                                                                                                    })
                                                                                                }}
                                                                                            />
                                                                                            <ListDocs
                                                                                                docs={this.state.selectedFolderFiles || []}
                                                                                                viewMode={this.state.viewMode}
                                                                                                onDocClick={(item) => this.setState({
                                                                                                    selectedDoc: item,
                                                                                                    openRightMenu: true
                                                                                                })}
                                                                                                showDoc={(doc) => this.openPdfModal(doc.id)}
                                                                                                setLoading={(b) => this.setState({loading: b})}
                                                                                                setSelectedFile={(file) => this.setState({selectedFile: file})}
                                                                                                openShareFileModal={() => this.setState({openShareDocModal: true})}
                                                                                                onDeleteFile={(file) => {
                                                                                                    this.deleteFile_Folder(file);
                                                                                                }}
                                                                                                onRenameFile={(file, newName) => {
                                                                                                    this.renameFile_Folder(file, newName)
                                                                                                }}
                                                                                                onSignBtnClick={(id) => {
                                                                                                    this.props.history.push("/signDoc/doc/" + id)
                                                                                                }}
                                                                                            />

                                                                                        </div> : null


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
                                                                                onClick={() => this.setState({
                                                                                    showNewDocScreen: false,
                                                                                    newFileFromRacine: false
                                                                                })}>
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
                                                                            sur le terrain ou sélectionnez un fichier
                                                                            depuis votre ordinateur.</p>

                                                                        <div className="sk_elupload_drag">
                                                                            <FileUploader
                                                                                onCancel={() => {

                                                                                }}

                                                                                onDrop={(acceptedFiles, rejectedFiles) => {
                                                                                    let formData = new FormData();
                                                                                    formData.append("file", acceptedFiles[0])
                                                                                    this.state.selectedFolderId !== "" && this.state.newFileFromRacine === false && formData.append("folder_id", this.state.selectedFolderId)
                                                                                    axios.request({
                                                                                        method: "POST",
                                                                                        url: data.endpoint + "/ged/896ca0ed-8b4a-40fd-aeff-7ce26ee1bcf9/doc/addfile",
                                                                                        data: formData,
                                                                                        headers: {
                                                                                            'Content-Type': 'multipart/form-data',
                                                                                            'token': localStorage.getItem('token'),
                                                                                            'usrtoken': localStorage.getItem('usrtoken')
                                                                                        },
                                                                                        onUploadProgress: (p) => {
                                                                                            this.setState({
                                                                                                progressUpload: (p.loaded / p.total) * 100
                                                                                            })
                                                                                        }

                                                                                    }).then(res => {
                                                                                        if (res.data.succes === true && res.data.status === 200) {

                                                                                            SmartService.getFile(res.data.data.file_id, localStorage.getItem("token"), localStorage.getItem("usrtoken")).then(fileRes => {
                                                                                                if (fileRes.succes === true && fileRes.status === 200) {

                                                                                                    this.setState({
                                                                                                        newFileFromRacine: false,
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
                                            this.state.showContainerSection === "Rooms" && this.state.loading === false &&
                                            <Rooms rooms={this.state.rooms} selectedRoom={this.state.selectedRoom}
                                                   contacts={this.state.contacts}
                                                   annuaire_clients={this.state.annuaire_clients_mondat}
                                                   openNewRoomModal={() => {
                                                       this.setState({
                                                           openNewRoomModal: true
                                                       })
                                                   }
                                                   }
                                                   addNewtask={(title, assignedTo, team, selectedDateTime) => {
                                                       let room = this.state.selectedRoom;
                                                       let tasks = room.tasks || [];
                                                       tasks.push({
                                                           title: title,
                                                           assignedTo: assignedTo,
                                                           team: team,
                                                           dateTime: selectedDateTime
                                                       })
                                                       room.tasks = tasks;
                                                       firebase.database().ref("rooms/" + this.state.selectedRoomKey).set(
                                                           room
                                                       ).then(ok => {
                                                           this.setState({selectedRoom: room})
                                                           let emails = [];
                                                           let teamNames = [];
                                                           team.map((t, key) => {
                                                               emails.push(t.email)
                                                               teamNames.push(t.fname)
                                                           })
                                                           emails.push(assignedTo.email)
                                                           maillingService.sendCustomMailsWithUrl({
                                                               recipients: emails,
                                                               subject: "Nouvelle tâche ajoutée ",
                                                               msg: "Bonjour, <br> Une tâche avec le nom '" + title + "' vous a été attribué pour la date du "
                                                                   + selectedDateTime + " .<br><br> <b>Team: </b> " + teamNames.join(", ") + "<br><b>Lead: </b> " + assignedTo.prenom + " " + assignedTo.nom + "<br><br>"
                                                                   + "Pour plus de détails, merci de consulter votre compte sur OA Legal.<br><br>",
                                                               footerMsg: "<br><br> Cordialement<br>L'équipe OA Legal",
                                                               linkUrl: "Consulter",
                                                               url: "https://smartdom.ch:8035/rooms/" + this.state.selectedRoomKey
                                                           }).then(ok => {
                                                               this.openSnackbar("success", "Une notification par mail à été bien envoyé au Lead et au différents membre du Team")
                                                           }).catch(err => {
                                                               this.openSnackbar("error", "L'envoi du mail de notification à été échoué ! ")
                                                           })
                                                       })
                                                   }}
                                                   onDeleteTask={(key) => {
                                                       let room = this.state.selectedRoom;
                                                       let tasks = room.tasks;
                                                       tasks.splice(key, 1);
                                                       room.tasks = tasks;
                                                       firebase.database().ref("rooms/" + this.state.selectedRoomKey).set(
                                                           room
                                                       ).then(ok => {
                                                           this.setState({selectedRoom: room})
                                                       })
                                                   }}
                                            />
                                        }
                                        {
                                            this.state.showContainerSection === "Meet" &&
                                            <div>
                                                <h4 className="mt-0 mb-1">Meet</h4>
                                                {
                                                    this.state.selectedMeetMenuItem[0] === "new" ?
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
                                                                                        onClick={() => {
                                                                                            console.log(Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15))
                                                                                            //this.genrateGed()
                                                                                        }}
                                                                                        className="btn btn-danger waves-effect waves-light mb-2"
                                                                                        data-animation="fadein"
                                                                                        data-plugin="custommodal">
                                                                                        <i className="mdi mdi-plus-circle mr-1"/>
                                                                                        Ajouter
                                                                                    </button>
                                                                                </div>
                                                                            </div>

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
                                                                                    <h4 style={{color: "white"}}>OA Legal</h4>
                                                                                </div>
                                                                                <hr style={{
                                                                                    backgroundColor: "#c0c0c0",
                                                                                    height: "2px",
                                                                                    borderStyle: "solid",
                                                                                    color: "red",
                                                                                    width: "80%",
                                                                                    marginTop: 25, marginBottom: 25
                                                                                }}/>
                                                                            </div>

                                                                        </div>
                                                                    </div>
                                                                </div>

                                                                <div className="card">
                                                                    <div className="card-body">
                                                                        {
                                                                            this.state.contacts.length > 0 &&
                                                                            <TableContact
                                                                                contacts={this.state.contacts.filter(x => x.role === "avocat")}
                                                                                onEditClick={(contact, key) => {
                                                                                    this.setState({
                                                                                            selectedContact: contact,
                                                                                            selectedContactKey: key,
                                                                                            openRightContactModalDetail: true
                                                                                        }
                                                                                    )
                                                                                }
                                                                                }/>
                                                                        }
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
                                                                    <button onClick={() => this.setState({
                                                                        editContactForm: false,
                                                                        showContainerSection: "Contacts"
                                                                    })}
                                                                            className="btn btn-sm btn-outline-info">Retour
                                                                    </button>
                                                                </div>
                                                                <div className="card-box text-center"
                                                                     style={{marginTop: 1}}>
                                                                    <img onClick={() => this.imageUpload.click()}
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
                                                                           onChange={(files) => this.uploadImage(files)}
                                                                           ref={(ref) => this.imageUpload = ref}
                                                                    />

                                                                    <h4 className="mb-0">{this.state.selectedContact.prenom + ' ' + this.state.selectedContact.nom}</h4>
                                                                    <p className="text-muted">{this.state.selectedContact.specialite} </p>

                                                                    <div style={{display: "contents"}}>
                                                                        <button type="button"
                                                                                onClick={this.saveContactChanges}
                                                                                className="btn btn-success btn-xs waves-effect mb-2 waves-light m-1">
                                                                            <i className="fe-edit"/>&nbsp;&nbsp;
                                                                            Enregistrer
                                                                        </button>
                                                                        <button type="button" onClick={() => {
                                                                            this.setState({showPdfPreviewModal: true})
                                                                            setTimeout(() => {
                                                                                this.setState({isDocPreviewReady: true})
                                                                            }, 1000)
                                                                        }}
                                                                                className="btn btn-danger btn-xs waves-effect mb-2 waves-light m-1">
                                                                            <i className="fe-printer"/>&nbsp;&nbsp;
                                                                            Aperçu
                                                                        </button>
                                                                        <button type="button" onClick={() => {
                                                                            this.setState({showPdfFlipModal: true})
                                                                        }}
                                                                                className="btn btn-danger btn-xs waves-effect mb-2 waves-light m-1">
                                                                            <i className="fe-printer"/>&nbsp;&nbsp;
                                                                            Book
                                                                        </button>
                                                                    </div>

                                                                    <div style={{marginTop: 30}} className="text-left">
                                                                        <Tabs>
                                                                            <TabList>
                                                                                <Tab>Informations générales</Tab>
                                                                                <Tab>Famille & Vie privée</Tab>
                                                                                <Tab>Parcours professionnel</Tab>
                                                                                <Tab>Formations</Tab>
                                                                                <Tab>Affiliations</Tab>
                                                                                <Tab>Domaine d'activités</Tab>
                                                                                <Tab>Langues</Tab>
                                                                                <Tab>Domaines d'intérêt, loisirs et sports</Tab>
                                                                            </TabList>

                                                                            <TabPanel>
                                                                                <h5 style={{marginTop: 20}}>Informations
                                                                                    générales</h5>
                                                                                <div className="row" style={{marginTop: 35}}>
                                                                                    <div className="col-md-8">
                                                                                        <p style={{marginBottom: 10}}>À propos</p>
                                                                                        <textarea
                                                                                            rows={7}
                                                                                            className="form-control"
                                                                                            id="about"
                                                                                            name="about"
                                                                                            value={this.state.selectedContact.about}
                                                                                            onChange={this.handleChange('selectedContact', 'about')}/>
                                                                                    </div>
                                                                                    <div className="col-md-4">
                                                                                        <h6>
                                                                                            Rate de facturation
                                                                                        </h6>
                                                                                        <Input
                                                                                            className="form-control "
                                                                                            id="duree354"
                                                                                            style={{width: "100%"}}
                                                                                            name="duree6878"
                                                                                            type="text"
                                                                                            endAdornment={
                                                                                                <InputAdornment
                                                                                                    position="end">CHF/h</InputAdornment>}


                                                                                            value={this.state.selectedContact.rateFacturation}
                                                                                            onChange={this.handleChange('selectedContact', 'rateFacturation')}
                                                                                            />
                                                                                    </div>
                                                                                </div>
                                                                                <div className="row"
                                                                                     style={{marginTop: 35}}>
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
                                                                                <div className="row"
                                                                                     style={{marginTop: 20}}>
                                                                                    <div className="col-md-6">
                                                                                        <p style={{marginBottom: 10}}>Email</p>
                                                                                        <input
                                                                                            className="form-control"
                                                                                            type="text"
                                                                                            id="email"
                                                                                            name="email"
                                                                                            //readOnly={true}
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
                                                                                <div className="row"
                                                                                     style={{marginTop: 20}}>
                                                                                    <div className="col-sm-6">
                                                                                        <p style={{marginBottom: 10}}>Titre</p>
                                                                                        <select
                                                                                            className="form-control custom-select"
                                                                                            id="titre"
                                                                                            name="titre"
                                                                                            placeholder="Titre"
                                                                                            value={this.state.selectedContact.titre}
                                                                                            onChange={this.handleChange('selectedContact', 'titre')}
                                                                                        >
                                                                                            {
                                                                                                data.titres.map((titre, key) =>
                                                                                                    <option key={key}
                                                                                                            value={titre}
                                                                                                            label={titre}/>
                                                                                                )
                                                                                            }
                                                                                        </select>
                                                                                    </div>
                                                                                    <div className="col-sm-6">
                                                                                        <p style={{marginBottom: 10}}>Pays</p>
                                                                                        <select
                                                                                            className="form-control custom-select"
                                                                                            id="pays"
                                                                                            name="pays"
                                                                                            placeholder="Pays"
                                                                                            value={this.state.selectedContact.pays}
                                                                                            onChange={this.handleChange('selectedContact', 'pays')}>
                                                                                            {
                                                                                                countryList.map((country, key) =>
                                                                                                    <option key={key}
                                                                                                            value={country.Name}
                                                                                                            label={country.Name}/>
                                                                                                )
                                                                                            }

                                                                                        </select>
                                                                                    </div>
                                                                                </div>
                                                                            </TabPanel>

                                                                            <TabPanel>
                                                                                <h5 style={{marginTop: 20}}>Famille &
                                                                                    Vie privée</h5>
                                                                                <div className="row"
                                                                                     style={{marginTop: 35}}>
                                                                                    <div className="col-md-12">
                                                                                        <p style={{marginBottom: 10}}>Décrire
                                                                                            en quelques lignes </p>
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
                                                                                <h5 style={{marginTop: 20}}>Parcours
                                                                                    professionnel</h5>
                                                                                <div style={{
                                                                                    display: 'flex',
                                                                                    flexWrap: 'wrap',
                                                                                    marginTop: 10
                                                                                }}>
                                                                                    {
                                                                                        (this.state.selectedContact.parcoursP || []).map((item, key) => (
                                                                                            <div key={key}
                                                                                                 style={{margin: 3}}>
                                                                                                <Chip
                                                                                                    icon={<Staricon/>}
                                                                                                    label={item}
                                                                                                    color="secondary"
                                                                                                    onDelete={this.removeItem('parcour', key)}
                                                                                                    style={{
                                                                                                        fontWeight: "bold",
                                                                                                        backgroundColor: "cornflowerblue"
                                                                                                    }}
                                                                                                />
                                                                                            </div>
                                                                                        ))
                                                                                    }
                                                                                </div>
                                                                                <div className="row"
                                                                                     style={{marginTop: 10}}>
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
                                                                                                <i className="fe-plus-square"/> Ajouter
                                                                                                un parcour
                                                                                            </span>
                                                                                        </a>
                                                                                    </div>
                                                                                </div>
                                                                            </TabPanel>

                                                                            <TabPanel>
                                                                                <h5 style={{marginTop: 20}}>Formation</h5>
                                                                                <div style={{
                                                                                    flexWrap: 'wrap',
                                                                                    marginTop: 10
                                                                                }}>
                                                                                    {
                                                                                        (this.state.selectedContact.formations || []).map((item, key) => (
                                                                                            <div key={key} style={{
                                                                                                margin: 3,
                                                                                                marginBottom: 6
                                                                                            }}>
                                                                                                <Chip
                                                                                                    icon={
                                                                                                        <CheckCircle/>}
                                                                                                    label={item}
                                                                                                    color="primary"
                                                                                                    onDelete={this.removeItem('formation', key)}
                                                                                                    style={{
                                                                                                        fontWeight: "bold",
                                                                                                        backgroundColor: "lightseagreen"
                                                                                                    }}
                                                                                                />
                                                                                            </div>
                                                                                        ))
                                                                                    }
                                                                                </div>
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
                                                                                            <span className="btn__text"
                                                                                                  id="btn-add-child">
                                                                                                <i className="fe-plus-square"/> Ajouter
                                                                                                une formation
                                                                                            </span>
                                                                                        </a>
                                                                                    </div>
                                                                                </div>
                                                                            </TabPanel>

                                                                            <TabPanel>
                                                                                <h5 style={{marginTop: 20}}>Affiliations</h5>
                                                                                <div style={{marginTop: 15}}>
                                                                                    <Autocomplete
                                                                                        value={this.state.selectedContact.affiliations || []}
                                                                                        onChange={(event, values) => {
                                                                                            let selectedContact = this.state.selectedContact;
                                                                                            selectedContact.affiliations = values;
                                                                                            this.setState({selectedContact: selectedContact})
                                                                                        }}
                                                                                        title={"Affiliations"}
                                                                                        multiple
                                                                                        id="checkboxes-af-demo"
                                                                                        options={data.affiliations}
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
                                                                                        style={{
                                                                                            width: 500,
                                                                                            marginLeft: 10,
                                                                                            borderColor: "#f0f0f0"
                                                                                        }}
                                                                                        renderInput={(params) => (
                                                                                            <TextField {...params}
                                                                                                       variant="outlined"
                                                                                                       placeholder=""/>
                                                                                        )}
                                                                                    />
                                                                                </div>
                                                                            </TabPanel>

                                                                            <TabPanel>
                                                                                <h5 style={{marginTop: 20}}>Domaine
                                                                                    d'activités</h5>
                                                                                <div style={{marginTop: 15}}>
                                                                                    <Autocomplete
                                                                                        value={this.state.selectedContact.domainesAct || []}
                                                                                        onChange={(event, values) => {
                                                                                            let selectedContact = this.state.selectedContact;
                                                                                            selectedContact.domainesAct = values;
                                                                                            this.setState({selectedContact: selectedContact})
                                                                                        }}
                                                                                        title={"Domaine d'activités"}
                                                                                        multiple
                                                                                        id="checkboxes-da-demo"
                                                                                        options={data.domainesAct}
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
                                                                                        style={{
                                                                                            width: 500,
                                                                                            marginLeft: 10,
                                                                                            borderColor: "#f0f0f0"
                                                                                        }}
                                                                                        renderInput={(params) => (
                                                                                            <TextField {...params}
                                                                                                       variant="outlined"
                                                                                                       placeholder=""/>
                                                                                        )}
                                                                                    />
                                                                                </div>

                                                                            </TabPanel>

                                                                            <TabPanel>
                                                                                <h5 style={{marginTop: 20}}>Langues</h5>
                                                                                <Autocomplete
                                                                                    value={this.state.selectedContact.langues || []}
                                                                                    onChange={(event, values) => {
                                                                                        let selectedContact = this.state.selectedContact;
                                                                                        selectedContact.langues = values;
                                                                                        this.setState({selectedContact: selectedContact})
                                                                                    }}
                                                                                    title={"langues"}
                                                                                    multiple
                                                                                    id="checkboxes-l-demo"
                                                                                    options={data.langues}
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
                                                                                    style={{
                                                                                        width: 500,
                                                                                        marginLeft: 10,
                                                                                        borderColor: "#f0f0f0"
                                                                                    }}
                                                                                    renderInput={(params) => (
                                                                                        <TextField {...params}
                                                                                                   variant="outlined"
                                                                                                   placeholder=""/>
                                                                                    )}
                                                                                />

                                                                            </TabPanel>

                                                                            <TabPanel>

                                                                                <h5 style={{marginTop: 20}}>Domaines
                                                                                    d'intérêt, loisirs et sports</h5>
                                                                                <div className="row">
                                                                                    <div className="col-md-8">
                                                                                        <div style={{
                                                                                            display: 'flex',
                                                                                            flexWrap: 'wrap',
                                                                                            marginTop: 10
                                                                                        }}>
                                                                                            {
                                                                                                (this.state.selectedContact.hobbies || []).map((item, key) => (
                                                                                                    <div key={key}
                                                                                                         style={{margin: 3}}>
                                                                                                        <Chip
                                                                                                            icon={
                                                                                                                <MoodIcon/>}
                                                                                                            label={item}
                                                                                                            color="secondary"
                                                                                                            onDelete={this.removeItem('hobbies', key)}
                                                                                                            style={{
                                                                                                                fontWeight: "bold",
                                                                                                                backgroundColor: "lightpink"
                                                                                                            }}
                                                                                                        />
                                                                                                    </div>
                                                                                                ))
                                                                                            }
                                                                                        </div>
                                                                                    </div>

                                                                                </div>

                                                                                <div className="row"
                                                                                     style={{marginTop: 20}}>
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
                                                                                                <i className="fe-plus-square"/> Ajouter
                                                                                                un centre d'intérêt,
                                                                                                loisir ou sport
                                                                                            </span>
                                                                                        </a>
                                                                                    </div>
                                                                                </div>

                                                                            </TabPanel>
                                                                        </Tabs>
                                                                    </div>
                                                                </div>
                                                            </div>

                                                        </div>

                                                    </div> : null
                                        }

                                        {
                                            this.state.showContainerSection === "Societe" ?
                                                this.state.editSocieteForm === false ?
                                                    <div>
                                                        {
                                                            this.state.annuaire_clients_mondat.length > 0 &&
                                                            <TableSociete
                                                                contacts={this.state.contacts}
                                                                societes={this.state.annuaire_clients_mondat}
                                                                onEditClick={(societe, key) => {
                                                                    this.setState({
                                                                            selectedSociete: societe,
                                                                            selectedSocieteKey: key,
                                                                            editSocieteForm: true
                                                                        }
                                                                    )
                                                                }
                                                                }/>
                                                        }
                                                    </div> :
                                                    <div>
                                                        <div className="row">
                                                            <div className="col-lg-12">
                                                                <div style={{textAlign: "right"}}>
                                                                    <button onClick={() => this.setState({
                                                                        editSocieteForm: false,
                                                                        showContainerSection: "Societe"
                                                                    })}
                                                                            className="btn btn-sm btn-outline-info">Retour
                                                                    </button>
                                                                </div>
                                                                <div className="card-box text-center"
                                                                     style={{marginTop: 1}}>
                                                                    <img onClick={() => this.imageUpload.click()}
                                                                         src={this.state.selectedSociete.imageUrl ? this.state.selectedSociete.imageUrl : this.state.selectedSociete.ContactType === "Company" ? entIcon : userAvatar}
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
                                                                           onChange={(files) => this.uploadImage(files)}
                                                                           ref={(ref) => this.imageUpload = ref}
                                                                    />

                                                                    <h4 className="mb-0">{this.state.selectedSociete.ContactName}</h4>
                                                                    <p className="text-muted">{this.state.selectedContact.PrimaryAddressCountry || ""} </p>

                                                                    <div style={{display: "contents"}}>
                                                                        <button type="button"
                                                                                onClick={this.saveSocietyChanges}
                                                                                className="btn btn-success btn-sm waves-effect mb-2 waves-light m-1">
                                                                            <i className="fe-save"/>&nbsp;&nbsp;
                                                                            Enregistrer
                                                                        </button>
                                                                        <button type="button" onClick={() => {

                                                                        }}
                                                                                className="btn btn-danger btn-sm waves-effect mb-2 waves-light m-1">
                                                                            <i className="fe-printer"/>&nbsp;&nbsp;
                                                                            Aperçu
                                                                        </button>
                                                                        <button type="button" onClick={() => {
                                                                        }}
                                                                                className="btn btn-danger btn-sm waves-effect mb-2 waves-light m-1">
                                                                            <i className="fe-book-open"/>&nbsp;&nbsp;
                                                                            Book
                                                                        </button>
                                                                    </div>

                                                                    <div style={{marginTop: 30}} className="text-left">
                                                                        <Tabs>
                                                                            <TabList>
                                                                                <Tab>Informations générales</Tab>
                                                                                <Tab disabled={true}>Graphique </Tab>
                                                                                <Tab>Ouverture mandat </Tab>

                                                                            </TabList>

                                                                            <TabPanel>
                                                                                <h5 style={{marginTop: 20}}>Informations
                                                                                    générales</h5>
                                                                                <div className="row"
                                                                                     style={{marginTop: 35}}>
                                                                                    <div className="col-md-6">
                                                                                        <div className="col-md-12">
                                                                                            <p style={{marginBottom: 10}}>Email</p>
                                                                                            <input
                                                                                                type="email"
                                                                                                className="form-control"
                                                                                                id="email"
                                                                                                name="email"
                                                                                                value={this.state.selectedSociete.PrimaryEmailAddress}
                                                                                                onChange={this.handleChange('selectedSociete', 'PrimaryEmailAddress')}/>
                                                                                        </div>
                                                                                    </div>
                                                                                    <div className="col-md-6">
                                                                                        <p style={{marginBottom: 10}}>Statut</p>
                                                                                        <FormControlLabel
                                                                                            control={<Switch
                                                                                                checked={this.state.selectedSociete.isActif || false}
                                                                                                onChange={event => {
                                                                                                    let obj = this.state.selectedSociete;
                                                                                                    obj.isActif = event.target.checked;
                                                                                                    this.setState({selectedSociete: obj})
                                                                                                }}
                                                                                                name="isActif"/>}
                                                                                            label={this.state.selectedSociete.isActif ? this.state.selectedSociete.isActif === true ? "Actif" : "Non actif" : "Non actif"}
                                                                                        />
                                                                                    </div>
                                                                                </div>
                                                                                <div className="row"
                                                                                     style={{marginTop: 35}}>
                                                                                    <div className="col-md-12">
                                                                                        <p style={{marginBottom: 10}}>À
                                                                                            propos</p>
                                                                                        <textarea
                                                                                            rows={4}
                                                                                            className="form-control"
                                                                                            id="about"
                                                                                            name="about"
                                                                                            value={this.state.selectedSociete.about}
                                                                                            onChange={this.handleChange('selectedSociete', 'about')}/>
                                                                                    </div>
                                                                                </div>
                                                                                <div className="row"
                                                                                     style={{marginTop: 35}}>
                                                                                    <div className="col-md-6">
                                                                                        <p style={{marginBottom: 10}}>
                                                                                            {
                                                                                                this.state.selectedSociete.ContactType === "Person" ? "Nom" : "Nom de la societe"
                                                                                            }
                                                                                        </p>
                                                                                        <input
                                                                                            className="form-control"
                                                                                            type="text"
                                                                                            id="nom"
                                                                                            name="nom"
                                                                                            value={this.state.selectedSociete.ContactName}
                                                                                            onChange={this.handleChange('selectedSociete', 'nomSociete')}/>
                                                                                    </div>
                                                                                    <div
                                                                                        className="col-md-6">
                                                                                        <p style={{marginBottom: 10}}>Secteur</p>
                                                                                        <select
                                                                                            className="form-control custom-select"
                                                                                            value={this.state.selectedSociete.secteur}
                                                                                            onChange={this.handleChange('selectedSociete', 'secteur')}
                                                                                        >
                                                                                            {
                                                                                                Data.secteurs.map((secteur, key) =>
                                                                                                    <option key={key}
                                                                                                            value={secteur}>{secteur}</option>
                                                                                                )
                                                                                            }

                                                                                        </select>
                                                                                    </div>
                                                                                </div>
                                                                                <div className="row"
                                                                                     style={{marginTop: 20}}>
                                                                                    <div className="col-md-6">
                                                                                        <p style={{marginBottom: 10}}>Site
                                                                                            web </p>
                                                                                        <input
                                                                                            className="form-control"
                                                                                            type="text"
                                                                                            id="email"
                                                                                            name="email"
                                                                                            placeholder="https://..."
                                                                                            //readOnly={true}
                                                                                            value={this.state.selectedSociete.siteweb}
                                                                                            onChange={this.handleChange('selectedSociete', 'siteweb')}/>
                                                                                    </div>
                                                                                    <div
                                                                                        className="col-md-6">
                                                                                        <p style={{marginBottom: 10}}>Taille
                                                                                            de l'entreprise</p>
                                                                                        <input
                                                                                            className="form-control"
                                                                                            type="text"
                                                                                            id="phone"
                                                                                            name="phone"
                                                                                            value={this.state.selectedSociete.tailleEntreprise}
                                                                                            onChange={this.handleChange('selectedSociete', 'tailleEntreprise')}/>
                                                                                    </div>
                                                                                </div>
                                                                                <div className="row"
                                                                                     style={{marginTop: 20}}>
                                                                                    <div className="col-sm-6">
                                                                                        <p style={{marginBottom: 10}}>Type</p>
                                                                                        <select
                                                                                            className="form-control custom-select"
                                                                                            value={this.state.selectedSociete.ContactType}
                                                                                            onChange={this.handleChange('selectedSociete', 'ContactType')}
                                                                                        >
                                                                                            {
                                                                                                Data.contactTypes.map((type, key) =>
                                                                                                    <option key={key}
                                                                                                            value={type.value}>{type.label}</option>
                                                                                                )
                                                                                            }

                                                                                        </select>
                                                                                    </div>
                                                                                    <div className="col-sm-6">
                                                                                        <p style={{marginBottom: 10}}>Fondée
                                                                                            en </p>
                                                                                        <Input
                                                                                            type="date"
                                                                                            className="form-control"
                                                                                            id="pays"
                                                                                            name="pays"
                                                                                            placeholder=""
                                                                                            value={this.state.selectedSociete.fondee}
                                                                                            onChange={this.handleChange('selectedSociete', 'fondee')}>


                                                                                        </Input>
                                                                                    </div>
                                                                                </div>
                                                                                <div className="row"
                                                                                     style={{marginTop: 20}}>
                                                                                    <div className="col-sm-6">
                                                                                        <p style={{marginBottom: 10}}>Chiffre
                                                                                            d'affaire</p>
                                                                                        <input
                                                                                            className="form-control custom-select"
                                                                                            id="titre"
                                                                                            name="titre"
                                                                                            type="text"
                                                                                            placeholder="Titre"
                                                                                            value={this.state.selectedSociete.chiffre_affaire}
                                                                                            onChange={this.handleChange('selectedSociete', 'chiffre_affaire')}
                                                                                        >
                                                                                        </input>
                                                                                    </div>
                                                                                    <div className="col-sm-6">
                                                                                        <p style={{marginBottom: 10}}>Capitaux
                                                                                            levée </p>
                                                                                        <Input
                                                                                            className="form-control"
                                                                                            id="pays"
                                                                                            name="pays"
                                                                                            placeholder=""
                                                                                            value={this.state.selectedSociete.capitaux_levés}
                                                                                            onChange={this.handleChange('selectedSociete', 'capitaux_levés')}>


                                                                                        </Input>
                                                                                    </div>
                                                                                </div>
                                                                            </TabPanel>

                                                                            <TabPanel>
                                                                                <h5 style={{marginTop: 20}}>Graphique</h5>
                                                                                <div className="row"
                                                                                     style={{marginTop: 35}}>
                                                                                    <div className="col-md-12">
                                                                                        <Bubble
                                                                                            data={Data.datas}

                                                                                        />

                                                                                    </div>
                                                                                </div>
                                                                            </TabPanel>

                                                                            <TabPanel>
                                                                                <div className="row mt-2">
                                                                                    <div className="col-md-3">
                                                                                        <div>
                                                                                            {
                                                                                                this.state.selectedSociete.ContactType === "Person" ? "Nom" : "Nom de la societé"
                                                                                            }
                                                                                        </div>
                                                                                        <div>
                                                                                            <input
                                                                                                className="form-control"
                                                                                                defaultValue={this.state.selectedSociete.ContactName}
                                                                                                readOnly={true}/>
                                                                                        </div>
                                                                                    </div>
                                                                                    <div className="col-md-4">
                                                                                        <div>
                                                                                            Type de dossier
                                                                                        </div>
                                                                                        <div>
                                                                                            <select
                                                                                                className="form-control custom-select"
                                                                                                value={this.state.selectedSociete.mondat ? this.state.selectedSociete.mondat.typeDossier || "" : ""}
                                                                                                onChange={this.handleObjectChange("selectedSociete", "mondat", "typeDossier")}
                                                                                            >
                                                                                                {
                                                                                                    Data.secteurs.map((secteur, key) =>
                                                                                                        <option
                                                                                                            key={key}
                                                                                                            value={secteur}>{secteur}</option>
                                                                                                    )
                                                                                                }

                                                                                            </select>
                                                                                        </div>

                                                                                    </div>
                                                                                    <div className="col-md-5">
                                                                                        <div>
                                                                                            Description du projet
                                                                                        </div>
                                                                                        <div>
                                                                                            <textarea
                                                                                                className="form-control"
                                                                                                value={this.state.selectedSociete.mondat ? this.state.selectedSociete.mondat.description || "" : ""}
                                                                                                onChange={this.handleObjectChange("selectedSociete", "mondat", "description")}
                                                                                                rows={4}/>
                                                                                        </div>

                                                                                    </div>
                                                                                </div>
                                                                                <div className="row">
                                                                                    <div className="col-md-3 mt-1">
                                                                                        <div>
                                                                                            Dossier LBA ( intermédiaire
                                                                                            financier)
                                                                                        </div>
                                                                                        <div>
                                                                                            <select
                                                                                                className="form-control custom-select"
                                                                                                style={{width: "80%"}}
                                                                                                value={this.state.selectedSociete.mondat ? this.state.selectedSociete.mondat.dossierLBA || "" : ""}
                                                                                                onChange={this.handleObjectChange("selectedSociete", "mondat", "dossierLBA")}
                                                                                            >
                                                                                                <option
                                                                                                    value={"Oui"}>Oui
                                                                                                </option>
                                                                                                <option
                                                                                                    value={"Non"}>Non
                                                                                                </option>
                                                                                            </select>
                                                                                        </div>

                                                                                    </div>
                                                                                </div>
                                                                                <div
                                                                                    className="row mt-4 align-items-center">
                                                                                    <div className="col-md-4">
                                                                                        <div>
                                                                                            <h6>Personne en charge
                                                                                                principale ( le client.
                                                                                                ) </h6>
                                                                                        </div>
                                                                                        <div
                                                                                            className="row justify-content-center align-items-center mt-2">
                                                                                            <div className="col-md-3">
                                                                                                <div>Prénom</div>
                                                                                            </div>
                                                                                            <div className="col-md-8">
                                                                                                <input
                                                                                                    className="form-control"
                                                                                                    type="text"
                                                                                                    id="nom"
                                                                                                    name="nom"
                                                                                                    value={this.state.selectedSociete.mondat ? this.state.selectedSociete.mondat.pcp_prenom || "" : ""}
                                                                                                    onChange={this.handleObjectChange("selectedSociete", "mondat", "pcp_prenom")}

                                                                                                />

                                                                                            </div>

                                                                                        </div>
                                                                                        <div
                                                                                            className="row justify-content-center align-items-center mt-2">
                                                                                            <div className="col-md-3">
                                                                                                <div>Nom</div>
                                                                                            </div>
                                                                                            <div className="col-md-8">
                                                                                                <input
                                                                                                    className="form-control"
                                                                                                    type="text"
                                                                                                    id="nom"
                                                                                                    name="nom"
                                                                                                    value={this.state.selectedSociete.mondat ? this.state.selectedSociete.mondat.pcp_nom || "" : ""}
                                                                                                    onChange={this.handleObjectChange("selectedSociete", "mondat", "pcp_nom")}
                                                                                                />
                                                                                            </div>

                                                                                        </div>
                                                                                        <div
                                                                                            className="row justify-content-center align-items-center mt-2">
                                                                                            <div className="col-md-3">
                                                                                                <div>Email</div>
                                                                                            </div>
                                                                                            <div className="col-md-8">
                                                                                                <input
                                                                                                    className="form-control"
                                                                                                    type="text"
                                                                                                    id="nom"
                                                                                                    name="nom"
                                                                                                    value={this.state.selectedSociete.mondat ? this.state.selectedSociete.mondat.pcp_email || "" : ""}
                                                                                                    onChange={this.handleObjectChange("selectedSociete", "mondat", "pcp_email")}
                                                                                                />
                                                                                            </div>

                                                                                        </div>
                                                                                        <div
                                                                                            className="row justify-content-center align-items-center mt-2">
                                                                                            <div className="col-md-3">
                                                                                                <div>Téléphone</div>
                                                                                            </div>
                                                                                            <div className="col-md-8">
                                                                                                <input
                                                                                                    className="form-control"
                                                                                                    type="text"
                                                                                                    id="nom"
                                                                                                    name="nom"
                                                                                                    value={this.state.selectedSociete.mondat ? this.state.selectedSociete.mondat.pcp_phone || "" : ""}
                                                                                                    onChange={this.handleObjectChange("selectedSociete", "mondat", "pcp_phone")}
                                                                                                />
                                                                                            </div>

                                                                                        </div>
                                                                                        <div
                                                                                            className="row justify-content-center align-items-center mt-2">
                                                                                            <div className="col-md-3">
                                                                                                <div>Adresse</div>
                                                                                            </div>
                                                                                            <div className="col-md-8">
                                                                                                <textarea
                                                                                                    className="form-control"
                                                                                                    id="Adresse"
                                                                                                    name="Adresse"
                                                                                                    value={this.state.selectedSociete.mondat ? this.state.selectedSociete.mondat.pcp_adress || "" : ""}
                                                                                                    onChange={this.handleObjectChange("selectedSociete", "mondat", "pcp_adress")}
                                                                                                />
                                                                                            </div>

                                                                                        </div>

                                                                                    </div>
                                                                                    <div className="col-md-4">
                                                                                        <div>
                                                                                            <h6>Personne en charge pour
                                                                                                les réglements </h6>
                                                                                        </div>
                                                                                        <div
                                                                                            className="row justify-content-center align-items-center mt-2">
                                                                                            <div className="col-md-3">
                                                                                                <div>Prénom</div>
                                                                                            </div>
                                                                                            <div className="col-md-8">
                                                                                                <input
                                                                                                    className="form-control"
                                                                                                    type="text"
                                                                                                    id="nom"
                                                                                                    name="nom"
                                                                                                    value={this.state.selectedSociete.mondat ? this.state.selectedSociete.mondat.pcr_prenom || "" : ""}
                                                                                                    onChange={this.handleObjectChange("selectedSociete", "mondat", "pcr_prenom")}

                                                                                                />

                                                                                            </div>

                                                                                        </div>
                                                                                        <div
                                                                                            className="row justify-content-center align-items-center mt-2">
                                                                                            <div className="col-md-3">
                                                                                                <div>Nom</div>
                                                                                            </div>
                                                                                            <div className="col-md-8">
                                                                                                <input
                                                                                                    className="form-control"
                                                                                                    type="text"
                                                                                                    id="nom"
                                                                                                    name="nom"
                                                                                                    value={this.state.selectedSociete.mondat ? this.state.selectedSociete.mondat.pcr_nom || "" : ""}
                                                                                                    onChange={this.handleObjectChange("selectedSociete", "mondat", "pcr_nom")}
                                                                                                />
                                                                                            </div>

                                                                                        </div>
                                                                                        <div
                                                                                            className="row justify-content-center align-items-center mt-2">
                                                                                            <div className="col-md-3">
                                                                                                <div>Email</div>
                                                                                            </div>
                                                                                            <div className="col-md-8">
                                                                                                <input
                                                                                                    className="form-control"
                                                                                                    type="text"
                                                                                                    id="nom"
                                                                                                    name="nom"
                                                                                                    value={this.state.selectedSociete.mondat ? this.state.selectedSociete.mondat.pcr_email || "" : ""}
                                                                                                    onChange={this.handleObjectChange("selectedSociete", "mondat", "pcr_email")}
                                                                                                />
                                                                                            </div>

                                                                                        </div>
                                                                                        <div
                                                                                            className="row justify-content-center align-items-center mt-2">
                                                                                            <div className="col-md-3">
                                                                                                <div>Téléphone</div>
                                                                                            </div>
                                                                                            <div className="col-md-8">
                                                                                                <input
                                                                                                    className="form-control"
                                                                                                    type="text"
                                                                                                    id="nom"
                                                                                                    name="nom"
                                                                                                    value={this.state.selectedSociete.mondat ? this.state.selectedSociete.mondat.pcr_phone || "" : ""}
                                                                                                    onChange={this.handleObjectChange("selectedSociete", "mondat", "pcr_phone")}
                                                                                                />
                                                                                            </div>

                                                                                        </div>
                                                                                        <div
                                                                                            className="row justify-content-center align-items-center mt-2">
                                                                                            <div className="col-md-3">
                                                                                                <div>Adresse</div>
                                                                                            </div>
                                                                                            <div className="col-md-8">
                                                                                                <textarea
                                                                                                    className="form-control"
                                                                                                    id="Adresse"
                                                                                                    name="Adresse"
                                                                                                    value={this.state.selectedSociete.mondat ? this.state.selectedSociete.mondat.pcr_adress || "" : ""}
                                                                                                    onChange={this.handleObjectChange("selectedSociete", "mondat", "pcr_adress")}
                                                                                                />
                                                                                            </div>

                                                                                        </div>

                                                                                    </div>
                                                                                    <div className="col-md-4">

                                                                                        <div>
                                                                                            <h6>Autre parties</h6>
                                                                                            <input
                                                                                                className="form-control"
                                                                                                type="text"
                                                                                                id="nom"
                                                                                                name="nom"
                                                                                                value={this.state.selectedSociete.mondat ? this.state.selectedSociete.mondat.autrePartie || "" : ""}
                                                                                                onChange={this.handleObjectChange("selectedSociete", "mondat", "autrePartie")}
                                                                                            />

                                                                                        </div>
                                                                                        <div className="mt-3">
                                                                                            <h6>Contrepartie </h6>
                                                                                            <input
                                                                                                className="form-control"
                                                                                                type="text"
                                                                                                id="nom"
                                                                                                name="nom"
                                                                                                value={this.state.selectedSociete.mondat ? this.state.selectedSociete.mondat.autrePartie || "" : ""}
                                                                                                onChange={this.handleObjectChange("selectedSociete", "mondat", "autrePartie")}
                                                                                            />
                                                                                        </div>
                                                                                        <div className="mt-3">
                                                                                            <h6>Apporteur </h6>
                                                                                            <select
                                                                                                className="form-control custom-select"
                                                                                                style={{width: "80%"}}
                                                                                                value={this.state.selectedSociete.mondat ? this.state.selectedSociete.mondat.apporteur || "" : ""}
                                                                                                onChange={this.handleObjectChange("selectedSociete", "mondat", "apporteur")}
                                                                                            >
                                                                                                <option
                                                                                                    value={""}>{""}</option>
                                                                                                <option
                                                                                                    value={"Site web"}>Site
                                                                                                    web
                                                                                                </option>
                                                                                                <option
                                                                                                    value={"Autre avocat"}>Autre
                                                                                                    avocat
                                                                                                </option>
                                                                                                <option
                                                                                                    value={"Personne tierce"}>Personne
                                                                                                    tierce
                                                                                                </option>

                                                                                            </select>
                                                                                        </div>


                                                                                    </div>

                                                                                </div>
                                                                                <hr style={{
                                                                                    width: "100%",
                                                                                    height: 2,
                                                                                    backgroundColor: "#a6a6a6",
                                                                                    marginTop: 25,
                                                                                    marginBottom: 25
                                                                                }}/>

                                                                                <div>
                                                                                    <h5>Facturation</h5>
                                                                                    <div
                                                                                        className="row align-items-center">
                                                                                        <div className="col-md-4">
                                                                                            <div>Collaborateur-Lead</div>
                                                                                            <div>
                                                                                                <MuiSelect
                                                                                                    labelId="demo-simple-select-label"
                                                                                                    id="demo-simple-select"
                                                                                                    style={{width: "80%"}}
                                                                                                    onChange={(e) => {
                                                                                                        let obj = this.state.selectedSociete;
                                                                                                        let container = obj["facturation"] || {};
                                                                                                        container.collaborateur_lead = e.target.value;
                                                                                                        obj["facturation"] = container;
                                                                                                        this.setState({selectedSociete: obj})
                                                                                                    }}
                                                                                                    value={this.state.selectedSociete.facturation ? this.state.selectedSociete.facturation.collaborateur_lead : ""}

                                                                                                >
                                                                                                    {this.state.contacts.map((contact, key) => (
                                                                                                        <MenuItem
                                                                                                            key={key}
                                                                                                            value={contact.email}>
                                                                                                            <div
                                                                                                                className="row align-items-center justify-content-center">
                                                                                                                <Avatar
                                                                                                                    alt=""
                                                                                                                    src={contact.imageUrl}/>
                                                                                                                <div>{contact.nom + " " + contact.prenom}</div>
                                                                                                            </div>
                                                                                                        </MenuItem>
                                                                                                    ))}
                                                                                                </MuiSelect>
                                                                                            </div>

                                                                                        </div>
                                                                                        <div className="col-md-5">
                                                                                            <div>
                                                                                                Collaborateur-Team
                                                                                            </div>
                                                                                            <div>

                                                                                                <MuiSelect
                                                                                                    labelId="demo-mutiple-chip-label-1542"
                                                                                                    id="demo-mutiple-chip-1542"
                                                                                                    multiple
                                                                                                    style={{width: "100%"}}
                                                                                                    onChange={(e) => {
                                                                                                        let obj = this.state.selectedSociete;
                                                                                                        let container = obj["facturation"] || {};
                                                                                                        container.collaborateur_team = e.target.value;
                                                                                                        obj["facturation"] = container;
                                                                                                        this.setState({selectedSociete: obj})
                                                                                                    }}
                                                                                                    value={this.state.selectedSociete.facturation ? this.state.selectedSociete.facturation.collaborateur_team || [] : []}
                                                                                                    input={<Input
                                                                                                        id="select-multiple-chip"/>}
                                                                                                    renderValue={(selected) => (
                                                                                                        <div style={{
                                                                                                            display: "flex",
                                                                                                            flexWrap: "wrap"
                                                                                                        }}>
                                                                                                            {selected.map((value, key) => (
                                                                                                                <Chip
                                                                                                                    key={key}
                                                                                                                    label={value.email}
                                                                                                                    style={{margin: 2}}
                                                                                                                    avatar={
                                                                                                                        <Avatar
                                                                                                                            alt=""
                                                                                                                            src={value.imageUrl || null}/>}
                                                                                                                />
                                                                                                            ))}
                                                                                                        </div>
                                                                                                    )}
                                                                                                    MenuProps={Data.MenuProps}
                                                                                                >
                                                                                                    {this.state.contacts.map((contact, key) => (
                                                                                                        <MenuItem
                                                                                                            key={key}
                                                                                                            value={contact}>
                                                                                                            <div
                                                                                                                className="row align-items-center justify-content-center">
                                                                                                                <Avatar
                                                                                                                    alt=""
                                                                                                                    src={contact.imageUrl}/>
                                                                                                                <div>{contact.nom + " " + contact.prenom}</div>
                                                                                                            </div>
                                                                                                        </MenuItem>
                                                                                                    ))}
                                                                                                </MuiSelect>
                                                                                            </div>

                                                                                        </div>
                                                                                        <div className="col-md-3">
                                                                                            <div>Taux Horaire
                                                                                                collaborateur -B
                                                                                            </div>

                                                                                            <input
                                                                                                className="form-control"
                                                                                                type="text"
                                                                                                id="nom"
                                                                                                name="nom"
                                                                                                value={this.state.selectedSociete.facturation ? this.state.selectedSociete.facturation.tauxHoraireCollab || "" : ""}
                                                                                                onChange={this.handleObjectChange("selectedSociete", "facturation", "tauxHoraireCollab")}
                                                                                            />

                                                                                        </div>

                                                                                    </div>
                                                                                </div>
                                                                                <div className="mt-4">
                                                                                    <h5>FACTURATION-CLIENT</h5>
                                                                                    <div
                                                                                        className="row align-items-center">
                                                                                        <div className="col-md-4">
                                                                                            <div
                                                                                                className="row justify-content-center align-items-center">
                                                                                                <div
                                                                                                    className="col-md-4">
                                                                                                    <div>Par eMail</div>
                                                                                                </div>
                                                                                                <div
                                                                                                    className="col-md-8">
                                                                                                    <CB color="primary"
                                                                                                        checked={this.state.mondat.facturationClient.parEmail || false}
                                                                                                        onChange={(e) => {
                                                                                                            let d = this.state.mondat
                                                                                                            d.facturationClient.parEmail = !this.state.mondat.facturationClient.parEmail
                                                                                                            this.setState({mondat: d})
                                                                                                        }}
                                                                                                    />
                                                                                                </div>


                                                                                            </div>
                                                                                            <div
                                                                                                className="row justify-content-center align-items-center">

                                                                                                <div
                                                                                                    className="col-md-4">
                                                                                                    <div>Par courrier
                                                                                                    </div>
                                                                                                </div>
                                                                                                <div
                                                                                                    className="col-md-8">
                                                                                                    <CB color="primary"
                                                                                                        checked={this.state.mondat.facturationClient.parCourrier || false}
                                                                                                        onChange={(e) => {
                                                                                                            let d = this.state.mondat
                                                                                                            d.facturationClient.parCourrier = !this.state.mondat.facturationClient.parCourrier
                                                                                                            this.setState({mondat: d})
                                                                                                        }}/>
                                                                                                </div>


                                                                                            </div>
                                                                                            <div
                                                                                                className="row justify-content-center align-items-center">

                                                                                                <div
                                                                                                    className="col-md-4">
                                                                                                    <div>Fréquence</div>
                                                                                                </div>
                                                                                                <div
                                                                                                    className="col-md-8">
                                                                                                    <MuiSelect
                                                                                                        labelId="demo-simple-select-label"
                                                                                                        id="demo-simple-select"
                                                                                                        style={{width: "100%"}}
                                                                                                        value={this.state.mondat.facturationClient.frequence}
                                                                                                        onChange={(e) => {
                                                                                                            let d = this.state.mondat
                                                                                                            d.facturationClient.frequence = e.target.value
                                                                                                            this.setState({mondat: d})
                                                                                                        }}

                                                                                                    >
                                                                                                        <MenuItem
                                                                                                            value={"mission"}>Par
                                                                                                            mission</MenuItem>
                                                                                                        <MenuItem
                                                                                                            value={"Mensuellement"}>Mensuellement</MenuItem>
                                                                                                        <MenuItem
                                                                                                            value={"Quarter"}>Quarter</MenuItem>
                                                                                                        <MenuItem
                                                                                                            value={"Annuellement"}>Annuellement</MenuItem>
                                                                                                    </MuiSelect>
                                                                                                </div>

                                                                                            </div>


                                                                                        </div>
                                                                                        <div className="col-md-4">


                                                                                            <div
                                                                                                className="row justify-content-center align-items-center">

                                                                                                <div
                                                                                                    className="col-md-6">
                                                                                                    <div>Envoyé par le
                                                                                                        secrétariat
                                                                                                    </div>
                                                                                                </div>
                                                                                                <div
                                                                                                    className="col-md-6">
                                                                                                    <CB color="primary"
                                                                                                        checked={this.state.mondat.facturationClient.EnvoyeParSecretariat || false}
                                                                                                        onChange={(e) => {
                                                                                                            let d = this.state.mondat
                                                                                                            d.facturationClient.EnvoyeParSecretariat = !this.state.mondat.facturationClient.EnvoyeParSecretariat
                                                                                                            this.setState({mondat: d})
                                                                                                        }}/>
                                                                                                </div>


                                                                                            </div>
                                                                                            <div
                                                                                                className="row justify-content-center align-items-center">

                                                                                                <div
                                                                                                    className="col-md-6">
                                                                                                    <div>Envoyé par
                                                                                                        l’avocat
                                                                                                    </div>
                                                                                                </div>
                                                                                                <div
                                                                                                    className="col-md-6">
                                                                                                    <CB color="primary"
                                                                                                        checked={this.state.mondat.facturationClient.EnvoyeAvocat || false}
                                                                                                        onChange={(e) => {
                                                                                                            let d = this.state.mondat
                                                                                                            d.facturationClient.EnvoyeAvocat = !this.state.mondat.facturationClient.EnvoyeAvocat
                                                                                                            this.setState({mondat: d})
                                                                                                        }}/>
                                                                                                </div>


                                                                                            </div>
                                                                                            <div
                                                                                                className="row justify-content-center align-items-center">

                                                                                                <div
                                                                                                    className="col-md-6">
                                                                                                    <div>Langue de
                                                                                                        Facturation
                                                                                                    </div>
                                                                                                </div>
                                                                                                <div
                                                                                                    className="col-md-6">
                                                                                                    <MuiSelect
                                                                                                        labelId="demo-simple-select-label"
                                                                                                        id="demo-simple-select"
                                                                                                        style={{width: "100%"}}
                                                                                                        value={this.state.mondat.facturationClient.LangueFacturation}
                                                                                                        onChange={(e) => {
                                                                                                            let d = this.state.mondat
                                                                                                            d.facturationClient.LangueFacturation = e.target.value
                                                                                                            this.setState({mondat: d})
                                                                                                        }}

                                                                                                    >
                                                                                                        <MenuItem
                                                                                                            value={"Français"}>Français</MenuItem>
                                                                                                        <MenuItem
                                                                                                            value={"Anglais"}>Anglais</MenuItem>

                                                                                                    </MuiSelect>
                                                                                                </div>


                                                                                            </div>
                                                                                            <div
                                                                                                className="row justify-content-center align-items-center">

                                                                                                <div
                                                                                                    className="col-md-6">
                                                                                                    <div>Mode ( à
                                                                                                        envoyer par qui
                                                                                                        )
                                                                                                    </div>
                                                                                                </div>
                                                                                                <div
                                                                                                    className="col-md-6">
                                                                                                    <MuiSelect
                                                                                                        labelId="demo-simple-select-label"
                                                                                                        id="demo-simple-select"
                                                                                                        style={{width: "100%"}}
                                                                                                        value={this.state.mondat.facturationClient.Mode}
                                                                                                        onChange={(e) => {
                                                                                                            let d = this.state.mondat
                                                                                                            d.facturationClient.Mode = e.target.value
                                                                                                            this.setState({mondat: d})
                                                                                                        }}


                                                                                                    >
                                                                                                        <MenuItem
                                                                                                            value={"Sécretaria"}>Sécretariat</MenuItem>
                                                                                                        <MenuItem
                                                                                                            value={"Associé"}>Associé</MenuItem>
                                                                                                        <MenuItem
                                                                                                            value={"Collaborateur"}>Collaborateur</MenuItem>

                                                                                                    </MuiSelect>
                                                                                                </div>

                                                                                            </div>
                                                                                        </div>

                                                                                    </div>
                                                                                    {/*<div className="row justify-content-end">
                                                                                        <div>
                                                                                            <BT variant="contained" color="primary">
                                                                                                Enregistrer
                                                                                            </BT>

                                                                                        </div>
                                                                                    </div>*/}
                                                                                </div>
                                                                            </TabPanel>


                                                                        </Tabs>
                                                                    </div>
                                                                </div>
                                                            </div>

                                                        </div>

                                                    </div> : null
                                        }

                                        {
                                            this.state.showContainerSection === "TimeSheet" &&
                                            <div>
                                                {this.state.selectedTimeSheetMenuItem[0] === "activities" ?
                                                    <div>
                                                        <div className="row">
                                                            <div className="col-lg-12">
                                                                {/*<div style={{textAlign: "right"}}>
                                                                    <button onClick={() => this.setState({
                                                                        editSocieteForm: false,
                                                                        showContainerSection: "Societe"
                                                                    })}
                                                                            className="btn btn-sm btn-outline-info">Retour
                                                                    </button>
                                                                </div>*/}
                                                                <div className="card-box text-center"
                                                                     style={{marginTop: 1}}>


                                                                    <div style={{marginTop: 30}} className="text-left">
                                                                        <Tabs>
                                                                            <TabList>
                                                                                <Tab>New time Entree </Tab>
                                                                                <Tab>List imputation </Tab>
                                                                                {
                                                                                    localStorage.getItem("role") === "admin" &&
                                                                                        [
                                                                                            <Tab key={0}>Imputation client </Tab>,
                                                                                            <Tab key={1}>Imputation team & scheduled time </Tab>,
                                                                                            <Tab key={2}>New Expenses </Tab>
                                                                                        ]
                                                                                }

                                                                            </TabList>

                                                                            <TabPanel>
                                                                                {
                                                                                    this.state.showLignesFactureClient === false ?
                                                                                        <div>
                                                                                            <div className="row mt-2">
                                                                                                <div
                                                                                                    className="col-md-6">
                                                                                                    <h5>Durée</h5>
                                                                                                    <div
                                                                                                        className="row">
                                                                                                        <div className="col-md-5">
                                                                                                            <Autosuggest
                                                                                                                suggestions={this.state.timeSuggestions}
                                                                                                                onSuggestionsFetchRequested={this.onTimeSuggestionsFetchRequested}
                                                                                                                onSuggestionsClearRequested={this.onTimeSuggestionsClearRequested}
                                                                                                                onSuggestionSelected={(event,{suggestion}) => console.log(suggestion)}
                                                                                                                getSuggestionValue={suggestion => suggestion}
                                                                                                                renderSuggestion={suggestion => (<div>{suggestion}</div>)}
                                                                                                                inputProps={inputSuggProps}
                                                                                                            />
                                                                                                        </div>
                                                                                                        <div
                                                                                                            className="col-md-7">

                                                                                                            <div
                                                                                                                style={{display: "flex"}}>
                                                                                                                <Timer
                                                                                                                    initialTime={0}
                                                                                                                    startImmediately={false}
                                                                                                                >
                                                                                                                    {({start, resume, pause, stop, reset, getTimerState, getTime}) => (
                                                                                                                        <React.Fragment>
                                                                                                                            <div
                                                                                                                                align="center"
                                                                                                                                style={{
                                                                                                                                    backgroundColor: "#c0c0c0",
                                                                                                                                    padding: 8,
                                                                                                                                    color: "#000",
                                                                                                                                    height: 36,
                                                                                                                                    fontWeight: 700,
                                                                                                                                    fontSize: 16,
                                                                                                                                    letterSpacing:"0.1rem"
                                                                                                                                }}>
                                                                                                                                <Timer.Hours formatValue={(value) => `${(value < 10 ? `0${value}` : value)}h:`}/>
                                                                                                                                <Timer.Minutes formatValue={(value) => `${(value < 10 ? `0${value}` : value)}m:`}/>
                                                                                                                                <Timer.Seconds formatValue={(value) => `${(value < 10 ? `0${value}` : value)}s`}/>
                                                                                                                            </div>
                                                                                                                            <div
                                                                                                                                style={{marginLeft: 10}}>
                                                                                                                                <div
                                                                                                                                    align="center"
                                                                                                                                    style={{
                                                                                                                                        backgroundColor: (getTimerState() === "STOPPED" ||getTimerState() === "INITED") ? "green":"red",
                                                                                                                                        padding: 5,
                                                                                                                                        borderRadius: 10,
                                                                                                                                        width: 50,
                                                                                                                                        color: "#fff",
                                                                                                                                        fontWeight: 700,
                                                                                                                                        cursor: "pointer"
                                                                                                                                    }}

                                                                                                                                    onClick={() => {
                                                                                                                                        if(getTimerState() === "STOPPED" || getTimerState() === "INITED"){
                                                                                                                                            start()
                                                                                                                                        }else{
                                                                                                                                            let timeEtablished = getTime()
                                                                                                                                            console.log(timeEtablished)
                                                                                                                                            let timeH = ((timeEtablished / 1000) / 60) / 60;
                                                                                                                                            console.log(timeH)
                                                                                                                                            let obj = this.state.TimeSheet;
                                                                                                                                            obj.newTime.duree = timeH.toFixed(3).replace(".",":")
                                                                                                                                            this.setState({TimeSheet: obj})
                                                                                                                                            stop()
                                                                                                                                        }
                                                                                                                                    }}
                                                                                                                                >
                                                                                                                                    {(getTimerState() === "STOPPED" ||getTimerState() === "INITED") ? "Start":"Stop"}
                                                                                                                                </div>
                                                                                                                                <div
                                                                                                                                    align="center"
                                                                                                                                    style={{
                                                                                                                                        backgroundColor: "#c0c0c0",
                                                                                                                                        padding: 5,
                                                                                                                                        borderRadius: 10,
                                                                                                                                        width: 50,
                                                                                                                                        color: "#fff",
                                                                                                                                        fontWeight: 700,
                                                                                                                                        cursor: "pointer",
                                                                                                                                        marginTop: 3
                                                                                                                                    }}
                                                                                                                                    onClick={() => {
                                                                                                                                        let obj = this.state.TimeSheet;
                                                                                                                                        obj.newTime.duree = "";
                                                                                                                                        this.setState({TimeSheet: obj})
                                                                                                                                        reset()
                                                                                                                                    }}
                                                                                                                                >
                                                                                                                                    Reset
                                                                                                                                </div>
                                                                                                                            </div>

                                                                                                                        </React.Fragment>
                                                                                                                    )}
                                                                                                                </Timer>
                                                                                                            </div>

                                                                                                        </div>
                                                                                                    </div>
                                                                                                </div>
                                                                                                <div
                                                                                                    className="col-md-4">
                                                                                                    <div>
                                                                                                        <h5>identification
                                                                                                            / Imputation
                                                                                                            client</h5>
                                                                                                        <div
                                                                                                            style={{display: "flex"}}>
                                                                                                            <SelectSearch
                                                                                                                options={
                                                                                                                    this.state.annuaire_clients_mondat.map(({ContactType, ContactName, imageUrl}) =>
                                                                                                                        ({
                                                                                                                            value: ContactName,
                                                                                                                            name: ContactName,
                                                                                                                            ContactType: ContactType,
                                                                                                                            ContactName: ContactName,
                                                                                                                            imageUrl: imageUrl
                                                                                                                        }))
                                                                                                                }
                                                                                                                value={this.state.selectedClientTimeEntree}
                                                                                                                renderOption={renderSearchOption}
                                                                                                                search
                                                                                                                placeholder="Chercher votre client"
                                                                                                                onChange={e => {
                                                                                                                    //console.log(e)
                                                                                                                    let obj = this.state.TimeSheet;
                                                                                                                    obj.newTime.client = e;
                                                                                                                    let find_annuaire_fact_lead = this.state.annuaire_clients_mondat.find(x => x.ContactName === e);
                                                                                                                    console.log(find_annuaire_fact_lead)
                                                                                                                    let partner_email = find_annuaire_fact_lead ? find_annuaire_fact_lead.facturation ? find_annuaire_fact_lead.facturation.collaborateur_lead : "" : "";
                                                                                                                    console.log(partner_email)
                                                                                                                    this.setState({
                                                                                                                        partnerFacture:partner_email,
                                                                                                                        selectedClientTimeEntree: e,
                                                                                                                        TimeSheet: obj
                                                                                                                    })
                                                                                                                }}
                                                                                                            />
                                                                                                            <IconButton
                                                                                                                style={{marginTop: -5}}
                                                                                                                onClick={() => this.setState({openAdvancedSearchModal: true})}>
                                                                                                                <SearchIcon/>
                                                                                                            </IconButton>
                                                                                                        </div>

                                                                                                    </div>

                                                                                                </div>

                                                                                            </div>
                                                                                            <div className="row mt-3">
                                                                                                <div
                                                                                                    className="col-md-4">
                                                                                                    <div>
                                                                                                        <h5>Catégorie d’activités </h5>
                                                                                                        <MuiSelect
                                                                                                            labelId="demo-simple-select-label"
                                                                                                            id="demo-simple-select"
                                                                                                            style={{width: "100%"}}
                                                                                                            value={this.state.TimeSheet.newTime.categoriesActivite}
                                                                                                            onChange={(e) => {
                                                                                                                let d = this.state.TimeSheet
                                                                                                                d.newTime.categoriesActivite = e.target.value
                                                                                                                this.setState({TimeSheet: d})
                                                                                                            }}
                                                                                                        >
                                                                                                            <MenuItem
                                                                                                                value={"Temps facturé"}>Temps facturé</MenuItem>
                                                                                                            <MenuItem
                                                                                                                value={"Paiement avancée"}>Provision</MenuItem>
                                                                                                        </MuiSelect>
                                                                                                    </div>

                                                                                                </div>
                                                                                                <div className="col-md-4">
                                                                                                    <div
                                                                                                        style={{width: "100%"}}>
                                                                                                        <h5>Date</h5>
                                                                                                        <DatePicker

                                                                                                            calendarIcon={
                                                                                                                <img
                                                                                                                    src={calendar}
                                                                                                                    style={{width: 20}}/>}
                                                                                                            onChange={(e) => {
                                                                                                                let d = this.state.TimeSheet
                                                                                                                d.newTime.date = e
                                                                                                                this.setState({TimeSheet: d})
                                                                                                            }}
                                                                                                            value={this.state.TimeSheet.newTime.date}
                                                                                                        />

                                                                                                    </div>

                                                                                                </div>

                                                                                            </div>
                                                                                            <div className="row mt-3">
                                                                                                <div
                                                                                                    className="col-md-4">
                                                                                                    <div>
                                                                                                        <div>
                                                                                                            <h5>Description</h5>
                                                                                                        </div>
                                                                                                        <textarea
                                                                                                            className="form-control "
                                                                                                            id="duree"
                                                                                                            style={{width: "100%"}}
                                                                                                            name="duree"
                                                                                                            rows={5}
                                                                                                            value={this.state.TimeSheet.newTime.description}
                                                                                                            onChange={(e) => {
                                                                                                                let d = this.state.TimeSheet
                                                                                                                d.newTime.description = e.target.value
                                                                                                                this.setState({TimeSheet: d})
                                                                                                            }}/>
                                                                                                    </div>
                                                                                                </div>
                                                                                                <div
                                                                                                    className="col-md-4">
                                                                                                    <div>
                                                                                                        <h6>Utilisateur chez OA </h6>
                                                                                                    </div>

                                                                                                    <RSelect
                                                                                                        defaultValue={this.state.TimeSheet.newTime.utilisateurOA}
                                                                                                        options={contactSelectOptions}
                                                                                                        closeMenuOnSelect={true}
                                                                                                        isMulti={false}
                                                                                                        hideSelectedOptions={true}
                                                                                                        styles={{
                                                                                                            container: (provided, state) => ({
                                                                                                                ...provided,
                                                                                                                width:300
                                                                                                            }),
                                                                                                            menuPortal: styles => ({ ...styles, zIndex: 9999 })
                                                                                                        }}
                                                                                                        menuPortalTarget={document.body}
                                                                                                        onChange={(e) => {
                                                                                                            console.log(e.value)
                                                                                                            let d = this.state.TimeSheet
                                                                                                            d.newTime.utilisateurOA = e.value;
                                                                                                            let OA_contacts = this.state.contacts;
                                                                                                            let OA_contact="";
                                                                                                            OA_contacts.map((contact,key) => {
                                                                                                                if(contact && contact.email && contact.email === e.value){
                                                                                                                    OA_contact = contact
                                                                                                                }
                                                                                                            })
                                                                                                            d.newTime.rateFacturation = OA_contact.rateFacturation || ""
                                                                                                            this.setState({TimeSheet: d})
                                                                                                        }}
                                                                                                    />

                                                                                                    <div className="mt-3">
                                                                                                        <h6>
                                                                                                            Rate de facturation
                                                                                                        </h6>
                                                                                                        <Input
                                                                                                            className="form-control "
                                                                                                            id="duree"
                                                                                                            style={{width: "100%"}}
                                                                                                            name="duree"
                                                                                                            type="text"
                                                                                                            endAdornment={
                                                                                                                <InputAdornment
                                                                                                                    position="end">CHF:Hr</InputAdornment>}

                                                                                                            value={this.state.TimeSheet.newTime.rateFacturation + ""}
                                                                                                            onChange={(e) => {
                                                                                                                let d = this.state.TimeSheet
                                                                                                                d.newTime.rateFacturation = e.target.value
                                                                                                                this.setState({TimeSheet: d})
                                                                                                            }}/>
                                                                                                    </div>
                                                                                                </div>

                                                                                            </div>
                                                                                            <div align="center"
                                                                                                 className=" mt-4">
                                                                                                <AltButtonGroup>
                                                                                                    <AtlButton
                                                                                                        onClick={() => {

                                                                                                            let obj = this.state.TimeSheet;
                                                                                                            let utili_OA_copy = obj.newTime.utilisateurOA;
                                                                                                            let time = obj.newTime.duree;
                                                                                                            let timeFormated = ""
                                                                                                            if(time.indexOf(":") > -1 ){
                                                                                                                timeFormated = parseFloat(time.replace(":","."));
                                                                                                            }else if(time.indexOf(".") > -1){
                                                                                                                timeFormated = parseFloat(time)
                                                                                                            }else if(time.indexOf(":") === -1 && time.indexOf(".") === -1){
                                                                                                                timeFormated = parseInt(time);
                                                                                                            }
                                                                                                            else{
                                                                                                                this.openSnackbar("error","Le format de la durée est invalide !")
                                                                                                            }
                                                                                                            if((typeof timeFormated) !== "number" || isNaN(timeFormated)){
                                                                                                                this.openSnackbar("error","Le format de la durée est invalide !")
                                                                                                            }else{
                                                                                                                obj.newTime.duree = timeFormated;
                                                                                                                let lignes_fact = this.state.lignesFactures || [];

                                                                                                                SmartService.create_company(localStorage.getItem("token"),localStorage.getItem("usrtoken"),{param:{name:obj.newTime.client}}).then(newCompRes => {
                                                                                                                    obj.newTime.company_id = newCompRes.data.id;
                                                                                                                    obj.uid = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
                                                                                                                    obj.user_email = localStorage.getItem("email");
                                                                                                                    lignes_fact.push(obj);

                                                                                                                    this.setState({
                                                                                                                        lignesFactures: lignes_fact,
                                                                                                                        TimeSheet: {
                                                                                                                            newTime: {
                                                                                                                                duree: "",
                                                                                                                                client: obj.newTime.client,
                                                                                                                                categoriesActivite: "Temps facturé",
                                                                                                                                description: "",
                                                                                                                                date: new Date(),
                                                                                                                                utilisateurOA: obj.newTime.utilisateurOA,
                                                                                                                                rateFacturation: obj.newTime.rateFacturation,
                                                                                                                            }
                                                                                                                        }
                                                                                                                    })

                                                                                                                    this.updateLignes_facture(lignes_fact)
                                                                                                                    this.openSnackbar("success", "Enregistrement effectué avec succès")


                                                                                                                }).catch(err => {
                                                                                                                    console.log(err)
                                                                                                                })
                                                                                                            }

                                                                                                        }}
                                                                                                        appearance="primary"
                                                                                                        isDisabled={this.state.TimeSheet.newTime.duree === "" || this.state.TimeSheet.newTime.description === "" || this.state.TimeSheet.newTime.rateFacturation === "" || this.state.TimeSheet.newTime.client === ""}
                                                                                                        style={{margin: 20}}>
                                                                                                        Enregistrer
                                                                                                    </AtlButton>
                                                                                                    <AtlButton
                                                                                                        appearance=""
                                                                                                        style={{margin: 20}}>Enregistrer et créer une autre</AtlButton>
                                                                                                    <AtlButton
                                                                                                        appearance=""
                                                                                                        style={{margin: 20}}>Enregistrer & dupliquer</AtlButton>
                                                                                                    <AtlButton
                                                                                                        appearance=""
                                                                                                        style={{margin: 20}}
                                                                                                        onClick={() => {
                                                                                                            this.setState({
                                                                                                                TimeSheet: {
                                                                                                                    newTime: {
                                                                                                                        duree: "",
                                                                                                                        client: "",
                                                                                                                        categoriesActivite: "",
                                                                                                                        description: "",
                                                                                                                        date: new Date(),
                                                                                                                        utilisateurOA: "",
                                                                                                                        rateFacturation: "",
                                                                                                                    }
                                                                                                                }
                                                                                                            })
                                                                                                        }}>Annuler</AtlButton>
                                                                                                </AltButtonGroup>
                                                                                                <div>
                                                                                                    <AltButtonGroup
                                                                                                        style={{marginTop: 10}}>
                                                                                                        <AtlButton
                                                                                                            appearance=""
                                                                                                            onClick={() => this.setState({showLignesFactureClient: true})}>Etablir facture</AtlButton>
                                                                                                        <AtlButton
                                                                                                            appearance="">Histo.Fact.Clients</AtlButton>
                                                                                                    </AltButtonGroup>
                                                                                                </div>

                                                                                            </div>
                                                                                        </div> :

                                                                                        <div>
                                                                                            <div className="mt-1">
                                                                                                <div>
                                                                                                    <div style={{textAlign: "right",marginTop:15}}>
                                                                                                        <button onClick={() => this.setState({
                                                                                                            showLignesFactureClient: false
                                                                                                        })}
                                                                                                                className="btn btn-sm btn-outline-info">Retour
                                                                                                        </button>
                                                                                                    </div>
                                                                                                    {/*<IconButton
                                                                                                        onClick={() => this.setState({showLignesFactureClient: false})}>
                                                                                                        <ArrowBackIcon/>
                                                                                                    </IconButton>*/}
                                                                                                    <div className="row mt-3">
                                                                                                        <div className="col-md-6">
                                                                                                            <h5>identification / Imputation client</h5>
                                                                                                            <div
                                                                                                                style={{display: "flex"}}>
                                                                                                                <SelectSearch
                                                                                                                    options={
                                                                                                                        this.state.annuaire_clients_mondat.map(({PrimaryEmailAddress, ContactType, ContactName, imageUrl}) =>
                                                                                                                            ({
                                                                                                                                value: ContactName,
                                                                                                                                name: ContactName,
                                                                                                                                ContactType: ContactType,
                                                                                                                                ContactName: ContactName,
                                                                                                                                imageUrl: imageUrl
                                                                                                                            }))
                                                                                                                    }
                                                                                                                    value={this.state.selectedClientTimeEntree}
                                                                                                                    renderOption={renderSearchOption}
                                                                                                                    search
                                                                                                                    placeholder="Chercher votre client"
                                                                                                                    onChange={ e => {
                                                                                                                        console.log(e)
                                                                                                                        let obj = this.state.TimeSheet;
                                                                                                                        obj.newTime.client = e;

                                                                                                                        let find_annuaire_fact_lead = this.state.annuaire_clients_mondat.find(x => x.ContactName === e);
                                                                                                                        console.log(find_annuaire_fact_lead)
                                                                                                                        let partner_email = find_annuaire_fact_lead ? find_annuaire_fact_lead.facturation ? find_annuaire_fact_lead.facturation.collaborateur_lead : "" : "";
                                                                                                                        console.log(partner_email)
                                                                                                                        this.setState({
                                                                                                                            partnerFacture:partner_email,
                                                                                                                            selectedClientTimeEntree: e,
                                                                                                                            TimeSheet: obj
                                                                                                                        })
                                                                                                                    }}
                                                                                                                />
                                                                                                                <IconButton
                                                                                                                    style={{marginTop: -5}}
                                                                                                                    onClick={() => this.setState({openAdvancedSearchModal: true})}>
                                                                                                                    <SearchIcon/>
                                                                                                                </IconButton>
                                                                                                            </div>
                                                                                                        </div>
                                                                                                        <div className="col-md-4">
                                                                                                            <div
                                                                                                                style={{width: "100%"}}>
                                                                                                                <h5>Date de la facture</h5>
                                                                                                                <DatePicker
                                                                                                                    calendarIcon={
                                                                                                                        <img alt=""
                                                                                                                             src={calendar}
                                                                                                                             style={{width: 20}}/>}
                                                                                                                    onChange={(e) => {
                                                                                                                        this.setState({dateFacture: e})
                                                                                                                    }}
                                                                                                                    value={this.state.dateFacture}
                                                                                                                />

                                                                                                            </div>

                                                                                                        </div>
                                                                                                    </div>


                                                                                                </div>
                                                                                            </div>
                                                                                            {
                                                                                                searchFilterLignesfacture.length > 0 ?
                                                                                                    <div className="mt-3">
                                                                                                        <div style={{
                                                                                                            width: "100%",
                                                                                                            backgroundColor: "#D2DDFE",
                                                                                                            padding: 5,
                                                                                                            display: "flex"
                                                                                                        }}>
                                                                                                            <div
                                                                                                                align="center"
                                                                                                                style={{width: "10%"}}>
                                                                                                                <h5>Date</h5>
                                                                                                            </div>
                                                                                                            <div
                                                                                                                align="center"
                                                                                                                style={{width: "55%"}}>
                                                                                                                <h5>Activités</h5>
                                                                                                            </div>
                                                                                                            <div
                                                                                                                align="center"
                                                                                                                style={{width: "10%"}}>
                                                                                                                <h5>Heures</h5>
                                                                                                            </div>
                                                                                                            <div
                                                                                                                align="center"
                                                                                                                style={{width: "15%"}}>
                                                                                                                <h5>Discount(%)</h5>
                                                                                                            </div>
                                                                                                            <div
                                                                                                                align="center"
                                                                                                                style={{width: "10%"}}>
                                                                                                                <h5>Action</h5>
                                                                                                            </div>
                                                                                                        </div>
                                                                                                        {
                                                                                                            searchFilterLignesfacture.map((lf, key) =>
                                                                                                                <div
                                                                                                                    key={key}>
                                                                                                                    <div
                                                                                                                        style={{
                                                                                                                            width: "100%",
                                                                                                                            backgroundColor: "#fff",
                                                                                                                            padding: 5,
                                                                                                                            display: "flex"
                                                                                                                        }}>
                                                                                                                        <div
                                                                                                                            align="center"
                                                                                                                            style={{width: "15%"}}>
                                                                                                                            <h5>{moment(lf.newTime.date).format("DD-MM-YYYY")}</h5>
                                                                                                                        </div>
                                                                                                                        <div
                                                                                                                            align="center"
                                                                                                                            style={{width: "60%"}}>
                                                                                                                            <h5>{lf.newTime.description}</h5>
                                                                                                                        </div>
                                                                                                                        <div
                                                                                                                            align="center"
                                                                                                                            style={{width: "10%"}}>
                                                                                                                            <h5>{lf.newTime.duree}</h5>
                                                                                                                        </div>
                                                                                                                        <div
                                                                                                                            align="center"
                                                                                                                            style={{width: "15%"}}>
                                                                                                                            <input
                                                                                                                                className="form-control"
                                                                                                                                defaultValue={0}
                                                                                                                                //value={ this.state.lignesFactures[key].discount ? this.state.lignesFactures[key].discount : "0"}
                                                                                                                                style={{width: 75}}
                                                                                                                                onChange={e => {
                                                                                                                                    /*let lignesF = this.state.lignesFactures;
                                                                                                                                    let ligneF = this.state.lignesFactures[key];
                                                                                                                                    ligneF.discount = e.target.value;
                                                                                                                                    lignesF[key] = ligneF;
                                                                                                                                    this.setState({lignesFactures: lignesF})*/
                                                                                                                                }}
                                                                                                                            />
                                                                                                                        </div>
                                                                                                                        <div
                                                                                                                            align="center"
                                                                                                                            style={{width: "10%"}}>
                                                                                                                            <IconButton onClick={() => {
                                                                                                                                this.deleteLigneFact(lf)
                                                                                                                            }}>
                                                                                                                                <DeleteOutlineIcon color="error" />
                                                                                                                            </IconButton>
                                                                                                                        </div>
                                                                                                                    </div>
                                                                                                                    {
                                                                                                                        key < searchFilterLignesfacture.length &&
                                                                                                                        <div
                                                                                                                            style={{
                                                                                                                                backgroundColor: "#f0f0f0",
                                                                                                                                height: 2
                                                                                                                            }}/>
                                                                                                                    }

                                                                                                                </div>
                                                                                                            )
                                                                                                        }
                                                                                                        <div
                                                                                                            className="mt-3">
                                                                                                            <h6>Partner validant cette facture</h6>
                                                                                                            <MuiSelect
                                                                                                                labelId="demo-mutiple-chip-label14545"
                                                                                                                id="demo-mutiple-chip34688"
                                                                                                                style={{width: 250}}
                                                                                                                value={this.state.partnerFacture}
                                                                                                                onChange={(e) => {
                                                                                                                    console.log(e.target.value)
                                                                                                                    this.setState({partnerFacture: e.target.value})
                                                                                                                }}
                                                                                                                MenuProps={Data.MenuProps}
                                                                                                            >
                                                                                                                {this.state.contacts.map((contact, key) => (
                                                                                                                    <MenuItem
                                                                                                                        key={key}
                                                                                                                        value={contact.email}>
                                                                                                                        <div
                                                                                                                            className="row align-items-center justify-content-center">
                                                                                                                            <Avatar
                                                                                                                                alt=""
                                                                                                                                src={contact.imageUrl}/>
                                                                                                                            <div>{contact.nom + " " + contact.prenom}</div>
                                                                                                                        </div>
                                                                                                                    </MenuItem>
                                                                                                                ))}
                                                                                                            </MuiSelect>
                                                                                                        </div>
                                                                                                        <div
                                                                                                            className="mt-4 text-right">
                                                                                                            <AtlButton
                                                                                                                appearance="primary"
                                                                                                                onClick={() => {
                                                                                                                    this.createFacture()
                                                                                                                }}>
                                                                                                                ETABLIR FACTURE</AtlButton>
                                                                                                        </div>
                                                                                                    </div> :

                                                                                                    <div
                                                                                                        className="mt-4">
                                                                                                        <h5 style={{color: "#f50"}}>Aucune ligne
                                                                                                            facture encore ajoutée pour
                                                                                                            ce client !</h5>
                                                                                                    </div>
                                                                                            }

                                                                                        </div>
                                                                                }


                                                                            </TabPanel>

                                                                            <TabPanel>

                                                                                {
                                                                                    this.state.lignesFactures.length > 0 &&
                                                                                    <TableTimeSheet
                                                                                        lignesFactures={this.state.lignesFactures}
                                                                                        setLignesFactures={(lignes_factures) => this.setState({lignesFactures:lignes_factures})}
                                                                                        OA_contacts={this.state.contacts}
                                                                                        onClickFacture={() => {
                                                                                            this.createFacture_ForSelected()
                                                                                        }
                                                                                        }
                                                                                    />
                                                                                }


                                                                            </TabPanel>

                                                                            {
                                                                                localStorage.getItem("role") === "admin" &&
                                                                                [
                                                                                    <TabPanel key={0}>
                                                                                        <h5 style={{
                                                                                            marginTop: 20,
                                                                                            color: "blue"
                                                                                        }}>Sélection du client à
                                                                                            imputer</h5>
                                                                                        <div
                                                                                            className="row border border-primary"
                                                                                            style={{marginTop: 35}}>
                                                                                            <div className="col-md-4">
                                                                                                <input
                                                                                                    className="form-control "
                                                                                                    style={{
                                                                                                        width: "100%",
                                                                                                        borderColor: "transparent",
                                                                                                        marginTop: 8
                                                                                                    }}
                                                                                                    id="search"
                                                                                                    type="text"
                                                                                                    placeholder="search"
                                                                                                    value={this.state.searchSociete}
                                                                                                    onChange={(e) => {
                                                                                                        this.setState({searchSociete: e.target.value})
                                                                                                    }}/>

                                                                                            </div>
                                                                                            <div className="col-md-1"
                                                                                                 style={{
                                                                                                     borderLeftColor: "#a6a6a6",
                                                                                                     borderLeftStyle: "solid",
                                                                                                     borderLeftWidth: 1
                                                                                                 }}>
                                                                                                <h5>A-B-C</h5>
                                                                                            </div>
                                                                                            <div className="col-md-1"
                                                                                                 style={{
                                                                                                     borderLeftColor: "#a6a6a6",
                                                                                                     borderLeftStyle: "solid",
                                                                                                     borderLeftWidth: 1
                                                                                                 }}>
                                                                                                <h5>D-E-F</h5>
                                                                                            </div>
                                                                                            <div className="col-md-1"
                                                                                                 style={{
                                                                                                     borderLeftColor: "#a6a6a6",
                                                                                                     borderLeftStyle: "solid",
                                                                                                     borderLeftWidth: 1
                                                                                                 }}>
                                                                                                <h5>G-H-I</h5>
                                                                                            </div>
                                                                                            <div className="col-md-1"
                                                                                                 style={{
                                                                                                     borderLeftColor: "#a6a6a6",
                                                                                                     borderLeftStyle: "solid",
                                                                                                     borderLeftWidth: 1
                                                                                                 }}>
                                                                                                <h5>J-K-L</h5>
                                                                                            </div>
                                                                                            <div className="col-md-1"
                                                                                                 style={{
                                                                                                     borderLeftColor: "#a6a6a6",
                                                                                                     borderLeftStyle: "solid",
                                                                                                     borderLeftWidth: 1
                                                                                                 }}>
                                                                                                <h5>M-N-O</h5>
                                                                                            </div>
                                                                                            <div className="col-md-1"
                                                                                                 style={{
                                                                                                     borderLeftColor: "#a6a6a6",
                                                                                                     borderLeftStyle: "solid",
                                                                                                     borderLeftWidth: 1
                                                                                                 }}>
                                                                                                <h5>P-Q-R</h5>
                                                                                            </div>
                                                                                            <div className="col-md-1"
                                                                                                 style={{
                                                                                                     borderLeftColor: "#a6a6a6",
                                                                                                     borderLeftStyle: "solid",
                                                                                                     borderLeftWidth: 1
                                                                                                 }}>
                                                                                                <h5>S-T-U</h5>
                                                                                            </div>
                                                                                            <div className="col-md-1"
                                                                                                 style={{
                                                                                                     borderLeftColor: "#a6a6a6",
                                                                                                     borderLeftStyle: "solid",
                                                                                                     borderLeftWidth: 1
                                                                                                 }}>
                                                                                                <h5>W-X-Y-Z</h5>
                                                                                            </div>
                                                                                        </div>

                                                                                        <div className="row mt-3">
                                                                                            <div className="col-md-3">
                                                                                                <h5>Nom Sociéte</h5>

                                                                                            </div>
                                                                                            <div className="col-md-4">
                                                                                                <h5>Nom du décideur /
                                                                                                    email</h5>

                                                                                            </div>
                                                                                            <div className="col-md-5">
                                                                                                <h5>Nom du payeur /
                                                                                                    email</h5>

                                                                                            </div>

                                                                                        </div>
                                                                                        <div className="mt-2">
                                                                                            {this.state.searchSociete === "" ?
                                                                                                <div>
                                                                                                    {this.state.societes.map((item, key) => (
                                                                                                        <div key={key}
                                                                                                             className="row mt-2">
                                                                                                            <div
                                                                                                                className="col-md-3">
                                                                                                                <div>{item.nomSociete}</div>

                                                                                                            </div>
                                                                                                            <div
                                                                                                                className="col-md-4">
                                                                                                                <div>{item.nomDecideur + " / " + item.email}</div>

                                                                                                            </div>
                                                                                                            <div
                                                                                                                className="col-md-5">
                                                                                                                <div>{item.nomPayeur + " / " + item.emailPayeur}</div>

                                                                                                            </div>
                                                                                                        </div>
                                                                                                    ))}
                                                                                                </div>
                                                                                                :
                                                                                                <div>
                                                                                                    {
                                                                                                        searchFilter.map((item, key) => (
                                                                                                            <div
                                                                                                                key={key}
                                                                                                                className="row mt-2">
                                                                                                                <div
                                                                                                                    className="col-md-3">
                                                                                                                    <div>{item.nomSociete}</div>

                                                                                                                </div>
                                                                                                                <div
                                                                                                                    className="col-md-4">
                                                                                                                    <div>{item.nomDecideur + " / " + item.email}</div>

                                                                                                                </div>
                                                                                                                <div
                                                                                                                    className="col-md-5">
                                                                                                                    <div>{item.nomPayeur + " / " + item.emailPayeur}</div>

                                                                                                                </div>
                                                                                                            </div>
                                                                                                        ))
                                                                                                    }
                                                                                                </div>


                                                                                            }

                                                                                        </div>

                                                                                    </TabPanel>,

                                                                                    <TabPanel key={1}/>,

                                                                                    <TabPanel key={2}/>
                                                                                ]
                                                                            }
                                                                        </Tabs>
                                                                    </div>
                                                                </div>
                                                            </div>

                                                        </div>

                                                    </div> : null

                                                }
                                                {this.state.selectedTimeSheetMenuItem[0] === "dashboard" ?
                                                    <div>
                                                        <div className="row">

                                                            <div className="col-lg-12">
                                                                <div className="row align-items-center²">
                                                                    <div className="col-md-6 text-left">
                                                                        <h5 className="font-weight-bold">Time Sheet</h5>
                                                                        <h6 className="ml-2"> > Dashboard </h6>

                                                                    </div>
                                                                    <div className="col-md-6"
                                                                         style={{textAlign: "right"}}>
                                                                        <button onClick={() => this.setState({
                                                                            editSocieteForm: false,
                                                                            showContainerSection: "TimeSheet"
                                                                        })}
                                                                                className="btn btn-sm btn-outline-info">Retour
                                                                        </button>
                                                                    </div>

                                                                </div>
                                                                <div className="card-box text-center"
                                                                     style={{marginTop: 1}}>


                                                                    <div style={{marginTop: 10}} className="text-left">
                                                                        <Tabs>
                                                                            <TabList>
                                                                                <Tab>This Week</Tab>
                                                                                <Tab>Scheduled Next Week </Tab>
                                                                            </TabList>

                                                                            <TabPanel>

                                                                                <div
                                                                                    className="row justify-content-start align-items-center mt-3">
                                                                                    <div>
                                                                                        <BT
                                                                                            variant="contained"
                                                                                            style={{
                                                                                                backgroundColor: "#17a51b",
                                                                                                color: "white"
                                                                                            }}


                                                                                            startIcon={<img src={pluss}
                                                                                                            style={{width: 10}}/>}
                                                                                        >
                                                                                            Add Person
                                                                                        </BT>


                                                                                    </div>
                                                                                    <div className="ml-1">
                                                                                        <BT
                                                                                            variant="contained"
                                                                                            style={{color: "#a6a6a6"}}


                                                                                        >
                                                                                            Import
                                                                                        </BT>
                                                                                    </div>
                                                                                    <div className="ml-1">
                                                                                        <BT
                                                                                            variant="contained"
                                                                                            style={{color: "#a6a6a6"}}


                                                                                        >
                                                                                            Export
                                                                                        </BT>
                                                                                    </div>

                                                                                </div>
                                                                                <div className="row mt-2">
                                                                                    <div className="col-md-4">
                                                                                        <div
                                                                                            className="row align-items-center justify-content-start">
                                                                                            <h3 className="font-weight-bold">This
                                                                                                Week : </h3>
                                                                                            <h3>08 - 14 may 2017</h3>
                                                                                        </div>

                                                                                    </div>
                                                                                    <div
                                                                                        className="col-md-8 text-right">
                                                                                        <ButtonGroup color="#a6a6a6"
                                                                                                     aria-label="outlined secondary button group">

                                                                                            <BT>
                                                                                                <img src={back}
                                                                                                     style={{width: 18}}/>
                                                                                            </BT>
                                                                                            <BT style={{backgroundColor: "#e6e6e6"}}> This
                                                                                                Week</BT>
                                                                                            <BT>
                                                                                                <img src={back} style={{
                                                                                                    width: 18,
                                                                                                    transform: 'rotate(180deg)'
                                                                                                }}/>
                                                                                            </BT>

                                                                                        </ButtonGroup>


                                                                                    </div>
                                                                                </div>
                                                                                <div
                                                                                    className="row align-items-center w-100">
                                                                                    <div className="col-md-4 text-left">
                                                                                        <hr style={{
                                                                                            width: "80%",
                                                                                            height: 1,
                                                                                            backgroundColor: "#a6a6a6",
                                                                                            marginRight: "100%"
                                                                                        }}/>
                                                                                    </div>
                                                                                    <div
                                                                                        className="col-md-8 text-right ">
                                                                                        <hr style={{
                                                                                            width: "100%",
                                                                                            height: 1,
                                                                                            backgroundColor: "#a6a6a6"
                                                                                        }}/>


                                                                                    </div>
                                                                                </div>

                                                                                <div className="row align-items-center">
                                                                                    <div className="col-md-4">
                                                                                        <div
                                                                                            className="row align-items-center">
                                                                                            <div
                                                                                                className="col-md-6 text-left">
                                                                                                <h6>Total Hours</h6>
                                                                                                <h3>236.59</h3>
                                                                                            </div>
                                                                                            <div
                                                                                                className="col-md-6 text-left">
                                                                                                <h6>Total Capacity</h6>
                                                                                                <h3>280.00</h3>
                                                                                            </div>

                                                                                        </div>

                                                                                    </div>
                                                                                    <div
                                                                                        className="col-md-8 text-right">
                                                                                        <div
                                                                                            className="row align-items-center">
                                                                                            <div className="col-md-2">
                                                                                                <div>
                                                                                                    <div>176.91</div>

                                                                                                </div>
                                                                                                <div>
                                                                                                    <div>59.66</div>

                                                                                                </div>

                                                                                            </div>
                                                                                            <div className="col-md-10">
                                                                                                <div style={{
                                                                                                    padding: 20,
                                                                                                    width: "80%"
                                                                                                }}>
                                                                                                    <HSBar
                                                                                                        showTextDown
                                                                                                        id="hsbarExample"
                                                                                                        outlineWidth={0.2}
                                                                                                        outlineRadius={10}

                                                                                                        outlineColor="#a6a6a6"


                                                                                                        data={[
                                                                                                            {
                                                                                                                value: 60,
                                                                                                                description: "0%",
                                                                                                                color: "#1998ed"
                                                                                                            },
                                                                                                            {
                                                                                                                value: 20,
                                                                                                                description: "60%",
                                                                                                                color: "#a5d6fa"
                                                                                                            },
                                                                                                            {
                                                                                                                value: 20,
                                                                                                                description: "80%",
                                                                                                                color: "white"
                                                                                                            }
                                                                                                        ]}
                                                                                                    />
                                                                                                </div>

                                                                                            </div>

                                                                                        </div>

                                                                                    </div>

                                                                                </div>

                                                                                <div>
                                                                                    {
                                                                                        this.state.contacts.length > 0 &&
                                                                                        <TableTimeSheetDashboard
                                                                                            contacts={this.state.contacts}
                                                                                            onEditClick={(contact, key) => {
                                                                                                this.setState({
                                                                                                        selectedSociete: contact,
                                                                                                        selectedSocieteKey: key,
                                                                                                        openRightSocieteModalDetail: true
                                                                                                    }
                                                                                                )
                                                                                            }
                                                                                            }/>
                                                                                    }


                                                                                </div>


                                                                            </TabPanel>

                                                                            <TabPanel>
                                                                                <div className="row align-items-center">
                                                                                    <ButtonGroup color="#a6a6a6"
                                                                                                 aria-label="outlined secondary button group">
                                                                                        <BT>ALL</BT>
                                                                                        <BT>
                                                                                            <img src={time}
                                                                                                 style={{width: 20}}/>
                                                                                            Time</BT>
                                                                                        <BT>
                                                                                            <img src={money}
                                                                                                 style={{width: 20}}/>
                                                                                            Expense</BT>
                                                                                    </ButtonGroup>

                                                                                    <div className="ml-2">

                                                                                        <DatePicker


                                                                                            calendarIcon={<img
                                                                                                src={calendar}
                                                                                                style={{width: 20}}/>}
                                                                                            onChange={(e) => {
                                                                                                let d = this.state.TimeSheet
                                                                                                d.newTime.date = e
                                                                                                this.setState({TimeSheet: d})
                                                                                            }}
                                                                                            value={this.state.TimeSheet.newTime.date}
                                                                                        />
                                                                                    </div>
                                                                                    <div className="ml-1">
                                                                                        <h5>-</h5>
                                                                                    </div>
                                                                                    <div className="ml-1">
                                                                                        <DatePicker
                                                                                            calendarIcon={<img
                                                                                                src={calendar}
                                                                                                style={{width: 20}}/>}
                                                                                            onChange={(e) => {
                                                                                                let d = this.state.TimeSheet
                                                                                                d.newTime.date = e
                                                                                                this.setState({TimeSheet: d})
                                                                                            }}
                                                                                            value={this.state.TimeSheet.newTime.date}
                                                                                        />
                                                                                    </div>

                                                                                    <div className="ml-2">
                                                                                        <ButtonGroup color="#a6a6a6"
                                                                                                     aria-label="outlined secondary button group">

                                                                                            <BT>
                                                                                                <img src={play} style={{
                                                                                                    width: 18,
                                                                                                    transform: 'rotate(180deg)'
                                                                                                }}/>
                                                                                            </BT>
                                                                                            <BT>
                                                                                                <img src={play}
                                                                                                     style={{width: 18}}/>
                                                                                            </BT>
                                                                                        </ButtonGroup>
                                                                                    </div>

                                                                                    <div className="col-md-2 ml-2">
                                                                                        <Select
                                                                                            labelId="demo-simple-select-label"
                                                                                            id="demo-simple-select"
                                                                                            style={{width: "100%"}}
                                                                                            defaultValue={"Custom"}


                                                                                        >
                                                                                            <MenuItem
                                                                                                value={"Custom"}>Custom</MenuItem>
                                                                                            <MenuItem value={"Associé"}>Custom
                                                                                                2</MenuItem>
                                                                                            <MenuItem
                                                                                                value={"Collaborateur"}>Costim
                                                                                                3</MenuItem>

                                                                                        </Select>
                                                                                    </div>
                                                                                </div>

                                                                                {
                                                                                    this.state.contacts.length > 0 &&
                                                                                    <TableTimeSheet
                                                                                        contacts={this.state.TimeSheetData}
                                                                                        onEditClick={(contact, key) => {
                                                                                            this.setState({
                                                                                                    selectedSociete: contact,
                                                                                                    selectedSocieteKey: key,
                                                                                                    openRightSocieteModalDetail: true
                                                                                                }
                                                                                            )
                                                                                        }
                                                                                        }/>
                                                                                }


                                                                            </TabPanel>
                                                                        </Tabs>
                                                                    </div>
                                                                </div>
                                                            </div>

                                                        </div>

                                                    </div> : null

                                                }
                                                {this.state.selectedTimeSheetMenuItem[0] === "dashboardPerson" ?
                                                    <div>
                                                        <div className="row">

                                                            <div className="col-lg-12">
                                                                <div className="row align-items-center²">
                                                                    <div className="col-md-6 text-left">
                                                                        <h5 className="font-weight-bold">Time Sheet</h5>
                                                                        <h6 className="ml-2"> > Dashboard </h6>

                                                                    </div>
                                                                    <div className="col-md-6"
                                                                         style={{textAlign: "right"}}>
                                                                        <button onClick={() => this.setState({
                                                                            editSocieteForm: false,
                                                                            showContainerSection: "TimeSheet"
                                                                        })}
                                                                                className="btn btn-sm btn-outline-info">Retour
                                                                        </button>
                                                                    </div>

                                                                </div>
                                                                <div className="card-box text-center"
                                                                     style={{marginTop: 1}}>


                                                                    <div style={{marginTop: 10}} className="text-left">
                                                                        <Tabs>
                                                                            <TabList>
                                                                                <Tab>This Week</Tab>
                                                                                <Tab>Scheduled Next Week </Tab>
                                                                            </TabList>

                                                                            <TabPanel>

                                                                                <div
                                                                                    className="row border border-primary"
                                                                                    style={{marginTop: 35}}>
                                                                                    <div className="col-md-4">
                                                                                        <FormControl variant="outlined"
                                                                                                     style={{width: "100%"}}>
                                                                                            <MuiSelect
                                                                                                labelId="demo-simple-select-filled-label"
                                                                                                id="demo-simple-select-filled"
                                                                                                style={{width: "100%"}}
                                                                                                value={this.state.DashboardPerson.person}
                                                                                                onChange={(e) => {
                                                                                                    let d = this.state.DashboardPerson
                                                                                                    d.person = e.target.value

                                                                                                    this.setState({DashboardPerson: d})
                                                                                                    //console.log(e.target.value)
                                                                                                }}


                                                                                                MenuProps={Data.MenuProps}
                                                                                            >
                                                                                                {this.state.contacts.map((name, key) => (
                                                                                                    <MenuItem key={key}
                                                                                                              value={name}>
                                                                                                        <div
                                                                                                            className="row align-items-center">
                                                                                                            <Avatar
                                                                                                                alt="Natacha"
                                                                                                                src={name.imageUrl}
                                                                                                                style={{marginLeft: 10}}/>
                                                                                                            <div
                                                                                                                className="ml-2">  {name.nom + " " + name.prenom} </div>
                                                                                                        </div>
                                                                                                    </MenuItem>
                                                                                                ))}
                                                                                            </MuiSelect>
                                                                                        </FormControl>
                                                                                    </div>
                                                                                    <div className="col-md-1" style={{
                                                                                        borderLeftColor: "#a6a6a6",
                                                                                        borderLeftStyle: "solid",
                                                                                        borderLeftWidth: 1
                                                                                    }}>
                                                                                        <h5>A-B-C</h5>
                                                                                    </div>
                                                                                    <div className="col-md-1" style={{
                                                                                        borderLeftColor: "#a6a6a6",
                                                                                        borderLeftStyle: "solid",
                                                                                        borderLeftWidth: 1
                                                                                    }}>
                                                                                        <h5>D-E-F</h5>
                                                                                    </div>
                                                                                    <div className="col-md-1" style={{
                                                                                        borderLeftColor: "#a6a6a6",
                                                                                        borderLeftStyle: "solid",
                                                                                        borderLeftWidth: 1
                                                                                    }}>
                                                                                        <h5>G-H-I</h5>
                                                                                    </div>
                                                                                    <div className="col-md-1" style={{
                                                                                        borderLeftColor: "#a6a6a6",
                                                                                        borderLeftStyle: "solid",
                                                                                        borderLeftWidth: 1
                                                                                    }}>
                                                                                        <h5>J-K-L</h5>
                                                                                    </div>
                                                                                    <div className="col-md-1" style={{
                                                                                        borderLeftColor: "#a6a6a6",
                                                                                        borderLeftStyle: "solid",
                                                                                        borderLeftWidth: 1
                                                                                    }}>
                                                                                        <h5>M-N-O</h5>
                                                                                    </div>
                                                                                    <div className="col-md-1" style={{
                                                                                        borderLeftColor: "#a6a6a6",
                                                                                        borderLeftStyle: "solid",
                                                                                        borderLeftWidth: 1
                                                                                    }}>
                                                                                        <h5>P-Q-R</h5>
                                                                                    </div>
                                                                                    <div className="col-md-1" style={{
                                                                                        borderLeftColor: "#a6a6a6",
                                                                                        borderLeftStyle: "solid",
                                                                                        borderLeftWidth: 1
                                                                                    }}>
                                                                                        <h5>S-T-U</h5>
                                                                                    </div>
                                                                                    <div className="col-md-1" style={{
                                                                                        borderLeftColor: "#a6a6a6",
                                                                                        borderLeftStyle: "solid",
                                                                                        borderLeftWidth: 1
                                                                                    }}>
                                                                                        <h5>W-X-Y-Z</h5>
                                                                                    </div>
                                                                                </div>
                                                                                <div className="row mt-2">
                                                                                    <div className="col-md-4">
                                                                                        <div
                                                                                            className="row align-items-center justify-content-start">
                                                                                            <h3 className="font-weight-bold">This
                                                                                                Week : </h3>
                                                                                            <h3>08 - 14 may 2017</h3>
                                                                                        </div>

                                                                                    </div>
                                                                                    <div
                                                                                        className="col-md-8 text-right">
                                                                                        <ButtonGroup color="#a6a6a6"
                                                                                                     aria-label="outlined secondary button group">

                                                                                            <BT>
                                                                                                <img src={back}
                                                                                                     style={{width: 18}}/>
                                                                                            </BT>
                                                                                            <BT style={{backgroundColor: "#e6e6e6"}}> This
                                                                                                Week</BT>
                                                                                            <BT>
                                                                                                <img src={back} style={{
                                                                                                    width: 18,
                                                                                                    transform: 'rotate(180deg)'
                                                                                                }}/>
                                                                                            </BT>

                                                                                        </ButtonGroup>


                                                                                    </div>
                                                                                </div>
                                                                                <div>

                                                                                    <hr style={{
                                                                                        width: "100%",
                                                                                        height: 1,
                                                                                        backgroundColor: "#a6a6a6"
                                                                                    }}/>


                                                                                </div>
                                                                                {this.state.DashboardPerson.person != "" &&
                                                                                <div>
                                                                                    <div
                                                                                        className="row align-items-center mt-3 ">
                                                                                        <div className="col-md-4">
                                                                                            <div
                                                                                                className="row align-items-center">
                                                                                                <div
                                                                                                    className="col-md-4">
                                                                                                    <img
                                                                                                        src={this.state.DashboardPerson.person.imageUrl}
                                                                                                        style={{width: "100%"}}/>
                                                                                                </div>
                                                                                                <div
                                                                                                    className="col-md-8">
                                                                                                    <div>
                                                                                                        <h4 className="font-weight-bold">{this.state.DashboardPerson.person.nom + " " + this.state.DashboardPerson.person.prenom}</h4>
                                                                                                    </div>
                                                                                                    <div>
                                                                                                        <h5>{this.state.DashboardPerson.person.role}</h5>
                                                                                                    </div>
                                                                                                    <div>
                                                                                                        <h5>{this.state.DashboardPerson.person.email}</h5>
                                                                                                    </div>


                                                                                                </div>

                                                                                            </div>

                                                                                        </div>
                                                                                        <div
                                                                                            className="col-md-8 text-right">
                                                                                            <div
                                                                                                className="row justify-content-end w-100">
                                                                                                <BT

                                                                                                    variant="contained"
                                                                                                    style={{
                                                                                                        backgroundColor: "#e6e6e6",
                                                                                                        color: "black",
                                                                                                        textTransform: 'none'
                                                                                                    }}


                                                                                                    startIcon={<img
                                                                                                        src={edit}
                                                                                                        style={{width: 10}}/>}
                                                                                                >
                                                                                                    Edit profile
                                                                                                </BT>
                                                                                                <BT
                                                                                                    variant="contained"
                                                                                                    endIcon={<img
                                                                                                        src={down}
                                                                                                        style={{width: 10}}/>}
                                                                                                    style={{
                                                                                                        backgroundColor: "#e6e6e6",
                                                                                                        color: "black",
                                                                                                        marginLeft: 5,
                                                                                                        textTransform: 'none'
                                                                                                    }}


                                                                                                    aria-controls="simple-menu"
                                                                                                    aria-haspopup="true">
                                                                                                    Actions


                                                                                                </BT>
                                                                                                <Menu
                                                                                                    id="simple-menu"
                                                                                                    anchorEl={""}
                                                                                                    keepMounted

                                                                                                >
                                                                                                    <MenuItem>Profile</MenuItem>
                                                                                                    <MenuItem>My
                                                                                                        account</MenuItem>
                                                                                                    <MenuItem>Logout</MenuItem>
                                                                                                </Menu>

                                                                                            </div>


                                                                                        </div>

                                                                                    </div>
                                                                                    <div className="row mt-4">
                                                                                        <div className="col-md-4">
                                                                                            <div className="col-md-12 "
                                                                                                 style={{
                                                                                                     borderStyle: "solid",
                                                                                                     borderRadius: 10,
                                                                                                     borderWidth: 0.5,
                                                                                                     borderColor: "#a6a6a6"
                                                                                                 }}>
                                                                                                <div className="row">
                                                                                                    <div
                                                                                                        className="col-md-6 text-left">
                                                                                                        <h5 style={{color: "#a6a6a6"}}>
                                                                                                            Total Hours
                                                                                                        </h5>
                                                                                                        <h4 className="font-weight-bold">
                                                                                                            30.75
                                                                                                        </h4>
                                                                                                    </div>
                                                                                                    <div
                                                                                                        className="col-md-6 text-left">
                                                                                                        <h5 style={{color: "#a6a6a6"}}>
                                                                                                            Capacity
                                                                                                        </h5>
                                                                                                        <h4 className="font-weight-bold">
                                                                                                            35.00
                                                                                                        </h4>
                                                                                                    </div>

                                                                                                </div>

                                                                                                <div className="mt-2">
                                                                                                    <HSBar

                                                                                                        showTextDown={false}
                                                                                                        id="hsbarExample"
                                                                                                        outlineWidth={0.2}


                                                                                                        outlineColor="#a6a6a6"


                                                                                                        data={[
                                                                                                            {
                                                                                                                value: 60,
                                                                                                                description: "0%",
                                                                                                                color: "#1998ed"
                                                                                                            },
                                                                                                            {
                                                                                                                value: 20,
                                                                                                                description: "60%",
                                                                                                                color: "#a5d6fa"
                                                                                                            },
                                                                                                            {
                                                                                                                value: 20,
                                                                                                                description: "80%",
                                                                                                                color: "white"
                                                                                                            }
                                                                                                        ]}
                                                                                                    />
                                                                                                </div>

                                                                                                <div
                                                                                                    className="row mt-2 align-items-center  ml-1 "
                                                                                                    style={{width: "100%"}}>
                                                                                                    <div
                                                                                                        className="col-md-6">
                                                                                                        <div
                                                                                                            className="row align-items-center   ">
                                                                                                            <div
                                                                                                                style={{
                                                                                                                    height: 15,
                                                                                                                    width: 15,
                                                                                                                    borderRadius: 2,
                                                                                                                    backgroundColor: "#1998ed"
                                                                                                                }}>

                                                                                                            </div>
                                                                                                            <div
                                                                                                                className="ml-1">
                                                                                                                <div>Billable</div>

                                                                                                            </div>
                                                                                                        </div>
                                                                                                    </div>
                                                                                                    <div
                                                                                                        className="col-md-6 text-right font-weight-bold">
                                                                                                        <h5>19.91</h5>

                                                                                                    </div>

                                                                                                </div>
                                                                                                <div
                                                                                                    className="row mt-1 align-items-center  ml-1 "
                                                                                                    style={{width: "100%"}}>
                                                                                                    <div
                                                                                                        className="col-md-6">
                                                                                                        <div
                                                                                                            className="row align-items-center   ">
                                                                                                            <div
                                                                                                                style={{
                                                                                                                    height: 15,
                                                                                                                    width: 15,
                                                                                                                    borderRadius: 2,
                                                                                                                    backgroundColor: "#a5d6fa"
                                                                                                                }}>

                                                                                                            </div>
                                                                                                            <div
                                                                                                                className="ml-1">
                                                                                                                <div>Non-Billable</div>

                                                                                                            </div>
                                                                                                        </div>
                                                                                                    </div>
                                                                                                    <div
                                                                                                        className="col-md-6 text-right">
                                                                                                        <h5 className="font-weight-bold">10.81</h5>

                                                                                                    </div>

                                                                                                </div>

                                                                                            </div>
                                                                                            <div
                                                                                                className="col-md-12 mt-3 "
                                                                                                style={{
                                                                                                    borderStyle: "solid",
                                                                                                    borderRadius: 10,
                                                                                                    borderWidth: 0.5,
                                                                                                    borderColor: "#a6a6a6"
                                                                                                }}>
                                                                                                <div
                                                                                                    className="row justify-content-center align-items-center">
                                                                                                    <div
                                                                                                        style={{width: "12%"}}>
                                                                                                        <div>Mon</div>
                                                                                                        <h6>6.50</h6>
                                                                                                    </div>
                                                                                                    <div
                                                                                                        style={{width: "12%"}}>
                                                                                                        <div>Tue</div>
                                                                                                        <h6>7.58</h6>
                                                                                                    </div>
                                                                                                    <div
                                                                                                        style={{width: "12%"}}>
                                                                                                        <div>Wed</div>
                                                                                                        <h6>6.23</h6>
                                                                                                    </div>
                                                                                                    <div
                                                                                                        style={{width: "12%"}}>
                                                                                                        <div>Thu</div>
                                                                                                        <h6>7.33</h6>
                                                                                                    </div>
                                                                                                    <div
                                                                                                        style={{width: "12%"}}>
                                                                                                        <div>Fri</div>
                                                                                                        <h6>3.10</h6>
                                                                                                    </div>
                                                                                                    <div
                                                                                                        style={{width: "12%"}}>
                                                                                                        <div>Sat</div>
                                                                                                        <h6>0.00</h6>
                                                                                                    </div>
                                                                                                    <div
                                                                                                        style={{width: "12%"}}>
                                                                                                        <div>Sun</div>
                                                                                                        <h6>0.00</h6>
                                                                                                    </div>


                                                                                                </div>
                                                                                            </div>

                                                                                            <div
                                                                                                className="col-md-12 mt-3 "
                                                                                                style={{
                                                                                                    borderStyle: "solid",
                                                                                                    borderRadius: 10,
                                                                                                    borderWidth: 0.5,
                                                                                                    borderColor: "#a6a6a6",
                                                                                                    paddingTop: 5
                                                                                                }}>

                                                                                                <HSBar

                                                                                                    showTextDown={false}
                                                                                                    id="hsbarExample"
                                                                                                    outlineWidth={0.2}


                                                                                                    outlineColor="#a6a6a6"


                                                                                                    data={[
                                                                                                        {
                                                                                                            value: 50,
                                                                                                            description: "0%",
                                                                                                            color: "#5cb31f"
                                                                                                        },
                                                                                                        {
                                                                                                            value: 20,
                                                                                                            description: "60%",
                                                                                                            color: "#fc6420"
                                                                                                        },
                                                                                                        {
                                                                                                            value: 20,
                                                                                                            description: "80%",
                                                                                                            color: "#e1c92c"
                                                                                                        },
                                                                                                        {
                                                                                                            value: 10,
                                                                                                            description: "80%",
                                                                                                            color: "#20bde8"
                                                                                                        }
                                                                                                    ]}
                                                                                                />
                                                                                                <div
                                                                                                    className="row mt-2 align-items-center  ml-1 "
                                                                                                    style={{width: "100%"}}>
                                                                                                    <div
                                                                                                        className="col-md-8">
                                                                                                        <div
                                                                                                            className="row align-items-center   ">
                                                                                                            <div
                                                                                                                style={{
                                                                                                                    height: 15,
                                                                                                                    width: 15,
                                                                                                                    borderRadius: 2,
                                                                                                                    backgroundColor: "#5cb31f"
                                                                                                                }}>

                                                                                                            </div>
                                                                                                            <div
                                                                                                                className="ml-1">
                                                                                                                <div>Autumn
                                                                                                                    2016
                                                                                                                    Campaign
                                                                                                                    Launch
                                                                                                                </div>

                                                                                                            </div>
                                                                                                        </div>
                                                                                                    </div>
                                                                                                    <div
                                                                                                        className="col-md-4 text-right font-weight-bold">
                                                                                                        <h5>17.83</h5>

                                                                                                    </div>

                                                                                                </div>
                                                                                                <div
                                                                                                    className="row mt-1 align-items-center  ml-1 "
                                                                                                    style={{width: "100%"}}>
                                                                                                    <div
                                                                                                        className="col-md-8">
                                                                                                        <div
                                                                                                            className="row align-items-center   ">
                                                                                                            <div
                                                                                                                style={{
                                                                                                                    height: 15,
                                                                                                                    width: 15,
                                                                                                                    borderRadius: 2,
                                                                                                                    backgroundColor: "#fc6420"
                                                                                                                }}>

                                                                                                            </div>
                                                                                                            <div
                                                                                                                className="ml-1">
                                                                                                                <div>Website
                                                                                                                    Redisgn
                                                                                                                    2017
                                                                                                                    -
                                                                                                                    Phase
                                                                                                                </div>

                                                                                                            </div>
                                                                                                        </div>
                                                                                                    </div>
                                                                                                    <div
                                                                                                        className="col-md-4 text-right font-weight-bold">
                                                                                                        <h5>5.83</h5>

                                                                                                    </div>

                                                                                                </div>
                                                                                                <div
                                                                                                    className="row mt-1 align-items-center  ml-1 "
                                                                                                    style={{width: "100%"}}>
                                                                                                    <div
                                                                                                        className="col-md-8">
                                                                                                        <div
                                                                                                            className="row align-items-center   ">
                                                                                                            <div
                                                                                                                style={{
                                                                                                                    height: 15,
                                                                                                                    width: 15,
                                                                                                                    borderRadius: 2,
                                                                                                                    backgroundColor: "#e1c92c"
                                                                                                                }}>

                                                                                                            </div>
                                                                                                            <div
                                                                                                                className="ml-1">
                                                                                                                <div>Signage
                                                                                                                    Redesign
                                                                                                                    2017
                                                                                                                </div>

                                                                                                            </div>
                                                                                                        </div>
                                                                                                    </div>
                                                                                                    <div
                                                                                                        className="col-md-4 text-right font-weight-bold">
                                                                                                        <h5>5.33</h5>

                                                                                                    </div>

                                                                                                </div>
                                                                                                <div
                                                                                                    className="row mt-1 align-items-center  ml-1 "
                                                                                                    style={{width: "100%"}}>
                                                                                                    <div
                                                                                                        className="col-md-8">
                                                                                                        <div
                                                                                                            className="row align-items-center   ">
                                                                                                            <div
                                                                                                                style={{
                                                                                                                    height: 15,
                                                                                                                    width: 15,
                                                                                                                    borderRadius: 2,
                                                                                                                    backgroundColor: "#20bde8"
                                                                                                                }}>

                                                                                                            </div>
                                                                                                            <div
                                                                                                                className="ml-1">
                                                                                                                <div>Internal
                                                                                                                    Office
                                                                                                                </div>

                                                                                                            </div>
                                                                                                        </div>
                                                                                                    </div>
                                                                                                    <div
                                                                                                        className="col-md-4 text-right font-weight-bold">
                                                                                                        <h5>1.75</h5>

                                                                                                    </div>

                                                                                                </div>

                                                                                            </div>

                                                                                        </div>
                                                                                        <div className="col-md-8">

                                                                                            <div
                                                                                                className="row justify-content-start"
                                                                                                style={{
                                                                                                    borderBottomStyle: "solid",
                                                                                                    borderBottomColor: "#a6a6a6"
                                                                                                }}>
                                                                                                <div
                                                                                                    className="col-md-auto">
                                                                                                    <div
                                                                                                        className="font-weight-bold"
                                                                                                        style={{color: "black"}}>Monday
                                                                                                    </div>
                                                                                                    {" " + data.dashboardTab.monday.date}
                                                                                                </div>

                                                                                            </div>
                                                                                            {data.dashboardTab.monday.data.map((item, key) => (
                                                                                                <div
                                                                                                    className="row align-items-center"
                                                                                                    style={{
                                                                                                        borderBottomStyle: "solid",
                                                                                                        borderBottomColor: "#a6a6a6",
                                                                                                        borderBottomWidth: 0.2,
                                                                                                        marginTop: 8,
                                                                                                        paddingBottom: 10
                                                                                                    }}>
                                                                                                    <div
                                                                                                        className="col-md-9 text-left">
                                                                                                        <div>
                                                                                                            <div
                                                                                                                className="font-weight-bold"
                                                                                                                style={{color: "black"}}>{item.title}</div>
                                                                                                        </div>
                                                                                                        <div>
                                                                                                            <div>{item.work}</div>

                                                                                                        </div>
                                                                                                    </div>
                                                                                                    <div
                                                                                                        className="col-md-2">
                                                                                                        <div
                                                                                                            className="font-weight-bold"
                                                                                                            style={{color: "black"}}>{item.value}</div>
                                                                                                    </div>
                                                                                                    <div
                                                                                                        className="col-md-1">
                                                                                                        <IconButton>
                                                                                                            <img
                                                                                                                src={edit}
                                                                                                                style={{width: "100%"}}/>
                                                                                                        </IconButton>
                                                                                                    </div>
                                                                                                </div>
                                                                                            ))}

                                                                                        </div>

                                                                                    </div>
                                                                                </div>


                                                                                }


                                                                            </TabPanel>

                                                                            <TabPanel>
                                                                                <div className="row align-items-center">
                                                                                    <ButtonGroup color="#a6a6a6"
                                                                                                 aria-label="outlined secondary button group">
                                                                                        <BT>ALL</BT>
                                                                                        <BT>
                                                                                            <img src={time}
                                                                                                 style={{width: 20}}/>
                                                                                            Time</BT>
                                                                                        <BT>
                                                                                            <img src={money}
                                                                                                 style={{width: 20}}/>
                                                                                            Expense</BT>
                                                                                    </ButtonGroup>

                                                                                    <div className="ml-2">

                                                                                        <DatePicker


                                                                                            calendarIcon={<img
                                                                                                src={calendar}
                                                                                                style={{width: 20}}/>}
                                                                                            onChange={(e) => {
                                                                                                let d = this.state.TimeSheet
                                                                                                d.newTime.date = e
                                                                                                this.setState({TimeSheet: d})
                                                                                            }}
                                                                                            value={this.state.TimeSheet.newTime.date}
                                                                                        />
                                                                                    </div>
                                                                                    <div className="ml-1">
                                                                                        <h5>-</h5>
                                                                                    </div>
                                                                                    <div className="ml-1">
                                                                                        <DatePicker
                                                                                            calendarIcon={<img
                                                                                                src={calendar}
                                                                                                style={{width: 20}}/>}
                                                                                            onChange={(e) => {
                                                                                                let d = this.state.TimeSheet
                                                                                                d.newTime.date = e
                                                                                                this.setState({TimeSheet: d})
                                                                                            }}
                                                                                            value={this.state.TimeSheet.newTime.date}
                                                                                        />
                                                                                    </div>

                                                                                    <div className="ml-2">
                                                                                        <ButtonGroup color="#a6a6a6"
                                                                                                     aria-label="outlined secondary button group">

                                                                                            <BT>
                                                                                                <img src={play} style={{
                                                                                                    width: 18,
                                                                                                    transform: 'rotate(180deg)'
                                                                                                }}/>
                                                                                            </BT>
                                                                                            <BT>
                                                                                                <img src={play}
                                                                                                     style={{width: 18}}/>
                                                                                            </BT>
                                                                                        </ButtonGroup>
                                                                                    </div>

                                                                                    <div className="col-md-2 ml-2">
                                                                                        <Select
                                                                                            labelId="demo-simple-select-label"
                                                                                            id="demo-simple-select"
                                                                                            style={{width: "100%"}}
                                                                                            defaultValue={"Custom"}


                                                                                        >
                                                                                            <MenuItem
                                                                                                value={"Custom"}>Custom</MenuItem>
                                                                                            <MenuItem value={"Associé"}>Custom
                                                                                                2</MenuItem>
                                                                                            <MenuItem
                                                                                                value={"Collaborateur"}>Costim
                                                                                                3</MenuItem>

                                                                                        </Select>
                                                                                    </div>
                                                                                </div>

                                                                                {
                                                                                    this.state.contacts.length > 0 &&
                                                                                    <TableTimeSheet
                                                                                        contacts={this.state.TimeSheetData}
                                                                                        onEditClick={(contact, key) => {
                                                                                            this.setState({
                                                                                                    selectedSociete: contact,
                                                                                                    selectedSocieteKey: key,
                                                                                                    openRightSocieteModalDetail: true
                                                                                                }
                                                                                            )
                                                                                        }
                                                                                        }/>
                                                                                }


                                                                            </TabPanel>
                                                                        </Tabs>
                                                                    </div>
                                                                </div>
                                                            </div>

                                                        </div>

                                                    </div> : null

                                                }
                                                {this.state.selectedTimeSheetMenuItem[0] === "dashboardProject" ?
                                                    <div>
                                                        <div className="row">

                                                            <div className="col-lg-12">
                                                                <div className="row align-items-center²">
                                                                    <div className="col-md-6 text-left">
                                                                        <h5 className="font-weight-bold">Time Sheet</h5>
                                                                        <h6 className="ml-2"> > Dashboard Project </h6>

                                                                    </div>
                                                                    <div className="col-md-6"
                                                                         style={{textAlign: "right"}}>
                                                                        <button onClick={() => this.setState({
                                                                            editSocieteForm: false,
                                                                            showContainerSection: "TimeSheet"
                                                                        })}
                                                                                className="btn btn-sm btn-outline-info">Retour
                                                                        </button>
                                                                    </div>

                                                                </div>
                                                                <div className="card-box text-center"
                                                                     style={{marginTop: 1}}>


                                                                    <div style={{marginTop: 10}} className="text-left">
                                                                        <Tabs>
                                                                            <TabList>
                                                                                <Tab>All projects</Tab>
                                                                                <Tab>This Week</Tab>
                                                                                <Tab>Scheduled Next Week </Tab>
                                                                            </TabList>

                                                                            <TabPanel>

                                                                                <div
                                                                                    className="row justify-content-start align-items-center mt-3">
                                                                                    <div>
                                                                                        <BT
                                                                                            variant="contained"
                                                                                            style={{
                                                                                                backgroundColor: "#17a51b",
                                                                                                color: "white"
                                                                                            }}


                                                                                            startIcon={<img src={pluss}
                                                                                                            style={{width: 10}}/>}
                                                                                        >
                                                                                            Add Person
                                                                                        </BT>


                                                                                    </div>
                                                                                    <div className="ml-1">
                                                                                        <BT
                                                                                            variant="contained"
                                                                                            style={{color: "#a6a6a6"}}


                                                                                        >
                                                                                            Import
                                                                                        </BT>
                                                                                    </div>
                                                                                    <div className="ml-1">
                                                                                        <BT
                                                                                            variant="contained"
                                                                                            style={{color: "#a6a6a6"}}


                                                                                        >
                                                                                            Export
                                                                                        </BT>
                                                                                    </div>

                                                                                </div>
                                                                                <div
                                                                                    className="row justify-content-start">
                                                                                    <div
                                                                                        className="mt-3 text-left col-md-3">
                                                                                        <BT
                                                                                            variant="contained"
                                                                                            endIcon={<img alt=""
                                                                                                          src={down}
                                                                                                          style={{width: 10}}/>}
                                                                                            style={{
                                                                                                backgroundColor: "#e6e6e6",
                                                                                                color: "black",
                                                                                                marginLeft: 5,
                                                                                                textTransform: 'none',
                                                                                                width: "100%"
                                                                                            }}
                                                                                            aria-controls="simple-menu"
                                                                                            aria-haspopup="true">
                                                                                            Budgeted Project (9)
                                                                                        </BT>
                                                                                    </div>

                                                                                </div>
                                                                                <div className="mt-3">
                                                                                    <table className="table">
                                                                                        <thead className="thead-light">
                                                                                        <tr>
                                                                                            <th scope="col">ACME
                                                                                                CORPORATION
                                                                                            </th>
                                                                                            <th scope="col">Budget</th>
                                                                                            <th scope="col">Spent</th>
                                                                                            <th scope="col"
                                                                                                style={{width: "20%"}}/>

                                                                                            <th scope="col">Remaining</th>
                                                                                            <th scope="col"/>

                                                                                            <th scope="col">Cost</th>
                                                                                        </tr>
                                                                                        </thead>
                                                                                        <tbody>
                                                                                        {data.dashbordProject.acme.map((item, key) => (
                                                                                            <tr key={key}>
                                                                                                <td>{item.title}</td>
                                                                                                <td>{item.budget}</td>
                                                                                                <td>{item.spent}</td>
                                                                                                <td>
                                                                                                    <div
                                                                                                        className="progress ml-auto mr-auto w-100 ">
                                                                                                        <div
                                                                                                            className="progress-bar"
                                                                                                            role="progressbar"
                                                                                                            style={{
                                                                                                                width: item.chart + "%",
                                                                                                                backgroundColor: "#1fbce7"
                                                                                                            }}
                                                                                                            aria-valuenow="10"
                                                                                                            aria-valuemin='0'
                                                                                                            aria-valuemax="100"/>
                                                                                                    </div>
                                                                                                </td>
                                                                                                <td>{item.romaining} </td>
                                                                                                <td>{item.purcent}</td>

                                                                                                <td>{item.costs}</td>
                                                                                            </tr>
                                                                                        ))

                                                                                        }
                                                                                        </tbody>
                                                                                    </table>
                                                                                    <table className="table">
                                                                                        <thead
                                                                                            className="thead-light">
                                                                                        <tr>
                                                                                            <th scope="col">ASTORIAN
                                                                                                PUBLISHING
                                                                                            </th>
                                                                                            <th scope="col">Budget</th>
                                                                                            <th scope="col">Spent</th>
                                                                                            <th scope="col"
                                                                                                style={{width: "20%"}}/>

                                                                                            <th scope="col">Remaining</th>
                                                                                            <th scope="col"/>

                                                                                            <th scope="col">Cost</th>
                                                                                        </tr>
                                                                                        </thead>
                                                                                        <tbody>
                                                                                        {data.dashbordProject.astorian.map((item, key) => (
                                                                                            <tr key={key}>
                                                                                                <td>{item.title}</td>
                                                                                                <td>{item.budget}</td>
                                                                                                <td>{item.spent}</td>
                                                                                                <td>
                                                                                                    <div
                                                                                                        className="progress ml-auto mr-auto w-100 ">
                                                                                                        <div
                                                                                                            className="progress-bar"
                                                                                                            role="progressbar"
                                                                                                            style={{
                                                                                                                width: item.chart + "%",
                                                                                                                backgroundColor: "#1fbce7"
                                                                                                            }}
                                                                                                            aria-valuenow="10"
                                                                                                            aria-valuemin='0'
                                                                                                            aria-valuemax="100"/>
                                                                                                    </div>
                                                                                                </td>
                                                                                                <td>{item.romaining} </td>
                                                                                                <td>{item.purcent}</td>
                                                                                                <td>{item.costs}</td>
                                                                                            </tr>
                                                                                        ))

                                                                                        }
                                                                                        </tbody>
                                                                                    </table>
                                                                                    <table className="table">
                                                                                        <thead
                                                                                            className="thead-light">
                                                                                        <tr>
                                                                                            <th scope="col">BARRINGTON
                                                                                                PUBLISHERS
                                                                                            </th>
                                                                                            <th scope="col">Budget</th>
                                                                                            <th scope="col">Spent</th>
                                                                                            <th scope="col"
                                                                                                style={{width: "20%"}}/>

                                                                                            <th scope="col">Remaining</th>
                                                                                            <th scope="col"/>

                                                                                            <th scope="col">Cost</th>
                                                                                        </tr>
                                                                                        </thead>
                                                                                        <tbody>
                                                                                        {data.dashbordProject.barrington.map((item, key) => (
                                                                                            <tr key={key}>
                                                                                                <td>{item.title}</td>
                                                                                                <td>{item.budget}</td>
                                                                                                <td>{item.spent}</td>
                                                                                                <td>
                                                                                                    <div
                                                                                                        className="progress ml-auto mr-auto w-100 ">
                                                                                                        <div
                                                                                                            className="progress-bar"
                                                                                                            role="progressbar"
                                                                                                            style={{
                                                                                                                width: item.chart + "%",
                                                                                                                backgroundColor: "#1fbce7"
                                                                                                            }}
                                                                                                            aria-valuenow="10"
                                                                                                            aria-valuemin='0'
                                                                                                            aria-valuemax="100"/>
                                                                                                    </div>
                                                                                                </td>
                                                                                                <td>{item.romaining} </td>
                                                                                                <td>{item.purcent}</td>

                                                                                                <td>{item.costs}</td>
                                                                                            </tr>
                                                                                        ))

                                                                                        }
                                                                                        </tbody>
                                                                                    </table>
                                                                                    <table className="table">
                                                                                        <thead
                                                                                            className="thead-light">
                                                                                        <tr>
                                                                                            <th scope="col">BRITISH
                                                                                                MUSEUM
                                                                                            </th>
                                                                                            <th scope="col">Budget</th>
                                                                                            <th scope="col">Spent</th>
                                                                                            <th scope="col"
                                                                                                style={{width: "20%"}}/>

                                                                                            <th scope="col">Remaining</th>
                                                                                            <th scope="col"/>

                                                                                            <th scope="col">Cost</th>
                                                                                        </tr>
                                                                                        </thead>
                                                                                        <tbody>
                                                                                        {data.dashbordProject.british.map((item, key) => (
                                                                                            <tr key={key}>
                                                                                                <td>{item.title}</td>
                                                                                                <td>{item.budget}</td>
                                                                                                <td>{item.spent}</td>
                                                                                                <td>
                                                                                                    <div
                                                                                                        className="progress ml-auto mr-auto w-100 ">
                                                                                                        <div
                                                                                                            className="progress-bar"
                                                                                                            role="progressbar"
                                                                                                            style={{
                                                                                                                width: item.chart + "%",
                                                                                                                backgroundColor: "#1fbce7"
                                                                                                            }}
                                                                                                            aria-valuenow="10"
                                                                                                            aria-valuemin='0'
                                                                                                            aria-valuemax="100"/>
                                                                                                    </div>
                                                                                                </td>
                                                                                                <td>{item.romaining} </td>
                                                                                                <td>{item.purcent}</td>

                                                                                                <td>{item.costs}</td>
                                                                                            </tr>
                                                                                        ))

                                                                                        }
                                                                                        </tbody>
                                                                                    </table>
                                                                                    <table className="table">
                                                                                        <thead
                                                                                            className="thead-light">
                                                                                        <tr>
                                                                                            <th scope="col">BROADSTREET
                                                                                                INC
                                                                                            </th>
                                                                                            <th scope="col">Budget</th>
                                                                                            <th scope="col">Spent</th>
                                                                                            <th scope="col"
                                                                                                style={{width: "20%"}}/>

                                                                                            <th scope="col">Remaining</th>
                                                                                            <th scope="col"/>

                                                                                            <th scope="col">Cost</th>
                                                                                        </tr>
                                                                                        </thead>
                                                                                        <tbody>
                                                                                        {data.dashbordProject.broadstreet.map((item, key) => (
                                                                                            <tr key={key}>
                                                                                                <td>{item.title}</td>
                                                                                                <td>{item.budget}</td>
                                                                                                <td>{item.spent}</td>
                                                                                                <td>
                                                                                                    <div
                                                                                                        className="progress ml-auto mr-auto w-100 ">
                                                                                                        <div
                                                                                                            className="progress-bar"
                                                                                                            role="progressbar"
                                                                                                            style={{
                                                                                                                width: item.chart + "%",
                                                                                                                backgroundColor: "#1fbce7"
                                                                                                            }}
                                                                                                            aria-valuenow="10"
                                                                                                            aria-valuemin='0'
                                                                                                            aria-valuemax="100"/>
                                                                                                    </div>
                                                                                                </td>
                                                                                                <td>{item.romaining} </td>
                                                                                                <td>{item.purcent}</td>

                                                                                                <td>{item.costs}</td>
                                                                                            </tr>
                                                                                        ))

                                                                                        }
                                                                                        </tbody>
                                                                                    </table>
                                                                                </div>


                                                                            </TabPanel>

                                                                            <TabPanel>
                                                                                <div className="row align-items-center">
                                                                                    <ButtonGroup color="#a6a6a6"
                                                                                                 aria-label="outlined secondary button group">
                                                                                        <BT>ALL</BT>
                                                                                        <BT>
                                                                                            <img src={time}
                                                                                                 style={{width: 20}}/>
                                                                                            Time</BT>
                                                                                        <BT>
                                                                                            <img src={money}
                                                                                                 style={{width: 20}}/>
                                                                                            Expense</BT>
                                                                                    </ButtonGroup>

                                                                                    <div className="ml-2">

                                                                                        <DatePicker


                                                                                            calendarIcon={<img
                                                                                                src={calendar}
                                                                                                style={{width: 20}}/>}
                                                                                            onChange={(e) => {
                                                                                                let d = this.state.TimeSheet
                                                                                                d.newTime.date = e
                                                                                                this.setState({TimeSheet: d})
                                                                                            }}
                                                                                            value={this.state.TimeSheet.newTime.date}
                                                                                        />
                                                                                    </div>
                                                                                    <div className="ml-1">
                                                                                        <h5>-</h5>
                                                                                    </div>
                                                                                    <div className="ml-1">
                                                                                        <DatePicker
                                                                                            calendarIcon={<img
                                                                                                src={calendar}
                                                                                                style={{width: 20}}/>}
                                                                                            onChange={(e) => {
                                                                                                let d = this.state.TimeSheet
                                                                                                d.newTime.date = e
                                                                                                this.setState({TimeSheet: d})
                                                                                            }}
                                                                                            value={this.state.TimeSheet.newTime.date}
                                                                                        />
                                                                                    </div>

                                                                                    <div className="ml-2">
                                                                                        <ButtonGroup color="#a6a6a6"
                                                                                                     aria-label="outlined secondary button group">

                                                                                            <BT>
                                                                                                <img src={play} style={{
                                                                                                    width: 18,
                                                                                                    transform: 'rotate(180deg)'
                                                                                                }}/>
                                                                                            </BT>
                                                                                            <BT>
                                                                                                <img src={play}
                                                                                                     style={{width: 18}}/>
                                                                                            </BT>
                                                                                        </ButtonGroup>
                                                                                    </div>

                                                                                    <div className="col-md-2 ml-2">
                                                                                        <Select
                                                                                            labelId="demo-simple-select-label"
                                                                                            id="demo-simple-select"
                                                                                            style={{width: "100%"}}
                                                                                            defaultValue={"Custom"}


                                                                                        >
                                                                                            <MenuItem
                                                                                                value={"Custom"}>Custom</MenuItem>
                                                                                            <MenuItem value={"Associé"}>Custom
                                                                                                2</MenuItem>
                                                                                            <MenuItem
                                                                                                value={"Collaborateur"}>Costim
                                                                                                3</MenuItem>

                                                                                        </Select>
                                                                                    </div>
                                                                                </div>

                                                                                {
                                                                                    this.state.contacts.length > 0 &&
                                                                                    <TableTimeSheet
                                                                                        contacts={this.state.TimeSheetData}
                                                                                        onEditClick={(contact, key) => {
                                                                                            this.setState({
                                                                                                    selectedSociete: contact,
                                                                                                    selectedSocieteKey: key,
                                                                                                    openRightSocieteModalDetail: true
                                                                                                }
                                                                                            )
                                                                                        }
                                                                                        }/>
                                                                                }


                                                                            </TabPanel>

                                                                            <TabPanel>

                                                                            </TabPanel>


                                                                        </Tabs>
                                                                    </div>
                                                                </div>
                                                            </div>

                                                        </div>

                                                    </div> : null
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
                                        {this.state.selectedDoc.name + ".pdf"}
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
                                                    SmartService.getFile(this.state.selectedDoc.id || this.state.selectedDoc.file_id,
                                                        localStorage.getItem("token"), localStorage.getItem("usrtoken")).then(fileRes => {
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

                    <Drawer anchor="right" open={this.state.openRightSocieteModalDetail} onClose={() => {
                        this.setState({openRightSocieteModalDetail: false})
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
                                                             src={this.state.selectedSociete ? this.state.selectedSociete.imageUrl || defaultAvatar : null}
                                                             alt=""
                                                             style={{height: 80, width: 80, objectFit: "cover"}}/>

                                                    </div>
                                                    <div className="mt-1">
                                                        <div
                                                            className="ml-1 font-weight-bold">{this.state.selectedSociete.nomSociete} </div>
                                                    </div>

                                                    <div className="">
                                                        <small>{this.state.selectedSociete.specialite}</small>
                                                    </div>

                                                    <button className="btn btn-xs btn-info"
                                                            style={{margin: "0.2rem"}}>Envoyer email
                                                    </button>
                                                    <button className="btn btn-xs btn-danger"
                                                            style={{margin: "0.2rem"}}>Appeler
                                                    </button>
                                                    <button className="btn btn-xs btn-light" style={{margin: "0.2rem"}}
                                                            onClick={() => {
                                                                this.setState({openRightSocieteModalDetail: false})
                                                                setTimeout(() => {
                                                                    this.setState({editSocieteForm: true})
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
                                            {this.state.selectedSociete.aparte}
                                        </p>

                                        <h4 className="font-13 text-muted text-uppercase mb-1">Langues</h4>
                                        <p className="mb-3"> {this.state.selectedSociete.langues}</p>

                                        <h4 className="font-13 text-muted text-uppercase mb-1">Numéro de téléphone</h4>
                                        <p className="mb-3">{this.state.selectedSociete.phone}</p>

                                        <h4 className="font-13 text-muted text-uppercase mb-1">Email</h4>
                                        <p className="mb-3"> {this.state.selectedSociete.email}</p>

                                        <h4 className="font-13 text-muted text-uppercase mb-1">Pays</h4>
                                        <p className="mb-0"> {this.state.selectedSociete.pays}</p>

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
                           toggle={() => this.setState({
                               showPdfPreviewModal: !this.state.showPdfPreviewModal,
                               isDocPreviewReady: false
                           })}>
                        <ModalHeader toggle={() => this.setState({
                            showPdfPreviewModal: !this.state.showPdfPreviewModal,
                            isDocPreviewReady: false
                        })}>
                            Document
                        </ModalHeader>
                        <ModalBody>
                            {
                                this.state.isDocPreviewReady === true && (
                                    <PdfView width={"100%"} height={800}>
                                        <Resume title={"Resume of " + this.state.selectedContact.nom}
                                                name={this.state.selectedContact.nom}
                                                speciality={this.state.selectedContact.specialite || this.state.selectedContact.titre + "(" + this.state.selectedContact.pays + ")"}
                                                email={this.state.selectedContact.email}
                                                image={this.state.selectedContact.imageUrl}
                                                about={this.state.selectedContact.about}
                                                personalLife={this.state.selectedContact.personalLife}
                                                parcoursP={this.state.selectedContact.parcoursP || []}
                                                langues={this.state.selectedContact.langues || []}
                                                hobbies={this.state.selectedContact.hobbies || []}
                                                formations={this.state.selectedContact.formations || []}
                                                affiliations={this.state.selectedContact.affiliations || []}
                                                domainesAct={this.state.selectedContact.domainesAct || []}
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
                                    <img alt="" src={require("../../assets/images/SwissWhoWho.jpeg")}
                                         style={{width: "100%", height: 750, objectFit: "contain"}}/>
                                </article>
                                <article style={{padding: 30}}>

                                    <FHeader name={this.state.selectedContact.nom}
                                             speciality={this.state.selectedContact.speciality}
                                             email={this.state.selectedContact.email}/>
                                    <div>
                                        <img alt=""
                                             src={this.state.selectedContact.imageUrl} style={{
                                            marginTop: 20, marginBottom: 10,
                                            width: 200, height: 200, objectFit: "cover"
                                        }}
                                        />
                                    </div>
                                    <div style={{marginTop: 40}}>
                                        <FTitle>À propos</FTitle>
                                        <div style={{
                                            fontSize: 13,
                                            color: "#000"
                                        }}>{this.state.selectedContact.about || ""}</div>
                                    </div>
                                    <div style={{marginTop: 40}}>
                                        <FTitle>Famille & Vie privée</FTitle>
                                        <div style={{
                                            fontSize: 13,
                                            color: "#000"
                                        }}>{this.state.selectedContact.personalLife || ""}</div>
                                    </div>

                                </article>
                                <article style={{padding: 30}}>
                                    <div className="row">
                                        <div className="col-md-4">
                                            <div style={{marginTop: 40}}>
                                                <FTitle>Langues</FTitle>
                                                <ul>
                                                    {(this.state.selectedContact.langues || []).map((item, i) => (
                                                        <li key={i} style={{color: "#000"}}>{item}</li>
                                                    ))}
                                                </ul>
                                            </div>
                                            <div style={{marginTop: 55}}>
                                                <FTitle>Domaines d'intérêt, loisirs et sports</FTitle>
                                                <ul>
                                                    {(this.state.selectedContact.hobbies || []).map((item, i) => (
                                                        <li key={i} style={{color: "#000"}}>{item}</li>
                                                    ))}
                                                </ul>
                                            </div>
                                        </div>
                                        <div className="col-md-8">
                                            <div style={{marginTop: 40}}>
                                                <FTitle>Parcour professionnel</FTitle>
                                                <ul>
                                                    {(this.state.selectedContact.parcoursP || []).map((item, i) => (
                                                        <li key={i} style={{color: "#000"}}>{item}</li>
                                                    ))}
                                                </ul>
                                            </div>
                                            <div style={{marginTop: 55}}>
                                                <FTitle>Formations</FTitle>
                                                <ul>
                                                    {(this.state.selectedContact.formations || []).map((item, i) => (
                                                        <li key={i} style={{color: "#000"}}>{item}</li>
                                                    ))}
                                                </ul>
                                            </div>
                                            <div style={{marginTop: 55}}>
                                                <FTitle>Affiliations</FTitle>
                                                <ul>
                                                    {(this.state.selectedContact.affiliations || []).map((item, i) => (
                                                        <li key={i} style={{color: "#000"}}>{item}</li>
                                                    ))}
                                                </ul>
                                            </div>
                                            <div style={{marginTop: 55}}>
                                                <FTitle>Domaines d'activités</FTitle>
                                                <ul>
                                                    {(this.state.selectedContact.domainesAct || []).map((item, i) => (
                                                        <li key={i} style={{color: "#000"}}>{item}</li>
                                                    ))}
                                                </ul>
                                            </div>
                                        </div>

                                    </div>
                                </article>
                            </FlipPage>
                        </ModalBody>
                    </Modal>


                    <Modal isOpen={this.state.newFolderModal} size="md" centered={true} zIndex={1500}
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

                    <Modal isOpen={this.state.showInviteModal} size="md" centered={true} zIndex={1500}
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
                                    return isEmail(email);
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
                                            maillingService.sendCustomMailsWithUrl({
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


                    <Modal isOpen={this.state.showModalAdd} size="md" centered={true} zIndex={1500}
                           toggle={() => this.setState({showModalAdd: !this.state.showModalAdd})}>
                        <ModalHeader toggle={() => this.setState({
                            showModalAdd: !this.state.showModalAdd
                        })}>
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
                                    || this.state.add === "affiliation" || this.state.add === "parcour" || this.state.add === "langue" || this.state.add === "hobbies") &&
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
                                        <InputLabel style={{fontSize: "100%"}} id="demo-mutiple-chip-label">Les
                                            spécialités recherchées </InputLabel>
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


                    {/*Share folder Modal*/}

                    <Dialog open={this.state.openShareDocModal} onClose={() => {
                        this.setState({openShareDocModal: !this.state.openShareDocModal})
                    }} aria-labelledby="form-dialog-title">
                        <DialogTitle id="form-dialog-title" style={{marginLeft: -22, marginBottom: -10}}>
                            <IconButton aria-label="Partager" color="primary">
                                <PersonAddIcon/>
                            </IconButton>
                            Partager avec des personnes et des groupes
                        </DialogTitle>
                        <DialogContent>
                            <div className="row">
                                <div className="col-md-12">
                                    <div style={{marginLeft: 11}}>
                                        <Chips
                                            chips={[]}
                                            placeholder='Ajouter des personnes'
                                            save={data => {
                                                this.setState({emailsDriveShare: data})
                                            }}
                                            pattern={data.emailPatern}
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

                                </div>

                                <div className="col-md-12" style={{marginTop: 20}}>
                                    <FormControlLabel
                                        control={<MuiCheckbox checked={this.state.checkedNotif}
                                                              onChange={() => this.setState({checkedNotif: !this.state.checkedNotif})}
                                                              name="checkedNotif"
                                        />}
                                        label="Envoyer une notification"
                                    />
                                </div>
                                {
                                    this.state.checkedNotif === true &&
                                    <div className="col-md-12">
                                        <TextField id="msg-notif" label="Message" variant="filled"
                                                   value={this.state.msgNotif}
                                                   onChange={(event) => this.setState({msgNotif: event.target.value})}
                                                   multiline rows={5} style={{width: 500, marginLeft: 8}}
                                        />
                                    </div>
                                }
                                <div className="col-md-12" style={{marginTop: 15}}>
                                    <Chip icon={this.state.selectedFile === "" ? <FolderIcon/> :
                                        <PictureAsPdfIcon style={{color: "red", backgroundColor: "#fff"}}/>}
                                          label={this.state.selectedFile === "" ? this.state.selectedFoldername : this.state.selectedFile.name + ".pdf"}
                                          style={{
                                              fontWeight: "bold",
                                              backgroundColor: "white",
                                              border: "1px solid #c0c0c0"
                                          }}
                                    />
                                </div>
                            </div>

                        </DialogContent>
                        <DialogActions style={{padding: 20}}>
                            <MuiButton onClick={() => {
                                this.setState({openShareDocModal: false})
                            }} color="primary" style={{textTransform: "capitalize"}}>
                                Annuler
                            </MuiButton>
                            <MuiButton
                                disabled={(this.state.checkedNotif === true && this.state.msgNotif === "") || this.state.emailsDriveShare.length === 0}
                                onClick={() => {
                                    this.setState({loading: true, openShareDocModal: false})
                                    SmartService.share(this.state.selectedFile === "" ? this.state.selectedFolderId : this.state.selectedFile.id,
                                        {
                                            to: this.state.emailsDriveShare[0].email,
                                            access: {administrate: true, share: true, edit: false, read: true}
                                        },
                                        localStorage.getItem("token"), localStorage.getItem("usrtoken")).then(share => {
                                        if (share.succes === true && share.status === 200) {
                                            this.setState({loading: false, openShareDocModal: false})
                                            this.openSnackbar("success", this.state.selectedFile === "" ?
                                                "Le partage du dossier est effectué avec succès, Un mail d'invitation à été envoyé au personnes ajoutées" :
                                                "Le partage du fichier est effectué avec succès, Un mail d'invitation à été envoyé au personnes ajoutées")
                                        } else {
                                            console.log(share.error)
                                            this.setState({loading: false})
                                            this.openSnackbar("error", share.error)
                                        }

                                    }).catch(err => {
                                        this.setState({loading: false})
                                        console.log(err)
                                    })

                                }}
                                color="primary" variant="contained" style={{textTransform: "capitalize"}}>
                                Envoyer
                            </MuiButton>
                        </DialogActions>
                    </Dialog>


                    <Dialog open={this.state.openNewRoomModal} onClose={() => {
                        this.setState({openNewRoomModal: !this.state.openNewRoomModal})
                    }}
                            aria-labelledby="form-dialog-title">
                        <DialogTitle disableTypography id="form-dialog-title">
                            <Typography variant="h6">Créer Room</Typography>
                            <IconButton aria-label="close"
                                        style={{position: 'absolute', right: 5, top: 5, color: "#c0c0c0"}}
                                        onClick={() => {
                                            this.setState({openNewRoomModal: !this.state.openNewRoomModal})
                                        }}>
                                <CloseIcon/>
                            </IconButton>
                        </DialogTitle>

                        <DialogContent>
                            <div className="row">
                                <div className="col-md-2">
                                    <div style={{backgroundColor: "#f0f0f0", height: 48, borderRadius: 5, width: 60}}>
                                    </div>
                                </div>
                                <div className="col-md-10">
                                    <TextField id="room-name" label="Ajouter un titre" variant="filled"
                                               value={this.state.newRoomTitle}
                                               onChange={(event) => this.setState({newRoomTitle: event.target.value})}
                                               style={{width: 408, marginLeft: -5}} size="small"
                                    />
                                </div>
                                <div className="col-md-12" style={{marginTop: 25}}>
                                    <div>
                                        <Chips
                                            chips={this.state.NewRoomEmails}
                                            placeholder='Ajouter des personnes'
                                            save={data => {
                                                this.setState({NewRoomEmails: data})
                                            }}
                                            pattern={data.emailPatern}
                                            requiredMessage={"Email incorrect"}
                                            required={true}
                                            limit={20}
                                            limitMessage="Vous avez atteint le nombre maximal d'e-mails"
                                            onInputClick={(event) => {
                                                this.setState({anchorElContactsMenu: event.currentTarget})
                                            }}

                                        />
                                        <Menu
                                            id="add-person-room--menu"
                                            anchorEl={this.state.anchorElContactsMenu}
                                            keepMounted
                                            open={Boolean(this.state.anchorElContactsMenu)}
                                            onClose={() => this.setState({anchorElContactsMenu: null})}
                                        >
                                            {
                                                this.state.contacts.filter(x => x.role === "avocat").map((contact, key) =>
                                                    <MenuItem key={key} onClick={() => {
                                                        let emails = this.state.NewRoomEmails;
                                                        emails.push({
                                                            email: contact.email,
                                                            valid: true,
                                                            key: parseInt(moment().format("DDMMYYYYHHmmss"))
                                                        })
                                                        this.setState({
                                                            anchorElContactsMenu: null,
                                                            NewRoomEmails: emails
                                                        })
                                                    }}>
                                                        <ListItemIcon>
                                                            <Avatar src={contact.imageUrl}/>
                                                        </ListItemIcon>
                                                        <Typography
                                                            variant="inherit">{contact.prenom + " " + contact.nom}</Typography>
                                                    </MenuItem>
                                                )
                                            }
                                        </Menu>
                                    </div>
                                </div>

                                <div className="col-md-12" style={{marginTop: 20}}>
                                    <FormControlLabel
                                        control={<MuiCheckbox checked={this.state.newRoomCheck1}
                                                              onChange={() => this.setState({newRoomCheck1: !this.state.newRoomCheck1})}
                                                              name="checkedNewRoom1"
                                        />}
                                        label="Autoriser les personnes extérieures à votre organisation à rejoindre"
                                    />
                                </div>
                                <div className="col-md-12">
                                    <FormControlLabel
                                        control={<MuiCheckbox checked={this.state.newRoomCheck2}
                                                              onChange={() => this.setState({newRoomCheck2: !this.state.newRoomCheck2})}
                                                              name="checkedNewRoom2"
                                        />}
                                        label="Notifier par e-mail"
                                    />
                                </div>
                            </div>

                        </DialogContent>
                        <DialogActions style={{padding: 20}}>
                            <MuiButton onClick={() => {
                                this.setState({openNewRoomModal: false})
                            }} color="primary" style={{textTransform: "capitalize"}}>
                                Annuler
                            </MuiButton>
                            <MuiButton
                                disabled={this.state.newRoomTitle === "" || this.state.NewRoomEmails.length === 0}
                                onClick={() => {
                                    this.addNewRoom({
                                        title: this.state.newRoomTitle,
                                        members: this.state.NewRoomEmails,
                                        created_at: new Date().getTime()
                                    })
                                }}
                                color="primary" variant="contained" style={{textTransform: "capitalize"}}>
                                Créer
                            </MuiButton>
                        </DialogActions>
                    </Dialog>


                    <Dialog open={this.state.openAdvancedSearchModal} maxWidth="xl" onClose={() => {
                        this.setState({openAdvancedSearchModal: !this.state.openAdvancedSearchModal})
                    }}
                            aria-labelledby="form-dialog-title">
                        <DialogTitle disableTypography id="form-dialog-title">
                            <Typography variant="h6">Recherche avancée</Typography>
                            <IconButton aria-label="close"
                                        style={{position: 'absolute', right: 5, top: 5, color: "#c0c0c0"}}
                                        onClick={() => {
                                            this.setState({openAdvancedSearchModal: !this.state.openAdvancedSearchModal})
                                        }}>
                                <CloseIcon/>
                            </IconButton>
                        </DialogTitle>

                        <DialogContent>

                            <SearchClientsContainer societes={this.state.annuaire_clients_mondat}
                                                    contacts={this.state.contacts}
                                                    onSelectBtnClick={(client) => {
                                                        let obj = this.state.TimeSheet;
                                                        obj.newTime.client = client.ContactName;
                                                        let find_annuaire_fact_lead = this.state.annuaire_clients_mondat.find(x => x.ContactName === client.ContactName);
                                                        let partner_email = find_annuaire_fact_lead ? find_annuaire_fact_lead.facturation ? find_annuaire_fact_lead.facturation.collaborateur_lead : "" : "";

                                                        this.setState({
                                                            openAdvancedSearchModal: false,
                                                            partnerFacture:partner_email,
                                                            selectedClientTimeEntree: client.ContactName,
                                                            TimeSheet: obj
                                                        })
                                                    }}
                            />

                        </DialogContent>
                    </Dialog>

                    <Snackbar
                        open={this.state.openAlert}
                        autoHideDuration={5000}
                        onClose={this.closeSnackbar}
                    >
                        <Alert elevation={6} variant="filled" onClose={this.closeSnackbar}
                               severity={this.state.alertType}>
                            {this.state.alertMessage}
                        </Alert>
                    </Snackbar>

                    <Snackbar
                        open={this.state.openUploadToast}
                        onClose={this.closeUploadToastSnackbar}
                    >
                        <Alert elevation={6} variant="filled" onClose={this.closeUploadToastSnackbar} severity="">
                            {this.state.uploadToastMessage}
                        </Alert>
                    </Snackbar>

                </div>
            </div>
        )
    }
}