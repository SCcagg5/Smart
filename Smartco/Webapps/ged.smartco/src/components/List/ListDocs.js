import React, { useState } from 'react';
import IconButton from '@material-ui/core/IconButton';
import moment from 'moment';
import MenuItem from '@material-ui/core/MenuItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import Typography from '@material-ui/core/Typography';
import Menu from '@material-ui/core/Menu';
import VisibilityIcon from '@material-ui/icons/Visibility';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import EditIcon from '@material-ui/icons/Edit';
import GetAppIcon from '@material-ui/icons/GetApp';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import SmartService from '../../provider/SmartService';
import Slide from '@material-ui/core/Slide';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { Modal, ModalBody, ModalHeader } from 'reactstrap';
import GestureIcon from '@material-ui/icons/Gesture';
import DescriptionIcon from '@material-ui/icons/Description';
import DataTable from 'react-data-table-component';
import MoreVertIcon from '@material-ui/icons/MoreVert';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const paginationOptions = { rowsPerPageText: 'documents par page', rangeSeparatorText: 'de', selectAllRowsItem: true, selectAllRowsItemText: 'Tous' }
const tableContextMessage = {singular:"document",plural:"documents",message:"sélectionnés"}
const customTableStyles = {
  header: {
    style: {
      minHeight: '56px'
    },
  },
  headRow: {
    style: {
      borderBottomStyle: 'solid',
      borderBottomWidth: '0px',
      borderBottomColor: "#000"
    },
  },
  headCells: {
    style: {
      color: "#000"
    }
  }
}


export default function ListDocs(props) {

  const columns = [
    {
      name: 'Action',
      selector: '',
      sortable: false,
      cell:(row, index, column, id) => {
        return(
            <IconButton color="default"
                        onClick={(event) => {
                          onDocContextMenu(event,row)
                        }}
            >
          <MoreVertIcon/>
        </IconButton>)
      },
      grow: 0,
      center: true
    },
    {
      name: "Nom",
      selector: 'name',
      sortable: true,
      cell:(row, index, column, id) => {
        return(
            <div style={{cursor:"pointer",color:"#000",fontWeight:500,display:"flex"}}
                 onClick={() => {props.onDocClick(row);}}
            >
              <IconButton color="default">
                <DescriptionIcon
                    style={{color: 'red', backgroundColor: '#fff'}} />
              </IconButton>
              <div style={{alignSelf:"center"}}>{row.name + ".pdf"}</div>
            </div>
        )},
      grow:3
    },
    {
      name: "Propriétaire",
      selector: 'proprietary',
      sortable: true,
      cell:(row, index, column, id) => {return row.proprietary ? row.proprietary === localStorage.getItem("email") ? "Moi" : row.proprietary :"Moi"},
      center:true
    },
    {
      name: "Date de création",
      selector: 'date',
      sortable: true,
      cell:(row, index, column, id) => {return moment(parseInt(row.date)).format('DD MMMM YYYY HH:mm:ss')},
      grow:2
    },
    {
      name: "Taille",
      selector: '',
      sortable: false,
      cell:(row, index, column, id) => {return "-- Ko"}
    }
  ];

  const [anchorEl, setAnchorEl] = useState(null);
  const [doc, setDoc] = useState('');
  const [openRenameeModal, setOpenRenameModal] = useState(false);
  const [newFileName, setNewFileName] = useState('');
  const [open, setOpen] = React.useState(false);
  const [rights, setRights] = React.useState(null );
  const [selectedRows, setSelectedRows] = React.useState([] );
  const selected_docs = props.docs.filter(x => x.selected && x.selected === true);


  const onDocContextMenu = (event,item) => {
    event.preventDefault();
    props.setSelectedFile(item)
    setDoc(item);
    if(props.applyRights === true && item.rights){
      if(item.proprietary === localStorage.getItem("email")){
        setRights(null)
      }else{
        setRights(item.rights)
      }
    }
    setNewFileName(item.name);
    setAnchorEl(event.currentTarget);
  }

  return (
    <div
      onDragOver={e => {
        e.preventDefault();
        e.stopPropagation();
      }}
      onDragLeave={(e) => {
        e.preventDefault();
        e.stopPropagation();
      }}
      onDrop={e => {
        e.preventDefault();
        e.stopPropagation();
        if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
          props.onDropFile(e.dataTransfer.files);
          e.dataTransfer.clearData();
        }
      }}
      style={{ overflow:'overlay',height:800 }}
    >
      <h5 style={{ marginTop: 20,marginBottom:15 }}>Fichiers ({props.docs.length})</h5>
      {
        selected_docs.length > 1 &&
          <div style={{display:"flex",justifyContent:"space-between"}}>
            <h6>{selected_docs.length+" fichiers sélectionnés"}</h6>
            <div align="right">
              <IconButton title="Supprimer" color="secondary" style={{marginTop:-7,marginRight:10}}
                          onClick={() => {
                            props.onDeleteFiles(selected_docs)
                          }}
              >
                <DeleteOutlineIcon />
              </IconButton>
            </div>
          </div>
      }
      {
        (props.docs || []).map((item, key) =>
          props.viewMode === 'grid' ?
            <div key={key} className="cf_itemDoc">
                            <span className="cf-itemDoc_preview" onClick={() => props.onDocClick(item)}
                                  onContextMenu={(event) => {
                                    event.preventDefault();
                                    props.setSelectedFile(item);
                                    setDoc(item);
                                    setNewFileName(item.name);
                                    setAnchorEl(event.currentTarget);
                                  }}
                            >
                                <img alt=""
                                     src={item.thumbnail || require('../../assets/icons/icon-pdf.png')}
                                     className={item.thumbnail ? 'cf-itemDoc_preview_image' : 'cf-itemDoc_preview_staticImg'} />
                                <div
                                  className="cf_itemDoc_preview_details">
                                    <div
                                      className="cf_itemDoc_preview_details_title">
                                        {item.name + '.pdf'}
                                    </div>
                                    <span style={{marginTop:6}}
                                      className="badge bg-soft-blue text-blue font-weight-bolder p-1">{moment(parseInt(item.date)).format('DD-MM-YYYY hh:mm')}</span>
                                </div>

                            </span>
            </div> : null
        )
      }
      {
        props.viewMode === "list" &&
            <div style={{marginTop:10}}>
              {
                selectedRows.length > 0 &&
                <div style={{backgroundColor:"#e3f2fd",padding:5,display:"flex",justifyContent:"space-between"}}>
                  {
                    selectedRows.length > 0 &&
                    <div style={{alignSelf:"center",color:"rgba(0, 0, 0, 0.87)",fontSize:16,
                      fontFamily:"-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;"}}>
                      {selectedRows.length === 1 ? selectedRows.length + " document sélectioné" : selectedRows.length + " documents sélectionnés"}
                    </div>
                  }
                  <div>
                    <IconButton color="default"
                                onClick={() => {props.onDeleteFiles(selectedRows)}}
                    >
                      <DeleteOutlineIcon color="error" />
                    </IconButton>
                  </div>
                </div>
              }

              <DataTable
                  columns={columns}
                  data={props.docs || []}
                  defaultSortField="name"
                  selectableRows={true}
                  selectableRowsHighlight={true}
                  onSelectedRowsChange={selected => {
                    setSelectedRows(selected.selectedRows)
                  }}
                  dense={false}
                  pagination={true}
                  paginationPerPage={20}
                  paginationComponentOptions={paginationOptions}
                  highlightOnHover={true}
                  striped={true}
                  contextMessage={tableContextMessage}
                  //progressPending={loadingEnregistrements === true}
                  progressComponent={<h6>Chargement...</h6>}
                  noDataComponent="Aucun fichier encore ajouté"
                  customStyles={customTableStyles}

              />
            </div>

      }
      <Menu id="right-menu_doc"
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={() => setAnchorEl(null)}
      >
        <MenuItem key={1} onClick={() => {
          setAnchorEl(null);
          props.showDoc(doc);
        }}
                  disabled={props.applyRights === true && rights !== null ? (rights.read === false) : false }
        >
          <ListItemIcon>
            <VisibilityIcon fontSize="small" />
          </ListItemIcon>
          <Typography variant="inherit">Aperçu</Typography>
        </MenuItem>
        <MenuItem key={2} onClick={() => {
          setAnchorEl(null);
          props.openShareFileModal();
        }}
                  disabled={props.applyRights === true && rights !== null ? (rights.share === false) : false }
        >
          <ListItemIcon>
            <PersonAddIcon fontSize="small" />
          </ListItemIcon>
          <Typography variant="inherit">Partager</Typography>
        </MenuItem>
        <MenuItem key={3} onClick={() => {
          setAnchorEl(null);
          props.onSignBtnClick(doc.id);
        }}
                  disabled={props.applyRights === true && rights !== null ? (rights.edit === false) : false }
        >
          <ListItemIcon>
            <GestureIcon fontSize="small" />
          </ListItemIcon>
          <Typography variant="inherit">Signer</Typography>
        </MenuItem>
        <MenuItem key={4} onClick={() => {
          setAnchorEl(null);
          setOpenRenameModal(true);
        }}
                  disabled={props.applyRights === true && rights !== null ? (rights.edit === false) : false }
        >
          <ListItemIcon>
            <EditIcon fontSize="small" />
          </ListItemIcon>
          <Typography variant="inherit">Renommer</Typography>
        </MenuItem>
        <MenuItem key={5} onClick={() => {
          setAnchorEl(null);
          props.setLoading(true);
          SmartService.getFile(doc.id, localStorage.getItem('token'), localStorage.getItem('usrtoken')).then(fileRes => {
            if (fileRes.succes === true && fileRes.status === 200) {
              let a = document.createElement('a'); //Create <a>
              a.href = 'data:application/pdf;base64,' + fileRes.data.Content.Data;
              a.download = doc.name + '.pdf'; //File name Here
              props.setLoading(false);
              a.click();
            } else {
              console.log(fileRes.error);
            }
          }).catch(err => console.log(err));
        }}
                  disabled={props.applyRights === true && rights !== null ? (rights.read === false) : false }
        >
          <ListItemIcon>
            <GetAppIcon fontSize="small" />
          </ListItemIcon>
          <Typography variant="inherit">Télécharger</Typography>
        </MenuItem>
        <MenuItem key={6} onClick={() => {
          setAnchorEl(null);
          setOpen(true);
        }} //disabled={localStorage.getItem("role") !== "admin"}
                  disabled={props.applyRights === true && rights !== null ? (rights.administrate === false) : false }
        >
          <ListItemIcon>
            <DeleteOutlineIcon fontSize="small" />
          </ListItemIcon>
          <Typography variant="inherit">Supprimer</Typography>
        </MenuItem>
      </Menu>

      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={() => setOpen(false)}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle id="alert-dialog-slide-title"
                     style={{ width: '90%' }}>{'Voulez-vous vraiment supprimer le fichier ' + doc.name + '.pdf' + ' ?'}</DialogTitle>
        <DialogContent>
          <div align="center" style={{ marginTop: 5, marginBottom: 5 }}>
            <div className="avatar-lg rounded-circle bg-soft-danger border-danger">
              <i className="mdi mdi-close-circle-outline avatar-title text-danger" style={{ fontSize: 42 }} />
            </div>
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)} color="default"
                  style={{ textTransform: 'Capitalize', fontWeight: 'bold' }}>
            Annuler
          </Button>
          <Button onClick={() => {
            setOpen(false)
            props.onDeleteFile(doc);
          }}
                  color="secondary" style={{ textTransform: 'Capitalize', fontWeight: 'bold' }} variant="contained">
            Confirmer
          </Button>
        </DialogActions>
      </Dialog>

      <Modal isOpen={openRenameeModal} size="md" centered={true} zIndex={1500}
             toggle={() => {
               setOpenRenameModal(false);
             }}
      >
        <ModalHeader toggle={() => {
          setOpenRenameModal(false);
        }}>
          Renommer
        </ModalHeader>
        <ModalBody>

          <div style={{ marginTop: 20 }}>
            <input className="form-control" placeholder="Renommer" value={newFileName}
                   onChange={event => setNewFileName(event.target.value)} style={{ height: 40 }}
                   type="text"
            />
          </div>
          <div style={{ marginTop: 15, textAlign: 'right' }}>
            <button className="btn btn-light  font-weight-normal m-1"
                    style={{ fontFamily: 'sans-serif' }}
                    onClick={() => {
                      setOpenRenameModal(false);
                    }}
            >
              Annuler
            </button>
            <button className="btn btn-success  font-weight-normal m-1"
                    style={{ fontFamily: 'sans-serif' }}
                    onClick={() => {
                      setOpenRenameModal(false);
                      props.onRenameFile(doc, newFileName);
                    }}
            >
              OK
            </button>
          </div>

        </ModalBody>
      </Modal>
    </div>

  );

}