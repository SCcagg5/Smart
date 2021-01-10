import React from 'react';
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
import utilFunctions from "../../tools/functions";
import rethink from "../../controller/rethink";
import test from "../test";
import TableGift from "../../components/Tables/TableGift";
import Popover from '@material-ui/core/Popover';
import verifForms from "../../tools/verifForms"
import {Tree} from "antd";
import Select from 'react-select';
import qualifSignImage from "../../assets/images/qualifiedSign.png"
import AttachFileIcon from '@material-ui/icons/AttachFile';

const {DirectoryTree} = Tree;


const ged_id = "896ca0ed-8b4a-40fd-aeff-7ce26ee1bcf9";
const ent_name = "OaLegal";
const db_name = "OA_LEGAL";
const ENV_CLIENTS_FOLDER_ID = "4376a4bb-d5ec-441f-8868-f9ce96077420"


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
  signatureFileUpload={}

  state = {
    loading: false,
    firstLoading: false,
    loadingGed:true,

    showCadeauModal2:false,
    showCadeauModal1:false,
    bouteilleToCampany:true,
    bouteilles:[],
    nbBouteille:0,
    clientCadeau:{
      nom:"",
      prenom:"",
      email:"",
      id:""
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
    selectedSocietyMenuItem: ['clients'],
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
    clients_cases:[],
    annuaire_clients_mandat: [],
    time_sheets:[],
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
      isActif: "true"
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
    selectedClientTabIndex:0,
    selectedContactTabIndex:0,
    selectedClientFolders:[],
    facturesToValidated:[],
    facturesToValidatedCopy:[],

    openAddContactModal:false,

    anchorElDrive:null,
    anchorElDrive2:null,
    anchorElDrive3:null,
    expandedDrivePopUpKeys:[],
    selectedDrivePopUpKeys:[],
    autoExpandDrivePopUpParent:true,
    destinationFolder:"",

    wip_selected_contact:"",
    wip_selected_folder:"",
    wip_selected_mandat:{
      label:"",
      value:""
    },

    SEQ_file:"",
    signFile_destinationFolder:"",


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
          selectedSocietyMenuItem: ['clients'],
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
      let meeturl = 'https://meet.smartdom.ch/oalegal_' + moment().format('DDMMYYYYHHmmss');
      this.setState({meeturl: meeturl})

        SmartService.getGed(localStorage.getItem('token'), localStorage.getItem('usrtoken'))
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

              let sharedFiles = gedRes.data.Shared.Content.files || [];

              this.setState({
                folders:main_functions.changeStructure(gedRes.data.Proprietary.Content.folders || []),
                reelFolders: gedRes.data.Proprietary.Content.folders || [],
                sharedReelFolders: gedRes.data.Shared.Content.folders || [],
                rootFiles: gedRes.data.Proprietary.Content.files || [],
                rootFolders: gedRes.data.Proprietary.Content.folders || [],
                sharedRootFiles: sharedFiles,
                sharedFolders: sharedFolders,
                loadingGed:false
              })

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
                    selectedRoom: this.state.rooms.length > 0 ? this.state.rooms[0] : '',
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
                  selectedRoom: this.state.rooms.length > 0 ? this.state.rooms[0] : '',
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
                  selectedRoom: this.state.rooms.length > 0 ? this.state.rooms[0] : '',
                  breadcrumbs: 'Mon drive / Partagés avec moi',
                  firstLoading: false,
                  loading: false
                });
              }


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


      //RethinkDB
      rethink.createDB(db_name,"test").then( r1 => {
        if (r1 === true) console.log("NEW DB CREATED");
        if (r1 === false) console.log("DB ALREADY EXIST");

        rethink.tableList(db_name,"test").then(tablesRes => {
          this.setState({tableList:tablesRes || []})

          tablesRes.map((item,key) => {

            rethink.getTableData(db_name,"test",item).then( rr => {

              if(item === "annuaire_clients_mandat"){

                if (this.props.location.pathname.indexOf('/home/clients') > -1) {
                  if (this.props.location.pathname.indexOf('/home/clients/') > -1) {
                    let client_id = this.props.location.pathname.replace('/home/clients/', '');
                    let client = rr.find(x => x.id === client_id);
                    if (client) {
                      this.setState({
                        selectedSociete: client,
                        selectedSocieteKey: client_id,
                        showContainerSection: 'Societe',
                        focusedItem: 'Societe',
                        selectedSocietyMenuItem: ['clients'],
                        openSocietyMenuItem: true,
                        selectedRoom: this.state.rooms.length > 0 ? this.state.rooms[0] : '',
                        firstLoading: false,
                        loading: false
                      });
                    } else {
                      this.props.history.push('/');
                    }
                  } else {
                    this.setState({
                      showContainerSection: 'Societe',
                      focusedItem: 'Societe',
                      selectedSocietyMenuItem: ['clients'],
                      openSocietyMenuItem: true,
                      selectedRoom: this.state.rooms.length > 0 ? this.state.rooms[0] : '',
                      firstLoading: false,
                      loading: false
                    });
                  }
                }
                this.setState({[item]:rr.sort( (a,b) => {
                    let fname1 = a.Nom || '' + ' ' + a.Prenom || ''
                    let fname2 = b.Nom || '' + ' ' + b.Prenom || ''
                    if(fname1.toLowerCase().trim()  < fname2.toLowerCase().trim()) { return -1; }
                    if(fname1.toLowerCase().trim() > fname2.toLowerCase().trim()) { return 1; }
                    return 0;
                  })
                })
              }
              else if(item === "contacts"){
               if (this.props.location.pathname.indexOf('/home/contacts') > -1) {
                  if (this.props.location.pathname.indexOf('/home/contacts/') > -1) {
                    let contact_id = this.props.location.pathname.replace('/home/contacts/', '');
                    let contact = rr.find(x => x.id === contact_id)
                    if (contact) {
                      this.setState({
                        selectedContact: contact,
                        selectedContactKey: contact_id,
                        showContainerSection: 'Contacts',
                        focusedItem: 'Contacts',
                        openContactsMenu: true,
                        selectedRoom: this.state.rooms.length > 0 ? this.state.rooms[0] : '',
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
                      selectedRoom: this.state.rooms.length > 0 ? this.state.rooms[0] : '',
                      firstLoading: false,
                      loading: false
                    });
                  }
                }
                let connected_email = localStorage.getItem("email");
                let oa_contact = main_functions.getOAContactByEmail2(rr,connected_email);
                if(oa_contact){
                  let newTimeSheet = this.state.TimeSheet;
                  newTimeSheet.newTime.utilisateurOA = connected_email;
                  newTimeSheet.newTime.rateFacturation = oa_contact.rateFacturation || "";
                  this.setState({TimeSheet:newTimeSheet,[item]:rr.sort( (a,b) => {
                      var c = a.sort || -1
                      var d = b.sort || -1
                      return c-d;
                    })})
                }
                else{
                  this.setState({[item]:rr.sort( (a,b) => {
                      var c = a.sort || -1
                      var d = b.sort || -1
                      return c-d;
                    })})
                }
              }
              else{
                this.setState({[item]:rr})
              }
            });

            this.getTableChanges('test',db_name,'table("'+item+'")',item);

          });



            if (this.props.location.pathname.indexOf('/home/rooms') > -1) {
              if (this.props.location.pathname.indexOf('/home/rooms/') > -1) {
                if (this.state.rooms.length > 0) {
                  let room_id = this.props.location.pathname.replace('/home/rooms/', '');
                  this.setState({
                    showContainerSection: 'Rooms',
                    focusedItem: 'Rooms',
                    selectedRoomItems: [room_id],
                    expandedRoomItems: [room_id],
                    openRoomMenuItem: true,
                    selectedRoom: this.state.rooms[room_id],
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
                    selectedRoom: '',
                    firstLoading: false,
                    loading: false
                  });
                }
              }else{
                this.setState({
                  showContainerSection: 'Rooms',
                  focusedItem: 'Rooms',
                  selectedRoomItems: [],
                  expandedRoomItems: [],
                  openRoomMenuItem: true,
                  selectedRoom: '',
                  firstLoading: false,
                  loading: false
                });
              }
            }
            else if (this.props.location.pathname === '/home/cadeau_Entx') {
              console.log("gift")
              this.setState({
                showContainerSection: 'Societe',
                focusedItem: 'Societe',
                selectedSocietyMenuItem: ['cadeau_Entx'],
                openSocietyMenuItem: true,
                firstLoading: false,
                loading: false
              });
            }else if(this.props.location.pathname === "/home/qualified_signature/new"){
              this.setState({
                focusedItem: 'SignQualifie',
                firstLoading: false,
                loading: false
              })
            }
            else if (this.props.location.pathname === '/home/meet/new') {
              this.setState({
                showContainerSection: 'Meet',
                focusedItem: 'Meet',
                selectedMeetMenuItem: ['new'],
                openMeetMenuItem: true,
                selectedRoom: this.state.rooms.length > 0 ? this.state.rooms[0] : '',
                firstLoading: false,
                loading: false
              });
            }
            else if (this.props.location.pathname === '/home/meet/rejoin') {
              this.setState({
                showContainerSection: 'Meet',
                focusedItem: 'Meet',
                selectedMeetMenuItem: ['rejoin'],
                openMeetMenuItem: true,
                selectedRoom: this.state.rooms.length > 0 ? this.state.rooms[0] : '',
                firstLoading: false,
                loading: false
              });
            }
            else if (this.props.location.pathname === '/home/timeSheet/activities') {
              this.setState({
                showContainerSection: 'TimeSheet',
                focusedItem: 'TimeSheet',
                selectedTimeSheetMenuItem: ['activities'],
                openTimeSheetsMenu: true,
                selectedRoom: this.state.rooms.length > 0 ? this.state.rooms[0] : '',
                firstLoading: false,
                loading: false
              });
            }
            else if (this.props.location.pathname === '/home/search') {
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
                          selectedRoom: this.state.rooms.length > 0 ? this.state.rooms[0] : '',
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
            }
            else if (this.props.location.pathname.indexOf('/home/search/') > -1) {
              let textToSearch = this.props.location.pathname.replace('/home/search/', '');
              SmartService.search(textToSearch, localStorage.getItem('token'), localStorage.getItem('usrtoken')).then(searchRes => {

                if (searchRes.succes === true && searchRes.status === 200) {
                  this.setState({
                    searchResult: searchRes.data,
                    textSearch: textToSearch,
                    selectedRoom: this.state.rooms.length > 0 ? this.state.rooms[0] : '',
                    firstLoading: false,
                    loading: false
                  });
                } else {
                  console.log(searchRes.error);
                }
              }).catch(err => {
                console.log(err);
              });
            }
            else {
              if(this.props.location.pathname.indexOf('/home/drive/') === -1 && this.props.location.pathname.indexOf('/home/drive') === -1 &&
                  this.props.location.pathname !== '/home/shared/parent' && this.props.location.pathname.indexOf('/home/contacts') === -1 &&
                  this.props.location.pathname.indexOf('/home/clients') === -1){
                console.log('URL ERROR');
                this.props.history.push('/home/drive');
                this.componentDidMount();
              }
            }

        }).catch(err => {console.log(err)})

      }).catch(err => {console.log(err)})

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
          this.openSnackbar("success",item.name+" est bien envoyée au client ")

          if (this.state.bouteilleToCampany===true){
            let nb = client.nbGifts + this.state.bouteilles.length;
            rethink.update("test",'table("annuaire_clients_mandat").get('+JSON.stringify(client.id)+').update({"nbGifts":'+ JSON.stringify(nb) + '})',db_name,false).then( updateRes => {
              if (updateRes && updateRes === true) {
                this.setState({
                  showCadeauModal2:false,
                  showCadeauModal1:false,
                  bouteilleToCampany:true,
                  bouteilles:[],
                  nbBouteille:0,
                  clientCadeau:{
                    nom:"",
                    prenom:"",
                    email:"",
                    id:""
                  }})
              } else {
                this.openSnackbar('error', 'Une erreur est survenue !');
              }
            }).catch(err => {
              this.openSnackbar('error', 'Une erreur est survenue !');
              console.log(err)
            })
          }else{
            this.setState({
              showCadeauModal2:false,
              showCadeauModal1:false,
              bouteilleToCampany:true,
              bouteilles:[],
              nbBouteille:0,
              clientCadeau:{
                nom:"",
                prenom:"",
                email:"",
                id:""
              }})
          }

        }else{
          this.openSnackbar("error","Code erroné !")
        }
      }).catch(err => {
        console.log(err)
        this.openSnackbar("error","Une erreur est survenue ! ")
      })
    })
  }

  getTableChanges(ust_token,db,table,table_name){

    let socket = new WebSocket("wss://api.smartdom.ch/ws/" + ust_token);

    socket.onopen = (e) => {
      console.log("Connection established");
      let payload;
      payload = {"cmd": table, "db": db, "read_change": true}
      socket.send(JSON.stringify(payload));
    };


    socket.onmessage = (event) => {

      let data = this.state[table_name] || [];
      let recieve = JSON.parse(event.data);
      //update
      if(recieve.new_val && recieve.old_val){
        let index_to_updated = data.findIndex(x => x.id === recieve.old_val.id)
        data[index_to_updated] = recieve.new_val;
        this.setState({[table_name]:data})
      }
      //insert
      else if(recieve.new_val){
        data.push(recieve.new_val)
        if(table_name === "annuaire_clients_mandat"){
          this.setState({[table_name]:data.sort( (a,b) => {
              let fname1 = a.Nom || '' + ' ' + a.Prenom || ''
              let fname2 = b.Nom || '' + ' ' + b.Prenom || ''
              if(fname1.toLowerCase().trim()  < fname2.toLowerCase().trim()) { return -1; }
              if(fname1.toLowerCase().trim() > fname2.toLowerCase().trim()) { return 1; }
              return 0;
            })})
        }else{
          this.setState({[table_name]:data})
        }
      }
      //remove
      else if(recieve.old_val){
        data.splice(data.findIndex(x => x.id === recieve.old_val.id),1);
        this.setState({[table_name]:data})
      }
    }
    socket.error = function(event) {
      console.log("ERROR INITIALISIATION TABLE");
    };
    socket.onclose = ( event => {
      this.props.history.push('/login');
      console.log("CLOSED READ CHANGES");
    })
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
    console.log(key)
    return new Promise((resolve) => {
      console.log(key)
      if (children) {
        resolve();
        return;
      }
      let origin = this.state.sharedFolders;
      //this.setState({loading:true})
      SmartService.getFile(key, localStorage.getItem('token'), localStorage.getItem('usrtoken')).then(Res => {
        if(Res.succes === true && Res.status === 200){

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

        }else if(Res.succes === false && Res.status === 400){
          this.setState({ loading: false });
          localStorage.clear();
          this.props.history.push('/login');
        }else{
          this.setState({loading:false})
          resolve();
        }
        }).catch(err => {
        this.setState({loading:false})
          resolve();
          console.log(err)})

    });
  }

  updateShared = (key, origin) => {
    SmartService.getFile(key, localStorage.getItem('token'), localStorage.getItem('usrtoken')).then(Res => {
      if(Res.succes === true && Res.status === 200){
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
      }else if(Res.succes === false && Res.status === 400){
        this.setState({ loading: false });
        localStorage.clear();
        this.props.history.push('/login');
      }else{
        this.setState({ loading: false });
        console.log(Res.error)
      }

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

            let clients_tempo = this.state.clients_cases;
            let findRacine = clients_tempo.find(x => x.folder_id === file.key);
            if(findRacine){

              rethink.remove("test",'table("clients_cases").get('+JSON.stringify(findRacine.id)+').delete()',db_name,false).then(delRes => {
                if (delRes && delRes === true) {

                } else {
                  console.log("error remove clients_cases item")
                }
              }).catch(err => {console.log(err)})
            }else{
              let find_sub_index = -1;
              let itemToUpdated;
              let newFolders ;
              clients_tempo.map((cl,key) => {
                let folders = cl.folders || [];
                if(folders.findIndex(x => x.folder_id === file.key) > -1){
                  itemToUpdated = cl;
                  find_sub_index = folders.findIndex(x => x.folder_id === file.key);
                  newFolders = folders.filter(x => x.folder_id !== file.key);
                  itemToUpdated.folders = newFolders;
                }
              })
              if(find_sub_index > -1){
                rethink.update("test",'table("clients_cases").get('+JSON.stringify(itemToUpdated.id)+').update('+ JSON.stringify(itemToUpdated) + ')',db_name,false).then( updateRes => {
                  if (updateRes && updateRes === true) {

                  }else{
                    console.log("error update clients_cases item")
                  }
                }).catch(err => {console.log(err)})
              }
            }
            this.setState({ selectedFolderId: '' });
            this.props.history.push('/home/drive');
            this.reloadGed();
          }
          this.openSnackbar('success', file.typeF === 'file' ? (file.name || file.title) + '.pdf est supprimé avec succès' : (file.name || file.title) + ' est supprimé avec succès');
        }
        else if(deleteRes.succes === false && deleteRes.status === 400){
          this.setState({ loading: false });
          localStorage.clear();
          this.props.history.push('/login');
        }
        else {
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
        }
        else if(updateNameRes.succes === false && updateNameRes.status === 400){
          this.setState({ loading: false });
          localStorage.clear();
          this.props.history.push('/login');
        }
        else {
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
    let id = this.state.selectedContact.id || (this.state.contacts.find(x => x.uid === this.state.selectedContact.uid)).id;
    console.log(id)
    rethink.update("test",'table("contacts").get('+JSON.stringify(id)+').update('+ JSON.stringify(this.state.selectedContact) + ')',db_name,false).then( updateRes => {
      if(updateRes && updateRes === true){
        this.setState({ loading: false });
        this.openSnackbar('success', 'Modification effectuée avec succès');
      }else{
        this.setState({ loading: false });
        this.openSnackbar("error","Une erreur est survenue !")
      }
    }).catch(err => {
      this.setState({ loading: false });
      console.log(err)
      this.openSnackbar("error","Une erreur est survenue !")
    })
  };

  saveSocietyChanges = () => {
    this.setState({ loading: true });
    let id = this.state.selectedSociete.id || (this.state.annuaire_clients_mandat.find(x => x.ID === this.state.selectedSociete.ID)).id;
    console.log(id)
    rethink.update("test",'table("annuaire_clients_mandat").get('+JSON.stringify(id)+').update('+ JSON.stringify(this.state.selectedSociete) + ')',db_name,false).then( updateRes => {
      if (updateRes && updateRes === true) {
        this.setState({ loading: false });
        this.openSnackbar('success', 'Modification effectuée avec succès');
      } else {
        this.setState({ loading: true });
        this.openSnackbar('error', 'Une erreur est survenue !');
      }
    }).catch(err => {
      this.setState({ loading: true });
      this.openSnackbar('error', 'Une erreur est survenue !');
      console.log(err)
    })
  };

  onInputTimeSuggChange = (event, { newValue }) => {
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

    if(imgToUpload.type === "image/png" || imgToUpload.type === "image/jpeg" || imgToUpload.type === "image/jpg"){
      var reader = new FileReader();
      reader.onloadend = () => {
        let selectedContact = this.state.selectedContact;
        selectedContact.imageUrl = reader.result;

        rethink.update("test",'table("contacts").get('+JSON.stringify(selectedContact.id)+').update('+ JSON.stringify(selectedContact) + ')',db_name,false).then( updateRes => {
          if(updateRes && updateRes === true){
            this.setState({ loading: false });
            this.openSnackbar('success', 'Modification effectuée avec succès');
          }else{
            this.setState({ loading: false });
            this.openSnackbar("error","Une erreur est survenue !")
          }
        }).catch(err => {
          this.setState({ loading: false });
          console.log(err)
          this.openSnackbar("error","Une erreur est survenue !")
        })

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

      }
      else if(addFolderRes.succes === false && addFolderRes.status === 400){
        this.setState({ loading: false });
        localStorage.clear();
        this.props.history.push('/login');
      }
      else {
        this.setState({ loading: false });
        this.openSnackbar('error', addFolderRes.error);
      }
    }).catch(err => {
      this.openSnackbar('error', err);
      this.setState({ loading: false });
      console.log(err);
    });


  };

  uploadSignatureFile = (event) => {
    let file = event.target.files[0];
    if(file.type === "application/pdf"){
      this.setState({SEQ_file:file})
    }else{
      this.setState({ loading: false });
      this.openSnackbar("error","Type de fichier erroné !")
    }
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

    this.verifIsTableExist("rooms").then( v => {

      SmartService.addRoom({ name: room.title, start: moment().add('hour', 1).unix() * 1000, duration: 30 },
          localStorage.getItem('token'), localStorage.getItem('usrtoken')).then(addRoomRes => {
        if (addRoomRes.status === 200 && addRoomRes.succes === true) {
          let members = [];
          //console.log(room.members)
          (room.members || []).map((m,key) => {
            members.push({email:m.email})
          })
          let newRoom={
            uid : addRoomRes.data.id,
            title:room.title,
            created_by:room.created_by,
            created_at:room.created_at,
            members:members
          }
          rethink.insert("test",'table("rooms").insert('+ JSON.stringify(newRoom) + ')',db_name,false).then( resAdd => {
            if (resAdd && resAdd === true) {
              setTimeout(() => {
                this.setState({
                  loading: false,
                  newRoomTitle: '',
                  NewRoomEmails: [],
                  selectedRoom: room,
                  selectedRoomKey: (this.state.rooms.length - 1),
                  selectedRoomItems: [(this.state.rooms.length - 1).toString()]
                });
                this.props.history.push('/home/rooms/' + (this.state.rooms.length - 1));
                this.openSnackbar('success', 'Room ajouté avec succès');
              },1000);
            } else {
              this.setState({ loading: false });
              this.openSnackbar('error', "Une erreur est survenue");
            }
          }).catch(err => {
            console.log(err)
          })

        }
        else if(addRoomRes.succes === false && addRoomRes.status === 400){
          this.setState({ loading: false });
          localStorage.clear();
          this.props.history.push('/login');
        }
        else {
          this.setState({ loading: false });
          this.openSnackbar('error', addRoomRes.error);
        }
      }).catch(err => {
        this.setState({ loading: false });
        this.openSnackbar('error', err);
      });

    }).catch(err => {console.log(err)})
  };

  openPdfModal = (doc_id) => {
    this.setState({ loading: true });
    SmartService.getFile(doc_id, localStorage.getItem('token'), localStorage.getItem('usrtoken')).then(fileRes => {
      if (fileRes.succes === true && fileRes.status === 200) {
        this.setState({ loading: false });
        this.showDocInPdfModal(fileRes.data.Content.Data,fileRes.data.name,fileRes.data.type);
      }
      else if(fileRes.succes === false && fileRes.status === 400){
        this.setState({ loading: false });
        localStorage.clear();
        this.props.history.push('/login');
      }
      else {
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
            loadingGed={this.state.loadingGed}
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
                      : item === "SignQualifie"  ? this.props.history.push('/home/qualified_signature/new') :
                                this.props.history.push('/home/drive');
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
          setShowRoomsMenuItems={() => {
            if(this.state.rooms.length > 0 ){
              this.setState({
                selectedRoom: this.state.rooms[0],
                selectedRoomKey: 0,
                showContainerSection: 'Rooms',
                focusedItem: 'Rooms',
                openRoomMenuItem: !this.state.openRoomMenuItem
              });
            }else{
              this.setState({
                openRoomMenuItem: !this.state.openRoomMenuItem
              })
            }
          }}
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


  renderTimeSheet = () => {

    const inputSuggProps = {
      placeholder: 'Format: --h--',
      value: this.state.TimeSheet.newTime.duree,
      onChange: this.onInputTimeSuggChange
    };
    let new_timeSheet_desc = this.state.TimeSheet.newTime.dossier_client.facturation.language === "Francais" ?
        "Description (français)" : this.state.TimeSheet.newTime.dossier_client.facturation.language === "Anglais" ?
            "Description (anglais)" : "Description"

    let DurationFormatError = "";
    let time = this.state.TimeSheet.newTime.duree;
    let regexFormat = /^[0-9]{1,2}h[0-9]{0,2}$/
    if(regexFormat.test(time) === false){
      DurationFormatError = "Format durée invalide ! Veuillez utiliser le format --h-- "
    }else{
      let duree = utilFunctions.durationToNumber(time);
      if(duree === 0){
        DurationFormatError = "Durée inférieur à zéro !"
      }
    }

    const openDrivePopup2 = Boolean(this.state.anchorElDrive2);
    const id2 = openDrivePopup2 ? 'drive-popover2' : undefined;


    let grouped_mandats_options = [];
    (this.state.clients_cases || []).map((item,key) => {
      grouped_mandats_options.push({
        label:main_functions.getClientNameById(this.state.annuaire_clients_mandat || [],item.ID_client),
        options:
          (item.folders || []).map((folder,key) =>
              ({
                value:folder.folder_id,
                label:folder.name
              }))
      })
    })

    return(
          this.state.time_sheets.length === 0 ?
              <div align="center" style={{marginTop:200}}>
                <CircularProgress color="primary" />
                <h6>Chargement...</h6>
              </div> :
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
                            <Tab>Work in progress</Tab>
                            <Tab>Activités </Tab>
                            <Tab>Partner
                              {
                                (this.state.factures || []).filter(x => x.statut === "wait" && x.partner === localStorage.getItem("email")).length > 0 &&
                                <Badge max={100}>{(this.state.factures || []).filter(x => x.statut === "wait" && x.partner === localStorage.getItem("email")).length}</Badge>
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
                                                onSuggestionSelected={(event, { suggestion }) => {/*console.log(suggestion)*/}}
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
                                          <div className="col-md-12">
                                            {
                                              this.state.TimeSheet.newTime.duree !== "" && DurationFormatError !== "" ?
                                              <h6 style={{color:"red"}}>{DurationFormatError}</h6> :
                                                  this.state.TimeSheet.newTime.rateFacturation !== "" &&
                                                  <span style={{color:"#000",fontWeight:"bold"}}>Total:&nbsp;&nbsp;
                                                    <span>{(parseFloat(this.state.TimeSheet.newTime.rateFacturation) * utilFunctions.durationToNumber(this.state.TimeSheet.newTime.duree)).toFixed(2) + " CHF"}</span>
                                                  </span>
                                            }
                                          </div>

                                        </div>
                                      </div>
                                      <div className="col-md-6">
                                        <div>
                                          <h5>Nom du client</h5>
                                          <div style={{ display: 'flex' }}>
                                            <SelectSearch
                                                options={
                                                  this.state.annuaire_clients_mandat.map(({ Nom, Prenom, Type, imageUrl, ID }) =>
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
                                                  let findClientTempo = this.state.clients_cases.find(x => x.ID_client === e)
                                                  let findClientFname = this.state.annuaire_clients_mandat.find(x => x.ID === e)
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
                                                  setTimeout(() => {
                                                    console.log(this.state.selectedClientFolders)
                                                  },400)
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
                                          <h6>Utilisateur </h6>
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
                                            isDisabled={this.state.TimeSheet.newTime.duree === '' ||  this.state.TimeSheet.newTime.description === '' ||
                                            this.state.TimeSheet.newTime.rateFacturation === '' || this.state.selectedClientTimeEntree === '' || this.state.TimeSheet.newTime.utilisateurOA === '' }
                                            style={{ margin: 20 }}> Enregistrer </AtlButton>
                                        <AtlButton
                                            onClick={() => {
                                              this.createLignefacture(true)
                                            }}
                                            appearance="primary"
                                            isDisabled={this.state.TimeSheet.newTime.duree === '' || this.state.TimeSheet.newTime.description === '' ||
                                            this.state.TimeSheet.newTime.rateFacturation === '' || this.state.selectedClientTimeEntree === '' || this.state.TimeSheet.newTime.utilisateurOA === '' }
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
                                                    this.state.annuaire_clients_mandat.map(({ Nom, Prenom, Type, imageUrl }) =>
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

                                                    let find_annuaire_fact_lead = this.state.annuaire_clients_mandat.find(x => (x.Nom + ' ' + x.Prenom) === e);
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
                            <div style={{marginTop:25}}>
                              <div className="row">
                                <div className="col-md-4">
                                  <div>
                                    <h6>Mandats</h6>
                                  </div>
                                  <Select
                                      value={this.state.wip_selected_mandat}
                                      options={grouped_mandats_options}
                                      onChange={(newValue, actionMeta) => {
                                        console.log(newValue)
                                        this.setState({wip_selected_mandat:newValue})
                                      }}
                                  />
                                </div>
                                <div className="col-md-6">
                                  <div>
                                    <h6>Sélectionner un avocat </h6>
                                  </div>
                                  <MuiSelect
                                      labelId="demo-simple-select-label45845"
                                      id="demo-simple-select45845"
                                      style={{ width: 300 }}
                                      onChange={(e) => {
                                        this.setState({wip_selected_contact:e.target.value})
                                      }}
                                      value={this.state.wip_selected_contact}
                                  >
                                    {this.state.contacts.map((contact, key) => (
                                        <MenuItem
                                            key={key}
                                            value={contact.id}>
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
                              <div className="row mt-2">
                                <div className="col-md-12">
                                  <div>
                                    <h6>Dossier de destination</h6>
                                    <input type="text" readOnly={true}
                                           className="form-control custom-select"
                                           style={{ width: 300,cursor:"pointer",height:40 }}
                                           value={this.state.wip_selected_folder.title}
                                           onClick={(e) => {
                                             this.setState({anchorElDrive2:e.currentTarget})
                                           }}
                                    />
                                  </div>
                                </div>
                              </div>
                              <div align="center" className="mt-2">
                                <AtlButton
                                    isDisabled={this.state.wip_selected_mandat === "" || this.state.wip_selected_folder === ""}
                                    appearance="primary"
                                    onClick={() => {
                                      this.reportContact()
                                    }}
                                >
                                  Générer le rapport
                                </AtlButton>
                              </div>
                              <Popover
                                  id={id2}
                                  open={openDrivePopup2}
                                  anchorEl={this.state.anchorElDrive2}
                                  onClose={() => {
                                    this.setState({anchorElDrive2: null})
                                  }}
                                  anchorOrigin={{
                                    vertical: 'top',
                                    horizontal: 'center',
                                  }}
                                  transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'center',
                                  }}
                              >
                                <div style={{padding:15,height:600,width:300,paddingBottom:50}}>
                                  <div align="right">
                                    <IconButton size="small" onClick={() => {
                                      this.setState({anchorElDrive2:null,expandedDrivePopUpKeys:[],selectedDrivePopUpKeys:[],wip_selected_folder:""})
                                    }}
                                    >
                                      <CloseIcon />
                                    </IconButton>
                                  </div>

                                  <h6 style={{color:"darkblue"}}>Sélectionner un dossier de destination </h6>
                                  <div style={{marginTop:20,maxHeight:430,overflowY:"auto"}}>
                                    <DirectoryTree
                                        draggable={true}
                                        allowDrop={(options) => {
                                          return false
                                        }}
                                        showIcon={true}
                                        onExpand={this.onExpandDrivePopUp}
                                        onSelect={this.onSelectDrivePopUp2}
                                        treeData={this.state.folders || []}
                                        expandAction="click"
                                        expandedKeys={this.state.expandedDrivePopUpKeys}
                                        selectedKeys={this.state.selectedDrivePopUpKeys}
                                        autoExpandParent={this.state.autoExpandDrivePopUpParent}
                                    />
                                  </div>
                                  <div style={{position:"absolute",bottom:50}}>
                                    <span style={{color:"#000",fontWeight:"bold"}}>Dossier sélectionné:&nbsp; <span>{this.state.wip_selected_folder.title}</span> </span>
                                  </div>
                                  <div align="right" style={{position:"absolute",bottom:10,right:15}}>
                                    <AtlButton
                                        isDisabled={this.state.wip_selected_folder === ""}
                                        appearance="primary"
                                        onClick={() => {
                                          this.setState({anchorElDrive2:null})
                                        }}
                                    >
                                      Valider
                                    </AtlButton>
                                  </div>
                                </div>
                              </Popover>
                            </div>
                          </TabPanel>
                          <TabPanel>
                            {
                              this.state.time_sheets.length > 0 &&
                              <TableTimeSheet
                                  lignesFactures={this.state.time_sheets || []}
                                  lignesFacturesCopy={this.state.time_sheets || []}
                                  deleteLigneFacture={(id) => this.deleteLigneFacture(id)}
                                  setLignesFactures={(lignes_factures) => this.setState({ lignesFactures: lignes_factures })}
                                  OA_contacts={this.state.contacts}
                                  annuaire_clients_mandat={this.state.annuaire_clients_mandat}
                                  onClickFacture={(client,client_folder,facture_date,partner,lignes_facture) => {
                                    this.addFactureToValidated(client,client_folder,facture_date,localStorage.getItem("email"),
                                        partner,lignes_facture)
                                  }}
                                  client_folders={this.state.client_folders}
                                  updateLigneFacture={(id,ligne) => this.updateLigneFacture(id,ligne)}
                                  openSnackbar={(type,msg) => this.openSnackbar(type,msg)}
                                  clientsTempo={this.state.clients_cases}
                                  updateAllLigneFacture={(data) => this.updateAllLigneFacture(data)}
                              />
                            } {
                            this.state.time_sheets.length === 0 &&
                            <div style={{
                              marginTop: 30,
                              marginLeft: 10
                            }}>Aucune ligne facture encore ajoutée !</div>

                          }
                          </TabPanel>
                          <TabPanel>
                            <h4 style={{marginTop:20,marginBottom:15}}>Factures à valider</h4>
                            <TableFactures factures={this.state.factures}
                                           facturesCp={this.state.factures}
                                           client_folders={this.state.client_folders}
                                           clients_tempo={this.state.clients_cases}
                                           annuaire_clients_mandat={this.state.annuaire_clients_mandat}
                                           sharedFolders={this.state.sharedReelFolders || []}
                                           validateFacture={(row,key,template,client,paymTerm,deadline_date) => {
                                             this.before_create_facture(row.created_at, row.lignes_facture,row.client_folder.id,row,template,client,paymTerm,deadline_date);
                                           }}
                                           openFacture={(id) => {
                                             this.openPdfModal(id)
                                           }}
                                           openFactureFolder={(id) => {
                                             this.redirectToFolder(id)
                                           }}
                                           delete_facture={(id) => {
                                             this.delete_facture(id)
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
    )

  }


  reportContact(){
    this.setState({loading:true})
    let contact_timeSheets = [];
    contact_timeSheets = (this.state.time_sheets || []).filter(x => x.newTime.dossier_client.folder_id === this.state.wip_selected_mandat.value)

    let contact = main_functions.getContactById(this.state.contacts || [],this.state.wip_selected_contact)
    if(contact){
      contact_timeSheets = (contact_timeSheets || []).filter(x => x.newTime.utilisateurOA === contact.email)
    }
    let toSend = {
      avocat:contact,
      data:contact_timeSheets,
      folder:this.state.wip_selected_folder.key
    }
    console.log(toSend)
    SmartService.reportContact(toSend,localStorage.getItem("token"),localStorage.getItem("usrtoken")).then( reportRes => {
      if(reportRes.succes === true && reportRes.status === 200){
        this.setState({loading:false})
        this.openSnackbar("success","Opération effectué avec succès")
      }else{
        this.setState({loading:false})
        this.openSnackbar("error",reportRes.error)
      }
    }).catch(err => {
      this.setState({loading:false})
      console.log(err)
      this.openSnackbar("error","Une erreur est survenue !")
    })
  }

  reportClient(){
    this.setState({loading:true,anchorElDrive:null})
    let s_client = this.state.selectedSociete;
    let client_mandats = (this.state.clients_cases || []).find(x => x.ID_client === s_client.ID);
    let toSend = {
      folder:this.state.destinationFolder.key,
      client:{
        id:this.state.selectedSociete.id,
        type:this.state.selectedSociete.Type,
        nom:this.state.selectedSociete.Nom,
        prenom:this.state.selectedSociete.Prenom,
        email:this.state.selectedSociete.email,
        adress:this.state.selectedSociete.adress,
        phone:this.state.selectedSociete.phone,
        isActif:this.state.selectedSociete.isActif,
        created_at:this.state.selectedSociete.created_at,
        remarques:this.state.selectedSociete.remarque,
        dossiers:client_mandats ? client_mandats.folders || [] : []
      }
    }
    SmartService.reportClient(toSend,localStorage.getItem("token"),localStorage.getItem("usrtoken")).then( reportRes => {
      if(reportRes.succes === true && reportRes.status === 200){
        this.setState({loading:false})
        this.openSnackbar("success","Opération effectué avec succès")
      }else{
        this.setState({loading:false})
        this.openSnackbar("error",reportRes.error)
      }
    }).catch(err => {
      this.setState({loading:false})
      console.log(err)
      this.openSnackbar("error","Une erreur est survenue !")
    })
    console.log(toSend)
  }


  addFactureToValidated(client,client_folder,date,createdBy,partnerEmail,lignes_facture){
    this.setState({loading:true})

    this.verifIsTableExist("factures").then( v => {

      let newItem = {
        ID:utilFunctions.getUID(),
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
      }

      rethink.insert("test",'table("factures").insert('+ JSON.stringify(newItem) + ')',db_name,false).then( resAdd => {
        if (resAdd && resAdd === true) {
          this.setState({partnerFacture:"",loading:false})
          this.openSnackbar("success","La facture est bien envoyé au partner pour validation")
        } else {
          this.setState({partnerFacture:"",loading:false})
          this.openSnackbar("error","Une erreur est survenue !")
        }
      }).catch(err => {
        this.setState({partnerFacture:"",loading:false})
        this.openSnackbar("error","Une erreur est survenue !")
      })

    }).catch(err => {console.log(err)})
  }

  redirectToFolder(folder_id){
    this.props.history.push("/home/drive/"+folder_id);
    this.reloadGed()
  }

  before_create_facture(facture_date,lignes_f,folder_id,facture,template,client,paymTerm,deadline_date){
    this.setState({loading:true})

    let odoo_companies = this.state.odoo_companies || [];
    let facture_company_id;
    let findCompany = odoo_companies.find(x => x.client_id === facture.client_id );

    if(findCompany){
      facture_company_id = findCompany.odoo_company_id;
      this.createFacture(facture_date,lignes_f,folder_id,facture,template,client,facture_company_id,paymTerm,deadline_date)

    }else{

      SmartService.create_company(localStorage.getItem('token'), localStorage.getItem('usrtoken'), { param: { name: facture.client } }).then(newCompRes => {
        if(newCompRes.succes === true && newCompRes.status === 200){
          facture_company_id = newCompRes.data.id;
          this.verifIsTableExist("odoo_companies").then( v => {
            let newItem = {
              odoo_company_id:facture_company_id,
              client_name:facture.client,
              client_id:facture.client_id,
              created_at:moment().format("YYYY-MM-DD HH:mm:ss")
            }
            rethink.insert("test",'table("odoo_companies").insert('+ JSON.stringify(newItem) + ')',db_name,false).then( resAdd => {
              if (resAdd && resAdd === true) {

                this.createFacture(facture_date,lignes_f,folder_id,facture,template,client,facture_company_id,paymTerm,deadline_date)

              }else{
                this.setState({loading:false})
                this.openSnackbar("error","Une erreur est survenue !")
                console.log(newCompRes.error)
              }
            }).catch(err => {console.log(err)})
          }).catch(err => console.log(err))

        }
        else if(newCompRes.succes === false && newCompRes.status === 400){
          this.setState({ loading: false });
          localStorage.clear();
          this.props.history.push('/login');
        }
        else{
          this.setState({loading:false})
          this.openSnackbar("error","Une erreur est survenue !")
          console.log(newCompRes.error)
        }
      }).catch(err => {
        this.setState({loading:false})
        this.openSnackbar("error","Une erreur est survenue !")
        console.log(err)
      })

    }
  }

  createFacture(facture_date,lignes_f,folder_id,facture,template,client,facture_company_id,paymTerm,deadline_date) {
    let id_facture = facture.id

    let lignes_factures = lignes_f;
    let total = 0;
    lignes_factures.map((ligne, key) => {
      total = total + (ligne.newTime.duree * parseFloat(ligne.newTime.rateFacturation));
    })
    let acces_token = utilFunctions.getUID();

    let odoo_data = [{
      'access_token': acces_token,
      'type': 'out_invoice',
      /*'invoice_sent': false,*/
      "move_name":false,  //false
      "user_id":6,
      "team_id":1,
      "comment":false,
      'l10n_ch_isr_sent': false,
      'name': false,   //on peut mettre une petite desc sous le titre de la facture avec ce champs
      'date_invoice': moment(facture_date).format('YYYY-MM-DD'),
      'date_due': moment(deadline_date).format('YYYY-MM-DD'),
      'journal_id': 1,
      'currency_id': 5,
      'invoice_user_id': 3,
      'invoice_incoterm_id': false,
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
      'partner_id': facture_company_id,
      'invoice_vendor_bill_id': false,
      'invoice_payment_term_id': 1,
      'invoice_date_due': moment(deadline_date).format('YYYY-MM-DD'),
      'company_id': 1,
      'amount_untaxed': 0,
      'amount_by_group': [],
      'amount_total': 0,
      'invoice_payments_widget': 'False',
      'amount_residual': 0,
      'invoice_outstanding_credits_debits_widget': false,
      /*'narration': false,*/
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
      /*"kwargs":{
        "context":{
          "lang":"fr_CH",
          "tz":false,
          "uid":8,
          "type":"out_invoice",
          "journal_type":"sale",
          "model":"account.invoice.confirm"
        }
      },*/
      "reference_type":"none",
      "incoterm_id":false,
      "sequence_number_next":false,
      "partner_shipping_id":facture_company_id,
      "payment_term_id":paymTerm,
    }];

    lignes_factures.map((ligne, key) => {
      let OAContact = main_functions.getOAContactByEmail2(this.state.contacts,ligne.newTime.utilisateurOA);
      odoo_data[0].invoice_line_ids.push(
          [
            0,
            'virtual_' + (Math.floor(100 + Math.random() * 900)).toString(),
            {
              "account_analytic_id":false,
              'account_id': 101,  //103
              "currency_id":5,
              'discount': 0,
              'display_type': false,
              'is_rounding_line': false,
              'name':
                  template === '0' ? moment(ligne.newTime.date).format('DD/MM/YYYY') :
                      template === '1' ? moment(ligne.newTime.date).format('DD/MM/YYYY') + '; ' + ligne.newTime.description :
                          template === '2' ? moment(ligne.newTime.date).format('DD/MM/YYYY') + ' ; ' + OAContact.nom + ' ' + OAContact.prenom :
                              template === '3' ? moment(ligne.newTime.date).format('DD/MM/YYYY') + '; ' + ligne.newTime.description + ' ; ' + OAContact.nom + ' ' + OAContact.prenom :
                                  template === '4' ? ligne.newTime.description :
                                      template === '5' ? OAContact.nom + ' ' + OAContact.prenom :
                                          template === '6' ? ligne.newTime.duree.toFixed(2) + ' Heures' :
                                              template === '7' ? ligne.newTime.description + ' ; ' + OAContact.nom + ' ' + OAContact.prenom :
                                                  template === '8' ? ligne.newTime.description + ' ; ' + ligne.newTime.duree.toFixed(2) + ' Heures' :
                                                      template === '9' ? ligne.newTime.description + ' ; ' + OAContact.nom + ' ' + OAContact.prenom + ' ; ' + ligne.newTime.duree.toFixed(2) + ' Heures' : ligne.newTime.description,
              'origin': false,
              'price_unit': parseFloat(ligne.newTime.rateFacturation),
              'product_id': 1,  //2
              'quantity': ligne.newTime.duree,
              'sequence': 10,
              "uom_id":1,
              'invoice_line_tax_ids': [
                [
                  6,
                  false,
                  ligne.tax && ligne.tax !== "" ? [ligne.tax] : []
                ]
              ],
              'analytic_tag_ids': [
                [
                  6,
                  false,
                  []
                ]
              ],
            }
          ]
      );
    });

    SmartService.create_facture_odoo(localStorage.getItem('token'), localStorage.getItem('usrtoken'), { data: odoo_data }).then(createFactRes => {
      console.log(createFactRes)
      if(createFactRes.succes === true && createFactRes.status === 200){

        SmartService.validate_facture_odoo(localStorage.getItem('token'), localStorage.getItem('usrtoken'),
            { data: [[createFactRes.data.id],{journal_type: "sale",lang: "fr_CH",type: "out_invoice",tz: false,uid: 8}] }).then(validateRes => {
          console.log(validateRes)
          if(validateRes.succes === true && validateRes.status === 200){

            SmartService.generate_facture_odoo(localStorage.getItem('token'), localStorage.getItem('usrtoken'),createFactRes.data.id,acces_token).then(genFactRes => {

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

                            let updatedItem = facture;
                            updatedItem.statut = "accepted";
                            updatedItem.file_id = ok.data.file_id;
                            updatedItem.client_folder = {id:client, name:resF.data.name}

                            rethink.update("test",'table("factures").get('+JSON.stringify(id_facture)+').update('+ JSON.stringify(updatedItem) + ')',db_name,false).then( updateRes => {
                              if (updateRes && updateRes === true) {

                                this.justReloadGed();
                                this.setState({loading:false})
                                this.openSnackbar("success","La facture est bien validée et placée dans le dossier COMPTABILITE du client")

                              } else {
                                this.setState({loading:false})
                                this.openSnackbar("error","Une erreur est survenue !")
                              }
                            }).catch(err => {
                              this.setState({loading:false})
                              this.openSnackbar("error","Une erreur est survenue !")
                              console.log(err)
                            })

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
            console.log(validateRes.error)
          }
        }).catch(err => {
          console.log(err)
        })

      }
      else if(createFactRes.succes === false && createFactRes.status === 400){
        this.setState({ loading: false });
        localStorage.clear();
        this.props.history.push('/login');
      }
      else{
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

  generateClientFolder(ID, team) {

    this.setState({ loading: true });

    let verif_access = false;

    if(localStorage.getItem("client_folder_id") || localStorage.getItem("client_shared_folder_id")  )
      verif_access = true;

    if(verif_access === true){

      let CLIENTS_folder_id = ENV_CLIENTS_FOLDER_ID  //c79fcab6-9fec-4714-9572-7e36eb6761b3 => Krana   //4376a4bb-d5ec-441f-8868-f9ce96077420 => Fabien

      let clients_tmp = this.state.clients_cases;
      let find = clients_tmp.find(x => x.ID_client === ID);

      if (find) {

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
                      byEmail:JSON.stringify(this.state.newClientFolder.byEmail),
                      sentBySecr:JSON.stringify(this.state.newClientFolder.sentBySecr),
                      sentByAvocat:JSON.stringify(this.state.newClientFolder.sentByAvocat),
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
                  byEmail:JSON.stringify(this.state.newClientFolder.byEmail),
                  sentBySecr:JSON.stringify(this.state.newClientFolder.sentBySecr),
                  sentByAvocat:JSON.stringify(this.state.newClientFolder.sentByAvocat),
                  language:this.state.newClientFolder.language,
                  frequence:this.state.newClientFolder.frequence
                }
              }]
            }

            rethink.update("test",'table("clients_cases").get('+JSON.stringify(findCopy.id)+').update('+ JSON.stringify(findCopy) + ')',db_name,false).then( updateRes => {
              if (updateRes && updateRes === true) {

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

              }else{
              }
            }).catch(err => {console.log(err)})

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
                    byEmail:JSON.stringify(this.state.newClientFolder.byEmail),
                    sentBySecr:JSON.stringify(this.state.newClientFolder.sentBySecr),
                    sentByAvocat:JSON.stringify(this.state.newClientFolder.sentByAvocat),
                    language:this.state.newClientFolder.language,
                    frequence:this.state.newClientFolder.frequence
                  }
                }
              ];

              rethink.update("test",'table("clients_cases").get('+JSON.stringify(findCopy.id)+').update('+ JSON.stringify(findCopy) + ')',db_name,false).then( updateRes => {
                if (updateRes && updateRes === true) {

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

                }else{
                }
              }).catch(err => {console.log(err)})

            }).catch(err => console.log(err))
          }).catch(err => console.log(err))

        }
      }

      else {

        this.verifIsTableExist("clients_cases").then( v => {

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

                  let newItem = {
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
                          byEmail:JSON.stringify(this.state.newClientFolder.byEmail),
                          sentBySecr:JSON.stringify(this.state.newClientFolder.sentBySecr),
                          sentByAvocat:JSON.stringify(this.state.newClientFolder.sentByAvocat),
                          language:this.state.newClientFolder.language,
                          frequence:this.state.newClientFolder.frequence
                        }
                      }
                    ]
                  }

                  rethink.insert("test",'table("clients_cases").insert('+ JSON.stringify(newItem) + ')',db_name,false).then( resAdd => {
                    if (resAdd && resAdd === true) {

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

                    }else{

                    }
                  }).catch(err => {console.log(err)})

                }).catch(err => {
                  console.log(err);
                });
              }).catch(err => {
                console.log(err);
              });

            }
            else if(createClientRes.succes === false && createClientRes.status === 400){
              this.setState({ loading: false });
              localStorage.clear();
              this.props.history.push('/login');
            }
            else{
              this.setState({ loading: false });
              console.log(createClientRes.error)
              this.openSnackbar("error",createClientRes.error)
            }

          }).catch(err => {
            this.setState({ loading: false });
            this.openSnackbar("error","Une erreur est survenue !")
            console.log(err);
          });

        }).catch(err => {console.log(err)})
      }

    }else{
      this.setState({ loading: false });
      alert("Vous n'avez pas les droits et l'accès au dossier CLIENTS pour effectuer cette opération !")
    }




  }

  async verifIsTableExist(table){
    let tableList = this.state.tableList || [];
    if(tableList.includes(table) === true){
      console.log("TABLE EXIST")
      return true;
    }else{
      console.log("CREATE TABLE")
      tableList.push(table);
      this.setState({tableList:tableList})
      let verif =  await rethink.createTable(db_name, table, "test");
      this.getTableChanges('test',db_name,'table("'+table+'")',table)
      return verif;
    }
  }

  addNewClient() {
    this.setState({loading: true, openNewClientModal: false });

    this.verifIsTableExist("annuaire_clients_mandat").then( v => {

      let newClient = this.state.newClient;
      newClient.ID = utilFunctions.getUID();
      newClient.created_at = moment().format("YYYY-MM-DD HH:mm:ss");

      rethink.insert("test",'table("annuaire_clients_mandat").insert('+ JSON.stringify(newClient) + ')',db_name,false).then( resAdd => {
        if (resAdd && resAdd === true) {
          this.openSnackbar('success', newClient.Nom + ' est ajouté avec succès ');
          setTimeout(() => {
            let findNew = this.state.annuaire_clients_mandat.find(x => x.ID === newClient.ID )
            this.props.history.push('/home/clients/' + (findNew.id || findNew.ID));
            this.setState({
              loading: false,
              selectedSociete: findNew,
              selectedSocieteKey: findNew.id || findNew.ID
            });
          },500);
          setTimeout(() => {
            this.setState({
              newClient: { ID: '', Nom: '', Prenom:'', Type: '0', created_at: '', country: '', email: '', phone: '', isActif: "true" }
            });
          }, 250);

        } else {
          this.setState({loading:false})
          this.openSnackbar("error","Une erreur est survenue !")
        }
      }).catch(err => {
        this.setState({loading:false})
        this.openSnackbar("error","Une erreur est survenue !")
        console.log(err)
      })

    }).catch(err => {console.log(err)})
  }

  addNewContact(){
    this.setState({ firstLoading: true, loading: true, openAddContactModal: false });

    this.verifIsTableExist("contacts").then( v => {

      let newContact = this.state.newContact;
      newContact.uid = utilFunctions.getUID();
      newContact.created_at = moment().format("YYYY-MM-DD HH:mm:ss")
      newContact.sort = this.state.contacts.length

      rethink.insert("test",'table("contacts").insert('+ JSON.stringify(newContact) + ')',db_name,false).then( resAdd => {
        if(resAdd && resAdd === true){

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

        }else{
          this.openSnackbar("error","Une erreur est survenue !")
        }
      })

    }).catch(err => {console.log(err)})
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
    let objCopy = this.state.TimeSheet;
    let time = this.state.TimeSheet.newTime.duree;
    let regexFormat = /^[0-9]{1,2}h[0-9]{0,2}$/
    if(regexFormat.test(time) === true){

      let duree = utilFunctions.durationToNumber(time);

      if(duree === 0){
        this.openSnackbar('error', 'La durée doit etre supérieur à zéro !');
      }else{
        this.setState({loading:true})
        this.verifIsTableExist("time_sheets").then( v => {

          let newItem = {
            newTime: {
              date:moment(this.state.TimeSheet.newTime.date).format('YYYY-MM-DD HH:mm:ss'),
              duree: duree,
              client: this.state.TimeSheet.newTime.client,
              client_id:this.state.selectedClientTimeEntree,
              dossier_client:this.state.TimeSheet.newTime.dossier_client,
              categoriesActivite: this.state.TimeSheet.newTime.categoriesActivite,
              description: this.state.TimeSheet.newTime.description,
              utilisateurOA: this.state.TimeSheet.newTime.utilisateurOA,
              rateFacturation: this.state.TimeSheet.newTime.rateFacturation,
              langue:''
            },
            uid:utilFunctions.getUID(),
            user_email:localStorage.getItem('email'),
            created_at:moment().format('YYYY-MM-DD HH:mm:ss')
          }
          if(duplicate === false){
            this.setState({
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
                  utilisateurOA: objCopy.newTime.utilisateurOA,
                  rateFacturation: objCopy.newTime.rateFacturation
                }
              }
            });
          }
          else{
            this.setState({
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
          rethink.insert("test",'table("time_sheets").insert('+ JSON.stringify(newItem) + ')',db_name,false).then( resAdd => {
            if (resAdd && resAdd === true) {
              this.setState({loading:false})
              this.openSnackbar('success', 'Enregistrement effectué avec succès');
            } else {
              this.setState({loading:false})
              this.openSnackbar("error","Une erreur est survenue !");
            }
          }).catch(err => {
            this.setState({loading:false})
            this.openSnackbar("error","Une erreur est survenue !");
            console.log(err)
          })



        }).catch(err => {console.log(err)})
      }
    }else{
      this.openSnackbar('error', 'Le format de la durée est invalide ! Veuillez utiliser le format --h--');
    }

  }

  updateLigneFacture(id,ligne){

    rethink.update("test",'table("time_sheets").get('+JSON.stringify(id)+').update('+ JSON.stringify(ligne) + ')',db_name,false).then( updateRes => {
      if (updateRes && updateRes === true) {
        this.openSnackbar("success","Modification effectuée avec succès")
      } else {
        this.openSnackbar("error","Une erreur est survenue !")
      }
    }).catch(err => {
      this.openSnackbar("error","Une erreur est survenue !")
    })
  }

  deleteLigneFacture(id){
    this.setState({loading:true})
    rethink.remove("test",'table("time_sheets").get('+JSON.stringify(id)+').delete()',db_name,false).then(delRes => {
      if(delRes && delRes === true){
        this.setState({loading:false})
        this.openSnackbar("success","Suppression effectuée  avec succès")
      }else{
        this.setState({loading:false})
        this.openSnackbar("error","Une erreur est survenue !")
      }
    }).catch(err => {
      this.setState({loading:false})
      this.openSnackbar("error","Une erreur est survenue !")
      console.log(err)
    })
  }

  delete_annuaire_client_mandat(id){
    this.setState({loading:true})
    rethink.remove("test",'table("annuaire_clients_mandat").get('+JSON.stringify(id)+').delete()',db_name,false).then(delRes => {
      if(delRes && delRes === true){
        this.setState({loading:false})
        this.openSnackbar("success","Suppression effectuée  avec succès")
      }else{
        this.setState({loading:false})
        this.openSnackbar("error","Une erreur est survenue !")
      }
    }).catch(err => {
      this.setState({loading:false})
      this.openSnackbar("error","Une erreur est survenue !")
      console.log(err)
    })
  }

  delete_client_case(id){
    rethink.remove("test",'table("clients_cases").get('+JSON.stringify(id)+').delete()',db_name,false).then(delRes => {
      if(delRes && delRes === true){

      }else{
        console.log("Une erreur est survenue !")
      }
    }).catch(err => {
      console.log("Une erreur est survenue !")
      console.log(err)
    })
  }

  delete_facture(id){
    this.setState({loading:true})
    rethink.remove("test",'table("factures").get('+JSON.stringify(id)+').delete()',db_name,false).then(delRes => {
      if(delRes && delRes === true){
        this.setState({loading:false})
        this.openSnackbar("success","Suppression effectuée  avec succès")
      }else{
        this.setState({loading:false})
        this.openSnackbar("error","Une erreur est survenue !")
      }
    }).catch(err => {
      this.setState({loading:false})
      this.openSnackbar("error","Une erreur est survenue !")
      console.log(err)
    })
  }

  addNewRoomTask(title, selectedClient, assignedTo, team, selectedDateTime){
    let room = this.state.selectedRoom;
    let tasks = room.tasks || [];
    let teamCp = [];
    team.map((t,key) => {
      teamCp.push({
        avatar:t.avatar || "",
        email:t.email,
        fname:t.fname || ""
      })
    })
    tasks.push({
      uid:utilFunctions.getUID(),
      title: title,
      assignedTo: assignedTo,
      team: teamCp,
      dateTime: selectedDateTime,
      clientAttribution: selectedClient,
      created_at:moment().format("YYYY-MM-DD HH:mm:ss")
    });
    room.tasks = tasks;
    console.log(room)

    rethink.update("test",'table("rooms").get('+JSON.stringify(room.id)+').update('+ JSON.stringify(room) + ')',db_name,false).then( updateRes => {
      if(updateRes && updateRes === true){

        this.setState({ selectedRoom: room });
        let emails = [];
        let teamNames = [];
        team.map((t, key) => {
          emails.push(t.email);
          teamNames.push(t.fname);
        });
        emails.push(assignedTo.email);
        /*maillingService.sendCustomMailsWithUrl({
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
            .then((ok) => {}).catch((err) => {
          this.openSnackbar('error', 'L\'envoi du mail de notification à été échoué ! ');
        });*/
        this.openSnackbar('success', 'Une notification par mail à été bien envoyé au Lead et au différents membre du Team');
      }else{
        this.openSnackbar("error","Une erreur est survenue !")
      }
    })
  }

  deleteContact(id){
    this.setState({loading:true})
    rethink.remove("test",'table("contacts").get('+JSON.stringify(id)+').delete()',db_name,false).then(delRes => {
      if(delRes && delRes === true){
        this.setState({loading:false})
        this.openSnackbar("success","Contact supprimé avec succès")
      }else{
        this.setState({loading:false})
        this.openSnackbar("error","Une erreur est survenue !")
      }
    }).catch(err => {
      this.setState({loading:false})
      this.openSnackbar("error","Une erreur est survenue !")
      console.log(err)
    })
  }

  update_client_case(id,data){
    rethink.update("test",'table("clients_cases").get('+JSON.stringify(id)+').update('+ JSON.stringify(data) + ')',db_name,false).then( updateRes => {
      if (updateRes && updateRes === true) {
        this.openSnackbar("success","Modification effectuée avec succès")
      } else {
        this.openSnackbar("error","Une erreur est survenue !")
      }
    }).catch(err => {
      this.openSnackbar("error","Une erreur est survenue !")
    })
  }


  onExpandDrivePopUp = (expandedKeys) => {
    this.setState({expandedDrivePopUpKeys:expandedKeys,autoExpandDrivePopUpParent:false})
  }

  onSelectDrivePopUp = (selectedKeys, info) => {
    this.setState({selectedDrivePopUpKeys:selectedKeys,destinationFolder:info.node})
  }

  onSelectDrivePopUp2 = (selectedKeys, info) => {
    this.setState({selectedDrivePopUpKeys:selectedKeys,wip_selected_folder:info.node})
  }

  onSelectDrivePopUp3 = (selectedKeys, info) => {
    this.setState({selectedDrivePopUpKeys:selectedKeys,signFile_destinationFolder:info.node})
  }


  render() {

    const current_user_contact = main_functions.getOAContactByEmail2(this.state.contacts,localStorage.getItem("email"))

    const openDrivePopup = Boolean(this.state.anchorElDrive);
    const id = openDrivePopup ? 'drive-popover' : undefined;

    const openDrivePopup3 = Boolean(this.state.anchorElDrive3);
    const id3 = openDrivePopup3 ? 'drive-popover3' : undefined;


    return (
      <div>

        <div>
            <TopBar
              logo={logo}
              height={70}
              onClickMenuIcon={() => this.setState({ openSideMenu: true })}
              onLogoutClick={() => {
                let emailCp = localStorage.getItem("email")
                localStorage.clear();
                localStorage.setItem("email",emailCp)
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

        <MuiBackdrop open={this.state.loading} />
        <div style={{ marginRight: 20, marginTop: 75, marginLeft: 5, top:0,width:"100%",position:"fixed" }}>
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
                {
                  this.renderLeftMenu()
                }

              </div>

              <div style={{ flexWrap: 'wrap', flex: '1 1 auto',overflow:"auto",height:900 }}>
                <div className="card">
                  <div className="card-body" style={{ minHeight: 750 }}>

                    <Switch>

                      <Route exact path="/home/drive">
                        <div>
                            <div>
                                    <div style={{display: 'flex', justifyContent: 'space-between'}}>
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
                                    <div style={{flexWrap: 'wrap', display: 'block'}}>
                                      {
                                        this.state.loadingGed === true ?
                                            <div align="center" style={{marginTop:200}}>
                                              <CircularProgress color="primary" />
                                              <h6>Chargement...</h6>
                                            </div>
                                        :
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
                                            )

                                      }
                                    </div>
                                  </div>
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
                                  selectedFolderFolders: folder.Content.folders || [],
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
                              onDoubleClickFolder={(folder) => {
                                console.log(folder)
                                this.setState({
                                  selectedDriveSharedItem: [folder.id || folder.key],
                                  expandedDriveSharedItems: [folder.id || folder.key],
                                  selectedSharedFolder: folder,
                                  autoExpandSharedParent: true,
                                  selectedSharedFoldername: folder.name || folder.title,
                                  selectedSharedFolderFiles: folder.files || [],
                                  selectedSharedFolderFolders: folder.children || [],
                                  focusedItem: 'Drive',
                                  selectedSharedFolderId: folder.id || folder.key,
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
                          this.state.rooms.length === 0 &&
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

                            <Rooms
                                rooms={this.state.rooms}
                                selectedRoom={this.state.selectedRoom}
                                contacts={this.state.contacts || []}
                                annuaire_clients={this.state.annuaire_clients_mandat}
                                //annuaire_clients={this.state.patients}
                                addNewtask={(title, selectedClient, assignedTo, team, selectedDateTime) => {
                                  this.addNewRoomTask(title, selectedClient, assignedTo, team, selectedDateTime)
                                }}
                                onDeleteTask={(key) => {
                                  //this.deleteRoomTask(key)
                                }}
                            />
                      </Route>

                      <Route exact path="/home/meet/new">
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
                      </Route>

                      <Route exact path="/home/meet/rejoin">
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
                      </Route>

                      <Route exact path="/home/contacts">
                        {
                          this.state.contacts.length === 0 ?
                              <div align="center" style={{marginTop:200}}>
                                <CircularProgress color="primary" />
                                <h6>Chargement...</h6>
                              </div> :

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
                                      selectedContactKey: contact.id
                                    });
                                    this.props.history.push('/home/contacts/' + contact.id);
                                  }}
                              />
                        }
                      </Route>

                      <Route exact path="/home/contacts/:contact_id">
                        {
                          this.state.selectedContact === "" ?
                              <div align="center" style={{marginTop:200}}>
                                <CircularProgress color="primary" />
                                <h6>Chargement...</h6>
                              </div> :
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
                                        <Tabs selectedIndex={this.state.selectedContactTabIndex} onSelect={index => {
                                          this.setState({selectedContactTabIndex:index})
                                        }}>
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

                      <Route exact path="/home/clients">
                        {
                          this.state.annuaire_clients_mandat.length === 0 ?
                              <div align="center" style={{marginTop:200}}>
                                <CircularProgress color="primary" />
                                <h6>Chargement...</h6>
                              </div>
                                :
                              <TableSociete
                                  contacts={this.state.contacts || []}
                                  societes={this.state.annuaire_clients_mandat || []}
                                  clients_tempo={this.state.clients_cases}
                                  onEditClick={(societe, key) => {
                                    this.setState({
                                      selectedSociete: societe,
                                      selectedSocieteKey: key
                                    });
                                    this.props.history.push('/home/clients/' + societe.id);
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
                                  delete_client_case={(id) => {
                                    this.delete_client_case(id)
                                  }}
                                  delete_annuaire_client_mandat={(id) => {
                                    this.delete_annuaire_client_mandat(id)
                                  }}
                              />
                        }

                      </Route>

                      <Route exact path="/home/clients/:client_id">
                        {
                          this.state.selectedSociete === "" ?
                              <div align="center" style={{marginTop:200}}>
                                <CircularProgress color="primary" />
                                <h6>Chargement...</h6>
                              </div> :
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
                                        <Tabs selectedIndex={this.state.selectedClientTabIndex} onSelect={index => {
                                          this.setState({selectedClientTabIndex:index})
                                        }}>
                                          <TabList>
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
                                                    readOnly
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
                                                          checked={this.state.selectedSociete.isActif === "true" || false}
                                                          onChange={event => {
                                                            let obj = this.state.selectedSociete;
                                                            obj.isActif = (event.target.checked).toString();
                                                            this.setState({ selectedSociete: obj });
                                                          }}
                                                          name="isActif" />}
                                                    label={this.state.selectedSociete.isActif ? this.state.selectedSociete.isActif === "true" ? 'Actif' : 'Non actif' : 'Non actif'}
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
                                            <div align="center" className="mt-2">
                                              <AtlButton
                                                  appearance="primary"
                                                  onClick={(e) => {
                                                    this.setState({anchorElDrive:e.currentTarget})
                                                  }}
                                              >
                                                Générer le document
                                              </AtlButton>
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
                                                                    let id = e.target.value;
                                                                    let contact = this.state.contacts.find(x => x.id === id );
                                                                    if (contact) {
                                                                      let objCp = this.state.newClientFolder;
                                                                      objCp.team[key].fname = contact.nom + ' ' + contact.prenom;
                                                                      objCp.team[key].email = contact.email;
                                                                      objCp.team[key].uid = contact.uid;
                                                                      objCp.team[key].tarif = contact.rateFacturation || '';
                                                                      this.setState({ newClientFolder: objCp });
                                                                    }
                                                                  }}
                                                                  value={this.state.newClientFolder.team[key].id}
                                                              >
                                                                {this.state.contacts.filter(x => x.type === "associe" ).map((contact, key) => (
                                                                    <MenuItem
                                                                        key={key}
                                                                        value={contact.id}>
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
                                                          <div style={{ marginTop: this.state.newClientFolder.team[key].id !== '' ? 12 : -7 }}>
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
                                                            <IconButton title="Supprimer cette ligne" style={{marginLeft:10,marginTop: this.state.newClientFolder.team[key].id !== '' ? 28 : 8}}
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
                                                                    let id = e.target.value;
                                                                    let contact = this.state.contacts.find(x => x.id === id);
                                                                    if (contact) {
                                                                      let objCp = this.state.newClientFolder;
                                                                      objCp.team[key].fname = contact.nom + ' ' + contact.prenom;
                                                                      objCp.team[key].email = contact.email;
                                                                      objCp.team[key].uid = contact.uid;
                                                                      objCp.team[key].tarif = contact.rateFacturation || '';
                                                                      this.setState({ newClientFolder: objCp });
                                                                    }
                                                                  }}
                                                                  value={this.state.newClientFolder.team[key].id}
                                                              >
                                                                {this.state.contacts.filter(x => !x.type ).map((contact, key) => (
                                                                    <MenuItem
                                                                        key={key}
                                                                        value={contact.id}>
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
                                                          <div style={{ marginTop: this.state.newClientFolder.team[key].id !== '' ? 12 : -7 }}>
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
                                                            <IconButton title="Supprimer cette ligne" style={{marginLeft:10,marginTop: this.state.newClientFolder.team[key].id !== '' ? 28 : 8}}
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
                                            <Mandats selectedClient={this.state.selectedSociete} clients_tempo={this.state.clients_cases} clients_tempo_copie={this.state.clients_cases}
                                                     contacts={this.state.contacts}
                                                     onFolderClick={(folder_id,parentClientFolder) => {
                                                       let ged = this.state.reelFolders;
                                                       let CLIENT_folder = ged.find(x => x.id ===  ENV_CLIENTS_FOLDER_ID)
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
                                                         window.scrollTo({ top: 0, behavior: 'smooth' });
                                                       }else{

                                                         this.setState({
                                                           showContainerSection: 'Drive',
                                                           focusedItem: 'Drive',
                                                           selectedDriveItem: [],
                                                           expandedDriveItems: [],
                                                           selectedDriveSharedItem:[ENV_CLIENTS_FOLDER_ID],
                                                           expandedDriveSharedItems:['parent',ENV_CLIENTS_FOLDER_ID],
                                                           breadcrumbs: 'Mon drive / Partagés avec moi',
                                                         });
                                                         this.props.history.push("/home/shared/" + ENV_CLIENTS_FOLDER_ID)
                                                       }
                                                     }}
                                                     update_client_case={(id,data) => {
                                                       this.update_client_case(id,data)
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
                                <Popover
                                    id={id}
                                    open={openDrivePopup}
                                    anchorEl={this.state.anchorElDrive}
                                    onClose={() => {
                                      this.setState({anchorElDrive: null})
                                    }}
                                    anchorOrigin={{
                                      vertical: 'top',
                                      horizontal: 'center',
                                    }}
                                    transformOrigin={{
                                      vertical: 'top',
                                      horizontal: 'center',
                                    }}
                                >
                                  <div style={{padding:15,height:600,width:300,paddingBottom:50}}>
                                    <div align="right">
                                      <IconButton size="small" onClick={() => {
                                        this.setState({anchorElDrive:null,expandedDrivePopUpKeys:[],selectedDrivePopUpKeys:[],destinationFolder:""})
                                      }}
                                      >
                                        <CloseIcon />
                                      </IconButton>
                                    </div>

                                    <h6 style={{color:"darkblue"}}>Veuillez sélectionner un dossier de destination </h6>
                                    <div style={{marginTop:20,maxHeight:430,overflowY:"auto"}}>
                                      <DirectoryTree
                                          draggable={true}
                                          allowDrop={(options) => {
                                            return false
                                          }}
                                          showIcon={true}
                                          onExpand={this.onExpandDrivePopUp}
                                          onSelect={this.onSelectDrivePopUp}
                                          treeData={this.state.folders || []}
                                          expandAction="click"
                                          expandedKeys={this.state.expandedDrivePopUpKeys}
                                          selectedKeys={this.state.selectedDrivePopUpKeys}
                                          autoExpandParent={this.state.autoExpandDrivePopUpParent}
                                      />
                                    </div>
                                    <div style={{position:"absolute",bottom:50}}>
                                      <span style={{color:"#000",fontWeight:"bold"}}>Dossier sélectionné:&nbsp; <span>{this.state.destinationFolder.title}</span> </span>
                                    </div>
                                    <div align="right" style={{position:"absolute",bottom:10,right:15}}>
                                      <AtlButton
                                          isDisabled={this.state.destinationFolder === ""}
                                          appearance="primary"
                                          onClick={() => {
                                            this.reportClient()
                                          }}
                                      >
                                        Valider
                                      </AtlButton>
                                    </div>
                                  </div>
                                </Popover>
                              </div>
                        }


                      </Route>

                      <Route exact path="/home/cadeau_Entx">
                          <TableGift
                              patients={this.state.annuaire_clients_mandat || []}
                              openModal={()=>{
                                this.openCadeauModal("ss","ss")}
                              }
                              onDelecteClick={(societe,key)=>{
                                //this.deletepatient(societe.id_user)
                              }}
                          />
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
                                                 onChange={(e)=>{this.handleChangeBouteille(e,key)}}
                                                 id="outlined-basic" label={"Code " + item.name} variant="outlined"  />

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
                            Envoyer des bouteilles
                          </ModalHeader>
                          <ModalBody>
                            <div className="row justify-content-around align-items-center">
                              <div className="col-md-4">

                                {this.state.bouteilleToCampany===true?
                                    <div>
                                      <h5>
                                        Société
                                      </h5>

                                      <SelectSearch
                                          options={
                                            this.state.annuaire_clients_mandat.map(({ Nom, Prenom, Type, imageUrl, id }) =>
                                                ({
                                                  value: id,
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

                                            let findClient = this.state.annuaire_clients_mandat.find(x => x.id === e)
                                            let data = this.state.clientCadeau
                                            data.email=findClient.email
                                            data.nom = findClient.Nom
                                            data.prenom = findClient.Prenom
                                            data.id = findClient.id
                                            data.nbGifts = findClient.nbGifts || 0
                                            this.setState({clientCadeau:data})
                                            console.log(data)
                                          }}
                                      />
                                      {
                                        (this.state.clientCadeau.email === undefined || this.state.clientCadeau.email === null) &&
                                            <h6 style={{color:"red"}}>Adresse mail non encore attribué à cet client !</h6>
                                      }
                                      {
                                        (verifForms.verif_Email(this.state.clientCadeau.email) && this.state.clientCadeau.email !== "" && this.state.clientCadeau.email !== undefined   ) &&
                                        <h6 style={{color:"red"}}>Format mail invalide pour ce client !</h6>
                                      }
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
                                      <AntSwitch   checked={this.state.bouteilleToCampany} name="checkedC"
                                                   onChange={(e)=>{
                                                     this.setState({bouteilleToCampany:e.target.checked})
                                                   }}
                                      />
                                    </Grid>
                                    <Grid item>Société</Grid>
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
                                }} label="Prénom" variant="outlined" />

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
                                <TextField id="outlined-basic" type="number"
                                           onChange={(e)=>{this.setState({nbBouteille:e.target.value})}}
                                           label="Nombre de bouteilles" variant="outlined" />

                              </div>
                              <div className="col-md-4 text-center">
                                <Button onClick={()=>{this.openCadeauModal2()}} variant="contained" color="secondary"
                                        disabled={this.state.nbBouteille === "" || parseInt(this.state.nbBouteille) <= 0  || verifForms.verif_Email(this.state.clientCadeau.email) }
                                >
                                  suivant
                                </Button>
                              </div>

                            </div>


                          </ModalBody>
                        </Modal>

                      </Route>

                      <Route exact path="/home/timeSheet/activities">
                        {this.renderTimeSheet()}
                      </Route>

                      <Route exact path="/home/qualified_signature/new">
                        <div style={{marginTop:25}}>
                          <h5>Signature électronique qualifié</h5>
                          <div align="center" style={{marginTop:20}}>
                            <img alt="sign" src={qualifSignImage} style={{maxWidth:300,border:"2px solid #f0f0f0"}} />
                          </div>
                          <div style={{marginTop:20}}>
                            <div className="row mt-1">
                              <div className="col-md-6">
                                <div>
                                  <h6>Choisissez un document à signer</h6>
                                  <div style={{display:"flex"}}>
                                    <IconButton color="primary" onClick={() => this.signatureFileUpload.click()}>
                                      <AttachFileIcon/>
                                    </IconButton>
                                    <h6 style={{marginLeft:5,marginTop:17}}>{this.state.SEQ_file ? this.state.SEQ_file.name :""}</h6>
                                  </div>
                                  <input
                                      style={{ visibility: 'hidden', width: 0, height: 0 }}
                                      onChange={(event) => this.uploadSignatureFile(event)}
                                      type="file"
                                      ref={(ref) => (this.signatureFileUpload = ref)}
                                  />
                                </div>
                              </div>
                            </div>
                            <div className="row">
                              <div className="col-md-6">
                                <div>
                                  <h6>Dossier de destination dans le GED</h6>
                                  <input type="text" readOnly={true}
                                         className="form-control custom-select"
                                         style={{ width: 300,cursor:"pointer",height:40 }}
                                         value={this.state.signFile_destinationFolder.title || ""}
                                         onClick={(e) => {
                                           this.setState({anchorElDrive3:e.currentTarget})
                                         }}
                                  />
                                </div>
                                <Popover
                                    id={id3}
                                    open={openDrivePopup3}
                                    anchorEl={this.state.anchorElDrive3}
                                    onClose={() => {
                                      this.setState({anchorElDrive3: null})
                                    }}
                                    anchorOrigin={{
                                      vertical: 'top',
                                      horizontal: 'center',
                                    }}
                                    transformOrigin={{
                                      vertical: 'top',
                                      horizontal: 'center',
                                    }}
                                >
                                  <div style={{padding:15,height:600,width:300,paddingBottom:50}}>
                                    <div align="right">
                                      <IconButton size="small" onClick={() => {
                                        this.setState({anchorElDrive3:null,expandedDrivePopUpKeys:[],selectedDrivePopUpKeys:[],signFile_destinationFolder:""})
                                      }}
                                      >
                                        <CloseIcon />
                                      </IconButton>
                                    </div>

                                    <h6 style={{color:"darkblue"}}>Veuillez sélectionner un dossier de destination </h6>
                                    <div style={{marginTop:20,maxHeight:430,overflowY:"auto"}}>
                                      <DirectoryTree
                                          draggable={true}
                                          allowDrop={(options) => {
                                            return false
                                          }}
                                          showIcon={true}
                                          onExpand={this.onExpandDrivePopUp}
                                          onSelect={this.onSelectDrivePopUp3}
                                          treeData={this.state.folders || []}
                                          expandAction="click"
                                          expandedKeys={this.state.expandedDrivePopUpKeys}
                                          selectedKeys={this.state.selectedDrivePopUpKeys}
                                          autoExpandParent={this.state.autoExpandDrivePopUpParent}
                                      />
                                    </div>
                                    <div style={{position:"absolute",bottom:50}}>
                                      <span style={{color:"#000",fontWeight:"bold"}}>Dossier sélectionné:&nbsp; <span>{this.state.signFile_destinationFolder.title}</span> </span>
                                    </div>
                                    <div align="right" style={{position:"absolute",bottom:10,right:15}}>
                                      <AtlButton
                                          isDisabled={this.state.signFile_destinationFolder === ""}
                                          appearance="primary"
                                          onClick={() => {
                                            this.setState({anchorElDrive3:null})
                                          }}
                                      >
                                        Valider
                                      </AtlButton>
                                    </div>
                                  </div>
                                </Popover>
                              </div>
                            </div>
                            <div align="center" style={{marginTop:30}}>
                              <AtlButton
                                  isDisabled={this.state.signFile_destinationFolder === "" || this.state.SEQ_file === ""}
                                  appearance="primary"
                                  onClick={() => {
                                    this.setState({loading:true})
                                    var formdata = new FormData();
                                    formdata.append("file", this.state.SEQ_file, this.state.SEQ_file.name);
                                    formdata.append("name", "test");
                                    formdata.append("given", "courtel");
                                    formdata.append("surname", "eliot");
                                    formdata.append("email", "eliot.courtel@gmail.com");
                                    formdata.append("phone", "+41795281046");

                                    var requestOptions = {
                                      method: 'POST',
                                      body: formdata,
                                      redirect: 'follow'
                                    };

                                    fetch("https://sign.1.smartdom.ch/sign", requestOptions)
                                        .then(response => {
                                          console.log(response)
                                          if(response.status === 400){
                                            this.setState({loading:false})
                                            this.openSnackbar("error","Des données manquantes !")
                                          }else if(response.status === 500){
                                            this.setState({loading:false})
                                            this.openSnackbar("error","une erreur est survenue !")
                                          }else if(response.status === 405){
                                            this.setState({loading:false})
                                            this.openSnackbar("error","Opération annulée !")
                                          }else if(response.status === 200){
                                            response.text()
                                          }
                                        })
                                        .then(result => {
                                          console.log(result)

                                          if(result === undefined || result === "error"){
                                            this.setState({loading:false})
                                          }else{

                                            SmartService.addFileFromBas64({b64file:result,folder_id:this.state.signFile_destinationFolder.key},
                                                localStorage.getItem("token"),localStorage.getItem("usrtoken")).then( addFileRes => {

                                              if(addFileRes.succes === true && addFileRes.status === 200) {
                                                let fileName = this.state.SEQ_file.name.slice(0, -4);
                                                SmartService.updateFileName({name:fileName},
                                                    addFileRes.data.file_id,localStorage.getItem("token"),localStorage.getItem("usrtoken")).then( updateNameRes => {
                                                  if(updateNameRes.succes === true && updateNameRes.status === 200){
                                                    this.justReloadGed()
                                                    setTimeout(() => {
                                                      this.setState({loading:false})
                                                      this.openSnackbar("success","Opération effectué avec succès")
                                                    },500)
                                                  }else{
                                                    console.log(updateNameRes.error)
                                                    this.openSnackbar("error",updateNameRes.error)
                                                    this.setState({loading:false})
                                                  }
                                                }).catch(err => {
                                                  console.log(err)
                                                  this.openSnackbar("error","Une erreur est survenue")
                                                })
                                              }else{
                                                console.log(addFileRes.error)
                                                this.openSnackbar("error",addFileRes.error)
                                                this.setState({loading:false})
                                              }
                                            }).catch(err => {
                                              console.log(err)
                                              this.openSnackbar("error","Une erreur est survenue")
                                              this.setState({loading:false})
                                            })

                                          }

                                        })
                                        .catch(error => {
                                          console.log(error)
                                          this.setState({loading:false})
                                          this.openSnackbar("error","Une erreur est survenue")
                                        });
                                  }}
                              >
                                Signer le document
                              </AtlButton>
                            </div>
                          </div>
                        </div>
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
                societes={this.state.annuaire_clients_mandat}
                contacts={this.state.contacts}
                onSelectBtnClick={(client) => {
                  let obj = this.state.TimeSheet;

                  let findClientTempo = this.state.clients_tempo.find(x => x.ID_client === client.ID)
                  let findClientFname = this.state.annuaire_clients_mandat.find(x => x.ID === client.ID)
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