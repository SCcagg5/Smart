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


export default function LeftMenu(props) {

    const [anchorEl, setAnchorEl] = useState(null);
    const [anchorElMenu, setAnchorElMenu] = useState(null);

    return(


        <div style={{width: 240, marginTop: 20}}>
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
                        <Typography variant="inherit">Nouveau fichier</Typography>
                    </MenuItem>
                </Menu>

            </div>

            <div style={{marginTop:25, marginLeft: 20}}>

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
                                    onEndIconClick={ event => {
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

                    }}>
                        <ListItemIcon>
                            <DeleteOutlineIcon fontSize="small" />
                        </ListItemIcon>
                        <Typography variant="inherit">Supprimer</Typography>
                    </MenuItem>
                </Menu>

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