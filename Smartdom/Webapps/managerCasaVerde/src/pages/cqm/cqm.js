import React, {Component} from 'react';
import logo from "../../assets/images/logos/beautysane_LOGO_vert.png"
import NlTopbar from "../../components/NlTopbar"
import fille from "../../assets/images/fille.jpg"
import Button from '@material-ui/core/Button';
import bodycheckMinceur from "../../assets/images/BS/bodycheck-minceur.png"
import bodycheckSport from "../../assets/images/BS/bodycheck-sport.png"
import  BSfemale from "../../assets/images/BS/bgquest.jpg"
import {Tabs,TabList,Tab,TabPanel} from "react-tabs";
import 'react-tabs/style/react-tabs.css';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Snackbar from '@material-ui/core/Snackbar';
import Alert from '@material-ui/lab/Alert';

import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import bodycheckEquilibre from "../../assets/images/BS/bodycheck-equilibre.png"
import "./text.css"
import Autocomplete from '@material-ui/lab/Autocomplete';
import TextField from '@material-ui/core/TextField';
import ServerTable from 'react-strap-table';
import styled from 'styled-components';
import Checkbox from '@material-ui/core/Checkbox';

import DataTable,{ defaultThemes ,createTheme}  from 'react-data-table-component';
import CheckoutService from "../../provider/checkoutservice";
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import mailSend from "../../assets/images/icons/mail-send.svg"

import {
    Avatar,
    Button as MuiButton,
    Checkbox as MuiCheckbox,
    Chip,

    Input,

    Select as MuiSelect,

} from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import moment from "moment";
import TableProspects from "../../components/Table/TableProspects";
import loope from "../../assets/images/icons/loupe.svg";
import deleteIcon from "../../assets/images/icons/delete.svg";
import LoginManagerService from "../../provider/loginManager";
import NavBarNlManager from "../../components/NavBar/NavBarNLManager";

const ClearButton = styled(Button)`
  border-top-left-radius: 0;
  border-bottom-left-radius: 0;
  border-top-right-radius: 5px;
  border-bottom-right-radius: 5px;
        columns={columns}
  height: 34px;
  width: 32px;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const FilterComponent = ({ filterText, onFilter, onClear }) => (
    <>
        <TextField id="search" type="text" placeholder="Filter By Name" aria-label="Search Input" value={filterText} onChange={onFilter} />
        <ClearButton type="button" onClick={onClear}>X</ClearButton>
    </>
);
class CQM extends Component {
    constructor(props){
        super(props)
        this.state={
            nav:"",
            factureAchat:true,
            factureBS:false,
            CQuizM:false,
            paiement:false,
            commandesNR:false,
            clients:[],
            cqm:[],
            openAlert:false,
            prospects:[],
            clientsCQM:[],
            prospectsCQM:[],
            newsletters:[],
            openAddProspectModal:false,
            alertMessage:"",
            alertType:"",
            newProspect:{
                nom:"",
                prenom:"",
                email:"",
                ville:"",
                telephone:"",
                codePostal:"",


            }
        }
        this.hangleChangeNS=this.hangleChangeNS.bind(this)
    }


    getClients(){
        LoginManagerService.getClients().then((res)=>{
            console.log(res)
          //  this.setState({clients:res})
            this.getCQM(res)

        })
    }
    onChangeProspect(type,e){
        let data =this.state.newProspect
        data[type]=e.target.value
        this.setState({newProspect:data})
    }
    closeSnackbar = (event, reason) => {
        if (reason === 'clickaway') return;
        this.setState({ openAlert: false });
    };
    addNewProspect(){

        let data = this.state.newProspect
        data.dateCreation=moment().format("YYYY-MM-DD ")
        data.statut="accepted"
        CheckoutService.CreateProspect(data).then((res)=>{
            if (res.error===false){
                this.getProspect()
                this.setState({openAddProspectModal:false})
            }
        })

    }
    componentDidMount() {
        this.getClients()
        this.getProspect()


        const paramsString=this.props.location.search
        const params = new URLSearchParams(paramsString);
        const tags = params.get('tab');
        console.log(tags)

        this.changeTab(tags)

     /* CheckoutService.getClient().then((res)=>{
          if(res.status===200){
              this.setState({clients:res.data})
          }
      })*/

      this.getNewsletters()

    }


    getNewsletters(){
        CheckoutService.getNewsletters().then((res)=>{
            if (res){
                this.setState({newsletters:res})
            }
        })
    }

    getProspect(){
        CheckoutService.getProspects().then((res)=>{

            if (res && res.status===200){


                this.setState({prospects:res.data})
            }
        })
    }

    getCQM(ress){


        CheckoutService.getCQM().then((res)=>{
            console.log(res)
            let clients= ress
            let clientsCQM = []
            let prospects= []
            if (res) {
                res.map((item, key) => {
                    const search = clients.find(e => e.email === item.email)
                    console.log(search)
                    if (search === undefined) {
                        prospects.push(item)
                    } else {
                        clientsCQM.push(search)
                    }

                })
                console.log(prospects)
                console.log(clientsCQM)
                this.setState({clients:ress,prospectsCQM:prospects,clientsCQM:clientsCQM})

            }

        }).then(()=>{

        })


    }



    changeTab(tab){
        this.setState({ factureAchat:false,
            factureBS:false,
            CQuizM:false,
            paiement:false,
            commandesNR:false
        })

        this.setState({[tab]:true})
    }

    hangleChangeNS(e,i){

        console.log(e)
       let data = this.state.clients
        data[i].newsletter=e.target.value
        this.setState({clients:data})


    }
    openSnackbar = (type, msg) => {
        this.setState({
            openAlert: true,
            alertMessage: msg,
            alertType: type
        });
    };
    sendNewsletter(email,key){
        CheckoutService.sendNewsletter(email,this.state.clients[key].newsletter).then((res)=>{
            if(res.msg==='success'){
                this.openSnackbar('success', "Newsletter envoyer avec succes");

            }else {
                this.openSnackbar('error', "erreur connection internet");

            }
        })
    }

    render() {

        createTheme('solarized', {

            text: {
                primary: 'black',
                secondary: 'black',

            },
            background: {
                default: 'white',
            },
            context: {
                background: '#cb4b16',
                text: '#FFFFFF',
            },
            divider: {
                default: '#073642',
            },
            action: {
                button: 'rgba(0,0,0,.54)',
                hover: 'rgba(0,0,0,.08)',
                disabled: 'rgba(0,0,0,.12)',
            },
        });

        const customStyles = {
            header: {
                style: {
                    minHeight: '56px',
                },
            },
            headRow: {
                style: {
                    borderTopStyle: 'solid',
                    borderTopWidth: '1px',
                    borderTopColor: defaultThemes.default.divider.default,
                },
            },
            headCells: {
                style: {
                    '&:not(:last-of-type)': {
                        borderRightStyle: 'solid',
                        borderRightWidth: '1px',
                        borderRightColor: defaultThemes.default.divider.default,
                    },
                },
            },
            cells: {
                style: {
                    '&:not(:last-of-type)': {
                        borderRightStyle: 'solid',
                        borderRightWidth: '1px',
                        borderRightColor: defaultThemes.default.divider.default,
                    },
                },
            },
        };

        const MesClients = [
            {
                name: 'Nom',
                selector: 'last_name',
                sortable: true,
            },
            {
                name: 'Prenom',
                selector: 'first_name',
                sortable: true,

            },
            {
                name: 'Email',
                selector: 'email',
                sortable: true,
            },
            {
                name: 'Telephone',
                selector: 'telephone',
                sortable: true,
            },
            {
                name: "Date d'inscription",
                selector: 'date_created',
                sortable: true,
            },
            {
                name: 'Parrainage',
                selector: 'date',
                sortable: true,
            },
            {
                name: 'Action',
                sortable: true,
                cell: row => <div data-tag="allowRowEvents"><div className="row justify-content-between" style={{ fontWeight: "bold" }}><Button onClick={()=>{(console.log(row))}}  variant="contained" color="primary" >
                    Voir
                </Button>
                    <Button onClick={()=>{(console.log(row))}}  variant="contained" color="secondary" >
                        supprimer
                    </Button></div></div>,
            },



        ];
        const NewsLetters = [

            {
                name: 'Name',
                selector: 'name',
                sortable: true,

            },
            {
                name: 'Email',
                selector: 'email',
                sortable: true,
            },
            {
                name: 'Telephone',
                selector: '',
                sortable: true,
            },
            {
                name: "Date d'inscription",
                selector: '',
                sortable: true,
            },
            {
                name: 'Newsletter',
                sortable: true,
                cell: (row,key) =><div style={{width:"100%"}}> <Select style={{width:"100%"}} onClick={(e) => e.stopPropagation()}
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    onChange={(e)=>{ this.hangleChangeNS(e,key)}}
                    value={this.state.clients[key].newsletter===undefined?"":this.state.clients[key].newsletter}

                >
                    {this.state.newsletters.map((item,key)=>(
                        <MenuItem value={item.file}>{item.name}</MenuItem>
                    ))
                   }
                </Select></div>,
            },
            {
                name: 'Action',
                sortable: true,
                cell: (row,key) => <div data-tag="allowRowEvents"><div ><Button onClick={()=>{this.sendNewsletter(row.email,key)}}  variant="contained" color="primary" >
                    Envoyer
                </Button>
                    </div>
                </div>,
            },



        ];

        const cquizzm =[
            {
                name: 'Nom',
                selector: 'nom',
                sortable: true,
            },
            {
                name: 'Prenom',
                selector: 'prenom',
                sortable: true,
            },
            {
                name: 'Email',
                selector: 'email',
                sortable: true,
            },
            {
                name: 'telephone',
                selector: 'telephone',
                sortable: true,
            },
            {
                name: 'Sport Check',

                cell:row=><div>{row.parrainage==="false"?
                    <Checkbox



                        style={{color:"black"}}

                        size="medium"

                    />:<Checkbox
                        checked={true}
                        onChange={(e)=>{console.log(e.target.checked)}}
                        style={{color:"#07b550"}}

                        size="medium"

                    />}
                </div>,
                sortable: true,
            },
            {
                name: 'Capteurs',

                cell:row=><div> {row.access_token_google===""|| row.access_token_google===null ?
                    <Checkbox



                        style={{color:"black"}}

                        size="medium"

                    />:<Checkbox
                        checked={true}
                        onChange={(e)=>{console.log(e.target.checked)}}
                        style={{color:"#07b550"}}

                        size="medium"

                    />}
                </div>,
                sortable: true,
            },
            {
                name: 'Body Check',

                cell:row=><div> {row.bodycheck==="false" ?
                    <Checkbox



                        style={{color:"black"}}

                        size="medium"

                    />:<Checkbox
                        checked={true}
                        onChange={(e)=>{console.log(e.target.checked)}}
                        style={{color:"#07b550"}}

                        size="medium"

                    />}
                </div>,
                sortable: true,
            },
            {
                name: 'Ayure',

                cell:row=><div> {row.ayurecheck==="false" ?
                    <Checkbox



                        style={{color:"black"}}

                        size="medium"

                    />:<Checkbox
                        checked={true}
                        onChange={(e)=>{console.log(e.target.checked)}}
                        style={{color:"#07b550"}}

                        size="medium"

                    />}
                </div>,
                sortable: true,
            },
            {
                name: 'Mot de passe et bienvenur',

                cell:row=><div>  <img src={mailSend} style={{width:35,cursor:"pointer"}}/>
                </div>,
                sortable: true,
            },
            {
                name: 'Action',

                cell:row=> <div className="row justify-content-center">
                    <div className="col-md-auto">
                        <img src={loope}

                             style={{width:30,height:30,cursor:"pointer"}} >

                        </img>
                    </div>
                    <div className="col-md-4">

                        <img src={deleteIcon} style={{width:"100%",cursor:"pointer"}} />
                    </div>

                </div>,
                sortable: true,
            },
        ]

        let nav=this.state.nav
        return (
            <div>
                { /*<div style={{display:nav==='hidden'?'none':'visible'}} className="header">
                  <NlTopbar page={"accueil"} history={this.props.history}/>


              </div>*/}

                <NavBarNlManager nav={"cqm"}></NavBarNlManager>
               <div className="wrapper mt-3 ">
                   <div className="row mt20">
                       <div className="col-12">

                           <div className="card">
                               <div className="card-body">
                                   <ul className="nav nav-pills mb-0" id="pills-tab" role="tablist">


                                       <li className="nav-item"><a onClick={()=>{this.changeTab('factureAchat')}} className={this.state.factureAchat===true?"nav-link active":"nav-link"} id="manager_invoices_tab"
                                                                   data-toggle="pill" href="manager_invoices">Mes clients</a></li>

                                       <li className="nav-item"><a onClick={()=>{this.changeTab('factureBS')}} className={this.state.factureBS===true?"nav-link active":"nav-link"} id="manager_invoices_shopbs_tab"
                                                                   data-toggle="pill" href="/?manager_invoices_shopbs">Mes Prospects</a></li>


                                       <li className="nav-item"><a onClick={()=>{this.changeTab('CQuizM')}} className={this.state.CQuizM===true?"nav-link active":"nav-link"} id="clients_invoices_tab"
                                                                   data-toggle="pill" href="#clients_invoices">CQuizzM</a></li>


                                       <li className="nav-item"><a onClick={()=>{this.changeTab('paiement')}} className={this.state.paiement===true?"nav-link active":"nav-link"} id="payment3_tab" data-toggle="pill"
                                                                   href="#payment3">CNewsletterM</a></li>




                                   </ul>
                               </div>
                           </div>
                       </div>

                   </div>

                   {this.state.factureAchat===true&&
                   <div>
                       <div className="row ">
                           <div className="col-md-8">
                               <h4>Mes clients
                               </h4>



                           </div>


                       </div>



                       <div className="card">
                           <div className="card-body">
                               <div id="invoices-manager_wrapper" className="dataTables_wrapper dt-bootstrap4 no-footer">
                                   <div className="row ">
                                       <div className="col-sm-12 col-md-6">
                                           <div className="row align-items-center"  >
                                               <div>
                                                   <h5>
                                                       Show
                                                   </h5>
                                               </div>
                                               <div className="col-md-3">
                                                   <Autocomplete
                                                       value=""
                                                       onChange={(e)=>{console.log(e.target.value)}}
                                                       inputValue={""}
                                                       onInputChange={(event, newInputValue) => {
                                                           console.log(newInputValue);
                                                       }}
                                                       id="controllable-states-demo"
                                                       options={["10","20","25","100"]}
                                                       style={{ width: "100%" }}
                                                       renderInput={(params) => <TextField {...params} label="" variant="outlined" />}
                                                   />
                                               </div>
                                               <div>
                                                   <h5>
                                                       entries
                                                   </h5>
                                               </div>

                                           </div>
                                       </div>
                                       <div className="col-sm-12 col-md-6 ">
                                           <div className="row align-items-center justify-content-end">
                                               <div>
                                                   <h5>
                                                       Rechercher :
                                                   </h5>
                                               </div>
                                               <div className="ml-3">
                                                   <TextField id="outlined-basic" label="Outlined" variant="outlined" />


                                               </div>

                                           </div>

                                       </div>

                                   </div>
                                   <div className="row">
                                       <div className="col-sm-12">
                                           <DataTable
                                               selectableRows
                                               columns={MesClients}
                                               data={this.state.clients}
                                               striped={true}
                                               subHeader
                                               customStyles={customStyles}
                                               pagination






                                           />

                                       </div>

                                   </div>

                               </div>

                           </div>

                       </div>
                   </div>
                   }

                   {this.state.factureBS===true&&
                   <div>
                       <div className="row ">
                           <div className="col-md-8">
                               <h4>Mes Prospect

                               </h4>



                           </div>


                       </div>

                       <div className="row ">
                           <div className="col-md-12">
                               <div className="row">
                                   <div className="col-12">
                                       <div className="card">
                                           <div className="card-body">
                                          <h4>
                                              <TableProspects
                                                  prospects={this.state.prospects}
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
                                                          openAddProspectModal:true
                                                      })
                                                  }}
                                                  deleteContact={(id) => {
                                                      this.deleteContact(id)
                                                  }}
                                              />

                                          </h4>
                                           </div>

                                       </div>

                                   </div>

                               </div>


                           </div>

                       </div>


                   </div>
                   }

                   {this.state.CQuizM===true&&
                   <div>
                       <div className="row ">
                           <div className="col-md-8">
                               <div className="row align-items-center">

                               <div className="ml-3"  style={{width:20,height:20 ,backgroundColor:"#ebba34",borderRadius:100}}>

                               </div>
                                   <div className="ml-1">
                               <text  style={{fontWeight:"bold",color:"#1599d1" ,fontSize:16}}>CQM pour les proscpects</text>
                                   </div>
                               </div>



                           </div>


                       </div>

                       <div className="row ">
                           <div className="col-md-12">
                               <div className="row">
                                   <div className="col-12">
                                       <div className="card">
                                           <div className="card-body">
                                           <span className="text-success" id="period-text-invoices-manager">Vous visualisez actuellement tous les quizz envoyés à vos prospects</span>

                                               <p className="mt-3">Vous pouvez modifier la période en sélectionnant un mois
                                                   et une année :</p>

                                               <div className="row mt-3">
                                                   <div className="input-group-prepend p-0 col-12 col-md-auto">
                                                   <span
                                                       className="input-group-text w-100 rounded-0 justify-content-center justify-content-md-start">Mois</span>
                                                   </div>

                                                   <div className="col-12 col-md-2 p-0 rounded-0">
                                                       <FormControl  style={{width:"100%"}}variant="outlined" >
                                                           <InputLabel id="demo-simple-select-outlined-label">Mois</InputLabel>
                                                           <Select
                                                               labelId="demo-simple-select-outlined-label"
                                                               id="demo-simple-select-outlined"
                                                               value=""
                                                               onChange={(e)=>{console.log(e.target.value)}}
                                                               label="Age"
                                                           >
                                                               <MenuItem value="">
                                                                   <em>None</em>
                                                               </MenuItem>
                                                               <MenuItem value={1}>1</MenuItem>
                                                               <MenuItem value={2}>2</MenuItem>
                                                               <MenuItem value={3}>3</MenuItem>
                                                           </Select>
                                                       </FormControl>

                                                   </div>

                                                   <div className="input-group-prepend p-0 col-12 col-md-auto">
                                                   <span
                                                       className="input-group-text w-100 rounded-0 justify-content-center justify-content-md-start">Année</span>
                                                   </div>

                                                   <div className="col-12 col-md-2 p-0 rounded-0">
                                                       <FormControl style={{width:"100%"}} variant="outlined" >
                                                           <InputLabel id="demo-simple-select-outlined-label">Année</InputLabel>
                                                           <Select
                                                               labelId="demo-simple-select-outlined-label"
                                                               id="demo-simple-select-outlined"
                                                               value=""
                                                               onChange={(e)=>{console.log(e.target.value)}}
                                                               label="Age"
                                                           >
                                                               <MenuItem value="">
                                                                   <em>None</em>
                                                               </MenuItem>
                                                               <MenuItem value={1}>1</MenuItem>
                                                               <MenuItem value={2}>2</MenuItem>
                                                               <MenuItem value={3}>3</MenuItem>
                                                           </Select>
                                                       </FormControl>
                                                   </div>

                                                   <Button variant="contained" color="primary">
                                                       Valider
                                                   </Button>
                                               </div>
                                           </div>

                                       </div>

                                   </div>

                               </div>


                           </div>

                       </div>

                       <div className="card">
                           <div className="card-body">
                               <div id="invoices-manager_wrapper" className="dataTables_wrapper dt-bootstrap4 no-footer">
                                   <div className="row ">
                                       <div className="col-sm-12 col-md-6">
                                           <div className="row align-items-center"  >
                                               <div>
                                                   <h5>
                                                       Show
                                                   </h5>
                                               </div>
                                               <div className="col-md-3">
                                                   <Autocomplete
                                                       value=""
                                                       onChange={(e)=>{console.log(e.target.value)}}
                                                       inputValue={""}
                                                       onInputChange={(event, newInputValue) => {
                                                           console.log(newInputValue);
                                                       }}
                                                       id="controllable-states-demo"
                                                       options={["10","20","25","100"]}
                                                       style={{ width: "100%" }}
                                                       renderInput={(params) => <TextField {...params} label="" variant="outlined" />}
                                                   />
                                               </div>
                                               <div>
                                                   <h5>
                                                       entries
                                                   </h5>
                                               </div>

                                           </div>
                                       </div>
                                       <div className="col-sm-12 col-md-6 ">
                                           <div className="row align-items-center justify-content-end">
                                               <div>
                                                   <h5>
                                                       Rechercher :
                                                   </h5>
                                               </div>
                                               <div className="ml-3">
                                                   <TextField id="outlined-basic" label="Outlined" variant="outlined" />


                                               </div>

                                           </div>

                                       </div>

                                   </div>
                                   <div className="row">
                                       <div className="col-sm-12">
                                           <DataTable

                                               columns={cquizzm}
                                               data={this.state.prospectsCQM}


                                               customStyles={customStyles}
                                               pagination



                                           />

                                       </div>

                                   </div>

                               </div>

                           </div>

                       </div>

                       <div className="row  mt-3">
                           <div className="col-md-8">
                               <div className="row align-items-center">

                                   <div className="ml-3"  style={{width:20,height:20 ,backgroundColor:"#34eb46",borderRadius:100}}>

                                   </div>
                                   <div className="ml-1">
                                       <text  style={{fontWeight:"bold",color:"#1599d1" ,fontSize:16}}>CQM pour les clients</text>
                                   </div>
                               </div>



                           </div>


                       </div>

                       <div className="row ">
                           <div className="col-md-12">
                               <div className="row">
                                   <div className="col-12">
                                       <div className="card">
                                           <div className="card-body">
                                           <span className="text-success" id="period-text-invoices-manager">Vous visualisez actuellement tous les quizz envoyés à vos clients</span>

                                               <p className="mt-3">Vous pouvez modifier la période en sélectionnant un mois
                                                   et une année :</p>

                                               <div className="row mt-3">
                                                   <div className="input-group-prepend p-0 col-12 col-md-auto">
                                                   <span
                                                       className="input-group-text w-100 rounded-0 justify-content-center justify-content-md-start">Mois</span>
                                                   </div>

                                                   <div className="col-12 col-md-2 p-0 rounded-0">
                                                       <FormControl  style={{width:"100%"}}variant="outlined" >
                                                           <InputLabel id="demo-simple-select-outlined-label">Mois</InputLabel>
                                                           <Select
                                                               labelId="demo-simple-select-outlined-label"
                                                               id="demo-simple-select-outlined"
                                                               value=""
                                                               onChange={(e)=>{console.log(e.target.value)}}
                                                               label="Age"
                                                           >
                                                               <MenuItem value="">
                                                                   <em>None</em>
                                                               </MenuItem>
                                                               <MenuItem value={1}>1</MenuItem>
                                                               <MenuItem value={2}>2</MenuItem>
                                                               <MenuItem value={3}>3</MenuItem>
                                                           </Select>
                                                       </FormControl>

                                                   </div>

                                                   <div className="input-group-prepend p-0 col-12 col-md-auto">
                                                   <span
                                                       className="input-group-text w-100 rounded-0 justify-content-center justify-content-md-start">Année</span>
                                                   </div>

                                                   <div className="col-12 col-md-2 p-0 rounded-0">
                                                       <FormControl style={{width:"100%"}} variant="outlined" >
                                                           <InputLabel id="demo-simple-select-outlined-label">Année</InputLabel>
                                                           <Select
                                                               labelId="demo-simple-select-outlined-label"
                                                               id="demo-simple-select-outlined"
                                                               value=""
                                                               onChange={(e)=>{console.log(e.target.value)}}
                                                               label="Age"
                                                           >
                                                               <MenuItem value="">
                                                                   <em>None</em>
                                                               </MenuItem>
                                                               <MenuItem value={1}>1</MenuItem>
                                                               <MenuItem value={2}>2</MenuItem>
                                                               <MenuItem value={3}>3</MenuItem>
                                                           </Select>
                                                       </FormControl>
                                                   </div>

                                                   <Button variant="contained" color="primary">
                                                       Valider
                                                   </Button>
                                               </div>
                                           </div>

                                       </div>

                                   </div>

                               </div>


                           </div>

                       </div>

                       <div className="card">
                           <div className="card-body">
                               <div id="invoices-manager_wrapper" className="dataTables_wrapper dt-bootstrap4 no-footer">
                                   <div className="row ">
                                       <div className="col-sm-12 col-md-6">
                                           <div className="row align-items-center"  >
                                               <div>
                                                   <h5>
                                                       Show
                                                   </h5>
                                               </div>
                                               <div className="col-md-3">
                                                   <Autocomplete
                                                       value=""
                                                       onChange={(e)=>{console.log(e.target.value)}}
                                                       inputValue={""}
                                                       onInputChange={(event, newInputValue) => {
                                                           console.log(newInputValue);
                                                       }}
                                                       id="controllable-states-demo"
                                                       options={["10","20","25","100"]}
                                                       style={{ width: "100%" }}
                                                       renderInput={(params) => <TextField {...params} label="" variant="outlined" />}
                                                   />
                                               </div>
                                               <div>
                                                   <h5>
                                                       entries
                                                   </h5>
                                               </div>

                                           </div>
                                       </div>
                                       <div className="col-sm-12 col-md-6 ">
                                           <div className="row align-items-center justify-content-end">
                                               <div>
                                                   <h5>
                                                       Rechercher :
                                                   </h5>
                                               </div>
                                               <div className="ml-3">
                                                   <TextField id="outlined-basic" label="Outlined" variant="outlined" />


                                               </div>

                                           </div>

                                       </div>

                                   </div>
                                   <div className="row">
                                       <div className="col-sm-12">
                                           <DataTable

                                               columns={cquizzm}
                                               data={this.state.clientsCQM}


                                               customStyles={customStyles}
                                               pagination



                                           />

                                       </div>

                                   </div>

                               </div>

                           </div>

                       </div>
                   </div>
                   }

                   {this.state.paiement===true&&
                   <div>
                       <div className="row py-2">
                           <div className="col-md-8">
                               <h4>Newsletters manages


                               </h4>



                           </div>


                       </div>

                       <div className="row ">
                           <div className="col-md-12">
                               <div className="row">
                                   <div className="col-12">
                                       <div className="card">
                                           <div className="card-body">

                                                  <div className="col-sm-12">
                                                   <DataTable
                                                       selectableRows
                                                       columns={NewsLetters}
                                                       data={this.state.clients}
                                                       customStyles={customStyles}
                                                       pagination


                                                   />




                                                  </div>
                                           </div>

                                       </div>

                                   </div>

                               </div>


                           </div>

                       </div>


                   </div>
                   }

                   {this.state.commandesNR===true&&
                   <div>
                       <div className="row ">
                           <div className="col-md-8">
                               <h4>Commandes non réglées

                               </h4>



                           </div>


                       </div>



                       <div className="card">
                           <div className="card-body">
                               <div id="invoices-manager_wrapper" className="dataTables_wrapper dt-bootstrap4 no-footer">
                                   <div className="row ">
                                       <div className="col-sm-12 col-md-6">
                                           <div className="row align-items-center"  >
                                               <div>
                                                   <h5>
                                                       Show
                                                   </h5>
                                               </div>
                                               <div className="col-md-3">
                                                   <Autocomplete
                                                       value=""
                                                       onChange={(e)=>{console.log(e.target.value)}}
                                                       inputValue={""}
                                                       onInputChange={(event, newInputValue) => {
                                                           console.log(newInputValue);
                                                       }}
                                                       id="controllable-states-demo"
                                                       options={["10","20","25","100"]}
                                                       style={{ width: "100%" }}
                                                       renderInput={(params) => <TextField {...params} label="" variant="outlined" />}
                                                   />
                                               </div>
                                               <div>
                                                   <h5>
                                                       entries
                                                   </h5>
                                               </div>

                                           </div>
                                       </div>
                                       <div className="col-sm-12 col-md-6 ">
                                           <div className="row align-items-center justify-content-end">
                                               <div>
                                                   <h5>
                                                       Rechercher :
                                                   </h5>
                                               </div>
                                               <div className="ml-3">
                                                   <TextField id="outlined-basic" label="Outlined" variant="outlined" />


                                               </div>

                                           </div>

                                       </div>

                                   </div>
                                   <div className="row">
                                       <div className="col-sm-12">
                                           <DataTable
                                               selectableRows
                                               columns={MesClients}
                                               data={this.state.clients}
                                               customStyles={customStyles}
                                               pagination


                                           />

                                       </div>

                                   </div>

                               </div>

                           </div>

                       </div>
                   </div>
                   }


                   <Dialog
                       maxWidth="xl"
                       open={this.state.openAddProspectModal}
                       onClose={() => {
                           this.setState({ openAddProspectModal: !this.state.openAddProspectModal });
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
                                       openAddProspectModal: !this.state.oopenAddProspectModal
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
                                       value={this.state.newProspect.nom}
                                       onChange={(e)=>{this.onChangeProspect('nom', e)}} />

                               </div>
                               <div className="col-md-6">
                                   <p style={{ marginBottom: 10 }}>Prénom</p>
                                   <input
                                       style={{ minWidth: 300, height: 40 }}
                                       type="email"
                                       className="form-control"
                                       id="nome"
                                       name="nome"
                                       value={this.state.newProspect.prenom}
                                       onChange={(e)=>{this.onChangeProspect('prenom', e)}}  />
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
                                       value={this.state.newProspect.email}
                                       onChange={(e)=>{this.onChangeProspect('email', e)}}  />
                               </div>
                               <div className="col-md-6">
                                   <p style={{ marginBottom: 10 }}>Téléphone</p>
                                   <input
                                       style={{ minWidth: 300, height: 40 }}
                                       type="text"
                                       className="form-control"
                                       id="nomt"
                                       name="nomt"
                                       value={this.state.newProspect.telephone}
                                       onChange={(e)=>{this.onChangeProspect('telephone', e)}}  />

                               </div>
                           </div>
                           <div className="row mt-3">

                               <div className="col-md-6">
                                   <p style={{ marginBottom: 10 }}>Ville</p>
                                   <input
                                       style={{ minWidth: 300, height: 40 }}
                                       type="email"
                                       className="form-control"
                                       id="nome"
                                       name="nome"
                                       value={this.state.newProspect.ville}
                                       onChange={(e)=>{this.onChangeProspect('ville', e)}}  />
                               </div>
                               <div className="col-md-6">
                                   <p style={{ marginBottom: 10 }}>Code postal</p>
                                   <input
                                       style={{ minWidth: 300, height: 40 }}
                                       type="text"
                                       className="form-control"
                                       id="nomt"
                                       name="nomt"
                                       value={this.state.newProspect.codePostal}
                                       onChange={(e)=>{this.onChangeProspect('codePostal', e)}}  />

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
                               disabled={this.state.newProspect.nom.trim() === '' || this.state.newProspect.prenom.trim() === '' || this.state.newProspect.email === ''}
                               onClick={() => {
                                   this.addNewProspect()
                               }}
                               color="primary"
                               variant="contained"
                               style={{ textTransform: 'capitalize' }}
                           >
                               Créer
                           </MuiButton>
                       </DialogActions>
                   </Dialog>


               </div>
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

            </div>



        );
    }
}

export default CQM;
