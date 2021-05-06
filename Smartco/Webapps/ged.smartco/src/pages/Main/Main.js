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
import { Modal, ModalBody, ModalHeader,ModalFooter } from 'reactstrap';
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
import DocGenerationService from "../../provider/DocGenerationService";
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import {BlockPicker} from 'react-color'
import TableTimeSheetsNonFact from "../../components/Tables/TableTimeSheetsNonFact";
import AssignmentTurnedInIcon from '@material-ui/icons/AssignmentTurnedIn';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import {Dropdown} from 'semantic-ui-react'
import AltModal, { ModalTransition } from '@atlaskit/modal-dialog';

const {DirectoryTree} = Tree;


const ged_id = "896ca0ed-8b4a-40fd-aeff-7ce26ee1bcf9";
/*const odoo_id = "796dc0ed-8b4a-40fd-aeff-7ce26ee1bcf9"*/
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
  avance_frais_upload={}

  state = {

    isDisconnected: false,

    openSocketChangeModal:false,

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

    beforeCreateFacture:{
      createAt:"",
      ligneFactures:[],
      clientFolderID:"",
      row:"",
      template:"10",
      client:"",
      paymTerm:"",
      deadline_date:"",
      taxe:""
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
    sharedMiniDrive:[],
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
    selectedDriveSharedItem:[],
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
    //annuaire_clients_mandat: [],
    //time_sheets:[],
    /*rooms: [],*/
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
    newRoomColor:"#f0f0f0",
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
    anchorElDrive4:null,
    expandedDrivePopUpKeys:[],
    selectedDrivePopUpKeys:[],
    autoExpandDrivePopUpParent:true,
    expandedSharedPopUpKeys:[],
    selectedSharedPopUpKeys:[],
    autoExpandSharedPopUpParent:true,

    destinationFolder:"",

    wip_selected_contact:"",
    wip_selected_client:"",
    wip_selected_mandat:"",
    wip_selected_folder:"",

    SEQ_file:"",
    signFile_destinationFolder:"",
    signFile_type:false,
    signFile_Ged:"",

    openUserDetailModal:false,
    userFname:localStorage.getItem("firstname") || "",
    userLname:localStorage.getItem("lastname") || "",
    userEmail:localStorage.getItem("email") || "",
    userPhone:localStorage.getItem("phone") || "",

    loading_provision_preview:false,
    loading_provision_save:false,
    loading_avance_frais:false,
    provision_bank:"",
    provision_amount:"",
    provision_tax:"",

    avance_frais_desc:"",
    avance_frais_facture_file:"",

    anchorEl_colorPicker: null,
    settRoomAnchorEl:null,
    selectedRoomTab:0,

    updateX:false

  };

  async componentDidMount() {

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

      let contacts = await rethink.getTableData(db_name,"test","contacts")
      let find_current_contact = (contacts || []).find(x => x.email === localStorage.getItem("email"));
      console.log(find_current_contact)
      if(find_current_contact && find_current_contact.odoo_id){
        localStorage.setItem("odoo_id",find_current_contact.odoo_id)
      }

    setTimeout(() => {

      //Get List Country ODOO
      SmartService.get_odoo_countries(localStorage.getItem("odoo_id"),localStorage.getItem("token"),localStorage.getItem("usrtoken")).then(countriesRes => {
        if (countriesRes.succes === true && countriesRes.status === 200) {
          let data = [["",""]]
          this.setState({odoo_countries:data.concat(countriesRes.data || [])})
        }
      }).catch(err => {console.log(err)})
      //END

      //Get List Country_states ODOO
      //43 = Suisse
      SmartService.get_odoo_country_states(localStorage.getItem("odoo_id"),43,localStorage.getItem("token"),localStorage.getItem("usrtoken")).then(countryStatesRes => {
        console.log(countryStatesRes)
        if (countryStatesRes.succes === true && countryStatesRes.status === 200) {
          let data = [["",""]]
          this.setState({odoo_country_states:data.concat(countryStatesRes.data || [])})
        }
      }).catch(err => {console.log(err)})
      //END

      //Get List TAX ODOO
      SmartService.get_tax_odoo(localStorage.getItem("odoo_id"),localStorage.getItem("token"),localStorage.getItem("usrtoken")).then( taxRes => {
        if (taxRes.succes === true && taxRes.status === 200) {
          let taxs_id = taxRes.data || [];
          let tax_calls = [];
          let taxs = []
          taxs_id.map((id, key) => {
            tax_calls.push(
                SmartService.get_tax_odoo_byID(localStorage.getItem("odoo_id"),id, localStorage.getItem("token"), localStorage.getItem("usrtoken")).then(taxResData => {
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
      SmartService.get_paymentTerm_odoo(localStorage.getItem("odoo_id"),localStorage.getItem("token"),localStorage.getItem("usrtoken")).then(paymTermRes => {
        if(paymTermRes.succes === true && paymTermRes.status === 200){
          let payTerms_id = paymTermRes.data || [];
          let payTerm_calls = [];
          let paymTerms = [];
          payTerms_id.map((id,key) => {
            payTerm_calls.push(
                SmartService.get_paymentTerm_odoo_byID(localStorage.getItem("odoo_id"),id,localStorage.getItem("token"),localStorage.getItem("usrtoken")).then(paymTermResData => {
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
                miniDrive:main_functions.changeStructureWithFiles(gedRes.data.Proprietary.Content.folders || []),
                reelFolders: gedRes.data.Proprietary.Content.folders || [],
                sharedReelFolders: gedRes.data.Shared.Content.folders || [],
                rootFiles: gedRes.data.Proprietary.Content.files || [],
                rootFolders: gedRes.data.Proprietary.Content.folders || [],
                sharedRootFiles: sharedFiles,
                sharedFolders: sharedFolders,
                sharedMiniDrive: sharedFolders,
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


            }
            else {
              this.setState({ loading: false });
              localStorage.clear();
              this.props.history.push('/login');
            }
          })
          .catch((err) => {
            this.props.history.push('/error');
            console.log(err);
          });

      this.rethink_initialise()

    },300);

    }

  }

  rethink_initialise(){
    //RethinkDB
    rethink.createDB(db_name,"test").then( r1 => {
      if (r1 === true) console.log("NEW DB CREATED");
      if (r1 === false) console.log("DB ALREADY EXIST");

      rethink.tableList(db_name,"test").then( tablesRes => {
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
                      firstLoading: false,
                      loading: false
                    });
                  }
                }
                this.setState({[item]:rr.filter(x => x.admin_odoo_id === localStorage.getItem("odoo_id")).sort( (a,b) => {
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
                  this.setState({
                    TimeSheet:newTimeSheet,
                    [item]:rr.sort( (a,b) => {
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
              else if(item === "odoo_companies"){
                this.setState({[item]:rr.filter(x => x.odoo_id === localStorage.getItem("odoo_id"))})
              }
              else if(item === "clients_cases"){
                this.setState({[item]:rr.filter(x => x.admin_odoo_id === localStorage.getItem("odoo_id"))})
              }
              else{
                this.setState({[item]:rr})
              }
            });
          this.getTableChanges('test',db_name,'table("'+item+'")',item);

        });

        if (this.props.location.pathname === '/home/cadeau_Entx') {
          console.log("gift")
          this.setState({
            showContainerSection: 'Societe',
            focusedItem: 'Societe',
            selectedSocietyMenuItem: ['cadeau_Entx'],
            openSocietyMenuItem: true,
            firstLoading: false,
            loading: false
          });
        }
        else if(this.props.location.pathname === "/home/qualified_signature/new"){
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
            //selectedRoom: this.state.rooms.length > 0 ? this.state.rooms[0] : '',
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
            //selectedRoom: this.state.rooms.length > 0 ? this.state.rooms[0] : '',
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
            //selectedRoom: this.state.rooms.length > 0 ? this.state.rooms[0] : '',
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
                      //selectedRoom: this.state.rooms.length > 0 ? this.state.rooms[0] : '',
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
                //selectedRoom: this.state.rooms.length > 0 ? this.state.rooms[0] : '',
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
              this.props.location.pathname.indexOf('/home/clients') === -1 && this.props.location.pathname.indexOf('/home/rooms') === -1){
            console.log('URL ERROR');
            this.props.history.push('/home/drive');
            this.componentDidMount();
          }
        }

      }).catch(err => {console.log(err)})

    }).catch(err => {console.log(err)})
  }

  handleRoomTabsChange = (event, newValue) => {
    this.setState({selectedRoomTab:newValue})
  };

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
      console.log("ERROR READ CHANGES TABLE");
    };
    socket.onclose = ( event => {
      //this.props.history.push('/login');
      this.setState({openSocketChangeModal:true})
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

  onLoadSharedMiniDriveData = ({ key, children }) => {
    console.log(key)
    return new Promise((resolve) => {
      console.log(key)
      if (children) {
        resolve();
        return;
      }
      let origin = this.state.sharedMiniDrive;

      SmartService.getFile(key, localStorage.getItem('token'), localStorage.getItem('usrtoken')).then(Res => {
        if(Res.succes === true && Res.status === 200){

          let sub_folders = (Res.data.Content.folders || []).concat(Res.data.Content.files || []);
          let sub_files = Res.data.Content.files || [];
          let childrens = [];
          for(let i =0 ; i < sub_folders.length ; i++){
            console.log(sub_folders[i])
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
              proprietary:sub_folders[i].proprietary || undefined,
              isLeaf:sub_folders[i].type ? true : false
            };
            childrens.push(treeNode)
          }
          let update = this.updateTreeData(origin, key, childrens, Res.data.Content.files || [] );
          this.setState({sharedMiniDrive:update})
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
    this.setState({ loading: true });
    let drive = this.state.reelFolders

    SmartService.deleteFile(file.key || file.id, localStorage.getItem('token'), localStorage.getItem('usrtoken'))
      .then((deleteRes) => {
        console.log(deleteRes)
        if (deleteRes.succes === true && deleteRes.status === 200) {
          if (file.typeF === 'file' || file.type === 'pdf'){
            let parentNode = main_functions.searchFileParentNodeById((file.key || file.id),drive);
            console.log(parentNode)
            if(parentNode && parentNode.id){
              main_functions.deleteFileFromTree(drive,(file.key || file.id));
              this.setState({
                reelFolders:drive,folders:main_functions.changeStructure(drive),loading:false,
                selectedFolderFiles:main_functions.getFolderFilesById(this.state.selectedFolderId, drive)
              })
            }else{
              let r_files = this.state.rootFiles;
              let find_index = r_files.findIndex(x => (x.id === file.key) || (x.id === file.id));
              r_files.splice(find_index,1);
              this.setState({
                rootFiles:r_files, loading:false
              })
            }
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
            }
            else{
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
            let parentNode = main_functions.searchFolderParentNodeById((file.key || file.id),drive);
            if(parentNode && parentNode.id){
              main_functions.deleteFolderFromTree(drive,(file.key || file.id));
              this.props.history.push('/home/drive/'+parentNode.id);
              this.setState({
                reelFolders:drive,
                folders:main_functions.changeStructure(drive),
                selectedFolder:parentNode,
                selectedFolderId:parentNode.id,
                selectedDriveItem: [parentNode.id],
                selectedFoldername: parentNode.name,
                selectedFolderFolders:main_functions.getFolderFoldersById(parentNode.id, drive),
                selectedFolderFiles:main_functions.getFolderFilesById(parentNode.id, drive),
                breadcrumbs: main_functions.getBreadcumpsPath(parentNode.id, drive),
                loading:false
              })
            }else{
              let newDrive =main_functions.deleteFolderFromTree(drive,(file.key || file.id));
              this.props.history.push('/home/drive');
              this.setState({
                rootFolders:newDrive,
                reelFolders:newDrive,
                folders:main_functions.changeStructure(newDrive),
                selectedFolder:'',
                selectedFolderId:'',
                selectedDriveItem: [],
                expandedDriveItems: [],
                loading:false
              })
            }
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
        this.openSnackbar('error', "Une erreur est survenue !");
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
        this.openSnackbar('error', "Une erreur est survenue !");
      });
  };

  handleChange = (object, name) => event => {
    let obj = this.state[object];
    obj[name] = event.target.value;
    if(name === "adress_fact_country"){
      this.setState({loading:true})
      SmartService.get_odoo_country_states(localStorage.getItem("odoo_id"),parseInt(event.target.value),localStorage.getItem("token"),localStorage.getItem("usrtoken")).then(countryStatesRes => {
        console.log(countryStatesRes)
        if (countryStatesRes.succes === true && countryStatesRes.status === 200) {
          let data = [["",""]]
          this.setState({ [object]: obj,odoo_country_states:data.concat(countryStatesRes.data || []),loading:false})
        }
      }).catch(err => {console.log(err)})
    }else{
      this.setState({
        [object]: obj
      });
    }
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

  beforeUpdateSociety(){
    let odoo_companies = this.state.odoo_companies || [];
    let client_id = this.state.selectedSociete.ID
    let clientFname = this.state.selectedSociete.Nom + ((this.state.selectedSociete.Prenom && this.state.selectedSociete.Prenom !== "") ? (" " + this.state.selectedSociete.Prenom) : "")
    let company_id;
    let findCompany = odoo_companies.find(x => x.client_id === client_id );

    if(findCompany){
      console.log("COMPANY FOUND")
      company_id = findCompany.odoo_company_id;
      this.saveSocietyChanges(company_id)
    }
    else{
      console.log("COMPANY NOT FOUND")
      SmartService.create_company(localStorage.getItem("odoo_id"),localStorage.getItem('token'), localStorage.getItem('usrtoken'), { param: { name: clientFname } }).then(newCompRes => {
        if(newCompRes.succes === true && newCompRes.status === 200){
          company_id = newCompRes.data.id;
          this.verifIsTableExist("odoo_companies").then( v => {
            let newItem = {
              odoo_company_id:company_id,
              client_name:clientFname,
              client_id:client_id,
              client_uid:this.state.selectedSociete.id,
              created_at:moment().format("YYYY-MM-DD HH:mm:ss"),
              odoo_id:localStorage.getItem("odoo_id")
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

  saveSocietyChanges = (odoo_company_id) => {
    this.setState({ loading: true });
    let id = this.state.selectedSociete.id || (this.state.annuaire_clients_mandat.find(x => x.ID === this.state.selectedSociete.ID)).id;
    let clientFname = this.state.selectedSociete.Nom + ((this.state.selectedSociete.Prenom && this.state.selectedSociete.Prenom !== "") ? (" " + this.state.selectedSociete.Prenom) : "")
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
          lang:this.state.selectedSociete.lang_fact || "fr_CH",
          name:(!this.state.selectedSociete.client_fact_name || this.state.selectedSociete.client_fact_name.trim() === "") ? clientFname : this.state.selectedSociete.client_fact_name
        }
      ],
      method:"write"
    }
    SmartService.update_odoo_client(localStorage.getItem("odoo_id"),data,localStorage.getItem('token'), localStorage.getItem('usrtoken')).then(updateRes => {
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

  uploadAvanceFraisFile = (event) => {
    let file = event.target.files[0];
    if(file.type === "application/pdf"){
      this.setState({avance_frais_facture_file:file})
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
        localStorage.clear()
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
          if((room.members || []).filter(x => x.email === localStorage.getItem("email")).length === 0){
            members.push({email:localStorage.getItem("email"),id:main_functions.getContactIdByEmail(this.state.contacts,localStorage.getItem("email"))})
          }
          (room.members || []).map((m,key) => {
            members.push({email:m.email,id:main_functions.getContactIdByEmail(this.state.contacts,m.email)})
          })
          let newRoom={
            uid : addRoomRes.data.id,
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

        } else {
          this.setState({ loading: false });
          this.openSnackbar('error', addRoomRes.error);
        }
      }).catch(err => {
        this.setState({ loading: false });
        this.openSnackbar('error', "Service temporairement indisponible ou en maintenance");
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
                ? this.props.history.push('/home/rooms')
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

  renderClientCases(client_id){
    console.log("ENTRED")
    let cases = [];
    cases.push({value:"",label:""})
    let clientsTempo = this.state.clients_cases || [];
    clientsTempo.map((tmp,key) => {
      (tmp.folders || []).map((f,i) => {
        if(tmp.ID_client === client_id){
          cases.push({
            value:f.folder_id,
            label:f.name
          })
        }
      })
    })

    return(
        cases.map((item,key) => (
            <option key={key} value={item.value}>{item.label}</option>
        ))
    )
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
                            <Tab>Report</Tab>
                            <Tab>Work in progress</Tab>
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
                                                  (this.state.annuaire_clients_mandat || []).map(({ Nom, Prenom, Type, imageUrl, ID }) =>
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
                                                  let findClientFname = (this.state.annuaire_clients_mandat || []).find(x => x.ID === e)
                                                  obj.newTime.client = findClientFname.Nom + ' ' + (findClientFname.Prenom || '');
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
                                             SmartService.generate_facture_odoo(localStorage.getItem("odoo_id"),localStorage.getItem('token'), localStorage.getItem('usrtoken'),
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
                          <TabPanel>
                            <div style={{marginTop:25}}>
                              <div className="row">
                                <div className="col-md-6">
                                  <div>
                                    <h6>Avocat</h6>
                                  </div>
                                  <MuiSelect
                                      labelId="demo-simple-select-label45845"
                                      id="demo-simple-select45845"
                                      style={{ width: 300 }}
                                      onChange={(e) => {
                                        this.setState({wip_selected_contact:e.target.value})
                                      }}
                                      defaultValue={localStorage.getItem("email")}
                                      value={this.state.wip_selected_contact}
                                  >
                                    {this.state.contacts.map((contact, key) => (
                                        <MenuItem
                                            key={key}
                                            value={contact.email}>
                                          <div className="row align-items-center justify-content-center">
                                            <Avatar
                                                alt=""
                                                src={contact.imageUrl} />
                                            <div>{contact.nom + ' ' + contact.prenom}</div>
                                          </div>
                                        </MenuItem>
                                    ))}
                                  </MuiSelect>
                                </div>
                                <div className="col-md-6">
                                  <div>
                                    <h6>Dossier de destination</h6>
                                    <input type="text" readOnly={true}
                                           className="form-control custom-select"
                                           style={{ width: 300,cursor:"pointer" }}
                                           value={this.state.wip_selected_folder.title}
                                           onClick={(e) => {
                                             this.setState({anchorElDrive2:e.currentTarget})
                                           }}
                                    />
                                  </div>
                                </div>
                              </div>
                              <div className="row mt-2">
                                <div className="col-md-6">
                                  <div>
                                    <h6>Client</h6>
                                  </div>
                                  <Dropdown
                                      value={this.state.wip_selected_client}
                                      labeled
                                      placeholder={"Sélectionner..."}
                                      search
                                      selection
                                      clearable={true}
                                      options={
                                        (this.state.annuaire_clients_mandat || []).map(({ Nom, Prenom, Type, imageUrl, ID }) =>
                                            ({
                                              key: ID,
                                              text: Nom + ' ' + (Prenom || ''),
                                              value: ID,
                                              image: {avatar:true,src:imageUrl ? imageUrl : Type === "0" ? entIcon : userAvatar}
                                            }))
                                      }
                                      onChange={ (e,{value}) => {
                                        this.setState({wip_selected_client:value})
                                        console.log(value)

                                        let cases = [];
                                        let clientsTempo = this.state.clients_cases || [];
                                        clientsTempo.map((tmp,key) => {
                                          (tmp.folders || []).map((f,i) => {
                                            if(tmp.ID_client === value){
                                              cases.push({
                                                value:f.folder_id,
                                                label:f.name
                                              })
                                            }
                                          })
                                        })
                                        console.log(cases.length > 0 ? cases[0].value : "")
                                        this.setState({wip_selected_mandat:cases.length > 0 ? cases[0].value : ""})
                                      }}
                                  />
                                </div>
                                <div className="col-md-6">
                                  <h6>Dossier</h6>
                                  <select className="form-control custom-select" style={{width:300}}
                                          onChange={(event) => {
                                            console.log(event.target.value)
                                            this.setState({wip_selected_mandat:event.target.value})
                                          }}
                                          value={this.state.wip_selected_mandat}
                                  >
                                    {
                                      this.renderClientCases(this.state.wip_selected_client)
                                    }


                                  </select>
                                </div>
                              </div>
                              <div align="center" className="mt-4">
                                <AtlButton
                                    isDisabled={this.state.wip_selected_contact === ""}
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
                            <TableTimeSheetsNonFact
                                lignesFactures={this.state.time_sheets || []}
                                OA_contacts={this.state.contacts}
                                annuaire_clients_mandat={this.state.annuaire_clients_mandat || []}
                                client_folders={this.state.client_folders}
                                openSnackbar={(type,msg) => this.openSnackbar(type,msg)}
                                clientsTempo={this.state.clients_cases}
                                factures={this.state.factures || []}
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
      SmartService.create_company(localStorage.getItem("odoo_id"),localStorage.getItem('token'), localStorage.getItem('usrtoken'), { param: { name: clientFname } }).then(newCompRes => {
        if(newCompRes.succes === true && newCompRes.status === 200){
          facture_company_id = newCompRes.data.id;
          this.verifIsTableExist("odoo_companies").then( v => {
            let newItem = {
              odoo_company_id:facture_company_id,
              client_name:clientFname,
              client_id:client_id,
              created_at:moment().format("YYYY-MM-DD HH:mm:ss"),
              odoo_id:localStorage.getItem("odoo_id")
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
      SmartService.create_facture_odoo(localStorage.getItem("odoo_id"),localStorage.getItem('token'), localStorage.getItem('usrtoken'), { data: odoo_data }).then(createFactRes => {
        console.log(createFactRes)
        if (createFactRes.succes === true && createFactRes.status === 200) {
          SmartService.validate_facture_odoo(localStorage.getItem("odoo_id"),localStorage.getItem('token'), localStorage.getItem('usrtoken'),
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

              SmartService.generate_facture_odoo(localStorage.getItem("odoo_id"),localStorage.getItem('token'), localStorage.getItem('usrtoken'),createFactRes.data.id,acces_token).then(genFactRes => {
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
      SmartService.create_company(localStorage.getItem("odoo_id"),localStorage.getItem('token'), localStorage.getItem('usrtoken'), { param: { name: clientFname } }).then(newCompRes => {
        if(newCompRes.succes === true && newCompRes.status === 200){
          facture_company_id = newCompRes.data.id;
          this.verifIsTableExist("odoo_companies").then( v => {
            let newItem = {
              odoo_company_id:facture_company_id,
              client_name:clientFname,
              client_id:client_id,
              created_at:moment().format("YYYY-MM-DD HH:mm:ss"),
              odoo_id:localStorage.getItem("odoo_id")
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

                      SmartService.create_facture_odoo(localStorage.getItem("odoo_id"),localStorage.getItem('token'), localStorage.getItem('usrtoken'), { data: odoo_data }).then(createFactRes => {
                        console.log(createFactRes)
                        if (createFactRes.succes === true && createFactRes.status === 200) {
                          SmartService.validate_facture_odoo(localStorage.getItem("odoo_id"),localStorage.getItem('token'), localStorage.getItem('usrtoken'),
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

  reportContact(){
    this.setState({loading:true})
    let time_sheets = (this.state.time_sheets || []).filter(x => x.newTime.utilisateurOA === this.state.wip_selected_contact);
    let contact = main_functions.getOAContactByEmail2(this.state.contacts || [],this.state.wip_selected_contact)
    if(this.state.wip_selected_client !== ""){
      time_sheets = (time_sheets || []).filter(x => x.newTime.client_id === this.state.wip_selected_client)
      if(this.state.wip_selected_mandat !== ""){
        time_sheets = time_sheets.filter(x => x.newTime.dossier_client.folder_id === this.state.wip_selected_mandat)
      }
    }
    let toSend = {
      avocat:contact,
      data:time_sheets
    }
    console.log(JSON.stringify(toSend))
    SmartService.reportContact({data:toSend},localStorage.getItem("token"),localStorage.getItem("usrtoken")).then( reportRes => {
      console.log(reportRes)
      if(reportRes.succes === true && reportRes.status === 200){
        this.setState({loading:false})
        let rapportName = "Rapport_"+ main_functions.getContactFnameByEmail(this.state.contacts,contact.email)
        this.showDocInPdfModal(reportRes.data.data,rapportName ,"pdf")

        if(this.state.wip_selected_folder !== ""){
          SmartService.addFileFromBas64({b64file:reportRes.data.data,folder_id:this.state.wip_selected_folder.key},
              localStorage.getItem("token"),localStorage.getItem("usrtoken")).then( addFileRes => {
            if (addFileRes.succes === true && addFileRes.status === 200) {
              SmartService.updateFileName({name: rapportName},
                  addFileRes.data.file_id, localStorage.getItem("token"), localStorage.getItem("usrtoken")).then(updateNameRes => {
                if (updateNameRes.succes === true && updateNameRes.status === 200) {
                  let drive = this.state.reelFolders;
                  let file = {id:addFileRes.data.file_id,name:rapportName,type:"pdf",date:new Date().getTime().toString()}
                  main_functions.insertNodeIntoTree(drive,this.state.wip_selected_folder.key ,file);
                  this.setState({reelFolders:drive,folders:main_functions.changeStructure(drive),
                    miniDrive:main_functions.changeStructureWithFiles(drive),
                    wip_selected_client:"",wip_selected_mandat:"",wip_selected_folder:""})
                } else {
                }
              }).catch(err => {
                console.log(err)
              })
            } else {

            }
          }).catch(err => {console.log(err)})
        }else{
          this.setState({wip_selected_client:"",wip_selected_mandat:""})
        }
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
        client_folder:client_folder,
        odoo_id:localStorage.getItem("odoo_id")
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

      SmartService.create_company(localStorage.getItem("odoo_id"),localStorage.getItem('token'), localStorage.getItem('usrtoken'), { param: { name: facture.client } }).then(newCompRes => {
        if(newCompRes.succes === true && newCompRes.status === 200){
          facture_company_id = newCompRes.data.id;
          this.verifIsTableExist("odoo_companies").then( v => {
            let newItem = {
              odoo_company_id:facture_company_id,
              client_name:facture.client,
              client_id:facture.client_id,
              created_at:moment().format("YYYY-MM-DD HH:mm:ss"),
              odoo_id:localStorage.getItem("odoo_id")
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
      SmartService.create_company(localStorage.getItem("odoo_id"),localStorage.getItem('token'), localStorage.getItem('usrtoken'), { param: { name: facture.client } }).then(newCompRes => {
        if(newCompRes.succes === true && newCompRes.status === 200){
          facture_company_id = newCompRes.data.id;
          this.verifIsTableExist("odoo_companies").then( v => {
            let newItem = {
              odoo_company_id:facture_company_id,
              client_name:facture.client,
              client_id:facture.client_id,
              created_at:moment().format("YYYY-MM-DD HH:mm:ss"),
              odoo_id:localStorage.getItem("odoo_id")
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
      "move_name":false,  // available only in odoo account.invoice => odoo 12
      "user_id": localStorage.getItem("odoo_id") === "9035ce2a-a7a2-11eb-bcbc-0242ac130002" ? 8 :6,
      /*"team_id":1,*/ // available only in odoo account.invoice => odoo 12
      /*"comment":false,*/  // available only in odoo account.invoice => odoo 12
      /*'l10n_ch_isr_sent': false,*/ // available only in odoo account.invoice => odoo 12
      'name': false,   //on peut mettre une petite desc sous le titre de la facture avec ce champs
      'date_invoice': moment(facture_date).format('YYYY-MM-DD'),  //available only in odoo account.invoice => odoo 12
      'invoice_date': moment(facture_date).format('YYYY-MM-DD'),
      'date': moment(facture_date).format('YYYY-MM-DD'),
      'date_due': moment(deadline_date).format('YYYY-MM-DD'),
      'journal_id': 1,
      'currency_id': 5,
      /*'invoice_user_id': 3,*/
      'invoice_user_id': 2,
      'invoice_incoterm_id': false,
      /*'invoice_payment_state': 'not_paid',*/
      /*'invoice_filter_type_domain': 'sale',*/
      /*'company_currency_id': 5,
      'commercial_partner_id': '',
      'invoice_has_outstanding': false,*/
      /*'l10n_ch_currency_name': 'CHF',
      'invoice_sequence_number_next_prefix': false,
      'invoice_sequence_number_next': false,
      'invoice_has_matching_suspense_amount': false,
      'has_reconciled_entries': false,
      'restrict_mode_hash_table': false,*/
      'partner_id': facture_company_id,
      /*'invoice_vendor_bill_id': false,
      'invoice_payment_term_id': 1,*/
      'invoice_date_due': moment(deadline_date).format('YYYY-MM-DD'),
      /*'company_id': 1,*/
      /*'amount_untaxed': 0,
      'amount_by_group': [],
      'amount_total': 0,
      'invoice_payments_widget': 'False',
      'amount_residual': 0,
      'invoice_outstanding_credits_debits_widget': false,*/
      'invoice_origin': false,
      /*'invoice_cash_rounding_id': false,*/
      'invoice_source_email': false,
      /*'invoice_payment_ref': false,
      'reversed_entry_id': false,
      'message_follower_ids': [],
      'activity_ids': [],
      'message_ids': [],*/
      'message_attachment_count': 0,
      'invoice_line_ids': [],
      /*"account_id": 6,*/
      "reference": facture.client_folder.name,
      "fiscal_position_id": false,
      /*"origin": false,
      "reference_type":"none",*/
      "incoterm_id":false,
      "sequence_number_next":false,
      "partner_shipping_id":facture_company_id,
      "payment_term_id":paymTerm,
      /*"invoice_payment_term_id":paymTerm,*/
      "partner_bank_id":compte_banc,
      'bank_partner_id': compte_banc,
      'invoice_partner_bank_id': compte_banc,
      /*"partner_bank_id":4,
      'bank_partner_id': 4,
      'invoice_partner_bank_id': 4,*/
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

      SmartService.details_facture_odoo(facture.odoo_id,localStorage.getItem('token'), localStorage.getItem('usrtoken'),facture.facture_odoo_id).then( detailsRes => {
        console.log(detailsRes)
        if(detailsRes.succes === true && detailsRes.status === 200){
          console.log(detailsRes.data[0])
          let invoice_line_ids = detailsRes.data[0].invoice_line_ids || [];
          console.log(invoice_line_ids)
          invoice_line_ids.map( id => {
            odoo_data[0].invoice_line_ids.push([2,id,{}])
          })

          SmartService.update_facture_odoo(facture.odoo_id,localStorage.getItem('token'), localStorage.getItem('usrtoken'),
              { data: [[facture.facture_odoo_id],odoo_data[0]],method:"write" }).then( updateFacRes => {
            if(updateFacRes.succes === true && updateFacRes.status === 200){

              SmartService.generate_facture_odoo(facture.odoo_id,localStorage.getItem('token'), localStorage.getItem('usrtoken'),facture.facture_odoo_id,facture.facture_acces_token).then(genFactRes => {

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

      SmartService.create_facture_odoo(facture.odoo_id,localStorage.getItem('token'), localStorage.getItem('usrtoken'), { data: odoo_data }).then(createFactRes => {
        console.log(facture.odoo_id)
        console.log(createFactRes)
        if (createFactRes.succes === true && createFactRes.status === 200) {

          SmartService.generate_facture_odoo(facture.odoo_id,localStorage.getItem('token'), localStorage.getItem('usrtoken'),createFactRes.data.id,acces_token).then(genFactRes => {
            console.log(genFactRes)
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
      "account_id": 6,
      "reference": facture.client_folder.name,
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

      SmartService.details_facture_odoo(facture.odoo_id,localStorage.getItem('token'), localStorage.getItem('usrtoken'),facture.facture_odoo_id).then( detailsRes => {
        if (detailsRes.succes === true && detailsRes.status === 200) {
          console.log(detailsRes.data[0])
          let invoice_line_ids = detailsRes.data[0].invoice_line_ids || [];
          console.log(invoice_line_ids)
          invoice_line_ids.map(id => {
            odoo_data[0].invoice_line_ids.push([2, id, {}])
          })

          SmartService.update_facture_odoo(facture.odoo_id,localStorage.getItem('token'), localStorage.getItem('usrtoken'),
              {data: [[facture.facture_odoo_id], odoo_data[0]], method: "write"}).then(updateFacRes => {
            if (updateFacRes.succes === true && updateFacRes.status === 200) {

              SmartService.validate_facture_odoo(facture.odoo_id,localStorage.getItem('token'), localStorage.getItem('usrtoken'),
                  { data: [[facture.facture_odoo_id],{journal_type: "sale",lang: "fr_CH",type: "out_invoice",tz: false,uid: 8}] }).then(validateRes => {
                console.log(validateRes)
                if(validateRes.succes === true && validateRes.status === 200){

                  SmartService.generate_facture_odoo(facture.odoo_id,localStorage.getItem('token'), localStorage.getItem('usrtoken'),facture.facture_odoo_id,facture.facture_acces_token).then(genFactRes => {

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
      SmartService.create_facture_odoo(facture.odoo_id,localStorage.getItem('token'), localStorage.getItem('usrtoken'), { data: odoo_data }).then(createFactRes => {
        console.log(createFactRes)
        if(createFactRes.succes === true && createFactRes.status === 200){

          SmartService.validate_facture_odoo(facture.odoo_id,localStorage.getItem('token'), localStorage.getItem('usrtoken'),
              { data: [[createFactRes.data.id],{journal_type: "sale",lang: "fr_CH",type: "out_invoice",tz: false,uid: 8}] }).then(validateRes => {
            console.log(validateRes)
            if(validateRes.succes === true && validateRes.status === 200){

              SmartService.generate_facture_odoo(facture.odoo_id,localStorage.getItem('token'), localStorage.getItem('usrtoken'),createFactRes.data.id,acces_token).then(genFactRes => {

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

    if(localStorage.getItem("client_folder_id") || localStorage.getItem("client_shared_folder_id"))
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

            if (addFolderClient.succes === true && addFolderClient.status === 200) {
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
            }
            else if(addFolderClient.succes === false && addFolderClient.status === 400){
              this.setState({ loading: false });
              localStorage.clear();
              this.props.history.push('/login');
            }
            else{
              this.setState({ loading: false });
              console.log(addFolderClient.error)
              this.openSnackbar("error",addFolderClient.error)
            }



          }).catch(err => {console.log(err)})

        }

        else{

          SmartService.addFolder({
            name: this.state.selectedSociete.Nom + ' ' + (this.state.selectedSociete.Prenom || ''),
            folder_id: CLIENTS_folder_id
          }, localStorage.getItem('token'), localStorage.getItem('usrtoken')).then(addParentClientFolderRes => {

            if (addParentClientFolderRes.succes === true && addParentClientFolderRes.status === 200) {

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

            }
            else if(addParentClientFolderRes.succes === false && addParentClientFolderRes.status === 400){
              this.setState({ loading: false });
              localStorage.clear();
              this.props.history.push('/login');
            }
            else{
              this.setState({ loading: false });
              console.log(addParentClientFolderRes.error)
              this.openSnackbar("error",addParentClientFolderRes.error)
            }

          }).catch(err => console.log(err))

        }
      }

      else {

        this.verifIsTableExist("clients_cases").then( v => {

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

                  let find_odoo_companie = (this.state.odoo_companies || []).find(x => x.client_id === ID || x.client_uid === ID )

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
                      ],
                      admin_odoo_id:localStorage.getItem("odoo_id")
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

                  }else{

                    let findClient = (this.state.annuaire_clients_mandat || []).find(x => x.ID === ID || x.id === ID)

                    SmartService.create_company(localStorage.getItem("odoo_id"),localStorage.getItem("token"),localStorage.getItem("usrtoken"),
                        { param: {
                          name: findClient.Type === "0" ? findClient.Nom : (findClient.Nom + " " + findClient.Prenom),
                          phone:findClient.phone || false,
                          email:findClient.email || false,
                        }}).then( createRes => {

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
                        ],
                        admin_odoo_id:localStorage.getItem("odoo_id")
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

                          console.log(createRes)
                      if (createRes.succes === true && createRes.status === 200) {

                      }else{
                        console.log(createRes.error)
                      }


                    }).catch(err => {
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
      newClient.admin_odoo_id = localStorage.getItem("odoo_id");

      rethink.insert("test",'table("annuaire_clients_mandat").insert('+ JSON.stringify(newClient) + ')',db_name,false).then( resAdd => {
        if (resAdd && resAdd === true) {
          this.openSnackbar('success', newClient.Nom + ' est ajouté avec succès ');
          setTimeout(() => {
            let findNew = (this.state.annuaire_clients_mandat || []).find(x => x.ID === newClient.ID )
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
      newContact.odoo_id = "796dc0ed-8b4a-40fd-aeff-7ce26ee1bcf9"

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

  verifConnexionState = () => {
    return  new Promise((resolve, reject) => {
      fetch('https://www.google.com/', { // Check for internet connectivity
        mode: 'no-cors',
      }).then(() => {
        resolve(true)
      }).catch(() => {
        console.log('INTERNET CONNECTIVITY ISSUE');
        this.openSnackbar("error","Vous êtes hors-ligne ! Veuillez vérifier votre connexion internet ")
        resolve(false)
      })
    })

  }

  async createLignefacture(duplicate){
    let connex_state = await this.verifConnexionState();
    console.log(connex_state)
    if(connex_state === true){
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

  delete_contact(id){
    this.setState({loading:true})
    rethink.remove("test",'table("contacts").get('+JSON.stringify(id)+').delete()',db_name,false).then(delRes => {
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

  update_client_case(id,data,mandatNameChanged,mandat){
    if(mandatNameChanged === true){
      this.setState({loading:true})
      SmartService.updateFileName({ name: mandat.name }, mandat.folder_id , localStorage.getItem('token'), localStorage.getItem('usrtoken')).then((updateNameRes) => {
            if (updateNameRes.succes === true && updateNameRes.status === 200) {
              this.justReloadGed()
              rethink.update("test",'table("clients_cases").get('+JSON.stringify(id)+').update('+ JSON.stringify(data) + ')',db_name,false).then( updateRes => {
                if (updateRes && updateRes === true) {
                  this.setState({loading:false})
                  this.openSnackbar("success","Modification effectuée avec succès")
                } else {
                  this.setState({loading:false})
                  this.openSnackbar("error","Une erreur est survenue !")
                }
              }).catch(err => {
                this.setState({loading:false})
                this.openSnackbar("error","Une erreur est survenue !")
              })

            }else{
              console.log(updateNameRes.error)
              this.setState({loading:false})
              this.openSnackbar("error",updateNameRes.error)
            }
          }).catch(err => {
        this.setState({loading:false})
        console.log(err)
        this.openSnackbar("error","Une erreur est survenue !")
      })
    }else{
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

  onSelectDrivePopUp4 = (selectedKeys, info) => {
    this.setState({selectedDrivePopUpKeys:selectedKeys,selectedSharedPopUpKeys:[],signFile_Ged:info.node.typeF === "folder" ? "" : info.node})
  }

  updateUserInfo(fname,lname,phone){
    this.setState({loading:true,openUserDetailModal:false})
    SmartService.updateUserInfo({firstname:fname,lastname:lname,phone:phone},localStorage.getItem("token"),localStorage.getItem("usrtoken")).then( updateRes => {
      if (updateRes.succes === true && updateRes.status === 200) {
        localStorage.setItem("phone", phone)
        localStorage.setItem("firstname", fname)
        localStorage.setItem("lastname", lname)
        this.setState({loading:false})
        this.openSnackbar("success","Modification effectuée avec succès")
      }else{
        this.setState({loading:false,userLname:localStorage.getItem("lastname") || "",
          userFname:localStorage.getItem("firstname") || "",userPhone:localStorage.getItem("phone") || ""})
        this.openSnackbar("error",updateRes.error)
        console.log(updateRes.error)
      }
    }).catch(err => {
      this.setState({loading:false,userLname:localStorage.getItem("lastname") || "",
        userFname:localStorage.getItem("firstname") || "",userPhone:localStorage.getItem("phone") || ""})
      this.openSnackbar("error","Une erreur est survenue !")
      console.log(err)
    })
  }


  async SEQ_file(){
    if(localStorage.getItem("phone") === undefined || localStorage.getItem("phone") === null || localStorage.getItem("phone") === "" ){
      this.openSnackbar("warning","Vous devez ajouter votre numéro de téléphone pour signer !")
      setTimeout(() => {
        this.setState({openUserDetailModal:true})
      },500)
    }else{
      if(localStorage.getItem("phone").startsWith("+41") === false){
        this.openSnackbar("warning","Il faut avoir un numéro Suisse pour signer le document")
        setTimeout(() => {
          this.setState({openUserDetailModal:true})
        },500)

      }else{
        this.setState({loading:true})
        let b64 = "";
        let fileName = this.state.SEQ_file !== "" ? this.state.SEQ_file.name.slice(0, -4) : this.state.signFile_Ged.title.slice(0,-4);
        if(this.state.SEQ_file !== ""){
          b64 = await main_functions.toBase64(this.state.SEQ_file)
        }
        if(this.state.signFile_Ged !== ""){
          b64 = await this.getB64GedFile(this.state.signFile_Ged.key)
        }

        SmartService.signQualifiedDoc({
          b64file:b64,
          name:fileName,
          phone:localStorage.getItem("phone")
        },localStorage.getItem("token"),localStorage.getItem("usrtoken")).then( signRes => {
          console.log(signRes)
          if (signRes.err !== null && signRes.data) {

            SmartService.addFileFromBas64({b64file:signRes.data,folder_id:this.state.signFile_destinationFolder.key},
                localStorage.getItem("token"),localStorage.getItem("usrtoken")).then( addFileRes => {

              if(addFileRes.succes === true && addFileRes.status === 200) {

                SmartService.updateFileName({name:fileName},
                    addFileRes.data.file_id,localStorage.getItem("token"),localStorage.getItem("usrtoken")).then( updateNameRes => {
                  if(updateNameRes.succes === true && updateNameRes.status === 200){
                    this.justReloadGed()
                    setTimeout(() => {
                      this.setState({loading:false})
                      this.openSnackbar("success","La signature électronique est bien effectué avec succès")
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

          }else{
            console.log(signRes.error)
            this.openSnackbar("error","Annulation ou une erreur est servenue !")
            this.setState({loading:false})
          }
        }).catch(err => {
          console.log(err)
          this.openSnackbar("error","Une erreur est servenue !")
          this.setState({loading:false})
        })
      }
    }
  }

   getB64GedFile = id => new Promise((resolve, reject) => {
     SmartService.getFile(id, localStorage.getItem('token'), localStorage.getItem('usrtoken')).then(fileRes => {
       if (fileRes.succes === true && fileRes.status === 200) {
         resolve(fileRes.data.Content.Data)
       }else{
         reject(fileRes.error)
       }
     }).catch(err => {
       console.log(err)
       reject(err)
     })
  });

   onExpand_shared = (expandedKeys) => {
     this.setState({expandedSharedPopUpKeys:expandedKeys,autoExpandSharedPopUpParent:false,selectedDrivePopUpKeys:[]})
  }

   onSelect_shared = (selectedKeys, info) => {
     console.log(info.node)
     this.setState({selectedSharedPopUpKeys:selectedKeys,selectedDrivePopUpKeys:[],signFile_Ged:info.node.key === "parent" ? "" : info.node.typeF === "folder" ? "" : info.node})
  }

  addNewGedFolder(){
     this.setState({loading:true})
    SmartService.addFolder(
        {name: this.state.newFolderName, folder_id: this.state.selectedFolderId === '' ? null : this.state.selectedFolderId},
        localStorage.getItem('token'), localStorage.getItem('usrtoken')
    )
        .then((addfolderRes) => {
          console.log(this.state.reelFolders)
          console.log(addfolderRes)
          if (addfolderRes.succes === true && addfolderRes.status === 200) {

            let drive = this.state.reelFolders;
            let newNode = {
              id:addfolderRes.data.id,
              name:this.state.newFolderName,
              Content:{
                folders:[],
                files:[]
              }
            }
            if(this.state.selectedFolderId === ''){
              //Racine
              drive.push(newNode)
              this.setState({reelFolders:drive,folders:main_functions.changeStructure(drive),loading:false})
            }else{
              main_functions.insertNodeIntoTree(drive,this.state.selectedFolderId ,newNode);
              this.setState({
                reelFolders:drive,folders:main_functions.changeStructure(drive),loading:false
              })
            }
            this.openSnackbar("success","Nouveau dossier ajouté avec succès")
            setTimeout(() => {
              this.setState({
                newFolderModal: false,
                newFolderFromRacine: false
              });
            }, 100);
          } else {
            this.openSnackbar("error",addfolderRes.error)
            console.log(addfolderRes.error);
          }
        })
        .catch((err) => {
          console.log(err);
        });
  }

  addNewGedFiles(acceptedFiles){
    let calls = [];
    for (let i = 0; i < acceptedFiles.length; i++) {
      if(acceptedFiles[i].type === "application/pdf"){
        let formData = new FormData();
        formData.append('file', acceptedFiles[i]);
        this.state.selectedFolderId !== '' &&
        formData.append('folder_id', this.state.selectedFolderId);
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
            }).then( res => {
              return {id:res.data.data.file_id,name:acceptedFiles[i].name.replace(".pdf",""),type:"pdf",date:new Date().getTime().toString()}
            })
        );
      }
    }
    Promise.all(calls).then( response => {
      let drive = this.state.reelFolders;
      let rootFiles = this.state.rootFiles;
      response.map( resp => {
        if(this.state.selectedFolderId === ''){
          rootFiles.push(resp);
        }else{
          main_functions.insertNodeIntoTree(drive,this.state.selectedFolderId ,resp);
        }
      })
      this.setState({
        reelFolders:drive,folders:main_functions.changeStructure(drive),
        rootFiles: rootFiles,
        loading:true,
        openNewDocModal: false,
        newFileFromRacine: false,
        showNewDocScreen: false,
        progressUpload: undefined
      })
      setTimeout(() => {
        this.setState({loading:false})
        this.openSnackbar('success', calls.length === 1 ? calls.length + ' fichier est ajouté avec succès' : calls.length +" fichiers sont ajoutés avec succès");
      },500)

      //this.reloadGed();
    }).catch(err => {
      console.log(err);
    });
  }

  render() {

    const current_user_contact = main_functions.getOAContactByEmail2(this.state.contacts,localStorage.getItem("email"))

    const openDrivePopup = Boolean(this.state.anchorElDrive);
    const id = openDrivePopup ? 'drive-popover' : undefined;

    const openRoomColorPicker = Boolean(this.state.anchorEl_colorPicker);
    const id2 = openRoomColorPicker ? 'color-picker-popover' : undefined;

    const openDrivePopup3 = Boolean(this.state.anchorElDrive3);
    const id3 = openDrivePopup3 ? 'drive-popover3' : undefined;

    const openDrivePopup4 = Boolean(this.state.anchorElDrive4);
    const id4 = openDrivePopup3 ? 'drive-popover4' : undefined;


    const openRoomSetting = Boolean(this.state.settRoomAnchorEl);
    const id_settRoom = openRoomSetting ? 'setting-room-popover' : undefined;


    return (
      <div>

        <div>
            <TopBar
              logo={logo}
              height={70}
              onClickMenuIcon={() => this.setState({ openSideMenu: true })}
              openUserDetailModal={() => {
                this.setState({openUserDetailModal:true})
              }}
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
        <div style={{ marginRight: 20, marginTop: 75, marginLeft: 5, top:0,width:"100%",position:"fixed",height: "100%" }}>


          <div style={{height: "100%"}}>

            <div style={{ display: 'flex',height: "100%"}}>
              <div style={{
                  height: "90%",
                  overflow: 'auto',
                  minHeight: 650,
                  width: 300,
                  minWidth: 300
                }}
              >
                {
                  this.renderLeftMenu()
                }

              </div>

              <div style={{ flexWrap: 'wrap', flex: '1 1 auto',overflow:"auto",height:"90%" }}>
                <div className="card">
                  <div className="card-body" style={{ minHeight: 750,height:"100%"}}>

                    <Switch>

                      <Route exact path="/home/drive">
                        {
                          this.state.loading === false && this.state.firstLoading === false &&
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
                        }
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

                      </Route>

                      <Route exact path="/home/rooms/:room_id">
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
                                  //changeStructureannuaire_clients={this.state.patients}
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
                                  miniDrive={this.state.miniDrive}
                                  openPdfModal={(id) => {this.openPdfModal(id)}}
                                  openB64PdfModal={(b64,name) => {this.showDocInPdfModal(b64,name,"pdf")}}
                                  openSnackbar={(type,msg) => {this.openSnackbar(type,msg)}}
                                  sharedMiniDrive={this.state.sharedMiniDrive}
                                  onLoadSharedMiniDriveData={this.onLoadSharedMiniDriveData}
                              />
                        }
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
                                  removeContact={(id) => {
                                    this.delete_contact(id)
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
                          !this.state.annuaire_clients_mandat || !this.state.odoo_companies ?
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
                                    console.log(societe)
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
                                      <h4 className="mb-2">{this.state.selectedSociete.Nom + ' ' + (this.state.selectedSociete.Prenom || '')}</h4>

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


                                      <div style={{ marginTop: 20 }}
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
                                                    <IconButton size="small" style={{ marginTop: -5, marginLeft: 6,alignSelf:"center" }}
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
                                                          marginTop: 10
                                                        }}>
                                                          <div style={{alignSelf:"center"}}>
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
                                                          <div style={{alignSelf:"center",marginTop: this.state.newClientFolder.team[key].uid !== '' ? 14 : -5 }}>
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
                                                    <IconButton size="small" style={{ marginTop: -5, marginLeft: 3,alignSelf:"center" }}
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
                                                          <div style={{alignSelf:"center"}}>
                                                            <div >
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
                                                          <div style={{ marginTop: this.state.newClientFolder.team[key].uid !== '' ? 14 : -5,alignSelf:"center" }}>
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
                                              <div className="row mt-2">
                                                <div className="col-md-6">
                                                  <div>Fréquence</div>
                                                  <select
                                                      className="form-control custom-select"
                                                      value={this.state.newClientFolder.frequence}
                                                      onChange={(e) => {
                                                        let obj = this.state.newClientFolder;
                                                        obj.frequence = e.target.value
                                                        this.setState({newClientFolder:obj})
                                                      }}
                                                  >
                                                    <option value="Mensuelle">Mensuelle</option>
                                                    <option value="Trimestrielle">Trimestrielle</option>
                                                    <option value="Semestrielle">Semestrielle</option>
                                                    <option value="Annuelle">Annuelle</option>

                                                  </select>
                                                </div>
                                                <div className="col-md-6">
                                                  <div>Langue de Facturation</div>
                                                  <select
                                                      className="form-control custom-select"
                                                      value={this.state.newClientFolder.language}
                                                      onChange={(e) => {
                                                        let obj = this.state.newClientFolder;
                                                        obj.language = e.target.value
                                                        this.setState({newClientFolder:obj})
                                                      }}
                                                  >
                                                    <option value="Francais">Français</option>
                                                    <option value="Anglais">Anglais</option>
                                                  </select>
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
                                                    if(!this.state.selectedSociete.adress || this.state.selectedSociete.adress.trim() === "" ){
                                                      this.openSnackbar("error","Vous devez ajouter l'adresse postale du client avant la création de dossier !")
                                                    }else if(!this.state.selectedSociete.email){
                                                      this.openSnackbar("error","Vous devez ajouter l'adresse mail du client avant la création de dossier !")
                                                    }else if(verifForms.verif_Email(this.state.selectedSociete.email)){
                                                      this.openSnackbar("error","L'adresse mail du client est invalide !")
                                                    }else{
                                                      this.generateClientFolder(this.state.selectedSociete.ID, objCp.team);
                                                    }
                                                  }}
                                                  className="btn btn-blue waves-effect mb-2 waves-light m-1 mt-4">
                                                <i className="fe-folder-plus" />&nbsp;&nbsp;Créer dossier client
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
                                                     update_client_case={(id,data,mandatNameChanged,mandat) => {
                                                       this.update_client_case(id,data,mandatNameChanged,mandat)
                                                     }}
                                                     reloadGed={() => this.justReloadGed()}
                                                     openSnackbar={(type,msg) => this.openSnackbar(type,msg)}
                                                     folders={this.state.folders || []}
                                                     rooms={this.state.rooms || []}
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
                                            (this.state.annuaire_clients_mandat || []).map(({ Nom, Prenom, Type, imageUrl, id }) =>
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

                                            let findClient = (this.state.annuaire_clients_mandat || []).find(x => x.id === e)
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
                          <h5>Signature électronique qualifiée</h5>
                          <div style={{marginLeft:15}}>
                            <div align="left" style={{marginTop:30}}>
                              <img alt="sign" src={qualifSignImage} style={{maxWidth:300,border:"2px solid #f0f0f0"}} />
                            </div>
                            <div style={{marginTop:20}}>
                              <div className="row mt-1">
                                <div className="col-md-6">
                                  <div>
                                    <h5>Choisissez un document à signer</h5>
                                    <div style={{marginTop:20}} className="row">
                                      <div className="col-md-12">
                                        <FormControlLabel style={{fontSize:"0.8rem",color:"#000"}}
                                            control={
                                              <MuiCheckbox size="small"
                                                  checked={this.state.signFile_type}
                                                  onChange={() =>
                                                      this.setState({
                                                        signFile_type: !this.state.signFile_type,
                                                        signFile_Ged:'',
                                                        SEQ_file:''
                                                      })
                                                  }
                                                  name="checkedNewRoom1"
                                                           disabled={true}
                                              />
                                            }
                                            label="Document de la ged"
                                        />
                                      </div>
                                      <div className="col-md-12">
                                        <FormControlLabel style={{fontSize:"0.8rem",color:"#000"}}
                                            control={
                                              <MuiCheckbox
                                                  size="small"
                                                  checked={!this.state.signFile_type}
                                                  onChange={() =>
                                                      this.setState({
                                                        signFile_type: !this.state.signFile_type,
                                                        signFile_Ged:'',
                                                        SEQ_file:''
                                                      })
                                                  }
                                                  name="checkedNewRoom2"
                                              />
                                            }
                                            label="Document externe"
                                        />
                                      </div>
                                    </div>
                                    <div style={{display:"flex"}}>
                                      <IconButton color="primary"
                                                  onClick={(e) => {
                                                    if(this.state.signFile_type === true){
                                                      this.setState({anchorElDrive4:e.currentTarget})
                                                    }else{
                                                      this.signatureFileUpload.click()
                                                    }
                                                  }}
                                      >
                                        <AttachFileIcon/>
                                      </IconButton>
                                      <h6 style={{marginLeft:5,marginTop:17}}>{this.state.SEQ_file ? this.state.SEQ_file.name : this.state.signFile_Ged !== "" ? this.state.signFile_Ged.title : ""}</h6>
                                      <Popover
                                          id={id4}
                                          open={openDrivePopup4}
                                          anchorEl={this.state.anchorElDrive4}
                                          onClose={() => {
                                            this.setState({anchorElDrive4: null})
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
                                              this.setState({anchorElDrive4:null,expandedDrivePopUpKeys:[],selectedDrivePopUpKeys:[],signFile_Ged:""})
                                            }}
                                            >
                                              <CloseIcon />
                                            </IconButton>
                                          </div>

                                          <h6 style={{color:"darkblue"}}>Veuillez sélectionner un document à signer </h6>
                                          <div style={{marginTop:20,maxHeight:430,overflowY:"auto"}}>
                                            <DirectoryTree
                                                draggable={true}
                                                allowDrop={(options) => {
                                                  return false
                                                }}
                                                showIcon={true}
                                                onExpand={this.onExpandDrivePopUp}
                                                onSelect={this.onSelectDrivePopUp4}
                                                treeData={this.state.miniDrive || []}
                                                expandAction="click"
                                                expandedKeys={this.state.expandedDrivePopUpKeys}
                                                selectedKeys={this.state.selectedDrivePopUpKeys}
                                                autoExpandParent={this.state.autoExpandDrivePopUpParent}
                                            />
                                            <DirectoryTree
                                                loadData={this.onLoadSharedMiniDriveData}
                                                draggable={true}
                                                showIcon={true}
                                                onExpand={this.onExpand_shared}
                                                onSelect={this.onSelect_shared}
                                                treeData={this.state.sharedMiniDrive || []}
                                                expandAction="click"
                                                expandedKeys={this.state.expandedSharedPopUpKeys}
                                                selectedKeys={this.state.selectedSharedPopUpKeys}
                                                autoExpandParent={this.state.autoExpandSharedPopUpParent}
                                            />
                                          </div>
                                          <div style={{position:"absolute",bottom:50}}>
                                            <span style={{color:"#000",fontWeight:"bold"}}>Document sélectionné:&nbsp; <span>{this.state.signFile_Ged.title}</span> </span>
                                          </div>
                                          <div align="right" style={{position:"absolute",bottom:10,right:15}}>
                                            <AtlButton
                                                isDisabled={this.state.signFile_Ged === ""}
                                                appearance="primary"
                                                onClick={() => {
                                                  this.setState({anchorElDrive4:null})
                                                }}
                                            >
                                              Valider
                                            </AtlButton>
                                          </div>
                                        </div>
                                      </Popover>
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
                                    <input type="text" readOnly={true} disabled={this.state.signFile_type === true}
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
                                    isDisabled={this.state.signFile_destinationFolder === "" ||
                                    (this.state.SEQ_file === "" && this.state.signFile_type === false) ||
                                    (this.state.signFile_Ged === "" && this.state.signFile_type === true)}
                                    appearance="primary"
                                    onClick={() => {this.SEQ_file()}}
                                >
                                  Signer le document
                                </AtlButton>
                              </div>
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
                  onClick={() => {this.addNewGedFolder()}}
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
                      contacts={this.state.contacts || []}
                      openContactsMenuOnInputClick={true}

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
                    id={id2}
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
                          this.setState({ NewRoomEmails: data });
                        }}
                        requiredMessage={'Email incorrect'}
                        placeholder="Ajouter des personnes"
                        pattern={data.emailPatern}
                        limit={100}
                        limitMessage="Vous avez atteint le nombre maximal d'e-mails"
                        contacts={this.state.contacts || []}
                        openContactsMenuOnInputClick={true}
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


          <Dialog
              open={this.state.openUserDetailModal}
              onClose={() => {
                this.setState({ openUserDetailModal: !this.state.openUserDetailModal });
              }}
              aria-labelledby="form-dialog-title"
          >
            <DialogTitle disableTypography id="form-dialog-title">
              <Typography variant="h6">Mes informations personnelles</Typography>
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
                      openUserDetailModal: !this.state.openUserDetailModal
                    });
                  }}
              >
                <CloseIcon />
              </IconButton>
            </DialogTitle>
            <DialogContent>
              <div className="row mt-1">
                <div className="col-md-6">
                  <TextField
                      id="room-name"
                      label="Nom"
                      variant="outlined"
                      value={this.state.userFname}
                      onChange={(event) =>
                          this.setState({ userFname: event.target.value })
                      }
                      size="small"
                  />
                </div>
                <div className="col-md-6">
                  <TextField
                      id="room-name"
                      label="Nom"
                      variant="outlined"
                      value={this.state.userLname}
                      onChange={(event) =>
                          this.setState({ userLname: event.target.value })
                      }
                      size="small"
                  />
                </div>
              </div>
              <div className="row mt-3">
                <div className="col-md-12">
                  <TextField
                      id="room-name"
                      label="Email"
                      variant="outlined"
                      value={this.state.userEmail}
                      onChange={(event) =>
                          this.setState({ userEmail: event.target.value })
                      }
                      size="small"
                      aria-readonly="true"
                      inputProps={{readOnly:true}}
                      inputMode="email"
                  />
                </div>
              </div>
              <div className="row mt-3">
                <div className="col-md-12">
                  <TextField
                      id="room-name"
                      label="Téléphone"
                      variant="outlined"
                      value={this.state.userPhone}
                      onChange={(event) =>
                          this.setState({ userPhone: event.target.value })
                      }
                      size="small"
                      inputMode="tel"
                  />
                </div>
              </div>
            </DialogContent>
            <DialogActions style={{ padding: 20,justifyContent:"center" }}>
              <MuiButton
                  onClick={() => {
                    this.setState({ openUserDetailModal: false });
                  }}
                  color="primary"
                  style={{ textTransform: 'capitalize',marginRight:10 }}
              >
                Annuler
              </MuiButton>
              <MuiButton
                  onClick={() => {this.updateUserInfo(this.state.userFname,this.state.userLname,this.state.userPhone)}}
                  color="secondary"
                  variant="contained"
                  style={{ textTransform: 'capitalize',marginLeft:10 }}
              >
                Enregistrer
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
                        this.addNewGedFiles(acceptedFiles)
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

                  let findClientTempo = this.state.clients_tempo.find(x => x.ID_client === client.ID)
                  let findClientFname = (this.state.annuaire_clients_mandat || []).find(x => x.ID === client.ID)
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


          <ModalTransition>
            {this.state.openSocketChangeModal === true && (
                <AltModal
                    actions={[
                        { text: 'Recharger', onClick: () => {
                            fetch('https://www.google.com/', { // Check for internet connectivity
                              mode: 'no-cors',
                            }).then(() => {
                                  console.log('CONNECTED TO INTERNET');
                                  this.rethink_initialise()
                              this.setState({openSocketChangeModal:false})
                                }).catch(() => {
                              console.log('INTERNET CONNECTIVITY ISSUE');
                              this.openSnackbar("error","Vous êtes hors-ligne ! Veuillez vérifier votre connexion internet ")
                            })
                          }}
                        ]}
                    onClose={() => {}}
                    heading="Connexion interrompue !"
                    appearance="warning"
                >
                  Recharger la page à fin d'avoir les dernières opérations effectuées en temps réel
                </AltModal>
            )}
          </ModalTransition>

        </div>
      </div>
    );
  }
}
