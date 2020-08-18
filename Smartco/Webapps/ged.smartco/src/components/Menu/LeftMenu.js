import React, {useState} from "react";
import {Button as MuiButton} from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import NewFolderIcon from "@material-ui/icons/CreateNewFolder";
import Typography from "@material-ui/core/Typography";
import NewFileIcon from "@material-ui/icons/AttachFile";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
import ArrowRightIcon from "@material-ui/icons/ArrowRight";
import MeetMenuItems from "./MeetMenuItems";
import StarBorderIcon from "@material-ui/icons/StarBorder";
import EditIcon from "@material-ui/icons/Edit";
import GetAppIcon from "@material-ui/icons/GetApp";
import DeleteOutlineIcon from "@material-ui/icons/DeleteOutline";
import IconButton from "@material-ui/core/IconButton";
import RoomsMenuItems from "./RoomsMenuItems";
import PersonAddIcon from "@material-ui/icons/PersonAdd"
import data from "../../data/Data"
import GmailTree from "../Tree/GmailTree";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import Slide from "@material-ui/core/Slide";
import {Modal, ModalBody, ModalHeader} from "reactstrap";
import CloudUploadIcon from '@material-ui/icons/CloudUpload';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export default function LeftMenu(props) {

    const [anchorEl, setAnchorEl] = useState(null);
    const [anchorElMenu, setAnchorElMenu] = useState(null);
    const [openDeleteModal, setOpenDeleteModal] = React.useState(false);
    const [openRenameeModal, setOpenRenameModal] = React.useState(false);
    const [newFolderName, setnewFolderName] = React.useState(props.selectedFolder.name);




    return(


        <div style={{width: "auto", marginTop: 20,paddingRight:10,minWidth:240}}>
            <div align="center">

                <MuiButton
                    variant="contained"
                    color="default"
                    startIcon={<AddIcon style={{color:"#A00015",fontSize:28}} />}
                    size="large"
                    style={{textTransform:"none",borderRadius:20,backgroundColor:"#fff",color:"#000"}}
                    onClick={(event) => setAnchorEl(event.currentTarget)}
                >
                    Nouveau
                </MuiButton>

                <Menu
                    id="right-menu"
                    anchorEl={anchorEl}
                    keepMounted
                    open={Boolean(anchorEl)}
                    onClose={() => setAnchorEl(null)}
                >
                    <MenuItem key={1}  onClick={() => {
                        setAnchorEl(null);
                        props.openNewFolderModalFromRacine()
                    }}  >
                        <ListItemIcon>
                            <NewFolderIcon fontSize="small" />
                        </ListItemIcon>
                        <Typography variant="inherit">Nouveau dossier</Typography>
                    </MenuItem>
                    <MenuItem key={2}  onClick={() => {
                        setAnchorEl(null);
                        props.onClickNewFileFromRacine()
                    }}>
                        <ListItemIcon>
                            <NewFileIcon fontSize="small" />
                        </ListItemIcon>
                        <Typography variant="inherit">Importer un fichier</Typography>
                    </MenuItem>
                    <MenuItem key={3}  onClick={() => {
                        setAnchorEl(null);
                        props.onClickImportFolder()
                    }}>
                        <ListItemIcon>
                            <CloudUploadIcon fontSize="small"/>
                        </ListItemIcon>
                        <Typography variant="inherit">Importer un dossier</Typography>
                    </MenuItem>
                </Menu>

            </div>

            <div style={{marginTop:25, marginLeft: 5}}>

                <div style={{cursor:"pointer",backgroundColor:props.focusedItem === "Drive" ? "aliceblue":""}} onDoubleClick={() => {
                    props.setShowDriveMenuItems()
                }} onClick={() => {props.setFocusedItem("Drive")}}
                >
                    <div style={{height:1,backgroundColor:"#f0f0f0",marginTop:10,marginBottom:10}}/>
                    <div style={{display:"flex"}}>
                        {
                            props.showDriveMenuItems === true ?
                                <ArrowDropDownIcon style={{color:"#000"}}/> : <ArrowRightIcon/>
                        }
                        <Typography variant="inherit" style={{color:"#000",marginTop:3}} >Mon Drive</Typography>
                    </div>
                    <div style={{height:1,backgroundColor:"#f0f0f0",marginTop:10,marginBottom:10}}/>
                </div>
                {
                    props.showDriveMenuItems === true &&
                    <GmailTree      data={props.driveFolders || []}
                                    getFolderName={(name) => props.setFolderName(name)}
                                    getFolderId={(id) => props.setFolderId(id)}
                                    getSelectedFolderFiles={(files) => props.setSelectedFolderFiles(files)}
                                    onEndIconClick={ (event) => {
                                        if(event){
                                            event.preventDefault();
                                            setAnchorElMenu(event.currentTarget)
                                        }
                                    }}
                                    selectedDriveItem={props.selectedDriveItem}
                                    expandedDriveItems={props.expandedDriveItems}
                                    getSubfolders={(node) => props.getSubfolders(node)}
                                    handleToggle={props.handleToggle}
                                    sharedDrive={props.sharedDrive}
                                    sharedRootFiles={props.sharedRootFiles}
                                    onClickSharedRootItem={props.onClickSharedRootItem}
                                    setSelectedFolder={(folder) => props.setSelectedFolder(folder)}
                    />

                }
                <Menu
                    id="tree-menu-click"
                    anchorEl={anchorElMenu}
                    keepMounted
                    open={Boolean(anchorElMenu)}
                    onClose={() => setAnchorElMenu(null)}
                >
                    <MenuItem key={1}  onClick={() => {
                        setAnchorElMenu(null);
                        props.openNewFolderModal()
                    }}  >
                        <ListItemIcon>
                            <NewFolderIcon fontSize="small" />
                        </ListItemIcon>
                        <Typography variant="inherit">Nouveau dossier</Typography>
                    </MenuItem>
                    <MenuItem key={2}  onClick={() => {
                        setAnchorElMenu(null);
                        props.showNewFileScreen()
                    }}>
                        <ListItemIcon>
                            <NewFileIcon fontSize="small" />
                        </ListItemIcon>
                        <Typography variant="inherit">Nouveau fichier</Typography>
                    </MenuItem>
                    <MenuItem key={3}  onClick={() => {
                        setAnchorElMenu(null);
                        props.openShareModal()
                    }}>
                        <ListItemIcon>
                            <PersonAddIcon fontSize="small" />
                        </ListItemIcon>
                        <Typography variant="inherit">Partager</Typography>
                    </MenuItem>
                    <MenuItem key={4}  onClick={() => {

                    }}>
                        <ListItemIcon>
                            <StarBorderIcon fontSize="small" />
                        </ListItemIcon>
                        <Typography variant="inherit">Ajouter aux favoris</Typography>
                    </MenuItem>
                    <MenuItem key={5}  onClick={() => {
                        setAnchorElMenu(null);
                        setOpenRenameModal(true)
                        setnewFolderName(props.selectedFolder.name)
                    }}>
                        <ListItemIcon>
                            <EditIcon fontSize="small" />
                        </ListItemIcon>
                        <Typography variant="inherit">Rennomer</Typography>
                    </MenuItem>
                    <MenuItem key={6}  onClick={() => {

                    }}>
                        <ListItemIcon>
                            <GetAppIcon fontSize="small" />
                        </ListItemIcon>
                        <Typography variant="inherit">Télécharger</Typography>
                    </MenuItem>
                    <MenuItem key={7}  onClick={() => {
                        setAnchorElMenu(null);
                        setOpenDeleteModal(true)
                    }}>
                        <ListItemIcon>
                            <DeleteOutlineIcon fontSize="small" />
                        </ListItemIcon>
                        <Typography variant="inherit">Supprimer</Typography>
                    </MenuItem>
                </Menu>

                <Dialog
                    open={openDeleteModal}
                    TransitionComponent={Transition}
                    keepMounted
                    onClose={() => setOpenDeleteModal(false)}
                    aria-labelledby="alert-dialog-slide-title"
                    aria-describedby="alert-dialog-slide-description"
                >
                    <DialogTitle id="alert-dialog-slide-title" style={{width:"90%"}}>{"Voulez-vous vraiment supprimer ce dossier ?"}</DialogTitle>
                    <DialogContent>
                        <div align="center" style={{marginTop:5,marginBottom:5}}>
                            <div className="avatar-lg rounded-circle bg-soft-danger border-danger">
                                <i className="mdi mdi-close-circle-outline avatar-title text-danger" style={{fontSize:42}}/>
                            </div>
                        </div>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={() => setOpenDeleteModal(false)} color="default" style={{textTransform:"Capitalize",fontWeight:"bold"}}>
                            Annuler
                        </Button>
                        <Button onClick={() => {
                            setOpenDeleteModal(false)
                            props.onDeleteFolder()
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
                            <input className="form-control" placeholder="Rennomer" value={newFolderName}
                                   onChange={event => setnewFolderName(event.target.value)} style={{height:40}}
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
                                        props.onRenameFolder(newFolderName)
                                    }}
                            >
                                OK
                            </button>
                        </div>

                    </ModalBody>
                </Modal>

                <div style={{cursor:"pointer",backgroundColor:props.focusedItem === "Rooms" ? "aliceblue":""}} onClick={() => {
                    props.setShowRoomsMenuItems()
                    props.setFocusedItem("Rooms")
                }}
                >
                    <div style={{height:1,backgroundColor:"#f0f0f0",marginTop:10,marginBottom:10}}/>
                    <div style={{display:"flex"}}>
                        {
                            props.showRoomsMenuItems === true ?
                                <ArrowDropDownIcon style={{color:"#000"}}/> : <ArrowRightIcon/>
                        }
                        <Typography variant="inherit" style={{color:"#000",marginTop:3}} >Rooms</Typography>

                        <IconButton style={{marginLeft:100,marginTop:-10}} onClick={(event) => {
                            event.stopPropagation()
                            props.onClickAddRoomBtn()
                        }}>
                            <AddIcon />
                        </IconButton>

                    </div>
                    <div style={{height:1,backgroundColor:"#f0f0f0",marginBottom:10}}/>
                </div>
                {
                    props.showRoomsMenuItems === true &&
                    <div>
                        <RoomsMenuItems items={props.rooms} selectedRoomItems={props.selectedRoomItems}
                                        expandedRoomItems={props.expandedRoomItems} handleToggleRoomsMenu={props.handleToggleRoomsMenu}
                                        handleSelectRoomsMenu={props.handleSelectRoomsMenu}
                                        setSelectedRoom={(room,roomId) => props.setSelectedRoom(room,roomId)}
                        />
                    </div>
                }



                <div style={{cursor:"pointer",backgroundColor:props.focusedItem === "Meet" ? "aliceblue":""}} onClick={() => {
                    props.setShowMeetMenuItems()
                    props.setFocusedItem("Meet")
                }}
                >
                    <div style={{height:1,backgroundColor:"#f0f0f0",marginTop:10,marginBottom:10}}/>
                    <div style={{display:"flex"}}>
                        {
                            props.showMeetMenuItems === true ?
                                <ArrowDropDownIcon style={{color:"#000"}}/> : <ArrowRightIcon/>
                        }
                        <Typography variant="inherit" style={{color:"#000",marginTop:3}} >Meet</Typography>
                    </div>
                    <div style={{height:1,backgroundColor:"#f0f0f0",marginTop:10,marginBottom:10}}/>
                </div>
                {
                    props.showMeetMenuItems === true &&
                    <div>
                        <MeetMenuItems items={data.MeetMenuItem} selectedMeetItem={props.selectedMeetItem}
                                       onClick={(nodeId) => {props.onMeetItemClick(nodeId)}} handleSelectMeetMenu={props.handleSelectMeetMenu}
                        />
                    </div>

                }
                <div style={{cursor:"pointer",backgroundColor:props.focusedItem === "Contacts" ? "aliceblue":""}} onClick={() => {
                    props.setFocusedItem("Contacts")
                    props.setShowContacts()
                }}
                >
                    <div style={{height:1,backgroundColor:"#f0f0f0",marginTop:10,marginBottom:10}}/>
                    <div style={{display:"flex"}}>
                        {
                            props.showContacts === true ?
                                <ArrowDropDownIcon style={{color:"#000"}}/> : <ArrowRightIcon/>
                        }
                        <Typography variant="inherit" style={{color:"#000",marginTop:3}} >Contacts</Typography>
                    </div>
                    <div style={{height:1,backgroundColor:"#f0f0f0",marginTop:10,marginBottom:10}}/>
                </div>

            </div>

        </div>

    )

}