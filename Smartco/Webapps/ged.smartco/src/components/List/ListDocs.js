import React, {useState} from "react";
import IconButton from "@material-ui/core/IconButton";
import PictureAsPdfIcon from "@material-ui/icons/PictureAsPdf";
import moment from "moment";
import MenuItem from "@material-ui/core/MenuItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import Typography from "@material-ui/core/Typography";
import Menu from "@material-ui/core/Menu";
import VisibilityIcon from '@material-ui/icons/Visibility';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import StarBorderIcon from '@material-ui/icons/StarBorder';
import EditIcon from '@material-ui/icons/Edit';
import GetAppIcon from '@material-ui/icons/GetApp';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import SmartService from "../../provider/SmartService";
import Slide from '@material-ui/core/Slide';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import {Modal, ModalBody, ModalHeader} from "reactstrap";
import GestureIcon from '@material-ui/icons/Gesture';
import DescriptionIcon from '@material-ui/icons/Description';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export default function ListDocs(props) {

    const [anchorEl, setAnchorEl] = useState(null);
    const [doc, setDoc] = useState("");
    const [openRenameeModal, setOpenRenameModal] = useState(false);
    const [newFileName, setNewFileName] = useState("");

    const [open, setOpen] = React.useState(false);

    return(
        <div>
            <h5 style={{marginTop:15}}>Fichiers ({props.docs.length})</h5>
            {
                props.viewMode === "list" && props.docs.length > 0 &&
                <div className="list_view_item">
                    <div
                        style={{width: 56}}>
                        <h6 style={{color: "#000"}}>Type</h6>
                    </div>
                    <div
                        style={{width: 300}}>
                        <h6 style={{color: "#000"}}>Nom</h6>
                    </div>
                    <div
                        style={{width: 215}}>
                        <h6 style={{color: "#000"}}>Propriétaire</h6>
                    </div>
                    <div
                        style={{width: 200}}>
                        <h6 style={{color: "#000"}}>Date de création</h6>
                    </div>
                    <div
                        style={{width: 150}}>
                        <h6 style={{color: "#000"}}>Taille</h6>
                    </div>
                </div>
            }
            {
                (props.docs || []).map((item, key) =>
                    props.viewMode === "grid" ?
                        <div key={key} className="cf_itemDoc">
                            <span className="cf-itemDoc_preview" onClick={() => props.onDocClick(item)} onContextMenu={(event) => {
                                event.preventDefault();
                                props.setSelectedFile(item)
                                setDoc(item)
                                setNewFileName(item.name)
                                setAnchorEl(event.currentTarget)
                            }}
                            >
                                <img alt=""
                                     src={item.thumbnail || require("../../assets/icons/icon-pdf.png")}
                                     className={item.thumbnail ? "cf-itemDoc_preview_image" : "cf-itemDoc_preview_staticImg"}/>
                                <div
                                    className="cf_itemDoc_preview_details">
                                    <div
                                        className="cf_itemDoc_preview_details_title">
                                        {item.name + ".pdf"}
                                    </div>
                                    <span className="badge bg-soft-warning text-warning font-weight-bolder p-1">En attente</span>
                                </div>

                            </span>
                        </div> :

                        <div key={key} className="list_view_item"
                             onClick={() => props.onDocClick(item)}  onContextMenu={(event) => {
                            event.preventDefault();
                            props.setSelectedFile(item)
                            setDoc(item)
                            setNewFileName(item.name)
                            setAnchorEl(event.currentTarget)
                        }}
                        >
                            <div style={{width: 56}}>
                                <IconButton
                                    color="default">
                                    <DescriptionIcon
                                        style={{
                                            color: "red",
                                            backgroundColor: "#fff"
                                        }}/>
                                </IconButton>
                            </div>
                            <div
                                style={{width: 300}}>
                                <h6>{item.name + ".pdf"}</h6>
                            </div>
                            <div
                                style={{width: 215}}>
                                <h6 style={{color: "grey"}}>Moi</h6>
                            </div>
                            <div
                                style={{width: 200}}>
                                <h6 style={{color: "grey"}}>{moment(parseInt(item.date)).format("DD MMMM YYYY hh:mm")}</h6>
                            </div>
                            <div
                                style={{width: 150}}>
                                <h6 style={{color: "grey"}}>50 Ko</h6>
                            </div>
                        </div>
                )
            }
            <Menu id="right-menu_doc"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={() => setAnchorEl(null)}
            >
                <MenuItem key={1}  onClick={() => {
                    setAnchorEl(null);
                    props.showDoc(doc)
                }}  >
                    <ListItemIcon>
                        <VisibilityIcon fontSize="small" />
                    </ListItemIcon>
                    <Typography variant="inherit">Aperçu</Typography>
                </MenuItem>
                <MenuItem key={2}  onClick={() => {
                    setAnchorEl(null);
                    props.openShareFileModal()
                }}>
                    <ListItemIcon>
                        <PersonAddIcon fontSize="small" />
                    </ListItemIcon>
                    <Typography variant="inherit">Partager</Typography>
                </MenuItem>
                <MenuItem key={3}  onClick={() => {
                    setAnchorEl(null);
                    props.onSignBtnClick(doc.id)
                }}>
                    <ListItemIcon>
                        <GestureIcon fontSize="small"/>
                    </ListItemIcon>
                    <Typography variant="inherit">Signer</Typography>
                </MenuItem>
                <MenuItem key={4}  onClick={() => {
                    setAnchorEl(null);
                    setOpenRenameModal(true)
                }}>
                    <ListItemIcon>
                        <EditIcon fontSize="small"/>
                    </ListItemIcon>
                    <Typography variant="inherit">Renommer</Typography>
                </MenuItem>
                <MenuItem key={5}  onClick={() => {
                    setAnchorEl(null);
                    props.setLoading(true)
                    SmartService.getFile(doc.id, localStorage.getItem("token"), localStorage.getItem("usrtoken")).then(fileRes => {
                        if (fileRes.succes === true && fileRes.status === 200) {
                            let a = document.createElement("a"); //Create <a>
                            a.href ="data:application/pdf;base64," + fileRes.data.Content.Data
                            a.download = doc.name+".pdf"; //File name Here
                            props.setLoading(false)
                            a.click();
                        } else {
                            console.log(fileRes.error)
                        }
                    }).catch(err => console.log(err))
                }}>
                    <ListItemIcon>
                        <GetAppIcon fontSize="small"/>
                    </ListItemIcon>
                    <Typography variant="inherit">Télécharger</Typography>
                </MenuItem>
                <MenuItem key={6}  onClick={() => {
                    setAnchorEl(null);
                    setOpen(true)
                }} disabled={localStorage.getItem("role") !== "admin"}>
                    <ListItemIcon>
                        <DeleteOutlineIcon fontSize="small"/>
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
                <DialogTitle id="alert-dialog-slide-title" style={{width:"90%"}}>{"Voulez-vous vraiment supprimer le fichier "+doc.name+".pdf"+" ?"}</DialogTitle>
                <DialogContent>
                    <div align="center" style={{marginTop:5,marginBottom:5}}>
                        <div className="avatar-lg rounded-circle bg-soft-danger border-danger">
                            <i className="mdi mdi-close-circle-outline avatar-title text-danger" style={{fontSize:42}}/>
                        </div>
                    </div>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpen(false)} color="default" style={{textTransform:"Capitalize",fontWeight:"bold"}}>
                        Annuler
                    </Button>
                    <Button onClick={() => {
                        props.onDeleteFile(doc)
                    }}
                            color="secondary" style={{textTransform:"Capitalize",fontWeight:"bold"}} variant="contained">
                        Confirmer
                    </Button>
                </DialogActions>
            </Dialog>

            <Modal isOpen={openRenameeModal} size="md" centered={true} zIndex={1500}
                   toggle={() => {
                       setOpenRenameModal(false)
                   }}
            >
                <ModalHeader toggle={() => {setOpenRenameModal(false)}} >
                    Rennomer
                </ModalHeader>
                <ModalBody>

                    <div style={{marginTop: 20}}>
                        <input className="form-control" placeholder="Rennomer" value={newFileName}
                               onChange={event => setNewFileName(event.target.value)} style={{height:40}}
                               type="text"
                        />
                    </div>
                    <div style={{marginTop: 15, textAlign: "right"}}>
                        <button className="btn btn-light  font-weight-normal m-1"
                                style={{fontFamily: "sans-serif"}}
                                onClick={() => {
                                    setOpenRenameModal(false)
                                }}
                        >
                            Annuler
                        </button>
                        <button className="btn btn-success  font-weight-normal m-1"
                                style={{fontFamily: "sans-serif"}}
                                onClick={() => {
                                    setOpenRenameModal(false)
                                    props.onRenameFile(doc,newFileName)
                                }}
                        >
                            OK
                        </button>
                    </div>

                </ModalBody>
            </Modal>
        </div>

    )

}