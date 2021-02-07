import React,{useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import moment from 'moment';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import AtlButton, {ButtonGroup as AltButtonGroup} from '@atlaskit/button';
import PictureAsPdfIcon from '@material-ui/icons/PictureAsPdf';
import FolderIcon from '@material-ui/icons/Folder';
import SmartService from '../../provider/SmartService';
import {Avatar, Input, Select as MuiSelect} from '@material-ui/core';
import MenuItem from '@material-ui/core/MenuItem';
import data from "../../data/Data"
import DatePicker from 'react-date-picker';
import calendar from '../../assets/icons/calendar_icon.jpg';
import SelectSearch from 'react-select-search';
import main_functions from '../../controller/main_functions';
import Modal, { ModalTransition } from '@atlaskit/modal-dialog';
import utilFunctions from "../../tools/functions";
import CircularProgress from "@material-ui/core/CircularProgress";
import EditIcon from "@material-ui/icons/Edit";
import DialogTitle from "@material-ui/core/DialogTitle";
import Typography from "@material-ui/core/Typography";
import CloseIcon from "@material-ui/icons/Close";
import DialogContent from "@material-ui/core/DialogContent";
import Autosuggest from "react-autosuggest";
import InputAdornment from "@material-ui/core/InputAdornment";
import Dialog from "@material-ui/core/Dialog";
import Data from "../../data/Data";
import { Dropdown, Input as Sinput } from 'semantic-ui-react'
import SearchIcon from '@material-ui/icons/Search';

const useRowStyles = makeStyles({
  root: {
    '& > *': {
      borderBottom: 'unset',
    },
  },
});

export default function CollapsibleTable(props) {

  const [loading, setLoading] = React.useState(true);
  const [taxs, setTaxs] = React.useState(null);
  const [paymTerms, setPaymTerms] = React.useState([]);
  const [client_search, setClient_search] = React.useState("");
  const [sdate_search, setSdate_search] = React.useState(null);
  const [edate_search, setEdate_search] = React.useState(null);
  const [statut_search, setStatut_search] = React.useState("tous");
  const [openDeleteModal, setOpenDeleteModal] = React.useState(false);
  const [f_TooDeleted, setF_TooDeleted] = React.useState("");


  useEffect(() => {
    if(taxs === null ){
      SmartService.get_tax_odoo(localStorage.getItem("token"),localStorage.getItem("usrtoken")).then( taxRes => {
        console.log(taxRes)
        if(taxRes.succes === true && taxRes.status === 200){
          let taxs_id = taxRes.data || [];
          let tax_calls = [];
          let taxs = []
          taxs_id.map((id,key) => {
            tax_calls.push(
                SmartService.get_tax_odoo_byID(id,localStorage.getItem("token"),localStorage.getItem("usrtoken")).then( taxResData => {
                  console.log("OK"+key)
                  taxs.push({id:taxResData.data[0].id,display_name:taxResData.data[0].display_name})
                }).catch(err => console.log(err))
            )
          })
          Promise.all(tax_calls).then( response => {
            setTaxs(taxs)
            setLoading(false)
          }).catch(err => console.log(err))

          SmartService.get_paymentTerm_odoo(localStorage.getItem("token"),localStorage.getItem("usrtoken")).then(paymTermRes => {
            console.log(paymTermRes)
            if(paymTermRes.succes === true && paymTermRes.status === 200){
              let payTerms_id = paymTermRes.data || [];
              let payTerm_calls = [];
              let paymTerms = [];
              payTerms_id.map((id,key) => {
                payTerm_calls.push(
                    SmartService.get_paymentTerm_odoo_byID(id,localStorage.getItem("token"),localStorage.getItem("usrtoken")).then(paymTermResData => {
                      paymTerms.push({id:paymTermResData.data[0].id,display_name:paymTermResData.data[0].display_name})
                    }).catch(err => console.log(err))
                )
              })
              Promise.all(payTerm_calls).then(response => {
                setPaymTerms(paymTerms)
                console.log(taxs)
                console.log(paymTerms)
              }).catch(err => console.log(err))
            }else{
              console.log(paymTermRes.error)
            }
          }).catch(err => {console.log(err)})

        }else{
          console.log(taxRes.error)
          setLoading(false)
        }
      }).catch(err => {
        console.log(err); setLoading(false)
      })
    }
  });


  let factures = (props.factures || []).filter(x => x.partner === localStorage.getItem("email"));

  const searchFilter = factures.filter((lf) => ( ( (lf.client.trim() === client_search.trim() ) || client_search === "") &&
      ( (sdate_search !== null && ( new Date(lf.created_at).getTime() >= sdate_search.getTime())) || sdate_search === null  ) &&
      ( (edate_search !== null && (new Date(lf.created_at).getTime() <= (moment(edate_search).set({hour:23,minute:59}).unix() * 1000) ))  || edate_search === null  ) &&
      ( (statut_search === lf.statut) || statut_search === "tous" )
  ))

  searchFilter.sort( (a,b) => {
    var c = new Date(a.created_at);
    var d = new Date(b.created_at);
    return d-c;
  });


  return (
      <TableContainer component={Paper} style={{minHeight:650,padding:30}}>

        {
          loading === true ?
              <div align="center" style={{marginTop:60}}>
                <CircularProgress color="primary" />
                <h6>Chargement...</h6>
              </div> :

              <div>
                <div className="row mt-1" style={{border:"2px solid #f0f0f0",padding:15,paddingLeft:10}}>
                  <div className="col-md-12">
                    <div align="right">
                      <AtlButton
                          onClick={() => {
                            setSdate_search(null)
                            setEdate_search(null)
                            setClient_search("")
                          }}
                      >Initialiser</AtlButton>
                    </div>
                  </div>
                  <div className="col-md-12">
                    <h5>Rechercher</h5>
                  </div>
                  <div className="col-md-12">
                    <div style={{display:"flex"}}>
                      <h5>De</h5>
                      <div style={{marginLeft:10,marginRight:10}}>
                        <DatePicker
                            calendarIcon={<img alt="" src={calendar} style={{width: 20}}/>}
                            onChange={(e) => {
                              setSdate_search(e)
                            }}
                            value={sdate_search}
                            dayPlaceholder="dd"
                            monthPlaceholder="mm"
                            yearPlaceholder="yyyy"
                        />
                      </div>
                      <h5>à</h5>
                      <div style={{marginLeft:10,marginRight:10}}>
                        <DatePicker
                            calendarIcon={<img alt="" src={calendar} style={{width: 20}}/>}
                            onChange={(e) => {
                              setEdate_search(e)
                            }}
                            value={edate_search}
                            dayPlaceholder="dd"
                            monthPlaceholder="mm"
                            yearPlaceholder="yyyy"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="col-md-10 mt-2">
                    <div style={{display:"flex"}}>
                      <h5 style={{marginRight:10}}>Par client</h5>
                      <SelectSearch
                          className="select-search"
                          options={
                            props.annuaire_clients_mandat.map(({ Nom, Prenom, Type, imageUrl }) =>
                                ({
                                  value: Nom + ' ' + (Prenom || ''),
                                  name: Nom + ' ' + (Prenom || ''),
                                  ContactType: Type,
                                  ContactName: Nom + ' ' + (Prenom || ''),
                                  imageUrl: imageUrl
                                }))
                          }
                          value={client_search}
                          renderOption={main_functions.renderSearchOption}
                          search
                          placeholder="Sélectionner.."
                          onChange={e => {
                            setClient_search(e)
                          }}
                      />
                    </div>
                  </div>

                  <div className="col-md-12 mt-2">
                    <div style={{display:"flex"}}>
                      <h5>Par statut</h5>
                      <select
                          style={{width:250,marginLeft:10}}
                          className="form-control custom-select"
                          id="titre"
                          name="titre"
                          placeholder="Titre"
                          value={statut_search}
                          onChange={(e) => {setStatut_search(e.target.value)}}
                      >
                        <option  value={"tous"} label={"Tous"} />
                        <option  value={"wait"} label={"En attente"} />
                        <option  value={"accepted"} label={"Validée"} />
                      </select>
                    </div>
                  </div>
                </div>

                {
                  searchFilter.length > 0 ?
                      <Table aria-label="collapsible table" style={{marginTop:20}}>
                        <TableHead>
                          <TableRow>
                            <TableCell />
                            <TableCell align="center" style={{fontWeight:"bold"}} >Date de création</TableCell>
                            <TableCell align="center" style={{fontWeight:"bold"}} >Date Facture</TableCell>
                            <TableCell align="center" style={{fontWeight:"bold"}} >Client</TableCell>
                            <TableCell align="center" style={{fontWeight:"bold"}} >Nom du dossier</TableCell>
                            <TableCell align="center" style={{fontWeight:"bold"}} >Total(nb heures)</TableCell>
                            <TableCell align="center" style={{fontWeight:"bold"}} >Total (CHF)</TableCell>
                            <TableCell align="center" style={{fontWeight:"bold"}} >Statut</TableCell>
                            <TableCell align="center" style={{fontWeight:"bold"}} >Paiement</TableCell>
                            <TableCell align="center" style={{fontWeight:"bold"}} >Actions</TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {
                            searchFilter.map((row,key) => (
                                <Row key={key} row={row} index={key}
                                     updateFacture={props.updateFacture}
                                     validateFacture={props.validateFacture}
                                     previewFacture={props.previewFacture}
                                     openFacture={props.openFacture}
                                     openFactureFolder={props.openFactureFolder} client_folders={props.client_folders} clients_tempo={props.clients_tempo}
                                     annuaire_clients_mandat={props.annuaire_clients_mandat}
                                     sharedFolders={props.sharedFolders}
                                     showDeleteModal={(id) => {
                                       if(row.partner === localStorage.getItem("email")){
                                         console.log(id)
                                         setF_TooDeleted(id)
                                         setOpenDeleteModal(true)
                                       }else{
                                         alert("Vous n'avez pas le droit d'effectuer cette opération !");
                                       }
                                     }}
                                     taxs={taxs}
                                     paymTerms={paymTerms || []}
                                     contacts={props.contacts || []}
                                     openSnackbar={props.openSnackbar}
                                />
                            ))
                          }
                        </TableBody>
                      </Table> :

                      <h6 style={{margin:20}}>Aucune facture trouvée</h6>
                }


                <ModalTransition>
                  {openDeleteModal === true && (
                      <Modal
                          actions={[
                            { text: 'Supprimer', onClick: () => {

                                props.delete_facture(f_TooDeleted);
                                setF_TooDeleted("")
                                setOpenDeleteModal(false)

                              } },
                            { text: 'Annuler', onClick: () => {
                                setF_TooDeleted("")
                                setOpenDeleteModal(false)
                              }},
                          ]}
                          onClose={() => {
                            setF_TooDeleted("")
                            setOpenDeleteModal(false)
                          }}
                          heading="Vous êtes sur le point de supprimer cette facture !"
                          appearance="danger"
                      >
                      </Modal>
                  )}
                </ModalTransition>

              </div>

        }
      </TableContainer>
  );
}


function Row(props) {

  const [template, setTemplate] = React.useState("0");
  const [client, setClient] = React.useState("");
  const [paymTerm, setPaymTerm] = React.useState( "3");
  const [tax, setTax] = React.useState("13");
  const [fraisAdmin, setFraisAdmin] = React.useState("2%");
  const [compte_banc, setCompte_banc] = React.useState(1);
  const [deadline_date, setDeadline_date] = React.useState(new Date());
  const [addReduction, setAddReduction] = React.useState(false);
  const [reductionType, setReductionType] = React.useState("%");
  const [reductionAmount, setReductionAmount] = React.useState("");


  const [loading_paiment_state, setLoading_paiment_state] = React.useState(false);



  const [showUpdateModal, setShowUpdateModal] = React.useState(false);
  const [selectedFacture, setSelectedFacture] = React.useState("");
  const [selectedRow, setSelectedRow] = React.useState("");
  const [toUpdated_date, setToUpdated_date] = React.useState(new Date());
  const [toUpdated_rate, setToUpdated_rate] = React.useState("");
  const [toUpdated_OAUser, setToUpdated_OAUser] = React.useState("");
  const [toUpdated_desc, setToUpdated_desc] = React.useState("");
  const [timeSuggestions, setTimeSuggestions] = React.useState([]);
  const [duration, setDuration] = React.useState("");

  const [openDeleteLfModal, setOpenDeleteLfModal] = React.useState(false);

  const { row } = props;
  const [open, setOpen] = React.useState(false);
  /*const [updateX, setUpdateX] = React.useState(false);*/

  const getTimeSuggestions = value => {
    const inputValue = value.trim().toLowerCase();
    const inputLength = inputValue.length;

    return inputLength === 0 ? [] : Data.timeSuggestions.filter(x =>
        x.toLowerCase().slice(0, inputLength) === inputValue
    );
  };

  function onInputTimeSuggChange(event, {newValue})  {
    setDuration(newValue)
  }

  function onTimeSuggestionsFetchRequested({value}){
    setTimeSuggestions(getTimeSuggestions(value))
  }

  function onTimeSuggestionsClearRequested(){
    setTimeSuggestions([])
  }

  const inputSuggProps = {
    placeholder: 'Format: --h--',
    value: duration,
    onChange: onInputTimeSuggChange
  };


  const classes = useRowStyles();

  let total = 0;
  let nb_heures = 0;
  (row.lignes_facture || []).map((ligne, key) => {
    total = total + (ligne.newTime.duree * parseFloat(ligne.newTime.rateFacturation));
    nb_heures = nb_heures + ligne.newTime.duree;
  });


  let selected_client_folders = []
  let clients_tempo = props.clients_tempo || [];
  let client_mandats = clients_tempo.find(x => x.ID_client === row.client_id)
  selected_client_folders = client_mandats ?  client_mandats.folders || [] : [];



  let sharedFolders = props.sharedFolders;
  let verif_access = false;
  if(localStorage.getItem("client_folder_id") || localStorage.getItem("client_shared_folder_id")   )
    verif_access = true;


  return (
      <React.Fragment>
        <TableRow className={classes.root}>
          <TableCell>
            <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
              {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
            </IconButton>
          </TableCell>
          <TableCell align="center">{moment(row.created_at).format("DD-MM-YYYY")}</TableCell>
          <TableCell align="center">{moment(row.date_facture).format("DD-MM-YYYY")}</TableCell>
          <TableCell align="center">{row.client}</TableCell>
          <TableCell align="center">{row.client_folder.name}</TableCell>
          <TableCell align="center">{utilFunctions.formatDuration(nb_heures.toString())}</TableCell>
          <TableCell align="center">{total.toFixed(2) + " CHF"}</TableCell>
          <TableCell align="center">
          <span className={row.statut === "wait" ? "badge badge-warning text-white p-1" : "badge badge-success text-white p-1"}>
            {row.statut === "wait" ? "En attente" : "Validée"}</span>
          </TableCell>

          {
            row.statut === "accepted" ?
            <TableCell align="center">
              {
                loading_paiment_state === true ?
                    <CircularProgress color="secondary" size={20} /> :
                    <IconButton size="small" color="secondary"
                                onClick={() => {
                                  setLoading_paiment_state(true)
                                  SmartService.details_facture_odoo(localStorage.getItem("token"),localStorage.getItem("usrtoken"),row.facture_odoo_id).then( detailsRes => {
                                    if(detailsRes.succes === true && detailsRes.status === 200){
                                      console.log(detailsRes.data)
                                      if(detailsRes.data.state === "paid"){
                                        props.openSnackbar("success","Cette facture est bien payée !")
                                      }else{
                                        props.openSnackbar("warning","Cette facture n'est pas encore payée !")
                                      }
                                      setLoading_paiment_state(false)
                                    }else{
                                      console.log(detailsRes.error)
                                      setLoading_paiment_state(false)
                                      props.openSnackbar("error","Une erreur est survenue !")
                                    }
                                  }).catch(err => {
                                    console.log(err)
                                    setLoading_paiment_state(false)
                                    props.openSnackbar("error","Une erreur est survenue !")
                                  })
                                }}
                    >
                      <SearchIcon fontSize="small"/>
                    </IconButton>
              }

            </TableCell> :
                <TableCell align="center"/>
          }
          <TableCell align="center" style={{minWidth:120}}>
            {
              row.statut === "accepted" &&
              [
                <IconButton key={0} aria-label="folder" title="Afficher la facture" color="default" size="small" onClick={() => {
                  props.openFacture(row.file_id)
                }}>
                  <PictureAsPdfIcon fontSize="small" style={{color:"red"}} />
                </IconButton>,
                <IconButton key={1} aria-label="folder" title="Ouvrir le dossier de la facture" color="default" size="small" onClick={() => {
                  SmartService.getFile(row.client_folder.id,localStorage.getItem("token"),localStorage.getItem("usrtoken")).then(resF => {
                    if (resF.succes === true && resF.status === 200) {
                      let comptaFolder = resF.data.Content.folders.find(x => x.name === "COMPTABILITE");
                      props.openFactureFolder(comptaFolder.id)
                    } else {
                      alert("Le dossier n'existe pas !")
                    }
                  }).catch( err => {console.log(err)})
                }}>
                  <FolderIcon fontSize="small" />
                </IconButton>
              ]

            }
            {
              row.statut === "wait" &&
              <IconButton aria-label="folder" title="Supprimer" color="default" size="small"
                          onClick={() => {
                            if(row.statut === "wait"){
                              props.showDeleteModal(row.id)
                            }
                          }}
              >
                <DeleteOutlineIcon fontSize="small" style={{color:"red"}} />
              </IconButton>
            }

          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={9}>
            <Collapse in={open} timeout="auto" unmountOnExit>
              <Box margin={1}>
                <div style={{marginLeft:30,border:"2px solid dodgerblue",padding:20,borderRadius:7.5}}>
                  <h5 style={{textDecoration:"underline"}}>Lignes factures</h5>
                  <Table size="small" aria-label="purchases">
                    <TableHead>
                      <TableRow>
                        {
                          row.statut === "wait" &&
                          <TableCell align="center" style={{fontWeight:"bold"}} >Actions</TableCell>
                        }
                        <TableCell align="center" style={{fontWeight:"bold"}} >Date</TableCell>
                        <TableCell align="center" style={{fontWeight:"bold"}} >Description</TableCell>
                        <TableCell align="center" style={{fontWeight:"bold"}} >Utilisateur OA</TableCell>
                        <TableCell align="center" style={{fontWeight:"bold"}} >Taux horaire</TableCell>
                        <TableCell align="center" style={{fontWeight:"bold"}} >Durée</TableCell>
                        <TableCell align="center" style={{fontWeight:"bold"}} >Total</TableCell>


                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {(row.lignes_facture || []).map((lf,key) => (
                          <TableRow key={key}>
                            {
                              row.statut === "wait" &&
                              <TableCell component="th" scope="row" align="center" >
                                <IconButton size="small" color="default" onClick={() => {
                                  setSelectedFacture(row)
                                  setSelectedRow(lf)
                                  const row_copy = lf;
                                  setDuration(utilFunctions.formatDuration(row_copy.newTime.duree.toString()))
                                  setToUpdated_date(new Date(row_copy.newTime.date))
                                  setToUpdated_rate(row_copy.newTime.rateFacturation)
                                  setToUpdated_OAUser(row_copy.newTime.utilisateurOA)
                                  setToUpdated_desc(row_copy.newTime.description)
                                  setShowUpdateModal(true)
                                }}
                                >
                                  <EditIcon fontSize="small"/>
                                </IconButton>
                                <IconButton size="small" onClick={() => {
                                  setSelectedFacture(row)
                                  setSelectedRow(lf)
                                  setOpenDeleteLfModal(true)
                                }}
                                >
                                  <DeleteOutlineIcon color="error" fontSize="small"/>
                                </IconButton>
                              </TableCell>
                            }

                            <TableCell component="th" scope="row" align="center" >
                              {moment(lf.newTime.date).format("DD-MM-YYYY")}
                            </TableCell>
                            <TableCell align="center">{lf.newTime.description}</TableCell>
                            <TableCell align="center">{lf.newTime.utilisateurOA}</TableCell>
                            <TableCell align="center">{lf.newTime.rateFacturation + " CHF"}</TableCell>
                            <TableCell align="center">
                              {utilFunctions.formatDuration(lf.newTime.duree.toString())}
                            </TableCell>
                            <TableCell align="center">
                              {(lf.newTime.duree * parseInt(lf.newTime.rateFacturation)).toFixed(2)}&nbsp;CHF
                            </TableCell>
                          </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                  {
                    row.statut === "wait" &&
                    <div>
                      <div className="row mt-2">
                        {/*<div className="col-md-4">
                          <h6>Dossier client</h6>
                          <select className="form-control custom-select"
                              value={client}
                              onChange={(e) => {
                                setClient(e.target.value)
                              }}>
                            <option key={-1} value={""}/>
                            {
                              selected_client_folders.map((folder,key) =>
                                  <option key={key} value={folder.folder_id}>{folder.name}</option>
                              )
                            }

                          </select>
                        </div>*/}
                        <div className="col-md-4">
                          <h6>Choix du template(description) </h6>
                          <select
                              className="form-control custom-select"
                              value={template}
                              onChange={(e) => {
                                setTemplate(e.target.value)

                              }}>
                            {
                              data.lf_templates.map((item,key) =>
                                  <option key={key} value={item.value}>{item.label}</option>
                              )
                            }

                          </select>
                        </div>
                        <div className="col-md-4">
                          <h6>Compte bancaire</h6>
                          <select
                              className="form-control custom-select"
                              value={compte_banc}
                              onChange={(e) => {
                                setCompte_banc(e.target.value)
                                console.log(e.target.value)
                              }}>
                            {
                              data.oa_comptes_bank_factures.map((item,key) =>
                                  <option key={key} value={item.odoo_id}>{item.label}</option>
                              )
                            }

                          </select>
                        </div>
                        <div className="col-md-4">
                          <h6>Conditions de paiement</h6>
                          <select
                              className="form-control custom-select"
                              value={paymTerm}
                              onChange={(e) => {
                                setPaymTerm(e.target.value)
                                console.log(e.target.value)
                              }}
                              defaultValue={"3"}>

                            {
                              (props.paymTerms || []).map((item,key) =>
                                  <option key={key} value={item.id}>{item.display_name}</option>
                              )
                            }

                          </select>
                        </div>
                      </div>
                      <div className="row mt-2">

                        <div className="col-md-4">
                          <h6>Taxe</h6>
                          <select
                              className="form-control custom-select"
                              value={tax}
                              onChange={(e) => {
                                setTax(e.target.value)
                                console.log(e.target.value)

                              }}
                              defaultValue={"13"}
                          >
                            {
                              (props.taxs || []).map((item,key) =>
                                  <option key={key} value={item.id}>{item.display_name}</option>
                              )
                            }
                          </select>
                        </div>
                        <div className="col-md-4">
                          <h6>Frais administratifs</h6>
                          <select
                              className="form-control custom-select"
                              value={fraisAdmin}
                              onChange={(e) => {
                                setFraisAdmin(e.target.value)
                                console.log(e.target.value)

                              }}
                          >
                            <option value="">Aucun</option>
                            <option value="2%">2%</option>
                          </select>
                        </div>
                        <div className="col-md-4">
                          <h6>Réduction</h6>
                          <Sinput
                              label={
                                <Dropdown defaultValue='%' options={[{key:"0",text:"%",value:"%"},{key:"1",text:"CHF",value:"CHF"}]}
                                          value={reductionType}
                                          onChange={(e,{value}) => {
                                            console.log(value)
                                            setReductionType(value)
                                          }}
                                />
                              }
                              labelPosition='right'
                              placeholder='Réduction'
                              value={reductionAmount}
                              onChange={(event, data1) => {
                                console.log(event.target.value)
                                setReductionAmount(event.target.value)
                              }}
                              size="mini"
                          />
                        </div>
                      </div>

                      <div align="right" style={{marginTop:20}}>
                        <AltButtonGroup>
                          <AtlButton onClick={() => {
                            if(verif_access === true){
                              props.previewFacture(row,props.index,template,client,paymTerm,deadline_date,tax,fraisAdmin,compte_banc,reductionType,reductionAmount)
                            }else{
                              alert("Vous n'avez pas les droits et l'accès au dossier CLIENTS pour effectuer cette opération !")
                            }
                          }}
                                     appearance="warning">
                            Preview
                          </AtlButton>
                          <AtlButton onClick={() => {
                            if(verif_access === true){
                              props.validateFacture(row,props.index,template,client,paymTerm,deadline_date,tax,fraisAdmin,compte_banc,reductionType,reductionAmount)
                            }else{
                              alert("Vous n'avez pas les droits et l'accès au dossier CLIENTS pour effectuer cette opération !")
                            }
                          }}
                                     appearance="primary">
                            Valider la facture
                          </AtlButton>
                        </AltButtonGroup>

                      </div>
                    </div>
                  }
                </div>
              </Box>

            </Collapse>
          </TableCell>
        </TableRow>


        <Dialog open={showUpdateModal} maxWidth="md" fullWidth={true}    onClose={() => {
          setShowUpdateModal(false)
        }}
                aria-labelledby="form-dialog-title"
        >
          <DialogTitle disableTypography id="form-dialog-title">
            <Typography variant="h6">Modifier</Typography>
            <IconButton aria-label="close"
                        style={{position: 'absolute', right: 5, top: 5, color: "#c0c0c0"}}
                        onClick={() => {

                          setShowUpdateModal(false)
                        }}>
              <CloseIcon/>
            </IconButton>
          </DialogTitle>

          <DialogContent>

            <div>
              <div className="row mt-2">
                <div className="col-md-6">
                  <h5>Durée</h5>
                  <div className="row">
                    <div className="col-md-5">
                      <Autosuggest
                          suggestions={timeSuggestions}
                          onSuggestionsFetchRequested={onTimeSuggestionsFetchRequested}
                          onSuggestionsClearRequested={onTimeSuggestionsClearRequested}
                          onSuggestionSelected={(event, {suggestion}) => console.log(suggestion)}
                          getSuggestionValue={suggestion => suggestion}
                          renderSuggestion={suggestion => (
                              <div>{suggestion}</div>)}
                          inputProps={inputSuggProps}
                      />
                    </div>
                  </div>
                </div>
                <div className="col-md-6">
                  <div style={{width: "100%"}}>
                    <h5>Date</h5>
                    <DatePicker
                        calendarIcon={
                          <img alt="" src={calendar} style={{width: 20}}/>}
                        onChange={(e) => {
                          console.log(e)
                          setToUpdated_date(e)
                        }}
                        value={toUpdated_date}
                    />
                  </div>
                </div>
              </div>
              <div className="row mt-3" style={{marginBottom:80}}>
                <div className="col-md-6">
                  <div>
                    <div>
                      <h5>Description</h5>
                    </div>
                    <textarea
                        className="form-control "
                        id="duree"
                        style={{width: "85%"}}
                        name="duree"
                        rows={5}
                        value={toUpdated_desc}
                        onChange={(e) => {
                          setToUpdated_desc(e.target.value)
                        }}/>
                  </div>
                </div>
                <div className="col-md-6">
                  <div>
                    <h6>Utilisateur OA </h6>
                  </div>

                  <MuiSelect
                      labelId="demo-simple-select-label4545"
                      id="demo-simple-select4545"
                      style={{width: 300}}
                      onChange={(e) => {
                        setToUpdated_OAUser(e.target.value)

                        let OA_contacts = props.contacts;
                        let OA_contact = "";
                        OA_contacts.map((contact, key) => {
                          if (contact && contact.email && contact.email === e.target.value) {
                            OA_contact = contact
                          }
                        })
                        setToUpdated_rate(OA_contact.rateFacturation || "")
                      }}
                      value={toUpdated_OAUser}
                  >
                    {props.contacts.map((contact, key) => (
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
                        id="duree68797"
                        style={{width: "300px"}}
                        name="duree68797"
                        type="text"
                        endAdornment={
                          <InputAdornment
                              position="end">CHF:Hr</InputAdornment>}

                        value={toUpdated_rate}
                        onChange={(e) => {
                          setToUpdated_rate(e.target.value)
                        }}/>
                  </div>
                </div>
              </div>
              <div style={{marginTop:20,textAlign:"right"}}>
                <AtlButton
                    isDisabled={ toUpdated_rate === "" || toUpdated_OAUser === ''}
                    appearance="primary"
                    onClick={() => {
                      let newItem = selectedRow;
                      newItem.checked = "false"
                      newItem.newTime.utilisateurOA = toUpdated_OAUser
                      newItem.newTime.rateFacturation = toUpdated_rate
                      newItem.newTime.description = toUpdated_desc
                      newItem.newTime.date = moment(toUpdated_date).format("YYYY-MM-DD :HH:mm:ss")

                      let time = duration;
                      let regexFormat = /^[0-9]{1,2}h[0-9]{0,2}$/
                      if(regexFormat.test(time) === true){
                        let duree = utilFunctions.durationToNumber(time);
                        if(duree === 0){
                          props.openSnackbar('error', 'La durée doit etre supérieur à zéro !');
                        }else{
                          newItem.newTime.duree = utilFunctions.durationToNumber(duration)
                          let facture = selectedFacture
                          let findLigneIndex = (facture.lignes_facture || []).findIndex(x => x.id === newItem.id);
                          if(findLigneIndex > -1){
                            facture.lignes_facture[findLigneIndex] = newItem;
                            console.log(facture)
                            props.updateFacture(facture.id,facture)
                            setShowUpdateModal(false)
                          }else{
                            props.openSnackbar('error', 'Une erreur est survenue !');
                          }
                        }
                      }else{
                        props.openSnackbar('error', 'Le format de la durée est invalide ! Veuillez utiliser le format --h--');
                      }
                    }}>
                  Modifier</AtlButton>
              </div>
            </div>

          </DialogContent>
        </Dialog>

        <ModalTransition>
          {openDeleteLfModal === true && (
              <Modal
                  actions={[
                    { text: 'Supprimer', onClick: () => {

                        let facture = selectedFacture;
                        if(facture.lignes_facture.length > 1){

                          let findLigneIndex = (facture.lignes_facture || []).findIndex(x => x.id === selectedRow.id);
                          if(findLigneIndex > -1){
                            (facture.lignes_facture || []).splice(findLigneIndex,1);
                            props.updateFacture(facture.id,facture)
                            setOpenDeleteLfModal(false)
                          }else{
                            setOpenDeleteLfModal(false)
                            props.openSnackbar('error', 'Une erreur est survenue !');
                          }
                        }else{
                          setOpenDeleteLfModal(false)
                          props.openSnackbar('warning', 'Une facture doit comporter au moins une ligne facture !');
                        }

                      } },
                    { text: 'Annuler', onClick: () => {

                        setOpenDeleteLfModal(false)
                      }},
                  ]}
                  onClose={() => {
                    setOpenDeleteLfModal(false)
                  }}
                  heading="Vous êtes sur le point de supprimer cette ligne facture !"
                  appearance="danger"
              >
              </Modal>
          )}
        </ModalTransition>

      </React.Fragment>
  );
}
