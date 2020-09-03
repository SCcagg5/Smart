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
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import Slide from "@material-ui/core/Slide";
import {Modal, ModalBody, ModalHeader} from "reactstrap";
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import SocietyMenuItems from "./SocietyMenuItems";
import ContactsMenuItems from "./ContactsMenuItems";
import '../../assets/css/antDesign.css';
import {Input, Tree} from 'antd';
import TimeSheetMenuItems from "./TimeSheetMenuItems";

const {DirectoryTree} = Tree;
const {Search} = Input;

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export default function LeftMenuV3(props) {

    const [anchorEl, setAnchorEl] = useState(null);
    const [anchorElMenu, setAnchorElMenu] = useState(null);
    const [openDeleteModal, setOpenDeleteModal] = React.useState(false);
    const [openRenameeModal, setOpenRenameModal] = React.useState(false);
    const [newFolderName, setnewFolderName] = React.useState(props.selectedFolder.name);
    const [expandedKeys, setExpandedKeys] = React.useState(props.selectedDriveItem);
    const [selectedKeys, setSelectedKeys] = React.useState(props.selectedDriveItem);
    const [searchValue, setSearchValue] = React.useState("");
    const [autoExpandParent, setAutoExpandParent] = React.useState(true);


    const dataList = [];
    const generateList = data => {
        for (let i = 0; i < data.length; i++) {
            const node = data[i];
            const { key } = node;
            dataList.push({ key, title: data[i].title });
            if (node.children) {
                generateList(node.children);
            }
        }
    };
    generateList(props.driveFolders)


    const  onChange = e => {

        const {value} = e.target;
        const newExpandedKeys = dataList.map(item => {

                if (item.title.toLowerCase().indexOf(value.toLowerCase()) > -1) {
                    return getParentKey(item.key, props.driveFolders);
                }
                return null;
            }).filter((item, i, self) => item && self.indexOf(item) === i);
        setExpandedKeys(newExpandedKeys)
        setSearchValue(value)
        setAutoExpandParent(true)
    }

    const getParentKey = (key, tree) => {
        let parentKey;
        for (let i = 0; i < tree.length; i++) {
            const node = tree[i];
            if (node.children) {
                if (node.children.some(item => item.key === key)) {
                    parentKey = node.key;
                } else if (getParentKey(key, node.children)) {
                    parentKey = getParentKey(key, node.children);
                }
            }
        }
        return parentKey;
    };

    function onDragEnter(info) {

    }

    function onDrop(info) {
        //console.log(info);
        /*let driveFolders  = props.driveFolders;
        const dropKey = info.node.props.eventKey;
        const dragKey = info.dragNode.props.eventKey;
        const dropPos = info.node.props.pos.split('-');
        const dropPosition = info.dropPosition - Number(dropPos[dropPos.length - 1]);

        const loop = (data, key, callback) => {
            for (let i = 0; i < data.length; i++) {
                if (data[i].key === key) {
                    return callback(data[i], i, data);
                }
                if (data[i].children) {
                    loop(data[i].children, key, callback);
                }
            }
        };
        const data = [...driveFolders];

        let dragObj;
        loop(data, dragKey, (item, index, arr) => {
            arr.splice(index, 1);
            dragObj = item;
        });

        if (!info.dropToGap) {
            // Drop on the content
            loop(data, dropKey, item => {
                item.children = item.children || [];
                // where to insert
                item.children.push(dragObj);
            });
        }
        else if (
            (info.node.props.children || []).length > 0 && // Has children
            info.node.props.expanded && // Is expanded
            dropPosition === 1 // On the bottom gap
        ) {
            loop(data, dropKey, item => {
                item.children = item.children || [];
                // where to insert
                item.children.unshift(dragObj);
            });
        }
        else {
            let ar;
            let i;
            loop(data, dropKey, (item, index, arr) => {
                ar = arr;
                i = index;
            });
            if (dropPosition === -1) {
                ar.splice(i, 0, dragObj);
            } else {
                ar.splice(i + 1, 0, dragObj);
            }
        }

        props.setDriveFolders(data)*/
    }

    function onExpand(expandedKeys) {
        //setExpandedKeys(expandedKeys);
        props.setExpandedDriveItems(expandedKeys)
        //setAutoExpandParent(false)
        props.setAutoExpandParent(false)
    }

    function onSelect(selectedKeys, info) {

        //setSelectedKeys(selectedKeys);
        props.setSelectedDriveItem(selectedKeys)
        if (info.node.typeF === "folder") {
            props.setSelectedFolder(info.node)
            props.setFolderName(info.node.title)
            props.setFolderId(info.node.key)
            props.setSelectedFolderFiles(info.node.files)
            props.setSelectedFolderFolders(info.node.folders)
        }
    }


    const loop = data =>
        data.map(item => {
            const index = item.title.toLowerCase().indexOf(searchValue.toLowerCase());
            const beforeStr = item.title.substr(0, index);
            const searched = item.title.substr(index,searchValue.length)
            const afterStr = item.title.substr(index + searchValue.length);
            const title =
                index > -1 ? (
                    <span>
                        {beforeStr}
                        <span style={{backgroundColor:searchValue !== ""&&"rgb(204, 204, 204)",paddingTop:searchValue !== ""&&"0.4rem",paddingBottom:searchValue !== ""&&"0.4rem"}}>{searched}</span>
                        {afterStr}
                    </span>
                ) : (
                    <span>{item.title}</span>
                );
            if (item.children) {
                return {
                    title, key: item.key, children: loop(item.children),
                    name:item.title,
                    icon: item.icon,
                    files:item.files,
                    folders:item.folders,
                    typeF:item.typeF
                };
            }

            return {
                title,
                name:item.title,
                key: item.key,
                icon: item.icon,
                files:item.files,
                folders:item.folders,
                typeF:item.typeF
            };
        });


    return (



        <div style={{marginTop: 20, paddingRight: 10}}>
            <div align="center">

                <MuiButton
                    variant="contained"
                    color="default"
                    startIcon={<AddIcon style={{color: "#A00015", fontSize: 28}}/>}
                    size="large"
                    style={{textTransform: "none", borderRadius: 20, backgroundColor: "#fff", color: "#000"}}
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
                    <MenuItem key={1} onClick={() => {
                        setAnchorEl(null);
                        props.openNewFolderModalFromRacine()
                    }}>
                        <ListItemIcon>
                            <NewFolderIcon fontSize="small"/>
                        </ListItemIcon>
                        <Typography variant="inherit">Nouveau dossier</Typography>
                    </MenuItem>
                    <MenuItem key={2} onClick={() => {
                        setAnchorEl(null);
                        props.onClickNewFileFromRacine()
                    }}>
                        <ListItemIcon>
                            <NewFileIcon fontSize="small"/>
                        </ListItemIcon>
                        <Typography variant="inherit">Importer un fichier</Typography>
                    </MenuItem>
                    <MenuItem key={3} onClick={() => {
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

            <div style={{marginTop: 25, marginLeft: 5}}>

                <div style={{cursor: "pointer", backgroundColor: props.focusedItem === "Drive" ? "aliceblue" : ""}}
                     onDoubleClick={() => {
                         props.setShowDriveMenuItems()
                     }} onClick={() => {
                    props.setFocusedItem("Drive")
                }}
                >
                    <div style={{height: 1, backgroundColor: "#f0f0f0", marginTop: 10, marginBottom: 10}}/>
                    <div style={{display: "flex"}}>
                        {
                            props.showDriveMenuItems === true ?
                                <ArrowDropDownIcon style={{color: "#000"}}/> : <ArrowRightIcon/>
                        }
                        <Typography variant="inherit" style={{color: "#000", marginTop: 3}}>Mon Drive</Typography>
                    </div>
                    <div style={{height: 1, backgroundColor: "#f0f0f0", marginTop: 10, marginBottom: 10}}/>
                </div>
                {
                    props.showDriveMenuItems === true &&
                    <div>
                        <Search style={{marginBottom: 8}} placeholder="Chercher" onChange={onChange}/>
                        <DirectoryTree
                            draggable
                            showIcon={true}
                            onExpand={onExpand}
                            onSelect={onSelect}
                            onDragEnter={onDragEnter}
                            onDrop={onDrop}
                            treeData={loop(props.driveFolders)}
                            expandAction={false}
                            onRightClick={info => {
                                if (info.node.typeF === "folder") {
                                    setAnchorElMenu(info.event.currentTarget)
                                    props.setSelectedFolder(info.node)
                                    props.setFolderName(info.node.title)
                                    props.setFolderId(info.node.key)
                                }
                            }}
                            //expandedKeys={expandedKeys}
                            expandedKeys={props.expandedDriveItems}
                            //selectedKeys={selectedKeys}
                            selectedKeys={props.selectedDriveItem}
                            onDragStart={e => {
                                let node = {key:e.node.key,typeF:e.node.typeF}
                                e.event.dataTransfer.setData("node", JSON.stringify(node))
                            }}
                            //autoExpandParent={autoExpandParent}
                            autoExpandParent={props.autoExpandParent}
                        />
                    </div>

                }
                <Menu
                    id="tree-menu-click"
                    anchorEl={anchorElMenu}
                    keepMounted
                    open={Boolean(anchorElMenu)}
                    onClose={() => setAnchorElMenu(null)}
                >
                    <MenuItem key={1} onClick={() => {
                        setAnchorElMenu(null);
                        props.openNewFolderModal()
                    }}>
                        <ListItemIcon>
                            <NewFolderIcon fontSize="small"/>
                        </ListItemIcon>
                        <Typography variant="inherit">Nouveau dossier</Typography>
                    </MenuItem>
                    <MenuItem key={2} onClick={() => {
                        setAnchorElMenu(null);
                        props.showNewFileScreen()
                    }}>
                        <ListItemIcon>
                            <NewFileIcon fontSize="small"/>
                        </ListItemIcon>
                        <Typography variant="inherit">Nouveau fichier</Typography>
                    </MenuItem>
                    <MenuItem key={3} onClick={() => {
                        setAnchorElMenu(null);
                        props.openShareModal()
                    }}>
                        <ListItemIcon>
                            <PersonAddIcon fontSize="small"/>
                        </ListItemIcon>
                        <Typography variant="inherit">Partager</Typography>
                    </MenuItem>
                    <MenuItem key={4} onClick={() => {

                    }}>
                        <ListItemIcon>
                            <StarBorderIcon fontSize="small"/>
                        </ListItemIcon>
                        <Typography variant="inherit">Ajouter aux favoris</Typography>
                    </MenuItem>
                    <MenuItem key={5} onClick={() => {
                        setAnchorElMenu(null);
                        setOpenRenameModal(true);
                        setnewFolderName(props.selectedFolder.title)
                    }}>
                        <ListItemIcon>
                            <EditIcon fontSize="small"/>
                        </ListItemIcon>
                        <Typography variant="inherit">Rennomer</Typography>
                    </MenuItem>
                    <MenuItem key={6} onClick={() => {

                    }}>
                        <ListItemIcon>
                            <GetAppIcon fontSize="small"/>
                        </ListItemIcon>
                        <Typography variant="inherit">Télécharger</Typography>
                    </MenuItem>
                    <MenuItem disabled={true} key={7} onClick={() => {
                        /*setAnchorElMenu(null);
                        setOpenDeleteModal(true)*/
                    }}>
                        <ListItemIcon>
                            <DeleteOutlineIcon fontSize="small"/>
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
                    <DialogTitle id="alert-dialog-slide-title"
                                 style={{width: "90%"}}>{"Voulez-vous vraiment supprimer ce dossier ?"}</DialogTitle>
                    <DialogContent>
                        <div align="center" style={{marginTop: 5, marginBottom: 5}}>
                            <div className="avatar-lg rounded-circle bg-soft-danger border-danger">
                                <i className="mdi mdi-close-circle-outline avatar-title text-danger"
                                   style={{fontSize: 42}}/>
                            </div>
                        </div>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={() => setOpenDeleteModal(false)} color="default"
                                style={{textTransform: "Capitalize", fontWeight: "bold"}}>
                            Annuler
                        </Button>
                        <Button onClick={() => {
                            setOpenDeleteModal(false)
                            props.onDeleteFolder()
                        }}
                                color="secondary" style={{textTransform: "Capitalize", fontWeight: "bold"}}
                                variant="contained">
                            Confirmer
                        </Button>
                    </DialogActions>
                </Dialog>

                <Modal isOpen={openRenameeModal} size="md" centered={true} zIndex={1500}
                       toggle={() => {
                           setOpenRenameModal(false)
                       }}
                >
                    <ModalHeader toggle={() => {
                        setOpenRenameModal(false)
                    }}>
                        Rennomer
                    </ModalHeader>
                    <ModalBody>

                        <div style={{marginTop: 20}}>
                            <input className="form-control" placeholder="Rennomer" value={newFolderName}
                                   onChange={event => setnewFolderName(event.target.value)} style={{height: 40}}
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

                <div style={{cursor: "pointer", backgroundColor: props.focusedItem === "Rooms" ? "aliceblue" : ""}}
                     onDoubleClick={() => {
                         props.setShowRoomsMenuItems()
                     }}
                     onClick={() => {
                         props.setFocusedItem("Rooms")
                     }}
                >
                    <div style={{height: 1, backgroundColor: "#f0f0f0", marginTop: 10, marginBottom: 10}}/>
                    <div style={{display: "flex"}}>
                        {
                            props.showRoomsMenuItems === true ?
                                <ArrowDropDownIcon style={{color: "#000"}}/> : <ArrowRightIcon/>
                        }
                        <Typography variant="inherit" style={{color: "#000", marginTop: 3}}>Rooms</Typography>

                        <IconButton style={{marginLeft: 160, marginTop: -10}} onClick={(event) => {
                            event.stopPropagation()
                            props.onClickAddRoomBtn()
                        }}>
                            <AddIcon/>
                        </IconButton>

                    </div>
                    <div style={{height: 1, backgroundColor: "#f0f0f0", marginBottom: 10}}/>
                </div>
                {
                    props.showRoomsMenuItems === true &&
                    <div>
                        <RoomsMenuItems items={props.rooms} selectedRoomItems={props.selectedRoomItems}
                                        expandedRoomItems={props.expandedRoomItems}
                                        handleToggleRoomsMenu={props.handleToggleRoomsMenu}
                                        handleSelectRoomsMenu={props.handleSelectRoomsMenu}
                                        setSelectedRoom={(room, roomId) => props.setSelectedRoom(room, roomId)}
                        />
                    </div>
                }


                <div style={{cursor: "pointer", backgroundColor: props.focusedItem === "Meet" ? "aliceblue" : ""}}
                     onClick={() => {
                         props.setShowMeetMenuItems()
                         props.setFocusedItem("Meet")
                     }}
                >
                    <div style={{height: 1, backgroundColor: "#f0f0f0", marginTop: 10, marginBottom: 10}}/>
                    <div style={{display: "flex"}}>
                        {
                            props.showMeetMenuItems === true ?
                                <ArrowDropDownIcon style={{color: "#000"}}/> : <ArrowRightIcon/>
                        }
                        <Typography variant="inherit" style={{color: "#000", marginTop: 3}}>Meet</Typography>
                    </div>
                    <div style={{height: 1, backgroundColor: "#f0f0f0", marginTop: 10, marginBottom: 10}}/>
                </div>
                {
                    props.showMeetMenuItems === true &&
                    <div>
                        <MeetMenuItems items={data.MeetMenuItem} selectedMeetItem={props.selectedMeetItem}
                                       onClick={(nodeId) => {
                                           props.onMeetItemClick(nodeId)
                                       }} handleSelectMeetMenu={props.handleSelectMeetMenu}
                        />
                    </div>

                }
                <div style={{cursor: "pointer", backgroundColor: props.focusedItem === "Contacts" ? "aliceblue" : ""}}
                     onClick={() => {
                         props.setFocusedItem("Contacts")
                         props.setShowContacts()
                     }}
                >
                    <div style={{height: 1, backgroundColor: "#f0f0f0", marginTop: 10, marginBottom: 10}}/>
                    <div style={{display: "flex"}}>
                        {
                            props.showContacts === true ?
                                <ArrowDropDownIcon style={{color: "#000"}}/> : <ArrowRightIcon/>
                        }
                        <Typography variant="inherit" style={{color: "#000", marginTop: 3}}>Contacts</Typography>
                    </div>
                    <div style={{height: 1, backgroundColor: "#f0f0f0", marginTop: 10, marginBottom: 10}}/>
                </div>
                {
                    props.showContacts === true &&
                    <div>
                        <ContactsMenuItems items={data.ContactsMenuItem}
                                           selectedContactsItem={props.selectedContactsItem}
                                           onClick={(nodeId) => {
                                               props.onContactsItemClick(nodeId)
                                           }} handleSelectContactsMenu={props.handleSelectContactsMenu}
                        />
                    </div>

                }
                <div style={{cursor: "pointer", backgroundColor: props.focusedItem === "Societe" ? "aliceblue" : ""}}
                     onClick={() => {
                         props.setShowSocietyMenuItems()
                         props.setFocusedItem("Societe")
                     }}
                >
                    <div style={{height: 1, backgroundColor: "#f0f0f0", marginTop: 10, marginBottom: 10}}/>
                    <div style={{display: "flex"}}>
                        {
                            props.showSociete === true ?
                                <ArrowDropDownIcon style={{color: "#000"}}/> : <ArrowRightIcon/>
                        }
                        <Typography variant="inherit" style={{color: "#000", marginTop: 3}}>Annuaire societés</Typography>
                    </div>
                    <div style={{height: 1, backgroundColor: "#f0f0f0", marginTop: 10, marginBottom: 10}}/>
                </div>
                {
                    props.showSocietyMenuItems === true &&
                    <div>
                        <SocietyMenuItems items={data.SocietyMenuItem} selectedSocietyItem={props.selectedSocietyItem}
                                          onClick={(nodeId) => {
                                              props.onSocietyItemClick(nodeId)
                                          }} handleSelectSocietyMenu={props.handleSelectSocietyMenu}
                        />
                    </div>

                }
                <div style={{cursor:"pointer",backgroundColor:props.focusedItem === "TimeSheet" ? "aliceblue":""}} onClick={() => {
                    props.setShowTimeSheetMenuItems()
                    props.setFocusedItem("TimeSheet")
                }}
                >
                    <div style={{height:1,backgroundColor:"#f0f0f0",marginTop:10,marginBottom:10}}/>
                    <div style={{display:"flex"}}>
                        {
                            props.showTimeSheetMenuItems === true ?
                                <ArrowDropDownIcon style={{color:"#000"}}/> : <ArrowRightIcon/>
                        }
                        <Typography variant="inherit" style={{color:"#000",marginTop:3}} >Time Sheet</Typography>
                    </div>
                    <div style={{height:1,backgroundColor:"#f0f0f0",marginTop:10,marginBottom:10}}/>
                </div>
                {
                    props.showTimeSheetMenuItems === true &&
                    <div>
                        <TimeSheetMenuItems items={data.TimeSheetMenuItem} selectedTimeSheetItem={props.selectedTimeSheetItem}
                                            onClick={(nodeId) => {props.onTimeSheetItemClick(nodeId)}} handleSelectTimeSheetMenu={props.handleSelectTimeSheetMenu}
                        />
                    </div>

                }

            </div>

        </div>

    )

}