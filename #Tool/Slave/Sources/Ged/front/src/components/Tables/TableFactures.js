import React from 'react';
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
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import moment from 'moment';
import EditIcon from '@material-ui/icons/Edit';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import AtlButton from '@atlaskit/button';
import PictureAsPdfIcon from '@material-ui/icons/PictureAsPdf';
import FolderIcon from '@material-ui/icons/Folder';
import SmartService from '../../provider/SmartService';
import { Select as MuiSelect } from '@material-ui/core';
import MenuItem from '@material-ui/core/MenuItem';
import data from "../../data/Data"
import DatePicker from 'react-date-picker';
import calendar from '../../assets/icons/calendar_icon.jpg';
import SelectSearch from 'react-select-search';
import main_functions from '../../controller/main_functions';
import ClearOutlinedIcon from '@material-ui/icons/ClearOutlined';
import Modal, { ModalTransition } from '@atlaskit/modal-dialog';

const useRowStyles = makeStyles({
  root: {
    '& > *': {
      borderBottom: 'unset',
    },
  },
});

export default function CollapsibleTable(props) {

  const [client_search, setClient_search] = React.useState("");
  const [sdate_search, setSdate_search] = React.useState(null);
  const [edate_search, setEdate_search] = React.useState(null);
  const [statut_search, setStatut_search] = React.useState("tous");
  const [openDeleteModal, setOpenDeleteModal] = React.useState(false);
  const [f_TooDeleted, setF_TooDeleted] = React.useState("");


  let factures = props.factures.filter(x => x.partner === localStorage.getItem("email"));

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
                      <TableCell align="center" style={{fontWeight:"bold"}} >Numéro Facture</TableCell>
                      <TableCell align="center" style={{fontWeight:"bold"}} >Date de création</TableCell>
                      <TableCell align="center" style={{fontWeight:"bold"}} >Date Facture</TableCell>
                      <TableCell align="center" style={{fontWeight:"bold"}} >Client</TableCell>
                      <TableCell align="center" style={{fontWeight:"bold"}} >Nom du dossier</TableCell>
                      <TableCell align="center" style={{fontWeight:"bold"}} >Total(nb heures)</TableCell>
                      <TableCell align="center" style={{fontWeight:"bold"}} >Total (CHF)</TableCell>
                      <TableCell align="center" style={{fontWeight:"bold"}} >Statut</TableCell>
                      <TableCell align="center" style={{fontWeight:"bold"}} >Actions</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {
                      searchFilter.map((row,key) => (
                          <Row key={key} row={row} index={key} validateFacture={props.validateFacture} openFacture={props.openFacture}
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


      </TableContainer>
  );
}


function Row(props) {

  const [template, setTemplate] = React.useState("0");
  const [client, setClient] = React.useState("");

  const { row } = props;
  const [open, setOpen] = React.useState(false);


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
          <TableCell component="th" scope="row" align="center">
            {"facture n°" + (props.index+1).toString()}
          </TableCell>
          <TableCell align="center">{moment(row.created_at).format("DD-MM-YYYY")}</TableCell>
          <TableCell align="center">{moment(row.date_facture).format("DD-MM-YYYY")}</TableCell>
          <TableCell align="center">{row.client}</TableCell>
          <TableCell align="center">{row.client_folder.name}</TableCell>
          <TableCell align="center">{nb_heures.toFixed(2) + " h"}</TableCell>
          <TableCell align="center">{total + " CHF"}</TableCell>
          <TableCell align="center">
          <span className={row.statut === "wait" ? "badge badge-warning text-white p-1" : "badge badge-success text-white p-1"}>
            {row.statut === "wait" ? "En attente" : "Validée"}</span>
          </TableCell>
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
            <IconButton aria-label="folder" title="Supprimer" color="default" size="small"
                        onClick={() => {
                          if(row.statut === "wait"){
                            props.showDeleteModal(row.id)
                          }
                        }}
            >
              <DeleteOutlineIcon fontSize="small" style={{color:"red"}} />
            </IconButton>
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={9}>
            <Collapse in={open} timeout="auto" unmountOnExit>
              <Box margin={1}>
                <Typography variant="h6" gutterBottom component="div">
                  Lignes factures
                </Typography>
                <Table size="small" aria-label="purchases">
                  <TableHead>
                    <TableRow>
                      <TableCell align="center" style={{fontWeight:"bold"}} >Date</TableCell>
                      <TableCell align="center" style={{fontWeight:"bold"}} >Description</TableCell>
                      <TableCell align="center" style={{fontWeight:"bold"}} >Utilisateur OA</TableCell>
                      <TableCell align="center" style={{fontWeight:"bold"}} >Taux horaire</TableCell>
                      <TableCell align="center" style={{fontWeight:"bold"}} >Durée</TableCell>
                      {/*{
                      row.statut === "wait" &&
                      <TableCell align="center" style={{fontWeight:"bold"}} >Actions</TableCell>
                    }*/}
                      <TableCell align="center" style={{fontWeight:"bold"}} >Total</TableCell>

                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {(row.lignes_facture || []).map((lf,key) => (
                        <TableRow key={key}>
                          <TableCell component="th" scope="row" align="center" >
                            {moment(lf.newTime.date).format("DD-MM-YYYY")}
                          </TableCell>
                          <TableCell align="center">{lf.newTime.description}</TableCell>
                          <TableCell align="center">{lf.newTime.utilisateurOA}</TableCell>
                          <TableCell align="center">{lf.newTime.rateFacturation + " CHF"}</TableCell>
                          <TableCell align="center">
                            {lf.newTime.duree + " h"}
                          </TableCell>
                          <TableCell align="center">
                            {(lf.newTime.duree * parseInt(lf.newTime.rateFacturation)).toFixed(2)}&nbsp;CHF
                          </TableCell>
                          {/*{
                        row.statut === "wait" &&
                        <TableCell align="center">
                          <IconButton aria-label="Modifier" title="Modifier" color="default" size="small"
                                      onClick={() => {}}>
                            <EditIcon fontSize="small" style={{color:"#1a73e8"}}/>
                          </IconButton>
                          <IconButton aria-label="folder" title="folder" color="default" size="small" onClick={() => {
                          }}>
                            <DeleteOutlineIcon fontSize="small" style={{color:"red"}} />
                          </IconButton>
                        </TableCell>
                      }*/}

                        </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </Box>
              {
                row.statut === "wait" &&
                <div>
                  <div className="row">
                    <div className="col-md-4">
                      <h5>Dossier client</h5>
                      <MuiSelect
                          labelId="demo-simple-select-label68798"
                          id="demo-simple-select776879"
                          style={{ width: '100%' }}
                          value={client}
                          onChange={(e) => {
                            setClient(e.target.value)
                          }}
                      >
                        {
                          selected_client_folders.map((folder,key) => (
                              <MenuItem key={key}
                                        value={folder.folder_id}>{folder.name}</MenuItem>
                          ))
                        }
                      </MuiSelect>
                    </div>
                    <div className="col-md-4">
                      <h6>Choix du template </h6>
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
                  </div>
                  <div align="right" style={{marginTop:20}}>
                    <AtlButton onClick={() => {
                      if(verif_access === true){
                        props.validateFacture(row,props.index,template,client)
                      }else{
                        alert("Vous n'avez pas les droits et l'accès au dossier CLIENTS pour effectuer cette opération !")
                      }

                    }}
                               isDisabled={client === ""}
                               appearance="primary">
                      Valider la facture
                    </AtlButton>
                  </div>
                </div>

              }

            </Collapse>
          </TableCell>
        </TableRow>
      </React.Fragment>
  );
}