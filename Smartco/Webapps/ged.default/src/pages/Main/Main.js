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
import defaultAvatar from '../../assets/images/users/default_avatar.jpg';
import { Modal, ModalBody, ModalHeader } from 'reactstrap';
import PDFViewer from '../../customComponents/pdf-viewer-reactjs';
import { isEmail, ReactMultiEmail } from 'react-multi-email';
import '../../assets/css/multiEmail.css';
import { Avatar, Button as MuiButton, Checkbox as MuiCheckbox, Chip, Input, MenuItem, Select as MuiSelect } from '@material-ui/core';
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
import xlsxParser from 'xlsx-parse-json';

const meet_url_begin = process.env.REACT_APP_MEET_URL_TITLE;
const ged_id = process.env.REACT_APP_GED_ID;
const ent_name = process.env.REACT_APP_ENT_NAME;
const logo = localStorage.getItem("logo")

export default class Main extends React.Component {

  imageUpload = {};
  folderupload = {};

  state = {
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
    checkedNotif: true,
    msgNotif: '',
    emailsDriveShare: [],

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
        categoriesActivite: 'Temps facturé',
        description: '',
        date: new Date(),
        utilisateurOA: '',
        rateFacturation: ''
      }
    },
    lignesFactures: [],
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
      Name: '',
      ContactFullName:'',
      Type: '0',
      created_at: '',
      Email: '',
      Phone: '',
      Street1:'',
      Street2:'',
      City:'',
      Zip:'',
      Country: '',
      isActif: true
    },
    newClientFolder: {
      nom: '',
      type: 'corporate',
      team: []
    },
    lead_contact_tmp: '',
    lead_contact_horaire_tmp: '',
    team_contact_tmp: '',
    clients_tempo: [],
    clients_tempo_copie: [],

    selectedTimeSheetIndex:0
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

              console.log(gedRes.data.Shared.Content.folders)
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
              console.log(sharedFolders)


              let client_folder = gedRes.data.Proprietary.Content.folders.find(
                (x) => x.name === 'CLIENTS'
              );
              if (client_folder) {
                localStorage.setItem('client_folder_id', client_folder.id);
                console.log(client_folder.id);
              }
              let meeturl = 'https://meet.smartdom.ch/'+meet_url_begin+'_' + moment().format('DDMMYYYYHHmmss');

              firebase.database().ref('/').on('value', (snapshot) => {
                  const data = snapshot.val() || [];
                  let contacts = data[ent_name+"-contacts-"+ged_id] || [];
                  let rooms = (data.rooms || []).filter(x => x.ged_id === ged_id);
                  let societes = data.societes || [];
                  let annuaire_clients_mondat = data[ent_name+"-clients-"+ged_id] || [];
                  let lignes_f = data.enfin_lignes_factures || [];
                  let clients_tempo = (data.clients_tempo || []).filter(x => x.email === localStorage.getItem('email'));
                  let clients_tempo_copie = (data.clients_tempo || []);

                  this.setState({
                    contacts: contacts,
                    societes: societes,
                    annuaire_clients_mondat: annuaire_clients_mondat,
                    rooms: rooms,
                    lignesFactures: lignes_f,
                    clients_tempo: clients_tempo,
                    clients_tempo_copie: clients_tempo_copie
                  });

                  let connected_email = localStorage.getItem("email");
                  let oa_contact = main_functions.getOAContactByEmail2(contacts,connected_email);
                  if(oa_contact){
                    this.setState({
                      TimeSheet: {
                        newTime: {
                          duree: '',
                          client: '',
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
                    }
                  } else if (this.props.location.pathname.indexOf('/home/drive') > -1) {
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
                      console.log(searchRes);
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

   updateTreeData(list, key, children, files) {
    return list.map((node) => {
      if (node.key === key) {
        node.files = files;
        console.log(node)
        return { ...node, children };
      } else if (node.children) {
        return { ...node, children: this.updateTreeData(node.children, key, children, files) };
      }
      return node;
    });
  }

  onLoadSharedData = ({ key, children }) => {

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
              typeF: sub_folders[i].type ? 'file' : 'folder'
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
          this.openSnackbar('success', file.typeF === 'file' ? file.name + '.pdf est supprimé avec succès' : file.name + ' est supprimé avec succès');
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
    firebase.database().ref('/'+ent_name+'-contacts-'+ged_id+'/'+ + key).set(
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
    firebase.database().ref("/"+ent_name+"-clients-"+ged_id+'/' + key).set(
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
              method: 'POST', url: data.endpoint + '/ged/896ca0ed-8b4a-41fd-aeff-8de26ee1bcf9/doc/addfile',
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
          if (this.props.location.pathname.indexOf('/home/drive/') > -1) {

            let folders = gedRes.data.Proprietary.Content.folders || [];
            let folder_id = this.props.location.pathname.replace('/home/drive/', '');
            let folder_name = main_functions.getFolderNameById(folder_id, folders);

            console.log(folder_id,folder_name)

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
          } else if (this.props.location.pathname.indexOf('/home/drive') > -1) {
            this.setState({
              rootFiles: gedRes.data.Proprietary.Content.files || [],
              rootFolders: gedRes.data.Proprietary.Content.folders || [],
              folders: main_functions.changeStructure(gedRes.data.Proprietary.Content.folders || []),
              reelFolders: gedRes.data.Proprietary.Content.folders || [],
              loading: false
            });
            this.props.history.push('/home/drive');
          } else {
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
        this.showDocInPdfModal(fileRes.data.Content.Data);
      } else {
        console.log(fileRes.error);
      }
    }).catch(err => console.log(err));
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
            this.setState({ selectedFolder: folder })
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
          setSharedFolderId={(id) => {
            this.props.history.push('/home/shared/' + id);
            this.setState({
              focusedItem: 'Drive',
              breadcrumbs: 'Mon drive / Partagés avec moi',
              selectedSharedFolderId: id,
              showContainerSection: 'Drive'
            });
          }}
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

  createFacture() {
    let lignes_factures = this.state.lignesFactures.filter((lf) => lf.newTime.client === this.state.TimeSheet.newTime.client);
    let odoo_data = [{
      'access_token': 'eafd285777ggobfvxyvnx',
      'state': 'draft',
      'type': 'out_invoice',
      'invoice_sent': false,
      'l10n_ch_isr_sent': false,
      'name': '',
      'invoice_date': moment(this.state.dateFacture).format('YYYY-MM-DD'),
      'date': moment(this.state.dateFacture).format('YYYY-MM-DD'),
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
      'fiscal_position_id': 1,
      'invoice_cash_rounding_id': false,
      'invoice_source_email': false,
      'invoice_payment_ref': false,
      'invoice_partner_bank_id': false,
      'reversed_entry_id': false,
      'message_follower_ids': [],
      'activity_ids': [],
      'message_ids': [],
      'message_attachment_count': 0,
      'invoice_line_ids': [
        [
          0,
          'virtual_' + (Math.floor(100 + Math.random() * 900)).toString(),
          {
            'sequence': 10,
            'account_id': 104,
            'quantity': 0.15,
            'discount': 10,
            'partner_id': false,
            'currency_id': false,
            'debit': 0,
            'credit': 60,
            'display_type': false,
            'product_id': 1,
            'name': '/*/*/',
            'analytic_account_id': false,
            'analytic_tag_ids': [
              [
                6,
                false,
                []
              ]
            ],

            'price_unit': 400,
            'tax_ids': [
              [
                6, false, []
              ]
            ],
            'amount_currency': 0,
            'date_maturity': false,
            'tag_ids': [
              [
                6,
                false,
                []
              ]
            ],
            'recompute_tax_line': false,
            'is_rounding_line': false,
            'exclude_from_invoice_tab': false
          }
        ]
      ],
      'line_ids': []
    }];
    let total = 0;


    lignes_factures.map((ligne, key) => {
      total = total + (ligne.newTime.duree * parseFloat(ligne.newTime.rateFacturation));
      let OAContact = main_functions.getOAContactByEmail2(this.state.contacts,ligne.newTime.utilisateurOA);
      odoo_data[0].line_ids.push(
        [
          0,
          'virtual_' + (Math.floor(100 + Math.random() * 900)).toString(),
          {
            'account_id': 104,
            'sequence': 10,
            'name':
              ligne.template === '0' ? moment(ligne.newTime.date).format('DD/MM/YYYY') :
                ligne.template === '1' ? moment(ligne.newTime.date).format('DD/MM/YYYY') + '; ' + ligne.newTime.description :
                  ligne.template === '2' ? moment(ligne.newTime.date).format('DD/MM/YYYY') + ' ; ' + OAContact.nom + ' ' + OAContact.prenom :
                    ligne.template === '3' ? moment(ligne.newTime.date).format('DD/MM/YYYY') + '; ' + ligne.newTime.description + ' ; ' + OAContact.nom + ' ' + OAContact.prenom :
                      ligne.template === '4' ? ligne.newTime.description :
                        ligne.template === '5' ? OAContact.nom + ' ' + OAContact.prenom :
                          ligne.template === '6' ? ligne.newTime.duree + ' Heures' :
                            ligne.template === '7' ? ligne.newTime.description + ' ; ' + OAContact.nom + ' ' + OAContact.prenom :
                              ligne.template === '8' ? ligne.newTime.description + ' ; ' + ligne.newTime.duree + ' Heures' :
                                ligne.template === '9' ? ligne.newTime.description + ' ; ' + OAContact.nom + ' ' + OAContact.prenom + ' ; ' + ligne.newTime.duree + ' Heures' : ligne.newTime.description,
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
            'product_id': 1,
            'payment_id': false,
            'tax_ids': [
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
    //console.log(total)
    odoo_data[0].line_ids.push(
      [
        0,
        'virtual_' + (Math.floor(100 + Math.random() * 900)).toString(),
        {
          'account_id': 6,
          'sequence': 10,
          'name': false,
          'quantity': 1,
          'price_unit': -total,
          'discount': 0,
          'debit': total,
          'credit': 0,
          'amount_currency': 0,
          'date_maturity': '2020-09-08',
          'currency_id': false,
          'partner_id': false,
          'product_uom_id': false,
          'product_id': false,
          'payment_id': false,
          'tax_ids': [
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
          'exclude_from_invoice_tab': true
        }
      ]
    );

    SmartService.create_facture_odoo(localStorage.getItem('token'), localStorage.getItem('usrtoken'), { data: odoo_data }).then(createFactRes => {
      //console.log(createFactRes)
      window.open('http://91.121.162.202:10013/my/invoices/' + createFactRes.data.id + '?access_token=eafd285777ggobfvxyvnx&report_type=pdf&download=true', '_blank');
    }).catch(err => {
      console.log(err);
    });
  }

  createFacture_ForSelected(facture_date,partner) {
    let lignes_factures = this.state.lignesFactures.filter((lf) => lf.checked === true);
    let odoo_data = [{
      'access_token': 'eafd285777ggobfvxyvnx',
      'state': 'draft',
      'type': 'out_invoice',
      'invoice_sent': false,
      'l10n_ch_isr_sent': false,
      'name': '',
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
      'fiscal_position_id': 1,
      'invoice_cash_rounding_id': false,
      'invoice_source_email': false,
      'invoice_payment_ref': false,
      'invoice_partner_bank_id': false,
      'reversed_entry_id': false,
      'message_follower_ids': [],
      'activity_ids': [],
      'message_ids': [],
      'message_attachment_count': 0,
      'invoice_line_ids': [
        [
          0,
          'virtual_' + (Math.floor(100 + Math.random() * 900)).toString(),
          {
            'sequence': 10,
            'account_id': 104,
            'quantity': 0.15,
            'discount': 10,
            'partner_id': false,
            'currency_id': false,
            'debit': 0,
            'credit': 60,
            'display_type': false,
            'product_id': 1,
            'name': '/*/*/',
            'analytic_account_id': false,
            'analytic_tag_ids': [
              [
                6,
                false,
                []
              ]
            ],

            'price_unit': 400,
            'tax_ids': [
              [
                6, false, []
              ]
            ],
            'amount_currency': 0,
            'date_maturity': false,
            'tag_ids': [
              [
                6,
                false,
                []
              ]
            ],
            'recompute_tax_line': false,
            'is_rounding_line': false,
            'exclude_from_invoice_tab': false
          }
        ]
      ],
      'line_ids': []
    }];
    let total = 0;
    lignes_factures.map((ligne, key) => {
      total = total + (ligne.newTime.duree * parseFloat(ligne.newTime.rateFacturation));
      let OAContact = main_functions.getOAContactByEmail2(this.state.contacts,ligne.newTime.utilisateurOA);
      odoo_data[0].line_ids.push(
        [
          0,
          'virtual_' + (Math.floor(100 + Math.random() * 900)).toString(),
          {
            'account_id': 104,
            'sequence': 10,
            'name':
              ligne.template === '0' ? moment(ligne.newTime.date).format('DD/MM/YYYY') :
                ligne.template === '1' ? moment(ligne.newTime.date).format('DD/MM/YYYY') + '; ' + ligne.newTime.description :
                  ligne.template === '2' ? moment(ligne.newTime.date).format('DD/MM/YYYY') + ' ; ' + OAContact.nom + ' ' + OAContact.prenom :
                    ligne.template === '3' ? moment(ligne.newTime.date).format('DD/MM/YYYY') + '; ' + ligne.newTime.description + ' ; ' + OAContact.nom + ' ' + OAContact.prenom :
                      ligne.template === '4' ? ligne.newTime.description :
                        ligne.template === '5' ? OAContact.nom + ' ' + OAContact.prenom :
                          ligne.template === '6' ? ligne.newTime.duree + ' Heures' :
                            ligne.template === '7' ? ligne.newTime.description + ' ; ' + OAContact.nom + ' ' + OAContact.prenom :
                              ligne.template === '8' ? ligne.newTime.description + ' ; ' + ligne.newTime.duree + ' Heures' :
                                ligne.template === '9' ? ligne.newTime.description + ' ; ' + OAContact.nom + ' ' + OAContact.prenom + ' ; ' + ligne.newTime.duree + ' Heures' : ligne.newTime.description,
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
            'product_id': 1,
            'payment_id': false,
            'tax_ids': [
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
    //console.log(total)
    odoo_data[0].line_ids.push(
      [
        0,
        'virtual_' + (Math.floor(100 + Math.random() * 900)).toString(),
        {
          'account_id': 6,
          'sequence': 10,
          'name': false,
          'quantity': 1,
          'price_unit': -total,
          'discount': 0,
          'debit': total,
          'credit': 0,
          'amount_currency': 0,
          'date_maturity': '2020-09-08',
          'currency_id': false,
          'partner_id': false,
          'product_uom_id': false,
          'product_id': false,
          'payment_id': false,
          'tax_ids': [
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
          'exclude_from_invoice_tab': true
        }
      ]
    );

    SmartService.create_facture_odoo(localStorage.getItem('token'), localStorage.getItem('usrtoken'), { data: odoo_data }).then(createFactRes => {
      //console.log(createFactRes)
      window.open('http://91.121.162.202:10013/my/invoices/' + createFactRes.data.id + '?access_token=eafd285777ggobfvxyvnx&report_type=pdf&download=true', '_blank');
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
      firebase.database().ref('/enfin_lignes_factures').set(lignes_factures);
    }, 300);

  }

  generateClientFolder(ID, team) {
    this.setState({ loading: true });
    let clients_tmp = this.state.clients_tempo;
    let clients_tmp_copie = this.state.clients_tempo_copie;
    let find = clients_tmp.find(x => x.ID === ID);
    if (find) {
      SmartService.create_client_folder(localStorage.getItem('token'), localStorage.getItem('usrtoken'), {
        client_id: find.client_id,
        type: this.state.newClientFolder.type,
        name: this.state.newClientFolder.nom,
        client_folder: find.folder_id,
        team: team
      }).then(addFolderClient => {
        SmartService.addFolder({
          name: 'MÉMOIRE',
          folder_id: addFolderClient.data.folder_id
        }, localStorage.getItem('token'), localStorage.getItem('usrtoken')).then(addFolderClientRes11 => {
        }).catch(err => {
          console.log(err);
        });
        SmartService.addFolder({
          name: 'CHARGE DE PIECES',
          folder_id: addFolderClient.data.folder_id
        }, localStorage.getItem('token'), localStorage.getItem('usrtoken')).then(addFolderClientRes11 => {
        }).catch(err => {
          console.log(err);
        });
        SmartService.addFolder({
          name: 'CONVOCATIONS',
          folder_id: addFolderClient.data.folder_id
        }, localStorage.getItem('token'), localStorage.getItem('usrtoken')).then(addFolderClientRes11 => {
        }).catch(err => {
          console.log(err);
        });
        SmartService.addFolder({
          name: 'ADMIN (Lettre d\'engagement)',
          folder_id: addFolderClient.data.folder_id
        }, localStorage.getItem('token'), localStorage.getItem('usrtoken')).then(addFolderClientRes11 => {
        }).catch(err => {
          console.log(err);
        });
        SmartService.addFolder({
          name: 'COMPTABILITE',
          folder_id: addFolderClient.data.folder_id
        }, localStorage.getItem('token'), localStorage.getItem('usrtoken')).then(addFolderClientRes11 => {
        }).catch(err => {
          console.log(err);
        });
        SmartService.addFolder({
          name: 'CORRESPONDANCE',
          folder_id: addFolderClient.data.folder_id
        }, localStorage.getItem('token'), localStorage.getItem('usrtoken')).then(addFolderClientRes11 => {
        }).catch(err => {
          console.log(err);
        });
        SmartService.addFolder({
          name: 'INTERNE ****',
          folder_id: addFolderClient.data.folder_id
        }, localStorage.getItem('token'), localStorage.getItem('usrtoken')).then(addFolderClientRes11 => {
        }).catch(err => {
          console.log(err);
        });
        SmartService.addFolder({
          name: 'NOTES',
          folder_id: addFolderClient.data.folder_id
        }, localStorage.getItem('token'), localStorage.getItem('usrtoken')).then(addFolderClientRes11 => {
        }).catch(err => {
          console.log(err);
        });
        SmartService.addFolder({
          name: 'PV RENDEZ-VOUS',
          folder_id: addFolderClient.data.folder_id
        }, localStorage.getItem('token'), localStorage.getItem('usrtoken')).then(addFolderClientRes11 => {
          console.log('OK');
        }).catch(err => {
        });
        SmartService.addFolder({
          name: 'PROCEDURES',
          folder_id: addFolderClient.data.folder_id
        }, localStorage.getItem('token'), localStorage.getItem('usrtoken')).then(addFolderClientRes11 => {
        }).catch(err => {
          console.log(err);
        });
        SmartService.addFolder({
          name: 'RECHERCHES JURIDIQUES',
          folder_id: addFolderClient.data.folder_id
        }, localStorage.getItem('token'), localStorage.getItem('usrtoken')).then(addFolderClientRes11 => {
        }).catch(err => {
          console.log(err);
        });
        setTimeout(() => {
          this.setState({
            loading: false,
            newClientFolder: { nom: '', type: '', team: [] },
            lead_contact_tmp: '',
            lead_contact_horaire_tmp: ''
          });
          this.justReloadGed();
          this.openSnackbar('success', 'Dossier ajouté avec succès');
        }, 750);

      }).catch(err => {
        console.log(err);
      });
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
          folder_id: localStorage.getItem('client_folder_id')
        }, localStorage.getItem('token'), localStorage.getItem('usrtoken')).then(addParentClientFolderRes => {
          console.log('OK');

          SmartService.create_client_folder(localStorage.getItem('token'), localStorage.getItem('usrtoken'), {
            client_id: createClientRes.data.id,
            type: this.state.newClientFolder.type,
            name: this.state.newClientFolder.nom,
            client_folder: addParentClientFolderRes.data.id,
            team: team
          }).then(addFolderClient => {
            console.log('OK 1');

            SmartService.addFolder({
              name: 'MÉMOIRE',
              folder_id: addFolderClient.data.folder_id
            }, localStorage.getItem('token'), localStorage.getItem('usrtoken')).then(addFolderClientRes11 => {
              console.log('OK');
            }).catch(err => {
              console.log(err);
            });
            SmartService.addFolder({
              name: 'CHARGE DE PIECES',
              folder_id: addFolderClient.data.folder_id
            }, localStorage.getItem('token'), localStorage.getItem('usrtoken')).then(addFolderClientRes11 => {
              console.log('OK');
            }).catch(err => {
              console.log(err);
            });
            SmartService.addFolder({
              name: 'CONVOCATIONS',
              folder_id: addFolderClient.data.folder_id
            }, localStorage.getItem('token'), localStorage.getItem('usrtoken')).then(addFolderClientRes11 => {
              console.log('OK');
            }).catch(err => {
              console.log(err);
            });
            SmartService.addFolder({
              name: 'ADMIN (Lettre d\'engagement)',
              folder_id: addFolderClient.data.folder_id
            }, localStorage.getItem('token'), localStorage.getItem('usrtoken')).then(addFolderClientRes11 => {
              console.log('OK');
            }).catch(err => {
              console.log(err);
            });
            SmartService.addFolder({
              name: 'COMPTABILITE',
              folder_id: addFolderClient.data.folder_id
            }, localStorage.getItem('token'), localStorage.getItem('usrtoken')).then(addFolderClientRes11 => {
              console.log('OK');
            }).catch(err => {
              console.log(err);
            });
            SmartService.addFolder({
              name: 'CORRESPONDANCE',
              folder_id: addFolderClient.data.folder_id
            }, localStorage.getItem('token'), localStorage.getItem('usrtoken')).then(addFolderClientRes11 => {
              console.log('OK');
            }).catch(err => {
              console.log(err);
            });
            SmartService.addFolder({
              name: 'INTERNE ****',
              folder_id: addFolderClient.data.folder_id
            }, localStorage.getItem('token'), localStorage.getItem('usrtoken')).then(addFolderClientRes11 => {
              console.log('OK');
            }).catch(err => {
              console.log(err);
            });
            SmartService.addFolder({
              name: 'NOTES',
              folder_id: addFolderClient.data.folder_id
            }, localStorage.getItem('token'), localStorage.getItem('usrtoken')).then(addFolderClientRes11 => {
              console.log('OK');
            }).catch(err => {
              console.log(err);
            });
            SmartService.addFolder({
              name: 'PV RENDEZ-VOUS',
              folder_id: addFolderClient.data.folder_id
            }, localStorage.getItem('token'), localStorage.getItem('usrtoken')).then(addFolderClientRes11 => {
              console.log('OK');
            }).catch(err => {
              console.log(err);
            });
            SmartService.addFolder({
              name: 'PROCEDURES',
              folder_id: addFolderClient.data.folder_id
            }, localStorage.getItem('token'), localStorage.getItem('usrtoken')).then(addFolderClientRes11 => {
              console.log('OK');
            }).catch(err => {
              console.log(err);
            });
            SmartService.addFolder({
              name: 'RECHERCHES JURIDIQUES',
              folder_id: addFolderClient.data.folder_id
            }, localStorage.getItem('token'), localStorage.getItem('usrtoken')).then(addFolderClientRes11 => {
              console.log('OK');
            }).catch(err => {
              console.log(err);
            });

            clients_tmp_copie.push({
              folder_id: addParentClientFolderRes.data.id, ID: ID,
              email: localStorage.getItem('email'), client_id: createClientRes.data.id
            });
            firebase.database().ref('/clients_tempo').set(clients_tmp_copie).then(ok => {
              setTimeout(() => {
                this.setState({
                  loading: false,
                  newClientFolder: { nom: '', type: 'corporate', team: [] },
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
  }

  addNewClient() {
    this.setState({ firstLoading: true, loading: true, openNewClientModal: false });
    let all_clients = this.state.annuaire_clients_mondat;
    let newClient = this.state.newClient;
    newClient.ID = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
    newClient.created_at = (new Date()).toDateString();
    all_clients.push(newClient);

    firebase.database().ref('/'+ent_name+'-'+ged_id+'/' + (all_clients.length - 1)).set(newClient).then(ok => {
      this.openSnackbar('success', newClient.Nom + ' est ajouté avec succès ');
      this.props.history.push('/home/clients/' + newClient.ID);
      this.setState({
        firstLoading: false, loading: false,
        selectedSociete: newClient,
        selectedSocieteKey: newClient.ID
      });
      setTimeout(() => {
        this.setState({
          newClient: { ID: '', Name: '', Type: '0', created_at: '', Country: '', Email: '', Phone: '', isActif: true }
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
            method: 'POST', url: data.endpoint + '/ged/896ca0ed-8b4a-41fd-aeff-8de26ee1bcf9/doc/addfile',
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

  render() {
    var searchFilter = this.state.annuaire_clients_mondat.filter((soc) => (soc.Nom + ' ' + soc.Prenom).toLowerCase().startsWith(this.state.searchSociete.toLowerCase()));
    var searchFilterLignesfacture = this.state.lignesFactures.filter((lf) => lf.newTime.client === this.state.TimeSheet.newTime.client);
    const inputSuggProps = {
      placeholder: '0:1, 0:15, 0:30...',
      value: this.state.TimeSheet.newTime.duree,
      onChange: this.onInputTimeSuggChange
    };
    const current_user_contact = main_functions.getOAContactByEmail2(this.state.contacts,localStorage.getItem("email"))

    return (
      <div>
        {this.state.firstLoading === false && (
          <div>
            <TopBar
              logo={logo}
              height={70}
              onClickMenuIcon={() => this.setState({ openSideMenu: true })}
              onLogoutClick={() => {
                let logoCp = localStorage.getItem("logo");
                localStorage.clear();
                localStorage.setItem("logo",logoCp)
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
                                            onDocClick={(item) =>
                                              this.setState({
                                                selectedDoc: item,
                                                openRightMenu: true
                                              })
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
                                            onDropFile={(files) => {
                                              this.uploadFilesToGed(files)
                                            }}
                                            setDocs={(docs) => this.setState({rootFiles:docs})}
                                            onDeleteFiles={(files) => {this.deleteManyFiles(files)}}
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
                                this.setState({
                                  selectedDoc: doc,
                                  openRightMenu: true
                                });
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
                                          this.setState({
                                            selectedDoc: item,
                                            openRightMenu: true
                                          })
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
                              onDoubleClickFolder={(folder) => {
                                /*this.setState({
                                  selectedDriveSharedItem: [folder.id],
                                  expandedDriveSharedItems: [folder.id],
                                  selectedSharedFolder: main_functions.getFolderById(folder.id, this.state.sharedFolders),
                                  autoExpandSharedParent: true,
                                  selectedSharedFoldername: folder.name,
                                  selectedSharedFolderFiles: folder.Content.files || [],
                                  selectedSharedFolderFolders: folder.Content.folders || [],
                                  focusedItem: 'Drive',
                                  breadcrumbs: 'Mon drive / Partagés avec moi',
                                  selectedSharedFolderId: folder.id,
                                  showContainerSection: 'Drive'
                                });*/
                              }}
                              onDocClick={(doc) => {
                                this.setState({
                                  selectedDoc: doc,
                                  openRightMenu: true
                                });
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
                                      'https://meet.smartdom.ch/'+meet_url_begin+'_' +
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
                                  'https://meet.smartdom.ch/'+meet_url_begin+'_' +
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
                                  onEditClick={(contact, key) => {
                                    this.setState({
                                      selectedContact: contact,
                                      selectedContactKey: contact.uid
                                    });
                                    this.props.history.push('/home/contacts/' + contact.uid);
                                  }}
                                  onImportClick={(e) => {
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
                                            firebase.database().ref("/"+ent_name+"-contacts-"+ged_id).set(contacts).then( ok => {
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
                                  <h4 className="mb-0">{this.state.selectedContact.FirstName + ' ' + this.state.selectedContact.LastName}</h4>
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
                                              value={this.state.selectedContact.TauxHoraire}
                                              onChange={this.handleChange('selectedContact', 'TauxHoraire')}
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
                                              value={this.state.selectedContact.FirstName}
                                              onChange={this.handleChange('selectedContact','FirstName')} />
                                          </div>
                                          <div
                                            className="col-md-6">
                                            <p style={{ marginBottom: 10 }}>Prénom</p>
                                            <input
                                              className="form-control"
                                              type="text"
                                              id="prenom"
                                              name="prenom"
                                              value={this.state.selectedContact.LastName}
                                              onChange={this.handleChange('selectedContact', 'LastName')} />
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
                                              value={this.state.selectedContact.Email}
                                              onChange={this.handleChange('selectedContact', 'Email')} />
                                          </div>
                                          <div
                                            className="col-md-6">
                                            <p style={{ marginBottom: 10 }}>Téléphone</p>
                                            <input
                                              className="form-control"
                                              type="text"
                                              id="phone"
                                              name="phone"
                                              value={this.state.selectedContact.Phone}
                                              onChange={this.handleChange('selectedContact', 'Phone')} />
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
                                              value={this.state.selectedContact.titre}
                                              onChange={this.handleChange('selectedContact', 'titre')}
                                            >
                                              {
                                                data.titres.map((titre, key) =>
                                                  <option
                                                    key={key}
                                                    value={titre}
                                                    label={titre} />
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
                                              value={this.state.selectedContact.Country}
                                              onChange={this.handleChange('selectedContact', 'Country')}>
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

                      <Route exact path="/home/clients">
                        {
                          this.state.loading === false && this.state.firstLoading === false &&
                          <TableSociete
                            contacts={this.state.contacts || []}
                            societes={this.state.annuaire_clients_mondat || []}
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
                            onImportClick={(e) => {
                              let file = e.target.files[0];
                              if(file.type === "application/vnd.oasis.opendocument.spreadsheet" || file.type === "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" ||
                                  file.type === "application/vnd.ms-excel" || file.type === "text/csv"){
                                xlsxParser.onFileSelection(e.target.files[0])
                                    .then( data => {
                                      let parsedData = Object.entries(data);
                                      let clients = parsedData[0][1];
                                      clients.map((c,key) => {
                                        c.ID = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
                                      })
                                      firebase.database().ref("/"+ent_name+"-clients-"+ged_id).set(clients).then( ok => {
                                        this.openSnackbar("success","Votre fichier est importé avec succès")
                                      }).catch(err => {console.log(err)})
                                      console.log(clients)
                                    }).catch(err => {
                                  console.log(err)
                                  this.openSnackbar("error",err)
                                })
                              }else{
                                this.openSnackbar("error","Type de fichier erroné ! Seulement les formats .xls, .xls, .csv sont acceptés")
                              }
                            }}
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
                                  <img onClick={() => this.imageUpload.click()}
                                       src={this.state.selectedSociete.imageUrl ? this.state.selectedSociete.imageUrl : this.state.selectedSociete.name ? entIcon : userAvatar}
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
                                    className="mb-0">{this.state.selectedSociete.name || this.state.selectedSociete.contactName}</h4>
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
                                      <Tab>Informations générales</Tab>
                                      <Tab>Ouverture mandat</Tab>
                                    </TabList>
                                      <TabPanel>
                                        <h5 style={{ marginTop: 20 }}>Informations générales</h5>
                                        <div className="row" style={{ marginTop: 30 }}>
                                          <div className="col-md-6">
                                            <p style={{ marginBottom: 10 }}>Nom du client </p>
                                            <input
                                                type="text"
                                                className="form-control"
                                                id="email"
                                                name="email"
                                                value={this.state.selectedSociete.ContactFullName}
                                                onChange={this.handleChange('selectedSociete', 'ContactFullName')} />

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
                                        <div className="row" style={{ marginTop: 20 }}>
                                          <div className="col-md-6">
                                            <p style={{ marginBottom: 10 }}>Adresse postale</p>
                                            <textarea
                                              rows={5}
                                              className="form-control" style={{color:"#000"}}
                                              id="about"
                                              name="about"
                                              value={this.state.selectedSociete.Street1}
                                              onChange={this.handleChange('selectedSociete', 'Street1')} />
                                          </div>
                                          <div className="col-md-6">
                                            <p style={{ marginBottom: 10 }}>Adresse email</p>
                                            <input
                                              className="form-control"
                                              type="email"
                                              id="email"
                                              name="email"
                                              value={this.state.selectedSociete.Email}
                                              onChange={this.handleChange('selectedSociete', 'Email')} />
                                            <p style={{ marginBottom: 10,marginTop:10 }}>Téléphone</p>
                                            <input
                                              className="form-control"
                                              type="text"
                                              id="phone"
                                              name="phone"
                                              value={this.state.selectedSociete.Phone}
                                              onChange={this.handleChange('selectedSociete', 'Phone')} />
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
                                        <div className="row" style={{ marginTop: 20 }}>
                                          <div className="col-md-6">
                                            <p style={{ marginBottom: 10 }}>Type de dossier</p>
                                            <select
                                              className="form-control custom-select"
                                              value={this.state.selectedSociete.Type}
                                              onChange={this.handleChange('selectedSociete', 'Type')}
                                            >
                                              {
                                                Data.contactTypes.map((type, key) =>
                                                  <option
                                                    key={key}
                                                    value={type.value}>{type.label}</option>
                                                )
                                              }
                                            </select>
                                          </div>
                                          <div className="col-md-6">
                                            <p style={{ marginBottom: 10 }}>Dossier ouvert le </p>
                                            <Input
                                              type="date"
                                              className="form-control"
                                              id="date_ouvert_dossier"
                                              name="date_ouvert_dossier"
                                              placeholder=""
                                              value={this.state.selectedSociete.date_ouvert_dossier}
                                              onChange={this.handleChange('selectedSociete', 'date_ouvert_dossier')}> </Input>
                                          </div>
                                        </div>


                                      </TabPanel>
                                      <TabPanel>
                                        <h5 style={{ marginTop: 20 }}>Ouverture mandat</h5>
                                        <div className="row mt-4">
                                          <div className="col-md-6">
                                            <div>
                                              Nom du mandat
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
                                              Type de mandat
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
                                                value={this.state.selectedSociete.mondat ? this.state.selectedSociete.mondat.description || "" : ""}
                                                onChange={this.handleObjectChange("selectedSociete", "mondat", "description")}
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
                                              value={this.state.selectedSociete.contrepartie}
                                              onChange={this.handleChange('selectedSociete', 'contrepartie')} />
                                          </div>
                                          <div className="col-md-6">
                                            <p style={{ marginBottom: 10 }}>Autres parties</p>
                                            <input
                                              type="text"
                                              className="form-control"
                                              id="email"
                                              name="email"
                                              value={this.state.selectedSociete.autrepartie}
                                              onChange={this.handleChange('selectedSociete', 'autrepartie')} />
                                          </div>
                                        </div>
                                        <hr style={{
                                          width: '100%',
                                          height: 1,
                                          backgroundColor: '#c0c0c0',
                                          marginTop: 35,
                                          marginBottom: 30
                                        }} />
                                        <div><h4>Facturation</h4>
                                          <div className="row mt-2">
                                            <div className="col-md-5">
                                              <div>Collaborateur-Lead</div>
                                              <div>
                                                <MuiSelect
                                                  labelId="demo-simple-select-label"
                                                  id="demo-simple-select"
                                                  style={{ width: '80%' }}
                                                  onChange={(e) => {
                                                    let contact_email = e.target.value;
                                                    let contact = main_functions.getOAContactByEmail2(this.state.contacts,contact_email);
                                                    if (contact) {
                                                      this.setState({ lead_contact_horaire_tmp: contact.rateFacturation });
                                                    }
                                                    this.setState({ lead_contact_tmp: e.target.value });
                                                  }}
                                                  value={this.state.lead_contact_tmp}
                                                >
                                                  {this.state.contacts.filter(x => x.type && x.type === "associe").map((contact, key) => (
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
                                              </div>
                                              {
                                                this.state.lead_contact_tmp !== '' &&
                                                <div className="mt-2">
                                                  <div>
                                                    Taux horaire
                                                  </div>
                                                  <Input
                                                    className="form-control "
                                                    id="duree35411"
                                                    style={{ width: '80%' }}
                                                    name="duree687811"
                                                    type="text"
                                                    endAdornment={
                                                      <InputAdornment
                                                        position="end">CHF/h</InputAdornment>}
                                                    value={this.state.lead_contact_horaire_tmp}
                                                    onChange={(e) => {
                                                      this.setState({ lead_contact_horaire_tmp: e.target.value });
                                                    }}
                                                  />
                                                </div>
                                              }
                                            </div>
                                            <div className="col-md-7">
                                              <div style={{ display: 'flex' }}>
                                                <div>Collaborateur-Team</div>
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
                                                  <div style={{
                                                    display: 'flex',
                                                    justifyContent: 'space-between',
                                                    marginTop: 13
                                                  }}>
                                                    <div>
                                                      <div>Collaborateur</div>
                                                      <div>
                                                        <MuiSelect
                                                          labelId="demo-simple-select-label"
                                                          id="demo-simple-select"
                                                          style={{ width: 250 }}
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
                                                                <div style={{marginTop:10,marginLeft:8}}>{contact.nom + ' ' + contact.prenom}</div>
                                                              </div>
                                                            </MenuItem>
                                                          ))}
                                                        </MuiSelect>
                                                      </div>
                                                    </div>
                                                    <div
                                                      style={{ marginTop: this.state.newClientFolder.team[key].uid !== '' ? 12 : -7 }}>
                                                      <div>
                                                        Taux horaire
                                                      </div>
                                                      <Input
                                                        className="form-control "
                                                        id="duree35411"
                                                        style={{ width: 250 }}
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
                                                      checked={this.state.mondat.facturationClient.parEmail || false}
                                                      onChange={(e) => {
                                                        let d = this.state.mondat;
                                                        d.facturationClient.parEmail = !this.state.mondat.facturationClient.parEmail;
                                                        this.setState({ mondat: d });
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
                                                    value={this.state.mondat.facturationClient.frequence}
                                                    onChange={(e) => {
                                                      let d = this.state.mondat;
                                                      d.facturationClient.frequence = e.target.value;
                                                      this.setState({ mondat: d });
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
                                                      checked={this.state.mondat.facturationClient.EnvoyeParSecretariat || false}
                                                      onChange={(e) => {
                                                        let d = this.state.mondat;
                                                        d.facturationClient.EnvoyeParSecretariat = !this.state.mondat.facturationClient.EnvoyeParSecretariat;
                                                        this.setState({ mondat: d });
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
                                                      checked={this.state.mondat.facturationClient.EnvoyeAvocat || false}
                                                      onChange={(e) => {
                                                        let d = this.state.mondat;
                                                        d.facturationClient.EnvoyeAvocat = !this.state.mondat.facturationClient.EnvoyeAvocat;
                                                        this.setState({ mondat: d });
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
                                                    value={this.state.mondat.facturationClient.LangueFacturation}
                                                    onChange={(e) => {
                                                      let d = this.state.mondat;
                                                      d.facturationClient.LangueFacturation = e.target.value;
                                                      this.setState({ mondat: d });
                                                    }}
                                                  >
                                                    <MenuItem
                                                      value={'Français'}>Français</MenuItem>
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
                                              objCp.team.push({
                                                fname: contact.nom + ' ' + contact.prenom,
                                                email: this.state.lead_contact_tmp,
                                                uid: contact.uid,
                                                tarif: this.state.lead_contact_horaire_tmp,
                                                type: 'lead'
                                              });
                                              this.generateClientFolder(this.state.selectedSociete.ID, objCp.team);
                                            }}
                                            className="btn btn-blue waves-effect mb-2 waves-light m-1">
                                            <i className="fe-folder-plus" />&nbsp;&nbsp;Créer Dossier Client
                                          </button>
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

                      <Route exact path="/home/timeSheet/activities">
                        {
                          this.state.loading === false && this.state.firstLoading === false &&
                          <div>
                            <div className="row">
                              <div className="col-lg-12">

                                <div className="card-box text-center"
                                     style={{ marginTop: 1 }}>
                                  <div style={{ marginTop: 30 }}
                                       className="text-left">
                                    <Tabs selectedIndex={this.state.selectedTimeSheetIndex} onSelect={index => {
                                      this.setState({selectedTimeSheetIndex:index})
                                    }}>
                                      <TabList>
                                        <Tab>Time Sheet</Tab>
                                        <Tab>Activités </Tab> {
                                        localStorage.getItem('role') === 'admin01' &&
                                        [
                                          <Tab key={0}>Recherche Clients </Tab>,
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
                                                    <div
                                                      className="col-md-5">
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
                                                    <div
                                                      className="col-md-7">
                                                      <div
                                                        style={{ display: 'flex' }}>
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
                                                <div
                                                  className="col-md-4">
                                                  <div>
                                                    <h5>Nom du client</h5>
                                                    <div
                                                      style={{ display: 'flex' }}>
                                                      <SelectSearch
                                                        options={
                                                          this.state.annuaire_clients_mondat.map(({ name, contactName, imageUrl }) =>
                                                            ({
                                                              value: name || contactName,
                                                              name: name || contactName,
                                                              ContactType: name ? "0":"1",
                                                              ContactName: name || contactName,
                                                              imageUrl: imageUrl
                                                            }))
                                                        }
                                                        value={this.state.selectedClientTimeEntree}
                                                        renderOption={main_functions.renderSearchOption}
                                                        search
                                                        placeholder="Chercher votre client"
                                                        onChange={e => {
                                                          //console.log(e)
                                                          let obj = this.state.TimeSheet;
                                                          obj.newTime.client = e;
                                                          let find_annuaire_fact_lead = this.state.annuaire_clients_mondat.find(x => (x.name || x.contactName) === e);
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
                                                      style={{ width: '100%' }}
                                                      value={this.state.TimeSheet.newTime.categoriesActivite}
                                                      onChange={(e) => {
                                                        let d = this.state.TimeSheet;
                                                        d.newTime.categoriesActivite = e.target.value;
                                                        this.setState({ TimeSheet: d });
                                                      }}
                                                    >
                                                      <MenuItem value={'Temps facturé'}>Temps facturé</MenuItem>
                                                      <MenuItem value={'Paiement avancée'}>Provision</MenuItem>
                                                    </MuiSelect>
                                                  </div>
                                                </div>
                                                <div
                                                  className="col-md-4">
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
                                                <div
                                                  className="col-md-4">
                                                  <div>
                                                    <div>
                                                      <h5>Description</h5>
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
                                                <div
                                                  className="col-md-4">
                                                  <div>
                                                    <h6>Utilisateur Enfin </h6>
                                                  </div>
                                                  <MuiSelect
                                                    labelId="demo-simple-select-label4545"
                                                    id="demo-simple-select4545"
                                                    style={{width: "80%"}}
                                                    onChange={(e) => {
                                                      let d = this.state.TimeSheet;
                                                      d.newTime.utilisateurOA = e.target.value;
                                                      let OA_contacts = this.state.contacts;
                                                      let OA_contact = '';
                                                      OA_contacts.map((contact, key) => {
                                                        if (contact && contact.email && contact.email === e.target.value) {
                                                          OA_contact = contact;
                                                        }
                                                      });
                                                      d.newTime.rateFacturation = OA_contact.rateFacturation || '';
                                                      this.setState({ TimeSheet: d });
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
                                                      style={{ width: '100%' }}
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
                                                <div
                                                  className="col-md-4">
                                                  <h6>Choix du template </h6>
                                                  <select
                                                    className="form-control custom-select"
                                                    value={this.state.lignef_template}
                                                    onChange={(e) => {
                                                      this.setState({ lignef_template: e.target.value });
                                                    }}>
                                                    {
                                                      data.lf_templates.map((item,key) =>
                                                          <option key={key} value={item.value}>{item.label}</option>
                                                      )
                                                    }

                                                  </select>
                                                </div>
                                              </div>
                                              <div align="center" className=" mt-4">
                                                <AltButtonGroup>
                                                  <AtlButton
                                                    onClick={() => {
                                                      let obj = this.state.TimeSheet;
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
                                                        obj.newTime.duree = timeFormated;
                                                        let lignes_fact = this.state.lignesFactures || [];

                                                        SmartService.create_company(localStorage.getItem('token'), localStorage.getItem('usrtoken'), { param: { name: obj.newTime.client } }).then(newCompRes => {
                                                          obj.newTime.company_id = newCompRes.data.id;
                                                          obj.newTime.date = moment(this.state.TimeSheet.newTime.data).format('YYYY-MM-DD');
                                                          obj.uid = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
                                                          obj.user_email = localStorage.getItem('email');
                                                          obj.ged_id = "896ca0ed-8b4a-41fd-aeff-8de26ee1bcf9";
                                                          obj.template = this.state.lignef_template;
                                                          lignes_fact.push(obj);

                                                          this.setState({
                                                            lignesFactures: lignes_fact,
                                                            TimeSheet: {
                                                              newTime: {
                                                                duree: '',
                                                                client: obj.newTime.client,
                                                                categoriesActivite: 'Temps facturé',
                                                                description: '',
                                                                date: new Date(),
                                                                utilisateurOA: obj.newTime.utilisateurOA,
                                                                rateFacturation: obj.newTime.rateFacturation
                                                              }
                                                            }
                                                          });

                                                          this.updateLignes_facture(lignes_fact);
                                                          this.openSnackbar('success', 'Enregistrement effectué avec succès');


                                                        }).catch(err => {
                                                          console.log(err);
                                                        });
                                                      }

                                                    }}
                                                    appearance="primary"
                                                    isDisabled={this.state.TimeSheet.newTime.duree === '' || this.state.TimeSheet.newTime.description === '' || this.state.TimeSheet.newTime.rateFacturation === '' || this.state.TimeSheet.newTime.client === ''}
                                                    style={{ margin: 20 }}> Enregistrer </AtlButton>
                                                  <AtlButton
                                                    appearance=""
                                                    style={{ margin: 20 }}>Enregistrer et créer une autre</AtlButton>
                                                  <AtlButton
                                                    appearance=""
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
                                                            categoriesActivite: '',
                                                            description: '',
                                                            date: new Date(),
                                                            utilisateurOA: '',
                                                            rateFacturation: ''
                                                          }
                                                        }
                                                      });
                                                    }}>Annuler</AtlButton>
                                                </AltButtonGroup>
                                                <div>
                                                  <AltButtonGroup
                                                    style={{ marginTop: 10 }}>
                                                    <AtlButton
                                                      appearance=""
                                                      //onClick={() => this.setState({ showLignesFactureClient: true })}
                                                      onClick={() => this.setState({selectedTimeSheetIndex:1})}
                                                    >
                                                      Etablir facture
                                                    </AtlButton>
                                                    <AtlButton
                                                      appearance="">Histo.Fact.Clients</AtlButton>
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
                                              {
                                                searchFilterLignesfacture.length > 0 ?
                                                  <div
                                                    className="mt-3">
                                                    <div style={{
                                                      width: '100%',
                                                      backgroundColor: '#D2DDFE',
                                                      padding: 5,
                                                      display: 'flex'
                                                    }}>
                                                      <div
                                                        align="center"
                                                        style={{ width: '15%' }}>
                                                        <h5>Date</h5>
                                                      </div>
                                                      <div
                                                        align="center"
                                                        style={{ width: '60%' }}>
                                                        <h5>Activités</h5>
                                                      </div>
                                                      <div
                                                        align="center"
                                                        style={{ width: '15%' }}>
                                                        <h5>Heures</h5>
                                                      </div>
                                                      <div
                                                        align="center"
                                                        style={{ width: '10%' }}>
                                                        <h5>Action</h5>
                                                      </div>
                                                    </div>
                                                    {
                                                      searchFilterLignesfacture.map((lf, key) =>
                                                        <div
                                                          key={key}>
                                                          <div
                                                            style={{
                                                              width: '100%',
                                                              backgroundColor: '#fff',
                                                              padding: 5,
                                                              display: 'flex'
                                                            }}>
                                                            <div
                                                              align="center"
                                                              style={{ width: '15%' }}>
                                                              <h5>{moment(lf.newTime.date).format('DD-MM-YYYY')}</h5>
                                                            </div>
                                                            <div
                                                              align="center"
                                                              style={{ width: '60%' }}>
                                                              <h5>{lf.newTime.description}</h5>
                                                            </div>
                                                            <div
                                                              align="center"
                                                              style={{ width: '15%' }}>
                                                              <h5>{lf.newTime.duree}</h5>
                                                            </div>
                                                            <div
                                                              align="center"
                                                              style={{ width: '10%' }}>
                                                              <IconButton
                                                                onClick={() => {
                                                                  this.deleteLigneFact(lf);
                                                                }}>
                                                                <DeleteOutlineIcon
                                                                  color="error" />
                                                              </IconButton>
                                                            </div>
                                                          </div>
                                                          {
                                                            key < searchFilterLignesfacture.length &&
                                                            <div
                                                              style={{
                                                                backgroundColor: '#f0f0f0',
                                                                height: 2
                                                              }} />
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
                                                        style={{ width: 250 }}
                                                        value={this.state.partnerFacture}
                                                        onChange={(e) => {
                                                          console.log(e.target.value);
                                                          this.setState({ partnerFacture: e.target.value });
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
                                                                src={contact.imageUrl} />
                                                              <div>{contact.nom + ' ' + contact.prenom}</div>
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
                                                          this.createFacture();
                                                        }}> ETABLIR FACTURE</AtlButton>
                                                    </div>
                                                  </div> :

                                                  <div
                                                    className="mt-4">
                                                    <h5
                                                      style={{ color: '#f50' }}>Aucune ligne facture encore ajoutée pour ce client !</h5>
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
                                            setLignesFactures={(lignes_factures) => this.setState({ lignesFactures: lignes_factures })}
                                            OA_contacts={this.state.contacts}
                                            annuaire_clients_mondat={this.state.annuaire_clients_mondat}
                                            onClickFacture={(facture_date,partner) => {
                                              this.createFacture_ForSelected(facture_date,partner);
                                            }}
                                          />
                                        } {
                                        this.state.lignesFactures.length === 0 &&
                                        <div style={{
                                          marginTop: 30,
                                          marginLeft: 10
                                        }}>Aucune ligne facture encore ajoutée !</div>

                                      }
                                      </TabPanel> {
                                      localStorage.getItem('role') === 'admin01' &&
                                      [
                                        <TabPanel key={0}>
                                          <h5 style={{
                                            marginTop: 20,
                                            color: 'blue'
                                          }}>Sélection du client à imputer</h5>
                                          <div
                                            className="row border border-primary"
                                            style={{ marginTop: 35 }}>
                                            <div className="col-md-4">
                                              <input
                                                className="form-control "
                                                style={{
                                                  width: '100%',
                                                  borderColor: 'transparent',
                                                  marginTop: 8
                                                }}
                                                id="search"
                                                type="text"
                                                placeholder="search"
                                                value={this.state.searchSociete}
                                                onChange={(e) => {
                                                  this.setState({ searchSociete: e.target.value });
                                                }} />
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
                                          <div className="row mt-3">
                                            <div className="col-md-3">
                                              <h5>Nom Sociéte</h5>
                                            </div>
                                            <div className="col-md-4">
                                              <h5>Nom du décideur / email</h5>
                                            </div>
                                            <div className="col-md-5">
                                              <h5>Nom du payeur / email</h5>
                                            </div>
                                          </div>
                                          <div className="mt-2">
                                            {this.state.searchSociete === '' ?
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
                                                      <div>{item.nomDecideur + ' / ' + item.email}</div>
                                                    </div>
                                                    <div
                                                      className="col-md-5">
                                                      <div>{item.nomPayeur + ' / ' + item.emailPayeur}</div>
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
                                                        <div>{item.nomDecideur + ' / ' + item.email}</div>
                                                      </div>
                                                      <div
                                                        className="col-md-5">
                                                        <div>{item.nomPayeur + ' / ' + item.emailPayeur}</div>
                                                      </div>
                                                    </div>
                                                  ))
                                                }
                                              </div>


                                            }
                                          </div>
                                        </TabPanel>,

                                        <TabPanel key={1} />,

                                        <TabPanel key={2} />
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
                        if (
                          addfolderRes.succes === true &&
                          addfolderRes.status === 200
                        ) {
                          this.reloadGed();
                          setTimeout(() => {
                            this.setState({
                              newFolderModal: false,
                              newFolderFromRacine: false
                            });
                          }, 500);
                        } else {
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
                    getOptionLabel={(option) => option}
                    renderOption={(option, { selected }) => (
                      <React.Fragment>
                        <MuiCheckbox
                          icon={main_functions.icon}
                          checkedIcon={main_functions.checkedIcon}
                          style={{ marginRight: 8 }}
                          checked={selected}
                        />
                        {option}
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
                      this.state.selectedFile === '' ? (
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
                  this.state.emailsDriveShare.length === 0
                }
                onClick={() => {
                  this.setState({ loading: true, openShareDocModal: false });
                  SmartService.share(
                    this.state.selectedFile === ''
                      ? this.state.selectedFolderId
                      : this.state.selectedFile.id,
                    {
                      to: this.state.emailsDriveShare[0].email,
                      access: {
                        administrate: true,
                        share: true,
                        edit: false,
                        read: true
                      }
                    },
                    localStorage.getItem('token'),
                    localStorage.getItem('usrtoken')
                  )
                    .then((share) => {
                      if (share.succes === true && share.status === 200) {
                        this.setState({
                          loading: false,
                          openShareDocModal: false
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
                    ged_id:"896ca0ed-8b4a-41fd-aeff-8de26ee1bcf9"
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
                            this.state.selectedFolderId !== '' &&
                            formData.append(
                              'folder_id',
                              this.state.selectedFolderId
                            );
                            calls.push(axios.request({
                                method: 'POST', url: data.endpoint + '/ged/896ca0ed-8b4a-41fd-aeff-8de26ee1bcf9/doc/addfile',
                                data: formData,
                                headers: {
                                  'Content-Type': 'multipart/form-data',
                                  'token': localStorage.getItem('token'),
                                  'usrtoken': localStorage.getItem('usrtoken')
                                },
                                onUploadProgress: (p) => {
                                  this.setState({ progressUpload: (p.loaded / p.total) * 100 });
                                }
                              })
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
                  <p style={{ marginBottom: 10 }}>Nom du client</p>
                  <input
                    style={{ minWidth: 300, height: 40 }}
                    type="text"
                    className="form-control"
                    id="nomc"
                    name="nomc"
                    value={this.state.newClient.ContactFullName}
                    onChange={this.handleChange('newClient', 'ContactFullName')} />
                </div>
                <div className="col-md-6">
                  <p style={{ marginBottom: 10 }}>Nom de la société</p>
                  <input
                      style={{ minWidth: 300, height: 40 }}
                      type="text"
                      className="form-control"
                      id="nomc"
                      name="nomc"
                      value={this.state.newClient.Name}
                      onChange={this.handleChange('newClient', 'Name')} />
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
                      value={this.state.newClient.Email}
                      onChange={this.handleChange('newClient', 'Email')} />
                </div>
                <div className="col-md-6">
                  <p style={{ marginBottom: 10 }}>Adresse</p>
                  <input
                      style={{ minWidth: 300, height: 40 }}
                      type="Text"
                      className="form-control"
                      id="nome"
                      name="nome"
                      value={this.state.newClient.Street1}
                      onChange={this.handleChange('newClient', 'Street1')} />
                </div>
              </div>
              <div className="row mt-3">
                <div className="col-md-6">
                  <p style={{ marginBottom: 10 }}>Zip</p>
                  <input
                      style={{ minWidth: 300, height: 40 }}
                      type="text"
                      className="form-control"
                      id="nomt"
                      name="nomt"
                      value={this.state.newClient.Zip}
                      onChange={this.handleChange('newClient', 'Zip')} />
                </div>
                <div className="col-md-6">
                  <p style={{ marginBottom: 10 }}>Ville</p>
                  <input
                      style={{ minWidth: 300, height: 40 }}
                      type="text"
                      className="form-control"
                      id="nomt"
                      name="nomt"
                      value={this.state.newClient.City}
                      onChange={this.handleChange('newClient', 'City')} />
                </div>
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
                      value={this.state.newClient.Phone}
                      onChange={this.handleChange('newClient', 'Phone')} />
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
                disabled={this.state.newClient.Nom === ''}
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