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

const useRowStyles = makeStyles({
  root: {
    '& > *': {
      borderBottom: 'unset',
    },
  },
});

export default function CollapsibleTable(props) {



  return (
    <TableContainer component={Paper}>
      {
        props.factures.filter(x => x.partner === localStorage.getItem("email")).length > 0 ?

          <Table aria-label="collapsible table">
            <TableHead>
              <TableRow>
                <TableCell />
                <TableCell align="center" style={{fontWeight:"bold"}} >Numéro Facture</TableCell>
                <TableCell align="center" style={{fontWeight:"bold"}} >Client</TableCell>
                <TableCell align="center" style={{fontWeight:"bold"}} >Nom du dossier</TableCell>
                <TableCell align="center" style={{fontWeight:"bold"}} >Date de création</TableCell>
                <TableCell align="center" style={{fontWeight:"bold"}} >Total(nb heures)</TableCell>
                <TableCell align="center" style={{fontWeight:"bold"}} >Total (CHF)</TableCell>
                <TableCell align="center" style={{fontWeight:"bold"}} >Statut</TableCell>
                <TableCell align="center" style={{fontWeight:"bold"}} >Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {props.factures.filter(x => x.partner === localStorage.getItem("email")).map((row,key) => (
                <Row key={key} row={row} index={key} validateFacture={props.validateFacture} openFacture={props.openFacture} openFactureFolder={props.openFactureFolder} client_folders={props.client_folders}  />
              ))}
            </TableBody>
          </Table> :

          <h6>Aucune facture trouvée</h6>
      }

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

    let client_folders = props.client_folders || [];
    let selected_client = client_folders.Content ? client_folders.Content.folders.find(x => x.name === row.client) : undefined
    let selected_client_folders = selected_client ?  selected_client.Content.folders : [];


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
        <TableCell align="center">{row.client}</TableCell>
        <TableCell align="center">{row.client_folder.name}</TableCell>
        <TableCell align="center">{moment(row.created_at).format("DD-MM-YYYY")}</TableCell>
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
          <IconButton aria-label="folder" title="Supprimer" color="default" size="small" onClick={() => {
          }}>
            <DeleteOutlineIcon fontSize="small" style={{color:"red"}} />
          </IconButton>
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={8}>
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
                    <TableCell align="center" style={{fontWeight:"bold"}} >Actions</TableCell>
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
                        <IconButton aria-label="Modifier" title="Modifier" color="default" size="small"
                                    onClick={() => {}}>
                          <EditIcon fontSize="small" style={{color:"#1a73e8"}}/>
                        </IconButton>
                        <IconButton aria-label="folder" title="folder" color="default" size="small" onClick={() => {
                        }}>
                          <DeleteOutlineIcon fontSize="small" style={{color:"red"}} />
                        </IconButton>
                      </TableCell>
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
                                      value={folder.id || folder.key}>{folder.name}</MenuItem>
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
                      props.validateFacture(row,props.index,template,client)
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

