import React, {useState} from "react";
import {Button as MuiButton, Checkbox as MuiCheckbox} from "@material-ui/core";
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
import MarketplaceMenuItems from "./MarketplaceMenuItems";
import SettingsIcon from '@material-ui/icons/Settings';
import {Picker} from "emoji-mart";
import Popover from "@material-ui/core/Popover";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import product1 from "../../assets/images/products/product1.jpg"
import product2 from "../../assets/images/products/product2.jpg"
import product3 from "../../assets/images/products/priduct3.jpg"
import ComptaMenuItems from "./ComptaMenuItems";

const modules = process.env.REACT_APP_ACTIVE_MODULES;
const active_modules = (modules || "").split("/")

const {DirectoryTree} = Tree;
const {Search} = Input;

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});


const packs = [
    {
        title:"Pack Santé+",
        products:[
            {
                id:"",
                title:"mac book pro",
                desc:"Un laptop de trés haute gamme equipé d'un processeur intel i7 10éme génération",
                price:1200,
                image:product2
            },
            {
                id:"",
                title:"mac air 2020",
                desc:"Un laptop de trés haute gamme equipé d'un processeur intel i7 10éme génération",
                price:800,
                image:product3
            }
        ]
    },
    {
        title:"Pack teck pro",
        products:[
            {
                id:"",
                title:"mac 1",
                desc:"Un laptop de trés haute gamme equipé d'un processeur intel i7 10éme génération",
                price:755,
                image:product1
            },
            {
                id:"",
                title:"mac 2",
                desc:"Un laptop de trés haute gamme equipé d'un processeur intel i7 10éme génération",
                price:600,
                image:product3
            }
        ]
    }
]

export default function LeftMenuV3(props) {

    const [anchorEl, setAnchorEl] = useState(null);
    const [anchorElMenu, setAnchorElMenu] = useState(null);
    const [anchorShareElMenu, setShareAnchorElMenu] = useState(null);
    const [openDeleteModal, setOpenDeleteModal] = React.useState(false);
    const [openRenameeModal, setOpenRenameModal] = React.useState(false);
    const [newFolderName, setnewFolderName] = React.useState(props.selectedFolder.name);
    const [searchValue, setSearchValue] = React.useState("");
    const [rights, setRights] = React.useState({});
    const [settingAnchorEl, setSettingAnchorEl] = React.useState(null);
    const [checkbox_showicons, setCheckbox_showicons] = React.useState(true);
    const [checkbox_enableDrag, setCheckbox_enableDrag] = React.useState(true);
    const [showProductPack, setShowProductPack] = React.useState(false);



    const dataList = [];
    const generateList = data => {
        for (let i = 0; i < data.length; i++) {
            const node = data[i];
            const {key} = node;
            dataList.push({key, title: data[i].title});
            if (node.children) {
                generateList(node.children);
            }
        }
    };
    generateList(props.driveFolders)


    const onChange = e => {
        props.setAutoExpandParent(true)
        const {value} = e.target;
        const newExpandedKeys = dataList.map(item => {

            if (item.title.toLowerCase().indexOf(value.toLowerCase()) > -1) {
                return getParentKey(item.key, props.driveFolders);
            }
            return null;
        }).filter((item, i, self) => item && self.indexOf(item) === i);
        props.setExpandedDriveItems(newExpandedKeys)
        setSearchValue(value)
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
        console.log(info)
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
        props.setExpandedDriveItems(expandedKeys)
        props.setAutoExpandParent(false)
    }

    function onExpand_shared(expandedKeys) {
        props.setExpandedDriveSharedItems(expandedKeys)
        props.setAutoExpandSharedParent(false)
    }

    function onSelect(selectedKeys, info) {
        console.log(info.node)
        /*if(info.node.typeF === "file"){
            props.onDoubleClickFile(info.node)
        }*/

        if (info.node.typeF === "folder") {
            props.setSelectedDriveSharedItem([])
            props.setSelectedDriveItem(selectedKeys)

            props.setSelectedFolder(info.node)
            props.setFolderName(info.node.title)
            props.setFolderId(info.node.key)
            props.setSelectedFolderFiles(info.node.files)
            props.setSelectedFolderFolders(info.node.folders)
        }
    }

    function onDoubleClick(e, info) {
        if (info.typeF === "file") {
            props.onDoubleClickFile(info)
        }

    }

    function onSelect_shared(selectedKeys, info) {
        props.setSelectedDriveItem([])
        props.setSelectedDriveSharedItem(selectedKeys)
        if (info.node.typeF === "folder") {
            props.setSelectedSharedFolder(info.node)
            props.setSharedFolderName(info.node.title)
            props.setSharedFolderId(info.node.key)
            props.setSelectedSharedFolderFiles(info.node.files)
            props.setSelectedSharedFolderFolders(info.node.children)
        }
    }


    const loop = data =>
        data.map(item => {
            const index = item.title.toLowerCase().indexOf(searchValue.toLowerCase());
            const beforeStr = item.title.substr(0, index);
            const searched = item.title.substr(index, searchValue.length)
            const afterStr = item.title.substr(index + searchValue.length);
            const title =
                index > -1 ? (
                    <span>
                        {beforeStr}
                        <span style={{
                            backgroundColor: searchValue !== "" && "rgb(204, 204, 204)",
                            paddingTop: searchValue !== "" && "0.4rem",
                            paddingBottom: searchValue !== "" && "0.4rem"
                        }}>{searched}</span>
                        {afterStr}
                    </span>
                ) : (
                    <span>{item.title}</span>
                );
            if (item.children) {
                return {
                    title, key: item.key, children: loop(item.children),
                    name: item.title,
                    icon: item.icon,
                    files: item.files,
                    folders: item.folders,
                    typeF: item.typeF
                };
            }

            return {
                title,
                name: item.title,
                key: item.key,
                icon: item.icon,
                files: item.files,
                folders: item.folders,
                typeF: item.typeF
            };
        });


    const open = Boolean(settingAnchorEl);
    const id = open ? 'setting-popover' : undefined;

    //console.log(props.driveFolders)

    return (

        <div style={{marginTop: 20, paddingRight: 10}}>
            <div align="center">

                <MuiButton
                    variant="contained"
                    color="default"
                    startIcon={<AddIcon style={{color: "#A00015", fontSize: 28}}/>}
                    size="large"
                    style={{textTransform: "none", borderRadius: 20, backgroundColor: "#fff", color: "#000"}}
                    onClick={(event) => {
                        props.loadingGed === false && setAnchorEl(event.currentTarget)
                    }}
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
                        //props.onClickImportFolder()
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
                         props.setSelectedDriveItem([])
                         //props.setExpandedDriveItems([])
                         props.setSelectedDriveSharedItem([])
                         props.setExpandedDriveSharedItems([])
                         props.setShowDriveMenuItems()
                         props.setFocusedItem("Drive")
                     }}
                     onClick={() => {
                         props.setSelectedDriveItem([])
                         props.setSelectedDriveSharedItem([])
                         props.setExpandedDriveSharedItems([])
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
                        <IconButton style={{marginLeft: 140, marginTop: -10}} size="medium" onClick={(event) => {
                            event.stopPropagation()
                            setSettingAnchorEl(event.currentTarget)
                        }}>
                            <SettingsIcon style={{color:"#c0c0c0"}}/>
                        </IconButton>
                    </div>
                    <div style={{height: 1, backgroundColor: "#f0f0f0", marginBottom: 10}}/>
                </div>
                {
                    props.showDriveMenuItems === true &&
                    <div>
                        {
                            props.loadingGed === true ?
                                <div align="center" className="mt-1">
                                    <h6>Chargement...</h6>
                                </div> :
                                <div>
                                    {
                                        localStorage.getItem("role") === "admin" &&
                                        <Search style={{marginBottom: 8}} placeholder="Chercher" onChange={onChange}/>
                                    }

                                    <DirectoryTree
                                        draggable={true}
                                        allowDrop={(options) => {
                                            return false
                                        }}
                                        showIcon={checkbox_showicons}
                                        onExpand={onExpand}
                                        onSelect={onSelect}
                                        onDoubleClick={onDoubleClick}
                                        onDragEnter={onDragEnter}

                                        onDrop={onDrop}
                                        treeData={loop(props.driveFolders)}
                                        expandAction="doubleClick"
                                        onRightClick={info => {
                                            if (info.node.typeF === "folder") {
                                                setAnchorElMenu(info.event.currentTarget)
                                                props.setSelectedFolder(info.node)
                                                props.setFolderName(info.node.title)
                                                props.setFolderId(info.node.key)
                                            }
                                        }}

                                        expandedKeys={props.expandedDriveItems}
                                        selectedKeys={props.selectedDriveItem}
                                        onDragStart={e => {
                                            console.log(e.node)
                                            let file = {key:e.node.key,name:e.node.name,typeF:e.node.typeF}
                                            e.event.dataTransfer.setData("file", JSON.stringify(file))
                                            if(e.node.typeF === "folder"){
                                                e.event.dataTransfer.effectAllowed = "link"
                                            }else{
                                                e.event.dataTransfer.effectAllowed = "move"
                                            }

                                        }}
                                        autoExpandParent={props.autoExpandParent}
                                    />
                                    <DirectoryTree
                                        loadData={props.onLoadSharedData}
                                        draggable
                                        showIcon={true}
                                        onExpand={onExpand_shared}
                                        onSelect={onSelect_shared}
                                        treeData={props.sharedFolders}
                                        expandAction="click"
                                        onRightClick={info => {

                                            if (info.node.typeF === "folder" && info.node.key !== "parent") {
                                                let rights = info.node.rights || [];
                                                setRights(rights);
                                                setShareAnchorElMenu(info.event.currentTarget)
                                                props.setSelectedFolder(info.node)
                                                props.setFolderName(info.node.title)
                                                props.setSharedFolderId(info.node.key)

                                            }
                                        }}
                                        expandedKeys={props.expandedDriveSharedItems}
                                        selectedKeys={props.selectedDriveSharedItem}
                                        autoExpandParent={props.autoExpandSharedParent}
                                    />
                                </div>
                        }
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
                    }} //disabled={localStorage.getItem("role") !== "admin"}
                    >
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
                    }} //disabled={localStorage.getItem("role") !== "admin"}
                    >
                        <ListItemIcon>
                            <PersonAddIcon fontSize="small"/>
                        </ListItemIcon>
                        <Typography variant="inherit">Partager</Typography>
                    </MenuItem>
                    <MenuItem key={5} onClick={() => {
                        setAnchorElMenu(null);
                        setOpenRenameModal(true);
                        console.log(props.selectedFolder)
                        setnewFolderName(props.selectedFolder.name)
                    }} //disabled={localStorage.getItem("role") !== "admin"}
                    >
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
                    <MenuItem key={7} onClick={() => {
                        setAnchorElMenu(null);
                        setOpenDeleteModal(true)
                    }} //disabled={localStorage.getItem("role") !== "admin"}
                    >
                        <ListItemIcon>
                            <DeleteOutlineIcon fontSize="small"/>
                        </ListItemIcon>
                        <Typography variant="inherit">Supprimer</Typography>
                    </MenuItem>
                </Menu>

                <Menu
                    id="tree-menu-click111"
                    anchorEl={anchorShareElMenu}
                    keepMounted
                    open={Boolean(anchorShareElMenu)}
                    onClose={() => setShareAnchorElMenu(null)}
                >
                    <MenuItem key={1} onClick={() => {
                        setShareAnchorElMenu(null);
                        props.openNewFolderModal()
                    }} disabled={rights.edit === false}
                    >
                        <ListItemIcon>
                            <NewFolderIcon fontSize="small"/>
                        </ListItemIcon>
                        <Typography variant="inherit">Nouveau dossier</Typography>
                    </MenuItem>
                    <MenuItem key={2} onClick={() => {
                        setShareAnchorElMenu(null);
                        props.showNewFileScreen()
                    }}
                              disabled={rights.edit === false}
                    >
                        <ListItemIcon>
                            <NewFileIcon fontSize="small"/>
                        </ListItemIcon>
                        <Typography variant="inherit">Nouveau fichier</Typography>
                    </MenuItem>
                    <MenuItem key={3} onClick={() => {
                        setShareAnchorElMenu(null);
                        props.openShareModal()
                    }} disabled={rights.share === false}
                    >
                        <ListItemIcon>
                            <PersonAddIcon fontSize="small"/>
                        </ListItemIcon>
                        <Typography variant="inherit">Partager</Typography>
                    </MenuItem>
                    <MenuItem key={5} onClick={() => {
                        setShareAnchorElMenu(null);
                        setOpenRenameModal(true);
                        console.log(props.selectedFolder)
                        setnewFolderName(props.selectedFolder.name)
                    }} disabled={rights.edit === false}
                    >
                        <ListItemIcon>
                            <EditIcon fontSize="small"/>
                        </ListItemIcon>
                        <Typography variant="inherit">Rennomer</Typography>
                    </MenuItem>
                    <MenuItem key={6} onClick={() => {

                    }}
                              disabled={rights.read === false}
                    >
                        <ListItemIcon>
                            <GetAppIcon fontSize="small"/>
                        </ListItemIcon>
                        <Typography variant="inherit">Télécharger</Typography>
                    </MenuItem>
                    <MenuItem key={7} onClick={() => {
                        setShareAnchorElMenu(null);
                        setOpenDeleteModal(true)
                    }} disabled={rights.administrate === false}
                    >
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

                {
                    active_modules.includes("MARKETPLACE_EDITEUR_PRODUIT") === true && localStorage.getItem("role") === "admin" &&
                    <div style={{cursor: "pointer", backgroundColor: props.focusedItem === "PackProduit" ? "aliceblue" : ""}}
                         onClick={(e) => {
                             e.preventDefault()
                             setShowProductPack(!showProductPack)
                         }}

                    >
                        <div style={{height: 1, backgroundColor: "#f0f0f0", marginTop: 10, marginBottom: 10}}/>
                        <div style={{display: "flex"}}>
                            {
                                showProductPack === true ?
                                    <ArrowDropDownIcon style={{color: "#000"}}/> : <ArrowRightIcon/>
                            }
                            <Typography unselectable="on" variant="inherit" style={{color: "#000", marginTop: 3}}>Packs Produits</Typography>
                        </div>
                        {
                            showProductPack === true &&
                            <div>
                                {
                                    (props.p_packs ||[]).filter(x => x.created_by === localStorage.getItem("email")).map((pack,key) => (
                                        <div key={key} style={{marginTop:5,marginLeft:5,marginRight:5}}
                                             draggable={true}
                                             onDragStart={(e) => {
                                                 e.dataTransfer.setData("pack",JSON.stringify(pack))
                                             }}
                                        >
                                            <div style={{marginTop:10,border:"2px solid #f0f0f0",borderRadius:7.5,padding:8}}>
                                                <div style={{display:"flex"}}>
                                                    <ArrowRightIcon/>
                                                    <h6 style={{marginTop:7}}>{pack.name}</h6>
                                                </div>
                                                {
                                                    (pack.products || []).map((product,key) => (
                                                        <div key={key} style={{marginTop:5,marginLeft:5,marginRight:5}}>
                                                            <div style={{border:"2px solid cornflowerblue",padding:2.5,borderRadius:7.5}}>
                                                                <div style={{display:"flex"}}>
                                                                    <div style={{alignSelf:"center"}}>
                                                                        <img alt="" src={product.image} style={{width:60,height:60}}/>
                                                                    </div>
                                                                    <div style={{marginLeft:10}}>
                                                                        <h6>{product.nomProd}</h6>
                                                                        <p className="truncate-2" style={{marginBottom:"0.0rem"}}>{product.descriptionProd}</p>
                                                                        <div align="right">
                                                                            <span style={{fontWeight:"bold",fontSize:"x-small",marginRight:5}}>{product.prix +" €"}</span>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    ))
                                                }
                                            </div>
                                        </div>
                                    ))
                                }

                            </div>
                        }

                        <div style={{height: 1, backgroundColor: "#f0f0f0", marginBottom: 10,marginTop:10}}/>
                    </div>
                }




                <div>
                    {/*Rooms*/}
                    {
                        active_modules.includes("ROOMS") === true &&
                        <div>
                            <div style={{
                                cursor: "pointer",
                                backgroundColor: props.focusedItem === "Rooms" ? "aliceblue" : ""
                            }}
                                 onClick={() => {
                                     props.setFocusedItem("Rooms")
                                     props.setShowRoomsMenuItems()
                                 }}
                            >
                                <div style={{height: 1, backgroundColor: "#f0f0f0", marginTop: 10, marginBottom: 10}}/>
                                <div style={{display: "flex"}}>
                                    {
                                        (props.rooms || []).length > 0 ?
                                            props.showRoomsMenuItems === true ?
                                                <ArrowDropDownIcon style={{color: "#000"}}/> : <ArrowRightIcon/> :
                                            <div style={{marginLeft: 20}}/>
                                    }
                                    <Typography variant="inherit" style={{color: "#000", marginTop: 3}}>Rooms</Typography>

                                    <IconButton style={{marginLeft: 160, marginTop: -10,visibility:"hidden"}} onClick={(event) => {
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
                                    <RoomsMenuItems items={props.rooms || []} selectedRoomItems={props.selectedRoomItems}
                                                    expandedRoomItems={props.expandedRoomItems}
                                                    handleToggleRoomsMenu={props.handleToggleRoomsMenu}
                                                    handleSelectRoomsMenu={props.handleSelectRoomsMenu}
                                                    setSelectedRoom={(room, roomId) => props.setSelectedRoom(room, roomId)}
                                    />
                                </div>
                            }
                        </div>
                    }

                    {/*Meeting Jitsii*/}
                    {
                        active_modules.includes("MEET") === true && localStorage.getItem("role") === "admin" &&
                        <div>
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
                                    <Typography variant="inherit" style={{color: "#000", marginTop: 3}}>Vidéoconférence</Typography>
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
                        </div>
                    }

                    {
                        (active_modules.includes("ROOMS") === true || active_modules.includes("TIMESHEET") === true) && localStorage.getItem("role") === "admin" &&
                            <div>
                                {/*Contacts*/}
                                <div>
                                    <div style={{
                                        cursor: "pointer",
                                        backgroundColor: props.focusedItem === "Contacts" ? "aliceblue" : ""
                                    }}
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
                                            <Typography variant="inherit"
                                                        style={{color: "#000", marginTop: 3}}>Contacts</Typography>
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
                                </div>

                                {/*Clients*/}
                                <div>
                                    <div
                                        style={{cursor: "pointer", backgroundColor: props.focusedItem === "Societe" ? "aliceblue" : ""}}
                                        onClick={() => {
                                            props.setShowSocietyMenuItems()
                                            props.setFocusedItem("Societe")
                                        }}
                                    >
                                        <div style={{height: 1, backgroundColor: "#f0f0f0", marginTop: 10, marginBottom: 10}}/>
                                        <div style={{display: "flex"}}>
                                            {
                                                props.showSocietyMenuItems === true ?
                                                    <ArrowDropDownIcon style={{color: "#000"}}/> : <ArrowRightIcon/>
                                            }
                                            <Typography variant="inherit"
                                                        style={{color: "#000", marginTop: 3}}>Liste clients</Typography>
                                        </div>
                                        <div style={{height: 1, backgroundColor: "#f0f0f0", marginTop: 10, marginBottom: 10}}/>
                                    </div>
                                    {
                                        props.showSocietyMenuItems === true &&
                                        <div>
                                            <SocietyMenuItems items={data.SocietyMenuItem}
                                                              selectedSocietyItem={props.selectedSocietyItem}
                                                              onClick={(nodeId) => {
                                                                  props.onSocietyItemClick(nodeId)
                                                              }} handleSelectSocietyMenu={props.handleSelectSocietyMenu}
                                            />
                                        </div>

                                    }
                                </div>
                            </div>
                    }

                    {/*TimeSheet*/}
                    {
                        active_modules.includes("TIMESHEET") === true && localStorage.getItem("role") === "admin" &&
                        <div>

                            <div style={{
                                cursor: "pointer",
                                backgroundColor: props.focusedItem === "TimeSheet" ? "aliceblue" : ""
                            }} onClick={() => {
                                props.setShowTimeSheetMenuItems()
                                props.setFocusedItem("TimeSheet")
                            }}
                            >
                                <div style={{height: 1, backgroundColor: "#f0f0f0", marginTop: 10, marginBottom: 10}}/>
                                <div style={{display: "flex"}}>
                                    {
                                        props.showTimeSheetMenuItems === true ?
                                            <ArrowDropDownIcon style={{color: "#000"}}/> : <ArrowRightIcon/>
                                    }
                                    <Typography variant="inherit" style={{color: "#000", marginTop: 3}}>Time Sheet</Typography>
                                </div>
                                <div style={{height: 1, backgroundColor: "#f0f0f0", marginTop: 10, marginBottom: 10}}/>
                            </div>
                            {
                                props.showTimeSheetMenuItems === true &&
                                <div>
                                    <TimeSheetMenuItems items={data.TimeSheetMenuItem}
                                                        selectedTimeSheetItem={props.selectedTimeSheetItem}
                                                        onClick={(nodeId) => {
                                                            props.onTimeSheetItemClick(nodeId)
                                                        }} handleSelectTimeSheetMenu={props.handleSelectTimeSheetMenu}
                                    />
                                </div>

                            }

                            <div>

                                        <div style={{cursor:"pointer",backgroundColor:props.focusedItem === "Invoices" ? "aliceblue":""}} onClick={() => {
                                            props.setComptaMenuItems()
                                            props.setFocusedItem("Invoices")
                                        }}
                                        >
                                            <div style={{height:1,backgroundColor:"#f0f0f0",marginTop:10,marginBottom:10}}/>
                                            <div style={{display:"flex"}}>
                                                {
                                                    props.showComptaMenuItems === true ?
                                                        <ArrowDropDownIcon style={{color:"#000"}}/> : <ArrowRightIcon/>
                                                }
                                                <Typography variant="inherit" style={{color:"#000",marginTop:3}} >Compta</Typography>
                                            </div>
                                            <div style={{height:1,backgroundColor:"#f0f0f0",marginTop:10,marginBottom:10}}/>
                                        </div>
                                        {
                                            props.showComptaMenuItems === true &&
                                            <div>
                                                <ComptaMenuItems items={data.ComptaMenuItems} selectedComptaMenuItem={props.selectedComptaMenuItem}
                                                                 onClick={(nodeId) => {props.onComptaItemClick(nodeId)}} handleSelectComptaMenu={props.handleSelectComptaMenu}
                                                />
                                            </div>

                                        }

                                    </div>

                        </div>
                    }

                    {/*Marketplace*/}
                    {
                        active_modules.includes("MARKETPLACE") === true && localStorage.getItem("role") === "admin" &&
                        <div style={{marginBottom:40}}>
                            <div style={{
                                cursor: "pointer",
                                backgroundColor: props.focusedItem === "marketplace" ? "aliceblue" : ""
                            }}
                                 onClick={() => {
                                     props.setShowMarketplaceMenuItems()
                                     props.setFocusedItem("marketplace")
                                 }}
                            >
                                <div style={{height: 1, backgroundColor: "#f0f0f0", marginTop: 10, marginBottom: 10}}/>
                                <div style={{display: "flex"}}>
                                    {
                                        props.showMarketplaceMenuItems === true ?
                                            <ArrowDropDownIcon style={{color: "#000"}}/> : <ArrowRightIcon/>
                                    }
                                    <Typography variant="inherit" style={{color: "#000", marginTop: 3}}>Marketplace</Typography>
                                </div>
                                <div style={{height: 1, backgroundColor: "#f0f0f0", marginTop: 10, marginBottom: 10}}/>
                            </div>
                            {
                                props.showMarketplaceMenuItems === true &&
                                <div>
                                    <MarketplaceMenuItems items={active_modules.includes("MARKETPLACE_EDITEUR_PRODUIT") === false ?
                                        data.marketplaceMenuItem.filter(x => x.nodeId !== "produits") : data.marketplaceMenuItem }
                                                          selectedMarketplaceItem={props.selectedMarketplaceItem}
                                                          onClick={(nodeId) => {
                                                              props.onMarketplaceItemClick(nodeId)
                                                          }}
                                                          handleSelectMarketplaceMenu={props.handleMarketplaceMeetMenu}
                                    />
                                </div>

                            }
                        </div>
                    }



                </div>


            </div>

            <Popover
                id={id}
                open={open}
                anchorEl={settingAnchorEl}
                onClose={() => {
                    setSettingAnchorEl(null)
                }}
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'center',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'center',
                }}
            >
                <div style={{padding:10,paddingLeft:20,maxWidth:300}}>
                    <h6>Paramètres Ged</h6>
                    <div style={{display:"grid"}}>
                        <FormControlLabel
                            control={
                                <MuiCheckbox
                                    checked={props.showFileInGed}
                                    onChange={() =>
                                        props.setShowFileInGed(!props.showFileInGed)
                                    }
                                    name="checkboxshowfiles"
                                />
                            }
                            label="Afficher les fichiers"
                        />
                        <FormControlLabel
                            control={
                                <MuiCheckbox
                                    checked={checkbox_showicons}
                                    onChange={() =>
                                        setCheckbox_showicons(!checkbox_showicons)
                                    }
                                    name="checkboxshowicons"
                                />
                            }
                            label="Afficher les icones"
                        />
                        {/*<FormControlLabel
                            control={
                                <MuiCheckbox
                                    checked={checkbox_enableDrag}
                                    onChange={() =>
                                        setCheckbox_enableDrag(!checkbox_enableDrag)
                                    }
                                    name="checkboxdrag"
                                />
                            }
                            label="Activer le déplacement dans le menu Ged"
                        />*/}
                    </div>
                </div>
            </Popover>

        </div>

    )

}
