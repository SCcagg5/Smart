import React from 'react';
import firebase from 'firebase';
import 'firebase/database';
import SmartService from '../../provider/SmartService';
import moment from 'moment';
import FolderIcon from '@material-ui/icons/Folder';
import TopBar from '../../components/TopBar/TopBar';
import SideMenu from '../../components/SideMenu/SideMenu';
import data from '../../data/Data';
import MuiBackdrop from '../../components/Loading/MuiBackdrop';
import LeftMenuV3 from '../../components/Menu/LeftMenuV3';
import { Route, Switch } from 'react-router-dom';
import MuiSwitch from '@material-ui/core/Switch';
import Rooms from '../Rooms/Rooms';
import maillingService from '../../provider/customEmailService';
import IconButton from '@material-ui/core/IconButton';
import AutorenewIcon from '@material-ui/icons/Autorenew';
import Drawer from '@material-ui/core/Drawer';
import FindInPageOutlinedIcon from '@material-ui/icons/FindInPageOutlined';
import CloudDownloadOutlinedIcon from '@material-ui/icons/CloudDownloadOutlined';
import PersonAddOutlinedIcon from '@material-ui/icons/PersonAddOutlined';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import DateRangeOutlinedIcon from '@material-ui/icons/DateRangeOutlined';
import CircularProgress from '@material-ui/core/CircularProgress';
import { Modal, ModalBody, ModalHeader } from 'reactstrap';
import PDFViewer from '../../customComponents/pdf-viewer-reactjs';
import { isEmail, ReactMultiEmail } from 'react-multi-email';
import '../../assets/css/multiEmail.css';
import { Avatar, Button as MuiButton, Checkbox as MuiCheckbox, Chip, Input, MenuItem, Select as MuiSelect, FormControl, InputLabel, } from '@material-ui/core';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import DialogContent from '@material-ui/core/DialogContent';
import Chips from '../../components/EmailsInputChips/Chips';
import Autocomplete from '@material-ui/lab/Autocomplete';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import PictureAsPdfIcon from '@material-ui/icons/PictureAsPdf';
import DialogActions from '@material-ui/core/DialogActions';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import Menu from '@material-ui/core/Menu';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import SearchClientsContainer from '../../components/Search/SearchClientsContainer';
import Snackbar from '@material-ui/core/Snackbar';
import Alert from '@material-ui/lab/Alert';
import ViewComfyIcon from '@material-ui/icons/ViewComfy';
import ListIcon from '@material-ui/icons/List';
import SearchResults from '../../components/Search/SearchResults';
import ListFolders from '../../components/List/ListFolders';
import ListDocs from '../../components/List/ListDocs';
import { FileUploader } from 'baseui/file-uploader';
import axios from 'axios';
import FolderDetail from '../Drive/FolderDetail';
import TableContact from '../../components/Tables/TableContact';
import { Tab, TabList, TabPanel, Tabs } from 'react-tabs';
import InputAdornment from '@material-ui/core/InputAdornment';
import 'react-tabs/style/react-tabs.css';
import entIcon from '../../assets/images/entreprise-icon.png';
import userAvatar from '../../assets/images/users/user4.jpg';
import Data from '../../data/Data';
import CB from '@material-ui/core/Checkbox';
import Autosuggest from 'react-autosuggest';
import '../../assets/css/inputSuggestion.css';
import '../../assets/css/react-select-search.css';
import Timer from 'react-compound-timer';
import SelectSearch from 'react-select-search';
import SearchIcon from '@material-ui/icons/Search';
import DatePicker from 'react-date-picker';
import calendar from '../../assets/icons/calendar_icon.jpg';
import AtlButton, { ButtonGroup as AltButtonGroup } from '@atlaskit/button';
import TableTimeSheet from '../../components/Tables/TableTimeSheet';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import main_functions from '../../controller/main_functions';
import DescriptionIcon from '@material-ui/icons/Description';
import TableFactures from '../../components/Tables/TableFactures';
import xlsxParser from 'xlsx-parse-json';
import Slide from "@material-ui/core/Slide";
import Facturation from "../Facturation/Facturation"
import TablePatientsBrainy from "../../components/Tables/TablePatientsBrainy";
import QuestionService from "../../provider/webserviceQuestions";
import PatientService from "../../provider/patientservice";
import recetteService from "../../provider/RecetteService";
import  bodyHomme from "../../assets/images/bodyHomme.png"
import edit from '../../assets/icons/edit.svg';
import time from '../../assets/icons/time.svg';
import money from '../../assets/icons/money.svg';
import play from '../../assets/icons/play.svg';
import down from '../../assets/icons/down.svg';
import  bascule from "../../assets/images/bascule.png"
import pluss from '../../assets/icons/pluss.svg';
import back from '../../assets/icons/back.svg';
import magazine from "../../assets/images/magazine.jpg"
import hourglass from "../../assets/images/hourglass.svg"
import chef_hat from "../../assets/images/chef_hat.svg"
import OutlinedInput from '@material-ui/core/OutlinedInput';
import { Line } from 'react-chartjs-2';
import { Button } from 'baseui/button';
import BT from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import HSBar from 'react-horizontal-stacked-bar-chart';
import TableTimeSheetDashboard from '../../components/Tables/TableDashboardTimeSheet';
import { Select } from 'baseui/select';
import countryList from "../../tools/countryList";
import defaultAvatar from '../../assets/images/users/default_avatar.jpg';
import Staricon from '@material-ui/icons/Star';
import CheckCircle from '@material-ui/icons/CheckCircle';
import MoodIcon from '@material-ui/icons/Mood';
import RecetteDetail from "../Recettes/RecetteDetail";
import ClampLines from 'react-clamp-lines';

const url=process.env.REACT_APP_JAWHER_API_ENDPOINT
const question1food1me=process.env.REACT_APP_question1food1me
const bodycheckQuestion=process.env.REACT_APP_bodycheckQuestion
const ged_id = process.env.REACT_APP_GED_ID;
//const ent_name = process.env.REACT_APP_ENT_NAME;
const firebase_ent_begin_name = process.env.REACT_APP_ENT_FIREBASE_BEGIN_NAME;
const meet_url = process.env.REACT_APP_MEET_URL;
const ent_type = "food"

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default class Main extends React.Component {

  imageUpload = {};
  folderupload = {};

  state = {
    logo:localStorage.getItem("logo"),

    loading: true,
    firstLoading: true,

    openAlert: false,
    alertMessage: '',
    alertType: '',
    openUploadToast: false,
    uploadToastMessage: '',

    anchorEl: null,
    anchorElMenu: null,
    anchorElContactsMenu: null,

    openRightMenu: false,
    openSideMenu: false,

    showPDFModal: false,
    pdfURL: '',

    uploadedName: '',
    signDoc: 'true',
    inviteEmails: [],

    selectedDoc: '',
    folders: [],
    reelFolders: [],
    sharedFolders: [],
    sharedReelFolders: [],
    rootFiles: [],
    rootFolders: [],
    sharedRootFolders: [],
    sharedRootFiles: [],

    selectedFoldername: '',
    breadcrumbs: '',
    selectedFolder: '',
    selectedFolderId: '',
    selectedFile: '',
    selectedFolderFiles: [],
    selectedFolderFolders: [],

    selectedSharedFolder:'',
    selectedSharedFolderId: '',
    selectedSharedFoldername:'',
    selectedSharedFolderFiles: [],
    selectedSharedFolderFolders: [],

    showNewDocScreen: false,
    newFolderModal: false,

    showModalAdd: false,

    newFolderName: '',
    newFolderFromRacine: false,
    newFileFromRacine: false,
    loadDocSpinner: false,

    openDriveMenuItem: true,
    openMeetMenuItem: false,
    openRoomMenuItem: false,
    openContactsMenu: false,
    openSocietyMenuItem: false,
    openTimeSheetsMenu: false,
    openMarketplaceMenuItem:false,

    showContainerSection: 'Drive',
    selectedDriveItem: [],
    expandedDriveItems: [],
    expandedDriveSharedItems:[],
    autoExpandParent: true,
    autoExpandSharedParent:true,
    selectedMeetMenuItem: ['new'],
    selectedSocietyMenuItem: ['clients_mondat'],
    selectedContactsMenuItem: ['aia'],
    selectedTimeSheetMenuItem: ['dashboard'],
    selectedMarketplaceMenuItem:['recettes'],

    selectedSociete: '',
    selectedSocieteKey: '',

    showInviteModal: false,
    meetCode: '',
    mondat: {
      typeDossier: '',
      DescriptionProjet: '',
      DossierLBA: '',
      PersonneChargePrincipale: {
        prenom: '',
        nom: '',
        email: '',
        telephone: '',
        adresse: ''
      },
      PersonneChargeReglement: {
        prenom: '',
        nom: '',
        email: '',
        telephone: '',
        adresse: ''
      },
      autrePartie: '',
      contrePartie: '',
      Apporteur: '',
      collablead: '',
      collabteam: [],
      tauxHoraireCollab: '',
      facturationClient: {
        parEmail: true,
        parCourrier: '',
        frequence: '',
        EnvoyeParSecretariat: '',
        EnvoyeAvocat: '',
        LangueFacturation: '',
        Mode: ''
      }
    },
    contacts: [],
    societes: [],
    annuaire_clients_mondat: [],
    rooms: [],
    selectedContact: '',
    selectedContactKey: '',
    editContactForm: false,
    editSocieteForm: false,

    openShareDocModal: false,
    checkedNotif: true,
    msgNotif: '',
    emailsDriveShare: [],

    focusedItem: 'Drive', // => Drive || Rooms || Meet || Contacts
    expandedRoomItems: ['0'],

    viewMode: 'list',

    domaine:{
      domaine:"",
      specialite:[],
    },

    selectedRoomItems: ['0'],
    openNewRoomModal: false,
    newRoomTitle: '',
    newRoomCheck1: false,
    newRoomCheck2: true,
    NewRoomEmails: [],
    selectedRoom: '',
    selectedRoomKey: 0,

    textSearch: '',
    searchSociete: '',
    TimeSheet: {
      newTime: {
        duree: '',
        client: '',
        dossier_client: {
          name:'',
          facturation: {
            language:''
          },
        },
        langue:'',
        categoriesActivite: 'Temps facturé',
        description: '',
        date: new Date(),
        utilisateurOA: '',
        rateFacturation: ''
      }
    },
    lignesFactures: [],
    lignesFacturesCopy: [],
    lignef_template: '0',
    TimeSheetData: [],
    DashboardPerson: {
      person: ''
    },

    openAdvancedSearchModal: false,
    selectedClientTimeEntree: '',

    showLignesFactureClient: false,
    dateFacture: new Date(),

    timeSuggestions: [],
    timeSuggValue: '',

    openNewDocModal: false,
    openNewClientModal: false,

    newClient: {
      ID: '',
      nom: '',
      prenom:'',
      Type: '0',
      created_at: '',
      country: '',
      email: '',
      phone: '',
      isActif: true
    },
    newContact: {
      uid: '',
      nom: '',
      prenom: '',
      email: '',
      phone: '',
      rateFacturation:'',
      type: 'associe',
      created_at: ''
    },
    newClientFolder: {
      nom: '',
      type: 'corporate',
      team: [],
      contrepartie:'',
      autrepartie:'',
      desc:'',
      byEmail:true,
      sentBySecr:false,
      sentByAvocat:false,
      frequence:'',
      language:"Francais"
    },
    lead_contact_tmp: '',
    lead_contact_horaire_tmp: '',
    team_contact_tmp: '',
    clients_tempo: [],
    clients_tempo_copie: [],

    selectedTimeSheetIndex:0,
    selectedClientFolders:[],
    facturesToValidated:[],
    facturesToValidatedCopy:[],

    openImportAlertModal:false,

    recettes:[],
    patients:[],
    percentage:"",
    dataLength:"",
    plat:{
      dej:true,
      dess:true

    },
    selectedRecette:"",
    selectedRecetteIngredients:[],

    openAddContactModal:false
  };

  componentDidMount() {

    window.onpopstate = () => {


      if (this.props.location.pathname.indexOf('/home/drive/') > -1) {

        let folder_id = this.props.location.pathname.replace('/home/drive/', '');

        this.setState({
          autoExpandParent: true,
          showContainerSection: 'Drive',
          focusedItem: 'Drive',
          selectedDriveItem: [folder_id],
          expandedDriveItems: [folder_id],
          breadcrumbs: main_functions.getBreadcumpsPath(folder_id, this.state.reelFolders),
          selectedFolderFiles: main_functions.getFolderFilesById(folder_id, this.state.reelFolders),
          selectedFolderFolders: main_functions.getFolderFoldersById(folder_id, this.state.reelFolders),
          selectedFolderId: folder_id
        });

      } else if (this.props.location.pathname.indexOf('/home/drive') > -1) {
        this.setState({
          showContainerSection: 'Drive',
          focusedItem: 'Drive',
          selectedDriveItem: [],
          expandedDriveItems: []
        });
      } else if (this.props.location.pathname.indexOf('/home/rooms/') > -1) {

        let room_id = this.props.location.pathname.replace('/home/rooms/', '');
        this.setState({
          showContainerSection: 'Rooms',
          focusedItem: 'Rooms',
          selectedRoomItems: [room_id],
          expandedRoomItems: [room_id],
          openRoomMenuItem: true
        });

      } else if (this.props.location.pathname.indexOf('/home/rooms') > -1) {
        this.setState({
          showContainerSection: 'Rooms',
          focusedItem: 'Rooms',
          selectedRoomItems: [],
          expandedRoomItems: [],
          openRoomMenuItem: true
        });
      } else if (this.props.location.pathname === '/home/meet/new') {
        this.setState({
          showContainerSection: 'Meet',
          focusedItem: 'Meet',
          selectedMeetMenuItem: ['new'],
          openMeetMenuItem: true
        });
      } else if (this.props.location.pathname === '/home/meet/rejoin') {
        this.setState({
          showContainerSection: 'Meet',
          focusedItem: 'Meet',
          selectedMeetMenuItem: ['rejoin'],
          openMeetMenuItem: true
        });
      } else if (this.props.location.pathname.indexOf('/home/contacts') > -1) {

        this.setState({
          showContainerSection: 'Contacts',
          focusedItem: 'Contacts',
          openContactsMenu: true
        });
      } else if (this.props.location.pathname.indexOf('/home/clients') > -1) {

        this.setState({
          showContainerSection: 'Societe',
          focusedItem: 'Societe',
          selectedSocietyMenuItem: ['clients_mondat'],
          openSocietyMenuItem: true
        });
      } else if (this.props.location.pathname === '/home/timeSheet/activities') {
        this.setState({
          showContainerSection: 'TimeSheet',
          focusedItem: 'TimeSheet',
          selectedTimeSheetMenuItem: ['activities'],
          openTimeSheetsMenu: true
        });
      } else if (this.props.location.pathname === '/home/timeSheet/dashboard') {
        this.setState({
          showContainerSection: 'TimeSheet',
          focusedItem: 'TimeSheet',
          selectedTimeSheetMenuItem: ['dashboard'],
          openTimeSheetsMenu: true
        });
      } else if (this.props.location.pathname === '/home/timeSheet/dashboardPerson') {
        this.setState({
          showContainerSection: 'TimeSheet',
          focusedItem: 'TimeSheet',
          selectedTimeSheetMenuItem: ['dashboardPerson'],
          openTimeSheetsMenu: true
        });
      } else if (this.props.location.pathname === '/home/timeSheet/dashboardProject') {
        this.setState({
          showContainerSection: 'TimeSheet',
          focusedItem: 'TimeSheet',
          selectedTimeSheetMenuItem: ['dashboardProject'],
          openTimeSheetsMenu: true
        });
      } else if (this.props.location.pathname.indexOf('/home/search/') > -1) {
        this.setState({
          showContainerSection: 'Drive',
          focusedItem: 'Drive',
          selectedDriveItem: [],
          expandedDriveItems: []
        });
      } else if(this.props.location.pathname === '/home/marketplace/recettes'){

        this.setState({
          showContainerSection: 'marketplace',
          focusedItem: 'marketplace',
          selectedMarketplaceMenuItem: ['recettes'],
          openMarketplaceMenuItem: true
        })
      }

    };

    if (localStorage.getItem('email') === undefined || localStorage.getItem('email') === null) {
      this.props.history.push('/login');
    } else {
      let sharedFolders = [];

      this.setState({ firstLoading: true });

      setTimeout(() => {
        SmartService.getGed(
          localStorage.getItem('token'),
          localStorage.getItem('usrtoken')
        )
          .then((gedRes) => {
            if (gedRes.succes === true && gedRes.status === 200) {

              this.getRecettes()
              this.getpatient();

              let parentSharedFolder = [{
                id:"parent",
                name:"Partagés avec moi",
                Content:{
                  files:[],
                  folders:[]
                }

              }]
              parentSharedFolder[0].Content.folders = gedRes.data.Shared.Content.folders || []
              sharedFolders = main_functions.changeStructure(parentSharedFolder)

              let client_folder = gedRes.data.Proprietary.Content.folders.find((x) => x.name === 'CLIENTS');
              let recette_folder = gedRes.data.Proprietary.Content.folders.find((x) => x.name === 'RECETTES');
              if (client_folder) {
                localStorage.setItem('client_folder_id', client_folder.id);
                this.setState({client_folders:client_folder})
              }
              if (recette_folder) {
                localStorage.setItem('recette_folder_id', recette_folder.id);
                console.log(recette_folder.id);
              }
              let meeturl = meet_url + '_' + moment().format('DDMMYYYYHHmmss');

              firebase.database().ref('/').on('value', (snapshot) => {
                  const data = snapshot.val() || [];
                  let contacts = data[firebase_ent_begin_name+"-contacts-"+ged_id] || [];
                  let rooms = data[firebase_ent_begin_name+"-rooms-"+ged_id] || [];

                  let societes = data.societes || [];

                  let annuaire_clients_mondat = data[firebase_ent_begin_name+"-clients-"+ged_id] || [];


                  let lignes_f = data[firebase_ent_begin_name+"-lignes_f-"+ged_id] || [];
                  let clients_tempo = (data[firebase_ent_begin_name+"-clients_tempo-"+ged_id] || []).filter(x => x.email === localStorage.getItem("email"));
                  let clients_tempo_copie = data[firebase_ent_begin_name+"-clients_tempo-"+ged_id] || [];
                  let facturesToValidated = data[firebase_ent_begin_name+"-factures_to_Validated-"+ged_id] || []
                  let facturesToValidatedCopy = data[firebase_ent_begin_name+"-factures_to_Validated-"+ged_id] || []


                  this.setState({
                    contacts: contacts,
                    societes: societes,
                    annuaire_clients_mondat: annuaire_clients_mondat,
                    rooms: rooms,
                    lignesFactures: lignes_f,
                    lignesFacturesCopy: lignes_f,
                    clients_tempo: clients_tempo,
                    clients_tempo_copie: clients_tempo_copie,
                    facturesToValidated:facturesToValidated,
                    facturesToValidatedCopy:facturesToValidatedCopy
                  });

                  let connected_email = localStorage.getItem("email");
                  let oa_contact = main_functions.getOAContactByEmail2(contacts,connected_email);
                  if(oa_contact){
                    this.setState({
                      TimeSheet: {
                        newTime: {
                          duree: '',
                          client: '',
                          dossier_client: {
                            facturation: {
                              language:''
                            },
                          },
                          langue:'',
                          categoriesActivite: 'Temps facturé',
                          description: '',
                          date: new Date(),
                          utilisateurOA: connected_email,
                          rateFacturation: oa_contact.rateFacturation || ""
                        }
                      },
                    })
                  }

                  let sharedFiles = gedRes.data.Shared.Content.files || [];

                  if (this.props.location.pathname.indexOf('/home/drive/') > -1) {
                    let folders = gedRes.data.Proprietary.Content.folders || [];
                    let folder_id = this.props.location.pathname.replace('/home/drive/', '');
                    let folder_name = main_functions.getFolderNameById(folder_id, folders);
                    if (folder_name !== undefined && folder_name !== null) {
                      this.setState({
                        folders:main_functions.changeStructure(gedRes.data.Proprietary.Content.folders || []),
                        reelFolders: gedRes.data.Proprietary.Content.folders || [],
                        sharedReelFolders: gedRes.data.Shared.Content.folders || [],
                        rootFiles: gedRes.data.Proprietary.Content.files || [],
                        rootFolders: gedRes.data.Proprietary.Content.folders || [],
                        sharedRootFiles: sharedFiles,
                        sharedFolders: sharedFolders,
                        selectedDriveItem: [folder_id],
                        expandedDriveItems: [folder_id],
                        selectedFoldername: folder_name,
                        breadcrumbs: main_functions.getBreadcumpsPath(folder_id, folders),
                        selectedFolderId: folder_id,
                        meeturl: meeturl,
                        selectedRoom: rooms.length > 0 ? rooms[0] : '',
                        selectedFolderFiles: main_functions.getFolderFilesById(folder_id, folders),
                        selectedFolderFolders: main_functions.getFolderFoldersById(folder_id, folders),
                        firstLoading: false,
                        loading: false
                      });
                    } else {
                      console.log('ERROR FOLDER ID');
                      this.props.history.push("/home/drive")
                      this.componentDidMount();
                    }
                  }
                  else if (this.props.location.pathname.indexOf('/home/drive') > -1) {
                    this.setState({
                      rootFiles: gedRes.data.Proprietary.Content.files || [],
                      rootFolders: gedRes.data.Proprietary.Content.folders || [],
                      folders: main_functions.changeStructure(gedRes.data.Proprietary.Content.folders || []),
                      reelFolders: gedRes.data.Proprietary.Content.folders || [],
                      sharedReelFolders: gedRes.data.Shared.Content.folders || [],
                      selectedDriveItem: [],
                      expandedDriveItems: [],
                      sharedFolders: sharedFolders,
                      sharedRootFiles: sharedFiles,
                      meeturl: meeturl,
                      contacts: contacts,
                      societes: societes,
                      annuaire_clients_mondat: annuaire_clients_mondat,
                      rooms: rooms,
                      selectedRoom: rooms.length > 0 ? rooms[0] : '',
                      firstLoading: false,
                      loading: false
                    });
                  }
                  else if (this.props.location.pathname === '/home/shared/parent') {
                    this.setState({
                      rootFiles: gedRes.data.Proprietary.Content.files || [],
                      rootFolders: gedRes.data.Proprietary.Content.folders || [],
                      folders: main_functions.changeStructure(gedRes.data.Proprietary.Content.folders || []),
                      reelFolders: gedRes.data.Proprietary.Content.folders || [],
                      sharedReelFolders: gedRes.data.Shared.Content.folders || [],
                      selectedDriveItem: [],
                      expandedDriveItems: [],
                      selectedDriveSharedItem:['parent'],
                      expandedDriveSharedItems:['parent'],
                      sharedFolders: sharedFolders,
                      sharedRootFiles: sharedFiles,
                      meeturl: meeturl,
                      contacts: contacts,
                      societes: societes,
                      annuaire_clients_mondat: annuaire_clients_mondat,
                      rooms: rooms,
                      selectedRoom: rooms.length > 0 ? rooms[0] : '',
                      breadcrumbs: 'Mon drive / Partagés avec moi',
                      firstLoading: false,
                      loading: false
                    });
                  }
                  else if (this.props.location.pathname.indexOf('/home/rooms/') > -1) {
                    if (rooms.length > 0) {
                      let room_id = this.props.location.pathname.replace('/home/rooms/', '');
                      this.setState({
                        showContainerSection: 'Rooms',
                        focusedItem: 'Rooms',
                        selectedRoomItems: [room_id],
                        expandedRoomItems: [room_id],
                        openRoomMenuItem: true,
                        rootFiles: gedRes.data.Proprietary.Content.files || [],
                        rootFolders: gedRes.data.Proprietary.Content.folders || [],
                        folders: main_functions.changeStructure(gedRes.data.Proprietary.Content.folders || []),
                        reelFolders: gedRes.data.Proprietary.Content.folders || [],
                        sharedReelFolders: gedRes.data.Shared.Content.folders || [],
                        sharedFolders: sharedFolders,
                        sharedRootFiles: sharedFiles,
                        meeturl: meeturl,
                        rooms: rooms,
                        selectedRoom: rooms[room_id],
                        firstLoading: false,
                        loading: false
                      });
                    } else {
                      this.props.history.push('/home/rooms');
                      this.setState({
                        showContainerSection: 'Rooms',
                        focusedItem: 'Rooms',
                        selectedRoomItems: [],
                        expandedRoomItems: [],
                        openRoomMenuItem: true,
                        rootFiles: gedRes.data.Proprietary.Content.files || [],
                        rootFolders: gedRes.data.Proprietary.Content.folders || [],
                        folders: main_functions.changeStructure(gedRes.data.Proprietary.Content.folders || []),
                        reelFolders: gedRes.data.Proprietary.Content.folders || [],
                        sharedReelFolders: gedRes.data.Shared.Content.folders || [],
                        sharedFolders: sharedFolders,
                        sharedRootFiles: sharedFiles,
                        meeturl: meeturl,
                        rooms: rooms,
                        selectedRoom: '',
                        firstLoading: false,
                        loading: false
                      });
                    }
                  } else if (this.props.location.pathname === '/home/meet/new') {
                    this.setState({
                      showContainerSection: 'Meet',
                      focusedItem: 'Meet',
                      selectedMeetMenuItem: ['new'],
                      openMeetMenuItem: true,
                      rootFiles: gedRes.data.Proprietary.Content.files || [],
                      rootFolders: gedRes.data.Proprietary.Content.folders || [],
                      folders: main_functions.changeStructure(gedRes.data.Proprietary.Content.folders || []),
                      reelFolders: gedRes.data.Proprietary.Content.folders || [],
                      sharedReelFolders: gedRes.data.Shared.Content.folders || [],
                      sharedFolders: sharedFolders,
                      sharedRootFiles: sharedFiles,
                      meeturl: meeturl,
                      contacts: contacts,
                      societes: societes,
                      annuaire_clients_mondat: annuaire_clients_mondat,
                      rooms: rooms,
                      selectedRoom: rooms.length > 0 ? rooms[0] : '',
                      firstLoading: false,
                      loading: false
                    });
                  } else if (this.props.location.pathname === '/home/meet/rejoin') {
                    this.setState({
                      showContainerSection: 'Meet',
                      focusedItem: 'Meet',
                      selectedMeetMenuItem: ['rejoin'],
                      openMeetMenuItem: true,
                      rootFiles: gedRes.data.Proprietary.Content.files || [],
                      rootFolders: gedRes.data.Proprietary.Content.folders || [],
                      folders: main_functions.changeStructure(gedRes.data.Proprietary.Content.folders || []),
                      reelFolders: gedRes.data.Proprietary.Content.folders || [],
                      sharedReelFolders: gedRes.data.Shared.Content.folders || [],
                      sharedFolders: sharedFolders,
                      sharedRootFiles: sharedFiles,
                      meeturl: meeturl,
                      contacts: contacts,
                      societes: societes,
                      annuaire_clients_mondat: annuaire_clients_mondat,
                      rooms: rooms,
                      selectedRoom: rooms.length > 0 ? rooms[0] : '',
                      firstLoading: false,
                      loading: false
                    });
                  } else if (this.props.location.pathname.indexOf('/home/contacts') > -1) {
                    if (this.props.location.pathname.indexOf('/home/contacts/') > -1) {
                      let contact_id = this.props.location.pathname.replace('/home/contacts/', '');
                      let contact = main_functions.getOAContactByUid(contacts,contact_id);
                      if (contact) {
                        this.setState({
                          selectedContact: contact,
                          selectedContactKey: contact_id,
                          showContainerSection: 'Contacts',
                          focusedItem: 'Contacts',
                          openContactsMenu: true,
                          rootFiles: gedRes.data.Proprietary.Content.files || [],
                          rootFolders: gedRes.data.Proprietary.Content.folders || [],
                          folders: main_functions.changeStructure(gedRes.data.Proprietary.Content.folders || []),
                          reelFolders: gedRes.data.Proprietary.Content.folders || [],
                          sharedReelFolders: gedRes.data.Shared.Content.folders || [],
                          sharedFolders: sharedFolders,
                          sharedRootFiles: sharedFiles,
                          meeturl: meeturl,
                          contacts: contacts,
                          societes: societes,
                          annuaire_clients_mondat: annuaire_clients_mondat,
                          rooms: rooms,
                          selectedRoom: rooms.length > 0 ? rooms[0] : '',
                          firstLoading: false,
                          loading: false
                        });
                      } else {
                        this.props.history.push('/');
                      }

                    } else {
                      this.setState({
                        showContainerSection: 'Contacts',
                        focusedItem: 'Contacts',
                        openContactsMenu: true,
                        rootFiles: gedRes.data.Proprietary.Content.files || [],
                        rootFolders: gedRes.data.Proprietary.Content.folders || [],
                        folders: main_functions.changeStructure(gedRes.data.Proprietary.Content.folders || []),
                        reelFolders: gedRes.data.Proprietary.Content.folders || [],
                        sharedReelFolders: gedRes.data.Shared.Content.folders || [],
                        sharedFolders: sharedFolders,
                        sharedRootFiles: sharedFiles,
                        meeturl: meeturl,
                        contacts: contacts,
                        societes: societes,
                        annuaire_clients_mondat: annuaire_clients_mondat,
                        rooms: rooms,
                        selectedRoom: rooms.length > 0 ? rooms[0] : '',
                        firstLoading: false,
                        loading: false
                      });
                    }

                  } else if (this.props.location.pathname.indexOf('/home/clients') > -1) {
                    if (this.props.location.pathname.indexOf('/home/clients/') > -1) {
                      let client_id = this.props.location.pathname.replace('/home/clients/', '');
                      let client = annuaire_clients_mondat.find(x => x.ID === client_id);
                      if (client) {
                        this.setState({
                          selectedSociete: client,
                          selectedSocieteKey: client_id,
                          showContainerSection: 'Societe',
                          focusedItem: 'Societe',
                          selectedSocietyMenuItem: ['clients_mondat'],
                          openSocietyMenuItem: true,
                          rootFiles: gedRes.data.Proprietary.Content.files || [],
                          rootFolders: gedRes.data.Proprietary.Content.folders || [],
                          folders: main_functions.changeStructure(gedRes.data.Proprietary.Content.folders || []),
                          reelFolders: gedRes.data.Proprietary.Content.folders || [],
                          sharedReelFolders: gedRes.data.Shared.Content.folders || [],
                          sharedFolders: sharedFolders,
                          sharedRootFiles: sharedFiles,
                          meeturl: meeturl,
                          contacts: contacts,
                          societes: societes,
                          annuaire_clients_mondat: annuaire_clients_mondat,
                          rooms: rooms,
                          selectedRoom: rooms.length > 0 ? rooms[0] : '',
                          firstLoading: false,
                          loading: false
                        });
                      } else {

                      }

                    } else {
                      this.setState({
                        showContainerSection: 'Societe',
                        focusedItem: 'Societe',
                        selectedSocietyMenuItem: ['clients_mondat'],
                        openSocietyMenuItem: true,
                        rootFiles: gedRes.data.Proprietary.Content.files || [],
                        rootFolders: gedRes.data.Proprietary.Content.folders || [],
                        folders: main_functions.changeStructure(gedRes.data.Proprietary.Content.folders || []),
                        reelFolders: gedRes.data.Proprietary.Content.folders || [],
                        sharedReelFolders: gedRes.data.Shared.Content.folders || [],
                        sharedFolders: sharedFolders,
                        sharedRootFiles: sharedFiles,
                        meeturl: meeturl,
                        contacts: contacts,
                        societes: societes,
                        annuaire_clients_mondat: annuaire_clients_mondat,
                        rooms: rooms,
                        selectedRoom: rooms.length > 0 ? rooms[0] : '',
                        firstLoading: false,
                        loading: false
                      });
                    }

                  } else if (this.props.location.pathname === '/home/timeSheet/activities') {
                    this.setState({
                      showContainerSection: 'TimeSheet',
                      focusedItem: 'TimeSheet',
                      selectedTimeSheetMenuItem: ['activities'],
                      openTimeSheetsMenu: true,
                      rootFiles: gedRes.data.Proprietary.Content.files || [],
                      rootFolders: gedRes.data.Proprietary.Content.folders || [],
                      folders: main_functions.changeStructure(gedRes.data.Proprietary.Content.folders || []),
                      reelFolders: gedRes.data.Proprietary.Content.folders || [],
                      sharedReelFolders: gedRes.data.Shared.Content.folders || [],
                      sharedFolders: sharedFolders,
                      sharedRootFiles: sharedFiles,
                      meeturl: meeturl,
                      contacts: contacts,
                      societes: societes,
                      annuaire_clients_mondat: annuaire_clients_mondat,
                      rooms: rooms,
                      selectedRoom: rooms.length > 0 ? rooms[0] : '',
                      firstLoading: false,
                      loading: false
                    });
                  } else if (this.props.location.pathname === '/home/timeSheet/dashboard') {
                    this.setState({
                      showContainerSection: 'TimeSheet',
                      focusedItem: 'TimeSheet',
                      selectedTimeSheetMenuItem: ['dashboard'],
                      openTimeSheetsMenu: true,
                      rootFiles: gedRes.data.Proprietary.Content.files || [],
                      rootFolders: gedRes.data.Proprietary.Content.folders || [],
                      folders: main_functions.changeStructure(gedRes.data.Proprietary.Content.folders || []),
                      reelFolders: gedRes.data.Proprietary.Content.folders || [],
                      sharedReelFolders: gedRes.data.Shared.Content.folders || [],
                      sharedFolders: sharedFolders,
                      sharedRootFiles: sharedFiles,
                      meeturl: meeturl,
                      contacts: contacts,
                      societes: societes,
                      annuaire_clients_mondat: annuaire_clients_mondat,
                      rooms: rooms,
                      selectedRoom: rooms.length > 0 ? rooms[0] : '',
                      firstLoading: false,
                      loading: false
                    });
                  } else if (this.props.location.pathname === '/home/timeSheet/dashboardPerson') {
                    this.setState({
                      showContainerSection: 'TimeSheet',
                      focusedItem: 'TimeSheet',
                      selectedTimeSheetMenuItem: ['dashboardPerson'],
                      openTimeSheetsMenu: true,
                      rootFiles: gedRes.data.Proprietary.Content.files || [],
                      rootFolders: gedRes.data.Proprietary.Content.folders || [],
                      folders: main_functions.changeStructure(gedRes.data.Proprietary.Content.folders || []),
                      reelFolders: gedRes.data.Proprietary.Content.folders || [],
                      sharedReelFolders: gedRes.data.Shared.Content.folders || [],
                      sharedFolders: sharedFolders,
                      sharedRootFiles: sharedFiles,
                      meeturl: meeturl,
                      contacts: contacts,
                      societes: societes,
                      annuaire_clients_mondat: annuaire_clients_mondat,
                      rooms: rooms,
                      selectedRoom: rooms.length > 0 ? rooms[0] : '',
                      firstLoading: false,
                      loading: false
                    });
                  } else if (this.props.location.pathname === '/home/timeSheet/dashboardProject') {
                    this.setState({
                      showContainerSection: 'TimeSheet',
                      focusedItem: 'TimeSheet',
                      selectedTimeSheetMenuItem: ['dashboardProject'],
                      openTimeSheetsMenu: true,
                      rootFiles: gedRes.data.Proprietary.Content.files || [],
                      rootFolders: gedRes.data.Proprietary.Content.folders || [],
                      folders: main_functions.changeStructure(gedRes.data.Proprietary.Content.folders || []),
                      reelFolders: gedRes.data.Proprietary.Content.folders || [],
                      sharedReelFolders: gedRes.data.Shared.Content.folders || [],
                      sharedFolders: sharedFolders,
                      sharedRootFiles: sharedFiles,
                      meeturl: meeturl,
                      contacts: contacts,
                      societes: societes,
                      annuaire_clients_mondat: annuaire_clients_mondat,
                      rooms: rooms,
                      selectedRoom: rooms.length > 0 ? rooms[0] : '',
                      firstLoading: false,
                      loading: false
                    });
                  } else if (this.props.location.pathname.indexOf("/home/marketplace/recettes/") > -1) {

                    let recette_id = this.props.location.pathname.replace('/home/marketplace/recettes/', '');

                    recetteService.getRecettebyID(recette_id).then(res1=> {
                      recetteService.getIngredientID(recette_id).then(res2=>{

                        this.setState({
                          selectedRecette:res1[0],
                          selectedRecetteIngredients:res2,
                          showContainerSection: 'marketplace',
                          focusedItem: 'marketplace',
                          selectedMarketplaceMenuItem: ['recettes'],
                          openMarketplaceMenuItem: true,
                          rootFiles: gedRes.data.Proprietary.Content.files || [],
                          rootFolders: gedRes.data.Proprietary.Content.folders || [],
                          folders: main_functions.changeStructure(gedRes.data.Proprietary.Content.folders || []),
                          reelFolders: gedRes.data.Proprietary.Content.folders || [],
                          sharedReelFolders: gedRes.data.Shared.Content.folders || [],
                          sharedFolders: sharedFolders,
                          sharedRootFiles: sharedFiles,
                          meeturl: meeturl,
                          rooms: rooms,
                          selectedRoom: rooms.length > 0 ? rooms[0] : '',
                          firstLoading: false,
                          loading: false
                        });
                      })
                    })
                  }
                  else if(this.props.location.pathname.indexOf("/home/marketplace/recettes") > -1 ){
                    this.setState({
                      showContainerSection: 'marketplace',
                      focusedItem: 'marketplace',
                      selectedMarketplaceMenuItem: ['recettes'],
                      openMarketplaceMenuItem: true,
                      rootFiles: gedRes.data.Proprietary.Content.files || [],
                      rootFolders: gedRes.data.Proprietary.Content.folders || [],
                      folders: main_functions.changeStructure(gedRes.data.Proprietary.Content.folders || []),
                      reelFolders: gedRes.data.Proprietary.Content.folders || [],
                      sharedReelFolders: gedRes.data.Shared.Content.folders || [],
                      sharedFolders: sharedFolders,
                      sharedRootFiles: sharedFiles,
                      meeturl: meeturl,
                      rooms: rooms,
                      selectedRoom: rooms.length > 0 ? rooms[0] : '',
                      firstLoading: false,
                      loading: false
                    });
                  } else if (this.props.location.pathname === '/home/search') {
                    if (this.props.match.params.section_id) {
                      let textToSearch = this.props.match.params.section_id;
                      SmartService.search(
                        textToSearch,
                        localStorage.getItem('token'),
                        localStorage.getItem('usrtoken')
                      )
                        .then((searchRes) => {
                          if (
                            searchRes.succes === true &&
                            searchRes.status === 200
                          ) {
                            this.setState({
                              searchResult: searchRes.data,
                              textSearch: textToSearch,
                              rootFiles: gedRes.data.Proprietary.Content.files || [],
                              rootFolders:
                                gedRes.data.Proprietary.Content.folders || [],
                              folders: main_functions.changeStructure(gedRes.data.Proprietary.Content.folders || []),
                              reelFolders: gedRes.data.Proprietary.Content.folders || [],
                              sharedReelFolders: gedRes.data.Shared.Content.folders || [],
                              sharedFolders: sharedFolders,
                              sharedRootFiles: sharedFiles,
                              meeturl: meeturl,
                              contacts: contacts,
                              societes: societes,
                              annuaire_clients_mondat: annuaire_clients_mondat,
                              rooms: rooms,
                              selectedRoom: rooms.length > 0 ? rooms[0] : '',
                              firstLoading: false,
                              loading: false
                            });
                          } else {
                            console.log(searchRes.error);
                          }
                        })
                        .catch((err) => {
                          console.log(err);
                        });
                    }
                  } else if (this.props.location.pathname.indexOf('/home/search/') > -1) {
                    let textToSearch = this.props.location.pathname.replace('/home/search/', '');
                    SmartService.search(textToSearch, localStorage.getItem('token'), localStorage.getItem('usrtoken')).then(searchRes => {

                      if (searchRes.succes === true && searchRes.status === 200) {
                        this.setState({
                          searchResult: searchRes.data,
                          textSearch: textToSearch,
                          rootFiles: gedRes.data.Proprietary.Content.files || [],
                          rootFolders: gedRes.data.Proprietary.Content.folders || [],
                          folders: main_functions.changeStructure(gedRes.data.Proprietary.Content.folders || []),
                          reelFolders: gedRes.data.Proprietary.Content.folders || [],
                          sharedReelFolders: gedRes.data.Shared.Content.folders || [],
                          sharedFolders: sharedFolders,
                          sharedRootFiles: sharedFiles,
                          meeturl: meeturl,
                          contacts: contacts,
                          societes: societes,
                          annuaire_clients_mondat: annuaire_clients_mondat,
                          rooms: rooms,
                          selectedRoom: rooms.length > 0 ? rooms[0] : '',
                          firstLoading: false,
                          loading: false
                        });
                      } else {
                        console.log(searchRes.error);
                      }
                    }).catch(err => {
                      console.log(err);
                    });
                  } else {
                    console.log('URL ERROR');
                    this.props.history.push('/home/drive');
                    this.componentDidMount();
                  }
                });
            } else {
              this.setState({ loading: false });
              localStorage.clear();
              this.props.history.push('/login');
            }
          })
          .catch((err) => {
            this.props.history.push('/error');
            console.log(err);
          });
      }, 200);
    }
  }

  // brainy food ENT
  verifFolders(folders){

    let headers = new Headers();
    headers.append('Content-Type', 'application/fhir+json');
    headers.append('Access-Control-Allow-Origin','*');
    headers.append('Access-Control-Allow-Headers','Content-Type');
    headers.append('Access-Control-Allow-Methods','POST, GET, OPTIONS')

    let client_folder = folders.find((x) => x.name === 'CLIENTS');
    let recette_folder = folders.find((x) => x.name === 'RECETTES');


    if(!client_folder){
      console.log("NOT CLIENT FOLDER FOUNDED")
      SmartService.addFolder({
        name: 'CLIENTS',
        folder_id: null
      }, localStorage.getItem('token'), localStorage.getItem('usrtoken')).then(addClientFolderRes => {

        fetch('http://91.121.162.202:8199/Patient', {
          method: 'GET',
          headers:headers,
        }).then(response => response.json()).then((res)=>{

          res.entry.map((item,key) => {

            let family = item.resource.name ? item.resource.name[0].family : "";
            let name = item.resource.name ? item.resource.name[0].given[0] : "";
            let folder_name = family + " " + name;

            SmartService.addFolder({
              name: folder_name,
              folder_id: addClientFolderRes.data.id
            }, localStorage.getItem('token'), localStorage.getItem('usrtoken')).then(addFolderRes => {
              console.log("ok")
              this.justReloadGed()
            }).catch(err => {console.log(err)})

          })
          if (res.link[0].relation==="next"){
            fetch(res.link[0].url,{
              method:'GET',
              headers:headers
            }).then(fres=>fres.json()).then((ffres)=>{
              ffres.entry.map((item,key)=>{

                SmartService.addFolder({
                  name: item.resource ? (item.resource.name[0].family || "" + " " + item.resource.name[0].given[0] || "") : "Inconu",
                  folder_id: addClientFolderRes.data.id
                }, localStorage.getItem('token'), localStorage.getItem('usrtoken')).then(addFolderRes => {
                  console.log("ok")
                  this.justReloadGed()
                }).catch(err => {console.log(err)})

              })
            })
          }
        }).catch(error => {
          console.log(error);
        });

      }).catch(err => {console.log(err)})
    }
    else{
      console.log("CLIENT FOLDER FOUNDED")
      fetch('http://91.121.162.202:8199/Patient', {
        method: 'GET',
        headers:headers,
      }).then(response => response.json()).then((res)=>{

        res.entry.map((item,key) => {

          let family = item.resource.name ? item.resource.name[0].family : "";
          let name = item.resource.name ? item.resource.name[0].given[0] : "";
          let folder_name = family + " " + name;

          let find = client_folder.Content.folders.find((x) => x.name === folder_name);

          if(!find){
            console.log(" not found")
            SmartService.addFolder({
              name: folder_name,
              folder_id: localStorage.getItem("client_folder_id")
            }, localStorage.getItem('token'), localStorage.getItem('usrtoken')).then( addFolderRes => {
              console.log("ok")
              this.justReloadGed()
            }).catch(err => {console.log(err)})
            if (res.link[0].relation === "next"){
              fetch(res.link[0].url,{
                method:'GET',
                headers:headers
              }).then(fres=>fres.json()).then((ffres)=>{
                ffres.entry.map((item,key)=>{

                  SmartService.addFolder({
                    name: item.resource ? (item.resource.name[0].family || "" + " " + item.resource.name[0].given[0] || "") : "Inconu",
                    folder_id: localStorage.getItem("client_folder_id")
                  }, localStorage.getItem('token'), localStorage.getItem('usrtoken')).then(addFolderRes => {
                    console.log("ok")
                    this.justReloadGed()
                  }).catch(err => {console.log(err)})

                })
              })
            }
          }

        })

      }).catch(error => {
        console.log(error);
      });

    }

    if(!recette_folder){
      SmartService.addFolder({
        name: 'RECETTES',
        folder_id: null
      }, localStorage.getItem('token'), localStorage.getItem('usrtoken')).then(addRecFolderRes => {
        this.justReloadGed()
      }).catch(err => {console.log(err)})
    }

  }

  openAddModal = (type) => () => {
    this.setState({
      add: type,
      showModalAdd: true
    });
  };

  addItem = (type) => event => {
    if (type === 'domaine') {

      let selectedContact = this.state.selectedContact;
      var domaines = [];
      if (selectedContact.domaine === 'null' || selectedContact.domaine === undefined) {
        domaines.push(this.state.domaine);
        selectedContact.domaine = domaines;
        this.setState({
          selectedContact: selectedContact,
          domaine: {
            domaine: '',
            specialite: []
          },
          showModalAdd: false
        });
      } else {
        selectedContact.domaine.push(this.state.domaine);
        this.setState({
          selectedContact: selectedContact,
          domaine: {
            domaine: '',
            specialite: []
          },
          showModalAdd: false
        });
      }
    }

    if (type === 'formation') {
      let selectedContact = this.state.selectedContact;
      if (selectedContact.formations === undefined) {
        let formations = [];
        formations.push(this.state.formationTmp);
        selectedContact.formations = formations;
        this.setState({
          selectedContact: selectedContact,
          formationTmp: '',
          showModalAdd: false
        });
      } else {
        selectedContact.formations.push(this.state.formationTmp);
        this.setState({
          selectedContact: selectedContact,
          formationTmp: '',
          showModalAdd: false
        });
      }
    }
    if (type === 'fonction') {
      let selectedContact = this.state.selectedContact;
      if (selectedContact.fonctions === undefined) {
        let fonctions = [];
        fonctions.push(this.state.fonctionTmp);
        selectedContact.fonctions = fonctions;
        this.setState({
          selectedContact: selectedContact,
          fonctionTmp: '',
          showModalAdd: false
        });
      } else {
        selectedContact.fonctions.push(this.state.fonctionTmp);

        this.setState({
          selectedContact: selectedContact,
          fonctionTmp: '',
          showModalAdd: false
        });
      }
    }
    if (type === 'affiliation') {
      let selectedContact = this.state.selectedContact;

      if (selectedContact.affiliations === undefined) {
        let affiliation = [];
        affiliation.push(this.state.affiliationTmp);
        selectedContact.affiliations = affiliation;
        this.setState({
          selectedContact: selectedContact,
          affiliationTmp: '',
          showModalAdd: false
        });
      } else {

        selectedContact.affiliations.push(this.state.affiliationTmp);

        this.setState({
          selectedContact: selectedContact,
          affiliationTmp: '',
          showModalAdd: false
        });
      }
    }
    if (type === 'parcour') {
      let selectedContact = this.state.selectedContact;

      if (selectedContact.parcoursP === undefined) {
        let parcoursP = [];
        parcoursP.push(this.state.parcourTmp);
        selectedContact.parcoursP = parcoursP;
        this.setState({
          selectedContact: selectedContact,
          parcourTmp: '',
          showModalAdd: false
        });
      } else {

        selectedContact.parcoursP.push(this.state.parcourTmp);
        this.setState({
          selectedContact: selectedContact,
          parcourTmp: '',
          showModalAdd: false
        });
      }
    }
    if (type === 'langue') {
      let selectedContact = this.state.selectedContact;

      if (selectedContact.langues === undefined) {
        let langues = [];
        langues.push(this.state.langueTmp);
        selectedContact.langues = langues;
        this.setState({
          selectedContact: selectedContact,
          langueTmp: '',
          showModalAdd: false
        });
      } else {

        selectedContact.langues.push(this.state.langueTmp);
        this.setState({
          selectedContact: selectedContact,
          langueTmp: '',
          showModalAdd: false
        });
      }
    }
    if (type === 'hobbies') {
      let selectedContact = this.state.selectedContact;

      if (selectedContact.hobbies === undefined) {
        let hobbies = [];
        hobbies.push(this.state.hobbiesTmp);
        selectedContact.hobbies = hobbies;
        this.setState({
          selectedContact: selectedContact,
          hobbiesTmp: '',
          showModalAdd: false
        });
      } else {

        selectedContact.hobbies.push(this.state.hobbiesTmp);
        this.setState({
          selectedContact: selectedContact,
          hobbiesTmp: '',
          showModalAdd: false
        });
      }
    }
  };

  removeItem = (type, index) => event => {

    if (type === 'domaine') {
      let selectedContact = this.state.selectedContact;
      selectedContact.domaine.splice(index, 1);
      this.setState({
        selectedContact: selectedContact
      });
    }

    if (type === 'formation') {
      let selectedContact = this.state.selectedContact;
      selectedContact.formations.splice(index, 1);
      this.setState({
        selectedContact: selectedContact
      });
    }
    if (type === 'fonction') {
      let selectedContact = this.state.selectedContact;
      selectedContact.fonctions.splice(index, 1);
      this.setState({
        selectedContact: selectedContact
      });
    }
    if (type === 'affiliation') {
      let selectedContact = this.state.selectedContact;
      selectedContact.affiliations.splice(index, 1);
      this.setState({
        selectedContact: selectedContact
      });
    }
    if (type === 'parcour') {
      let selectedContact = this.state.selectedContact;
      selectedContact.parcoursP.splice(index, 1);
      this.setState({
        selectedContact: selectedContact
      });
    }
    if (type === 'langue') {
      let selectedContact = this.state.selectedContact;
      selectedContact.langues.splice(index, 1);
      this.setState({
        selectedContact: selectedContact
      });
    }
    if (type === 'hobbies') {
      let selectedContact = this.state.selectedContact;
      selectedContact.hobbies.splice(index, 1);
      this.setState({
        selectedContact: selectedContact
      });
    }
  };

  handleChangeDomaine = (event) => {
    this.setState({
      domaine: {
        domaine: event.target.value,
        specialite: []
      }
    });
  };

  handleChangeSpecialite = (event) => {
    let domaine = this.state.domaine;
    domaine.specialite.push(event.target.value)
    this.setState({ domaine: domaine });
  };

  updateTreeData(list, key, children, files) {
    return list.map((node) => {
      if (node.key === key) {
        node.files = files;
        return { ...node, children };
      } else if (node.children) {
        return { ...node, children: this.updateTreeData(node.children, key, children, files) };
      }
      return node;
    });
  }

  onLoadSharedData = ({ key, children }) => {
    console.log(key)
    console.log(children)
    return new Promise((resolve) => {
      if (children) {
        resolve();
        return;
      }
      let origin = this.state.sharedFolders;
      SmartService.getFile(key, localStorage.getItem('token'), localStorage.getItem('usrtoken')).then(Res => {
          let sub_folders = Res.data.Content.folders || [];
          let sub_files = Res.data.Content.files || [];
          let childrens = [];
          for(let i =0 ; i < sub_folders.length ; i++){
            let treeNode = {
              title: sub_folders[i].type ? sub_folders[i].name + '.pdf' : sub_folders[i].name,
              key:sub_folders[i].id,
              icon: sub_folders[i].type ? (
                <DescriptionIcon style={{ color: 'red', backgroundColor: '#fff' }} />
              ) : (
                ({ selected }) =>
                  selected ? (
                    <FolderIcon style={{ color: '#1a73e8' }} />
                  ) : (
                    <FolderIcon style={{ color: 'grey' }} />
                  )
              ),
              files: [] ,
              folders: [] ,
              typeF: sub_folders[i].type ? 'file' : 'folder',
              rights:sub_folders[i].rights,
              proprietary:sub_folders[i].proprietary || undefined
            };
            childrens.push(treeNode)
          }
          this.setState({
            selectedSharedFolderFolders:Res.data.Content.folders,
            selectedSharedFolderFiles:Res.data.Content.files
          })
          let update = this.updateTreeData(origin, key, childrens, Res.data.Content.files || [] );
          this.setState({sharedFolders:update})
        resolve();
        }).catch(err => {
          resolve();
          console.log(err)})

    });
  }

  updateShared = (key, origin) => {
    SmartService.getFile(key, localStorage.getItem('token'), localStorage.getItem('usrtoken')).then(Res => {
      let sub_folders = Res.data.Content.folders || [];
      let sub_files = Res.data.Content.files || [];
      let childrens = [];
      for(let i =0 ; i < sub_folders.length ; i++){
        let treeNode = {
          title: sub_folders[i].type ? sub_folders[i].name + '.pdf' : sub_folders[i].name,
          key:sub_folders[i].id,
          icon: sub_folders[i].type ? (
            <DescriptionIcon style={{ color: 'red', backgroundColor: '#fff' }} />
          ) : (
            ({ selected }) =>
              selected ? (
                <FolderIcon style={{ color: '#1a73e8' }} />
              ) : (
                <FolderIcon style={{ color: 'grey' }} />
              )
          ),
          files: [] ,
          folders: [] ,
          typeF: sub_folders[i].type ? 'file' : 'folder',
          rights:sub_folders[i].rights,
          proprietary:sub_folders[i].proprietary || undefined
        };
        childrens.push(treeNode)
      }
      this.setState({
        selectedSharedFolderFolders:Res.data.Content.folders,
        selectedSharedFolderFiles:Res.data.Content.files
      })
      let update = this.updateTreeData(origin, key, childrens, Res.data.Content.files || [] );
      this.setState({sharedFolders:update,loading:false})
    }).catch(err => {
      console.log(err)})
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

  openUploadToastSnackbar = (msg) => {
    this.setState({
      openUploadToast: true,
      uploadToastMessage: msg
    });
  };

  closeUploadToastSnackbar = (event, reason) => {
    if (reason === 'clickaway') return;
    this.setState({ openUploadToast: false });
  };

  deleteFile_Folder = (file) => {
    this.setState({ loading: true });
    SmartService.deleteFile(file.key || file.id, localStorage.getItem('token'), localStorage.getItem('usrtoken'))
      .then((deleteRes) => {
        if (deleteRes.succes === true && deleteRes.status === 200) {
          if (file.typeF === 'file' || file.type === 'pdf'){
            this.reloadGed()
          }
          else {
              this.setState({ selectedFolderId: '' });
              this.props.history.push('/home/drive');
              this.reloadGed();
          }
          this.openSnackbar('success', file.typeF === 'file' ? (file.name || file.title) + '.pdf est supprimé avec succès' : (file.name || file.title) + ' est supprimé avec succès');
        } else {
          this.openSnackbar('error', deleteRes.error);
        }
      })
      .catch((err) => {
        this.setState({ loading: false });
        this.openSnackbar('error', err);
      });
  };

  renameFile_Folder = (file, newName) => {
    this.setState({ loading: true });
    SmartService.updateFileName(
      { name: newName },
      file.key || file.id,
      localStorage.getItem('token'),
      localStorage.getItem('usrtoken')
    )
      .then((updateNameRes) => {
        if (updateNameRes.succes === true && updateNameRes.status === 200) {
          this.reloadGed();
          this.openSnackbar('success', file.type ? file.name + '.pdf a bien été renommé. Nouveau nom: ' + newName + '.pdf' : file.name + ' a bien été renommé. Nouveau nom: ' + newName);
        } else {
          this.setState({ loading: false });

          this.openSnackbar('error', updateNameRes.error);
        }
      })
      .catch((err) => {
        this.setState({ loading: false });
        this.openSnackbar('error', err);
      });
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
    obj[object2] = container;
    this.setState({
      [object1]: obj
    });
  };

  saveContactChanges = () => {
    this.setState({ loading: true });
    let key = main_functions.findContactByUid(this.state.selectedContact.uid, this.state.contacts);
    firebase.database().ref('/'+firebase_ent_begin_name+'-contacts-'+ged_id+'/' + key).set(
      this.state.selectedContact
    ).then(res => {
      this.setState({ loading: false });
      this.openSnackbar('success', 'Modification effectuée avec succès');
    }).catch(err => {
      console.log(err);
    });
  };

  saveSocietyChanges = () => {
    this.setState({ loading: true });
    let key = main_functions.findClientMondatById(this.state.selectedSociete.ID, this.state.annuaire_clients_mondat);
    firebase.database().ref("/"+firebase_ent_begin_name+"-clients-"+ged_id+'/' + key).set(
      this.state.selectedSociete
    ).then(res => {
      this.setState({ loading: false });
      this.openSnackbar('success', 'Modification effectuée avec succès');
    });
  };

  onInputTimeSuggChange = (event, { newValue }) => {
    console.log(newValue);
    let d = this.state.TimeSheet;
    d.newTime.duree = newValue;
    this.setState({ TimeSheet: d });
  };

  onTimeSuggestionsFetchRequested = ({ value }) => {
    this.setState({
      timeSuggestions: main_functions.getTimeSuggestions(value)
    });
  };

  onTimeSuggestionsClearRequested = () => {
    this.setState({
      timeSuggestions: []
    });
  };

  showDocInPdfModal = (url) => {
    this.setState({
      openRightMenu: false,
      showPDFModal: true,
      pdfURL: url
    });
  };

  uploadImage = (image) => {
    this.setState({ loading: true });
    let imgToUpload = image.target.files[0];

    if(imgToUpload.type === "image/png" || imgToUpload.type === "image/jpeg" || imgToUpload.type === "image/jpg"){
      var reader = new FileReader();
      reader.onloadend = () => {
        let selectedContact = this.state.selectedContact;
        selectedContact.imageUrl = reader.result;
        let key = main_functions.findContactByUid(this.state.selectedContact.uid, this.state.contacts);
        firebase.database().ref('/'+firebase_ent_begin_name+'-contacts-'+ged_id+'/' + key).set(
            this.state.selectedContact
        ).then(res => {
          this.setState({ loading: false });
          this.openSnackbar('success', 'Modification effectuée avec succès');
        });
      };
      reader.readAsDataURL(imgToUpload);
    }else{
      this.openSnackbar("error","Type de fichier erroné ! ")
    }
  };

  uploadFolder = (event) => {
    this.setState({ loading: true });
    let files = event.target.files;
    let structure = files[0].webkitRelativePath.split('/');
    let folder_name = structure[0];
    let calls = [];
    SmartService.addFolder({
      name: folder_name,
      folder_id: null
    }, localStorage.getItem('token'), localStorage.getItem('usrtoken')).then(addFolderRes => {
      if (addFolderRes.succes === true && addFolderRes.status === 200) {
        this.setState({ openUploadToast: true });
        for (let i = 0; i < files.length; i++) {
          let formData = new FormData();
          formData.append('file', files[i]);
          formData.append('folder_id', addFolderRes.data.id);
          calls.push(axios.request({
              method: 'POST', url: data.endpoint + '/ged/'+ged_id+'/doc/addfile',
              data: formData,
              headers: {
                'Content-Type': 'multipart/form-data',
                'token': localStorage.getItem('token'),
                'usrtoken': localStorage.getItem('usrtoken')
              },
              onUploadProgress: (p) => {
                this.setState({ uploadToastMessage: files[i].name + ' : ' + ((p.loaded / p.total) * 100).toFixed(2).concat(' %').toString() });
              }
            })
          );
        }
        Promise.all(calls).then(response => {
          this.setState({ openUploadToast: false, uploadToastMessage: '' });
          this.reloadGed();
        }).catch(err => {
          this.setState({ loading: false });
          console.log(err);
        });

      } else {
        this.setState({ loading: false });
        this.openSnackbar('error', addFolderRes.error);
      }
    }).catch(err => {
      this.openSnackbar('error', err);
      this.setState({ loading: false });
      console.log(err);
    });


  };

  justReloadGed = () => {
    SmartService.getGed(localStorage.getItem('token'), localStorage.getItem('usrtoken')).then(gedRes => {
      if (gedRes.succes === true && gedRes.status === 200) {
        let client_folder = gedRes.data.Proprietary.Content.folders.find((x) => x.name === 'CLIENTS');
        if (client_folder) {
          localStorage.setItem('client_folder_id', client_folder.id);
          this.setState({client_folders:client_folder})
        }
        this.setState({
          rootFiles: gedRes.data.Proprietary.Content.files || [],
          rootFolders: gedRes.data.Proprietary.Content.folders || [],
          folders: main_functions.changeStructure(gedRes.data.Proprietary.Content.folders || []),
          reelFolders: gedRes.data.Proprietary.Content.folders || []
        });
      } else {
        localStorage.clear();
        this.props.history.push('/login');
      }
    }).catch(err => {
      console.log(err);
    });
  };

  reloadGed = () => {
    this.setState({ loading: true });
    setTimeout(() => {
      SmartService.getGed(localStorage.getItem('token'), localStorage.getItem('usrtoken')).then(gedRes => {
        if (gedRes.succes === true && gedRes.status === 200) {

          let client_folder = gedRes.data.Proprietary.Content.folders.find((x) => x.name === 'CLIENTS');
          if (client_folder) {
            localStorage.setItem('client_folder_id', client_folder.id);
            this.setState({client_folders:client_folder})
          }

          if (this.props.location.pathname.indexOf('/home/drive/') > -1) {

            let folders = gedRes.data.Proprietary.Content.folders || [];
            let folder_id = this.props.location.pathname.replace('/home/drive/', '');
            let folder_name = main_functions.getFolderNameById(folder_id, folders);


            this.setState({
              autoExpandParent:true,
              folders: main_functions.changeStructure(gedRes.data.Proprietary.Content.folders || []),
              reelFolders: gedRes.data.Proprietary.Content.folders || [],
              rootFiles: gedRes.data.Proprietary.Content.files || [],
              rootFolders: gedRes.data.Proprietary.Content.folders || [],
              selectedFoldername: folder_name,
              breadcrumbs: main_functions.getBreadcumpsPath(folder_id, folders),
              selectedFolderId: folder_id,
              selectedFolderFiles: main_functions.getFolderFilesById(folder_id, folders),
              selectedFolderFolders: main_functions.getFolderFoldersById(folder_id, folders),
              showContainerSection: 'Drive',
              focusedItem: 'Drive',
              selectedDriveItem: [folder_id],
              expandedDriveItems: [folder_id],
              loading: false
            });
            this.props.history.push('/home/drive/' + folder_id);
          }
          else if (this.props.location.pathname.indexOf('/home/drive') > -1) {
            this.setState({
              rootFiles: gedRes.data.Proprietary.Content.files || [],
              rootFolders: gedRes.data.Proprietary.Content.folders || [],
              folders: main_functions.changeStructure(gedRes.data.Proprietary.Content.folders || []),
              reelFolders: gedRes.data.Proprietary.Content.folders || [],
              loading: false
            });
            this.props.history.push('/home/drive');
          }
          else if(this.props.location.pathname.indexOf('/home/shared/parent') > -1){
            let parentSharedFolder = [{
              id:"parent",
              name:"Partagés avec moi",
              Content:{
                files:[],
                folders:[]
              }
            }]
            parentSharedFolder[0].Content.folders = gedRes.data.Shared.Content.folders || []
            let sharedFolders = main_functions.changeStructure(parentSharedFolder);
            let sharedFiles = gedRes.data.Shared.Content.files;
            this.setState({
              sharedReelFolders: gedRes.data.Shared.Content.folders || [],
              sharedRootFiles: sharedFiles,
              sharedFolders: sharedFolders,
              selectedDriveSharedItem:['parent'],
              expandedDriveSharedItems:[],
              loading: false
            })
            this.componentDidMount()
          }
          else if(this.props.location.pathname.indexOf('/home/shared/') > -1){
            let key = this.props.location.pathname.replace('/home/shared/', '');
            this.updateShared(key,this.state.sharedFolders);
          }
          else {
            this.setState({
              rootFiles: gedRes.data.Proprietary.Content.files || [],
              rootFolders: gedRes.data.Proprietary.Content.folders || [],
              folders: main_functions.changeStructure(gedRes.data.Proprietary.Content.folders || []),
              reelFolders: gedRes.data.Proprietary.Content.folders || [],
              loading: false
            });
            this.props.history.push('/home/drive');
          }

        } else {
          this.setState({ loading: false });
          localStorage.clear();
          this.props.history.push('/login');
        }
      }).catch(err => {
        console.log(err);
        this.setState({ loading: false });
      });
    }, 200);
  };

  addNewRoom = (room) => {

    this.setState({ loading: true, openNewRoomModal: false });
    SmartService.addRoom({ name: room.title, start: moment().add('hour', 1).unix() * 1000, duration: 30 },
        localStorage.getItem('token'), localStorage.getItem('usrtoken')).then(addRoomRes => {
      if (addRoomRes.status === 200 && addRoomRes.succes === true) {
        room.id = addRoomRes.data.id;
        let rooms = this.state.rooms;
        rooms.push(room);
        firebase.database().ref('/'+firebase_ent_begin_name+'-rooms-'+ged_id).set(
            rooms
        ).then(res => {
          this.setState({
            loading: false,
            newRoomTitle: '',
            NewRoomEmails: [],
            selectedRoom: room,
            selectedRoomKey: (rooms.length - 1),
            selectedRoomItems: [(rooms.length - 1).toString()]
          });
          this.props.history.push('/home/rooms/' + (rooms.length - 1));
          this.openSnackbar('success', 'Room ajouté avec succès');
        });

      } else {
        this.setState({ loading: false });
        this.openSnackbar('error', addRoomRes.error);
      }
    }).catch(err => {
      this.setState({ loading: false });
      this.openSnackbar('error', err);
    });

  };

  openPdfModal = (doc_id) => {
    this.setState({ loading: true });
    SmartService.getFile(doc_id, localStorage.getItem('token'), localStorage.getItem('usrtoken')).then(fileRes => {
      if (fileRes.succes === true && fileRes.status === 200) {
        this.setState({ loading: false });
        this.showDocInPdfModal(fileRes.data.Content.Data);
      } else {
        console.log(fileRes.error);
      }
    }).catch(err => console.log(err));
  };

  importCSVContacts(e){

      let file = e.target.files[0];
      if(file.type === "application/vnd.oasis.opendocument.spreadsheet" || file.type === "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" ||
          file.type === "application/vnd.ms-excel" || file.type === "text/csv"){
        xlsxParser.onFileSelection(e.target.files[0])
            .then( data => {
              let parsedData = Object.entries(data);
              let contacts = parsedData[0][1];
              contacts.map((c,key) => {
                c.uid = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
              })
              firebase.database().ref("/"+firebase_ent_begin_name+"-contacts-"+ged_id).set(contacts).then( ok => {
                this.openSnackbar("success","Votre fichier est importé avec succès")
              }).catch(err => {console.log(err)})
              console.log(contacts)
            }).catch(err => {
          console.log(err)
          this.openSnackbar("error",err)
        })
      }else{
        this.openSnackbar("error","Type de fichier erroné ! Seulement les formats .xls, .xls, .csv sont acceptés")
      }


  }

  renderLeftMenu = () => {
    return (
      <div>
        <LeftMenuV3
          openNewFolderModalFromRacine={() =>
            this.setState({
              newFolderModal: true,
              newFolderFromRacine: true
            })
          }
          focusedItem={this.state.focusedItem}
          setFocusedItem={(item) => {
            item === 'Drive'
              ? this.props.history.push('/home/drive')
              : item === 'Rooms'
              ? this.state.rooms.length > 0
                ? this.props.history.push('/home/rooms/0')
                : this.props.history.push('/home/rooms')
              : item === 'Meet'
                ? this.props.history.push('/home/meet/new')
                : item === 'Contacts'
                  ? this.props.history.push('/home/contacts')
                  : item === 'Societe'
                    ? this.props.history.push('/home/clients')
                    : item === 'TimeSheet'
                      ? this.props.history.push('/home/timeSheet/dashboard')
                      : item === 'marketplace'
                                    ? this.props.history.push('/home/marketplace/recettes') : this.props.history.push('/home/drive');
            this.setState({
              focusedItem: item,
              showContainerSection: item
            });
          }}
          onDoubleClickFile={(file) => {
            this.openPdfModal(file.key || file.id)
          }}
          showDriveMenuItems={this.state.openDriveMenuItem}

          setShowDriveMenuItems={() => {
            this.setState({
              selectedFolderId: '',
              openDriveMenuItem: !this.state.openDriveMenuItem
            });
          }}
          showRoomsMenuItems={this.state.openRoomMenuItem}
          setShowRoomsMenuItems={() =>
            this.setState({
              openRoomMenuItem: !this.state.openRoomMenuItem
            })
          }
          showMeetMenuItems={this.state.openMeetMenuItem}
          setShowMeetMenuItems={() =>
            this.setState({
              openMeetMenuItem: !this.state.openMeetMenuItem
            })
          }
          showSocietyMenuItems={this.state.openSocietyMenuItem}
          setShowSocietyMenuItems={() =>
            this.setState({
              openSocietyMenuItem: !this.state.openSocietyMenuItem
            })
          }
          showTimeSheet={this.state.openTimeSheetsMenu}
          setShowTimeSheet={() => {
            this.props.history.push('/home/timeSheet/activities');
            this.setState({ showContainerSection: 'TimeSheet' });
          }}
          showContacts={this.state.openContactsMenu}
          setShowContacts={() => {
            this.setState({
              showContainerSection: 'Contacts',
              openContactsMenu: !this.state.openContactsMenu
            });
          }}
          selectedContactsItem={
            this.state.showContainerSection === 'Contacts'
              ? this.state.selectedContactsMenuItem
              : []
          }
          onContactsItemClick={(nodeId) => {
            this.setState({
              showContainerSection: 'Contacts'
            });
            this.props.history.push('/home/contacts');
          }}
          handleSelectContactsMenu={(event, nodeIds) => {
            this.setState({ selectedContactsMenuItem: nodeIds });
          }}
          showSociete={this.state.openSocietyMenu}
          setShowSociete={() => {
            this.setState({ showContainerSection: 'Societe' });
          }}
          selectedSocietyItem={
            this.state.showContainerSection === 'Societe'
              ? this.state.selectedSocietyMenuItem
              : []
          }
          onSocietyItemClick={(nodeId) => {
            this.props.history.push('/home/clients');
            this.setState({ showContainerSection: 'Societe' });
          }}
          handleSelectSocietyMenu={(event, nodeIds) => {
            this.setState({ selectedSocietyMenuItem: nodeIds });
          }}
          showTimeSheetMenuItems={this.state.openTimeSheetsMenu}
          setShowTimeSheetMenuItems={() => {
            this.setState({
              openTimeSheetsMenu: !this.state.openTimeSheetsMenu,
              showContainerSection: 'TimeSheet',
              selectedTimeSheetMenuItem: ['dashboard']
            });
            this.props.history.push('/home/timeSheet/dashboard');
          }}
          selectedTimeSheetItem={
            this.state.showContainerSection === 'TimeSheet'
              ? this.state.selectedTimeSheetMenuItem
              : []
          }
          handleSelectTimeSheetMenu={(event, nodeIds) => {
            this.setState({ selectedTimeSheetMenuItem: nodeIds });
          }}
          onTimeSheetItemClick={(nodeId) => {
            if (nodeId === 'activities') {
              this.setState({
                focusedItem: 'TimeSheet',
                showContainerSection: 'TimeSheet',
                selectedTimeSheetMenuItem: ['activities']
              });
              this.props.history.push('/home/timeSheet/activities');
            } else if (nodeId === 'dashboard') {
              this.setState({
                focusedItem: 'TimeSheet',
                showContainerSection: 'TimeSheet',
                selectedTimeSheetMenuItem: ['dashboard']
              });
              this.props.history.push('/home/timeSheet/dashboard');
            } else if (nodeId === 'dashboardPerson') {
              this.setState({
                focusedItem: 'TimeSheet',
                showContainerSection: 'TimeSheet',
                selectedTimeSheetMenuItem: ['dashboardPerson']
              });
              this.props.history.push('/home/timeSheet/dashboardPerson');
            } else if (nodeId === 'dashboardProject') {
              this.setState({
                focusedItem: 'TimeSheet',
                showContainerSection: 'TimeSheet',
                selectedTimeSheetMenuItem: ['dashboardProject']
              });
              this.props.history.push('/home/timeSheet/dashboardProject');
            }
          }}
          autoExpandParent={this.state.autoExpandParent}
          setAutoExpandParent={(b) =>
            this.setState({ autoExpandParent: b })
          }
          openNewFolderModal={() =>
            this.setState({ newFolderModal: true })
          }
          showNewFileScreen={() => {
            this.setState({
              showContainerSection: 'Drive',
              focusedItem: 'Drive',
              openDriveMenuItem: true,
              openNewDocModal: true
            });
          }}
          openShareModal={() => {
            this.setState({ openShareDocModal: true });
          }}

          driveFolders={this.state.folders || []}
          setDriveFolders={(drive) => this.setState({ folders: drive })}
          selectedFolder={this.state.selectedFolder}
          setSelectedFolder={(folder) =>
          {
            this.setState({ selectedFolder: folder,selectedFile:'' })
          }
          }
          setFolderName={(name) =>
            this.setState({ selectedFoldername: name })
          }
          setFolderId={(id) => {
            this.props.history.push('/home/drive/' + id);
            this.setState({
              focusedItem: 'Drive',
              breadcrumbs: main_functions.getBreadcumpsPath(id, this.state.reelFolders),
              selectedFolderId: id,
              showContainerSection: 'Drive'
            });
          }}
          setSharedFolderId={(id) => {
            this.props.history.push('/home/shared/' + id);
            this.setState({
              focusedItem: 'Drive',
              breadcrumbs: "Mon drive / Partagés avec moi",
              selectedFolderId: id,
              selectedSharedFolderId: id,
              showContainerSection: 'Drive'
            });
          }}
          setSelectedFolderFiles={(files) =>
            this.setState({ selectedFolderFiles: files })
          }
          setSelectedFolderFolders={(folders) =>
            this.setState({ selectedFolderFolders: folders })
          }
          selectedDriveItem={this.state.showContainerSection === 'Drive' ? this.state.selectedDriveItem : []}
          setSelectedDriveItem={(keys) =>
            this.setState({ selectedDriveItem: keys })
          }
          expandedDriveItems={this.state.showContainerSection === 'Drive' ? this.state.expandedDriveItems : []}
          setExpandedDriveItems={(keys) =>
            this.setState({ expandedDriveItems: keys })
          }

          selectedMarketplaceItem={
            this.state.showContainerSection === 'marketplace'
                ? this.state.selectedMarketplaceMenuItem
                : []
          }
          showMarketplaceMenuItems={this.state.openMarketplaceMenuItem}
          setShowMarketplaceMenuItems={() => {
            this.setState({
              openMarketplaceMenuItem: !this.state.openMarketplaceMenuItem
            })
          }}
          handleMarketplaceMeetMenu={(nodeIds) =>{
            this.setState({ selectedMarketplaceMenuItem: nodeIds });
          }}
          onMarketplaceItemClick={(nodeId) => {
            if(nodeId === "recettes"){
              this.setState({
                focusedItem: 'marketplace',
                showContainerSection: 'marketplace',
                selectedMarketplaceMenuItem: ['recettes']
              });
              this.props.history.push('/home/marketplace/recettes');
            }
          }}

          sharedFolders={this.state.sharedFolders || []}
          sharedRootFiles={this.state.sharedRootFiles}
          expandedDriveSharedItems={this.state.showContainerSection === 'Drive' ? this.state.expandedDriveSharedItems : []}
          setExpandedDriveSharedItems={(keys) =>
            this.setState({ expandedDriveSharedItems: keys })
          }
          selectedDriveSharedItem={this.state.showContainerSection === 'Drive' ? this.state.selectedDriveSharedItem : []}
          setSelectedDriveSharedItem={(keys) => this.setState({ selectedDriveSharedItem: keys })}
          autoExpandSharedParent={this.state.autoExpandSharedParent}
          setAutoExpandSharedParent={(b) =>
            this.setState({ autoExpandSharedParent: b })
          }
          setSelectedSharedFolder={(folder) =>
            this.setState({ selectedSharedFolder: folder })
          }
          setSharedFolderName={(name) =>
            this.setState({ selectedSharedFoldername: name })
          }
          /*setSharedFolderId={(id) => {
            this.props.history.push('/home/shared/' + id);
            this.setState({
              focusedItem: 'Drive',
              breadcrumbs: 'Mon drive / Partagés avec moi',
              selectedSharedFolderId: id,
              showContainerSection: 'Drive'
            });
          }}*/
          setSelectedSharedFolderFiles={(files) =>
            this.setState({ selectedSharedFolderFiles: files })
          }
          setSelectedSharedFolderFolders={(folders) =>
            this.setState({ selectedSharedFolderFolders: folders })
          }
          onLoadSharedData={this.onLoadSharedData}

          onClickSharedRootItem={(key) => {
            this.props.history.push('/home/shared/'+key);
            this.setState({
              breadcrumbs: 'Mon drive / Partagés avec moi',
              focusedItem: 'Drive',
              showContainerSection: 'Drive'
            });
          }}

          selectedMeetItem={
            this.state.showContainerSection === 'Meet'
              ? this.state.selectedMeetMenuItem
              : []
          }
          handleSelectMeetMenu={(nodeIds) => {
            this.setState({ selectedMeetMenuItem: nodeIds });
          }}
          onMeetItemClick={(nodeId) => {
            if (nodeId === 'new') {
              this.setState({
                focusedItem: 'Meet',
                showContainerSection: 'Meet',
                selectedMeetMenuItem: ['new']
              });
              this.props.history.push('/home/meet/new');
            } else if (nodeId === 'rejoin') {
              this.setState({
                focusedItem: 'Meet',
                showContainerSection: 'Meet',
                selectedMeetMenuItem: ['rejoin']
              });
              this.props.history.push('/home/meet/rejoin');
            } else {
            }
          }}


          onClickNewFileFromRacine={() => {
            this.setState({
              showContainerSection: 'Drive',
              focusedItem: 'Drive',
              openDriveMenuItem: true,
              openNewDocModal: true
            });
          }}
          rooms={this.state.rooms}
          setSelectedRoom={(room, roomId) => {
            this.setState({
              selectedRoom: room,
              selectedRoomKey: roomId,
              showContainerSection: 'Rooms',
              focusedItem: 'Rooms'
            });
            this.props.history.push('/home/rooms/' + roomId);
          }}
          selectedRoomItems={
            this.state.showContainerSection === 'Rooms'
              ? this.state.selectedRoomItems
              : []
          }
          expandedRoomItems={this.state.expandedRoomItems}
          onClickAddRoomBtn={() => {
            this.setState({ openNewRoomModal: true });
          }}
          handleToggleRoomsMenu={(event, nodeIds) => {
            this.setState({ expandedRoomItems: nodeIds });
          }}
          handleSelectRoomsMenu={(event, nodeIds) => {
            this.setState({ selectedRoomItems: nodeIds });
          }}
          onClickImportFolder={() => {
            this.folderupload.click();
          }}
          onDeleteFolder={() => {
            this.deleteFile_Folder(this.state.selectedFolder);
          }}
          onRenameFolder={(newName) => {
            this.renameFile_Folder(this.state.selectedFolder, newName);
          }}
        />
        <input
          style={{ visibility: 'hidden', width: 0, height: 0 }}
          onChange={(event) => this.uploadFolder(event)}
          type="file"
          webkitdirectory=""
          mozdirectory=""
          directory=""
          multiple={true}
          ref={(ref) => (this.folderupload = ref)}
        />
      </div>
    );
  };

  addFactureToValidated(client,client_folder,date,createdBy,partnerEmail,lignes_facture){
    this.setState({loading:true})

    let lf_to_validated = this.state.facturesToValidatedCopy;
    lf_to_validated.push({
      ID:Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15),
      created_at:date,
      created_by:createdBy,
      client:client,
      partner:partnerEmail,
      lignes_facture:lignes_facture,
      statut:"wait",
      client_folder:{
        id:"",
        name:client_folder
      }
    })

    firebase.database().ref("/"+firebase_ent_begin_name+"-factures_to_Validated-"+ged_id).set(lf_to_validated).then( ok => {
      this.setState({partnerFacture:"",loading:false})
      this.openSnackbar("success","La facture est bien envoyé au partner pour validation")
    })

  }

  redirectToFolder(folder_id){
    this.props.history.push("/home/drive/"+folder_id);
    this.reloadGed()
  }

  createFacture_ForSelected(facture_date,lignes_f,folder_id,facture,template,client) {
    let id_facture = this.state.facturesToValidatedCopy.findIndex(x => x.ID === facture.ID)

    this.setState({loading:true})
    let lignes_factures = lignes_f;
    let odoo_data = [{
      'access_token': 'eafd285777ggobfvxyvnx',
      'state': 'draft',
      'type': 'out_invoice',
      'invoice_sent': false,
      "move_name":false,"user_id":6,"team_id":1,"comment":false,
      'l10n_ch_isr_sent': false,
      'name': false,
      'invoice_date': moment(facture_date).format('YYYY-MM-DD'),
      'date': moment(facture_date).format('YYYY-MM-DD'),
      'journal_id': 1,
      'currency_id': 5,
      'invoice_user_id': 3,
      'invoice_incoterm_id': false,
      'auto_post': false,
      'to_check': false,
      'authorized_transaction_ids': [
        [
          6,
          false,
          []
        ]
      ],
      'tax_lock_date_message': false,
      'id': false,
      'invoice_payment_state': 'not_paid',
      'invoice_filter_type_domain': 'sale',
      'company_currency_id': 5,
      'commercial_partner_id': '',
      'bank_partner_id': 1,
      'invoice_has_outstanding': false,
      'l10n_ch_currency_name': 'CHF',
      'invoice_sequence_number_next_prefix': false,
      'invoice_sequence_number_next': false,
      'invoice_has_matching_suspense_amount': false,
      'has_reconciled_entries': false,
      'restrict_mode_hash_table': false,
      'partner_id': lignes_factures[0].newTime.company_id,
      'ref': 121006,
      'invoice_vendor_bill_id': false,
      'invoice_payment_term_id': 1,
      'invoice_date_due': '2020-09-06',
      'company_id': 1,
      'amount_untaxed': 0,
      'amount_by_group': [],
      'amount_total': 0,
      'invoice_payments_widget': 'False',
      'amount_residual': 0,
      'invoice_outstanding_credits_debits_widget': false,
      'narration': false,
      'invoice_origin': false,
      'invoice_cash_rounding_id': false,
      'invoice_source_email': false,
      'invoice_payment_ref': false,
      'invoice_partner_bank_id': false,
      'reversed_entry_id': false,
      'message_follower_ids': [],
      'activity_ids': [],
      'message_ids': [],
      'message_attachment_count': 0,
      'invoice_line_ids': [],
      "account_id": 6,
      "reference": false,
      "fiscal_position_id": false,
      "origin": false,
      //'line_ids': []
    }];
    let total = 0;
    lignes_factures.map((ligne, key) => {
      total = total + (ligne.newTime.duree * parseFloat(ligne.newTime.rateFacturation));
      let OAContact = main_functions.getOAContactByEmail2(this.state.contacts,ligne.newTime.utilisateurOA);
      odoo_data[0].invoice_line_ids.push(
          [
            0,
            'virtual_' + (Math.floor(100 + Math.random() * 900)).toString(),
            {
              'account_id': 103,
              'sequence': 10,
              'origin': false,
              'name':
                  template === '0' ? moment(ligne.newTime.date).format('DD/MM/YYYY') :
                      template === '1' ? moment(ligne.newTime.date).format('DD/MM/YYYY') + '; ' + ligne.newTime.description :
                          template === '2' ? moment(ligne.newTime.date).format('DD/MM/YYYY') + ' ; ' + OAContact.nom + ' ' + OAContact.prenom :
                              template === '3' ? moment(ligne.newTime.date).format('DD/MM/YYYY') + '; ' + ligne.newTime.description + ' ; ' + OAContact.nom + ' ' + OAContact.prenom :
                                  template === '4' ? ligne.newTime.description :
                                      template === '5' ? OAContact.nom + ' ' + OAContact.prenom :
                                          template === '6' ? ligne.newTime.duree + ' Heures' :
                                              template === '7' ? ligne.newTime.description + ' ; ' + OAContact.nom + ' ' + OAContact.prenom :
                                                  template === '8' ? ligne.newTime.description + ' ; ' + ligne.newTime.duree + ' Heures' :
                                                      template === '9' ? ligne.newTime.description + ' ; ' + OAContact.nom + ' ' + OAContact.prenom + ' ; ' + ligne.newTime.duree + ' Heures' : ligne.newTime.description,
              'quantity': ligne.newTime.duree,
              'price_unit': parseFloat(ligne.newTime.rateFacturation),
              'discount': 0,
              'debit': 0,
              'credit': ligne.newTime.duree * parseFloat(ligne.newTime.rateFacturation),
              'amount_currency': 0,
              'date_maturity': false,
              'currency_id': false,
              'partner_id': false,
              'product_uom_id': false,
              'product_id': 2,
              'payment_id': false,
              'invoice_line_tax_ids': [
                [
                  6,
                  false,
                  []
                ]
              ],
              'tax_base_amount': 0,
              'tax_exigible': true,
              'tax_repartition_line_id': false,
              'tag_ids': [
                [
                  6,
                  false,
                  []
                ]
              ],
              'analytic_account_id': false,
              'analytic_tag_ids': [
                [
                  6,
                  false,
                  []
                ]
              ],
              'recompute_tax_line': false,
              'display_type': false,
              'is_rounding_line': false,
              'exclude_from_invoice_tab': false
            }
          ]
      );

    });

    SmartService.create_facture_odoo(localStorage.getItem('token'), localStorage.getItem('usrtoken'), { data: odoo_data }).then(createFactRes => {

      if(createFactRes.succes === true && createFactRes.status === 200){
        SmartService.generate_facture_odoo(localStorage.getItem('token'), localStorage.getItem('usrtoken'),createFactRes.data.id,"eafd285777ggobfvxyvnx").then(genFactRes => {

          if(genFactRes.succes === true && genFactRes.status === 200){

            SmartService.getFile(client,localStorage.getItem("token"),localStorage.getItem("usrtoken")).then(resF => {
              if(resF.succes === true && resF.status === 200){
                let comptaFolder = resF.data.Content.folders.find(x => x.name === "COMPTABILITE");

                SmartService.addFileFromBas64({b64file:genFactRes.data.pdf,folder_id:comptaFolder.id},
                    localStorage.getItem("token"),localStorage.getItem("usrtoken")).then( ok => {

                  if(ok.succes === true && ok.status === 200){

                    SmartService.updateFileName({name:"Facture_"+moment(facture_date).format('YYYY-MM-DD')},
                        ok.data.file_id,localStorage.getItem("token"),localStorage.getItem("usrtoken")).then( updateRes => {

                      if(updateRes.succes === true && updateRes.status === 200){

                        let secretariat_folder = this.state.reelFolders.find(x => x.name === "SECRETARIAT");
                        console.log(secretariat_folder)
                        if(secretariat_folder){
                          let compta_secretariat_folder = secretariat_folder.Content.folders.find(x => x.name === "COMPTABILITE");
                          if(compta_secretariat_folder){
                            console.log(compta_secretariat_folder)
                            SmartService.addFileFromBas64({b64file:genFactRes.data.pdf,folder_id:compta_secretariat_folder.id},localStorage.getItem("token"),localStorage.getItem("usrtoken")).then( r => {
                              if(r.succes === true && r.status === 200){
                                SmartService.updateFileName({name:"Facture_"+moment(facture_date).format('YYYY-MM-DD')},
                                    r.data.file_id,localStorage.getItem("token"),localStorage.getItem("usrtoken")).then( updateRes2 => {
                                  if(updateRes2.succes === true && updateRes2.status === 200){
                                    this.justReloadGed()
                                  }else{
                                    console.log(updateRes2.error)
                                  }
                                }).catch(err => {console.log(err)})
                              }else{
                                console.log(r.error)
                              }
                            }).catch(err => {console.log(err)})
                          }
                        }
                        console.log("FIREBASE")
                        firebase.database().ref("/"+firebase_ent_begin_name+"-factures_to_Validated-"+ged_id + "/"+id_facture).update({
                          statut:"accepted",
                          file_id:ok.data.file_id,
                          client_folder:{
                            id:client,
                            name:resF.data.name
                          }
                        }).catch(err => console.log(err))
                        this.justReloadGed();
                        this.setState({loading:false})
                        this.openSnackbar("success","La facture est bien validée et placée dans le dossier COMPTABILITE du client")
                      }else{
                        this.openSnackbar("error",updateRes.error)
                      }
                    }).catch(err => {console.log(err)})

                  }else{
                    this.openSnackbar("error",ok.error)
                    this.setState({loading:false})
                  }
                }).catch(err => console.log(err))
              }else{
                this.openSnackbar("error",resF.error)
                this.setState({loading:false})
              }
            }).catch( err => {console.log(err)})

          }else{
            console.log(genFactRes.error)
          }
        }).catch( err => {
          console.log(err)
        })

      }else{
        this.setState({loading:false})
        this.openSnackbar("error","Erreur odoo à la création de la facture ! ")
      }

    }).catch(err => {
      console.log(err);
    });
  }

  deleteLigneFact(lf) {
    const r = window.confirm('Voulez-vous vraiment supprimer cette ligne facture ?');
    if (r === true) {
      let lignes_facture = this.state.lignesFactures;
      let findIndex = lignes_facture.findIndex(x => x.uid === lf.uid);
      lignes_facture.splice(findIndex, 1);
      this.setState({ lignesFactures: lignes_facture });
    }

  }

  updateLignes_facture(lignes_factures) {
    setTimeout(() => {
      firebase.database().ref('/'+firebase_ent_begin_name+'-lignes_f-'+ged_id).set(lignes_factures);
    }, 300);

  }

  generateClientFolder(ID, team) {
    this.setState({ loading: true });
    let CLIENTS_folder_id = localStorage.getItem("client_folder_id");
    if(CLIENTS_folder_id && CLIENTS_folder_id !== "" ){

      let clients_tmp = this.state.clients_tempo;
      let clients_tmp_copie = this.state.clients_tempo_copie;
      let find = clients_tmp.find(x => x.ID === ID);

      if (find) {

        let findInCopyKey = clients_tmp_copie.findIndex(x => x.ID === find.ID && x.email === localStorage.getItem("email"));
        let findCopy = find;

        if(find.folder_id && find.folder_id !== ""){

          SmartService.addFolder({
            name: this.state.newClientFolder.nom,
            folder_id:find.folder_id
          },localStorage.getItem('token'), localStorage.getItem('usrtoken')).then(addFolderClient => {

            SmartService.addFolder({
              name: 'MÉMOIRE',
              folder_id: addFolderClient.data.id
            }, localStorage.getItem('token'), localStorage.getItem('usrtoken')).then(addFolderClientRes11 => {
            }).catch(err => {
              console.log(err);
            });
            SmartService.addFolder({
              name: 'CHARGE DE PIECES',
              folder_id: addFolderClient.data.id
            }, localStorage.getItem('token'), localStorage.getItem('usrtoken')).then(addFolderClientRes11 => {
            }).catch(err => {
              console.log(err);
            });
            SmartService.addFolder({
              name: 'CONVOCATIONS',
              folder_id: addFolderClient.data.id
            }, localStorage.getItem('token'), localStorage.getItem('usrtoken')).then(addFolderClientRes11 => {
            }).catch(err => {
              console.log(err);
            });
            SmartService.addFolder({
              name: 'ADMIN (Lettre d\'engagement)',
              folder_id: addFolderClient.data.id
            }, localStorage.getItem('token'), localStorage.getItem('usrtoken')).then(addFolderClientRes11 => {
            }).catch(err => {
              console.log(err);
            });
            SmartService.addFolder({
              name: 'COMPTABILITE',
              folder_id: addFolderClient.data.id
            }, localStorage.getItem('token'), localStorage.getItem('usrtoken')).then(addFolderClientRes11 => {
            }).catch(err => {
              console.log(err);
            });
            SmartService.addFolder({
              name: 'CORRESPONDANCE',
              folder_id: addFolderClient.data.id
            }, localStorage.getItem('token'), localStorage.getItem('usrtoken')).then(addFolderClientRes11 => {
            }).catch(err => {
              console.log(err);
            });
            SmartService.addFolder({
              name: 'INTERNE ****',
              folder_id: addFolderClient.data.id
            }, localStorage.getItem('token'), localStorage.getItem('usrtoken')).then(addFolderClientRes11 => {
            }).catch(err => {
              console.log(err);
            });
            SmartService.addFolder({
              name: 'NOTES',
              folder_id: addFolderClient.data.id
            }, localStorage.getItem('token'), localStorage.getItem('usrtoken')).then(addFolderClientRes11 => {
            }).catch(err => {
              console.log(err);
            });
            SmartService.addFolder({
              name: 'PV RENDEZ-VOUS',
              folder_id: addFolderClient.data.id
            }, localStorage.getItem('token'), localStorage.getItem('usrtoken')).then(addFolderClientRes11 => {
              console.log('OK');
            }).catch(err => {
            });
            SmartService.addFolder({
              name: 'PROCEDURES',
              folder_id: addFolderClient.data.id
            }, localStorage.getItem('token'), localStorage.getItem('usrtoken')).then(addFolderClientRes11 => {
            }).catch(err => {
              console.log(err);
            });
            SmartService.addFolder({
              name: 'RECHERCHES JURIDIQUES',
              folder_id: addFolderClient.data.id
            }, localStorage.getItem('token'), localStorage.getItem('usrtoken')).then(addFolderClientRes11 => {
            }).catch(err => {
              console.log(err);
            });

            findCopy.folders.push(
                {
                  folder_id:addFolderClient.data.id,
                  team:team,
                  name:this.state.newClientFolder.nom,
                  contrepartie:this.state.newClientFolder.contrepartie,
                  autrepartie:this.state.newClientFolder.autrepartie,
                  desc:this.state.newClientFolder.desc,
                  created_at:moment().format("YYYY-MM-DD"),
                  facturation:{
                    byEmail:this.state.newClientFolder.byEmail,
                    sentBySecr:this.state.newClientFolder.sentBySecr,
                    sentByAvocat:this.state.newClientFolder.sentByAvocat,
                    language:this.state.newClientFolder.language,
                    frequence:this.state.newClientFolder.frequence
                  }
                }
            )

            firebase.database().ref('/'+firebase_ent_begin_name+"-clients_tempo-"+ged_id+'/'+findInCopyKey).set(findCopy).then( ok => {
              setTimeout(() => {
                this.setState({
                  loading: false,
                  newClientFolder: {
                    nom: '',
                    type: 'corporate',
                    team: [],
                    contrepartie:'',
                    autrepartie:'',
                    desc:'',
                    byEmail:true,
                    sentBySecr:false,
                    sentByAvocat:false,
                    frequence:'',
                    language:"Francais"
                  },
                  lead_contact_tmp: '',
                  lead_contact_horaire_tmp: ''
                });
                this.justReloadGed();
                this.openSnackbar('success', 'Dossier ajouté avec succès');
              }, 750);
            });

          }).catch(err => {console.log(err)})

        }
        else{

          SmartService.addFolder({
            name: this.state.selectedSociete.Nom + ' ' + (this.state.selectedSociete.Prenom || ''),
            folder_id: CLIENTS_folder_id
          }, localStorage.getItem('token'), localStorage.getItem('usrtoken')).then(addParentClientFolderRes => {

            SmartService.addFolder({
              name: this.state.newClientFolder.nom,
              folder_id:addParentClientFolderRes.data.id
            },localStorage.getItem('token'), localStorage.getItem('usrtoken')).then(addFolderClient => {

              SmartService.addFolder({
                name: 'MÉMOIRE',
                folder_id: addFolderClient.data.id
              }, localStorage.getItem('token'), localStorage.getItem('usrtoken')).then(addFolderClientRes11 => {
              }).catch(err => {
                console.log(err);
              });
              SmartService.addFolder({
                name: 'CHARGE DE PIECES',
                folder_id: addFolderClient.data.id
              }, localStorage.getItem('token'), localStorage.getItem('usrtoken')).then(addFolderClientRes11 => {
              }).catch(err => {
                console.log(err);
              });
              SmartService.addFolder({
                name: 'CONVOCATIONS',
                folder_id: addFolderClient.data.id
              }, localStorage.getItem('token'), localStorage.getItem('usrtoken')).then(addFolderClientRes11 => {
              }).catch(err => {
                console.log(err);
              });
              SmartService.addFolder({
                name: 'ADMIN (Lettre d\'engagement)',
                folder_id: addFolderClient.data.id
              }, localStorage.getItem('token'), localStorage.getItem('usrtoken')).then(addFolderClientRes11 => {
              }).catch(err => {
                console.log(err);
              });
              SmartService.addFolder({
                name: 'COMPTABILITE',
                folder_id: addFolderClient.data.id
              }, localStorage.getItem('token'), localStorage.getItem('usrtoken')).then(addFolderClientRes11 => {
              }).catch(err => {
                console.log(err);
              });
              SmartService.addFolder({
                name: 'CORRESPONDANCE',
                folder_id: addFolderClient.data.id
              }, localStorage.getItem('token'), localStorage.getItem('usrtoken')).then(addFolderClientRes11 => {
              }).catch(err => {
                console.log(err);
              });
              SmartService.addFolder({
                name: 'INTERNE ****',
                folder_id: addFolderClient.data.id
              }, localStorage.getItem('token'), localStorage.getItem('usrtoken')).then(addFolderClientRes11 => {
              }).catch(err => {
                console.log(err);
              });
              SmartService.addFolder({
                name: 'NOTES',
                folder_id: addFolderClient.data.id
              }, localStorage.getItem('token'), localStorage.getItem('usrtoken')).then(addFolderClientRes11 => {
              }).catch(err => {
                console.log(err);
              });
              SmartService.addFolder({
                name: 'PV RENDEZ-VOUS',
                folder_id: addFolderClient.data.id
              }, localStorage.getItem('token'), localStorage.getItem('usrtoken')).then(addFolderClientRes11 => {
                console.log('OK');
              }).catch(err => {
              });
              SmartService.addFolder({
                name: 'PROCEDURES',
                folder_id: addFolderClient.data.id
              }, localStorage.getItem('token'), localStorage.getItem('usrtoken')).then(addFolderClientRes11 => {
              }).catch(err => {
                console.log(err);
              });
              SmartService.addFolder({
                name: 'RECHERCHES JURIDIQUES',
                folder_id: addFolderClient.data.id
              }, localStorage.getItem('token'), localStorage.getItem('usrtoken')).then(addFolderClientRes11 => {
              }).catch(err => {
                console.log(err);
              });

              findCopy.folder_id = addParentClientFolderRes.data.id;
              findCopy.folders = [
                {
                  folder_id:addFolderClient.data.id,
                  team:team,
                  name:this.state.newClientFolder.nom,
                  contrepartie:this.state.newClientFolder.contrepartie,
                  autrepartie:this.state.newClientFolder.autrepartie,
                  desc:this.state.newClientFolder.desc,
                  created_at:moment().format("YYYY-MM-DD"),
                  facturation:{
                    byEmail:this.state.newClientFolder.byEmail,
                    sentBySecr:this.state.newClientFolder.sentBySecr,
                    sentByAvocat:this.state.newClientFolder.sentByAvocat,
                    language:this.state.newClientFolder.language,
                    frequence:this.state.newClientFolder.frequence
                  }
                }
              ];

              firebase.database().ref('/'+firebase_ent_begin_name+"-clients_tempo-"+ged_id+'/'+findInCopyKey).set(findCopy).then( ok => {
                setTimeout(() => {
                  this.setState({
                    loading: false,
                    newClientFolder: {
                      nom: '',
                      type: 'corporate',
                      team: [],
                      contrepartie:'',
                      autrepartie:'',
                      desc:'',
                      byEmail:true,
                      sentBySecr:false,
                      sentByAvocat:false,
                      frequence:'',
                      language:"Francais"
                    },
                    lead_contact_tmp: '',
                    lead_contact_horaire_tmp: ''
                  });
                  this.justReloadGed();
                  this.openSnackbar('success', 'Dossier ajouté avec succès');
                }, 750);
              });



            }).catch(err => console.log(err))


          }).catch(err => console.log(err))

        }
      }

      else {
        SmartService.create_client(localStorage.getItem('token'), localStorage.getItem('usrtoken'), {
          param: {
            name: this.state.selectedSociete.Nom + ' ' + (this.state.selectedSociete.Prenom || ''),
            base64: false, parent_id: false, function: false, phone: false, mobile: false, email: false, website: false, title: false
          }
        }).then(createClientRes => {

          SmartService.addFolder({
            name: this.state.selectedSociete.Nom + ' ' + (this.state.selectedSociete.Prenom || ''),
            folder_id: CLIENTS_folder_id
          }, localStorage.getItem('token'), localStorage.getItem('usrtoken')).then(addParentClientFolderRes => {
            console.log('OK');

            SmartService.addFolder({
              name: this.state.newClientFolder.nom,
              folder_id: addParentClientFolderRes.data.id,
            },localStorage.getItem('token'), localStorage.getItem('usrtoken')).then(addFolderClient => {

              console.log('OK 1');

              SmartService.addFolder({
                name: 'MÉMOIRE',
                folder_id: addFolderClient.data.id
              }, localStorage.getItem('token'), localStorage.getItem('usrtoken')).then(addFolderClientRes11 => {
                console.log('OK');
              }).catch(err => {
                console.log(err);
              });
              SmartService.addFolder({
                name: 'CHARGE DE PIECES',
                folder_id: addFolderClient.data.id
              }, localStorage.getItem('token'), localStorage.getItem('usrtoken')).then(addFolderClientRes11 => {
                console.log('OK');
              }).catch(err => {
                console.log(err);
              });
              SmartService.addFolder({
                name: 'CONVOCATIONS',
                folder_id: addFolderClient.data.id
              }, localStorage.getItem('token'), localStorage.getItem('usrtoken')).then(addFolderClientRes11 => {
                console.log('OK');
              }).catch(err => {
                console.log(err);
              });
              SmartService.addFolder({
                name: 'ADMIN (Lettre d\'engagement)',
                folder_id: addFolderClient.data.id
              }, localStorage.getItem('token'), localStorage.getItem('usrtoken')).then(addFolderClientRes11 => {
                console.log('OK');
              }).catch(err => {
                console.log(err);
              });
              SmartService.addFolder({
                name: 'COMPTABILITE',
                folder_id: addFolderClient.data.id
              }, localStorage.getItem('token'), localStorage.getItem('usrtoken')).then(addFolderClientRes11 => {
                console.log('OK');
              }).catch(err => {
                console.log(err);
              });
              SmartService.addFolder({
                name: 'CORRESPONDANCE',
                folder_id: addFolderClient.data.id
              }, localStorage.getItem('token'), localStorage.getItem('usrtoken')).then(addFolderClientRes11 => {
                console.log('OK');
              }).catch(err => {
                console.log(err);
              });
              SmartService.addFolder({
                name: 'INTERNE ****',
                folder_id: addFolderClient.data.id
              }, localStorage.getItem('token'), localStorage.getItem('usrtoken')).then(addFolderClientRes11 => {
                console.log('OK');
              }).catch(err => {
                console.log(err);
              });
              SmartService.addFolder({
                name: 'NOTES',
                folder_id: addFolderClient.data.id
              }, localStorage.getItem('token'), localStorage.getItem('usrtoken')).then(addFolderClientRes11 => {
                console.log('OK');
              }).catch(err => {
                console.log(err);
              });
              SmartService.addFolder({
                name: 'PV RENDEZ-VOUS',
                folder_id: addFolderClient.data.id
              }, localStorage.getItem('token'), localStorage.getItem('usrtoken')).then(addFolderClientRes11 => {
                console.log('OK');
              }).catch(err => {
                console.log(err);
              });
              SmartService.addFolder({
                name: 'PROCEDURES',
                folder_id: addFolderClient.data.id
              }, localStorage.getItem('token'), localStorage.getItem('usrtoken')).then(addFolderClientRes11 => {
                console.log('OK');
              }).catch(err => {
                console.log(err);
              });
              SmartService.addFolder({
                name: 'RECHERCHES JURIDIQUES',
                folder_id: addFolderClient.data.id
              }, localStorage.getItem('token'), localStorage.getItem('usrtoken')).then(addFolderClientRes11 => {
                console.log('OK');
              }).catch(err => {
                console.log(err);
              });

              clients_tmp_copie.push({
                folder_id: addParentClientFolderRes.data.id,
                ID: ID,
                email: localStorage.getItem('email'),
                client_id: createClientRes.data.id,
                folders:[
                  {
                    folder_id:addFolderClient.data.id,
                    team:team,
                    name:this.state.newClientFolder.nom,
                    contrepartie:this.state.newClientFolder.contrepartie,
                    autrepartie:this.state.newClientFolder.autrepartie,
                    desc:this.state.newClientFolder.desc,
                    created_at:moment().format("YYYY-MM-DD"),
                    facturation:{
                      byEmail:this.state.newClientFolder.byEmail,
                      sentBySecr:this.state.newClientFolder.sentBySecr,
                      sentByAvocat:this.state.newClientFolder.sentByAvocat,
                      language:this.state.newClientFolder.language,
                      frequence:this.state.newClientFolder.frequence
                    }
                  }
                ]
              });
              firebase.database().ref('/'+firebase_ent_begin_name+"-clients_tempo-"+ged_id).set(clients_tmp_copie).then( ok => {
                setTimeout(() => {
                  this.setState({
                    loading: false,
                    newClientFolder: {
                      nom: '',
                      type: 'corporate',
                      team: [],
                      contrepartie:'',
                      autrepartie:'',
                      desc:'',
                      byEmail:true,
                      sentBySecr:false,
                      sentByAvocat:false,
                      frequence:'',
                      language:"Francais"
                    },
                    lead_contact_tmp: '',
                    lead_contact_horaire_tmp: ''
                  });
                  this.justReloadGed();
                  this.openSnackbar('success', 'Dossier ajouté avec succès');
                }, 750);
              });
            }).catch(err => {
              console.log(err);
            });
          }).catch(err => {
            console.log(err);
          });






        }).catch(err => {
          console.log(err);
        });
      }

    }else{
      this.setState({loading:false})
      this.openSnackbar("error","Opération annulée, une erreur est survenue ! Dossier CLIENTS inexistant")
    }

  }

  addNewClient() {
    this.setState({ firstLoading: true, loading: true, openNewClientModal: false });
    let all_clients = this.state.annuaire_clients_mondat;
    let newClient = this.state.newClient;
    newClient.ID = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
    newClient.created_at = (new Date()).toDateString();
    all_clients.push(newClient);

    firebase.database().ref('/'+firebase_ent_begin_name+'-clients-'+ged_id+'/' + (all_clients.length - 1)).set(newClient).then(ok => {
      this.openSnackbar('success', newClient.Nom + ' est ajouté avec succès ');
      this.props.history.push('/home/clients/' + newClient.ID);
      this.setState({
        firstLoading: false, loading: false,
        selectedSociete: newClient,
        selectedSocieteKey: newClient.ID
      });
      setTimeout(() => {
        this.setState({
          newClient: { ID: '', nom: '',prenom:'', Type: '0', created_at: '', country: '', email: '', phone: '', isActif: true }
        });
      }, 400);
    });
  }

  uploadFilesToGed(files){
    let calls = [];
    this.setState({ openUploadToast: true });
    for (let i = 0; i < files.length; i++) {
      if(files[i].type === "application/pdf"){
        let formData = new FormData();
        formData.append('file', files[i]);
        this.state.selectedFolderId !== '' &&
        formData.append(
          'folder_id',
          this.state.selectedFolderId
        );
        calls.push(axios.request({
            method: 'POST', url: data.endpoint + '/ged/'+ged_id+'/doc/addfile',
            data: formData,
            headers: {
              'Content-Type': 'multipart/form-data',
              'token': localStorage.getItem('token'),
              'usrtoken': localStorage.getItem('usrtoken')
            },
            onUploadProgress: (p) => {
              this.setState({ uploadToastMessage: files[i].name + ' : ' + ((p.loaded / p.total) * 100).toFixed(2).concat(' %').toString() });
            }
          })
        );
      }
    }
    Promise.all(calls).then(response => {
      this.setState({ openUploadToast: false, uploadToastMessage: '' });
      this.openSnackbar('success', calls.length === 1 ? calls.length +  ' fichier est ajouté avec succès' : calls.length +" fichiers sont ajoutés avec succès");
      this.reloadGed();
    }).catch(err => {
      this.setState({ loading: false });
      console.log(err);
    });
  }

  deleteManyFiles(files){
    const r = window.confirm(
      'Voulez-vous vraiment supprimer les fichiers sélectionnés ?'
    );
    if (r === true) {
      this.setState({ loading: true });
      let calls = [];
      for (let i = 0; i < files.length; i++) {
        let file = files[i];
        calls.push(
          SmartService.deleteFile(file.key || file.id, localStorage.getItem('token'), localStorage.getItem('usrtoken'))
        )
      }
      Promise.all(calls).then(response => {
        this.openSnackbar('success', calls.length === 1 ? calls.length + ' 1 fichier est supprimé' : calls.length +" fichiers sont supprimés avec succès");
        this.reloadGed();
      }).catch(err => {
        this.setState({ loading: false });
        console.log(err);
      });
    }

  }

  createLignefacture(duplicate){

    let obj = this.state.TimeSheet;
    let objCopy = this.state.TimeSheet;
    let time = obj.newTime.duree;
    let timeFormated = '';
    if (time.indexOf(':') > -1) {
      timeFormated = parseFloat(time.replace(':', '.'));
    } else if (time.indexOf('.') > -1) {
      timeFormated = parseFloat(time);
    } else if (time.indexOf(':') === -1 && time.indexOf('.') === -1) {
      timeFormated = parseInt(time);
    } else {
      this.openSnackbar('error', 'Le format de la durée est invalide !');
    }
    if ((typeof timeFormated) !== 'number' || isNaN(timeFormated)) {
      this.openSnackbar('error', 'Le format de la durée est invalide !');
    } else {

      if(timeFormated === 0 ){
        this.openSnackbar('error', 'La durée doit etre supérieur à 0 ');
      }else{

        /*obj.newTime.duree = timeFormated;*/
        let lignes_fact = this.state.lignesFactures || [];

        SmartService.create_company(localStorage.getItem('token'), localStorage.getItem('usrtoken'), { param: { name: obj.newTime.client } }).then(newCompRes => {
          if(newCompRes.succes === true && newCompRes.status === 200){
            /*obj.newTime.company_id = newCompRes.data.id;
            obj.newTime.date = moment(this.state.TimeSheet.newTime.date).format('YYYY-MM-DD');
            obj.uid = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
            obj.user_email = localStorage.getItem('email');
            //obj.template = this.state.lignef_template;
            //obj.newTime.client = this.state.selectedClientTimeEntree;*/
            lignes_fact.push({
              newTime: {
                company_id:newCompRes.data.id,
                date:moment(this.state.TimeSheet.newTime.date).format('YYYY-MM-DD'),
                duree: timeFormated,
                client: this.state.TimeSheet.newTime.client,
                dossier_client:this.state.TimeSheet.newTime.dossier_client,
                categoriesActivite: this.state.TimeSheet.newTime.categoriesActivite,
                description: this.state.TimeSheet.newTime.description,
                utilisateurOA: this.state.TimeSheet.newTime.utilisateurOA,
                rateFacturation: this.state.TimeSheet.newTime.rateFacturation,
                langue:''
              },
              uid:Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15),
              user_email:localStorage.getItem('email')
            });

            if(duplicate === false){
              this.setState({
                lignesFactures: lignes_fact,
                selectedClientTimeEntree:'',
                TimeSheet: {
                  newTime: {
                    duree: '',
                    client: '',
                    dossier_client:{
                      name:'',
                      facturation:{
                        language:''
                      }
                    },
                    categoriesActivite: 'Temps facturé',
                    description: '',
                    date: new Date(),
                    utilisateurOA: obj.newTime.utilisateurOA,
                    rateFacturation: obj.newTime.rateFacturation
                  }
                }
              });
            }
            else{
              this.setState({
                lignesFactures: lignes_fact,
                TimeSheet: {
                  newTime: {
                    duree: objCopy.newTime.duree,
                    client: objCopy.newTime.client,
                    dossier_client:objCopy.newTime.dossier_client,
                    categoriesActivite: objCopy.newTime.categoriesActivite,
                    description: objCopy.newTime.description,
                    date: new Date(objCopy.newTime.date),
                    utilisateurOA: objCopy.newTime.utilisateurOA,
                    rateFacturation: objCopy.newTime.rateFacturation
                  }
                }
              })
            }
            this.updateLignes_facture(lignes_fact);
            this.openSnackbar('success', 'Enregistrement effectué avec succès');
          }else{
            console.log(newCompRes.error)
          }
        }).catch(err => {
          console.log(err)
        })



      }
    }
  }

  updateLigneFacture(id,ligne){
    let key = this.state.lignesFacturesCopy.findIndex(x => x.uid === id);
    if(key){
      firebase.database().ref('/'+firebase_ent_begin_name+'-lignes_f-'+ged_id+'/'+key).set(ligne).then( ok => {
        this.openSnackbar("success","Modification effectuée avec succès")
      }).catch(err => {
        console.log(err)
        this.openSnackbar("error","Une erreur est survenue !")
      })
    }else{
      this.openSnackbar("error","Une erreur est survenue !")
    }

  }

  addNewroomTask(title, selectedClient, assignedTo, team, selectedDateTime){
    let room = this.state.selectedRoom;
    let tasks = room.tasks || [];
    tasks.push({
      title: title,
      assignedTo: assignedTo,
      team: team,
      dateTime: selectedDateTime,
      clientAttribution: selectedClient
    });
    room.tasks = tasks;
    firebase.database()
        .ref('/'+firebase_ent_begin_name+'-rooms-'+ged_id+'/' + this.state.selectedRoomKey)
        .set(room)
        .then((ok) => {
          this.setState({ selectedRoom: room });
          let emails = [];
          let teamNames = [];
          team.map((t, key) => {
            emails.push(t.email);
            teamNames.push(t.fname);
          });
          emails.push(assignedTo.email);
          maillingService
              .sendCustomMailsWithUrl({
                recipients: emails,
                subject: 'Nouvelle tâche ajoutée ',
                msg:
                    'Bonjour, <br> Une tâche avec le nom \'' +
                    title +
                    '\' vous a été attribué pour la date du ' +
                    selectedDateTime +
                    ' .<br><br> <b>Team: </b> ' +
                    teamNames.join(', ') +
                    '<br><b>Lead: </b> ' +
                    assignedTo.prenom +
                    ' ' +
                    assignedTo.nom +
                    '<br><br>' +
                    'Pour plus de détails, merci de consulter votre compte sur OA Legal.<br><br>',
                footerMsg:
                    '<br><br> Cordialement<br>L\'équipe OA Legal',
                linkUrl: 'Consulter',
                url:
                    'https://smartdom.ch:8035/home/rooms/' +
                    this.state.selectedRoomKey
              })
              .then((ok) => {

              })
              .catch((err) => {
                this.openSnackbar(
                    'error',
                    'L\'envoi du mail de notification à été échoué ! '
                );
              });
          this.openSnackbar(
              'success',
              'Une notification par mail à été bien envoyé au Lead et au différents membre du Team'
          );
        });
  }

  deleteRoomTask(key){
    const r = window.confirm(
        'Voulez-vous vraiment supprimer cette tâche ?'
    );
    if (r === true) {
      let room = this.state.selectedRoom;
      let tasks = room.tasks;
      tasks.splice(key, 1);
      room.tasks = tasks;
      firebase.database().ref('rooms/' + this.state.selectedRoomKey).set(room).then((ok) => {
            this.setState({ selectedRoom: room });
          });
    }
  }

  getDataDashboard(email){

    fetch(url+'questionbyEmail/'+email.trim(),{
      method:'GET',
    }).then((res)=>res.json()).then((result)=>{
      if(result.length!==0){
        this.setState({patientData:result[0]})
      }
    })
  }

  getBodyCheckNl(email){

    this.setState({bodyCheck:""})
    fetch(url+'BodyCheckByEmail/'+email.trim(),{
      method:'GET',
    }).then((res)=>res.json()).then((result)=>{
      if(result.length!==0){
        QuestionService.getBodyCheckdata(email).then((databd)=>{
          this.setState({bodyCheck:databd.data})
        })
      }
    })
  }

  sendBodyChekMail(email,name){
    let dd =""
    if(name === "parrainage" ){
      dd={
        emailReciver:email,
        subject:"1foof1me Quizz",
        linkUrl :"Click ici ",
        ////url 1foof1me project
        url:question1food1me,
        msg:"1foof1me  Quizz ",
        footerMsg : "merci"
      }
    }else if(name==="bodycheck"){
      dd={
        emailReciver:email,
        subject:"BodyCheck NL ",
        linkUrl :"Click ici ",
        ////url 1foof1me project
        url:bodycheckQuestion,
        msg:"body check quizz NL  ",
        footerMsg : "merci"
      }
    }

    fetch(url+'sendCustomMailWithUrl', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body:JSON.stringify(dd)
    }).then(response => response.json()).then((res)=>{
      if (res.status===200){
        this.openSnackbar('success',
            'Mail a été envoyé avec succès')
      }
    }).catch(error => {
      console.log(error);
    })
  }

  deletepatient(id){
    fetch(url+'deletePatient/'+id, {
      method: 'GET',
    }).then(()=>{this.componentDidMount()})
        .catch(error => {
          console.log(error);
        });
  }

  getpatient(){
    PatientService.getPatients().then((res)=>{
      if (res){
        this.setState({patients:res})
      }
    }).catch(err => {console.log(err)})
  }

  getRecettes(){
    recetteService.getRecettes().then(res => {
      if(res){
        this.setState({recettes:res})
      }
    }).catch(err => {console.log(err)})
  }

  addNewContact(){
    this.setState({ firstLoading: true, loading: true, openAddContactModal: false });
    let all_contacts = this.state.contacts;
    let newContact = this.state.newContact;
    newContact.uid = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
    all_contacts.push(newContact);

    firebase.database().ref('/' + firebase_ent_begin_name + '-contacts-' + ged_id + '/' + (all_contacts.length - 1)).set(newContact).then( ok => {
      this.openSnackbar('success', newContact.nom + ' ' + newContact.prenom + ' est ajouté avec succès ');
      this.props.history.push('/home/contacts/' + newContact.uid);
      this.setState({
        firstLoading: false, loading: false,
        selectedContact: newContact,
        selectedContactKey: newContact.uid
      });
      setTimeout(() => {
        this.setState({
          newContact: { uid: '', nom: '',prenom:'',  type: '', created_at: '', email: '', phone: '',rateFacturation:'' }
        });
      }, 400);
    });
  }

  render() {

    const inputSuggProps = {
      placeholder: '0:1, 0:15, 0:30...',
      value: this.state.TimeSheet.newTime.duree,
      onChange: this.onInputTimeSuggChange
    };
    const current_user_contact = main_functions.getOAContactByEmail2(this.state.contacts,localStorage.getItem("email"))

    let new_timeSheet_desc = this.state.TimeSheet.newTime.dossier_client.facturation.language === "Francais" ?
      "Description (français)" : this.state.TimeSheet.newTime.dossier_client.facturation.language === "Anglais" ?
        "Description (anglais)" : "Description"

    return (
      <div>
        {this.state.firstLoading === false && (
          <div>
            <TopBar
              logo={this.state.logo}
              height={70}
              onClickMenuIcon={() => this.setState({ openSideMenu: true })}
              onLogoutClick={() => {
                let logoCp = this.state.logo;
                localStorage.clear();
                localStorage.setItem("logo",logoCp)
                setTimeout(() => {
                  this.props.history.push('/login');
                },250)
              }}
              textSearch={this.state.textSearch}
              onChangeSearch={(value) => {
                this.setState({ textSearch: value });
              }}
              onRequestSearch={() => {
                this.setState({
                  loading: true,
                  showContainerSection: 'Drive',
                  focusedItem: 'Drive'
                });
                this.props.history.push('/home/search/' + this.state.textSearch);
                SmartService.search(
                  this.state.textSearch,
                  localStorage.getItem('token'),
                  localStorage.getItem('usrtoken')
                )
                  .then((searchRes) => {
                    if (searchRes.succes === true && searchRes.status === 200) {
                      this.setState({
                        loading: false,
                        searchResult: searchRes.data
                      });
                    } else {
                      console.log(searchRes.error);
                    }
                  })
                  .catch((err) => {
                    console.log(err);
                  });
              }}
              current_user_contact={current_user_contact}
            />
            <SideMenu
              logo={this.state.logo}
              items={data.sideBarItems}
              iconColor={'blue'}
              textColor={'#65728E'}
              history={this.props.history}
              opened={this.state.openSideMenu}
              onClose={() => this.setState({ openSideMenu: false })}
            />
          </div>
        )}

        <MuiBackdrop open={this.state.firstLoading} />
        <MuiBackdrop open={this.state.loading} />

        <div style={{ marginRight: 50, marginTop: 75, marginLeft: 5 }}>
          <div>

            <div style={{ display: 'flex' }}>
              <div
                style={{
                  height: 900,
                  overflow: 'overlay',
                  minHeight: 900,
                  width: 300,
                  minWidth: 300
                }}
              >
                {this.state.firstLoading === false && (
                  this.renderLeftMenu()
                )}
              </div>

              <div style={{ flexWrap: 'wrap', flex: '1 1 auto',overflowY:"auto" }}>
                <div className="card">
                  <div className="card-body" style={{ minHeight: 750 }}>

                    <Switch>

                      <Route exact path="/home/drive">
                        <div>
                          {
                            (this.state.loading === false && this.state.firstLoading === false) &&
                            <div>
                                    <div
                                      style={{
                                        display: 'flex',
                                        justifyContent: 'space-between'
                                      }}
                                    >
                                      <div style={{ width: '100%' }}>
                                        <h5 className="mt-0 mb-1">
                                          {this.props.location.pathname.indexOf('/home/search/') > -1 ? 'Résultats de recherche'
                                            : this.props.location.pathname === '/home/drive' ? 'Mon drive'
                                              : this.state.breadcrumbs}
                                        </h5>
                                        <div
                                          style={{
                                            position: 'absolute',
                                            right: 25,
                                            marginTop: -44
                                          }}
                                        >
                                          <IconButton
                                            aria-label={
                                              this.state.viewMode === 'list'
                                                ? 'Vue liste'
                                                : 'Vue grille'
                                            }
                                            onClick={() => {
                                              this.state.viewMode === 'list'
                                                ? this.setState({
                                                  viewMode: 'grid'
                                                })
                                                : this.setState({
                                                  viewMode: 'list'
                                                });
                                            }}
                                            title={
                                              this.state.viewMode === 'list'
                                                ? 'Vue liste'
                                                : 'Vue grille'
                                            }
                                            color="default"
                                          >
                                            {this.state.viewMode === 'list' ? (
                                              <ViewComfyIcon />
                                            ) : (
                                              <ListIcon />
                                            )}
                                          </IconButton>
                                        </div>
                                        <div
                                          style={{
                                            height: 1,
                                            backgroundColor: '#dadce0',
                                            marginBottom: 15,
                                            marginTop: 15
                                          }}
                                        />
                                      </div>
                                    </div>
                                    <div
                                      style={{
                                        flexWrap: 'wrap',
                                        display: 'block'
                                      }}
                                    >
                                      {
                                        (this.state.folders.length === 0 && this.state.rootFiles.length === 0) ? (
                                        <div
                                          style={{
                                            marginTop: 25,
                                            display: 'flex'
                                          }}
                                        >
                                          <h5
                                            style={{
                                              fontSize: 16,
                                              color: 'gray'
                                            }}
                                          >
                                            Aucun dossier encore ajouté !
                                          </h5>
                                          &nbsp;&nbsp;
                                          <h6
                                            style={{
                                              cursor: 'pointer',
                                              color: '#000',
                                              textDecoration: 'underline'
                                            }}
                                            onClick={() => {
                                              this.setState({
                                                newFolderModal: true,
                                                newFolderFromRacine: true
                                              });
                                            }}
                                          >
                                            Ajouter un dossier
                                          </h6>
                                        </div>
                                      ) : (
                                        <div>
                                          <ListFolders
                                            items={this.state.rootFolders}
                                            onDoubleClickFolder={(folder) => {
                                              this.props.history.push({
                                                pathname: '/home/drive/' + folder.id
                                              });
                                              this.setState({
                                                selectedDriveItem: [folder.id],
                                                expandedDriveItems: [folder.id],
                                                autoExpandParent: true,
                                                selectedFolder: main_functions.getFolderById(folder.id, this.state.folders),
                                                selectedFoldername: folder.name,
                                                selectedFolderFiles:
                                                  folder.Content.files || [],
                                                selectedFolderFolders:
                                                  folder.Content.folders || [],
                                                focusedItem: 'Drive',
                                                breadcrumbs: main_functions.getBreadcumpsPath(folder.id, this.state.reelFolders.concat(this.state.sharedReelFolders)),
                                                selectedFolderId: folder.id,
                                                showContainerSection: 'Drive'
                                              });
                                            }}
                                          />
                                          <ListDocs
                                            docs={this.state.rootFiles || []}
                                            viewMode={this.state.viewMode}
                                            onDocClick={(item) => {
                                              this.openPdfModal(item.id || item.key)
                                            }}
                                            showDoc={(doc) =>
                                              this.openPdfModal(doc.id)
                                            }
                                            setLoading={(b) =>
                                              this.setState({ loading: b })
                                            }
                                            setSelectedFile={(file) =>
                                              this.setState({
                                                selectedFile: file
                                              })
                                            }
                                            openShareFileModal={() =>
                                              this.setState({
                                                openShareDocModal: true
                                              })
                                            }
                                            onDeleteFile={(file) => {
                                              this.deleteFile_Folder(file);
                                            }}
                                            onRenameFile={(file, newName) => {
                                              this.renameFile_Folder(file, newName);
                                            }}
                                            onSignBtnClick={(id) => {
                                              this.props.history.push(
                                                '/signDoc/doc/' + id
                                              );
                                            }}
                                            onDropFile={(files) => {
                                              this.uploadFilesToGed(files)
                                            }}
                                            setDocs={(docs) => this.setState({rootFiles:docs})}
                                            onDeleteFiles={(files) => {this.deleteManyFiles(files)}}
                                            applyRights={false}
                                            selectedSharedFolder={this.state.selectedSharedFolder}
                                          />
                                        </div>
                                      )}
                                    </div>
                                  </div>
                          }
                        </div>
                      </Route>

                      <Route exact path="/home/drive/:folder_id">
                        {this.state.loading === false &&
                        this.state.firstLoading === false && (
                          <div>
                            <div
                              style={{
                                display: 'flex',
                                justifyContent: 'space-between'
                              }}
                            >
                              <div style={{ width: '100%' }}>
                                <h5 className="mt-0 mb-1">
                                  {this.state.breadcrumbs}
                                </h5>
                                <div
                                  style={{
                                    position: 'absolute',
                                    right: 25,
                                    marginTop: -44
                                  }}
                                >
                                  <IconButton
                                    aria-label={
                                      this.state.viewMode === 'list'
                                        ? 'Vue liste'
                                        : 'Vue grille'
                                    }
                                    onClick={() => {
                                      this.state.viewMode === 'list'
                                        ? this.setState({
                                          viewMode: 'grid'
                                        })
                                        : this.setState({
                                          viewMode: 'list'
                                        });
                                    }}
                                    title={
                                      this.state.viewMode === 'list'
                                        ? 'Vue liste'
                                        : 'Vue grille'
                                    }
                                    color="default"
                                  >
                                    {this.state.viewMode === 'list' ? (
                                      <ViewComfyIcon />
                                    ) : (
                                      <ListIcon />
                                    )}
                                  </IconButton>
                                </div>
                                <div
                                  style={{
                                    height: 1,
                                    backgroundColor: '#dadce0',
                                    marginBottom: 15,
                                    marginTop: 15
                                  }}
                                />
                              </div>
                            </div>
                            <FolderDetail
                              selectedFolderFolders={
                                this.state.selectedFolderFolders
                              }
                              selectedFolderFiles={this.state.selectedFolderFiles}
                              viewMode={this.state.viewMode}
                              onDoubleClickFolder={(folder) => {
                                this.setState({
                                  selectedDriveItem: [folder.id],
                                  expandedDriveItems: [folder.id],
                                  selectedFolder: main_functions.getFolderById(folder.id, this.state.folders),
                                  autoExpandParent: true,
                                  selectedFoldername: folder.name,
                                  selectedFolderFiles: folder.Content.files || [],
                                  selectedFolderFolders:
                                    folder.Content.folders || [],
                                  focusedItem: 'Drive',
                                  breadcrumbs: main_functions.getBreadcumpsPath(folder.id, this.state.reelFolders.concat(this.state.sharedReelFolders)),
                                  selectedFolderId: folder.id,
                                  showContainerSection: 'Drive'
                                });
                              }}
                              onDocClick={(doc) => {
                                this.openPdfModal(doc.id || doc.key)
                              }}
                              showDoc={(doc) => this.openPdfModal(doc.id)}
                              setLoading={(b) => this.setState({ loading: b })}
                              setSelectedFile={(file) =>
                                this.setState({ selectedFile: file })
                              }
                              openShareFileModal={() =>
                                this.setState({ openShareDocModal: true })
                              }
                              onDeleteFile={(file) => {
                                this.deleteFile_Folder(file);
                              }}
                              onRenameFile={(file, newName) => {
                                this.renameFile_Folder(file, newName);
                              }}
                              onSignBtnClick={(id) => {
                                this.props.history.push('/signDoc/doc/' + id);
                              }}
                              onDropFile={(files) => {
                                this.uploadFilesToGed(files)
                              }}
                              setDocs={(docs) => this.setState({rootFiles:docs})}
                              onDeleteFiles={(files) => {this.deleteManyFiles(files)}}
                              applyRights={false}
                              selectedSharedFolder={this.state.selectedSharedFolder}
                            />
                          </div>
                        )}
                      </Route>

                      <Route exact path="/home/shared/parent">
                        <div>
                          {
                            (this.state.loading === false && this.state.firstLoading === false) &&
                            <div>
                              <div
                                style={{
                                  display: 'flex',
                                  justifyContent: 'space-between'
                                }}
                              >
                                <div style={{ width: '100%' }}>
                                  <h5 className="mt-0 mb-1">
                                    {this.props.location.pathname.indexOf('/home/search/') > -1 ? 'Résultats de recherche'
                                      : this.props.location.pathname === '/home/shared/parent' ? 'Mon drive / Partagés avec moi'
                                        : this.state.breadcrumbs}
                                  </h5>
                                  <div
                                    style={{
                                      position: 'absolute',
                                      right: 25,
                                      marginTop: -44
                                    }}
                                  >
                                    <IconButton
                                      aria-label={
                                        this.state.viewMode === 'list'
                                          ? 'Vue liste'
                                          : 'Vue grille'
                                      }
                                      onClick={() => {
                                        this.state.viewMode === 'list'
                                          ? this.setState({
                                            viewMode: 'grid'
                                          })
                                          : this.setState({
                                            viewMode: 'list'
                                          });
                                      }}
                                      title={
                                        this.state.viewMode === 'list'
                                          ? 'Vue liste'
                                          : 'Vue grille'
                                      }
                                      color="default"
                                    >
                                      {this.state.viewMode === 'list' ? (
                                        <ViewComfyIcon />
                                      ) : (
                                        <ListIcon />
                                      )}
                                    </IconButton>
                                  </div>
                                  <div
                                    style={{
                                      height: 1,
                                      backgroundColor: '#dadce0',
                                      marginBottom: 15,
                                      marginTop: 15
                                    }}
                                  />
                                </div>
                              </div>
                              <div
                                style={{
                                  flexWrap: 'wrap',
                                  display: 'block'
                                }}
                              >
                                {
                                  (this.state.sharedFolders.length === 0 && this.state.sharedRootFiles.length === 0) ? (
                                    <div
                                      style={{
                                        marginTop: 25,
                                        display: 'flex'
                                      }}
                                    >
                                      <h5
                                        style={{
                                          fontSize: 16,
                                          color: 'gray'
                                        }}
                                      >
                                        Aucun dossier ou fichier encore partagé avec vous !
                                      </h5>
                                    </div>
                                  ) : (
                                    <div>
                                      <ListFolders
                                        items={this.state.sharedReelFolders}
                                        onDoubleClickFolder={(folder) => {
                                          /*this.props.history.push('/home/shared/' + folder.id);
                                          this.setState({
                                            selectedDriveItem: [folder.id],
                                            expandedDriveItems: [folder.id],
                                            autoExpandParent: true,
                                            selectedFolder: main_functions.getFolderById(folder.id, this.state.folders),
                                            selectedFoldername: folder.name,
                                            selectedFolderFiles:
                                              folder.Content.files || [],
                                            selectedFolderFolders:
                                              folder.Content.folders || [],
                                            focusedItem: 'Drive',
                                            breadcrumbs: main_functions.getBreadcumpsPath(folder.id, this.state.reelFolders.concat(this.state.sharedReelFolders)),
                                            selectedFolderId: folder.id,
                                            showContainerSection: 'Drive'
                                          });*/
                                        }}
                                      />
                                      <ListDocs
                                        docs={this.state.sharedRootFiles || []}
                                        viewMode={this.state.viewMode}
                                        onDocClick={(item) =>
                                          this.openPdfModal(item.id || item.key)
                                        }
                                        showDoc={(doc) =>
                                          this.openPdfModal(doc.id)
                                        }
                                        setLoading={(b) =>
                                          this.setState({ loading: b })
                                        }
                                        setSelectedFile={(file) =>
                                          this.setState({
                                            selectedFile: file
                                          })
                                        }
                                        openShareFileModal={() =>
                                          this.setState({
                                            openShareDocModal: true
                                          })
                                        }
                                        onDeleteFile={(file) => {
                                          this.deleteFile_Folder(file);
                                        }}
                                        onRenameFile={(file, newName) => {
                                          this.renameFile_Folder(file, newName);
                                        }}
                                        onSignBtnClick={(id) => {
                                          this.props.history.push(
                                            '/signDoc/doc/' + id
                                          );
                                        }}
                                        onDropFile={(node) => {
                                          console.log(node)
                                        }}
                                        setDocs={(docs) => {}}
                                        onDeleteFiles={(files) => {}}
                                        applyRights={true}
                                        selectedSharedFolder={this.state.selectedSharedFolder}
                                      />
                                    </div>
                                  )}
                              </div>
                            </div>
                          }
                        </div>
                      </Route>

                      <Route exact path="/home/shared/:folder_id">
                        {this.state.loading === false &&
                        this.state.firstLoading === false && (
                          <div>
                            <div
                              style={{
                                display: 'flex',
                                justifyContent: 'space-between'
                              }}
                            >
                              <div style={{ width: '100%' }}>
                                <h5 className="mt-0 mb-1">
                                  {this.state.breadcrumbs}
                                </h5>
                                <div
                                  style={{
                                    position: 'absolute',
                                    right: 25,
                                    marginTop: -44
                                  }}
                                >
                                  <IconButton
                                    aria-label={
                                      this.state.viewMode === 'list'
                                        ? 'Vue liste'
                                        : 'Vue grille'
                                    }
                                    onClick={() => {
                                      this.state.viewMode === 'list'
                                        ? this.setState({
                                          viewMode: 'grid'
                                        })
                                        : this.setState({
                                          viewMode: 'list'
                                        });
                                    }}
                                    title={
                                      this.state.viewMode === 'list'
                                        ? 'Vue liste'
                                        : 'Vue grille'
                                    }
                                    color="default"
                                  >
                                    {this.state.viewMode === 'list' ? (
                                      <ViewComfyIcon />
                                    ) : (
                                      <ListIcon />
                                    )}
                                  </IconButton>
                                </div>
                                <div
                                  style={{
                                    height: 1,
                                    backgroundColor: '#dadce0',
                                    marginBottom: 15,
                                    marginTop: 15
                                  }}
                                />
                              </div>
                            </div>
                            <FolderDetail
                              selectedFolderFolders={
                                this.state.selectedSharedFolderFolders
                              }
                              selectedFolderFiles={this.state.selectedSharedFolderFiles}
                              viewMode={this.state.viewMode}
                              onDoubleClickFolder={(folder) => {}}
                              onDocClick={(doc) => {
                                this.openPdfModal(doc.id || doc.key)
                              }}
                              showDoc={(doc) => this.openPdfModal(doc.id)}
                              setLoading={(b) => this.setState({ loading: b })}
                              setSelectedFile={(file) =>
                                this.setState({ selectedFile: file })
                              }
                              openShareFileModal={() =>
                                this.setState({ openShareDocModal: true })
                              }
                              onDeleteFile={(file) => {
                                this.deleteFile_Folder(file);
                              }}
                              onRenameFile={(file, newName) => {
                                this.renameFile_Folder(file, newName);
                              }}
                              onSignBtnClick={(id) => {
                                this.props.history.push('/signDoc/doc/' + id);
                              }}
                              setDocs={(docs) => {}}
                              applyRights={true}
                              selectedSharedFolder={this.state.selectedSharedFolder}
                            />
                          </div>
                        )}
                      </Route>

                      <Route exact path="/home/search/:query">
                        {
                          this.state.loading === false && this.state.firstLoading === false &&
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
                                this.setState({ loading: true });
                                //console.log(item)
                                SmartService.getFile(item.file_id, localStorage.getItem('token'), localStorage.getItem('usrtoken')).then(fileRes => {
                                  if (fileRes.succes === true && fileRes.status === 200) {
                                    this.setState({ loading: false });
                                    this.showDocInPdfModal(fileRes.data.Content.Data);
                                  } else {
                                    console.log(fileRes.error);
                                  }
                                }).catch(err => console.log(err));
                              }}
                              setLoading={(b) => this.setState({ loading: b })}
                            />
                          </div>
                        }

                      </Route>

                      <Route exact path="/home/rooms">
                        {
                          this.state.loading === false && this.state.firstLoading === false && this.state.rooms.length === 0 &&
                          <div>
                            <h4 className="mt-0 mb-1">Rooms</h4>
                            <div style={{ marginTop: 25, display: 'flex' }}>
                              <h5 style={{ fontSize: 16, color: 'gray' }}>
                                Aucune "Room" encore ajouté !</h5>&nbsp;&nbsp;
                              <h6 style={{
                                cursor: 'pointer',
                                color: '#000',
                                textDecoration: 'underline', marginTop: 12
                              }} onClick={() => {
                                this.setState({
                                  openNewRoomModal: true
                                });
                              }}
                              >
                                Ajouter une</h6>
                            </div>
                          </div>
                        }

                      </Route>

                      <Route exact path="/home/rooms/:room_id">
                        {this.state.loading === false && this.state.firstLoading === false && (
                          <Rooms
                            rooms={this.state.rooms}
                            selectedRoom={this.state.selectedRoom}
                            contacts={this.state.contacts}
                            annuaire_clients={this.state.annuaire_clients_mondat}
                            addNewtask={(title, selectedClient, assignedTo, team, selectedDateTime) => {
                              this.addNewroomTask(title, selectedClient, assignedTo, team, selectedDateTime)
                            }}
                            onDeleteTask={(key) => {
                              this.deleteRoomTask(key)
                            }}
                          />
                        )}
                      </Route>

                      <Route exact path="/home/meet/new">
                        {this.state.firstLoading === false &&
                        this.state.loading === false && (
                          <div align="center" style={{ marginTop: 200 }}>
                            <h3>Prêt pour la réunion ?</h3>
                            <div style={{ display: 'inline-flex' }}>
                              <p
                                style={{
                                  cursor: 'pointer',
                                  textDecoration: 'underline'
                                }}
                              >
                                {this.state.meeturl}
                              </p>
                              <IconButton
                                aria-label="Visualiser"
                                title="Recharger le lien"
                                color="primary"
                                style={{ marginTop: -17 }}
                                onClick={() => {
                                  let meeturl = meet_url + '_' + moment().format('DDMMYYYYHHmmss');
                                  this.setState({ meeturl: meeturl });
                                }}
                              >
                                {' '}
                                <AutorenewIcon />{' '}
                              </IconButton>
                            </div>
                            <div style={{ display: 'block' }}>
                              <button
                                className="btn btn-rounded btn-outline-success"
                                style={{
                                  fontWeight: 'normal',
                                  marginRight: 15
                                }}
                                onClick={() => {
                                  window.open(this.state.meeturl, '_blank');
                                }}
                              >
                                Participer à la réunion
                              </button>
                              <button
                                onClick={() => {
                                  this.setState({ showInviteModal: true });
                                }}
                                className="btn btn-rounded btn-outline-info"
                                style={{ fontWeight: 'normal' }}
                              >
                                Ajouter des participants
                              </button>
                            </div>
                          </div>
                        )}
                      </Route>

                      <Route exact path="/home/meet/rejoin">
                        {this.state.firstLoading === false &&
                        this.state.loading === false && (
                          <div align="center" style={{ marginTop: 200 }}>
                            <h3>Vous avez un code de réunion ?</h3>
                            <p style={{ fontFamily: 'sans-serif' }}>
                              Pour participer à une réunion, saisissez le code de
                              réunion fourni par l'organisateur ou récu par mail
                            </p>
                            <div style={{ marginTop: 20 }}>
                              <input
                                className="form-control"
                                style={{ height: 40, width: 400 }}
                                onChange={(event) =>
                                  this.setState({
                                    meetCode: event.target.value
                                  })
                                }
                                placeholder="Exemple de code: meet_21072020184528"
                              />
                            </div>
                            <button
                              className="btn btn-rounded btn-success mt-3"
                              disabled={this.state.meetCode === ''}
                              style={{
                                fontWeight: 'normal',
                                marginRight: 15
                              }}
                              onClick={() => {
                                window.open(meet_url + '_' + this.state.meetCode, '_blank');
                              }}
                            >
                              Participer
                            </button>
                          </div>
                        )}
                      </Route>

                      <Route exact path="/home/contacts">
                          {
                            this.state.loading === false && this.state.firstLoading === false &&
                            <div>
                              <TableContact
                                  contacts={this.state.contacts}
                                  onEditClick={(contact, key) => {
                                    this.setState({
                                      selectedContact: contact,
                                      selectedContactKey: contact.uid
                                    });
                                    this.props.history.push('/home/contacts/' + contact.uid);
                                  }}
                                  onImportClick={(e) => {
                                    this.importCSVContacts(e)
                                  }}
                                  onAddBtnClick={() => {
                                    this.setState({
                                      openAddContactModal:true
                                    })
                                  }}
                              />
                            </div>
                          }
                        </Route>

                      <Route exact path="/home/contacts/:contact_id">
                        {
                          this.state.loading === false && this.state.firstLoading === false &&
                          <div>
                            <div className="row">
                              <div className="col-lg-12">
                                <div className="card-box text-center"
                                     style={{ marginTop: 1 }}>
                                  <img onClick={() => this.imageUpload.click()}
                                       src={this.state.selectedContact.imageUrl || defaultAvatar}
                                       className="rounded-circle avatar-lg img-thumbnail"
                                       alt="" style={{
                                    cursor: 'pointer',
                                    width: 120,
                                    height: 120,
                                    objectFit: 'contain'
                                  }} /> <input style={{
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
                                  <div style={{ display: 'contents' }}>
                                    <button type="button"
                                            onClick={this.saveContactChanges}
                                            className="btn btn-success btn-xs waves-effect mb-2 waves-light m-1">
                                      <i className="fe-edit" />&nbsp;&nbsp;Enregistrer
                                    </button>
                                    <button type="button"
                                            onClick={() => {}}
                                            className="btn btn-danger btn-xs waves-effect mb-2 waves-light m-1">
                                      <i className="fe-printer" />&nbsp;&nbsp;Aperçu
                                    </button>
                                    <button type="button"
                                            onClick={() => {}}
                                            className="btn btn-danger btn-xs waves-effect mb-2 waves-light m-1">
                                      <i className="fe-printer" />&nbsp;&nbsp;Book
                                    </button>
                                  </div>
                                  <div style={{ marginTop: 30 }}
                                       className="text-left">
                                    <Tabs>
                                      <TabList>
                                        <Tab>Informations générales</Tab>
                                        {
                                          localStorage.getItem('role') === 'admin' &&
                                          [
                                            <Tab key={0}>Famille & Vie privée</Tab>,
                                            <Tab key={1}>Parcours professionnel</Tab>,
                                            <Tab key={2}>Formations</Tab>,
                                            <Tab key={3}>Affiliations</Tab>,
                                            <Tab key={4}>Domaine d'activités</Tab>,
                                            <Tab key={5}>Langues</Tab>,
                                            <Tab key={6}>Domaines d'intérêt, loisirs et sports</Tab>
                                          ]
                                        }
                                      </TabList>
                                      <TabPanel>
                                        <h5 style={{ marginTop: 20 }}>Informations générales</h5>
                                        <div className="row"
                                             style={{ marginTop: 35 }}>
                                          <div className="col-md-8">
                                            <p style={{ marginBottom: 10 }}>À propos</p>
                                            <textarea
                                                rows={7}
                                                className="form-control"
                                                id="about"
                                                name="about"
                                                value={this.state.selectedContact.about}
                                                onChange={this.handleChange('selectedContact', 'about')} />
                                          </div>
                                          <div className="col-md-4">
                                            <h6>
                                              Taux horaire
                                            </h6>
                                            <Input
                                                className="form-control "
                                                id="duree354"
                                                style={{ width: '100%' }}
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
                                             style={{ marginTop: 35 }}>
                                          <div className="col-md-6">
                                            <p style={{ marginBottom: 10 }}>Nom</p>
                                            <input
                                                className="form-control"
                                                type="text"
                                                id="nom"
                                                name="nom"
                                                value={this.state.selectedContact.nom}
                                                onChange={this.handleChange('selectedContact','nom')} />
                                          </div>
                                          <div
                                              className="col-md-6">
                                            <p style={{ marginBottom: 10 }}>Prénom</p>
                                            <input
                                                className="form-control"
                                                type="text"
                                                id="prenom"
                                                name="prenom"
                                                value={this.state.selectedContact.prenom}
                                                onChange={this.handleChange('selectedContact', 'prenom')} />
                                          </div>
                                        </div>
                                        <div className="row"
                                             style={{ marginTop: 20 }}>
                                          <div className="col-md-6">
                                            <p style={{ marginBottom: 10 }}>Email</p>
                                            <input
                                                className="form-control"
                                                type="text"
                                                id="email"
                                                name="email"//readOnly={true}
                                                value={this.state.selectedContact.email}
                                                onChange={this.handleChange('selectedContact', 'email')} />
                                          </div>
                                          <div
                                              className="col-md-6">
                                            <p style={{ marginBottom: 10 }}>Téléphone</p>
                                            <input
                                                className="form-control"
                                                type="text"
                                                id="phone"
                                                name="phone"
                                                value={this.state.selectedContact.phone}
                                                onChange={this.handleChange('selectedContact', 'phone')} />
                                          </div>
                                        </div>
                                        <div className="row"
                                             style={{ marginTop: 20 }}>
                                          <div className="col-sm-6">
                                            <p style={{ marginBottom: 10 }}>Titre</p>
                                            <select
                                                className="form-control custom-select"
                                                id="titre"
                                                name="titre"
                                                placeholder="Titre"
                                                value={this.state.selectedContact.type}
                                                onChange={this.handleChange('selectedContact', 'type')}
                                            >
                                              {
                                                data.titres.map((titre, key) =>
                                                    <option
                                                        key={key}
                                                        value={titre.value}
                                                        label={titre.label} />
                                                )
                                              }
                                            </select>
                                          </div>
                                          <div className="col-sm-6">
                                            <p style={{ marginBottom: 10 }}>Pays</p>
                                            <select
                                                className="form-control custom-select"
                                                id="pays"
                                                name="pays"
                                                placeholder="Pays"
                                                value={this.state.selectedContact.pays}
                                                onChange={this.handleChange('selectedContact', 'pays')}>
                                              {
                                                countryList.map((country, key) =>
                                                    <option
                                                        key={key}
                                                        value={country.Name}
                                                        label={country.Name} />
                                                )
                                              }
                                            </select>
                                          </div>
                                        </div>
                                      </TabPanel>
                                      {
                                        localStorage.getItem('role') === 'admin' &&
                                        [
                                          <TabPanel key={0}>
                                            <h5 style={{ marginTop: 20 }}>Famille & Vie privée</h5>
                                            <div className="row"
                                                 style={{ marginTop: 35 }}>
                                              <div className="col-md-12">
                                                <p style={{ marginBottom: 10 }}>Décrire en quelques lignes </p>
                                                <textarea
                                                    rows={10}
                                                    className="form-control"
                                                    id="about"
                                                    name="about"
                                                    value={this.state.selectedContact.personalLife}
                                                    onChange={this.handleChange('selectedContact', 'personalLife')} />
                                              </div>
                                            </div>
                                          </TabPanel>,
                                          <TabPanel key={1}>
                                            <h5 style={{ marginTop: 20 }}>Parcours professionnel</h5>
                                            <div style={{
                                              display: 'flex',
                                              flexWrap: 'wrap',
                                              marginTop: 10
                                            }}>
                                              {
                                                (this.state.selectedContact.parcoursP || []).map((item, key) => (
                                                    <div key={key}
                                                         style={{ margin: 3 }}>
                                                      <Chip
                                                          icon={
                                                            <Staricon />}
                                                          label={item}
                                                          color="secondary"
                                                          onDelete={this.removeItem('parcour', key)}
                                                          style={{
                                                            fontWeight: 'bold',
                                                            backgroundColor: 'cornflowerblue'
                                                          }}
                                                      />
                                                    </div>
                                                ))
                                              }
                                            </div>
                                            <div className="row"
                                                 style={{ marginTop: 10 }}>
                                              <div
                                                  className="col-sm-12">
                                                <a style={{
                                                  cursor: 'pointer',
                                                  fontSize: 'medium',
                                                  fontWeight: 'bold'
                                                }}
                                                   onClick={this.openAddModal('parcour')}>
                                                  <span className="btn__text" id="btn-add-child">
                                                    <i className="fe-plus-square" /> Ajouter un parcour
                                                  </span>
                                                </a>
                                              </div>
                                            </div>
                                          </TabPanel>,
                                          <TabPanel key={2}>
                                            <h5 style={{ marginTop: 20 }}>Formation</h5>
                                            <div style={{flexWrap: 'wrap', marginTop: 10
                                            }}
                                            >
                                              {
                                                (this.state.selectedContact.formations || []).map((item, key) => (
                                                    <div key={key}
                                                         style={{
                                                           margin: 3,
                                                           marginBottom: 6
                                                         }}>
                                                      <Chip
                                                          icon={
                                                            <CheckCircle />}
                                                          label={item}
                                                          color="primary"
                                                          onDelete={this.removeItem('formation', key)}
                                                          style={{
                                                            fontWeight: 'bold',
                                                            backgroundColor: 'lightseagreen'
                                                          }}
                                                      />
                                                    </div>
                                                ))
                                              }
                                            </div>
                                            <div className="row"
                                                 style={{ marginTop: 10 }}>
                                              <div
                                                  className="col-sm-12">
                                                <a style={{
                                                  cursor: 'pointer',
                                                  fontSize: 'medium',
                                                  fontWeight: 'bold'
                                                }}
                                                   onClick={this.openAddModal('formation')}>
                                                  <span className="btn__text"
                                                        id="btn-add-child">
                                                    <i className="fe-plus-square" /> Ajouter une formation
                                                  </span>
                                                </a>
                                              </div>
                                            </div>
                                          </TabPanel>,
                                          <TabPanel key={3}>
                                            <h5 style={{ marginTop: 20 }}>Affiliations</h5>
                                            <div style={{ marginTop: 15 }}>
                                              <Autocomplete
                                                  value={this.state.selectedContact.affiliations || []}
                                                  onChange={(event, values) => {
                                                    let selectedContact = this.state.selectedContact;
                                                    selectedContact.affiliations = values;
                                                    this.setState({ selectedContact: selectedContact });
                                                  }}
                                                  title={'Affiliations'}
                                                  multiple
                                                  id="checkboxes-af-demo"
                                                  options={data.affiliations}
                                                  disableCloseOnSelect
                                                  getOptionLabel={(option) => option}
                                                  renderOption={(option, { selected }) => (
                                                      <React.Fragment>
                                                        <MuiCheckbox
                                                            icon={main_functions.icon}
                                                            checkedIcon={main_functions.checkedIcon}
                                                            style={{ marginRight: 8 }}
                                                            checked={selected}
                                                        /> {option}
                                                      </React.Fragment>
                                                  )}
                                                  style={{
                                                    width: 500,
                                                    marginLeft: 10,
                                                    borderColor: '#f0f0f0'
                                                  }}
                                                  renderInput={(params) => (
                                                      <TextField {...params}
                                                                 variant="outlined"
                                                                 placeholder="" />
                                                  )}
                                              />
                                            </div>
                                          </TabPanel>,
                                          <TabPanel key={4}>
                                            <h5 style={{ marginTop: 20 }}>Domaine d'activités</h5>
                                            <div>
                                              <div style={{flexWrap: 'wrap', marginTop: 10
                                              }}
                                              >
                                                {
                                                  (this.state.selectedContact.domaines || []).map((item, key) => (
                                                      <div key={key} style={{margin: 3, marginBottom: 6}}>
                                                        <Chip
                                                            icon={
                                                              <CheckCircle />}
                                                            label={item}
                                                            color="primary"
                                                            onDelete={this.removeItem('domaine', key)}
                                                            style={{
                                                              fontWeight: 'bold',
                                                              backgroundColor: 'lightseagreen'
                                                            }}
                                                        />
                                                      </div>
                                                  ))
                                                }
                                              </div>
                                              <div className="row"
                                                   style={{ marginTop: 10 }}>
                                                <div className="col-sm-12" style={{margin:10}}>
                                                  <a style={{
                                                    cursor: 'pointer',
                                                    fontSize: 'medium',
                                                    fontWeight: 'bold'
                                                  }}
                                                     onClick={this.openAddModal('domaine')}>
                                                  <span className="btn__text"
                                                        id="btn-add-child">
                                                    <i className="fe-plus-square" /> Ajouter un domaine
                                                  </span>
                                                  </a>
                                                </div>
                                              </div>
                                              {
                                                (this.state.selectedContact.domaine || []).map((dom,key) => (
                                                    <div key={key}>
                                                      <div className="row mt-1">
                                                        <div className="col-md-3">
                                                          <Chip
                                                              icon={
                                                                <CheckCircle />}
                                                              label={dom.domaine}
                                                              color="primary"
                                                              onDelete={this.removeItem('domaine', key)}
                                                              style={{
                                                                fontWeight: 'bold',
                                                                backgroundColor: 'lightseagreen'
                                                              }}
                                                          />
                                                        </div>
                                                        <div className="col-md-9">

                                                          <Autocomplete
                                                              value={this.state.selectedContact.domaine[key].specialite || []}
                                                              title={'Spécialités'}
                                                              multiple
                                                              id="checkboxes-da-demo"
                                                              options={this.state.selectedContact.domaine[key].domaine === "COMPTABILITÉ" ? data.comptabilite :
                                                                  this.state.selectedContact.domaine[key].domaine === "SALAIRES" ? data.salaire :
                                                                      this.state.selectedContact.domaine[key].domaine === "IMPOTS" ? data.impot :
                                                                          this.state.selectedContact.domaine[key].domaine === "Droit" ? data.domainesAct : []
                                                              }
                                                              disableCloseOnSelect

                                                              getOptionLabel={(option) => option}
                                                              renderOption={(option, { selected }) => (
                                                                  <React.Fragment>
                                                                    <MuiCheckbox
                                                                        icon={main_functions.icon}
                                                                        checkedIcon={main_functions.checkedIcon}
                                                                        style={{ marginRight: 8 }}
                                                                        checked={selected}
                                                                    /> {option}
                                                                  </React.Fragment>
                                                              )}
                                                              style={{
                                                                width: 500,
                                                                marginLeft: 10,
                                                                borderColor: '#f0f0f0'
                                                              }}
                                                              renderInput={(params) => (
                                                                  <TextField {...params}
                                                                             variant="outlined"
                                                                             placeholder="" />
                                                              )}
                                                          />

                                                        </div>
                                                      </div>
                                                      <div style={{backgroundColor:"#f0f0f0",height:2,margin:10,marginTop:20}}/>
                                                    </div>

                                                ))
                                              }

                                            </div>
                                          </TabPanel>,
                                          <TabPanel key={5}>
                                            <h5 style={{ marginTop: 20 }}>Langues</h5>
                                            <Autocomplete
                                                value={this.state.selectedContact.langues || []}
                                                onChange={(event, values) => {
                                                  let selectedContact = this.state.selectedContact;
                                                  selectedContact.langues = values;
                                                  this.setState({ selectedContact: selectedContact });
                                                }}
                                                title={'langues'}
                                                multiple
                                                id="checkboxes-l-demo"
                                                options={data.langues}
                                                disableCloseOnSelect
                                                getOptionLabel={(option) => option}
                                                renderOption={(option, { selected }) => (
                                                    <React.Fragment>
                                                      <MuiCheckbox
                                                          icon={main_functions.icon}
                                                          checkedIcon={main_functions.checkedIcon}
                                                          style={{ marginRight: 8 }}
                                                          checked={selected}
                                                      /> {option}
                                                    </React.Fragment>
                                                )}
                                                style={{
                                                  width: 500,
                                                  marginLeft: 10,
                                                  borderColor: '#f0f0f0'
                                                }}
                                                renderInput={(params) => (
                                                    <TextField {...params}
                                                               variant="outlined"
                                                               placeholder="" />
                                                )}
                                            /> </TabPanel>,
                                          <TabPanel key={6}>
                                            <h5 style={{ marginTop: 20 }}>Domaines d'intérêt, loisirs et sports</h5>
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
                                                             style={{ margin: 3 }}>
                                                          <Chip
                                                              icon={
                                                                <MoodIcon />}
                                                              label={item}
                                                              color="secondary"
                                                              onDelete={this.removeItem('hobbies', key)}
                                                              style={{
                                                                fontWeight: 'bold',
                                                                backgroundColor: 'lightpink'
                                                              }}
                                                          />
                                                        </div>
                                                    ))
                                                  }
                                                </div>
                                              </div>
                                            </div>
                                            <div className="row"
                                                 style={{ marginTop: 20 }}>
                                              <div
                                                  className="col-sm-12">
                                                <a style={{
                                                  cursor: 'pointer',
                                                  fontSize: 'medium',
                                                  fontWeight: 'bold'
                                                }}
                                                   onClick={this.openAddModal('hobbies')}>
                                                                                            <span className="btn__text"
                                                                                                  id="btn-add-child">
                                                                                                <i
                                                                                                    className="fe-plus-square" /> Ajouter
                                                                                                un centre d'intérêt,
                                                                                                loisir ou sport
                                                                                            </span> </a>
                                              </div>
                                            </div>
                                          </TabPanel>
                                        ]
                                      }
                                    </Tabs>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        }
                      </Route>

                      <Route exact path="/home/clients">
                          {
                            this.state.loading === false && this.state.firstLoading === false &&
                            <TablePatientsBrainy
                                patients={this.state.patients || []}
                                bodycheck={this.sendBodyChekMail}
                                bodycheckNl={this.getBodyCheckNl}
                                getDataDashboard={this.getDataDashboard}
                                onEditClick={(societe, key) => {
                                  this.setState({
                                    selectedSociete: societe,
                                    selectedSocieteKey: key
                                  })
                                  this.props.history.push('/home/clients/' + societe.id_user);
                                }}
                                onDelecteClick={(societe,key)=>{
                                  this.deletepatient(societe.id_user)
                                }}
                            />
                          }

                        </Route>

                      <Route exact path="/home/clients/:client_id">
                        {
                          this.state.loading === false && this.state.firstLoading === false && this.state.selectedSociete !== "" &&
                          <div>
                            <div className="row">
                              <div className="col-lg-12">
                                <div className="card-box text-center"
                                     style={{ marginTop: 1 }}>
                                  <img onClick={() => this.imageUpload.click()}
                                       src={this.state.selectedSociete.imageUrl ? this.state.selectedSociete.imageUrl : this.state.selectedSociete.Type === '0' ? entIcon : userAvatar}
                                       className="rounded-circle avatar-lg img-thumbnail"
                                       alt="" style={{
                                    cursor: 'pointer',
                                    width: 120,
                                    height: 120,
                                    objectFit: 'cover'
                                  }} /> <input style={{
                                  visibility: 'hidden',
                                  width: 0,
                                  height: 0
                                }}
                                               type='file'
                                               accept='.png,.jpeg,.jpg'
                                               onChange={(files) => this.uploadImage(files)}
                                               ref={(ref) => this.imageUpload = ref}
                                />
                                  <h4 className="mb-0">{this.state.selectedSociete.nom + ' ' + (this.state.selectedSociete.prenom || '')}</h4>
                                  <p className="text-muted"> </p>
                                  <div style={{ display: 'contents' }}>
                                    <button type="button"
                                            onClick={() => {}}
                                            className="btn btn-success btn-sm waves-effect mb-2 waves-light m-1">
                                      <i className="fe-save" />&nbsp;&nbsp;Enregistrer
                                    </button>
                                    <button type="button"
                                            onClick={() => {
                                            }}
                                            className="btn btn-danger btn-sm waves-effect mb-2 waves-light m-1">
                                      <i className="fe-printer" />&nbsp;&nbsp;Aperçu
                                    </button>
                                    <button type="button"
                                            onClick={() => {
                                            }}
                                            className="btn btn-danger btn-sm waves-effect mb-2 waves-light m-1">
                                      <i className="fe-book-open" />&nbsp;&nbsp;Book
                                    </button>
                                  </div>
                                  <div style={{ marginTop: 30 }}
                                       className="text-left">
                                    <Tabs>
                                      <TabList>
                                        <Tab>Informations générales</Tab>
                                        <Tab>Ouverture mandat </Tab>
                                        <Tab>Dashboard </Tab>
                                        <Tab>Bodycheck</Tab>
                                      </TabList>
                                      <TabPanel>
                                        <h5 style={{ marginTop: 20 }}>Informations générales</h5>
                                        <div className="row"
                                             style={{ marginTop: 35 }}>
                                          <div className="col-md-6">
                                            <div className="col-md-12">
                                              <p style={{ marginBottom: 10 }}>Email</p>
                                              <input
                                                  type="email"
                                                  className="form-control"
                                                  id="email"
                                                  name="email"
                                                  value={this.state.selectedSociete.email}
                                                  onChange={this.handleChange('selectedSociete', 'email')}
                                              />
                                            </div>
                                          </div>
                                          <div className="col-md-6">
                                            <p style={{ marginBottom: 10 }}>Statut</p>
                                            <FormControlLabel
                                                control={
                                                  <MuiSwitch
                                                      checked={this.state.selectedSociete.isActif || false}
                                                      onChange={event => {
                                                        let obj = this.state.selectedSociete;
                                                        obj.isActif = event.target.checked;
                                                        this.setState({ selectedSociete: obj });
                                                      }}
                                                      name="isActif" />}
                                                label={this.state.selectedSociete.isActif ? this.state.selectedSociete.isActif === true ? 'Actif' : 'Non actif' : 'Non actif'}
                                            />
                                          </div>
                                        </div>
                                        <div className="row"
                                             style={{ marginTop: 35 }}>
                                          <div className="col-md-12">
                                            <p style={{ marginBottom: 10 }}>À propos</p>
                                            <textarea
                                                rows={4}
                                                className="form-control"
                                                id="about"
                                                name="about"
                                                value={this.state.selectedSociete.about}
                                                onChange={this.handleChange('selectedSociete', 'about')} />
                                          </div>
                                        </div>
                                        <div className="row"
                                             style={{ marginTop: 35 }}>
                                          <div className="col-md-6">
                                            <p style={{ marginBottom: 10 }}>
                                              Nom du client
                                            </p>
                                            <input
                                                className="form-control"
                                                type="text"
                                                id="nom"
                                                name="nom"
                                                value={this.state.selectedSociete.nom+' ' + this.state.selectedSociete.prenom}
                                                onChange={this.handleChange('selectedSociete', 'Nom')} />
                                          </div>
                                          <div
                                              className="col-md-6">
                                            <p style={{ marginBottom: 10 }}>Secteur</p>
                                            <select
                                                className="form-control custom-select"
                                                value={this.state.selectedSociete.secteur}
                                                onChange={this.handleChange('selectedSociete', 'secteur')}
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
                                        <div className="row"
                                             style={{ marginTop: 20 }}>
                                          <div className="col-md-6">
                                            <p style={{ marginBottom: 10 }}>Site web </p>
                                            <input
                                                className="form-control"
                                                type="text"
                                                id="email"
                                                name="email"
                                                placeholder="https://..."//readOnly={true}
                                                value={this.state.selectedSociete.siteweb}
                                                onChange={this.handleChange('selectedSociete', 'siteweb')} />
                                          </div>

                                        </div>


                                      </TabPanel>
                                      <TabPanel>
                                        <div className="row mt-2">
                                          <div className="col-md-3">
                                            <div>
                                              Patient
                                            </div>
                                            <div>
                                              <input className="form-control" defaultValue={(this.state.selectedSociete.nom===undefined? " ":this.state.selectedSociete.nom)+" "+(this.state.selectedSociete.prenom===undefined? " ":this.state.selectedSociete.prenom)} readOnly={true} />
                                            </div>
                                          </div>
                                          <div className="col-md-4">
                                            <div>
                                              Type de dossier
                                            </div>
                                            <div>
                                              <select className="form-control custom-select" value={this.state.selectedSociete.mondat ? this.state.selectedSociete.mondat.typeDossier || "" : ""}
                                                      onChange={this.handleObjectChange("selectedSociete","mondat","typeDossier")}
                                              >
                                                {
                                                  Data.secteurs.map((secteur,key) =>
                                                      <option key={key} value={secteur}>{secteur}</option>
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
                                                <textarea className="form-control" value={this.state.selectedSociete.mondat ? this.state.selectedSociete.mondat.description || "" : ""}
                                                          onChange={this.handleObjectChange("selectedSociete","mondat","description")} rows={4} />
                                            </div>

                                          </div>
                                        </div>
                                        <div className="row">
                                          <div className="col-md-3 mt-1">
                                            <div>
                                              Dossier LBA ( intermédiaire financier)
                                            </div>
                                            <div>
                                              <select className="form-control custom-select"
                                                      style={{width:"80%"}}
                                                      value={this.state.selectedSociete.mondat ? this.state.selectedSociete.mondat.dossierLBA || "" : ""}
                                                      onChange={this.handleObjectChange("selectedSociete","mondat","dossierLBA")}
                                              >
                                                <option value={"Oui"}>Oui</option>
                                                <option value={"Non"}>Non</option>
                                              </select>
                                            </div>

                                          </div>
                                        </div>
                                        <div className="row mt-4 align-items-center">
                                          <div className="col-md-4">
                                            <div>
                                              <h6>Personne en charge principale ( le client. ) </h6>
                                            </div>
                                            <div className="row justify-content-center align-items-center mt-2">
                                              <div className="col-md-3">
                                                <div>Prénom</div>
                                              </div>
                                              <div className="col-md-8">
                                                <input
                                                    className="form-control"
                                                    type="text"
                                                    id="nom"
                                                    name="nom"
                                                    value={this.state.selectedSociete.prenom===undefined? " ":this.state.selectedSociete.prenom}

                                                />

                                              </div>

                                            </div>
                                            <div className="row justify-content-center align-items-center mt-2">
                                              <div className="col-md-3">
                                                <div>Nom</div>
                                              </div>
                                              <div className="col-md-8">
                                                <input
                                                    className="form-control"
                                                    type="text"
                                                    id="nom"
                                                    name="nom"
                                                    value={this.state.selectedSociete.nom===undefined? " ":this.state.selectedSociete.nom}
                                                />
                                              </div>

                                            </div>
                                            <div className="row justify-content-center align-items-center mt-2">
                                              <div className="col-md-3">
                                                <div>Email</div>
                                              </div>
                                              <div className="col-md-8">
                                                <input
                                                    className="form-control"
                                                    type="text"
                                                    id="nom"
                                                    name="nom"
                                                    value={this.state.selectedSociete.email===undefined? " ":this.state.selectedSociete.email}
                                                />
                                              </div>

                                            </div>
                                            <div className="row justify-content-center align-items-center mt-2">
                                              <div className="col-md-3">
                                                <div>Téléphone</div>
                                              </div>
                                              <div className="col-md-8">
                                                <input
                                                    className="form-control"
                                                    type="text"
                                                    id="nom"
                                                    name="nom"
                                                    value={this.state.selectedSociete.telephone===undefined? " ":this.state.selectedSociete.telephone}
                                                />
                                              </div>

                                            </div>
                                            <div className="row justify-content-center align-items-center mt-2">
                                              <div className="col-md-3">
                                                <div>Adresse</div>
                                              </div>
                                              <div className="col-md-8">
                                                  <textarea
                                                      className="form-control"
                                                      id="Adresse"
                                                      name="Adresse"
                                                      value={this.state.selectedSociete.num_nom_rue+" "+this.state.selectedSociete.ville}
                                                  />
                                              </div>

                                            </div>

                                          </div>
                                          <div className="col-md-4">
                                            <div>
                                              <h6>Personne en charge pour les réglements  </h6>
                                            </div>
                                            <div className="row justify-content-center align-items-center mt-2">
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
                                                    onChange={this.handleObjectChange("selectedSociete","mondat","pcr_prenom")}

                                                />

                                              </div>

                                            </div>
                                            <div className="row justify-content-center align-items-center mt-2">
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
                                                    onChange={this.handleObjectChange("selectedSociete","mondat","pcr_nom")}
                                                />
                                              </div>

                                            </div>
                                            <div className="row justify-content-center align-items-center mt-2">
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
                                                    onChange={this.handleObjectChange("selectedSociete","mondat","pcr_email")}
                                                />
                                              </div>

                                            </div>
                                            <div className="row justify-content-center align-items-center mt-2">
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
                                                    onChange={this.handleObjectChange("selectedSociete","mondat","pcr_phone")}
                                                />
                                              </div>

                                            </div>
                                            <div className="row justify-content-center align-items-center mt-2">
                                              <div className="col-md-3">
                                                <div>Adresse</div>
                                              </div>
                                              <div className="col-md-8">
                                                                                                <textarea
                                                                                                    className="form-control"
                                                                                                    id="Adresse"
                                                                                                    name="Adresse"
                                                                                                    value={this.state.selectedSociete.mondat ? this.state.selectedSociete.mondat.pcr_adress || "" : ""}
                                                                                                    onChange={this.handleObjectChange("selectedSociete","mondat","pcr_adress")}
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
                                                  onChange={this.handleObjectChange("selectedSociete","mondat","autrePartie")}
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
                                                  onChange={this.handleObjectChange("selectedSociete","mondat","autrePartie")}
                                              />
                                            </div>
                                            <div className="mt-3">
                                              <h6>Apporteur </h6>
                                              <select className="form-control custom-select"
                                                      style={{width:"80%"}}
                                                      value={this.state.selectedSociete.mondat ? this.state.selectedSociete.mondat.apporteur || "" : ""}
                                                      onChange={this.handleObjectChange("selectedSociete","mondat","apporteur")}
                                              >
                                                <option value={""}>{""}</option>
                                                <option value={"Site web"}>Site web</option>
                                                <option value={"Autre avocat"}>Autre avocat</option>
                                                <option value={"Personne tierce"}>Personne tierce</option>

                                              </select>
                                            </div>


                                          </div>

                                        </div>
                                        <hr style={{width:"100%",height:2,backgroundColor:"#a6a6a6",marginTop:25,marginBottom:25}}/>

                                        <div>
                                          <h5>Facturation</h5>
                                          <div className="row align-items-center">
                                            <div className="col-md-4">
                                              <div>Collaborateur-Lead</div>
                                              <div>
                                                <MuiSelect
                                                    labelId="demo-simple-select-label"
                                                    id="demo-simple-select"
                                                    style={{width:"80%"}}
                                                    onChange={(e)=>{
                                                      let obj = this.state.selectedSociete;
                                                      let container = obj["facturation"] || {};
                                                      container.collaborateur_lead = e.target.value;
                                                      obj["facturation"] = container;
                                                      this.setState({selectedSociete:obj})
                                                    }}
                                                    value={this.state.selectedSociete.facturation ? this.state.selectedSociete.facturation.collaborateur_lead : ""}

                                                >
                                                  {this.state.contacts.map((contact,key) => (
                                                      <MenuItem key={key} value={contact.email}>
                                                        <div className="row align-items-center justify-content-center">
                                                          <Avatar alt="Natacha" src={contact.imageUrl} />
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
                                                    style={{width:"100%"}}
                                                    onChange={(e)=>{
                                                      let obj = this.state.selectedSociete;
                                                      let container = obj["facturation"] || {};
                                                      container.collaborateur_team = e.target.value;
                                                      obj["facturation"] = container;
                                                      this.setState({selectedSociete:obj})
                                                    }}
                                                    value={this.state.selectedSociete.facturation ? this.state.selectedSociete.facturation.collaborateur_team || [] : []}
                                                    input={<Input id="select-multiple-chip" />}
                                                    renderValue={(selected) => (
                                                        <div style={{display:"flex", flexWrap:"wrap"}}>
                                                          {selected.map((value,key) => (
                                                              <Chip key={key} label={value.email} style={{margin:2}} avatar={<Avatar alt="" src={value.imageUrl || null} />}
                                                              />
                                                          ))}
                                                        </div>
                                                    )}
                                                    MenuProps={Data.MenuProps}
                                                >
                                                  {this.state.contacts.map((contact,key) => (
                                                      <MenuItem key={key} value={contact}>
                                                        <div className="row align-items-center justify-content-center">
                                                          <Avatar alt="" src={contact.imageUrl} />
                                                          <div>{contact.nom + " " + contact.prenom}</div>
                                                        </div>
                                                      </MenuItem>
                                                  ))}
                                                </MuiSelect>
                                              </div>

                                            </div>
                                            <div className="col-md-3">
                                              <div>Taux Horaire collaborateur -B </div>

                                              <input
                                                  className="form-control"
                                                  type="text"
                                                  id="nom"
                                                  name="nom"
                                                  value={this.state.selectedSociete.facturation ? this.state.selectedSociete.facturation.tauxHoraireCollab || "" : ""}
                                                  onChange={this.handleObjectChange("selectedSociete","facturation","tauxHoraireCollab")}
                                              />

                                            </div>

                                          </div>
                                        </div>
                                        <div className="mt-4">
                                          <h5>FACTURATION-CLIENT</h5>
                                          <div className="row align-items-center">
                                            <div className="col-md-4">
                                              <div className="row justify-content-center align-items-center">
                                                <div className="col-md-4">
                                                  <div>Par eMail</div>
                                                </div>
                                                <div className="col-md-8">
                                                  <CB color="primary" checked={this.state.mondat.facturationClient.parEmail || false}
                                                      onChange={(e)=>{let d = this.state.mondat
                                                        d.facturationClient.parEmail= !this.state.mondat.facturationClient.parEmail
                                                        this.setState({mondat:d})
                                                      }}
                                                  />
                                                </div>



                                              </div>
                                              <div className="row justify-content-center align-items-center">

                                                <div className="col-md-4">
                                                  <div>Par courrier</div>
                                                </div>
                                                <div className="col-md-8">
                                                  <CB color="primary"
                                                      checked={this.state.mondat.facturationClient.parCourrier || false}
                                                      onChange={(e)=>{let d = this.state.mondat
                                                        d.facturationClient.parCourrier= !this.state.mondat.facturationClient.parCourrier
                                                        this.setState({mondat:d})
                                                      }}/>
                                                </div>



                                              </div>
                                              <div className="row justify-content-center align-items-center">

                                                <div className="col-md-4">
                                                  <div>Fréquence</div>
                                                </div>
                                                <div className="col-md-8">
                                                  <MuiSelect
                                                      labelId="demo-simple-select-label"
                                                      id="demo-simple-select"
                                                      style={{width:"100%"}}
                                                      value={this.state.mondat.facturationClient.frequence}
                                                      onChange={(e)=>{let d = this.state.mondat
                                                        d.facturationClient.frequence= e.target.value
                                                        this.setState({mondat:d})
                                                      }}

                                                  >
                                                    <MenuItem value={"mission"}>Par mission</MenuItem>
                                                    <MenuItem value={"Mensuellement"}>Mensuellement</MenuItem>
                                                    <MenuItem value={"Quarter"}>Quarter</MenuItem>
                                                    <MenuItem value={"Annuellement"}>Annuellement</MenuItem>
                                                  </MuiSelect>
                                                </div>

                                              </div>


                                            </div>
                                            <div className="col-md-4">


                                              <div className="row justify-content-center align-items-center">

                                                <div className="col-md-6">
                                                  <div>Envoyé par le secrétariat</div>
                                                </div>
                                                <div className="col-md-6">
                                                  <CB color="primary" checked={this.state.mondat.facturationClient.EnvoyeParSecretariat || false}
                                                      onChange={(e)=>{let d = this.state.mondat
                                                        d.facturationClient.EnvoyeParSecretariat= !this.state.mondat.facturationClient.EnvoyeParSecretariat
                                                        this.setState({mondat:d})
                                                      }} />
                                                </div>



                                              </div>
                                              <div className="row justify-content-center align-items-center">

                                                <div className="col-md-6">
                                                  <div>Envoyé par l’avocat </div>
                                                </div>
                                                <div className="col-md-6">
                                                  <CB color="primary" checked={this.state.mondat.facturationClient.EnvoyeAvocat || false}
                                                      onChange={(e)=>{let d = this.state.mondat
                                                        d.facturationClient.EnvoyeAvocat= !this.state.mondat.facturationClient.EnvoyeAvocat
                                                        this.setState({mondat:d})
                                                      }} />
                                                </div>



                                              </div>
                                              <div className="row justify-content-center align-items-center">

                                                <div className="col-md-6">
                                                  <div>Langue de Facturation</div>
                                                </div>
                                                <div className="col-md-6">
                                                  <MuiSelect
                                                      labelId="demo-simple-select-label"
                                                      id="demo-simple-select"
                                                      style={{width:"100%"}}
                                                      value={this.state.mondat.facturationClient.LangueFacturation}
                                                      onChange={(e)=>{let d = this.state.mondat
                                                        d.facturationClient.LangueFacturation= e.target.value
                                                        this.setState({mondat:d})
                                                      }}

                                                  >
                                                    <MenuItem value={"Français"}>Français</MenuItem>
                                                    <MenuItem value={"Anglais"}>Anglais</MenuItem>

                                                  </MuiSelect>
                                                </div>



                                              </div>
                                              <div className="row justify-content-center align-items-center">

                                                <div className="col-md-6">
                                                  <div>Mode ( à envoyer par qui ) </div>
                                                </div>
                                                <div className="col-md-6">
                                                  <MuiSelect
                                                      labelId="demo-simple-select-label"
                                                      id="demo-simple-select"
                                                      style={{width:"100%"}}
                                                      value={this.state.mondat.facturationClient.Mode}
                                                      onChange={(e)=>{let d = this.state.mondat
                                                        d.facturationClient.Mode= e.target.value
                                                        this.setState({mondat:d})
                                                      }}


                                                  >
                                                    <MenuItem value={"Sécretaria"}>Sécretariat</MenuItem>
                                                    <MenuItem value={"Associé"}>Associé</MenuItem>
                                                    <MenuItem value={"Collaborateur"}>Collaborateur</MenuItem>

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
                                      <TabPanel>
                                        {this.state.patientData!==""&&
                                        <div style={{marginTop: 30}} className="text-left">
                                          <Tabs className="text-center">
                                            <TabList>
                                              <Tab >
                                                Ma fiche perso
                                              </Tab>

                                              <Tab>
                                                Activité physique
                                              </Tab>
                                              <Tab>
                                                Habitudes
                                              </Tab>
                                              <Tab>
                                                Objectifs
                                              </Tab>
                                              <Tab>
                                                Coeur
                                              </Tab>
                                              <Tab>
                                                Pb santé
                                              </Tab>

                                            </TabList>
                                            <TabPanel>
                                              <div className="row align-items-start" >
                                                <div className="col-md-5">
                                                  <div className="text-left mt-5">
                                                    <div className="row justify-content-start">
                                                      <div className="col-md-6">
                                                        <h4 className="font-weight-bold">{this.state.selectedSociete.nom + " "+this.state.selectedSociete.prenom}</h4>

                                                      </div>
                                                      <div className="col-md-2">
                                                        <text>{this.state.patientData.taille}</text>
                                                      </div>

                                                    </div>
                                                  </div>
                                                  <div className="text-left mt-3">
                                                    <div className="row justify-content-start">
                                                      <div className="col-md-6">
                                                        <h4 className="font-weight-bold">Née le 29-04-1995</h4>

                                                      </div>
                                                      <div className="col-md-2">
                                                        <text>{this.state.patientData.poids +" kg"} </text>
                                                      </div>

                                                    </div>
                                                  </div>
                                                  <div className="text-left mt-3">
                                                    <div className="row justify-content-start align-items-center">
                                                      <div className="col-md-6">
                                                        <h4 className="font-weight-bold">Mon age </h4>

                                                      </div>
                                                      <div className="col-md-2 " style={{backgroundColor:"#ff0000"}}>
                                                        <text style={{color:"white"}}>{this.state.patientData.age} ans </text>
                                                      </div>

                                                    </div>
                                                  </div>
                                                </div>
                                                <div className="col-md-7">
                                                  <Tabs>
                                                    <TabList>
                                                      <Tab>
                                                        Mes Mensuration
                                                      </Tab>
                                                      <Tab>
                                                        Mes Mensuration
                                                      </Tab>
                                                      <Tab>
                                                        Mes Mensuration
                                                      </Tab>
                                                      <Tab>
                                                        Mes Mensuration
                                                      </Tab>

                                                    </TabList>
                                                    <TabPanel>
                                                      <div className="row ">

                                                        <div className="col-md-6 ">
                                                          <img src={bodyHomme} style={{width:"100%"}}/>

                                                        </div>
                                                        <div className="col-md-6 p-1" style={{borderColor:"black",borderStyle:"solid",borderRadius:8,borderWidth:0.8}}>
                                                          <div className="row align-items-center">
                                                            <div className="col-md-2">
                                                              <IconButton>
                                                                <img src={back} style={{width:25}}/>

                                                              </IconButton>
                                                            </div>
                                                            <div className="col-md-5">
                                                              <Button  variant="contained" color="primary">
                                                                Janvier 2020
                                                              </Button>

                                                            </div>
                                                            <div className="col-md-5">
                                                              <Button variant="contained" color="primary">
                                                                Juin 2020
                                                              </Button>

                                                            </div>
                                                          </div>

                                                          <div style={{marginTop:"20%"}}>

                                                            <div className="row ">
                                                              <div className="col-md-6">
                                                                <FormControl fullWidth  variant="outlined">
                                                                  <InputLabel htmlFor="outlined-adornment-amount">Taille vendre</InputLabel>
                                                                  <OutlinedInput
                                                                      id="outlined-adornment-amount"
                                                                      value=""
                                                                      endAdornment ={<InputAdornment position="end">Cm</InputAdornment>}
                                                                      labelWidth={60}
                                                                  />
                                                                </FormControl>
                                                              </div>
                                                              <div className="col-md-6">
                                                                <FormControl fullWidth  variant="outlined">
                                                                  <InputLabel htmlFor="outlined-adornment-amount">Taille vendre</InputLabel>
                                                                  <OutlinedInput
                                                                      id="outlined-adornment-amount"
                                                                      value=""
                                                                      endAdornment ={<InputAdornment position="end">Cm</InputAdornment>}
                                                                      labelWidth={60}
                                                                  />
                                                                </FormControl>

                                                              </div>
                                                            </div>
                                                            <div className="row mt-2">
                                                              <div className="col-md-6">
                                                                <FormControl fullWidth  variant="outlined">
                                                                  <InputLabel htmlFor="outlined-adornment-amount">Hanche</InputLabel>
                                                                  <OutlinedInput
                                                                      id="outlined-adornment-amount"
                                                                      value=""
                                                                      endAdornment ={<InputAdornment position="end">Cm</InputAdornment>}
                                                                      labelWidth={60}
                                                                  />
                                                                </FormControl>
                                                              </div>
                                                              <div className="col-md-6">
                                                                <FormControl fullWidth  variant="outlined">
                                                                  <InputLabel htmlFor="outlined-adornment-amount">Hanche</InputLabel>
                                                                  <OutlinedInput
                                                                      id="outlined-adornment-amount"
                                                                      value=""
                                                                      endAdornment ={<InputAdornment position="end">Cm</InputAdornment>}
                                                                      labelWidth={60}
                                                                  />
                                                                </FormControl>

                                                              </div>
                                                            </div>
                                                            <div className="row mt-2">
                                                              <div className="col-md-6">
                                                                <FormControl fullWidth  variant="outlined">
                                                                  <InputLabel htmlFor="outlined-adornment-amount">Cuisse droite</InputLabel>
                                                                  <OutlinedInput
                                                                      id="outlined-adornment-amount"
                                                                      value=""
                                                                      endAdornment ={<InputAdornment position="end">Cm</InputAdornment>}
                                                                      labelWidth={60}
                                                                  />
                                                                </FormControl>
                                                              </div>
                                                              <div className="col-md-6">
                                                                <FormControl fullWidth  variant="outlined">
                                                                  <InputLabel htmlFor="outlined-adornment-amount">Cuisse droite</InputLabel>
                                                                  <OutlinedInput
                                                                      id="outlined-adornment-amount"
                                                                      value=""
                                                                      endAdornment ={<InputAdornment position="end">Cm</InputAdornment>}
                                                                      labelWidth={60}
                                                                  />
                                                                </FormControl>

                                                              </div>
                                                            </div>
                                                          </div>

                                                        </div>


                                                      </div>

                                                      <div className="mt-2">
                                                        <h4>
                                                          Evolution de mes mensurations

                                                        </h4>

                                                      </div>

                                                      <div>
                                                        <Line data={ data}
                                                        />
                                                      </div>
                                                    </TabPanel>
                                                    <TabPanel>
                                                      <div className="row ">

                                                        <div className="col-md-6  text-center">
                                                          <img src={bascule} style={{width:"50%"}}/>


                                                        </div>
                                                        <div className="col-md-6 p-1" style={{borderColor:"black",borderStyle:"solid",borderRadius:8,borderWidth:0.8}}>
                                                          <div className="row align-items-center">
                                                            <div className="col-md-2">
                                                              <IconButton>
                                                                <img src={back} style={{width:25}}/>

                                                              </IconButton>
                                                            </div>
                                                            <div className="col-md-5">
                                                              <Button  variant="contained" color="primary">
                                                                Janvier 2020
                                                              </Button>

                                                            </div>
                                                            <div className="col-md-5">
                                                              <Button variant="contained" color="primary">
                                                                Juin 2020
                                                              </Button>

                                                            </div>
                                                          </div>

                                                          <div style={{marginTop:"20%"}}>


                                                            <div className="row mt-2">
                                                              <div className="col-md-6">
                                                                <FormControl fullWidth  variant="outlined">
                                                                  <InputLabel htmlFor="outlined-adornment-amount">Poids</InputLabel>
                                                                  <OutlinedInput
                                                                      id="outlined-adornment-amount"
                                                                      value=""
                                                                      endAdornment ={<InputAdornment position="end">Kg</InputAdornment>}
                                                                      labelWidth={60}
                                                                  />
                                                                </FormControl>
                                                              </div>
                                                              <div className="col-md-6">
                                                                <FormControl fullWidth  variant="outlined">
                                                                  <InputLabel htmlFor="outlined-adornment-amount">Poids</InputLabel>
                                                                  <OutlinedInput
                                                                      id="outlined-adornment-amount"
                                                                      value=""
                                                                      endAdornment ={<InputAdornment position="end">Kg</InputAdornment>}
                                                                      labelWidth={60}
                                                                  />
                                                                </FormControl>

                                                              </div>
                                                            </div>
                                                          </div>

                                                        </div>


                                                      </div>

                                                      <div className="mt-2">
                                                        <h4>
                                                          Evolution de mes mensurations

                                                        </h4>

                                                      </div>

                                                      <div>
                                                        <Line data={ data}
                                                        />
                                                      </div>
                                                    </TabPanel>
                                                  </Tabs>

                                                </div>
                                              </div>


                                            </TabPanel>

                                            <TabPanel>
                                              <div className="col-md-12 text-left mt-5">
                                                <div>
                                                  <text className="font-weight-bold" style={{fontSize:"1.2vw"}}>
                                                    Habitudes sportives
                                                  </text>

                                                </div>
                                                <div className="row align-items-center mt-3 justify-content-start">
                                                  <div className="col-md-4 " >
                                                    <text >
                                                      Activité sportive par jours
                                                    </text>

                                                  </div>
                                                  <div className="col-md-4 text-center " style={{backgroundColor:"#ff0000"}}>
                                                    <text style={{color:"white"}}>
                                                      {this.state.patientData.activite_sportive}
                                                    </text>

                                                  </div>
                                                  <div className="col-md-1">
                                                    <img src={edit} style={{width:20}}/>
                                                  </div>
                                                </div>
                                                <div className="row align-items-center mt-3 justify-content-start">
                                                  <div className="col-md-4 " >
                                                    <text >
                                                      Activité physique par jours
                                                    </text>

                                                  </div>
                                                  <div className="col-md-4 text-center " style={{backgroundColor:"#ff0000"}}>
                                                    <text style={{color:"white"}}>
                                                      {this.state.patientData.activite_physique}
                                                    </text>

                                                  </div>
                                                  <div className="col-md-1">
                                                    <img src={edit} style={{width:20}}/>
                                                  </div>
                                                </div>

                                              </div>
                                            </TabPanel>
                                            <TabPanel>
                                              <div  className="row align-items-center mt-3">
                                                <div className="col-md-2 text-left">
                                                  <text>
                                                    How much Pensez-vous expérimenter du stress ?
                                                  </text>

                                                </div>
                                                <div className="col-md-2 text-center" style={{backgroundColor:"#ff0000"}}>
                                                  <text style={{color:"white"}}>
                                                    {this.state.patientData.stress}
                                                  </text>

                                                </div>
                                                <div className="col-md-1 ">
                                                  <img src={edit} style={{width:20}}/>
                                                </div>
                                              </div>
                                              <div  className="row align-items-center mt-3">
                                                <div className="col-md-2 text-left">
                                                  <text>
                                                    Habitudes alimentaires
                                                  </text>

                                                </div>
                                                <div className="col-md-2 text-center" style={{backgroundColor:"#ff0000"}}>
                                                  <text style={{color:"white"}}>
                                                    {this.state.patientData.habitude_alim}
                                                  </text>

                                                </div>
                                                <div className="col-md-1 ">
                                                  <img src={edit} style={{width:20}}/>
                                                </div>
                                              </div>
                                              <div  className="row align-items-start mt-3">
                                                <div className="col-md-2 text-left">
                                                  <div>
                                                    <text >
                                                      Y-a-t-il des aliments que vous ne consommez pas ?
                                                    </text>
                                                  </div>


                                                </div>
                                                <div className="col-md-3 text-center" >
                                                  <div className="row justify-content-start">
                                                    <div  className="col-md-9" style={{padding:10,borderStyle:"solid",borderColor:"#ff0000",borderWidth:0.5,borderRadius:10}}>
                                                      <text style={{color:"#ff0000"}}>
                                                        {this.state.patientData.complement_alimentaire}
                                                      </text>


                                                    </div>
                                                    <div className="col-md-1 ">
                                                      <img src={edit} style={{width:20}}/>
                                                    </div>
                                                  </div>


                                                </div>

                                              </div>
                                              <div  className="row align-items-center mt-3">
                                                <div className="col-md-2 text-left">
                                                  <text>
                                                    lequels ?
                                                  </text>

                                                </div>
                                                <div className="col-md-2 text-center" style={{backgroundColor:"#ff0000"}}>
                                                  <text style={{color:"white"}}>
                                                    {this.state.patientData.lequels}
                                                  </text>

                                                </div>
                                                <div className="col-md-1 ">
                                                  <img src={edit} style={{width:20}}/>
                                                </div>
                                              </div>
                                              <div  className="row align-items-center mt-3">
                                                <div className="col-md-2 text-left">
                                                  <text>
                                                    "What's your ethnicity?"
                                                  </text>

                                                </div>
                                                <div className="col-md-2 text-center" style={{backgroundColor:"#ff0000"}}>
                                                  <text style={{color:"white"}}>
                                                    {this.state.patientData.ethnicity}
                                                  </text>

                                                </div>
                                                <div className="col-md-1 ">
                                                  <img src={edit} style={{width:20}}/>
                                                </div>
                                              </div>
                                            </TabPanel>
                                            <TabPanel>
                                              <div className="row align-items-center mt-5">
                                                <div className="col-md-3 text-left">
                                                  <text>
                                                    Quels sont vos objectifs pour votre programme 1Food1Me ?
                                                  </text>

                                                </div>
                                                <div className="col-md-2 text-center p-1" style={{backgroundColor:"#ff0000"}}>
                                                  <text style={{color:"white"}}>
                                                    {this.state.patientData.objectif}
                                                  </text>

                                                </div>
                                                <div className="col-md-1 ">
                                                  <img src={edit} style={{width:20}}/>
                                                </div>

                                              </div>

                                            </TabPanel>
                                            <TabPanel>
                                              le statistique de client indisponible pour le moment
                                            </TabPanel>

                                          </Tabs>
                                        </div>

                                        }

                                      </TabPanel>
                                      <TabPanel>
                                        {this.state.bodyCheck!==""&&
                                        <div>
                                          <div style={{marginTop: 30}} className="text-left">
                                            <Tabs className="text-center">
                                              <TabList>
                                                <Tab >
                                                  Ma fiche perso
                                                </Tab>
                                                <Tab>
                                                  Moi et la Cuisine
                                                </Tab>
                                                <Tab>
                                                  Activité physique
                                                </Tab>
                                                <Tab>
                                                  Habitudes
                                                </Tab>
                                                <Tab>
                                                  Objectifs
                                                </Tab>
                                                <Tab>
                                                  Pb santé
                                                </Tab>

                                              </TabList>
                                              <TabPanel>
                                                {this.state.bodycheck!==""&&
                                                <div className="row align-items-start" >
                                                  <div className="col-md-5">
                                                    <div className="text-left mt-5">
                                                      <div className="row justify-content-start">
                                                        <div className="col-md-6">
                                                          <h4 className="font-weight-bold"></h4>

                                                        </div>
                                                        <div className="col-md-2">
                                                          <text></text>
                                                        </div>

                                                      </div>
                                                    </div>
                                                    <div className="text-left mt-3">
                                                      <div className="row justify-content-start">
                                                        <div className="col-md-6">
                                                          <h4 className="font-weight-bold"></h4>

                                                        </div>
                                                        <div className="col-md-2">
                                                          <text>{this.state.bodyCheck.objectif.poids} Kg</text>
                                                        </div>

                                                      </div>
                                                    </div>
                                                    <div className="text-left mt-3">
                                                      <div className="row justify-content-start align-items-center">
                                                        <div className="col-md-6">
                                                          <h4 className="font-weight-bold">Mon age </h4>

                                                        </div>
                                                        <div className="col-md-2 " style={{backgroundColor:"#2eba5f"}}>
                                                          <text style={{color:"white"}}>{this.state.bodyCheck.objectif.age} ans </text>
                                                        </div>

                                                      </div>
                                                    </div>
                                                  </div>
                                                  <div className="col-md-7">
                                                    <Tabs>
                                                      <TabList>
                                                        <Tab>
                                                          Mes Mensuration
                                                        </Tab>
                                                        <Tab>
                                                          Mes Mensuration
                                                        </Tab>
                                                        <Tab>
                                                          Mes Mensuration
                                                        </Tab>
                                                        <Tab>
                                                          Mes Mensuration
                                                        </Tab>

                                                      </TabList>
                                                      <TabPanel>
                                                        <div className="row ">

                                                          <div className="col-md-6 ">
                                                            <img src={bodyHomme} style={{width:"100%"}}/>

                                                          </div>
                                                          <div className="col-md-6 p-1" style={{borderColor:"black",borderStyle:"solid",borderRadius:8,borderWidth:0.8}}>
                                                            <div className="row align-items-center">
                                                              <div className="col-md-2">
                                                                <IconButton>
                                                                  <img src={back} style={{width:25}}/>

                                                                </IconButton>
                                                              </div>
                                                              <div className="col-md-5">
                                                                <Button  variant="contained" color="primary">
                                                                  Janvier 2020
                                                                </Button>

                                                              </div>
                                                              <div className="col-md-5">
                                                                <Button variant="contained" color="primary">
                                                                  Juin 2020
                                                                </Button>

                                                              </div>
                                                            </div>

                                                            <div style={{marginTop:"20%"}}>

                                                              <div className="row ">
                                                                <div className="col-md-6">
                                                                  <FormControl fullWidth  variant="outlined">
                                                                    <InputLabel htmlFor="outlined-adornment-amount">Taille vendre</InputLabel>
                                                                    <OutlinedInput
                                                                        id="outlined-adornment-amount"
                                                                        value=""
                                                                        endAdornment ={<InputAdornment position="end">Cm</InputAdornment>}
                                                                        labelWidth={60}
                                                                    />
                                                                  </FormControl>
                                                                </div>
                                                                <div className="col-md-6">
                                                                  <FormControl fullWidth  variant="outlined">
                                                                    <InputLabel htmlFor="outlined-adornment-amount">Taille vendre</InputLabel>
                                                                    <OutlinedInput
                                                                        id="outlined-adornment-amount"
                                                                        value=""
                                                                        endAdornment ={<InputAdornment position="end">Cm</InputAdornment>}
                                                                        labelWidth={60}
                                                                    />
                                                                  </FormControl>

                                                                </div>
                                                              </div>
                                                              <div className="row mt-2">
                                                                <div className="col-md-6">
                                                                  <FormControl fullWidth  variant="outlined">
                                                                    <InputLabel htmlFor="outlined-adornment-amount">Hanche</InputLabel>
                                                                    <OutlinedInput
                                                                        id="outlined-adornment-amount"
                                                                        value=""
                                                                        endAdornment ={<InputAdornment position="end">Cm</InputAdornment>}
                                                                        labelWidth={60}
                                                                    />
                                                                  </FormControl>
                                                                </div>
                                                                <div className="col-md-6">
                                                                  <FormControl fullWidth  variant="outlined">
                                                                    <InputLabel htmlFor="outlined-adornment-amount">Hanche</InputLabel>
                                                                    <OutlinedInput
                                                                        id="outlined-adornment-amount"
                                                                        value=""
                                                                        endAdornment ={<InputAdornment position="end">Cm</InputAdornment>}
                                                                        labelWidth={60}
                                                                    />
                                                                  </FormControl>

                                                                </div>
                                                              </div>
                                                              <div className="row mt-2">
                                                                <div className="col-md-6">
                                                                  <FormControl fullWidth  variant="outlined">
                                                                    <InputLabel htmlFor="outlined-adornment-amount">Cuisse droite</InputLabel>
                                                                    <OutlinedInput
                                                                        id="outlined-adornment-amount"
                                                                        value=""
                                                                        endAdornment ={<InputAdornment position="end">Cm</InputAdornment>}
                                                                        labelWidth={60}
                                                                    />
                                                                  </FormControl>
                                                                </div>
                                                                <div className="col-md-6">
                                                                  <FormControl fullWidth  variant="outlined">
                                                                    <InputLabel htmlFor="outlined-adornment-amount">Cuisse droite</InputLabel>
                                                                    <OutlinedInput
                                                                        id="outlined-adornment-amount"
                                                                        value=""
                                                                        endAdornment ={<InputAdornment position="end">Cm</InputAdornment>}
                                                                        labelWidth={60}
                                                                    />
                                                                  </FormControl>

                                                                </div>
                                                              </div>
                                                            </div>

                                                          </div>


                                                        </div>

                                                        <div className="mt-2">
                                                          <h4>
                                                            Evolution de mes mensurations

                                                          </h4>

                                                        </div>

                                                        <div>
                                                          <Line data={ data}
                                                          />
                                                        </div>
                                                      </TabPanel>
                                                      <TabPanel>
                                                        <div className="row ">

                                                          <div className="col-md-6  text-center">
                                                            <img src={bascule} style={{width:"50%"}}/>


                                                          </div>
                                                          <div className="col-md-6 p-1" style={{borderColor:"black",borderStyle:"solid",borderRadius:8,borderWidth:0.8}}>
                                                            <div className="row align-items-center">
                                                              <div className="col-md-2">
                                                                <IconButton>
                                                                  <img src={back} style={{width:25}}/>

                                                                </IconButton>
                                                              </div>
                                                              <div className="col-md-5">
                                                                <Button  variant="contained" color="primary">
                                                                  Janvier 2020
                                                                </Button>

                                                              </div>
                                                              <div className="col-md-5">
                                                                <Button variant="contained" color="primary">
                                                                  Juin 2020
                                                                </Button>

                                                              </div>
                                                            </div>

                                                            <div style={{marginTop:"20%"}}>


                                                              <div className="row mt-2">
                                                                <div className="col-md-6">
                                                                  <FormControl fullWidth  variant="outlined">
                                                                    <InputLabel htmlFor="outlined-adornment-amount">Poids</InputLabel>
                                                                    <OutlinedInput
                                                                        id="outlined-adornment-amount"
                                                                        value=""
                                                                        endAdornment ={<InputAdornment position="end">Kg</InputAdornment>}
                                                                        labelWidth={60}
                                                                    />
                                                                  </FormControl>
                                                                </div>
                                                                <div className="col-md-6">
                                                                  <FormControl fullWidth  variant="outlined">
                                                                    <InputLabel htmlFor="outlined-adornment-amount">Poids</InputLabel>
                                                                    <OutlinedInput
                                                                        id="outlined-adornment-amount"
                                                                        value=""
                                                                        endAdornment ={<InputAdornment position="end">Kg</InputAdornment>}
                                                                        labelWidth={60}
                                                                    />
                                                                  </FormControl>

                                                                </div>
                                                              </div>
                                                            </div>

                                                          </div>


                                                        </div>

                                                        <div className="mt-2">
                                                          <h4>
                                                            Evolution de mes mensurations

                                                          </h4>

                                                        </div>

                                                        <div>
                                                          <Line data={ data}
                                                          />
                                                        </div>
                                                      </TabPanel>
                                                    </Tabs>

                                                  </div>
                                                </div>
                                                }



                                              </TabPanel>
                                              <TabPanel>
                                                <div className="row align-items-start mt-3">
                                                  <div className="col-md-6 text-left">
                                                    <div>
                                                      <text style={{fontWeight:"bold",fontSize:"1.2vw"}}>
                                                        Généraliste
                                                      </text>
                                                    </div>
                                                    <div>
                                                      <div className="row justify-content-start mt-3">
                                                        <div className="col-md-4">
                                                          <text className="font-weight-bold">
                                                            Souhait sur Cuisine
                                                          </text>
                                                        </div>
                                                        <div className="col-md-4" style={{backgroundColor:"#2eba5f"}}>
                                                          <text style={{color:"white"}}>
                                                            {this.state.bodyCheck.question.alimentation1}
                                                          </text>

                                                        </div>
                                                        <div className="col-md-1">
                                                          <img src={edit} style={{width:"100%"}}/>
                                                        </div>

                                                      </div>
                                                      <div className="row justify-content-start mt-3">
                                                        <div className="col-md-4">
                                                          <text className="font-weight-bold">
                                                            Mon alimentation est
                                                          </text>
                                                        </div>
                                                        <div className="col-md-4" style={{backgroundColor:"#2eba5f"}}>
                                                          <text style={{color:"white"}}>
                                                            {this.state.bodyCheck.question.alimentation2}
                                                          </text>

                                                        </div>
                                                        <div className="col-md-1">
                                                          <img src={edit} style={{width:"100%"}}/>
                                                        </div>

                                                      </div>
                                                      <div className="row justify-content-start mt-3">
                                                        <div className="col-md-4">
                                                          <text className="font-weight-bold">
                                                            Mon budget alimentaire
                                                          </text>
                                                        </div>
                                                        <div className="col-md-4" style={{backgroundColor:"#2eba5f"}}>
                                                          <text style={{color:"white"}}>
                                                            {this.state.bodyCheck.question.budget_alimen}                                                                                </text>

                                                        </div>
                                                        <div className="col-md-1">
                                                          <img src={edit} style={{width:"100%"}}/>
                                                        </div>

                                                      </div>
                                                      <div className="row justify-content-start mt-3">
                                                        <div className="col-md-4">
                                                          <text className="font-weight-bold">
                                                            Est ce que vous grignotez :
                                                          </text>
                                                        </div>
                                                        <div className="col-md-4" style={{backgroundColor:"#2eba5f"}}>
                                                          <text style={{color:"white"}}>
                                                            {this.state.bodyCheck.question.vous_grignotez}
                                                          </text>


                                                        </div>
                                                        <div className="col-md-1">
                                                          <img src={edit} style={{width:"100%"}}/>
                                                        </div>

                                                      </div>
                                                      <div className="row justify-content-start mt-3">
                                                        <div className="col-md-4">
                                                          <text className="font-weight-bold">
                                                            Vous sautez des repas ?
                                                          </text>
                                                        </div>
                                                        <div className="col-md-4" style={{backgroundColor:"#2eba5f"}}>
                                                          <text style={{color:"white"}}>
                                                            {this.state.bodyCheck.question.saute_repas}
                                                          </text>

                                                        </div>
                                                        <div className="col-md-1">
                                                          <img src={edit} style={{width:"100%"}}/>
                                                        </div>

                                                      </div>
                                                      <div className="row justify-content-start mt-3">
                                                        <div className="col-md-4">
                                                          <text className="font-weight-bold">
                                                            Lequel ?
                                                          </text>
                                                        </div>
                                                        <div className="col-md-4" style={{backgroundColor:"#2eba5f"}}>
                                                          <text style={{color:"white"}}>
                                                            {this.state.bodyCheck.oui_lequel}
                                                          </text>

                                                        </div>
                                                        <div className="col-md-1">
                                                          <img src={edit} style={{width:"100%"}}/>
                                                        </div>

                                                      </div>

                                                    </div>

                                                  </div>
                                                  <div className="col-md-6">
                                                    <div className="text-left">
                                                      <text style={{fontWeight:"bold",fontSize:"1.2vw"}}>
                                                        Habitudes alimentaires actuelles
                                                      </text>
                                                    </div>
                                                    <div>
                                                      <div className="row justify-content-start mt-3">
                                                        <div className="col-md-5 text-left">
                                                          <text className="font-weight-bold">
                                                            Les Féculents pour moi, c’est :
                                                          </text>
                                                        </div>
                                                        <div className="col-md-4" style={{backgroundColor:"#2eba5f"}}>
                                                          <text style={{color:"white"}}>
                                                            {this.state.bodyCheck.question.consom_feculent}
                                                          </text>

                                                        </div>
                                                        <div className="col-md-1">
                                                          <img src={edit} style={{width:"100%"}}/>
                                                        </div>

                                                      </div>
                                                      <div className="row justify-content-start mt-3">
                                                        <div className="col-md-5 text-left">
                                                          <text className="font-weight-bold">
                                                            Les fruits , c’est :
                                                          </text>
                                                        </div>
                                                        <div className="col-md-4" style={{backgroundColor:"#2eba5f"}}>
                                                          <text style={{color:"white"}}>
                                                            {this.state.bodyCheck.question.consom_fruit}
                                                          </text>

                                                        </div>
                                                        <div className="col-md-1">
                                                          <img src={edit} style={{width:"100%"}}/>
                                                        </div>

                                                      </div>
                                                      <div className="row justify-content-start mt-3">
                                                        <div className="col-md-5 text-left">
                                                          <text className="font-weight-bold">
                                                            La viande, poisson, c’est
                                                          </text>
                                                        </div>
                                                        <div className="col-md-4" style={{backgroundColor:"#2eba5f"}}>
                                                          <text style={{color:"white"}}>
                                                            {this.state.bodyCheck.question.consom_viande}
                                                          </text>

                                                        </div>
                                                        <div className="col-md-1">
                                                          <img src={edit} style={{width:"100%"}}/>
                                                        </div>

                                                      </div>
                                                      <div className="row justify-content-start mt-3">
                                                        <div className="col-md-5 text-left">
                                                          <text className="font-weight-bold">
                                                            Les produits laitiers, c’est
                                                          </text>
                                                        </div>
                                                        <div className="col-md-4" style={{backgroundColor:"#2eba5f"}}>
                                                          <text style={{color:"white"}}>
                                                            {this.state.bodyCheck.question.consom_laitiers}

                                                          </text>

                                                        </div>
                                                        <div className="col-md-1">
                                                          <img src={edit} style={{width:"100%"}}/>
                                                        </div>

                                                      </div>
                                                      <div className="row justify-content-start mt-3">
                                                        <div className="col-md-5 text-left">
                                                          <text className="font-weight-bold">
                                                            La consommation produit gras
                                                          </text>
                                                        </div>
                                                        <div className="col-md-4" style={{backgroundColor:"#2eba5f"}}>
                                                          <text style={{color:"white"}}>
                                                            {this.state.bodyCheck.question.consom_prod_gras}

                                                          </text>

                                                        </div>
                                                        <div className="col-md-1">
                                                          <img src={edit} style={{width:"100%"}}/>
                                                        </div>

                                                      </div>
                                                      <div className="row justify-content-start mt-3">
                                                        <div className="col-md-5 text-left">
                                                          <text className="font-weight-bold">
                                                            Les produits sucrés c’est
                                                          </text>
                                                        </div>
                                                        <div className="col-md-4" style={{backgroundColor:"#2eba5f"}}>
                                                          <text style={{color:"white"}}>
                                                            {this.state.bodyCheck.question.consom_prod_sucre}

                                                          </text>

                                                        </div>
                                                        <div className="col-md-1">
                                                          <img src={edit} style={{width:"100%"}}/>
                                                        </div>

                                                      </div>
                                                      <div className="row justify-content-start mt-3">
                                                        <div className="col-md-5 text-left">
                                                          <text className="font-weight-bold">
                                                            La consommation d’alcool c’est:
                                                          </text>
                                                        </div>
                                                        <div className="col-md-4" style={{backgroundColor:"#2eba5f"}}>
                                                          <text style={{color:"white"}}>
                                                            {this.state.bodyCheck.question.consom_alcool}

                                                          </text>

                                                        </div>
                                                        <div className="col-md-1">
                                                          <img src={edit} style={{width:"100%"}}/>
                                                        </div>

                                                      </div>

                                                    </div>
                                                  </div>

                                                </div>
                                              </TabPanel>
                                              <TabPanel>
                                                <div className="col-md-12 text-left mt-5">
                                                  <div>
                                                    <text className="font-weight-bold" style={{fontSize:"1.2vw"}}>
                                                      Habitudes sportives
                                                    </text>

                                                  </div>
                                                  <div className="row align-items-center mt-3 justify-content-start">
                                                    <div className="col-md-4 " >
                                                      <text >
                                                        Par jour, vous faite 30 min d'activités
                                                      </text>

                                                    </div>
                                                    <div className="col-md-4 text-center " style={{backgroundColor:"#2eba5f"}}>
                                                      <text style={{color:"white"}}>
                                                        {this.state.bodyCheck.question.activite_jour}

                                                      </text>

                                                    </div>
                                                    <div className="col-md-1">
                                                      <img src={edit} style={{width:20}}/>
                                                    </div>
                                                  </div>
                                                  <div className="row align-items-center mt-3 justify-content-start">
                                                    <div className="col-md-4">
                                                      <text>
                                                        Par semaine, l’activité sportive c’est :
                                                      </text>

                                                    </div>
                                                    <div className="col-md-4 text-center" style={{backgroundColor:"#2eba5f"}}>
                                                      <text style={{color:"white"}}>
                                                        {this.state.bodyCheck.question.heure_sport}

                                                      </text>

                                                    </div>
                                                    <div className="col-md-1">
                                                      <img src={edit} style={{width:20}}/>
                                                    </div>
                                                  </div>
                                                </div>
                                              </TabPanel>
                                              <TabPanel>
                                                <div  className="row align-items-center mt-3">
                                                  <div className="col-md-2 text-left">
                                                    <text>
                                                      Travail en heure décalée
                                                    </text>

                                                  </div>
                                                  <div className="col-md-2 text-center" style={{backgroundColor:"#2eba5f"}}>
                                                    <text style={{color:"white"}}>
                                                      {this.state.bodyCheck.question.travaill_horraire_decale}

                                                    </text>

                                                  </div>
                                                  <div className="col-md-1 ">
                                                    <img src={edit} style={{width:20}}/>
                                                  </div>
                                                </div>
                                                <div  className="row align-items-center mt-3">
                                                  <div className="col-md-2 text-left">
                                                    <text>
                                                      Mon principale problème :
                                                    </text>

                                                  </div>
                                                  <div className="col-md-2 text-center" style={{backgroundColor:"#2eba5f"}}>
                                                    <text style={{color:"white"}}>
                                                      {this.state.bodyCheck.question.probleme_de}

                                                    </text>

                                                  </div>
                                                  <div className="col-md-1 ">
                                                    <img src={edit} style={{width:20}}/>
                                                  </div>
                                                </div>

                                                <div  className="row align-items-center mt-3">
                                                  <div className="col-md-2 text-left">
                                                    <text>
                                                      Est ce que je fumes ?
                                                    </text>

                                                  </div>
                                                  <div className="col-md-2 text-center" style={{backgroundColor:"#2eba5f"}}>
                                                    <text style={{color:"white"}}>
                                                      {this.state.bodyCheck.objectif.fumer_reg}
                                                    </text>

                                                  </div>
                                                  <div className="col-md-1 ">
                                                    <img src={edit} style={{width:20}}/>
                                                  </div>
                                                </div>
                                              </TabPanel>
                                              <TabPanel>
                                                <div className="row align-items-center mt-5">
                                                  <div className="col-md-3 text-left">
                                                    <text>
                                                      Mon objectif principale
                                                    </text>

                                                  </div>
                                                  <div className="col-md-2 text-center p-1" style={{backgroundColor:"#2eba5f"}}>
                                                    <text style={{color:"white"}}>
                                                      {this.state.bodyCheck.question.objectif}

                                                    </text>

                                                  </div>
                                                  <div className="col-md-1 ">
                                                    <img src={edit} style={{width:20}}/>
                                                  </div>

                                                </div>

                                              </TabPanel>
                                            </Tabs>
                                          </div>
                                        </div>
                                        }

                                      </TabPanel>

                                    </Tabs>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        }
                      </Route>

                      <Route exact path="/home/timeSheet/dashboard">
                        {
                          this.state.loading === false && this.state.firstLoading === false &&
                          <div>
                            <div className="row">
                              <div className="col-lg-12">
                                <div className="row align-items-center²">
                                  <div className="col-md-12 text-left">
                                    <h5 className="font-weight-bold">Time Sheet</h5>
                                    <h6 className="ml-2"> > Dashboard </h6>
                                  </div>
                                </div>
                                <div className="card-box text-center"
                                     style={{ marginTop: 1 }}>
                                  <div style={{ marginTop: 10 }}
                                       className="text-left">
                                    <Tabs>
                                      <TabList>
                                        <Tab>This Week</Tab>
                                        <Tab disabled={true}>Scheduled Next Week </Tab>
                                      </TabList>
                                      <TabPanel>
                                        <div
                                            className="row justify-content-start align-items-center mt-3">
                                          <div>
                                            <BT
                                                variant="contained"
                                                style={{
                                                  backgroundColor: '#17a51b',
                                                  color: 'white'
                                                }}
                                                startIcon={
                                                  <img src={pluss}
                                                       style={{ width: 10 }} />}
                                            > Add Person </BT>
                                          </div>
                                          <div className="ml-1">
                                            <BT
                                                variant="contained"
                                                style={{ color: '#a6a6a6' }}
                                            > Import </BT>
                                          </div>
                                          <div className="ml-1">
                                            <BT
                                                variant="contained"
                                                style={{ color: '#a6a6a6' }}
                                            > Export </BT>
                                          </div>
                                        </div>
                                        <div className="row mt-2">
                                          <div className="col-md-4">
                                            <div
                                                className="row align-items-center justify-content-start">
                                              <h3 className="font-weight-bold">This Week : </h3>
                                              <h3>08 - 14 may 2017</h3>
                                            </div>
                                          </div>
                                          <div
                                              className="col-md-8 text-right">
                                            <ButtonGroup
                                                color="#a6a6a6"
                                                aria-label="outlined secondary button group">
                                              <BT> <img
                                                  src={back}
                                                  style={{ width: 18 }} />
                                              </BT> <BT
                                                style={{ backgroundColor: '#e6e6e6' }}> This Week</BT>
                                              <BT> <img
                                                  src={back}
                                                  style={{
                                                    width: 18,
                                                    transform: 'rotate(180deg)'
                                                  }} />
                                              </BT>
                                            </ButtonGroup>
                                          </div>
                                        </div>
                                        <div
                                            className="row align-items-center w-100">
                                          <div className="col-md-4 text-left">
                                            <hr style={{
                                              width: '80%',
                                              height: 1,
                                              backgroundColor: '#a6a6a6',
                                              marginRight: '100%'
                                            }} />
                                          </div>
                                          <div
                                              className="col-md-8 text-right ">
                                            <hr style={{
                                              width: '100%',
                                              height: 1,
                                              backgroundColor: '#a6a6a6'
                                            }} />
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
                                                  width: '80%'
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
                                                          description: '0%',
                                                          color: '#1998ed'
                                                        },
                                                        {
                                                          value: 20,
                                                          description: '60%',
                                                          color: '#a5d6fa'
                                                        },
                                                        {
                                                          value: 20,
                                                          description: '80%',
                                                          color: 'white'
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
                                                  );
                                                }
                                                } />
                                          }
                                        </div>
                                      </TabPanel>
                                      <TabPanel>
                                        <div className="row align-items-center">
                                          <ButtonGroup
                                              color="#a6a6a6"
                                              aria-label="outlined secondary button group">
                                            <BT>ALL</BT>
                                            <BT> <img
                                                src={time}
                                                style={{ width: 20 }} /> Time</BT>
                                            <BT> <img
                                                src={money}
                                                style={{ width: 20 }} /> Expense</BT>
                                          </ButtonGroup>
                                          <div className="ml-2">
                                            <DatePicker
                                                calendarIcon={
                                                  <img
                                                      src={calendar}
                                                      style={{ width: 20 }} />}
                                                onChange={(e) => {
                                                  let d = this.state.TimeSheet;
                                                  d.newTime.date = e;
                                                  this.setState({ TimeSheet: d });
                                                }}
                                                value={this.state.TimeSheet.newTime.date}
                                            />
                                          </div>
                                          <div className="ml-1">
                                            <h5>-</h5>
                                          </div>
                                          <div className="ml-1">
                                            <DatePicker
                                                calendarIcon={
                                                  <img
                                                      src={calendar}
                                                      style={{ width: 20 }} />}
                                                onChange={(e) => {
                                                  let d = this.state.TimeSheet;
                                                  d.newTime.date = e;
                                                  this.setState({ TimeSheet: d });
                                                }}
                                                value={this.state.TimeSheet.newTime.date}
                                            />
                                          </div>
                                          <div className="ml-2">
                                            <ButtonGroup
                                                color="#a6a6a6"
                                                aria-label="outlined secondary button group">
                                              <BT> <img
                                                  src={play}
                                                  style={{
                                                    width: 18,
                                                    transform: 'rotate(180deg)'
                                                  }} />
                                              </BT> <BT>
                                              <img src={play}
                                                   style={{ width: 18 }} />
                                            </BT>
                                            </ButtonGroup>
                                          </div>
                                          <div className="col-md-2 ml-2">
                                            <Select
                                                labelId="demo-simple-select-label"
                                                id="demo-simple-select"
                                                style={{ width: '100%' }}
                                                defaultValue={'Custom'}
                                            > <MenuItem
                                                value={'Custom'}>Custom</MenuItem>
                                              <MenuItem
                                                  value={'Associé'}>Custom 2</MenuItem>
                                              <MenuItem
                                                  value={'Collaborateur'}>Costim 3</MenuItem>
                                            </Select>
                                          </div>
                                        </div>
                                        {
                                          this.state.contacts.length > 0 &&
                                          <TableTimeSheet
                                              contacts={this.state.contacts}
                                              onEditClick={(contact, key) => {
                                                this.setState({
                                                      selectedSociete: contact,
                                                      selectedSocieteKey: key,
                                                      openRightSocieteModalDetail: true
                                                    }
                                                );
                                              }
                                              } />
                                        }
                                      </TabPanel>
                                    </Tabs>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        }
                      </Route>

                      <Route exact path="/home/timeSheet/dashboardPerson">
                        {
                          this.state.loading === false && this.state.firstLoading === false &&
                          <div>
                            <div className="row">
                              <div className="col-lg-12">
                                <div className="row align-items-center²">
                                  <div className="col-md-12 text-left">
                                    <h5 className="font-weight-bold">Time Sheet</h5>
                                    <h6 className="ml-2"> > Dashboard </h6>
                                  </div>
                                </div>
                                <div className="card-box text-center"
                                     style={{ marginTop: 1 }}>
                                  <div style={{ marginTop: 10 }}
                                       className="text-left">
                                    <Tabs> <TabList>
                                      <Tab>This Week</Tab>
                                      {/*<Tab>Scheduled Next Week </Tab>*/}
                                    </TabList>
                                      <TabPanel>
                                        <div
                                            className="row border border-primary"
                                            style={{ marginTop: 35 }}>
                                          <div className="col-md-4">
                                            <FormControl
                                                variant="outlined"
                                                style={{ width: '100%' }}>
                                              <MuiSelect
                                                  labelId="demo-simple-select-filled-label"
                                                  id="demo-simple-select-filled"
                                                  style={{ width: '100%' }}
                                                  value={this.state.DashboardPerson.person}
                                                  onChange={(e) => {
                                                    let d = this.state.DashboardPerson;
                                                    d.person = e.target.value;

                                                    this.setState({ DashboardPerson: d });
                                                    //console.log(e.target.value)
                                                  }}
                                                  MenuProps={Data.MenuProps}
                                              >
                                                {this.state.contacts.map((name, key) => (
                                                    <MenuItem
                                                        key={key}
                                                        value={name}>
                                                      <div
                                                          className="row align-items-center">
                                                        <Avatar
                                                            alt="Natacha"
                                                            src={name.imageUrl}
                                                            style={{ marginLeft: 10 }} />
                                                        <div
                                                            className="ml-2">  {name.nom + ' ' + name.prenom} </div>
                                                      </div>
                                                    </MenuItem>
                                                ))}
                                              </MuiSelect>
                                            </FormControl>
                                          </div>
                                          <div className="col-md-1"
                                               style={{
                                                 borderLeftColor: '#a6a6a6',
                                                 borderLeftStyle: 'solid',
                                                 borderLeftWidth: 1
                                               }}>
                                            <h5>A-B-C</h5>
                                          </div>
                                          <div className="col-md-1"
                                               style={{
                                                 borderLeftColor: '#a6a6a6',
                                                 borderLeftStyle: 'solid',
                                                 borderLeftWidth: 1
                                               }}>
                                            <h5>D-E-F</h5>
                                          </div>
                                          <div className="col-md-1"
                                               style={{
                                                 borderLeftColor: '#a6a6a6',
                                                 borderLeftStyle: 'solid',
                                                 borderLeftWidth: 1
                                               }}>
                                            <h5>G-H-I</h5>
                                          </div>
                                          <div className="col-md-1"
                                               style={{
                                                 borderLeftColor: '#a6a6a6',
                                                 borderLeftStyle: 'solid',
                                                 borderLeftWidth: 1
                                               }}>
                                            <h5>J-K-L</h5>
                                          </div>
                                          <div className="col-md-1"
                                               style={{
                                                 borderLeftColor: '#a6a6a6',
                                                 borderLeftStyle: 'solid',
                                                 borderLeftWidth: 1
                                               }}>
                                            <h5>M-N-O</h5>
                                          </div>
                                          <div className="col-md-1"
                                               style={{
                                                 borderLeftColor: '#a6a6a6',
                                                 borderLeftStyle: 'solid',
                                                 borderLeftWidth: 1
                                               }}>
                                            <h5>P-Q-R</h5>
                                          </div>
                                          <div className="col-md-1"
                                               style={{
                                                 borderLeftColor: '#a6a6a6',
                                                 borderLeftStyle: 'solid',
                                                 borderLeftWidth: 1
                                               }}>
                                            <h5>S-T-U</h5>
                                          </div>
                                          <div className="col-md-1"
                                               style={{
                                                 borderLeftColor: '#a6a6a6',
                                                 borderLeftStyle: 'solid',
                                                 borderLeftWidth: 1
                                               }}>
                                            <h5>W-X-Y-Z</h5>
                                          </div>
                                        </div>
                                        <div className="row mt-2">
                                          <div className="col-md-4">
                                            <div
                                                className="row align-items-center justify-content-start">
                                              <h3 className="font-weight-bold">This Week : </h3>
                                              <h3>08 - 14 may 2017</h3>
                                            </div>
                                          </div>
                                          <div
                                              className="col-md-8 text-right">
                                            <ButtonGroup
                                                color="#a6a6a6"
                                                aria-label="outlined secondary button group">
                                              <BT> <img
                                                  src={back}
                                                  style={{ width: 18 }} />
                                              </BT> <BT
                                                style={{ backgroundColor: '#e6e6e6' }}> This Week</BT>
                                              <BT> <img
                                                  src={back}
                                                  style={{
                                                    width: 18,
                                                    transform: 'rotate(180deg)'
                                                  }} />
                                              </BT>
                                            </ButtonGroup>
                                          </div>
                                        </div>
                                        <div>
                                          <hr style={{
                                            width: '100%',
                                            height: 1,
                                            backgroundColor: '#a6a6a6'
                                          }} />
                                        </div>
                                        {this.state.DashboardPerson.person != '' &&
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
                                                      style={{ width: '100%' }} />
                                                </div>
                                                <div
                                                    className="col-md-8">
                                                  <div>
                                                    <h4
                                                        className="font-weight-bold">{this.state.DashboardPerson.person.nom + ' ' + this.state.DashboardPerson.person.prenom}</h4>
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
                                                      backgroundColor: '#e6e6e6',
                                                      color: 'black',
                                                      textTransform: 'none'
                                                    }}
                                                    startIcon={
                                                      <img
                                                          src={edit}
                                                          style={{ width: 10 }} />}
                                                > Edit profile </BT>
                                                <BT
                                                    variant="contained"
                                                    endIcon={
                                                      <img
                                                          src={down}
                                                          style={{ width: 10 }} />}
                                                    style={{
                                                      backgroundColor: '#e6e6e6',
                                                      color: 'black',
                                                      marginLeft: 5,
                                                      textTransform: 'none'
                                                    }}
                                                    aria-controls="simple-menu"
                                                    aria-haspopup="true"> Actions </BT>
                                                <Menu
                                                    id="simple-menu"
                                                    anchorEl={''}
                                                    keepMounted
                                                >
                                                  <MenuItem>Profile</MenuItem>
                                                  <MenuItem>My account</MenuItem>
                                                  <MenuItem>Logout</MenuItem>
                                                </Menu>
                                              </div>
                                            </div>
                                          </div>
                                          <div className="row mt-4">
                                            <div className="col-md-4">
                                              <div className="col-md-12 "
                                                   style={{
                                                     borderStyle: 'solid',
                                                     borderRadius: 10,
                                                     borderWidth: 0.5,
                                                     borderColor: '#a6a6a6'
                                                   }}>
                                                <div className="row">
                                                  <div
                                                      className="col-md-6 text-left">
                                                    <h5 style={{ color: '#a6a6a6' }}>
                                                      Total Hours
                                                    </h5>
                                                    <h4 className="font-weight-bold">
                                                      30.75
                                                    </h4>
                                                  </div>
                                                  <div
                                                      className="col-md-6 text-left">
                                                    <h5 style={{ color: '#a6a6a6' }}>
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
                                                          description: '0%',
                                                          color: '#1998ed'
                                                        },
                                                        {
                                                          value: 20,
                                                          description: '60%',
                                                          color: '#a5d6fa'
                                                        },
                                                        {
                                                          value: 20,
                                                          description: '80%',
                                                          color: 'white'
                                                        }
                                                      ]}
                                                  />
                                                </div>
                                                <div
                                                    className="row mt-2 align-items-center  ml-1 "
                                                    style={{ width: '100%' }}>
                                                  <div
                                                      className="col-md-6">
                                                    <div
                                                        className="row align-items-center   ">
                                                      <div
                                                          style={{
                                                            height: 15,
                                                            width: 15,
                                                            borderRadius: 2,
                                                            backgroundColor: '#1998ed'
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
                                                    style={{ width: '100%' }}>
                                                  <div
                                                      className="col-md-6">
                                                    <div
                                                        className="row align-items-center   ">
                                                      <div
                                                          style={{
                                                            height: 15,
                                                            width: 15,
                                                            borderRadius: 2,
                                                            backgroundColor: '#a5d6fa'
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
                                                    borderStyle: 'solid',
                                                    borderRadius: 10,
                                                    borderWidth: 0.5,
                                                    borderColor: '#a6a6a6'
                                                  }}>
                                                <div
                                                    className="row justify-content-center align-items-center">
                                                  <div
                                                      style={{ width: '12%' }}>
                                                    <div>Mon</div>
                                                    <h6>6.50</h6>
                                                  </div>
                                                  <div
                                                      style={{ width: '12%' }}>
                                                    <div>Tue</div>
                                                    <h6>7.58</h6>
                                                  </div>
                                                  <div
                                                      style={{ width: '12%' }}>
                                                    <div>Wed</div>
                                                    <h6>6.23</h6>
                                                  </div>
                                                  <div
                                                      style={{ width: '12%' }}>
                                                    <div>Thu</div>
                                                    <h6>7.33</h6>
                                                  </div>
                                                  <div
                                                      style={{ width: '12%' }}>
                                                    <div>Fri</div>
                                                    <h6>3.10</h6>
                                                  </div>
                                                  <div
                                                      style={{ width: '12%' }}>
                                                    <div>Sat</div>
                                                    <h6>0.00</h6>
                                                  </div>
                                                  <div
                                                      style={{ width: '12%' }}>
                                                    <div>Sun</div>
                                                    <h6>0.00</h6>
                                                  </div>
                                                </div>
                                              </div>
                                              <div
                                                  className="col-md-12 mt-3 "
                                                  style={{
                                                    borderStyle: 'solid',
                                                    borderRadius: 10,
                                                    borderWidth: 0.5,
                                                    borderColor: '#a6a6a6',
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
                                                        description: '0%',
                                                        color: '#5cb31f'
                                                      },
                                                      {
                                                        value: 20,
                                                        description: '60%',
                                                        color: '#fc6420'
                                                      },
                                                      {
                                                        value: 20,
                                                        description: '80%',
                                                        color: '#e1c92c'
                                                      },
                                                      {
                                                        value: 10,
                                                        description: '80%',
                                                        color: '#20bde8'
                                                      }
                                                    ]}
                                                />
                                                <div
                                                    className="row mt-2 align-items-center  ml-1 "
                                                    style={{ width: '100%' }}>
                                                  <div
                                                      className="col-md-8">
                                                    <div
                                                        className="row align-items-center   ">
                                                      <div
                                                          style={{
                                                            height: 15,
                                                            width: 15,
                                                            borderRadius: 2,
                                                            backgroundColor: '#5cb31f'
                                                          }}>
                                                      </div>
                                                      <div
                                                          className="ml-1">
                                                        <div>Autumn 2016 Campaign Launch
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
                                                    style={{ width: '100%' }}>
                                                  <div
                                                      className="col-md-8">
                                                    <div
                                                        className="row align-items-center   ">
                                                      <div
                                                          style={{
                                                            height: 15,
                                                            width: 15,
                                                            borderRadius: 2,
                                                            backgroundColor: '#fc6420'
                                                          }}>
                                                      </div>
                                                      <div
                                                          className="ml-1">
                                                        <div>Website Redisgn 2017 - Phase
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
                                                    style={{ width: '100%' }}>
                                                  <div
                                                      className="col-md-8">
                                                    <div
                                                        className="row align-items-center   ">
                                                      <div
                                                          style={{
                                                            height: 15,
                                                            width: 15,
                                                            borderRadius: 2,
                                                            backgroundColor: '#e1c92c'
                                                          }}>
                                                      </div>
                                                      <div
                                                          className="ml-1">
                                                        <div>Signage Redesign 2017
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
                                                    style={{ width: '100%' }}>
                                                  <div
                                                      className="col-md-8">
                                                    <div
                                                        className="row align-items-center   ">
                                                      <div
                                                          style={{
                                                            height: 15,
                                                            width: 15,
                                                            borderRadius: 2,
                                                            backgroundColor: '#20bde8'
                                                          }}>
                                                      </div>
                                                      <div
                                                          className="ml-1">
                                                        <div>Internal Office
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
                                                    borderBottomStyle: 'solid',
                                                    borderBottomColor: '#a6a6a6'
                                                  }}>
                                                <div
                                                    className="col-md-auto">
                                                  <div
                                                      className="font-weight-bold"
                                                      style={{ color: 'black' }}>Monday
                                                  </div>
                                                  {' ' + data.dashboardTab.monday.date}
                                                </div>
                                              </div>
                                              {data.dashboardTab.monday.data.map((item, key) => (
                                                  <div key={key}
                                                       className="row align-items-center"
                                                       style={{
                                                         borderBottomStyle: 'solid',
                                                         borderBottomColor: '#a6a6a6',
                                                         borderBottomWidth: 0.2,
                                                         marginTop: 8,
                                                         paddingBottom: 10
                                                       }}>
                                                    <div
                                                        className="col-md-9 text-left">
                                                      <div>
                                                        <div
                                                            className="font-weight-bold"
                                                            style={{ color: 'black' }}>{item.title}</div>
                                                      </div>
                                                      <div>
                                                        <div>{item.work}</div>
                                                      </div>
                                                    </div>
                                                    <div
                                                        className="col-md-2">
                                                      <div
                                                          className="font-weight-bold"
                                                          style={{ color: 'black' }}>{item.value}</div>
                                                    </div>
                                                    <div
                                                        className="col-md-1">
                                                      <IconButton>
                                                        <img
                                                            src={edit}
                                                            style={{ width: '100%' }} />
                                                      </IconButton>
                                                    </div>
                                                  </div>
                                              ))}
                                            </div>
                                          </div>
                                        </div>


                                        }
                                      </TabPanel>
                                      {/*<TabPanel>
                                        <div className="row align-items-center">
                                          <ButtonGroup
                                            color="#a6a6a6"
                                            aria-label="outlined secondary button group">
                                            <BT>ALL</BT>
                                            <BT> <img
                                              src={time}
                                              style={{ width: 20 }} /> Time</BT>
                                            <BT> <img
                                              src={money}
                                              style={{ width: 20 }} /> Expense</BT>
                                          </ButtonGroup>
                                          <div className="ml-2">
                                            <DatePicker
                                              calendarIcon={
                                                <img
                                                  src={calendar}
                                                  style={{ width: 20 }} />}
                                              onChange={(e) => {
                                                let d = this.state.TimeSheet;
                                                d.newTime.date = e;
                                                this.setState({ TimeSheet: d });
                                              }}
                                              value={this.state.TimeSheet.newTime.date}
                                            />
                                          </div>
                                          <div className="ml-1">
                                            <h5>-</h5>
                                          </div>
                                          <div className="ml-1">
                                            <DatePicker
                                              calendarIcon={
                                                <img
                                                  src={calendar}
                                                  style={{ width: 20 }} />}
                                              onChange={(e) => {
                                                let d = this.state.TimeSheet;
                                                d.newTime.date = e;
                                                this.setState({ TimeSheet: d });
                                              }}
                                              value={this.state.TimeSheet.newTime.date}
                                            />
                                          </div>
                                          <div className="ml-2">
                                            <ButtonGroup
                                              color="#a6a6a6"
                                              aria-label="outlined secondary button group">
                                              <BT> <img
                                                src={play}
                                                style={{
                                                  width: 18,
                                                  transform: 'rotate(180deg)'
                                                }} />
                                              </BT> <BT>
                                              <img src={play}
                                                   style={{ width: 18 }} />
                                            </BT>
                                            </ButtonGroup>
                                          </div>
                                          <div className="col-md-2 ml-2">
                                            <Select
                                              labelId="demo-simple-select-label"
                                              id="demo-simple-select"
                                              style={{ width: '100%' }}
                                              defaultValue={'Custom'}
                                            > <MenuItem
                                              value={'Custom'}>Custom</MenuItem>
                                              <MenuItem
                                                value={'Associé'}>Custom 2</MenuItem>
                                              <MenuItem
                                                value={'Collaborateur'}>Costim 3</MenuItem>
                                            </Select>
                                          </div>
                                        </div>
                                        {
                                          this.state.contacts.length > 0 &&
                                          <TableTimeSheet
                                            contacts={this.state.contacts}
                                            onEditClick={(contact, key) => {
                                              this.setState({
                                                  selectedSociete: contact,
                                                  selectedSocieteKey: key,
                                                  openRightSocieteModalDetail: true
                                                }
                                              );
                                            }
                                            } />
                                        }
                                      </TabPanel> */}
                                    </Tabs>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        }
                      </Route>

                      <Route exact path="/home/timeSheet/dashboardProject">
                        {
                          this.state.loading === false && this.state.firstLoading === false &&
                          <div>
                            <div className="row">
                              <div className="col-lg-12">
                                <div className="row align-items-center²">
                                  <div className="col-md-12 text-left">
                                    <h5 className="font-weight-bold">Time Sheet</h5>
                                    <h6 className="ml-2"> > Dashboard Project </h6>
                                  </div>
                                </div>
                                <div className="card-box text-center"
                                     style={{ marginTop: 1 }}>
                                  <div style={{ marginTop: 10 }}
                                       className="text-left">
                                    <Tabs> <TabList>
                                      <Tab>All projects</Tab>
                                      <Tab disabled={true}>This Week</Tab>
                                      <Tab disabled={true}>Scheduled Next Week </Tab>
                                    </TabList> <TabPanel>
                                      <div
                                          className="row justify-content-start align-items-center mt-3">
                                        <div>
                                          <BT
                                              variant="contained"
                                              style={{
                                                backgroundColor: '#17a51b',
                                                color: 'white'
                                              }}
                                              startIcon={<img
                                                  src={pluss}
                                                  style={{ width: 10 }} />}
                                          > Add Person </BT>
                                        </div>
                                        <div className="ml-1">
                                          <BT
                                              variant="contained"
                                              style={{ color: '#a6a6a6' }}
                                          > Import </BT>
                                        </div>
                                        <div className="ml-1">
                                          <BT
                                              variant="contained"
                                              style={{ color: '#a6a6a6' }}
                                          > Export </BT>
                                        </div>
                                      </div>
                                      <div
                                          className="row justify-content-start">
                                        <div
                                            className="mt-3 text-left col-md-3">
                                          <BT
                                              variant="contained"
                                              endIcon={<img
                                                  alt=""
                                                  src={down}
                                                  style={{ width: 10 }} />}
                                              style={{
                                                backgroundColor: '#e6e6e6',
                                                color: 'black',
                                                marginLeft: 5,
                                                textTransform: 'none',
                                                width: '100%'
                                              }}
                                              aria-controls="simple-menu"
                                              aria-haspopup="true"> Budgeted Project (9) </BT>
                                        </div>
                                      </div>
                                      <div className="mt-3">
                                        <table className="table">
                                          <thead
                                              className="thead-light">
                                          <tr>
                                            <th scope="col">ACME CORPORATION
                                            </th>
                                            <th scope="col">Budget</th>
                                            <th scope="col">Spent</th>
                                            <th scope="col"
                                                style={{ width: '20%' }} />
                                            <th scope="col">Remaining</th>
                                            <th scope="col" />
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
                                                          width: item.chart + '%',
                                                          backgroundColor: '#1fbce7'
                                                        }}
                                                        aria-valuenow="10"
                                                        aria-valuemin='0'
                                                        aria-valuemax="100" />
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
                                            <th scope="col">ASTORIAN PUBLISHING
                                            </th>
                                            <th scope="col">Budget</th>
                                            <th scope="col">Spent</th>
                                            <th scope="col"
                                                style={{ width: '20%' }} />
                                            <th scope="col">Remaining</th>
                                            <th scope="col" />
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
                                                          width: item.chart + '%',
                                                          backgroundColor: '#1fbce7'
                                                        }}
                                                        aria-valuenow="10"
                                                        aria-valuemin='0'
                                                        aria-valuemax="100" />
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
                                            <th scope="col">BARRINGTON PUBLISHERS
                                            </th>
                                            <th scope="col">Budget</th>
                                            <th scope="col">Spent</th>
                                            <th scope="col"
                                                style={{ width: '20%' }} />
                                            <th scope="col">Remaining</th>
                                            <th scope="col" />
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
                                                          width: item.chart + '%',
                                                          backgroundColor: '#1fbce7'
                                                        }}
                                                        aria-valuenow="10"
                                                        aria-valuemin='0'
                                                        aria-valuemax="100" />
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
                                            <th scope="col">BRITISH MUSEUM
                                            </th>
                                            <th scope="col">Budget</th>
                                            <th scope="col">Spent</th>
                                            <th scope="col"
                                                style={{ width: '20%' }} />
                                            <th scope="col">Remaining</th>
                                            <th scope="col" />
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
                                                          width: item.chart + '%',
                                                          backgroundColor: '#1fbce7'
                                                        }}
                                                        aria-valuenow="10"
                                                        aria-valuemin='0'
                                                        aria-valuemax="100" />
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
                                            <th scope="col">BROADSTREET INC
                                            </th>
                                            <th scope="col">Budget</th>
                                            <th scope="col">Spent</th>
                                            <th scope="col"
                                                style={{ width: '20%' }} />
                                            <th scope="col">Remaining</th>
                                            <th scope="col" />
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
                                                          width: item.chart + '%',
                                                          backgroundColor: '#1fbce7'
                                                        }}
                                                        aria-valuenow="10"
                                                        aria-valuemin='0'
                                                        aria-valuemax="100" />
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
                                    </TabPanel> <TabPanel>
                                      <div className="row align-items-center">
                                        <ButtonGroup
                                            color="#a6a6a6"
                                            aria-label="outlined secondary button group">
                                          <BT>ALL</BT> <BT>
                                          <img src={time}
                                               style={{ width: 20 }} /> Time</BT>
                                          <BT> <img
                                              src={money}
                                              style={{ width: 20 }} /> Expense</BT>
                                        </ButtonGroup>
                                        <div className="ml-2">
                                          <DatePicker
                                              calendarIcon={
                                                <img
                                                    src={calendar}
                                                    style={{ width: 20 }} />}
                                              onChange={(e) => {
                                                let d = this.state.TimeSheet;
                                                d.newTime.date = e;
                                                this.setState({ TimeSheet: d });
                                              }}
                                              value={this.state.TimeSheet.newTime.date}
                                          />
                                        </div>
                                        <div className="ml-1">
                                          <h5>-</h5>
                                        </div>
                                        <div className="ml-1">
                                          <DatePicker
                                              calendarIcon={
                                                <img
                                                    src={calendar}
                                                    style={{ width: 20 }} />}
                                              onChange={(e) => {
                                                let d = this.state.TimeSheet;
                                                d.newTime.date = e;
                                                this.setState({ TimeSheet: d });
                                              }}
                                              value={this.state.TimeSheet.newTime.date}
                                          />
                                        </div>
                                        <div className="ml-2">
                                          <ButtonGroup
                                              color="#a6a6a6"
                                              aria-label="outlined secondary button group">
                                            <BT> <img
                                                src={play}
                                                style={{
                                                  width: 18,
                                                  transform: 'rotate(180deg)'
                                                }} />
                                            </BT> <BT> <img
                                              src={play}
                                              style={{ width: 18 }} />
                                          </BT> </ButtonGroup>
                                        </div>
                                        <div className="col-md-2 ml-2">
                                          <Select
                                              labelId="demo-simple-select-label"
                                              id="demo-simple-select"
                                              style={{ width: '100%' }}
                                              defaultValue={'Custom'}
                                          > <MenuItem
                                              value={'Custom'}>Custom</MenuItem>
                                            <MenuItem
                                                value={'Associé'}>Custom 2</MenuItem>
                                            <MenuItem
                                                value={'Collaborateur'}>Costim 3</MenuItem>
                                          </Select>
                                        </div>
                                      </div>
                                      {
                                        this.state.contacts.length > 0 &&
                                        <TableTimeSheet
                                            contacts={this.state.contacts}
                                            onEditClick={(contact, key) => {
                                              this.setState({
                                                    selectedSociete: contact,
                                                    selectedSocieteKey: key,
                                                    openRightSocieteModalDetail: true
                                                  }
                                              );
                                            }
                                            } />
                                      }
                                    </TabPanel> <TabPanel> </TabPanel>
                                    </Tabs>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        }
                      </Route>

                      <Route exact path="/home/marketplace/recettes">
                        {
                          this.state.loading === false && this.state.firstLoading === false &&
                          <div className="container-fluid w-100">
                            <img alt="" src={magazine} style={{width: "100%"}}/>
                            <div className="mt-3">
                              <div className="row align-items-center, justify-content-around  ">
                                <div className="col-md-auto">

                                  <button style={{color: "black", borderColor: "#a6a6a6", width: "100%"}}
                                          className="btn btn-secondary dropdown-toggle bg-white" type="button"
                                          data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                    PLATS
                                  </button>
                                  <div className="dropdown-menu">
                                    <text className="dropdown-item"
                                          onClick={() => {}}>Petit déjeuner
                                    </text>
                                    <text className="dropdown-item" href="#">Entrées,</text>
                                    <text className="dropdown-item" href="#"
                                          onClick={() => {}}>Plats principal
                                    </text>
                                    <text className="dropdown-item" href="#"
                                          onClick={() => {}}>Desserts
                                    </text>
                                    <text className="dropdown-item" href="#">Apéritif dînatoire</text>
                                    <text className="dropdown-item" href="#">Snacks</text>
                                    <text className="dropdown-item" href="#">Soupes</text>
                                    <text className="dropdown-item" href="#">Sauces</text>
                                    <text className="dropdown-item" href="#">Shakes & Smoothie</text>

                                  </div>

                                </div>
                                <div className="col-md-auto">

                                  <button style={{color: "black", borderColor: "#a6a6a6", width: "100%"}}
                                          className="btn btn-secondary dropdown-toggle bg-white" type="button"
                                          data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                    TENDANCES
                                  </button>
                                  <div className="dropdown-menu">
                                    <text className="dropdown-item" href="#">Express</text>
                                    <text className="dropdown-item" href="#">Sans gluten</text>
                                    <text className="dropdown-item" href="#">Végétariennes</text>
                                    <text className="dropdown-item" href="#">Compatible phase Starter</text>
                                    <text className="dropdown-item" href="#">Sans Cuisson</text>


                                  </div>

                                </div>
                                <div className="col-md-auto">

                                  <button style={{color: "black", borderColor: "#a6a6a6", width: "100%"}}
                                          className="btn btn-secondary dropdown-toggle bg-white" type="button"
                                          data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                    PREPARATIONS
                                  </button>
                                  <div className="dropdown-menu">
                                    <text className="dropdown-item" href="#">max 10 MIN</text>
                                    <text className="dropdown-item" href="#">MAX 15 MIN</text>
                                    <text className="dropdown-item" href="#">MAX 45 MIN</text>
                                    <text className="dropdown-item" href="#">PLUS de 45 min</text>


                                  </div>

                                </div>
                                <div className="col-md-auto">

                                  <button style={{color: "black", borderColor: "#a6a6a6", width: "100%"}}
                                          className="btn btn-secondary dropdown-toggle bg-white" type="button"
                                          data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                    DIFFICULTE
                                  </button>
                                  <div className="dropdown-menu">
                                    <text className="dropdown-item" href="#">Facile</text>
                                    <text className="dropdown-item" href="#">Moyenne</text>
                                    <text className="dropdown-item" href="#">Difficile</text>


                                  </div>

                                </div>
                                <div className="col-md-auto">

                                  <button style={{color: "black", borderColor: "#a6a6a6", width: "100%"}}
                                          className="btn btn-secondary dropdown-toggle bg-white" type="button"
                                          data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                    RECETTES
                                  </button>
                                  <div className="dropdown-menu">
                                    <text className="dropdown-item" href="#">Top recettes</text>
                                    <text className="dropdown-item" href="#">Toutes les recettes</text>
                                    <text className="dropdown-item" href="#" onClick={() => {
                                      this.props.history.push('/newRecette')
                                    }}>
                                      Ajouter Recette
                                    </text>

                                  </div>

                                </div>
                                <div className="col-md-auto">

                                  <button style={{color: "black", borderColor: "#a6a6a6", width: "100%"}}
                                          className="btn btn-secondary dropdown-toggle bg-white" type="button"
                                          data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                    OCCASION
                                  </button>
                                  <div className="dropdown-menu">
                                    <text className="dropdown-item" href="#">Chandeleur</text>
                                    <text className="dropdown-item" href="#">Noël</text>
                                    <text className="dropdown-item" href="#">Saint Valentin</text>
                                    <text className="dropdown-item" href="#">Pàques</text>

                                  </div>

                                </div>
                                <div className="col-md-auto">

                                  <button style={{color: "black", borderColor: "#a6a6a6", width: "100%"}}
                                          className="btn btn-secondary dropdown-toggle bg-white" type="button"
                                          data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                    VIDEO
                                  </button>
                                  <div className="dropdown-menu">
                                    <text className="dropdown-item" href="#">Action</text>
                                    <text className="dropdown-item" href="#">Another action</text>
                                    <text className="dropdown-item" href="#">Something else here</text>

                                  </div>

                                </div>


                              </div>

                              <div className="mt-4">

                                <div className="row">
                                  {this.state.recettes.map((item, key) => (

                                      <div key={key} className="col-md-4 mt-3" style={{cursor: "pointer"}} >
                                        <div onClick={() => {
                                          recetteService.getRecettebyID(item.id_rec).then(res1=> {
                                            recetteService.getIngredientID(item.id_rec).then(res2=>{
                                              this.setState({selectedRecette:res1[0],selectedRecetteIngredients:res2})
                                              this.props.history.push("/home/marketplace/recettes/" + item.id_rec)
                                            })
                                          })
                                        }} className="card" style={{width: "80%", height: "100%"}}
                                        >
                                          <img alt="Card  cap" className="card-img-top" src={item.list_photo}
                                               style={{height: "50%"}}/>
                                          <div className="card-body">
                                            <h5 className="card-title">{item.list_nomRecette}</h5>
                                            <div className="row align-items-end">

                                              <div className="col-md-1">
                                                <img alt="" src={hourglass}/>

                                              </div>
                                              <div>
                                                <small>{item.list_Duree_prepa_repas.toString().toUpperCase()} </small>

                                              </div>
                                              <div className="col-md-1 ml-2">
                                                <img alt="" src={chef_hat}/>

                                              </div>
                                              <div>
                                                <small> Facile </small>

                                              </div>

                                            </div>

                                            <div>
                                              <ClampLines
                                                  text={""}
                                                  id="really-unique-id"
                                                  lines={3}
                                                  ellipsis="..."
                                                  buttons={false}
                                                  lessText="Collapse"
                                                  className="custom-class"
                                                  innerElement="p"
                                              />

                                            </div>
                                          </div>

                                          <div className="card-body">
                                            <text onClick={() => {
                                              this.props.history.push("/recette/" + item.id_rec)
                                            }} href="#" className="card-link"><u
                                                style={{color: "black"}}>Lire la suite</u></text>

                                          </div>
                                        </div>

                                      </div>

                                  ))}


                                </div>
                              </div>

                            </div>
                          </div>
                        }
                      </Route>

                      <Route exact path="/home/marketplace/recettes/:recette_id">
                        <RecetteDetail recette={this.state.selectedRecette} ingrediens={this.state.selectedRecetteIngredients}
                                       reloadGed={() => {this.justReloadGed()}}
                        />
                      </Route>



                    </Switch>

                  </div>
                </div>
              </div>
            </div>

          </div>


          <Drawer
            anchor="right"
            open={this.state.openRightMenu}
            onClose={() => {
              this.setState({ openRightMenu: false });
            }}
          >
            <div style={{ width: 340 }}>
              <div style={{ padding: '1.6rem 2rem' }}>
                <div className="rs_header">
                  <h2 className="rs_header_title">
                    {this.state.selectedDoc.name + '.pdf'}
                  </h2>
                  <span className="badge bg-soft-warning text-warning p-1">En attente</span>
                  <button
                    className="btn btn-rounded btn-light btn-small rs_btn_close"
                    onClick={() => this.setState({ openRightMenu: false })}
                  >
                    <i className="mdi mdi-close font-18 font-weight-bold" />
                  </button>
                </div>
                <div className="rs_doc_actions">
                  <IconButton
                    aria-label="Visualiser"
                    title="Visualiser"
                    color="primary"
                    onClick={() => {
                      this.setState({ loadDocSpinner: true });
                      SmartService.getFile(
                        this.state.selectedDoc.id || this.state.selectedDoc.file_id,
                        localStorage.getItem('token'),
                        localStorage.getItem('usrtoken')
                      )
                        .then((fileRes) => {
                          if (fileRes.succes === true && fileRes.status === 200) {
                            this.setState({ loadDocSpinner: false });
                            this.showDocInPdfModal(fileRes.data.Content.Data);
                          } else {
                            console.log(fileRes.error);
                          }
                        })
                        .catch((err) => console.log(err));
                    }}
                  >
                    <FindInPageOutlinedIcon />
                  </IconButton>
                  <IconButton
                    aria-label="Télécharger"
                    title="Télécharger"
                    color="default"
                    download={true}
                    target="_blank"
                  >
                    <CloudDownloadOutlinedIcon />
                  </IconButton>
                  <IconButton aria-label="Inviter" title="Inviter" color="primary">
                    <PersonAddOutlinedIcon />
                  </IconButton>
                  <IconButton
                    aria-label="Supprimer"
                    title="Supprimer"
                    color="secondary"
                  >
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
                      {this.state.selectedDoc.proprietary || "Moi"}
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
                      {moment(parseInt(this.state.selectedDoc.date)).format(
                        'DD MMMM YYYY, HH:mm'
                      )}
                    </div>
                  </div>
                </div>
                <h3 className="rs_signers_title">Signataires</h3>
                {this.state.loadDocSpinner === true && (
                  <div align="center" style={{ marginTop: 120 }}>
                    <CircularProgress color="secondary" />
                  </div>
                )}
              </div>
            </div>
          </Drawer>


          <Modal
            isOpen={this.state.showPDFModal}
            size="lg"
            zIndex={1500}
            toggle={() => this.setState({ showPDFModal: !this.state.showPDFModal })}
          >
            <ModalHeader
              toggle={() => this.setState({ showPDFModal: !this.state.showPDFModal })}
            >
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
                loader={<h5 style={{ color: '#fa5b35' }}>Chargement...</h5>}
                alert={
                  <h5 style={{ color: 'red' }}>
                    Une erreur s'est produite lors de chargement du doument !
                  </h5>
                }
              />
            </ModalBody>
          </Modal>


          <Modal
            isOpen={this.state.newFolderModal}
            size="md"
            centered={true}
            zIndex={1500}
            toggle={() =>
              this.setState({
                newFolderModal: !this.state.newFolderModal,
                newFolderFromRacine: false
              })
            }
          >
            <ModalHeader
              toggle={() =>
                this.setState({
                  newFolderModal: !this.state.newFolderModal,
                  newFolderFromRacine: false
                })
              }
            >
              Nouveau doossier
            </ModalHeader>
            <ModalBody>
              <div style={{ marginTop: 35 }}>
                <input
                  className="form-control"
                  placeholder="Nom du dossier"
                  onChange={(event) =>
                    this.setState({ newFolderName: event.target.value })
                  }
                />
              </div>
              <div style={{ marginTop: 15, textAlign: 'right' }}>
                <button
                  className="btn btn-success  font-weight-normal"
                  style={{ fontFamily: 'sans-serif' }}
                  onClick={() => {
                    SmartService.addFolder(
                      {
                        name: this.state.newFolderName,
                        folder_id: this.state.selectedFolderId === '' ? null : this.state.selectedFolderId
                      },
                      localStorage.getItem('token'),
                      localStorage.getItem('usrtoken')
                    )
                      .then((addfolderRes) => {
                        if (addfolderRes.succes === true && addfolderRes.status === 200) {
                          this.openSnackbar("success","Nouveau dossier ajouté avec succès")
                          this.reloadGed();
                          setTimeout(() => {
                            this.setState({
                              newFolderModal: false,
                              newFolderFromRacine: false
                            });
                          }, 500);
                        } else {
                          this.openSnackbar("error",addfolderRes.error)
                          console.log(addfolderRes.error);
                        }
                      })
                      .catch((err) => {
                        console.log(err);
                      });
                  }}
                >
                  Ajouter
                </button>
              </div>
            </ModalBody>{' '}
          </Modal>


          <Modal
            isOpen={this.state.showInviteModal}
            size="md"
            centered={true}
            zIndex={1500}
            toggle={() =>
              this.setState({ showInviteModal: !this.state.showInviteModal })
            }
          >
            <ModalHeader
              toggle={() =>
                this.setState({ showInviteModal: !this.state.showInviteModal })
              }
            >
              Ajouter des participants
            </ModalHeader>
            <ModalBody>
              <p
                style={{
                  fontFamily: 'sans-serif',
                  marginTop: 25
                }}
              >
                Partagez ces informations avec les personnes que vous souhaitez
                inviter à la réunion.
              </p>
              <p style={{ fontFamily: 'sans-serif', color: '#000' }}>
                {this.state.meeturl}
              </p>
              <div style={{ backgroundColor: '#d3d3d3', height: 1 }} />
              <div align="center" style={{ marginTop: 30 }}>
                <h5>Ou</h5>
              </div>
              <h4 className="text-success">
                <i className="fe-user-plus text-success" />
                &nbsp;Inviter
              </h4>
              <p style={{ fontFamily: 'sans-serif' }}>
                Tapez sur 'Entrée' pour valider une adresse mail
              </p>
              <ReactMultiEmail
                style={{
                  maxWidth: '100%',
                  width: '100%',
                  fontFamily: 'sans-serif',
                  fontWeight: 'normal'
                }}
                placeholder="Saisissez une adresse mail"
                emails={this.state.inviteEmails}
                onChange={(_emails) => {
                  this.setState({ inviteEmails: _emails });
                }}
                validateEmail={(email) => {
                  return isEmail(email);
                }}
                getLabel={(email, index, removeEmail = (index) => {
                }) => {
                  return (
                    <div data-tag="" key={index}>
                      {email}{' '}
                      <span data-tag-handle=""
                            onClick={() => removeEmail(index)}>×</span>
                    </div>
                  );
                }}
              />
              <div style={{ marginTop: 15, textAlign: 'right' }}>
                <button
                  className="btn btn-success  font-weight-normal"
                  style={{ fontFamily: 'sans-serif' }}
                  disabled={this.state.inviteEmails.length === 0}
                  onClick={() => {
                    maillingService
                      .sendCustomMailsWithUrl({
                        recipients: this.state.inviteEmails,
                        subject: 'Invitation pour rejoindre une réunion sur ged.smartdom.ch',

                        linkUrl: 'Cliquer ici pour réjoindre la réunion',
                        url: this.state.meeturl,

                        msg:
                          'Bonjour, <br> Vous etes invité à réjoindre une réunion sur ged.smartdom.ch . <br> Cliquer sur ce lien pour accéder directement.<br><br>',

                        footerMsg: '<br><br> Cordialement'
                      })
                      .then((ok) => {
                        this.openSnackbar(
                          'success',
                          'Les invitations sont bien envoyées au participants !'
                        );
                        this.setState({ showInviteModal: false });
                      })
                      .catch((err) => {
                        console.log(err);
                        this.openSnackbar('error', err);
                      });
                  }}
                >
                  Envoyer e-mail
                </button>
              </div>
            </ModalBody>{' '}
          </Modal>

          {/*Share folder Modal*/}
          <Dialog
            open={this.state.openShareDocModal}
            onClose={() => {
              this.setState({
                openShareDocModal: !this.state.openShareDocModal
              });
            }}
            aria-labelledby="form-dialog-title"
          >
            <DialogTitle
              id="form-dialog-title"
              style={{ marginLeft: -22, marginBottom: -10 }}
            >
              <IconButton aria-label="Partager" color="primary">
                <PersonAddIcon />
              </IconButton>
              Partager avec des personnes et des groupes
            </DialogTitle>
            <DialogContent>
              <div className="row">
                <div className="col-md-12">
                  <div style={{ marginLeft: 11 }}>
                    <Chips
                      chips={[]}
                      placeholder="Ajouter des personnes"
                      save={(data) => {
                        this.setState({ emailsDriveShare: data });
                      }}
                      pattern={data.emailPatern}
                      requiredMessage={'Email incorrect'}
                      required={true}
                      limit={20}
                      limitMessage="Vous avez atteint le nombre maximal d'e-mails"
                    />
                  </div>
                </div>
                <div className="col-md-12">
                  <h5>Droits d'accès</h5>
                  <Autocomplete
                    title={'Droits d\'accès'}
                    multiple
                    id="checkboxes-tags-demo"
                    options={data.Acces}
                    disableCloseOnSelect
                    getOptionLabel={(option) => option.label}
                    renderOption={(option, { selected }) => (
                      <React.Fragment>
                        <MuiCheckbox
                          icon={main_functions.icon}
                          checkedIcon={main_functions.checkedIcon}
                          style={{ marginRight: 8 }}
                          checked={selected}
                        />
                        {option.label}
                      </React.Fragment>
                    )}
                    style={{
                      width: 500,
                      marginLeft: 10,
                      borderColor: '#f0f0f0'
                    }}
                    renderInput={(params) => (
                      <TextField {...params} variant="outlined" placeholder="" />
                    )}
                    onChange={(event, values) => {
                      console.log(values)
                      this.setState({shareRights:values})
                    }}
                  />
                </div>
                <div className="col-md-12" style={{ marginTop: 20 }}>
                  <FormControlLabel
                    control={
                      <MuiCheckbox
                        checked={this.state.checkedNotif}
                        onChange={() =>
                          this.setState({
                            checkedNotif: !this.state.checkedNotif
                          })
                        }
                        name="checkedNotif"
                      />
                    }
                    label="Envoyer une notification"
                  />
                </div>
                {this.state.checkedNotif === true && (
                  <div className="col-md-12">
                    <TextField
                      id="msg-notif"
                      label="Message"
                      variant="filled"
                      value={this.state.msgNotif}
                      onChange={(event) =>
                        this.setState({ msgNotif: event.target.value })
                      }
                      multiline
                      rows={5}
                      style={{ width: 500, marginLeft: 8 }}
                    />
                  </div>
                )}
                <div className="col-md-12" style={{ marginTop: 15 }}>
                  <Chip
                    icon={
                      this.state.selectedFile  === '' ? (
                        <FolderIcon />
                      ) : (
                        <PictureAsPdfIcon
                          style={{ color: 'red', backgroundColor: '#fff' }}
                        />
                      )
                    }
                    label={
                      this.state.selectedFile === ''
                        ? this.state.selectedFoldername
                        : this.state.selectedFile.name + '.pdf'
                    }
                    style={{
                      fontWeight: 'bold',
                      backgroundColor: 'white',
                      border: '1px solid #c0c0c0'
                    }}
                  />
                </div>
              </div>
            </DialogContent>
            <DialogActions style={{ padding: 20 }}>
              <MuiButton
                onClick={() => {
                  this.setState({ openShareDocModal: false });
                }}
                color="primary"
                style={{ textTransform: 'capitalize' }}
              >
                Annuler
              </MuiButton>
              <MuiButton
                disabled={
                  (this.state.checkedNotif === true && this.state.msgNotif === '') ||
                  this.state.emailsDriveShare.length === 0 || this.state.shareRights.length === 0
                }
                onClick={() => {
                  this.setState({ loading: true, openShareDocModal: false });
                  let rights = this.state.shareRights || [];
                  SmartService.share(
                    this.state.selectedFile === ''
                      ? this.state.selectedFolderId
                      : this.state.selectedFile.id,
                    {
                      to: this.state.emailsDriveShare[0].email,
                      access: {
                        administrate: rights.find(x => x.value === "administrate") !== undefined ,
                        share: rights.find(x => x.value === "share") !== undefined,
                        edit:  rights.find(x => x.value === "edit") !== undefined,
                        read: rights.find(x => x.value === "read") !== undefined
                      }
                    },
                    localStorage.getItem('token'),
                    localStorage.getItem('usrtoken')
                  )
                    .then((share) => {
                      console.log(share)
                      if (share.succes === true && share.status === 200) {
                        this.setState({
                          loading: false,
                          openShareDocModal: false,
                          selectedFile:"",
                          shareRights:[],
                          emailsDriveShare:[],
                          checkedNotif:false
                        });
                        this.openSnackbar(
                          'success',
                          this.state.selectedFile === ''
                            ? 'Le partage du dossier est effectué avec succès, Un mail d\'invitation à été envoyé au personnes ajoutées'
                            : 'Le partage du fichier est effectué avec succès, Un mail d\'invitation à été envoyé au personnes ajoutées'
                        );
                      } else {
                        console.log(share.error);
                        this.setState({ loading: false });
                        this.openSnackbar('error', share.error);
                      }
                    })
                    .catch((err) => {
                      this.setState({ loading: false });
                      console.log(err);
                    });
                }}
                color="primary"
                variant="contained"
                style={{ textTransform: 'capitalize' }}
              >

                Envoyer
              </MuiButton>
            </DialogActions>
          </Dialog>


          <Dialog
            open={this.state.openNewRoomModal}
            onClose={() => {
              this.setState({ openNewRoomModal: !this.state.openNewRoomModal });
            }}
            aria-labelledby="form-dialog-title"
          >
            <DialogTitle disableTypography id="form-dialog-title">
              <Typography variant="h6">Créer Room</Typography>
              <IconButton
                aria-label="close"
                style={{
                  position: 'absolute',
                  right: 5,
                  top: 5,
                  color: '#c0c0c0'
                }}
                onClick={() => {
                  this.setState({
                    openNewRoomModal: !this.state.openNewRoomModal
                  });
                }}
              >
                <CloseIcon />
              </IconButton>
            </DialogTitle>
            <DialogContent>
              <div className="row">
                <div className="col-md-2">
                  <div style={{
                    backgroundColor: '#f0f0f0',
                    height: 48,
                    borderRadius: 5,
                    width: 60
                  }}
                  />
                </div>
                <div className="col-md-10">
                  <TextField
                    id="room-name"
                    label="Ajouter un titre"
                    variant="filled"
                    value={this.state.newRoomTitle}
                    onChange={(event) =>
                      this.setState({ newRoomTitle: event.target.value })
                    }
                    style={{ width: 408, marginLeft: -5 }}
                    size="small"
                  />
                </div>
                <div className="col-md-12" style={{ marginTop: 25 }}>
                  <div>
                    <Chips
                      chips={this.state.NewRoomEmails}
                      placeholder="Ajouter des personnes"
                      save={(data) => {
                        this.setState({ NewRoomEmails: data });
                      }}
                      pattern={data.emailPatern}
                      requiredMessage={'Email incorrect'}
                      required={true}
                      limit={20}
                      limitMessage="Vous avez atteint le nombre maximal d'e-mails"
                      onInputClick={(event) => {
                        this.setState({
                          anchorElContactsMenu: event.currentTarget
                        });
                      }}
                    />{' '}
                    <Menu
                      id="add-person-room--menu"
                      anchorEl={this.state.anchorElContactsMenu}
                      keepMounted
                      open={Boolean(this.state.anchorElContactsMenu)}
                      onClose={() => this.setState({ anchorElContactsMenu: null })}
                    >
                      {this.state.contacts
                        .filter((x) => x.role === 'avocat')
                        .map((contact, key) => (
                          <MenuItem
                            key={key}
                            onClick={() => {
                              let emails = this.state.NewRoomEmails;
                              emails.push({
                                email: contact.email,
                                valid: true,
                                key: parseInt(moment().format('DDMMYYYYHHmmss'))
                              });
                              this.setState({
                                anchorElContactsMenu: null,
                                NewRoomEmails: emails
                              });
                            }}
                          >
                            <ListItemIcon>
                              <Avatar src={contact.imageUrl} />
                            </ListItemIcon>{' '}
                            <Typography variant="inherit">
                              {contact.prenom + ' ' + contact.nom}
                            </Typography>
                          </MenuItem>
                        ))}
                    </Menu>
                  </div>
                </div>
                <div className="col-md-12" style={{ marginTop: 20 }}>
                  <FormControlLabel
                    control={
                      <MuiCheckbox
                        checked={this.state.newRoomCheck1}
                        onChange={() =>
                          this.setState({
                            newRoomCheck1: !this.state.newRoomCheck1
                          })
                        }
                        name="checkedNewRoom1"
                      />
                    }
                    label="Autoriser les personnes extérieures à votre organisation à rejoindre"
                  />
                </div>
                <div className="col-md-12">
                  <FormControlLabel
                    control={
                      <MuiCheckbox
                        checked={this.state.newRoomCheck2}
                        onChange={() =>
                          this.setState({
                            newRoomCheck2: !this.state.newRoomCheck2
                          })
                        }
                        name="checkedNewRoom2"
                      />
                    }
                    label="Notifier par e-mail"
                  />
                </div>
              </div>
            </DialogContent>
            <DialogActions style={{ padding: 20 }}>
              <MuiButton
                onClick={() => {
                  this.setState({ openNewRoomModal: false });
                }}
                color="primary"
                style={{ textTransform: 'capitalize' }}
              >
                Annuler
              </MuiButton>
              <MuiButton
                disabled={
                  this.state.newRoomTitle === '' ||
                  this.state.NewRoomEmails.length === 0
                }
                onClick={() => {
                  this.addNewRoom({
                    title: this.state.newRoomTitle,
                    members: this.state.NewRoomEmails,
                    created_at: new Date().getTime(),
                    created_by:localStorage.getItem("email")
                  });
                }}
                color="primary"
                variant="contained"
                style={{ textTransform: 'capitalize' }}
              >
                Créer
              </MuiButton>
            </DialogActions>
          </Dialog>


          <Dialog maxWidth="md"
                  open={this.state.openNewDocModal}
                  onClose={() => {
                    this.setState({ openNewDocModal: !this.state.openNewDocModal });
                  }}
                  aria-labelledby="form-dialog-title"
          >
            <DialogTitle disableTypography id="form-dialog-title">
              <IconButton
                aria-label="close"
                style={{
                  position: 'absolute',
                  right: 5,
                  top: 5,
                  color: '#c0c0c0'
                }}
                onClick={() => {
                  this.setState({
                    openNewDocModal: !this.state.openNewDocModal
                  });
                }}
              >
                <CloseIcon />
              </IconButton>
            </DialogTitle>
            <DialogContent>
              <div>
                <div align="center" className="mt-2">
                  <h1 className="skh1">
                    Télécharger un document
                  </h1>
                  <p
                    style={{ fontSize: '1rem' }}
                    className="mt-2"
                  >
                    Faites glisser et déposez un documents PDF
                    sur le terrain ou sélectionnez un fichier
                    depuis votre ordinateur.
                  </p>
                  <div className="sk_elupload_drag">
                    <FileUploader
                      onCancel={() => {
                      }}
                      onDrop={(acceptedFiles, rejectedFiles) => {
                        let calls = [];
                        for (let i = 0; i < acceptedFiles.length; i++) {
                          if(acceptedFiles[i].type === "application/pdf"){
                            let formData = new FormData();
                            formData.append('file', acceptedFiles[i]);
                            console.log(this.state.selectedFolderId)
                            this.state.selectedFolderId !== '' &&
                            formData.append(
                              'folder_id',
                              this.state.selectedFolderId
                            );
                            calls.push(axios.request({
                                method: 'POST', url: data.endpoint + '/ged/'+ged_id+'/doc/addfile',
                                data: formData,
                                headers: {
                                  'Content-Type': 'multipart/form-data',
                                  'token': localStorage.getItem('token'),
                                  'usrtoken': localStorage.getItem('usrtoken')
                                },
                                onUploadProgress: (p) => {
                                  this.setState({ progressUpload: (p.loaded / p.total) * 100 });
                                }
                              }).then( res => {})
                            );
                          }
                        }
                        Promise.all(calls).then( response => {
                          console.log(response)
                          this.setState({
                            openNewDocModal: false,
                            newFileFromRacine: false,
                            showNewDocScreen: false,
                            progressUpload: undefined
                          });
                          this.openSnackbar('success', calls.length === 1 ? calls.length + ' fichier est ajouté avec succès' : calls.length +" fichiers sont ajoutés avec succès");

                          this.reloadGed();
                        }).catch(err => {
                          console.log(err);
                        });
                      }}
                      progressAmount={this.state.progressUpload}
                      progressMessage={
                        this.state.progressUpload ? 'Téléchargement de ' + this.state.progressUpload.toFixed(2) + '% de 100%' : ''
                      }
                    />
                  </div>
                </div>
              </div>
            </DialogContent>

          </Dialog>


          <Dialog
            open={this.state.openAdvancedSearchModal}
            maxWidth="xl"
            onClose={() => {
              this.setState({
                openAdvancedSearchModal: !this.state.openAdvancedSearchModal
              });
            }}
            aria-labelledby="form-dialog-title"
          >

            <DialogTitle disableTypography id="form-dialog-title">
              <Typography variant="h6">Recherche avancée</Typography>
              <IconButton
                aria-label="close"
                style={{
                  position: 'absolute',
                  right: 5,
                  top: 5,
                  color: '#c0c0c0'
                }}
                onClick={() => {
                  this.setState({
                    openAdvancedSearchModal: !this.state.openAdvancedSearchModal
                  });
                }}
              >
                <CloseIcon />
              </IconButton>
            </DialogTitle>
            <DialogContent>
              <SearchClientsContainer
                societes={this.state.annuaire_clients_mondat}
                contacts={this.state.contacts}
                onSelectBtnClick={(client) => {
                  let obj = this.state.TimeSheet;
                  obj.newTime.client = client.ContactName;
                  let find_annuaire_fact_lead = this.state.annuaire_clients_mondat.find(
                    (x) => (x.Nom + ' ' + x.Prenom) === client.Nom + ' ' + client.Prenom
                  );
                  let partner_email = find_annuaire_fact_lead
                    ? find_annuaire_fact_lead.facturation
                      ? find_annuaire_fact_lead.facturation.collaborateur_lead
                      : ''
                    : '';

                  this.setState({
                    openAdvancedSearchModal: false,
                    partnerFacture: partner_email,
                    selectedClientTimeEntree: client.Nom + ' ' + client.Prenom,
                    TimeSheet: obj
                  });
                }}
              />
            </DialogContent>
          </Dialog>

          <Dialog
            maxWidth="xl"
            open={this.state.openNewClientModal}
            onClose={() => {
              this.setState({ openNewClientModal: !this.state.openNewClientModal });
            }}
            aria-labelledby="form-dialog-title"
          >
            <DialogTitle disableTypography id="form-dialog-title">
              <Typography variant="h6">Ajouter un nouveau client</Typography>
              <IconButton
                aria-label="close"
                style={{
                  position: 'absolute',
                  right: 5,
                  top: 5,
                  color: '#c0c0c0'
                }}
                onClick={() => {
                  this.setState({
                    openNewClientModal: !this.state.openNewClientModal
                  });
                }}
              >
                <CloseIcon />
              </IconButton>
            </DialogTitle>
            <DialogContent>
              <div className="row mt-3">
                <div className="col-md-6">
                  <p style={{ marginBottom: 10 }}>Type</p>
                  <select
                      style={{ minWidth: 300, height: 40 }}
                      className="form-control custom-select"
                      id="nomt"
                      name="nomt"
                      value={this.state.newClient.Type}
                      onChange={this.handleChange('newClient', 'Type')}>
                    <option value="0">Corporate</option>
                    <option value="1">Litige</option>
                  </select>
                </div>
                <div className="col-md-6">
                  <p style={{ marginBottom: 10 }}>Email</p>
                  <input
                      style={{ minWidth: 300, height: 40 }}
                      type="email"
                      className="form-control"
                      id="nome"
                      name="nome"
                      value={this.state.newClient.email}
                      onChange={this.handleChange('newClient', 'email')} />
                </div>
              </div>
              <div className="row mt-3">
                <div className="col-md-6">
                  <p style={{ marginBottom: 10 }}>Nom du client</p>
                  <input
                    style={{ minWidth: 300, height: 40 }}
                    type="text"
                    className="form-control"
                    id="nomc"
                    name="nomc"
                    value={this.state.newClient.nom}
                    onChange={this.handleChange('newClient', 'nom')} />
                </div>
                {
                  this.state.newClient.Type === "1" &&
                  <div className="col-md-6">
                    <p style={{ marginBottom: 10 }}>Prénom du client</p>
                    <input
                        style={{ minWidth: 300, height: 40 }}
                        type="text"
                        className="form-control"
                        id="nomc"
                        name="nomc"
                        value={this.state.newClient.prenom}
                        onChange={this.handleChange('newClient', 'prenom')} />
                  </div>
                }
              </div>
              <div className="row mt-3">
                <div className="col-md-6">
                  <p style={{ marginBottom: 10 }}>Téléphone</p>
                  <input
                    style={{ minWidth: 300, height: 40 }}
                    type="text"
                    className="form-control"
                    id="nomt"
                    name="nomt"
                    value={this.state.newClient.phone}
                    onChange={this.handleChange('newClient', 'phone')} />
                </div>
                <div className="col-md-6">
                  <p style={{ marginBottom: 10 }}>Adresse</p>
                  <input
                      style={{ minWidth: 300, height: 40 }}
                      type="text"
                      className="form-control"
                      id="nomt"
                      name="nomt"
                      value={this.state.newClient.adress}
                      onChange={this.handleChange('newClient', 'adress')} />
                </div>
              </div>
            </DialogContent>

            <DialogActions style={{ padding: 20 }}>
              <MuiButton
                onClick={() => {
                  this.setState({ openNewClientModal: false });
                }}
                color="primary"
                style={{ textTransform: 'capitalize' }}
              >
                Annuler
              </MuiButton>
              <MuiButton
                disabled={this.state.newClient.nom === '' || this.state.newClient.email === ''}
                onClick={() => {
                  this.addNewClient();
                }}
                color="primary"
                variant="contained"
                style={{ textTransform: 'capitalize' }}
              >
                Ajouter
              </MuiButton>
            </DialogActions>
          </Dialog>

          <Modal
              isOpen={this.state.showModalAdd}
              size={this.state.add === 'domaine' ? "lg" : "md"}
              centered={true}
              //zIndex={1500}
              toggle={() => this.setState({ showModalAdd: !this.state.showModalAdd })}
          >
            <ModalHeader
                toggle={() =>
                    this.setState({
                      showModalAdd: !this.state.showModalAdd
                    })
                }
            >
              {this.state.add === 'formation'
                  ? 'Ajouter une formation'
                  : this.state.add === 'fonction'
                      ? 'Ajouter une fonction'
                      : this.state.add === 'domaine'
                          ? 'Ajouter un domaine'
                          : this.state.add === 'affiliation'
                              ? 'Ajouter une affiliation'
                              : this.state.add === 'parcour'
                                  ? 'Ajouter un parcour'
                                  : this.state.add === 'langue'
                                      ? 'Ajouter une langue'
                                      : this.state.add === 'hobbies'
                                          ? 'Ajouter un centre d\'intérêt, loisir ou sport'
                                          : null}
            </ModalHeader>
            <ModalBody>
              <h5 style={{ marginBottom: 10 }}>
                {this.state.add === 'formation'
                    ? 'Formation'
                    : this.state.add === 'fonction'
                        ? 'Fonction'
                        : this.state.add === 'domaine'
                            ? 'Domaine'
                            : this.state.add === 'affiliation'
                                ? 'Affiliation'
                                : this.state.add === 'parcour'
                                    ? 'Parcour'
                                    : this.state.add === 'langue'
                                        ? 'Langue'
                                        : this.state.add === 'hobbies'
                                            ? 'Centre d\'intérêt'
                                            : null}
              </h5>
              {(this.state.add === 'formation' ||
                  this.state.add === 'fonction' ||
                  this.state.add === 'formation' ||
                  this.state.add === 'affiliation' ||
                  this.state.add === 'parcour' ||
                  this.state.add === 'langue' ||
                  this.state.add === 'hobbies') && (
                  <textarea
                      className="form-control"
                      id="inputText"
                      name="inputText"
                      style={{ width: 400 }}
                      value={
                        this.state.add === 'formation'
                            ? this.state.formationTmp
                            : this.state.add === 'fonction'
                            ? this.state.fonctionTmp
                            : this.state.add === 'affiliation'
                                ? this.state.affiliationTmp
                                : this.state.add === 'parcour'
                                    ? this.state.parcourTmp
                                    : this.state.add === 'langue'
                                        ? this.state.langueTmp
                                        : this.state.add === 'hobbies'
                                            ? this.state.hobbiesTmp
                                            : null
                      }
                      onChange={(event) =>
                          this.state.add === 'formation'
                              ? this.setState({ formationTmp: event.target.value })
                              : this.state.add === 'fonction'
                              ? this.setState({ fonctionTmp: event.target.value })
                              : this.state.add === 'affiliation'
                                  ? this.setState({ affiliationTmp: event.target.value })
                                  : this.state.add === 'parcour'
                                      ? this.setState({ parcourTmp: event.target.value })
                                      : this.state.add === 'langue'
                                          ? this.setState({ langueTmp: event.target.value })
                                          : this.state.add === 'hobbies'
                                              ? this.setState({ hobbiesTmp: event.target.value })
                                              : null
                      }
                  />
              )}
              {this.state.add === 'domaine' && (
                  <div >
                    <FormControl style={{ width: '100%' }}>
                      <select className="form-control custom-select" style={{width:300}}
                              value={this.state.domaine.domaine}
                              onChange={(e) => {
                                this.handleChangeDomaine(e);
                              }}
                      >
                        <option value="">Choisissez un domaine</option>
                        {
                          data.domaines.map((domaine,key) => (
                              <option key={key} value={domaine}>{domaine}</option>
                          ))
                        }
                      </select>
                    </FormControl>
                    <FormControl style={{ width: '100%' }}>
                      <h5 style={{marginTop:20}}>Les spécialités recherchées</h5>
                      <MuiSelect
                          labelId="demo-mutiple-chip-label"
                          id="demo-mutiple-chip"
                          multiple
                          value={this.state.domaine.specialite}
                          onChange={(e) => {
                            this.handleChangeSpecialite(e);
                          }}
                          input={<Input id="select-multiple-chip" />}
                          renderValue={(selected) => (
                              <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                                {selected.map((value) => (
                                    <Chip
                                        style={{ margin: '2%' }}
                                        key={value}
                                        label={value}
                                    />
                                ))}
                              </div>
                          )}
                      >
                        {this.state.domaine.domaine === 'COMPTABILITÉ' &&
                        data.comptabilite.map((name) => (
                            <MenuItem key={name} value={name}>
                              {name}
                            </MenuItem>
                        ))}
                        {this.state.domaine.domaine === 'SALAIRES' &&
                        data.salaire.map((name) => (
                            <MenuItem key={name} value={name}>
                              {name}
                            </MenuItem>
                        ))}
                        {this.state.domaine.domaine === 'IMPOTS' &&
                        data.impot.map((name) => (
                            <MenuItem key={name} value={name}>
                              {name}
                            </MenuItem>
                        ))}
                        {this.state.domaine.domaine === 'Droit' &&
                        data.domainesAct.map((name,key) => (
                            <MenuItem key={key} value={name}>
                              {name}
                            </MenuItem>
                        ))}
                      </MuiSelect>
                    </FormControl>
                  </div>
              )}
              <div className="text-center" style={{ marginTop: 10 }}>
                <button
                    type="button"
                    onClick={
                      this.state.add === 'formation'
                          ? this.addItem('formation')
                          : this.state.add === 'fonction'
                          ? this.addItem('fonction')
                          : this.state.add === 'domaine'
                              ? this.addItem('domaine')
                              : this.state.add === 'affiliation'
                                  ? this.addItem('affiliation')
                                  : this.state.add === 'parcour'
                                      ? this.addItem('parcour')
                                      : this.state.add === 'langue'
                                          ? this.addItem('langue')
                                          : this.state.add === 'hobbies'
                                              ? this.addItem('hobbies')
                                              : null
                    }
                    className="btn btn-success btn waves-effect mb-2 waves-light mt-1"
                >
                  Valider
                </button>
              </div>
            </ModalBody>
          </Modal>

          <Dialog
              maxWidth="xl"
              open={this.state.openAddContactModal}
              onClose={() => {
                this.setState({ openAddContactModal: !this.state.openAddContactModal });
              }}
              aria-labelledby="form-dialog-title"
          >
            <DialogTitle disableTypography id="form-dialog-title">
              <Typography variant="h6">Ajouter un nouveau membre</Typography>
              <IconButton
                  aria-label="close"
                  style={{
                    position: 'absolute',
                    right: 5,
                    top: 5,
                    color: '#c0c0c0'
                  }}
                  onClick={() => {
                    this.setState({
                      openAddContactModal: !this.state.openAddContactModal
                    });
                  }}
              >
                <CloseIcon />
              </IconButton>
            </DialogTitle>
            <DialogContent>
              <div className="row mt-3">
                <div className="col-md-6">
                  <p style={{ marginBottom: 10 }}>Nom</p>
                  <input
                      style={{ minWidth: 300, height: 40 }}
                      type="text"
                      className="form-control"
                      id="nomc"
                      name="nomc"
                      value={this.state.newContact.nom}
                      onChange={this.handleChange('newContact', 'nom')} />

                </div>
                <div className="col-md-6">
                  <p style={{ marginBottom: 10 }}>Prénom</p>
                  <input
                      style={{ minWidth: 300, height: 40 }}
                      type="email"
                      className="form-control"
                      id="nome"
                      name="nome"
                      value={this.state.newContact.prenom}
                      onChange={this.handleChange('newContact', 'prenom')} />
                </div>
              </div>
              <div className="row mt-3">
                <div className="col-md-6">
                  <p style={{ marginBottom: 10 }}>Email</p>
                  <input
                      style={{ minWidth: 300, height: 40 }}
                      type="email"
                      className="form-control"
                      id="nome"
                      name="nome"
                      value={this.state.newContact.email}
                      onChange={this.handleChange('newContact', 'email')} />
                </div>
                <div className="col-md-6">
                  <p style={{ marginBottom: 10 }}>Téléphone</p>
                  <input
                      style={{ minWidth: 300, height: 40 }}
                      type="text"
                      className="form-control"
                      id="nomt"
                      name="nomt"
                      value={this.state.newContact.phone}
                      onChange={this.handleChange('newContact', 'phone')} />

                </div>
              </div>
              <div className="row mt-3">
                <div className="col-md-6">
                  <p style={{ marginBottom: 10 }}>Titre</p>
                  <select
                      style={{ minWidth: 300, height: 40 }}
                      className="form-control custom-select"
                      id="nomt"
                      name="nomt"
                      value={this.state.newContact.type}
                      onChange={this.handleChange('newContact', 'type')}>
                    {
                      data.titres.map((titre, key) =>
                          <option key={key} value={titre.value} label={titre.label} />
                      )
                    }
                  </select>
                </div>
                <div className="col-md-6">
                  <p style={{ marginBottom: 10 }}>Taux horaire</p>
                  <input
                      style={{ minWidth: 300, height: 40 }}
                      type="text"
                      className="form-control"
                      id="nomt"
                      name="nomt"
                      value={this.state.newContact.rateFacturation}
                      onChange={this.handleChange('newContact', 'rateFacturation')} />
                </div>
              </div>
            </DialogContent>

            <DialogActions style={{ padding: 20 }}>
              <MuiButton
                  onClick={() => {
                    this.setState({ openAddContactModal: false });
                  }}
                  color="primary"
                  style={{ textTransform: 'capitalize' }}
              >
                Annuler
              </MuiButton>
              <MuiButton
                  disabled={this.state.newContact.nom.trim() === '' || this.state.newContact.prenom.trim() === '' || this.state.newContact.email === ''}
                  onClick={() => {
                    this.addNewContact()
                  }}
                  color="primary"
                  variant="contained"
                  style={{ textTransform: 'capitalize' }}
              >
                Créer
              </MuiButton>
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

          <Snackbar
            open={this.state.openUploadToast}
            onClose={this.closeUploadToastSnackbar}
          >
            <Alert
              elevation={6}
              variant="filled"
              onClose={this.closeUploadToastSnackbar}
              severity=""
            >
              {this.state.uploadToastMessage}
            </Alert>
          </Snackbar>

        </div>
      </div>
    );
  }
}