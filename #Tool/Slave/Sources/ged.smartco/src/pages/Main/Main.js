import React from 'react';
import firebase from 'firebase';
import 'firebase/database';
import SmartService from '../../provider/SmartService';
import moment from 'moment';
import FolderIcon from '@material-ui/icons/Folder';
import TopBar from '../../components/TopBar/TopBar';
import logo from '../../assets/images/logos/OALegalLogoV2.jpeg';
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
import defaultAvatar from '../../assets/images/users/default_avatar.jpg';
import { Modal, ModalBody, ModalHeader } from 'reactstrap';
import PDFViewer from '../../customComponents/pdf-viewer-reactjs';
import { isEmail, ReactMultiEmail } from 'react-multi-email';
import '../../assets/css/multiEmail.css';
import { Avatar, Button as MuiButton, Checkbox as MuiCheckbox, Chip, FormControl, Input, InputLabel, MenuItem, Select as MuiSelect } from '@material-ui/core';
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
import TablePatientsBrainy from '../../components/Tables/TablePatientsBrainy';

import { Tab, TabList, TabPanel, Tabs } from 'react-tabs';
import InputAdornment from '@material-ui/core/InputAdornment';
import countryList from '../../tools/countryList';
import 'react-tabs/style/react-tabs.css';
import TableSociete from '../../components/Tables/TableSociete';
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
import Mandats from './Mandats';
import GetAppIcon from '@material-ui/icons/GetApp';
import Badge from '@atlaskit/badge';
import {Button} from "@material-ui/core";
import {Switch as Sswitch}  from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core/styles';

const ged_id = "896ca0ed-8b4a-40fd-aeff-7ce26ee1bcf9";
const ent_name = "OaLegal";

const AntSwitch = withStyles((theme) => ({
  root: {
    width: 28,
    height: 16,
    padding: 0,
    display: 'flex',
  },
  switchBase: {
    padding: 2,
    color: theme.palette.grey[500],
    '&$checked': {
      transform: 'translateX(12px)',
      color: theme.palette.common.white,
      '& + $track': {
        opacity: 1,
        backgroundColor: theme.palette.primary.main,
        borderColor: theme.palette.primary.main,
      },
    },
  },
  thumb: {
    width: 12,
    height: 12,
    boxShadow: 'none',
  },
  track: {
    border: `1px solid ${theme.palette.grey[500]}`,
    borderRadius: 16 / 2,
    opacity: 1,
    backgroundColor: theme.palette.common.white,
  },
  checked: {},
}))(Sswitch);


export default class Main extends React.Component {

  imageUpload = {};
  folderupload = {};

  state = {
    loading: true,
    firstLoading: true,

    showCadeauModal2:false,
    showCadeauModal1:false,
    bouteilleToCampany:true,
    bouteilles:[],
    nbBouteille:0,
    clientCadeau:{
      nom:"",
      prenom:"",
      email:"",
      id:"",

    },

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

    showContainerSection: 'Drive',
    selectedDriveItem: [],
    expandedDriveItems: [],
    expandedDriveSharedItems:[],
    autoExpandParent: true,
    autoExpandSharedParent:true,
    selectedMeetMenuItem: ['new'],
    selectedSocietyMenuItem: ['clients_mondat'],
    selectedContactsMenuItem: ['aia'],
    selectedTimeSheetMenuItem: ['activities'],

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
    checkedNotif: false,
    msgNotif: '',
    emailsDriveShare: [],
    shareRights:[],

    focusedItem: 'Drive', // => Drive || Rooms || Meet || Contacts
    expandedRoomItems: ['0'],

    viewMode: 'list',

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
        client_id:'',
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
      Nom: '',
      Prenom:'',
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

    openAddContactModal:false
  };

  componentDidMount() {

    console.log("COMPONENT DID MOUNT")

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

              let client_folder = gedRes.data.Proprietary.Content.folders.find((x) => x.id === '4376a4bb-d5ec-441f-8868-f9ce96077420');
              let client_shared_folder = gedRes.data.Shared.Content.folders.find((x) => x.id === '4376a4bb-d5ec-441f-8868-f9ce96077420');
              if (client_folder) {
                localStorage.setItem('client_folder_id', "4376a4bb-d5ec-441f-8868-f9ce96077420");
                this.setState({client_folders:client_folder})
              }
              if (client_shared_folder) {
                localStorage.setItem('client_shared_folder_id', "4376a4bb-d5ec-441f-8868-f9ce96077420");
              }

              let meeturl = 'https://meet.smartdom.ch/oalegal_' + moment().format('DDMMYYYYHHmmss');
              let sharedFiles = gedRes.data.Shared.Content.files || [];

              this.setState({
                folders:main_functions.changeStructure(gedRes.data.Proprietary.Content.folders || []),
                reelFolders: gedRes.data.Proprietary.Content.folders || [],
                sharedReelFolders: gedRes.data.Shared.Content.folders || [],
                rootFiles: gedRes.data.Proprietary.Content.files || [],
                rootFolders: gedRes.data.Proprietary.Content.folders || [],
                sharedRootFiles: sharedFiles,
                sharedFolders: sharedFolders,
              })

              firebase.database().ref('/').on('value', (snapshot) => {

                  console.log("FIRST ENTER FIREBASE")
                  const data = snapshot.val() || [];
                  let contacts = data.contacts || [];
                  let rooms = (data.rooms || []).filter(x => x.ged_id === ged_id);
                  let societes = data.societes || [];
                  let annuaire_clients_mondat = data.annuaire_client_mondat.sort( (a,b) => {
                    let fname1 = a.Nom || '' + ' ' + a.Prenom || ''
                    let fname2 = b.Nom || '' + ' ' + b.Prenom || ''
                    if(fname1.toLowerCase().trim()  < fname2.toLowerCase().trim()) { return -1; }
                    if(fname1.toLowerCase().trim() > fname2.toLowerCase().trim()) { return 1; }
                    return 0;
                  }) || [] ;
                  let lignes_f = data[ent_name+"-lignes_f-"+ged_id] || [];

                  //let clients_tempo = (data[ent_name+"-clients_tempo-"+ged_id] || []).filter(x => x.email === localStorage.getItem("email"));
                  let clients_tempo = data[ent_name+"-clients_tempo-"+ged_id] || [];
                  let clients_tempo_copie = data[ent_name+"-clients_tempo-"+ged_id] || [];
                  let facturesToValidated = data[ent_name+"-factures_to_Validated-"+ged_id] || []
                  let facturesToValidatedCopy = data[ent_name+"-factures_to_Validated-"+ged_id] || []


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

                //new TimeSheet => séléction par défaut pour Utilisateur OA + horaire
                let connected_email = localStorage.getItem("email");
                let oa_contact = main_functions.getOAContactByEmail2(contacts,connected_email);
                if(oa_contact){
                  let ts = this.state.TimeSheet;
                  ts.newTime.utilisateurOA = connected_email;
                  ts.newTime.rateFacturation = oa_contact.rateFacturation || ""
                  this.setState({
                    TimeSheet:ts
                  })
                }
                //end
                  if (this.props.location.pathname.indexOf('/home/drive/') > -1) {
                    let folders = gedRes.data.Proprietary.Content.folders || [];
                    let folder_id = this.props.location.pathname.replace('/home/drive/', '');
                    let folder_name = main_functions.getFolderNameById(folder_id, folders);
                    if (folder_name !== undefined && folder_name !== null) {
                      this.setState({
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
                      selectedDriveItem: [],
                      expandedDriveItems: [],
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
                      selectedDriveItem: [],
                      expandedDriveItems: [],
                      selectedDriveSharedItem:['parent'],
                      expandedDriveSharedItems:['parent'],
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

                  } else if (this.props.location.pathname === '/home/cadeau_Entx') {
                    this.setState({
                      showContainerSection: 'Societe',
                      focusedItem: 'Societe',
                      selectedSocietyMenuItem: ['cadeau_Entx'],
                      openSocietyMenuItem: true,
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
                      meeturl: meeturl,
                      contacts: contacts,
                      societes: societes,
                      annuaire_clients_mondat: annuaire_clients_mondat,
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
  handleChangeBouteille(e,key){
    let bouteilles = this.state.bouteilles
    bouteilles[key].value=e.target.value
    this.setState({bouteilles:bouteilles})
  }
  openCadeauModal(societe,bouteilles){
    this.setState({
      showCadeauModal1:true
    })
  }
  openCadeauModal2(){
    let nbbouteilles = this.state.nbBouteille
    console.log(nbbouteilles)
    let bouteilles  = this.state.bouteilles
    let data = []

    for (let i=1 ;i<=parseInt(nbbouteilles);i++){
      data.push({
        name:"bouteille "+i,
        value:""
      })


    }


    this.setState({
      bouteilles:data,
      showCadeauModal2:true,
      showCadeauModal1:false
    })

  }
  envoyerCadeau(){
   let token = localStorage.getItem('token')
   let usrtoken= localStorage.getItem('usrtoken')
    let client = this.state.clientCadeau
    let data ={

      name:client.nom,
      surname:client.prenom,

    }
    if (this.state.bouteilleToCampany===true){
      data.company_id=client.id
    }else {
      data.email=client.email
    }
    this.state.bouteilles.map((item,key)=>{
      data.id=item.value
      SmartService.sendBouteilleCadeau(token,usrtoken,data).then((res)=>{
        console.log(res)
        if (res.status===200){
          this.openSnackbar("success",item.name+" ajouter avec sucess")
        }
      })

    })
    this.state.annuaire_clients_mondat.map((item,key)=>{
      if (item.ID===client.id){
        item.bouteilleOffertes=this.state.bouteilles.length
        firebase.database().ref('annuaire_client_mondat/' + key).set(item).then((res)=>{
          console.log(res)
        })
      }
    })


    this.setState({showCadeauModal2:false,
      showCadeauModal1:false,
      bouteilleToCampany:true,
      bouteilles:[],
      nbBouteille:0,
      clientCadeau:{
        nom:"",
        prenom:"",
        email:"",
        id:"",

      }})



  }


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

    return new Promise((resolve) => {
      console.log(key)
      if (children) {
        resolve();
        return;
      }
      let origin = this.state.sharedFolders;
      this.setState({loading:true})
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
            loading:false,
            selectedSharedFolderFolders:Res.data.Content.folders,
            selectedSharedFolderFiles:sub_files
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
    console.log(file)

    this.setState({ loading: true });

    SmartService.deleteFile(file.key || file.id, localStorage.getItem('token'), localStorage.getItem('usrtoken'))
      .then((deleteRes) => {
        if (deleteRes.succes === true && deleteRes.status === 200) {
          if (file.typeF === 'file' || file.type === 'pdf'){
            this.reloadGed()
          }
          else {

            let clients_tempo = this.state.clients_tempo;
            let findRacine_index = clients_tempo.findIndex(x => x.folder_id === file.key);
            if(findRacine_index > -1){
              let new_clients_tempo = clients_tempo.filter(x => x.folder_id !== file.key);
              firebase.database().ref("/" + ent_name + "-clients_tempo-" + ged_id + '/').set(new_clients_tempo).then( ok => {}).catch(err => console.log(err))
            }else{
              let find_sub_index = -1;
              let newFolders ;
              clients_tempo.map((cl,key) => {
                let folders = cl.folders || [];
                if(folders.findIndex(x => x.folder_id === file.key) > -1){
                  findRacine_index = key;
                  find_sub_index = folders.findIndex(x => x.folder_id === file.key);
                  newFolders = folders.filter(x => x.folder_id !== file.key);
                }
              })
              if(find_sub_index > -1){
                firebase.database().ref("/" + ent_name + "-clients_tempo-" + ged_id + '/' + findRacine_index + '/folders').set(newFolders).then(ok => {}).catch(err => console.log(err))
              }
            }
            this.setState({ selectedFolderId: '' });
            this.props.history.push('/home/drive');
            this.reloadGed();
          }
          this.openSnackbar('success', file.typeF === 'file' ? (file.name || file.title) + '.pdf est supprimé avec succès' : (file.name || file.title) + ' est supprimé avec succès');
        } else {
          this.setState({ loading: false });
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
    firebase.database().ref('contacts/' + key).set(
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
    firebase.database().ref('annuaire_client_mondat/' + key).set(
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

  showDocInPdfModal = (url,name,type) => {
    this.setState({
      openRightMenu: false,
      showPDFModal: true,
      pdfURL: url,
      pdfName:name + '.' + type
    });
  };

  uploadImage = (image) => {
    this.setState({ loading: true });
    let imgToUpload = image.target.files[0];
    var reader = new FileReader();
    reader.onloadend = () => {
      let selectedContact = this.state.selectedContact;
      selectedContact.imageUrl = reader.result;
      let key = main_functions.findContactByUid(this.state.selectedContact.uid, this.state.contacts);
      firebase.database().ref('contacts/' + key).set(
        this.state.selectedContact
      ).then(res => {
        this.setState({ loading: false });
        this.openSnackbar('success', 'Modification effectuée avec succès');
      });
    };
    reader.readAsDataURL(imgToUpload);

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

  reloadGed = () => {
    this.setState({ loading: true });
    setTimeout(() => {
      SmartService.getGed(localStorage.getItem('token'), localStorage.getItem('usrtoken')).then(gedRes => {
        if (gedRes.succes === true && gedRes.status === 200) {

          let client_folder = gedRes.data.Proprietary.Content.folders.find((x) => x.id === '4376a4bb-d5ec-441f-8868-f9ce96077420');
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

  addNewRoom = (room) => {
    this.setState({ loading: true, openNewRoomModal: false });
    SmartService.addRoom({ name: room.title, start: moment().add('hour', 1).unix() * 1000, duration: 30 },
      localStorage.getItem('token'), localStorage.getItem('usrtoken')).then(addRoomRes => {
      if (addRoomRes.status === 200 && addRoomRes.succes === true) {
        room.id = addRoomRes.data.id;
        let rooms = this.state.rooms;
        rooms.push(room);
        firebase.database().ref('/rooms').set(
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
        this.showDocInPdfModal(fileRes.data.Content.Data,fileRes.data.name,fileRes.data.type);
      } else {
        console.log(fileRes.error);
      }
    }).catch(err => {
      console.log(err)
      this.setState({ loading: false });
      this.openSnackbar("error","Une erreur est survenue lors de l'ouverture du fichier ")
    });
  };

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
                      ? this.props.history.push('/home/timeSheet/activities')
                      : this.props.history.push('/home/drive');
            this.setState({
              focusedItem: item,
              showContainerSection: item
            });
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
            this.props.history.push('/home/'+nodeId);
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
              selectedTimeSheetMenuItem: ['activities']
            });
            this.props.history.push('/home/timeSheet/activities');
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

  saveTimeSheet() {
    let email = localStorage.getItem('email');
    let timeSheet = this.state.TimeSheet;
    this.state.TimeSheetData.push(timeSheet);
    firebase.database().ref('/TimeSheet').set(this.state.TimeSheetData);
  }

  addFactureToValidated(client,client_folder,date,createdBy,partnerEmail,lignes_facture){
    this.setState({loading:true})

      let lf_to_validated = this.state.facturesToValidatedCopy;
      lf_to_validated.push({
        ID:Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15),
        date_facture:date,
        created_at:moment().format("YYYY-MM-DD HH:mm:ss"),
        created_by:createdBy,
        client:lignes_facture[0].newTime.client,
        client_id:lignes_facture[0].newTime.client_id,
        partner:partnerEmail,
        lignes_facture:lignes_facture,
        statut:"wait",
        client_folder:{
          id:"",
          name:client_folder
        }
      })

      firebase.database().ref("/"+ent_name+"-factures_to_Validated-"+ged_id).set(lf_to_validated).then( ok => {
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
                        firebase.database().ref("/"+ent_name+"-factures_to_Validated-"+ged_id + "/"+id_facture).update({
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
      firebase.database().ref('/'+ent_name+'-lignes_f-'+ged_id).set(lignes_factures);
    }, 300);

  }

  generateClientFolder(ID, team) {

    this.setState({ loading: true });

    let verif_access = false;

    if(localStorage.getItem("client_folder_id") || localStorage.getItem("client_shared_folder_id")  )
      verif_access = true;

    if(verif_access === true){

      let CLIENTS_folder_id = "4376a4bb-d5ec-441f-8868-f9ce96077420"  //c79fcab6-9fec-4714-9572-7e36eb6761b3 => Krana   //4376a4bb-d5ec-441f-8868-f9ce96077420 => Fabien

      let clients_tmp = this.state.clients_tempo;
      let clients_tmp_copie = this.state.clients_tempo_copie;
      let find = clients_tmp.find(x => x.ID_client === ID);

      if (find) {

        let findInCopyKey = clients_tmp_copie.findIndex(x => x.ID_client === find.ID_client);
        let findCopy = find;


        if(find.folder_id && find.folder_id !== ""){

          SmartService.addFolder({
            name: this.state.newClientFolder.nom,
            folder_id:find.folder_id
          },localStorage.getItem('token'), localStorage.getItem('usrtoken')).then(addFolderClient => {

            if(this.state.newClientFolder.type ===  "litige"){

              data.oa_litige_folders.map((item,key) => {
                SmartService.addFolder({
                  name: item,
                  folder_id: addFolderClient.data.id
                }, localStorage.getItem('token'), localStorage.getItem('usrtoken')).then(addFolderClientRes11 => {
                  console.log("OK"+key)
                }).catch(err => {
                  console.log(err);
                });
              })

            }
            if(this.state.newClientFolder.type === "corporate"){
              data.oa_corporate_folders.map((item,key) => {
                SmartService.addFolder({
                  name: item,
                  folder_id: addFolderClient.data.id
                }, localStorage.getItem('token'), localStorage.getItem('usrtoken')).then(addFolderClientRes11 => {
                  console.log("OK"+key)
                }).catch(err => {
                  console.log(err);
                });
              })
            }

            if(findCopy.folders && findCopy.folders.length > 0  ){
              findCopy.folders.push(
                {
                  folder_id:addFolderClient.data.id,
                  team:team,
                  name:this.state.newClientFolder.nom,
                  type:this.state.newClientFolder.type,
                  contrepartie:this.state.newClientFolder.contrepartie,
                  autrepartie:this.state.newClientFolder.autrepartie,
                  desc:this.state.newClientFolder.desc,
                  created_at:moment().format("YYYY-MM-DD HH:mm:ss"),
                  created_by:localStorage.getItem("email"),
                  facturation:{
                    byEmail:this.state.newClientFolder.byEmail,
                    sentBySecr:this.state.newClientFolder.sentBySecr,
                    sentByAvocat:this.state.newClientFolder.sentByAvocat,
                    language:this.state.newClientFolder.language,
                    frequence:this.state.newClientFolder.frequence
                  }
                }
              )
            }
            else{
              findCopy.folders = [{
                folder_id:addFolderClient.data.id,
                team:team,
                name:this.state.newClientFolder.nom,
                type:this.state.newClientFolder.type,
                contrepartie:this.state.newClientFolder.contrepartie,
                autrepartie:this.state.newClientFolder.autrepartie,
                desc:this.state.newClientFolder.desc,
                created_at:moment().format("YYYY-MM-DD HH:mm:ss"),
                created_by:localStorage.getItem("email"),
                facturation:{
                  byEmail:this.state.newClientFolder.byEmail,
                  sentBySecr:this.state.newClientFolder.sentBySecr,
                  sentByAvocat:this.state.newClientFolder.sentByAvocat,
                  language:this.state.newClientFolder.language,
                  frequence:this.state.newClientFolder.frequence
                }
              }]
            }

            firebase.database().ref('/'+ent_name+"-clients_tempo-"+ged_id+'/'+findInCopyKey).set(findCopy).then( ok => {
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

              if(this.state.newClientFolder.type ===  "litige"){

                data.oa_litige_folders.map((item,key) => {
                  SmartService.addFolder({
                    name: item,
                    folder_id: addFolderClient.data.id
                  }, localStorage.getItem('token'), localStorage.getItem('usrtoken')).then(addFolderClientRes11 => {
                    console.log("OK"+key)
                  }).catch(err => {
                    console.log(err);
                  });
                })

              }
              if(this.state.newClientFolder.type === "corporate"){
                data.oa_corporate_folders.map((item,key) => {
                  SmartService.addFolder({
                    name: item,
                    folder_id: addFolderClient.data.id
                  }, localStorage.getItem('token'), localStorage.getItem('usrtoken')).then(addFolderClientRes11 => {
                    console.log("OK"+key)
                  }).catch(err => {
                    console.log(err);
                  });
                })
              }

              findCopy.folder_id = addParentClientFolderRes.data.id;
              findCopy.folders = [
                {
                  folder_id:addFolderClient.data.id,
                  team:team,
                  name:this.state.newClientFolder.nom,
                  type:this.state.newClientFolder.type,
                  contrepartie:this.state.newClientFolder.contrepartie,
                  autrepartie:this.state.newClientFolder.autrepartie,
                  desc:this.state.newClientFolder.desc,
                  created_at:moment().format("YYYY-MM-DD HH:mm:ss"),
                  created_by:localStorage.getItem("email"),
                  facturation:{
                    byEmail:this.state.newClientFolder.byEmail,
                    sentBySecr:this.state.newClientFolder.sentBySecr,
                    sentByAvocat:this.state.newClientFolder.sentByAvocat,
                    language:this.state.newClientFolder.language,
                    frequence:this.state.newClientFolder.frequence
                  }
                }
              ];

              firebase.database().ref('/'+ent_name+"-clients_tempo-"+ged_id+'/'+findInCopyKey).set(findCopy).then( ok => {
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

          console.log(createClientRes)
          if (createClientRes.succes === true && createClientRes.status === 200) {

            SmartService.addFolder({
              name: this.state.selectedSociete.Nom + ' ' + (this.state.selectedSociete.Prenom || ''),
              folder_id: CLIENTS_folder_id
            }, localStorage.getItem('token'), localStorage.getItem('usrtoken')).then(addParentClientFolderRes => {
              console.log('OK');

              SmartService.addFolder({
                name: this.state.newClientFolder.nom,
                folder_id: addParentClientFolderRes.data.id,
              },localStorage.getItem('token'), localStorage.getItem('usrtoken')).then(addFolderClient => {


                if(this.state.newClientFolder.type ===  "litige"){

                  data.oa_litige_folders.map((item,key) => {
                    SmartService.addFolder({
                      name: item,
                      folder_id: addFolderClient.data.id
                    }, localStorage.getItem('token'), localStorage.getItem('usrtoken')).then(addFolderClientRes11 => {
                      console.log("OK"+key)
                    }).catch(err => {
                      console.log(err);
                    });
                  })

                }
                if(this.state.newClientFolder.type === "corporate"){
                  data.oa_corporate_folders.map((item,key) => {
                    SmartService.addFolder({
                      name: item,
                      folder_id: addFolderClient.data.id
                    }, localStorage.getItem('token'), localStorage.getItem('usrtoken')).then(addFolderClientRes11 => {
                      console.log("OK"+key)
                    }).catch(err => {
                      console.log(err);
                    });
                  })
                }

                clients_tmp_copie.push({
                  folder_id: addParentClientFolderRes.data.id,
                  ID_client: ID,
                  odoo_client_id: createClientRes.data.id,
                  folders:[
                    {
                      folder_id:addFolderClient.data.id,
                      team:team,
                      name:this.state.newClientFolder.nom,
                      type:this.state.newClientFolder.type,
                      contrepartie:this.state.newClientFolder.contrepartie,
                      autrepartie:this.state.newClientFolder.autrepartie,
                      desc:this.state.newClientFolder.desc,
                      created_at:moment().format("YYYY-MM-DD HH:mm:ss"),
                      created_by:localStorage.getItem("email"),
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
                firebase.database().ref('/'+ent_name+"-clients_tempo-"+ged_id).set(clients_tmp_copie).then( ok => {
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

          }else{
            this.setState({ loading: false });
            console.log(createClientRes.error)
            this.openSnackbar("error",createClientRes.error)
          }

        }).catch(err => {
          this.setState({ loading: false });
          console.log(err);
        });
      }

    }else{
      this.setState({ loading: false });
      alert("Vous n'avez pas les droits et l'accès au dossier CLIENTS pour effectuer cette opération !")
    }




  }

  addNewClient() {
    this.setState({ firstLoading: true, loading: true, openNewClientModal: false });
    let all_clients = this.state.annuaire_clients_mondat;
    let newClient = this.state.newClient;
    newClient.ID = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
    newClient.created_at = (new Date()).toDateString();
    all_clients.push(newClient);

    firebase.database().ref('/annuaire_client_mondat/' + (all_clients.length - 1)).set(newClient).then(ok => {
      this.openSnackbar('success', newClient.Nom + ' est ajouté avec succès ');
      this.props.history.push('/home/clients/' + newClient.ID);
      this.setState({
        firstLoading: false, loading: false,
        selectedSociete: newClient,
        selectedSocieteKey: newClient.ID
      });
      setTimeout(() => {
        this.setState({
          newClient: { ID: '', Nom: '', Prenom:'', Type: '0', created_at: '', country: '', email: '', phone: '', isActif: true }
        });
      }, 400);
    });
  }

  addNewContact(){
    this.setState({ firstLoading: true, loading: true, openAddContactModal: false });
    let all_contacts = this.state.contacts;
    let newContact = this.state.newContact;
    newContact.uid = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
    all_contacts.push(newContact);

    firebase.database().ref('/contacts/' + (all_contacts.length - 1)).set(newContact).then( ok => {
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
    this.setState({loading:true})
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
      this.setState({loading:false})
      this.openSnackbar('error', 'Le format de la durée est invalide !');
    }
    if ((typeof timeFormated) !== 'number' || isNaN(timeFormated)) {
      this.setState({loading:false})
      this.openSnackbar('error', 'Le format de la durée est invalide !');
    } else {
      if(timeFormated === 0 ){
        this.setState({loading:false})
        this.openSnackbar('error', 'La durée doit etre supérieur à 0 ');
      }else{

        /*obj.newTime.duree = timeFormated;*/
        let lignes_fact = this.state.lignesFactures || [];

        SmartService.create_company(localStorage.getItem('token'), localStorage.getItem('usrtoken'), { param: { name: obj.newTime.client } }).then(newCompRes => {
          if(newCompRes.succes === true && newCompRes.status === 200){

            this.setState({loading:false})
            lignes_fact.push({
              newTime: {
                company_id:newCompRes.data.id,
                date:moment(this.state.TimeSheet.newTime.date).format('YYYY-MM-DD HH:mm:ss'),
                duree: timeFormated,
                client: this.state.TimeSheet.newTime.client,
                client_id:this.state.selectedClientTimeEntree,
                dossier_client:this.state.TimeSheet.newTime.dossier_client,
                categoriesActivite: this.state.TimeSheet.newTime.categoriesActivite,
                description: this.state.TimeSheet.newTime.description,
                utilisateurOA: this.state.TimeSheet.newTime.utilisateurOA,
                rateFacturation: this.state.TimeSheet.newTime.rateFacturation,
                langue:''
              },
              uid:Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15),
              user_email:localStorage.getItem('email'),
              created_at:moment().format('YYYY-MM-DD HH:mm:ss')
            });

            if(duplicate === false){
              this.setState({
                lignesFactures: lignes_fact,
                selectedClientTimeEntree:'',
                TimeSheet: {
                  newTime: {
                    duree: '',
                    client: '',
                    client_id:'',
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
                    client_id:objCopy.newTime.client_id,
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
            this.setState({loading:false})
            this.openSnackbar("error",newCompRes.error);
            console.log(newCompRes.error)
          }
        }).catch(err => {
          this.setState({loading:false})
          console.log(err)
        })
      }
    }
  }

  updateLigneFacture(id,ligne){
    let lf_copy = this.state.lignesFacturesCopy;
    let key = lf_copy.findIndex(x => x.uid === id);
    console.log(key)
    if(key > -1){
      firebase.database().ref('/'+ent_name+'-lignes_f-'+ged_id+'/'+key).set(ligne).then( ok => {
        this.openSnackbar("success","Modification effectuée avec succès")
      }).catch(err => {
        console.log(err)
        this.openSnackbar("error","Une erreur est survenue !")
      })
    }else{
      this.openSnackbar("error","Une erreur est survenue !")
    }

  }

  updateAllLigneFacture(data) {
    firebase.database().ref('/' + ent_name + '-lignes_f-' + ged_id).set(data).catch(err => console.log(err));
  }
  updateAllFactures(data) {
    firebase.database().ref('/' + ent_name + '-factures_to_Validated-' + ged_id).set(data).catch(err => console.log(err));
  }


  update_client_tempo(key,data){
    firebase.database().ref("/" + ent_name + "-clients_tempo-" + ged_id + '/' + key).set(data).then( ok => {
      this.openSnackbar("success","Modification effectuée avec succès")
    }).catch(err => {
      console.log(err)
      this.openSnackbar("error","Une erreur est survenue !")
    })
  }

  update_client_tempo_all(data){
    firebase.database().ref("/" + ent_name + "-clients_tempo-" + ged_id).set(data).catch(err => console.log(err))
  }

  update_clients(data){
    firebase.database().ref("/annuaire_client_mondat").set(data).catch(err => console.log(err))
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
              logo={logo}
              height={70}
              onClickMenuIcon={() => this.setState({ openSideMenu: true })}
              onLogoutClick={() => {
                localStorage.clear();
                this.props.history.push('/login');
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
              logo={logo}
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

              <div style={{ flexWrap: 'wrap', flex: '1 1 auto' }}>
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
                                    this.showDocInPdfModal(fileRes.data.Content.Data,fileRes.data.name,fileRes.data.type);
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
                            addNewtask={(
                              title,
                              selectedClient,
                              assignedTo,
                              team,
                              selectedDateTime
                            ) => {
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
                                .ref('rooms/' + this.state.selectedRoomKey)
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
                                        'https://smartdom.ch:8035/rooms/' +
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
                            }}
                            onDeleteTask={(key) => {
                              const r = window.confirm(
                                'Voulez-vous vraiment supprimer cette tâche ?'
                              );
                              if (r === true) {
                                let room = this.state.selectedRoom;
                                let tasks = room.tasks;
                                tasks.splice(key, 1);
                                room.tasks = tasks;
                                firebase
                                  .database()
                                  .ref('rooms/' + this.state.selectedRoomKey)
                                  .set(room)
                                  .then((ok) => {
                                    this.setState({ selectedRoom: room });
                                  });
                              }
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
                                  let meeturl =
                                    'https://meet.smartdom.ch/oalegal_' +
                                    moment().format('DDMMYYYYHHmmss');
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
                                window.open(
                                  'https://meet.smartdom.ch/oalegal_' +
                                  this.state.meetCode,
                                  '_blank'
                                );
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
                              onAddBtnClick={() => {
                                this.setState({
                                  openAddContactModal:true
                                })
                              }}
                              onEditClick={(contact, key) => {
                                this.setState({
                                  selectedContact: contact,
                                  selectedContactKey: contact.uid
                                });
                                this.props.history.push('/home/contacts/' + contact.uid);
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
                                                  <option key={key} value={titre.value} label={titre.label} />
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
                                    </Tabs>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        }
                      </Route>

                      <Route exact path="/home/clients_mondat">
                        {
                          this.state.loading === false && this.state.firstLoading === false &&
                          <TableSociete
                            contacts={this.state.contacts || []}
                            societes={this.state.annuaire_clients_mondat || []}
                            clients_tempo={this.state.clients_tempo}
                            onEditClick={(societe, key) => {
                              this.setState({
                                selectedSociete: societe,
                                selectedSocieteKey: key
                              });
                              this.props.history.push('/home/clients/' + societe.ID);
                            }}
                            onFolderClick={(folder_id) => {
                              if (folder_id) {
                                this.setState({
                                  showContainerSection: 'Drive',
                                  focusedItem: 'Drive',
                                  selectedDriveItem: [folder_id],
                                  expandedDriveItems: [folder_id, localStorage.getItem('client_folder_id')],
                                  selectedFoldername: main_functions.getFolderNameById(folder_id, this.state.reelFolders),
                                  breadcrumbs: main_functions.getBreadcumpsPath(folder_id, this.state.reelFolders),
                                  selectedFolderId: folder_id,
                                  selectedFolderFiles: main_functions.getFolderFilesById(folder_id, this.state.reelFolders),
                                  selectedFolderFolders: main_functions.getFolderFoldersById(folder_id, this.state.reelFolders)
                                });
                              }
                            }}
                            onAddBtnClick={() => {
                              this.setState({ openNewClientModal: true });
                            }}
                            openSnackbar={(type,msg) => this.openSnackbar(type,msg)}
                            reloadGed={() => this.justReloadGed()}
                            update_client_tempo_all={(data) => this.update_client_tempo_all(data)}
                            update_clients={(data) => this.update_clients(data)}
                          />
                        }

                      </Route>

                      <Route exact path="/home/clients/:client_id">
                        {
                          this.state.loading === false && this.state.firstLoading === false &&
                          <div>
                            <div className="row">
                              <div className="col-lg-12">
                                <div className="card-box text-center">
                                  <img onClick={() => {}}
                                       src={this.state.selectedSociete.imageUrl ? this.state.selectedSociete.imageUrl : this.state.selectedSociete.Type === '0' ? entIcon : userAvatar}
                                       className="rounded-circle avatar-lg img-thumbnail"
                                       alt="" style={{ cursor: 'pointer', width: 120, height: 120, objectFit: 'cover' }}
                                  />
                                  <input style={{ visibility: 'hidden', width: 0, height: 0 }}
                                               type='file'
                                               accept='.png,.jpeg,.jpg'
                                               onChange={(files) => this.uploadImage(files)}
                                               ref={(ref) => this.imageUpload = ref}
                                />
                                  <h4
                                    className="mb-0">{this.state.selectedSociete.Nom + ' ' + (this.state.selectedSociete.Prenom || '')}</h4>
                                  <div style={{ display: 'contents' }}>
                                    <button type="button"
                                            onClick={this.saveSocietyChanges}
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
                                      <i className="fe-book-open" />&nbsp;&nbsp;Livre
                                    </button>
                                  </div>
                                  <div style={{ marginTop: 30 }}
                                       className="text-left">
                                    <Tabs> <TabList>
                                      <Tab>Informations client</Tab>
                                      <Tab>Ouverture dossier</Tab>
                                      <Tab>Dossiers ouverts</Tab>
                                    </TabList>
                                      <TabPanel>
                                        <h5 style={{ marginTop: 20 }}>Informations Client</h5>
                                        <div className="row" style={{ marginTop: 30 }}>
                                          <div className="col-md-6">
                                            <p style={{ marginBottom: 10 }}>Nom du client </p>
                                            <input
                                                type="text"
                                                className="form-control"
                                                id="email"
                                                name="email"
                                                value={this.state.selectedSociete.Nom}
                                                onChange={this.handleChange('selectedSociete', 'Nom')} />

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
                                        {
                                          this.state.selectedSociete.Type === "1" &&
                                          <div className="row" style={{ marginTop: 5 }}>
                                            <div className="col-md-6">
                                              <p style={{ marginBottom: 10 }}>Prénom du client </p>
                                              <input
                                                type="text"
                                                className="form-control"
                                                id="email"
                                                name="email"
                                                value={this.state.selectedSociete.Prenom}
                                                onChange={this.handleChange('selectedSociete', 'Prenom')} />
                                            </div>
                                          </div>
                                        }
                                        <div className="row" style={{ marginTop: 20 }}>
                                          <div className="col-md-6">
                                            <p style={{ marginBottom: 10 }}>Adresse postale</p>
                                            <textarea
                                              rows={5}
                                              className="form-control" style={{color:"#000"}}
                                              id="about"
                                              name="about"
                                              value={this.state.selectedSociete.adress}
                                              onChange={this.handleChange('selectedSociete', 'adress')} />
                                          </div>
                                          <div className="col-md-6">
                                            <p style={{ marginBottom: 10 }}>Adresse email</p>
                                            <input
                                              className="form-control"
                                              type="email"
                                              id="email"
                                              name="email"
                                              value={this.state.selectedSociete.email}
                                              onChange={this.handleChange('selectedSociete', 'email')} />
                                            <p style={{ marginBottom: 10,marginTop:10 }}>Téléphone</p>
                                            <input
                                              className="form-control"
                                              type="text"
                                              id="phone"
                                              name="phone"
                                              value={this.state.selectedSociete.phone}
                                              onChange={this.handleChange('selectedSociete', 'phone')} />
                                          </div>
                                          <div className="col-md-12" style={{marginTop:20}}>
                                            <p style={{ marginBottom: 10 }}>Remarques</p>
                                            <textarea
                                              rows={4}
                                              className="form-control" style={{color:"#000"}}
                                              id="about"
                                              name="about"
                                              value={this.state.selectedSociete.remarque}
                                              onChange={this.handleChange('selectedSociete', 'remarque')} />
                                          </div>
                                        </div>

                                      </TabPanel>
                                      <TabPanel>
                                        <h5 style={{ marginTop: 20 }}>Ouverture du dossier</h5>
                                        <div className="row mt-4">
                                          <div className="col-md-6">
                                            <div>
                                              Nom du dossier
                                            </div>
                                            <div>
                                              <input
                                                style={{ color: '#000' }}
                                                className="form-control"
                                                defaultValue={this.state.newClientFolder.nom}
                                                onChange={this.handleChange('newClientFolder', 'nom')}
                                              />
                                            </div>
                                          </div>
                                          <div className="col-md-6">
                                            <div>
                                              Type de dossier
                                            </div>
                                            <div>
                                              <select
                                                className="form-control custom-select"
                                                value={this.state.newClientFolder.type}
                                                onChange={this.handleChange('newClientFolder', 'type')}
                                              >
                                                {
                                                  Data.secteurs2.map((secteur, key) =>
                                                    <option
                                                      key={key}
                                                      value={secteur}>{secteur}</option>
                                                  )
                                                }
                                              </select>
                                            </div>
                                          </div>
                                          <div className="col-md-12" style={{marginTop:20}}>
                                            <div>
                                              Description du mandat
                                            </div>
                                            <div>
                                              <textarea
                                                style={{color: "#000"}}
                                                className="form-control"
                                                value={this.state.newClientFolder.desc}
                                                onChange={this.handleChange( "newClientFolder", "desc")}
                                                rows={5}
                                              />
                                            </div>
                                          </div>
                                        </div>
                                        <div className="row" style={{marginTop:20}}>
                                          <div className="col-md-6">
                                            <p style={{ marginBottom: 10 }}>Contrepartie</p>
                                            <input
                                              type="text"
                                              className="form-control"
                                              id="email"
                                              name="email"
                                              value={this.state.newClientFolder.contrepartie}
                                              onChange={this.handleChange('newClientFolder', 'contrepartie')} />
                                          </div>
                                          <div className="col-md-6">
                                            <p style={{ marginBottom: 10 }}>Autres parties</p>
                                            <input
                                              type="text"
                                              className="form-control"
                                              id="email"
                                              name="email"
                                              value={this.state.newClientFolder.autrepartie}
                                              onChange={this.handleChange('newClientFolder', 'autrepartie')} />
                                          </div>
                                        </div>
                                        <hr style={{
                                          width: '100%',
                                          height: 1,
                                          backgroundColor: '#c0c0c0',
                                          marginTop: 35,
                                          marginBottom: 30
                                        }} />
                                        <div>
                                          <h4>Facturation</h4>
                                          <div className="row mt-2">
                                            <div className="col-md-6" style={{minWidth:500}}>
                                              <div style={{ display: 'flex' }}>
                                                <div className="mt-2">Associés</div>
                                                <IconButton size="small" style={{ marginTop: -5, marginLeft: 3 }}
                                                            onClick={() => {
                                                              let objCp = this.state.newClientFolder;
                                                              objCp.team.push({
                                                                fname: '',
                                                                email: '',
                                                                uid: '',
                                                                tarif: '',
                                                                type: 'lead'
                                                              });
                                                              this.setState({ newClientFolder: objCp });
                                                            }}>
                                                  <AddCircleIcon color="primary" />
                                                </IconButton>
                                              </div>
                                              {
                                                this.state.newClientFolder.team.map((item, key) =>
                                                  item.type === "lead" &&
                                                  <div style={{
                                                    display: 'flex',
                                                    justifyContent: 'flex-start',
                                                    marginTop: 15
                                                  }}>
                                                    <div>
                                                      <div>
                                                        <MuiSelect
                                                          labelId="demo-simple-select-labOuverture dossierel"
                                                          id="demo-simple-select"
                                                          style={{ width: 230,marginTop:20 }}
                                                          onChange={(e) => {
                                                            let contact_email = e.target.value;
                                                            let contact = main_functions.getOAContactByEmail2(this.state.contacts,contact_email);
                                                            if (contact) {
                                                              let objCp = this.state.newClientFolder;
                                                              objCp.team[key].fname = contact.nom + ' ' + contact.prenom;
                                                              objCp.team[key].email = contact_email;
                                                              objCp.team[key].uid = contact.uid;
                                                              objCp.team[key].tarif = contact.rateFacturation || '';
                                                              this.setState({ newClientFolder: objCp });
                                                            }
                                                          }}
                                                          value={this.state.newClientFolder.team[key].email}
                                                        >
                                                          {this.state.contacts.filter(x => x.type === "associe" ).map((contact, key) => (
                                                            <MenuItem
                                                              key={key}
                                                              value={contact.email}>
                                                              <div style={{display:"flex"}}>
                                                                <Avatar style={{marginLeft:10}}
                                                                        alt=""
                                                                        src={contact.imageUrl} />
                                                                <div className="text-ellipsis-230" style={{marginTop:10,marginLeft:8}}>{contact.nom + ' ' + contact.prenom}</div>
                                                              </div>
                                                            </MenuItem>
                                                          ))}
                                                        </MuiSelect>
                                                      </div>
                                                    </div>
                                                    <div style={{ marginTop: this.state.newClientFolder.team[key].uid !== '' ? 12 : -7 }}>
                                                      <div style={{marginLeft:10}}>
                                                        Taux horaire
                                                      </div>
                                                      <Input
                                                        style={{ width: 210,marginLeft:10 }}
                                                        className="form-control "
                                                        id="duree35411"
                                                        name="duree687811"
                                                        type="text"
                                                        endAdornment={
                                                          <InputAdornment
                                                            position="end">CHF/h</InputAdornment>}
                                                        value={this.state.newClientFolder.team[key].tarif}
                                                        onChange={(e) => {
                                                          let objCp = this.state.newClientFolder;
                                                          objCp.team[key].tarif = e.target.value;
                                                          this.setState({ newClientFolder: objCp });
                                                        }}
                                                      />
                                                    </div>
                                                    <div>
                                                      <IconButton title="Supprimer cette ligne" style={{marginLeft:10,marginTop: this.state.newClientFolder.team[key].uid !== '' ? 28 : 8}}
                                                                  onClick={() => {
                                                                    let objCp = this.state.newClientFolder;
                                                                    objCp.team.splice(key,1)
                                                                    this.setState({ newClientFolder: objCp });
                                                                  }}
                                                      >
                                                        <DeleteOutlineIcon color="error"/>
                                                      </IconButton>
                                                    </div>
                                                  </div>
                                                )
                                              }
                                            </div>
                                            <div className="col-md-6" style={{minWidth:500}}>
                                              <div style={{ display: 'flex' }}>
                                                <div className="mt-2">Collaborateur/Stagiaire</div>
                                                <IconButton size="small" style={{ marginTop: -5, marginLeft: 3 }}
                                                            onClick={() => {
                                                              let objCp = this.state.newClientFolder;
                                                              objCp.team.push({
                                                                fname: '',
                                                                email: '',
                                                                uid: '',
                                                                tarif: '',
                                                                type: 'team'
                                                              });
                                                              this.setState({ newClientFolder: objCp });
                                                            }}>
                                                  <AddCircleIcon color="primary" />
                                                </IconButton>
                                              </div>
                                              {
                                                this.state.newClientFolder.team.map((item, key) =>
                                                  item.type === "team" &&
                                                  <div style={{
                                                    display: 'flex',
                                                    justifyContent: 'flex-start',
                                                    marginTop: 15
                                                  }}>
                                                    <div>
                                                      <div>
                                                        <MuiSelect
                                                          labelId="demo-simple-select-label"
                                                          id="demo-simple-select"
                                                          style={{ width: 230 ,marginTop:20}}
                                                          onChange={(e) => {
                                                            let contact_email = e.target.value;
                                                            let contact = main_functions.getOAContactByEmail2(this.state.contacts,contact_email);
                                                            if (contact) {
                                                              let objCp = this.state.newClientFolder;
                                                              objCp.team[key].fname = contact.nom + ' ' + contact.prenom;
                                                              objCp.team[key].email = contact_email;
                                                              objCp.team[key].uid = contact.uid;
                                                              objCp.team[key].tarif = contact.rateFacturation || '';
                                                              this.setState({ newClientFolder: objCp });
                                                            }
                                                          }}
                                                          value={this.state.newClientFolder.team[key].email}
                                                        >
                                                          {this.state.contacts.filter(x => !x.type ).map((contact, key) => (
                                                            <MenuItem
                                                              key={key}
                                                              value={contact.email}>
                                                              <div style={{display:"flex"}}>
                                                                <Avatar style={{marginLeft:10}}
                                                                        alt=""
                                                                        src={contact.imageUrl} />
                                                                <div className="text-ellipsis-230" style={{marginTop:10,marginLeft:8}}>{contact.nom + ' ' + contact.prenom}</div>
                                                              </div>
                                                            </MenuItem>
                                                          ))}
                                                        </MuiSelect>
                                                      </div>
                                                    </div>
                                                    <div style={{ marginTop: this.state.newClientFolder.team[key].uid !== '' ? 12 : -7 }}>
                                                      <div style={{marginLeft:10}}>
                                                        Taux horaire
                                                      </div>
                                                      <Input
                                                        className="form-control "
                                                        id="duree35411"
                                                        style={{ width: 210,marginLeft:10 }}
                                                        name="duree687811"
                                                        type="text"
                                                        endAdornment={
                                                          <InputAdornment
                                                            position="end">CHF/h</InputAdornment>}
                                                        value={this.state.newClientFolder.team[key].tarif}
                                                        onChange={(e) => {
                                                          let objCp = this.state.newClientFolder;
                                                          objCp.team[key].tarif = e.target.value;
                                                          this.setState({ newClientFolder: objCp });
                                                        }}
                                                      />
                                                    </div>
                                                    <div>
                                                      <IconButton title="Supprimer cette ligne" style={{marginLeft:10,marginTop: this.state.newClientFolder.team[key].uid !== '' ? 28 : 8}}
                                                                  onClick={() => {
                                                                    let objCp = this.state.newClientFolder;
                                                                    objCp.team.splice(key,1)
                                                                    this.setState({ newClientFolder: objCp });
                                                                  }}
                                                      >
                                                        <DeleteOutlineIcon color="error"/>
                                                      </IconButton>
                                                    </div>
                                                  </div>
                                                )
                                              }
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
                                                  <div>Par Email</div>
                                                </div>
                                                <div
                                                  className="col-md-8">
                                                  <CB color="primary"
                                                      checked={this.state.newClientFolder.byEmail}
                                                      onChange={(e) => {
                                                        let obj = this.state.newClientFolder;
                                                        obj.byEmail = e.target.checked
                                                        this.setState({newClientFolder:obj})
                                                        //this.handleChange("newClientFolder",e.target.checked)
                                                      }}
                                                  />
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
                                                    style={{ width: '100%' }}
                                                    value={this.state.newClientFolder.frequence}
                                                    onChange={(e) => {
                                                      let obj = this.state.newClientFolder;
                                                      obj.frequence = e.target.value
                                                      this.setState({newClientFolder:obj})
                                                    }}
                                                  >
                                                    <MenuItem
                                                      value={'Mensuelle'}>Mensuelle</MenuItem>
                                                    <MenuItem
                                                      value={'Trimestrielle'}>Trimestrielle</MenuItem>
                                                    <MenuItem
                                                      value={'Semestrielle'}>Semestrielle</MenuItem>
                                                    <MenuItem
                                                      value={'Annuelle'}>Annuelle</MenuItem>
                                                  </MuiSelect>
                                                </div>
                                              </div>
                                            </div>
                                            <div className="col-md-4">
                                              <div
                                                className="row justify-content-center align-items-center">
                                                <div
                                                  className="col-md-6">
                                                  <div>Envoyé par le secrétariat
                                                  </div>
                                                </div>
                                                <div
                                                  className="col-md-6">
                                                  <CB color="primary"
                                                      checked={this.state.newClientFolder.sentBySecr}
                                                      onChange={(e) => {
                                                        let obj = this.state.newClientFolder;
                                                        obj.sentBySecr = e.target.checked
                                                        this.setState({newClientFolder:obj})
                                                      }} />
                                                </div>
                                              </div>
                                              <div
                                                className="row justify-content-center align-items-center">
                                                <div
                                                  className="col-md-6">
                                                  <div>Envoyé par l’avocat
                                                  </div>
                                                </div>
                                                <div
                                                  className="col-md-6">
                                                  <CB color="primary"
                                                      checked={this.state.newClientFolder.sentByAvocat}
                                                      onChange={(e) => {
                                                        let obj = this.state.newClientFolder;
                                                        obj.sentByAvocat = e.target.checked
                                                        this.setState({newClientFolder:obj})
                                                      }} />
                                                </div>
                                              </div>
                                              <div
                                                className="row justify-content-center align-items-center">
                                                <div
                                                  className="col-md-6">
                                                  <div>Langue de Facturation
                                                  </div>
                                                </div>
                                                <div
                                                  className="col-md-6">
                                                  <MuiSelect
                                                    labelId="demo-simple-select-label"
                                                    id="demo-simple-select"
                                                    style={{ width: '100%' }}
                                                    value={this.state.newClientFolder.language}
                                                    onChange={(e) => {
                                                      let obj = this.state.newClientFolder;
                                                      obj.language = e.target.value
                                                      this.setState({newClientFolder:obj})
                                                    }}
                                                  >
                                                    <MenuItem
                                                      value={'Francais'}>Français</MenuItem>
                                                    <MenuItem
                                                      value={'Anglais'}>Anglais</MenuItem>
                                                  </MuiSelect>
                                                </div>
                                              </div>
                                            </div>
                                          </div>

                                        </div>

                                        <div style={{
                                          margintop: 10,
                                          textAlign: 'right'
                                        }}>
                                          <button
                                            type="button"
                                            disabled={this.state.newClientFolder.nom === ''}
                                            onClick={() => {
                                              let contact = main_functions.getOAContactByEmail2(this.state.contacts,this.state.lead_contact_tmp);
                                              let objCp = this.state.newClientFolder;
                                              if(contact){
                                                objCp.team.push({
                                                  fname: contact.nom + ' ' + contact.prenom,
                                                  email: this.state.lead_contact_tmp,
                                                  uid: contact.uid,
                                                  tarif: this.state.lead_contact_horaire_tmp,
                                                  type: 'lead'
                                                });
                                              }
                                              this.generateClientFolder(this.state.selectedSociete.ID, objCp.team);
                                            }}
                                            className="btn btn-blue waves-effect mb-2 waves-light m-1">
                                            <i className="fe-folder-plus" />&nbsp;&nbsp;Créer Dossier Client
                                          </button>
                                        </div>
                                      </TabPanel>
                                      <TabPanel>
                                        <h5 style={{ marginTop: 20 }}>Dossiers ouverts</h5>
                                        <Mandats selectedClient={this.state.selectedSociete} clients_tempo={this.state.clients_tempo} clients_tempo_copie={this.state.clients_tempo_copie}
                                                 contacts={this.state.contacts}
                                                 onFolderClick={(folder_id,parentClientFolder) => {
                                                   let ged = this.state.reelFolders;
                                                   let CLIENT_folder = ged.find(x => x.id ===  "4376a4bb-d5ec-441f-8868-f9ce96077420")
                                                   if(CLIENT_folder){
                                                     this.setState({
                                                       showContainerSection: 'Drive',
                                                       focusedItem: 'Drive',
                                                       selectedDriveItem: [folder_id],
                                                       expandedDriveItems: [folder_id, parentClientFolder, localStorage.getItem('client_folder_id')],
                                                       selectedFoldername: main_functions.getFolderNameById(folder_id, this.state.reelFolders),
                                                       breadcrumbs: main_functions.getBreadcumpsPath(folder_id, this.state.reelFolders),
                                                       selectedFolderId: folder_id,
                                                       selectedFolderFiles: main_functions.getFolderFilesById(folder_id, this.state.reelFolders),
                                                       selectedFolderFolders: main_functions.getFolderFoldersById(folder_id, this.state.reelFolders)
                                                     });
                                                     this.props.history.push("/home/drive/" + folder_id )
                                                   }else{

                                                     this.setState({
                                                       showContainerSection: 'Drive',
                                                       focusedItem: 'Drive',
                                                       selectedDriveItem: [],
                                                       expandedDriveItems: [],
                                                       selectedDriveSharedItem:['4376a4bb-d5ec-441f-8868-f9ce96077420'],
                                                       expandedDriveSharedItems:['parent','CLIENTS'],
                                                       breadcrumbs: 'Mon drive / Partagés avec moi',
                                                     });
                                                     this.props.history.push("/home/shared/" + "4376a4bb-d5ec-441f-8868-f9ce96077420" )
                                                   }
                                                 }}
                                                 update_client_tempo={(key,data) => {
                                                   this.update_client_tempo(key,data)
                                                 }}
                                                 reloadGed={() => this.justReloadGed()}
                                                 openSnackbar={(type,msg) => this.openSnackbar(type,msg)}
                                        />
                                      </TabPanel>
                                    </Tabs>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        }
                      </Route>

                      <Route exact path="/home/cadeau_Entx">
                        {
                          this.state.loading === false && this.state.firstLoading === false &&
                          <TablePatientsBrainy
                              patients={this.state.annuaire_clients_mondat || []}


                              openModal={()=>{
                              this.openCadeauModal("ss","ss")}
                              }
                              onDelecteClick={(societe,key)=>{
                                this.deletepatient(societe.id_user)
                              }}
                          />
                        }
                        <Modal
                            isOpen={this.state.showCadeauModal2}
                            size="md"
                            centered={true}
                            zIndex={1500}
                            toggle={() =>
                                this.setState({ showCadeauModal2: false })
                            }
                        >
                          <ModalHeader
                              toggle={() =>
                                  this.setState({ showCadeauModal2: false })
                              }
                          >
                            Envoyer des cadeaux
                          </ModalHeader>
                          <ModalBody>
                            <div className="row justify-content-around">
                            {
                              this.state.bouteilles.map((item,key)=>(
                                  <div className="col-md-5 mt-2">
                                    <TextField value={item.value}     inputProps={{ maxLength: 4 }}
                                             onChange={(e)=>{this.handleChangeBouteille(e,key)}}      id="outlined-basic" label={item.name} variant="outlined"  />

                                  </div>
                              ))


                            }

                            <div className="text-center mt-3 col-md-12">
                              <Button>
                                <Button onClick={()=>{this.envoyerCadeau()}} variant="contained" color="primary">
                                  Envoyer Cadeaux
                                </Button>
                              </Button>

                            </div>






                            </div>

                          </ModalBody>
                        </Modal>
                        <Modal
                            isOpen={this.state.showCadeauModal1}
                            size="lg"
                            centered={true}
                            zIndex={1500}
                            toggle={() =>
                                this.setState({ showCadeauModal1: !this.state.showCadeauModal1 })
                            }
                        >
                          <ModalHeader
                              toggle={() =>
                                  this.setState({ showCadeauModal1: !this.state.showCadeauModal1 })
                              }
                          >
                            Envoyer des Bouteille
                          </ModalHeader>
                          <ModalBody>
                            <div className="row justify-content-around align-items-center">
                              <div className="col-md-4">

                                {this.state.bouteilleToCampany===true?
                                <div>
                                <h5>
                                  Campany
                                </h5>

                                <SelectSearch
                                    options={
                                      this.state.annuaire_clients_mondat.map(({ Nom, Prenom, Type, imageUrl, ID }) =>
                                          ({
                                            value: ID,
                                            name: Nom + ' ' + (Prenom || ''),
                                            ContactType: Type,
                                            ContactName: Nom + ' ' + (Prenom || ''),
                                            imageUrl: imageUrl
                                          }))
                                    }
                                    value={this.state.clientCadeau.id}
                                    renderOption={main_functions.renderSearchOption}
                                    search
                                    placeholder="Chercher votre client"
                                    onChange={ (e) => {

                                      let findClient = this.state.annuaire_clients_mondat.find(x => x.ID === e)
                                      let data = this.state.clientCadeau
                                      data.email=findClient.email
                                      data.nom = findClient.Nom
                                      data.prenom = findClient.Prenom
                                      data.id = findClient.ID
                                      this.setState({clientCadeau:data})



                                    }}
                                />
                                  </div>:
                                    <div>
                                      <TextField id="outlined-basic" label="Email" value={this.state.clientCadeau.email}  onChange={(e)=>{
                                        let data = this.state.clientCadeau
                                        data.email=e.target.value
                                        this.setState({clientCadeau:data})
                                      }} variant="outlined" />

                                    </div>
                                }




                              </div>
                              <div className="col-md-4">
                                <Typography component="div">
                                  <Grid component="label" container alignItems="center" spacing={1}>
                                    <Grid item>Email</Grid>
                                    <Grid item>
                                      <AntSwitch   checked={this.state.bouteilleToCampany} name="checkedC" onChange={(e)=>{this.setState({bouteilleToCampany:e.target.checked})}} />
                                    </Grid>
                                    <Grid item>Campany</Grid>
                                  </Grid>
                                </Typography>
                              </div>


                            </div>

                            <div className="row justify-content-around align-items-center mt-2">
                              <div className="col-md-4">
                                <TextField id="outlined-basic" value={this.state.clientCadeau.prenom} onChange={(e)=>{
                                  let data = this.state.clientCadeau
                                  data.prenom=e.target.value
                                  this.setState({clientCadeau:data})
                                }} label="Prenom" variant="outlined" />

                              </div>
                              <div className="col-md-4">
                                <TextField id="outlined-basic" value={this.state.clientCadeau.nom}  onChange={(e)=>{
                                  let data = this.state.clientCadeau
                                  data.nom=e.target.value
                                  this.setState({clientCadeau:data})
                                }}   label="Nom" variant="outlined" />

                              </div>

                            </div>

                            <div className="row justify-content-around align-items-center mt-2">
                              <div className="col-md-4">
                                <TextField id="outlined-basic" type="number" onChange={(e)=>{this.setState({nbBouteille:e.target.value})}} label="Nombre bouteille" variant="outlined" />

                              </div>
                              <div className="col-md-4 text-center">
                                <Button onClick={()=>{this.openCadeauModal2()}} variant="contained" color="secondary">
                                  suivant
                                </Button>
                              </div>

                            </div>


                          </ModalBody>
                        </Modal>

                      </Route>

                      <Route exact path="/home/timeSheet/activities">
                        {
                          this.state.loading === false && this.state.firstLoading === false &&
                          <div>
                            <div className="row">
                              <div className="col-lg-12">
                                <h5 className="mt-0 mb-1">TimeSheet / Activités</h5>
                                <div className="card-box text-center" style={{ marginTop: 1 }}>
                                  <div style={{ marginTop: 30 }} className="text-left">
                                    <Tabs selectedIndex={this.state.selectedTimeSheetIndex} onSelect={index => {
                                      this.setState({selectedTimeSheetIndex:index})
                                    }}>
                                      <TabList>
                                        <Tab>Time Sheet</Tab>
                                        <Tab>Activités </Tab>
                                        <Tab>
                                          Partner
                                          {
                                            this.state.facturesToValidated.filter(x => x.statut === "wait" && x.partner === localStorage.getItem("email")).length > 0 &&
                                            <Badge max={100}>{this.state.facturesToValidated.filter(x => x.statut === "wait" && x.partner === localStorage.getItem("email")).length}</Badge>
                                          }
                                        </Tab>
                                      </TabList>
                                      <TabPanel>
                                        {
                                          this.state.showLignesFactureClient === false ?
                                            <div style={{marginTop:25,padding:10,paddingBottom:50,paddingLeft:20,border:"2px solid #f0f0f0"}}>
                                              <div className="row mt-2">
                                                <div className="col-md-6">
                                                  <h5>Durée</h5>
                                                  <div className="row">
                                                    <div className="col-md-5">
                                                      <Autosuggest
                                                        suggestions={this.state.timeSuggestions}
                                                        onSuggestionsFetchRequested={this.onTimeSuggestionsFetchRequested}
                                                        onSuggestionsClearRequested={this.onTimeSuggestionsClearRequested}
                                                        onSuggestionSelected={(event, { suggestion }) => console.log(suggestion)}
                                                        getSuggestionValue={suggestion => suggestion}
                                                        renderSuggestion={suggestion => (
                                                          <div>{suggestion}</div>)}
                                                        inputProps={inputSuggProps}
                                                      />
                                                    </div>
                                                    <div className="col-md-7">
                                                      <div style={{ display: 'flex' }}>
                                                        <Timer
                                                          initialTime={0}
                                                          startImmediately={false}
                                                        >
                                                          {({ start, resume, pause, stop, reset, getTimerState, getTime }) => (
                                                            <React.Fragment>
                                                              <div
                                                                align="center"
                                                                style={{
                                                                  backgroundColor: '#c0c0c0',
                                                                  padding: 8,
                                                                  color: '#000',
                                                                  height: 36,
                                                                  fontWeight: 700,
                                                                  fontSize: 16,
                                                                  letterSpacing: '0.1rem'
                                                                }}>
                                                                <Timer.Hours
                                                                  formatValue={(value) => `${(value < 10 ? `0${value}` : value)}h:`} />
                                                                <Timer.Minutes
                                                                  formatValue={(value) => `${(value < 10 ? `0${value}` : value)}m:`} />
                                                                <Timer.Seconds
                                                                  formatValue={(value) => `${(value < 10 ? `0${value}` : value)}s`} />
                                                              </div>
                                                              <div
                                                                style={{ marginLeft: 10 }}>
                                                                <div
                                                                  align="center"
                                                                  style={{
                                                                    backgroundColor: (getTimerState() === 'STOPPED' || getTimerState() === 'INITED') ? 'green' : 'red',
                                                                    padding: 5,
                                                                    borderRadius: 10,
                                                                    width: 50,
                                                                    color: '#fff',
                                                                    fontWeight: 700,
                                                                    cursor: 'pointer'
                                                                  }}
                                                                  onClick={() => {
                                                                    if (getTimerState() === 'STOPPED' || getTimerState() === 'INITED') {
                                                                      start();
                                                                    } else {
                                                                      let timeEtablished = getTime();
                                                                      console.log(timeEtablished);
                                                                      let timeH = ((timeEtablished / 1000) / 60) / 60;
                                                                      console.log(timeH);
                                                                      let obj = this.state.TimeSheet;
                                                                      obj.newTime.duree = timeH.toFixed(3).replace('.', ':');
                                                                      this.setState({ TimeSheet: obj });
                                                                      stop();
                                                                    }
                                                                  }}
                                                                >
                                                                  {(getTimerState() === 'STOPPED' || getTimerState() === 'INITED') ? 'Start' : 'Stop'}
                                                                </div>
                                                                <div
                                                                  align="center"
                                                                  style={{
                                                                    backgroundColor: '#c0c0c0',
                                                                    padding: 5,
                                                                    borderRadius: 10,
                                                                    width: 50,
                                                                    color: '#fff',
                                                                    fontWeight: 700,
                                                                    cursor: 'pointer',
                                                                    marginTop: 3
                                                                  }}
                                                                  onClick={() => {
                                                                    let obj = this.state.TimeSheet;
                                                                    obj.newTime.duree = '';
                                                                    this.setState({ TimeSheet: obj });
                                                                    reset();
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
                                                <div className="col-md-6">
                                                  <div>
                                                    <h5>Nom du client</h5>
                                                    <div style={{ display: 'flex' }}>
                                                      <SelectSearch
                                                        options={
                                                          this.state.annuaire_clients_mondat.map(({ Nom, Prenom, Type, imageUrl, ID }) =>
                                                            ({
                                                              value: ID,
                                                              name: Nom + ' ' + (Prenom || ''),
                                                              ContactType: Type,
                                                              ContactName: Nom + ' ' + (Prenom || ''),
                                                              imageUrl: imageUrl
                                                            }))
                                                        }
                                                        value={this.state.selectedClientTimeEntree}
                                                        renderOption={main_functions.renderSearchOption}
                                                        search
                                                        placeholder="Chercher votre client"
                                                        onChange={ (e) => {

                                                          let obj = this.state.TimeSheet;

                                                          let findClientTempo = this.state.clients_tempo.find(x => x.ID_client === e)
                                                          let findClientFname = this.state.annuaire_clients_mondat.find(x => x.ID === e)
                                                          console.log(findClientFname)
                                                          obj.newTime.client = findClientFname.Nom + ' ' + (findClientFname.Prenom || '');
                                                          obj.newTime.client_id = e;
                                                          if(findClientTempo){
                                                            this.setState({selectedClientFolders:findClientTempo.folders || [],selectedClientTimeEntree: e,TimeSheet: obj})
                                                          }else{
                                                            obj.newTime.dossier_client =  {
                                                              name:'',
                                                              facturation: {
                                                                language:''
                                                              }}
                                                            this.setState({selectedClientFolders:[],TimeSheet:obj,selectedClientTimeEntree: e})
                                                          }
                                                        }}
                                                      />
                                                      <IconButton
                                                        style={{ marginTop: -5 }}
                                                        onClick={() => this.setState({ openAdvancedSearchModal: true })}>
                                                        <SearchIcon />
                                                      </IconButton>
                                                    </div>
                                                    <h5 style={{marginTop:10}}>Dossier du client </h5>
                                                    <MuiSelect
                                                      labelId="demo-simple-select-label"
                                                      id="demo-simple-select"
                                                      style={{ width: 300 }}
                                                      value={this.state.TimeSheet.newTime.dossier_client}
                                                      onChange={(e) => {
                                                        console.log(e.target.value)
                                                        let ts = this.state.TimeSheet;
                                                        let data = e.target.value;
                                                        let team = data.team || [];
                                                        let find = team.find(x => x.email === this.state.TimeSheet.newTime.utilisateurOA);
                                                        if(find){
                                                          ts.newTime.rateFacturation = find.tarif || '';
                                                          this.setState({ TimeSheet: ts });
                                                        }else{
                                                          let OA_contacts = this.state.contacts;
                                                          let OA_contact = main_functions.getOAContactByEmail2(OA_contacts,this.state.TimeSheet.newTime.utilisateurOA);
                                                          ts.newTime.rateFacturation = OA_contact.rateFacturation || '';
                                                        }
                                                        ts.newTime.dossier_client = e.target.value;
                                                        this.setState({ TimeSheet: ts });
                                                      }}
                                                    >
                                                      {
                                                        this.state.selectedClientFolders.map((item,key) => (
                                                          <MenuItem key={key} value={item}>{item.name}</MenuItem>
                                                        ))
                                                      }
                                                    </MuiSelect>
                                                  </div>
                                                </div>
                                              </div>
                                              <div className="row mt-3">
                                                <div className="col-md-6">
                                                  <div>
                                                    <h5>Catégorie d’activités </h5>
                                                    <MuiSelect
                                                      labelId="demo-simple-select-label"
                                                      id="demo-simple-select"
                                                      style={{ width: 220 }}
                                                      value={this.state.TimeSheet.newTime.categoriesActivite}
                                                      onChange={(e) => {
                                                        let d = this.state.TimeSheet;
                                                        d.newTime.categoriesActivite = e.target.value;
                                                        this.setState({ TimeSheet: d });
                                                      }}
                                                    >
                                                      <MenuItem
                                                        value={'Temps facturé'}>Temps facturé</MenuItem>
                                                      <MenuItem
                                                        value={'Paiement avancée'}>Provision</MenuItem>
                                                    </MuiSelect>
                                                  </div>
                                                </div>
                                                <div className="col-md-6">
                                                  <div
                                                    style={{ width: '100%' }}>
                                                    <h5>Date</h5>
                                                    <DatePicker
                                                      calendarIcon={
                                                        <img
                                                          alt=""
                                                          src={calendar}
                                                          style={{ width: 20 }} />}
                                                      onChange={(e) => {
                                                        console.log(e);
                                                        let d = this.state.TimeSheet;
                                                        d.newTime.date = e;
                                                        this.setState({ TimeSheet: d });
                                                      }}
                                                      value={this.state.TimeSheet.newTime.date}
                                                    />
                                                  </div>
                                                </div>
                                              </div>
                                              <div className="row mt-3">
                                                <div className="col-md-6">
                                                  <div>
                                                    <div>
                                                      <h5>{new_timeSheet_desc}</h5>
                                                    </div>
                                                    <textarea
                                                      className="form-control "
                                                      id="duree"
                                                      style={{ width: '100%' }}
                                                      name="duree"
                                                      rows={5}
                                                      value={this.state.TimeSheet.newTime.description}
                                                      onChange={(e) => {
                                                        let d = this.state.TimeSheet;
                                                        d.newTime.description = e.target.value;
                                                        this.setState({ TimeSheet: d });
                                                      }} />
                                                  </div>
                                                </div>
                                                <div className="col-md-6">
                                                  <div>
                                                    <h6>Utilisateur OA </h6>
                                                  </div>
                                                  <MuiSelect
                                                    labelId="demo-simple-select-label4545"
                                                    id="demo-simple-select4545"
                                                    style={{ width: 250 }}
                                                    onChange={(e) => {
                                                      let ts = this.state.TimeSheet;
                                                      let dossier = this.state.TimeSheet.newTime.dossier_client;
                                                      if(dossier && dossier.team && dossier.team.length > 0){
                                                        let team = dossier.team;
                                                        let find = team.find(x => x.email === e.target.value);
                                                        if(find){
                                                          ts.newTime.rateFacturation = find.tarif || "";
                                                        }
                                                      }else{
                                                        let OA_contacts = this.state.contacts;
                                                        let OA_contact = main_functions.getOAContactByEmail2(OA_contacts,e.target.value);
                                                        ts.newTime.rateFacturation = OA_contact.rateFacturation || '';
                                                      }
                                                      ts.newTime.utilisateurOA = e.target.value;
                                                      this.setState({ TimeSheet: ts });
                                                    }}
                                                    value={this.state.TimeSheet.newTime.utilisateurOA}
                                                  >
                                                    {this.state.contacts.map((contact, key) => (
                                                      <MenuItem
                                                        key={key}
                                                        value={contact.email}>
                                                        <div style={{display:"flex"}}>
                                                          <Avatar style={{marginLeft:10}}
                                                                  alt=""
                                                                  src={contact.imageUrl} />
                                                          <div style={{marginTop:10,marginLeft:8}}>{contact.nom + ' ' + contact.prenom}</div>
                                                        </div>
                                                      </MenuItem>
                                                    ))}
                                                  </MuiSelect>
                                                  <div
                                                    className="mt-3">
                                                    <h6>
                                                      Taux horaire
                                                    </h6>
                                                    <Input
                                                      className="form-control "
                                                      id="duree"
                                                      style={{ width: 250 }}
                                                      name="duree"
                                                      type="text"
                                                      endAdornment={
                                                        <InputAdornment
                                                          position="end">CHF:Hr</InputAdornment>}
                                                      value={this.state.TimeSheet.newTime.rateFacturation + ''}
                                                      onChange={(e) => {
                                                        let d = this.state.TimeSheet;
                                                        d.newTime.rateFacturation = e.target.value;
                                                        this.setState({ TimeSheet: d });
                                                      }} />
                                                  </div>
                                                </div>
                                              </div>
                                              <div align="center" className=" mt-4">
                                                <AltButtonGroup>
                                                  <AtlButton
                                                    onClick={() => {
                                                      this.createLignefacture(false)
                                                    }}
                                                    appearance="primary"
                                                    isDisabled={this.state.TimeSheet.newTime.duree === '' ||  this.state.TimeSheet.newTime.description === '' || this.state.TimeSheet.newTime.rateFacturation === '' || this.state.selectedClientTimeEntree === '' }
                                                    style={{ margin: 20 }}> Enregistrer </AtlButton>
                                                  <AtlButton
                                                    onClick={() => {
                                                      this.createLignefacture(true)
                                                    }}
                                                    appearance="primary"
                                                    isDisabled={this.state.TimeSheet.newTime.duree === '' || this.state.TimeSheet.newTime.description === '' || this.state.TimeSheet.newTime.rateFacturation === '' || this.state.selectedClientTimeEntree === '' }
                                                    style={{ margin: 20 }}>Enregistrer & dupliquer</AtlButton>
                                                  <AtlButton
                                                    appearance=""
                                                    style={{ margin: 20 }}
                                                    onClick={() => {
                                                      this.setState({
                                                        TimeSheet: {
                                                          newTime: {
                                                            duree: '',
                                                            client: '',
                                                            dossier_client: {
                                                              name:'',
                                                              facturation: {
                                                                language:''
                                                              }},
                                                            categoriesActivite: 'Temps facturé',
                                                            description: '',
                                                            date: new Date(),
                                                            utilisateurOA: '',
                                                            rateFacturation: '',
                                                            selectedClientTimeEntree:''
                                                          }
                                                        }
                                                      });
                                                    }}>Réinitialiser</AtlButton>
                                                </AltButtonGroup>
                                                <div>
                                                  <AltButtonGroup
                                                    style={{ marginTop: 10 }}>
                                                    <AtlButton
                                                      isSelected
                                                      appearance="default"
                                                      onClick={() => this.setState({selectedTimeSheetIndex:1})}
                                                    >
                                                      Etablir facture
                                                    </AtlButton>
                                                  </AltButtonGroup>
                                                </div>
                                              </div>
                                            </div> :

                                            <div>
                                              <div className="mt-1">
                                                <div>
                                                  <div style={{
                                                    textAlign: 'right',
                                                    marginTop: 15
                                                  }}>
                                                    <button
                                                      onClick={() => this.setState({
                                                        showLignesFactureClient: false
                                                      })}
                                                      className="btn btn-sm btn-outline-info">Retour
                                                    </button>
                                                  </div>

                                                  <div className="row mt-3">
                                                    <div
                                                      className="col-md-6">
                                                      <h5>Nom du client</h5>
                                                      <div
                                                        style={{ display: 'flex' }}>
                                                        <SelectSearch
                                                          options={
                                                            this.state.annuaire_clients_mondat.map(({ Nom, Prenom, Type, imageUrl }) =>
                                                              ({
                                                                value: Nom + ' ' + (Prenom || ''),
                                                                name: Nom + ' ' + (Prenom || ''),
                                                                ContactType: Type,
                                                                ContactName: Nom + ' ' + (Prenom || ''),
                                                                imageUrl: imageUrl
                                                              }))
                                                          }
                                                          value={this.state.selectedClientTimeEntree}
                                                          renderOption={main_functions.renderSearchOption}
                                                          search
                                                          placeholder="Chercher votre client"
                                                          onChange={e => {
                                                            console.log(e);
                                                            let obj = this.state.TimeSheet;
                                                            obj.newTime.client = e;

                                                            let find_annuaire_fact_lead = this.state.annuaire_clients_mondat.find(x => (x.Nom + ' ' + x.Prenom) === e);
                                                            console.log(find_annuaire_fact_lead);
                                                            let partner_email = find_annuaire_fact_lead ? find_annuaire_fact_lead.facturation ? find_annuaire_fact_lead.facturation.collaborateur_lead : '' : '';
                                                            console.log(partner_email);
                                                            this.setState({
                                                              partnerFacture: partner_email,
                                                              selectedClientTimeEntree: e,
                                                              TimeSheet: obj
                                                            });
                                                          }}
                                                        />
                                                        <IconButton
                                                          style={{ marginTop: -5 }}
                                                          onClick={() => this.setState({ openAdvancedSearchModal: true })}>
                                                          <SearchIcon />
                                                        </IconButton>
                                                      </div>
                                                    </div>
                                                    <div
                                                      className="col-md-4">
                                                      <div
                                                        style={{ width: '100%' }}>
                                                        <h5>Date de la facture</h5>
                                                        <DatePicker
                                                          calendarIcon={
                                                            <img
                                                              alt=""
                                                              src={calendar}
                                                              style={{ width: 20 }} />}
                                                          onChange={(e) => {
                                                            this.setState({ dateFacture: e });
                                                          }}
                                                          value={this.state.dateFacture}
                                                        />
                                                      </div>
                                                    </div>
                                                  </div>
                                                </div>
                                              </div>
                                            </div>
                                        }
                                      </TabPanel>
                                      <TabPanel>
                                        {
                                          this.state.lignesFactures.length > 0 &&
                                          <TableTimeSheet
                                            lignesFactures={this.state.lignesFactures}
                                            lignesFacturesCopy={this.state.lignesFacturesCopy}
                                            setLignesFactures={(lignes_factures) => this.setState({ lignesFactures: lignes_factures })}
                                            OA_contacts={this.state.contacts}
                                            annuaire_clients_mondat={this.state.annuaire_clients_mondat}
                                            onClickFacture={(client,client_folder,facture_date,partner,lignes_facture) => {
                                              this.addFactureToValidated(client,client_folder,facture_date,localStorage.getItem("email"),
                                                partner,lignes_facture)
                                            }}
                                            client_folders={this.state.client_folders}
                                            updateLigneFacture={(id,ligne) => this.updateLigneFacture(id,ligne)}
                                            openSnackbar={(type,msg) => this.openSnackbar(type,msg)}
                                            clientsTempo={this.state.clients_tempo}
                                            updateAllLigneFacture={(data) => this.updateAllLigneFacture(data)}
                                          />
                                        } {
                                        this.state.lignesFactures.length === 0 &&
                                        <div style={{
                                          marginTop: 30,
                                          marginLeft: 10
                                        }}>Aucune ligne facture encore ajoutée !</div>

                                      }
                                      </TabPanel>
                                      <TabPanel>
                                        <h4 style={{marginTop:20,marginBottom:15}}>Factures à valider</h4>
                                        <TableFactures factures={this.state.facturesToValidated}
                                                       facturesCp={this.state.facturesToValidatedCopy}
                                                       client_folders={this.state.client_folders}
                                                       clients_tempo={this.state.clients_tempo}
                                                       annuaire_clients_mondat={this.state.annuaire_clients_mondat}
                                                       sharedFolders={this.state.sharedReelFolders || []}
                                                       validateFacture={(row,key,template,client) => {
                                                         this.createFacture_ForSelected(row.created_at, row.lignes_facture,row.client_folder.id,row,template,client);
                                                       }}
                                                       openFacture={(id) => {
                                                         this.openPdfModal(id)
                                                       }}
                                                       openFactureFolder={(id) => {
                                                         this.redirectToFolder(id)
                                                       }}
                                                       updateAllFactures={(data) => {
                                                         this.updateAllFactures(data)
                                                       }}
                                                       openSnackbar={(type,msg) => this.openSnackbar(type,msg)}
                                        />
                                      </TabPanel>
                                    </Tabs>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        }
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
                            this.showDocInPdfModal(fileRes.data.Content.Data,fileRes.data.name,fileRes.data.type);
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
            toggle={() => this.setState({ showPDFModal: false })}

          >

            <ModalHeader style={{display:"block",paddingLeft:"0.9rem",paddingRight:"0.9rem",paddingBottom:"0.3rem"}}>
              <div style={{display:"flex",justifyContent:"space-between"}}>
                <h5>
                  {this.state.pdfName || "Document"}
                </h5>
                <div style={{marginTop:-5}}>
                  <IconButton onClick={() => {

                    let a = document.createElement('a');
                    a.href = 'data:application/pdf;base64,' + this.state.pdfURL;
                    a.download = this.state.pdfName;
                    a.click();
                  }} >
                    <GetAppIcon/>
                  </IconButton>
                  <IconButton onClick={() => {this.setState({ showPDFModal: false })}} >
                    <CloseIcon/>
                  </IconButton>
                </div>

              </div>

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
              Nouveau dossier
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
                        console.log(data)
                        this.setState({ emailsDriveShare: data });
                      }}
                      pattern={data.emailPatern}
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
                disabled={this.state.emailsDriveShare.length === 0 || this.state.shareRights.length === 0
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
                            {' '}
                            <ListItemIcon>
                              {' '}
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
                    created_by:localStorage.getItem("email"),
                    ged_id:"896ca0ed-8b4a-40fd-aeff-7ce26ee1bcf9"
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

                  let findClientTempo = this.state.clients_tempo.find(x => x.ID_client === client.ID)
                  let findClientFname = this.state.annuaire_clients_mondat.find(x => x.ID === client.ID)
                  console.log(findClientFname)
                  obj.newTime.client = findClientFname.Nom + ' ' + (findClientFname.Prenom || '');
                  if(findClientTempo){
                    this.setState({selectedClientFolders:findClientTempo.folders || [],selectedClientTimeEntree: client.ID,TimeSheet: obj,openAdvancedSearchModal: false})
                  }else{
                    obj.newTime.dossier_client =  {
                      name:'',
                      facturation: {
                        language:''
                      }}
                    this.setState({selectedClientFolders:[],TimeSheet:obj,selectedClientTimeEntree: client.ID,openAdvancedSearchModal: false})
                  }
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
                    <option value="0">Une société</option>
                    <option value="1">Personne physique</option>
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
                    value={this.state.newClient.Nom}
                    onChange={this.handleChange('newClient', 'Nom')} />
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
                      value={this.state.newClient.Prenom}
                      onChange={this.handleChange('newClient', 'Prenom')} />
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
                  <p style={{ marginBottom: 10 }}>Pays</p>
                  <select
                    style={{ minWidth: 300, height: 40 }}
                    className="form-control custom-select"
                    id="nomt"
                    name="nomt"
                    value={this.state.newClient.country}
                    onChange={this.handleChange('newClient', 'country')}>
                    {
                      countryList.map((c, key) => (
                        <option key={key} value={c.Name}>{c.Name}</option>
                      ))
                    }
                  </select>
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
                disabled={this.state.newClient.Nom === '' || this.state.newClient.email === ''}
                onClick={() => {
                  this.addNewClient();
                }}
                color="primary"
                variant="contained"
                style={{ textTransform: 'capitalize' }}
              >
                Créer
              </MuiButton>
            </DialogActions>
          </Dialog>

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
