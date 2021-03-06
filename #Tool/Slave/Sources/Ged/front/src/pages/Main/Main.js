import React from 'react';
import SmartService from '../../provider/SmartService';
//import SmartService from '../../provider/masterNodeService';
import Remove from '@material-ui/icons/Remove';
import Add from '@material-ui/icons/Add';
import moment from 'moment';
import FolderIcon from '@material-ui/icons/Folder';
import TopBar from '../../components/TopBar/TopBar';
import SideMenu from '../../components/SideMenu/SideMenu';
import Dashboard from "../dashboardDataWatch/Dashboard/Dashboard";
import photo from "../../assets/images/photo.svg"

import data from '../../data/Data';
import Data from '../../data/Data';
import MuiBackdrop from '../../components/Loading/MuiBackdrop';
import LeftMenuV3 from '../../components/Menu/LeftMenuV3';
import {Route, Switch} from 'react-router-dom';
import MuiSwitch from '@material-ui/core/Switch';
import Rooms from '../Rooms/Rooms';
import maillingService from '../../provider/EmailService';
import IconButton from '@material-ui/core/IconButton';
import AutorenewIcon from '@material-ui/icons/Autorenew';
import Drawer from '@material-ui/core/Drawer';
import FindInPageOutlinedIcon from '@material-ui/icons/FindInPageOutlined';
import CloudDownloadOutlinedIcon from '@material-ui/icons/CloudDownloadOutlined';
import PersonAddOutlinedIcon from '@material-ui/icons/PersonAddOutlined';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import DateRangeOutlinedIcon from '@material-ui/icons/DateRangeOutlined';
import CircularProgress from '@material-ui/core/CircularProgress';
import {Modal, ModalBody, ModalHeader} from 'reactstrap';
import PDFViewer from '../../customComponents/pdf-viewer-reactjs';
import {isEmail, ReactMultiEmail} from 'react-multi-email';
import '../../assets/css/multiEmail.css';
import verifForms from "../../tools/verifForms"
import AssignmentTurnedInIcon from '@material-ui/icons/AssignmentTurnedIn';
import {
  Avatar,
  Button as MuiButton,
  Checkbox as MuiCheckbox,
  Chip,
  FormControl,
  Input,
  MenuItem,
  Select as MuiSelect,
  InputLabel,
} from '@material-ui/core';
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
import {FileUploader} from 'baseui/file-uploader';
import axios from 'axios';
import FolderDetail from '../Drive/FolderDetail';
import TableContact from '../../components/Tables/TableContact';
import {Tab, TabList, TabPanel, Tabs} from 'react-tabs';
import InputAdornment from '@material-ui/core/InputAdornment';
import 'react-tabs/style/react-tabs.css';
import entIcon from '../../assets/images/entreprise-icon.png';
import userAvatar from '../../assets/images/users/user4.jpg';
import CB from '@material-ui/core/Checkbox';
import '../../assets/css/inputSuggestion.css';
import '../../assets/css/react-select-search.css';
import DatePicker from 'react-date-picker';
import calendar from '../../assets/icons/calendar_icon.jpg';
import TableTimeSheet from '../../components/Tables/TableTimeSheet';
import main_functions from '../../controller/main_functions';
import DescriptionIcon from '@material-ui/icons/Description';
import xlsxParser from 'xlsx-parse-json';
import recetteService from "../../provider/RecetteService";
import PatientService from "../../provider/patientservice";
import edit from '../../assets/icons/edit.svg';
import time from '../../assets/icons/time.svg';
import money from '../../assets/icons/money.svg';
import play from '../../assets/icons/play.svg';
import down from '../../assets/icons/down.svg';
import pluss from '../../assets/icons/pluss.svg';
import back from '../../assets/icons/back.svg';
import magazine from "../../assets/images/magazine.jpg"
import hourglass from "../../assets/images/hourglass.svg"
import chef_hat from "../../assets/images/chef_hat.svg"
import BT from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import HSBar from 'react-horizontal-stacked-bar-chart';
import TableTimeSheetDashboard from '../../components/Tables/TableDashboardTimeSheet';
import {Select} from 'baseui/select';
import countryList from "../../tools/countryList";
import defaultAvatar from '../../assets/images/users/default_avatar.jpg';
import Staricon from '@material-ui/icons/Star';
import CheckCircle from '@material-ui/icons/CheckCircle';
import MoodIcon from '@material-ui/icons/Mood';
import ClampLines from 'react-clamp-lines';
import Table_prestataire_service from "../../components/Tables/Table_prestataire_service";
import Autosuggest from 'react-autosuggest';
import Timer from 'react-compound-timer';
import SelectSearch from 'react-select-search';
import AtlButton, {ButtonGroup as AltButtonGroup} from '@atlaskit/button';
import TableFactures from '../../components/Tables/TableFactures';
import SearchIcon from '@material-ui/icons/Search';
import rethink from "../../controller/rethink";
import verfiForms from "../../tools/verifForms"
import Badge from '@atlaskit/badge';
import TableSociete from "../../components/Tables/TableSociete";
import AddCircleIcon from '@material-ui/icons/AddCircle';
import Mandats from './Mandats';
import utilFunctions from "../../tools/functions";
import {Dropdown} from 'semantic-ui-react'
import { Input as SuiInput } from 'semantic-ui-react'
import {BlockPicker} from 'react-color'
import Popover from '@material-ui/core/Popover';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import TablePatientsBrainy from "../../components/Tables/TablePatientsBrainy";
import QuestionService from "../../provider/webserviceQuestions";
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import  bodyHomme from "../../assets/images/bodyHomme.png"
import  bascule from "../../assets/images/bascule.png"
import OutlinedInput from '@material-ui/core/OutlinedInput';
import { Line } from 'react-chartjs-2';
import {Button} from 'baseui/button';
import TableProducts from "../../components/Tables/TableProducts";
import Dash from "../SocietyService/Dash";
import DetailsSoc from "../SocietyService/DetailsSoc";
import AttachFileIcon from '@material-ui/icons/AttachFile';
import {Tree} from "antd";
import DocGenerationService from "../../provider/DocGenerationService";
import ComptaInvoices from "../Compta/Invoices";
import NewInvoice from "../Compta/NewInvoice";
import ConvertibleLoan from "../SocietyService/ConvertibleLoan";
import AugmCapital from "../SocietyService/AugmCapital";
import CessionActions from "../SocietyService/CessionActions";


const endpoint = process.env.REACT_APP_ENDPOINT;
const ged_id = process.env.REACT_APP_GED_ID;
const meet_url = process.env.REACT_APP_MEET_URL;
const ENV_CLIENTS_FOLDER_ID = process.env.REACT_APP_CLIENTS_FOLDER_ID
const db_name = process.env.REACT_APP_RETHINKDB_BEGIN_NAME;
const modules = process.env.REACT_APP_ACTIVE_MODULES;
const active_modules = (modules || "").split("/")

const url=process.env.REACT_APP_JAWHER_API_ENDPOINT

const question1food1me=process.env.REACT_APP_question1food1me
const bodycheckQuestion=process.env.REACT_APP_bodycheckQuestion
const capteurs=process.env.REACT_APP_CAPTEURS
const urlImage=process.env.REACT_APP_JAWHER_API_ENDPOINT+"getImageProduct/"

const {DirectoryTree} = Tree;


export default class Main extends React.Component {


  imageUpload = {};
  folderupload = {};

  sendCapteursMail=this.sendCapteursMail.bind(this)




  state = {

    logo:localStorage.getItem("logo"),

    loading: false,
    firstLoading: false,
    loadingGed:true,

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
    openComptaMenu: false,

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
    selectedMarketplaceMenuItem:['recettes'],
    selectedComptaMenuItem: ['Invoices'],

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
    //contacts: [],
    societes: [],
    //prestataires:[],
    prestatairesCp:[],
    clients_cases:[],
    //annuaire_clients_mandat: [],
    //time_sheets:[],
    //rooms: [],
    selectedContact: '',
    selectedProspect:'',
    selectedContactKey: '',
    editContactForm: false,
    editSocieteForm: false,

    openShareDocModal: false,
    checkedNotif: true,
    msgNotif: '',
    emailsDriveShare: [],
    shareRights:[],

    focusedItem: 'Drive', // => Drive || Rooms || Meet || Contacts

    viewMode: 'list',

    domaine:{
      domaine:"",
      specialite:[],
    },

    selectedRoomItems: [],
    expandedRoomItems: [],
    openNewRoomModal: false,
    newRoomTitle: '',
    newRoomColor:"#f0f0f0",
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
      contactName: '',
      societyName: '',
      type: '0',
      created_at: '',
      adress: '',
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
    newPrestataire: {
      uid: '',
      nom: '',
      prenom: '',
      email: '',
      adress:'',
      phone: '',
      type1: 'avocat',
      type2:'',
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

    selectedTimeSheetIndex:0,
    selectedTimeSheetDashIndex:0,
    selectedTimeSheetDashPersonIndex:0,
    selectedTimeSheetDashprojectIndex:0,
    selectedClientTabIndex:0,
    selectedClientFolders:[],
    factures:null,

    openImportAlertModal:false,

    produits:[],
    selectedProduct:'',
    openModalProduit:false,
    nvproduit:{
      nomProd:"",
      descriptionProd:"",
      prix:"",
      image:""
},

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

    openAddContactModal:false,
    openAddPrestataireModal:false,

    loading_provision_preview:false,
    loading_provision_save:false,
    loading_avance_frais:false,
    provision_bank:"",
    provision_amount:"",
    provision_tax:"",

    anchorEl_colorPicker: null,

    selectedRoomTab:0,
    showFileInGed:true,

    settRoomAnchorEl:null,


    patientData:"",
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
      }else if (this.props.location.pathname.indexOf('/home/marketplace/RH_Support_ponctuel') > -1) {
        this.setState({
          showContainerSection: 'marketplace',
          focusedItem: 'marketplace',
          selectedMarketplaceMenuItem: ['RH_Support_ponctuel'],
          openMarketplaceMenuItem: true
        });
      }

    };

    if (localStorage.getItem('token') === undefined || localStorage.getItem('token') === null) {
      this.props.history.push('/login');
    } else {
      let sharedFolders = [];
      let meeturl = meet_url + '_' + moment().format('DDMMYYYYHHmmss');
      this.setState({meeturl: meeturl})

      //Get List Country ODOO
      SmartService.get_odoo_countries(localStorage.getItem("token"),localStorage.getItem("usrtoken")).then(countriesRes => {
        if (countriesRes.succes === true && countriesRes.status === 200) {
          let data = [["",""]]
          this.setState({odoo_countries:data.concat(countriesRes.data || [])})
        }
      }).catch(err => {console.log(err)})
      //END

      //Get List Country_states ODOO
      //43 = Suisse
      SmartService.get_odoo_country_states(43,localStorage.getItem("token"),localStorage.getItem("usrtoken")).then(countryStatesRes => {

        if (countryStatesRes.succes === true && countryStatesRes.status === 200) {
          let data = [["",""]]
          this.setState({odoo_country_states:data.concat(countryStatesRes.data || [])})
        }
      }).catch(err => {console.log(err)})
      //END

      //Get List TAX ODOO
      SmartService.get_tax_odoo(localStorage.getItem("token"),localStorage.getItem("usrtoken")).then( taxRes => {
        if (taxRes.succes === true && taxRes.status === 200) {
          let taxs_id = taxRes.data || [];
          let tax_calls = [];
          let taxs = []
          taxs_id.map((id, key) => {
            tax_calls.push(
                SmartService.get_tax_odoo_byID(id, localStorage.getItem("token"), localStorage.getItem("usrtoken")).then(taxResData => {
                  taxs.push({key:taxResData.data[0].id,value: taxResData.data[0].id, text: taxResData.data[0].display_name})
                }).catch(err => console.log(err))
            )
          })
          Promise.all(tax_calls).then(response => {
            taxs.push({key:-1,value: "Hors TVA", text: "Hors TVA"})
            this.setState({odoo_taxs:taxs,provision_tax:taxs.length > 0 ? taxs[0].value : ""})
          }).catch(err => console.log(err))

        }
      }).catch(err => {console.log(err)})
      //END

      //GET List PayTerms ODOO
      SmartService.get_paymentTerm_odoo(localStorage.getItem("token"),localStorage.getItem("usrtoken")).then(paymTermRes => {
        if(paymTermRes.succes === true && paymTermRes.status === 200){
          let payTerms_id = paymTermRes.data || [];
          let payTerm_calls = [];
          let paymTerms = [];
          payTerms_id.map((id,key) => {
            payTerm_calls.push(
                SmartService.get_paymentTerm_odoo_byID(id,localStorage.getItem("token"),localStorage.getItem("usrtoken")).then(paymTermResData => {
                  paymTerms.push({key:paymTermResData.data[0].id,value:paymTermResData.data[0].id,
                    text:paymTermResData.data[0].display_name ===  "15 Days" ? "15 jours" :
                        paymTermResData.data[0].display_name ===  "30 Net Days" ? "30 jours net" :
                            paymTermResData.data[0].display_name ===  "45 Days" ? "45 jours" :
                                paymTermResData.data[0].display_name ===  "2 Months" ? "2 mois" :
                                    paymTermResData.data[0].display_name ===  "Immediate Payment" ? "Règlement immédiat" : paymTermResData.data[0].display_name
                  })
                }).catch(err => console.log(err))
            )
          })
          Promise.all(payTerm_calls).then(response => {
            paymTerms.sort( (a,b) => {
              let c1 = a.text
              let c2 = b.text
              if(c1.toLowerCase().trim()  < c2.toLowerCase().trim()) { return -1; }
              if(c1.toLowerCase().trim() > c2.toLowerCase().trim()) { return 1; }
              return 0;
            })
            this.setState({odoo_payTerms:paymTerms})
          }).catch(err => console.log(err))
        }else{
          console.log(paymTermRes.error)
        }
      }).catch(err => {console.log(err)})
      //END

        SmartService.getGed(
          localStorage.getItem('token'),
          localStorage.getItem('usrtoken')
        )
          .then((gedRes) => {
            if (gedRes.succes === true && gedRes.status === 200) {

              if(active_modules.includes("MARKETPLACE") === true){
                this.getRecettes()
                this.getProduits()
                this.getpatient();
              }

              let parentSharedFolder = [{
                id:"parent",
                name:"Partagés avec moi",
                Content:{
                  files:[],
                  folders:[]
                }

              }]
              parentSharedFolder[0].Content.folders = gedRes.data.Shared.Content.folders || []
              sharedFolders = main_functions.changeStructure(parentSharedFolder,false)

              let client_folder = gedRes.data.Proprietary.Content.folders.find((x) => x.id === ENV_CLIENTS_FOLDER_ID);
              let client_shared_folder = gedRes.data.Shared.Content.folders.find((x) => x.id === ENV_CLIENTS_FOLDER_ID);
              if (client_folder) {
                localStorage.setItem('client_folder_id', ENV_CLIENTS_FOLDER_ID);
                this.setState({client_folders:client_folder})
              }
              if (client_shared_folder) {
                localStorage.setItem('client_shared_folder_id', ENV_CLIENTS_FOLDER_ID);
              }

              let recette_folder = gedRes.data.Proprietary.Content.folders.find((x) => x.name === 'RECETTES');
              if (recette_folder) {
                localStorage.setItem('recette_folder_id', recette_folder.id);
                console.log(recette_folder.id);
              }

              let sharedFiles = gedRes.data.Shared.Content.files || [];



              this.setState({
                folders:main_functions.changeStructure(gedRes.data.Proprietary.Content.folders || [],this.state.showFileInGed),
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

            if(tablesRes.includes("contacts") === false){
              this.setState({contacts:[]})
            }
            if(tablesRes.includes("annuaire_clients_mandat") === false){
              this.setState({annuaire_clients_mandat:[]})
            }
            if(tablesRes.includes("time_sheets") === false){
              this.setState({time_sheets:[]})
            }
            if(tablesRes.includes("cached_cases") === false){
              this.setState({cached_cases:[]})
            }
            if(tablesRes.includes("factures") === false){
              this.setState({factures:[]})
            }
            if(tablesRes.includes("prestataires") === false){
              this.setState({prestataires:[]})
            }
            if(tablesRes.includes("rooms") === false){
              this.setState({rooms:[]})
            }
            if(tablesRes.includes("p_packs") === false){
              this.setState({p_packs:[]})
            }
            if(tablesRes.includes("societies") === false){
              this.setState({societies:[]})
            }
            this.setState({tableList:tablesRes || []})

            tablesRes.map((item,key) => {
              if(item !== "chat"){
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
                            selectedSocietyMenuItem: ['clients_mondat'],
                            openSocietyMenuItem: true,
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
                          selectedSocietyMenuItem: ['clients_mondat'],
                          openSocietyMenuItem: true,
                          firstLoading: false,
                          loading: false
                        });
                      }
                    }

                    this.setState({[item]:rr.sort( (a,b) => {
                        let fname1 = a.contactName
                        let fname2 = b.contactName
                        if(fname1.toLowerCase().trim()  < fname2.toLowerCase().trim()) { return -1; }
                        if(fname1.toLowerCase().trim() > fname2.toLowerCase().trim()) { return 1; }
                        return 0;
                      })})
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
                    }else{
                      this.setState({[item]:rr.sort( (a,b) => {
                          var c = a.sort || -1
                          var d = b.sort || -1
                          return c-d;
                        })})
                    }
                  }
                  else if(item === "rooms"){
                    let user_rooms = [];
                    rr.map((room,key) => {
                      if(room.members.find(x => x.email === localStorage.getItem("email"))){
                        user_rooms.push(room)
                      }
                    })
                    this.setState({[item]:user_rooms})
                    if (this.props.location.pathname.indexOf('/home/rooms') > -1) {
                      if (this.props.location.pathname.indexOf('/home/rooms/') > -1) {
                        if (rr.length > 0) {
                          let room_id = this.props.location.pathname.replace('/home/rooms/', '');
                          this.setState({
                            showContainerSection: 'Rooms',
                            focusedItem: 'Rooms',
                            selectedRoomItems: [room_id],
                            expandedRoomItems: [room_id],
                            openRoomMenuItem: true,
                            selectedRoom: user_rooms.find(x => x.id === room_id),
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
                          selectedRoomItems:[],
                          expandedRoomItems: [],
                          openRoomMenuItem: true,
                          selectedRoom: "",
                          firstLoading: false,
                          loading: false
                        });
                      }
                    }
                  }
                  else if(item === "societies"){
                    this.setState({[item]: rr.filter(x => x.created_by === localStorage.getItem("email"))})
                    if(this.props.location.pathname.indexOf('/home/marketplace/gestion_societes') > -1){
                      console.log("1")
                      if (this.props.location.pathname.indexOf('/home/marketplace/gestion_societes/') > -1) {
                        console.log("2")
                        let soc_id = this.props.location.pathname.replace('/home/marketplace/gestion_societes/', '');
                        let society = (this.state.societies || []).find(x => x.id === soc_id)
                        console.log(society)
                        if(society){
                          console.log("3")
                          this.setState({
                            showContainerSection: 'marketplace',
                            focusedItem: 'marketplace',
                            selectedMarketplaceMenuItem: ['societyService'],
                            selected_marktp_society:society,
                            openMarketplaceMenuItem: true,
                            firstLoading: false,
                            loading: false
                          });
                          this.props.history.push("/home/marketplace/gestion_societes/"+society.id)
                        }else{
                          this.setState({
                            showContainerSection: 'marketplace',
                            focusedItem: 'marketplace',
                            selectedMarketplaceMenuItem: ['societyService'],
                            openMarketplaceMenuItem: true,
                            firstLoading: false,
                            loading: false
                          });
                        }
                      }else{
                        this.setState({
                          showContainerSection: 'marketplace',
                          focusedItem: 'marketplace',
                          selectedMarketplaceMenuItem: ['societyService'],
                          openMarketplaceMenuItem: true,
                          firstLoading: false,
                          loading: false
                        });
                      }
                    }
                  }
                  else{
                    this.setState({[item]:rr})
                  }
                });
                this.getTableChanges('test',db_name,'table("'+item+'")',item);
              }
            });


            if (this.props.location.pathname === '/home/meet/new') {
              console.log("MEET NEW")
                this.setState({
                  showContainerSection: 'Meet',
                  focusedItem: 'Meet',
                  selectedMeetMenuItem: ['new'],
                  openMeetMenuItem: true,
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
                  firstLoading: false,
                  loading: false
                });
              }
              else if (this.props.location.pathname.indexOf('/home/contacts') > -1) {
                if (this.props.location.pathname.indexOf('/home/contacts/') > -1) {
                  let contact_id = this.props.location.pathname.replace('/home/contacts/', '');
                  let contact = this.state.contacts.find(x => x.id === contact_id)
                  if (contact) {
                    this.setState({
                      selectedContact: contact,
                      selectedContactKey: contact_id,
                      showContainerSection: 'Contacts',
                      focusedItem: 'Contacts',
                      openContactsMenu: true,
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
                    firstLoading: false,
                    loading: false
                  });
                }

              }
              else if (this.props.location.pathname.indexOf('/home/clients') > -1) {
                if (this.props.location.pathname.indexOf('/home/clients/') > -1) {
                  let client_id = this.props.location.pathname.replace('/home/clients/', '');
                  let client = this.state.annuaire_clients_mandat.find(x => x.id === client_id);
                  if (client) {
                    this.setState({
                      selectedSociete: client,
                      selectedSocieteKey: client_id,
                      showContainerSection: 'Societe',
                      focusedItem: 'Societe',
                      selectedSocietyMenuItem: ['clients_mondat'],
                      openSocietyMenuItem: true,
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
                    firstLoading: false,
                    loading: false
                  });
                }

              }
              else if (this.props.location.pathname === '/home/timeSheet/activities') {
                this.setState({
                  showContainerSection: 'TimeSheet',
                  focusedItem: 'TimeSheet',
                  selectedTimeSheetMenuItem: ['activities'],
                  openTimeSheetsMenu: true,
                  firstLoading: false,
                  loading: false
                });
              }
            else if (this.props.location.pathname === '/home/compta/factures') {
              this.setState({
                showContainerSection: 'Invoices',
                focusedItem: 'Invoices',
                selectedComptaMenuItem: ['Invoices'],
                openComptaMenu: true,
                firstLoading: false,
                loading: false
              });
            }
            else if (this.props.location.pathname === '/home/compta/new') {
              this.setState({
                showContainerSection: 'Invoices',
                focusedItem: 'New_invoice',
                selectedComptaMenuItem: ['New_invoice'],
                openComptaMenu: true,
                firstLoading: false,
                loading: false
              });
            }
              else if (this.props.location.pathname === '/home/timeSheet/dashboard') {
                this.setState({
                  showContainerSection: 'TimeSheet',
                  focusedItem: 'TimeSheet',
                  selectedTimeSheetMenuItem: ['dashboard'],
                  openTimeSheetsMenu: true,
                  firstLoading: false,
                  loading: false
                });
              }
              else if (this.props.location.pathname === '/home/timeSheet/dashboardPerson') {
                this.setState({
                  showContainerSection: 'TimeSheet',
                  focusedItem: 'TimeSheet',
                  selectedTimeSheetMenuItem: ['dashboardPerson'],
                  openTimeSheetsMenu: true,
                  firstLoading: false,
                  loading: false
                });
              }
              else if (this.props.location.pathname === '/home/timeSheet/dashboardProject') {
                this.setState({
                  showContainerSection: 'TimeSheet',
                  focusedItem: 'TimeSheet',
                  selectedTimeSheetMenuItem: ['dashboardProject'],
                  openTimeSheetsMenu: true,
                  firstLoading: false,
                  loading: false
                });
              }
              else if (this.props.location.pathname.indexOf("/home/marketplace/recettes/") > -1) {

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
                  firstLoading: false,
                  loading: false
                });
              }
              else if (this.props.location.pathname.indexOf('/home/marketplace/RH_Support_ponctuel') > -1) {
                if (this.props.location.pathname.indexOf('/home/marketplace/RH_Support_ponctuel/') > -1) {
                  let contact_id = this.props.location.pathname.replace('/home/marketplace/RH_Support_ponctuel/', '');
                  let contact = this.state.prestataires.find(x => x.id === contact_id)
                  if (contact) {
                    this.setState({
                      selectedContact: contact,
                      selectedContactKey: contact_id,
                      showContainerSection: 'marketplace',
                      focusedItem: 'marketplace',
                      selectedMarketplaceMenuItem: ['RH_Support_ponctuel'],
                      openMarketplaceMenuItem: true,
                      firstLoading: false,
                      loading: false
                    });
                  } else {
                    this.props.history.push('/');
                  }

                } else {
                  this.setState({
                    showContainerSection: 'marketplace',
                    focusedItem: 'marketplace',
                    selectedMarketplaceMenuItem: ['RH_Support_ponctuel'],
                    openMarketplaceMenuItem: true,
                    firstLoading: false,
                    loading: false
                  });
                }

              }
            else if(this.props.location.pathname === "/home/marketplace/produits"){

              this.setState({
                showContainerSection: 'marketplace',
                focusedItem: 'marketplace',
                selectedMarketplaceMenuItem: ['produits'],
                openMarketplaceMenuItem: true,
                firstLoading: false,
                loading: false
              });
            }
            else if(this.props.location.pathname === "/home/marketplace/augm_capital"){
              this.setState({
                showContainerSection: 'marketplace',
                focusedItem: 'marketplace',
                selectedMarketplaceMenuItem: ['AUGM_CAPITAL'],
                openMarketplaceMenuItem: true,
                firstLoading: false,
                loading: false
              });
            }
            else if(this.props.location.pathname === "/home/marketplace/convertible_loan"){
              this.setState({
                showContainerSection: 'marketplace',
                focusedItem: 'marketplace',
                selectedMarketplaceMenuItem: ['CONVERTIBLE_LOAN'],
                openMarketplaceMenuItem: true,
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
                  this.props.location.pathname.indexOf('/home/clients') === -1 && this.props.location.pathname.indexOf('/home/rooms') === -1 &&
                  this.props.location.pathname.indexOf('/home/marketplace/gestion_societes') === -1 &&
                  this.props.location.pathname.indexOf('/home/marketplace/convertible_loan') === -1
              )
              {
                console.log('URL ERROR');
                this.props.history.push('/home/drive');
                this.componentDidMount();
              }
              }

          }).catch(err => {console.log(err)})

        }).catch(err => {console.log(err)})

    }
  }


  getpatient(){
    PatientService.getPatients().then((res)=>{
      if (res){
        this.setState({patients:res})
      }
    }).catch(err => {console.log(err)})
  }

  sendCapteursMail(email,id){

    let dd ={
      emailReciver:email,
      subject:"Brainy food GoogleFIt",
      linkUrl :"Click ici ",

      ////url 1foof1me project
      url:capteurs+id,
      msg:"vous pouvez voir votre données de GoogleFit ",
      footerMsg : "merci"
    }



    fetch(url+'sendCustomMailWithUrl', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body:JSON.stringify(dd)
    }).then(response => response.json()).then((res)=>{
      console.log(res)
      if (res.status===200){
       this.setState({
         openAlert: true,
         alertMessage: 'Mail a été envoyé avec succès',
         alertType: 'success',
       })
      }
    }).catch(error => {
      console.log(error);
    })
  }


  getRecettes(){
    recetteService.getRecettes().then(res => {
      if(res){
        this.setState({recettes:res})
      }
    }).catch(err => {console.log(err)})
  }

  getProduits(){
    PatientService.getProduits().then(res => {
      if(res){
        this.setState({produits:res})
      }
    }).catch(err => {console.log(err)})
  }


  handleChangeText(name,event)
  {
    let prod = this.state.nvproduit
    prod[name]=event.target.value
    this.setState({nvproduit:prod})
  }
  uploadImageProduit(e){
    console.log(e)
    if (e.target.files[0]!=null){
      let produit=this.state.nvproduit
     PatientService.uploadImage(e).then((res)=>{
        console.log(res)
        if(res.status===200){
          produit.image=urlImage+res.data.filename
          this.setState({nvproduit:produit})
        }
      })
    }


  }
  handleClick(e) {
    this.refs.fileUploader.click();
  }

  ajouterProduit(){
    let produit = this.state.nvproduit
    PatientService.createProduit(produit).then((res)=>{
      if(res.error==="false"){
        this.openSnackbar("success","Produit ajouté avec succès")
      }
    }).then(()=>{
      this.setState({openModalProduit:false})

      this.getProduits()
    })

  }

  getTableChanges(ust_token,db,table,table_name){

    let socket = new WebSocket("wss://api.smartdom.ch/ws/" + ust_token);

    socket.onopen = (e) => {
      let payload;
      payload = {"cmd": table, "db": db, "read_change": true}
      socket.send(JSON.stringify(payload));
    };


    socket.onmessage = (event) => {

      let data = this.state[table_name];
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
        this.setState({[table_name]:data})
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
        this.openSnackbar('error', "Une erreur est survenue !");
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
    let id = this.state.selectedContact.id;
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

  savePrestataireChanges = () => {
    this.setState({ loading: true });
    let id = this.state.selectedContact.id;
    rethink.update("test",'table("prestataires").get('+JSON.stringify(id)+').update('+ JSON.stringify(this.state.selectedContact) + ')',db_name,false).then( updateRes => {
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
  }

  saveSocietyChanges = (odoo_company_id) => {
    this.setState({ loading: true });
    let id = this.state.selectedSociete.id || (this.state.annuaire_clients_mandat.find(x => x.ID === this.state.selectedSociete.ID)).id;
    let clientFname = this.state.selectedSociete.type === "0" ? this.state.selectedSociete.societyName : this.state.selectedSociete.contactName
    console.log(clientFname)
    console.log(this.state.selectedSociete.client_fact_name)
    let data = {
      data:[
        odoo_company_id,
        {
          street: this.state.selectedSociete.adress_fact_street || "",
          street2: this.state.selectedSociete.adress_fact_street2 || "" ,
          zip: this.state.selectedSociete.adress_fact_pc || "" ,
          city: this.state.selectedSociete.adress_fact_city || "",
          state_id: this.state.selectedSociete.adress_fact_state || false,
          country_id: this.state.selectedSociete.adress_fact_country || 43,
          email: !verifForms.verif_Email(this.state.selectedSociete.email || "")  ? this.state.selectedSociete.email : false,
          phone: this.state.selectedSociete.phone || "",
          lang:this.state.selectedSociete.lang_fact || "fr_FR",
          name:(!this.state.selectedSociete.client_fact_name || this.state.selectedSociete.client_fact_name.trim() === "") ? clientFname : this.state.selectedSociete.client_fact_name
        }
      ],
      method:"write"
    }
    SmartService.update_odoo_client(data,localStorage.getItem('token'), localStorage.getItem('usrtoken')).then(updateRes => {
      console.log(updateRes)
      if (updateRes.succes === true && updateRes.status === 200) {
        let item = this.state.selectedSociete;
        item.odoo_id = odoo_company_id;
        rethink.update("test",'table("annuaire_clients_mandat").get('+JSON.stringify(id)+').update('+ JSON.stringify(item) + ')',db_name,false).then( updateRes => {
          if (updateRes && updateRes === true) {
            this.setState({ loading: false });
            this.openSnackbar('success', 'Modification effectuée avec succès');
          } else {
            this.setState({ loading: false });
            this.openSnackbar('error', 'Une erreur est survenue !');
          }
        }).catch(err => {
          this.setState({ loading: false });
          this.openSnackbar('error', 'Une erreur est survenue !');
          console.log(err)
        })

      }else{
        this.setState({ loading: false });
        this.openSnackbar('error', 'Une erreur est survenue !');
        console.log(updateRes.error)
      }

    }).catch(err => {
      console.log(err)
      this.setState({ loading: false });
      this.openSnackbar('error', 'Une erreur est survenue !');
    })
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

  uploadImage_Prestataire = (image) => {
    this.setState({ loading: true });
    let imgToUpload = image.target.files[0];

    if(imgToUpload.type === "image/png" || imgToUpload.type === "image/jpeg" || imgToUpload.type === "image/jpg"){
      var reader = new FileReader();
      reader.onloadend = () => {
        let selectedContact = this.state.selectedContact;
        selectedContact.imageUrl = reader.result;
        rethink.update("test",'table("prestataires").get('+JSON.stringify(selectedContact.id)+').update('+ JSON.stringify(selectedContact) + ')',db_name,false).then( updateRes => {
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
              method: 'POST', url: endpoint + '/ged/' + ged_id + '/doc/addfile',
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
          folders: main_functions.changeStructure(gedRes.data.Proprietary.Content.folders || [],this.state.showFileInGed),
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
              folders: main_functions.changeStructure(gedRes.data.Proprietary.Content.folders || [],this.state.showFileInGed),
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
              folders: main_functions.changeStructure(gedRes.data.Proprietary.Content.folders || [],this.state.showFileInGed),
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
            let sharedFolders = main_functions.changeStructure(parentSharedFolder,false);
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
              folders: main_functions.changeStructure(gedRes.data.Proprietary.Content.folders || [],this.state.showFileInGed),
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

    this.verifIsTableExist("rooms").then( v => {

          let members = [];
          if((room.members || []).filter(x => x.email === localStorage.getItem("email")).length === 0){
            members.push({email:localStorage.getItem("email"),id:main_functions.getContactIdByEmail(this.state.contacts,localStorage.getItem("email"))})
          }
          (room.members || []).map((m,key) => {
            members.push({email:m.email,id:main_functions.getContactIdByEmail(this.state.contacts,m.email)})
          })
          let newRoom={
            uid : utilFunctions.getUID(),
            title:room.title,
            color:room.color,
            created_by:room.created_by,
            created_at:room.created_at,
            members:members
          }
          rethink.insert("test",'table("rooms").insert('+ JSON.stringify(newRoom) + ')',db_name,false).then( resAdd => {
            if (resAdd && resAdd === true) {
              setTimeout(() => {
                let findNew = this.state.rooms.find(x => x.uid === newRoom.uid)
                this.setState({
                  loading: false,
                  newRoomTitle: '',
                  newRoomColor:"#f0f0f0",
                  NewRoomEmails: [],
                  selectedRoom: findNew,
                  selectedRoomKey: (this.state.rooms.length - 1),
                  selectedRoomItems: [findNew.id]
                });
                this.props.history.push('/home/rooms/' + findNew.id);
                this.openSnackbar('success', 'Room ajouté avec succès');
              },500)
            } else {
              this.setState({ loading: false });
              this.openSnackbar('error', "Une erreur est survenue");
            }
          }).catch(err => {
            console.log(err)
          })



    }).catch(err => {console.log(err)})
  };

  openPdfModal = (doc_id) => {
    this.setState({ loading: true });
    SmartService.getFile(doc_id, localStorage.getItem('token'), localStorage.getItem('usrtoken')).then(fileRes => {
      if (fileRes.succes === true && fileRes.status === 200) {
        this.setState({ loading: false });
        this.showDocInPdfModal(fileRes.data.Content.Data);
      } else {
        this.setState({ loading: false });
        this.openSnackbar("error",fileRes.error)
        console.log(fileRes.error);
      }
    }).catch(err => {
      this.setState({ loading: false });
      console.log(err)
    });
  };

  importCSVContacts(e){
    this.setState({loading:true})
      let file = e.target.files[0];
      if(file.type === "application/vnd.oasis.opendocument.spreadsheet" || file.type === "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" ||
          file.type === "application/vnd.ms-excel" || file.type === "text/csv"){

        xlsxParser.onFileSelection(file)
            .then( data => {
              let parsedData = Object.entries(data);
              let contacts = parsedData[0][1];
              let test = false;
              let arrayToAdd = [];
              contacts.map((c,key) => {
                if(c.email && c.email !== "" && !verfiForms.verif_Email(c.email) ){
                  c.uid = utilFunctions.getUID()
                  c.created_at = moment().format("YYYY-MM-DD HH:mm:ss")
                  arrayToAdd.push(c)
                }else{
                  test=true
                }
              });
              rethink.insert("test",'table("contacts").insert('+ JSON.stringify(arrayToAdd) + ')',db_name,false).then( rAdd => {
                if(rAdd && rAdd === true){
                  this.setState({loading:false})
                  this.openSnackbar("success","Fichier importé avec succès");
                }else{
                  this.openSnackbar("error","Une erreur est survenue !")
                }
              }).catch(err => {console.log(err)})

              if(test === true){
                setTimeout(()=> {
                  this.openSnackbar("warning","Certaines lignes ne sont pas ajoutées ! Merci de vérifier le format de leurs adresses mail et réessayer")
                },1500);
              }

            }).catch(err => {
          this.setState({loading:false})
          console.log(err)
          this.openSnackbar("error",err)
        })
      }else{
        this.setState({loading:false})
        this.openSnackbar("error","Type de fichier erroné ! Seulement les formats .xls, .xls, .csv sont acceptés")
      }
  }

  importCSVClients(lignes) {
    this.setState({loading: true})
    let test = false;
    let arrayToAdd = [];
    lignes.map((c, key) => {
      if (c.email && c.email !== "" && !verfiForms.verif_Email(c.email)) {
        c.ID = utilFunctions.getUID()
        c.created_at = moment().format("YYYY-MM-DD HH:mm:ss")
        c.isActif = "true"
        arrayToAdd.push(c)
      } else {
        test = true
      }
    });
    if (arrayToAdd.length > 0) {

      this.verifIsTableExist("annuaire_clients_mandat").then( v => {
        rethink.clearTable(db_name, "annuaire_clients_mandat", "test").then(clearRes => {
          if (clearRes && clearRes === true) {

            rethink.insert("test", 'table("annuaire_clients_mandat").insert(' + JSON.stringify(arrayToAdd) + ')', db_name, false).then(rAdd => {
              if (rAdd && rAdd === true) {
                this.setState({loading: false})
                this.openSnackbar("success", "Fichier importé avec succès");
              } else {
                this.openSnackbar("error", "Une erreur est survenue !")
              }
            }).catch(err => {
              console.log(err)
            })

            if (test === true) {
              setTimeout(() => {
                this.openSnackbar("warning", "Certaines lignes ne sont pas ajoutées ! Merci de vérifier le format de leurs adresses mail et réessayer")
              }, 1500);
            }

          } else {
            this.openSnackbar("error", "Une erreur est survenue !")
          }
        }).catch(err => {
          console.log(err)
        })
      }).catch(err => {console.log(err)});

    } else {
      this.setState({loading:false})
      this.openSnackbar("error", "Ficher vide ou aucune ligne encore ajoutée ! Merci de vérifier votre document")
    }

    /*if (file.type === "application/vnd.oasis.opendocument.spreadsheet" || file.type === "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" ||
        file.type === "application/vnd.ms-excel" || file.type === "text/csv") {
    }else{
      this.setState({loading:false})
      this.openSnackbar("error","Type de fichier erroné ! Seulement les formats .xls, .xls, .csv sont acceptés")
    }*/
  }



  renderLeftMenu = () => {
    return (
      <div>
        <LeftMenuV3
            p_packs={this.state.p_packs || [] }
            loadingGed={this.state.loadingGed}
            showFileInGed={this.state.showFileInGed}
            setShowFileInGed={(value) => {
              console.log("CHANGE")
              this.setState({
                folders: main_functions.changeStructure(this.state.reelFolders || [],value),
                showFileInGed:!this.state.showFileInGed,
              });
            }}
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
              ? this.props.history.push('/home/rooms')
              : item === 'Meet'
                ? this.props.history.push('/home/meet/new')
                : item === 'Contacts'
                  ? this.props.history.push('/home/contacts')
                  : item === 'Societe'
                    ? this.props.history.push('/home/clients')
                    : item === 'TimeSheet'
                      ? this.props.history.push('/home/timeSheet/activities') :
                                item === "Invoices" ? this.props.history.push('/home/compta/factures') :
                                item === 'marketplace' ? active_modules.includes("MARKETPLACE_EDITEUR_RECETTE") ?
                                    this.props.history.push('/home/marketplace/recettes') : this.props.history.push('/home/drive') : this.props.history.push('/home/drive') ;
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
          setShowRoomsMenuItems={() => {
              this.setState({
                selectedRoom:"",
                selectedRoomKey:"",
                selectedRoomItems:[],
                openRoomMenuItem: !this.state.openRoomMenuItem
              })
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
            if(nodeId === "societyService"){
              this.setState({
                focusedItem: 'marketplace',
                showContainerSection: 'marketplace',
                selectedMarketplaceMenuItem: ['societyService']
              });
              this.props.history.push('/home/marketplace/gestion_societes');
            }
            if(nodeId === "AUGM_CAPITAL"){
              this.setState({
                focusedItem: 'marketplace',
                showContainerSection: 'marketplace',
                selectedMarketplaceMenuItem: ['AUGM_CAPITAL']
              });
              this.props.history.push('/home/marketplace/augm_capital');
            }
            if(nodeId === "CESSION_ACTIONS"){
              this.setState({
                focusedItem: 'marketplace',
                showContainerSection: 'marketplace',
                selectedMarketplaceMenuItem: ['CESSION_ACTIONS']
              });
              this.props.history.push('/home/marketplace/cession_actions');
            }
            if(nodeId === "CONVERTIBLE_LOAN"){
              this.setState({
                focusedItem: 'marketplace',
                showContainerSection: 'marketplace',
                selectedMarketplaceMenuItem: ['CONVERTIBLE_LOAN']
              });
              this.props.history.push('/home/marketplace/convertible_loan');
            }
            if(nodeId === "recettes"){
              this.setState({
                focusedItem: 'marketplace',
                showContainerSection: 'marketplace',
                selectedMarketplaceMenuItem: ['recettes']
              });
              this.props.history.push('/home/marketplace/recettes');
            }
            if(nodeId === "produits"){
              this.setState({
                focusedItem: 'marketplace',
                showContainerSection: 'marketplace',
                selectedMarketplaceMenuItem: ['produits']
              });
              this.props.history.push('/home/marketplace/produits');
            }else if(nodeId === "RH_Support_ponctuel"){
              this.setState({
                focusedItem: 'marketplace',
                showContainerSection: 'marketplace',
                selectedMarketplaceMenuItem: ['RH_Support_ponctuel']
              });
              this.props.history.push('/home/marketplace/RH_Support_ponctuel');
            }else if(nodeId === "RH_Distribution"){
              this.setState({
                focusedItem: 'marketplace',
                showContainerSection: 'marketplace',
                selectedMarketplaceMenuItem: ['RH_Distribution']
              });
              this.props.history.push('/home/marketplace/RH_Distribution');
            }else if(nodeId === "RH_CUISINE"){
              this.setState({
                focusedItem: 'marketplace',
                showContainerSection: 'marketplace',
                selectedMarketplaceMenuItem: ['RH_CUISINE']
              });
              this.props.history.push('/home/marketplace/RH_CUISINE');
            }else if(nodeId === "RH_Support_markt"){
              this.setState({
                focusedItem: 'marketplace',
                showContainerSection: 'marketplace',
                selectedMarketplaceMenuItem: ['RH_Support_markt']
              });
              this.props.history.push('/home/marketplace/RH_Support_markt');
            }else if(nodeId === "RH_HW_Livr"){
              this.setState({
                focusedItem: 'marketplace',
                showContainerSection: 'marketplace',
                selectedMarketplaceMenuItem: ['RH_HW_Livr']
              });
              this.props.history.push('/home/marketplace/RH_HW_Livr');
            }else if(nodeId === "RH_DK"){
              this.setState({
                focusedItem: 'marketplace',
                showContainerSection: 'marketplace',
                selectedMarketplaceMenuItem: ['RH_DK']
              });
              this.props.history.push('/home/marketplace/RH_DK');
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
              focusedItem: 'Rooms',
              selectedRoomTab:0
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
            console.log(this.state.selectedFolder)
            this.renameFile_Folder(this.state.selectedFolder, newName);
          }}

            showComptaMenuItems={this.state.openComptaMenu}
            selectedComptaMenuItem={this.state.showContainerSection === 'Invoices' ? this.state.selectedComptaMenuItem : []}
            setComptaMenuItems={() => {
              this.setState({
                openComptaMenu: !this.state.openComptaMenu,
                showContainerSection: 'Invoices',
                selectedComptaMenuItem: ['Invoices']
              });
              this.props.history.push('/home/compta/factures');
            }}
            onComptaItemClick={(nodeId) => {
              this.setState({
                focusedItem: 'nodeId',
                showContainerSection: 'Invoices',
                selectedComptaMenuItem: [nodeId]
              });
              if(nodeId === "Invoices"){
                this.props.history.push('/home/compta/factures');
              }else{
                this.props.history.push('/home/compta/new');
              }

            }}
            handleSelectComptaMenu={(event, nodeIds) => {
              this.setState({selectedComptaMenuItem: nodeIds});
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

  before_save_AvanceFrais(clientFname,client_id,file,folder_id,date,client_folder_name,amount,desc){
    let odoo_companies = this.state.odoo_companies || [];
    let facture_company_id;
    let findCompany = odoo_companies.find(x => x.client_id === client_id );

    if(findCompany){
      console.log("COMPANY FOUND")
      facture_company_id = findCompany.odoo_company_id;
      this.save_avanceFrais(file,folder_id,date,facture_company_id,client_folder_name,amount,desc)
    }
    else{
      console.log("COMPANY NOT FOUND")
      SmartService.create_company(localStorage.getItem('token'), localStorage.getItem('usrtoken'), { param: { name: clientFname } }).then(newCompRes => {
        if(newCompRes.succes === true && newCompRes.status === 200){
          facture_company_id = newCompRes.data.id;
          this.verifIsTableExist("odoo_companies").then( v => {
            let newItem = {
              odoo_company_id:facture_company_id,
              client_name:clientFname,
              client_id:client_id,
              created_at:moment().format("YYYY-MM-DD HH:mm:ss")
            }
            rethink.insert("test",'table("odoo_companies").insert('+ JSON.stringify(newItem) + ')',db_name,false).then( resAdd => {
              if (resAdd && resAdd === true) {
                this.save_avanceFrais(file,folder_id,date,facture_company_id,client_folder_name,amount,desc)
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

  async save_avanceFrais(file,folder_id,date,facture_company_id,client_folder_name,amount,desc){
    this.setState({loading_avance_frais:true})
    let b64 = await main_functions.toBase64(file)

    let acces_token = utilFunctions.getUID();
    let odoo_data = [{
      'access_token': acces_token,
      'type': 'out_invoice',
      "move_name":false,
      "user_id":6,
      "team_id":1,
      "comment":false,
      'l10n_ch_isr_sent': false,
      'name': false,   //on peut mettre une petite desc sous le titre de la facture avec ce champs
      'date_invoice': moment(date).format('YYYY-MM-DD'),
      /*'date_due': moment(date).format('YYYY-MM-DD'),*/
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
      /*'invoice_date_due': moment(deadline_date).format('YYYY-MM-DD'),*/
      'company_id': 1,
      'amount_untaxed': 0,
      'amount_by_group': [],
      'amount_total': 0,
      'invoice_payments_widget': 'False',
      'amount_residual': 0,
      'invoice_outstanding_credits_debits_widget': false,
      'invoice_origin': false,
      'invoice_cash_rounding_id': false,
      'invoice_source_email': false,
      'invoice_payment_ref': false,
      'reversed_entry_id': false,
      'message_follower_ids': [],
      'activity_ids': [],
      'message_ids': [],
      'message_attachment_count': 0,
      'invoice_line_ids': [],
      "account_id": 6,
      "reference": client_folder_name,
      "fiscal_position_id": false,
      "origin": false,
      "reference_type":"none",
      "incoterm_id":false,
      "sequence_number_next":false,
      "partner_shipping_id":facture_company_id,
      "payment_term_id":"",
      "partner_bank_id":"",
      'bank_partner_id': "",
      'invoice_partner_bank_id': "",
    }];

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
            'name':'Avance de frais: '+desc,
            'origin': false,
            'price_unit': amount,
            'product_id': 1,
            'quantity': 1,
            'sequence': 10,
            "uom_id":1,
            /*'invoice_line_tax_ids': [
              [
                6,
                false,
                tax && tax !== "" ? [tax] : []
              ]
            ]*/
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
    SmartService.create_facture_odoo(localStorage.getItem('token'), localStorage.getItem('usrtoken'), { data: odoo_data }).then(createFactRes => {
      console.log(createFactRes)
      if (createFactRes.succes === true && createFactRes.status === 200) {
        SmartService.validate_facture_odoo(localStorage.getItem('token'), localStorage.getItem('usrtoken'),
            {
              data: [[createFactRes.data.id], {
                journal_type: "sale",
                lang: "fr_CH",
                type: "out_invoice",
                tz: false,
                uid: 8
              }]
            }).then(validateRes => {

          if (validateRes.succes === true && validateRes.status === 200) {

            SmartService.generate_facture_odoo(localStorage.getItem('token'), localStorage.getItem('usrtoken'),createFactRes.data.id,acces_token).then(genFactRes => {
              if (genFactRes.succes === true && genFactRes.status === 200) {

                let b64_fact = genFactRes.data.pdf;

                /*SmartService.mergePdf(localStorage.getItem('token'),localStorage.getItem('usrtoken'),{b64_1:b64,b64_2:b64_fact}).then(mergeRes => {
                  console.log(mergeRes)
                  if (mergeRes.succes === true && mergeRes.status === 200) {

                  }else{

                  }
                }).catch(err => {
                  console.log(err)
                })*/

                //
                this.verifIsTableExist("factures").then( v => {
                  let newItem = {
                    ID:utilFunctions.getUID(),
                    date_facture:moment(this.state.TimeSheet.newTime.date).format("YYYY-MM-DD HH:mm:ss"),
                    created_at:moment().format("YYYY-MM-DD HH:mm:ss"),
                    created_by:localStorage.getItem("email"),
                    client:this.state.TimeSheet.newTime.client,
                    client_id:this.state.TimeSheet.newTime.client_id,
                    partner:localStorage.getItem("email"),
                    details_avancefrais:{
                      amount:amount,
                      desc:desc,
                      file:b64,
                      fileName:file.name.slice(0,-4)
                    },
                    statut:"confirmed",
                    client_folder:{
                      id:this.state.TimeSheet.newTime.dossier_client.folder_id,
                      name:this.state.TimeSheet.newTime.dossier_client.name
                    },
                    type:"avance_frais",
                    facture_odoo_id:createFactRes.data.id,
                    facture_acces_token:acces_token
                  }
                  rethink.insert("test",'table("factures").insert('+ JSON.stringify(newItem) + ')',db_name,false).then( resAdd => {
                    if (resAdd && resAdd === true) {

                      SmartService.getFile(folder_id, localStorage.getItem('token'), localStorage.getItem('usrtoken')).then(Res => {
                        if (Res.succes === true && Res.status === 200) {
                          let folders = Res.data.Content.folders || [];
                          let findCompta_folder = folders.find(x => x.name === "COMPTABILITE");
                          if(findCompta_folder){

                            SmartService.getFile(findCompta_folder.id, localStorage.getItem('token'), localStorage.getItem('usrtoken')).then(Res2 => {
                              if (Res2.succes === true && Res2.status === 200) {

                                let find_avanceFrais_folder = (Res2.data.Content.folders || []).find(x => x.name === "AVANCE DE FRAIS");
                                if(find_avanceFrais_folder){

                                  SmartService.addFileFromBas64({b64file:b64,folder_id:find_avanceFrais_folder.id},
                                      localStorage.getItem("token"),localStorage.getItem("usrtoken")).then( addFileRes => {
                                    if (addFileRes.succes === true && addFileRes.status === 200) {

                                      SmartService.updateFileName({name:file.name.slice(0, -4)}, addFileRes.data.file_id,
                                          localStorage.getItem("token"),localStorage.getItem("usrtoken")).then( updateNameRes => {
                                        if(updateNameRes.succes === true && updateNameRes.status === 200){
                                          this.setState({loading_avance_frais:false,provision_amount:"",avance_frais_desc:"",avance_frais_facture_file:""})
                                          this.openSnackbar("success","Votre document est bien enregistré dans le dossier 'Avance de frais' dans le dossier Comptabilite de client ")
                                          this.justReloadGed()
                                        }else{
                                          console.log(updateNameRes.error)
                                          this.openSnackbar("error",updateNameRes.error)
                                          this.setState({loading:false})
                                        }
                                      }).catch(err => {
                                        console.log(err)
                                        this.openSnackbar("error","Une erreur est survenue")
                                      })
                                    } else {
                                      console.log(addFileRes.error)
                                      this.setState({loading_avance_frais:false})
                                    }
                                  }).catch(err => {
                                    console.log(err)
                                    this.setState({loading_avance_frais:false})
                                  })

                                }else{

                                  SmartService.addFolder({name: "AVANCE DE FRAIS", folder_id:findCompta_folder.id},
                                      localStorage.getItem('token'), localStorage.getItem('usrtoken')).then(addFolderRes => {
                                    if (addFolderRes.succes === true && addFolderRes.status === 200) {

                                      SmartService.addFileFromBas64({b64file:b64,folder_id:addFolderRes.data.id},
                                          localStorage.getItem("token"),localStorage.getItem("usrtoken")).then( addFileRes => {
                                        if (addFileRes.succes === true && addFileRes.status === 200) {

                                          SmartService.updateFileName({name:file.name.slice(0, -4)}, addFileRes.data.file_id,
                                              localStorage.getItem("token"),localStorage.getItem("usrtoken")).then( updateNameRes => {
                                            if(updateNameRes.succes === true && updateNameRes.status === 200){
                                              this.setState({loading_avance_frais:false,provision_amount:"",avance_frais_desc:"",avance_frais_facture_file:""})
                                              this.openSnackbar("success","Votre document est bien enregistré dans le dossier 'Avance de frais' dans le dossier Comptabilite de client ")
                                              this.justReloadGed()
                                            }else{
                                              console.log(updateNameRes.error)
                                              this.openSnackbar("error",updateNameRes.error)
                                              this.setState({loading:false})
                                            }
                                          }).catch(err => {
                                            console.log(err)
                                            this.openSnackbar("error","Une erreur est survenue")
                                          })

                                        } else {
                                          console.log(addFileRes.error)
                                          this.setState({loading_avance_frais:false})
                                        }
                                      }).catch(err => {
                                        console.log(err)
                                        this.setState({loading_avance_frais:false})
                                      })

                                    }else{
                                      console.log(addFolderRes.error)
                                      this.setState({loading_avance_frais:false})
                                    }
                                  }).catch(err => {
                                    console.log(err)
                                    this.setState({loading_avance_frais:false})
                                  })

                                }

                              }else{
                                console.log(Res2.error)
                                this.setState({loading_avance_frais:false})
                              }
                            }).catch(err => {
                              console.log(err)
                              this.setState({loading_avance_frais:false})
                            })
                          }else{
                            this.openSnackbar("error","Dossier 'COMPTABILITE' inexistant dans le dossier de client ! ")
                            this.setState({loading_avance_frais:false})
                          }
                        }else{
                          console.log(Res.error)
                          this.setState({loading_avance_frais:false})
                        }
                      }).catch(err => {
                        console.log(err)
                        this.setState({loading_avance_frais:false})
                      })

                    } else {
                      this.setState({partnerFacture:"",loading:false})
                      this.openSnackbar("error","Une erreur est survenue !")
                    }
                  }).catch(err => {
                    this.setState({partnerFacture:"",loading:false})
                    this.openSnackbar("error","Une erreur est survenue !")
                  })
                }).catch(err => {console.log(err)})

              } else {
                console.log(genFactRes.error)
              }
            }).catch(err => {console.log(err)})

          }else{
            console.log(validateRes.error)
          }
        }).catch(err => {
          console.log(err)
        })
      }
    }).catch(err => {console.log(err)})
  }

  generateProvisionDoc(new_timeSheet_desc){
    this.setState({loading_provision_preview:true})
    let lang = new_timeSheet_desc === "Description (anglais)" ? "en" : "fr";
    let bank = JSON.parse(this.state.provision_bank)
    let tax = this.state.odoo_taxs.find(x => x.value === this.state.provision_tax);
    let tax_label = tax.text;
    DocGenerationService.generateProvision({
      lang:lang,
      data:{
        client:this.state.TimeSheet.newTime.client,
        client_adress:main_functions.getClientAdressById(this.state.annuaire_clients_mandat || [],this.state.TimeSheet.newTime.client_id),
        gender:main_functions.getClientTypeById(this.state.annuaire_clients_mandat || [],this.state.TimeSheet.newTime.client_id) === "0" ? "" :"Mr/Ms ",
        date:moment().format("DD/MM/YYYY"),
        price:this.state.provision_amount,
        bank:bank.title,
        iban:bank.code,
        swift:bank.swift_bic,
        clearing:bank.clearing,
        ref:this.state.TimeSheet.newTime.client + " - " + this.state.TimeSheet.newTime.dossier_client.name,
        oa_contact:main_functions.getContactReverseFnameByEmail(this.state.contacts || [],localStorage.getItem("email")),
        TVA:tax_label
      }}).then( res => {
      console.log(res)
      this.setState({loading_provision_preview:false})
      this.showDocInPdfModal(res.data,"Provision_" + moment().format("DD-MM-YYYY HH:mm"),"pdf")
    }).catch(err => {
      this.setState({loading_provision_preview:false})
      this.openSnackbar("error","Une erreur est survenue !")
      console.log(err)
    })
  }

  before_save_provison(clientFname,client_id,new_timeSheet_desc,date,client_folder_name,paymTerm,compte_banc,amount,tax){

    let odoo_companies = this.state.odoo_companies || [];
    let facture_company_id;
    let findCompany = odoo_companies.find(x => x.client_id === client_id );

    if(findCompany){
      console.log("COMPANY FOUND")
      facture_company_id = findCompany.odoo_company_id;
      this.saveProvisionDoc(new_timeSheet_desc,date,client_folder_name,paymTerm,compte_banc,amount,tax,facture_company_id)
    }
    else{
      console.log("COMPANY NOT FOUND")
      SmartService.create_company(localStorage.getItem('token'), localStorage.getItem('usrtoken'), { param: { name: clientFname } }).then(newCompRes => {
        if(newCompRes.succes === true && newCompRes.status === 200){
          facture_company_id = newCompRes.data.id;
          this.verifIsTableExist("odoo_companies").then( v => {
            let newItem = {
              odoo_company_id:facture_company_id,
              client_name:clientFname,
              client_id:client_id,
              created_at:moment().format("YYYY-MM-DD HH:mm:ss")
            }
            rethink.insert("test",'table("odoo_companies").insert('+ JSON.stringify(newItem) + ')',db_name,false).then( resAdd => {
              if (resAdd && resAdd === true) {
                this.saveProvisionDoc(new_timeSheet_desc,date,client_folder_name,paymTerm,compte_banc,amount,tax,facture_company_id)
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

  saveProvisionDoc(new_timeSheet_desc,date,client_folder_name,paymTerm,compte_banc,amount,tax,facture_company_id){

    this.setState({loading_provision_save:true})
    let lang = new_timeSheet_desc === "Description (anglais)" ? "en" : "fr";
    let bank = JSON.parse(this.state.provision_bank)
    let tax_tmp = this.state.odoo_taxs.find(x => x.value === this.state.provision_tax);
    let tax_label = tax_tmp.text;
    DocGenerationService.generateProvision({
      lang:lang,
      data:{
        client:this.state.TimeSheet.newTime.client,
        client_adress:main_functions.getClientAdressById(this.state.annuaire_clients_mandat || [],this.state.TimeSheet.newTime.client_id),
        gender:main_functions.getClientTypeById(this.state.annuaire_clients_mandat || [],this.state.TimeSheet.newTime.client_id) === "0" ? "" :"Mr/Ms",
        date:moment().format("DD/MM/YYYY"),
        price:this.state.provision_amount,
        bank:bank.title,
        iban:bank.code,
        swift:bank.swift_bic,
        clearing:bank.clearing,
        ref:this.state.TimeSheet.newTime.client + " - " + this.state.TimeSheet.newTime.dossier_client.name,
        oa_contact:main_functions.getContactFnameByEmail(this.state.contacts || [],localStorage.getItem("email")),
        TVA:tax_label
      }}).then( res => {


      SmartService.getFile(this.state.TimeSheet.newTime.dossier_client.folder_id,localStorage.getItem("token"),localStorage.getItem("usrtoken")).then(resF => {
        if (resF.succes === true && resF.status === 200) {
          let comptaFolder = resF.data.Content.folders.find(x => x.name === "COMPTABILITE");
          if(comptaFolder){

            SmartService.addFileFromBas64({b64file:res.data,folder_id:comptaFolder.id},
                localStorage.getItem("token"),localStorage.getItem("usrtoken")).then( addFileRes => {

              if(addFileRes.succes === true && addFileRes.status === 200) {
                let fileName = "Provision_" + moment().format("DD-MM-YYYY HH:mm");
                SmartService.updateFileName({name:fileName},
                    addFileRes.data.file_id,localStorage.getItem("token"),localStorage.getItem("usrtoken")).then( updateNameRes => {
                  if(updateNameRes.succes === true && updateNameRes.status === 200){
                    this.justReloadGed()

                    setTimeout(() => {

                      let acces_token = utilFunctions.getUID();
                      let odoo_data = [{
                        'access_token': acces_token,
                        'type': 'out_invoice',
                        "move_name":false,
                        "user_id":6,
                        "team_id":1,
                        "comment":false,
                        'l10n_ch_isr_sent': false,
                        'name': false,   //on peut mettre une petite desc sous le titre de la facture avec ce champs
                        'date_invoice': moment(date).format('YYYY-MM-DD'),
                        /*'date_due': moment(date).format('YYYY-MM-DD'),*/
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
                        /*'invoice_date_due': moment(deadline_date).format('YYYY-MM-DD'),*/
                        'company_id': 1,
                        'amount_untaxed': 0,
                        'amount_by_group': [],
                        'amount_total': 0,
                        'invoice_payments_widget': 'False',
                        'amount_residual': 0,
                        'invoice_outstanding_credits_debits_widget': false,
                        'invoice_origin': false,
                        'invoice_cash_rounding_id': false,
                        'invoice_source_email': false,
                        'invoice_payment_ref': false,
                        'reversed_entry_id': false,
                        'message_follower_ids': [],
                        'activity_ids': [],
                        'message_ids': [],
                        'message_attachment_count': 0,
                        'invoice_line_ids': [],
                        "account_id": 6,
                        "reference": client_folder_name,
                        "fiscal_position_id": false,
                        "origin": false,
                        "reference_type":"none",
                        "incoterm_id":false,
                        "sequence_number_next":false,
                        "partner_shipping_id":facture_company_id,
                        "payment_term_id":paymTerm,
                        "partner_bank_id":compte_banc,
                        'bank_partner_id': compte_banc,
                        'invoice_partner_bank_id': compte_banc,
                      }];

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
                              'name':'Prosivion',
                              'origin': false,
                              'price_unit': amount,
                              'product_id': 1,
                              'quantity': 1,
                              'sequence': 10,
                              "uom_id":1,
                              'invoice_line_tax_ids': [
                                [
                                  6,
                                  false,
                                  (tax && tax !== "" && tax !== "Hors TVA") ? [tax] : []
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

                      SmartService.create_facture_odoo(localStorage.getItem('token'), localStorage.getItem('usrtoken'), { data: odoo_data }).then(createFactRes => {
                        console.log(createFactRes)
                        if (createFactRes.succes === true && createFactRes.status === 200) {
                          SmartService.validate_facture_odoo(localStorage.getItem('token'), localStorage.getItem('usrtoken'),
                              {
                                data: [[createFactRes.data.id], {
                                  journal_type: "sale",
                                  lang: "fr_CH",
                                  type: "out_invoice",
                                  tz: false,
                                  uid: 8
                                }]
                              }).then(validateRes => {
                            console.log(validateRes)
                            if (validateRes.succes === true && validateRes.status === 200) {

                              this.verifIsTableExist("factures").then( v => {
                                let newItem = {
                                  ID:utilFunctions.getUID(),
                                  date_facture:moment(this.state.TimeSheet.newTime.date).format("YYYY-MM-DD HH:mm:ss"),
                                  created_at:moment().format("YYYY-MM-DD HH:mm:ss"),
                                  created_by:localStorage.getItem("email"),
                                  client:this.state.TimeSheet.newTime.client,
                                  client_id:this.state.TimeSheet.newTime.client_id,
                                  partner:localStorage.getItem("email"),
                                  details_provision:{
                                    amount:this.state.provision_amount,
                                    bank:JSON.parse(this.state.provision_bank),
                                    tax:this.state.provision_tax,
                                    b64_pdf_oa:res.data,
                                    pdf_oa_name:fileName
                                  },
                                  statut:"confirmed",
                                  client_folder:{
                                    id:this.state.TimeSheet.newTime.dossier_client.folder_id,
                                    name:this.state.TimeSheet.newTime.dossier_client.name
                                  },
                                  type:"provision",
                                  facture_odoo_id:createFactRes.data.id,
                                  facture_acces_token:acces_token
                                }
                                rethink.insert("test",'table("factures").insert('+ JSON.stringify(newItem) + ')',db_name,false).then( resAdd => {
                                  if (resAdd && resAdd === true) {
                                    this.setState({loading_provision_save:false,provision_amount:"",provision_bank:""})
                                    this.openSnackbar("success","Le document de provision est bien enregistré dans le dossier Comptabilité du client " + this.state.TimeSheet.newTime.client)
                                  } else {
                                    this.setState({partnerFacture:"",loading:false})
                                    this.openSnackbar("error","Une erreur est survenue !")
                                  }
                                }).catch(err => {
                                  this.setState({partnerFacture:"",loading:false})
                                  this.openSnackbar("error","Une erreur est survenue !")
                                })
                              }).catch(err => {console.log(err)})
                            }else{
                              console.log(validateRes.error)
                            }
                          }).catch(err => {
                            console.log(err)
                          })
                        }
                      }).catch(err => {console.log(err)})

                    },500)
                  }else{
                    console.log(updateNameRes.error)
                    this.openSnackbar("error",updateNameRes.error)
                    this.setState({loading_provision_save:false})
                  }
                }).catch(err => {
                  console.log(err)
                  this.setState({loading_provision_save:false})
                  this.openSnackbar("error","Une erreur est survenue")
                })
              }else{
                console.log(addFileRes.error)
                this.openSnackbar("error",addFileRes.error)
                this.setState({loading_provision_save:false})
              }
            }).catch(err => {
              console.log(err)
              this.openSnackbar("error","Une erreur est survenue")
              this.setState({loading_provision_save:false})
            })

          }else{
            this.setState({loading_provision_save:false})
            this.openSnackbar("error","Dossier COMPTABILITE non trouvé dans le dossier de client !")
          }
        }
      }).catch(err => {
        console.log(err)
      })


    }).catch(err => {
      this.setState({loading_provision_save:false})
      this.openSnackbar("error","Une erreur est survenue !")
      console.log(err)
    })
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
        client_folder:client_folder
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

  updateFacture(id_facture,updatedItem){
    this.setState({loading:true})
    rethink.update("test",'table("factures").get('+JSON.stringify(id_facture)+').update('+ JSON.stringify(updatedItem) + ')',db_name,false).then( updateRes => {
      if (updateRes && updateRes === true) {
        this.setState({loading:false})
        this.openSnackbar("success","Modification efectuée avec succès")
      } else {
        this.setState({loading:false})
        this.openSnackbar("error","Une erreur est survenue !")
      }
    }).catch(err => {
      this.setState({loading:false})
      this.openSnackbar("error","Une erreur est survenue !")
      console.log(err)
    })
  }

  before_create_facture(facture_date,lignes_f,folder_id,facture,template,client,paymTerm,deadline_date,tax,fraisAdmin,compte_banc,reductionType,reductionAmount){
    this.setState({loading:true})

    let odoo_companies = this.state.odoo_companies || [];
    let facture_company_id;
    let findCompany = odoo_companies.find(x => x.client_id === facture.client_id );

    if(findCompany){
      facture_company_id = findCompany.odoo_company_id;
      this.createFacture(facture_date,lignes_f,folder_id,facture,template,client,facture_company_id,paymTerm,deadline_date,tax,fraisAdmin,compte_banc,reductionType,reductionAmount)

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

                this.createFacture(facture_date,lignes_f,folder_id,facture,template,client,facture_company_id,paymTerm,deadline_date,tax,fraisAdmin,compte_banc,reductionType,reductionAmount)

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

  before_preview_facture(facture_date,lignes_f,folder_id,facture,template,client,paymTerm,deadline_date,tax,fraisAdmin,compte_banc,reductionType,reductionAmount){

    this.setState({loading:true})

    let odoo_companies = this.state.odoo_companies || [];
    let facture_company_id;
    let findCompany = odoo_companies.find(x => x.client_id === facture.client_id );

    if(findCompany){
      console.log("COMPANY FOUND")
      facture_company_id = findCompany.odoo_company_id;
      this.previewFacture(facture_date,lignes_f,folder_id,facture,template,client,facture_company_id,paymTerm,deadline_date,tax,fraisAdmin,compte_banc,reductionType,reductionAmount)

    }
    else{
      console.log("COMPANY NOT FOUND")
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

                this.previewFacture(facture_date,lignes_f,folder_id,facture,template,client,facture_company_id,paymTerm,deadline_date,tax,fraisAdmin,compte_banc,reductionType,reductionAmount)

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

  previewFacture(facture_date,lignes_f,folder_id,facture,template,client,facture_company_id,paymTerm,deadline_date,tax,fraisAdmin,compte_banc,reductionType,reductionAmount){

    this.setState({loading:true})
    let id_facture = facture.id

    let lignes_factures = lignes_f;
    let total = 0;
    lignes_factures.map((ligne, key) => {
      total = total + (ligne.newTime.duree * parseFloat(ligne.newTime.rateFacturation));
    })
    let acces_token = facture.facture_acces_token ? facture.facture_acces_token : utilFunctions.getUID();

    let odoo_data = [];
    odoo_data.push({
      'access_token': acces_token,
      'type': 'out_invoice',
      "move_name":false,
      "user_id":2,
      /*"team_id":1,*/
      "comment":false,
      'l10n_ch_isr_sent': false,
      'name': false,   //on peut mettre une petite desc sous le titre de la facture avec ce champs
      'date_invoice': moment(facture_date).format('YYYY-MM-DD'),
      'date_due': moment(deadline_date).format('YYYY-MM-DD'),
      'journal_id': 1,
      'currency_id': 5,
      'invoice_user_id': 2,
      'invoice_incoterm_id': false,
      'tax_lock_date_message': false,
      'id': false,
      'invoice_payment_state': 'not_paid',
      'invoice_filter_type_domain': 'sale',
      'company_currency_id': 5,
      'commercial_partner_id': '',
      'invoice_has_outstanding': false,
      'l10n_ch_currency_name': 'CHF',
      'invoice_sequence_number_next_prefix': false,
      'invoice_sequence_number_next': false,
      'invoice_has_matching_suspense_amount': false,
      'has_reconciled_entries': false,
      'restrict_mode_hash_table': false,
      'partner_id': facture_company_id,
      'invoice_vendor_bill_id': false,
      'invoice_payment_term_id': 2,
      'invoice_date_due': moment(deadline_date).format('YYYY-MM-DD'),
      'company_id': 1,
      'amount_untaxed': 0,
      'amount_by_group': [],
      'amount_total': 0,
      'invoice_payments_widget': 'False',
      'amount_residual': 0,
      'invoice_outstanding_credits_debits_widget': false,
      'invoice_origin': false,
      'invoice_cash_rounding_id': false,
      'invoice_source_email': false,
      'invoice_payment_ref': false,
      'reversed_entry_id': false,
      'message_follower_ids': [],
      'activity_ids': [],
      'message_ids': [],
      'message_attachment_count': 0,
      'invoice_line_ids': [],
      "account_id": 281,
      "reference": facture.client_folder.name,
      "fiscal_position_id": false,
      "origin": false,
      "reference_type":"none",
      "incoterm_id":false,
      "sequence_number_next":false,
      "partner_shipping_id":facture_company_id,
      "payment_term_id":paymTerm,
      /*"partner_bank_id":compte_banc,
      'bank_partner_id': compte_banc,
      'invoice_partner_bank_id': compte_banc,*/
    })

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
                                                      template === '9' ? ligne.newTime.description + ' ; ' + OAContact.nom + ' ' + OAContact.prenom + ' ; ' + ligne.newTime.duree.toFixed(2) + ' Heures' :
                                                          template === '10' ? ligne.newTime.description :
                                                              ligne.newTime.description,
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
                  tax && tax !== "" ? [tax] : []
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


    if(reductionAmount !== ""){
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
              'name':reductionType === "%" ? "Réduction("+reductionAmount+"%)" : "Réduction",
              'origin': false,
              'price_unit': reductionType === "%" ?  -  ((total * parseInt(reductionAmount)) / 100)  : - parseFloat(reductionAmount),
              'product_id': 1,  //2
              'quantity': 1,
              'sequence': 10,
              "uom_id":1,
              'analytic_tag_ids': [
                [
                  6,
                  false,
                  []
                ]
              ],
            }
          ]
      )
    }

    if(fraisAdmin === "2%"){
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
              'name':"Frais administratifs(2%)",
              'origin': false,
              'price_unit':  (total * 2) / 100,
              'product_id': 1,  //2
              'quantity': 1,
              'sequence': 10,
              "uom_id":1,
              'analytic_tag_ids': [
                [
                  6,
                  false,
                  []
                ]
              ],
            }
          ]
      )
    }


    if(facture.facture_odoo_id){

      SmartService.details_facture_odoo(localStorage.getItem('token'), localStorage.getItem('usrtoken'),facture.facture_odoo_id).then( detailsRes => {
        if(detailsRes.succes === true && detailsRes.status === 200){
          console.log(detailsRes.data[0])
          let invoice_line_ids = detailsRes.data[0].invoice_line_ids || [];
          console.log(invoice_line_ids)
          invoice_line_ids.map( id => {
            odoo_data[0].invoice_line_ids.push([2,id,{}])
          })

          SmartService.update_facture_odoo(localStorage.getItem('token'), localStorage.getItem('usrtoken'),
              { data: [[facture.facture_odoo_id],odoo_data[0]],method:"write" }).then( updateFacRes => {
            if(updateFacRes.succes === true && updateFacRes.status === 200){

              SmartService.generate_facture_odoo(localStorage.getItem('token'), localStorage.getItem('usrtoken'),facture.facture_odoo_id,facture.facture_acces_token).then(genFactRes => {

                if(genFactRes.succes === true && genFactRes.status === 200){

                  this.setState({loading:false})
                  let b64 = genFactRes.data.pdf;
                  this.showDocInPdfModal(b64,"Facture_" + moment().format("DD-MM-YYYY HH:mm"),"pdf")

                }else{
                  this.setState({loading:false})
                  console.log(genFactRes.error)
                }
              }).catch( err => {
                this.setState({loading:false})
                console.log(err)
              })

            }else{
              console.log(updateFacRes.error)
            }

          }).catch(err => {
            console.log(err)
          })

        }else{
          console.log(detailsRes.error)
        }
      }).catch(err => {
        console.log(err)
      })
    }
    else{

      SmartService.create_facture_odoo(localStorage.getItem('token'), localStorage.getItem('usrtoken'), { data: odoo_data }).then(createFactRes => {
        console.log(createFactRes)
        if (createFactRes.succes === true && createFactRes.status === 200) {

          SmartService.generate_facture_odoo(localStorage.getItem('token'), localStorage.getItem('usrtoken'),createFactRes.data.id,acces_token).then(genFactRes => {

            if(genFactRes.succes === true && genFactRes.status === 200){

              let updatedItem = facture;
              updatedItem.facture_odoo_id = createFactRes.data.id
              updatedItem.facture_acces_token = acces_token

              rethink.update("test",'table("factures").get('+JSON.stringify(id_facture)+').update('+ JSON.stringify(updatedItem) + ')',db_name,false).then( updateRes => {
                if (updateRes && updateRes === true) {
                  this.setState({loading:false})
                  let b64 = genFactRes.data.pdf;
                  this.showDocInPdfModal(b64,"Facture_" + moment().format("DD-MM-YYYY HH:mm"),"pdf")

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
              this.setState({loading:false})
              console.log(genFactRes.error)
            }
          }).catch( err => {
            this.setState({loading:false})
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
        console.log(err)
      })

    }

  }

  createFacture(facture_date,lignes_f,folder_id,facture,template,client,facture_company_id,paymTerm,deadline_date,tax,fraisAdmin,compte_banc,reductionType,reductionAmount) {

    let id_facture = facture.id

    let lignes_factures = lignes_f;
    let total = 0;
    lignes_factures.map((ligne, key) => {
      total = total + (ligne.newTime.duree * parseFloat(ligne.newTime.rateFacturation));
    })
    let acces_token = facture.facture_acces_token ? facture.facture_acces_token : utilFunctions.getUID();

    let odoo_data = [{
      'access_token': acces_token,
      'type': 'out_invoice',
      "move_name":false,
      "user_id":2,
      /*"team_id":1,*/
      "comment":false,
      'l10n_ch_isr_sent': false,
      'name': false,   //on peut mettre une petite desc sous le titre de la facture avec ce champs
      'date_invoice': moment(facture_date).format('YYYY-MM-DD'),
      'date_due': moment(deadline_date).format('YYYY-MM-DD'),
      'journal_id': 1,
      'currency_id': 5,
      'invoice_user_id': 2,
      'invoice_incoterm_id': false,
      'tax_lock_date_message': false,
      'id': false,
      'invoice_payment_state': 'not_paid',
      'invoice_filter_type_domain': 'sale',
      'company_currency_id': 5,
      'commercial_partner_id': '',
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
      'invoice_origin': false,
      'invoice_cash_rounding_id': false,
      'invoice_source_email': false,
      'invoice_payment_ref': false,
      'reversed_entry_id': false,
      'message_follower_ids': [],
      'activity_ids': [],
      'message_ids': [],
      'message_attachment_count': 0,
      'invoice_line_ids': [],
      "account_id": 281,
      "reference": facture.client_folder.name,
      "fiscal_position_id": false,
      "origin": false,
      "reference_type":"none",
      "incoterm_id":false,
      "sequence_number_next":false,
      "partner_shipping_id":facture_company_id,
      "payment_term_id":paymTerm,
      /*"partner_bank_id":compte_banc,
      'bank_partner_id': compte_banc,
      'invoice_partner_bank_id': compte_banc,*/
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
                                                      template === '9' ? ligne.newTime.description + ' ; ' + OAContact.nom + ' ' + OAContact.prenom + ' ; ' + ligne.newTime.duree.toFixed(2) + ' Heures' :
                                                          template === '10' ? ligne.newTime.description :
                                                              ligne.newTime.description,
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
                  tax && tax !== "" ? [tax] : []
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

    if(reductionAmount !== ""){
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
              'name':reductionType === "%" ? "Réduction("+reductionAmount+"%)" : "Réduction",
              'origin': false,
              'price_unit': reductionType === "%" ?  -  ((total * parseInt(reductionAmount)) / 100)  : - parseFloat(reductionAmount),
              'product_id': 1,  //2
              'quantity': 1,
              'sequence': 10,
              "uom_id":1,
              'analytic_tag_ids': [
                [
                  6,
                  false,
                  []
                ]
              ],
            }
          ]
      )
    }

    if(fraisAdmin === "2%"){
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
              'name':"Frais administratifs(2%)",
              'origin': false,
              'price_unit': (total * 2) / 100,
              'product_id': 1,  //2
              'quantity': 1,
              'sequence': 10,
              "uom_id":1,
              /*'invoice_line_tax_ids': [
                [
                  6,
                  false,
                  tax && tax !== "" ? [tax] : []
                ]
              ],*/
              'analytic_tag_ids': [
                [
                  6,
                  false,
                  []
                ]
              ],
            }
          ]
      )
    }

    let find_provision_factures = (this.state.factures || []).filter(x => x.type === "provision" && x.client_id === facture.client_id &&
        x.client_folder.id === facture.client_folder.id && x.partner === localStorage.getItem("email") && x.paid && x.paid === "true")
        .sort( (a,b) => {
          var c = new Date(a.created_at);
          var d = new Date(b.created_at);
          return d-c;
        })
    let latest = find_provision_factures.length > 0 ? find_provision_factures[0] : undefined
    console.log(latest)
    if(latest !== undefined){
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
              'name':"Provision",
              'origin': false,
              'price_unit': - parseFloat(latest.details_provision.amount),
              'product_id': 1,  //2
              'quantity': 1,
              'sequence': 10,
              "uom_id":1,
              'analytic_tag_ids': [
                [
                  6,
                  false,
                  []
                ]
              ],
            }
          ]
      )
    }

    if(facture.facture_odoo_id){

      SmartService.details_facture_odoo(localStorage.getItem('token'), localStorage.getItem('usrtoken'),facture.facture_odoo_id).then( detailsRes => {
        if (detailsRes.succes === true && detailsRes.status === 200) {
          console.log(detailsRes.data[0])
          let invoice_line_ids = detailsRes.data[0].invoice_line_ids || [];
          console.log(invoice_line_ids)
          invoice_line_ids.map(id => {
            odoo_data[0].invoice_line_ids.push([2, id, {}])
          })

          SmartService.update_facture_odoo(localStorage.getItem('token'), localStorage.getItem('usrtoken'),
              {data: [[facture.facture_odoo_id], odoo_data[0]], method: "write"}).then(updateFacRes => {
            if (updateFacRes.succes === true && updateFacRes.status === 200) {

              SmartService.validate_facture_odoo(localStorage.getItem('token'), localStorage.getItem('usrtoken'),
                  { data: [[facture.facture_odoo_id],{journal_type: "sale",lang: "fr_CH",type: "out_invoice",tz: false,uid: 8}] }).then(validateRes => {
                console.log(validateRes)
                if(validateRes.succes === true && validateRes.status === 200){

                  SmartService.generate_facture_odoo(localStorage.getItem('token'), localStorage.getItem('usrtoken'),facture.facture_odoo_id,facture.facture_acces_token).then(genFactRes => {

                    if(genFactRes.succes === true && genFactRes.status === 200){

                      SmartService.getFile(facture.client_folder.id,localStorage.getItem("token"),localStorage.getItem("usrtoken")).then(resF => {
                        if(resF.succes === true && resF.status === 200){
                          let comptaFolder = resF.data.Content.folders.find(x => x.name === "Compta client");

                          SmartService.addFileFromBas64({b64file:genFactRes.data.pdf,folder_id:comptaFolder.id},
                              localStorage.getItem("token"),localStorage.getItem("usrtoken")).then( ok => {

                            if(ok.succes === true && ok.status === 200){

                              SmartService.updateFileName({name:"Facture_"+moment(facture_date).format('YYYY-MM-DD')},
                                  ok.data.file_id,localStorage.getItem("token"),localStorage.getItem("usrtoken")).then( updateRes => {

                                if(updateRes.succes === true && updateRes.status === 200){

                                  let secretariat_folder = this.state.reelFolders.find(x => x.name === "SECRETARIAT");

                                  /*if(secretariat_folder){
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
                                  }*/

                                  let updatedItem = facture;
                                  updatedItem.statut = "accepted";
                                  updatedItem.file_id = ok.data.file_id;
                                  //updatedItem.client_folder = {id:client, name:resF.data.name}

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

            }else{
              console.log(updateFacRes.error)
            }
          }).catch(err => {
            console.log(err)
          })
        }else{
          console.log(detailsRes.error)
        }
      }).catch(err => {
        console.log(err)
      })

    }

    else{
      SmartService.create_facture_odoo(localStorage.getItem('token'), localStorage.getItem('usrtoken'), { data: odoo_data }).then(createFactRes => {
        console.log(createFactRes)
        if(createFactRes.succes === true && createFactRes.status === 200){

          SmartService.validate_facture_odoo(localStorage.getItem('token'), localStorage.getItem('usrtoken'),
              { data: [[createFactRes.data.id],{journal_type: "sale",lang: "fr_CH",type: "out_invoice",tz: false,uid: 8}] }).then(validateRes => {
            console.log(validateRes)
            if(validateRes.succes === true && validateRes.status === 200){

              SmartService.generate_facture_odoo(localStorage.getItem('token'), localStorage.getItem('usrtoken'),createFactRes.data.id,acces_token).then(genFactRes => {

                if(genFactRes.succes === true && genFactRes.status === 200){

                  SmartService.getFile(facture.client_folder.id,localStorage.getItem("token"),localStorage.getItem("usrtoken")).then(resF => {
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
                              updatedItem.facture_odoo_id = createFactRes.data.id
                              updatedItem.facture_acces_token = acces_token

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

  }



  async generateClientFolder(ID, team) {

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

              data.enfin_folders.map((item,key) => {
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
              data.enfin_folders.map((item,key) => {
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
            name: this.state.selectedSociete.contactName + (this.state.selectedSociete.societyName !== "" ? (" - " + this.state.selectedSociete.societyName) : ""),
            folder_id: CLIENTS_folder_id
          }, localStorage.getItem('token'), localStorage.getItem('usrtoken')).then(addParentClientFolderRes => {

            SmartService.addFolder({
              name: this.state.newClientFolder.nom,
              folder_id:addParentClientFolderRes.data.id
            },localStorage.getItem('token'), localStorage.getItem('usrtoken')).then( addFolderClient => {

              if(this.state.newClientFolder.type ===  "litige"){

                data.enfin_folders.map((item,key) => {
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
                data.enfin_folders.map((item,key) => {
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

              rethink.update("test",'table("clients_cases").get('+JSON.stringify(findCopy.id)+').update('+ JSON.stringify(findCopy) + ')',db_name,false).then( async updateRes => {
                if (updateRes && updateRes === true) {

                  let acces = await this.associed_gedAcces_to_client(this.state.selectedSociete.email);
                  if(acces === "ok"){
                    this.share_folder_to_client(addParentClientFolderRes.data.id,this.state.selectedSociete.email)
                  }
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

              SmartService.addFolder({
                name: this.state.selectedSociete.contactName + (this.state.selectedSociete.societyName !== "" ? (" - " + this.state.selectedSociete.societyName) : ""),
                folder_id: CLIENTS_folder_id
              }, localStorage.getItem('token'), localStorage.getItem('usrtoken')).then(addParentClientFolderRes => {
                console.log('OK');

                SmartService.addFolder({
                  name: this.state.newClientFolder.nom,
                  folder_id: addParentClientFolderRes.data.id,
                },localStorage.getItem('token'), localStorage.getItem('usrtoken')).then(addFolderClient => {


                  if(this.state.newClientFolder.type ===  "litige"){

                    data.enfin_folders.map((item,key) => {
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
                    data.enfin_folders.map((item,key) => {
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

                  let find_odoo_companie = (this.state.odoo_companies || []).find(x => x.client_id === ID || x.client_uid === ID)

                  if(find_odoo_companie){

                    let newItem = {
                      folder_id: addParentClientFolderRes.data.id,
                      ID_client: ID,
                      odoo_client_id: find_odoo_companie.odoo_company_id,
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

                    rethink.insert("test",'table("clients_cases").insert('+ JSON.stringify(newItem) + ')',db_name,false)
                        .then( async resAdd => {
                          if (resAdd && resAdd === true) {

                            let acces = await this.associed_gedAcces_to_client(this.state.selectedSociete.email);
                            if(acces === "ok"){
                              this.share_folder_to_client(addParentClientFolderRes.data.id,this.state.selectedSociete.email)
                            }
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

                  }else{

                    let findClient = (this.state.annuaire_clients_mandat || []).find(x => x.ID === ID || x.id === ID)

                    SmartService.create_company(localStorage.getItem("token"), localStorage.getItem("usrtoken"),
                        {
                          param: {
                            name: findClient.type === "0" ? findClient.societyName : findClient.contactName,
                            phone: findClient.phone || false,
                            email: findClient.email || false,
                          }
                        }).then(createRes => {

                      let newItem = {
                        folder_id: addParentClientFolderRes.data.id,
                        ID_client: ID,
                        odoo_client_id: createRes.data.id,
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

                      rethink.insert("test",'table("clients_cases").insert('+ JSON.stringify(newItem) + ')',db_name,false)
                          .then( async resAdd => {
                            if (resAdd && resAdd === true) {

                              let acces = await this.associed_gedAcces_to_client(this.state.selectedSociete.email);
                              if(acces === "ok"){
                                this.share_folder_to_client(addParentClientFolderRes.data.id,this.state.selectedSociete.email)
                              }
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

                    }).catch( err => {
                      console.log(err)
                    })

                  }

                }).catch(err => {
                  console.log(err);
                });
              }).catch(err => {
                console.log(err);
              });





        }).catch(err => {console.log(err)})
      }

    }else{
      this.setState({ loading: false });
      alert("Vous n'avez pas les droits et l'accès au dossier CLIENTS pour effectuer cette opération !")
    }

  }

  verif_user_signup(email){
    return new Promise((resolve,reject) => {

      SmartService.getToken().then( tokenRes => {
        if (tokenRes.succes === true && tokenRes.status === 200) {
          SmartService.register({
            email: email,
            password1: "test",
            password2: "test"
          }, tokenRes.data.token).then(signUpRes => {
            if (signUpRes.succes === false && signUpRes.status === 400) {
              resolve("registred")
            }else if(signUpRes.succes === true && signUpRes.status === 200){
              resolve("registred-now")
            }else{
              resolve("error")
            }
          }).catch( err => {
            resolve("error")
          })
        }else{
          resolve("error")
        }
      }).catch( err => {resolve("error")})

    })
  }

  verif_user_acces_ged(email){

    return new Promise((resolve,reject) => {

      SmartService.addUserToGed({role:"client",email:email},localStorage.getItem('token'), localStorage.getItem('usrtoken')).then( addRes => {
        if (addRes.succes === false && addRes.status === 401) {
          resolve("associed")
        }else if(addRes.succes === true && addRes.status === 200){
          resolve("associed-now")
        }else{
          resolve("error")
        }
      }).catch( err => {
        resolve("error")
      })
    })
  }

  share_folder_to_client(folder_id,email){

    return new Promise(async (resolve,reject) => {

      SmartService.share(
          folder_id,
          {
            to: email,
            access: {
              administrate: true ,
              share: true,
              edit:  true,
              read: true
            }
          },
          localStorage.getItem('token'),
          localStorage.getItem('usrtoken')
      )
          .then((share) => {
            console.log(share)
            if (share.succes === true && share.status === 200) {
              resolve("shared")
            } else {
              resolve("error")
            }
          }).catch(err => {
            resolve("error")
      })
    })
  }

  async associed_gedAcces_to_client(email){

    return new Promise(async (resolve,reject) => {

      let verif_signup = await this.verif_user_signup(email);
      if(verif_signup === "registred" || verif_signup === "registred-now"){

        let verif_ged_acces = await this.verif_user_acces_ged(email);
        if(verif_ged_acces === "associed" || verif_ged_acces === "associed-now"){
          resolve("ok")
        }

      }else{
        resolve("error")
      }

    })
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
          this.openSnackbar('success', newClient.contactName + ' est ajouté avec succès ');
          setTimeout(() => {
            let findNew = this.state.annuaire_clients_mandat.find(x => x.ID === newClient.ID)
            this.props.history.push('/home/clients/' + (findNew.id || findNew.ID));
            this.setState({
              loading: false,
              selectedSociete: findNew,
              selectedSocieteKey: findNew.id
            });
          },1000);
          setTimeout(() => {
            this.setState({
              newClient: { contactName: '', societyName:'', type: '0', created_at: '', adress: '', email: '', phone: '', isActif: "true" }
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

  addNewProductsPack(pack) {
    this.setState({loading: true});

    this.verifIsTableExist("p_packs").then( v => {

      rethink.insert("test",'table("p_packs").insert('+ JSON.stringify(pack) + ')',db_name,false).then( resAdd => {
        if (resAdd && resAdd === true) {
          this.openSnackbar('success', "Pack: " + pack.name + ' est ajouté avec succès ');
          this.setState({loading: false});
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
            method: 'POST', url: endpoint + '/ged/' + ged_id + '/doc/addfile',
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

  addNewRoomTask(title,desc, assignedTo,client,teamEmails,priority,tags,date_deadline){
    let room = this.state.selectedRoom;
    let tasks = room.tasks || [];
    let teamCp = [];
    teamEmails.map((email,key) => {
      teamCp.push({
        id:main_functions.getContactIdByEmail(this.state.contacts || [],email),
        email:email
      })
    })
    tasks.push({
      uid:utilFunctions.getUID(),
      title: title,
      desc:desc,
      leader: {
        id:assignedTo.id,
        email:assignedTo.email
      },
      team: teamCp,
      date_deadline: date_deadline,
      client: client,
      priority:priority,
      tags:tags,
      created_at:moment().format("YYYY-MM-DD HH:mm:ss"),
      created_by:localStorage.getItem("email")
    });
    room.tasks = tasks;
    console.log(room)

    rethink.update("test",'table("rooms").get('+JSON.stringify(room.id)+').update('+ JSON.stringify(room) + ')',db_name,false).then( updateRes => {
      if(updateRes && updateRes === true){
        this.setState({ selectedRoom: room });
        this.openSnackbar("success","La nouvelle tache est ajoutée avec succès")
      }else{
        this.openSnackbar("error","Une erreur est survenue !")
      }
    })
  }

  addNewContact(){
    this.setState({ firstLoading: true, loading: true, openAddContactModal: false });

    this.verifIsTableExist("contacts").then( v => {

      let newContact = this.state.newContact;
      newContact.uid = utilFunctions.getUID();
      newContact.created_at = moment().format("YYYY-MM-DD HH:mm:ss")

      rethink.insert("test",'table("contacts").insert('+ JSON.stringify(newContact) + ')',db_name,false).then( resAdd => {
        if(resAdd && resAdd === true){

          this.openSnackbar('success', newContact.nom + ' ' + newContact.prenom + ' est ajouté avec succès ');
          setTimeout(() => {
            let findNew = this.state.contacts.find(x => x.uid === newContact.uid)
            this.props.history.push('/home/contacts/' + findNew.id);
            this.setState({
              firstLoading: false, loading: false,
              selectedContact: findNew,
              selectedContactKey: findNew.id
            });
          },500)
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

  addNewPrestataire(){
    this.setState({ firstLoading: true, loading: true, openAddPrestataireModal: false });

    this.verifIsTableExist("prestataires").then( v => {

      let newPrestataire = this.state.newPrestataire;
      newPrestataire.uid = utilFunctions.getUID();
      newPrestataire.created_at = moment().format("YYYY-MM-DD HH:mm:ss")
      rethink.insert("test",'table("prestataires").insert('+ JSON.stringify(newPrestataire) + ')',db_name,false).then( resAdd => {
        if (resAdd && resAdd === true) {

          this.openSnackbar('success', newPrestataire.nom + ' ' + newPrestataire.prenom + ' est ajouté avec succès ');
          this.props.history.push('/home/marketplace/RH_Support_ponctuel/' + newPrestataire.uid);
          this.setState({
            firstLoading: false, loading: false,
            selectedContact: newPrestataire,
            selectedContactKey: newPrestataire.uid
          });
          setTimeout(() => {
            this.setState({
              newPrestataire: { uid: '', nom: '',prenom:'',  type1: '',  type2: '', created_at: '', email: '', phone: '' }
            });
          }, 400);

        } else {
          this.openSnackbar("error","Une erreur est survenue !")
        }
      }).catch(err => {
        console.log(err)
        this.openSnackbar("error","Une erreur est survenue !")
      })

    }).catch(err => {console.log(err)})

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

  beforeUpdateSociety(){
    let odoo_companies = this.state.odoo_companies || [];
    let client_id = this.state.selectedSociete.ID
    let clientFname = this.state.selectedSociete.type === "0" ? this.state.selectedSociete.societyName : this.state.selectedSociete.contactName
    let company_id;
    let findCompany = odoo_companies.find(x => x.client_id === client_id );

    if(findCompany){
      console.log("COMPANY FOUND")
      company_id = findCompany.odoo_company_id;
      this.saveSocietyChanges(company_id)
    }
    else{
      console.log("COMPANY NOT FOUND")
      SmartService.create_company(localStorage.getItem('token'), localStorage.getItem('usrtoken'), { param: { name: clientFname } }).then(newCompRes => {
        if(newCompRes.succes === true && newCompRes.status === 200){
          company_id = newCompRes.data.id;
          this.verifIsTableExist("odoo_companies").then( v => {
            let newItem = {
              odoo_company_id:company_id,
              client_name:clientFname,
              client_id:client_id,
              client_uid:this.state.selectedSociete.id,
              created_at:moment().format("YYYY-MM-DD HH:mm:ss")
            }
            rethink.insert("test",'table("odoo_companies").insert('+ JSON.stringify(newItem) + ')',db_name,false).then( resAdd => {
              if (resAdd && resAdd === true) {
                this.saveSocietyChanges(company_id)
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

    let cached_cases = (this.state.cached_cases || []).find(x => x.user_email === localStorage.getItem("email"))
    let user_cached_cases = cached_cases ? cached_cases.c_cases || [] : []

    return(
        !this.state.time_sheets || !this.state.cached_cases ?
            <div  align="center" style={{marginTop:200}}>
              <CircularProgress color="primary" />
              <h6>Chargement...</h6>
            </div> :

            <div  style={{height:"90%"}} >
              <div className="row">
                <div className="col-lg-12 ">
                  <h5 className="mt-0 mb-1">TimeSheet / Activités</h5>
                  <div className="card-box text-center">
                    <div style={{ marginTop: 20 }} className="text-left">
                      <Tabs selectedIndex={this.state.selectedTimeSheetIndex} onSelect={index => {
                        this.setState({selectedTimeSheetIndex:index})
                      }}>
                        <TabList>
                          <Tab>Time Sheet</Tab>
                          <Tab>Activités </Tab>
                          <Tab>Partner
                            {
                              (this.state.factures || []).filter(x => x.statut === "wait" && x.partner === localStorage.getItem("email")).length > 0 &&
                              <Badge max={100}>{(this.state.factures || []).filter(x => x.statut === "wait" && x.partner === localStorage.getItem("email")).length}</Badge>
                            }
                          </Tab>
                        </TabList>

                        <TabPanel>

                          <div style={{marginTop:35,padding:10,paddingBottom:50,paddingLeft:35,border:"2px solid #f0f0f0",minWidth:1000}}>
                            <div className="row mt-2">
                              <div className="col-md-6">
                                <div>
                                  <h5>Catégorie d’activités </h5>
                                  <MuiSelect
                                      labelId="demo-simple-select-label"
                                      id="demo-simple-select"
                                      style={{ width: 270 }}
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
                                        value={'Provision'}>Provision</MenuItem>
                                    <MenuItem
                                        value={'Avance_frais'}>Avance de frais</MenuItem>
                                  </MuiSelect>
                                </div>
                              </div>
                              <div className="col-md-6">
                                <div style={{ width: '100%' }}>
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
                            <div className="row mt-2">
                              <div className="col-md-6">
                                {
                                  this.state.TimeSheet.newTime.categoriesActivite === "Temps facturé" ?
                                      <div>
                                        <h5>Durée</h5>
                                        <div style={{display:"flex"}}>
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
                                          <div style={{ display: 'flex',marginLeft:15,marginTop:2 }}>
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
                                        {
                                          this.state.TimeSheet.newTime.duree !== "" && DurationFormatError !== "" ?
                                              <h6 style={{color:"red"}}>{DurationFormatError}</h6> :
                                              this.state.TimeSheet.newTime.rateFacturation !== "" &&
                                              <span style={{color:"#000",fontWeight:"bold"}}>Total:&nbsp;&nbsp;
                                                <span>{(parseFloat(this.state.TimeSheet.newTime.rateFacturation) * utilFunctions.durationToNumber(this.state.TimeSheet.newTime.duree)).toFixed(2) + " CHF"}</span>
                                              </span>
                                        }
                                        <div style={{marginTop:25}}>
                                          <div>
                                            <h5>{new_timeSheet_desc}</h5>
                                          </div>
                                          <textarea
                                              className="form-control "
                                              id="duree"
                                              style={{ width: '90%',border:"2px solid #f0f0f0",borderRadius:7.5 }}
                                              name="duree"
                                              rows={5}
                                              value={this.state.TimeSheet.newTime.description}
                                              onChange={(e) => {
                                                let d = this.state.TimeSheet;
                                                d.newTime.description = e.target.value;
                                                this.setState({ TimeSheet: d });
                                              }} />
                                        </div>
                                      </div> :

                                      <div>
                                        <div>
                                          <div>
                                            <h5>Montant(CHF)</h5>
                                            <input
                                                type="text"
                                                className="form-control"
                                                id="email"
                                                name="email"
                                                value={this.state.provision_amount}
                                                style={{width:350,border:"2px solid #f0f0f0",borderRadius:7.5}}
                                                onChange={(e) => {this.setState({provision_amount:e.target.value})}}
                                            />
                                          </div>
                                          {
                                            this.state.TimeSheet.newTime.categoriesActivite === "Provision" ?
                                                <div>
                                                  <div className="mt-3">
                                                    <h5>Compte bancaire</h5>
                                                    <select
                                                        className="form-control custom-select"
                                                        value={this.state.provision_bank}
                                                        onChange={(e) => {
                                                          this.setState({provision_bank:e.target.value})
                                                        }}
                                                        style={{width:350,border:"2px solid #f0f0f0",borderRadius:7.5}}
                                                    >
                                                      <option key={-1} value={""}/>
                                                      {
                                                        (data.oa_comptes_bank_provision || []).map((item,key) =>
                                                            <option key={key} value={JSON.stringify(item)}>{item.label}</option>
                                                        )
                                                      }
                                                    </select>
                                                  </div>
                                                  <div className="mt-3">
                                                    <h5>Taxe</h5>
                                                    <Dropdown
                                                        value={this.state.provision_tax}
                                                        onChange={(e,{value}) => {
                                                          this.setState({provision_tax:value})
                                                        }}
                                                        placeholder=''
                                                        labeled
                                                        selection
                                                        options={this.state.odoo_taxs || []}
                                                        loading={!this.state.odoo_taxs}
                                                    />
                                                  </div>
                                                  <div className="mt-5" align="center">
                                                    <AltButtonGroup>
                                                      <AtlButton
                                                          isLoading={this.state.loading_provision_preview}
                                                          appearance="warning"
                                                          isDisabled={!this.state.TimeSheet.newTime.dossier_client.folder_id || this.state.provision_amount === "" ||
                                                          this.state.provision_bank === "" || this.state.selectedClientTimeEntree === ''}
                                                          onClick={() => {
                                                            this.generateProvisionDoc(new_timeSheet_desc)
                                                          }}
                                                      >
                                                        Preview
                                                      </AtlButton>
                                                      <AtlButton
                                                          isLoading={this.state.loading_provision_save}
                                                          appearance="primary"
                                                          isDisabled={!this.state.TimeSheet.newTime.dossier_client.folder_id || this.state.provision_amount === "" ||
                                                          this.state.provision_bank === "" || this.state.selectedClientTimeEntree === ''}
                                                          onClick={() => {
                                                            this.before_save_provison(this.state.TimeSheet.newTime.client,this.state.TimeSheet.newTime.client_id,new_timeSheet_desc,this.state.TimeSheet.newTime.date,
                                                                this.state.TimeSheet.newTime.dossier_client.name,"","",this.state.provision_amount,this.state.provision_tax)
                                                          }}
                                                      >
                                                        Enregistrer le document de provision
                                                      </AtlButton>
                                                    </AltButtonGroup>

                                                  </div>
                                                </div>  :

                                                <div>
                                                  <div style={{marginTop:25}}>
                                                    <div>
                                                      <h5>Description</h5>
                                                    </div>
                                                    <textarea
                                                        className="form-control "
                                                        id="duree"
                                                        style={{ width: '90%',border:"2px solid #f0f0f0",borderRadius:7.5 }}
                                                        name="duree"
                                                        rows={5}
                                                        value={this.state.avance_frais_desc}
                                                        onChange={(e) => {
                                                          this.setState({ avance_frais_desc: e.target.value });
                                                        }} />
                                                  </div>
                                                  <div style={{marginTop:25}}>
                                                    <div>
                                                      <h5>Ajouter la facture à payer</h5>
                                                    </div>
                                                    <div style={{display:"flex"}}>
                                                      <IconButton onClick={() => {this.avance_frais_upload.click()}}>
                                                        <AttachFileIcon/>
                                                      </IconButton>
                                                      <h6 style={{marginLeft:5,marginTop:17}}>{this.state.avance_frais_facture_file.name}</h6>
                                                    </div>
                                                    <input
                                                        style={{ visibility: 'hidden', width: 0, height: 0 }}
                                                        onChange={(event) => this.uploadAvanceFraisFile(event)}
                                                        type="file"
                                                        ref={(ref) => (this.avance_frais_upload = ref)}
                                                    />
                                                  </div>
                                                  <div align="center" style={{marginTop:15}}>
                                                    <AtlButton
                                                        isLoading={this.state.loading_avance_frais}
                                                        appearance="primary"
                                                        isDisabled={this.state.avance_frais_facture_file === "" || this.state.avance_frais_desc === "" ||
                                                        this.state.provision_amount === "" || this.state.selectedClientTimeEntree === '' || this.state.TimeSheet.newTime.dossier_client.name === ""}
                                                        onClick={() => {
                                                          //clientFname,client_id,file,folder_id,date,client_folder_name,amount,desc
                                                          this.before_save_AvanceFrais(this.state.TimeSheet.newTime.client,this.state.TimeSheet.newTime.client_id,this.state.avance_frais_facture_file,
                                                              this.state.TimeSheet.newTime.dossier_client.folder_id,this.state.TimeSheet.newTime.date,this.state.TimeSheet.newTime.dossier_client.name,this.state.provision_amount, this.state.avance_frais_desc)
                                                        }}
                                                    >
                                                      Enregistrer
                                                    </AtlButton>
                                                  </div>
                                                </div>
                                          }

                                        </div>
                                      </div>

                                }
                              </div>
                              <div className="col-md-6">
                                <div>
                                  <h5>Nom du client</h5>
                                  <div style={{ display: 'flex' }}>
                                    <SelectSearch
                                        options={
                                          (this.state.annuaire_clients_mandat || []).map(({ contactName,societyName, type, imageUrl, ID }) =>
                                              ({
                                                value: ID,
                                                name: contactName,
                                                ContactType: type,
                                                ContactName: contactName,
                                                societyName:societyName,
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
                                          let findClientFname = (this.state.annuaire_clients_mandat || []).find(x => x.ID === e)
                                          obj.newTime.client = findClientFname.contactName + (findClientFname.societyName !== "" ? (" - " + findClientFname.societyName) : "")
                                          obj.newTime.client_id = e;
                                          obj.newTime.dossier_client =  {
                                            name:'',
                                            facturation: {
                                              language:''
                                            }}
                                          if(findClientTempo){
                                            obj.newTime.dossier_client = findClientTempo.folders && findClientTempo.folders.length > 0 ? findClientTempo.folders[0] : {name:'', facturation: {language:''}}
                                            this.setState({selectedClientFolders:findClientTempo.folders || [],selectedClientTimeEntree: e,TimeSheet: obj})
                                          }else{
                                            this.setState({selectedClientFolders:[],TimeSheet:obj,selectedClientTimeEntree: e})
                                          }
                                        }}
                                    />
                                    <IconButton
                                        style={{ marginTop: -5 }}
                                        onClick={() => {
                                          //this.setState({ openAdvancedSearchModal: true })
                                        }}>
                                      <SearchIcon />
                                    </IconButton>
                                  </div>
                                  <h5 style={{marginTop:25}}>Dossier du client </h5>
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
                                {
                                  this.state.TimeSheet.newTime.categoriesActivite === "Temps facturé" &&
                                  <div style={{marginTop:20}}>
                                    <div>
                                      <h6>Utilisateur </h6>
                                    </div>
                                    <MuiSelect
                                        labelId="demo-simple-select-label4545"
                                        id="demo-simple-select4545"
                                        style={{ width: 300 }}
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
                                      {(this.state.contacts || []).map((contact, key) => (
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
                                    <div className="mt-3">
                                      <h6>
                                        Taux horaire
                                      </h6>
                                      <Input
                                          className="form-control "
                                          id="duree"
                                          style={{ width: 300 }}
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
                                }

                              </div>
                            </div>
                            <div align="center" className="mt-4">
                              {
                                this.state.TimeSheet.newTime.categoriesActivite === "Temps facturé" &&
                                <div>

                                  <AltButtonGroup>
                                    <AtlButton
                                        onClick={() => {
                                          this.createLignefacture(false)
                                          //console.log(this.state.TimeSheet.newTime.dossier_client)
                                        }}
                                        appearance="primary"
                                        isDisabled={this.state.TimeSheet.newTime.duree === '' ||  this.state.TimeSheet.newTime.description === '' || !this.state.TimeSheet.newTime.dossier_client.folder_id ||
                                        this.state.TimeSheet.newTime.rateFacturation === '' || this.state.selectedClientTimeEntree === '' || this.state.TimeSheet.newTime.utilisateurOA === '' }
                                        style={{ margin: 20 }}> Enregistrer </AtlButton>
                                    <AtlButton
                                        onClick={() => {
                                          this.createLignefacture(true)
                                        }}
                                        appearance="primary"
                                        isDisabled={this.state.TimeSheet.newTime.duree === '' || this.state.TimeSheet.newTime.description === '' || !this.state.TimeSheet.newTime.dossier_client.folder_id ||
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
                                        style={{ marginTop: 10,marginBottom:20 }}>
                                      <AtlButton
                                          isSelected
                                          appearance="default"
                                          onClick={() => this.setState({selectedTimeSheetIndex:2})}
                                      >
                                        Etablir facture
                                      </AtlButton>
                                    </AltButtonGroup>
                                  </div>

                                </div>

                              }
                            </div>

                          </div>

                        </TabPanel>
                        <TabPanel>

                          <TableTimeSheet
                              lignesFactures={this.state.time_sheets || []}
                              lignesFacturesCopy={this.state.time_sheets || []}
                              deleteLigneFacture={(id) => this.deleteLigneFacture(id)}
                              setLignesFactures={(lignes_factures) => this.setState({lignesFactures: lignes_factures})}
                              OA_contacts={this.state.contacts || []}
                              annuaire_clients_mandat={this.state.annuaire_clients_mandat || []}
                              onClickFacture={(client, client_folder, facture_date, partner, lignes_facture) => {
                                this.addFactureToValidated(client, client_folder, facture_date, localStorage.getItem("email"),
                                    partner, lignes_facture)
                              }}
                              client_folders={this.state.client_folders}
                              updateLigneFacture={(id, ligne) => this.updateLigneFacture(id, ligne)}
                              openSnackbar={(type, msg) => this.openSnackbar(type, msg)}
                              clientsTempo={this.state.clients_cases}
                              updateAllLigneFacture={(data) => this.updateAllLigneFacture(data)}
                              factures={this.state.factures || []}
                              cachedCases={cached_cases}
                              userCachedCases={user_cached_cases}
                              updateUserCachedCases={(cached,type,id) => {
                                this.setState({loading: true})
                                this.verifIsTableExist("cached_cases").then(v => {
                                  if(type === "old"){
                                    let item = {
                                      user_email: localStorage.getItem("email"),
                                      c_cases: cached
                                    }
                                    rethink.update("test",'table("cached_cases").get('+JSON.stringify(id)+').update('+ JSON.stringify(item) + ')',db_name,false).then( updateRes => {
                                      if (updateRes && updateRes === true) {
                                        this.setState({loading:false})
                                        this.openSnackbar("success", "Votre configuration est enregistrée avec succès")
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
                                    let item = {
                                      user_email: localStorage.getItem("email"),
                                      c_cases: cached
                                    }
                                    rethink.insert("test", 'table("cached_cases").insert(' + JSON.stringify(item) + ')', db_name, false).then(resAdd => {
                                      if (resAdd && resAdd === true) {
                                        this.setState({loading: false})
                                        this.openSnackbar("success", "Votre configuration est enregistrée avec succès")
                                      } else {
                                        this.setState({loading: false})
                                        this.openSnackbar("error", "Une erreur est survenue !")
                                      }
                                    }).catch(err => {
                                      this.openSnackbar("error", "Une erreur est survenue !")
                                      console.log(err)
                                    })
                                  }

                                }).catch(err => console.log(err))
                              }}
                          />
                          {
                            this.state.time_sheets && this.state.time_sheets.length === 0 &&
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
                                         annuaire_clients_mandat={this.state.annuaire_clients_mandat || []}
                                         contacts={this.state.contacts || []}
                                         timeSheets={this.state.time_sheets || []}
                                         sharedFolders={this.state.sharedReelFolders || []}
                                         validateFacture={(row,key,template,client,paymTerm,deadline_date,tax,fraisAdmin,compte_banc,reductionType,reductionAmount) => {
                                           this.before_create_facture(row.created_at, row.lignes_facture,row.client_folder.id,row,template,client,paymTerm,deadline_date,tax,fraisAdmin,compte_banc,reductionType,reductionAmount);
                                         }}
                                         previewFacture={(row,key,template,client,paymTerm,deadline_date,tax,fraisAdmin,compte_banc,reductionType,reductionAmount) => {
                                           this.before_preview_facture(row.created_at, row.lignes_facture,row.client_folder.id,row,template,client,paymTerm,deadline_date,tax,fraisAdmin,compte_banc,reductionType,reductionAmount)
                                         }}
                                         openFacture={(id) => {
                                           this.openPdfModal(id)
                                         }}
                                         openPdf={(b64,name,type) => {
                                           this.showDocInPdfModal(b64,name,type)
                                         }}
                                         show_odoo_facture={(id,token,name) => {
                                           this.setState({loading: true})
                                           SmartService.generate_facture_odoo(localStorage.getItem('token'), localStorage.getItem('usrtoken'),
                                               id,token).then(genFactRes => {
                                             if (genFactRes.succes === true && genFactRes.status === 200) {
                                               this.setState({loading: false})
                                               let b64 = genFactRes.data.pdf;
                                               this.showDocInPdfModal(b64, "Facture_" + name, "pdf")
                                             }
                                           }).catch(err => {console.log(err)})
                                         }}
                                         openFactureFolder={(id) => {
                                           this.redirectToFolder(id)
                                         }}
                                         delete_facture={(id) => {
                                           this.delete_facture(id)
                                         }}
                                         updateFacture={(id,item) => {
                                           this.updateFacture(id,item)
                                         }}
                                         openSnackbar={(type,msg) => this.openSnackbar(type,msg)}
                                         rerender={() => {this.setState({updateX:!this.state.updateX})}}
                                         taxs={this.state.odoo_taxs}
                                         payTerms={this.state.odoo_payTerms}
                                         updateLigneFacture={(id,ligne) => this.updateLigneFacture(id,ligne)}
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

  handleRoomTabsChange = (event, newValue) => {
    this.setState({selectedRoomTab:newValue})
    /*if(newValue === 1){
      setloadingFiles(true)
      SmartService.getRoomFiles(localStorage.getItem("token"),localStorage.getItem("usrtoken"),props.room.id).then( res => {
        console.log(res)
        setRoomDocs(res.data)
        setloadingFiles(false)
      }).catch(err => {
        console.log(err)
      })
    }*/
  };

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

  createProspectRoom(client){
    this.setState({loading:true})
    this.verifIsTableExist("rooms").then( v => {
      let newRoom={
        uid : utilFunctions.getUID(),
        title:"Diff.doc à " + client.nom + " " + client.prenom,
        color:"#F47373",
        created_by:localStorage.getItem("email"),
        created_at:moment().format("YYYY-MM-DD HH:mm:ss"),
        members:[
          {id:main_functions.getContactIdByEmail(this.state.contacts,localStorage.getItem("email")),email:localStorage.getItem("email")},
          {id:"",email:client.email}]
      }
      rethink.insert("test",'table("rooms").insert('+ JSON.stringify(newRoom) + ')',db_name,false).then( resAdd => {
        if (resAdd && resAdd === true) {
          setTimeout(() => {
            let findNew = this.state.rooms.find(x => x.uid === newRoom.uid)
            this.setState({
              loading: false,
              selectedRoom: findNew,
              selectedRoomKey: (this.state.rooms.length - 1),
              selectedRoomItems: [findNew.id],
              openRoomMenuItem:true,
              focusedItem:"Rooms",
              showContainerSection: 'Rooms',
              selectedRoomTab:0
            });
            this.props.history.push('/home/rooms/' + findNew.id);
            this.openSnackbar('success', 'Room ajouté avec succès');
          },500)
        } else {
          this.setState({ loading: false });
          this.openSnackbar('error', "Une erreur est survenue");
        }
      }).catch(err => {
        console.log(err)
      })
    }).catch(err => {console.log(err)})
  }

  moveProspectToClients(prospect){
    this.setState({loading:true})

    this.verifIsTableExist("annuaire_clients_mandat").then( v => {
      let newClient = {
        contactName:prospect.nom + " " + prospect.prenom,
        societyName:"",
        type:"1",
        adress:"",
        email:prospect.email,
        phone:prospect.telephone || "",
        isActif:"true"
      }
      newClient.ID = utilFunctions.getUID();
      newClient.created_at = moment().format("YYYY-MM-DD HH:mm:ss");

      rethink.insert("test",'table("annuaire_clients_mandat").insert('+ JSON.stringify(newClient) + ')',db_name,false).then( resAdd => {
        if (resAdd && resAdd === true) {
          this.openSnackbar('success', newClient.contactName + ' est ajouté avec succès ');
          setTimeout(() => {
            let findNew = this.state.annuaire_clients_mandat.find(x => x.ID === newClient.ID)
            this.props.history.push('/home/clients/' + findNew.id);
            this.setState({
              loading: false,
              selectedSociete: findNew,
              selectedSocieteKey: findNew.id
            });
          },500);
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

  render() {

    const current_user_contact = main_functions.getOAContactByEmail2(this.state.contacts || [],localStorage.getItem("email"))

    const openRoomColorPicker = Boolean(this.state.anchorEl_colorPicker);
    const id = openRoomColorPicker ? 'color-picker-popover' : undefined;

    const openRoomSetting = Boolean(this.state.settRoomAnchorEl);
    const id_settRoom = openRoomSetting ? 'setting-room-popover' : undefined;

    return (
      <div>
          <div>
            <TopBar
              logo={this.state.logo}
              height={70}
              onClickMenuIcon={() => this.setState({ openSideMenu: true })}
              onLogoutClick={() => {
                let logoCp = this.state.logo;
                let emailCp = localStorage.getItem("email")
                localStorage.clear();
                localStorage.setItem("logo",logoCp)
                localStorage.setItem("email",emailCp)
                setTimeout(() => {
                  window.location.reload()
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
              iconColor={'blue'}
              textColor={'#65728E'}
              history={this.props.history}
              opened={this.state.openSideMenu}
              onClose={() => this.setState({ openSideMenu: false })}
            />
          </div>

        <MuiBackdrop open={this.state.loading} />

        <div style={{ marginRight: 20, marginTop: 75, marginLeft: 5,top:0,width:"100%",position:"fixed" }}>


          <div>

            <div style={{ display: 'flex' }}>
              <div
                style={{
                  height: 900,
                  overflow: 'overlay',
                  minHeight: 900,
                  width: 300,
                  minWidth: 300,
                  //maxWidth:400
                }}
              >
                {
                  this.renderLeftMenu()
                }

              </div>

              <div style={{ flexWrap: 'wrap', flex: '1 1 auto',overflowY:"auto",height:900 }}>
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
                                    <div style={{flexWrap: 'wrap', display: 'block'}}>
                                      {
                                        this.state.loadingGed === true ?
                                            <div align="center" style={{marginTop: 200}}>
                                              <CircularProgress color="primary"/>
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
                                                      pathname={this.props.location.pathname}
                                                      rootFiles={this.state.rootFiles}
                                                      setRootFiles={(files) => {this.setState({rootFiles:files})}}
                                                      reelFolders={this.state.reelFolders}
                                                      setReelFolders={(items) => {this.setState({reelFolders:items})}}
                                                      setGedMenu={(ged) => {this.setState({folders:main_functions.changeStructure(ged,this.state.showFileInGed)})}}
                                                      selectedFolderFolders={this.state.selectedFolderFolders}
                                                      setSelectedFolderFolders={(folders) => {this.setState({selectedFolderFolders:folders})}}
                                                      rootFolders={this.state.rootFolders}
                                                      setRootFolders={(folders) => {this.setState({rootFolders:folders})}}
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
                                                          selectedFolderFiles: folder.Content.files || [],
                                                          selectedFolderFolders: folder.Content.folders || [],
                                                          focusedItem: 'Drive',
                                                          breadcrumbs: main_functions.getBreadcumpsPath(folder.id, this.state.reelFolders.concat(this.state.sharedReelFolders)),
                                                          selectedFolderId: folder.id,
                                                          showContainerSection: 'Drive'
                                                        });
                                                      }}
                                                      setLoading={(b) =>
                                                          this.setState({ loading: b })
                                                      }
                                                  />
                                                  <ListDocs
                                                      docs={this.state.rootFiles || []}
                                                      selectedFolderFiles={this.state.selectedFolderFiles}
                                                      reelFolders={this.state.reelFolders}
                                                      setReelFolders={(items) => {this.setState({reelFolders:items})}}
                                                      setGedMenu={(ged) => {this.setState({folders:main_functions.changeStructure(ged,this.state.showFileInGed)})}}
                                                      pathname={this.props.location.pathname}
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
                                reelFolders={this.state.reelFolders}
                                setReelFolders={(items) => {this.setState({reelFolders:items})}}
                                setGedMenu={(ged) => {this.setState({folders:main_functions.changeStructure(ged,this.state.showFileInGed)})}}
                                selectedFolderId={this.state.selectedFolderId}
                              selectedFolderFolders={this.state.selectedFolderFolders}
                                setSelectedFolderFolders={(folders) => this.setState({selectedFolderFolders:folders})}
                              selectedFolderFiles={this.state.selectedFolderFiles}
                                setSelectedFolderFiles={(files) => {this.setState({selectedFolderFiles:files})}}
                                rootFiles={this.state.rootFiles}
                                setRootFiles={(files) => {this.setState({rootFiles:files})}}
                                pathname={this.props.location.pathname}
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

                      {
                        active_modules.includes("ROOMS") === true &&
                            [
                              <Route key={0} exact path="/home/rooms">

                                {
                                  !this.state.rooms ?
                                      <div align="center" style={{marginTop: 200}}>
                                        <CircularProgress color="primary"/>
                                        <h6>Chargement...</h6>
                                      </div>
                                      :
                                      <div>
                                        <div style={{marginTop:10}}>
                                          <h5>Rooms</h5>
                                        </div>
                                        <div className="row mt-3" style={{maxWidth:1000}}>
                                          {
                                            (this.state.rooms || []).map((room,key) => (
                                                <div className="col-lg-3 mb-2" key={key}>
                                                  <div className="card-container" style={{backgroundColor:room.color}} onClick={() => {
                                                    this.setState({
                                                      selectedRoom: room,
                                                      selectedRoomKey: room.id,
                                                      showContainerSection: 'Rooms',
                                                      focusedItem: 'Rooms',
                                                      selectedRoomItems:[room.id]
                                                    });
                                                    this.props.history.push('/home/rooms/' + room.id);
                                                  }}>
                                                    <div style={{display:"flex",justifyContent:"space-between"}}>
                                                      <h6 style={{color:"#fff",fontWeight:600}}>{room.title}</h6>
                                                      <MoreHorizIcon  style={{color:"#fff",marginTop:-5}}
                                                                      onClick={(e) => {
                                                                        e.preventDefault()
                                                                        e.stopPropagation()
                                                                        this.setState({settRoomAnchorEl:e.currentTarget})
                                                                      }}
                                                      />
                                                      <Popover
                                                          id={id_settRoom}
                                                          open={openRoomSetting}
                                                          anchorEl={this.state.settRoomAnchorEl}
                                                          onClose={(e) => {
                                                            e.preventDefault()
                                                            e.stopPropagation()
                                                            this.setState({settRoomAnchorEl:null})
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
                                                        <MenuItem onClick={(e) => {
                                                          e.preventDefault();e.stopPropagation()
                                                        }}  >
                                                          <ListItemIcon>
                                                            <PersonAddIcon style={{color:"#c0c0c0"}}/>
                                                          </ListItemIcon>
                                                          <Typography variant="inherit">
                                                            Ajouter
                                                          </Typography>
                                                        </MenuItem>
                                                        <MenuItem onClick={(e) => {
                                                          e.preventDefault();e.stopPropagation()
                                                        }}  >
                                                          <ListItemIcon>
                                                            <EditIcon style={{color:"#c0c0c0"}}/>
                                                          </ListItemIcon>
                                                          <Typography variant="inherit">
                                                            Modifier
                                                          </Typography>
                                                        </MenuItem>
                                                        <MenuItem onClick={(e) => {
                                                          e.preventDefault();e.stopPropagation()
                                                        }}  >
                                                          <ListItemIcon>
                                                            <DeleteIcon style={{color:"#c0c0c0"}}/>
                                                          </ListItemIcon>
                                                          <Typography variant="inherit">
                                                            Supprimer
                                                          </Typography>
                                                        </MenuItem>
                                                      </Popover>
                                                    </div>

                                                    <div style={{marginTop:60,marginLeft:10}}>
                                                      <div style={{display:"flex"}}>
                                                        <i className="fa fa-users" style={{color:"#fff",fontSize:14}}>&nbsp;{room.members.length}</i>
                                                        <i className="fa fa-tasks" style={{color:"#fff",fontSize:14,marginLeft:10}}>&nbsp;{(room.tasks || []).length}</i>
                                                      </div>
                                                    </div>
                                                  </div>
                                                </div>
                                            ))
                                          }
                                          <div className="col-lg-3">
                                              <div className="card-container" onClick={() => {this.setState({openNewRoomModal:true})}}>
                                              <div className="card-container-center-item">
                                                <i className="fa fa-plus" style={{color: "#c0c0c0", fontSize: 22}}/>
                                              </div>
                                            </div>
                                          </div>
                                        </div>
                                      </div>

                                }

                              </Route>,
                              <Route key={1} exact path="/home/rooms/:room_id">
                                {
                                  !this.state.rooms ?
                                      <div align="center" style={{marginTop: 200}}>
                                        <CircularProgress color="primary"/>
                                        <h6>Chargement...</h6>
                                      </div>
                                      :
                                      <Rooms
                                          rooms={this.state.rooms || []}
                                          selectedRoom={this.state.selectedRoom}
                                          setSelectedRoom={(room) => {this.setState({selectedRoom:room})}}
                                          contacts={this.state.contacts || []}
                                          annuaire_clients_mandat={this.state.annuaire_clients_mandat || []}
                                          //annuaire_clients={this.state.patients}
                                          addNewtask={(title,desc, assignedTo,client,teamEmails,priority,tags,date_deadline) => {
                                            this.addNewRoomTask(title,desc, assignedTo,client,teamEmails,priority,tags,date_deadline)
                                          }}
                                          onDeleteTask={(key) => {
                                            //this.deleteRoomTask(key)
                                          }}
                                          history={this.props.history}
                                          selectedRoomTab={this.state.selectedRoomTab}
                                          handleRoomTabsChange={(event,newValue) => {
                                            this.handleRoomTabsChange(event,newValue)
                                          }}
                                          miniDrive={this.state.folders || []}
                                          openPdfModal={(id) => {this.openPdfModal(id)}}
                                          openSnackbar={(type,msg) => {this.openSnackbar(type,msg)}}
                                      />
                                }
                              </Route>
                            ]

                      }

                      {
                        active_modules.includes("MEET") === true && localStorage.getItem("role") === "admin" &&
                            [
                              <Route key={0} exact path="/home/meet/new">
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
                              </Route>,
                              <Route key={1} exact path="/home/meet/rejoin">
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
                            ]
                      }



                      {
                        (active_modules.includes("ROOMS") === true || active_modules.includes("TIMESHEET") === true) && localStorage.getItem("role") === "admin" &&
                        [
                          <Route key={0} exact path="/home/contacts">
                            {
                              !this.state.contacts ?
                                  <div align="center" style={{marginTop: 200}}>
                                    <CircularProgress color="primary"/>
                                    <h6>Chargement...</h6>
                                  </div>
                                  :
                                  <div>
                                    <TableContact
                                        contacts={this.state.contacts}
                                        onEditClick={(contact, key) => {
                                          this.setState({
                                            selectedContact: contact,
                                            selectedContactKey: contact.id
                                          });
                                          this.props.history.push('/home/contacts/' + contact.id);
                                        }}
                                        onImportClick={(e) => {
                                          this.importCSVContacts(e)
                                        }}
                                        onAddBtnClick={() => {
                                          this.setState({
                                            openAddContactModal:true
                                          })
                                        }}
                                        deleteContact={(id) => {
                                          this.deleteContact(id)
                                        }}
                                    />
                                  </div>
                            }


                          </Route>,
                          <Route key={1} exact path="/home/contacts/:contact_id">
                            {
                              this.state.selectedContact === "" ?
                                  <div align="center" style={{marginTop: 200}}>
                                    <CircularProgress color="primary"/>
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
                                          }} />
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
                                                        readOnly
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
                          </Route>,

                          <Route key={2} exact path="/home/clients">
                            {
                              !this.state.annuaire_clients_mandat || !this.state.patients  ?
                                  <div align="center" style={{marginTop: 200}}>
                                    <CircularProgress color="primary"/>
                                    <h6>Chargement...</h6>
                                  </div>
                                  :
                                  <div>
                                    {
                                      active_modules.includes("MARKETPLACE_CLIENTS_PROSPECT") === true &&

                                      <TablePatientsBrainy
                                          mailCapteurs={this.sendCapteursMail}
                                          patients={this.state.patients || []}
                                          bodycheck={(email,name) => {this.sendBodyChekMail(email,name)}}
                                          bodycheckNl={(email) => {this.getBodyCheckNl(email)}}
                                          getDataDashboard={(email) => {this.getDataDashboard(email)} }
                                          onEditClick={(prospect, key) => {
                                            this.setState({
                                              selectedProspect: prospect,
                                              selectedProspectKey: prospect.id_user
                                            })
                                            this.props.history.push('/home/clients/prospect/' + prospect.id_user);
                                          }}
                                          onDelecteClick={(prospect,key)=>{
                                            this.deletepatient(prospect.id_user)
                                          }}
                                          createProspectRoom={(client) => {
                                            this.createProspectRoom(client)
                                          }}
                                          moveProspectToClients={(prospect) => this.moveProspectToClients(prospect)}
                                      />
                                    }

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
                                        onImportClick={(e) => {
                                          this.importCSVClients(e)
                                        }}
                                        openSnackbar={(type,msg) => this.openSnackbar(type,msg)}
                                        reloadGed={() => this.justReloadGed()}
                                        update_client_tempo_all={(data) => this.update_client_tempo_all(data)}
                                        update_clients={(data) => this.update_clients(data)}
                                    />
                                  </div>
                            }




                          </Route>,
                          <Route key={3} exact path="/home/clients/:client_id">
                            {
                              this.state.selectedSociete === "" ?
                                  <div align="center" style={{marginTop: 200}}>
                                    <CircularProgress color="primary"/>
                                    <h6>Chargement...</h6>
                                  </div> :
                                  <div>
                                    <div className="row">
                                      <div className="col-lg-12">
                                        <div className="card-box text-center">
                                          <img onClick={() => {}}
                                               src={this.state.selectedSociete.imageUrl ? this.state.selectedSociete.imageUrl : this.state.selectedSociete.type === '0' ? entIcon : userAvatar}
                                               className="rounded-circle avatar-lg img-thumbnail"
                                               alt="" style={{ cursor: 'pointer', width: 120, height: 120, objectFit: 'cover' }}
                                          />
                                          <input style={{ visibility: 'hidden', width: 0, height: 0 }}
                                                 type='file'
                                                 accept='.png,.jpeg,.jpg'
                                                 onChange={(files) => this.uploadImage(files)}
                                                 ref={(ref) => this.imageUpload = ref}
                                          />
                                          <h4 className="mb-0">{this.state.selectedSociete.type === "0" ? this.state.selectedSociete.societyName : this.state.selectedSociete.contactName}</h4>
                                          <div className="mt-1" style={{ display: 'contents',visibility:this.state.selectedClientTabIndex === 0 ? "visible" : "hidden" }}>
                                            <AtlButton
                                                appearance="primary"
                                                onClick={() => this.beforeUpdateSociety()}
                                                iconAfter={<AssignmentTurnedInIcon/>}
                                                //isDisabled={verifForms.verif_Email(this.state.selectedSociete.email)}
                                            >
                                              Enregistrer vos changements
                                            </AtlButton>
                                          </div>
                                          <div style={{ marginTop: 30 }}
                                               className="text-left">
                                            <Tabs selectedIndex={this.state.selectedClientTabIndex} onSelect={index => {
                                              this.setState({selectedClientTabIndex:index})
                                            }}
                                            >
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
                                                        value={this.state.selectedSociete.type === "0" ? this.state.selectedSociete.societyName : this.state.selectedSociete.contactName}
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
                                                        type="text"
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
                                                </div>
                                                <div className="row" style={{marginTop:20}}>
                                                  <div className="col-md-12">
                                                    <h5 style={{ marginBottom: 10 }}>Facturation</h5>
                                                    <div className="row mt-2">
                                                      <div className="col-md-6">
                                                        <p style={{ marginBottom: 10,marginTop:10 }}>Nom du client dans la facture</p>
                                                        <input
                                                            className="form-control"
                                                            type="text"
                                                            id="edae"
                                                            name="phone"
                                                            value={this.state.selectedSociete.client_fact_name}
                                                            onChange={this.handleChange('selectedSociete', 'client_fact_name')} />
                                                      </div>
                                                      <div className="col-md-6">
                                                        <p style={{ marginBottom: 10,marginTop:10 }}>Langue</p>
                                                        <select
                                                            className="form-control custom-select"
                                                            value={this.state.selectedSociete.lang_fact}
                                                            onChange={this.handleChange('selectedSociete', 'lang_fact')}
                                                        >
                                                          {
                                                            (data.oa_odoo_languages || []).map((item, key) =>
                                                                <option key={key} value={item.value}>{item.label}</option>
                                                            )
                                                          }
                                                        </select>
                                                      </div>
                                                    </div>
                                                    <h6 style={{ marginBottom: 10 }}>Adresse de facturation</h6>
                                                    <div className="row mt-2">
                                                      <div className="col-md-6">
                                                        <p style={{ marginBottom: 10 }}>Rue...</p>
                                                        <input
                                                            className="form-control"
                                                            type="text"
                                                            id="adress_fact_street"
                                                            name="adress_fact_street"
                                                            value={this.state.selectedSociete.adress_fact_street}
                                                            onChange={this.handleChange('selectedSociete', 'adress_fact_street')} />
                                                      </div>
                                                      <div className="col-md-6">
                                                        <p style={{ marginBottom: 10 }}>Rue 2...</p>
                                                        <input
                                                            className="form-control"
                                                            type="text"
                                                            id="adress_fact_street2"
                                                            name="adress_fact_street2"
                                                            value={this.state.selectedSociete.adress_fact_street2}
                                                            onChange={this.handleChange('selectedSociete', 'adress_fact_street2')} />
                                                      </div>
                                                    </div>
                                                    <div className="row mt-2">
                                                      <div className="col-md-4">
                                                        <p style={{ marginBottom: 10 }}>Ville</p>
                                                        <input
                                                            className="form-control"
                                                            type="text"
                                                            id="adress_fact_city"
                                                            name="adress_fact_city"
                                                            value={this.state.selectedSociete.adress_fact_city}
                                                            onChange={this.handleChange('selectedSociete', 'adress_fact_city')} />
                                                      </div>
                                                      <div className="col-md-4">
                                                        <p style={{ marginBottom: 10 }}>Etat</p>
                                                        <select
                                                            className="form-control custom-select"
                                                            value={this.state.selectedSociete.adress_fact_state}
                                                            onChange={this.handleChange('selectedSociete', 'adress_fact_state')}
                                                        >
                                                          {
                                                            (this.state.odoo_country_states || []).map((item, key) =>
                                                                <option
                                                                    key={key}
                                                                    value={item[0]}>{item[1]}</option>
                                                            )
                                                          }
                                                        </select>
                                                      </div>
                                                      <div className="col-md-2">
                                                        <p style={{ marginBottom: 10 }}>Code postal</p>
                                                        <input
                                                            className="form-control"
                                                            type="text"
                                                            id="adress_fact_pc"
                                                            name="adress_fact_pc"
                                                            value={this.state.selectedSociete.adress_fact_pc}
                                                            onChange={this.handleChange('selectedSociete', 'adress_fact_pc')} />
                                                      </div>
                                                      <div className="col-md-2">
                                                        <p style={{ marginBottom: 10 }}>Pays</p>
                                                        <select
                                                            className="form-control custom-select"
                                                            value={this.state.selectedSociete.adress_fact_country}
                                                            onChange={this.handleChange('selectedSociete', 'adress_fact_country')}
                                                        >
                                                          {
                                                            (this.state.odoo_countries || []).map((item, key) =>
                                                                <option
                                                                    key={key}
                                                                    value={item[0]}>{item[1]}</option>
                                                            )
                                                          }
                                                        </select>
                                                      </div>
                                                    </div>
                                                  </div>
                                                </div>
                                                <div className="row" style={{marginTop:20}}>
                                                  <div className="col-md-12">
                                                    <h5 style={{ marginBottom: 10 }}>Remarques</h5>
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
                                                                        id: '',
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
                                                            <div key={key} style={{
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
                                                                          objCp.team[key].id = contact.id;
                                                                          objCp.team[key].tarif = contact.rateFacturation || '';
                                                                          this.setState({ newClientFolder: objCp });
                                                                        }
                                                                      }}
                                                                      value={this.state.newClientFolder.team[key].id}
                                                                  >
                                                                    {(this.state.contacts || []).map((contact, key) => (
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
                                                                        id: '',
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
                                                            <div key={key} style={{
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
                                                                          objCp.team[key].id = id;
                                                                          objCp.team[key].tarif = contact.rateFacturation || '';
                                                                          this.setState({ newClientFolder: objCp });
                                                                        }
                                                                      }}
                                                                      value={this.state.newClientFolder.team[key].id}
                                                                  >
                                                                    {(this.state.contacts || []).filter(x => !x.type ).map((contact, key) => (
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
                                  </div>
                            }
                          </Route>,
                          <Route key={4} exact path="/home/clients/prospect/:prospect_id">
                            {
                              this.state.selectedProspect !== '' &&
                              <div style={{marginTop: 30,padding:20,paddingRight:40,border:"2px solid #f0f0f0",margin:20}} className="text-left">
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
                                              <h4 className="font-weight-bold">{this.state.selectedProspect.nom + " "+this.state.selectedProspect.prenom}</h4>

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
                                    {(this.state.selectedProspect.access_token_google!=""&&this.state.selectedProspect.access_token_google!=null)?
                                        <Dashboard user={this.state.selectedProspect}/>:
                                        <div className="text-center">
                                          <h3>les données de google fit indisponible</h3>
                                        </div>
                                    }
                                  </TabPanel>

                                </Tabs>
                              </div>
                            }

                          </Route>
                        ]
                      }


                      {
                        active_modules.includes("TIMESHEET") === true && localStorage.getItem("role") === "admin" &&
                        [
                          <Route key={1} exact path="/home/timeSheet/activities">

                            {this.renderTimeSheet()}

                          </Route>,
                          <Route key={2} exact path="/home/timeSheet/dashboard">
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
                                        <Tabs selectedIndex={this.state.selectedTimeSheetDashIndex} onSelect={index => {
                                          this.setState({selectedTimeSheetDashIndex:index})
                                        }}>
                                          <TabList>
                                            <Tab>This Week</Tab>
                                            <Tab disabled={true}>Scheduled Next Week </Tab>
                                          </TabList>
                                          <TabPanel>
                                            <div className="row justify-content-start align-items-center mt-3">
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
                                                this.state.contacts &&
                                                <TableTimeSheetDashboard
                                                    contacts={this.state.contacts || []}
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
                                              this.state.contacts  &&
                                              <TableTimeSheet
                                                  contacts={this.state.prestatairesCp}
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
                          </Route>,
                          <Route key={3} exact path="/home/timeSheet/dashboardPerson">
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
                                        <Tabs selectedIndex={this.state.selectedTimeSheetDashPersonIndex} onSelect={index => {
                                          this.setState({selectedTimeSheetDashPersonIndex:index})
                                        }}>
                                          <TabList>
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
                                                    {(this.state.contacts || []).map((name, key) => (
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
                          </Route>,
                          <Route key={4} exact path="/home/timeSheet/dashboardProject">
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
                                        <Tabs selectedIndex={this.state.selectedTimeSheetDashprojectIndex} onSelect={index => {
                                          this.setState({selectedTimeSheetDashprojectIndex:index})
                                        }}>
                                          <TabList>
                                            <Tab>All projects</Tab>
                                            <Tab disabled={true}>This Week</Tab>
                                            <Tab disabled={true}>Scheduled Next Week </Tab>
                                          </TabList>
                                          <TabPanel>
                                            <div className="row justify-content-start align-items-center mt-3">
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
                                            (this.state.contacts || []).length > 0 &&
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
                          </Route>,
                          <Route key={5} exact path="/home/compta/factures">
                            <div>
                              {
                                !this.state.factures || !this.state.annuaire_clients_mandat ?
                                    <div align="center" style={{marginTop: 200}}>
                                      <CircularProgress color="primary"/>
                                      <h6>Chargement...</h6>
                                    </div> :

                                    <ComptaInvoices
                                        factures={this.state.factures}
                                        contacts={this.state.contacts}
                                        clients_tempo={this.state.clients_cases}
                                        annuaire_clients_mandat={this.state.annuaire_clients_mandat}
                                        rerender={() => {
                                          this.setState({updateX: !this.state.updateX})
                                        }}
                                        show_odoo_facture={(id, token, name, odoo_id) => {
                                          this.setState({loading: true})
                                          SmartService.generate_facture_odoo(odoo_id, localStorage.getItem('token'), localStorage.getItem('usrtoken'),
                                              id, token).then(genFactRes => {
                                            if (genFactRes.succes === true && genFactRes.status === 200) {
                                              this.setState({loading: false})
                                              let b64 = genFactRes.data.pdf;
                                              this.showDocInPdfModal(b64, "Facture_" + name, "pdf")
                                            }
                                          }).catch(err => {
                                            console.log(err)
                                          })
                                        }}
                                        openFacture={(id) => {
                                          this.openPdfModal(id)
                                        }}
                                        openPdf={(b64, name, type) => {
                                          this.showDocInPdfModal(b64, name, type)
                                        }}
                                        setLoading={(value) => {this.setState({loading:value})}}
                                    />
                              }
                            </div>
                          </Route>,
                          <Route key={6} exact path="/home/compta/new">
                            <div>
                              {
                                !this.state.clients_cases || !this.state.annuaire_clients_mandat ?
                                    <div  align="center" style={{marginTop:200}}>
                                      <CircularProgress color="primary" />
                                      <h6>Chargement...</h6>
                                    </div> :
                                    <NewInvoice annuaire_clients_mandat={this.state.annuaire_clients_mandat}
                                                clients_tempo={this.state.clients_cases}
                                    />
                              }
                            </div>
                          </Route>
                        ]
                      }

                      {
                        active_modules.includes("MARKETPLACE") === true && localStorage.getItem("role") === "admin" &&
                            [
                                active_modules.includes("MARKETPLACE") === true &&
                                    [
                                      <Route key={1} exact path="/home/marketplace/gestion_societes" >
                                        {
                                          !this.state.societies ?
                                              <div align="center" style={{marginTop: 200}}>
                                                <CircularProgress color="primary"/>
                                                <h6>Chargement...</h6>
                                              </div>
                                              :
                                              <div>
                                                <div className="mt-2" style={{textAlign: "right"}}>
                                                  <div className="text-sm-right">
                                                    <button
                                                        onClick={() => {
                                                          this.props.history.push("/creation_societe/Tunisie/SARL",{ged:this.state.reelFolders})
                                                        }}
                                                        className="btn btn-danger waves-effect waves-light mb-2">
                                                      <i className="mdi mdi-plus-circle mr-1"/> Créer une société
                                                    </button>
                                                  </div>
                                                </div>
                                                <Dash societies={this.state.societies || []}
                                                      onSelectSoc={(soc) => {
                                                        this.setState({selected_marktp_society:soc})
                                                        this.props.history.push("/home/marketplace/gestion_societes/"+soc.id)
                                                      }}
                                                />
                                              </div>
                                        }
                                      </Route>,
                                      <Route key={2} exact path="/home/marketplace/gestion_societes/:id" >
                                        {
                                          !this.state.selected_marktp_society ?
                                              <div align="center" style={{marginTop: 200}}>
                                                <CircularProgress color="primary"/>
                                                <h6>Chargement...</h6>
                                              </div>
                                              :
                                              <div>
                                                <DetailsSoc soc={this.state.selected_marktp_society}
                                                            setLoading={(b) => this.setState({loading:b})}
                                                            openPdf={(b64,name,type) => {
                                                              this.showDocInPdfModal(b64,name,type)
                                                            }}
                                                            openSnackbar={(type,msg) => this.openSnackbar(type,msg)}
                                                />
                                              </div>
                                        }
                                      </Route>,
                                        <Route key={4} exact path="/home/marketplace/augm_capital">
                                          {
                                            !this.state.societies ?
                                                <div align="center" style={{marginTop: 200}}>
                                                  <CircularProgress color="primary"/>
                                                  <h6>Chargement...</h6>
                                                </div>
                                                :
                                                this.state.societies.length === 0 ?
                                                    <div>
                                                      <h5>Aucune société encore ajoutée !</h5>
                                                    </div>
                                                    :
                                                <AugmCapital
                                                    societies={this.state.societies || []}
                                                    openPdf={(b64,name,type) => {
                                                      this.showDocInPdfModal(b64,name,type)
                                                    }}
                                                    setLoading={(b) => {
                                                      this.setState({loading: b})
                                                    }}
                                                    openSnackbar={(type,msg) => this.openSnackbar(type,msg)}
                                                />
                                          }
                                        </Route>,
                                        <Route key={5} exact path={"/home/marketplace/cession_actions"}>
                                          <CessionActions
                                              societies={this.state.societies || []}
                                              openPdf={(b64,name,type) => {
                                                this.showDocInPdfModal(b64,name,type)
                                              }}
                                              setLoading={(b) => {
                                                this.setState({loading: b})
                                              }}
                                              openSnackbar={(type,msg) => this.openSnackbar(type,msg)}
                                          />
                                        </Route>,
                                        <Route key={3} exact path="/home/marketplace/convertible_loan">
                                          <ConvertibleLoan
                                              openPdf={(b64,name,type) => {
                                                this.showDocInPdfModal(b64,name,type)
                                              }}
                                              setLoading={(b) => {this.setState({loading:b})}}
                                          />
                                        </Route>,
                                      <Route key={0} exact path="/home/marketplace/recettes">
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
                                    ],
                              active_modules.includes("MARKETPLACE") === true &&
                              [
                                <Route key={0} exact path="/home/marketplace/produits">
                                  {
                                    this.state.loading === false && this.state.firstLoading === false &&
                                    <div className="container-fluid w-100">
                                      <TableProducts
                                          ajouterProduit={()=>{
                                            this.setState({openModalProduit:true})
                                          }}
                                          onSelectProduct={(item,key)=>{
                                        console.log()
                                        this.setState({selectedProduct:item})
                                        this.props.history.push('produits/'+item.id_prod)

                                      }}
                                          products={this.state.produits}
                                          addNewPack={(pack) => {this.addNewProductsPack(pack)}}
                                      />

                                    </div>
                                  }
                                </Route>,
                                <Route key={0} exact path="/home/marketplace/produits/:id">
                                  {
                                    this.state.loading === false && this.state.firstLoading === false &&
                                    <div className="container-fluid w-100">
                                      <div className="row">
                                        <div className="col-md-4 p-2" style={{borderStyle:"solid",borderWidth:1}}>


                                          <img   src={this.state.selectedProduct.image} style={{width:"100%"}}/>



                                        </div>
                                        <div className="col-md-7 ml-3">
                                          <div>
                                            <h6>LIGHT MEAL</h6>
                                          </div>
                                          <div>
                                            <h1>{this.state.selectedProduct.nomProd}</h1>
                                          </div>



                                          <div className="mt-2  ">

                                            <hr style={{height:1,backgroundColor:"black" ,width:"30%",marginRight:"100%" }}/>
                                          </div>
                                          <div className="mt-2">

                                            <h4>PV: 64</h4>

                                          </div>

                                          <div className="mt-2 row align-items-center">
                                            <div className="col-md-2 mr-1" style={{borderStyle:"solid",borderRadius:100,borderWidth:1}}>
                                              <div className="row align-items-center justify-content-center ">
                                                <div >
                                                  <IconButton color="primary" aria-label="upload picture" component="span">
                                                    <Remove style={{color:"black"}} />
                                                  </IconButton>

                                                </div>

                                                <div className="col-md-3 text-center">
                                                  <h3>
                                                    1
                                                  </h3>
                                                </div>
                                                <div >
                                                  <IconButton color="primary" aria-label="upload picture" component="span">
                                                    <Add style={{color:"black"}} />
                                                  </IconButton>

                                                </div>

                                              </div>

                                            </div>
                                            <div>
                                              <h1>
                                                {this.state.selectedProduct.prix +"$"}
                                              </h1>

                                            </div>

                                            <div className="ml-3 ">
                                              <h4>SAVE UP TO 20% AFTER ENROLLMENT</h4>
                                            </div>

                                          </div>
                                          <div className="mt-3">
                                            <div className="row">
                                              <div className="col-md-4">
                                                <Button style={{borderRadius:100,borderWidth:1,borderStyle:"solid" ,width:"100%",backgroundColor:"#fa8282"}} variant="contained"><h5 style={{color:"white"}}>ADD TO CART</h5></Button>


                                              </div>
                                              <div className="col-md-4">
                                                <Button style={{width:"100%",borderRadius:100}} variant="outlined">ADD TO AUTOSHIP</Button>

                                              </div>
                                              <div className="col-md-4">
                                                <small>* Earn exclusive point with autoship</small>
                                              </div>

                                            </div>
                                          </div>
                                          <div className="mt-2">
                                            <h5>
                                              *Free Shipping After $50 in Purchases
                                            </h5>
                                          </div>


                                        </div>


                                      </div>

                                    </div>
                                  }
                                </Route>
                              ],

                              active_modules.includes("MARKETPLACE") === true &&
                                  [
                                    <Route key={2} exact path="/home/marketplace/RH_Support_ponctuel" >
                                      {
                                        !this.state.prestataires ?
                                            <div align="center" style={{marginTop: 200}}>
                                              <CircularProgress color="primary"/>
                                              <h6>Chargement...</h6>
                                            </div>
                                            :
                                            <div>
                                              <h4 className="mt-0 mb-1">Contacts de fournisseurs de prestations de services</h4>
                                              <div className="mt-2" style={{textAlign: "right"}}>
                                                <div className="text-sm-right">
                                                  <button
                                                      onClick={() => {
                                                        this.setState({openAddPrestataireModal: true})
                                                      }}
                                                      className="btn btn-danger waves-effect waves-light mb-2">
                                                    <i className="mdi mdi-plus-circle mr-1"/> Ajouter
                                                  </button>
                                                </div>
                                              </div>
                                              <div>
                                                <Table_prestataire_service
                                                    service="Avocats" bgcolor="#FF4F4E"
                                                    contacts={this.state.prestataires.filter(x => x.type1 && x.type1 === "avocat")}
                                                    onEditClick={(contact, key) => {
                                                      this.setState({
                                                        selectedContact: contact,
                                                        selectedContactKey: contact.id
                                                      });
                                                      this.props.history.push('/home/marketplace/RH_Support_ponctuel/' + contact.id);
                                                    }}
                                                />
                                                <Table_prestataire_service
                                                    service="Notaires" bgcolor="#FF7F7D"
                                                    contacts={this.state.prestataires.filter(x => x.type1 && x.type1 === "notaire")}
                                                    onEditClick={(contact, key) => {
                                                      this.setState({
                                                        selectedContact: contact,
                                                        selectedContactKey: contact.id
                                                      });
                                                      this.props.history.push('/home/marketplace/RH_Support_ponctuel/' + contact.id);
                                                    }}
                                                />
                                                <Table_prestataire_service
                                                    service="Experts compatable" bgcolor="#F92BA5"
                                                    contacts={this.state.prestataires.filter(x => x.type1 && x.type1 === "expert_comptable")}
                                                    onEditClick={(contact, key) => {
                                                      this.setState({
                                                        selectedContact: contact,
                                                        selectedContactKey: contact.id
                                                      });
                                                      this.props.history.push('/home/marketplace/RH_Support_ponctuel/' + contact.id);
                                                    }}
                                                />
                                                <Table_prestataire_service
                                                    service="Audit" bgcolor="#83c5be"
                                                    contacts={this.state.prestataires.filter(x => x.type1 && x.type1 === "audit")}
                                                    onEditClick={(contact, key) => {
                                                      this.setState({
                                                        selectedContact: contact,
                                                        selectedContactKey: contact.id
                                                      });
                                                      this.props.history.push('/home/marketplace/RH_Support_ponctuel/' + contact.id);
                                                    }}
                                                />
                                                <Table_prestataire_service
                                                    service="CFO(financiers)" bgcolor="#0077b6"
                                                    contacts={this.state.prestataires.filter(x => x.type1 && x.type1 === "CFO")}
                                                    onEditClick={(contact, key) => {
                                                      this.setState({
                                                        selectedContact: contact,
                                                        selectedContactKey: contact.id
                                                      });
                                                      this.props.history.push('/home/marketplace/RH_Support_ponctuel/' + contact.id);
                                                    }}
                                                />
                                              </div>

                                            </div>
                                      }
                                    </Route>,
                                    <Route key={3} exact path="/home/marketplace/RH_Support_ponctuel/:prestataire_id">
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
                                                             onChange={(files) => this.uploadImage_Prestataire(files)}
                                                             ref={(ref) => this.imageUpload = ref}
                                              />
                                                <h4 className="mb-0">{this.state.selectedContact.prenom + ' ' + this.state.selectedContact.nom}</h4>
                                                <p className="text-muted">{this.state.selectedContact.specialite} </p>
                                                <div style={{ display: 'contents' }}>
                                                  <button type="button"
                                                          onClick={this.savePrestataireChanges}
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
                                                          <p style={{ marginBottom: 10 }}>Fonction</p>
                                                          <select
                                                              className="form-control custom-select"
                                                              id="titre"
                                                              name="titre"
                                                              placeholder="Titre"
                                                              value={this.state.selectedContact.type1}
                                                              onChange={this.handleChange('selectedContact', 'type1')}
                                                          >
                                                            {
                                                              data.fonctions.map((titre, key) =>
                                                                  <option
                                                                      key={key}
                                                                      value={titre.value}
                                                                      label={titre.label} />
                                                              )
                                                            }
                                                          </select>
                                                        </div>
                                                        <div className="col-sm-6">
                                                          <p style={{ marginBottom: 10 }}>Adresse</p>
                                                          <input
                                                              className="form-control"
                                                              type="text"
                                                              id="phone"
                                                              name="phone"
                                                              value={this.state.selectedContact.adress}
                                                              onChange={this.handleChange('selectedContact', 'adress')} />
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
                                    </Route>
                                  ]
                            ]
                      }

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
                  disabled={this.state.emailsDriveShare.length === 0 || this.state.shareRights.length === 0}
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
              <div style={{display:"flex"}}>
                <div style={{
                  backgroundColor: this.state.newRoomColor,
                  height: 48,
                  borderRadius: 5,
                  width: 60,cursor:"pointer"
                }}
                     onClick={(e) => {this.setState({anchorEl_colorPicker:e.currentTarget})}}
                />
                <TextField
                    id="room-name"
                    label="Ajouter un titre"
                    variant="filled"
                    value={this.state.newRoomTitle}
                    onChange={(event) =>
                        this.setState({ newRoomTitle: event.target.value })
                    }
                    style={{ width: 408, marginLeft: 33 }}
                    size="small"
                />
                <Popover
                    id={id}
                    open={openRoomColorPicker}
                    anchorEl={this.state.anchorEl_colorPicker}
                    onClose={() => {
                      this.setState({anchorEl_colorPicker: null})
                    }}
                    anchorOrigin={{
                      vertical: 'bottom',
                      horizontal: 'center',
                    }}
                    transformOrigin={{
                      vertical: 'bottom',
                      horizontal: 'center',
                    }}
                >
                  <BlockPicker color={this.state.newRoomColor} onChange={(color,event) => {
                    this.setState({newRoomColor:color.hex})
                  }}
                               colors={['#F0F0F0','#FF6900', '#FCB900', '#7BDCB5', '#00D084', '#8ED1FC', '#0693E3', '#ABB8C3', '#EB144C', '#F78DA7',
                                 '#D9E3F0', '#F47373', '#697689', '#37D67A', '#2CCCE4', '#dce775', '#ff8a65', '#ba68c8']}
                  />
                </Popover>
              </div>
              <div className="row">
                <div className="col-md-12" style={{ marginTop: 25 }}>
                  <div>
                    <Chips
                        chips={[]}
                      save={(data) => {
                        console.log(data)
                        this.setState({ NewRoomEmails: data });
                      }}
                      requiredMessage={'Email incorrect'}
                      placeholder="Ajouter des personnes"
                      pattern={data.emailPatern}
                      limit={20}
                      limitMessage="Vous avez atteint le nombre maximal d'e-mails"
                        contacts={this.state.contacts || []}
                    />
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
                    color:this.state.newRoomColor,
                    members: this.state.NewRoomEmails,
                    created_at:moment().format("YYYY-MM-DD HH:mm:ss"),
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
                          if(acceptedFiles[i].type === "application/pdf" || acceptedFiles[i].type.startsWith("image/") ){
                            let formData = new FormData();
                            formData.append('file', acceptedFiles[i]);
                            console.log(this.state.selectedFolderId)
                            this.state.selectedFolderId !== '' &&
                            formData.append(
                              'folder_id',
                              this.state.selectedFolderId
                            );
                            calls.push(axios.request({
                                method: 'POST', url: endpoint + '/ged/' + ged_id + '/doc/addfile',
                                data: formData,
                                headers: {
                                  'Content-Type': 'multipart/form-data',
                                  'token': localStorage.getItem('token'),
                                  'usrtoken': localStorage.getItem('usrtoken')
                                },
                                onUploadProgress: (p) => {
                                  this.setState({ progressUpload: (p.loaded / p.total) * 100 });
                                }
                              }).then( res => {console.log(res)}).catch(err => {console.log(err)})
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
                societes={this.state.annuaire_clients_mandat || []}
                contacts={this.state.contacts}
                onSelectBtnClick={(client) => {
                  let obj = this.state.TimeSheet;
                  obj.newTime.client = client.ContactName;
                  let find_annuaire_fact_lead = (this.state.annuaire_clients_mandat || []).find(
                    (x) => x.contactName === client.contactName
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
                      value={this.state.newClient.type}
                      onChange={this.handleChange('newClient', 'type')}>
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
                  <p style={{ marginBottom: 10 }}>Nom & prénom</p>
                  <input
                      style={{ minWidth: 300, height: 40 }}
                      type="text"
                      className="form-control"
                      id="nomc"
                      name="nomc"
                      value={this.state.newClient.contactName}
                      onChange={this.handleChange('newClient', 'contactName')} />
                </div>
                {
                  this.state.newClient.type === "0" &&
                  <div className="col-md-6">
                    <p style={{ marginBottom: 10 }}>Nom de la société</p>
                    <input
                        style={{ minWidth: 300, height: 40 }}
                        type="text"
                        className="form-control"
                        id="nomc"
                        name="nomc"
                        value={this.state.newClient.societyName}
                        onChange={this.handleChange('newClient', 'societyName')} />
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
                      id="nomc"
                      name="nomc"
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
                  disabled={this.state.newClient.contactName === '' || verfiForms.verif_Email(this.state.newClient.email.trim())}
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

          <Modal
              isOpen={this.state.openModalProduit}
              size='lg'
              centered={true}
              //zIndex={1500}
              toggle={() => this.setState({ openModalProduit: !this.state.openModalProduit })}
          >
            <ModalHeader
                toggle={() => this.setState({ openModalProduit: !this.state.openModalProduit })}

            >
             <h3>
               Ajouter un produit
             </h3>
            </ModalHeader>
            <ModalBody>
              <div className="row">
                <div className="col-md-4 text-center p-2 " style={{border:"2px solod #f0f0f0"}}>

                  <Button style={{width:"80%",backgroundColor:`rgba(117, 190, 218, 0.0)`}}>
                    {
                      this.state.nvproduit.image === "" ?
                        <img alt="" onClick={(e) => {
                          this.handleClick(e)
                        }} src={photo} style={{width: "100%"}}/>
                        :
                        <img alt="" onClick={(e) => {
                          this.handleClick(e)
                        }} src={this.state.nvproduit.image} style={{width: "100%"}}/>
                    }
                    <input onChange={(e)=>{
                      this.uploadImageProduit(e)
                    }} ref="fileUploader" type="file"accept="image/x-png,image/gif,image/jpeg"  style={{display:"none"}} />
                  </Button>



                </div>
                <div className="col-md-7 ml-3">

                  <div>
                    <TextField  value={this.state.nvproduit.nomProd}
                                onChange={(e)=>{ this. handleChangeText("nomProd",e)}}
                                id="outlined-basic" label="Nom de produit" variant="outlined" style={{width:"80%"}} />
                  </div>
                  <div className="mt-2  ">
                    <hr style={{height:1,backgroundColor:"black" ,width:"30%",marginRight:"100%" }}/>
                  </div>
                  <div>
                    <TextField  value={this.state.nvproduit.descriptionProd}
                                multiline
                                rows={3}
                                onChange={(e)=>{this.handleChangeText("descriptionProd",e)}}
                                id="outlined-basic" label="Description" variant="outlined" style={{width:"80%"}} />
                  </div>


                  <div className="mt-2 ">

                    <TextField type="number" onChange={(e)=>{this.handleChangeText("prix",e)}}  value={this.state.nvproduit.prix} id="outlined-basic" label="Prix " variant="outlined" style={{width:"50%"}} />

                  </div>
                  <div className="mt-3">
                    <div className="row align-items-center">
                      <div className="col-md-6">
                        <Button onClick={() => this.ajouterProduit() }
                                style={{borderRadius:100,width:"100%",backgroundColor:"#3f51b5"}}
                                variant="contained"

                        >
                          Ajouter produit
                        </Button>
                      </div>
                      <div className="col-md-4">
                        <Button  style={{width:"100%",borderRadius:100,backgroundColor:"#c0c0c0"}} variant="contained">Annuler</Button>
                      </div>
                    </div>
                  </div>
                </div>


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

          <Dialog
              maxWidth="xl"
              open={this.state.openAddPrestataireModal}
              onClose={() => {
                this.setState({ openAddPrestataireModal: !this.state.openAddPrestataireModal });
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
                      openAddPrestataireModal: !this.state.openAddPrestataireModal
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
                      value={this.state.newPrestataire.nom}
                      onChange={this.handleChange('newPrestataire', 'nom')} />

                </div>
                <div className="col-md-6">
                  <p style={{ marginBottom: 10 }}>Prénom</p>
                  <input
                      style={{ minWidth: 300, height: 40 }}
                      type="email"
                      className="form-control"
                      id="nome"
                      name="nome"
                      value={this.state.newPrestataire.prenom}
                      onChange={this.handleChange('newPrestataire', 'prenom')} />
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
                      value={this.state.newPrestataire.email}
                      onChange={this.handleChange('newPrestataire', 'email')} />
                </div>
                <div className="col-md-6">
                  <p style={{ marginBottom: 10 }}>Téléphone</p>
                  <input
                      style={{ minWidth: 300, height: 40 }}
                      type="text"
                      className="form-control"
                      id="nomt"
                      name="nomt"
                      value={this.state.newPrestataire.phone}
                      onChange={this.handleChange('newPrestataire', 'phone')} />

                </div>
              </div>
              <div className="row mt-3">
                <div className="col-md-6">
                  <p style={{ marginBottom: 10 }}>Adresse</p>
                  <input
                      style={{ minWidth: 300, height: 40 }}
                      type="text"
                      className="form-control"
                      id="nomt"
                      name="nomt"
                      value={this.state.newPrestataire.adress}
                      onChange={this.handleChange('newPrestataire', 'adress')} />
                </div>
                <div className="col-md-6">
                  <p style={{ marginBottom: 10 }}>Fonction</p>
                  <select
                      style={{ minWidth: 300, height: 40 }}
                      className="form-control custom-select"
                      id="nomt"
                      name="nomt"
                      value={this.state.newPrestataire.type1}
                      onChange={this.handleChange('newPrestataire', 'type1')}>
                    {
                      data.fonctions.map((titre, key) =>
                          <option key={key} value={titre.value} label={titre.label} />
                      )
                    }
                  </select>
                </div>
              </div>
            </DialogContent>

            <DialogActions style={{ padding: 20 }}>
              <MuiButton
                  onClick={() => {
                    this.setState({ openAddPrestataireModal: false });
                  }}
                  color="primary"
                  style={{ textTransform: 'capitalize' }}
              >
                Annuler
              </MuiButton>
              <MuiButton
                  disabled={this.state.newPrestataire.nom.trim() === '' || this.state.newPrestataire.prenom.trim() === '' || this.state.newPrestataire.email === ''}
                  onClick={() => {
                    this.addNewPrestataire()
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
