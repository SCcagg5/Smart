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
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import bodycheckEquilibre from "../../assets/images/BS/bodycheck-equilibre.png"
import "./text.css"
import Autocomplete from '@material-ui/lab/Autocomplete';
import TextField from '@material-ui/core/TextField';
import ServerTable from 'react-strap-table';
import styled from 'styled-components';
import data from "./data"

import DataTable,{ defaultThemes ,createTheme}  from 'react-data-table-component';
import CheckoutService from "../../provider/checkoutservice";
import LoginManagerService from "../../provider/loginManager";
import NavBarNlManager from "../../components/NavBar/NavBarNLManager";

import DescriptionIcon from '@material-ui/icons/Description';
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
class Gestion extends Component {
    constructor(props){
        super(props)
        this.state={
            nav:"",
            factureAchat:true,
            factureBS:false,
            factureClients:false,
            paiement:false,
            commandesNR:false,
            factures:[]
        }
    }

    componentDidMount() {
      /*  this.getClients()*/
        this.getFactureAchat()

        const paramsString=this.props.location.search
        const params = new URLSearchParams(paramsString);
        const tags = params.get('tab');
        console.log(tags)

        this.changeTab(tags)


    }

    getClients(){
        LoginManagerService.getClients().then((res)=>{
            console.log(res)
        })
    }

 getFactureAchat(){
        CheckoutService.getOrders().then((res)=>{
            if(res && res.status===200){
                 this.setState({factures:res.data})
            }
        })
 }

    changeTab(tab){
        this.setState({ factureAchat:false,
            factureBS:false,
            factureClients:false,
            paiement:false,
            commandesNR:false
        })

        this.setState({[tab]:true})
    }

    generateFacture(data){
        CheckoutService.generateFacture(data).then((res)=>{
            var file = new Blob([res], {type: 'application/pdf'});
            var fileURL = URL.createObjectURL(file);
            window.open(fileURL);
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
                    borderTopColor: "black",

                },
            },
            headCells: {
                style: {
                    '&:not(:last-of-type)': {
                        borderRightStyle: 'solid',
                        borderRightWidth: '1px',
                        borderRightColor: "black",
                        fontWeight:900

                    },
                },
            },
            cells: {
                style: {
                    '&:not(:last-of-type)': {
                        borderRightStyle: 'solid',
                        borderRightWidth: '1px',
                        borderRightColor: "black",
                    },
                },
            },
        };
        const data = this.state.factures;
        const columns = [
            {
                name: 'ID Facture',
                selector: 'id',
                sortable: true,
            },
            {
                name:'Client',
                selector:"billing.email",
            },
            {
                name: 'Date',
                selector: 'date_created',
                sortable: true,

            },
            {
                name: 'Adresse de livraison',
                selector: 'billing.address_1',
                sortable: true,
            },
            {
                name: 'Paiement',
                selector: 'payment_method_title',
                sortable: true,
            },

            {
                name: 'Total TTC ',
                selector: 'total',
                sortable: true,
            },
            {
                name: 'Facture',
                sortable: true,
                cell: row => <div className="bg-warning p-1"><h5 style={{color:"white"}}> {row.status} </h5></div>,
            },
            {
                name: 'generate facture',
                sortable: true,
                cell: row => <div style={{textAlign:'center'}} ><DescriptionIcon style={{cursor:"pointer"}} onClick={()=>this.generateFacture(row)} fontSize={'large'}/></div>,
            }



        ];

        let nav=this.state.nav
        return (
            <div>
                { /*<div style={{display:nav==='hidden'?'none':'visible'}} className="header">
                  <NlTopbar page={"accueil"} history={this.props.history}/>


              </div>*/}

                <NavBarNlManager nav={"gestion"}></NavBarNlManager>
               <div className="wrapper mt-5 ">
                   <div className="row mt20">
                       <div className="col-12">

                           <div className="card">
                               <div className="card-body">
                                   <ul className="nav nav-pills mb-0" id="pills-tab" role="tablist">


                                       <li className="nav-item"><a onClick={()=>{this.changeTab('factureAchat')}} className={this.state.factureAchat===true?"nav-link active":"nav-link"}  id="manager_invoices_tab"
                                                                   data-toggle="pill" href="manager_invoices">Factures
                                           d'achat</a></li>




                                       <li className="nav-item"><a onClick={()=>{this.changeTab('factureClients')}} className={this.state.factureClients===true?"nav-link active":"nav-link"} id="clients_invoices_tab"
                                                                   data-toggle="pill" href="#clients_invoices">Factures
                                           clients</a></li>


                                       <li className="nav-item"><a onClick={()=>{this.changeTab('paiement')}} className={this.state.paiement===true?"nav-link active":"nav-link"}  id="payment3_tab" data-toggle="pill"
                                                                   href="#payment3">Paiements 3x</a></li>


                                       <li className="nav-item"><a onClick={()=>{
                                           this.changeTab('commandesNR')
                                           this.props.history.push('/gestion?tab=commandesNR')}} className={this.state.commandesNR===true?"nav-link active":"nav-link"}  id="unpaid_orders_tab"
                                                                   data-toggle="pill" href="#unpaid_orders">Commandes non
                                           réglées</a></li>

                                   </ul>
                               </div>
                           </div>
                       </div>

                   </div>

                   {this.state.factureAchat===true&&
                   <div>
                       <div className="row ">
                           <div className="col-md-8">
                               <h4>Mes factures d'achats
                               </h4>



                           </div>


                       </div>

                       <div className="row ">
                           <div className="col-md-12">
                               <div className="row">
                                   <div className="col-12">
                                       <div className="card">
                                           <div className="card-body">
                                           <span className="text-success" id="period-text-invoices-manager">Vous visualisez actuellement toutes vos factures
          d'achats.</span>

                                               <p className="mt-3">Vous pouvez modifier la période en sélectionnant un mois
                                                   et une année :</p>

                                               <div className="row mt-3">
                                                   <div className="input-group-prepend p-0 col-12 col-md-auto">
                                                   <span
                                                       className="input-group-text w-100 rounded-0 justify-content-center justify-content-md-start">Mois</span>
                                                   </div>

                                                   <div className="col-12 col-md-2 p-0 rounded-0">
                                                       <FormControl style={{width:"100%"}} variant="outlined" >
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
                                                       <FormControl  style={{width:"100%"}} variant="outlined" >
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
                                               selectableRows
                                               columns={columns}
                                               data={data}

                                               subHeader
                                               customStyles={customStyles}
                                               pagination
                                               theme='solarized'




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
                               <h4>Mes factures Beautysane.com

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
                                              Aucune commande

                                          </h4>
                                           </div>

                                       </div>

                                   </div>

                               </div>


                           </div>

                       </div>


                   </div>
                   }

                   {this.state.factureClients===true&&
                   <div>
                       <div className="row ">
                           <div className="col-md-8">
                               <h4>Mes factures clients

                               </h4>



                           </div>


                       </div>

                       <div className="row ">
                           <div className="col-md-12">
                               <div className="row">
                                   <div className="col-12">
                                       <div className="card">
                                           <div className="card-body">
                                           <span className="text-success" id="period-text-invoices-manager">Vous visualisez actuellement toutes vos factures
          d'achats.</span>

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
                                               selectableRows
                                               columns={columns}
                                               data={data}


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
                               <h4>Paiements 3x


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
                                                   Aucun paiement 3x enregistré


                                               </h4>
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
                                               columns={columns}
                                               data={data}
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





               </div>


            </div>



        );
    }
}

export default Gestion;
